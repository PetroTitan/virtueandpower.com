import type { Metadata } from "next";
import Link from "next/link";
import { StudyLanding } from "@/components/site/StudyLanding";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleJsonLd, buildMetadata } from "@/lib/seo";
import { HOMER_LIBRARY_LINKS, otherHomerPages } from "@/data/homer-cluster";

const PATH = "/homer/oral-tradition";
const TITLE = "Oral tradition and the making of the poems";
const DESCRIPTION =
  "Oral-formulaic composition, the noun-epithet system, the artificial poetic dialect, the rhapsodes who performed the epics, and the disputed route by which a sung tradition became a fixed written text.";
const UPDATED = "2026-07-28";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  type: "article",
});

export default function HomerOralTraditionPage() {
  return (
    <>
      <JsonLd
        data={articleJsonLd({
          headline: TITLE,
          description: DESCRIPTION,
          url: PATH,
          dateModified: UPDATED,
          section: "Homer",
        })}
      />
      <StudyLanding
        path={PATH}
        eyebrow="Homer"
        title={TITLE}
        description={DESCRIPTION}
        related={[
          ...otherHomerPages(PATH).map((p) => ({
            href: p.path,
            label: p.label,
          })),
          ...HOMER_LIBRARY_LINKS,
        ]}
        body={
          <>
            <p>
              The single most important thing to understand about Homeric
              poetry is that its language was built for performance without a
              text. That is not a romantic claim about bards and firelight; it
              is a technical observation about how the verse is put together,
              and it was established by close statistical study of the diction
              itself.
            </p>

            <h2>The formulaic system</h2>
            <p>
              Milman Parry, in work published in the late 1920s and early
              1930s, showed that Homeric diction operates as an economical
              system. For a given character, in a given grammatical case, at a
              given position in the hexameter line, there is characteristically
              one fixed noun-epithet phrase and no competing alternative. The
              system has enormous <em>extension</em> — it covers a great many
              metrical situations — and remarkable <em>thrift</em>: it very
              rarely provides two ways of saying the same thing in the same
              metrical shape.
            </p>
            <p>
              That combination is the signature of a traditional medium rather
              than an individual style. A writer composing at leisure
              accumulates alternatives, because alternatives are expressive. A
              singer composing in performance needs exactly one phrase that
              fits, and needs it instantly.
            </p>
            <p>
              This explains a feature of the poems that puzzles new readers:
              the epithets often do not fit the moment. Odysseus is{" "}
              <em>polymētis</em>, &ldquo;of many counsels&rdquo;, when he is
              not counselling anything. The sea is &ldquo;wine-dark&rdquo; when
              nobody is looking at its colour. Achilles is
              &ldquo;swift-footed&rdquo; while sitting down. The epithet is not
              a comment on the scene; it is a metrical component doing
              structural work.
            </p>

            <h2>Parry, Lord and the comparative evidence</h2>
            <p>
              Parry then tested the model against living practice. With Albert
              Lord he recorded South Slavic epic singers in the 1930s,
              observing how illiterate performers composed long narrative
              poems in performance using an analogous system of formulae and
              typical scenes. Lord set the results out in{" "}
              <em>The Singer of Tales</em> (1960), which remains the standard
              statement of the position.
            </p>
            <p>
              The comparative argument is powerful and has limits worth
              stating. The South Slavic tradition is not the Greek one, and no
              recorded South Slavic song approaches the scale or the
              architectural control of the <em>Iliad</em>. What the fieldwork
              established is that oral composition-in-performance of long
              narrative verse is possible and that it produces formulaic
              diction. What it did not establish, and what remains disputed,
              is how a poem of the Homeric epics&rsquo; scale and design came
              out of such a tradition.
            </p>

            <h2>Typical scenes and larger structures</h2>
            <p>
              Below the level of the phrase, the tradition supplies whole
              recurring patterns: arming, feasting, sacrifice, the arrival of a
              guest, the launching of a ship. The <em>Odyssey</em> is
              particularly rich in these, and its central moral concern —{" "}
              <Link href="/themes/hospitality-and-xenia">
                hospitality, <em>xenia</em>
              </Link>{" "}
              — is repeatedly examined by varying one standard scene. A
              stranger arrives; the sequence of greeting, seating, washing,
              feeding and only then questioning either runs correctly or is
              broken. Polyphemus breaks it by eating his guests. The suitors
              break it by consuming their host&rsquo;s substance. The
              Phaeacians perform it perfectly. The poem thinks by variation on
              a pattern the audience already knows.
            </p>

            <h2>An artificial dialect</h2>
            <p>
              Nobody ever spoke Homeric Greek. The language of the epics is a{" "}
              <em>Kunstsprache</em>, an artificial poetic amalgam, principally
              Ionic but carrying Aeolic forms and some older material, with
              alternative forms of the same word available for different
              metrical shapes. Its layers are of different ages, and the
              mixture is itself evidence of a long tradition.
            </p>
            <p>
              One detail is a small masterpiece of philological reasoning. The
              transmitted text does not write the letter digamma (a{" "}
              <em>w</em>-sound, ϝ), which had dropped out of Ionic Greek. But
              in a great many lines the metre only works if a word originally
              began with it. The sound is invisible in the text and audible in
              the rhythm. That is direct evidence that the verses were shaped
              at a period earlier than the text that transmits them.
            </p>

            <h2>Rhapsodes and performance</h2>
            <p>
              The performers of the poems in the classical period were called{" "}
              <em>rhapsōdoi</em> — plausibly &ldquo;song-stitchers&rdquo;. By
              that date they were reciters of a more or less fixed text rather
              than composers in performance, and they competed at festivals.
              Plato&rsquo;s <em>Ion</em> is a portrait of one of them: a
              professional Homer-reciter who can hold an audience of twenty
              thousand and cannot explain what he knows.
            </p>
            <p>
              Ancient tradition reports a rule at the Panathenaia in Athens
              requiring the Homeric poems to be recited in their proper order,
              one performer taking up where the last stopped. The rule is
              reported in later sources rather than contemporary ones. It is
              generally taken as good evidence that by the sixth century BCE
              there was an authoritative sequence to keep to — which implies
              something reasonably close to a fixed text.
            </p>

            <h2>How the text became fixed — the disputed part</h2>
            <p>
              This is where certainty ends. The competing accounts include:
            </p>
            <ul>
              <li>
                <strong>Dictation.</strong> A monumental composer dictated the
                poems to a scribe at some point after the adoption of the
                Greek alphabet, producing a text at a stroke.
              </li>
              <li>
                <strong>Gradual crystallisation.</strong> The text became
                progressively fixed over centuries of performance and
                transmission, with no single moment of creation — the view
                associated with the evolutionary model of Gregory Nagy.
              </li>
              <li>
                <strong>A Peisistratean recension.</strong> The tradition that
                the Athenian tyrants had the poems collected and ordered in
                the sixth century BCE. Reported in antiquity; its historicity
                is disputed and it should not be repeated as fact.
              </li>
            </ul>
            <p>
              These are not variants of one story. They imply materially
              different things about what kind of object the transmitted text
              is. The evidence does not currently decide between them, and
              this platform does not pretend otherwise. See{" "}
              <Link href="/homeric-question">The Homeric Question</Link>.
            </p>

            <h2>Why this matters for reading and for adaptation</h2>
            <p>
              An oral-traditional poem is not a script with a missing
              performance. Repetition in Homer is structural, not
              redundant; the epithets are load-bearing; the &ldquo;digressions&rdquo;
              are how the medium supplies context. Modern adaptations
              routinely strip all of this, because film has its own
              redundancies and does not need the poem&rsquo;s. That is a
              legitimate transposition, not a betrayal — but it does mean that
              a film cannot preserve the specific quality that makes Homeric
              narration what it is, and criticism that pretends otherwise is
              asking cinema to be verse.
            </p>
            <p>
              The one thing an adaptation can preserve is the framed,
              retrospective structure: the hero telling his own story, with all
              the unreliability that implies. Our{" "}
              <Link href="/films/christopher-nolan-the-odyssey/homer-vs-film">
                comparison of the poem and the 2026 film
              </Link>{" "}
              treats that as the central structural question.
            </p>
          </>
        }
      />
    </>
  );
}
