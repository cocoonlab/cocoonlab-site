import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-text"
      aria-label="Cocoon Lab home"
    >
      <Image
        src="/logos/cocoonlab-logo-transparent-background-no-text.png"
        alt="Cocoon Lab"
        width={132}
        height={32}
        priority
        className="h-8 w-auto drop-shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
      />
      <span className="text-sm font-semibold tracking-tight text-white">Cocoon Lab</span>
    </Link>
  );
}
