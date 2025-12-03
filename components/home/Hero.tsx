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

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -32]);
  const parallaxOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  const shouldAnimate = !prefersReducedMotion && isDesktop;

  return (
    <section
      ref={heroRef}
      className="section-pad relative overflow-hidden pt-12 md:pt-14 lg:pt-16"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c16]/85 via-[#050509]/92 to-[#02020a]" />
        <div className="absolute inset-x-0 top-0 h-60 bg-[radial-gradient(circle_at_50%_0%,_rgba(255,255,255,0.07),_transparent_58%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(79,70,229,0.12),transparent_36%,transparent_68%,rgba(16,185,129,0.14)_96%)]" />
      </div>

      <div className="container-x relative grid max-w-[82rem] items-start gap-12 lg:min-h-[80vh] lg:grid-cols-[0.48fr_0.52fr] xl:gap-20">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.22, 0.61, 0.36, 1]
          }}
          className="relative z-10 mx-auto flex max-w-3xl flex-col gap-7 text-left lg:mx-0 lg:max-w-4xl lg:justify-self-start lg:gap-8"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12px] font-semibold tracking-tight text-text-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-emerald" />
            <span>AI workspace for architecture teams</span>
          </p>

          <div className="space-y-5">
            <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl">
              Design faster.
              <br className="hidden sm:block" />
              Decide smarter.
              <br className="hidden sm:block" />
              On complex sites.
            </h1>
            <p className="max-w-xl text-balance text-base leading-relaxed text-text-soft sm:text-lg">
              {(siteConfig.shortName ?? siteConfig.name)} pulls briefs, zoning, and site intelligence into one clean workspace. Explore options with AI that respects constraints and keeps teams aligned from sketch to submission.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <PrimaryCtaLink
              label="Join the private beta"
              className="btn-primary w-full justify-center px-8 py-3 text-base font-semibold tracking-tight text-bg shadow-[0_22px_70px_rgba(0,0,0,0.65),_0_0_0_1px_rgba(255,255,255,0.14)] transition-transform duration-200 hover:-translate-y-[3px] sm:w-auto"
            />
            <Link
              href="/resources"
              className="group inline-flex items-center justify-center gap-2 rounded-pill border border-white/15 bg-white/5 px-7 py-3 text-sm font-medium text-text-soft transition-all duration-200 hover:-translate-y-[3px] hover:border-white/25 hover:text-white"
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

          <p className="text-sm leading-relaxed text-text-muted">
            Made for architecture, urban design, and planning teams working on demanding sites.
          </p>
        </motion.div>

        <motion.div
          className="relative order-last mx-auto w-full max-w-[36rem] sm:max-w-[42rem] lg:order-none lg:max-w-[48rem] xl:max-w-[54rem]"
          style={{
            y: shouldAnimate ? parallaxY : 0,
            opacity: shouldAnimate ? parallaxOpacity : 1,
            perspective: "1400px"
          }}
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: shouldAnimate ? parallaxY : 0 }}
          transition={{ duration: 0.65, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <div className="relative -mb-6 rounded-[30px] border border-white/10 bg-[#0b0b14]/85 shadow-[0_32px_120px_rgba(0,0,0,0.82)] backdrop-blur lg:-mb-10 lg:mt-6 lg:pl-6">
            <div className="absolute inset-0 rounded-[30px] bg-[linear-gradient(120deg,rgba(255,255,255,0.05),transparent_34%)]" />
            <div className="absolute inset-y-0 right-0 w-40 rounded-[30px] bg-gradient-to-l from-bg via-bg/60 to-transparent" />

            <motion.div
              className="relative bg-gradient-to-r from-white/4 via-white/2 to-white/4 p-2 sm:rotate-[-1deg] lg:rotate-[-4deg]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-br from-[#111122] via-[#0c0c18] to-[#050509]">
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,_rgba(255,255,255,0.08),_transparent_38%),_radial-gradient(circle_at_80%_40%,_rgba(16,185,129,0.08),_transparent_42%),_linear-gradient(135deg,rgba(255,255,255,0.04),transparent_32%)]" />
                  <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.06),transparent_36%)] mix-blend-screen" />
                </div>
                <video
                  src="/demo.mp4"
                  className="relative z-10 h-full w-full object-contain"
                  playsInline
                  muted
                  loop
                  autoPlay
                  aria-label="Cocoon workspace showing zoning-aware AI design insights"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
