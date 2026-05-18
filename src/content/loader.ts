import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type {
  AnyFrontmatter,
  BookFrontmatter,
  ComparisonFrontmatter,
  ContentEntry,
  ContentKind,
  ContentRef,
  EssayFrontmatter,
  GuideFrontmatter,
  PhilosopherFrontmatter,
  QuoteFrontmatter,
  ThemeFrontmatter,
} from "./types";

const CONTENT_ROOT = path.join(process.cwd(), "content");

const dirByKind: Record<ContentKind, string> = {
  philosopher: "philosophers",
  book: "books",
  theme: "themes",
  quote: "quotes",
  comparison: "comparisons",
  essay: "essays",
  guide: "guides",
};

type FrontmatterFor<K extends ContentKind> = K extends "philosopher"
  ? PhilosopherFrontmatter
  : K extends "book"
    ? BookFrontmatter
    : K extends "theme"
      ? ThemeFrontmatter
      : K extends "quote"
        ? QuoteFrontmatter
        : K extends "comparison"
          ? ComparisonFrontmatter
          : K extends "essay"
            ? EssayFrontmatter
            : K extends "guide"
              ? GuideFrontmatter
              : never;

const cache = new Map<ContentKind, ContentEntry<AnyFrontmatter>[]>();

async function readDirSafe(dir: string): Promise<string[]> {
  try {
    return await readdir(dir);
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

async function loadKind<K extends ContentKind>(
  kind: K,
): Promise<ContentEntry<FrontmatterFor<K>>[]> {
  const cached = cache.get(kind);
  if (cached) return cached as ContentEntry<FrontmatterFor<K>>[];

  const dir = path.join(CONTENT_ROOT, dirByKind[kind]);
  const files = (await readDirSafe(dir)).filter((f) => /\.mdx?$/.test(f));

  const entries = await Promise.all(
    files.map(async (file): Promise<ContentEntry<FrontmatterFor<K>>> => {
      const filePath = path.join(dir, file);
      const raw = await readFile(filePath, "utf8");
      const parsed = matter(raw);
      const slug = (parsed.data.slug as string) ?? file.replace(/\.mdx?$/, "");
      const fm = {
        ...(parsed.data as object),
        kind,
        slug,
      } as FrontmatterFor<K>;
      return {
        kind,
        slug,
        frontmatter: fm,
        body: parsed.content,
        filePath,
      };
    }),
  );

  entries.sort((a, b) =>
    a.frontmatter.title.localeCompare(b.frontmatter.title, "en"),
  );

  cache.set(kind, entries as ContentEntry<AnyFrontmatter>[]);
  return entries;
}

export function getPhilosophers() {
  return loadKind("philosopher");
}
export function getBooks() {
  return loadKind("book");
}
export function getThemes() {
  return loadKind("theme");
}
export function getQuotes() {
  return loadKind("quote");
}
export function getComparisons() {
  return loadKind("comparison");
}
export function getEssays() {
  return loadKind("essay");
}
export function getGuides() {
  return loadKind("guide");
}

export async function getEntryBySlug<K extends ContentKind>(
  kind: K,
  slug: string,
): Promise<ContentEntry<FrontmatterFor<K>> | undefined> {
  const all = await loadKind(kind);
  return all.find((e) => e.slug === slug);
}

export async function resolveRefs(refs: ContentRef[] | undefined) {
  if (!refs?.length) return [];
  const resolved = await Promise.all(
    refs.map(async (ref) => {
      const entry = await getEntryBySlug(ref.kind, ref.slug);
      return entry ? { ref, entry } : null;
    }),
  );
  return resolved.filter((x): x is NonNullable<typeof x> => x !== null);
}

/**
 * Collect every typed cross-reference an entry's frontmatter declares,
 * regardless of which kind-specific field it lives on (related, primaryWorks,
 * primaryThemes, keyThinkers, keyTexts, subjects). Used both for forward
 * link rendering and for backlink computation.
 */
function collectOutgoingRefs(entry: ContentEntry<AnyFrontmatter>): ContentRef[] {
  const fm = entry.frontmatter;
  const refs: ContentRef[] = [];
  const push = (list?: ContentRef[]) => {
    if (list?.length) refs.push(...list);
  };
  const pushOne = (ref?: ContentRef) => {
    if (ref) refs.push(ref);
  };
  push(fm.related);
  switch (fm.kind) {
    case "philosopher":
      push(fm.primaryWorks);
      break;
    case "book":
      push(fm.primaryThemes);
      break;
    case "theme":
      push(fm.keyThinkers);
      push(fm.keyTexts);
      break;
    case "comparison":
      push(fm.subjects);
      break;
    case "quote":
      // quotes don't have an extra typed-list field beyond `related`
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
  return refs;
}

/**
 * Find every entry across the corpus that points at the given (kind, slug)
 * via any of its typed cross-reference fields. The result is the in-edges of
 * the content graph: who links to me. Entries that already appear in the
 * caller's forward refs should be filtered out before display.
 */
export async function getBacklinksFor(
  kind: ContentKind,
  slug: string,
): Promise<Array<{ ref: ContentRef; entry: ContentEntry<AnyFrontmatter> }>> {
  const [philosophers, books, themes, quotes, comparisons, essays, guides] =
    await Promise.all([
      getPhilosophers(),
      getBooks(),
      getThemes(),
      getQuotes(),
      getComparisons(),
      getEssays(),
      getGuides(),
    ]);
  const all: ContentEntry<AnyFrontmatter>[] = [
    ...philosophers,
    ...books,
    ...themes,
    ...quotes,
    ...comparisons,
    ...essays,
    ...guides,
  ];
  const inEdges: Array<{ ref: ContentRef; entry: ContentEntry<AnyFrontmatter> }> = [];
  for (const entry of all) {
    if (entry.kind === kind && entry.slug === slug) continue;
    const outgoing = collectOutgoingRefs(entry);
    if (outgoing.some((r) => r.kind === kind && r.slug === slug)) {
      inEdges.push({
        ref: { kind: entry.kind, slug: entry.slug },
        entry,
      });
    }
  }
  // Stable, readable order: by kind then by title.
  const kindOrder: Record<ContentKind, number> = {
    philosopher: 0,
    book: 1,
    theme: 2,
    comparison: 3,
    essay: 4,
    guide: 5,
    quote: 6,
  };
  inEdges.sort((a, b) => {
    const k = kindOrder[a.entry.kind] - kindOrder[b.entry.kind];
    if (k !== 0) return k;
    return a.entry.frontmatter.title.localeCompare(
      b.entry.frontmatter.title,
      "en",
    );
  });
  return inEdges;
}

/**
 * Merge typed forward refs (from the entry's own frontmatter) with computed
 * backlinks (entries that point at this entry). Backlinks already covered by
 * the forward refs are de-duplicated so the rendered list shows each related
 * entry exactly once.
 */
export async function getRelatedAndBacklinks(
  kind: ContentKind,
  slug: string,
  forwardRefs: ContentRef[] | undefined,
) {
  const [forward, back] = await Promise.all([
    resolveRefs(forwardRefs),
    getBacklinksFor(kind, slug),
  ]);
  const seen = new Set(forward.map(({ ref }) => `${ref.kind}:${ref.slug}`));
  const backFiltered = back.filter(
    ({ ref }) => !seen.has(`${ref.kind}:${ref.slug}`),
  );
  return [...forward, ...backFiltered];
}

export function hrefFor(kind: ContentKind, slug: string): string {
  return `/${dirByKind[kind]}/${slug}`;
}

export function sectionRootFor(kind: ContentKind): string {
  return `/${dirByKind[kind]}`;
}

export async function getAllContentRefs(): Promise<
  Array<{ kind: ContentKind; slug: string; updated: string }>
> {
  const [philosophers, books, themes, quotes, comparisons, essays, guides] =
    await Promise.all([
      getPhilosophers(),
      getBooks(),
      getThemes(),
      getQuotes(),
      getComparisons(),
      getEssays(),
      getGuides(),
    ]);
  return [
    ...philosophers.map((e) => ({
      kind: "philosopher" as const,
      slug: e.slug,
      updated: e.frontmatter.updated,
    })),
    ...books.map((e) => ({
      kind: "book" as const,
      slug: e.slug,
      updated: e.frontmatter.updated,
    })),
    ...themes.map((e) => ({
      kind: "theme" as const,
      slug: e.slug,
      updated: e.frontmatter.updated,
    })),
    ...quotes.map((e) => ({
      kind: "quote" as const,
      slug: e.slug,
      updated: e.frontmatter.updated,
    })),
    ...comparisons.map((e) => ({
      kind: "comparison" as const,
      slug: e.slug,
      updated: e.frontmatter.updated,
    })),
    ...essays.map((e) => ({
      kind: "essay" as const,
      slug: e.slug,
      updated: e.frontmatter.updated,
    })),
    ...guides.map((e) => ({
      kind: "guide" as const,
      slug: e.slug,
      updated: e.frontmatter.updated,
    })),
  ];
}
