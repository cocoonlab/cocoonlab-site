"use client";

import { useMemo, useRef, useState, type ReactNode } from "react";

import { Section } from "@/components/Section";
import { FeatureModal } from "./FeatureModal";

type Feature = {
  key: "project-brain" | "zoning-aware" | "crafted";
  title: string;
  illustration: "layers" | "massing" | "timeline";
};

type FeatureDetails = {
  title: string;
  body: string[];
  quote: string;
  customerLogo: string;
  metrics: { value: string; label: string }[];
  heroIllustration: ReactNode;
};

const features: Feature[] = [
  {
    key: "project-brain",
    title: "Project Brain for complex sites",
    illustration: "layers"
  },
  {
    key: "zoning-aware",
    title: "Zoning-aware concepting",
    illustration: "massing"
  },
  {
    key: "crafted",
    title: "Crafted to perfection",
    illustration: "timeline"
  }
];

function FeatureIllustration({ variant }: { variant: Feature["illustration"] }) {
  if (variant === "layers") {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-b from-white/10 via-white/5 to-white/0 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(136,156,250,0.35),transparent_35%),_radial-gradient(circle_at_80%_0%,rgba(45,212,191,0.28),transparent_38%)]" />
        <div className="relative flex h-full flex-col justify-center gap-3 p-4">
          {["Requirements", "Constraints", "Options"].map((label, index) => (
            <div
              key={label}
              className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 shadow-[0_14px_40px_rgba(0,0,0,0.25)]"
              style={{ marginLeft: index * 6 }}
            >
              <div className="h-9 w-10 rounded-lg bg-gradient-to-br from-white/30 to-white/5" />
              <div className="space-y-1">
                <div className="h-2 w-20 rounded-full bg-white/50" />
                <div className="h-2 w-28 rounded-full bg-white/30" />
              </div>
              <span className="ml-auto text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "massing") {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-b from-white/10 via-white/5 to-white/0 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(45,212,191,0.35),transparent_42%),_radial-gradient(circle_at_10%_40%,rgba(129,140,248,0.35),transparent_36%)]" />
        <div className="relative flex h-full items-end gap-3 p-4">
          {[64, 96, 132].map((height, idx) => (
            <div key={height} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="w-full rounded-lg bg-gradient-to-br from-white/50 to-white/15"
                style={{ height }}
              />
              <div className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
                <span className="h-5 w-[2px] rounded-full bg-white/40" />
                <span>{idx === 0 ? "T1" : idx === 1 ? "T2" : "T3"}</span>
              </div>
            </div>
          ))}
          <div className="absolute inset-x-5 bottom-4 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
            <span>Height</span>
            <span>Setback</span>
            <span>FAR</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-b from-white/10 via-white/5 to-white/0 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(129,140,248,0.38),transparent_40%),_radial-gradient(circle_at_80%_10%,rgba(45,212,191,0.28),transparent_40%)]" />
      <div className="relative flex h-full items-center justify-between px-4">
        <div className="h-[3px] flex-1 bg-gradient-to-r from-white/70 via-white/50 to-white/20" />
        {[0, 1, 2, 3].map((_, idx) => (
          <div key={idx} className="relative -mt-2 flex flex-col items-center gap-2">
            <div className="h-11 w-[3px] rounded-full bg-white/50" />
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/60">
              <span className="h-2 w-2 rounded-full bg-white" />
              <span>{idx === 0 ? "Brief" : idx === 1 ? "Option" : idx === 2 ? "Review" : "Decision"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectBrainHero() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(59,130,246,0.25),transparent_35%),_radial-gradient(circle_at_70%_0%,rgba(56,189,248,0.2),transparent_36%),_linear-gradient(135deg,rgba(255,255,255,0.1),transparent)]" />
      <div className="relative grid h-full grid-cols-5 gap-3 p-6">
        {["Client goals", "Requirements", "Constraints", "Risks & hazards", "LEED & sustainability"].map((label, index) => (
          <div
            key={label}
            className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
            style={{ transform: `translateY(${index % 2 === 0 ? "0" : "6"}px)` }}
          >
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent-blue/80" />
                {label}
              </span>
              <span className="rounded-full bg-white/5 px-2 py-1 text-[10px] text-text-muted">Live</span>
            </div>
            <div className="space-y-2 text-[13px] text-text-muted">
              <div className="h-2 w-full rounded-full bg-white/30" />
              <div className="h-2 w-5/6 rounded-full bg-white/20" />
              <div className="h-2 w-4/6 rounded-full bg-white/10" />
            </div>
            <div className="space-y-2 rounded-xl bg-surface-sunken/80 p-3 text-[12px] text-text-soft">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-white/40">
                <span>Signals</span>
                <span>Linked</span>
              </div>
              <div className="h-2 rounded-full bg-accent-blue/40" />
              <div className="h-2 rounded-full bg-accent-green/40" />
            </div>
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-6 rounded-2xl border border-white/5" />
    </div>
  );
}

function CraftedHero() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(94,234,212,0.22),transparent_45%),_radial-gradient(circle_at_75%_10%,rgba(129,140,248,0.28),transparent_40%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:32px_32px] opacity-40" />
      <div className="absolute inset-x-8 bottom-10 h-40 rounded-3xl border border-dashed border-white/20 bg-gradient-to-b from-white/5 via-white/0 to-white/0 blur-[1px]" />
      <div className="relative mx-auto flex h-full max-w-2xl items-center justify-center px-6">
        <div className="relative w-full max-w-xl -rotate-2 rounded-2xl border border-white/15 bg-gradient-to-br from-surface-raised/90 to-surface-sunken/90 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
          <div className="mb-4 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent-green" />
              Create study
            </span>
            <span className="rounded-full bg-white/5 px-2 py-1 text-[10px] text-text-muted">Traceable</span>
          </div>
          <div className="space-y-3 text-[13px] text-text-muted">
            <div className="flex items-center justify-between rounded-xl bg-white/5 p-3">
              <div>
                <div className="text-sm font-semibold text-white">Narrative</div>
                <p className="text-xs text-text-muted">Align story for city review</p>
              </div>
              <span className="rounded-full bg-accent-blue/20 px-3 py-1 text-[11px] font-semibold text-accent-blue">In progress</span>
            </div>
            <div className="rounded-xl bg-white/5 p-3">
              <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
                <span>Checks</span>
                <span>Auto</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-[11px] text-text-muted">
                <div className="rounded-lg bg-accent-blue/15 px-2 py-3">
                  <div className="text-sm font-semibold text-white">Daylight</div>
                  <p>North + core</p>
                </div>
                <div className="rounded-lg bg-accent-green/15 px-2 py-3">
                  <div className="text-sm font-semibold text-white">Program</div>
                  <p>Optimised</p>
                </div>
                <div className="rounded-lg bg-white/10 px-2 py-3">
                  <div className="text-sm font-semibold text-white">Access</div>
                  <p>Shared</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-white/5 p-3">
              <div className="space-y-1">
                <div className="text-sm font-semibold text-white">City packet</div>
                <p className="text-xs text-text-muted">Auto-sync diagrams, updates, and rationale.</p>
              </div>
              <div className="flex flex-col items-end gap-1 text-right text-[11px] text-text-muted">
                <span className="rounded-full bg-white/10 px-2 py-1 font-semibold text-white">Ready</span>
                <span>Last edited 6m</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ZoningHero() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(45,212,191,0.28),transparent_40%),_radial-gradient(circle_at_10%_40%,rgba(129,140,248,0.28),transparent_38%)]" />
      <div className="relative h-full w-full p-6">
        <div className="relative h-full rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.45)]">
          <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent-blue" />
              Feasibility
            </span>
            <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] text-text-muted">Auto-updates</span>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3 text-[12px] text-text-muted">
            {["Height", "Coverage", "Parking"].map((metric, idx) => (
              <div key={metric} className="rounded-xl bg-surface-sunken/80 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                <div className="mb-2 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
                  <span>{metric}</span>
                  <span>{idx === 0 ? "+12%" : idx === 1 ? "OK" : "Shared"}</span>
                </div>
                <div className="h-2 rounded-full bg-accent-blue/40" />
                <div className="mt-2 h-2 rounded-full bg-white/10" />
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-2 rounded-xl bg-white/5 p-3 text-[12px] text-text-muted">
            <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
              <span>Assumptions</span>
              <span>Explain</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <span className="h-2 w-2 rounded-full bg-accent-green" />
              Mixed-use corridor → shared lobby allowed.
            </div>
            <div className="flex items-center gap-2 text-white">
              <span className="h-2 w-2 rounded-full bg-accent-blue" />
              Mid-block relief → reduced rear setback verified.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MadeForSection() {
  const [openFeature, setOpenFeature] = useState<Feature["key"] | null>(null);
  const triggerRefs = useRef<Record<Feature["key"], HTMLButtonElement | null>>({
    "project-brain": null,
    "zoning-aware": null,
    crafted: null
  });

  const featureDetails: Record<Feature["key"], FeatureDetails> = useMemo(
    () => ({
      "project-brain": {
        title: "Project Brain for complex sites",
        body: [
          "Cocoon keeps the whole brief—client intent, requirements, constraints, and risks—alive as a structured surface. Everything connects back to a source, so you can move fast without losing why a decision was made.",
          "As you explore massing or scope, Cocoon checks zoning and past precedent in the background. It highlights hazards and sustainability targets so you know where to focus conversations with the city and the client.",
          "When options emerge, you can instantly show the path from raw notes to proposed moves, giving reviewers confidence that nothing critical was dropped."
        ],
        quote: "Cocoon helped us stress-test more options in a week than we would usually see in a month.",
        customerLogo: "SOUR",
        metrics: [
          { value: "4×", label: "More massing options evaluated" },
          { value: "60%", label: "Faster early-stage feasibility" },
          { value: "2×", label: "More sites considered per study" },
          { value: "90%", label: "Of options clearly documented" }
        ],
        heroIllustration: <ProjectBrainHero />
      },
      "zoning-aware": {
        title: "Zoning-aware concepting",
        body: [
          "Sketch and iterate while Cocoon keeps height, coverage, and parking in check. The workspace calls out when a promising idea nudges a threshold and explains the assumption behind each allowance.",
          "Before you bring a concept to a client or the city, Cocoon auto-builds a quick feasibility packet with the supporting notes, so the conversation starts with clarity instead of caveats."
        ],
        quote: "Cocoon helped us stress-test more options in a week than we would usually see in a month.",
        customerLogo: "Civiliti",
        metrics: [
          { value: "35%", label: "Faster zoning back-and-forth" },
          { value: "3×", label: "Constraint-driven options tested" },
          { value: "50%", label: "Fewer manual recalcs" },
          { value: "80%", label: "Of assumptions documented" }
        ],
        heroIllustration: <ZoningHero />
      },
      crafted: {
        title: "Crafted to perfection",
        body: [
          "Use Cocoon to tighten the final 10–20% of a scheme without losing the trail. Program tuning, daylight checks, and circulation tweaks stay linked to the decisions that led there.",
          "Narratives for city review and client updates update automatically—export a packet with diagrams, rationale, and the latest edits knowing everything lines up with the approved direction.",
          "When questions come up, you can jump straight from a slide to the underlying note or decision thread, making late changes far less risky."
        ],
        quote: "Cocoon helped us stress-test more options in a week than we would usually see in a month.",
        customerLogo: "SOUR",
        metrics: [
          { value: "45%", label: "Faster narrative refinements" },
          { value: "2×", label: "Iterations kept traceable" },
          { value: "70%", label: "Less time chasing markups" },
          { value: "95%", label: "Readiness of city packets" }
        ],
        heroIllustration: <CraftedHero />
      }
    }),
    []
  );

  const closeModal = () => {
    if (openFeature) {
      const trigger = triggerRefs.current[openFeature];
      trigger?.focus();
    }
    setOpenFeature(null);
  };

  return (
    <Section className="bg-gradient-to-b from-bg via-bg/95 to-bg/90">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-baseline md:gap-10">
        <div className="md:col-span-6 space-y-3">
          <h2 className="text-3xl font-semibold leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-5xl">
            Made for architecture,
            <br />
            urban design, and cities.
          </h2>
        </div>
        <div className="md:col-span-5 md:col-start-8">
          <p className="text-base leading-relaxed text-text-muted sm:text-lg">
            Early-stage work in the built environment is messy. Cocoon turns briefs, zoning, and site context into a shared,
            structured space where teams can explore options with AI, stay aligned with codes, and tell a clear story to clients and cities.
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:gap-5 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-surface-raised/80 via-surface-raised/70 to-surface-sunken/60 p-5 shadow-[0_28px_80px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-200 ease-out hover:-translate-y-1 hover:brightness-110 hover:shadow-[0_30px_90px_rgba(0,0,0,0.55)] sm:p-6"
          >
            <div className="relative mb-8 h-[60%] min-h-[12rem]">
              <FeatureIllustration variant={feature.illustration} />
            </div>
            <div className="mt-auto flex items-end justify-between gap-4">
              <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
              <button
                type="button"
                aria-label={`Open more about ${feature.title}`}
                ref={(node) => {
                  triggerRefs.current[feature.key] = node;
                }}
                onClick={() => setOpenFeature(feature.key)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-lg font-semibold text-white shadow-[0_10px_30px_rgba(0,0,0,0.45)] transition-all duration-200 hover:scale-105 hover:border-white/30 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                +
              </button>
            </div>
          </article>
        ))}
      </div>

      {openFeature && (
        <FeatureModal
          isOpen={Boolean(openFeature)}
          onClose={closeModal}
          {...featureDetails[openFeature]}
        />
      )}
    </Section>
  );
}
