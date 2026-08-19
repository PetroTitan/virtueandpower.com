import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/editorial/PageHeader";
import { RelatedReading } from "@/components/editorial/RelatedReading";
import {
  EvidenceBadge,
  EvidenceKey,
} from "@/components/editorial/EvidenceBadge";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArchiveImage } from "@/components/site/ArchiveImage";
import { getArchiveImage } from "@/data/archive-images";
import {
  CONDITION_LABEL,
  MONUMENTS,
  MONUMENT_KIND_LABEL,
  ROLE_LABEL,
  getMonument,
} from "@/data/monuments";
import {
  DATE_PRECISION_LABEL,
  SITE_REGION_LABEL,
  getSite,
} from "@/data/archaeological-sites";
import { getCity } from "@/data/cities";
import { getArchitectureTopic } from "@/data/architecture";
import { getMuseum } from "@/data/museums";
import { getObject } from "@/data/object-provenance";
import { getInstitution } from "@/data/institutions";
import { getCultPractice } from "@/data/religion";
import { getWarfareTopic } from "@/data/warfare";
import { getBattle } from "@/data/battles";
import { getMap } from "@/data/maps";
import {
  getBooks,
  getCivilizations,
  getPhilosophers,
  getThemes,
  hrefFor,
} from "@/content/loader";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  buildMetadata,
  landmarkJsonLd,
} from "@/lib/seo";

export const dynamicParams = false;

const UPDATED = "2026-08-19";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return MONUMENTS.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const m = getMonument(slug);
  if (!m) return {};
  return buildMetadata({
    title: `${m.title} — history, construction and survival`,
    description: m.description,
    path: `/monuments/${m.slug}`,
    type: "article",
    modifiedTime: UPDATED,
  });
}

export default async function MonumentPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const m = getMonument(slug);
  if (!m) notFound();

  const path = `/monuments/${m.slug}`;
  const [allCivs, allFigures, allThemes, allBooks] = await Promise.all([
    getCivilizations(),
    getPhilosophers(),
    getThemes(),
    getBooks(),
  ]);
  const pick = <T extends { slug: string }>(all: T[], slugs: string[]) =>
    slugs
      .map((x) => all.find((y) => y.slug === x))
      .filter((y): y is T => Boolean(y));

  const civs = pick(allCivs, m.civilizations);
  const figures = pick(allFigures, m.figureRefs);
  const themes = pick(allThemes, m.themeRefs);
  const books = pick(allBooks, m.bookRefs);

  const site = m.siteSlug ? getSite(m.siteSlug) : undefined;
  const city = m.citySlug ? getCity(m.citySlug) : undefined;
  const types = m.architectureRefs.map(getArchitectureTopic).filter(Boolean);
  const museums = m.museumSlugs.map(getMuseum).filter(Boolean);
  const objects = m.objectSlugs.map(getObject).filter(Boolean);
  const institutions = m.institutionRefs.map(getInstitution).filter(Boolean);
  const religion = m.religionRefs.map(getCultPractice).filter(Boolean);
  const warfare = m.warfareRefs.map(getWarfareTopic).filter(Boolean);
  const battles = m.battleRefs.map(getBattle).filter(Boolean);
  const monumentMaps = m.mapSlugs.map(getMap).filter(Boolean);
  const others = m.relatedMonuments.map(getMonument).filter(Boolean);

  const hero = m.imageSlug ? getArchiveImage(m.imageSlug) : undefined;
  const gallery = (m.gallerySlugs ?? []).filter((g) =>
    Boolean(getArchiveImage(g)),
  );

  const placeLine = site
    ? `${site.name}, ${site.geography.modernCountry}`
    : city
      ? `${city.name}, ${city.country}`
      : m.modernLocation;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Monuments", href: "/monuments" },
            { name: m.title, href: path },
          ]),
          articleJsonLd({
            headline: `${m.title} — history, construction and survival`,
            description: m.description,
            url: path,
            dateModified: UPDATED,
            section: "Monuments",
          }),
          landmarkJsonLd({
            name: m.title,
            url: path,
            description: m.description,
            alternateName: m.alternateNames?.[0],
            addressCountry: site?.geography.modernCountry ?? city?.country,
          }),
        ]}
      />
      <PageHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Monuments", href: "/monuments" },
          { label: m.title },
        ]}
        eyebrow={MONUMENT_KIND_LABEL[m.kind]}
        title={m.title}
        description={m.standfirst}
        meta={`${placeLine} · ${m.chronology.display} · ${CONDITION_LABEL[m.survival.condition]}`}
      />

      {hero ? (
        <Container width="editorial" className="pt-4 pb-12">
          <ArchiveImage
            slug={m.imageSlug as string}
            priority
            sizes="(min-width: 1280px) 1100px, (min-width: 768px) 90vw, 100vw"
          />
        </Container>
      ) : null}

      <Container width="editorial" className="py-16">
        {/*
          The four-entity disambiguation. A reader arriving here is told at
          once which of city, site, monument and building type they are on,
          and where the other three are. The gate enforces that the four
          cannot share a slug, a title or a section heading.
        */}
        <p className="mb-12 border-l-2 border-bronze-50 bg-parchment-50 py-4 pl-5 pr-4 text-sm leading-relaxed text-charcoal-100">
          This page is about <strong>{m.title} as one building</strong>.
          {site ? (
            <>
              {" "}
              For the excavated site it stands on, see{" "}
              <Link href={`/archaeology/${site.slug}`} className="vp-link">
                {site.name}
              </Link>
              .
            </>
          ) : null}
          {city ? (
            <>
              {" "}
              For the city, see{" "}
              <Link href={`/cities/${city.slug}`} className="vp-link">
                {city.name}
              </Link>
              .
            </>
          ) : null}
          {types.length ? (
            <>
              {" "}
              For the building type,{" "}
              <Link
                href={`/architecture/${types[0]!.slug}`}
                className="vp-link"
              >
                {types[0]!.title}
              </Link>
              .
            </>
          ) : null}
          {m.unplacedNote ? <> {m.unplacedNote}</> : null}
        </p>

        <div className="grid gap-16 md:grid-cols-12">
          <article className="md:col-span-8">
            <div className="vp-prose">
              <h2>What it is</h2>
              <p>{m.description}</p>
              <p>
                Built {m.chronology.display}. The principal date,{" "}
                {m.chronology.built.display}, is{" "}
                <em>{DATE_PRECISION_LABEL[m.chronology.built.precision]}</em>.
              </p>
            </div>
            <div className="mt-6">
              {m.chronology.phases.map((p) => (
                <div
                  key={p.label}
                  className="border-t border-rule py-5 first:border-t-0 first:pt-0"
                >
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                    <EvidenceBadge level={p.level} />
                    <p className="text-xs uppercase tracking-eyebrow text-stone">
                      {p.display}
                    </p>
                  </div>
                  <h3 className="mt-2 font-serif text-lg text-charcoal">
                    {p.label}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-charcoal-100">
                    {p.note}
                  </p>
                </div>
              ))}
            </div>

            <div className="vp-prose mt-12">
              <h2>Who ordered it built</h2>
              <p>
                Each attribution carries what supports it. Ancient buildings
                are routinely credited to people on the authority of writers
                centuries later, and that is not the same claim as an
                inscription on the building.
              </p>
            </div>
            <ul className="mt-6 space-y-6">
              {m.attributions.map((p) => {
                const figure = p.figureSlug
                  ? allFigures.find((f) => f.slug === p.figureSlug)
                  : undefined;
                return (
                  <li
                    key={`${p.role}-${p.name}`}
                    className="border-l border-rule pl-5"
                  >
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                      <EvidenceBadge level={p.level} />
                      <p className="text-xs uppercase tracking-eyebrow text-stone">
                        {ROLE_LABEL[p.role]}
                      </p>
                    </div>
                    <h3 className="mt-2 font-serif text-xl text-charcoal">
                      {figure ? (
                        <Link
                          href={hrefFor("philosopher", figure.slug)}
                          className="hover:text-bronze"
                        >
                          {p.name}
                        </Link>
                      ) : (
                        p.name
                      )}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-charcoal-100">
                      {p.basis}
                    </p>
                  </li>
                );
              })}
            </ul>

            <div className="vp-prose mt-12">
              <h2>What it was for</h2>
              {m.originalFunction.map((p) => (
                <p key={p.slice(0, 44)}>{p}</p>
              ))}

              <h2>How it was built</h2>
              {m.construction.map((p) => (
                <p key={p.slice(0, 44)}>{p}</p>
              ))}
            </div>

            <section className="mt-10">
              <h3 className="vp-eyebrow border-b border-rule pb-3">Materials</h3>
              <ul className="mt-5 space-y-4">
                {m.materials.map((x) => (
                  <li key={x.material} className="border-l border-rule pl-5">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <EvidenceBadge level={x.level} />
                      <p className="font-serif text-base text-charcoal">
                        {x.material}
                      </p>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-charcoal-100">
                      {x.use}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            {gallery.length ? (
              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                {gallery.map((g) => (
                  <ArchiveImage
                    key={g}
                    slug={g}
                    sizes="(min-width: 768px) 45vw, 100vw"
                  />
                ))}
              </div>
            ) : null}

            <div className="vp-prose mt-12">
              <h2>Measured</h2>
              <p>
                Every figure states what it rests on. A modern survey, an
                ancient text, a conversion from an ancient unit and a modern
                estimate are four different kinds of statement and are not
                interchangeable.
              </p>
            </div>
            <div className="mt-6">
              {m.measurements.map((d) => (
                <div
                  key={d.label}
                  className="border-t border-rule py-5 first:border-t-0 first:pt-0"
                >
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                    <EvidenceBadge level={d.level} />
                    <p className="text-xs uppercase tracking-eyebrow text-stone">
                      {d.label}
                    </p>
                  </div>
                  <p className="mt-2 font-serif text-lg text-charcoal">
                    {d.value}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-stone-400">
                    {d.basis}
                  </p>
                  {d.note ? (
                    <p className="mt-2 text-sm leading-relaxed text-charcoal-100">
                      {d.note}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="vp-prose mt-12">
              <h2>What it meant</h2>
              {m.politicalMeaning.map((p) => (
                <p key={p.slice(0, 44)}>{p}</p>
              ))}
              {m.religiousMeaning?.map((p) => (
                <p key={p.slice(0, 44)}>{p}</p>
              ))}

              <h2>After antiquity</h2>
              {m.laterHistory.map((p) => (
                <p key={p.slice(0, 44)}>{p}</p>
              ))}
            </div>

            <div className="vp-prose mt-12">
              <h2>Condition today</h2>
            </div>
            <div className="mt-5 border-l border-rule pl-5">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <EvidenceBadge level={m.survival.level} />
                <p className="text-xs uppercase tracking-eyebrow text-stone">
                  {CONDITION_LABEL[m.survival.condition]}
                </p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-charcoal-100">
                {m.survival.note}
              </p>
            </div>
            {m.restoration?.length ? (
              <div className="vp-prose mt-8">
                {m.restoration.map((p) => (
                  <p key={p.slice(0, 44)}>{p}</p>
                ))}
              </div>
            ) : null}
            <div className="vp-prose mt-8">
              {m.archaeology.map((p) => (
                <p key={p.slice(0, 44)}>{p}</p>
              ))}
            </div>

            {m.fragments.length ? (
              <>
                <div className="vp-prose mt-12">
                  <h2>Scattered fragments</h2>
                  <p>
                    What has left the building, and where it is now. Where a
                    holding is contested, the museum page says so.
                  </p>
                </div>
                <ul className="mt-6 space-y-6">
                  {m.fragments.map((f) => {
                    const museum = f.museumSlug
                      ? getMuseum(f.museumSlug)
                      : undefined;
                    const object = f.objectSlug
                      ? getObject(f.objectSlug)
                      : undefined;
                    return (
                      <li key={f.what} className="border-l border-rule pl-5">
                        <EvidenceBadge level={f.level} />
                        <h3 className="mt-2 font-serif text-lg text-charcoal">
                          {f.what}
                        </h3>
                        <p className="mt-2 text-sm text-stone-400">
                          {museum ? (
                            <Link
                              href={`/museums/${museum.slug}`}
                              className="vp-link text-charcoal-100"
                            >
                              {museum.name}, {museum.city}
                            </Link>
                          ) : (
                            f.heldAt
                          )}
                          {object ? (
                            <>
                              {" · "}
                              <Link
                                href={`/objects/${object.slug}`}
                                className="vp-link text-charcoal-100"
                              >
                                Full provenance record
                              </Link>
                            </>
                          ) : null}
                        </p>
                        {f.note ? (
                          <p className="mt-2 text-sm leading-relaxed text-charcoal-100">
                            {f.note}
                          </p>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              </>
            ) : null}

            <div className="vp-prose mt-12">
              <h2>Written about in antiquity</h2>
              {m.noAncientTestimony ? <p>{m.noAncientTestimony}</p> : null}
            </div>
            {m.primarySources.length ? (
              <ul className="mt-6 space-y-4">
                {m.primarySources.map((src) => (
                  <li
                    key={`${src.work}-${src.locus ?? ""}`}
                    className="border-l border-rule pl-5"
                  >
                    <p className="text-charcoal">
                      {src.author ? `${src.author}, ` : ""}
                      <em>{src.work}</em>
                      {src.locus && src.locus !== "throughout"
                        ? ` ${src.locus}`
                        : ""}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-charcoal-100">
                      {src.summary}
                    </p>
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="vp-prose mt-12">
              <h2>Still argued</h2>
            </div>
            <div className="mt-6">
              {m.disputes.map((d) => (
                <div
                  key={d.question}
                  className="border-t border-rule py-5 first:border-t-0 first:pt-0"
                >
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                    <EvidenceBadge level={d.level} />
                    <p className="flex-1 font-serif text-lg text-charcoal">
                      {d.question}
                    </p>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-charcoal-100">
                    {d.positions}
                  </p>
                </div>
              ))}
            </div>

            <EvidenceKey className="mt-16" />
          </article>

          <aside className="md:col-span-4 md:border-l md:border-rule md:pl-10">
            <p className="vp-eyebrow">The building</p>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-eyebrow text-stone">
                  Type
                </dt>
                <dd className="text-charcoal-100">
                  {MONUMENT_KIND_LABEL[m.kind]}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-eyebrow text-stone">
                  Condition
                </dt>
                <dd className="text-charcoal-100">
                  {CONDITION_LABEL[m.survival.condition]}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-eyebrow text-stone">
                  Today
                </dt>
                <dd className="text-charcoal-100">{m.modernLocation}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-eyebrow text-stone">
                  Region
                </dt>
                <dd className="text-charcoal-100">
                  {SITE_REGION_LABEL[m.region]}
                </dd>
              </div>
              {m.alternateNames?.length ? (
                <div>
                  <dt className="text-xs uppercase tracking-eyebrow text-stone">
                    Also known as
                  </dt>
                  <dd className="text-charcoal-100">
                    {m.alternateNames.join(", ")}
                  </dd>
                </div>
              ) : null}
            </dl>

            {site || city ? (
              <>
                <p className="vp-eyebrow mt-8">Where it stands</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {site ? (
                    <li>
                      <Link
                        href={`/archaeology/${site.slug}`}
                        className="vp-link text-charcoal-100"
                      >
                        {site.name}
                      </Link>
                    </li>
                  ) : null}
                  {city ? (
                    <li>
                      <Link
                        href={`/cities/${city.slug}`}
                        className="vp-link text-charcoal-100"
                      >
                        {city.name}
                      </Link>
                    </li>
                  ) : null}
                </ul>
              </>
            ) : null}

            {types.length ? (
              <>
                <p className="vp-eyebrow mt-8">Building types</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {types.map((t) => (
                    <li key={t!.slug}>
                      <Link
                        href={`/architecture/${t!.slug}`}
                        className="vp-link text-charcoal-100"
                      >
                        {t!.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            {civs.length ? (
              <>
                <p className="vp-eyebrow mt-8">Civilizations</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {civs.map((x) => (
                    <li key={x.slug}>
                      <Link
                        href={hrefFor("civilization", x.slug)}
                        className="vp-link text-charcoal-100"
                      >
                        {x.frontmatter.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            {museums.length || objects.length ? (
              <>
                <p className="vp-eyebrow mt-8">Museums and objects</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {museums.map((x) => (
                    <li key={x!.slug}>
                      <Link
                        href={`/museums/${x!.slug}`}
                        className="vp-link text-charcoal-100"
                      >
                        {x!.name}
                      </Link>
                    </li>
                  ))}
                  {objects.map((o) => (
                    <li key={o!.slug}>
                      <Link
                        href={`/objects/${o!.slug}`}
                        className="vp-link text-charcoal-100"
                      >
                        {o!.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            {institutions.length ? (
              <>
                <p className="vp-eyebrow mt-8">Institutions</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {institutions.map((i) => (
                    <li key={i!.slug}>
                      <Link
                        href={`/institutions/${i!.slug}`}
                        className="vp-link text-charcoal-100"
                      >
                        {i!.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            {religion.length ? (
              <>
                <p className="vp-eyebrow mt-8">Religion</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {religion.map((r) => (
                    <li key={r!.slug}>
                      <Link
                        href={`/ancient-religion/${r!.slug}`}
                        className="vp-link text-charcoal-100"
                      >
                        {r!.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            {warfare.length || battles.length ? (
              <>
                <p className="vp-eyebrow mt-8">Warfare</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {warfare.map((w) => (
                    <li key={w!.slug}>
                      <Link
                        href={`/warfare/${w!.slug}`}
                        className="vp-link text-charcoal-100"
                      >
                        {w!.title}
                      </Link>
                    </li>
                  ))}
                  {battles.map((b) => (
                    <li key={b!.slug}>
                      <Link
                        href={`/warfare/battles/${b!.slug}`}
                        className="vp-link text-charcoal-100"
                      >
                        {b!.name}, {b!.date}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            {figures.length ? (
              <>
                <p className="vp-eyebrow mt-8">Figures</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {figures.map((f) => (
                    <li key={f.slug}>
                      <Link
                        href={hrefFor("philosopher", f.slug)}
                        className="vp-link text-charcoal-100"
                      >
                        {f.frontmatter.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            {books.length ? (
              <>
                <p className="vp-eyebrow mt-8">Texts</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {books.map((b) => (
                    <li key={b.slug}>
                      <Link
                        href={hrefFor("book", b.slug)}
                        className="vp-link text-charcoal-100"
                      >
                        {b.frontmatter.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            {themes.length ? (
              <>
                <p className="vp-eyebrow mt-8">Themes</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {themes.map((t) => (
                    <li key={t.slug}>
                      <Link
                        href={hrefFor("theme", t.slug)}
                        className="vp-link text-charcoal-100"
                      >
                        {t.frontmatter.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            {monumentMaps.length ? (
              <>
                <p className="vp-eyebrow mt-8">Maps</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {monumentMaps.map((x) => (
                    <li key={x!.slug}>
                      <Link
                        href={`/maps/${x!.slug}`}
                        className="vp-link text-charcoal-100"
                      >
                        {x!.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            <p className="vp-eyebrow mt-8">More</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/monuments" className="vp-link text-charcoal-100">
                  All monuments
                </Link>
              </li>
              <li>
                <Link href="/architecture" className="vp-link text-charcoal-100">
                  Building types
                </Link>
              </li>
              <li>
                <Link href="/archaeology" className="vp-link text-charcoal-100">
                  Archaeological sites
                </Link>
              </li>
            </ul>
          </aside>
        </div>

        {others.length ? (
          <RelatedReading
            title="Other monuments"
            items={others.map((x) => ({
              href: `/monuments/${x!.slug}`,
              title: x!.title,
              kind: CONDITION_LABEL[x!.survival.condition],
              excerpt: x!.standfirst,
            }))}
          />
        ) : null}
      </Container>
    </>
  );
}
