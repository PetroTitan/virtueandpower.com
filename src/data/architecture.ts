/**
 * Ancient architecture registry.
 *
 * Building types, construction technique and the material culture of
 * ancient building, rendered by one template at /architecture/[slug].
 *
 * ─── What this layer does not cover ─────────────────────────────────
 *
 * Roads, city walls, fortresses, siege works and marching camps are
 * already covered by the warfare encyclopedia, which treats them as
 * military infrastructure and describes their construction in detail.
 * Duplicating them here would produce two pages competing for the same
 * query — the failure mode the cities layer was designed to avoid — so
 * this registry links to them instead. `ARCHITECTURE_DEFERS_TO_WARFARE`
 * records the boundary and the validator enforces it.
 *
 * ─── The recurring editorial problem ────────────────────────────────
 *
 * Ancient buildings are known through four very different kinds of
 * evidence, and popular accounts blend them: standing remains,
 * excavated foundations, ancient description, and modern reconstruction
 * drawing. The Parthenon stands; the Temple of Zeus at Olympia is a heap
 * of drums; the Pharos is known only from texts and coins; and the
 * "reconstruction" of a Greek house in a textbook is usually a drawing
 * with no single excavated original behind it.
 *
 * Every named example in this registry therefore carries an evidence
 * level, and the level answers the question "how do we know what this
 * looked like?" rather than "did it exist?".
 */

import type { EvidenceLevel, SourceReference } from "./evidence";

export type ArchitectureTier =
  | "sacred"
  | "civic"
  | "entertainment"
  | "water"
  | "domestic"
  | "funerary"
  | "commemorative"
  | "technique";

export const ARCH_TIER_LABEL: Record<ArchitectureTier, string> = {
  sacred: "Sacred building",
  civic: "Civic building",
  entertainment: "Buildings for spectacle",
  water: "Water and movement",
  domestic: "Domestic building",
  funerary: "Funerary architecture",
  commemorative: "Commemorative monuments",
  technique: "Technique and materials",
};

/**
 * Subjects the warfare encyclopedia owns. Architecture links to these
 * rather than duplicating them, and a slug appearing in both registries
 * fails validation.
 */
export const ARCHITECTURE_DEFERS_TO_WARFARE: ReadonlyArray<{
  subject: string;
  warfareSlug: string;
  reason: string;
}> = [
  {
    subject: "Roads",
    warfareSlug: "roman-roads",
    reason:
      "Roman roads were built for armies, and the warfare page already covers surveying, construction layers, milestones and the itineraries.",
  },
  {
    subject: "City walls and fortresses",
    warfareSlug: "fortifications",
    reason:
      "Covered as military architecture, including the Hellenistic response to artillery and the function of Roman frontier works.",
  },
  {
    subject: "Siege works",
    warfareSlug: "siege-warfare",
    reason: "Covered with the engineering that produced them.",
  },
  {
    subject: "Military camps and fortresses",
    warfareSlug: "roman-camps",
    reason:
      "The castra plan and its development into permanent fortresses and then towns is covered there.",
  },
  {
    subject: "Military engineering",
    warfareSlug: "roman-engineering",
    reason:
      "Bridging, surveying and field construction as an army capability.",
  },
];

export interface BuildingExample {
  name: string;
  place: string;
  date: string;
  /** How we know what it looked like — not whether it existed. */
  level: EvidenceLevel;
  note: string;
  /** Slug into src/data/cities.ts. */
  citySlug?: string;
  /** Slug into src/data/archive-images.ts. */
  imageSlug?: string;
}

export interface ArchitectureKeyPoint {
  claim: string;
  detail: string;
  level: EvidenceLevel;
}

export interface ArchitectureTopic {
  slug: string;
  title: string;
  standfirst: string;
  description: string;
  tier: ArchitectureTier;
  civilizations: string[];
  period: string;
  summary: string[];
  keyPoints: ArchitectureKeyPoint[];
  terms?: Array<{ term: string; gloss: string }>;
  examples: BuildingExample[];
  primarySources: SourceReference[];
  archaeology?: string;
  disputes?: Array<{ question: string; positions: string; level: EvidenceLevel }>;
  relatedTopics: string[];
  /** Slugs into src/data/cities.ts. */
  citySlugs: string[];
  /** Slugs into src/data/warfare.ts. */
  warfareRefs: string[];
  /** Slugs into content/philosophers. */
  figureRefs: string[];
  /** Slugs into content/themes. */
  themeRefs: string[];
  imageSlug?: string;
}

const S = (
  work: string,
  locus: string,
  summary: string,
  author?: string,
): SourceReference => ({ work, locus, summary, author });

export const ARCHITECTURE_TOPICS: ReadonlyArray<ArchitectureTopic> = [
  // ─── Sacred ──────────────────────────────────────────────────────────
  {
    slug: "temple",
    title: "The temple",
    standfirst:
      "A house for a god rather than a hall for worshippers — which is why the important architecture is on the outside.",
    description:
      "The Greek and Roman temple — the plan, the peristyle, why ritual happened at the altar outside, and how the Roman temple diverges from the Greek.",
    tier: "sacred",
    civilizations: ["greece", "athens", "rome", "roman-republic", "egypt"],
    period: "c. 800 BCE – 4th century CE",
    summary: [
      "A Greek temple is a house for a cult statue, not a space for congregation. The sacrifice — the central act of Greek religion — happened at an altar in the open air, usually east of the building, and most worshippers never went inside. That single fact explains the architecture: the exterior is elaborated because the exterior is what the rite faced.",
      "The standard plan is a rectangular cella housing the image, often with a porch at each end, surrounded by a colonnade. Refinements accumulate: entasis in the columns, upward curvature of the platform, inward lean. The Parthenon has almost no straight lines, and the ancient explanation, that these corrections serve the eye, is reported rather than demonstrated.",
      "The Roman temple departs from the Greek in ways that matter. It stands on a high podium with a single frontal stair, engaging the colonnade with the cella walls rather than surrounding it. The result is a building with a front and a back, designed to be approached axially — appropriate to a temple standing at the end of a forum rather than free in a sanctuary.",
    ],
    keyPoints: [
      {
        claim: "Ritual took place at an outdoor altar, not inside the building.",
        detail:
          "Attested by the position of excavated altars, by the absence of interior arrangements for an assembly, and by the ancient descriptions of sacrifice.",
        level: "documented",
      },
      {
        claim: "Greek temples were painted.",
        detail:
          "Traces of pigment survive on sculpture and architectural members, and modern non-invasive imaging has recovered patterns invisible to the eye. The white marble aesthetic is a modern accident of weathering and of nineteenth-century taste.",
        level: "documented",
      },
      {
        claim: "The purpose of the optical refinements is not established.",
        detail:
          "Vitruvius explains curvature and entasis as corrections for visual distortion. Whether that was the builders' reasoning, or a later rationalisation of a structural or aesthetic habit, is argued.",
        level: "disputed",
      },
    ],
    terms: [
      { term: "cella / naos", gloss: "The enclosed room housing the cult image." },
      { term: "peristyle", gloss: "The colonnade surrounding the building." },
      { term: "entasis", gloss: "The slight convex curve of a column shaft." },
      { term: "temenos", gloss: "The sacred precinct within which the temple stands." },
    ],
    examples: [
      {
        name: "The Parthenon",
        place: "Athens",
        date: "447–432 BCE",
        level: "documented",
        note: "Standing, and with surviving building accounts inscribed on stone — an unusually well documented construction. Its sculptural programme is divided between Athens and London. Standing, with surviving inscribed building accounts.",
        citySlug: "athens",
        imageSlug: "parthenon-east",
      },
      {
        name: "The Temple of Zeus at Olympia",
        place: "Olympia",
        date: "c. 470–456 BCE",
        level: "probable",
        note: "Collapsed by earthquake; the column drums lie where they fell. The elevation is reconstructed from the fallen members, which is a stronger basis than most. The fallen column drums survive in sequence where the earthquake dropped them.",
        citySlug: "olympia",
        imageSlug: "olympia-temple-of-zeus",
      },
      {
        name: "The Temple of Apollo at Corinth",
        place: "Corinth",
        date: "c. 560 BCE",
        level: "documented",
        note: "Monolithic Doric columns still standing — unusual, since most Greek columns are built of drums. Standing, with monolithic columns in place.",
        citySlug: "corinth",
        imageSlug: "corinth-temple-of-apollo",
      },
      {
        name: "The Temple of Hephaestus",
        place: "Athens",
        date: "c. 449–415 BCE",
        level: "documented",
        note: "The best-preserved Doric temple anywhere, because it served as a church from the seventh century until 1834. It stands complete because it served as a church from the seventh century until 1834.",
        citySlug: "athens",
      },
    ],
    primarySources: [
      S("On Architecture", "3–4", "The most detailed ancient treatment of temple design, proportion and the orders, by a practising Roman architect.", "Vitruvius"),
      S("Description of Greece", "throughout", "A traveller's descriptions of temples, many now lost, with their cult images and dedications.", "Pausanias"),
    ],
    archaeology:
      "Temple foundations survive even where the elevation does not, which is why plans are far better known than elevations. Reconstruction drawings of ruined temples are inferences from the plan plus fallen members plus comparison with standing examples, and should be read as such.",
    disputes: [
      {
        question: "Did the optical refinements serve the eye?",
        positions:
          "Vitruvius says so and the explanation has been repeated for two millennia. Alternatives hold that curvature aided drainage, or that it emerged from construction practice and was rationalised afterwards. The refinements are measurable; their purpose is not recorded by anyone who built one.",
        level: "disputed",
      },
    ],
    relatedTopics: ["architectural-orders", "columns-and-capitals", "building-materials", "construction-methods"],
    citySlugs: ["athens", "olympia", "corinth", "delphi", "rome"],
    warfareRefs: [],
    figureRefs: ["iktinos", "vitruvius"],
    themeRefs: ["state-and-religion"],
    imageSlug: "parthenon-east",
  },
  {
    slug: "forum",
    title: "The forum",
    standfirst:
      "The Roman civic centre — a colonnaded square that began as an open space for business and became an imperial architectural statement.",
    description:
      "The Roman forum — its origins as a market and assembly ground, the basilicas and temples around it, and the imperial fora built when the original filled up.",
    tier: "civic",
    civilizations: ["rome", "roman-republic", "principate"],
    period: "c. 600 BCE – 4th century CE",
    summary: [
      "The Forum Romanum began as low, marshy ground between hills, drained by the Cloaca Maxima and used as a market and meeting place. It accumulated rather than being designed: temples, the Curia where the Senate met, the rostra from which speakers addressed the crowd, basilicas for business and law, and honorific monuments wherever there was room.",
      "By the late Republic it was congested, and the solution was to build additional fora beside it. Caesar began the sequence and Augustus, Vespasian, Nerva and Trajan continued it, each new forum a planned rectangular precinct with a temple at one end — the opposite of the accreted original.",
      "The imperial fora are architecture as political statement in a way the old forum never was. Trajan's, with its basilica, libraries, column and market complex, is the largest, and it was built with the proceeds of the Dacian wars.",
    ],
    keyPoints: [
      {
        claim: "The Forum Romanum was not planned.",
        detail:
          "Its irregular shape and the successive rebuilding of individual monuments are visible in the excavated sequence; it grew over six centuries.",
        level: "documented",
      },
      {
        claim: "The imperial fora were planned precincts.",
        detail:
          "Each is a regular enclosure with an axial temple, which is a different architectural idea from the space it stands beside.",
        level: "documented",
      },
      {
        claim: "Much of the visible Forum is late.",
        detail:
          "What stands is a palimpsest, with late-antique rebuilding on Republican foundations. Reading the ruins as a snapshot of any one period is the standard visitor's error.",
        level: "documented",
      },
    ],
    examples: [
      {
        name: "The Forum Romanum",
        place: "Rome",
        date: "Developed from the 7th century BCE",
        level: "documented",
        note: "Excavated repeatedly since the eighteenth century, most drastically in the 1920s and 1930s when a road was driven through the imperial fora. Excavated repeatedly, with standing monuments throughout.",
        citySlug: "rome",
        imageSlug: "roman-forum-view",
      },
      {
        name: "The Forum of Trajan",
        place: "Rome",
        date: "Dedicated 112 CE",
        level: "probable",
        note: "Attributed to Apollodorus of Damascus. The basilica and column survive in part; the plan of the whole is reconstructed from excavation and from the Severan marble plan. Excavated in part; the plan is reconstructed from excavation and the Severan marble plan.",
        citySlug: "rome",
      },
      {
        name: "The forum at Pompeii",
        place: "Pompeii",
        date: "Successive phases to 79 CE",
        level: "documented",
        note: "Still under repair from the earthquake when the eruption came — a provincial forum caught mid-renovation. Excavated to a complete plan with standing colonnades.",
        citySlug: "pompeii",
      },
    ],
    primarySources: [
      S("Severan Marble Plan (Forma Urbis Romae)", "fragmentary", "A marble city plan of Rome incised c. 203–211 CE at 1:240, surviving in over a thousand fragments. The single most important document for the topography of the ancient city.", "Severan surveyors"),
      S("On Architecture", "5.1", "On the design and proportions of the forum and basilica.", "Vitruvius"),
    ],
    archaeology:
      "The Forum's stratigraphy is deep and much disturbed. The Severan marble plan supplies footprints for buildings that no longer stand, and matching its fragments to excavated remains is an ongoing project.",
    relatedTopics: ["basilica", "temple", "honorific-column", "triumphal-arch"],
    citySlugs: ["rome", "pompeii", "ostia"],
    warfareRefs: [],
    figureRefs: ["apollodorus-of-damascus", "trajan", "augustus"],
    themeRefs: ["army-and-state"],
    imageSlug: "roman-forum-view",
  },
  {
    slug: "agora",
    title: "The agora",
    standfirst:
      "The Greek civic square — market, assembly ground, law court and the place where philosophy was practised in public.",
    description:
      "The Greek agora — its civic buildings, the stoas that framed it, and what the Athenian excavations recovered about how a democracy physically worked.",
    tier: "civic",
    civilizations: ["greece", "athens"],
    period: "c. 600 – 100 BCE",
    summary: [
      "The agora was an open space with public buildings around its edges, and it held simultaneously the functions a modern city separates: commerce, government, law, religion and sociability. Socrates is found in it because that is where people were.",
      "The Athenian agora is the best-excavated example, and its buildings map onto the constitution. The Bouleuterion housed the council; the Tholos was where the presiding committee ate and slept so that some of the executive was always present; the law courts occupied part of the square; and the Royal Stoa held the laws inscribed on stone.",
      "The finds are as informative as the buildings. Bronze allotment machines for selecting jurors by lot, jurors' identity tokens, water clocks limiting speeches, and ostraka bearing the names proposed for ostracism — the physical apparatus of a democracy, recovered from the ground.",
    ],
    keyPoints: [
      {
        claim: "How much of the agora was open at any one period is hard to establish.",
        detail:
          "The square filled progressively with monuments, statues and temporary stalls, and excavation recovers the buildings far better than it recovers what stood between them. Reconstruction drawings showing a clear space are inferences.",
        level: "disputed",
      },
      {
        claim: "The Athenian agora's buildings correspond to constitutional functions.",
        detail:
          "The Bouleuterion, Tholos, law courts and Royal Stoa are identified by excavation and by the Aristotelian Constitution of the Athenians, which describes the institutions they housed.",
        level: "documented",
      },
      {
        claim: "Allotment machines and jury tokens survive.",
        detail:
          "Bronze kleroteria and juror tokens are among the most direct physical evidence for democratic procedure anywhere in antiquity.",
        level: "documented",
      },
      {
        claim: "The agora was also a burial ground and a sanctuary before it was a civic square.",
        detail:
          "Excavation shows earlier graves beneath the classical square, and altars and shrines within it throughout.",
        level: "documented",
      },
    ],
    examples: [
      {
        name: "The Athenian Agora",
        place: "Athens",
        date: "6th century BCE onward",
        level: "documented",
        note: "Excavated by the American School since 1931, requiring the demolition of a nineteenth-century neighbourhood. The Stoa of Attalos was reconstructed in the 1950s to house the finds. Excavated over a very large area since 1931.",
        citySlug: "athens",
      },
      {
        name: "The agora at Corinth",
        place: "Corinth",
        date: "Greek, rebuilt as a Roman forum after 44 BCE",
        level: "documented",
        note: "The clearest site anywhere for watching a Greek agora become a Roman forum. Excavated continuously since 1896.",
        citySlug: "corinth",
      },
    ],
    primarySources: [
      S("Constitution of the Athenians", "throughout", "The institutions whose buildings stand in the excavated agora, described in detail.", "Aristotle"),
      S("Description of Greece", "1.2-17", "A walk through the Athenian agora in the second century CE.", "Pausanias"),
    ],
    archaeology:
      "The Athenian agora is among the most completely excavated civic centres in the Greek world, and the finds document procedure rather than only architecture.",
    relatedTopics: ["stoa", "forum", "temple"],
    citySlugs: ["athens", "corinth"],
    warfareRefs: [],
    figureRefs: ["socrates", "pericles"],
    themeRefs: ["democracy-at-war"],
  },
  {
    slug: "stoa",
    title: "The stoa",
    standfirst:
      "A roofed colonnade open on one side — the most useful building the Greeks invented, and the one that gave Stoicism its name.",
    description:
      "The stoa — a simple, endlessly adaptable structure providing shade, shelter and enclosure, and the building type that framed the agora.",
    tier: "civic",
    civilizations: ["greece", "athens", "hellenistic-world"],
    period: "c. 600 – 100 BCE",
    summary: [
      "A stoa is a long roofed portico, columns along the open side and a wall along the back, sometimes with rooms behind and sometimes two storeys. It has no single function, which is precisely its use: it provides shade in summer and shelter in rain, and it defines the edge of an open space without enclosing it.",
      "Stoas housed shops, offices, law courts, painting galleries and casual assembly. The Painted Stoa at Athens, hung with panel paintings including a Marathon scene, is where Zeno taught — and the school took its name from the building, not from any doctrine.",
      "The Stoa of Attalos, given to Athens by a king of Pergamon in the second century BCE, was reconstructed in the 1950s and is now the agora museum. It is the only place where the interior of a Greek civic building can be experienced at full scale, and it is a reconstruction.",
    ],
    keyPoints: [
      {
        claim: "Stoicism is named after a building.",
        detail:
          "Zeno taught in the Stoa Poikile, the Painted Stoa, in the Athenian agora; his followers were called the people of the stoa.",
        level: "documented",
      },
      {
        claim: "Stoas were donated by kings as public benefactions.",
        detail:
          "The Stoa of Attalos carries a dedicatory inscription. Hellenistic monarchs used civic buildings in Greek cities as instruments of diplomacy.",
        level: "documented",
      },
      {
        claim: "The Stoa of Attalos as it stands is a modern reconstruction.",
        detail:
          "Rebuilt in 1953–56 on the excavated foundations using ancient techniques and some ancient material. It is an informed reconstruction and not a surviving building.",
        level: "documented",
      },
    ],
    examples: [
      {
        name: "The Stoa of Attalos",
        place: "Athens",
        date: "c. 150 BCE; reconstructed 1953–56",
        level: "documented",
        note: "Two storeys with shops behind the colonnade. Now the museum of the Agora excavations. Reconstructed in 1953–56 on the excavated foundations.",
        citySlug: "athens",
      },
      {
        name: "The Painted Stoa",
        place: "Athens",
        date: "5th century BCE",
        level: "probable",
        note: "Known from description and from partial excavation. Its paintings, including a Marathon scene, are lost.",
        citySlug: "athens",
      },
    ],
    primarySources: [
      S("Description of Greece", "1.15", "The Painted Stoa and its pictures, described while they still hung.", "Pausanias"),
      S("Lives of the Eminent Philosophers", "7.1", "Zeno teaching in the stoa, and the school taking its name from it.", "Diogenes Laertius"),
    ],
    relatedTopics: ["agora", "columns-and-capitals", "architectural-orders"],
    citySlugs: ["athens", "delphi", "corinth"],
    warfareRefs: [],
    figureRefs: ["zeno-of-citium", "socrates"],
    themeRefs: [],
  },
  {
    slug: "basilica",
    title: "The basilica",
    standfirst:
      "A large roofed hall for business and law, and the Roman building type that Christianity later took over wholesale.",
    description:
      "The Roman basilica — an aisled hall with clerestory lighting, used for courts and commerce, and the plan that became the standard church.",
    tier: "civic",
    civilizations: ["rome", "roman-republic", "principate", "late-empire"],
    period: "2nd century BCE – 6th century CE",
    summary: [
      "A basilica is a large rectangular hall divided by internal colonnades into a nave and aisles, with the nave carried higher so that windows above the aisle roofs light the interior. It was a secular building: law courts, business, and shelter for the crowd that a forum could not hold in bad weather.",
      "The type solved a problem the temple never addressed, which is how to roof a large interior and light it. Vitruvius describes the proportions; the surviving examples show the range, from the modest basilica at Pompeii to the enormous vaulted Basilica of Maxentius.",
      "When Christianity became a public religion under Constantine it needed buildings for congregations, and the temple was useless for that — it was a house for a statue. The basilica was already a hall for crowds, and it was adopted with its plan essentially intact. The architectural history of the European church begins in a Roman law court.",
    ],
    keyPoints: [
      {
        claim: "The basilica was a secular building type.",
        detail:
          "Attested in its Roman uses for law and commerce, and described as such by Vitruvius long before any Christian adoption.",
        level: "documented",
      },
      {
        claim: "The Christian church took over the plan.",
        detail:
          "The adoption is visible in the fourth-century foundations at Rome and is not seriously disputed. The reason usually given — that the temple could not house a congregation — follows from what temples were for.",
        level: "probable",
      },
      {
        claim: "The Basilica of Maxentius used concrete vaulting rather than a timber roof.",
        detail:
          "Its surviving coffered vaults show the alternative structural solution, and the building's scale was only possible with concrete.",
        level: "documented",
      },
    ],
    examples: [
      {
        name: "The Basilica of Maxentius and Constantine",
        place: "Rome",
        date: "Begun c. 308 CE",
        level: "documented",
        note: "Three enormous coffered vaults survive. The colossal statue of Constantine stood in its western apse and was found there in 1486. Three coffered vaults survive standing.",
        citySlug: "rome",
      },
      {
        name: "The basilica at Pompeii",
        place: "Pompeii",
        date: "Late 2nd century BCE",
        level: "documented",
        note: "One of the earliest known examples, and evidence that the type was provincial before it was imperial. Excavated to a complete plan.",
        citySlug: "pompeii",
      },
    ],
    primarySources: [
      S("On Architecture", "5.1", "The design and proportions of the basilica, including the one Vitruvius says he built at Fano.", "Vitruvius"),
    ],
    relatedTopics: ["forum", "vaults-and-domes", "roman-concrete"],
    citySlugs: ["rome", "pompeii", "ostia"],
    warfareRefs: [],
    figureRefs: ["vitruvius", "constantine"],
    themeRefs: [],
  },

  // ─── Entertainment ───────────────────────────────────────────────────
  {
    slug: "theatre",
    title: "The theatre",
    standfirst:
      "Built into a hillside in Greece and free-standing on vaults in Rome — a structural difference that changed where a theatre could be put.",
    description:
      "The ancient theatre — the Greek hillside cavea and orchestra, the Roman vaulted alternative, and why the stone remains at most Greek sites are later than the plays performed there.",
    tier: "entertainment",
    civilizations: ["greece", "athens", "rome", "principate"],
    period: "5th century BCE – 4th century CE",
    summary: [
      "A Greek theatre uses the ground: seating is cut into a hillside around a circular orchestra where the chorus performed, with a low stage building behind. The site had to have a slope, which is why Greek theatres are where the topography allowed rather than where the town centre was.",
      "Roman engineering removed that constraint. Concrete vaulting could carry banked seating on a free-standing structure, so a Roman theatre could be built anywhere, and its semicircular orchestra became seating rather than performance space, with a tall permanent stage building closing the view.",
      "A caution that catches most visitors: the stone theatre at Athens visible today is substantially later than the fifth-century plays first performed on the site. The Theatre of Dionysus was a wooden and earthen arrangement when Aeschylus, Sophocles, Euripides and Aristophanes were staged there, and the surviving masonry is a Hellenistic and Roman rebuilding.",
    ],
    keyPoints: [
      {
        claim: "Greek theatres depend on a hillside; Roman theatres do not.",
        detail:
          "The structural difference follows from concrete vaulting and is visible at every Roman example.",
        level: "documented",
      },
      {
        claim: "The stone remains at Athens post-date the classical drama.",
        detail:
          "The fifth-century arrangements were largely wooden. The surviving seating is later, which is well established and routinely elided.",
        level: "documented",
      },
      {
        claim: "How the fifth-century staging worked is reconstructed, not attested.",
        detail:
          "Skene, ekkyklema and mechane are known from the plays and later commentators. Their physical form is inference; no fifth-century stage building survives.",
        level: "disputed",
      },
    ],
    terms: [
      { term: "cavea / koilon", gloss: "The banked seating." },
      { term: "orchestra", gloss: "The circular dancing floor of the chorus; a semicircle in Roman practice." },
      { term: "skene", gloss: "The stage building; the origin of the word scene." },
    ],
    examples: [
      {
        name: "The Theatre of Dionysus",
        place: "Athens",
        date: "Successive phases from the 6th century BCE",
        level: "probable",
        note: "The birthplace of Attic drama. Its visible stone form is Hellenistic and Roman. Excavated, with the surviving stone seating standing.",
        citySlug: "athens",
        imageSlug: "dionysus-theatre",
      },
      {
        name: "The theatre at Delphi",
        place: "Delphi",
        date: "4th century BCE, rebuilt later",
        level: "documented",
        note: "Set above the temple, with the sanctuary and valley as the backdrop. The seating and orchestra survive in situ.",
        citySlug: "delphi",
      },
      {
        name: "The large theatre at Pompeii",
        place: "Pompeii",
        date: "2nd century BCE, remodelled under Augustus",
        level: "documented",
        note: "A Greek-plan theatre in an Italian town, later Romanised. Excavated and standing; the Augustan remodelling is legible in the fabric.",
        citySlug: "pompeii",
      },
    ],
    primarySources: [
      S("On Architecture", "5.3-9", "Theatre design, acoustics and the sounding vessels Vitruvius describes.", "Vitruvius"),
      S("Poetics", "throughout", "The dramatic form the building housed, though Aristotle says little about the building.", "Aristotle"),
    ],
    relatedTopics: ["amphitheatre", "vaults-and-domes", "roman-concrete"],
    citySlugs: ["athens", "delphi", "pompeii", "ostia"],
    warfareRefs: [],
    figureRefs: ["aristotle"],
    themeRefs: [],
    imageSlug: "dionysus-theatre",
  },
  {
    slug: "amphitheatre",
    title: "The amphitheatre",
    standfirst:
      "A Roman invention with no Greek precedent — an oval arena enclosed by seating, built for a form of spectacle the Greek world did not have.",
    description:
      "The Roman amphitheatre — its origins in Campania, the engineering of the Colosseum, the substructures, and the seating that made the social order visible.",
    tier: "entertainment",
    civilizations: ["rome", "roman-republic", "principate"],
    period: "c. 70 BCE – 4th century CE",
    summary: [
      "The amphitheatre is the one major Roman building type with no Greek ancestor, because the spectacle it housed had none. Two theatres face to face — amphi-theatron — produce an oval arena entirely surrounded by seating.",
      "The earliest surviving stone example is at Pompeii, of about 70 BCE, more than a century before the Colosseum. The type is Campanian before it is Roman, which fits the origins of gladiatorial combat in Italy rather than at Rome.",
      "The Colosseum is the engineering statement: an entirely free-standing structure of concrete, travertine and brick, with eighty arched entrances numbered so that ticket-holders reached their seats directly, and a substructure of tunnels and lifts beneath the arena floor. The seating was graded by rank, so the building displayed the social hierarchy to itself.",
    ],
    keyPoints: [
      {
        claim: "The amphitheatre has no Greek precedent.",
        detail:
          "No Greek city built one before Roman rule, and the spectacle it housed was not a Greek institution.",
        level: "documented",
      },
      {
        claim: "The Pompeii amphitheatre predates the Colosseum by roughly 150 years.",
        detail:
          "Dated by inscription and construction; it is the earliest surviving permanent stone amphitheatre known.",
        level: "documented",
      },
      {
        claim: "The Colosseum's arena substructures survive and are visible.",
        detail:
          "The hypogeum of tunnels, cages and lift shafts is excavated. How the machinery worked in detail is partly reconstruction.",
        level: "probable",
      },
    ],
    examples: [
      {
        name: "The Colosseum (Flavian Amphitheatre)",
        place: "Rome",
        date: "Inaugurated 80 CE",
        level: "documented",
        note: "Built on the site of the lake of Nero's Golden House — the return of appropriated ground to public use was part of the point. Standing to a great height, with the arena substructures excavated.",
        citySlug: "rome",
        imageSlug: "colosseum-curves",
      },
      {
        name: "The amphitheatre at Pompeii",
        place: "Pompeii",
        date: "c. 70 BCE",
        level: "documented",
        note: "The earliest surviving stone example, and the scene of the riot of 59 CE that Tacitus records and a wall painting depicts. Excavated and substantially intact.",
        citySlug: "pompeii",
      },
    ],
    primarySources: [
      S("Annals", "14.17", "The riot at the Pompeii amphitheatre and the Senate's ten-year ban on games there.", "Tacitus"),
      S("On Spectacles", "throughout", "Poems written for the opening of the Flavian Amphitheatre.", "Martial"),
    ],
    relatedTopics: ["theatre", "roman-concrete", "vaults-and-domes"],
    citySlugs: ["rome", "pompeii"],
    warfareRefs: [],
    figureRefs: [],
    themeRefs: [],
    imageSlug: "colosseum-curves",
  },
  {
    slug: "baths",
    title: "Baths",
    standfirst:
      "Heated floors, vaulted halls and a daily social institution — the Roman building type that most depended on engineering.",
    description:
      "Roman baths — the hypocaust, the sequence of rooms, the imperial thermae as a public amenity, and the water supply that made them possible.",
    tier: "entertainment",
    civilizations: ["rome", "roman-republic", "principate"],
    period: "2nd century BCE – 5th century CE",
    summary: [
      "A Roman bath runs a bather through a sequence: an exercise yard, a changing room, then warm, hot and cold rooms, with the hot rooms heated by a hypocaust — a floor raised on short pillars over a furnace, with hot gases drawn up flues in the walls.",
      "The imperial thermae at Rome were far more than baths. They included libraries, lecture halls, gardens and exercise grounds, were open to the population at low or no cost, and were among the largest roofed structures ever built, using concrete vaulting on a scale nothing else attempted.",
      "The whole institution depends on the aqueducts. Baths consumed water continuously, and the daily bath as a social habit is a downstream consequence of a water-supply system.",
    ],
    keyPoints: [
      {
        claim: "The hypocaust survives in excavated examples across the empire.",
        detail:
          "Raised floors on pilae, wall flues and furnace arrangements are recovered routinely, which makes the heating system one of the best-documented ancient technologies.",
        level: "documented",
      },
      {
        claim: "Imperial baths were public amenities on an enormous scale.",
        detail:
          "The Baths of Caracalla and of Diocletian covered many hectares and included non-bathing facilities. Their capacity figures in modern accounts are estimates from floor area.",
        level: "probable",
      },
      {
        claim: "Bathing practice varied more than the standard sequence suggests.",
        detail:
          "Mixed and separate bathing, opening hours and charges differed by place and period, and moralising ancient comment is not a reliable guide to practice.",
        level: "disputed",
      },
    ],
    terms: [
      { term: "hypocaust", gloss: "Underfloor heating: a floor raised on pillars over a furnace." },
      { term: "caldarium / tepidarium / frigidarium", gloss: "The hot, warm and cold rooms." },
      { term: "palaestra", gloss: "The exercise yard attached to the bath complex." },
    ],
    examples: [
      {
        name: "The Baths of Caracalla",
        place: "Rome",
        date: "212–216 CE",
        level: "documented",
        note: "Standing to a great height. The vaults are gone but the scale is legible, and the service tunnels beneath are extensive. Standing walls and vault springings survive, with the service tunnels excavated beneath.",
        citySlug: "rome",
      },
      {
        name: "The Baths of Diocletian",
        place: "Rome",
        date: "c. 298–306 CE",
        level: "documented",
        note: "Part of the frigidarium survives as a church converted by Michelangelo, and part of the complex houses the Museo Nazionale Romano. Part of the frigidarium survives as a standing church.",
        citySlug: "rome",
      },
      {
        name: "The Forum Baths at Ostia",
        place: "Ostia",
        date: "2nd century CE",
        level: "documented",
        note: "A working town's baths rather than an imperial monument, with the heating system clearly readable. Excavated with the hypocaust system in place.",
        citySlug: "ostia",
      },
    ],
    primarySources: [
      S("On Architecture", "5.10", "The design of baths, including the placement of the hot rooms and the hanging floor.", "Vitruvius"),
      S("Letters", "86", "A first-hand complaint about the noise of a bath-house, from the flat above one.", "Seneca"),
    ],
    relatedTopics: ["aqueduct", "roman-concrete", "vaults-and-domes", "construction-methods"],
    citySlugs: ["rome", "ostia", "pompeii"],
    warfareRefs: [],
    figureRefs: ["seneca"],
    themeRefs: [],
  },

  // ─── Water and movement ──────────────────────────────────────────────
  {
    slug: "aqueduct",
    title: "The aqueduct",
    standfirst:
      "Mostly underground, occasionally spectacular, and dependent on holding a gradient of a fraction of a degree across tens of kilometres.",
    description:
      "Roman aqueducts — surveying and gradient, the channels and arcades, the inverted siphon, distribution in the city, and Frontinus's account of running the system.",
    tier: "water",
    civilizations: ["rome", "roman-republic", "principate"],
    period: "312 BCE – 3rd century CE",
    summary: [
      "The engineering problem is gradient. Water moves by gravity, so the channel must fall continuously and very gently — often less than a metre per kilometre — over distances of tens of kilometres, across ground that does not oblige. Getting that right required surveying instruments and a great deal of patience.",
      "Most of an aqueduct is a covered channel underground. The arcades that everyone pictures are the exception, built where a valley had to be crossed and the gradient maintained. Where a valley was too deep, an inverted siphon could carry water down and up again in sealed pipes under pressure.",
      "In the city, water arrived at distribution tanks and was divided between public fountains, baths and private connections — the last taxed, and, Frontinus complains, frequently stolen by tapping the mains. His treatise, written as water commissioner in 97 CE, is the best account of Roman public administration in operation that survives.",
    ],
    keyPoints: [
      {
        claim: "Most aqueduct length ran underground.",
        detail:
          "Established by survey of the routes. The visible arcades are the exception, not the norm.",
        level: "documented",
      },
      {
        claim: "Fraud on the water supply was a recognised administrative problem.",
        detail:
          "Frontinus describes illegal tapping, undersized official nozzles and collusion by the water staff, in the voice of an official who audited the system.",
        level: "documented",
      },
      {
        claim: "Lead pipes were used for distribution, and the health consequences are argued.",
        detail:
          "Lead piping is attested and Vitruvius himself notes that lead workers look unhealthy and recommends terracotta. Whether Roman lead exposure had population-level effects is a live modern debate; water carrying dissolved calcium coats pipes internally, which complicates it.",
        level: "disputed",
      },
    ],
    examples: [
      {
        name: "The Pont du Gard",
        place: "Near Nîmes, France",
        date: "1st century CE",
        level: "documented",
        note: "A three-tier bridge carrying the Nîmes aqueduct. Its gradient over the whole 50 km route averages a very small fraction of a per cent. Standing complete across the valley.",
      },
      {
        name: "The Aqua Claudia",
        place: "Rome",
        date: "Completed 52 CE",
        level: "documented",
        note: "Its arcades stride across the Campagna and enter the city; substantial stretches survive. Substantial arcades survive standing across the Campagna.",
        citySlug: "rome",
      },
      {
        name: "The aqueduct of Segovia",
        place: "Segovia, Spain",
        date: "Probably late 1st or early 2nd century CE",
        level: "probable",
        note: "Built of unmortared granite blocks and still standing across the city centre. Its precise date is not fixed by inscription.",
      },
    ],
    primarySources: [
      S("On the Water Supply of the City of Rome", "throughout", "The water commissioner's technical and administrative account: routes, capacities, legal regulation and fraud.", "Frontinus"),
      S("On Architecture", "8", "Water supply, surveying levels, and the objection to lead piping.", "Vitruvius"),
    ],
    archaeology:
      "Aqueduct routes can be traced on the ground over long distances, and the surviving channels preserve the calcareous deposits that built up in use — which can be measured to estimate flow and years of operation.",
    relatedTopics: ["bridge", "baths", "construction-methods", "harbour"],
    citySlugs: ["rome", "ostia"],
    warfareRefs: ["roman-engineering"],
    figureRefs: ["vitruvius"],
    themeRefs: [],
  },
  {
    slug: "bridge",
    title: "The bridge",
    standfirst:
      "The arch applied to a river — and the structure whose survival rate tells you most about Roman construction.",
    description:
      "Roman bridges — the semicircular arch, pier foundations and cofferdams, timber military bridging, and the examples still carrying traffic.",
    tier: "water",
    civilizations: ["rome", "roman-republic", "principate"],
    period: "2nd century BCE – 4th century CE",
    summary: [
      "A Roman bridge is a series of semicircular arches on masonry piers. The arch does the work: it converts the load into compression, which stone handles well, and it allows spans that a stone beam cannot.",
      "The hard part is not the arches but the foundations. Piers must be founded in a riverbed, which required cofferdams — timber enclosures driven into the bed and pumped out — and often piles. Vitruvius describes the technique; the excavated remains confirm it.",
      "Military bridging was a separate art, in timber and often temporary. Caesar's Rhine bridge is the famous case, described in his own account in more technical detail than the campaign it enabled, and dismantled once its point had been made.",
    ],
    keyPoints: [
      {
        claim: "Roman bridges are still in use.",
        detail:
          "Several carry road traffic today, which is the strongest available statement about the construction — though most have been repaired and rebuilt repeatedly.",
        level: "documented",
      },
      {
        claim: "Cofferdam construction for piers is attested in text and in excavation.",
        detail:
          "Vitruvius describes the method and excavated pier foundations show pile arrangements consistent with it.",
        level: "documented",
      },
      {
        claim: "Caesar's ten-day figure for the Rhine bridge is his own.",
        detail:
          "The design he specifies is structurally sound and has been reconstructed. The timescale comes from a work written to impress a Roman readership.",
        level: "disputed",
      },
    ],
    examples: [
      {
        name: "The Alcántara bridge",
        place: "Alcántara, Spain",
        date: "Completed 106 CE",
        level: "documented",
        note: "Built under Trajan, with a dedicatory inscription naming the architect Gaius Julius Lacer. Still standing. Standing and still carrying traffic, with its dedicatory inscription in place.",
      },
      {
        name: "The Pons Fabricius",
        place: "Rome",
        date: "62 BCE",
        level: "documented",
        note: "The oldest Roman bridge in the city still in use, carrying pedestrians to the Tiber Island, with its builder named in an inscription. Standing and in use, with the builder named in an inscription on the fabric.",
        citySlug: "rome",
      },
      {
        name: "Caesar's Rhine bridge",
        place: "The Rhine",
        date: "55 BCE",
        level: "literary",
        note: "Known only from Caesar's own technical description. No physical trace has been identified, and reconstructions are drawings from the text.",
      },
    ],
    primarySources: [
      S("On Architecture", "5.12", "Foundations in water, cofferdams and harbour works.", "Vitruvius"),
      S("The Gallic War", "4.17-19", "The specification of the Rhine bridge.", "Julius Caesar"),
    ],
    relatedTopics: ["aqueduct", "vaults-and-domes", "construction-methods", "harbour"],
    citySlugs: ["rome"],
    warfareRefs: ["roman-engineering"],
    figureRefs: ["julius-caesar", "trajan", "vitruvius"],
    themeRefs: [],
  },
  {
    slug: "harbour",
    title: "The harbour",
    standfirst:
      "Building in the sea — and the concrete that could set underwater, which is the technology that made artificial harbours possible.",
    description:
      "Ancient harbours — moles and breakwaters, hydraulic concrete, ship sheds, and the artificial ports built when natural anchorages were not enough.",
    tier: "water",
    civilizations: ["rome", "principate", "greece", "athens", "ptolemaic-egypt"],
    period: "5th century BCE – 4th century CE",
    summary: [
      "Greek harbour works were largely adaptations of natural anchorages: moles, quays and ship sheds. The ship sheds at Zea in the Piraeus are the most informative survival, because their dimensions constrain what a trireme can have been.",
      "Roman practice was different in kind, because Roman concrete sets underwater. Volcanic ash from the Bay of Naples, mixed with lime and seawater, produces a hydraulic mortar that cures without air — which allows a mole to be built out into open water rather than assembled from dumped rubble.",
      "The largest applications are Portus, the artificial harbour complex built for Rome by Claudius and Trajan when Ostia could no longer handle the traffic, and Caesarea Maritima in Judaea, where Herod built a major port on a coast with no natural shelter at all.",
    ],
    keyPoints: [
      {
        claim: "Harbour capacity and traffic volumes are not recoverable.",
        detail:
          "Basin areas can be measured, but how many ships used a port, how long they stayed and what they carried is estimated from amphora finds and from a handful of texts. Figures quoted for ancient port throughput are reconstructions.",
        level: "unknown",
      },
      {
        claim: "Roman marine concrete cures underwater.",
        detail:
          "The pozzolana reaction is described by Vitruvius and Pliny and has been confirmed by analysis of cores drilled from surviving Roman harbour structures.",
        level: "documented",
      },
      {
        claim: "Ship shed dimensions constrain reconstructions of the trireme.",
        detail:
          "The sheds at Zea set an upper bound on hull length and beam, which is why they matter to a debate about a ship type of which no hull survives.",
        level: "documented",
      },
      {
        claim: "Caesarea was built where no natural harbour existed.",
        detail:
          "Attested by Josephus and confirmed by underwater survey of the submerged moles.",
        level: "documented",
      },
    ],
    examples: [
      {
        name: "Portus",
        place: "Near Ostia",
        date: "Claudian, extended under Trajan",
        level: "documented",
        note: "Trajan's hexagonal basin is still visible from the air. Built because the Tiber mouth could not handle Rome's grain supply. The hexagonal basin survives as a landscape feature and has been surveyed and excavated.",
        citySlug: "ostia",
      },
      {
        name: "The ship sheds at Zea",
        place: "Piraeus, Athens",
        date: "5th–4th century BCE",
        level: "documented",
        note: "Slipways for the trireme fleet, partly submerged. Their dimensions are direct evidence for the ships they held. Excavated, partly submerged, with the slipway cuttings measurable.",
        citySlug: "athens",
      },
      {
        name: "Caesarea Maritima",
        place: "Judaea",
        date: "22–10 BCE",
        level: "documented",
        note: "Herod's artificial harbour, built with hydraulic concrete on an open coast. The moles have subsided and been excavated underwater, and concrete cores drilled from them preserve the original mortar.",
      },
    ],
    primarySources: [
      S("On Architecture", "2.6, 5.12", "Pozzolana and its behaviour, and construction in water.", "Vitruvius"),
      S("Jewish Antiquities", "15.331-341", "The construction of the harbour at Caesarea.", "Josephus"),
    ],
    relatedTopics: ["roman-concrete", "lighthouse", "bridge", "construction-methods"],
    citySlugs: ["ostia", "athens", "alexandria"],
    warfareRefs: ["naval-warfare", "roman-navy", "logistics"],
    figureRefs: ["vitruvius"],
    themeRefs: [],
  },
  {
    slug: "lighthouse",
    title: "The lighthouse",
    standfirst:
      "A building type known almost entirely from description — the Pharos survived a millennium and a half and left almost nothing to excavate on land.",
    description:
      "The ancient lighthouse — the Pharos of Alexandria, what is actually known about it, the Roman examples, and the problem of reconstructing a lost wonder.",
    tier: "water",
    civilizations: ["ptolemaic-egypt", "rome", "principate"],
    period: "3rd century BCE – 4th century CE",
    summary: [
      "The Pharos of Alexandria, built under the first two Ptolemies and attributed to Sostratus of Cnidus, was counted among the Seven Wonders and stood into the medieval period before earthquakes brought it down. It is the reason several European languages use a form of its name for a lighthouse.",
      "What is actually known is thinner than the reconstructions suggest. Descriptions come from authors writing centuries after it was built and, in the fullest cases, from Arab visitors more than a thousand years later. Depictions on coins and in mosaics are schematic. The commonly repeated three-stage form — square, octagonal, cylindrical — comes from those late descriptions.",
      "Underwater survey in the Eastern Harbour from the 1990s has recovered very large blocks and statuary attributed to the structure, which confirms its scale and location without settling its elevation.",
    ],
    keyPoints: [
      {
        claim: "The Pharos existed, stood on Pharos island, and was very tall.",
        detail:
          "Attested across many independent sources, and corroborated by the recovery of colossal architectural blocks from the harbour floor.",
        level: "documented",
      },
      {
        claim: "Its detailed form is reconstructed from late descriptions.",
        detail:
          "The three-stage profile derives principally from medieval Arab accounts, a millennium after construction. Modern drawings are inferences.",
        level: "disputed",
      },
      {
        claim: "Reports of a mirror visible for enormous distances are not credible.",
        detail:
          "The claim appears in late sources and describes optical performance no ancient technology could deliver. It is a good example of a wonder accumulating wonders.",
        level: "literary",
      },
    ],
    examples: [
      {
        name: "The Pharos of Alexandria",
        place: "Alexandria",
        date: "Completed c. 280 BCE",
        level: "disputed",
        note: "Attributed to Sostratus of Cnidus. Brought down by earthquakes; blocks attributed to it have been recovered from the harbour.",
        citySlug: "alexandria",
      },
      {
        name: "The Tower of Hercules",
        place: "A Coruña, Spain",
        date: "Probably 2nd century CE",
        level: "documented",
        note: "A Roman lighthouse still standing and still operating, though encased in an eighteenth-century restoration. Standing and still operating, though encased in an eighteenth-century restoration.",
      },
    ],
    primarySources: [
      S("Geography", "17.1.6", "A description of the Pharos by a visitor to Alexandria.", "Strabo"),
      S("Natural History", "36.18", "The Pharos among the wonders, with the cost and the dedication.", "Pliny the Elder"),
    ],
    relatedTopics: ["harbour", "construction-methods"],
    citySlugs: ["alexandria"],
    warfareRefs: ["naval-warfare"],
    figureRefs: [],
    themeRefs: [],
  },

  // ─── Domestic ────────────────────────────────────────────────────────
  {
    slug: "house-and-insula",
    title: "The house and the apartment block",
    standfirst:
      "The atrium house that everyone pictures was a minority dwelling — most urban Romans lived in flats above shops.",
    description:
      "Ancient domestic architecture — the Greek courtyard house, the Roman atrium house, and the multi-storey insula in which the urban majority actually lived.",
    tier: "domestic",
    civilizations: ["greece", "athens", "rome", "principate"],
    period: "5th century BCE – 4th century CE",
    summary: [
      "The Greek house turns inward on a courtyard, with rooms opening off it and little to see from the street. The andron, a dining room for male guests, is often the only decorated space, which tells you what a house was expected to display.",
      "The Roman atrium house adds an axial sequence — entrance, atrium with a roof opening and basin, tablinum, and often a peristyle garden beyond — designed so that a visitor at the door sees straight through. That axis is social architecture: the morning reception of clients happened along it.",
      "But the atrium house is the housing of the propertied. Most urban Romans lived in insulae: multi-storey blocks with shops at street level and flats above, reached by stairs, with the poorest tenants highest up. Rome's own examples are largely inaccessible under the modern city, which is why Ostia is the principal evidence for how the urban majority was housed.",
    ],
    keyPoints: [
      {
        claim: "Ostia supplies the best evidence for the insula.",
        detail:
          "Standing brick-faced blocks of several storeys, with shops, staircases and light wells intact, of a type known at Rome largely from fragments and from the Severan marble plan.",
        level: "documented",
      },
      {
        claim: "The atrium house was not the typical dwelling.",
        detail:
          "Follows from the density of urban populations against the footprint such houses require. The proportion is not recoverable precisely.",
        level: "probable",
      },
      {
        claim: "Rich and poor housing stood on the same streets.",
        detail:
          "At Pompeii, large houses and single rooms behind shops adjoin along a single frontage. Roman cities were not zoned by wealth in the modern sense.",
        level: "documented",
      },
    ],
    terms: [
      { term: "atrium", gloss: "The hall with a roof opening (compluvium) over a basin (impluvium)." },
      { term: "insula", gloss: "A city block, and by extension the apartment building filling it." },
      { term: "andron", gloss: "The Greek dining room for male guests, often the only decorated room." },
    ],
    examples: [
      {
        name: "The House of the Faun",
        place: "Pompeii",
        date: "2nd century BCE with later phases",
        level: "documented",
        note: "One of the largest houses in the town, with two atria and two peristyles. Its floor carried the Alexander Mosaic. Excavated and standing to wall height, with its plan complete.",
        citySlug: "pompeii",
      },
      {
        name: "The insulae of Ostia",
        place: "Ostia",
        date: "Principally 2nd century CE",
        level: "documented",
        note: "Brick-faced apartment blocks standing several storeys, the best-preserved examples of the type anywhere. Standing several storeys high, excavated.",
        citySlug: "ostia",
        imageSlug: "ostia-street",
      },
      {
        name: "Houses on the north slope of the Areopagus",
        place: "Athens",
        date: "Classical",
        level: "probable",
        note: "Excavated courtyard houses, modest in scale, which is a useful corrective to assumptions drawn from public architecture.",
        citySlug: "athens",
      },
    ],
    primarySources: [
      S("On Architecture", "6", "House design, room proportions and what Vitruvius thinks different social ranks require.", "Vitruvius"),
      S("Satires", "3", "A hostile account of life in a Roman apartment block, including fire and collapse.", "Juvenal"),
    ],
    relatedTopics: ["villa", "palace", "construction-methods", "building-materials"],
    citySlugs: ["pompeii", "ostia", "athens", "rome"],
    warfareRefs: [],
    figureRefs: ["vitruvius"],
    themeRefs: [],
    imageSlug: "ostia-street",
  },
  {
    slug: "villa",
    title: "The villa",
    standfirst:
      "A working farm, a display of leisure, or both at once — and the building type that carried Roman architecture into the countryside.",
    description:
      "The Roman villa — the productive villa rustica, the luxury villa maritima, the imperial examples, and the wall painting that survives in them.",
    tier: "domestic",
    civilizations: ["rome", "roman-republic", "principate"],
    period: "2nd century BCE – 5th century CE",
    summary: [
      "Roman villas run from productive farms to enormous leisure complexes, and many are both. The agricultural writers treat the villa as an investment with a residential part attached; the letters of the elite treat it as a retreat from the city.",
      "The luxury villa is architecture organised around views and water — terraces, porticoes, fish ponds, baths — and sited for coolness in summer. Its rooms carry the best-preserved Roman wall painting, because villas buried by Vesuvius or abandoned quietly preserve what city buildings lost.",
      "The imperial villa is a category of its own. Hadrian's at Tivoli covers a very large area and quotes buildings the emperor had seen across the empire, which makes it an architectural anthology as much as a residence.",
    ],
    keyPoints: [
      {
        claim: "How many villas were primarily productive and how many primarily residential is not settled.",
        detail:
          "The categories overlap, survey evidence is uneven across regions, and the excavated sample is biased toward the large and decorated. Statements about the proportion of villa types in the Roman economy rest on partial survey data.",
        level: "disputed",
      },
      {
        claim: "Villas were frequently productive enterprises.",
        detail:
          "The agricultural writers describe the villa as an income-generating estate, and excavated examples include presses, storage and slave quarters.",
        level: "documented",
      },
      {
        claim: "Villa walls preserve most surviving Roman painting.",
        detail:
          "The Vesuvian villas and the Villa of Livia at Prima Porta account for a large proportion of the corpus.",
        level: "documented",
      },
      {
        claim: "The labour was largely enslaved.",
        detail:
          "Attested by the agricultural writers, who discuss the management of enslaved workers as a practical matter, and by excavated accommodation.",
        level: "documented",
      },
    ],
    examples: [
      {
        name: "Hadrian's Villa",
        place: "Tivoli",
        date: "c. 118–138 CE",
        level: "documented",
        note: "An imperial complex of great extent, quoting buildings from across the empire. The Azara herm of Alexander came from a villa in this district. Excavated over a very large area, with substantial standing remains.",
      },
      {
        name: "The Villa of the Mysteries",
        place: "Pompeii",
        date: "2nd century BCE; frescoes c. 60–50 BCE",
        level: "documented",
        note: "A suburban villa whose megalography frieze is among the best-preserved large-scale Roman painting. Excavated with its painted rooms surviving in place.",
        citySlug: "pompeii",
      },
      {
        name: "The Villa of Livia",
        place: "Prima Porta, near Rome",
        date: "1st century BCE",
        level: "documented",
        note: "Its garden room frescoes were removed to the Museo Nazionale Romano for conservation. Excavated; its frescoes were lifted and are preserved in the Museo Nazionale Romano.",
        citySlug: "rome",
      },
    ],
    primarySources: [
      S("On Agriculture", "throughout", "The villa as an economic enterprise, including the management of enslaved labour.", "Columella"),
      S("Letters", "2.17, 5.6", "Descriptions of the author's own villas, room by room.", "Pliny the Younger"),
    ],
    relatedTopics: ["house-and-insula", "palace", "baths"],
    citySlugs: ["pompeii", "rome"],
    warfareRefs: [],
    figureRefs: ["hadrian", "pliny-the-younger"],
    themeRefs: [],
  },
  {
    slug: "palace",
    title: "The palace",
    standfirst:
      "From the Mycenaean megaron to the Palatine — buildings whose plan is a statement about how power was arranged.",
    description:
      "Ancient palaces — the Mycenaean megaron, the Achaemenid columned hall, the Hellenistic residence and the Roman imperial palace on the Palatine.",
    tier: "domestic",
    civilizations: ["greece", "achaemenid-empire", "persia", "rome", "principate", "new-kingdom"],
    period: "c. 1400 BCE – 5th century CE",
    summary: [
      "Palace plans encode political arrangements. The Mycenaean palace centres on a megaron — a porch, vestibule and hall with a central hearth and a throne — surrounded by storerooms and archives, which is the architecture of a redistributive bureaucracy.",
      "The Achaemenid palace is organised around vast columned halls, the apadana at Susa and Persepolis, designed for audience and display before assembled subjects rather than for administration. The reliefs on the approach staircases carry the message the building exists to deliver.",
      "The Roman imperial palace developed on the Palatine from an aristocratic house into a complex of state rooms, and gave European languages the word palace. Its architecture is a long negotiation between the fiction that the emperor was a citizen and the fact that he was not.",
    ],
    keyPoints: [
      {
        claim: "The Mycenaean megaron plan is well attested by excavation.",
        detail:
          "Recovered at Pylos, Mycenae and Tiryns, with the throne position and central hearth consistent across sites.",
        level: "documented",
      },
      {
        claim: "Achaemenid palace architecture was designed for audience.",
        detail:
          "The scale of the columned halls and the processional approach reliefs both point to ceremonial function rather than administration, which was housed elsewhere and is documented in the tablets.",
        level: "probable",
      },
      {
        claim: "The Palatine complex accreted rather than being designed.",
        detail:
          "Successive emperors built and rebuilt; the excavated sequence shows overlapping phases rather than a single scheme.",
        level: "documented",
      },
    ],
    examples: [
      {
        name: "The palace at Pylos",
        place: "Messenia",
        date: "13th century BCE",
        level: "documented",
        note: "The best-preserved Mycenaean palace plan, with the Linear B archive found in rooms beside the entrance. Excavated to a complete ground plan, with the archive rooms identified.",
      },
      {
        name: "The Apadana at Persepolis",
        place: "Persepolis",
        date: "Begun under Darius I",
        level: "documented",
        note: "A columned audience hall on its own platform, approached by relief-lined staircases. Excavated, with column bases, staircases and reliefs surviving in place.",
        citySlug: "persepolis",
        imageSlug: "persepolis-apadana",
      },
      {
        name: "The Domus Augustana",
        place: "Rome",
        date: "Flavian, from 92 CE",
        level: "documented",
        note: "The imperial residence on the Palatine, combining state reception rooms with private apartments. Excavated on the Palatine, with substantial standing vaulted structures.",
        citySlug: "rome",
      },
    ],
    primarySources: [
      S("Linear B tablets from Pylos", "administrative archive", "Records found in the palace itself, documenting what the building administered.", "Mycenaean scribes"),
      S("Foundation charter of the palace at Susa", "DSf", "Darius's account of the materials and craftsmen assembled to build a palace.", "Darius I"),
    ],
    relatedTopics: ["villa", "columns-and-capitals", "construction-methods"],
    citySlugs: ["persepolis", "susa", "rome", "memphis"],
    warfareRefs: ["persian-warfare"],
    figureRefs: ["darius-i", "augustus"],
    themeRefs: ["kingship-in-the-odyssey"],
    imageSlug: "persepolis-apadana",
  },

  // ─── Funerary ────────────────────────────────────────────────────────
  {
    slug: "necropolis",
    title: "The necropolis",
    standfirst:
      "Cities of the dead outside the walls — and, because Roman law forbade burial inside the city, the reason tombs line the roads out of every Roman town.",
    description:
      "Ancient burial architecture in the mass — the Kerameikos, the tomb-lined roads of Roman towns, and why cemeteries are the best-excavated part of most ancient sites.",
    tier: "funerary",
    civilizations: ["greece", "athens", "rome", "egypt", "new-kingdom"],
    period: "Throughout",
    summary: [
      "Burial was kept outside the settlement in both Greek and Roman practice, and Roman law made it explicit: the Twelve Tables forbade burial or cremation within the city. The consequence is architectural — tombs cluster along the roads leading out of a town, where passers-by would read them.",
      "That siting is deliberate. A Roman tomb is addressed to the traveller: it carries the name, the offices held, sometimes the trade depicted in relief, and often an instruction to the reader. Funerary monuments are the single largest category of surviving Roman inscription.",
      "Cemeteries are also the best-excavated part of most ancient sites, because grave goods are datable and burials are discrete deposits. Much of what is known about ancient population, health, diet and family structure comes from cemeteries rather than from houses.",
    ],
    keyPoints: [
      {
        claim: "Roman law prohibited burial inside the city.",
        detail:
          "The provision is preserved in the Twelve Tables and is corroborated by the archaeology: cemeteries lie beyond the walls in Roman towns.",
        level: "documented",
      },
      {
        claim: "Funerary inscriptions are the largest surviving class of Roman epigraphy.",
        detail:
          "They are also skewed: the commemorated are those whose families could pay for stone, which distorts any demography drawn from them.",
        level: "documented",
      },
      {
        claim: "Ancient life expectancy figures derived from tombstones are unreliable.",
        detail:
          "Commemoration was selective by age, sex, status and region. Modern demography of the Roman world uses model life tables rather than tombstone ages for this reason.",
        level: "probable",
      },
    ],
    examples: [
      {
        name: "The Kerameikos",
        place: "Athens",
        date: "From the Submycenaean period onward",
        level: "documented",
        note: "The principal Athenian cemetery, outside the Dipylon gate, with the state burials of the war dead nearby. Excavated over a large area, with grave monuments surviving in place.",
        citySlug: "athens",
      },
      {
        name: "The Street of Tombs at Pompeii",
        place: "Pompeii",
        date: "To 79 CE",
        level: "documented",
        note: "Monuments lining the road outside the Herculaneum gate, addressed to travellers entering the town. Excavated with the monuments standing along the road.",
        citySlug: "pompeii",
      },
      {
        name: "The Saqqara necropolis",
        place: "Memphis",
        date: "From the Early Dynastic period",
        level: "documented",
        note: "The burial ground of Memphis over three millennia, including the Step Pyramid and the Apis bull galleries. Excavated continuously since the nineteenth century, with structures standing.",
        citySlug: "memphis",
        imageSlug: "saqqara-step-pyramid",
      },
    ],
    primarySources: [
      S("The Twelve Tables", "10", "The prohibition on burial and cremation within the city.", "Roman law"),
      S("Description of Greece", "1.29", "The Kerameikos and the state tombs, described in the second century CE.", "Pausanias"),
    ],
    relatedTopics: ["mausoleum", "pyramid", "building-materials"],
    citySlugs: ["athens", "pompeii", "memphis", "rome"],
    warfareRefs: [],
    figureRefs: [],
    themeRefs: [],
  },
  {
    slug: "mausoleum",
    title: "The mausoleum",
    standfirst:
      "A tomb built as a monument — named after one man's, and the type through which rulers argued about their own permanence.",
    description:
      "The monumental tomb — the Mausoleum at Halicarnassus, the Roman dynastic tombs of Augustus and Hadrian, and what survives of each.",
    tier: "funerary",
    civilizations: ["greece", "hellenistic-world", "rome", "principate"],
    period: "4th century BCE – 4th century CE",
    summary: [
      "The word comes from a person. Mausolus, a satrap of Caria, was buried at Halicarnassus under a monument so large that its name became the word for the type. It was counted among the Seven Wonders and was brought down by earthquake in the medieval period; its sculpture is substantially in London.",
      "Rome took the form and used it dynastically. The Mausoleum of Augustus, begun before the Principate was settled, is an enormous circular drum that housed the ashes of the imperial family; Hadrian's, across the Tiber, was converted into a fortress and is now the Castel Sant'Angelo — which is why it survives and Augustus's does not.",
      "The type carries a specific argument: a tomb of this scale asserts that the dynasty will continue to maintain it. That is why the surviving examples are the ones later powers found a use for.",
    ],
    keyPoints: [
      {
        claim: "The Mausoleum at Halicarnassus is known from description and from its dispersed sculpture.",
        detail:
          "Foundations survive at Bodrum; the elevation is reconstructed from Pliny's description and from excavated fragments, and reconstructions differ considerably.",
        level: "disputed",
      },
      {
        claim: "Hadrian's mausoleum survives because it was fortified.",
        detail:
          "Its conversion into a papal stronghold preserved the drum. The Mausoleum of Augustus, which had no such afterlife, is far more damaged.",
        level: "documented",
      },
      {
        claim: "Monumental tombs assert dynastic continuity.",
        detail:
          "An inference from scale and siting rather than a stated ancient rationale, but a well-supported reading.",
        level: "probable",
      },
    ],
    examples: [
      {
        name: "The Mausoleum at Halicarnassus",
        place: "Bodrum, Türkiye",
        date: "Mid-4th century BCE",
        level: "disputed",
        note: "Foundations excavated; sculpture principally in the British Museum. The elevation is reconstructed from Pliny and is not settled.",
      },
      {
        name: "The Mausoleum of Augustus",
        place: "Rome",
        date: "Begun 28 BCE",
        level: "probable",
        note: "A circular drum, much altered and long neglected, restored in recent years. The Res Gestae was inscribed on bronze pillars at its entrance.",
        citySlug: "rome",
      },
      {
        name: "The Mausoleum of Hadrian",
        place: "Rome",
        date: "Completed 139 CE",
        level: "documented",
        note: "Converted into a fortress and papal refuge; standing as the Castel Sant'Angelo. Standing, because it was converted into a fortress and maintained.",
        citySlug: "rome",
      },
    ],
    primarySources: [
      S("Natural History", "36.30-31", "The Mausoleum at Halicarnassus, its dimensions and the sculptors who worked on it.", "Pliny the Elder"),
      S("Res Gestae Divi Augusti", "preamble", "Inscribed on bronze pillars at the entrance to Augustus's mausoleum, and copied across the empire.", "Augustus"),
    ],
    relatedTopics: ["necropolis", "pyramid", "vaults-and-domes"],
    citySlugs: ["rome"],
    warfareRefs: ["fortifications"],
    figureRefs: ["augustus", "hadrian"],
    themeRefs: [],
  },
  {
    slug: "pyramid",
    title: "The pyramid",
    standfirst:
      "The largest stone buildings of the ancient world, built over a few centuries and then never again — and still the subject of more nonsense than any other structure.",
    description:
      "Egyptian pyramids — the development from mastaba to step pyramid to true pyramid, the construction evidence, the workers' settlement at Giza, and what is and is not known.",
    tier: "funerary",
    civilizations: ["egypt", "old-kingdom", "middle-kingdom"],
    period: "c. 2670 – 1700 BCE",
    summary: [
      "The sequence is visible in the monuments. Early royal tombs are mastabas, flat-topped rectangular structures. Djoser's at Saqqara stacks six diminishing mastabas into a step pyramid — the earliest large-scale cut-stone building known. Within a century the true pyramid appears at Dahshur and Giza, with the Bent Pyramid recording a change of angle mid-construction.",
      "Construction method is not documented by anyone who built one, and remains the central open question. Ramp systems of various geometries have been proposed; the evidence for each is indirect. What is documented is the organisation: the workers' settlement at Giza has been excavated, with bakeries, breweries, dormitories and a cemetery of workers buried near the monument they built.",
      "That settlement settles one question decisively. The builders were organised labour with provisioning and medical care, not chattel slaves — a claim that goes back to Herodotus and has no support in the material.",
    ],
    keyPoints: [
      {
        claim: "A workers' settlement and cemetery have been excavated at Giza.",
        detail:
          "Bakeries, breweries, accommodation and burials of workers, some showing healed injuries treated well enough to survive. The labour force was fed, housed and buried honourably.",
        level: "documented",
      },
      {
        claim: "The pyramids were not built by enslaved foreigners.",
        detail:
          "The tradition derives from Herodotus and later religious narrative. The archaeological evidence indicates organised Egyptian labour, and there is no material support for the older story.",
        level: "documented",
      },
      {
        claim: "How the blocks were raised is not established.",
        detail:
          "Straight, spiral and internal ramp reconstructions all have advocates and all have difficulties. No ancient account of the method survives from the period.",
        level: "unknown",
      },
    ],
    examples: [
      {
        name: "The Step Pyramid of Djoser",
        place: "Saqqara",
        date: "c. 2670 BCE",
        level: "documented",
        note: "Attributed to Imhotep on the strength of an inscription naming him on a statue base of Djoser — a rare direct link between a named architect and a surviving building. Standing, and excavated together with its walled complex.",
        citySlug: "memphis",
        imageSlug: "step-pyramid-djoser",
      },
      {
        name: "The Great Pyramid of Khufu",
        place: "Giza",
        date: "c. 2560 BCE",
        level: "documented",
        note: "The largest, and the only one of the Seven Wonders still standing. The Diary of Merer, papyri found at Wadi al-Jarf, records the transport of Tura limestone for its casing. Standing, and the only one of the Seven Wonders still surviving.",
        citySlug: "memphis",
        imageSlug: "giza-pyramids",
      },
      {
        name: "The Bent Pyramid",
        place: "Dahshur",
        date: "c. 2600 BCE, under Sneferu",
        level: "documented",
        note: "Its angle changes partway up, which is generally read as a structural correction made during construction — a building that records its own engineering problem. Standing, with the change of angle visible in the surviving fabric.",
      },
    ],
    primarySources: [
      S("The Diary of Merer", "Papyri from Wadi al-Jarf", "The logbook of a work gang transporting limestone for the Great Pyramid — the oldest inscribed papyri known, and a direct administrative record of the project.", "Merer"),
      S("Histories", "2.124-128", "Herodotus on the building of the pyramids, including the labour story that the archaeology does not support.", "Herodotus"),
    ],
    archaeology:
      "The Giza workers' settlement, the Wadi al-Jarf papyri and the quarry evidence together document organisation, supply and logistics far better than they document technique.",
    disputes: [
      {
        question: "How were the blocks raised?",
        positions:
          "External straight ramps require enormous volumes of material; spiral ramps obstruct the corners used for surveying; internal ramps are proposed from density anomalies and are not confirmed. The question is genuinely open, and openness here is not an invitation to speculation from outside the field.",
        level: "unknown",
      },
    ],
    relatedTopics: ["necropolis", "mausoleum", "building-materials", "construction-methods"],
    citySlugs: ["memphis"],
    warfareRefs: [],
    figureRefs: ["imhotep"],
    themeRefs: ["state-and-religion"],
    imageSlug: "giza-pyramids",
  },

  // ─── Commemorative ───────────────────────────────────────────────────
  {
    slug: "triumphal-arch",
    title: "The triumphal arch",
    standfirst:
      "A free-standing gateway that leads nowhere — architecture whose entire function is to carry an inscription and a set of reliefs.",
    description:
      "The Roman commemorative arch — its form, its inscriptions, the reliefs of the Arch of Titus and the reused sculpture of the Arch of Constantine.",
    tier: "commemorative",
    civilizations: ["rome", "roman-republic", "principate", "late-empire"],
    period: "2nd century BCE – 4th century CE",
    summary: [
      "A commemorative arch is a gateway with nothing to close and no wall to pierce. Its purpose is to be read: a large inscription across the attic naming the honorand and the occasion, and relief panels carrying the narrative.",
      "The Arch of Titus is the best case for what the reliefs can do. Its inner panels show the triumphal procession after the Jewish War, including the menorah and the sacred vessels being carried from the Temple in Jerusalem — a Roman monument that is also a primary source for an object it destroyed the context of.",
      "The Arch of Constantine is the other kind of case. Much of its sculpture is reused from monuments of Trajan, Hadrian and Marcus Aurelius, with the earlier emperors' heads recut. Whether that indicates decline in workshop capacity or a deliberate claim to stand in a line of good emperors is argued, and both readings have support.",
    ],
    keyPoints: [
      {
        claim: "The Arch of Titus reliefs depict the spoils of the Jerusalem Temple.",
        detail:
          "The menorah and the table are shown being carried in the triumph, and the panel is the principal visual evidence for their appearance.",
        level: "documented",
      },
      {
        claim: "The Arch of Constantine reuses earlier sculpture.",
        detail:
          "The reused panels are identifiable by style and by the recut portrait heads. The fact is not disputed.",
        level: "documented",
      },
      {
        claim: "Why Constantine's arch reuses sculpture is disputed.",
        detail:
          "Readings range from a decline in available craftsmanship to a deliberate association with the second-century 'good emperors'. The evidence supports both and settles neither.",
        level: "disputed",
      },
    ],
    examples: [
      {
        name: "The Arch of Titus",
        place: "Rome",
        date: "After 81 CE",
        level: "documented",
        note: "Single-bay arch on the Via Sacra, heavily restored in the nineteenth century — the restored portions are deliberately left plainer so they can be distinguished. Standing on the Via Sacra.",
        citySlug: "rome",
        imageSlug: "arch-titus-relief",
      },
      {
        name: "The Arch of Constantine",
        place: "Rome",
        date: "Dedicated 315 CE",
        level: "documented",
        note: "Triple-bay, beside the Colosseum, incorporating sculpture from at least three earlier monuments. Standing complete beside the Colosseum.",
        citySlug: "rome",
        imageSlug: "arch-of-constantine",
      },
    ],
    primarySources: [
      S("The Jewish War", "7.123-157", "The triumph of 71 CE and the spoils carried in it, described by a writer from the defeated side who was in Rome at the time, though he does not say he watched the procession.", "Josephus"),
    ],
    relatedTopics: ["honorific-column", "forum", "vaults-and-domes"],
    citySlugs: ["rome"],
    warfareRefs: [],
    figureRefs: ["constantine", "trajan"],
    themeRefs: [],
    imageSlug: "arch-of-constantine",
  },
  {
    slug: "honorific-column",
    title: "The honorific column",
    standfirst:
      "A column carrying a statue, and in two Roman cases a continuous carved narrative that is our fullest pictorial source for the army on campaign.",
    description:
      "The commemorative column — Trajan's Column and its helical frieze, the Column of Marcus Aurelius, and the problem of reading a state monument as evidence.",
    tier: "commemorative",
    civilizations: ["rome", "principate"],
    period: "1st – 2nd century CE",
    summary: [
      "Trajan's Column, completed in 113 CE, carries a helical relief winding around the shaft, narrating the Dacian wars in some hundred and fifty scenes. It stood between libraries in Trajan's Forum, and the emperor's ashes were placed in its base.",
      "It is the fullest pictorial source we have for the Roman army on campaign — marching, building, fortifying, crossing rivers, treating wounded. A great deal of what modern reconstructions of Roman military equipment show comes from it.",
      "It is also a state victory monument, and it idealises. Its soldiers are more uniformly equipped than excavation supports, its scenes are composed for legibility, and the upper spirals are difficult to see from the ground, which raises the question of who the narrative was for. Using it as a photograph of the army is the standard error.",
    ],
    keyPoints: [
      {
        claim: "The column's frieze is the fullest pictorial source for the Roman army.",
        detail:
          "Some 155 scenes covering march, construction, siege and battle. Casts taken in the nineteenth century preserve detail since lost to pollution.",
        level: "documented",
      },
      {
        claim: "It idealises equipment and formation.",
        detail:
          "Uniformity of armour on the column is not matched by the archaeological record, where equipment varies considerably.",
        level: "probable",
      },
      {
        claim: "Whether the upper spirals could be read is argued.",
        detail:
          "Visibility from ground level is poor. Explanations include viewing from the flanking library balconies, or that legibility was never the point.",
        level: "disputed",
      },
    ],
    examples: [
      {
        name: "Trajan's Column",
        place: "Rome",
        date: "Completed 113 CE",
        level: "documented",
        note: "Attributed to Apollodorus of Damascus. The bronze statue of Trajan on top was replaced by a figure of St Peter in the sixteenth century. Standing complete, with nineteenth-century casts preserving detail since lost to pollution.",
        citySlug: "rome",
        imageSlug: "trajans-column",
      },
      {
        name: "The Column of Marcus Aurelius",
        place: "Rome",
        date: "Late 2nd century CE",
        level: "documented",
        note: "Modelled on Trajan's, with deeper carving and a markedly harsher depiction of the fighting. Standing complete in the Piazza Colonna.",
        citySlug: "rome",
      },
    ],
    primarySources: [
      S("Trajan's Column reliefs", "in situ", "A carved narrative of the Dacian wars, and a primary source that is also state propaganda.", "Roman state monument"),
    ],
    relatedTopics: ["triumphal-arch", "forum", "columns-and-capitals"],
    citySlugs: ["rome"],
    warfareRefs: ["roman-army", "legion", "roman-camps", "ballistae"],
    figureRefs: ["trajan", "marcus-aurelius", "apollodorus-of-damascus"],
    themeRefs: [],
    imageSlug: "trajans-column",
  },

  // ─── Technique and materials ─────────────────────────────────────────
  {
    slug: "architectural-orders",
    title: "The architectural orders",
    standfirst:
      "Doric, Ionic and Corinthian — a system of proportion and ornament that Vitruvius codified and Europe then treated as law for two thousand years.",
    description:
      "The Greek orders — their forms, the Roman additions, Vitruvius's codification and the anthropomorphic account he gives of their origins.",
    tier: "technique",
    civilizations: ["greece", "athens", "rome", "roman-republic"],
    period: "c. 600 BCE onward",
    summary: [
      "An order is a coherent system: a column with its base, shaft and capital, and the entablature it carries, in fixed proportional relationships. Doric has no base, a plain cushion capital and a frieze of triglyphs and metopes; Ionic has a base, a slenderer shaft and a volute capital; Corinthian has an acanthus capital and became the Roman favourite.",
      "Vitruvius codified them, and in doing so gave them an anthropomorphic origin story: Doric as the proportions of a man, Ionic of a woman, Corinthian derived from a basket of acanthus on a girl's grave. These accounts are charming and are not history — they are a Roman writer supplying an explanation for forms already centuries old.",
      "The codification mattered more than the accuracy. Through Vitruvius the orders became prescriptive for the Renaissance and after, which is why the vocabulary of a Greek temple is legible on a nineteenth-century bank.",
    ],
    keyPoints: [
      {
        claim: "The orders are systems of proportion, not just decorative styles.",
        detail:
          "Vitruvius states the ratios, and the surviving buildings broadly follow them while varying considerably in practice.",
        level: "documented",
      },
      {
        claim: "Vitruvius's origin stories are aetiology, not history.",
        detail:
          "The forms predate his account by centuries and no earlier source gives these explanations.",
        level: "probable",
      },
      {
        claim: "Real buildings depart from the canonical proportions.",
        detail:
          "Measured surveys show substantial variation between temples of the same order, which the codified scheme conceals.",
        level: "documented",
      },
    ],
    terms: [
      { term: "entablature", gloss: "Everything the columns carry: architrave, frieze and cornice." },
      { term: "triglyph and metope", gloss: "The alternating grooved blocks and panels of the Doric frieze." },
      { term: "volute", gloss: "The spiral scroll of the Ionic capital." },
    ],
    examples: [
      {
        name: "The Parthenon (Doric, with Ionic elements)",
        place: "Athens",
        date: "447–432 BCE",
        level: "documented",
        note: "Doric externally, with an Ionic frieze around the cella — a mixture the canonical scheme does not anticipate. Standing, and among the most closely measured buildings in the world.",
        citySlug: "athens",
        imageSlug: "parthenon-east",
      },
      {
        name: "The Erechtheion (Ionic)",
        place: "Athens",
        date: "c. 421–406 BCE",
        level: "documented",
        note: "Including the Caryatid porch, where figures replace columns entirely. Standing, with the Caryatid porch surviving in part.",
        citySlug: "athens",
      },
    ],
    primarySources: [
      S("On Architecture", "3–4", "The orders, their proportions and the origin stories.", "Vitruvius"),
    ],
    relatedTopics: ["columns-and-capitals", "temple", "construction-methods"],
    citySlugs: ["athens", "olympia", "corinth", "rome"],
    warfareRefs: [],
    figureRefs: ["vitruvius", "iktinos"],
    themeRefs: [],
  },
  {
    slug: "columns-and-capitals",
    title: "Columns and capitals",
    standfirst:
      "Drums, flutes, dowels and lifting bosses — the column as a construction problem rather than a decorative motif.",
    description:
      "How ancient columns were actually made and erected — quarrying, drums and monoliths, fluting after erection, and the Egyptian and Persian alternatives.",
    tier: "technique",
    civilizations: ["greece", "rome", "egypt", "achaemenid-empire", "persia"],
    period: "Throughout",
    summary: [
      "Most Greek columns are built of drums stacked and centred on wooden dowels, not carved from single blocks. The drums were quarried roughly, brought to site, and finished in place — which is why unfinished buildings show fluting only at the top and bottom of a shaft, with the middle still plain.",
      "That detail is one of the most informative in ancient construction: it proves the fluting was cut after erection, from scaffolding, and it shows the sequence of work. Lifting bosses left on blocks and the cuttings for lifting tongs survive on many buildings and record how the stones were handled.",
      "Other traditions solved it differently. Egyptian columns are often massive and closely spaced because the stone lintels they carry cannot span far, and their capitals take plant forms — papyrus, lotus, palm. Achaemenid columns are exceptionally slender and tall, with double-animal capitals, because they carried timber roofs rather than stone.",
    ],
    keyPoints: [
      {
        claim: "Fluting was cut after the column was erected.",
        detail:
          "Demonstrated by unfinished buildings where only the top and bottom drums are fluted, and by the continuity of flutes across drum joints.",
        level: "documented",
      },
      {
        claim: "Column spacing follows from roofing material.",
        detail:
          "Stone architraves span short distances, so Egyptian hypostyle halls are densely columned; Persian halls with timber roofs are open and slender. The correlation is clear and the reasoning is inference.",
        level: "probable",
      },
      {
        claim: "Lifting bosses and dowel holes record construction method.",
        detail:
          "Visible on many surviving members, and a direct trace of how blocks were moved and joined.",
        level: "documented",
      },
    ],
    examples: [
      {
        name: "The columns of the Apadana",
        place: "Persepolis",
        date: "5th century BCE",
        level: "documented",
        note: "Exceptionally slender and widely spaced, with double-animal capitals; they carried a timber roof. Excavated, with column bases in place and fallen shafts recovered.",
        citySlug: "persepolis",
        imageSlug: "persepolis-columns",
      },
      {
        name: "The hypostyle hall at Karnak",
        place: "Egypt",
        date: "New Kingdom",
        level: "documented",
        note: "Massive closely-spaced columns carrying stone architraves — the opposite structural solution. Standing, with the columns and architraves largely in place.",
        imageSlug: "luxor-temple",
      },
      {
        name: "The Temple of Apollo at Corinth",
        place: "Corinth",
        date: "c. 560 BCE",
        level: "documented",
        note: "Monolithic shafts rather than drums, which is unusual and required moving single blocks of great weight. Standing, with the shafts in place.",
        citySlug: "corinth",
        imageSlug: "corinth-temple-of-apollo",
      },
    ],
    primarySources: [
      S("On Architecture", "3–4, 10", "Proportions, and the machines used for lifting.", "Vitruvius"),
      S("Building accounts of the Erechtheion", "IG I³ 474-479", "Inscribed accounts recording payments for specific tasks, including fluting — a direct record of the work sequence and its cost.", "Athenian building commissioners"),
    ],
    relatedTopics: ["architectural-orders", "construction-methods", "building-materials", "temple"],
    citySlugs: ["athens", "persepolis", "corinth", "memphis"],
    warfareRefs: [],
    figureRefs: ["vitruvius"],
    themeRefs: [],
    imageSlug: "persepolis-columns",
  },
  {
    slug: "roman-concrete",
    title: "Roman concrete",
    standfirst:
      "The material that let Rome roof spaces no post-and-lintel building could, and that sets underwater — with a self-healing mechanism only recently proposed.",
    description:
      "Opus caementicium — pozzolana and lime, the facings, marine concrete, the Pantheon dome, and the modern research into why it lasts.",
    tier: "technique",
    civilizations: ["rome", "roman-republic", "principate"],
    period: "3rd century BCE – 5th century CE",
    summary: [
      "Roman concrete is not modern concrete. It is a mortar of lime and volcanic ash packed around rubble aggregate, built up in horizontal courses behind a facing of brick or small stones, rather than poured into forms around steel.",
      "The volcanic ash is the active ingredient. Pozzolana from the Bay of Naples reacts with lime to produce a mortar that cures without air, which is why Roman harbour moles could be built out into open water — a capability no other ancient builder had.",
      "The Pantheon shows what it made possible: an unreinforced dome of 43 metres span, still the largest of its kind, with the aggregate graded from heavy basalt at the base to light pumice at the crown and the thickness reducing as it rises. Recent analysis has proposed that lime clasts in the mortar allow cracks to reseal when water reaches them, which would help explain the survival rate; the mechanism is recently argued and not yet settled.",
    ],
    keyPoints: [
      {
        claim: "Roman marine concrete cures underwater.",
        detail:
          "Described by Vitruvius and Pliny, and confirmed by analysis of cores drilled from surviving Roman harbour structures.",
        level: "documented",
      },
      {
        claim: "The Pantheon dome grades its aggregate by weight.",
        detail:
          "Heavy basalt low, light pumice at the crown, with thickness reducing upward. Confirmed by examination of the fabric.",
        level: "documented",
      },
      {
        claim: "The self-healing mechanism is recently proposed.",
        detail:
          "Work published in the 2020s attributes durability partly to lime clasts that reseal cracks. It is a serious proposal in active discussion, not an established explanation.",
        level: "disputed",
      },
    ],
    terms: [
      { term: "opus caementicium", gloss: "The concrete itself: mortar and rubble aggregate." },
      { term: "pozzolana", gloss: "Volcanic ash, named from Pozzuoli, that makes the mortar hydraulic." },
      { term: "opus reticulatum", gloss: "A facing of small pyramidal stones set diagonally, giving a net pattern." },
    ],
    examples: [
      {
        name: "The Pantheon",
        place: "Rome",
        date: "Hadrianic, c. 126 CE",
        level: "documented",
        note: "The largest unreinforced concrete dome ever built, still standing and still roofed, because it became a church in the seventh century.",
        citySlug: "rome",
        imageSlug: "pantheon-ceiling",
      },
      {
        name: "The Basilica of Maxentius",
        place: "Rome",
        date: "Begun c. 308 CE",
        level: "documented",
        note: "Concrete vaults of enormous span; three bays survive.",
        citySlug: "rome",
      },
      {
        name: "The harbour works at Portus and Caesarea",
        place: "Italy and Judaea",
        date: "1st century BCE – 2nd century CE",
        level: "documented",
        note: "Marine concrete moles, sampled by drilling in modern research programmes. Surviving underwater and sampled by drilled cores.",
        citySlug: "ostia",
      },
    ],
    primarySources: [
      S("On Architecture", "2.4-6", "Sand, lime and pozzolana, and how they behave.", "Vitruvius"),
      S("Natural History", "35-36", "Building materials, including the volcanic dust that sets in water.", "Pliny the Elder"),
    ],
    relatedTopics: ["vaults-and-domes", "building-materials", "construction-methods", "harbour", "baths"],
    citySlugs: ["rome", "ostia"],
    warfareRefs: ["roman-engineering"],
    figureRefs: ["vitruvius", "hadrian"],
    themeRefs: [],
    imageSlug: "pantheon-ceiling",
  },
  {
    slug: "vaults-and-domes",
    title: "Vaults and domes",
    standfirst:
      "The structural difference between Greek and Roman architecture in one sentence: the Greeks spanned with beams and the Romans spanned with arches.",
    description:
      "Arcuated construction — the barrel and groin vault, the dome, centring and formwork, and the interiors it made possible.",
    tier: "technique",
    civilizations: ["rome", "roman-republic", "principate", "late-empire"],
    period: "2nd century BCE – 6th century CE",
    summary: [
      "Greek architecture is trabeated: horizontal members carried on vertical supports. Stone is strong in compression and weak in tension, so a stone beam can only span a short distance, which is why Greek interiors are small and full of columns.",
      "The arch converts load into compression along its curve, and a vault is an arch extended. Roman builders combined the arch with concrete and could then roof large spaces without internal supports — the barrel vault, the groin vault formed where two barrels cross, and the dome.",
      "Every vault requires centring: a temporary timber formwork carrying the structure until it can stand on its own. That centring is invisible archaeologically but is the practical constraint on what could be built, and the timber for it was a major cost.",
    ],
    keyPoints: [
      {
        claim: "Arcuated construction is the structural distinction between Greek and Roman building.",
        detail:
          "Visible across the two traditions and reflected in interior scale: Greek interiors are constrained by beam spans, Roman ones are not.",
        level: "documented",
      },
      {
        claim: "Timber centring was required and has left no direct trace.",
        detail:
          "Its necessity follows from the structure. Impressions of formwork boards survive in some concrete surfaces, which is the closest evidence.",
        level: "probable",
      },
      {
        claim: "The groin vault allowed openings in the side walls.",
        detail:
          "Because thrust concentrates at the corners rather than along the whole side. This is what makes the great bath halls possible.",
        level: "documented",
      },
    ],
    examples: [
      {
        name: "The Pantheon dome",
        place: "Rome",
        date: "c. 126 CE",
        level: "documented",
        note: "Coffered, oculus open to the sky, and unreinforced. Its span was not exceeded for well over a millennium. Standing and still roofed, because the building became a church in the seventh century.",
        citySlug: "rome",
        imageSlug: "pantheon-ceiling",
      },
      {
        name: "The vaults of the Basilica of Maxentius",
        place: "Rome",
        date: "Begun c. 308 CE",
        level: "documented",
        note: "Coffered groin vaults; the surviving aisle bays show the scale the technique reached. Three bays survive standing.",
        citySlug: "rome",
      },
    ],
    primarySources: [
      S("On Architecture", "5.10, 6.8", "Vaulting in baths and the construction of ceilings.", "Vitruvius"),
    ],
    relatedTopics: ["roman-concrete", "basilica", "baths", "amphitheatre", "construction-methods"],
    citySlugs: ["rome", "ostia"],
    warfareRefs: ["roman-engineering"],
    figureRefs: ["vitruvius"],
    themeRefs: [],
  },
  {
    slug: "construction-methods",
    title: "Construction methods",
    standfirst:
      "Cranes, quarries, scaffolding and unfinished buildings — how ancient structures were actually put up, and the evidence that survives for it.",
    description:
      "Ancient building practice — quarrying and transport, lifting machinery, scaffolding, the organisation of labour, and what unfinished work reveals.",
    tier: "technique",
    civilizations: ["greece", "athens", "rome", "egypt"],
    period: "Throughout",
    summary: [
      "Vitruvius devotes a book to machines, including the treadwheel crane, which multiplied human effort enough to lift architrave blocks weighing many tonnes. Depictions survive — the Haterii relief shows a crane worked by a treadwheel — and lifting cuttings on the blocks themselves show where the tongs gripped.",
      "Unfinished buildings are the best evidence for sequence. Partially fluted columns, lifting bosses left on blocks that were never dressed back, and rough-finished surfaces intended for later smoothing all record where the work stopped.",
      "The organisation is documented for some Athenian projects by inscribed building accounts, which record payments task by task — including to citizens, metics and enslaved workers side by side, sometimes at the same rate for the same job. That is one of the more surprising things the epigraphy shows.",
    ],
    keyPoints: [
      {
        claim: "How the largest blocks were moved and placed is only partly understood.",
        detail:
          "Cranes are attested and their capacity can be estimated, but several surviving architraves and monoliths exceed what a reconstructed treadwheel crane is calculated to lift. Proposals involve multiple machines, earthen ramps or lifting towers, and none is confirmed.",
        level: "unknown",
      },
      {
        claim: "Treadwheel cranes were in use and are depicted.",
        detail:
          "Described by Vitruvius and shown on the Haterii tomb relief. Lifting cuttings on surviving blocks corroborate the use of tongs and lewises.",
        level: "documented",
      },
      {
        claim: "Athenian building accounts record the workforce and its pay.",
        detail:
          "The Erechtheion accounts list workers by status and record payments for specific tasks, including to enslaved workers whose owners were paid.",
        level: "documented",
      },
      {
        claim: "Unfinished work records the construction sequence.",
        detail:
          "Partial fluting, retained lifting bosses and undressed surfaces are direct traces of an interrupted process.",
        level: "documented",
      },
    ],
    examples: [
      {
        name: "The Erechtheion building accounts",
        place: "Athens",
        date: "409–406 BCE",
        level: "documented",
        note: "Inscribed on stone, listing tasks, workers and payments. The single best document of a Greek building project in progress. The inscribed stones survive and are published.",
        citySlug: "athens",
      },
      {
        name: "The unfinished Temple of Apollo at Didyma",
        place: "Ionia",
        date: "Hellenistic onward",
        level: "documented",
        note: "Never completed, with columns at various stages and full-scale setting-out drawings incised on the walls. Standing unfinished, with the setting-out drawings still incised on the walls.",
      },
      {
        name: "The Propylaia",
        place: "Athens",
        date: "437–432 BCE",
        level: "documented",
        note: "Left unfinished at the outbreak of the Peloponnesian War; lifting bosses remain on some blocks. Standing, with unfinished lifting bosses surviving on some blocks.",
        citySlug: "athens",
      },
    ],
    primarySources: [
      S("On Architecture", "10", "Machines: cranes, hoists, and the mechanical principles behind them.", "Vitruvius"),
      S("Building accounts of the Erechtheion", "IG I³ 474-479", "Task-by-task payments recording the workforce and its composition.", "Athenian building commissioners"),
    ],
    archaeology:
      "Quarries preserve half-extracted blocks and tool marks; unfinished buildings preserve sequence; and setting-out drawings incised at full scale on temple walls at Didyma record the design process itself.",
    relatedTopics: ["building-materials", "columns-and-capitals", "roman-concrete", "vaults-and-domes"],
    citySlugs: ["athens", "rome", "memphis"],
    warfareRefs: ["roman-engineering"],
    figureRefs: ["vitruvius", "archimedes"],
    themeRefs: [],
  },
  {
    slug: "building-materials",
    title: "Building materials",
    standfirst:
      "Mudbrick, timber, limestone, marble and brick-faced concrete — and the rule that what survives is not what was mostly used.",
    description:
      "The materials of ancient building — sun-dried brick, timber, stone and its quarrying, fired brick and concrete, and the survival bias that distorts every impression of ancient architecture.",
    tier: "technique",
    civilizations: ["greece", "rome", "egypt", "babylon", "achaemenid-empire"],
    period: "Throughout",
    summary: [
      "Most ancient building was in mudbrick and timber. Almost none of it survives. What survives is stone and fired brick, which were used for temples, tombs and monumental public works — so the impression a visitor forms from ruins is systematically skewed toward the exceptional.",
      "The bias is worth stating plainly because it structures whole fields. Egyptian tombs and temples were stone on the desert edge and survive; Egyptian cities were mudbrick on the floodplain and have largely dissolved. Mesopotamia had no building stone at all, which is why its monuments are brick and their decoration is glazed rather than carved.",
      "Marble is a special case. It was quarried at named sources — Pentelic for Athens, Carrara and a range of coloured stones from across the empire for Rome — and moved at enormous cost. Roman use of coloured marbles from distant provinces was itself a statement about the reach of the empire.",
    ],
    keyPoints: [
      {
        claim: "The proportion of ancient building in perishable materials cannot be quantified.",
        detail:
          "Mudbrick and timber dominated and survive least, so the survival bias is certain in direction and unmeasurable in size. Any statement about what ancient cities mostly looked like is an inference from a skewed sample.",
        level: "unknown",
      },
      {
        claim: "Mudbrick was the dominant building material and survives least.",
        detail:
          "Attested wherever waterlogging or burial has preserved it, and inferable from the absence of stone at ordinary sites.",
        level: "documented",
      },
      {
        claim: "Mesopotamian architecture is brick because there is no local stone.",
        detail:
          "A straightforward consequence of the alluvial geology, and the reason glazed brick decoration developed there.",
        level: "documented",
      },
      {
        claim: "Quarry sources can be identified scientifically.",
        detail:
          "Isotopic and petrographic analysis can assign marble to a quarry, which allows the movement of stone across the empire to be traced.",
        level: "documented",
      },
    ],
    examples: [
      {
        name: "The Ishtar Gate",
        place: "Babylon",
        date: "c. 575 BCE",
        level: "documented",
        note: "Moulded and glazed brick — the decorative solution available where there is no stone to carve. Excavated in fragments and reassembled; the reconstruction stands in Berlin.",
        citySlug: "babylon",
        imageSlug: "ishtar-gate-berlin",
      },
      {
        name: "Pentelic marble in the Parthenon",
        place: "Athens",
        date: "447–432 BCE",
        level: "documented",
        note: "Quarried eighteen kilometres from the site and hauled to the Acropolis; the quarry faces are still visible on Pentelicus. The quarry faces survive on Pentelicus and the building stands.",
        citySlug: "athens",
      },
      {
        name: "Brick-faced concrete at Ostia",
        place: "Ostia",
        date: "2nd century CE",
        level: "documented",
        note: "The standard imperial urban fabric: concrete core with a brick face, stamped bricks sometimes dating the construction to the year. Standing throughout the excavated town, with stamped bricks often dating the work.",
        citySlug: "ostia",
      },
    ],
    primarySources: [
      S("On Architecture", "2", "Materials: brick, sand, lime, pozzolana, stone and timber, with practical judgements on each.", "Vitruvius"),
      S("Natural History", "35-36", "Stones, earths and pigments, and the sources of Roman building material.", "Pliny the Elder"),
    ],
    archaeology:
      "Stamped bricks are among the most useful dating tools in Roman archaeology, since the stamps often name the estate and the consuls of the year. Marble provenancing by isotopic analysis has transformed the study of ancient trade in stone.",
    relatedTopics: ["construction-methods", "roman-concrete", "columns-and-capitals", "house-and-insula"],
    citySlugs: ["athens", "rome", "ostia", "babylon", "memphis"],
    warfareRefs: [],
    figureRefs: ["vitruvius"],
    themeRefs: [],
  },
];

const ARCH_BY_SLUG = new Map(ARCHITECTURE_TOPICS.map((t) => [t.slug, t]));

export function getArchitectureTopic(slug: string): ArchitectureTopic | undefined {
  return ARCH_BY_SLUG.get(slug);
}

export function architectureByTier(tier: ArchitectureTier): ArchitectureTopic[] {
  return ARCHITECTURE_TOPICS.filter((t) => t.tier === tier);
}

export function architectureForCity(citySlug: string): ArchitectureTopic[] {
  return ARCHITECTURE_TOPICS.filter((t) => t.citySlugs.includes(citySlug));
}

export const ARCH_TIER_ORDER: ReadonlyArray<ArchitectureTier> = [
  "sacred",
  "civic",
  "entertainment",
  "water",
  "domestic",
  "funerary",
  "commemorative",
  "technique",
];
