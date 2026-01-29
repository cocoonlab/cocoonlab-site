"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutShell } from "@/components/layout/LayoutShell";
import { Section } from "@/components/Section";
import { siteConfig } from "@/lib/config";

export default function ContactPage() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload = { email: email.trim(), message: message.trim() };
    if (!payload.email || !payload.message) {
      setStatus("error");
      setFeedback("Please fill in both email and message.");
      return;
    }

    setStatus("loading");
    setFeedback("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      setFeedback("Thanks — we'll get back to you shortly.");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      setStatus("error");
      setFeedback(err.message ?? "Something went wrong.");
    }
  }

  const isLoading = status === "loading";

  return (
    <LayoutShell>
      <Section
        eyebrow="Contact"
        title="Talk to the team behind Cocoon Lab."
        kicker="Tell us about your studio, a project you&apos;re evaluating, or where you want help moving faster."
      >
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
          <div className="space-y-4">
            <p className="text-sm text-text-muted">
              Direct line:{" "}
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="font-semibold text-ink underline decoration-divider underline-offset-4 transition-colors hover:text-clay"
              >
                {siteConfig.contactEmail}
              </a>
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-divider/80 bg-surface-raised/70 p-5 shadow-[0_12px_40px_rgba(45,46,40,0.08)] md:p-6"
            aria-busy={isLoading ? "true" : "false"}
          >
            <div className="field space-y-2">
              <label
                htmlFor="contact-email"
                className="text-[11px] font-semibold uppercase tracking-[0.22em] text-text-muted"
              >
                Your email
              </label>
              <input
                id="contact-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-divider/80 bg-surface px-3 py-2 text-sm text-text placeholder:text-text-muted/60 outline-none transition-[border-color,box-shadow] duration-150 hover:border-divider focus:border-muted focus:ring-2 focus:ring-muted/40"
              />
            </div>
            <div className="field mt-4 space-y-2">
              <label
                htmlFor="contact-message"
                className="text-[11px] font-semibold uppercase tracking-[0.22em] text-text-muted"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full rounded-xl border border-divider/80 bg-surface px-3 py-2 text-sm text-text placeholder:text-text-muted/60 outline-none transition-[border-color,box-shadow] duration-150 hover:border-divider focus:border-muted focus:ring-2 focus:ring-muted/40"
              />
            </div>
            <button
              type="submit"
              className="btn-primary mt-5 w-full justify-center text-sm disabled:cursor-not-allowed disabled:opacity-70"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send message"}
            </button>
            <AnimatePresence>
              {feedback && (
                <motion.p
                  key={status + feedback}
                  className={`mt-3 text-xs ${
                    status === "error" ? "text-rose-400" : "text-clay"
                  }`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
                  aria-live="polite"
                >
                  {feedback}
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </div>
      </Section>
    </LayoutShell>
  );
}
