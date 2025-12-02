import { LayoutShell } from "@/components/layout/LayoutShell";

export default function TermsPage() {
  return (
    <LayoutShell>
      <section className="section-pad">
        <div className="container-x space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Terms
          </h1>
          <p className="text-sm text-text-muted">
            This is a placeholder terms of service. Replace it with your actual
            terms before going live.
          </p>
        </div>
      </section>
    </LayoutShell>
  );
}
