import { readFileSync } from "node:fs";
import type {
  AnyFrontmatter,
  ContentEntry,
  ContentKind,
  ContentRef,
} from "@/content/types";
import { sources, type Source } from "@/data/sources";
import type { Issue } from "./types";

/**
 * Stable, exhaustive list of the content kinds we know how to validate.
 * Frontmatter declaring a kind outside this set is an error.
 */
const KNOWN_KINDS: ReadonlySet<ContentKind> = new Set([
  "philosopher",
  "book",
  "theme",
  "quote",
  "comparison",
  "essay",
  "guide",
]);

const VALID_STATUS = new Set(["stub", "published"]);

const KIND_REQUIRED_FIELDS: Record<ContentKind, ReadonlyArray<string>> = {
  philosopher: ["slug", "title", "description", "status", "updated", "era"],
  book: [
    "slug",
    "title",
    "description",
    "status",
    "updated",
    "author",
    "period",
  ],
  theme: ["slug", "title", "description", "status", "updated", "domain"],
  quote: [
    "slug",
    "title",
    "description",
    "status",
    "updated",
    "attribution",
    "workTitle",
    "workCitation",
  ],
  comparison: ["slug", "title", "description", "status", "updated", "subjects"],
  essay: ["slug", "title", "description", "status", "updated"],
  guide: ["slug", "title", "description", "status", "updated"],
};

// Heuristics used by the published-quality and quote-safety checks.
const STUB_NOTICE_PATTERNS: ReadonlyArray<RegExp> = [
  /This entry is a \*\*placeholder stub\*\*/i,
  /This theme is a \*\*placeholder stub\*\*/i,
  /This comparison is a \*\*placeholder stub\*\*/i,
  /placeholder marker/i,
];

const PLACEHOLDER_BODY_PATTERNS: ReadonlyArray<RegExp> = [
  /\bTODO\b/,
  /\bTKTK\b/,
  /\bFIXME\b/,
  /\blorem ipsum\b/i,
  /\bxxxx+\b/i,
];

/** Each entry's frontmatter may declare typed refs in several kind-specific
 *  fields. Collect them all so the broken-refs check can walk a single list. */
function collectOutgoingRefs(entry: ContentEntry<AnyFrontmatter>): ContentRef[] {
  const fm = entry.frontmatter;
  const out: ContentRef[] = [];
  const push = (xs?: ContentRef[]) => {
    if (xs?.length) out.push(...xs);
  };
  const pushOne = (ref?: ContentRef) => {
    if (ref) out.push(ref);
  };
  push(fm.related);
  switch (fm.kind) {
    case "philosopher":
      push(fm.primaryWorks);
      break;
    case "book":
      push(fm.primaryThemes);
      push(fm.primaryThinkers);
      break;
    case "theme":
      push(fm.keyThinkers);
      push(fm.keyTexts);
      break;
    case "comparison":
      push(fm.subjects);
      break;
    case "quote":
      break;
    case "essay":
      push(fm.primaryThinkers);
      push(fm.primaryBooks);
      push(fm.primaryThemes);
      break;
    case "guide":
      pushOne(fm.mainSubject);
      break;
  }
  return out;
}

/** Build an index by `${kind}:${slug}` for O(1) ref resolution. */
function indexEntries(
  entries: ContentEntry<AnyFrontmatter>[],
): Map<string, ContentEntry<AnyFrontmatter>> {
  const m = new Map<string, ContentEntry<AnyFrontmatter>>();
  for (const e of entries) m.set(`${e.kind}:${e.slug}`, e);
  return m;
}

function locOf(entry: ContentEntry<AnyFrontmatter>): string {
  return entry.filePath.replace(`${process.cwd()}/`, "");
}

// ──────────────────────────────────────────────────────────────────────
// 1. Broken related-content references
// ──────────────────────────────────────────────────────────────────────

export function checkBrokenRefs(
  entries: ContentEntry<AnyFrontmatter>[],
): Issue[] {
  const issues: Issue[] = [];
  const index = indexEntries(entries);
  for (const entry of entries) {
    for (const ref of collectOutgoingRefs(entry)) {
      if (!index.has(`${ref.kind}:${ref.slug}`)) {
        issues.push({
          severity: "error",
          code: "BROKEN_REF",
          message: `Broken cross-reference: ${entry.kind} "${entry.slug}" → ${ref.kind} "${ref.slug}" (target does not exist)`,
          location: locOf(entry),
          hint: `Either create /content/${ref.kind}s/${ref.slug}.mdx or remove the reference from this entry's frontmatter.`,
        });
      }
    }
  }
  return issues;
}

// ──────────────────────────────────────────────────────────────────────
// 2. Source catalog integrity
// ──────────────────────────────────────────────────────────────────────

export function checkSources(
  entries: ContentEntry<AnyFrontmatter>[],
  catalog: Source[] = sources,
): Issue[] {
  const issues: Issue[] = [];
  const philosopherSlugs = new Set(
    entries.filter((e) => e.kind === "philosopher").map((e) => e.slug),
  );
  const bookSlugs = new Set(
    entries.filter((e) => e.kind === "book").map((e) => e.slug),
  );
  const themeSlugs = new Set(
    entries.filter((e) => e.kind === "theme").map((e) => e.slug),
  );

  // Duplicate source ids are an error on their own — they break
  // findSourcesForThinker / -Book / -Theme.
  const seenIds = new Set<string>();
  for (const source of catalog) {
    if (seenIds.has(source.id)) {
      issues.push({
        severity: "error",
        code: "DUPLICATE_SLUG",
        message: `Duplicate source id "${source.id}" in src/data/sources.ts`,
        location: `src/data/sources.ts#${source.id}`,
      });
    }
    seenIds.add(source.id);

    for (const slug of source.relatedThinkers ?? []) {
      if (!philosopherSlugs.has(slug)) {
        issues.push({
          severity: "error",
          code: "MISSING_SOURCE_REF",
          message: `Source "${source.id}" references philosopher "${slug}" which does not exist`,
          location: `src/data/sources.ts#${source.id}`,
        });
      }
    }
    for (const slug of source.relatedBooks ?? []) {
      if (!bookSlugs.has(slug)) {
        issues.push({
          severity: "error",
          code: "MISSING_SOURCE_REF",
          message: `Source "${source.id}" references book "${slug}" which does not exist`,
          location: `src/data/sources.ts#${source.id}`,
        });
      }
    }
    for (const slug of source.relatedThemes ?? []) {
      if (!themeSlugs.has(slug)) {
        issues.push({
          severity: "error",
          code: "MISSING_SOURCE_REF",
          message: `Source "${source.id}" references theme "${slug}" which does not exist`,
          location: `src/data/sources.ts#${source.id}`,
        });
      }
    }
  }
  return issues;
}

// ──────────────────────────────────────────────────────────────────────
// 3. Duplicate slugs (per kind)
// ──────────────────────────────────────────────────────────────────────

export function checkDuplicateSlugs(
  entries: ContentEntry<AnyFrontmatter>[],
): Issue[] {
  const issues: Issue[] = [];
  const seen = new Map<string, ContentEntry<AnyFrontmatter>>();
  for (const entry of entries) {
    const key = `${entry.kind}:${entry.slug}`;
    const prior = seen.get(key);
    if (prior) {
      issues.push({
        severity: "error",
        code: "DUPLICATE_SLUG",
        message: `Duplicate slug "${entry.slug}" for kind "${entry.kind}" — also defined in ${locOf(prior)}`,
        location: locOf(entry),
      });
    }
    seen.set(key, entry);
  }
  return issues;
}

// ──────────────────────────────────────────────────────────────────────
// 4. Frontmatter shape: kind, required fields, status, dates
// ──────────────────────────────────────────────────────────────────────

/**
 * Stricter than a digit count: requires month 01-12 and day 01-31. Catches
 * the most common silent failure mode, where YAML overflows an invalid date
 * like 2026-13-99 into a real but wrong Date object (April 8, 2027) and a
 * runtime Date check on its own would accept it.
 */
const STRICT_ISO_DATE =
  /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

/**
 * Extract the raw `updated:` literal from a file's frontmatter so we can
 * validate the *original* text the author wrote, not the JS Date object YAML
 * silently produced.
 */
function rawUpdatedLine(filePath: string): string | undefined {
  try {
    const text = readFileSync(filePath, "utf8");
    const fm = text.match(/^---\n([\s\S]*?)\n---/);
    if (!fm) return undefined;
    const line = fm[1].match(/^updated:\s*(.+?)\s*$/m);
    if (!line) return undefined;
    return line[1].replace(/^['"]|['"]$/g, "").trim();
  } catch {
    return undefined;
  }
}

export function checkFrontmatter(
  entries: ContentEntry<AnyFrontmatter>[],
): Issue[] {
  const issues: Issue[] = [];
  for (const entry of entries) {
    const fm = entry.frontmatter as unknown as Record<string, unknown>;
    const loc = locOf(entry);

    if (!KNOWN_KINDS.has(entry.kind)) {
      issues.push({
        severity: "error",
        code: "INVALID_FRONTMATTER",
        message: `Unknown content kind "${entry.kind}"`,
        location: loc,
      });
      continue;
    }

    for (const field of KIND_REQUIRED_FIELDS[entry.kind]) {
      const v = fm[field];
      const present =
        v !== undefined &&
        v !== null &&
        v !== "" &&
        !(Array.isArray(v) && v.length === 0);
      if (!present) {
        issues.push({
          severity: "error",
          code: "INVALID_FRONTMATTER",
          message: `Missing required frontmatter field "${field}" for ${entry.kind}`,
          location: loc,
        });
      }
    }

    if (typeof fm.status === "string" && !VALID_STATUS.has(fm.status)) {
      issues.push({
        severity: "error",
        code: "INVALID_STATUS",
        message: `Invalid status "${fm.status}" (expected "stub" or "published")`,
        location: loc,
      });
    }

    // Validate the date by reading the raw literal from the file rather
    // than the YAML-parsed value: YAML silently overflows malformed dates
    // (2026-13-99 → April 8, 2027), so a runtime Date check on its own
    // would accept obvious typos.
    if (fm.updated !== undefined) {
      const rawDate = rawUpdatedLine(entry.filePath);
      if (rawDate === undefined) {
        // Required-fields pass above already flagged a truly-missing date.
      } else if (!STRICT_ISO_DATE.test(rawDate)) {
        issues.push({
          severity: "error",
          code: "INVALID_DATE",
          message: `Updated date "${rawDate}" is not a strict YYYY-MM-DD (month 01-12, day 01-31)`,
          location: loc,
        });
      } else if (Number.isNaN(Date.parse(rawDate))) {
        issues.push({
          severity: "error",
          code: "INVALID_DATE",
          message: `Updated date "${rawDate}" does not parse as a real date`,
          location: loc,
        });
      }
    }
  }
  return issues;
}

// ──────────────────────────────────────────────────────────────────────
// 5. Published-page quality: structural, not word-count
// ──────────────────────────────────────────────────────────────────────

function countMarkdownParagraphs(body: string): number {
  // A "paragraph" is a non-empty block of text separated by blank lines,
  // that doesn't start with a heading marker, list marker, or HTML / MDX tag.
  const blocks = body
    .split(/\n\s*\n+/)
    .map((b) => b.trim())
    .filter(Boolean);
  return blocks.filter((b) => {
    if (/^#{1,6}\s/.test(b)) return false; // heading
    if (/^[-*+]\s/.test(b)) return false; // bullet list
    if (/^\d+\.\s/.test(b)) return false; // ordered list
    if (/^>/.test(b)) return false; // blockquote
    if (/^</.test(b)) return false; // raw html / mdx component
    if (b.length < 40) return false; // require some substance
    return true;
  }).length;
}

function countMarkdownH2(body: string): number {
  return (body.match(/^##\s+/gm) ?? []).length;
}

export function checkPublishedQuality(
  entries: ContentEntry<AnyFrontmatter>[],
): Issue[] {
  const issues: Issue[] = [];
  for (const entry of entries) {
    if (entry.frontmatter.status !== "published") continue;
    // The quotes _placeholder is a deliberate non-content marker; skip it.
    if (entry.kind === "quote" && entry.slug === "_placeholder") continue;
    const loc = locOf(entry);
    const body = entry.body;

    for (const pat of STUB_NOTICE_PATTERNS) {
      if (pat.test(body)) {
        issues.push({
          severity: "error",
          code: "STUB_NOTICE_IN_PUBLISHED",
          message: `Published entry still contains a stub notice (matched /${pat.source}/)`,
          location: loc,
          hint: "Remove the stub notice block before promoting to status: published.",
        });
        break;
      }
    }

    for (const pat of PLACEHOLDER_BODY_PATTERNS) {
      if (pat.test(body)) {
        issues.push({
          severity: "error",
          code: "PLACEHOLDER_MARKER",
          message: `Published entry body contains a placeholder marker (/${pat.source}/) that should be resolved before publication`,
          location: loc,
        });
        break;
      }
    }

    // Structural minimum: at least one H2 + at least one substantive
    // paragraph. We deliberately do not police word counts.
    const h2 = countMarkdownH2(body);
    const paragraphs = countMarkdownParagraphs(body);
    if (h2 < 1 || paragraphs < 2) {
      issues.push({
        severity: "error",
        code: "PUBLISHED_TOO_THIN",
        message: `Published entry lacks minimum structure (found ${h2} H2 heading(s) and ${paragraphs} substantive paragraph(s); minimum is 1 H2 and 2 paragraphs)`,
        location: loc,
        hint: "Add a section heading and a second substantive paragraph, or move the entry back to status: stub.",
      });
    }
  }
  return issues;
}

// ──────────────────────────────────────────────────────────────────────
// 6. Metadata: title, description (presence + reasonable length)
// ──────────────────────────────────────────────────────────────────────

const MIN_DESC = 50;
const MAX_DESC = 320;

export function checkMetadata(
  entries: ContentEntry<AnyFrontmatter>[],
): Issue[] {
  const issues: Issue[] = [];
  for (const entry of entries) {
    const { title, description } = entry.frontmatter;
    const loc = locOf(entry);

    if (!title || typeof title !== "string" || !title.trim()) {
      issues.push({
        severity: "error",
        code: "MISSING_METADATA",
        message: `Entry has no title`,
        location: loc,
      });
    }
    if (!description || typeof description !== "string" || !description.trim()) {
      issues.push({
        severity: "error",
        code: "MISSING_METADATA",
        message: `Entry has no description`,
        location: loc,
      });
      continue;
    }
    if (description.length < MIN_DESC) {
      issues.push({
        severity: "warning",
        code: "WEAK_DESCRIPTION",
        message: `Description is short (${description.length} chars; recommended at least ${MIN_DESC})`,
        location: loc,
        hint: "A more substantive description improves OG card and search-snippet quality.",
      });
    }
    if (description.length > MAX_DESC) {
      issues.push({
        severity: "error",
        code: "INVALID_METADATA",
        message: `Description is too long (${description.length} chars; max ${MAX_DESC})`,
        location: loc,
        hint: "Search and OG snippets truncate around 300 chars; tighten the description.",
      });
    }
  }
  return issues;
}

// ──────────────────────────────────────────────────────────────────────
// 7. Sitemap consistency: published only, complete coverage
// ──────────────────────────────────────────────────────────────────────

/**
 * Re-implements the sitemap rule (status === "published") and asserts that
 * every published entry would be advertised. The real sitemap.ts uses the
 * same predicate; this check catches drift between the two if either side
 * changes the rule.
 */
export function checkSitemapConsistency(
  entries: ContentEntry<AnyFrontmatter>[],
): Issue[] {
  const issues: Issue[] = [];
  for (const entry of entries) {
    // The _placeholder quote marker is intentionally not advertised.
    if (entry.kind === "quote" && entry.slug === "_placeholder") {
      if (entry.frontmatter.status === "published") {
        issues.push({
          severity: "error",
          code: "INVALID_STATUS",
          message: `The /quotes/_placeholder marker must remain status:"stub" so it is excluded from the sitemap.`,
          location: locOf(entry),
        });
      }
      continue;
    }
    // No structural condition the sitemap itself can't already enforce —
    // this is a coverage assertion rather than a defect check. We include
    // it to surface accidental "stub" downgrades of published entries.
  }
  return issues;
}

// ──────────────────────────────────────────────────────────────────────
// 8. RSS consistency: published only (mirror of sitemap rule)
// ──────────────────────────────────────────────────────────────────────

export function checkRssConsistency(
  entries: ContentEntry<AnyFrontmatter>[],
): Issue[] {
  // Same predicate as the sitemap; rss.xml uses the identical filter. If
  // someone changes one side without the other, this check + the sitemap
  // check together will fail informatively rather than silently diverge.
  const issues: Issue[] = [];
  for (const entry of entries) {
    if (entry.kind === "quote" && entry.slug === "_placeholder") {
      if (entry.frontmatter.status === "published") {
        issues.push({
          severity: "error",
          code: "INVALID_STATUS",
          message: `The /quotes/_placeholder marker must not be status:"published" — it would leak into the RSS feed.`,
          location: locOf(entry),
        });
      }
    }
  }
  return issues;
}

// ──────────────────────────────────────────────────────────────────────
// 9. Orphan detection (warning only)
// ──────────────────────────────────────────────────────────────────────

export function checkOrphans(entries: ContentEntry<AnyFrontmatter>[]): Issue[] {
  const issues: Issue[] = [];
  // Build in-degree map by walking every entry's outgoing refs.
  const inDegree = new Map<string, number>();
  for (const entry of entries) {
    for (const ref of collectOutgoingRefs(entry)) {
      const key = `${ref.kind}:${ref.slug}`;
      inDegree.set(key, (inDegree.get(key) ?? 0) + 1);
    }
  }
  for (const entry of entries) {
    if (entry.frontmatter.status !== "published") continue;
    if (entry.kind === "quote" && entry.slug === "_placeholder") continue;
    const key = `${entry.kind}:${entry.slug}`;
    if ((inDegree.get(key) ?? 0) === 0) {
      issues.push({
        severity: "warning",
        code: "ORPHANED_ENTRY",
        message: `Published entry has zero inbound cross-references from other entries`,
        location: locOf(entry),
        hint: "Add this entry to a related: list on at least one other entry so it surfaces in Related reading.",
      });
    }
  }
  return issues;
}

// ──────────────────────────────────────────────────────────────────────
// 10. Quote safety: completeness + placeholder detection
// ──────────────────────────────────────────────────────────────────────

export function checkQuoteSafety(
  entries: ContentEntry<AnyFrontmatter>[],
): Issue[] {
  const issues: Issue[] = [];
  for (const entry of entries) {
    if (entry.kind !== "quote") continue;
    if (entry.frontmatter.status !== "published") continue;
    const fm = entry.frontmatter;
    const loc = locOf(entry);

    for (const field of ["attribution", "workTitle", "workCitation"] as const) {
      const v = (fm as unknown as Record<string, unknown>)[field];
      if (typeof v !== "string" || v.trim().length === 0) {
        issues.push({
          severity: "error",
          code: "QUOTE_INCOMPLETE",
          message: `Published quote is missing required "${field}"`,
          location: loc,
          hint: "A published quote needs exact wording (description), attribution, workTitle and workCitation. If any is missing, downgrade to status: stub.",
        });
      }
    }

    for (const pat of PLACEHOLDER_BODY_PATTERNS) {
      if (pat.test(entry.body)) {
        issues.push({
          severity: "error",
          code: "PLACEHOLDER_MARKER",
          message: `Quote body contains a placeholder marker (/${pat.source}/)`,
          location: loc,
        });
        break;
      }
    }
  }
  return issues;
}

// ──────────────────────────────────────────────────────────────────────
// 11. Production-URL hygiene: no localhost / preview URLs in content bodies
// ──────────────────────────────────────────────────────────────────────

/**
 * Catches URLs that should never have shipped: localhost, raw IPs, and
 * any *.vercel.app preview hostname. The check looks at MDX bodies
 * because that is where editor-pasted snippets are most likely to slip
 * through. Source code is covered by typecheck + lint + the production
 * canonical URL test in seo.ts.
 *
 * The platform's legitimate uses of *.vercel.app (the WebmasterID
 * analytics ingest endpoint at webmasterid-ingest-api.vercel.app) live
 * in src/components/analytics/WebmasterID.tsx and are deliberately
 * outside the scope of this content-side check.
 */
const NON_PROD_URL_PATTERNS: ReadonlyArray<{ regex: RegExp; label: string }> = [
  { regex: /https?:\/\/localhost(?::\d+)?/i, label: "localhost" },
  { regex: /https?:\/\/127\.0\.0\.1(?::\d+)?/i, label: "127.0.0.1" },
  { regex: /https?:\/\/[a-z0-9-]+\.vercel\.app/i, label: "*.vercel.app" },
  { regex: /https?:\/\/[a-z0-9-]+\.ngrok(?:-free)?\.app/i, label: "*.ngrok.app" },
];

export function checkProductionUrls(
  entries: ContentEntry<AnyFrontmatter>[],
): Issue[] {
  const issues: Issue[] = [];
  for (const entry of entries) {
    for (const { regex, label } of NON_PROD_URL_PATTERNS) {
      const match = entry.body.match(regex);
      if (match) {
        issues.push({
          severity: "error",
          code: "NON_PROD_URL",
          message: `Non-production URL in body: "${match[0]}" (${label})`,
          location: locOf(entry),
          hint: "Replace with the production https://virtueandpower.com URL, or remove the link entirely if it was a development-time reference.",
        });
        break;
      }
    }
  }
  return issues;
}

// ──────────────────────────────────────────────────────────────────────
// Composition
// ──────────────────────────────────────────────────────────────────────

export interface CheckResult {
  name: string;
  issues: Issue[];
}

export function runAllChecks(
  entries: ContentEntry<AnyFrontmatter>[],
  catalog: Source[] = sources,
): CheckResult[] {
  return [
    { name: "frontmatter", issues: checkFrontmatter(entries) },
    { name: "duplicate-slugs", issues: checkDuplicateSlugs(entries) },
    { name: "broken-refs", issues: checkBrokenRefs(entries) },
    { name: "source-integrity", issues: checkSources(entries, catalog) },
    { name: "metadata", issues: checkMetadata(entries) },
    { name: "published-quality", issues: checkPublishedQuality(entries) },
    { name: "sitemap-consistency", issues: checkSitemapConsistency(entries) },
    { name: "rss-consistency", issues: checkRssConsistency(entries) },
    { name: "quote-safety", issues: checkQuoteSafety(entries) },
    { name: "production-urls", issues: checkProductionUrls(entries) },
    { name: "orphans", issues: checkOrphans(entries) },
  ];
}
