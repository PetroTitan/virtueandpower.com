import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/editorial/PageHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArchiveImage } from "@/components/site/ArchiveImage";
import { getMap, maps } from "@/data/maps";
import { articleJsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return maps.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const map = getMap(slug);
  if (!map) return {};
  return buildMetadata({
    title: map.title,
    description: map.description,
    path: `/maps/${slug}`,
    type: "article",
    modifiedTime: map.updated,
  });
}

export default async function MapPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const map = getMap(slug);
  if (!map) notFound();

  const path = `/maps/${slug}`;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Maps", href: "/maps" },
            { name: map.title, href: path },
          ]),
          articleJsonLd({
            headline: map.title,
            description: map.description,
            url: path,
            dateModified: map.updated,
            section: "Maps",
          }),
        ]}
      />
      <PageHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Maps", href: "/maps" },
          { label: map.title },
        ]}
        eyebrow={map.eyebrow}
        title={map.title}
        description={map.description}
      />
      <Container width="editorial" className="pt-4 pb-12">
        <ArchiveImage
          slug={map.imageSlug}
          priority
          sizes="(min-width: 1280px) 1100px, (min-width: 768px) 90vw, 100vw"
        />
      </Container>
      <Container width="editorial" className="py-12">
        <div className="grid gap-16 md:grid-cols-12">
          <article className="md:col-span-8 vp-prose">
            {map.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <h2>Key locations</h2>
            <ul>
              {map.keyLocations.map((loc) => (
                <li key={loc.name}>
                  <strong>{loc.name}</strong> — {loc.note}
                </li>
              ))}
            </ul>
          </article>
          <aside className="md:col-span-4 md:border-l md:border-rule md:pl-10">
            <p className="vp-eyebrow">Related</p>
            <ul className="mt-4 space-y-2 text-sm">
              {map.related.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="vp-link text-charcoal-100">
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="vp-eyebrow mt-8">More</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/maps" className="vp-link text-charcoal-100">
                  All maps
                </Link>
              </li>
              <li>
                <Link href="/timelines" className="vp-link text-charcoal-100">
                  All timelines
                </Link>
              </li>
            </ul>
          </aside>
        </div>
      </Container>
    </>
  );
}
