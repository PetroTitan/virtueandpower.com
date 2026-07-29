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
  TIER_LABEL,
  WARFARE_TOPICS,
  getWarfareTopic,
} from "@/data/warfare";
import { getBattle } from "@/data/battles";
import { getCivilizations, getPhilosophers, getThemes, hrefFor } from "@/content/loader";
import { articleJsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

/**
 * Warfare topic pages. Registry-driven with dynamic params disabled, so
 * the route generates exactly the topics that exist and 404s anything
 * else. `/warfare/battles` is a static segment and takes precedence over
 * this dynamic one, so no topic may use that slug.
 */
export const dynamicParams = false;

type Params = { topic: string };

export function generateStaticParams(): Params[] {
  return WARFARE_TOPICS.map((t) => ({ topic: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { topic } = await params;
  const t = getWarfareTopic(topic);
  if (!t) return {};
  return buildMetadata({
    title: t.title,
    description: t.description,
    path: `/warfare/${t.slug}`,
    type: "article",
    modifiedTime: "2026-07-28",
  });
}

export default async function WarfareTopicPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { topic } = await params;
  const t = getWarfareTopic(topic);
  if (!t) notFound();

  const path = `/warfare/${t.slug}`;
  const [allCivs, allFigures, allThemes] = await Promise.all([
    getCivilizations(),
    getPhilosophers(),
    getThemes(),
  ]);

  const civs = t.civilizations
    .map((s) => allCivs.find((c) => c.slug === s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
  const figures = t.figureRefs
    .map((s) => allFigures.find((f) => f.slug === s))
    .filter((f): f is NonNullable<typeof f> => Boolean(f));
  const themes = t.themeRefs
    .map((s) => allThemes.find((x) => x.slug === s))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));
  const battles = t.relatedBattles
    .map((s) => getBattle(s))
    .filter((b): b is NonNullable<typeof b> => Boolean(b));
  const siblings = t.relatedTopics
    .map((s) => getWarfareTopic(s))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));
  const hero = t.imageSlug ? getArchiveImage(t.imageSlug) : undefined;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Warfare", href: "/warfare" },
            { name: t.title, href: path },
          ]),
          articleJsonLd({
            headline: t.title,
            description: t.description,
            url: path,
            dateModified: "2026-07-28",
            section: "Warfare",
          }),
        ]}
      />
      <PageHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Warfare", href: "/warfare" },
          { label: t.title },
        ]}
        eyebrow={TIER_LABEL[t.tier]}
        title={t.title}
        description={t.standfirst}
        meta={t.period}
      />
      {hero ? (
        <Container width="editorial" className="pt-4 pb-12">
          <ArchiveImage
            slug={t.imageSlug as string}
            priority
            sizes="(min-width: 1280px) 1100px, (min-width: 768px) 90vw, 100vw"
          />
        </Container>
      ) : null}
      <Container width="editorial" className="py-16">
        <div className="grid gap-16 md:grid-cols-12">
          <article className="md:col-span-8">
            <div className="vp-prose">
              {t.summary.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
              <h2>What the evidence supports</h2>
            </div>
            <div className="mt-6 border-t border-rule pt-2">
              {t.keyPoints.map((k) => (
                <div
                  key={k.claim}
                  className="border-t border-rule py-5 first:border-t-0 first:pt-0"
                >
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                    <EvidenceBadge level={k.level} />
                    <p className="flex-1 font-serif text-lg text-charcoal">
                      {k.claim}
                    </p>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-charcoal-100">
                    {k.detail}
                  </p>
                </div>
              ))}
            </div>

            {t.terms?.length ? (
              <>
                <div className="vp-prose mt-12">
                  <h2>Terms</h2>
                </div>
                <dl className="mt-6 space-y-5">
                  {t.terms.map((term) => (
                    <div key={term.term} className="border-l border-rule pl-5">
                      <dt className="font-serif text-lg italic text-charcoal">
                        {term.term}
                      </dt>
                      <dd className="mt-1 text-sm leading-relaxed text-charcoal-100">
                        {term.gloss}
                      </dd>
                    </div>
                  ))}
                </dl>
              </>
            ) : null}

            {t.archaeology ? (
              <div className="vp-prose mt-12">
                <h2>Archaeology</h2>
                <p>{t.archaeology}</p>
              </div>
            ) : null}

            {t.disputes?.length ? (
              <>
                <div className="vp-prose mt-12">
                  <h2>Open questions</h2>
                </div>
                <div className="mt-6">
                  {t.disputes.map((d) => (
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

            <div className="vp-prose mt-12">
              <h2>Primary sources</h2>
            </div>
            <ul className="mt-6 space-y-4">
              {t.primarySources.map((src) => (
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

            {battles.length ? (
              <>
                <div className="vp-prose mt-12">
                  <h2>Battles</h2>
                </div>
                <ul className="mt-6 grid gap-5 sm:grid-cols-2">
                  {battles.map((b) => (
                    <li key={b.slug} className="border-l border-rule pl-5">
                      <p className="text-xs uppercase tracking-eyebrow text-stone">
                        {b.date}
                      </p>
                      <h3 className="mt-1 font-serif text-lg text-charcoal">
                        <Link
                          href={`/warfare/battles/${b.slug}`}
                          className="hover:text-bronze"
                        >
                          {b.name}
                        </Link>
                      </h3>
                      <p className="mt-1 text-sm text-charcoal-100">
                        {b.standfirst}
                      </p>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            <EvidenceKey className="mt-16" />
          </article>

          <aside className="md:col-span-4 md:border-l md:border-rule md:pl-10">
            {civs.length ? (
              <>
                <p className="vp-eyebrow">Civilizations</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {civs.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={hrefFor("civilization", c.slug)}
                        className="vp-link text-charcoal-100"
                      >
                        {c.frontmatter.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            {siblings.length ? (
              <>
                <p className="vp-eyebrow mt-8">Related topics</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {siblings.map((x) => (
                    <li key={x.slug}>
                      <Link
                        href={`/warfare/${x.slug}`}
                        className="vp-link text-charcoal-100"
                      >
                        {x.title}
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

            {themes.length ? (
              <>
                <p className="vp-eyebrow mt-8">Themes</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {themes.map((x) => (
                    <li key={x.slug}>
                      <Link
                        href={hrefFor("theme", x.slug)}
                        className="vp-link text-charcoal-100"
                      >
                        {x.frontmatter.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            <p className="vp-eyebrow mt-8">The encyclopedia</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/warfare" className="vp-link text-charcoal-100">
                  All warfare topics
                </Link>
              </li>
              <li>
                <Link
                  href="/warfare/battles"
                  className="vp-link text-charcoal-100"
                >
                  All battles
                </Link>
              </li>
            </ul>
          </aside>
        </div>

        <RelatedReading
          items={siblings.slice(0, 4).map((x) => ({
            href: `/warfare/${x.slug}`,
            title: x.title,
            kind: TIER_LABEL[x.tier].toLowerCase(),
            excerpt: x.standfirst,
          }))}
        />
      </Container>
    </>
  );
}
