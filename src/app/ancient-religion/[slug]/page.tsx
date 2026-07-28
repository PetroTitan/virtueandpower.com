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
  CULT_PRACTICES,
  CULT_TIER_LABEL,
  RELIGION_DEFERS_TO,
  getCultPractice,
} from "@/data/religion";
import { getCity } from "@/data/cities";
import { getArchitectureTopic } from "@/data/architecture";
import { getInstitution } from "@/data/institutions";
import { getBooks, getPhilosophers, getThemes, hrefFor } from "@/content/loader";
import { articleJsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return CULT_PRACTICES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCultPractice(slug);
  if (!c) return {};
  return buildMetadata({
    title: c.title,
    description: c.description,
    path: `/ancient-religion/${c.slug}`,
    type: "article",
    modifiedTime: "2026-07-28",
  });
}

const EVIDENCE_KIND_LABEL: Record<string, string> = {
  inscription: "Inscriptions",
  archaeology: "Archaeology",
  iconography: "Images",
  literary: "Literary sources",
  papyrus: "Papyri",
  documentary: "Documents",
};

export default async function CultPracticePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const c = getCultPractice(slug);
  if (!c) notFound();

  const path = `/ancient-religion/${c.slug}`;
  const [allFigures, allThemes, allBooks] = await Promise.all([
    getPhilosophers(),
    getThemes(),
    getBooks(),
  ]);
  const figures = c.figureRefs
    .map((s) => allFigures.find((f) => f.slug === s))
    .filter((f): f is NonNullable<typeof f> => Boolean(f));
  const themes = c.themeRefs
    .map((s) => allThemes.find((x) => x.slug === s))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));
  const books = c.bookRefs
    .map((s) => allBooks.find((x) => x.slug === s))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));
  const cities = c.citySlugs.map(getCity).filter(Boolean);
  const buildings = c.architectureRefs.map(getArchitectureTopic).filter(Boolean);
  const institutions = c.institutionRefs.map(getInstitution).filter(Boolean);
  const siblings = c.relatedPractices.map(getCultPractice).filter(Boolean);
  const hero = c.imageSlug ? getArchiveImage(c.imageSlug) : undefined;

  // Surface the deferrals this page actually touches, so a reader who
  // came looking for the political argument is sent to the page that
  // makes it rather than finding a thinner version here.
  const touched = RELIGION_DEFERS_TO.filter(
    (d) =>
      (d.ownedBy === "city" && d.ownerSlug && c.citySlugs.includes(d.ownerSlug)) ||
      (d.ownedBy === "architecture" &&
        d.ownerSlug &&
        c.architectureRefs.includes(d.ownerSlug)) ||
      (d.ownedBy === "theme" && d.ownerSlug && c.themeRefs.includes(d.ownerSlug)) ||
      (d.ownedBy === "book" && d.ownerSlug && c.bookRefs.includes(d.ownerSlug)),
  );

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Ancient religion", href: "/ancient-religion" },
            { name: c.title, href: path },
          ]),
          articleJsonLd({
            headline: c.title,
            description: c.description,
            url: path,
            dateModified: "2026-07-28",
            section: "Ancient religion",
          }),
        ]}
      />
      <PageHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Ancient religion", href: "/ancient-religion" },
          { label: c.title },
        ]}
        eyebrow={CULT_TIER_LABEL[c.tier]}
        title={c.title}
        description={c.standfirst}
        meta={c.period}
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
        <div className="grid gap-16 md:grid-cols-12">
          <article className="md:col-span-8">
            <div className="vp-prose">
              <h2>What is attested</h2>
              {c.whatIsAttested.map((p) => (
                <p key={p.slice(0, 44)}>{p}</p>
              ))}
              <h2>How the rite worked</h2>
              {c.howItWorked.map((p) => (
                <p key={p.slice(0, 44)}>{p}</p>
              ))}
            </div>

            <div className="vp-prose mt-12">
              <h2>The evidence and its limits</h2>
              <p>
                Each class of evidence below is followed by what it cannot
                show. That second half is not a disclaimer; it is the part
                most accounts of ancient religion leave out.
              </p>
            </div>
            <ul className="mt-6 space-y-6">
              {c.evidenceBase.map((e) => (
                <li key={e.note.slice(0, 40)} className="border-l border-rule pl-5">
                  <p className="text-xs uppercase tracking-eyebrow text-stone">
                    {EVIDENCE_KIND_LABEL[e.kind] ?? e.kind}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal">
                    {e.note}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-100">
                    <span className="text-stone">What it cannot show — </span>
                    {e.limits}
                  </p>
                </li>
              ))}
            </ul>

            <div className="vp-prose mt-12">
              <h2>What the sources do not record</h2>
            </div>
            <ul className="mt-6 space-y-4">
              {c.silences.map((s) => (
                <li key={s.slice(0, 40)} className="border-l-2 border-rule pl-5">
                  <p className="text-sm leading-relaxed text-charcoal-100">{s}</p>
                </li>
              ))}
            </ul>

            <div className="vp-prose mt-12">
              <h2>What the evidence supports</h2>
            </div>
            <div className="mt-6 border-t border-rule pt-2">
              {c.keyPoints.map((k) => (
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

            {c.aitia?.length ? (
              <>
                <div className="vp-prose mt-12">
                  <h2>Stories told about the rite</h2>
                  <p>
                    Ancient writers offered these as explaining the practice.
                    They are evidence for what the tradition said about
                    itself, and they are not the origin of anything: each is
                    given with the author who tells it and the distance
                    between the two.
                  </p>
                </div>
                <ul className="mt-6 space-y-6">
                  {c.aitia.map((a) => (
                    <li
                      key={a.whatItExplains}
                      className="border-l border-rule pl-5"
                    >
                      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                        <EvidenceBadge level="mythological" />
                        <p className="text-xs uppercase tracking-eyebrow text-stone">
                          {a.source}
                        </p>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-charcoal">
                        {a.story}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-charcoal-100">
                        <span className="text-stone">Offered as explaining — </span>
                        {a.whatItExplains}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-charcoal-100">
                        {a.note}
                      </p>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            {c.terms?.length ? (
              <>
                <div className="vp-prose mt-12">
                  <h2>Vocabulary</h2>
                </div>
                <dl className="mt-6 space-y-5">
                  {c.terms.map((t) => (
                    <div key={t.term} className="border-l border-rule pl-5">
                      <dt className="font-serif text-lg italic text-charcoal">
                        {t.term}
                      </dt>
                      <dd className="mt-1 text-sm leading-relaxed text-charcoal-100">
                        {t.gloss}
                      </dd>
                    </div>
                  ))}
                </dl>
              </>
            ) : null}

            {c.disputes?.length ? (
              <>
                <div className="vp-prose mt-12">
                  <h2>Contested points</h2>
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
                Where this comes from
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

            {touched.length ? (
              <section className="mt-12 border-l-2 border-rule pl-5">
                <p className="vp-eyebrow">Covered elsewhere</p>
                <ul className="mt-3 space-y-3 text-sm leading-relaxed text-charcoal-100">
                  {touched.map((d) => (
                    <li key={d.subject}>
                      <Link href={d.route} className="vp-link text-charcoal">
                        {d.subject}
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
            {siblings.length ? (
              <>
                <p className="vp-eyebrow">Related practices</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {siblings.map((x) => (
                    <li key={x!.slug}>
                      <Link
                        href={`/ancient-religion/${x!.slug}`}
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
                <p className="vp-eyebrow mt-8">Sanctuaries and cities</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {cities.map((x) => (
                    <li key={x!.slug}>
                      <Link
                        href={`/cities/${x!.slug}`}
                        className="vp-link text-charcoal-100"
                      >
                        {x!.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
            {buildings.length ? (
              <>
                <p className="vp-eyebrow mt-8">The buildings</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {buildings.map((x) => (
                    <li key={x!.slug}>
                      <Link
                        href={`/architecture/${x!.slug}`}
                        className="vp-link text-charcoal-100"
                      >
                        {x!.title}
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
                  {institutions.map((x) => (
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
            {books.length ? (
              <>
                <p className="vp-eyebrow mt-8">Sources</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {books.map((x) => (
                    <li key={x.slug}>
                      <Link
                        href={hrefFor("book", x.slug)}
                        className="vp-link text-charcoal-100"
                      >
                        {x.frontmatter.title}
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
                <Link
                  href="/ancient-religion"
                  className="vp-link text-charcoal-100"
                >
                  All cult and rite
                </Link>
              </li>
              <li>
                <Link
                  href="/religion-and-wisdom"
                  className="vp-link text-charcoal-100"
                >
                  Religion &amp; Wisdom
                </Link>
              </li>
            </ul>
          </aside>
        </div>

        <RelatedReading
          items={siblings.slice(0, 4).map((x) => ({
            href: `/ancient-religion/${x!.slug}`,
            title: x!.title,
            kind: CULT_TIER_LABEL[x!.tier].toLowerCase(),
            excerpt: x!.standfirst,
          }))}
        />
      </Container>
    </>
  );
}
