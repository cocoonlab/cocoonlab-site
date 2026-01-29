import { getChangelog } from "@/lib/changelog";
import { LayoutShell } from "@/components/layout/LayoutShell";
import { Section } from "@/components/Section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog – Cocoon Lab",
  description:
    "Progress updates on Cocoon Lab, the AI workspace for early-stage architectural design."
};

export default function ChangelogPage() {
  const entries = getChangelog();

  return (
    <LayoutShell>
      <Section
        eyebrow="Changelog"
        title="Building Cocoon in the open."
        kicker="A running log of product improvements, pilot learnings, and behind-the-scenes work."
      >
        <div className="divide-y divide-divider/70">
          {entries.map((entry) => (
            <article key={entry.id} className="space-y-3 py-6 md:py-8">
              <p className="text-[11px] uppercase tracking-[0.2em] text-text-muted">
                {new Date(entry.date).toLocaleDateString()}
              </p>
              <h3 className="text-lg font-semibold text-ink md:text-xl">
                {entry.title}
              </h3>
              <p className="text-sm text-text-muted md:text-base">
                {entry.summary}
              </p>
            </article>
          ))}
        </div>
      </Section>
    </LayoutShell>
  );
}
