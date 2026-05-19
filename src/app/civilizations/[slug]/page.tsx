import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/editorial/PageHeader";
import { RelatedReading } from "@/components/editorial/RelatedReading";
import { StubNotice } from "@/components/editorial/StubNotice";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArchiveImage } from "@/components/site/ArchiveImage";
import { MdxContent } from "@/content/mdx";
import {
  getCivilizations,
  getEntryBySlug,
  getRelatedAndBacklinks,
  hrefFor,
  resolveRefs,
} from "@/content/loader";
import { getArchiveImage } from "@/data/archive-images";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  buildMetadata,
} from "@/lib/seo";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const all = await getCivilizations();
  return all.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getEntryBySlug("civilization", slug);
  if (!entry) return {};
  return buildMetadata({
    title: entry.frontmatter.title,
    description: entry.frontmatter.description,
    path: hrefFor("civilization", slug),
    type: "article",
    modifiedTime: entry.frontmatter.updated,
    noindex: entry.frontmatter.status === "stub",
  });
}

export default async function CivilizationPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const entry = await getEntryBySlug("civilization", slug);
  if (!entry) notFound();

  const fm = entry.frontmatter;
  const path = hrefFor("civilization", slug);
  const related = await getRelatedAndBacklinks(
    "civilization",
    slug,
    fm.related,
  );
  const figures = await resolveRefs(fm.relatedFigures);
  const themes = await resolveRefs(fm.relatedThemes);
  const books = await resolveRefs(fm.relatedBooks);
  const essays = await resolveRefs(fm.relatedEssays);

  const gallery = (fm.galleryImages ?? [])
    .map((s) => getArchiveImage(s))
    .filter(
      (i): i is NonNullable<ReturnType<typeof getArchiveImage>> =>
        i !== undefined,
    );

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Civilizations", href: "/civilizations" },
            { name: fm.title, href: path },
          ]),
          articleJsonLd({
            headline: fm.title,
            description: fm.description,
            url: path,
            dateModified: fm.updated,
            section: "Civilizations",
          }),
        ]}
      />
      <PageHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Civilizations", href: "/civilizations" },
          { label: fm.title },
        ]}
        eyebrow={fm.civilizationType}
        title={fm.title}
        description={fm.subtitle}
        meta={fm.period}
      />
      {fm.heroImage ? (
        <Container width="editorial" className="pt-4 pb-12">
          <ArchiveImage
            slug={fm.heroImage}
            priority
            sizes="(min-width: 1280px) 1100px, (min-width: 768px) 90vw, 100vw"
          />
        </Container>
      ) : null}
      <Container width="editorial" className="py-12">
        <div className="grid gap-16 md:grid-cols-12">
          <article className="md:col-span-8">
            {fm.status === "stub" ? <StubNotice /> : null}
            <MdxContent source={entry.body} />
          </article>
          <aside className="md:col-span-4 md:border-l md:border-rule md:pl-10">
            <p className="vp-eyebrow">Hub overview</p>
            <dl className="mt-4 space-y-3 text-sm text-charcoal-100">
              <div>
                <dt className="text-xs uppercase tracking-eyebrow text-stone">
                  Type
                </dt>
                <dd>{fm.civilizationType}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-eyebrow text-stone">
                  Period
                </dt>
                <dd>{fm.period}</dd>
              </div>
            </dl>
            {figures.length ? (
              <div className="mt-8">
                <p className="vp-eyebrow">Figures</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {figures.map(({ ref, entry: f }) => (
                    <li key={`${ref.kind}-${ref.slug}`}>
                      <a
                        href={hrefFor(ref.kind, ref.slug)}
                        className="vp-link text-charcoal-100"
                      >
                        {f.frontmatter.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {themes.length ? (
              <div className="mt-8">
                <p className="vp-eyebrow">Themes</p>
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
            {books.length ? (
              <div className="mt-8">
                <p className="vp-eyebrow">Primary texts</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {books.map(({ ref, entry: b }) => (
                    <li key={`${ref.kind}-${ref.slug}`}>
                      <a
                        href={hrefFor(ref.kind, ref.slug)}
                        className="vp-link text-charcoal-100"
                      >
                        {b.frontmatter.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {essays.length ? (
              <div className="mt-8">
                <p className="vp-eyebrow">Essays</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {essays.map(({ ref, entry: e }) => (
                    <li key={`${ref.kind}-${ref.slug}`}>
                      <a
                        href={hrefFor(ref.kind, ref.slug)}
                        className="vp-link text-charcoal-100"
                      >
                        {e.frontmatter.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>
        </div>
      </Container>
      {gallery.length ? (
        <Container width="editorial" className="border-t border-rule py-16">
          <p className="vp-eyebrow mb-10">Gallery</p>
          <div className="grid gap-10 md:grid-cols-2">
            {gallery.map((g) => (
              <ArchiveImage
                key={g.slug}
                entry={g}
                sizes="(min-width: 1280px) 540px, (min-width: 768px) 45vw, 100vw"
              />
            ))}
          </div>
        </Container>
      ) : null}
      <Container width="editorial" className="pb-16">
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
