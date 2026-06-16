import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/editorial/PageHeader";
import { Prose } from "@/components/editorial/Typography";
import { JsonLd } from "@/components/seo/JsonLd";
import { timelines } from "@/data/timelines";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const PATH = "/timelines";
const TITLE = "Timelines";
const DESCRIPTION =
  "Chronological timelines of the ancient world — Egypt, Greece, classical Athens, Sparta, Achaemenid Persia, Alexander, the Roman Republic and Empire, the Peloponnesian War, and the long arc of civilization — cross-linked to the figures and texts behind each event.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default function TimelinesIndex() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: TITLE, href: PATH },
        ])}
      />
      <PageHeader
        breadcrumbs={[{ label: "Home", href: "/" }, { label: TITLE }]}
        eyebrow="Reference"
        title={TITLE}
        description={DESCRIPTION}
      />
      <Container width="editorial" className="py-16">
        <Prose as="section" className="mb-12">
          <p>
            A reference layer of chronologies — static, source-based, and
            cross-linked to the figures, texts and maps each era belongs to.
            Dates follow conventional ancient chronology. Companion to the{" "}
            <Link href="/maps">maps</Link>.
          </p>
        </Prose>
        <ul className="divide-y divide-rule border-y border-rule">
          {timelines.map((t) => (
            <li key={t.slug}>
              <Link
                href={`/timelines/${t.slug}`}
                className="group flex flex-col gap-1 py-6 sm:flex-row sm:items-baseline sm:gap-6"
              >
                <p className="vp-eyebrow shrink-0 sm:w-40">{t.eyebrow}</p>
                <div>
                  <h2 className="font-serif text-2xl text-charcoal group-hover:text-bronze">
                    {t.title}
                  </h2>
                  <p className="mt-1 text-sm text-charcoal-100">
                    {t.description}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
