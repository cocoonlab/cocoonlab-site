import { Section } from "@/components/Section";
import { MetricsStrip } from "./MetricsStrip";

export function ProblemSection() {
  return (
    <Section
      id="problem"
      eyebrow="Problem"
      title="Early-stage design is chaotic and expensive."
      kicker="Inputs fragment across emails, sketches, and meetings before a concept even starts."
      className="pt-6"
    >
      <div className="space-y-6">
        <ul className="space-y-3 text-sm text-text-soft md:text-base">
          <li className="flex items-start gap-3">
            <span className="mt-1 h-2.5 w-2.5 rounded-full bg-accent-blue" aria-hidden />
            <span>Requirements sit in PDFs, markup threads, and hallway notes instead of one brief.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 h-2.5 w-2.5 rounded-full bg-accent-emerald" aria-hidden />
            <span>Teams hear different updates, so early sketches drift and decisions need rehashing.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 h-2.5 w-2.5 rounded-full bg-accent-purple" aria-hidden />
            <span>That misalignment creates ~8h of rework and puts ~30h of concept time at risk.</span>
          </li>
        </ul>

        <MetricsStrip />
      </div>
    </Section>
  );
}
