"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type SectionVariant = "subtle" | "default" | "strong";

type Props = {
  id?: string;
  eyebrow?: string;
  title?: string;
  kicker?: string;
  className?: string;
  children: ReactNode;
  /**
   * Controls how “strong” the entrance animation feels.
   * - subtle (default): small offset, quick
   * - default: slightly more movement
   * - strong: larger offset / duration
   */
  variant?: SectionVariant;
};

const VARIANT_CONFIG: Record<SectionVariant, { y: number; duration: number }> = {
  subtle: { y: 24, duration: 0.45 },
  default: { y: 28, duration: 0.5 },
  strong: { y: 36, duration: 0.55 }
};

export function Section({
  id,
  eyebrow,
  title,
  kicker,
  className,
  children,
  variant = "subtle"
}: Props) {
  const hasHeader = eyebrow || title || kicker;
  const prefersReducedMotion = useReducedMotion();
  const { y, duration } = VARIANT_CONFIG[variant];

  const initial = prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y };
  const whileInView = { opacity: 1, y: 0 };

  return (
    <section
      id={id}
      className={["section-pad", className].filter(Boolean).join(" ")}
    >
      <div className="container-x">
        {hasHeader && (
          <header className="mb-10 max-w-3xl space-y-4 md:mb-12 md:space-y-5 lg:mb-14">
            {eyebrow && <p className="badge-pill">{eyebrow}</p>}
            {title && (
              <h2 className="text-balance text-2xl font-semibold tracking-tight text-ink md:text-3xl lg:text-4xl">
                {title}
              </h2>
            )}
            {kicker && (
              <p className="text-measure text-sm leading-relaxed text-text-muted md:text-base">
                {kicker}
              </p>
            )}
          </header>
        )}
        <motion.div
          initial={initial}
          whileInView={whileInView}
          transition={{
            duration,
            ease: [0.22, 0.61, 0.36, 1]
          }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
