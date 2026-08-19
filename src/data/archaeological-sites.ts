/**
 * Archaeological sites registry.
 *
 * The missing rung. The platform could already say what a civilization
 * was (`/civilizations`), what a city was (`/cities`), what a building
 * type was (`/architecture`), what an object is and who holds it
 * (`/objects`, `/museums`). It could not say anything about the excavated
 * place itself: who dug it, when, what they found, what they got wrong,
 * and what the ground has since been made to say.
 *
 * That is what this layer is for, and it is deliberately narrow. A site
 * page is about **evidence recovery**. It is not a second city page and
 * not a second monument page.
 *
 * ─── The boundary with /cities ──────────────────────────────────────
 *
 * A city slug may not be a site slug. The gate enforces it, so
 * `/archaeology/pompeii` cannot be created beside `/cities/pompeii`, and
 * Delphi, Olympia, Persepolis, Troy and the rest stay where they are.
 *
 * Three sites here sit *inside* cities the platform already covers — the
 * Acropolis and the Agora inside Athens, the Forum and the Palatine
 * inside Rome. Those are legitimate separate subjects (an excavation
 * history of the Agora is not an account of Athens), and the risk of
 * cannibalisation is handled the way the cities layer handled it: the
 * section headings are declared here rather than in the template, the
 * gate checks them against the city headings, and any site with a
 * `parentCitySlug` renders a disambiguation line pointing at the city.
 *
 * ─── The boundary with /architecture ────────────────────────────────
 *
 * A site page names its principal structures and links each to the
 * building *type* that explains it. It does not attempt to be the page
 * for any single building.
 *
 * ─── Coordinates ────────────────────────────────────────────────────
 *
 * A coordinate pair is a precision claim, and most of the harm it does is
 * invisible: "Nineveh, 36.36 N 43.15 E" reads as a fact about a city that
 * covered seven hundred hectares. So coordinates here are optional, must
 * be given as a pair, and must name the thing they point at — the Lion
 * Gate, the tomb chamber, the ziggurat's north-east stair. Where a site's
 * extent is disputed or its centre undefined, the fields are simply left
 * out and the geography is described in prose instead.
 *
 * ─── Dates ──────────────────────────────────────────────────────────
 *
 * Ancient chronology is not a job for `Date`. It cannot represent 1450
 * BCE, it silently invents a year zero, and it drags a proleptic Gregorian
 * calendar into places it does not belong.
 *
 * So a date here is a signed integer year — negative for BCE, positive
 * for CE, **no zero** — carried alongside the precision it actually has
 * and the string that is actually rendered. `formatYear` is the only
 * conversion, it is pure, and the gate rejects a display string that
 * disagrees with its own year.
 *
 * The precision field is the point. "1550 BCE" for the Mycenae shaft
 * graves and "79 CE" for Herculaneum are both dates, and they are not the
 * same kind of thing at all.
 */

import type { EvidenceLevel, SourceReference } from "./evidence";

// ──────────────────────────────────────────────────────────────────────
// Chronology
// ──────────────────────────────────────────────────────────────────────

export type DatePrecision =
  /** Fixed by a document, an eponym, an eclipse or a dated event. */
  | "exact"
  /** "c." — a best estimate, usually to the nearest decade or half-century. */
  | "approximate"
  /** Known only to a century. */
  | "century"
  /** One end of a span whose other end is separately given. */
  | "range-endpoint"
  /** Given by ancient tradition rather than by evidence. */
  | "traditional"
  /** Specialists actively disagree; the dispute is stated on the page. */
  | "disputed"
  /** Not recoverable. */
  | "unknown";

export const DATE_PRECISION_LABEL: Record<DatePrecision, string> = {
  exact: "fixed",
  approximate: "approximate",
  century: "to the century",
  "range-endpoint": "range endpoint",
  traditional: "traditional",
  disputed: "disputed",
  unknown: "unknown",
};

export interface HistoricalDate {
  /**
   * Signed year. Negative is BCE, positive is CE, and zero is invalid —
   * 1 BCE is followed by 1 CE. The validator rejects a zero.
   */
  year: number;
  precision: DatePrecision;
  /**
   * The string the page renders. Held rather than derived, because "the
   * eruption of 79 CE", "c. 1450 BCE" and "the 520s BCE" are editorial
   * decisions. The gate checks it against `year`.
   */
  display: string;
}

/**
 * Signed year to era string. Pure, no `Date`, no locale.
 * `formatYear(-480)` → "480 BCE"; `formatYear(79)` → "79 CE".
 */
export function formatYear(year: number): string {
  if (!Number.isInteger(year) || year === 0) return "invalid year";
  return year < 0 ? `${Math.abs(year)} BCE` : `${year} CE`;
}

/** Ordering key for chronology sorts. Signed years already sort correctly. */
export function chronologicalKey(d: HistoricalDate): number {
  return d.year;
}

export interface SitePhase {
  label: string;
  /** Rendered span, e.g. "c. 1700–1450 BCE". */
  display: string;
  level: EvidenceLevel;
  note: string;
}

export interface SiteChronology {
  /** Earliest occupation or use this page records. */
  start: HistoricalDate;
  /** Latest. Omitted where the site has never gone out of use. */
  end?: HistoricalDate;
  /** Confidence in the span as a whole. */
  status: EvidenceLevel;
  /** One-line rendered span for the page header. */
  display: string;
  phases: SitePhase[];
}

// ──────────────────────────────────────────────────────────────────────
// Geography
// ──────────────────────────────────────────────────────────────────────

export interface SiteGeography {
  modernCountry: string;
  /** The ancient region, in ancient terms. */
  ancientRegion: string;
  /** Decimal degrees, north positive. Given only as a pair. */
  latitude?: number;
  /** Decimal degrees, east positive. Given only as a pair. */
  longitude?: number;
  /**
   * Exactly what the coordinate pair refers to. Required whenever
   * coordinates are present, because "the site" is not a point.
   */
  coordinateSubject?: string;
  /** Terrain, water, routes, and why anyone was here. */
  setting: string;
}

// ──────────────────────────────────────────────────────────────────────
// The site record
// ──────────────────────────────────────────────────────────────────────

export type SiteKind =
  | "citadel"
  | "sanctuary"
  | "civic-centre"
  | "necropolis"
  | "settlement"
  | "residence"
  | "rock-monument";

export const SITE_KIND_LABEL: Record<SiteKind, string> = {
  citadel: "Citadel and palace",
  sanctuary: "Sanctuary",
  "civic-centre": "Civic centre",
  necropolis: "Necropolis and royal tombs",
  settlement: "Settlement",
  residence: "Residence",
  "rock-monument": "Rock monument and inscription",
};

export type SiteRegion = "aegean" | "roman" | "egyptian" | "near-eastern";

export const SITE_REGION_LABEL: Record<SiteRegion, string> = {
  aegean: "The Aegean and the Greek world",
  roman: "The Roman world",
  egyptian: "Egypt",
  "near-eastern": "Mesopotamia and Iran",
};

export const SITE_REGION_ORDER: ReadonlyArray<SiteRegion> = [
  "aegean",
  "roman",
  "egyptian",
  "near-eastern",
];

export interface Excavation {
  /** Rendered span, e.g. "1928–1937". */
  period: string;
  /** Excavator, mission or institution. */
  by: string;
  level: EvidenceLevel;
  note: string;
}

export interface SiteStructure {
  name: string;
  /** Rendered date. */
  date: string;
  /** How we know what it looked like, not whether it existed. */
  level: EvidenceLevel;
  note: string;
  /** Slug into src/data/architecture.ts — the type that explains it. */
  architectureSlug?: string;
  /** Slug into src/data/archive-images.ts. */
  imageSlug?: string;
}

export interface SiteFind {
  name: string;
  what: string;
  level: EvidenceLevel;
  /** Slug into src/data/object-provenance.ts, where a record exists. */
  objectSlug?: string;
  /** Slug into src/data/museums.ts, where the holder is in the registry. */
  museumSlug?: string;
  /** Holder named in prose where it is not in the museum registry. */
  heldAt?: string;
}

export interface ArchaeologicalSite {
  slug: string;
  name: string;
  /** Ancient or alternative names, where they differ from the heading. */
  alsoKnownAs?: string[];
  kind: SiteKind;
  region: SiteRegion;
  standfirst: string;
  description: string;
  geography: SiteGeography;
  chronology: SiteChronology;
  /**
   * The city this site sits inside, where the platform covers it. Renders
   * a disambiguation line; the gate checks the slug resolves.
   */
  parentCitySlug?: string;
  /** Slugs into content/civilizations. */
  civilizations: string[];
  /** What is actually visible on the ground now. */
  whatSurvives: string[];
  excavations: Excavation[];
  structures: SiteStructure[];
  finds: SiteFind[];
  /** How the site has been read, and how that reading has changed. */
  interpretation: string[];
  disputes: Array<{ question: string; positions: string; level: EvidenceLevel }>;
  /**
   * Ancient authors on the place. Empty is permitted and meaningful —
   * Deir el-Medina has no ancient description — but the gate requires
   * `noAncientTestimony` to be set rather than the field silently empty.
   */
  primarySources: SourceReference[];
  /** Set when antiquity says nothing about the site, with the reason. */
  noAncientTestimony?: string;
  /** Slugs into src/data/museums.ts. */
  museumSlugs: string[];
  /** Slugs into src/data/object-provenance.ts. */
  objectSlugs: string[];
  /** Slugs into src/data/architecture.ts. */
  architectureRefs: string[];
  /** Slugs into src/data/institutions.ts. */
  institutionRefs: string[];
  /** Slugs into src/data/religion.ts. */
  religionRefs: string[];
  /** Slugs into src/data/warfare.ts. */
  warfareRefs: string[];
  /** Slugs into src/data/battles.ts. */
  battleRefs: string[];
  /** Slugs into content/philosophers. */
  figureRefs: string[];
  /** Slugs into content/themes. */
  themeRefs: string[];
  /** Slugs into content/books. */
  bookRefs: string[];
  /** Slugs into src/data/cities.ts — cities other than the parent. */
  cityRefs: string[];
  /** Slugs into src/data/maps.ts. */
  mapSlugs: string[];
  /** Other sites. */
  relatedSites: string[];
  /** Slug into src/data/archive-images.ts. */
  imageSlug?: string;
  gallerySlugs?: string[];
}

/**
 * Section headings the site template renders. Declared here rather than
 * in the component so the gate can check them against the city headings
 * and fail on a collision — three of these sites sit inside cities that
 * already have their own pages.
 */
export const SITE_SECTION_HEADINGS: ReadonlyArray<string> = [
  "Where the site is",
  "What survives",
  "Occupation and chronology",
  "History of excavation",
  "Principal structures",
  "Finds and where they went",
  "Ancient testimony",
  "How the site has been interpreted",
  "Unresolved",
];

const S = (
  work: string,
  locus: string,
  summary: string,
  author?: string,
): SourceReference => ({ work, locus, summary, author });

export const ARCHAEOLOGICAL_SITES: ReadonlyArray<ArchaeologicalSite> = [
  // ─── The Aegean and the Greek world ──────────────────────────────────
  {
    slug: "mycenae",
    name: "Mycenae",
    alsoKnownAs: ["Mykenai"],
    kind: "citadel",
    region: "aegean",
    standfirst:
      "The citadel that gave a civilization its name, and the excavation that put a Bronze Age gold mask three centuries out of reach of the war it was named for.",
    description:
      "Mycenae — the Lion Gate, the shaft graves, Schliemann's 1876 excavation, the Linear B evidence, and why the Mask of Agamemnon cannot be Agamemnon's.",
    geography: {
      modernCountry: "Greece",
      ancientRegion: "The Argolid",
      latitude: 37.731,
      longitude: 22.756,
      coordinateSubject: "The Lion Gate",
      setting:
        "A low, steep-sided ridge wedged between the hills of Profitis Ilias and Sara, at the head of the Argive plain. The position is not defensive theatre: it commands the plain below and the pass north through the mountains towards Corinth and the isthmus, which is the land route between the Peloponnese and central Greece. Water came from a spring outside the walls, reached late in the citadel's life by an underground stair cut through the rock — a siege provision.",
    },
    chronology: {
      start: { year: -1600, precision: "approximate", display: "c. 1600 BCE" },
      end: { year: -468, precision: "approximate", display: "468 BCE" },
      status: "probable",
      display: "c. 1600 BCE – 468 BCE, with later reoccupation",
      phases: [
        {
          label: "Shaft-grave period",
          display: "c. 1600–1500 BCE",
          level: "documented",
          note: "The two grave circles. Extraordinary quantities of gold, weapons and imported material buried with a small number of people, at a moment when the settlement itself was not yet remarkable.",
        },
        {
          label: "Palatial Mycenae",
          display: "c. 1350–1200 BCE",
          level: "documented",
          note: "The megaron, the cyclopean circuit, the Lion Gate and the great tholos tombs. This is the period the Linear B administration belongs to.",
        },
        {
          label: "Destruction and after",
          display: "c. 1200–1100 BCE",
          level: "probable",
          note: "The palace burned. Occupation continued on a reduced scale for generations afterwards; the collapse was of an administrative system, not of the population.",
        },
        {
          label: "Classical Mycenae",
          display: "5th century BCE",
          level: "documented",
          note: "A small independent town that sent men to Thermopylae and Plataea, and was destroyed by Argos in about 468 BCE. Later a Hellenistic settlement built a theatre across the mouth of one of the tholos tombs.",
        },
      ],
    },
    civilizations: ["greece"],
    whatSurvives: [
      "The circuit wall stands to a considerable height over much of its course, built of limestone blocks large enough that later Greeks assumed the Cyclopes had laid them. The Lion Gate is intact apart from the heads of the two animals above the lintel, which were made separately and are lost; what remains is the oldest monumental sculpture in Europe still standing where it was set.",
      "Inside the gate, Grave Circle A survives as a double ring of upright slabs enclosing six shaft graves — the graves themselves emptied, the circle rebuilt in antiquity to bring it inside the extended walls. The palace on the summit survives as foundations and a fragment of the megaron floor; part of the hill has fallen away.",
      "Outside the walls stand nine tholos tombs, of which the one traditionally called the Treasury of Atreus is complete: a corbelled dome thirteen metres across, approached by a walled passage, its doorway spanned by a lintel block weighing something over a hundred tonnes.",
    ],
    excavations: [
      {
        period: "1841",
        by: "Kyriakos Pittakis, Greek Archaeological Society",
        level: "documented",
        note: "The Lion Gate was cleared. The citadel had never been lost; Pausanias saw it in the second century CE and travellers drew it in the eighteenth.",
      },
      {
        period: "1876",
        by: "Heinrich Schliemann, with Panagiotis Stamatakis for the Archaeological Service",
        level: "documented",
        note: "Grave Circle A. Five shaft graves in a season, a sixth after Schliemann left. Stamatakis was posted to supervise him and the two men fought continuously over method; the record we have of the finds owes a great deal to Stamatakis's insistence.",
      },
      {
        period: "1886–1902",
        by: "Christos Tsountas, Greek Archaeological Society",
        level: "documented",
        note: "Cleared the palace on the summit and excavated a large number of chamber tombs in the surrounding slopes — the burials of the ordinary population rather than of the elite, which is what makes the site interpretable at all.",
      },
      {
        period: "1920–1955",
        by: "Alan Wace, British School at Athens",
        level: "documented",
        note: "Established by stratigraphy that the tholos tombs form a developmental series and that the citadel's history was independent of Crete's — directly against Arthur Evans, who held that mainland Greece was a Cretan province and who used his standing to have Wace's permit withdrawn.",
      },
      {
        period: "1951–1955",
        by: "Ioannis Papadimitriou and George Mylonas",
        level: "documented",
        note: "Grave Circle B, found during road works outside the walls: twenty-four graves, slightly earlier than Circle A and less spectacularly furnished, which is what allows Circle A to be read as the end of a process rather than a sudden apparition.",
      },
    ],
    structures: [
      {
        name: "The Lion Gate",
        date: "c. 1250 BCE",
        level: "documented",
        note: "A single monolithic lintel with a relieving triangle above it, filled by a slab carved with two animals flanking a column. Standing, and standing where it was placed.",
        imageSlug: "lion-gate-mycenae",
      },
      {
        name: "The cyclopean circuit",
        date: "c. 1350, extended c. 1250 BCE",
        level: "documented",
        note: "Two main building phases; the second brought Grave Circle A inside the walls, which is an argument in stone about whose ancestors these were.",
        architectureSlug: "construction-methods",
      },
      {
        name: "The palace and megaron",
        date: "c. 1350–1200 BCE",
        level: "probable",
        note: "Foundations, a stretch of the great court, and part of the megaron with its circular hearth. The south-east corner has collapsed down the slope, so the plan is incomplete rather than reconstructed.",
        architectureSlug: "palace",
      },
      {
        name: "Grave Circle A",
        date: "c. 1600–1500 BCE, re-enclosed c. 1250",
        level: "documented",
        note: "Six shaft graves, nineteen burials. The circle of slabs standing today is the later monumentalisation, not the original arrangement.",
        architectureSlug: "necropolis",
      },
      {
        name: "The Treasury of Atreus",
        date: "c. 1250 BCE",
        level: "documented",
        note: "The largest and best preserved of the tholos tombs, complete to the apex. The name is Pausanias's usage, not an identification: it was a tomb, it was robbed in antiquity, and nothing found in it names anybody.",
        architectureSlug: "mausoleum",
      },
      {
        name: "The underground cistern",
        date: "c. 1250 BCE",
        level: "documented",
        note: "A stepped passage cut through the rock beneath the north-east wall to reach a spring outside the circuit. It belongs to the same phase as the wall extension and implies an expectation of siege.",
      },
    ],
    finds: [
      {
        name: "The gold mask from Shaft Grave V",
        what: "Beaten gold funerary mask, one of five from Circle A. Schliemann associated it with Agamemnon; it dates to roughly 1550–1500 BCE, some three centuries before any traditional date for the Trojan War, and nothing on or around it names a person.",
        level: "documented",
        objectSlug: "mask-of-agamemnon",
        museumSlug: "national-archaeological-museum-athens",
      },
      {
        name: "The Warrior Vase",
        what: "A krater showing a file of armed men leaving, and a woman raising her hand. One of the very few Mycenaean images of contemporary infantry equipment.",
        level: "documented",
        museumSlug: "national-archaeological-museum-athens",
      },
      {
        name: "The Siege Rhyton",
        what: "A fragmentary silver vessel with a scene of an attack on a walled town. Small, damaged, and the closest thing to a Mycenaean battle picture that exists.",
        level: "documented",
        museumSlug: "national-archaeological-museum-athens",
      },
      {
        name: "Inlaid daggers",
        what: "Bronze blades inlaid in gold, silver and niello with hunting and lion scenes, from the shaft graves. The technique is Aegean; several of the motifs are Egyptian or Near Eastern.",
        level: "documented",
        museumSlug: "national-archaeological-museum-athens",
      },
      {
        name: "Linear B tablets",
        what: "Recovered from houses outside the citadel wall, notably the group Wace excavated in the 1950s. Fewer than at Pylos or Knossos, and they record the same kind of thing: commodities, personnel, allocations.",
        level: "documented",
        museumSlug: "national-archaeological-museum-athens",
      },
    ],
    interpretation: [
      "For a century after Schliemann the site was read through Homer, and the reading ran in one direction: the shaft graves were the graves of Homer's kings, the citadel was Agamemnon's, and the Iliad was a memory of the Bronze Age. The decipherment of Linear B in 1952 broke that. The tablets are administrative and they are in Greek — which vindicated the linguistic continuity — but they describe a palace bureaucracy of scribes, allocations and land registers that has nothing in common with the world of the poems.",
      "What Mycenae is evidence for is a redistributive palace state with a reach across the Argolid, an appetite for imported gold, amber, ivory and lapis, and a fortification programme in its last century that looks defensive rather than ceremonial. What it is not evidence for is the political geography of the Iliad.",
      "The wealth of the shaft graves is genuinely difficult. It arrives suddenly, at a settlement that was not previously exceptional, and it stops. Proposals range from mercenary service abroad to control of a metals route to a local dynasty's monopoly on prestige exchange, and none is established.",
      "Thucydides saw the problem before anyone excavated. Mycenae in his day was a small place, and he warned that later ages would misjudge the power of cities from the size of their ruins. He was arguing that Mycenae had been greater than it looked. The warning cuts both ways, and it is the best single sentence written about this site.",
    ],
    disputes: [
      {
        question: "Is the Mask of Agamemnon authentic?",
        positions:
          "A minority argument, principally by William Calder and David Traill, holds that Schliemann altered or introduced the mask, noting that it differs in style from the other four and that the moustache and the modelling look nineteenth-century. Most specialists reject this: the find was witnessed and recorded by Stamatakis, the technique matches other Aegean goldwork, and the argument rests heavily on aesthetic judgement. The mask's date, which is not in doubt, already removes it from Agamemnon.",
        level: "disputed",
      },
      {
        question: "What destroyed the palace?",
        positions:
          "The palace burned around 1200 BCE, as did most of the Mycenaean palaces within a few decades of each other. Earthquake, internal collapse, external attack, systemic failure of a fragile redistributive economy and combinations of all four have been argued. There is no destruction layer anywhere that names an enemy, and the coincidence in date across sites is the strongest single fact and the hardest to explain.",
        level: "unknown",
      },
      {
        question: "Whose ancestors were in Grave Circle A?",
        positions:
          "When the circuit wall was extended in the thirteenth century it was diverted to bring the four-hundred-year-old grave circle inside, and the graves were monumentalised. That is a deliberate act of ancestral claim by a later dynasty. Whether that dynasty was descended from the people in the graves is not recoverable.",
        level: "unknown",
      },
    ],
    primarySources: [
      S(
        "Description of Greece",
        "2.16.5–7",
        "Pausanias saw the walls, the Lion Gate and the tholos tombs in the second century CE, describing the tombs as underground treasuries and attributing the walls to the Cyclopes. His account is why the tombs carry the names they do.",
        "Pausanias",
      ),
      S(
        "History of the Peloponnesian War",
        "1.10",
        "Thucydides' warning that the physical remains of a city are a poor guide to the power it once had, argued with Mycenae as the example. Written while the site was visible and unremarkable.",
        "Thucydides",
      ),
      S(
        "Iliad",
        "7.180, 11.46",
        "“Mycenae rich in gold.” The epithet is formulaic and belongs to poetic tradition; the shaft graves are gold, and the temptation to treat the second fact as confirmation of the first is exactly the move this platform tries not to make.",
        "Homer",
      ),
    ],
    museumSlugs: ["national-archaeological-museum-athens"],
    objectSlugs: ["mask-of-agamemnon", "boars-tusk-helmet-nama"],
    architectureRefs: ["palace", "necropolis", "mausoleum", "construction-methods"],
    institutionRefs: [],
    religionRefs: ["hero-cult"],
    warfareRefs: ["fortifications", "siege-warfare"],
    battleRefs: [],
    figureRefs: ["homer", "thucydides"],
    themeRefs: ["historical-memory", "founding-myths", "monumentality"],
    bookRefs: ["iliad", "odyssey", "history-of-the-peloponnesian-war"],
    cityRefs: ["troy"],
    mapSlugs: ["ancient-greece"],
    relatedSites: ["pylos", "knossos", "akrotiri"],
    imageSlug: "lion-gate-mycenae",
    gallerySlugs: ["mycenae-citadel", "mask-of-agamemnon"],
  },
  {
    slug: "knossos",
    name: "Knossos",
    alsoKnownAs: ["Kephala hill"],
    kind: "citadel",
    region: "aegean",
    standfirst:
      "The largest Bronze Age building in the Aegean, and the most heavily reconstructed site in Greece — where the difficulty is separating what was excavated from what was rebuilt in concrete on top of it.",
    description:
      "Knossos — Arthur Evans, the invention of the Minoans, the reinforced-concrete restorations, Linear A and Linear B, and what the central-court building was actually for.",
    geography: {
      modernCountry: "Greece",
      ancientRegion: "Crete",
      latitude: 35.298,
      longitude: 25.163,
      coordinateSubject: "The central court of the palace",
      setting:
        "A low hill above the Kairatos stream, some five kilometres inland from the north coast of Crete and the harbour at Poros-Katsambas. Inland enough to be off the shore, close enough to control the approach to it. The hill is not defensible and was never fortified, which is one of the few securely negative facts about the site and one of the most interesting.",
    },
    chronology: {
      start: { year: -7000, precision: "approximate", display: "c. 7000 BCE" },
      end: { year: -1300, precision: "disputed", display: "c. 1300 BCE" },
      status: "probable",
      display: "Neolithic settlement from c. 7000 BCE; palatial c. 1900–1300 BCE",
      phases: [
        {
          label: "Neolithic mound",
          display: "c. 7000–3000 BCE",
          level: "documented",
          note: "Seven metres of Neolithic deposit lie under the central court. The palace was built on top of one of the oldest continuously occupied places in Europe, and that deposit is why the court is where it is.",
        },
        {
          label: "First palace",
          display: "c. 1900–1700 BCE",
          level: "documented",
          note: "The central-court plan is established. Destroyed, probably by earthquake, around 1700.",
        },
        {
          label: "Second palace",
          display: "c. 1700–1450 BCE",
          level: "documented",
          note: "The building as it is now presented: multi-storey, light wells, gypsum facing, the frescoes, the Linear A archives. The high point of the Cretan system.",
        },
        {
          label: "Mycenaean administration",
          display: "c. 1450–1300 BCE",
          level: "probable",
          note: "Linear B — that is, Greek — appears in the archives while the building remains in use. Whether this represents conquest, dynastic replacement or something less dramatic is argued, but the language of administration changed.",
        },
      ],
    },
    civilizations: ["greece"],
    whatSurvives: [
      "A great deal of wall standing to ground-floor height, laid out around a paved central court fifty metres long, with magazines to the west still holding rows of storage jars, and a warren of small rooms, stairs and light wells to the east. The plan is genuinely labyrinthine and genuinely ancient.",
      "Rising above that is Arthur Evans's reconstruction: reinforced concrete columns, painted red and black, upper storeys and roofs rebuilt where he judged they had been, copies of frescoes set into the walls. Almost every photograph of Knossos shows a building substantially of the 1920s. Evans called it reconstitution and defended it as the only way to keep gypsum and mudbrick from dissolving in Cretan rain, which was a real problem; the concrete has since developed problems of its own.",
      "The frescoes on the walls are replicas. The originals, and the fragments they were built out of, are in Heraklion.",
    ],
    excavations: [
      {
        period: "1878–1879",
        by: "Minos Kalokairinos",
        level: "documented",
        note: "A Heraklion merchant sank trial trenches on the west side and struck the magazines and their storage jars. The Ottoman authorities stopped him. Schliemann tried to buy the site afterwards and failed over the price.",
      },
      {
        period: "1900–1931",
        by: "Arthur Evans, funded privately and latterly on his own land",
        level: "documented",
        note: "Six weeks into the first season the throne room was open. Evans bought the site outright, dug it for three decades, published it in four volumes, and named the civilization he had found after the Minos of Greek legend — a coinage, not a finding.",
      },
      {
        period: "1922–1930",
        by: "Evans with the architects Christian Doll and Piet de Jong",
        level: "documented",
        note: "The reinforced-concrete restorations. De Jong also drew the reconstructions that fixed the popular image of Minoan Crete.",
      },
      {
        period: "1957–1961 and after",
        by: "Sinclair Hood and the British School at Athens",
        level: "documented",
        note: "Stratigraphic re-excavation and survey which corrected parts of Evans's sequence and established the extent of the surrounding town, which is far larger than the palace.",
      },
    ],
    structures: [
      {
        name: "The central court",
        date: "c. 1900 BCE, on Neolithic deposit",
        level: "documented",
        note: "Paved, aligned roughly north–south, and the organising fact of the whole building. Every Cretan palace has one.",
        architectureSlug: "palace",
      },
      {
        name: "The throne room",
        date: "c. 1450–1300 BCE in its final form",
        level: "documented",
        note: "A gypsum seat against the north wall with benches either side and a sunken basin opposite. The griffins flanking it are a restoration by Émile Gilliéron from fragments; the seat itself is ancient and in place. Whether a king sat in it, a priestess sat in it, or it held something rather than someone, is not established.",
      },
      {
        name: "The west magazines",
        date: "c. 1700–1450 BCE",
        level: "documented",
        note: "Long parallel corridors lined with pithoi and floor cists. Storage on this scale is the strongest single argument that the building was an administrative and redistributive centre whatever else it was.",
      },
      {
        name: "The grand staircase",
        date: "c. 1700–1450 BCE",
        level: "probable",
        note: "Four flights around a light well on the east slope. Excavated as a collapse and rebuilt in concrete; the arrangement is Evans's reading of the fallen material.",
        architectureSlug: "construction-methods",
      },
      {
        name: "The theatral area",
        date: "c. 1700 BCE",
        level: "documented",
        note: "A paved rectangle with stepped sides at the north-west entrance. Called theatral by Evans; it is stepped seating of some kind for something that happened in front of it, and that is as far as the evidence goes.",
      },
    ],
    finds: [
      {
        name: "Linear A tablets and inscriptions",
        what: "The script of the second-palace administration. The signs can be read; the language cannot. It remains undeciphered, and no bilingual has been found.",
        level: "documented",
        museumSlug: "archaeological-museum-heraklion",
      },
      {
        name: "Linear B tablets",
        what: "Some three thousand tablets and fragments from the final phase. Michael Ventris demonstrated in 1952 that the language is Greek, with John Chadwick; Evans had been convinced it was not, and did not live to see it.",
        level: "documented",
        museumSlug: "archaeological-museum-heraklion",
      },
      {
        name: "The bull-leaping fresco",
        what: "Three figures and a charging bull, from the east wing. Assembled from a small proportion of original plaster; the surrounding field and much of the composition are restoration.",
        level: "disputed",
        museumSlug: "archaeological-museum-heraklion",
      },
      {
        name: "The faience snake figurines",
        what: "Two small female figures holding snakes, from a cist in the temple repositories. Both were restored — one is missing its head, and the cat now on it was found nearby rather than attached.",
        level: "disputed",
        museumSlug: "archaeological-museum-heraklion",
      },
      {
        name: "Material in Oxford",
        what: "A substantial study collection went to the Ashmolean Museum under the division-of-finds arrangements of the period and Evans's own bequest.",
        level: "documented",
        heldAt: "Ashmolean Museum, Oxford",
      },
    ],
    interpretation: [
      "Evans read the building as a palace and its culture as a peaceful, matriarchal-leaning, sea-ruling civilization destroyed from outside — a reading formed in the shadow of a European empire that thought of itself in those terms, and one that has been under revision ever since. The word palace is now often replaced by court-centred building, precisely because palace smuggles in a king.",
      "What the archaeology supports is narrower and more interesting. There was a very large building organised around a court, with storage capacity far beyond the needs of its occupants, workshops, archives in an undeciphered script, and no fortification. Something was being collected, counted and redistributed. Whether the organising authority was a ruler, a priesthood, a corporate elite or a shifting combination is not recoverable from what survives.",
      "The absence of walls is the strongest negative evidence in Aegean archaeology, and it is genuinely hard to explain in a Bronze Age world where Mycenae, Tiryns and Troy were all walled. Naval control, internal peace and a different relationship between settlement and defence have all been proposed.",
      "The Minotaur is not evidence about Knossos. Bulls appear constantly in Cretan art, the building is complex, and a Greek myth about a labyrinth on Crete existed by the eighth century BCE at the latest. Those three facts are compatible with the myth having grown around a half-remembered ruin, and equally compatible with coincidence. The derivation of labyrinth from labrys, the double axe, is a nineteenth-century proposal that has not been established.",
    ],
    disputes: [
      {
        question: "How much of the visible building is ancient?",
        positions:
          "Evans's restorations are not a secret and were published as restorations, but they are not marked on the site, and a visitor cannot tell concrete from gypsum at a distance. Critics from the 1920s onward have argued that the reconstruction fixed a set of hypotheses in permanent material, making them unfalsifiable. Defenders point out that unroofed gypsum was actively dissolving and that the alternative was loss. Both are true.",
        level: "disputed",
      },
      {
        question: "What happened around 1450 BCE?",
        positions:
          "Cretan sites were destroyed widely around this date, and Knossos alone continued in use with Greek-language administration. Mycenaean conquest is the traditional explanation; earthquake, internal collapse and the long aftermath of the Theran eruption have all been argued as contributing. The change of administrative language at Knossos is documented; its cause is not.",
        level: "disputed",
      },
      {
        question: "Was there human sacrifice?",
        positions:
          "Peter Warren's 1979 excavation of the North House produced children's bones with cut marks consistent with butchery. The interpretation offered was ritual, and it is contested; the sample is small and the alternative readings — secondary burial practice, disturbance — are not excluded. It should not be generalised into a characterisation of Cretan religion.",
        level: "disputed",
      },
    ],
    primarySources: [
      S(
        "Odyssey",
        "19.172–179",
        "Odysseus, lying, describes Crete of the ninety cities and Knossos where Minos ruled. The earliest surviving Greek reference to the place, in a speech that is explicitly a fabrication.",
        "Homer",
      ),
      S(
        "History of the Peloponnesian War",
        "1.4",
        "Thucydides' brief statement that Minos was the first to hold a navy and cleared the sea of pirates — the source of the idea of a Cretan thalassocracy, offered by him as reconstruction rather than record.",
        "Thucydides",
      ),
    ],
    museumSlugs: ["archaeological-museum-heraklion"],
    objectSlugs: [],
    architectureRefs: ["palace", "construction-methods", "building-materials"],
    institutionRefs: [],
    religionRefs: ["votive-dedication"],
    warfareRefs: [],
    battleRefs: [],
    figureRefs: ["homer", "thucydides"],
    themeRefs: ["historical-memory", "founding-myths", "administrative-state"],
    bookRefs: ["odyssey", "history-of-the-peloponnesian-war"],
    cityRefs: [],
    mapSlugs: ["ancient-greece"],
    relatedSites: ["mycenae", "akrotiri", "pylos"],
    imageSlug: "knossos-north-entrance",
  },
  {
    slug: "akrotiri",
    name: "Akrotiri, Thera",
    alsoKnownAs: ["Santorini"],
    kind: "settlement",
    region: "aegean",
    standfirst:
      "A Bronze Age town buried standing by a volcanic eruption, with its frescoes intact, its pots in place and — unlike Pompeii — nobody in it.",
    description:
      "Akrotiri on Thera — the eruption, the evacuation, the frescoes, the radiocarbon-versus-Egypt dating dispute, and why the Atlantis association is modern.",
    geography: {
      modernCountry: "Greece",
      ancientRegion: "Thera, the Cyclades",
      latitude: 36.351,
      longitude: 25.404,
      coordinateSubject: "The excavation shelter over the town",
      setting:
        "The south coast of Thera, on what was then a single roughly circular island with a natural harbour. The eruption removed the centre of the island and left the crescent of cliffs standing today. Position on the sea route between Crete, the Cyclades and the Anatolian coast is the reason a town of this quality existed on a small island.",
    },
    chronology: {
      start: { year: -4000, precision: "approximate", display: "c. 4000 BCE" },
      end: { year: -1600, precision: "disputed", display: "c. 1600 BCE" },
      status: "disputed",
      display: "Occupied from the Late Neolithic; destroyed by the Theran eruption",
      phases: [
        {
          label: "Early settlement",
          display: "c. 4000–2000 BCE",
          level: "documented",
          note: "Late Neolithic and Early Bronze Age occupation under the town, known from soundings rather than from open excavation.",
        },
        {
          label: "The town",
          display: "c. 1800–1600 BCE",
          level: "documented",
          note: "A substantial place with multi-storey houses, drainage, imported goods and wall painting of a quality found nowhere else in the Aegean at this scale.",
        },
        {
          label: "Earthquake, then eruption",
          display: "shortly before the destruction",
          level: "documented",
          note: "The town was damaged by earthquake, cleared and partly repaired, and then abandoned before the eruption buried it. The sequence is legible in the deposits themselves.",
        },
      ],
    },
    civilizations: ["greece"],
    whatSurvives: [
      "Streets, squares and houses standing to two and in places three storeys, under a modern roof. Because the burial medium was pumice and ash rather than the hot pyroclastic surges that hit Herculaneum, the walls were supported rather than sheared, and the town stands more or less as it was left.",
      "Wooden elements did not survive as wood, but they left voids in the ash which have been filled with plaster to recover beds, tables, doors and window frames — the same technique Giuseppe Fiorelli developed for the bodies at Pompeii, used here on furniture.",
      "What is conspicuously absent is people. No bodies have been found, and very little of value: no hoards, no jewellery caches, no abandoned tools of the kind a sudden catastrophe leaves. The town was emptied deliberately.",
    ],
    excavations: [
      {
        period: "1867",
        by: "Quarry workers and, briefly, Ferdinand Fouqué",
        level: "documented",
        note: "Pumice quarried on Thera for the Suez Canal works exposed prehistoric walls. Fouqué, a geologist, recorded and published what was visible and understood that the buildings predated the eruption.",
      },
      {
        period: "1967–1974",
        by: "Spyridon Marinatos, Greek Archaeological Service",
        level: "documented",
        note: "The excavation that opened the town. Marinatos died at the site in 1974 and is buried there. He had argued since 1939 that the Theran eruption destroyed Minoan Crete — a hypothesis this excavation was designed to test, and which the chronology has not sustained.",
      },
      {
        period: "1974–present",
        by: "Christos Doumas and the Archaeological Society at Athens",
        level: "documented",
        note: "Continued excavation, conservation and publication, with a deliberate policy of leaving most of the town unexcavated. Less than a third of the estimated extent is open.",
      },
    ],
    structures: [
      {
        name: "The West House",
        date: "c. 1650 BCE",
        level: "documented",
        note: "A well-preserved house of two or three storeys whose upper room carried the miniature frieze. Standing to its second floor.",
        architectureSlug: "house-and-insula",
      },
      {
        name: "Xeste 3",
        date: "c. 1650 BCE",
        level: "documented",
        note: "A large ashlar-fronted building with a lustral basin and an extensive fresco programme, generally read as having a ceremonial function. The reading rests on the architecture and the paintings, not on any text.",
      },
      {
        name: "The drainage system",
        date: "c. 1700–1600 BCE",
        level: "documented",
        note: "Clay pipes running under the streets, serving upper-floor facilities in individual houses. Not exceptional in the Aegean Bronze Age, but rarely preserved this completely.",
      },
    ],
    finds: [
      {
        name: "The miniature frieze",
        what: "A long narrow painting running around the top of a room in the West House, showing a fleet, a landscape, two towns and men in the water. It is the most detailed picture of Bronze Age Aegean ships and coastal settlement that exists. What it depicts — a festival, an expedition, a specific event — is not established.",
        level: "documented",
        museumSlug: "national-archaeological-museum-athens",
      },
      {
        name: "The Boxing Boys and the Antelopes",
        what: "Two facing walls of a single room. The boys wear a single glove each; the identification as boxing is by posture, not by any label.",
        level: "documented",
        museumSlug: "national-archaeological-museum-athens",
      },
      {
        name: "The Spring Fresco",
        what: "Lilies and swallows over a volcanic landscape, painted on three walls of a room and lifted intact. The only Aegean wall painting recovered complete and in place.",
        level: "documented",
        museumSlug: "national-archaeological-museum-athens",
      },
      {
        name: "The olive branch from the eruption deposit",
        what: "A branch buried alive by the tephra, whose rings were radiocarbon-dated in a sequence. It is the single most important object in the dating dispute below.",
        level: "documented",
        heldAt: "Sampled and published; not a display object",
      },
    ],
    interpretation: [
      "Akrotiri is the best-preserved Bronze Age settlement in the Aegean, and it is preserved precisely because it was empty. The absence of bodies and valuables, combined with the earlier earthquake damage and evidence of repair, indicates an orderly departure after warning — probably weeks or months of precursor activity. Where the people went is unknown, and no destination population has ever been identified.",
      "The material culture is closely related to Crete without being simply Cretan. Weights, script, pottery shapes and fresco conventions are shared; the architecture and some of the iconography are local. Whether Thera was a Cretan dependency, a partner or an independent participant in a shared Aegean system is argued, and the town is the main evidence either way.",
      "Marinatos's original hypothesis — that this eruption destroyed the Cretan palaces — is not sustained. The Cretan destructions are stratigraphically later than the Theran ash on Crete, by enough that a direct causal link fails. The eruption remains an enormous regional event with real consequences for shipping, agriculture and Theran society specifically.",
    ],
    disputes: [
      {
        question: "When did the eruption happen?",
        positions:
          "Radiocarbon determinations, including the olive branch and short-lived samples from the destruction level, cluster in the late seventeenth century BCE, around 1620–1600. Conventional Aegean chronology, built on synchronisms between pottery styles and dated Egyptian material, puts it around 1500. The gap is roughly a century and it will not close by splitting the difference: one of the two dating systems is wrong somewhere. Both camps are active and both have refined their positions; the question is open.",
        level: "disputed",
      },
      {
        question: "Is Akrotiri the origin of the Atlantis story?",
        positions:
          "The proposal is modern — it dates from the twentieth century, and Marinatos was among its promoters. Plato places Atlantis beyond the Pillars of Heracles, in the Atlantic, nine thousand years before Solon, and describes a great power defeated by Athens. Thera is in the Aegean, was destroyed around eleven hundred years before Plato wrote, and was a town on a small island. The association is an inference about how a memory might have travelled, not evidence, and the site does not need it.",
        level: "literary",
      },
    ],
    primarySources: [],
    noAncientTestimony:
      "No ancient author describes this town. It was buried some eight hundred years before Greek prose existed and the name Akrotiri is that of the modern village. Plato's Atlantis is not testimony about it, and treating it as such would invert the relationship between evidence and story that this layer exists to keep straight.",
    museumSlugs: ["national-archaeological-museum-athens"],
    objectSlugs: [],
    architectureRefs: ["house-and-insula", "building-materials"],
    institutionRefs: [],
    religionRefs: [],
    warfareRefs: [],
    battleRefs: [],
    figureRefs: ["plato"],
    themeRefs: ["historical-memory", "historical-method"],
    bookRefs: ["timaeus"],
    cityRefs: [],
    mapSlugs: ["ancient-greece"],
    relatedSites: ["knossos", "mycenae", "herculaneum"],
    imageSlug: "akrotiri-excavation",
  },
  {
    slug: "pylos",
    name: "Pylos, the Palace of Nestor",
    alsoKnownAs: ["Ano Englianos"],
    kind: "citadel",
    region: "aegean",
    standfirst:
      "The palace whose archive burned, and so survived: eleven hundred clay tablets baked by the fire that destroyed the building, recording a Bronze Age Greek state in its last year.",
    description:
      "The Palace of Nestor at Pylos — Blegen's 1939 excavation, the Linear B archive, the megaron and its frescoes, and the undisturbed Griffin Warrior grave found in 2015.",
    geography: {
      modernCountry: "Greece",
      ancientRegion: "Messenia",
      latitude: 37.027,
      longitude: 21.695,
      coordinateSubject: "The palace megaron on the Ano Englianos ridge",
      setting:
        "A ridge inland from the Bay of Navarino, with a view over the bay and the coastal plain. The tablets show the state it governed reaching across south-western Messenia in two provinces, so the position is administrative rather than defensive; the palace was unwalled.",
    },
    chronology: {
      start: { year: -1600, precision: "approximate", display: "c. 1600 BCE" },
      end: { year: -1180, precision: "approximate", display: "c. 1180 BCE" },
      status: "probable",
      display: "c. 1600 BCE until the destruction of c. 1200–1180 BCE",
      phases: [
        {
          label: "Before the palace",
          display: "c. 1600–1400 BCE",
          level: "documented",
          note: "Occupation and rich burial on and around the ridge, including the tholos tombs and the shaft grave of 2015. The elite here was wealthy long before the palace was built.",
        },
        {
          label: "The palace",
          display: "c. 1300–1200 BCE",
          level: "documented",
          note: "The building as excavated: megaron, archive rooms, storerooms, workshops. Its life was short.",
        },
        {
          label: "Destruction",
          display: "c. 1200–1180 BCE",
          level: "documented",
          note: "Fire, comprehensive enough to bake unfired clay tablets into permanence. The site was not substantially reoccupied.",
        },
      ],
    },
    civilizations: ["greece"],
    whatSurvives: [
      "Foundations and low walls over the whole palace plan, protected by a modern roof: an entrance court, the megaron with its circular hearth and the emplacement for a throne, corridors of storerooms, pantries and workshops, and a bathroom with its terracotta tub still in place.",
      "The frescoes survive as fallen fragments, recovered and reassembled: a lyre player and a bird, processions, hunting scenes, a griffin beside the throne position. The floors of the megaron kept their painted grid.",
      "What is not here is a wall. Pylos was unfortified, in contrast with Mycenae and Tiryns, and it burned anyway.",
    ],
    excavations: [
      {
        period: "1939",
        by: "Carl Blegen, University of Cincinnati, with Konstantinos Kourouniotis",
        level: "documented",
        note: "Linear B tablets turned up in the first days of the first season, in the room beside the entrance that turned out to be the archive. Blegen closed the trench, published a preliminary note, and the Second World War stopped everything for thirteen years.",
      },
      {
        period: "1952–1966",
        by: "Carl Blegen and Marion Rawson",
        level: "documented",
        note: "The full excavation of the palace, running in parallel with Ventris's decipherment — so for the first time an Aegean building was being excavated and its own records read at the same time.",
      },
      {
        period: "2015–2018",
        by: "Sharon Stocker and Jack Davis, University of Cincinnati",
        level: "documented",
        note: "The shaft grave now called the Griffin Warrior, found intact and unrobbed beside the palace, followed by two further tholos tombs. The first undisturbed elite Aegean burial excavated with modern recovery methods.",
      },
    ],
    structures: [
      {
        name: "The megaron",
        date: "c. 1300 BCE",
        level: "documented",
        note: "Porch, vestibule and hall around a circular painted hearth four metres across, with four columns and a throne emplacement against the right-hand wall. The standard Mycenaean plan, better preserved here than anywhere.",
        architectureSlug: "palace",
      },
      {
        name: "The Archives Room",
        date: "c. 1300 BCE",
        level: "documented",
        note: "Two small rooms immediately inside the entrance, where the tablets were kept on shelves and in baskets. Their position — the first thing past the door — is itself an argument about what the building was for.",
      },
      {
        name: "The storerooms and pantry",
        date: "c. 1300 BCE",
        level: "documented",
        note: "Thousands of plain kylikes stacked in one room, oil jars in others. The tablets and the pots describe the same operation from two directions.",
      },
      {
        name: "Tholos IV and the Griffin Warrior grave",
        date: "c. 1500–1450 BCE",
        level: "documented",
        note: "Earlier than the palace by two centuries and immediately beside it. The shaft grave was cut into rock, covered, and never found by robbers.",
        architectureSlug: "necropolis",
      },
    ],
    finds: [
      {
        name: "The Linear B archive",
        what: "Around eleven hundred tablets and fragments. They record land tenure, personnel, bronze allocation, textile production, offerings to named deities, rowers assigned to ships and a coastguard deployment. They are a single administrative year, or less, frozen by the fire that ended it.",
        level: "documented",
        museumSlug: "national-archaeological-museum-athens",
      },
      {
        name: "The Pylos Combat Agate",
        what: "A sealstone thirty-six millimetres across from the Griffin Warrior grave, carved with a combat scene whose detail is at the limit of what the unaided eye can see. It has forced a reconsideration of what Aegean engravers could do around 1450 BCE.",
        level: "documented",
        heldAt: "Archaeological Museum of Chora, Messenia",
      },
      {
        name: "The Griffin Warrior assemblage",
        what: "Some three thousand objects with a single burial: gold rings with Cretan iconography, a bronze sword with a gold hilt, silver cups, hundreds of beads, ivory, and a boar's-tusk helmet. The Cretan character of the finest objects is the interesting part.",
        level: "documented",
        heldAt: "Archaeological Museum of Chora, Messenia",
      },
      {
        name: "The lyre-player fresco",
        what: "A seated figure playing a five-stringed instrument, with a large bird in flight, from the wall beside the throne. Frequently reproduced as the earliest picture of a Greek bard; what the painting shows is a musician in a palace hall.",
        level: "documented",
        museumSlug: "national-archaeological-museum-athens",
      },
    ],
    interpretation: [
      "Pylos is the best-documented Mycenaean state because its archive burned in the right way, and the picture the archive gives is of a bureaucracy: two provinces, sixteen districts, named officials, land held in specified tenures, rations issued to named groups of women and children, bronze weighed out to named smiths. It is a world of accounting, and the accounting stops abruptly.",
      "That is the sharpest available contrast with the Homeric picture of Nestor. The poems know a Pylos, a Nestor and a sandy shore, and they know nothing whatever about scribes, land registers or a palace economy. Whatever the epic tradition preserved of the Bronze Age, it did not preserve the thing the Bronze Age spent most of its writing on.",
      "The tablets also record religion in an administrative register: offerings of oil and animals to deities including Poseidon, who dominates at Pylos, and names that recur later in Greek cult. This is the earliest documentation of Greek religious practice, and it comes in the form of a delivery schedule.",
      "The Griffin Warrior grave, two centuries earlier than the palace, shows a Messenian elite already burying its dead with Cretan luxury goods before any palace stood on the ridge. It complicates a simple story of Mycenaean conquest of Crete by showing how deep the exchange ran, and how early.",
    ],
    disputes: [
      {
        question: "Is this Homer's Pylos?",
        positions:
          "The identification of the Ano Englianos ridge with the Pylos of the epics is probable and widely accepted, and it is not certain. Which Pylos Homer meant was already argued in antiquity — Strabo reports a Triphylian and a Messenian claim — and the ridge has produced no inscription naming the place in a way that settles it. The Linear B tablets do name a place, pu-ro, which is read as Pylos.",
        level: "probable",
      },
      {
        question: "What does tablet Tn 316 record?",
        positions:
          "A tablet written in haste at the end lists offerings to a series of deities, including entries that some scholars read as human beings offered rather than objects. The reading turns on a handful of signs and on whether the accompanying terms denote persons or vessels. It is the single most contested tablet in the corpus and no consensus exists.",
        level: "disputed",
      },
    ],
    primarySources: [
      S(
        "Odyssey",
        "3.1–485",
        "Telemachus at Pylos: the sacrifice of bulls to Poseidon on the shore, Nestor's hospitality and his account of the returns from Troy. Poseidon's prominence in the poem and in the tablets is a genuine convergence, and it is one of very few.",
        "Homer",
      ),
      S(
        "Geography",
        "8.3.7",
        "Strabo records the ancient argument over which of three places called Pylos was Nestor's, and comes down for the Triphylian claim — against the site now excavated.",
        "Strabo",
      ),
    ],
    museumSlugs: ["national-archaeological-museum-athens"],
    objectSlugs: ["boars-tusk-helmet-nama"],
    architectureRefs: ["palace", "necropolis"],
    institutionRefs: [],
    religionRefs: ["animal-sacrifice", "votive-dedication"],
    warfareRefs: ["logistics", "naval-warfare"],
    battleRefs: [],
    figureRefs: ["homer"],
    themeRefs: ["administrative-state", "historical-memory"],
    bookRefs: ["odyssey", "iliad"],
    cityRefs: [],
    mapSlugs: ["ancient-greece"],
    relatedSites: ["mycenae", "knossos"],
    imageSlug: "linear-b-tablet-pylos",
  },
  {
    slug: "acropolis-of-athens",
    name: "The Acropolis of Athens",
    kind: "sanctuary",
    region: "aegean",
    standfirst:
      "A fortified rock that became a sanctuary, a church, a mosque, a powder magazine and a national symbol — and whose excavation produced a sealed deposit of the sculpture the Persians smashed.",
    description:
      "The Athenian Acropolis as an excavated site — the Persian destruction deposit, the Periclean programme, the 1687 explosion, the Elgin removals and the modern restoration that is undoing an earlier one.",
    parentCitySlug: "athens",
    geography: {
      modernCountry: "Greece",
      ancientRegion: "Attica",
      latitude: 37.972,
      longitude: 23.727,
      coordinateSubject: "The Parthenon",
      setting:
        "A limestone outcrop rising about seventy metres above the plain of Athens, with steep sides on three flanks and a single practicable approach from the west. It has springs on its north slope and a defensible summit of roughly three hectares, which is why it was occupied in the Bronze Age and why it kept being fought over long after it stopped being a fortress.",
    },
    chronology: {
      start: { year: -1300, precision: "approximate", display: "c. 1300 BCE" },
      status: "documented",
      display: "Mycenaean citadel; sanctuary from the Archaic period; in continuous use since",
      phases: [
        {
          label: "Mycenaean citadel",
          display: "c. 1300–1200 BCE",
          level: "documented",
          note: "A cyclopean circuit of which stretches survive, and a stepped well shaft down the north slope. The rock was a fortress before it was a sanctuary.",
        },
        {
          label: "Archaic sanctuary",
          display: "6th century – 480 BCE",
          level: "documented",
          note: "Temples, korai and votive sculpture, ended by the Persian sack. What was smashed was buried on the rock, which is why so much of it survives.",
        },
        {
          label: "The Periclean programme",
          display: "447–406 BCE",
          level: "documented",
          note: "Parthenon, Propylaia, Athena Nike, Erechtheion — a single building campaign of about forty years, funded in part from the treasury of the Delian League and politically contested at the time.",
        },
        {
          label: "Church, mosque, magazine",
          display: "6th century CE – 1687",
          level: "documented",
          note: "The Parthenon became a church of the Virgin, then a mosque; the Erechtheion a harem residence; and in 1687 the Parthenon was in use as a powder store when a Venetian mortar found it.",
        },
        {
          label: "Excavation and restoration",
          display: "1830s – present",
          level: "documented",
          note: "Post-antique structures cleared after Greek independence, excavation to bedrock in the 1880s, a first restoration campaign that damaged the buildings, and a second, still running, that is reversing it.",
        },
      ],
    },
    civilizations: ["athens", "greece"],
    whatSurvives: [
      "Four buildings of the fifth century BCE stand: the Parthenon, roofless and missing its centre; the Propylaia; the small Ionic temple of Athena Nike on its bastion; and the Erechtheion with its porch of caryatids, five of which are casts and one of which is in London.",
      "Around and beneath them are foundations of a great deal else — the Older Parthenon left unfinished when the Persians came, the archaic temple of Athena, the Chalkotheke, the sanctuary of Artemis Brauronia — and the rock itself, cut and levelled and quarried into a working surface over centuries.",
      "The sculpture is not on the buildings. What is fixed to the Parthenon and the Erechtheion today is casts; the originals that remain in Athens are in the Acropolis Museum at the foot of the hill, and a substantial part of the fifth-century programme is in the British Museum.",
    ],
    excavations: [
      {
        period: "1835–1840s",
        by: "Ludwig Ross and the new Greek state",
        level: "documented",
        note: "The Ottoman village on the summit, the Frankish tower on the Propylaia and the medieval accretions were cleared. This was excavation as national self-definition, and it destroyed a great deal of post-classical evidence deliberately.",
      },
      {
        period: "1885–1890",
        by: "Panagiotis Kavvadias and Georg Kawerau",
        level: "documented",
        note: "Excavation of the whole summit down to bedrock. It produced the Perserschutt — the debris of the Persian sack of 480 BCE, buried where it fell and sealed by the later terracing, containing Archaic sculpture with its paint still on it.",
      },
      {
        period: "1898–1933",
        by: "Nikolaos Balanos",
        level: "documented",
        note: "The first modern restoration. Columns were re-erected and blocks were fixed with iron clamps set without insulation, and drums were assembled in wrong sequence. The iron rusted, expanded and split the marble from inside. The intention was conservation; the effect was damage that took a second campaign to undo.",
      },
      {
        period: "1975–present",
        by: "The Acropolis Restoration Service",
        level: "documented",
        note: "Systematic dismantling and reassembly: Balanos's iron removed and replaced with titanium, blocks returned to their correct positions where these can be established, surviving sculpture withdrawn to the museum, everything documented and everything reversible.",
      },
    ],
    structures: [
      {
        name: "The Parthenon",
        date: "447–432 BCE",
        level: "documented",
        note: "Doric, octastyle, with an Ionic frieze inside the colonnade. Iktinos and Kallikrates are named as architects and Pheidias as overseer of the sculpture by ancient sources rather than by any building inscription. Standing, and roofless since 1687.",
        architectureSlug: "temple",
        imageSlug: "parthenon-east",
      },
      {
        name: "The Propylaia",
        date: "437–432 BCE",
        level: "documented",
        note: "The monumental entrance, attributed to Mnesikles, left unfinished — the projected south-east wing was never built and the unworked bosses are still on some blocks.",
        architectureSlug: "architectural-orders",
      },
      {
        name: "The Erechtheion",
        date: "c. 421–406 BCE",
        level: "documented",
        note: "An irregular building on three levels holding several cults at once, including the olive tree and the salt spring of the contest between Athena and Poseidon. Its irregularity is a consequence of what it had to contain.",
        architectureSlug: "temple",
        imageSlug: "erechtheum-acropolis",
      },
      {
        name: "The Temple of Athena Nike",
        date: "c. 427–424 BCE",
        level: "documented",
        note: "Small, Ionic, amphiprostyle, on the bastion beside the entrance. Dismantled by the Ottomans in 1686 for a gun emplacement and rebuilt from its own blocks in 1836, then twice again since.",
        architectureSlug: "temple",
      },
      {
        name: "The Older Parthenon and the north wall",
        date: "c. 490–480 BCE",
        level: "documented",
        note: "A temple under construction when the Persians burned the rock. Its unfinished column drums were built into the north circuit wall in plain view from the city below — a deliberate memorial, and the clearest surviving instance of ancient Athens making an argument out of a ruin.",
      },
    ],
    finds: [
      {
        name: "The Perserschutt sculpture",
        what: "Korai, the Calf-Bearer, the Rampin Rider, the Kritios Boy and much else, smashed in 480 BCE and buried on the rock. A sealed deposit with a fixed terminus, which makes it the anchor for Archaic sculptural chronology.",
        level: "documented",
        museumSlug: "acropolis-museum",
      },
      {
        name: "The Parthenon sculptures in Athens",
        what: "Frieze, metopes and pedimental figures that remained on or near the building, now displayed in the Acropolis Museum in a gallery laid out to the dimensions of the Parthenon itself, with gaps where the London blocks would be.",
        level: "documented",
        museumSlug: "acropolis-museum",
      },
      {
        name: "The Parthenon sculptures in London",
        what: "Roughly half the surviving frieze, fifteen metopes, and pedimental figures, removed under Thomas Bruce, seventh Earl of Elgin, between 1801 and 1812 and sold to the British Museum in 1816. The legality of the Ottoman permission and the terms of the removal are disputed, and Greece has sought return since the 1980s.",
        level: "documented",
        museumSlug: "british-museum",
      },
      {
        name: "Inscribed building accounts",
        what: "Athenian practice was to publish accounts on stone. The Parthenon and Propylaia accounts survive in fragments and record annual expenditure, which is why the construction dates are firm rather than inferred.",
        level: "documented",
        museumSlug: "acropolis-museum",
      },
    ],
    interpretation: [
      "The Acropolis is usually explained as the high point of an artistic tradition. As an excavated site it reads more sharply as a political programme. The buildings went up within a generation of the Persian sack, on the ruins of what the Persians destroyed, funded from the tribute of an alliance formed to fight Persia, and against opposition in Athens which held that the money was not Athens's to spend. Plutarch preserves the argument.",
      "The rock also records what people did with a ruin once the argument was over. The Parthenon has been a temple, a church, a mosque and an arsenal, and each conversion left evidence. Nineteenth-century clearance removed almost all of it in order to recover a single moment, which is a choice about which past a place is allowed to have.",
      "The current restoration is unusual in being explicitly a correction. Balanos's iron was standard practice in 1900 and it was catastrophic by 1975, and the present campaign's commitment to reversibility is a direct response. It is one of the few large heritage projects that treats its own methods as provisional.",
    ],
    disputes: [
      {
        question: "Where do the Parthenon sculptures belong?",
        positions:
          "Greece holds that the removal was carried out under an occupying power without valid title and that a single sculptural programme should be reunited in sight of the building it was made for. The British Museum has held that the sculptures were acquired legally under the terms of the day, that its trustees are constrained by statute, and that the collection provides a comparative context. The original Ottoman document has not been found; what survives is an Italian translation of uncertain standing. The platform records the dispute and does not adjudicate it.",
        level: "disputed",
      },
      {
        question: "What does the Parthenon frieze represent?",
        positions:
          "The traditional identification is the Panathenaic procession. Alternatives have included the sacrifice of the daughters of Erechtheus, a heroised assembly of the Marathon dead, and a generic idealised citizenry. No ancient source describes the frieze, which is the root of the problem: a building this famous carries no ancient explanation of its own main sculptural programme.",
        level: "disputed",
      },
    ],
    primarySources: [
      S(
        "Description of Greece",
        "1.22–28",
        "Pausanias walks up through the Propylaia and describes what was on the rock in the second century CE, including dozens of dedications now lost. It is the single most important ancient text for the site.",
        "Pausanias",
      ),
      S(
        "Life of Pericles",
        "12–13",
        "Plutarch on the building programme: the charge that Athens was gilding herself with her allies' money, Pericles' answer, and the speed of the work. Written five centuries later from earlier sources.",
        "Plutarch",
      ),
      S(
        "Histories",
        "8.51–53",
        "Herodotus on the Persian capture of the Acropolis in 480 BCE: the defenders behind a wooden barricade, the climb up the unguarded north face, and the burning of the sanctuary.",
        "Herodotus",
      ),
      S(
        "History of the Peloponnesian War",
        "2.13",
        "Pericles counts the reserves available to Athens, including the removable gold on the statue of Athena — a reminder that the sanctuary was also a treasury.",
        "Thucydides",
      ),
    ],
    museumSlugs: ["acropolis-museum", "british-museum"],
    objectSlugs: [],
    architectureRefs: ["temple", "architectural-orders", "columns-and-capitals"],
    institutionRefs: ["ecclesia", "strategos"],
    religionRefs: [
      "sanctuary-treasuries",
      "greek-priesthood",
      "the-sacred-calendar",
      "votive-dedication",
    ],
    warfareRefs: ["fortifications"],
    battleRefs: ["marathon", "salamis", "plataea"],
    figureRefs: ["pericles", "plutarch", "herodotus", "iktinos", "thucydides"],
    themeRefs: ["monumentality", "naval-empire", "civic-virtue", "historical-memory"],
    bookRefs: ["life-of-pericles", "herodotus-histories", "history-of-the-peloponnesian-war"],
    cityRefs: ["delphi"],
    mapSlugs: ["athens"],
    relatedSites: ["athenian-agora", "eleusis", "delos"],
    imageSlug: "parthenon-east",
    gallerySlugs: ["erechtheum-acropolis"],
  },
  {
    slug: "athenian-agora",
    name: "The Athenian Agora",
    kind: "civic-centre",
    region: "aegean",
    standfirst:
      "Where Athenian democracy was physically operated — and where the machines it used to do it were dug up: the allotment frames, the water clocks, the jurors' tickets and thousands of ostraka.",
    description:
      "The Athenian Agora — the American excavations from 1931, the Bouleuterion and Tholos, the Painted Stoa, and the objects that turned the constitutional texts into working hardware.",
    parentCitySlug: "athens",
    geography: {
      modernCountry: "Greece",
      ancientRegion: "Attica",
      latitude: 37.976,
      longitude: 23.722,
      coordinateSubject: "The Temple of Hephaestus",
      setting:
        "A shallow open basin north-west of the Acropolis, crossed diagonally by the Panathenaic Way running from the Dipylon Gate up to the sanctuary. Low, level and on the through route — the opposite of the Acropolis in every respect, which is roughly the point.",
    },
    chronology: {
      start: { year: -600, precision: "approximate", display: "c. 600 BCE" },
      end: { year: 267, precision: "exact", display: "267 CE" },
      status: "documented",
      display: "Civic square from c. 600 BCE; wrecked by the Herulian raid of 267 CE",
      phases: [
        {
          label: "Formation",
          display: "6th century BCE",
          level: "documented",
          note: "Earlier burials and wells are cleared and the area is laid out as public space. The archaeology of the square begins roughly where the constitutional reforms do.",
        },
        {
          label: "The democratic square",
          display: "5th–4th centuries BCE",
          level: "documented",
          note: "Council house, round house, archive, law courts, stoas, and the boundary stones that marked where public space began. Everything the Constitution of the Athenians describes had a building here.",
        },
        {
          label: "Hellenistic and Roman",
          display: "3rd century BCE – 267 CE",
          level: "documented",
          note: "Royal benefactions fill the edges — the Stoa of Attalos above all — and under Rome an odeon and a temple are moved into the middle of the open space, which changes what the square is for.",
        },
        {
          label: "Destruction",
          display: "267 CE",
          level: "documented",
          note: "The Herulian raid burned the square. A late wall was built afterwards out of its rubble, which is why so much sculpture and inscription survives: it was recycled as building stone and thereby preserved.",
        },
      ],
    },
    civilizations: ["athens", "greece"],
    whatSurvives: [
      "The Temple of Hephaestus stands almost complete on the west ridge — the best-preserved Doric temple anywhere, because it served as a church from the seventh century until the 1830s and was therefore roofed and maintained.",
      "The square itself survives as foundations: the Bouleuterion, the Tholos, the Metroon, the Royal Stoa, the law courts, and the boundary stones still in place reading “I am the boundary of the Agora”.",
      "The Stoa of Attalos is a full-scale reconstruction, built in 1953–1956 on the ancient foundations using the surviving fragments as the model, and functions as the site museum. It is a reconstruction and is not presented as anything else.",
    ],
    excavations: [
      {
        period: "1931–present",
        by: "The American School of Classical Studies at Athens",
        level: "documented",
        note: "One of the longest continuous excavations anywhere. It required the purchase and demolition of around four hundred houses in the Monastiraki district — a large and irreversible intervention in a living neighbourhood, made for archaeology.",
      },
      {
        period: "1931–1967",
        by: "T. Leslie Shear Sr. and Homer Thompson",
        level: "documented",
        note: "The main clearance of the square and the identification of the civic buildings against the ancient descriptions.",
      },
      {
        period: "1980s–present",
        by: "T. Leslie Shear Jr., John Camp and successors",
        level: "documented",
        note: "Extension north of the railway line, where the Painted Stoa — the Stoa Poikile, the building Stoicism is named after — has been partly uncovered.",
      },
    ],
    structures: [
      {
        name: "The Temple of Hephaestus",
        date: "c. 449–415 BCE",
        level: "documented",
        note: "Standing with its roof, walls, colonnades and much of its sculpture in place. It survives because it was converted, not because it was lucky.",
        architectureSlug: "temple",
        imageSlug: "hephaestus-agora",
      },
      {
        name: "The Bouleuterion",
        date: "Old c. 500 BCE, New late 5th century BCE",
        level: "documented",
        note: "The council house of the five hundred. Foundations only; the seating arrangement is inferred from the plan and from the parallel at other cities.",
        architectureSlug: "agora",
      },
      {
        name: "The Tholos",
        date: "c. 465 BCE",
        level: "documented",
        note: "A round building where the fifty councillors on duty ate at public expense and a third of them slept, so that the state was never without officials. Its foundations, and the standard weights and measures kept there, both survive.",
      },
      {
        name: "The Royal Stoa",
        date: "c. 500 BCE",
        level: "documented",
        note: "Seat of the archon basileus, and where the laws were displayed. A large unworked stone in front of it is generally identified with the stone on which magistrates swore their oath.",
        architectureSlug: "stoa",
      },
      {
        name: "The Stoa of Attalos",
        date: "c. 150 BCE; rebuilt 1953–1956",
        level: "documented",
        note: "A two-storey commercial stoa given by Attalos II of Pergamon. The modern rebuilding is complete and explicit, and the ancient foundations and some original blocks are incorporated.",
        architectureSlug: "stoa",
      },
    ],
    finds: [
      {
        name: "Ostraka",
        what: "Many thousands of inscribed potsherds used as ballots in ostracism votes, from the Agora and from the Kerameikos. One Kerameikos deposit of a hundred and ninety sherds naming Themistocles was written by a small number of hands — evidence that someone was preparing ballots in advance.",
        level: "documented",
        heldAt: "Agora Museum, Athens, and the Kerameikos Museum",
      },
      {
        name: "The kleroterion",
        what: "A stone frame slotted to hold jurors' identity tickets in columns, with a tube down the side releasing black and white balls to select or reject whole rows at random. The Constitution of the Athenians describes the procedure; the object shows it worked.",
        level: "documented",
        heldAt: "Agora Museum, Athens",
      },
      {
        name: "Klepsydra and jurors' equipment",
        what: "A water clock that empties in about six minutes, used to time speeches in court, together with bronze voting ballots with solid and pierced hubs and inscribed bronze identity tickets.",
        level: "documented",
        heldAt: "Agora Museum, Athens",
      },
      {
        name: "Official weights and measures",
        what: "Bronze and clay standards stamped as public property and kept in the Tholos, against which traders' equipment could be checked. Market regulation as a physical object.",
        level: "documented",
        heldAt: "Agora Museum, Athens",
      },
    ],
    interpretation: [
      "The Agora is the site where a constitutional text and an excavation confirm each other in detail. The Constitution of the Athenians describes allotment machines, water clocks, ballots and identity tickets; the excavation produced all of them. That kind of correspondence is rare and it is worth being precise about what it does and does not show: it shows the procedures existed and were used, not that they always worked as intended.",
      "It also shows how much of the machinery was designed against corruption rather than for efficiency. Jurors were allotted late, in public, by a randomising device nobody could predict; speeches were timed by water; ballots were designed so that a voter's choice could not be seen but the count could be checked. These are the artefacts of a system that assumed it would be manipulated.",
      "The square's later history is a slow enclosure. Hellenistic kings filled the edges with stoas and Rome put buildings in the middle, and the open ground where the citizen body could gather steadily became a monumentalised civic park. The archaeology of the fill is a fair record of what happened to the politics.",
    ],
    disputes: [
      {
        question: "Which building is which?",
        positions:
          "Several identifications rest on matching foundations to Pausanias's route and to scattered references, rather than on inscriptions found in place. The Tholos and the Bouleuterion are secure; the Stoa Poikile is now secure by position; some of the smaller structures on the west side have been reassigned more than once. Where a label is an argument rather than a fact, it should be read as one.",
        level: "probable",
      },
      {
        question: "Where did the law courts actually sit?",
        positions:
          "Athenian juries of several hundred needed large enclosures, and the identification of specific court buildings in the square has been contested for decades. Some courts certainly met in buildings on the north-east side; others may have used temporary arrangements in the open. The equipment survives more securely than the venues.",
        level: "disputed",
      },
    ],
    primarySources: [
      S(
        "Description of Greece",
        "1.2–17",
        "Pausanias walks the square in the second century CE and names the buildings and the statues, in an order that has been the excavators' main navigational aid for ninety years.",
        "Pausanias",
      ),
      S(
        "The Constitution of the Athenians",
        "43–69",
        "The council's rota, the allotment of jurors, the water clock, the ballots and the courts, described as working procedure. Attributed to Aristotle or his school; recovered on papyrus in 1879 and published in 1891, which is to say the text was read before most of the objects were dug up.",
        "Aristotle",
      ),
    ],
    museumSlugs: [],
    objectSlugs: [],
    architectureRefs: ["agora", "stoa", "temple", "basilica"],
    institutionRefs: [
      "boule",
      "dikasteria",
      "ostracism",
      "archon",
      "ecclesia",
      "strategos",
    ],
    religionRefs: ["the-sacred-calendar", "greek-priesthood"],
    warfareRefs: [],
    battleRefs: [],
    figureRefs: ["aristotle", "socrates", "zeno-of-citium", "demosthenes"],
    themeRefs: ["democracy", "civic-order", "rule-of-law", "citizenship"],
    bookRefs: ["constitution-of-the-athenians", "politics", "apology-of-socrates"],
    cityRefs: [],
    mapSlugs: ["athens"],
    relatedSites: ["acropolis-of-athens", "roman-forum"],
    imageSlug: "hephaestus-agora",
    gallerySlugs: ["pnyx-athens"],
  },
  {
    slug: "delos",
    name: "Delos",
    kind: "sanctuary",
    region: "aegean",
    standfirst:
      "A small waterless island that held the birthplace of Apollo, the treasury of an Athenian alliance, and later one of the largest slave markets in the Mediterranean.",
    description:
      "Delos — the sanctuary of Apollo, the Delian League treasury, the ritual purification that banned birth and death on the island, the free port of 166 BCE and the French excavations since 1873.",
    geography: {
      modernCountry: "Greece",
      ancientRegion: "The Cyclades",
      latitude: 37.398,
      longitude: 25.269,
      coordinateSubject: "The Sanctuary of Apollo",
      setting:
        "A granite island barely five kilometres long at the centre of the Cyclades, with almost no fresh water, no farmland worth the name and no defensible position. Every reason for its importance is religious or commercial: it sat at the crossing of the Aegean sea routes and it was holy, and for several centuries those two facts reinforced each other.",
    },
    chronology: {
      start: { year: -900, precision: "approximate", display: "c. 900 BCE" },
      end: { year: -69, precision: "exact", display: "69 BCE" },
      status: "documented",
      display: "Sanctuary from the early Iron Age; commercial collapse after the sacks of 88 and 69 BCE",
      phases: [
        {
          label: "The Ionian sanctuary",
          display: "9th–6th centuries BCE",
          level: "documented",
          note: "A gathering place for the island Greeks, with a festival the Homeric Hymn to Apollo already describes. Naxos and then Athens competed to patronise it.",
        },
        {
          label: "The Delian League",
          display: "478–454 BCE",
          level: "documented",
          note: "The alliance formed against Persia kept its treasury in the sanctuary until Athens moved it to the Acropolis. The move is the point at which an alliance becomes an empire, and it is dated by the tribute records.",
        },
        {
          label: "Independence",
          display: "314–166 BCE",
          level: "documented",
          note: "Delos ran its own affairs and its own sanctuary accounts, which survive inscribed in great quantity and are among the best economic documents from the Greek world.",
        },
        {
          label: "The free port",
          display: "166–88 BCE",
          level: "documented",
          note: "Rome gave the island to Athens and declared it a duty-free port, in order to break the trade of Rhodes. The population multiplied, Italian and eastern merchant communities settled, and the slave trade became enormous.",
        },
        {
          label: "The sacks",
          display: "88 and 69 BCE",
          level: "documented",
          note: "Attacked during the Mithridatic wars and again by pirates. The island never recovered, which is why a commercial town of the second century BCE survives largely undisturbed.",
        },
      ],
    },
    civilizations: ["greece", "athens", "hellenistic-world"],
    whatSurvives: [
      "The sanctuary of Apollo with its temples, treasuries, altars and stoas reduced to foundations and column stumps, and beside it the row of archaic marble lions from Naxos — the ones on the terrace are replicas, the originals having been moved indoors after a century of salt weathering.",
      "South and east of the sanctuary is the town: streets, drains, cisterns, shops and houses of the second century BCE standing to a metre or more, several with their floor mosaics in place and their peristyle courts legible. The theatre quarter is the most completely excavated Hellenistic domestic district anywhere.",
      "Also on the island are sanctuaries of gods who were not Greek — Egyptian Serapis and Isis, Syrian deities, and a building generally identified as a synagogue — which is a direct consequence of what the free port did to the population.",
    ],
    excavations: [
      {
        period: "1873–present",
        by: "The French School at Athens",
        level: "documented",
        note: "A hundred and fifty years of continuous excavation and publication. The scale of the exposure is why Delos functions as the type-site for Hellenistic urban life.",
      },
      {
        period: "1904–1914",
        by: "Théophile Homolle and the great campaign",
        level: "documented",
        note: "The decade in which most of the town was uncovered, funded by a private endowment. Rapid, and by later standards under-recorded.",
      },
      {
        period: "1925",
        by: "Drainage of the Sacred Lake",
        level: "documented",
        note: "The lake beside which Leto was said to have given birth was drained as a malaria control measure and has not been refilled. Its bed is marked by a modern wall.",
      },
    ],
    structures: [
      {
        name: "The Terrace of the Lions",
        date: "c. 600 BCE",
        level: "documented",
        note: "Naxian marble lions flanking the processional way to the sanctuary. Between five and sixteen originally; nine survive in various states, one of them in Venice since the seventeenth century.",
      },
      {
        name: "The Temple of the Delians",
        date: "begun 478 BCE, unfinished",
        level: "documented",
        note: "The great Doric temple begun after the Persian wars and left incomplete when the league treasury moved to Athens. The unfinished state is itself the historical evidence.",
        architectureSlug: "temple",
      },
      {
        name: "The theatre and its cistern",
        date: "c. 300 BCE",
        level: "documented",
        note: "Seating for several thousand on a waterless island, with a vast vaulted cistern beneath the terrace collecting the run-off. The cistern is the more remarkable engineering.",
        architectureSlug: "theatre",
      },
      {
        name: "The House of the Masks and the House of Dionysos",
        date: "2nd century BCE",
        level: "documented",
        note: "Peristyle houses with figured floor mosaics in place, including a Dionysos on a panther. Domestic architecture of a mercantile elite, preserved because the town was abandoned rather than rebuilt.",
        architectureSlug: "house-and-insula",
      },
      {
        name: "The Serapeia",
        date: "3rd–2nd centuries BCE",
        level: "documented",
        note: "Three separate sanctuaries of Egyptian gods, one of which preserves an inscribed foundation account by the priest whose family brought the cult from Memphis — a rare first-person record of how a cult travelled.",
      },
    ],
    finds: [
      {
        name: "The sanctuary accounts",
        what: "Hundreds of inscriptions recording the temple's income, loans, rents, repairs and inventories, year by year. They are the densest surviving financial record of any Greek institution.",
        level: "documented",
        heldAt: "Delos Archaeological Museum and the epigraphic corpora",
      },
      {
        name: "Archaic Naxian sculpture",
        what: "The lions, and fragments of a colossal kouros of Apollo whose base survives in place. Pieces of the colossus are on the island and one hand is in the British Museum.",
        level: "documented",
        museumSlug: "british-museum",
      },
      {
        name: "Hellenistic portrait sculpture",
        what: "Including the so-called pseudo-athlete from the House of the Diadoumenos, an idealised nude body carrying an unflinching individual portrait head — the visual signature of the Italian merchant class on the island.",
        level: "documented",
        museumSlug: "national-archaeological-museum-athens",
      },
    ],
    interpretation: [
      "Delos is the clearest case in Greek archaeology of religion, politics and money occupying the same square metres. The sanctuary's neutrality made it a safe deposit, the deposit made it politically valuable, Athens took the deposit, and six centuries later Rome made the same island a tax-free market because it was already a place where everyone came.",
      "The purification of 426 BCE is the sharpest single fact about the site. On Athenian instruction all the graves on the island were dug up and moved to neighbouring Rheneia, and thereafter nobody was permitted to be born or to die on Delos. It is a documented, dated act of ritual policy carried out at state scale, and the emptied graves were found where Thucydides said they were put.",
      "The town is where the island earns its place in economic history. Hellenistic domestic architecture is usually known from fragments; here there are whole blocks, with shops, storerooms and the amphora evidence of what moved through them. Strabo's line about ten thousand slaves changing hands in a day is a rhetorical figure and should not be quoted as a statistic, but the market's scale is not in doubt.",
    ],
    disputes: [
      {
        question: "How large was the population at its peak?",
        positions:
          "Estimates for the free-port period run from around ten thousand to upwards of twenty-five thousand, derived from the excavated housing area and assumed densities. No ancient figure exists for the resident population. The number is an inference from floor space and should be treated as one.",
        level: "unknown",
      },
      {
        question: "When did the league treasury actually move?",
        positions:
          "The conventional date of 454 BCE rests on the beginning of the Athenian tribute quota lists, which record the sixtieth part paid to Athena at Athens. That is strong evidence that the money was at Athens by then, and weaker evidence about the moment or the motive of the decision. Plutarch's account of the debate is much later.",
        level: "probable",
      },
    ],
    primarySources: [
      S(
        "History of the Peloponnesian War",
        "3.104",
        "The purification of 426 BCE, the removal of the graves to Rheneia, the revival of the festival, and a quotation of the Homeric Hymn to Apollo as evidence for the antiquity of the gathering. Thucydides doing archaeology.",
        "Thucydides",
      ),
      S(
        "Histories",
        "6.97",
        "Datis anchors off Delos in 490 BCE and refuses to harm the island, burning three hundred talents of frankincense on the altar. Persian policy towards a Greek sanctuary, recorded by a Greek.",
        "Herodotus",
      ),
      S(
        "Geography",
        "14.5.2",
        "Strabo on Delos as a slave market able to receive and dispatch ten thousand in a day. A proverbial figure rather than a count, and it is quoted as one here.",
        "Strabo",
      ),
    ],
    museumSlugs: ["national-archaeological-museum-athens", "british-museum"],
    objectSlugs: [],
    architectureRefs: ["temple", "theatre", "house-and-insula", "stoa", "harbour"],
    institutionRefs: [],
    religionRefs: [
      "sanctuary-treasuries",
      "purification-and-pollution",
      "the-isis-cult",
      "serapis",
      "the-sacred-calendar",
    ],
    warfareRefs: [],
    battleRefs: [],
    figureRefs: ["thucydides", "herodotus", "pericles"],
    themeRefs: ["naval-empire", "hellenization", "empire-and-diversity"],
    bookRefs: ["history-of-the-peloponnesian-war", "herodotus-histories"],
    cityRefs: ["athens", "alexandria"],
    mapSlugs: ["ancient-greece", "mediterranean"],
    relatedSites: ["acropolis-of-athens", "eleusis", "epidaurus"],
    imageSlug: "delos-terrace-of-the-lions",
  },
  {
    slug: "eleusis",
    name: "Eleusis",
    alsoKnownAs: ["Elefsina"],
    kind: "sanctuary",
    region: "aegean",
    standfirst:
      "The sanctuary where Greeks were initiated for a thousand years under an oath of silence that held — and where the archaeology tells us the hall, the crowd and the calendar, but not the rite.",
    description:
      "Eleusis and the sanctuary of Demeter and Kore — the Telesterion, the excavation from 1882, what the Mysteries can be shown to have involved, and why the accounts of the secret are all late and hostile.",
    geography: {
      modernCountry: "Greece",
      ancientRegion: "Attica",
      latitude: 38.041,
      longitude: 23.538,
      coordinateSubject: "The Telesterion",
      setting:
        "On the bay opposite Salamis, at the foot of a low acropolis about twenty kilometres west of Athens along the Sacred Way. Fertile plain behind it, sheltered water in front. The modern town is heavily industrial, and the sanctuary sits in the middle of it.",
    },
    chronology: {
      start: { year: -1400, precision: "approximate", display: "c. 1400 BCE" },
      end: { year: 396, precision: "exact", display: "396 CE" },
      status: "probable",
      display: "Bronze Age building beneath; cult attested from the Archaic period to 396 CE",
      phases: [
        {
          label: "Bronze Age building",
          display: "c. 1400–1200 BCE",
          level: "disputed",
          note: "A megaron-like structure was found under the later hall. Whether it was a cult building, and whether any practice continued unbroken from it to the historical Mysteries, is argued and not settled.",
        },
        {
          label: "Archaic sanctuary",
          display: "7th–6th centuries BCE",
          level: "documented",
          note: "The first hall of initiation, expanded under the Peisistratids. Eleusis is absorbed into the Athenian state and the Mysteries become an Athenian institution administered by two priestly families.",
        },
        {
          label: "The Periclean Telesterion",
          display: "mid-5th century BCE",
          level: "documented",
          note: "The hall rebuilt at its largest, roofed, with rock-cut tiers on all four sides for several thousand initiates. This is the building the classical Mysteries happened in.",
        },
        {
          label: "Roman patronage",
          display: "1st–2nd centuries CE",
          level: "documented",
          note: "Emperors were initiated and paid for building. Marcus Aurelius rebuilt after a raid in the 170s; the Greater Propylaia copies the Athenian Propylaia directly.",
        },
        {
          label: "Closure",
          display: "late 4th century CE",
          level: "documented",
          note: "The sanctuary was destroyed in the invasion of 396 CE and was not restored; the Theodosian legislation against pagan cult had already made its continuation impossible.",
        },
      ],
    },
    civilizations: ["athens", "greece"],
    whatSurvives: [
      "The Telesterion survives as a great rectangular platform cut into the rock of the hillside, with the tiers of steps on which the initiates stood still visible on three sides and the bases of the interior columns in place. In the middle are the foundations of the small enclosed building, the Anaktoron, which only the hierophant entered.",
      "In front of it are the two Roman propylaia, one a direct copy of the entrance to the Athenian Acropolis, and beside the outer gate the paved well the Homeric Hymn calls Kallichoron — the maiden well, where Demeter was said to have sat. The cave identified as the entrance to the underworld is on the north side of the court.",
      "What does not survive, because it never existed in material form, is any depiction of the rite. In a thousand years of Greek art, with the sanctuary a few hours' walk from the largest concentration of vase painters in the Mediterranean, nobody drew what happened inside the hall.",
    ],
    excavations: [
      {
        period: "1812",
        by: "The Society of Dilettanti and E. D. Clarke's removal",
        level: "documented",
        note: "A colossal caryatid from the Lesser Propylaia was taken to Cambridge, where it remains. The villagers reportedly resisted its removal, believing the statue protected the harvest.",
      },
      {
        period: "1882–1890s",
        by: "Dimitrios Philios, Greek Archaeological Society",
        level: "documented",
        note: "The first systematic excavation, which established the plan of the sanctuary and the sequence of the Telesterion's rebuildings.",
      },
      {
        period: "1917–1945",
        by: "Konstantinos Kourouniotis",
        level: "documented",
        note: "Excavation of the earlier phases beneath the classical hall, including the Bronze Age structure.",
      },
      {
        period: "1930s–1960s",
        by: "George Mylonas",
        level: "documented",
        note: "Final publication of the sanctuary in 1961, still the standard account, and a deliberately restrained one about the content of the rite.",
      },
    ],
    structures: [
      {
        name: "The Telesterion",
        date: "successive halls, 6th century BCE – 2nd century CE",
        level: "documented",
        note: "Square, roofed, internally columned, with stepped standing room around the walls — a building type with no other real parallel in Greek architecture, because no other Greek ritual required several thousand people indoors.",
      },
      {
        name: "The Anaktoron",
        date: "in every phase of the hall",
        level: "documented",
        note: "A small rectangular structure kept in the same position through every rebuilding, so that the hall was enlarged around it. Its position is fixed and documented; what was kept in it is not.",
      },
      {
        name: "The Greater Propylaia",
        date: "2nd century CE",
        level: "documented",
        note: "A direct architectural quotation of the Propylaia on the Athenian Acropolis, built with imperial money. The quotation is the message.",
        architectureSlug: "architectural-orders",
      },
      {
        name: "The Kallichoron well",
        date: "6th century BCE, rebuilt later",
        level: "documented",
        note: "A round marble-curbed well outside the gate, on the spot the Homeric Hymn names. One of the few cases where a Greek cult text and a Greek excavation point at the same stone.",
      },
    ],
    finds: [
      {
        name: "The Eleusis relief",
        what: "A large votive relief showing Demeter, Kore and a boy usually identified as Triptolemos. One of the defining works of fifth-century sculpture, and one of the very few images the sanctuary produced of its own deities in action.",
        level: "documented",
        museumSlug: "national-archaeological-museum-athens",
      },
      {
        name: "The Protoattic amphora",
        what: "A large seventh-century BCE burial jar from Eleusis painted with the blinding of Polyphemus and the pursuit of Perseus by the Gorgons — among the earliest surviving narrative scenes from Greek myth.",
        level: "documented",
        heldAt: "Archaeological Museum of Eleusis",
      },
      {
        name: "Kernoi and plemochoai",
        what: "Ritual vessel types found in quantity at the sanctuary and almost nowhere else. That they were used is documented; what was done with them is inference from their shape and from scattered references.",
        level: "probable",
        heldAt: "Archaeological Museum of Eleusis",
      },
      {
        name: "The Eleusis caryatid",
        what: "One of two colossal basket-bearing figures from the Lesser Propylaia, removed in 1812 and now in the Fitzwilliam Museum, Cambridge. Its pair remains at Eleusis.",
        level: "documented",
        heldAt: "Fitzwilliam Museum, Cambridge",
      },
    ],
    interpretation: [
      "The framework of the Mysteries is well documented and largely uncontroversial: an annual festival in the month of Boedromion, a preliminary stage at Athens, a purification in the sea, a procession of many thousands along the Sacred Way carrying sacred objects, a fast broken with a barley drink, and a night in the Telesterion after which the initiate was held to have a better lot after death. Initiation was open to anyone who spoke Greek and had not committed homicide, including women and enslaved people, which is unusual enough to be worth stating plainly.",
      "What happened inside the hall is not known. The oath of secrecy held for a millennium, and the accounts that claim to reveal it are all late, all Christian and all polemical — they are evidence for how Christian apologists argued about pagan cult, not for what fifth-century initiates saw. Reconstructions involving grain, a birth, a light, or a drug are hypotheses of varying quality, and this platform states them as hypotheses or not at all.",
      "The secrecy was enforceable in law. Alcibiades was condemned in his absence in 415 BCE for profaning the Mysteries in a private house, and the charge was serious enough to lose Athens its most capable commander at the worst possible moment. Aeschylus was said to have faced the same accusation. The Mysteries were not a mood; they were an institution with sanctions.",
      "Pausanias, who describes everything, reaches the wall of the sanctuary and stops, saying a dream forbade him to write what is inside. A traveller whose entire method is description recording that he chose not to describe is the best single piece of evidence for how the secret was kept.",
    ],
    disputes: [
      {
        question: "Was there continuity from the Bronze Age?",
        positions:
          "A Mycenaean building lies under the Telesterion, and the sanctuary's later ideology claimed extreme antiquity. Whether the building was religious, and whether any practice survived the collapse of the Mycenaean world to re-emerge centuries later, is argued from stratigraphy that is neither continuous nor conclusive. The claim of continuity is ancient; the evidence for it is not.",
        level: "disputed",
      },
      {
        question: "Was the kykeon psychoactive?",
        positions:
          "A hypothesis published in 1978 proposed that the barley drink carried ergot alkaloids and that the experience was pharmacological. It has been influential in popular writing and has never been substantiated: no residue analysis supports it, ergotised barley is toxic in ways the sources do not describe, and the argument runs from a modern assumption about what could produce such an effect. It is recorded here as a modern hypothesis, not as a finding.",
        level: "disputed",
      },
    ],
    primarySources: [
      S(
        "Description of Greece",
        "1.38.7",
        "Pausanias reaches the sanctuary wall and stops: a dream forbade him to describe what lies within. The most valuable non-description in ancient literature.",
        "Pausanias",
      ),
      S(
        "Histories",
        "8.65",
        "Herodotus' story of the dust cloud and the Iacchus cry rising from Eleusis before Salamis, told as a portent reported by an exile. Evidence for what the procession sounded like, embedded in a piece of wartime omen literature.",
        "Herodotus",
      ),
      S(
        "Homeric Hymn to Demeter",
        "1–495",
        "The founding narrative: the abduction of Persephone, Demeter's search, her stay at Eleusis and her instruction to build the hall. The Kallichoron well and the sanctuary's position appear in it, and it is the closest thing to a charter the cult has.",
      ),
    ],
    museumSlugs: ["national-archaeological-museum-athens"],
    objectSlugs: [],
    architectureRefs: ["temple", "architectural-orders", "construction-methods"],
    institutionRefs: ["archon", "ecclesia"],
    religionRefs: [
      "mystery-initiation",
      "purification-and-pollution",
      "impiety-and-asebeia",
      "the-sacred-calendar",
      "greek-priesthood",
    ],
    warfareRefs: [],
    battleRefs: ["salamis"],
    figureRefs: ["alcibiades", "herodotus", "plato"],
    themeRefs: ["state-and-religion", "afterlife-and-order", "civic-order"],
    bookRefs: ["herodotus-histories"],
    cityRefs: ["athens"],
    mapSlugs: ["athens"],
    relatedSites: ["acropolis-of-athens", "athenian-agora", "epidaurus", "delos"],
    imageSlug: "eleusis-telesterion",
    gallerySlugs: ["polyphemus-amphora-eleusis"],
  },
  {
    slug: "epidaurus",
    name: "Epidaurus, the Sanctuary of Asklepios",
    kind: "sanctuary",
    region: "aegean",
    standfirst:
      "A healing sanctuary that inscribed its own miracle stories on stone and published its building accounts beside them — the theatre is famous, the paperwork is more interesting.",
    description:
      "The Asklepieion at Epidaurus — the abaton and incubation, the inscribed cure records, the temple building accounts naming contractors and costs, and the theatre attributed to Polykleitos.",
    geography: {
      modernCountry: "Greece",
      ancientRegion: "The Argolid",
      latitude: 37.596,
      longitude: 23.079,
      coordinateSubject: "The theatre",
      setting:
        "An inland valley about eight kilometres from the coastal town of Epidaurus, ringed by hills, with springs. The sanctuary is deliberately away from the city: the sick came to it, and it developed the accommodation, water supply and stadium of a place that expected people to stay.",
    },
    chronology: {
      start: { year: -600, precision: "approximate", display: "c. 600 BCE" },
      end: { year: 426, precision: "exact", display: "426 CE" },
      status: "documented",
      display: "Cult from the 6th century BCE; monumental from c. 400 BCE; closed in the 5th century CE",
      phases: [
        {
          label: "Early cult",
          display: "6th–5th centuries BCE",
          level: "documented",
          note: "An older cult of Apollo Maleatas on the hill above, into which Asklepios is introduced. The sanctuary's rise is genuinely rapid and roughly contemporary with the plague years at Athens.",
        },
        {
          label: "The building programme",
          display: "c. 400–320 BCE",
          level: "documented",
          note: "Temple, tholos, abaton, propylaia, stadium and theatre, funded by the sanctuary's own income and dated by inscribed accounts rather than by style.",
        },
        {
          label: "Roman rebuilding",
          display: "2nd century CE",
          level: "documented",
          note: "Baths, a library and new accommodation, largely paid for by the Roman senator Antoninus. The sanctuary was still fully functional five hundred years after its expansion.",
        },
        {
          label: "Closure",
          display: "4th–5th centuries CE",
          level: "documented",
          note: "Damaged by raids, then closed under the anti-pagan legislation. A Christian basilica was built inside the sanctuary.",
        },
      ],
    },
    civilizations: ["greece"],
    whatSurvives: [
      "The theatre is the most complete Greek theatre in existence: fifty-five tiers of original seating, the circular orchestra intact, and enough of the stage building to reconstruct the rest. It is still used, and its acoustics are genuinely exceptional, though the popular claim that a whisper carries to the back row is a demonstration effect rather than a measured one.",
      "The sanctuary itself is foundations: the temple of Asklepios, the long stoa of the abaton where the sick slept, the round tholos with its extraordinary underground labyrinth of concentric walls, the propylaia, the guest-house of a hundred and sixty rooms, and the stadium cut into the slope with its stone starting sill in place.",
      "The tholos has been partly re-erected in recent decades using surviving blocks and new marble, a reconstruction carried out under the same reversibility principles as the Acropolis work and clearly identifiable as modern.",
    ],
    excavations: [
      {
        period: "1881–1928",
        by: "Panagiotis Kavvadias, Greek Archaeological Society",
        level: "documented",
        note: "Uncovered the sanctuary and, critically, the inscribed stelae — both the cure records and the building accounts. Kavvadias published the inscriptions promptly, which is why they entered scholarship as fast as they did.",
      },
      {
        period: "1948–present",
        by: "Greek Archaeological Service and the Committee for the Preservation of the Epidaurus Monuments",
        level: "documented",
        note: "Study, anastylosis of the tholos and the temple façade, and continued excavation of the Apollo Maleatas sanctuary on the hill above.",
      },
    ],
    structures: [
      {
        name: "The theatre",
        date: "later 4th century BCE, upper tiers 2nd century BCE",
        level: "documented",
        note: "Pausanias attributes it to Polykleitos. The famous sculptor of that name belongs to the fifth century and the building to the fourth, so the attribution is either to a younger namesake or is simply mistaken.",
        architectureSlug: "theatre",
      },
      {
        name: "The Temple of Asklepios",
        date: "c. 380–375 BCE",
        level: "documented",
        note: "Doric, modest in size, and dated precisely because its building accounts survive on stone. They name the architect Theodotos, the contractors, the penalties for late delivery and the cost of transporting the ivory.",
        architectureSlug: "temple",
      },
      {
        name: "The tholos",
        date: "c. 360–320 BCE",
        level: "documented",
        note: "A round building of exceptional refinement with three concentric underground walls forming a spiral passage beneath the floor. What the passage was for is not known; snakes, water and ritual movement have all been proposed.",
        architectureSlug: "columns-and-capitals",
      },
      {
        name: "The abaton",
        date: "4th century BCE, extended later",
        level: "documented",
        note: "A two-storey stoa where patients slept in the expectation of a dream from the god. The architecture is ordinary and the function is not; this is the building the cure inscriptions describe.",
        architectureSlug: "stoa",
      },
      {
        name: "The katagogion",
        date: "4th century BCE",
        level: "documented",
        note: "A square guest-house of four courtyards and about a hundred and sixty rooms. Sanctuaries at this scale were also an accommodation industry.",
      },
    ],
    finds: [
      {
        name: "The iamata",
        what: "Large stelae inscribed with accounts of cures: a man's blindness healed, a woman pregnant for five years delivered, a spear-head removed. Pausanias saw six of these; four survive substantially. That the stones were carved and displayed in the fourth century BCE is documented. What they record is religious testimony, published by the sanctuary about itself.",
        level: "documented",
        heldAt: "Archaeological Museum of Epidaurus",
      },
      {
        name: "The building accounts",
        what: "Inscribed records of the temple and tholos construction: contractors named, sums paid, materials sourced, guarantors listed and fines levied. Among the most detailed documentation of an ancient building project anywhere, and the reason Epidaurus dates so much better than most Greek sanctuaries.",
        level: "documented",
        heldAt: "Archaeological Museum of Epidaurus, and the epigraphic corpora",
      },
      {
        name: "Anatomical votives",
        what: "Terracotta and marble models of legs, eyes, ears and other body parts, dedicated in thanks for a cure. They record what people came with, which is a kind of epidemiology, subject to the obvious bias that only successes were dedicated.",
        level: "documented",
        heldAt: "Archaeological Museum of Epidaurus",
      },
      {
        name: "Sculpture from the temple pediments",
        what: "Fragments of an Amazonomachy and a sack of Troy, together with an inscribed record naming the sculptor Timotheos. Divided between Athens and the site museum.",
        level: "documented",
        museumSlug: "national-archaeological-museum-athens",
      },
    ],
    interpretation: [
      "Epidaurus is the best evidence there is for how ancient healing cult actually worked, and it works differently from how it is usually described. The patient arrived, purified, sacrificed, and slept in the abaton; the god appeared in a dream and either treated the patient directly or prescribed something; the patient paid a fee and, if cured, dedicated a model of the affected part. Priests are barely visible in the records. The transaction is between the sleeper and the dream.",
      "The relationship with Hippocratic medicine is not one of competition. The same people used both; the temple accepted patients medicine had failed; and several of the prescriptions recorded in the iamata — exercise, bathing, diet — are indistinguishable from ordinary medical advice. Where the inscriptions describe surgery performed in a dream, the register changes completely, and the platform does not attempt to rationalise those cases into plausible operations.",
      "The building accounts are a separate and underrated body of evidence. They show a sanctuary functioning as a client with a budget: competitive contracts, sureties, penalty clauses, itemised transport. Almost everything general accounts say about how Greek temples were financed and built rests disproportionately on this one site's paperwork.",
    ],
    disputes: [
      {
        question: "Who designed the theatre and the tholos?",
        positions:
          "Pausanias names Polykleitos for both. The dates do not fit the famous fifth-century sculptor, so the standard solution is a Polykleitos the Younger, otherwise almost unattested. The alternative is that Pausanias, writing five hundred years later, attached a famous name to two admired buildings. Neither can be shown.",
        level: "disputed",
      },
      {
        question: "What are the cure inscriptions evidence for?",
        positions:
          "They are unambiguous evidence for what the sanctuary published and therefore for what visitors were expected to believe. They are not evidence that the events described occurred. Attempts to reinterpret them as records of drugged sleep, of surgery performed by priests in the dark, or of psychosomatic recovery are modern reconstructions, sometimes plausible and never demonstrated, and the inscriptions themselves describe none of these things.",
        level: "disputed",
      },
    ],
    primarySources: [
      S(
        "Description of Greece",
        "2.26–29",
        "Pausanias on the sanctuary: the birth story of Asklepios, the prohibition on dying or giving birth within the precinct, the stelae of cures, and the attribution of the theatre and tholos to Polykleitos.",
        "Pausanias",
      ),
      S(
        "Geography",
        "8.6.15",
        "Strabo's brief notice of the sanctuary as always full of the sick and of the tablets recording cures.",
        "Strabo",
      ),
    ],
    museumSlugs: ["national-archaeological-museum-athens"],
    objectSlugs: [],
    architectureRefs: ["theatre", "temple", "stoa", "columns-and-capitals"],
    institutionRefs: [],
    religionRefs: [
      "healing-cult-and-incubation",
      "votive-dedication",
      "the-vow-and-the-contract",
      "purification-and-pollution",
      "greek-priesthood",
    ],
    warfareRefs: [],
    battleRefs: [],
    figureRefs: ["plato"],
    themeRefs: ["state-and-religion", "civic-order"],
    bookRefs: [],
    cityRefs: ["corinth", "athens"],
    mapSlugs: ["ancient-greece"],
    relatedSites: ["eleusis", "delos", "acropolis-of-athens"],
    imageSlug: "epidaurus-theatre",
  },
  {
    slug: "vergina",
    name: "Vergina, the royal tombs of Aigai",
    alsoKnownAs: ["Aigai", "Aegae"],
    kind: "necropolis",
    region: "aegean",
    standfirst:
      "An unlooted Macedonian royal tomb opened in 1977, with a gold chest, a painted façade and a body — and a forty-year argument about whether the body is Philip II.",
    description:
      "Vergina — the Great Tumulus, Manolis Andronikos's 1977 excavation, Tombs I, II and III, the palace of Aigai, and the unresolved identification of the occupant of Tomb II.",
    geography: {
      modernCountry: "Greece",
      ancientRegion: "Macedonia",
      latitude: 40.481,
      longitude: 22.317,
      coordinateSubject: "The Great Tumulus",
      setting:
        "At the northern foot of the Pierian mountains, above the plain of the Haliakmon, at the point where the Macedonian highlands meet the coastal lowland. Aigai was the old royal seat and remained the burial place of the dynasty after the administrative capital moved to Pella.",
    },
    chronology: {
      start: { year: -1000, precision: "approximate", display: "c. 1000 BCE" },
      end: { year: -168, precision: "exact", display: "168 BCE" },
      status: "documented",
      display: "Iron Age cemetery from c. 1000 BCE; royal centre to the Roman conquest of 168 BCE",
      phases: [
        {
          label: "The Iron Age cemetery",
          display: "c. 1000–700 BCE",
          level: "documented",
          note: "Several hundred tumuli on the plain, excavated from the 1950s. The place was a burial ground for three centuries before there was a Macedonian kingdom to speak of.",
        },
        {
          label: "The royal capital",
          display: "6th–4th centuries BCE",
          level: "documented",
          note: "Palace, theatre, sanctuaries and city wall. Philip II was assassinated in the theatre here in 336 BCE while attending his daughter's wedding.",
        },
        {
          label: "The royal tombs",
          display: "later 4th century BCE",
          level: "documented",
          note: "The Great Tumulus was raised over a group of tombs, at least two of them unlooted. The mound itself may have been heaped to protect them after the Gallic raids of the 270s BCE.",
        },
        {
          label: "Roman destruction",
          display: "168 BCE and after",
          level: "documented",
          note: "Aigai was destroyed after the Roman defeat of Perseus and never rebuilt at scale, which is why the site is recoverable.",
        },
      ],
    },
    civilizations: ["macedon", "greece"],
    whatSurvives: [
      "The Great Tumulus, a mound over a hundred metres across, now hollowed out and roofed as an underground museum with the tomb façades left in position and the finds displayed a few metres from where they were found. It is one of the few museums in the world that is the site.",
      "Tomb I is a cist grave, robbed in antiquity, with a wall painting of the abduction of Persephone that is among the very few surviving original Greek paintings of the fourth century BCE. Tomb II is a barrel-vaulted two-chamber tomb with a painted hunting frieze across its Doric façade, found intact. Tomb III, also unlooted, held a young man.",
      "Above the tumulus, the palace of Aigai has been excavated and consolidated over decades and reopened to the public after a long restoration programme — a very large peristyle building with mosaic floors, a banqueting suite and a monumental façade over the theatre.",
    ],
    excavations: [
      {
        period: "1855–1861",
        by: "Léon Heuzey and Honoré Daumet",
        level: "documented",
        note: "The French mission located and partly cleared the palace. The identification of the site as Aigai was not made then and remained disputed for over a century.",
      },
      {
        period: "1937–1976",
        by: "Manolis Andronikos and others",
        level: "documented",
        note: "The Iron Age cemetery, the palace and the theatre. Nicholas Hammond's argument in 1968 that Vergina was Aigai rather than Edessa is what redirected the search to the Great Tumulus.",
      },
      {
        period: "November 1977",
        by: "Manolis Andronikos",
        level: "documented",
        note: "Tomb II opened, unlooted: a gold larnax with a sixteen-rayed star on the lid holding cremated bone, a gold wreath, iron and gold armour, silver vessels, and in the antechamber a second burial of a woman with a gilded quiver. The most consequential Greek excavation of the twentieth century.",
      },
      {
        period: "1978–present",
        by: "Aristotle University of Thessaloniki",
        level: "documented",
        note: "Tomb III, the heroon above the tumulus, the city, the sanctuary of Eukleia, and the continuing study of the human remains — which is where the argument now lives.",
      },
    ],
    structures: [
      {
        name: "Tomb II",
        date: "c. 340–310 BCE",
        level: "documented",
        note: "Barrel-vaulted, two chambers, with a Doric façade carrying a painted frieze of a lion hunt. Unlooted, with its marble doors closed.",
        architectureSlug: "mausoleum",
      },
      {
        name: "Tomb I",
        date: "c. 350–330 BCE",
        level: "documented",
        note: "A cist grave, robbed, whose walls carry the Persephone painting. The painting survives because robbers take gold and not plaster.",
      },
      {
        name: "The palace of Aigai",
        date: "c. 340s BCE",
        level: "documented",
        note: "A vast square peristyle building with a mosaic-floored banqueting suite, probably built under Philip II. Its scale is the physical measure of what Macedonian kingship had become.",
        architectureSlug: "palace",
      },
      {
        name: "The theatre",
        date: "mid-4th century BCE",
        level: "documented",
        note: "Immediately below the palace. The place where Philip II was killed, according to Diodorus — the identification of the venue is secure, the reconstruction of the event is not.",
        architectureSlug: "theatre",
      },
    ],
    finds: [
      {
        name: "The gold larnax and wreath from Tomb II",
        what: "A gold chest with a rayed star on its lid, holding cremated bone wrapped in purple cloth, and a gold oak wreath of exceptional workmanship. Weight, workmanship and the absence of looting make this the richest documented Greek burial assemblage.",
        level: "documented",
        heldAt: "Museum of the Royal Tombs of Aigai, Vergina",
      },
      {
        name: "The hunting frieze",
        what: "A painted frieze across the façade of Tomb II showing a lion hunt with ten figures in a landscape. Original fourth-century Greek painting of this scale survives almost nowhere else, and identifications of individual figures as Philip or Alexander are proposals, not readings.",
        level: "disputed",
        heldAt: "In position, Vergina",
      },
      {
        name: "The armour and the greaves",
        what: "An iron cuirass with gold fittings, a gilded gorytos of Scythian type, and a pair of bronze greaves of unequal length. The greaves are one of the central pieces of evidence in the identification argument.",
        level: "documented",
        heldAt: "Museum of the Royal Tombs of Aigai, Vergina",
      },
      {
        name: "The Persephone painting",
        what: "Hades seizing Persephone into a chariot, painted directly on the wall of Tomb I in rapid, confident strokes. Attributed by some to Nikomachos; the attribution rests on style and on ancient lists of painters, not on any signature.",
        level: "probable",
        heldAt: "In position, Vergina",
      },
    ],
    interpretation: [
      "Vergina changed what could be said about Macedonian material culture. Before 1977 Macedonia was largely a textual kingdom, described by Athenian orators who despised it; afterwards it was a kingdom with monumental painting, goldwork and architecture of the first rank, which made the Athenian characterisation of it as a half-barbarian frontier state look like what it was, which is polemic.",
      "The tombs are also the best evidence for Macedonian burial practice at the top of society: cremation, a vaulted chamber, weapons and drinking equipment, a wreath, and a mound. The vaulted chamber matters because barrel vaulting in Greece appears at roughly this moment, and the date of its introduction is one of the arguments in the identification dispute.",
      "The rayed star on the larnax became a modern political symbol in the 1990s during the dispute over the name of the neighbouring republic. That is a fact about the twentieth century and not about the fourth century BCE, and it is worth keeping the two firmly apart when reading anything written about this site since 1991.",
    ],
    disputes: [
      {
        question: "Who is buried in Tomb II?",
        positions:
          "Andronikos identified the occupant as Philip II, killed in 336 BCE, and the identification is still widely held: the wealth, the date range, the greaves of unequal length matching Philip's recorded leg wound, and the traces some have read as an eye injury. The opposing case, argued by Phyllis Lehmann, Eugene Borza, Olga Palagia and others, holds that the barrel vault is too early for 336, that the Scythian gorytos and some pottery point later, and that the occupants are Philip III Arrhidaeus and Adea Eurydice, who died in 317 and were reburied at Aigai. A 2015 study proposed instead that Tomb I holds Philip II, on the basis of a fused knee joint in one skeleton. Osteological work since has been read both ways. There is no consensus, and pages that state one answer flatly are not reporting the state of the evidence.",
        level: "disputed",
      },
      {
        question: "Whom does the hunting frieze show?",
        positions:
          "Proposals identify individual riders as Philip II, Alexander, or a generic royal group, and read the setting as Macedonian or Asian. Each identification implies a different date for the tomb and therefore a different occupant, which is why the painting is argued about as hard as the bones.",
        level: "disputed",
      },
    ],
    primarySources: [
      S(
        "Library of History",
        "16.91–95",
        "Diodorus on the wedding at Aigai and the assassination of Philip II in the theatre by Pausanias of Orestis, with the ceremonial that preceded it. The fullest ancient account of the event the site is famous for.",
        "Diodorus Siculus",
      ),
      S(
        "Life of Alexander",
        "2–3, 9–10",
        "Plutarch on Philip's court, the quarrel at the wedding of Attalus's niece, and the aftermath of the murder — written four centuries later and from a biographical rather than an archaeological interest.",
        "Plutarch",
      ),
    ],
    museumSlugs: [],
    objectSlugs: [],
    architectureRefs: ["mausoleum", "necropolis", "palace", "theatre"],
    institutionRefs: [],
    religionRefs: ["hero-cult"],
    warfareRefs: ["macedonian-army", "companion-cavalry", "armour"],
    battleRefs: ["chaeronea"],
    figureRefs: ["philip-ii", "alexander", "plutarch", "demosthenes"],
    themeRefs: ["kingship-and-legitimacy", "succession-crisis", "monumentality"],
    bookRefs: ["life-of-alexander"],
    cityRefs: [],
    mapSlugs: ["ancient-greece", "alexander-empire"],
    relatedSites: ["mycenae", "acropolis-of-athens"],
    imageSlug: "vergina-tomb-facade",
  },
  // ─── The Roman world ─────────────────────────────────────────────────
  {
    slug: "roman-forum",
    name: "The Roman Forum",
    alsoKnownAs: ["Forum Romanum", "Campo Vaccino"],
    kind: "civic-centre",
    region: "roman",
    standfirst:
      "A drained marsh that became the political centre of an empire, then a cow pasture, then the site where stratigraphic archaeology was invented in Rome.",
    description:
      "The Roman Forum as an excavated site — Giacomo Boni's stratigraphy, the Lapis Niger and the oldest Latin inscription from Rome, the buildings that survived by becoming churches, and the road Mussolini drove through it.",
    parentCitySlug: "rome",
    geography: {
      modernCountry: "Italy",
      ancientRegion: "Latium",
      latitude: 41.893,
      longitude: 12.485,
      coordinateSubject: "The Curia Julia",
      setting:
        "A low, damp valley between the Capitoline, Palatine and Velian hills, with a stream running through it. It was a burial ground before it was a square, and it became usable only once it was drained by the channel later monumentalised as the Cloaca Maxima. Every route through early Rome converged there, which is why it became the meeting place rather than the market of a particular quarter.",
    },
    chronology: {
      start: { year: -1000, precision: "approximate", display: "c. 1000 BCE" },
      end: { year: 608, precision: "exact", display: "608 CE" },
      status: "documented",
      display: "Burial ground from c. 1000 BCE; public square from c. 600 BCE; last monument 608 CE",
      phases: [
        {
          label: "The cemetery",
          display: "c. 1000–800 BCE",
          level: "documented",
          note: "Cremation and inhumation burials found by Boni beneath the later pavement. The valley was outside the settlements on the hills, which is where the dead went.",
        },
        {
          label: "The square",
          display: "c. 600 BCE",
          level: "probable",
          note: "Drainage, the first paving and the first public buildings. The traditional attribution of the drainage to the Tarquins is a literary tradition that the archaeological date does not contradict.",
        },
        {
          label: "The Republican forum",
          display: "5th–1st centuries BCE",
          level: "documented",
          note: "Temples, the speaker's platform, the senate house, the basilicas, and a square progressively too small for the business done in it.",
        },
        {
          label: "The imperial forum",
          display: "1st century BCE – 4th century CE",
          level: "documented",
          note: "Caesar and his successors built new fora alongside rather than in it, and the old square became increasingly commemorative: arches, honorific columns, and a temple to the deified Caesar on the spot where he was cremated.",
        },
        {
          label: "Field and quarry",
          display: "7th–18th centuries CE",
          level: "documented",
          note: "Silted, grazed, and mined for marble and lime. Several buildings survive only because they were converted into churches; the rest supplied stone for Renaissance Rome.",
        },
      ],
    },
    civilizations: ["rome", "roman-republic", "principate", "high-empire"],
    whatSurvives: [
      "The square is now a hollow several metres below the modern street, because the excavations of the nineteenth and twentieth centuries removed the accumulated fill down to the imperial pavement and in places well below it.",
      "Three buildings stand more or less whole, and all three survive for the same reason: they were converted to Christian use. The Curia Julia is the senate house, restored to its Diocletianic form when the church built inside it was stripped out in the 1930s. The Temple of Antoninus and Faustina keeps its full portico because a church was built between the columns. The round Temple of Romulus keeps its bronze doors and their working lock.",
      "Everything else is foundations, column stumps and three standing arches — Septimius Severus at one end, Titus at the other, and in the middle the Column of Phocas, put up in 608 CE and the last monument ever erected in the Forum.",
    ],
    excavations: [
      {
        period: "1803",
        by: "Carlo Fea",
        level: "documented",
        note: "Clearance around the Arch of Septimius Severus, the first modern excavation in the Forum, undertaken partly to establish how deep the ancient level actually was.",
      },
      {
        period: "1870s",
        by: "Pietro Rosa and the new Italian state",
        level: "documented",
        note: "Systematic clearance under the Kingdom of Italy. Fast, and driven by a national interest in exposing Republican Rome.",
      },
      {
        period: "1898–1925",
        by: "Giacomo Boni",
        level: "documented",
        note: "The turning point. Boni dug in stratigraphic layers, recorded sections, used photography from a balloon and published what he found in sequence rather than by monument. He located the Iron Age cemetery and, in 1899, the Lapis Niger. Roman archaeology as a discipline dates from this excavation.",
      },
      {
        period: "1924–1940s",
        by: "The Fascist regime",
        level: "documented",
        note: "Clearance and display for political effect, culminating in the Via dell'Impero of 1932, driven across the Imperial Fora for parades. It destroyed a substantial area of medieval and Renaissance Rome and buried a large part of the fora under a road, where much of it remains.",
      },
      {
        period: "1980s–present",
        by: "Andrea Carandini, Clementina Panella and others",
        level: "documented",
        note: "Targeted re-excavation of the earliest levels along the Sacra Via and the north slope of the Palatine, aimed specifically at the archaic period and at testing the literary foundation narratives.",
      },
    ],
    structures: [
      {
        name: "The Curia Julia",
        date: "begun 44 BCE, rebuilt c. 283–303 CE",
        level: "documented",
        note: "The senate house, standing to full height with its opus sectile floor. What stands is Diocletian's rebuilding after the fire of 283, restored in the twentieth century by removing the church of Sant'Adriano from around it.",
        architectureSlug: "forum",
      },
      {
        name: "The Rostra",
        date: "Republican; rebuilt by Caesar 44 BCE",
        level: "documented",
        note: "The speakers' platform, named for the ships' rams taken at Antium in 338 BCE and fixed to its front. The Caesarian platform survives as a curved concrete and tufa mass at the west end.",
      },
      {
        name: "The Temple of Saturn",
        date: "traditionally 497 BCE; standing columns 4th century CE",
        level: "documented",
        note: "Eight columns and an architrave. Beneath it was the aerarium, the state treasury — so the Republic's public money sat in the podium of a temple, which is a fact worth more than most descriptions of Roman finance.",
        architectureSlug: "temple",
      },
      {
        name: "The Temple of Vesta and the House of the Vestals",
        date: "rebuilt many times; visible remains 2nd–3rd centuries CE",
        level: "documented",
        note: "A round temple that held no cult statue but a fire, beside a large courtyard house for the six priestesses who kept it. Partly re-erected in the twentieth century.",
        architectureSlug: "temple",
      },
      {
        name: "The Basilica Julia and the Basilica Aemilia",
        date: "54 BCE and 179 BCE, both rebuilt",
        level: "documented",
        note: "The two great covered halls where courts sat and business was done. Foundations and paving, with game boards scratched into the Basilica Julia's steps by people waiting.",
        architectureSlug: "basilica",
      },
      {
        name: "The Arch of Titus",
        date: "after 81 CE",
        level: "documented",
        note: "Standing on the Velia, carrying the relief of the spoils of the Jerusalem temple carried in triumph. Heavily restored by Giuseppe Valadier in 1821 in travertine, deliberately plainer than the original marble so the restoration reads as restoration.",
        architectureSlug: "triumphal-arch",
        imageSlug: "arch-titus-relief",
      },
      {
        name: "The Basilica of Maxentius",
        date: "c. 308–312 CE",
        level: "documented",
        note: "Three enormous concrete vaults of the north aisle still stand. The colossal seated statue of Constantine was found in its west apse in 1486.",
        architectureSlug: "vaults-and-domes",
      },
    ],
    finds: [
      {
        name: "The Lapis Niger",
        what: "A black marble pavement laid over a much older shrine, containing a tufa cippus inscribed in archaic Latin, written boustrophedon, of the sixth century BCE. It is the oldest Latin inscription from Rome. It is broken and only partly intelligible; it contains a word for king and what appears to be a curse on anyone who violates the place.",
        level: "documented",
        heldAt: "In position, under the Forum pavement",
      },
      {
        name: "The Sepulcretum burials",
        what: "The Iron Age cemetery Boni found beneath the square: cremation urns in the form of huts, and inhumations. Direct material evidence for occupation of the site of Rome in the period the foundation legends address.",
        level: "documented",
        heldAt: "Antiquarium Forense and the Museo Nazionale Romano",
      },
      {
        name: "The colossal Constantine",
        what: "Head, hand, foot and other fragments of a seated acrolithic statue some twelve metres high, found in 1486 in the Basilica of Maxentius and moved to the Capitoline courtyard. It was identified as Commodus for around four centuries.",
        level: "documented",
        objectSlug: "colossus-of-constantine",
        museumSlug: "capitoline-museums",
      },
      {
        name: "Inscribed public documents",
        what: "The Forum was where the Roman state published itself: laws, treaties, calendars, honours, and the consular lists. A great many of the inscriptions on which Roman chronology depends came from this square or its immediate surroundings.",
        level: "documented",
        museumSlug: "museo-nazionale-romano",
      },
    ],
    interpretation: [
      "The Forum is the clearest available demonstration that Roman public life had no purpose-built home. The senate met in a hall that was also a temple precinct, the assemblies voted in the open, the courts sat in commercial basilicas, the treasury was in a temple podium and the state archive was in another. Roman institutions were procedures attached to places rather than buildings designed for functions, which is why the constitutional history and the topography have to be read together.",
      "Boni's excavation matters beyond Rome. Before him the Forum was dug monument by monument, to expose known buildings named in texts; he dug it as deposit, in layers, and thereby found things no text mentioned — the cemetery, the archaic shrine, the sequence of pavements. The shift from illustrating literature to reading stratigraphy is the single most important methodological change in the archaeology of Italy, and it happened here.",
      "The Forum's later history is not decline but reuse, and the distinction matters. Marble was burned for lime and columns were taken for churches because they were the most valuable building material available in a city that had stopped importing stone. The buildings that survive are precisely the ones that acquired a new function, which is a general rule of survival and not a Roman peculiarity.",
      "What was done here in the 1930s is a warning about excavation as politics. A regime that wanted a visible imperial ancestry cleared, straightened and displayed the ruins that suited it and paved over the ones that did not, and the resulting arrangement — including which fora are visible today — still shapes what a visitor thinks Roman Rome looked like.",
    ],
    disputes: [
      {
        question: "What does the Lapis Niger inscription say?",
        positions:
          "The stone is broken at the top and the archaic Latin is difficult. Readings agree on a form of the word for king and on a sacral prohibition; they differ on almost everything else, including whether the king in question is a political monarch or the rex sacrorum, the priest who inherited the king's religious duties after the monarchy ended. The inscription is the earliest documentary evidence for Rome's own institutions and it cannot be securely translated.",
        level: "disputed",
      },
      {
        question: "How early is the paved square?",
        positions:
          "Boni's sequence, refined by later work, puts the first paving somewhere in the later seventh or the sixth century BCE. Carandini has argued for dates and identifications that align closely with the literary tradition of the regal period; other excavators regard the correspondence as forced and the dating as too precise for the evidence. The general chronology is agreed; the attempt to attach it to named kings is not.",
        level: "disputed",
      },
    ],
    primarySources: [
      S(
        "From the Founding of the City",
        "1.12–13, 1.36, 1.56",
        "Livy on the Forum's origins: the battle in the marsh, the augural traditions, and the drainage works attributed to the Tarquins. A first-century BCE reconstruction of events six centuries earlier, and the frame every excavator here has had to argue with.",
        "Livy",
      ),
      S(
        "Life of Caesar",
        "66–68",
        "Plutarch on the assassination and its aftermath, including the burning of the body in the Forum by the crowd — the event commemorated by the temple whose podium is still there.",
        "Plutarch",
      ),
      S(
        "The Twelve Caesars",
        "Augustus 28–29",
        "Suetonius on Augustus's building programme and his claim to have found Rome brick and left it marble. A statement about the Forum and its surroundings, and a piece of self-presentation.",
        "Suetonius",
      ),
    ],
    museumSlugs: ["capitoline-museums", "museo-nazionale-romano"],
    objectSlugs: ["colossus-of-constantine"],
    architectureRefs: [
      "forum",
      "basilica",
      "temple",
      "triumphal-arch",
      "honorific-column",
      "vaults-and-domes",
    ],
    institutionRefs: [
      "roman-senate",
      "roman-assemblies",
      "consul",
      "praetor",
      "censor",
      "roman-law",
      "roman-taxation",
    ],
    religionRefs: [
      "roman-augury",
      "the-triumph-as-rite",
      "womens-religious-office",
      "the-vow-and-the-contract",
    ],
    warfareRefs: [],
    battleRefs: [],
    figureRefs: ["julius-caesar", "cicero", "augustus", "livy", "suetonius"],
    themeRefs: ["republic", "rule-of-law", "civic-order", "monumentality"],
    bookRefs: ["ab-urbe-condita", "life-of-caesar", "twelve-caesars"],
    cityRefs: [],
    mapSlugs: ["roman-republic", "roman-empire"],
    relatedSites: ["palatine-hill", "athenian-agora", "herculaneum"],
    imageSlug: "roman-forum-view",
    gallerySlugs: ["arch-titus-relief"],
  },
  {
    slug: "palatine-hill",
    name: "The Palatine Hill",
    alsoKnownAs: ["Palatium"],
    kind: "residence",
    region: "roman",
    standfirst:
      "Iron Age huts, the house Augustus lived in, and four centuries of imperial palace stacked on the same forty acres — the hill that gave every later European language its word for palace.",
    description:
      "The Palatine — the Iron Age hut floors, the Casa Romuli tradition, the House of Augustus frescoes, the Flavian palace, the Farnese Gardens, and the argument over Carandini's wall.",
    parentCitySlug: "rome",
    geography: {
      modernCountry: "Italy",
      ancientRegion: "Latium",
      latitude: 41.889,
      longitude: 12.487,
      coordinateSubject: "The Domus Flavia",
      setting:
        "A roughly square hill of about ten hectares rising some forty metres above the Forum on one side and the Circus Maximus valley on the other. Defensible, dry, close to the river crossing and small enough to be a single community. It is where the earliest substantial occupation of the site of Rome has been found.",
    },
    chronology: {
      start: { year: -750, precision: "approximate", display: "c. 750 BCE" },
      end: { year: 1600, precision: "approximate", display: "c. 1600 CE" },
      status: "documented",
      display: "Iron Age village from the 8th century BCE; imperial residence to the 5th century CE; Renaissance gardens after",
      phases: [
        {
          label: "The huts",
          display: "8th century BCE",
          level: "documented",
          note: "Postholes, drainage channels and floor cuttings of oval huts on the south-west spur. The dating is secure; the identification of any one of them with Romulus is not archaeology but a Roman tradition about a hut the Romans themselves maintained as a relic.",
        },
        {
          label: "The Republican hill",
          display: "5th–1st centuries BCE",
          level: "documented",
          note: "A fashionable residential quarter — Cicero, Hortensius, Catiline and Clodius all lived here — and the site of the temple of Magna Mater, brought to Rome in 204 BCE.",
        },
        {
          label: "Augustus",
          display: "36 BCE – 14 CE",
          level: "documented",
          note: "Augustus bought property here and built a house presented as modest, immediately beside the temple of Apollo he vowed and the hut of Romulus. The juxtaposition was the argument.",
        },
        {
          label: "The palace",
          display: "1st–4th centuries CE",
          level: "documented",
          note: "Tiberius, Nero, and above all Domitian's architect Rabirius turned the hill into a single continuous residence with public halls, private wings and a sunken garden. Palatium becomes the word for the thing.",
        },
        {
          label: "Gardens over ruins",
          display: "16th century CE",
          level: "documented",
          note: "The Farnese laid out terraced gardens over the buried Domus Tiberiana — among the first botanical gardens in Europe, and a substantial obstacle to excavating what is underneath.",
        },
      ],
    },
    civilizations: ["rome", "roman-republic", "principate", "high-empire"],
    whatSurvives: [
      "On the south-west spur, cuttings in the tufa: the postholes and drainage gullies of Iron Age huts, protected under cover. They are unimpressive to look at and they are the oldest structural evidence for Rome.",
      "Beneath the later palace, two decorated houses conventionally called the House of Augustus and the House of Livia keep Second Style wall paintings of very high quality in situ — architectural perspectives, garlands and small landscapes, on the walls of rooms of quite ordinary size.",
      "Above them the imperial palace survives as brick and concrete on a huge scale: the Domus Flavia's audience hall and basilica, the Domus Augustana's courtyards, the sunken garden usually called the stadium, and the substructures holding the whole platform up. The Farnese Gardens sit on the north side, over the Domus Tiberiana.",
    ],
    excavations: [
      {
        period: "1720s–1730s",
        by: "The Farnese excavations under Francesco Bianchini",
        level: "documented",
        note: "Digging in the family's own gardens, uncovering parts of the Flavian palace. Bianchini's plan is the earliest useful record.",
      },
      {
        period: "1861–1870",
        by: "Pietro Rosa for Napoleon III",
        level: "documented",
        note: "Large-scale clearance of the Farnese property, which the French emperor had bought. Fast and destructive of later levels, but it exposed the palace plan.",
      },
      {
        period: "1907–1913 and 1948–1950s",
        by: "Giacomo Boni, then Ferdinando Castagnoli and Sante Puglisi",
        level: "documented",
        note: "The Iron Age huts on the Cermalus were identified and dated, providing the earliest secure occupation evidence on the hill.",
      },
      {
        period: "1961–1980s",
        by: "Gianfilippo Carettoni",
        level: "documented",
        note: "Excavation of the Augustan houses and their painted rooms, and the temple of Apollo Palatinus. The frescoes were consolidated and eventually opened to visitors in rotation.",
      },
      {
        period: "1985–2000s",
        by: "Andrea Carandini and the north-slope project",
        level: "documented",
        note: "Excavation on the slope towards the Forum which produced a fortification wall and gate dated to around 730–720 BCE. Carandini published it as the wall of Romulus. The wall is a finding; the attribution is a claim.",
      },
    ],
    structures: [
      {
        name: "The Iron Age hut floors",
        date: "8th century BCE",
        level: "documented",
        note: "Rock-cut postholes and channels for oval huts of wattle and thatch. The plan matches the hut-shaped cinerary urns found in the Forum cemetery, which is a rare case of a burial custom illustrating a building type.",
      },
      {
        name: "The House of Augustus",
        date: "c. 36–28 BCE",
        level: "documented",
        note: "A house of ordinary size with extraordinary painting, joined directly to the precinct of the temple of Apollo. Suetonius says Augustus slept in the same small room for forty years; the archaeology is consistent with a deliberately restrained private scale attached to a grand public one.",
        architectureSlug: "house-and-insula",
      },
      {
        name: "The Temple of Magna Mater",
        date: "191 BCE, rebuilt 111 BCE and under Augustus",
        level: "documented",
        note: "Podium and steps. The cult of Cybele was brought from Asia Minor during the Hannibalic war and installed on the most Roman hill in Rome, under restrictions that kept its priesthood non-Roman.",
        architectureSlug: "temple",
      },
      {
        name: "The Domus Flavia and Domus Augustana",
        date: "81–92 CE",
        level: "documented",
        note: "Domitian's palace by the architect Rabirius: an axial sequence of audience hall, peristyle and dining room for public business, and a lower multi-storey wing around courtyards for private life. The separation of the two is the plan's whole idea.",
        architectureSlug: "palace",
      },
      {
        name: "The substructures",
        date: "1st century CE",
        level: "documented",
        note: "Vaulted concrete platforms carrying the palace out over the slopes, the least visible and most technically ambitious part of the complex.",
        architectureSlug: "roman-concrete",
      },
    ],
    finds: [
      {
        name: "The Second Style frescoes",
        what: "Wall paintings from the Augustan houses, including the Room of the Masks and the so-called Room of the Pine Festoons. Among the finest surviving Roman wall painting, and in position rather than detached.",
        level: "documented",
        heldAt: "In position, Palatine",
      },
      {
        name: "Architectural terracottas",
        what: "Painted terracotta plaques from the Apollo precinct and the Augustan buildings, with figured scenes. They preserve the colour of a phase of Roman architecture that is otherwise known only in stripped stone.",
        level: "documented",
        museumSlug: "museo-nazionale-romano",
      },
      {
        name: "Sculpture from the palace",
        what: "Portrait and ideal sculpture recovered from the sixteenth century onward and dispersed into the Farnese collection, much of which went to Naples in the eighteenth century.",
        level: "documented",
        museumSlug: "naples-national-archaeological-museum",
      },
    ],
    interpretation: [
      "The Palatine is where Roman political self-presentation can be read as a stratigraphy. Augustus placed his house against a temple he had vowed, within sight of a hut the city maintained as Romulus's, on the hill where the foundation augury was said to have been taken. None of those associations is accidental and all of them are legible in the ground plan.",
      "It is also where the vocabulary of European monarchy was made. Domitian's building was so completely identified with the person of the emperor that the name of the hill became the word for the residence of a ruler, in Latin and then in every language that borrowed from it.",
      "The hut floors deserve to be taken on their own terms rather than as a footnote to the legend. They show a village of perhaps a few hundred people on a defensible hill above a river crossing in the eighth century BCE — which is exactly the sort of place the later city grew out of, and nothing like the city the foundation stories describe.",
    ],
    disputes: [
      {
        question: "Is the north-slope wall the wall of Romulus?",
        positions:
          "Carandini's excavation produced a genuine fortification wall and gate dated by associated pottery to around 730–720 BCE, which is close to the traditional foundation date of 753. He argued that the tradition therefore preserves a real event. Critics reply that a mid-eighth-century wall is what one would expect on that hill regardless, that the traditional date was itself calculated by Roman antiquarians rather than remembered, and that a coincidence of dates is not corroboration of a narrative. The wall is not disputed; the inference is.",
        level: "disputed",
      },
      {
        question: "Whose houses are the Augustan houses?",
        positions:
          "The identification of one building as the house of Augustus rests on its position beside the temple of Apollo and on Suetonius's description; the House of Livia is named from a lead pipe stamped with the name Iulia Augusta found nearby. Both attributions are reasonable and neither is proven, and recent work has proposed that the two are parts of one complex rather than separate residences.",
        level: "probable",
      },
    ],
    primarySources: [
      S(
        "From the Founding of the City",
        "1.6–7",
        "Livy on the augury contest between Romulus and Remus, taken on the Palatine and the Aventine, and the founding of the settlement on this hill.",
        "Livy",
      ),
      S(
        "The Twelve Caesars",
        "Augustus 72",
        "Suetonius on Augustus's house: a small bedroom used for forty years, plain furniture, and none of the marble and mosaic of his successors. Written a century later, and self-consciously a moral contrast.",
        "Suetonius",
      ),
      S(
        "Annals",
        "15.38–39",
        "Tacitus on the fire of 64 CE, which began in the shops at the Circus end of the Palatine and destroyed much of the hill's earlier fabric.",
        "Tacitus",
      ),
    ],
    museumSlugs: ["museo-nazionale-romano", "naples-national-archaeological-museum"],
    objectSlugs: [],
    architectureRefs: ["palace", "house-and-insula", "temple", "roman-concrete", "vaults-and-domes"],
    institutionRefs: ["imperial-administration"],
    religionRefs: ["roman-augury", "roman-domestic-cult", "foreign-cults-at-rome"],
    warfareRefs: [],
    battleRefs: [],
    figureRefs: ["augustus", "tiberius", "livy", "suetonius", "tacitus", "cicero"],
    themeRefs: ["founding-myths", "kingship-and-legitimacy", "monumentality", "imperial-succession"],
    bookRefs: ["ab-urbe-condita", "twelve-caesars", "annals"],
    cityRefs: [],
    mapSlugs: ["roman-republic", "roman-empire"],
    relatedSites: ["roman-forum", "hadrians-villa"],
    imageSlug: "palatine-domus-augustana",
  },
  {
    slug: "herculaneum",
    name: "Herculaneum",
    alsoKnownAs: ["Ercolano"],
    kind: "settlement",
    region: "roman",
    standfirst:
      "Buried deeper than Pompeii and by hotter material, which carbonised its wood, its food and its library — and preserved, in a row of boat sheds, the people who did not get away.",
    description:
      "Herculaneum — the Bourbon tunnels of 1738, the Villa of the Papyri and its Epicurean library, the skeletons in the boat sheds, and the organic material no other Roman site preserves.",
    geography: {
      modernCountry: "Italy",
      ancientRegion: "Campania",
      latitude: 40.806,
      longitude: 14.348,
      coordinateSubject: "The excavated insulae of the town",
      setting:
        "On a spur above the sea about seven kilometres west of Vesuvius, with the ancient shoreline running along the foot of the town. Smaller and wealthier than Pompeii, with fewer workshops and more sea-facing houses. The modern town of Ercolano sits directly on top of it, which is the reason most of the site will not be excavated.",
    },
    chronology: {
      start: { year: -500, precision: "approximate", display: "c. 500 BCE" },
      end: { year: 79, precision: "exact", display: "79 CE" },
      status: "documented",
      display: "Occupied from at least the 6th century BCE until the eruption of 79 CE",
      phases: [
        {
          label: "Pre-Roman town",
          display: "6th–3rd centuries BCE",
          level: "probable",
          note: "Oscan and then Samnite occupation, known mainly from the street grid and from material under the Roman levels rather than from open excavation.",
        },
        {
          label: "Roman municipium",
          display: "89 BCE – 62 CE",
          level: "documented",
          note: "Roman after the Social War. A modest town of a few thousand with expensive seafront property, including at least one villa of senatorial scale.",
        },
        {
          label: "The earthquake",
          display: "62 CE",
          level: "documented",
          note: "Damage still under repair seventeen years later, visible throughout the excavated area, exactly as at Pompeii.",
        },
        {
          label: "The eruption",
          display: "79 CE",
          level: "documented",
          note: "Buried by successive pyroclastic density currents and the deposits between them, to a depth of some twenty metres. The material was hot enough to carbonise organic matter and dense enough to fill the buildings without flattening them.",
        },
      ],
    },
    civilizations: ["rome", "principate"],
    whatSurvives: [
      "Four insulae and parts of others, excavated in the open, standing to first-floor level and in places to the roof. Because the burial medium was not ash falling from above but a series of ground-hugging flows that filled the town from below, upper floors, balconies and roof timbers survived instead of collapsing.",
      "The organic material is the reason the site matters. Carbonised beams, doors, a folding bed, a baby's cradle still able to rock, a wooden partition screen, ropes, fishing net, loaves of bread with the baker's stamp, figs, and in one house a wooden shrine to the household gods. No other Roman site preserves this range.",
      "Along the ancient shoreline is a row of vaulted chambers, the boat sheds, which contained the remains of around three hundred people who had gathered there. Until 1980 the accepted view was that the town had been successfully evacuated.",
    ],
    excavations: [
      {
        period: "1709",
        by: "Prince d'Elbeuf's well",
        level: "documented",
        note: "A well shaft struck the stage of the theatre. What followed was quarrying for marble and statues, sold and dispersed across Europe, with no record of where anything came from.",
      },
      {
        period: "1738–1765",
        by: "Rocque Joaquin de Alcubierre for Charles of Bourbon",
        level: "documented",
        note: "Tunnelling through the solidified deposit by lamplight, following walls and removing what could be sold or displayed. Destructive, undocumented by later standards, and responsible for the discovery of the theatre, the basilica and the Villa of the Papyri.",
      },
      {
        period: "1750–1765",
        by: "Karl Weber",
        level: "documented",
        note: "A Swiss engineer who insisted on plotting the tunnels and recording findspots on plan. His drawings of the Villa of the Papyri are why the building can still be discussed as a building rather than as a list of objects.",
      },
      {
        period: "1927–1961",
        by: "Amedeo Maiuri",
        level: "documented",
        note: "Open-air excavation of the insulae now visible, under Fascist patronage and on a scale that has not been attempted since. Maiuri also began the practice of leaving finds in the houses where they were found.",
      },
      {
        period: "1980–1990s",
        by: "Giuseppe Maggi and the shoreline excavation",
        level: "documented",
        note: "The boat sheds and their skeletons, followed by the osteological study begun by Sara Bisel. It changed the understanding of the eruption's effect on the population and produced one of the largest studied skeletal populations from the Roman world.",
      },
      {
        period: "2001–present",
        by: "The Herculaneum Conservation Project",
        level: "documented",
        note: "A long-term conservation partnership rather than an excavation, addressing water, drainage and structural decay across the whole site. It is frequently cited as the model for stabilising an over-exposed archaeological site instead of digging more of it.",
      },
    ],
    structures: [
      {
        name: "The Villa of the Papyri",
        date: "1st century BCE, remodelled 1st century CE",
        level: "probable",
        note: "A seafront villa of exceptional size, known chiefly from the Bourbon tunnels and Weber's plan; only small parts have been excavated in the open. Its layout is the basis of the reconstruction built as the Getty Villa in California.",
        architectureSlug: "villa",
      },
      {
        name: "The boat sheds",
        date: "1st century CE",
        level: "documented",
        note: "Vaulted chambers opening onto the ancient beach, used for boat storage and, in 79 CE, as shelter.",
      },
      {
        name: "The College of the Augustales",
        date: "1st century CE",
        level: "documented",
        note: "A hall for the freedmen's association attached to the imperial cult, with paintings of Hercules in place and an inscription recording the brothers who paid for it.",
      },
      {
        name: "The Suburban Baths",
        date: "1st century CE",
        level: "documented",
        note: "Preserved to the ceiling, with the wooden door of one room, the marble benches and the stucco still in position. Roman bathing architecture is nowhere else this complete.",
        architectureSlug: "baths",
      },
      {
        name: "The House of the Wooden Partition",
        date: "1st century CE",
        level: "documented",
        note: "A house whose atrium keeps its carbonised wooden folding screen standing in the position it was left in.",
        architectureSlug: "house-and-insula",
      },
    ],
    finds: [
      {
        name: "The Herculaneum papyri",
        what: "Around eleven hundred carbonised scrolls from the Villa of the Papyri, found in the 1750s. The identifiable content is largely Epicurean philosophy, much of it by Philodemus of Gadara, which makes this the only library of the ancient world to survive as a library rather than through copying.",
        level: "documented",
        heldAt: "Officina dei Papiri, Biblioteca Nazionale, Naples",
      },
      {
        name: "The villa bronzes",
        what: "The Dancers, the Seated Hermes, the Drunken Satyr, and a series of portrait busts, all from the Villa of the Papyri. Among the finest bronzes to survive from antiquity, and removed by tunnelling with almost no record of context.",
        level: "documented",
        museumSlug: "naples-national-archaeological-museum",
      },
      {
        name: "The boat-shed skeletons",
        what: "The remains of around three hundred people, studied for age, diet, stature, disease and occupation. One of the very few large Roman skeletal populations that died together rather than being buried over generations, which removes the usual sampling problem.",
        level: "documented",
        heldAt: "Stored and studied on site",
      },
      {
        name: "Carbonised organic material",
        what: "Furniture, doors, roof beams, food, textiles, rope and a wooden household shrine. Ordinary objects that survive nowhere else, and which document the parts of Roman domestic life that decay.",
        level: "documented",
        heldAt: "In position and in the site stores",
      },
    ],
    interpretation: [
      "Herculaneum has always been read against Pompeii and the contrast is genuinely informative. Pompeii was buried by falling pumice, which gave people hours and collapsed roofs; Herculaneum was hit by flows that arrived faster, filled the buildings and carbonised rather than burned. The result is fewer bodies in the streets, far more surviving wood, and a town preserved to a greater height.",
      "The papyri are the site's largest unfinished business. The scrolls cannot be unrolled without destroying them; Antonio Piaggio's eighteenth-century machine opened some at the cost of others; and the modern approach has been imaging rather than opening. High-resolution X-ray tomography combined with machine learning has now recovered continuous text from scrolls that have never been opened, and the work is ongoing rather than finished. If the unexcavated part of the villa holds further shelves, as Weber's plan suggests it may, the recoverable Greek and Latin corpus could change.",
      "The skeletons ended a comfortable assumption. For two centuries the absence of bodies in the excavated town was read as evidence of a successful evacuation, and by extension as evidence that ancient populations could respond effectively to warning. The shoreline shows that a substantial number of people were still there, gathered at the water's edge, when the first flow arrived.",
      "Roughly three quarters of the town is still under Ercolano and is very unlikely to be excavated. That is a limit on knowledge and, given the condition of what has been exposed, arguably a protection.",
    ],
    disputes: [
      {
        question: "How did the people in the boat sheds die?",
        positions:
          "The original interpretation was near-instantaneous death from thermal shock at several hundred degrees, supported by the posture of the remains and by cracking in the bone and teeth. Subsequent work has argued for lower temperatures and asphyxiation, with thermal effects following, and has debated a claimed instance of vitrified brain tissue. The reconstruction of temperature from skeletal evidence is difficult and the question is active.",
        level: "disputed",
      },
      {
        question: "What date was the eruption?",
        positions:
          "The manuscripts of Pliny's letter give 24 August, and that date is traditional. Autumn fruit, heavier clothing, a wine harvest in progress and a charcoal inscription at Pompeii dated to mid-October have all been cited for a later date, most often 24 October. The textual and the material evidence disagree, and the manuscript tradition of the letter is itself variable.",
        level: "disputed",
      },
    ],
    primarySources: [
      S(
        "Letters",
        "6.16, 6.20",
        "Pliny the Younger's two letters to Tacitus describing the eruption, his uncle's death at Stabiae and his own escape from Misenum. The only eyewitness account, written some twenty-five years after the event and addressed to a historian who had asked for it.",
        "Pliny the Younger",
      ),
      S(
        "Roman History",
        "66.21–23",
        "Cassius Dio's account of the eruption, written a century and a half later and drawing on the tradition rather than on witnesses. Useful mainly as a measure of how the event was remembered.",
        "Cassius Dio",
      ),
    ],
    museumSlugs: ["naples-national-archaeological-museum"],
    objectSlugs: [],
    architectureRefs: ["house-and-insula", "villa", "baths", "theatre", "building-materials"],
    institutionRefs: [],
    religionRefs: ["roman-domestic-cult", "roman-death-ritual"],
    warfareRefs: [],
    battleRefs: [],
    figureRefs: ["pliny-the-younger", "tacitus"],
    themeRefs: ["historical-method", "historical-memory"],
    bookRefs: [],
    cityRefs: ["pompeii", "rome"],
    mapSlugs: ["roman-empire"],
    relatedSites: ["akrotiri", "roman-forum", "hadrians-villa"],
    imageSlug: "herculaneum-excavations-19c",
    gallerySlugs: ["herculaneum-maiuri-excavation"],
  },
  {
    slug: "hadrians-villa",
    name: "Hadrian's Villa",
    alsoKnownAs: ["Villa Adriana", "Tivoli"],
    kind: "residence",
    region: "roman",
    standfirst:
      "A hundred and twenty hectares of imperial retreat that functioned as a laboratory for what concrete could be made to do — and whose famous room names were assigned in the sixteenth century from a late and unreliable text.",
    description:
      "Hadrian's Villa at Tivoli — the Canopus and the Maritime Theatre, the experimental vaulting, Pirro Ligorio's excavation and naming, and where the sculpture went.",
    geography: {
      modernCountry: "Italy",
      ancientRegion: "Latium",
      latitude: 41.941,
      longitude: 12.774,
      coordinateSubject: "The Canopus",
      setting:
        "On sloping ground below Tibur, some twenty-eight kilometres east of Rome, with abundant water from the Aniene and its aqueducts and travertine quarries close by. Far enough from the city to be a retreat and close enough to govern from, which is precisely what it was for.",
    },
    chronology: {
      start: { year: 118, precision: "approximate", display: "c. 118 CE" },
      end: { year: 138, precision: "exact", display: "138 CE" },
      status: "documented",
      display: "Built c. 118–138 CE, over an earlier Republican villa",
      phases: [
        {
          label: "The Republican villa",
          display: "1st century BCE",
          level: "documented",
          note: "An earlier villa on the site, incorporated into the imperial complex rather than demolished. Parts of its opus reticulatum survive within later structures.",
        },
        {
          label: "The Hadrianic building campaign",
          display: "c. 118–138 CE",
          level: "documented",
          note: "Two decades of continuous construction, dated by brick stamps, which is why the phasing here is unusually secure for a Roman site.",
        },
        {
          label: "Later imperial use",
          display: "2nd–4th centuries CE",
          level: "probable",
          note: "Used by later emperors and progressively stripped; the evidence is scattered and the sequence poorly resolved.",
        },
        {
          label: "Quarry and excavation",
          display: "15th–19th centuries",
          level: "documented",
          note: "Marble burned for lime, sculpture removed for collections, and a series of digs undertaken specifically to supply Roman palaces and, later, European museums.",
        },
      ],
    },
    civilizations: ["rome", "high-empire", "principate"],
    whatSurvives: [
      "Brick and concrete on an enormous scale across a landscape rather than a site: bath buildings with their vaults standing, the long pool of the Canopus with its curved colonnade re-erected, the Maritime Theatre's circular island and moat, the Piazza d'Oro's octagonal vestibule, and terrace after terrace of substructure.",
      "Almost none of the marble facing survives. What is visible is the structure behind the finish, which is why the villa is more useful for the history of construction than almost any complete building.",
      "Below ground is a network of service tunnels and carriage roads large enough for vehicles, running under the whole complex so that the running of the villa was invisible from it.",
    ],
    excavations: [
      {
        period: "1550s–1560s",
        by: "Pirro Ligorio for Cardinal Ippolito II d'Este",
        level: "documented",
        note: "Excavation to furnish the Villa d'Este with sculpture, accompanied by the first survey plan and by Ligorio's naming of the parts. He took the list of names from the Historia Augusta and matched them to ruins; the names stuck.",
      },
      {
        period: "18th century",
        by: "Giuseppe Fede, Count Fede and the antiquities dealers",
        level: "documented",
        note: "Systematic digging for the collectors' market. Much of the villa's best sculpture entered the Vatican, the Capitoline and, through Gavin Hamilton and others, collections across Europe in this period, with little or no record of findspot.",
      },
      {
        period: "1870–present",
        by: "The Italian state",
        level: "documented",
        note: "Acquisition, survey, consolidation and selective excavation. The Canopus and its Serapeum were excavated and partly re-erected in the 1950s under Salvatore Aurigemma.",
      },
    ],
    structures: [
      {
        name: "The Canopus and Serapeum",
        date: "c. 125–138 CE",
        level: "documented",
        note: "A long pool flanked by columns and closed at one end by a half-domed dining chamber with water running behind the diners. The half-dome is segmented like an umbrella, a form the villa uses repeatedly and which appears in Rome only later.",
        architectureSlug: "vaults-and-domes",
      },
      {
        name: "The Maritime Theatre",
        date: "c. 118–125 CE",
        level: "documented",
        note: "A circular colonnade around a moat with a small self-contained residence on the island, reached by swing bridges. A private retreat inside a private retreat.",
        architectureSlug: "villa",
      },
      {
        name: "The Pecile",
        date: "c. 125 CE",
        level: "documented",
        note: "An enormous rectangular portico around a pool, with a surviving wall down the middle so that one could walk in sun or shade at any hour. Named by Ligorio after the Painted Stoa at Athens.",
        architectureSlug: "stoa",
      },
      {
        name: "The Great and Small Baths",
        date: "c. 125–133 CE",
        level: "documented",
        note: "Two bath buildings of very different character, one grand and one refined, both preserving vaults that are the best surviving evidence for Hadrianic concrete engineering.",
        architectureSlug: "baths",
      },
      {
        name: "The service tunnels",
        date: "c. 118–138 CE",
        level: "documented",
        note: "Kilometres of underground corridors and vehicle roads. The villa's operation — deliveries, staff, waste — was routed entirely below the level anyone was meant to see.",
        architectureSlug: "roman-concrete",
      },
    ],
    finds: [
      {
        name: "The Antinous sculptures",
        what: "Several portraits of Antinous, including the colossal Braschi Antinous, came from the villa. The commemoration of Hadrian's companion after his death in the Nile in 130 CE is unusually visible here.",
        level: "documented",
        museumSlug: "vatican-museums",
      },
      {
        name: "The Furietti centaurs",
        what: "A pair of grey marble centaurs signed by Aristeas and Papias of Aphrodisias, found in 1736. Signed Roman sculpture is rare, and these name their sculptors and their city.",
        level: "documented",
        museumSlug: "capitoline-museums",
      },
      {
        name: "Mosaics and coloured marble",
        what: "Figured emblemata and vast quantities of imported coloured stone — Egyptian granite, Numidian yellow, Phrygian purple — which document the reach of the imperial quarry system as clearly as any inscription.",
        level: "documented",
        museumSlug: "vatican-museums",
      },
      {
        name: "Egyptian and Egyptianising sculpture",
        what: "Statuary in Egyptian style and material, much of it made in Italy rather than imported, from the Canopus area. What it represents is argued: an evocation of the Nile, a memorial to Antinous, a cult installation, or several at once.",
        level: "disputed",
        museumSlug: "vatican-museums",
      },
    ],
    interpretation: [
      "The villa is best read as an experimental building site. Curved and countercurved walls, segmented domes, half-domes on unequal supports, and vaults springing from points that would not carry a stone architrave — these are things concrete makes possible and stone does not, and Hadrian's builders did them here before they were done in Rome. The Pantheon's dome is contemporary with this work and the relationship is not accidental.",
      "The familiar names are a Renaissance overlay. The Historia Augusta says Hadrian named parts of the villa after Lyceum, Academy, Prytaneum, Canopus, Poikile and Tempe, and even built an underworld; the Historia Augusta is a late compilation with a well-documented habit of invention, and Ligorio distributed its list across the ruins by inference. Whether Hadrian named anything in the villa after anything is not established, and the notion that the complex was a miniature tour of the empire is a modern narrative built on that Renaissance guess.",
      "It is also the clearest single case of an archaeological site functioning as a quarry for museums. A large proportion of the classical sculpture in the Vatican, the Capitoline and several other collections came out of this ground in the sixteenth to eighteenth centuries, almost none of it with a recorded findspot, which is why the villa's own sculptural programme cannot be reconstructed.",
    ],
    disputes: [
      {
        question: "Was Apollodorus of Damascus executed over the villa?",
        positions:
          "Cassius Dio reports that Hadrian had Trajan's architect put to death after Apollodorus criticised his designs. The story is told long after the fact, has the shape of an anecdote about imperial vanity, and is not corroborated. It is repeated constantly in accounts of this villa and should be labelled as what it is.",
        level: "disputed",
      },
      {
        question: "How much did Hadrian design?",
        positions:
          "Ancient sources present Hadrian as personally engaged in architecture, and the villa's unusual forms are often attributed to him directly. There is no building inscription naming a designer and no drawing. Attributing the invention to the emperor is a plausible reading of a court culture, not a documented fact about who worked out the geometry.",
        level: "unknown",
      },
    ],
    primarySources: [
      S(
        "Historia Augusta",
        "Hadrian 26.5",
        "The passage listing the villa's supposed names — Lyceum, Academy, Prytaneum, Canopus, Poikile, Tempe and an underworld. A late, anonymous and demonstrably unreliable compilation, and the single source for the villa's most repeated claim.",
      ),
      S(
        "Roman History",
        "69.4",
        "Cassius Dio on Hadrian's quarrel with Apollodorus of Damascus and the architect's death.",
        "Cassius Dio",
      ),
    ],
    museumSlugs: ["vatican-museums", "capitoline-museums", "louvre"],
    objectSlugs: [],
    architectureRefs: ["villa", "roman-concrete", "vaults-and-domes", "baths", "stoa", "palace"],
    institutionRefs: ["imperial-administration"],
    religionRefs: ["the-isis-cult", "serapis"],
    warfareRefs: [],
    battleRefs: [],
    figureRefs: ["hadrian", "apollodorus-of-damascus", "trajan"],
    themeRefs: ["monumentality", "empire-and-diversity", "imperial-administration"],
    bookRefs: [],
    cityRefs: ["rome", "alexandria"],
    mapSlugs: ["roman-empire"],
    relatedSites: ["palatine-hill", "roman-forum", "herculaneum"],
    imageSlug: "hadrians-villa-canopus",
  },
  {
    slug: "dura-europos",
    name: "Dura-Europos",
    alsoKnownAs: ["Europos", "Salhiyeh"],
    kind: "settlement",
    region: "roman",
    standfirst:
      "A garrison town on the Euphrates that was besieged, abandoned and never reoccupied — leaving a synagogue covered in paintings, the oldest known church, a Roman shield, and the bodies of men who died in a mine under the wall.",
    description:
      "Dura-Europos — the 1920 discovery, the Yale and French excavations, the synagogue and house church, the painted scutum, the siege of c. 256 CE and the looting of the site after 2011.",
    geography: {
      modernCountry: "Syria",
      ancientRegion: "The middle Euphrates",
      latitude: 34.747,
      longitude: 40.730,
      coordinateSubject: "The Palmyrene Gate",
      setting:
        "On a plateau above the right bank of the Euphrates, with the river on one side, deep wadis on two more, and a single landward approach protected by a wall. It sat on the route between Syria and Mesopotamia and changed hands accordingly: Seleucid foundation, Parthian city, Roman frontier garrison.",
    },
    chronology: {
      start: { year: -300, precision: "approximate", display: "c. 300 BCE" },
      end: { year: 256, precision: "approximate", display: "c. 256 CE" },
      status: "documented",
      display: "Seleucid foundation c. 300 BCE; destroyed and abandoned c. 256 CE",
      phases: [
        {
          label: "Seleucid colony",
          display: "c. 300–113 BCE",
          level: "documented",
          note: "A garrison colony on a grid plan, with a citadel above the river. The Greek name Europos and the Semitic Dura were both in use.",
        },
        {
          label: "Parthian city",
          display: "c. 113 BCE – 165 CE",
          level: "documented",
          note: "Under Parthian control for nearly three centuries. This is when the mixed civic culture visible in the temples and the inscriptions takes shape.",
        },
        {
          label: "Roman garrison",
          display: "165–256 CE",
          level: "documented",
          note: "Annexed under Lucius Verus and turned into a frontier base, with a military quarter walled off inside the town and a substantial documentary archive.",
        },
        {
          label: "Siege and abandonment",
          display: "c. 253–256 CE",
          level: "documented",
          note: "A Sasanian siege, complete with assault ramp, mines and countermines. The town fell and was not reoccupied — the reason everything inside it survives.",
        },
      ],
    },
    civilizations: ["seleucid-empire", "rome", "high-empire", "hellenistic-world"],
    whatSurvives: [
      "The circuit wall, the Palmyrene Gate, the grid of streets and the mudbrick houses, preserved partly because the defenders packed the buildings against the inner face of the wall with earth before the siege, burying and thereby saving the very buildings whose walls they were reinforcing.",
      "Inside that fill were the two structures the site is known for: a synagogue whose walls carried a continuous programme of figural biblical painting, and a house converted into a church with a painted baptistery. Both were lifted and removed, the synagogue to Damascus and the church to Yale.",
      "Also from the fill: the only substantially complete Roman body shield known, painted horse armour, weapons, and several hundred documents on parchment and papyrus in at least a dozen languages.",
    ],
    excavations: [
      {
        period: "March 1920",
        by: "British Indian Army troops digging trenches",
        level: "documented",
        note: "Soldiers entrenching on the site cut into a painted wall. James Henry Breasted, then travelling in the region, was brought to see it within weeks and published the paintings, which is how the site entered scholarship.",
      },
      {
        period: "1922–1923",
        by: "Franz Cumont for the French Academy of Inscriptions and Letters",
        level: "documented",
        note: "The first excavation, which established the identity of the site and the presence of the temples.",
      },
      {
        period: "1928–1937",
        by: "Yale University and the French Academy, directed by Michael Rostovtzeff",
        level: "documented",
        note: "Ten seasons that uncovered most of the town. Clark Hopkins was field director when the synagogue was found in 1932. The division of finds sent a large part of the material to New Haven.",
      },
      {
        period: "1986–2011",
        by: "The Franco-Syrian mission",
        level: "documented",
        note: "Renewed work on the fortifications, the military quarter and the siege works, including the re-examination of the countermine that produced the interpretation below.",
      },
      {
        period: "2011–2014",
        by: "Looting",
        level: "documented",
        note: "Systematic illegal excavation during the Syrian conflict, documented from satellite imagery as many thousands of pits across the site. A large proportion of the unexcavated area has been destroyed as archaeology, and what came out of it has no provenance and cannot be used.",
      },
    ],
    structures: [
      {
        name: "The synagogue",
        date: "rebuilt 244 CE",
        level: "documented",
        note: "A house-form synagogue whose assembly room was painted floor to ceiling with narrative scenes from the Hebrew Bible — Moses, Ezekiel, Esther, the Temple. Its existence complicates any simple account of an ancient Jewish prohibition on figural art.",
      },
      {
        name: "The Christian house church",
        date: "converted c. 233–256 CE",
        level: "documented",
        note: "An ordinary courtyard house adapted for assembly, with one room fitted as a baptistery and painted with the earliest securely dated Christian figural scenes known.",
      },
      {
        name: "The Mithraeum",
        date: "168 CE and later",
        level: "documented",
        note: "A cult room with two carved reliefs of Mithras and painted zodiac figures, installed by Palmyrene archers serving in the Roman garrison.",
      },
      {
        name: "The Palmyrene Gate and the wall",
        date: "Seleucid, reinforced 250s CE",
        level: "documented",
        note: "The landward gate and the circuit, with the emergency earth rampart heaped against the inside during the final siege.",
      },
      {
        name: "The siege works",
        date: "c. 256 CE",
        level: "documented",
        note: "A Sasanian assault ramp against the wall, a mine driven beneath it, and a Roman countermine that met the attackers underground. One of the very few ancient sieges whose engineering can be walked over.",
      },
    ],
    finds: [
      {
        name: "The painted scutum",
        what: "A curved Roman body shield of laminated wood and leather, painted with an eagle, lions and a ship. The only substantially complete example known, and the confirmation of a plywood construction described by Polybius and attested nowhere else in surviving material.",
        level: "documented",
        objectSlug: "dura-europos-scutum",
        museumSlug: "yale-university-art-gallery",
      },
      {
        name: "The synagogue paintings",
        what: "The complete painted programme, lifted from the walls and reinstalled as a reconstructed room. Their condition and completeness are without parallel for any ancient religious interior.",
        level: "documented",
        heldAt: "National Museum of Damascus",
      },
      {
        name: "The Feriale Duranum",
        what: "A parchment calendar of the religious festivals a Roman garrison unit was required to observe, listing imperial anniversaries and state cult. It is the single best document for the official religion of the Roman army.",
        level: "documented",
        museumSlug: "yale-university-art-gallery",
      },
      {
        name: "The documentary archive",
        what: "Several hundred texts on parchment and papyrus — military rosters, duty rotas, loans, sales, marriage contracts, letters — in Greek, Latin, Aramaic, Palmyrene, Hebrew, Syriac, Parthian, Middle Persian and Safaitic. The linguistic range is the town's social history in one box.",
        level: "documented",
        museumSlug: "yale-university-art-gallery",
      },
    ],
    interpretation: [
      "Dura is the closest thing the Roman east has to Pompeii, and the mechanism is the same: an abrupt end with no reoccupation. What it preserves is different, though. Pompeii preserves a town's material life; Dura preserves a garrison's paperwork and a street of religious buildings belonging to communities that ordinarily leave nothing.",
      "The synagogue and the church stood a few streets apart in a town that also had a Mithraeum, temples of Palmyrene and Mesopotamian gods, and a Roman military cult calendar. That is the strongest single piece of evidence for what religious life on the eastern frontier actually looked like in the third century, and it looks nothing like a sequence of exclusive traditions replacing one another.",
      "The paintings also settled an argument by existing. Before 1932, the absence of figural art in ancient synagogues was widely explained as doctrinal. The Dura programme is elaborate, narrative, and was commissioned by the congregation whose donor inscriptions are on the walls.",
      "The looting after 2011 is part of the site's record and belongs on the page. It removed context permanently from a large fraction of the unexcavated town, and it means that objects appearing on the market attributed to Dura cannot be treated as evidence about it.",
    ],
    disputes: [
      {
        question: "Were the men in the countermine killed by gas?",
        positions:
          "Around twenty bodies were found in the Roman countermine, most of them Roman, in a confined space, with bitumen and sulphur crystals present. Simon James argued that the Sasanians deliberately generated toxic fumes to clear the tunnel — which would be the earliest documented use of a chemical weapon. Others hold that bitumen and sulphur were ordinary incendiary materials and that the fumes, however lethal, need not have been the intent. The bodies and the materials are documented; the intent is inference.",
        level: "disputed",
      },
      {
        question: "Why was the town not reoccupied?",
        positions:
          "The site sat on a good route and had water. Its abandonment after 256 has been explained by the collapse of the Roman frontier position, by depopulation from the siege, and by a shift of the frontier that made the position pointless. No single explanation is established, and the archaeology can only show that nobody came back.",
        level: "unknown",
      },
    ],
    primarySources: [],
    noAncientTestimony:
      "No surviving ancient author describes the town in any detail. It appears in a handful of geographical notices and its fall is not narrated anywhere. Everything on this page comes from the excavation and from the documents found in it — which is unusual enough to be worth stating, because it means the site cannot be read through a text and has never been distorted by one.",
    museumSlugs: ["yale-university-art-gallery"],
    objectSlugs: ["dura-europos-scutum"],
    architectureRefs: ["house-and-insula", "temple", "building-materials"],
    institutionRefs: ["roman-provinces", "imperial-administration"],
    religionRefs: ["mithraism", "foreign-cults-at-rome", "the-sacred-calendar"],
    warfareRefs: ["siege-warfare", "fortifications", "roman-army", "shields", "armour"],
    battleRefs: [],
    figureRefs: [],
    themeRefs: ["frontiers-and-borderlands", "empire-and-diversity", "state-and-religion"],
    bookRefs: [],
    cityRefs: ["rome"],
    mapSlugs: ["roman-empire"],
    relatedSites: ["herculaneum", "roman-forum"],
    imageSlug: "dura-europos-scutum",
  },
  // ─── Egypt ───────────────────────────────────────────────────────────
  {
    slug: "giza",
    name: "Giza",
    alsoKnownAs: ["The Giza necropolis"],
    kind: "necropolis",
    region: "egyptian",
    standfirst:
      "Three pyramids, a sphinx, and — excavated in the last forty years — the bakeries, barracks and cemetery of the people who built them, who were not slaves.",
    description:
      "Giza — the Fourth Dynasty pyramid field, Petrie's survey, the workers' town and cemetery, the Wadi al-Jarf logbook of a boat crew delivering stone to Khufu, and what is still unknown about how the blocks were raised.",
    geography: {
      modernCountry: "Egypt",
      ancientRegion: "Lower Egypt, the Memphite necropolis",
      latitude: 29.979,
      longitude: 31.134,
      coordinateSubject: "The Great Pyramid of Khufu",
      setting:
        "A limestone plateau on the west bank, above the floodplain and immediately across the river from the area of Memphis. The plateau supplied most of the core stone; the finer casing limestone came from Tura on the east bank and the granite from Aswan, eight hundred kilometres upstream. A canal system brought both to the foot of the plateau during the inundation.",
    },
    chronology: {
      start: { year: -2600, precision: "approximate", display: "c. 2600 BCE" },
      end: { year: -30, precision: "approximate", display: "the Roman period" },
      status: "documented",
      display: "Fourth Dynasty pyramid field, c. 2600–2500 BCE, with burial and cult continuing for two millennia",
      phases: [
        {
          label: "The Fourth Dynasty field",
          display: "c. 2600–2500 BCE",
          level: "documented",
          note: "Khufu, Khafre and Menkaure build in sequence, with their queens' pyramids, causeways, valley temples, boat pits and the planned mastaba cemeteries of the court laid out around them.",
        },
        {
          label: "Continuing use",
          display: "Old Kingdom to Late Period",
          level: "documented",
          note: "Burial in the private cemeteries continues long after the royal pyramids stop. The Sphinx acquires a cult, and Thutmose IV of the Eighteenth Dynasty sets up a stela between its paws recording a dream and a clearance of the sand.",
        },
        {
          label: "Quarry",
          display: "Medieval",
          level: "documented",
          note: "The fine limestone casing was stripped for building in Cairo, which is why the pyramids are stepped rather than smooth. A little survives at the apex of Khafre's.",
        },
      ],
    },
    civilizations: ["egypt", "old-kingdom"],
    whatSurvives: [
      "The three pyramids, stripped of most of their casing, with their internal chambers and passages accessible. The Great Pyramid retains its granite burial chamber, the relieving chambers above it and the corbelled Grand Gallery; nothing was found in it and nothing about its interior explains itself.",
      "Around them, an enormous planned cemetery: rows of mastaba tombs laid out on a grid for officials and relatives, the queens' pyramids, causeways, the valley temple of Khafre in granite and alabaster, and boat pits.",
      "South-east of the plateau, on lower ground, is the settlement: bakeries with bread moulds in quantity, a brewery, a building for processing fish, a set of long galleries interpreted as accommodation, and beyond it a cemetery of workers' tombs with small mudbrick superstructures.",
    ],
    excavations: [
      {
        period: "1837",
        by: "Howard Vyse and John Perring",
        level: "documented",
        note: "Exploration by gunpowder. They blasted into the relieving chambers above the King's Chamber and recorded the quarry marks there, including cartouches of Khufu — the only inscriptions in the pyramid, and painted by the work gangs rather than carved.",
      },
      {
        period: "1880–1882",
        by: "Flinders Petrie",
        level: "documented",
        note: "The survey. Petrie measured the pyramids to a precision nobody had attempted, and his figures — base lengths, angles, the accuracy of the levelling — remain the standard reference. He also demolished the numerological theories he had come to test.",
      },
      {
        period: "1902–1940s",
        by: "George Reisner, Harvard–Boston expedition, with Hermann Junker and Selim Hassan",
        level: "documented",
        note: "Systematic excavation of the mastaba fields under a division of the plateau between three expeditions. Reisner found the burial equipment of Hetepheres, mother of Khufu, in a sealed shaft in 1925.",
      },
      {
        period: "1954",
        by: "Kamal el-Mallakh",
        level: "documented",
        note: "A sealed pit beside the Great Pyramid containing a dismantled cedar boat, over forty metres long, in more than twelve hundred pieces. Reassembled over years by Ahmed Youssef Moustafa.",
      },
      {
        period: "1988–present",
        by: "Mark Lehner and the Ancient Egypt Research Associates, with Zahi Hawass",
        level: "documented",
        note: "The settlement and the workers' cemetery: bakeries, a gallery complex, faunal remains showing large-scale meat supply, and burials of workers whose skeletons show healed fractures and treated injuries. This is the evidence that ended the slave story as a serious position.",
      },
      {
        period: "2013",
        by: "Pierre Tallet and Gregory Marouard at Wadi al-Jarf",
        level: "documented",
        note: "Not at Giza, but decisive for it. Papyri at a Red Sea harbour recorded the daily log of a boat crew under an inspector named Merer, ferrying Tura limestone to the pyramid of Khufu. They are the oldest inscribed papyri known and the only contemporary account of the work.",
      },
    ],
    structures: [
      {
        name: "The Great Pyramid of Khufu",
        date: "c. 2560 BCE",
        level: "documented",
        note: "Originally about 146 metres high on a base of about 230 metres, built of some two and a quarter million blocks. The base is level to within a few centimetres across thirteen acres, which is the measurement that says most about the surveying.",
        architectureSlug: "pyramid",
        imageSlug: "giza-pyramids",
      },
      {
        name: "The Pyramid of Khafre",
        date: "c. 2530 BCE",
        level: "documented",
        note: "Slightly smaller and built on higher ground, so it looks larger. Retains its casing at the top, which is the only place a visitor can see what the finished surface was.",
        architectureSlug: "pyramid",
      },
      {
        name: "The Great Sphinx",
        date: "Fourth Dynasty, probably c. 2500 BCE",
        level: "probable",
        note: "Carved from a single outcrop of bedrock left standing in a quarry. No contemporary inscription names its maker or its subject; the attribution to Khafre rests on its position within his causeway and valley temple complex.",
        imageSlug: "great-sphinx-giza",
      },
      {
        name: "Khafre's valley temple",
        date: "c. 2530 BCE",
        level: "documented",
        note: "Massive granite piers and alabaster paving, standing. The plainest and most impressive Old Kingdom building to survive, and the source of the diorite seated statue of Khafre.",
        architectureSlug: "temple",
      },
      {
        name: "The settlement at Heit el-Ghurab",
        date: "c. 2550–2490 BCE",
        level: "documented",
        note: "Bakeries, a brewery, galleries interpreted as barracks, and administrative buildings. The bread moulds alone imply catering on an industrial scale.",
      },
    ],
    finds: [
      {
        name: "The Merer papyri",
        what: "The logbook of a boat crew, recording trips carrying limestone from Tura to the Great Pyramid, with dates by cattle count and the names of officials. Contemporary documentary evidence for the construction, found four hundred kilometres away.",
        level: "documented",
        heldAt: "Egyptian Museum, Cairo",
      },
      {
        name: "Khufu's ship",
        what: "A full-size cedar vessel, dismantled and buried in a sealed pit beside the pyramid, its timbers lashed rather than nailed. Reassembled and now moved to the Grand Egyptian Museum.",
        level: "documented",
        heldAt: "Grand Egyptian Museum, Giza",
      },
      {
        name: "The seated Khafre",
        what: "A diorite statue from the valley temple, with a falcon enfolding the king's head from behind. One of the defining objects of Old Kingdom sculpture.",
        level: "documented",
        heldAt: "Egyptian Museum, Cairo",
      },
      {
        name: "The Hetepheres burial equipment",
        what: "Gilded furniture, a carrying chair and a canopy from a sealed shaft, together with an alabaster sarcophagus that proved to be empty. Whose burial it was and why the body was absent has never been resolved.",
        level: "disputed",
        heldAt: "Egyptian Museum, Cairo",
      },
      {
        name: "The workers' skeletons",
        what: "Burials from the workers' cemetery showing heavy physical stress, healed fractures, and at least one amputation that healed — that is, injured workers who were treated and survived. Not a slave population's skeletal profile.",
        level: "documented",
        heldAt: "Studied on site",
      },
    ],
    interpretation: [
      "The most important thing modern excavation has established about Giza is social rather than architectural. A settlement with bakeries and breweries at this scale, cattle and sheep brought in from estates, gallery accommodation, and a cemetery where workers were buried with small tombs and grave goods near their king describes a large organised workforce, provisioned by the state and rotating through service. It does not describe chattel slavery, and the older story descends from Herodotus and from much later religious narrative rather than from any Egyptian evidence.",
      "How the blocks were raised is still unknown, and it is worth saying so plainly. Straight ramps, spiral ramps, internal ramps and lever systems have all been proposed; each has a serious objection, usually to do with the volume of ramp material required or the geometry at height. No ramp has been excavated at Giza in a state that settles it. The Egyptians did not describe the method and no depiction survives.",
      "What is documented is the logistics. The Merer papyri show boats, crews, inspectors, a canal system reaching the plateau, and delivery scheduled by administrative date. The organisational achievement is at least as remarkable as the engineering one, and it is much better evidenced.",
      "Herodotus is the source of almost everything popularly believed about the pyramids and he is a poor one for this purpose. He visited some two thousand years after they were built, was dependent on interpreters and priests, and reports a Khufu remembered as an impious tyrant — a Late Period folk tradition, not a Fourth Dynasty record. His hundred thousand men in three-month shifts is a figure of that kind.",
    ],
    disputes: [
      {
        question: "Who made the Sphinx, and when?",
        positions:
          "The standard attribution to Khafre rests on context: the Sphinx sits in his quarry, beside his causeway, in front of his valley temple. No inscription of the Fourth Dynasty names it. A proposal that water erosion on the enclosure walls requires a date thousands of years earlier has been advanced since the 1990s and is not accepted by Egyptologists or by most geologists who have examined it: the weathering is explicable by the properties of the soft bedrock layers and by long burial in damp sand, and a date in the fifth millennium BCE would require a monumental sculpture from a society with no other monumental anything.",
        level: "disputed",
      },
      {
        question: "What are the shafts in the Great Pyramid for?",
        positions:
          "Narrow shafts run from the King's and Queen's chambers towards the exterior. Ventilation, a stellar alignment for the king's ascent, and a structural or symbolic function have all been argued, and robotic exploration has found blocking stones with copper fittings and, beyond them, further blockings. Their purpose remains undetermined.",
        level: "unknown",
      },
    ],
    primarySources: [
      S(
        "Histories",
        "2.124–135",
        "Herodotus on the building of the pyramids: the hundred thousand men, the twenty years, the ramps, the causeway, and the tale of Cheops as a tyrant. Written two millennia after the event and dependent on informants; the tyrant tradition is Late Period, not Old Kingdom.",
        "Herodotus",
      ),
      S(
        "Geography",
        "17.1.33–34",
        "Strabo's description of the pyramids as they stood under Rome, including a hinged entrance stone. A first-hand traveller's account, and evidence for what was accessible in the first century BCE.",
        "Strabo",
      ),
    ],
    museumSlugs: ["british-museum", "louvre"],
    objectSlugs: [],
    architectureRefs: ["pyramid", "necropolis", "temple", "construction-methods", "building-materials"],
    institutionRefs: ["pharaonic-administration"],
    religionRefs: ["mummification", "egyptian-temple-economy"],
    warfareRefs: ["logistics"],
    battleRefs: [],
    figureRefs: ["khufu", "herodotus", "imhotep"],
    themeRefs: ["sacred-kingship-in-egypt", "monumentality", "administrative-state", "afterlife-and-order"],
    bookRefs: ["herodotus-histories"],
    cityRefs: ["memphis", "alexandria"],
    mapSlugs: ["egypt"],
    relatedSites: ["saqqara", "valley-of-the-kings", "karnak"],
    imageSlug: "giza-pyramids",
    gallerySlugs: ["great-sphinx-giza"],
  },
  {
    slug: "saqqara",
    name: "Saqqara",
    kind: "necropolis",
    region: "egyptian",
    standfirst:
      "The burial ground of Memphis for three thousand years — where stone architecture begins with Djoser's step pyramid, where the oldest religious texts were found carved on chamber walls, and where the Apis bulls were buried in granite.",
    description:
      "Saqqara — the Step Pyramid complex and Imhotep, Mariette's discovery of the Serapeum, the Pyramid Texts in the pyramid of Unas, the mastaba reliefs, and the animal catacombs.",
    geography: {
      modernCountry: "Egypt",
      ancientRegion: "Lower Egypt, the Memphite necropolis",
      latitude: 29.871,
      longitude: 31.216,
      coordinateSubject: "The Step Pyramid of Djoser",
      setting:
        "A desert plateau running some seven kilometres along the west bank above the ruins of Memphis. High, dry and immediately accessible from the capital, which is why it was used continuously from the First Dynasty into the Roman period — a longer span of use than almost any cemetery anywhere.",
    },
    chronology: {
      start: { year: -3000, precision: "approximate", display: "c. 3000 BCE" },
      end: { year: 400, precision: "approximate", display: "c. 400 CE" },
      status: "documented",
      display: "In use from the First Dynasty to the Roman period",
      phases: [
        {
          label: "Early Dynastic",
          display: "c. 3000–2700 BCE",
          level: "documented",
          note: "Large mudbrick mastabas on the northern escarpment, with panelled façades imitating the palace enclosure. Whether they are royal tombs or the tombs of officials has been argued since Emery excavated them.",
        },
        {
          label: "The Step Pyramid",
          display: "c. 2670–2650 BCE",
          level: "documented",
          note: "Djoser's complex: the first monumental building in cut stone anywhere, and a stone translation of a mudbrick, reed and timber architecture that no longer existed by the time it was copied.",
        },
        {
          label: "Old Kingdom cemetery",
          display: "c. 2600–2150 BCE",
          level: "documented",
          note: "Pyramids of the Fifth and Sixth Dynasties, and the great decorated mastabas of officials — Ti, Ptahhotep, Mereruka — whose wall scenes are the primary source for Old Kingdom daily life.",
        },
        {
          label: "The Serapeum and the animal cults",
          display: "c. 1400 BCE – 1st century CE",
          level: "documented",
          note: "Apis bull burials in rock-cut galleries, and from the Late Period onward vast catacombs of mummified ibises, baboons, falcons and cats, produced and sold as votives at industrial scale.",
        },
      ],
    },
    civilizations: ["egypt", "old-kingdom", "middle-kingdom", "new-kingdom", "ptolemaic-egypt"],
    whatSurvives: [
      "The Step Pyramid stands at the centre of a walled enclosure of some fifteen hectares, most of it dummy architecture: chapels with no interiors, doors carved permanently open, engaged columns imitating bundled reeds. A century of anastylosis has re-erected much of the enclosure wall and the entrance colonnade.",
      "South and north of it are pyramids of the Fifth and Sixth Dynasties, small and badly ruined outside but preserving carved and painted burial chambers, and the mastabas of officials with their relief-covered walls largely intact and still holding colour.",
      "Below ground, the Serapeum runs for hundreds of metres: rock-cut galleries lined with side chambers, each holding a granite sarcophagus of about seventy tonnes, most of them open and empty.",
    ],
    excavations: [
      {
        period: "1850–1852",
        by: "Auguste Mariette",
        level: "documented",
        note: "Mariette found a sphinx head protruding from the sand, recalled Strabo's description of an avenue of sphinxes leading to a Serapeum that was constantly being buried, and dug along the line. It led him to the Apis galleries. It is one of the few cases where an ancient text directly produced a major discovery.",
      },
      {
        period: "1880–1881",
        by: "Gaston Maspero",
        level: "documented",
        note: "Entry into the pyramid of Unas and the Sixth Dynasty pyramids, where the burial chambers proved to be covered in carved and painted vertical columns of text — the Pyramid Texts, the oldest substantial religious corpus in the world.",
      },
      {
        period: "1926–2001",
        by: "Cecil Firth, James Quibell and Jean-Philippe Lauer",
        level: "documented",
        note: "The Djoser complex. Lauer worked on it for some seventy-five years, reconstructing the enclosure from its fallen blocks. The site's present appearance is very largely his.",
      },
      {
        period: "1930s–1950s",
        by: "Walter Bryan Emery",
        level: "documented",
        note: "The Early Dynastic mastabas on the northern escarpment, and later the search for the tomb of Imhotep, which was not found.",
      },
      {
        period: "1975–present",
        by: "The Egypt Exploration Society, the Leiden and Cairo missions, and the Egyptian antiquities service",
        level: "documented",
        note: "The New Kingdom cemetery including the tomb Horemheb built as a general before he became king, the animal catacombs, and a continuing series of Late Period shaft burials.",
      },
    ],
    structures: [
      {
        name: "The Step Pyramid of Djoser",
        date: "c. 2670–2650 BCE",
        level: "documented",
        note: "Six diminishing stages, begun as a square mastaba and enlarged in stages that are visible in the fabric. The first large stone building in the world, and its own construction sequence is legible in it.",
        architectureSlug: "pyramid",
        imageSlug: "step-pyramid-djoser",
      },
      {
        name: "The enclosure and its dummy buildings",
        date: "c. 2660 BCE",
        level: "documented",
        note: "Chapels with solid cores, false doors, and engaged fluted columns — stone imitations of a perishable architecture, built for a ritual the king was to perform for ever rather than for use.",
        architectureSlug: "columns-and-capitals",
      },
      {
        name: "The Serapeum",
        date: "from the 18th Dynasty; main galleries from the 26th Dynasty",
        level: "documented",
        note: "Rock-cut galleries for the burial of the Apis bulls, each in a monolithic granite sarcophagus. How sarcophagi of that weight were manoeuvred into the side chambers is not established.",
      },
      {
        name: "The Pyramid of Unas",
        date: "c. 2350 BCE",
        level: "documented",
        note: "Small and collapsed outside; inside, the burial chamber walls carry the earliest Pyramid Texts, with a star-painted ceiling and alabaster panelling imitating a reed shelter.",
        architectureSlug: "pyramid",
      },
      {
        name: "The mastaba of Mereruka",
        date: "c. 2330 BCE",
        level: "documented",
        note: "Over thirty rooms of carved and painted scenes — agriculture, metalworking, hunting, force-feeding hyenas, tax collection with defaulters being beaten. The fullest surviving visual record of Old Kingdom life.",
        architectureSlug: "necropolis",
      },
    ],
    finds: [
      {
        name: "The Imhotep statue base",
        what: "A pedestal from the Step Pyramid complex bearing Djoser's titulary and, beside it, the name and titles of Imhotep. It is contemporary, it is the reason Imhotep is a historical person rather than a legend, and it is why the attribution of the complex to him is taken seriously.",
        level: "documented",
        heldAt: "Egyptian Museum, Cairo",
      },
      {
        name: "The Pyramid Texts",
        what: "Spells for the king's transformation and ascent, carved in the burial chambers of the late Fifth and Sixth Dynasty pyramids. The oldest surviving religious literature, and the ancestor of the Coffin Texts and the Book of the Dead.",
        level: "documented",
        heldAt: "In position, and in published editions",
      },
      {
        name: "The Djoser statue",
        what: "A seated limestone figure of the king found in the serdab against the north side of the pyramid, still positioned to look out through two eyeholes. The earliest surviving life-size Egyptian royal statue.",
        level: "documented",
        heldAt: "Egyptian Museum, Cairo",
      },
      {
        name: "The Serapeum stelae",
        what: "Votive stelae left by visitors at the Apis burials, many dated by regnal year. They provide a chronological series running across centuries and are used to anchor Late Period chronology.",
        level: "documented",
        museumSlug: "louvre",
      },
      {
        name: "Animal mummies",
        what: "Millions of them, in dedicated catacombs. Modern imaging has shown that a substantial proportion contain partial remains or none at all, which is evidence about the votive industry rather than about belief.",
        level: "documented",
        museumSlug: "british-museum",
      },
    ],
    interpretation: [
      "Saqqara is where Egyptian monumental architecture can be watched starting. Djoser's complex is built in small stone blocks of roughly mudbrick size, laid in courses, imitating reed matting, timber and bundled plant columns in a material that could not fail. It is a translation, and the thing it translates had already stopped being built.",
      "Imhotep is the earliest architect anywhere whose name is attached to a building by contemporary evidence. What that evidence says is that he was Djoser's chief official and held priestly titles; it does not say that he designed the pyramid, which is a reasonable inference from the association rather than a documented fact. Two thousand years later he was worshipped as a god of healing and identified by Greeks with Asklepios.",
      "The Pyramid Texts changed what could be said about Egyptian religion, because before Maspero the earliest religious corpus available was the Book of the Dead, a thousand years later and written for private people. The Pyramid Texts are royal, they are older, and they show a system already fully formed at the point it becomes visible.",
      "The animal catacombs are best read as an economy. Late Period pilgrims bought a mummified animal and had it interred as a votive on their behalf; the demand supported breeding, killing, embalming, packaging and burial at a scale that filled kilometres of gallery. The frequency of empty or partial bundles is a fact about that trade, and it is not evidence that the practice was insincere.",
    ],
    disputes: [
      {
        question: "Whose are the Early Dynastic mastabas?",
        positions:
          "Emery excavated large panelled mastabas at north Saqqara bearing the names of First Dynasty kings and argued they were the royal tombs, with the smaller Abydos monuments as cenotaphs. The prevailing view since has reversed that: Abydos holds the tombs and Saqqara the tombs of high officials, whose monuments bore the king's name because they served him. The argument turns on the sealings and on what a name on a tomb means.",
        level: "disputed",
      },
      {
        question: "How were the Serapeum sarcophagi installed?",
        positions:
          "Granite boxes of some seventy tonnes with separate lids stand in narrow side chambers off a low gallery, and several were left in mid-manoeuvre. Sledges, sand, levers and timber cradles are all plausible and none is attested. The precision of the interior surfaces is often cited as inexplicable; it is not, since Egyptian stoneworking in granite is well documented, but the moving remains unexplained.",
        level: "unknown",
      },
    ],
    primarySources: [
      S(
        "Geography",
        "17.1.32",
        "Strabo describes an avenue of sphinxes at Memphis buried to the head in windblown sand, leading to a temple of Serapis. Mariette used the passage as a field instruction and found the Serapeum.",
        "Strabo",
      ),
      S(
        "Histories",
        "2.153, 3.27–29",
        "Herodotus on the Apis bull, its identifying marks and its cult at Memphis, and on Cambyses' alleged wounding of the animal — a story Egyptian evidence contradicts, since the Apis that died under Cambyses was buried with full honours and a stela in his name.",
        "Herodotus",
      ),
    ],
    museumSlugs: ["louvre", "british-museum"],
    objectSlugs: [],
    architectureRefs: ["pyramid", "necropolis", "columns-and-capitals", "building-materials", "construction-methods"],
    institutionRefs: ["pharaonic-administration"],
    religionRefs: [
      "mummification",
      "animal-cults-and-votive-mummies",
      "egyptian-temple-economy",
      "serapis",
    ],
    warfareRefs: [],
    battleRefs: [],
    figureRefs: ["imhotep", "herodotus", "khufu"],
    themeRefs: ["sacred-kingship-in-egypt", "afterlife-and-order", "monumentality", "administrative-state"],
    bookRefs: ["herodotus-histories"],
    cityRefs: ["memphis"],
    mapSlugs: ["egypt"],
    relatedSites: ["giza", "valley-of-the-kings", "epidaurus"],
    imageSlug: "saqqara-step-pyramid",
    gallerySlugs: ["step-pyramid-djoser"],
  },
  {
    slug: "karnak",
    name: "Karnak",
    alsoKnownAs: ["Ipet-sut", "The precinct of Amun-Re"],
    kind: "sanctuary",
    region: "egyptian",
    standfirst:
      "Two thousand years of temple building on one site, with each king's work partly demolished to fill the next king's pylon — which is why a heretic's dismantled temple could be reassembled from inside a wall.",
    description:
      "Karnak — the Great Hypostyle Hall, the Cachette of eight hundred statues, the talatat blocks of Akhenaten's Aten temple recovered from later pylons, and the temple economy the papyri record.",
    geography: {
      modernCountry: "Egypt",
      ancientRegion: "Upper Egypt, Thebes",
      latitude: 25.719,
      longitude: 32.657,
      coordinateSubject: "The Great Hypostyle Hall",
      setting:
        "On the east bank at Thebes, a few hundred metres from the Nile and connected to it by a canal and a quay whose successive levels record the river's changing position. An avenue of sphinxes ran nearly three kilometres south to Luxor temple, and the royal mortuary temples and tombs lie directly opposite on the west bank.",
    },
    chronology: {
      start: { year: -2000, precision: "approximate", display: "c. 2000 BCE" },
      end: { year: 300, precision: "approximate", display: "c. 300 CE" },
      status: "documented",
      display: "Built and rebuilt from the Middle Kingdom to the Roman period",
      phases: [
        {
          label: "Middle Kingdom core",
          display: "c. 2000–1700 BCE",
          level: "documented",
          note: "The earliest structures, of which the finest surviving piece is Senusret I's limestone chapel — recovered in pieces from inside a later pylon and re-erected.",
        },
        {
          label: "The Eighteenth Dynasty",
          display: "c. 1550–1300 BCE",
          level: "documented",
          note: "Amun becomes the state god and Karnak becomes the state's principal investment. Hatshepsut and Thutmose III build obelisks, pylons and festival halls; Thutmose III inscribes his campaign annals on the walls.",
        },
        {
          label: "The Amarna interruption",
          display: "c. 1350–1330 BCE",
          level: "documented",
          note: "Akhenaten builds temples to the Aten at East Karnak and closes the Amun cult. After his death his buildings are dismantled and the blocks used as rubble fill in new pylons.",
        },
        {
          label: "The Ramesside hall",
          display: "c. 1290–1213 BCE",
          level: "documented",
          note: "Seti I and Ramesses II build the Great Hypostyle Hall, decorated by both — Seti's raised relief on the north, Ramesses' sunk relief on the south, the change of technique visible on a single walk through.",
        },
        {
          label: "Late additions",
          display: "1st millennium BCE – Roman",
          level: "documented",
          note: "Kushite, Saite, Ptolemaic and Roman work continues to add pylons, kiosks and gateways. The last pylon at the front of the temple is the least finished, because the temple grew outward.",
        },
      ],
    },
    civilizations: ["egypt", "new-kingdom", "middle-kingdom", "ptolemaic-egypt"],
    whatSurvives: [
      "An enclosure of about thirty hectares containing the temple of Amun-Re, with ten pylons on two axes, courts, a sacred lake, festival halls, storerooms and chapels, and beyond it two further walled precincts for Mut and for Montu.",
      "The Great Hypostyle Hall stands: a hundred and thirty-four columns over some five thousand square metres, the central twelve of them about twenty-one metres tall with open papyrus capitals, carrying clerestory windows in stone grilles. The roofing slabs are gone from most of it and remain in a few bays.",
      "One of Hatshepsut's obelisks still stands, close to thirty metres of a single piece of granite. Its pair lies broken beside the sacred lake, and the base of Thutmose I's stands nearby.",
    ],
    excavations: [
      {
        period: "1798–1799",
        by: "The French expedition's savants",
        level: "documented",
        note: "The Description de l'Égypte's plans and elevations, made when much of the temple was buried and inhabited, are the earliest systematic record and remain evidence for what has since been removed.",
      },
      {
        period: "1895–1917",
        by: "Georges Legrain for the Antiquities Service",
        level: "documented",
        note: "Clearance of the temple, re-erection of eleven hypostyle columns that collapsed in 1899, and in 1903 the discovery of the Cachette in the court of the Seventh Pylon — a pit into which the priests had buried unwanted statuary.",
      },
      {
        period: "1960s–1970s",
        by: "The Akhenaten Temple Project, Ray Winfield Smith and Donald Redford",
        level: "documented",
        note: "Some forty-five thousand small decorated blocks from Akhenaten's dismantled Aten temples had been recovered from pylon fill. The project photographed them and used early computer matching to reassemble the scenes on paper, recovering the decoration of buildings that no longer exist.",
      },
      {
        period: "1967–present",
        by: "The Franco-Egyptian Centre for the Study of the Temples of Karnak",
        level: "documented",
        note: "Continuous excavation, epigraphy, conservation and publication, including the quay and canal sequence and the ongoing study of the Cachette material.",
      },
    ],
    structures: [
      {
        name: "The Great Hypostyle Hall",
        date: "c. 1290–1220 BCE",
        level: "documented",
        note: "Standing. Two ranks of column heights create a clerestory, which is the same lighting principle a basilica uses two thousand years later and reached independently.",
        architectureSlug: "temple",
        imageSlug: "karnak-hypostyle",
      },
      {
        name: "Hatshepsut's obelisk",
        date: "c. 1470 BCE",
        level: "documented",
        note: "Standing. Its lower part was walled in by Thutmose III, which preserved the inscriptions there in near-perfect condition while the exposed upper part weathered.",
        imageSlug: "karnak-obelisk-hatshepsut",
      },
      {
        name: "The White Chapel of Senusret I",
        date: "c. 1950 BCE",
        level: "documented",
        note: "A small limestone way-station, dismantled in antiquity and used as fill in the Third Pylon, recovered block by block and rebuilt in the open-air museum. Middle Kingdom relief carving of the highest quality, preserved by demolition.",
      },
      {
        name: "The sacred lake",
        date: "New Kingdom",
        level: "documented",
        note: "A large stone-lined basin fed by groundwater, used for priestly purification and for the barque processions. Still holding water.",
      },
      {
        name: "The annals of Thutmose III",
        date: "c. 1450 BCE",
        level: "documented",
        note: "Campaign records carved on the walls around the granite sanctuary, including the account of the battle at Megiddo. Royal record inscribed inside a temple, which is where Egyptian history was published.",
      },
    ],
    finds: [
      {
        name: "The Karnak Cachette",
        what: "Around eight hundred stone statues and many thousands of bronzes, buried in a pit in the temple court, probably in the Ptolemaic period, to clear space. Statues accumulate in a temple over centuries and eventually have to go somewhere; this is where Karnak's went.",
        level: "documented",
        heldAt: "Egyptian Museum, Cairo, and the Luxor Museum",
      },
      {
        name: "The talatat blocks",
        what: "Small standardised sandstone blocks from Akhenaten's Aten temples, reused as rubble inside later pylons. Because they are small and carved, they can be reassembled, and they preserve the decoration of a demolished building better than the building's own site does.",
        level: "documented",
        heldAt: "Luxor Museum and the Karnak open-air museum",
      },
      {
        name: "Royal statuary of the Middle and New Kingdoms",
        what: "Including the black granite Thutmose III and a long series of Sekhmet figures from the Mut precinct, of which several hundred survive and are dispersed across collections worldwide.",
        level: "documented",
        museumSlug: "british-museum",
      },
    ],
    interpretation: [
      "Karnak is not a building but an accumulation, and the accumulation follows a rule: each king added at the front, so the temple grew outward from a small early core towards the river. The consequence is that the oldest work is deepest inside and the newest is at the entrance — the reverse of the way most visitors assume a temple grows.",
      "Demolition here is a form of preservation. Egyptian builders filled their pylons with rubble, and the rubble was previous kings' buildings broken up. Senusret I's chapel, Hatshepsut's structures and Akhenaten's entire Aten complex have been recovered from inside later walls. A site that systematically destroyed its own past thereby archived it.",
      "The temple was also an economic institution on a scale that is easy to underestimate. The papyrus record of Ramesses III's donations lists land, livestock, personnel and ships assigned to the temples, with Amun's holdings by far the largest. Karnak employed, farmed, stored, lent and administered, and the priesthood's independence became a political problem for the New Kingdom state.",
      "Akhenaten's treatment here is the clearest case of Egyptian official forgetting. His buildings were taken apart, his name was cut out of inscriptions, and later king lists omit him. That programme was thorough enough that he was unknown until the nineteenth century — and it failed, because the blocks were kept as building material.",
    ],
    disputes: [
      {
        question: "How were the obelisks raised?",
        positions:
          "A single granite shaft of two hundred tonnes or more had to be brought upright onto a base with its foot in exactly the right place. Sand-filled funnels, earth ramps with a pivot, and lever-and-cradle systems have all been proposed and some have been tested at reduced scale. Hatshepsut's own inscription describes quarrying and transport and stops before the erection. The method is not known.",
        level: "unknown",
      },
      {
        question: "Was Hatshepsut's memory attacked out of hatred?",
        positions:
          "Her images and names were removed from Karnak and elsewhere, and the erasure was long read as personal vengeance by Thutmose III. The removals appear to have begun decades into his sole reign rather than immediately, which points instead to a dynastic tidying of the succession record. The erasure is documented; the motive is inference.",
        level: "disputed",
      },
    ],
    primarySources: [
      S(
        "Papyrus Harris I",
        "throughout",
        "The record of Ramesses III's benefactions to the temples, listing land, people, cattle, ships and precious metal. The single most substantial document for the Egyptian temple economy, and it makes Amun's holdings at Thebes the largest by a wide margin.",
      ),
      S(
        "Annals of Thutmose III",
        "Karnak, walls of the sanctuary",
        "The king's campaign record carved in the temple, including the march through the Aruna pass and the engagement at Megiddo. Royal self-presentation, and one of the earliest detailed battle narratives from anywhere.",
      ),
      S(
        "Histories",
        "2.42–43",
        "Herodotus on Theban Zeus — that is, Amun — and the ram taboo, recording the cult as a Greek visitor found it a thousand years after the hall was built.",
        "Herodotus",
      ),
    ],
    museumSlugs: ["british-museum", "louvre"],
    objectSlugs: [],
    architectureRefs: ["temple", "columns-and-capitals", "construction-methods", "building-materials"],
    institutionRefs: ["pharaonic-administration"],
    religionRefs: ["egyptian-temple-economy", "the-sacred-calendar", "animal-cults-and-votive-mummies"],
    warfareRefs: ["egyptian-warfare", "egyptian-army"],
    battleRefs: [],
    figureRefs: ["hatshepsut", "thutmose-iii", "ramesses-ii", "akhenaten", "herodotus"],
    themeRefs: ["sacred-kingship-in-egypt", "state-and-religion", "monumentality", "administrative-state"],
    bookRefs: ["herodotus-histories"],
    cityRefs: ["memphis", "alexandria"],
    mapSlugs: ["egypt"],
    relatedSites: ["valley-of-the-kings", "amarna", "deir-el-medina", "giza"],
    imageSlug: "karnak-hypostyle",
    gallerySlugs: ["karnak-obelisk-hatshepsut", "luxor-temple"],
  },
  {
    slug: "valley-of-the-kings",
    name: "The Valley of the Kings",
    alsoKnownAs: ["Biban el-Muluk"],
    kind: "necropolis",
    region: "egyptian",
    standfirst:
      "Hidden royal tombs that were robbed anyway — and whose robberies were investigated, prosecuted and written up by the Egyptian state on papyri that still survive.",
    description:
      "The Valley of the Kings — sixty-five tombs, the ancient robbery trials, the royal caches of 1881 and 1898, Carter's discovery of Tutankhamun in 1922, and the rediscovery of KV5.",
    geography: {
      modernCountry: "Egypt",
      ancientRegion: "Upper Egypt, western Thebes",
      latitude: 25.740,
      longitude: 32.601,
      coordinateSubject: "The entrance to KV62",
      setting:
        "A dry wadi behind the cliffs of the west bank at Thebes, out of sight of the river and overlooked by a natural pyramid-shaped peak called el-Qurn. The choice of a concealed valley over a visible pyramid is the whole strategy: the New Kingdom kings separated the tomb from the mortuary temple and hid the first while monumentalising the second.",
    },
    chronology: {
      start: { year: -1539, precision: "approximate", display: "c. 1539 BCE" },
      end: { year: -1075, precision: "approximate", display: "c. 1075 BCE" },
      status: "documented",
      display: "Royal burials of the 18th to 20th Dynasties, with later reuse and visitation",
      phases: [
        {
          label: "Eighteenth Dynasty",
          display: "c. 1539–1292 BCE",
          level: "documented",
          note: "The valley comes into use. Early tombs are irregular and hidden; the plans become progressively more regular and more axial.",
        },
        {
          label: "Nineteenth and Twentieth Dynasties",
          display: "c. 1292–1075 BCE",
          level: "documented",
          note: "Long straight corridor tombs with fully decorated walls, including the largest of all — the tomb built for the sons of Ramesses II.",
        },
        {
          label: "Robbery and reburial",
          display: "c. 1100–950 BCE",
          level: "documented",
          note: "Systematic plundering, official investigations, and then the removal of the royal mummies by the Theban priesthood into two hidden caches, where they stayed for nearly three thousand years.",
        },
        {
          label: "Visitors and hermits",
          display: "Ptolemaic – Byzantine",
          level: "documented",
          note: "Greek and Latin graffiti in the open tombs, and Coptic occupation of some of them. Several tombs were never lost at any point.",
        },
      ],
    },
    civilizations: ["egypt", "new-kingdom"],
    whatSurvives: [
      "Sixty-five numbered tombs and pits, most of them cut as descending corridors through limestone into chambers with pillared halls, and most of them decorated with funerary compositions — the Amduat, the Book of Gates, the Litany of Re — painted or carved directly on plastered rock.",
      "The colour is the point. In tombs like Seti I's, and in the Valley of the Queens nearby, the paint is essentially as applied, because the tombs were sealed, dark and dry. No other body of ancient painting survives in this condition at this scale.",
      "What does not survive is the contents. Every tomb in the valley was robbed except one, and the one exception, KV62, was small, obstructed by later debris and robbed twice in antiquity before being resealed.",
    ],
    excavations: [
      {
        period: "1799 and 1817",
        by: "The French expedition, then Giovanni Belzoni",
        level: "documented",
        note: "Belzoni opened Seti I's tomb, made wax impressions of its reliefs for exhibition in London, and removed the alabaster sarcophagus, which is in Sir John Soane's Museum. His methods were of their time and the tomb has deteriorated since exposure.",
      },
      {
        period: "1827",
        by: "John Gardner Wilkinson",
        level: "documented",
        note: "Painted numbers at the tomb entrances. The KV numbering still in use is his, extended by later work.",
      },
      {
        period: "1881 and 1898",
        by: "The Antiquities Service, and Victor Loret",
        level: "documented",
        note: "The two royal caches. The first, at Deir el-Bahari, had been found by the Abd el-Rassul family around 1871 and quietly worked for a decade before the authorities traced objects on the market. The second was in the tomb of Amenhotep II. Between them they contained most of the New Kingdom's kings.",
      },
      {
        period: "1902–1914",
        by: "Theodore Davis, with Howard Carter and Edward Ayrton",
        level: "documented",
        note: "A concession that produced a series of tombs and ended with Davis's published conclusion that the valley was now exhausted.",
      },
      {
        period: "1917–1922",
        by: "Howard Carter for Lord Carnarvon",
        level: "documented",
        note: "Five seasons of clearing the valley floor to bedrock in the area Davis had abandoned. On 4 November 1922 the first step of KV62 appeared under the huts of the workmen who had built a later tomb.",
      },
      {
        period: "1987–present",
        by: "Kent Weeks and the Theban Mapping Project",
        level: "documented",
        note: "Rediscovery and clearance of KV5, known to Burton in 1825 and then lost, which proved to have over a hundred and twenty chambers and to be the burial place of sons of Ramesses II. Also a complete survey and mapping of the valley.",
      },
    ],
    structures: [
      {
        name: "KV17, the tomb of Seti I",
        date: "c. 1279 BCE",
        level: "documented",
        note: "The longest and finest tomb in the valley, over a hundred metres of decorated corridor and chamber with an astronomical ceiling. Damaged by exposure and by nineteenth-century casting, and largely closed.",
      },
      {
        name: "KV62, the tomb of Tutankhamun",
        date: "c. 1323 BCE",
        level: "documented",
        note: "Four small rooms, decorated only in the burial chamber. Its importance is entirely a function of its contents, not its architecture — it is a modest tomb, probably not designed for a king.",
        imageSlug: "valley-of-the-kings",
      },
      {
        name: "KV5",
        date: "c. 1250 BCE",
        level: "documented",
        note: "The largest tomb in the valley, with a pillared hall opening onto corridors of small chambers. Flooded repeatedly, filled with debris, and still being cleared.",
      },
      {
        name: "KV20 and the early tombs",
        date: "c. 1479 BCE",
        level: "documented",
        note: "Irregular, spiralling and steeply cut, driven through poor rock. The tomb associated with Hatshepsut runs over two hundred metres into the cliff towards her mortuary temple on the other side.",
      },
    ],
    finds: [
      {
        name: "The Tutankhamun assemblage",
        what: "Some five thousand objects: nested shrines and coffins, the gold mask, chariots, beds, weapons, clothing, food, and a folding camp bed. The only royal burial to survive substantially intact, and therefore the only measure of what the robbed tombs contained.",
        level: "documented",
        heldAt: "Grand Egyptian Museum, Giza",
      },
      {
        name: "The royal mummies",
        what: "From the two caches: Seti I, Ramesses II, Thutmose III and many others, with the priests' docket labels recording when and by whom each was rewrapped and moved.",
        level: "documented",
        heldAt: "National Museum of Egyptian Civilization, Cairo",
      },
      {
        name: "The tomb robbery papyri",
        what: "Twentieth Dynasty records of investigations into thefts from the royal necropolis: inspections, denunciations, confessions extracted under beating, and lists of what was taken and melted down. Egyptian criminal procedure, documented from inside.",
        level: "documented",
        museumSlug: "british-museum",
      },
      {
        name: "Seti I's alabaster sarcophagus",
        what: "Translucent calcite, carved inside and out with the Book of Gates, removed by Belzoni and bought by the architect John Soane after the British Museum declined the price.",
        level: "documented",
        heldAt: "Sir John Soane's Museum, London",
      },
    ],
    interpretation: [
      "The valley is usually presented as a story of secrecy defeated by thieves. The documents show something more interesting: an Egyptian state that knew the tombs were being robbed, investigated systematically, prosecuted, and eventually gave up defending the tombs and instead evacuated the bodies. The reburial dockets are administrative records of a controlled retreat.",
      "Tutankhamun's tomb is a poor guide to royal burial and an indispensable one at the same time. He was a minor king who died young and was buried in a small tomb, probably not his own, with equipment partly reused from other burials. If that is the low end of the range, the contents of Seti I's or Ramesses II's tomb are almost unimaginable — and everything about them has to be inferred from robbery inventories.",
      "The curse is a newspaper story. Carnarvon died in Cairo in April 1923 of an infected mosquito bite complicated by pneumonia, and the exclusive Carnarvon had sold to The Times gave every other paper an incentive to run a different angle. There is no curse text in the tomb.",
      "Conservation is now the valley's central problem. Humidity from visitors' breath, carbon dioxide, and salt crystallisation behind the plaster are actively destroying paint that survived three thousand years in sealed darkness. Several tombs are permanently closed, a facsimile of KV62 has been built nearby, and the underlying trade-off between access and survival has no comfortable answer.",
    ],
    disputes: [
      {
        question: "Is there another chamber beyond KV62?",
        positions:
          "A proposal that the north wall of the burial chamber concealed a further room, possibly Nefertiti's, prompted several rounds of radar survey from 2015. Results have been contradictory: some scans indicated a void, later independent surveys did not confirm it. The question has not been resolved and no excavation has been permitted.",
        level: "disputed",
      },
      {
        question: "Whose body is in KV55?",
        positions:
          "A damaged coffin and a skeleton from a small tomb near KV62, associated with Amarna-period material. The remains have been identified as Akhenaten, as Smenkhkare, and as an otherwise unattested figure; genetic work published in 2010 identified the individual as the father of Tutankhamun, which most read as Akhenaten but which does not settle the name. Age-at-death estimates from the skeleton conflict with the length of Akhenaten's reign.",
        level: "disputed",
      },
    ],
    primarySources: [
      S(
        "Papyrus Abbott and the tomb robbery papyri",
        "throughout",
        "Twentieth Dynasty records of the inspection of the royal tombs, the commission's findings, and the trial of the thieves. Contemporary Egyptian administrative and legal documents about the site itself.",
      ),
      S(
        "Geography",
        "17.1.46",
        "Strabo records about forty tombs of kings cut in the rock above Thebes, worth seeing. Confirmation that a substantial number were open and visited in the first century BCE.",
        "Strabo",
      ),
      S(
        "Histories",
        "2.86–89",
        "Herodotus on Egyptian embalming, in three grades by price. The best surviving external description of the practice, and broadly consistent with what the mummies show.",
        "Herodotus",
      ),
    ],
    museumSlugs: ["british-museum"],
    objectSlugs: [],
    architectureRefs: ["necropolis", "mausoleum", "construction-methods"],
    institutionRefs: ["pharaonic-administration"],
    religionRefs: ["mummification", "egyptian-temple-economy"],
    warfareRefs: [],
    battleRefs: [],
    figureRefs: ["ramesses-ii", "hatshepsut", "akhenaten", "herodotus", "thutmose-iii"],
    themeRefs: ["afterlife-and-order", "sacred-kingship-in-egypt", "historical-memory"],
    bookRefs: ["herodotus-histories"],
    cityRefs: ["memphis"],
    mapSlugs: ["egypt"],
    relatedSites: ["deir-el-medina", "karnak", "giza", "saqqara"],
    imageSlug: "valley-of-the-kings",
    gallerySlugs: ["hatshepsut-temple"],
  },
  {
    slug: "amarna",
    name: "Amarna",
    alsoKnownAs: ["Akhetaten", "Tell el-Amarna"],
    kind: "settlement",
    region: "egyptian",
    standfirst:
      "A capital city built on empty desert, occupied for about fifteen years and abandoned — which makes it the only Egyptian city that can be excavated as a single moment rather than as a thousand years of rebuilding.",
    description:
      "Amarna — Akhenaten's new capital, the boundary stelae, the cuneiform diplomatic archive found in 1887, the Nefertiti bust and the Berlin division, and what the ordinary cemeteries show about the people who built it.",
    geography: {
      modernCountry: "Egypt",
      ancientRegion: "Middle Egypt",
      latitude: 27.646,
      longitude: 30.896,
      coordinateSubject: "The Great Aten Temple",
      setting:
        "A bay of desert on the east bank, about halfway between Memphis and Thebes, enclosed by cliffs in a semicircle some ten kilometres across. Akhenaten's boundary stelae state that the site belonged to no god and no one before him, which as a choice of ground is the clearest statement of the project's intent.",
    },
    chronology: {
      start: { year: -1346, precision: "approximate", display: "c. 1346 BCE" },
      end: { year: -1330, precision: "approximate", display: "c. 1330 BCE" },
      status: "probable",
      display: "Founded in Akhenaten's fifth regnal year; abandoned within about fifteen years",
      phases: [
        {
          label: "Foundation",
          display: "regnal year 5",
          level: "documented",
          note: "Boundary stelae cut into the cliffs on both banks record the king's oath defining the city's limits, with the promise never to extend them.",
        },
        {
          label: "The city",
          display: "c. 1346–1332 BCE",
          level: "documented",
          note: "Temples open to the sky, palaces, administrative buildings, suburbs of officials' villas and workers' housing, a workmen's village, and rock tombs in the cliffs for the court.",
        },
        {
          label: "Abandonment",
          display: "c. 1332–1330 BCE",
          level: "documented",
          note: "Under Tutankhamun the court returned to Memphis and Thebes. Amarna was dismantled for its stone, and the site left almost clear.",
        },
        {
          label: "Erasure",
          display: "late 14th–13th centuries BCE",
          level: "documented",
          note: "Akhenaten's name was cut out of monuments, his buildings quarried, and the reigns of the Amarna period omitted from later king lists.",
        },
      ],
    },
    civilizations: ["egypt", "new-kingdom"],
    whatSurvives: [
      "Foundations and floor levels over some eight square kilometres of open desert — temples, palaces, houses, streets, wells, granaries and bakeries — largely undisturbed by later building, because the site was never reoccupied at scale.",
      "In the cliffs, rock-cut tombs prepared for the court, with reliefs showing the royal family under the rayed disc, the daily worship in the open temple, and the city itself in bird's-eye view. Almost none of the tombs was ever used.",
      "Three cemeteries for the ordinary population, excavated only since 2005, and the workmen's village, which is a walled grid of small identical houses like the one at Deir el-Medina.",
    ],
    excavations: [
      {
        period: "1887",
        by: "A local woman digging for sebakh",
        level: "documented",
        note: "The find of the cuneiform tablets. Their significance was not immediately recognised and a number were damaged or lost before scholars reached them; the tablets were dispersed onto the market and thence into museums.",
      },
      {
        period: "1891–1892",
        by: "Flinders Petrie",
        level: "documented",
        note: "The first controlled excavation: the Great Palace with its painted pavement, glass and faience workshops, and the recognition that the Aegean pottery on the site could date the two cultures against each other.",
      },
      {
        period: "1903–1908",
        by: "Norman de Garis Davies for the Egypt Exploration Fund",
        level: "documented",
        note: "Complete epigraphic recording of the rock tombs and boundary stelae in six volumes. Much of what he copied has since deteriorated, so his drawings are now the primary evidence.",
      },
      {
        period: "1907–1914",
        by: "Ludwig Borchardt for the German Oriental Society",
        level: "documented",
        note: "Excavation of the southern suburb, including the house and workshop of the sculptor Thutmose, where on 6 December 1912 the painted limestone bust of Nefertiti was found. It went to Berlin under the division of finds then in force; the division has been contested by Egypt since the 1920s.",
      },
      {
        period: "1921–1936, and 1977–present",
        by: "The Egypt Exploration Society, latterly the Amarna Project under Barry Kemp",
        level: "documented",
        note: "Long-term excavation and survey of the whole city, and from 2005 the excavation of the non-elite cemeteries — the first substantial evidence for the population as opposed to the court.",
      },
    ],
    structures: [
      {
        name: "The Great Aten Temple",
        date: "c. 1345 BCE",
        level: "documented",
        note: "An enormous open enclosure with hundreds of offering tables and no roofed sanctuary. Egyptian temples were dark and progressively more restricted; this one was open to the sky, which is a theological argument expressed as a plan.",
        architectureSlug: "temple",
      },
      {
        name: "The boundary stelae",
        date: "regnal years 5–8",
        level: "documented",
        note: "Fourteen or more large stelae cut into the cliffs, several with statues of the royal family beside them, carrying the foundation decree and the king's oath.",
      },
      {
        name: "The Central City and the Records Office",
        date: "c. 1345 BCE",
        level: "documented",
        note: "The administrative quarter, including the building labelled as the place of the correspondence of the pharaoh, from which the cuneiform archive came.",
      },
      {
        name: "The workmen's village",
        date: "c. 1345 BCE",
        level: "documented",
        note: "Seventy-odd small houses of identical plan inside a wall, in the desert away from the city, with chapels outside. The layout is bureaucratic; the private chapels show household religion continuing regardless of the official cult.",
        architectureSlug: "house-and-insula",
      },
    ],
    finds: [
      {
        name: "The Amarna Letters",
        what: "Around three hundred and eighty clay tablets in Akkadian cuneiform: correspondence between the Egyptian court and the kings of Babylon, Mitanni, Hatti, Assyria and Cyprus, and with the vassal rulers of Syria and Canaan. The single most important source for Late Bronze Age international relations, and the reason a diplomatic system can be described at all.",
        level: "documented",
        heldAt: "Vorderasiatisches Museum, Berlin; the British Museum; the Egyptian Museum, Cairo",
      },
      {
        name: "The bust of Nefertiti",
        what: "Painted limestone over a plaster layer, one eye inlaid and one deliberately left blank. Found in a sculptor's workshop, which is why it is generally read as a master model rather than a finished portrait.",
        level: "documented",
        heldAt: "Neues Museum, Berlin",
      },
      {
        name: "The talatat from Karnak and Hermopolis",
        what: "Blocks from Akhenaten's dismantled buildings, reused as fill elsewhere. They carry the decoration of the Amarna-period temples and are the main evidence for what the buildings looked like.",
        level: "documented",
        heldAt: "Luxor Museum and collections worldwide",
      },
      {
        name: "The South Tombs Cemetery skeletons",
        what: "Burials of the ordinary population: high juvenile mortality, stunted growth, frequent spinal trauma and evidence of nutritional stress. The people who built the city were working hard on inadequate food, in a place whose art shows abundance everywhere.",
        level: "documented",
        heldAt: "Studied on site",
      },
    ],
    interpretation: [
      "Amarna is the best-understood ancient Egyptian city because it is the only one that can be dug as a whole. Egyptian settlement sites are normally under later towns, under cultivation, or under the water table; this one is on desert that nobody wanted, occupied briefly and left. Almost everything general accounts say about Egyptian urban life, house plans and neighbourhood organisation rests on it, which is a problem, because a purpose-built royal foundation occupied for fifteen years is not a typical city.",
      "The religious change is real and it should be described precisely. Akhenaten promoted the Aten, the visible disc, above other gods, closed temples, and had the plural word for gods erased in places. Whether that constitutes monotheism in any useful sense is argued; the royal family remained the sole intermediaries, and household religion at the workmen's village continued with Bes, Taweret and the ordinary domestic deities throughout.",
      "The letters show the empire from outside. Vassal rulers write asking for troops that do not come, accusing each other, and reporting the 'apiru causing trouble; great kings write about gold, marriage alliances and the quality of gifts. It is a picture of Egyptian imperial management as distracted and cheap, which is not how Egyptian monuments present it.",
      "The cemeteries are the correction the site needed. For a century Amarna was known through its art — the royal family, the sunlight, the intimacy — and through the tombs of officials. The ordinary burials describe a population dying young under heavy physical load. Both things are evidence, and only one of them was on display.",
    ],
    disputes: [
      {
        question: "Should the Nefertiti bust be in Berlin?",
        positions:
          "It left Egypt under a division of finds approved by the Antiquities Service in 1913. Egypt has argued since the 1920s that the division was obtained by misrepresenting the object's importance, pointing to the way it was listed and to Borchardt's own account of the day. Germany holds that the division was lawful and has been repeatedly reviewed. The documents are published and are read differently by each side.",
        level: "disputed",
      },
      {
        question: "Did Akhenaten have a co-regency, and who succeeded him?",
        positions:
          "The sequence at the end of the reign involves a figure called Smenkhkare and a ruler called Neferneferuaten, who may be Nefertiti under a throne name, may be a daughter, and may be either co-regent or sole ruler. Every reconstruction is built from a small number of inscriptions, several of them altered in antiquity. There is no agreed order of events.",
        level: "disputed",
      },
    ],
    primarySources: [
      S(
        "The boundary stelae of Akhetaten",
        "Stelae K, X, and others",
        "Akhenaten's own foundation decree: the choice of virgin ground, the extent of the city, and the oath not to exceed it. A royal document about the site, cut into the site.",
      ),
      S(
        "The Great Hymn to the Aten",
        "Tomb of Ay, Amarna",
        "The fullest statement of the Aten theology, carved in a courtier's tomb. Its similarity to Psalm 104 has been much discussed; the resemblance is real, direct dependence is not demonstrated, and both may draw on a shared regional tradition of solar praise.",
      ),
      S(
        "The Amarna Letters",
        "EA 1–382",
        "The diplomatic archive. Not a narrative source but a correspondence file, which is why it is so much more useful than one.",
      ),
    ],
    museumSlugs: ["british-museum"],
    objectSlugs: [],
    architectureRefs: ["temple", "palace", "house-and-insula", "building-materials"],
    institutionRefs: ["pharaonic-administration"],
    religionRefs: ["egyptian-temple-economy"],
    warfareRefs: ["egyptian-warfare"],
    battleRefs: [],
    figureRefs: ["akhenaten", "ramesses-ii"],
    themeRefs: ["sacred-kingship-in-egypt", "state-and-religion", "pharaonic-legitimacy", "administrative-state"],
    bookRefs: [],
    cityRefs: ["memphis"],
    mapSlugs: ["egypt"],
    relatedSites: ["karnak", "deir-el-medina", "valley-of-the-kings"],
    imageSlug: "amarna-boundary-stela",
  },
  {
    slug: "deir-el-medina",
    name: "Deir el-Medina",
    alsoKnownAs: ["Set-Maat", "The Place of Truth"],
    kind: "settlement",
    region: "egyptian",
    standfirst:
      "The walled village of the men who cut the royal tombs — and the only community in the ancient world whose absentee records, pay disputes, love letters, lawsuits and strike survive in quantity.",
    description:
      "Deir el-Medina — Bruyère's excavation, the tens of thousands of ostraca, the Turin Strike Papyrus, the workmen's own decorated tombs, and the village oracle that settled disputes.",
    geography: {
      modernCountry: "Egypt",
      ancientRegion: "Upper Egypt, western Thebes",
      latitude: 25.729,
      longitude: 32.601,
      coordinateSubject: "The village enclosure",
      setting:
        "A small enclosed valley on the west bank, between the cultivation and the Valley of the Kings, with no water source of its own. Everything the village consumed — water above all — was carried in by donkey, which is why so much of its administration is about rations and delivery.",
    },
    chronology: {
      start: { year: -1500, precision: "approximate", display: "c. 1500 BCE" },
      end: { year: -1070, precision: "approximate", display: "c. 1070 BCE" },
      status: "documented",
      display: "Founded in the early 18th Dynasty; abandoned at the end of the New Kingdom",
      phases: [
        {
          label: "Foundation",
          display: "c. 1500 BCE",
          level: "documented",
          note: "Established under Thutmose I to house the workforce for the new royal cemetery, with the enclosure wall stamped with his name.",
        },
        {
          label: "The documented century",
          display: "c. 1290–1070 BCE",
          level: "documented",
          note: "The Nineteenth and Twentieth Dynasties, from which almost all the written material comes. Around sixty to a hundred and twenty workmen at a time, in two gangs, with a scribe and foremen.",
        },
        {
          label: "The strike",
          display: "regnal year 29 of Ramesses III",
          level: "documented",
          note: "The gangs stopped work over late grain rations and sat down at the mortuary temples until they were paid. The earliest recorded industrial action anywhere.",
        },
        {
          label: "Abandonment",
          display: "c. 1070 BCE",
          level: "documented",
          note: "The village was given up as royal burial in the valley ceased and security in the Theban west deteriorated. A Ptolemaic temple was later built beside it, which is where the modern name comes from.",
        },
      ],
    },
    civilizations: ["egypt", "new-kingdom"],
    whatSurvives: [
      "About seventy small houses in a walled grid on a north–south street, standing to a metre or so: a front room with a built platform, a living room with a column base, a rear room and a stair to the roof, with a cellar under many of them. The plans are so similar that the village reads as designed rather than grown.",
      "Above the village on the slope, the workmen's own tombs, with small mudbrick pyramids over decorated chapels. Men who spent their working lives decorating royal tombs decorated their own, which is why the painting in Sennedjem's tomb is of royal quality in a labourer's grave.",
      "And the rubbish. The Great Pit beside the village, dug for water and abandoned, was filled over generations with discarded limestone flakes and potsherds bearing writing — tens of thousands of them.",
    ],
    excavations: [
      {
        period: "1886",
        by: "Gaston Maspero's service, and local finders",
        level: "documented",
        note: "The intact tomb of Sennedjem was opened, with its painted chamber and its contents, which passed into museums in Cairo, Berlin and New York.",
      },
      {
        period: "1905–1909",
        by: "Ernesto Schiaparelli for the Italian mission",
        level: "documented",
        note: "The undisturbed tomb of the architect Kha and his wife Merit, complete with furniture, linen, cosmetics, tools and food, now displayed together in Turin. It is the most complete non-royal New Kingdom burial known.",
      },
      {
        period: "1922–1951",
        by: "Bernard Bruyère for the French Institute",
        level: "documented",
        note: "Excavation of the village, the tombs, the chapels and the Great Pit, published in a long series of reports. Bruyère's method was of its period and his recording of the ostraca findspots was uneven, which has limited what can be reconstructed about who wrote what.",
      },
      {
        period: "1970s–present",
        by: "The French Institute and international teams",
        level: "documented",
        note: "Publication and re-study of the texts, conservation of the tombs, and continuing work on the chapels and the surrounding paths.",
      },
    ],
    structures: [
      {
        name: "The village enclosure",
        date: "c. 1500 BCE, extended later",
        level: "documented",
        note: "A rectangular walled block of terraced houses. Access was through a single gate for most of its life, which is a fact about the state's relationship to a workforce that knew where the royal tombs were.",
        architectureSlug: "house-and-insula",
      },
      {
        name: "The tomb of Sennedjem",
        date: "c. 1290 BCE",
        level: "documented",
        note: "A small vaulted chamber painted over every surface with funerary scenes, including the Field of Reeds. Found intact.",
        architectureSlug: "necropolis",
      },
      {
        name: "The workmen's pyramids",
        date: "19th–20th Dynasties",
        level: "documented",
        note: "Small steep mudbrick pyramids over the tomb chapels — a royal form appropriated by artisans, on a scale of a few metres.",
        architectureSlug: "pyramid",
      },
      {
        name: "The Great Pit",
        date: "20th Dynasty",
        level: "documented",
        note: "A shaft over fifty metres deep sunk in a failed search for water and then used as a dump. Bruyère recovered many thousands of inscribed ostraca from it.",
      },
    ],
    finds: [
      {
        name: "The ostraca",
        what: "Tens of thousands of inscribed limestone flakes and sherds: work rosters, absence registers with the reason for each absence, delivery notes, letters, laundry lists, legal statements, school exercises, sketches, literary copies, dream interpretations and love poetry. Ordinary writing survives almost nowhere else in the ancient world in this quantity.",
        level: "documented",
        heldAt: "IFAO Cairo, the British Museum, the Egyptian Museum, and collections worldwide",
      },
      {
        name: "The Turin Strike Papyrus",
        what: "The scribe Amennakht's record of the events of year 29 of Ramesses III: the gangs walking off, the sit-down at the mortuary temples, the negotiations, and the eventual delivery of the grain. A contemporary account of a labour dispute, written by the party keeping the books.",
        level: "documented",
        heldAt: "Museo Egizio, Turin",
      },
      {
        name: "The tomb of Kha and Merit",
        what: "Undisturbed: beds, chairs, chests, a cubit rod inscribed with the king's name, linen, wigs, cosmetics, bread and a jar of preserved food, together with a Book of the Dead. It is the fullest picture available of what a well-off Egyptian household owned.",
        level: "documented",
        heldAt: "Museo Egizio, Turin",
      },
      {
        name: "Oracle questions",
        what: "Written questions put to the deified Amenhotep I, whose statue was carried in procession and whose movement was read as a yes or no. Property disputes, thefts and accusations were settled this way, and the records are the village's court archive.",
        level: "documented",
        heldAt: "IFAO Cairo and collections worldwide",
      },
    ],
    interpretation: [
      "Deir el-Medina is the exception that makes the rest of Egyptian social history legible by contrast. Almost everything else that survives from Egypt is monumental, official and produced for eternity. Here the surviving material is disposable — notes written on rubbish because papyrus was expensive — and the result is a community visible at the scale of individuals over several generations: named men, their wives, their debts, their quarrels and their days off.",
      "The absence registers are the best single example. A workman is off because he is brewing beer, because his mother is being embalmed, because he is building his own tomb, because of a scorpion sting, because he was drinking with a colleague, or because his wife or daughter is menstruating. This is a document type that exists nowhere else in the ancient world.",
      "The strike record matters beyond its novelty. It shows workers with a shared understanding of what the state owed them, a tactic — occupying the mortuary temples, where the offerings were — and officials who negotiated rather than punished. It should not be read as a labour movement; it should be read as evidence that rations were an obligation and that everyone involved knew it.",
      "The village must also be read for what it is not. These were literate, skilled, state-employed artisans with servants assigned to them, living in purpose-built housing. They were not the Egyptian population, and the ease with which their archive can be generalised is the main risk this site presents.",
    ],
    disputes: [
      {
        question: "Could the women of the village read and write?",
        positions:
          "Letters addressed to women and a small number apparently written by them have been cited as evidence of female literacy. Others hold that dictation to a scribe explains the material, and that the absence of women among the recorded scribes is decisive. The texts are consistent with either reading, and the sample is small.",
        level: "disputed",
      },
      {
        question: "How representative is the archive?",
        positions:
          "The material clusters heavily in the Twentieth Dynasty and in a small number of families, partly because Bruyère's recording of findspots was uneven and partly because ostraca survive where they were dumped. Statements about the village frequently rest on a handful of unusually well-documented individuals, and the distinction between what the archive shows and what the community was is not always kept.",
        level: "probable",
      },
    ],
    primarySources: [],
    noAncientTestimony:
      "No ancient author outside the village mentions it. Everything on this page comes from the village's own writing and from its excavation, which is precisely what makes it valuable: for once the evidence is not a literary account of workers written by someone else.",
    museumSlugs: ["british-museum"],
    objectSlugs: [],
    architectureRefs: ["house-and-insula", "necropolis", "pyramid"],
    institutionRefs: ["pharaonic-administration"],
    religionRefs: ["mummification", "egyptian-temple-economy"],
    warfareRefs: [],
    battleRefs: [],
    figureRefs: ["ramesses-ii"],
    themeRefs: ["administrative-state", "afterlife-and-order", "historical-method"],
    bookRefs: [],
    cityRefs: ["memphis"],
    mapSlugs: ["egypt"],
    relatedSites: ["valley-of-the-kings", "karnak", "amarna"],
    imageSlug: "deir-el-medina-excavation",
  },
  // ─── Mesopotamia and Iran ────────────────────────────────────────────
  {
    slug: "pasargadae",
    name: "Pasargadae",
    kind: "citadel",
    region: "near-eastern",
    standfirst:
      "Cyrus's capital, left unfinished at his death — a scatter of pavilions in a watered garden, and a tomb that Alexander found robbed and ordered repaired.",
    description:
      "Pasargadae — the tomb of Cyrus, the earliest known quadripartite garden, the four-winged figure at Gate R, and why the inscription calling Cyrus an Achaemenid is probably not his.",
    geography: {
      modernCountry: "Iran",
      ancientRegion: "Persis",
      latitude: 30.194,
      longitude: 53.167,
      coordinateSubject: "The tomb of Cyrus",
      setting:
        "A high plain in Fars at about nineteen hundred metres, watered by the Pulvar river and open on all sides. Nothing about the position is defensive. The buildings are spread across a park rather than gathered behind a wall, which is itself a statement about how the first Persian king expected to be secure.",
    },
    chronology: {
      start: { year: -546, precision: "approximate", display: "c. 546 BCE" },
      end: { year: -330, precision: "approximate", display: "c. 330 BCE" },
      status: "probable",
      display: "Built from c. 546 BCE; still a royal ceremonial site when Alexander arrived",
      phases: [
        {
          label: "Cyrus's foundation",
          display: "c. 546–530 BCE",
          level: "documented",
          note: "Palaces, gate, garden and tomb, begun after the defeat of Lydia and left incomplete when Cyrus died on campaign. Unfinished stonework is visible in several buildings.",
        },
        {
          label: "Later Achaemenid use",
          display: "530–330 BCE",
          level: "probable",
          note: "Superseded as a working capital by Persepolis and Susa but retained as a ceremonial site, and reportedly the place of the royal investiture. The tomb had a body of priests attached to it.",
        },
        {
          label: "Alexander",
          display: "330 and 324 BCE",
          level: "documented",
          note: "Alexander visited twice. On the second visit he found the tomb broken open and the body disturbed, and ordered it restored — an incident Arrian records from the eyewitness account of Aristobulus, who was given the job.",
        },
      ],
    },
    civilizations: ["achaemenid-empire", "persia", "persian-imperial-system"],
    whatSurvives: [
      "The tomb of Cyrus stands complete: a gabled stone chamber on a plinth of six receding steps, about eleven metres high, in the open. It is the oldest substantially intact free-standing stone monument in Iran and it looks like nothing else the Achaemenids built.",
      "Elsewhere the site is low walls, column bases and single standing pieces spread over more than a kilometre — the audience palace, the residential palace, the gatehouse with its relief of a four-winged figure, and a tower called the Zendan whose purpose is not known.",
      "Between them, excavation has recovered the stone channels and basins of a formal garden: straight watercourses dividing a planted area into quarters, with pavilions placed to look along them. It is the earliest known layout of this kind and it is the ancestor of a garden form that lasted two thousand years.",
    ],
    excavations: [
      {
        period: "1905 and 1928",
        by: "Ernst Herzfeld",
        level: "documented",
        note: "Survey and limited excavation, and the identification of the site with the Pasargadae of the Greek sources, which had been argued over since the eighteenth century.",
      },
      {
        period: "1949–1955",
        by: "Ali Sami for the Iranian Archaeological Service",
        level: "documented",
        note: "Clearance of the palaces and the gate, publishing the plans on which later work built.",
      },
      {
        period: "1961–1963",
        by: "David Stronach, British Institute of Persian Studies",
        level: "documented",
        note: "The excavation that produced the garden: the stone water channels, the pavilion positions and the planting pits. It changed the site from a group of buildings into a designed landscape.",
      },
      {
        period: "1999–present",
        by: "Iranian and joint Iranian–French missions",
        level: "documented",
        note: "Survey of the wider plain, work on the Tall-e Takht platform, and conservation of the tomb, which has suffered from stone decay and from the diversion of water in the surrounding agriculture.",
      },
    ],
    structures: [
      {
        name: "The tomb of Cyrus",
        date: "c. 530 BCE",
        level: "documented",
        note: "A gabled chamber on a stepped plinth, built in dressed limestone with metal cramps. Its form has been connected to Urartian, Lydian, Ionian and Elamite precedent and matches none of them exactly. It survived in part by being taken for the tomb of the mother of Solomon in the Islamic period.",
        architectureSlug: "mausoleum",
        imageSlug: "tomb-of-cyrus",
      },
      {
        name: "Gate R and the four-winged figure",
        date: "c. 540–530 BCE",
        level: "documented",
        note: "A gatehouse with a surviving relief of a standing figure with four wings, in an Elamite robe and an Egyptian hemhem crown. A genius, a protective spirit, and Cyrus himself have all been proposed; the figure has no attribute that decides it.",
      },
      {
        name: "Palace P and Palace S",
        date: "c. 540–530 BCE",
        level: "documented",
        note: "A residential palace and an audience hall, both columned, both with porticoes on more than one side — an openness the later palaces at Persepolis abandon.",
        architectureSlug: "palace",
      },
      {
        name: "The royal garden",
        date: "c. 540 BCE",
        level: "documented",
        note: "Carved stone channels and basins defining a rectangular watered enclosure divided into quarters. The Greek word paradeisos comes from the Persian word for such an enclosure, and this is the earliest one excavated.",
      },
      {
        name: "The Zendan-e Soleyman",
        date: "c. 540–530 BCE",
        level: "documented",
        note: "A square stone tower, now standing to one corner, with a single upper chamber reached by a stair. Its twin at Naqsh-e Rustam is intact and equally unexplained.",
      },
    ],
    finds: [
      {
        name: "The CMa inscription",
        what: "A short trilingual text, once repeated on several buildings, reading “I, Cyrus the king, an Achaemenid”. Only fragments remain in place. Its date is the site's central problem: Old Persian cuneiform appears to have been devised under Darius, which would make these inscriptions a later addition claiming Cyrus for the Achaemenid line Darius belonged to.",
        level: "disputed",
        heldAt: "In position, Pasargadae",
      },
      {
        name: "Achaemenid stone architecture in its first form",
        what: "Column bases, door jambs with the feet of figures, and dressed masonry using techniques — anathyrosis, swallow-tail cramps — that come from Ionian and Lydian practice. The building tells the story of who Cyrus's masons were.",
        level: "documented",
        heldAt: "In position, Pasargadae",
      },
      {
        name: "The Pasargadae treasure",
        what: "Gold and silver jewellery found in a jar in Palace P in the 1960s, of late Achaemenid date. One of the few precious-metal hoards from an Achaemenid palace context.",
        level: "documented",
        museumSlug: "national-museum-of-iran",
      },
    ],
    interpretation: [
      "Pasargadae is the moment before Achaemenid architecture became Achaemenid. The masonry is Lydian and Ionian in technique, the reliefs draw on Elamite and Egyptian conventions, the plan is dispersed across a garden, and there is no fortification wall. Twenty years later Darius built Persepolis on a walled terrace with a single processional route. The difference between the two sites is a change of political style set in stone.",
      "The garden is the site's most consequential feature and the least visible. A quadripartite watered enclosure with pavilions on the axes is the direct ancestor of the Persian garden, of the Islamic chahar bagh, and through it of the formal European garden. That lineage begins in the stone channels Stronach excavated.",
      "The tomb has been read as everything from a Zoroastrian compromise to a borrowing from Anatolia. What can be said is that Cyrus was interred in a built chamber, that a cult with an endowment was attached to it, and that the practice does not match the exposure of the dead that later Zoroastrian texts prescribe — which is one of several reasons for caution about calling the early Achaemenids Zoroastrian.",
      "The epitaph everyone quotes is not on the building. Arrian and Strabo transmit a text they say stood on the tomb — asking the passer-by not to grudge the monument, since the man in it won the Persians an empire. No trace of any such inscription survives, and it comes to us through Greek authors reporting Alexander's officers.",
    ],
    disputes: [
      {
        question: "Are the Cyrus inscriptions contemporary with Cyrus?",
        positions:
          "If Old Persian cuneiform was invented under Darius, as the majority position holds, then a monumental Old Persian inscription naming Cyrus as an Achaemenid cannot be from Cyrus's lifetime and is a retrospective claim — one that suits Darius, whose own descent from a common Achaemenid ancestor is exactly what the Behistun text asserts. A minority argues for an earlier development of the script. The stakes are high: the question is whether the Achaemenid dynasty as such existed before Darius said it did.",
        level: "disputed",
      },
      {
        question: "Who is the four-winged figure?",
        positions:
          "The identification with Cyrus rests largely on the proximity of the CMa inscription, which is itself in doubt. The crown is Egyptian, the dress Elamite, the wings Assyrian; a protective genius of a type common in Near Eastern gateways is the more economical reading. There is no attribute that names him.",
        level: "disputed",
      },
    ],
    primarySources: [
      S(
        "Anabasis of Alexander",
        "6.29",
        "Arrian's account of Alexander at the tomb: the chamber, the golden coffin, the couch, the tapestries, the body disturbed by robbers, and Aristobulus given the task of restoring it. The fullest ancient description of a Persian royal burial, from a man who read the officers' memoirs.",
        "Arrian",
      ),
      S(
        "Cyropaedia",
        "8.7",
        "Xenophon's death scene for Cyrus, in which the king instructs his sons about his burial and about the empire. Philosophical fiction rather than record, and it should be read against Arrian's account of what was actually in the tomb.",
        "Xenophon",
      ),
      S(
        "Histories",
        "1.201–214",
        "Herodotus on Cyrus's last campaign and death against the Massagetae, and on the dispute over what became of his body. A different tradition again, and a reminder that the Greeks had several.",
        "Herodotus",
      ),
    ],
    museumSlugs: ["national-museum-of-iran", "louvre", "british-museum"],
    objectSlugs: [],
    architectureRefs: ["palace", "mausoleum", "columns-and-capitals", "construction-methods"],
    institutionRefs: ["satrap"],
    religionRefs: ["zoroastrian-practice"],
    warfareRefs: ["persian-warfare"],
    battleRefs: [],
    figureRefs: ["cyrus-the-great", "darius-i", "alexander", "xenophon", "arrian", "herodotus"],
    themeRefs: ["persian-kingship", "royal-legitimacy", "empire-and-diversity"],
    bookRefs: ["cyropaedia", "anabasis-of-alexander", "herodotus-histories", "cyrus-cylinder"],
    cityRefs: ["persepolis", "susa"],
    mapSlugs: ["persian-empire"],
    relatedSites: ["naqsh-e-rustam", "behistun"],
    imageSlug: "tomb-of-cyrus",
  },
  {
    slug: "naqsh-e-rustam",
    name: "Naqsh-e Rustam",
    kind: "necropolis",
    region: "near-eastern",
    standfirst:
      "Four Achaemenid kings cut into a cliff, of whom only one can be named from his own inscription — with seven Sasanian reliefs carved beneath them eight centuries later, claiming the inheritance.",
    description:
      "Naqsh-e Rustam — the rock-cut royal tombs, Darius I's inscriptions, the unexplained Ka'ba-ye Zartosht and its Sasanian texts, and Shapur I's relief of a captured Roman emperor.",
    geography: {
      modernCountry: "Iran",
      ancientRegion: "Persis",
      latitude: 29.989,
      longitude: 52.874,
      coordinateSubject: "The tomb of Darius I",
      setting:
        "A cliff face on the north side of the plain, about six kilometres from Persepolis. The rock rises sheer from flat ground, which is what made it usable: the tombs are cut high in the face and are unreachable without scaffolding, and the reliefs below are at eye level to anyone approaching.",
    },
    chronology: {
      start: { year: -1000, precision: "approximate", display: "before 1000 BCE" },
      end: { year: 400, precision: "approximate", display: "c. 400 CE" },
      status: "documented",
      display: "An Elamite relief, four Achaemenid tombs of the 5th century BCE, and seven Sasanian reliefs of the 3rd–4th centuries CE",
      phases: [
        {
          label: "The Elamite relief",
          display: "before 1000 BCE",
          level: "probable",
          note: "The oldest carving on the cliff, largely cut away by a later Sasanian relief. What remains shows two figures in Elamite dress. It establishes that the place was already significant.",
        },
        {
          label: "The Achaemenid tombs",
          display: "c. 486–400 BCE",
          level: "documented",
          note: "Four cruciform façades cut high in the rock, each with a columned portico and above it the king on a platform borne by the peoples of the empire, facing a fire altar.",
        },
        {
          label: "The Sasanian reliefs",
          display: "3rd–4th centuries CE",
          level: "documented",
          note: "Seven large reliefs cut below and between the tombs: investitures, equestrian combats, and Shapur I's triumph over Rome. A new dynasty signing its name beneath the old one.",
        },
      ],
    },
    civilizations: ["achaemenid-empire", "persia", "persian-imperial-system"],
    whatSurvives: [
      "Four tomb façades in the cliff, each about twenty-three metres high, cut as a cross: a blind columned porch below, a relief panel above showing the king before a fire altar on a platform carried by figures in the dress of the empire's peoples, and a small chamber behind with rock-cut sarcophagus troughs.",
      "Below them, seven Sasanian reliefs in deep carving, the largest of them showing Shapur I mounted with a Roman emperor kneeling before him and another standing with his wrist held. Roman defeat, on a Persian cliff, at the scale of a building.",
      "Opposite the cliff stands the Ka'ba-ye Zartosht: a square stone tower about twelve metres high with a single windowless upper chamber, blind windows in dark stone, and a stair. Its walls carry two of the most important inscriptions of the Sasanian period.",
    ],
    excavations: [
      {
        period: "1923 and 1936–1939",
        by: "Ernst Herzfeld, then Erich Schmidt for the Oriental Institute, Chicago",
        level: "documented",
        note: "Clearance around the Ka'ba, recording of the tombs and reliefs, and the first systematic photographic and epigraphic documentation. Schmidt's volume remains the standard publication.",
      },
      {
        period: "1936",
        by: "The reading of the Shapur inscription",
        level: "documented",
        note: "Excavation exposed the lower courses of the Ka'ba and with them the trilingual text of Shapur I in Middle Persian, Parthian and Greek — the fullest Sasanian royal document known, and the only one with a Greek version to check the readings against.",
      },
      {
        period: "1970s–present",
        by: "Iranian antiquities authorities and joint missions",
        level: "documented",
        note: "Conservation, survey of the surrounding plain, and continuing work on the Sasanian inscriptions, which are still producing readings.",
      },
    ],
    structures: [
      {
        name: "The tomb of Darius I",
        date: "before 486 BCE",
        level: "documented",
        note: "The only one identified from its own inscriptions. Darius's texts here, DNa and DNb, are on the façade beside the relief, which is why this tomb anchors the identification of the other three.",
        architectureSlug: "necropolis",
        imageSlug: "naqsh-e-rustam",
      },
      {
        name: "The three unnamed tombs",
        date: "5th century BCE",
        level: "probable",
        note: "Attributed to Xerxes I, Artaxerxes I and Darius II on grounds of position, sequence and style. None carries a royal name. The attributions are conventional and reasonable, and they are attributions.",
        architectureSlug: "necropolis",
      },
      {
        name: "The Ka'ba-ye Zartosht",
        date: "5th century BCE",
        level: "documented",
        note: "Standing almost intact. Fire temple, royal archive, coronation chamber, treasury and tomb have all been proposed. There is no interior fitting, no soot, no inscription of its own from the Achaemenid period, and no agreement.",
      },
      {
        name: "The triumph of Shapur I",
        date: "after 260 CE",
        level: "documented",
        note: "Shapur mounted, with Philip the Arab kneeling and Valerian held by the wrist. The Roman sources do not describe the capture in these terms, and the relief is the Persian account of the same events, carved at monumental scale.",
      },
    ],
    finds: [
      {
        name: "DNa and DNb",
        what: "Darius's tomb inscriptions. DNa lists the lands he holds and names Ahuramazda as the giver of the kingship; DNb is a statement of the king's own qualities — self-control, judgement, the ability to distinguish a true accusation from a false one. It is the closest thing to an Achaemenid theory of rulership in the king's own words.",
        level: "documented",
        heldAt: "In position, Naqsh-e Rustam",
      },
      {
        name: "The Res Gestae of Shapur I",
        what: "A trilingual inscription on the Ka'ba recording Shapur's campaigns against Rome, the capture of Valerian, the cities he took and the foundations he made. The Greek version is what allowed the Middle Persian and Parthian to be read with confidence.",
        level: "documented",
        heldAt: "In position, Naqsh-e Rustam",
      },
      {
        name: "The inscriptions of Kartir",
        what: "The Zoroastrian priest Kartir's own account of his career under four kings, his promotion of the fires and the priesthood, and his measures against other religious communities. A rare case of a non-royal figure inscribing his own record on a royal monument.",
        level: "documented",
        heldAt: "In position, Naqsh-e Rustam",
      },
    ],
    interpretation: [
      "The tombs are an argument about empire, and the argument is in the relief rather than the text. The king stands on a platform held up by around thirty figures, each in the dress of a different people, each labelled in the parallel inscriptions. They are carrying him, not chained. Whatever the political reality of Achaemenid rule, the official self-image is of an empire held up by its constituent peoples rather than one holding them down — and it is worth comparing directly with how Greek writers described the same empire.",
      "The Sasanian reliefs are a deliberate act of appropriation. Eight centuries after the Achaemenids fell, a new Persian dynasty carved its investitures and victories directly beneath their tombs, on the same cliff, in a place that had been continuously visible and continuously meaningful. Whether the Sasanians knew whose tombs these were is doubtful — their own traditions were vague about the Achaemenids — but they knew they were royal and ancient, and that was the point.",
      "The Ka'ba is a standing reminder of how much is unknown. A complete Achaemenid building, in good condition, on the most important royal site in Persis, with no agreed function. Every proposal has an objection, and the honest position is that we do not know what it was for.",
      "Reading this site for Zoroastrianism requires care. The tomb reliefs show a fire altar and name Ahuramazda; they do not show anything that securely identifies the religion of later Zoroastrian texts, and the burial of kings in rock chambers is difficult to reconcile with the exposure of the dead that those texts require. The Sasanian inscriptions, by contrast, are unambiguously Zoroastrian and eight centuries later.",
    ],
    disputes: [
      {
        question: "Which king is in which tomb?",
        positions:
          "Darius I's is certain. For the rest, the sequence Xerxes I, Artaxerxes I, Darius II follows the order of the tombs along the cliff and the assumption that they were cut in reign order. Nothing rules out a different assignment, and the tombs were emptied long ago.",
        level: "probable",
      },
      {
        question: "What was the Ka'ba-ye Zartosht for?",
        positions:
          "A fire temple is the traditional answer and is hard to sustain: the chamber is enclosed, unventilated and shows no burning. A repository for royal documents, a coronation chamber, a treasury and a tomb have all been argued. Its twin at Pasargadae, the Zendan, presents the same problem, which at least shows that whatever it was, it was a type.",
        level: "unknown",
      },
    ],
    primarySources: [
      S(
        "The tomb inscriptions of Darius I",
        "DNa, DNb",
        "The king's list of lands and his account of his own conduct, carved on the façade. Achaemenid royal ideology in the first person, unmediated by Greek reporting.",
      ),
      S(
        "Histories",
        "3.88–97",
        "Herodotus' account of Darius's satrapies and tribute. It should be read beside the DNa land list, which is a different kind of document making a different kind of claim about the same empire.",
        "Herodotus",
      ),
      S(
        "Anabasis of Alexander",
        "3.16, 6.30",
        "Arrian on the Persian royal tombs and Alexander's treatment of them.",
        "Arrian",
      ),
    ],
    museumSlugs: ["national-museum-of-iran", "louvre"],
    objectSlugs: ["susa-archer-frieze-louvre"],
    architectureRefs: ["necropolis", "mausoleum", "columns-and-capitals"],
    institutionRefs: ["satrap"],
    religionRefs: ["zoroastrian-practice"],
    warfareRefs: ["persian-warfare", "persian-army"],
    battleRefs: [],
    figureRefs: ["darius-i", "xerxes-i", "artaxerxes-i", "herodotus", "arrian"],
    themeRefs: ["persian-kingship", "satrapies", "royal-legitimacy", "empire-and-diversity"],
    bookRefs: ["herodotus-histories", "behistun-inscription"],
    cityRefs: ["persepolis", "susa"],
    mapSlugs: ["persian-empire"],
    relatedSites: ["pasargadae", "behistun"],
    imageSlug: "naqsh-e-rustam",
    gallerySlugs: ["persepolis-apadana"],
  },
  {
    slug: "behistun",
    name: "Behistun",
    alsoKnownAs: ["Bisotun", "Bagastana"],
    kind: "rock-monument",
    region: "near-eastern",
    standfirst:
      "A cliff carving a hundred metres above a road, in three languages, that unlocked cuneiform for the modern world — and that is also the winner's account of a disputed succession.",
    description:
      "Behistun — Darius I's trilingual relief and inscription, Rawlinson's copying and the decipherment of cuneiform, the Gaumata story, and why the most important Achaemenid document is also the least neutral.",
    geography: {
      modernCountry: "Iran",
      ancientRegion: "Media",
      latitude: 34.391,
      longitude: 47.436,
      coordinateSubject: "The relief panel",
      setting:
        "A limestone cliff rising from the plain beside the main road from Babylon and Mesopotamia up to Ecbatana and the Iranian plateau, at a spring that made it a natural halt. Every army, caravan and courier on that route passed underneath, which is the entire reason for the monument's position and for its height.",
    },
    chronology: {
      start: { year: -521, precision: "approximate", display: "c. 521 BCE" },
      end: { year: -518, precision: "approximate", display: "c. 518 BCE" },
      status: "documented",
      display: "Carved c. 521–518 BCE, with a later addition",
      phases: [
        {
          label: "The first carving",
          display: "c. 520 BCE",
          level: "documented",
          note: "Relief and Elamite and Babylonian texts, recording the events of Darius's first year.",
        },
        {
          label: "The Old Persian version",
          display: "shortly after",
          level: "probable",
          note: "The Old Persian text appears to have been added to the monument, in a script that may have been created for the purpose. If so, Behistun is the first thing ever written in Old Persian.",
        },
        {
          label: "The added rebel",
          display: "c. 518 BCE",
          level: "documented",
          note: "Skunkha the Scythian, in a pointed hat, was added at the end of the line of bound prisoners. Fitting him in required part of the Elamite text to be erased and recut elsewhere — a visible edit to a monumental document.",
        },
        {
          label: "Afterlife",
          display: "Hellenistic to modern",
          level: "documented",
          note: "The ledge below the relief was cut away, apparently to prevent access. Later travellers took the figures for Christ and the apostles, or for a Persian king and his subjects; the text was unreadable to anyone for over two thousand years.",
        },
      ],
    },
    civilizations: ["achaemenid-empire", "persia", "persian-imperial-system"],
    whatSurvives: [
      "A carved panel some fifteen metres wide, about a hundred metres above the road: Darius with his bow, his foot on a prone figure, facing nine bound men roped by the neck, with the winged disc above and two attendants behind him.",
      "Around and below it, columns of cuneiform in three languages — Old Persian, Elamite and Akkadian — running to well over a thousand lines in total. The Old Persian version is the longest Achaemenid royal inscription known.",
      "The rock is weathering and water runs across parts of the text. Much of what is now read comes from squeezes, casts and photographs taken over the last two centuries rather than from the surface as it stands.",
    ],
    excavations: [
      {
        period: "1835–1847",
        by: "Henry Creswicke Rawlinson",
        level: "documented",
        note: "Rawlinson copied the Old Persian from ladders on a narrow ledge, returning over years, and finally had the Babylonian text — on an overhang he could not reach — copied by a local boy on a rope. The physical difficulty is part of the history of the decipherment.",
      },
      {
        period: "1846–1857",
        by: "Rawlinson, Edward Hincks, Jules Oppert, William Henry Fox Talbot and others",
        level: "documented",
        note: "The decipherment. In 1857 the Royal Asiatic Society had four scholars independently translate a newly found Assyrian text in sealed envelopes; the versions agreed closely enough to establish that Akkadian could be read. Behistun was the trilingual that made it possible.",
      },
      {
        period: "1903–1904 and 1948",
        by: "A. V. Williams Jackson, then George Cameron",
        level: "documented",
        note: "Re-collation of the text at the rock face, with Cameron taking latex squeezes of the passages Rawlinson had reached with difficulty and correcting a number of readings.",
      },
      {
        period: "1990s–present",
        by: "Iranian antiquities authorities",
        level: "documented",
        note: "Conservation, access control and survey of the wider site, which also holds Parthian and Sasanian reliefs and a Seleucid Heracles carved in 148 BCE with a dated Greek inscription.",
      },
    ],
    structures: [
      {
        name: "The relief panel",
        date: "c. 520 BCE",
        level: "documented",
        note: "Darius, two attendants, the figure under his foot, nine bound rebels and the winged disc. The composition follows Mesopotamian victory-stele conventions and adapts them to a cliff.",
        imageSlug: "behistun-relief",
      },
      {
        name: "The trilingual text",
        date: "c. 520–518 BCE",
        level: "documented",
        note: "Old Persian, Elamite and Akkadian versions with differing lengths and some differing content. The Old Persian version's final columns have no counterpart in the others.",
      },
      {
        name: "The removed approach",
        date: "antiquity",
        level: "probable",
        note: "The ledge by which the carvers reached the panel was cut away afterwards. Whether that was to protect the monument or to make it unalterable, it is the reason no one defaced it.",
      },
    ],
    finds: [
      {
        name: "The Aramaic version from Elephantine",
        what: "A papyrus copy of the Behistun text, in Aramaic, found in a Jewish military colony in southern Egypt. It shows that the inscription was not merely a monument but a document circulated across the empire in the administrative language, more than two thousand kilometres away.",
        level: "documented",
        heldAt: "Published from the Elephantine papyri",
      },
      {
        name: "The Babylonian stone copy",
        what: "A fragment of a stone slab from Babylon carrying part of the text, with traces of a version of the relief. Further evidence for publication beyond the cliff.",
        level: "documented",
        museumSlug: "pergamon-museum",
      },
      {
        name: "The Old Persian script itself",
        what: "A cuneiform alphabet of about thirty-six signs, quite unlike the syllabic systems around it. Darius's text claims he made a form of writing that had not existed before, which if taken at face value makes this monument the reason Old Persian is a written language at all.",
        level: "disputed",
        heldAt: "In position, Behistun",
      },
    ],
    interpretation: [
      "Behistun does two incompatible jobs and both matter. It is the key that opened Akkadian, Elamite and Old Persian, and therefore the foundation of the modern study of Mesopotamia and Iran. It is also a political document written by a man who had just taken a throne by force, explaining why that was legitimate.",
      "The account it gives is specific. Cambyses secretly killed his brother Bardiya; a Magus named Gaumata then impersonated the dead Bardiya and seized power while Cambyses was in Egypt; Darius and six companions killed the impostor; and in a single year Darius fought nineteen battles and captured nine rebel kings, by the favour of Ahuramazda. He repeats, several times, that what he has written is true and that the reader should not think it false — which is not the emphasis of a man reporting an uncontested fact.",
      "The alternative reading, which many historians hold, is that Bardiya was the real Bardiya, that his rule was accepted across the empire, and that Darius — a distant relative at best — murdered him and invented the impostor. The pattern of the revolts, which broke out immediately and everywhere after Darius's accession, is consistent with that. Herodotus preserves a version of the story that agrees on the impostor and disagrees on much else; Ctesias gives a third.",
      "The empire-wide publication is the underrated fact. A monumental text on an unreachable cliff persuades nobody, but Aramaic copies circulating to garrisons in Egypt do. Behistun is evidence for an Achaemenid information policy, and that is a more interesting finding about the empire than the succession story it carries.",
    ],
    disputes: [
      {
        question: "Was Gaumata real?",
        positions:
          "Darius says the man on the throne was a Magus impersonating a prince already secretly dead. The objections are that a successful impersonation of a royal brother for months, across an empire, strains belief; that the speed and breadth of the revolts against Darius look like reaction to a usurpation; and that Darius's own genealogy required an Achaemenid line that is otherwise poorly attested. The defence is that the Behistun account is early, detailed, publicly circulated, and names witnesses. There is no independent contemporary source, and the question is genuinely undecided.",
        level: "disputed",
      },
      {
        question: "Did Darius invent Old Persian writing?",
        positions:
          "A passage in the Old Persian version is generally read as a claim that the king created a script. If true, the alphabet was designed for this monument and every earlier Old Persian inscription — including Cyrus's at Pasargadae — is a later addition. The passage is difficult and has been translated in ways that weaken the claim, and a minority holds that the script predates Darius.",
        level: "disputed",
      },
    ],
    primarySources: [
      S(
        "The Behistun inscription",
        "DB, columns I–V",
        "Darius's own account of his accession and the year of revolts, in three languages. The primary Achaemenid historical text, and a partisan one.",
        "Darius I",
      ),
      S(
        "Histories",
        "3.61–88",
        "Herodotus on the Magus, the seven conspirators, the killing and the debate on constitutions that follows. Written some seventy years later from Persian informants, and agreeing with Darius on the impostor while differing on nearly every detail of what happened next.",
        "Herodotus",
      ),
      S(
        "Persica",
        "fragments",
        "Ctesias, physician at the Persian court, gives a third version with different names and a different sequence. The disagreement among the three is the evidence.",
        "Ctesias",
      ),
    ],
    museumSlugs: ["pergamon-museum", "british-museum"],
    objectSlugs: [],
    architectureRefs: [],
    institutionRefs: ["satrap", "imperial-administration"],
    religionRefs: ["zoroastrian-practice"],
    warfareRefs: ["persian-warfare", "persian-army"],
    battleRefs: [],
    figureRefs: ["darius-i", "cyrus-the-great", "xerxes-i", "herodotus"],
    themeRefs: [
      "persian-kingship",
      "royal-legitimacy",
      "imperial-communication",
      "political-legitimacy",
      "satrapies",
    ],
    bookRefs: ["behistun-inscription", "herodotus-histories", "persica"],
    cityRefs: ["susa", "babylon", "persepolis"],
    mapSlugs: ["persian-empire"],
    relatedSites: ["pasargadae", "naqsh-e-rustam", "nineveh"],
    imageSlug: "behistun-relief",
  },
  {
    slug: "ur",
    name: "Ur",
    alsoKnownAs: ["Tell al-Muqayyar"],
    kind: "citadel",
    region: "near-eastern",
    standfirst:
      "Woolley's Royal Cemetery: sixteen tombs where a ruler was buried with dozens of attendants who went into the pit with them — and a century-long argument about how they died.",
    description:
      "Ur — the ziggurat of Ur-Nammu, Woolley's excavation of the Royal Cemetery, the Standard of Ur and Puabi's tomb, the attendant burials, and the silt layer he published as Noah's flood.",
    geography: {
      modernCountry: "Iraq",
      ancientRegion: "Sumer",
      latitude: 30.963,
      longitude: 46.103,
      coordinateSubject: "The ziggurat of Ur-Nammu",
      setting:
        "A mound in the alluvial plain of southern Iraq. In the third millennium BCE the Euphrates ran close by and the head of the Gulf was much nearer than it is now, so Ur was a river and sea port; both the river and the coast have since moved, leaving the site in dry desert.",
    },
    chronology: {
      start: { year: -5000, precision: "approximate", display: "c. 5000 BCE" },
      end: { year: -400, precision: "approximate", display: "c. 400 BCE" },
      status: "documented",
      display: "Occupied from the Ubaid period to the Achaemenid, with its peak c. 2100–2000 BCE",
      phases: [
        {
          label: "Early occupation",
          display: "c. 5000–2900 BCE",
          level: "documented",
          note: "Ubaid and Uruk-period levels beneath everything else, reached only in deep soundings.",
        },
        {
          label: "The Royal Cemetery",
          display: "c. 2600–2450 BCE",
          level: "documented",
          note: "Early Dynastic III. Around eighteen hundred graves, of which sixteen were built tomb chambers with attendant burials and extraordinary quantities of gold, silver, lapis and carnelian.",
        },
        {
          label: "The Third Dynasty of Ur",
          display: "c. 2112–2004 BCE",
          level: "documented",
          note: "The city's political peak under Ur-Nammu and Shulgi: the ziggurat, the great temple precinct, and an administrative apparatus that produced tens of thousands of tablets.",
        },
        {
          label: "Later city",
          display: "2000–400 BCE",
          level: "documented",
          note: "Occupied under Isin-Larsa, Babylonian and Kassite rule; the ziggurat restored by Nabonidus in the sixth century BCE, whose own excavations of earlier foundations make him a plausible candidate for the first archaeologist. Abandoned as the river shifted.",
        },
      ],
    },
    civilizations: ["babylon"],
    whatSurvives: [
      "The ziggurat's lowest stage stands, faced in baked brick set in bitumen, with three converging stairways of a hundred steps meeting at a landing. The upper stages are lost; what a visitor sees above the first terrace is largely a reconstruction carried out in the 1980s.",
      "Around it, the temple precinct, the residence of the entu priestess, storehouses, and beyond them the excavated streets of a residential quarter of the early second millennium — courtyard houses of two storeys with chapels and family burials under the floors.",
      "The Royal Cemetery itself is an area of ground. Its contents are in three cities on two continents.",
    ],
    excavations: [
      {
        period: "1853–1854",
        by: "John George Taylor for the British Museum",
        level: "documented",
        note: "Taylor dug into the ziggurat corners and found inscribed foundation cylinders of Nabonidus naming the building and its original builder, which identified the site as Ur.",
      },
      {
        period: "1922–1934",
        by: "Leonard Woolley, for the British Museum and the University of Pennsylvania Museum",
        level: "documented",
        note: "Twelve seasons. The ziggurat, the temple precinct, the houses, the deep sounding, and from 1926 the Royal Cemetery. Woolley was an exceptional excavator of fragile material — he recovered the lyres by pouring plaster into the voids their decayed wood had left — and an enthusiastic publicist, which is the source of both his reputations.",
      },
      {
        period: "1929",
        by: "Woolley's flood announcement",
        level: "documented",
        note: "A deep sounding produced a sterile silt layer some two and a half metres thick between occupation levels. Woolley announced it as the flood of Genesis. The layer is real; comparable layers at other Mesopotamian sites are not contemporary with it, and it records a severe local inundation.",
      },
      {
        period: "1980s and 2009–present",
        by: "Iraqi restoration, and the joint Iraqi–American missions",
        level: "documented",
        note: "The ziggurat's lower stages were rebuilt under the Iraqi government. Later work has concentrated on survey, conservation and the reassessment of the older excavation records, including a re-examination of the skeletal material in Philadelphia.",
      },
    ],
    structures: [
      {
        name: "The ziggurat of Ur-Nammu",
        date: "c. 2100 BCE, restored 6th century BCE",
        level: "documented",
        note: "A stepped platform of mudbrick faced with baked brick, with weeper holes to let the core dry. The lowest stage is largely ancient; what stands above it is modern reconstruction and should be read as such.",
        architectureSlug: "construction-methods",
      },
      {
        name: "The Royal Cemetery",
        date: "c. 2600–2450 BCE",
        level: "documented",
        note: "Built stone and brick chambers at the bottom of shafts, approached by ramps, with the attendant burials laid out in the shaft rather than in the chamber.",
        architectureSlug: "necropolis",
      },
      {
        name: "The Giparu",
        date: "c. 2100 BCE and later",
        level: "documented",
        note: "The residence of the entu, the high priestess of the moon god, an office held by royal daughters. Enheduanna, daughter of Sargon of Akkad and the earliest author in world literature whose name is attached to her work, held it centuries earlier.",
      },
      {
        name: "The houses of Area AH",
        date: "c. 1900 BCE",
        level: "documented",
        note: "A quarter of courtyard houses with streets, drains, private chapels and burials beneath the floors, together with school tablets. Domestic Mesopotamian life at a level of detail available at very few sites.",
        architectureSlug: "house-and-insula",
      },
    ],
    finds: [
      {
        name: "The Standard of Ur",
        what: "A hollow box inlaid in shell, lapis and red limestone, with a register of war on one side and one of feasting on the other. Its original function is unknown — Woolley's guess that it was a standard carried on a pole is a guess, and the name has stuck.",
        level: "documented",
        museumSlug: "british-museum",
      },
      {
        name: "The tomb of Puabi",
        what: "An undisturbed chamber with a headdress of gold leaves and lapis, a cylinder seal naming her, and attendants in the shaft outside. Her title has been read as queen and as lady; whether she ruled or was the wife of a ruler is not settled by the seal.",
        level: "documented",
        museumSlug: "british-museum",
      },
      {
        name: "The Ram in a Thicket",
        what: "A pair of goat figures on their hind legs against a flowering plant, in gold, lapis and shell. Woolley named them for Genesis. One is in London and one in Philadelphia, and both were reconstructed around the decayed originals.",
        level: "documented",
        museumSlug: "british-museum",
      },
      {
        name: "The Great Lyre and the attendants",
        what: "Lyres with bull's-head sound boxes, recovered by casting the voids left by their vanished wood, found among the bodies of the people buried with the tomb owners.",
        level: "documented",
        heldAt: "University of Pennsylvania Museum, and the Iraq Museum, Baghdad",
      },
      {
        name: "The Disk of Enheduanna",
        what: "A carved alabaster disk showing the priestess officiating at an altar, with an inscription naming her as daughter of Sargon and entu of Nanna. The earliest securely identified portrait of a named author.",
        level: "documented",
        heldAt: "University of Pennsylvania Museum",
      },
    ],
    interpretation: [
      "The Royal Cemetery is the single most difficult body of evidence in Mesopotamian archaeology, because what it documents is not in doubt and what it means is entirely unclear. Dozens of people — soldiers with weapons, women with elaborate headdresses, grooms with oxen and carts — were placed in a burial shaft alongside a principal body, in careful order, and buried. Nothing in Sumerian literature describes the practice, and it appears at Ur, in this form, for a couple of generations only.",
      "Woolley's reconstruction, that the attendants processed in, drank a drug from the cups found beside them and lay down, is elegant and has shaped every popular account since. Re-examination of two skulls in the 1990s and 2000s found perimortem fractures consistent with a heavy blow, and traces suggesting bodies were heated and treated with mercury compounds before burial. The picture is now less peaceful and considerably less clear.",
      "The site is also a case study in how excavation is funded and reported. Woolley wrote for newspapers, and his interpretations — the flood, the ram in the thicket, Ur of the Chaldees — were pitched to a public that read Genesis. That does not make the excavation dishonest; his records are unusually good. It does mean that the framing of the finds needs to be separated from the finds themselves.",
      "The identification with the Ur of Abraham is traditional rather than demonstrated. The biblical text says Ur of the Chaldees; the Chaldeans are a first-millennium presence, well after the period the patriarchal narratives are usually placed in, and a northern Mesopotamian Ur has also been proposed. The site's importance does not depend on the connection.",
    ],
    disputes: [
      {
        question: "How did the attendants die?",
        positions:
          "Woolley proposed voluntary poison, on the evidence of the cups and the orderly arrangement. The cranial fractures found in later CT work indicate at least some deaths by blunt force, and the evidence of post-mortem heating suggests bodies were prepared over a period rather than buried immediately. Whether participation was voluntary, coerced or a matter of status obligation is not recoverable from the bodies.",
        level: "disputed",
      },
      {
        question: "What was Woolley's flood layer?",
        positions:
          "A thick sterile silt deposit between occupation levels is a fact of the section. Similar deposits at Kish, Shuruppak and Uruk are at different depths and different dates, so no single event is recorded across the region. The layer documents a major flood at Ur, and Mesopotamian flood literature long predates Genesis, which is the more useful connection.",
        level: "documented",
      },
    ],
    primarySources: [
      S(
        "The Epic of Gilgamesh",
        "Tablet XI",
        "The Babylonian flood narrative, recovered from Nineveh rather than Ur, and the reason a silt layer in southern Iraq was read as biblical in the first place. It predates the Genesis account and shares its structure.",
      ),
      S(
        "The Sumerian King List",
        "throughout",
        "Lists dynasties of Ur among the cities holding kingship, with reign lengths that are plainly schematic. A native chronological framework, and one that has to be used with the greatest caution.",
      ),
      S(
        "The Nabonidus cylinders",
        "Ur foundation deposits",
        "The last Babylonian king's record of restoring the ziggurat and of investigating the foundations of earlier builders. He names Ur-Nammu, which is how the building was attributed.",
        "Nabonidus",
      ),
    ],
    museumSlugs: ["british-museum"],
    objectSlugs: [],
    architectureRefs: ["necropolis", "house-and-insula", "construction-methods", "building-materials"],
    institutionRefs: [],
    religionRefs: ["mesopotamian-temple-household", "votive-dedication"],
    warfareRefs: ["logistics"],
    battleRefs: [],
    figureRefs: ["hammurabi"],
    themeRefs: ["administrative-state", "afterlife-and-order", "sacred-kingship"],
    bookRefs: ["code-of-hammurabi"],
    cityRefs: ["babylon"],
    mapSlugs: ["mediterranean"],
    relatedSites: ["nineveh", "behistun"],
    imageSlug: "ur-ziggurat",
    gallerySlugs: ["hammurabi-stele"],
  },
  {
    slug: "nineveh",
    name: "Nineveh",
    alsoKnownAs: ["Kuyunjik", "Nebi Yunus"],
    kind: "citadel",
    region: "near-eastern",
    standfirst:
      "Sennacherib's capital, and the find-place of the largest surviving library of the ancient Near East — including the tablet that told a Victorian bank-note engraver there had been a flood story before Genesis.",
    description:
      "Nineveh — Layard and Rassam, the Library of Ashurbanipal and George Smith's flood tablet, the Lachish reliefs, the fall of 612 BCE, and the destruction of the site's monuments after 2014.",
    geography: {
      modernCountry: "Iraq",
      ancientRegion: "Assyria",
      latitude: 36.360,
      longitude: 43.153,
      coordinateSubject: "The Kuyunjik mound",
      setting:
        "On the east bank of the Tigris opposite modern Mosul, where the Khosr stream joins the river. The city wall enclosed some seven hundred and fifty hectares, with two great mounds inside it — Kuyunjik, holding the palaces, and Nebi Yunus, holding the arsenal and now a shrine and a cemetery.",
    },
    chronology: {
      start: { year: -6000, precision: "approximate", display: "c. 6000 BCE" },
      end: { year: -612, precision: "exact", display: "612 BCE" },
      status: "documented",
      display: "Settled from the Neolithic; imperial capital from 705 BCE until its fall in 612 BCE",
      phases: [
        {
          label: "Early city",
          display: "c. 6000–1000 BCE",
          level: "documented",
          note: "Deep occupation under Kuyunjik, and a temple of Ishtar of Nineveh whose reputation reached Egypt — the Amarna letters record a statue of her sent to the pharaoh.",
        },
        {
          label: "The imperial capital",
          display: "705–612 BCE",
          level: "documented",
          note: "Sennacherib moved the capital here and rebuilt on an enormous scale: a new wall, fifteen gates, an aqueduct and canal system, gardens, and the palace he called the Palace Without Rival.",
        },
        {
          label: "The fall",
          display: "612 BCE",
          level: "documented",
          note: "Taken by a coalition of Medes and Babylonians after a siege. A Babylonian chronicle tablet records the campaign and the date, and burn layers and unburied bodies in the gates confirm it.",
        },
        {
          label: "After",
          display: "6th century BCE onwards",
          level: "documented",
          note: "Reduced occupation, a Hellenistic and later settlement, and the growth of the shrine on Nebi Yunus. The mounds were never wholly deserted.",
        },
      ],
    },
    civilizations: ["babylon"],
    whatSurvives: [
      "The city wall can be traced for twelve kilometres, with several gates reconstructed in the twentieth century. The two mounds stand above the plain, Kuyunjik largely open ground and Nebi Yunus built over.",
      "The palaces survive as foundations and as the negative of what was removed: the great carved gypsum slabs that lined their walls were cut out in the nineteenth century and shipped to Europe, and the buildings are now known mainly from the reliefs in museums and from the excavators' plans.",
      "Sennacherib's water system survives better than his palace. The aqueduct at Jerwan, some fifty kilometres away, is a stone-built channel carried over a valley on piers — the earliest large stone aqueduct known — and the canal head at Khinis carries reliefs and an inscription describing the works.",
    ],
    excavations: [
      {
        period: "1820",
        by: "Claudius James Rich",
        level: "documented",
        note: "Survey and a plan of the mounds, and the collection of inscribed fragments. Rich established that the site was Nineveh before anyone dug it.",
      },
      {
        period: "1842–1844",
        by: "Paul-Émile Botta",
        level: "documented",
        note: "The French consul dug Kuyunjik, found little near the surface, and moved to Khorsabad, where he found Sargon II's palace. The failure at Nineveh was a matter of where he put his trenches.",
      },
      {
        period: "1847–1851",
        by: "Austen Henry Layard",
        level: "documented",
        note: "The South-West Palace of Sennacherib, with something like three kilometres of carved wall reliefs, including the Lachish room. Layard's excavation was tunnelling along walls to extract sculpture, and it was conducted in competition with the French for the British Museum.",
      },
      {
        period: "1852–1854",
        by: "Hormuzd Rassam",
        level: "documented",
        note: "Assyrian-born, Layard's assistant and then his successor, Rassam found Ashurbanipal's North Palace with its lion-hunt reliefs and a large part of the library. He was systematically credited less than his European colleagues in the accounts of the period.",
      },
      {
        period: "1873",
        by: "George Smith",
        level: "documented",
        note: "Smith, a bank-note engraver who taught himself Akkadian while working at the British Museum, identified a flood narrative among the Nineveh tablets in 1872. A newspaper funded him to go and find the missing piece, and he did — an outcome so improbable it is usually told as anecdote and is in fact documented.",
      },
      {
        period: "1927–1932, 1987–1990",
        by: "R. Campbell Thompson, then the University of California expedition",
        level: "documented",
        note: "Stratigraphic work on the deep levels and on the Ishtar temple, and survey of the lower town, which had been almost ignored while the palaces were being emptied.",
      },
      {
        period: "2014–2016",
        by: "Destruction",
        level: "documented",
        note: "The shrine on Nebi Yunus was blown up, and the reconstructed Mashki and Adad gates were bulldozed. Tunnels driven under Nebi Yunus during the same period exposed previously unrecorded Assyrian reliefs, which were then documented by archaeologists after 2017.",
      },
    ],
    structures: [
      {
        name: "The South-West Palace",
        date: "c. 700–690 BCE",
        level: "documented",
        note: "Sennacherib's Palace Without Rival: some eighty rooms, wall reliefs throughout, colossal human-headed bulls at the doorways. Known from the excavators' plans and the removed sculpture.",
        architectureSlug: "palace",
      },
      {
        name: "The North Palace",
        date: "c. 645 BCE",
        level: "documented",
        note: "Ashurbanipal's, and the source of the lion-hunt reliefs — the finest Assyrian narrative sculpture, and among the finest relief carving from anywhere in the ancient world.",
        architectureSlug: "palace",
      },
      {
        name: "The city wall and gates",
        date: "c. 700 BCE",
        level: "documented",
        note: "Twelve kilometres of double wall with fifteen named gates. Several were excavated and reconstructed in the twentieth century; two of those reconstructions were destroyed in 2016.",
        architectureSlug: "construction-methods",
      },
      {
        name: "The Jerwan aqueduct",
        date: "c. 690 BCE",
        level: "documented",
        note: "A stone channel some three hundred metres long carried across a valley, built of around two million blocks, with an inscription of Sennacherib recording it. It brought water to Nineveh from the hills fifty kilometres away.",
        architectureSlug: "aqueduct",
      },
    ],
    finds: [
      {
        name: "The Library of Ashurbanipal",
        what: "Around thirty thousand tablets and fragments from the two palaces: omen series, medical and astronomical texts, lexical lists, royal correspondence, and literature including the fullest text of the Epic of Gilgamesh. Assembled deliberately, partly by requisition from Babylonian temples, and baked hard by the fire that destroyed the city.",
        level: "documented",
        museumSlug: "british-museum",
      },
      {
        name: "The Lachish reliefs",
        what: "A room-sized sequence showing the Assyrian siege of the Judaean city of Lachish in 701 BCE: the ramp, the siege engines, the assault, the deportation. Lachish itself has been excavated and its siege ramp found, which makes this one of the very few ancient battle images checkable against the ground.",
        level: "documented",
        museumSlug: "british-museum",
      },
      {
        name: "The lion hunt reliefs",
        what: "Ashurbanipal hunting lions released from cages in an arena. The dying animals are observed with a precision the human figures are not given, and the scene is a statement about kingship rather than a record of sport.",
        level: "documented",
        museumSlug: "british-museum",
      },
      {
        name: "The Fall of Nineveh Chronicle",
        what: "A Babylonian chronicle tablet recording the campaigns of 616–609 BCE, including the capture of the city in 612. It is the reason the fall of Nineveh is one of the securely dated events of the ancient Near East.",
        level: "documented",
        museumSlug: "british-museum",
      },
    ],
    interpretation: [
      "Nineveh is where Assyria stopped being a name in the Hebrew Bible and became a documented state. Before Layard and Rassam, the Assyrian empire was known from scripture and from Greek writers who had it largely wrong; within twenty years it had palaces, kings' names, campaign records, an art, a literature and a library.",
      "The library is the most important single find. Because Ashurbanipal collected systematically rather than accumulating incidentally, and because the collection was fired when the city burned, the result is a curated corpus of Mesopotamian knowledge surviving in one place. Almost everything known about Babylonian astronomy, divination and literature depends on it, including the standard text of Gilgamesh.",
      "The excavation methods have a cost that is still being paid. Layard and Rassam were extracting sculpture for museums under competitive pressure, and they tunnelled along wall faces, removing the reliefs and leaving the buildings and their contents largely unrecorded. Much of what a modern excavation would want to know about these palaces was destroyed to get the slabs out.",
      "The destruction of 2014 to 2016 belongs on the record as an event in the site's history, not as a postscript. It removed reconstructions, a shrine of long standing, and unknown quantities of buried evidence. The tunnels dug through Nebi Yunus in the same period exposed Assyrian reliefs nobody had recorded, which is a genuine gain retrieved from a deliberate loss and does not offset it.",
    ],
    disputes: [
      {
        question: "Were the Hanging Gardens at Nineveh?",
        positions:
          "The gardens are attributed by Greek and Roman writers to Babylon, where no trace of them has been found and where Babylonian records do not mention them. Stephanie Dalley has argued that Sennacherib's inscriptions and reliefs describe an irrigated terraced garden at Nineveh with a screw-lifted water supply, and that the tradition attached the wonder to the wrong city. The Nineveh garden is documented; the identification with the wonder is a hypothesis, and a well-argued one.",
        level: "disputed",
      },
      {
        question: "What do the Lachish reliefs prove about the siege of Jerusalem?",
        positions:
          "The reliefs and Sennacherib's prisms record the capture of Lachish and the shutting up of Hezekiah in Jerusalem like a bird in a cage — and pointedly do not record Jerusalem's capture. The biblical account has the Assyrian army destroyed by divine action. The convergence on Jerusalem not falling is genuine; the explanations offered by the two sources are not comparable kinds of statement, and the reasons the siege was lifted are argued.",
        level: "disputed",
      },
    ],
    primarySources: [
      S(
        "The annals of Sennacherib",
        "The Taylor and Jerusalem prisms",
        "The king's own campaign record, including the third campaign against Judah, the tribute exacted, and the phrase about Hezekiah shut up in Jerusalem like a bird in a cage.",
        "Sennacherib",
      ),
      S(
        "The Epic of Gilgamesh",
        "Standard Babylonian version, Tablets I–XII",
        "Recovered from this library. The flood narrative in Tablet XI was the passage George Smith identified in 1872.",
      ),
      S(
        "Histories",
        "1.102–106, 2.150",
        "Herodotus on Nineveh's fall and on the Median campaigns, written nearly two centuries later and confused in detail. The Babylonian chronicle is much the better source, and the contrast is instructive.",
        "Herodotus",
      ),
    ],
    museumSlugs: ["british-museum", "louvre"],
    objectSlugs: [],
    architectureRefs: ["palace", "aqueduct", "construction-methods", "necropolis"],
    institutionRefs: [],
    religionRefs: ["mesopotamian-temple-household"],
    warfareRefs: ["siege-warfare", "fortifications", "logistics"],
    battleRefs: [],
    figureRefs: ["herodotus", "hammurabi"],
    themeRefs: ["empire-building", "administrative-state", "monumentality", "historical-memory"],
    bookRefs: ["herodotus-histories"],
    cityRefs: ["babylon"],
    mapSlugs: ["mediterranean"],
    relatedSites: ["ur", "behistun"],
    imageSlug: "nineveh-mashki-gate",
  },
];

// ──────────────────────────────────────────────────────────────────────
// Accessors
// ──────────────────────────────────────────────────────────────────────

export function getSite(slug: string): ArchaeologicalSite | undefined {
  return ARCHAEOLOGICAL_SITES.find((s) => s.slug === slug);
}

export function sitesInRegion(region: SiteRegion): ArchaeologicalSite[] {
  return ARCHAEOLOGICAL_SITES.filter((s) => s.region === region);
}

/** Sites whose finds are held by a given institution. */
export function sitesForMuseum(museumSlug: string): ArchaeologicalSite[] {
  return ARCHAEOLOGICAL_SITES.filter(
    (s) =>
      s.museumSlugs.includes(museumSlug) ||
      s.finds.some((f) => f.museumSlug === museumSlug),
  );
}

/** Sites that sit inside, or are otherwise tied to, a given city. */
export function sitesForCity(citySlug: string): ArchaeologicalSite[] {
  return ARCHAEOLOGICAL_SITES.filter(
    (s) => s.parentCitySlug === citySlug || s.cityRefs.includes(citySlug),
  );
}

/** Sites carrying a coordinate pair, for future mapping. */
export function locatedSites(): ArchaeologicalSite[] {
  return ARCHAEOLOGICAL_SITES.filter(
    (s) =>
      typeof s.geography.latitude === "number" &&
      typeof s.geography.longitude === "number",
  );
}

/**
 * Rendered coordinate string. Deliberately fixed at three decimal
 * places — roughly a hundred metres — because these are locators for
 * a named feature, not survey positions.
 */
export function formatCoordinates(g: SiteGeography): string | undefined {
  if (typeof g.latitude !== "number" || typeof g.longitude !== "number") {
    return undefined;
  }
  const ns = g.latitude >= 0 ? "N" : "S";
  const ew = g.longitude >= 0 ? "E" : "W";
  return `${Math.abs(g.latitude).toFixed(3)}° ${ns}, ${Math.abs(g.longitude).toFixed(3)}° ${ew}`;
}

/** Chronological order, earliest first, by the start year. */
export function sitesByDate(): ArchaeologicalSite[] {
  return [...ARCHAEOLOGICAL_SITES].sort(
    (a, b) => a.chronology.start.year - b.chronology.start.year,
  );
}

export interface SiteStats {
  total: number;
  withCoordinates: number;
  withParentCity: number;
  excavations: number;
  structures: number;
  finds: number;
  disputes: number;
  primarySources: number;
  withoutAncientTestimony: number;
}

export function siteStats(): SiteStats {
  return {
    total: ARCHAEOLOGICAL_SITES.length,
    withCoordinates: locatedSites().length,
    withParentCity: ARCHAEOLOGICAL_SITES.filter((s) => s.parentCitySlug).length,
    excavations: ARCHAEOLOGICAL_SITES.reduce((n, s) => n + s.excavations.length, 0),
    structures: ARCHAEOLOGICAL_SITES.reduce((n, s) => n + s.structures.length, 0),
    finds: ARCHAEOLOGICAL_SITES.reduce((n, s) => n + s.finds.length, 0),
    disputes: ARCHAEOLOGICAL_SITES.reduce((n, s) => n + s.disputes.length, 0),
    primarySources: ARCHAEOLOGICAL_SITES.reduce(
      (n, s) => n + s.primarySources.length,
      0,
    ),
    withoutAncientTestimony: ARCHAEOLOGICAL_SITES.filter(
      (s) => s.noAncientTestimony,
    ).length,
  };
}
