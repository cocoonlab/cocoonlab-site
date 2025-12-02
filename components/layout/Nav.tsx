"use client";

import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { UrlObject } from "url";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Logo } from "../Logo";
import { PrimaryCtaLink } from "@/components/PrimaryCtaLink";

type NavItem = {
  label: string;
  href: Route | UrlObject;
  anchorId?: string;
  activePath?: Route;
};

const navItems: NavItem[] = [
  {
    label: "Product",
    href: { pathname: "/", hash: "product" },
    anchorId: "product",
    activePath: "/"
  },
  {
    label: "How it works",
    href: { pathname: "/", hash: "how-it-works" },
    anchorId: "how-it-works",
    activePath: "/"
  },
  {
    label: "Pricing",
    href: { pathname: "/", hash: "pricing" },
    anchorId: "pricing",
    activePath: "/"
  },
  {
    label: "Customers",
    href: { pathname: "/", hash: "customers" },
    anchorId: "customers",
    activePath: "/"
  },
  {
    label: "Resources",
    href: "/resources",
    activePath: "/resources"
  },
  { label: "Now", href: { pathname: "/", hash: "now" }, anchorId: "now", activePath: "/" }
];

export function Nav() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeAnchor, setActiveAnchor] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const anchorIds = useMemo(
    () => navItems.filter((item) => item.anchorId).map((item) => item.anchorId as string),
    []
  );

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Reset active section when changing routes
    setActiveAnchor(null);
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (prefersReducedMotion || pathname !== "/") return;

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
  }, [anchorIds, pathname, prefersReducedMotion]);

  function closeMobile() {
    setOpen(false);
  }

  const headerBase =
    "fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-gradient-to-b from-[#0c0c16]/95 via-[#050509]/95 to-[#050509]/90 backdrop-blur-xl transition-[background-color,border-color,transform,padding] duration-300";
  const headerScrolled = isScrolled
    ? "shadow-[0_18px_40px_rgba(0,0,0,0.7)]"
    : "shadow-[0_10px_40px_rgba(0,0,0,0.35)]";

  const containerBase =
    "container-x flex items-center justify-between gap-6 transition-[padding] duration-300";
  const containerPadding = isScrolled ? "py-2.5" : "py-3.5";

  return (
    <header className={`${headerBase} ${headerScrolled}`}>
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0)_36%)]" />
      </div>

      <div className={`${containerBase} ${containerPadding}`}>
        <div className="flex flex-1 items-center gap-6">
          <Logo />
          <nav className="hidden flex-1 items-center justify-center gap-1 text-sm font-medium tracking-tight text-text md:flex">
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
              const isAnchorActive =
                isAnchor && pathname === "/" && activeAnchor === item.anchorId;
              const isActive = isPageActive || isAnchorActive;

              const baseClasses =
                "group relative inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors duration-200";
              const activeClasses = "text-white";
              const inactiveClasses = "text-text-muted hover:text-text";

              return (
                <Link
                  key={itemKey}
                  href={item.href}
                  className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
                  onClick={() => {
                    if (item.anchorId) {
                      setActiveAnchor(item.anchorId);
                    }
                  }}
                >
                  <span>{item.label}</span>
                  <span
                    aria-hidden="true"
                    className={`
                      pointer-events-none absolute inset-x-3 -bottom-[2px] h-[3px] origin-center scale-x-0 rounded-full bg-gradient-to-r from-accent-blue/80 via-accent-purple/80 to-accent-emerald/80 transition-transform duration-300
                      ${isActive ? "scale-x-100" : "group-hover:scale-x-100"}
                    `}
                  />
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/app"
            className="hidden text-sm font-medium text-text-muted underline-offset-4 transition-colors duration-150 hover:text-white hover:underline md:inline-flex"
          >
            Log in
          </Link>
          <div className="hidden sm:block">
            <PrimaryCtaLink
              label="Get started"
              className="btn-primary px-5 py-2.5 text-sm font-semibold tracking-tight text-bg hover:-translate-y-0.5 hover:shadow-[0_24px_70px_rgba(0,0,0,0.6)]"
            />
          </div>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border-subtle bg-surface-sunken/80 text-text md:hidden"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
          >
            <span className="sr-only">Toggle navigation</span>
            <div className="flex flex-col items-center justify-center gap-1.5">
              <span
                className={`h-[1px] w-4 origin-center bg-text transition-transform duration-200 ${
                  open ? "translate-y-[4px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-[1px] w-4 bg-text transition-opacity duration-150 ${
                  open ? "opacity-0" : "opacity-80"
                }`}
              />
              <span
                className={`h-[1px] w-4 origin-center bg-text transition-transform duration-200 ${
                  open ? "-translate-y-[4px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile overlay + menu */}
      <AnimatePresence>
        {open && (
          <>
            {/* Dimmed background */}
            <motion.div
              key="nav-overlay"
              className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.2
              }}
              onClick={closeMobile}
            />

            {/* Sliding panel */}
            <motion.div
              key="nav-panel"
              className="fixed inset-x-0 top-0 z-40 border-b border-border-subtle bg-surface-sunken/95 pb-4 pt-[4.1rem] shadow-soft backdrop-blur-xl md:hidden"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.25,
                ease: [0.22, 0.61, 0.36, 1]
              }}
            >
              <div className="container-x">
                <nav className="space-y-1 text-sm">
                  {navItems.map((item) => {
                    const itemKey =
                      typeof item.href === "string"
                        ? item.href
                        : `${item.href.pathname ?? ""}#${item.anchorId ?? item.label}`;
                    return (
                      <Link
                        key={itemKey}
                        href={item.href}
                        className="flex items-center justify-between rounded-xl px-3 py-2 text-text-soft transition-colors duration-150 hover:bg-surface-raised/80 hover:text-text"
                        onClick={() => {
                          if (item.anchorId) setActiveAnchor(item.anchorId);
                          closeMobile();
                        }}
                      >
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                  <Link
                    href="/app"
                    className="mt-1 flex items-center justify-between rounded-xl px-3 py-2 text-text-soft transition-colors duration-150 hover:bg-surface-raised/80 hover:text-text"
                    onClick={closeMobile}
                  >
                    <span>Log in</span>
                  </Link>
                  <div className="pt-3">
                    <PrimaryCtaLink
                      label="Get started"
                      className="btn-primary flex w-full justify-center text-sm"
                    />
                  </div>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
