import type { Metadata } from "next";
import Link from "next/link";
import { FilmPageShell } from "@/components/editorial/FilmPageShell";
import { EvidenceKey } from "@/components/editorial/EvidenceBadge";
import { NOLAN_ODYSSEY } from "@/data/films";
import { buildMetadata } from "@/lib/seo";

const PATH = `/films/${NOLAN_ODYSSEY.slug}/characters`;
const TITLE = "The characters, against Homer";
const DESCRIPTION =
  "Character by character through Christopher Nolan's The Odyssey — Odysseus, Penelope, Telemachus, Athena, Circe, Calypso, Eumaeus, Antinous and the rest, each set against what the poem gives them.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  type: "article",
});

export default function CharactersPage() {
  return (
    <FilmPageShell
      path={PATH}
      eyebrow="Characters"
      title={TITLE}
      description={DESCRIPTION}
      meta="Each principal set against the Homeric original"
    >
      <div className="vp-prose">
        <p>
          Each entry states what the poem gives the character, what the film
          does, and what the difference costs or gains. The cast list and
          its sourcing is on the{" "}
          <Link href={`/films/${NOLAN_ODYSSEY.slug}`}>film hub</Link>; the
          figure pages for each character are linked from the entries.
        </p>

        <h2>Odysseus</h2>
        <p>
          Homer&rsquo;s is <em>polytropos</em> and <em>polymētis</em>: a
          liar of extraordinary fluency who tells four elaborate false life
          stories in the second half, is praised by his patron goddess for
          lying to her face, tests his own grieving father for no strategic
          reason, and weeps constantly.
        </p>
        <p>
          The film&rsquo;s is more honourable, more merciful, and organised
          around guilt for the Trojan War rather than around cunning. He is
          reported to be given a gesture of plucking the bowstring before
          loading, warning an opponent so the fight is fair — an invention,
          and a precise index of the change.
        </p>
        <p>
          This is the film&rsquo;s largest interpretive act. Guilt is a real
          moral difficulty and a familiar one; the poem&rsquo;s difficulty
          is unfamiliar, and consists in a hero whose central virtue cannot
          be distinguished from a vice. See{" "}
          <Link href="/figures/odysseus">Odysseus</Link>.
        </p>

        <h2>Penelope</h2>
        <p>
          Strengthened as a ruler, reported as governing Ithaca in her
          husband&rsquo;s absence and reluctant to hand it back. That is a
          genuine improvement on the passive figure adaptations usually
          produce.
        </p>
        <p>
          And the test of the bed is gone. In Homer she refuses to accept
          the man who has just killed a hundred and eight people until she
          has proved him, by ordering the marriage bed moved and provoking
          him into revealing that he built it around a living olive trunk.
          It is the one moment in the poem when anyone outmanoeuvres
          Odysseus.
        </p>
        <p>
          Ruling competently is a state; out-thinking the cleverest man
          alive is an action. The film gives her the first and removes the
          second. See <Link href="/figures/penelope">Penelope</Link>.
        </p>

        <h2>Telemachus</h2>
        <p>
          The journey is compressed to Sparta; Nestor and Pylos are cut,
          which is reasonable — two hospitality visits of the same shape is
          one more than a film can hold. The father-son relationship is
          expanded well beyond what Homer supplies, which is defensible,
          since Homer supplies startlingly little.
        </p>
        <p>
          What is lost is the poem&rsquo;s harder account of what he
          becomes. His development in Homer is not moral improvement but the
          acquisition of authority, first used to send his mother out of the
          hall and last used to hang twelve enslaved women in preference to
          the clean death his father ordered. See{" "}
          <Link href="/figures/telemachus">Telemachus</Link>.
        </p>

        <h2>Athena</h2>
        <p>
          Present, and not shown acting as a god in the Homeric manner. The
          film connects her with a young Trojan priestess killed during the
          sack, which keeps divine agency ambiguous.
        </p>
        <p>
          The ambiguity is a defensible reading of Homeric double
          motivation, in which a god acts through a human faculty rather
          than around it. Tying her to the hero&rsquo;s guilt is a different
          matter: the poem&rsquo;s Athena is an independent power with her
          own interests who likes Odysseus because they share a
          professional specialism in deception, and she laughs at him. An
          emanation of conscience cannot do that. See{" "}
          <Link href="/figures/athena">Athena</Link>.
        </p>

        <h2>Circe</h2>
        <p>
          Reconceived as an isolated woman transforming men from fear for
          her own safety, her magic framed as revealing what men already
          are. Reported as the film&rsquo;s most frightening sequence.
        </p>
        <p>
          A change we regard as legitimate and well made, because Homer
          gives no motive for the transformations at all — the film fills a
          silence rather than contradicting a statement. Worth stating
          plainly that it is a change: in the poem the swine keep their
          human minds and are restored by an ointment, so the magic imposes
          a shape rather than exposing one. See{" "}
          <Link href="/figures/circe">Circe</Link>.
        </p>

        <h2>Calypso</h2>
        <p>
          Given the lotus flower — a drug that in Homer belongs to a
          different and much earlier episode — with the detention framed as
          easing the trauma of war.
        </p>
        <p>
          Economical and expensive. In Homer she offers immortality and is
          refused, and that refusal is how the poem prices a homecoming: the
          hero gives up deathlessness to be mortal in a particular place
          with particular people. A drugged man is not refusing anything.
          See <Link href="/figures/calypso">Calypso</Link>.
        </p>

        <h2>Eumaeus</h2>
        <p>
          Presented as blind and as Odysseus&rsquo;s former tutor. In Homer
          he is a working swineherd, not blind, and a bought slave.
        </p>
        <p>
          The blindness appears to import the traditional attribute of the
          bard and is defensible consolidation. The tutor is the more
          significant change, because it alters a social fact the poem is
          using: Eumaeus performs the best hospitality in the poem out of
          poverty, and says of himself that Zeus takes away half a
          man&rsquo;s worth on the day he is enslaved. See{" "}
          <Link href="/figures/eumaeus">Eumaeus</Link>.
        </p>

        <h2>Antinous</h2>
        <p>
          Robert Pattinson&rsquo;s performance has been widely praised. The
          film gives him a back-story — military service avoided by sending
          a servant&rsquo;s son in his place — that ties the Ithacan crisis
          to the war&rsquo;s guilt.
        </p>
        <p>
          Good screenwriting and an invention. Homer&rsquo;s suitors have no
          back-stories, and the poem complicates them differently and more
          subtly, through Amphinomus: decent, privately warned by Odysseus
          to leave, troubled, staying, and killed. The poem takes care to
          establish that the massacre catches a man who did not deserve it.
        </p>

        <h2>Helen and Clytemnestra</h2>
        <p>
          Doubled by one performer and presented as twin sisters. The
          doubling makes the film&rsquo;s pairing of the two homecomings
          legible and has excellent theatrical precedent; the twinship is a
          tidying of genealogies the ancient sources do not consistently
          support. The reunion with Menelaus is complicated, which is a fair
          extrapolation from a scene in <em>Odyssey</em> 4 that is already
          uncomfortable. See{" "}
          <Link href="/figures/helen-of-sparta">Helen</Link> and{" "}
          <Link href="/figures/clytemnestra">Clytemnestra</Link>.
        </p>

        <h2>Sinon</h2>
        <p>
          Not a character in Homer. He belongs to the Epic Cycle and above
          all to <em>Aeneid</em> 2, roughly seven centuries later and from
          the Trojan side. Importing from the wider tradition has the best
          possible precedent; the difficulty is that audiences will
          attribute him to Homer, and the connection the film builds between
          him and Antinous is entirely new.
        </p>

        <h2>Those who are not there</h2>
        <p>
          Nausicaa, Alcinous and Arete, and with them the whole Phaeacian
          sequence — the poem&rsquo;s model of hospitality performed
          perfectly. Laertes, and with him the reunion in the orchard and
          the poem&rsquo;s three-generation frame. Nestor. And the twelve
          hanged women of Book 22, whose absence makes the hero&rsquo;s
          victory cleaner than Homer&rsquo;s.
        </p>
        <p>
          Each is recorded with its consequence in the{" "}
          <Link href={`/films/${NOLAN_ODYSSEY.slug}/what-the-film-changed`}>
            ledger
          </Link>
          .
        </p>
      </div>

      <EvidenceKey className="mt-16" />
    </FilmPageShell>
  );
}
