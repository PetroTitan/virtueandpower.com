import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/editorial/PageHeader";
import { EvidenceKey } from "@/components/editorial/EvidenceBadge";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  TIER_LABEL,
  TIER_ORDER,
  WARFARE_TOPICS,
  topicsByTier,
} from "@/data/warfare";
import { BATTLES, battlesChronological } from "@/data/battles";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const TITLE = "Ancient warfare";
const DESCRIPTION =
  "How the Greek, Roman, Persian and Egyptian worlds made war — formations, armies, ships, siege engineering, logistics and command, with every claim carrying the level of evidence that supports it.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/warfare",
});

export default function WarfareIndexPage() {
  const hubs = topicsByTier("civilization-hub");
  const recent = battlesChronological().slice(0, 6);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: TITLE, href: "/warfare" },
        ])}
      />
      <PageHeader
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Warfare" }]}
        eyebrow="Encyclopedia"
        title={TITLE}
        description={DESCRIPTION}
        meta={`${WARFARE_TOPICS.length} topics · ${BATTLES.length} battles`}
      />
      <Container width="editorial" className="py-16">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-8 vp-prose">
            <p>
              Ancient warfare is written about more confidently than the
              evidence allows. The numbers are rhetorical, the tactical
              reconstructions are inferences from a handful of passages, and
              the most familiar details — the drill of the Roman line relief,
              the mechanics of the hoplite push, the routine of decimation —
              are frequently repeated and thinly attested.
            </p>
            <p>
              This encyclopedia therefore attaches an evidence level to every
              substantive claim, and it does so most insistently where the
              temptation is greatest. No troop figure on this platform appears
              as a bare number. Each one carries the source that gives it and
              an assessment of what it is worth, so that Herodotus&rsquo;s
              1,700,000 Persians and the modern reconstruction that replaces
              them can sit on the same page without being confused.
            </p>
            <p>
              Describing how an army worked is not endorsing what it was for.
              Sparta&rsquo;s military system rested on the permanent subjection
              of the helots; Rome&rsquo;s manpower rested on conquest and
              slavery. Those facts belong in the description.
            </p>
          </div>
          <aside className="md:col-span-4 md:border-l md:border-rule md:pl-10">
            <p className="vp-eyebrow">Start here</p>
            <ul className="mt-3 space-y-2 text-sm">
              {hubs.map((h) => (
                <li key={h.slug}>
                  <Link href={`/warfare/${h.slug}`} className="vp-link text-charcoal-100">
                    {h.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/warfare/battles" className="vp-link text-charcoal-100">
                  All battles
                </Link>
              </li>
            </ul>
          </aside>
        </div>

        {TIER_ORDER.map((tier) => {
          const topics = topicsByTier(tier);
          if (!topics.length) return null;
          return (
            <section key={tier} className="mt-16">
              <h2 className="vp-eyebrow border-b border-rule pb-3">
                {TIER_LABEL[tier]}
              </h2>
              <ul className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                {topics.map((t) => (
                  <li key={t.slug} className="border-l border-rule pl-5">
                    <p className="text-xs uppercase tracking-eyebrow text-stone">
                      {t.period}
                    </p>
                    <h3 className="mt-2 font-serif text-xl text-charcoal">
                      <Link href={`/warfare/${t.slug}`} className="hover:text-bronze">
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

        <section className="mt-20 border-t border-charcoal-50 pt-10">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="font-serif text-display-2 text-charcoal">Battles</h2>
            <Link
              href="/warfare/battles"
              className="vp-link text-sm uppercase tracking-eyebrow"
            >
              All {BATTLES.length} battles
            </Link>
          </div>
          <ul className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {recent.map((b) => (
              <li key={b.slug} className="border-l border-rule pl-5">
                <p className="text-xs uppercase tracking-eyebrow text-stone">
                  {b.date}
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

        <EvidenceKey className="mt-20" />
      </Container>
    </>
  );
}
