import { Section } from "@/components/Section";

const logos = [
  "Studio Nord",
  "Atelier Saint-Laurent",
  "Riverbank Design",
  "Parallax Partners",
  "Montreal Urban Lab"
];

const quotes = [
  {
    quote:
      "Cocoon lets us walk into client meetings with options and zoning implications already framed.",
    name: "Design director, mid-size studio in Montréal"
  },
  {
    quote:
      "We used to lose days reconciling regulations with floor area; now it happens live as we sketch.",
    name: "Partner, European practice in early access"
  }
];

export function Customers() {
  return (
    <Section
      id="customers"
      eyebrow="Early partners"
      title="Already informing live projects."
      kicker="We are running pilots with a handful of firms in Montréal and abroad."
    >
      <div className="space-y-8">
        <div className="flex flex-wrap items-center gap-3 text-xs text-text-muted">
          {logos.map((name) => (
            <div
              key={name}
              className="rounded-full border border-border-subtle/80 bg-surface-sunken/80 px-3 py-1"
            >
              {name}
            </div>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {quotes.map((q) => (
            <figure key={q.name} className="card-surface p-5">
              <blockquote className="text-sm text-text-soft">
                “{q.quote}”
              </blockquote>
              <figcaption className="mt-3 text-xs text-text-muted">
                {q.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </Section>
  );
}
