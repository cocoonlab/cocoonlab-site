"use client";

import { motion } from "framer-motion";

import { Section } from "@/components/Section";

const highlights = [
  {
    title: "Project brain",
    body: "Ingest briefs, zoning, and site intel into one structured surface—searchable and always current.",
    points: ["Sync PDFs, emails, and notes", "Link every what-if back to sources"],
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5 text-ink/70">
        <path
          d="M7 5.5h7.5a3 3 0 0 1 3 3V18a2 2 0 0 1-2 2H7.5a3 3 0 0 1-3-3V7.5a2 2 0 0 1 2-2Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path
          d="M9 8.5h6M9 12h6M9 15.5h4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    )
  },
  {
    title: "Guided options",
    body: "Generate zoning-aware concepts with constraints upfront. Swap assumptions without restarting.",
    points: ["Live FAR and coverage checks", "Clear rationale for each envelope"],
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5 text-ink/70">
        <path
          d="M4 17.5 10.5 6 20 17.5H4Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path
          d="M9 14h6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    )
  },
  {
    title: "Shared decisions",
    body: "Comment, pin decisions, and export without digging through threads.",
    points: ["Threads on briefs and options", "One-click packets for reviews"],
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5 text-ink/70">
        <path
          d="M6.5 7.5h11a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H11l-3.5 3v-3H6.5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    )
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
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-divider bg-surface-sunken">
                {item.icon}
              </span>
              <h3 className="text-base font-semibold text-ink md:text-lg">{item.title}</h3>
            </div>
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
