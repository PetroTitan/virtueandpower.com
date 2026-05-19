import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/editorial/PageHeader";
import { Eyebrow, Prose } from "@/components/editorial/Typography";
import { JsonLd } from "@/components/seo/JsonLd";
import { getGuides, hrefFor } from "@/content/loader";
import {
  estimateReadingMinutes,
  formatReadingTime,
} from "@/content/reading-time";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const PATH = "/guides";
const TITLE = "Guides";
const DESCRIPTION =
  "Reading and interpretive guides — orientations for a reader approaching a particular thinker, work or area of classical thought for the first time.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

// Editorially meaningful grouping for the guide kind. Order matters: a
// reader landing on /guides should see the "where do I start?" guides
// before the more focused thinker- and book-specific ones.
const GUIDE_GROUP_ORDER: ReadonlyArray<{
  key: NonNullable<Awaited<ReturnType<typeof getGuides>>[number]["frontmatter"]["guideType"]>;
  label: string;
  hint: string;
}> = [
  {
    key: "introduction",
    label: "Where to begin",
    hint: "Orientation for a reader new to classical thought.",
  },
  {
    key: "thinker",
    label: "On a thinker",
    hint: "How to approach the dialogues, treatises and biographies of a particular philosopher.",
  },
  {
    key: "book",
    label: "On a book",
    hint: "How to read a specific primary text on its own terms.",
  },
];

export default async function GuidesIndex() {
  const guides = await getGuides();

  // Group by guideType, leaving an "Other" bucket for any future kind not
  // yet in the order array.
  const groups = GUIDE_GROUP_ORDER.map((group) => ({
    ...group,
    entries: guides.filter((g) => g.frontmatter.guideType === group.key),
  })).filter((g) => g.entries.length);

  const ungrouped = guides.filter(
    (g) => !GUIDE_GROUP_ORDER.some((gr) => gr.key === g.frontmatter.guideType),
  );

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Guides", href: PATH },
        ])}
      />
      <PageHeader
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Guides" }]}
        eyebrow="Library"
        title="Guides"
        description={DESCRIPTION}
      />
      <Container width="editorial" className="pt-12">
        <Prose as="section" className="mb-16">
          <p>
            A guide is editorial scaffolding: where to start, what order to
            read in, what to expect from a particular thinker or work, what
            common misreadings to set aside. The guides are not summaries —
            they are written to send you back to the primary text in better
            shape than you started.
          </p>
        </Prose>
      </Container>

      <Container width="editorial" className="pb-16">
        {groups.length || ungrouped.length ? (
          <div className="space-y-16">
            {groups.map((group) => (
              <section key={group.key} aria-labelledby={`guide-${group.key}`}>
                <div className="border-b border-rule pb-3">
                  <Eyebrow as="h2">
                    <span id={`guide-${group.key}`}>{group.label}</span>
                  </Eyebrow>
                </div>
                <p className="mt-4 max-w-prose text-sm text-charcoal-100">
                  {group.hint}
                </p>
                <ul className="mt-8 divide-y divide-rule">
                  {group.entries.map((guide) => {
                    const minutes = estimateReadingMinutes(
                      guide.body,
                      guide.frontmatter.readingTime,
                    );
                    return (
                      <li key={guide.slug} className="group py-6">
                        <Link
                          href={hrefFor("guide", guide.slug)}
                          className="block"
                        >
                          <h3 className="font-serif text-heading-2 text-charcoal transition-colors group-hover:text-bronze">
                            {guide.frontmatter.title}
                          </h3>
                          {guide.frontmatter.subtitle ? (
                            <p className="mt-2 max-w-2xl font-serif italic text-stone">
                              {guide.frontmatter.subtitle}
                            </p>
                          ) : (
                            <p className="mt-2 max-w-2xl text-charcoal-100">
                              {guide.frontmatter.description}
                            </p>
                          )}
                          <p className="mt-3 text-xs uppercase tracking-eyebrow text-stone">
                            {formatReadingTime(minutes)}
                            <span className="ml-3 text-bronze">Read guide →</span>
                          </p>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}

            {ungrouped.length ? (
              <section aria-labelledby="guide-other">
                <div className="border-b border-rule pb-3">
                  <Eyebrow as="h2">
                    <span id="guide-other">Other</span>
                  </Eyebrow>
                </div>
                <ul className="mt-8 divide-y divide-rule">
                  {ungrouped.map((guide) => (
                    <li key={guide.slug} className="py-6">
                      <Link
                        href={hrefFor("guide", guide.slug)}
                        className="vp-link"
                      >
                        {guide.frontmatter.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>
        ) : (
          <p className="text-charcoal-100">No guides published yet.</p>
        )}
      </Container>
    </>
  );
}
