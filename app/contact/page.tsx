"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutShell } from "@/components/layout/LayoutShell";
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
      <section className="section-pad">
        <div className="container-x grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div className="space-y-4">
            <p className="badge-pill text-[11px] uppercase tracking-wide text-text-muted">
              Contact
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Talk to the team behind Cocoon Lab.
            </h1>
            <p className="text-sm text-text-muted md:text-base">
              Whether you&apos;re exploring pilots, have questions about workflow fit,
              or just want to share feedback, we&apos;d love to hear from you.
            </p>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="btn-ghost inline-flex w-fit text-sm"
            >
              Email {siteConfig.contactEmail}
            </a>
          </div>
          <form
            onSubmit={handleSubmit}
            className="card-surface space-y-4 p-5 md:p-6"
            aria-busy={isLoading ? "true" : "false"}
          >
            <div className="field space-y-1">
              <label htmlFor="contact-email">Your email</label>
              <input
                id="contact-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-border-subtle bg-surface-sunken/70 px-3 py-2 text-sm text-text placeholder:text-text-muted/60 outline-none transition-[border-color,box-shadow,background-color] duration-150 hover:border-border focus:border-accent-blue/80 focus:shadow-[0_0_0_1px_rgba(129,140,248,0.65),0_0_0_1px_rgba(15,23,42,1)]"
              />
            </div>
            <div className="field space-y-1">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full rounded-xl border border-border-subtle bg-surface-sunken/70 px-3 py-2 text-sm text-text placeholder:text-text-muted/60 outline-none transition-[border-color,box-shadow,background-color] duration-150 hover:border-border focus:border-accent-blue/80 focus:shadow-[0_0_0_1px_rgba(129,140,248,0.65),0_0_0_1px_rgba(15,23,42,1)]"
              />
            </div>
            <button
              type="submit"
              className="btn-primary w-full justify-center text-sm disabled:cursor-not-allowed disabled:opacity-70"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send message"}
            </button>
            <AnimatePresence>
              {feedback && (
                <motion.p
                  key={status + feedback}
                  className={`text-xs ${
                    status === "error" ? "text-rose-400" : "text-accent-emerald"
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
      </section>
    </LayoutShell>
  );
}
