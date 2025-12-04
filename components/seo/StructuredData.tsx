"use client";

import Script from "next/script";

import { siteConfig } from "@/lib/config";

const twitterUrl = `https://twitter.com/${siteConfig.twitterHandle.replace(/^@/, "")}`;
const baseUrl = siteConfig.url.replace(/\/$/, "");
const logoUrl = siteConfig.ogImage.startsWith("http")
  ? siteConfig.ogImage
  : `${baseUrl}${siteConfig.ogImage}`;

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  email: `mailto:${siteConfig.contactEmail}`,
  logo: logoUrl,
  sameAs: [twitterUrl]
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description
};

export function StructuredData() {
  return (
    <>
      <Script
        id="structured-data-organization"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Script
        id="structured-data-website"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
    </>
  );
}
