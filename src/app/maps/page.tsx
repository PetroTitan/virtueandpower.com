import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/editorial/PageHeader";
import { Prose } from "@/components/editorial/Typography";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArchiveImage } from "@/components/site/ArchiveImage";
import { maps } from "@/data/maps";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const PATH = "/maps";
const TITLE = "Maps";
const DESCRIPTION =
  "Reference maps of the ancient world — Greece, Athens, Sparta, the Persian Empire, Alexander's conquests, the Roman Republic and Empire, Egypt and the Mediterranean — with political context and key locations.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default function MapsIndex() {
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
            A reference layer of historical maps — static, source-based, and
            cross-linked to the figures, texts and timelines they illuminate.
            Each map page sets out the political context, the key locations,
            and the related reading. Companion to the{" "}
            <Link href="/timelines">timelines</Link>.
          </p>
        </Prose>
        <ul className="grid gap-10 sm:grid-cols-2">
          {maps.map((m) => (
            <li key={m.slug}>
              <Link href={`/maps/${m.slug}`} className="group block">
                <div className="vp-marble overflow-hidden">
                  <ArchiveImage
                    slug={m.imageSlug}
                    showCaption={false}
                    sizes="(min-width: 768px) 45vw, 100vw"
                  />
                </div>
                <p className="vp-eyebrow mt-4">{m.eyebrow}</p>
                <h2 className="mt-1 font-serif text-2xl text-charcoal group-hover:text-bronze">
                  {m.title}
                </h2>
                <p className="mt-2 text-sm text-charcoal-100">{m.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
