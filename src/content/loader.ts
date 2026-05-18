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

export function hrefFor(kind: ContentKind, slug: string): string {
  return `/${dirByKind[kind]}/${slug}`;
}

export function sectionRootFor(kind: ContentKind): string {
  return `/${dirByKind[kind]}`;
}

export async function getAllContentRefs(): Promise<
  Array<{ kind: ContentKind; slug: string; updated: string }>
> {
  const [philosophers, books, themes, quotes, comparisons] = await Promise.all([
    getPhilosophers(),
    getBooks(),
    getThemes(),
    getQuotes(),
    getComparisons(),
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
  ];
}
