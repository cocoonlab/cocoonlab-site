"use client";

import { LayoutShell } from "@/components/layout/LayoutShell";
import { IssueTrackingHero } from "@/components/home/IssueTrackingHero";

const trendLines = [
  {
    color: "#60a5fa",
    points: [
      "M10 110 Q 40 80, 70 96 T 130 94 T 190 86 T 250 90",
      "M10 120 Q 60 100, 120 104 T 190 112 T 250 108"
    ]
  },
  {
    color: "#34d399",
    points: ["M10 134 Q 50 120, 90 128 T 150 136 T 210 130 T 250 132"]
  }
];

const microFeatures = [
  {
    title: "Tailored workflows",
    description: "Map zoning, consultant, or client lanes to your real process.",
    icon: "M4 10h12M4 14h12M9 6h7"
  },
  {
    title: "Custom views",
    description: "Slice by site, discipline, or phase with saved filters.",
    icon: "M5 5h10v6H5z M5 13h6v6H5z M13 13h6v6h-6z"
  },
  {
    title: "Filters",
    description: "Surface only the issues that unblock today’s decisions.",
    icon: "M4 6h16l-6 6v6l-4-2v-4z"
  },
  {
    title: "SLAs & response targets",
    description: "Hold teams to clear turnaround agreements and alerts.",
    icon: "M12 5a7 7 0 1 1 0 14 7 7 0 0 1 0-14zm0 3v4l3 2"
  }
];

export default function PromptTenPage() {
  return (
    <LayoutShell>
      <IssueTrackingHero
        eyebrow="Issue tracking for design work"
        headline={
          <>
            Issue tracking
            <br />
            you’ll actually enjoy using.
          </>
        }
        description="Track RFIs, design decisions, and follow-ups in a workspace that understands architectural context—not just generic tickets."
        primaryCard={{
          title: "Refine massing for corner lot",
          priority: "High priority",
          tags: ["Zoning", "Client feedback"],
          stats: [
            { label: "Comments", value: "3 active" },
            { label: "Due", value: "Next week" },
            { label: "Decisions", value: "2 awaiting" }
          ],
          assignees: [
            { name: "AR", color: "#60a5fa" },
            { name: "MB", color: "#fbbf24" },
            { name: "KT", color: "#34d399" }
          ]
        }}
        backgroundCards={[
          { title: "Facade mockups", priority: "", tags: [], stats: [], assignees: [] },
          { title: "Parking ingress study", priority: "", tags: [], stats: [], assignees: [] }
        ]}
      />

      <section className="section-pad border-t border-white/5 bg-bg-alt/40">
        <div className="container-x space-y-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white md:text-3xl">Build a board that fits your studio</h2>
              <p className="text-lg text-text-soft">
                Tailor swimlanes, templates, and labels to match how architecture teams actually move work—from zoning clarifications to consultant coordination.
              </p>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
                <div className="flex items-center justify-between text-sm font-semibold text-text-soft">
                  <span>Open issues vs weeks</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-white">
                    Trends
                  </span>
                </div>
                <div className="mt-6 h-52 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-white/0 to-white/0 p-4">
                  <svg viewBox="0 0 260 160" className="h-full w-full">
                    <defs>
                      <linearGradient id="fadeLine" x1="0" x2="0" y1="0" y2="1">
                        <stop stopColor="white" stopOpacity="0.8" offset="0%" />
                        <stop stopColor="white" stopOpacity="0" offset="100%" />
                      </linearGradient>
                    </defs>
                    <path d="M20 140 H 240" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
                    <path d="M20 100 H 240" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
                    <path d="M20 60 H 240" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
                    {trendLines.map(line => (
                      <g key={line.color} fill="none">
                        {line.points.map(path => (
                          <path key={path} d={path} stroke={line.color} strokeWidth="3" strokeLinecap="round" />
                        ))}
                        <circle r="5" cx="250" cy="90" fill={line.color} />
                      </g>
                    ))}
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white md:text-3xl">Manage incoming issues with clarity</h2>
              <p className="text-lg text-text-soft">
                Triage RFIs, feedback, and new requests quickly. Keep owners aligned with standard responses and a clear audit trail of decisions.
              </p>
              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-white/0 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
                <div className="flex items-center justify-between text-sm text-text-soft">
                  <span className="font-semibold">Incoming triage</span>
                  <span className="text-xs uppercase tracking-[0.16em] text-white">Action needed</span>
                </div>
                <div className="mt-5 space-y-3">
                  {["Clarify terrace setback", "Schedule lighting review", "Align with client phasing"].map(item => (
                    <div key={item} className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white">
                      <span className="flex-1 font-semibold">{item}</span>
                      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-text-soft">
                        {(
                          [
                            { label: "Accept", color: "text-emerald-200" },
                            { label: "Duplicate", color: "text-amber-200" },
                            { label: "Defer", color: "text-cyan-200" }
                          ] as const
                        ).map(action => (
                          <button
                            key={action.label}
                            type="button"
                            className={`rounded-full border border-white/10 bg-white/5 px-3 py-1 font-semibold transition hover:-translate-y-[1px] hover:border-white/20 hover:text-white ${action.color}`}
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 rounded-3xl border border-white/10 bg-gradient-to-r from-white/5 via-white/0 to-white/0 p-6 shadow-[0_24px_90px_rgba(0,0,0,0.5)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
            <div className="space-y-3">
              <p className="text-lg font-semibold text-white">Take the pulse of your projects in real time.</p>
              <p className="text-text-soft">Roll up risk, status, and site-specific issues into a single view—no spreadsheet wrangling required.</p>
              <button className="mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-[1px] hover:border-white/30 hover:bg-white/5">
                Learn more →
              </button>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(96,165,250,0.15),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(52,211,153,0.15),transparent_36%)]" />
              <div className="relative h-56">
                <svg viewBox="0 0 320 200" className="h-full w-full">
                  <rect x="20" y="140" width="280" height="2" fill="rgba(255,255,255,0.2)" />
                  <rect x="20" y="90" width="280" height="2" fill="rgba(255,255,255,0.2)" />
                  <rect x="20" y="40" width="280" height="2" fill="rgba(255,255,255,0.2)" />
                  <g fill="none" strokeWidth="2.5">
                    <polyline points="40,130 90,110 140,126 190,80 240,96 290,70" stroke="#38bdf8" />
                    <polyline points="40,150 100,138 160,146 220,120 280,126" stroke="#a78bfa" />
                    <polyline points="40,90 95,70 150,76 205,48 260,60" stroke="#fcd34d" />
                  </g>
                  <g fill="#38bdf8" opacity="0.8">
                    <circle cx="190" cy="80" r="6" />
                    <circle cx="240" cy="96" r="6" />
                    <circle cx="290" cy="70" r="6" />
                  </g>
                </svg>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_18px_70px_rgba(0,0,0,0.45)]">
            {microFeatures.map(feature => (
              <div key={feature.title} className="flex min-w-[220px] flex-1 items-start gap-3 rounded-2xl bg-white/5 p-4 text-left">
                <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-white" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d={feature.icon} />
                  </svg>
                </span>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-white">{feature.title}</p>
                  <p className="text-sm text-text-soft">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </LayoutShell>
  );
}
