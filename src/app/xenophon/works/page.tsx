import type { Metadata } from "next";
import Link from "next/link";
import { StudyLanding } from "@/components/site/StudyLanding";
import { ArchiveImage } from "@/components/site/ArchiveImage";
import { InlineArchiveFragment } from "@/components/editorial/InlineArchiveFragment";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleJsonLd, buildMetadata } from "@/lib/seo";

const PATH = "/xenophon/works";
const TITLE = "The Works of Xenophon";
const DESCRIPTION =
  "A guide to the works of Xenophon — the historical Anabasis and Hellenica, the Socratic Memorabilia, Oeconomicus, Symposium and Apology, the political Cyropaedia, Agesilaus and Constitution of the Lacedaemonians, and the technical Hipparchicus.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  type: "article",
});

const GROUPS: Array<{ heading: string; blurb: string; works: Array<{ href: string; title: string; note: string }> }> = [
  {
    heading: "Historical works",
    blurb: "The campaigns and affairs of the Greek world, written by a participant.",
    works: [
      { href: "/books/anabasis", title: "Anabasis", note: "The march and fighting retreat of the Ten Thousand — antiquity's archetype of leadership as survival." },
      { href: "/books/hellenica", title: "Hellenica", note: "Greek history from 411 BCE, taking up Thucydides and carrying it to the collapse of Spartan power." },
    ],
  },
  {
    heading: "Socratic works",
    blurb: "The second great portrait of Socrates — practical, useful, concerned with the conduct of life.",
    works: [
      { href: "/books/memorabilia", title: "Memorabilia", note: "The fullest of the Socratic works: a portrait and defence of Socrates the practical counsellor." },
      { href: "/books/oeconomicus", title: "Oeconomicus", note: "On the management of a household and estate — the foundational text of household economy." },
      { href: "/books/symposium", title: "Symposium", note: "A dinner party at which Socrates and his friends declare what they are proudest of." },
      { href: "/books/apology-of-socrates", title: "Apology of Socrates", note: "A short defence of Socrates' bearing at his trial — death chosen over the decline of old age." },
    ],
  },
  {
    heading: "Political and pedagogical works",
    blurb: "The formation of rulers and the ordering of states.",
    works: [
      { href: "/books/cyropaedia", title: "Cyropaedia", note: "The education of Cyrus — the first sustained ancient study of how a ruler is formed." },
      { href: "/books/xenophon-agesilaus", title: "Agesilaus", note: "An encomium of the Spartan king Xenophon served — idealised, disciplined kingship in a real man." },
      { href: "/books/constitution-of-the-lacedaemonians", title: "Constitution of the Lacedaemonians", note: "The fullest contemporary account of the Spartan order attributed to Lycurgus." },
    ],
  },
  {
    heading: "Technical works",
    blurb: "Command and horsemanship, where the technical and the ethical meet.",
    works: [
      { href: "/books/hipparchicus", title: "Hipparchicus", note: "The Cavalry Commander — a manual for the Athenian hipparch that doubles as a study of leadership." },
    ],
  },
];

export default function XenophonWorksPage() {
  return (
    <>
      <JsonLd
        data={articleJsonLd({
          headline: "The Works of Xenophon",
          description: DESCRIPTION,
          url: PATH,
          dateModified: "2026-06-16",
          section: "Xenophon",
        })}
      />
      <StudyLanding
        path={PATH}
        eyebrow="Xenophon"
        title={TITLE}
        description={DESCRIPTION}
        hero={
          <ArchiveImage
            slug="anabasis-route-map"
            priority
            sizes="(min-width: 1280px) 1100px, (min-width: 768px) 90vw, 100vw"
          />
        }
        related={[
          { href: "/xenophon", label: "Xenophon — the hub" },
          { href: "/philosophers/xenophon", label: "Xenophon — figure entry" },
          { href: "/comparisons/cyropaedia-vs-republic", label: "Cyropaedia vs Republic" },
          { href: "/comparisons/anabasis-vs-commentaries-of-caesar", label: "Anabasis vs Caesar's Commentaries" },
          { href: "/comparisons/socrates-in-plato-vs-xenophon", label: "Socrates in Plato vs Xenophon" },
          { href: "/essays/the-education-of-cyrus", label: "The education of Cyrus" },
          { href: "/essays/what-the-anabasis-teaches", label: "What the Anabasis teaches" },
          { href: "/sources", label: "Editions and translations" },
        ]}
        body={
          <>
            <p>
              The Xenophontic corpus is unusually broad. No other ancient author
              the platform treats wrote across so many genres — history,
              biography, political theory, Socratic dialogue, and the technical
              treatise — and the breadth is the point: it is the body of work of
              a man who had lived as a soldier, a landowner, a student of
              philosophy and a witness to two empires. The platform reads the
              works not as a miscellany but as a single project, unified by his
              conviction that good order, at every scale, flows from the{" "}
              <Link href="/themes/governance-through-character">
                character of the one who governs
              </Link>
              . The standard Greek text is E. C. Marchant&apos;s Oxford Classical
              Texts; editions and translations are listed on the{" "}
              <Link href="/sources">Sources</Link> page.
            </p>

            <InlineArchiveFragment
              slug="xenophon-anabasis-manuscript"
              size="small"
              note="A Byzantine Greek manuscript of the Anabasis — the kind of copying on which the survival of the works depended."
            />

            {GROUPS.map((group) => (
              <section key={group.heading}>
                <h2>{group.heading}</h2>
                <p>{group.blurb}</p>
                <ul>
                  {group.works.map((w) => (
                    <li key={w.href}>
                      <Link href={w.href}>
                        <strong>{w.title}</strong>
                      </Link>{" "}
                      — {w.note}
                    </li>
                  ))}
                </ul>
              </section>
            ))}

            <h2>How the platform reads them</h2>
            <p>
              The platform reads each work for its purpose, context, argument,
              influence and modern significance rather than as a plot summary,
              and with the citation discipline the corpus requires: Xenophon is
              a witness whose loyalties must be weighed — partial toward the
              Sparta and the kingship he admired — and his idealised portraits
              (the Cyrus of the Cyropaedia, the Agesilaus of the encomium) are
              read as philosophical constructions, not documentary records. Read
              together, the works make the case the platform argues in{" "}
              <Link href="/essays/why-xenophon-still-matters">
                why Xenophon still matters
              </Link>
              : that this soldier-philosopher of character and command belongs in
              the first rank of the classical inheritance.
            </p>
          </>
        }
      />
    </>
  );
}
