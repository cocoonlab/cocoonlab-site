"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { DEMO_FALLBACK_URL, siteConfig } from "@/lib/config";
import { VideoLightbox } from "@/components/media/VideoLightbox";
import { PrimaryCtaLink } from "@/components/PrimaryCtaLink";
import heroPoster from "@/public/images/website-main-vis.png";

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
    <section ref={heroRef} className="section-pad relative overflow-hidden pt-8 md:pt-10 lg:pt-12">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c16]/85 via-[#050509]/92 to-[#02020a]" />
        <div className="absolute inset-x-0 top-0 h-60 bg-[radial-gradient(circle_at_50%_0%,_rgba(255,255,255,0.07),_transparent_58%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(79,70,229,0.12),transparent_36%,transparent_68%,rgba(16,185,129,0.14)_96%)]" />
      </div>

      <div className="container-x relative grid max-w-[86rem] items-center gap-12 lg:min-h-[82vh] lg:grid-cols-[0.48fr_0.52fr] xl:gap-20">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
          className="relative z-10 mx-auto flex max-w-3xl flex-col gap-7 text-left lg:mx-0 lg:max-w-4xl lg:justify-self-start lg:gap-8"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12px] font-semibold tracking-tight text-text-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-emerald" />
            <span>Cocoon Lab is an AI-native design studio rethinking design — starting with Cocoon.</span>
          </p>
          <div className="space-y-5">
            <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl">
              AI copilot for early-stage architectural design.
            </h1>
            <p className="max-w-xl text-balance text-base leading-relaxed text-text-soft sm:text-lg">
              {(siteConfig.shortName ?? siteConfig.name)} keeps briefs, rules, and AI options in sync so teams choose quickly.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <PrimaryCtaLink
              label="Join the private beta"
              className="btn-primary w-full justify-center px-8 py-3 text-base font-semibold tracking-tight text-bg shadow-[0_22px_70px_rgba(0,0,0,0.65),_0_0_0_1px_rgba(255,255,255,0.14)] transition-transform duration-200 hover:-translate-y-[3px] sm:w-auto"
            />
            <VideoLightbox
              videoSrc="/demo.mp4"
              posterSrc="/images/website-main-vis.png"
              triggerLabel="Watch demo"
              className="btn-ghost px-7 py-3 text-sm font-semibold"
            />
          </div>

          <div className="space-y-1 text-sm leading-relaxed text-text-muted">
            <p>Built with studios designing housing, institutional buildings, and civic spaces.</p>
            <a
              href={DEMO_FALLBACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-text-soft underline-offset-4 hover:text-white hover:underline"
            >
              Demo (opens in new tab)
              <span aria-hidden>↗</span>
            </a>
          </div>
        </motion.div>

        <motion.div
          className="relative order-last mx-auto w-full max-w-[40rem] sm:max-w-[46rem] lg:order-none lg:max-w-[54rem] xl:max-w-[60rem]"
          style={{
            y: shouldAnimate ? parallaxY : 0,
            opacity: shouldAnimate ? parallaxOpacity : 1,
            perspective: shouldAnimate ? "1400px" : undefined
          }}
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: shouldAnimate ? parallaxY.get() : 0 }}
          transition={{ duration: 0.65, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#0b0b14]/85 shadow-[0_32px_120px_rgba(0,0,0,0.82)] backdrop-blur">
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.05),transparent_34%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(129,140,248,0.16),transparent_45%),_radial-gradient(circle_at_80%_30%,rgba(45,212,191,0.16),transparent_42%)]" />
            <div className="relative aspect-[16/10]">
              <Image
                src={heroPoster}
                alt="Cocoon workspace with a live brief and zoning-aware options"
                fill
                sizes="(min-width: 1280px) 50rem, (min-width: 1024px) 44rem, (min-width: 768px) 38rem, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
