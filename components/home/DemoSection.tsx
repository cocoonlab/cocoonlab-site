"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { Section } from "@/components/Section";

export function DemoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isPlaying) return;
    const video = videoRef.current;
    video?.play();
  }, [isPlaying]);

  return (
    <Section
      id="demo"
      eyebrow="Demo"
      title="See Cocoon keep pace with complex sites."
      kicker="Press play on your time. Slow connection? Grab the file below."
    >
      <motion.div
        className="card-surface overflow-hidden"
        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={
          prefersReducedMotion ? { duration: 0 } : { duration: 0.4, ease: "easeOut" }
        }
      >
        <div className="relative bg-surface-sunken">
          <video
            ref={videoRef}
            className="aspect-[16/9] w-full object-cover"
            controls={isPlaying}
            muted
            playsInline
            poster="/images/cocoon-cinematic.png"
            preload="metadata"
            aria-label="Cocoon workspace demo"
          >
            <source src="/demo.mp4" type="video/mp4" />
          </video>
          {!isPlaying && (
            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              className="group absolute inset-0 flex items-center justify-center bg-black/50 text-bg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              <div className="flex items-center gap-3 rounded-full bg-bg/90 px-4 py-2 text-sm font-semibold tracking-tight shadow-lg backdrop-blur">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ink text-bg transition-transform duration-200 group-hover:scale-105">
                  ▶
                </span>
                <span>Play demo</span>
              </div>
            </button>
          )}
        </div>
        <div className="flex flex-col gap-3 border-t border-border-subtle/80 px-4 py-4 text-sm text-text-soft sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="space-y-1">
            <p className="font-semibold text-ink">Prefer a download?</p>
            <p className="text-xs text-text-muted">If streaming is slow, open the MP4 directly.</p>
          </div>
          <a
            href="/demo.mp4"
            className="inline-flex items-center gap-2 rounded-full border border-divider px-4 py-2 text-sm font-medium text-ink transition hover:border-divider hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            download
          >
            Download demo
            <span aria-hidden>→</span>
          </a>
        </div>
      </motion.div>
    </Section>
  );
}
