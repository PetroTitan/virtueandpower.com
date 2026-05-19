/**
 * Stylised classical profile, hand-drawn in SVG.
 *
 * Renders a sculptural silhouette of a Roman / Greek bust in profile,
 * facing left. The silhouette is a single path filled in cool stone
 * gray; a second very-low-opacity path layered on top suggests marble
 * shading. There are no photographic textures and no portraits of
 * specific historical figures — the shape is editorial / sculptural,
 * the way a museum catalogue might use a profile silhouette next to a
 * title.
 *
 * Designed to sit on white. The thin imperial-blue baseline at the foot
 * is the "plinth" — the only place blue appears in the figure.
 *
 * Replaceable: this component is the natural integration point for a
 * licensed bust photograph later. Swap the SVG for an <Image /> with
 * an appropriate alt and the rest of the hero composition is unchanged.
 */

export function ClassicalProfile({
  className,
  ariaLabel = "A stylised classical profile",
}: {
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <svg
      role="img"
      aria-label={ariaLabel}
      viewBox="0 0 400 560"
      preserveAspectRatio="xMidYMax meet"
      className={className}
      style={{ maxWidth: "100%", height: "auto" }}
    >
      {/* Marble plinth backdrop — soft cool wash that anchors the figure. */}
      <defs>
        <linearGradient id="vp-marble-wash" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F4F5F7" />
          <stop offset="100%" stopColor="#E9EBEF" />
        </linearGradient>
        <linearGradient id="vp-figure-shade" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#9CA3AF" />
          <stop offset="55%" stopColor="#7D8593" />
          <stop offset="100%" stopColor="#5C636D" />
        </linearGradient>
      </defs>

      {/* Plinth area, very low contrast against page white. */}
      <rect x="32" y="40" width="336" height="480" fill="url(#vp-marble-wash)" />

      {/* Profile silhouette. The path traces the classical features —
          forehead, brow line, bridge, lips, chin, neck and a draped
          shoulder line — abstracted enough to read as sculpture rather
          than portraiture. Facing left. */}
      <path
        d="
          M 248 80
          C 282 86 304 116 308 156
          C 310 184 304 208 296 226
          C 290 240 285 250 280 260
          L 268 286
          C 260 304 252 318 246 326
          L 230 344
          C 226 350 226 358 232 362
          L 254 378
          C 264 384 268 394 264 404
          L 256 420
          C 252 428 254 436 262 442
          L 296 458
          C 322 470 348 484 364 506
          L 364 520
          L 36 520
          L 36 506
          C 56 484 92 466 130 452
          L 168 438
          C 184 432 192 420 192 404
          L 192 386
          C 192 372 198 360 208 350
          L 222 336
          C 230 328 230 318 224 312
          L 210 298
          C 200 288 194 274 196 258
          L 198 220
          C 196 196 196 168 204 142
          C 214 108 230 84 248 80
          Z
        "
        fill="url(#vp-figure-shade)"
      />

      {/* Subtle marble vein on the silhouette — a single soft slash
          across the chest area at very low opacity. Reads as light on
          stone rather than as a shape. */}
      <path
        d="M 120 470 L 280 430 L 290 444 L 130 482 Z"
        fill="#FAFBFC"
        opacity="0.35"
      />

      {/* Hairline plinth top. */}
      <line
        x1="32"
        y1="40"
        x2="368"
        y2="40"
        stroke="#E5E7EB"
        strokeWidth="1"
      />

      {/* Imperial-blue baseline — the only blue in the figure. Three
          times the weight of the hairline; sits flush with the plinth. */}
      <line
        x1="32"
        y1="520"
        x2="368"
        y2="520"
        stroke="#1E3A5F"
        strokeWidth="2"
      />
    </svg>
  );
}
