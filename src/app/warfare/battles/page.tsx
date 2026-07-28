import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/editorial/PageHeader";
import { EvidenceKey } from "@/components/editorial/EvidenceBadge";
import { JsonLd } from "@/components/seo/JsonLd";
import { BATTLES, battlesChronological } from "@/data/battles";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const TITLE = "Battles of the ancient world";
const DESCRIPTION =
  "Battle pages for the Greek, Persian, Macedonian and Roman worlds — what happened, what the sources say, what archaeology supports, and what remains disputed, with every troop figure carrying its provenance.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/warfare/battles",
});

export default function BattlesIndexPage() {
  const ordered = battlesChronological();
  const wars = [...new Set(ordered.map((b) => b.war))];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Warfare", href: "/warfare" },
          { name: "Battles", href: "/warfare/battles" },
        ])}
      />
      <PageHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Warfare", href: "/warfare" },
          { label: "Battles" },
        ]}
        eyebrow="Encyclopedia"
        title={TITLE}
        description={DESCRIPTION}
        meta={`${BATTLES.length} battles · in chronological order`}
      />
      <Container width="editorial" className="py-16">
        <div className="max-w-prose vp-prose">
          <p>
            Every battle page states the forces claimed, who claimed them and
            what the claim is worth. That structure exists because ancient
            troop figures are the least reliable numbers in classical
            historiography, and repeating them without comment is the standard
            failure of popular military history.
          </p>
          <p>
            Where a site cannot be located, the page says so — Zama, the
            decisive battle of the Second Punic War, has never been securely
            placed on the ground. Where a modern political afterlife will reach
            a reader before the ancient evidence does, as at Thermopylae and
            Actium, the page describes that afterlife as reception rather than
            adopting it.
          </p>
        </div>

        {wars.map((war) => (
          <section key={war} className="mt-14">
            <h2 className="vp-eyebrow border-b border-rule pb-3">{war}</h2>
            <ul className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {ordered
                .filter((b) => b.war === war)
                .map((b) => (
                  <li key={b.slug} className="border-l border-rule pl-5">
                    <p className="text-xs uppercase tracking-eyebrow text-stone">
                      {b.date} · {b.location.modern}
                    </p>
                    <h3 className="mt-2 font-serif text-xl text-charcoal">
                      <Link
                        href={`/warfare/battles/${b.slug}`}
                        className="hover:text-bronze"
                      >
                        {b.name}
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal-100">
                      {b.standfirst}
                    </p>
                  </li>
                ))}
            </ul>
          </section>
        ))}

        <EvidenceKey className="mt-20" />
      </Container>
    </>
  );
}
