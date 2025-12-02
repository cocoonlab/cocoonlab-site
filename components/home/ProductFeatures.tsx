import { Section } from "@/components/Section";

const features = [
  {
    title: "Capture the full brief",
    body:
      "Bring client goals, budgets, and sustainability targets into one structured workspace instead of scattered notes.",
    bullets: [
      "Intake via voice, email, or PDF uploads",
      "Client goals mapped into a knowledge graph",
      "Instant summaries you can share back with the team"
    ]
  },
  {
    title: "Zoning-aware concepting",
    body:
      "Generate early schemes that respect height, coverage, and parking from the start instead of fighting constraints later.",
    bullets: [
      "Live checks for height, coverage, parking and setbacks",
      "See yield deltas as you refine options",
      "Keep a record of why a scheme is compliant"
    ]
  },
  {
    title: "Decision intelligence",
    body:
      "Move beyond pretty options into quantified scenarios that support better investment decisions.",
    bullets: [
      "Density, yield, and efficiency indicators per scheme",
      "Early CAPEX ranges and schedule cues",
      "Sustainability hints where data is available"
    ]
  }
];

export function ProductFeatures() {
  return (
    <Section
      id="product"
      eyebrow="Product"
      title="One place where briefs, zoning, and options stay in sync."
      kicker="Cocoon Lab brings your early-stage process into a single AI-native workspace."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {features.map((f) => (
          <article
            key={f.title}
            className="card-surface flex flex-col justify-between gap-4 p-5"
          >
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-white md:text-lg">
                {f.title}
              </h3>
              <p className="text-sm text-text-muted">{f.body}</p>
            </div>
            <ul className="mt-2 space-y-2 text-xs text-text-muted">
              {f.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span aria-hidden="true" className="mt-1 text-accent-blue">
                    •
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
