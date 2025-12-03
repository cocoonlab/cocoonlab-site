export type Env = "development" | "preview" | "production";

export const env =
  (process.env.NEXT_PUBLIC_VERCEL_ENV as Env | undefined) ??
  (process.env.NODE_ENV as Env | undefined) ??
  "development";

export const siteConfig = {
  name: "Cocoon Lab",
  shortName: "Cocoon",
  description:
    "Cocoon is an AI workspace for early-stage architectural design: capture briefs, generate zoning-aware options, and validate schemes in minutes.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3000",
  twitterHandle: "@cocoonlab",
  ogImage: "/og-cocoon.png",
  contactEmail: "rashid@cocoonlab.ai",
  analytics: {
    provider: process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER ?? "plausible",
    plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? "localhost",
    umamiWebsiteId: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID,
    umamiSrc:
      process.env.NEXT_PUBLIC_UMAMI_SRC ??
      "https://analytics.umami.is/script.js"
  }
} as const;

export const DEMO_FALLBACK_URL = "/demo.mp4";
