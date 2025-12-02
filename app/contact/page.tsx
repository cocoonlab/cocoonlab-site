"use client";

import { LayoutShell } from "@/components/layout/LayoutShell";
import { useState } from "react";
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
    setStatus("loading");
    setFeedback("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message })
      });

      if (!res.ok) {
        throw new Error("Please fill in email and message.");
      }

      setStatus("success");
      setFeedback("Thanks — we'll get back to you shortly.");
    } catch (err: any) {
      setStatus("error");
      setFeedback(err.message ?? "Something went wrong.");
    }
  }

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
              Whether you&apos;re exploring pilots, have questions about
              workflow fit, or just want to share feedback, we&apos;d love to
              hear from you.
            </p>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="btn-primary inline-flex w-fit text-sm"
            >
              Email {siteConfig.contactEmail}
            </a>
          </div>
          <form
            onSubmit={handleSubmit}
            className="card-surface space-y-4 p-5 md:p-6"
          >
            <div className="field">
              <label htmlFor="contact-email">Your email</label>
              <input
                id="contact-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn-ghost w-full justify-center text-sm"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Sending..." : "Send message"}
            </button>
            {feedback && (
              <p
                className={`text-xs ${
                  status === "error" ? "text-rose-400" : "text-emerald-300"
                }`}
              >
                {feedback}
              </p>
            )}
          </form>
        </div>
      </section>
    </LayoutShell>
  );
}
