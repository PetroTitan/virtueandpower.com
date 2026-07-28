import type { Metadata } from "next";
import Link from "next/link";
import { StudyLanding } from "@/components/site/StudyLanding";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleJsonLd, buildMetadata } from "@/lib/seo";
import { HOMER_LIBRARY_LINKS, otherHomerPages } from "@/data/homer-cluster";

const PATH = "/homer/works";
const TITLE = "The works attributed to Homer";
const DESCRIPTION =
  "The two epics, the Homeric Hymns, the lost poems of the Epic Cycle and the comic Batrachomyomachia — what antiquity credited to Homer, what modern scholarship attributes elsewhere, and why the distinction matters for reading the Odyssey.";
const UPDATED = "2026-07-28";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  type: "article",
});

export default function HomerWorksPage() {
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
              Ancient attribution was generous. At various points antiquity
              credited Homer with the two great epics, a collection of hymns,
              several of the poems of the Trojan cycle, a mock-epic about
              frogs and mice, and assorted minor pieces. Modern scholarship
              credits him — insofar as it credits a &ldquo;him&rdquo; at all —
              with two. Knowing which is which matters directly for reading
              the <Link href="/books/odyssey">Odyssey</Link>, because a great
              deal of what readers believe to be Homeric is not in Homer.
            </p>

            <h2>The Iliad</h2>
            <p>
              Roughly 15,700 lines in twenty-four books. The subject announced
              in the first line is not the war but the wrath — <em>mēnis</em> —
              of Achilles, and the poem covers a span of some weeks in the
              tenth and final year of the siege. It ends with the ransom of
              Hector&rsquo;s body by his father Priam. The fall of Troy is not
              narrated in it. Neither is the death of Achilles, the wooden
              horse, or the sack of the city; all of those belong to other
              poems or to later tradition.
            </p>
            <p>
              See <Link href="/books/iliad">the Iliad</Link> and{" "}
              <Link href="/guides/understanding-the-iliad">
                Understanding the Iliad
              </Link>
              .
            </p>

            <h2>The Odyssey</h2>
            <p>
              Roughly 12,100 lines in twenty-four books, on the homecoming —{" "}
              <em>nostos</em> — of Odysseus and the restoration of his
              household on Ithaca. It is a later poem than the{" "}
              <em>Iliad</em> in the judgement of most specialists, and the two
              differ in temperament, structure, vocabulary and moral interest
              enough that the question of common authorship has been argued
              since antiquity. The ancient scholars who held that the two
              poems had different authors were known as the <em>chorizontes</em>,
              the &ldquo;separators&rdquo;; Aristarchus argued against them.
            </p>
            <p>
              See <Link href="/books/odyssey">the Odyssey</Link>,{" "}
              <Link href="/comparisons/iliad-and-odyssey">
                Iliad and Odyssey
              </Link>{" "}
              and the{" "}
              <Link href="/books/odyssey/book-1">book-by-book guide</Link>.
            </p>

            <h2>The Homeric Hymns</h2>
            <p>
              A collection of thirty-three hexameter poems addressed to
              individual gods, ranging from a few lines to several hundred.
              They are called Homeric because they are in the same metre and
              the same traditional diction, and because antiquity sometimes
              attached Homer&rsquo;s name to them. They are not by the poet of
              the epics on any current view, and they span a considerable
              period. The longer ones — to Demeter, to Apollo, to Hermes, to
              Aphrodite — are major literary works in their own right and are
              our principal early evidence for several myths.
            </p>
            <p>
              For the Odyssey cluster their relevance is mainly negative: they
              are a common source of stories that readers then attribute to
              Homer&rsquo;s epics, where those stories do not appear.
            </p>

            <h2>The Epic Cycle</h2>
            <p>
              A set of poems that filled in the Trojan story before, around
              and after the <em>Iliad</em> — the <em>Cypria</em>, the{" "}
              <em>Aethiopis</em>, the <em>Little Iliad</em>, the{" "}
              <em>Iliou Persis</em> (Sack of Troy), the <em>Nostoi</em>{" "}
              (Homecomings) and the <em>Telegony</em>. They survive only in
              fragments, in the summaries of the grammarian Proclus, and in
              later authors who used them. Ancient tradition attributed some
              of them to Homer at various times; the attributions are
              inconsistent and are not accepted now.
            </p>
            <p>
              This matters more than it sounds. A great deal of the Trojan
              material that feels canonical comes from the Cycle or from later
              authors, not from Homer:
            </p>
            <ul>
              <li>
                The judgement of Paris, in the form usually retold, and the
                beginning of the war — <em>Cypria</em>.
              </li>
              <li>
                The death of Achilles at the hands of Paris and Apollo —{" "}
                <em>Aethiopis</em> / <em>Little Iliad</em>, not the{" "}
                <em>Iliad</em>.
              </li>
              <li>
                The wooden horse. It is referred to in the{" "}
                <em>Odyssey</em> — sung by Demodocus at{" "}
                <em>Odyssey</em> 8.499&ndash;520 and recalled by Menelaus at
                4.271&ndash;289 — but it is narrated at length in the{" "}
                <em>Iliou Persis</em> and, for most later readers, in{" "}
                <em>Aeneid</em> 2.
              </li>
              <li>
                Sinon, the Greek who persuades the Trojans to take the horse
                inside, is a figure of the Cycle and above all of Virgil. He
                is not a character in either Homeric poem.
              </li>
              <li>
                Later wanderings and death of Odysseus, and the son by Circe
                who kills him — <em>Telegony</em>.
              </li>
            </ul>
            <p>
              Whenever this platform cites a tradition, it names the source
              that preserves it. That is why every entry under{" "}
              <Link href="/figures">Figures of the tradition</Link> carries a
              list of which ancient text carries which version, instead of
              running them together into a single biography.
            </p>

            <h2>The Batrachomyomachia and the minor attributions</h2>
            <p>
              The <em>Batrachomyomachia</em>, a short mock-epic on a battle
              between frogs and mice, was attributed to Homer in antiquity and
              is certainly not his; it is a later parody that depends on the
              epics being universally known. A group of minor poems, the so
              called <em>Margites</em> among them, were also attached to his
              name at various times. Aristotle took the <em>Margites</em>{" "}
              seriously enough to discuss it as a comic ancestor in the{" "}
              <Link href="/books/poetics">Poetics</Link>. None of this material
              is Homeric in the sense that matters.
            </p>

            <h2>Why the boundary is worth policing</h2>
            <p>
              Most popular retellings of &ldquo;Homer&rdquo; are really
              retellings of a composite: Homer plus the Cycle plus Virgil plus
              Ovid plus Renaissance and modern reworkings. That composite is a
              legitimate object of study — it is what the tradition actually
              transmitted — but it is not the poem. When an adaptation is
              judged against &ldquo;Homer&rdquo;, the first question is always
              which Homer is meant, and the second is whether the element in
              question is in the epics at all.
            </p>
            <p>
              Our analysis of the 2026 film applies exactly this test. Some of
              what the film has been criticised for adding is not an addition
              to the tradition but an import from a different and later part
              of it — which is a real change to a specific poem, and a
              different kind of change from invention. See{" "}
              <Link href="/films/christopher-nolan-the-odyssey/homer-vs-film">
                Homer versus the film
              </Link>
              .
            </p>
          </>
        }
      />
    </>
  );
}
