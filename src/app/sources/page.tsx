import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/editorial/PageHeader";
import { Prose } from "@/components/editorial/Typography";
import { SourceCard } from "@/components/editorial/SourceCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { sourceTypeLabel, sourcesByType } from "@/data/sources";

const PATH = "/sources";
const TITLE = "Sources";
const DESCRIPTION =
  "The texts, critical editions and reference works Virtue & Power relies on — the canonical list of where the editorial team reads from.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default function SourcesPage() {
  const groups = sourcesByType();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Sources", href: PATH },
        ])}
      />
      <PageHeader
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Sources" }]}
        eyebrow="Editorial"
        title="The sources we read from."
        description="A curated list of the critical editions, open archives and reference works the editorial team works with. New sources are added cautiously, after a human editor has confirmed they belong here."
      />

      <Container width="editorial" className="py-16 sm:py-20">
        <Prose as="section">
          <p>
            This page is the canonical record of where Virtue &amp; Power
            reads from. It is intentionally short. Every classical entry on
            the site is rooted in one of the primary texts catalogued
            below, normally via the named critical edition and almost
            always with cross-reference to one of the open-access digital
            archives so that readers can verify a passage themselves.
          </p>
          <p>
            We have written more about the standards behind the catalog —
            on citation, translation and the no-invented-quotations rule
            — on the{" "}
            <Link href="/editorial-policy" className="vp-link">
              editorial policy
            </Link>{" "}
            page.
          </p>
          <p>
            A note on copyright. The Greek and Latin texts themselves are
            ancient and not under copyright; many <em>translations</em>{" "}
            are, often for substantially longer than readers expect. Where
            we mark something <em>public domain</em>, we mean the work or
            the specific edition is reliably out of copyright in major
            jurisdictions. Where we mark something <em>mixed</em>, the
            text is public-domain but specific modern translations
            associated with it may not be. Where we do not know with
            confidence, we say <em>unverified</em> rather than guess.
          </p>
        </Prose>

        <div className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-[14rem_minmax(0,1fr)]">
          <nav aria-label="Source categories" className="md:sticky md:top-24 md:self-start">
            <p className="vp-eyebrow">Catalog</p>
            <ul className="mt-4 space-y-2 text-sm">
              {groups.map((group) => (
                <li key={group.type}>
                  <a
                    href={`#${group.type}`}
                    className="text-charcoal-100 hover:text-bronze"
                  >
                    {sourceTypeLabel[group.type]}
                  </a>
                  <span className="ml-2 text-xs uppercase tracking-eyebrow text-stone">
                    {group.entries.length}
                  </span>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-16">
            {groups.map((group) => (
              <section
                key={group.type}
                id={group.type}
                aria-labelledby={`${group.type}-heading`}
                className="scroll-mt-24"
              >
                <header className="border-b border-rule pb-3">
                  <h2
                    id={`${group.type}-heading`}
                    className="vp-eyebrow"
                  >
                    {sourceTypeLabel[group.type]}
                  </h2>
                </header>
                <div className="mt-8 space-y-10">
                  {group.entries.map((source) => (
                    <SourceCard key={source.id} source={source} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>

        <p className="mt-16 border-t border-rule pt-8 text-sm text-stone">
          Catalog last revised 2026-05-18. Inclusion in this list is not an
          endorsement of every claim a source makes; it is an indication
          that the source is one Virtue &amp; Power consults and would
          point a reader towards.
        </p>
      </Container>
    </>
  );
}
