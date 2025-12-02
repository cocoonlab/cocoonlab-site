"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function WaitlistForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    email: "",
    firmName: "",
    location: "",
    teamSize: "",
    useCase: ""
  });

  function updateField(key: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Something went wrong.");
      }

      setStatus("success");
      setMessage("You're on the list. We'll reach out shortly.");
      setForm({
        email: "",
        firmName: "",
        location: "",
        teamSize: "",
        useCase: ""
      });
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message ?? "Something went wrong.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card-surface space-y-4 p-5 md:p-6"
      aria-describedby="waitlist-message"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="field md:col-span-2">
          <label htmlFor="waitlist-email">Work email</label>
          <input
            id="waitlist-email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="waitlist-firm">Firm name</label>
          <input
            id="waitlist-firm"
            type="text"
            value={form.firmName}
            onChange={(e) => updateField("firmName", e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="waitlist-location">Location</label>
          <input
            id="waitlist-location"
            type="text"
            placeholder="City, country/region"
            value={form.location}
            onChange={(e) => updateField("location", e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="waitlist-team-size">Team size</label>
          <select
            id="waitlist-team-size"
            value={form.teamSize}
            onChange={(e) => updateField("teamSize", e.target.value)}
          >
            <option value="">Select...</option>
            <option value="1-5">1–5</option>
            <option value="6-15">6–15</option>
            <option value="16-40">16–40</option>
            <option value="41+">41+</option>
          </select>
        </div>
        <div className="field md:col-span-2">
          <label htmlFor="waitlist-usecase">Primary use case</label>
          <textarea
            id="waitlist-usecase"
            rows={3}
            value={form.useCase}
            onChange={(e) => updateField("useCase", e.target.value)}
            placeholder="Tell us how you’d like to use Cocoon."
          />
        </div>
      </div>
      <button
        type="submit"
        className="btn-primary w-full justify-center text-sm"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Joining..." : "Request early access"}
      </button>
      {message && (
        <p
          id="waitlist-message"
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
