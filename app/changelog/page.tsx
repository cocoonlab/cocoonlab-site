import { getChangelog } from "@/lib/changelog";
import { LayoutShell } from "@/components/layout/LayoutShell";
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
      <section className="section-pad">
        <div className="container-x space-y-8">
          <header className="max-w-2xl space-y-3">
            <p className="badge-pill text-[11px] uppercase tracking-wide text-text-muted">
              Changelog
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Building Cocoon in the open.
            </h1>
            <p className="text-measure text-sm text-text-muted md:text-base">
              A running log of product improvements, pilot learnings, and
              behind-the-scenes work.
            </p>
          </header>
          <div className="space-y-6">
            {entries.map((entry) => (
              <article
                key={entry.id}
                className="card-surface flex flex-col gap-3 p-5 md:flex-row md:items-start md:justify-between"
              >
                <div className="space-y-2">
                  <h2 className="text-base font-semibold text-ink">
                    {entry.title}
                  </h2>
                  <p className="text-sm text-text-muted">{entry.summary}</p>
                </div>
                <div className="flex flex-col items-end gap-2 text-right text-xs text-text-muted">
                  <span>{new Date(entry.date).toLocaleDateString()}</span>
                  <span className="rounded-full border border-border-subtle px-2 py-0.5 text-[11px] uppercase tracking-wide">
                    {entry.kind}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </LayoutShell>
  );
}
