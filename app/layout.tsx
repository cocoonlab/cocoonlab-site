import type { Metadata } from "next";
import { Manrope, Newsreader } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/config";
import { RootLayoutClient } from "@/components/layout/RootLayoutClient";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { StructuredData } from "@/components/seo/StructuredData";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap"
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  adjustFontFallback: false
});

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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any", rel: "icon" },
      { url: "/logos/cocoon-logo.ico", type: "image/x-icon", rel: "shortcut icon" },
      {
        url: "/logos/cocoonlab-logo-transparent-background-no-text.png",
        type: "image/png",
        rel: "apple-touch-icon"
      }
    ],
    apple: [{ url: "/logos/cocoonlab-logo-transparent-background-no-text.png" }]
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
<<<<<<< HEAD
    <html lang="en" className="bg-bg">
      <body className="min-h-screen bg-bg text-text antialiased font-sans">
=======
    <html lang="en" className={`${manrope.variable} ${newsreader.variable} bg-bg`}>
      <body className="min-h-screen bg-bg text-text antialiased">
>>>>>>> 5ac96a1 (v2 of the page)
        <StructuredData />
        <RootLayoutClient>{children}</RootLayoutClient>
        <CookieConsent />
      </body>
    </html>
  );
}
