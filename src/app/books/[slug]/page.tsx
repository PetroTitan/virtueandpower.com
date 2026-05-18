import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/editorial/PageHeader";
import { RelatedReading } from "@/components/editorial/RelatedReading";
import { StubNotice } from "@/components/editorial/StubNotice";
import { JsonLd } from "@/components/seo/JsonLd";
import { MdxContent } from "@/content/mdx";
import {
  getBooks,
  getEntryBySlug,
  hrefFor,
  resolveRefs,
} from "@/content/loader";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  buildMetadata,
} from "@/lib/seo";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const all = await getBooks();
  return all.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getEntryBySlug("book", slug);
  if (!entry) return {};
  return buildMetadata({
    title: entry.frontmatter.title,
    description: entry.frontmatter.description,
    path: hrefFor("book", slug),
    type: "article",
    modifiedTime: entry.frontmatter.updated,
  });
}

export default async function BookPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const entry = await getEntryBySlug("book", slug);
  if (!entry) notFound();

  const fm = entry.frontmatter;
  const path = hrefFor("book", slug);
  const related = await resolveRefs(fm.related);
  const themes = await resolveRefs(fm.primaryThemes);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Books", href: "/books" },
            { name: fm.title, href: path },
          ]),
          articleJsonLd({
            headline: fm.title,
            description: fm.description,
            url: path,
            dateModified: fm.updated,
            section: "Books",
          }),
        ]}
      />
      <PageHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Books", href: "/books" },
          { label: fm.title },
        ]}
        eyebrow={fm.period}
        title={fm.title}
        description={fm.description}
        meta={`By ${fm.author}${fm.composedCirca ? ` · ${fm.composedCirca}` : ""}`}
      />
      <Container width="editorial" className="py-16">
        <div className="grid gap-16 md:grid-cols-12">
          <article className="md:col-span-8">
            {fm.status === "stub" ? <StubNotice /> : null}
            <MdxContent source={entry.body} />
          </article>
          <aside className="md:col-span-4 md:border-l md:border-rule md:pl-10">
            <p className="vp-eyebrow">Bibliographic notes</p>
            <dl className="mt-4 space-y-3 text-sm text-charcoal-100">
              <div>
                <dt className="text-xs uppercase tracking-eyebrow text-stone">Author</dt>
                <dd>{fm.author}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-eyebrow text-stone">Period</dt>
                <dd>{fm.period}</dd>
              </div>
              {fm.originalLanguage ? (
                <div>
                  <dt className="text-xs uppercase tracking-eyebrow text-stone">
                    Original language
                  </dt>
                  <dd>{fm.originalLanguage}</dd>
                </div>
              ) : null}
              {fm.recommendedTranslation ? (
                <div>
                  <dt className="text-xs uppercase tracking-eyebrow text-stone">
                    Recommended translation
                  </dt>
                  <dd>{fm.recommendedTranslation}</dd>
                </div>
              ) : null}
            </dl>
            {themes.length ? (
              <div className="mt-8">
                <p className="vp-eyebrow">Primary themes</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {themes.map(({ ref, entry: t }) => (
                    <li key={`${ref.kind}-${ref.slug}`}>
                      <a
                        href={hrefFor(ref.kind, ref.slug)}
                        className="vp-link text-charcoal-100"
                      >
                        {t.frontmatter.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>
        </div>
        <RelatedReading
          items={related.map(({ ref, entry: e }) => ({
            href: hrefFor(ref.kind, ref.slug),
            title: e.frontmatter.title,
            kind: ref.kind,
            excerpt: e.frontmatter.description,
          }))}
        />
      </Container>
    </>
  );
}
