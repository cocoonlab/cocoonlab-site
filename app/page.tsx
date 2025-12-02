import type { Metadata } from "next";
import { LayoutShell } from "@/components/layout/LayoutShell";
import { Hero } from "@/components/home/Hero";
import { MetricsStrip } from "@/components/home/MetricsStrip";
import { TrustedByBand } from "@/components/home/TrustedByBand";
import { MadeForSection } from "@/components/home/MadeForSection";
import { AiAssistSection } from "@/components/home/AiAssistSection";
import { ProductFeatures } from "@/components/home/ProductFeatures";
import { FoundationsSection } from "@/components/home/FoundationsSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { UseCases } from "@/components/home/UseCases";
import { Customers } from "@/components/home/Customers";
import { PricingTable } from "@/components/pricing/PricingTable";
import { ResourcesGrid } from "@/components/resources/ResourcesGrid";
import { NewsletterForm } from "@/components/NewsletterForm";
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
  return (
    <LayoutShell>
      <Hero />
      <AiAssistSection />
      <TrustedByBand />
      <MadeForSection />
      <MetricsStrip />
      <ProductFeatures />
      <FoundationsSection />
      <HowItWorks />
      <UseCases />
      <Customers />
      <PricingTable />
      <ResourcesGrid compact />
      <section className="section-pad pt-4">
        <div className="container-x grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-center">
          <div className="space-y-3 max-w-xl">
            <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
              Stay close to Cocoon as we build.
            </h2>
            <p className="text-sm leading-relaxed text-text-muted md:text-base">
              We share short notes on new capabilities, pilot learnings, and
              ideas for how AI can support better architectural decisions.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </LayoutShell>
  );
}
