import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/editorial/PageHeader";
import { EvidenceKey } from "@/components/editorial/EvidenceBadge";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  CONDITION_LABEL,
  MONUMENT_DEFERS_TO,
  MONUMENT_KIND_LABEL,
  conditionCounts,
  monumentStats,
  monumentsInRegion,
} from "@/data/monuments";
import {
  SITE_REGION_LABEL,
  SITE_REGION_ORDER,
} from "@/data/archaeological-sites";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const TITLE = "Ancient monuments";
const DESCRIPTION =
  "Named buildings of the ancient world — who paid for them, who built them, what they measure, what they meant, and how much of each one is actually still there.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/monuments",
});

export default function MonumentsIndexPage() {
  const stats = monumentStats();
  const conditions = conditionCounts().filter((c) => c.count > 0);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: TITLE, href: "/monuments" },
        ])}
      />
      <PageHeader
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Monuments" }]}
        eyebrow="The building layer"
        title={TITLE}
        description={DESCRIPTION}
        meta={`${stats.total} monuments · ${stats.measurements} sourced measurements · ${stats.disputes} unresolved questions`}
      />
      <Container width="editorial" className="py-16">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-8 vp-prose">
            <p>
              This layer covers individual buildings. It is deliberately
              separate from the three layers around it, because they answer
              different questions:
            </p>
            <ul>
              <li>
                <Link href="/cities/athens">Athens</Link> is a city — where it
                stood, how it was laid out, who lived in it.
              </li>
              <li>
                <Link href="/archaeology/acropolis-of-athens">
                  The Acropolis
                </Link>{" "}
                is an excavated site — who dug it, what came out of the
                ground, what the excavators got wrong.
              </li>
              <li>
                <Link href="/monuments/parthenon">The Parthenon</Link> is a
                monument — one building, its patron, its measurements, its
                politics and its condition.
              </li>
              <li>
                <Link href="/architecture/temple">The Greek temple</Link> is a
                building type — the form itself, across every example of it.
              </li>
            </ul>
            <p>
              Four entities, four search intents. The validator refuses to let
              them share a slug, a title or a section heading.
            </p>

            <h2>Every number says where it comes from</h2>
            <p>
              A monument page attracts figures, and most of the figures in
              circulation are modern estimates repeated as measurements. The
              Pantheon&rsquo;s dome is 43.3 metres across because it has been
              surveyed. The Colosseum held about fifty thousand people because
              somebody divided the seating by an assumed space per person. The
              Great Pyramid was 280 cubits high because an Egyptian unit has
              been converted on an assumption about its length.
            </p>
            <p>
              Those are three different kinds of statement, and there is no
              field in this registry where a bare number can be stored. The
              same applies to names: an attribution is marked documented only
              where an inscription, a building account, a brick stamp or a
              named ancient source with a chapter supports it. Iktinos is
              named for the Parthenon by Plutarch four centuries later.
              Philokles is named for the Erechtheion in a contemporary
              Athenian inspection inscription. Imhotep is named on a statue
              base of his own king. Those are three different claims and the
              pages do not treat them as one.
            </p>

            <h2>What is actually still there</h2>
            <p>
              The most useful thing a monument page can tell a reader first is
              how much of it exists. The Pantheon is roofed and entire; the
              Temple of Castor and Pollux is three columns; the Ara Pacis was
              dug out in pieces over four centuries and rebuilt several
              hundred metres from where it stood; Etemenanki is a flooded hole
              in the ground. Each page states its condition in the header.
            </p>
          </div>

          <aside className="md:col-span-4 md:border-l md:border-rule md:pl-10">
            <p className="vp-eyebrow">Condition</p>
            <dl className="mt-3 space-y-2 text-sm">
              {conditions.map((c) => (
                <div key={c.condition} className="flex justify-between gap-4">
                  <dt className="text-charcoal-100">
                    {CONDITION_LABEL[c.condition]}
                  </dt>
                  <dd className="text-stone">{c.count}</dd>
                </div>
              ))}
            </dl>

            <p className="vp-eyebrow mt-8">Read across</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/architecture" className="vp-link text-charcoal-100">
                  Ancient architecture
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
              <li>
                <Link href="/museums" className="vp-link text-charcoal-100">
                  Museums and provenance
                </Link>
              </li>
            </ul>

            <p className="vp-eyebrow mt-8">In this layer</p>
            <dl className="mt-3 space-y-3 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-eyebrow text-stone">
                  Attributions recorded
                </dt>
                <dd className="text-charcoal-100">{stats.attributions}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-eyebrow text-stone">
                  Fragments traced elsewhere
                </dt>
                <dd className="text-charcoal-100">{stats.fragments}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-eyebrow text-stone">
                  Building phases
                </dt>
                <dd className="text-charcoal-100">{stats.phases}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-eyebrow text-stone">
                  Ancient sources cited
                </dt>
                <dd className="text-charcoal-100">{stats.primarySources}</dd>
              </div>
            </dl>
          </aside>
        </div>

        {SITE_REGION_ORDER.map((region) => {
          const inRegion = monumentsInRegion(region);
          if (!inRegion.length) return null;
          return (
            <section key={region} className="mt-16">
              <h2 className="vp-eyebrow border-b border-rule pb-3">
                {SITE_REGION_LABEL[region]}
              </h2>
              <ul className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                {inRegion.map((m) => (
                  <li key={m.slug} className="border-l border-rule pl-5">
                    <p className="text-xs uppercase tracking-eyebrow text-stone">
                      {MONUMENT_KIND_LABEL[m.kind]} ·{" "}
                      {CONDITION_LABEL[m.survival.condition]}
                    </p>
                    <h3 className="mt-2 font-serif text-xl text-charcoal">
                      <Link
                        href={`/monuments/${m.slug}`}
                        className="hover:text-bronze"
                      >
                        {m.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal-100">
                      {m.standfirst}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        <section className="mt-16">
          <h2 className="vp-eyebrow border-b border-rule pb-3">
            Covered elsewhere
          </h2>
          <p className="mt-4 max-w-prose text-sm leading-relaxed text-stone-400">
            Subjects that look like monuments and already have a page. A
            second one would say the same things for the same query, so this
            layer links rather than duplicating, and the validator fails the
            build if a deferral points at something that does not exist.
          </p>
          <ul className="mt-6 space-y-5">
            {MONUMENT_DEFERS_TO.map((d) => (
              <li key={d.subject} className="border-l border-rule pl-5">
                <h3 className="font-serif text-lg text-charcoal">
                  {d.subject}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-charcoal-100">
                  {d.reason}
                </p>
                <p className="mt-2 text-sm">
                  <Link
                    href={
                      d.targetKind === "site"
                        ? `/archaeology/${d.target}`
                        : d.targetKind === "city"
                          ? `/cities/${d.target}`
                          : `/architecture/${d.target}`
                    }
                    className="vp-link text-charcoal-100"
                  >
                    Go to the page that covers it
                  </Link>
                </p>
              </li>
            ))}
          </ul>
        </section>

        <EvidenceKey className="mt-20" />
      </Container>
    </>
  );
}
