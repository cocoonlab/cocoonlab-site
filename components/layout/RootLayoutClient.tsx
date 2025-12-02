"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Props = {
  children: ReactNode;
};

export function RootLayoutClient({ children }: Props) {
  const pathname = usePathname() ?? "/";
  const prefersReducedMotion = useReducedMotion();

  const pageTransition = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 6 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 4 },
        transition: {
          duration: 0.28,
          ease: [0.22, 0.61, 0.36, 1]
        }
      };

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} {...pageTransition}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
