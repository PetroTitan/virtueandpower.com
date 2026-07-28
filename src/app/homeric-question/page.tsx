import type { Metadata } from "next";
import Link from "next/link";
import { StudyLanding } from "@/components/site/StudyLanding";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleJsonLd, buildMetadata } from "@/lib/seo";
import { HOMER_LIBRARY_LINKS, otherHomerPages } from "@/data/homer-cluster";

const PATH = "/homeric-question";
const TITLE = "The Homeric Question";
const DESCRIPTION =
  "Two centuries of argument about who composed the Iliad and the Odyssey, whether one mind or many, and how a sung tradition became a fixed text — from Wolf's Prolegomena through Parry's fieldwork to the state of the question now.";
const UPDATED = "2026-07-28";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  type: "article",
});

export default function HomericQuestionPage() {
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
              The Homeric Question is not one question. It is a bundle of
              related ones that tend to be argued together and that have
              different evidential situations:
            </p>
            <ul>
              <li>Was there a poet called Homer?</li>
              <li>
                Did one poet compose the <em>Iliad</em>, and did the same poet
                compose the <em>Odyssey</em>?
              </li>
              <li>
                Are the poems unified compositions or compilations of shorter
                material?
              </li>
              <li>
                At what point, and by what process, did they become fixed
                texts?
              </li>
              <li>What is the role of writing in any of this?</li>
            </ul>
            <p>
              A position on one does not settle the others. It is perfectly
              coherent to hold that the poems are the product of a long oral
              tradition <em>and</em> that each reached its final shape through
              a single controlling design.
            </p>

            <h2>The ancient version of the question</h2>
            <p>
              Antiquity had its own form of the argument. The{" "}
              <em>chorizontes</em>, the &ldquo;separators&rdquo;, held that the{" "}
              <em>Iliad</em> and the <em>Odyssey</em> were by different poets,
              on grounds of language, temperament and inconsistency.
              Aristarchus of Samothrace argued against them. The Alexandrian
              scholars also athetised lines — marked them as probably not
              genuine — on internal grounds, which presupposes a working notion
              of what was authentic.
            </p>
            <p>
              What antiquity did not do was doubt that there had been a Homer.
              The biographical tradition is fanciful, but the attribution
              itself was not seriously questioned.
            </p>

            <h2>Wolf and the Analysts</h2>
            <p>
              Friedrich August Wolf&rsquo;s <em>Prolegomena ad Homerum</em>{" "}
              (1795) is the founding document of the modern question. Wolf
              argued that writing was not available in a form that would allow
              the composition of poems on this scale at the period in
              question, that the poems therefore originated as shorter oral
              songs, and that the texts we have are the product of later
              collection and editing.
            </p>
            <p>
              The nineteenth-century Analysts took up the programme and set
              about identifying the seams: the older core, the later
              expansions, the interpolated books. The work produced real
              philological results — <em>Iliad</em> 10, the Doloneia, is still
              widely regarded as a late addition, and the last part of{" "}
              <em>Odyssey</em> 23 onward has been suspected since antiquity,
              where a note in the scholia records that Aristophanes and
              Aristarchus marked 23.296 as the <em>peras</em> or{" "}
              <em>telos</em>, the end, of the poem.
            </p>
            <p>
              It also produced a great deal that did not survive scrutiny.
              Analysts frequently treated inconsistency as proof of multiple
              authorship, an inference that assumes a standard of narrative
              tidiness no long poem of any period meets.
            </p>

            <h2>The Unitarians</h2>
            <p>
              The Unitarian response argued from design. The{" "}
              <em>Iliad</em> is architecturally controlled across its full
              length: the wrath announced in the first line is worked out to
              the last book, and the ransom of Hector answers the quarrel of
              Book 1 in a way that is hard to attribute to accretion. The{" "}
              <em>Odyssey</em>&rsquo;s handling of time and of withheld
              information — the poem&rsquo;s hero does not appear until Book 5,
              and tells his own wanderings in retrospect in Books 9 to 12 — is
              a deliberate structure, not a stack of episodes.
            </p>
            <p>
              The Unitarian case is strongest exactly where the Analyst case is
              weakest, and vice versa, which is why the argument ran for a
              century without resolution.
            </p>

            <h2>Parry and the change of subject</h2>
            <p>
              Milman Parry&rsquo;s demonstration that Homeric diction is a
              traditional, economical, formulaic system did not decide between
              Analysts and Unitarians. It changed what the question was about.
              If the language itself is inherited — if the poet did not invent
              the phrases but deployed a system — then the presence of
              traditional material proves nothing about multiple authorship,
              and the absence of a written original proves nothing about lack
              of design.
            </p>
            <p>
              Albert Lord&rsquo;s <em>The Singer of Tales</em> (1960) set out
              the comparative evidence from South Slavic epic singing. The
              consequence for the Homeric Question was that
              &ldquo;oral&rdquo; and &ldquo;unified&rdquo; stopped being
              opposites.
            </p>

            <h2>Where the argument stands</h2>
            <p>
              There is no consensus, and this platform does not manufacture
              one. The live positions include, in broad terms:
            </p>
            <ul>
              <li>
                <strong>Monumental composer.</strong> A single exceptional
                poet, working within the oral tradition, composed each poem on
                a scale the tradition did not otherwise attempt, with the text
                fixed by dictation at or near that moment.
              </li>
              <li>
                <strong>Evolutionary model.</strong> There was no single moment
                of composition; the poems crystallised gradually across
                centuries of performance and transmission, with the text
                becoming progressively fixed. Associated above all with Gregory
                Nagy.
              </li>
              <li>
                <strong>Neoanalysis.</strong> The poems draw on identifiable
                earlier poetic material, including material later represented
                in the Epic Cycle, and reworking that material is part of how
                they achieve their effects.
              </li>
              <li>
                <strong>Two poets.</strong> The <em>Odyssey</em> is by a
                different and later hand than the <em>Iliad</em> — the ancient{" "}
                <em>chorizontes</em> position, still held in various forms.
              </li>
            </ul>
            <p>
              These are not all mutually exclusive, and serious scholars hold
              combinations of them.
            </p>

            <h2>What this platform holds</h2>
            <p>
              We hold none of them as settled, and we say so on every page
              where it is relevant. Where a page needs to refer to the author
              of the <em>Odyssey</em> it says &ldquo;the poet&rdquo; or
              &ldquo;Homer&rdquo; as the conventional attribution, and the{" "}
              <Link href="/books/odyssey">Odyssey entry</Link> records the
              attribution as traditional rather than established.
            </p>
            <p>
              This matters practically for adaptation criticism. When a film is
              measured against &ldquo;what Homer wrote&rdquo;, the thing it is
              being measured against is a transmitted text of disputed origin
              whose own tradition reworked its material continuously. That is
              not a reason to abandon the comparison — the text is stable
              enough to compare against, and comparison is exactly what our{" "}
              <Link href="/films/christopher-nolan-the-odyssey/homer-vs-film">
                Homer versus the film
              </Link>{" "}
              analysis does. It is a reason to make the comparison to the
              transmitted poem specifically, and to say so, rather than to an
              imagined original.
            </p>
          </>
        }
      />
    </>
  );
}
