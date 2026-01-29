"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import projectHoursCard from "@/public/images/three-step-workflow-diagram.png";

type MetricsStripProps = {
  className?: string;
};

export function MetricsStrip({ className }: MetricsStripProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={[
        "card-surface relative overflow-hidden border border-border-subtle/80 bg-surface-raised/80 px-4 py-5 shadow-inner-glow sm:px-6 lg:px-8",
        className
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="pointer-events-none absolute inset-x-[-20%] top-0 h-32 bg-gradient-to-r from-transparent via-accent-blue/30 to-transparent opacity-70" />
      <div className="pointer-events-none absolute inset-x-[-20%] bottom-0 h-32 bg-gradient-to-r from-transparent via-accent-emerald/30 to-transparent opacity-70" />

      <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
        <div className="space-y-4">
          <p className="text-sm font-semibold text-white md:text-base">Cocoon keeps early design aligned.</p>
          <p className="max-w-xl text-sm text-text-soft md:text-[15px]">
            Capture inputs, consolidate context, and move into concepting with the whole team on the same page.
          </p>
        </div>

        <figure className="card-surface relative overflow-hidden shadow-inner-glow">
          <div className="relative h-48 sm:h-52 lg:h-56">
            <Image
              src={projectHoursCard}
              alt="Hours lost before a design team can present first options."
              fill
              sizes="(min-width: 1024px) 18rem, 60vw"
              className="object-cover"
              priority={false}
            />
          </div>
          <figcaption className="px-4 py-3 text-xs text-text-muted">
            Cocoon: Capture. Generate. Iterate. Validate. Cocoon speeds up early design with AI.
          </figcaption>
        </figure>
      </div>
    </motion.div>
  );
}
