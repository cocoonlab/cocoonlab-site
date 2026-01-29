import { LayoutShell } from "@/components/layout/LayoutShell";
import { WaitlistForm } from "@/components/waitlist/WaitlistForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Early access waitlist – Cocoon Lab",
  description:
    "Cocoon is in active development with a limited group of firms. Join the waitlist for pilots and early access."
};

export default function WaitlistPage() {
  return (
    <LayoutShell>
      <section className="section-pad">
        <div className="container-x grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-start">
          <div className="space-y-5">
            <p className="badge-pill text-[11px] uppercase tracking-wide text-text-muted">
              Early access
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              Cocoon is in focused alpha with a small group of firms.
            </h1>
            <p className="text-measure text-sm text-text-muted md:text-base">
              We work closely with early partners to shape Cocoon around real
              projects. Share a bit about your practice and we&apos;ll be in
              touch as we open more pilots.
            </p>
            <div className="grid gap-4 rounded-2xl border border-divider bg-surface-sunken p-4 text-sm text-text-muted md:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                  Social proof
                </p>
                <p className="mt-1">
                  <span className="text-base font-semibold text-ink">
                    5 architecture firms
                  </span>{" "}
                  in Montréal and abroad are already working with us.
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                  Pilot results
                </p>
                <p className="mt-1">
                  Early pilots suggest{" "}
                  <span className="font-semibold text-clay">
                    10x faster
                  </span>{" "}
                  with fewer back-and-forth cycles in the first two weeks of a
                  project.
                </p>
              </div>
            </div>
            <div className="card-surface flex items-center gap-4 p-4 text-sm text-text-muted">
              <div className="h-14 w-14 rounded-2xl border border-divider bg-surface-sunken" />
              <div>
                <p className="font-semibold text-ink">
                  Early-stage workflow sketch
                </p>
                <p className="text-xs">
                  A simple visual we use in pilots to map how Cocoon fits from
                  brief to options to decision.
                </p>
              </div>
            </div>
          </div>
          <WaitlistForm />
        </div>
      </section>
    </LayoutShell>
  );
}
