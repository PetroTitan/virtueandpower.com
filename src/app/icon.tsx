import { ImageResponse } from "next/og";

/**
 * Site favicon — a serif "V&P" monogram in the platform's ivory /
 * bronze / charcoal palette. Next.js App Router serves this at /icon
 * and announces it in the document head automatically; no manual
 * <link rel="icon"> wiring required.
 */

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FAF7F1",
          color: "#1F1B16",
          fontFamily: "serif",
          fontSize: 20,
          fontWeight: 500,
          letterSpacing: "-0.04em",
          lineHeight: 1,
        }}
      >
        V<span style={{ color: "#8A6A3B", padding: "0 1px" }}>&amp;</span>P
      </div>
    ),
    { ...size },
  );
}
