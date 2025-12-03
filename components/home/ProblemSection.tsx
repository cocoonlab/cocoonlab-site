import { Section } from "@/components/Section";
import { MetricsStrip } from "./MetricsStrip";

export function ProblemSection() {
  return (
    <Section
      id="problem"
      eyebrow="Problem"
      title="Early design work scatters fast."
      kicker="Inputs fragment across emails, PDFs, and hallway chats before a concept even starts."
      className="pt-6"
    >
      <div className="space-y-6">
        <ul className="space-y-3 text-sm text-text-soft md:text-base">
          <li className="flex items-start gap-3">
            <span className="mt-1 h-2.5 w-2.5 rounded-full bg-accent-blue" aria-hidden />
            <span>Briefs, PDFs, and markup threads never stay in one place.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 h-2.5 w-2.5 rounded-full bg-accent-emerald" aria-hidden />
            <span>Updates arrive piecemeal, so sketches drift and decisions repeat.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 h-2.5 w-2.5 rounded-full bg-accent-purple" aria-hidden />
            <span>Misalignment snowballs into days of rework before reviews.</span>
          </li>
        </ul>

        <MetricsStrip />
      </div>
    </Section>
  );
}
