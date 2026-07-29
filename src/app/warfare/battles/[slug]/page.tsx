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
import { BATTLES, getBattle } from "@/data/battles";
import { getWarfareTopic } from "@/data/warfare";
import { getCivilizations, getPhilosophers, hrefFor } from "@/content/loader";
import { articleJsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return BATTLES.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const b = getBattle(slug);
  if (!b) return {};
  return buildMetadata({
    title: `The Battle of ${b.name}, ${b.date}`,
    description: b.standfirst,
    path: `/warfare/battles/${b.slug}`,
    type: "article",
    modifiedTime: "2026-07-28",
  });
}

export default async function BattlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const b = getBattle(slug);
  if (!b) notFound();

  const path = `/warfare/battles/${b.slug}`;
  const [allCivs, allFigures] = await Promise.all([
    getCivilizations(),
    getPhilosophers(),
  ]);
  const civs = b.civilizations
    .map((s) => allCivs.find((c) => c.slug === s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
  const figures = b.figureRefs
    .map((s) => allFigures.find((f) => f.slug === s))
    .filter((f): f is NonNullable<typeof f> => Boolean(f));
  const topics = b.topicRefs
    .map((s) => getWarfareTopic(s))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));
  const related = b.relatedBattles
    .map((s) => getBattle(s))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));
  const hero = b.imageSlug ? getArchiveImage(b.imageSlug) : undefined;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Warfare", href: "/warfare" },
            { name: "Battles", href: "/warfare/battles" },
            { name: b.name, href: path },
          ]),
          articleJsonLd({
            headline: `The Battle of ${b.name}`,
            description: b.standfirst,
            url: path,
            dateModified: "2026-07-28",
            section: "Battles",
          }),
        ]}
      />
      <PageHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Warfare", href: "/warfare" },
          { label: "Battles", href: "/warfare/battles" },
          { label: b.name },
        ]}
        eyebrow={b.war}
        title={b.name}
        description={b.standfirst}
        meta={`${b.date} · ${b.location.modern}`}
      />
      {hero ? (
        <Container width="editorial" className="pt-4 pb-12">
          <ArchiveImage
            slug={b.imageSlug as string}
            priority
            sizes="(min-width: 1280px) 1100px, (min-width: 768px) 90vw, 100vw"
          />
        </Container>
      ) : null}
      <Container width="editorial" className="py-16">
        {/* The numbers panel comes first deliberately. Ancient troop
            figures are the least reliable element of any battle account,
            and putting them behind the narrative would let a reader
            absorb them before meeting the caveat. */}
        <section className="border-y border-charcoal-50 py-8">
          <h2 className="vp-eyebrow">The forces, and what the figures are worth</h2>
          <div className="mt-6 grid gap-10 md:grid-cols-2">
            {b.sides.map((side) => (
              <div key={side.name}>
                <h3 className="font-serif text-xl text-charcoal">{side.name}</h3>
                <p className="mt-2 text-sm text-charcoal-100">
                  {side.commanders.map((c, i) => (
                    <span key={c.name}>
                      {i > 0 ? " · " : ""}
                      {c.slug ? (
                        <Link
                          href={hrefFor("philosopher", c.slug)}
                          className="vp-link"
                        >
                          {c.name}
                        </Link>
                      ) : (
                        c.name
                      )}
                    </span>
                  ))}
                </p>
                <div className="mt-5 space-y-5">
                  {[...side.forces, ...(side.casualties ?? [])].map((f) => (
                    <div key={`${f.label}-${f.figure}`} className="border-l border-rule pl-4">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <EvidenceBadge level={f.level} />
                        <p className="text-xs uppercase tracking-eyebrow text-stone">
                          {f.label}
                        </p>
                      </div>
                      <p className="mt-2 font-serif text-lg text-charcoal">
                        {f.figure}
                      </p>
                      <p className="mt-1 text-xs text-stone-400">{f.source}</p>
                      <p className="mt-2 text-sm leading-relaxed text-charcoal-100">
                        {f.assessment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-16 grid gap-16 md:grid-cols-12">
          <article className="md:col-span-8">
            <div className="vp-prose">
              <h2>What happened</h2>
              {b.summary.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}

              <h2>Tactics</h2>
              <p>{b.tactics}</p>

              <h2>Consequence</h2>
              <p>{b.consequence}</p>
            </div>

            <section className="mt-12">
              <h2 className="vp-eyebrow border-b border-rule pb-3">Location</h2>
              <div className="mt-5 border-l border-rule pl-5">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                  <EvidenceBadge level={b.location.level} />
                  <p className="font-serif text-lg text-charcoal">
                    {b.location.ancient}
                  </p>
                </div>
                <p className="mt-1 text-sm text-stone-400">
                  Modern: {b.location.modern}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-100">
                  {b.location.note}
                </p>
              </div>
              {b.dateNote ? (
                <div className="mt-5 border-l border-rule pl-5">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                    <EvidenceBadge level={b.dateLevel} />
                    <p className="text-xs uppercase tracking-eyebrow text-stone">
                      Dating
                    </p>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-100">
                    {b.dateNote}
                  </p>
                </div>
              ) : null}
            </section>

            {b.archaeology ? (
              <section className="mt-12">
                <h2 className="vp-eyebrow border-b border-rule pb-3">
                  Archaeology
                </h2>
                <div className="mt-5 border-l border-rule pl-5">
                  <EvidenceBadge level={b.archaeology.level} />
                  <p className="mt-3 text-sm leading-relaxed text-charcoal-100">
                    {b.archaeology.note}
                  </p>
                </div>
              </section>
            ) : null}

            {b.disputes.length ? (
              <section className="mt-12">
                <h2 className="vp-eyebrow border-b border-rule pb-3">
                  Open questions
                </h2>
                <div className="mt-5">
                  {b.disputes.map((d) => (
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
              </section>
            ) : null}

            <section className="mt-12">
              <h2 className="vp-eyebrow border-b border-rule pb-3">
                Primary sources
              </h2>
              <ul className="mt-6 space-y-4">
                {b.primarySources.map((src) => (
                  <li
                    key={`${src.work}-${src.locus ?? ""}`}
                    className="border-l border-rule pl-5"
                  >
                    <p className="text-charcoal">
                      {src.author ? `${src.author}, ` : ""}
                      <em>{src.work}</em>
                      {src.locus ? ` ${src.locus}` : ""}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-charcoal-100">
                      {src.summary}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            {b.reception ? (
              <div className="vp-prose mt-12">
                <h2>Reception</h2>
                <p>{b.reception}</p>
              </div>
            ) : null}

            <EvidenceKey className="mt-16" />
          </article>

          <aside className="md:col-span-4 md:border-l md:border-rule md:pl-10">
            <p className="vp-eyebrow">Outcome</p>
            <p className="mt-3 text-sm leading-relaxed text-charcoal-100">
              {b.outcome}
            </p>

            {civs.length ? (
              <>
                <p className="vp-eyebrow mt-8">Civilizations</p>
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

            {topics.length ? (
              <>
                <p className="vp-eyebrow mt-8">Warfare topics</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {topics.map((t) => (
                    <li key={t.slug}>
                      <Link
                        href={`/warfare/${t.slug}`}
                        className="vp-link text-charcoal-100"
                      >
                        {t.title}
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

            <p className="vp-eyebrow mt-8">More</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/warfare/battles" className="vp-link text-charcoal-100">
                  All battles
                </Link>
              </li>
              <li>
                <Link href="/warfare" className="vp-link text-charcoal-100">
                  The warfare encyclopedia
                </Link>
              </li>
            </ul>
          </aside>
        </div>

        <RelatedReading
          title="Related battles"
          items={related.map((x) => ({
            href: `/warfare/battles/${x.slug}`,
            title: `${x.name}, ${x.date}`,
            kind: x.war,
            excerpt: x.standfirst,
          }))}
        />
      </Container>
    </>
  );
}
