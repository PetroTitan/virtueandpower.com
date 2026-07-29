/**
 * Warfare topic registry.
 *
 * The conceptual layer of the warfare encyclopedia: formations, troop
 * types, institutions, equipment, engineering, naval practice and the
 * operational arts, plus four civilization-level hubs. All rendered by
 * one template at /warfare/[topic].
 *
 * Editorial rules for this file:
 *   - `keyPoints` carry an evidence level each. A statement about what a
 *     Roman legionary was issued is not the same kind of claim as a
 *     statement about how a phalanx actually behaved in contact, and the
 *     registry does not let them look alike.
 *   - Reconstruction is labelled as reconstruction. Much of what is
 *     confidently repeated about ancient armies — the drill of the
 *     manipular line relief, the mechanics of othismos, the training of
 *     the Spartiate — rests on thin evidence and heavy inference.
 *   - Periodisation matters. The Roman army of Scipio, of Caesar and of
 *     Valens are three different institutions, and pages say which one
 *     they mean.
 *   - No page treats a military system as admirable in itself. Sparta
 *     rested on the subjection of the helots; Rome's manpower rested on
 *     conquest and slavery. Describing how an army worked is not
 *     endorsing what it was for.
 */

import type { EvidenceLevel, SourceReference } from "./evidence";

export type WarfareTier =
  | "civilization-hub"
  | "formation"
  | "army"
  | "naval"
  | "engineering"
  | "operations"
  | "institution"
  | "equipment";

export const TIER_LABEL: Record<WarfareTier, string> = {
  "civilization-hub": "Civilization",
  formation: "Formations and troop types",
  army: "Armies",
  naval: "Naval warfare",
  engineering: "Engineering and siege",
  operations: "Operations",
  institution: "Institutions",
  equipment: "Arms and armour",
};

export interface WarfareKeyPoint {
  claim: string;
  detail: string;
  level: EvidenceLevel;
}

export interface WarfareTopic {
  slug: string;
  title: string;
  standfirst: string;
  /** Meta description. */
  description: string;
  tier: WarfareTier;
  /** Slugs into content/civilizations. */
  civilizations: string[];
  period: string;
  summary: string[];
  keyPoints: WarfareKeyPoint[];
  terms?: Array<{ term: string; gloss: string }>;
  primarySources: SourceReference[];
  archaeology?: string;
  disputes?: Array<{ question: string; positions: string; level: EvidenceLevel }>;
  relatedTopics: string[];
  relatedBattles: string[];
  /** Slugs into content/philosophers. */
  figureRefs: string[];
  /** Slugs into content/themes. */
  themeRefs: string[];
  /** Slug into the archive-image registry. */
  imageSlug?: string;
}

const S = (
  work: string,
  locus: string,
  summary: string,
  author?: string,
): SourceReference => ({ work, locus, summary, author });

export const WARFARE_TOPICS: ReadonlyArray<WarfareTopic> = [
  // ─── Civilization hubs ───────────────────────────────────────────────
  {
    slug: "greek-warfare",
    title: "Greek warfare",
    standfirst:
      "Citizen infantry, the phalanx, and a way of fighting bound to the political community that produced it.",
    description:
      "How the Greek city-states made war — the hoplite and the phalanx, the trireme and the rowing citizenry, the transformation under Thebes and Macedon, and the evidence on which the reconstruction rests.",
    tier: "civilization-hub",
    civilizations: ["greece", "athens", "sparta", "macedon"],
    period: "c. 700 – 323 BCE",
    summary: [
      "Greek warfare is inseparable from Greek politics, and the connection runs in both directions. The characteristic Greek soldier was a citizen who bought his own equipment, which made military capacity a function of property, and made the composition of the army an argument about who the community was.",
      "The classical pattern — heavy infantry in close order, decided in a single collision on level ground — held for roughly two centuries and then broke down. The Peloponnesian War made siege, raiding, light troops and sea power decisive; the fourth century added professional generalship, mercenaries and the tactical innovations of Thebes; and Macedon combined pikemen and heavy cavalry into a system that neither city-states nor Persia could match.",
      "Much of what is confidently said about how Greek battle actually worked is reconstruction from a small number of literary passages, and the reconstructions disagree with each other. The pages in this section say which parts are documented and which are inference.",
    ],
    keyPoints: [
      {
        claim: "The hoplite fought as a citizen who equipped himself.",
        detail:
          "Property qualifications for military service are attested across Greek states, and Aristotle connects the rise of hoplite armies to the political weight of the middling propertied class.",
        level: "documented",
      },
      {
        claim: "Naval power reshaped Athenian politics.",
        detail:
          "The trireme was rowed by citizens too poor to arm themselves as hoplites, and the fleet's importance became an argument for their political weight. The link is made explicitly by ancient writers hostile to the democracy.",
        level: "probable",
      },
      {
        claim: "The mechanics of hoplite collision are not settled.",
        detail:
          "Whether othismos, the 'push', describes literal massed shoving or a metaphor for pressure is one of the longest-running disputes in Greek military history.",
        level: "disputed",
      },
    ],
    primarySources: [
      S("History of the Peloponnesian War", "throughout", "The fullest contemporary account of Greek warfare in practice.", "Thucydides"),
      S("Hellenica", "throughout", "A continuation covering the fourth-century transformation, by a professional soldier.", "Xenophon"),
      S("Politics", "1297b", "On the relation between military service, property and constitution.", "Aristotle"),
    ],
    relatedTopics: ["hoplite", "phalanx", "spartan-army", "macedonian-army", "trireme", "naval-warfare"],
    relatedBattles: ["marathon", "thermopylae", "salamis", "plataea", "leuctra", "mantinea-362", "chaeronea"],
    figureRefs: ["themistocles", "epaminondas", "philip-ii", "alexander", "pericles"],
    themeRefs: ["war-and-peace", "military-command", "military-virtue"],
    imageSlug: "corinthian-helmet-olympia",
  },
  {
    slug: "roman-warfare",
    title: "Roman warfare",
    standfirst:
      "An army that won by organisation, engineering and the capacity to lose battles and continue — and that changed shape repeatedly across eight centuries.",
    description:
      "How Rome made war — the manipular and cohortal legion, the professionalisation after Marius, siege engineering, roads and camps, and the recruitment and supply systems that made the army an institution rather than a levy.",
    tier: "civilization-hub",
    civilizations: ["roman-republic", "rome", "principate", "late-empire"],
    period: "c. 400 BCE – 476 CE",
    summary: [
      "There is no single Roman army. The citizen levy that fought Hannibal, the professional force Caesar took into Gaul, the standing frontier army of the Principate and the field armies of the fourth century are different institutions with different recruitment, equipment, command and relation to the state. Statements about 'the Roman army' that do not specify a period are usually wrong about at least one of them.",
      "What persists across the changes is a set of habits: fortify every night, standardise equipment and drill, subordinate the individual to the formation, and treat engineering as a branch of fighting. Rome lost battles at a rate that would have destroyed most ancient states and won wars because its manpower, its organisation and its willingness to continue outlasted the victors.",
      "The army also became the decisive fact in Roman politics. Marius's reforms tied soldiers' futures to their commanders rather than to the state; from that point the legions were a constitutional problem as well as a military instrument.",
    ],
    keyPoints: [
      {
        claim: "Roman armies fortified a camp at the end of each day's march.",
        detail:
          "Described in detail by Polybius and confirmed by hundreds of excavated marching camps across the empire, visible as ditch-and-rampart enclosures with characteristic gate defences.",
        level: "documented",
      },
      {
        claim: "The legion changed from manipular to cohortal organisation.",
        detail:
          "Polybius describes the manipular system of the second century BCE; Caesar's narratives assume the cohort. The transition is generally associated with the late second century BCE and its exact mechanism is not documented.",
        level: "probable",
      },
      {
        claim: "How the manipular lines relieved each other in combat is not attested.",
        detail:
          "The standard reconstruction of hastati falling back through principes is an inference from the formation's described spacing. No ancient source explains the drill.",
        level: "disputed",
      },
    ],
    primarySources: [
      S("Histories", "6.19-42", "The classic technical description of the mid-Republican army, its levy, camp and organisation.", "Polybius"),
      S("The Gallic War", "throughout", "A commander's account of the late Republican army in the field.", "Julius Caesar"),
      S("Epitome of Military Science", "throughout", "A late compilation, valuable and unreliable: it mixes practices of widely separated periods.", "Vegetius"),
    ],
    relatedTopics: ["legion", "roman-army", "marian-reforms", "roman-camps", "roman-engineering", "roman-roads", "siege-warfare", "military-discipline"],
    relatedBattles: ["cannae", "zama", "alesia", "pharsalus", "carrhae", "teutoburg-forest", "adrianople"],
    figureRefs: ["julius-caesar", "scipio-africanus", "augustus", "pompey", "trajan"],
    themeRefs: ["war-and-peace", "military-command", "army-and-state"],
    imageSlug: "trajans-column-testudo",
  },
  {
    slug: "persian-warfare",
    title: "Persian warfare",
    standfirst:
      "An imperial military system built on cavalry, archery, road communications and the mobilisation of subject contingents across three continents.",
    description:
      "How the Achaemenid empire made war — the composite army of satrapal levies, the primacy of cavalry and massed archery, the royal road system, and the difficulty of reconstructing any of it from sources written by the enemy.",
    tier: "civilization-hub",
    civilizations: ["achaemenid-empire", "persia", "persian-imperial-system"],
    period: "c. 550 – 330 BCE",
    summary: [
      "The greatest problem in the study of Achaemenid warfare is evidential. Almost every narrative source is Greek, written by people the Persians were fighting, and the Persian administrative record that survives — the Persepolis tablets, royal inscriptions, reliefs — is rich on organisation and nearly silent on battle.",
      "What can be established is a system rather than an army: a professional core including the royal guard, satrapal levies raised across an enormous territory, heavy reliance on cavalry and on archery delivered in volume, and a communications infrastructure that allowed forces to be moved and supplied at distances no Greek state could contemplate.",
      "The Greek tradition presents Persian armies as vast, gaudy and brittle. The vastness is rhetorical. The brittleness is a retrospective judgement made by the winners, and the same system conquered and held the largest empire the world had seen for two centuries.",
    ],
    keyPoints: [
      {
        claim: "Achaemenid armies combined a professional core with levied contingents.",
        detail:
          "The structure is visible in Greek accounts of order of battle and corroborated by the tribute and delegation reliefs at Persepolis, which show the empire's constituent peoples in distinctive dress and arms.",
        level: "probable",
      },
      {
        claim: "The royal road system supported military movement.",
        detail:
          "Herodotus describes the road from Sardis to Susa with staging posts; the Persepolis Fortification tablets independently document the ration-and-travel authorisation system that made it work.",
        level: "documented",
      },
      {
        claim: "Greek figures for Persian army sizes are unusable.",
        detail:
          "Herodotus's 1.7 million and Arrian's million are rhetorical. Modern reconstructions vary widely and none is secure.",
        level: "literary",
      },
    ],
    primarySources: [
      S("Histories", "7.61-99", "The catalogue of Xerxes' army: the fullest Greek description of Persian contingents, and simultaneously the source of the impossible numbers.", "Herodotus"),
      S("Cyropaedia", "throughout", "A Greek idealisation of Persian military education rather than a report, but by an author who had served alongside Persian troops.", "Xenophon"),
      S("Persepolis Fortification Tablets", "administrative archive", "Elamite administrative records of rations and authorised travel — documentary evidence for the logistics of the empire, independent of the Greek tradition.", "Achaemenid administration"),
    ],
    archaeology:
      "The Apadana reliefs at Persepolis show delegations from the empire's peoples with their characteristic equipment, and the glazed brick archer panels from Susa show guard troops in detail. Both are official self-representation rather than documentary photography, and should be read as such.",
    relatedTopics: ["persian-army", "persian-immortals", "weapons", "logistics", "strategy"],
    relatedBattles: ["marathon", "thermopylae", "salamis", "plataea", "granicus", "issus", "gaugamela"],
    figureRefs: ["cyrus-the-great", "darius-i", "xerxes-i", "artaxerxes-i"],
    themeRefs: ["war-and-peace", "royal-road"],
  },
  {
    slug: "egyptian-warfare",
    title: "Egyptian warfare",
    standfirst:
      "Three thousand years of military practice, from Old Kingdom levies to the chariot armies of the New Kingdom and the mercenary forces of the late period.",
    description:
      "How ancient Egypt made war — the chariot revolution of the New Kingdom, the composite bow, fortress systems on the Nubian frontier, and the unusually rich pictorial and documentary record that survives.",
    tier: "civilization-hub",
    civilizations: ["egypt", "old-kingdom", "middle-kingdom", "new-kingdom", "ptolemaic-egypt"],
    period: "c. 3000 – 30 BCE",
    summary: [
      "Egyptian military history covers a longer span than Greek and Roman warfare combined, and its phases differ from each other more than they resemble one another. Old and Middle Kingdom forces were levies raised by district for specific campaigns and for the fortification of the Nubian frontier. The New Kingdom, following the Hyksos period, fielded a standing professional army built around the chariot.",
      "The chariot is the transformation that matters. Introduced from the Levant, the light two-horse vehicle carrying a driver and a composite-bow archer became the arm of decision and the marker of elite status, and Egyptian workshops produced examples of remarkable engineering quality.",
      "Egypt is also the ancient culture whose warfare is best documented pictorially. Temple reliefs record campaigns in detail, and while they are royal propaganda rather than reportage, they preserve equipment, formations and logistics that no text describes.",
    ],
    keyPoints: [
      {
        claim: "The composite bow and the light chariot arrived from the Levant.",
        detail:
          "The technology appears in Egypt in the Second Intermediate Period and is standard by the Eighteenth Dynasty, and surviving examples have been excavated, including chariots from the tomb of Tutankhamun.",
        level: "documented",
      },
      {
        claim: "Kadesh is among the earliest battles whose tactics can be reconstructed in any detail.",
        detail:
          "Ramesses II's account, carved at multiple temples, describes a march order, an ambush and a recovery. The inscription is documented; the tactical reconstruction built on it is inference, and the text is a royal victory monument for a battle that was at best a draw.",
        level: "probable",
      },
      {
        claim: "Egyptian frontier fortresses were substantial engineering works.",
        detail:
          "The Middle Kingdom fortress chain in Lower Nubia, including Buhen, comprised mud-brick defences with ditches, bastions and controlled entrances, excavated before the Aswan High Dam flooding.",
        level: "documented",
      },
    ],
    primarySources: [
      S("The Kadesh inscriptions", "Abu Simbel, Karnak, Luxor, Ramesseum", "Ramesses II's account of the battle of 1274 BCE, in poem and bulletin form with accompanying reliefs.", "Ramesses II"),
      S("Annals of Thutmose III", "Karnak", "Campaign records including the account of the battle of Megiddo, drawn from day-books.", "Thutmose III"),
      S("Library of History", "1", "A late Greek account of Egyptian institutions, used with caution.", "Diodorus Siculus"),
    ],
    archaeology:
      "The Buhen fortress excavations, the Tutankhamun chariots, and the extensive temple relief programmes give Egyptian warfare a material and pictorial record that Greek and Roman warfare largely lack for comparable periods.",
    relatedTopics: ["egyptian-army", "fortifications", "weapons", "logistics"],
    relatedBattles: [],
    figureRefs: ["akhenaten"],
    themeRefs: ["war-and-peace"],
  },

  // ─── Formations and troop types ──────────────────────────────────────
  {
    slug: "hoplite",
    title: "The hoplite",
    standfirst:
      "The armoured citizen spearman of the Greek city-states, defined less by his weapon than by the shield he carried and the man beside him.",
    description:
      "The Greek hoplite — his panoply, the aspis and why its shape mattered, the property qualification that produced him, and the disputes about how hoplite battle actually worked.",
    tier: "formation",
    civilizations: ["greece", "athens", "sparta"],
    period: "c. 700 – 300 BCE",
    summary: [
      "A hoplite was a heavy infantryman who fought in close order with a thrusting spear and a large round shield. He was not a professional. In most Greek states he was a citizen of sufficient property to buy his own equipment, who farmed for most of the year and campaigned in the season when he could be spared.",
      "The defining object is the shield, the aspis: roughly ninety centimetres across, wooden, faced in bronze, and gripped by a central armband and a handgrip at the rim. That grip is the whole tactical logic. It made the shield heavy and awkward to carry alone, and it meant that its right-hand portion covered the man to the right. A hoplite line protected itself only by staying closed.",
      "The panoply otherwise varied more than reconstructions suggest. Bronze bell cuirasses give way to composite linen armour; helmet types change; greaves come and go. There was no standard issue because there was no issuing authority.",
    ],
    keyPoints: [
      {
        claim: "The shield's double grip is the basis of the formation.",
        detail:
          "The porpax-and-antilabe arrangement is well attested in surviving shields, vase painting and text. Thucydides notes that hoplite lines drift rightward as each man edges toward the cover of his neighbour's shield.",
        level: "documented",
      },
      {
        claim: "Hoplite status was tied to property.",
        detail:
          "Census classes at Athens and comparable arrangements elsewhere tied military role to wealth, because equipment was self-purchased.",
        level: "documented",
      },
      {
        claim: "How hoplite battle was decided is disputed.",
        detail:
          "The 'orthodox' reconstruction has the lines meet and physically push; the 'heretical' view has them fight at spear's length in a looser order. Both readings are defended by serious scholars from the same passages.",
        level: "disputed",
      },
    ],
    terms: [
      { term: "hoplon / aspis", gloss: "The round shield. The soldier is probably named from his equipment generally rather than from the shield specifically." },
      { term: "doru", gloss: "The thrusting spear, roughly two to two and a half metres, with a butt-spike as a secondary point." },
      { term: "othismos", gloss: "'Pushing'. Whether this is literal massed shoving or a metaphor is the central dispute in the field." },
    ],
    primarySources: [
      S("History of the Peloponnesian War", "5.71", "The observation that hoplite lines drift to the right as men seek the cover of the shield beside them.", "Thucydides"),
      S("Anabasis", "throughout", "A campaigning soldier's account of hoplites in practice over a long retreat.", "Xenophon"),
    ],
    archaeology:
      "Surviving shields, helmets and greaves are numerous, many dedicated at sanctuaries such as Olympia. The Chigi vase of the seventh century BCE is the earliest clear depiction of hoplites in formation with a piper.",
    disputes: [
      {
        question: "Was othismos a literal push?",
        positions:
          "The orthodox reading takes Greek battle as a collision of masses decided by shoving, with depth as the decisive variable. The alternative holds that men cannot fight while being crushed, and reads the language of pushing as figurative. The dispute is unresolved and touches every reconstruction of Greek battle.",
        level: "disputed",
      },
    ],
    relatedTopics: ["phalanx", "shields", "armour", "helmets", "greek-warfare", "spartan-army"],
    relatedBattles: ["marathon", "thermopylae", "plataea", "leuctra", "mantinea-362"],
    figureRefs: ["pericles", "epaminondas"],
    themeRefs: ["military-virtue", "courage"],
    imageSlug: "chigi-vase-hoplites",
  },
  {
    slug: "phalanx",
    title: "The phalanx",
    standfirst:
      "A line of heavy infantry in close order — the dominant formation of Greek and Macedonian warfare, and two quite different things under the same name.",
    description:
      "The phalanx in its Greek hoplite and Macedonian pike forms — depth, frontage, the tactical problems it could not solve, and the transformation under Philip II.",
    tier: "formation",
    civilizations: ["greece", "sparta", "macedon"],
    period: "c. 700 – 168 BCE",
    summary: [
      "The word covers two formations that differ fundamentally. The Greek hoplite phalanx was a line of spearmen with large shields, typically eight ranks deep, in which only the first two ranks could reach the enemy. The Macedonian phalanx of Philip and Alexander carried the sarissa, a pike of five to six metres held in both hands, with a smaller shield slung from the shoulder, in which the points of four or five ranks projected beyond the front.",
      "Both share one property that explains their dominance and their eventual defeat: frontal invulnerability and flank fragility. A formed phalanx was nearly impossible to break from the front and could be destroyed by anything that reached its side or rear, including broken ground.",
      "The Macedonian version was never intended to win battles alone. It fixed the enemy line while heavy cavalry found the decisive point. Hellenistic successors who used the pike phalanx as the arm of decision, without comparable cavalry, lost to Roman legions that could exploit a break in the line — the lesson Polybius draws explicitly.",
    ],
    keyPoints: [
      {
        claim: "The Macedonian phalanx projected several ranks of pike points.",
        detail:
          "Polybius describes the sarissa and calculates the projection; sarissa butt-spikes and points have been excavated at Vergina and elsewhere.",
        level: "documented",
      },
      {
        claim: "Depth was tactically variable and deliberately so.",
        detail:
          "Eight ranks was conventional; Epaminondas used fifty at Leuctra; Thucydides records varying depths within a single line.",
        level: "documented",
      },
      {
        claim: "The intervals a phalanx actually kept in combat are not established.",
        detail:
          "The Hellenistic tactical manuals give figures for open and close order, but they are idealised drill-book numbers. What frontage a real phalanx occupied as it crossed broken ground and closed with an enemy is reconstruction.",
        level: "disputed",
      },
      {
        claim: "Polybius diagnoses the phalanx's structural weakness.",
        detail:
          "In his comparison of the phalanx and the legion he argues the phalanx is irresistible on ground that suits it and helpless on ground that does not — and that battles are rarely fought on ground of one's choosing.",
        level: "documented",
      },
    ],
    terms: [
      { term: "sarissa", gloss: "The Macedonian pike, five to six metres, two-handed, counterweighted by a butt-spike." },
      { term: "syntagma", gloss: "A tactical sub-unit of the Macedonian phalanx, conventionally 256 men in a 16 × 16 block." },
    ],
    primarySources: [
      S("Histories", "18.28-32", "The classic comparison of the Macedonian phalanx and the Roman legion.", "Polybius"),
      S("Anabasis of Alexander", "throughout", "The phalanx as one arm of a combined system.", "Arrian"),
      S("Tactica", "throughout", "A Hellenistic technical manual on phalanx drill and intervals.", "Asclepiodotus"),
    ],
    relatedTopics: ["hoplite", "macedonian-army", "legion", "companion-cavalry", "battle-tactics"],
    relatedBattles: ["plataea", "leuctra", "chaeronea", "issus", "gaugamela"],
    figureRefs: ["philip-ii", "alexander", "epaminondas"],
    themeRefs: ["military-innovation", "military-command"],
  },
  {
    slug: "legion",
    title: "The legion",
    standfirst:
      "Rome's principal formation across eight centuries, and an institution that changed its organisation, recruitment and equipment more than once.",
    description:
      "The Roman legion — manipular and cohortal organisation, the maniple's intervals, the century and its officers, and the periodisation that most descriptions of 'the legion' collapse.",
    tier: "formation",
    civilizations: ["roman-republic", "rome", "principate", "late-empire"],
    period: "c. 400 BCE – 5th century CE",
    summary: [
      "The mid-Republican legion Polybius describes was drawn up in three lines by age and wealth: hastati, principes and triarii, with velites skirmishing in front. Its units, the maniples, stood with intervals between them rather than in a continuous line, which gave the formation articulation a phalanx did not have.",
      "By the late Republic the cohort of roughly 480 men had replaced the maniple as the tactical unit, the property qualification had gone, and service was long-term and paid. Caesar's narratives assume this army. Under the Principate the legion became a permanent frontier institution of about 5,000 citizens, brigaded with auxiliary units of non-citizens who received citizenship on discharge.",
      "The late-Roman army is different again: smaller units, a distinction between mobile field forces and frontier garrisons, and heavy reliance on recruits from beyond the frontier. Writers who describe 'the Roman legion' without a date are usually describing the second of these four.",
    ],
    keyPoints: [
      {
        claim: "The maniple system used intervals rather than a continuous line.",
        detail:
          "Polybius is explicit about the spacing, and the arrangement is what allows the second line to reinforce or relieve the first.",
        level: "documented",
      },
      {
        claim: "The mechanics of line relief are reconstructed, not attested.",
        detail:
          "How exactly hastati withdrew through principes in contact is nowhere described. Every account of it in modern writing is inference from the intervals.",
        level: "disputed",
      },
      {
        claim: "The centurion was the load-bearing rank.",
        detail:
          "Attested in narrative, in inscriptions and in the disproportionate centurion casualties Caesar records. Roman tactical cohesion depended on a long-service professional officer at the level of about eighty men.",
        level: "documented",
      },
    ],
    terms: [
      { term: "manipulus", gloss: "'Handful'. The tactical unit of the mid-Republican legion, two centuries." },
      { term: "cohors", gloss: "The cohort, roughly 480 men, the tactical unit from the late Republic onward." },
      { term: "pilum", gloss: "The heavy javelin, thrown before contact; designed to bend on impact so it could not be thrown back." },
    ],
    primarySources: [
      S("Histories", "6.19-42", "The fullest technical description of the mid-Republican legion.", "Polybius"),
      S("The Gallic War", "throughout", "The late Republican legion in the field.", "Julius Caesar"),
      S("Epitome of Military Science", "1-2", "A late compilation mixing periods; useful and treacherous.", "Vegetius"),
    ],
    archaeology:
      "Legionary fortresses across the empire, from Caerleon to Dura-Europos, give plan, scale and equipment. The Vindolanda tablets provide unit strength returns and duty rosters — administrative documents from inside the institution.",
    relatedTopics: ["roman-army", "marian-reforms", "roman-camps", "military-discipline", "recruitment", "weapons"],
    relatedBattles: ["cannae", "zama", "pharsalus", "alesia", "carrhae", "teutoburg-forest"],
    figureRefs: ["julius-caesar", "scipio-africanus", "augustus"],
    themeRefs: ["army-and-state", "military-command"],
  },
  {
    slug: "spartan-army",
    title: "The Spartan army",
    standfirst:
      "The only full-time infantry force in classical Greece, produced by a social system resting on the permanent subjection of a subject population.",
    description:
      "The Spartan military system — the agoge, the citizen body and its collapse, the helot foundation, battlefield reputation against battlefield record, and the difficulty of sources written mostly by admirers and enemies.",
    tier: "army",
    civilizations: ["sparta", "greece"],
    period: "c. 700 – 371 BCE",
    summary: [
      "Sparta's distinction was not equipment or tactics — Spartiates fought as hoplites in a phalanx like other Greeks — but that they did nothing else. Citizens were barred from agriculture and trade, which were performed by the helots, an enserfed population held by force and ritually declared enemies each year.",
      "That arrangement produced drilled infantry capable of manoeuvres other Greek armies could not attempt, and Thucydides and Xenophon both record the effect of Spartan steadiness on opponents. It also produced a structural vulnerability: citizen numbers could not be replaced, and by Leuctra roughly 700 Spartiates were present where earlier generations had fielded several thousand.",
      "The evidence is unusually poor for so famous an institution. Sparta produced almost no literature. Most of what we have comes from Athenian admirers such as Xenophon, from the hostile, and from Plutarch writing centuries later — a body of material scholars call the Spartan mirage.",
    ],
    keyPoints: [
      {
        claim: "Spartan citizens were prohibited from productive labour.",
        detail:
          "Attested across the sources and structurally necessary: the helot system supplied the agricultural surplus.",
        level: "documented",
      },
      {
        claim: "The citizen body contracted severely.",
        detail:
          "Herodotus implies around 8,000 Spartiates at the time of the Persian Wars; Xenophon's figures for Leuctra indicate a few hundred in the field. Aristotle diagnoses the decline as a consequence of land concentration.",
        level: "probable",
      },
      {
        claim: "Much detail about the agoge is late.",
        detail:
          "The fullest descriptions come from Plutarch, writing some 700 years after the classical period, and may describe a Hellenistic and Roman-era revival staged partly for visitors.",
        level: "disputed",
      },
    ],
    terms: [
      { term: "agoge", gloss: "The state upbringing of Spartiate boys. Best documented in late sources." },
      { term: "homoioi", gloss: "'The similars'. The full citizens." },
      { term: "krypteia", gloss: "An institution involving young Spartiates and the killing of helots, described by Plutarch citing Aristotle." },
    ],
    primarySources: [
      S("Constitution of the Lacedaemonians", "throughout", "A short admiring treatise by a contemporary who knew Sparta well and sent his sons there.", "Xenophon"),
      S("Politics", "1269a-1271b", "A critical analysis, including the diagnosis of citizen decline through land concentration.", "Aristotle"),
      S("Life of Lycurgus", "throughout", "The fullest account of Spartan institutions, written centuries later.", "Plutarch"),
    ],
    disputes: [
      {
        question: "How much of the Spartan system is a later construction?",
        positions:
          "The 'Spartan mirage' problem: admirers idealised, enemies distorted, and the fullest descriptions are Roman-era. Some scholars hold that a distinctively rigorous Spartan upbringing is classical; others that much of the detail reflects later reinvention.",
        level: "disputed",
      },
    ],
    relatedTopics: ["hoplite", "phalanx", "military-discipline", "training", "greek-warfare"],
    relatedBattles: ["thermopylae", "plataea", "leuctra", "mantinea-362"],
    figureRefs: ["leonidas", "lycurgus", "epaminondas"],
    themeRefs: ["discipline", "military-virtue", "spartan-order"],
  },
  {
    slug: "macedonian-army",
    title: "The Macedonian army",
    standfirst:
      "The combined-arms system Philip II built and Alexander used to destroy the Achaemenid empire: pikemen to fix, heavy cavalry to decide.",
    description:
      "Philip's military reforms and Alexander's use of them — the sarissa phalanx, the Companion cavalry, the hypaspists, the siege train, and the integration that made the parts effective.",
    tier: "army",
    civilizations: ["macedon", "hellenistic-world"],
    period: "359 – 323 BCE and after",
    summary: [
      "Philip II inherited a weak kingdom and built an army out of it in twenty years. The elements were not all new — deep formations, longer spears and good cavalry existed — but the integration was, and Philip's years as a hostage in Thebes during the Epaminondas period are usually seen as formative.",
      "The system had three parts working together. The pike phalanx presented a frontage no infantry could break head-on and pinned the enemy line. The hypaspists, more mobile heavy infantry, held the hinge between phalanx and cavalry. The Companion cavalry, charging in wedge, went for the point where the enemy line opened.",
      "Philip also professionalised: year-round service, drill, a siege train with torsion artillery, and a reduction of baggage that let the army move faster than its opponents expected. Alexander added operational boldness and personal command of the decisive charge.",
    ],
    keyPoints: [
      {
        claim: "The system was combined-arms by design.",
        detail:
          "The phalanx is never the arm of decision in Alexander's battles; in every major engagement the break is made by cavalry against a gap the infantry has created.",
        level: "documented",
      },
      {
        claim: "Philip reduced the baggage train to increase mobility.",
        detail:
          "Reported in the ancient tradition and consistent with the campaign speeds the narratives record.",
        level: "probable",
      },
      {
        claim: "Macedonian siege capability was new in Greek warfare.",
        detail:
          "Torsion artillery and a professional engineering corps allowed Philip and Alexander to take fortified cities that earlier Greek armies would have had to blockade.",
        level: "probable",
      },
    ],
    primarySources: [
      S("Anabasis of Alexander", "throughout", "The principal narrative, drawing on participants.", "Arrian"),
      S("Library of History", "16", "The fullest account of Philip's reign and reforms.", "Diodorus Siculus"),
    ],
    archaeology:
      "The royal tombs at Vergina produced armour, weapons and sarissa fittings of the period, and the painted facade and grave goods give the material culture of the Macedonian elite directly.",
    relatedTopics: ["phalanx", "companion-cavalry", "siege-warfare", "catapults", "battle-tactics", "greek-warfare"],
    relatedBattles: ["chaeronea", "granicus", "issus", "gaugamela"],
    figureRefs: ["philip-ii", "alexander"],
    themeRefs: ["military-innovation", "military-command"],
  },
  {
    slug: "companion-cavalry",
    title: "The Companion cavalry",
    standfirst:
      "The heavy cavalry of the Macedonian kings, and the arm that decided every one of Alexander's major battles.",
    description:
      "The hetairoi — recruitment from the Macedonian nobility, the wedge formation, the lance, and the role of the cavalry charge in the Macedonian combined-arms system.",
    tier: "formation",
    civilizations: ["macedon"],
    period: "4th century BCE",
    summary: [
      "The hetairoi, 'companions', were the mounted nobility of Macedon, bound to the king by a personal relationship that the name states plainly. They were heavy cavalry by ancient standards: armoured, riding without stirrups, and armed with the xyston, a stout thrusting lance used overarm.",
      "Their tactical signature was the wedge, which the tradition attributes to Philip and which allowed a compact body to enter a gap and widen it. The Companions did not charge formed infantry frontally; in every one of Alexander's battles they are directed at a seam that has opened or been induced to open.",
      "Riding without stirrups constrains what heavy cavalry can do, and the point is often misunderstood. A rider secured by a deep saddle and by thigh grip could deliver a lance thrust effectively; what he could not do is absorb the shock of a couched-lance charge in the medieval manner.",
    ],
    keyPoints: [
      {
        claim: "The Companions were the decisive arm in Alexander's battles.",
        detail:
          "At the Granicus, Issus and Gaugamela the break is made by the Companion charge led by Alexander in person.",
        level: "documented",
      },
      {
        claim: "The wedge formation is attributed to Philip.",
        detail:
          "Reported in the Hellenistic tactical writers, who also credit Scythian and Thracian precedent.",
        level: "probable",
      },
      {
        claim: "Stirrups were not in use.",
        detail:
          "Stirrups reach the Mediterranean world far later. Ancient heavy cavalry was effective without them, which is a fact about riding technique rather than a limitation on effectiveness.",
        level: "documented",
      },
    ],
    primarySources: [
      S("Anabasis of Alexander", "1.14-16, 2.10-11, 3.13-15", "The Companion charges at the three great battles.", "Arrian"),
      S("Tactica", "throughout", "On cavalry formations including the wedge.", "Asclepiodotus"),
    ],
    relatedTopics: ["macedonian-army", "phalanx", "battle-tactics", "weapons"],
    relatedBattles: ["chaeronea", "granicus", "issus", "gaugamela"],
    figureRefs: ["alexander", "philip-ii"],
    themeRefs: ["military-command", "military-innovation"],
  },
  {
    slug: "persian-immortals",
    title: "The Persian Immortals",
    standfirst:
      "The royal guard corps of the Achaemenid kings, known by a Greek name that may rest on a mistranslation.",
    description:
      "The Achaemenid royal guard — what Herodotus says, what the name may actually have meant, what the Susa relief panels show, and why the unit is better attested as an image than as a military formation.",
    tier: "formation",
    civilizations: ["achaemenid-empire", "persia"],
    period: "c. 550 – 330 BCE",
    summary: [
      "Herodotus describes a corps of ten thousand picked Persians whose number was kept permanently at strength, every casualty replaced at once, and says they were called the Immortals for that reason. They form the royal guard and appear at Thermopylae as the troops sent in when others have failed.",
      "The name is a problem. A widely discussed suggestion is that the Greek athanatoi, 'immortals', renders an Old Persian word closer to 'companions' or 'followers', anusiya, and that Herodotus or his informant misheard or reinterpreted it. The proposal is not proven and not universally accepted.",
      "As a military formation the Immortals are thinly evidenced: they are described by an enemy, and they do not appear in the Persian record under a corresponding name. What is well attested is the existence and prominence of royal guard troops, visible in the glazed brick panels from Susa showing spearmen in patterned robes.",
    ],
    keyPoints: [
      {
        claim: "Herodotus describes a 10,000-strong guard kept permanently at strength.",
        detail: "The account is clear and is the origin of everything later said about the unit.",
        level: "documented",
      },
      {
        claim: "The name may be a mistranslation.",
        detail:
          "The proposed Old Persian original, anusiya, would mean something like 'companions'. The argument is philological and remains contested.",
        level: "disputed",
      },
      {
        claim: "Royal guard troops are attested in Persian art.",
        detail:
          "The Susa archer panels, now in the Louvre and elsewhere, show guardsmen with spears, bows and quivers in elaborately patterned dress.",
        level: "documented",
      },
    ],
    primarySources: [
      S("Histories", "7.83, 7.211", "The description of the corps and its use at Thermopylae.", "Herodotus"),
    ],
    archaeology:
      "The glazed brick archer frieze from the palace of Darius at Susa is the principal visual evidence. It is royal self-representation and its relation to any specific unit is an interpretation.",
    disputes: [
      {
        question: "Were the Immortals a distinct standing corps?",
        positions:
          "Herodotus's account is the only substantial one, it comes from an enemy tradition, and the Persian administrative record does not obviously corroborate it. That a royal guard existed is not in doubt; the specific institution as Herodotus describes it is less secure than its fame suggests.",
        level: "disputed",
      },
    ],
    relatedTopics: ["persian-army", "persian-warfare", "weapons", "armour"],
    relatedBattles: ["thermopylae", "plataea", "gaugamela"],
    figureRefs: ["xerxes-i", "darius-i"],
    themeRefs: ["war-and-peace"],
  },
  {
    slug: "roman-army",
    title: "The Roman army",
    standfirst:
      "Four distinct institutions under one name, separated by recruitment, terms of service and their relationship to the state.",
    description:
      "The Roman army across its phases — the citizen levy, the professional army of the late Republic, the standing frontier army of the Principate, and the field armies of the late empire.",
    tier: "army",
    civilizations: ["roman-republic", "rome", "principate", "late-empire"],
    period: "c. 400 BCE – 5th century CE",
    summary: [
      "The Republican levy was a citizen militia raised annually by property class, in which men provided their own equipment and expected to return to their farms. Its strength was the manpower of Rome and its Italian allies, which is what allowed Rome to absorb Cannae and continue.",
      "The professional army of the late Republic recruited without property qualification, served for long terms, and looked to its commander for land on discharge. That single change made armies into political constituencies and is the mechanism behind the civil wars.",
      "Augustus regularised the result into a standing army with fixed terms, a treasury for discharge payments, and permanent stations on the frontiers. The late empire restructured again into mobile field armies and frontier troops, with heavy recruitment of non-Romans.",
    ],
    keyPoints: [
      {
        claim: "Republican manpower, not tactics, explains Rome's resilience.",
        detail:
          "Polybius records the scale of the Roman and allied levy; the capacity to raise new armies after catastrophic losses is the recurring feature of the Punic Wars.",
        level: "probable",
      },
      {
        claim: "Professionalisation tied soldiers to commanders.",
        detail:
          "Land for veterans depended on a general's political weight, which gave armies a direct interest in their commander's success at Rome.",
        level: "probable",
      },
      {
        claim: "Auxiliary service was a route to citizenship.",
        detail:
          "Documented by the bronze discharge diplomas issued to auxiliaries, hundreds of which survive.",
        level: "documented",
      },
    ],
    primarySources: [
      S("Histories", "6.19-42", "The Republican levy and organisation.", "Polybius"),
      S("Annals", "1.16-49", "The mutinies of 14 CE: the army as a political actor, described by a hostile senator.", "Tacitus"),
      S("Res Gestae Divi Augusti", "15-17", "Augustus on settlement of veterans and the military treasury.", "Augustus"),
    ],
    archaeology:
      "Military diplomas, the Vindolanda tablets, legionary fortresses and the frontier works of Britain and Germany together document recruitment, pay, strength returns and daily duty in a way no literary source does.",
    relatedTopics: ["legion", "marian-reforms", "recruitment", "military-discipline", "roman-camps", "roman-warfare"],
    relatedBattles: ["cannae", "zama", "pharsalus", "teutoburg-forest", "adrianople"],
    figureRefs: ["julius-caesar", "augustus", "trajan", "scipio-africanus"],
    themeRefs: ["army-and-state", "army-and-state"],
  },
  {
    slug: "persian-army",
    title: "The Persian army",
    standfirst:
      "The military system of the Achaemenid empire: a professional core, provincial levies, and a reliance on cavalry and massed archery.",
    description:
      "How Achaemenid armies were raised, organised and supplied — the satrapal levy, the decimal structure Herodotus reports, cavalry and archery, and the evidential problem of reconstructing it from Greek sources.",
    tier: "army",
    civilizations: ["achaemenid-empire", "persia", "persian-imperial-system"],
    period: "c. 550 – 330 BCE",
    summary: [
      "Achaemenid armies were assembled rather than maintained. A professional core around the king and the satraps was expanded for campaigns by levies from the provinces, each contributing troops in their own equipment and fighting style — which is what produces the catalogue of peoples in Herodotus and the delegation reliefs at Persepolis.",
      "The tactical emphasis differed from Greek practice. Persian infantry combined a wicker or hide shield with the bow, and the intended battle was one in which massed archery disordered an enemy before cavalry exploited it. Against heavy infantry on constricted ground this failed repeatedly; on open ground against opponents without an answer to cavalry it worked for two centuries.",
      "The organisation Herodotus reports is decimal — units of ten, hundred, thousand and ten thousand. It is plausible and is not independently confirmed in the Persian record.",
    ],
    keyPoints: [
      {
        claim: "Contingents served in their own equipment.",
        detail:
          "Herodotus's catalogue describes distinct arms and dress by people, and the Persepolis reliefs corroborate the diversity, if not the specific battle order.",
        level: "probable",
      },
      {
        claim: "The system depended on imperial logistics.",
        detail:
          "The Fortification tablets document authorised travel and ration issue across the empire — the administrative machinery that made large-scale movement possible.",
        level: "documented",
      },
      {
        claim: "Greek accounts of Persian tactics are shaped by Greek victory.",
        detail:
          "The narrative of brittle, over-large Persian armies is written by the winners of a handful of engagements, and is a poor guide to a military system that conquered from the Aegean to the Indus.",
        level: "disputed",
      },
    ],
    primarySources: [
      S("Histories", "7.61-99, 9.20-70", "The catalogue of contingents and the account of Persian tactics at Plataea.", "Herodotus"),
      S("Anabasis", "1", "A Greek mercenary's first-hand view of a Persian royal army on campaign at Cunaxa.", "Xenophon"),
      S("Persepolis Fortification Tablets", "administrative archive", "Documentary evidence for imperial logistics.", "Achaemenid administration"),
    ],
    relatedTopics: ["persian-warfare", "persian-immortals", "logistics", "weapons", "strategy"],
    relatedBattles: ["marathon", "thermopylae", "plataea", "granicus", "issus", "gaugamela", "carrhae"],
    figureRefs: ["cyrus-the-great", "darius-i", "xerxes-i"],
    themeRefs: ["war-and-peace", "royal-road"],
  },
  {
    slug: "egyptian-army",
    title: "The Egyptian army",
    standfirst:
      "From district levies to a standing professional force built around the chariot, across a span longer than the whole of Greek and Roman history.",
    description:
      "Egyptian military organisation — Old and Middle Kingdom levies, the New Kingdom professional army and chariotry, foreign contingents, and the pictorial record that documents it.",
    tier: "army",
    civilizations: ["egypt", "old-kingdom", "middle-kingdom", "new-kingdom"],
    period: "c. 3000 – 332 BCE",
    summary: [
      "Before the New Kingdom, Egyptian forces were levied for particular campaigns: district contingents under officials, supplemented by Nubian archers, used for frontier control and for expeditions to secure trade routes and quarries rather than for conquest.",
      "The New Kingdom army is a different institution. Following the expulsion of the Hyksos, Egypt fielded a standing force organised into divisions named for gods, with a professional officer corps and a chariot arm that carried the elite. Campaigns reached the Euphrates.",
      "Foreign troops were incorporated throughout — Nubian, Libyan and later Sherden and Greek — and by the Late Period Greek and Carian mercenaries were a central component, a development that left graffiti carved by Greek soldiers on the colossi at Abu Simbel.",
    ],
    keyPoints: [
      {
        claim: "New Kingdom divisions were named for gods.",
        detail:
          "The Kadesh accounts name the divisions of Amun, Re, Ptah and Sutekh and describe their march order.",
        level: "documented",
      },
      {
        claim: "The chariot was an elite arm and a status marker.",
        detail:
          "Attested in text, in relief and in surviving vehicles, including six from the tomb of Tutankhamun.",
        level: "documented",
      },
      {
        claim: "The size and internal organisation of Egyptian armies is largely unrecoverable.",
        detail:
          "Divisions are named and campaigns are narrated, but establishment strengths are not recorded. Figures in the modern literature are estimates built on the capacity of the state rather than on any Egyptian statement.",
        level: "unknown",
      },
      {
        claim: "Greek mercenaries served in Egypt from the seventh century BCE.",
        detail:
          "Documented directly by Greek graffiti cut into the leg of a colossus at Abu Simbel by soldiers of Psamtik II.",
        level: "documented",
      },
    ],
    primarySources: [
      S("The Kadesh inscriptions", "Abu Simbel, Karnak, Luxor, Ramesseum", "March order, ambush and recovery, in a royal victory account.", "Ramesses II"),
      S("Annals of Thutmose III", "Karnak", "Campaign records including Megiddo.", "Thutmose III"),
      S("Histories", "2", "A Greek account of Egyptian institutions including the warrior class.", "Herodotus"),
    ],
    archaeology:
      "The Buhen and Mirgissa fortresses, the Tutankhamun chariots and weapons, and the Abu Simbel mercenary graffiti provide direct material evidence across three periods.",
    relatedTopics: ["egyptian-warfare", "fortifications", "weapons", "logistics"],
    relatedBattles: [],
    figureRefs: [],
    themeRefs: ["war-and-peace"],
  },
  {
    slug: "marian-reforms",
    title: "The Marian reforms",
    standfirst:
      "A set of changes traditionally credited to Gaius Marius that turned the Roman citizen levy into a professional army — and a label modern scholarship increasingly distrusts.",
    description:
      "What Marius is credited with, what the sources actually say, why the idea of a single reform package has been challenged, and the political consequence that is not in doubt.",
    tier: "institution",
    civilizations: ["roman-republic", "rome"],
    period: "Late 2nd century BCE",
    summary: [
      "The traditional account credits Marius with abolishing the property qualification for service, standardising equipment at state expense, adopting the cohort, making the eagle the sole legionary standard, and reducing the baggage train by making soldiers carry their own kit — hence 'Marius's mules'.",
      "The evidence is thinner than the confidence with which this is repeated. The property qualification had been falling for a century; the cohort appears before Marius; standardisation was gradual. Sallust records that Marius enrolled the capite censi, the propertyless, for the Jugurthine war, and presents it as a departure from custom — which is not the same as a legislated abolition.",
      "The consequence, however, is real regardless of who caused it. Once soldiers without property served long terms and looked to their commander for land on discharge, the army acquired a direct interest in its general's political fortunes. Every subsequent civil war runs through that fact.",
    ],
    keyPoints: [
      {
        claim: "Marius enrolled the propertyless for the Jugurthine war.",
        detail:
          "Sallust states it directly and treats it as notable. This is the securest element of the tradition.",
        level: "documented",
      },
      {
        claim: "A single coherent 'reform package' is doubtful.",
        detail:
          "Much recent scholarship treats the changes as a long evolution across the second and first centuries BCE, retrospectively attributed to one memorable name.",
        level: "disputed",
      },
      {
        claim: "The political effect is not disputed.",
        detail:
          "Long-service armies dependent on their commanders for discharge settlement are a structural feature of the late Republic and a precondition of its civil wars.",
        level: "probable",
      },
    ],
    primarySources: [
      S("The Jugurthine War", "86", "The enrolment of the capite censi.", "Sallust"),
      S("Life of Marius", "9, 13", "The tradition of the reforms, including the baggage.", "Plutarch"),
    ],
    disputes: [
      {
        question: "Did the Marian reforms happen as a package?",
        positions:
          "The textbook account descends from nineteenth-century synthesis. A substantial body of recent work argues that each element has its own longer history and that attaching them all to 92 or 107 BCE misdescribes a gradual professionalisation. The traditional narrative remains widely taught.",
        level: "disputed",
      },
    ],
    relatedTopics: ["roman-army", "legion", "recruitment", "military-discipline", "roman-warfare"],
    relatedBattles: ["pharsalus"],
    figureRefs: ["julius-caesar", "pompey"],
    themeRefs: ["army-and-state", "army-and-state"],
  },

  // ─── Naval warfare ───────────────────────────────────────────────────
  {
    slug: "trireme",
    title: "The trireme",
    standfirst:
      "A light, fast oared warship rowed by 170 men on three levels, and the instrument of Athenian power.",
    description:
      "The trireme — its construction, the three banks of oars, crew and rowing arrangement, the ram as its weapon, and what the reconstruction Olympias established and failed to settle.",
    tier: "naval",
    civilizations: ["athens", "greece", "roman-republic"],
    period: "c. 600 – 300 BCE and after",
    summary: [
      "A trireme was long, narrow and light: roughly 37 metres by 5, built shell-first with mortise-and-tenon joinery, and driven by 170 oarsmen seated on three levels. It carried a small deck complement and a bronze-sheathed ram at the waterline, which was its weapon.",
      "It was not a troop transport with oars. It was a projectile. Its purpose was to strike an enemy hull at speed and open it, and the skills that mattered were manoeuvre and the coordination of 170 rowers who could not see the water. Trireme fleets could not stay at sea: the ships had no space for stores or sleeping, and beached nightly.",
      "The type is unusually well understood because of an experiment. The reconstruction Olympias, built in the 1980s and rowed by volunteer crews, demonstrated that the three-level arrangement works, established achievable speeds, and exposed how tight the interior is. It also failed to reproduce the highest speeds the ancient sources imply, and the reasons are still argued.",
    ],
    keyPoints: [
      {
        claim: "The crew numbered around 200, of whom 170 rowed.",
        detail:
          "The figure is attested in inscriptions and narrative and is confirmed as workable by the reconstruction.",
        level: "documented",
      },
      {
        claim: "Athenian naval records survive on stone.",
        detail:
          "The naval inventories from the Piraeus dockyards list ships, gear and condition — among the most detailed administrative documents of any ancient navy.",
        level: "documented",
      },
      {
        claim: "The trireme's top speed under oar is disputed.",
        detail:
          "Olympias achieved around 9 knots in bursts; the passage times implied by Thucydides suggest better. Whether the shortfall is a matter of hull form, crew training or reconstruction detail is unresolved.",
        level: "disputed",
      },
    ],
    terms: [
      { term: "thranite, zygite, thalamite", gloss: "The three levels of oarsmen, from top to bottom. Thranites were paid most and worked hardest." },
      { term: "embolon", gloss: "The ram: a bronze-sheathed timber projection at the waterline." },
      { term: "diekplous", gloss: "A manoeuvre of breaking through an enemy line to strike from behind." },
    ],
    primarySources: [
      S("History of the Peloponnesian War", "1.49, 7.36-41", "Trireme tactics and their adaptation in the confined waters of the Great Harbour at Syracuse.", "Thucydides"),
      S("Athenian naval inventories", "IG II² 1604-1632", "Dockyard records listing ships and equipment by name and condition.", "Athenian dockyard officials"),
      S("Constitution of the Athenians", "1.2", "On the political weight of the rowing population.", "The Old Oligarch"),
    ],
    archaeology:
      "The Athlit ram, a bronze warship ram recovered off the Israeli coast, is the principal surviving example of the weapon. Ship sheds at Zea in the Piraeus give the dimensions the hulls had to fit. No trireme hull has been found.",
    relatedTopics: ["naval-warfare", "roman-navy", "greek-warfare", "logistics"],
    relatedBattles: ["salamis", "actium"],
    figureRefs: ["themistocles", "pericles"],
    themeRefs: ["military-innovation", "democracy-at-war"],
    imageSlug: "trireme-olympias",
  },
  {
    slug: "naval-warfare",
    title: "Naval warfare",
    standfirst:
      "Ramming, boarding and the problem of keeping a fleet supplied — sea power in a world of oared warships that could not stay at sea.",
    description:
      "Ancient naval warfare — ramming tactics and the diekplous, the shift to boarding, blockade and supply, and why fleets were constrained by water and beaches rather than by enemies.",
    tier: "naval",
    civilizations: ["greece", "athens", "roman-republic", "rome", "achaemenid-empire"],
    period: "c. 700 BCE – 400 CE",
    summary: [
      "Two doctrines competed. The Greek approach treated the warship as a ram and sought to sink or disable by manoeuvre, which required highly trained crews and favoured light, fast hulls. The alternative treated the ship as a platform for infantry and sought to grapple and board, which favoured heavier ships, larger marine complements and less skilled rowers.",
      "Rome adopted the second by necessity. Lacking naval tradition in the First Punic War, it built a fleet and fitted the corvus, a boarding bridge with a spike, which converted a naval engagement into an infantry fight Rome could win. The device is reported to have made the ships dangerously unstable and disappears from the record.",
      "The binding constraint on ancient fleets was not combat but water. Oared warships carried little and their crews drank heavily in hot weather; fleets beached nightly and operated within reach of supply. Most naval campaigns are therefore contests over bases and coastlines rather than over open sea.",
    ],
    keyPoints: [
      {
        claim: "The diekplous and periplous are attested manoeuvres.",
        detail:
          "Breaking through the enemy line and rounding its flank are named and described in Greek narrative, and countermeasures such as the defensive circle are described with them.",
        level: "documented",
      },
      {
        claim: "Rome used a boarding bridge in the First Punic War.",
        detail:
          "Polybius describes the corvus and its effect. Its later disappearance is usually explained by instability in heavy weather, which is an inference from the loss of fleets to storms.",
        level: "probable",
      },
      {
        claim: "Fleets were constrained by water supply and beaching.",
        detail:
          "Follows from the ships' construction and is visible in narrative wherever a fleet's movements are described in detail.",
        level: "probable",
      },
    ],
    primarySources: [
      S("Histories", "1.20-64", "The Roman construction of a fleet, the corvus, and the naval war with Carthage.", "Polybius"),
      S("History of the Peloponnesian War", "7.36-41, 8", "Naval tactics and their adaptation.", "Thucydides"),
    ],
    relatedTopics: ["trireme", "roman-navy", "logistics", "strategy"],
    relatedBattles: ["salamis", "actium"],
    figureRefs: ["themistocles", "augustus"],
    themeRefs: ["military-innovation", "war-and-peace"],
    imageSlug: "athlit-ram",
  },
  {
    slug: "roman-navy",
    title: "The Roman navy",
    standfirst:
      "A service Rome built twice from nothing, used to make the Mediterranean an internal sea, and then largely forgot.",
    description:
      "Roman naval power — the fleets of the Punic Wars, the suppression of piracy, the Augustan permanent fleets at Misenum and Ravenna, and the river flotillas of the frontiers.",
    tier: "naval",
    civilizations: ["roman-republic", "rome", "principate"],
    period: "c. 260 BCE – 4th century CE",
    summary: [
      "Rome had no significant navy before the First Punic War and built one, on the reported model of a captured Carthaginian ship, to contest Sicily. It lost fleets to storms repeatedly and rebuilt each time — a demonstration of the resources rather than the seamanship of the Republic.",
      "Pompey's campaign against the pirates in 67 BCE was the second great naval effort, and its speed and thoroughness were remembered as exceptional. After Actium, Augustus established permanent fleets at Misenum and Ravenna with a professional service, and provincial squadrons on the Rhine, Danube and in Egypt and Syria.",
      "Under the Principate the navy had no enemy. Its work was transport, patrol, suppression of piracy and river control on the frontiers. Service was lower in status than the legions, with longer terms and citizenship on discharge.",
    ],
    keyPoints: [
      {
        claim: "Augustus established permanent fleets at Misenum and Ravenna.",
        detail:
          "Attested in narrative and in inscriptions recording sailors' service and discharge from both fleets.",
        level: "documented",
      },
      {
        claim: "Naval service carried lower status than legionary service.",
        detail:
          "Visible in terms of service and in the recruitment of non-citizens, with citizenship granted on discharge as in the auxilia.",
        level: "probable",
      },
      {
        claim: "The Republic's fleet losses to weather exceeded its losses to battle.",
        detail:
          "Polybius records repeated catastrophic storm losses in the First Punic War, and treats them as a consequence of inexperienced seamanship and unsuitable ship design.",
        level: "documented",
      },
    ],
    primarySources: [
      S("Histories", "1.20-64", "The construction and losses of the first Roman fleets.", "Polybius"),
      S("Life of Pompey", "24-29", "The campaign against the pirates.", "Plutarch"),
      S("Natural History", "preface and books on geography", "The author commanded the fleet at Misenum and died in the eruption of 79 CE.", "Pliny the Elder"),
    ],
    relatedTopics: ["naval-warfare", "trireme", "roman-warfare", "logistics"],
    relatedBattles: ["actium"],
    figureRefs: ["pompey", "augustus"],
    themeRefs: ["war-and-peace", "army-and-state"],
  },

  // ─── Engineering and siege ───────────────────────────────────────────
  {
    slug: "siege-warfare",
    title: "Siege warfare",
    standfirst:
      "The slowest and most expensive form of ancient war, and the one in which engineering, not courage, decided outcomes.",
    description:
      "Ancient siegecraft — blockade, mining, ramps and rams, the Hellenistic transformation in siege engineering, and Roman practice from Alesia to Masada.",
    tier: "engineering",
    civilizations: ["greece", "macedon", "roman-republic", "rome", "achaemenid-empire"],
    period: "c. 700 BCE – 5th century CE",
    summary: [
      "For most of Greek history, taking a walled city meant starving it. Classical Greek armies were citizen levies that could not stay in the field indefinitely and had little engineering capacity; sieges were blockades and often failed.",
      "The change came with Philip and Alexander, who fielded torsion artillery and a professional engineering corps, and with the Hellenistic kingdoms, whose siege trains became famously elaborate. Alexander's mole at Tyre — a causeway built out to an island city — is the emblematic operation.",
      "Roman practice combined all methods and added scale and persistence: circumvallation to seal a place off, ramps to bring engines to the wall, mining, and the willingness to spend months. The archaeological signature of Roman siege is unusually clear because the works were earth and stone and survive.",
    ],
    keyPoints: [
      {
        claim: "Roman siege works survive as earthworks.",
        detail:
          "The circumvallation and ramp at Masada, and the siege lines at Alesia and Numantia, are visible and excavated. Ancient siege is among the best-attested military activities archaeologically.",
        level: "documented",
      },
      {
        claim: "Torsion artillery transformed siege capability in the fourth century BCE.",
        detail:
          "Attested in technical writers and in finds of torsion-spring washers and bolt heads.",
        level: "probable",
      },
      {
        claim: "Classical Greek armies mostly could not take walls.",
        detail:
          "Thucydides' account of the long blockades of the Peloponnesian War illustrates the limitation directly.",
        level: "documented",
      },
    ],
    primarySources: [
      S("The Gallic War", "7.68-90", "The double lines at Alesia.", "Julius Caesar"),
      S("The Jewish War", "3, 7", "Roman siege method described by an eyewitness on the other side, including Jotapata and Masada.", "Josephus"),
      S("On the Defence of Fortified Positions", "throughout", "A fourth-century BCE manual on withstanding siege.", "Aeneas Tacticus"),
    ],
    archaeology:
      "Masada preserves the most complete Roman siege system anywhere: camps, circumvallation wall and assault ramp. Numantia in Spain preserves Scipio Aemilianus's lines. Both allow written accounts to be checked against ground.",
    relatedTopics: ["catapults", "ballistae", "fortifications", "roman-engineering", "logistics"],
    relatedBattles: ["alesia"],
    figureRefs: ["julius-caesar", "alexander"],
    themeRefs: ["military-innovation", "military-command"],
    imageSlug: "masada-siege-ramp",
  },
  {
    slug: "catapults",
    title: "Catapults",
    standfirst:
      "Mechanical artillery from the tension-powered belly-bow to the torsion engines that could break masonry.",
    description:
      "Ancient artillery — the gastraphetes, the torsion revolution, stone-throwers and bolt-shooters, the calibration formulae the engineers used, and what excavation has confirmed.",
    tier: "engineering",
    civilizations: ["greece", "macedon", "roman-republic", "rome"],
    period: "c. 399 BCE – 5th century CE",
    summary: [
      "The tradition dates the first mechanical artillery to Syracuse under Dionysius I around 399 BCE: the gastraphetes, a large crossbow braced against the belly to span it. It stored energy in a bent bow and was limited by what wood and horn could take.",
      "The decisive development was torsion, which stores energy in twisted skeins of sinew or hair rather than in a bending stave. Torsion engines could be scaled up, and by the Hellenistic period engineers worked to calibration formulae relating the diameter of the spring-hole to the weight of the projectile — the earliest known engineering design rules of their kind.",
      "Two families resulted: bolt-shooters for anti-personnel and precision work, and stone-throwers for battering. Roman armies carried both, and Vegetius reports artillery attached at legion and cohort level, though his numbers belong to a period he does not specify.",
    ],
    keyPoints: [
      {
        claim: "Torsion artillery was calibrated by formula.",
        detail:
          "Philon and Heron transmit design rules relating spring diameter to projectile weight. This is unambiguous evidence of systematic engineering practice.",
        level: "documented",
      },
      {
        claim: "Artillery components have been excavated.",
        detail:
          "Metal spring-washers, frame fittings and large numbers of bolt heads and stone shot are known from military sites; stone shot at siege sites can sometimes be matched to engine sizes.",
        level: "documented",
      },
      {
        claim: "Vegetius's establishment figures cannot be dated.",
        detail:
          "His account of artillery per unit is often quoted as 'the Roman practice'. He is a late compiler drawing on sources of different periods and does not say which he is describing.",
        level: "disputed",
      },
    ],
    terms: [
      { term: "gastraphetes", gloss: "'Belly-bow'. The earliest mechanical artillery, spanned against the abdomen." },
      { term: "ballista / catapulta", gloss: "Roman terms whose reference shifts over time; by the late empire the usage has effectively swapped." },
    ],
    primarySources: [
      S("Belopoeica", "throughout", "A Hellenistic technical treatise on artillery construction and calibration.", "Philon of Byzantium"),
      S("Belopoeica", "throughout", "A later technical treatise transmitting the design formulae.", "Heron of Alexandria"),
      S("On Architecture", "10", "Roman artillery described by a practising military engineer.", "Vitruvius"),
    ],
    relatedTopics: ["ballistae", "siege-warfare", "fortifications", "roman-engineering"],
    relatedBattles: ["alesia"],
    figureRefs: [],
    themeRefs: ["military-innovation"],
  },
  {
    slug: "ballistae",
    title: "Ballistae and bolt-shooters",
    standfirst:
      "Torsion engines used as field and defensive artillery, and the one class of ancient weapon whose remains can be reassembled.",
    description:
      "The ballista and its relatives — two-armed torsion engines, the late-Roman iron-framed cheiroballistra, the Xanten and Hatra finds, and the shifting Latin terminology.",
    tier: "engineering",
    civilizations: ["roman-republic", "rome", "principate", "late-empire"],
    period: "c. 3rd century BCE – 5th century CE",
    summary: [
      "The ballista family is the torsion engine adapted for direct fire: two arms driven by separate spring-skeins, shooting a bolt or a stone along a slider. It served in sieges on both sides of the wall and in the field, where it gave a Roman army a reach nothing in an opposing line could match.",
      "Roman and Greek terminology is unstable. In the earlier period ballista tends to name a stone-thrower and catapulta a bolt-shooter; by late antiquity the usage has effectively reversed. Reading a technical term without its date is a reliable way to get an ancient engine wrong.",
      "The late-Roman iron-framed engines are the best-evidenced, because iron survives where wood does not. Fittings recovered at sites including Xanten and Hatra have allowed working reconstructions and confirmed that the design descriptions in the technical writers describe real machines.",
    ],
    keyPoints: [
      {
        claim: "Iron artillery frames survive and have been reconstructed.",
        detail:
          "Finds from Roman military sites have permitted reconstruction of late-Roman bolt-shooters that function, corroborating the technical treatises.",
        level: "documented",
      },
      {
        claim: "The terminology reverses over time.",
        detail:
          "Well established in the technical literature and a standard caution in the field.",
        level: "documented",
      },
      {
        claim: "Field use of artillery was routine by the Principate.",
        detail:
          "Artillery appears on Trajan's Column and in narrative accounts of set-piece battles as well as sieges.",
        level: "probable",
      },
    ],
    primarySources: [
      S("Cheiroballistra", "throughout", "A technical description of a late torsion engine.", "Heron of Alexandria"),
      S("Res Gestae", "23.4", "A fourth-century description of artillery in use by a serving officer.", "Ammianus Marcellinus"),
      S("Trajan's Column", "reliefs", "Pictorial evidence for artillery in the field, on a monument of 113 CE.", "Roman state monument"),
    ],
    archaeology:
      "Metal frame components, spring washers and bolt heads from military sites across the empire. Trajan's Column supplies the iconography, with the usual caution that state monuments idealise.",
    relatedTopics: ["catapults", "siege-warfare", "roman-engineering", "fortifications"],
    relatedBattles: ["alesia"],
    figureRefs: ["trajan"],
    themeRefs: ["military-innovation"],
    imageSlug: "trajans-column-artillery",
  },
  {
    slug: "fortifications",
    title: "Fortifications",
    standfirst:
      "City walls, frontier systems and field defences — the largest structures most ancient states ever built.",
    description:
      "Ancient fortification — Mycenaean and Greek circuits, Hellenistic artillery towers, Roman frontier works and the linear systems of Britain and Germany, and Egyptian frontier fortresses.",
    tier: "engineering",
    civilizations: ["greece", "athens", "rome", "principate", "egypt", "new-kingdom"],
    period: "c. 1400 BCE – 5th century CE",
    summary: [
      "Fortification is the ancient world's largest category of construction by volume. The Mycenaean citadels used blocks so large that later Greeks attributed them to the Cyclopes. Classical Greek cities built circuits enclosing acropolis and town, and Athens built the Long Walls to tie the city to its port and make it unsiegeable by land.",
      "The Hellenistic period changed the design problem. Once torsion artillery could break masonry, walls grew thicker, towers were built to mount defensive engines, and outworks pushed attackers further back — an arms race visible in the fortifications of the successor kingdoms.",
      "Roman frontier works are a different category again: not defences against armies but controlled boundaries, regulating movement and taxing it. Hadrian's Wall with its milecastles and gates functions as a permeable barrier with customs points, and reading it as a defensive line against invasion misdescribes what it was for.",
    ],
    keyPoints: [
      {
        claim: "The Long Walls made Athens a maritime fortress.",
        detail:
          "Attested in Thucydides and traceable on the ground; the strategy of abandoning Attica and holding the city depended on them.",
        level: "documented",
      },
      {
        claim: "Hellenistic wall design responds to artillery.",
        detail:
          "Thicker curtains, projecting artillery towers and outworks appear as torsion engines become effective. The correlation is clear; the causal reading is an inference.",
        level: "probable",
      },
      {
        claim: "Roman frontier works controlled movement rather than repelling armies.",
        detail:
          "The density of gates on Hadrian's Wall is difficult to reconcile with a purely defensive purpose, and the current mainstream reading emphasises regulation and taxation.",
        level: "probable",
      },
    ],
    primarySources: [
      S("History of the Peloponnesian War", "1.89-93, 2.13", "The building of the Athenian walls and the strategy that depended on them.", "Thucydides"),
      S("On the Defence of Fortified Positions", "throughout", "A practical manual for defending a city.", "Aeneas Tacticus"),
      S("On Architecture", "1.5", "On the design of walls and towers.", "Vitruvius"),
    ],
    archaeology:
      "Hadrian's Wall, the Antonine Wall, the German limes, the walls of Messene and the Egyptian Nubian fortresses are all extensively excavated and standing in part. Fortification is the best-preserved category of ancient military architecture.",
    relatedTopics: ["siege-warfare", "roman-engineering", "roman-camps", "catapults"],
    relatedBattles: ["alesia", "thermopylae"],
    figureRefs: ["pericles", "trajan"],
    themeRefs: ["military-innovation"],
    imageSlug: "hadrians-wall-housesteads",
  },
  {
    slug: "roman-engineering",
    title: "Roman military engineering",
    standfirst:
      "The capability that distinguished Roman armies more than any tactic: legions that could build faster than their enemies could react.",
    description:
      "Roman military engineering — bridging, siege works, road construction on campaign, surveying, and the organisation that made engineering a routine legionary function rather than a specialist arm.",
    tier: "engineering",
    civilizations: ["roman-republic", "rome", "principate"],
    period: "c. 300 BCE – 4th century CE",
    summary: [
      "Roman soldiers were construction workers who fought. Every legion contained surveyors, carpenters, smiths and masons, and every soldier carried entrenching tools. The result was an army that could alter terrain on operational timescales.",
      "Caesar's bridge over the Rhine is the emblematic case: a trestle bridge across a large fast river, built in ten days according to his own account, used to demonstrate that Rome could cross at will, and then dismantled. Caesar devotes more space to the engineering specification than to the campaign it enabled, which tells you what he expected his readers to admire.",
      "The same capability produced the siege lines at Alesia, the assault ramp at Masada, roads driven through hostile country, and the permanent frontier infrastructure. It rested on organisation: standard designs, trained personnel in every unit, and command that treated digging as fighting.",
    ],
    keyPoints: [
      {
        claim: "Every legion had integral engineering capability.",
        detail:
          "Attested in the specialist ranks recorded in inscriptions and in the routine construction described in narrative.",
        level: "documented",
      },
      {
        claim: "Caesar's Rhine bridge was built in ten days.",
        detail:
          "Caesar's own claim, in a work written to impress a Roman readership. The design he describes is structurally sound and has been reconstructed; the timescale is his.",
        level: "disputed",
      },
      {
        claim: "Surveying instruments and techniques are attested materially.",
        detail:
          "The groma survives in example and in depiction, and the accuracy of Roman road and aqueduct alignments demonstrates the practice independently.",
        level: "documented",
      },
    ],
    primarySources: [
      S("The Gallic War", "4.17-19", "The specification of the Rhine bridge.", "Julius Caesar"),
      S("On Architecture", "10", "Machines and military engineering by a practitioner.", "Vitruvius"),
      S("The Jewish War", "3, 7", "Roman engineering at Jotapata and Masada, described by an eyewitness.", "Josephus"),
    ],
    archaeology:
      "The Masada ramp, the Alesia siege works, road engineering across the empire, and the excavated remains of temporary camps all record the practice directly.",
    relatedTopics: ["siege-warfare", "roman-camps", "roman-roads", "fortifications", "legion"],
    relatedBattles: ["alesia"],
    figureRefs: ["julius-caesar", "trajan"],
    themeRefs: ["military-innovation"],
  },
  {
    slug: "roman-camps",
    title: "The Roman camp",
    standfirst:
      "A fortified enclosure built at the end of each day's march to a standard plan — the habit that made Roman armies almost impossible to surprise.",
    description:
      "The castra — Polybius's description of the layout, the ditch and rampart, the standard street plan, marching camps versus permanent fortresses, and the archaeological record across the empire.",
    tier: "engineering",
    civilizations: ["roman-republic", "rome", "principate"],
    period: "c. 200 BCE – 4th century CE",
    summary: [
      "A Roman army on campaign built a fortified camp every night: a ditch, a rampart of the upcast earth topped with stakes, and a laid-out interior with fixed positions for each unit and for the commander. Polybius describes the plan in detail, and the point of the standardisation was that every soldier knew where everything was in an unfamiliar place in the dark.",
      "The tactical consequence is large. An army that fortifies nightly cannot easily be attacked at rest, can refuse battle indefinitely, and can use its camp as a base for operations from a position of security. Much Roman campaigning consists of manoeuvring between fortified positions rather than seeking battle.",
      "Marching camps were temporary and are visible archaeologically as cropmarks; permanent fortresses developed the same plan in stone and became the nuclei of cities. The continuity from the temporary plan to the permanent fortress to the town is a standard feature of Roman provincial urbanism.",
    ],
    keyPoints: [
      {
        claim: "The camp plan was standardised and is described in detail.",
        detail:
          "Polybius gives dimensions and unit positions; the later treatise on camp construction attributed to Hyginus gives another version.",
        level: "documented",
      },
      {
        claim: "Marching camps survive in large numbers.",
        detail:
          "Aerial survey has identified hundreds across Britain and elsewhere, recognisable by their characteristic gate defences.",
        level: "documented",
      },
      {
        claim: "How closely real camps followed the textbook plan is a question.",
        detail:
          "Polybius and Pseudo-Hyginus give idealised layouts, and excavated camps vary considerably in shape and internal arrangement with terrain and circumstance. The plan is a template, not a specification that was always met.",
        level: "disputed",
      },
      {
        claim: "Permanent fortresses seeded cities.",
        detail:
          "The development from fortress to civil settlement is well attested at sites including York, Chester and Vienna.",
        level: "documented",
      },
    ],
    terms: [
      { term: "castra", gloss: "The camp. Castra aestiva are summer campaign camps; castra hiberna winter quarters." },
      { term: "clavicula / titulum", gloss: "Gate defences that force an attacker to expose his unshielded side; the diagnostic feature for identifying camps from the air." },
    ],
    primarySources: [
      S("Histories", "6.27-42", "The classic description of the camp and its layout.", "Polybius"),
      S("On the Fortification of a Camp", "throughout", "A later technical treatise on camp construction.", "Pseudo-Hyginus"),
      S("The Jewish War", "3.76-84", "An outsider's admiring description of Roman camp discipline.", "Josephus"),
    ],
    archaeology:
      "Aerial photography has transformed knowledge of temporary camps, particularly in Britain and Scotland, where the Roman advance can be traced by the camps left behind it.",
    relatedTopics: ["roman-engineering", "legion", "military-discipline", "fortifications", "logistics"],
    relatedBattles: ["teutoburg-forest", "alesia"],
    figureRefs: ["julius-caesar"],
    themeRefs: ["discipline"],
    imageSlug: "housesteads-fort",
  },
  {
    slug: "roman-roads",
    title: "Roman roads",
    standfirst:
      "Built for armies and used by everything else — the infrastructure that turned conquest into administration.",
    description:
      "The Roman road network — construction technique, surveying, the milestones and itineraries that document it, and its primary military purpose alongside its economic consequences.",
    tier: "engineering",
    civilizations: ["roman-republic", "rome", "principate"],
    period: "312 BCE – 4th century CE",
    summary: [
      "Roman roads were military infrastructure. The Via Appia was begun in 312 BCE during the Samnite wars, and the pattern held: roads were driven where armies needed to move, and the economic and administrative consequences followed.",
      "Construction varied with terrain and available material and the textbook multi-layer section is not universal. What is consistent is the engineering intent: a durable, drained, surveyed alignment that could carry loaded vehicles year-round, with bridges and cuttings where the line required them.",
      "The network is documented unusually well. Milestones record distances and the authority that built or repaired the road; itineraries list routes and stages; and the surviving physical remains allow the documents to be checked. The cursus publicus, the state relay system, ran on it and gave the empire its communications speed.",
    ],
    keyPoints: [
      {
        claim: "Roads were laid out primarily for military movement.",
        detail:
          "The chronology of construction tracks campaigns and frontier consolidation closely.",
        level: "probable",
      },
      {
        claim: "Milestones document builders, repairs and distances.",
        detail:
          "Thousands survive, giving a dated epigraphic record of the network's construction and maintenance.",
        level: "documented",
      },
      {
        claim: "The standard layered construction is not universal.",
        detail:
          "Excavated sections vary considerably with local geology and available material; the idealised section in modern handbooks over-generalises.",
        level: "probable",
      },
    ],
    primarySources: [
      S("Milestones", "CIL, passim", "Inscribed stones recording distance, builder and repairs across the network.", "Roman authorities"),
      S("Antonine Itinerary", "throughout", "A register of routes and stage distances across the empire.", "Roman administration"),
      S("Peutinger Table", "medieval copy", "A late-antique route map surviving in a medieval copy, showing the network schematically.", "Unknown"),
    ],
    archaeology:
      "Excavated road sections, surviving paved stretches such as parts of the Via Appia, and bridges including the Alcántara bridge in Spain document construction directly.",
    relatedTopics: ["roman-engineering", "logistics", "military-supply", "roman-warfare"],
    relatedBattles: [],
    figureRefs: ["trajan", "augustus"],
    themeRefs: ["royal-road", "military-innovation"],
  },

  // ─── Operations ──────────────────────────────────────────────────────
  {
    slug: "logistics",
    title: "Logistics",
    standfirst:
      "The constraint that determined where ancient armies could go, how large they could be and how long they could stay.",
    description:
      "Ancient military logistics — the arithmetic of food, water and fodder, the limits of pack transport, seasonality, and why logistics is the strongest argument against the ancient troop numbers.",
    tier: "operations",
    civilizations: ["greece", "macedon", "roman-republic", "rome", "achaemenid-empire"],
    period: "Throughout",
    summary: [
      "An ancient army is a settlement that moves. A soldier needs roughly a kilogram of grain and several litres of water a day, and a pack animal needs far more fodder than it can carry for itself. Beyond a short radius from a supply base, an army carrying its own supplies spends its transport capacity feeding its transport.",
      "That arithmetic sets hard limits. It explains campaign seasons, which follow harvests; it explains why armies move along rivers and coasts, where bulk transport is possible; it explains sieges failing for lack of supply on the besieging side; and it explains why Roman roads and the Persian royal road system were strategic assets rather than conveniences.",
      "It is also the most powerful tool for assessing ancient numbers. An army of a million cannot be watered on a road march, and the calculation does not depend on trusting or distrusting any particular author. Logistics is where source criticism becomes arithmetic.",
    ],
    keyPoints: [
      {
        claim: "Water, not food, is usually the binding constraint on the march.",
        detail:
          "Food can be carried for days; water cannot be carried in the quantities a large force consumes daily in a Mediterranean summer. Route selection follows water.",
        level: "probable",
      },
      {
        claim: "Ancient armies depended on requisition and pre-positioned depots.",
        detail:
          "Attested throughout the narrative sources and documented administratively in the Persepolis tablets and in Roman military records.",
        level: "documented",
      },
      {
        claim: "Logistical analysis is the strongest argument against the largest reported army sizes.",
        detail:
          "The approach, developed in modern scholarship on Alexander's campaigns, is now standard and is why figures such as Herodotus's are rejected rather than merely doubted.",
        level: "probable",
      },
    ],
    primarySources: [
      S("Anabasis", "throughout", "A detailed account of an army's supply problems on a long retreat, by a participant.", "Xenophon"),
      S("Histories", "3.107-118", "Campaign supply and its effect on operations in Italy.", "Polybius"),
      S("Persepolis Fortification Tablets", "administrative archive", "Ration issue and authorised travel across the Achaemenid empire.", "Achaemenid administration"),
    ],
    relatedTopics: ["military-supply", "strategy", "roman-roads", "roman-camps", "naval-warfare"],
    relatedBattles: ["thermopylae", "plataea", "carrhae", "alesia", "adrianople"],
    figureRefs: ["alexander", "julius-caesar"],
    themeRefs: ["military-command"],
  },
  {
    slug: "military-supply",
    title: "Military supply",
    standfirst:
      "How armies were paid, fed and equipped as an administrative problem rather than a marching one.",
    description:
      "Supply systems — requisition, contracting, the annona militaris, pay and deductions, equipment manufacture, and the documentary evidence from Vindolanda and the Egyptian papyri.",
    tier: "operations",
    civilizations: ["roman-republic", "rome", "principate", "achaemenid-empire"],
    period: "Throughout",
    summary: [
      "Where logistics is the problem of moving supplies, supply is the problem of obtaining them: taxation in kind, requisition, contracts with private suppliers, and state manufacture. The Roman Republic used publicani, tax-farming contractors, to supply armies; the later empire moved to the annona militaris, a levy in kind.",
      "Pay is part of the same system and reveals it. Roman soldiers were paid in cash with deductions for food, equipment and burial club, which means the state recovered part of the wage as payment for supply. Documents from Egypt record the arithmetic on individual accounts.",
      "The documentary evidence is unusually good. The Vindolanda tablets from northern Britain include strength returns, requests for supplies, and an account of a unit's daily disposition — the ordinary paperwork of a frontier garrison, preserved by waterlogging.",
    ],
    keyPoints: [
      {
        claim: "Roman soldiers' pay carried deductions for supply.",
        detail:
          "Recorded on surviving pay accounts from Egypt, which itemise deductions against the stated stipend.",
        level: "documented",
      },
      {
        claim: "Strength returns and duty rosters survive from a frontier garrison.",
        detail:
          "The Vindolanda tablets include a strength report for a cohort accounting for men absent on detachment and sick.",
        level: "documented",
      },
      {
        claim: "The late empire shifted from cash to levy in kind.",
        detail:
          "The annona militaris is attested in the legal codes and reflects the monetary difficulties of the third century.",
        level: "probable",
      },
    ],
    primarySources: [
      S("Vindolanda tablets", "Tab. Vindol. II 154 and others", "Strength returns, supply requests and correspondence from a Roman auxiliary garrison.", "Roman garrison at Vindolanda"),
      S("Histories", "6.39", "Pay, rations and deductions in the mid-Republican army.", "Polybius"),
      S("Theodosian Code", "7", "Late imperial legislation on military supply.", "Roman imperial administration"),
    ],
    archaeology:
      "Vindolanda, the Egyptian military papyri, and the excavated fabricae, the state arms factories of the later empire, together document supply administration directly.",
    relatedTopics: ["logistics", "recruitment", "roman-army", "roman-roads"],
    relatedBattles: ["carrhae", "adrianople"],
    figureRefs: ["augustus", "trajan"],
    themeRefs: ["army-and-state"],
  },
  {
    slug: "strategy",
    title: "Strategy",
    standfirst:
      "Whether ancient states had strategy in any modern sense, and what they had instead.",
    description:
      "Ancient strategic thought and practice — Periclean maritime strategy, Fabian attrition, Roman grand strategy and the debate over whether it existed, and the sources that let us see decisions being made.",
    tier: "operations",
    civilizations: ["athens", "greece", "roman-republic", "rome", "principate"],
    period: "Throughout",
    summary: [
      "Ancient languages have no word that maps onto modern 'strategy'; strategia is generalship, the art of the man in command. That does not mean ancient states had no strategic thought, and the sources show it repeatedly: Pericles' argument that Athens should abandon Attica and fight as a sea power is strategic reasoning of a high order, and Thucydides records the argument as well as the decision.",
      "Fabius Maximus's refusal of battle after Trasimene is the other classic case: a deliberate decision to trade territory and reputation for time, unpopular enough to earn him the name Cunctator, the delayer, and vindicated by the outcome.",
      "Whether the Roman empire had a 'grand strategy' is one of the sharpest disputes in ancient military history. The proposition that a coherent, centrally-directed defensive system existed was argued influentially in the 1970s and has been extensively criticised since, on the grounds that Rome lacked the maps, the intelligence apparatus and the institutional continuity such a system requires.",
    ],
    keyPoints: [
      {
        claim: "Periclean strategy is explicitly articulated in the sources.",
        detail:
          "Thucydides gives Pericles' reasoning about sea power, resources and the futility of defending Attica, and then narrates the strategy's execution and its collapse under plague.",
        level: "documented",
      },
      {
        claim: "Attrition was a recognised and controversial option.",
        detail:
          "The Fabian strategy and the political pressure against it are well attested, and the pressure to fight at Cannae is its direct consequence.",
        level: "documented",
      },
      {
        claim: "Whether Rome had a grand strategy is disputed.",
        detail:
          "Luttwak's thesis of a systematic defensive strategy has been widely challenged by ancient historians who argue the required institutions did not exist. The debate is live.",
        level: "disputed",
      },
    ],
    primarySources: [
      S("History of the Peloponnesian War", "1.140-144, 2.13, 2.65", "Periclean strategy stated, executed and assessed.", "Thucydides"),
      S("Life of Fabius Maximus", "throughout", "Attritional strategy and the politics of refusing battle.", "Plutarch"),
      S("Histories", "throughout", "Roman decision-making at the level of war rather than battle.", "Polybius"),
    ],
    disputes: [
      {
        question: "Did Rome have a grand strategy?",
        positions:
          "One position holds that the frontier systems, road network and force dispositions reveal deliberate long-term design. The other holds that Rome lacked accurate maps, a general staff and continuity of policy across reigns, and that apparent system is the residue of ad hoc decisions. Neither has prevailed.",
        level: "disputed",
      },
    ],
    relatedTopics: ["battle-tactics", "logistics", "command-structure", "roman-warfare", "greek-warfare"],
    relatedBattles: ["cannae", "salamis", "gaugamela", "pharsalus"],
    figureRefs: ["pericles", "julius-caesar", "alexander", "scipio-africanus"],
    themeRefs: ["military-command", "war-and-peace"],
  },
  {
    slug: "battle-tactics",
    title: "Battle tactics",
    standfirst:
      "What commanders could actually control once the lines met, which was less than the narratives suggest.",
    description:
      "Ancient tactics — the oblique order, envelopment, refused flanks, reserves and the problem of command once battle is joined, with the reconstructions labelled as reconstructions.",
    tier: "operations",
    civilizations: ["greece", "macedon", "roman-republic", "rome"],
    period: "Throughout",
    summary: [
      "A small number of tactical ideas recur and can be traced. Asymmetric weighting of the line appears at Marathon and is systematised by Epaminondas at Leuctra. Envelopment reaches its fullest form at Cannae. Combined arms, in which infantry fixes and cavalry decides, is the Macedonian system. Reserves held for a predicted contingency appear at Pharsalus.",
      "What is much harder to establish is how any of this was executed. Once lines are engaged, voice does not carry, dust and noise obscure everything, and a commander who leads the decisive charge in person — as Alexander habitually did — cannot see the rest of his battle. Ancient tactical narratives are reconstructions written afterwards, often by people who saw one part of the field.",
      "This platform therefore separates what a source reports from what modern accounts add. The oblique order at Leuctra is reported. The precise drill by which Roman lines relieved each other is not reported anywhere, and every description of it is inference.",
    ],
    keyPoints: [
      {
        claim: "Weighting one wing and refusing the other is attested from the fifth century BCE.",
        detail:
          "Marathon shows asymmetric depth; Leuctra shows the systematic version with the refused wing.",
        level: "documented",
      },
      {
        claim: "Command during contact was severely limited.",
        detail:
          "Follows from the physical conditions and is visible in narratives where commanders lose track of parts of their own line, as at Gaugamela.",
        level: "probable",
      },
      {
        claim: "Much standard tactical description is modern reconstruction.",
        detail:
          "The manipular line relief is the clearest case: universally described, nowhere attested.",
        level: "disputed",
      },
    ],
    primarySources: [
      S("Hellenica", "6.4", "The oblique order at Leuctra, by a contemporary.", "Xenophon"),
      S("Histories", "3.113-117", "The double envelopment at Cannae.", "Polybius"),
      S("The Civil War", "3.88-99", "A reserve held against a predicted manoeuvre.", "Julius Caesar"),
    ],
    relatedTopics: ["phalanx", "legion", "companion-cavalry", "command-structure", "strategy"],
    relatedBattles: ["marathon", "leuctra", "cannae", "gaugamela", "pharsalus"],
    figureRefs: ["epaminondas", "alexander", "julius-caesar", "hannibal"],
    themeRefs: ["military-command", "military-innovation"],
  },
  {
    slug: "command-structure",
    title: "Command structure",
    standfirst:
      "Who gave orders, on what authority, and what happened when the constitution put two men in charge of one army.",
    description:
      "Ancient military command — Athenian elected generals, Spartan kings, Macedonian personal monarchy, the Roman consular imperium and its alternating command, and the professional officer corps beneath.",
    tier: "institution",
    civilizations: ["athens", "sparta", "macedon", "roman-republic", "rome"],
    period: "Throughout",
    summary: [
      "Command arrangements follow constitutions, and their defects follow too. Athens elected ten generals annually and could prosecute them for failure, which produced accountable command and a strong incentive to caution. Sparta sent kings with restricted authority and observers to watch them.",
      "Rome's arrangement was the most dangerous. Two consuls held equal imperium, and when both were present with one army the tradition holds that they alternated command daily. Cannae is the standard illustration, with Varro and Paullus differing on whether to fight and the decision falling on the day it was Varro's turn — though the tradition is shaped by later blame-allocation.",
      "Beneath the political command lay professional continuity. The Roman centurionate is the clearest example: long-service officers who held units together and who died in disproportionate numbers because their function required them to be where the line was breaking.",
    ],
    keyPoints: [
      {
        claim: "Athenian generals were elected and legally accountable.",
        detail:
          "Attested in the constitutional sources and in the prosecutions themselves, including the trial of the commanders after Arginusae.",
        level: "documented",
      },
      {
        claim: "Roman consular command could alternate.",
        detail:
          "Reported for Cannae by Polybius. Whether daily alternation was general practice or an arrangement for that campaign is less clear than the textbooks imply.",
        level: "disputed",
      },
      {
        claim: "Centurions suffered disproportionate casualties.",
        detail:
          "Caesar repeatedly names centurion losses separately, and the pattern reflects a role that required leading from the front.",
        level: "documented",
      },
    ],
    primarySources: [
      S("Histories", "3.110, 6.19-42", "Consular command at Cannae, and the officer structure of the legion.", "Polybius"),
      S("The Gallic War", "throughout", "Centurions named and their casualties recorded.", "Julius Caesar"),
      S("Constitution of the Athenians", "61", "The election and accountability of Athenian generals.", "Aristotle"),
    ],
    relatedTopics: ["roman-army", "legion", "military-discipline", "strategy", "battle-tactics"],
    relatedBattles: ["cannae", "pharsalus", "adrianople", "gaugamela"],
    figureRefs: ["pericles", "julius-caesar", "scipio-africanus"],
    themeRefs: ["military-command", "army-and-state"],
  },

  // ─── Institutions ────────────────────────────────────────────────────
  {
    slug: "military-discipline",
    title: "Military discipline",
    standfirst:
      "Rewards, punishments and the deliberate construction of a body of men who would stand when standing was worse than running.",
    description:
      "Discipline in ancient armies — Roman punishments including decimation and what the evidence for it actually is, decorations and rewards, oath and religion, and the Spartan comparison.",
    tier: "institution",
    civilizations: ["sparta", "roman-republic", "rome", "principate"],
    period: "Throughout",
    summary: [
      "Ancient armies solved the same problem every army solves: making it more frightening to leave the line than to stay in it. The Roman answer combined severe punishment, conspicuous reward, an oath binding the soldier personally, and unit identity focused on standards that carried religious weight.",
      "The punishments are famous and the evidence for the most famous of them is thinner than its fame. Decimation — the killing of one man in ten by lot from a unit judged to have failed — is described by Polybius and reported in a handful of specific instances across centuries. It was extraordinary, not routine, and its rarity is the reason each instance was recorded.",
      "The rewards mattered as much. Crowns for specific feats, decorations worn on the harness, promotion, and shares of plunder gave a soldier a career. Roman tombstones display the decorations, which is how we know what they looked like and how much they meant.",
    ],
    keyPoints: [
      {
        claim: "Roman decorations are documented on tombstones.",
        detail:
          "Funerary reliefs show phalerae, torques and crowns worn on the harness, and inscriptions name the awards and who granted them.",
        level: "documented",
      },
      {
        claim: "Decimation was exceptional rather than standard.",
        detail:
          "Described by Polybius as a procedure and attested in a small number of specific episodes over several centuries. Treating it as routine misrepresents the evidence.",
        level: "probable",
      },
      {
        claim: "The military oath bound the soldier personally.",
        detail:
          "The sacramentum is well attested, and under the Principate it was sworn to the emperor — a fact with obvious constitutional consequences.",
        level: "documented",
      },
    ],
    terms: [
      { term: "sacramentum", gloss: "The military oath." },
      { term: "phalerae", gloss: "Decorative discs worn on the harness as awards for valour." },
      { term: "fustuarium", gloss: "Beating to death by one's own comrades, the penalty for offences including sleeping on watch." },
    ],
    primarySources: [
      S("Histories", "6.37-39", "Roman military punishments and rewards described systematically.", "Polybius"),
      S("Annals", "1.16-49", "The mutinies of 14 CE and the collapse and restoration of discipline.", "Tacitus"),
      S("Constitution of the Lacedaemonians", "throughout", "Spartan discipline as an admirer describes it.", "Xenophon"),
    ],
    relatedTopics: ["training", "recruitment", "legion", "roman-army", "spartan-army"],
    relatedBattles: ["cannae", "teutoburg-forest"],
    figureRefs: ["julius-caesar", "augustus"],
    themeRefs: ["discipline", "military-virtue", "self-control"],
  },
  {
    slug: "recruitment",
    title: "Recruitment",
    standfirst:
      "Who served, on what terms, and what military service was worth to the person performing it.",
    description:
      "How ancient armies were raised — property qualification and the citizen levy, professional volunteer service, auxiliary recruitment and the citizenship it purchased, conscription and its evasion.",
    tier: "institution",
    civilizations: ["athens", "sparta", "roman-republic", "rome", "principate", "late-empire"],
    period: "Throughout",
    summary: [
      "The Greek citizen soldier was defined by property, because he equipped himself. Rome's Republican levy worked the same way and was assessed by census class, with the propertyless excluded from legionary service until the late second century BCE.",
      "Professionalisation changed what recruitment meant. Once service was long and paid, the army recruited from the poor and offered a career: pay, a share of plunder, and land or a cash bounty on discharge. Under the Principate this became an institution with fixed terms, and auxiliary service by non-citizens carried citizenship at the end, documented by the bronze diplomas issued to discharged men.",
      "The late empire had difficulty filling the ranks. Hereditary obligation on veterans' sons, recruitment of men from beyond the frontier, and evidence of self-mutilation to evade service all appear in the legal codes — which are evidence of the problem rather than of its scale.",
    ],
    keyPoints: [
      {
        claim: "Auxiliary discharge conferred citizenship, and is documented.",
        detail:
          "Hundreds of bronze military diplomas survive, naming the recipient and the grant.",
        level: "documented",
      },
      {
        claim: "The Republican levy was organised by census class.",
        detail:
          "Polybius describes the annual levy, the assignment of men to hastati, principes and triarii by age and wealth, and the exclusion of those below the property threshold from legionary service.",
        level: "documented",
      },
      {
        claim: "Late-empire recruitment difficulties are attested legally.",
        detail:
          "Legislation on hereditary obligation and on evasion implies a persistent problem. Laws record what authorities wanted, which is not the same as what happened.",
        level: "probable",
      },
    ],
    primarySources: [
      S("Histories", "6.19-21", "The Republican levy.", "Polybius"),
      S("Military diplomas", "CIL XVI", "Bronze certificates of discharge and citizenship grant.", "Roman administration"),
      S("Theodosian Code", "7.13", "Late imperial recruitment legislation.", "Roman imperial administration"),
    ],
    relatedTopics: ["roman-army", "marian-reforms", "military-supply", "training", "legion"],
    relatedBattles: ["cannae", "adrianople"],
    figureRefs: ["augustus", "julius-caesar"],
    themeRefs: ["army-and-state"],
  },
  {
    slug: "training",
    title: "Training",
    standfirst:
      "Drill, weapons practice and route marching — and the difficulty of establishing what most ancient soldiers actually learned.",
    description:
      "Military training in antiquity — the Roman regime as the sources describe it, the Spartan case and its evidential problems, the ephebeia at Athens, and what can be inferred where nothing is stated.",
    tier: "institution",
    civilizations: ["sparta", "athens", "roman-republic", "rome"],
    period: "Throughout",
    summary: [
      "Most Greek hoplites were not trained in any systematic sense. They were farmers who owned armour, and the formation's requirements were simple enough to work without drill: stay closed, keep the shield up, move forward. Sparta was the exception that proves the point, and Thucydides notes the effect of Spartan manoeuvre on opponents who could not do the same.",
      "Athens institutionalised training for young citizens in the ephebeia, a period of state-supervised military service; the fullest description belongs to the fourth century and later, and how far it existed earlier is disputed.",
      "Rome trained systematically. The sources describe drill at the post with weighted weapons, route marches under load at set paces, swimming, and repeated practice at camp construction. Vegetius gives the fullest account and is a late compiler; the specific regime he describes cannot be dated confidently, though its general character is corroborated elsewhere.",
    ],
    keyPoints: [
      {
        claim: "Roman training included weighted weapons practice.",
        detail:
          "Described in the sources and consistent with the finds of practice weapons; the underlying principle, that the real weapon should feel light, is explicit.",
        level: "probable",
      },
      {
        claim: "Most Greek hoplites received no formal training.",
        detail:
          "Follows from the militia character of the armies and from the surprise Spartan drill regularly caused.",
        level: "probable",
      },
      {
        claim: "Vegetius's training regime cannot be securely dated.",
        detail:
          "He compiles material from several periods without distinguishing them, which makes him a poor source for any particular century.",
        level: "disputed",
      },
    ],
    primarySources: [
      S("Epitome of Military Science", "1", "The fullest account of Roman recruit training, from a late compiler.", "Vegetius"),
      S("The Jewish War", "3.72-76", "An outsider's description of Roman drill: their drills are bloodless battles, their battles bloody drills.", "Josephus"),
      S("Constitution of the Athenians", "42", "The Athenian ephebeia.", "Aristotle"),
    ],
    relatedTopics: ["military-discipline", "recruitment", "spartan-army", "legion", "roman-camps"],
    relatedBattles: ["leuctra", "pharsalus"],
    figureRefs: ["epaminondas"],
    themeRefs: ["discipline", "education"],
  },

  // ─── Arms and armour ─────────────────────────────────────────────────
  {
    slug: "weapons",
    title: "Weapons",
    standfirst:
      "Spears, swords, javelins and bows — and the reasons the spear mattered more than the sword almost everywhere.",
    description:
      "Ancient weapons — the primacy of the spear, the Roman pilum and gladius, the sarissa, the composite bow and the sling, with the archaeological evidence for each.",
    tier: "equipment",
    civilizations: ["greece", "macedon", "roman-republic", "rome", "achaemenid-empire", "egypt"],
    period: "Throughout",
    summary: [
      "The characteristic ancient weapon is the spear, and the reason is economic as much as tactical: a spearhead uses little metal, and reach is the decisive quality in close-order fighting. Swords are secondary weapons nearly everywhere, drawn when the formation breaks up.",
      "Rome is the significant exception, and its combination is deliberate. The pilum, a heavy javelin with a long iron shank, was thrown at close range; it punched through shields and its shank bent, so it could not be thrown back and fouled the shield it struck. The legionary then closed with the gladius, a short thrusting sword suited to fighting in the press at arm's length.",
      "Missile weapons were more important than the narrative sources suggest, because narratives concentrate on the decisive close fighting. The composite bow, the sling — whose lead bullets sometimes carry inscribed insults — and the javelin appear throughout, and slingers from Rhodes and the Balearics were specialists in demand.",
    ],
    keyPoints: [
      {
        claim: "The pilum was designed to disable shields.",
        detail:
          "Described in the sources and consistent with excavated examples: a long soft-iron shank that bends on impact.",
        level: "probable",
      },
      {
        claim: "Inscribed sling bullets survive in numbers.",
        detail:
          "Lead bullets carrying unit names, commanders' names and taunts are known from sites including Perugia; they are direct evidence of the soldier's voice.",
        level: "documented",
      },
      {
        claim: "The sarissa is attested archaeologically.",
        detail:
          "Butt-spikes, points and connecting sleeves consistent with a very long two-handed pike have been excavated in Macedonia.",
        level: "documented",
      },
    ],
    primarySources: [
      S("Histories", "6.22-23, 18.28-32", "Roman equipment described in detail and compared with Macedonian.", "Polybius"),
      S("On Architecture", "10", "Military equipment and machines by an engineer.", "Vitruvius"),
    ],
    archaeology:
      "Weapon finds are abundant: dedications at Greek sanctuaries, river deposits, battlefield scatters such as Kalkriese, and the arms from Vergina and from Egyptian tombs.",
    relatedTopics: ["armour", "shields", "helmets", "legion", "hoplite", "phalanx"],
    relatedBattles: ["cannae", "carrhae", "teutoburg-forest"],
    figureRefs: [],
    themeRefs: ["military-innovation"],
  },
  {
    slug: "armour",
    title: "Armour",
    standfirst:
      "Bronze, linen, mail and plate — protection as a compromise between coverage, weight and cost.",
    description:
      "Ancient body armour — the bronze bell cuirass, the linothorax and the argument about it, mail and its Celtic origin, Roman segmented plate, and Egyptian and Persian practice. Also filed under the spelling armor.",
    tier: "equipment",
    civilizations: ["greece", "macedon", "roman-republic", "rome", "achaemenid-empire", "egypt"],
    period: "Throughout",
    summary: [
      "Armour is a compromise, and different armies struck it differently. The archaic Greek bronze bell cuirass gave excellent protection at high cost and weight. It was largely displaced by a lighter composite corselet, usually called the linothorax, which appears constantly in art and survives nowhere — its construction, whether glued linen laminate or leather or a composite, is genuinely unresolved.",
      "Mail was a Celtic invention adopted by Rome and used for centuries: flexible, effective against cuts, labour-intensive to make. The segmented plate armour that dominates the popular image of the legionary, lorica segmentata, was in use for a relatively limited period of the Principate and coexisted with mail rather than replacing it.",
      "Persian infantry favoured lighter protection with the bow; Egyptian New Kingdom armour included scale, of which examples survive. Across all of these, armour was expensive, and who wore it is a statement about the society raising the army.",
    ],
    keyPoints: [
      {
        claim: "Segmented plate armour was not the standard legionary equipment across Roman history.",
        detail:
          "Its archaeological distribution is concentrated in the first and second centuries CE, and mail is in continuous use before, during and after.",
        level: "probable",
      },
      {
        claim: "The construction of the linothorax is unresolved.",
        detail:
          "Ubiquitous in Greek art, absent from the archaeological record because organic materials do not survive. Reconstructions are experimental rather than evidential.",
        level: "disputed",
      },
      {
        claim: "Mail was adopted from Celtic practice.",
        detail:
          "The earliest examples are from Celtic contexts and the ancient tradition credits the invention accordingly.",
        level: "probable",
      },
    ],
    primarySources: [
      S("Histories", "6.23", "Roman body armour by property class.", "Polybius"),
      S("Trajan's Column", "reliefs", "Pictorial evidence for Roman armour, with the caution that state monuments idealise and simplify.", "Roman state monument"),
    ],
    archaeology:
      "Bronze cuirasses from Greek sanctuaries, mail from military sites, and the Corbridge hoard, which preserved segmented armour fittings well enough to reconstruct how the type was assembled.",
    relatedTopics: ["helmets", "shields", "weapons", "hoplite", "legion"],
    relatedBattles: ["marathon", "cannae"],
    figureRefs: ["trajan"],
    themeRefs: ["military-innovation"],
  },
  {
    slug: "helmets",
    title: "Helmets",
    standfirst:
      "The most protective and most restrictive item a soldier wore, and the one that changed most as tactics changed.",
    description:
      "Ancient helmets — the Corinthian type and what it cost in hearing and vision, Chalcidian and Attic forms, Roman Montefortino and Imperial Gallic types, and the boar's-tusk helmet of the Bronze Age.",
    tier: "equipment",
    civilizations: ["greece", "macedon", "roman-republic", "rome", "principate"],
    period: "Throughout",
    summary: [
      "The Corinthian helmet, beaten from a single sheet of bronze and enclosing the whole head, is the iconic Greek form and the most protective. It also nearly blinded and deafened the wearer, which in a formation that fought straight ahead was an acceptable trade and in any other context was not. Its replacement by open forms with cut-outs for ears follows the changes in how Greek armies fought.",
      "Roman helmets evolve visibly. The Montefortino type derives from Celtic forms; Imperial Gallic helmets, manufactured in Gaul, add substantial neck guards and hinged cheek pieces while leaving the face and ears clear. The direction of travel is consistent: away from full enclosure, toward hearing, vision and command.",
      "The boar's-tusk helmet of the Aegean Bronze Age, made of split tusks sewn to a leather cap, is the type described in the Iliad and excavated from Mycenaean contexts — a rare case of a Homeric object surviving in the ground.",
    ],
    keyPoints: [
      {
        claim: "The Corinthian helmet severely restricted hearing and peripheral vision.",
        detail:
          "Evident from surviving examples and from the later development of ear cut-outs specifically to address it.",
        level: "documented",
      },
      {
        claim: "Roman helmet types are well classified from finds.",
        detail:
          "The typology rests on large numbers of excavated examples with regional and chronological patterning.",
        level: "documented",
      },
      {
        claim: "Transverse crests as a mark of centurions are less securely attested than usually assumed.",
        detail:
          "The convention rests on a small number of depictions and on Vegetius; it is repeated with more confidence than the evidence supports.",
        level: "disputed",
      },
    ],
    primarySources: [
      S("Iliad", "10.261-265", "The boar's-tusk helmet, an object centuries obsolete when the poem was composed.", "Homer (attrib.)"),
      S("Histories", "6.23", "Roman helmet and crest.", "Polybius"),
    ],
    archaeology:
      "Greek helmets survive in quantity as sanctuary dedications, many at Olympia, some inscribed as spoils. Mycenaean boar's-tusk helmets are known from excavation. Roman helmets are among the most numerous surviving items of military equipment.",
    relatedTopics: ["armour", "shields", "weapons", "hoplite", "legion"],
    relatedBattles: ["marathon", "thermopylae"],
    figureRefs: [],
    themeRefs: ["military-innovation"],
    imageSlug: "boars-tusk-helmet-athens",
  },
  {
    slug: "shields",
    title: "Shields",
    standfirst:
      "The most important defensive item in ancient warfare, and in the Greek case the object that made the formation possible.",
    description:
      "Ancient shields — the Greek aspis and its double grip, the Macedonian shield adapted for the pike, the Roman scutum and the testudo, and the Persian spara.",
    tier: "equipment",
    civilizations: ["greece", "macedon", "roman-republic", "rome", "achaemenid-empire"],
    period: "Throughout",
    summary: [
      "The Greek aspis is the determining object of hoplite warfare. Its double grip — armband at the centre, handgrip at the rim — puts the weight on the forearm and means the right-hand portion projects beyond the bearer, covering his neighbour. A hoplite line is a chain of overlapping shields, and its cohesion is a physical fact about how the shields are held.",
      "The Macedonian pike phalanx needed both hands for the sarissa, so its shield was smaller and slung from the shoulder — a direct trade of protection for reach.",
      "The Roman scutum was a curved plywood body shield, laminated and faced, large enough to cover the bearer and heavy enough to be used offensively with its boss. Its shape made possible the testudo, the tortoise, in which a unit locks shields overhead and to the sides for approaching walls. A complete painted scutum survives from Dura-Europos, which is exceptional.",
    ],
    keyPoints: [
      {
        claim: "The aspis's double grip determines hoplite formation.",
        detail:
          "Attested by surviving shields and fittings and by Thucydides' observation about lines drifting right.",
        level: "documented",
      },
      {
        claim: "A complete Roman scutum survives.",
        detail:
          "The Dura-Europos shield, preserved by desert conditions, shows plywood laminate construction and painted decoration.",
        level: "documented",
      },
      {
        claim: "The testudo is attested in text and in art.",
        detail:
          "Described in the narrative sources and depicted on Trajan's Column.",
        level: "documented",
      },
      {
        claim: "Whether the testudo was used in open battle is disputed.",
        detail:
          "Its attested uses are approaches to walls and withdrawals under missile fire. Its depiction on state monuments may reflect what looked impressive rather than what was routine, and reading it as a general battlefield formation goes beyond the evidence.",
        level: "disputed",
      },
    ],
    primarySources: [
      S("History of the Peloponnesian War", "5.71", "Lines drifting rightward under the cover of the shield beside them.", "Thucydides"),
      S("Histories", "6.23", "The dimensions and construction of the scutum.", "Polybius"),
      S("Roman History", "49.30", "The testudo in use.", "Cassius Dio"),
    ],
    archaeology:
      "The Dura-Europos scutum is the outstanding survival. Greek shield facings and porpax fittings are known from sanctuary dedications, including examples inscribed as spoils taken from a named enemy.",
    relatedTopics: ["armour", "helmets", "weapons", "hoplite", "phalanx", "legion"],
    relatedBattles: ["marathon", "leuctra", "cannae"],
    figureRefs: [],
    themeRefs: ["military-innovation"],
    imageSlug: "dura-europos-scutum",
  },
];

const TOPIC_BY_SLUG = new Map(WARFARE_TOPICS.map((t) => [t.slug, t]));

export function getWarfareTopic(slug: string): WarfareTopic | undefined {
  return TOPIC_BY_SLUG.get(slug);
}

export function topicsByTier(tier: WarfareTier): WarfareTopic[] {
  return WARFARE_TOPICS.filter((t) => t.tier === tier);
}

export function topicsForCivilization(civ: string): WarfareTopic[] {
  return WARFARE_TOPICS.filter((t) => t.civilizations.includes(civ));
}

/** Tier display order for the index and the topic template. */
export const TIER_ORDER: ReadonlyArray<WarfareTier> = [
  "civilization-hub",
  "formation",
  "army",
  "naval",
  "engineering",
  "operations",
  "institution",
  "equipment",
];
