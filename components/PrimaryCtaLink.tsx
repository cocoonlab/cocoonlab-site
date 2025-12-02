"use client";

import Link from "next/link";
import { useAuthUser } from "@/lib/auth";

type PrimaryCtaLinkProps = {
  label: string;
  className?: string;
  ariaLabel?: string;
};

/**
 * Centralised primary CTA that decides whether to route
 * to the Cocoon app or the waitlist based on auth state.
 *
 * - If `useAuthUser().user` is present → links to `/app`
 * - Otherwise → links to `/waitlist`
 *
 * Replace `useAuthUser` with your real auth implementation
 * (NextAuth, Clerk, custom JWT, etc.) and keep the return
 * shape `{ user, isLoading }` stable.
 */
export function PrimaryCtaLink({
  label,
  className,
  ariaLabel
}: PrimaryCtaLinkProps) {
  const { user, isLoading } = useAuthUser();
  const href = user ? "/app" : "/waitlist";

  return (
    <Link
      href={href}
      className={className ?? "btn-primary"}
      aria-label={ariaLabel ?? label}
      aria-busy={isLoading ? "true" : undefined}
    >
      {label}
    </Link>
  );
}
