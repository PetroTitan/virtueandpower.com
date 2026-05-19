import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

/**
 * Marble redesign palette.
 *
 * The legacy class names — ivory / parchment / charcoal / bronze / stone /
 * rule — are kept on purpose so the component library doesn't need a sweep.
 * Their VALUES are remapped to a cool museum palette: pure white surfaces,
 * marble greys, ink-near-black type, and a single restrained imperial blue
 * accent. The previous warm bronze / parchment palette is gone.
 *
 *  ivory     → pure white surface (#FFFFFF) with two off-white panel tints
 *  parchment → marble panel surface (#F4F5F7 / #FAFAFB)
 *  charcoal  → ink type (#0F1419) with graphite mids
 *  bronze    → imperial / Roman blue accent (#1E3A5F)
 *  stone     → cool gray secondary text (#6B7280)
 *  rule      → hairline silver (#E5E7EB)
 */

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx,md,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary surfaces. ivory is now pure white; parchment is the marble
        // panel tint that runs under hero / ruled sections.
        ivory: {
          DEFAULT: "#FFFFFF",
          50: "#FFFFFF",
          100: "#FAFBFC",
          200: "#F4F5F7",
        },
        parchment: {
          DEFAULT: "#F4F5F7",
          50: "#FAFAFB",
          100: "#F4F5F7",
          200: "#E9EBEF",
        },
        // Type. charcoal slides cool: a near-black ink for headings and a
        // graphite mid for long-form body. No warmth.
        charcoal: {
          DEFAULT: "#0F1419",
          50: "#5C636D",
          100: "#3A3F47",
          200: "#21262D",
          300: "#0F1419",
          400: "#06080B",
        },
        // Accent. The old bronze keys flip to a restrained imperial blue —
        // saturated enough to read as a deliberate accent, dark enough to
        // never feel like a SaaS button. No bright / royal blues.
        bronze: {
          DEFAULT: "#1E3A5F",
          50: "#4A6892",
          100: "#33547D",
          200: "#1E3A5F",
          300: "#142A47",
          400: "#0B1B30",
        },
        // Secondary text + meta. Cool gray, neutral.
        stone: {
          DEFAULT: "#6B7280",
          50: "#9CA3AF",
          100: "#7D8593",
          200: "#6B7280",
          300: "#4B5563",
          400: "#374151",
        },
        // Hairline rule. Cool, very light.
        rule: "#E5E7EB",
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
      // Slightly more monumental display, a touch more letter-tightening,
      // tighter heading sizes to give the layout room to breathe.
      fontSize: {
        "display-1": [
          "clamp(2.75rem, 6.2vw, 5.25rem)",
          { lineHeight: "1.02", letterSpacing: "-0.025em" },
        ],
        "display-2": [
          "clamp(2.125rem, 4.4vw, 3.5rem)",
          { lineHeight: "1.08", letterSpacing: "-0.02em" },
        ],
        "heading-1": [
          "clamp(1.75rem, 2.8vw, 2.5rem)",
          { lineHeight: "1.15", letterSpacing: "-0.012em" },
        ],
        "heading-2": [
          "clamp(1.375rem, 2vw, 1.75rem)",
          { lineHeight: "1.2", letterSpacing: "-0.005em" },
        ],
        "eyebrow": [
          "0.72rem",
          { lineHeight: "1.3", letterSpacing: "0.22em" },
        ],
        "lede": ["1.25rem", { lineHeight: "1.65" }],
      },
      maxWidth: {
        prose: "66ch",
        editorial: "76rem",
      },
      letterSpacing: {
        eyebrow: "0.22em",
      },
      borderColor: {
        DEFAULT: "#E5E7EB",
      },
    },
  },
  plugins: [typography],
};

export default config;
