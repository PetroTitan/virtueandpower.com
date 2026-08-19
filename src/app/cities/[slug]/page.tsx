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
import { CITIES, getCity } from "@/data/cities";
import { sitesInCity } from "@/data/archaeological-sites";
import { monumentsForCity } from "@/data/monuments";
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
  placeJsonLd,
} from "@/lib/seo";

export const dynamicParams = false;

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return CITIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCity(slug);
  if (!c) return {};
  return buildMetadata({
    title: `${c.name} — the ancient city`,
    description: c.description,
    path: `/cities/${c.slug}`,
    type: "article",
    modifiedTime: "2026-07-28",
  });
}

export default async function CityPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const c = getCity(slug);
  if (!c) notFound();

  const path = `/cities/${c.slug}`;
  const [allCivs, allFigures, allThemes, allBooks] = await Promise.all([
    getCivilizations(),
    getPhilosophers(),
    getThemes(),
    getBooks(),
  ]);
  const pick = <T extends { slug: string }>(all: T[], slugs: string[]) =>
    slugs.map((s) => all.find((x) => x.slug === s)).filter((x): x is T => Boolean(x));

  const civs = pick(allCivs, c.civilizations);
  const figures = pick(allFigures, c.figureRefs);
  const themes = pick(allThemes, c.themeRefs);
  const books = pick(allBooks, c.bookRefs);
  const counterpart = c.civilizationCounterpart
    ? allCivs.find((x) => x.slug === c.civilizationCounterpart)
    : undefined;
  const battles = c.battleRefs.map(getBattle).filter(Boolean);
  const topics = c.warfareRefs.map(getWarfareTopic).filter(Boolean);
  const maps = c.mapSlugs.map(getMap).filter(Boolean);
  const others = c.relatedCities.map(getCity).filter(Boolean);
  const digs = sitesInCity(c.slug);
  const monuments = monumentsForCity(c.slug);
  const hero = c.imageSlug ? getArchiveImage(c.imageSlug) : undefined;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Cities", href: "/cities" },
            { name: c.name, href: path },
          ]),
          articleJsonLd({
            headline: `${c.name} — the ancient city`,
            description: c.description,
            url: path,
            dateModified: "2026-07-28",
            section: "Cities",
          }),
          placeJsonLd({
            name: c.name,
            url: path,
            description: c.description,
            alternateName: c.ancientName,
            addressCountry: c.country,
          }),
        ]}
      />
      <PageHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Cities", href: "/cities" },
          { label: c.name },
        ]}
        eyebrow="The ancient city"
        title={c.name}
        description={c.standfirst}
        meta={`${c.modernName}, ${c.country} · ${c.period}`}
      />

      {hero ? (
        <Container width="editorial" className="pt-4 pb-12">
          <ArchiveImage
            slug={c.imageSlug as string}
            priority
            sizes="(min-width: 1280px) 1100px, (min-width: 768px) 90vw, 100vw"
          />
        </Container>
      ) : null}

      <Container width="editorial" className="py-16">
        {/*
          The disambiguation line. Rendered automatically wherever a
          civilization page covers the same name, so the reader is told
          within the first screen which of the two pages they are on and
          where the other one is. A content-health check enforces the
          reciprocal link on the civilization side.
        */}
        {counterpart ? (
          <p className="mb-12 border-l-2 border-bronze-50 bg-parchment-50 py-4 pl-5 pr-4 text-sm leading-relaxed text-charcoal-100">
            This page is about <strong>{c.name} as a place</strong> — its
            site, its plan, its monuments and what has been excavated. For{" "}
            {c.name} as a political and cultural order, see{" "}
            <Link
              href={hrefFor("civilization", counterpart.slug)}
              className="vp-link"
            >
              {counterpart.frontmatter.title}
            </Link>
            .
          </p>
        ) : null}

        <div className="grid gap-16 md:grid-cols-12">
          <article className="md:col-span-8">
            <div className="vp-prose">
              <h2>The site and its setting</h2>
              {c.setting.map((p) => (
                <p key={p.slice(0, 44)}>{p}</p>
              ))}
            </div>

            <section className="mt-10 border-l border-rule pl-5">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <EvidenceBadge level={c.foundation.level} />
                <p className="text-xs uppercase tracking-eyebrow text-stone">
                  Foundation
                </p>
              </div>
              <p className="mt-3 font-serif text-lg text-charcoal">
                {c.foundation.claim}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-100">
                {c.foundation.note}
              </p>
            </section>

            <div className="vp-prose mt-12">
              <h2>History of the settlement</h2>
              {c.history.map((p) => (
                <p key={p.slice(0, 44)}>{p}</p>
              ))}

              <h2>Urban plan</h2>
              {c.urbanPlan.map((p) => (
                <p key={p.slice(0, 44)}>{p}</p>
              ))}

              <h2>Economy and supply</h2>
              {c.economy.map((p) => (
                <p key={p.slice(0, 44)}>{p}</p>
              ))}

              <h2>Cult and sanctuaries</h2>
              {c.cult.map((p) => (
                <p key={p.slice(0, 44)}>{p}</p>
              ))}

              <h2>The city at war</h2>
              {c.atWar.map((p) => (
                <p key={p.slice(0, 44)}>{p}</p>
              ))}

              <h2>Population</h2>
              <p>
                Ancient population figures are quoted with a confidence the
                evidence never supported. Each estimate below carries what it
                rests on and what it is worth.
              </p>
            </div>

            <div className="mt-6">
              {c.population.map((p) => (
                <div
                  key={p.label}
                  className="border-t border-rule py-5 first:border-t-0 first:pt-0"
                >
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                    <EvidenceBadge level={p.level} />
                    <p className="text-xs uppercase tracking-eyebrow text-stone">
                      {p.label}
                    </p>
                  </div>
                  <p className="mt-2 font-serif text-lg text-charcoal">
                    {p.figure}
                  </p>
                  <p className="mt-1 text-xs text-stone-400">{p.basis}</p>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-100">
                    {p.assessment}
                  </p>
                </div>
              ))}
            </div>

            <div className="vp-prose mt-12">
              <h2>Monuments</h2>
            </div>
            <ul className="mt-6 space-y-6">
              {c.monuments.map((m) => (
                <li key={m.name} className="border-l border-rule pl-5">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                    <EvidenceBadge level={m.level} />
                    <p className="text-xs uppercase tracking-eyebrow text-stone">
                      {m.date}
                    </p>
                  </div>
                  <h3 className="mt-2 font-serif text-xl text-charcoal">
                    {m.name}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-charcoal-100">
                    {m.note}
                  </p>
                </li>
              ))}
            </ul>

            <div className="vp-prose mt-12">
              <h2>Archaeology and excavation</h2>
            </div>
            <div className="mt-5 border-l border-rule pl-5">
              <EvidenceBadge level={c.archaeology.level} />
              <p className="mt-3 text-sm leading-relaxed text-charcoal-100">
                {c.archaeology.excavationHistory}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-charcoal-100">
                {c.archaeology.note}
              </p>
            </div>

            <div className="vp-prose mt-12">
              <h2>Museum collections</h2>
              <p>
                Where the finds are now. Where a holding is contested, the
                entry says so.
              </p>
            </div>
            <ul className="mt-6 space-y-5">
              {c.museums.map((m) => (
                <li key={`${m.museum}-${m.city}`} className="border-l border-rule pl-5">
                  <h3 className="font-serif text-lg text-charcoal">
                    {m.museum}
                    <span className="text-sm text-stone"> · {m.city}</span>
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-charcoal-100">
                    {m.holdings}
                  </p>
                  {m.note ? (
                    <p className="mt-2 text-sm leading-relaxed text-stone-400">
                      {m.note}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>

            {c.disputes.length ? (
              <>
                <div className="vp-prose mt-12">
                  <h2>Open questions</h2>
                </div>
                <div className="mt-6">
                  {c.disputes.map((d) => (
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
              </>
            ) : null}

            <section className="mt-12">
              <h2 className="vp-eyebrow border-b border-rule pb-3">
                Primary sources
              </h2>
              <ul className="mt-6 space-y-4">
                {c.primarySources.map((src) => (
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
            </section>

            <EvidenceKey className="mt-16" />
          </article>

          <aside className="md:col-span-4 md:border-l md:border-rule md:pl-10">
            <p className="vp-eyebrow">The place</p>
            <dl className="mt-4 space-y-3 text-sm">
              {c.ancientName ? (
                <div>
                  <dt className="text-xs uppercase tracking-eyebrow text-stone">
                    In antiquity
                  </dt>
                  <dd className="text-charcoal-100">{c.ancientName}</dd>
                </div>
              ) : null}
              <div>
                <dt className="text-xs uppercase tracking-eyebrow text-stone">
                  Today
                </dt>
                <dd className="text-charcoal-100">
                  {c.modernName}, {c.country}
                </dd>
              </div>
            </dl>

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

            {maps.length ? (
              <>
                <p className="vp-eyebrow mt-8">Maps</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {maps.map((m) => (
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

            {battles.length ? (
              <>
                <p className="vp-eyebrow mt-8">Battles</p>
                <ul className="mt-3 space-y-2 text-sm">
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

            {topics.length ? (
              <>
                <p className="vp-eyebrow mt-8">Warfare</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {topics.map((t) => (
                    <li key={t!.slug}>
                      <Link
                        href={`/warfare/${t!.slug}`}
                        className="vp-link text-charcoal-100"
                      >
                        {t!.title}
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

            {digs.length ? (
              <>
                <p className="vp-eyebrow mt-8">Excavated sites</p>
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

            {monuments.length ? (
              <>
                <p className="vp-eyebrow mt-8">Monuments</p>
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
                <Link href="/cities" className="vp-link text-charcoal-100">
                  All cities
                </Link>
              </li>
              <li>
                <Link href="/monuments" className="vp-link text-charcoal-100">
                  Named monuments
                </Link>
              </li>
              <li>
                <Link href="/archaeology" className="vp-link text-charcoal-100">
                  Archaeological sites
                </Link>
              </li>
              <li>
                <Link href="/civilizations" className="vp-link text-charcoal-100">
                  Civilizations
                </Link>
              </li>
            </ul>
          </aside>
        </div>

        <RelatedReading
          title="Other cities"
          items={others.map((x) => ({
            href: `/cities/${x!.slug}`,
            title: x!.name,
            kind: x!.country,
            excerpt: x!.standfirst,
          }))}
        />
      </Container>
    </>
  );
}
