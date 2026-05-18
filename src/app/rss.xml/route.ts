import { siteConfig } from "@/lib/site";
import {
  getBooks,
  getComparisons,
  getPhilosophers,
  getQuotes,
  getThemes,
  hrefFor,
} from "@/content/loader";
import type { AnyFrontmatter, ContentEntry } from "@/content/types";

function escapeXml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const kindLabel: Record<string, string> = {
  philosopher: "Philosopher",
  book: "Book",
  theme: "Theme",
  quote: "Quote",
  comparison: "Comparison",
};

export const dynamic = "force-static";
export const revalidate = 3600;

export async function GET() {
  const [philosophers, books, themes, quotes, comparisons] = await Promise.all([
    getPhilosophers(),
    getBooks(),
    getThemes(),
    getQuotes(),
    getComparisons(),
  ]);

  // Only authoritative entries appear in the feed. Stubs are noindex and
  // are not yet meant for discovery.
  const published: ContentEntry<AnyFrontmatter>[] = [
    ...philosophers,
    ...books,
    ...themes,
    ...quotes,
    ...comparisons,
  ].filter((e) => e.frontmatter.status === "published");

  const sorted = published.sort(
    (a, b) =>
      new Date(b.frontmatter.updated).getTime() -
      new Date(a.frontmatter.updated).getTime(),
  );

  const items = sorted
    .map((entry) => {
      const url = `${siteConfig.url}${hrefFor(entry.kind, entry.slug)}`;
      const label = kindLabel[entry.kind] ?? "Entry";
      const title = `${label}: ${entry.frontmatter.title}`;
      return `    <item>
      <title>${escapeXml(title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${new Date(entry.frontmatter.updated).toUTCString()}</pubDate>
      <category>${escapeXml(label)}</category>
      <description>${escapeXml(entry.frontmatter.description)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${siteConfig.url}</link>
    <atom:link href="${siteConfig.url}/rss.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml(siteConfig.description)}</description>
    <language>${siteConfig.language}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
