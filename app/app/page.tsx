import { LayoutShell } from "@/components/layout/LayoutShell";

export default function ProductShellPlaceholder() {
  return (
    <LayoutShell>
      <section className="section-pad">
        <div className="container-x space-y-4">
          <h1 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Cocoon Lab app
          </h1>
          <p className="max-w-xl text-sm text-text-muted md:text-base">
            This is a placeholder route representing the live Cocoon product.
            In production it would mount your authenticated application
            experience. For now it helps us wire marketing flows and navigation.
          </p>
        </div>
      </section>
    </LayoutShell>
  );
}
