import { LayoutShell } from "@/components/layout/LayoutShell";

export default function PrivacyPage() {
  return (
    <LayoutShell>
      <section className="section-pad">
        <div className="container-x space-y-8">
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight text-ink">
              Privacy Policy
            </h1>
            <p className="text-measure text-sm leading-relaxed text-text-muted md:text-base">
              We build Cocoon to protect sensitive project data. This notice explains what we collect, how we use it, and the choices you have.
              If you have questions, contact us at privacy@cocoonlab.ai.
            </p>
            <p className="text-xs text-text-muted">Last updated: July 2024</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4 rounded-2xl border border-divider bg-surface-sunken p-6">
              <h2 className="text-lg font-semibold tracking-tight text-ink">Information we collect</h2>
              <ul className="space-y-3 text-sm leading-relaxed text-text-muted">
                <li>
                  Account details you provide, such as name, work email, and company.
                </li>
                <li>
                  Project inputs uploaded to Cocoon (briefs, zoning files, site context) which remain private to your workspace.
                </li>
                <li>
                  Product analytics and event data to understand feature usage and reliability.
                </li>
              </ul>
            </div>

            <div className="space-y-4 rounded-2xl border border-divider bg-surface-sunken p-6">
              <h2 className="text-lg font-semibold tracking-tight text-ink">How we use data</h2>
              <ul className="space-y-3 text-sm leading-relaxed text-text-muted">
                <li>To provide and secure the Cocoon workspace for your team.</li>
                <li>To improve design assistance quality and performance.</li>
                <li>To communicate updates, support, and onboarding guidance.</li>
                <li>To meet legal, security, and audit requirements.</li>
              </ul>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4 rounded-2xl border border-divider bg-surface-sunken p-6">
              <h2 className="text-lg font-semibold tracking-tight text-ink">Data sharing</h2>
              <p className="text-sm leading-relaxed text-text-muted">
                We do not sell your data. We only share it with vetted sub-processors needed to run Cocoon (e.g., hosting, analytics) and only under confidentiality and security obligations.
              </p>
            </div>

            <div className="space-y-4 rounded-2xl border border-divider bg-surface-sunken p-6">
              <h2 className="text-lg font-semibold tracking-tight text-ink">Your choices</h2>
              <ul className="space-y-3 text-sm leading-relaxed text-text-muted">
                <li>Request access, correction, or deletion of your personal data.</li>
                <li>Limit analytics tracking where supported by your browser.</li>
                <li>Close your workspace and export project data on request.</li>
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border border-divider bg-surface-sunken p-6 text-sm leading-relaxed text-text-muted">
            <p className="font-semibold text-ink">Security</p>
            <p className="mt-2 text-text-muted">
              We encrypt data in transit and at rest, enforce access controls for Cocoon staff, and review our infrastructure regularly. Contact security@cocoonlab.ai to report a vulnerability or request our sub-processor list.
            </p>
          </div>
        </div>
      </section>
    </LayoutShell>
  );
}
