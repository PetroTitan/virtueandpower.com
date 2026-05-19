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
  getEssays,
  getRelatedAndBacklinks,
  hrefFor,
  resolveRefs,
} from "@/content/loader";
import {
  estimateReadingMinutes,
  formatReadingTime,
} from "@/content/reading-time";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  buildMetadata,
} from "@/lib/seo";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const all = await getEssays();
  return all.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getEntryBySlug("essay", slug);
  if (!entry) return {};
  return buildMetadata({
    title: entry.frontmatter.title,
    description: entry.frontmatter.description,
    path: hrefFor("essay", slug),
    type: "article",
    modifiedTime: entry.frontmatter.updated,
    noindex: entry.frontmatter.status === "stub",
  });
}

export default async function EssayPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const entry = await getEntryBySlug("essay", slug);
  if (!entry) notFound();

  const fm = entry.frontmatter;
  const path = hrefFor("essay", slug);
  const minutes = estimateReadingMinutes(entry.body, fm.readingTime);

  const [primaryThinkers, primaryBooks, primaryThemes, related] =
    await Promise.all([
      resolveRefs(fm.primaryThinkers),
      resolveRefs(fm.primaryBooks),
      resolveRefs(fm.primaryThemes),
      getRelatedAndBacklinks("essay", slug, fm.related),
    ]);

  const meta = [fm.domain, formatReadingTime(minutes)].filter(Boolean).join(" · ");

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Essays", href: "/essays" },
            { name: fm.title, href: path },
          ]),
          articleJsonLd({
            headline: fm.title,
            description: fm.description,
            url: path,
            dateModified: fm.updated,
            section: "Essays",
          }),
        ]}
      />
      <PageHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Essays", href: "/essays" },
          { label: fm.title },
        ]}
        eyebrow={fm.domain ?? "Essay"}
        title={fm.title}
        description={fm.subtitle ?? fm.description}
        meta={meta}
      />
      <Container width="editorial" className="py-16">
        <div className="grid gap-16 md:grid-cols-12">
          <article className="md:col-span-8">
            {fm.status === "stub" ? <StubNotice /> : null}
            <MdxContent source={entry.body} dropCap={fm.status === "published"} />
          </article>

          <aside className="md:col-span-4 md:border-l md:border-rule md:pl-10">
            <div className="space-y-8 text-sm">
              <div>
                <p className="vp-eyebrow">Reading time</p>
                <p className="mt-2 text-charcoal-100">
                  {formatReadingTime(minutes)}
                </p>
              </div>
              {primaryThinkers.length ? (
                <div>
                  <p className="vp-eyebrow">Thinkers</p>
                  <ul className="mt-3 space-y-1">
                    {primaryThinkers.map(({ ref, entry: t }) => (
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
              {primaryBooks.length ? (
                <div>
                  <p className="vp-eyebrow">Texts</p>
                  <ul className="mt-3 space-y-1">
                    {primaryBooks.map(({ ref, entry: b }) => (
                      <li key={`${ref.kind}-${ref.slug}`}>
                        <a
                          href={hrefFor(ref.kind, ref.slug)}
                          className="vp-link text-charcoal-100"
                        >
                          <cite className="not-italic">{b.frontmatter.title}</cite>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {primaryThemes.length ? (
                <div>
                  <p className="vp-eyebrow">Themes</p>
                  <ul className="mt-3 space-y-1">
                    {primaryThemes.map(({ ref, entry: t }) => (
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
            </div>
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
