"use client";

import { Section } from "@/components/Section";

const metrics = [
  {
    value: "10x",
    label: "Faster to a first aligned option"
  },
  {
    value: "5",
    label: "Architecture firms already in pilots"
  },
  {
    value: "2 weeks",
    label: "Typical pilot window for early results"
  }
];

export function OutcomesSection() {
  return (
    <Section
      id="outcomes"
      eyebrow="Outcomes"
      title="Aligned work moves faster."
      kicker="Pilot studios trim review loops and keep early hours billable."
      className="border-y border-border-subtle/70 bg-surface-raised/60"
      variant="default"
    >
      <div className="grid gap-6 md:grid-cols-3">
        {metrics.map((metric) => (
          <div key={metric.label} className="space-y-2 border-l border-divider pl-4 first:border-l-0 first:pl-0">
            <p className="text-3xl font-semibold text-ink md:text-4xl">{metric.value}</p>
            <p className="text-sm text-text-muted">{metric.label}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
