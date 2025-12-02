"use client";

import Script from "next/script";
import { siteConfig } from "./config";

export function AnalyticsSnippet() {
  const provider = siteConfig.analytics.provider;

  if (provider === "plausible") {
    return (
      <Script
        src="https://plausible.io/js/script.js"
        data-domain={siteConfig.analytics.plausibleDomain}
        strategy="lazyOnload"
      />
    );
  }

  if (provider === "umami" && siteConfig.analytics.umamiWebsiteId) {
    return (
      <Script
        src={siteConfig.analytics.umamiSrc}
        data-website-id={siteConfig.analytics.umamiWebsiteId}
        strategy="lazyOnload"
      />
    );
  }

  return null;
}
