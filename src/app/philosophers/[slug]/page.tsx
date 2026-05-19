import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/editorial/PageHeader";
import { RelatedReading } from "@/components/editorial/RelatedReading";
import { StubNotice } from "@/components/editorial/StubNotice";
import { JsonLd } from "@/components/seo/JsonLd";
import { BustImage } from "@/components/site/BustImage";
import { MdxContent } from "@/content/mdx";
import { busts } from "@/data/busts";
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
  personJsonLd,
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
    noindex: entry.frontmatter.status === "stub",
  });
}

function parseLifespan(input?: string): { birthDate?: string; deathDate?: string } {
  if (!input) return {};
  // e.g. "c. 428 – 348 BCE" or "384 – 322 BCE". Best-effort: extract two
  // year tokens and tag the era; if parsing fails, omit the dates entirely
  // rather than emit a wrong schema value.
  const match = input.match(/(\d{1,4})\s*[–-]\s*(\d{1,4})\s*(BCE|BC|CE|AD)?/i);
  if (!match) return {};
  const [, a, b, era] = match;
  const isBce = era ? /b/i.test(era) : true;
  const fmt = (n: string) => (isBce ? `-${n.padStart(4, "0")}` : n.padStart(4, "0"));
  return { birthDate: fmt(a), deathDate: fmt(b) };
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
  const lifespan = parseLifespan(fm.lifespan);
  const bust = busts.find((b) => b.figureSlug === slug);

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
          personJsonLd({
            name: fm.title,
            url: path,
            description: fm.description,
            alternateName: fm.epithet,
            ...lifespan,
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
            {bust ? (
              <BustImage
                bust={bust}
                className="mb-10"
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 30vw, 100vw"
              />
            ) : null}
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
