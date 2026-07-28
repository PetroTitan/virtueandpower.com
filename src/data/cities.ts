/**
 * Ancient cities registry.
 *
 * The settlement layer: the physical city, its plan, its monuments, what
 * has been excavated and where the finds are now. Rendered by one
 * template at /cities/[slug].
 *
 * ─── The relationship to /civilizations ─────────────────────────────
 *
 * Athens, Sparta, Rome and Babylon already exist as `civilization`
 * entries covering the polity — the political order, the constitution,
 * the cultural formation. Those pages are published and indexed and are
 * not touched.
 *
 * The division is: `/civilizations/athens` is the democracy;
 * `/cities/athens` is the place. One covers how the polis governed
 * itself; the other covers the Acropolis, the Agora, the Long Walls,
 * the excavation history and the museums. The split is the one museums
 * and universities already make, and it is enforced rather than trusted:
 *   - the city template's section headings are deliberately disjoint
 *     from the civilization pages' headings;
 *   - `civilizationCounterpart` records the pairing, and the template
 *     renders a disambiguation line at the top of the page;
 *   - a content-health check verifies both directions of the link and
 *     fails the build if a heading collision is introduced.
 *
 * ─── The numbers discipline ─────────────────────────────────────────
 *
 * Ancient city populations are quoted with a confidence the evidence
 * never supported. "Rome had a million people" is an inference from the
 * grain dole and an assumed density, not a census result; Diodorus's
 * 300,000 free inhabitants of Alexandria is a single ancient figure
 * repeated for two thousand years.
 *
 * So the same apparatus the battle registry uses for troop figures
 * applies here: `PopulationEstimate` carries the figure, the basis it
 * rests on, an evidence level and an assessment. There is no field in
 * which a bare population number can be stored.
 */

import type { EvidenceLevel, SourceReference } from "./evidence";

export interface PopulationEstimate {
  /** What is being counted and when, e.g. "The city in the 2nd century CE". */
  label: string;
  figure: string;
  /** What the figure rests on — a source, or the modern method used. */
  basis: string;
  level: EvidenceLevel;
  /** What the figure is actually worth. Required. */
  assessment: string;
}

export interface Monument {
  name: string;
  date: string;
  level: EvidenceLevel;
  note: string;
  /** Slug into the archive-image registry, where one is vendored. */
  imageSlug?: string;
}

export interface MuseumHolding {
  /** Institution name. */
  museum: string;
  city: string;
  /** What it holds from this site. */
  holdings: string;
  /** Where the holding is contested, say so. Omitted otherwise. */
  note?: string;
}

export interface City {
  slug: string;
  name: string;
  /** Name in antiquity where it differs. */
  ancientName?: string;
  modernName: string;
  country: string;
  standfirst: string;
  description: string;
  /** Slugs into content/civilizations. */
  civilizations: string[];
  /**
   * Where a civilization page covers the same name as a polity, the slug
   * of that page. The template renders a disambiguation line and the
   * validator enforces the reciprocal link.
   */
  civilizationCounterpart?: string;
  /** Broad type, used for grouping on the index. */
  cityType:
    | "polis"
    | "imperial-capital"
    | "sanctuary"
    | "port"
    | "royal-ceremonial"
    | "provincial-town";
  period: string;
  foundation: { claim: string; level: EvidenceLevel; note: string };
  /** The site itself: geography, and why anyone settled there. */
  setting: string[];
  history: string[];
  urbanPlan: string[];
  economy: string[];
  cult: string[];
  atWar: string[];
  population: PopulationEstimate[];
  monuments: Monument[];
  archaeology: {
    level: EvidenceLevel;
    excavationHistory: string;
    note: string;
  };
  /** Ready for Phase 27.5, which attaches object provenance to these. */
  museums: MuseumHolding[];
  disputes: Array<{ question: string; positions: string; level: EvidenceLevel }>;
  primarySources: SourceReference[];
  /** Slugs into src/data/maps.ts. */
  mapSlugs: string[];
  /** Slugs into content/philosophers. */
  figureRefs: string[];
  /** Slugs into content/themes. */
  themeRefs: string[];
  /** Slugs into content/books. */
  bookRefs: string[];
  /** Slugs into src/data/battles.ts. */
  battleRefs: string[];
  /** Slugs into src/data/warfare.ts. */
  warfareRefs: string[];
  /** Other cities. */
  relatedCities: string[];
  imageSlug?: string;
  gallerySlugs?: string[];
}

/**
 * Section headings the city template renders. Held here rather than in
 * the component so the validator can check them against the headings of
 * the paired civilization pages and fail on a collision.
 */
export const CITY_SECTION_HEADINGS: ReadonlyArray<string> = [
  "The site and its setting",
  "History of the settlement",
  "Urban plan",
  "Economy and supply",
  "Cult and sanctuaries",
  "The city at war",
  "Population",
  "Monuments",
  "Archaeology and excavation",
  "Museum collections",
  "Open questions",
];

const P = (
  work: string,
  locus: string,
  summary: string,
  author?: string,
): SourceReference => ({ work, locus, summary, author });

export const CITIES: ReadonlyArray<City> = [
  {
    slug: "athens",
    name: "Athens",
    ancientName: "Athenai",
    modernName: "Athens",
    country: "Greece",
    standfirst:
      "The best-excavated city of the classical Greek world — an acropolis, a civic square, a fortified corridor to the sea, and the archaeology that lets all three be read against the texts.",
    description:
      "Ancient Athens as a place: the Acropolis and its building programme, the Agora, the Long Walls and the Piraeus, the excavation history, and where the finds are now. For the democracy and the political order, see the Athens civilization page.",
    civilizations: ["athens", "greece"],
    civilizationCounterpart: "athens",
    cityType: "polis",
    period: "Occupied from the Neolithic; the classical city c. 500–300 BCE",
    foundation: {
      claim: "Founded by the autochthonous king Cecrops, and named by Athena after her contest with Poseidon.",
      level: "mythological",
      note: "The foundation story belongs to Athenian civic religion, not to the record. What the archaeology shows is continuous occupation of the Acropolis rock from the Neolithic, with Mycenaean fortification in the Late Bronze Age.",
    },
    setting: [
      "Athens sits in the Attic plain, ringed by Hymettus, Pentelicus, Parnes and Aigaleos, roughly eight kilometres from the sea. The site's advantages are a defensible limestone outcrop with a spring, good agricultural land around it, silver at Laurion in the south of Attica, and marble on Pentelicus.",
      "The distance from the coast is the fact that shapes the city's later strategy. Athens is not a port; it acquired one, at the Piraeus, and then had to solve the problem of holding the ground between them.",
    ],
    history: [
      "The Acropolis was a Mycenaean citadel, and stretches of its Bronze Age circuit survive. After the collapse Athens escaped the worst of the disruption, and Attica was unified politically — an event the Athenians attributed to Theseus — at a date that is not recoverable.",
      "The sixth century brought the tyranny of Peisistratus and his sons and a substantial building programme, and then the reforms of Cleisthenes. In 480 BCE the Persians took and burned the city; the Athenians had evacuated. The debris of that destruction was buried on the Acropolis and is the single most useful archaeological deposit in Greek art history, because it seals everything above it as later than 480.",
      "The rebuilding under Pericles produced the classical Acropolis. Athens then lost the Peloponnesian War, was occupied, recovered, lost its independence to Macedon, was sacked by Sulla in 86 BCE, and continued as a university town under Rome with imperial patronage from Hadrian in particular.",
    ],
    urbanPlan: [
      "Athens was never planned. It grew, and its street pattern is irregular — which the Athenians knew, and which contrasts with the grid Hippodamus laid out at their own port.",
      "The functional division is clear. The Acropolis carried the cults; the Agora below it to the north-west was the civic and commercial centre, with the council house, the law courts, the mint and the stoas; the Kerameikos outside the walls held the principal cemetery and the potters' quarter.",
      "The Themistoclean circuit went up in haste after 480, and the Long Walls, completed by the 450s, ran roughly six kilometres to enclose a corridor to the Piraeus. That corridor made the city a fortified island: as long as the fleet held the sea, Athens could not be starved by an army in Attica. The strategy is Pericles's, and it worked until the plague.",
    ],
    economy: [
      "Silver from the mines at Laurion, worked by very large numbers of enslaved people in conditions that were lethal, funded the fleet and the coinage. The Athenian owl tetradrachm became the most widely accepted coin in the eastern Mediterranean.",
      "Grain came from the Black Sea and had to be convoyed, which is one reason naval supremacy was not optional. Pottery was exported across the Mediterranean, and marble came from Pentelicus, eighteen kilometres away.",
      "Under the empire, tribute from the allied cities paid for the building programme. Plutarch records the political argument that the money was allied money being spent on Athenian ornament, and does not dismiss it.",
    ],
    cult: [
      "The Acropolis was the sanctuary of Athena Polias, and the Panathenaic festival that culminated there was the city's principal civic-religious event. The olive tree and the salt spring on the rock were shown as the tokens of the contest between Athena and Poseidon.",
      "The Erechtheion housed the oldest and holiest cult image, an olive-wood statue of Athena, and the Parthenon housed Phidias's chryselephantine Athena Parthenos — a dedication rather than a cult statue in the older sense.",
      "Outside the city, Eleusis in western Attica held the Mysteries, and the theatre of Dionysus on the south slope of the Acropolis was a sanctuary before it was a theatre: Athenian drama was performed at a religious festival.",
    ],
    atWar: [
      "Athens fought as a naval power, and the physical evidence of that is at the Piraeus, where the ship sheds at Zea held the trireme fleet and their dimensions constrain what a trireme can have been.",
      "The city's land defences were the Themistoclean circuit and the Long Walls. The demolition of the Long Walls in 404 BCE, to the sound of flute-girls according to Xenophon, was the physical form of the surrender.",
    ],
    population: [
      {
        label: "Attica, including Athens, on the eve of the Peloponnesian War",
        figure: "Commonly estimated at 250,000–300,000 in total, of whom perhaps 30,000–40,000 were adult male citizens",
        basis: "Modern reconstruction from military strengths in Thucydides, the size of the citizen assembly, and agricultural capacity",
        level: "disputed",
        assessment:
          "No ancient census of Attica survives. The citizen figure is the firmest, because armies and juries were counted; the totals for women, children, metics and the enslaved are extrapolations from ratios that are themselves argued. Estimates of the enslaved population in particular range from roughly 20,000 to over 100,000.",
      },
      {
        label: "The urban centre itself",
        figure: "Not separately recoverable",
        basis: "No basis exists",
        level: "unknown",
        assessment:
          "Ancient sources count citizens of the polis, which is a political community covering all of Attica, not residents of the town. The population of the built-up area is not something the evidence distinguishes.",
      },
    ],
    monuments: [
      {
        name: "The Parthenon",
        date: "447–432 BCE",
        level: "documented",
        note: "Built under Pericles by Iktinos and Kallikrates with sculptural programme under Phidias. The building accounts were inscribed on stone and partly survive, which makes its construction one of the best-documented in antiquity.",
        imageSlug: "parthenon-east",
      },
      {
        name: "The Erechtheion",
        date: "c. 421–406 BCE",
        level: "documented",
        note: "An irregular building because it had to accommodate several older cults on uneven ground. Its Caryatid porch is the best-known element; one Caryatid is in London.",
      },
      {
        name: "The Propylaia",
        date: "437–432 BCE",
        level: "documented",
        note: "The monumental gateway to the Acropolis, by Mnesikles, left unfinished at the outbreak of the Peloponnesian War.",
      },
      {
        name: "The Temple of Hephaestus",
        date: "c. 449–415 BCE",
        level: "documented",
        note: "Overlooking the Agora, and the best-preserved Doric temple anywhere, because it served as a church from the seventh century until 1834.",
      },
      {
        name: "The Theatre of Dionysus",
        date: "Successive phases from the 6th century BCE",
        level: "documented",
        note: "The place where Aeschylus, Sophocles, Euripides and Aristophanes were first performed. The stone structure visible now is substantially later than the classical drama staged there, which is a common and easily missed point.",
      },
    ],
    archaeology: {
      level: "documented",
      excavationHistory:
        "The Acropolis was cleared through the nineteenth century by the Greek Archaeological Service, in a process that removed the medieval and Ottoman phases entirely — a loss now regretted. The Agora has been excavated by the American School of Classical Studies since 1931, requiring the demolition of a nineteenth-century neighbourhood; the Stoa of Attalos was reconstructed in the 1950s to house the finds. The Kerameikos has been worked by the German Archaeological Institute.",
      note:
        "Athens is the best-documented classical city because excavation has been continuous for nearly two centuries and because inscriptions survive in quantity — building accounts, tribute lists, decrees, casualty lists. The city can be read against its own paperwork to a degree almost nowhere else allows.",
    },
    museums: [
      {
        museum: "Acropolis Museum",
        city: "Athens",
        holdings:
          "The sculpture from the Acropolis, including the archaic korai from the Persian destruction deposit and the surviving Parthenon frieze blocks held in Greece.",
      },
      {
        museum: "National Archaeological Museum",
        city: "Athens",
        holdings:
          "The principal collection of Greek antiquities, including material from Attica and the great bronzes.",
      },
      {
        museum: "Museum of the Ancient Agora, Stoa of Attalos",
        city: "Athens",
        holdings:
          "Finds from the Agora excavations, including ostraka bearing the names of politicians proposed for ostracism, and the bronze allotment machines and jurors' tokens that document how the democracy physically worked.",
      },
      {
        museum: "British Museum",
        city: "London",
        holdings:
          "Approximately half the surviving Parthenon sculptures, removed by agents of Lord Elgin between 1801 and 1812.",
        note: "Ownership and return are actively contested between the United Kingdom and Greece. This platform records the dispute and takes no position on it here; the relevant point for a reader is that the sculptural programme is now divided between two cities.",
      },
    ],
    disputes: [
      {
        question: "How large was the enslaved population of Attica?",
        positions:
          "Estimates run from around 20,000 to well over 100,000. The high figures derive from a passage in Thucydides about desertions during the Decelean War and from mining-industry requirements; the low ones from agricultural carrying capacity. The disagreement is substantial and matters for almost every quantitative claim about the Athenian economy.",
        level: "disputed",
      },
      {
        question: "What was the Parthenon frieze depicting?",
        positions:
          "The traditional reading is the Panathenaic procession. Alternatives have proposed a mythological subject, including the sacrifice of the daughters of Erechtheus. No inscription identifies the subject and the question is open.",
        level: "disputed",
      },
    ],
    primarySources: [
      P("Description of Greece", "1.1-29", "A traveller's account of Athens and Attica in the second century CE, describing monuments many of which no longer stand.", "Pausanias"),
      P("History of the Peloponnesian War", "1.89-93, 2.13-17", "The building of the walls and the strategy of abandoning Attica for the fortified city.", "Thucydides"),
      P("Constitution of the Athenians", "throughout", "The institutional history, valuable alongside the Agora finds that document the same institutions physically.", "Aristotle"),
      P("Athenian tribute lists", "IG I³ 259-291", "Inscribed records of allied contributions, cut on stone and set up on the Acropolis.", "Athenian state"),
    ],
    mapSlugs: ["athens", "ancient-greece"],
    figureRefs: ["pericles", "themistocles", "plato", "socrates"],
    themeRefs: ["democracy-at-war", "war-and-peace"],
    bookRefs: ["history-of-the-peloponnesian-war"],
    battleRefs: ["marathon", "salamis", "plataea", "chaeronea"],
    warfareRefs: ["hoplite", "trireme", "naval-warfare", "fortifications", "greek-warfare"],
    relatedCities: ["sparta", "corinth", "delphi", "olympia"],
    imageSlug: "parthenon-east",
  },
  {
    slug: "sparta",
    name: "Sparta",
    ancientName: "Sparte; the territory Lakedaimon",
    modernName: "Sparti",
    country: "Greece",
    standfirst:
      "A city that deliberately built almost nothing monumental, and whose remains are correspondingly thin — as Thucydides predicted they would be.",
    description:
      "Ancient Sparta as a place: an unwalled cluster of villages in the Eurotas valley, its sanctuaries, the excavation record, and why the archaeology is so much poorer than the reputation. For the polity and the helot system, see the Sparta civilization page.",
    civilizations: ["sparta", "greece"],
    civilizationCounterpart: "sparta",
    cityType: "polis",
    period: "c. 900 BCE – Roman period",
    foundation: {
      claim: "Founded by the return of the Heraclidae, the descendants of Heracles reclaiming the Peloponnese.",
      level: "mythological",
      note: "The 'Dorian invasion' this story was long taken to record is not visible archaeologically, and the model has been substantially abandoned. What the record shows is settlement in the Eurotas valley from the tenth century BCE.",
    },
    setting: [
      "Sparta lies in the Eurotas valley in Laconia, closed off by the Taygetus range to the west and Parnon to the east — the most defensible large agricultural basin in the Peloponnese, and one reason the Spartans could go without walls for so long.",
      "The city was not a single built-up centre but a group of villages, four originally with Amyklai added later, which is what Thucydides is describing when he says Sparta was not brought together into one place in the manner of a city.",
    ],
    history: [
      "Sparta expanded first into the rest of Laconia and then, in the Messenian wars, west across Taygetus into Messenia, whose population it reduced to helotry. That conquest is the basis of the entire Spartan system: it supplied the agricultural surplus that let citizens do nothing but soldier.",
      "The archaic city produced fine bronzes, ivories and poetry — the austerity that later became its signature is a development of the sixth century and after, not an original condition. This is one of the clearest results the excavations gave.",
      "Sparta led the Greek alliance against Persia, defeated Athens in the Peloponnesian War, and lost its hegemony at Leuctra in 371 BCE when Epaminondas broke its army and then freed Messenia. It never recovered, because the citizen body could not be replaced and the land base was gone. Under Rome it became a tourist attraction, staging displays of its own traditions for visitors.",
    ],
    urbanPlan: [
      "There was very little plan. Sparta had no walls until the Hellenistic period, no monumental civic centre on the Athenian model, and no grid.",
      "Thucydides makes the point that if Sparta were deserted, later generations judging from the remains would refuse to believe its power was what it was said to be, whereas Athens would appear twice as powerful as it was. He was right, and the passage is the best ancient statement of the problem archaeologists face with the site.",
      "The principal built structures were sanctuaries rather than civic buildings: the Menelaion on a ridge to the south-east, the sanctuary of Artemis Orthia by the river, the Amyklaion further south, and a hilltop acropolis with a temple of Athena Chalkioikos.",
    ],
    economy: [
      "The economy rested on helot agriculture in Laconia and Messenia, worked by an enserfed population who delivered a fixed portion of the produce. Spartiate citizens were barred from farming, trade and craft.",
      "The perioikoi, free non-citizen communities of Laconia, carried out the manufacture, trade and much of the metalworking the citizen body did not. Spartan iron currency, if the tradition is accurate, was a deliberate refusal of the coinage the rest of Greece used.",
    ],
    cult: [
      "The sanctuary of Artemis Orthia is the most productive site in Sparta archaeologically, and the finds — thousands of small lead figurines, ivories and terracotta masks — are the best material evidence for archaic Spartan culture.",
      "The rite performed there, in which young men were whipped at the altar, is described by later authors including Plutarch, and in the Roman period it was staged for visitors in an amphitheatre built around the altar. Distinguishing the classical rite from the Roman-era tourist spectacle is a real problem.",
      "The Menelaion, a shrine on a spur above the Eurotas, was a cult place of Menelaus and Helen with a Late Bronze Age settlement beneath it.",
    ],
    atWar: [
      "Sparta's military reputation is not matched by military architecture: for most of its history the city relied on the argument, reported in several sources, that its men were its walls.",
      "The city built fortifications only in the Hellenistic period, when the citizen body had shrunk to the point where the argument no longer held.",
    ],
    population: [
      {
        label: "Spartiate citizens at the time of the Persian Wars",
        figure: "About 8,000 adult males",
        basis: "Herodotus 7.234, in which a Spartan tells Xerxes the number of men in the city",
        level: "disputed",
        assessment:
          "A single figure in a dramatised conversation, and therefore weak. It is nonetheless the best we have, and the direction of travel it implies is corroborated: by Leuctra in 371 BCE Xenophon's account indicates only a few hundred Spartiates in the field.",
      },
      {
        label: "The helot population",
        figure: "No reliable figure",
        basis: "No ancient count survives",
        level: "unknown",
        assessment:
          "Ancient authors assert that helots vastly outnumbered citizens, and Herodotus's claim of seven helots per Spartiate at Plataea is the usual basis for a ratio. The figure is not a count and the ratio is not stable across time or territory.",
      },
    ],
    monuments: [
      {
        name: "Sanctuary of Artemis Orthia",
        date: "From the 8th century BCE; Roman amphitheatre added",
        level: "documented",
        note: "The richest excavated deposit at Sparta, and the source of most of what is known about archaic Spartan material culture.",
      },
      {
        name: "The Menelaion",
        date: "Shrine from the 8th–7th century BCE over a Late Bronze Age settlement",
        level: "documented",
        note: "The cult of Menelaus and Helen, and the Mycenaean structure beneath it, are both attested by excavation.",
      },
      {
        name: "Temple of Athena Chalkioikos",
        date: "Archaic, on the acropolis",
        level: "probable",
        note: "'Of the bronze house', from bronze plating recorded by Pausanias. Little survives.",
      },
      {
        name: "The theatre",
        date: "Hellenistic and Roman",
        level: "documented",
        note: "Substantial, and later than the classical city whose reputation draws visitors to the site.",
      },
    ],
    archaeology: {
      level: "documented",
      excavationHistory:
        "Excavated principally by the British School at Athens, in campaigns from 1906 and resumed later in the century, concentrating on the Artemis Orthia sanctuary, the acropolis and the Menelaion.",
      note:
        "The archaeology has done something the literary tradition could not: it showed that archaic Sparta produced sophisticated bronzes, ivories and lyric poetry, and that the famous austerity was a later development. That is a case of excavation correcting a written tradition rather than confirming it.",
    },
    museums: [
      {
        museum: "Archaeological Museum of Sparta",
        city: "Sparti, Greece",
        holdings:
          "Finds from Artemis Orthia including the lead figurines and terracotta masks, sculpture, and the warrior torso conventionally called Leonidas.",
        note: "The identification of the warrior torso as Leonidas is a modern label and is not established.",
      },
      {
        museum: "Museum of the Olive and Greek Olive Oil",
        city: "Sparti, Greece",
        holdings: "Regional agricultural material relevant to the Laconian economy.",
      },
    ],
    disputes: [
      {
        question: "How much of the Spartan system is a later construction?",
        positions:
          "The 'Spartan mirage': admirers idealised, enemies distorted, and the fullest descriptions of Spartan institutions are Roman-era. The archaic finds indicate a society far less austere than the classical picture, which supports reading the austerity as a sixth-century development — but how much of the classical system was itself reinvented under Rome for visitors is argued.",
        level: "disputed",
      },
    ],
    primarySources: [
      P("History of the Peloponnesian War", "1.10", "The observation that Sparta's remains would understate its power and Athens's would overstate hers.", "Thucydides"),
      P("Description of Greece", "3.11-18", "A traveller's account of the monuments of Sparta in the second century CE.", "Pausanias"),
      P("Constitution of the Lacedaemonians", "throughout", "A contemporary admirer's description of Spartan institutions.", "Xenophon"),
    ],
    mapSlugs: ["sparta", "ancient-greece"],
    figureRefs: ["leonidas", "lycurgus", "epaminondas"],
    themeRefs: ["spartan-order", "discipline", "military-virtue"],
    bookRefs: [],
    battleRefs: ["thermopylae", "plataea", "leuctra", "mantinea-362"],
    warfareRefs: ["spartan-army", "hoplite", "phalanx", "military-discipline"],
    relatedCities: ["athens", "corinth", "olympia", "delphi"],
  },
  {
    slug: "corinth",
    name: "Corinth",
    ancientName: "Korinthos",
    modernName: "Ancient Corinth (Archaia Korinthos)",
    country: "Greece",
    standfirst:
      "A city that owned an isthmus, grew rich on the traffic across it, was destroyed completely by Rome in 146 BCE, and was rebuilt by Caesar as a Roman colony a century later.",
    description:
      "Ancient Corinth as a place: the Acrocorinth citadel, the two harbours and the diolkos trackway, the archaic Temple of Apollo, the Roman refoundation, and one of the longest continuous excavations in Greece.",
    civilizations: ["greece", "roman-republic"],
    cityType: "polis",
    period: "Occupied from the Neolithic; destroyed 146 BCE; refounded 44 BCE",
    foundation: {
      claim: "Founded by Sisyphus, and later home of Medea and Jason.",
      level: "mythological",
      note: "The mythological associations are dense and belong to the tradition. Archaeologically the site shows occupation from the Neolithic and a substantial settlement from the Geometric period.",
    },
    setting: [
      "Corinth controls the isthmus joining the Peloponnese to central Greece, and with it both the land route north–south and the sea route east–west. It had two harbours: Lechaion on the Corinthian Gulf and Kenchreai on the Saronic.",
      "Above the city rises Acrocorinth, a limestone massif with a spring on its summit, which is among the strongest natural fortresses in Greece and was held and refortified continuously into the Ottoman period.",
    ],
    history: [
      "Archaic Corinth was a major commercial and colonising power, founding Syracuse and Corcyra, and producing the pottery that dominated Mediterranean export markets in the seventh century. The tyranny of Cypselus and Periander belongs to this period.",
      "In 146 BCE the Roman commander Lucius Mummius destroyed the city at the end of the Achaean War, killing or enslaving the population and shipping its art to Rome. Polybius, who was present in the aftermath, describes Roman soldiers using looted paintings as dice boards.",
      "Julius Caesar refounded it in 44 BCE as Colonia Laus Iulia Corinthiensis, settled largely with freedmen. It became the capital of the province of Achaea and a substantial Roman city, which is why most of what stands today is Roman rather than Greek.",
    ],
    urbanPlan: [
      "The Greek city grew around the Temple of Apollo and the springs. The Roman colony was laid out on a grid over it, with a large forum on the site of the earlier Greek agora, basilicas, and a monumental road running north to the port at Lechaion.",
      "The Peirene fountain, fed by a system of underground channels and reservoirs, was rebuilt repeatedly across a millennium and is one of the best places anywhere to see the successive phases of a single ancient structure.",
    ],
    economy: [
      "Corinth's wealth came from transit. Goods and, in some periods, whole ships crossed the isthmus rather than sailing round the Peloponnese, and the city taxed the traffic.",
      "The diolkos, a paved trackway with grooves cut for wheeled cradles, ran across the isthmus and is partly excavated. Whether it carried warships regularly, only light vessels, or principally cargo is argued.",
      "Corinthian bronze was famous in antiquity and commanded extraordinary prices under Rome, and Corinthian pottery dominated seventh-century export.",
    ],
    cult: [
      "The Temple of Apollo, of the mid-sixth century BCE, is one of the earliest Doric temples in stone and several of its monolithic columns still stand.",
      "The sanctuary of Demeter and Kore on the slopes of Acrocorinth produced large quantities of votive material and dining rooms for ritual meals.",
      "The Isthmian Games, one of the four panhellenic festivals, were held at the sanctuary of Poseidon a few kilometres away and were administered by Corinth.",
    ],
    atWar: [
      "Acrocorinth is the military fact of the city. Its possession was strategically decisive for control of the Peloponnese, and Philip II garrisoned it as one of the 'fetters of Greece'.",
      "Corinth's fleet was among the strongest in archaic and classical Greece, and the quarrel with its own colony Corcyra was one of the immediate causes of the Peloponnesian War.",
    ],
    population: [
      {
        label: "The classical Greek city",
        figure: "No reliable figure",
        basis: "No ancient count survives",
        level: "unknown",
        assessment:
          "Estimates in the modern literature derive from the walled area and assumed densities, a method that produces very wide ranges and is not independently checkable.",
      },
      {
        label: "The Roman colony at its height",
        figure: "Frequently estimated in the tens of thousands",
        basis: "Modern reconstruction from the built area and the scale of public buildings",
        level: "disputed",
        assessment:
          "The Roman city was clearly large and prosperous. The specific figures quoted in popular accounts have no ancient basis.",
      },
    ],
    monuments: [
      {
        name: "Temple of Apollo",
        date: "c. 560 BCE",
        level: "documented",
        note: "Archaic Doric, with monolithic columns still standing — among the oldest substantial stone temples in Greece.",
      },
      {
        name: "The Peirene fountain",
        date: "Successive phases from the archaic period into the Roman",
        level: "documented",
        note: "A spring house rebuilt over a millennium, and an unusually legible stratigraphy of a single structure.",
      },
      {
        name: "Acrocorinth",
        date: "Fortified from the archaic period through to the Ottoman",
        level: "documented",
        note: "The citadel, with successive circuits of walls and a sanctuary of Aphrodite on the summit.",
      },
      {
        name: "The diolkos",
        date: "Probably late 7th or early 6th century BCE",
        level: "documented",
        note: "A paved trackway across the isthmus with cut grooves, partly excavated. Its function is agreed; the range of vessels it carried is not.",
      },
    ],
    archaeology: {
      level: "documented",
      excavationHistory:
        "Excavated by the American School of Classical Studies since 1896 — one of the longest continuously running excavations in Greece, which is why the site's stratigraphy and its Roman phases are unusually well published.",
      note:
        "Corinth is the standard teaching site for the transition from Greek to Roman urbanism, because the destruction of 146 BCE and the refoundation of 44 BCE give a sharply dated break in the sequence.",
    },
    museums: [
      {
        museum: "Archaeological Museum of Ancient Corinth",
        city: "Ancient Corinth, Greece",
        holdings:
          "Finds from the excavations across all periods, including Corinthian pottery, Roman sculpture and material from the Asklepieion.",
      },
      {
        museum: "Isthmia Archaeological Museum",
        city: "Isthmia, Greece",
        holdings: "Material from the sanctuary of Poseidon and the Isthmian Games.",
      },
    ],
    disputes: [
      {
        question: "What did the diolkos actually carry?",
        positions:
          "Proposals range from regular transport of warships to a facility mainly for cargo transferred between vessels, with the trackway used for the goods rather than the hulls. The engineering constraints and the surviving grooves are the evidence, and they do not settle it.",
        level: "disputed",
      },
      {
        question: "Was the site genuinely abandoned between 146 and 44 BCE?",
        positions:
          "The literary tradition describes total destruction and a century of desolation. Excavation has recovered material from the interval, indicating some continued activity. How much is argued, and the answer bears on how sharp the Greek–Roman break really is.",
        level: "disputed",
      },
    ],
    primarySources: [
      P("Description of Greece", "2.1-5", "The fullest ancient description of the city and Acrocorinth.", "Pausanias"),
      P("Histories", "39", "An eyewitness to the aftermath of the destruction of 146 BCE.", "Polybius"),
      P("Geography", "8.6", "On the isthmus, the harbours and the city's commercial position.", "Strabo"),
    ],
    mapSlugs: ["ancient-greece"],
    figureRefs: [],
    themeRefs: ["war-and-peace"],
    bookRefs: [],
    battleRefs: [],
    warfareRefs: ["fortifications", "naval-warfare", "greek-warfare"],
    relatedCities: ["athens", "sparta", "delphi", "rome"],
    imageSlug: "corinth-temple-of-apollo",
  },
  {
    slug: "delphi",
    name: "Delphi",
    ancientName: "Delphoi; the earlier name Pytho",
    modernName: "Delfi",
    country: "Greece",
    standfirst:
      "Not a city but a sanctuary that behaved like one — the seat of the Greek world's most consulted oracle, and a treasury of dedications from states competing with each other in stone.",
    description:
      "Delphi as a place: the sanctuary of Apollo on the slopes of Parnassus, the Sacred Way and its treasuries, the oracle and the modern arguments about it, the French excavations that moved a village, and the museum.",
    civilizations: ["greece"],
    cityType: "sanctuary",
    period: "Cult from c. 800 BCE; oracle active into the 4th century CE",
    foundation: {
      claim: "Apollo killed the serpent Python at the site and took possession of the oracle; Zeus fixed the spot as the centre of the earth by releasing two eagles from opposite ends of the world.",
      level: "mythological",
      note: "The omphalos stone shown at the sanctuary marked the claim to be the centre of the earth. The archaeological sequence begins with Mycenaean material and a cult from around the eighth century BCE.",
    },
    setting: [
      "Delphi occupies a terrace on the steep southern slope of Parnassus, above a ravine, with the Phaedriades cliffs behind it and the Corinthian Gulf visible far below. The setting does a great deal of the work: the site is theatrical before anything is built on it.",
      "The Castalian spring, where consultants purified themselves, runs from a cleft between the cliffs.",
    ],
    history: [
      "The sanctuary's international standing was established through the archaic period, and by the sixth century BCE it was consulted by states across the Greek world and beyond it — Croesus of Lydia is the famous non-Greek enquirer, and Herodotus makes his consultation a set piece about the ambiguity of oracles.",
      "Delphi was administered by the Amphictyonic League, a religious association of states, and control of it was worth fighting for: several Sacred Wars were fought over the sanctuary, and Philip II's involvement in the last of them was his route into central Greek politics.",
      "The oracle declined under Rome, was plundered by Nero and by Sulla, and was closed with the other pagan sanctuaries at the end of the fourth century CE.",
    ],
    urbanPlan: [
      "The sanctuary is organised around the Sacred Way, a zigzag path climbing the terrace to the Temple of Apollo. Along it stood the treasuries — small temple-like buildings in which individual states housed their dedications.",
      "The treasuries were competitive architecture. Athens built one in marble after Marathon; Siphnos built one of extraordinary richness from the proceeds of its mines; the arrangement is a diplomatic map in stone, and the Athenian treasury has been substantially re-erected.",
      "Above the temple stand the theatre and, higher still, the stadium where the Pythian Games were held.",
    ],
    economy: [
      "Delphi lived on the oracle. Consultation required a fee and a preliminary sacrifice, and states and individuals made dedications that accumulated into a treasury of extraordinary value — which is why the sanctuary was repeatedly plundered.",
      "The Pythian Games, held every four years, brought further traffic. The sanctuary also functioned as a kind of bank and archive for the Greek world, holding deposits and records.",
    ],
    cult: [
      "The Pythia, a local woman, delivered the responses from within the temple. Ancient descriptions have her seated on a tripod; the mechanics of what she did and how her utterances were rendered into the hexameter responses that were recorded are not clearly attested.",
      "Consultation was highly regulated: purification at Castalia, a preliminary sacrifice whose acceptance had to be signalled by the victim's reaction, a fixed number of consultation days, and an order of precedence that states negotiated over.",
      "Apollo was believed to be absent in winter, when Dionysus held the sanctuary. The pairing of the two gods at the most orderly oracle in Greece is a genuine feature of the cult and not a modern literary idea.",
    ],
    atWar: [
      "Delphi was not a military site, but it was a strategic asset. Control of the Amphictyonic council carried political weight across central Greece, and the Sacred Wars were fought over it.",
      "Its wealth also made it a target: the sanctuary was plundered by the Phocians in the fourth century BCE to pay mercenaries, an act that shocked the Greek world and triggered the war that brought Philip south.",
    ],
    population: [
      {
        label: "Resident population of the sanctuary settlement",
        figure: "Small; no figure survives",
        basis: "No ancient count",
        level: "unknown",
        assessment:
          "Delphi was a sanctuary with a service community attached, not a city with a citizen body of significant size. Its importance is entirely disproportionate to the number of people who lived there.",
      },
    ],
    monuments: [
      {
        name: "Temple of Apollo",
        date: "The visible remains are of the 4th century BCE, replacing a 6th-century temple",
        level: "documented",
        note: "The maxims 'know thyself' and 'nothing in excess' were reported by ancient authors to have been inscribed at the temple.",
      },
      {
        name: "The Athenian Treasury",
        date: "Early 5th century BCE",
        level: "documented",
        note: "Re-erected in the early twentieth century. Pausanias reports it was built from the spoils of Marathon; the dating is argued and some scholars place it slightly earlier.",
      },
      {
        name: "The Siphnian Treasury",
        date: "c. 525 BCE",
        level: "documented",
        note: "Its frieze, including a gigantomachy, is among the finest archaic sculpture surviving, and is in the site museum.",
      },
      {
        name: "The theatre and the stadium",
        date: "4th century BCE and later",
        level: "documented",
        note: "The stadium, high above the sanctuary, is among the best preserved in Greece.",
      },
    ],
    archaeology: {
      level: "documented",
      excavationHistory:
        "The French School at Athens conducted the Grande Fouille from 1892, which required the relocation of the village of Kastri that stood on top of the sanctuary — an operation that would be handled very differently today, and which is part of the site's own modern history.",
      note:
        "Delphi's inscriptions are among its most valuable products: manumission records, accounts, and the Amphictyonic decrees give a documentary record of the sanctuary's administration alongside the monuments.",
    },
    museums: [
      {
        museum: "Delphi Archaeological Museum",
        city: "Delphi, Greece",
        holdings:
          "The Charioteer of Delphi, a bronze of about 470 BCE surviving from a larger group; the Siphnian Treasury frieze; the Naxian Sphinx; the omphalos; and the Delphic hymns to Apollo, inscribed with musical notation.",
      },
    ],
    disputes: [
      {
        question: "Were the Pythia's utterances induced by gases from the ground?",
        positions:
          "Ancient authors including Plutarch, himself a priest at Delphi, describe a pneuma or vapour. A geological study published in 2001 identified faults beneath the temple and proposed ethylene as an intoxicant. The proposal attracted wide publicity and substantial criticism, on the grounds of the concentrations required and the reliability of the sampling. It is not established.",
        level: "disputed",
      },
      {
        question: "How were the responses actually produced?",
        positions:
          "Whether the Pythia spoke intelligibly and priests versified her answers, or whether she delivered hexameters directly, is not settled by the sources, which differ and are mostly late. The recorded responses are also a heavily filtered sample: ambiguous ones were more memorable and more likely to be transmitted.",
        level: "disputed",
      },
    ],
    primarySources: [
      P("Description of Greece", "10.5-32", "The fullest ancient description of the sanctuary and its dedications, monument by monument.", "Pausanias"),
      P("Histories", "1.46-55, 7.140-143", "Croesus's test of the oracles, and the 'wooden wall' response to Athens before Salamis.", "Herodotus"),
      P("On the Obsolescence of Oracles", "throughout", "By a priest at Delphi, discussing the decline of the oracle and the nature of the pneuma.", "Plutarch"),
    ],
    mapSlugs: ["ancient-greece"],
    figureRefs: ["plutarch"],
    themeRefs: ["state-and-religion"],
    bookRefs: [],
    battleRefs: ["plataea"],
    warfareRefs: ["greek-warfare"],
    relatedCities: ["olympia", "athens", "corinth"],
    imageSlug: "delphi-athenian-treasury",
  },
  {
    slug: "olympia",
    name: "Olympia",
    ancientName: "Olympia",
    modernName: "Archaia Olympia",
    country: "Greece",
    standfirst:
      "A sanctuary of Zeus in a river valley in the western Peloponnese, and the site of the games that gave the Greek world its shared calendar.",
    description:
      "Olympia as a place: the Altis sanctuary, the Temple of Zeus and Phidias's lost colossal statue, the workshop where the cup inscribed with his name was found, the stadium, and the German excavations that have run since 1875.",
    civilizations: ["greece"],
    cityType: "sanctuary",
    period: "Cult from c. 1000 BCE; games traditionally from 776 BCE to 393 CE",
    foundation: {
      claim: "The games were founded by Heracles, or by Pelops after his chariot victory over Oenomaus.",
      level: "mythological",
      note: "Competing foundation stories, both belonging to the tradition. The conventional date of 776 BCE for the first games is a later Greek calculation from victor lists, not a contemporary record, and should not be treated as a fixed point.",
    },
    setting: [
      "Olympia lies in a quiet valley at the confluence of the Alpheios and the Kladeos, in Elis, well away from any major city. That remoteness is part of its function: it was neutral ground.",
      "The sacred precinct, the Altis, is a walled grove rather than an urban centre, with the administrative and athletic buildings arranged around it.",
    ],
    history: [
      "Cult activity at the site begins around the end of the second millennium BCE, with very large numbers of bronze votive tripods and figurines from the Geometric period — the earliest evidence for the sanctuary's panhellenic reach.",
      "The games structured Greek time. Dating by Olympiads, four-year cycles counted from the traditional first games, was the nearest thing the Greek world had to a common chronology, and a sacred truce protected travel to the festival.",
      "The sanctuary was enriched continuously by states and individuals until the Roman period, plundered progressively in late antiquity, and closed with the other pagan sanctuaries at the end of the fourth century CE. Earthquake and the shifting rivers then buried it, which is why so much survived to be excavated.",
    ],
    urbanPlan: [
      "The Altis contains the Temple of Zeus at its centre, the older Temple of Hera to the north, the Pelopion, treasuries built by individual states along a terrace, and the Philippeion, a round building begun by Philip II after Chaeronea.",
      "Outside the sacred enclosure lie the practical buildings: the palaestra and gymnasium for training, the Leonidaion guest house, the bouleuterion where competitors swore their oath, and the workshop of Phidias, built to the internal dimensions of the temple cella so that the statue could be assembled and tested at full size.",
      "The stadium lies east of the Altis, entered through a vaulted passage, with earth banks for spectators and no seating — some forty-five thousand people stood.",
    ],
    economy: [
      "Olympia had no economy of its own beyond the festival. Its wealth was dedications: bronzes, statues, arms taken as spoils and inscribed with the name of the defeated, and the treasuries in which states housed their gifts.",
      "The inscribed spoils are historically valuable in a way the dedicators did not intend. Helmets and shields dedicated after victories carry the names of the states involved, and one Corinthian helmet from the site is inscribed as taken from the Argives.",
    ],
    cult: [
      "The great altar of Zeus was built up over centuries from the ash of sacrifices. Pausanias describes it and gives its dimensions.",
      "The Temple of Zeus, built by Libon of Elis around 470–456 BCE, housed Phidias's chryselephantine seated Zeus, counted among the Seven Wonders. The statue is lost; nothing survives of it beyond descriptions and representations on coins.",
      "The Heraion is the older temple, and its columns were replaced in stone piecemeal over centuries as the original wooden ones decayed — Pausanias records that one oak column still stood in his day, which excavation has borne out as a plausible description of the building's history.",
    ],
    atWar: [
      "Olympia was neutral ground protected by a sacred truce, but it was thoroughly implicated in Greek warfare. The dedications are largely military spoils, and the sanctuary is the single richest source of Greek arms and armour.",
      "Philip II's Philippeion, a round monument housing gold and ivory statues of his family, was built after Chaeronea and placed inside the Altis. Putting a dynastic monument in the panhellenic sanctuary was a political statement everyone understood.",
    ],
    population: [
      {
        label: "Permanent residents",
        figure: "Very small; no figure survives",
        basis: "No ancient count",
        level: "unknown",
        assessment:
          "A sanctuary staff and service community. The festival crowd was many times the resident population and is itself estimated only from the capacity of the stadium banks.",
      },
      {
        label: "Spectators at the games",
        figure: "Commonly given as about 45,000",
        basis: "Modern estimate from the dimensions of the stadium embankments",
        level: "probable",
        assessment:
          "An engineering estimate from the standing area rather than an ancient statement. It gives an order of magnitude and no more.",
      },
    ],
    monuments: [
      {
        name: "Temple of Zeus",
        date: "c. 470–456 BCE, by Libon of Elis",
        level: "documented",
        note: "Its pedimental sculpture and the metopes of the labours of Heracles survive substantially and are in the site museum. The columns lie where earthquake dropped them.",
      },
      {
        name: "The Heraion",
        date: "c. 600 BCE",
        level: "documented",
        note: "One of the earliest monumental temples in Greece, and a record in stone of the gradual replacement of wooden columns.",
      },
      {
        name: "The workshop of Phidias",
        date: "Mid-5th century BCE",
        level: "documented",
        note: "Identified by excavation, with tools, ivory and moulds, and a black-glaze cup inscribed 'I belong to Phidias' — one of the most direct connections between a named ancient artist and a building that survives.",
      },
      {
        name: "The Philippeion",
        date: "Begun after 338 BCE",
        level: "documented",
        note: "A circular monument to Philip II's family, placed inside the sacred precinct.",
      },
      {
        name: "The stadium",
        date: "Successive phases; the surviving form is 5th–4th century BCE",
        level: "documented",
        note: "A running track with stone start and finish sills still in place, entered by a vaulted tunnel.",
      },
    ],
    archaeology: {
      level: "documented",
      excavationHistory:
        "Excavated by the German Archaeological Institute from 1875 in one of the first excavations conducted under a formal agreement leaving the finds in the host country — a precedent in the history of the discipline. Work has continued in campaigns ever since.",
      note:
        "The site's burial under river silt and earthquake debris preserved an unusual amount, including the temple sculpture and the workshop deposit. Olympia is the principal source of Greek bronze arms and armour, most of it dedicated as spoils and much of it inscribed.",
    },
    museums: [
      {
        museum: "Archaeological Museum of Olympia",
        city: "Archaia Olympia, Greece",
        holdings:
          "The pediments and metopes of the Temple of Zeus; the Hermes attributed to Praxiteles; the Nike of Paionios; the helmet inscribed as dedicated by Miltiades; and the cup of Phidias.",
        note: "The attribution of the Hermes to Praxiteles rests on a passage in Pausanias and is argued; the statue may be a later copy.",
      },
      {
        museum: "Museum of the History of the Olympic Games in Antiquity",
        city: "Archaia Olympia, Greece",
        holdings: "Material relating to the games, victors and athletic practice.",
      },
    ],
    disputes: [
      {
        question: "Is the date 776 BCE for the first games reliable?",
        positions:
          "It is a Hellenistic back-calculation from victor lists compiled long after the fact, not a contemporary record. Archaeological activity at the site begins earlier than that date and does not mark it. It should be treated as a traditional date, not an established one.",
        level: "disputed",
      },
      {
        question: "Is the Hermes of Olympia by Praxiteles?",
        positions:
          "Pausanias saw a Hermes by Praxiteles in the Heraion, and a Hermes was found there. Whether the surviving statue is the fourth-century original or a Hellenistic or Roman copy has been argued since its discovery on technical grounds. Unresolved.",
        level: "disputed",
      },
    ],
    primarySources: [
      P("Description of Greece", "5-6", "Two entire books on Olympia, the fullest ancient description of any Greek sanctuary, listing monuments and victors.", "Pausanias"),
      P("Histories", "throughout", "References to the games as a panhellenic institution and to the Olympiad dating system.", "Herodotus"),
    ],
    mapSlugs: ["ancient-greece"],
    figureRefs: ["philip-ii"],
    themeRefs: ["state-and-religion", "education"],
    bookRefs: [],
    battleRefs: ["chaeronea"],
    warfareRefs: ["armour", "helmets", "shields", "greek-warfare"],
    relatedCities: ["delphi", "athens", "sparta", "corinth"],
    imageSlug: "olympia-temple-of-zeus",
  },

  {
    slug: "rome",
    name: "Rome",
    ancientName: "Roma",
    modernName: "Rome",
    country: "Italy",
    standfirst:
      "The largest city in the ancient Mediterranean, and the one whose archaeology is hardest to read because it never stopped being lived in.",
    description:
      "Ancient Rome as a place: the seven hills and the Tiber, the Forum and the imperial fora, the water and grain supply that made a city of that size possible, the walls, and the excavation history of a site under a living capital. For the Republic and the Empire as political orders, see the Rome civilization page.",
    civilizations: ["rome", "roman-republic", "principate", "late-empire"],
    civilizationCounterpart: "rome",
    cityType: "imperial-capital",
    period: "Settlement from the 10th century BCE; imperial capital to the 4th century CE",
    foundation: {
      claim: "Founded by Romulus on 21 April 753 BCE, after he and his twin were suckled by a she-wolf.",
      level: "mythological",
      note: "The date is a late Republican calculation, not a record, and the twins belong to civic myth. Archaeologically there is Iron Age settlement on the Palatine from around the tenth century BCE, and the traces of an early wall on the Palatine reported in 1988 have been claimed as a foundation-period circuit — a claim that is disputed.",
    },
    setting: [
      "Rome grew on hills above a bend in the Tiber at the lowest convenient crossing point, some twenty-five kilometres inland — far enough from the sea to be safe from raiders, close enough to reach it.",
      "The low ground between the hills was marshy and had to be drained; the Cloaca Maxima, originally an open channel, is the engineering that made the Forum usable and is still functioning as a drain.",
    ],
    history: [
      "The city expanded from hilltop villages into a single settlement through the seventh and sixth centuries BCE, under kings whose historicity is uneven and whose last, Tarquin the Proud, the tradition says was expelled in 509 BCE.",
      "Republican Rome grew by conquest and absorbed the population and the plunder of the Mediterranean. The late Republic saw the first great building programmes financed by commanders; Augustus claimed to have found a city of brick and left one of marble, and the claim is reported by Suetonius rather than made in his own Res Gestae.",
      "The imperial city reached a scale nothing in Europe would match again for a millennium and a half. It was sacked in 410 and 455 CE, and its population collapsed in late antiquity, leaving monuments standing in a much smaller town.",
    ],
    urbanPlan: [
      "Rome, like Athens, was not planned. It grew, burned and was rebuilt piecemeal, and its street pattern was irregular enough that Tacitus records the debate after the fire of 64 CE about whether the new regular streets were an improvement or made the city hotter.",
      "The Forum Romanum was the civic centre; when it filled, emperors built additional fora beside it, culminating in Trajan's. The Campus Martius held theatres, baths and monuments; the Palatine held imperial residences; the Aventine and Trastevere held much of the working population.",
      "Ordinary Romans lived in insulae, multi-storey apartment blocks. Because Rome's own examples are largely buried under the modern city, the best evidence for how they worked comes from Ostia.",
      "The Servian Wall enclosed the Republican city; the Aurelian Walls, built 271–275 CE, enclose a far larger area and largely survive.",
    ],
    economy: [
      "The city consumed and did not produce. Grain came from Sicily, North Africa and Egypt, was landed at Ostia and Portus and moved upriver, and was distributed to a registered list of recipients — some 200,000 adult male citizens under Augustus.",
      "Water arrived by aqueduct in quantities no European city matched again until the nineteenth century. Frontinus, appointed water commissioner in 97 CE, wrote a treatise on the system that is our best account of Roman public administration in operation.",
      "The Monte Testaccio is the physical residue of the supply: an artificial hill some fifty metres high composed of an estimated fifty-three million discarded olive-oil amphorae, whose stamps record the shippers and the provinces they came from.",
    ],
    cult: [
      "The Capitoline temple of Jupiter Optimus Maximus was the state cult's centre, and a Roman triumph ended there.",
      "The Forum held the temple of Vesta and the house of the Vestals, whose maintenance of the sacred fire was a state responsibility, and the Regia, the office of the pontifex maximus.",
      "The city accumulated foreign cults continuously — Magna Mater from 204 BCE, Isis, Mithras, and eventually Christianity — and the mithraea excavated beneath later churches are among the most vivid religious survivals.",
    ],
    atWar: [
      "Rome was not besieged successfully for eight centuries after the Gallic sack traditionally dated to 390 BCE, which is why the Republican city could afford to outgrow its walls.",
      "The Aurelian Walls, built in the 270s CE, are the physical marker of a changed strategic situation: the capital of the empire now needed defending.",
    ],
    population: [
      {
        label: "The city at its height, 1st–2nd century CE",
        figure: "Commonly given as about one million",
        basis: "Modern inference from the number of grain-dole recipients, the built area and assumed household sizes and densities",
        level: "disputed",
        assessment:
          "There was no census of city residents; the Roman census counted citizens across the empire. The million figure is a reconstruction, and serious estimates range from roughly 500,000 to over a million. It is quoted with a confidence the method does not support, though the conclusion that Rome was far larger than any other ancient Mediterranean city is secure.",
      },
      {
        label: "Recipients of the grain dole under Augustus",
        figure: "About 200,000",
        basis: "Res Gestae 15, in which Augustus records his distributions",
        level: "documented",
        assessment:
          "A documented administrative figure, and the firmest quantity we have for the city. It counts adult male citizens on a register, not residents: women, children, non-citizens and the enslaved are all outside it, which is why converting it into a total population requires assumptions that are where the disagreement lives.",
      },
    ],
    monuments: [
      {
        name: "The Forum Romanum",
        date: "Developed from the 7th century BCE onwards",
        level: "documented",
        note: "The civic centre, containing the Curia, the rostra, the temple of Vesta and successive basilicas.",
        imageSlug: "roman-forum-view",
      },
      {
        name: "The Colosseum",
        date: "Inaugurated 80 CE",
        level: "documented",
        note: "The Flavian Amphitheatre, built on the site of the lake of Nero's Golden House — a deliberate return of appropriated land to public use.",
      },
      {
        name: "The Pantheon",
        date: "Hadrianic, c. 126 CE, on Agrippan foundations",
        level: "documented",
        note: "Its unreinforced concrete dome remains the largest of its kind. It survives because it became a church in the seventh century.",
      },
      {
        name: "Trajan's Column and Forum",
        date: "Column completed 113 CE",
        level: "documented",
        note: "The column's helical relief is the fullest pictorial source for the Roman army on campaign, and an idealised state monument.",
        imageSlug: "trajans-column",
      },
      {
        name: "The Aurelian Walls",
        date: "271–275 CE",
        level: "documented",
        note: "Nineteen kilometres of circuit, largely surviving, marking the point at which the capital required defending.",
      },
    ],
    archaeology: {
      level: "documented",
      excavationHistory:
        "Rome has been excavated continuously since the Renaissance, and the history of that work is inseparable from politics. The clearances of the 1920s and 1930s under the Fascist regime opened the imperial fora by demolishing an inhabited quarter and driving a road through the site, exposing monuments and destroying stratigraphy and later phases. Modern work is largely rescue archaeology conducted under a living city, most visibly during metro construction.",
      note:
        "The central difficulty is that Rome never stopped being occupied. Ground level has risen many metres, monuments were quarried for building material, and much of the ancient city is inaccessible beneath the modern one. Ostia and Pompeii are studied partly because they preserve what Rome cannot.",
    },
    museums: [
      {
        museum: "Capitoline Museums",
        city: "Rome",
        holdings:
          "Founded in 1471 with a papal donation of bronzes, and generally described as the oldest public museum collection. Holds the she-wolf, the colossal Constantine fragments and the equestrian Marcus Aurelius.",
      },
      {
        museum: "Museo Nazionale Romano (Palazzo Massimo, Baths of Diocletian, Palazzo Altemps, Crypta Balbi)",
        city: "Rome",
        holdings:
          "Sculpture, frescoes including those from the Villa of Livia, mosaics, and the coin collection. The Crypta Balbi site is an exceptional demonstration of a single block's stratigraphy from antiquity to the present.",
      },
      {
        museum: "Vatican Museums",
        city: "Vatican City",
        holdings:
          "The Laocoön, the Apollo Belvedere, the Augustus of Prima Porta and a very large collection of Roman sculpture and inscriptions.",
      },
    ],
    disputes: [
      {
        question: "How many people lived in imperial Rome?",
        positions:
          "Estimates from roughly 500,000 to over a million are all defended. The disagreement turns on how to convert the grain-dole register into a total, what household size to assume, and how densely insulae were occupied. No method is decisive.",
        level: "disputed",
      },
      {
        question: "Is there archaeological evidence for a foundation in the eighth century BCE?",
        positions:
          "Excavation on the Palatine has produced Iron Age huts and, in work published from the late 1980s, traces of an early wall claimed as a foundation-period circuit consistent with the traditional date. The interpretation is contested, and the coincidence with a date calculated centuries later invites caution.",
        level: "disputed",
      },
    ],
    primarySources: [
      P("Res Gestae Divi Augusti", "throughout", "Augustus's own account of his building and distributions, inscribed publicly across the empire.", "Augustus"),
      P("On the Water Supply of the City of Rome", "throughout", "The water commissioner's technical and administrative account of the aqueducts.", "Frontinus"),
      P("Annals", "15.38-43", "The fire of 64 CE and the rebuilding, including the debate about regular streets.", "Tacitus"),
      P("Natural History", "36", "On the city's building materials and monuments.", "Pliny the Elder"),
    ],
    mapSlugs: ["roman-republic", "roman-empire"],
    figureRefs: ["julius-caesar", "augustus", "trajan", "cicero"],
    themeRefs: ["army-and-state", "war-and-peace"],
    bookRefs: [],
    battleRefs: [],
    warfareRefs: ["roman-engineering", "roman-roads", "fortifications", "roman-warfare"],
    relatedCities: ["ostia", "pompeii", "corinth", "alexandria"],
    imageSlug: "roman-forum-view",
  },
  {
    slug: "ostia",
    name: "Ostia",
    ancientName: "Ostia Antica",
    modernName: "Ostia Antica",
    country: "Italy",
    standfirst:
      "Rome's river port, and the best-preserved ordinary Roman town anywhere — the place to see how most Romans actually lived, because it was not destroyed but simply abandoned.",
    description:
      "Ostia as a place: the castrum origins, the harbour trade, the apartment blocks that are our principal evidence for Roman multi-storey housing, the guild offices with their mosaic advertisements, and the excavations.",
    civilizations: ["rome", "roman-republic", "principate"],
    cityType: "port",
    period: "4th century BCE – 5th century CE",
    foundation: {
      claim: "Founded by Ancus Marcius, fourth king of Rome, in the 7th century BCE.",
      level: "disputed",
      note: "The literary tradition is consistent about Ancus Marcius. Excavation has produced nothing earlier than the fourth century BCE castrum, and the discrepancy is unresolved: either the earlier settlement lies elsewhere or under the water table, or the tradition is a back-projection.",
    },
    setting: [
      "Ostia stood at the mouth of the Tiber, about twenty-five kilometres downstream from Rome — the point where seaborne cargo transferred to river barges. Silting has since moved the coastline several kilometres, so the site is now inland.",
      "Its purpose was entirely functional: it existed because Rome needed a port and the Tiber mouth was where one had to be.",
    ],
    history: [
      "The earliest structure excavated is a rectangular fortified castrum of the fourth century BCE, laid out on a military plan whose main streets still govern the town's layout.",
      "The town grew with Rome's grain trade. Claudius and then Trajan built artificial harbours to the north at Portus, because the river mouth could not handle the volume, and over time Portus took the shipping while Ostia remained the administrative and residential centre.",
      "Ostia declined from the third century CE with the reduction of Rome's population and the shift of activity to Portus, and was gradually abandoned rather than destroyed — which is why so much stands.",
    ],
    urbanPlan: [
      "The castrum grid survives as the core, with the decumanus running through the town and later development spreading outward without a single scheme.",
      "The forum holds the Capitolium and a basilica. The theatre backs onto the Piazzale delle Corporazioni, a colonnaded square whose floor mosaics advertise the shipping firms and trades that had offices there, naming their home ports across the Mediterranean.",
      "Most residents lived in insulae — brick-faced concrete apartment blocks of several storeys with shops at street level, staircases to upper flats, and shared courtyards. Ostia's are the best preserved anywhere and are the principal evidence for the type that dominated Rome itself.",
    ],
    economy: [
      "Grain, oil and wine landed here for Rome. The horrea, large warehouse complexes with raised floors and secure courtyards, are among the most substantial structures in the town.",
      "The Piazzale mosaics are a directory of the trade: they name shippers from Carthage, from Narbonne, from Alexandria and elsewhere, and depict the ships and the goods.",
      "Service trades — bakeries with their millstones in place, fullers' workshops, bars with marble counters — survive in a completeness that lets ordinary economic life be read directly.",
    ],
    cult: [
      "The Capitolium dominates the forum. Alongside it, Ostia preserves an unusual density of the cults an international port attracted: at least eighteen mithraea are known, along with a synagogue near the shore that is among the oldest known in Europe, and temples of Magna Mater and of Egyptian deities.",
      "That mixture is one of the site's most valuable features. It shows the religious life of a working Roman town rather than of a capital or a sanctuary.",
    ],
    atWar: [
      "Ostia's military history is thin, which is part of its interest: it was a working town rather than a fortress. The original castrum was defensive; later walls enclosed a much larger area under Sulla.",
      "Its strategic importance was logistical. Interruption of the grain route through Ostia and Portus threatened Rome directly, which is why control of the sea lanes mattered politically as well as militarily.",
    ],
    population: [
      {
        label: "The town at its height, 2nd century CE",
        figure: "Commonly estimated at 50,000–60,000",
        basis: "Modern reconstruction from the excavated area and the density of insulae",
        level: "disputed",
        assessment:
          "No ancient figure survives. The estimate rests on assumptions about occupancy of apartment blocks that are themselves derived from Ostia, which makes the reasoning partly circular. It indicates a substantial town and no more.",
      },
    ],
    monuments: [
      {
        name: "The Piazzale delle Corporazioni",
        date: "1st–2nd century CE",
        level: "documented",
        note: "Sixty-odd offices around a portico, each with a floor mosaic naming and illustrating its trade and home port. A commercial directory in stone.",
      },
      {
        name: "The insulae",
        date: "Principally 2nd century CE",
        level: "documented",
        note: "Multi-storey brick-faced apartment blocks, the best-preserved examples of the housing type in which most urban Romans lived.",
      },
      {
        name: "The Horrea Epagathiana and other warehouses",
        date: "2nd century CE",
        level: "documented",
        note: "Secure storage complexes with raised floors, showing how the grain supply was physically handled.",
      },
      {
        name: "The theatre",
        date: "Augustan, enlarged c. 196 CE",
        level: "documented",
        note: "Restored and still used for performance.",
      },
      {
        name: "The synagogue",
        date: "Origins possibly 1st century CE, with later rebuilding",
        level: "probable",
        note: "Near the ancient shoreline, and among the oldest known synagogue buildings in Europe. The dating of its earliest phase is argued.",
      },
    ],
    archaeology: {
      level: "documented",
      excavationHistory:
        "Excavated intermittently from the nineteenth century and then on a very large scale between 1938 and 1942, when the regime cleared roughly two-thirds of the town at speed for a planned exposition. That campaign exposed an enormous area and recorded it poorly by modern standards, and much late-antique material was removed to reach the imperial phases.",
      note:
        "Ostia's value is that it was abandoned rather than destroyed, and buried by silt. It preserves the ordinary fabric — housing, shops, warehouses, bars, latrines — that catastrophic sites like Pompeii preserve as a moment and that living cities like Rome have lost.",
    },
    museums: [
      {
        museum: "Museo Ostiense",
        city: "Ostia Antica, Italy",
        holdings:
          "Sculpture, portraits, sarcophagi and mithraic material from the site, displayed on the excavation.",
      },
      {
        museum: "Museo delle Navi",
        city: "Fiumicino, Italy",
        holdings: "Ships and harbour material recovered from Portus, the artificial harbours that succeeded Ostia.",
      },
    ],
    disputes: [
      {
        question: "Why is there nothing at Ostia earlier than the 4th century BCE?",
        positions:
          "The tradition attributes the foundation to a seventh-century king. Proposals to reconcile this include an earlier settlement at a different location on the changing river mouth, or one lying below the modern water table and so unexcavated. The alternative is that the attribution to Ancus Marcius is a later construction. Unresolved.",
        level: "disputed",
      },
    ],
    primarySources: [
      P("History of Rome", "1.33", "The attribution of the foundation to Ancus Marcius.", "Livy"),
      P("Geography", "5.3", "On the Tiber mouth, its silting and the difficulty of the harbour.", "Strabo"),
      P("The Piazzale delle Corporazioni mosaics", "in situ", "Sixty-odd inscribed and illustrated trade advertisements naming firms and home ports — a documentary source that is also the floor.", "Ostian guilds"),
    ],
    mapSlugs: ["roman-empire"],
    figureRefs: ["trajan", "augustus"],
    themeRefs: [],
    bookRefs: [],
    battleRefs: [],
    warfareRefs: ["logistics", "military-supply", "roman-navy"],
    relatedCities: ["rome", "pompeii", "alexandria"],
    imageSlug: "ostia-street",
  },
  {
    slug: "pompeii",
    name: "Pompeii",
    ancientName: "Pompeii",
    modernName: "Pompei",
    country: "Italy",
    standfirst:
      "A moderately prosperous Campanian town destroyed in a single day, and the closest thing archaeology has to a moment rather than a sequence.",
    description:
      "Pompeii as a place: the town before Vesuvius, the eruption and the arguments about its date, the houses and their paintings, the casts, the excavation history from 1748 to the present, and the collections in Naples.",
    civilizations: ["rome", "principate"],
    cityType: "provincial-town",
    period: "Settlement from the 7th century BCE; destroyed 79 CE",
    foundation: {
      claim: "An Oscan settlement, later under Etruscan and Greek influence, becoming a Roman colony in 80 BCE.",
      level: "documented",
      note: "The sequence is attested archaeologically and epigraphically. Oscan inscriptions survive in the town, including street-corner directions painted for the defenders during Sulla's siege.",
    },
    setting: [
      "Pompeii stood on a spur of old lava above the Sarno plain, near the coast, about ten kilometres from the summit of Vesuvius. The volcanic soil was exceptionally fertile, which is why the region was densely settled and wealthy.",
      "That Vesuvius was a volcano was not generally understood before 79 CE. A severe earthquake in 62 or 63 CE damaged the town heavily, and repairs were still in progress when it was buried.",
    ],
    history: [
      "The town passed through Oscan, Etruscan, Greek and Samnite influence before falling to Rome, and was made a colony for Sullan veterans in 80 BCE after resisting in the Social War.",
      "It was a working town of moderate wealth: agriculture, wine, garum, textiles, and a good deal of small manufacturing.",
      "The eruption buried it under several metres of pumice and then pyroclastic flow. Rescue and looting began almost immediately and continued sporadically; the site was rediscovered in the eighteenth century.",
    ],
    urbanPlan: [
      "The street grid is irregular in the older quarter and regular in the later expansion, with stepping stones at crossings and deep ruts worn by cart wheels.",
      "The forum holds the temples, the basilica and the market buildings; the amphitheatre sits at the far end of the town, and the theatres in their own quarter.",
      "Houses range from very large peristyle residences to single rooms behind shops, and the mixture along a single street is one of the most important things the site shows: rich and poor were not zoned apart.",
    ],
    economy: [
      "Wine and oil from the surrounding estates, garum, bread from commercial bakeries whose ovens and millstones survive, fulling and dyeing, and a great deal of retail.",
      "The town's commercial life is legible from its walls. Painted electoral notices, rental advertisements, price lists and thousands of graffiti survive because they were plastered over by ash rather than weathered away.",
    ],
    cult: [
      "The forum temples include the Capitolium and a temple of Apollo. A temple of Isis, rebuilt after the earthquake, is among the best-preserved Isis sanctuaries anywhere.",
      "Household shrines survive throughout the town, which makes Pompeii the principal evidence for domestic Roman religion — the daily practice that literary sources rarely describe.",
      "The Villa of the Mysteries, outside the walls, carries a painted frieze usually read as an initiation into a Dionysiac cult. The reading is standard and the specific interpretation is argued.",
    ],
    atWar: [
      "Pompeii's walls carry the marks of Sulla's siege in 89 BCE, including impact scars from artillery, alongside painted Oscan directions to the defenders.",
      "The amphitheatre was the scene of a riot between Pompeians and Nucerians in 59 CE that was serious enough for the Senate to ban games there for ten years. Tacitus reports it, and a wall painting in the town depicts it.",
    ],
    population: [
      {
        label: "The town at the time of the eruption",
        figure: "Commonly estimated at 11,000–15,000",
        basis: "Modern reconstruction from the walled area, the number of houses and theatre and amphitheatre capacity",
        level: "disputed",
        assessment:
          "No ancient figure survives. The estimate is unusually well founded compared with most ancient cities, because the entire walled area is known and the housing stock can be counted, but occupancy per house remains an assumption.",
      },
      {
        label: "Those killed",
        figure: "Around 1,100 bodies recovered within the excavated area",
        basis: "Excavation record",
        level: "documented",
        assessment:
          "A count of what has been found, not of the dead. Much of the town is unexcavated, many residents fled, and many died outside the walls — several hundred were found at the shore at Herculaneum. The total death toll of the eruption is unknown.",
      },
    ],
    monuments: [
      {
        name: "The Forum",
        date: "Successive phases to 79 CE",
        level: "documented",
        note: "Still under repair from the earthquake when the eruption came, which is itself informative about the town's condition.",
      },
      {
        name: "The Amphitheatre",
        date: "c. 70 BCE",
        level: "documented",
        note: "The earliest surviving permanent stone amphitheatre known, predating the Colosseum by a century and a half.",
      },
      {
        name: "The House of the Faun",
        date: "2nd century BCE, with later phases",
        level: "documented",
        note: "One of the largest houses in the town. Its floor carried the Alexander Mosaic, now in Naples, which is the principal image of Alexander in battle to survive from antiquity.",
        imageSlug: "alexander-mosaic",
      },
      {
        name: "The Villa of the Mysteries",
        date: "2nd century BCE, frescoes c. 60–50 BCE",
        level: "documented",
        note: "A suburban villa whose megalography frieze is among the best-preserved large-scale Roman painting.",
      },
      {
        name: "The Temple of Isis",
        date: "Rebuilt after the earthquake of 62/63 CE",
        level: "documented",
        note: "Among the best-preserved sanctuaries of Isis in the Roman world, and an early modern rediscovery that influenced European taste.",
      },
    ],
    archaeology: {
      level: "documented",
      excavationHistory:
        "Excavation began in 1748 under Bourbon patronage as treasure-hunting, and became systematic under Giuseppe Fiorelli from 1863, who divided the town into regions and blocks — the system still in use — and developed the technique of pouring plaster into voids left by decayed bodies to produce the casts. Twentieth-century campaigns exposed large areas; conservation of what was exposed has been a persistent failure, with collapses continuing into the present century. Roughly a third of the town remains deliberately unexcavated as a reserve for future methods.",
      note:
        "Pompeii's unique value is that it preserves a moment: meals, furniture, graffiti, unfinished repairs. Its unique danger is the temptation to read that moment as typical. It was one prosperous town in one fertile region on one day, and its housing, its diet and its wall-painting are not automatically representative of the empire.",
    },
    museums: [
      {
        museum: "Museo Archeologico Nazionale di Napoli",
        city: "Naples, Italy",
        holdings:
          "The great majority of the movable finds: the Alexander Mosaic, the bronzes from the Villa of the Papyri at Herculaneum, wall paintings removed from the houses, silver, and the Farnese collection.",
        note: "Most of the paintings and mosaics visible at Pompeii today are reproductions; the originals were removed to Naples, which is why the site and the museum have to be read together.",
      },
      {
        museum: "Antiquarium of Pompeii",
        city: "Pompei, Italy",
        holdings: "Material displayed on site, including casts and objects from recent excavation.",
      },
    ],
    disputes: [
      {
        question: "When in 79 CE did the eruption happen?",
        positions:
          "Pliny the Younger's letter, in the manuscripts as transmitted, gives 24 August. Against that: the victims' clothing, the autumn fruit and nuts found, the braziers in use, and a charcoal inscription uncovered in 2018 that appears to be dated to mid-October. Many specialists now favour an autumn date and treat the August reading as a manuscript corruption. It is not settled.",
        level: "disputed",
      },
      {
        question: "What does the Villa of the Mysteries frieze depict?",
        positions:
          "The standard reading is a Dionysiac initiation, possibly of a bride. Alternatives have proposed a theatrical subject or a sequence of ritual scenes without a single narrative. No text identifies it.",
        level: "disputed",
      },
    ],
    primarySources: [
      P("Letters", "6.16 and 6.20", "The eyewitness account of the eruption written to Tacitus roughly twenty-five years later, describing the death of Pliny the Elder and the writer's own escape.", "Pliny the Younger"),
      P("Annals", "14.17", "The riot in the amphitheatre in 59 CE and the Senate's response.", "Tacitus"),
      P("The graffiti and painted inscriptions of Pompeii", "CIL IV", "Several thousand texts on walls — electoral notices, prices, insults, verse — preserved by burial. An unparalleled record of ordinary written Latin.", "The inhabitants"),
    ],
    mapSlugs: ["roman-empire"],
    figureRefs: ["tacitus"],
    themeRefs: [],
    bookRefs: [],
    battleRefs: ["issus"],
    warfareRefs: ["fortifications", "siege-warfare"],
    relatedCities: ["rome", "ostia"],
    imageSlug: "alexander-mosaic",
  },

  {
    slug: "alexandria",
    name: "Alexandria",
    ancientName: "Alexandreia",
    modernName: "Al-Iskandariyah",
    country: "Egypt",
    standfirst:
      "The greatest Greek city of the eastern Mediterranean, whose ancient fabric lies almost entirely beneath a living metropolis and beneath the sea.",
    description:
      "Alexandria as a place: Alexander's foundation and the Ptolemaic capital, the Pharos and the Library, the grid plan and the Heptastadion, the underwater archaeology, and why so little can be excavated.",
    civilizations: ["ptolemaic-egypt", "hellenistic-world", "egypt"],
    cityType: "imperial-capital",
    period: "Founded 331 BCE; capital of Ptolemaic Egypt and then of Roman Egypt",
    foundation: {
      claim: "Founded by Alexander in 331 BCE, who laid out the plan himself and marked the streets with barley meal when chalk ran out.",
      level: "probable",
      note: "The foundation by Alexander is not doubted. The barley-meal story is a good anecdote in Plutarch and Arrian and is the kind of detail that accretes to a founder. A native settlement, Rhakotis, is reported to have preceded it on the site.",
    },
    setting: [
      "Alexandria stands on the Mediterranean coast west of the Nile Delta, on a limestone ridge between the sea and Lake Mareotis — a position with a sea harbour on one side and access to Nile shipping on the other, which is the whole reason for the site.",
      "The offshore island of Pharos was joined to the mainland by the Heptastadion, a causeway seven stades long that created two harbours. Silting around it eventually produced the isthmus on which much of the later city stands.",
    ],
    history: [
      "Under the Ptolemies the city became the capital of Egypt and the intellectual centre of the Greek world, deliberately so: the Mouseion and the Library were royal institutions supporting scholars at state expense.",
      "It passed to Rome after Actium and remained the second city of the empire and the source of a large part of Rome's grain. It was a centre of Jewish, Greek and Egyptian populations whose frictions produced serious violence more than once.",
      "The city declined through late antiquity with earthquakes, subsidence and conquest, and the ancient street level now lies several metres down or under water.",
    ],
    urbanPlan: [
      "Alexandria was laid out on a grid, attributed in the tradition to the architect Dinocrates, with a very wide main avenue, the Canopic Way, running east to west. The regularity contrasts sharply with Athens and Rome and is characteristic of Hellenistic foundations.",
      "The royal quarter, the Brucheion, occupied the north-east near the harbour and contained the palaces, the Mouseion and the Library. The Serapeum stood on higher ground to the south-west.",
      "Very little of this can be seen. The modern city sits directly on top, subsidence has dropped parts of the ancient shoreline below sea level, and the royal quarter is largely underwater.",
    ],
    economy: [
      "Grain above all. Egypt fed Rome, and Alexandria was the port through which it moved; the grain fleet's arrival was a political event in Rome.",
      "The city also handled the trade of the Red Sea and beyond — spices, incense, textiles and Indian goods reaching the Mediterranean through the Egyptian desert routes — and manufactured papyrus, glass and textiles.",
    ],
    cult: [
      "The Serapeum housed the cult of Serapis, a deity promoted under the early Ptolemies combining Egyptian and Greek elements, which functioned as a common cult for a mixed population.",
      "Egyptian, Greek and later Christian religious life coexisted and competed. The Serapeum was destroyed in 391 CE under Theophilus, an event that is well attested and is often confused in popular accounts with the destruction of the Library.",
    ],
    atWar: [
      "Caesar was besieged in the palace quarter in 48–47 BCE, and fire in the harbour during that fighting is one of the several reported causes of loss to the Library's holdings.",
      "The city's walls and its harbour chain protected a population that was periodically in violent internal conflict; Roman authorities intervened repeatedly.",
    ],
    population: [
      {
        label: "The Ptolemaic city",
        figure: "300,000 free inhabitants",
        basis: "Diodorus Siculus 17.52, writing in the 1st century BCE",
        level: "disputed",
        assessment:
          "A single ancient figure, and the source of nearly every population claim about Alexandria for two thousand years. It excludes the enslaved explicitly, which means any total requires an assumption about their number. Modern estimates commonly reach half a million or more; none is independently supported.",
      },
    ],
    monuments: [
      {
        name: "The Pharos lighthouse",
        date: "Built under Ptolemy I and II, completed c. 280 BCE",
        level: "documented",
        note: "Attributed to Sostratus of Cnidus, counted among the Seven Wonders. It stood into the medieval period and was brought down by earthquakes; blocks identified as belonging to it have been recovered from the harbour floor.",
      },
      {
        name: "The Mouseion and the Library",
        date: "Founded under the early Ptolemies",
        level: "documented",
        note: "A royal research institution with a library attached. Its existence, its royal funding and the scholars who worked there are well attested; its building has never been located.",
      },
      {
        name: "The Serapeum",
        date: "Ptolemaic, rebuilt under Rome",
        level: "documented",
        note: "Partly excavated. Pompey's Pillar, a monolithic column erected in 298 CE, stands on the site and is misnamed — it has nothing to do with Pompey.",
      },
      {
        name: "The Heptastadion",
        date: "Ptolemaic",
        level: "probable",
        note: "The causeway to Pharos, now buried under the isthmus formed by silting around it.",
      },
      {
        name: "Kom el-Shoqafa catacombs",
        date: "2nd century CE",
        level: "documented",
        note: "Rock-cut tombs mixing Egyptian, Greek and Roman decoration in the same chambers — the clearest surviving statement of the city's cultural mixture.",
      },
    ],
    archaeology: {
      level: "disputed",
      excavationHistory:
        "Land excavation is severely constrained by the modern city and can proceed only in small rescue operations. The transformative work has been underwater: from the 1990s, surveys in the Eastern Harbour and off Abu Qir by Franck Goddio, Jean-Yves Empereur and others have mapped submerged structures and recovered colossal statuary, sphinxes and architectural blocks, including material attributed to the Pharos.",
      note:
        "Alexandria is the clearest case on this platform of a city whose importance is inversely proportional to what can be dug. Almost every famous structure is known from texts and not from excavation, and confident reconstructions of the Library or the Pharos are drawings, not archaeology.",
    },
    museums: [
      {
        museum: "Graeco-Roman Museum",
        city: "Alexandria, Egypt",
        holdings: "Sculpture, coins and material from the city and its region.",
      },
      {
        museum: "Bibliotheca Alexandrina Antiquities Museum",
        city: "Alexandria, Egypt",
        holdings: "Including finds recovered from the underwater surveys of the harbour.",
      },
      {
        museum: "Egyptian Museum",
        city: "Cairo, Egypt",
        holdings: "Material from Alexandria within the national collection.",
      },
    ],
    disputes: [
      {
        question: "What happened to the Library?",
        positions:
          "There is no single destruction to explain. Ancient and later sources variously blame the fire during Caesar's siege in 48 BCE, damage under Aurelian in the third century CE, the destruction of the Serapeum in 391 CE, and the Arab conquest of 642 CE — the last resting on a source written six centuries after the event and widely rejected. The likeliest account is not a catastrophe but attrition: loss of royal funding, papyrus decay, and the gradual dispersal of scholars. The single-great-burning story is a construction.",
        level: "disputed",
      },
      {
        question: "Where was the Library?",
        positions:
          "Not located. It was probably not a separate building but part of the palace complex attached to the Mouseion, and that quarter is largely submerged or under the modern city.",
        level: "unknown",
      },
    ],
    primarySources: [
      P("Geography", "17.1.6-10", "The fullest ancient description of the city's plan, harbours and quarters, by a visitor.", "Strabo"),
      P("Library of History", "17.52", "The foundation and the population figure.", "Diodorus Siculus"),
      P("Anabasis of Alexander", "3.1-2", "The foundation.", "Arrian"),
    ],
    mapSlugs: ["egypt", "alexander-empire", "mediterranean"],
    figureRefs: ["alexander", "ptolemy-i", "julius-caesar"],
    themeRefs: ["education"],
    bookRefs: [],
    battleRefs: ["actium"],
    warfareRefs: ["naval-warfare", "logistics", "siege-warfare"],
    relatedCities: ["memphis", "rome", "athens", "ostia"],
  },
  {
    slug: "memphis",
    name: "Memphis",
    ancientName: "Inebu-hedj, 'White Walls'; later Men-nefer",
    modernName: "Mit Rahina",
    country: "Egypt",
    standfirst:
      "The administrative capital of Egypt for most of three thousand years, of which almost nothing above ground survives.",
    description:
      "Memphis as a place: the capital at the junction of Upper and Lower Egypt, the temple of Ptah, the vast necropolis from Saqqara to Giza, and why a city of that importance has left so little.",
    civilizations: ["egypt", "old-kingdom", "middle-kingdom", "new-kingdom"],
    cityType: "imperial-capital",
    period: "c. 3100 BCE – Roman period",
    foundation: {
      claim: "Founded by Menes, the king who united Upper and Lower Egypt, who diverted the Nile to make room for it.",
      level: "mythological",
      note: "Herodotus reports the story. Menes as a single unifying king is a tradition rather than a securely identified individual, and the Nile-diversion detail is not supported. What is documented is a major settlement at the junction of the two lands from the Early Dynastic period.",
    },
    setting: [
      "Memphis stood at the apex of the Delta, where the Nile valley opens out — the natural control point between Upper and Lower Egypt, and the reason it functioned as the administrative capital even when the royal residence was elsewhere.",
      "Its necropolis ran for tens of kilometres along the desert edge above the floodplain, from Abu Rawash through Giza and Abusir to Saqqara and Dahshur.",
    ],
    history: [
      "Memphis was the capital of the Old Kingdom and remained the administrative centre through most of Egyptian history, even under dynasties resident at Thebes or in the Delta.",
      "It retained importance under the Persians, the Ptolemies and Rome, and the Ptolemies were crowned there. Its decline followed the rise of Alexandria and, later, of Fustat and Cairo — much of its stone was carried off to build the latter.",
    ],
    urbanPlan: [
      "The plan is largely unrecoverable. The city was built of mudbrick on the floodplain, has been buried by Nile silt, is under cultivation and a high water table, and was systematically quarried for stone.",
      "What can be traced is the great temple enclosure of Ptah, Hut-ka-Ptah, and scattered palace and temple remains at Mit Rahina.",
    ],
    economy: [
      "The city was the administrative and redistributive centre of the Egyptian state, and a port on the Nile handling traffic between the valley and the Delta.",
      "It supported the necropolis: the pyramid complexes at Giza, Saqqara and Dahshur required continuous labour, supply and, once built, permanent mortuary establishments with their own estates.",
    ],
    cult: [
      "Ptah, the creator god of Memphis and patron of craftsmen, had one of the largest temple complexes in Egypt here. The Greek name for the country derives, on one long-standing etymology, from a Greek rendering of Hut-ka-Ptah, 'the estate of the ka of Ptah'.",
      "The Apis bull, a living animal identified as a manifestation of Ptah, was kept at Memphis and buried in the Serapeum at Saqqara, an underground gallery of colossal granite sarcophagi rediscovered by Auguste Mariette in 1851.",
    ],
    atWar: [
      "The 'White Walls' of the earliest name suggest a fortified enclosure, and Memphis's position made it the strategic key to Egypt: Cambyses took it in 525 BCE, and its fall meant the fall of the country.",
      "Alexander took it without a fight in 332 BCE and sacrificed to Apis, which was a deliberate political act distinguishing him from the Persians.",
    ],
    population: [
      {
        label: "The city in the Old Kingdom or later",
        figure: "No reliable figure",
        basis: "No ancient count survives and the settlement cannot be delimited archaeologically",
        level: "unknown",
        assessment:
          "Memphis is frequently described as among the largest cities in the world in the third millennium BCE, and estimates of tens of thousands appear in the literature. They rest on assumptions about an urban extent that has not been established. This is a case where the honest answer is that the size of one of the ancient world's most important cities is not known.",
      },
    ],
    monuments: [
      {
        name: "The temple enclosure of Ptah",
        date: "Old Kingdom onward, with major New Kingdom additions",
        level: "documented",
        note: "Once among the largest temple complexes in Egypt; only fragments and colossi remain in situ.",
      },
      {
        name: "The colossal statue of Ramesses II",
        date: "19th Dynasty",
        level: "documented",
        note: "A fallen limestone colossus at Mit Rahina, displayed lying down in a purpose-built shelter.",
      },
      {
        name: "The Step Pyramid of Djoser",
        date: "c. 2670 BCE, Third Dynasty",
        level: "documented",
        note: "At Saqqara, attributed to the architect Imhotep, and the earliest large-scale cut-stone building known. The attribution rests on an inscription naming Imhotep on a statue base of Djoser.",
      },
      {
        name: "The Serapeum of Saqqara",
        date: "New Kingdom onward, monumental galleries from the 26th Dynasty",
        level: "documented",
        note: "Underground burial galleries of the Apis bulls, with colossal granite sarcophagi, rediscovered in 1851.",
      },
      {
        name: "The Giza pyramids",
        date: "Fourth Dynasty, c. 2600–2500 BCE",
        level: "documented",
        note: "Part of the Memphite necropolis, built for kings whose administrative capital was Memphis.",
      },
    ],
    archaeology: {
      level: "disputed",
      excavationHistory:
        "The necropolis has been excavated intensively since the nineteenth century — Mariette at the Serapeum, and continuous work at Saqqara and Giza to the present. The city itself has been worked far less, principally at Mit Rahina, because the conditions are hostile: high water table, deep silt, modern cultivation and villages.",
      note:
        "Memphis is the sharpest illustration of a systematic bias in Egyptian archaeology. Tombs and temples were built of stone on the desert edge and survive; cities were built of mudbrick on the floodplain and do not. What we know about ancient Egypt is disproportionately what Egyptians built for the dead.",
    },
    museums: [
      {
        museum: "Mit Rahina open-air museum",
        city: "Mit Rahina, Egypt",
        holdings: "The Ramesses II colossus, an alabaster sphinx, and sculpture from the site.",
      },
      {
        museum: "Egyptian Museum / Grand Egyptian Museum",
        city: "Cairo and Giza, Egypt",
        holdings: "The national collections, including Memphite and Saqqara material.",
      },
      {
        museum: "Imhotep Museum",
        city: "Saqqara, Egypt",
        holdings: "Finds from the Saqqara necropolis displayed at the site.",
      },
    ],
    disputes: [
      {
        question: "How large was Memphis, and where exactly did it lie?",
        positions:
          "The settlement's extent and its shifts over three millennia are not established. The Nile has moved, the water table has risen, and the mudbrick city has largely dissolved. Reconstructions differ substantially and none is confirmed.",
        level: "unknown",
      },
    ],
    primarySources: [
      P("Histories", "2.99, 2.112, 3.27-29", "The foundation tradition, the temple precincts, and the Persian conquest.", "Herodotus"),
      P("Geography", "17.1.31-32", "A description of the city and the necropolis under Rome.", "Strabo"),
      P("The Palermo Stone and the royal annals", "fragmentary", "Early Egyptian records of reigns and events, relevant to the Memphite state.", "Egyptian court records"),
    ],
    mapSlugs: ["egypt"],
    figureRefs: ["alexander", "akhenaten"],
    themeRefs: ["state-and-religion"],
    bookRefs: [],
    battleRefs: [],
    warfareRefs: ["egyptian-army", "fortifications"],
    relatedCities: ["alexandria", "babylon", "susa"],
    imageSlug: "step-pyramid-djoser",
  },
  {
    slug: "persepolis",
    name: "Persepolis",
    ancientName: "Parsa",
    modernName: "Takht-e Jamshid",
    country: "Iran",
    standfirst:
      "A ceremonial capital built to be seen, burned by Alexander in 330 BCE, and preserved by the fire that destroyed it.",
    description:
      "Persepolis as a place: Darius's terrace and its halls, the Apadana reliefs and what they depict, the administrative archives found in the fortification walls, the burning, and the excavations.",
    civilizations: ["achaemenid-empire", "persia", "persian-imperial-system"],
    cityType: "royal-ceremonial",
    period: "Begun c. 518 BCE; destroyed 330 BCE",
    foundation: {
      claim: "Begun by Darius I as a new dynastic centre.",
      level: "documented",
      note: "Attested by the royal building inscriptions on the terrace itself, which name the king and the work.",
    },
    setting: [
      "Persepolis stands on a partly artificial stone terrace against the Kuh-e Rahmat in the plain of Marv Dasht in Fars, the Persian homeland — remote from the empire's administrative centres at Susa and Babylon, and reached by a formal approach.",
      "The choice of site is itself the statement: a dynastic and ceremonial capital in the heartland rather than a working capital at the centre of communications.",
    ],
    history: [
      "Darius I began the terrace around 518 BCE; Xerxes and Artaxerxes I continued it. Work was still in progress when the empire fell.",
      "Alexander took the site in 330 BCE and burned the palaces. The Greek sources differ on whether this was a deliberate act of policy — vengeance for the burning of the Athenian Acropolis — or a drunken impulse at a banquet, and Arrian records Parmenion advising against it.",
      "The terrace was never rebuilt. Its ruins remained visible, and the site became a symbol of Persian antiquity long before it was excavated.",
    ],
    urbanPlan: [
      "Persepolis is not a city in the ordinary sense. It is a walled terrace carrying palaces, halls and treasury buildings, with a settlement below it that is far less well known.",
      "The approach runs up a monumental double staircase to the Gate of All Nations built by Xerxes, and then to the Apadana, the great audience hall on its own platform, and the Hall of a Hundred Columns.",
      "The Tachara of Darius and the Hadish of Xerxes are smaller palaces; the treasury lies to the south-east. Royal tombs are cut into the cliff behind, with the earlier ones at Naqsh-e Rustam a few kilometres away.",
    ],
    economy: [
      "The terrace consumed rather than produced, but the administration that supplied it is documented in extraordinary detail. The Persepolis Fortification Tablets, an Elamite-language archive found in the fortification wall, record rations, travel authorisations and disbursements across the region.",
      "That archive is the best evidence anywhere for how the Achaemenid empire actually administered itself, and it corrects the Greek picture in significant ways — for example by showing women, including workers and members of the royal family, receiving rations and holding property.",
    ],
    cult: [
      "The reliefs show the king under the winged figure conventionally read as a representation of divine favour, and religious practice at the site is not richly documented.",
      "What the terrace does document is ideology rather than cult: the Apadana staircase reliefs show delegations from the empire's peoples bringing gifts, arranged in an order that presents the empire as a willing and harmonious assembly rather than a conquest.",
    ],
    atWar: [
      "Persepolis was fortified but not a fortress in a strategic sense; its walls served the terrace rather than a frontier.",
      "Its destruction in 330 BCE was a political act rather than a military necessity: the site had already surrendered.",
    ],
    population: [
      {
        label: "Resident population",
        figure: "Not recoverable",
        basis: "No ancient count; the lower settlement is only partly investigated",
        level: "unknown",
        assessment:
          "The terrace housed a court and an administration rather than a citizen population, and the settlement below it has not been excavated on a scale that would allow an estimate.",
      },
    ],
    monuments: [
      {
        name: "The Apadana",
        date: "Begun under Darius I, completed under Xerxes",
        level: "documented",
        note: "The audience hall, whose staircase reliefs of tribute delegations are the principal visual source for the peoples of the empire and their equipment.",
        imageSlug: "persepolis-apadana",
      },
      {
        name: "The Gate of All Nations",
        date: "Xerxes I",
        level: "documented",
        note: "The ceremonial entrance, with colossal human-headed bulls and a trilingual inscription of Xerxes.",
        imageSlug: "gate-of-all-nations",
      },
      {
        name: "The Hall of a Hundred Columns",
        date: "Begun under Xerxes, completed under Artaxerxes I",
        level: "documented",
        note: "The throne hall, and one of the largest roofed spaces of the ancient world.",
      },
      {
        name: "The royal tombs at Naqsh-e Rustam",
        date: "From Darius I onward",
        level: "documented",
        note: "Rock-cut cruciform tombs a few kilometres from the terrace, with Darius's carrying a long trilingual inscription.",
        imageSlug: "naqsh-e-rustam",
      },
    ],
    archaeology: {
      level: "documented",
      excavationHistory:
        "Excavated systematically by the Oriental Institute of the University of Chicago from 1931, under Ernst Herzfeld and then Erich Schmidt. The Fortification Tablets were recovered in 1933 and were loaned to Chicago for study, a loan that later became the subject of protracted legal proceedings in the United States before the tablets began returning to Iran.",
      note:
        "The fire that destroyed the palaces baked the clay tablets in the fortification wall and carbonised timbers, preserving both. The archive exists because the site burned.",
    },
    museums: [
      {
        museum: "National Museum of Iran",
        city: "Tehran, Iran",
        holdings: "Sculpture, reliefs, tablets and finds from the site.",
      },
      {
        museum: "Persepolis site museum",
        city: "Marv Dasht, Iran",
        holdings: "Material displayed in the Harem of Xerxes, restored as a museum.",
      },
      {
        museum: "Oriental Institute (Institute for the Study of Ancient Cultures)",
        city: "Chicago, United States",
        holdings: "The Persepolis Fortification Archive, studied and published there; tablets have been returning to Iran in stages.",
        note: "The loan and its long legal history are part of the object's modern record and are stated rather than omitted.",
      },
      {
        museum: "British Museum",
        city: "London",
        holdings: "Achaemenid material including reliefs and the Oxus Treasure.",
      },
    ],
    disputes: [
      {
        question: "Why did Alexander burn Persepolis?",
        positions:
          "Arrian presents a deliberate policy of retribution for Xerxes' burning of Athens, with Parmenion advising against it. Diodorus, Curtius and Plutarch preserve a version in which the fire began at a drunken banquet at the instigation of the courtesan Thais. The accounts cannot be reconciled; excavation confirms an intense fire and cannot supply a motive.",
        level: "disputed",
      },
      {
        question: "What do the Apadana delegations represent?",
        positions:
          "Read as tribute-bearers, as gift-bringers at a New Year festival, or as an idealised timeless statement of imperial order rather than a depiction of any actual event. The reliefs carry no inscription identifying the occasion.",
        level: "disputed",
      },
    ],
    primarySources: [
      P("Anabasis of Alexander", "3.18", "The capture and the burning, with Parmenion's objection.", "Arrian"),
      P("Library of History", "17.70-72", "The alternative tradition of the banquet and Thais.", "Diodorus Siculus"),
      P("Persepolis Fortification Tablets", "administrative archive", "Elamite records of rations, travel and disbursement — the empire's own administrative voice, independent of the Greek tradition.", "Achaemenid administration"),
      P("The royal inscriptions of the terrace", "DPa, XPa and others", "Trilingual building inscriptions naming the kings and their works.", "Darius I and Xerxes I"),
    ],
    mapSlugs: ["persian-empire"],
    figureRefs: ["darius-i", "xerxes-i", "alexander", "cyrus-the-great"],
    themeRefs: ["royal-road", "state-and-religion"],
    bookRefs: ["behistun-inscription"],
    battleRefs: ["gaugamela"],
    warfareRefs: ["persian-army", "persian-immortals", "persian-warfare"],
    relatedCities: ["susa", "babylon", "memphis"],
    imageSlug: "persepolis-apadana",
  },
  {
    slug: "susa",
    name: "Susa",
    ancientName: "Shushan",
    modernName: "Shush",
    country: "Iran",
    standfirst:
      "An Elamite capital that became an Achaemenid one — the working administrative seat of the Persian empire, and the terminus of the Royal Road.",
    description:
      "Susa as a place: five thousand years of occupation, Darius's palace and its remarkable foundation charter, the Royal Road, the French excavations, and why the Code of Hammurabi was found in Iran.",
    civilizations: ["achaemenid-empire", "persia", "persian-imperial-system"],
    cityType: "imperial-capital",
    period: "Occupied from c. 4200 BCE; Achaemenid capital 6th–4th century BCE",
    foundation: {
      claim: "One of the oldest continuously occupied urban sites in the world, founded in the Chalcolithic period.",
      level: "documented",
      note: "Attested by a long excavated stratigraphic sequence beginning in the fifth millennium BCE, long before any Persian presence.",
    },
    setting: [
      "Susa lies in the Khuzestan plain in south-western Iran, between the Karkheh and Dez rivers — lowland, hot, agriculturally rich, and geographically closer to Mesopotamia than to the Persian highlands.",
      "That position explains its role: it was the administrative capital because it sat where the empire's business was, while Persepolis in the highlands served ceremonial and dynastic purposes.",
    ],
    history: [
      "Susa was a principal city of Elam for three millennia before the Persians, alternately independent of and subject to Mesopotamian powers, and was sacked by Ashurbanipal in the seventh century BCE.",
      "Under Darius I it became a chief residence of the Achaemenid kings, with a palace complex on a new platform. Greek writers treat it as the Persian capital, which is how it appears in the Persian Wars narrative.",
      "It was taken by Alexander in 331 BCE, and continued under the Seleucids, Parthians and Sasanians before declining in the medieval period.",
    ],
    urbanPlan: [
      "The site consists of several mounds: the Acropolis, the Apadana mound with the Achaemenid palace, the Royal City, and the Artisans' City.",
      "Darius's palace follows a Mesopotamian courtyard plan rather than the terrace-and-hall arrangement of Persepolis, with an Apadana audience hall added on the Persepolitan model.",
    ],
    economy: [
      "Susa was an administrative centre, and the Royal Road that Herodotus describes ran from Sardis to Susa with staging posts and relays — roughly 2,700 kilometres, covered by the royal courier system in about a week according to his account.",
      "Its position gave access to both Mesopotamian and Iranian networks, and the glazed brick and metalwork produced there were of very high quality.",
    ],
    cult: [
      "Elamite religious life at Susa is documented over millennia, with the god Inshushinak as city deity.",
      "Under the Achaemenids the site's religious character is less visible than its administrative one, which is characteristic of the evidence rather than necessarily of the practice.",
    ],
    atWar: [
      "Susa's fall usually meant the fall of the region. Ashurbanipal's sack in the seventh century BCE was recorded in Assyrian reliefs as a comprehensive destruction.",
      "It surrendered to Alexander without a fight in 331 BCE, along with an enormous treasury.",
    ],
    population: [
      {
        label: "The Achaemenid city",
        figure: "No reliable figure",
        basis: "No ancient count survives",
        level: "unknown",
        assessment:
          "The mounds give an extent but not an occupancy. Estimates in the literature are derived from area and assumed density and are not independently supported.",
      },
    ],
    monuments: [
      {
        name: "The palace of Darius and its foundation charter",
        date: "Begun c. 521 BCE",
        level: "documented",
        note: "The charter, DSf, lists the materials and the peoples who supplied and worked them — cedar from Lebanon, gold from Sardis and Bactria, ivory from Nubia and India, stonecutters from Ionia and Sardis, brickmakers from Babylon. It is one of the most informative documents to survive from any ancient building project.",
      },
      {
        name: "The Apadana of Susa",
        date: "Darius I, restored under Artaxerxes II",
        level: "documented",
        note: "A columned audience hall on the Persepolitan model.",
      },
      {
        name: "The glazed brick friezes",
        date: "Achaemenid",
        level: "documented",
        note: "Moulded and glazed brick panels of guardsmen, lions and griffins from the palace, now principally in the Louvre.",
      },
    ],
    archaeology: {
      level: "documented",
      excavationHistory:
        "Excavated by French missions from 1884 — Marcel and Jane Dieulafoy, then Jacques de Morgan, later Roman Ghirshman — under a concession that permitted the export of finds, which is why so much Susa material is in Paris. Methods in the earliest campaigns were destructive by later standards, particularly de Morgan's deep trenching of the Acropolis.",
      note:
        "Susa produced objects that were not made there. The stele of Hammurabi and other Mesopotamian monuments were carried off as booty by the Elamite king Shutruk-Nahhunte in the twelfth century BCE and found at Susa in 1901 — an ancient act of plunder that determined where a Babylonian law code would be excavated three thousand years later.",
    },
    museums: [
      {
        museum: "Louvre",
        city: "Paris, France",
        holdings:
          "The Code of Hammurabi stele; the glazed brick archer and lion friezes from Darius's palace; a capital from the Apadana; and extensive Elamite material.",
        note: "The scale of the Louvre's holdings results from the terms of the nineteenth-century French concession, which permitted export. That history is part of the objects' record.",
      },
      {
        museum: "National Museum of Iran",
        city: "Tehran, Iran",
        holdings: "Susa material retained in Iran, including Elamite and Achaemenid finds.",
      },
      {
        museum: "Susa site museum",
        city: "Shush, Iran",
        holdings: "Local display of finds from the mounds.",
      },
    ],
    disputes: [
      {
        question: "Was Susa or Persepolis 'the capital'?",
        positions:
          "The question is badly framed. The Achaemenid court moved between Susa, Persepolis, Babylon and Ecbatana seasonally, and the functions differed: Susa was where administration was done, Persepolis where the dynasty represented itself. Greek sources naming a single capital are simplifying a mobile kingship.",
        level: "probable",
      },
    ],
    primarySources: [
      P("Histories", "5.52-54, 8.98", "The Royal Road from Sardis to Susa, its staging posts, and the speed of the royal courier system.", "Herodotus"),
      P("Foundation charter of the palace at Susa", "DSf", "Darius's own account of the materials and craftsmen assembled from across the empire.", "Darius I"),
      P("Anabasis of Alexander", "3.16", "The surrender of the city and its treasury.", "Arrian"),
    ],
    mapSlugs: ["persian-empire"],
    figureRefs: ["darius-i", "cyrus-the-great", "alexander", "xerxes-i"],
    themeRefs: ["royal-road"],
    bookRefs: ["behistun-inscription"],
    battleRefs: ["gaugamela"],
    warfareRefs: ["persian-army", "logistics", "persian-warfare"],
    relatedCities: ["persepolis", "babylon", "memphis"],
    imageSlug: "susa-archer-frieze",
  },
  {
    slug: "babylon",
    name: "Babylon",
    ancientName: "Babili, 'gate of the god'",
    modernName: "Near Hillah",
    country: "Iraq",
    standfirst:
      "The greatest city of Mesopotamia, a byword in three later traditions, and an archaeological site whose most famous monument is in Berlin and whose second most famous may never have existed.",
    description:
      "Babylon as a place: the city of Hammurabi and of Nebuchadnezzar II, the Ishtar Gate and Processional Way, Etemenanki and the Tower of Babel tradition, the Hanging Gardens problem, and the site's modern damage.",
    civilizations: ["babylon"],
    civilizationCounterpart: "babylon",
    cityType: "imperial-capital",
    period: "c. 1894 BCE – Hellenistic period",
    foundation: {
      claim: "An ancient foundation; the city rises to importance under Hammurabi in the 18th century BCE.",
      level: "documented",
      note: "Attested in cuneiform records. The site's earlier levels are largely inaccessible because the water table has risen and the second-millennium city lies below it.",
    },
    setting: [
      "Babylon stood on the Euphrates in central Mesopotamia, on the alluvial plain — no stone, no timber, and abundant clay, which determined that it would be built of mudbrick and that its monuments would be decorated rather than carved.",
      "The river ran through the city, which was walled on both banks and connected by a bridge.",
    ],
    history: [
      "Babylon became dominant in Mesopotamia under Hammurabi in the eighteenth century BCE, whose law code is the best-known document of the period.",
      "After centuries of subjection to Assyria — and destruction by Sennacherib in 689 BCE — it rose again under the Neo-Babylonian kings. Nebuchadnezzar II rebuilt it on a monumental scale in the sixth century BCE, and it is his city that the excavations principally recovered.",
      "It fell to Cyrus in 539 BCE and became an Achaemenid royal centre, was taken by Alexander, who died there in 323 BCE, and declined under the Seleucids as Seleucia on the Tigris drew away its population.",
    ],
    urbanPlan: [
      "Nebuchadnezzar's city was laid out with a great processional way running from the Ishtar Gate south to the temple complex, past palaces on one side.",
      "The inner city was walled, with an outer circuit beyond it. Herodotus describes walls of a size and a regularity that excavation has not confirmed, and his account of the city is one of the standard test cases for his reliability.",
      "Etemenanki, the ziggurat of Marduk, stood in its own precinct beside Esagila, the god's temple. Only the foundations survive; the structure was dismantled in antiquity.",
    ],
    economy: [
      "Agriculture on irrigated alluvium, and long-distance trade along the rivers. Babylon was also a centre of scholarship: the astronomical diaries kept there over centuries are the longest continuous scientific record from the ancient world.",
      "Those diaries are of direct historical use elsewhere on this platform: one of them records the lunar eclipse before Gaugamela and the outcome of the battle, independently of the Greek accounts.",
    ],
    cult: [
      "Marduk was the city god, and his temple Esagila and ziggurat Etemenanki were the religious centre. The New Year akitu festival, in which the king took the hand of the god, was the central ritual of legitimacy.",
      "Etemenanki is generally taken to lie behind the Tower of Babel tradition in Genesis. The identification is widely accepted and is an inference rather than a stated equivalence.",
    ],
    atWar: [
      "Babylon's walls were proverbial, and Herodotus counted them among the wonders of the world. The city nonetheless fell repeatedly — to Assyria, to Cyrus, to Alexander — and in 539 BCE the Persian entry appears to have met little resistance.",
      "The Cyrus Cylinder, a Babylonian foundation document written for Cyrus after the conquest, presents him as restoring the cult of Marduk against an impious predecessor. It is a legitimating text produced by the conqueror, and it is regularly and wrongly described as a charter of human rights.",
    ],
    population: [
      {
        label: "The Neo-Babylonian city",
        figure: "Often estimated at 100,000–200,000",
        basis: "Modern reconstruction from the walled area and assumed densities",
        level: "disputed",
        assessment:
          "No ancient count survives. The figures rest on the excavated circuit and on density assumptions borrowed from other Near Eastern cities. Babylon is commonly called the first city to exceed 200,000 people; that claim is an estimate presented as a record.",
      },
    ],
    monuments: [
      {
        name: "The Ishtar Gate and Processional Way",
        date: "c. 575 BCE, Nebuchadnezzar II",
        level: "documented",
        note: "Glazed brick with moulded lions, bulls and dragons. A reconstruction using excavated bricks stands in the Pergamon Museum in Berlin; a smaller replica stands on the site.",
      },
      {
        name: "Etemenanki",
        date: "Rebuilt by Nabopolassar and Nebuchadnezzar II",
        level: "documented",
        note: "The ziggurat of Marduk. Only the foundation platform survives; the superstructure is known from cuneiform descriptions including the Esagila tablet.",
      },
      {
        name: "Esagila",
        date: "Rebuilt in the Neo-Babylonian period",
        level: "documented",
        note: "The temple of Marduk, only partly excavated because of the water table.",
      },
      {
        name: "The Hanging Gardens",
        date: "Attributed to Nebuchadnezzar II in later Greek sources",
        level: "disputed",
        note: "Not mentioned in any Babylonian source, not identified archaeologically at Babylon, and described only by Greek and Roman writers, none of whom claims to have seen them. See the dispute below.",
      },
    ],
    archaeology: {
      level: "documented",
      excavationHistory:
        "Excavated by Robert Koldewey for the German Oriental Society from 1899 to 1917, in a campaign that recovered the Neo-Babylonian city and shipped enormous quantities of glazed brick to Berlin, where the Ishtar Gate was reconstructed. From the 1980s the Iraqi state rebuilt parts of the site on top of the ancient walls, with bricks stamped in the name of the head of state, damaging the archaeology. Further damage was done when the site was used as a military base after 2003. It was inscribed as a UNESCO World Heritage Site in 2019.",
      note:
        "Two conditions limit what can be known. The water table has risen since antiquity, putting the second-millennium city of Hammurabi's period below reach; and the reconstruction and military use of the site have compromised parts of the record permanently.",
    },
    museums: [
      {
        museum: "Pergamon Museum",
        city: "Berlin, Germany",
        holdings:
          "The reconstructed Ishtar Gate and a section of the Processional Way, assembled from excavated glazed bricks, together with other material from Koldewey's excavations.",
        note: "The reconstruction is built from original bricks with modern infill. The scale of the export reflects the terms under which the excavation was conducted and is part of the objects' modern history.",
      },
      {
        museum: "Iraq Museum",
        city: "Baghdad, Iraq",
        holdings: "Babylonian material, including objects recovered after the looting of 2003.",
      },
      {
        museum: "British Museum",
        city: "London",
        holdings: "The Cyrus Cylinder, Babylonian astronomical diaries and extensive cuneiform tablets.",
      },
      {
        museum: "Louvre",
        city: "Paris, France",
        holdings: "The Code of Hammurabi stele — taken from Babylon to Susa as booty in antiquity, and excavated there.",
      },
    ],
    disputes: [
      {
        question: "Did the Hanging Gardens exist at Babylon?",
        positions:
          "No Babylonian text mentions them, including Nebuchadnezzar's own extensive building inscriptions, and no structure at Babylon has been identified with them. All the descriptions are Greek and Roman and are later. One influential proposal, argued by Stephanie Dalley, relocates them to Nineveh and attributes them to Sennacherib, on the basis of Assyrian texts and reliefs describing an elaborate irrigated garden and a screw-lifting technology. The proposal is taken seriously and is not established; the alternative is that the gardens are a literary construction.",
        level: "disputed",
      },
      {
        question: "How reliable is Herodotus on Babylon?",
        positions:
          "His measurements of the walls are far larger than the excavated circuits, and several of his descriptions of custom have no support. Some scholars hold that he never visited; others that he reports what he was told with the usual distortions of travellers' information. His account should not be used as a plan of the city.",
        level: "disputed",
      },
    ],
    primarySources: [
      P("Histories", "1.178-200", "The description of the city, its walls and its customs — famous, detailed and substantially unconfirmed by excavation.", "Herodotus"),
      P("The Cyrus Cylinder", "BM 90920", "A Babylonian foundation text produced for Cyrus after the conquest of 539 BCE, presenting him as the restorer of Marduk's cult.", "Achaemenid administration at Babylon"),
      P("Babylonian astronomical diaries", "from the 7th century BCE onward", "The longest continuous observational record from antiquity, including the entry covering the campaign of Gaugamela.", "Babylonian astronomers"),
      P("The Code of Hammurabi", "stele, Louvre Sb 8", "An 18th-century BCE law collection inscribed on a diorite stele, carried to Susa as booty and excavated there in 1901.", "Hammurabi"),
    ],
    mapSlugs: ["persian-empire", "alexander-empire"],
    figureRefs: ["cyrus-the-great", "alexander", "darius-i"],
    themeRefs: ["state-and-religion"],
    bookRefs: [],
    battleRefs: ["gaugamela"],
    warfareRefs: ["fortifications", "siege-warfare", "persian-army"],
    relatedCities: ["susa", "persepolis", "memphis"],
    imageSlug: "ishtar-gate-berlin",
  },
  {
    slug: "troy",
    name: "Troy",
    ancientName: "Ilios / Ilion; probably the Hittite Wilusa",
    modernName: "Hisarlik",
    country: "Türkiye",
    standfirst:
      "A mound with nine main cities stacked in it, excavated by a man who dug through the one he was looking for, and the site where the relationship between epic and archaeology has to be worked out.",
    description:
      "Troy as a place: the stratified mound at Hisarlik, the nine occupation phases, Schliemann's excavation and its damage, the lower-city controversy, and what the site can and cannot tell us about the Iliad.",
    civilizations: ["greece"],
    cityType: "polis",
    period: "c. 3000 BCE – 5th century CE",
    foundation: {
      claim: "Founded by Ilus, son of Tros, and walled by Poseidon and Apollo in servitude to Laomedon.",
      level: "mythological",
      note: "The foundation belongs to the Trojan cycle. Archaeologically the mound shows continuous occupation from the Early Bronze Age.",
    },
    setting: [
      "Hisarlik is a mound at the western end of the Troad, commanding the approach to the Dardanelles — the strait connecting the Aegean to the Sea of Marmara and the Black Sea beyond.",
      "That position is the site's whole significance: it controls a route, and the prevailing winds and current in the strait mean ancient ships often had to wait for conditions, in a place someone could tax them.",
    ],
    history: [
      "The mound contains nine principal occupation levels, conventionally Troy I to IX, spanning roughly three thousand years, each built on the levelled remains of the last.",
      "Troy VI, with substantial cut-stone walls and towers, and Troy VIIa, which shows destruction by fire and hastily built storage within the citadel, are the candidates usually discussed in connection with the Homeric city. Troy VIII and IX are the Greek and Roman city of Ilion, which existed as a real town with a temple of Athena and was visited by Alexander and later patronised by Rome.",
    ],
    urbanPlan: [
      "The citadel is small — a few hundred metres across — with a fortification circuit, gates and a ramp, and buildings of megaron plan in the earlier phases.",
      "Whether there was a substantial lower town outside the citadel is the central archaeological controversy of the site. Manfred Korfmann's excavations from 1988 identified a ditch and traces of settlement south of the citadel and argued for a lower city of some size; Frank Kolb argued that the evidence did not support a city of that character and that Troy was a modest citadel.",
    ],
    economy: [
      "Control of the strait, and probably of the waiting traffic. Textile production is attested by very large numbers of spindle whorls.",
      "Troy VI shows imported Mycenaean pottery, which establishes contact with the Aegean world, though the volume and its meaning are argued.",
    ],
    cult: [
      "The Greek and Roman city maintained a temple of Athena Ilias, and the site had cult continuity as the supposed location of the Trojan War for as long as antiquity lasted.",
      "That later cult is itself historically important: Troy in the classical and Roman periods was a place of pilgrimage for people who believed the Iliad happened there, and Rome claimed descent from Trojan refugees.",
    ],
    atWar: [
      "The walls of Troy VI are substantial by Anatolian Bronze Age standards, with a pronounced batter and projecting towers, and they were built to be defended.",
      "Destruction levels occur repeatedly in the sequence, by fire, by earthquake and by causes that cannot be distinguished. Interpreting any one of them as the war of the poems requires an inference the material does not supply.",
    ],
    population: [
      {
        label: "The Late Bronze Age citadel",
        figure: "Perhaps a few hundred within the citadel",
        basis: "Modern estimate from the enclosed area",
        level: "probable",
        assessment:
          "The citadel is small and its capacity can be estimated with some confidence. It is the lower city, and therefore the total, that is disputed.",
      },
      {
        label: "The Late Bronze Age settlement including any lower town",
        figure: "Estimates range from a few hundred to around ten thousand",
        basis: "Depends entirely on the interpretation of the ditch and the extent of settlement outside the citadel",
        level: "disputed",
        assessment:
          "This is the substance of the Korfmann–Kolb controversy. The high figures make Troy a regional trading centre; the low ones make it a fortified seat with a small dependent settlement. The disagreement is about interpretation of the same evidence.",
      },
    ],
    monuments: [
      {
        name: "The walls and gates of Troy VI",
        date: "c. 1700–1300 BCE",
        level: "documented",
        note: "Cut-stone circuit with a distinctive batter, towers and gateways — the most impressive built remains on the site.",
      },
      {
        name: "Schliemann's trench",
        date: "1870s",
        level: "documented",
        note: "A great cut driven through the mound in search of the earliest levels, which destroyed much of the intervening stratigraphy. It is now itself a monument to the history of the discipline.",
      },
      {
        name: "The theatre and sanctuary of Ilion",
        date: "Hellenistic and Roman",
        level: "documented",
        note: "The classical and Roman city that grew on the mound because of what people believed had happened there.",
      },
    ],
    archaeology: {
      level: "documented",
      excavationHistory:
        "Heinrich Schliemann excavated from 1870, driving a deep trench through the mound and reaching Troy II, which he identified as Priam's city — roughly a thousand years too early. The gold he called Priam's Treasure belongs to that early level; it was removed to Berlin, taken to Moscow in 1945, and its whereabouts were denied for decades before being acknowledged in 1993. Wilhelm Dörpfeld, Carl Blegen and, from 1988, Manfred Korfmann established the modern stratigraphy and investigated the area beyond the citadel.",
      note:
        "Troy is the site where the limits of archaeology are clearest. Excavation can establish that a place was fortified, traded and burned. It cannot establish who burned it or why, and it cannot recover an individual. The identification of the mound with the Ilios of Greek tradition is probable; everything beyond that requires care.",
    },
    museums: [
      {
        museum: "Troy Museum",
        city: "Tevfikiye, Çanakkale, Türkiye",
        holdings: "Finds from the site across all periods, opened in 2018.",
      },
      {
        museum: "Pushkin Museum",
        city: "Moscow, Russia",
        holdings: "The greater part of the gold Schliemann called Priam's Treasure.",
        note: "Removed from Berlin at the end of the Second World War; its presence in Moscow was denied until 1993 and remains disputed between Russia, Germany and Türkiye.",
      },
      {
        museum: "Istanbul Archaeological Museums",
        city: "Istanbul, Türkiye",
        holdings: "Material from Hisarlik retained in Türkiye.",
      },
    ],
    disputes: [
      {
        question: "Was there a substantial lower city?",
        positions:
          "Korfmann's excavations identified a ditch and settlement traces south of the citadel and supported a reconstruction of Troy as a considerable Late Bronze Age town with Anatolian affinities. Frank Kolb argued publicly and sharply that the evidence was insufficient and that the reconstruction outran it. The controversy was among the most prominent in recent classical archaeology and is not settled.",
        level: "disputed",
      },
      {
        question: "Which level, if any, is the Homeric Troy?",
        positions:
          "Troy VI and Troy VIIa are the candidates, on the grounds of scale and of destruction respectively. Nothing found at either connects it to a Greek coalition or to any named person, and destruction by earthquake, fire and attack are not always separable in the record.",
        level: "disputed",
      },
    ],
    primarySources: [
      P("Iliad", "throughout", "The poem the site is measured against, and not a description of it.", "Homer (attrib.)"),
      P("Geography", "13.1", "A discussion of the site and of the identification of Ilion, showing the question was already argued in antiquity.", "Strabo"),
      P("Hittite archives from Hattusa", "the Alaksandu treaty and related texts", "References to Wilusa, generally equated with Ilios, and to Ahhiyawa. The equations are widely accepted and are not certain.", "Hittite administration"),
    ],
    mapSlugs: ["ancient-greece", "mediterranean"],
    figureRefs: ["homer", "alexander"],
    themeRefs: ["memory-and-storytelling"],
    bookRefs: ["iliad", "odyssey"],
    battleRefs: [],
    warfareRefs: ["fortifications", "siege-warfare", "greek-warfare"],
    relatedCities: ["athens", "alexandria"],
    imageSlug: "troy-walls-hisarlik",
  },
];

const CITY_BY_SLUG = new Map(CITIES.map((c) => [c.slug, c]));

export function getCity(slug: string): City | undefined {
  return CITY_BY_SLUG.get(slug);
}

export function citiesByType(type: City["cityType"]): City[] {
  return CITIES.filter((c) => c.cityType === type);
}

export function citiesForCivilization(civ: string): City[] {
  return CITIES.filter((c) => c.civilizations.includes(civ));
}

/** Display order for the index. */
export const CITY_TYPE_ORDER: ReadonlyArray<{
  type: City["cityType"];
  label: string;
}> = [
  { type: "polis", label: "City-states" },
  { type: "imperial-capital", label: "Imperial capitals" },
  { type: "sanctuary", label: "Sanctuaries" },
  { type: "royal-ceremonial", label: "Royal and ceremonial centres" },
  { type: "port", label: "Ports" },
  { type: "provincial-town", label: "Provincial towns" },
];
