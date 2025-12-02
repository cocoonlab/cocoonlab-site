"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "../Logo";
import { PrimaryCtaLink } from "@/components/PrimaryCtaLink";

const navItems = [
  { href: "/#product", label: "Product" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/resources", label: "Resources" },
  { href: "/changelog", label: "Changelog" }
];

export function Nav() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);

  function closeMobile() {
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border-subtle/80 bg-bg/70 backdrop-blur-xl">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Logo />
          <nav className="hidden items-center gap-6 text-sm text-text-muted md:flex">
            {navItems.map((item) => {
              const isAnchor =
                item.href === "/#product" ||
                item.href === "/#how-it-works" ||
                item.href === "/#pricing";

              const isActive =
                !isAnchor && pathname.startsWith(item.href as string);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={\`group relative inline-flex items-center gap-1.5 px-1 py-1 transition-colors duration-150 \${isActive ? "text-text" : "text-text-muted hover:text-text"}\`}
                >
                  <span>{item.label}</span>
                  <span
                    className={\`absolute inset-x-1 bottom-0 h-px origin-center scale-x-0 bg-accent-blue/80 transition-transform duration-200 \${isActive ? "scale-x-100" : "group-hover:scale-x-100"}\`}
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="inline-flex items-center text-sm text-text-muted hover:text-text"
            >
              Contact
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden text-sm text-text-muted underline-offset-4 hover:text-text hover:underline md:inline-flex"
          >
            Contact
          </Link>
          <div className="hidden sm:block">
            <PrimaryCtaLink label="Get started" className="btn-primary" />
          </div>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border-subtle bg-surface-sunken/80 text-text md:hidden"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
          >
            <span className="sr-only">Toggle navigation</span>
            <div className="flex flex-col items-center justify-center gap-1.5">
              <span
                className={\`h-[1px] w-4 origin-center transition-transform duration-200 \${open ? "translate-y-[4px] rotate-45" : ""} bg-text\`}
              />
              <span
                className={\`h-[1px] w-4 transition-opacity duration-150 \${open ? "opacity-0" : "opacity-80"} bg-text\`}
              />
              <span
                className={\`h-[1px] w-4 origin-center transition-transform duration-200 \${open ? "-translate-y-[4px] -rotate-45" : ""} bg-text\`}
              />
            </div>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-b border-border-subtle bg-surface-sunken/95 backdrop-blur-xl md:hidden">
          <div className="container-x pb-4 pt-3">
            <nav className="space-y-1 text-sm">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between rounded-xl px-3 py-2 text-text-soft hover:bg-surface-raised/80 hover:text-text"
                  onClick={closeMobile}
                >
                  <span>{item.label}</span>
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-1 flex items-center justify-between rounded-xl px-3 py-2 text-text-soft hover:bg-surface-raised/80 hover:text-text"
                onClick={closeMobile}
              >
                <span>Contact</span>
              </Link>
              <div className="pt-3">
                <PrimaryCtaLink
                  label="Get started"
                  className="btn-primary w-full justify-center"
                />
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
