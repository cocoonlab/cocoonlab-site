import type { MetadataRoute } from "next";

import { caseStudySlugs } from "@/app/customers/[slug]/page";
import { siteConfig } from "@/lib/config";

const staticRoutes = [
  "/",
  "/app",
  "/contact",
  "/pricing",
  "/resources",
  "/terms",
  "/privacy",
  "/changelog",
  "/waitlist"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url.replace(/\/$/, "");
  const lastModified = new Date();

  const caseStudyRoutes = caseStudySlugs.map((slug) => `/customers/${slug}`);
  const routes = [...staticRoutes, ...caseStudyRoutes];

  return routes.map((route) => ({
    url: `${baseUrl}${route === "/" ? "/" : route}`,
    lastModified
  }));
}
