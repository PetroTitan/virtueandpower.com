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
  | "comparison";

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

export type AnyFrontmatter =
  | PhilosopherFrontmatter
  | BookFrontmatter
  | ThemeFrontmatter
  | QuoteFrontmatter
  | ComparisonFrontmatter;

export interface ContentEntry<F extends AnyFrontmatter = AnyFrontmatter> {
  kind: F["kind"];
  slug: string;
  frontmatter: F;
  body: string;
  filePath: string;
}
