"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { Section } from "@/components/Section";
import workflowDiagram from "@/public/images/three-step-workflow-diagram.png";

type Step = {
  title: string;
  body: string;
};

const steps: Step[] = [
  {
    title: "Capture",
    body: "Pull briefs, zoning, and notes into a single structured brief."
  },
  {
    title: "Explore",
    body: "Test massing and program options with constraints visible from day one."
  },
  {
    title: "Validate",
    body: "Confirm compliance, compare trade-offs, and align the team before reviews."
  }
];

export function HowItWorks() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section
      id="workflow"
      eyebrow="02 / Workflow"
      title="Capture → Explore → Validate."
      kicker="Three steps tuned for feasibility, competitions, and early client work."
      variant="subtle"
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
        <ol className="space-y-4">
          {steps.map((step, index) => (
            <motion.li
              key={step.title}
              initial={
                prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.48,
                ease: [0.22, 0.61, 0.36, 1],
                delay: prefersReducedMotion ? 0 : index * 0.08
              }}
              className="flex gap-4 border-b border-divider pb-4 last:border-b-0"
            >
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
                  {index + 1}
                </p>
                <h3 className="text-base font-semibold text-ink md:text-lg">{step.title}</h3>
                <p className="text-sm text-text-muted md:text-[15px]">{step.body}</p>
              </div>
            </motion.li>
          ))}
        </ol>

        <motion.div
          className="relative mt-2 lg:mt-0"
          initial={
            prefersReducedMotion
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 24, scale: 0.96 }
          }
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          animate={prefersReducedMotion ? undefined : { y: [0, -4, 0] }}
          transition={
            prefersReducedMotion
              ? { duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }
              : {
                  duration: 0.55,
                  ease: [0.22, 0.61, 0.36, 1],
                  y: {
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }
                }
          }
        >
          <div className="overflow-hidden rounded-2xl border border-divider bg-surface-sunken">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={workflowDiagram}
                alt="Three-step workflow diagram showing capture, explore, and validate phases inside Cocoon."
                fill
                sizes="(min-width: 1024px) 26rem, 80vw"
                className="pointer-events-none select-none object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
