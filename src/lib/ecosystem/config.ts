/**
 * HELPERG Ecosystem — per-site configuration.
 *
 * The "current product" is set here by configuration rather than by sniffing
 * the request hostname, so the banner renders identically in local dev,
 * preview and production — and stays compatible with a fully static export.
 */

/** Which registry product is the site currently being viewed. */
export const CURRENT_PRODUCT_ID = "virtue-and-power";

/** Banner + panel copy. Kept here so it never leaks into a page <h1>. */
export const ECOSYSTEM_COPY = {
  /** Left-hand identity line. */
  identity: "HELPERG Ecosystem",
  /** Left-hand subtitle. */
  tagline: "Connected products & apps",
  /** Sentence shown at the top of the directory panel. */
  panelIntro:
    "Web platforms and mobile applications built by HELPERG for work, business, knowledge and everyday productivity.",
  cta: "Explore all products",
  ctaShort: "All products",
  navLabel: "HELPERG Ecosystem",
} as const;

/** The HELPERG parent site, linked from the panel footer. */
export const HELPERG_HOME_URL = "https://helperg.com";

// ── Analytics (consent-safe, vendor-neutral) ────────────────────────────────

export type EcosystemAnalyticsEvent =
  | "ecosystem_panel_open"
  | "ecosystem_product_click";

type EcosystemAnalyticsProps = {
  sourceProduct?: string;
  targetProduct?: string;
  platform?: string;
  placement?: string;
  currentPath?: string;
};

/**
 * Emit an ecosystem analytics event without introducing a new analytics
 * vendor and without sending anything over the network by itself.
 *
 * It only (a) dispatches a DOM CustomEvent any already-consented listener can
 * subscribe to, and (b) pushes to `window.dataLayer` if one already exists.
 * With no consented sink present nothing is recorded, so this is safe to call
 * regardless of consent state.
 */
export function trackEcosystemEvent(
  event: EcosystemAnalyticsEvent,
  props: EcosystemAnalyticsProps = {},
): void {
  if (typeof window === "undefined") return;

  const detail = { event, ...props };

  try {
    window.dispatchEvent(new CustomEvent("helperg:ecosystem", { detail }));
  } catch {
    /* CustomEvent unsupported — ignore. */
  }

  const w = window as unknown as { dataLayer?: unknown[] };
  if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push(detail);
  }
}
