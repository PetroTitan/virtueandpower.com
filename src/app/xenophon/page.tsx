import type { Metadata } from "next";
import Link from "next/link";
import { StudyLanding } from "@/components/site/StudyLanding";
import { ArchiveImage } from "@/components/site/ArchiveImage";
import { FiguresStrip } from "@/components/site/FiguresStrip";
import { InlineArchiveFragment } from "@/components/editorial/InlineArchiveFragment";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleJsonLd, buildMetadata } from "@/lib/seo";

const PATH = "/xenophon";
const TITLE = "Xenophon";
const DESCRIPTION =
  "Xenophon of Athens — soldier, general, student of Socrates, historian and the first sustained theorist of leadership. The bridge between Greece, Persia and Sparta, and one of the central intellectual pillars of Virtue & Power.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  type: "article",
});

export default function XenophonPage() {
  return (
    <>
      <JsonLd
        data={articleJsonLd({
          headline: "Xenophon — the soldier-philosopher of leadership",
          description: DESCRIPTION,
          url: PATH,
          dateModified: "2026-06-16",
          section: "Xenophon",
        })}
      />
      <StudyLanding
        path={PATH}
        eyebrow="Authority hub"
        title={TITLE}
        description={DESCRIPTION}
        hero={
          <ArchiveImage
            slug="retreat-of-the-ten-thousand"
            priority
            sizes="(min-width: 1280px) 1100px, (min-width: 768px) 90vw, 100vw"
          />
        }
        related={[
          { href: "/xenophon/works", label: "The works of Xenophon" },
          { href: "/philosophers/xenophon", label: "Xenophon — figure entry" },
          { href: "/books/cyropaedia", label: "Cyropaedia" },
          { href: "/books/anabasis", label: "Anabasis" },
          { href: "/books/memorabilia", label: "Memorabilia" },
          { href: "/themes/leadership-through-example", label: "Leadership through example" },
          { href: "/themes/education-of-rulers", label: "The education of rulers" },
          { href: "/themes/governance-through-character", label: "Governance through character" },
          { href: "/essays/why-xenophon-still-matters", label: "Why Xenophon still matters" },
          { href: "/comparisons/xenophon-vs-plato", label: "Xenophon vs Plato" },
        ]}
        afterBody={
          <FiguresStrip
            eyebrow="The company he kept"
            heading="Teacher, peer and the conqueror who read his books"
            items={[
              { slug: "socrates", role: "His teacher · c. 470–399 BCE" },
              { slug: "plato", role: "Fellow Socratic · c. 428–348 BCE" },
              { slug: "alexander", role: "Reader of the Cyropaedia · 356–323 BCE" },
            ]}
          />
        }
        body={
          <>
            <p>
              Xenophon of Athens (c. 430 – c. 354 BCE) is one of the few
              thinkers in the corpus who lived almost everything he wrote
              about. He knew Socrates personally and wrote him down; he served
              as a soldier and was elected to lead an army out of disaster; he
              wrote history, political theory, biography, and the first
              sustained ancient treatment of leadership. The platform reads him
              as a central bridging figure — between Greece and{" "}
              <Link href="/civilizations/persia">Persia</Link>, between Socrates
              and the practical life, between character and command — and
              places him in the first rank of its authors beside Plato,
              Aristotle, Plutarch, Polybius and Cicero.
            </p>

            <h2>Xenophon as soldier</h2>
            <p>
              As a young man Xenophon joined the expedition of the Persian
              prince Cyrus the Younger against his brother, the Great King
              Artaxerxes II, in 401 BCE. When Cyrus was killed at Cunaxa and the
              Greek commanders were treacherously murdered, the stranded
              mercenary army — the Ten Thousand — elected new leaders, and
              Xenophon was among them. He helped lead the long fighting retreat
              north through hostile country to the Black Sea, and told the story
              himself in the <Link href="/books/anabasis">Anabasis</Link>. The
              platform reads this as decisive for everything else: Xenophon is
              the rare theorist of{" "}
              <Link href="/themes/military-command">command</Link> who had
              actually exercised it, in the worst conditions, with everyone&apos;s
              life at stake.
            </p>

            <InlineArchiveFragment
              slug="dexileos-stele"
              size="small"
              note="The grave stele of Dexileos, an Athenian cavalryman of Xenophon's own generation and class."
            />

            <h2>Xenophon as student of Socrates</h2>
            <p>
              Xenophon was, with Plato, one of the two companions of Socrates
              whose writings survive — and our two main witnesses to the
              historical figure. His Socratic works, above all the{" "}
              <Link href="/books/memorabilia">Memorabilia</Link>, give us a
              Socrates strikingly different from Plato&apos;s: less the
              metaphysician pursuing the Forms, more the practical counsellor
              concerned with managing a household, choosing friends, governing
              the appetites and serving the city. The platform reads this under{" "}
              <Link href="/themes/socratic-practical-philosophy">
                Socratic practical philosophy
              </Link>{" "}
              — a Socrates of conduct rather than of pure theory, whom the
              platform treats as a genuine witness, not a pale copy.
            </p>

            <h2>Xenophon as historian</h2>
            <p>
              Xenophon&apos;s <Link href="/books/hellenica">Hellenica</Link> takes up
              the narrative of Greek affairs at the exact point where
              Thucydides breaks off in 411 BCE and carries it through the fall
              of Athens, the Spartan hegemony and its collapse at Leuctra. He
              wrote much of it as a contemporary and a participant, which gives
              the work the value and the limits of eyewitness history: vivid and
              first-hand where his sympathies were engaged, partial and thin
              where they were not. The platform reads him beside Thucydides as a
              different and instructive kind of historian — the engaged man of
              action rather than the detached analyst.
            </p>

            <h2>Xenophon as political thinker</h2>
            <p>
              Across his works Xenophon develops a coherent political vision
              that the platform reads under{" "}
              <Link href="/themes/governance-through-character">
                governance through character
              </Link>
              : the conviction that good order — in the household, the army or
              the empire — flows from the character of the person in charge. The{" "}
              <Link href="/books/oeconomicus">Oeconomicus</Link> treats the
              management of an estate, the{" "}
              <Link href="/books/cyropaedia">Cyropaedia</Link> the rule of an
              empire, and Xenophon insists they are one art at different scales.
              His is the Greek root of the idea, central to the whole platform,
              that private virtue and public office are continuous.
            </p>

            <h2>Xenophon as theorist of leadership</h2>
            <p>
              The platform reads Xenophon as antiquity&apos;s most practical theorist
              of leadership. His central claim is the distinction between
              compelled and willing obedience: the supreme achievement of the
              leader is to be obeyed gladly, and that obedience is won by{" "}
              <Link href="/themes/leadership-through-example">
                example
              </Link>{" "}
              — the leader sharing the hardship, showing the courage, modelling
              the discipline he demands. The foundation of example is
              self-command, the link between his leadership thought and his
              Socratic ethics. The Cyropaedia is, on this reading, the first
              book to treat the{" "}
              <Link href="/themes/education-of-rulers">
                education of rulers
              </Link>{" "}
              as a subject in its own right.
            </p>

            <h2>Xenophon and Persia</h2>
            <p>
              No Greek thinker engaged Persia more deeply. Xenophon marched into
              the Achaemenid interior and saw its roads, its provinces and its
              limits at first hand; and in the Cyropaedia he built an idealised
              portrait of <Link href="/themes/persian-kingship">Persian
              kingship</Link>, taking the empire of{" "}
              <Link href="/philosophers/cyrus-the-great">Cyrus the Great</Link>{" "}
              as the material for a study of the best king. The platform reads
              him as the central bridge between{" "}
              <Link href="/civilizations/persia">Persia</Link> and Greece — the
              soldier who knew the empire and the thinker who made its kingship
              a model for Greek political reflection.
            </p>

            <h2>Xenophon and Sparta</h2>
            <p>
              Xenophon admired Sparta as few Athenians of his standing did. He
              lived for years under Spartan patronage, served the Spartan king{" "}
              <Link href="/philosophers/agesilaus">Agesilaus</Link>, and wrote
              the fullest contemporary account of the Lacedaemonian system, the{" "}
              <Link href="/books/constitution-of-the-lacedaemonians">
                Constitution of the Lacedaemonians
              </Link>
              . The platform reads his admiration under{" "}
              <Link href="/themes/spartan-order">Spartan order</Link>: he valued
              Sparta as a whole society engineered to form character — the
              collective embodiment of the discipline his ethics prized — while
              honestly recording, even in his praise, that the order was already
              decaying in his own day.
            </p>

            <h2>Xenophon&apos;s influence</h2>
            <p>
              For much of European history Xenophon was among the most read of
              the Greek prose authors. The Cyropaedia was a manual of rule for
              the Renaissance mirror-for-princes tradition and for Machiavelli;
              the Anabasis was the archetype of disciplined endurance, read by
              soldiers and statesmen for two millennia; the Oeconomicus founded
              the literature of household management, and Cicero translated part
              of it. The platform reads his long influence as the working of his
              practical wisdom — the knowledge of how character bears on conduct
              under real pressure — and makes the case for his first-rank
              standing in{" "}
              <Link href="/essays/why-xenophon-still-matters">
                why Xenophon still matters
              </Link>
              . The whole body of work is surveyed at the{" "}
              <Link href="/xenophon/works">Works</Link> overview.
            </p>
          </>
        }
      />
    </>
  );
}
