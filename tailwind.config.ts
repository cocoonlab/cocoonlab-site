import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["system-ui", "SF Pro Text", "ui-sans-serif", "sans-serif"]
      },
      colors: {
        bg: {
          DEFAULT: "#050509",
          alt: "#050509",
          subtle: "#0B0C12"
        },
        accent: {
          blue: "#3B82F6",
          lime: "#A3E635",
          purple: "#A855F7"
        },
        border: {
          subtle: "#1C1D26",
          strong: "#3F414F"
        },
        text: {
          DEFAULT: "#F9FAFB",
          muted: "#A1A1AA",
          soft: "#D4D4D8"
        },
        surface: {
          DEFAULT: "#0B0C12",
          raised: "#10121A",
          sunken: "#02030A"
        }
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        pill: "999px"
      },
      boxShadow: {
        soft: "0 18px 45px rgba(0,0,0,0.45)",
        "inner-glow": "0 0 0 1px rgba(255,255,255,0.04), 0 24px 60px rgba(0,0,0,0.7)"
      }
    }
  },
  plugins: []
};

export default config;
