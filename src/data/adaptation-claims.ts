/**
 * The verified adaptation-claims ledger.
 *
 * This is the evidentiary spine of the film cluster. The rule the
 * cluster operates under is simple and absolute:
 *
 *   Every accusation the platform makes about the film departing from
 *   its source exists here first, with its evidence attached. Prose
 *   pages may summarise and argue; they may not assert a departure that
 *   is not in this registry.
 *
 * Rules for entries:
 *   - `filmClaim` states what the film does. It must be sourced from the
 *     completed film as reported by published accounts of it, never from
 *     trailers, promotional stills, casting announcements or social
 *     media.
 *   - `homericEvidence` must cite the poem by book and line where the
 *     comparison is to a specific passage.
 *   - `classification` is about the relation to the source, and
 *     `confidence` is about how well established the film claim itself
 *     is. They are independent: a change can be confidently established
 *     and mild, or poorly established and severe.
 *   - `confidence: "low"` entries must never be restated in prose as
 *     definitive.
 *   - Where a reading is contested, `competingReading` must be filled
 *     in, and the prose must carry it.
 *   - `editorialNote` is where judgement is allowed. It is kept separate
 *     from the evidence fields on purpose.
 */

import type { EvidenceLevel, SourceReference } from "./evidence";

export type ClaimCategory =
  | "plot"
  | "character"
  | "chronology"
  | "geography"
  | "religion"
  | "costume"
  | "material-culture"
  | "casting"
  | "dialogue"
  | "political-order";

export type ClaimClassification =
  /** Matches the source. */
  | "accurate"
  /** Not in the source but consistent with it. */
  | "plausible"
  /** A deliberate updating of the source's terms for a modern audience. */
  | "modernized"
  /** Specialists disagree about what the source supports here. */
  | "disputed"
  /** Not supported by the source; an addition or invention. */
  | "unsupported"
  /** The source states otherwise. */
  | "contradicted-by-source";

export interface AccuracyClaim {
  id: string;
  category: ClaimCategory;
  /** What the film does. */
  filmClaim: string;
  homericEvidence: SourceReference[];
  archaeologicalEvidence?: SourceReference[];
  classification: ClaimClassification;
  /** How well established the film claim is, not how severe it is. */
  confidence: "high" | "medium" | "low";
  /** Required where the classification rests on a contested reading. */
  competingReading?: string;
  /** Where a production rationale has been stated or is clearly
   *  inferable from the film's own logic. Never invented. */
  probableRationale?: string;
  /** Evidence level for the underlying source claim. */
  evidenceLevel: EvidenceLevel;
  editorialNote: string;
}

const OD = (locus: string, summary: string): SourceReference => ({
  work: "Odyssey",
  author: "Homer (attrib.)",
  locus,
  summary,
});

export const ADAPTATION_CLAIMS: ReadonlyArray<AccuracyClaim> = [
  {
    id: "phaeacians-omitted",
    category: "plot",
    filmClaim:
      "The Phaeacian episode is cut entirely. Odysseus leaves Calypso by raft and reaches Ithaca without the intervening stay on Scheria, and his retrospective account of the wanderings is given to Calypso rather than to the Phaeacian court.",
    homericEvidence: [
      OD(
        "5.263-6.331",
        "Odysseus sails from Ogygia, is wrecked by Poseidon, and is washed up on Scheria, where Nausicaa finds him.",
      ),
      OD(
        "7.1-8.586",
        "He is received by Alcinous and Arete, entertained, and asked his name only after Demodocus's songs have made him weep.",
      ),
      OD(
        "9.1-12.453",
        "The wanderings are narrated by Odysseus in the first person to the Phaeacian court.",
      ),
      OD(
        "13.70-125",
        "The Phaeacians convey him home asleep, and their ship is turned to stone by Poseidon for doing so.",
      ),
    ],
    classification: "contradicted-by-source",
    confidence: "high",
    probableRationale:
      "Compression. The Phaeacian sequence is a long stop with no combat, in a film already near three hours, and relocating the narration to Calypso preserves the retrospective structure with one fewer location.",
    evidenceLevel: "documented",
    editorialNote:
      "The most consequential single cut. It is defensible as compression and it is expensive: Scheria is the poem's model of hospitality performed perfectly, the counterweight to Polyphemus and to the suitors, and the place whose kindness is punished. Losing it thins the theme of xenia that the film otherwise takes seriously. Relocating the narration to Calypso is the intelligent half of the decision — the frame survives, and telling one's story to a captor is a defensible substitute for telling it to a host.",
  },
  {
    id: "bed-test-omitted",
    category: "plot",
    filmClaim:
      "The test of the marriage bed is not used as the recognition. Penelope embraces the wounded Odysseus after the killing without requiring proof.",
    homericEvidence: [
      OD(
        "23.173-206",
        "Penelope orders the bed moved out of the chamber; Odysseus reacts with anger and describes building it around a living olive trunk rooted in the ground. This is the recognition.",
      ),
    ],
    classification: "contradicted-by-source",
    confidence: "high",
    probableRationale:
      "The killing is made the emotional climax, and a further test after it would deflate the sequence.",
    evidenceLevel: "documented",
    editorialNote:
      "This is the change we regard as most damaging, and the reason is not fidelity for its own sake. The bed test is the only moment in the poem where anyone outmanoeuvres Odysseus, and the person who does it is his wife. Remove it and Penelope loses the demonstration of the intelligence the poem gives her, and the reunion becomes something that happens to her rather than something she establishes. The film's Penelope is strengthened elsewhere, which makes the loss of her best scene harder rather than easier to accept.",
  },
  {
    id: "laertes-omitted",
    category: "character",
    filmClaim: "Laertes does not appear.",
    homericEvidence: [
      OD(
        "24.205-360",
        "Odysseus finds his father in the orchard, tests him with a false story, and proves himself by the scar and by naming the trees Laertes gave him as a boy.",
      ),
      OD(
        "24.489-548",
        "Laertes, rejuvenated by Athena, kills Eupeithes; three generations stand together before Athena imposes peace.",
      ),
    ],
    classification: "contradicted-by-source",
    confidence: "high",
    probableRationale:
      "Book 24 runs past the reunion, and film endings rarely accommodate a second recognition after the emotional climax.",
    evidenceLevel: "documented",
    editorialNote:
      "Understandable and costly. With Laertes goes the poem's three-generation frame — the sense that an oikos is a thing persisting through time rather than a couple and a son. Note that Book 24's authenticity has been questioned since antiquity, which gives the cut a defence the other omissions do not have.",
  },
  {
    id: "ending-exile",
    category: "plot",
    filmClaim:
      "Odysseus cedes the throne to Telemachus and leaves Ithaca with Penelope, sailing west into exile.",
    homericEvidence: [
      OD(
        "23.248-284",
        "Odysseus tells Penelope of Tiresias's prophecy that he must travel again, inland, carrying an oar, and then return home to a gentle death in prosperous old age.",
      ),
      OD(
        "24.412-548",
        "The suitors' families arm; Athena stops the fighting and imposes oaths of peace. Odysseus remains king of Ithaca.",
      ),
      OD(
        "11.119-137",
        "Tiresias's prophecy in the underworld: the further journey with the oar, the sacrifice to Poseidon, and death from the sea in old age at home.",
      ),
    ],
    classification: "unsupported",
    confidence: "high",
    competingReading:
      "The film's ending is a legitimate extrapolation from Tiresias's prophecy of further travel, which Homer does place after the poem's end. What Homer does not do is make the travel a permanent exile, make it a punishment, transfer the kingship, or send Penelope.",
    probableRationale:
      "The film treats the killing of the suitors as a violation of the same divine law of hospitality the suitors broke, and makes exile the price. That is a coherent moral design and it is the film's own, not Homer's.",
    evidenceLevel: "documented",
    editorialNote:
      "The largest departure, and the most interesting. It is not arbitrary: it is an answer to a real problem in the poem, which is that killing a hundred and eight aristocrats creates a feud the poem can only end by divine fiat. Homer solves it with Athena; the film solves it by removing the killer. We regard this as a serious act of interpretation rather than a failure of nerve, and also as a change that alters what the poem is about. Homer's Odysseus endures twenty years to get his household back and gets it. The film's earns his return and then gives it away.",
  },
  {
    id: "calypso-lotus",
    category: "plot",
    filmClaim:
      "Calypso gives Odysseus the lotus flower, inducing forgetfulness, and the detention is framed as the easing of war trauma.",
    homericEvidence: [
      OD(
        "9.82-104",
        "The Lotus-Eaters are a separate and much earlier episode; the crew who eat the lotus lose the will to return and are dragged back to the ships. Odysseus does not eat it.",
      ),
      OD(
        "5.13-20",
        "Calypso detains Odysseus by her own power; there is no drug in the episode.",
      ),
      OD(
        "5.151-158",
        "Odysseus sits on the shore weeping, looking at the barren sea, his life draining away in longing for home.",
      ),
    ],
    classification: "modernized",
    confidence: "high",
    probableRationale:
      "Folding the Lotus-Eaters into Ogygia removes a redundant episode and gives Calypso a psychological rather than a merely magical hold.",
    evidenceLevel: "documented",
    editorialNote:
      "A genuine improvement in economy and a real change in meaning. Homer's Calypso offers immortality and is refused: the poem sets the price of homecoming at deathlessness, knowingly paid. A drugged Odysseus is not refusing anything, and the refusal is the point of the episode. The film gains a coherent account of why he stays seven years and loses the poem's central assertion about what being mortal is worth.",
  },
  {
    id: "gods-not-depicted",
    category: "religion",
    filmClaim:
      "The gods are not shown acting. Divine causation is handled through natural phenomena, through characters' fear of the gods, and through an ambiguous presentation of Athena connected with a Trojan priestess killed in the sack.",
    homericEvidence: [
      OD(
        "1.26-95",
        "The poem opens with a divine council in which Athena secures Zeus's agreement to Odysseus's return.",
      ),
      OD(
        "13.221-440",
        "Athena appears to Odysseus on Ithaca, reveals herself, laughs at his lying, and disguises him.",
      ),
      OD(
        "24.529-548",
        "Athena stops the fighting and imposes the oath of peace that ends the poem.",
      ),
    ],
    classification: "modernized",
    confidence: "high",
    competingReading:
      "Homeric gods characteristically act through a human faculty rather than around it — Athena puts strength or a thought into a person who then acts. A production that renders divine action as something felt from inside is arguably closer to the poem's double motivation than one that shows gods on clouds.",
    probableRationale:
      "The production is reported to have pursued a maximally realistic treatment of the mythological material, avoiding direct depiction of gods.",
    evidenceLevel: "documented",
    editorialNote:
      "Defensible in principle and hard in practice. The Odyssey's plot runs on Athena's advocacy and Poseidon's grievance; remove both as agents and the delay has no cause and the return no engine. Keeping Athena present but ambiguous is the intelligent compromise. Tying her to a woman killed during the sack converts the poem's goddess of practical intelligence into an emanation of the hero's guilt, which is a coherent modern reading and a substantial reduction of a figure the poem treats as an independent power with her own interests.",
  },
  {
    id: "maids-hanging-removed",
    category: "plot",
    filmClaim:
      "The mass hanging of the household women is not staged. Reported accounts indicate a single enslaved woman dies, and not on screen.",
    homericEvidence: [
      OD(
        "22.417-473",
        "Twelve women who had slept with the suitors are made to carry out the bodies and clean the hall, and are then hanged in a row by Telemachus, who refuses the clean death by sword his father ordered. The poem compares them to birds caught in a net.",
      ),
    ],
    classification: "contradicted-by-source",
    confidence: "medium",
    competingReading:
      "This is the poem's most disturbing passage and there is a serious argument that staging it would overwhelm a film's ending and be read as endorsement.",
    probableRationale:
      "Tonal control at the close, and reluctance to have the hero's restoration culminate in the execution of enslaved women.",
    evidenceLevel: "documented",
    editorialNote:
      "We record this as a departure and decline to call it a fault. Removing it makes the hero's victory cleaner than Homer's, which is a cost. Retaining it risks a sequence no framing could contain. What we would criticise is a production that removed it and then presented its ending as Homer's; this film, by making exile the price of the killing, at least keeps the poem's insistence that the violence is not free.",
  },
  {
    id: "sinon-imported",
    category: "character",
    filmClaim:
      "Sinon appears as a character, connected by the film to Antinous through an invented back-story about substituted military service.",
    homericEvidence: [
      OD(
        "8.499-520",
        "Demodocus sings the wooden horse; no Sinon appears in the account.",
      ),
      OD(
        "4.271-289",
        "Menelaus recalls the horse; again, no Sinon.",
      ),
      {
        work: "Aeneid",
        author: "Virgil",
        locus: "2.57-198",
        summary:
          "Sinon persuades the Trojans to bring the horse inside — the source of the character as later readers know him, roughly seven centuries after Homer.",
      },
    ],
    classification: "unsupported",
    confidence: "high",
    probableRationale:
      "Sinon supplies a human face for the deception of the horse, and linking him to Antinous ties the Trojan guilt to the Ithacan crisis.",
    evidenceLevel: "documented",
    editorialNote:
      "Importing from the wider tradition is not the same as invention, and it has excellent precedent — the tradition itself did nothing else. But the character is Virgilian, the connection to Antinous is entirely new, and audiences will attribute both to Homer. The invented back-story is the film's own moral architecture, not a recovery of anything.",
  },
  {
    id: "eumaeus-blind-tutor",
    category: "character",
    filmClaim:
      "Eumaeus is presented as blind and as Odysseus's former tutor.",
    homericEvidence: [
      OD(
        "14.1-533",
        "Eumaeus is a working swineherd who drives off his dogs, kills piglets, cooks, and sleeps outside with the animals under arms. Nothing indicates blindness.",
      ),
      OD(
        "15.403-484",
        "His own account of his origin: a king's son on Syrie, stolen by a Phoenician woman and sold to Laertes. He is a slave, not a tutor.",
      ),
      OD(
        "8.62-64",
        "The blind bard in the Odyssey is Demodocus, a Phaeacian singer — a different character and a different function.",
      ),
    ],
    classification: "unsupported",
    confidence: "medium",
    probableRationale:
      "Consolidating characters. A blind retainer who taught the hero folds the traditional bard-figure and the loyal servant into one role a film can carry.",
    evidenceLevel: "documented",
    editorialNote:
      "Two separate changes. The blindness appears to import the traditional attribute of the bard, which is a defensible piece of consolidation. Making him a tutor is the more significant alteration, because Homer's Eumaeus is a slave, and the poem uses his position — a man who says Zeus takes away half a man's worth on the day he is enslaved — to say something specific about the household it depicts. A tutor is a different social fact.",
  },
  {
    id: "circe-reinterpreted",
    category: "character",
    filmClaim:
      "Circe is presented as an isolated woman who transforms men out of fear for her own safety, with her magic framed as revealing what men already are.",
    homericEvidence: [
      OD(
        "10.210-347",
        "Circe drugs the scouting party and turns them to swine; they retain their human minds. Odysseus, protected by moly, threatens her with the sword and exacts an oath before accepting her hospitality.",
      ),
      OD(
        "10.467-574",
        "The company remains a year, and Circe then gives the instructions for the journey to the dead and for the Sirens and the strait.",
      ),
    ],
    classification: "modernized",
    confidence: "high",
    competingReading:
      "The poem gives no motive for the transformations at all, so a production supplying one is filling a silence rather than contradicting a statement. The reinterpretation also has a substantial modern literary lineage.",
    probableRationale:
      "A recognisable contemporary reading of the figure, and one that gives an episode with no stated motive a psychological centre.",
    evidenceLevel: "documented",
    editorialNote:
      "A change we regard as legitimate and well made. It is worth being clear that it is a change: the swine keep human minds and are restored by an ointment, so the poem's magic imposes a shape rather than exposing one. The reading is an interpretation with a literary pedigree, not a recovery of something in the Greek.",
  },
  {
    id: "outis-trick",
    category: "dialogue",
    filmClaim:
      "The Cyclops episode is reported as not turning on Odysseus's Nobody trick.",
    homericEvidence: [
      OD(
        "9.364-414",
        "Odysseus gives his name as Outis, Nobody; when the blinded Polyphemus calls for help, his neighbours hear that Nobody is killing him and go away. The Greek doubles the point: mē tis, no one, is a homophone of mētis, cunning intelligence.",
      ),
    ],
    classification: "contradicted-by-source",
    confidence: "medium",
    competingReading:
      "The wordplay is untranslatable. Every English-language version of the episode loses the mē tis / mētis resonance, and a film may reasonably conclude that a pun that does not work in the target language is not worth staging.",
    probableRationale:
      "Untranslatability, and a preference for physical over verbal problem-solving in an action sequence.",
    evidenceLevel: "documented",
    editorialNote:
      "The episode's point is that the hero escapes by intelligence rather than force, and specifically by a manipulation of language. Without it, the escape becomes a matter of nerve and luck, and the poem's clearest demonstration of what mētis is has no equivalent on screen. The untranslatability argument is real and covers the pun; it does not cover the trick, which works in English perfectly well.",
  },
  {
    id: "helen-clytemnestra-twins",
    category: "casting",
    filmClaim:
      "One performer plays both Helen and Clytemnestra, and the film presents them as twin sisters.",
    homericEvidence: [
      OD(
        "11.298-304",
        "The catalogue of heroines names Leda and her sons Castor and Polydeuces. It does not pair Helen with Clytemnestra, and neither Homeric poem presents them as twins.",
      ),
      {
        work: "Later mythographic tradition",
        summary:
          "The standard tradition makes Helen and Clytemnestra both daughters of Leda, but distributes paternity between Zeus and Tyndareus, and the pairings differ between sources. Calling them twins is a simplification the ancient genealogies do not consistently support.",
      },
    ],
    classification: "disputed",
    confidence: "medium",
    competingReading:
      "The sisterhood is standard and the doubling of related roles by one performer is a theatrical convention of long standing, used to make a thematic connection visible. The objection is to the specific genealogical claim, not to the doubling.",
    probableRationale:
      "Doubling makes the film's pairing of the two homecomings — Agamemnon's and Odysseus's — legible in a single face.",
    evidenceLevel: "disputed",
    editorialNote:
      "The doubling is good theatre and is the kind of device the material invites. The twinship is a tidying of genealogies that were never tidy. We record it as a minor simplification rather than a distortion, and note that the Homeric poems themselves are not consistent on the family of Leda.",
  },
  {
    id: "sea-peoples-framing",
    category: "plot",
    filmClaim:
      "The film frames the Greek sack of Troy as the origin of a wider collapse, presenting the raiders remembered as the Sea Peoples as Greeks who violated Zeus's law of hospitality.",
    homericEvidence: [
      OD(
        "9.39-61",
        "Odysseus sacks Ismarus on his way home and loses men when the crew will not leave — the poem's own picture of returning Greeks as raiders.",
      ),
      OD(
        "3.130-135",
        "Nestor describes Athena's anger at the Greeks after the sack, and the disastrous returns that followed.",
      ),
    ],
    archaeologicalEvidence: [
      {
        work: "Egyptian records",
        locus: "Medinet Habu and related inscriptions",
        summary:
          "Egyptian sources describe coalitions of raiders conventionally called the Sea Peoples in the late second millennium BCE. Their composition, origins and relationship to the Aegean are contested, and the causes of the Late Bronze Age collapse are not settled.",
      },
    ],
    classification: "unsupported",
    confidence: "medium",
    competingReading:
      "The poem does connect the sack of Troy with divine anger and with catastrophic returns, so the film is developing something present in the text rather than inventing a theme. What it adds is the specific historical identification.",
    probableRationale:
      "It gives the film a moral cosmology in which Odysseus's guilt has world-historical consequences, and supplies a reason for the exile ending.",
    evidenceLevel: "disputed",
    editorialNote:
      "This is where the film makes a historical claim rather than a literary one, and the claim is not established. Who the Sea Peoples were and what caused the Bronze Age collapse are open questions on which specialists disagree; identifying them with Homer's Achaeans is a speculative position, not a finding. As dramatic architecture it is powerful. As history it should not be repeated, and audiences will repeat it.",
  },
  {
    id: "athena-statue-desecration",
    category: "character",
    filmClaim:
      "Odysseus confesses guilt for the desecration of Athena's statue during the sack of Troy.",
    homericEvidence: [
      OD(
        "3.130-136",
        "Nestor attributes the Greeks' disastrous returns to Athena's anger at the army as a whole, without assigning the offence to a named individual.",
      ),
      {
        work: "Epic Cycle, Iliou Persis, and later tradition",
        summary:
          "The violation of Cassandra at Athena's altar and the disturbance of the Palladion are attributed to Ajax son of Oileus, the lesser Ajax — not to Odysseus. The tradition of the theft of the Palladion involves Odysseus and Diomedes, but that is a raid, not a desecration.",
      },
    ],
    classification: "unsupported",
    confidence: "medium",
    competingReading:
      "The Palladion tradition does place Odysseus in the temple of Athena at Troy, so the film may be compressing two related traditions rather than inventing one.",
    probableRationale:
      "Concentrating collective Greek guilt in the protagonist, which the film's moral design requires.",
    evidenceLevel: "documented",
    editorialNote:
      "The offence against Athena at Troy belongs, in the tradition, to Ajax the Lesser. Transferring it to Odysseus makes the hero responsible for the anger that delays him, which is dramatically economical and genealogically wrong. This is the clearest case in the film of a change that most viewers will take for Homer.",
  },
  {
    id: "no-greek-principals",
    category: "casting",
    filmClaim:
      "No Greek performer appears in the principal cast of a film adapting the foundational work of Greek literature, shot in part on location in Greece. The absence was reported and objected to publicly, including in Greece.",
    homericEvidence: [
      {
        work: "Not a source-fidelity question",
        summary:
          "Nothing in the poem bears on the nationality of performers. This is a claim about a production's relationship to a living culture, not about correspondence to a text, and is recorded as such.",
      },
    ],
    classification: "disputed",
    confidence: "medium",
    competingReading:
      "Casting an international ensemble in an English-language production is standard industry practice and implies nothing about the material. The counter-position is that a production drawing on a specific living culture's foundational text, and filming in that country, has a discretionary reason to include its performers, and that consistent absence across such productions is a pattern worth naming.",
    probableRationale:
      "Studio financing for a production at this budget is built on internationally bankable casting.",
    evidenceLevel: "documented",
    editorialNote:
      "Of the casting objections raised publicly, this is the one with an actual argument behind it, and it was made in Greece. It is not a claim that any performer was unsuitable, and it carries no implication about anyone's ancestry or capability. It is a claim about which people a large production chooses to include when it draws on their inheritance, and it is answerable by the production rather than by the audience.",
  },
];

export function claimsByCategory(category: ClaimCategory) {
  return ADAPTATION_CLAIMS.filter((c) => c.category === category);
}

export function getClaim(id: string) {
  return ADAPTATION_CLAIMS.find((c) => c.id === id);
}

export const CLASSIFICATION_LABEL: Record<ClaimClassification, string> = {
  accurate: "Accurate to the source",
  plausible: "Plausible extension",
  modernized: "Modernised",
  disputed: "Disputed",
  unsupported: "Unsupported by the source",
  "contradicted-by-source": "Contradicted by the source",
};

export const CATEGORY_LABEL: Record<ClaimCategory, string> = {
  plot: "Plot",
  character: "Character",
  chronology: "Chronology",
  geography: "Geography",
  religion: "Religion",
  costume: "Costume",
  "material-culture": "Material culture",
  casting: "Casting",
  dialogue: "Dialogue",
  "political-order": "Political order",
};
