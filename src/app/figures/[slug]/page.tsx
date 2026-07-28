import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/editorial/PageHeader";
import { RelatedReading } from "@/components/editorial/RelatedReading";
import { StubNotice } from "@/components/editorial/StubNotice";
import { EvidenceBadge } from "@/components/editorial/EvidenceBadge";
import { JsonLd } from "@/components/seo/JsonLd";
import { MdxContent } from "@/content/mdx";
import {
  getEntryBySlug,
  getFigures,
  getRelatedAndBacklinks,
  hrefFor,
  resolveRefs,
} from "@/content/loader";
import { getEvidenceLevel } from "@/data/evidence";
import { articleJsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

type Params = { slug: string };

const FIGURE_TYPE_LABEL: Record<string, string> = {
  mortal: "Mortal character of the tradition",
  divine: "Divine power of the tradition",
  monstrous: "Monstrous figure of the tradition",
  composite: "Composite figure of several traditions",
};

export async function generateStaticParams(): Promise<Params[]> {
  const all = await getFigures();
  return all.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getEntryBySlug("figure", slug);
  if (!entry) return {};
  return buildMetadata({
    title: entry.frontmatter.title,
    description: entry.frontmatter.description,
    path: hrefFor("figure", slug),
    type: "article",
    modifiedTime: entry.frontmatter.updated,
    noindex: entry.frontmatter.status === "stub",
  });
}

export default async function FigurePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const entry = await getEntryBySlug("figure", slug);
  if (!entry) notFound();

  const fm = entry.frontmatter;
  const path = hrefFor("figure", slug);
  const related = await getRelatedAndBacklinks("figure", slug, fm.related);
  const texts = await resolveRefs(fm.primaryTexts);
  const figures = await resolveRefs(fm.relatedFigures);
  const themes = await resolveRefs(fm.relatedThemes);
  const historicity = getEvidenceLevel(fm.historicity);

  return (
    <>
      {/*
        Deliberately no Person JSON-LD. schema.org/Person describes people;
        these pages describe characters a tradition preserves. Emitting
        Person here would assert in machine-readable form exactly the
        myth-as-history conflation the cluster exists to avoid.
      */}
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Figures of the tradition", href: "/figures" },
            { name: fm.title, href: path },
          ]),
          articleJsonLd({
            headline: fm.title,
            description: fm.description,
            url: path,
            dateModified: fm.updated,
            section: "Figures of the tradition",
          }),
        ]}
      />
      <PageHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Figures", href: "/figures" },
          { label: fm.title },
        ]}
        eyebrow={FIGURE_TYPE_LABEL[fm.figureType] ?? "Figure of the tradition"}
        title={fm.title}
        description={fm.subtitle ?? fm.description}
        meta={fm.cycle}
      />
      <Container width="editorial" className="py-16">
        <div className="grid gap-16 md:grid-cols-12">
          <article className="md:col-span-8">
            {fm.status === "stub" ? <StubNotice /> : null}
            <div className="mb-10 border-l-2 border-rule bg-parchment-50 py-5 pl-6 pr-5">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <EvidenceBadge level={fm.historicity} />
                <p className="text-xs uppercase tracking-eyebrow text-stone">
                  Historicity of this figure
                </p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-charcoal-100">
                {historicity.definition} This page describes a figure of a
                literary and mythological tradition. Where the tradition
                disagrees with itself, the disagreement is set out rather
                than resolved.
              </p>
            </div>
            <MdxContent source={entry.body} />
          </article>
          <aside className="md:col-span-4 md:border-l md:border-rule md:pl-10">
            <p className="vp-eyebrow">Which source preserves what</p>
            <dl className="mt-4 space-y-4 text-sm">
              {fm.attestedIn.map((a) => (
                <div key={`${a.source}-${a.tradition.slice(0, 24)}`}>
                  <dt className="text-xs uppercase tracking-eyebrow text-stone">
                    {a.source}
                  </dt>
                  <dd className="mt-1 text-charcoal-100">{a.tradition}</dd>
                </div>
              ))}
            </dl>
            {texts.length ? (
              <div className="mt-8">
                <p className="vp-eyebrow">Appears in</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {texts.map(({ ref, entry: t }) => (
                    <li key={`${ref.kind}-${ref.slug}`}>
                      <Link
                        href={hrefFor(ref.kind, ref.slug)}
                        className="vp-link text-charcoal-100"
                      >
                        {t.frontmatter.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {figures.length ? (
              <div className="mt-8">
                <p className="vp-eyebrow">In the same tradition</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {figures.map(({ ref, entry: t }) => (
                    <li key={`${ref.kind}-${ref.slug}`}>
                      <Link
                        href={hrefFor(ref.kind, ref.slug)}
                        className="vp-link text-charcoal-100"
                      >
                        {t.frontmatter.title}
                      </Link>
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
                      <Link
                        href={hrefFor(ref.kind, ref.slug)}
                        className="vp-link text-charcoal-100"
                      >
                        {t.frontmatter.title}
                      </Link>
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
