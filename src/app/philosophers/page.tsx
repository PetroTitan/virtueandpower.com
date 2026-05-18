import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/editorial/PageHeader";
import { EditorialGrid } from "@/components/editorial/EditorialGrid";
import { ThinkerCard } from "@/components/editorial/ThinkerCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPhilosophers } from "@/content/loader";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const PATH = "/philosophers";
const TITLE = "Philosophers";
const DESCRIPTION =
  "An editorial library of entries on the philosophers, statesmen, theologians and historians of the classical and historical tradition.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default async function PhilosophersIndex() {
  const philosophers = await getPhilosophers();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Philosophers", href: PATH },
        ])}
      />
      <PageHeader
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Philosophers" }]}
        eyebrow="Library"
        title="Philosophers"
        description={DESCRIPTION}
      />
      <Container width="editorial" className="py-16">
        {philosophers.length ? (
          <EditorialGrid columns={3}>
            {philosophers.map((p) => (
              <ThinkerCard
                key={p.slug}
                slug={p.slug}
                name={p.frontmatter.title}
                epithet={p.frontmatter.epithet}
                era={p.frontmatter.era}
                lifespan={p.frontmatter.lifespan}
                summary={p.frontmatter.description}
              />
            ))}
          </EditorialGrid>
        ) : (
          <p className="text-charcoal-100">No entries yet.</p>
        )}
      </Container>
    </>
  );
}
