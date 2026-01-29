import { Button } from "@/components/ui/Button";
import { PrimaryCtaLink } from "@/components/PrimaryCtaLink";
import { DEMO_FALLBACK_URL } from "@/lib/config";

export function FinalCtaSection() {
  return (
    <section className="bg-ink py-16 text-bg md:py-20 lg:py-24">
      <div className="container-x">
        <div className="mx-auto flex max-w-4xl flex-col items-start gap-6">
          <h2 className="text-balance text-3xl font-semibold text-bg md:text-4xl">
            See if Cocoon fits your next site.
          </h2>
          <p className="text-measure text-sm text-bg/80 md:text-base">
            Early partners help shape how Cocoon handles briefs, zoning, and design options.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <PrimaryCtaLink
              label="Join private beta"
              className="btn-primary border-bg bg-bg text-ink"
            />
            <Button
              variant="secondary"
              href={DEMO_FALLBACK_URL}
              useAnchor
              className="border-bg/40 text-bg"
            >
              Watch demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
