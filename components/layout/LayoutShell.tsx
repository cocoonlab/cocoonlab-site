import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { ClosingCtaBand, type ClosingCtaProps } from "./ClosingCtaBand";

type LayoutShellProps = {
  children: ReactNode;
  ctaOverride?: Partial<ClosingCtaProps>;
  showCta?: boolean;
};

const defaultCta: ClosingCtaProps = {
  title: "See if Cocoon fits your next site.",
  titleSecondLine: "Join the private beta or watch the demo.",
  primaryLabel: "Join the private beta",
  secondaryLabel: "Watch demo",
  secondaryHref: { pathname: "/", hash: "demo" }
};

export function LayoutShell({
  children,
  ctaOverride,
  showCta = true
}: LayoutShellProps) {
  const mergedCta = { ...defaultCta, ...ctaOverride };

  return (
    <div className="relative flex min-h-screen flex-col bg-bg text-text">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-bg focus:shadow-lg"
      >
        Skip to main content
      </a>
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,_rgba(235,192,77,0.14),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(179,106,94,0.12),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_90%,_rgba(168,181,138,0.12),_transparent_65%)]" />
      </div>

      <Nav />

      <main id="main-content" className="flex-1 pt-20 md:pt-24">
        {children}
      </main>

      {showCta ? (
        <ClosingCtaBand
          title={mergedCta.title}
          titleSecondLine={mergedCta.titleSecondLine}
          primaryLabel={mergedCta.primaryLabel}
          primaryHref={mergedCta.primaryHref}
          secondaryLabel={mergedCta.secondaryLabel}
          secondaryHref={mergedCta.secondaryHref}
        />
      ) : null}

      <Footer />
    </div>
  );
}
