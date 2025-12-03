"use client";

import { motion } from "framer-motion";

import { Section } from "@/components/Section";

const outcomes = [
  { value: "63% faster", label: "from brief to aligned options" },
  { value: "2x fewer", label: "review cycles before city submission" },
  { value: "-18h", label: "weekly admin and reconciliation" }
];

export function OutcomesSection() {
  return (
    <Section
      id="outcomes"
      eyebrow="Outcomes"
      title="Proof that calm beats chaos."
      kicker="Studios report clearer approvals, fewer unpaid loops, and faster concept turnarounds."
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {outcomes.map((item) => (
          <motion.div
            key={item.value}
            className="card-surface space-y-2 p-5 sm:p-6"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <p className="text-2xl font-semibold text-white md:text-3xl">{item.value}</p>
            <p className="text-sm text-text-muted">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
