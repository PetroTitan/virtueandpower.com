import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/editorial/PageHeader";
import { EvidenceKey } from "@/components/editorial/EvidenceBadge";
import { ProvenancePanel } from "@/components/editorial/ProvenancePanel";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArchiveImage } from "@/components/site/ArchiveImage";
import { BustImage } from "@/components/site/BustImage";
import { busts } from "@/data/busts";
import { getArchiveImage } from "@/data/archive-images";
import { OBJECT_PROVENANCE, getObject } from "@/data/object-provenance";
import { getMuseum } from "@/data/museums";
import { getCity } from "@/data/cities";
import { getPhilosophers, hrefFor } from "@/content/loader";
import { articleJsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return OBJECT_PROVENANCE.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const o = getObject(slug);
  if (!o) return {};
  return buildMetadata({
    title: o.title,
    description: `${o.objectType}. ${o.identification.note ?? o.identification.claim}`.slice(0, 300),
    path: `/objects/${o.slug}`,
    type: "article",
    modifiedTime: "2026-07-28",
  });
}

export default async function ObjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const o = getObject(slug);
  if (!o) notFound();

  const path = `/objects/${o.slug}`;
  const museum = o.museumSlug ? getMuseum(o.museumSlug) : undefined;
  const bust =
    o.objectRef.kind === "bust"
      ? busts.find((b) => b.slug === o.objectRef.slug)
      : undefined;
  const archive =
    o.objectRef.kind === "archive-image"
      ? getArchiveImage(o.objectRef.slug)
      : undefined;
  const figures = await getPhilosophers();
  const figure = o.figureSlug
    ? figures.find((f) => f.slug === o.figureSlug)
    : undefined;
  const cities = (o.citySlugs ?? []).map(getCity).filter(Boolean);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Museums", href: "/museums" },
            { name: o.title, href: path },
          ]),
          articleJsonLd({
            headline: o.title,
            description: o.objectType,
            url: path,
            dateModified: "2026-07-28",
            section: "Objects",
          }),
        ]}
      />
      <PageHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Museums", href: "/museums" },
          { label: o.title },
        ]}
        eyebrow={
          o.objectStatus === "modern-commemorative"
            ? "Modern commemorative object"
            : "Ancient object"
        }
        title={o.title}
        description={o.objectType}
        meta={museum ? `${museum.name}, ${museum.city}` : o.displayContext}
      />
      <Container width="editorial" className="py-12">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-7">
            {bust ? <BustImage bust={bust} /> : null}
            {archive ? <ArchiveImage slug={archive.slug} /> : null}
          </div>
          <div className="md:col-span-5">
            <ProvenancePanel object={o} variant="full" />
          </div>
        </div>

        {o.bibliography?.length ? (
          <section className="mt-14">
            <h2 className="vp-eyebrow border-b border-rule pb-3">
              Bibliography and comparanda
            </h2>
            <ul className="mt-6 space-y-4">
              {o.bibliography.map((b) => (
                <li key={b.work} className="border-l border-rule pl-5">
                  <p className="text-charcoal">
                    {b.author ? `${b.author}, ` : ""}
                    <em>{b.work}</em>
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-charcoal-100">
                    {b.summary}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="mt-14 border-t border-rule pt-8">
          <p className="vp-eyebrow">Read across</p>
          <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm">
            {figure ? (
              <li>
                <Link
                  href={hrefFor("philosopher", figure.slug)}
                  className="vp-link text-charcoal-100"
                >
                  {figure.frontmatter.title}
                </Link>
              </li>
            ) : null}
            {museum ? (
              <li>
                <Link
                  href={`/museums/${museum.slug}`}
                  className="vp-link text-charcoal-100"
                >
                  {museum.name}
                </Link>
              </li>
            ) : null}
            {cities.map((c) => (
              <li key={c!.slug}>
                <Link href={`/cities/${c!.slug}`} className="vp-link text-charcoal-100">
                  {c!.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/museums" className="vp-link text-charcoal-100">
                All museums and objects
              </Link>
            </li>
          </ul>
        </section>

        <EvidenceKey className="mt-16" />
      </Container>
    </>
  );
}
