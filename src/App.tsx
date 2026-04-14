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

              <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4 sm:p-6 md:p-12">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="pointer-events-auto">
                    <motion.span
                      key={`${activeLens}-chip`}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="blueprint-chip inline-flex max-w-full rounded-full border border-white/20 bg-surface-container-highest/80 px-3 py-1 text-[11px] leading-relaxed backdrop-blur-md sm:text-sm"
                    >
                      {activeLensContent.chip}
                    </motion.span>
                  </div>
                  <div className="pointer-events-auto w-full sm:w-auto">
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

                <div className="flex w-full justify-center">
                  <div className="glass-panel pointer-events-auto grid w-full max-w-[32rem] grid-cols-3 gap-1 rounded-[1.5rem] border border-white/20 p-1.5 shadow-xl sm:flex sm:w-auto sm:max-w-none sm:rounded-full">
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
                <motion.div
                  initial={{ rotate: 0, scale: 0.9 }}
                  whileInView={{ rotate: 2, scale: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="relative aspect-[4/5] w-full max-w-[22rem] rounded-sm bg-surface p-1.5 shadow-2xl sm:max-w-md sm:p-1"
                >
                  <div className="relative flex h-full w-full flex-col overflow-hidden border border-outline-variant/10 bg-surface-container-lowest p-5 sm:p-8">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(253,231,211,0.2),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(214,231,217,0.18),transparent_28%)]" />

                    <div className="relative mb-8 flex items-center justify-between sm:mb-10">
                      <div className="space-y-2">
                        <div className="h-3 w-20 bg-surface-container sm:h-4 sm:w-24" />
                        <div className="h-2 w-12 bg-surface-container-low sm:h-2.5 sm:w-14" />
                      </div>
                      <div className="h-7 w-7 rounded-[0.85rem] bg-primary-container sm:h-8 sm:w-8" />
                    </div>

                    <div className="relative flex-1 space-y-4 sm:space-y-5">
                      <div className="grid gap-3 sm:grid-cols-[1.35fr_0.85fr]">
                        <div className="rounded-[1.1rem] border border-outline-variant/10 bg-surface/65 p-3 shadow-[0_10px_24px_rgba(45,52,50,0.05)]">
                          <div className="mb-3 h-2.5 w-20 rounded-full bg-[#adc0a4]/90 sm:w-24" />
                          <div className="h-24 rounded-[0.95rem] border border-outline-variant/10 bg-[linear-gradient(to_top,rgba(90,96,92,0.04)_1px,transparent_1px),linear-gradient(to_right,rgba(90,96,92,0.04)_1px,transparent_1px)] bg-[size:100%_24px,42px_100%] p-2 sm:h-28">
                            <svg viewBox="0 0 240 120" className="h-full w-full" aria-hidden="true">
                              <path
                                d="M10 84 C35 80, 48 44, 76 54 S120 98, 148 73 S188 26, 214 36 S228 63, 232 27"
                                fill="none"
                                stroke="#90a688"
                                strokeWidth="3"
                                strokeLinecap="round"
                              />
                              <path
                                d="M10 96 C34 88, 58 76, 84 82 S124 60, 154 66 S192 90, 232 58"
                                fill="none"
                                stroke="#d8c3a5"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                opacity="0.95"
                              />
                              <circle cx="76" cy="54" r="3.5" fill="#90a688" />
                              <circle cx="148" cy="73" r="3.5" fill="#90a688" />
                              <circle cx="214" cy="36" r="3.5" fill="#90a688" />
                            </svg>
                          </div>
                        </div>

                        <div className="rounded-[1.1rem] border border-outline-variant/10 bg-surface/65 p-3 shadow-[0_10px_24px_rgba(45,52,50,0.05)]">
                          <div className="mb-3 h-2.5 w-16 rounded-full bg-[#d8c3a5]/95 sm:w-20" />
                          <div className="grid h-24 place-items-center sm:h-28">
                            <div
                              className="relative h-20 w-20 rounded-full sm:h-24 sm:w-24"
                              style={{
                                background:
                                  "conic-gradient(#90a688 0 36%, #d8c3a5 36% 68%, #b7bdb6 68% 86%, rgba(90,96,92,0.08) 86% 100%)",
                              }}
                            >
                              <div className="absolute inset-[18px] rounded-full border border-outline-variant/10 bg-surface-container-lowest sm:inset-[20px]" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="rounded-[1rem] border border-outline-variant/10 bg-surface/72 p-3 shadow-[0_10px_24px_rgba(45,52,50,0.04)]">
                          <div className="mb-3 h-2 w-16 rounded-full bg-[#b9c1bc] sm:w-20" />
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="h-1.5 w-8 rounded-full bg-surface-container" />
                              <div className="h-2 flex-1 rounded-full bg-surface-container">
                                <div className="h-full w-[76%] rounded-full bg-[linear-gradient(90deg,#90a688,#bcc9b6)]" />
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="h-1.5 w-8 rounded-full bg-surface-container" />
                              <div className="h-2 flex-1 rounded-full bg-surface-container">
                                <div className="h-full w-[62%] rounded-full bg-[linear-gradient(90deg,#d8c3a5,#e8dcc9)]" />
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="h-1.5 w-8 rounded-full bg-surface-container" />
                              <div className="h-2 flex-1 rounded-full bg-surface-container">
                                <div className="h-full w-[48%] rounded-full bg-[linear-gradient(90deg,#a8afb0,#c8cecf)]" />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-[1rem] border border-outline-variant/10 bg-surface/72 p-3 shadow-[0_10px_24px_rgba(45,52,50,0.04)]">
                          <div className="mb-3 h-2 w-16 rounded-full bg-[#adc0a4]/85 sm:w-20" />
                          <div className="space-y-2">
                            <div className="h-3 rounded-full bg-surface-container" />
                            <div className="h-3 w-4/5 rounded-full bg-surface-container" />
                            <div className="h-3 rounded-full bg-surface-container" />
                            <div className="h-3 w-1/2 rounded-full bg-surface-container" />
                          </div>
                        </div>

                        <div className="rounded-[1rem] border border-outline-variant/10 bg-surface/72 p-3 shadow-[0_10px_24px_rgba(45,52,50,0.04)]">
                          <div className="mb-3 h-2 w-16 rounded-full bg-[#d8c3a5]/90 sm:w-20" />
                          <div className="space-y-2.5">
                            <div className="flex items-center gap-2">
                              <div className="h-2.5 w-2.5 rounded-full bg-[#d8c3a5]" />
                              <div className="h-2 w-3/4 rounded-full bg-surface-container" />
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="h-2.5 w-2.5 rounded-full bg-[#90a688]" />
                              <div className="h-2 w-1/2 rounded-full bg-surface-container" />
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="h-2.5 w-2.5 rounded-full bg-[#a8afb0]" />
                              <div className="h-2 w-full rounded-full bg-surface-container" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="relative mt-auto flex items-center justify-between border-t border-outline-variant/10 pt-5 sm:pt-6">
                      <div className="h-3 w-12 bg-surface-container sm:w-14" />
                      <div className="h-3 w-12 bg-surface-container sm:w-14" />
                    </div>
                  </div>

                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute right-3 top-3 max-w-[8.5rem] rounded-sm bg-on-surface p-3 font-body text-[9px] text-surface shadow-xl sm:-left-12 sm:right-auto sm:top-1/4 sm:max-w-[120px] sm:text-[10px]"
                  >
                    <Sparkles size={14} className="mb-1" />
                    DESIGNED FOR LOWER CARBON IMPACT
                  </motion.div>
                </motion.div>
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
