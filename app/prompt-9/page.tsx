"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { LayoutShell } from "@/components/layout/LayoutShell";

const tabs = [
  {
    id: "collaborative-briefs",
    label: "Collaborative briefs",
    description:
      "Capture client goals, site constraints, and requirements in a shared spec that updates as teams add context.",
    accent: "from-indigo-400 via-blue-500 to-indigo-500",
    sections: [
      {
        title: "Client goals",
        items: ["Transit-first campus", "Flexible ground floor", "Prefers adaptive reuse"]
      },
      {
        title: "Requirements",
        items: ["Floor area targets", "Public amenities", "Deliverable schedule"]
      },
      {
        title: "Constraints",
        items: ["Setback windows", "Historic facade", "Noise corridor"]
      }
    ]
  },
  {
    id: "inline-comments",
    label: "Inline comments",
    description:
      "Collect feedback right on the spec. Pin conversations to specific assumptions so decisions stay auditable.",
    accent: "from-emerald-400 via-teal-400 to-cyan-400",
    sections: [
      {
        title: "Brief",
        items: ["Adaptive reuse with added wings", "Targeting LEED Gold", "Phased delivery"]
      },
      {
        title: "Notes",
        items: ["Confirm structural grid for reuse", "Check glazing ratio for energy model"]
      }
    ],
    markers: [
      { label: "Stakeholder note", position: { top: "20%", left: "76%" } },
      { label: "MEP question", position: { top: "48%", left: "18%" } },
      { label: "Site risk", position: { top: "70%", left: "66%" } }
    ]
  },
  {
    id: "text-to-study",
    label: "Text-to-study concepts",
    description:
      "Start with a prompt and Cocoon drafts zoning-aware study options you can refine with the team.",
    accent: "from-amber-300 via-orange-400 to-rose-400",
    sections: [
      {
        title: "Prompt",
        items: ["Mid-rise housing on transit corridor", "Prioritize light courts and active podium", "Stage approvals"]
      },
      {
        title: "AI study options",
        items: [
          "Terraced courtyard massing with retail podium",
          "Dual tower scheme with shared amenities",
          "L-shaped block preserving view corridors"
        ]
      }
    ]
  }
] as const;

const featureBlurbs = [
  { label: "Initiatives", icon: "M5 12h14M5 7h9M5 17h6" },
  { label: "Cross-team projects", icon: "M4 8h12v8H4z M10 5v14" },
  { label: "Milestones", icon: "M6 10h6l2-3 2 3h2v6H6z" },
  { label: "Progress insights", icon: "M5 15l3-4 3 2 4-6" }
];

const transitionProps = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 12 },
  transition: { duration: 0.3, ease: [0.25, 0.6, 0.3, 1] }
};

export default function IdeationSectionPage() {
  const [activeId, setActiveId] = useState<(typeof tabs)[number]["id"]>(tabs[0].id);

  const activeTab = useMemo(() => tabs.find(tab => tab.id === activeId) ?? tabs[0], [activeId]);

  return (
    <LayoutShell>
      <section className="section-pad relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_25%_20%,rgba(99,102,241,0.16),transparent_32%),radial-gradient(circle_at_80%_12%,rgba(34,197,235,0.12),transparent_36%),linear-gradient(120deg,rgba(255,255,255,0.04),transparent_45%)]" />

        <div className="container-x grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center">
          <div className="space-y-6">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-text-soft">
                Ideation & specs
              </span>
              <h1 className="text-balance text-3xl font-semibold leading-tight text-white md:text-4xl lg:text-5xl">
                Ideate and specify what to build next
              </h1>
            </div>

            <div className="grid gap-4 md:grid-cols-[240px_minmax(0,1fr)] md:items-start">
              <div className="space-y-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveId(tab.id)}
                    className={`group relative flex w-full items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 text-left transition hover:border-white/20 ${
                      activeId === tab.id ? "bg-white/10 text-white shadow-[0_18px_60px_rgba(0,0,0,0.4)]" : "bg-white/5 text-text-muted"
                    }`}
                  >
                    <span
                      className={`absolute left-0 top-1/2 h-10 w-[5px] -translate-y-1/2 rounded-full bg-gradient-to-b ${
                        activeId === tab.id ? tab.accent : "from-white/10 via-white/5 to-white/0"
                      }`}
                    />
                    <span className="text-sm font-semibold md:text-base">{tab.label}</span>
                  </button>
                ))}
              </div>

              <div className="text-sm leading-relaxed text-text-soft md:text-base">
                <AnimatePresence mode="wait">
                  <motion.p key={activeTab.id} {...transitionProps}>
                    {activeTab.description}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute -inset-8 -z-10 bg-gradient-to-r from-indigo-500/15 via-white/0 to-emerald-400/10 blur-3xl" />
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.35, ease: [0.25, 0.6, 0.3, 1] }}
                className="relative overflow-hidden rounded-[28px] border border-white/15 bg-gradient-to-br from-white/10 via-white/5 to-white/0 shadow-[0_28px_120px_rgba(0,0,0,0.6)]"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_38%),radial-gradient(circle_at_80%_60%,rgba(37,99,235,0.12),transparent_42%)]" />
                <div className="absolute inset-0 bg-gradient-to-br from-bg-alt/60 via-bg/60 to-bg/80" />

                <div className="relative space-y-3 border-b border-white/10 px-6 py-4 backdrop-blur">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-soft">Specification</p>
                    <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                      Cocoon brief
                    </span>
                  </div>
                  <p className="text-lg font-semibold text-white">Transit campus study</p>
                  <p className="max-w-xl text-sm text-text-muted">
                    Multi-phase adaptive reuse with podium activation, coordinated with city incentives and transit partners.
                  </p>
                </div>

                <div className="relative space-y-1 px-6 pb-6 pt-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {activeTab.sections.map(section => (
                      <div
                        key={section.title}
                        className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_16px_60px_rgba(0,0,0,0.35)]"
                      >
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-soft">
                          {section.title}
                        </p>
                        <ul className="mt-3 space-y-2 text-sm text-white">
                          {section.items.map(item => (
                            <li
                              key={item}
                              className="flex items-start gap-2 text-left text-text-soft"
                            >
                              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-white via-white/70 to-white/40" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {activeTab.id === "text-to-study" && (
                    <div className="mt-4 rounded-2xl border border-amber-300/30 bg-gradient-to-r from-amber-300/10 via-orange-300/10 to-rose-300/10 p-4 text-sm text-white shadow-[0_16px_60px_rgba(0,0,0,0.35)]">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-100">Suggested follow-ups</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {[
                          "Send to zoning review",
                          "Share with delivery partner",
                          "Attach comparable studies"
                        ].map(suggestion => (
                          <span
                            key={suggestion}
                            className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white"
                          >
                            {suggestion}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab.markers && (
                    <div className="pointer-events-none absolute inset-0">
                      {activeTab.markers.map(marker => (
                        <div
                          key={marker.label}
                          className="absolute flex items-center gap-2 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-bg shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
                          style={{ top: marker.position.top, left: marker.position.left }}
                        >
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 text-[10px] font-bold text-bg">
                            •
                          </span>
                          {marker.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {featureBlurbs.map(feature => (
              <div
                key={feature.label}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-text-soft shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-white/10 via-white/5 to-white/10 text-white">
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-5 w-5 opacity-80"
                  >
                    <path d={feature.icon} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="font-semibold text-white">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </LayoutShell>
  );
}
