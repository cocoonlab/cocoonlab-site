"use client";

import { motion } from "framer-motion";

import { Section } from "@/components/Section";

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
    title: "Design reviews",
    body: "Anchor crits around a shared brief and rationale instead of hunting through decks and emails."
  },
  {
    title: "Client workshops",
    body: "Co-create options live with clients while Cocoon watches constraints and captures decisions."
  }
];

export function UseCases() {
  return (
    <Section
      id="use-cases"
      eyebrow="Use cases"
      title="Where teams run with Cocoon first."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {useCases.map((u) => (
          <motion.article
            key={u.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="card-surface space-y-2 p-5 sm:p-6"
          >
            <h3 className="text-base font-semibold text-ink">{u.title}</h3>
            <p className="text-sm text-text-muted">{u.body}</p>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
