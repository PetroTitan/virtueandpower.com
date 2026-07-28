import type { Metadata } from "next";
import Link from "next/link";
import { StudyLanding } from "@/components/site/StudyLanding";
import { ArchiveImage } from "@/components/site/ArchiveImage";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleJsonLd, buildMetadata } from "@/lib/seo";
import {
  HOMER_LIBRARY_LINKS,
  otherHomerPages,
} from "@/data/homer-cluster";

const PATH = "/homer";
const TITLE = "Homer";
const DESCRIPTION =
  "The poet the Greeks placed at the head of their literature — what ancient tradition claimed, what modern scholarship has argued for two centuries, and what remains genuinely unknown about the composition of the Iliad and the Odyssey.";
const UPDATED = "2026-07-28";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  type: "article",
});

export default function HomerHubPage() {
  return (
    <>
      <JsonLd
        data={articleJsonLd({
          headline: "Homer — the poet, the question, and the tradition",
          description: DESCRIPTION,
          url: PATH,
          dateModified: UPDATED,
          section: "Homer",
        })}
      />
      <StudyLanding
        path={PATH}
        eyebrow="Authority hub"
        title={TITLE}
        description={DESCRIPTION}
        hero={
          <ArchiveImage
            slug="homer-bust-british-museum"
            priority
            sizes="(min-width: 1280px) 1100px, (min-width: 768px) 90vw, 100vw"
          />
        }
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
              Almost everything a reader is usually told about Homer belongs
              to one of three categories, and the categories are worth keeping
              apart. There is what ancient tradition said about him, which is
              abundant, late and mutually contradictory. There is what modern
              scholarship has argued since the end of the eighteenth century,
              which is powerful but unsettled. And there is what can actually
              be established, which is very little, and almost all of it is
              about the poems rather than the poet.
            </p>
            <p>
              This hub keeps those three registers separate. Where a claim is
              ancient tradition, it is labelled as ancient tradition. Where it
              is a modern hypothesis, it is labelled as a hypothesis, with the
              name of the person who proposed it. Where specialists disagree,
              the disagreement is described rather than resolved in favour of
              whichever side reads more cleanly. And where the answer is not
              known, the page says that it is not known.
            </p>

            <h2>What can be said with confidence</h2>
            <p>
              Two long poems in dactylic hexameter survive in Greek, divided
              in the transmitted text into twenty-four books each: the{" "}
              <Link href="/books/iliad">Iliad</Link>, of roughly 15,700 lines,
              and the <Link href="/books/odyssey">Odyssey</Link>, of roughly
              12,100. They are the earliest substantial works of European
              literature to come down to us. From at least the sixth century
              BCE they were the common property of Greek culture: recited at
              festivals, quoted in law courts, learned by schoolboys, argued
              with by philosophers, and treated by most Greeks as the work of
              a single poet named Homer.
            </p>
            <p>
              That the poems exist, that they are old, that they stand at the
              head of the tradition, and that the Greeks attributed them to
              Homer — these are secure. Nearly everything else about their
              origin is inference.
            </p>

            <h2>What ancient tradition claimed</h2>
            <p>
              The ancient biographical tradition is rich and untrustworthy.
              Several cities claimed Homer as their own; the competing claims
              were proverbial by the Hellenistic period, and the lists of
              claimant cities do not agree with each other. He was said to
              have been blind — an association reinforced by the blind
              Phaeacian bard Demodocus in <em>Odyssey</em> 8, which is a
              literary character rather than a self-portrait, though ancient
              readers often took it as one. The surviving <em>Lives of Homer</em>{" "}
              are late compilations, and the pseudo-Herodotean life is not by
              Herodotus.
            </p>
            <p>
              The most useful ancient datum is also the most cautious.
              Herodotus, writing in the fifth century BCE, says that Hesiod
              and Homer lived some four hundred years before his own time and
              not more — which would put them around the middle of the ninth
              century BCE (<em>Histories</em> 2.53). He states this as his own
              opinion, against people who thought them older. The conventional
              modern dating of the poems to the eighth or early seventh
              century BCE is a scholarly inference from language, material
              culture and historical reference, not a transmitted fact.
            </p>
            <p>
              Whether a poet named Homer existed at all is not something the
              evidence settles. The honest position is that the name is
              securely attested as the tradition&rsquo;s attribution from an
              early date, and that what stands behind the name is unknown.
            </p>

            <h2>The Homeric Question</h2>
            <p>
              Since Friedrich August Wolf&rsquo;s <em>Prolegomena ad Homerum</em>{" "}
              of 1795, the argument about how the poems came to be has run
              continuously. Wolf argued that they were assembled from shorter
              songs and that writing was not available in the form the
              composition of a long poem would require. The nineteenth century
              divided into Analysts, who tried to identify the seams between
              originally separate lays, and Unitarians, who argued from the
              poems&rsquo; architecture that a single designing mind was at
              work.
            </p>
            <p>
              The decisive intervention came from Milman Parry in the late
              1920s and early 1930s, who demonstrated that Homeric diction is
              a highly economical traditional system — that the fixed
              noun-epithet phrases are distributed according to metrical need
              with a thrift no individual writer would impose on himself. Parry
              and Albert Lord then studied living oral epic singers in the
              Balkans, and Lord set out the results in{" "}
              <em>The Singer of Tales</em> (1960). The effect was to move the
              question away from &ldquo;one author or many?&rdquo; and toward
              the relationship between a traditional medium and a monumental
              composition within it.
            </p>
            <p>
              That question remains open. The{" "}
              <Link href="/homeric-question">Homeric Question</Link> page sets
              out the positions in full, including the ones this platform does
              not hold.
            </p>

            <h2>How the poems reached us</h2>
            <p>
              A sung tradition became a fixed text by a route that is only
              partly recoverable. Ancient tradition reports that the
              Peisistratids at Athens regulated the recitation of Homer at the
              Panathenaia so that the poems were performed in order, and a
              later tradition credits Peisistratus with having the poems
              written down or arranged. The historicity of a
              &ldquo;Peisistratean recension&rdquo; is disputed among modern
              specialists and should not be repeated as established fact.
            </p>
            <p>
              What is better attested is the scholarly work done at
              Alexandria. Zenodotus of Ephesus, Aristophanes of Byzantium and
              Aristarchus of Samothrace produced editions and commentaries,
              developed a system of critical signs for marking suspect or
              disputed lines, and left a body of scholarship that survives
              indirectly in the scholia — the marginal annotations preserved
              in medieval manuscripts, above all the tenth-century Venetus A
              of the <em>Iliad</em>. The division of each poem into
              twenty-four books, lettered with the Greek alphabet, is probably
              Alexandrian rather than original.
            </p>

            <h2>Homer as the foundation of Greek education</h2>
            <p>
              For as long as there was a Greek <em>paideia</em>, Homer was at
              the centre of it. Boys learned him by heart; Xenophon has a
              character in the <em>Symposium</em> say that his father made him
              learn the whole of both poems. The philosophical tradition is
              unintelligible without this. When Plato devotes long stretches
              of the <em>Republic</em> to whether Homer should educate the
              young, and finally excludes most poetry from the ideal city, the
              seriousness of the argument is a measure of the position Homer
              actually held. Aristotle, by contrast, treats him in the{" "}
              <Link href="/books/poetics">Poetics</Link> as the model of
              epic construction.
            </p>
            <p>
              This is why the poems sit in this library among the philosophers
              rather than in a separate literary annexe. The classical inquiry
              into <Link href="/themes/courage">courage</Link>, honour,{" "}
              <Link href="/themes/hospitality-and-xenia">hospitality</Link>,{" "}
              <Link href="/themes/kingship-in-the-odyssey">kingship</Link> and
              the shape of a good life begins with Homer and proceeds by
              arguing with him. To read the philosophers without the poems is
              to read the second half of a conversation.
            </p>

            <h2>Homer and later Europe</h2>
            <p>
              Greek Homer was largely inaccessible in the Latin West through
              the medieval period, where knowledge of the Trojan story ran
              mainly through Latin intermediaries and the late prose accounts
              attributed to Dictys and Dares. Byzantium never lost him;
              Eustathius of Thessalonica&rsquo;s twelfth-century commentaries
              are enormous. The Greek text was printed in Florence in 1488.
              George Chapman&rsquo;s English verse translations appeared
              between 1598 and 1616, and Alexander Pope&rsquo;s between 1715
              and 1726 — both are in the public domain and both are period
              interpretations as much as translations.
            </p>
            <p>
              The modern history of Homer in English is a history of
              translation choices, and choosing a translation is the single
              most consequential decision a reader makes. The{" "}
              <Link href="/books/odyssey">Odyssey page</Link> discusses the
              principal options and what each one costs.
            </p>

            <h2>What this cluster does not claim</h2>
            <p>
              It does not claim that Homer was one person, or that he was
              several. It does not claim that the Trojan War happened, or that
              it did not. It does not treat the poems as a transparent window
              onto any single historical period — the reasons are set out at{" "}
              <Link href="/homer-and-history">Homer and history</Link>. And it
              does not treat the mythological tradition as a record of events.
              The characters of the poems are collected under{" "}
              <Link href="/figures">Figures of the tradition</Link>, kept
              deliberately apart from the historical people in the{" "}
              <Link href="/philosophers">Philosophers</Link> layer, because a
              tradition preserving a character is not the same thing as a
              record attesting a person.
            </p>
          </>
        }
      />
    </>
  );
}
