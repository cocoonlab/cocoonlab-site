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

export function Section({ id, eyebrow, title, kicker, className, children }: Props) {
  return (
    <section id={id} className={`section-pad ${className ?? ""}`}>
      <div className="container-x space-y-8">
        {(eyebrow || title || kicker) && (
          <header className="max-w-2xl space-y-3">
            {eyebrow && (
              <p className="badge-pill text-[11px] uppercase tracking-wide text-text-muted">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-balance text-2xl font-semibold tracking-tight text-white md:text-3xl lg:text-4xl">
                {title}
              </h2>
            )}
            {kicker && (
              <p className="text-sm text-text-muted md:text-base">{kicker}</p>
            )}
          </header>
        )}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
