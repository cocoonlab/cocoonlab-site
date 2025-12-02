import Link from "next/link";
import { siteConfig } from "@/lib/config";

export function Footer() {
  return (
    <footer className="border-t border-border-subtle/60 bg-bg pb-10 pt-10">
      <div className="container-x flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm space-y-2 text-sm text-text-muted">
          <p className="font-medium text-text-soft">
            Cursor for architects and designers.
          </p>
          <p>Built by Cocoon Lab.</p>
          <p className="text-xs text-text-muted/70">
            © {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 text-sm text-text-muted md:grid-cols-3">
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-text-soft">
              Product
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/#product" className="link-muted">
                  Features
                </a>
              </li>
              <li>
                <Link href="/pricing" className="link-muted">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/resources" className="link-muted">
                  Integrations
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-text-soft">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/changelog" className="link-muted">
                  Changelog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="link-muted">
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href="https://twitter.com/cocoonlab"
                  target="_blank"
                  rel="noreferrer"
                  className="link-muted"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-text-soft">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="link-muted">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="link-muted">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
