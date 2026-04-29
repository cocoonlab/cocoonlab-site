import { motion } from "motion/react";
import {
  Leaf,
  Map,
  Banknote,
  Sprout,
  Gavel,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const demoRequestHref = "/contact/?intent=studio-demo#contact-form";
const engineExplorationHref = "/contact/#contact-form";

const demoAriaLabel = "Open the Cocoon studio demo request form";
const lensAssetVersion = "20260413-lenses-1";
const demoButtonClassName =
  "inline-flex min-h-9 items-center justify-center rounded-md bg-primary px-4 py-2 font-label text-[0.8125rem] font-semibold leading-none text-on-primary shadow-[0_10px_24px_rgba(58,96,110,0.18)] transition-all duration-200 hover:bg-primary-dim active:scale-95 sm:px-6 sm:text-sm";
const secondaryCtaClassName =
  "rounded-md border border-outline-variant/35 bg-surface-container-low px-6 py-2 font-label text-sm font-semibold text-on-surface shadow-sm transition-all duration-200 hover:border-primary/35 hover:bg-surface-container active:scale-95";

const lensContent = {
  Site: {
    chip: "Site lens: parcel fit, adjacencies, movement, and buildable envelope",
    imageSrc: `/assets/lenses/site-cocoon.png?v=${lensAssetVersion}`,
    imageAlt: "Architectural site massing study with a highlighted parcel and surrounding urban context",
    imageFilter: "none",
    metricLabel: "Site",
    metricValue: "3,600 m²",
    metricNote: "Full block, streets all sides, near water.",
    icon: Map,
  },
  Cost: {
    chip: "Cost lens: early quantity logic and budget sensitivity tied to each massing move",
    imageSrc: `/assets/lenses/cost-cocoon.png?v=${lensAssetVersion}`,
    imageAlt: "Architectural feasibility study with cost overlays, quantity bars, and a massing model",
    imageFilter: "none",
    metricLabel: "Cost",
    metricValue: "$3,250 / m²",
    metricNote: "Layered structure, envelope, systems.",
    icon: Banknote,
  },
  Carbon: {
    chip: "Carbon lens: embodied impact surfaced before details become expensive to change",
    imageSrc: `/assets/lenses/carbon-cocoon.png?v=${lensAssetVersion}`,
    imageAlt: "Architectural massing study with embodied carbon analysis and material comparison overlays",
    imageFilter: "none",
    metricLabel: "Carbon",
    metricValue: "420 kgCO₂e / m²",
    metricNote: "Embodied impact across materials.",
    icon: Leaf,
  },
  Code: {
    chip: "Code lens: zoning logic, setbacks, and compliance flags organized in one readable layer",
    imageSrc: `/assets/lenses/code-cocoon.png?v=${lensAssetVersion}`,
    imageAlt: "Architectural zoning and code study with parcel lines, setback envelopes, and compliance annotations",
    imageFilter: "none",
    metricLabel: "Code",
    metricValue: "FAR 4.2 | 28 m",
    metricNote: "Setbacks and height define form.",
    icon: Gavel,
  },
  Visuals: {
    chip: "Visuals lens: atmosphere, massing, and material intent aligned to the design signal",
    imageSrc: `/assets/lenses/visual-cocoon.png?v=${lensAssetVersion}`,
    imageAlt: "Atmospheric architectural rendering with stacked green volumes, glass, and warm light",
    imageFilter: "none",
    metricLabel: "Visuals",
    metricValue: "6 levels | Mixed-use",
    metricNote: "From massing to inhabitation.",
    icon: Sparkles,
  },
} as const;

type LensName = keyof typeof lensContent;

const lensNames = Object.keys(lensContent) as LensName[];
const lensAutoplayIntervalMs = 4200;
const lensAutoplayResumeDelayMs = 10000;

const lensFeatures = [
  {
    icon: Map,
    title: "Does it fit the parcel?",
    desc: "Parcel geometry, adjacencies, solar access, and movement patterns clarified before design locks in.",
  },
  {
    icon: Banknote,
    title: "What drives the budget?",
    desc: "Early quantity logic and budget sensitivity remain attached to every massing iteration.",
  },
  {
    icon: Sprout,
    title: "Which option has lower impact?",
    desc: "Embodied impact is surfaced early enough to compare structural and material decisions meaningfully.",
  },
  {
    icon: Gavel,
    title: "What needs attention?",
    desc: "Setbacks, frontage, access, height, and zoning logic are organized into one readable compliance layer.",
  },
] as const;

const outputCards = [
  {
    assetSrc: "/assets/outputs/bim-ready-geometry.png",
    title: "BIM Ready Geometry",
    desc: "Export clean Revit or Rhino files with correctly classified IFC data.",
  },
  {
    assetSrc: "/assets/outputs/technical-dossiers.png",
    title: "Technical Dossiers",
    desc: "Automated reports summarizing feasibility, cost, and sustainability metrics.",
  },
  {
    assetSrc: "/assets/outputs/atmospheric-previews.png",
    title: "Atmospheric Previews",
    desc: "High-fidelity renders that capture the material intent of your design.",
  },
] as const;

const workflowSteps = [
  {
    id: "01",
    title: "Ingestion",
    desc: "Upload site surveys, zoning documents, or simple sketches to seed the AI model.",
  },
  {
    id: "02",
    title: "Synthesize",
    desc: "Review 5+ valid design analysis generated against your specific constraints.",
  },
  {
    id: "03",
    title: "Refine",
    desc: "Fine-tune the chosen direction with interactive sliders and manual geometry overrides.",
  },
] as const;

const dossierPages = [
  {
    id: "summary",
    eyebrow: "01 / Feasibility",
    tab: "Summary",
    title: "Project Feasibility Snapshot",
    accent: "#2D2E28",
    metric: "87%",
    metricLabel: "Scheme Confidence",
    status: ["Site Strong", "Cost Optimized", "Carbon Improved", "Code Watch"],
    copy: "A decision-grade view of site, cost, carbon, and code feasibility.",
  },
  {
    id: "site",
    eyebrow: "02 / Site",
    tab: "Site",
    title: "Site Logic and Parcel Fit",
    accent: "#3A606E",
    metric: "4.2",
    metricLabel: "FAR",
    status: ["Primary access", "Frontage strong", "Solar watch"],
    copy: "Parcel geometry, movement, frontage, and exposure are translated into development logic.",
  },
  {
    id: "cost",
    eyebrow: "03 / Cost",
    tab: "Cost",
    title: "Cost Sensitivity and Quantity Logic",
    accent: "#EBC04D",
    metric: "-8.4%",
    metricLabel: "Cost Delta",
    status: ["Structure -6.2%", "Envelope +4.8%", "Core 11.7%"],
    copy: "Early-stage massing choices are converted into quantity and cost-risk signals.",
  },
  {
    id: "carbon",
    eyebrow: "04 / Carbon",
    tab: "Carbon",
    title: "Embodied Carbon Comparison",
    accent: "#A8B58A",
    metric: "-31%",
    metricLabel: "Carbon Delta",
    status: ["Hybrid timber", "Baseline compared", "Podium transfer"],
    copy: "Material and structural scenarios are evaluated before design lock-in.",
  },
  {
    id: "code",
    eyebrow: "05 / Code",
    tab: "Code",
    title: "Code Watchpoints",
    accent: "#B36A5E",
    metric: "6",
    metricLabel: "Rules Checked",
    status: ["Height clear", "Setback clear", "Fire access watch"],
    copy: "Planning constraints and unresolved watchpoints are surfaced early.",
  },
  {
    id: "export",
    eyebrow: "06 / Handover",
    tab: "Export",
    title: "Ready for Handover",
    accent: "#2D2E28",
    metric: "4",
    metricLabel: "Export Assets",
    status: ["BIM Geometry", "Technical Dossier", "Carbon Scenario", "Code Watchlist"],
    copy: "A structured feasibility package is prepared for review and handover.",
  },
] as const;

type DossierPageId = (typeof dossierPages)[number]["id"];
type DossierPageContent = (typeof dossierPages)[number];

const exportPackageItems = ["BIM Geometry", "Technical Dossier", "Carbon Scenario", "Code Watchlist", "Decision Log", "Atmospheric Preview"] as const;

function DossierDiagram({ page, isActive }: { page: DossierPageContent; isActive: boolean }) {
  const lineTransition = { duration: 1.2, ease: "easeOut" as const };

  if (page.id === "site") {
    return (
      <svg viewBox="0 0 260 156" className="h-full w-full" aria-hidden="true">
        <motion.path
          d="M24 110 L92 70 L178 94 L124 136 Z"
          fill="none"
          stroke={page.accent}
          strokeWidth="2.4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isActive ? 1 : 0.72 }}
          transition={lineTransition}
        />
        <path d="M34 126 C84 104 124 100 158 118 C184 132 204 124 236 106" fill="none" stroke={page.accent} strokeOpacity="0.38" strokeWidth="5" />
        <path d="M42 62 L96 42 L192 58" fill="none" stroke={page.accent} strokeOpacity="0.48" strokeDasharray="6 7" />
        <path d="M118 28 C158 34 190 48 220 76" fill="none" stroke="#EBC04D" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="74" cy="88" r="4" fill="#EBC04D" />
        <circle cx="194" cy="104" r="4" fill="#B36A5E" />
      </svg>
    );
  }

  if (page.id === "cost") {
    return (
      <div className="grid h-full grid-cols-[1fr_1.2fr] items-end gap-4">
        <div className="space-y-2">
          {[62, 48, 74, 54].map((height, index) => (
            <div key={height} className="h-3 rounded-full bg-surface-container">
              <motion.div
                className="h-full rounded-full"
                style={{ background: page.accent, width: `${height}%` }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isActive ? 1 : 0.68 }}
                transition={{ duration: 0.8, delay: index * 0.08, ease: "easeOut" }}
              />
            </div>
          ))}
        </div>
        <div className="flex h-32 items-end gap-2 border-b border-outline-variant/20 px-2">
          {[42, 78, 56, 92, 68, 84].map((height, index) => (
            <motion.div
              key={height}
              className="w-full rounded-t-sm"
              style={{ background: page.accent }}
              initial={{ height: 0 }}
              animate={{ height: isActive ? height : height * 0.45 }}
              transition={{ duration: 0.8, delay: index * 0.05, ease: "easeOut" }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (page.id === "carbon") {
    return (
      <div className="grid h-full content-center gap-5">
        <div>
          <div className="mb-2 flex justify-between text-[0.62rem] uppercase tracking-[0.14em] text-on-surface-variant">
            <span>Baseline</span>
            <span>100%</span>
          </div>
          <div className="h-5 rounded-full bg-surface-container">
            <motion.div
              className="h-full rounded-full bg-on-surface/70"
              initial={{ width: "0%" }}
              animate={{ width: isActive ? "100%" : "70%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>
        <div>
          <div className="mb-2 flex justify-between text-[0.62rem] uppercase tracking-[0.14em] text-on-surface-variant">
            <span>Hybrid timber</span>
            <span>69%</span>
          </div>
          <div className="h-5 rounded-full bg-surface-container">
            <motion.div
              className="h-full rounded-full"
              style={{ background: page.accent }}
              initial={{ width: "0%" }}
              animate={{ width: isActive ? "69%" : "42%" }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            />
          </div>
        </div>
        <svg viewBox="0 0 260 52" className="h-16 w-full" aria-hidden="true">
          <path d="M22 26 H238" stroke={page.accent} strokeWidth="8" strokeLinecap="round" strokeOpacity="0.38" />
          <path d="M42 14 H220" stroke={page.accent} strokeWidth="3" strokeLinecap="round" />
          <path d="M62 38 H190" stroke={page.accent} strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  if (page.id === "code") {
    const rows = ["Height", "Setback", "Fire access", "Daylight", "Frontage", "Parking"];

    return (
      <div className="grid h-full content-center gap-2">
        {rows.map((row, index) => {
          const state = ["Clear", "Clear", "Watch", "Watch", "Clear", "Pending"][index];
          const tone = state === "Clear" ? "#3A606E" : state === "Watch" ? page.accent : "#EBC04D";

          return (
            <motion.div
              key={row}
              className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-outline-variant/12 py-1.5 text-xs"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: isActive ? 1 : 0.58, x: 0 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
            >
              <span className="font-semibold text-on-surface">{row}</span>
              <span className="rounded-full px-2 py-1 font-semibold" style={{ background: `${tone}24`, color: tone }}>
                {state}
              </span>
            </motion.div>
          );
        })}
      </div>
    );
  }

  if (page.id === "export") {
    return (
      <div className="grid h-full grid-cols-2 content-center gap-2">
        {exportPackageItems.map((item, index) => (
          <motion.div
            key={item}
            className="border border-outline-variant/16 bg-surface/62 px-3 py-3 text-[0.68rem] font-semibold text-on-surface"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: isActive ? 1 : 0.6, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.04 }}
          >
            {item}
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid h-full grid-cols-[0.8fr_1.2fr] items-center gap-4">
      <div className="grid gap-2">
        {["Site: Strong", "Cost: Optimized", "Carbon: Improved", "Code: Watch"].map((item, index) => (
          <motion.div
            key={item}
            className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: isActive ? 1 : 0.62, x: 0 }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
          >
            <span className="h-2 w-2 rounded-full" style={{ background: ["#3A606E", "#EBC04D", "#A8B58A", "#B36A5E"][index] }} />
            {item}
          </motion.div>
        ))}
      </div>
      <svg viewBox="0 0 240 150" className="h-full w-full" aria-hidden="true">
        <motion.path
          d="M24 112 L88 76 L144 92 L216 52"
          fill="none"
          stroke={page.accent}
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isActive ? 1 : 0.7 }}
          transition={lineTransition}
        />
        <path d="M48 72 L96 48 L158 64 L110 92 Z" fill="#DCE8EB" stroke={page.accent} strokeWidth="1.4" />
        <path d="M48 72 L110 92 V124 L48 102 Z" fill="#E9EBDF" stroke={page.accent} strokeOpacity="0.38" />
        <path d="M158 64 L110 92 V124 L158 96 Z" fill="#C7D9DE" stroke={page.accent} strokeOpacity="0.38" />
        <circle cx="206" cy="54" r="5" fill="#EBC04D" />
      </svg>
    </div>
  );
}

function DossierPageCard({
  page,
  isActive,
  stackIndex = 0,
  compact = false,
}: {
  page: DossierPageContent;
  isActive: boolean;
  stackIndex?: number;
  compact?: boolean;
}) {
  const showContent = compact || isActive;

  return (
    <motion.article
      className={`overflow-hidden border border-outline-variant/20 bg-surface shadow-[0_24px_60px_rgba(45,46,40,0.08)] ${
        compact ? "relative min-h-[30rem] p-5" : "absolute inset-0 p-6 sm:p-7"
      }`}
      style={{
        borderTopColor: page.accent,
        borderTopWidth: "4px",
        zIndex: compact ? 1 : isActive ? 40 : 10 - stackIndex,
      }}
      animate={
        compact
          ? { opacity: 1, y: 0, scale: 1 }
          : {
              opacity: 1,
              x: isActive ? 0 : 16 + stackIndex * 10,
              y: isActive ? -10 : 18 + stackIndex * 10,
              rotate: isActive ? 0 : [-1.1, 0.7, -0.5, 1, -0.7, 0.4][stackIndex] ?? 0,
              scale: isActive ? 1 : 0.965 - stackIndex * 0.01,
            }
      }
      transition={{ duration: 0.42, ease: "easeOut" }}
    >
      {showContent ? (
        <>
          <header className="border-b border-outline-variant/16 pb-4">
            <div className="text-[0.66rem] font-bold uppercase tracking-[0.18em]" style={{ color: page.accent }}>
              {page.eyebrow}
            </div>
            <h3 className="mt-2 max-w-[22rem] font-headline text-2xl font-bold leading-tight text-on-surface sm:text-3xl">{page.title}</h3>
            <p className="mt-2 max-w-[26rem] text-xs leading-relaxed text-on-surface-variant sm:text-sm">{page.copy}</p>
          </header>

          <div className="grid min-h-[16rem] grid-cols-1 gap-5 py-5 sm:grid-cols-[0.66fr_1fr] sm:items-center">
            <div className="rounded-md border border-outline-variant/14 bg-surface-container-low/70 p-4">
              <motion.div
                className="font-headline text-5xl font-bold leading-none sm:text-6xl"
                style={{ color: page.accent }}
                animate={{ opacity: isActive ? 1 : 0.72, y: isActive ? 0 : 5 }}
                transition={{ duration: 0.35 }}
              >
                {page.metric}
              </motion.div>
              <div className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-on-surface-variant">{page.metricLabel}</div>
            </div>

            <div className="min-h-[11rem]">
              <DossierDiagram page={page} isActive={isActive} />
            </div>
          </div>

          <footer className="flex flex-wrap gap-2 border-t border-outline-variant/14 pt-4">
            {page.status.map((status, index) => (
              <motion.span
                key={status}
                className="border border-outline-variant/16 bg-surface-container-low/60 px-2.5 py-1.5 text-[0.68rem] font-semibold text-on-surface-variant"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: isActive ? 1 : 0.55, y: 0 }}
                transition={{ duration: 0.28, delay: index * 0.04 }}
              >
                {status}
              </motion.span>
            ))}
          </footer>
        </>
      ) : (
        <div aria-hidden="true" className="grid h-full content-between opacity-35">
          <div className="space-y-3">
            <div className="h-1 w-full" style={{ background: page.accent }} />
            <div className="h-2 w-36 bg-on-surface/20" />
            <div className="h-8 w-64 bg-on-surface/10" />
          </div>
          <div className="grid grid-cols-[0.8fr_1fr] gap-5">
            <div className="h-28 border border-outline-variant/20 bg-surface-container-low/60" />
            <div className="h-28 border border-outline-variant/20 bg-surface-container-low/45" />
          </div>
          <div className="flex gap-2">
            <span className="h-7 w-20 border border-outline-variant/16 bg-surface-container-low/60" />
            <span className="h-7 w-24 border border-outline-variant/16 bg-surface-container-low/60" />
            <span className="h-7 w-16 border border-outline-variant/16 bg-surface-container-low/60" />
          </div>
        </div>
      )}
    </motion.article>
  );
}

function DossierAssemblyPreview() {
  const [activePageId, setActivePageId] = useState<DossierPageId>("summary");
  const [isDossierAutoplayPaused, setIsDossierAutoplayPaused] = useState(false);
  const activeIndex = Math.max(
    0,
    dossierPages.findIndex((page) => page.id === activePageId),
  );
  const activePage = dossierPages[activeIndex] ?? dossierPages[0];

  useEffect(() => {
    if (isDossierAutoplayPaused || prefersReducedMotion()) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActivePageId((currentPageId) => {
        const currentIndex = dossierPages.findIndex((page) => page.id === currentPageId);
        const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % dossierPages.length : 0;
        return dossierPages[nextIndex]?.id ?? "summary";
      });
    }, 3200);

    return () => window.clearInterval(intervalId);
  }, [isDossierAutoplayPaused]);

  const selectDossierPage = (pageId: DossierPageId) => {
    setActivePageId(pageId);
    setIsDossierAutoplayPaused(true);
  };

  return (
    <div className="relative min-h-0 w-full max-w-[56rem] overflow-hidden border border-outline-variant/18 bg-surface-container-low/35 p-4 shadow-[0_24px_80px_rgba(45,46,40,0.06)] sm:p-6 lg:min-h-[40rem]">
      <div className="hidden lg:block">
        <div className="pointer-events-none absolute left-8 right-8 top-14 z-10 grid gap-7 opacity-35">
          {["#3A606E", "#B36A5E", "#A8B58A", "#EBC04D"].map((tone, index) => (
            <motion.span
              key={tone}
              className="h-px w-full origin-left"
              style={{ background: tone }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: [0, 1, 0.72] }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: index * 0.08, ease: "easeOut" }}
            />
          ))}
        </div>

        <div className="absolute left-8 right-8 top-7 h-[31rem] xl:left-10 xl:right-10 xl:h-[32rem]">
          {dossierPages.map((page, index) => (
            <DossierPageCard key={page.id} page={page} isActive={activePageId === page.id} stackIndex={index} />
          ))}
        </div>
      </div>

      <div className="lg:hidden">
        <DossierPageCard page={activePage} isActive compact />
      </div>

      <div className="relative z-50 mt-4 grid grid-cols-3 gap-1 rounded-lg border border-outline-variant/18 bg-surface/86 p-1 shadow-sm backdrop-blur-xl sm:grid-cols-6 lg:absolute lg:bottom-4 lg:left-4 lg:right-4 lg:mt-0">
        {dossierPages.map((page) => {
          const isActive = activePageId === page.id;

          return (
            <button
              key={page.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => selectDossierPage(page.id)}
              onMouseEnter={() => selectDossierPage(page.id)}
              onFocus={() => selectDossierPage(page.id)}
              className="rounded-md px-2.5 py-2 text-[0.68rem] font-semibold transition-all duration-200"
              style={{
                background: isActive ? page.accent : "transparent",
                color: isActive ? (page.id === "cost" || page.id === "carbon" ? "#2D2E28" : "#F7F7F2") : "#596057",
              }}
            >
              {page.tab}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const dossierKeyMetrics = [
  {
    label: "Gross floor area",
    value: "14,280 m²",
    note: "6 levels / mixed-use",
    tone: "from-[#3A606E] to-[#A8B58A]",
  },
  {
    label: "CapEx range",
    value: "$46.4M",
    note: "structure, envelope, systems",
    tone: "from-[#EBC04D] to-[#F2D984]",
  },
  {
    label: "Embodied carbon",
    value: "420 kgCO₂e/m²",
    note: "-31% vs baseline",
    tone: "from-[#A8B58A] to-[#D2DABE]",
  },
] as const;

const dossierCoverStats = [
  { label: "FAR", value: "4.2" },
  { label: "Height", value: "28 m" },
  { label: "Retail edge", value: "1,980 m²" },
] as const;

const dossierPackageMix = [
  { label: "Structure", value: "34%", tone: "#3A606E" },
  { label: "Envelope", value: "28%", tone: "#EBC04D" },
  { label: "Interiors", value: "22%", tone: "#A8B58A" },
  { label: "Systems", value: "16%", tone: "#B36A5E" },
] as const;

const dossierMaterialDeltas = [
  { label: "Timber-hybrid floors", value: "-31%", width: "78%", gradient: "linear-gradient(90deg,#A8B58A,#D2DABE)" },
  { label: "Low-carbon concrete core", value: "-18%", width: "61%", gradient: "linear-gradient(90deg,#3A606E,#7898A2)" },
  { label: "Facade shading depth", value: "+4.5%", width: "44%", gradient: "linear-gradient(90deg,#B36A5E,#D59A91)" },
] as const;

const dossierReadiness = [
  { title: "Zoning envelope aligned", note: "Setbacks and frontage logic resolved.", tone: "bg-[#3A606E]" },
  { title: "Fire access validated", note: "Loading and service maneuvering remain clear.", tone: "bg-[#EBC04D]" },
  { title: "Daylight risk flagged", note: "Northwest corner needs terrace refinement.", tone: "bg-[#B36A5E]" },
] as const;

const dossierPageTabs = ["01 Cover", "02 Carbon", "03 Cost + Code"] as const;

function WorkflowReportPreview() {
  return (
    <motion.div
      initial={{ rotate: 0, scale: 0.92 }}
      whileInView={{ rotate: 1.8, scale: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.95, ease: "easeOut" }}
      className="relative aspect-[4/5] w-full max-w-[23rem] sm:max-w-[28rem] lg:max-w-[34rem]"
    >
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [-6, -4.6, -6] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-x-7 bottom-3 top-5 overflow-hidden rounded-[1.15rem] border border-white/45 bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(247,247,242,0.66))] p-4 shadow-[0_26px_70px_rgba(45,46,40,0.08)] backdrop-blur-sm"
      >
        <div className="space-y-3 opacity-70">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-[8px] uppercase tracking-[0.22em] text-on-surface-variant/60">Appendix</div>
              <div className="mt-1 font-body text-[11px] font-semibold text-on-surface/75">Carbon scenario comparison</div>
            </div>
            <div className="rounded-full border border-outline-variant/10 px-2 py-1 text-[8px] uppercase tracking-[0.18em] text-on-surface-variant/60">
              Page 02
            </div>
          </div>
          <div className="grid grid-cols-[1.1fr_0.9fr] gap-3">
            <div className="rounded-[0.9rem] border border-outline-variant/10 bg-surface/55 p-3">
              <div className="mb-2 flex items-center justify-between text-[8px] uppercase tracking-[0.18em] text-on-surface-variant/55">
                <span>Figure 06</span>
                <span>kgCO₂e / m²</span>
              </div>
              <div className="h-24 rounded-[0.8rem] border border-outline-variant/8 bg-[linear-gradient(to_top,rgba(58,96,110,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(58,96,110,0.05)_1px,transparent_1px)] bg-[size:100%_20px,32px_100%]" />
            </div>
            <div className="space-y-3">
              <div className="rounded-[0.9rem] border border-outline-variant/10 bg-surface/55 p-3">
                <div className="h-2 w-20 rounded-full bg-[#A8B58A]/75" />
                <div className="mt-3 space-y-2">
                  <div className="h-2 rounded-full bg-surface-container" />
                  <div className="h-2 w-4/5 rounded-full bg-surface-container" />
                  <div className="h-2 w-2/3 rounded-full bg-surface-container" />
                </div>
              </div>
              <div className="rounded-[0.9rem] border border-outline-variant/10 bg-surface/55 p-3">
                <div className="h-2 w-16 rounded-full bg-[#EBC04D]/80" />
                <div className="mt-3 space-y-2">
                  <div className="h-2 rounded-full bg-surface-container">
                    <div className="h-full w-[72%] rounded-full bg-[linear-gradient(90deg,#EBC04D,#F2D984)]" />
                  </div>
                  <div className="h-2 rounded-full bg-surface-container">
                    <div className="h-full w-[58%] rounded-full bg-[linear-gradient(90deg,#3A606E,#A8B58A)]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-outline-variant/10 pt-3 text-[8px] uppercase tracking-[0.18em] text-on-surface-variant/50">
            <span>Appendix notes</span>
            <span>Carbon + structure</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -10, 0], rotate: [4.2, 5.5, 4.2] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        className="absolute inset-x-4 bottom-2 top-3 overflow-hidden rounded-[1.2rem] border border-white/50 bg-[linear-gradient(180deg,rgba(255,255,255,0.8),rgba(247,247,242,0.68))] p-4 shadow-[0_24px_62px_rgba(45,46,40,0.1)] backdrop-blur-sm"
      >
        <div className="space-y-3 opacity-80">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-[8px] uppercase tracking-[0.22em] text-on-surface-variant/60">Appendix</div>
              <div className="mt-1 font-body text-[11px] font-semibold text-on-surface/78">Regulatory and budget matrix</div>
            </div>
            <div className="rounded-full border border-outline-variant/10 px-2 py-1 text-[8px] uppercase tracking-[0.18em] text-on-surface-variant/60">
              Page 03
            </div>
          </div>
          <div className="grid gap-3">
            <div className="rounded-[0.9rem] border border-outline-variant/10 bg-surface/58 p-3">
              <div className="mb-3 flex items-center justify-between text-[8px] uppercase tracking-[0.18em] text-on-surface-variant/55">
                <span>Code matrix</span>
                <span>Resolved / pending</span>
              </div>
              <div className="space-y-2">
                {["Setbacks", "Height", "Access", "Loading"].map((item, index) => (
                  <div key={item} className="grid grid-cols-[0.8fr_1fr_auto] items-center gap-2 text-[9px] text-on-surface-variant/70">
                    <span>{item}</span>
                    <div className="h-2 rounded-full bg-surface-container">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: ["86%", "100%", "74%", "68%"][index],
                          background: ["#3A606E", "#EBC04D", "#A8B58A", "#B36A5E"][index],
                        }}
                      />
                    </div>
                    <span>{["clear", "clear", "watch", "watch"][index]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-[0.9rem] border border-outline-variant/10 bg-surface/58 p-3">
                <div className="mb-3 h-2.5 w-20 rounded-full bg-[#EBC04D]/85" />
                <div className="space-y-2">
                  <div className="h-2 rounded-full bg-surface-container" />
                  <div className="h-2 w-4/5 rounded-full bg-surface-container" />
                  <div className="h-2 w-3/5 rounded-full bg-surface-container" />
                </div>
              </div>
              <div className="rounded-[0.9rem] border border-outline-variant/10 bg-surface/58 p-3">
                <div className="mb-3 h-2.5 w-20 rounded-full bg-[#A8B58A]/85" />
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#3A606E]" />
                    <div className="h-2 w-full rounded-full bg-surface-container" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#EBC04D]" />
                    <div className="h-2 w-2/3 rounded-full bg-surface-container" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-outline-variant/10 pt-3 text-[8px] uppercase tracking-[0.18em] text-on-surface-variant/50">
            <span>Budget + code appendix</span>
            <span>Dossier 03</span>
          </div>
        </div>
      </motion.div>

      <div className="relative h-full overflow-hidden rounded-[1.3rem] border border-white/65 bg-surface p-1.5 shadow-[0_36px_90px_rgba(45,46,40,0.14)] sm:p-2">
        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[1.15rem] border border-outline-variant/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,247,242,0.95))] p-4 sm:p-5">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(235,192,77,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(58,96,110,0.14),transparent_24%)]" />

          <div className="relative flex items-start justify-between gap-3">
            <div className="space-y-2">
              <div className="text-[9px] uppercase tracking-[0.26em] text-on-surface-variant/66">Cocoon technical dossier</div>
              <div className="font-headline text-[1.55rem] leading-none text-on-surface sm:text-[1.9rem]">Feasibility Report</div>
              <p className="max-w-[12rem] text-[10px] leading-[1.45] text-on-surface-variant/78 sm:max-w-[16rem] sm:text-[11px]">
                Parcel 07 / mixed-use waterfront / Issue 01 / generated in 18 seconds.
              </p>
            </div>

            <div className="flex shrink-0 flex-col items-end gap-2 text-right">
              <div className="rounded-full border border-outline-variant/10 bg-surface/70 px-2.5 py-1 text-[8px] uppercase tracking-[0.2em] text-on-surface-variant/72">
                Draft for review
              </div>
              <div className="text-[9px] text-on-surface-variant/66">Page 01</div>
            </div>
          </div>

          <div className="relative mt-4 grid gap-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1.44fr_0.68fr]">
              <section className="rounded-[1.05rem] border border-outline-variant/10 bg-surface/74 p-3 shadow-[0_14px_30px_rgba(45,46,40,0.05)]">
                <div className="flex items-center justify-between text-[8px] uppercase tracking-[0.22em] text-on-surface-variant/62">
                  <span>Cover summary</span>
                  <span>Waterfront mixed-use</span>
                </div>

                <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-[minmax(0,1.6fr)_minmax(6.8rem,0.72fr)] sm:gap-3">
                  <div>
                    <div className="font-body text-[0.94rem] font-semibold leading-[1.32] text-on-surface sm:text-[1.08rem]">
                      A stepped timber-hybrid scheme aligns frontage, daylight, and zoning while lowering carbon from the first iteration.
                    </div>
                    <p className="mt-2 max-w-none text-[10.5px] leading-[1.55] text-on-surface-variant/78 sm:text-[11px]">
                      Generated from site inputs, zoning envelopes, and material scenarios so carbon, cost, code, and geometry stay reviewable in one
                      place.
                    </p>

                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {dossierCoverStats.map((stat) => (
                        <div key={stat.label} className="rounded-[0.85rem] border border-outline-variant/10 bg-surface-container-lowest/75 p-2">
                          <div className="text-[7px] uppercase tracking-[0.2em] text-on-surface-variant/64">{stat.label}</div>
                          <div className="mt-1 text-[10.5px] font-semibold text-on-surface">{stat.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[0.95rem] border border-outline-variant/10 bg-[radial-gradient(circle_at_top_left,rgba(235,192,77,0.2),transparent_55%),linear-gradient(180deg,rgba(255,255,255,0.76),rgba(241,242,235,0.72))] p-2.5">
                    <div className="text-[8px] uppercase tracking-[0.18em] text-on-surface-variant/58">Concept A</div>
                    <div className="relative mx-auto mt-3 h-24 w-24 sm:h-28 sm:w-28">
                      <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="absolute bottom-0 left-1/2 h-8 w-24 -translate-x-1/2 rounded-sm bg-[linear-gradient(180deg,#F2D984,#EBC04D)] shadow-[0_10px_24px_rgba(45,46,40,0.08)]"
                      />
                      <motion.div
                        initial={{ y: 12, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
                        className="absolute bottom-5 left-4 h-8 w-16 rounded-[2px] bg-[linear-gradient(180deg,#F7F7F2,#DCE8EB)] shadow-[0_8px_20px_rgba(45,46,40,0.08)]"
                      />
                      <motion.div
                        initial={{ y: 14, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, delay: 0.16, ease: "easeOut" }}
                        className="absolute bottom-5 right-5 h-10 w-10 rounded-[2px] bg-[linear-gradient(180deg,#FFFFFF,#D2DABE)] shadow-[0_8px_20px_rgba(45,46,40,0.08)]"
                      />
                      <motion.div
                        initial={{ y: 16, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, delay: 0.24, ease: "easeOut" }}
                        className="absolute bottom-11 left-9 h-10 w-12 rounded-[2px] bg-[linear-gradient(180deg,#FFFFFF,#EAD0CA)] shadow-[0_8px_20px_rgba(45,46,40,0.08)]"
                      />
                      <motion.div
                        initial={{ y: 18, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, delay: 0.32, ease: "easeOut" }}
                        className="absolute bottom-[3.9rem] left-1/2 h-8 w-10 -translate-x-1/2 rounded-[2px] bg-[linear-gradient(180deg,#FFFFFF,#DCE8EB)] shadow-[0_8px_20px_rgba(45,46,40,0.08)]"
                      />
                      <div className="absolute inset-x-3 bottom-2 h-px bg-[#EBC04D]/70" />
                    </div>
                    <div className="mt-2 text-[8px] uppercase tracking-[0.18em] text-on-surface-variant/64">Stepped timber-hybrid scheme</div>
                  </div>
                </div>
              </section>

              <aside className="rounded-[1.05rem] border border-outline-variant/10 bg-surface/74 p-3 shadow-[0_14px_30px_rgba(45,46,40,0.05)]">
                <div className="text-[8px] uppercase tracking-[0.22em] text-on-surface-variant/62">Key signals</div>
                <div className="mt-3 space-y-3">
                  {dossierKeyMetrics.map((metric, index) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
                      className="rounded-[0.9rem] border border-outline-variant/10 bg-surface-container-lowest/72 p-2.5"
                    >
                      <div className="text-[7px] uppercase tracking-[0.18em] text-on-surface-variant/60">{metric.label}</div>
                      <div className="mt-1 text-[0.95rem] font-semibold leading-none text-on-surface">{metric.value}</div>
                      <div className="mt-1 text-[9px] leading-[1.5] text-on-surface-variant/70">{metric.note}</div>
                      <div className="mt-2 h-1.5 rounded-full bg-surface-container">
                        <motion.div
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.55, delay: 0.1 + index * 0.08, ease: "easeOut" }}
                          className={`h-full origin-left rounded-full bg-gradient-to-r ${metric.tone}`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </aside>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1.26fr_0.84fr]">
              <section className="rounded-[1rem] border border-outline-variant/10 bg-surface/74 p-3 shadow-[0_14px_30px_rgba(45,46,40,0.05)]">
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <div className="text-[8px] uppercase tracking-[0.22em] text-on-surface-variant/62">Figure 02</div>
                    <div className="mt-1 text-[11px] font-semibold text-on-surface">Embodied carbon scenario comparison</div>
                  </div>
                  <div className="text-[8px] uppercase tracking-[0.18em] text-on-surface-variant/56">kgCO₂e / m² GFA</div>
                </div>

                <div className="relative h-[8.3rem] rounded-[0.95rem] border border-outline-variant/10 bg-[linear-gradient(to_top,rgba(58,96,110,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(58,96,110,0.05)_1px,transparent_1px)] bg-[size:100%_22px,40px_100%] p-2.5">
                  <div className="absolute left-2 top-2 text-[7px] uppercase tracking-[0.18em] text-on-surface-variant/44">A1-A3 + C3-C4</div>
                  <svg viewBox="0 0 240 120" className="h-full w-full" aria-hidden="true">
                    <motion.path
                      initial={{ pathLength: 0, opacity: 0.5 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.25, ease: "easeOut" }}
                      d="M10 88 C30 84, 44 46, 72 54 S116 96, 146 72 S190 26, 214 34 S228 60, 232 24"
                      fill="none"
                      stroke="#3A606E"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <motion.path
                      initial={{ pathLength: 0, opacity: 0.4 }}
                      whileInView={{ pathLength: 1, opacity: 0.95 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, delay: 0.15, ease: "easeOut" }}
                      d="M10 98 C34 92, 56 80, 84 84 S124 62, 154 68 S192 92, 232 60"
                      fill="none"
                      stroke="#EBC04D"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <circle cx="72" cy="54" r="3.5" fill="#3A606E" />
                    <circle cx="146" cy="72" r="3.5" fill="#3A606E" />
                    <circle cx="214" cy="34" r="3.5" fill="#3A606E" />
                    <circle cx="84" cy="84" r="3" fill="#EBC04D" />
                    <circle cx="154" cy="68" r="3" fill="#EBC04D" />
                  </svg>
                  <div className="absolute inset-x-3 bottom-2 flex justify-between text-[7px] uppercase tracking-[0.16em] text-on-surface-variant/50">
                    <span>Baseline</span>
                    <span>Hybrid</span>
                    <span>Timber</span>
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-between text-[8px] uppercase tracking-[0.18em] text-on-surface-variant/56">
                  <span>Figure caption</span>
                  <span>-31% vs baseline</span>
                </div>
              </section>

              <section className="rounded-[1rem] border border-outline-variant/10 bg-surface/74 p-3 shadow-[0_14px_30px_rgba(45,46,40,0.05)]">
                <div className="text-[8px] uppercase tracking-[0.22em] text-on-surface-variant/62">Figure 03</div>
                <div className="mt-1 text-[11px] font-semibold text-on-surface">Budget package mix</div>

                <div className="mt-3 flex items-center justify-center">
                  <motion.div
                    initial={{ rotate: -120, opacity: 0 }}
                    whileInView={{ rotate: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative h-24 w-24 rounded-full"
                    style={{
                      background:
                        "conic-gradient(#3A606E 0 34%, #EBC04D 34% 62%, #A8B58A 62% 84%, #B36A5E 84% 100%)",
                    }}
                  >
                    <div className="absolute inset-[18px] rounded-full border border-outline-variant/10 bg-surface-container-lowest" />
                  </motion.div>
                </div>

                <div className="mt-3 space-y-2">
                  {dossierPackageMix.map((item) => (
                    <div key={item.label} className="flex items-center justify-between gap-2 text-[9px]">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ background: item.tone }} />
                        <span className="text-on-surface-variant/72">{item.label}</span>
                      </div>
                      <span className="font-semibold text-on-surface">{item.value}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1.02fr_0.98fr]">
              <section className="rounded-[1rem] border border-outline-variant/10 bg-surface/74 p-3 shadow-[0_14px_30px_rgba(45,46,40,0.05)]">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[8px] uppercase tracking-[0.22em] text-on-surface-variant/62">Figure 04</div>
                    <div className="mt-1 text-[11px] font-semibold text-on-surface">Material and systems deltas</div>
                  </div>
                  <div className="text-[8px] uppercase tracking-[0.16em] text-on-surface-variant/56">relative shift</div>
                </div>

                <div className="mt-3 space-y-3">
                  {dossierMaterialDeltas.map((item, index) => (
                    <div key={item.label} className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2 text-[9px]">
                        <span className="text-on-surface-variant/72">{item.label}</span>
                        <span className="font-semibold text-on-surface">{item.value}</span>
                      </div>
                      <div className="h-2 rounded-full bg-surface-container">
                        <motion.div
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.55, delay: 0.15 + index * 0.08, ease: "easeOut" }}
                          className="h-full origin-left rounded-full"
                          style={{ width: item.width, background: item.gradient }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-[1rem] border border-outline-variant/10 bg-surface/74 p-3 shadow-[0_14px_30px_rgba(45,46,40,0.05)]">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[8px] uppercase tracking-[0.22em] text-on-surface-variant/62">Readiness</div>
                    <div className="mt-1 text-[11px] font-semibold text-on-surface">Regulatory and delivery snapshot</div>
                  </div>
                  <div className="rounded-full border border-outline-variant/10 px-2 py-1 text-[8px] uppercase tracking-[0.16em] text-on-surface-variant/60">
                    18 pages
                  </div>
                </div>

                <div className="mt-3 space-y-3">
                  {dossierReadiness.map((item) => (
                    <div key={item.title} className="flex items-start gap-2.5">
                      <span className={`mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full ${item.tone}`} />
                      <div>
                        <div className="text-[9px] font-semibold text-on-surface">{item.title}</div>
                        <div className="mt-0.5 text-[8.5px] leading-[1.5] text-on-surface-variant/72">{item.note}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          <div className="relative mt-auto flex items-center justify-between gap-3 border-t border-outline-variant/10 pt-4">
            <div className="flex flex-wrap gap-1.5">
              {dossierPageTabs.map((tab, index) => (
                <div
                  key={tab}
                  className={`rounded-full px-2.5 py-1 text-[8px] uppercase tracking-[0.18em] ${
                    index === 0
                      ? "bg-primary text-on-primary"
                      : "border border-outline-variant/10 bg-surface/72 text-on-surface-variant/66"
                  }`}
                >
                  {tab}
                </div>
              ))}
            </div>
            <div className="text-[8px] uppercase tracking-[0.18em] text-on-surface-variant/58">Dossier / 01</div>
          </div>
        </div>

        <motion.div
          animate={{ y: [0, -9, 0] }}
          transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-3 top-3 max-w-[9.2rem] rounded-[0.7rem] bg-on-surface px-3 py-3 font-body text-[9px] text-surface shadow-xl sm:right-2 sm:left-auto sm:top-8 sm:max-w-[11.5rem] sm:px-4 sm:py-3.5 sm:text-[10px] lg:right-0 lg:max-w-[12rem]"
        >
          <Sparkles size={14} className="mb-1.5" />
          <div className="leading-[1.45] sm:text-[10.5px]">DESIGNED FOR LOWER CARBON IMPACT</div>
          <div className="mt-1.5 text-[8px] uppercase tracking-[0.16em] text-surface/60 sm:text-[8.5px]">31% lower embodied carbon</div>
        </motion.div>
      </div>
    </motion.div>
  );
}

const footerLinks = [
  { label: "Privacy", href: "/privacy/" },
  { label: "Terms", href: "/terms/" },
  { label: "Studio", href: "/studio/" },
  { label: "Contact", href: "/contact/" },
  { label: "Press Kit", href: "/press-kit/index.html" },
  { label: "Team", href: "/team/" },
  { label: "Blog", href: "/blog/" },
] as const;

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function App() {
  const [activeLens, setActiveLens] = useState<LensName>("Site");
  const [isLensAutoplayActive, setIsLensAutoplayActive] = useState(true);
  const lensAutoplayResumeTimeoutRef = useRef<number | null>(null);

  const activeLensContent = lensContent[activeLens];
  const ActiveLensIcon = activeLensContent.icon;
  const currentYear = new Date().getFullYear();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  function clearLensAutoplayResumeTimeout() {
    if (lensAutoplayResumeTimeoutRef.current !== null) {
      window.clearTimeout(lensAutoplayResumeTimeoutRef.current);
      lensAutoplayResumeTimeoutRef.current = null;
    }
  }

  function pauseLensAutoplay() {
    clearLensAutoplayResumeTimeout();
    setIsLensAutoplayActive(false);
  }

  function resumeLensAutoplay(delay = lensAutoplayResumeDelayMs) {
    clearLensAutoplayResumeTimeout();

    if (prefersReducedMotion()) {
      setIsLensAutoplayActive(false);
      return;
    }

    lensAutoplayResumeTimeoutRef.current = window.setTimeout(() => {
      setIsLensAutoplayActive(true);
      lensAutoplayResumeTimeoutRef.current = null;
    }, delay);
  }

  function handleLensSelect(lens: LensName) {
    setActiveLens(lens);
    pauseLensAutoplay();
    resumeLensAutoplay();
  }

  useEffect(() => {
    if (!isLensAutoplayActive || prefersReducedMotion()) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveLens((currentLens) => {
        const currentIndex = lensNames.indexOf(currentLens);
        const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % lensNames.length : 0;
        return lensNames[nextIndex] ?? "Site";
      });
    }, lensAutoplayIntervalMs);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isLensAutoplayActive]);

  useEffect(() => {
    return () => {
      clearLensAutoplayResumeTimeout();
    };
  }, []);

  return (
    <div className="min-h-screen bg-surface selection:bg-primary/20">
      <nav className="fixed top-0 z-50 w-full border-b border-outline-variant/5 bg-surface/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1920px] items-center justify-between px-4 py-4 sm:px-6 sm:py-6 md:px-12">
          <a href="#top" className="font-headline text-2xl font-bold text-on-surface">
            COCOON
          </a>

          <div className="flex items-center gap-4">
            <a
              href={demoRequestHref}
              aria-label={demoAriaLabel}
              className={demoButtonClassName}
            >
              Book a Studio Demo
            </a>
          </div>
        </div>
      </nav>

      <main className="pt-28 sm:pt-32">
        <section id="top" className="mb-24 scroll-mt-28 px-4 sm:mb-32 sm:scroll-mt-32 sm:px-6 md:px-12">
          <div className="mx-auto max-w-[1400px]">
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="mb-14 flex flex-col justify-between gap-8 sm:mb-20 md:flex-row md:items-baseline"
            >
              <motion.h1
                variants={fadeInUp}
                className="serif max-w-4xl text-5xl font-semibold leading-tight text-on-surface sm:text-6xl md:text-9xl"
              >
                Know what a site <br />
                can <span className="text-primary">become.</span>
              </motion.h1>
              <motion.div variants={fadeInUp} className="max-w-sm text-on-surface-variant md:mt-0">
                <p className="font-body text-[1.05rem] leading-relaxed sm:text-[1.1rem]">
                  Test massing, cost, carbon, and code early to turn ideas into feasible schemes.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              onMouseEnter={pauseLensAutoplay}
              onMouseLeave={() => resumeLensAutoplay(1800)}
              onFocusCapture={pauseLensAutoplay}
              onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                  resumeLensAutoplay(2200);
                }
              }}
              className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-surface-container shadow-sm sm:aspect-[16/11] lg:aspect-[16/9]"
            >
              <motion.img
                key={activeLens}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="h-full w-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105"
                src={activeLensContent.imageSrc}
                alt={activeLensContent.imageAlt}
                fetchPriority="high"
                decoding="async"
                style={{ filter: activeLensContent.imageFilter }}
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface/10 via-transparent to-surface/18" />

              <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-3 sm:p-6 md:p-12">
                <div className="flex items-start justify-start sm:justify-between sm:gap-4">
                  <div className="pointer-events-auto">
                    <motion.span
                      key={`${activeLens}-chip`}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="blueprint-chip inline-flex max-w-[15.75rem] rounded-full border border-white/20 bg-surface-container-highest/72 px-3 py-1.5 text-[10px] leading-snug shadow-sm backdrop-blur-md sm:max-w-full sm:px-4 sm:py-1 sm:text-sm sm:leading-relaxed"
                    >
                      {activeLensContent.chip}
                    </motion.span>
                  </div>

                  <div className="pointer-events-auto hidden sm:block sm:w-auto">
                    <motion.div
                      key={`${activeLens}-metric`}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="flex w-full max-w-[18rem] items-start gap-4 rounded-xl border border-outline-variant/15 bg-surface/80 p-4 backdrop-blur-md sm:w-auto"
                    >
                      <ActiveLensIcon className="text-primary" size={24} />
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-outline">{activeLensContent.metricLabel}</div>
                        <div className="font-headline text-lg font-bold text-on-surface">{activeLensContent.metricValue}</div>
                        <div className="mt-1 max-w-[15rem] text-xs leading-relaxed text-on-surface-variant">
                          {activeLensContent.metricNote}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                <div className="pointer-events-auto mx-auto flex w-full max-w-[17.25rem] flex-col gap-2.5 sm:hidden">
                  <motion.div
                    key={`${activeLens}-metric-mobile`}
                    initial={{ y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="flex w-full max-w-[13.4rem] items-start gap-2 self-start rounded-[1rem] border border-outline-variant/12 bg-surface/74 px-2.5 py-2.25 shadow-lg backdrop-blur-lg"
                  >
                    <ActiveLensIcon className="mt-0.5 shrink-0 text-primary" size={17} />
                    <div className="min-w-0">
                      <div className="text-[7px] uppercase tracking-[0.22em] text-outline">{activeLensContent.metricLabel}</div>
                      <div className="font-headline text-balance text-[1.42rem] leading-[0.94] font-bold text-on-surface">
                        {activeLensContent.metricValue}
                      </div>
                      <div className="mt-1 max-w-[10.2rem] text-[9.5px] leading-[1.45] text-on-surface-variant">
                        {activeLensContent.metricNote}
                      </div>
                    </div>
                  </motion.div>

                  <div className="flex w-full justify-center">
                    <div className="glass-panel grid w-full max-w-[17rem] grid-cols-5 gap-1 rounded-[1.25rem] border border-white/20 p-1.25 shadow-xl">
                      {lensNames.map((lens) => (
                        <button
                          key={`${lens}-mobile`}
                          type="button"
                          onClick={() => handleLensSelect(lens)}
                          aria-pressed={activeLens === lens}
                          aria-label={`Show the ${lens} lens`}
                          className={`relative min-w-0 overflow-hidden rounded-[0.9rem] px-1 py-2.25 text-[9px] font-medium leading-none transition-all duration-300 ${
                            activeLens === lens
                              ? "bg-primary text-on-primary shadow-lg"
                              : "text-on-surface-variant hover:bg-surface-variant/40"
                          }`}
                        >
                          {activeLens === lens ? (
                            <>
                              <motion.span
                                layoutId="lens-active-pill-mobile"
                                transition={{ type: "spring", stiffness: 360, damping: 30, mass: 0.85 }}
                                className="absolute inset-0 rounded-[0.9rem] bg-primary shadow-lg"
                              />
                              {isLensAutoplayActive ? (
                                <motion.span
                                  key={`${lens}-mobile-progress`}
                                  initial={{ scaleX: 0, opacity: 0.4 }}
                                  animate={{ scaleX: 1, opacity: 0.9 }}
                                  transition={{ duration: lensAutoplayIntervalMs / 1000, ease: "linear" }}
                                  style={{ transformOrigin: "left center" }}
                                  className="absolute inset-x-2 bottom-1 h-px rounded-full bg-white/55"
                                />
                              ) : null}
                            </>
                          ) : null}
                          <span className="relative z-10">{lens}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="hidden w-full justify-center sm:flex">
                  <div className="glass-panel pointer-events-auto grid w-full max-w-[32rem] grid-cols-5 gap-1 rounded-[1.5rem] border border-white/20 p-1.5 shadow-xl sm:flex sm:w-auto sm:max-w-none sm:rounded-full">
                    {lensNames.map((lens) => (
                      <button
                        key={lens}
                        type="button"
                        onClick={() => handleLensSelect(lens)}
                        aria-pressed={activeLens === lens}
                        aria-label={`Show the ${lens} lens`}
                        className="relative min-w-0 overflow-hidden rounded-full px-3 py-2.5 text-[11px] font-medium transition-all duration-300 sm:px-4 sm:py-2 sm:text-xs md:px-6"
                      >
                        {activeLens === lens ? (
                          <>
                            <motion.span
                              layoutId="lens-active-pill-desktop"
                              transition={{ type: "spring", stiffness: 360, damping: 30, mass: 0.85 }}
                              className="absolute inset-0 rounded-full bg-primary shadow-lg"
                            />
                            {isLensAutoplayActive ? (
                              <motion.span
                                key={`${lens}-desktop-progress`}
                                initial={{ scaleX: 0, opacity: 0.4 }}
                                animate={{ scaleX: 1, opacity: 0.9 }}
                                transition={{ duration: lensAutoplayIntervalMs / 1000, ease: "linear" }}
                                style={{ transformOrigin: "left center" }}
                                className="absolute inset-x-3 bottom-1.5 h-[1.5px] rounded-full bg-white/55"
                              />
                            ) : null}
                          </>
                        ) : null}
                        <span
                          className={`relative z-10 ${
                            activeLens === lens ? "text-on-primary" : "text-on-surface-variant"
                          }`}
                        >
                          {lens}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
              className="mt-4 flex flex-col gap-2 rounded-lg border border-outline-variant/18 bg-surface-container-low/70 px-4 py-3 font-body text-sm text-on-surface-variant shadow-sm sm:flex-row sm:items-center sm:justify-center sm:gap-4"
              aria-label="Cocoon workflow"
            >
              <span>
                <strong className="font-semibold text-on-surface">1.</strong> Upload site
              </span>
              <span className="hidden text-outline sm:inline" aria-hidden="true">
                →
              </span>
              <span>
                <strong className="font-semibold text-on-surface">2.</strong> Generate options
              </span>
              <span className="hidden text-outline sm:inline" aria-hidden="true">
                →
              </span>
              <span>
                <strong className="font-semibold text-on-surface">3.</strong> Compare feasibility
              </span>
            </motion.div>
          </div>
        </section>

        <section id="lenses" className="scroll-mt-28 bg-surface-container-low px-4 py-24 sm:scroll-mt-32 sm:px-6 sm:py-32 md:px-12">
          <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-start gap-16 md:grid-cols-12">
            <div className="md:col-span-4">
              <h2 className="serif mb-8 text-4xl text-on-surface sm:text-5xl">
                Every scheme checked across four essentials.
              </h2>
              <div className="mb-8 flex flex-wrap gap-2 font-body text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                {["Site", "Cost", "Carbon", "Code"].map((item) => (
                  <span key={item} className="rounded-full border border-primary/18 bg-primary/8 px-3 py-1.5">
                    {item}
                  </span>
                ))}
              </div>
              <p className="mb-12 font-body leading-relaxed text-on-surface-variant">
                Cocoon doesn&apos;t just generate; it validates. Each lens provides a specific architectural truth, synchronized in real-time as your
                design evolves.
              </p>
              <a href={engineExplorationHref} className="group flex items-center gap-4 text-primary">
                <span className="font-headline border-b border-outline-variant/30 text-xl font-medium transition-all group-hover:border-primary">
                  Request to explore the engine
                </span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            <div className="grid grid-cols-1 gap-px bg-outline-variant/10 sm:grid-cols-2 md:col-span-8">
              {lensFeatures.map((feature, index) => (
                <div key={index} className="group bg-surface-container-low p-6 transition-colors duration-500 hover:bg-surface sm:p-8 md:p-10">
                  <feature.icon className="mb-6 text-primary" size={32} strokeWidth={1.5} />
                  <h3 className="mb-4 font-body text-xl font-semibold">{feature.title}</h3>
                  <p className="font-body text-sm leading-relaxed text-on-surface-variant">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="outputs" className="scroll-mt-28 px-4 py-24 sm:scroll-mt-32 sm:px-6 sm:py-32 md:px-12">
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-24 flex flex-col items-center text-center">
              <span className="blueprint-chip mb-6 rounded-full bg-tertiary-container px-4 py-1 text-xs text-on-tertiary-container">
                The Handover
              </span>
              <h2 className="serif mb-6 text-5xl text-on-surface sm:text-6xl">Clear outputs.</h2>
              <p className="max-w-xl font-body text-on-surface-variant">
                Every iteration produces a comprehensive data pack ready for client review or planning submission.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {outputCards.map((card) => (
                <motion.div key={card.title} whileHover={{ y: -8 }} className="group">
                  <div className="relative mb-6 aspect-square overflow-hidden rounded-xl bg-surface-container-low">
                    <img
                      className="h-full w-full object-cover opacity-80 mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                      src={card.assetSrc}
                      alt={`${card.title} illustration`}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <h4 className="mb-2 font-body text-lg font-semibold">{card.title}</h4>
                  <p className="font-body text-sm text-on-surface-variant">{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="workflow" className="relative scroll-mt-28 overflow-hidden bg-surface-container px-4 py-24 sm:scroll-mt-32 sm:px-6 sm:py-32 md:px-12">
          <div className="workflow-grid pointer-events-none absolute inset-0 opacity-[0.03]" />

          <div className="relative z-10 mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 items-center gap-16 xl:grid-cols-[minmax(22rem,0.74fr)_minmax(0,1.26fr)] xl:gap-20">
              <div>
                <h2 className="serif mb-12 text-5xl text-on-surface sm:text-6xl">
                  Studio workflow,
                  <br />
                  digital speed.
                </h2>
                <div className="space-y-12">
                  {workflowSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className={`flex gap-4 border-l-2 py-2 pl-5 transition-colors duration-500 sm:gap-8 sm:pl-8 ${
                        index === 0 ? "border-primary" : "border-outline-variant/20 hover:border-primary"
                      }`}
                    >
                      <span className="font-headline text-3xl font-semibold text-outline-variant/50 sm:text-4xl">{step.id}</span>
                      <div>
                        <h4 className="mb-2 font-body text-lg font-bold sm:text-xl">{step.title}</h4>
                        <p className="font-body text-sm text-on-surface-variant">{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex min-w-0 items-center justify-center lg:justify-end">
                <DossierAssemblyPreview />
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-32 text-center sm:px-6 sm:py-40 md:px-12">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="serif mb-8 text-5xl text-on-surface sm:text-6xl md:text-7xl">Bring one site. We&apos;ll show feasibility live.</h2>
            <p className="mb-12 font-body text-xl text-on-surface-variant">Join the studios defining the future of practice.</p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href={demoRequestHref}
                aria-label={demoAriaLabel}
                className={`inline-flex w-full justify-center sm:w-auto ${demoButtonClassName}`}
              >
                Book a Studio Demo
              </a>
              <a
                href="/monograph/"
                className={`inline-flex w-full justify-center sm:w-auto ${secondaryCtaClassName}`}
              >
                Read the Monograph
              </a>
            </div>
            <p className="mt-4 font-body text-sm leading-relaxed text-on-surface-variant">
              Upload a site. Get feasible options, metrics, and export-ready outputs.
            </p>
          </motion.div>
        </section>
      </main>

      <footer className="w-full bg-surface-container px-4 py-16 sm:px-6 sm:py-20 md:px-12">
        <div className="mx-auto flex max-w-[1920px] flex-col justify-between md:flex-row md:items-end">
          <div className="flex w-full flex-col items-start gap-6 md:w-auto">
            <div className="font-headline text-xl font-semibold text-on-surface">COCOON</div>
            <div className="font-body text-sm tracking-wide text-on-surface-variant">
              © {currentYear} Cocoon Lab. Cocoon is built for the architect.
            </div>
          </div>
          <div className="mt-10 flex flex-wrap gap-5 sm:gap-8 md:mt-0">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-body text-sm tracking-wide text-on-surface-variant opacity-60 underline-offset-4 transition-opacity hover:opacity-100 hover:underline"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
