import { ImageResponse } from "next/og";

/**
 * Site favicon — a serif "V&P" monogram on pure white. Ink letterforms
 * with a single imperial-blue ampersand. Next.js App Router serves it
 * at /icon and announces it in the document head automatically; no
 * manual <link rel="icon"> wiring required.
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
          background: "#FFFFFF",
          color: "#0F1419",
          fontFamily: "serif",
          fontSize: 20,
          fontWeight: 500,
          letterSpacing: "-0.04em",
          lineHeight: 1,
        }}
      >
        V<span style={{ color: "#1E3A5F", padding: "0 1px" }}>&amp;</span>P
      </div>
    ),
    { ...size },
  );
}
