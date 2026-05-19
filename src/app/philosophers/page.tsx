import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/editorial/PageHeader";
import { EditorialGrid } from "@/components/editorial/EditorialGrid";
import { ThinkerCard } from "@/components/editorial/ThinkerCard";
import { Eyebrow, Prose } from "@/components/editorial/Typography";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPhilosophers } from "@/content/loader";
import { getBustByFigure } from "@/data/busts";
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

/**
 * Stable, editorially-meaningful era order used to group the library.
 * Entries whose era doesn't match any of these labels fall into "Other".
 */
const eraOrder: ReadonlyArray<{ key: string; label: string }> = [
  { key: "Archaic Greece", label: "Archaic Greece" },
  { key: "Classical Greece", label: "Classical Greece" },
  { key: "Hellenistic Greece", label: "Hellenistic Greece" },
  { key: "Roman Republic", label: "Roman Republic" },
  { key: "Roman Empire", label: "Roman Empire" },
  // Plutarch is "Roman Empire (Greek under Rome)" — match by prefix.
];

type PhilosopherEntry = Awaited<ReturnType<typeof getPhilosophers>>[number];

function groupByEra(philosophers: PhilosopherEntry[]) {
  const buckets = new Map<string, PhilosopherEntry[]>();
  for (const p of philosophers) {
    const era = p.frontmatter.era ?? "Other";
    const matchedKey =
      eraOrder.find((e) => era === e.key || era.startsWith(`${e.key} `))?.label ?? era;
    const list = buckets.get(matchedKey);
    if (list) list.push(p);
    else buckets.set(matchedKey, [p]);
  }
  const ordered = [
    ...eraOrder
      .map((e) => ({ era: e.label, entries: buckets.get(e.label) ?? [] }))
      .filter((g) => g.entries.length),
    ...[...buckets.entries()]
      .filter(([era]) => !eraOrder.some((e) => e.label === era))
      .map(([era, entries]) => ({ era, entries })),
  ];
  return ordered;
}

export default async function PhilosophersIndex() {
  const philosophers = await getPhilosophers();
  const groups = groupByEra(philosophers);

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
        <Prose as="section" className="mb-16">
          <p>
            The classical and historical tradition is not a single voice. The
            entries below are organised by the era a thinker belongs to —
            Archaic, Classical and Hellenistic Greece, the Roman Republic and
            Empire, the Christian and medieval inheritance — so the reader
            can see at a glance where a figure stands in the long
            conversation. The library is curated and grows slowly; each
            entry is editorially reviewed before it leaves stub.
          </p>
        </Prose>

        {groups.length ? (
          <div className="space-y-16">
            {groups.map((group) => (
              <section key={group.era} aria-labelledby={`era-${group.era}`}>
                <div className="mb-8 border-b border-rule pb-3">
                  <Eyebrow as="h2">
                    <span id={`era-${group.era}`}>{group.era}</span>
                  </Eyebrow>
                </div>
                <EditorialGrid columns={3}>
                  {group.entries.map((p) => (
                    <ThinkerCard
                      key={p.slug}
                      slug={p.slug}
                      name={p.frontmatter.title}
                      epithet={p.frontmatter.epithet}
                      era={p.frontmatter.era}
                      lifespan={p.frontmatter.lifespan}
                      summary={p.frontmatter.description}
                      bust={getBustByFigure(p.slug)}
                    />
                  ))}
                </EditorialGrid>
              </section>
            ))}
          </div>
        ) : (
          <p className="text-charcoal-100">No entries yet.</p>
        )}
      </Container>
    </>
  );
}
