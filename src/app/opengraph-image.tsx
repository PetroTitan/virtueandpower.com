import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

/**
 * Site-wide OpenGraph image. Used by social previews on any route that
 * doesn't define its own opengraph-image, and as the default referenced
 * by buildMetadata() in src/lib/seo.ts.
 *
 * Visual language matches the editorial palette: parchment background,
 * serif wordmark with bronze ampersand, restrained typographic
 * hierarchy. No gradients, no photographs, no logos beyond the
 * monogram.
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
          background: "#F1E9D6",
          color: "#1F1B16",
          fontFamily: "serif",
          backgroundImage:
            "linear-gradient(180deg, #F1E9D6 0%, #FAF7F1 60%, #F1E9D6 100%)",
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
            color: "#8A6A3B",
          }}
        >
          An intellectual platform · Est. MMXXVI
        </div>

        {/* Middle: serif wordmark and tagline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 168,
              fontWeight: 500,
              lineHeight: 1,
              letterSpacing: "-0.02em",
              color: "#1F1B16",
              display: "flex",
            }}
          >
            Virtue&nbsp;
            <span style={{ color: "#8A6A3B" }}>&amp;</span>
            &nbsp;Power
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 36,
              fontStyle: "italic",
              color: "#3A342D",
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
            borderTop: "1px solid #D6CDB8",
            paddingTop: 24,
            fontFamily: "sans-serif",
            fontSize: 22,
            color: "#5E5851",
          }}
        >
          <div style={{ display: "flex" }}>virtueandpower.com</div>
          <div style={{ display: "flex" }}>Primary sources · precise citations</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
