"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

type Props = {
  id?: string;
  eyebrow?: string;
  title?: string;
  kicker?: string;
  className?: string;
  children: ReactNode;
};

export function Section({
  id,
  eyebrow,
  title,
  kicker,
  className,
  children
}: Props) {
  const hasHeader = eyebrow || title || kicker;

  return (
    <section id={id} className={["section-pad", className].filter(Boolean).join(" ")}>
      <div className="container-x">
        {hasHeader && (
          <header className="mb-10 max-w-3xl space-y-4">
            {eyebrow && <p className="badge-pill">{eyebrow}</p>}
            {title && (
              <h2 className="text-balance text-2xl font-semibold tracking-tight text-white md:text-3xl lg:text-4xl">
                {title}
              </h2>
            )}
            {kicker && (
              <p className="text-sm text-text-soft md:text-base">
                {kicker}
              </p>
            )}
          </header>
        )}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.25 }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
