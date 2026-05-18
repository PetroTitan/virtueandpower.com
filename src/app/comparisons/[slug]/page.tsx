import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/editorial/PageHeader";
import { RelatedReading } from "@/components/editorial/RelatedReading";
import { StubNotice } from "@/components/editorial/StubNotice";
import { JsonLd } from "@/components/seo/JsonLd";
import { MdxContent } from "@/content/mdx";
import {
  getComparisons,
  getEntryBySlug,
  getRelatedAndBacklinks,
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
  const all = await getComparisons();
  return all.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getEntryBySlug("comparison", slug);
  if (!entry) return {};
  return buildMetadata({
    title: entry.frontmatter.title,
    description: entry.frontmatter.description,
    path: hrefFor("comparison", slug),
    type: "article",
    modifiedTime: entry.frontmatter.updated,
  });
}

export default async function ComparisonPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const entry = await getEntryBySlug("comparison", slug);
  if (!entry) notFound();

  const fm = entry.frontmatter;
  const path = hrefFor("comparison", slug);
  const subjects = await resolveRefs(fm.subjects);
  const related = await getRelatedAndBacklinks("comparison", slug, fm.related);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Comparisons", href: "/comparisons" },
            { name: fm.title, href: path },
          ]),
          articleJsonLd({
            headline: fm.title,
            description: fm.description,
            url: path,
            dateModified: fm.updated,
            section: "Comparisons",
          }),
        ]}
      />
      <PageHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Comparisons", href: "/comparisons" },
          { label: fm.title },
        ]}
        eyebrow={fm.domain ?? "Comparison"}
        title={fm.title}
        description={fm.description}
      />
      <Container width="editorial" className="py-16">
        <article className="vp-prose">
          {fm.status === "stub" ? <StubNotice /> : null}
          {subjects.length ? (
            <p className="vp-eyebrow">
              {subjects.map(({ entry: s }) => s.frontmatter.title).join("  ·  ")}
            </p>
          ) : null}
          <div className="mt-6">
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
