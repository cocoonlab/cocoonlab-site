"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) {
      setStatus("error");
      setMessage("Please add your email.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Something went wrong.");
      }

      setStatus("success");
      setMessage("Thanks — we'll be in touch soon.");
      setEmail("");
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message ?? "Something went wrong.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3" noValidate>
      <div className="field">
        <label htmlFor="newsletter-email">Join the newsletter</label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@studio.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={status === "error"}
          aria-describedby="newsletter-message"
        />
      </div>
      <button
        type="submit"
        className="btn-ghost text-xs"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Submitting..." : "Get product updates"}
      </button>
      {message && (
        <p
          id="newsletter-message"
          className={`text-xs ${
            status === "error" ? "text-rose-400" : "text-emerald-300"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
