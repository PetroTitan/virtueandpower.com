import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/editorial/PageHeader";
import { RelatedReading } from "@/components/editorial/RelatedReading";
import { EvidenceBadge, EvidenceKey } from "@/components/editorial/EvidenceBadge";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArchiveImage } from "@/components/site/ArchiveImage";
import { getArchiveImage } from "@/data/archive-images";
import {
  ARCHITECTURE_TOPICS,
  ARCH_TIER_LABEL,
  getArchitectureTopic,
} from "@/data/architecture";
import { getCity } from "@/data/cities";
import { getWarfareTopic } from "@/data/warfare";
import { getPhilosophers, getThemes, hrefFor } from "@/content/loader";
import { articleJsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return ARCHITECTURE_TOPICS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = getArchitectureTopic(slug);
  if (!t) return {};
  return buildMetadata({
    title: t.title,
    description: t.description,
    path: `/architecture/${t.slug}`,
    type: "article",
    modifiedTime: "2026-07-28",
  });
}

export default async function ArchitectureTopicPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const t = getArchitectureTopic(slug);
  if (!t) notFound();

  const path = `/architecture/${t.slug}`;
  const [allFigures, allThemes] = await Promise.all([
    getPhilosophers(),
    getThemes(),
  ]);
  const figures = t.figureRefs
    .map((s) => allFigures.find((f) => f.slug === s))
    .filter((f): f is NonNullable<typeof f> => Boolean(f));
  const themes = t.themeRefs
    .map((s) => allThemes.find((x) => x.slug === s))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));
  const cities = t.citySlugs.map(getCity).filter(Boolean);
  const warfare = t.warfareRefs.map(getWarfareTopic).filter(Boolean);
  const siblings = t.relatedTopics.map(getArchitectureTopic).filter(Boolean);
  const hero = t.imageSlug ? getArchiveImage(t.imageSlug) : undefined;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Architecture", href: "/architecture" },
            { name: t.title, href: path },
          ]),
          articleJsonLd({
            headline: t.title,
            description: t.description,
            url: path,
            dateModified: "2026-07-28",
            section: "Architecture",
          }),
        ]}
      />
      <PageHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Architecture", href: "/architecture" },
          { label: t.title },
        ]}
        eyebrow={ARCH_TIER_LABEL[t.tier]}
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
                <p key={p.slice(0, 44)}>{p}</p>
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

            <div className="vp-prose mt-12">
              <h2>Examples</h2>
              <p>
                The evidence level on each answers how we know what the
                building looked like, not whether it existed.
              </p>
            </div>
            <ul className="mt-6 space-y-6">
              {t.examples.map((e) => (
                <li key={e.name} className="border-l border-rule pl-5">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                    <EvidenceBadge level={e.level} />
                    <p className="text-xs uppercase tracking-eyebrow text-stone">
                      {e.place} · {e.date}
                    </p>
                  </div>
                  <h3 className="mt-2 font-serif text-xl text-charcoal">
                    {e.citySlug ? (
                      <Link href={`/cities/${e.citySlug}`} className="hover:text-bronze">
                        {e.name}
                      </Link>
                    ) : (
                      e.name
                    )}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-charcoal-100">
                    {e.note}
                  </p>
                </li>
              ))}
            </ul>

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

            <section className="mt-12">
              <h2 className="vp-eyebrow border-b border-rule pb-3">
                Primary sources
              </h2>
              <ul className="mt-6 space-y-4">
                {t.primarySources.map((src) => (
                  <li
                    key={`${src.work}-${src.locus ?? ""}`}
                    className="border-l border-rule pl-5"
                  >
                    <p className="text-charcoal">
                      {src.author ? `${src.author}, ` : ""}
                      <em>{src.work}</em>
                      {src.locus && src.locus !== "throughout" ? ` ${src.locus}` : ""}
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
            {cities.length ? (
              <>
                <p className="vp-eyebrow">Cities</p>
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
            {siblings.length ? (
              <>
                <p className="vp-eyebrow mt-8">Related</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {siblings.map((x) => (
                    <li key={x!.slug}>
                      <Link href={`/architecture/${x!.slug}`} className="vp-link text-charcoal-100">
                        {x!.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
            {warfare.length ? (
              <>
                <p className="vp-eyebrow mt-8">Warfare</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {warfare.map((x) => (
                    <li key={x!.slug}>
                      <Link href={`/warfare/${x!.slug}`} className="vp-link text-charcoal-100">
                        {x!.title}
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
                      <Link href={hrefFor("philosopher", f.slug)} className="vp-link text-charcoal-100">
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
                      <Link href={hrefFor("theme", x.slug)} className="vp-link text-charcoal-100">
                        {x.frontmatter.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
            <p className="vp-eyebrow mt-8">More</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/architecture" className="vp-link text-charcoal-100">
                  All architecture
                </Link>
              </li>
              <li>
                <Link href="/museums" className="vp-link text-charcoal-100">
                  Museums and objects
                </Link>
              </li>
            </ul>
          </aside>
        </div>

        <RelatedReading
          items={siblings.slice(0, 4).map((x) => ({
            href: `/architecture/${x!.slug}`,
            title: x!.title,
            kind: ARCH_TIER_LABEL[x!.tier].toLowerCase(),
            excerpt: x!.standfirst,
          }))}
        />
      </Container>
    </>
  );
}
