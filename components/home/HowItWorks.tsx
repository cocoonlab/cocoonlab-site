import { Section } from "@/components/Section";

const steps = [
  {
    title: "Capture your site & constraints",
    body:
      "Feed Cocoon with your notes, PDFs, and zoning references. We turn them into a structured brief for the project."
  },
  {
    title: "Generate zoning-aware options",
    body:
      "Explore massing options and floorplate strategies that respect key constraints from day one."
  },
  {
    title: "Validate, align, and export",
    body:
      "Share concepts with stakeholders, capture feedback, and export to CAD/BIM once you are confident in the direction."
  }
];

export function HowItWorks() {
  return (
    <Section
      id="how-it-works"
      eyebrow="How it works"
      title="From first conversation to export-ready concepts."
      kicker="Three focused stages that fit naturally into your existing workflow."
    >
      <ol className="grid gap-4 md:grid-cols-3">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="card-surface flex flex-col gap-3 p-5"
          >
            <div className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-surface-sunken text-sm font-semibold text-text-soft">
              {index + 1}
            </div>
            <h3 className="text-base font-semibold text-white">
              {step.title}
            </h3>
            <p className="text-sm text-text-muted">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
