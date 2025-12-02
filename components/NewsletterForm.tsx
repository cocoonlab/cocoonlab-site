"use client";

import { useState } from "react";

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
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
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
      <div className="field flex-1">
        <label htmlFor="newsletter-email">Work email</label>
        <input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@studio.com"
        />
      </div>
      <button
        type="submit"
        className="btn-primary whitespace-nowrap"
        disabled={isLoading}
      >
        {isLoading ? "Subscribing…" : "Get updates"}
      </button>
      {message && (
        <p
          id="newsletter-message"
          className={`text-xs ${
            status === "error" ? "text-rose-400" : "text-accent-emerald"
          }`}
          aria-live="polite"
        >
          {message}
        </p>
      )}
    </form>
  );
}
