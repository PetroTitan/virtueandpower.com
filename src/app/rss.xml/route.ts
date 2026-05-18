import { siteConfig } from "@/lib/site";
import { getAllContentRefs, hrefFor } from "@/content/loader";

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
  const refs = await getAllContentRefs();
  const sorted = [...refs].sort(
    (a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime(),
  );

  const items = sorted
    .map((ref) => {
      const url = `${siteConfig.url}${hrefFor(ref.kind, ref.slug)}`;
      const title = `${kindLabel[ref.kind] ?? "Entry"}: ${ref.slug}`;
      return `    <item>
      <title>${escapeXml(title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${new Date(ref.updated).toUTCString()}</pubDate>
      <category>${escapeXml(kindLabel[ref.kind] ?? ref.kind)}</category>
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
