import Link from "next/link";
import type { Route } from "next";
import type { UrlObject } from "url";
import { PrimaryCtaLink } from "@/components/PrimaryCtaLink";

export type ClosingCtaProps = {
  title: string;
  titleSecondLine?: string;
  primaryLabel: string;
  primaryHref?: Route | UrlObject;
  secondaryLabel?: string;
  secondaryHref?: Route | UrlObject;
  className?: string;
};

export function ClosingCtaBand({
  title,
  titleSecondLine,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  className
}: ClosingCtaProps) {
  return (
    <section
      className={`relative overflow-hidden border-t border-divider bg-surface-raised ${className ?? ""}`.trim()}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-divider to-transparent" />
      <div className="container-x flex flex-col items-center gap-6 py-16 text-center md:py-20">
        <h2 className="text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
          <span className="block sm:inline">{title}</span>
          {titleSecondLine ? (
            <>
              <br className="sm:hidden" />
              <span className="block sm:inline sm:ml-2">{titleSecondLine}</span>
            </>
          ) : null}
        </h2>
        <div className="flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
          {primaryHref ? (
            <Link
              href={primaryHref}
              className="btn-primary px-7 py-3 text-base font-semibold text-bg"
            >
              {primaryLabel}
            </Link>
          ) : (
            <PrimaryCtaLink
              label={primaryLabel}
              className="btn-primary px-7 py-3 text-base font-semibold text-bg"
            />
          )}
          {secondaryHref && secondaryLabel ? (
            <Link
              href={secondaryHref}
              className="btn-secondary px-6 py-2.5 text-sm font-semibold"
            >
              {secondaryLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
