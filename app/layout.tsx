import type { Metadata } from "next";
import "./globals.css";
import { AnalyticsSnippet } from "@/lib/analytics";
import { siteConfig } from "@/lib/config";
import { RootLayoutClient } from "@/components/layout/RootLayoutClient";
import { StructuredData } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: {
    default: "Cocoon – AI workspace for architects and designers",
    template: "%s · Cocoon Lab"
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: siteConfig.url
  },
  keywords: [
    "AI workspace",
    "architectural design",
    "zoning analysis",
    "design collaboration",
    "Cocoon Lab"
  ],
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: "Cocoon – AI workspace for architects and designers",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Cocoon – AI workspace for architects and designers",
    description: siteConfig.description,
    creator: siteConfig.twitterHandle
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-bg">
      <body className="min-h-screen bg-bg text-text antialiased">
        <StructuredData />
        <RootLayoutClient>{children}</RootLayoutClient>
        <AnalyticsSnippet />
      </body>
    </html>
  );
}
