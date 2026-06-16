import type { Metadata } from "next";
import Link from "next/link";
import { StudyLanding } from "@/components/site/StudyLanding";
import { ArchiveImage } from "@/components/site/ArchiveImage";
import { InlineArchiveFragment } from "@/components/editorial/InlineArchiveFragment";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleJsonLd, buildMetadata } from "@/lib/seo";

const PATH = "/plutarch/parallel-lives";
const TITLE = "Parallel Lives";
const DESCRIPTION =
  "Plutarch's Parallel Lives — paired biographies of Greek and Roman statesmen, designed for comparison and for the study of character through what people did. The pairings, the method, and the long European afterlife of the most influential biographies ever written.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  type: "article",
});

const PAIRINGS: Array<{ href: string; greek: string; roman: string; note: string }> = [
  { href: "/comparisons/alexander-vs-caesar", greek: "Alexander", roman: "Caesar", note: "Supreme ability and unappeasable ambition." },
  { href: "/comparisons/pericles-vs-fabius", greek: "Pericles", roman: "Fabius Maximus", note: "Steadiness and the courage of patience." },
  { href: "/comparisons/lycurgus-vs-numa", greek: "Lycurgus", roman: "Numa", note: "Two archaic founders — war and peace." },
  { href: "/comparisons/solon-vs-publicola", greek: "Solon", roman: "Publicola", note: "Founders who served the state, not mastered it." },
  { href: "/comparisons/demosthenes-vs-cicero", greek: "Demosthenes", roman: "Cicero", note: "Eloquence in the last age of two free states." },
  { href: "/comparisons/alcibiades-vs-coriolanus", greek: "Alcibiades", roman: "Coriolanus", note: "Great gifts turned against their cities." },
  { href: "/comparisons/pompey-vs-agesilaus", greek: "Agesilaus", roman: "Pompey", note: "Beloved commanders, ruinous judgement." },
  { href: "/comparisons/crassus-vs-nicias", greek: "Nicias", roman: "Crassus", note: "Wealth, bad judgement and lost armies." },
];

export default function ParallelLivesPage() {
  return (
    <>
      <JsonLd
        data={articleJsonLd({
          headline: "The Parallel Lives of Plutarch",
          description: DESCRIPTION,
          url: PATH,
          dateModified: "2026-06-16",
          section: "Plutarch",
        })}
      />
      <StudyLanding
        path={PATH}
        eyebrow="Parallel Lives"
        title={TITLE}
        description={DESCRIPTION}
        hero={
          <ArchiveImage
            slug="plutarch-lives-manuscript"
            priority
            sizes="(min-width: 1280px) 1100px, (min-width: 768px) 90vw, 100vw"
          />
        }
        related={[
          { href: "/plutarch", label: "Plutarch — the hub" },
          { href: "/books/plutarchs-lives", label: "Plutarch's Lives (text)" },
          { href: "/books/life-of-alexander", label: "Life of Alexander" },
          { href: "/books/life-of-caesar", label: "Life of Caesar" },
          { href: "/books/life-of-pericles", label: "Life of Pericles" },
          { href: "/books/life-of-lycurgus", label: "Life of Lycurgus" },
          { href: "/books/life-of-solon", label: "Life of Solon" },
          { href: "/books/life-of-cicero", label: "Life of Cicero" },
          { href: "/books/life-of-cato-the-younger", label: "Life of Cato the Younger" },
          { href: "/essays/why-plutarch-compares-lives", label: "Why Plutarch compares lives" },
        ]}
        body={
          <>
            <p>
              The <em>Parallel Lives</em> — <em>Bíoi Parállēloi</em> — are the
              work for which Plutarch is best known and the most influential
              biographies ever written: a sequence of lives of distinguished
              Greeks and Romans, arranged in pairs so that each Greek is set
              against a Roman of comparable career or character. The collection
              originally ran to twenty-four pairs; twenty-three survive,
              alongside four single Lives. Most pairs end with a short
              comparative essay, the <em>synkrisis</em>, that weighs the two
              figures directly against each other. The platform reads the Lives
              not as a shelf of separate biographies but as a single designed{" "}
              <Link href="/essays/why-plutarch-compares-lives">system</Link>.
            </p>

            <h2>What the Lives are doing</h2>
            <p>
              Plutarch tells us plainly that he writes{" "}
              <em>lives, not histories</em>. His subject is character, not the
              chronicle of events, and he will dwell on a small revealing
              incident and pass quickly over a great campaign, because — as he
              says at the opening of the Life of Alexander — &ldquo;a slight
              thing like a phrase or a jest often makes a greater revelation of
              character than battles where thousands fall.&rdquo; The Lives are
              works of{" "}
              <Link href="/themes/moral-biography">moral biography</Link>:
              their purpose is to display character for the reader&apos;s
              instruction, and they assume an active reader who measures himself
              against the great men of the past and is formed by their company.
            </p>

            <h2>Why Plutarch pairs them</h2>
            <p>
              The pairing is not a literary ornament but a{" "}
              <Link href="/essays/why-plutarch-compares-lives">
                method of knowledge
              </Link>
              . By holding a Greek and a Roman of similar shape against each
              other, Plutarch isolates what is essential in each: where two men
              faced comparable situations and acted differently, the difference
              is the mark of individual character; where they acted alike, the
              likeness points to something in the role itself. The choice to
              pair <em>across</em> the two great cultures carries its own quiet
              argument — that Greek and Roman greatness are commensurable, that
              the virtues and vices of statesmanship are human rather than the
              property of one people, and that Plutarch&apos;s subjected Greece
              had produced men the equal of any Rome could show.
            </p>

            <InlineArchiveFragment
              slug="demosthenes-chiaramonti"
              size="small"
              note="Demosthenes, paired with Cicero — the two supreme orator-statesmen of Greece and Rome."
            />

            <h2>The pairings</h2>
            <p>
              The platform carries each of Plutarch&apos;s principal pairings as
              a comparison page, reading why he joined them, where they converge
              and diverge, and the political and leadership lesson each draws:
            </p>
            <ul>
              {PAIRINGS.map((p) => (
                <li key={p.href}>
                  <Link href={p.href}>
                    <strong>
                      {p.greek} &amp; {p.roman}
                    </strong>
                  </Link>{" "}
                  — {p.note}
                </li>
              ))}
            </ul>

            <h2>The individual Lives</h2>
            <p>
              Several of the Lives are carried as primary-text entries in their
              own right, read for historical context, purpose, argument,
              influence and citation discipline: the{" "}
              <Link href="/books/life-of-alexander">Life of Alexander</Link>{" "}
              with its famous manifesto preface, the{" "}
              <Link href="/books/life-of-caesar">Life of Caesar</Link>, the{" "}
              <Link href="/books/life-of-pericles">Life of Pericles</Link>, the{" "}
              <Link href="/books/life-of-lycurgus">Life of Lycurgus</Link>, the{" "}
              <Link href="/books/life-of-solon">Life of Solon</Link>, the{" "}
              <Link href="/books/life-of-cicero">Life of Cicero</Link>, and the{" "}
              <Link href="/books/life-of-cato-the-younger">
                Life of Cato the Younger
              </Link>
              . The collection as a whole is treated at{" "}
              <Link href="/books/plutarchs-lives">Plutarch&apos;s Lives</Link>.
            </p>

            <h2>The reading discipline</h2>
            <p>
              The platform reads the Lives with the care their nature requires.
              Plutarch wrote centuries after most of his subjects, drawing on
              earlier sources now lost; he prized character over chronology and
              would keep a revealing anecdote of doubtful historicity. He is, in
              the platform&apos;s reading, a witness to the <em>traditions</em>{" "}
              about his figures and to his own moral vision more than to bare
              events — to be read for the study of{" "}
              <Link href="/themes/character-and-power">character under power</Link>{" "}
              while keeping the historian&apos;s caution about his facts. No
              quotation is invented and no citation fabricated; the Lives are
              cited by chapter, the standard scholarly editions named on the{" "}
              <Link href="/sources">Sources</Link> page.
            </p>

            <h2>The long afterlife</h2>
            <p>
              The survival of the Lives depended on centuries of Byzantine
              copying — the manuscript above is one such witness — and their
              influence, once recovered, was immense. Through Sir Thomas
              North&apos;s 1579 English translation they gave Shakespeare his
              Roman plays; through countless editions they schooled the
              Renaissance courts, the English commonwealth writers, and the
              leaders of the French and American revolutions in the conduct of
              public life. The platform reads the Parallel Lives as one of the
              defining intellectual pillars of the European tradition — and the
              reason Plutarch belongs beside Greece, Rome and Persia among the{" "}
              <Link href="/civilizations">civilizational hubs</Link> of this
              site. The case for his continuing importance is made in{" "}
              <Link href="/essays/why-plutarch-still-matters">
                why Plutarch still matters
              </Link>
              .
            </p>
          </>
        }
      />
    </>
  );
}
