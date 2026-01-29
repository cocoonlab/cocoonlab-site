"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Section } from "@/components/Section";

const features = [
  {
    title: "Enterprise-ready security",
    description: "Encryption at rest and in transit, SSO, and role-based access so teams stay aligned and protected."
  },
  {
    title: "Engineered for scale",
    description: "Handles portfolios of sites, zoning context, and many concurrent options without slowing down."
  },
  {
    title: "Designed for privacy",
    description: "Control where your data is stored and exactly who can see what across projects and teams."
  }
];

const stacks = [
  { label: "Ingestion", accent: "from-accent-blue/70 via-accent-blue/30 to-transparent" },
  { label: "Knowledge graph", accent: "from-accent-purple/70 via-accent-purple/35 to-transparent" },
  { label: "AI engines", accent: "from-accent-emerald/70 via-accent-emerald/40 to-transparent" },
  { label: "Integrations", accent: "from-white/40 via-white/10 to-transparent" }
];

const badges = [
  { label: "SOC 2 in progress" },
  { label: "GDPR-ready" },
  { label: "Data residency options" }
];

export function FoundationsSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section
      id="architecture"
      className="relative overflow-hidden border-y border-border-subtle/70 bg-surface-raised/70"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(79,70,229,0.25),_transparent_45%),_radial-gradient(circle_at_80%_10%,_rgba(16,185,129,0.2),_transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.04),rgba(255,255,255,0))]" />

      <div className="relative space-y-10 lg:space-y-12">
        <div className="max-w-3xl space-y-4">
          <span className="badge-pill bg-white/10 text-[10px] uppercase tracking-[0.16em] text-text-soft">Under the hood</span>
          <h1 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl lg:text-5xl">
            Built on strong foundations.
          </h1>
          <p className="text-sm leading-relaxed text-text-soft md:text-base">
            Cocoon is designed for sensitive project data, large zoning datasets, and long-running portfolios.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
          <div className="space-y-3">
            {features.map((feature) => (
              <button
                key={feature.title}
                type="button"
                className="group flex w-full items-center justify-between gap-4 rounded-2xl border border-border-subtle/80 bg-surface-sunken/70 p-5 text-left transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-surface-sunken/90"
              >
                <div className="space-y-1">
                  <p className="text-base font-semibold text-ink md:text-lg">{feature.title}</p>
                  <p className="text-sm leading-relaxed text-text-muted md:text-[15px]">{feature.description}</p>
                </div>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border-subtle/80 bg-white/5 text-text-soft transition group-hover:border-white/30 group-hover:text-ink">
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </span>
              </button>
            ))}
          </div>

          <motion.div
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    y: [0, -6, 0]
                  }
            }
            transition={
              prefersReducedMotion
                ? { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }
                : {
                    duration: 0.6,
                    ease: [0.22, 0.61, 0.36, 1],
                    y: {
                      duration: 12,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }
                  }
            }
            className="relative overflow-hidden rounded-2xl border border-border-subtle/70 bg-surface-sunken/80 p-6 shadow-inner-glow"
          >
            <div className="pointer-events-none absolute inset-0 border border-white/5" />
            <div className="absolute inset-x-6 top-6 h-20 rounded-full bg-white/5 blur-3xl" />

            <div className="relative flex min-h-[360px] flex-col gap-3">
              {stacks.map((stack, idx) => (
                <div
                  key={stack.label}
                  className="relative flex-1 overflow-hidden rounded-xl border border-white/5 bg-gradient-to-br from-surface-raised/80 via-surface-raised/60 to-surface-sunken/80"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${stack.accent} opacity-70`}
                  />
                  <div className="relative flex h-full items-center justify-between px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="h-2.5 w-2.5 rounded-full bg-white/70 shadow-[0_0_0_6px_rgba(255,255,255,0.08)]" />
                      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-ink/90">
                        {stack.label}
                      </p>
                    </div>
                    <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-text-muted/90">
                      Layer {idx + 1}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="relative flex flex-wrap items-center gap-5 border-t border-border-subtle/70 pt-6">
          {badges.map((badge) => (
            <div key={badge.label} className="flex flex-col items-center gap-2 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-border-subtle/80 bg-white/5 text-[12px] font-semibold text-ink shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
                {badge.label.split(" ")[0]}
              </div>
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-text-soft">
                {badge.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
