import type { Metadata } from "next";

import { ArchitecturalLandingPage } from "@/components/architectural/ArchitecturalLandingPage";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Cocoon – AI workspace for architects and designers",
  description:
    "Cocoon is an AI workspace for early-stage architectural design. Capture briefs, explore zoning-aware options, and align stakeholders faster.",
  openGraph: {
    title: "Cocoon – AI workspace for architects and designers",
    description:
      "Capture briefs, explore zoning-aware options, and align stakeholders faster with Cocoon Lab.",
    url: siteConfig.url,
    siteName: "Cocoon Lab",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630
      }
    ],
    type: "website"
  },
  metadataBase: new URL(siteConfig.url)
};

export default function HomePage() {
  return <ArchitecturalLandingPage />;
}
