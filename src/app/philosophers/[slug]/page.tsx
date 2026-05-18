import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/editorial/PageHeader";
import { RelatedReading } from "@/components/editorial/RelatedReading";
import { StubNotice } from "@/components/editorial/StubNotice";
import { JsonLd } from "@/components/seo/JsonLd";
import { MdxContent } from "@/content/mdx";
import {
  getEntryBySlug,
  getPhilosophers,
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
  const all = await getPhilosophers();
  return all.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getEntryBySlug("philosopher", slug);
  if (!entry) return {};
  return buildMetadata({
    title: entry.frontmatter.title,
    description: entry.frontmatter.description,
    path: hrefFor("philosopher", slug),
    type: "article",
    modifiedTime: entry.frontmatter.updated,
  });
}

export default async function PhilosopherPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const entry = await getEntryBySlug("philosopher", slug);
  if (!entry) notFound();

  const fm = entry.frontmatter;
  const path = hrefFor("philosopher", slug);
  const related = await getRelatedAndBacklinks("philosopher", slug, fm.related);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Philosophers", href: "/philosophers" },
            { name: fm.title, href: path },
          ]),
          articleJsonLd({
            headline: fm.title,
            description: fm.description,
            url: path,
            dateModified: fm.updated,
            section: "Philosophers",
          }),
        ]}
      />
      <PageHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Philosophers", href: "/philosophers" },
          { label: fm.title },
        ]}
        eyebrow={fm.era}
        title={fm.title}
        description={fm.epithet}
        meta={fm.lifespan ? `Lifespan · ${fm.lifespan}` : undefined}
      />
      <Container width="editorial" className="py-16">
        <div className="grid gap-16 md:grid-cols-12">
          <article className="md:col-span-8">
            {fm.status === "stub" ? <StubNotice /> : null}
            <MdxContent source={entry.body} />
          </article>
          <aside className="md:col-span-4 md:border-l md:border-rule md:pl-10">
            <p className="vp-eyebrow">Quick facts</p>
            <dl className="mt-4 space-y-3 text-sm text-charcoal-100">
              <div>
                <dt className="text-xs uppercase tracking-eyebrow text-stone">Era</dt>
                <dd>{fm.era}</dd>
              </div>
              {fm.tradition ? (
                <div>
                  <dt className="text-xs uppercase tracking-eyebrow text-stone">
                    Tradition
                  </dt>
                  <dd>{fm.tradition}</dd>
                </div>
              ) : null}
              {fm.tags?.length ? (
                <div>
                  <dt className="text-xs uppercase tracking-eyebrow text-stone">
                    Tags
                  </dt>
                  <dd className="mt-1 flex flex-wrap gap-2">
                    {fm.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-rule px-2 py-0.5 text-xs text-stone"
                      >
                        {tag}
                      </span>
                    ))}
                  </dd>
                </div>
              ) : null}
            </dl>
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
