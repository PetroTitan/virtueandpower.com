import { ImageResponse } from "next/og";

/**
 * Apple touch icon — same monogram at the iOS home-screen size, with a
 * little more breathing room and a subtle border to read cleanly on a
 * coloured wallpaper.
 */

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          fontSize: 96,
          fontWeight: 500,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          border: "8px solid #F1E9D6",
        }}
      >
        V<span style={{ color: "#8A6A3B", padding: "0 4px" }}>&amp;</span>P
      </div>
    ),
    { ...size },
  );
}
