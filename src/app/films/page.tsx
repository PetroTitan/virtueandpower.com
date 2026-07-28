import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/editorial/PageHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { FILM_PAGES, NOLAN_ODYSSEY } from "@/data/films";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const TITLE = "The ancient world on screen";
const DESCRIPTION =
  "Screen adaptations of classical material, assessed as cinema and as adaptation. Every departure we allege is recorded in a claim ledger with its evidence attached before it appears in any review.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/films",
});

export default function FilmsIndexPage() {
  const root = `/films/${NOLAN_ODYSSEY.slug}`;
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: TITLE, href: "/films" },
        ])}
      />
      <PageHeader
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Films" }]}
        eyebrow="Criticism"
        title={TITLE}
        description={DESCRIPTION}
      />
      <Container width="editorial" className="py-16">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-8 vp-prose">
            <p>
              A classical publication has an obvious reason to write about
              films of classical material and an obvious way to do it badly.
              The bad way is to score adaptations against a checklist of
              departures, which produces a list rather than a judgement and
              treats fidelity as though it were a virtue in itself.
            </p>
            <p>
              The tradition that produced these texts transformed its
              material continuously. The <em>Odyssey</em> reworks older
              poetry; the wooden horse most readers picture comes from
              Virgil rather than Homer; and every English translation is a
              modernisation. A film is entitled to interpret.
            </p>
            <p>
              What we do instead is separate the two questions a screen
              adaptation raises — is it good, and is it the thing it says it
              is — and answer both with evidence. Every departure we allege
              is entered in a claims ledger first, with the passages that
              establish it, its classification, its confidence level and the
              competing reading where one exists. Prose pages may summarise
              and argue; they may not assert a departure that is not in the
              ledger.
            </p>
            <p>
              And we do not confuse departures from a poem with departures
              from an archaeological reconstruction. Those are different
              charges with different force, and the poem itself departs from
              the archaeology constantly.
            </p>

            <h2>Current analysis</h2>
          </div>
          <aside className="md:col-span-4 md:border-l md:border-rule md:pl-10">
            <p className="vp-eyebrow">Method</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  href={`${root}/what-the-film-changed`}
                  className="vp-link text-charcoal-100"
                >
                  The claims ledger
                </Link>
              </li>
              <li>
                <Link href="/homer-and-history" className="vp-link text-charcoal-100">
                  Homer and history
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/odyssey-myth-and-history"
                  className="vp-link text-charcoal-100"
                >
                  Odyssey: myth and history
                </Link>
              </li>
              <li>
                <Link href="/editorial-policy" className="vp-link text-charcoal-100">
                  Editorial policy
                </Link>
              </li>
            </ul>
          </aside>
        </div>

        <section className="mt-4">
          <div className="border-t border-charcoal-50 pt-8">
            <p className="vp-eyebrow">Feature film · 2026</p>
            <h2 className="mt-3 font-serif text-display-2 text-charcoal">
              <Link href={root} className="hover:text-bronze">
                Christopher Nolan&rsquo;s The Odyssey
              </Link>
            </h2>
            <p className="mt-4 max-w-2xl font-serif text-lede text-charcoal-100">
              Released {NOLAN_ODYSSEY.releaseDateDisplay}. The best screen
              Odyssey there has been, and not the Odyssey — a film that
              preserves the poem&rsquo;s structure and resolves the
              ambiguity the poem refuses to.
            </p>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2">
              {FILM_PAGES.filter((p) => p.path !== root).map((p) => (
                <li key={p.path} className="border-l border-rule pl-5">
                  <h3 className="font-serif text-xl text-charcoal">
                    <Link href={p.path} className="hover:text-bronze">
                      {p.label}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm text-charcoal-100">{p.summary}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </Container>
    </>
  );
}
