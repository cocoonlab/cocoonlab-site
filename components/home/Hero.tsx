"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

import { siteConfig } from "@/lib/config";
import { PrimaryCtaLink } from "@/components/PrimaryCtaLink";

import heroIllustration from "@/public/images/saas-startup-hero-illustration.png";

function useIsDesktop(minWidth = 768) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const query = window.matchMedia(`(min-width: ${minWidth}px)`);
    const update = () => setIsDesktop(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [minWidth]);

  return isDesktop;
}

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useIsDesktop();
  const enableFloat = isDesktop && !prefersReducedMotion;

  return (
    <section className="section-pad pb-10 pt-20 md:pt-24 lg:pt-28">
      <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-center">
        {/* Copy column */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.22, 0.61, 0.36, 1]
          }}
          className="space-y-8"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-border-subtle/70 bg-surface-sunken/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-emerald" />
            <span>AI workspace for architects</span>
          </p>

          <div className="space-y-5">
            <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
              Design faster.
              <br className="hidden sm:block" />
              Decide smarter.
              <br className="hidden lg:block" />
              Deliver with confidence.
            </h1>
            <p className="max-w-xl text-balance text-sm leading-relaxed text-text-soft md:text-base">
              {(siteConfig.shortName ?? siteConfig.name)} is a darkroom-like
              workspace for early-stage architecture. Pull briefs, zoning, and
              site intelligence into one place, then explore options with an AI
              that understands constraints, not just geometry.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <PrimaryCtaLink
              label="Join the private beta"
              className="btn-primary hero-primary-cta relative overflow-hidden px-6 py-2.5 text-sm font-semibold tracking-wide
                         hover:scale-[1.03] active:scale-[0.98] transition-transform duration-200 ease-out
                         bg-gradient-to-r from-accent-purple via-accent-blue to-accent-emerald
                         shadow-[0_0_0_1px_rgba(148,163,184,0.45),0_18px_50px_rgba(15,23,42,0.9)]
                         hover:shadow-[0_0_0_1px_rgba(165,180,252,0.8),0_22px_60px_rgba(30,64,175,0.85)]
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            />
            <Link
              href="/contact"
              className="btn-ghost hero-secondary-cta group relative overflow-hidden px-5"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <span>Talk to us</span>
                <span
                  aria-hidden="true"
                  className="text-[0.7rem] text-text-muted transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  ↗
                </span>
              </span>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-4 bottom-[7px] h-[2px] origin-left scale-x-0 rounded-full bg-gradient-to-r from-accent-blue/90 via-accent-purple/90 to-accent-blue/90 transition-transform duration-250 group-hover:scale-x-100"
              />
            </Link>
          </div>

          <p className="text-xs leading-relaxed text-text-muted md:text-sm">
            Designed for architecture, urban design, and planning teams working
            on complex sites and multi-stakeholder projects.
          </p>
        </motion.div>

        {/* Visual column */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 0.61, 0.36, 1],
            delay: 0.08
          }}
          className="relative"
        >
          <motion.div
            animate={
              enableFloat
                ? {
                    y: [0, -6, 0, -3, 0],
                    rotateX: [0, -1.2, 0],
                    rotateY: [0, 1.2, 0]
                  }
                : undefined
            }
            transition={
              enableFloat
                ? {
                    duration: 16,
                    ease: "easeInOut",
                    repeat: Infinity
                  }
                : undefined
            }
            whileHover={
              prefersReducedMotion
                ? undefined
                : { scale: 1.015, rotateX: -3, rotateY: 3 }
            }
            className="card-surface hero-visual-high relative overflow-hidden bg-gradient-to-b from-surface-raised/80 via-surface-raised/95 to-bg/80 shadow-inner-glow"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Halo gradients / light pool */}
            <div className="pointer-events-none absolute -inset-24 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.7),_transparent_60%)]" />
            <div className="pointer-events-none absolute -inset-24 bg-[radial-gradient(circle_at_bottom,_rgba(129,230,217,0.55),_transparent_55%)]" />

            {/* Status chips */}
            <div className="relative flex flex-wrap items-center gap-2 border-b border-border-subtle/70 bg-surface-sunken/80 px-4 py-3">
              <span className="badge-pill bg-surface-raised/80 text-[10px] tracking-[0.16em]">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-accent-emerald" />
                Feasibility
              </span>
              <span className="badge-pill bg-surface-sunken/80 text-[10px] tracking-[0.16em]">
                Zoning-aware
              </span>
              <span className="badge-pill bg-surface-sunken/80 text-[10px] tracking-[0.16em]">
                Concept board
              </span>
            </div>

            {/* Main illustration */}
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={heroIllustration}
                alt="Cocoon workspace showing zoning-aware massing options and an architectural project overview."
                fill
                priority
                sizes="(min-width: 1024px) 38rem, (min-width: 768px) 32rem, 100vw"
                className="pointer-events-none select-none object-cover"
              />

              {/* Overlay callout */}
              <div className="pointer-events-none absolute inset-x-4 bottom-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border-subtle/70 bg-bg/70 px-3 py-2 text-[11px] text-text-soft backdrop-blur-md md:inset-x-6 md:py-2.5">
                <p className="flex items-center gap-2">
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-accent-emerald" />
                  <span>
                    Site capacity:
                    <span className="ml-1 font-medium text-white">
                      +18% vs baseline
                    </span>
                  </span>
                </p>
                <p className="hidden text-[10px] text-text-muted sm:block">
                  Calculated from your brief, zoning envelope, and project hours.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
