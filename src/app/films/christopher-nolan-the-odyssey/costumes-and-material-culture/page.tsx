import type { Metadata } from "next";
import Link from "next/link";
import { FilmPageShell } from "@/components/editorial/FilmPageShell";
import { EvidenceKey } from "@/components/editorial/EvidenceBadge";
import { NOLAN_ODYSSEY } from "@/data/films";
import { buildMetadata } from "@/lib/seo";

const PATH = `/films/${NOLAN_ODYSSEY.slug}/costumes-and-material-culture`;
const TITLE = "Costumes and material culture";
const DESCRIPTION =
  "Helmets, armour, ships and halls in Christopher Nolan's The Odyssey — what was criticised, what the archaeological record supports, what Homer describes, and which objections survive.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  type: "article",
});

export default function CostumesPage() {
  return (
    <FilmPageShell
      path={PATH}
      eyebrow="Material culture"
      title={TITLE}
      description={DESCRIPTION}
      meta="Objection by objection, against both the poem and the record"
    >
      <div className="vp-prose">
        <h2>The standard there is no way to meet</h2>
        <p>
          There is no configuration of costume and equipment that is
          simultaneously faithful to Homer and accurate to the Late Bronze
          Age, because Homer is not accurate to the Late Bronze Age. The
          poems contain bronze weapons and iron tools, tower shields and
          later round bossed shields, a boar&rsquo;s-tusk helmet four
          centuries obsolete, chariots used as taxis rather than as fighting
          platforms, and Phoenician traders from the poet&rsquo;s own world.
        </p>
        <p>
          A production must therefore choose which it is being faithful to.
          The useful critical questions are whether it chose coherently and
          whether the choice serves the material. Full background at{" "}
          <Link href="/guides/weapons-ships-and-palaces-in-the-odyssey">
            weapons, ships and palaces in the Odyssey
          </Link>
          .
        </p>

        <h2>The objections raised, assessed</h2>

        <h3>The helmets</h3>
        <p>
          Marketing imagery showing a Corinthian-type helmet with a red
          plume drew immediate objection from commentators who pointed out
          that the Corinthian helmet is an Archaic and Classical form,
          roughly half a millennium after the poems&rsquo; nominal setting,
          and that the properly Homeric headgear is the boar&rsquo;s-tusk
          helmet.
        </p>
        <p>
          The objection is technically correct and proves less than it
          appears to. The boar&rsquo;s-tusk helmet appears in exactly one
          passage in the poems, in a book widely regarded as among the latest
          material in the <em>Iliad</em>. The Corinthian helmet is the shape
          every viewer recognises as Greek, which is a legitimate reason for
          a film to use it and an illegitimate reason to call it accurate.
        </p>
        <p>
          The stronger version of the criticism, made by an ancient
          historian writing at Tales of Times Forgotten, is about
          uniformity rather than type: the equipment reads as issued rather
          than as accumulated, where both the archaeological record and the
          poems show variety. Homeric warriors bring their own gear and it
          is described individually. That is a real point about texture.
        </p>

        <h3>The ships</h3>
        <p>
          Widely criticised as Norse rather than Aegean, and the production
          did use the Draken Harald Hårfagre, a modern reconstruction of a
          Viking longship, as a working vessel across locations.
        </p>
        <p>
          This is the material objection we consider best founded. The
          Odyssey&rsquo;s ships are open, oared, sailed, drawn up on beaches
          overnight and dark with pitch, with crews of twenty or fifty;
          Geometric-period Greek ship depictions correspond reasonably well.
          A Scandinavian hull form roughly two millennia later is a visible
          departure from both the poem and the record, and unlike the
          helmets it is not a departure that buys legibility — a Greek
          galley is not a harder image for an audience than a longship.
        </p>

        <h3>Trousers and spurs</h3>
        <p>
          Both reported as appearing and both anachronistic. Greeks
          regarded trousers as characteristically barbarian dress and the
          poems do not have them; spurs are a considerably later
          development.
        </p>
        <p>
          Minor, and worth recording, because they indicate a costume
          department working from a general antique register rather than
          from a period.
        </p>

        <h3>Agamemnon&rsquo;s armour</h3>
        <p>
          Reported as a dark helmet and suit corresponding to nothing in the
          Greek record. This is design rather than reconstruction. It is
          also the kind of choice that reads to audiences as historical
          because it appears in a film that is otherwise scrupulous.
        </p>

        <h3>The palette</h3>
        <p>
          The best of the material criticisms, made by Myke Cole in Slate.
          Ancient equipment was polished; Homeric bronze in the text gleams,
          flashes and dazzles. The muted, grimy register the film shares
          with most modern historical cinema is a contemporary convention,
          not an observation about antiquity, and it is a departure from the
          poem&rsquo;s own descriptions rather than merely from the
          archaeology.
        </p>

        <h2>What the film gets right</h2>
        <p>
          Several things, and they are the kind of detail that indicates
          research rather than atmosphere.
        </p>
        <p>
          The great hall follows the megaron plan, which corresponds
          reasonably to the excavated halls at Pylos, Mycenae and Tiryns and
          to what the poem describes. Penelope&rsquo;s loom is reported as
          the vertical warp-weighted type, which is correct and is the kind
          of thing productions routinely get wrong. Ludwig Göransson&rsquo;s
          score is reported to incorporate reconstructions of the{" "}
          <em>aulos</em> and the <em>kithara</em>, which are the instruments
          the poems name. The opening bard is reported to keep time with a
          staff, which is a specific and defensible reading of how rhapsodic
          performance worked.
        </p>
        <p>
          None of these is spectacular and all of them are harder to get
          right than a helmet.
        </p>

        <h2>Assessment</h2>
        <p>
          The costume and material culture is a deliberate composite in the
          way most screen antiquity is a composite, and the poem it adapts
          is a composite too, which removes most of the force from most of
          the objections.
        </p>
        <p>
          What survives: the ships, which depart from both the poem and the
          record without gaining legibility; the palette, which departs from
          the poem&rsquo;s own insistence on brightness; and the uniformity,
          which flattens a variety both sources show. Against those, a set
          of quiet correctnesses — the megaron, the loom, the instruments —
          that indicate a production which did the reading and then made
          design decisions anyway.
        </p>
        <p>
          That is an ordinary and defensible position for a film to be in.
          It is not the scandal it was reported as.
        </p>
      </div>

      <EvidenceKey className="mt-16" />
    </FilmPageShell>
  );
}
