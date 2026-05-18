import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/editorial/PageHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { getQuotes, hrefFor } from "@/content/loader";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const PATH = "/quotes";
const TITLE = "Quotes";
const DESCRIPTION =
  "A working library of quotations from the classical tradition. Every entry carries its precise citation; no quotation is published before it is verified to a primary text.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default async function QuotesIndex() {
  const quotes = await getQuotes();
  const realQuotes = quotes.filter((q) => q.slug !== "_placeholder");

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
        <section className="vp-prose">
          <h2 className="font-serif text-heading-1">Editorial policy</h2>
          <p>
            Every quotation on Virtue &amp; Power is tied to a specific
            primary text and a precise citation — a Stephanus page for
            Plato, a Bekker number for Aristotle, a book and chapter for
            the historians and theologians. No quotation is published until
            it has been verified against a critical edition.
          </p>
          <p>
            We do not invent quotations, we do not paraphrase a passage and
            present the paraphrase as a verbatim quote, and we do not
            attribute lines to figures who did not write them. The library
            grows slowly for that reason.
          </p>
        </section>

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
                  · <cite className="not-italic text-charcoal-100">
                    {q.frontmatter.workTitle}
                  </cite>{" "}
                  · {q.frontmatter.workCitation}
                </p>
                <p className="mt-3">
                  <a
                    href={hrefFor("quote", q.slug)}
                    className="text-xs uppercase tracking-eyebrow text-bronze"
                  >
                    Read entry
                  </a>
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-16 text-charcoal-100">
            No verified quotations have been published yet. The library is
            opening empty by design — entries appear here only after they
            have been confirmed against a primary text.
          </p>
        )}
      </Container>
    </>
  );
}
