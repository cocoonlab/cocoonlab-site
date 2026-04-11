import type { ReactNode } from "react";
import type { Route } from "next";
import Link from "next/link";
import type { UrlObject } from "url";

import { siteConfig } from "@/lib/config";
import { ArchitecturalNav } from "./ArchitecturalNav";
import type { StudioNavItem } from "./data";

type ArchitecturalShellProps = {
  children: ReactNode;
  navItems: readonly StudioNavItem[];
  ctaLabel: string;
  ctaHref: Route | UrlObject;
  footerMode?: "default" | "compact";
};

export function ArchitecturalShell({
  children,
  navItems,
  ctaLabel,
  ctaHref,
  footerMode = "default"
}: ArchitecturalShellProps) {
  return (
    <div className="architectural-theme overflow-x-clip">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-studio-lowest focus:px-4 focus:py-2 focus:text-sm focus:text-studio-ink"
      >
        Skip to content
      </a>

      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(214,231,217,0.45),transparent_34%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_12%,rgba(253,231,211,0.5),transparent_28%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#f9f9f7_0%,#f4f6f4_100%)]" />
      </div>

      <ArchitecturalNav items={navItems} ctaLabel={ctaLabel} ctaHref={ctaHref} />

      <main id="main-content" className="pt-28 md:pt-32">
        {children}
      </main>

      <ArchitecturalFooter compact={footerMode === "compact"} />
    </div>
  );
}

function ArchitecturalFooter({ compact = false }: { compact?: boolean }) {
  return (
    <footer
      className={[
        "mt-20 bg-studio-inset text-studio-muted",
        compact ? "py-10" : "py-16"
      ].join(" ")}
    >
      <div className="studio-container flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div className="space-y-4">
          <div className="font-display text-2xl font-semibold tracking-[-0.04em] text-studio-ink">
            COCOON / DIGITAL CURATOR
          </div>
          <p className="max-w-md text-sm leading-relaxed">
            Designed for early-stage architecture teams moving from intuition to
            architectural proof.
          </p>
          <p className="text-xs tracking-[0.18em] text-studio-muted/80">
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
          <Link href="/privacy" className="transition-opacity hover:opacity-100 opacity-70">
            Privacy
          </Link>
          <Link href="/terms" className="transition-opacity hover:opacity-100 opacity-70">
            Terms
          </Link>
          <Link href="/resources" className="transition-opacity hover:opacity-100 opacity-70">
            Monograph
          </Link>
          <Link href="/contact" className="transition-opacity hover:opacity-100 opacity-70">
            Contact
          </Link>
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="transition-opacity hover:opacity-100 opacity-70"
          >
            {siteConfig.contactEmail}
          </a>
        </div>
      </div>
    </footer>
  );
}
