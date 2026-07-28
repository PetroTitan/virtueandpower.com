import type { Metadata } from "next";
import Link from "next/link";
import { FilmPageShell } from "@/components/editorial/FilmPageShell";
import { NOLAN_ODYSSEY } from "@/data/films";
import { buildMetadata } from "@/lib/seo";

const PATH = `/films/${NOLAN_ODYSSEY.slug}/review`;
const TITLE =
  "The Odyssey on screen: what Christopher Nolan preserved, changed and erased";
const DESCRIPTION =
  "A full review of Christopher Nolan's The Odyssey as cinema and as adaptation — what the film achieves, where it improves on the poem's staging, and where its changes to Odysseus, Penelope and the ending alter what the poem is about.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  type: "article",
});

export default function ReviewPage() {
  return (
    <FilmPageShell
      path={PATH}
      eyebrow="Review"
      title={TITLE}
      description={DESCRIPTION}
      meta="Assessed as cinema and as adaptation · every departure classified"
    >
      <div className="vp-prose">
        <h2>1. Thesis</h2>
        <p>
          Christopher Nolan has made a large, serious, frequently beautiful
          film that understands more about the <em>Odyssey</em> than almost
          any previous screen version, and that resolves the poem&rsquo;s
          central ambiguity in the one direction the poem refuses to. It
          preserves the structure and loses the temperament. What it gives
          back in its place — a hero organised around guilt, and an ending
          that makes him pay for his own restoration — is coherent, and is
          a different subject.
        </p>
        <p>
          Our judgement is that this is the best screen <em>Odyssey</em>{" "}
          there has been and is not the <em>Odyssey</em>.
        </p>

        <h2>2. What the film achieves</h2>
        <p>
          Three things, and they are not small.
        </p>
        <p>
          It keeps the retrospective narration. The wanderings are told by
          Odysseus, after the fact, to a listener with an interest in the
          telling — relocated from the Phaeacian court to Calypso&rsquo;s
          island, but structurally intact. Adaptations discard this almost
          without exception, because a hero narrating his own marvels is
          harder to stage than marvels. It is also the poem&rsquo;s most
          distinctive formal feature, and the reason its most famous
          episodes carry an undertow of doubt.
        </p>
        <p>
          It gets the underworld right. In Homer, Odysseus does not descend
          into hell; he sails to the edge of the world, digs a trench,
          pours offerings, and the dead come up to the blood (<em>Od.</em>{" "}
          11.13&ndash;50). Nearly every adaptation substitutes a descent.
          This one stages the summoning. It is a small fidelity and it
          indicates people who read the text rather than the memory of it.
        </p>
        <p>
          And it keeps <em>xenia</em> as the moral centre, rendered as the
          law of Zeus. The suitors are not villains because they are rude;
          they are guests destroying a host, under divine protection they
          have forfeited. That is what the poem thinks, and the film thinks
          it too.
        </p>

        <h2>3. Visual scale and film-making</h2>
        <p>
          The film was photographed entirely on IMAX 70mm, reportedly the
          first feature to be, across locations in Morocco, Greece, Italy,
          Scotland, Iceland, Malta and Western Sahara, with a single
          sound-stage sequence. Peter Bradshaw in the Guardian described
          gasp-inducing IMAX-sized landscapes of loneliness, and John
          Nugent in Empire found the scale jaw-detaching.
        </p>
        <p>
          The value of the format here is not spectacle for its own sake.
          The <em>Odyssey</em> is a poem about a small man on a large sea,
          and a frame that can hold a horizon and a face at once is doing
          something the material wants. The Circe sequence, widely reported
          as the film&rsquo;s most frightening, is the clearest case of
          scale used for dread rather than for grandeur.
        </p>
        <p>
          One reservation, and it is not ours originally: the military
          historian Myke Cole, writing in Slate, objected that the muted
          palette misrepresents an ancient world whose equipment was
          polished to catch the light. He is right that Homeric armour
          gleams in the text — the poem is full of flashing bronze — and
          the grimy register is a convention of modern historical cinema
          rather than an observation about antiquity.
        </p>

        <h2>4. Narrative adaptation</h2>
        <p>
          The compression is intelligent and it is severe. Gone: the
          Phaeacians entire, Nestor and Pylos, the Lotus-Eaters as a
          separate episode, Aeolus and the bag of winds, and Laertes. What
          remains is a straighter line from Troy to the hall.
        </p>
        <p>
          The Phaeacian cut is the expensive one. Scheria is where the poem
          shows hospitality performed perfectly, and it is the counterweight
          to the Cyclops at one end and the suitors at the other. A film
          that makes <em>xenia</em> its moral centre and removes the episode
          where <em>xenia</em> works has weakened its own argument. The
          gain — a location and a set of characters removed from a
          near-three-hour film — is real, and we would classify this as
          necessary compression rather than as error. It is simply the most
          costly necessary compression available.
        </p>

        <h2>5. Treatment of Odysseus</h2>
        <p>
          Matt Damon is very good, and David Rooney in The Hollywood
          Reporter was right that he goes to dark places. The problem is
          not the performance; it is the conception.
        </p>
        <p>
          Homer&rsquo;s Odysseus is <em>polytropos</em> — a word that means
          both much-travelled and devious, and which the poem never
          disambiguates. He lies constantly, to enemies and to friends. He
          lies to Athena&rsquo;s face and she laughs and praises him for it
          (<em>Od.</em> 13.287&ndash;299). He tests his own grieving father
          in an orchard for no strategic reason whatever. The poem declines
          to resolve whether this is admirable.
        </p>
        <p>
          The film&rsquo;s Odysseus is more honourable and more merciful,
          organised around guilt for the war rather than around cunning. He
          is reported to warn opponents before shooting. Emily Wilson,
          whose 2018 translation is the most widely read current English
          version, told the Guardian that the film gives a quite simple
          action-hero movie about an action hero who feels bad about being
          an action hero, and that she would be ashamed to have written any
          part of the script.
        </p>
        <p>
          That is harsher than our own view and it identifies the right
          thing. Guilt is a real form of moral difficulty. It is also a
          familiar one, and the poem&rsquo;s difficulty is unfamiliar: a
          hero whose central virtue is indistinguishable from a vice, and
          a text that will not tell you which it is. Substituting the first
          for the second is the film&rsquo;s largest interpretive act.
        </p>
        <p>
          The clearest symptom is the Cyclops. Reported accounts indicate
          the escape does not turn on the <em>Outis</em> trick — the false
          name that makes the neighbours&rsquo; help impossible, and which
          in Greek puns on <em>mētis</em>, cunning itself. Without it,
          escape becomes nerve. The untranslatability of the pun is a real
          constraint; the trick, however, works perfectly well in English.
        </p>

        <h2>6. Treatment of Penelope</h2>
        <p>
          Anne Hathaway is given more political weight than the poem gives
          her: a queen who has governed for twenty years and is not eager to
          hand the government back. That is a genuine strengthening and it
          is well judged.
        </p>
        <p>
          And then the film removes the test of the bed.
        </p>
        <p>
          In Homer, Penelope refuses to accept the man who has just killed a
          hundred and eight people in her hall until she has proved him. She
          orders the marriage bed moved out of the chamber; he explodes,
          because he built it around a living olive trunk rooted in the
          ground and it cannot be moved (<em>Od.</em> 23.173&ndash;206). It
          is the only moment in the poem when anyone outmanoeuvres
          Odysseus, and his wife does it, by provoking him into revealing
          himself.
        </p>
        <p>
          The film has her embrace the wounded Odysseus after the killing.
          The reasoning is legible — the massacre is the climax, and a test
          afterwards would deflate it. But ruling competently is a state,
          and out-thinking the cleverest man alive is an action, and it is
          the action by which the poem establishes that her intelligence
          matches his. This is the change we regard as most damaging, and
          it is made worse rather than better by the film&rsquo;s evident
          wish to take her seriously.
        </p>

        <h2>7. Treatment of Telemachus</h2>
        <p>
          Tom Holland carries the earnestness the part needs; Rooney&rsquo;s
          line that he comes across as Peter Parker in a tunic is funny and
          not entirely unfair.
        </p>
        <p>
          The film expands the father-son relationship considerably. Homer
          gives them startlingly little: a recognition in a hut with no
          evidence at all, immediately doubted, and then a conspiracy
          (<em>Od.</em> 16.186&ndash;218). The expansion is the film&rsquo;s
          own and is defensible; a screen relationship needs more surface
          than the poem supplies.
        </p>
        <p>
          What is lost is the poem&rsquo;s sharper account of what
          Telemachus is becoming. His development in Homer is not moral
          improvement but the acquisition of authority, and the poem shows
          him using it first to send his mother out of the hall and last to
          hang twelve enslaved women in preference to the clean death his
          father ordered. A gentler arc is a warmer film and a smaller idea.
        </p>

        <h2>8. The gods and the supernatural</h2>
        <p>
          The production is reported to have pursued a maximally realistic
          treatment, declining to depict gods acting. Athena is present, and
          connected with a young Trojan priestess killed during the sack;
          divine hostility registers as weather and as fear.
        </p>
        <p>
          The defence of this is stronger than it first appears. Homeric
          gods characteristically act <em>through</em> a human faculty
          rather than around it: Athena puts strength or a thought into
          someone who then acts and is held responsible for acting. A
          rendering in which divine action is felt from the inside is
          arguably nearer that than gods on clouds would be. Zeus&rsquo;s
          own opening speech insists that mortals bring ruin on themselves
          (<em>Od.</em> 1.32&ndash;43).
        </p>
        <p>
          The cost is structural and it is real. The poem&rsquo;s plot runs
          on Athena&rsquo;s advocacy and Poseidon&rsquo;s grievance. Remove
          both as agents and the delay has no stated cause and the return no
          engine. And tying Athena to a woman killed in the sack converts
          the goddess of practical intelligence — an independent power with
          her own interests, who admires the hero because they share a
          professional specialism — into an emanation of his conscience.
          That is a coherent modern reading and a substantial demotion.
        </p>

        <h2>9. War, trauma, and homecoming</h2>
        <p>
          This is where the film is most confident and where its reviewers
          have been most persuaded. Myke Cole, a combat veteran writing in
          Slate, argued that the film succeeds at the psychological truth of
          the poem even where its material culture fails, and that the{" "}
          <em>Odyssey</em> has always been about the impossibility of
          returning unchanged.
        </p>
        <p>
          The reading is anachronistic in its vocabulary and sound in its
          substance. Homer has no concept of trauma and no word for it. But
          the poem does show a man weeping on a beach for seven years, and
          weeping again when a stranger sings about his own greatest
          triumph, and the widow simile of Book 8 — where the sacker of
          cities is compared to a woman being dragged from her
          husband&rsquo;s body into slavery — is the most morally serious
          thing in it. A film that takes homecoming to be difficult is
          reading the poem correctly.
        </p>

        <h2>10. Hospitality and political order</h2>
        <p>
          Strong, and the film&rsquo;s best sustained fidelity. Rendering{" "}
          <em>xenia</em> as Zeus&rsquo;s law keeps the poem&rsquo;s actual
          moral architecture rather than substituting a modern one, and it
          makes the suitors&rsquo; offence legible as something other than
          bad manners.
        </p>
        <p>
          The political anatomy is thinner. Homer&rsquo;s Ithaca is a
          kingdom whose institutions exist and cannot act: the assembly in
          Book 2 is the first in twenty years and it achieves nothing,
          because the only authority the society recognises is an absent
          man&rsquo;s. That diagnosis is what makes the killing legible as
          restoration rather than as private vengeance, and a film with less
          room for assemblies inevitably carries less of it.
        </p>

        <h2>11. The suitors and Ithaca</h2>
        <p>
          Robert Pattinson&rsquo;s Antinous is reported as an outstanding
          villain, and the film gives him a back-story — service avoided by
          sending a servant&rsquo;s son in his place — that ties the
          Ithacan crisis to the war&rsquo;s guilt.
        </p>
        <p>
          It is good screenwriting and it is an invention. Homer&rsquo;s
          suitors have no back-stories; the poem complicates them
          differently and more subtly, through Amphinomus, who is decent,
          who is privately warned by Odysseus to go home, who is troubled,
          who stays, and who is killed. The poem takes care to establish
          that the massacre catches a man who did not deserve it. A single
          villain with a motive is a cleaner structure and a smaller moral
          problem.
        </p>

        <h2>12. Dialogue and tone</h2>
        <p>
          Contemporary English, which is the only practical choice for a
          film of this budget and reach, and not in itself a fault: every
          English <em>Odyssey</em> is a modernisation, and Chapman and Pope
          were period interpretations too.
        </p>
        <p>
          One reported detail deserves more scrutiny than it has received.
          An ancient historian writing at Tales of Times Forgotten objected
          to a single scene using Modern Greek, on the grounds that the
          effect is to place the Greek language on the far side of a
          comprehension barrier while English-speaking characters stand in
          for the ancients — an implication with an unpleasant intellectual
          history behind it. We have not been able to verify the scene
          independently and therefore do not enter it in the ledger. We note
          the objection, from a qualified source, as unverified.
        </p>

        <h2>13. Geography and landscape</h2>
        <p>
          The locations are the film&rsquo;s least contestable achievement.
          Shooting in Messenia, the Aeolian Islands, Iceland and the Moray
          coast gives the sea a range of moods that a single Mediterranean
          unit could not, and the poem&rsquo;s sea has moods.
        </p>
        <p>
          Homer&rsquo;s geography is not a map, and attempts to make it one
          have failed since antiquity — Strabo was already sceptical of the
          literal-minded versions. A film that treats the wanderings as
          taking place in a plural, unlocatable world is closer to the poem
          than one that pins them to a chart.
        </p>

        <h2>14. Costume and material culture</h2>
        <p>
          The most criticised aspect online and the least well-founded
          criticism. Full treatment at{" "}
          <Link href={`/films/${NOLAN_ODYSSEY.slug}/costumes-and-material-culture`}>
            costumes and material culture
          </Link>
          ; in brief: there is no configuration of equipment that is
          simultaneously faithful to Homer and accurate to the Late Bronze
          Age, because Homer is not accurate to the Late Bronze Age. The
          poem contains bronze weapons and iron tools, a boar&rsquo;s-tusk
          helmet four centuries obsolete, and Phoenician traders who belong
          to the poet&rsquo;s own era.
        </p>
        <p>
          Some specific objections survive that argument — the ships, which
          have been widely described as Norse rather than Aegean, and the
          uniformity of the helmets, where the record shows variety. Those
          are real and minor.
        </p>

        <h2>15. Casting and source fidelity</h2>
        <p>
          Assessed decision by decision at{" "}
          <Link href={`/films/${NOLAN_ODYSSEY.slug}/casting-and-authenticity`}>
            casting and authenticity
          </Link>
          . The summary position: Homer supplies almost no physical
          description of anyone, the descriptions he does supply do not map
          onto modern racial categories, and the objection with an actual
          argument behind it is a different one — that a film adapting the
          foundational work of Greek literature, filming in Greece, has no
          Greek performer in its principal cast. That objection was made in
          Greece and is answerable by the production.
        </p>

        <h2>16. Major departures from Homer</h2>
        <p>
          Set out in full, with evidence, in the{" "}
          <Link href={`/films/${NOLAN_ODYSSEY.slug}/what-the-film-changed`}>
            adaptation-claims ledger
          </Link>{" "}
          and element by element in the{" "}
          <Link href={`/films/${NOLAN_ODYSSEY.slug}/homer-vs-film`}>
            comparison table
          </Link>
          . The largest are the Phaeacian cut, the removal of the bed test,
          the lotus-drugged Calypso, the absence of Laertes, the
          transferred guilt for the desecration of Athena&rsquo;s statue,
          the imported Virgilian Sinon, and the ending.
        </p>

        <h2>17. Changes that work</h2>
        <p>
          Relocating the retrospective narration to Calypso: the frame
          survives and one location is saved. Giving the Sirens&rsquo; song
          a content — that he does not truly want to go home — since Homer
          withholds it and something must be supplied, and since knowledge
          rather than seduction is what the Sirens actually offer
          (<em>Od.</em> 12.184&ndash;191). Circe reconceived as a woman
          transforming men from fear: the poem gives no motive at all, so
          this fills a silence rather than contradicting a statement.
          Compressing Telemachus&rsquo;s two hospitality visits into one.
        </p>

        <h2>18. Changes that weaken the poem</h2>
        <p>
          The bed test, for the reasons above. The lotus at Ogygia, which
          removes the refusal of immortality that is how the poem prices a
          homecoming — a drugged man is not refusing anything. The removal
          of the sexual relationships with Circe and Calypso, which tidies
          away the poem&rsquo;s own double standard and makes the execution
          of the maids in Book 22 less legible as the atrocity it is. And
          the loss of the <em>Outis</em> trick.
        </p>

        <h2>19. Artistic freedom versus source responsibility</h2>
        <p>
          We do not hold that fidelity is a virtue in itself. The tradition
          that produced the <em>Odyssey</em> reworked its material
          continuously, and the wooden horse most people picture comes from
          Virgil rather than Homer. A film is entitled to interpret.
        </p>
        <p>
          The responsibility is narrower and it is real: a production
          presenting itself as an adaptation of a specific ancient work owes
          its audience clarity about where it has departed, because most
          viewers will take what they see as what the poem says. That is not
          a demand for footnotes on screen. It is a reason for criticism to
          exist, and it is why this cluster keeps a ledger.
        </p>

        <h2>20. Verdict</h2>
        <p>
          A major film and a serious adaptation, better read and more
          formally intelligent than any previous screen <em>Odyssey</em>,
          which nonetheless resolves the poem&rsquo;s defining ambiguity and
          substitutes a familiar difficulty for an unfamiliar one.
        </p>
        <p>
          Homer&rsquo;s Odysseus endures twenty years to get his household
          back, and gets it, and the poem ends with a peace imposed by a
          goddess because the violence that recovered the house cannot
          settle the community. Nolan&rsquo;s earns his return and gives it
          away, and the film ends with the exile the poem does not impose.
        </p>
        <p>
          That is not a smaller ending. It is a different argument, made
          well, about a poem that was making another one.
        </p>
      </div>
    </FilmPageShell>
  );
}
