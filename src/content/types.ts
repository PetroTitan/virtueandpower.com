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

import type { EvidenceLevel } from "@/data/evidence";

export type ContentStatus = "stub" | "published";

export type ContentKind =
  | "philosopher"
  | "book"
  | "theme"
  | "quote"
  | "comparison"
  | "essay"
  | "guide"
  | "civilization"
  | "figure";

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
  /** Figures the work most closely concerns or is in dialogue with —
   *  parallel to the essay layer's primaryThinkers so the book graph
   *  surfaces backlinks to those figures and vice versa. */
  primaryThinkers?: ContentRef[];
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

/**
 * Civilization hubs — the structural editorial layer above figures,
 * books, themes and essays. Each civilization is a long-form
 * interpretive reading of how a particular polity / cultural order
 * understood power, law, memory, religion, war and continuity.
 *
 * The body MDX carries the editorial sections (## Introduction,
 * ## Core ideas, ## Political structure, ## Military structure,
 * ## Architectural identity, ## Decline and continuity); the
 * frontmatter carries the structured metadata that the route and
 * the graph use.
 */
export interface CivilizationFrontmatter extends BaseFrontmatter {
  kind: "civilization";
  /** Subtitle / standfirst rendered under the title. */
  subtitle: string;
  /** Period of the civilization in free-form text (e.g. "Republican
   *  Rome and the early Empire, c. 509 BCE – 235 CE"). */
  period: string;
  /** Civilization type — used as the page eyebrow and as a
   *  category in the /civilizations index (e.g. "Republic and
   *  Empire", "City-state federation", "Imperial monarchy"). */
  civilizationType: string;
  /** Slug of the archive image to use as the page hero. Resolved
   *  against src/data/archive-images.ts. */
  heroImage?: string;
  /** Additional archive-image slugs rendered as a small gallery
   *  composition on the page. */
  galleryImages?: string[];
  /** Typed cross-references — the typed editorial graph between
   *  the civilization hub and the figures / themes / books /
   *  essays it concerns. */
  relatedFigures?: ContentRef[];
  relatedThemes?: ContentRef[];
  relatedBooks?: ContentRef[];
  relatedEssays?: ContentRef[];
}

/**
 * Figures of the literary and mythological tradition.
 *
 * This kind exists so that Odysseus and Penelope are not filed alongside
 * Aristotle and Cicero. The /philosophers layer holds people the
 * historical record attests; this layer holds characters a tradition
 * preserves. Keeping them apart is the structural form of the editorial
 * rule that mythology is not presented as verified history — the schema
 * enforces it rather than leaving it to each page's prose.
 *
 * Two fields carry the discipline:
 *
 *   `historicity` records, on the shared evidence taxonomy, what can
 *   actually be said about whether the figure corresponds to anyone who
 *   lived. For nearly every figure in the Odyssey the honest answer is
 *   "literary" or "unknown", and the page must say so.
 *
 *   `attestedIn` names which ancient sources preserve which tradition.
 *   Traditions about these figures contradict each other — Homer's
 *   Penelope and the later tradition that makes her the mother of Pan
 *   are not reconcilable, and should not be reconciled. Listing sources
 *   separately is what stops a page from silently merging them into one
 *   invented biography.
 */
export interface FigureFrontmatter extends BaseFrontmatter {
  kind: "figure";
  /** Standfirst rendered under the title. */
  subtitle?: string;
  /** How the tradition presents the figure. Mortal characters, divine
   *  powers and monstrous figures are read differently and are labelled
   *  differently. */
  figureType: "mortal" | "divine" | "monstrous" | "composite";
  /** The narrative tradition the figure belongs to (e.g. "Homeric epic;
   *  the Trojan cycle"). */
  cycle: string;
  /** What can be said about the figure's historicity, on the shared
   *  evidence taxonomy. Nearly always "literary" or "unknown". */
  historicity: EvidenceLevel;
  /** Which ancient sources preserve which tradition about this figure.
   *  Each entry names a work and what that work specifically carries. */
  attestedIn: Array<{ source: string; tradition: string }>;
  /** The texts the figure principally appears in. */
  primaryTexts?: ContentRef[];
  relatedFigures?: ContentRef[];
  relatedThemes?: ContentRef[];
}

export type AnyFrontmatter =
  | PhilosopherFrontmatter
  | BookFrontmatter
  | ThemeFrontmatter
  | QuoteFrontmatter
  | ComparisonFrontmatter
  | EssayFrontmatter
  | GuideFrontmatter
  | CivilizationFrontmatter
  | FigureFrontmatter;

export interface ContentEntry<F extends AnyFrontmatter = AnyFrontmatter> {
  kind: F["kind"];
  slug: string;
  frontmatter: F;
  body: string;
  filePath: string;
}
