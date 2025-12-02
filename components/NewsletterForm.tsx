"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) {
      setStatus("error");
      setMessage("Please add your email.");
      return;
    }

    try {
      setStatus("loading");
      setMessage(null);

      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      if (!res.ok) {
        const data = (await res
          .json()
          .catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Something went wrong.");
      }

      setStatus("success");
      setMessage("Thanks — we'll share updates and pilot slots soon.");
      setEmail("");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setStatus("error");
      setMessage(errorMessage);
    }
  }

  const isLoading = status === "loading";

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-3 md:flex-row md:items-center"
      aria-busy={isLoading ? "true" : "false"}
    >
      <div className="field flex-1 space-y-1">
        <label htmlFor="newsletter-email">Work email</label>
        <input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@studio.com"
          className="w-full rounded-xl border border-border-subtle bg-surface-sunken/70 px-3 py-2 text-sm text-text placeholder:text-text-muted/60 outline-none transition-[border-color,box-shadow,background-color] duration-150 hover:border-border focus:border-accent-blue/80 focus:shadow-[0_0_0_1px_rgba(129,140,248,0.65),0_0_0_1px_rgba(15,23,42,1)]"
        />
      </div>
      <button
        type="submit"
        className="btn-primary whitespace-nowrap px-5 py-2.5 text-sm font-semibold tracking-wide disabled:cursor-not-allowed disabled:opacity-70"
        disabled={isLoading}
      >
        {isLoading ? "Subscribing…" : "Get updates"}
      </button>

      <AnimatePresence>
        {message && (
          <motion.p
            key={status + message}
            id="newsletter-message"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.22, ease: [0.22, 0.61, 0.36, 1] }}
            className={`text-xs ${
              status === "error" ? "text-rose-400" : "text-accent-emerald"
            }`}
            aria-live="polite"
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
