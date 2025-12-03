"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import projectHoursCard from "@/public/images/project-hours-infographic-card.png";
import revisionComparisonChart from "@/public/images/revision-comparison-chart.png";

type MetricsStripProps = {
  id?: string;
};

const metrics = [
  {
    label: "Hours lost to file wrangling",
    value: "45h",
    caption: "per 100 project hours"
  },
  {
    label: "Cycles before alignment",
    value: "↘ 63%",
    caption: "when briefs live in one place"
  },
  {
    label: "Time to first zoning-read option",
    value: "-70%",
    caption: "vs. manual references"
  }
] as const;

export function MetricsStrip({ id }: MetricsStripProps) {
  return (
    <section
      id={id}
      aria-label="Cocoon impact metrics"
      className="section-pad pt-4"
    >
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="card-surface relative overflow-hidden border-border-subtle/80 bg-surface-raised/80 px-4 py-5 shadow-inner-glow sm:px-6 lg:px-8"
        >
          {/* Gradient ribbons */}
          <div className="pointer-events-none absolute inset-x-[-20%] top-0 h-40 bg-gradient-to-r from-transparent via-accent-blue/40 to-transparent opacity-70" />
          <div className="pointer-events-none absolute inset-x-[-20%] bottom-0 h-40 bg-gradient-to-r from-transparent via-accent-emerald/35 to-transparent opacity-70" />

          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
            <div className="space-y-4">
              <p className="badge-pill">Cost of chaos</p>
              <h2 className="text-base font-semibold text-white md:text-lg">
                Juggling PDFs and emails is burning the project clock.
              </h2>
              <p className="max-w-xl text-sm text-text-soft md:text-[15px]">
                Teams spend more time reconciling references than shaping options. Cocoon pulls the brief, zoning, and updates
                into one place so decisions move with less friction.
              </p>

              <div className="grid gap-4 pt-1 text-sm sm:grid-cols-3">
                {metrics.map((m) => (
                  <div
                    key={m.label}
                    className="flex flex-col gap-1 border-t border-border-subtle/60 pt-3 first:border-none first:pt-0 sm:border-t-0 sm:border-l sm:pl-4 sm:first:border-none sm:first:pl-0"
                  >
                    <p className="text-[11px] text-text-muted/80">{m.caption}</p>
                    <p className="text-2xl font-semibold text-white">{m.value}</p>
                    <p className="text-xs text-text-muted">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual duo */}
            <div className="relative mt-2 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, y: 22, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="card-surface relative overflow-hidden shadow-inner-glow"
              >
                <div className="relative h-44 sm:h-48 lg:h-52">
                  <Image
                    src={projectHoursCard}
                    alt="Hours saved when admin and compliance live inside Cocoon."
                    fill
                    sizes="(min-width: 1024px) 18rem, 60vw"
                    className="object-cover"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, ease: "easeOut", delay: 0.12 }}
                className="card-surface absolute -bottom-6 -left-3 hidden w-40 overflow-hidden shadow-inner-glow sm:block md:w-48 lg:-bottom-8 lg:-left-6"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={revisionComparisonChart}
                    alt="Fewer revision loops when a shared brief stays current."
                    fill
                    sizes="12rem"
                    className="object-cover"
                  />
                </div>
                <p className="px-3 pb-3 pt-2 text-[11px] text-text-muted">
                  Fewer late-stage revisions from clearer early decisions.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
