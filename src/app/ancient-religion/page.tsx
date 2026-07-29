import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/editorial/PageHeader";
import { EvidenceKey } from "@/components/editorial/EvidenceBadge";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  CULT_PRACTICES,
  CULT_TIER_LABEL,
  CULT_TIER_ORDER,
  RELIGION_DEFERS_TO,
  cultPracticesByTier,
} from "@/data/religion";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const TITLE = "Ancient religion: cult, rite and sanctuary";
const DESCRIPTION =
  "What people actually did — sacrifice, dedication, purification, initiation, divination and the care of the dead across the Greek, Roman, Egyptian and Near Eastern worlds, with what the evidence shows and what it cannot.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/ancient-religion",
});

export default function AncientReligionIndexPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Ancient religion", href: "/ancient-religion" },
        ])}
      />
      <PageHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Ancient religion" },
        ]}
        eyebrow="Encyclopedia"
        title={TITLE}
        description={DESCRIPTION}
        meta={`${CULT_PRACTICES.length} practices`}
      />
      <Container width="editorial" className="py-16">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-8 vp-prose">
            <p>
              Ancient religion was not primarily a matter of belief. There is
              no Greek or Latin word that means what <em>religion</em> means
              now; there was no scripture, no congregation, no conversion and
              no clergy in any sense a modern reader would recognise. What
              there was, in enormous quantity, was practice — things done at
              particular places on particular days, by particular people, at
              a cost.
            </p>
            <p>
              That is what these pages cover. Not the theology and not the
              politics, both of which the platform already treats at length,
              but the rite itself: how an animal was killed at an altar and
              what happened to the meat, who held a priesthood and how they
              got it, what was written on a curse tablet, what a night at a
              healing sanctuary involved, how Rome decided which foreign gods
              to admit.
            </p>
            <p>
              Every page separates three things that popular accounts run
              together. What the evidence attests. What the sources do{" "}
              <em>not</em> record — the mystery ban worked, household prayer
              was never written down, the Etruscan discipline survives only in
              Roman summary. And the stories the tradition told about a rite,
              which are given with the author who tells them and the distance
              between the two, because an ancient explanation of why a
              practice exists is evidence about the tradition and not about
              the practice.
            </p>
          </div>
          <aside className="md:col-span-4 md:border-l md:border-rule md:pl-10">
            <p className="vp-eyebrow">A different section</p>
            <p className="mt-3 text-sm leading-relaxed text-stone-400">
              This is the pre-Christian cult layer.{" "}
              <Link
                href="/religion-and-wisdom"
                className="vp-link text-charcoal-100"
              >
                Religion &amp; Wisdom
              </Link>{" "}
              is the separate standing section on the wisdom traditions —
              Hebrew scripture, the philosophical schools, the New Testament
              and the patristic inheritance. That one is about texts and
              doctrine; this one is about rite.
            </p>
            <p className="vp-eyebrow mt-8">Read across</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/cities" className="vp-link text-charcoal-100">
                  Cities and sanctuaries
                </Link>
              </li>
              <li>
                <Link
                  href="/architecture/temple"
                  className="vp-link text-charcoal-100"
                >
                  The temple as a building
                </Link>
              </li>
              <li>
                <Link
                  href="/themes/state-and-religion"
                  className="vp-link text-charcoal-100"
                >
                  Religion and the Roman state
                </Link>
              </li>
              <li>
                <Link href="/institutions" className="vp-link text-charcoal-100">
                  Institutions and government
                </Link>
              </li>
            </ul>
          </aside>
        </div>

        {CULT_TIER_ORDER.map((tier) => {
          const items = cultPracticesByTier(tier);
          if (!items.length) return null;
          return (
            <section key={tier} className="mt-16">
              <h2 className="vp-eyebrow border-b border-rule pb-3">
                {CULT_TIER_LABEL[tier]}
              </h2>
              <ul className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((c) => (
                  <li key={c.slug} className="border-l border-rule pl-5">
                    <p className="text-xs uppercase tracking-eyebrow text-stone">
                      {c.period}
                    </p>
                    <h3 className="mt-2 font-serif text-xl text-charcoal">
                      <Link
                        href={`/ancient-religion/${c.slug}`}
                        className="hover:text-bronze"
                      >
                        {c.title}
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

        <section className="mt-20 border-t border-rule pt-10">
          <h2 className="vp-eyebrow">
            Covered elsewhere on the platform ({RELIGION_DEFERS_TO.length})
          </h2>
          <div className="vp-prose mt-4">
            <p>
              A great deal of ancient religion was already published here
              before this section existed, and it belongs where it is. The
              list below is the boundary, written out: each subject, and the
              page that owns it. Nothing on it is covered again here.
            </p>
          </div>
          <ul className="mt-8 grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {RELIGION_DEFERS_TO.map((d) => (
              <li key={d.subject} className="border-l border-rule pl-5">
                <Link
                  href={d.route}
                  className="font-serif text-charcoal hover:text-bronze"
                >
                  {d.subject}
                </Link>
                <p className="mt-1 text-xs uppercase tracking-eyebrow text-stone">
                  {d.route}
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
