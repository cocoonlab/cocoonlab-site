import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-text"
      aria-label="Cocoon Lab home"
    >
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-xl bg-gradient-to-tr from-accent-blue to-accent-purple text-xs font-bold text-white shadow-soft">
        CL
      </span>
      <span>Cocoon Lab</span>
    </Link>
  );
}
