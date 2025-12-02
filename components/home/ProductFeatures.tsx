"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { Section } from "@/components/Section";

import saasUiVisual from "@/public/images/saas-ui-visual.png";
import featureCards from "@/public/images/saas-feature-cards-design.png";
import knowledgeGraphCanvas from "@/public/images/architectural-knowledge-graph-canvas.png";
import zoningPanel from "@/public/images/zoning-ui-panel.png";

type Feature = {
  title: string;
  body: string;
  bullets: string[];
};

const features: Feature[] = [
  {
    title: "Capture the full brief",
    body: "Pull notes, PDFs, and site references into one structured workspace—no more scattered folders.",
    bullets: [
      "Import via voice, email forwarding, or PDF uploads",
      "Client intent mapped into a reusable knowledge graph"
    ]
  },
  {
    title: "Zoning-aware concepting",
    body: "Sketch options while Cocoon watches height, coverage, and parking in the background.",
    bullets: [
      "Live feedback on key zoning metrics as you explore",
      "Configurable assumptions for ambiguous regulations"
    ]
  },
  {
    title: "Shared decisions, not files",
    body: "Keep options, rationale, and approvals in one place for clients and internal teams.",
    bullets: [
      "Comment threads on briefs, options, and exports",
      "One-click packages for client reviews and crits"
    ]
  }
];

const featureVisualLabels = [
  "Knowledge graph canvas",
  "Zoning panel & options",
  "Timeline, revisions & exports"
];

export function ProductFeatures() {
  return (
    <Section
      id="product"
      eyebrow="Product"
      title="A workspace built around the way architects actually work."
      kicker="Cocoon wraps messy early inputs—brief, zoning, site intelligence—into one live surface that can generate options and explain trade-offs."
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
        {/* Feature list */}
        <div className="space-y-6">
          {features.map((feature, index) => (
            <article
              key={feature.title}
              className="card-surface relative overflow-hidden p-5 sm:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <h3 className="text-base font-semibold text-white md:text-lg">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-text-muted md:text-[15px]">
                    {feature.body}
                  </p>
                </div>
                <span className="badge-pill hidden bg-surface-sunken/80 text-[10px] tracking-[0.16em] text-text-muted/80 sm:inline-flex">
                  {featureVisualLabels[index]}
                </span>
              </div>

              <ul className="mt-3 space-y-2 text-xs text-text-muted md:text-[13px]">
                {feature.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2">
                    <span
                      aria-hidden="true"
                      className="mt-1 h-1.5 w-1.5 rounded-full bg-accent-blue"
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* Visual cluster */}
        <div className="relative mx-auto mt-2 max-w-md lg:mt-0 lg:max-w-none lg:pl-6">
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="card-surface relative overflow-hidden bg-gradient-to-b from-surface-raised/80 via-surface-raised/95 to-bg/80 shadow-inner-glow"
          >
            <div className="pointer-events-none absolute -inset-16 bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.55),_transparent_60%)]" />
            <div className="pointer-events-none absolute -inset-16 bg-[radial-gradient(circle_at_bottom,_rgba(45,212,191,0.45),_transparent_55%)]" />
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={saasUiVisual}
                alt="Main Cocoon interface with a project overview, brief, and zoning-aware options."
                fill
                sizes="(min-width: 1024px) 30rem, (min-width: 768px) 26rem, 100vw"
                className="pointer-events-none select-none object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
            className="card-surface absolute -left-4 bottom-4 hidden w-40 overflow-hidden shadow-inner-glow sm:block md:w-52 lg:-left-10 lg:bottom-10"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={knowledgeGraphCanvas}
                alt="Architectural knowledge graph canvas inside Cocoon, capturing the full brief as connected nodes."
                fill
                sizes="14rem"
                className="pointer-events-none select-none object-cover"
              />
            </div>
            <p className="px-3 pb-3 pt-2 text-[11px] text-text-muted">
              Capture the brief as a living knowledge graph.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.22 }}
            className="card-surface absolute -right-4 top-6 hidden w-40 overflow-hidden shadow-inner-glow sm:block md:w-52 lg:-right-10 lg:top-10"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={featureCards}
                alt="Cocoon feature cards showing AI-generated concepts and design directions."
                fill
                sizes="14rem"
                className="pointer-events-none select-none object-cover"
              />
            </div>
            <p className="px-3 pb-3 pt-2 text-[11px] text-text-muted">
              Highlight key options and next steps.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Zoning-aware options block */}
      <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-center">
        <div className="space-y-3">
          <p className="badge-pill">Zoning-aware options</p>
          <h3 className="text-base font-semibold text-white md:text-lg">
            Live constraints, explained in plain language.
          </h3>
          <p className="text-sm text-text-muted md:text-[15px]">
            Cocoon continuously checks height, coverage, parking, and setbacks as you explore options, so you see what&apos;s driving each envelope.
          </p>
          <dl className="mt-4 grid gap-3 text-xs text-text-muted sm:grid-cols-2">
            <div className="space-y-1">
              <dt className="font-medium text-text-soft">Height &amp; FAR</dt>
              <dd>Track allowable and proposed area for each scenario.</dd>
            </div>
            <div className="space-y-1">
              <dt className="font-medium text-text-soft">Coverage &amp; setbacks</dt>
              <dd>Visualise buildable footprint without losing context.</dd>
            </div>
            <div className="space-y-1">
              <dt className="font-medium text-text-soft">Parking &amp; loading</dt>
              <dd>Keep yield and access aligned with regulations.</dd>
            </div>
            <div className="space-y-1">
              <dt className="font-medium text-text-soft">Explainable assumptions</dt>
              <dd>See how ambiguous clauses were interpreted, and adjust them.</dd>
            </div>
          </dl>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="card-surface relative overflow-hidden bg-gradient-to-b from-surface-raised/80 via-surface-raised/95 to-bg/80 shadow-inner-glow"
        >
          <div className="relative h-64 sm:h-72 lg:h-80">
            <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-border-subtle/80 bg-surface-sunken/90 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-text-muted">
              <span>Zoning panel</span>
              <span className="rounded-full bg-accent-emerald/15 px-2 py-0.5 text-[10px] text-accent-emerald">
                Live checks
              </span>
            </div>
            <div className="absolute inset-x-0 top-8 bottom-0">
              <Image
                src={zoningPanel}
                alt="Cocoon zoning UI panel showing live constraints for height, coverage, parking, and setbacks."
                fill
                sizes="(min-width: 1024px) 24rem, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
