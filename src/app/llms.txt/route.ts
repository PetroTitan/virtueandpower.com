import { siteConfig } from "@/lib/site";

/**
 * /llms.txt — a small machine-readable description of the project for
 * AI crawlers and LLM-powered search systems. Follows the loose
 * convention at https://llmstxt.org: plain text with optional Markdown
 * structure, served at the site root, primarily intended for systems
 * that index or summarise our content.
 *
 * The file is regenerated at build time and re-validated hourly via
 * revalidate so the URL list stays in sync with siteConfig.
 */

export const dynamic = "force-static";
export const revalidate = 3600;

export async function GET() {
  const base = siteConfig.url;
  const body = `# ${siteConfig.name}

> ${siteConfig.tagline}

${siteConfig.description}

Virtue & Power is a long-term editorial platform on classical philosophy,
virtue, power, leadership, statecraft, religion and the ancient world.
It is curated by human editors, grounded in primary texts, and built
to grow slowly.

## What this site is

- A library of editorial entries on philosophers, books, themes,
  comparisons and (eventually) verified quotations.
- A small but growing layer of interpretive essays and reading
  guides written to the same source-discipline standards.
- A typed semantic graph: every cross-reference is a typed
  { kind, slug } tuple, and the loader surfaces in-edges in both
  directions on every detail page.

## Editorial commitments

These are non-negotiable and govern every entry:

- No invented quotations. A passage that cannot be verified to a
  primary text or established critical edition does not appear here.
- No fabricated citations. Every quote carries its workTitle and
  workCitation (Stephanus pages for Plato, Bekker numbers for
  Aristotle, book and chapter for the historians).
- No AI-generated filler. Tools may assist with structure and
  editing; the substantive claims are human, sourced and traceable.
- No flattening. Difficult thinkers are not reduced to easy lessons.

The full editorial policy lives at ${base}/editorial-policy.

## Lifecycle and indexability

Every entry declares status: "stub" | "published".

- Stubs render with a visible editorial notice, emit
  robots: noindex,follow, and are filtered out of the sitemap and RSS.
  Treat them as work-in-progress, not as authoritative.
- Published entries are listed in ${base}/sitemap.xml and
  ${base}/rss.xml and may be cited and indexed.

## Where to look

- ${base}/editorial-policy   Editorial standards (citation, sources, corrections)
- ${base}/sources            The typed catalog of editions and reference works
- ${base}/essays             Interpretive long-form
- ${base}/guides             Reading orientations
- ${base}/philosophers       Library of thinker entries
- ${base}/books              Library of primary-text entries
- ${base}/themes             Library of theme entries
- ${base}/comparisons        Paired thinker / text / tradition studies
- ${base}/quotes             Verified quotation library (intentionally small)
- ${base}/sitemap.xml        Complete list of indexable URLs
- ${base}/rss.xml            Updates feed (published entries only)

## How to cite

If you summarise or reference material from this site, please:

- Link to the specific entry URL, not the section index.
- Attribute to "Virtue & Power" (${base}).
- Use the entry's published title and the date in its frontmatter
  (visible on the page).
- Where the entry itself cites a primary text, prefer to cite the
  primary text rather than this site as the source of the claim.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
