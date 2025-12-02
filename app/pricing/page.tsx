import { LayoutShell } from "@/components/layout/LayoutShell";
import { PricingTable } from "@/components/pricing/PricingTable";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing – Cocoon Lab",
  description:
    "Cocoon Lab pricing for architectural studios and practices running feasibility studies and early-stage projects."
};

export default function PricingPage() {
  return (
    <LayoutShell>
      <PricingTable />
    </LayoutShell>
  );
}
