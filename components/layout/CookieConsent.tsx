"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { AnalyticsSnippet } from "@/lib/analytics";

const CONSENT_KEY = "cocoon-cookie-consent";

const getStoredConsent = () => {
  const storedConsent = window.localStorage.getItem(CONSENT_KEY);

  if (storedConsent === "accepted" || storedConsent === "declined") {
    return storedConsent;
  }

  const cookieValue = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${CONSENT_KEY}=`))
    ?.split("=")[1];

  if (cookieValue === "accepted" || cookieValue === "declined") {
    return cookieValue;
  }

  return null;
};

export function CookieConsent() {
  const [consent, setConsent] = useState<"accepted" | "declined" | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setConsent(getStoredConsent());

    setMounted(true);
  }, []);

  const handleConsent = (value: "accepted" | "declined") => {
    setConsent(value);
    window.localStorage.setItem(CONSENT_KEY, value);
    document.cookie = `${CONSENT_KEY}=${value};path=/;max-age=31536000`;
  };

  const showBanner = mounted && consent === null;

  return (
    <>
      {consent === "accepted" && <AnalyticsSnippet />}

      {showBanner && (
        <div className="fixed bottom-4 left-1/2 z-50 w-full max-w-3xl -translate-x-1/2 px-4">
          <div className="flex flex-col gap-4 rounded-2xl border border-border bg-bg-strong px-5 py-4 shadow-lg shadow-black/10 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2 text-sm leading-relaxed text-text-secondary">
              <p className="font-semibold text-text">Cookies & privacy</p>
              <p>
                We use cookies to understand site traffic and improve your experience.
                You can learn more in our {" "}
                <Link href="/privacy" className="underline decoration-primary underline-offset-4">
                  privacy policy
                </Link>
                .
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="rounded-full border border-border bg-bg px-4 py-2 text-sm font-medium text-text transition hover:border-text"
                onClick={() => handleConsent("declined")}
              >
                Decline
              </button>
              <button
                type="button"
                className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-bg transition hover:bg-primary/90"
                onClick={() => handleConsent("accepted")}
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
