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
  ARCHAEOLOGICAL_SITES,
  DATE_PRECISION_LABEL,
  SITE_KIND_LABEL,
  SITE_REGION_LABEL,
  formatCoordinates,
  getSite,
} from "@/data/archaeological-sites";
import { getCity } from "@/data/cities";
import { monumentsForSite } from "@/data/monuments";
import { getMuseum } from "@/data/museums";
import { getObject } from "@/data/object-provenance";
import { getArchitectureTopic } from "@/data/architecture";
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
  return ARCHAEOLOGICAL_SITES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getSite(slug);
  if (!s) return {};
  return buildMetadata({
    title: `${s.name} — the archaeological site`,
    description: s.description,
    path: `/archaeology/${s.slug}`,
    type: "article",
    modifiedTime: UPDATED,
  });
}

export default async function SitePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const s = getSite(slug);
  if (!s) notFound();

  const path = `/archaeology/${s.slug}`;
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

  const civs = pick(allCivs, s.civilizations);
  const figures = pick(allFigures, s.figureRefs);
  const themes = pick(allThemes, s.themeRefs);
  const books = pick(allBooks, s.bookRefs);

  const parentCity = s.parentCitySlug ? getCity(s.parentCitySlug) : undefined;
  const cities = s.cityRefs.map(getCity).filter(Boolean);
  const museums = s.museumSlugs.map(getMuseum).filter(Boolean);
  const objects = s.objectSlugs.map(getObject).filter(Boolean);
  const architecture = s.architectureRefs
    .map(getArchitectureTopic)
    .filter(Boolean);
  const institutions = s.institutionRefs.map(getInstitution).filter(Boolean);
  const religion = s.religionRefs.map(getCultPractice).filter(Boolean);
  const warfare = s.warfareRefs.map(getWarfareTopic).filter(Boolean);
  const battles = s.battleRefs.map(getBattle).filter(Boolean);
  const siteMaps = s.mapSlugs.map(getMap).filter(Boolean);
  const others = s.relatedSites.map(getSite).filter(Boolean);
  const monuments = monumentsForSite(s.slug);

  const hero = s.imageSlug ? getArchiveImage(s.imageSlug) : undefined;
  const gallery = (s.gallerySlugs ?? [])
    .map((g) => ({ slug: g, image: getArchiveImage(g) }))
    .filter((g) => Boolean(g.image));
  const coordinates = formatCoordinates(s.geography);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Archaeology", href: "/archaeology" },
            { name: s.name, href: path },
          ]),
          articleJsonLd({
            headline: `${s.name} — the archaeological site`,
            description: s.description,
            url: path,
            dateModified: UPDATED,
            section: "Archaeology",
          }),
          landmarkJsonLd({
            name: s.name,
            url: path,
            description: s.description,
            alternateName: s.alsoKnownAs?.[0],
            addressCountry: s.geography.modernCountry,
            latitude: s.geography.latitude,
            longitude: s.geography.longitude,
          }),
        ]}
      />
      <PageHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Archaeology", href: "/archaeology" },
          { label: s.name },
        ]}
        eyebrow={SITE_KIND_LABEL[s.kind]}
        title={s.name}
        description={s.standfirst}
        meta={`${s.geography.ancientRegion}, ${s.geography.modernCountry} · ${s.chronology.display}`}
      />

      {hero ? (
        <Container width="editorial" className="pt-4 pb-12">
          <ArchiveImage
            slug={s.imageSlug as string}
            priority
            sizes="(min-width: 1280px) 1100px, (min-width: 768px) 90vw, 100vw"
          />
        </Container>
      ) : null}

      <Container width="editorial" className="py-16">
        {/*
          Rendered wherever the site sits inside a city the platform
          covers, so a reader landing here knows within the first screen
          which of the two pages they are on. The gate enforces that the
          slugs and the section headings cannot collide.
        */}
        {parentCity ? (
          <p className="mb-12 border-l-2 border-bronze-50 bg-parchment-50 py-4 pl-5 pr-4 text-sm leading-relaxed text-charcoal-100">
            This page is about <strong>{s.name} as an excavated site</strong> —
            who dug it, what was found and where the finds are now. For the
            city it stands in, see{" "}
            <Link href={`/cities/${parentCity.slug}`} className="vp-link">
              {parentCity.name}
            </Link>
            .
          </p>
        ) : null}

        <div className="grid gap-16 md:grid-cols-12">
          <article className="md:col-span-8">
            <div className="vp-prose">
              <h2>Where the site is</h2>
              <p>{s.geography.setting}</p>
            </div>

            <dl className="mt-6 grid gap-5 border-l border-rule pl-5 sm:grid-cols-2">
              <div>
                <dt className="text-xs uppercase tracking-eyebrow text-stone">
                  Ancient region
                </dt>
                <dd className="mt-1 text-sm text-charcoal-100">
                  {s.geography.ancientRegion}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-eyebrow text-stone">
                  Modern country
                </dt>
                <dd className="mt-1 text-sm text-charcoal-100">
                  {s.geography.modernCountry}
                </dd>
              </div>
              {coordinates ? (
                <div className="sm:col-span-2">
                  <dt className="text-xs uppercase tracking-eyebrow text-stone">
                    Position
                  </dt>
                  <dd className="mt-1 text-sm text-charcoal-100">
                    {coordinates} — {s.geography.coordinateSubject}
                  </dd>
                  <dd className="mt-1 text-xs leading-relaxed text-stone-400">
                    Given to three decimal places, about a hundred metres. It
                    locates the named feature, not the extent of the site.
                  </dd>
                </div>
              ) : null}
            </dl>

            <div className="vp-prose mt-12">
              <h2>What survives</h2>
              {s.whatSurvives.map((p) => (
                <p key={p.slice(0, 44)}>{p}</p>
              ))}
            </div>

            {gallery.length ? (
              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                {gallery.map((g) => (
                  <ArchiveImage
                    key={g.slug}
                    slug={g.slug}
                    sizes="(min-width: 768px) 45vw, 100vw"
                  />
                ))}
              </div>
            ) : null}

            <div className="vp-prose mt-12">
              <h2>Occupation and chronology</h2>
              <p>
                Dates below are stored as signed years and rendered with the
                precision they actually carry.{" "}
                {s.chronology.start.display} is{" "}
                <em>{DATE_PRECISION_LABEL[s.chronology.start.precision]}</em>
                {s.chronology.end
                  ? `; ${s.chronology.end.display} is ${DATE_PRECISION_LABEL[s.chronology.end.precision]}`
                  : "; the site has no closing date because it has never gone out of use"}
                .
              </p>
            </div>
            <div className="mt-6">
              {s.chronology.phases.map((p) => (
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
              <h2>History of excavation</h2>
              <p>
                Who recovered the evidence, when, and by what method. Where an
                excavation destroyed as much as it found, the entry says so.
              </p>
            </div>
            <ol className="mt-6 space-y-6">
              {s.excavations.map((e) => (
                <li key={`${e.period}-${e.by}`} className="border-l border-rule pl-5">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                    <EvidenceBadge level={e.level} />
                    <p className="text-xs uppercase tracking-eyebrow text-stone">
                      {e.period}
                    </p>
                  </div>
                  <h3 className="mt-2 font-serif text-lg text-charcoal">
                    {e.by}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-charcoal-100">
                    {e.note}
                  </p>
                </li>
              ))}
            </ol>

            <div className="vp-prose mt-12">
              <h2>Principal structures</h2>
              <p>
                The evidence level answers how we know what a structure looked
                like, not whether it existed.
              </p>
            </div>
            <ul className="mt-6 space-y-6">
              {s.structures.map((st) => {
                const type = st.architectureSlug
                  ? getArchitectureTopic(st.architectureSlug)
                  : undefined;
                return (
                  <li key={st.name} className="border-l border-rule pl-5">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                      <EvidenceBadge level={st.level} />
                      <p className="text-xs uppercase tracking-eyebrow text-stone">
                        {st.date}
                      </p>
                    </div>
                    <h3 className="mt-2 font-serif text-xl text-charcoal">
                      {st.name}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-charcoal-100">
                      {st.note}
                    </p>
                    {type ? (
                      <p className="mt-2 text-sm">
                        <Link
                          href={`/architecture/${type.slug}`}
                          className="vp-link text-charcoal-100"
                        >
                          On this building type: {type.title}
                        </Link>
                      </p>
                    ) : null}
                  </li>
                );
              })}
            </ul>

            <div className="vp-prose mt-12">
              <h2>Finds and where they went</h2>
              <p>
                Almost nothing recovered from these sites is still on them.
                Where an object has a full provenance record on this platform,
                it is linked.
              </p>
            </div>
            <ul className="mt-6 space-y-6">
              {s.finds.map((f) => {
                const museum = f.museumSlug ? getMuseum(f.museumSlug) : undefined;
                const object = f.objectSlug
                  ? getObject(f.objectSlug)
                  : undefined;
                return (
                  <li key={f.name} className="border-l border-rule pl-5">
                    <EvidenceBadge level={f.level} />
                    <h3 className="mt-2 font-serif text-xl text-charcoal">
                      {f.name}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-charcoal-100">
                      {f.what}
                    </p>
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
                  </li>
                );
              })}
            </ul>

            <div className="vp-prose mt-12">
              <h2>Ancient testimony</h2>
              {s.noAncientTestimony ? (
                <p>{s.noAncientTestimony}</p>
              ) : (
                <p>
                  What ancient authors say about the place, and how far it can
                  be trusted.
                </p>
              )}
            </div>
            {s.primarySources.length ? (
              <ul className="mt-6 space-y-4">
                {s.primarySources.map((src) => (
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
              <h2>How the site has been interpreted</h2>
              {s.interpretation.map((p) => (
                <p key={p.slice(0, 44)}>{p}</p>
              ))}
            </div>

            <div className="vp-prose mt-12">
              <h2>Unresolved</h2>
            </div>
            <div className="mt-6">
              {s.disputes.map((d) => (
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
            <p className="vp-eyebrow">The site</p>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-eyebrow text-stone">
                  Type
                </dt>
                <dd className="text-charcoal-100">{SITE_KIND_LABEL[s.kind]}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-eyebrow text-stone">
                  Region
                </dt>
                <dd className="text-charcoal-100">
                  {SITE_REGION_LABEL[s.region]}
                </dd>
              </div>
              {s.alsoKnownAs?.length ? (
                <div>
                  <dt className="text-xs uppercase tracking-eyebrow text-stone">
                    Also known as
                  </dt>
                  <dd className="text-charcoal-100">
                    {s.alsoKnownAs.join(", ")}
                  </dd>
                </div>
              ) : null}
            </dl>

            {parentCity ? (
              <>
                <p className="vp-eyebrow mt-8">The city</p>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <Link
                      href={`/cities/${parentCity.slug}`}
                      className="vp-link text-charcoal-100"
                    >
                      {parentCity.name}
                    </Link>
                  </li>
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

            {museums.length ? (
              <>
                <p className="vp-eyebrow mt-8">Museums</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {museums.map((m) => (
                    <li key={m!.slug}>
                      <Link
                        href={`/museums/${m!.slug}`}
                        className="vp-link text-charcoal-100"
                      >
                        {m!.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            {objects.length ? (
              <>
                <p className="vp-eyebrow mt-8">Objects</p>
                <ul className="mt-3 space-y-2 text-sm">
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

            {architecture.length ? (
              <>
                <p className="vp-eyebrow mt-8">Architecture</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {architecture.map((a) => (
                    <li key={a!.slug}>
                      <Link
                        href={`/architecture/${a!.slug}`}
                        className="vp-link text-charcoal-100"
                      >
                        {a!.title}
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

            {cities.length ? (
              <>
                <p className="vp-eyebrow mt-8">Cities</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {cities.map((c) => (
                    <li key={c!.slug}>
                      <Link
                        href={`/cities/${c!.slug}`}
                        className="vp-link text-charcoal-100"
                      >
                        {c!.name}
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

            {siteMaps.length ? (
              <>
                <p className="vp-eyebrow mt-8">Maps</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {siteMaps.map((m) => (
                    <li key={m!.slug}>
                      <Link
                        href={`/maps/${m!.slug}`}
                        className="vp-link text-charcoal-100"
                      >
                        {m!.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            {monuments.length ? (
              <>
                <p className="vp-eyebrow mt-8">Monuments on this site</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {monuments.map((mo) => (
                    <li key={mo.slug}>
                      <Link
                        href={`/monuments/${mo.slug}`}
                        className="vp-link text-charcoal-100"
                      >
                        {mo.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            <p className="vp-eyebrow mt-8">More</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/archaeology" className="vp-link text-charcoal-100">
                  All archaeological sites
                </Link>
              </li>
              <li>
                <Link href="/monuments" className="vp-link text-charcoal-100">
                  Named monuments
                </Link>
              </li>
              <li>
                <Link href="/museums" className="vp-link text-charcoal-100">
                  Museums and provenance
                </Link>
              </li>
            </ul>
          </aside>
        </div>

        {others.length ? (
          <RelatedReading
            title="Other sites"
            items={others.map((x) => ({
              href: `/archaeology/${x!.slug}`,
              title: x!.name,
              kind: x!.geography.modernCountry,
              excerpt: x!.standfirst,
            }))}
          />
        ) : null}
      </Container>
    </>
  );
}
