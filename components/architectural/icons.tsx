import type { SVGProps } from "react";
import type { StudioIconKey } from "./data";

type StudioIconProps = SVGProps<SVGSVGElement> & {
  name: StudioIconKey;
};

export function StudioIcon({ name, className, ...props }: StudioIconProps) {
  const shared = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className
  };

  switch (name) {
    case "map":
      return (
        <svg {...shared} {...props}>
          <path d="M3.5 6.5 9 4l6 2.5L20.5 4v13.5L15 20l-6-2.5L3.5 20Z" />
          <path d="M9 4v13.5M15 6.5V20" />
        </svg>
      );
    case "coins":
      return (
        <svg {...shared} {...props}>
          <ellipse cx="12" cy="6.5" rx="5.5" ry="2.5" />
          <path d="M6.5 6.5v4c0 1.4 2.46 2.5 5.5 2.5s5.5-1.1 5.5-2.5v-4" />
          <path d="M6.5 10.5v4c0 1.4 2.46 2.5 5.5 2.5s5.5-1.1 5.5-2.5v-4" />
        </svg>
      );
    case "leaf":
      return (
        <svg {...shared} {...props}>
          <path d="M19.5 4.5c-6 .3-9.4 2.05-11.55 4.2C5.6 11.05 5 13.53 5 16.5c0 .55.45 1 1 1 2.97 0 5.45-.6 7.8-2.95 2.15-2.15 3.9-5.55 4.2-11.55Z" />
          <path d="M8 16c.7-2.65 2.18-4.97 4.45-6.95" />
        </svg>
      );
    case "gavel":
      return (
        <svg {...shared} {...props}>
          <path d="m13 5 6 6" />
          <path d="m11 7 6 6" />
          <path d="m5 13 6 6" />
          <path d="m15 3 2 2-6 6-2-2Z" />
          <path d="m7 11 2 2-4 4-2-2Z" />
          <path d="M11 19h9" />
        </svg>
      );
    case "eye":
      return (
        <svg {...shared} {...props}>
          <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "document":
      return (
        <svg {...shared} {...props}>
          <path d="M8 3.5h5l4 4V20.5H8a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2Z" />
          <path d="M13 3.5v4h4" />
          <path d="M9.5 12h5M9.5 15.5h5M9.5 8.5h2.5" />
        </svg>
      );
    case "grid":
      return (
        <svg {...shared} {...props}>
          <rect x="4" y="4" width="7" height="7" />
          <rect x="13" y="4" width="7" height="7" />
          <rect x="4" y="13" width="7" height="7" />
          <rect x="13" y="13" width="7" height="7" />
        </svg>
      );
    case "spark":
      return (
        <svg {...shared} {...props}>
          <path d="m12 3 1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6Z" />
          <path d="m18.5 15.5.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8Z" />
          <path d="m5.5 14 .9 2.6L9 17.5l-2.6.9L5.5 21l-.9-2.6L2 17.5l2.6-.9Z" />
        </svg>
      );
    case "sun":
      return (
        <svg {...shared} {...props}>
          <circle cx="12" cy="12" r="3.5" />
          <path d="M12 2.5v3M12 18.5v3M21.5 12h-3M5.5 12h-3M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1M18.7 18.7l-2.1-2.1M7.4 7.4 5.3 5.3" />
        </svg>
      );
    case "stack":
      return (
        <svg {...shared} {...props}>
          <path d="m12 3 8 4.5-8 4.5-8-4.5Z" />
          <path d="m4 11.5 8 4.5 8-4.5" />
          <path d="m4 15.5 8 4.5 8-4.5" />
        </svg>
      );
    case "brief":
      return (
        <svg {...shared} {...props}>
          <rect x="3.5" y="7" width="17" height="12.5" rx="2" />
          <path d="M8.5 7V5.5A1.5 1.5 0 0 1 10 4h4a1.5 1.5 0 0 1 1.5 1.5V7" />
          <path d="M3.5 12h17" />
        </svg>
      );
    case "graph":
      return (
        <svg {...shared} {...props}>
          <path d="M4 19.5h16" />
          <path d="M7 15v-3.5M12 15V8M17 15V5.5" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...shared} {...props}>
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      );
    default:
      return null;
  }
}
