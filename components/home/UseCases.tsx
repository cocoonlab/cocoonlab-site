import { Section } from "@/components/Section";

const useCases = [
  {
    title: "Feasibility studies",
    body:
      "Quickly test yield under multiple zoning interpretations and share reasoned recommendations with clients."
  },
  {
    title: "Competition entries",
    body:
      "Spend more time on the architectural idea and less on wrangling site data and compliance checks."
  },
  {
    title: "Internal design reviews",
    body:
      "Give your partners a single board to understand trade-offs, from coverage to parking to efficiency."
  },
  {
    title: "Investor presentations",
    body:
      "Support your narrative with grounded numbers and constraints instead of fragile spreadsheets."
  }
];

export function UseCases() {
  return (
    <Section
      id="use-cases"
      eyebrow="Use cases"
      title="Built for early-stage decisions that carry real weight."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {useCases.map((u) => (
          <article key={u.title} className="card-surface p-5">
            <h3 className="text-base font-semibold text-white">{u.title}</h3>
            <p className="mt-2 text-sm text-text-muted">{u.body}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
