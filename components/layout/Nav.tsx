"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "../Logo";
import { useState } from "react";
import { PrimaryCtaLink } from "@/components/PrimaryCtaLink";

const navItems = [
  { href: "/#product", label: "Product" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/resources", label: "Resources" },
  { href: "/changelog", label: "Changelog" }
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky inset-x-0 top-0 z-40 border-b border-border-subtle/60 bg-bg/80 backdrop-blur">
      <nav
        className="container-x flex h-14 items-center justify-between gap-4"
        aria-label="Primary"
      >
        <div className="flex items-center gap-6">
          <Logo />
          <div className="hidden items-center gap-4 text-xs font-medium text-text-muted md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-1 hover:text-text-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/80"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden text-xs font-medium text-text-muted hover:text-text-soft md:inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/80 rounded-full px-3 py-1"
          >
            Contact
          </Link>
          <Link href="/waitlist" className="btn-ghost text-xs">
            Join waitlist
          </Link>
          <Link href="/app" className="btn-primary text-xs">
            Start designing
          </Link>
          <button
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border-subtle text-xs text-text-muted hover:bg-surface-sunken/80 md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/80"
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
          >
            ☰
          </button>
        </div>
      </nav>
      {open && (
        <div className="border-t border-border-subtle bg-bg/95 py-3 md:hidden">
          <div className="container-x flex flex-col gap-1 text-sm text-text-muted">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-2 hover:bg-surface-sunken/80 hover:text-text-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/80"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="rounded-xl px-3 py-2 hover:bg-surface-sunken/80 hover:text-text-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/80"
              onClick={() => setOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
