import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/editorial/PageHeader";
import { EvidenceBadge, EvidenceKey } from "@/components/editorial/EvidenceBadge";
import { JsonLd } from "@/components/seo/JsonLd";
import { getFigures, hrefFor } from "@/content/loader";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const TITLE = "Figures of the tradition";
const DESCRIPTION =
  "Characters preserved by Greek epic and myth — Odysseus, Penelope, Telemachus, Circe, Athena and the rest of the Odyssey's cast. Kept deliberately separate from the historical figures in our Philosophers layer, because a tradition preserving a character is not the same as a record attesting a person.";

const GROUP_ORDER = [
  { type: "mortal", label: "Mortal characters" },
  { type: "divine", label: "Divine powers" },
  { type: "monstrous", label: "Monstrous figures" },
  { type: "composite", label: "Composite figures" },
] as const;

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/figures",
});

export default async function FiguresIndexPage() {
  const figures = (await getFigures()).filter(
    (f) => f.frontmatter.status === "published",
  );

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: TITLE, href: "/figures" },
        ])}
      />
      <PageHeader
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Figures" }]}
        eyebrow="Library"
        title={TITLE}
        description={DESCRIPTION}
        meta={`${figures.length} figures`}
      />
      <Container width="editorial" className="py-16">
        <div className="max-w-prose">
          <p className="font-serif text-lede text-charcoal-100">
            Homer himself is not here. He is filed under{" "}
            <Link href="/philosophers/homer" className="vp-link">
              Philosophers
            </Link>
            , with the authors, because whatever else is uncertain about him,
            the tradition treats him as a poet rather than as a character. The
            people in his poems are here.
          </p>
          <p className="mt-5 text-charcoal-100">
            Every page below states, at the top, what can actually be said
            about the figure&rsquo;s historicity, and lists separately which
            ancient source preserves which version of the story. Traditions
            about these figures contradict one another. We set the
            contradictions out rather than smoothing them into a single
            invented biography.
          </p>
        </div>

        {GROUP_ORDER.map((group) => {
          const inGroup = figures.filter(
            (f) => f.frontmatter.figureType === group.type,
          );
          if (!inGroup.length) return null;
          return (
            <section key={group.type} className="mt-16">
              <h2 className="vp-eyebrow border-b border-rule pb-3">
                {group.label}
              </h2>
              <ul className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                {inGroup.map((f) => (
                  <li key={f.slug} className="border-l border-rule pl-5">
                    <EvidenceBadge level={f.frontmatter.historicity} />
                    <h3 className="mt-3 font-serif text-xl text-charcoal">
                      <Link
                        href={hrefFor("figure", f.slug)}
                        className="hover:text-bronze"
                      >
                        {f.frontmatter.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal-100">
                      {f.frontmatter.description}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        <EvidenceKey className="mt-20" />
      </Container>
    </>
  );
}
