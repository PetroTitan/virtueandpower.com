import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/editorial/PageHeader";
import { EssayHero } from "@/components/editorial/EssayHero";
import { Prose } from "@/components/editorial/Typography";
import { JsonLd } from "@/components/seo/JsonLd";
import { getEssays, hrefFor } from "@/content/loader";
import {
  estimateReadingMinutes,
  formatReadingTime,
} from "@/content/reading-time";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const PATH = "/essays";
const TITLE = "Essays";
const DESCRIPTION =
  "Editorial essays from Virtue & Power — interpretive long-form on the questions classical philosophy returns to, written with the same source discipline as the library entries.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default async function EssaysIndex() {
  const essays = await getEssays();
  // Newest first by `updated`, then alphabetical for stable ordering.
  const sorted = [...essays].sort((a, b) => {
    const dateCmp =
      new Date(b.frontmatter.updated).getTime() -
      new Date(a.frontmatter.updated).getTime();
    if (dateCmp !== 0) return dateCmp;
    return a.frontmatter.title.localeCompare(b.frontmatter.title, "en");
  });

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Essays", href: PATH },
        ])}
      />
      <PageHeader
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Essays" }]}
        eyebrow="From the Journal"
        title="Essays"
        description={DESCRIPTION}
      />
      <Container width="editorial" className="pt-12">
        <Prose as="section" className="mb-12">
          <p>
            The essays are the platform&rsquo;s interpretive surface. The library
            entries (on philosophers, books, themes) orient a reader; the essays
            argue. They are written to the same standards — primary sources,
            careful citation, no invented quotations — but they are willing to
            commit to a reading where the entries hold back.
          </p>
        </Prose>
      </Container>

      <Container width="editorial" className="pb-12">
        {sorted.length ? (
          <div>
            {sorted.map((essay) => {
              const minutes = estimateReadingMinutes(
                essay.body,
                essay.frontmatter.readingTime,
              );
              const metaParts: string[] = [];
              if (essay.frontmatter.domain) metaParts.push(essay.frontmatter.domain);
              metaParts.push(formatReadingTime(minutes));
              return (
                <EssayHero
                  key={essay.slug}
                  eyebrow={essay.frontmatter.domain ?? "Essay"}
                  title={essay.frontmatter.title}
                  dek={essay.frontmatter.subtitle ?? essay.frontmatter.description}
                  href={hrefFor("essay", essay.slug)}
                  meta={metaParts.join(" · ")}
                />
              );
            })}
          </div>
        ) : (
          <p className="text-charcoal-100">No essays published yet.</p>
        )}
      </Container>
    </>
  );
}
