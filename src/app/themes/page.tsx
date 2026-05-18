import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/editorial/PageHeader";
import { EditorialGrid } from "@/components/editorial/EditorialGrid";
import { ThemeCard } from "@/components/editorial/ThemeCard";
import { Prose } from "@/components/editorial/Typography";
import { JsonLd } from "@/components/seo/JsonLd";
import { getThemes } from "@/content/loader";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const PATH = "/themes";
const TITLE = "Themes";
const DESCRIPTION =
  "Long-form studies of the recurring questions that classical and historical thought returned to: virtue, justice, power, leadership, statecraft.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default async function ThemesIndex() {
  const themes = await getThemes();
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Themes", href: PATH },
        ])}
      />
      <PageHeader
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Themes" }]}
        eyebrow="Studies"
        title="Themes"
        description={DESCRIPTION}
      />
      <Container width="editorial" className="py-16">
        <Prose as="section" className="mb-16">
          <p>
            Themes are the questions the classical tradition returned to
            again and again — virtue and justice, courage and self-control,
            leadership and ambition, power, statecraft and war. Each entry
            traces the question through its classical formation and its
            later reception, with the texts and figures named where they
            do the work.
          </p>
        </Prose>
        {themes.length ? (
          <EditorialGrid columns={3}>
            {themes.map((t) => (
              <ThemeCard
                key={t.slug}
                slug={t.slug}
                title={t.frontmatter.title}
                description={t.frontmatter.description}
                domain={t.frontmatter.domain}
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
