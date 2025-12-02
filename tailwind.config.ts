import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["system-ui", "SF Pro Text", "ui-sans-serif", "sans-serif"]
      },
      colors: {
        bg: {
          DEFAULT: "#050509",
          alt: "#080812"
        },
        surface: {
          sunken: "#050515",
          raised: "#0B0B1C"
        },
        text: {
          DEFAULT: "#F9FAFB",
          soft: "#E5E7EB",
          muted: "#9CA3AF"
        },
        border: {
          DEFAULT: "#27272F",
          subtle: "#111827"
        },
        accent: {
          blue: "#4F46E5",
          purple: "#8B5CF6",
          emerald: "#10B981"
        }
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        pill: "999px"
      },
      boxShadow: {
        soft: "0 24px 80px rgba(0,0,0,0.65)",
        "inner-glow":
          "0 0 0 1px rgba(148,163,184,0.35), 0 32px 120px rgba(0,0,0,0.9)"
      }
    }
  },
  plugins: []
};

export default config;
