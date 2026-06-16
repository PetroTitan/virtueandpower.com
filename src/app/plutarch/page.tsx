import type { Metadata } from "next";
import Link from "next/link";
import { StudyLanding } from "@/components/site/StudyLanding";
import { ArchiveImage } from "@/components/site/ArchiveImage";
import { FiguresStrip } from "@/components/site/FiguresStrip";
import { InlineArchiveFragment } from "@/components/editorial/InlineArchiveFragment";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleJsonLd, buildMetadata } from "@/lib/seo";

const PATH = "/plutarch";
const TITLE = "Plutarch";
const DESCRIPTION =
  "Plutarch of Chaeronea — Greek biographer, priest of Delphi and moralist of the Roman imperial age, whose Parallel Lives taught Europe to read character, leadership and the fate of states through the shape of a life.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  type: "article",
});

export default function PlutarchPage() {
  return (
    <>
      <JsonLd
        data={articleJsonLd({
          headline: "Plutarch — biographer of character",
          description: DESCRIPTION,
          url: PATH,
          dateModified: "2026-06-16",
          section: "Plutarch",
        })}
      />
      <StudyLanding
        path={PATH}
        eyebrow="Authority hub"
        title={TITLE}
        description={DESCRIPTION}
        hero={
          <ArchiveImage
            slug="delphi-sanctuary"
            priority
            sizes="(min-width: 1280px) 1100px, (min-width: 768px) 90vw, 100vw"
          />
        }
        related={[
          { href: "/plutarch/parallel-lives", label: "The Parallel Lives" },
          { href: "/philosophers/plutarch", label: "Plutarch — figure entry" },
          { href: "/books/plutarchs-lives", label: "Plutarch's Lives (text)" },
          { href: "/books/moralia", label: "The Moralia (text)" },
          { href: "/themes/character-and-power", label: "Character and power" },
          { href: "/themes/moral-biography", label: "Moral biography" },
          { href: "/themes/education-through-history", label: "Education through history" },
          { href: "/essays/why-plutarch-still-matters", label: "Why Plutarch still matters" },
          { href: "/comparisons", label: "All comparisons" },
        ]}
        afterBody={
          <FiguresStrip
            eyebrow="Read through the Lives"
            heading="The men Plutarch chose, and what their lives were meant to teach"
            items={[
              { slug: "alexander", role: "King of Macedon · 356–323 BCE" },
              { slug: "julius-caesar", role: "Dictator of Rome · 100–44 BCE" },
              { slug: "pericles", role: "Statesman of Athens · c. 495–429 BCE" },
              { slug: "demosthenes", role: "Orator of Athens · 384–322 BCE" },
            ]}
          />
        }
        body={
          <>
            <p>
              Plutarch of Chaeronea (c. 46 – c. 120 CE) is the classical
              author who, more than any other, treats the shape of a single
              life as the right unit for thinking about virtue, power and
              conduct. A Greek of the Roman imperial period, a priest of
              Apollo at Delphi, and the author of the{" "}
              <Link href="/plutarch/parallel-lives">Parallel Lives</Link> and
              the <Link href="/books/moralia">Moralia</Link>, he became the
              great conduit through which later Europe learned to read
              character through history — and one of the central bridges of
              this platform, joining Greece, Rome and Persia through the study
              of leadership and the soul.
            </p>

            <h2>Who Plutarch was</h2>
            <p>
              Plutarch was born around the middle of the first century CE in
              Chaeronea, a small town in Boeotia, in mainland Greece. He
              studied at the Platonic Academy in Athens, travelled in Egypt and
              Italy, lectured at Rome, and gained Roman citizenship with the
              name Lucius Mestrius Plutarchus — yet he spent most of his long
              life back in his small home town, which he refused to leave, he
              wrote, lest it grow smaller still. For many years he served as
              one of the two priests of Apollo at the oracle of{" "}
              <Link href="/civilizations/greece">Delphi</Link>, the religious
              centre of the Greek world, a role that shaped both his outlook
              and several of the dialogues of the Moralia.
            </p>

            <InlineArchiveFragment
              slug="plutarch-chaeronea"
              size="small"
              note="A modern bust of Plutarch in his native Chaeronea. No ancient likeness of him survives."
            />

            <p>
              His writing falls into two great bodies of work. The{" "}
              <em>Parallel Lives</em> are paired biographies of distinguished
              Greeks and Romans — statesmen, soldiers and lawgivers — set
              against each other for comparison. The <em>Moralia</em> are a
              vast collection of essays and dialogues on ethics, politics,
              religion, education and much else. Together they make Plutarch the
              fullest surviving record of how a cultivated Greek of the Roman
              age thought the good life should be lived and the well-ordered
              state maintained.
            </p>

            <h2>A Greek under Roman rule</h2>
            <p>
              Plutarch wrote as a Greek living under, and reconciled to, the
              Roman Empire — and the situation is woven into his work. The old
              Greek freedom was gone; the cities he loved were provincial towns
              in a Roman world. The platform reads the Parallel Lives partly as
              his response to that condition: by pairing a Greek with a Roman in
              each comparison — Alexander with Caesar, Demosthenes with Cicero,
              Lycurgus with Numa — Plutarch quietly insists that Greek and Roman
              greatness are commensurable, that the virtues of statesmanship
              belong to no single people, and that his subjected Greece had
              produced men the equal of any Rome could show. It is a
              cosmopolitan argument made in the form of biography.
            </p>

            <h2>The purpose of the Parallel Lives</h2>
            <p>
              Plutarch states his purpose with unusual directness. He is
              writing <em>lives, not histories</em>: his subject is not the
              chronicle of great events but the character those events reveal,
              and he warns the reader, at the opening of the Life of Alexander,
              that a chance remark or a jest often shows a man&apos;s virtue or
              vice more clearly than the bloodiest battle. The Lives are
              designed for <em>use</em> — to be read by those who would hold
              public responsibility, as a school for judgement and character.
              Plutarch tells us, in the Life of Aemilius Paulus, that he began
              writing them for others and continued for himself, treating the
              great men of the past as a mirror in which to order his own
              conduct.
            </p>

            <h2>Moral biography and the study of character</h2>
            <p>
              This is the form the platform calls{" "}
              <Link href="/themes/moral-biography">moral biography</Link>: the
              writing of a life not to record what happened but to display
              character for the reader&apos;s instruction. It occupies a space
              that two more prestigious modes of thought leave empty. Abstract
              ethics tells you what virtue is in general but loses the texture
              of the hard case; structural history tells you how forces and
              institutions move but loses the person making the choice.
              Plutarch holds the middle ground they vacate — the particular
              human being, in the particular situation, acting well or badly
              under the pressure of power. His governing conviction is that the
              exercise of power both reveals and is shaped by{" "}
              <Link href="/themes/character-and-power">character</Link>, and
              that authority is the sharpest test a character can face.
            </p>

            <h2>Character, leadership and the fate of states</h2>
            <p>
              Because Plutarch reads power through character, he reads the fate
              of cities and empires through the people at their head — Athens
              through Pericles and Alcibiades, the Roman Republic through
              Caesar, Pompey, Cato and Cicero. He is the corpus&apos;s strongest
              witness for the role of{" "}
              <Link href="/themes/great-men-and-history">
                character in history
              </Link>
              , to be read against its strongest witnesses for the role of
              institutions. His{" "}
              <Link href="/themes/leadership-and-character">
                leadership
              </Link>{" "}
              is an expression of character rather than technique: what makes
              men follow a leader is finally who he is — his courage under
              risk, his justice, his self-command, and the example he sets,
              which teaches more powerfully than any command. And his deepest
              political pattern is the tragedy of{" "}
              <Link href="/themes/ambition-and-downfall">
                ambition and downfall
              </Link>
              : the love of honour that drives a leader to greatness and then,
              ungoverned, to ruin.
            </p>

            <InlineArchiveFragment
              slug="lion-of-chaeronea"
              size="wide"
              note="The Lion of Chaeronea, near Plutarch's home, marks the grave of the Theban Sacred Band — the battlefield where Greek liberty fell to Macedon."
            />

            <h2>The influence on Europe</h2>
            <p>
              No classical prose author was more widely or more seriously read
              in later Europe. Sir Thomas North&apos;s 1579 English translation
              of the Lives gave Shakespeare the matter of his Roman plays —{" "}
              <em>Julius Caesar</em>, <em>Coriolanus</em> and{" "}
              <em>Antony and Cleopatra</em> follow Plutarch closely. Montaigne
              built the personal essay out of the Moralia; Rousseau read the
              Lives as a boy and never stopped; Emerson called Plutarch a
              &ldquo;bible for heroes.&rdquo; For fifteen centuries those who
              wanted to understand greatness, or to school themselves for it,
              went to Plutarch.
            </p>

            <h2>The teacher of statesmen, from the Renaissance to the founders</h2>
            <p>
              The platform reads this long afterlife as the working of
              Plutarch&apos;s own design. He wrote to form the character of
              those who would hold power, and generation after generation of
              public men took him at his word. The Renaissance prince, the
              English commonwealthman, the leaders of the French and American
              revolutions schooled themselves on the Lives — the American
              founders quoted Plutarch on the lawgivers and the fall of the
              Republic, and read his Cato as the pattern of republican virtue.
              The platform&apos;s own purpose — reading the classical
              inheritance for what it can still teach about virtue, power and
              the well-ordered life — is, in the end, Plutarch&apos;s purpose,
              and the essay on{" "}
              <Link href="/essays/why-plutarch-still-matters">
                why Plutarch still matters
              </Link>{" "}
              asks how, and whether, that education still works for a modern
              reader. The structure of the whole project is read at the{" "}
              <Link href="/plutarch/parallel-lives">Parallel Lives</Link> hub.
            </p>
          </>
        }
      />
    </>
  );
}
