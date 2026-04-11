import Image from "next/image";
import Link from "next/link";

import { ArchitecturalShell } from "./ArchitecturalShell";
import {
  landingNavItems,
  lensCards,
  outputCards,
  studioLogos,
  workflowSteps,
  workspaceFeatureCards
} from "./data";
import { StudioIcon } from "./icons";

export function ArchitecturalLandingPage() {
  return (
    <ArchitecturalShell
      navItems={landingNavItems}
      ctaLabel="Begin Exploration"
      ctaHref="/app"
    >
      <section className="pb-12 pt-6 md:pb-16 md:pt-10">
        <div className="studio-container">
          <div className="mb-14 grid gap-8 md:grid-cols-[minmax(0,1fr)_18rem] md:items-end">
            <div>
              <p className="editorial-kicker mb-5">The Digital Curator</p>
              <h1 className="max-w-5xl font-display text-[3.8rem] leading-[0.95] tracking-[-0.05em] text-studio-ink sm:text-[5rem] md:text-[6.75rem] lg:text-[7.8rem]">
                Clear design
                <br />
                signals, <span className="italic">early.</span>
              </h1>
            </div>
            <div className="max-w-sm justify-self-end text-sm leading-7 text-studio-muted">
              The AI collaborator for feasibility, yielding a quiet workspace
              where site, cost, carbon, code, and visual intent stay in
              conversation.
            </div>
          </div>

          <HeroCanvas />
        </div>
      </section>

      <section className="pb-20">
        <div className="studio-container">
          <div className="rounded-[1.5rem] bg-studio-low px-6 py-8 md:px-10">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-[0.72rem] uppercase tracking-[0.22em] text-studio-muted">
                Selected studios
              </p>
              <p className="font-display text-lg italic text-studio-sand">
                Designed for firms that need evidence as much as inspiration.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
              {studioLogos.map((logo) => (
                <div
                  key={logo.src}
                  className="flex h-16 items-center justify-center rounded-[1.2rem] bg-studio-background/60 px-5"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={140}
                    height={48}
                    className="h-7 w-auto object-contain opacity-90 [filter:brightness(0)_saturate(0)_contrast(1.05)]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="lenses" className="bg-studio-low py-24 md:py-32">
        <div className="studio-container grid gap-14 md:grid-cols-[0.92fr_1.08fr] md:gap-16">
          <div className="max-w-xl">
            <p className="editorial-kicker mb-6">One workspace</p>
            <h2 className="font-display text-5xl leading-tight tracking-[-0.04em] text-studio-ink md:text-6xl">
              Five lenses.
              <br />
              One architectural truth.
            </h2>
            <p className="mt-8 text-sm leading-7 text-studio-muted md:text-base">
              Cocoon does not stop at generation. It validates every move with a
              synchronized set of lenses so the design team can see consequence,
              not just possibility.
            </p>
            <Link
              href="/app"
              className="mt-10 inline-flex items-center gap-3 font-display text-2xl italic text-studio-primary"
            >
              <span className="border-b border-studio-line/30 pb-1">
                Explore the engine
              </span>
              <StudioIcon name="arrow" className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {lensCards.map((lens, index) => (
              <article
                key={lens.title}
                className={[
                  "rounded-[1.4rem] bg-studio-background px-7 py-8 paper-lift",
                  index === lensCards.length - 1 ? "sm:col-span-2" : ""
                ].join(" ")}
              >
                <div className="mb-6 inline-flex rounded-full bg-studio-high p-3 text-studio-primary">
                  <StudioIcon name={lens.icon} className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold tracking-[-0.02em] text-studio-ink">
                  {lens.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-studio-muted">
                  {lens.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="py-24 md:py-32">
        <div className="studio-container">
          <div className="mb-14 max-w-3xl">
            <p className="editorial-kicker mb-5">Inside the workspace</p>
            <h2 className="font-display text-5xl leading-tight tracking-[-0.04em] text-studio-ink md:text-6xl">
              App screens with the calm of a studio wall.
            </h2>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-studio-muted md:text-base">
              Each screen is tuned for signal density without software noise:
              fewer borders, softer layers, and clear architectural hierarchy.
            </p>
          </div>

          <div className="grid gap-8 xl:grid-cols-3">
            {workspaceFeatureCards.map((card, index) => (
              <article
                key={card.title}
                className="rounded-[1.6rem] bg-studio-inset p-6 ambient-panel"
              >
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[0.72rem] uppercase tracking-[0.22em] text-studio-muted">
                      {card.eyebrow}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-studio-ink">
                      {card.title}
                    </h3>
                  </div>
                  <div className="rounded-full bg-studio-background p-3 text-studio-primary">
                    <StudioIcon name={card.icon} className="h-5 w-5" />
                  </div>
                </div>

                <div className="mb-6">{renderFeaturePreview(index)}</div>

                <p className="text-sm leading-7 text-studio-muted">
                  {card.description}
                </p>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {card.points.map((point) => (
                    <li key={point} className="blueprint-chip bg-studio-background">
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="outputs" className="bg-studio-background py-24 md:py-32">
        <div className="studio-container">
          <div className="mb-16 text-center">
            <span className="blueprint-chip bg-[#f3dfcc] text-studio-sand">
              The handover
            </span>
            <h2 className="mt-6 font-display text-5xl leading-tight tracking-[-0.04em] text-studio-ink md:text-6xl">
              Clear outputs.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-studio-muted md:text-base">
              Every iteration leaves behind a structured package that is ready
              for design reviews, consultant coordination, and planning dialogue.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {outputCards.map((card, index) => (
              <article key={card.title} className="group">
                <div className="mb-6 rounded-[1.4rem] bg-studio-low p-5 ambient-panel">
                  {renderOutputPreview(index)}
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-studio-high p-2 text-studio-primary">
                    <StudioIcon name={card.icon} className="h-4 w-4" />
                  </div>
                  <h3 className="text-xl font-semibold tracking-[-0.02em] text-studio-ink">
                    {card.title}
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-7 text-studio-muted">
                  {card.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="workflow" className="bg-studio-inset py-24 md:py-32">
        <div className="studio-container grid gap-14 md:grid-cols-[0.95fr_1.05fr] md:items-center">
          <div>
            <p className="editorial-kicker mb-6">Studio workflow</p>
            <h2 className="font-display text-5xl leading-tight tracking-[-0.04em] text-studio-ink md:text-6xl">
              Digital speed.
              <br />
              Architectural calm.
            </h2>

            <div className="mt-12 space-y-10">
              {workflowSteps.map((step, index) => (
                <div
                  key={step.number}
                  className={[
                    "flex gap-6 border-l-2 pl-6",
                    index === 0 ? "border-studio-primary" : "border-studio-line/20"
                  ].join(" ")}
                >
                  <span className="font-display text-4xl italic text-studio-line">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.02em] text-studio-ink">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-studio-muted">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <WorkflowPaper />
        </div>
      </section>

      <section className="py-28 text-center md:py-36">
        <div className="studio-container">
          <h2 className="font-display text-[3.5rem] leading-none tracking-[-0.05em] text-studio-ink md:text-[5.6rem]">
            Design the next horizon.
          </h2>
          <p className="mt-6 font-display text-2xl italic text-studio-muted">
            Join the studios defining the future of practice.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/contact" className="studio-primary-button px-8 py-3.5">
              Request Studio Demo
            </Link>
            <Link href="/resources" className="studio-secondary-button px-8 py-3.5">
              Read the Monograph
            </Link>
          </div>
        </div>
      </section>
    </ArchitecturalShell>
  );
}

function HeroCanvas() {
  return (
    <div className="relative overflow-hidden rounded-[1.8rem] bg-studio-inset paper-lift">
      <div className="absolute inset-0 studio-grid opacity-40" />
      <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(255,255,255,0.55),transparent)]" />
      <div className="absolute -left-20 top-10 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(214,231,217,0.8),transparent_72%)]" />
      <div className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(253,231,211,0.9),transparent_72%)]" />

      <div className="relative aspect-[16/10] p-6 md:aspect-[16/9] md:p-10">
        <div className="flex items-start justify-between gap-4">
          <span className="blueprint-chip">
            Site: lat 40.7128° N · long 74.0060° W
          </span>

          <div className="space-y-3">
            <MetricCard
              title="Carbon forecast"
              value="14.2 kgCO2e/m²"
              icon="leaf"
            />
            <MetricCard title="Sun hours" value="6.8 avg / day" icon="sun" />
          </div>
        </div>

        <div className="relative mx-auto mt-8 grid h-[62%] max-w-5xl grid-cols-[1.2fr_0.8fr] gap-5">
          <div className="relative overflow-hidden rounded-[1.6rem] bg-studio-lowest p-6 shadow-studio">
            <div className="absolute inset-0 studio-grid opacity-35" />
            <div className="absolute inset-x-0 top-0 h-16 bg-[linear-gradient(180deg,rgba(90,96,92,0.06),transparent)]" />

            <div className="relative grid h-full grid-cols-[1.1fr_0.9fr] gap-6">
              <div className="flex flex-col justify-between">
                <div>
                  <p className="text-[0.72rem] uppercase tracking-[0.22em] text-studio-muted">
                    Massing study A
                  </p>
                  <h3 className="mt-3 max-w-xs font-display text-3xl leading-tight tracking-[-0.04em] text-studio-ink">
                    Courtyard timber
                    <br />
                    housing block
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <InfoTile label="GFA" value="11,260 m²" />
                  <InfoTile label="Units" value="98 homes" />
                  <InfoTile label="FAR" value="4.2" />
                  <InfoTile label="Envelope" value="Step-back east" />
                </div>
              </div>

              <div className="relative flex items-center justify-center">
                <div className="absolute inset-8 rounded-[1.4rem] border border-studio-line/15 bg-[radial-gradient(circle_at_top,rgba(236,239,236,0.75),rgba(249,249,247,0.95))]" />
                <div className="absolute left-[20%] top-[18%] h-28 w-20 rounded-[1rem] bg-[#d9dfda]" />
                <div className="absolute left-[43%] top-[28%] h-36 w-24 rounded-[1rem] bg-[#cfd6d1]" />
                <div className="absolute left-[60%] top-[16%] h-20 w-16 rounded-[0.9rem] bg-[#dde3de]" />
                <div className="absolute bottom-[18%] left-[18%] right-[16%] h-14 rounded-[1rem] bg-[#e8ece8]" />
                <div className="absolute bottom-[20%] left-[26%] h-8 w-8 rounded-full bg-[#d8e4d7]" />
              </div>
            </div>
          </div>

          <div className="grid gap-5">
            <div className="rounded-[1.5rem] bg-studio-lowest p-5 shadow-studio">
              <p className="text-[0.72rem] uppercase tracking-[0.22em] text-studio-muted">
                Live zoning check
              </p>
              <div className="mt-5 space-y-4">
                {[
                  ["Height", "Compliant", "bg-[#d9ebe0] text-studio-success"],
                  ["Coverage", "Compliant", "bg-[#d9ebe0] text-studio-success"],
                  ["Parking", "At risk", "bg-[#eadfcf] text-studio-caution"]
                ].map(([label, value, tone]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-4 text-sm"
                  >
                    <span className="text-studio-ink">{label}</span>
                    <span className={`rounded-full px-3 py-1 ${tone}`}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] bg-studio-primary p-5 text-studio-lowest shadow-studio">
              <p className="text-[0.72rem] uppercase tracking-[0.22em] text-studio-lowest/70">
                Studio note
              </p>
              <p className="mt-4 font-display text-2xl leading-tight tracking-[-0.03em]">
                Shift the north wing two bays to improve daylight and reduce the
                concrete transfer.
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <div className="glass-panel flex items-center gap-1 rounded-full border border-white/40 p-2">
            {["Site", "Cost", "Carbon", "Code", "Visuals"].map((label, index) => (
              <button
                key={label}
                type="button"
                className={[
                  "rounded-full px-4 py-2 text-xs font-semibold tracking-[0.08em] transition-colors md:px-6",
                  index === 0
                    ? "bg-studio-primary text-studio-lowest"
                    : "text-studio-muted hover:bg-studio-background/70"
                ].join(" ")}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  title,
  value,
  icon
}: {
  title: string;
  value: string;
  icon: "leaf" | "sun";
}) {
  return (
    <div className="flex items-center gap-3 rounded-[1.1rem] border border-studio-line/15 bg-studio-background/80 px-4 py-3 shadow-studio backdrop-blur">
      <div className="rounded-full bg-studio-high p-2 text-studio-primary">
        <StudioIcon name={icon} className="h-4 w-4" />
      </div>
      <div>
        <p className="text-[0.62rem] uppercase tracking-[0.22em] text-studio-muted">
          {title}
        </p>
        <p className="mt-1 text-base font-semibold text-studio-ink">{value}</p>
      </div>
    </div>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1rem] bg-studio-low px-4 py-3">
      <p className="text-[0.62rem] uppercase tracking-[0.2em] text-studio-muted">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold text-studio-ink">{value}</p>
    </div>
  );
}

function renderFeaturePreview(index: number) {
  if (index === 0) {
    return <PortfolioFeaturePreview />;
  }

  if (index === 1) {
    return <StudyFeaturePreview />;
  }

  return <DossierFeaturePreview />;
}

function PortfolioFeaturePreview() {
  return (
    <div className="rounded-[1.35rem] bg-studio-background p-4 shadow-studio">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[0.62rem] uppercase tracking-[0.2em] text-studio-muted">
            Workspace
          </p>
          <p className="mt-1 font-display text-2xl italic text-studio-ink">
            Portfolio
          </p>
        </div>
        <div className="rounded-full bg-studio-low px-3 py-1 text-xs text-studio-primary">
          12 active studies
        </div>
      </div>

      <div className="space-y-3">
        {["Harbour Infill Housing", "Monk Street Retrofit", "Westmount Civic Block"].map(
          (item, index) => (
            <div
              key={item}
              className="grid grid-cols-[1fr_auto] gap-4 rounded-[1rem] bg-studio-low px-4 py-3"
            >
              <div>
                <p className="text-sm font-semibold text-studio-ink">{item}</p>
                <p className="mt-1 text-xs text-studio-muted">
                  {index === 0
                    ? "Options in review"
                    : index === 1
                      ? "Carbon lens active"
                      : "Submission package"}
                </p>
              </div>
              <span className="self-center rounded-full bg-studio-high px-3 py-1 text-[0.68rem] text-studio-primary">
                {index === 2 ? "Ready" : "Live"}
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
}

function StudyFeaturePreview() {
  return (
    <div className="rounded-[1.35rem] bg-studio-background p-4 shadow-studio">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {["Site", "Cost", "Carbon", "Code", "Visuals"].map((item, index) => (
          <span
            key={item}
            className={[
              "rounded-full px-3 py-1 text-[0.7rem]",
              index === 0
                ? "bg-studio-primary text-studio-lowest"
                : "bg-studio-low text-studio-muted"
            ].join(" ")}
          >
            {item}
          </span>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-[1.2fr_0.8fr]">
        <div className="relative min-h-[11rem] overflow-hidden rounded-[1.1rem] bg-studio-low">
          <div className="absolute inset-0 studio-grid opacity-40" />
          <div className="absolute left-[18%] top-[24%] h-20 w-16 rounded-[0.9rem] bg-[#d7ddd8]" />
          <div className="absolute left-[42%] top-[18%] h-28 w-20 rounded-[1rem] bg-[#ccd3ce]" />
          <div className="absolute bottom-[18%] left-[20%] right-[18%] h-10 rounded-[0.9rem] bg-[#e5e9e6]" />
        </div>
        <div className="space-y-3">
          <div className="rounded-[1rem] bg-studio-low px-4 py-3">
            <p className="text-[0.62rem] uppercase tracking-[0.2em] text-studio-muted">
              Daylight
            </p>
            <p className="mt-2 text-sm font-semibold text-studio-ink">
              82% target achieved
            </p>
          </div>
          <div className="rounded-[1rem] bg-studio-low px-4 py-3">
            <p className="text-[0.62rem] uppercase tracking-[0.2em] text-studio-muted">
              Envelope
            </p>
            <p className="mt-2 text-sm font-semibold text-studio-ink">
              East step-back added
            </p>
          </div>
          <div className="rounded-[1rem] bg-studio-low px-4 py-3">
            <p className="text-[0.62rem] uppercase tracking-[0.2em] text-studio-muted">
              Comment
            </p>
            <p className="mt-2 text-sm font-semibold text-studio-ink">
              Preserve courtyard proportion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DossierFeaturePreview() {
  return (
    <div className="rounded-[1.35rem] bg-studio-background p-4 shadow-studio">
      <div className="rounded-[1rem] bg-studio-lowest p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[0.62rem] uppercase tracking-[0.2em] text-studio-muted">
              Dossier
            </p>
            <p className="mt-1 font-display text-2xl italic text-studio-ink">
              Scheme A handover
            </p>
          </div>
          <div className="rounded-full bg-studio-low px-3 py-1 text-xs text-studio-primary">
            PDF + BIM
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {["Feasibility summary", "Carbon and cost", "Consultant handoff"].map(
            (item) => (
              <div
                key={item}
                className="rounded-[0.95rem] bg-studio-low px-4 py-3 text-sm font-semibold text-studio-ink"
              >
                {item}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

function renderOutputPreview(index: number) {
  if (index === 0) {
    return (
      <div className="rounded-[1.15rem] bg-studio-lowest p-5">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-[0.62rem] uppercase tracking-[0.2em] text-studio-muted">
              Geometry
            </p>
            <p className="mt-2 text-lg font-semibold text-studio-ink">
              IFC classification
            </p>
          </div>
          <div className="rounded-full bg-studio-low px-3 py-1 text-xs text-studio-primary">
            Revit / Rhino
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-[1rem] bg-studio-low p-4">
            <div className="studio-grid h-36 rounded-[0.9rem] opacity-60" />
          </div>
          <div className="space-y-3">
            {["Envelope", "Core", "Structure"].map((item) => (
              <div
                key={item}
                className="rounded-[0.9rem] bg-studio-low px-4 py-3 text-sm text-studio-ink"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (index === 1) {
    return (
      <div className="rounded-[1.15rem] bg-studio-lowest p-5">
        <div className="space-y-3">
          <div className="h-10 rounded-[0.9rem] bg-studio-low" />
          <div className="grid grid-cols-[1.1fr_0.9fr] gap-3">
            <div className="rounded-[0.9rem] bg-studio-low p-4">
              <div className="h-28 rounded-[0.8rem] bg-[linear-gradient(180deg,rgba(90,96,92,0.08),rgba(90,96,92,0.02))]" />
            </div>
            <div className="space-y-3">
              <div className="h-20 rounded-[0.9rem] bg-studio-low" />
              <div className="h-20 rounded-[0.9rem] bg-studio-low" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[1.15rem] bg-studio-lowest p-5">
      <div className="relative overflow-hidden rounded-[1rem] bg-[linear-gradient(145deg,#d6ddd8,#f6f4ee)] p-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.7),transparent_36%)]" />
        <div className="relative flex min-h-[15rem] items-end justify-between gap-4">
          <div className="space-y-3">
            <div className="h-24 w-28 rounded-[1rem] bg-white/55 backdrop-blur" />
            <div className="h-16 w-20 rounded-[0.9rem] bg-white/45 backdrop-blur" />
          </div>
          <div className="h-40 w-36 rounded-[1.2rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.45),rgba(90,96,92,0.08))]" />
        </div>
      </div>
    </div>
  );
}

function WorkflowPaper() {
  return (
    <div className="relative mx-auto max-w-md">
      <div className="paper-lift rotate-[2deg] rounded-[0.6rem] bg-studio-background p-2">
        <div className="rounded-[0.45rem] bg-studio-lowest p-7">
          <div className="mb-8 flex items-center justify-between">
            <div className="h-4 w-24 rounded-full bg-studio-low" />
            <div className="h-9 w-9 rounded-full bg-[#dce3de]" />
          </div>

          <div className="space-y-5">
            <div className="h-36 rounded-[0.7rem] bg-studio-low" />
            <div className="h-4 w-3/4 rounded-full bg-studio-inset" />
            <div className="h-4 w-1/2 rounded-full bg-studio-inset" />
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="h-24 rounded-[0.7rem] bg-[#eef2ee]" />
              <div className="h-24 rounded-[0.7rem] bg-[#eef2ee]" />
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-studio-line/10 pt-6">
            <div className="h-3 w-12 rounded-full bg-studio-inset" />
            <div className="h-3 w-12 rounded-full bg-studio-inset" />
          </div>
        </div>
      </div>

      <div className="absolute -left-8 top-20 max-w-[10rem] rounded-[0.45rem] bg-studio-ink px-4 py-3 text-[0.65rem] uppercase tracking-[0.18em] text-studio-lowest shadow-studio">
        <div className="mb-2 text-studio-lowest/80">AI note</div>
        Optimized for solar gain.
      </div>
    </div>
  );
}
