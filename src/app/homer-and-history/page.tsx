import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/editorial/PageHeader";
import { RelatedReading } from "@/components/editorial/RelatedReading";
import {
  EvidenceClaim,
  EvidenceKey,
} from "@/components/editorial/EvidenceBadge";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleJsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { HOMER_LIBRARY_LINKS, otherHomerPages } from "@/data/homer-cluster";

const PATH = "/homer-and-history";
const TITLE = "Homer and history";
const DESCRIPTION =
  "What the Homeric epics can and cannot be used as evidence for. Bronze Age memory, Dark Age practice, Archaic institution and poetic convention sit layered in the same poem — and separating them is the whole methodological problem.";
const UPDATED = "2026-07-28";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  type: "article",
});

/**
 * The layered-evidence ledger. Each claim carries the level at which it
 * can actually be asserted, so that a reader can see at a glance which
 * statements rest on excavated objects, which on inference, and which
 * belong to the poem rather than to the past.
 */
const CLAIMS = [
  {
    level: "documented" as const,
    claim:
      "A Greek-speaking palace civilisation existed in the Aegean in the Late Bronze Age.",
    detail:
      "The Linear B tablets from Knossos, Pylos, Mycenae and Thebes are administrative documents in an early form of Greek. They record rations, personnel, land tenure, textiles and offerings. They establish the language and the bureaucracy beyond argument.",
    sources: "Linear B archives · Ventris and Chadwick's decipherment, 1952",
  },
  {
    level: "documented" as const,
    claim:
      "Personal names later borne by Homeric characters occur in Linear B as the ordinary names of ordinary people.",
    detail:
      "Forms corresponding to Achilles and Hector appear in the tablets as names of otherwise unremarkable individuals. This shows the names are genuinely old. It does not show that the characters are, any more than a medieval tax roll listing an Arthur establishes the round table.",
    sources: "Linear B tablets, Knossos and Pylos",
  },
  {
    level: "documented" as const,
    claim:
      "The Iliad describes a boar's-tusk helmet of a type that had gone out of use centuries before the poem.",
    detail:
      "The helmet at Iliad 10.261-265 corresponds closely to helmets excavated from Mycenaean contexts. Something in the tradition preserved a real object across a long gap. Note also that Iliad 10 is widely regarded as among the latest material in the poem, which complicates any simple story of continuous transmission.",
    sources: "Iliad 10.261-265 · excavated examples, National Archaeological Museum, Athens",
  },
  {
    level: "probable" as const,
    claim:
      "The mound at Hisarlik in north-western Turkey is the site the Greeks knew as Ilios.",
    detail:
      "The identification rests on the site's position controlling the Dardanelles, its long occupation sequence, and the continuity of the Greek and Roman city of Ilion there. It is widely accepted. It is an identification of a place, and carries no implication about events.",
    sources: "Excavations at Hisarlik, Schliemann onward; continuing campaigns",
  },
  {
    level: "disputed" as const,
    claim:
      "Hittite diplomatic texts referring to Ahhiyawa and Wilusa refer to the Achaeans and to Ilios.",
    detail:
      "The linguistic correspondences are suggestive and many specialists accept them. What Ahhiyawa denoted politically — a single kingdom, a region, a shifting label — is contested, and the texts describe diplomatic and military friction over a long period rather than one war. Those who reject the equations point out that the correspondence of names does not establish the correspondence of the entities named.",
    sources: "Hittite archives, Hattusa",
  },
  {
    level: "disputed" as const,
    claim:
      "A destruction level at Troy corresponds to the war the Greeks remembered.",
    detail:
      "Hisarlik was destroyed and rebuilt repeatedly; the candidate levels have been argued over for a century, and destruction by earthquake, by fire and by human agency are not always separable in the record. Even where destruction by attack is likely, nothing ties it to a coalition of Greek kings or to the persons named in the poems. The competing position is that a memory of Late Bronze Age conflict in the region was absorbed into a heroic tradition that then generated its own detail.",
    sources: "Excavation reports on Troy VI and VIIa",
  },
  {
    level: "disputed" as const,
    claim:
      "The society depicted in the epics reflects a real historical society, and if so, which one.",
    detail:
      "Homer's world of household-based chieftains, personal followings, gift exchange and weak central authority does not match the Linear B picture of a literate palace bureaucracy under a wanax. Moses Finley argued in The World of Odysseus (1954) that the social world of the poems belongs to the Early Iron Age rather than the Bronze Age. Others hold that the depiction is a poetic construction that never corresponded to any single society. Both positions have serious support.",
    sources: "M. I. Finley, The World of Odysseus, 1954, and the subsequent debate",
  },
  {
    level: "documented" as const,
    claim:
      "The poems mix material of visibly different periods.",
    detail:
      "Bronze weapons alongside iron tools; cremation, which is not the standard Mycenaean rite; Phoenician traders, who belong to the world after about 800 BCE; assemblies in the agora that look like later civic practice. These are features of the text itself and can be checked by reading it.",
    sources: "Throughout the Iliad and Odyssey",
  },
  {
    level: "literary" as const,
    claim:
      "Circe, Polyphemus, the bag of winds, Scylla and Charybdis, the descent to the dead.",
    detail:
      "These belong to poetic and mythological construction. Attempts to locate them on a real map have been made continuously since antiquity — Strabo discusses the question and is sceptical of the more literal-minded attempts — and none commands assent. Calling them literary is a statement about genre, not a complaint.",
    sources: "Odyssey 9-12 · Strabo, Geography, Book 1",
  },
  {
    level: "unknown" as const,
    claim: "Whether any individual behind the figure of Odysseus existed.",
    detail:
      "There is no evidence of any kind bearing on the question. It is not that the evidence is weak; there is none. The honest answer is that this is unknown and is likely to remain so.",
    sources: "No evidence available",
  },
];

export default function HomerAndHistoryPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: TITLE, href: PATH },
          ]),
          articleJsonLd({
            headline: TITLE,
            description: DESCRIPTION,
            url: PATH,
            dateModified: UPDATED,
            section: "Homer",
          }),
        ]}
      />
      <PageHeader
        breadcrumbs={[{ label: "Home", href: "/" }, { label: TITLE }]}
        eyebrow="Homer"
        title={TITLE}
        description={DESCRIPTION}
      />
      <Container width="editorial" className="py-16">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-8">
            <div className="vp-prose">
              <p>
                The question &ldquo;is Homer historical?&rdquo; is badly formed,
                and answering it as put — yes or no — produces a false
                statement either way. The epics are neither a record of events
                nor a pure invention. They are a traditional poetic composition
                that carries material of several different periods
                simultaneously, and the periods cannot be peeled apart cleanly
                because the tradition did not keep them separate.
              </p>
              <p>
                The single methodological rule this platform applies to the
                epics is therefore: <strong>never treat Homer as a
                transparent description of one historical era.</strong> The
                poems may preserve, in the same passage, inherited memories of
                the Late Bronze Age, practices of the intervening centuries,
                institutions contemporary with the poet, formulaic language
                older than any of it, and narrative invention.
              </p>
              <p>
                What follows is a ledger of the principal claims, each carrying
                the level at which it can honestly be asserted.
              </p>
            </div>

            <div className="mt-12 border-t border-rule pt-2">
              {CLAIMS.map((c) => (
                <EvidenceClaim
                  key={c.claim}
                  level={c.level}
                  claim={c.claim}
                  detail={c.detail}
                  sources={c.sources}
                />
              ))}
            </div>

            <div className="vp-prose mt-16">
              <h2>The layers, and why they cannot be separated cleanly</h2>
              <p>
                A single line of Homer can contain a Bronze Age object, an Iron
                Age social assumption and a formula older than both. The
                boar&rsquo;s-tusk helmet is the standard example of genuine
                Bronze Age survival; the Phoenician traders are the standard
                example of the poet&rsquo;s own world; and the epithets are
                older than the passages they sit in. A reader who takes any one
                of these as the poem&rsquo;s &ldquo;real&rdquo; period will
                construct a historical Homer that never existed.
              </p>
              <p>
                It follows that both of the confident positions are wrong. The
                position that the epics are a Bronze Age document is wrong: too
                much in them belongs demonstrably to later centuries. The
                position that they are pure fiction with no historical content
                is also wrong: the helmet is real, the names are old, and the
                site is where the Greeks said it was. What is required is the
                harder discipline of saying, claim by claim, which is which.
              </p>

              <h2>What archaeology can and cannot settle</h2>
              <p>
                Archaeology is very good at establishing that a place was
                occupied, destroyed, rebuilt, traded with, and fortified. It is
                poor at establishing who did the destroying and why, and it is
                nearly powerless on the question of whether a named individual
                existed. A burnt layer is compatible with a great many stories.
              </p>
              <p>
                This asymmetry is the source of most popular error about the
                Trojan War. The finding that Hisarlik was destroyed is
                frequently reported as though it confirmed the{" "}
                <em>Iliad</em>. It does not. It confirms that a well-placed
                fortified site in a contested region met the fate that
                well-placed fortified sites in contested regions regularly
                met.
              </p>

              <h2>Consequences for reading, and for criticising adaptations</h2>
              <p>
                Two consequences follow, and this cluster applies both.
              </p>
              <p>
                First, no page here converts the poem into a history. The
                characters live under{" "}
                <Link href="/figures">Figures of the tradition</Link>, and each
                one states its historicity on the taxonomy below rather than
                opening with a birth date.
              </p>
              <p>
                Second, when a film is judged for &ldquo;historical
                inaccuracy&rdquo;, the charge has to be framed carefully. A
                production that departs from Homer has departed from a poem.
                A production that departs from the Late Bronze Age has departed
                from an archaeological reconstruction that the poem itself
                departs from constantly. These are different criticisms with
                different force, and running them together produces exactly the
                confident nonsense this page exists to prevent. See{" "}
                <Link href="/films/christopher-nolan-the-odyssey/historical-accuracy">
                  the film&rsquo;s historical accuracy
                </Link>{" "}
                and{" "}
                <Link href="/guides/odyssey-myth-and-history">
                  Odyssey: myth and history
                </Link>
                .
              </p>
            </div>

            <EvidenceKey className="mt-16" />
          </div>

          <aside className="md:col-span-4 md:border-l md:border-rule md:pl-10">
            <p className="vp-eyebrow">The Homer cluster</p>
            <ul className="mt-3 space-y-2 text-sm">
              {otherHomerPages(PATH).map((p) => (
                <li key={p.path}>
                  <Link href={p.path} className="vp-link text-charcoal-100">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="vp-eyebrow mt-8">Read across the library</p>
            <ul className="mt-3 space-y-2 text-sm">
              {HOMER_LIBRARY_LINKS.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="vp-link text-charcoal-100">
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <RelatedReading
          items={[
            {
              href: "/guides/was-odysseus-real",
              title: "Was Odysseus real?",
              kind: "guide",
              excerpt:
                "The question asked properly, and why the honest answer is not a disappointing one.",
            },
            {
              href: "/guides/trojan-war-memory-and-myth",
              title: "The Trojan War: memory and myth",
              kind: "guide",
              excerpt:
                "What the archaeology of Hisarlik supports, what the Hittite archives may show, and where inference outruns evidence.",
            },
            {
              href: "/guides/odyssey-and-mycenaean-greece",
              title: "The Odyssey and Mycenaean Greece",
              kind: "guide",
              excerpt:
                "The palace world of Linear B against the household world of the poem.",
            },
          ]}
        />
      </Container>
    </>
  );
}
