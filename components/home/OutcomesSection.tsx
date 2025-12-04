"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { Section } from "@/components/Section";

const bullets = ["Fewer alignment cycles", "Less unpaid early work"];

const visuals = [
  {
    src: "/images/revision-comparison-chart.png",
    alt: "Line chart comparing revision rounds across teams.",
    label: "Review rounds trimmed"
  },
  {
    src: "/images/architectural-knowledge-graph-canvas.png",
    alt: "Split-screen showing a consolidated workspace versus scattered tools.",
    label: "All connected — a single source of truth."
  }
];

export function OutcomesSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section
      id="outcomes"
      eyebrow="Outcomes"
      title="Aligned work moves faster."
      kicker="Pilot studios trim review loops and keep early hours billable."
      className="border-y border-border-subtle/70 bg-surface-raised/70"
      variant="default"
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-center">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
          className="card-surface space-y-6 p-6 shadow-inner-glow md:p-7"
        >
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-soft">Pilot median</p>
            <p className="text-3xl font-semibold text-white md:text-4xl lg:text-[40px]">
              ~63% faster concepting
            </p>
            <p className="text-sm text-text-muted md:text-base">Brief to first aligned option.</p>
          </div>

          <ul className="space-y-3 text-sm text-text-soft md:text-base">
            {bullets.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-accent-emerald" aria-hidden />
                <span className="text-text-muted">{point}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          {visuals.map((visual) => (
            <figure
              key={visual.src}
              className="group relative overflow-hidden rounded-2xl border border-border-subtle/70 bg-surface-sunken/80 sm:min-h-[240px] lg:min-h-[300px]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative h-full w-full sm:aspect-[3/2] lg:aspect-[16/10]">
                <Image
                  src={visual.src}
                  alt={visual.alt}
                  fill
                  sizes="(min-width: 1024px) 26rem, (min-width: 640px) 50vw, 90vw"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <figcaption className="absolute inset-x-4 bottom-4 rounded-full bg-black/45 px-3 py-2 text-center text-xs font-medium text-white backdrop-blur">
                {visual.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </Section>
  );
}
