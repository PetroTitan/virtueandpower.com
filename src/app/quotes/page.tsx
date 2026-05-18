import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/editorial/PageHeader";
import { Prose } from "@/components/editorial/Typography";
import { JsonLd } from "@/components/seo/JsonLd";
import { getQuotes, hrefFor } from "@/content/loader";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const PATH = "/quotes";
const TITLE = "Quotes";
const DESCRIPTION =
  "A library of quotations from the classical tradition — published only when the exact wording, the work, the chapter or section, and the translator can all be stated.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default async function QuotesIndex() {
  const quotes = await getQuotes();
  const realQuotes = quotes.filter(
    (q) => q.slug !== "_placeholder" && q.frontmatter.status === "published",
  );

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Quotes", href: PATH },
        ])}
      />
      <PageHeader
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Quotes" }]}
        eyebrow="Library"
        title="Quotes"
        description={DESCRIPTION}
      />
      <Container width="editorial" className="py-16">
        <Prose as="section">
          <h2>What we publish here</h2>
          <p>
            A quote page on this site is not just a sentence with a name
            attached. Before a quotation is published, the editorial team
            requires the following:
          </p>
          <ul>
            <li>
              <strong>Exact wording.</strong> The quotation matches a
              specific edition. We do not modernise the wording silently,
              and we do not stitch together phrases drawn from different
              passages.
            </li>
            <li>
              <strong>The work it comes from.</strong> Named, and cited
              by the convention appropriate to the tradition — Stephanus
              for Plato, Bekker for Aristotle, book and chapter (or
              section) for the historians and the scriptures.
            </li>
            <li>
              <strong>The translator and the edition,</strong> where the
              quotation appears in translation. The text of an ancient
              author is in the public domain; the modern translation that
              shapes the English wording is often not. We say which
              edition the wording follows.
            </li>
            <li>
              <strong>Enough context to read it.</strong> An isolated
              line, prised out of its argument, usually misleads. Every
              quote entry includes a short editorial framing of what the
              passage is doing in the work it comes from.
            </li>
          </ul>
          <p>
            The fuller statement of the standards governing the library
            sits on the{" "}
            <Link href="/editorial-policy" className="vp-link">
              editorial policy
            </Link>{" "}
            page; the editions we read from are on{" "}
            <Link href="/sources" className="vp-link">
              Sources
            </Link>
            .
          </p>
          <h2>Why the library is small</h2>
          <p>
            Many of the most widely shared classical quotations on the
            modern web do not, in fact, originate where they are said to.
            Some are paraphrases that have hardened into &ldquo;quotations.&rdquo;
            Some
            are nineteenth- or twentieth-century lines that have drifted
            backwards in time. Some are simply invented. We will publish a
            smaller library for that reason. The library opens largely
            empty by design.
          </p>
        </Prose>

        {realQuotes.length ? (
          <ul className="mt-16 grid gap-10">
            {realQuotes.map((q) => (
              <li
                key={q.slug}
                className="border-l border-bronze pl-6 sm:pl-8"
              >
                <p className="font-serif italic text-xl text-charcoal sm:text-2xl">
                  &ldquo;{q.frontmatter.description}&rdquo;
                </p>
                <p className="mt-4 text-sm text-stone">
                  <span className="text-charcoal-100">
                    {q.frontmatter.attribution}
                  </span>{" "}
                  ·{" "}
                  <cite className="not-italic text-charcoal-100">
                    {q.frontmatter.workTitle}
                  </cite>{" "}
                  · {q.frontmatter.workCitation}
                </p>
                <p className="mt-3">
                  <Link
                    href={hrefFor("quote", q.slug)}
                    className="text-xs uppercase tracking-eyebrow text-bronze hover:text-bronze-300"
                  >
                    Read entry
                  </Link>
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-16 max-w-prose text-sm text-stone">
            No verified quotations have been published yet. Entries will
            appear here as they pass review under the standards above.
          </p>
        )}
      </Container>
    </>
  );
}
