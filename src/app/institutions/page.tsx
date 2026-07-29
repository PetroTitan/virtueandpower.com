import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/editorial/PageHeader";
import { EvidenceKey } from "@/components/editorial/EvidenceBadge";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  INSTITUTIONS,
  INSTITUTIONS_DEFER_TO_WARFARE,
  INST_TIER_LABEL,
  INST_TIER_ORDER,
  institutionsByTier,
} from "@/data/institutions";
import { getWarfareTopic } from "@/data/warfare";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const TITLE = "Institutions and government";
const DESCRIPTION =
  "Assemblies, councils, magistracies and the machinery of empire — what each ancient office actually did, how far its powers reached, and how much of the constitution we can genuinely reconstruct.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/institutions",
});

export default function InstitutionsIndexPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: TITLE, href: "/institutions" },
        ])}
      />
      <PageHeader
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Institutions" }]}
        eyebrow="Encyclopedia"
        title={TITLE}
        description={DESCRIPTION}
        meta={`${INSTITUTIONS.length} offices and bodies`}
      />
      <Container width="editorial" className="py-16">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-8 vp-prose">
            <p>
              Ancient constitutions are mostly known through people
              reconstructing them. Livy described fifth-century Rome from
              the first century BCE. Plutarch described Lycurgus without
              being able to say when, or whether, he lived. Aristotle
              described Sparta while arguing that its constitution was
              defective. Almost none of these authors was describing a
              system he had seen working.
            </p>
            <p>
              So each page here separates what an office <em>was</em>, how
              it <em>worked</em>, what it could and could not do, and how it
              changed — and every claim about the last of those carries an
              evidence level. Where the constitutional detail is a later
              reconstruction, the page says so rather than presenting a tidy
              diagram of powers.
            </p>
            <p>
              These pages cover single organs. The political order they
              belonged to — how a republic or a monarchy held together as a
              whole — is covered on the{" "}
              <Link href="/civilizations">civilizations</Link> pages, and the
              two do not repeat each other.
            </p>
          </div>
          <aside className="md:col-span-4 md:border-l md:border-rule md:pl-10">
            <p className="vp-eyebrow">Covered under Warfare</p>
            <p className="mt-3 text-sm leading-relaxed text-stone-400">
              Command, recruitment and military discipline were institutions
              of the ancient state, and they are covered in the warfare
              encyclopedia rather than duplicated here.
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {INSTITUTIONS_DEFER_TO_WARFARE.map((d) => {
                const w = getWarfareTopic(d.warfareSlug);
                return w ? (
                  <li key={d.warfareSlug}>
                    <Link
                      href={`/warfare/${w.slug}`}
                      className="vp-link text-charcoal-100"
                    >
                      {d.subject}
                    </Link>
                  </li>
                ) : null;
              })}
            </ul>
            <p className="vp-eyebrow mt-8">Read across</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/civilizations" className="vp-link text-charcoal-100">
                  Civilizations
                </Link>
              </li>
              <li>
                <Link href="/cities" className="vp-link text-charcoal-100">
                  Ancient cities
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

        {INST_TIER_ORDER.map((tier) => {
          const items = institutionsByTier(tier);
          if (!items.length) return null;
          return (
            <section key={tier} className="mt-16">
              <h2 className="vp-eyebrow border-b border-rule pb-3">
                {INST_TIER_LABEL[tier]}
              </h2>
              <ul className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((i) => (
                  <li key={i.slug} className="border-l border-rule pl-5">
                    <p className="text-xs uppercase tracking-eyebrow text-stone">
                      {i.period}
                    </p>
                    <h3 className="mt-2 font-serif text-xl text-charcoal">
                      <Link
                        href={`/institutions/${i.slug}`}
                        className="hover:text-bronze"
                      >
                        {i.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal-100">
                      {i.standfirst}
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
