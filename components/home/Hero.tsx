"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { siteConfig } from "@/lib/config";
import { PrimaryCtaLink } from "@/components/PrimaryCtaLink";

import heroIllustration from "@/public/images/saas-startup-hero-illustration.png";

export function Hero() {
  return (
    <section className="section-pad pb-10 pt-20 md:pt-24 lg:pt-28">
      <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-center">
        {/* Copy column */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="space-y-8"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-border-subtle/70 bg-surface-sunken/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-emerald" />
            <span>AI workspace for architects</span>
          </p>

          <div className="space-y-5">
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-white md:text-5xl lg:text-6xl">
              Design faster.
              <br className="hidden sm:block" />
              Decide smarter.
              <br className="hidden lg:block" />
              Deliver with confidence.
            </h1>
            <p className="max-w-xl text-balance text-sm text-text-soft md:text-base">
              {(siteConfig.shortName ?? siteConfig.name)} is a darkroom-like
              workspace for early-stage architecture. Pull briefs, zoning, and
              site intelligence into one place, then explore options with an AI
              that understands constraints, not just geometry.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <PrimaryCtaLink label="Join the private beta" className="btn-primary" />
            <Link href="/contact" className="btn-ghost">
              Talk to us
            </Link>
          </div>

          <p className="text-xs text-text-muted md:text-sm">
            Designed for architecture, urban design, and planning teams working
            on complex sites and multi-stakeholder projects.
          </p>
        </motion.div>

        {/* Visual column */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.12 }}
          className="relative"
        >
          <motion.div
            whileHover={{ scale: 1.01, rotateX: -3, rotateY: 3 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            className="card-surface relative overflow-hidden bg-gradient-to-b from-surface-raised/80 via-surface-raised/95 to-bg/80 shadow-inner-glow"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Halo gradients */}
            <div className="pointer-events-none absolute -inset-20 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.55),_transparent_60%)]" />
            <div className="pointer-events-none absolute -inset-20 bg-[radial-gradient(circle_at_bottom,_rgba(16,185,129,0.4),_transparent_55%)]" />

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
