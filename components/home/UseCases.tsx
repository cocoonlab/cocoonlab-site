"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { Section } from "@/components/Section";

import splitComparison from "@/public/images/split-screen-comparison-illustration.png";
import featureCards from "@/public/images/saas-feature-cards-design.png";

type UseCase = {
  title: string;
  body: string;
};

const useCases: UseCase[] = [
  {
    title: "Feasibility studies",
    body: "Quickly test yield under multiple zoning interpretations and share clear recommendations."
  },
  {
    title: "Competition entries",
    body: "Spend more time on the idea and less on wrangling site data and compliance checks."
  },
  {
    title: "Internal design reviews",
    body: "Anchor crits around a shared brief and rationale instead of hunting through decks and emails."
  },
  {
    title: "Client-facing concept workshops",
    body: "Co-create options live with clients while Cocoon watches constraints and captures decisions."
  }
];

export function UseCases() {
  return (
    <Section
      id="use-cases"
      eyebrow="Use cases"
      title="Built for early-stage decisions that carry real weight."
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-start">
        {/* Before / after story */}
        <motion.article
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="card-surface relative overflow-hidden p-5 sm:p-6"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.35),_transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(45,212,191,0.25),_transparent_55%)]" />
          <div className="relative space-y-4">
            <h3 className="text-base font-semibold text-white md:text-lg">
              Before vs. with Cocoon
            </h3>
            <p className="text-sm text-text-soft md:text-[15px]">
              Cocoon sits in front of your tools, not instead of them. Trade the maze of PDFs and spreadsheets for a single
              surface that understands the brief and zoning.
            </p>

            <div className="mt-3 grid gap-4 text-xs text-text-muted sm:grid-cols-2">
              <div className="space-y-1">
                <p className="badge-pill bg-surface-sunken/80 text-[10px] tracking-[0.16em]">
                  Before
                </p>
                <p>
                  Hours reconciling emails, PDFs, and spreadsheets to get a first pass at feasibility.
                </p>
              </div>
              <div className="space-y-1">
                <p className="badge-pill bg-accent-emerald/20 text-[10px] tracking-[0.16em] text-accent-emerald">
                  With Cocoon
                </p>
                <p>
                  A live workspace that answers &ldquo;what if&rdquo; questions in minutes with every assumption documented.
                </p>
              </div>
            </div>

            <div className="relative mt-5 overflow-hidden rounded-xl border border-border-subtle/70 bg-surface-sunken/60">
              <div className="absolute left-4 top-3 z-10 flex gap-2 text-[11px] font-medium uppercase tracking-[0.18em]">
                <span className="rounded-full bg-bg/80 px-2 py-0.5 text-text-muted">
                  Before
                </span>
                <span className="rounded-full bg-bg/80 px-2 py-0.5 text-text-muted">
                  With Cocoon
                </span>
              </div>
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={splitComparison}
                  alt="Split-screen comparison between a traditional fragmented workflow and Cocoon's unified AI workspace."
                  fill
                  sizes="(min-width: 1024px) 30rem, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </motion.article>

        {/* Specific use cases */}
        <div className="relative space-y-4">
          <div className="pointer-events-none absolute -right-4 -top-10 hidden h-24 w-40 overflow-hidden rounded-2xl border border-border-subtle/70 bg-surface-sunken/80 opacity-70 blur-[1px] sm:block">
            <Image
              src={featureCards}
              alt="Cocoon feature cards accenting different architectural workflows."
              fill
              sizes="12rem"
              className="object-cover"
            />
          </div>

          {useCases.map((u) => (
            <motion.article
              key={u.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="card-surface relative p-5 sm:p-6"
            >
              <h3 className="text-base font-semibold text-white">{u.title}</h3>
              <p className="mt-2 text-sm text-text-muted">{u.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </Section>
  );
}
