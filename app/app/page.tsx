import Link from "next/link";

import { PrimaryCtaLink } from "@/components/PrimaryCtaLink";
import { LayoutShell } from "@/components/layout/LayoutShell";
import { siteConfig } from "@/lib/config";

export default function ProductShellPlaceholder() {
  return (
    <LayoutShell>
      <section className="section-pad">
        <div className="container-x grid gap-10 rounded-[28px] border border-white/10 bg-surface-raised/60 p-6 shadow-[0_22px_70px_rgba(0,0,0,0.45)] backdrop-blur md:grid-cols-[1.15fr_1fr] md:p-10">
          <div className="space-y-4">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12px] font-semibold tracking-tight text-text-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-emerald" />
              <span>AI workspace for architecture & designers</span>
            </p>
            <div className="space-y-3">
              <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Access the Cocoon workspace
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-text-soft">
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
                className="btn-ghost px-5 py-[10px] text-sm font-semibold"
              >
                <span>Contact</span>
                <span aria-hidden className="text-xs">→</span>
              </Link>
            </div>
          </div>

          <div className="space-y-4 rounded-2xl border border-white/8 bg-gradient-to-br from-[#12122a] via-[#0c0c18] to-[#050509] p-6 shadow-[0_14px_60px_rgba(0,0,0,0.55)]">
            <h2 className="text-lg font-semibold tracking-tight text-white">What to expect</h2>
            <ul className="space-y-3 text-sm leading-relaxed text-text-soft">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-accent-emerald" />
                <div>
                  <p className="font-medium text-white">Zoning-aware design canvas</p>
                  <p className="text-text-muted">Pull briefs, zoning layers, and site intelligence into one workspace so AI suggestions respect constraints.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-accent-blue" />
                <div>
                  <p className="font-medium text-white">Team-ready review</p>
                  <p className="text-text-muted">Share options with collaborators, capture decisions, and export submission-ready context.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-accent-purple" />
                <div>
                  <p className="font-medium text-white">Guided onboarding</p>
                  <p className="text-text-muted">We tailor the beta to your live project—no filler screens or placeholder data.</p>
                </div>
              </li>
            </ul>
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-text-muted">
              Already invited? Use the secure sign-in link we emailed from {siteConfig.contactEmail}.
            </div>
          </div>
        </div>
      </section>
    </LayoutShell>
  );
}
