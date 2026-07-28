/**
 * The Odyssey, book by book.
 *
 * A typed registry of the poem's twenty-four books, rendered by a single
 * template at /books/odyssey/[division]. The material is structured
 * rather than written as prose because it is genuinely structured: each
 * book has a summary, a cast, a set of places, a narrative function, the
 * Greek terms that matter in it, and its connections to the rest of the
 * poem. Holding that as data keeps the twenty-four pages consistent,
 * keeps the cross-references checkable, and means the shape of the poem
 * can be queried rather than only read.
 *
 * Editorial rules for this file:
 *   - Summaries describe what the transmitted text contains. They do not
 *     import material from the Epic Cycle, from Virgil, or from later
 *     mythography, all of which readers routinely mistake for Homer.
 *   - No modern translation is reproduced. Greek terms are transliterated
 *     and glossed; where a phrase is quoted it is short, in
 *     transliteration, and cited by book and line.
 *   - Line references follow the Greek. Translations vary in lineation.
 *   - `interpretation` is where the page is allowed to argue. It is kept
 *     separate from `summary`, which is not.
 */

export interface OdysseyGreekConcept {
  /** Transliterated Greek term. */
  term: string;
  /** Short editorial gloss. */
  gloss: string;
}

export interface OdysseyBook {
  /** 1-24. */
  number: number;
  /** Route segment: "book-1" … "book-24". */
  slug: string;
  /** The lower-case Greek letter conventionally used for Odyssey books
   *  (upper-case letters are the Iliad's). */
  letter: string;
  /** Editorial title. Deliberately our own descriptive wording rather
   *  than any published translation's set of book titles. */
  title: string;
  /** One-line description used for metadata and index listings. */
  standfirst: string;
  /** What happens, in the transmitted text. */
  summary: string[];
  characters: string[];
  places: string[];
  /** What the book does for the poem as a whole. */
  narrativeFunction: string;
  greekConcepts: OdysseyGreekConcept[];
  /** Connections to other books, by number. */
  connections: Array<{ books: number[]; note: string }>;
  /** Textual and source notes: transmission problems, disputed passages,
   *  what is and is not in Homer. */
  sourceNotes: string;
  /** Interpretation, marked as interpretation. */
  interpretation: string;
  /** Slugs into /themes. */
  themeRefs: string[];
  /** Slugs into /figures. */
  figureRefs: string[];
}

export const ODYSSEY_BOOKS: ReadonlyArray<OdysseyBook> = [
  {
    number: 1,
    slug: "book-1",
    letter: "α",
    title: "The gods decide, and a stranger comes to Ithaca",
    standfirst:
      "The proem, the divine assembly that sets the return in motion, and Athena's first intervention in the house of Odysseus.",
    summary: [
      "The poem opens by asking the Muse to tell of the man of many turns — polytropos — who wandered far after sacking the citadel of Troy, saw many cities and knew many minds, and could not save his companions, who destroyed themselves by eating the cattle of the Sun.",
      "On Olympus, with Poseidon away among the Ethiopians, Zeus opens the divine council by complaining that mortals blame the gods for sufferings they bring on themselves, citing Aegisthus, who was warned and took Agamemnon's wife and life anyway. Athena turns the argument to Odysseus, held on Calypso's island, and secures agreement that he shall return.",
      "Athena goes to Ithaca disguised as Mentes, a Taphian guest-friend. Telemachus receives her properly while the suitors feast in the hall. She advises him to call an assembly, to go to Pylos and Sparta for news of his father, and to consider how to kill the suitors if news comes that he is dead.",
      "The bard Phemius sings of the disastrous homecomings of the Achaeans. Penelope comes down and asks him to stop; Telemachus publicly overrules his mother and sends her back to her rooms. He then announces an assembly for the following day.",
    ],
    characters: [
      "Zeus",
      "Athena, disguised as Mentes",
      "Telemachus",
      "Penelope",
      "Phemius the bard",
      "Antinous and Eurymachus",
      "Eurycleia",
    ],
    places: ["Olympus", "Ithaca — the house of Odysseus"],
    narrativeFunction:
      "Establishes the crisis before establishing the hero. Odysseus is spoken about for an entire book before he appears, which places the audience in the position of the household: waiting for a man who may be dead.",
    greekConcepts: [
      {
        term: "polytropos",
        gloss:
          "'Of many turns.' The poem's first characterisation of Odysseus, and deliberately double-edged: widely travelled, or devious. Translators have never agreed.",
      },
      {
        term: "nostos",
        gloss:
          "Homecoming, and the whole class of stories about returns from Troy. The poem is one nostos told against the background of all the others.",
      },
      {
        term: "atasthaliai",
        gloss:
          "Reckless acts. Zeus's word for what mortals do to themselves before blaming the gods; it recurs for the crew's eating of the cattle of the Sun.",
      },
    ],
    connections: [
      {
        books: [11, 24],
        note: "Zeus's Aegisthus example is the poem's counter-model of homecoming; Agamemnon tells his side among the dead in 11 and again in 24.",
      },
      {
        books: [12],
        note: "The proem's mention of the cattle of the Sun previews the crew's destruction, narrated in Book 12.",
      },
      {
        books: [21, 22],
        note: "Athena's suggestion that Telemachus consider killing the suitors is the first statement of the poem's ending.",
      },
    ],
    sourceNotes:
      "The proem occupies 1.1-10. The opening phrase — andra moi ennepe, Mousa, polytropon — is among the most securely transmitted lines in Greek literature. Zeus's speech on human responsibility (1.32-43) is the poem's own statement about divine causation and is frequently cited in discussions of Homeric theology.",
    interpretation:
      "Opening with a divine assembly rather than with the hero has a specific effect: it frames the return as something already decided in principle and obstructed in practice. The poem is not asking whether Odysseus will get home. It is asking what condition he and his house will be in when he does.",
    themeRefs: [
      "homecoming-and-nostos",
      "divine-agency-in-homer",
      "household-and-political-order",
    ],
    figureRefs: ["odysseus", "athena", "telemachus", "penelope"],
  },
  {
    number: 2,
    slug: "book-2",
    letter: "β",
    title: "The assembly that fails",
    standfirst:
      "Ithaca's first public assembly in twenty years, the exposure of Penelope's trick with the shroud, and Telemachus's departure.",
    summary: [
      "Telemachus calls the assembly — the first since Odysseus sailed. He states his case: the suitors are consuming his house, and they should court his mother properly, at her father's house, with gifts.",
      "Antinous replies by blaming Penelope. He reveals the trick of the shroud: she told the suitors she would choose when she had finished a burial cloth for Laertes, and for three years unwove by night what she wove by day, until one of her women betrayed her.",
      "Zeus sends an omen of two eagles that tear at each other. The old seer Halitherses reads it as Odysseus's return; Eurymachus dismisses him. Telemachus asks for a ship. The assembly breaks up having decided nothing.",
      "Athena, now in the likeness of Mentor, arranges a ship and crew. Telemachus takes stores from the storeroom and swears Eurycleia to secrecy so that Penelope will not know he has gone. They sail at nightfall.",
    ],
    characters: [
      "Telemachus",
      "Antinous",
      "Eurymachus",
      "Halitherses",
      "Mentor",
      "Athena as Mentor",
      "Eurycleia",
    ],
    places: ["Ithaca — the place of assembly", "the harbour"],
    narrativeFunction:
      "Demonstrates that no lawful mechanism exists to resolve the crisis. Everything that happens in Book 22 follows from the failure of Book 2.",
    greekConcepts: [
      {
        term: "agorē",
        gloss:
          "The assembly, and the place of assembly. Its existence shows Ithaca has political institutions; its impotence here shows they do not function without a king.",
      },
      {
        term: "themis",
        gloss:
          "Established right, what is customarily due. The suitors' offence is framed as a breach of themis rather than of law in any codified sense.",
      },
      {
        term: "hedna",
        gloss:
          "Bridal gifts. Telemachus's complaint is procedural: courtship should involve gifts given at the bride's father's house, not consumption of the bridegroom's rival's estate.",
      },
    ],
    connections: [
      {
        books: [19, 24],
        note: "The shroud trick is told three times in the poem — here by Antinous, by Penelope herself in 19, and by the suitor Amphimedon among the dead in 24. The three accounts differ in emphasis.",
      },
      {
        books: [24],
        note: "Halitherses reappears at the final assembly, warning the suitors' families not to seek vengeance — and is again ignored.",
      },
    ],
    sourceNotes:
      "The three tellings of the shroud episode (2.93-110, 19.137-156, 24.128-146) are a standard test case in discussions of Homeric repetition and of how far the poem individualises its narrators.",
    interpretation:
      "The assembly is often read as evidence that Ithaca is lawless. The opposite is nearer: the institutions exist and are procedurally correct, and they still cannot act, because their authority derives from a king who is absent. This is the poem's political diagnosis, and it is what makes the massacre in Book 22 legible as restoration rather than as usurpation.",
    themeRefs: [
      "household-and-political-order",
      "kingship-in-the-odyssey",
      "cunning-and-metis",
    ],
    figureRefs: ["telemachus", "penelope", "athena"],
  },
  {
    number: 3,
    slug: "book-3",
    letter: "γ",
    title: "Nestor at Pylos",
    standfirst:
      "Sacrifice on the shore, an old man's account of the returns from Troy, and the first full statement of the Agamemnon paradigm.",
    summary: [
      "Telemachus and Athena-as-Mentor arrive at Pylos during a great sacrifice to Poseidon. They are received and fed before being asked who they are — the correct order.",
      "Nestor tells what he knows of the returns: the quarrel between Agamemnon and Menelaus, the scattering of the fleet, the deaths on the way home. He has no news of Odysseus.",
      "He tells at length the story of Agamemnon's murder by Aegisthus and Clytemnestra, and of Orestes' vengeance, holding Orestes up to Telemachus as an example.",
      "Athena departs in the form of a bird of prey, revealing her divinity to the household. Nestor sacrifices a heifer with gilded horns. Telemachus travels on to Sparta by chariot with Nestor's son Peisistratus.",
    ],
    characters: [
      "Nestor",
      "Telemachus",
      "Athena as Mentor",
      "Peisistratus son of Nestor",
    ],
    places: ["Pylos", "the road to Sparta", "Pherae"],
    narrativeFunction:
      "Supplies the background of the returns and installs the Agamemnon story as the pattern against which Odysseus's homecoming is measured throughout.",
    greekConcepts: [
      {
        term: "xenia",
        gloss:
          "Guest-friendship. Nestor's reception is a model performance: welcome, seat, food, and only then the question of identity.",
      },
      {
        term: "kleos",
        gloss:
          "Fame, what is heard of a man. Nestor tells Telemachus that Orestes won kleos by avenging his father — an instruction as much as a report.",
      },
    ],
    connections: [
      {
        books: [1, 4, 11, 24],
        note: "The Agamemnon story recurs in every part of the poem and is told by a different speaker each time, with different emphasis.",
      },
      {
        books: [4],
        note: "Telemachus's journey continues to Sparta; the two visits form a matched pair, an older world and a wealthier one.",
      },
    ],
    sourceNotes:
      "The house of Atreus material in the Odyssey is not the version familiar from Attic tragedy. In Homer, Aegisthus is the principal agent and Clytemnestra's role is smaller; Orestes' vengeance is unproblematic and no Furies pursue him. Aeschylus's Oresteia is a fifth-century reworking, not a source for Homer.",
    interpretation:
      "The Telemachy is sometimes dismissed as delay. Its function is comparative: the poem shows the young man two functioning households before returning him to his own broken one, and the contrast is the education. He learns almost nothing about his father and a great deal about what a household in order looks like.",
    themeRefs: ["hospitality-and-xenia", "homecoming-and-nostos", "loyalty-in-the-odyssey"],
    figureRefs: ["telemachus", "athena", "agamemnon", "clytemnestra"],
  },
  {
    number: 4,
    slug: "book-4",
    letter: "δ",
    title: "Menelaus and Helen at Sparta",
    standfirst:
      "Two rival memories of Troy, the drug that stops grief, the Old Man of the Sea, and an ambush prepared in Ithaca.",
    summary: [
      "Telemachus and Peisistratus arrive at Sparta during a double wedding feast. Menelaus receives them; Helen enters, recognises Telemachus by his likeness to his father, and the company weeps.",
      "Helen puts into the wine a drug from Egypt that quiets grief and anger, and tells a Troy story: Odysseus entered the city disguised as a beggar, and she alone recognised him and kept his secret. Menelaus tells another: Odysseus inside the wooden horse, holding the men silent when Helen walked around it calling out in the voices of their wives.",
      "Menelaus recounts being becalmed in Egypt and ambushing Proteus, the shape-changing Old Man of the Sea, to learn how to get home. From Proteus he learned that Ajax had drowned, Agamemnon had been murdered, and Odysseus was alive, held on an island by a nymph.",
      "The scene returns to Ithaca. The suitors discover Telemachus has gone and set an ambush in the strait. Penelope learns of both, and grieves; Athena sends a phantom in the likeness of her sister Iphthime to reassure her.",
    ],
    characters: [
      "Menelaus",
      "Helen",
      "Telemachus",
      "Peisistratus",
      "Proteus (in Menelaus's narrative)",
      "Antinous",
      "Penelope",
      "Medon the herald",
    ],
    places: ["Sparta", "Egypt and Pharos (in narrative)", "Ithaca"],
    narrativeFunction:
      "Confirms that Odysseus is alive, gives the audience its first outside view of him, and closes the Telemachy by returning the danger to Ithaca.",
    greekConcepts: [
      {
        term: "nēpenthes",
        gloss:
          "The 'no-grief' drug Helen mixes into the wine (4.220-221). It suspends mourning rather than healing it — a pointed detail in a poem about memory.",
      },
      {
        term: "dolos",
        gloss:
          "Trick, guile. Both Troy stories are stories of dolos, and both are told in the presence of the trickster's son.",
      },
    ],
    connections: [
      {
        books: [8],
        note: "Demodocus sings the wooden horse to Odysseus himself in Book 8; here Menelaus tells it to Odysseus's son. The poem never narrates it directly in its own voice.",
      },
      {
        books: [15],
        note: "Telemachus's departure from Sparta and the failed ambush are resolved in Book 15.",
      },
    ],
    sourceNotes:
      "The wooden horse is referred to at 4.271-289 and sung at 8.499-520; it is not narrated at length anywhere in Homer. The extended account familiar to most readers, including the character Sinon, belongs to the Epic Cycle and above all to Aeneid 2. See our page on the works attributed to Homer.",
    interpretation:
      "Helen and Menelaus tell incompatible stories, in the same room, minutes apart. Hers makes her Odysseus's secret ally inside Troy; his makes her the voice that nearly killed the men in the horse. The poem sets them side by side and declines to arbitrate. It is the clearest early example in European literature of a narrative that treats memory as contested rather than recoverable.",
    themeRefs: ["memory-and-storytelling", "hospitality-and-xenia", "women-in-the-odyssey"],
    figureRefs: ["menelaus", "helen-of-sparta", "telemachus", "penelope"],
  },
  {
    number: 5,
    slug: "book-5",
    letter: "ε",
    title: "Calypso, the raft, and the storm",
    standfirst:
      "The hero appears at last — weeping on a beach — and is released, wrecked, and washed ashore alive.",
    summary: [
      "A second divine assembly. Athena raises Odysseus again; Zeus sends Hermes to Ogygia to order Calypso to release him.",
      "Calypso protests that the gods resent goddesses who take mortal lovers, and complies. She finds Odysseus on the shore, weeping, looking at the sea, as he does every day. She offers him immortality if he stays; he answers that he knows Penelope is lesser in form and stature than a goddess, and that he wants his homecoming regardless.",
      "He builds a raft in four days with tools she provides, and sails on the fifth. For seventeen days he sails; on the eighteenth Poseidon, returning from the Ethiopians, sees him and raises a storm.",
      "The raft breaks up. The sea-goddess Ino-Leucothea gives him her veil to keep him afloat. After two days in the water he reaches the coast of Scheria, is nearly killed on the rocks, finds a river mouth, crawls ashore, and sleeps under a pile of leaves beneath two olive bushes.",
    ],
    characters: [
      "Odysseus",
      "Calypso",
      "Hermes",
      "Athena",
      "Zeus",
      "Poseidon",
      "Ino-Leucothea",
    ],
    places: ["Olympus", "Ogygia", "the open sea", "Scheria"],
    narrativeFunction:
      "Introduces the protagonist at his lowest point and establishes the terms of the poem's central choice: mortality with home against immortality without it.",
    greekConcepts: [
      {
        term: "nostos",
        gloss:
          "Homecoming. Book 5 defines it by making it cost something: Odysseus refuses deathlessness to have it.",
      },
      {
        term: "polytlas",
        gloss:
          "'Much-enduring.' Odysseus's other standing epithet, and the one Book 5 earns.",
      },
      {
        term: "athanatos",
        gloss:
          "Deathless. What Calypso offers and what is refused — the poem's clearest statement that being human is a condition worth keeping.",
      },
    ],
    connections: [
      {
        books: [1],
        note: "Fulfils the divine decision taken in Book 1; the repeated council is a structural marker of the poem's second movement.",
      },
      {
        books: [9],
        note: "Poseidon's hostility, active here, is explained retrospectively in Book 9 by the blinding of Polyphemus.",
      },
      {
        books: [23],
        note: "The choice of a mortal wife over an immortal one is answered at the end by the bed rooted in the ground.",
      },
    ],
    sourceNotes:
      "Calypso's complaint about the gods' double standard (5.118-129) is one of the poem's few explicit criticisms of divine behaviour placed in a divine mouth. Her name is built on the root of kalyptō, 'to conceal', which most readers hear as significant.",
    interpretation:
      "The situation is one of captivity. The poem says Calypso detained him and that he wept on the shore continually; it also says they slept together, in a formula that gives him no stated reluctance. Modern adaptations tend to resolve this tension in one direction or the other. The text does not resolve it, and a reading that erases either half is not reporting the poem.",
    themeRefs: ["homecoming-and-nostos", "exile-and-return", "divine-agency-in-homer"],
    figureRefs: ["odysseus", "calypso", "athena", "poseidon"],
  },
  {
    number: 6,
    slug: "book-6",
    letter: "ζ",
    title: "Nausicaa on the shore",
    standfirst:
      "A princess doing laundry, a naked stranger out of the bushes, and the most tactful speech in Greek epic.",
    summary: [
      "Athena, in a dream, prompts Nausicaa, daughter of King Alcinous, to take the household washing to the river — putting marriage in her mind as the reason.",
      "The girls wash, eat, and play at ball. A shout wakes Odysseus, naked, salt-encrusted and terrifying. He breaks a branch to cover himself and comes out.",
      "He supplicates Nausicaa without touching her knees — judging that to grasp them would offend — and with a speech that compares her to Artemis, and then to a young palm shoot he once saw at Delos, before asking only for clothing and directions.",
      "She has him washed and dressed, feeds him, and gives directions to the city. She tells him not to walk in with her, because of what people would say, and instructs him to go to the palace and supplicate her mother Arete rather than her father.",
    ],
    characters: ["Odysseus", "Nausicaa", "Athena", "the attendant women"],
    places: ["Scheria — the river mouth and the road to the city"],
    narrativeFunction:
      "Begins Odysseus's re-entry into human society, and does it through the most exposed possible position: naked, nameless, dependent on a stranger's judgement.",
    greekConcepts: [
      {
        term: "hiketēs",
        gloss:
          "Suppliant. A protected status under Zeus. Odysseus's decision to supplicate with words rather than by grasping her knees is a calculation about how to invoke it.",
      },
      {
        term: "aidōs",
        gloss:
          "Shame, respect, the sense of what is fitting. Nausicaa's instruction not to be seen walking with him is aidōs operating as social constraint on a woman of standing.",
      },
    ],
    connections: [
      {
        books: [7, 8],
        note: "Nausicaa's advice to appeal to Arete rather than Alcinous determines the whole of Book 7.",
      },
      {
        books: [5],
        note: "The contrast with Calypso is deliberate: an immortal who offered everything and a girl who offers clothes and directions, of whom only the second gets him home.",
      },
    ],
    sourceNotes:
      "The palm-shoot simile (6.162-167) refers to Delos, the sanctuary island of Apollo, and is one of the poem's rare references to a specific cult site. Nausicaa's marriage prospects are raised repeatedly and never resolved; the poem does not pair them, and the Cycle's traditions on the subject are later.",
    interpretation:
      "The speech is a piece of rhetorical engineering and the poem expects the reader to notice. He is naked, filthy and frightening; the situation is one in which a wrong word means the girls flee and he dies of exposure. He solves it by flattery so exact that it does not read as flattery. This is mētis operating in a domestic register, and it is the same faculty that empties the Cyclops's cave.",
    themeRefs: ["hospitality-and-xenia", "cunning-and-metis", "women-in-the-odyssey"],
    figureRefs: ["odysseus", "nausicaa", "athena"],
  },
  {
    number: 7,
    slug: "book-7",
    letter: "η",
    title: "The palace of Alcinous",
    standfirst:
      "The perfect household, the supplication of a queen, and the first stage of a story told to strangers.",
    summary: [
      "Athena, disguised as a girl carrying a pitcher, guides Odysseus into the city under a protective mist and warns him that the Phaeacians are not welcoming to outsiders.",
      "The palace is described at length: bronze walls, golden doors, gold and silver dogs made by Hephaestus, an orchard where fruit never fails in any season.",
      "Odysseus enters, the mist dissolves, and he supplicates Arete at the hearth. The court sits in silence until an elder rebukes them for leaving a suppliant on the ground.",
      "Arete recognises the clothes she made. Odysseus accounts for them, tells of Calypso and of his voyage and shipwreck, but does not give his name. Alcinous offers him his daughter and a home, and promises conveyance whatever he chooses.",
    ],
    characters: ["Odysseus", "Arete", "Alcinous", "Athena", "Echeneus the elder"],
    places: ["Scheria — the city and the palace of Alcinous"],
    narrativeFunction:
      "Establishes the Phaeacians as the poem's benchmark of hospitality, against which every other reception in the poem is measured.",
    greekConcepts: [
      {
        term: "xenia",
        gloss:
          "Guest-friendship performed correctly and completely, including conveyance home — the pompē that the Phaeacians uniquely provide.",
      },
      {
        term: "pompē",
        gloss:
          "Escort, conveyance. The specific Phaeacian gift, and the one that finally ends the wandering.",
      },
    ],
    connections: [
      {
        books: [9, 10, 11, 12],
        note: "The Phaeacian court is the audience for the entire first-person narrative of the wanderings.",
      },
      {
        books: [13],
        note: "Their conveyance of Odysseus draws Poseidon's anger and their ship is turned to stone on its return.",
      },
    ],
    sourceNotes:
      "Arete's unusual prominence — a queen supplicated in preference to the king — has been discussed since antiquity and has no clear parallel elsewhere in Homer.",
    interpretation:
      "Scheria is a utopia with an edge. The Phaeacians are hospitable to a fault, rich beyond ordinary measure, and under a standing prophecy that their conveyance of strangers will one day be punished. The poem gives its ideal of hospitality a cost, and then charges it.",
    themeRefs: ["hospitality-and-xenia", "kingship-in-the-odyssey"],
    figureRefs: ["odysseus", "athena", "nausicaa"],
  },
  {
    number: 8,
    slug: "book-8",
    letter: "θ",
    title: "The bard, the games, and the man who wept",
    standfirst:
      "Three songs by a blind poet, an athletic contest, and the moment the stranger's tears give him away.",
    summary: [
      "At an assembly Alcinous arranges entertainment for the unnamed guest. The blind bard Demodocus sings of a quarrel between Odysseus and Achilles. Odysseus covers his head and weeps; only Alcinous notices.",
      "Games follow. A young Phaeacian, Euryalus, taunts the stranger as a merchant rather than an athlete. Odysseus throws the discus far beyond the rest and delivers an angry speech about the difference between looks and speech.",
      "Demodocus sings a second song, the comic tale of Ares and Aphrodite caught in Hephaestus's net.",
      "Odysseus asks for a third: the wooden horse. Demodocus sings it, and Odysseus weeps again. The poem compares him to a woman clinging to her husband's body on a battlefield as she is beaten and led away into slavery. Alcinous stops the song and asks his guest, at last, who he is.",
    ],
    characters: [
      "Odysseus",
      "Demodocus",
      "Alcinous",
      "Euryalus",
      "Arete",
      "Laodamas",
    ],
    places: ["Scheria — the assembly ground and the palace hall"],
    narrativeFunction:
      "Forces the revelation of identity by making the hero the audience of his own legend, and supplies the poem's own account of what poetry does.",
    greekConcepts: [
      {
        term: "aoidos",
        gloss:
          "Bard, singer. Demodocus is a professional with a fixed social place, honoured and dependent; the poem's self-portrait, insofar as it has one.",
      },
      {
        term: "kleos",
        gloss:
          "Fame as something heard. Book 8 shows kleos arriving at its subject, and it is unbearable.",
      },
    ],
    connections: [
      {
        books: [4],
        note: "The wooden horse is told here to Odysseus and in Book 4 to his son; the poem never narrates it directly.",
      },
      {
        books: [9],
        note: "Alcinous's question at the end of Book 8 is answered by the opening of Book 9 — 'I am Odysseus.'",
      },
      {
        books: [1],
        note: "Phemius on Ithaca and Demodocus here are a matched pair: two bards, one singing under duress, one honoured.",
      },
    ],
    sourceNotes:
      "The quarrel of Odysseus and Achilles sung at 8.72-82 is not an episode we possess; it is either lost tradition or invented for the moment. The Ares and Aphrodite song (8.266-366) has been suspected as an interpolation since antiquity, largely on grounds of tone.",
    interpretation:
      "The widow simile at 8.523-531 is the most morally serious thing in the poem. The sacker of cities weeps at the song of his own greatest triumph, and the poem finds its image for his grief in the person his triumph destroyed. The comparison is not decoration. It is the poem taking the measure of its own hero's fame from the far side.",
    themeRefs: ["memory-and-storytelling", "violence-and-restoration", "hospitality-and-xenia"],
    figureRefs: ["odysseus"],
  },
  {
    number: 9,
    slug: "book-9",
    letter: "ι",
    title: "The Cicones, the Lotus, and the Cyclops",
    standfirst:
      "Odysseus begins to tell his own story: a sack, a drug, and a cave with a stone across the door.",
    summary: [
      "He names himself, and his home, and begins. From Troy the wind took them to Ismarus, city of the Cicones, which they sacked; his men refused to leave and the Cicones' inland kinsmen counter-attacked, killing six from each ship.",
      "A storm drives them past Cythera to the land of the Lotus-Eaters, whose food removes the desire to return. He drags the affected men back to the ships weeping and binds them under the benches.",
      "They reach the land of the Cyclopes. Odysseus takes twelve men to a cave, against advice, wanting to see what its owner will give. Polyphemus returns, seals the cave with a stone, and eats two men; he asks the guest-gift question and answers it himself by promising to eat 'Nobody' last.",
      "Odysseus gives his name as Outis, 'Nobody', gets the Cyclops drunk on strong wine, and blinds him with a sharpened olive stake. The neighbouring Cyclopes, hearing that Nobody is killing him, go away. The men escape under the bellies of the rams. From the ship, against his crew's pleading, Odysseus shouts his true name and patronymic, and Polyphemus prays to his father Poseidon for vengeance.",
    ],
    characters: ["Odysseus", "Polyphemus", "Alcinous and the Phaeacian court as audience"],
    places: [
      "Ismarus, city of the Cicones",
      "the land of the Lotus-Eaters",
      "the land of the Cyclopes",
    ],
    narrativeFunction:
      "Supplies the cause of Poseidon's hostility and therefore of the entire remaining wandering, and demonstrates in a single episode both the hero's cunning and the flaw that undoes it.",
    greekConcepts: [
      {
        term: "mētis",
        gloss:
          "Cunning intelligence. The Outis pun is mētis in its purest form: the trick is entirely linguistic, and the Greek for 'nobody' and for 'cunning' are near neighbours in sound.",
      },
      {
        term: "xenia",
        gloss:
          "Hospitality, here inverted. Polyphemus asks for no news, offers no food, and makes his guest-gift the order of eating.",
      },
      {
        term: "themis",
        gloss:
          "The Cyclopes are introduced as people without assemblies, without law-courts, and without established right — the poem's definition of savagery is political rather than physical.",
      },
    ],
    connections: [
      {
        books: [5],
        note: "Explains retrospectively why Poseidon has been pursuing him since Book 5.",
      },
      {
        books: [11],
        note: "Tiresias's prophecy is framed as the working-out of Polyphemus's curse.",
      },
      {
        books: [12],
        note: "The pattern of crew disobedience begun at Ismarus culminates at Thrinacia.",
      },
    ],
    sourceNotes:
      "Book 9 is where the poem's narration changes hands: everything from 9.39 to the end of Book 12 is Odysseus speaking. The Outis/mē tis wordplay is untranslatable and is the reason the episode is usually thinner in any other language, including English.",
    interpretation:
      "The taunt at the end is the hinge of the poem. Having escaped by making himself nameless, Odysseus cannot bear to leave without his name attached to the feat — and giving his name is precisely what allows the curse to find him. The poem's hero is undone by the desire for kleos operating against the intelligence that had just saved him. This is characterisation of a very high order, and no adaptation that drops the Outis trick can reproduce it.",
    themeRefs: ["cunning-and-metis", "hospitality-and-xenia", "identity-and-recognition"],
    figureRefs: ["odysseus", "polyphemus", "poseidon"],
  },
  {
    number: 10,
    slug: "book-10",
    letter: "κ",
    title: "Aeolus, the Laestrygonians, and Circe",
    standfirst:
      "A bag of winds opened within sight of home, the destruction of eleven ships, and a year on an enchantress's island.",
    summary: [
      "Aeolus, keeper of the winds, entertains them a month and gives Odysseus a bag containing all the winds but the west. Within sight of Ithaca, with Odysseus asleep, the crew open it believing it holds treasure. They are blown back. Aeolus refuses them a second time, judging them hated by the gods.",
      "At the harbour of the Laestrygonians, giants destroy eleven of the twelve ships with boulders and spear the men like fish. Only Odysseus's ship, moored outside, escapes.",
      "On Aeaea, a scouting party under Eurylochus reaches Circe's house. She drugs them and turns them into swine; Eurylochus escapes to report. Hermes meets Odysseus and gives him the herb moly as a counter-drug and instructions.",
      "Odysseus resists the drug, threatens Circe with his sword, and exacts an oath. The men are restored. They stay a year, until the crew urge departure. Circe tells Odysseus he must first go to the house of Hades to consult the shade of the seer Tiresias. Elpenor, the youngest, falls from the roof and dies as they leave.",
    ],
    characters: [
      "Odysseus",
      "Aeolus",
      "Eurylochus",
      "Circe",
      "Hermes",
      "Elpenor",
    ],
    places: ["Aeolia", "Telepylus of the Laestrygonians", "Aeaea"],
    narrativeFunction:
      "Reduces the expedition from twelve ships to one and then from many men to few, and sets up the journey to the dead.",
    greekConcepts: [
      {
        term: "pharmakon",
        gloss:
          "Drug — both poison and remedy. Circe's is transformative; moly is the counter-drug; the Lotus was another. The poem thinks repeatedly about substances that alter the will.",
      },
      {
        term: "moly",
        gloss:
          "The plant Hermes gives, black at the root and white in flower, hard for mortals to dig — the poem's own note that this is not an ordinary herb.",
      },
    ],
    connections: [
      {
        books: [9],
        note: "The crew's opening of the bag repeats the Ciconian pattern: disaster caused by the men's appetite while their leader is inattentive.",
      },
      {
        books: [11, 12],
        note: "Circe both sends Odysseus to the dead and, on his return, gives the sailing directions for the Sirens, Scylla and Thrinacia.",
      },
    ],
    sourceNotes:
      "Circe is described as the daughter of Helios and sister of Aeëtes (10.135-139), which places her in the Argonautic family. The Odyssey knows the Argo story and refers to it at 12.69-72. Her later literary life — including the Telegonus tradition, in which she bears Odysseus a son who eventually kills him — belongs to the Epic Cycle, not to this poem.",
    interpretation:
      "The Circe episode is where the poem is furthest from modern moral intuitions and most often quietly rewritten. Odysseus draws a sword on her, she offers her bed, he requires an oath before accepting, and they then live together for a year while his men wait. The oath is the poem's device for making the arrangement safe rather than consensual in any modern sense. Retellings that turn her into a straightforward victim, or into a straightforward temptress, are each taking one half of a text that contains both.",
    themeRefs: ["cunning-and-metis", "women-in-the-odyssey", "divine-agency-in-homer"],
    figureRefs: ["odysseus", "circe"],
  },
  {
    number: 11,
    slug: "book-11",
    letter: "λ",
    title: "The book of the dead",
    standfirst:
      "At the edge of the world, a trench of blood, a prophecy, and the shades of a mother, a king, and the greatest of the Achaeans.",
    summary: [
      "They sail to the stream of Ocean and the land of the Cimmerians, where the sun never shines. Odysseus digs a trench, pours offerings, and cuts the throats of sheep; the dead gather to the blood.",
      "Elpenor comes first, unburied, and begs for a proper burial and a marked grave. Tiresias then prophesies: they may still reach home if they leave the cattle of the Sun untouched at Thrinacia; if not, all the crew will die and Odysseus will come home late, in another's ship, to find trouble in his house. Afterwards he must travel inland carrying an oar until he meets people who take it for a winnowing fan, sacrifice to Poseidon there, and return; death will come to him from the sea, gently, in a prosperous old age.",
      "His mother Anticleia tells him she died of longing for him, and that his father Laertes has withdrawn to the country. He tries three times to embrace her and she passes through his arms. A catalogue of famous women follows.",
      "The narrative pauses; Alcinous urges him on. Agamemnon describes his murder and warns him to come home in secret. Achilles says he would rather be a hired labourer to a landless man than king over all the dead, and asks after his son. Ajax refuses to speak and walks away. Odysseus sees Minos judging, and Tityus, Tantalus, Sisyphus, and the phantom of Heracles, before fear drives him back to the ship.",
    ],
    characters: [
      "Odysseus",
      "Tiresias",
      "Anticleia",
      "Elpenor",
      "Agamemnon",
      "Achilles",
      "Ajax",
      "Heracles",
    ],
    places: ["the stream of Ocean", "the land of the Cimmerians", "the house of Hades"],
    narrativeFunction:
      "The structural centre of the poem. It supplies the prophecy that governs the rest of the plot, the warning that determines how Odysseus returns, and the poem's judgement on the heroic ideal of the Iliad.",
    greekConcepts: [
      {
        term: "nekyia",
        gloss:
          "The rite of summoning and questioning the dead — the traditional name for this book.",
      },
      {
        term: "psychē",
        gloss:
          "The shade that survives death: witless without blood, and unable to be embraced. Homeric afterlife is not reward or punishment for most of the dead; it is diminishment.",
      },
      {
        term: "kleos",
        gloss:
          "Achilles's speech is the poem's direct challenge to the Iliad's central value: fame is worth less than being alive.",
      },
    ],
    connections: [
      {
        books: [12],
        note: "Tiresias's warning about the cattle of the Sun is disregarded in Book 12, exactly as prophesied.",
      },
      {
        books: [13, 16],
        note: "Agamemnon's advice to return secretly is why Odysseus lands disguised and tests his own household.",
      },
      {
        books: [23, 24],
        note: "The prophecy of further travel is repeated to Penelope in Book 23; the reunion with Laertes in Book 24 answers Anticleia's report here.",
      },
    ],
    sourceNotes:
      "Book 11 has been suspected of expansion since antiquity, particularly the catalogue of heroines and the closing procession of Minos, Tityus, Tantalus and Sisyphus, which sits awkwardly with the framing device of shades drawn to blood. The dead do not go to a place of judgement in the main narrative; the punishments described near the end imply a different conception. We report the inconsistency rather than smoothing it.",
    interpretation:
      "The most important line in the poem for its relation to the Iliad is Achilles's. The man who chose a short life with undying fame says, from the other side, that he chose wrong. The Odyssey is in that moment arguing with the poem it grew out of, and taking the side of survival, household and return.",
    themeRefs: ["memory-and-storytelling", "homecoming-and-nostos", "divine-agency-in-homer"],
    figureRefs: ["odysseus", "anticleia", "agamemnon", "clytemnestra"],
  },
  {
    number: 12,
    slug: "book-12",
    letter: "μ",
    title: "The Sirens, the strait, and the cattle of the Sun",
    standfirst:
      "The last of the wanderings: a song that must not be obeyed, a choice between two disasters, and the destruction of the crew.",
    summary: [
      "They return to Aeaea, bury Elpenor, and receive Circe's sailing instructions.",
      "At the Sirens, Odysseus plugs the crew's ears with wax and has himself bound to the mast, so that he alone hears. What the Sirens promise is knowledge — they claim to know everything that happened at Troy and everything that happens on earth.",
      "Circe has offered a choice between the Wandering Rocks and the strait of Scylla and Charybdis. Odysseus takes the strait, and on Circe's explicit advice does not tell the crew about Scylla. Six men are taken, calling his name; he says it was the most pitiful thing he saw.",
      "At Thrinacia the crew swear not to touch the cattle of the Sun. Contrary winds hold them a month and the food runs out. While Odysseus sleeps, Eurylochus persuades the men to kill the cattle. Helios demands justice from Zeus; when they sail, the ship is destroyed by a thunderbolt and all the crew drown. Odysseus, clinging to the keel and mast, is carried back to Charybdis and survives by hanging from a fig tree until the wreckage is disgorged. Nine days later he reaches Ogygia. The tale ends, and the poem returns to the Phaeacian hall.",
    ],
    characters: ["Odysseus", "Circe", "the Sirens", "Scylla", "Charybdis", "Eurylochus", "Helios"],
    places: ["Aeaea", "the Sirens' island", "the strait", "Thrinacia", "Ogygia"],
    narrativeFunction:
      "Closes the first-person narrative and returns the poem to its present, with the hero alone and the crew accounted for.",
    greekConcepts: [
      {
        term: "atasthaliai",
        gloss:
          "Reckless acts — the word from the proem, discharged here. The poem's opening promise that the men destroyed themselves is kept in Book 12.",
      },
      {
        term: "nostos",
        gloss:
          "Homecoming, achieved by exactly one man. The poem is precise about the cost of the return it celebrates.",
      },
    ],
    connections: [
      {
        books: [1],
        note: "Completes the proem's statement that Odysseus could not save his companions, who perished by their own recklessness.",
      },
      {
        books: [11],
        note: "Tiresias's prophecy is fulfilled in every particular.",
      },
      {
        books: [9],
        note: "The crew's disobedience closes an arc that began at Ismarus.",
      },
    ],
    sourceNotes:
      "The Sirens are two in Homer, not the later canonical three, and are not described physically at all; the bird-bodied iconography comes from later art. What they offer is knowledge rather than sexual temptation — a distinction almost universally lost in modern retellings.",
    interpretation:
      "The Scylla passage is the poem's hardest test of its hero. Circe tells him to accept losing six men rather than lose the ship; he does; and he concealed the danger from the men who were about to die. The poem lets him call it the most pitiful sight of all his sufferings, and does not indicate that he was wrong. Leadership in the Odyssey involves knowingly spending people, and the poem neither hides this nor condemns it.",
    themeRefs: ["cunning-and-metis", "violence-and-restoration", "homecoming-and-nostos"],
    figureRefs: ["odysseus", "circe"],
  },
  {
    number: 13,
    slug: "book-13",
    letter: "ν",
    title: "Ithaca at last, and unrecognised",
    standfirst:
      "The Phaeacians pay for their kindness, the hero lands asleep on his own shore, and lies to the goddess who made him.",
    summary: [
      "The Phaeacians load gifts and convey Odysseus home overnight in their supernaturally fast ship. He sleeps the whole way and is laid still sleeping on the beach at the harbour of Phorcys with his treasure beside him.",
      "Poseidon complains to Zeus that his honour is diminished. With Zeus's agreement he turns the returning Phaeacian ship to stone in sight of its own harbour. Alcinous recalls the old prophecy and orders sacrifices.",
      "Odysseus wakes and does not recognise Ithaca; Athena has poured a mist over it. He believes the Phaeacians have cheated him and counts his tripods.",
      "Athena appears as a young shepherd and names the island. Odysseus immediately invents a false life story — a Cretan who killed a man and fled. She changes into a woman, touches him, and laughs: neither of them can outdo the other in guile. She reveals herself, explains her absence, helps him hide the treasure in the cave of the nymphs, and disguises him as a ragged old beggar. She sends him to Eumaeus and goes to fetch Telemachus from Sparta.",
    ],
    characters: ["Odysseus", "Athena", "Poseidon", "Zeus", "Alcinous"],
    places: ["the sea", "Scheria", "Ithaca — the harbour of Phorcys and the cave of the nymphs"],
    narrativeFunction:
      "Turns the poem from wandering to homecoming, and establishes the disguise that governs the next nine books.",
    greekConcepts: [
      {
        term: "dolos",
        gloss:
          "Guile. Athena's praise of Odysseus for lying to her face is the poem's clearest statement that deception is a virtue in its hero, not a flaw.",
      },
      {
        term: "timē",
        gloss:
          "Honour as due standing. Poseidon's objection is not that Odysseus escaped but that his own timē among gods and men is reduced.",
      },
    ],
    connections: [
      {
        books: [11],
        note: "Landing in secret and testing the household follows Agamemnon's advice in the underworld.",
      },
      {
        books: [14, 19, 24],
        note: "The Cretan lie told here is the first of a series; Odysseus tells versions of it to Eumaeus, to Penelope, and finally to his own father.",
      },
      {
        books: [7, 8],
        note: "The petrified ship is the price of Phaeacian hospitality, foreshadowed in Book 8.",
      },
    ],
    sourceNotes:
      "The fate of the Phaeacian city is left unresolved: the prophecy includes a mountain closing over the city, and the poem does not say whether Zeus permits it. Ancient and modern readers have both noticed the poem's reluctance to finish the sentence.",
    interpretation:
      "The scene between Odysseus and Athena is the warmest in the poem and it consists of two liars enjoying each other. She does not rebuke him for the false story; she is delighted by it. Any reading that treats Odysseus's deceptions as a moral problem the poem wants solved has to explain why his patron goddess finds them charming.",
    themeRefs: ["identity-and-recognition", "cunning-and-metis", "divine-agency-in-homer"],
    figureRefs: ["odysseus", "athena", "poseidon"],
  },
  {
    number: 14,
    slug: "book-14",
    letter: "ξ",
    title: "The swineherd's hut",
    standfirst:
      "The poorest household in the poem performs hospitality better than the richest, and the beggar tells a magnificent lie.",
    summary: [
      "Odysseus, disguised, comes to the farmstead of Eumaeus the swineherd. The dogs attack him; Eumaeus drives them off, brings him in, seats him on brushwood and a goatskin, and kills two piglets to feed him — apologising that the good animals go to the suitors.",
      "Eumaeus denounces the suitors, praises his absent master, and says he no longer believes the reports of travellers who claim news of Odysseus, having been deceived before by an Aetolian.",
      "Odysseus tells a long false story: a Cretan, illegitimate son of a rich man, a soldier at Troy, a raider in Egypt, enslaved, escaped, and lately hearing that Odysseus is alive among the Thesprotians. Eumaeus takes the news as another lie but the guest as genuine.",
      "To get a cloak for the cold night, Odysseus tells a second story, about a trick played at Troy to obtain a cloak. Eumaeus, understanding the request, lends him one, then goes out to sleep among the pigs with his sword and spear.",
    ],
    characters: ["Odysseus", "Eumaeus"],
    places: ["Ithaca — the pig farm"],
    narrativeFunction:
      "Establishes the loyal household from below, and sets the poem's standard of hospitality at the bottom of the social scale rather than the top.",
    greekConcepts: [
      {
        term: "xenia",
        gloss:
          "Hospitality performed by a slave with nothing to spare. Eumaeus states the principle explicitly: all strangers and beggars are from Zeus.",
      },
      {
        term: "dmōs",
        gloss:
          "A household slave. Eumaeus is one, and the poem gives him a name, a history, an opinion and a moral position — which it does for very few.",
      },
    ],
    connections: [
      {
        books: [15],
        note: "Eumaeus tells his own life story — kidnapped king's son, sold to Laertes — in Book 15.",
      },
      {
        books: [21, 22],
        note: "He is one of the two servants let into the plan and armed for the killing.",
      },
      {
        books: [9],
        note: "The hut is the exact inverse of the Cyclops's cave: poverty that gives, against plenty that devours.",
      },
    ],
    sourceNotes:
      "The narrator addresses Eumaeus directly in the second person at several points in Books 14-17 — one of very few characters in Homer to receive this. Explanations range from metrical convenience to authorial affection; none is agreed.",
    interpretation:
      "The Cretan lies are not filler. Each is tailored to its audience, each contains true material rearranged, and each is more circumstantial than the truth would be. The poem is demonstrating that its hero's defining faculty operates continuously, on friends as well as enemies, and that he cannot stop doing it even when there is little to gain.",
    themeRefs: ["hospitality-and-xenia", "loyalty-in-the-odyssey", "identity-and-recognition"],
    figureRefs: ["odysseus", "eumaeus"],
  },
  {
    number: 15,
    slug: "book-15",
    letter: "ο",
    title: "The prince comes home",
    standfirst:
      "Telemachus leaves Sparta, evades the ambush, and the swineherd tells how he came to be a slave.",
    summary: [
      "Athena goes to Sparta and urges Telemachus to return, warning him of the ambush and telling him to land at the far end of the island and go first to Eumaeus.",
      "Menelaus and Helen give parting gifts. As they leave, an eagle carrying a goose flies past; Helen interprets it as Odysseus's return and vengeance.",
      "At Pylos Telemachus avoids delay by not going up to Nestor's house. A fugitive seer, Theoclymenus, asks passage and is taken aboard.",
      "Meanwhile Eumaeus tells his own story: he was the son of a king of Syrie, stolen as a child by a Phoenician woman who had herself been enslaved, sold to Laertes, and raised in the household. Telemachus lands safely, sends the ship on to the city, and goes to the farm.",
    ],
    characters: [
      "Telemachus",
      "Athena",
      "Menelaus",
      "Helen",
      "Theoclymenus",
      "Eumaeus",
      "Odysseus (disguised)",
    ],
    places: ["Sparta", "Pylos", "the sea", "Ithaca — the pig farm"],
    narrativeFunction:
      "Brings father and son into the same building, and completes the Telemachy by returning its traveller.",
    greekConcepts: [
      {
        term: "oiōnos",
        gloss:
          "A bird omen. Helen's reading of the eagle and goose is the second of three such omens pointing at the killing of the suitors.",
      },
    ],
    connections: [
      {
        books: [4],
        note: "Resolves the ambush prepared by the suitors in Book 4.",
      },
      {
        books: [14],
        note: "Eumaeus's biography answers the question his hospitality in Book 14 raised: why a slave keeps faith with a house.",
      },
      {
        books: [16],
        note: "Sets up the recognition between father and son in the following book.",
      },
    ],
    sourceNotes:
      "Eumaeus's account (15.403-484) is the poem's fullest description of the mechanics of enslavement: piracy, child-stealing, and sale by traders. It is told by a slave, about himself, without editorial comment.",
    interpretation:
      "The poem gives its most loyal servant a royal birth. That can be read as sentimental — nobility will out — or as the sharpest thing the poem says about slavery: the difference between the man who owns and the man who is owned is, in Eumaeus's own account, a matter of who was on which ship. He says elsewhere that a man loses half his worth the day he becomes a slave. He is describing himself.",
    themeRefs: ["loyalty-in-the-odyssey", "household-and-political-order", "exile-and-return"],
    figureRefs: ["telemachus", "eumaeus", "helen-of-sparta", "menelaus", "athena"],
  },
  {
    number: 16,
    slug: "book-16",
    letter: "π",
    title: "Father and son",
    standfirst:
      "The first recognition, achieved not by evidence but by declaration — and immediately doubted.",
    summary: [
      "Telemachus arrives at the hut. The dogs, who barked at Odysseus, fawn on him. He sends Eumaeus to tell Penelope he is safe.",
      "Alone with his son, Odysseus is transformed by Athena into a tall and handsome man. Telemachus takes him for a god and shrinks back. Odysseus says plainly that he is his father. Telemachus refuses to believe it, arguing that no mortal could change appearance so; Odysseus tells him no other Odysseus will ever come. They weep, longer and more loudly, the poem says, than birds robbed of their young.",
      "They plan: Odysseus will come to the house as a beggar and endure whatever is done to him; Telemachus is to say nothing, and at the signal to remove the weapons from the hall.",
      "In the town, the suitors' ambush ship returns unsuccessful. Antinous proposes killing Telemachus outright; Amphinomus objects that they should first ask the gods. Medon reports the plot to Penelope, who confronts Antinous, reminding him that Odysseus once sheltered his father. Eurymachus reassures her with elaborate lies.",
    ],
    characters: [
      "Odysseus",
      "Telemachus",
      "Eumaeus",
      "Athena",
      "Antinous",
      "Amphinomus",
      "Eurymachus",
      "Penelope",
      "Medon",
    ],
    places: ["Ithaca — the pig farm and the town"],
    narrativeFunction:
      "The first recognition of the second half, and the formation of the conspiracy that produces Book 22.",
    greekConcepts: [
      {
        term: "anagnōrisis",
        gloss:
          "Recognition. The poem stages six or seven of them, each by a different mechanism; this one is the least evidenced and the most immediately doubted.",
      },
      {
        term: "sēma",
        gloss:
          "A sign, token or proof. Its absence here is the point: Telemachus is given no sēma and must simply accept.",
      },
    ],
    connections: [
      {
        books: [19, 21, 23, 24],
        note: "Contrast with the recognitions by the scar (19, 21), by the bed (23), and by the trees (24), each of which turns on a token.",
      },
      {
        books: [22],
        note: "The removal of the weapons planned here is executed in Books 19 and 22.",
      },
    ],
    sourceNotes:
      "The number of the suitors is given in this book (16.245-253): fifty-two from Dulichium, twenty-four from Same, twenty from Zacynthus and twelve from Ithaca, with a herald, a bard and two attendants — one hundred and eight men.",
    interpretation:
      "The poem is careful to make the easiest recognition the least persuasive. Telemachus has no memory of his father and no proof; he is asked to accept a stranger's word, and does, and the arrangement holds. Every subsequent recognition in the poem is harder and better evidenced, culminating in the one person who refuses to be convinced by anything short of a secret only two people share.",
    themeRefs: ["identity-and-recognition", "loyalty-in-the-odyssey", "household-and-political-order"],
    figureRefs: ["odysseus", "telemachus", "eumaeus", "penelope"],
  },
  {
    number: 17,
    slug: "book-17",
    letter: "ρ",
    title: "The beggar at his own door",
    standfirst:
      "Odysseus walks into his house as a beggar, is kicked on the road and struck at the table, and is known only by a dying dog.",
    summary: [
      "Telemachus returns to town; Penelope questions him and Theoclymenus prophesies that Odysseus is already in Ithaca.",
      "Eumaeus leads the disguised Odysseus to the town. On the road Melanthius the goatherd insults him and kicks him in the hip; Odysseus considers killing him and endures it.",
      "At the gate lies Argos, the dog Odysseus reared before sailing for Troy, now old and neglected on a heap of dung. He knows his master, drops his ears, wags his tail, and lacks the strength to come; Odysseus wipes away a tear, and the dog dies.",
      "Inside, Odysseus begs from the suitors table by table. Antinous refuses and throws a footstool at him, striking his shoulder. Odysseus does not react. Penelope, hearing of it, curses Antinous and asks that the stranger be brought to her; Odysseus asks to wait until evening.",
    ],
    characters: [
      "Odysseus",
      "Eumaeus",
      "Telemachus",
      "Penelope",
      "Theoclymenus",
      "Melanthius",
      "Antinous",
      "Argos",
    ],
    places: ["Ithaca — the road to town, the palace hall"],
    narrativeFunction:
      "Puts the king inside his own house as its lowest occupant, and begins the systematic accumulation of grievance that justifies Book 22.",
    greekConcepts: [
      {
        term: "ptōchos",
        gloss:
          "Beggar — a status distinct from xenos, guest. The suitors' failure is that they treat a beggar as beneath the protection they owe a stranger.",
      },
      {
        term: "tlēmosynē",
        gloss:
          "Endurance, the capacity to bear. Book 17 is a sustained demonstration of it; Odysseus is repeatedly said to hold his anger down.",
      },
    ],
    connections: [
      {
        books: [18, 20, 22],
        note: "The pattern of an object thrown at the beggar recurs three times — a footstool here, another in 18, an ox-hoof in 20 — establishing a record of abuse before the killing.",
      },
      {
        books: [22],
        note: "Melanthius's insult here is repaid with the poem's most brutal single punishment.",
      },
    ],
    sourceNotes:
      "The Argos scene (17.290-327) is twenty-odd lines long and has no consequence for the plot. It is among the most frequently cited passages in Greek literature and among the shortest.",
    interpretation:
      "The dog knows him and cannot say so; the wife will not know him and can; the son has been told. The poem arranges recognition along a scale of capacity and evidence, and puts at the bottom of it the one creature with no interest, no doubt and no power. That the scene changes nothing is the reason it works.",
    themeRefs: ["identity-and-recognition", "hospitality-and-xenia", "loyalty-in-the-odyssey"],
    figureRefs: ["odysseus", "penelope", "telemachus", "eumaeus"],
  },
  {
    number: 18,
    slug: "book-18",
    letter: "σ",
    title: "The beggars' fight",
    standfirst:
      "A boxing match for a goat's stomach, a warning refused, and a queen extracting gifts from the men eating her house.",
    summary: [
      "Irus, the local beggar, tries to drive Odysseus from the door. The suitors set them to box for a goat's-stomach sausage. Odysseus strips, revealing his thighs and shoulders; the suitors are startled. He restrains his blow so as not to kill and breaks Irus's jaw.",
      "Odysseus warns Amphinomus — the one suitor he judges decent — that the master of the house is near, and advises him to go home. Amphinomus is troubled and stays; Athena has bound him to his death.",
      "Penelope, prompted by Athena and beautified in sleep, comes down and reproaches Telemachus, then addresses the suitors, reminding them that proper suitors bring gifts rather than consume a household. They send for gifts; Odysseus is pleased.",
      "Melantho the maid, who has been sleeping with Eurymachus, abuses the beggar. Eurymachus mocks him and throws a stool, which misses and hits a wine-server. Telemachus dismisses the company for the night.",
    ],
    characters: [
      "Odysseus",
      "Irus",
      "Amphinomus",
      "Penelope",
      "Telemachus",
      "Melantho",
      "Eurymachus",
      "Antinous",
      "Athena",
    ],
    places: ["Ithaca — the palace hall and courtyard"],
    narrativeFunction:
      "Establishes that the beggar is physically formidable, gives the suitors a final warning, and shows Penelope managing them by the only means available.",
    greekConcepts: [
      {
        term: "hybris",
        gloss:
          "Outrage: violence or humiliation inflicted to assert superiority. The word is used repeatedly of the suitors, and it is the specific charge on which they are killed.",
      },
      {
        term: "hedna",
        gloss:
          "Courtship gifts. Penelope's manoeuvre is to make them behave as suitors ought — which extracts wealth from them and delays a decision.",
      },
    ],
    connections: [
      {
        books: [22],
        note: "Amphinomus is killed by Telemachus in Book 22, having been warned and offered escape here.",
      },
      {
        books: [19],
        note: "Melantho's abuse here is repeated in Book 19 and is her recorded offence.",
      },
    ],
    sourceNotes:
      "Whether Penelope's appearance before the suitors is a calculated manoeuvre or is imposed on her by Athena is genuinely undecidable from the text, and both readings have long scholarly histories.",
    interpretation:
      "Amphinomus is the poem's insurance against a reading in which the suitors are simply wicked. He is decent, he is warned, and he is killed. The poem could have spared him, as it spares the herald and the bard. It does not, and it says explicitly that Athena would not let him go. The massacre is presented as just and as indiscriminate at the same time, and the poem does not pretend those sit comfortably together.",
    themeRefs: ["violence-and-restoration", "women-in-the-odyssey", "household-and-political-order"],
    figureRefs: ["odysseus", "penelope", "telemachus"],
  },
  {
    number: 19,
    slug: "book-19",
    letter: "τ",
    title: "The interview, the scar, and the dream",
    standfirst:
      "Husband and wife talk for the first time in twenty years, one of them disguised, and an old woman finds him out by touch.",
    summary: [
      "Odysseus and Telemachus remove the weapons from the hall. Melantho abuses the beggar again and is rebuked.",
      "Penelope questions the stranger. He tells another Cretan tale, claiming to have entertained Odysseus twelve days on his way to Troy, and describes his clothing and his brooch in exact detail. She weeps, and the poem compares her tears to snow melting on the mountains. He swears Odysseus will return within the month.",
      "Penelope orders the old nurse Eurycleia to wash his feet. Washing them she finds the scar of a boar's tusk on his thigh; the poem breaks off for some seventy lines to tell how he got it hunting on Parnassus with his grandfather Autolycus, and how Autolycus named him. She drops his foot into the basin; he seizes her throat and swears her to silence. Athena keeps Penelope's attention elsewhere.",
      "Penelope tells a dream: an eagle kills her twenty geese and then speaks in Odysseus's voice. She then describes the two gates of dreams, of horn and of ivory, and doubts her own. Finally she announces the contest of the bow and the axes for the next day.",
    ],
    characters: [
      "Odysseus",
      "Penelope",
      "Eurycleia",
      "Telemachus",
      "Melantho",
      "Autolycus (in the flashback)",
    ],
    places: ["Ithaca — the hall", "Parnassus (in the flashback)"],
    narrativeFunction:
      "The poem's central psychological encounter, and the point at which the contest that ends the poem is set in motion.",
    greekConcepts: [
      {
        term: "sēma",
        gloss:
          "Sign, token. The scar is the poem's paradigm sēma: a mark on the body, older than the disguise and impossible to counterfeit.",
      },
      {
        term: "anagnōrisis",
        gloss:
          "Recognition. Eurycleia's is involuntary, physical, and immediately suppressed.",
      },
      {
        term: "homophrosynē",
        gloss:
          "Like-mindedness between husband and wife — named earlier in the poem as the greatest good. Book 19 is where the audience sees it operating before either party admits it.",
      },
    ],
    connections: [
      {
        books: [21],
        note: "The contest announced here is held in Book 21 and is the mechanism of the killing.",
      },
      {
        books: [23],
        note: "Penelope's testing here anticipates the test of the bed, which is on her own terms and which he fails to anticipate.",
      },
      {
        books: [24],
        note: "The suitor Amphimedon later claims among the dead that Odysseus instructed Penelope to set the contest — an account the narrative does not support.",
      },
    ],
    sourceNotes:
      "The scar flashback (19.393-466) is the passage Erich Auerbach analysed in the opening chapter of Mimesis (1946) to characterise Homeric style as a foreground with no perspective — everything fully illuminated, nothing left in shadow. It remains the standard starting point for discussion of Homeric narration.",
    interpretation:
      "Whether Penelope recognises her husband during this interview is the oldest live question in Odyssey criticism and it is not settled. The case for it: she announces the contest immediately after a stranger tells her Odysseus is near, and the contest is one only he can win. The case against: the poem shows her genuinely uncertain in Book 23, and Athena is repeatedly said to be managing her attention. This platform does not choose. Adaptations must choose, and the choice is one of the most consequential an adaptation makes.",
    themeRefs: ["identity-and-recognition", "women-in-the-odyssey", "memory-and-storytelling"],
    figureRefs: ["odysseus", "penelope", "telemachus"],
  },
  {
    number: 20,
    slug: "book-20",
    letter: "υ",
    title: "The night before",
    standfirst:
      "A sleepless king, a grinding woman's prayer, and a seer who sees the walls running with blood.",
    summary: [
      "Odysseus lies awake in the porch, watching the maids go out laughing to the suitors, and his heart growls within him like a bitch standing over her puppies. He rebukes it and endures. Athena comes and tells him to sleep.",
      "Penelope, waking, prays to Artemis for death rather than a second marriage. Odysseus hears her and asks Zeus for a sign; Zeus thunders from a clear sky, and a woman grinding grain — the last still working, the weakest of them — prays that this may be the suitors' final meal.",
      "The cowherd Philoetius arrives and declares his loyalty. Melanthius insults the beggar again. An omen of an eagle with a dove turns the suitors from a renewed plot against Telemachus.",
      "At dinner Ctesippus throws an ox-hoof at the beggar as a mock guest-gift; Telemachus rebukes him publicly. Athena sets uncontrollable laughter on the suitors. The seer Theoclymenus sees the hall filled with darkness, the walls and rafters running with blood, and the porch crowded with ghosts going down to Erebus. The suitors laugh at him and he walks out.",
    ],
    characters: [
      "Odysseus",
      "Penelope",
      "Athena",
      "Philoetius",
      "Melanthius",
      "Ctesippus",
      "Telemachus",
      "Theoclymenus",
    ],
    places: ["Ithaca — the porch, the hall, the mill-house"],
    narrativeFunction:
      "Holds the poem still for one night and loads it with omens, so that Book 22 arrives as something long announced.",
    greekConcepts: [
      {
        term: "thymos",
        gloss:
          "The seat of anger and impulse. Odysseus addressing his own thymos and telling it to endure is one of the earliest depictions in European literature of a person divided against himself.",
      },
      {
        term: "kledōn",
        gloss:
          "An omen taken from overheard speech. The grinding woman's prayer is one, and the poem makes the weakest person present the source of the sign.",
      },
    ],
    connections: [
      {
        books: [22],
        note: "Theoclymenus's vision describes Book 22 in advance, and is laughed at.",
      },
      {
        books: [21],
        note: "The night ends with the morning of the contest.",
      },
    ],
    sourceNotes:
      "The address to his own heart at 20.18-21 was quoted in antiquity as a model of self-command; Plato cites the lines in the Republic in the course of arguing that the soul has parts that can disagree.",
    interpretation:
      "The poem's technique here is to make the coming violence inevitable in every register at once — divine sign, human prophecy, the prayer of a slave, and the hero's own barely-restrained rage. By the time the killing begins, the poem has arranged for it to feel less like a decision than like weather.",
    themeRefs: ["violence-and-restoration", "divine-agency-in-homer", "loyalty-in-the-odyssey"],
    figureRefs: ["odysseus", "penelope", "athena", "telemachus"],
  },
  {
    number: 21,
    slug: "book-21",
    letter: "φ",
    title: "The bow",
    standfirst:
      "A contest nobody can win but one man, and the quietest simile in the poem.",
    summary: [
      "Penelope fetches the great bow from the storeroom — the bow of Iphitus, given to Odysseus in Messene long ago, which he never took to Troy. She weeps over it, then sets the terms: she will marry whoever strings it and shoots an arrow through the sockets of twelve axe-heads set in a row.",
      "Telemachus sets up the axes and tries the bow himself; on the fourth attempt he would have strung it, but his father signals him to stop.",
      "The suitors try in turn. Leiodes fails first. Antinous has the bow greased with fat and warmed at the fire. Eurymachus fails and takes it as a public disgrace.",
      "Outside, Odysseus reveals himself to Eumaeus and Philoetius by the scar and instructs them to bar the doors. Against the suitors' objections, Telemachus orders the bow given to the beggar. Odysseus turns it over, checks it for worm, and strings it as easily as a singer fits a new string to a lyre. He plucks it, and the string sings like a swallow. Zeus thunders. He shoots through the axes without missing one, and tells Telemachus the hour has come.",
    ],
    characters: [
      "Penelope",
      "Odysseus",
      "Telemachus",
      "Antinous",
      "Eurymachus",
      "Leiodes",
      "Eumaeus",
      "Philoetius",
    ],
    places: ["Ithaca — the storeroom and the hall"],
    narrativeFunction:
      "Converts the contest for Penelope's hand into the mechanism by which Odysseus gets a weapon in a hall full of unarmed enemies.",
    greekConcepts: [
      {
        term: "aethlos",
        gloss:
          "Contest, trial. The word covers athletic competition and imposed labour alike; the poem uses the ambiguity.",
      },
      {
        term: "mētis",
        gloss:
          "The contest is the last and best of Odysseus's tricks, and it is arranged by his wife.",
      },
    ],
    connections: [
      {
        books: [19],
        note: "The contest was announced by Penelope at the end of Book 19, immediately after the beggar told her Odysseus was near.",
      },
      {
        books: [22],
        note: "The bow is strung at the end of 21 and fired at Antinous at the start of 22 without a break.",
      },
    ],
    sourceNotes:
      "What the feat with the axes physically involves is disputed: the arrow passes through the axes themselves, but whether through helve-sockets set in a line, or through rings, has been argued since antiquity without resolution.",
    interpretation:
      "The lyre simile at 21.406-411 is the poem's masterstroke. The instrument of the massacre is compared to a musical instrument, handled by a professional, and the sound of the bowstring is compared to a swallow. The poem makes killing look like craft — which is exactly how its hero experiences it, and exactly what should trouble the reader.",
    themeRefs: ["cunning-and-metis", "kingship-in-the-odyssey", "identity-and-recognition"],
    figureRefs: ["odysseus", "penelope", "telemachus", "eumaeus"],
  },
  {
    number: 22,
    slug: "book-22",
    letter: "χ",
    title: "The killing in the hall",
    standfirst:
      "One hundred and eight men, a barred door, and an execution the poem refuses to soften.",
    summary: [
      "Odysseus strips off his rags, leaps onto the threshold, and shoots Antinous through the throat as he lifts a cup. The suitors, believing it an accident, threaten him; he names himself and refuses all terms.",
      "Eurymachus offers full restitution and more; Odysseus rejects it and kills him. Telemachus kills Amphinomus. Telemachus fetches armour but leaves the storeroom open; Melanthius uses it to arm the suitors, is caught on a second trip, and is strung up alive in the storeroom.",
      "Athena appears as Mentor, taunts Odysseus, and watches from the rafters as a swallow before finally raising the aegis, at which the suitors panic. The killing is compared to hawks among small birds and to cattle stung by gadflies.",
      "The seer Leiodes is killed while supplicating. The bard Phemius and the herald Medon are spared as compelled men. Eurycleia is fetched and starts to cry out in triumph; Odysseus stops her, saying it is not holy to exult over the dead. Twelve maids who slept with the suitors are made to carry out the bodies and clean the hall, and are then hanged in a row by Telemachus, who refuses them the clean death by sword his father ordered; the poem compares them to thrushes or doves caught in a net, their feet twitching a little. Melanthius is mutilated and killed. The hall is purified with fire and sulphur.",
    ],
    characters: [
      "Odysseus",
      "Telemachus",
      "Eumaeus",
      "Philoetius",
      "Antinous",
      "Eurymachus",
      "Melanthius",
      "Leiodes",
      "Phemius",
      "Medon",
      "Eurycleia",
      "Athena",
    ],
    places: ["Ithaca — the hall, the storeroom, the courtyard"],
    narrativeFunction:
      "Resolves the political crisis by force and creates the blood-feud that Book 24 must then contain.",
    greekConcepts: [
      {
        term: "tisis",
        gloss:
          "Retribution, payment exacted. The poem's word for what is happening, and its justification: the suitors' hybris against xenia is paid for.",
      },
      {
        term: "hosiē",
        gloss:
          "What is sanctioned or permitted. Odysseus forbids Eurycleia to exult, saying it is not hosiē to glory over slain men — in a hall he has just filled with bodies.",
      },
    ],
    connections: [
      {
        books: [1, 2, 17, 18, 20],
        note: "Every warning, omen and abuse the poem has accumulated since Book 1 is discharged here.",
      },
      {
        books: [24],
        note: "The dead suitors give their own account in the second underworld scene, and their families take up arms.",
      },
    ],
    sourceNotes:
      "The hanging of the maids occupies 22.462-473. It is among the most discussed passages in Homer, and it is not presented by the narrator as a crime; the women are described as having slept with the suitors, and Telemachus's stated reason is that they poured shame on his mother and himself. Emily Wilson's 2018 translation was widely noted for rendering them as 'girls' rather than with the moralising nouns earlier English translators had used.",
    interpretation:
      "Two things must be held together. The poem regards the killing of the suitors as just, and builds a careful case for it. The poem also shows Odysseus forbidding triumph over the dead in one breath and ordering the execution of enslaved women in the next, and it gives those women a simile — birds in a net, hoping for a bed and finding a noose — that no reader forgets. Whatever the poem intends, it does not let the reader off.",
    themeRefs: ["violence-and-restoration", "household-and-political-order", "women-in-the-odyssey"],
    figureRefs: ["odysseus", "telemachus", "eumaeus", "athena"],
  },
  {
    number: 23,
    slug: "book-23",
    letter: "ψ",
    title: "The bed",
    standfirst:
      "A wife who will not be convinced, and a secret about a piece of furniture that is the whole of the marriage.",
    summary: [
      "Eurycleia wakes Penelope with the news. Penelope refuses to believe it, first that the beggar is Odysseus, then that any mortal could have killed a hundred and eight men.",
      "She comes down and sits opposite him in silence, sometimes seeming to know him and sometimes not. Telemachus reproaches her; she answers that if it is truly him they have signs known only to the two of them.",
      "Odysseus, washed and restored by Athena, sits down again. Penelope orders Eurycleia to move the bed out of the bedchamber and make it up for him. Odysseus flares into anger: he built the bed himself, around a living olive trunk still rooted in the ground, and no man could move it unless a god had cut it free.",
      "Her knees give way. She embraces him, explaining that she feared an impostor, and the poem compares her joy to the relief of shipwrecked men sighting land — a simile that belongs to his experience, given to her. Athena holds back the dawn. In bed he tells her of Tiresias's prophecy: that he must travel again, inland, carrying an oar, until he meets people who do not know the sea.",
    ],
    characters: ["Penelope", "Odysseus", "Eurycleia", "Telemachus", "Athena"],
    places: ["Ithaca — the upper chamber and the bedroom"],
    narrativeFunction:
      "Completes the poem's central recognition, on the wife's terms and by her test rather than his.",
    greekConcepts: [
      {
        term: "sēma",
        gloss:
          "The token. The bed is the poem's greatest sēma because it cannot be reported, only known: a fact about a room that only two living people and one dead servant ever knew.",
      },
      {
        term: "homophrosynē",
        gloss:
          "Like-mindedness. The scene demonstrates it: she sets a trap, he walks into it by being exactly who he is, and the trap is the proof.",
      },
    ],
    connections: [
      {
        books: [19],
        note: "Answers the interview of Book 19: there she tested and he evaded; here she tests and he cannot.",
      },
      {
        books: [11],
        note: "The prophecy of further travel comes from Tiresias in Book 11 and is passed to Penelope here.",
      },
      {
        books: [5],
        note: "The rooted bed is the counterweight to Calypso's offer of immortality: this is what was chosen instead.",
      },
    ],
    sourceNotes:
      "A note in the scholia records that the Alexandrian scholars Aristophanes of Byzantium and Aristarchus marked 23.296 as the peras or telos — the end — of the Odyssey. What that judgement meant, and whether the rest of the poem is a later addition, has been argued ever since and is not settled.",
    interpretation:
      "The test of the bed is the only occasion in the poem where Odysseus is outmanoeuvred, and his wife does it. He is provoked into self-revelation by an insult to his craftsmanship. The poem has spent twenty-two books demonstrating that this man can control any disclosure of himself, and then shows the one person who can make him lose that control. It is the best-constructed scene in early European literature and it turns on a bedframe.",
    themeRefs: ["identity-and-recognition", "women-in-the-odyssey", "homecoming-and-nostos"],
    figureRefs: ["odysseus", "penelope"],
  },
  {
    number: 24,
    slug: "book-24",
    letter: "ω",
    title: "The dead, the orchard, and the peace",
    standfirst:
      "A second descent, a father tested in his own garden, and a war stopped by a goddess in the last hundred lines.",
    summary: [
      "Hermes leads the suitors' souls to the meadow of asphodel, where Achilles and Agamemnon are talking. The suitor Amphimedon tells their story; Agamemnon contrasts Penelope's fidelity with Clytemnestra's and declares that Penelope's fame will never die.",
      "Odysseus goes to the farm where Laertes lives in squalor, working his orchard. He tests his father with yet another false story, watches him break down and pour dust on his head, and only then reveals himself — by the scar, and by naming the trees Laertes gave him when he was a boy: thirteen pear, ten apple, forty fig, and the rows of vines.",
      "Rumour brings the suitors' families to the assembly. Eupeithes, father of Antinous, calls for vengeance. Halitherses and Medon warn them that the killing was done with the gods' assent; about half withdraw, the rest arm.",
      "At the farm, Laertes, rejuvenated by Athena, kills Eupeithes with a spear-cast. As the fighting starts, Athena calls a halt; Zeus throws a thunderbolt at her feet; she imposes oaths of peace on both sides, in the likeness of Mentor. The poem ends there.",
    ],
    characters: [
      "Hermes",
      "Achilles",
      "Agamemnon",
      "Amphimedon",
      "Odysseus",
      "Laertes",
      "Dolius",
      "Eupeithes",
      "Halitherses",
      "Athena",
      "Zeus",
    ],
    places: ["the meadow of asphodel", "Ithaca — Laertes's farm and the assembly"],
    narrativeFunction:
      "Closes the family across three generations and contains, by divine intervention, the feud the killing created.",
    greekConcepts: [
      {
        term: "kleos",
        gloss:
          "Fame. Agamemnon's speech awards it to Penelope explicitly, and the poem's last word on reputation is about a woman's.",
      },
      {
        term: "horkos",
        gloss:
          "Oath. The poem does not end in reconciliation but in a sworn settlement imposed from outside.",
      },
    ],
    connections: [
      {
        books: [1, 3, 11],
        note: "The Agamemnon paradigm, introduced in Book 1 and repeated throughout, is finally resolved in his own mouth.",
      },
      {
        books: [11],
        note: "Anticleia's report in Book 11 that Laertes has withdrawn to the country is answered by this reunion.",
      },
      {
        books: [22],
        note: "The feud is the direct consequence of Book 22 and the poem does not pretend otherwise.",
      },
    ],
    sourceNotes:
      "The authenticity of Book 24 has been questioned since antiquity, in connection with the Alexandrian note at 23.296. Arguments against it cite the second underworld scene's inconsistency with Book 11 and some unusual language; arguments for it cite the structural necessity of resolving the feud and the reunion with Laertes that Book 11 sets up. There is no consensus, and this platform does not manufacture one.",
    interpretation:
      "The ending is the part of the poem adaptations most often discard, and it is the part that makes the poem political rather than merely domestic. Killing a hundred and eight aristocrats does not restore order; it starts a war. Homer's Odysseus does not solve this. Athena does, by force, in the last hundred lines. The peace of Ithaca is imposed, not earned — and reading the poem as though it ended with the marriage bed removes the one thing it says about what violence costs a community.",
    themeRefs: ["violence-and-restoration", "household-and-political-order", "kingship-in-the-odyssey"],
    figureRefs: ["odysseus", "laertes", "agamemnon", "clytemnestra", "athena", "penelope"],
  },
];

const BY_SLUG = new Map(ODYSSEY_BOOKS.map((b) => [b.slug, b]));

export function getOdysseyBook(slug: string): OdysseyBook | undefined {
  return BY_SLUG.get(slug);
}

export function adjacentOdysseyBooks(number: number) {
  return {
    previous: ODYSSEY_BOOKS.find((b) => b.number === number - 1),
    next: ODYSSEY_BOOKS.find((b) => b.number === number + 1),
  };
}

/** The poem's four structural movements, used by the index and by the
 *  book template to place each book in the whole. */
export const ODYSSEY_MOVEMENTS: ReadonlyArray<{
  label: string;
  books: [number, number];
  note: string;
}> = [
  {
    label: "The Telemachy",
    books: [1, 4],
    note: "Ithaca and the journeys of Telemachus. Odysseus does not appear.",
  },
  {
    label: "From Ogygia to Scheria",
    books: [5, 8],
    note: "The hero appears, is released, is wrecked, and is received by the Phaeacians.",
  },
  {
    label: "The wanderings",
    books: [9, 12],
    note: "Odysseus narrates his own adventures in the first person at the Phaeacian court.",
  },
  {
    label: "Ithaca",
    books: [13, 24],
    note: "Return, disguise, recognition, the killing of the suitors, and the imposed peace.",
  },
];

export function movementFor(number: number) {
  return ODYSSEY_MOVEMENTS.find(
    (m) => number >= m.books[0] && number <= m.books[1],
  );
}
