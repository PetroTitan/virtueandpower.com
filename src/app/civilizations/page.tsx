import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/editorial/PageHeader";
import { EditorialGrid } from "@/components/editorial/EditorialGrid";
import { CivilizationCard } from "@/components/editorial/CivilizationCard";
import { Prose } from "@/components/editorial/Typography";
import { JsonLd } from "@/components/seo/JsonLd";
import { getCivilizations } from "@/content/loader";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const PATH = "/civilizations";
const TITLE = "Civilizations";
const DESCRIPTION =
  "Editorial hubs for the civilizations the platform reads — how each understood power, law, memory, religion, war and continuity, and what later civilizations took from them.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default async function CivilizationsIndex() {
  const civilizations = await getCivilizations();

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
        eyebrow="Library"
        title={TITLE}
        description={DESCRIPTION}
      />
      <Container width="editorial" className="py-16">
        <Prose as="section" className="mb-16">
          <p>
            Civilizations are the editorial frame inside which the
            platform's figures, books, themes and essays sit. Each
            hub reads a polity not as a chronology but as a working
            answer to a small set of questions — what authority
            consisted in, what law was for, what the citizen owed,
            how memory was kept, what the architecture and the army
            were the visible form of, and how the order ended or
            transmitted itself.
          </p>
          <p>
            The hubs grow slowly. A civilization is added only after
            the figures, books and essays it concerns have started to
            cluster densely enough to make the editorial reading
            possible.
          </p>
        </Prose>
        {civilizations.length ? (
          <EditorialGrid columns={2}>
            {civilizations.map((c) => (
              <CivilizationCard
                key={c.slug}
                slug={c.slug}
                title={c.frontmatter.title}
                subtitle={c.frontmatter.subtitle}
                period={c.frontmatter.period}
                description={c.frontmatter.description}
                heroImage={c.frontmatter.heroImage}
              />
            ))}
          </EditorialGrid>
        ) : (
          <p className="text-charcoal-100">No civilization hubs yet.</p>
        )}
      </Container>
    </>
  );
}
