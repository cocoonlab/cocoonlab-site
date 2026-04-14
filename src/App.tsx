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
import { useState } from "react";

const contactEmail = "rashid@cocoonlab.ai";
const demoRequestHref = "/contact/?intent=studio-demo#contact-form";

function buildMailtoLink(subject: string, body?: string) {
  const params = new URLSearchParams({ subject });

  if (body) {
    params.set("body", body);
  }

  return `mailto:${contactEmail}?${params.toString()}`;
}

const exploreMailto = buildMailtoLink("Cocoon product exploration");
const demoAriaLabel = "Open the Cocoon studio demo request form";
const lensAssetVersion = "20260413-lenses-1";
const demoButtonClassName =
  "inline-flex min-h-9 items-center justify-center rounded-md bg-primary px-4 py-2 font-label text-[0.8125rem] leading-none text-on-primary transition-all duration-200 hover:bg-primary-dim active:scale-95 sm:px-6 sm:text-sm";
const secondaryCtaClassName =
  "rounded-md border border-outline-variant/25 bg-surface-container-low px-6 py-2 font-label text-sm text-on-surface shadow-sm transition-all duration-200 hover:border-outline-variant/40 hover:bg-surface-container active:scale-95";

const lensContent = {
  Site: {
    chip: "Site lens: parcel fit, adjacencies, movement, and buildable envelope",
    imageSrc: `/assets/lenses/site-cocoon.png?v=${lensAssetVersion}`,
    imageAlt: "Architectural site massing study with a highlighted parcel and surrounding urban context",
    imageFilter: "none",
    metricLabel: "Site",
    metricValue: "3,600 m²",
    metricNote: "Full block, streets all sides, near water.",
    callout: "CONTEXT FIRST",
    calloutNote: "Ground the scheme in the city around it.",
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
    callout: "COST IN VIEW",
    calloutNote: "Every design shift carries an immediate financial read.",
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
    callout: "CARBON EARLY",
    calloutNote: "Bring LCA into concept work, not only late validation.",
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
    callout: "RULES MADE CLEAR",
    calloutNote: "Compliance stays legible while design remains open.",
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
    callout: "INTENT, SEEN",
    calloutNote: "Visuals stay anchored to what the project is becoming.",
    icon: Sparkles,
  },
} as const;

const lensFeatures = [
  {
    icon: Map,
    title: "Site Intelligence",
    desc: "Parcel geometry, adjacencies, solar access, and movement patterns clarified before design locks in.",
  },
  {
    icon: Banknote,
    title: "Cost Intelligence",
    desc: "Early quantity logic and budget sensitivity remain attached to every massing iteration.",
  },
  {
    icon: Sprout,
    title: "Carbon Analysis",
    desc: "Embodied impact is surfaced early enough to compare structural and material decisions meaningfully.",
  },
  {
    icon: Gavel,
    title: "Regulatory Audit",
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

const dossierKeyMetrics = [
  {
    label: "Gross floor area",
    value: "14,280 m²",
    note: "6 levels / mixed-use",
    tone: "from-[#90a688] to-[#bcc9b6]",
  },
  {
    label: "CapEx range",
    value: "$46.4M",
    note: "structure, envelope, systems",
    tone: "from-[#d8c3a5] to-[#eadcc8]",
  },
  {
    label: "Embodied carbon",
    value: "420 kgCO₂e/m²",
    note: "-31% vs baseline",
    tone: "from-[#aab2ad] to-[#cdd3cf]",
  },
] as const;

const dossierCoverStats = [
  { label: "FAR", value: "4.2" },
  { label: "Height", value: "28 m" },
  { label: "Retail edge", value: "1,980 m²" },
] as const;

const dossierPackageMix = [
  { label: "Structure", value: "34%", tone: "#90a688" },
  { label: "Envelope", value: "28%", tone: "#d8c3a5" },
  { label: "Interiors", value: "22%", tone: "#b8c0bb" },
  { label: "Systems", value: "16%", tone: "#dfe5df" },
] as const;

const dossierMaterialDeltas = [
  { label: "Timber-hybrid floors", value: "-31%", width: "78%", gradient: "linear-gradient(90deg,#90a688,#bcc9b6)" },
  { label: "Low-carbon concrete core", value: "-18%", width: "61%", gradient: "linear-gradient(90deg,#d8c3a5,#eadcc8)" },
  { label: "Facade shading depth", value: "+4.5%", width: "44%", gradient: "linear-gradient(90deg,#aab2ad,#cdd3cf)" },
] as const;

const dossierReadiness = [
  { title: "Zoning envelope aligned", note: "Setbacks and frontage logic resolved.", tone: "bg-[#90a688]" },
  { title: "Fire access validated", note: "Loading and service maneuvering remain clear.", tone: "bg-[#d8c3a5]" },
  { title: "Daylight risk flagged", note: "Northwest corner needs terrace refinement.", tone: "bg-[#aab2ad]" },
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
        className="absolute inset-x-7 bottom-3 top-5 overflow-hidden rounded-[1.15rem] border border-white/45 bg-[linear-gradient(180deg,rgba(255,255,255,0.74),rgba(249,249,247,0.62))] p-4 shadow-[0_26px_70px_rgba(45,52,50,0.08)] backdrop-blur-sm"
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
              <div className="h-24 rounded-[0.8rem] border border-outline-variant/8 bg-[linear-gradient(to_top,rgba(90,96,92,0.04)_1px,transparent_1px),linear-gradient(to_right,rgba(90,96,92,0.04)_1px,transparent_1px)] bg-[size:100%_20px,32px_100%]" />
            </div>
            <div className="space-y-3">
              <div className="rounded-[0.9rem] border border-outline-variant/10 bg-surface/55 p-3">
                <div className="h-2 w-20 rounded-full bg-[#adc0a4]/70" />
                <div className="mt-3 space-y-2">
                  <div className="h-2 rounded-full bg-surface-container" />
                  <div className="h-2 w-4/5 rounded-full bg-surface-container" />
                  <div className="h-2 w-2/3 rounded-full bg-surface-container" />
                </div>
              </div>
              <div className="rounded-[0.9rem] border border-outline-variant/10 bg-surface/55 p-3">
                <div className="h-2 w-16 rounded-full bg-[#d8c3a5]/80" />
                <div className="mt-3 space-y-2">
                  <div className="h-2 rounded-full bg-surface-container">
                    <div className="h-full w-[72%] rounded-full bg-[linear-gradient(90deg,#d8c3a5,#eadcc8)]" />
                  </div>
                  <div className="h-2 rounded-full bg-surface-container">
                    <div className="h-full w-[58%] rounded-full bg-[linear-gradient(90deg,#90a688,#bcc9b6)]" />
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
        className="absolute inset-x-4 bottom-2 top-3 overflow-hidden rounded-[1.2rem] border border-white/50 bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(249,249,247,0.66))] p-4 shadow-[0_24px_62px_rgba(45,52,50,0.1)] backdrop-blur-sm"
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
                          background: ["#90a688", "#d8c3a5", "#b8c0bb", "#90a688"][index],
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
                <div className="mb-3 h-2.5 w-20 rounded-full bg-[#d8c3a5]/85" />
                <div className="space-y-2">
                  <div className="h-2 rounded-full bg-surface-container" />
                  <div className="h-2 w-4/5 rounded-full bg-surface-container" />
                  <div className="h-2 w-3/5 rounded-full bg-surface-container" />
                </div>
              </div>
              <div className="rounded-[0.9rem] border border-outline-variant/10 bg-surface/58 p-3">
                <div className="mb-3 h-2.5 w-20 rounded-full bg-[#adc0a4]/85" />
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#90a688]" />
                    <div className="h-2 w-full rounded-full bg-surface-container" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#d8c3a5]" />
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

      <div className="relative h-full overflow-hidden rounded-[1.3rem] border border-white/65 bg-surface p-1.5 shadow-[0_36px_90px_rgba(45,52,50,0.14)] sm:p-2">
        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[1.15rem] border border-outline-variant/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(249,249,247,0.94))] p-4 sm:p-5">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(253,231,211,0.22),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(214,231,217,0.18),transparent_24%)]" />

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
              <section className="rounded-[1.05rem] border border-outline-variant/10 bg-surface/72 p-3 shadow-[0_14px_30px_rgba(45,52,50,0.05)]">
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

                  <div className="rounded-[0.95rem] border border-outline-variant/10 bg-[radial-gradient(circle_at_top_left,rgba(253,231,211,0.28),transparent_55%),linear-gradient(180deg,rgba(255,255,255,0.72),rgba(242,244,242,0.7))] p-2.5">
                    <div className="text-[8px] uppercase tracking-[0.18em] text-on-surface-variant/58">Concept A</div>
                    <div className="relative mx-auto mt-3 h-24 w-24 sm:h-28 sm:w-28">
                      <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="absolute bottom-0 left-1/2 h-8 w-24 -translate-x-1/2 rounded-sm bg-[linear-gradient(180deg,#efe7dc,#d8c3a5)] shadow-[0_10px_24px_rgba(45,52,50,0.08)]"
                      />
                      <motion.div
                        initial={{ y: 12, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
                        className="absolute bottom-5 left-4 h-8 w-16 rounded-[2px] bg-[linear-gradient(180deg,#f7f3ed,#e5d6c1)] shadow-[0_8px_20px_rgba(45,52,50,0.08)]"
                      />
                      <motion.div
                        initial={{ y: 14, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, delay: 0.16, ease: "easeOut" }}
                        className="absolute bottom-5 right-5 h-10 w-10 rounded-[2px] bg-[linear-gradient(180deg,#faf7f2,#e9dcc9)] shadow-[0_8px_20px_rgba(45,52,50,0.08)]"
                      />
                      <motion.div
                        initial={{ y: 16, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, delay: 0.24, ease: "easeOut" }}
                        className="absolute bottom-11 left-9 h-10 w-12 rounded-[2px] bg-[linear-gradient(180deg,#fdfbf8,#efe5d8)] shadow-[0_8px_20px_rgba(45,52,50,0.08)]"
                      />
                      <motion.div
                        initial={{ y: 18, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, delay: 0.32, ease: "easeOut" }}
                        className="absolute bottom-[3.9rem] left-1/2 h-8 w-10 -translate-x-1/2 rounded-[2px] bg-[linear-gradient(180deg,#fffdfb,#f1e8dc)] shadow-[0_8px_20px_rgba(45,52,50,0.08)]"
                      />
                      <div className="absolute inset-x-3 bottom-2 h-px bg-[#d8c3a5]/70" />
                    </div>
                    <div className="mt-2 text-[8px] uppercase tracking-[0.18em] text-on-surface-variant/64">Stepped timber-hybrid scheme</div>
                  </div>
                </div>
              </section>

              <aside className="rounded-[1.05rem] border border-outline-variant/10 bg-surface/72 p-3 shadow-[0_14px_30px_rgba(45,52,50,0.05)]">
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
              <section className="rounded-[1rem] border border-outline-variant/10 bg-surface/72 p-3 shadow-[0_14px_30px_rgba(45,52,50,0.05)]">
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <div className="text-[8px] uppercase tracking-[0.22em] text-on-surface-variant/62">Figure 02</div>
                    <div className="mt-1 text-[11px] font-semibold text-on-surface">Embodied carbon scenario comparison</div>
                  </div>
                  <div className="text-[8px] uppercase tracking-[0.18em] text-on-surface-variant/56">kgCO₂e / m² GFA</div>
                </div>

                <div className="relative h-[8.3rem] rounded-[0.95rem] border border-outline-variant/10 bg-[linear-gradient(to_top,rgba(90,96,92,0.04)_1px,transparent_1px),linear-gradient(to_right,rgba(90,96,92,0.04)_1px,transparent_1px)] bg-[size:100%_22px,40px_100%] p-2.5">
                  <div className="absolute left-2 top-2 text-[7px] uppercase tracking-[0.18em] text-on-surface-variant/44">A1-A3 + C3-C4</div>
                  <svg viewBox="0 0 240 120" className="h-full w-full" aria-hidden="true">
                    <motion.path
                      initial={{ pathLength: 0, opacity: 0.5 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.25, ease: "easeOut" }}
                      d="M10 88 C30 84, 44 46, 72 54 S116 96, 146 72 S190 26, 214 34 S228 60, 232 24"
                      fill="none"
                      stroke="#90a688"
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
                      stroke="#d8c3a5"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <circle cx="72" cy="54" r="3.5" fill="#90a688" />
                    <circle cx="146" cy="72" r="3.5" fill="#90a688" />
                    <circle cx="214" cy="34" r="3.5" fill="#90a688" />
                    <circle cx="84" cy="84" r="3" fill="#d8c3a5" />
                    <circle cx="154" cy="68" r="3" fill="#d8c3a5" />
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

              <section className="rounded-[1rem] border border-outline-variant/10 bg-surface/72 p-3 shadow-[0_14px_30px_rgba(45,52,50,0.05)]">
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
                        "conic-gradient(#90a688 0 34%, #d8c3a5 34% 62%, #b8c0bb 62% 84%, #dfe5df 84% 100%)",
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
              <section className="rounded-[1rem] border border-outline-variant/10 bg-surface/72 p-3 shadow-[0_14px_30px_rgba(45,52,50,0.05)]">
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

              <section className="rounded-[1rem] border border-outline-variant/10 bg-surface/72 p-3 shadow-[0_14px_30px_rgba(45,52,50,0.05)]">
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
  { label: "Partners", href: "/partners/" },
  { label: "Team", href: "/team/" },
  { label: "Blog", href: "/blog/" },
] as const;

type LensName = keyof typeof lensContent;

export default function App() {
  const [activeLens, setActiveLens] = useState<LensName>("Site");

  const lenses = Object.keys(lensContent) as LensName[];
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

  return (
    <div className="min-h-screen bg-surface selection:bg-primary/20">
      <nav className="fixed top-0 z-50 w-full border-b border-outline-variant/5 bg-surface/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1920px] items-center justify-between px-4 py-4 sm:px-6 sm:py-6 md:px-12">
          <a href="#top" className="font-headline text-2xl font-bold tracking-tighter text-on-surface">
            COCOON
          </a>

          <div className="flex items-center gap-4">
            <a
              href={demoRequestHref}
              aria-label={demoAriaLabel}
              className={demoButtonClassName}
            >
              Request Studio Demo
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
                className="serif max-w-4xl text-5xl leading-tight tracking-tight text-on-surface sm:text-6xl md:text-9xl"
              >
                Clear design <br />
                signals, <span className="italic">early.</span>
              </motion.h1>
              <motion.div variants={fadeInUp} className="max-w-sm text-on-surface-variant md:mt-0">
                <p className="font-body leading-relaxed">
                  Cocoon is the AI collaborator for early-stage feasibility. Moving from intuition to architectural proof in seconds.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
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
                      <div className="font-headline text-balance text-[1.42rem] leading-[0.94] font-bold tracking-[-0.02em] text-on-surface">
                        {activeLensContent.metricValue}
                      </div>
                      <div className="mt-1 max-w-[10.2rem] text-[9.5px] leading-[1.45] text-on-surface-variant">
                        {activeLensContent.metricNote}
                      </div>
                    </div>
                  </motion.div>

                  <div className="flex w-full justify-center">
                    <div className="glass-panel grid w-full max-w-[17rem] grid-cols-5 gap-1 rounded-[1.25rem] border border-white/20 p-1.25 shadow-xl">
                      {lenses.map((lens) => (
                        <button
                          key={`${lens}-mobile`}
                          type="button"
                          onClick={() => setActiveLens(lens)}
                          aria-pressed={activeLens === lens}
                          className={`min-w-0 rounded-[0.9rem] px-1 py-2.25 text-[9px] font-medium leading-none transition-all duration-300 ${
                            activeLens === lens
                              ? "bg-primary text-on-primary shadow-lg"
                              : "text-on-surface-variant hover:bg-surface-variant/40"
                          }`}
                        >
                          {lens}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="hidden w-full justify-center sm:flex">
                  <div className="glass-panel pointer-events-auto grid w-full max-w-[32rem] grid-cols-5 gap-1 rounded-[1.5rem] border border-white/20 p-1.5 shadow-xl sm:flex sm:w-auto sm:max-w-none sm:rounded-full">
                    {lenses.map((lens) => (
                      <button
                        key={lens}
                        type="button"
                        onClick={() => setActiveLens(lens)}
                        aria-pressed={activeLens === lens}
                        className={`min-w-0 rounded-full px-3 py-2.5 text-[11px] font-medium transition-all duration-300 sm:px-4 sm:py-2 sm:text-xs md:px-6 ${
                          activeLens === lens
                            ? "bg-primary text-on-primary shadow-lg"
                            : "text-on-surface-variant hover:bg-surface-variant/40"
                        }`}
                      >
                        {lens}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="lenses" className="scroll-mt-28 bg-surface-container-low px-4 py-24 sm:scroll-mt-32 sm:px-6 sm:py-32 md:px-12">
          <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-start gap-16 md:grid-cols-12">
            <div className="md:col-span-4">
              <h2 className="serif mb-8 text-4xl text-on-surface sm:text-5xl">
                One workspace.
                <br />
                Four lenses.
              </h2>
              <p className="mb-12 font-body leading-relaxed text-on-surface-variant">
                Cocoon doesn&apos;t just generate; it validates. Each lens provides a specific architectural truth, synchronized in real-time as your
                design evolves.
              </p>
              <a href={exploreMailto} className="group flex items-center gap-4 text-primary">
                <span className="serif border-b border-outline-variant/30 text-xl italic transition-all group-hover:border-primary">
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
            <div className="flex flex-col gap-20 md:flex-row">
              <div className="md:w-1/2">
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
                      <span className="font-headline text-3xl italic text-outline-variant/40 sm:text-4xl">{step.id}</span>
                      <div>
                        <h4 className="mb-2 font-body text-lg font-bold sm:text-xl">{step.title}</h4>
                        <p className="font-body text-sm text-on-surface-variant">{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-center md:w-1/2">
                <WorkflowReportPreview />
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-32 text-center sm:px-6 sm:py-40 md:px-12">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="serif mb-8 text-5xl text-on-surface sm:text-6xl md:text-7xl">Design the next horizon.</h2>
            <p className="serif mb-12 text-xl italic text-on-surface-variant">Join the studios defining the future of practice.</p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href={demoRequestHref}
                aria-label={demoAriaLabel}
                className={`inline-flex w-full justify-center sm:w-auto ${demoButtonClassName}`}
              >
                Request Studio Demo
              </a>
              <a
                href="/monograph/"
                className={`inline-flex w-full justify-center sm:w-auto ${secondaryCtaClassName}`}
              >
                Read the Monograph
              </a>
            </div>
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
