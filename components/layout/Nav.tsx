"use client";

import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { UrlObject } from "url";
import { Logo } from "../Logo";
import { PrimaryCtaLink } from "@/components/PrimaryCtaLink";
import { getHomeSection, homeSectionHref } from "@/lib/sections";

type NavItem = {
  label: string;
  href: Route | UrlObject;
  anchorId?: string;
  activePath?: Route;
};

const navItems: NavItem[] = [
  ...(["problem", "workflow", "product", "outcomes", "use-cases", "team"] as const)
    .map((id) => getHomeSection(id))
    .filter(Boolean)
    .map((section) => ({
      label: section!.label,
      href: homeSectionHref(section!.id),
      anchorId: section!.id,
      activePath: "/" as Route
    })),
  {
    label: "Resources",
    href: "/resources",
    activePath: "/resources"
  }
];

export function Nav() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const [activeAnchor, setActiveAnchor] = useState<string | null>(null);

  const anchorIds = useMemo(
    () => navItems.filter((item) => item.anchorId).map((item) => item.anchorId as string),
    []
  );

  useEffect(() => {
    setActiveAnchor(null);
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (visibleEntry?.target?.id) {
          setActiveAnchor(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: [0.15, 0.4, 0.6]
      }
    );

    anchorIds.forEach((anchorId) => {
      const el = document.getElementById(anchorId);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [anchorIds, pathname]);

  function closeMobile() {
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-divider bg-bg/95 backdrop-blur">
      <div className="container-x flex items-center justify-between gap-6 py-3 md:py-4">
        <Logo />

        <div className="flex items-center gap-6">
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => {
              const itemKey =
                typeof item.href === "string"
                  ? item.href
                  : `${item.href.pathname ?? ""}#${item.anchorId ?? item.label}`;
              const isAnchor = Boolean(item.anchorId);
              const isPageActive =
                !isAnchor && item.activePath
                  ? pathname === item.activePath || pathname.startsWith(item.activePath + "/")
                  : false;
              const isAnchorActive = isAnchor && pathname === "/" && activeAnchor === item.anchorId;
              const isActive = isPageActive || isAnchorActive;

              return (
                <Link
                  key={itemKey}
                  href={item.href}
                  className={`relative inline-flex items-center pb-2 text-[15px] font-medium text-text/80 transition-opacity duration-150 hover:opacity-70 hover:underline hover:decoration-current hover:underline-offset-8 ${
                    isActive ? "text-text" : ""
                  }`}
                  onClick={() => {
                    if (item.anchorId) {
                      setActiveAnchor(item.anchorId);
                    }
                  }}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute left-1/2 -bottom-1 h-1 w-4 -translate-x-1/2 rounded-full bg-text transition-opacity duration-150 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <PrimaryCtaLink
              label="Join the private beta"
              className="btn-primary px-4 py-2 text-sm font-semibold"
            />
          </div>

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-divider bg-bg text-text md:hidden"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
          >
            <span className="sr-only">Toggle navigation</span>
            {open ? (
              <span className="text-xs font-semibold">Close</span>
            ) : (
              <span className="text-xs font-semibold">Menu</span>
            )}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-divider bg-bg md:hidden">
          <nav className="container-x flex flex-col gap-3 py-4">
            {navItems.map((item) => {
              const itemKey =
                typeof item.href === "string"
                  ? item.href
                  : `${item.href.pathname ?? ""}#${item.anchorId ?? item.label}`;
              return (
                <Link
                  key={itemKey}
                  href={item.href}
                  className="text-[15px] font-medium text-text/80 underline-offset-8 hover:opacity-70 hover:underline"
                  onClick={() => {
                    if (item.anchorId) setActiveAnchor(item.anchorId);
                    closeMobile();
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-2">
              <PrimaryCtaLink
                label="Join the private beta"
                className="btn-primary w-full justify-center text-sm font-semibold"
              />
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
