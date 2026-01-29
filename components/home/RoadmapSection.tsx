import { Section } from "@/components/Section";

const roadmapItems = [
  {
    title: "Now",
    items: ["Private pilots with complex urban sites", "City-facing packet exports", "Improved zoning explainability"]
  },
  {
    title: "Next",
    items: ["Revit + Rhino handoffs", "Daylight + access checks in-line", "Shared assumptions library across studios"]
  }
];

export function RoadmapSection() {
  return (
    <Section
      id="roadmap"
      eyebrow="Roadmap"
      title="What we’re shipping with partners."
      kicker="Shipping weekly with pilots; tell us what keeps your projects moving."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {roadmapItems.map((entry) => (
          <div key={entry.title} className="card-surface space-y-3 p-5 sm:p-6">
            <div className="flex items-center justify-between text-sm font-semibold text-ink">
              <span>{entry.title}</span>
            </div>
            <ul className="space-y-2 text-sm text-text-muted">
              {entry.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-accent-emerald" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
