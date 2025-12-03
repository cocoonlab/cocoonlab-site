import { LayoutShell } from "@/components/layout/LayoutShell";

export default function TermsPage() {
  return (
    <LayoutShell>
      <section className="section-pad">
        <div className="container-x space-y-8">
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight text-white">
              Terms of Service
            </h1>
            <p className="max-w-3xl text-sm leading-relaxed text-text-muted md:text-base">
              These terms govern your use of Cocoon. By accessing the workspace you agree to these conditions. If you’re accepting on behalf of a company, you confirm you have authority to do so.
            </p>
            <p className="text-xs text-text-muted">Last updated: July 2024</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-lg font-semibold tracking-tight text-white">Use of Cocoon</h2>
              <ul className="space-y-3 text-sm leading-relaxed text-text-soft">
                <li>Keep login links and workspace content confidential within your team.</li>
                <li>Don’t upload unlawful, infringing, or harmful materials.</li>
                <li>We may update or improve features; material changes will be communicated to customers.</li>
              </ul>
            </div>

            <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-lg font-semibold tracking-tight text-white">Accounts & billing</h2>
              <ul className="space-y-3 text-sm leading-relaxed text-text-soft">
                <li>You are responsible for activity under your account and invited users.</li>
                <li>Fees (if applicable) are invoiced per your order form; unpaid invoices may pause access.</li>
                <li>Either party may terminate for material breach not cured within 30 days.</li>
              </ul>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-lg font-semibold tracking-tight text-white">Intellectual property</h2>
              <p className="text-sm leading-relaxed text-text-soft">
                Cocoon owns the service and underlying technology. You retain rights to your project data and grant us a limited license to process it to provide the product. Feedback you share may be used to improve Cocoon.
              </p>
            </div>

            <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-lg font-semibold tracking-tight text-white">Liability</h2>
              <p className="text-sm leading-relaxed text-text-soft">
                Cocoon is provided “as is” during beta. To the maximum extent permitted by law, our aggregate liability is limited to the fees you paid for the service in the preceding three months.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm leading-relaxed text-text-soft">
            <p className="font-semibold text-white">Contact</p>
            <p className="mt-2 text-text-muted">
              Questions about these terms? Email legal@cocoonlab.ai and we’ll respond quickly.
            </p>
          </div>
        </div>
      </section>
    </LayoutShell>
  );
}
