import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/editorial/PageHeader";
import { QuoteBlock } from "@/components/editorial/QuoteBlock";
import { RelatedReading } from "@/components/editorial/RelatedReading";
import { StubNotice } from "@/components/editorial/StubNotice";
import { JsonLd } from "@/components/seo/JsonLd";
import { MdxContent } from "@/content/mdx";
import {
  getEntryBySlug,
  getQuotes,
  getRelatedAndBacklinks,
  hrefFor,
} from "@/content/loader";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  buildMetadata,
} from "@/lib/seo";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const all = await getQuotes();
  return all.map((q) => ({ slug: q.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getEntryBySlug("quote", slug);
  if (!entry) return {};
  return buildMetadata({
    title: entry.frontmatter.title,
    description: entry.frontmatter.description,
    path: hrefFor("quote", slug),
    type: "article",
    modifiedTime: entry.frontmatter.updated,
    noindex: entry.frontmatter.status === "stub",
  });
}

export default async function QuotePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const entry = await getEntryBySlug("quote", slug);
  if (!entry) notFound();

  const fm = entry.frontmatter;
  const path = hrefFor("quote", slug);
  const related = await getRelatedAndBacklinks("quote", slug, fm.related);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Quotes", href: "/quotes" },
            { name: fm.title, href: path },
          ]),
          articleJsonLd({
            headline: fm.title,
            description: fm.description,
            url: path,
            dateModified: fm.updated,
            section: "Quotes",
          }),
        ]}
      />
      <PageHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Quotes", href: "/quotes" },
          { label: fm.title },
        ]}
        eyebrow="Quotation"
        title={fm.title}
        description={fm.attribution}
        meta={`${fm.workTitle} · ${fm.workCitation}`}
      />
      <Container width="editorial" className="py-16">
        <article className="vp-prose">
          {fm.status === "stub" ? <StubNotice /> : null}
          <QuoteBlock
            size="feature"
            quote={fm.description}
            attribution={fm.attribution}
            workTitle={fm.workTitle}
            workCitation={fm.workCitation}
          />
          <div className="mt-12">
            <MdxContent source={entry.body} />
          </div>
        </article>
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
