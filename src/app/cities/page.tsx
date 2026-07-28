import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/editorial/PageHeader";
import { EvidenceKey } from "@/components/editorial/EvidenceBadge";
import { JsonLd } from "@/components/seo/JsonLd";
import { CITIES, CITY_TYPE_ORDER, citiesByType } from "@/data/cities";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const TITLE = "Ancient cities";
const DESCRIPTION =
  "The cities of the Greek, Roman, Egyptian and Persian worlds as places — their sites, plans, monuments, excavation histories and the museums that hold what came out of them.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/cities",
});

export default function CitiesIndexPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: TITLE, href: "/cities" },
        ])}
      />
      <PageHeader
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Cities" }]}
        eyebrow="Encyclopedia"
        title={TITLE}
        description={DESCRIPTION}
        meta={`${CITIES.length} cities`}
      />
      <Container width="editorial" className="py-16">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-8 vp-prose">
            <p>
              This layer covers cities as <em>places</em>: where they stood and
              why, how they were laid out, what was built in them, what has
              been dug up and where those finds are now.
            </p>
            <p>
              It runs alongside the{" "}
              <Link href="/civilizations">Civilizations</Link> layer rather
              than replacing it. Where both cover the same name — Athens,
              Sparta, Rome and Babylon — the division is between the place and
              the polity: <Link href="/cities/athens">Athens the city</Link> is
              the Acropolis, the Agora and the Long Walls, while{" "}
              <Link href="/civilizations/athens">Athens the civilization</Link>{" "}
              is the democracy. Each page carries a line at the top pointing at
              the other.
            </p>
            <p>
              Population figures get the same treatment battle numbers get
              elsewhere on this platform. There is no ancient census of any of
              these cities. &ldquo;Rome had a million people&rdquo; is an
              inference from the grain dole and an assumed density, not a
              result, and every estimate here carries what it rests on and what
              it is worth.
            </p>
            <p>
              So does the archaeology. Alexandria is mostly under a modern city
              and under water; Memphis was built of mudbrick on a floodplain
              and has largely dissolved; Sparta deliberately built almost
              nothing monumental, which Thucydides predicted would mislead
              posterity. Where a famous structure is known only from texts, the
              page says so.
            </p>
          </div>
          <aside className="md:col-span-4 md:border-l md:border-rule md:pl-10">
            <p className="vp-eyebrow">Read across</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/civilizations" className="vp-link text-charcoal-100">
                  Civilizations
                </Link>
              </li>
              <li>
                <Link href="/warfare" className="vp-link text-charcoal-100">
                  Ancient warfare
                </Link>
              </li>
              <li>
                <Link href="/maps" className="vp-link text-charcoal-100">
                  Maps
                </Link>
              </li>
              <li>
                <Link href="/timelines" className="vp-link text-charcoal-100">
                  Timelines
                </Link>
              </li>
            </ul>
          </aside>
        </div>

        {CITY_TYPE_ORDER.map((group) => {
          const inGroup = citiesByType(group.type);
          if (!inGroup.length) return null;
          return (
            <section key={group.type} className="mt-16">
              <h2 className="vp-eyebrow border-b border-rule pb-3">
                {group.label}
              </h2>
              <ul className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                {inGroup.map((c) => (
                  <li key={c.slug} className="border-l border-rule pl-5">
                    <p className="text-xs uppercase tracking-eyebrow text-stone">
                      {c.modernName}, {c.country}
                    </p>
                    <h3 className="mt-2 font-serif text-xl text-charcoal">
                      <Link href={`/cities/${c.slug}`} className="hover:text-bronze">
                        {c.name}
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal-100">
                      {c.standfirst}
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
