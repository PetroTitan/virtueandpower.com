/**
 * Shared content frontmatter schemas. All content lives under /content as MDX
 * and is loaded at build time. Every entry must include a status of either
 * "stub" (a clearly-marked placeholder while research is in progress) or
 * "published" (reviewed, sourced, suitable for public discovery).
 *
 * Citation discipline: do not invent quotations or sources. When a quotation
 * appears, it must include a `workTitle` and `workCitation` (e.g. Stephanus
 * page, Bekker number, book/chapter/section) so future research can verify it.
 */

export type ContentStatus = "stub" | "published";

export type ContentKind =
  | "philosopher"
  | "book"
  | "theme"
  | "quote"
  | "comparison"
  | "essay"
  | "guide";

interface BaseFrontmatter {
  slug: string;
  title: string;
  description: string;
  status: ContentStatus;
  updated: string; // ISO date
  tags?: string[];
  related?: ContentRef[];
}

export interface ContentRef {
  kind: ContentKind;
  slug: string;
}

export interface PhilosopherFrontmatter extends BaseFrontmatter {
  kind: "philosopher";
  epithet?: string;
  era: string;
  lifespan?: string;
  tradition?: string;
  primaryWorks?: ContentRef[];
}

export interface BookFrontmatter extends BaseFrontmatter {
  kind: "book";
  author: string;
  authorSlug?: string;
  period: string;
  originalLanguage?: string;
  composedCirca?: string;
  recommendedTranslation?: string;
  primaryThemes?: ContentRef[];
}

export interface ThemeFrontmatter extends BaseFrontmatter {
  kind: "theme";
  domain: string;
  keyThinkers?: ContentRef[];
  keyTexts?: ContentRef[];
}

export interface QuoteFrontmatter extends BaseFrontmatter {
  kind: "quote";
  attribution: string;
  attributionSlug?: string;
  workTitle: string;
  workSlug?: string;
  workCitation: string; // e.g. "Republic 514a", "NE 1103a"
  language?: string;
  translator?: string;
}

export interface ComparisonFrontmatter extends BaseFrontmatter {
  kind: "comparison";
  subjects: ContentRef[];
  domain?: string;
}

/**
 * Editorial essays — interpretive long-form on the platform's themes.
 * Essays argue something; guides instruct. The two kinds share most of the
 * same shape but render slightly differently.
 */
export interface EssayFrontmatter extends BaseFrontmatter {
  kind: "essay";
  /** Optional standfirst that runs under the title. */
  subtitle?: string;
  /** Editorial area (e.g. "Moral philosophy", "Statecraft"). */
  domain?: string;
  /** Optional manual reading-time override (in minutes). The renderer
   *  estimates from the body when this is absent. */
  readingTime?: number;
  /** The thinkers, books and themes most central to the essay's argument. */
  primaryThinkers?: ContentRef[];
  primaryBooks?: ContentRef[];
  primaryThemes?: ContentRef[];
}

/**
 * Reading and interpretive guides — orientation for a reader approaching
 * a particular thinker, work or area of study for the first time.
 */
export interface GuideFrontmatter extends BaseFrontmatter {
  kind: "guide";
  subtitle?: string;
  domain?: string;
  readingTime?: number;
  /** What the guide is a guide *to* — typically a thinker, a book, or an
   *  area of study. */
  mainSubject?: ContentRef;
  guideType?: "thinker" | "book" | "introduction";
}

export type AnyFrontmatter =
  | PhilosopherFrontmatter
  | BookFrontmatter
  | ThemeFrontmatter
  | QuoteFrontmatter
  | ComparisonFrontmatter
  | EssayFrontmatter
  | GuideFrontmatter;

export interface ContentEntry<F extends AnyFrontmatter = AnyFrontmatter> {
  kind: F["kind"];
  slug: string;
  frontmatter: F;
  body: string;
  filePath: string;
}
