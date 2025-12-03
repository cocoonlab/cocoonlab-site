"use client";

import { motion } from "framer-motion";

import { Section } from "@/components/Section";

const highlights = [
  {
    title: "Project brain",
    body: "Ingest briefs, zoning, and site intel into one structured surface—searchable and always current.",
    points: ["Sync PDFs, emails, and notes", "Link every what-if back to sources"]
  },
  {
    title: "Guided options",
    body: "Generate zoning-aware concepts with constraints upfront. Swap assumptions without restarting.",
    points: ["Live FAR and coverage checks", "Clear rationale for each envelope"]
  },
  {
    title: "Shared decisions",
    body: "Comment, pin decisions, and export without digging through threads.",
    points: ["Threads on briefs and options", "One-click packets for reviews"]
  }
];

export function WhatCocoonDoes() {
  return (
    <Section
      id="product"
      eyebrow="What Cocoon does"
      title="One workspace that keeps early design calm."
      kicker="Fewer clicks, fewer surprises. Guardrails stay visible while you explore."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {highlights.map((item) => (
          <motion.article
            key={item.title}
            className="card-surface space-y-3 p-5 sm:p-6"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <h3 className="text-base font-semibold text-white md:text-lg">{item.title}</h3>
            <p className="text-sm text-text-soft">{item.body}</p>
            <ul className="space-y-2 text-xs text-text-muted md:text-[13px]">
              {item.points.map((point) => (
                <li key={point} className="flex gap-2">
                  <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-accent-blue" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
