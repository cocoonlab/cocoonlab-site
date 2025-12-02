"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { siteConfig } from "@/lib/config";
import { PrimaryCtaLink } from "@/components/PrimaryCtaLink";

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
  const heroRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -48]);
  const parallaxOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  const shouldAnimate = !prefersReducedMotion && isDesktop;

  return (
    <section
      ref={heroRef}
      className="section-pad relative overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c16]/70 via-[#050509]/90 to-[#03030a]" />
        <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_50%_0%,_rgba(255,255,255,0.06),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(79,70,229,0.15),transparent_38%,transparent_65%,rgba(16,185,129,0.12)_95%)]" />
      </div>

      <div className="container-x relative flex flex-col justify-center gap-10 lg:min-h-[80vh]">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.22, 0.61, 0.36, 1]
          }}
          className="relative z-10 max-w-3xl space-y-7 text-center lg:max-w-4xl lg:text-left"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12px] font-semibold tracking-tight text-text-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-emerald" />
            <span>AI workspace for architecture & cities</span>
          </p>

          <div className="space-y-5">
            <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl">
              Design faster.
              <br className="hidden sm:block" />
              Decide smarter.
              <br className="hidden sm:block" />
              On complex sites.
            </h1>
            <p className="mx-auto max-w-2xl text-balance text-base leading-relaxed text-text-soft lg:mx-0 lg:max-w-xl">
              {(siteConfig.shortName ?? siteConfig.name)} pulls briefs, zoning, and site intelligence into one clean workspace. Explore options with AI that respects constraints and keeps teams aligned from sketch to submission.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <PrimaryCtaLink
              label="Join the private beta"
              className="btn-primary px-7 py-3 text-base font-semibold tracking-tight text-bg shadow-[0_22px_70px_rgba(0,0,0,0.65),_0_0_0_1px_rgba(255,255,255,0.14)] transition-transform duration-200 hover:-translate-y-[3px]"
            />
            <Link
              href="/resources"
              className="group inline-flex items-center justify-center gap-2 rounded-pill border border-white/15 bg-white/5 px-6 py-[11px] text-sm font-medium text-text-soft transition-all duration-200 hover:-translate-y-[3px] hover:border-white/25 hover:text-white"
            >
              <span>New: Project Brain →</span>
              <span
                aria-hidden="true"
                className="text-xs transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>

          <p className="text-center text-sm leading-relaxed text-text-muted lg:text-left">
            Made for architecture, urban design, and planning teams working on demanding sites.
          </p>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-5xl lg:absolute lg:bottom-[-6%] lg:left-0 lg:max-w-[62rem] lg:-translate-y-2"
          style={{
            y: shouldAnimate ? parallaxY : 0,
            opacity: shouldAnimate ? parallaxOpacity : 1,
            perspective: "1400px"
          }}
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: shouldAnimate ? parallaxY : 0 }}
          transition={{ duration: 0.65, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <div className="relative overflow-hidden rounded-[28px] border border-white/8 bg-[#0b0b14]/80 shadow-[0_32px_120px_rgba(0,0,0,0.82)] backdrop-blur">
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.04),transparent_30%)]" />
            <div className="absolute inset-y-0 right-0 w-36 bg-gradient-to-l from-bg via-bg/60 to-transparent" />

            <motion.div
              className="relative rotate-[-2deg] bg-gradient-to-r from-white/4 via-white/2 to-white/4 p-2 sm:rotate-[-3deg] lg:rotate-[-6deg]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-br from-[#111122] via-[#0c0c18] to-[#050509]">
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,_rgba(255,255,255,0.08),_transparent_38%),_radial-gradient(circle_at_80%_40%,_rgba(16,185,129,0.08),_transparent_42%),_linear-gradient(135deg,rgba(255,255,255,0.04),transparent_32%)]" />
                  <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.06),transparent_36%)] mix-blend-screen" />
                </div>
                <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-2 text-center text-sm font-medium text-white/70">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold tracking-tight text-white/80">
                    website-main-vis (placeholder)
                  </span>
                  <p className="max-w-sm text-xs text-white/60">
                    Add <span className="font-semibold text-white">website-main-vis.png</span> to <code className="rounded bg-white/5 px-1.5 py-[2px]">public/images/</code> to replace this placeholder.
                  </p>
                </div>
                <span className="sr-only">Hero visual placeholder; add website-main-vis.png to public/images to display the product screenshot.</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
