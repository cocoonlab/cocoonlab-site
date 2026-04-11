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
<<<<<<< HEAD
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "system-ui", "sans-serif"]
=======
        sans: ["system-ui", "SF Pro Text", "ui-sans-serif", "sans-serif"],
        editorial: [
          "var(--font-manrope)",
          "system-ui",
          "SF Pro Text",
          "ui-sans-serif",
          "sans-serif"
        ],
        display: ["var(--font-newsreader)", "Georgia", "serif"]
>>>>>>> 5ac96a1 (v2 of the page)
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
<<<<<<< HEAD
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
=======
          blue: "#4F46E5",
          purple: "#8B5CF6",
          emerald: "#10B981"
        },
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
>>>>>>> 5ac96a1 (v2 of the page)
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1rem",
        pill: "999px"
      },
      boxShadow: {
<<<<<<< HEAD
        soft: "0 12px 40px rgba(45,46,40,0.12)",
=======
        soft: "0 24px 80px rgba(0,0,0,0.65)",
        studio: "0 24px 72px rgba(45,52,50,0.08)",
        ambient: "0 40px 120px rgba(45,52,50,0.06)",
>>>>>>> 5ac96a1 (v2 of the page)
        "inner-glow":
          "0 0 0 1px rgba(45,46,40,0.08), 0 16px 40px rgba(45,46,40,0.08)"
      }
    }
  },
  plugins: []
};

export default config;
