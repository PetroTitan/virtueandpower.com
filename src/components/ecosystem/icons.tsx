/**
 * Inline, dependency-free SVG glyphs for the ecosystem banner.
 *
 * Every icon is decorative (`aria-hidden`) and every place one appears also
 * carries a visible or screen-reader text label, so no meaning is ever
 * conveyed by icon alone. Icons inherit `currentColor` so they follow the
 * marble palette rather than introducing colours of their own.
 */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 16, ...props }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true,
    focusable: false,
    ...props,
  } as SVGProps<SVGSVGElement>;
}

/** The ecosystem mark — four quiet squares, drawn as hairline outlines. */
export function EcosystemMarkIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3.5" y="3.5" width="7" height="7" stroke="currentColor" strokeWidth="1.5" />
      <rect x="13.5" y="3.5" width="7" height="7" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" stroke="currentColor" strokeWidth="1.5" />
      <rect x="13.5" y="13.5" width="7" height="7" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M4 12h15m0 0-5.5-5.5M19 12l-5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="m6 9.5 6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M6 6l12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Apple glyph — a platform indicator, always paired with a text label. */
export function AppleIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M16.4 12.9c0-2 1.6-3 1.7-3.1-.9-1.4-2.4-1.5-2.9-1.6-1.2-.1-2.4.7-3 .7-.6 0-1.6-.7-2.6-.7-1.3 0-2.6.8-3.3 2-1.4 2.5-.4 6.1 1 8.1.7 1 1.4 2.1 2.5 2 1-.04 1.3-.65 2.5-.65 1.2 0 1.5.65 2.5.63 1-.02 1.7-1 2.4-2 .5-.7.8-1.4 1-2.2-2.3-.9-2.3-3.5-1.3-3.5Z"
        fill="currentColor"
      />
      <path
        d="M14.6 6.9c.5-.7.9-1.6.8-2.5-.8 0-1.7.5-2.3 1.2-.5.6-.9 1.5-.8 2.4.9.05 1.7-.45 2.3-1.1Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Play-triangle glyph — always paired with a "Google Play" text label. */
export function GooglePlayIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        d="M4.6 3.2c-.3.2-.5.6-.5 1.1v15.4c0 .5.2.9.5 1.1l8.2-8.8L4.6 3.2Z"
        fill="currentColor"
      />
      <path
        d="m15.8 9.2-2.9-1.7-2.5 2.7 2.5 2.6 3-1.7c.8-.5.8-1.5-.1-1.9Z"
        fill="currentColor"
        opacity="0.7"
      />
      <path
        d="M5.1 3.05 12.9 7.5l1.9-2L6.4 2.55c-.5-.3-1-.2-1.3.5Z"
        fill="currentColor"
        opacity="0.5"
      />
      <path
        d="M12.9 12.9 5.1 17.35c.3.7.8.8 1.3.5l8.4-4.85-1.9-2.1Z"
        fill="currentColor"
        opacity="0.85"
      />
    </svg>
  );
}
