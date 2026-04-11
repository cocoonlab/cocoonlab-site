import type { Route } from "next";
import type { UrlObject } from "url";

export type StudioIconKey =
  | "map"
  | "coins"
  | "leaf"
  | "gavel"
  | "eye"
  | "document"
  | "grid"
  | "spark"
  | "sun"
  | "stack"
  | "brief"
  | "graph"
  | "arrow";

export type StudioNavItem = {
  label: string;
  href: Route | UrlObject;
  matchPath: Route;
};

export const landingNavItems: readonly StudioNavItem[] = [
  { label: "Lenses", href: { pathname: "/", hash: "lenses" }, matchPath: "/" },
  { label: "Features", href: { pathname: "/", hash: "features" }, matchPath: "/" },
  { label: "Outputs", href: { pathname: "/", hash: "outputs" }, matchPath: "/" },
  { label: "Workflow", href: { pathname: "/", hash: "workflow" }, matchPath: "/" },
  { label: "Workspace", href: "/app", matchPath: "/app" }
] as const;

export const workspaceNavItems: readonly StudioNavItem[] = [
  { label: "Overview", href: { pathname: "/app", hash: "overview" }, matchPath: "/app" },
  { label: "Studies", href: { pathname: "/app", hash: "studies" }, matchPath: "/app" },
  { label: "Handover", href: { pathname: "/app", hash: "handover" }, matchPath: "/app" },
  { label: "Contact", href: "/contact", matchPath: "/contact" }
] as const;

export const studioLogos = [
  {
    src: "/logos/alliesandmorrison-logo.png",
    alt: "Allies and Morrison"
  },
  {
    src: "/logos/neuf-logo.png",
    alt: "NEUF architect(e)s"
  },
  {
    src: "/logos/sidlee-architecture-logo.png",
    alt: "Sid Lee Architecture"
  },
  {
    src: "/logos/civiliti-logo.png",
    alt: "Civiliti"
  },
  {
    src: "/logos/adamsonandaai-logo.png",
    alt: "Adamson Associates"
  }
] as const;

export const lensCards = [
  {
    title: "Site intelligence",
    description:
      "Topography, sunlight, access, and surrounding context parsed into geometric constraints before massing begins.",
    icon: "map"
  },
  {
    title: "Early-stage cost",
    description:
      "Dynamic cost envelopes that update with every option so design ambition stays aligned with commercial reality.",
    icon: "coins"
  },
  {
    title: "Carbon forecasting",
    description:
      "Embodied carbon signals surface immediately, making timber, reuse, and structural tradeoffs legible from day one.",
    icon: "leaf"
  },
  {
    title: "Regulatory audit",
    description:
      "Zoning and code checks appear as a live review layer tied to site-specific constraints and municipal logic.",
    icon: "gavel"
  },
  {
    title: "Visual intelligence",
    description:
      "Atmospheric previews and material narratives turn feasibility studies into client-ready stories without leaving the workspace.",
    icon: "eye"
  }
] as const;

export const workspaceFeatureCards = [
  {
    eyebrow: "Screen 01",
    title: "Portfolio command",
    description:
      "Studios can see active sites, constraint status, and export readiness in one quiet, searchable workspace.",
    icon: "brief",
    points: ["Priority queue", "Team activity", "Submission readiness"]
  },
  {
    eyebrow: "Screen 02",
    title: "Massing review",
    description:
      "The design canvas keeps site context, lens switching, and feasibility signals visible without overwhelming the architect.",
    icon: "grid",
    points: ["Context overlays", "Five active lenses", "Manual overrides"]
  },
  {
    eyebrow: "Screen 03",
    title: "Technical dossier",
    description:
      "Every approved option produces a clear package for consultants, clients, and planning conversations.",
    icon: "document",
    points: ["BIM outputs", "Narrative summaries", "Carbon and cost evidence"]
  }
] as const;

export const outputCards = [
  {
    title: "BIM-ready geometry",
    description:
      "Export clean Revit or Rhino models with classified components, massing rationale, and traceable assumptions.",
    icon: "grid"
  },
  {
    title: "Technical dossiers",
    description:
      "Generate concise reports that summarize site feasibility, planning risk, cost range, and embodied carbon.",
    icon: "document"
  },
  {
    title: "Atmospheric previews",
    description:
      "Turn strategy into a believable visual narrative with refined previews that preserve material intent.",
    icon: "spark"
  }
] as const;

export const workflowSteps = [
  {
    number: "01",
    title: "Ingestion",
    description:
      "Upload surveys, zoning texts, adjacency notes, and hand sketches to establish the design field."
  },
  {
    number: "02",
    title: "Synthesize",
    description:
      "Cocoon generates compliant massing families and reveals the drivers behind each option."
  },
  {
    number: "03",
    title: "Refine",
    description:
      "Adjust priorities, lock assumptions, and move the preferred scheme toward consultant-ready clarity."
  }
] as const;

export const portfolioProjects = [
  {
    name: "Harbour Infill Housing",
    stage: "Options in review",
    team: "Studio A",
    status: "Balanced yield / code"
  },
  {
    name: "Monk Street Retrofit",
    stage: "Carbon lens active",
    team: "Adaptive Reuse",
    status: "Low-carbon frame"
  },
  {
    name: "Westmount Civic Block",
    stage: "Submission package",
    team: "Planning",
    status: "Export ready"
  }
] as const;

export const liveChecks = [
  { label: "Height", value: "Compliant", tone: "success" },
  { label: "Coverage", value: "Compliant", tone: "success" },
  { label: "Parking", value: "At risk", tone: "caution" },
  { label: "Setbacks", value: "Compliant", tone: "success" }
] as const;

export const dossierModules = [
  {
    title: "Feasibility summary",
    detail: "Gross floor area, yield range, planning position, and key tradeoffs."
  },
  {
    title: "Carbon and cost",
    detail: "Side-by-side early-stage forecasts with explicit assumptions."
  },
  {
    title: "Consultant handoff",
    detail: "Rhino/Revit geometry, annotated diagrams, and design narrative."
  }
] as const;
