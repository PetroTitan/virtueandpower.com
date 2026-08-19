import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/editorial/PageHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { MUSEUMS, getMuseum } from "@/data/museums";
import { objectsForMuseum } from "@/data/object-provenance";
import { getCity } from "@/data/cities";
import { sitesForMuseum } from "@/data/archaeological-sites";
import { articleJsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return MUSEUMS.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const m = getMuseum(slug);
  if (!m) return {};
  return buildMetadata({
    title: `${m.name}, ${m.city}`,
    description: m.description,
    path: `/museums/${m.slug}`,
    type: "article",
    modifiedTime: "2026-07-28",
  });
}

export default async function MuseumPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const m = getMuseum(slug);
  if (!m) notFound();

  const path = `/museums/${m.slug}`;
  const objects = objectsForMuseum(m.slug);
  const cities = m.citySlugs.map(getCity).filter(Boolean);
  const digs = sitesForMuseum(m.slug);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Museums", href: "/museums" },
            { name: m.name, href: path },
          ]),
          articleJsonLd({
            headline: `${m.name}, ${m.city}`,
            description: m.description,
            url: path,
            dateModified: "2026-07-28",
            section: "Museums",
          }),
        ]}
      />
      <PageHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Museums", href: "/museums" },
          { label: m.name },
        ]}
        eyebrow="Museum"
        title={m.name}
        description={m.standfirst}
        meta={`${m.city}, ${m.country}${m.founded ? ` · founded ${m.founded}` : ""}`}
      />
      <Container width="editorial" className="py-16">
        <div className="grid gap-16 md:grid-cols-12">
          <article className="md:col-span-8">
            <div className="vp-prose">
              <h2>Scope</h2>
              <p>{m.scope}</p>
              <h2>History of the collection</h2>
              {m.history.map((p) => (
                <p key={p.slice(0, 44)}>{p}</p>
              ))}
              <h2>Collection notes</h2>
              {m.collectionNotes.map((p) => (
                <p key={p.slice(0, 44)}>{p}</p>
              ))}
            </div>

            {m.contested?.length ? (
              <section className="mt-12">
                <h2 className="vp-eyebrow border-b border-rule pb-3">
                  Contested holdings
                </h2>
                <p className="mt-4 max-w-prose text-sm text-stone-400">
                  Recorded because a collection description that omits a
                  live claim is not describing the collection. The platform
                  states the dispute and does not adjudicate it.
                </p>
                <ul className="mt-6 space-y-6">
                  {m.contested.map((c) => (
                    <li key={c.object} className="border-l-2 border-bronze-50 pl-5">
                      <h3 className="font-serif text-lg text-charcoal">
                        {c.object}
                      </h3>
                      <p className="mt-1 text-xs uppercase tracking-eyebrow text-stone">
                        Claimed by: {c.claimant}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-charcoal-100">
                        {c.note}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {objects.length ? (
              <section className="mt-12">
                <h2 className="vp-eyebrow border-b border-rule pb-3">
                  Objects in this catalogue
                </h2>
                <ul className="mt-6 space-y-5">
                  {objects.map((o) => (
                    <li key={o.slug} className="border-l border-rule pl-5">
                      <div className="flex flex-wrap items-baseline gap-x-3">
                        <h3 className="font-serif text-lg text-charcoal">
                          <Link href={`/objects/${o.slug}`} className="hover:text-bronze">
                            {o.title}
                          </Link>
                        </h3>
                        <span className="text-[0.62rem] uppercase tracking-eyebrow text-stone-400">
                          {o.completeness === "full"
                            ? "Record checked"
                            : "Record incomplete"}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-charcoal-100">
                        {o.objectType} · {o.dateMade.claim}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </article>

          <aside className="md:col-span-4 md:border-l md:border-rule md:pl-10">
            {digs.length ? (
              <>
                <p className="vp-eyebrow">Excavations it holds material from</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {digs.map((d) => (
                    <li key={d.slug}>
                      <Link
                        href={`/archaeology/${d.slug}`}
                        className="vp-link text-charcoal-100"
                      >
                        {d.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
            {cities.length ? (
              <>
                <p className={`vp-eyebrow${digs.length ? " mt-8" : ""}`}>
                  Cities it holds material from
                </p>
                <ul className="mt-3 space-y-2 text-sm">
                  {cities.map((c) => (
                    <li key={c!.slug}>
                      <Link href={`/cities/${c!.slug}`} className="vp-link text-charcoal-100">
                        {c!.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
            {m.url ? (
              <>
                <p className="vp-eyebrow mt-8">Collection online</p>
                <p className="mt-3 text-sm">
                  <a href={m.url} className="vp-link text-charcoal-100">
                    {m.name}
                  </a>
                </p>
              </>
            ) : null}
            <p className="vp-eyebrow mt-8">More</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/museums" className="vp-link text-charcoal-100">
                  All museums
                </Link>
              </li>
              <li>
                <Link href="/archaeology" className="vp-link text-charcoal-100">
                  Archaeological sites
                </Link>
              </li>
              <li>
                <Link href="/cities" className="vp-link text-charcoal-100">
                  Ancient cities
                </Link>
              </li>
            </ul>
          </aside>
        </div>
      </Container>
    </>
  );
}
