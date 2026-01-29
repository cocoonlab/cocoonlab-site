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
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "system-ui", "sans-serif"]
      },
      colors: {
        bg: {
          DEFAULT: "var(--bg)",
          alt: "#F1F1EA"
        },
        surface: {
          sunken: "#F1F1EB",
          raised: "#FCFCF7"
        },
        text: {
          DEFAULT: "var(--ink)",
          soft: "rgba(45,46,40,0.78)",
          muted: "var(--muted)"
        },
        ink: "var(--ink)",
        muted: "var(--muted)",
        accent: {
          DEFAULT: "var(--accent)",
          blue: "var(--accent)",
          purple: "var(--clay)",
          emerald: "var(--sage)"
        },
        sage: "var(--sage)",
        clay: "var(--clay)",
        border: {
          DEFAULT: "var(--border)",
          subtle: "var(--divider)"
        },
        divider: "var(--divider)"
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1rem",
        pill: "999px"
      },
      boxShadow: {
        soft: "0 12px 40px rgba(45,46,40,0.12)",
        "inner-glow":
          "0 0 0 1px rgba(45,46,40,0.08), 0 16px 40px rgba(45,46,40,0.08)"
      }
    }
  },
  plugins: []
};

export default config;
