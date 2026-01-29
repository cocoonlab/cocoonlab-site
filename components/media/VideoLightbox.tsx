"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useMemo, useRef, useState, useId } from "react";

type VideoLightboxProps = {
  videoSrc: string;
  posterSrc?: string;
  triggerLabel: string;
  className?: string;
  fallbackHref?: string;
  fallbackLabel?: string;
};

export function VideoLightbox({
  videoSrc,
  posterSrc,
  triggerLabel,
  className,
  fallbackHref,
  fallbackLabel
}: VideoLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previousFocusRef = useRef<Element | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const dialogId = useId();

  const fallbackLink = fallbackHref ?? videoSrc;
  const fallbackLinkLabel = fallbackLabel ?? "Open demo in a new tab";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const focusableSelectors = useMemo(
    () =>
      [
        "a[href]",
        "area[href]",
        "button:not([disabled])",
        "textarea:not([disabled])",
        "input:not([type=hidden]):not([disabled])",
        "select:not([disabled])",
        "video",
        "[tabindex]:not([tabindex='-1'])"
      ].join(","),
    []
  );

  const trapFocus = useCallback(
    (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        focusableSelectors
      );

      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
    },
    [focusableSelectors]
  );

  const close = useCallback(() => {
    setIsOpen(false);
    if (previousFocusRef.current instanceof HTMLElement) {
      previousFocusRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
      trapFocus(event);
    };

    document.addEventListener("keydown", onKeyDown);

    const timeout = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 20);

    document.body.style.setProperty("overflow", "hidden");

    return () => {
      window.clearTimeout(timeout);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.removeProperty("overflow");
    };
  }, [close, isOpen, trapFocus]);

  if (!isMounted) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={
          className ??
          "inline-flex items-center justify-center gap-2 rounded-pill border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold text-ink transition-transform duration-200 hover:-translate-y-[3px] hover:border-white/25"
        }
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        {triggerLabel}
      </button>

      {createPortal(
        <AnimatePresence>
          {isOpen ? (
            <div
              aria-hidden={!isOpen}
              className="fixed inset-0 z-50"
              onClick={close}
            >
              <motion.div
                className="absolute inset-0 bg-black/60 backdrop-blur"
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
              />

              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby={dialogId}
                ref={dialogRef}
                className="relative mx-auto flex h-full max-h-[90vh] max-w-5xl items-center justify-center px-4"
                initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: [0.22, 0.61, 0.36, 1] }}
                onClick={(event) => event.stopPropagation()}
              >
                <div className="card-surface relative w-full overflow-hidden rounded-[26px] border border-divider bg-surface-raised shadow-[0_26px_80px_rgba(45,46,40,0.18)]">
                  <div className="flex items-start justify-between px-5 pb-3 pt-4">
                    <div className="text-sm font-semibold text-ink" id={dialogId}>
                      Watch the 35 second walkthrough
                    </div>
                    <button
                      ref={closeButtonRef}
                      type="button"
                      onClick={close}
                      className="rounded-full border border-divider bg-surface-sunken px-3 py-1 text-xs font-semibold text-ink transition hover:border-divider hover:bg-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                    >
                      Esc to close
                    </button>
                  </div>
                  <div className="relative border-t border-divider bg-black">
                    <video
                      controls
                      preload="metadata"
                      poster={posterSrc}
                      className="h-full w-full"
                    >
                      <source src={videoSrc} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div className="flex flex-col gap-2 border-t border-divider bg-surface-sunken px-5 py-4 text-sm text-text-muted sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-xs uppercase tracking-[0.2em] text-text-muted">Need a fallback?</span>
                    <a
                      href={fallbackLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-divider px-3 py-2 text-sm font-semibold text-ink transition hover:border-divider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                    >
                      {fallbackLinkLabel}
                      <span aria-hidden>↗</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          ) : null}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
