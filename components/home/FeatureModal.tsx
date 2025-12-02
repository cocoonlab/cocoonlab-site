"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";

const focusableSelectors = [
  "a[href]",
  "area[href]",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "button:not([disabled])",
  "iframe",
  "object",
  "embed",
  "[tabindex]:not([tabindex='-1'])",
  "[contenteditable]"
].join(",");

type Metric = {
  value: string;
  label: string;
};

type FeatureModalProps = {
  isOpen: boolean;
  title: string;
  body: string[];
  quote: string;
  customerLogo: string;
  metrics: Metric[];
  heroIllustration: ReactNode;
  onClose: () => void;
};

export function FeatureModal({
  isOpen,
  title,
  body,
  quote,
  customerLogo,
  metrics,
  heroIllustration,
  onClose
}: FeatureModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState({ transform: "perspective(1400px) rotateX(0deg) rotateY(0deg) scale(1)" });

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusable = modalRef.current?.querySelectorAll<HTMLElement>(focusableSelectors);
    const firstFocusable = focusable?.[0];
    firstFocusable?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }

      if (event.key === "Tab" && focusable && focusable.length > 0) {
        const focusedElement = document.activeElement as HTMLElement | null;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey) {
          if (focusedElement === first || !modalRef.current?.contains(focusedElement)) {
            event.preventDefault();
            last.focus();
          }
        } else if (focusedElement === last || !modalRef.current?.contains(focusedElement)) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    setTiltStyle({
      transform: `perspective(1400px) rotateX(${y * -6}deg) rotateY(${x * 6}deg) scale(1.02)`
    });
  };

  const handlePointerLeave = () => {
    setTiltStyle({ transform: "perspective(1400px) rotateX(0deg) rotateY(0deg) scale(1)" });
  };

  if (!isOpen) return null;

  const paddedMetrics = useMemo(() => metrics.slice(0, 4), [metrics]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 px-4 py-8 sm:px-6 md:items-center md:py-12" role="dialog" aria-modal="true" aria-label={title}>
      <button aria-label="Close" className="fixed inset-0 h-full w-full cursor-pointer bg-transparent" onClick={onClose} />

      <div
        ref={modalRef}
        className="relative z-10 flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-surface-raised shadow-[0_40px_120px_rgba(0,0,0,0.55)] ring-1 ring-white/10"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close feature modal"
          className="absolute -right-3 -top-3 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white text-lg font-semibold text-bg shadow-[0_18px_45px_rgba(0,0,0,0.45)] ring-2 ring-white/70 transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-4 focus-visible:ring-offset-surface-raised"
        >
          ×
        </button>

        <div className="relative overflow-y-auto"> 
          <div className="flex flex-col gap-8 p-5 sm:p-8">
            <div
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-white/10 via-white/5 to-white/0 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              style={tiltStyle}
            >
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative aspect-[16/9] w-full overflow-hidden"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(129,140,248,0.32),transparent_45%),_radial-gradient(circle_at_80%_10%,rgba(45,212,191,0.32),transparent_40%),_radial-gradient(circle_at_50%_90%,rgba(148,163,184,0.22),transparent_45%)]" />
                <div className="absolute -inset-12 blur-3xl bg-[radial-gradient(circle_at_50%_30%,rgba(94,234,212,0.18),transparent_40%)]" />
                <div className="relative h-full w-full">{heroIllustration}</div>
              </motion.div>
            </div>

            <div className="space-y-4">
              <h3 className="text-3xl font-semibold tracking-tight text-white sm:text-[34px]">{title}</h3>
              <div className="space-y-3 text-base leading-relaxed text-text-muted sm:text-lg">
                {body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="space-y-5 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
              <p className="text-center text-lg italic text-text-soft sm:text-xl">“{quote}”</p>
              <div className="flex flex-col items-center gap-2">
                <span className="text-sm uppercase tracking-[0.22em] text-text-muted">{customerLogo}</span>
                <div className="grid w-full gap-4 sm:grid-cols-2">
                  {paddedMetrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-xl bg-surface-sunken/60 px-4 py-3 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                    >
                      <div className="text-3xl font-semibold text-white sm:text-4xl">{metric.value}</div>
                      <div className="mt-1 text-[13px] text-text-muted">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
