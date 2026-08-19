import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/editorial/PageHeader";
import { EvidenceKey } from "@/components/editorial/EvidenceBadge";
import { JsonLd } from "@/components/seo/JsonLd";
import { MUSEUMS } from "@/data/museums";
import { OBJECT_PROVENANCE, provenanceStats } from "@/data/object-provenance";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const TITLE = "Museums and object provenance";
const DESCRIPTION =
  "Where the objects on this platform came from and who holds them now — findspot, excavation, inventory, condition and the arguments over identification, with the gaps in our own catalogue stated rather than filled.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/museums",
});

export default function MuseumsIndexPage() {
  const stats = provenanceStats();
  const partial = OBJECT_PROVENANCE.filter((o) => o.completeness === "partial");

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: TITLE, href: "/museums" },
        ])}
      />
      <PageHeader
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Museums" }]}
        eyebrow="Archaeology"
        title={TITLE}
        description={DESCRIPTION}
        meta={`${MUSEUMS.length} institutions · ${stats.total} objects · ${stats.full} records checked, ${stats.partial} incomplete`}
      />
      <Container width="editorial" className="py-16">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-8 vp-prose">
            <p>
              Until now this platform showed you a photograph of an object
              and told you who took it. That is a licence credit, not a
              provenance. It did not tell you that the Caesar portrait came
              out of the ground at Tusculum in 1825, sat unidentified in a
              Savoy royal collection for a hundred and fifteen years, and
              owes its identification to a comparison with dated coins.
            </p>
            <p>
              This layer answers those questions where they can be answered.
              Each object record carries what the thing is, what it is made
              of, when it was made, where it was found, who excavated it,
              who holds it, what condition it is in, what has been restored,
              and how secure the identification of the subject actually is.
            </p>

            <h2>Why some records say &ldquo;not recorded&rdquo;</h2>
            <p>
              This catalogue could have been filled out to look complete.
              Inventory numbers, findspots and excavation dates are exactly
              the fields it would be easiest to invent and hardest for a
              reader to check, and a plausible-looking entry is worse than an
              absent one because it closes off the question.
            </p>
            <p>
              So every record is marked <strong>checked</strong> or{" "}
              <strong>incomplete</strong>, and incomplete records name what
              is missing. {stats.full} of {stats.total} are checked. The
              remaining {stats.partial} are a visible backlog, tracked by the
              content validator, not a hidden one.
            </p>

            <h2>Identification is the interesting part</h2>
            <p>
              Very few ancient portraits are securely identified. The Azara
              Alexander is, because the herm is inscribed. The Pericles is,
              for the same reason. The Tusculum Caesar rests on coins. The
              colossal Constantine was called Commodus for four centuries.
              And the bust captioned Plutarch on this site is a modern
              commemorative sculpture — no ancient portrait of him survives,
              and the object record says so.
            </p>
          </div>
          <aside className="md:col-span-4 md:border-l md:border-rule md:pl-10">
            <p className="vp-eyebrow">Records incomplete</p>
            <ul className="mt-3 space-y-2 text-sm">
              {partial.map((o) => (
                <li key={o.slug}>
                  <Link href={`/objects/${o.slug}`} className="vp-link text-charcoal-100">
                    {o.title}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="vp-eyebrow mt-8">Read across</p>
            <ul className="mt-3 space-y-2 text-sm">
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
                <Link href="/philosophers" className="vp-link text-charcoal-100">
                  Figures
                </Link>
              </li>
            </ul>
          </aside>
        </div>

        <section className="mt-16">
          <h2 className="vp-eyebrow border-b border-rule pb-3">Institutions</h2>
          <ul className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {MUSEUMS.map((m) => (
              <li key={m.slug} className="border-l border-rule pl-5">
                <p className="text-xs uppercase tracking-eyebrow text-stone">
                  {m.city}, {m.country}
                </p>
                <h3 className="mt-2 font-serif text-xl text-charcoal">
                  <Link href={`/museums/${m.slug}`} className="hover:text-bronze">
                    {m.name}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-100">
                  {m.standfirst}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16">
          <h2 className="vp-eyebrow border-b border-rule pb-3">Objects</h2>
          <ul className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {OBJECT_PROVENANCE.map((o) => (
              <li key={o.slug} className="border-l border-rule pl-5">
                <p className="text-xs uppercase tracking-eyebrow text-stone">
                  {o.completeness === "full" ? "Record checked" : "Record incomplete"}
                </p>
                <h3 className="mt-2 font-serif text-lg text-charcoal">
                  <Link href={`/objects/${o.slug}`} className="hover:text-bronze">
                    {o.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-100">
                  {o.objectType} · {o.dateMade.claim}
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
