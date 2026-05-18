import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx,md,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: "#FAF7F1",
          50: "#FDFBF7",
          100: "#FAF7F1",
          200: "#F2EDE2",
        },
        parchment: {
          DEFAULT: "#F1E9D6",
          50: "#FAF4E5",
          100: "#F4ECD8",
          200: "#E8DCBE",
        },
        charcoal: {
          DEFAULT: "#1F1B16",
          50: "#5E5851",
          100: "#3A342D",
          200: "#2A2520",
          300: "#1F1B16",
          400: "#15110D",
        },
        bronze: {
          DEFAULT: "#8A6A3B",
          50: "#B89A6F",
          100: "#A18356",
          200: "#8A6A3B",
          300: "#6E5530",
          400: "#574127",
        },
        stone: {
          DEFAULT: "#7C766C",
          50: "#B8B3A9",
          100: "#A19C92",
          200: "#7C766C",
          300: "#5E5A52",
          400: "#403D37",
        },
        rule: "#D6CDB8",
      },
      fontFamily: {
        serif: [
          "var(--font-serif)",
          "ui-serif",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "serif",
        ],
        sans: [
          "var(--font-sans)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      fontSize: {
        "display-1": ["clamp(2.5rem, 5.5vw, 4.75rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-2": ["clamp(2rem, 4vw, 3.25rem)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
        "heading-1": ["clamp(1.75rem, 2.8vw, 2.5rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "heading-2": ["clamp(1.375rem, 2vw, 1.75rem)", { lineHeight: "1.2" }],
        "eyebrow": ["0.78rem", { lineHeight: "1.3", letterSpacing: "0.18em" }],
        "lede": ["1.2rem", { lineHeight: "1.7" }],
      },
      maxWidth: {
        prose: "68ch",
        editorial: "72rem",
      },
      letterSpacing: {
        eyebrow: "0.18em",
      },
      borderColor: {
        DEFAULT: "#D6CDB8",
      },
    },
  },
  plugins: [typography],
};

export default config;
