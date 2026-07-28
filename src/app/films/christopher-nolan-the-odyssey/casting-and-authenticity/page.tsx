import type { Metadata } from "next";
import Link from "next/link";
import { FilmPageShell } from "@/components/editorial/FilmPageShell";
import { EvidenceKey } from "@/components/editorial/EvidenceBadge";
import { NOLAN_ODYSSEY } from "@/data/films";
import { buildMetadata } from "@/lib/seo";

const PATH = `/films/${NOLAN_ODYSSEY.slug}/casting-and-authenticity`;
const TITLE =
  "Casting the ancient world: source fidelity, artistic freedom and cultural context";
const DESCRIPTION =
  "What Homer actually says about how his characters look, why ancient identity does not map onto modern racial categories, and an individual assessment of the casting decisions in Christopher Nolan's The Odyssey.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  type: "article",
});

export default function CastingPage() {
  return (
    <FilmPageShell
      path={PATH}
      eyebrow="Casting"
      title={TITLE}
      description={DESCRIPTION}
      meta="Each decision assessed individually · no argument here turns on a performer's ancestry"
    >
      <div className="vp-prose">
        <h2>What this page is for, and what it refuses</h2>
        <p>
          Casting a culturally specific ancient work raises real questions
          about adaptation, and those questions are worth asking carefully.
          They are also the questions most reliably used as cover for
          something else, so it is worth saying at the outset what this page
          will and will not do.
        </p>
        <p>
          It will assess each decision on six grounds: source
          correspondence, character identity, genealogy, cultural location,
          production intent, and adaptation coherence.
        </p>
        <p>
          It will not argue that any performer is incapable of a role
          because of race, ancestry, nationality or sex. It will not make
          claims about anyone&rsquo;s ancestry. It will not generalise about
          any group of performers. And it will not use the vocabulary of
          replacement, invasion or contamination that attaches itself to
          this subject, because that vocabulary is not an argument and its
          presence is a reliable sign that no argument is being made.
        </p>
        <p>
          A performer can give a strong performance in a role whose casting
          logic is textually disputable. Those are separate judgements and
          this page keeps them separate.
        </p>

        <h2>Start with what the poem actually says</h2>
        <p>
          The first thing to establish is how much physical description
          Homer supplies, because most of this argument is conducted as
          though the answer were &ldquo;a great deal&rdquo;. It is not.
        </p>
        <p>
          Homer never describes Helen&rsquo;s appearance. The most famous
          statement of her beauty in the <em>Iliad</em> is an effect rather
          than a description: the old men on the wall watch her pass and
          agree it is no wonder men have fought so long — and then say she
          should go home. There is no hair colour, no complexion, no
          feature.
        </p>
        <p>
          Penelope is <em>periphrōn</em>, circumspect, far more often than
          she is anything visual. Telemachus is chiefly described by his
          resemblance to his father. The epithets that dominate Homeric
          characterisation are about capacity and lineage, not appearance.
        </p>
        <p>
          Odysseus is the exception, and the exception is instructive. At{" "}
          <em>Odyssey</em> 16.172&ndash;176 Athena restores him from beggar
          to himself, and the text describes his skin turning dark or tanned
          again and his beard darkening. At 6.230&ndash;231 and again at
          23.157&ndash;158 she makes his hair fall in a way the Greek
          compares to a hyacinth flower.
        </p>
        <p>
          Those lines are real and they are hard to use. The colour terms
          are contested; the hyacinth comparison is about the fall and
          texture of the hair and has been rendered by translators in
          radically different ways; and every one of the descriptions occurs
          at a moment of divine transformation rather than as a neutral
          statement of what the man looks like. Anyone who tells you these
          lines settle a modern casting argument in either direction is
          overreading them.
        </p>

        <h2>Ancient identity is not modern race</h2>
        <p>
          This is the substantive point and it cuts against confident
          positions on both sides.
        </p>
        <p>
          The Greeks had a strong sense of difference between themselves and
          others, and it was organised around language, custom, cult and
          political form rather than around skin colour or descent as
          modern racial taxonomy conceives them. The word{" "}
          <em>barbaros</em> is about speech. The categories that mattered
          were <em>polis</em>, <em>genos</em>, dialect, and which gods you
          sacrificed to.
        </p>
        <p>
          The Mediterranean of the epics is also mobile and connected. The{" "}
          <em>Odyssey</em> has Phoenician traders as a routine presence, has
          Menelaus wandering to Egypt and coming back rich, and mentions the
          Ethiopians as the people at the ends of the earth among whom
          Poseidon is feasting while the plot begins. It is not a
          homogeneous world and it does not present itself as one.
        </p>
        <p>
          Two conclusions follow, and both are uncomfortable for the people
          who most often argue about this.
        </p>
        <p>
          Projecting modern racial categories backwards onto Homeric society
          is an anachronism, and arguments that a character &ldquo;was
          white&rdquo; in a sense the Greeks would have recognised are
          asserting something the sources do not contain.
        </p>
        <p>
          And the reverse move is also unsound. Citing the ancient
          Mediterranean&rsquo;s diversity as though it licensed any casting
          whatever proves too much: the Greeks were a specific people with a
          specific language, religion and set of institutions, and the{" "}
          <em>Odyssey</em> is their poem about their gods and their
          household law. Cultural specificity is real even where racial
          categories are not.
        </p>

        <h2>Four kinds of casting, distinguished</h2>
        <p>
          <strong>Source-faithful casting</strong> tries to match
          descriptions the text supplies. For Homer this is a thin
          programme, because the text supplies almost none.
        </p>
        <p>
          <strong>Colour-blind casting</strong> treats appearance as
          irrelevant to the role and casts on performance. It has a long
          theatrical history and is the default in most stage practice.
        </p>
        <p>
          <strong>Colour-conscious casting</strong> treats appearance as
          meaningful and uses it deliberately — to make a thematic
          connection, to comment on the material, or to reconfigure who a
          story belongs to.
        </p>
        <p>
          <strong>Doubling</strong> is a distinct convention: one performer
          in two roles, to make a relationship visible. It is ancient
          practice — Greek theatre ran on it — and it is what the film does
          with Helen and Clytemnestra.
        </p>
        <p>
          These are different things and they warrant different responses. A
          production is entitled to any of them. What an audience is
          entitled to is enough clarity to know which one it is watching.
        </p>

        <h2>The decisions, individually</h2>

        <h3>Lupita Nyong&rsquo;o as Helen and Clytemnestra</h3>
        <p>
          Two decisions bundled together, and they should be separated.
        </p>
        <p>
          The doubling is good practice with excellent precedent. The two
          are sisters in the standard tradition, and the film&rsquo;s
          structure sets Agamemnon&rsquo;s catastrophic homecoming against
          Odysseus&rsquo;s — which is exactly what the poem does, invoking
          the Agamemnon story in Books 1, 3, 4, 11 and 24. Making that
          parallel visible in one face is a legitimate and intelligent
          device.
        </p>
        <p>
          The framing of them as twins is a separate matter and is a
          simplification. The genealogies of the children of Leda are
          contested in antiquity, with paternity distributed between Zeus
          and Tyndareus in ways that differ between sources. We record it as
          a minor tidying rather than a distortion.
        </p>
        <p>
          On the casting as such: Homer gives no physical description of
          Helen whatever, so there is no source description to depart from.
          The objection that would need to be made — that a character is
          defined by an appearance the film contradicts — has nothing to
          rest on in this case.
        </p>

        <h3>Zendaya as Athena</h3>
        <p>
          Athena is a goddess who in the poem appears as a Taphian
          nobleman, as Mentor, as a shepherd boy, as a girl with a pitcher,
          and as a bird. Her defining attribute is <em>glaukōpis</em>, a
          word about eyes whose meaning — bright-eyed, grey-eyed, owl-eyed —
          has been argued over for centuries. She does not have a fixed
          appearance in the text; changing appearance is what she does.
        </p>
        <p>
          The substantive question about this casting is therefore not who
          plays her but what the film does with her, and the film does
          something significant: it connects the goddess with a young
          Trojan priestess killed during the sack, making her presence
          readable as the hero&rsquo;s guilt. That is a real reduction of a
          figure the poem treats as an independent power with her own
          interests and her own amusement. It is a change of conception, not
          of appearance, and it is the criticism worth making here.
        </p>

        <h3>John Leguizamo as Eumaeus</h3>
        <p>
          The change that matters is not who plays him. It is that the film
          makes him blind and makes him Odysseus&rsquo;s former tutor.
        </p>
        <p>
          Homer&rsquo;s Eumaeus is a working swineherd who drives off dogs,
          kills piglets, cooks, and sleeps outside with the animals under
          arms. He is not blind — the blind figure in the <em>Odyssey</em>{" "}
          is Demodocus the bard. And he is a slave, bought by Laertes, who
          says of himself that Zeus takes away half a man&rsquo;s worth on
          the day he is enslaved.
        </p>
        <p>
          Turning a slave into a tutor is a change of social fact. The poem
          uses his position to say something specific about what the
          household it depicts is made of, and the tutor cannot carry it.
          This is a source-fidelity objection with real content, and it has
          nothing to do with the performer.
        </p>

        <h3>Elliot Page as Sinon</h3>
        <p>
          Sinon is not in Homer. He belongs to the Epic Cycle and, for
          nearly every reader who knows him, to <em>Aeneid</em> 2 — roughly
          seven centuries after Homer, and from the Trojan side.
        </p>
        <p>
          Importing from the wider tradition is not the same as invention
          and has the best possible precedent, since the tradition did
          nothing else. But audiences will attribute the character to Homer,
          and the film&rsquo;s invented connection between Sinon and
          Antinous is entirely new. The criticism is about the provenance of
          a character, not about casting.
        </p>

        <h3>The absence of Greek performers</h3>
        <p>
          This is the objection with an actual argument behind it, and it
          was raised in Greece: a film adapting the foundational work of
          Greek literature, shot in part on location in Greece, has no Greek
          performer in its principal cast.
        </p>
        <p>
          It is worth being precise about what this claim is and is not. It
          is not a claim that any performer was unsuitable. It is not a
          claim about anyone&rsquo;s ancestry. It does not imply that a role
          requires a particular descent to be played well.
        </p>
        <p>
          It is a claim about which people a large production chooses to
          include when it draws on their inheritance and films in their
          country. The standard answer — that international financing at
          this budget depends on internationally bankable casting — is
          honest and is an explanation rather than a justification. The
          objection is answerable by the production, and to our knowledge it
          has not been answered.
        </p>

        <h2>The core question, answered</h2>
        <p>
          When a production changes the visible ancestry or source-described
          appearance of a culturally specific character, is the change
          irrelevant, a legitimate theatrical convention, a deliberate
          reinterpretation, a contradiction of the source, a distortion of
          the cultural setting, or insufficiently explained?
        </p>
        <p>
          For this film, on the evidence, our answers are these.
        </p>
        <p>
          For Helen and for Athena the question does not arise as posed,
          because there is no source-described appearance to contradict.
          Homer does not supply one. The doubling of Helen and Clytemnestra
          is a legitimate theatrical convention.
        </p>
        <p>
          For Eumaeus there is a genuine source contradiction, and it
          concerns blindness and social status rather than appearance.
        </p>
        <p>
          For Sinon there is a provenance problem: a character imported from
          a later and different tradition and presented as part of Homer.
        </p>
        <p>
          For the absence of Greek performers there is a cultural-location
          argument that we regard as the strongest of the casting
          objections, and which is a matter of the production&rsquo;s
          relationship to a living culture rather than of fidelity to a
          text.
        </p>
        <p>
          What there is not, on the evidence available, is a case that the
          film contradicted Homer&rsquo;s descriptions of how anyone looks.
          That case gets made loudly and it does not survive contact with
          the poem, which barely describes anyone.
        </p>

        <h2>Why the distinction is worth defending</h2>
        <p>
          Precise criticism is stronger than loud criticism, and on this
          subject it is also the only kind that stays honest. The
          Eumaeus objection is real and checkable. The Sinon objection is
          real and checkable. The Greek-representation argument is real and
          is about a production&rsquo;s conduct. Each of those can be put to
          a film-maker and answered.
        </p>
        <p>
          An argument that a character was of a particular appearance
          because everyone knows they were cannot be put to anyone, because
          it rests on nothing. It is also the argument that most reliably
          turns into something uglier, and the reason this page states its
          limits at the top.
        </p>
        <p>
          The wider question of how studios handle culturally specific
          European material is taken up separately, with its counterarguments,
          at{" "}
          <Link href="/essays/hollywood-historical-casting-and-european-antiquity">
            When adaptation becomes replacement
          </Link>
          .
        </p>
      </div>

      <EvidenceKey className="mt-16" />
    </FilmPageShell>
  );
}
