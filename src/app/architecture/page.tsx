import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/editorial/PageHeader";
import { EvidenceKey } from "@/components/editorial/EvidenceBadge";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  ARCHITECTURE_DEFERS_TO_WARFARE,
  ARCHITECTURE_TOPICS,
  ARCH_TIER_LABEL,
  ARCH_TIER_ORDER,
  architectureByTier,
} from "@/data/architecture";
import { getWarfareTopic } from "@/data/warfare";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const TITLE = "Ancient architecture";
const DESCRIPTION =
  "Temples, forums, baths, aqueducts, tombs and the technique behind them — how ancient buildings were made, what survives, and how we know what the rest looked like.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/architecture",
});

export default function ArchitectureIndexPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: TITLE, href: "/architecture" },
        ])}
      />
      <PageHeader
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Architecture" }]}
        eyebrow="Encyclopedia"
        title={TITLE}
        description={DESCRIPTION}
        meta={`${ARCHITECTURE_TOPICS.length} subjects`}
      />
      <Container width="editorial" className="py-16">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-8 vp-prose">
            <p>
              Ancient buildings reach us through four very different kinds
              of evidence, and popular accounts blend them. The Parthenon
              stands. The Temple of Zeus at Olympia is a heap of column
              drums lying where an earthquake dropped them. The Pharos is
              known from descriptions written centuries after it was built.
              And the tidy cutaway of a Greek house in a textbook is usually
              a drawing with no single excavated original behind it.
            </p>
            <p>
              So every named building on these pages carries an evidence
              level, and it answers a specific question:{" "}
              <em>how do we know what this looked like?</em> — not whether
              it existed.
            </p>
            <p>
              The other recurring correction is about survival. Most ancient
              building was mudbrick and timber, and almost none of it
              survives. What survives is stone and fired brick, used for
              temples, tombs and monuments. Every impression a visitor forms
              from ruins is skewed toward the exceptional, and the{" "}
              <Link href="/architecture/building-materials">materials page</Link>{" "}
              says so directly.
            </p>
          </div>
          <aside className="md:col-span-4 md:border-l md:border-rule md:pl-10">
            <p className="vp-eyebrow">Covered under Warfare</p>
            <p className="mt-3 text-sm leading-relaxed text-stone-400">
              Roads, walls, fortresses, siege works and camps are military
              infrastructure and are covered there rather than duplicated
              here.
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {ARCHITECTURE_DEFERS_TO_WARFARE.map((d) => {
                const w = getWarfareTopic(d.warfareSlug);
                return w ? (
                  <li key={d.warfareSlug}>
                    <Link href={`/warfare/${w.slug}`} className="vp-link text-charcoal-100">
                      {d.subject}
                    </Link>
                  </li>
                ) : null;
              })}
            </ul>
            <p className="vp-eyebrow mt-8">Read across</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/cities" className="vp-link text-charcoal-100">
                  Ancient cities
                </Link>
              </li>
              <li>
                <Link href="/museums" className="vp-link text-charcoal-100">
                  Museums and objects
                </Link>
              </li>
              <li>
                <Link href="/philosophers/vitruvius" className="vp-link text-charcoal-100">
                  Vitruvius
                </Link>
              </li>
            </ul>
          </aside>
        </div>

        {ARCH_TIER_ORDER.map((tier) => {
          const topics = architectureByTier(tier);
          if (!topics.length) return null;
          return (
            <section key={tier} className="mt-16">
              <h2 className="vp-eyebrow border-b border-rule pb-3">
                {ARCH_TIER_LABEL[tier]}
              </h2>
              <ul className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                {topics.map((t) => (
                  <li key={t.slug} className="border-l border-rule pl-5">
                    <p className="text-xs uppercase tracking-eyebrow text-stone">
                      {t.period}
                    </p>
                    <h3 className="mt-2 font-serif text-xl text-charcoal">
                      <Link href={`/architecture/${t.slug}`} className="hover:text-bronze">
                        {t.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal-100">
                      {t.standfirst}
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
