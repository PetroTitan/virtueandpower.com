import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/editorial/PageHeader";
import { EssayHero } from "@/components/editorial/EssayHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { getComparisons, hrefFor } from "@/content/loader";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const PATH = "/comparisons";
const TITLE = "Comparisons";
const DESCRIPTION =
  "Side-by-side studies of thinkers, traditions and texts — written to follow the argument, not the slogan.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default async function ComparisonsIndex() {
  const comparisons = await getComparisons();
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Comparisons", href: PATH },
        ])}
      />
      <PageHeader
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Comparisons" }]}
        eyebrow="Studies"
        title="Comparisons"
        description={DESCRIPTION}
      />
      <Container width="editorial" className="py-12">
        {comparisons.length ? (
          <div>
            {comparisons.map((c) => (
              <EssayHero
                key={c.slug}
                eyebrow={c.frontmatter.domain ?? "Comparison"}
                title={c.frontmatter.title}
                dek={c.frontmatter.description}
                href={hrefFor("comparison", c.slug)}
              />
            ))}
          </div>
        ) : (
          <p className="text-charcoal-100">No entries yet.</p>
        )}
      </Container>
    </>
  );
}
