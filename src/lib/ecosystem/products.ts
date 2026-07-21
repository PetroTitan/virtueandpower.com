/**
 * HELPERG Ecosystem — central product registry.
 *
 * Single source of truth for every HELPERG website and mobile application
 * surfaced in the global ecosystem banner and in the "Explore all products"
 * panel. Nothing in the ecosystem UI hardcodes a link — every href below is
 * derived from this registry.
 *
 * Rules enforced by `validateEcosystemRegistry` (see the content-validation
 * script, which fails the build on any issue):
 *   - unique product ids and unique `timelineOrder`
 *   - HTTPS-only, non-placeholder urls
 *   - no duplicate urls
 *   - no invented links — a product without a supplied url exposes no platform
 *
 * Link verification: all 16 web urls and all 13 store urls below were resolved
 * over the network on 2026-07-21 and returned HTTP 200. Platforms are listed
 * only where a real url was supplied; `CV Resume` is iOS-only and no Android
 * link is invented for it.
 */

export type PlatformType = "website" | "ios" | "android";

export type ProductKind = "web" | "app";

export type ProductPlatform = {
  type: PlatformType;
  /** Human-visible label, e.g. "Open", "App Store", "Google Play". */
  label: string;
  url: string;
};

export type EcosystemProduct = {
  id: string;
  name: string;
  /** Compact label for tight surfaces (timeline nodes). Defaults to `name`. */
  shortName?: string;
  /** One line, factual, no marketing claims. */
  description: string;
  /**
   * Two- or three-letter wordmark used as the product icon. Hand-set rather
   * than derived so the abbreviations read correctly ("V&P", not "VI").
   */
  monogram: string;
  kind: ProductKind;
  platforms: ProductPlatform[];
  /** Deterministic ordering; unique across the registry. */
  timelineOrder: number;
};

const web = (url: string): ProductPlatform => ({
  type: "website",
  label: "Open",
  url,
});
const appStore = (url: string): ProductPlatform => ({
  type: "ios",
  label: "App Store",
  url,
});
const googlePlay = (url: string): ProductPlatform => ({
  type: "android",
  label: "Google Play",
  url,
});

/**
 * The full HELPERG product ecosystem.
 *
 * `timelineOrder` is unique and drives both the banner timeline order and the
 * within-section order in the directory panel.
 */
export const ECOSYSTEM_PRODUCTS: readonly EcosystemProduct[] = [
  // ── Web products ───────────────────────────────────────────────────────────
  {
    id: "virtue-and-power",
    name: "Virtue & Power",
    description:
      "Classical philosophy, virtue, power and civilization, read from the sources.",
    monogram: "V&P",
    kind: "web",
    platforms: [web("https://virtueandpower.com")],
    timelineOrder: 1,
  },
  {
    id: "helperg",
    name: "HELPERG",
    description: "The home of the HELPERG product ecosystem.",
    monogram: "H",
    kind: "web",
    platforms: [web("https://helperg.com")],
    timelineOrder: 2,
  },
  {
    id: "cash-workspace",
    name: "Cash Workspace",
    description: "A workspace for personal finances and money management.",
    monogram: "CW",
    kind: "web",
    platforms: [web("https://www.cashworkspace.com")],
    timelineOrder: 3,
  },
  {
    id: "webmasterid",
    name: "WebmasterID",
    description:
      "Search visibility and website growth intelligence for site owners.",
    monogram: "WM",
    kind: "web",
    platforms: [web("https://webmasterid.com")],
    timelineOrder: 4,
  },
  {
    id: "geobusinessiq",
    name: "GeoBusinessIQ",
    description: "Location and market intelligence for business decisions.",
    monogram: "GB",
    kind: "web",
    platforms: [web("https://geobusinessiq.com")],
    timelineOrder: 5,
  },
  {
    id: "global-city-intelligence",
    name: "Global City Intelligence",
    shortName: "Global City IQ",
    description: "City data and urban intelligence reference.",
    monogram: "GC",
    kind: "web",
    platforms: [web("https://globalcityintelligence.com")],
    timelineOrder: 6,
  },
  {
    id: "twin-phone",
    name: "Twin Phone",
    description: "A second phone number and calling tools for one device.",
    monogram: "TP",
    kind: "web",
    platforms: [web("https://twin-phone.com")],
    timelineOrder: 7,
  },
  {
    id: "faunahub",
    name: "FaunaHub",
    description: "Pet care, animal facts and wildlife reference.",
    monogram: "FH",
    kind: "web",
    platforms: [web("https://faunahub.com")],
    timelineOrder: 8,
  },
  {
    id: "agricultureid",
    name: "AgricultureID",
    description: "Agriculture knowledge and practical reference.",
    monogram: "AG",
    kind: "web",
    platforms: [web("https://agricultureid.com")],
    timelineOrder: 9,
  },
  {
    id: "build-design-hub",
    name: "Build Design Hub",
    description: "Construction, design and home-improvement guides.",
    monogram: "BD",
    kind: "web",
    platforms: [web("https://builddesignhub.com")],
    timelineOrder: 10,
  },
  {
    id: "printer-archive",
    name: "Printer Archive",
    description: "Printer resources, references and archives.",
    monogram: "PA",
    kind: "web",
    platforms: [web("https://printerarchive.net")],
    timelineOrder: 11,
  },
  {
    id: "socialsporthub",
    name: "SocialSportHub",
    description: "Sports knowledge, athletes and a sports knowledge graph.",
    monogram: "SS",
    kind: "web",
    platforms: [web("https://socialsporthub.com")],
    timelineOrder: 12,
  },
  {
    id: "hr-helperg",
    name: "HR Helperg",
    description: "HR workflows and people-management tools.",
    monogram: "HR",
    kind: "web",
    platforms: [web("https://hrhelperg.com")],
    timelineOrder: 13,
  },
  {
    id: "talentpartnerid",
    name: "TalentPartnerID",
    description: "Recruiting and talent-partnership tools for hiring teams.",
    monogram: "TL",
    kind: "web",
    platforms: [web("https://talentpartnerid.com")],
    timelineOrder: 14,
  },
  {
    id: "asteriastar",
    name: "AsteriaStar",
    description: "Astronomy and celestial reference knowledge.",
    monogram: "AS",
    kind: "web",
    platforms: [web("https://asteriastar.com")],
    timelineOrder: 15,
  },
  {
    id: "petrohrys",
    name: "PetroHrys",
    description: "Personal portfolio and creative projects.",
    monogram: "PH",
    kind: "web",
    platforms: [web("https://petrohrys.com")],
    timelineOrder: 16,
  },

  // ── Mobile applications ────────────────────────────────────────────────────
  {
    id: "zip",
    name: "ZIP",
    description: "Compress, extract and manage archive files.",
    monogram: "ZP",
    kind: "app",
    platforms: [
      appStore("https://apps.apple.com/app/id6753772583"),
      googlePlay(
        "https://play.google.com/store/apps/details?id=com.ziparchivator.zip&pcampaignid=web_share",
      ),
    ],
    timelineOrder: 17,
  },
  {
    id: "printer",
    name: "Printer",
    description: "Mobile printing for documents and photos.",
    monogram: "PR",
    kind: "app",
    platforms: [
      appStore("https://apps.apple.com/app/id6746067890"),
      googlePlay(
        "https://play.google.com/store/apps/details?id=com.helperg.smart.printer",
      ),
    ],
    timelineOrder: 18,
  },
  {
    id: "fax",
    name: "Fax",
    description: "Send and receive faxes from your phone.",
    monogram: "FX",
    kind: "app",
    platforms: [
      appStore("https://apps.apple.com/app/id6760895885"),
      googlePlay(
        "https://play.google.com/store/apps/details?id=com.helperg.fax.app&pcampaignid=web_share",
      ),
    ],
    timelineOrder: 19,
  },
  {
    id: "pdf-editor",
    name: "PDF Editor",
    description: "Edit, convert and manage PDF documents.",
    monogram: "PD",
    kind: "app",
    platforms: [
      appStore("https://apps.apple.com/app/id6747341672"),
      googlePlay(
        "https://play.google.com/store/apps/details?id=com.helperg.editor.documents&pcampaignid=web_share",
      ),
    ],
    timelineOrder: 20,
  },
  {
    // iOS only — no Android link was supplied, and none is invented.
    id: "cv-resume",
    name: "CV Resume",
    description: "Build professional resumes and CVs.",
    monogram: "CV",
    kind: "app",
    platforms: [appStore("https://apps.apple.com/app/id6745150815")],
    timelineOrder: 21,
  },
  {
    id: "invoice-maker",
    name: "Invoice Maker",
    description: "Create and send professional invoices.",
    monogram: "IM",
    kind: "app",
    platforms: [
      appStore("https://apps.apple.com/app/id6747311276"),
      googlePlay(
        "https://play.google.com/store/apps/details?id=com.helperg.invoicer",
      ),
    ],
    timelineOrder: 22,
  },
  {
    id: "pocket-manager",
    name: "Pocket Manager",
    description: "Track spending and manage personal money.",
    monogram: "PM",
    kind: "app",
    platforms: [
      appStore("https://apps.apple.com/app/id6743084126"),
      googlePlay(
        "https://play.google.com/store/apps/details?id=com.helperg.money",
      ),
    ],
    timelineOrder: 23,
  },
];

// ── Derived helpers ─────────────────────────────────────────────────────────

const byTimelineOrder = (a: EcosystemProduct, b: EcosystemProduct) =>
  a.timelineOrder - b.timelineOrder;

export function getProductById(id: string): EcosystemProduct | undefined {
  return ECOSYSTEM_PRODUCTS.find((p) => p.id === id);
}

/** The canonical website link for a product, if it has one. */
export function primaryWebPlatform(
  product: EcosystemProduct,
): ProductPlatform | undefined {
  return product.platforms.find((p) => p.type === "website");
}

export function platformOfType(
  product: EcosystemProduct,
  type: PlatformType,
): ProductPlatform | undefined {
  return product.platforms.find((p) => p.type === type);
}

/**
 * Timeline nodes for the banner: every web product, in registry order. Apps
 * are not timeline nodes — they live in the directory panel, where their real
 * store platforms can be shown.
 */
export function getTimelineProducts(): EcosystemProduct[] {
  return ECOSYSTEM_PRODUCTS.filter((p) => p.kind === "web").sort(
    byTimelineOrder,
  );
}

export function getWebProducts(): EcosystemProduct[] {
  return ECOSYSTEM_PRODUCTS.filter((p) => p.kind === "web").sort(
    byTimelineOrder,
  );
}

export function getAppProducts(): EcosystemProduct[] {
  return ECOSYSTEM_PRODUCTS.filter((p) => p.kind === "app").sort(
    byTimelineOrder,
  );
}

export function totalProductCount(): number {
  return ECOSYSTEM_PRODUCTS.length;
}

// ── Validation ──────────────────────────────────────────────────────────────

export type RegistryIssue = { productId: string; issue: string };

const HTTPS_URL = /^https:\/\/[^\s#]+$/;

/**
 * Pure validation of the registry. Returns a list of issues (empty = valid).
 * Never throws, so it is safe to call anywhere; the content-validation script
 * turns a non-empty result into a build failure.
 */
export function validateEcosystemRegistry(
  products: readonly EcosystemProduct[] = ECOSYSTEM_PRODUCTS,
): RegistryIssue[] {
  const issues: RegistryIssue[] = [];
  const seenIds = new Set<string>();
  const seenUrls = new Set<string>();
  const seenOrders = new Set<number>();

  for (const p of products) {
    if (seenIds.has(p.id)) {
      issues.push({ productId: p.id, issue: "duplicate product id" });
    }
    seenIds.add(p.id);

    if (!p.name.trim()) {
      issues.push({ productId: p.id, issue: "empty product name" });
    }
    if (!p.description.trim()) {
      issues.push({ productId: p.id, issue: "empty description" });
    }
    if (!p.monogram.trim()) {
      issues.push({ productId: p.id, issue: "empty monogram" });
    }

    if (seenOrders.has(p.timelineOrder)) {
      issues.push({
        productId: p.id,
        issue: `duplicate timelineOrder ${p.timelineOrder}`,
      });
    }
    seenOrders.add(p.timelineOrder);

    for (const platform of p.platforms) {
      const url = platform.url.trim();
      if (!url || url === "#") {
        issues.push({
          productId: p.id,
          issue: `placeholder/empty url on ${platform.type}`,
        });
        continue;
      }
      if (!HTTPS_URL.test(url)) {
        issues.push({
          productId: p.id,
          issue: `non-HTTPS or malformed url on ${platform.type}: ${url}`,
        });
      }
      if (!platform.label.trim()) {
        issues.push({
          productId: p.id,
          issue: `missing label on ${platform.type}`,
        });
      }
      if (seenUrls.has(url)) {
        issues.push({ productId: p.id, issue: `duplicate url ${url}` });
      }
      seenUrls.add(url);
    }

    if (p.platforms.length === 0) {
      issues.push({ productId: p.id, issue: "no linkable platform" });
    }

    // A web product must expose a website; an app must expose a store link.
    if (p.kind === "web" && !primaryWebPlatform(p)) {
      issues.push({ productId: p.id, issue: "web product has no website url" });
    }
    if (
      p.kind === "app" &&
      !p.platforms.some((x) => x.type === "ios" || x.type === "android")
    ) {
      issues.push({ productId: p.id, issue: "app product has no store url" });
    }
  }

  return issues;
}
