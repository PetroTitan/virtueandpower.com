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
  INSTITUTIONS,
  INSTITUTIONS_DEFER_TO_WARFARE,
  INST_TIER_LABEL,
  getInstitution,
} from "@/data/institutions";
import { getCity } from "@/data/cities";
import { getWarfareTopic } from "@/data/warfare";
import { getArchitectureTopic } from "@/data/architecture";
import { getPhilosophers, getThemes, hrefFor } from "@/content/loader";
import { articleJsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return INSTITUTIONS.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const i = getInstitution(slug);
  if (!i) return {};
  return buildMetadata({
    title: i.title,
    description: i.description,
    path: `/institutions/${i.slug}`,
    type: "article",
    modifiedTime: "2026-07-28",
  });
}

export default async function InstitutionPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const i = getInstitution(slug);
  if (!i) notFound();

  const path = `/institutions/${i.slug}`;
  const [allFigures, allThemes] = await Promise.all([
    getPhilosophers(),
    getThemes(),
  ]);
  const figures = i.figureRefs
    .map((s) => allFigures.find((f) => f.slug === s))
    .filter((f): f is NonNullable<typeof f> => Boolean(f));
  const themes = i.themeRefs
    .map((s) => allThemes.find((x) => x.slug === s))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));
  const cities = i.citySlugs.map(getCity).filter(Boolean);
  const warfare = i.warfareRefs.map(getWarfareTopic).filter(Boolean);
  const buildings = i.architectureRefs.map(getArchitectureTopic).filter(Boolean);
  const siblings = i.relatedInstitutions.map(getInstitution).filter(Boolean);
  const hero = i.imageSlug ? getArchiveImage(i.imageSlug) : undefined;

  // Where a deferred subject touches this page, say so rather than
  // covering it thinly a second time.
  const deferrals = INSTITUTIONS_DEFER_TO_WARFARE.filter((d) =>
    i.warfareRefs.includes(d.warfareSlug),
  );

  const prose = [
    { heading: "What it was", body: i.whatItWas },
    { heading: "How it worked", body: i.howItWorked },
    { heading: "Powers and limits", body: i.powersAndLimits },
    { heading: "How it changed", body: i.change },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Institutions", href: "/institutions" },
            { name: i.title, href: path },
          ]),
          articleJsonLd({
            headline: i.title,
            description: i.description,
            url: path,
            dateModified: "2026-07-28",
            section: "Institutions",
          }),
        ]}
      />
      <PageHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Institutions", href: "/institutions" },
          { label: i.title },
        ]}
        eyebrow={INST_TIER_LABEL[i.tier]}
        title={i.title}
        description={i.standfirst}
        meta={i.period}
      />
      {hero ? (
        <Container width="editorial" className="pt-4 pb-12">
          <ArchiveImage
            slug={i.imageSlug as string}
            priority
            sizes="(min-width: 1280px) 1100px, (min-width: 768px) 90vw, 100vw"
          />
        </Container>
      ) : null}
      <Container width="editorial" className="py-16">
        <div className="grid gap-16 md:grid-cols-12">
          <article className="md:col-span-8">
            <div className="vp-prose">
              {prose.map((section) => (
                <div key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.body.map((p) => (
                    <p key={p.slice(0, 44)}>{p}</p>
                  ))}
                </div>
              ))}
              <h2>What the evidence supports</h2>
            </div>
            <div className="mt-6 border-t border-rule pt-2">
              {i.keyPoints.map((k) => (
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

            {i.terms?.length ? (
              <>
                <div className="vp-prose mt-12">
                  <h2>Terms</h2>
                </div>
                <dl className="mt-6 space-y-5">
                  {i.terms.map((term) => (
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

            {i.disputes?.length ? (
              <>
                <div className="vp-prose mt-12">
                  <h2>Open questions</h2>
                </div>
                <div className="mt-6">
                  {i.disputes.map((d) => (
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
                {i.primarySources.map((src) => (
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

            {deferrals.length ? (
              <section className="mt-12 border-l-2 border-rule pl-5">
                <p className="vp-eyebrow">Covered elsewhere</p>
                <ul className="mt-3 space-y-3 text-sm leading-relaxed text-charcoal-100">
                  {deferrals.map((d) => (
                    <li key={d.subject}>
                      {d.subject} is treated in the warfare encyclopedia:{" "}
                      <Link
                        href={`/warfare/${d.warfareSlug}`}
                        className="vp-link text-charcoal"
                      >
                        {getWarfareTopic(d.warfareSlug)?.title ?? d.warfareSlug}
                      </Link>
                      . {d.reason}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <EvidenceKey className="mt-16" />
          </article>

          <aside className="md:col-span-4 md:border-l md:border-rule md:pl-10">
            {i.civilizations.length ? (
              <>
                <p className="vp-eyebrow">Political order</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {i.civilizations.map((c) => (
                    <li key={c}>
                      <Link
                        href={hrefFor("civilization", c)}
                        className="vp-link text-charcoal-100"
                      >
                        {c
                          .split("-")
                          .map((w) => w[0].toUpperCase() + w.slice(1))
                          .join(" ")}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
            {siblings.length ? (
              <>
                <p className="vp-eyebrow mt-8">Related institutions</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {siblings.map((x) => (
                    <li key={x!.slug}>
                      <Link
                        href={`/institutions/${x!.slug}`}
                        className="vp-link text-charcoal-100"
                      >
                        {x!.title}
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
            {buildings.length ? (
              <>
                <p className="vp-eyebrow mt-8">Where it met</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {buildings.map((b) => (
                    <li key={b!.slug}>
                      <Link
                        href={`/architecture/${b!.slug}`}
                        className="vp-link text-charcoal-100"
                      >
                        {b!.title}
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
                      <Link
                        href={`/warfare/${x!.slug}`}
                        className="vp-link text-charcoal-100"
                      >
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
            <p className="vp-eyebrow mt-8">More</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/institutions" className="vp-link text-charcoal-100">
                  All institutions
                </Link>
              </li>
              <li>
                <Link href="/architecture" className="vp-link text-charcoal-100">
                  Architecture
                </Link>
              </li>
            </ul>
          </aside>
        </div>

        <RelatedReading
          items={siblings.slice(0, 4).map((x) => ({
            href: `/institutions/${x!.slug}`,
            title: x!.title,
            kind: INST_TIER_LABEL[x!.tier].toLowerCase(),
            excerpt: x!.standfirst,
          }))}
        />
      </Container>
    </>
  );
}
