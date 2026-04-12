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
        sans: [
          "var(--font-body)",
          "var(--font-manrope)",
          "system-ui",
          "ui-sans-serif",
          "sans-serif"
        ],
        heading: [
          "var(--font-heading)",
          "var(--font-newsreader)",
          "system-ui",
          "sans-serif"
        ],
        editorial: [
          "var(--font-manrope)",
          "system-ui",
          "SF Pro Text",
          "ui-sans-serif",
          "sans-serif"
        ],
        display: ["var(--font-newsreader)", "Georgia", "serif"]
      },
      colors: {
        bg: {
          DEFAULT: "var(--bg)",
          alt: "#F1F1EA",
          strong: "#eeeee6"
        },
        alt: "#F1F1EA",
        surface: {
          DEFAULT: "#FCFCF7",
          sunken: "#F1F1EB",
          raised: "#FCFCF7"
        },
        text: {
          DEFAULT: "var(--ink)",
          soft: "rgba(45,46,40,0.78)",
          muted: "var(--muted)",
          secondary: "rgba(45,46,40,0.72)",
          subtle: "rgba(45,46,40,0.58)"
        },
        ink: "var(--ink)",
        muted: "var(--muted)",
        primary: "var(--ink)",
        accent: {
          DEFAULT: "var(--accent)",
          blue: "var(--accent)",
          purple: "var(--clay)",
          emerald: "var(--sage)",
          green: "var(--sage)"
        },
        sage: "var(--sage)",
        clay: "var(--clay)",
        border: {
          DEFAULT: "var(--border)",
          subtle: "var(--divider)"
        },
        divider: "var(--divider)",
        studio: {
          background: "#f9f9f7",
          ink: "#2d3432",
          muted: "#5a605e",
          primary: "#5a605c",
          "primary-dim": "#4e5450",
          secondary: "#536358",
          sand: "#6c5c4d",
          inset: "#ecefec",
          low: "#f2f4f2",
          lowest: "#ffffff",
          high: "#e5e9e6",
          ghost: "#dee4e0",
          line: "#adb3b0",
          success: "#3d7b62",
          caution: "#8a6a34"
        }
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1rem",
        pill: "999px"
      },
      boxShadow: {
        soft: "0 12px 40px rgba(45,46,40,0.12)",
        studio: "0 24px 72px rgba(45,52,50,0.08)",
        ambient: "0 40px 120px rgba(45,52,50,0.06)",
        "inner-glow":
          "0 0 0 1px rgba(45,46,40,0.08), 0 16px 40px rgba(45,46,40,0.08)"
      }
    }
  },
  plugins: []
};

export default config;
