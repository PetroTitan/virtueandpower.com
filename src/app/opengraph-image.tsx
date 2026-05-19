import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

/**
 * Site-wide OpenGraph image. Used by social previews on any route that
 * doesn't define its own opengraph-image, and as the default referenced
 * by buildMetadata() in src/lib/seo.ts.
 *
 * Marble redesign palette: pure white surround with a very low-opacity
 * marble wash, ink wordmark, imperial-blue ampersand, hairline silver
 * rules. No gradients beyond the subtle marble texture, no photographs,
 * no logos beyond the monogram.
 */

export const runtime = "edge";
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 96,
          background: "#FFFFFF",
          color: "#0F1419",
          fontFamily: "serif",
          // A very subtle marble wash so the card doesn't read as flat
          // white at small sizes. Two soft radial tints — one cool gray,
          // one barely-imperial-blue — at very low opacity.
          backgroundImage:
            "radial-gradient(ellipse at 25% 15%, rgba(15, 20, 25, 0.04), transparent 55%), radial-gradient(ellipse at 85% 85%, rgba(30, 58, 95, 0.05), transparent 55%)",
        }}
      >
        {/* Top: small editorial eyebrow */}
        <div
          style={{
            display: "flex",
            fontFamily: "sans-serif",
            fontSize: 22,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#6B7280",
          }}
        >
          An intellectual platform · Est. MMXXVI
        </div>

        {/* Middle: serif wordmark and tagline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 176,
              fontWeight: 500,
              lineHeight: 1,
              letterSpacing: "-0.025em",
              color: "#0F1419",
              display: "flex",
            }}
          >
            Virtue&nbsp;
            <span style={{ color: "#1E3A5F" }}>&amp;</span>
            &nbsp;Power
          </div>
          <div
            style={{
              marginTop: 32,
              fontSize: 38,
              fontStyle: "italic",
              color: "#3A3F47",
              maxWidth: 940,
              lineHeight: 1.25,
            }}
          >
            Classical wisdom for leadership, civilization and the modern world.
          </div>
        </div>

        {/* Bottom: domain + thin rule */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #E5E7EB",
            paddingTop: 24,
            fontFamily: "sans-serif",
            fontSize: 22,
            color: "#6B7280",
          }}
        >
          <div style={{ display: "flex" }}>virtueandpower.com</div>
          <div style={{ display: "flex" }}>
            Primary sources · precise citations
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
