"use client";

import { Button } from "@/components/ui/Button";
type PrimaryCtaLinkProps = {
  label?: string;
  className?: string;
  ariaLabel?: string;
};

/**
 * Centralised primary CTA for the site-wide “Join the private beta” action.
 * Always routes to `/waitlist` to keep the primary path consistent.
 */
export function PrimaryCtaLink({
  label = "Join the private beta",
  className,
  ariaLabel
}: PrimaryCtaLinkProps) {
  const href = "/waitlist";

  return (
    <Button
      href={href}
      className={className ?? "btn-primary"}
      aria-label={ariaLabel ?? label}
    >
      {label}
    </Button>
  );
}
