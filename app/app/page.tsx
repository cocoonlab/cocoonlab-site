import Link from "next/link";

import { PrimaryCtaLink } from "@/components/PrimaryCtaLink";
import { LayoutShell } from "@/components/layout/LayoutShell";
import { siteConfig } from "@/lib/config";

export default function ProductShellPlaceholder() {
  return (
    <LayoutShell>
      <section className="section-pad">
        <div className="container-x grid gap-10 rounded-[28px] border border-border bg-surface-raised p-6 md:grid-cols-[1.15fr_1fr] md:p-10">
          <div className="space-y-4">
            <p className="inline-flex items-center gap-2 rounded-full border border-divider bg-surface-sunken px-3 py-1 text-[12px] font-semibold tracking-tight text-text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-sage" />
              <span>AI workspace for architecture & designers</span>
            </p>
            <div className="space-y-3">
              <h1 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">
                Access the Cocoon workspace
              </h1>
              <p className="text-measure text-base leading-relaxed text-text-muted">
                The Cocoon app runs as a secure workspace for private beta teams. If you have an invite, use your personalized link to sign in. If you’re evaluating Cocoon for your studio, reach out and we’ll onboard you with real project data.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <PrimaryCtaLink
                label="Join the private beta"
                className="btn-primary px-6 py-[11px] text-sm font-semibold"
              />
              <Link
                href="/contact"
                className="btn-secondary px-5 py-[10px] text-sm font-semibold"
              >
                <span>Contact</span>
                <span aria-hidden className="text-xs">→</span>
              </Link>
            </div>
          </div>

          <div className="space-y-4 rounded-2xl border border-divider bg-surface-sunken p-6">
            <h2 className="text-lg font-semibold tracking-tight text-ink">What to expect</h2>
            <ul className="space-y-3 text-sm leading-relaxed text-text-muted">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-sage" />
                <div>
                  <p className="font-medium text-ink">Zoning-aware design canvas</p>
                  <p className="text-text-muted">Pull briefs, zoning layers, and site intelligence into one workspace so AI suggestions respect constraints.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
                <div>
                  <p className="font-medium text-ink">Team-ready review</p>
                  <p className="text-text-muted">Share options with collaborators, capture decisions, and export submission-ready context.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-clay" />
                <div>
                  <p className="font-medium text-ink">Guided onboarding</p>
                  <p className="text-text-muted">We tailor the beta to your live project—no filler screens or placeholder data.</p>
                </div>
              </li>
            </ul>
            <div className="rounded-xl border border-divider bg-bg px-4 py-3 text-xs text-text-muted">
              Already invited? Use the secure sign-in link we emailed from {siteConfig.contactEmail}.
            </div>
          </div>
        </div>
      </section>
    </LayoutShell>
  );
}
