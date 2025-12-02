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
  title: "Plan the present.",
  titleSecondLine: "Build the future.",
  primaryLabel: "Get started",
  secondaryLabel: "Contact sales",
  secondaryHref: "/contact"
};

export function LayoutShell({
  children,
  ctaOverride,
  showCta = true
}: LayoutShellProps) {
  const mergedCta = { ...defaultCta, ...ctaOverride };

  return (
    <div className="relative flex min-h-screen flex-col bg-bg text-text">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,_rgba(79,70,229,0.2),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(16,185,129,0.12),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_90%,_rgba(8,8,18,0.55),_transparent_65%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a14]/70 via-[#050509] to-[#020208]" />
      </div>

      <Nav />

      <main className="flex-1 pt-20 md:pt-24">
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
