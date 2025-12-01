"""Endpoints for concept alignment and decision capture."""

from datetime import datetime
from typing import Dict, Iterable, List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from .. import schemas
from ..database import get_db
from ..models import Concept, ConceptAnalysis, ProjectDecision, Project

router = APIRouter(prefix="/projects", tags=["concept-alignment"])


SUPPORTED_METRICS = ["cost", "code", "risk", "leed"]


def _prepare_analysis_map(
    analyses: Iterable[ConceptAnalysis], concept_ids: List[int]
) -> Dict[int, Dict[str, float]]:
    metric_map: Dict[int, Dict[str, float]] = {
        concept_id: {metric: 0.0 for metric in SUPPORTED_METRICS} for concept_id in concept_ids
    }

    for analysis in analyses:
        metric = analysis.metric.lower()
        if analysis.concept_id in metric_map and metric in metric_map[analysis.concept_id]:
            metric_map[analysis.concept_id][metric] = analysis.score

    return metric_map


def _normalize_metric(metric_values: Dict[int, float]) -> Dict[int, float]:
    values = list(metric_values.values())
    min_val = min(values)
    max_val = max(values)

    if max_val - min_val == 0:
        return {concept_id: 100.0 for concept_id in metric_values}

    return {
        concept_id: ((score - min_val) / (max_val - min_val)) * 100
        for concept_id, score in metric_values.items()
    }


def _compute_overall_scores(
    normalized_scores: Dict[str, Dict[int, float]], concept_ids: List[int]
) -> Dict[int, float]:
    overall: Dict[int, float] = {}
    for concept_id in concept_ids:
        metric_total = sum(normalized_scores[metric][concept_id] for metric in SUPPORTED_METRICS)
        overall[concept_id] = metric_total / len(SUPPORTED_METRICS)
    return overall


@router.get("/{project_id}/align", response_model=schemas.AlignResponse)
def get_alignment_view(
    project_id: int,
    concept_ids: Optional[List[int]] = Query(None, alias="concept_ids[]"),
    db: Session = Depends(get_db),
):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")

    concepts_query = db.query(Concept).filter(Concept.project_id == project_id)
    if concept_ids:
        concepts_query = concepts_query.filter(Concept.id.in_(concept_ids))

    concepts = concepts_query.all()
    if not concepts:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No concepts available for alignment",
        )

    selected_concept_ids = [concept.id for concept in concepts]
    analyses = (
        db.query(ConceptAnalysis)
        .filter(ConceptAnalysis.concept_id.in_(selected_concept_ids))
        .all()
    )
    analysis_map = _prepare_analysis_map(analyses, selected_concept_ids)

    normalized_scores: Dict[str, Dict[int, float]] = {}
    for metric in SUPPORTED_METRICS:
        metric_values = {concept_id: metrics[metric] for concept_id, metrics in analysis_map.items()}
        normalized_scores[metric] = _normalize_metric(metric_values)

    overall_scores = _compute_overall_scores(normalized_scores, selected_concept_ids)

    if not concept_ids and len(selected_concept_ids) > 3:
        selected_concept_ids = [
            concept_id
            for concept_id, _ in sorted(
                overall_scores.items(), key=lambda item: item[1], reverse=True
            )[:3]
        ]
        concepts = [concept for concept in concepts if concept.id in selected_concept_ids]

    best_fit_concept_id = max(selected_concept_ids, key=lambda cid: overall_scores[cid])

    concepts = sorted(concepts, key=lambda concept: overall_scores[concept.id], reverse=True)

    options: List[schemas.ConceptOption] = []
    for concept in concepts:
        concept_id = concept.id
        options.append(
            schemas.ConceptOption(
                concept_id=concept_id,
                name=concept.name,
                cost_score=normalized_scores["cost"][concept_id],
                code_score=normalized_scores["code"][concept_id],
                risk_score=normalized_scores["risk"][concept_id],
                leed_score=normalized_scores["leed"][concept_id],
                is_best_overall=concept_id == best_fit_concept_id,
            )
        )

    return schemas.AlignResponse(
        project_id=project_id, best_fit_concept_id=best_fit_concept_id, options=options
    )


@router.post(
    "/{project_id}/decision",
    response_model=schemas.ProjectDecisionOut,
    status_code=status.HTTP_201_CREATED,
)
def record_decision(
    project_id: int,
    payload: schemas.ProjectDecisionIn,
    db: Session = Depends(get_db),
):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")

    concept = (
        db.query(Concept)
        .filter(Concept.project_id == project_id, Concept.id == payload.concept_id)
        .first()
    )
    if not concept:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Concept does not belong to the specified project",
        )

    decision = (
        db.query(ProjectDecision)
        .filter(ProjectDecision.project_id == project_id)
        .order_by(ProjectDecision.created_at.desc())
        .first()
    )

    if decision:
        decision.concept_id = payload.concept_id
        decision.rationale = payload.rationale
        decision.updated_at = datetime.utcnow()
    else:
        decision = ProjectDecision(
            project_id=project_id,
            concept_id=payload.concept_id,
            rationale=payload.rationale,
        )
        db.add(decision)

    db.commit()
    db.refresh(decision)
    return decision
