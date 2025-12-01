"""Pydantic schemas for API responses and requests."""

from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, Field


class ConceptAnalysisOut(BaseModel):
    metric: str
    score: float
    normalized_score: float


class ConceptOption(BaseModel):
    concept_id: int
    name: str
    cost_score: float = Field(..., description="Normalized cost score (0-100)")
    code_score: float = Field(..., description="Normalized code score (0-100)")
    risk_score: float = Field(..., description="Normalized risk score (0-100)")
    leed_score: float = Field(..., description="Normalized LEED score (0-100)")
    is_best_overall: bool


class AlignResponse(BaseModel):
    project_id: int
    best_fit_concept_id: int
    options: List[ConceptOption]


class ProjectDecisionIn(BaseModel):
    concept_id: int
    rationale: str


class ProjectDecisionOut(BaseModel):
    id: int
    project_id: int
    concept_id: int
    rationale: str
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
