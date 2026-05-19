/**
 * Bust registry.
 *
 * Typed metadata for every museum-grade marble bust photograph vendored
 * under /public/images/busts. Read by src/components/site/BustImage.tsx
 * and exposed to the editorial system so essays / guides can later
 * reference a bust inline by slug.
 *
 * The registry is the single point at which a bust enters the corpus —
 * adding a new file to /public/images/busts is not enough. Each entry
 * carries the figure named, the historical era, the museum that holds
 * the original, the source link to the photograph, the photographer
 * where given, the licence, the image path under /public, the
 * intrinsic dimensions of the committed file, and a short editorial
 * note explaining why this image is in the catalog.
 *
 * The full provenance for each file is also recorded in
 * /public/images/busts/README.md.
 */

export type BustLicense =
  /** CC-Zero / public-domain dedication. No attribution required by the
   *  licence, but the editorial team attributes anyway. */
  | "cc-zero"
  /** Wikimedia / museum claim that the work is in the public domain by
   *  age (typically a faithful photograph of a long-out-of-copyright
   *  sculpture). */
  | "public-domain"
  /** Creative Commons Attribution. Attribution required per CC-BY. */
  | "cc-by"
  /** Creative Commons Attribution-ShareAlike. */
  | "cc-by-sa";

export type BustCulture = "greek" | "roman" | "persian";

export interface Bust {
  /** Stable kebab-case identifier. */
  slug: string;
  /** Human-readable subject (e.g. "Marcus Aurelius"). */
  figure: string;
  /** Cultural origin of the work portrayed. */
  culture: BustCulture;
  /** Period the work was originally made or copied (free-form text). */
  era: string;
  /** Museum or archive currently holding the original. */
  museum: string;
  /** URL to the Wikimedia Commons file page (or other source). */
  source: string;
  /** Licence under which we redistribute the local file. */
  license: BustLicense;
  /** Photographer credit where given. */
  photographer?: string;
  /** Local path under /public/ for use with next/image. */
  imagePath: string;
  /** Width of the locally-vendored file (the resized version we ship). */
  width: number;
  /** Height of the locally-vendored file. */
  height: number;
  /** Editorial alt text. Sentence form, ends with a period. */
  alt: string;
  /** Caption rendered under the image. Conventionally subject · period · medium. */
  caption: string;
  /** Short attribution tail rendered alongside the caption. */
  attribution: string;
  /** Slug of the philosopher/figure entry this bust depicts, when
   *  there is one. Lets essays cross-reference into the content graph. */
  figureSlug?: string;
  /** Editorial note: why this image is in the catalog, what to use it
   *  for, anything notable about the work or the photograph. */
  notes?: string;
}

export const busts: ReadonlyArray<Bust> = [
  {
    slug: "marcus-aurelius-heraklion",
    figure: "Marcus Aurelius",
    culture: "roman",
    era: "2nd century CE",
    museum: "Archaeological Museum of Heraklion, Crete",
    source:
      "https://commons.wikimedia.org/wiki/File:Head_Marcus_Aurelius_archmus_Heraklion.jpg",
    license: "cc-zero",
    photographer: "Jebulon",
    imagePath: "/images/busts/marcus-aurelius-heraklion.webp",
    width: 1600,
    height: 2459,
    alt: "Marble head of the Emperor Marcus Aurelius, 2nd century, Archaeological Museum of Heraklion.",
    caption: "Marcus Aurelius · 2nd century · Marble",
    attribution: "Archaeological Museum of Heraklion · Wikimedia Commons (CC0)",
    notes:
      "Vendored as the default hero anchor. Used by src/components/site/BustImage.tsx; see /public/images/busts/README.md for processing details.",
  },
];

/** Look up a bust by slug. */
export function getBust(slug: string): Bust | undefined {
  return busts.find((b) => b.slug === slug);
}

/** The bust to use when none is requested explicitly. */
export const DEFAULT_BUST_SLUG = "marcus-aurelius-heraklion";
