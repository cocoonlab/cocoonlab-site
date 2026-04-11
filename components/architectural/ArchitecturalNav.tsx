"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { UrlObject } from "url";

import type { StudioNavItem } from "./data";

type ArchitecturalNavProps = {
  items: readonly StudioNavItem[];
  ctaLabel: string;
  ctaHref: Route | UrlObject;
};

export function ArchitecturalNav({
  items,
  ctaLabel,
  ctaHref
}: ArchitecturalNavProps) {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const navClasses = [
    "fixed inset-x-0 top-0 z-50 transition-all duration-300",
    scrolled ? "pt-3" : "pt-5"
  ].join(" ");

  const panelClasses = [
    "studio-container flex items-center justify-between gap-4 rounded-[1.2rem] border px-4 py-3 md:px-6",
    "glass-panel ghost-border",
    scrolled ? "shadow-studio" : ""
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={navClasses}>
      <div className={panelClasses}>
        <Link
          href="/"
          className="flex items-center gap-3 text-studio-ink transition-opacity hover:opacity-80"
          aria-label="Cocoon home"
        >
          <span className="font-display text-2xl font-semibold tracking-[-0.04em]">
            COCOON
          </span>
          <span className="hidden text-[0.68rem] uppercase tracking-[0.2em] text-studio-muted md:inline">
            Early-Stage Architectural AI
          </span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {items.map((item) => {
            const isActive = matchesPath(pathname, item.matchPath);

            return (
              <Link
                key={navItemKey(item)}
                href={item.href}
                className={[
                  "rounded-full px-4 py-2 font-display text-lg italic transition-colors",
                  isActive
                    ? "bg-studio-lowest text-studio-ink"
                    : "text-studio-muted hover:text-studio-ink"
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Link href={ctaHref} className="studio-primary-button px-6 py-2.5">
            {ctaLabel}
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-studio-line/15 bg-studio-lowest text-studio-primary md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="relative block h-4 w-4">
            <span
              className={[
                "absolute left-0 top-[3px] h-px w-4 bg-current transition-transform duration-200",
                open ? "translate-y-[3px] rotate-45" : ""
              ].join(" ")}
            />
            <span
              className={[
                "absolute left-0 top-[8px] h-px w-4 bg-current transition-opacity duration-200",
                open ? "opacity-0" : "opacity-100"
              ].join(" ")}
            />
            <span
              className={[
                "absolute left-0 top-[13px] h-px w-4 bg-current transition-transform duration-200",
                open ? "-translate-y-[7px] -rotate-45" : ""
              ].join(" ")}
            />
          </span>
        </button>
      </div>

      {open ? (
        <div className="studio-container pt-3 md:hidden">
          <div className="rounded-[1.25rem] border border-studio-line/15 bg-studio-lowest p-4 shadow-studio">
            <nav className="flex flex-col gap-2">
              {items.map((item) => (
                <Link
                  key={navItemKey(item)}
                  href={item.href}
                  className="rounded-xl px-4 py-3 font-display text-xl italic text-studio-ink transition-colors hover:bg-studio-low"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4">
              <Link href={ctaHref} className="studio-primary-button w-full">
                {ctaLabel}
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function navItemKey(item: StudioNavItem) {
  if (typeof item.href === "string") {
    return item.href;
  }

  return `${item.href.pathname ?? ""}#${item.href.hash ?? ""}`;
}

function matchesPath(pathname: string, matchPath: Route) {
  if (matchPath === "/") {
    return pathname === "/";
  }

  return pathname === matchPath || pathname.startsWith(`${matchPath}/`);
}
