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
    title: "Capture your site & constraints",
    body:
      "Feed Cocoon with notes, PDFs, emails, and zoning references. We turn them into a structured brief for the project."
  },
  {
    title: "Generate zoning-aware options",
    body:
      "Explore massing options and floorplate strategies that respect height, coverage, and parking constraints from day one."
  },
  {
    title: "Validate, align, and export",
    body:
      "Stress-test options, share the rationale with clients, and export clean packages into the tools you already use."
  }
];

export function HowItWorks() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section
      id="how-it-works"
      eyebrow="How it works"
      title="From messy inputs to aligned, defensible early-stage decisions."
      kicker="Three steps designed around how studios already run feasibility, competitions, and early client work."
      variant="subtle"
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center">
        <ol className="space-y-5">
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
              className="card-surface relative flex gap-4 p-5 sm:p-6"
            >
              <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-surface-sunken text-sm font-semibold text-text-soft">
                {index + 1}
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-white md:text-lg">
                  {step.title}
                </h3>
                <p className="text-sm text-text-muted md:text-[15px]">
                  {step.body}
                </p>
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
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  y: [0, -6, 0],
                }
          }
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
          <div className="card-surface relative overflow-hidden bg-gradient-to-b from-surface-raised/80 via-surface-raised/95 to-bg/80 shadow-inner-glow">
            <div className="pointer-events-none absolute -inset-16 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.45),_transparent_60%)]" />
            <div className="pointer-events-none absolute -inset-16 bg-[radial-gradient(circle_at_bottom,_rgba(16,185,129,0.3),_transparent_55%)]" />
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={workflowDiagram}
                alt="Three-step workflow diagram showing capture, generate, and validate phases inside Cocoon."
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
