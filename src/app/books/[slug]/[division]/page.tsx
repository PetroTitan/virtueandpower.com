import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/editorial/PageHeader";
import { RelatedReading } from "@/components/editorial/RelatedReading";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  ODYSSEY_BOOKS,
  adjacentOdysseyBooks,
  getOdysseyBook,
  movementFor,
} from "@/data/odyssey-books";
import { getFigures, getThemes, hrefFor } from "@/content/loader";
import { articleJsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

/**
 * Divisions of a primary text.
 *
 * Only the Odyssey currently has a division registry, so this route
 * generates exactly the twenty-four Odyssey book pages and nothing else.
 * `dynamicParams = false` means any other /books/<slug>/<division>
 * combination 404s rather than rendering an empty shell — the route is
 * generalisable to another text later without being open in the meantime.
 */
export const dynamicParams = false;

type Params = { slug: string; division: string };

export function generateStaticParams(): Params[] {
  return ODYSSEY_BOOKS.map((b) => ({ slug: "odyssey", division: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug, division } = await params;
  if (slug !== "odyssey") return {};
  const book = getOdysseyBook(division);
  if (!book) return {};
  return buildMetadata({
    title: `Odyssey Book ${book.number}: ${book.title}`,
    description: book.standfirst,
    path: `/books/odyssey/${book.slug}`,
    type: "article",
    modifiedTime: "2026-07-28",
  });
}

export default async function OdysseyBookPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug, division } = await params;
  if (slug !== "odyssey") notFound();
  const book = getOdysseyBook(division);
  if (!book) notFound();

  const path = `/books/odyssey/${book.slug}`;
  const movement = movementFor(book.number);
  const { previous, next } = adjacentOdysseyBooks(book.number);

  // Resolve the theme and figure refs against the live corpus so a
  // renamed or deleted entry surfaces as a missing link here rather than
  // rendering a dead anchor.
  const [allThemes, allFigures] = await Promise.all([
    getThemes(),
    getFigures(),
  ]);
  const themes = book.themeRefs
    .map((s) => allThemes.find((t) => t.slug === s))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));
  const figures = book.figureRefs
    .map((s) => allFigures.find((f) => f.slug === s))
    .filter((f): f is NonNullable<typeof f> => Boolean(f));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Books", href: "/books" },
            { name: "The Odyssey", href: "/books/odyssey" },
            { name: `Book ${book.number}`, href: path },
          ]),
          articleJsonLd({
            headline: `Odyssey Book ${book.number}: ${book.title}`,
            description: book.standfirst,
            url: path,
            dateModified: "2026-07-28",
            section: "The Odyssey",
          }),
        ]}
      />
      <PageHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Books", href: "/books" },
          { label: "The Odyssey", href: "/books/odyssey" },
          { label: `Book ${book.number}` },
        ]}
        eyebrow={`The Odyssey · Book ${book.number} · ${book.letter}`}
        title={book.title}
        description={book.standfirst}
        meta={movement ? `${movement.label} — books ${movement.books[0]}–${movement.books[1]}` : undefined}
      />
      <Container width="editorial" className="py-16">
        <div className="grid gap-16 md:grid-cols-12">
          <article className="md:col-span-8">
            <div className="vp-prose">
              <h2>Summary</h2>
              {book.summary.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}

              <h2>Narrative function</h2>
              <p>{book.narrativeFunction}</p>

              <h2>Greek concepts in this book</h2>
            </div>
            <dl className="mt-6 space-y-5">
              {book.greekConcepts.map((c) => (
                <div key={c.term} className="border-l border-rule pl-5">
                  <dt className="font-serif text-lg italic text-charcoal">
                    {c.term}
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-charcoal-100">
                    {c.gloss}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="vp-prose mt-12">
              <h2>Connections to other books</h2>
            </div>
            <ul className="mt-6 space-y-4">
              {book.connections.map((c) => (
                <li key={c.note.slice(0, 40)} className="border-l border-rule pl-5">
                  <p className="text-xs uppercase tracking-eyebrow text-stone">
                    {c.books.map((n) => `Book ${n}`).join(" · ")}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-charcoal-100">
                    {c.note}
                  </p>
                  <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                    {c.books.map((n) => (
                      <Link
                        key={n}
                        href={`/books/odyssey/book-${n}`}
                        className="vp-link text-charcoal-100"
                      >
                        Go to Book {n}
                      </Link>
                    ))}
                  </p>
                </li>
              ))}
            </ul>

            <div className="vp-prose mt-12">
              <h2>Source notes</h2>
              <p>{book.sourceNotes}</p>

              <h2>Reading it responsibly</h2>
              <p>{book.interpretation}</p>
            </div>

            <nav
              aria-label="Book navigation"
              className="mt-16 flex flex-wrap items-baseline justify-between gap-4 border-t border-rule pt-8 text-sm"
            >
              {previous ? (
                <Link
                  href={`/books/odyssey/${previous.slug}`}
                  className="vp-link text-charcoal-100"
                >
                  ← Book {previous.number}: {previous.title}
                </Link>
              ) : (
                <Link href="/books/odyssey" className="vp-link text-charcoal-100">
                  ← The Odyssey
                </Link>
              )}
              {next ? (
                <Link
                  href={`/books/odyssey/${next.slug}`}
                  className="vp-link text-right text-charcoal-100"
                >
                  Book {next.number}: {next.title} →
                </Link>
              ) : (
                <Link
                  href="/books/odyssey"
                  className="vp-link text-right text-charcoal-100"
                >
                  Back to the poem →
                </Link>
              )}
            </nav>
          </article>

          <aside className="md:col-span-4 md:border-l md:border-rule md:pl-10">
            <p className="vp-eyebrow">Principal characters</p>
            <ul className="mt-3 space-y-1 text-sm text-charcoal-100">
              {book.characters.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>

            <p className="vp-eyebrow mt-8">Places</p>
            <ul className="mt-3 space-y-1 text-sm text-charcoal-100">
              {book.places.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>

            {figures.length ? (
              <>
                <p className="vp-eyebrow mt-8">Figure entries</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {figures.map((f) => (
                    <li key={f.slug}>
                      <Link
                        href={hrefFor("figure", f.slug)}
                        className="vp-link text-charcoal-100"
                      >
                        {f.frontmatter.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            {themes.length ? (
              <>
                <p className="vp-eyebrow mt-8">Major themes</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {themes.map((t) => (
                    <li key={t.slug}>
                      <Link
                        href={hrefFor("theme", t.slug)}
                        className="vp-link text-charcoal-100"
                      >
                        {t.frontmatter.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            <p className="vp-eyebrow mt-8">The whole poem</p>
            <ol className="mt-3 grid grid-cols-4 gap-1 text-sm">
              {ODYSSEY_BOOKS.map((b) => (
                <li key={b.slug}>
                  <Link
                    href={`/books/odyssey/${b.slug}`}
                    aria-current={b.number === book.number ? "page" : undefined}
                    className={
                      b.number === book.number
                        ? "flex h-9 items-center justify-center border border-bronze-200 text-bronze-200"
                        : "flex h-9 items-center justify-center border border-rule text-charcoal-100 transition-colors hover:border-bronze hover:text-bronze"
                    }
                  >
                    {b.number}
                  </Link>
                </li>
              ))}
            </ol>
          </aside>
        </div>

        <RelatedReading
          items={[
            {
              href: "/books/odyssey",
              title: "The Odyssey",
              kind: "book",
              excerpt:
                "The full editorial treatment of the poem — structure, themes, reception and translations.",
            },
            {
              href: "/homer/oral-tradition",
              title: "Oral tradition and the making of the poems",
              kind: "reference",
              excerpt:
                "Why the repetitions, the epithets and the typical scenes are structural rather than redundant.",
            },
            {
              href: "/guides/odyssey-myth-and-history",
              title: "Odyssey: myth and history",
              kind: "guide",
              excerpt:
                "What in the poem can be treated as evidence for anything, and at what level of confidence.",
            },
          ]}
        />
      </Container>
    </>
  );
}
