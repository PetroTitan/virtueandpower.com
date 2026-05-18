import Script from "next/script";

/**
 * WebmasterID analytics tracker — vendored inline.
 *
 * Mirrors the @webmasterid/sdk-next component API so we can swap to
 * `import { WebmasterID } from "@webmasterid/sdk-next"` with a one-line
 * change once the package is published to npm. This file lives in-repo
 * for now because the SDK is still a private workspace package.
 *
 * The component is a React Server Component that emits a single
 * <Script strategy="afterInteractive"> tag carrying the public site id
 * and the ingest endpoint as data attributes. The loaded tracker script
 * reads them at runtime. There is no client-side JavaScript on our side
 * beyond what next/script itself emits; nothing in this component runs
 * in a useEffect.
 *
 * Safety properties:
 *
 *   1. Stable `id="webmasterid-tracker"` — next/script de-duplicates by
 *      id, so accidentally rendering the component twice still injects
 *      the script only once.
 *   2. Strict siteId validation — render null when the id is malformed
 *      so a misconfiguration never reaches the live tracker.
 *   3. `NEXT_PUBLIC_WEBMASTERID_DISABLED=1` short-circuits at render
 *      time, no environment leaks to the network in dev or preview.
 *   4. Defer + afterInteractive strategy — never blocks first paint
 *      and never blocks user interaction.
 */

export interface WebmasterIDProps {
  /** The site's public WebmasterID, e.g. "wm_xxxxxxxxxxxxxxxx". */
  siteId: string;
  /** Override the tracker script URL. */
  src?: string;
  /** Override the ingest endpoint. */
  endpoint?: string;
  /** Script loading strategy. */
  strategy?: "afterInteractive" | "lazyOnload" | "beforeInteractive";
}

const DEFAULT_SRC = "https://webmasterid.com/tracker.iife.min.js";
const DEFAULT_ENDPOINT =
  "https://webmasterid-ingest-api.vercel.app/api/events";

// Public site ids are `wm_` + exactly 16 lowercase alphanumeric chars.
// Matches the validator in @webmasterid/shared so we stay consistent
// with the production format.
const SITE_ID_PATTERN = /^wm_[0-9a-z]{16}$/;

export function WebmasterID({
  siteId,
  src = DEFAULT_SRC,
  endpoint = DEFAULT_ENDPOINT,
  strategy = "afterInteractive",
}: WebmasterIDProps) {
  if (process.env.NEXT_PUBLIC_WEBMASTERID_DISABLED === "1") return null;
  if (!SITE_ID_PATTERN.test(siteId)) return null;

  return (
    <Script
      id="webmasterid-tracker"
      src={src}
      strategy={strategy}
      defer
      data-wmid={siteId}
      data-endpoint={endpoint}
    />
  );
}
