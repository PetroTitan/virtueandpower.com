/**
 * Battle registry.
 *
 * One typed entry per engagement, rendered by a single template at
 * /warfare/battles/[slug]. The registry is sized for well over a hundred
 * battles: adding one is adding an object, and the route, the index, the
 * sitemap and the validator all pick it up without further work.
 *
 * ─── The integrity problem this schema exists to solve ───────────────
 *
 * Ancient battle narratives are the least reliable numbers in classical
 * historiography. Herodotus gives Xerxes 1,700,000 fighting men; Arrian
 * gives Darius a million at Gaugamela; Caesar counts a Gallic relief
 * army of a quarter of a million. None of these is a headcount. They are
 * rhetorical figures, sometimes inherited, sometimes invented, and
 * repeating them without comment is the single most common failure in
 * popular writing about ancient warfare.
 *
 * The schema therefore does not permit a bare number. Every force
 * estimate is a `ForceEstimate` carrying the figure, the source that
 * gives it, an evidence level, and an assessment. A page can say what
 * Herodotus wrote and what modern scholarship makes of it in the same
 * breath, which is the only honest way to present the material.
 *
 * The same discipline applies to dates, to locations, and to what
 * archaeology can and cannot establish. A burnt layer is compatible with
 * many stories; a mass grave is evidence of a mass grave.
 */

import type { EvidenceLevel, SourceReference } from "./evidence";

/**
 * A claimed troop strength or casualty figure, with its provenance.
 * Never a bare number: the whole point of the type is that the figure
 * cannot be stated without saying who claimed it and what it is worth.
 */
export interface ForceEstimate {
  /** What is being counted, e.g. "Persian infantry", "Roman dead". */
  label: string;
  /** The figure as claimed, in the claimant's terms. */
  figure: string;
  /** Who gives it, cited by book and section. */
  source: string;
  level: EvidenceLevel;
  /** What modern scholarship makes of it. Required. */
  assessment: string;
}

export interface BattleSide {
  /** e.g. "Athens and Plataea", "The Achaemenid empire". */
  name: string;
  /** Commanders, with a slug where the platform carries a figure page. */
  commanders: Array<{ name: string; slug?: string }>;
  forces: ForceEstimate[];
  casualties?: ForceEstimate[];
}

export interface BattleDispute {
  question: string;
  positions: string;
  level: EvidenceLevel;
}

export interface Battle {
  slug: string;
  name: string;
  /** Conventional date, as normally cited. */
  date: string;
  dateLevel: EvidenceLevel;
  /** Where the date is not secure, why. Omitted where it is. */
  dateNote?: string;
  /** The war or campaign it belongs to. */
  war: string;
  /** Short standfirst for indexes and metadata. */
  standfirst: string;
  /** Slugs into content/civilizations. */
  civilizations: string[];
  location: {
    ancient: string;
    modern: string;
    /** How securely the ancient site is identified with the modern one. */
    level: EvidenceLevel;
    note: string;
  };
  sides: BattleSide[];
  outcome: string;
  /** Narrative of the engagement. */
  summary: string[];
  /** Why it was won and lost, in tactical terms. */
  tactics: string;
  /** What followed, strategically and politically. */
  consequence: string;
  primarySources: SourceReference[];
  archaeology?: { level: EvidenceLevel; note: string };
  disputes: BattleDispute[];
  /** Modern political appropriation, where it is significant enough that
   *  a reader will meet it. Described as reception, never adopted. */
  reception?: string;
  relatedBattles: string[];
  /** Slugs into the warfare topic registry. */
  topicRefs: string[];
  /** Slugs into content/philosophers. */
  figureRefs: string[];
  /** Slug into the archive-image registry. */
  imageSlug?: string;
}

const P = (
  work: string,
  locus: string,
  summary: string,
  author?: string,
): SourceReference => ({ work, locus, summary, author });

export const BATTLES: ReadonlyArray<Battle> = [
  // ─── The Persian Wars ────────────────────────────────────────────────
  {
    slug: "marathon",
    name: "Marathon",
    date: "490 BCE",
    dateLevel: "probable",
    war: "The first Persian invasion of Greece",
    standfirst:
      "An Athenian and Plataean hoplite force defeated a Persian expedition on the coast of Attica, and the Greek world learned that a Persian army could be beaten.",
    civilizations: ["athens", "greece", "achaemenid-empire", "persia"],
    location: {
      ancient: "The plain of Marathon, north-east Attica",
      modern: "Marathónas, Greece",
      level: "documented",
      note: "The location is not in doubt. The Soros, the burial mound raised over the Athenian dead, still stands on the plain and was excavated in the nineteenth century.",
    },
    sides: [
      {
        name: "Athens and Plataea",
        commanders: [
          { name: "Miltiades", slug: "miltiades" },
          { name: "Callimachus, the polemarch" },
        ],
        forces: [
          {
            label: "Athenian hoplites",
            figure: "About 9,000",
            source: "Not given by Herodotus; the figure derives from later authors",
            level: "probable",
            assessment:
              "Herodotus gives no Athenian total. Nine to ten thousand is the standard modern reconstruction from the size of the citizen body, and is an inference rather than a report.",
          },
          {
            label: "Plataean hoplites",
            figure: "1,000",
            source: "Herodotus 6.108 records the Plataean contingent",
            level: "probable",
            assessment:
              "The number is transmitted in later sources rather than by Herodotus, who records only that the Plataeans came in full force.",
          },
        ],
        casualties: [
          {
            label: "Athenian dead",
            figure: "192",
            source: "Herodotus 6.117",
            level: "probable",
            assessment:
              "A precise and plausible figure, and one Athens had institutional reason to record exactly: the dead were buried on the field and honoured as a tribe. It is among the more credible casualty numbers in Greek historiography.",
          },
        ],
      },
      {
        name: "The Achaemenid expedition",
        commanders: [
          { name: "Datis" },
          { name: "Artaphernes the younger" },
        ],
        forces: [
          {
            label: "Persian fighting men",
            figure: "200,000, with 600 ships",
            source: "Cornelius Nepos, Miltiades 4-5",
            level: "literary",
            assessment:
              "Rejected. Nepos wrote four centuries later. Herodotus, the earliest full account, gives no total at all — a silence worth noticing in an author not usually shy of numbers.",
          },
          {
            label: "Persian fighting men",
            figure: "Roughly 20,000 to 25,000",
            source: "Modern reconstruction from the reported fleet size",
            level: "probable",
            assessment:
              "The usual modern estimate, derived from transport capacity rather than from any ancient statement. Estimates range widely and none is secure.",
          },
        ],
        casualties: [
          {
            label: "Persian dead",
            figure: "6,400",
            source: "Herodotus 6.117",
            level: "disputed",
            assessment:
              "Given in the same sentence as the Athenian 192, and far less checkable. The ratio is suspiciously clean and has been read as a commemorative figure rather than a count.",
          },
        ],
      },
    ],
    outcome: "Athenian and Plataean victory.",
    summary: [
      "A Persian force landed on the bay of Marathon, on the advice of the exiled Athenian tyrant Hippias, intending to draw the Athenian army out of the city or to find support inside it. The Athenians marched out and held the passes for several days rather than engaging.",
      "Herodotus reports that the ten Athenian generals were divided and that the polemarch Callimachus cast the deciding vote for battle, persuaded by Miltiades. The Athenians then attacked across the plain at a run, with their centre thinned and their wings at full strength.",
      "The Persian centre broke through the weakened Athenian middle. The Athenian wings defeated the troops opposite them, turned inward, and closed on the Persian centre from both sides. The Persians broke for their ships, losing men in the marshes.",
      "The Athenian army then marched back to the city at speed, arriving before the Persian fleet could round Cape Sounion and reach Phaleron. The fleet withdrew.",
    ],
    tactics:
      "The thinned centre and reinforced wings are the earliest clearly reported instance of deliberate asymmetry in a Greek line, and the manoeuvre most often cited as the beginning of Greek tactical thought. Whether it was designed or improvised is not recoverable — Herodotus reports the dispositions without explaining them. The run across the last stretch of ground is best understood as a way of crossing the killing zone of Persian archery quickly, not as a charge from a distance, which armoured men could not sustain.",
    consequence:
      "Marathon did not end the Persian threat; the second invasion came ten years later and was far larger. Its consequences were political and psychological. It established that a Persian force could be defeated in open battle by heavy infantry, it gave Athens a founding military memory that the democracy used continuously, and it made Miltiades briefly the most powerful man in the city.",
    primarySources: [
      P("Histories", "6.94-120", "The fullest ancient narrative, written roughly a generation and a half after the battle.", "Herodotus"),
      P("Miltiades", "4-5", "A short Latin life giving figures for the Persian force that Herodotus does not give.", "Cornelius Nepos"),
      P("On the Glory of the Athenians", "347c", "One of the sources for the story of a runner carrying news of the victory to Athens.", "Plutarch"),
    ],
    archaeology: {
      level: "documented",
      note: "The Soros, the tumulus over the Athenian dead, stands on the plain and contained cremation burials and pottery consistent with the early fifth century. A second mound is traditionally identified as the Plataean grave. The battlefield's coastline has shifted considerably since antiquity, which complicates reconstruction of the fighting ground.",
    },
    disputes: [
      {
        question: "Did a runner carry the news to Athens and die?",
        positions:
          "Herodotus, the earliest source, describes Pheidippides running to Sparta before the battle to request help — a distance of some 240 km — and says nothing about a run to Athens afterwards. The story of a runner dying on arrival with news of the victory appears centuries later in Plutarch and Lucian, and the sources do not agree on his name. The modern marathon race commemorates a story the earliest account does not contain.",
        level: "literary",
      },
      {
        question: "Why did the Persians divide their force?",
        positions:
          "Herodotus reports that the Persian cavalry was absent from the fighting without explaining why. A later proverb, 'the horse are away', has been read as evidence that they had re-embarked for a move on Athens. The explanation is a reconstruction, and the absence of cavalry from the narrative remains one of the battle's genuine puzzles.",
        level: "disputed",
      },
    ],
    reception:
      "Marathon became an Athenian civic memory almost immediately and has been recruited repeatedly since — as a founding moment of democracy, of Europe, or of the West. Those are claims about later politics rather than about 490 BCE, and this platform describes them as reception rather than adopting them.",
    relatedBattles: ["thermopylae", "salamis", "plataea"],
    topicRefs: ["hoplite", "phalanx", "persian-army", "battle-tactics"],
    figureRefs: ["miltiades", "darius-i", "themistocles"],
  },
  {
    slug: "thermopylae",
    name: "Thermopylae",
    date: "480 BCE",
    dateLevel: "probable",
    war: "The second Persian invasion of Greece",
    standfirst:
      "A Greek force held a coastal pass in central Greece for three days against the army of Xerxes, and was destroyed when the position was turned by a mountain path.",
    civilizations: ["sparta", "greece", "achaemenid-empire", "persia"],
    location: {
      ancient: "The pass of Thermopylae, the Hot Gates, between Mount Kallidromo and the Malian Gulf",
      modern: "Near Lamia, central Greece",
      level: "documented",
      note: "The pass is securely identified, but the ground has changed beyond recognition. Silt from the Spercheios river has moved the coastline several kilometres seaward, so the narrow track between cliff and sea that made the position defensible is now an inland plain.",
    },
    sides: [
      {
        name: "The Greek alliance",
        commanders: [
          { name: "Leonidas I of Sparta", slug: "leonidas" },
          { name: "Demophilus of Thespiae" },
        ],
        forces: [
          {
            label: "Greek troops in the initial force",
            figure: "About 5,200, including 300 Spartiates",
            source: "Herodotus 7.202-203",
            level: "documented",
            assessment:
              "Herodotus itemises the contingents, and the list is internally consistent. The famous 300 are the Spartiate citizens only; the force was roughly seventeen times that size, and the helots who accompanied the Spartans are not counted at all.",
          },
          {
            label: "Greeks remaining for the final stand",
            figure: "The 300 Spartiates, about 700 Thespians and about 400 Thebans",
            source: "Herodotus 7.222",
            level: "disputed",
            assessment:
              "Herodotus states that Leonidas dismissed the other contingents. The Thespians stayed voluntarily and were destroyed; his account of the Thebans as unwilling hostages who surrendered is widely regarded as reflecting later Athenian hostility to Thebes rather than what happened.",
          },
        ],
      },
      {
        name: "The Achaemenid army",
        commanders: [
          { name: "Xerxes I", slug: "xerxes-i" },
          { name: "Hydarnes, commander of the Immortals" },
        ],
        forces: [
          {
            label: "Persian fighting men",
            figure: "1,700,000 infantry, with 80,000 cavalry and allied contingents bringing the total above five million with camp followers",
            source: "Herodotus 7.60, 7.184-186",
            level: "literary",
            assessment:
              "Universally rejected. An army of this size could not have been fed or watered on the route described, and Herodotus's own account of the counting — men herded in batches of ten thousand into a pen at Doriscus — reads as a story about scale rather than a return. The figure is the standard example of ancient numerical rhetoric.",
          },
          {
            label: "Persian fighting men",
            figure: "Roughly 70,000 to 150,000",
            source: "Modern reconstruction from logistics, road capacity and water supply",
            level: "disputed",
            assessment:
              "Modern estimates vary by a factor of several and none commands consensus. What is agreed is that the Persian force was very large by the standards of the period and much smaller than Herodotus says.",
          },
        ],
      },
    ],
    outcome:
      "Persian victory. The Greek force was destroyed and the pass taken, at a cost in time and casualties the Persians could afford.",
    summary: [
      "The Greek alliance chose to hold the pass at Thermopylae in conjunction with a fleet action at Artemisium, so that the Persian army and navy could not support each other along the coast road.",
      "For two days the Greeks held the narrow ground, where numbers could not be brought to bear and where heavy infantry in close order had every advantage. Herodotus reports that Xerxes sent in his best troops, the Immortals, and that they fared no better.",
      "A local man, Ephialtes, showed the Persians the Anopaia path over the mountain. The Phocian contingent posted to guard it was brushed aside at dawn.",
      "Learning that the position was turned, Leonidas dismissed most of the allied contingents and remained with the Spartiates, the Thespians and a Theban force. They were surrounded and killed. Herodotus reports that the body of Leonidas was recovered by the Persians and treated with a dishonour he regards as uncharacteristic of Xerxes.",
    ],
    tactics:
      "Thermopylae is the clearest ancient demonstration of terrain as a force multiplier. In the pass, a Persian army's advantages — numbers, cavalry, massed archery — could not be applied, while the Greek advantages of armour, the long thrusting spear and close order were decisive. The position had one weakness, the mountain path, and the campaign turned on it. The Greek plan was not a suicide mission but a delaying action tied to the fleet; it failed because the flank could not be held.",
    consequence:
      "Strategically the delay was modest and central Greece was lost with it; Athens was evacuated and burned. The Greek fleet withdrew from Artemisium and fought at Salamis weeks later. The battle's importance is disproportionate to its military result, and always has been: the Greeks themselves made it a monument, and the epitaph attributed to Simonides for the Spartan dead was set up at the site.",
    primarySources: [
      P("Histories", "7.175-239", "The only substantial ancient narrative, written roughly a generation later.", "Herodotus"),
      P("Diodorus Siculus, Library of History", "11.4-11", "A later account drawing on Ephorus, differing from Herodotus in several details.", "Diodorus"),
    ],
    archaeology: {
      level: "probable",
      note: "Excavation on the Kolonos hill, the traditional site of the final stand, recovered a concentration of bronze and iron arrowheads consistent with the account of the last phase. The identification of the hill is generally accepted. The silted coastline means the tactical ground cannot be reconstructed with confidence.",
    },
    disputes: [
      {
        question: "Was the stand a deliberate sacrifice?",
        positions:
          "Herodotus reports an oracle that Sparta must lose a king or lose the city, and presents Leonidas as acting on it. Whether this is a motive or a retrospective explanation is not recoverable. The alternative reading is a rearguard: the allies were dismissed to save them, and a covering force stayed to buy the withdrawal time.",
        level: "disputed",
      },
      {
        question: "How large was the Persian army?",
        positions:
          "Herodotus's figures are rejected by everyone; what should replace them is not agreed. Estimates from 70,000 to 300,000 have serious defenders, and the disagreement turns on logistics — how much water the route could supply and how fast a column of a given size could move.",
        level: "disputed",
      },
    ],
    reception:
      "No ancient battle has been more heavily appropriated. Thermopylae has been recruited by nineteenth-century nationalisms, by the Axis and by the Allies in the same war, and by modern political movements of several kinds. Readers will meet the battle through those uses before they meet Herodotus. The platform records this as reception; it does not license any of it, and it does not treat the Spartan state — a society resting on the systematic subjection of the helots — as an object of admiration.",
    relatedBattles: ["marathon", "salamis", "plataea"],
    topicRefs: ["spartan-army", "hoplite", "phalanx", "persian-immortals", "fortifications"],
    figureRefs: ["leonidas", "xerxes-i", "themistocles"],
  },
  {
    slug: "salamis",
    name: "Salamis",
    date: "480 BCE",
    dateLevel: "probable",
    war: "The second Persian invasion of Greece",
    standfirst:
      "A naval battle fought in the straits between Attica and the island of Salamis, and the engagement that broke the Persian campaign.",
    civilizations: ["athens", "greece", "achaemenid-empire", "persia"],
    location: {
      ancient: "The straits between Salamis and the Attic coast",
      modern: "Saronic Gulf, Greece",
      level: "documented",
      note: "The strait is securely identified. The precise axis of the fighting within it — where the lines formed and which way they faced — is reconstructed differently by different scholars.",
    },
    sides: [
      {
        name: "The Greek alliance",
        commanders: [
          { name: "Themistocles of Athens", slug: "themistocles" },
          { name: "Eurybiades of Sparta" },
        ],
        forces: [
          {
            label: "Greek triremes",
            figure: "378",
            source: "Herodotus 8.48, itemised by city",
            level: "probable",
            assessment:
              "Herodotus gives a contingent-by-contingent list, which makes it more credible than a round total. Aeschylus gives 310. The discrepancy is small by the standards of ancient naval figures and both are usable.",
          },
        ],
      },
      {
        name: "The Achaemenid fleet",
        commanders: [
          { name: "Xerxes I", slug: "xerxes-i" },
          { name: "Ariabignes" },
          { name: "Artemisia of Halicarnassus" },
        ],
        forces: [
          {
            label: "Persian warships at the outset of the campaign",
            figure: "1,207",
            source: "Herodotus 7.89",
            level: "disputed",
            assessment:
              "Aeschylus, an eyewitness writing eight years after the battle, gives the same total of 1,000 ships with 207 fast vessels, which suggests a shared tradition rather than independent confirmation. Modern estimates for the fleet actually engaged at Salamis are considerably lower, commonly in the range of 600 to 800, after storm losses and detachments.",
          },
        ],
      },
    ],
    outcome:
      "Decisive Greek victory. The Persian fleet withdrew and Xerxes returned to Asia with much of the army.",
    summary: [
      "After Thermopylae the Greek fleet fell back to Salamis, where the Athenian population had been evacuated. The allied commanders argued about whether to fight there or withdraw to the Isthmus.",
      "Herodotus reports that Themistocles forced the issue by sending a message to Xerxes claiming that the Greeks were about to disperse and that the Persian fleet should block the exits. Whether the message was a stratagem or a genuine offer of defection is not recoverable.",
      "The Persian fleet moved into the straits at night and held position. In the morning the Greeks attacked in confined water where the larger fleet could not deploy its numbers.",
      "Aeschylus, who is likely to have fought in the battle, describes ships jammed together, oars sheared, and the sea filled with wreckage and bodies. The Persian fleet was driven out of the strait with heavy losses.",
    ],
    tactics:
      "The whole engagement is an argument about sea room. In open water the larger and faster Persian fleet could outflank and outmanoeuvre; in the straits neither was possible, and the heavier, slower Greek ships could ram and board. Getting the enemy to accept battle on unfavourable ground was the decisive act, and it was accomplished before the fighting started.",
    consequence:
      "Xerxes withdrew to Asia with a large part of the army, leaving Mardonius in Greece with a picked force. The following year that force was destroyed at Plataea. Salamis also established Athenian naval power as the basis of the city's politics and empire for the next seventy years — the fleet was rowed by the poorest citizens, and their military indispensability became a democratic argument.",
    primarySources: [
      P("Persians", "lines 337-471", "A tragedy staged in 472 BCE, eight years after the battle, before an audience that had fought in it. The earliest account of any Greek battle, and by a participant.", "Aeschylus"),
      P("Histories", "8.40-97", "The fullest narrative.", "Herodotus"),
      P("Life of Themistocles", "10-15", "A later biography preserving additional traditions.", "Plutarch"),
    ],
    archaeology: {
      level: "probable",
      note: "Underwater survey in the strait has recovered material associated with the classical harbour installations at Ambelaki on Salamis. No wreck has been securely identified with the battle: triremes were built of light timber, were designed to swamp rather than sink, and leave little to find.",
    },
    disputes: [
      {
        question: "Was Themistocles's message a stratagem or a real betrayal?",
        positions:
          "Herodotus presents it as a ruse. Others in antiquity read it as genuine insurance by a man preparing to change sides. Themistocles's later career, which ended in exile and service at the Persian court, has been used to argue both ways.",
        level: "disputed",
      },
      {
        question: "Where exactly in the strait was the battle fought?",
        positions:
          "Aeschylus and Herodotus give directions and landmarks that cannot all be reconciled with the modern shoreline. Several reconstructions place the fighting in different parts of the channel; none is established.",
        level: "disputed",
      },
    ],
    relatedBattles: ["thermopylae", "plataea", "marathon", "actium"],
    topicRefs: ["trireme", "naval-warfare", "greek-warfare", "battle-tactics"],
    figureRefs: ["themistocles", "xerxes-i"],
  },
  {
    slug: "plataea",
    name: "Plataea",
    date: "479 BCE",
    dateLevel: "probable",
    war: "The second Persian invasion of Greece",
    standfirst:
      "The largest hoplite battle of the Persian Wars, which destroyed the Persian field army in Greece and ended the invasion.",
    civilizations: ["sparta", "athens", "greece", "achaemenid-empire", "persia"],
    location: {
      ancient: "The plain below Plataea, in southern Boeotia, along the Asopos river",
      modern: "Near Erythres, Boeotia, Greece",
      level: "probable",
      note: "The general area is secure; the specific positions of the two armies during the days of manoeuvring before the battle are reconstructed from Herodotus's topographical references and are debated.",
    },
    sides: [
      {
        name: "The Greek alliance",
        commanders: [
          { name: "Pausanias, regent of Sparta" },
          { name: "Aristides of Athens" },
        ],
        forces: [
          {
            label: "Greek hoplites",
            figure: "38,700",
            source: "Herodotus 9.28-29, itemised by city",
            level: "probable",
            assessment:
              "Itemised contingent by contingent, which makes it among the more usable figures in Herodotus. The accompanying 69,500 light-armed, including 35,000 helots attending the Spartans, is far less secure and looks schematic.",
          },
        ],
      },
      {
        name: "The Achaemenid army and its Greek allies",
        commanders: [
          { name: "Mardonius" },
          { name: "Artabazus" },
        ],
        forces: [
          {
            label: "Persian and allied troops",
            figure: "300,000, with 50,000 Greek allies",
            source: "Herodotus 9.32",
            level: "literary",
            assessment:
              "Rejected. The figure is of the same order as the invasion totals and fails on the same logistical grounds. Modern estimates for Mardonius's picked force are commonly in the tens of thousands.",
          },
        ],
      },
    ],
    outcome:
      "Decisive Greek victory. Mardonius was killed and the Persian force in Greece destroyed or dispersed.",
    summary: [
      "After Salamis, Mardonius wintered in Thessaly, reoccupied and burned Athens, and then withdrew into Boeotia, where the ground suited cavalry and where he had Theban support.",
      "The allied Greek army assembled under Spartan command and took position in the foothills. Days of manoeuvring followed in which neither side would attack the other on unfavourable ground, and in which Persian cavalry harassment cut the Greeks off from water by fouling the Gargaphian spring.",
      "A night withdrawal to a better position went wrong and left the Greek army divided at dawn. Mardonius attacked what he took to be a rout.",
      "The Spartans and Tegeans held and then broke the Persian infantry; Mardonius was killed in the fighting. The Athenians engaged the Theban contingent on the other wing. The Persian camp was stormed. Artabazus withdrew north with a substantial force and escaped.",
    ],
    tactics:
      "Plataea is the clearest ancient case of a battle decided by logistics and ground rather than by manoeuvre. Both commanders spent longer refusing battle than fighting it. The Persian advantage was cavalry, which could dominate open ground and interdict water; the Greek advantage was heavy infantry in close order, which was decisive once the lines met. The engagement began by accident, out of a mishandled night move.",
    consequence:
      "The Persian attempt to conquer mainland Greece ended. The victory also began the political sequence that produced the Athenian empire: the allied fleet moved to the offensive in the Aegean, and within a few years the leadership of the war had passed from Sparta to Athens.",
    primarySources: [
      P("Histories", "9.1-89", "The principal narrative.", "Herodotus"),
      P("Life of Aristides", "11-21", "A later account preserving an Athenian tradition.", "Plutarch"),
      P("The Serpent Column", "Delphi dedication", "A bronze victory monument inscribed with the names of the thirty-one allied states, dedicated at Delphi from the spoils and later removed to Constantinople, where the shaft survives.", "Anonymous dedication"),
    ],
    archaeology: {
      level: "documented",
      note: "The Serpent Column is the strongest material evidence for any battle in this period: a contemporary dedication naming the participating states, still legible, now standing in the Hippodrome at Istanbul. It corroborates the alliance rather than the battle narrative.",
    },
    disputes: [
      {
        question: "What happened during the night withdrawal?",
        positions:
          "Herodotus's account of the Greek army breaking into separated groups before dawn is confused, and includes a Spartan officer publicly refusing to move. Whether the episode is a real command failure, a later attempt to explain a disordered position, or a story about Spartan discipline is argued.",
        level: "disputed",
      },
    ],
    relatedBattles: ["marathon", "thermopylae", "salamis", "leuctra"],
    topicRefs: ["phalanx", "hoplite", "spartan-army", "persian-army", "logistics"],
    figureRefs: ["xerxes-i", "themistocles"],
  },

  // ─── Classical Greece ────────────────────────────────────────────────
  {
    slug: "leuctra",
    name: "Leuctra",
    date: "371 BCE",
    dateLevel: "documented",
    war: "The Theban–Spartan wars",
    standfirst:
      "A Theban army under Epaminondas broke the Spartan phalanx in open battle, and with it the assumption that Spartan infantry could not be beaten.",
    civilizations: ["sparta", "greece"],
    location: {
      ancient: "The plain of Leuctra in Boeotia",
      modern: "Lefktra, Boeotia, Greece",
      level: "probable",
      note: "The general location is accepted; a victory monument, the tropaion, stands on the site and has been partly restored.",
    },
    sides: [
      {
        name: "Thebes and the Boeotian league",
        commanders: [
          { name: "Epaminondas", slug: "epaminondas" },
          { name: "Pelopidas, commanding the Sacred Band" },
        ],
        forces: [
          {
            label: "Boeotian hoplites",
            figure: "About 6,000 to 7,000",
            source: "Modern reconstruction; the ancient sources give no reliable total",
            level: "probable",
            assessment:
              "Xenophon, who is present in this period and hostile to Thebes, gives no Theban total. The figure is an inference from the Boeotian league's known capacity.",
          },
        ],
      },
      {
        name: "Sparta and the Peloponnesian league",
        commanders: [{ name: "Cleombrotus I of Sparta" }],
        forces: [
          {
            label: "Allied hoplites",
            figure: "About 10,000, of whom roughly 700 were Spartiate citizens",
            source: "Xenophon, Hellenica 6.4; Plutarch, Pelopidas 20",
            level: "probable",
            assessment:
              "The small number of full Spartiates in a large allied army is the significant figure and is well attested. It reflects the demographic collapse of the Spartan citizen body, which is the deeper cause of what followed.",
          },
        ],
        casualties: [
          {
            label: "Spartiate dead",
            figure: "400 of about 700 present",
            source: "Xenophon, Hellenica 6.4.15",
            level: "documented",
            assessment:
              "Reported by a contemporary with Spartan sympathies who had no motive to exaggerate the loss, and given as a proportion of a stated total rather than as a round number — both reasons to treat it as unusually reliable. It is consistent with the demographic decline Aristotle diagnoses, and it explains why one defeat ended a hegemony.",
          },
        ],
      },
    ],
    outcome: "Decisive Theban victory. Cleombrotus was killed.",
    summary: [
      "Sparta invaded Boeotia to break up the reconstituted Boeotian league. The armies met on the plain at Leuctra.",
      "Conventional hoplite practice placed the best troops on the right of the line, so that the strongest wings of both armies faced the weakest of the other. Epaminondas inverted it: he massed his left to an unprecedented depth of fifty shields, placed the Sacred Band at its head, and held his weaker right back.",
      "The deep left struck the Spartan right, where Cleombrotus and the Spartiates stood, before the rest of the lines were engaged. The Spartan right was broken and the king killed.",
      "The Peloponnesian allies, who had little appetite for the war, gave way. The Spartans asked for a truce to recover their dead, which was in Greek convention an admission of defeat.",
    ],
    tactics:
      "Leuctra is the birth of the oblique order in European warfare. Two innovations combine: extreme depth concentrated at the decisive point, and refusal of the weaker wing so that the battle is decided before the rest of the line engages. The target was chosen deliberately — the Spartan right held the king and the citizen body, and destroying it destroyed the army's cohesion and its manpower at once. Philip II of Macedon, a hostage in Thebes as a young man during these years, later built his own tactical system on the same principle.",
    consequence:
      "Spartan hegemony ended within a decade. Epaminondas invaded Laconia, founded Messene and freed the Messenian helots, removing the agricultural base on which the Spartan system rested. Sparta remained a state and ceased to be a great power.",
    primarySources: [
      P("Hellenica", "6.4", "A contemporary account by a writer with Spartan sympathies, which makes his admission of the scale of the defeat significant.", "Xenophon"),
      P("Life of Pelopidas", "20-23", "Preserves the Theban tradition, including the role of the Sacred Band.", "Plutarch"),
      P("Library of History", "15.52-56", "A later narrative drawing on Ephorus, differing from Xenophon in several particulars.", "Diodorus Siculus"),
    ],
    disputes: [
      {
        question: "Did Epaminondas invent the tactic or systematise it?",
        positions:
          "Deep formations and weighted wings appear earlier, including at Delium in 424 BCE. What is new at Leuctra is the combination of extreme depth, deliberate refusal of the other wing, and the choice of the enemy's strongest point as the target. Whether that constitutes invention is a question about definitions.",
        level: "disputed",
      },
    ],
    relatedBattles: ["mantinea-362", "chaeronea", "plataea"],
    topicRefs: ["phalanx", "hoplite", "spartan-army", "battle-tactics", "strategy"],
    figureRefs: ["epaminondas", "philip-ii"],
  },
  {
    slug: "mantinea-362",
    name: "Mantinea (362 BCE)",
    date: "362 BCE",
    dateLevel: "documented",
    war: "The Theban hegemony",
    standfirst:
      "The largest hoplite battle fought between Greek states, won by Thebes and rendered indecisive by the death of the commander who won it.",
    civilizations: ["sparta", "athens", "greece"],
    location: {
      ancient: "The plain of Mantinea in Arcadia",
      modern: "Near Mantineia, Arcadia, Greece",
      level: "probable",
      note: "Three major battles were fought on this plain — in 418, 362 and 207 BCE. This page covers the battle of 362. The engagement of 418 BCE, described in detail by Thucydides, is a separate subject.",
    },
    sides: [
      {
        name: "Thebes and its allies",
        commanders: [{ name: "Epaminondas", slug: "epaminondas" }],
        forces: [
          {
            label: "Theban and allied troops",
            figure: "About 30,000 infantry and 3,000 cavalry",
            source: "Diodorus Siculus 15.84",
            level: "disputed",
            assessment:
              "Xenophon, the contemporary source, gives no totals. Diodorus writes three centuries later and his figures for this period are frequently schematic.",
          },
        ],
      },
      {
        name: "Sparta, Athens, Mantinea and allies",
        commanders: [
          { name: "Agesilaus II of Sparta" },
          { name: "Athenian and Mantinean commanders" },
        ],
        forces: [
          {
            label: "Allied troops",
            figure: "About 20,000 infantry and 2,000 cavalry",
            source: "Diodorus Siculus 15.84",
            level: "disputed",
            assessment:
              "The same caution applies as to the Theban figure: Diodorus writes three centuries later, Xenophon the contemporary gives no totals, and the relative disparity is more likely to be reliable than either absolute number.",
          },
        ],
      },
    ],
    outcome:
      "Tactical Theban victory, strategically indecisive. Epaminondas was mortally wounded and the Theban ascendancy did not survive him.",
    summary: [
      "Epaminondas invaded the Peloponnese for the fourth time, attempting first a surprise march on an undefended Sparta, which failed when the city was warned.",
      "The armies met at Mantinea. Epaminondas repeated the tactical scheme of Leuctra on a larger scale, massing his left and refusing his right, and preceded the attack by manoeuvres that led the enemy to believe he would not fight that day.",
      "The deep Theban left broke the allied right. In the pursuit Epaminondas was struck by a spear and mortally wounded.",
      "Xenophon reports that the Theban army, having won, halted and did nothing further, and that both sides claimed victory and set up trophies. He ends his history at this point, remarking that the battle produced still greater confusion in Greece than had existed before.",
    ],
    tactics:
      "A refinement rather than a repetition of Leuctra: the same weighted wing, with the addition of a cavalry force massed on the same flank and a feint that induced the enemy to stand down. The battle also demonstrates the structural limit of the Theban system, which depended on one commander who had to lead the attack in person.",
    consequence:
      "The Theban hegemony collapsed with its author. No Greek state emerged dominant, and the exhaustion of the leading cities prepared the ground for Macedon. Xenophon's closing verdict — that the outcome settled nothing — has been the standard judgement ever since.",
    primarySources: [
      P("Hellenica", "7.5", "The contemporary account, and the last passage of the work.", "Xenophon"),
      P("Library of History", "15.82-88", "A fuller later narrative with the only troop figures we have.", "Diodorus Siculus"),
    ],
    disputes: [
      {
        question: "Would the Theban system have survived Epaminondas?",
        positions:
          "A counterfactual, and treated here as such. What can be said is that Theban power did not survive him, and that the tactical system was inherited by Macedon rather than by Thebes.",
        level: "unknown",
      },
    ],
    relatedBattles: ["leuctra", "chaeronea"],
    topicRefs: ["phalanx", "hoplite", "battle-tactics", "strategy", "command-structure"],
    figureRefs: ["epaminondas", "philip-ii"],
  },
  {
    slug: "chaeronea",
    name: "Chaeronea",
    date: "338 BCE",
    dateLevel: "documented",
    war: "The rise of Macedon",
    standfirst:
      "Philip II defeated the combined armies of Athens and Thebes, ending the independence of the Greek city-states as a system of competing powers.",
    civilizations: ["macedon", "athens", "greece"],
    location: {
      ancient: "The plain of Chaeronea in western Boeotia",
      modern: "Chaironeia, Boeotia, Greece",
      level: "documented",
      note: "The site is secure and marked by the Lion of Chaeronea, a funerary monument raised over a mass grave on the field.",
    },
    sides: [
      {
        name: "Macedon",
        commanders: [
          { name: "Philip II", slug: "philip-ii" },
          { name: "Alexander, commanding the left", slug: "alexander" },
        ],
        forces: [
          {
            label: "Macedonian troops",
            figure: "30,000 infantry and 2,000 cavalry",
            source: "Diodorus Siculus 16.85",
            level: "disputed",
            assessment:
              "The only figures we have, from a source three centuries later. They are of a plausible order for a Macedonian field army of this date but are not independently corroborated.",
          },
        ],
      },
      {
        name: "Athens, Thebes and allies",
        commanders: [
          { name: "Chares and Lysicles of Athens" },
          { name: "Theagenes of Thebes" },
        ],
        forces: [
          {
            label: "Allied troops",
            figure: "Comparable to the Macedonian force",
            source: "Diodorus Siculus 16.85, who says the allies were more numerous",
            level: "disputed",
            assessment:
              "Diodorus states that the allies had more men and Philip the better army. The claim is impressionistic.",
          },
        ],
        casualties: [
          {
            label: "Athenian prisoners",
            figure: "2,000",
            source: "Diodorus Siculus 16.86",
            level: "disputed",
            assessment:
              "A round figure from a source three centuries later. That prisoners were taken in numbers and subsequently released without ransom is corroborated by the political settlement that followed.",
          },
          {
            label: "The Theban Sacred Band",
            figure: "Destroyed to a man",
            source: "Plutarch, Pelopidas 18",
            level: "probable",
            assessment:
              "Plutarch reports that the three hundred fell where they stood. Excavation of the mass grave beneath the Lion of Chaeronea recovered 254 skeletons in seven rows, which is consistent with the tradition without proving the identification.",
          },
        ],
      },
    ],
    outcome:
      "Decisive Macedonian victory. The Greek states accepted Macedonian hegemony at the settlement that followed.",
    summary: [
      "Athens and Thebes, long enemies, allied against Macedonian expansion into central Greece and took position across the plain at Chaeronea.",
      "The ancient accounts are thin on the fighting. Diodorus reports that the eighteen-year-old Alexander commanded the Macedonian left, opposite the Sacred Band, and was the first to break the line facing him.",
      "A tradition preserved in Polyaenus has Philip's right wing execute a feigned withdrawal that drew the Athenians forward and opened a gap in the allied line. The manoeuvre is plausible and is not attested by a contemporary.",
      "The Sacred Band was surrounded and destroyed. Athenian losses were heavy, and a substantial number were taken prisoner and later released.",
    ],
    tactics:
      "Chaeronea is the demonstration of the Macedonian combined-arms system: a phalanx of pikemen able to fix an enemy line in place, and heavy cavalry able to exploit any gap that opened. The phalanx does not win the battle; it holds the enemy while the cavalry decides it. This is the system Alexander took into Asia four years later.",
    consequence:
      "Philip imposed the League of Corinth, which bound the Greek states to Macedon and to a projected war against Persia. Thebes was garrisoned; Athens was treated leniently. The classical city-state continued to exist and stopped being able to conduct an independent foreign policy.",
    primarySources: [
      P("Library of History", "16.84-88", "The fullest surviving narrative.", "Diodorus Siculus"),
      P("Life of Alexander", "9", "Preserves the tradition of Alexander's role.", "Plutarch"),
      P("Life of Pelopidas", "18", "The account of the Sacred Band's destruction.", "Plutarch"),
    ],
    archaeology: {
      level: "documented",
      note: "The Lion of Chaeronea, a monumental stone lion raised over a mass grave on the battlefield, was rediscovered in the nineteenth century and re-erected. Excavation beneath it recovered 254 skeletons laid out in rows. The monument's association with the battle is secure; its specific identification as the grave of the Sacred Band rests on Plutarch and on the arrangement of the burials.",
    },
    disputes: [
      {
        question: "Did Philip's right wing execute a feigned retreat?",
        positions:
          "The manoeuvre is reported by Polyaenus, a compiler of stratagems writing in the second century CE, and not by Diodorus. It is tactically plausible and would require a level of drill the Macedonian army probably possessed. It is not contemporary evidence.",
        level: "disputed",
      },
      {
        question: "Is the mass grave beneath the Lion the Sacred Band?",
        positions:
          "The grave, the monument and the battle are securely connected. That these particular 254 men were the Sacred Band is an identification resting on the literary tradition rather than on anything found in the burial.",
        level: "probable",
      },
    ],
    relatedBattles: ["leuctra", "mantinea-362", "granicus"],
    topicRefs: ["macedonian-army", "phalanx", "companion-cavalry", "battle-tactics"],
    figureRefs: ["philip-ii", "alexander"],
    imageSlug: "lion-of-chaeronea",
  },

  // ─── Alexander's campaigns ───────────────────────────────────────────
  {
    slug: "granicus",
    name: "The Granicus",
    date: "334 BCE",
    dateLevel: "documented",
    war: "Alexander's invasion of the Persian empire",
    standfirst:
      "Alexander's first battle in Asia, fought at a river crossing against the satraps of the western provinces, and the engagement that opened Asia Minor to him.",
    civilizations: ["macedon", "achaemenid-empire", "persia"],
    location: {
      ancient: "The river Granicus in the Troad",
      modern: "The Biga Çayı, north-western Turkey",
      level: "probable",
      note: "The river is identified; the crossing point is not. The channel has migrated across its floodplain since antiquity.",
    },
    sides: [
      {
        name: "Macedon and the League of Corinth",
        commanders: [
          { name: "Alexander III", slug: "alexander" },
          { name: "Parmenion" },
        ],
        forces: [
          {
            label: "Macedonian and allied troops",
            figure: "About 13,000 infantry and 5,000 cavalry engaged",
            source: "Arrian, Anabasis 1.11-14, with Diodorus 17.17 giving the invasion force",
            level: "probable",
            assessment:
              "Arrian draws on Ptolemy and Aristobulus, both participants, which makes the Macedonian figures more reliable than most in ancient battle narrative.",
          },
        ],
      },
      {
        name: "The Persian satrapal army",
        commanders: [
          { name: "Arsites, satrap of Hellespontine Phrygia" },
          { name: "Memnon of Rhodes, commanding the Greek mercenaries" },
        ],
        forces: [
          {
            label: "Persian cavalry",
            figure: "About 20,000",
            source: "Arrian, Anabasis 1.14",
            level: "disputed",
            assessment:
              "Plausible in order of magnitude for a combined satrapal levy, but not independently checkable.",
          },
          {
            label: "Greek mercenary infantry in Persian service",
            figure: "About 20,000",
            source: "Arrian, Anabasis 1.14",
            level: "disputed",
            assessment:
              "Widely regarded as too high, not least because Arrian's own narrative gives the mercenaries almost no part in the fighting until they are surrounded after it.",
          },
        ],
      },
    ],
    outcome:
      "Macedonian victory. The satrapal army was destroyed and western Asia Minor fell open.",
    summary: [
      "The Persian commanders concentrated at the Granicus to meet the invasion. Memnon of Rhodes is said to have advised a scorched-earth withdrawal instead, and to have been overruled by satraps unwilling to see their own provinces burned.",
      "The Persians drew up with cavalry along the far bank and the Greek mercenary infantry behind. Arrian reports that Parmenion advised waiting until dawn and that Alexander attacked at once.",
      "The Macedonians crossed at an angle under fire and forced a bridgehead. The fighting on the bank was a cavalry melee in which Alexander was nearly killed; Arrian reports that Cleitus the Black saved his life by cutting off the arm of a Persian about to strike him.",
      "The Persian cavalry broke. The Greek mercenaries, left standing, asked for terms; Alexander refused, surrounded them and killed or enslaved them.",
    ],
    tactics:
      "An opposed river crossing is among the hardest operations in pre-modern warfare, and the Macedonians attempted it against cavalry holding the far bank. The reported solution was to cross obliquely so that the line arrived formed rather than piecemeal, and to lead with a strong force that could absorb the first shock. The Persian dispositions have been criticised since antiquity for putting cavalry where they could not charge and infantry where they could not fight.",
    consequence:
      "Western Asia Minor was opened, and the Greek cities of the coast changed hands. Alexander sent three hundred panoplies to Athens as a dedication on the Acropolis, with an inscription naming the Greeks 'except the Spartans' — a political act as much as a religious one.",
    primarySources: [
      P("Anabasis of Alexander", "1.11-16", "The principal narrative, drawing on the eyewitness accounts of Ptolemy and Aristobulus.", "Arrian"),
      P("Library of History", "17.18-21", "An independent tradition differing from Arrian on the timing of the attack.", "Diodorus Siculus"),
      P("Life of Alexander", "16", "Preserves additional detail on the fighting at the bank.", "Plutarch"),
    ],
    disputes: [
      {
        question: "Was the attack immediate or at dawn the next day?",
        positions:
          "Arrian describes an immediate assault across the river in the late afternoon. Diodorus describes a crossing at dawn the following day against an unprepared enemy. The two cannot be reconciled. Arrian's sources are closer to the events; Diodorus's version is tactically more sensible, which is itself an argument in both directions.",
        level: "disputed",
      },
    ],
    relatedBattles: ["issus", "gaugamela", "chaeronea"],
    topicRefs: ["companion-cavalry", "macedonian-army", "phalanx", "persian-army"],
    figureRefs: ["alexander", "darius-i"],
  },
  {
    slug: "issus",
    name: "Issus",
    date: "333 BCE",
    dateLevel: "documented",
    war: "Alexander's invasion of the Persian empire",
    standfirst:
      "Alexander's first battle against Darius III, fought on a narrow coastal plain that neutralised Persian numbers, and after which the Persian royal family fell into Macedonian hands.",
    civilizations: ["macedon", "achaemenid-empire", "persia"],
    location: {
      ancient: "The coastal plain at the river Pinarus, near Issus in Cilicia",
      modern: "The plain of Issus near Dörtyol, Hatay province, Turkey",
      level: "probable",
      note: "The general location is agreed; which modern watercourse is the Pinarus is disputed, and the coastline has advanced since antiquity.",
    },
    sides: [
      {
        name: "Macedon and the League of Corinth",
        commanders: [
          { name: "Alexander III", slug: "alexander" },
          { name: "Parmenion" },
        ],
        forces: [
          {
            label: "Macedonian troops",
            figure: "Between 30,000 and 40,000",
            source: "Modern reconstruction from Arrian's order of battle",
            level: "probable",
            assessment:
              "Arrian describes the units without giving a total. The reconstruction is from establishment strengths and is reasonably secure.",
          },
        ],
      },
      {
        name: "The Achaemenid royal army",
        commanders: [{ name: "Darius III" }],
        forces: [
          {
            label: "Persian troops",
            figure: "600,000",
            source: "Arrian, Anabasis 2.8",
            level: "literary",
            assessment:
              "Rejected. The plain at Issus is a few kilometres wide between mountains and sea; it could not contain a force of this size, a point the ancient narratives themselves make when they say Darius chose ground that prevented him deploying. Modern estimates are commonly in the range of 60,000 to 100,000 and remain uncertain.",
          },
          {
            label: "Greek mercenary infantry in Persian service",
            figure: "30,000",
            source: "Arrian, Anabasis 2.8",
            level: "disputed",
            assessment:
              "Too high on most modern assessments, though a substantial mercenary corps is well attested and fought hard.",
          },
        ],
      },
    ],
    outcome:
      "Macedonian victory. Darius fled the field, abandoning his camp, his treasury and his family.",
    summary: [
      "Darius brought the royal army west and, by moving through the mountain passes behind Alexander, placed himself across the Macedonian line of communication. Alexander turned about and marched back to meet him.",
      "The Persians drew up behind the Pinarus with the Greek mercenaries in the centre facing the Macedonian phalanx, cavalry massed on the seaward flank, and light troops in the foothills.",
      "Alexander led the Companion cavalry against the Persian left at the foot of the hills, broke it, and wheeled inward toward the Persian centre and the king. The phalanx, crossing the riverbed under fire, was disordered and suffered badly against the mercenaries.",
      "Darius left the field as the Macedonian cavalry closed on him. His departure ended the battle. His mother, wife and children were taken in the camp and, on the ancient accounts, treated with conspicuous courtesy.",
    ],
    tactics:
      "The Macedonian system in its characteristic form: the phalanx fixes and absorbs, the heavy cavalry finds the flank and drives at the enemy command. The choice of ground favoured Alexander decisively, and the ancient sources are unanimous that it was Darius who chose it — a narrow plain where the larger army could not deploy or use its cavalry advantage.",
    consequence:
      "The Persian field army was broken and its king had fled twice from the same enemy. Alexander turned south to take the Levantine coast and Egypt rather than pursuing Darius inland, a decision that secured the Mediterranean seaboard and the fleet bases before the campaign moved east.",
    primarySources: [
      P("Anabasis of Alexander", "2.6-12", "The principal narrative.", "Arrian"),
      P("Library of History", "17.32-39", "An independent tradition.", "Diodorus Siculus"),
      P("History of Alexander", "3.8-12", "A rhetorical Latin account preserving further detail.", "Quintus Curtius Rufus"),
    ],
    archaeology: {
      level: "disputed",
      note: "The Alexander Mosaic from the House of the Faun at Pompeii, a Roman floor mosaic of about 100 BCE thought to copy a Hellenistic painting, shows Alexander charging toward a Persian king in a chariot. It is usually identified with Issus and sometimes with Gaugamela; the mosaic carries no label and the identification is an art-historical inference.",
    },
    disputes: [
      {
        question: "Does the Alexander Mosaic depict Issus?",
        positions:
          "The scene fits both Issus and Gaugamela, and the mosaic names nothing. Most scholars favour Issus on the grounds of the terrain and the composition; the question is not settled and the image should not be captioned as though it were.",
        level: "disputed",
      },
      {
        question: "Did Darius flee prematurely?",
        positions:
          "The Greek and Roman sources are hostile to Darius and present his withdrawal as cowardice. A Persian king's death or capture would have ended the empire's ability to resist, and withdrawal to raise another army is a defensible decision. The sources' framing is a product of their perspective.",
        level: "disputed",
      },
    ],
    relatedBattles: ["granicus", "gaugamela"],
    topicRefs: ["companion-cavalry", "macedonian-army", "phalanx", "persian-army", "strategy"],
    figureRefs: ["alexander"],
    imageSlug: "alexander-mosaic",
  },
  {
    slug: "gaugamela",
    name: "Gaugamela",
    date: "331 BCE",
    dateLevel: "documented",
    dateNote:
      "1 October 331 BCE. The date is fixed unusually precisely by a lunar eclipse recorded eleven days before the battle in both the Greek sources and a Babylonian astronomical diary.",
    war: "Alexander's invasion of the Persian empire",
    standfirst:
      "The decisive battle of the Persian war, fought on ground Darius had chosen and prepared, and after which the Achaemenid empire had no field army left.",
    civilizations: ["macedon", "achaemenid-empire", "persia"],
    location: {
      ancient: "The plain of Gaugamela, near Arbela in Assyria",
      modern: "Near Mosul, northern Iraq; the precise site is not established",
      level: "disputed",
      note: "Ancient authors sometimes call it the battle of Arbela, which is some distance away. Several candidate locations on the plain have been proposed and none is confirmed by excavation.",
    },
    sides: [
      {
        name: "Macedon and the League of Corinth",
        commanders: [
          { name: "Alexander III", slug: "alexander" },
          { name: "Parmenion, commanding the left" },
        ],
        forces: [
          {
            label: "Macedonian troops",
            figure: "40,000 infantry and 7,000 cavalry",
            source: "Arrian, Anabasis 3.12",
            level: "probable",
            assessment:
              "Consistent with the campaign's known reinforcements and generally accepted.",
          },
        ],
      },
      {
        name: "The Achaemenid royal army",
        commanders: [
          { name: "Darius III" },
          { name: "Bessus, satrap of Bactria" },
          { name: "Mazaeus" },
        ],
        forces: [
          {
            label: "Persian troops",
            figure: "1,000,000 infantry, 40,000 cavalry, 200 scythed chariots and 15 elephants",
            source: "Arrian, Anabasis 3.8",
            level: "literary",
            assessment:
              "The infantry figure is rejected. The specific and modest counts of chariots and elephants in the same passage are usually accepted, which is characteristic: ancient sources are often reliable on unusual items they could count and unreliable on masses they could not.",
          },
          {
            label: "Persian troops",
            figure: "Between 50,000 and 120,000",
            source: "Modern reconstruction",
            level: "disputed",
            assessment:
              "The range is wide and the disagreement genuine. What is agreed is that Alexander was substantially outnumbered and that the disparity was nothing like the ancient figures.",
          },
        ],
      },
    ],
    outcome:
      "Decisive Macedonian victory. Darius fled and was murdered by his own officers the following year.",
    summary: [
      "Darius selected a broad plain and had it levelled so that his cavalry and scythed chariots could operate freely — a rare instance of an ancient commander preparing a battlefield in advance.",
      "Alexander advanced obliquely to his right, drawing the Persian left after him and away from the prepared ground. The manoeuvre stretched the Persian line.",
      "The scythed chariots were dealt with by opening lanes in the infantry and letting them through to be dispatched from behind — a drill the phalanx could perform and the chariots could not counter.",
      "A gap opened in the Persian line as its left extended. Alexander led the Companions into it in wedge and drove toward the centre. Darius again left the field. On the Macedonian left Parmenion was hard pressed and the Persian cavalry under Mazaeus broke through to the baggage camp before the collapse of the centre ended the battle.",
    ],
    tactics:
      "Gaugamela is the fullest expression of the Macedonian system and of Alexander's characteristic method: refuse the enemy the battle he has prepared, induce him to stretch his line, and drive heavy cavalry into the gap that results. The flank guards and the second line the Macedonians deployed were designed for exactly the envelopment the Persians attempted, and they held long enough for the decision to be made elsewhere.",
    consequence:
      "The Achaemenid empire lost its last field army. Babylon and Susa surrendered; Persepolis was taken and its palace burned. Darius was killed by Bessus in 330 BCE, and Alexander assumed the position of legitimate successor rather than conqueror — a claim he pursued for the rest of his life.",
    primarySources: [
      P("Anabasis of Alexander", "3.7-15", "The principal narrative.", "Arrian"),
      P("Library of History", "17.53-61", "An independent tradition.", "Diodorus Siculus"),
      P("Astronomical Diary for 331 BCE", "BM 36761 and related tablets", "A Babylonian cuneiform record noting the lunar eclipse of 20 September 331 BCE and, in a damaged passage, the defeat of the king. Independent non-Greek documentation of the campaign.", "Babylonian astronomers"),
    ],
    archaeology: {
      level: "documented",
      note: "The Babylonian astronomical diaries are the significant material evidence, and they are not archaeology of the battlefield but contemporary documentary evidence from the other side. They fix the date and confirm the outcome independently of the Greek tradition. No battlefield site has been securely located.",
    },
    disputes: [
      {
        question: "Where was the battle fought?",
        positions:
          "The ancient sources place it at Gaugamela and sometimes at Arbela, and the two are not the same place. Candidate sites on the plain near Mosul have been proposed on topographical grounds; none has produced confirming material.",
        level: "disputed",
      },
    ],
    relatedBattles: ["issus", "granicus"],
    topicRefs: ["companion-cavalry", "macedonian-army", "phalanx", "persian-army", "battle-tactics", "strategy"],
    figureRefs: ["alexander", "darius-i"],
  },

  // ─── Rome: the Punic Wars ────────────────────────────────────────────
  {
    slug: "cannae",
    name: "Cannae",
    date: "216 BCE",
    dateLevel: "probable",
    war: "The Second Punic War",
    standfirst:
      "Hannibal destroyed the largest army Rome had ever put in the field by allowing his own centre to be pushed back, and produced the model double envelopment of European military history.",
    civilizations: ["roman-republic", "rome"],
    location: {
      ancient: "The plain of the Aufidus river near Cannae, in Apulia",
      modern: "Near Barletta, Puglia, Italy",
      level: "probable",
      note: "The general location is accepted. Which bank of the Aufidus the armies stood on is disputed, and the river has shifted its course.",
    },
    sides: [
      {
        name: "The Roman Republic and its Italian allies",
        commanders: [
          { name: "Lucius Aemilius Paullus" },
          { name: "Gaius Terentius Varro" },
        ],
        forces: [
          {
            label: "Roman and allied infantry",
            figure: "About 80,000 infantry and 6,000 cavalry",
            source: "Polybius 3.113",
            level: "disputed",
            assessment:
              "Polybius wrote within two generations and had access to participants' families, which makes him the best source available. Livy gives a different account and reports variant traditions. Modern estimates commonly reduce the figure, and a range of 50,000 to 86,000 is defended.",
          },
        ],
        casualties: [
          {
            label: "Roman dead",
            figure: "70,000",
            source: "Polybius 3.117",
            level: "disputed",
            assessment:
              "Livy 22.49 gives about 48,200. The disparity between two of the better ancient sources on the most famous casualty figure in Roman history is a useful caution. Either way the loss was catastrophic and unprecedented.",
          },
        ],
      },
      {
        name: "Carthage and its allies",
        commanders: [
          { name: "Hannibal Barca", slug: "hannibal" },
          { name: "Hasdrubal, commanding the Spanish and Gallic cavalry" },
        ],
        forces: [
          {
            label: "Carthaginian troops",
            figure: "About 40,000 infantry and 10,000 cavalry",
            source: "Polybius 3.114",
            level: "probable",
            assessment:
              "Generally accepted in order of magnitude. The cavalry superiority, roughly two to one, is the militarily significant figure and is not disputed.",
          },
        ],
      },
    ],
    outcome:
      "Carthaginian victory, and among the most complete tactical destructions in ancient warfare.",
    summary: [
      "After defeats at the Trebia and Lake Trasimene, Rome abandoned the delaying strategy of Fabius Maximus and raised an exceptionally large consular army to force a decision.",
      "Hannibal drew up with his Spanish and Gallic infantry in a convex line bulging toward the Romans, his veteran African infantry in column on either flank, and his superior cavalry on the wings.",
      "The Roman infantry pushed the Carthaginian centre back, as it was intended to. The convex line became concave. As the Romans pressed into the pocket their front narrowed and their mass became unusable.",
      "The African infantry turned inward on both flanks. The Carthaginian cavalry drove the Roman horse from the field, rode around the rear and closed the encirclement. The Roman army was surrounded in a space too small to fight in and killed over the course of a day.",
    ],
    tactics:
      "The manoeuvre requires a commander to plan for his own centre to give way and to trust that it will retreat without breaking — which is why it has been imitated more often than it has been executed. Its precondition was cavalry superiority: without control of the flanks and rear the encirclement cannot be closed. Cannae is studied less as a template than as a demonstration that a numerically inferior army can convert an enemy's mass into a liability.",
    consequence:
      "Rome lost perhaps a fifth of its available male citizens of military age in a single day, along with a serving consul, two former consuls and some eighty senators. Several southern Italian communities and Capua defected to Hannibal, and Macedon entered the war against Rome. Rome refused to negotiate, raised new armies, and returned to the Fabian strategy. The war was decided in Spain and Africa rather than in Italy.",
    primarySources: [
      P("Histories", "3.107-118", "The fullest and earliest surviving account, by a Greek writing at Rome with access to the Scipionic circle.", "Polybius"),
      P("History of Rome", "22.34-54", "A later and more rhetorical Latin account, preserving variant figures and traditions.", "Livy"),
      P("Life of Fabius Maximus", "14-17", "Preserves the political argument at Rome before and after the battle.", "Plutarch"),
    ],
    disputes: [
      {
        question: "How many Romans died?",
        positions:
          "Polybius gives 70,000, Livy about 48,200. The figures cannot be reconciled and both authors are drawing on earlier annalistic material now lost. The scale of the disaster is not in question; the number is.",
        level: "disputed",
      },
      {
        question: "Was Varro solely responsible?",
        positions:
          "The tradition blames the plebeian consul Varro and exculpates the aristocratic Paullus, who died on the field. The pattern is suspiciously convenient for the senatorial families whose accounts fed the historians, and modern scholarship treats the apportionment of blame as a product of Roman politics rather than a finding.",
        level: "disputed",
      },
    ],
    relatedBattles: ["zama", "carrhae", "teutoburg-forest"],
    topicRefs: ["roman-army", "legion", "battle-tactics", "strategy", "command-structure"],
    figureRefs: ["hannibal", "scipio-africanus"],
  },
  {
    slug: "zama",
    name: "Zama",
    date: "202 BCE",
    dateLevel: "probable",
    war: "The Second Punic War",
    standfirst:
      "Scipio defeated Hannibal in North Africa and ended the Second Punic War, using the Roman manipular system against the tactic that had beaten it at Cannae.",
    civilizations: ["roman-republic", "rome"],
    location: {
      ancient: "Somewhere inland from Carthage; the sources name Zama and Naraggara",
      modern: "Not established; candidate sites in northern Tunisia",
      level: "unknown",
      note: "This is the least securely located of the major battles on this platform. The ancient authors disagree, no site has produced confirming material, and the identification remains open.",
    },
    sides: [
      {
        name: "Rome and Numidia",
        commanders: [
          { name: "Publius Cornelius Scipio", slug: "scipio-africanus" },
          { name: "Masinissa of Numidia" },
        ],
        forces: [
          {
            label: "Roman and Numidian troops",
            figure: "About 29,000 infantry and 6,000 cavalry",
            source: "Polybius 15.9 and modern reconstruction",
            level: "probable",
            assessment:
              "Polybius does not give a clean total. The significant fact is that at Zama the cavalry advantage was Roman, because Masinissa had changed sides — the reverse of Cannae.",
          },
        ],
      },
      {
        name: "Carthage",
        commanders: [{ name: "Hannibal Barca", slug: "hannibal" }],
        forces: [
          {
            label: "Carthaginian troops",
            figure: "About 36,000 infantry, 4,000 cavalry and 80 war elephants",
            source: "Polybius 15.11 and Livy 30.33",
            level: "disputed",
            assessment:
              "The elephant count is specific and generally accepted; the infantry total is less secure. Hannibal's army was assembled from mercenaries, Carthaginian levies and his Italian veterans, and its unevenness mattered more than its size.",
          },
        ],
      },
    ],
    outcome:
      "Roman victory. Carthage sued for peace and accepted terms that ended it as a military power.",
    summary: [
      "Scipio's invasion of Africa forced Carthage to recall Hannibal from Italy. The two commanders are reported to have met before the battle and failed to agree terms.",
      "Hannibal placed his elephants in front, his mercenaries in the first line, his Carthaginian levies in the second, and his Italian veterans well behind the rest.",
      "Scipio arranged his maniples in columns with lanes between them rather than in the usual staggered checkerboard, so that the elephant charge could pass through the formation instead of striking it. The elephants were driven off or channelled away.",
      "The infantry lines ground against each other. The Roman and Numidian cavalry drove the Carthaginian horse from the field and — repeating Hannibal's own manoeuvre at Cannae — returned in time to strike the rear of his veterans while they were fully engaged.",
    ],
    tactics:
      "Zama is the Roman answer to Cannae, and the answer is that the manoeuvre depends on cavalry superiority rather than on genius. Scipio had spent the war in Spain learning to fight Carthaginian armies and had secured the Numidian cavalry by diplomacy before the campaign began. The lanes opened for the elephants show the manipular legion doing something a phalanx could not: changing its intervals under orders on the field.",
    consequence:
      "Carthage surrendered its fleet, its overseas possessions and its freedom to make war without Roman permission, and paid an indemnity over fifty years. Rome became the dominant power in the western Mediterranean. Hannibal survived, reformed Carthaginian government, and eventually fled to the Seleucid court.",
    primarySources: [
      P("Histories", "15.5-16", "The principal account, by an author close to the Scipionic family.", "Polybius"),
      P("History of Rome", "30.29-35", "The fullest Latin narrative.", "Livy"),
      P("The Punic Wars", "40-47", "A later Greek account preserving a different tradition.", "Appian"),
    ],
    disputes: [
      {
        question: "Where was the battle fought?",
        positions:
          "Polybius, Livy and Nepos give different place names, and no site has been confirmed. This is an unusual case where a decisive battle of a major war cannot be located on the ground.",
        level: "unknown",
      },
      {
        question: "Did Scipio and Hannibal meet before the battle?",
        positions:
          "Polybius reports a parley with speeches. The speeches are certainly composed rather than recorded, in the normal manner of ancient historiography; whether a meeting took place at all is uncertain.",
        level: "disputed",
      },
    ],
    relatedBattles: ["cannae"],
    topicRefs: ["legion", "roman-army", "battle-tactics", "command-structure"],
    figureRefs: ["scipio-africanus", "hannibal"],
  },

  // ─── Rome: conquest and civil war ────────────────────────────────────
  {
    slug: "alesia",
    name: "Alesia",
    date: "52 BCE",
    dateLevel: "probable",
    war: "Caesar's Gallic Wars",
    standfirst:
      "Caesar besieged Vercingetarix inside a hilltop stronghold while simultaneously defending his own siege lines against a relief army, and ended organised Gallic resistance.",
    civilizations: ["roman-republic", "rome"],
    location: {
      ancient: "The oppidum of Alesia",
      modern: "Alise-Sainte-Reine, Côte-d'Or, France",
      level: "probable",
      note: "The identification was contested through the nineteenth and twentieth centuries, with a rival candidate at Chaux-des-Crotenay. Excavation at Alise-Sainte-Reine has recovered Roman siege works, weapons and coins consistent with Caesar's description, and the identification is now widely though not universally accepted.",
    },
    sides: [
      {
        name: "Rome",
        commanders: [
          { name: "Gaius Julius Caesar", slug: "julius-caesar" },
          { name: "Titus Labienus" },
          { name: "Mark Antony", slug: "mark-antony" },
        ],
        forces: [
          {
            label: "Roman legions and auxiliaries",
            figure: "Around 40,000 to 60,000",
            source: "Modern reconstruction from the legions Caesar names",
            level: "probable",
            assessment:
              "Caesar gives no total. The estimate follows from the ten or eleven legions he describes, at strengths below establishment after a long campaign.",
          },
        ],
      },
      {
        name: "The Gallic confederation",
        commanders: [
          { name: "Vercingetorix", slug: "vercingetorix" },
          { name: "Commius of the Atrebates" },
        ],
        forces: [
          {
            label: "Gauls besieged in the oppidum",
            figure: "80,000",
            source: "Caesar, Gallic War 7.71",
            level: "disputed",
            assessment:
              "Caesar's own figure, in his own dispatch, for an enemy he defeated. Treat accordingly.",
          },
          {
            label: "The Gallic relief army",
            figure: "About 250,000 infantry and 8,000 cavalry",
            source: "Caesar, Gallic War 7.76",
            level: "literary",
            assessment:
              "Rejected by essentially all modern scholarship. Caesar was writing a political self-justification for circulation at Rome and had every incentive to inflate the odds. A relief force in the tens of thousands is the usual estimate.",
          },
        ],
      },
    ],
    outcome:
      "Roman victory. Vercingetorix surrendered and organised resistance in Gaul collapsed.",
    summary: [
      "After failing to take Gergovia, Caesar pursued Vercingetorix to the hilltop oppidum of Alesia and, rather than assaulting it, began to build.",
      "The Romans constructed a line of circumvallation facing inward to contain the besieged, and then a second line of contravallation facing outward to hold off the relief army that Vercingetorix had summoned before the encirclement closed. Caesar describes ditches, ramparts, towers, and belts of stakes, pits and iron caltrops between them.",
      "The relief army arrived and attacked the outer line while the besieged attacked the inner line simultaneously. The Romans fought in both directions for several days.",
      "At the crisis, at a weak point in the north-west, Caesar committed his reserves and led cavalry around to take the attackers in the rear. The relief army broke and dispersed. Vercingetorix surrendered the following day.",
    ],
    tactics:
      "Alesia is the outstanding ancient demonstration that Roman military power was primarily an engineering capability. The legions won by digging: two concentric fortified lines, reportedly some fifteen and twenty kilometres in circumference, built in weeks by an army under observation by the enemy. The battle that followed was fought on ground the Romans had manufactured.",
    consequence:
      "Gallic resistance ended as a coordinated effort. Vercingetorix was held for six years and displayed in Caesar's triumph before being executed. The conquest of Gaul gave Caesar the army, the wealth and the reputation with which he entered the civil war three years later.",
    primarySources: [
      P("The Gallic War", "7.68-90", "Caesar's own account, written for publication at Rome. The only substantial narrative, and a partisan one by the victorious commander.", "Julius Caesar"),
      P("Roman History", "40.33-41", "A much later account largely dependent on Caesar.", "Cassius Dio"),
    ],
    archaeology: {
      level: "documented",
      note: "Excavation at Alise-Sainte-Reine, beginning under Napoleon III and continued by Franco-German campaigns in the 1990s, has recovered ditches, ramparts and defensive obstacles matching Caesar's technical description closely, together with weapons and coins of the period. The correspondence between an ancient commander's written specification and the excavated ground is unusually close.",
    },
    disputes: [
      {
        question: "Is Alise-Sainte-Reine the site?",
        positions:
          "The excavated siege works make it much the strongest candidate and most specialists accept it. A minority have argued for other locations on topographical grounds. The material evidence is the reason the mainstream position is now firm.",
        level: "probable",
      },
      {
        question: "How large was the relief army?",
        positions:
          "Caesar's quarter of a million is not defended by anyone. What replaces it is guesswork constrained by the size of the ground and by what Gaul could mobilise and feed.",
        level: "disputed",
      },
    ],
    relatedBattles: ["pharsalus", "teutoburg-forest"],
    topicRefs: ["siege-warfare", "fortifications", "roman-engineering", "legion", "roman-army", "logistics"],
    figureRefs: ["julius-caesar", "vercingetorix"],
  },
  {
    slug: "carrhae",
    name: "Carrhae",
    date: "53 BCE",
    dateLevel: "probable",
    war: "Crassus's Parthian campaign",
    standfirst:
      "A Roman army was destroyed in open desert by Parthian horse archers and cataphracts, in the clearest ancient demonstration that heavy infantry has no answer to mobile missile cavalry.",
    civilizations: ["roman-republic", "rome"],
    location: {
      ancient: "Near Carrhae, in northern Mesopotamia",
      modern: "Near Harran, Şanlıurfa province, Turkey",
      level: "probable",
      note: "The town is securely identified; the battlefield itself has not been located.",
    },
    sides: [
      {
        name: "Rome",
        commanders: [
          { name: "Marcus Licinius Crassus" },
          { name: "Publius Crassus, his son" },
        ],
        forces: [
          {
            label: "Roman legions and auxiliaries",
            figure: "Seven legions with cavalry and light troops, about 40,000",
            source: "Plutarch, Crassus 20",
            level: "probable",
            assessment: "Consistent across the sources and of a plausible order.",
          },
        ],
        casualties: [
          {
            label: "Roman dead and captured",
            figure: "About 20,000 dead and 10,000 taken prisoner",
            source: "Plutarch, Crassus 31",
            level: "disputed",
            assessment:
              "Plutarch writes a century and a half later. The scale of the disaster is corroborated by its political consequences and by the loss of the legionary standards, which Rome remembered for a generation.",
          },
        ],
      },
      {
        name: "The Parthian empire",
        commanders: [{ name: "Surena" }],
        forces: [
          {
            label: "Parthian troops",
            figure: "About 1,000 cataphracts and 9,000 horse archers",
            source: "Plutarch, Crassus 21",
            level: "probable",
            assessment:
              "A small force, and the sources agree on that. The disparity is the point: 10,000 cavalry destroyed an army four times its size.",
          },
        ],
      },
    ],
    outcome:
      "Parthian victory. Crassus was killed, the army destroyed and the legionary standards captured.",
    summary: [
      "Crassus invaded Parthia without a formal casus belli, seeking the military reputation his colleagues Caesar and Pompey possessed and he did not. He crossed the Euphrates and advanced into open country on the advice of a local guide the sources present as treacherous.",
      "Surena engaged with horse archers who shot and withdrew without closing. The Romans formed a square. Missiles could not be answered: the legionary had no ranged weapon of comparable reach and could not catch the archers.",
      "The Romans expected the Parthians to exhaust their arrows. Surena had organised a camel train carrying reserve ammunition, which meant the shooting did not stop.",
      "Publius Crassus led a detachment out to force an engagement and was cut off and killed; his head was displayed to his father. The army broke up in a night withdrawal. Crassus was killed at a parley.",
    ],
    tactics:
      "Carrhae is the classic statement of a tactical problem rather than a tactical solution. Heavy infantry in close order is nearly invulnerable to cavalry that charges it and nearly helpless against cavalry that will not. The Roman failures were compounding: no adequate cavalry screen, no missile troops in proportion, open ground of the enemy's choosing, and a logistical assumption about enemy ammunition that was simply wrong. Later Roman armies in the east carried more archers and more cavalry as a direct result.",
    consequence:
      "The eastern frontier was destabilised for a generation. Politically the death of Crassus removed the third member of the arrangement holding Caesar and Pompey in balance, and the drift to civil war accelerated. The captured standards became a national grievance; their return, negotiated by Augustus in 20 BCE, was celebrated as a victory on the coinage and is depicted on the cuirass of the Prima Porta statue.",
    primarySources: [
      P("Life of Crassus", "16-33", "The fullest narrative, written about a century and a half later.", "Plutarch"),
      P("Roman History", "40.12-27", "An independent later account.", "Cassius Dio"),
      P("Res Gestae Divi Augusti", "29", "Augustus's own record of the recovery of the standards, inscribed publicly across the empire — documentary evidence for the political afterlife of the defeat.", "Augustus"),
    ],
    disputes: [
      {
        question: "Was Crassus betrayed by his guide?",
        positions:
          "The sources present the Osrhoenian chieftain Ariamnes as a Parthian agent who led the Romans into open country. The story is convenient: it transfers responsibility from a Roman commander to a foreign traitor. Whether it is true is not determinable.",
        level: "disputed",
      },
      {
        question: "Was molten gold poured into Crassus's mouth?",
        positions:
          "The story appears in Cassius Dio and is absent from Plutarch's account of the death. It is a moralising tale about the greed of the richest man in Rome and should be read as such rather than as a report.",
        level: "literary",
      },
    ],
    relatedBattles: ["cannae", "teutoburg-forest", "adrianople"],
    topicRefs: ["persian-army", "roman-army", "legion", "battle-tactics", "logistics", "military-supply"],
    figureRefs: ["julius-caesar", "augustus"],
  },
  {
    slug: "pharsalus",
    name: "Pharsalus",
    date: "48 BCE",
    dateLevel: "documented",
    war: "Caesar's civil war",
    standfirst:
      "Caesar defeated a larger Pompeian army in Thessaly with a fourth line held back specifically to defeat the cavalry manoeuvre he had predicted, and effectively ended the Republic.",
    civilizations: ["roman-republic", "rome"],
    location: {
      ancient: "The plain near Pharsalus in Thessaly",
      modern: "Near Farsala, Thessaly, Greece",
      level: "disputed",
      note: "The region is certain; which bank of the Enipeus the battle was fought on has been argued since the nineteenth century and is not resolved.",
    },
    sides: [
      {
        name: "Caesar",
        commanders: [
          { name: "Gaius Julius Caesar", slug: "julius-caesar" },
          { name: "Mark Antony, commanding the left", slug: "mark-antony" },
        ],
        forces: [
          {
            label: "Caesarian troops",
            figure: "22,000 infantry and 1,000 cavalry",
            source: "Caesar, Civil War 3.89",
            level: "disputed",
            assessment:
              "Caesar's own figure for his own army, in a work written to justify his position. Even a partisan account has reason to be roughly accurate about the size of a force many of its readers had served in, but the disparity he reports flatters him.",
          },
        ],
      },
      {
        name: "Pompey and the senatorial cause",
        commanders: [
          { name: "Gnaeus Pompeius Magnus", slug: "pompey" },
          { name: "Titus Labienus, commanding the cavalry" },
        ],
        forces: [
          {
            label: "Pompeian troops",
            figure: "45,000 infantry and 7,000 cavalry",
            source: "Caesar, Civil War 3.88",
            level: "disputed",
            assessment:
              "Again Caesar's figure for his defeated enemy. The cavalry disparity is the militarily decisive element and is corroborated by the tactics both sides adopted.",
          },
        ],
      },
    ],
    outcome:
      "Caesarian victory. Pompey fled to Egypt and was murdered on arrival.",
    summary: [
      "Pompey held the stronger position and the larger army and had been avoiding a decisive engagement, a strategy that was working and that his senatorial allies would not tolerate.",
      "Pompey's plan was to use his cavalry superiority to sweep Caesar's small cavalry from the field and envelop the Caesarian right.",
      "Caesar, anticipating this, withdrew cohorts from the third line of his legions and formed a concealed fourth line at an angle behind his right, instructing them to use their javelins as thrusting weapons against the faces of the cavalry rather than throwing them.",
      "The Pompeian cavalry charged, drove off Caesar's horse, and rode into the hidden fourth line. It broke. The exposed Pompeian left was then rolled up. Pompey left the field for his camp and then abandoned it.",
    ],
    tactics:
      "The fourth line is the most-cited tactical reserve in ancient warfare, and its interest is that it was designed against a specific predicted manoeuvre rather than held as a general reserve. Caesar states that he told the cohorts what to expect and what to do. The instruction to thrust at the riders' faces is a detail that reads as authentic and is also exactly the kind of vivid particular a self-justifying memoir supplies.",
    consequence:
      "The senatorial cause lost its army and, within weeks, its leader. Resistance continued in Africa and Spain until 45 BCE, but the Republic as a functioning system of competing aristocratic power did not recover. Caesar was appointed dictator and was assassinated four years later.",
    primarySources: [
      P("The Civil War", "3.82-99", "Caesar's own account: the principal source, and written by the victor to justify himself to a Roman readership.", "Julius Caesar"),
      P("Life of Pompey", "68-73", "Preserves a tradition sympathetic to Pompey.", "Plutarch"),
      P("The Civil Wars", "2.65-82", "A later Greek account drawing on lost sources including Asinius Pollio, who was present.", "Appian"),
    ],
    disputes: [
      {
        question: "How reliable are the troop numbers?",
        positions:
          "They come almost entirely from Caesar. Appian and Plutarch give variants that may derive from Asinius Pollio, an eyewitness on Caesar's side whose history is lost. The two-to-one disparity is probably exaggerated and probably real in direction.",
        level: "disputed",
      },
      {
        question: "Which side of the Enipeus?",
        positions:
          "The topographical indications in Caesar do not fit the modern landscape unambiguously, and reconstructions place the battle on either bank. Unresolved.",
        level: "disputed",
      },
    ],
    relatedBattles: ["alesia", "actium"],
    topicRefs: ["legion", "roman-army", "battle-tactics", "command-structure", "military-discipline"],
    figureRefs: ["julius-caesar", "pompey", "mark-antony"],
  },
  {
    slug: "actium",
    name: "Actium",
    date: "31 BCE",
    dateLevel: "documented",
    war: "The final war of the Roman Republic",
    standfirst:
      "A naval battle off western Greece that ended the civil wars, delivered the Roman world to Octavian, and was immediately rewritten by the winner.",
    civilizations: ["roman-republic", "rome", "principate", "ptolemaic-egypt"],
    location: {
      ancient: "Off the promontory of Actium, at the mouth of the Ambracian Gulf",
      modern: "Near Preveza, Epirus, Greece",
      level: "documented",
      note: "The site is secure. Octavian founded the city of Nicopolis nearby to commemorate the victory and built a monument decorated with the rams of captured ships; its foundations survive with the sockets for the rams.",
    },
    sides: [
      {
        name: "Octavian",
        commanders: [
          { name: "Marcus Vipsanius Agrippa, commanding at sea" },
          { name: "Gaius Octavius", slug: "augustus" },
        ],
        forces: [
          {
            label: "Warships",
            figure: "About 400, of lighter classes",
            source: "Modern reconstruction from Plutarch and Cassius Dio",
            level: "probable",
            assessment:
              "The ancient figures vary. What is agreed is that Octavian's fleet was more numerous and composed of lighter, handier ships.",
          },
        ],
      },
      {
        name: "Antony and Cleopatra",
        commanders: [
          { name: "Marcus Antonius", slug: "mark-antony" },
          { name: "Cleopatra VII" },
        ],
        forces: [
          {
            label: "Warships",
            figure: "About 230, including heavy vessels, with 60 Egyptian ships in reserve",
            source: "Plutarch, Antony 61-64; Cassius Dio 50",
            level: "disputed",
            assessment:
              "Antony is reported to have burned a substantial part of his fleet before the battle for lack of rowers, which if true means the effective disparity was greater than the nominal one. Disease and desertion in his camp are attested across the sources.",
          },
        ],
      },
    ],
    outcome:
      "Decisive victory for Octavian. Antony and Cleopatra escaped to Egypt, where both died the following year.",
    summary: [
      "Antony's fleet and army were blockaded in the Ambracian Gulf through the summer, losing men to disease, desertion and hunger. The battle was fought to break out rather than to win command of the sea.",
      "The fleets engaged outside the gulf. Antony's heavier ships fought defensively; Agrippa's lighter squadrons worked around the flanks.",
      "Cleopatra's squadron, held in reserve with the treasure, made sail and broke out to the open sea. Antony transferred to a lighter ship and followed.",
      "The remaining fleet fought on and then surrendered. Antony's army, left without its commander, went over to Octavian within days.",
    ],
    tactics:
      "Actium is a battle whose military content is thin and whose consequences are enormous, which is why the sources fill it out. The essential facts are a blockade, an attempted breakout, a partial success and the collapse of an army whose commander had left. Whether the breakout was the plan from the start or an abandonment mid-battle is precisely what the propaganda was designed to settle.",
    consequence:
      "Octavian took Egypt the following year, ending the Ptolemaic kingdom and adding its revenues to his personal control. With no rival left he began the constitutional settlement that produced the Principate. Actium became the founding event of the new order, commemorated in poetry, on coins, in a new city and in a monument built from the beaks of the captured ships.",
    primarySources: [
      P("Life of Antony", "60-68", "The fullest narrative, drawing on sources including a physician's eyewitness testimony transmitted through Plutarch's own family.", "Plutarch"),
      P("Roman History", "50.11-35", "A later account with the fullest technical detail.", "Cassius Dio"),
      P("Aeneid", "8.671-713", "The battle depicted on the shield of Aeneas — not a source for events, but the clearest surviving statement of how the victory was to be understood.", "Virgil"),
    ],
    archaeology: {
      level: "documented",
      note: "The victory monument above Nicopolis survives in part, including the retaining wall with the cuttings in which the bronze rams of captured warships were displayed. The sockets allow the size of the captured vessels to be estimated, which is rare physical evidence for ancient warship classes.",
    },
    disputes: [
      {
        question: "Was the breakout the plan, or a flight?",
        positions:
          "The Augustan tradition presents Antony as abandoning his fleet to follow Cleopatra, and that reading dominates because the winner's version became the official one. The alternative, that a breakout with the treasury was the intended outcome of a battle fought to escape a blockade, is at least as consistent with the dispositions. The sources are not neutral and cannot be made so.",
        level: "disputed",
      },
    ],
    reception:
      "Actium is the ancient battle most thoroughly shaped by the victor's propaganda. Cleopatra was recast as a foreign menace so that a civil war between Roman commanders could be presented as a war against Egypt; Virgil, Horace and Propertius all wrote to that frame. Readers meet the battle through Augustan literature before they meet any account of the fighting.",
    relatedBattles: ["pharsalus", "salamis"],
    topicRefs: ["roman-navy", "naval-warfare", "trireme", "strategy"],
    figureRefs: ["augustus", "mark-antony"],
  },

  // ─── Imperial Rome ───────────────────────────────────────────────────
  {
    slug: "teutoburg-forest",
    name: "The Teutoburg Forest",
    date: "9 CE",
    dateLevel: "documented",
    war: "The Roman campaigns in Germania",
    standfirst:
      "Three legions were destroyed in a running ambush over several days, and the Roman frontier settled on the Rhine rather than the Elbe.",
    civilizations: ["principate", "rome"],
    location: {
      ancient: "The saltus Teutoburgiensis",
      modern: "Probably Kalkriese, near Osnabrück, Lower Saxony, Germany",
      level: "probable",
      note: "The identification with Kalkriese rests on a large and coherent body of excavated military material at a defile matching the tactical description. It is accepted by most specialists and is an identification rather than a certainty.",
    },
    sides: [
      {
        name: "Rome",
        commanders: [{ name: "Publius Quinctilius Varus" }],
        forces: [
          {
            label: "Roman troops",
            figure: "Legions XVII, XVIII and XIX with auxiliary cohorts and cavalry",
            source: "Velleius Paterculus 2.117; Cassius Dio 56.18",
            level: "documented",
            assessment:
              "The identity of the three legions is secure and is confirmed negatively: those numbers were never used again in the Roman army, an administrative silence that is itself evidence.",
          },
          {
            label: "Roman strength",
            figure: "Commonly estimated at 15,000 to 20,000 including non-combatants",
            source: "Modern reconstruction",
            level: "probable",
            assessment:
              "No ancient source gives a total. The estimate follows from three legions at campaign strength plus attached units and a substantial baggage train with families.",
          },
        ],
      },
      {
        name: "The Germanic coalition",
        commanders: [{ name: "Arminius of the Cherusci", slug: "arminius" }],
        forces: [
          {
            label: "Germanic warriors",
            figure: "Not stated by any source",
            source: "No ancient figure survives",
            level: "unknown",
            assessment:
              "Modern guesses range from a few thousand to twenty thousand. There is no basis for choosing among them, and this platform does not invent one.",
          },
        ],
      },
    ],
    outcome:
      "Complete Germanic victory. The Roman force was annihilated and Varus took his own life.",
    summary: [
      "Arminius, a Cheruscan noble who held Roman citizenship and equestrian rank and had commanded auxiliaries in Roman service, reported a rising in a distant district and offered to guide the army to it.",
      "Varus moved his column, encumbered with baggage and dependants, off the prepared routes into broken, wooded and waterlogged country where the formation was strung out and could not deploy.",
      "The attack came in stages over several days, on ground where the Romans could not form a line. At Kalkriese the excavated evidence indicates a defile narrowed by a constructed turf wall from which attackers struck the flank of a column funnelled between bog and hillside.",
      "The army was destroyed. Tacitus describes the visit of Germanicus's troops to the site six years later, finding bleached bones in heaps, weapons on tree trunks and skulls fixed to trunks.",
    ],
    tactics:
      "Not a battle in the sense the other entries here describe. It was a multi-day ambush that denied the Roman army the two things its system depended on — the ability to form a line and the ability to fortify a camp on chosen ground. Its precondition was intelligence: the commander of the ambush had served in the army he destroyed and knew its march discipline, its assumptions and its route.",
    consequence:
      "Roman policy east of the Rhine was abandoned. Punitive expeditions under Germanicus recovered two of the three lost eagles and devastated Germanic territory, but no permanent province was established, and the Rhine became the frontier for four centuries. Suetonius reports that Augustus struck his head against a door calling on Varus to give him back his legions.",
    primarySources: [
      P("Roman History", "2.117-119", "A contemporary account by an author who had served in Germany, and the closest source in time.", "Velleius Paterculus"),
      P("Annals", "1.60-62", "The description of Germanicus's visit to the battlefield six years later.", "Tacitus"),
      P("Roman History", "56.18-24", "The fullest narrative, written two centuries later.", "Cassius Dio"),
      P("Life of Augustus", "23", "The report of Augustus's reaction.", "Suetonius"),
    ],
    archaeology: {
      level: "documented",
      note: "Kalkriese has produced thousands of items of Roman military equipment, coins with a terminal date consistent with 9 CE, bone deposits including pits of remains apparently gathered and buried some years after death, and a constructed turf wall along a defile. The assemblage is unambiguously a Roman military catastrophe of the right period; that it is specifically the Varus disaster is an inference, though a strong one.",
    },
    disputes: [
      {
        question: "Is Kalkriese the Varus battlefield?",
        positions:
          "The material is Roman, military, of the right date and indicates a defeat. Some specialists argue it could represent a different engagement of the Germanicus campaigns rather than 9 CE. The majority view accepts the identification.",
        level: "probable",
      },
    ],
    reception:
      "From the sixteenth century Arminius was adopted as a German national symbol under the name Hermann, and the Hermannsdenkmal was erected in the nineteenth century as a monument to national unification. That afterlife is a fact about modern Germany, not about 9 CE, and the platform treats it as reception.",
    relatedBattles: ["cannae", "carrhae", "adrianople"],
    topicRefs: ["legion", "roman-army", "roman-camps", "logistics", "recruitment", "military-discipline"],
    figureRefs: ["augustus", "arminius"],
  },
  {
    slug: "adrianople",
    name: "Adrianople",
    date: "378 CE",
    dateLevel: "documented",
    war: "The Gothic War of 376-382",
    standfirst:
      "An eastern Roman field army was destroyed and an emperor killed by a Gothic force outside Adrianople, in a defeat a contemporary historian called the heaviest since Cannae.",
    civilizations: ["late-empire", "rome"],
    location: {
      ancient: "Outside Adrianople in Thrace",
      modern: "Near Edirne, Turkey",
      level: "probable",
      note: "The city is certain; the battlefield has not been located.",
    },
    sides: [
      {
        name: "The eastern Roman empire",
        commanders: [{ name: "The emperor Valens" }],
        forces: [
          {
            label: "Roman troops",
            figure: "Commonly estimated at 15,000 to 30,000",
            source: "Modern reconstruction; Ammianus gives no total",
            level: "disputed",
            assessment:
              "Ammianus, the contemporary source, declines to give numbers. Estimates rest on late-Roman establishment strengths, which are themselves debated.",
          },
        ],
        casualties: [
          {
            label: "Roman dead",
            figure: "Two-thirds of the army",
            source: "Ammianus Marcellinus 31.13",
            level: "probable",
            assessment:
              "A proportion rather than a count, from a contemporary military man. Ammianus explicitly compares the scale to Cannae.",
          },
        ],
      },
      {
        name: "The Gothic coalition",
        commanders: [
          { name: "Fritigern" },
          { name: "Alatheus and Saphrax, commanding the cavalry" },
        ],
        forces: [
          {
            label: "Gothic warriors",
            figure: "No reliable figure survives",
            source: "Not given",
            level: "unknown",
            assessment:
              "Ammianus gives no total. Estimates in the modern literature are conjectural.",
          },
        ],
      },
    ],
    outcome:
      "Gothic victory. Valens was killed and his body never recovered.",
    summary: [
      "Gothic groups admitted across the Danube in 376 under agreement were mistreated and exploited by Roman officials, and revolted. Two years of campaigning followed.",
      "Valens advanced from Adrianople against Fritigern's wagon laager without waiting for the western army under Gratian, which was days away. Ammianus attributes the decision to a wish not to share the credit.",
      "The Roman troops arrived after a long march in summer heat, without food, and were held in position while negotiations were attempted. Fires lit by the Goths added smoke and heat.",
      "Fighting began before the negotiations concluded, and the absent Gothic cavalry returned and struck the Roman flank. The Roman line was compressed until, in Ammianus's description, men could not raise their weapons or draw their swords.",
    ],
    tactics:
      "The failures were operational rather than tactical: attacking without the converging force, committing exhausted troops without reconnaissance of the enemy's absent cavalry, and beginning an engagement during a parley. The compression of the Roman infantry into a mass too dense to fight is the same mechanism recorded at Cannae, and Ammianus's comparison is apt.",
    consequence:
      "The eastern field army had to be rebuilt. Theodosius settled the Goths inside the empire in 382 on terms allowing them to serve under their own leaders — a precedent with long consequences. The battle is often described as the moment cavalry displaced infantry as the dominant arm; that reading is not supported by the evidence and is treated below as a dispute.",
    primarySources: [
      P("Res Gestae", "31.12-13", "A contemporary account by a former staff officer, and one of the best-informed battle narratives in ancient literature.", "Ammianus Marcellinus"),
    ],
    disputes: [
      {
        question: "Did Adrianople mark the end of infantry dominance?",
        positions:
          "A view associated with older military history, notably Charles Oman, held that Gothic cavalry inaugurated a thousand years of mounted supremacy. Modern scholarship rejects it: the Gothic force fought largely on foot, late Roman armies remained infantry-based for centuries, and the defeat is better explained by operational error than by a change in the balance of arms.",
        level: "disputed",
      },
    ],
    relatedBattles: ["cannae", "teutoburg-forest"],
    topicRefs: ["roman-army", "legion", "command-structure", "logistics", "recruitment"],
    figureRefs: [],
  },
];

const BY_SLUG = new Map(BATTLES.map((b) => [b.slug, b]));

export function getBattle(slug: string): Battle | undefined {
  return BY_SLUG.get(slug);
}

export function battlesForCivilization(civ: string): Battle[] {
  return BATTLES.filter((b) => b.civilizations.includes(civ));
}

export function battlesForTopic(topic: string): Battle[] {
  return BATTLES.filter((b) => b.topicRefs.includes(topic));
}

/**
 * Chronological ordering. Dates are stored as display strings because
 * they carry qualifications; this parses the leading year and the era
 * for sorting only.
 */
export function battlesChronological(): Battle[] {
  const year = (d: string): number => {
    const m = d.match(/(\d+)\s*(BCE|CE)/);
    if (!m) return 0;
    const n = Number(m[1]);
    return m[2] === "BCE" ? -n : n;
  };
  return [...BATTLES].sort((a, b) => year(a.date) - year(b.date));
}
