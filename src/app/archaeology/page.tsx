import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/editorial/PageHeader";
import { EvidenceKey } from "@/components/editorial/EvidenceBadge";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  SITE_KIND_LABEL,
  SITE_REGION_LABEL,
  SITE_REGION_ORDER,
  siteStats,
  sitesInRegion,
} from "@/data/archaeological-sites";
import { MUSEUMS } from "@/data/museums";
import { OBJECT_PROVENANCE } from "@/data/object-provenance";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const TITLE = "Archaeological sites";
const DESCRIPTION =
  "The excavated places of the ancient world — who dug them and when, what came out of the ground, which museums hold it now, and what is still argued about.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/archaeology",
});

export default function ArchaeologyIndexPage() {
  const stats = siteStats();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: TITLE, href: "/archaeology" },
        ])}
      />
      <PageHeader
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Archaeology" }]}
        eyebrow="The evidence layer"
        title={TITLE}
        description={DESCRIPTION}
        meta={`${stats.total} sites · ${stats.excavations} recorded excavations · ${stats.disputes} unresolved questions`}
      />
      <Container width="editorial" className="py-16">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-8 vp-prose">
            <p>
              This layer answers a narrow question: <em>how do we know?</em>{" "}
              Every site page here is an account of evidence recovery — the
              excavation history with the excavators named, the structures
              that survive, the objects that came out and where they went,
              and the arguments that are still open.
            </p>
            <p>
              It is deliberately not a second cities layer. A site page does
              not describe a settlement&rsquo;s political history or its
              economy; those live on{" "}
              <Link href="/cities">the cities pages</Link>, and a slug used
              there cannot be used here. Four of these sites sit inside cities
              the platform already covers — the Acropolis and the Agora inside
              Athens, the Forum and the Palatine inside Rome — and each of
              those pages carries a line at the top pointing at its city.
            </p>
            <p>
              It is also not a buildings layer.{" "}
              <Link href="/architecture">Architecture</Link> explains what a
              temple, a stoa or a barrel vault is; a site page names its
              structures and links each one to the type that explains it.
            </p>

            <h2>What the excavators got wrong</h2>
            <p>
              A recurring subject. The colossal statue in the Roman Forum was
              called Commodus for four centuries. Woolley published a silt
              layer at Ur as the flood of Genesis. Evans rebuilt Knossos in
              reinforced concrete and fixed a set of hypotheses in permanent
              material. Balanos repaired the Parthenon with iron clamps that
              rusted and split the marble, and the current restoration exists
              to undo him. These are not anecdotes about incompetence; they
              are how the discipline learned what it now does.
            </p>

            <h2>Where the finds went</h2>
            <p>
              Almost nothing on these sites is still on them. The finds are in{" "}
              <Link href="/museums">{MUSEUMS.length} institutions</Link>, and
              where an object has a full provenance record it has its own{" "}
              <Link href="/museums">
                entry among the {OBJECT_PROVENANCE.length} catalogued objects
              </Link>
              . Where a holding is contested, the museum page says so and this
              platform does not adjudicate it.
            </p>

            <h2>Coordinates and dates</h2>
            <p>
              {stats.withCoordinates} of these sites carry a coordinate pair.
              Each one names the feature it points at — a gate, a tomb, a
              hypostyle hall — and is given to three decimal places, roughly a
              hundred metres, because a site is not a point and its extent is
              usually the thing under discussion.
            </p>
            <p>
              Dates are stored as signed years, negative for BCE, with no year
              zero, and each one carries the precision it actually has:
              whether it is fixed by a document, estimated to the nearest
              half-century, given by tradition, or disputed. The eruption that
              buried Herculaneum and the shaft graves at Mycenae are both
              dates, and they are not the same kind of thing.
            </p>
          </div>

          <aside className="md:col-span-4 md:border-l md:border-rule md:pl-10">
            <p className="vp-eyebrow">The evidence layer</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/museums" className="vp-link text-charcoal-100">
                  Museums and object provenance
                </Link>
              </li>
              <li>
                <Link href="/cities" className="vp-link text-charcoal-100">
                  Ancient cities
                </Link>
              </li>
              <li>
                <Link href="/architecture" className="vp-link text-charcoal-100">
                  Ancient architecture
                </Link>
              </li>
              <li>
                <Link href="/ancient-religion" className="vp-link text-charcoal-100">
                  Ancient religion
                </Link>
              </li>
              <li>
                <Link href="/institutions" className="vp-link text-charcoal-100">
                  Institutions and government
                </Link>
              </li>
              <li>
                <Link href="/sources" className="vp-link text-charcoal-100">
                  Sources and editorial policy
                </Link>
              </li>
            </ul>

            <p className="vp-eyebrow mt-8">In this layer</p>
            <dl className="mt-3 space-y-3 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-eyebrow text-stone">
                  Structures described
                </dt>
                <dd className="text-charcoal-100">{stats.structures}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-eyebrow text-stone">
                  Finds traced
                </dt>
                <dd className="text-charcoal-100">{stats.finds}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-eyebrow text-stone">
                  Ancient sources cited
                </dt>
                <dd className="text-charcoal-100">{stats.primarySources}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-eyebrow text-stone">
                  Sites antiquity never described
                </dt>
                <dd className="text-charcoal-100">
                  {stats.withoutAncientTestimony}
                </dd>
              </div>
            </dl>
          </aside>
        </div>

        {SITE_REGION_ORDER.map((region) => {
          const inRegion = sitesInRegion(region);
          if (!inRegion.length) return null;
          return (
            <section key={region} className="mt-16">
              <h2 className="vp-eyebrow border-b border-rule pb-3">
                {SITE_REGION_LABEL[region]}
              </h2>
              <ul className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                {inRegion.map((s) => (
                  <li key={s.slug} className="border-l border-rule pl-5">
                    <p className="text-xs uppercase tracking-eyebrow text-stone">
                      {SITE_KIND_LABEL[s.kind]} · {s.geography.modernCountry}
                    </p>
                    <h3 className="mt-2 font-serif text-xl text-charcoal">
                      <Link
                        href={`/archaeology/${s.slug}`}
                        className="hover:text-bronze"
                      >
                        {s.name}
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal-100">
                      {s.standfirst}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        <EvidenceKey className="mt-20" />
      </Container>
    </>
  );
}
