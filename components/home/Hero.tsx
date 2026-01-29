"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";

import { DEMO_FALLBACK_URL } from "@/lib/config";
import heroPoster from "@/public/images/website-main-vis.png";
import { Button } from "@/components/ui/Button";
import { PrimaryCtaLink } from "@/components/PrimaryCtaLink";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement | null>(null);

  return (
    <section
      ref={heroRef}
      className="section-pad bg-bg pt-8 md:pt-10 lg:pt-12"
    >
      <div className="container-x relative grid max-w-[86rem] items-center gap-12 lg:min-h-[70vh] lg:grid-cols-[0.48fr_0.52fr] xl:gap-20">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
          className="relative z-10 mx-auto flex max-w-3xl flex-col gap-6 text-left lg:mx-0 lg:max-w-4xl lg:justify-self-start lg:gap-7"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted">
            Keeping design fun, simple, and inspired.
          </p>
          <div className="space-y-5">
            <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-5xl lg:text-6xl">
              Cocoon — the cursor for architects.
            </h1>
            <p className="text-measure text-balance text-base leading-relaxed text-text-muted sm:text-lg">
              An AI workspace for early-stage design that keeps briefs, rules, and options in sync—so teams align faster.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <PrimaryCtaLink label="Join private beta" />
            <Button variant="secondary" href={DEMO_FALLBACK_URL} useAnchor>
              Watch demo
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="relative order-last mx-auto w-full max-w-[40rem] sm:max-w-[46rem] lg:order-none lg:max-w-[54rem] xl:max-w-[60rem]"
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <div className="rounded-2xl border border-divider/70 bg-surface-sunken p-3">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[12px] border border-border">
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
