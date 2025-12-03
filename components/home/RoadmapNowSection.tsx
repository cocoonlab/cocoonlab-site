import { Section } from "@/components/Section";

const milestones = [
  { label: "Alpha", detail: "Live with pilot firms." },
  { label: "Beta", detail: "Opening in 2026." },
  { label: "North America", detail: "Expanding 2026–2027." },
  { label: "Global", detail: "Rolling out in 2027." }
];

export function RoadmapNowSection() {
  return (
    <Section
      id="now"
      eyebrow="Now"
      title="Alpha with partner studios."
      kicker="Beta opens in 2026; we move with teams already shipping work."
      className="pt-16"
    >
      <div className="grid gap-6 lg:grid-cols-[1.05fr_minmax(0,1fr)] lg:items-start">
        <div className="card-surface space-y-4 p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-white">Status</p>
            <span className="badge-pill bg-white/5 text-xs text-white">Alpha</span>
          </div>
          <p className="text-sm leading-relaxed text-text-muted">
            Alpha with pilot firms. Beta planned for 2026.
          </p>
          <ul className="space-y-2 text-sm text-text-soft">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-emerald" aria-hidden />
              <span>Weekly drops with partner teams.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-blue" aria-hidden />
              <span>Beta cohort forming for 2026.</span>
            </li>
          </ul>
        </div>

        <div className="card-surface p-5 sm:p-6">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-text-subtle">
            Roadmap
          </p>
          <div className="relative pl-4">
            <span className="absolute left-1 top-2 h-[calc(100%-1rem)] w-px bg-border-subtle" aria-hidden />
            <ol className="space-y-4">
              {milestones.map((milestone) => (
                <li key={milestone.label} className="relative pl-4">
                  <span
                    className="absolute left-[-0.35rem] top-1.5 h-2 w-2 rounded-full bg-accent-emerald shadow-[0_0_0_6px_rgba(99,255,181,0.14)]"
                    aria-hidden
                  />
                  <p className="text-sm font-semibold text-white">{milestone.label}</p>
                  <p className="text-sm text-text-muted">{milestone.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </Section>
  );
}
