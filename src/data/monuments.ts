/**
 * Named monuments registry.
 *
 * The Building rung. Before this layer the platform could say what a
 * Greek temple is (`/architecture/temple`) and what has been excavated on
 * the Athenian Acropolis (`/archaeology/acropolis-of-athens`), and it had
 * no page for the Parthenon. The seventy buildings the architecture
 * registry names existed as inline data with no URL, so nothing — not a
 * battle, not an institution, not a cult practice, not an object — could
 * link to a building.
 *
 * ─── Four entities, kept apart ──────────────────────────────────────
 *
 *   Athens         is a city              /cities/athens
 *   The Acropolis  is an excavated site   /archaeology/acropolis-of-athens
 *   The Parthenon  is a monument          /monuments/parthenon
 *   The Greek temple is a building type   /architecture/temple
 *
 * These are four different subjects with four different search intents,
 * and the discipline that keeps them apart is mechanical:
 *
 *   - a monument slug may not equal a city, site or architecture-type
 *     slug, and a monument title may not equal a city or site title;
 *   - the monument template's section headings are declared here and
 *     checked against the city and site heading sets;
 *   - every monument must resolve to a site, a city, or an explicit
 *     statement that the platform has no page for the place it stands in.
 *     A monument floating free of any place is a page nobody can reach
 *     through the graph.
 *
 * ─── What this layer refuses ────────────────────────────────────────
 *
 * `MONUMENT_DEFERS_TO` records subjects that look like monuments and are
 * already fully covered elsewhere, with the reason. Behistun is the clear
 * case: `/archaeology/behistun` is already a rock-monument page covering
 * the relief, the inscription, the decipherment and the succession
 * dispute. A `/monuments/behistun` page would say the same things at the
 * same length for the same query.
 *
 * ─── Numbers ────────────────────────────────────────────────────────
 *
 * Ancient dimensions are quoted with a confidence that is often
 * borrowed rather than earned. "The Pantheon's dome is 43.3 m across"
 * is a modern survey measurement; "the Colosseum seated 50,000" is a
 * modern estimate from seat-space; "the Great Pyramid was 280 cubits
 * high" is an ancient unit converted on an assumption about the cubit.
 * Those are three different kinds of statement.
 *
 * So there is no field in which a bare measurement can be stored.
 * `SourcedMeasurement` carries the figure, what it rests on, and an
 * evidence level, and the gate rejects one without a basis.
 *
 * The same applies to people. `AttributedPerson` requires a `basis` —
 * a building inscription, a named ancient source, a modern attribution —
 * and the gate refuses to let an attribution be marked `documented`
 * unless the basis names something checkable. Iktinos is named for the
 * Parthenon by Plutarch and Vitruvius, four and five centuries later,
 * and not by any building account that survives. Imhotep is named on a
 * statue base of his own king. Those are not the same claim.
 */

import type { EvidenceLevel, SourceReference } from "./evidence";
import type { HistoricalDate, SiteRegion } from "./archaeological-sites";

/**
 * The region vocabulary is imported from the sites registry rather than
 * redefined, so the two layers group identically on their indexes and a
 * new region cannot be added to one without the other.
 */
export type { SiteRegion as MonumentRegion };

export type MonumentKind =
  | "temple"
  | "civic-building"
  | "commemorative"
  | "funerary"
  | "spectacle"
  | "palace"
  | "gateway"
  | "bath";

export const MONUMENT_KIND_LABEL: Record<MonumentKind, string> = {
  temple: "Temple and sanctuary building",
  "civic-building": "Civic building",
  commemorative: "Commemorative monument",
  funerary: "Tomb and funerary monument",
  spectacle: "Building for spectacle",
  palace: "Palace and audience hall",
  gateway: "Gateway",
  bath: "Bath building",
};

export const MONUMENT_KIND_ORDER: ReadonlyArray<MonumentKind> = [
  "temple",
  "civic-building",
  "commemorative",
  "funerary",
  "spectacle",
  "palace",
  "gateway",
  "bath",
];

/**
 * What is actually there now. This is the field a reader most wants and
 * most rarely gets: "the Temple of Castor and Pollux" and "the Pantheon"
 * are both called monuments of Rome and one of them is three columns.
 */
export type MonumentCondition =
  /** Roofed, entire, in use or usable. */
  | "standing"
  /** Standing to substantial height, roofless or partly collapsed. */
  | "standing-ruin"
  /** Enough upstanding fabric to read the plan; no elevation. */
  | "foundations"
  /** Taken apart and re-erected, wholly or in part, in modern times. */
  | "reassembled"
  /** Dismantled and rebuilt somewhere else. */
  | "relocated"
  /** Known from excavation, description or fragments; nothing stands. */
  | "vanished";

export const CONDITION_LABEL: Record<MonumentCondition, string> = {
  standing: "Standing",
  "standing-ruin": "Standing ruin",
  foundations: "Foundations and plan",
  reassembled: "Re-erected in modern times",
  relocated: "Moved from its site",
  vanished: "Nothing stands",
};

export interface SourcedMeasurement {
  /** What is being measured, e.g. "Interior diameter of the dome". */
  label: string;
  /** The figure as rendered, with its unit. */
  value: string;
  /**
   * What the figure rests on: a modern survey, an ancient text, a
   * conversion from an ancient unit, an estimate from seat-space.
   * Required — the gate rejects a measurement without one.
   */
  basis: string;
  level: EvidenceLevel;
  note?: string;
}

export type AttributionRole =
  | "patron"
  | "architect"
  | "sculptor"
  | "engineer"
  | "dedicator"
  | "completed-by";

export const ROLE_LABEL: Record<AttributionRole, string> = {
  patron: "Commissioned by",
  architect: "Architect",
  sculptor: "Sculptor",
  engineer: "Engineer",
  dedicator: "Dedicated by",
  "completed-by": "Completed by",
};

export interface AttributedPerson {
  name: string;
  role: AttributionRole;
  level: EvidenceLevel;
  /**
   * What supports the attribution. A building inscription, a named
   * ancient author with a date, a modern argument. Required, and the
   * gate will not accept `documented` unless this names something a
   * reader could check.
   */
  basis: string;
  /** Slug into content/philosophers, where the person has an entry. */
  figureSlug?: string;
}

export interface MonumentPhase {
  label: string;
  /** Rendered span. */
  display: string;
  level: EvidenceLevel;
  note: string;
}

export interface MaterialUse {
  material: string;
  /** What it was used for in this building. */
  use: string;
  level: EvidenceLevel;
}

export interface MuseumFragment {
  /** What the fragment is. */
  what: string;
  level: EvidenceLevel;
  /** Slug into src/data/museums.ts. */
  museumSlug?: string;
  /** Holder named in prose where it is not in the museum registry. */
  heldAt?: string;
  /** Slug into src/data/object-provenance.ts, where a record exists. */
  objectSlug?: string;
  note?: string;
}

export interface Monument {
  slug: string;
  title: string;
  alternateNames?: string[];
  kind: MonumentKind;
  region: SiteRegion;
  standfirst: string;
  description: string;

  /** Slugs into content/civilizations. */
  civilizations: string[];
  /** Slug into src/data/archaeological-sites.ts, where one covers it. */
  siteSlug?: string;
  /** Slug into src/data/cities.ts, where the platform covers the city. */
  citySlug?: string;
  /**
   * Set only when neither a site nor a city page exists for the place
   * this monument stands in. Names the place and says so, rather than
   * leaving the monument unplaced in silence. The gate requires one of
   * these three.
   */
  unplacedNote?: string;
  /** Modern administrative location, for the reader rather than the graph. */
  modernLocation: string;
  /** Slugs into src/data/architecture.ts — the type(s) explaining the form. */
  architectureRefs: string[];

  chronology: {
    /** Principal construction date. */
    built: HistoricalDate;
    /** One-line rendered span for the page header. */
    display: string;
    status: EvidenceLevel;
    /** Named building phases. A monument rebuilt is not one date. */
    phases: MonumentPhase[];
  };

  attributions: AttributedPerson[];
  /** What the building was for. */
  originalFunction: string[];
  materials: MaterialUse[];
  measurements: SourcedMeasurement[];
  construction: string[];
  /** Why it was built where it was, by whom, and what it argued. */
  politicalMeaning: string[];
  religiousMeaning?: string[];
  /** What happened to it after antiquity. */
  laterHistory: string[];
  survival: {
    condition: MonumentCondition;
    level: EvidenceLevel;
    note: string;
  };
  /** Modern restoration, where it materially changed what is visible. */
  restoration?: string[];
  /** What excavation has established about this building specifically. */
  archaeology: string[];
  fragments: MuseumFragment[];
  primarySources: SourceReference[];
  /** Set where antiquity does not describe the building, with the reason. */
  noAncientTestimony?: string;
  disputes: Array<{ question: string; positions: string; level: EvidenceLevel }>;

  /** Slugs into src/data/museums.ts. */
  museumSlugs: string[];
  /** Slugs into src/data/object-provenance.ts. */
  objectSlugs: string[];
  /** Slugs into src/data/institutions.ts. */
  institutionRefs: string[];
  /** Slugs into src/data/religion.ts. */
  religionRefs: string[];
  /** Slugs into src/data/battles.ts. */
  battleRefs: string[];
  /** Slugs into src/data/warfare.ts. */
  warfareRefs: string[];
  /** Slugs into content/philosophers. */
  figureRefs: string[];
  /** Slugs into content/themes. */
  themeRefs: string[];
  /** Slugs into content/books. */
  bookRefs: string[];
  /** Other monuments. */
  relatedMonuments: string[];
  /** Slugs into src/data/maps.ts. */
  mapSlugs: string[];
  /** Slug into src/data/archive-images.ts. Unique across monuments. */
  imageSlug?: string;
  gallerySlugs?: string[];
}

/**
 * Subjects that look like monuments and are already fully covered.
 * Rendered on the index as links, and validated: a deferral must point
 * at something that exists.
 */
export const MONUMENT_DEFERS_TO: ReadonlyArray<{
  subject: string;
  target: string;
  targetKind: "site" | "city" | "architecture";
  reason: string;
}> = [
  {
    subject: "The Behistun monument",
    target: "behistun",
    targetKind: "site",
    reason:
      "The archaeology layer already treats Behistun as a rock monument, because that is what it is: a relief and an inscription on a cliff with no building attached. That page covers the carving, the trilingual text, Rawlinson's copying, the decipherment and the succession dispute. A monument page would repeat it for the same query.",
  },
  {
    subject: "The Roman Forum as a whole",
    target: "roman-forum",
    targetKind: "site",
    reason:
      "The Forum is a square with buildings in it, not a building. Its individually meaningful structures have monument pages — the Curia Julia, the Basilica Julia, the Temple of Saturn, the Temple of Castor and Pollux, the Arch of Titus — and the square itself is an excavated site.",
  },
  {
    subject: "The Acropolis of Athens as a whole",
    target: "acropolis-of-athens",
    targetKind: "site",
    reason:
      "A fortified rock carrying several buildings. The Parthenon, the Erechtheion and the Propylaia are monuments; the rock, its Persian destruction deposit and its excavation history are a site.",
  },
  {
    subject: "Hadrian's Villa",
    target: "hadrians-villa",
    targetKind: "site",
    reason:
      "A hundred and twenty hectares containing dozens of structures whose ancient names are a sixteenth-century guess. Treating it as one monument would give the Renaissance naming a permanence the evidence does not support.",
  },
  {
    subject: "The Roman aqueducts",
    target: "aqueduct",
    targetKind: "architecture",
    reason:
      "Covered as a building type with named examples. No single aqueduct on this platform yet carries the patron, dating and political argument a monument page needs; the Pont du Gard is the obvious future candidate.",
  },
];

/**
 * Section headings the monument template renders. Declared here rather
 * than in the component so the gate can check them against the city and
 * site heading sets and fail on a collision.
 */
export const MONUMENT_SECTION_HEADINGS: ReadonlyArray<string> = [
  "What it is",
  "Who ordered it built",
  "What it was for",
  "How it was built",
  "Measured",
  "What it meant",
  "After antiquity",
  "Condition today",
  "Scattered fragments",
  "Written about in antiquity",
  "Still argued",
];

const S = (
  work: string,
  locus: string,
  summary: string,
  author?: string,
): SourceReference => ({ work, locus, summary, author });

export const MONUMENTS: ReadonlyArray<Monument> = [
  // ─── Rome ────────────────────────────────────────────────────────────
  {
    slug: "colosseum",
    title: "The Colosseum",
    alternateNames: ["The Flavian Amphitheatre", "Amphitheatrum Flavium"],
    kind: "spectacle",
    region: "roman",
    standfirst:
      "Built on the drained lake of Nero's private palace, out of the spoils of the Jewish war — a building whose politics are legible in its site and its funding before anyone looks at the architecture.",
    description:
      "The Colosseum — the Flavian amphitheatre, its dedicatory inscription recovered from the holes of its lost bronze letters, the seating capacity nobody can agree on, and what happened to its travertine.",
    civilizations: ["rome", "principate", "high-empire"],
    citySlug: "rome",
    modernLocation: "Piazza del Colosseo, Rome",
    architectureRefs: ["amphitheatre", "roman-concrete", "vaults-and-domes", "architectural-orders"],
    chronology: {
      built: { year: 80, precision: "exact", display: "inaugurated 80 CE" },
      display: "Begun c. 72 CE, inaugurated 80 CE, completed under Domitian",
      status: "documented",
      phases: [
        {
          label: "Vespasian's building",
          display: "c. 72–79 CE",
          level: "documented",
          note: "Begun on the site of the artificial lake in the grounds of Nero's Domus Aurea, which had been drained for the purpose.",
        },
        {
          label: "Inauguration under Titus",
          display: "80 CE",
          level: "documented",
          note: "Opened with a hundred days of games. Suetonius and Cassius Dio both describe the programme; Dio's account includes a flooding of the arena.",
        },
        {
          label: "Domitian's completion",
          display: "81–96 CE",
          level: "documented",
          note: "The top storey and the hypogeum — the two levels of tunnels, cages and lifts beneath the arena floor, which is why the floor as it now appears is missing.",
        },
        {
          label: "Repairs after fire and earthquake",
          display: "3rd–5th centuries CE",
          level: "documented",
          note: "Struck by lightning in 217 and repaired over decades; further restorations recorded by inscription into the fifth century, several of them naming senators who paid for seating.",
        },
      ],
    },
    attributions: [
      {
        name: "Vespasian",
        role: "patron",
        level: "documented",
        basis:
          "The reconstructed dedicatory inscription and the coinage; Suetonius, Vespasian 9, credits him with beginning an amphitheatre in the middle of the city.",
      },
      {
        name: "Titus",
        role: "dedicator",
        level: "documented",
        basis:
          "Suetonius, Titus 7, and Cassius Dio 66.25 on the inaugural games of 80 CE.",
      },
      {
        name: "Unknown",
        role: "architect",
        level: "unknown",
        basis:
          "No ancient source names an architect and no building inscription survives that would. The names sometimes attached to it in modern writing have no ancient authority.",
      },
    ],
    originalFunction: [
      "A permanent venue for gladiatorial combat, animal hunts and executions, holding an audience seated strictly by rank: senators on the marble at the front, equestrians behind them, then citizens, with women and the poor at the top. The seating plan is a diagram of Roman society, and the surviving inscribed seat allocations name the bodies that held blocks of it.",
      "Rome had staged such games for centuries in temporary wooden stands and in the Forum itself. What the Flavians built was the first permanent stone amphitheatre in the city, and its scale made the emperor rather than a magistrate the host.",
    ],
    materials: [
      { material: "Travertine", use: "The outer wall, piers and arcades, quarried at Tibur and brought thirty kilometres by road and river", level: "documented" },
      { material: "Tufa and brick-faced concrete", use: "The radial walls, vaults and internal structure", level: "documented" },
      { material: "Marble", use: "Seating and revetment, almost entirely removed", level: "documented" },
      { material: "Iron", use: "Cramps joining the travertine blocks, prised out in the medieval period — the holes are the pockmarks visible across the whole façade", level: "documented" },
    ],
    measurements: [
      {
        label: "External axes",
        value: "about 189 × 156 m",
        basis: "Modern survey of the surviving outer wall and its foundation ring.",
        level: "documented",
      },
      {
        label: "External height",
        value: "about 48 m",
        basis: "Modern survey of the surviving northern arc, which stands to its full original height.",
        level: "documented",
      },
      {
        label: "Arena floor",
        value: "about 83 × 48 m",
        basis: "Modern survey of the hypogeum walls that carried it.",
        level: "documented",
      },
      {
        label: "Seating capacity",
        value: "probably around 50,000",
        basis:
          "A modern estimate from the measured circumference of the seating tiers and an assumed space per person. The fourth-century Chronographer of 354 gives 87,000 loca, which is either a different unit, a different building, or wrong; it is the only ancient figure and it is not usable as a count.",
        level: "disputed",
      },
    ],
    construction: [
      "The structure is a system rather than a shell: eighty radial wedges of concrete vaulting rising through four levels, tied by annular corridors, so that the load of the seating is carried down through piers to a ring foundation twelve metres deep laid in the drained lakebed. The scheme allows a crowd of tens of thousands to enter and leave through eighty numbered arches, and the numbering survives.",
      "The three lower storeys carry engaged columns in ascending order — Tuscan, Ionic, Corinthian — with a fourth attic storey of Corinthian pilasters. The orders are decorative here rather than structural, which is exactly the Roman use of a Greek system.",
      "Corbels and sockets at the top of the attic carried masts for an awning. A detachment of sailors from the fleet at Misenum was assigned to work it, which is recorded rather than inferred, and how the awning was rigged is not.",
    ],
    politicalMeaning: [
      "The site is the argument. Nero had taken a large part of central Rome after the fire of 64 for a private palace with a lake at its centre; the Flavians drained the lake and gave the ground back as a public building. Martial says so directly in the first poem of his book on the games, and the gesture is the reason the building stands where it does.",
      "The funding says the same thing in a different register. Géza Alföldy reconstructed the lost dedicatory inscription from the holes left by its removed bronze letters and read it as recording that the amphitheatre was built ex manubiis — from the spoils of war. The war in question is the Jewish revolt, and the same campaign paid for the Arch of Titus.",
      "The reconstruction of an inscription from nail holes is a genuine feat and it is a reconstruction. The reading is widely accepted and it is not a text anyone has read on the stone.",
    ],
    laterHistory: [
      "Games continued into the sixth century, and animal hunts later than gladiatorial combat. The building then became, in sequence, a fortress of the Frangipane, a quarry, a cemetery, a workshop district, and a botanical curiosity — a nineteenth-century botanist catalogued several hundred plant species growing in it.",
      "The travertine went into Roman palaces and churches over centuries; the marble was burned for lime. The gap in the outer ring is not damage from a single event but the accumulated removal of stone from the south side, which earthquakes had already weakened.",
      "The tradition that Christians were martyred in the arena has no ancient documentary support. It grew in the medieval and early-modern period, and in the eighteenth century Benedict XIV consecrated the building on the strength of it. The consecration is a documented act; what it commemorates is not.",
    ],
    survival: {
      condition: "standing-ruin",
      level: "documented",
      note: "The northern arc stands to its full four storeys; the southern outer ring is gone. The arena floor is missing, exposing the hypogeum, and a modern partial floor has been laid across part of it.",
    },
    restoration: [
      "Raffaele Stern built a brick buttress at the eastern end in 1806 to stop the outer ring peeling away, and Giuseppe Valadier a second, stepped one at the west in the 1820s. Both are deliberately plain, so that the repair is visibly a repair — the same principle Valadier applied to the Arch of Titus.",
      "Consolidation and cleaning have continued since; the hypogeum was fully excavated in the twentieth century, and a reconstructed section of arena floor was added in recent decades.",
    ],
    archaeology: [
      "Excavation of the hypogeum established the machinery: animal cages on capstan-driven lifts around the perimeter, with shafts and ramps to the arena. Reconstructions differ on how many lifts there were. The lift system is documented by its own cuttings, which is why it can be described at all.",
      "The foundation ring and the drainage system beneath it show the scale of the preparatory work on a lakebed, and confirm the literary account of what the site had previously been.",
    ],
    fragments: [
      {
        what: "Inscribed seat allocations, cut into the marble by the bodies that held blocks of seating",
        level: "documented",
        heldAt: "In position and in the site collections",
      },
      {
        what: "The reconstructed dedicatory inscription, known from the letter-holes in its reused slab",
        level: "disputed",
        heldAt: "In position",
        note: "The slab was recut for a later dedication, and the earlier text is read from the pattern of holes left by the removed bronze letters.",
      },
    ],
    primarySources: [
      S(
        "The Twelve Caesars",
        "Vespasian 9, Titus 7",
        "Suetonius credits Vespasian with beginning an amphitheatre in the middle of the city and Titus with its dedication and the games that followed.",
        "Suetonius",
      ),
      S(
        "Roman History",
        "66.25",
        "Cassius Dio on the inaugural games: the hundred days, the animals, and a flooding of the arena for a naval display — an account written a century and a half later and hard to reconcile with the hypogeum.",
        "Cassius Dio",
      ),
      S(
        "On the Spectacles",
        "2",
        "Martial, writing at the opening, says that where a hated master's palace stood, Rome has been given back to herself. Court poetry, and the clearest ancient statement of what the building was for politically.",
        "Martial",
      ),
    ],
    disputes: [
      {
        question: "Was the arena ever flooded for naval displays?",
        positions:
          "Cassius Dio and Suetonius describe water spectacles at the inauguration. The hypogeum, built under Domitian, would make flooding impossible thereafter, so any such display belongs to the first years before it was dug. Whether the earlier arena could have been sealed and filled at all is argued from the drainage evidence, and there is no consensus.",
        level: "disputed",
      },
      {
        question: "How many people did it hold?",
        positions:
          "The only ancient figure, 87,000 loca in a fourth-century list, is roughly seventy per cent above modern estimates from measured seating. Explanations include a different unit of space, standing room at the top, a corrupt number, or a list not describing this building. The modern figure is an estimate from geometry and should be read as one.",
        level: "disputed",
      },
    ],
    museumSlugs: [],
    objectSlugs: [],
    institutionRefs: ["imperial-administration", "roman-senate"],
    religionRefs: [],
    battleRefs: [],
    warfareRefs: ["roman-navy"],
    figureRefs: ["suetonius", "tacitus"],
    themeRefs: ["monumentality", "imperial-succession", "civic-order"],
    bookRefs: ["twelve-caesars"],
    relatedMonuments: ["arch-of-titus", "baths-of-caracalla", "pantheon"],
    mapSlugs: ["roman-empire"],
    imageSlug: "colosseum-curves",
  },
  {
    slug: "pantheon",
    title: "The Pantheon",
    kind: "temple",
    region: "roman",
    standfirst:
      "The largest unreinforced concrete dome ever built, carrying an inscription that names the wrong man — and standing intact because it became a church.",
    description:
      "The Pantheon — Hadrian's building under Agrippa's inscription, the graded concrete of the dome, the portico that does not fit its pediment, and the bronze that Urban VIII took.",
    civilizations: ["rome", "principate", "high-empire"],
    citySlug: "rome",
    modernLocation: "Piazza della Rotonda, Rome",
    architectureRefs: ["temple", "vaults-and-domes", "roman-concrete", "columns-and-capitals"],
    chronology: {
      built: { year: 125, precision: "approximate", display: "c. 125 CE" },
      display: "Agrippa's building 27–25 BCE; the standing building Hadrianic, c. 113–125 CE",
      status: "probable",
      phases: [
        {
          label: "Agrippa's Pantheon",
          display: "27–25 BCE",
          level: "documented",
          note: "A different building on the same site, known from Cassius Dio and from foundations beneath the present one. Its orientation and plan were not those of the building that stands.",
        },
        {
          label: "Fire and Domitianic rebuilding",
          display: "80 and 110 CE",
          level: "documented",
          note: "Burned in 80, rebuilt, and burned again under Trajan.",
        },
        {
          label: "The Hadrianic building",
          display: "c. 113–125 CE",
          level: "documented",
          note: "Dated by the stamps on its bricks, which carry consular years. This is the rotunda and dome now standing.",
        },
        {
          label: "Severan repairs",
          display: "202 CE",
          level: "documented",
          note: "A second inscription on the architrave records restoration under Septimius Severus and Caracalla.",
        },
      ],
    },
    attributions: [
      {
        name: "Marcus Agrippa",
        role: "patron",
        level: "documented",
        basis:
          "The architrave inscription, M·AGRIPPA·L·F·COS·TERTIUM·FECIT, is genuine and is Agrippa's — but it belongs to the building of 27–25 BCE and was reinstated on the later one.",
        figureSlug: "marcus-agrippa",
      },
      {
        name: "Hadrian",
        role: "patron",
        level: "documented",
        basis:
          "Brick stamps dating the fabric to 113–125 CE, and the Historia Augusta's statement that Hadrian restored the Pantheon without inscribing his own name on it. Reusing the old inscription was the point.",
        figureSlug: "hadrian",
      },
      {
        name: "Apollodorus of Damascus",
        role: "architect",
        level: "disputed",
        basis:
          "No ancient source attributes the Pantheon to him. The attribution is modern, resting on his known work for Trajan and on the engineering ambition of the dome, and it is an inference rather than a record.",
        figureSlug: "apollodorus-of-damascus",
      },
    ],
    originalFunction: [
      "What the building was for is not established. The name means all the gods, and Cassius Dio, writing a century after it was rebuilt, offers two explanations and settles on neither: that it held statues of many gods, or that its vault resembled the heavens.",
      "The plan is not a Roman temple plan. A circular domed hall entered through a temple front, with niches for statues around the drum and no cult focus at one end, works as an audience hall as readily as a sanctuary, and some scholars read it as a place where the emperor sat under the oculus and dispensed justice. The evidence supports the question rather than an answer.",
    ],
    materials: [
      { material: "Egyptian grey and red granite", use: "The sixteen monolithic portico columns, quarried at Mons Claudianus and Aswan and shipped whole", level: "documented" },
      { material: "Roman concrete with graded aggregate", use: "The dome — heavy travertine in the lower courses, then tufa, then brick, then light volcanic scoria at the crown", level: "documented" },
      { material: "Brick-faced concrete", use: "The drum, with relieving arches distributing load onto eight massive piers", level: "documented" },
      { material: "Coloured marble", use: "Interior floor and wall revetment, largely original", level: "documented" },
      { material: "Gilded bronze", use: "Roof tiles and the portico ceiling structure, all removed", level: "documented" },
    ],
    measurements: [
      {
        label: "Interior diameter of the dome",
        value: "43.3 m",
        basis: "Modern survey. The interior height to the oculus is the same figure, so a sphere of that diameter fits exactly inside the building — a relationship that is measured, not inferred.",
        level: "documented",
      },
      {
        label: "Oculus",
        value: "about 8.2 m across",
        basis: "Modern survey. Open to the sky, with no glazing and no evidence of any.",
        level: "documented",
      },
      {
        label: "Portico columns",
        value: "11.8 m tall, about 60 tonnes each",
        basis: "Modern survey and calculation from the volume of granite; the weight is a computed figure, not a weighed one.",
        level: "probable",
      },
      {
        label: "Wall thickness at the base of the drum",
        value: "about 6 m",
        basis: "Modern survey; the drum is hollowed by niches and relieving chambers rather than solid.",
        level: "documented",
      },
    ],
    construction: [
      "The dome works by getting lighter as it rises. The aggregate in the concrete is graded from travertine at the springing to volcanic scoria at the crown, the shell thins from about six metres to a metre and a half, and five rings of coffers cut further weight out of the underside. There is no reinforcement of any kind; the structure stands because the geometry and the density gradient keep it in compression.",
      "The drum is not a wall but a ring of eight piers with the spaces between them opened into niches and, above, into relieving chambers invisible from inside. The load of the dome is concentrated onto the piers and taken to a ring foundation.",
      "The portico columns are monoliths shipped from Egypt. Three of the eastern ones were replaced in the seventeenth century after collapse, using shafts taken from the Baths of Nero and from a villa at Domitian's estate, so the colonnade is not uniformly ancient.",
    ],
    politicalMeaning: [
      "The inscription is the most-read sentence in Roman architecture and it is a piece of deliberate self-effacement. Hadrian rebuilt the Pantheon from the ground and put Agrippa's name back on it, and the Historia Augusta says he did the same on other buildings he restored. Whatever the motive — Augustan piety, dynastic modesty, or a claim to be continuing rather than replacing — it means that the most famous Roman building carries a false attribution by design.",
      "The engineering is itself imperial. Sixteen granite monoliths quarried in the Egyptian desert, dragged to the Nile, floated to Alexandria and shipped to Ostia describes a state that could reach that far and pay for it, and the columns say so more directly than any relief.",
    ],
    religiousMeaning: [
      "The oculus admits weather as well as light, and the floor is drained. That is a deliberate decision to let the sky into the building, and every reading of the interior as an image of the heavens rests on it.",
      "Its conversion to the church of Santa Maria ad Martyres in 609 is why it survives roofed and entire. Christian reuse preserved more Roman architecture than any other single factor, and the Pantheon is the clearest case.",
    ],
    laterHistory: [
      "Given to Pope Boniface IV by the Byzantine emperor Phocas and consecrated as a church in 609, which took it out of the quarry economy that consumed everything around it.",
      "The gilded bronze roof tiles were stripped in the seventh century. In 1625 Urban VIII removed the bronze structure of the portico ceiling for cannon at the Castel Sant'Angelo and for Bernini's baldacchino in St Peter's, which produced the Roman pasquinade that what the barbarians did not do, the Barberini did.",
      "Bernini added two small bell towers over the portico in the 1620s. Roman opinion called them the asses' ears and they were removed in 1883.",
      "Raphael is buried in the rotunda, as are two kings of united Italy, which is why the building is also a national monument.",
    ],
    survival: {
      condition: "standing",
      level: "documented",
      note: "Roofed, entire and in continuous use for fourteen hundred years. The interior marble is substantially original; the attic zone was remodelled in the eighteenth century and one bay restored to its ancient scheme in 1930.",
    },
    archaeology: [
      "Brick stamps in the fabric carry consular dates and put the construction between about 113 and 125 CE, which is what removed the building from Agrippa's period and is the single most consequential piece of Roman archaeological dating.",
      "Excavation beneath the floor found the foundations of Agrippa's building on a different alignment, confirming that the present rotunda replaced rather than incorporated it.",
    ],
    fragments: [
      {
        what: "The three seventeenth-century replacement columns, taken from other Roman buildings",
        level: "documented",
        heldAt: "In position",
      },
    ],
    primarySources: [
      S(
        "Roman History",
        "53.27",
        "Cassius Dio on Agrippa's Pantheon: its name, the statues in it, and Agrippa's wish to place a statue of Augustus there and to name the building after him, which Augustus refused.",
        "Cassius Dio",
      ),
      S(
        "Natural History",
        "36.38",
        "Pliny on the caryatids by Diogenes of Athens on Agrippa's Pantheon, and on the columns of its pediment. A description of the earlier building, and the only detailed one.",
        "Pliny the Elder",
      ),
      S(
        "Historia Augusta",
        "Hadrian 19.10",
        "That Hadrian restored the Pantheon and other buildings without inscribing his own name on any of them. A late and unreliable compilation, and here corroborated by the brick stamps.",
      ),
    ],
    disputes: [
      {
        question: "Were the portico columns meant to be taller?",
        positions:
          "The portico's pediment sits awkwardly against the rotunda's brick attic, and a second pediment line is visible above it on the drum. One reading is that fifty-Roman-foot column shafts were intended and forty-foot ones substituted when the larger monoliths could not be delivered, forcing a lower portico. Another holds that the arrangement is deliberate and that the upper line is a construction feature. The mismatch is a fact of the building; its cause is argued.",
        level: "disputed",
      },
      {
        question: "Was it a temple at all?",
        positions:
          "Dio was already uncertain. The plan is unlike any Roman temple, there is no dominant cult focus, and the Historia Augusta records Hadrian holding court in it. Readings range from a dynastic sanctuary of the deified emperors to an audience hall with religious decoration. No dedication inscription to any deity survives.",
        level: "disputed",
      },
    ],
    museumSlugs: [],
    objectSlugs: [],
    institutionRefs: ["imperial-administration"],
    religionRefs: ["foreign-cults-at-rome"],
    battleRefs: [],
    warfareRefs: [],
    figureRefs: ["hadrian", "marcus-agrippa", "augustus", "apollodorus-of-damascus"],
    themeRefs: ["monumentality", "imperial-administration", "sacred-kingship"],
    bookRefs: [],
    relatedMonuments: ["colosseum", "baths-of-caracalla", "forum-of-augustus"],
    mapSlugs: ["roman-empire"],
    imageSlug: "pantheon-ceiling",
  },
  {
    slug: "curia-julia",
    title: "The Curia Julia",
    alternateNames: ["The Senate House"],
    kind: "civic-building",
    region: "roman",
    standfirst:
      "The Roman Senate's meeting hall, standing to its full height because it spent thirteen centuries as a church — and seating about half the Senate, which is a fact about how the body actually worked.",
    description:
      "The Curia Julia — begun by Caesar, finished by Augustus, rebuilt by Diocletian, converted to Sant'Adriano in 630, and stripped back to its ancient form in the 1930s.",
    civilizations: ["rome", "roman-republic", "principate", "late-empire"],
    siteSlug: "roman-forum",
    citySlug: "rome",
    modernLocation: "The Roman Forum, Rome",
    architectureRefs: ["forum", "roman-concrete", "building-materials"],
    chronology: {
      built: { year: -29, precision: "exact", display: "dedicated 29 BCE" },
      display: "Begun 44 BCE, dedicated 29 BCE; the standing building rebuilt c. 283–303 CE",
      status: "documented",
      phases: [
        {
          label: "The Curia Hostilia",
          display: "traditionally 7th century BCE",
          level: "literary",
          note: "The predecessor hall on a different alignment, attributed by tradition to Tullus Hostilius. Burned in 52 BCE when the crowd cremated Clodius inside it.",
        },
        {
          label: "Caesar's rebuilding",
          display: "44–29 BCE",
          level: "documented",
          note: "Caesar began a new senate house on a new alignment as part of his reordering of the Forum, and was killed before it was finished. Augustus completed and dedicated it, and named it for Caesar.",
        },
        {
          label: "Diocletian's rebuilding",
          display: "c. 283–303 CE",
          level: "documented",
          note: "After the fire of 283. What stands today is this building, on Caesar's plan and footprint.",
        },
        {
          label: "The church of Sant'Adriano",
          display: "630–1935",
          level: "documented",
          note: "Converted under Honorius I, remodelled repeatedly, and given a baroque interior. The conversion is the reason the walls and roof survive to full height.",
        },
      ],
    },
    attributions: [
      {
        name: "Julius Caesar",
        role: "patron",
        level: "documented",
        basis:
          "Cassius Dio 44.5 and 47.19 on the vote of a new senate house and its naming; the building carried his name from its dedication.",
        figureSlug: "julius-caesar",
      },
      {
        name: "Augustus",
        role: "completed-by",
        level: "documented",
        basis:
          "The Res Gestae, in which Augustus lists the Curia among the works he built, and Cassius Dio 51.22 on its dedication in 29 BCE.",
        figureSlug: "augustus",
      },
      {
        name: "Diocletian",
        role: "patron",
        level: "documented",
        basis:
          "The rebuilding after the fire of 283 is attributed to the Diocletianic restoration of the Forum by the brickwork and by the Chronographer of 354.",
        figureSlug: "diocletian",
      },
    ],
    originalFunction: [
      "A roofed hall for meetings of the Senate. Three low steps ran down each long side to hold movable chairs, with a dais at the far end for the presiding magistrate, and the Senate voted by physically moving to one side of the room — a procedure the architecture is shaped around.",
      "It was also a templum in the technical sense: an inaugurated space in which the auspices could be taken, which is why the Senate could only meet in certain buildings and why the room's status mattered as much as its size.",
    ],
    materials: [
      { material: "Brick-faced concrete", use: "The walls, faced externally in stucco imitating marble blocks; the lower part was originally marble-revetted", level: "documented" },
      { material: "Coloured marble and porphyry", use: "The opus sectile floor, largely original Diocletianic work", level: "documented" },
      { material: "Bronze", use: "The doors, moved to San Giovanni in Laterano in 1660; the doors now in place are copies", level: "documented" },
    ],
    measurements: [
      {
        label: "Internal dimensions",
        value: "about 25.2 × 17.6 m",
        basis: "Modern survey of the standing building.",
        level: "documented",
      },
      {
        label: "Internal height",
        value: "about 21 m",
        basis:
          "Modern survey. Vitruvius 5.2 prescribes that a rectangular curia's height be half the sum of its length and width; half of 25.2 plus 17.6 is 21.4, so the building follows the rule almost exactly. Whether it follows Vitruvius or they both follow a shared convention cannot be determined.",
        level: "documented",
      },
      {
        label: "Seating",
        value: "roughly 300 places on the stepped benches",
        basis:
          "A modern estimate from the length of the three steps on each side and an assumed chair spacing. The Senate had six hundred members from Sulla onward and considerably more under Caesar, so the hall was never built to hold the whole body.",
        level: "probable",
      },
    ],
    construction: [
      "A single-cell hall with a timber roof, thick brick-faced concrete walls, and three tall windows high in the façade above the door. The height relative to the plan is the striking feature and it is prescriptive rather than structural: the proportions come from a rule about what a senate house should be.",
      "The Diocletianic building sits on Caesar's foundations and reproduces his plan. That continuity is itself the political statement — the Senate of the tetrarchy met in a room shaped by the man who ended the Republic.",
    ],
    politicalMeaning: [
      "That the hall seated about half the Senate is the most useful thing the building tells us. Attendance was normally partial, quorums were an issue serious enough for legislation, and the picture of six hundred senators debating together is a modern one. The room was built for the body that actually turned up.",
      "Caesar's decision to demolish the old Curia Hostilia and build a new one on a new alignment, named for himself, is of a piece with the rest of his reordering of the Forum. Augustus finishing it and putting Caesar's name on it is the same move the Pantheon inscription makes a century and a half later.",
      "The Altar of Victory stood in the hall from 29 BCE. Its removal by Gratian in 382 and the resulting exchange between Symmachus and Ambrose is one of the best-documented arguments of late antiquity about what a state owes its traditional cults, and it happened over a piece of furniture in this room.",
    ],
    laterHistory: [
      "Converted into the church of Sant'Adriano al Foro in 630 and used as a church until the twentieth century, acquiring a raised floor, a baroque interior and a campanile.",
      "The bronze doors were taken by Borromini in 1660 for San Giovanni in Laterano, where they remain and where they were enlarged to fit.",
      "Between 1930 and 1937 Alfonso Bartoli stripped the church away and restored the building to what was taken to be its Diocletianic state, rebuilding the roof and the façade. The result is a genuine ancient building with a substantial modern component and a deliberate erasure of thirteen centuries of use.",
    ],
    survival: {
      condition: "standing",
      level: "documented",
      note: "Standing to full height with its original floor, as a consequence of Christian reuse and then of a restoration that removed the evidence of that reuse.",
    },
    restoration: [
      "Bartoli's 1930s campaign is the most consequential intervention. It recovered the ancient volume and the opus sectile floor, and it destroyed the medieval and baroque fabric that had preserved them. What a visitor sees is a Fascist-era decision about which past the building should display.",
    ],
    archaeology: [
      "Excavation established the position of the earlier Curia Hostilia on a different alignment beneath and beside the standing building, and confirmed that Caesar's rebuilding shifted the senate house to align with his new forum rather than with the old comitium.",
      "The Diocletianic date of the standing fabric rests on brickwork and on the record of the fire of 283, not on any building inscription.",
    ],
    fragments: [
      {
        what: "The Plutei of Trajan — two marble relief screens showing the burning of tax records and an alimentary scheme, found nearby and now displayed inside the hall",
        level: "documented",
        heldAt: "In the Curia Julia",
        note: "Their original position is not established and they were not made for this building.",
      },
      {
        what: "The bronze doors, enlarged and reused",
        level: "documented",
        heldAt: "San Giovanni in Laterano, Rome",
      },
    ],
    primarySources: [
      S(
        "Roman History",
        "44.5, 47.19, 51.22",
        "Cassius Dio on the vote of a Curia Julia, on its naming, and on its dedication by Augustus in 29 BCE together with the placing of the Altar of Victory.",
        "Cassius Dio",
      ),
      S(
        "Res Gestae Divi Augusti",
        "19",
        "Augustus lists the Curia among the buildings he made. A first-person account, and an inventory of self-presentation.",
        "Augustus",
      ),
      S(
        "On Architecture",
        "5.2",
        "Vitruvius on how a senate house should be proportioned: the height half the sum of the length and the width. The standing building conforms.",
        "Vitruvius",
      ),
    ],
    disputes: [
      {
        question: "How much of the standing building is Diocletianic?",
        positions:
          "The walls and floor are accepted as of the rebuilding after 283. The roof, the façade above the door and much of the external surface are Bartoli's, executed on the evidence of what survived and of the building's depiction on coins. The line between the two is not marked on the building, and published plans differ on it.",
        level: "disputed",
      },
    ],
    museumSlugs: ["museo-nazionale-romano"],
    objectSlugs: [],
    institutionRefs: ["roman-senate", "consul", "praetor", "roman-assemblies", "imperial-administration"],
    religionRefs: ["roman-augury"],
    battleRefs: [],
    warfareRefs: [],
    figureRefs: ["julius-caesar", "augustus", "cicero", "diocletian", "vitruvius"],
    themeRefs: ["republic", "civic-order", "rule-of-law", "political-legitimacy"],
    bookRefs: ["res-gestae"],
    relatedMonuments: ["basilica-julia", "temple-of-saturn", "arch-of-titus"],
    mapSlugs: ["roman-republic"],
    imageSlug: "curia-julia",
  },
  {
    slug: "basilica-julia",
    title: "The Basilica Julia",
    kind: "civic-building",
    region: "roman",
    standfirst:
      "The largest hall on the Forum, where four panels of judges sat at once and where the litigants' friends applauded — reduced now to a pavement, some pier stumps and the game boards scratched by people waiting.",
    description:
      "The Basilica Julia — Caesar's foundation, the centumviral court, Pliny's account of speaking before all four panels, and why almost nothing of it survives.",
    civilizations: ["rome", "roman-republic", "principate"],
    siteSlug: "roman-forum",
    citySlug: "rome",
    modernLocation: "The Roman Forum, Rome",
    architectureRefs: ["basilica", "forum", "roman-concrete"],
    chronology: {
      built: { year: -46, precision: "exact", display: "dedicated incomplete, 46 BCE" },
      display: "Begun 54 BCE, dedicated 46 BCE, completed under Augustus; restored 305 CE",
      status: "documented",
      phases: [
        {
          label: "The Basilica Sempronia",
          display: "170 BCE",
          level: "documented",
          note: "The earlier hall on the site, built by Tiberius Sempronius Gracchus the elder over the house of Scipio Africanus, which he bought and demolished.",
        },
        {
          label: "Caesar's building",
          display: "54–46 BCE",
          level: "documented",
          note: "Funded from the Gallic spoils and dedicated before it was finished, which Caesar did with several of his buildings.",
        },
        {
          label: "Augustan completion and rebuilding",
          display: "12 BCE – 12 CE",
          level: "documented",
          note: "Burned before completion; Augustus rebuilt it and rededicated it in the names of his grandsons Gaius and Lucius, though the Res Gestae records that he kept Caesar's name on it.",
        },
        {
          label: "Late restorations",
          display: "283 and 305 CE",
          level: "documented",
          note: "Burned in the fire of 283 and restored under Diocletian; an inscription records a further restoration by the prefect Gabinius Vettius Probianus in about 416.",
        },
      ],
    },
    attributions: [
      {
        name: "Julius Caesar",
        role: "patron",
        level: "documented",
        basis:
          "Named for him from the outset; Augustus's Res Gestae 20 records that he rebuilt the basilica between the temples of Castor and Saturn, a work begun by his father.",
        figureSlug: "julius-caesar",
      },
      {
        name: "Augustus",
        role: "completed-by",
        level: "documented",
        basis: "Res Gestae 20, in his own words.",
        figureSlug: "augustus",
      },
    ],
    originalFunction: [
      "A covered hall for business and, above all, for law. The centumviral court — which handled inheritance and property disputes, the cases that most concerned wealthy Romans — sat here in four panels, divided by screens and curtains, and could be combined into a single tribunal for an important case.",
      "Pliny the Younger describes arguing before all four panels sitting together: a hundred and eighty judges, both galleries packed, the litigants' supporters brought in to applaud, and the speech running for nearly five hours by the water clock. It is the best surviving account of what a Roman basilica sounded like.",
    ],
    materials: [
      { material: "Marble", use: "Paving, revetment and the piers, almost all removed and much of it burned for lime", level: "documented" },
      { material: "Brick-faced concrete and travertine", use: "The core of the piers and the vaulting of the aisles", level: "documented" },
    ],
    measurements: [
      {
        label: "Overall dimensions",
        value: "about 101 × 49 m",
        basis: "Modern survey of the surviving pavement and pier foundations.",
        level: "documented",
      },
      {
        label: "The combined court",
        value: "180 judges",
        basis:
          "Pliny the Younger, Letters 6.33, describing the four panels of the centumviral court sitting together for the case of Attia Viriola. An ancient figure for a specific occasion, not a standing establishment.",
        level: "documented",
      },
    ],
    construction: [
      "A central nave two storeys high surrounded by a double aisle on all four sides, with the outer arcades opening onto the Forum. The arcades carried engaged Doric half-columns on the ground floor and Ionic above, in the standard Roman treatment of a Greek order as surface decoration on an arched structure.",
      "The Augustan rebuilding raised it in brick-faced concrete with marble facing. What survives of the elevation is the stumps of the piers and one restored arch, re-erected in the twentieth century from fallen material.",
    ],
    politicalMeaning: [
      "Caesar's building programme in the Forum replaced Republican monuments associated with other families with buildings carrying his own name, and the Basilica Julia is the largest instance: it went up over the Basilica Sempronia, which itself stood over the house of Scipio Africanus. Three generations of Roman self-monumentalisation are stacked on one plot.",
      "Augustus's decision to keep Caesar's name on a building he had substantially rebuilt, and to record that decision in the Res Gestae, is the same manoeuvre as Hadrian's with the Pantheon inscription and is stated by Augustus as a virtue.",
    ],
    laterHistory: [
      "Damaged in successive fires, restored into the fifth century, and then systematically quarried. Its marble was among the most accessible in the Forum and it went into lime kilns and later buildings over centuries, which is why a hall of this size is now a floor.",
      "Nineteenth-century excavation exposed the pavement and the pier bases; one arch was reconstructed in the twentieth century to give the scale.",
    ],
    survival: {
      condition: "foundations",
      level: "documented",
      note: "The pavement, the steps onto the Forum, the stumps of the piers and one modern re-erected arch. Nothing of the elevation is ancient above a few courses.",
    },
    archaeology: [
      "The most-cited find here is not architectural. Boards for gaming were scratched into the marble of the steps and the pavement, in numbers, along with tallies and idle graffiti — the residue of people waiting for a court to reach their case.",
      "Excavation established the double-aisle plan and the relationship to the earlier Basilica Sempronia beneath it, and recovered the inscription of the late restoration by Probianus, together with statue bases he moved into the hall.",
    ],
    fragments: [
      {
        what: "Statue bases inscribed by the fifth-century prefect Probianus, recording statues he brought into the basilica",
        level: "documented",
        heldAt: "In position and in the Forum antiquarium",
      },
    ],
    primarySources: [
      S(
        "Res Gestae Divi Augusti",
        "20",
        "Augustus on rebuilding the basilica between the temples of Castor and Saturn, a work begun by his father, and on his intention that it should be completed under Caesar's name by his heirs if he did not live to finish it.",
        "Augustus",
      ),
      S(
        "Letters",
        "6.33",
        "Pliny the Younger on speaking before the united centumviral court: the four panels combined, a hundred and eighty judges, packed galleries, and a speech of nearly five hours.",
        "Pliny the Younger",
      ),
    ],
    disputes: [
      {
        question: "Where exactly did the four panels sit?",
        positions:
          "Pliny's account requires four separate tribunals within one hall, divisible by screens and combinable. Reconstructions place them in the nave, in the aisles, or on temporary platforms, and none can be tested against the surviving pavement, which carries no fixed emplacements. The procedure is documented; the furniture is not.",
        level: "unknown",
      },
    ],
    museumSlugs: [],
    objectSlugs: [],
    institutionRefs: ["roman-law", "praetor", "roman-citizenship", "roman-senate"],
    religionRefs: [],
    battleRefs: [],
    warfareRefs: [],
    figureRefs: ["julius-caesar", "augustus", "pliny-the-younger", "cicero", "scipio-africanus"],
    themeRefs: ["rule-of-law", "imperial-law", "civic-order"],
    bookRefs: ["res-gestae"],
    relatedMonuments: ["curia-julia", "temple-of-saturn", "temple-of-castor-and-pollux"],
    mapSlugs: ["roman-republic"],
    imageSlug: "basilica-julia",
  },
  {
    slug: "temple-of-saturn",
    title: "The Temple of Saturn",
    kind: "temple",
    region: "roman",
    standfirst:
      "Eight mismatched columns at the foot of the Capitol, one of them installed upside down — and beneath them the podium that held the Roman state treasury.",
    description:
      "The Temple of Saturn — the aerarium in its podium, the Saturnalia, the late-antique rebuilding recorded in its own architrave, and the reused columns of the standing front.",
    civilizations: ["rome", "roman-republic", "principate", "late-empire"],
    siteSlug: "roman-forum",
    citySlug: "rome",
    modernLocation: "The Roman Forum, Rome",
    architectureRefs: ["temple", "forum", "columns-and-capitals", "building-materials"],
    chronology: {
      built: { year: -497, precision: "traditional", display: "traditionally 497 BCE" },
      display: "Traditionally dedicated 497 BCE; the standing columns from a rebuilding after a late-4th-century CE fire",
      status: "disputed",
      phases: [
        {
          label: "The first temple",
          display: "traditionally 497 BCE",
          level: "literary",
          note: "Livy gives the dedication of the temple and the institution of the Saturnalia to 497 BCE, and reports that even in his day there was disagreement about who dedicated it. The date is tradition, not record.",
        },
        {
          label: "Plancus's rebuilding",
          display: "42 BCE",
          level: "documented",
          note: "Rebuilt by Lucius Munatius Plancus from the spoils of a campaign in the Alps. This is the phase most of the podium belongs to.",
        },
        {
          label: "The late rebuilding",
          display: "later 4th century CE",
          level: "documented",
          note: "The standing architrave carries the inscription recording that the Senate and People restored the temple after it was consumed by fire. It names no emperor, which is itself unusual and undated.",
        },
      ],
    },
    attributions: [
      {
        name: "Lucius Munatius Plancus",
        role: "patron",
        level: "documented",
        basis:
          "Recorded by Suetonius (Augustus 29) among the buildings put up by leading men from spoils at Augustus's urging, and by the Fasti.",
      },
      {
        name: "Titus Larcius, or Postumus Cominius, or a dictator",
        role: "dedicator",
        level: "disputed",
        basis:
          "Livy 2.21 reports competing traditions about who dedicated the first temple and declines to settle them. The disagreement is ancient.",
      },
    ],
    originalFunction: [
      "A temple of Saturn, and the home of the aerarium Saturni — the treasury of the Roman state, kept in vaulted chambers in the temple podium and administered by the quaestors. Public money, the state archives of certain classes of document, and the standards of the legions when not in the field were all held here.",
      "That the treasury sat in a temple podium is not incidental. Deposits under divine protection were harder to touch, and the arrangement made an accounting office a sacred space with all the procedural consequences that followed.",
      "The Saturnalia began at this temple on 17 December, with the untying of the woollen bonds that bound the cult statue's feet for the rest of the year — the release of the god matching the inversion of ordinary order in the festival.",
    ],
    materials: [
      { material: "Grey and pink Egyptian granite", use: "The eight standing column shafts, reused from other buildings and not matching each other", level: "documented" },
      { material: "Travertine and tufa", use: "The podium, largely of the 42 BCE rebuilding", level: "documented" },
      { material: "Marble", use: "The Ionic capitals and the architrave of the late rebuilding, themselves reused and recut", level: "documented" },
    ],
    measurements: [
      {
        label: "Podium",
        value: "about 40 × 22.5 m, standing about 9 m above the Forum pavement",
        basis: "Modern survey of the surviving podium and its facing.",
        level: "documented",
      },
      {
        label: "Standing columns",
        value: "eight, six across the front and one on each flank",
        basis: "Direct observation and survey of the standing front. The shafts differ in stone, diameter and finish, and one on the right is set with its top downward.",
        level: "documented",
      },
    ],
    construction: [
      "A high podium with a frontal stair, in the Italic manner rather than the Greek — the temple is meant to be approached from one end and to stand above the crowd, and its podium is a usable building in its own right.",
      "The standing front is late-antique work assembled from older material. The shafts do not match, the capitals have been recut, and one shaft is inverted. Whether that was carelessness, urgency after a fire, or indifference to a distinction that mattered more to nineteenth-century observers than to fourth-century builders is not recoverable, but the fact is visible from the Forum floor.",
    ],
    politicalMeaning: [
      "Where a state keeps its money is a statement about who controls it. The aerarium under senatorial management, in a temple on the Forum, is the Republican arrangement; Augustus's creation of a separate military treasury and the growth of the imperial fiscus alongside it is the constitutional change made visible in accounting.",
      "The late inscription is a small political document. A restoration recorded in the name of the Senate and People of Rome, with no emperor named, at a date when emperors normally took credit for everything, is either an assertion or an accident of survival, and it cannot be dated closely enough to say which.",
    ],
    religiousMeaning: [
      "Saturn was associated with an age before the present order — a lost time of plenty without slavery or property, in the literary tradition — and his festival inverted the social order for several days. The temple is where a Roman abstraction about time and hierarchy was given an address.",
      "The bound feet of the cult statue, loosed only at the Saturnalia, are reported by Roman antiquarian writers. What the statue looked like is not known.",
    ],
    laterHistory: [
      "Standing into the medieval period as a ruin and incorporated into fortified structures; the surrounding ground rose by metres, burying the podium, which was re-exposed by nineteenth-century excavation.",
      "The temple was never converted to a church, which is why so little of it survives: the buildings that were converted are the ones that still have roofs.",
    ],
    survival: {
      condition: "standing-ruin",
      level: "documented",
      note: "The podium with its vaulted chambers, and eight columns carrying a fragment of architrave. Nothing of the cella walls stands.",
    },
    archaeology: [
      "Excavation of the podium established the vaulted chambers that held the treasury and the stair arrangement, and showed that the 42 BCE rebuilding reused the earlier foundation.",
      "The temple's own building history is unusually legible because each phase reused the last, and the reused elements can be dated by their carving.",
    ],
    fragments: [],
    primarySources: [
      S(
        "From the Founding of the City",
        "2.21",
        "Livy on the dedication of the temple and the institution of the Saturnalia, with his own note that the tradition disagreed about who dedicated it.",
        "Livy",
      ),
      S(
        "Saturnalia",
        "1.8",
        "Macrobius collects the antiquarian traditions about the temple, the treasury, the bound statue and the origins of the festival, writing around the time of the late rebuilding.",
        "Macrobius",
      ),
    ],
    disputes: [
      {
        question: "When was the standing front built?",
        positions:
          "The inscription records a restoration after a fire but names no consul or emperor. Datings range across the fourth century and rest on the letter forms, on the character of the reused material, and on which recorded fire is meant. There is no agreement, and the temple is often the last major building project on the Forum on one dating and not on another.",
        level: "disputed",
      },
    ],
    museumSlugs: [],
    objectSlugs: [],
    institutionRefs: ["roman-taxation", "quaestor", "roman-senate", "census-and-assessment"],
    religionRefs: ["the-sacred-calendar", "the-vow-and-the-contract", "roman-domestic-cult"],
    battleRefs: [],
    warfareRefs: [],
    figureRefs: ["livy", "augustus", "suetonius"],
    themeRefs: ["republic", "civic-order", "state-and-religion"],
    bookRefs: ["ab-urbe-condita"],
    relatedMonuments: ["curia-julia", "basilica-julia", "temple-of-castor-and-pollux"],
    mapSlugs: ["roman-republic"],
    imageSlug: "temple-of-saturn",
  },
  {
    slug: "temple-of-castor-and-pollux",
    title: "The Temple of Castor and Pollux",
    alternateNames: ["The Temple of the Dioscuri", "Aedes Castoris"],
    kind: "temple",
    region: "roman",
    standfirst:
      "Vowed on a battlefield, dedicated by the vower's son, and used for two centuries as a speaker's platform, a bank and a bureau of weights and measures — the three columns everyone photographs are the Forum's clearest case of a temple as public infrastructure.",
    description:
      "The Temple of Castor and Pollux — the vow at Lake Regillus, the podium as a rostra and a bank, Cicero on the restoration contract, and the Tiberian rebuilding whose columns still stand.",
    civilizations: ["rome", "roman-republic", "principate"],
    siteSlug: "roman-forum",
    citySlug: "rome",
    modernLocation: "The Roman Forum, Rome",
    architectureRefs: ["temple", "forum", "columns-and-capitals", "architectural-orders"],
    chronology: {
      built: { year: -484, precision: "traditional", display: "traditionally dedicated 484 BCE" },
      display: "Traditionally vowed 499 or 496 BCE and dedicated 484; the standing columns Tiberian, dedicated 6 CE",
      status: "documented",
      phases: [
        {
          label: "The vow and the first temple",
          display: "traditionally 499/496–484 BCE",
          level: "literary",
          note: "Vowed by the dictator Aulus Postumius at Lake Regillus, where the Dioscuri were said to have fought for Rome, and dedicated by his son. The battle's date and historicity are both argued; the temple's early existence is not.",
        },
        {
          label: "The rebuilding of Metellus",
          display: "117 BCE",
          level: "documented",
          note: "Rebuilt by Lucius Caecilius Metellus Dalmaticus from triumphal spoils, on an enlarged podium.",
        },
        {
          label: "The Tiberian temple",
          display: "dedicated 6 CE",
          level: "documented",
          note: "Rebuilt by Tiberius in his own name and that of his dead brother Drusus. The three standing columns belong to this building.",
        },
      ],
    },
    attributions: [
      {
        name: "Aulus Postumius Albinus",
        role: "dedicator",
        level: "literary",
        basis:
          "Livy 2.20 and 2.42 and Dionysius of Halicarnassus 6.13: the dictator vows the temple in battle and his son dedicates it as duumvir. A tradition recorded four centuries later.",
      },
      {
        name: "Tiberius",
        role: "patron",
        level: "documented",
        basis:
          "Cassius Dio 55.27 and Suetonius, Tiberius 20, on the rebuilding dedicated in 6 CE in his own name and his brother's.",
        figureSlug: "tiberius",
      },
    ],
    originalFunction: [
      "A temple of Castor and Pollux, and one of the most heavily used pieces of public infrastructure in Rome. The high podium's front served as a speaker's platform for meetings of the assembly, so that a magistrate addressing the people stood on a temple.",
      "The podium chambers housed the office of weights and measures, where standards were kept and traders' equipment checked, and bankers operated from tabernae in and around it. Deposits were made there under the protection of the god, in the same logic that put the treasury in the podium of Saturn.",
      "The Senate met in it from time to time, as it could in any inaugurated temple.",
    ],
    materials: [
      { material: "Marble", use: "The Tiberian columns, capitals and entablature — Corinthian, and among the finest carved work surviving on the Forum", level: "documented" },
      { material: "Concrete faced with tufa and travertine", use: "The podium of the 117 BCE rebuilding, which the Tiberian temple reused", level: "documented" },
    ],
    measurements: [
      {
        label: "Podium",
        value: "about 50 × 30 m, standing about 7 m high",
        basis: "Modern survey of the surviving podium.",
        level: "documented",
      },
      {
        label: "Standing columns",
        value: "three, about 12.5 m tall with their entablature",
        basis: "Modern survey.",
        level: "documented",
      },
    ],
    construction: [
      "A high Italic podium carrying a Corinthian peripteral temple, with the stair at the front broken by a projecting platform — the arrangement that let the podium front work as a speaker's platform without interrupting access to the cella.",
      "The Tiberian carving is exceptionally fine and is the reason the three columns became the standard image of the Forum: the capitals and the entablature survive in a condition that almost nothing else on the square does.",
    ],
    politicalMeaning: [
      "A temple that doubles as a rostra puts the assembly's business inside a sacred frame, which had real procedural consequences: unfavourable auspices could stop a meeting. Roman politics did not have a secular venue and did not want one.",
      "Cicero's prosecution of Verres includes a sustained attack on the contract for the temple's upkeep, which Verres was accused of manipulating — inspecting the building, declaring the columns out of plumb, and reletting the maintenance at a corrupt price. It is one of the most detailed accounts of Roman public contracting that survives, and it is a hostile one.",
      "Tiberius rebuilding it in his own name and his brother's turns a Republican victory monument into a dynastic one, using the divine twins as the obvious model for a pair of imperial brothers.",
    ],
    religiousMeaning: [
      "The Dioscuri were said to have appeared at Lake Regillus fighting for Rome, and then to have watered their horses at the spring of Juturna beside the temple site and announced the victory in the Forum. The spring is there and has been excavated; the appearance is a foundation story for the cult.",
      "The temple's vow follows the standard Roman pattern in which a commander contracts with a god during a battle and the state discharges the obligation afterwards, sometimes decades later.",
    ],
    laterHistory: [
      "Standing into late antiquity and then quarried; the three columns survived because they remained standing with their entablature locked together, and were a landmark through the medieval period when the Forum floor around them rose by several metres.",
      "Excavated in the nineteenth century and consolidated since.",
    ],
    survival: {
      condition: "standing-ruin",
      level: "documented",
      note: "The podium core, part of the front stair, and three Corinthian columns with their entablature. The cella is gone.",
    },
    archaeology: [
      "Excavation established three superimposed podia — the archaic temple, the Metellan rebuilding and the Tiberian one — with the earliest going back to the fifth century BCE, which is the archaeological support for a temple here at approximately the traditional date.",
      "The spring of Juturna and its basin beside the temple have been excavated, together with dedications, and confirm a cult focus on the spot the legend attaches to.",
    ],
    fragments: [
      {
        what: "Architectural fragments and sculpture from the successive temples",
        level: "documented",
        museumSlug: "museo-nazionale-romano",
      },
    ],
    primarySources: [
      S(
        "From the Founding of the City",
        "2.20, 2.42",
        "Livy on the vow at Lake Regillus and on the dedication of the temple fifteen years later by the vower's son.",
        "Livy",
      ),
      S(
        "Against Verres",
        "2.1.129–154",
        "Cicero's account of the maintenance contract for the temple and of how Verres was alleged to have exploited it. Forensic rhetoric, and the fullest description of the building's upkeep that exists.",
        "Cicero",
      ),
      S(
        "Roman History",
        "55.27",
        "Cassius Dio on the rebuilding dedicated by Tiberius in 6 CE in his own name and that of Drusus.",
        "Cassius Dio",
      ),
    ],
    disputes: [
      {
        question: "Did the battle of Lake Regillus happen?",
        positions:
          "The battle is dated by tradition to 499 or 496 BCE and is described in detail only by writers four centuries later. Its scale, its date and its outcome are all argued, and the epiphany of the Dioscuri is plainly a cult legend. The temple's archaic podium shows that a temple stood here in the fifth century, which supports an early cult without confirming the story that explains it.",
        level: "disputed",
      },
    ],
    museumSlugs: ["museo-nazionale-romano"],
    objectSlugs: [],
    institutionRefs: ["roman-assemblies", "roman-senate", "censor", "aedile", "dictator"],
    religionRefs: ["the-vow-and-the-contract", "roman-augury", "the-sacred-calendar"],
    battleRefs: [],
    warfareRefs: [],
    figureRefs: ["livy", "cicero", "tiberius", "augustus"],
    themeRefs: ["republic", "state-and-religion", "civic-order", "founding-myths"],
    bookRefs: ["ab-urbe-condita"],
    relatedMonuments: ["temple-of-saturn", "basilica-julia", "curia-julia"],
    mapSlugs: ["roman-republic"],
    imageSlug: "temple-of-castor-and-pollux",
  },
  {
    slug: "arch-of-titus",
    title: "The Arch of Titus",
    kind: "commemorative",
    region: "roman",
    standfirst:
      "A single-bay arch to a dead and deified emperor, carrying the only Roman image of the Jerusalem temple's furniture being carried through Rome — and restored in 1821 in a way that shows exactly which stones are modern.",
    description:
      "The Arch of Titus — the spoils relief, the triumph of 71 CE, the arch's medieval life inside a fortress, and Valadier's deliberately legible restoration.",
    civilizations: ["rome", "principate", "high-empire"],
    siteSlug: "roman-forum",
    citySlug: "rome",
    modernLocation: "The Velia, at the east end of the Roman Forum",
    architectureRefs: ["triumphal-arch", "forum", "vaults-and-domes"],
    chronology: {
      built: { year: 81, precision: "approximate", display: "shortly after 81 CE" },
      display: "Erected after Titus's death in 81 CE, under Domitian",
      status: "documented",
      phases: [
        {
          label: "The triumph",
          display: "71 CE",
          level: "documented",
          note: "Vespasian and Titus celebrated a joint triumph for the Jewish war, described at length by Josephus, who was present in Rome. The arch commemorates it a decade later.",
        },
        {
          label: "The arch",
          display: "after 81 CE",
          level: "documented",
          note: "The dedication reads DIVO TITO — to the deified Titus — so it postdates his death and consecration and was put up under his brother Domitian.",
        },
        {
          label: "The Frangipane fortress",
          display: "11th–12th centuries",
          level: "documented",
          note: "Built into a family stronghold, which walled up the bay and preserved the reliefs while destroying the outer piers.",
        },
        {
          label: "Valadier's restoration",
          display: "1821",
          level: "documented",
          note: "The medieval accretions removed and the missing outer bays rebuilt in travertine, deliberately plainer than the ancient marble.",
        },
      ],
    },
    attributions: [
      {
        name: "Domitian",
        role: "patron",
        level: "probable",
        basis:
          "No source names the builder. The dedication to the deified Titus places it after 81 CE, and Domitian is the obvious patron on grounds of date and dynastic interest. It is an inference from the inscription, not a record.",
      },
      {
        name: "Unknown",
        role: "sculptor",
        level: "unknown",
        basis: "No ancient source names a sculptor and no signature survives.",
      },
    ],
    originalFunction: [
      "A commemorative and funerary monument in one: an arch over the Sacra Via at the highest point of the processional route, dedicated to an emperor after his consecration as a god.",
      "It is not a triumphal arch in the strict sense — Titus's triumph was ten years earlier and was marked by a different arch in the Circus Maximus, now lost and known from its inscription. This one commemorates the man rather than the event, and uses the event to do it.",
    ],
    materials: [
      { material: "Pentelic marble", use: "The ancient fabric, including the reliefs and the inscription", level: "documented" },
      { material: "Travertine", use: "Valadier's 1821 reconstruction of the outer bays and much of the attic", level: "documented" },
    ],
    measurements: [
      {
        label: "Height",
        value: "about 15.4 m",
        basis: "Modern survey of the restored monument, which includes Valadier's rebuilt attic.",
        level: "documented",
      },
      {
        label: "Bay width",
        value: "about 5.4 m",
        basis: "Modern survey of the ancient piers.",
        level: "documented",
      },
    ],
    construction: [
      "A single barrel-vaulted bay between two piers, with engaged composite columns — among the earliest surviving uses of the composite order — and a coffered vault carrying a relief of Titus carried up by an eagle.",
      "The two great panels face each other inside the bay. On one, the triumphal chariot with Roma at the horses' heads and a Victory crowning Titus; on the other, the procession carrying the spoils. Both are carved in high relief with figures at different depths, so that the procession appears to turn a corner and pass out of the arch — an illusionistic device that is one of the reasons this arch matters to the history of Roman sculpture.",
    ],
    politicalMeaning: [
      "The Jewish war paid for the Flavian building programme. The same spoils appear as booty on this arch and, on Alföldy's reading, as the funding recorded in the Colosseum's dedicatory inscription. The two buildings are a hundred and fifty metres apart and were paid for by the same campaign.",
      "The arch is also dynastic housekeeping. Domitian's position rested on being the third Flavian, and consecrating and monumentalising his brother made the family a line rather than an episode.",
    ],
    religiousMeaning: [
      "The consecration of a dead emperor as divus is a state act with a procedure, and the vault relief showing Titus carried up by an eagle is its standard image. The arch is a piece of that machinery rather than a private commemoration.",
      "Jewish tradition has long avoided walking under the arch, on the ground that it celebrates the destruction of the Temple. That is a modern and early-modern custom rather than an ancient one, and it is a fact about how the monument has been received.",
    ],
    laterHistory: [
      "Absorbed into the Frangipane fortifications in the eleventh or twelfth century. The bay was blocked and the arch became a gate tower, which is why the reliefs inside it are among the best preserved in Rome and why almost nothing of the outer faces survived.",
      "Freed and restored under Pius VII in 1821 by Giuseppe Valadier, working with Raffaele Stern's design: the medieval masonry removed, the ancient fragments reset, and everything missing rebuilt in plain travertine with simplified profiles. The principle — that a restoration should be visible as one — is now standard and was not then.",
    ],
    survival: {
      condition: "standing",
      level: "documented",
      note: "Standing and complete in outline. The bay, its two great reliefs and the vault are ancient marble; the outer bays, most of the attic and the entablature ends are Valadier's travertine, and the difference is visible at a glance.",
    },
    restoration: [
      "Valadier's 1821 work is the reference case for legible restoration. He did not copy the ancient carving, did not attempt to blend the new stone, and did not invent detail: the new bays carry the same profiles reduced to plain blocks, so that a reader of the building can separate the two at any distance.",
    ],
    archaeology: [
      "The arch's foundations and the line of the Sacra Via beneath it have been examined in the twentieth century, establishing the relationship between the arch, the road and the Flavian rebuilding of the Velia.",
      "Traces of ancient polychromy on the reliefs have been investigated with non-contact imaging, and a yellow pigment has been reported on the menorah. The finding is published and is not universally accepted.",
    ],
    fragments: [
      {
        what: "The lost Circus Maximus arch of Titus, known only from its inscription copied in a medieval manuscript",
        level: "documented",
        heldAt: "Text only; the monument is gone",
        note: "That inscription, not this arch, records the triumph itself.",
      },
    ],
    primarySources: [
      S(
        "The Jewish War",
        "7.123–157",
        "Josephus's eyewitness description of the triumph of 71 CE: the order of the procession, the spoils carried, the golden table and the lampstand, and the execution of Simon bar Giora at the end. The text the spoils relief is always read against.",
        "Josephus",
      ),
      S(
        "The Twelve Caesars",
        "Titus 5–11",
        "Suetonius on Titus's command in Judaea, his brief reign and his death, and the consecration that the arch's dedication presupposes.",
        "Suetonius",
      ),
    ],
    disputes: [
      {
        question: "Does the spoils relief show the actual Temple lampstand?",
        positions:
          "The relief shows a lampstand on a stepped, panelled base carrying figured decoration, which is difficult to reconcile with the description of the Temple menorah in Jewish sources and with the prohibition on such imagery. Explanations include a Roman sculptor working from description, a stand added for the procession, a different object, and a Herodian menorah unlike the earlier one. The image has shaped every later depiction of the menorah, which makes the question more than antiquarian.",
        level: "disputed",
      },
    ],
    museumSlugs: [],
    objectSlugs: [],
    institutionRefs: ["imperial-administration", "roman-senate"],
    religionRefs: ["the-triumph-as-rite", "roman-death-ritual"],
    battleRefs: [],
    warfareRefs: ["siege-warfare", "roman-army"],
    figureRefs: ["suetonius", "tacitus", "augustus"],
    themeRefs: ["monumentality", "empire-and-memory", "historical-memory", "imperial-succession"],
    bookRefs: ["twelve-caesars"],
    relatedMonuments: ["arch-of-constantine", "colosseum", "trajans-column"],
    mapSlugs: ["roman-empire"],
    imageSlug: "arch-of-titus",
    gallerySlugs: ["arch-titus-relief"],
  },
  {
    slug: "arch-of-constantine",
    title: "The Arch of Constantine",
    kind: "commemorative",
    region: "roman",
    standfirst:
      "Built largely out of other emperors' monuments, with their faces recut as Constantine's, and inscribed with a victory won by the prompting of a divinity the text declines to name.",
    description:
      "The Arch of Constantine — the spoliated Hadrianic tondi and Aurelian panels, the Trajanic frieze, the Constantinian carving, and the deliberately unspecific inscription of 315.",
    civilizations: ["rome", "late-empire", "high-empire"],
    citySlug: "rome",
    modernLocation: "Between the Colosseum and the Palatine, Rome",
    architectureRefs: ["triumphal-arch", "vaults-and-domes", "architectural-orders"],
    chronology: {
      built: { year: 315, precision: "exact", display: "dedicated 315 CE" },
      display: "Dedicated 315 CE, on the tenth anniversary of Constantine's accession",
      status: "documented",
      phases: [
        {
          label: "The Milvian Bridge",
          display: "312 CE",
          level: "documented",
          note: "Constantine's defeat of Maxentius outside Rome, the event the arch commemorates.",
        },
        {
          label: "Dedication",
          display: "315 CE",
          level: "documented",
          note: "Dedicated by the Senate and People for the decennalia. The date is given by the inscription and by the Chronographer of 354.",
        },
        {
          label: "Fortification and excavation",
          display: "medieval – 1804",
          level: "documented",
          note: "Built into medieval fortifications, then freed and restored in the early nineteenth century.",
        },
      ],
    },
    attributions: [
      {
        name: "The Senate and People of Rome",
        role: "dedicator",
        level: "documented",
        basis: "The attic inscription, which names them as the dedicators.",
      },
      {
        name: "Constantine",
        role: "patron",
        level: "disputed",
        basis:
          "The arch honours him and was dedicated to him by the Senate; whether the emperor commissioned it or received it is a different question, and the inscription's phrasing suggests the latter. Some scholars have argued that an earlier arch was reworked, which would change the answer again.",
        figureSlug: "constantine",
      },
    ],
    originalFunction: [
      "A commemorative arch honouring Constantine for the defeat of Maxentius and marking ten years of his rule, straddling the processional route between the Colosseum and the Palatine.",
      "It was also a piece of political reconciliation. The Senate had backed Maxentius, who had held Rome; the arch is the body's formal act of accommodation with the man who took the city from him.",
    ],
    materials: [
      { material: "Marble, reused", use: "The great majority of the sculptural decoration, taken from monuments of Trajan, Hadrian and Marcus Aurelius", level: "documented" },
      { material: "Marble, newly carved", use: "The narrative frieze over the side bays, the plinth reliefs, the victories in the spandrels", level: "documented" },
    ],
    measurements: [
      {
        label: "Height",
        value: "21 m",
        basis: "Modern survey.",
        level: "documented",
      },
      {
        label: "Width",
        value: "25.9 m",
        basis: "Modern survey.",
        level: "documented",
      },
    ],
    construction: [
      "A triple-bay arch with detached Corinthian columns on tall plinths, an attic with inscribed panels, and reliefs at four distinct dates set into one composition.",
      "The reuse is systematic rather than opportunistic: eight Hadrianic hunting tondi, eight Aurelian panels from a lost monument, and a long Trajanic battle frieze cut into four sections, arranged symmetrically and with the imperial heads recut to Constantine and his colleague. This is spoliation as design.",
      "The new Constantinian frieze runs in a narrow band above the side bays and tells the campaign of 312 in sequence — the departure from Milan, the siege of Verona, the battle at the bridge, the entry into Rome, the address to the people, the distribution of money.",
    ],
    politicalMeaning: [
      "Reusing the sculpture of Trajan, Hadrian and Marcus Aurelius and giving it Constantine's face is an argument that he belongs in their line. The three chosen emperors are the ones the fourth century regarded as the best, which makes the selection a statement rather than a convenience.",
      "The inscription says Constantine won instinctu divinitatis, by the prompting of the divinity, and mentions no god by name. Written three years after the Milvian Bridge and two years after the toleration settlement, by a body with pagan and Christian members, it is one of the most carefully unspecific sentences in Roman epigraphy, and every account of Constantine's religious position has to deal with it.",
      "The stylistic gap between the reused panels and the new frieze — frontal, squat, hierarchical figures against classical proportion — was read for centuries as evidence of decline. It is now more often read as a deliberate change of register: the new frieze is legible from below at a distance and organises its figures by importance rather than by perspective.",
    ],
    laterHistory: [
      "Incorporated into medieval fortifications, which preserved it. Freed in the early nineteenth century and restored in 1804 under Pius VII by Raffaele Stern, with missing elements replaced and some heads recut again.",
      "It stood in the middle of the twentieth-century parade route past the Colosseum, and was a fixture of Fascist processional staging.",
    ],
    survival: {
      condition: "standing",
      level: "documented",
      note: "Standing and substantially complete, with its reliefs in place. Some of the free-standing statues on the attic and details of the columns are restorations.",
    },
    archaeology: [
      "Study of the fabric has established which elements came from which earlier monuments, and in several cases from which specific building — the Trajanic frieze is generally assigned to the Forum of Trajan, though the identification is argued.",
      "Investigation of the foundations has produced evidence read by some as indicating an earlier arch on the site reworked for Constantine, and by others as ordinary preparation.",
    ],
    fragments: [
      {
        what: "The Great Trajanic Frieze, of which the four panels on the arch are the surviving sections",
        level: "disputed",
        heldAt: "In position on the arch",
        note: "Its original monument is not securely identified; the Forum of Trajan is the usual proposal.",
      },
      {
        what: "Two of the Aurelian panels' companions, from the same lost monument",
        level: "documented",
        museumSlug: "capitoline-museums",
      },
    ],
    primarySources: [
      S(
        "Panegyrici Latini",
        "12(9) and 4(10)",
        "The Latin panegyrics of 313 and 321 on the campaign against Maxentius and the entry into Rome. Court oratory delivered close to the events, and the nearest thing to a contemporary narrative.",
      ),
      S(
        "Life of Constantine",
        "1.28–31",
        "Eusebius on the vision before the battle, written decades later and after long acquaintance with Constantine. It should be read beside the arch's inscription, which says something considerably vaguer.",
        "Eusebius",
      ),
    ],
    disputes: [
      {
        question: "Was there an earlier arch on the site?",
        positions:
          "A proposal advanced since the 1990s holds that the core of the monument is Hadrianic or later and was reworked in 315, on the evidence of the brickwork and the fit of the reused panels. Others hold that the structure is a single build using older sculpture. The question matters because it changes what the Constantinian workshop actually made.",
        level: "disputed",
      },
      {
        question: "What does instinctu divinitatis mean?",
        positions:
          "Readings range from a deliberate compromise formula acceptable to Christian and pagan senators, to a genuine reflection of Constantine's own solar monotheism at that date, to conventional language with no religious content. The phrase is not a Christian formula and it is not a pagan one either, and it was chosen by a body that had reason to avoid both.",
        level: "disputed",
      },
    ],
    museumSlugs: ["capitoline-museums"],
    objectSlugs: ["colossus-of-constantine"],
    institutionRefs: ["roman-senate", "imperial-administration"],
    religionRefs: ["the-triumph-as-rite"],
    battleRefs: [],
    warfareRefs: ["roman-army", "siege-warfare"],
    figureRefs: ["constantine", "hadrian", "trajan", "marcus-aurelius", "diocletian"],
    themeRefs: ["empire-and-memory", "political-legitimacy", "historical-memory", "state-and-religion"],
    bookRefs: [],
    relatedMonuments: ["arch-of-titus", "colosseum", "trajans-column"],
    mapSlugs: ["roman-empire"],
    imageSlug: "arch-of-constantine",
  },
  {
    slug: "trajans-column",
    title: "Trajan's Column",
    kind: "commemorative",
    region: "roman",
    standfirst:
      "A hundred and ninety metres of continuous narrative spiralling up a column nobody could read from the ground, over a burial chamber holding the ashes of the emperor it commemorates.",
    description:
      "Trajan's Column — the Dacian Wars frieze, the inscription about the height of the hill removed, the tomb in the base, and why the fullest Roman war narrative is also the least verifiable.",
    civilizations: ["rome", "principate", "high-empire"],
    citySlug: "rome",
    modernLocation: "The Forum of Trajan, Rome",
    architectureRefs: ["honorific-column", "forum", "columns-and-capitals"],
    chronology: {
      built: { year: 113, precision: "exact", display: "dedicated 113 CE" },
      display: "Dedicated 113 CE; the statue on top replaced in 1588",
      status: "documented",
      phases: [
        {
          label: "The Dacian Wars",
          display: "101–102 and 105–106 CE",
          level: "documented",
          note: "Two campaigns across the Danube ending in the annexation of Dacia. Trajan's own account, the Dacica, is lost apart from a few words.",
        },
        {
          label: "The column",
          display: "dedicated 113 CE",
          level: "documented",
          note: "Dedicated by the Senate and People in the forum built from the spoils, between the Greek and Latin libraries.",
        },
        {
          label: "The burial",
          display: "117 CE",
          level: "documented",
          note: "Trajan died in Cilicia and his ashes were placed in a chamber in the base. Burial inside the sacred boundary of the city was forbidden, and the exception had to be voted.",
        },
        {
          label: "St Peter on the summit",
          display: "1588",
          level: "documented",
          note: "Sixtus V replaced the lost statue of Trajan with a bronze St Peter, which is what stands there now.",
        },
      ],
    },
    attributions: [
      {
        name: "The Senate and People of Rome",
        role: "dedicator",
        level: "documented",
        basis: "The dedicatory inscription on the pedestal.",
      },
      {
        name: "Trajan",
        role: "patron",
        level: "documented",
        basis:
          "The column stands in his forum, is funded from his Dacian spoils, and holds his ashes; the inscription is addressed to him.",
        figureSlug: "trajan",
      },
      {
        name: "Apollodorus of Damascus",
        role: "architect",
        level: "probable",
        basis:
          "Cassius Dio 69.4 names Apollodorus as the designer of Trajan's forum, odeum and gymnasium. The column is not named, and the attribution rests on his responsibility for the complex it stands in.",
        figureSlug: "apollodorus-of-damascus",
      },
    ],
    originalFunction: [
      "A commemorative column carrying a continuous relief of the two Dacian wars, surmounted by a statue of the emperor, standing in the courtyard between the two libraries of his forum.",
      "It became a tomb four years later, when Trajan's ashes were placed in the pedestal chamber. Burial within the pomerium was forbidden, and the exception had to be voted.",
      "The inscription states a third purpose that is easy to miss: to show how high a hill and how much ground were cleared away for these works. The column is, on its own account, a measuring stick.",
    ],
    materials: [
      { material: "Luna marble", use: "The shaft, in nineteen drums, and the pedestal", level: "documented" },
      { material: "Bronze", use: "The original statue of Trajan on the summit, lost by the medieval period", level: "documented" },
    ],
    measurements: [
      {
        label: "Height of the column",
        value: "about 29.8 m; about 35 m including pedestal and statue base",
        basis: "Modern survey. The column proper is close to 100 Roman feet, which is what the inscription's claim about the hill is generally taken to mean.",
        level: "documented",
      },
      {
        label: "Length of the frieze",
        value: "about 190 m, in 23 spiral bands",
        basis: "Modern measurement of the carved band, unwound.",
        level: "documented",
      },
      {
        label: "Figures carved",
        value: "roughly 2,600",
        basis: "Modern counts from casts. Published figures differ by a hundred or more depending on what counts as a figure.",
        level: "probable",
      },
      {
        label: "Internal stair",
        value: "185 steps, lit by 43 slit windows",
        basis: "Direct count and survey within the shaft.",
        level: "documented",
      },
    ],
    construction: [
      "Nineteen drums of Luna marble, each hollowed for the spiral stair before being set, so that the staircase was cut through the blocks and not built inside a shell. The joints run through the carved frieze and are almost invisible.",
      "The frieze was carved after erection, working from the top down or in registers — the evidence of the tool marks and of the joints is argued — and the bands increase in height as they rise, which partly compensates for the viewing angle and does not solve it.",
      "The pedestal contains a vaulted chamber, reached by a door, which received the ashes.",
    ],
    politicalMeaning: [
      "The column is the fullest surviving Roman account of a war and it is the emperor's account. Trajan appears some sixty times, always composed; the army builds, marches, sacrifices and fights in that order of emphasis; the Dacians are individualised and dignified in defeat, which flatters the victory. It is a monument, not a report.",
      "That matters because the alternative sources are gone. Trajan's own commentaries survive in one fragment; Cassius Dio's books on the wars survive in a Byzantine summary. The best-illustrated Roman war is the one whose written record has been lost, and the images have had to carry a weight they were never designed for.",
      "The final scene is the deportation of the Dacian population, and the column does not present it as a tragedy. Reading it as one is a modern response to an ancient monument that is doing something else.",
    ],
    laterHistory: [
      "Survived the medieval period standing, protected by a papal decree in 1162 that made damaging it a capital offence — the column was already understood as a monument to be preserved.",
      "The ashes and the statue were gone by then. Sixtus V put St Peter on top in 1588 as part of a programme of Christianising ancient columns.",
      "Plaster casts were taken in the nineteenth century for the Musée des Monuments Français and for the Victoria and Albert Museum, and those casts are now in better condition than the original surface, which has suffered badly from urban pollution.",
    ],
    survival: {
      condition: "standing",
      level: "documented",
      note: "Standing complete on its pedestal with its frieze, in an excavated hollow well below modern street level. The bronze on top is sixteenth-century.",
    },
    archaeology: [
      "Excavation of the forum around the column has established its position between the libraries and the level of the ancient courtyard, which is several metres below the modern street.",
      "The claim in the inscription about the height of ground removed has been tested by excavation on the Quirinal side. The quantity of rock actually cut away is argued, and some scholars now hold that the saddle between the Capitoline and the Quirinal was lower than the inscription implies and that the sentence refers to the whole complex rather than a single cut.",
    ],
    fragments: [
      {
        what: "Nineteenth-century plaster casts of the entire frieze, taken when the surface was in better condition",
        level: "documented",
        heldAt: "Museo della Civiltà Romana, Rome; the Victoria and Albert Museum, London; and other collections",
      },
    ],
    primarySources: [
      S(
        "Roman History",
        "68.6–14",
        "Cassius Dio on the Dacian wars, surviving mainly in the epitome of Xiphilinus. Thin, late and abbreviated, and still the principal narrative source.",
        "Cassius Dio",
      ),
      S(
        "The dedicatory inscription",
        "CIL VI 960",
        "The Senate and People to Trajan, and the statement that the column shows how high a hill and how much ground was cleared for these works. The single most argued sentence about the site.",
      ),
    ],
    disputes: [
      {
        question: "Could anyone read the frieze?",
        positions:
          "The upper bands are more than twenty metres up and the spiral turns away from any fixed viewpoint. Proposals include viewing from the library balconies, reading the lower registers only, treating the column as a symbol rather than a text, and a lost painted scheme that made it legible. Nothing settles it, and the difficulty is real: the most detailed Roman narrative relief is mostly invisible.",
        level: "disputed",
      },
      {
        question: "How much of the hill was actually removed?",
        positions:
          "Taken literally the inscription implies about thirty metres of rock cut away for the forum. Excavation on the Quirinal slope has produced results read both as confirming a major cut and as showing that the saddle was already low. The reading of the Latin is also argued — whether the height refers to the hill removed or to the works themselves.",
        level: "disputed",
      },
    ],
    museumSlugs: [],
    objectSlugs: [],
    institutionRefs: ["roman-senate", "imperial-administration", "roman-provinces"],
    religionRefs: ["animal-sacrifice", "the-triumph-as-rite", "roman-death-ritual"],
    battleRefs: [],
    warfareRefs: ["roman-army", "roman-engineering", "siege-warfare", "logistics", "roman-camps"],
    figureRefs: ["trajan", "apollodorus-of-damascus", "hadrian"],
    themeRefs: ["empire-and-memory", "military-command", "monumentality", "imperial-administration"],
    bookRefs: [],
    relatedMonuments: ["forum-of-trajan", "arch-of-constantine", "arch-of-titus"],
    mapSlugs: ["roman-empire"],
    imageSlug: "trajans-column",
    gallerySlugs: ["trajans-column-testudo", "trajans-column-artillery"],
  },
  {
    slug: "forum-of-trajan",
    title: "The Forum of Trajan",
    kind: "civic-building",
    region: "roman",
    standfirst:
      "The last and largest of the imperial fora, which astonished an emperor two centuries later — and which now lies mostly under a road built in 1932.",
    description:
      "The Forum of Trajan — Apollodorus of Damascus, the Basilica Ulpia and the two libraries, Constantius II's reaction in 357, and what the Via dei Fori Imperiali covers.",
    civilizations: ["rome", "principate", "high-empire"],
    citySlug: "rome",
    modernLocation: "Between the Capitoline and the Quirinal, Rome",
    architectureRefs: ["forum", "basilica", "honorific-column", "roman-concrete"],
    chronology: {
      built: { year: 112, precision: "exact", display: "dedicated 112 CE" },
      display: "Dedicated 112 CE; the column added 113",
      status: "documented",
      phases: [
        {
          label: "Construction",
          display: "c. 106–112 CE",
          level: "documented",
          note: "Built from the Dacian spoils, on ground cleared between the Capitoline and the Quirinal.",
        },
        {
          label: "The column",
          display: "113 CE",
          level: "documented",
          note: "Dedicated a year after the forum, in the court between the libraries.",
        },
        {
          label: "The temple of Divus Traianus",
          display: "after 117 CE",
          level: "disputed",
          note: "A temple to the deified Trajan is attested in literary sources and on coins. Where it stood, and whether it lay within the forum at all, is one of the open questions of Roman topography.",
        },
        {
          label: "Via dei Fori Imperiali",
          display: "1932",
          level: "documented",
          note: "A parade route driven across the imperial fora buried a substantial part of the complex under asphalt, where it remains.",
        },
      ],
    },
    attributions: [
      {
        name: "Trajan",
        role: "patron",
        level: "documented",
        basis: "The forum carries his name and was funded from the Dacian spoils; the column's inscription records the Senate's dedication to him.",
        figureSlug: "trajan",
      },
      {
        name: "Apollodorus of Damascus",
        role: "architect",
        level: "documented",
        basis:
          "Cassius Dio 69.4 names him as the designer of Trajan's forum, odeum and gymnasium. This is one of very few Roman buildings whose architect is named by an ancient source.",
        figureSlug: "apollodorus-of-damascus",
      },
    ],
    originalFunction: [
      "A monumental public square with law courts, libraries, and a commemorative programme, entered through an arch and closed at the far end by the Basilica Ulpia — the largest basilica in Rome, with a double aisle on all sides and apses at each end.",
      "The two libraries flanking the column held the Greek and Latin collections. A public building programme that puts a war memorial between two libraries is making a claim about what kind of victory it was.",
      "The forum also functioned administratively: manumissions took place in the basilica, and the space was used for imperial ceremonial including, later, the public burning of tax records.",
    ],
    materials: [
      { material: "Coloured marbles", use: "Paving and revetment throughout — giallo antico, pavonazzetto, africano — an inventory of the imperial quarry system", level: "documented" },
      { material: "Granite", use: "The basilica's columns, in grey Egyptian granite, over a hundred of them", level: "documented" },
      { material: "Brick-faced concrete", use: "The structural cores and the hemicycles", level: "documented" },
    ],
    measurements: [
      {
        label: "Overall extent",
        value: "about 300 × 185 m including the basilica and library court",
        basis: "Modern reconstruction from the excavated portions and the Severan marble plan; substantial parts are unexcavated.",
        level: "probable",
      },
      {
        label: "Basilica Ulpia",
        value: "about 170 × 60 m",
        basis: "Modern survey of the excavated remains, supplemented by the Severan marble plan.",
        level: "probable",
      },
    ],
    construction: [
      "The complex is set into a cut between two hills, and the great hemicycles on the flanks are retaining structures made monumental — brick-faced concrete carrying shops and corridors on several levels, of which the group conventionally called the Markets of Trajan is the surviving part.",
      "The Basilica Ulpia carried a timber roof over a nave of about twenty-five metres, with double aisles and galleries. Its bronze roof tiles were still there in the seventh century to be taken.",
      "The forum is the point at which Roman planning stops arranging buildings and starts composing a single designed sequence: arch, square, basilica, libraries, column, temple. Everything after it in Rome is smaller.",
    ],
    politicalMeaning: [
      "Built from the spoils of the conquest of Dacia and dominated by a column narrating that conquest, the forum is a war memorial the size of a district. The equestrian statue of Trajan in the square, which Ammianus says Constantius II wanted to copy, made the point again in the middle.",
      "Ammianus Marcellinus describes Constantius II arriving in Rome in 357 and being stopped by this complex — a construction unique under the heavens, which even the gods must agree in admiring. It is the best evidence for how the building was regarded two centuries after it was finished, from a writer who was not easily impressed.",
      "Its later fate is a second political statement. In 1932 a road was driven across the imperial fora for military parades, burying a large part of Trajan's complex. The archaeology sacrificed to that road has never been recovered, and the decision still governs what can be seen.",
    ],
    laterHistory: [
      "In use into late antiquity, and still standing in part when Cassiodorus and Ammianus wrote about it. Progressively quarried thereafter; the basilica's granite columns went into churches.",
      "Rediscovered piecemeal from the sixteenth century; the column was always visible. Systematic excavation began under Napoleonic occupation in 1812 and continued, with a major campaign in the 1920s and 1930s that exposed the basilica's column stumps and the hemicycle.",
      "Excavation since the 1990s has concentrated on the areas not covered by the road and on the Markets complex.",
    ],
    survival: {
      condition: "foundations",
      level: "documented",
      note: "The column stands complete. Of the rest, the pavement and the re-erected column stumps of the Basilica Ulpia, part of the library rooms, and the hemicycle with the Markets above it. A large proportion lies under the Via dei Fori Imperiali.",
    },
    archaeology: [
      "The Severan marble plan of Rome preserves parts of the forum's ground plan at 1:240, and is the main evidence for the areas that cannot be excavated.",
      "Excavation in the 1990s and 2000s revised the reconstruction of the north end and reopened the question of where the temple of Divus Traianus stood, with some arguing it lay outside the forum on the Quirinal side and others that it was never built where the older reconstructions place it.",
    ],
    fragments: [
      {
        what: "Sculpture from the forum, including Dacian prisoner statues, dispersed since antiquity",
        level: "documented",
        museumSlug: "vatican-museums",
      },
      {
        what: "The Great Trajanic Frieze, generally assigned to this complex and reused on the Arch of Constantine",
        level: "disputed",
        heldAt: "On the Arch of Constantine",
      },
    ],
    primarySources: [
      S(
        "Roman History",
        "69.4",
        "Cassius Dio names Apollodorus of Damascus as the architect of Trajan's forum, odeum and gymnasium, in the course of the story about his death under Hadrian.",
        "Cassius Dio",
      ),
      S(
        "Res Gestae",
        "16.10.15–16",
        "Ammianus Marcellinus on Constantius II in the forum in 357: a construction unique under the heavens, at which the emperor stopped astonished and said he would copy only the horse.",
        "Ammianus Marcellinus",
      ),
    ],
    disputes: [
      {
        question: "Where was the temple of Divus Traianus?",
        positions:
          "Literary sources and coins attest a temple of the deified Trajan associated with the forum. Older reconstructions place it beyond the libraries on the north; excavation there has not found it, and proposals now include a position on the Quirinal side, a location south of the forum, and the possibility that the structure attested is not a temple at all. This is one of the standing problems of Roman topography.",
        level: "disputed",
      },
      {
        question: "How much survives under the road?",
        positions:
          "Soundings and geophysics indicate substantial remains beneath the Via dei Fori Imperiali. Proposals to remove the road have been made repeatedly since the 1980s and have not been carried out. What is there is inferred rather than known.",
        level: "unknown",
      },
    ],
    museumSlugs: ["vatican-museums", "museo-nazionale-romano"],
    objectSlugs: [],
    institutionRefs: ["roman-senate", "imperial-administration", "roman-law", "roman-provinces"],
    religionRefs: [],
    battleRefs: [],
    warfareRefs: ["roman-army", "roman-engineering"],
    figureRefs: ["trajan", "apollodorus-of-damascus", "hadrian"],
    themeRefs: ["monumentality", "imperial-administration", "empire-and-memory", "empire-building"],
    bookRefs: [],
    relatedMonuments: ["trajans-column", "forum-of-augustus", "basilica-julia"],
    mapSlugs: ["roman-empire"],
    imageSlug: "forum-of-trajan",
  },
  {
    slug: "forum-of-augustus",
    title: "The Forum of Augustus",
    kind: "civic-building",
    region: "roman",
    standfirst:
      "A square lined with statues of Rome's great men, closed by a temple to Mars the Avenger vowed before a battle forty years earlier — and with an irregular boundary because some owners would not sell.",
    description:
      "The Forum of Augustus — the Temple of Mars Ultor, the gallery of summi viri with their inscribed elogia, the fire wall against the Subura, and the land Augustus could not buy.",
    civilizations: ["rome", "principate", "roman-republic"],
    citySlug: "rome",
    modernLocation: "Via dei Fori Imperiali, Rome",
    architectureRefs: ["forum", "temple", "columns-and-capitals", "building-materials"],
    chronology: {
      built: { year: -2, precision: "exact", display: "dedicated 2 BCE" },
      display: "Vowed 42 BCE, dedicated 2 BCE",
      status: "documented",
      phases: [
        {
          label: "The vow at Philippi",
          display: "42 BCE",
          level: "documented",
          note: "Octavian vowed a temple to Mars the Avenger before the battle against Caesar's assassins. Forty years passed between the vow and its discharge.",
        },
        {
          label: "The standards",
          display: "20 BCE",
          level: "documented",
          note: "The legionary standards lost at Carrhae were recovered from Parthia by negotiation. They were eventually housed in the temple, which gave Mars Ultor a second thing to avenge.",
        },
        {
          label: "Dedication",
          display: "2 BCE",
          level: "documented",
          note: "Dedicated in the year Augustus received the title pater patriae. The forum was in use before the temple was finished.",
        },
        {
          label: "Fire, restoration and quarry",
          display: "1st century CE onwards",
          level: "documented",
          note: "Repaired after fires; progressively stripped in the medieval period, when the site was occupied by a convent and later by houses.",
        },
      ],
    },
    attributions: [
      {
        name: "Augustus",
        role: "patron",
        level: "documented",
        basis:
          "Res Gestae 21: he built the forum on private ground and from the spoils of war. His own inventory of his works.",
        figureSlug: "augustus",
      },
      {
        name: "Unknown",
        role: "architect",
        level: "unknown",
        basis: "No ancient source names an architect for the complex.",
      },
    ],
    originalFunction: [
      "A public square with a temple, built to relieve the congested Forum Romanum. Augustus states in his own account that legal business and the drawing of juries moved here, and it was also where the Senate met to deliberate on wars and triumphs, where generals departing for a province set out, and where victorious commanders dedicated their triumphal insignia.",
      "It was also a gallery. The exedrae on either side carried statues of the summi viri — Rome's great men — each with an inscription giving name, offices and achievements. Aeneas with Anchises and the Julian line stood on one side; Romulus and the kings and Republican commanders on the other.",
    ],
    materials: [
      { material: "Luna marble", use: "The temple's columns and the paving of the square", level: "documented" },
      { material: "Coloured marbles", use: "Pavonazzetto for the attic caryatids and the exedra floors, africano and giallo antico for the paving pattern", level: "documented" },
      { material: "Gabine stone (peperino)", use: "The great fire wall along the back, over thirty metres high, separating the forum from the Subura", level: "documented" },
    ],
    measurements: [
      {
        label: "The fire wall",
        value: "over 30 m high",
        basis: "Modern survey of the standing wall, which is the best-preserved element of the complex.",
        level: "documented",
      },
      {
        label: "Temple podium",
        value: "about 35 m wide",
        basis: "Modern survey of the surviving podium and the three standing columns.",
        level: "documented",
      },
    ],
    construction: [
      "The temple stands against the back wall rather than free in the square, so the composition is frontal: everything is arranged to be seen from the entrance looking at the temple.",
      "The back wall is a piece of fire engineering as much as architecture. It is built of hard grey Gabine stone, is enormously thick and high, and separates the marble complex from the dense, flammable working district of the Subura behind it. It is still standing to most of its height, which is how we know what Augustan retaining construction could do.",
      "The attic of the colonnades carried caryatids copied from the Erechtheion porch on the Athenian Acropolis, alternating with shields bearing the head of Jupiter Ammon — a direct architectural quotation of classical Athens, executed in Italian marble.",
    ],
    politicalMeaning: [
      "The gallery of summi viri is the most explicit statement of Augustan historical politics that survives. Placing the Julian line facing the Republican commanders, each with a formal inscription, made the new regime the culmination of Roman history rather than a break in it — and Suetonius says Augustus stated that he had set them up so that citizens should measure him and later principes against those men.",
      "Mars Ultor avenges two things at once: Caesar's murder, which the vow at Philippi answered, and the standards lost at Carrhae, recovered from Parthia by diplomacy and presented as a conquest. Housing the standards in a temple of vengeance converted a negotiated settlement into a victory.",
      "Suetonius also records that Augustus could not make the forum as large as he intended because he would not compel the neighbouring owners to sell. The square's irregular back corner is the physical trace of that restraint, and Roman writers treated it as a moral fact about him.",
    ],
    religiousMeaning: [
      "The vow-and-discharge pattern is the standard Roman transaction with a god, and here the interval is forty years, which is a reminder that these obligations were inherited and permanent rather than immediate.",
      "The temple became the ceremonial centre for war: the Senate voted on triumphs there, governors departed from it, and the boys of the imperial family assumed the toga virilis in it.",
    ],
    laterHistory: [
      "Damaged by fire, restored, and then progressively dismantled. In the medieval period the site held the church and convent of the Knights of Rhodes, built into the ruins, which is why part of the complex survived at all.",
      "Cleared in the 1920s and 1930s as part of the same programme that produced the Via dei Fori Imperiali, and the road runs across the front of it.",
    ],
    survival: {
      condition: "foundations",
      level: "documented",
      note: "The great fire wall stands to most of its height. Three columns of the temple and part of its podium survive, along with the paving of the square and one exedra. The statue gallery is gone; a number of the inscribed elogia survive in fragments.",
    },
    archaeology: [
      "Fragments of the elogia — the inscriptions under the statues — have been recovered here and, in a fuller series, in a copy of the gallery at Arezzo and elsewhere in Italy. The copies are how the programme can be reconstructed, and they show it was exported to other cities.",
      "Excavation established the plan, the position of the exedrae and the caryatid attic; a section of the attic has been re-erected.",
    ],
    fragments: [
      {
        what: "Caryatids and Jupiter Ammon shields from the colonnade attic",
        level: "documented",
        heldAt: "Museo dei Fori Imperiali, Rome",
      },
      {
        what: "Fragments of the elogia of the summi viri",
        level: "documented",
        heldAt: "Museo dei Fori Imperiali, Rome, and the epigraphic corpora",
      },
      {
        what: "Colossal statue fragments from the temple, including a hand and part of a foot",
        level: "probable",
        heldAt: "Museo dei Fori Imperiali, Rome",
        note: "Whether they belong to a cult statue of Mars or to a colossus of Augustus in the forum is argued.",
      },
    ],
    primarySources: [
      S(
        "Res Gestae Divi Augusti",
        "21",
        "Augustus: he built the forum on ground he owned and from the spoils of war. Two sentences that establish the funding and the ownership.",
        "Augustus",
      ),
      S(
        "The Twelve Caesars",
        "Augustus 29, 31, 56",
        "Suetonius on the vow before Philippi, on the statues of the great men and Augustus's stated reason for them, and on his refusal to compel the neighbours to sell.",
        "Suetonius",
      ),
      S(
        "Fasti",
        "5.545–598",
        "Ovid's account of the dedication of the temple of Mars Ultor and of the vow at Philippi, written within a few years of the event and as court poetry.",
        "Ovid",
      ),
    ],
    disputes: [
      {
        question: "What stood in the temple?",
        positions:
          "Reconstructions place Mars, Venus and the deified Caesar in the cella, on the evidence of a relief from Algeria usually taken to copy the group. Colossal fragments from the site have been assigned both to that cult group and to a statue of Augustus in the square. The identification is a reasonable inference from a copy and is not documented.",
        level: "disputed",
      },
    ],
    museumSlugs: ["capitoline-museums"],
    objectSlugs: ["augustus-louvre"],
    institutionRefs: ["roman-senate", "cursus-honorum", "imperium", "roman-provinces", "dictator"],
    religionRefs: ["the-vow-and-the-contract", "the-triumph-as-rite", "the-sacred-calendar"],
    battleRefs: ["carrhae"],
    warfareRefs: ["roman-army"],
    figureRefs: ["augustus", "julius-caesar", "suetonius", "livy", "marcus-agrippa"],
    themeRefs: ["founding-myths", "political-legitimacy", "historical-memory", "monumentality"],
    bookRefs: ["res-gestae", "twelve-caesars"],
    relatedMonuments: ["ara-pacis", "forum-of-trajan", "curia-julia"],
    mapSlugs: ["roman-empire"],
    imageSlug: "forum-of-augustus",
  },
  {
    slug: "ara-pacis",
    title: "The Ara Pacis Augustae",
    alternateNames: ["The Altar of Augustan Peace"],
    kind: "commemorative",
    region: "roman",
    standfirst:
      "An altar voted by the Senate, dug out of waterlogged ground under a palace in pieces over four centuries, reassembled for a Fascist anniversary, and now standing several hundred metres from where it was built.",
    description:
      "The Ara Pacis — the processional friezes and the disputed identifications, the 1930s excavation by freezing the water table, the Augustan bimillennium, and the relationship to the meridian of Augustus.",
    civilizations: ["rome", "principate"],
    citySlug: "rome",
    modernLocation: "Museo dell'Ara Pacis, Lungotevere in Augusta, Rome",
    architectureRefs: ["temple", "necropolis", "building-materials"],
    chronology: {
      built: { year: -9, precision: "exact", display: "dedicated 30 January 9 BCE" },
      display: "Voted 13 BCE, dedicated 9 BCE",
      status: "documented",
      phases: [
        {
          label: "The vote",
          display: "4 July 13 BCE",
          level: "documented",
          note: "The Senate voted an altar of Augustan Peace on Augustus's return from Spain and Gaul. The date is preserved in the calendars.",
        },
        {
          label: "Dedication",
          display: "30 January 9 BCE",
          level: "documented",
          note: "Dedicated on Livia's birthday, in the Campus Martius on the line of the Via Flaminia.",
        },
        {
          label: "Burial",
          display: "late antiquity onwards",
          level: "documented",
          note: "The Campus Martius silted and the altar was buried by rising ground and Tiber flooding.",
        },
        {
          label: "Recovery",
          display: "1568, 1859, 1903, 1937–1938",
          level: "documented",
          note: "Found piecemeal beneath the Palazzo Peretti over nearly four centuries, and finally excavated whole in 1937–38 by freezing the groundwater.",
        },
        {
          label: "Reassembly and relocation",
          display: "1938",
          level: "documented",
          note: "Reassembled on a new site beside the Mausoleum of Augustus and inaugurated on 23 September 1938, the two-thousandth anniversary of Augustus's birth.",
        },
      ],
    },
    attributions: [
      {
        name: "The Senate",
        role: "dedicator",
        level: "documented",
        basis: "Res Gestae 12, and the Roman calendars, which record both the vote and the dedication.",
      },
      {
        name: "Augustus",
        role: "patron",
        level: "documented",
        basis:
          "Res Gestae 12, in which Augustus records that the Senate decreed the altar on his return and ordered magistrates, priests and Vestals to sacrifice at it annually.",
        figureSlug: "augustus",
      },
    ],
    originalFunction: [
      "An open-air altar within a marble precinct, for an annual sacrifice by magistrates, priests and Vestal Virgins. It is a working altar, not a temple: the sacrificial table stands inside a walled enclosure open to the sky, reached by steps on the west.",
      "The sculptural programme carries the meaning. Outside, a procession of the imperial family, priests and magistrates on the two long walls; mythological panels at the corners — Aeneas or Numa sacrificing, the she-wolf, Roma, and a seated female figure with children and animals whose identity has never been agreed. Below all of it, a deep band of acanthus scroll teeming with small creatures.",
    ],
    materials: [
      { material: "Luna marble", use: "The precinct walls, the altar and all the sculpture", level: "documented" },
    ],
    measurements: [
      {
        label: "Precinct",
        value: "about 11.6 × 10.6 m, walls about 6 m high",
        basis: "Modern survey of the reassembled monument, which reproduces the excavated dimensions.",
        level: "documented",
      },
    ],
    construction: [
      "A rectangular marble screen wall on a low podium, with openings east and west, enclosing a stepped altar. The whole thing is a frame for relief carving, and the carving is among the finest to survive from the ancient world.",
      "The procession friezes are carved in two planes, with figures at the front in high relief and a crowd behind them in low relief, which gives depth to a slab less than a hand's breadth thick. Children appear in the procession, tugging at adults' clothing, which is generally said to be their first appearance on a Roman state relief.",
    ],
    politicalMeaning: [
      "Peace here is a specific claim: peace secured by victory, granted by a returning commander, and celebrated by a Senate that had voted it. The Res Gestae puts the altar immediately after the closing of the doors of Janus, and the two are the same argument.",
      "The procession is a dynastic photograph. Reading it is the central problem: the figures are not labelled, and identifications of Agrippa, Livia, Tiberius, Antonia, Drusus and the children have been proposed, revised and abandoned repeatedly. A monument that is universally described as showing the imperial family shows a group of people nobody can name with certainty.",
      "Its modern history is as political as its ancient one. Excavated with novel engineering, reassembled on a new site by the Mausoleum, and unveiled for the Augustan bimillennium in 1938, the altar was made into a centrepiece of a regime that presented itself as the heir of Augustus. The current museum, opened in 2006, replaced the 1938 pavilion and was itself controversial.",
    ],
    religiousMeaning: [
      "The annual sacrifice by magistrates, priests and Vestals is specified in the senatorial decree, which makes the altar an instrument of the state calendar rather than a memorial.",
      "The mythological panels tie the present regime to the foundation: Aeneas sacrificing, the twins and the wolf, Roma on her arms. Whether the sacrificing figure is Aeneas or Numa is argued, and the two readings point the programme in different directions — descent or lawgiving.",
    ],
    laterHistory: [
      "Buried under four metres of silt and later buildings. Nine sculpted slabs came to light in 1568 and were dispersed — to the Villa Medici, to Florence, to the Vatican, and eventually to the Louvre.",
      "Further fragments were found in 1859. In 1903 an excavation under the Palazzo Peretti reached the monument but had to stop because the building was unsafe. In 1937 the ground was frozen with brine to hold back the water table, and the remainder was recovered.",
      "Reassembled from the excavated blocks, the returned fragments and casts of those that could not be recovered, and inaugurated in 1938.",
    ],
    survival: {
      condition: "reassembled",
      level: "documented",
      note: "Standing complete, several hundred metres from its ancient position, assembled from original blocks with casts filling the gaps. It is simultaneously one of the best-preserved Augustan monuments and one of the most reconstructed.",
    },
    restoration: [
      "The 1938 reassembly combined excavated blocks, fragments recovered from Italian and foreign collections, and plaster casts of pieces that stayed abroad. Which is which is documented but is not marked on the monument, and photographs rarely distinguish them.",
    ],
    archaeology: [
      "The 1937–38 excavation is a landmark of technique: the ground was frozen to stop the water table collapsing the trench, which allowed a complete recovery of a monument that had defeated three earlier attempts.",
      "The relationship between the altar and the great sundial of Augustus — an Egyptian obelisk with a meridian line laid out on the Campus Martius — was proposed in the 1970s on the basis of excavation and the claim that the obelisk's shadow reached the altar on Augustus's birthday. The meridian exists and has been partly excavated; the specific alignment claim has been contested on the ground that the geometry does not work as described.",
    ],
    fragments: [
      {
        what: "Relief slabs found in 1568 and dispersed to European collections; several were returned for the 1938 reassembly and some remain abroad",
        level: "documented",
        museumSlug: "louvre",
      },
      {
        what: "Fragments in the Vatican and Florentine collections",
        level: "documented",
        museumSlug: "vatican-museums",
      },
    ],
    primarySources: [
      S(
        "Res Gestae Divi Augusti",
        "12",
        "Augustus records the Senate's decree of an altar of Augustan Peace on his return from Spain and Gaul, and the order that magistrates, priests and Vestals should sacrifice at it every year.",
        "Augustus",
      ),
      S(
        "Fasti",
        "1.709–722",
        "Ovid on the altar of Peace and on the closing of the temple of Janus, the two Augustan claims about peace made together.",
        "Ovid",
      ),
    ],
    disputes: [
      {
        question: "Who is the seated woman with the twins?",
        positions:
          "The best-known panel shows a seated female figure with two infants, flanked by personifications of air and water, with livestock and fruit around her. She has been identified as Tellus, Italia, Pax, Venus, Ceres and a composite. No inscription names her, no ancient source describes the panel, and the reading changes what the whole programme is about.",
        level: "disputed",
      },
      {
        question: "Did the meridian of Augustus point at the altar?",
        positions:
          "Edmund Buchner argued that the obelisk's shadow ran to the Ara Pacis on Augustus's birthday, making the altar the terminus of a solar instrument. Later work on the surviving meridian pavement and on the ancient ground level has found the geometry difficult to sustain in that form. The obelisk, the meridian and the altar were certainly part of one Campus Martius programme; the precise alignment claim is not established.",
        level: "disputed",
      },
    ],
    museumSlugs: ["louvre", "vatican-museums"],
    objectSlugs: ["augustus-louvre"],
    institutionRefs: ["roman-senate", "imperial-administration"],
    religionRefs: ["animal-sacrifice", "womens-religious-office", "the-sacred-calendar", "the-vow-and-the-contract"],
    battleRefs: ["actium"],
    warfareRefs: [],
    figureRefs: ["augustus", "marcus-agrippa", "tiberius", "livy"],
    themeRefs: ["political-legitimacy", "historical-memory", "founding-myths", "war-and-peace"],
    bookRefs: ["res-gestae"],
    relatedMonuments: ["forum-of-augustus", "pantheon"],
    mapSlugs: ["roman-empire"],
    imageSlug: "ara-pacis",
  },
  {
    slug: "baths-of-caracalla",
    title: "The Baths of Caracalla",
    kind: "bath",
    region: "roman",
    standfirst:
      "Vaults sixty metres up over a hall the size of a cathedral, heated by furnaces that consumed forests, and stripped in the sixteenth century to furnish a papal family's sculpture collection.",
    description:
      "The Baths of Caracalla — the plan and the vaulting, the Aqua Antoniniana, the Farnese excavations that produced the Hercules and the Bull, and what the building did when the aqueducts were cut.",
    civilizations: ["rome", "high-empire", "principate"],
    citySlug: "rome",
    modernLocation: "Viale delle Terme di Caracalla, Rome",
    architectureRefs: ["baths", "vaults-and-domes", "roman-concrete", "aqueduct"],
    chronology: {
      built: { year: 216, precision: "exact", display: "opened 216 CE" },
      display: "Begun c. 212 CE, opened 216, completed under Severus Alexander",
      status: "documented",
      phases: [
        {
          label: "Construction",
          display: "c. 212–216 CE",
          level: "documented",
          note: "Begun under Caracalla and opened within about four years — an extraordinary rate for a building of this size, achieved by working the whole platform at once.",
        },
        {
          label: "Completion of the precinct",
          display: "c. 217–235 CE",
          level: "documented",
          note: "The outer enclosure, the libraries and the stadium finished under Elagabalus and Severus Alexander.",
        },
        {
          label: "Repairs",
          display: "4th–5th centuries CE",
          level: "documented",
          note: "Still in use and being repaired; the building was one of the sights of late-antique Rome.",
        },
        {
          label: "The aqueducts cut",
          display: "537 CE",
          level: "documented",
          note: "The Gothic siege severed the aqueducts serving Rome. The baths depended entirely on that supply and could not function without it.",
        },
      ],
    },
    attributions: [
      {
        name: "Caracalla",
        role: "patron",
        level: "documented",
        basis:
          "The building carried his name in antiquity, and the Historia Augusta and later regionary catalogues attribute it to him; brickstamps date the fabric to his reign.",
      },
      {
        name: "Unknown",
        role: "architect",
        level: "unknown",
        basis: "No ancient source names an architect.",
      },
    ],
    originalFunction: [
      "A public bath on the imperial scale: a symmetrical block of hot, warm and cold rooms flanked by two identical suites of changing rooms and exercise courts, set in a walled precinct with gardens, libraries, shops and a stadium.",
      "It was free or nearly free to enter, and it was a place to spend a day rather than to wash. The doubling of the plan on either side of a central axis means two crowds could use the building at once and meet only in the great cold hall.",
    ],
    materials: [
      { material: "Brick-faced concrete", use: "The entire structural fabric, including the cross-vaults", level: "documented" },
      { material: "Coloured marble and granite", use: "Revetment, paving and the monolithic columns of the frigidarium — all removed", level: "documented" },
      { material: "Mosaic", use: "Floors throughout, including the athlete mosaics from the palaestrae", level: "documented" },
      { material: "Lead", use: "Piping for the water distribution, stripped in the medieval period", level: "documented" },
    ],
    measurements: [
      {
        label: "The bath block",
        value: "about 214 × 110 m",
        basis: "Modern survey of the standing structure.",
        level: "documented",
      },
      {
        label: "The precinct",
        value: "about 337 × 328 m",
        basis: "Modern survey and excavation of the enclosure wall.",
        level: "documented",
      },
      {
        label: "Frigidarium vault",
        value: "springing about 33 m above the floor",
        basis: "Modern survey of the surviving piers and vault springing.",
        level: "documented",
      },
      {
        label: "Bathers at one time",
        value: "perhaps 1,500–2,000",
        basis:
          "A modern estimate from the floor area of the changing rooms and the pools. The regionary catalogues give 1,600 seats, which may refer to something narrower. No ancient count of users exists.",
        level: "disputed",
      },
    ],
    construction: [
      "The whole complex sits on an artificial platform six metres high, containing the service level: furnace rooms, fuel stores, a mill, and a network of tunnels large enough for carts, so that the machinery of the building was invisible to its users.",
      "The frigidarium is roofed by three groin vaults on eight granite columns, a structure that gave the Renaissance its model for large interior spans and, through it, the nave of St Peter's and a series of nineteenth-century railway stations.",
      "The caldarium was a domed rotunda about thirty-five metres across on the south-west side, glazed and oriented to take the afternoon sun. Its floor was raised on hypocaust pillars over furnaces fed continuously; the fuel requirement has been estimated in the thousands of tonnes of wood a year, which is a modern calculation from the volume heated and not an ancient figure.",
      "Water came by a dedicated branch of the Aqua Marcia, the Aqua Antoniniana, carried over the Via Appia on an arcade built for the purpose, into a cistern of sixty-four chambers at the back of the precinct.",
    ],
    politicalMeaning: [
      "A bath of this size given free to the population is an imperial transaction: the emperor supplies the city with something no private person could, and the building carries his name. Caracalla's reign is remembered for the murder of his brother and for extending citizenship to the free population of the empire; the baths are the third thing, and in Rome they were the visible one.",
      "The scale is also a statement about water. Rome's aqueducts made a building like this possible, and the severing of them in 537 ended it. What killed the great baths was not conquest but the cutting of a supply line.",
    ],
    laterHistory: [
      "Abandoned after 537 and used as a quarry and a cemetery. The vaults came down over centuries, mostly through earthquake.",
      "In the 1540s Pope Paul III, of the Farnese family, had the site dug for sculpture. The excavations produced the colossal Farnese Hercules, the Farnese Bull, and a great deal else, all of which passed by inheritance to Naples in the eighteenth century. The building was mined for a collection.",
      "Granite columns from the frigidarium were taken to Florence; one stands in the Piazza della Trinità. Marble went into churches and palaces across Rome.",
      "Opera has been staged in the ruins since 1937, which has caused its own conservation problems.",
    ],
    survival: {
      condition: "standing-ruin",
      level: "documented",
      note: "The brick and concrete core stands to great height across most of the bath block, roofless and stripped of every surface. The plan is completely legible; nothing of the finish is in place.",
    },
    archaeology: [
      "Excavation of the substructures has recovered the service system in detail: the furnace rooms, the fuel handling, the cart tunnels and the drainage. The underground level is the best evidence anywhere for how a great Roman bath was actually run.",
      "A Mithraeum, among the largest known in Rome, was found in the substructures — a cult room for the staff or for a group using the complex, in a part of the building the public never saw.",
      "Mosaic floors, including the colossal athlete panels, were recovered in the nineteenth century and taken to the Vatican.",
    ],
    fragments: [
      {
        what: "The Farnese Hercules and the Farnese Bull, found in the 1540s excavations",
        level: "documented",
        museumSlug: "naples-national-archaeological-museum",
      },
      {
        what: "The athlete mosaics from the palaestrae",
        level: "documented",
        museumSlug: "vatican-museums",
      },
      {
        what: "A granite column from the frigidarium, re-erected in Florence in 1563",
        level: "documented",
        heldAt: "Piazza della Trinità, Florence",
      },
    ],
    primarySources: [
      S(
        "Historia Augusta",
        "Caracalla 9.4–9",
        "The attribution of the baths to Caracalla and a note on the vaulting of the cella solearis, which the author says nobody could reproduce. A late and unreliable compilation, and the principal ancient notice.",
      ),
      S(
        "Roman History",
        "78.9",
        "Cassius Dio, writing under Caracalla, on the emperor's building and spending. Contemporary, hostile, and thin on the baths themselves.",
        "Cassius Dio",
      ),
    ],
    disputes: [
      {
        question: "How was the caldarium roofed?",
        positions:
          "The dome is gone and its construction is reconstructed from the surviving piers, from comparison with the Pantheon, and from the Historia Augusta's remark about bronze or copper gratings supporting the cella solearis, a phrase nobody has satisfactorily explained. Proposed reconstructions differ in thickness, in the presence of ribs, and in how the glazing worked.",
        level: "disputed",
      },
      {
        question: "How much fuel did it burn?",
        positions:
          "Estimates run from a few thousand to around ten thousand tonnes of wood a year, derived from the heated volume, assumed operating hours and assumed furnace efficiency. Every input is modelled. The figures are useful for scale and should never be quoted as measurements.",
        level: "unknown",
      },
    ],
    museumSlugs: ["naples-national-archaeological-museum", "vatican-museums"],
    objectSlugs: [],
    institutionRefs: ["imperial-administration", "roman-citizenship"],
    religionRefs: ["mithraism"],
    battleRefs: [],
    warfareRefs: [],
    figureRefs: ["marcus-aurelius", "diocletian", "constantine"],
    themeRefs: ["monumentality", "imperial-administration", "civic-order"],
    bookRefs: [],
    relatedMonuments: ["colosseum", "pantheon", "trajans-column"],
    mapSlugs: ["roman-empire"],
    imageSlug: "baths-of-caracalla",
  },
  // ─── The Greek world ─────────────────────────────────────────────────
  {
    slug: "parthenon",
    title: "The Parthenon",
    kind: "temple",
    region: "aegean",
    standfirst:
      "A temple with almost no straight lines in it, paid for out of an alliance's treasury, blown apart in 1687 by a Venetian mortar shell finding an Ottoman powder store.",
    description:
      "The Parthenon — Iktinos and Kallikrates, the optical refinements, the Athena Parthenos and its removable gold, the 1687 explosion, and the sculptures divided between Athens and London.",
    civilizations: ["athens", "greece"],
    siteSlug: "acropolis-of-athens",
    citySlug: "athens",
    modernLocation: "The Acropolis, Athens",
    architectureRefs: ["temple", "architectural-orders", "columns-and-capitals", "construction-methods"],
    chronology: {
      built: { year: -432, precision: "exact", display: "447–432 BCE" },
      display: "Built 447–432 BCE; sculpture completed 432",
      status: "documented",
      phases: [
        {
          label: "The Older Parthenon",
          display: "c. 490–480 BCE",
          level: "documented",
          note: "An earlier temple begun on the same platform after Marathon and destroyed unfinished by the Persians in 480. Its column drums were built into the Acropolis north wall in plain view.",
        },
        {
          label: "The Periclean building",
          display: "447–438 BCE",
          level: "documented",
          note: "Dated precisely because the Athenians published the annual building accounts on stone and enough of them survive.",
        },
        {
          label: "The sculpture",
          display: "438–432 BCE",
          level: "documented",
          note: "The pediments were finished after the building was dedicated. The accounts distinguish the two.",
        },
        {
          label: "Church, then mosque",
          display: "6th century CE – 1687",
          level: "documented",
          note: "Converted to a church of the Virgin, then a Latin cathedral, then a mosque after 1458. Each conversion altered the interior and, in the Christian phase, destroyed the centre of the east pediment to make an apse.",
        },
        {
          label: "The explosion",
          display: "26 September 1687",
          level: "documented",
          note: "The Ottoman garrison used the building as a powder magazine during the Venetian siege. A mortar shell reached it and blew out the centre of the building.",
        },
      ],
    },
    attributions: [
      {
        name: "Iktinos",
        role: "architect",
        level: "probable",
        basis:
          "Named by Plutarch, Life of Pericles 13, and by Vitruvius 7.pref.12, who says he wrote a book about the temple with Karpion. Both are centuries later. No building account names an architect.",
        figureSlug: "iktinos",
      },
      {
        name: "Kallikrates",
        role: "architect",
        level: "probable",
        basis: "Named alongside Iktinos by Plutarch. Otherwise attested in inscriptions for other Athenian projects.",
      },
      {
        name: "Pheidias",
        role: "sculptor",
        level: "probable",
        basis:
          "Plutarch, Life of Pericles 13, makes him overseer of the whole programme and the maker of the cult statue. His responsibility for the architectural sculpture is an inference from that.",
      },
      {
        name: "The Athenian demos",
        role: "patron",
        level: "documented",
        basis:
          "The building accounts, published annually on stone, record the assembly's appointment of commissioners and the sources of the money.",
      },
    ],
    originalFunction: [
      "A temple of Athena Parthenos, and a treasury. The rear chamber — the room actually called the parthenon in the accounts, before the name spread to the whole building — held the reserves of the goddess, and the inventories of what was in it were published on stone year by year.",
      "It had no altar in front of it and did not replace the older temple of Athena Polias as the focus of the city's principal cult, which stayed with the ancient olive-wood statue housed in the Erechtheion. The Parthenon is a votive building on a colossal scale rather than the working centre of Athenian religion.",
    ],
    materials: [
      { material: "Pentelic marble", use: "The entire building, including the roof tiles, quarried sixteen kilometres away on Mount Pentelikon", level: "documented" },
      { material: "Gold and ivory", use: "The cult statue: ivory for flesh, gold for the drapery, over a wooden core", level: "documented" },
      { material: "Iron and lead", use: "Clamps and dowels joining the blocks, set in lead — the corrosion of replacements for these is what the modern restoration exists to reverse", level: "documented" },
      { material: "Paint", use: "The sculpture and architectural mouldings were painted; traces survive and have been detected by non-contact imaging", level: "documented" },
    ],
    measurements: [
      {
        label: "Stylobate",
        value: "about 69.5 × 30.9 m",
        basis: "Modern survey of the platform.",
        level: "documented",
      },
      {
        label: "Column height",
        value: "about 10.4 m, with 8 columns on the front and 17 on the flanks",
        basis: "Modern survey.",
        level: "documented",
      },
      {
        label: "Curvature of the stylobate",
        value: "rising about 11 cm at the centre of the long sides",
        basis: "Modern survey. The platform is not flat and the correction is deliberate.",
        level: "documented",
      },
      {
        label: "Gold on the cult statue",
        value: "forty talents, perhaps about a tonne",
        basis:
          "Thucydides 2.13, reporting Pericles' account of Athenian reserves, gives forty talents of removable gold. The conversion to modern weight depends on which talent standard is used and is approximate.",
        level: "documented",
      },
      {
        label: "Ionic frieze",
        value: "about 160 m long",
        basis: "Modern measurement of the surviving blocks and the reconstructed sequence.",
        level: "documented",
      },
    ],
    construction: [
      "The building is famous for having almost no straight lines. The stylobate curves upward at the centre, the columns lean inward and swell slightly in the middle, the corner columns are thicker and more closely spaced, and the entablature follows the curve. Every one of these is measurable and none is accidental.",
      "Why they were done is a separate question. The traditional explanation, that they correct optical distortion, comes from Vitruvius; the alternative, that they animate the building and make it look alive rather than correct, is a modern reading. Both are interpretations of a fact that is beyond dispute.",
      "Structurally it is ordinary Greek post-and-lintel work in marble, executed to a tolerance that is not ordinary at all. Blocks were finished in place after setting, joints are close enough to be invisible at arm's length, and the drums were joined by central wooden dowels that let each be ground against the next.",
      "Its Ionic frieze inside a Doric peristyle is an unusual mixing of the orders, and its unusually wide cella carries a two-storey internal colonnade to hold the roof over the statue.",
    ],
    politicalMeaning: [
      "The programme was funded in substantial part from the tribute of the Delian League, moved to Athens from Delos in 454, and the decision was contested in Athens at the time. Plutarch preserves the charge — that the city was gilding herself like a vain woman with her allies' money — and Pericles' answer, that Athens owed the allies protection and not an account.",
      "The gold on the statue was deliberately removable and was counted as part of the state's war reserve. A temple that doubles as a strategic asset says something about the relationship between Athenian religion and Athenian finance that no amount of writing about ideal beauty conveys.",
      "The building went up on the ruins of the temple the Persians burned, within a generation, using the same platform. That is a statement about survival and it was legible to anyone who had seen the rock in 479.",
    ],
    religiousMeaning: [
      "Athena Parthenos, the virgin Athena, in a temple with no altar, alongside a working cult that continued elsewhere on the rock. The Parthenon is where the polis expressed itself to the goddess at maximum expense; it is not where the daily business of her cult happened.",
      "The frieze is the single greatest interpretative problem in Greek art. The traditional identification with the Panathenaic procession runs into the difficulty that no Greek temple otherwise shows contemporary Athenians on a sacred building.",
    ],
    laterHistory: [
      "Church, cathedral and mosque in turn. The Christian conversion cut an apse through the east end and destroyed the centre of that pediment; the Ottoman phase added a minaret inside the ruined cella after 1687.",
      "The explosion of 1687 blew out the long walls and much of the colonnades and threw sculpture to the ground. Morosini then tried to lower the horses of Athena from the west pediment as a trophy, dropped them, and destroyed them.",
      "Between 1801 and 1812 agents of Lord Elgin removed roughly half of the surviving frieze, fifteen metopes and pedimental figures. They were sold to the British Museum in 1816. Greece has sought their return since the 1980s.",
    ],
    survival: {
      condition: "standing-ruin",
      level: "documented",
      note: "The colonnades stand around a roofless shell. The centre of the building is missing. All sculpture on the building is cast; the originals are in the Acropolis Museum and the British Museum.",
    },
    restoration: [
      "Nikolaos Balanos re-erected columns between 1898 and the 1930s using iron clamps set without insulation. The iron rusted, expanded and split the marble from inside, and blocks were reassembled in wrong sequence.",
      "The Acropolis Restoration Service has been undoing that work since 1975: dismantling, removing the iron, replacing it with titanium, returning blocks to their correct positions where these can be established, and documenting everything so the process is reversible. It is one of the very few large heritage projects that treats its own methods as provisional.",
    ],
    archaeology: [
      "The building accounts, published annually on stone and surviving in fragments, fix the construction dates and record the money's sources. Almost no other ancient building can be dated this way.",
      "Study during the modern restoration has recovered the working methods in detail — tool marks, setting lines, the sequence of finishing — and has established that many blocks Balanos reassembled were in the wrong place.",
    ],
    fragments: [
      {
        what: "Frieze, metopes and pedimental sculpture remaining in Athens",
        level: "documented",
        museumSlug: "acropolis-museum",
      },
      {
        what: "Roughly half the surviving frieze, fifteen metopes and pedimental figures removed 1801–1812",
        level: "documented",
        museumSlug: "british-museum",
      },
      {
        what: "Scattered blocks in the Louvre, Copenhagen, Vienna, Munich and Würzburg",
        level: "documented",
        museumSlug: "louvre",
      },
    ],
    primarySources: [
      S(
        "Life of Pericles",
        "12–13",
        "Plutarch on the building programme: the political attack on the use of allied money, Pericles' reply, the speed of the work, and the names of Iktinos, Kallikrates and Pheidias. Five centuries after the event, from earlier sources.",
        "Plutarch",
      ),
      S(
        "History of the Peloponnesian War",
        "2.13",
        "Thucydides has Pericles list Athenian reserves, including the forty talents of removable gold on the statue of Athena. The temple as a war chest, stated by a contemporary.",
        "Thucydides",
      ),
      S(
        "Description of Greece",
        "1.24",
        "Pausanias walks into the building in the second century CE and describes the pediments and the statue. The only surviving ancient description of what the sculpture showed.",
        "Pausanias",
      ),
    ],
    disputes: [
      {
        question: "What does the frieze represent?",
        positions:
          "The traditional identification is the Panathenaic procession. Alternatives include the sacrifice of the daughters of Erechtheus, the heroised dead of Marathon, and an idealised citizen body outside any single occasion. No ancient text describes the frieze, and Pausanias, who describes the pediments, does not mention it.",
        level: "disputed",
      },
      {
        question: "Where should the sculptures be?",
        positions:
          "Greece argues that the removal took place under an occupying power without valid title and that a single programme should be reunited within sight of the building. The British Museum has argued that the acquisition was lawful by the standards of the time, that its trustees are constrained by statute, and that the collection provides comparative context. The original Ottoman authorisation has never been produced; what survives is an Italian translation of contested standing.",
        level: "disputed",
      },
    ],
    museumSlugs: ["acropolis-museum", "british-museum", "louvre"],
    objectSlugs: [],
    institutionRefs: ["ecclesia", "strategos", "boule", "archon"],
    religionRefs: ["sanctuary-treasuries", "greek-priesthood", "the-sacred-calendar", "votive-dedication"],
    battleRefs: ["marathon", "salamis", "plataea"],
    warfareRefs: [],
    figureRefs: ["pericles", "iktinos", "plutarch", "thucydides"],
    themeRefs: ["monumentality", "naval-empire", "democracy", "civic-virtue"],
    bookRefs: ["life-of-pericles", "history-of-the-peloponnesian-war"],
    relatedMonuments: ["erechtheion", "temple-of-hephaestus", "temple-of-zeus-olympia"],
    mapSlugs: ["athens"],
    imageSlug: "parthenon-east",
  },
  {
    slug: "erechtheion",
    title: "The Erechtheion",
    kind: "temple",
    region: "aegean",
    standfirst:
      "A temple built on three levels around an olive tree, a salt spring and a king's tomb, because the cults it had to contain would not fit a rectangle — and finished during a war Athens was losing.",
    description:
      "The Erechtheion — the cults it housed, the caryatid porch and the one in London, the inspection inscription of 409/8 BCE, and why the plan is irregular.",
    civilizations: ["athens", "greece"],
    siteSlug: "acropolis-of-athens",
    citySlug: "athens",
    modernLocation: "The Acropolis, Athens",
    architectureRefs: ["temple", "architectural-orders", "columns-and-capitals"],
    chronology: {
      built: { year: -406, precision: "approximate", display: "c. 421–406 BCE" },
      display: "Built c. 421–406 BCE, with work interrupted by the war",
      status: "documented",
      phases: [
        {
          label: "The old temple of Athena Polias",
          display: "6th century BCE",
          level: "documented",
          note: "The archaic temple whose foundations lie between the Erechtheion and the Parthenon, burned by the Persians in 480 and never fully rebuilt.",
        },
        {
          label: "Construction",
          display: "c. 421–415 BCE",
          level: "documented",
          note: "Begun during the Peace of Nikias and halted, probably when the Sicilian expedition consumed the city's resources.",
        },
        {
          label: "Completion",
          display: "409–406 BCE",
          level: "documented",
          note: "Resumed and finished. The inspection inscription of 409/8 lists every piece of unfinished work on the building, block by block, and is the single best document of Greek building practice.",
        },
      ],
    },
    attributions: [
      {
        name: "Philokles",
        role: "architect",
        level: "documented",
        basis:
          "Named as architect in the inspection inscription of 409/8 BCE, a contemporary Athenian public document — a level of evidence almost no other Greek building has.",
      },
      {
        name: "Mnesikles",
        role: "architect",
        level: "disputed",
        basis:
          "Sometimes proposed on stylistic grounds and on his known work on the Propylaia. No ancient source attaches him to this building.",
      },
    ],
    originalFunction: [
      "A single building holding several cults that could not be moved: the ancient olive-wood statue of Athena Polias, which was the city's real cult image; the olive tree Athena was said to have produced in the contest with Poseidon; the salt spring and the trident marks of Poseidon; the tomb of Kekrops; and altars of Hephaistos and Boutes.",
      "The Panathenaic robe was presented to the olive-wood statue here, not in the Parthenon. Athens's principal religious act happened in this building.",
      "The priestess of Athena Polias, one of the most important public offices held by a woman in the Greek world, served here, and it was a hereditary position in a single family.",
    ],
    materials: [
      { material: "Pentelic marble", use: "The building throughout", level: "documented" },
      { material: "Eleusinian grey limestone", use: "The frieze background, against which white marble figures were attached separately — a technique used almost nowhere else", level: "documented" },
    ],
    measurements: [
      {
        label: "Main block",
        value: "about 22.8 × 11.6 m",
        basis: "Modern survey.",
        level: "documented",
      },
      {
        label: "Level difference across the building",
        value: "about 3 m between the east and the north-west",
        basis: "Modern survey. The site's rock falls away, and the plan follows it rather than levelling it.",
        level: "documented",
      },
      {
        label: "Caryatids",
        value: "six, about 2.3 m tall",
        basis: "Modern measurement of the figures.",
        level: "documented",
      },
    ],
    construction: [
      "The plan is irregular because the cults are fixed in place. There is an east porch at one level, a large north porch at a level about three metres lower, and the small south porch of the caryatids between them; the interior is divided into rooms serving different deities, and the whole thing works as several buildings sharing walls.",
      "The carving is among the finest surviving Ionic work anywhere: the north door frame, the capitals with their double volutes and inlaid palmettes, and the wall crown moulding are the reference examples of the order, and were copied directly in the Roman period and again in the eighteenth century.",
      "The caryatid porch stands over the supposed tomb of Kekrops. Its six figures carry the entablature on their heads, with the weight taken through the straight supporting leg — an engineering solution disguised as drapery.",
    ],
    politicalMeaning: [
      "The building's construction record is a document about a city under strain. Work stops, resumes and is inspected in detail while Athens is losing a war, and the inscription of 409/8 was published precisely because public money needed accounting for at a moment when there was very little of it.",
      "That the ancient olive-wood statue mattered more than the gold and ivory Athena next door is worth stating plainly. Athenian religion was conservative about objects: the older, cruder, more obviously ancient image held the cult, and the masterpiece was a dedication.",
    ],
    religiousMeaning: [
      "The contest of Athena and Poseidon for Attica is the founding story of the city, and the building encloses its physical evidence: a tree, a spring, and marks in the rock. Pausanias reports that the sea water in the well made a sound of waves when the south wind blew, and that the olive burned by the Persians grew back a cubit in a day.",
      "Those are cult claims reported by a visitor, and the platform records them as such. The tree, the well and the marks were shown; what they were taken to prove is a different order of statement.",
    ],
    laterHistory: [
      "Converted to a church, and under the Ottomans used as the residence of the garrison commander's family. Damaged in the Venetian bombardment of 1687 and again in the Greek war of independence.",
      "One caryatid was removed by Lord Elgin's agents around 1801 and is in the British Museum; a brick pier was put in its place until a cast was substituted.",
      "The remaining five were taken indoors in 1979 because of atmospheric pollution and replaced on the building by casts. They are now displayed together in the Acropolis Museum with a gap where the sixth would stand.",
    ],
    survival: {
      condition: "standing-ruin",
      level: "documented",
      note: "Standing to roof level with its porches, extensively restored. All six caryatids on the building are casts.",
    },
    restoration: [
      "Rebuilt in part by Balanos in 1902–1909, with the usual iron, and comprehensively dismantled and reassembled by the Acropolis Restoration Service between 1979 and 1987 — the first of the modern Acropolis interventions, and the one that established the method used since.",
    ],
    archaeology: [
      "The inspection inscription of 409/8 BCE records the state of every unfinished element: which blocks were fluted, which were still rough, which needed lifting, and what remained to be paid. It is a snapshot of a Greek building site.",
      "Excavation established the relationship to the burned archaic temple beside it and the position of the older cult installations the building was designed around.",
    ],
    fragments: [
      {
        what: "The fifth caryatid, removed c. 1801",
        level: "documented",
        museumSlug: "british-museum",
      },
      {
        what: "The five caryatids remaining in Athens, withdrawn from the building in 1979",
        level: "documented",
        museumSlug: "acropolis-museum",
      },
      {
        what: "A column from the north porch, removed with the caryatid",
        level: "documented",
        museumSlug: "british-museum",
      },
    ],
    primarySources: [
      S(
        "Description of Greece",
        "1.26–27",
        "Pausanias on the building: the olive, the salt well that sounds like the sea in a south wind, the trident marks, the old wooden statue said to have fallen from heaven, and the ritual of the Arrephoroi.",
        "Pausanias",
      ),
      S(
        "The inspection inscription",
        "IG I³ 474",
        "The Athenian commissioners' record of 409/8 BCE listing the unfinished work on the building block by block, and naming the architect Philokles. Contemporary, public and technical.",
      ),
      S(
        "Histories",
        "8.55",
        "Herodotus on the olive of Athena burned by the Persians and found to have put out a new shoot the following day. Reported as what the Athenians said.",
        "Herodotus",
      ),
    ],
    disputes: [
      {
        question: "What did the interior arrangement look like?",
        positions:
          "The building's internal divisions are known only from the wall foundations, and reconstructions differ on the number of rooms, on where the olive-wood statue stood, and on how the levels connected. The cults are documented; the floor plan that held them is argued.",
        level: "disputed",
      },
      {
        question: "Why caryatids?",
        positions:
          "Vitruvius explains figure-supports as a punishment motif, representing the enslaved women of Caryae. The story is late and almost certainly invented to explain a form already in use; korai as architectural supports appear at Delphi a century earlier. What the six figures represented to Athenians is not recorded.",
        level: "unknown",
      },
    ],
    museumSlugs: ["acropolis-museum", "british-museum"],
    objectSlugs: [],
    institutionRefs: ["ecclesia", "archon", "boule"],
    religionRefs: ["greek-priesthood", "womens-religious-office", "the-sacred-calendar", "votive-dedication", "hero-cult"],
    battleRefs: ["salamis"],
    warfareRefs: [],
    figureRefs: ["pericles", "herodotus", "thucydides"],
    themeRefs: ["state-and-religion", "civic-order", "founding-myths"],
    bookRefs: ["herodotus-histories"],
    relatedMonuments: ["parthenon", "temple-of-hephaestus"],
    mapSlugs: ["athens"],
    imageSlug: "erechtheum-acropolis",
  },
  {
    slug: "temple-of-hephaestus",
    title: "The Temple of Hephaestus",
    alternateNames: ["The Hephaisteion", "The Theseion"],
    kind: "temple",
    region: "aegean",
    standfirst:
      "The most complete Greek temple standing anywhere, roof included — because it was a church for twelve hundred years, and then Greece's first national museum.",
    description:
      "The Temple of Hephaestus — the metalworking quarter it served, the garden excavated around it, the medieval misnaming as the Theseion, and why its roof is still on.",
    civilizations: ["athens", "greece"],
    siteSlug: "athenian-agora",
    citySlug: "athens",
    modernLocation: "The Agora, Athens",
    architectureRefs: ["temple", "agora", "architectural-orders", "columns-and-capitals"],
    chronology: {
      built: { year: -415, precision: "approximate", display: "c. 449–415 BCE" },
      display: "Begun c. 449 BCE, cult statues installed c. 421–415",
      status: "probable",
      phases: [
        {
          label: "Construction",
          display: "c. 449–440 BCE",
          level: "probable",
          note: "Begun around the middle of the century, on the low hill west of the square. Dated by style and by the sequence of related buildings; there are no surviving building accounts as there are for the Parthenon.",
        },
        {
          label: "The cult statues",
          display: "c. 421–415 BCE",
          level: "documented",
          note: "Bronze statues of Hephaestus and Athena by Alkamenes, recorded in the building accounts of that period — an installation a generation after the building went up.",
        },
        {
          label: "The garden",
          display: "3rd century BCE",
          level: "documented",
          note: "A formal planting laid out around three sides of the temple, in rows of pits cut into the rock with pots sunk in them. Excavation recovered the pits and the pots.",
        },
        {
          label: "Church of St George",
          display: "c. 7th century – 1834",
          level: "documented",
          note: "Converted, with an apse cut into the east end and a barrel vault built inside. This is why the roof, the walls and the colonnades all survive.",
        },
      ],
    },
    attributions: [
      {
        name: "Unknown",
        role: "architect",
        level: "unknown",
        basis:
          "No ancient source names one. Modern scholarship groups this temple with those at Sounion, Rhamnous and Oropos as the work of one designer, referred to as the Theseum Architect — a modern label for an anonymous hand, not a name.",
      },
      {
        name: "Alkamenes",
        role: "sculptor",
        level: "documented",
        basis:
          "The building accounts for the cult statues name him, and Pausanias 1.14.6 describes the group of Hephaestus and Athena in the temple.",
      },
    ],
    originalFunction: [
      "A temple of Hephaestus and Athena Ergane — the god of the forge and the goddess of craft — standing directly above the quarter where Athens's metalworkers and potters worked. Excavation of the surrounding blocks has produced bronze-casting debris and workshop material, so the placement is not symbolic.",
      "That a democracy built a major marble temple to the patrons of manual craft, overlooking the workshops, is a fact worth more than most general statements about Athenian attitudes to labour.",
    ],
    materials: [
      { material: "Pentelic marble", use: "The superstructure", level: "documented" },
      { material: "Parian marble", use: "The sculpture", level: "documented" },
      { material: "Limestone", use: "The foundations and the lowest step", level: "documented" },
    ],
    measurements: [
      {
        label: "Stylobate",
        value: "about 31.8 × 13.7 m",
        basis: "Modern survey.",
        level: "documented",
      },
      {
        label: "Columns",
        value: "6 by 13, about 5.7 m tall",
        basis: "Modern survey.",
        level: "documented",
      },
    ],
    construction: [
      "A standard Doric peripteral temple, smaller than the Parthenon and less refined, with the same optical corrections applied more sparingly. Its interest is not innovation but completeness: every element of the type is present and in place, which makes it the reference building for what a Greek temple actually was.",
      "The sculpture is concentrated at the east end, where it would be seen from the square: ten metopes of the labours of Herakles on the front and four on each flank showing deeds of Theseus, with the rest left plain. That is a budget decision made visible.",
      "The interior carries a Doric colonnade returning behind the cult statues, and an Ionic frieze across the porches — the same mixing of orders the Parthenon uses.",
    ],
    politicalMeaning: [
      "The Theseus metopes are why the building was called the Theseion for a thousand years, on the mistaken belief that it was the hero's shrine. The real Theseion was elsewhere in the city and has never been found.",
      "The temple stands on the edge of the square where the democracy operated, above the workshops, facing the buildings of the council and the courts. The Acropolis programme is about Athens addressing the gods; this building is about the city's working life addressing them.",
    ],
    religiousMeaning: [
      "Hephaestus and Athena Ergane together are the craft pairing, and the Chalkeia festival honoured them jointly. The bronze cult group by Alkamenes showed both standing.",
    ],
    laterHistory: [
      "Converted into the church of St George Akamates, probably in the seventh century. The east wall was pierced for an apse and a masonry vault was built inside; otherwise the ancient fabric was left alone.",
      "Used as a burial place for Protestants and foreigners in Athens from the seventeenth century, including a number of travellers and diplomats.",
      "From 1834 to 1874 it served as the first national archaeological museum of the new Greek state, which is a second reason it was maintained rather than quarried. The interior vault was removed in the twentieth century.",
    ],
    survival: {
      condition: "standing",
      level: "documented",
      note: "The most completely preserved Greek temple in existence: colonnades, walls, entablature, pediments and roof all in place. The pedimental sculpture is gone and the interior was altered by the church.",
    },
    archaeology: [
      "The American excavation of the Agora recovered the third-century BCE garden: rows of rock-cut pits along the north, south and west sides, with flowerpots still in several of them, arranged around the temple in a formal planting.",
      "Bronze-working debris and workshop material from the surrounding blocks confirms that the metalworking quarter was where the dedication implies it should be.",
    ],
    fragments: [],
    primarySources: [
      S(
        "Description of Greece",
        "1.14.6",
        "Pausanias on the temple above the Kerameikos, the standing statues of Hephaestus and Athena with grey eyes, and the local story attached to them.",
        "Pausanias",
      ),
      S(
        "The building accounts for the cult statues",
        "IG I³ 472",
        "Athenian public accounts for the bronze group, naming the sculptor and dating the installation to a generation after the temple was built.",
      ),
    ],
    disputes: [
      {
        question: "When exactly was it built?",
        positions:
          "Dates from about 460 to about 440 BCE have been argued, on the evidence of style, of the pottery in the foundation fill, and of the temple's relationship to the Parthenon. There are no building accounts for the architecture itself, and the twenty-year range is a real uncertainty about the best-preserved Greek temple there is.",
        level: "disputed",
      },
    ],
    museumSlugs: [],
    objectSlugs: [],
    institutionRefs: ["ecclesia", "boule", "archon"],
    religionRefs: ["greek-priesthood", "the-sacred-calendar", "votive-dedication"],
    battleRefs: [],
    warfareRefs: [],
    figureRefs: ["pericles", "socrates"],
    themeRefs: ["democracy", "civic-order", "civic-virtue"],
    bookRefs: [],
    relatedMonuments: ["parthenon", "erechtheion", "theatre-of-dionysus"],
    mapSlugs: ["athens"],
    imageSlug: "hephaestus-agora",
  },
  {
    slug: "theatre-of-dionysus",
    title: "The Theatre of Dionysus",
    kind: "spectacle",
    region: "aegean",
    standfirst:
      "Where Greek tragedy was first performed — and where almost nothing a modern visitor sees is old enough to have watched it happen.",
    description:
      "The Theatre of Dionysus — the wooden fifth-century theatre under the stone Lycurgan one, the sanctuary of Dionysus Eleuthereus, the priests' thrones, and the argument about the shape of the orchestra.",
    civilizations: ["athens", "greece"],
    citySlug: "athens",
    modernLocation: "The south slope of the Acropolis, Athens",
    architectureRefs: ["theatre", "temple"],
    chronology: {
      built: { year: -326, precision: "approximate", display: "the stone theatre c. 342–326 BCE" },
      display: "Performances from the 6th century BCE; the stone auditorium built c. 342–326 BCE",
      status: "documented",
      phases: [
        {
          label: "The early theatre",
          display: "6th–5th centuries BCE",
          level: "probable",
          note: "An orchestra in the sanctuary with wooden seating on the slope. This is the theatre of Aeschylus, Sophocles, Euripides and Aristophanes, and almost nothing of it survives.",
        },
        {
          label: "The Lycurgan rebuilding",
          display: "c. 342–326 BCE",
          level: "documented",
          note: "The stone auditorium and stage building, associated with the financial administration of Lycurgus. The visible seating belongs to this phase, sixty years after the last of the great tragedians died.",
        },
        {
          label: "Hellenistic and Roman remodelling",
          display: "2nd century BCE – 4th century CE",
          level: "documented",
          note: "The stage building rebuilt repeatedly; under Rome the orchestra was given a marble balustrade and paving, and a relief-decorated platform, the bema of Phaedrus, was inserted using recut Hellenistic panels.",
        },
      ],
    },
    attributions: [
      {
        name: "Lycurgus of Athens",
        role: "patron",
        level: "probable",
        basis:
          "The Lives of the Ten Orators credits Lycurgus with completing the theatre during his control of Athenian finances in the 330s. The association is ancient and the precise extent of his role is not documented.",
      },
    ],
    originalFunction: [
      "The theatre of the City Dionysia, the festival at which tragedies and comedies were produced in competition, within the sanctuary of Dionysus Eleuthereus whose temples stand below the auditorium.",
      "It was also an assembly place. The Athenian assembly met here on occasion, and the theatre was used for civic ceremonies before the plays: the display of allied tribute, the announcement of honours, and the parade of the war orphans raised at public expense. Those ceremonies are part of what a tragedy was performed after.",
    ],
    materials: [
      { material: "Piraeus limestone", use: "The Lycurgan seating and retaining walls", level: "documented" },
      { material: "Pentelic marble", use: "The front row of thrones and the Roman-period orchestra pavement and balustrade", level: "documented" },
    ],
    measurements: [
      {
        label: "Capacity",
        value: "commonly estimated at 14,000–17,000",
        basis:
          "Modern estimates from the surviving seating and the extent of the auditorium. Plato's Symposium mentions Agathon's audience as more than thirty thousand, which is rhetorical. No ancient count exists.",
        level: "disputed",
      },
      {
        label: "Orchestra",
        value: "about 20 m across in the Roman phase",
        basis: "Modern survey of the surviving paving and balustrade.",
        level: "documented",
      },
    ],
    construction: [
      "The auditorium is cut into the natural slope of the Acropolis rock and extended on built retaining walls, in the standard Greek arrangement that makes a theatre a piece of landscape engineering.",
      "The front row carries sixty-seven marble thrones with inscribed names of the priesthoods and offices entitled to them, the central and grandest being that of the priest of Dionysus Eleuthereus. They are Hellenistic and Roman, and they are the clearest surviving evidence of how a Greek civic audience was ranked.",
      "The Roman bema of Phaedrus at the front of the stage is built from reused Hellenistic relief panels showing the life of Dionysus, cut down to fit — spoliation of the same kind as the Arch of Constantine, three centuries earlier and on a smaller scale.",
    ],
    politicalMeaning: [
      "Tragedy was produced at a state festival, funded by wealthy citizens under a public obligation, judged by a panel selected by lot from the tribes, and performed in front of the assembled citizen body after a display of the empire's tribute. The institutional frame is not background to the plays; it is the occasion they were written for.",
      "The theatre's use for assemblies and for honours shows how thin the line between civic and dramatic space was. The same benches held the same men in both capacities.",
    ],
    religiousMeaning: [
      "The theatre sits inside a sanctuary. The temple of Dionysus Eleuthereus stands below it, the god's image was brought into the theatre for the festival, and the performances were an act of cult.",
      "That does not make the plays religious texts, and the platform does not treat them as such. It means the occasion was a festival of a god, and the plays were offered at it.",
    ],
    laterHistory: [
      "Remodelled under Rome for spectacles the Greek building was not designed for, including a waterproofed orchestra. Abandoned in late antiquity and built over.",
      "Excavated from 1862 by the German Archaeological Institute and then by Wilhelm Dörpfeld, whose reconstruction of the early theatre has shaped the argument ever since.",
    ],
    survival: {
      condition: "standing-ruin",
      level: "documented",
      note: "The lower seating with its thrones, the orchestra with its Roman paving, and the foundations of the stage buildings and of the temples below. The upper auditorium is largely gone.",
    },
    archaeology: [
      "Excavation found remains of an earlier orchestra and of curved and straight retaining walls beneath the Lycurgan theatre. Dörpfeld read them as a circular orchestra of the fifth century; later work identified rectilinear elements that do not fit that reconstruction.",
      "The consequence is direct: the shape of the space Aeschylus and Sophocles wrote for is not established, and every reconstruction of fifth-century staging rests on a contested plan.",
    ],
    fragments: [
      {
        what: "The relief panels reused in the bema of Phaedrus",
        level: "documented",
        heldAt: "In position",
      },
    ],
    primarySources: [
      S(
        "Poetics",
        "1449a–1453a",
        "Aristotle on the development of tragedy, the number of actors, the chorus and the structure of a play — written in Athens within a generation of the stone theatre being built.",
        "Aristotle",
      ),
      S(
        "Description of Greece",
        "1.20–21",
        "Pausanias on the sanctuary and the theatre, and on the statues of the tragedians set up there.",
        "Pausanias",
      ),
      S(
        "Lives of the Ten Orators",
        "841d, 852c",
        "The completion of the theatre attributed to Lycurgus, together with his decree that official copies of the tragedies be kept and that actors not depart from them.",
      ),
    ],
    disputes: [
      {
        question: "Was the fifth-century orchestra circular?",
        positions:
          "Dörpfeld's circular orchestra became the standard reconstruction and underlies most modern staging of Greek tragedy. Later excavation identified straight foundations that suggest a rectilinear or trapezoidal space, and the circular form may be an invention of the fourth-century rebuilding. The plays were written for a space whose shape is genuinely uncertain.",
        level: "disputed",
      },
      {
        question: "How many people did it hold?",
        positions:
          "Estimates range from around fourteen thousand to seventeen thousand and depend on how much of the lost upper auditorium is restored and on assumed seat width. Ancient figures are rhetorical. The number matters because arguments about whether the theatre audience was the citizen body turn on it.",
        level: "disputed",
      },
    ],
    museumSlugs: [],
    objectSlugs: [],
    institutionRefs: ["ecclesia", "archon", "boule", "dikasteria"],
    religionRefs: ["the-sacred-calendar", "greek-priesthood", "animal-sacrifice", "mystery-initiation"],
    battleRefs: [],
    warfareRefs: [],
    figureRefs: ["aristotle", "plato", "socrates", "demosthenes", "pericles"],
    themeRefs: ["democracy", "civic-order", "civic-virtue", "state-and-religion"],
    bookRefs: ["poetics"],
    relatedMonuments: ["parthenon", "temple-of-hephaestus", "erechtheion"],
    mapSlugs: ["athens"],
    imageSlug: "dionysus-theatre",
  },
  {
    slug: "temple-of-apollo-delphi",
    title: "The Temple of Apollo at Delphi",
    kind: "temple",
    region: "aegean",
    standfirst:
      "The building the oracle worked in, rebuilt three times, once by an exiled Athenian family who paid for a marble front they had only contracted to build in limestone — and bought a city with it.",
    description:
      "The Temple of Apollo at Delphi — the Alcmaeonid rebuilding, the earthquake of 373 and the Panhellenic subscription that paid for the replacement, the adyton, and the question of the vapours.",
    civilizations: ["greece", "athens"],
    citySlug: "delphi",
    modernLocation: "The sanctuary of Apollo, Delphi",
    architectureRefs: ["temple", "architectural-orders", "columns-and-capitals"],
    chronology: {
      built: { year: -329, precision: "range-endpoint", display: "the standing temple c. 366–329 BCE" },
      display: "Successive temples from the 7th century BCE; the standing remains c. 366–329 BCE",
      status: "documented",
      phases: [
        {
          label: "The early temples",
          display: "7th century BCE",
          level: "literary",
          note: "Ancient tradition listed a series of earlier temples of laurel, of wax and feathers, of bronze and finally of stone, attributed to Trophonios and Agamedes. The list is myth-history; a seventh-century stone temple is archaeologically probable.",
        },
        {
          label: "The Alcmaeonid temple",
          display: "c. 548–510 BCE",
          level: "documented",
          note: "Built after a fire, with the contract taken by the exiled Athenian Alcmaeonid family. Herodotus records that they built the east front in Parian marble though the contract specified poros stone.",
        },
        {
          label: "Earthquake and rebuilding",
          display: "373–c. 329 BCE",
          level: "documented",
          note: "Destroyed by earthquake and rockfall in 373 and rebuilt over four decades on the same foundations, funded by subscription across the Greek world. The subscription lists survive on stone and name the donors and their contributions.",
        },
        {
          label: "Closure",
          display: "late 4th century CE",
          level: "documented",
          note: "The oracle ceased under the anti-pagan legislation. The building was quarried and the site was covered by the village of Kastri.",
        },
      ],
    },
    attributions: [
      {
        name: "The Alcmaeonids",
        role: "patron",
        level: "documented",
        basis:
          "Herodotus 5.62: the family, in exile from Athens, contracted to build the temple and completed the front in marble at their own expense beyond what was agreed.",
      },
      {
        name: "Spintharos of Corinth",
        role: "architect",
        level: "documented",
        basis:
          "Named in the fourth-century building accounts inscribed at the sanctuary, together with his successors Xenodoros and Agathon.",
      },
    ],
    originalFunction: [
      "A temple of Apollo and the working premises of the oracle. Consultation took place inside: the Pythia sat in the adyton, a sunken area at the west end, and the enquirer put a question after preliminary sacrifice, having established by the twitching of a sacrificial goat that the god was willing to answer that day.",
      "The temple was also a treasury and a repository of dedications, and the sanctuary around it functioned as a bank and a diplomatic clearing-house for the Greek world.",
      "Its walls and forecourt carried the maxims — know thyself, nothing in excess — which Greek writers report as inscribed there and attribute to the Seven Sages.",
    ],
    materials: [
      { material: "Poros limestone", use: "The body of the archaic temple, and the fourth-century rebuilding", level: "documented" },
      { material: "Parian marble", use: "The east front of the archaic temple, and its pedimental sculpture", level: "documented" },
    ],
    measurements: [
      {
        label: "Stylobate",
        value: "about 60 × 23 m",
        basis: "Modern survey of the fourth-century foundations, which reuse the archaic ones.",
        level: "documented",
      },
      {
        label: "Columns",
        value: "6 by 15",
        basis: "Modern survey of the surviving stylobate and column positions.",
        level: "documented",
      },
    ],
    construction: [
      "A Doric peripteral temple on a terrace held up by a polygonal retaining wall of the sixth century — the wall is itself one of the sanctuary's most important monuments, because its irregular masonry face was used for centuries to inscribe manumission records, and some eight hundred survive on it.",
      "The fourth-century rebuilding follows the archaic plan closely and reuses its foundations, so the two phases are difficult to separate in the surviving stonework.",
      "The adyton at the west end is not preserved in a state that allows its arrangement to be reconstructed, which is the central difficulty in describing what actually happened at a consultation.",
    ],
    politicalMeaning: [
      "The Alcmaeonid contract is one of the clearest ancient examples of religious patronage as political investment. Herodotus says the family's generosity with the marble front bought them the favour of the Pythia, and that the oracle then pressed the Spartans repeatedly to free Athens from the tyranny — which they did, and the Alcmaeonids came home. Herodotus reports this as an Athenian account and does not endorse it, and the platform reports it the same way.",
      "The fourth-century subscription lists are a different kind of political document: a record of which cities and individuals across the Greek world paid to rebuild a shared sanctuary, and how much, published on stone.",
      "Delphi's Amphictyonic council administered the sanctuary and was repeatedly used as an instrument by whoever could control it. Philip II of Macedon's entry into Greek politics ran through a Sacred War fought over this temple.",
    ],
    religiousMeaning: [
      "The oracle is the best-documented institution of Greek divination and the least well understood in its mechanics. What is attested: a monthly consultation day, preliminary sacrifice, a fee, an order of precedence that could be sold, a woman speaking, and responses recorded in verse or prose by others.",
      "What is not attested by any contemporary source is a chasm, a tripod over a fissure, or intoxicating vapours in the form the popular account gives. Those elements enter the record in later writers, principally Plutarch — himself a priest at Delphi — and Diodorus, and the excavators of the temple found no chasm.",
    ],
    laterHistory: [
      "Quarried after the sanctuary closed; the village of Kastri grew over the site and remained there until 1892, when it was moved to allow the French excavation. Moving a village to dig a site is a decision worth recording plainly.",
      "Six columns of the fourth-century temple were re-erected in the twentieth century.",
    ],
    survival: {
      condition: "standing-ruin",
      level: "documented",
      note: "The terrace, the foundations, the polygonal retaining wall with its inscriptions, and six re-erected columns. Nothing of the interior arrangement survives.",
    },
    archaeology: [
      "The French School's Grande Fouille from 1892 exposed the sanctuary. It recovered the building accounts, the subscription lists, the manumission inscriptions on the polygonal wall, and the archaic pedimental sculpture.",
      "No fissure or chasm was found under the temple. A geological study published in 2001 identified faults crossing beneath the site and reported traces of light hydrocarbons including ethylene in the spring water and travertine. The finding has been contested on the grounds of concentration and of the geology, and it has not settled the question.",
    ],
    fragments: [
      {
        what: "Archaic pedimental sculpture from the Alcmaeonid temple",
        level: "documented",
        museumSlug: "delphi-archaeological-museum",
      },
      {
        what: "The building accounts and subscription lists of the fourth-century rebuilding",
        level: "documented",
        museumSlug: "delphi-archaeological-museum",
      },
    ],
    primarySources: [
      S(
        "Histories",
        "5.62",
        "Herodotus on the Alcmaeonids' contract for the temple, the marble front they were not obliged to build, and the Athenian claim that the oracle then favoured them.",
        "Herodotus",
      ),
      S(
        "Description of Greece",
        "10.5–24",
        "Pausanias walks the sanctuary and the temple, listing the dedications and reporting the tradition of the successive temples.",
        "Pausanias",
      ),
      S(
        "Moralia",
        "On the Obsolescence of Oracles; On the E at Delphi",
        "Plutarch, who held a priesthood at Delphi, discusses the oracle's decline and the mechanism of inspiration. A source with unmatched access and a philosophical agenda, writing five centuries after the classical oracle's height.",
        "Plutarch",
      ),
    ],
    disputes: [
      {
        question: "Were there vapours?",
        positions:
          "No fifth-century source mentions them; Plutarch, five centuries later, discusses a pneuma and its weakening. The excavators found no chasm. A 2001 geological study proposed ethylene from faults beneath the temple; critics have argued the concentrations are far too low and the geology does not support the mechanism. The honest position is that the physical basis of the Pythia's state is unknown and may not have existed.",
        level: "disputed",
      },
      {
        question: "How were the responses produced?",
        positions:
          "Accounts range from incoherent utterance versified by priests to lucid speech recorded verbatim. The surviving responses are mostly literary, shaped by the outcomes they were later said to have predicted, and the lead tablets from Dodona show that real oracular practice was overwhelmingly a matter of short yes-or-no questions rather than riddling hexameters.",
        level: "disputed",
      },
    ],
    museumSlugs: ["delphi-archaeological-museum"],
    objectSlugs: [],
    institutionRefs: ["ecclesia", "boule"],
    religionRefs: ["divination-and-seers", "sanctuary-treasuries", "greek-priesthood", "purification-and-pollution", "asylum-and-supplication"],
    battleRefs: ["chaeronea"],
    warfareRefs: [],
    figureRefs: ["herodotus", "plutarch", "philip-ii", "socrates"],
    themeRefs: ["state-and-religion", "political-legitimacy", "historical-memory"],
    bookRefs: ["herodotus-histories", "moralia"],
    relatedMonuments: ["treasury-of-the-athenians", "temple-of-zeus-olympia", "parthenon"],
    mapSlugs: ["ancient-greece"],
    imageSlug: "delphi-apollo",
  },
  {
    slug: "temple-of-zeus-olympia",
    title: "The Temple of Zeus at Olympia",
    kind: "temple",
    region: "aegean",
    standfirst:
      "The temple built to hold one of the Seven Wonders, and now a field of column drums lying in the order an earthquake dropped them.",
    description:
      "The Temple of Zeus at Olympia — Libon of Elis, the pediments and metopes, Pheidias's workshop and the cup with his name on it, and the collapse that left the columns in sequence.",
    civilizations: ["greece"],
    citySlug: "olympia",
    modernLocation: "The sanctuary of Zeus, Olympia",
    architectureRefs: ["temple", "architectural-orders", "columns-and-capitals", "building-materials"],
    chronology: {
      built: { year: -456, precision: "approximate", display: "c. 470–456 BCE" },
      display: "Built c. 470–456 BCE; the cult statue added c. 430s",
      status: "documented",
      phases: [
        {
          label: "Construction",
          display: "c. 470–456 BCE",
          level: "documented",
          note: "Funded from the spoils of the Elean defeat of Pisa, and completed by 456, when a gilded shield was placed on the gable to commemorate a Spartan victory — the dedication is recorded and dates the finish.",
        },
        {
          label: "The statue of Zeus",
          display: "c. 430s BCE",
          level: "probable",
          note: "Pheidias's chryselephantine Zeus, made in a purpose-built workshop beside the temple and installed a generation after the building.",
        },
        {
          label: "Roman period",
          display: "1st century BCE – 4th century CE",
          level: "documented",
          note: "Repaired and re-roofed; the sanctuary continued to function and the games continued into the fourth century CE.",
        },
        {
          label: "Collapse",
          display: "6th century CE",
          level: "documented",
          note: "Brought down by earthquake. The columns fell along their length and their drums lie where they landed, still in order.",
        },
      ],
    },
    attributions: [
      {
        name: "Libon of Elis",
        role: "architect",
        level: "documented",
        basis: "Pausanias 5.10.3 names him as the architect of the temple.",
      },
      {
        name: "Pheidias",
        role: "sculptor",
        level: "documented",
        basis:
          "Pausanias 5.11 describes the statue in detail and names Pheidias. The workshop identified beside the temple produced tools, ivory and glass working debris, and a black-glaze cup inscribed with a statement of ownership naming him.",
      },
      {
        name: "The Eleans",
        role: "patron",
        level: "documented",
        basis: "Pausanias 5.10.2: built from the spoils taken when Elis defeated Pisa and its allies.",
      },
    ],
    originalFunction: [
      "The principal temple of the sanctuary of Zeus and the house of the cult statue. The games were held in the sanctuary and the temple was their religious centre; the great altar of Zeus, where the sacrifices took place, stood outside it and was built up over centuries from the ash of the offerings.",
      "It also held dedications, including the gold shield of the Spartan victory on its gable and the table on which the victors' crowns were laid.",
    ],
    materials: [
      { material: "Local shelly limestone", use: "The body of the temple, stuccoed to imitate marble", level: "documented" },
      { material: "Parian marble", use: "The pedimental sculpture, the metopes and the roof tiles", level: "documented" },
      { material: "Gold and ivory", use: "The cult statue, over a wooden armature", level: "documented" },
    ],
    measurements: [
      {
        label: "Stylobate",
        value: "about 64.1 × 27.7 m",
        basis: "Modern survey of the platform.",
        level: "documented",
      },
      {
        label: "Column height",
        value: "about 10.4 m, with 6 columns on the front and 13 on the flanks",
        basis: "Modern survey and the reconstruction from the fallen drums.",
        level: "documented",
      },
      {
        label: "The statue of Zeus",
        value: "described as filling the temple, seated and nearly touching the roof",
        basis:
          "Strabo 8.3.30 makes the point that the seated god would have taken the roof off had he stood up, and treats it as a criticism of the proportions. No measurement survives; modern figures of eleven or thirteen metres are reconstructions from the temple's interior height.",
        level: "literary",
      },
    ],
    construction: [
      "Built in coarse local limestone and rendered in fine stucco to imitate marble — a fact usually left out of accounts of Greek temples, and one that changes what the building looked like. Only the sculpture and the roof tiles were marble.",
      "The proportions are heavy and archaic beside the Parthenon a generation later, and the temple is often used to date the transition; it is the canonical example of mature Doric before the Periclean refinements.",
      "The pedimental compositions are among the most studied in Greek art. The east shows the moment before the chariot race of Pelops and Oinomaos, with the figures still and the outcome unstated; the west a centauromachy in violent motion with Apollo calm at the centre. The metopes over the porches show the twelve labours of Herakles, and it is here that the canonical set of twelve is first fixed.",
    ],
    politicalMeaning: [
      "The temple was paid for out of a war between neighbours over control of the sanctuary, which is a reminder that Panhellenic did not mean neutral. Elis and Pisa fought repeatedly over who administered the games.",
      "The shield on the gable commemorating a Spartan victory over Argos and its allies, placed on the temple of Zeus at the sanctuary all Greeks used, is a state advertising itself at everybody else's shrine. Dedications at Olympia and Delphi were a standing form of inter-city competition.",
    ],
    religiousMeaning: [
      "The great ash altar outside the temple, built up from the burnt thighbones of centuries of sacrifice, was the sanctuary's real centre. The temple housed the image; the altar was where the cult happened, which is the standard Greek arrangement and the one most often misdescribed.",
    ],
    laterHistory: [
      "The statue was reportedly taken to Constantinople in late antiquity and lost in a fire there; the report is late and the removal is not securely documented.",
      "The temple was damaged by fire in the fifth century and thrown down by earthquake in the sixth. Later flooding by the Alpheios and the Kladeos buried the sanctuary in silt several metres deep, which is why so much survived to be excavated.",
    ],
    survival: {
      condition: "standing-ruin",
      level: "documented",
      note: "The platform, the fallen columns lying in sequence, and one column re-erected in 2004. The sculpture is in the site museum.",
    },
    archaeology: [
      "The German excavation begun in 1875 under Ernst Curtius was conducted under a formal agreement with the Greek state which provided that finds remained in Greece — the first excavation arranged on that basis, and a precedent that changed the terms of archaeology in the eastern Mediterranean.",
      "Pheidias's workshop was identified in the 1950s beneath a later church, on the evidence of its dimensions matching the temple's cella, together with tools, ivory chips, glass and terracotta moulds for drapery, and a cup inscribed to say that it belonged to Pheidias. It is one of the very few ancient artists' workshops ever identified.",
    ],
    fragments: [
      {
        what: "The pedimental sculpture, the metopes and the Nike of Paionios",
        level: "documented",
        museumSlug: "archaeological-museum-olympia",
      },
      {
        what: "Tools, ivory working debris and the inscribed cup from Pheidias's workshop",
        level: "documented",
        museumSlug: "archaeological-museum-olympia",
      },
      {
        what: "Metope fragments removed by the French expedition in 1829",
        level: "documented",
        museumSlug: "louvre",
      },
    ],
    primarySources: [
      S(
        "Description of Greece",
        "5.10–11",
        "Pausanias on the temple, its architect Libon, the pediments and metopes described figure by figure, and a long description of the statue of Zeus. The single most important text for any Greek building.",
        "Pausanias",
      ),
      S(
        "Geography",
        "8.3.30",
        "Strabo on the statue: that Pheidias made it seated and nearly touching the roof, so that it would have unroofed the temple had it stood. A criticism, and the only ancient statement about its scale.",
        "Strabo",
      ),
    ],
    disputes: [
      {
        question: "What did the east pediment show, exactly?",
        positions:
          "Pausanias names the figures, and the surviving sculpture does not fit his account in every particular; the arrangement of the seers, the attendants and the chariot teams has been rearranged repeatedly since excavation. The current display is one reconstruction among several.",
        level: "disputed",
      },
      {
        question: "What happened to the statue?",
        positions:
          "A late tradition has it removed to Constantinople and destroyed in the fire of 475. Another has it burned at Olympia. No contemporary account of its removal survives, and the workshop evidence shows only where it was made.",
        level: "unknown",
      },
    ],
    museumSlugs: ["archaeological-museum-olympia", "louvre"],
    objectSlugs: [],
    institutionRefs: [],
    religionRefs: ["animal-sacrifice", "sanctuary-treasuries", "votive-dedication", "greek-priesthood", "the-sacred-calendar"],
    battleRefs: [],
    warfareRefs: ["armour", "helmets"],
    figureRefs: ["herodotus", "plutarch"],
    themeRefs: ["state-and-religion", "monumentality", "civic-virtue"],
    bookRefs: [],
    relatedMonuments: ["temple-of-apollo-delphi", "treasury-of-the-athenians", "parthenon"],
    mapSlugs: ["ancient-greece"],
    imageSlug: "olympia-temple-of-zeus",
  },
  {
    slug: "treasury-of-the-athenians",
    title: "The Treasury of the Athenians",
    kind: "civic-building",
    region: "aegean",
    standfirst:
      "A small marble building on the Sacred Way whose walls carry the oldest substantial piece of written music that survives from anywhere.",
    description:
      "The Treasury of the Athenians at Delphi — the Marathon dedication and the dating problem, the Delphic hymns with their musical notation, and the 1906 re-erection from its own blocks.",
    civilizations: ["athens", "greece"],
    citySlug: "delphi",
    modernLocation: "The sanctuary of Apollo, Delphi",
    architectureRefs: ["temple", "architectural-orders", "columns-and-capitals"],
    chronology: {
      built: { year: -485, precision: "disputed", display: "c. 500–485 BCE" },
      display: "Built around 500–485 BCE; the dating is argued",
      status: "disputed",
      phases: [
        {
          label: "Construction",
          display: "c. 500–485 BCE",
          level: "disputed",
          note: "Pausanias says it was built from the spoils of Marathon, which would put it after 490. The architectural style and the sculpture are argued by many to be earlier, which would make it a monument of the new democracy rather than of the battle.",
        },
        {
          label: "The Marathon base",
          display: "after 490 BCE",
          level: "documented",
          note: "A terrace in front of the treasury carries an inscription recording a dedication to Apollo from the Persian spoils. It is separate from the building and it is what Pausanias's account most likely refers to.",
        },
        {
          label: "The Delphic hymns",
          display: "128/7 BCE",
          level: "documented",
          note: "Two hymns to Apollo with musical notation were inscribed on the treasury's south wall, in connection with an Athenian religious embassy. The date of one is fixed by the archon named in it.",
        },
        {
          label: "Re-erection",
          display: "1903–1906",
          level: "documented",
          note: "Rebuilt by the French School from its own fallen blocks, with modern stone filling the gaps.",
        },
      ],
    },
    attributions: [
      {
        name: "The Athenian demos",
        role: "patron",
        level: "documented",
        basis: "The building is identified as Athenian by its inscriptions and by Pausanias 10.11.5.",
      },
      {
        name: "Unknown",
        role: "architect",
        level: "unknown",
        basis: "No source names one.",
      },
    ],
    originalFunction: [
      "A treasury: a small, richly finished building put up by a city at a Panhellenic sanctuary to hold its dedications and to advertise itself. Delphi had more than twenty of them lining the Sacred Way, and they are the physical form of inter-city competition.",
      "This one stood at the first turn of the path, where everyone climbing to the temple had to pass it.",
    ],
    materials: [
      { material: "Parian marble", use: "The whole building, at considerable expense for a structure this size", level: "documented" },
    ],
    measurements: [
      {
        label: "Ground plan",
        value: "about 10 × 6 m",
        basis: "Modern survey of the re-erected building on its ancient foundations.",
        level: "documented",
      },
      {
        label: "Metopes",
        value: "thirty, showing the deeds of Herakles and of Theseus",
        basis: "Count from survey of the surviving and restored positions.",
        level: "documented",
      },
    ],
    construction: [
      "A small Doric building in antis — two columns between the projecting ends of the side walls — executed entirely in Parian marble, which for a structure of this size is a display of expenditure rather than of engineering.",
      "The re-erection of 1903–1906 used the original blocks recovered from the site, supplemented with new marble where pieces were missing. It is one of the earliest large anastyloses and the new stone is distinguishable on close inspection.",
    ],
    politicalMeaning: [
      "Pairing the deeds of Theseus with the labours of Herakles on the metopes puts an Athenian hero on equal footing with the Panhellenic one, at the sanctuary where all Greeks would see it. Theseus was being systematically promoted at Athens in exactly this period as the founder-hero of the democratic city.",
      "The dating dispute is therefore not a technicality. If the building precedes Marathon, it is a monument of the new democracy asserting itself at Delphi; if it follows the battle, it is a war memorial. The metopes read differently in each case.",
    ],
    religiousMeaning: [
      "The two hymns inscribed on the south wall were composed for an Athenian embassy to the sanctuary and carry vocal notation above the text — the earliest substantial surviving Greek music, and effectively the earliest written music from anywhere that can be performed.",
      "That a hymn to Apollo survives with its melody on the wall of an Athenian building at Delphi is the closest the ancient world comes to leaving us a sound.",
    ],
    laterHistory: [
      "Collapsed and buried with the rest of the sanctuary; the site was covered by the village of Kastri until 1892.",
      "Its blocks were recovered in the French excavation and the building was reassembled on its foundations in 1903–1906, funded by the city of Athens.",
    ],
    survival: {
      condition: "reassembled",
      level: "documented",
      note: "Standing complete, rebuilt from its own blocks with modern infill. The metopes on the building are casts; the originals are in the site museum.",
    },
    restoration: [
      "The 1903–1906 anastylosis is an early and influential example of the method: original material returned to its original position, new material used only where necessary and left plain. It also fixed a reconstruction of the metope sequence that has been revised since.",
    ],
    archaeology: [
      "The building's blocks carried, in addition to the hymns, a large number of Athenian public inscriptions, so the treasury doubled as a noticeboard for Athenian business at the sanctuary.",
      "The terrace in front carries the inscription recording a dedication from the Persian spoils, which is the evidential basis for the Marathon connection and belongs to a different structure from the treasury itself.",
    ],
    fragments: [
      {
        what: "The original metopes",
        level: "documented",
        museumSlug: "delphi-archaeological-museum",
      },
      {
        what: "The two Delphic hymns with musical notation",
        level: "documented",
        museumSlug: "delphi-archaeological-museum",
      },
    ],
    primarySources: [
      S(
        "Description of Greece",
        "10.11.5",
        "Pausanias states that the Athenians built the treasury from the spoils of the landing of Datis at Marathon. The sentence is the whole of the ancient evidence for the connection, and it is contested by the architecture.",
        "Pausanias",
      ),
      S(
        "The Delphic hymns",
        "inscribed on the south wall, 128/7 BCE",
        "Two paeans to Apollo with vocal notation, composed for an Athenian embassy. The earliest substantial surviving music from the ancient world.",
      ),
    ],
    disputes: [
      {
        question: "Was it built before or after Marathon?",
        positions:
          "Pausanias says after, from the spoils. Many architectural historians date the style and the sculpture to the years around 500, before the battle, and read Pausanias as conflating the treasury with the separately inscribed dedication on the terrace in front of it. The question has been argued for over a century and is not settled.",
        level: "disputed",
      },
    ],
    museumSlugs: ["delphi-archaeological-museum"],
    objectSlugs: [],
    institutionRefs: ["ecclesia", "ostracism", "archon"],
    religionRefs: ["votive-dedication", "sanctuary-treasuries", "the-sacred-calendar"],
    battleRefs: ["marathon"],
    warfareRefs: [],
    figureRefs: ["miltiades", "herodotus", "solon"],
    themeRefs: ["democracy", "founding-myths", "civic-virtue", "historical-memory"],
    bookRefs: ["herodotus-histories"],
    relatedMonuments: ["temple-of-apollo-delphi", "parthenon"],
    mapSlugs: ["ancient-greece"],
    imageSlug: "delphi-athenian-treasury",
  },
  {
    slug: "lion-gate",
    title: "The Lion Gate",
    kind: "gateway",
    region: "aegean",
    standfirst:
      "The oldest monumental sculpture in Europe still standing where it was set, and the heads are missing because they were made separately out of something worth taking.",
    description:
      "The Lion Gate at Mycenae — the relieving triangle and its relief, the missing heads, whether the animals are lions or lionesses, and what the column between them stands for.",
    civilizations: ["greece"],
    siteSlug: "mycenae",
    modernLocation: "Mycenae, the Argolid",
    architectureRefs: ["construction-methods", "building-materials"],
    chronology: {
      built: { year: -1250, precision: "approximate", display: "c. 1250 BCE" },
      display: "c. 1250 BCE, with the extension of the citadel wall",
      status: "documented",
      phases: [
        {
          label: "The wall extension",
          display: "c. 1250 BCE",
          level: "documented",
          note: "The gate belongs to the second phase of the cyclopean circuit, the one that brought Grave Circle A inside the walls. Gate and wall are a single act of building.",
        },
        {
          label: "Continuous visibility",
          display: "since antiquity",
          level: "documented",
          note: "The gate was never lost. Pausanias saw it, early modern travellers drew it, and Kyriakos Pittakis cleared it in 1841.",
        },
      ],
    },
    attributions: [
      {
        name: "Unknown",
        role: "architect",
        level: "unknown",
        basis:
          "Mycenaean Greece has left no architects' names. The Linear B tablets record scribes, officials, smiths and shepherds, and no builders.",
      },
    ],
    originalFunction: [
      "The principal entrance to the citadel: a gate about three metres square in a bastioned approach, with a courtyard inside and a guard chamber, arranged so that anyone entering had their unshielded right side exposed to the wall above.",
      "It is also a display. The relief above the lintel is the only monumental sculpture the Mycenaean world produced at this scale, and it was placed where every arrival would pass under it.",
    ],
    materials: [
      { material: "Limestone", use: "The threshold, jambs and lintel, in conglomerate and limestone blocks", level: "documented" },
      { material: "Limestone relief slab", use: "The triangular panel above the lintel", level: "documented" },
      { material: "Lost material", use: "The two heads, made separately and attached by dowels — the sockets survive. What they were made of is not known; steatite, ivory and metal have all been proposed", level: "unknown" },
    ],
    measurements: [
      {
        label: "Gate opening",
        value: "about 3.1 m wide and 3 m high",
        basis: "Modern survey.",
        level: "documented",
      },
      {
        label: "Lintel block",
        value: "about 4.5 × 2 × 0.8 m, weighing perhaps 20 tonnes",
        basis:
          "Modern measurement of the block; the weight is calculated from its volume and the density of the stone, not weighed.",
        level: "probable",
      },
      {
        label: "The relief panel",
        value: "about 3 m wide and 3 m high",
        basis: "Modern survey of the slab in position.",
        level: "documented",
      },
    ],
    construction: [
      "The gate is spanned by a single monolithic lintel, and above it the masonry is corbelled inward to form a triangular void — the relieving triangle — which takes the weight of the wall off the lintel and directs it into the jambs. The void is then filled by a thin sculpted slab that carries nothing.",
      "That is the whole engineering idea and it is a good one: the structural solution creates a triangular panel, and the panel is then used for the only monumental relief the culture made.",
      "Getting the lintel into place is unexplained. There is no evidence for the method, and the block is heavier than anything the surviving Mycenaean toolkit obviously accounts for.",
    ],
    politicalMeaning: [
      "The wall extension that this gate belongs to also brought the four-hundred-year-old shaft graves of Grave Circle A inside the fortifications and monumentalised them. Building a display gate and enclosing the ancestors in the same campaign is a claim of descent made in stone by a dynasty that may or may not have been descended from them.",
      "The composition — two animals flanking a column on a stepped base — appears repeatedly on Aegean seals and is generally read as a heraldic or protective device. What it meant to the people who built the gate is not recorded.",
    ],
    religiousMeaning: [
      "The central column stands on what looks like an altar base and is often read as a religious symbol, and there is a long-running argument about whether it represents a deity, a palace, or the citadel itself. Nothing decides it.",
    ],
    laterHistory: [
      "Buried to the lintel by hillwash over centuries but never invisible; the relief was drawn by travellers before excavation. Cleared to its threshold in 1841.",
      "Consolidated repeatedly since; the bastion beside it has been restored.",
    ],
    survival: {
      condition: "standing",
      level: "documented",
      note: "Standing complete in its wall, with the relief in place. Only the two heads are missing.",
    },
    archaeology: [
      "The pivot holes and bar sockets in the jambs and threshold show a double door barred from inside, and the cutting for the bar runs deep into the masonry.",
      "Excavation of the approach established the bastion and the guardroom, and the relationship of the gate to the extended circuit and to the re-enclosed grave circle.",
    ],
    fragments: [],
    primarySources: [
      S(
        "Description of Greece",
        "2.16.5",
        "Pausanias, in the second century CE, describes the ruined circuit with a gate over which lions stand, and reports that the Cyclopes built the wall. The only ancient notice of the gate, and it is accurate.",
        "Pausanias",
      ),
    ],
    disputes: [
      {
        question: "Are they lions?",
        positions:
          "The animals have no manes, which has led to their identification as lionesses, and their heads — which would settle the question — are missing. Griffins have also been proposed on the basis of the dowel arrangement in the neck sockets, which some read as accommodating a beak or crest. The gate is universally called the Lion Gate and the identification is not secure.",
        level: "disputed",
      },
      {
        question: "What does the column mean?",
        positions:
          "Readings include a cult symbol, an aniconic deity, the palace, the dynasty and the citadel itself. The motif recurs in Aegean glyptic with variations, which supports its being a formula rather than a portrait of a specific thing, and no text explains it.",
        level: "unknown",
      },
    ],
    museumSlugs: ["national-archaeological-museum-athens"],
    objectSlugs: [],
    institutionRefs: [],
    religionRefs: ["hero-cult"],
    battleRefs: [],
    warfareRefs: ["fortifications", "siege-warfare"],
    figureRefs: ["homer"],
    themeRefs: ["monumentality", "founding-myths", "historical-memory"],
    bookRefs: ["iliad"],
    relatedMonuments: ["treasury-of-atreus"],
    mapSlugs: ["ancient-greece"],
    imageSlug: "lion-gate-mycenae",
  },
  {
    slug: "treasury-of-atreus",
    title: "The Treasury of Atreus",
    alternateNames: ["The Tomb of Agamemnon"],
    kind: "funerary",
    region: "aegean",
    standfirst:
      "A corbelled dome fourteen metres across under a lintel of a hundred and twenty tonnes, robbed in antiquity, named after a man there is no evidence it held.",
    description:
      "The Treasury of Atreus — the largest tholos tomb, the engineering of its dome and lintel, the green half-columns now in London, and why both its names are wrong.",
    civilizations: ["greece"],
    siteSlug: "mycenae",
    modernLocation: "Mycenae, the Argolid",
    architectureRefs: ["mausoleum", "necropolis", "vaults-and-domes", "construction-methods"],
    chronology: {
      built: { year: -1250, precision: "approximate", display: "c. 1250 BCE" },
      display: "c. 1250 BCE",
      status: "probable",
      phases: [
        {
          label: "Construction",
          display: "c. 1250 BCE",
          level: "probable",
          note: "Dated by its masonry technique and by its position in the developmental sequence of the nine Mycenaean tholoi, which Alan Wace established by stratigraphy. There is no dating evidence from the contents, because there are none.",
        },
        {
          label: "Robbery",
          display: "antiquity",
          level: "documented",
          note: "Emptied long before the modern period. Pausanias in the second century CE describes the tholoi as treasuries, which is how they were understood once nobody remembered they were graves.",
        },
        {
          label: "Clearance",
          display: "1810 and after",
          level: "documented",
          note: "Cleared under Veli Pasha; the decorated half-columns from the façade were removed at this time and eventually reached the British Museum.",
        },
      ],
    },
    attributions: [
      {
        name: "Unknown",
        role: "architect",
        level: "unknown",
        basis: "No name survives from Mycenaean Greece for any builder.",
      },
      {
        name: "Atreus, or Agamemnon",
        role: "patron",
        level: "literary",
        basis:
          "Both names are modern conventions derived from Pausanias, who reports local identifications of tombs at Mycenae with figures of the Atreid legend. Nothing found in or on the tomb names anybody, and its date does not fit any traditional chronology for those figures.",
      },
    ],
    originalFunction: [
      "A tomb. A tholos of this kind held successive burials in a stone chamber approached along a walled passage, with the doorway blocked and the passage refilled between interments and the whole covered by a mound.",
      "A side chamber cut into the rock off the main dome probably held the burials themselves; the great chamber may have been for ceremony. Since the tomb was emptied in antiquity, this is inference from better-preserved tholoi elsewhere.",
    ],
    materials: [
      { material: "Conglomerate", use: "The dressed blocks of the façade, the dromos walls and the doorway, sawn and finished to a precision unusual in Mycenaean building", level: "documented" },
      { material: "Green limestone", use: "The engaged half-columns flanking the door, carved with zigzag and spiral bands", level: "documented" },
      { material: "Red and green stone", use: "The decorative facing of the relieving triangle above the lintel, now lost except in fragments", level: "documented" },
    ],
    measurements: [
      {
        label: "Chamber",
        value: "about 14.5 m in diameter and 13.4 m high",
        basis: "Modern survey of the standing dome.",
        level: "documented",
      },
      {
        label: "The lintel",
        value: "about 8.3 m long, weighing perhaps 120 tonnes",
        basis:
          "Modern measurement of the inner lintel block; the weight is calculated from its dimensions and the density of conglomerate. It is generally described as the heaviest single block used in any structure before the Roman period, which is a claim about a class rather than a measurement.",
        level: "probable",
      },
      {
        label: "The dromos",
        value: "about 36 m long and 6 m wide",
        basis: "Modern survey.",
        level: "documented",
      },
    ],
    construction: [
      "The dome is corbelled, not vaulted: thirty-three courses of blocks each projecting slightly further inward than the one below, cut back to a curve after setting, and closed by a single capstone. There is no keystone and no arch, and the structure works because the mass of the surrounding mound holds the rings in compression.",
      "The relieving triangle above the door does the same job as at the Lion Gate — taking the wall's load off the lintel — and here it was faced with coloured stone rather than sculpture.",
      "The interior was studded with bronze rosettes; the nail holes survive in rows across the dome, and their pattern is one of the few pieces of evidence for how Mycenaean interiors were finished.",
      "How the lintel was raised is not known. It sits about five metres above the floor of the dromos and there is no evidence for a ramp or a mechanism.",
    ],
    politicalMeaning: [
      "The tholoi are the burials of whoever ran Mycenae in its palatial period, and their scale is the clearest surviving measure of that power. The labour of quarrying, moving and setting a hundred-and-twenty-tonne block for a tomb describes a command over people that no text records.",
      "Their names are a caution about how ruins acquire stories. Pausanias found local guides attaching Homeric names to visible monuments a thousand years after they were built; Schliemann found the same practice still going in the nineteenth century, and both names on this building come from it.",
    ],
    laterHistory: [
      "Robbed in antiquity and open thereafter. Cleared in 1810 under the local Ottoman governor Veli Pasha, when the façade's decorated stonework was removed; the two green half-columns and other fragments passed through European collections and reached the British Museum in 1904.",
      "Excavated and studied by Wace in the 1920s, who used the tholoi to establish a chronological sequence that broke the assumption of Cretan control over the mainland.",
    ],
    survival: {
      condition: "standing",
      level: "documented",
      note: "The dome is intact and entered as it was built, with the dromos cleared. The façade has lost its coloured stonework and its half-columns.",
    },
    archaeology: [
      "Nothing was recovered from the chamber, which had been emptied. The tomb's date and significance rest entirely on its architecture and its place in a typological sequence.",
      "Wace's stratigraphic work on the nine Mycenaean tholoi established a developmental series from simpler rubble-built chambers to this one, and dated them against the settlement — the argument that put mainland Greece on its own chronological footing.",
    ],
    fragments: [
      {
        what: "The two engaged half-columns of green limestone from the façade, with fragments of the relieving-triangle facing",
        level: "documented",
        museumSlug: "british-museum",
      },
      {
        what: "Further façade fragments",
        level: "documented",
        museumSlug: "national-archaeological-museum-athens",
      },
    ],
    primarySources: [
      S(
        "Description of Greece",
        "2.16.6–7",
        "Pausanias reports underground buildings at Mycenae, calling them the treasuries of Atreus and his sons, and locates the graves of Agamemnon and his companions. The source of both modern names, and a second-century account of what local people said about ruins already a thousand years old.",
        "Pausanias",
      ),
    ],
    disputes: [
      {
        question: "Whose tomb was it?",
        positions:
          "Unknown, and unknowable from present evidence. The tomb was empty when first recorded, nothing on it names anyone, and the Atreid names come from Pausanias reporting local tradition. Its date, around 1250 BCE, is two generations or more before any traditional date for the Trojan War, which does not make an Atreid burial impossible but removes the only reason for supposing it.",
        level: "unknown",
      },
      {
        question: "How was the lintel placed?",
        positions:
          "Earth ramps, timber cradles and levering from above have all been proposed. No trace of a ramp has been found, and the calculations for a sledge on a ramp require a workforce and an organisation that are plausible but unattested. The question is open in the same way that the Egyptian pyramid ramps are.",
        level: "unknown",
      },
    ],
    museumSlugs: ["british-museum", "national-archaeological-museum-athens"],
    objectSlugs: ["mask-of-agamemnon"],
    institutionRefs: [],
    religionRefs: ["hero-cult"],
    battleRefs: [],
    warfareRefs: [],
    figureRefs: ["homer"],
    themeRefs: ["monumentality", "historical-memory", "founding-myths"],
    bookRefs: ["iliad", "odyssey"],
    relatedMonuments: ["lion-gate"],
    mapSlugs: ["ancient-greece"],
    imageSlug: "treasury-of-atreus",
  },
  // ─── Persia ──────────────────────────────────────────────────────────
  {
    slug: "apadana",
    title: "The Apadana at Persepolis",
    kind: "palace",
    region: "near-eastern",
    standfirst:
      "An audience hall of seventy-two columns twenty metres tall, approached by stairs carved with twenty-three delegations bringing tribute — an empire's picture of itself, burned by Alexander.",
    description:
      "The Apadana — Darius's foundation deposits, the tribute procession reliefs and the peoples they name, the columns still standing, and the fire of 330 BCE.",
    civilizations: ["achaemenid-empire", "persia", "persian-imperial-system"],
    citySlug: "persepolis",
    modernLocation: "Persepolis, Fars, Iran",
    architectureRefs: ["palace", "columns-and-capitals", "construction-methods"],
    chronology: {
      built: { year: -470, precision: "approximate", display: "begun c. 515, completed c. 470 BCE" },
      display: "Begun under Darius I c. 515 BCE, completed under Xerxes I",
      status: "documented",
      phases: [
        {
          label: "Darius's foundation",
          display: "c. 515 BCE",
          level: "documented",
          note: "Gold and silver foundation plaques with trilingual inscriptions of Darius were found in stone boxes under two corners of the hall in 1933, in place and undisturbed. They date the building and name its builder.",
        },
        {
          label: "Completion under Xerxes",
          display: "c. 490–470 BCE",
          level: "documented",
          note: "Xerxes' inscriptions on the terrace record work he completed. The Apadana's finishing belongs to his reign.",
        },
        {
          label: "The fire",
          display: "330 BCE",
          level: "documented",
          note: "Burned when Alexander's army took Persepolis. The cedar roof timbers came down and the fire is legible in the ash layer and the calcined stone.",
        },
      ],
    },
    attributions: [
      {
        name: "Darius I",
        role: "patron",
        level: "documented",
        basis:
          "The trilingual foundation plaques found in situ beneath the corners of the hall, naming Darius and the extent of his empire.",
        figureSlug: "darius-i",
      },
      {
        name: "Xerxes I",
        role: "completed-by",
        level: "documented",
        basis: "His own inscriptions on the terrace recording the completion of works begun by his father.",
        figureSlug: "xerxes-i",
      },
    ],
    originalFunction: [
      "A columned audience hall on the terrace at Persepolis, entered by two monumental stairways, with porticoes on three sides and guard towers at the corners. It is the largest building on the terrace and the ceremonial centre of the complex.",
      "What happened in it is not directly attested. The reliefs on the stairs show a procession of delegations bringing goods, and the terrace as a whole is generally understood as a setting for royal ceremonial, possibly seasonal. No Achaemenid text describes the occasion, and the reconstruction of a New Year festival at Persepolis is a modern proposal built on later evidence.",
    ],
    materials: [
      { material: "Grey limestone", use: "The columns, doorframes, stairs and reliefs, quarried locally", level: "documented" },
      { material: "Mudbrick", use: "The walls, now almost entirely gone, which is why the building reads as a forest of columns rather than a room", level: "documented" },
      { material: "Cedar of Lebanon", use: "The roof beams, named in Darius's building inscription from Susa as brought from Lebanon", level: "documented" },
      { material: "Gold and silver", use: "The foundation plaques, and applied decoration on the reliefs, now lost", level: "documented" },
    ],
    measurements: [
      {
        label: "Central hall",
        value: "about 60 × 60 m",
        basis: "Modern survey of the column bases and the terrace walls.",
        level: "documented",
      },
      {
        label: "Columns",
        value: "72 in all, about 20 m tall; 13 still standing",
        basis: "Modern survey and count.",
        level: "documented",
      },
      {
        label: "Delegations on the stair reliefs",
        value: "23",
        basis:
          "Count of the panels. The delegations are not labelled on the Apadana itself; their identification rests on comparison with the labelled throne-bearer figures at Naqsh-e Rustam and on their dress and gifts.",
        level: "probable",
      },
    ],
    construction: [
      "The columns are the point. Achaemenid builders used slender stone shafts at heights Greek and Egyptian practice did not attempt, with intercolumniations wide enough that the roof had to be timber. The capitals are double animal protomes — bulls, lions, human-headed creatures — with the beams resting in the saddle between the two backs.",
      "That system produces an interior that is mostly air: a hall sixty metres square with thirty-six widely spaced columns, lit from clerestory level. It is the opposite of an Egyptian hypostyle hall, where the columns crowd out the space, and the difference is a difference of intention rather than of capability.",
      "The masonry technique — anathyrosis at the joints, swallow-tail cramps, and the finishing of blocks in place — is Ionian and Lydian, brought by craftsmen the Susa inscription lists by origin.",
    ],
    politicalMeaning: [
      "The stair reliefs are the empire's self-portrait and they are worth reading closely against the Greek description of the same empire. Delegations approach in orderly files, led by an usher who takes each by the hand; they carry vessels, textiles, animals and metals; nobody is bound, nobody kneels, and the Persian and Median guards on the adjoining panels stand at ease.",
      "That is a picture of an empire held together by exchange and obligation rather than by terror, and it is a picture — a commissioned image, not a report. The Persepolis Fortification tablets, from the same terrace, show the administrative reality of rations, travel authorisations and labour allocations that the reliefs do not depict.",
      "Herodotus's tribute list in Book 3 covers the same subject from outside and in a different register, assigning cash sums to satrapies. The two documents are the best paired evidence there is for how an ancient empire described its own revenues.",
    ],
    laterHistory: [
      "Burned in 330 BCE and never rebuilt. Whether the fire was a deliberate act of policy, a drunken impulse at a banquet, or a calculated signal that the Persian wars were avenged is reported differently by the ancient sources and remains argued.",
      "The terrace stood as a visible ruin thereafter; Sasanian and later visitors left inscriptions, and European travellers drew it from the seventeenth century.",
    ],
    survival: {
      condition: "standing-ruin",
      level: "documented",
      note: "Thirteen columns standing, the stairways with their reliefs in position, and the platform and column bases of the hall. The mudbrick walls are gone.",
    },
    archaeology: [
      "The foundation deposits were found by Herzfeld's expedition in 1933 in stone boxes under the north-east and south-east corners: gold and silver plaques with the same trilingual text, undisturbed since they were laid.",
      "The central panel of the north stair, showing the king enthroned receiving an official, was found not on the stair but reused in the Treasury, having been removed and replaced in antiquity. It is now in Tehran, and the change of subject on the stair is itself evidence of a change of programme.",
      "Excavation by Herzfeld and then Erich Schmidt for the Oriental Institute in the 1930s established the terrace's sequence and recovered the fortification and treasury archives.",
    ],
    fragments: [
      {
        what: "The Apadana foundation plaques",
        level: "documented",
        museumSlug: "national-museum-of-iran",
      },
      {
        what: "The audience relief from the stair, later reused in the Treasury",
        level: "documented",
        museumSlug: "national-museum-of-iran",
      },
      {
        what: "Relief panels removed in the nineteenth and early twentieth centuries",
        level: "documented",
        museumSlug: "british-museum",
      },
    ],
    primarySources: [
      S(
        "Histories",
        "3.89–97",
        "Herodotus's account of Darius's satrapies and their tribute, in silver. A Greek reckoning of Persian revenue, to be read against the reliefs' picture of the same relationship.",
        "Herodotus",
      ),
      S(
        "The Apadana foundation inscriptions",
        "DPh",
        "Darius's trilingual text on the gold and silver plaques, naming the extent of his kingdom from the Sakas beyond Sogdia to Kush. Found in place beneath the building.",
        "Darius I",
      ),
      S(
        "Anabasis of Alexander",
        "3.18",
        "Arrian on the taking of Persepolis and the burning of the palace, and on Parmenion's objection that Alexander was destroying what was now his own property.",
        "Arrian",
      ),
    ],
    disputes: [
      {
        question: "What ceremony did the reliefs depict?",
        positions:
          "The New Year festival is the most cited proposal, on the analogy of later Iranian practice and on the seasonal reading of the terrace's use. Others hold that the procession is a generalised statement of empire rather than a record of an event, and that the terrace was used at various times. No Achaemenid text names an occasion.",
        level: "disputed",
      },
      {
        question: "Was the burning of Persepolis deliberate?",
        positions:
          "Arrian and Diodorus give different accounts, one of a considered decision and one of a drunken impulse at a banquet on the suggestion of the courtesan Thais. Curtius follows the banquet story. The archaeology shows an intense fire and no attempt at salvage, which is consistent with either.",
        level: "disputed",
      },
    ],
    museumSlugs: ["national-museum-of-iran", "british-museum", "louvre"],
    objectSlugs: [],
    institutionRefs: ["satrap", "imperial-administration"],
    religionRefs: ["zoroastrian-practice"],
    battleRefs: ["gaugamela"],
    warfareRefs: ["persian-army", "persian-warfare"],
    figureRefs: ["darius-i", "xerxes-i", "alexander", "herodotus", "arrian"],
    themeRefs: ["persian-kingship", "satrapies", "empire-and-diversity", "monumentality"],
    bookRefs: ["herodotus-histories", "anabasis-of-alexander"],
    relatedMonuments: ["gate-of-all-nations", "palace-of-darius", "tomb-of-darius-i"],
    mapSlugs: ["persian-empire"],
    imageSlug: "persepolis-apadana",
  },
  {
    slug: "gate-of-all-nations",
    title: "The Gate of All Nations",
    alternateNames: ["The Gate of Xerxes"],
    kind: "gateway",
    region: "near-eastern",
    standfirst:
      "Xerxes' entrance to the terrace, guarded by colossal bulls and bull-men, and covered in the names of nineteenth-century travellers who carved them into it.",
    description:
      "The Gate of All Nations at Persepolis — Xerxes' trilingual inscription, the colossi, the single approach it controlled, and the graffiti of the explorers.",
    civilizations: ["achaemenid-empire", "persia", "persian-imperial-system"],
    citySlug: "persepolis",
    modernLocation: "Persepolis, Fars, Iran",
    architectureRefs: ["palace", "columns-and-capitals", "construction-methods"],
    chronology: {
      built: { year: -470, precision: "range-endpoint", display: "c. 480–470 BCE" },
      display: "Built under Xerxes I, c. 480–470 BCE",
      status: "documented",
      phases: [
        {
          label: "Construction",
          display: "c. 480–470 BCE",
          level: "documented",
          note: "Xerxes' own inscription on the gate records that he made it, by the favour of Ahuramazda.",
        },
        {
          label: "The fire",
          display: "330 BCE",
          level: "documented",
          note: "Burned with the rest of the terrace. The stone colossi and doorframes survived because they are stone.",
        },
        {
          label: "Travellers' graffiti",
          display: "17th–19th centuries",
          level: "documented",
          note: "European visitors carved their names into the colossi and the jambs, among them members of exploring expeditions and diplomatic missions. The graffiti are now themselves a documented layer of the monument.",
        },
      ],
    },
    attributions: [
      {
        name: "Xerxes I",
        role: "patron",
        level: "documented",
        basis:
          "The trilingual inscription XPa, cut three times on the gate in Old Persian, Elamite and Babylonian: Xerxes the king says that by the favour of Ahuramazda he made this gateway of all lands.",
        figureSlug: "xerxes-i",
      },
    ],
    originalFunction: [
      "The single controlled entrance to the terrace. Everything arriving at Persepolis passed up the double stairway, through this hall, and out towards the Apadana or eastward along the processional route.",
      "The hall itself is a waiting room with stone benches along the walls, which is a mundane and revealing detail: delegations were held here.",
    ],
    materials: [
      { material: "Grey limestone", use: "The colossi, doorframes and column bases", level: "documented" },
      { material: "Mudbrick", use: "The walls, now lost", level: "documented" },
    ],
    measurements: [
      {
        label: "The hall",
        value: "about 25 × 25 m",
        basis: "Modern survey of the standing doorframes and the wall foundations.",
        level: "documented",
      },
      {
        label: "Columns",
        value: "four, about 16 m tall",
        basis: "Modern survey of the surviving shafts and bases.",
        level: "documented",
      },
      {
        label: "The colossi",
        value: "about 5.5 m high",
        basis: "Modern survey of the standing figures.",
        level: "documented",
      },
    ],
    construction: [
      "A square hall with three doorways — west for the approach, east towards the processional way, south towards the Apadana — each framed in monolithic stone jambs that still stand because they are single blocks.",
      "The western pair of colossi are bulls; the eastern pair are human-headed winged bulls of the type the Assyrians had used for four centuries at Nimrud, Khorsabad and Nineveh. The borrowing is deliberate and is one of the clearest instances of Achaemenid architecture quoting Mesopotamian precedent.",
    ],
    politicalMeaning: [
      "The name is the inscription's own: a gateway of all lands. An empire that governed by acknowledging its constituent peoples put that claim on the door everyone entered by, in three languages, none of which most visitors could read.",
      "That the Assyrian guardian figure was adopted wholesale matters. The Achaemenids did not invent an imperial visual language; they assembled one out of Assyrian, Elamite, Egyptian, Lydian and Ionian material, and the gate is where the Assyrian component is most obvious.",
    ],
    religiousMeaning: [
      "Xerxes' inscription attributes the work to the favour of Ahuramazda, as Achaemenid royal inscriptions consistently do. That formula is evidence for what the kings said about their authority; it is weaker evidence for the content of their religion, and it should not be read as a Zoroastrian creed.",
    ],
    laterHistory: [
      "Standing as a ruin since 330 BCE. From the seventeenth century European travellers carved their names on the colossi and the jambs — the practice was not then regarded as vandalism, and the inscriptions record who reached Persepolis and when.",
      "Excavated and consolidated by Herzfeld and Schmidt in the 1930s.",
    ],
    survival: {
      condition: "standing-ruin",
      level: "documented",
      note: "The doorframes and the four colossi stand; the columns survive in part; the mudbrick walls are gone. The graffiti remain and are conserved as part of the monument.",
    },
    archaeology: [
      "Excavation established the hall's plan, the stone benches along the walls, and the relationship of the three doorways to the terrace's circulation.",
      "The colossi's damage is old: the heads of the eastern pair were broken in antiquity, and the faces of the western bulls are lost.",
    ],
    fragments: [],
    primarySources: [
      S(
        "The gate inscription",
        "XPa",
        "Xerxes, in three languages: that Ahuramazda gave him this kingdom, and that he made this gateway of all lands, and that much else of what was built at Persepolis he and his father built.",
        "Xerxes I",
      ),
      S(
        "Histories",
        "7.11, 7.61–99",
        "Herodotus on Xerxes and on the catalogue of peoples in his army — a Greek list of the same empire the gate names, compiled for a different purpose.",
        "Herodotus",
      ),
    ],
    disputes: [
      {
        question: "Which peoples are meant by all lands?",
        positions:
          "The Old Persian, Elamite and Babylonian versions of Achaemenid land-lists differ from each other and from one reign to the next, and the lists on the tomb of Darius, the Apadana reliefs and the Susa foundation text do not match. Whether the differences record real administrative change or reflect different rhetorical purposes is argued.",
        level: "disputed",
      },
    ],
    museumSlugs: ["national-museum-of-iran"],
    objectSlugs: [],
    institutionRefs: ["satrap", "imperial-administration"],
    religionRefs: ["zoroastrian-practice"],
    battleRefs: ["salamis", "plataea", "thermopylae"],
    warfareRefs: ["persian-army"],
    figureRefs: ["xerxes-i", "darius-i", "herodotus"],
    themeRefs: ["persian-kingship", "empire-and-diversity", "satrapies"],
    bookRefs: ["herodotus-histories"],
    relatedMonuments: ["apadana", "palace-of-darius"],
    mapSlugs: ["persian-empire"],
    imageSlug: "gate-of-all-nations",
  },
  {
    slug: "palace-of-darius",
    title: "The Palace of Darius",
    alternateNames: ["The Tachara"],
    kind: "palace",
    region: "near-eastern",
    standfirst:
      "The best-preserved building at Persepolis, because it burned less — its polished black doorframes still standing to full height, with the king carved leaving each room.",
    description:
      "The Tachara — Darius's own palace, completed by Xerxes, its polished stone doorframes and reliefs, and the later inscriptions cut on it by Sasanian and Islamic visitors.",
    civilizations: ["achaemenid-empire", "persia", "persian-imperial-system"],
    citySlug: "persepolis",
    modernLocation: "Persepolis, Fars, Iran",
    architectureRefs: ["palace", "columns-and-capitals", "building-materials"],
    chronology: {
      built: { year: -486, precision: "approximate", display: "begun under Darius I, before 486 BCE" },
      display: "Begun under Darius I and completed under Xerxes I",
      status: "documented",
      phases: [
        {
          label: "Darius's building",
          display: "before 486 BCE",
          level: "documented",
          note: "Darius's inscriptions on the building call it his tachara — a word usually rendered palace — and name him as its builder.",
        },
        {
          label: "Completion under Xerxes",
          display: "after 486 BCE",
          level: "documented",
          note: "Xerxes' inscription records that he completed what his father had begun. Both texts are on the building.",
        },
        {
          label: "Later inscriptions",
          display: "Sasanian and Islamic periods",
          level: "documented",
          note: "Middle Persian and Arabic and Persian inscriptions were cut on the doorframes by later visitors, including a Buyid ruler's record of a visit in the tenth century. They are part of the monument.",
        },
      ],
    },
    attributions: [
      {
        name: "Darius I",
        role: "patron",
        level: "documented",
        basis: "His own inscriptions on the building, in Old Persian, Elamite and Babylonian.",
        figureSlug: "darius-i",
      },
      {
        name: "Xerxes I",
        role: "completed-by",
        level: "documented",
        basis: "His inscription on the same building recording its completion.",
        figureSlug: "xerxes-i",
      },
    ],
    originalFunction: [
      "A residential palace on the terrace, small by comparison with the Apadana: a columned hall with subsidiary rooms, a portico facing south, and a stair with reliefs.",
      "The word tachara is Darius's own for the building and its meaning is not precisely established beyond palace or residence. What the rooms were used for is not recorded.",
    ],
    materials: [
      { material: "Dark grey limestone, polished", use: "The doorframes, window frames and niches, finished to a mirror surface that survives", level: "documented" },
      { material: "Mudbrick", use: "The walls between the stone frames, now gone", level: "documented" },
    ],
    measurements: [
      {
        label: "The main hall",
        value: "about 15.2 × 15.2 m, with twelve columns",
        basis: "Modern survey of the column bases and doorframes.",
        level: "documented",
      },
      {
        label: "Doorframes and windows",
        value: "standing to full height, about 4 m",
        basis: "Direct measurement of the standing frames.",
        level: "documented",
      },
    ],
    construction: [
      "The building's survival is a lesson in what fire does. Its walls were mudbrick and its roof timber, and both are gone; the stone doorframes, window frames and wall niches were monolithic and stayed standing, so the palace reads today as a grid of freestanding stone frames.",
      "The polish on that stone is exceptional and is original. It was achieved by abrasive finishing after setting, and it is the best surviving evidence for the quality of Achaemenid stone-finishing.",
      "The doorjamb reliefs show the king leaving the room, attended by servants with a parasol and a fly-whisk — a repeated composition that appears throughout the terrace and treats the king as a fixed type rather than a portrait.",
    ],
    politicalMeaning: [
      "That Darius built his own residence on the terrace and that Xerxes finished it and said so is the pattern of the whole complex: an inherited project, with each king recording his part. Achaemenid royal inscriptions are consistently concerned with continuity and with naming a father.",
      "The later inscriptions on the doorframes turn the building into a visitors' book spanning fifteen centuries. Sasanian and Islamic-era rulers came to Persepolis, understood it as royal, and recorded themselves on it — which is a piece of evidence about how the Achaemenid past was regarded long after the Achaemenids were forgotten as a dynasty.",
    ],
    laterHistory: [
      "Burned in 330 BCE, less severely than the halls with more timber in them. Standing thereafter and repeatedly visited and inscribed.",
      "Excavated and consolidated in the 1930s by Herzfeld and Schmidt.",
    ],
    survival: {
      condition: "standing-ruin",
      level: "documented",
      note: "The stone frames stand complete with their reliefs and their polish; the walls and roof are gone. It is the most legible building on the terrace.",
    },
    archaeology: [
      "The building's stone elements were largely in place at excavation, which allowed the plan and the elevation of the frames to be established without reconstruction.",
      "Traces of the mudbrick walls between the frames were recorded, establishing that the stone elements were set into brick rather than forming a stone building.",
    ],
    fragments: [
      {
        what: "Relief fragments removed in the nineteenth century",
        level: "documented",
        museumSlug: "british-museum",
      },
    ],
    primarySources: [
      S(
        "The palace inscriptions",
        "DPa, XPc",
        "Darius naming the building as his, and Xerxes recording its completion. Both cut on the building itself, in three languages.",
        "Darius I and Xerxes I",
      ),
      S(
        "Anabasis of Alexander",
        "3.18",
        "Arrian on the taking and burning of the palaces at Persepolis.",
        "Arrian",
      ),
    ],
    disputes: [
      {
        question: "What does tachara mean?",
        positions:
          "The Old Persian word is used of this building and of others, and is translated as palace, residence or winter palace. The last rests on an etymology that is not secure. What the building was used for, and whether it was a dwelling in any ordinary sense, is not established.",
        level: "unknown",
      },
    ],
    museumSlugs: ["national-museum-of-iran", "british-museum"],
    objectSlugs: [],
    institutionRefs: ["satrap", "imperial-administration"],
    religionRefs: ["zoroastrian-practice"],
    battleRefs: [],
    warfareRefs: [],
    figureRefs: ["darius-i", "xerxes-i", "alexander", "arrian"],
    themeRefs: ["persian-kingship", "royal-legitimacy", "monumentality"],
    bookRefs: ["anabasis-of-alexander"],
    relatedMonuments: ["apadana", "gate-of-all-nations", "tomb-of-darius-i"],
    mapSlugs: ["persian-empire"],
    imageSlug: "tachara-persepolis",
  },
  {
    slug: "tomb-of-cyrus",
    title: "The Tomb of Cyrus",
    kind: "funerary",
    region: "near-eastern",
    standfirst:
      "A gabled stone chamber on six steps, standing complete in an empty plain — the oldest free-standing stone monument in Iran, and the only Achaemenid royal tomb that is a building rather than a hole in a cliff.",
    description:
      "The Tomb of Cyrus at Pasargadae — its construction and its unplaced architectural pedigree, Alexander's visit and the restoration he ordered, the epitaph that no longer exists, and how it survived as the tomb of Solomon's mother.",
    civilizations: ["achaemenid-empire", "persia", "persian-imperial-system"],
    siteSlug: "pasargadae",
    modernLocation: "Pasargadae, Fars, Iran",
    architectureRefs: ["mausoleum", "construction-methods", "building-materials"],
    chronology: {
      built: { year: -530, precision: "approximate", display: "c. 530 BCE" },
      display: "Built around the death of Cyrus in 530 BCE",
      status: "probable",
      phases: [
        {
          label: "Construction",
          display: "c. 530 BCE",
          level: "probable",
          note: "Dated by association with Cyrus's death and by the masonry technique, which matches the rest of Pasargadae. No inscription on the tomb dates it.",
        },
        {
          label: "The cult",
          display: "6th–4th centuries BCE",
          level: "documented",
          note: "Greek sources record magi attached to the tomb with a daily allowance of a sheep and a monthly horse sacrifice. It was an endowed institution.",
        },
        {
          label: "Alexander's visits",
          display: "330 and 324 BCE",
          level: "documented",
          note: "Alexander found the tomb intact on the first visit and plundered on the second, and ordered Aristobulus to restore it and seal the door.",
        },
        {
          label: "Mashhad-e Madar-e Soleyman",
          display: "Islamic period",
          level: "documented",
          note: "Taken for the tomb of the mother of Solomon and protected as such; a mihrab was cut inside and a mosque built around it from spoliated Achaemenid columns.",
        },
      ],
    },
    attributions: [
      {
        name: "Cyrus the Great",
        role: "patron",
        level: "probable",
        basis:
          "Greek sources from Alexander's officers identify it as Cyrus's tomb and describe its interior; the identification has never been seriously challenged. No inscription on the monument names him.",
        figureSlug: "cyrus-the-great",
      },
      {
        name: "Unknown",
        role: "architect",
        level: "unknown",
        basis:
          "No name survives. The masonry technique is Lydian and Ionian, which identifies where the workmen came from and not who designed it.",
      },
    ],
    originalFunction: [
      "A tomb, with a small gabled chamber on a stepped plinth reached by a doorway so low that entry requires stooping. Arrian, drawing on Aristobulus who saw inside, describes a golden sarcophagus, a couch, tapestries and clothing.",
      "It was the focus of an endowed cult with a resident priesthood and regular sacrifices, funded by the royal treasury — an institution rather than a grave.",
    ],
    materials: [
      { material: "White limestone", use: "The whole monument, in large dressed blocks", level: "documented" },
      { material: "Iron and lead", use: "Swallow-tail cramps set in lead joining the blocks, an Ionian and Lydian technique", level: "documented" },
    ],
    measurements: [
      {
        label: "Overall height",
        value: "about 11.1 m",
        basis: "Modern survey.",
        level: "documented",
      },
      {
        label: "Plinth",
        value: "about 13.35 × 12.30 m at the base, in six receding steps",
        basis: "Modern survey.",
        level: "documented",
      },
      {
        label: "Burial chamber",
        value: "about 3.2 × 2.2 m internally",
        basis: "Modern survey of the interior.",
        level: "documented",
      },
    ],
    construction: [
      "Large dressed blocks laid without mortar and joined with metal cramps, with a gabled roof cut from separate blocks and a chamber whose walls are a single course thick. The finish is Ionian; the form is not.",
      "The stepped plinth has been compared to Mesopotamian ziggurats, to Urartian and Anatolian tomb types, and to Lydian tumuli, and it matches none of them closely. It appears to be a one-off, and no later Achaemenid king was buried in anything like it — Darius and his successors cut their tombs into cliffs.",
    ],
    politicalMeaning: [
      "That the founder's tomb is a free-standing building and every subsequent royal tomb is a rock-cut façade is a break, and it happens at exactly the point where Darius takes the throne from a line whose relationship to his own is the empire's central political question. The tomb type changes when the dynasty's story does.",
      "Alexander's treatment of the tomb is a deliberate political act. Finding it plundered, he had it restored, sealed and its guardians interrogated — presenting himself as the protector of the Achaemenid founder rather than his supplanter.",
    ],
    religiousMeaning: [
      "A body interred in a built chamber with a continuing sacrificial cult is difficult to reconcile with the exposure of the dead that later Zoroastrian texts require. That is one of several reasons for caution about describing the early Achaemenids as Zoroastrian in the sense the later texts define.",
    ],
    laterHistory: [
      "Plundered before 324 BCE, restored on Alexander's order, and thereafter left. The chamber was empty when Europeans first recorded it.",
      "In the Islamic period the monument was identified as the tomb of the mother of Solomon, given a mihrab, and enclosed within a mosque built partly of columns taken from Achaemenid buildings nearby. That identification protected it for centuries; the mosque was removed in the twentieth century.",
      "Excavated and studied by Herzfeld, Sami and Stronach; conserved since, with concern over stone decay and the effect of agricultural water use in the plain.",
    ],
    survival: {
      condition: "standing",
      level: "documented",
      note: "Standing complete: plinth, chamber, gable and doorway. The interior is empty and has been since antiquity.",
    },
    archaeology: [
      "Stronach's excavation established the tomb's setting within a walled enclosure and its relationship to the wider garden layout of Pasargadae.",
      "The remains of the later mosque and its spoliated columns were recorded and removed during twentieth-century conservation, which recovered the monument's isolation and destroyed the evidence of its medieval use.",
    ],
    fragments: [],
    primarySources: [
      S(
        "Anabasis of Alexander",
        "6.29",
        "Arrian, using Aristobulus who entered the chamber: the golden coffin, the couch, the tapestries and clothing, the magi with their daily sheep, and the state in which Alexander found it on his return. The fullest ancient description of any Persian royal burial.",
        "Arrian",
      ),
      S(
        "Geography",
        "15.3.7",
        "Strabo, drawing on the same tradition, gives the tomb's description and a version of the epitaph asking the passer-by not to grudge the monument.",
        "Strabo",
      ),
      S(
        "Cyropaedia",
        "8.7",
        "Xenophon's deathbed speech for Cyrus, in which the king asks not to be enclosed in gold or silver but returned to the earth. Philosophical fiction, and it contradicts what Alexander's officers say they saw.",
        "Xenophon",
      ),
    ],
    disputes: [
      {
        question: "Was there an inscription?",
        positions:
          "Arrian and Strabo transmit an epitaph — that the passer-by should not grudge this monument to the man who won the Persians an empire. No trace of any inscription survives on the tomb, and the surfaces where one might have been are intact enough that its absence is meaningful. The epitaph may have been on a separate element, may be a Greek literary composition, or may have been reported at second hand.",
        level: "disputed",
      },
      {
        question: "Where does the form come from?",
        positions:
          "Comparisons have been made to Lydian tumuli, Urartian tombs, Anatolian gabled sarcophagi and Mesopotamian stepped platforms. None is close. The building may be a deliberate synthesis, or a local Fars type of which nothing else survives.",
        level: "unknown",
      },
    ],
    museumSlugs: ["national-museum-of-iran"],
    objectSlugs: [],
    institutionRefs: ["satrap"],
    religionRefs: ["zoroastrian-practice", "animal-sacrifice"],
    battleRefs: [],
    warfareRefs: [],
    figureRefs: ["cyrus-the-great", "alexander", "arrian", "xenophon", "herodotus"],
    themeRefs: ["persian-kingship", "royal-legitimacy", "kingship-and-legitimacy"],
    bookRefs: ["cyropaedia", "anabasis-of-alexander", "cyrus-cylinder"],
    relatedMonuments: ["tomb-of-darius-i", "apadana"],
    mapSlugs: ["persian-empire"],
    imageSlug: "tomb-of-cyrus",
  },
  {
    slug: "tomb-of-darius-i",
    title: "The Tomb of Darius I",
    kind: "funerary",
    region: "near-eastern",
    standfirst:
      "The only Achaemenid rock tomb whose occupant is named by its own inscriptions — and the one that carries the king's statement of what a ruler should be.",
    description:
      "The tomb of Darius I at Naqsh-e Rustam — the cruciform façade, the throne carried by the peoples of the empire, and the DNa and DNb inscriptions.",
    civilizations: ["achaemenid-empire", "persia", "persian-imperial-system"],
    siteSlug: "naqsh-e-rustam",
    modernLocation: "Naqsh-e Rustam, Fars, Iran",
    architectureRefs: ["necropolis", "mausoleum", "columns-and-capitals"],
    chronology: {
      built: { year: -486, precision: "range-endpoint", display: "completed before 486 BCE" },
      display: "Cut during Darius's reign and completed before his death in 486 BCE",
      status: "documented",
      phases: [
        {
          label: "Cutting the tomb",
          display: "before 486 BCE",
          level: "documented",
          note: "The inscriptions are Darius's own and were cut while he lived; the tomb was prepared in advance, as Achaemenid royal tombs were.",
        },
        {
          label: "Robbery",
          display: "antiquity",
          level: "probable",
          note: "The chambers were empty when first recorded. When they were emptied is not known; Alexander's period is one possibility among several.",
        },
        {
          label: "Sasanian reliefs below",
          display: "3rd–4th centuries CE",
          level: "documented",
          note: "Cut beneath and between the Achaemenid tombs eight centuries later by a new Persian dynasty, without disturbing them.",
        },
      ],
    },
    attributions: [
      {
        name: "Darius I",
        role: "patron",
        level: "documented",
        basis:
          "The inscriptions DNa and DNb, cut on the façade in Old Persian, Elamite and Babylonian, are in his name and identify the tomb. No other Achaemenid rock tomb carries a royal name.",
        figureSlug: "darius-i",
      },
    ],
    originalFunction: [
      "A royal tomb: a cross-shaped façade cut into the cliff about fifteen metres above the ground, with a doorway at the centre of the cross leading to three chambers, each holding three rock-cut troughs for burials.",
      "Nine burial places in one tomb indicates a family sepulchre rather than a single grave, though who else was interred there is not recorded.",
    ],
    materials: [
      { material: "Living rock", use: "The entire monument, cut rather than built — there is no masonry", level: "documented" },
    ],
    measurements: [
      {
        label: "Façade",
        value: "about 23 m high overall",
        basis: "Modern survey of the cliff face.",
        level: "documented",
      },
      {
        label: "Height above ground",
        value: "about 15 m to the doorway",
        basis: "Modern survey. The tomb is unreachable without scaffolding, which is presumably the point.",
        level: "documented",
      },
      {
        label: "Throne-bearers",
        value: "thirty figures, labelled",
        basis: "Count of the figures and of their inscribed trilingual labels on the relief.",
        level: "documented",
      },
    ],
    construction: [
      "The cross form quotes a building: the lower arm is a blind columned porch with four engaged columns and bull capitals, so that the façade presents the front of a palace cut into a cliff.",
      "Above it, a two-tier platform carried by thirty labelled figures in the dress of the empire's peoples, with the king standing on it before a fire altar under a winged figure and a disc.",
      "The whole is carved, not built, and the technical achievement is a matter of scaffolding and of cutting to a plan on a vertical rock face fifteen metres up.",
    ],
    politicalMeaning: [
      "The throne-bearers are the empire's constitutional theory in an image. Thirty peoples, each named, each in their own dress, hold the king up; the arrangement is not of subjects beneath a conqueror but of a structure supported by its parts. Read beside Greek accounts of Persian despotism, it is a different account of the same state, offered by the state itself.",
      "DNb is the closest thing to a Persian statement of what a king should be: that he holds himself in control, that he does not act on anger, that he judges by what he knows rather than by what is said, that he rewards and punishes by merit, and that he is trained to ride, to shoot and to spear. It is a document about self-command written by an autocrat, and it belongs beside the Greek philosophical material on rulership rather than in a footnote to it.",
    ],
    religiousMeaning: [
      "The king stands before a fire altar under a winged disc and the inscription names Ahuramazda as the giver of his kingship. That is Achaemenid royal ideology stated plainly; it is not, by itself, evidence for the doctrines of the Zoroastrian texts written centuries later.",
      "The rock-cut chamber burial is again hard to square with the exposure of the dead that later Zoroastrian practice requires.",
    ],
    laterHistory: [
      "Emptied in antiquity. The cliff was reused by the Sasanians for their own reliefs, cut below the tombs, and one Elamite relief older than all of it was largely cut away in the process.",
      "Recorded by European travellers from the seventeenth century and studied systematically by Herzfeld and by Erich Schmidt in the 1930s.",
    ],
    survival: {
      condition: "standing",
      level: "documented",
      note: "The façade, reliefs and inscriptions are intact and legible. The chambers are empty. Weathering of the rock is the principal conservation concern.",
    },
    archaeology: [
      "Because the tomb is cut and not built, and because it was never buried, its evidence has always been the surface itself; the excavation at Naqsh-e Rustam concentrated on the Ka'ba-ye Zartosht and the ground below.",
      "The identification of the three unnamed tombs on the same cliff as Xerxes I, Artaxerxes I and Darius II rests on their position and style relative to this one, which makes Darius's inscribed tomb the anchor for the whole group.",
    ],
    fragments: [],
    primarySources: [
      S(
        "The tomb inscriptions",
        "DNa and DNb",
        "Darius's list of the lands he holds, his attribution of the kingship to Ahuramazda, and his account of his own conduct as a ruler. Cut on the façade in three languages.",
        "Darius I",
      ),
      S(
        "Histories",
        "3.88–97",
        "Herodotus on Darius's organisation of the empire into satrapies and their tribute — the same empire, listed by an outsider for a different purpose.",
        "Herodotus",
      ),
      S(
        "Library of History",
        "17.71.7",
        "Diodorus on the tombs of the Persian kings cut high in a rock face and reachable only by machines.",
        "Diodorus Siculus",
      ),
    ],
    disputes: [
      {
        question: "Who else was buried in it?",
        positions:
          "Nine burial troughs in three chambers imply a family tomb. Ctesias reports a story that Darius's parents died trying to be hauled up to the tomb while it was being cut. Nothing identifies any occupant, and the chambers were empty when recorded.",
        level: "unknown",
      },
    ],
    museumSlugs: ["national-museum-of-iran"],
    objectSlugs: ["susa-archer-frieze-louvre"],
    institutionRefs: ["satrap", "imperial-administration"],
    religionRefs: ["zoroastrian-practice"],
    battleRefs: ["marathon"],
    warfareRefs: ["persian-army", "persian-warfare"],
    figureRefs: ["darius-i", "xerxes-i", "artaxerxes-i", "herodotus"],
    themeRefs: ["persian-kingship", "satrapies", "royal-legitimacy", "kingship-and-legitimacy"],
    bookRefs: ["behistun-inscription", "herodotus-histories", "persica"],
    relatedMonuments: ["tomb-of-cyrus", "apadana", "palace-of-darius"],
    mapSlugs: ["persian-empire"],
    imageSlug: "tomb-of-darius-naqsh-e-rustam",
  },
  // ─── Egypt ───────────────────────────────────────────────────────────
  {
    slug: "great-pyramid",
    title: "The Great Pyramid of Giza",
    alternateNames: ["The Pyramid of Khufu", "Akhet Khufu"],
    kind: "funerary",
    region: "egyptian",
    standfirst:
      "Two and a quarter million blocks on a base levelled to a couple of centimetres across thirteen acres, containing three chambers, no body, and one painted inscription naming the king.",
    description:
      "The Great Pyramid — Petrie's survey, the Grand Gallery and the relieving chambers, the gang marks that name Khufu, the Merer papyri, and what is still unknown about how it was built.",
    civilizations: ["egypt", "old-kingdom"],
    siteSlug: "giza",
    modernLocation: "The Giza plateau, Egypt",
    architectureRefs: ["pyramid", "necropolis", "construction-methods", "building-materials"],
    chronology: {
      built: { year: -2560, precision: "approximate", display: "c. 2560 BCE" },
      display: "Built in the reign of Khufu, c. 2580–2560 BCE",
      status: "probable",
      phases: [
        {
          label: "Construction",
          display: "c. 2580–2560 BCE",
          level: "probable",
          note: "Within Khufu's reign, whose length is given by later king lists as twenty-three years and by other sources as longer. The Merer papyri date to the year after the thirteenth cattle count, late in the reign, and record casing stone still arriving.",
        },
        {
          label: "The casing stripped",
          display: "medieval",
          level: "documented",
          note: "The fine Tura limestone casing was taken for building in Cairo, principally after earthquake damage in the fourteenth century. A few casing blocks remain at the base on the north side.",
        },
        {
          label: "Entered and explored",
          display: "9th century onwards",
          level: "documented",
          note: "The forced passage attributed to al-Ma'mun's expedition is the entrance visitors now use. The original entrance is higher and to the east of it.",
        },
      ],
    },
    attributions: [
      {
        name: "Khufu",
        role: "patron",
        level: "documented",
        basis:
          "Painted gang marks in the relieving chambers above the King's Chamber carry his cartouche. They are in spaces that were sealed at construction and were first entered in 1837, and the gang names match those in the contemporary Wadi al-Jarf papyri.",
        figureSlug: "khufu",
      },
      {
        name: "Hemiunu",
        role: "architect",
        level: "disputed",
        basis:
          "A vizier and king's relative whose mastaba stands in the western cemetery and whose titles include overseer of all the king's works. The titles are documented; the inference that he designed this pyramid is modern.",
      },
    ],
    originalFunction: [
      "A royal tomb, and the centre of a complex: a valley temple by the canal, a causeway, a mortuary temple against the east face, three small queens' pyramids, boat pits, and a planned cemetery of mastabas for the court laid out on a grid.",
      "No burial was found. The granite sarcophagus in the King's Chamber is in place, lidless and empty, and is wider than the ascending passage, which means it was installed as the building rose.",
    ],
    materials: [
      { material: "Local limestone", use: "The core blocks, quarried a few hundred metres away on the plateau", level: "documented" },
      { material: "Tura limestone", use: "The fine white casing, quarried across the river and delivered by boat — the cargo the Merer papyri record", level: "documented" },
      { material: "Aswan granite", use: "The King's Chamber, its roof beams, the portcullis blocks and the sarcophagus, brought some eight hundred kilometres downstream", level: "documented" },
      { material: "Copper and stone tools, wood, rope", use: "Quarrying, dressing and transport; no iron and no wheeled vehicles are attested for the work", level: "documented" },
    ],
    measurements: [
      {
        label: "Original height",
        value: "about 146.6 m; now about 138.5 m",
        basis: "Petrie's survey and later measurement, reconstructing the apex from the surviving slope. The original figure corresponds to 280 royal cubits.",
        level: "documented",
      },
      {
        label: "Base",
        value: "about 230.3 m a side",
        basis: "Petrie's survey of the socket corners. The figure corresponds to 440 royal cubits.",
        level: "documented",
      },
      {
        label: "Levelling of the base",
        value: "the corners differ in height by about 2 cm",
        basis: "Modern survey. This is the measurement that says most about the surveying, and it is a measurement rather than an estimate.",
        level: "documented",
      },
      {
        label: "Number of blocks",
        value: "roughly 2.3 million",
        basis:
          "A modern calculation from the pyramid's volume and an assumed average block size. It is an estimate and is quoted as a fact more often than any other figure about the building.",
        level: "probable",
      },
      {
        label: "The Grand Gallery",
        value: "about 46.7 m long and 8.6 m high",
        basis: "Modern survey of the interior.",
        level: "documented",
      },
    ],
    construction: [
      "The interior is unlike any other pyramid. A descending passage runs into the bedrock to an unfinished subterranean chamber; an ascending passage branches from it to the Queen's Chamber and to the corbelled Grand Gallery, which rises to the King's Chamber. Above that chamber are five hollow spaces separated by granite beams and roofed by a gable, which distribute the load of the masonry above.",
      "The Grand Gallery's function is argued. Its corbelled walls, its slots and its ramps have been read as housing a counterweight system for hauling the granite portcullis blocks, and as an architectural solution to bridging a long ascending void. Both readings are reconstructions.",
      "How the blocks were raised is unknown. Straight ramps require more material than the pyramid itself at the necessary length; spiral ramps obstruct the corners and the surveying; an internal ramp has been proposed from density anomalies and is unproven. No ramp has been excavated at Giza in a state that settles it, and no Egyptian source describes the method.",
      "What is documented is the logistics. The Merer papyri record a boat crew making repeated trips with Tura limestone, working to a schedule, under an inspector, through a canal system reaching the foot of the plateau.",
    ],
    politicalMeaning: [
      "The pyramid is the largest single object the Old Kingdom state produced and the clearest measure of what it could organise. The workers' settlement excavated south-east of the plateau — bakeries, breweries, gallery accommodation, cattle brought from estates — describes a provisioned, rotating workforce rather than slaves, and the workers' cemetery contains people who broke bones and were treated and survived.",
      "That is not a small correction. The slave story descends from Herodotus, two thousand years later, and from much later religious narrative, and it has no support in Egyptian evidence of any period.",
      "Herodotus also reports that Khufu was remembered as an impious tyrant who closed the temples. That tradition is Late Period and tells us how Egyptians two millennia later thought about a king who had built the largest thing in their country.",
    ],
    religiousMeaning: [
      "The pyramid is a tomb within a cult complex, and the cult — offerings at the mortuary temple, a priesthood, endowed estates — was the point of the whole arrangement. Pyramid Texts do not appear until the end of the Fifth Dynasty, so the theology attached to this building is not written down anywhere.",
      "The shafts running from the King's and Queen's Chambers towards the exterior have been read as ventilation and as routes for the king's ascent to the stars. Robotic exploration found blocking stones with copper fittings and further blockings beyond. Their purpose is undetermined.",
    ],
    laterHistory: [
      "Robbed at an unknown date; the sealed passages were breached and the sarcophagus emptied. Entered in the medieval period through a forced tunnel.",
      "Stripped of its casing for Cairo's buildings. Measured by Napoleon's savants, then by Vyse and Perring with gunpowder, then by Petrie with instruments.",
      "Since 2015 the ScanPyramids project has used muon tomography to image the interior without opening it, reporting a large void above the Grand Gallery and, later, a corridor behind the chevron blocks on the north face. Both have been independently confirmed as voids; what they are for is not established.",
    ],
    survival: {
      condition: "standing",
      level: "documented",
      note: "Standing, stripped of its casing and its apex, with the interior accessible. It is the only one of the Seven Wonders that still exists.",
    },
    archaeology: [
      "Petrie's survey of 1880–82 established the dimensions and the accuracy of the construction, and demolished the numerological theories he had gone to test.",
      "The workers' settlement and cemetery, excavated since the 1980s and 1990s, established who built it and how they were fed and housed.",
      "The Merer papyri, found in 2013 at a Red Sea harbour four hundred kilometres away, are the only contemporary written account of the work.",
    ],
    fragments: [
      {
        what: "Casing blocks and fragments removed over centuries",
        level: "documented",
        museumSlug: "british-museum",
      },
      {
        what: "The reassembled cedar boat from the pit on the south side",
        level: "documented",
        heldAt: "Grand Egyptian Museum, Giza",
      },
    ],
    primarySources: [
      S(
        "Histories",
        "2.124–126",
        "Herodotus on the building: a hundred thousand men in three-month shifts, twenty years, machines of short timbers, and Cheops remembered as a tyrant. Written about two thousand years after the event.",
        "Herodotus",
      ),
      S(
        "The diary of Merer",
        "Papyrus Jarf A and B",
        "The logbook of a boat crew ferrying Tura limestone to Akhet Khufu, with dates and named officials. The oldest inscribed papyri known and the only contemporary document of the construction.",
      ),
    ],
    disputes: [
      {
        question: "How were the blocks raised?",
        positions:
          "Straight, zigzag, spiral, internal and hybrid ramps have all been argued, along with lever-based lifting in stages. Every proposal has a serious objection, usually about the volume of ramp material or the geometry near the top. Nothing has been excavated that settles it, and the honest answer is that it is not known.",
        level: "unknown",
      },
      {
        question: "What are the voids found by muon imaging?",
        positions:
          "The large void above the Grand Gallery, announced in 2017, and the corridor behind the north-face chevrons, announced in 2023, are confirmed as spaces. Whether they are construction voids serving a structural purpose, unfinished passages, or chambers is not established, and no direct access has been made.",
        level: "unknown",
      },
      {
        question: "Are the gang marks genuine?",
        positions:
          "A claim that Vyse forged the cartouches in the relieving chambers in 1837 has circulated since the nineteenth century. It is not accepted: the marks are in spaces sealed since construction, they are painted in a workmen's hand consistent with other Old Kingdom quarry marks, and the gang names recur independently in the Wadi al-Jarf papyri found in 2013, which Vyse could not have known.",
        level: "disputed",
      },
    ],
    museumSlugs: ["british-museum", "louvre"],
    objectSlugs: [],
    institutionRefs: ["pharaonic-administration"],
    religionRefs: ["mummification", "egyptian-temple-economy"],
    battleRefs: [],
    warfareRefs: ["logistics"],
    figureRefs: ["khufu", "herodotus", "imhotep"],
    themeRefs: ["sacred-kingship-in-egypt", "monumentality", "administrative-state", "afterlife-and-order"],
    bookRefs: ["herodotus-histories"],
    relatedMonuments: ["step-pyramid-of-djoser", "great-hypostyle-hall"],
    mapSlugs: ["egypt"],
    imageSlug: "great-pyramid-khufu",
  },
  {
    slug: "step-pyramid-of-djoser",
    title: "The Step Pyramid of Djoser",
    kind: "funerary",
    region: "egyptian",
    standfirst:
      "The first large stone building in the world, put up by a man whose name survives on a statue base of his own king — and built as a copy in stone of an architecture made of reeds and mud.",
    description:
      "The Step Pyramid — the enclosure of dummy buildings, the construction sequence visible in its own fabric, Imhotep's contemporary attestation, and the seventy-five-year restoration by Jean-Philippe Lauer.",
    civilizations: ["egypt", "old-kingdom"],
    siteSlug: "saqqara",
    modernLocation: "Saqqara, Egypt",
    architectureRefs: ["pyramid", "necropolis", "columns-and-capitals", "construction-methods"],
    chronology: {
      built: { year: -2650, precision: "range-endpoint", display: "c. 2670–2650 BCE" },
      display: "Built in the reign of Djoser, Third Dynasty",
      status: "probable",
      phases: [
        {
          label: "The first mastaba",
          display: "c. 2670 BCE",
          level: "documented",
          note: "Begun as a square flat-topped mastaba, unusual in being square rather than rectangular. The stages of its enlargement are visible in the fabric where the outer casing has fallen away.",
        },
        {
          label: "Enlargement to a stepped pyramid",
          display: "c. 2665–2650 BCE",
          level: "documented",
          note: "Extended twice as a mastaba, then raised as a four-step and finally a six-step pyramid. The sequence is legible in section and is the earliest surviving record of a building's design changing while it was under construction.",
        },
        {
          label: "Restoration by Nabopolassar's era and after",
          display: "Late Period",
          level: "documented",
          note: "The complex was still a place of pilgrimage two thousand years later; visitors' graffiti in hieratic record admiration for a monument already ancient.",
        },
        {
          label: "Modern restoration",
          display: "1926–2020",
          level: "documented",
          note: "Jean-Philippe Lauer worked on the complex for some seventy-five years, re-erecting the enclosure wall and the entrance colonnade from fallen blocks. A structural consolidation of the pyramid's interior and exterior ran from 2006 and was completed in 2020, and was contested at the time.",
        },
      ],
    },
    attributions: [
      {
        name: "Djoser",
        role: "patron",
        level: "documented",
        basis: "His name and titulary appear throughout the complex, including on the statue base from the serdab area.",
      },
      {
        name: "Imhotep",
        role: "architect",
        level: "probable",
        basis:
          "A statue base of Djoser from the complex carries Imhotep's name and titles, including chief of sculptors and carpenters — contemporary evidence that he was Djoser's senior official. That he designed the pyramid is an inference from that association, and it is the earliest architect attribution anywhere that rests on contemporary evidence at all.",
        figureSlug: "imhotep",
      },
    ],
    originalFunction: [
      "A royal tomb inside a walled enclosure of about fifteen hectares containing a set of buildings for the king's eternal performance of the Sed festival — the ritual renewal of kingship — with a court to run in, chapels to visit, and thrones to sit on.",
      "Almost none of those buildings has an interior. They are solid cores with false doors and doors carved permanently open, built for a rite the dead king would perform for ever and which nobody living was expected to attend.",
    ],
    materials: [
      { material: "Local limestone in small blocks", use: "The entire structure, laid in courses of roughly mudbrick size — a masonry technique derived directly from brickwork", level: "documented" },
      { material: "Fine Tura limestone", use: "The casing of the enclosure wall and the finer architectural elements", level: "documented" },
      { material: "Blue faience tiles", use: "Chambers beneath the pyramid and in the South Tomb, set to imitate reed matting", level: "documented" },
    ],
    measurements: [
      {
        label: "Height",
        value: "about 60 m in six stages",
        basis: "Modern survey.",
        level: "documented",
      },
      {
        label: "Base",
        value: "about 121 × 109 m",
        basis: "Modern survey.",
        level: "documented",
      },
      {
        label: "Enclosure",
        value: "about 545 × 277 m",
        basis: "Modern survey of the panelled wall and its foundations.",
        level: "documented",
      },
      {
        label: "Subterranean galleries",
        value: "some 6 km of tunnels and shafts",
        basis: "Modern survey and mapping of the accessible system.",
        level: "probable",
      },
    ],
    construction: [
      "The blocks are small — a man can lift many of them — because the builders were working in a technique carried over from mudbrick and had not yet learned what stone could do. Everything after this uses larger blocks; nothing before this uses stone at all at this scale.",
      "The whole enclosure is a translation. Engaged fluted columns imitate bundled reeds; the wall's panelling copies a mudbrick palace façade; ceilings are carved as if they were palm logs; the faience tiles reproduce reed matting. A perishable architecture that had already disappeared was reproduced in a material that would not.",
      "The columns are engaged rather than free-standing throughout — attached to walls or to spur walls — which is generally read as caution about what an untried material would carry.",
    ],
    politicalMeaning: [
      "Building in stone at this scale is a claim about permanence made by a state that had only just acquired the capacity to make it. The Third Dynasty is where centralised Egyptian government becomes archaeologically visible on a large scale, and this is the object.",
      "Imhotep's later career is a fact about Egyptian memory rather than about the Third Dynasty. He was deified as a god of healing two thousand years later, identified by Greeks with Asklepios, and given a cult at Saqqara whose site has never been found despite a deliberate search for it.",
    ],
    religiousMeaning: [
      "The Sed festival buildings are the complex's organising idea: the king's renewal, performed in perpetuity in a court he could never leave. It is the earliest large architectural expression of Egyptian royal ideology and it predates any surviving text of that ideology.",
      "The serdab against the north face held a seated statue of the king positioned to look out through two holes at eye level — so that the statue could see the offerings and the north stars. The statue is in Cairo and a copy is in place.",
    ],
    laterHistory: [
      "Robbed in antiquity; the burial chamber under the pyramid was emptied. Visited and admired throughout the pharaonic period, with New Kingdom graffiti recording tourists.",
      "Buried in sand until the nineteenth century. Cleared and studied from 1926 by Cecil Firth and James Quibell, and then for three-quarters of a century by Lauer.",
    ],
    survival: {
      condition: "standing",
      level: "documented",
      note: "The pyramid stands in six stages, stripped of casing. Much of the enclosure has been re-erected from its own blocks by Lauer; what a visitor sees is a real building substantially reassembled, and the reassembly is documented.",
    },
    restoration: [
      "Lauer's anastylosis, from 1926 to the end of the twentieth century, re-erected the entrance colonnade, sections of the enclosure wall and several of the dummy chapels from fallen material. It is one of the longest single-site restoration careers in the history of the discipline.",
      "The 2006–2020 consolidation of the pyramid itself, using airbags to support the burial chamber ceiling and mortar injection in the fabric, was criticised while in progress for the character of the intervention. It was completed and the monument reopened.",
    ],
    archaeology: [
      "The construction sequence is readable in the fabric because the successive enlargements were cased and then extended, so the earlier faces survive inside the later ones. Very few ancient buildings expose their own design history this clearly.",
      "Excavation of the galleries recovered tens of thousands of stone vessels, many of them inscribed with names of First and Second Dynasty kings — material older than the pyramid, gathered and reburied under it.",
    ],
    fragments: [
      {
        what: "The seated statue of Djoser from the serdab",
        level: "documented",
        heldAt: "Egyptian Museum, Cairo",
      },
      {
        what: "The statue base naming Imhotep",
        level: "documented",
        heldAt: "Egyptian Museum, Cairo",
      },
      {
        what: "Blue faience tiles from the subterranean chambers",
        level: "documented",
        museumSlug: "louvre",
      },
    ],
    disputes: [
      {
        question: "Did Imhotep design it?",
        positions:
          "The statue base establishes that Imhotep was Djoser's senior official with titles covering craft and construction. It does not say he designed the pyramid. The inference is reasonable and universal, and it is an inference; Egyptian practice attributes buildings to kings, and the role of an overseer of works in the design as opposed to the administration of a project is nowhere described.",
        level: "probable",
      },
      {
        question: "Why is the enclosure full of buildings with no interiors?",
        positions:
          "The usual reading is that the complex is a permanent stage for the king's eternal Sed festival, and the solid chapels and false doors support it. Others have read parts of the enclosure as a translation of a real royal residence at Memphis, which would make it a portrait of a building rather than a ritual apparatus. Both readings work from the same evidence, which is the architecture itself.",
        level: "disputed",
      },
    ],
    primarySources: [],
    noAncientTestimony:
      "No ancient author describes this complex. Egyptian texts of later periods mention Djoser and, much later, Imhotep, and the Ptolemaic Famine Stela at Sehel invokes both — but it is a Ptolemaic composition claiming ancient authority, not a Third Dynasty record. Everything on this page comes from the building and from what was found in it.",
    museumSlugs: ["louvre", "british-museum"],
    objectSlugs: [],
    institutionRefs: ["pharaonic-administration"],
    religionRefs: ["mummification", "egyptian-temple-economy", "animal-cults-and-votive-mummies"],
    battleRefs: [],
    warfareRefs: [],
    figureRefs: ["imhotep", "khufu"],
    themeRefs: ["sacred-kingship-in-egypt", "monumentality", "administrative-state", "afterlife-and-order"],
    bookRefs: [],
    relatedMonuments: ["great-pyramid", "mortuary-temple-of-hatshepsut"],
    mapSlugs: ["egypt"],
    imageSlug: "step-pyramid-djoser",
  },
  {
    slug: "great-hypostyle-hall",
    title: "The Great Hypostyle Hall at Karnak",
    kind: "temple",
    region: "egyptian",
    standfirst:
      "A hundred and thirty-four columns under a stone roof lit by clerestory windows — the same lighting principle a Roman basilica would reach fifteen centuries later, arrived at independently.",
    description:
      "The Great Hypostyle Hall — Seti I and Ramesses II, the raised and sunk relief that divides the room, the clerestory, the collapse of 1899, and the battle records on its walls.",
    civilizations: ["egypt", "new-kingdom"],
    siteSlug: "karnak",
    modernLocation: "The precinct of Amun-Re, Karnak, Egypt",
    architectureRefs: ["temple", "columns-and-capitals", "construction-methods", "building-materials"],
    chronology: {
      built: { year: -1220, precision: "range-endpoint", display: "c. 1290–1220 BCE" },
      display: "Built and decorated under Seti I and Ramesses II",
      status: "documented",
      phases: [
        {
          label: "The central colonnade",
          display: "possibly under Amenhotep III or Horemheb",
          level: "disputed",
          note: "The twelve great columns of the central aisle may predate the hall around them. The evidence is the masonry and the cartouches, both of which have been read in more than one way.",
        },
        {
          label: "Seti I",
          display: "c. 1290–1279 BCE",
          level: "documented",
          note: "The hall built out around the central colonnade, and the northern half decorated in raised relief.",
        },
        {
          label: "Ramesses II",
          display: "c. 1279–1213 BCE",
          level: "documented",
          note: "The southern half decorated in sunk relief, and much of Seti's raised relief later recut. The change of technique is visible on a single walk through the room.",
        },
        {
          label: "Collapse and re-erection",
          display: "1899–1900s",
          level: "documented",
          note: "Eleven columns fell in October 1899, undermined by groundwater and salt. Georges Legrain re-erected them and underpinned the rest.",
        },
      ],
    },
    attributions: [
      {
        name: "Seti I",
        role: "patron",
        level: "documented",
        basis: "His cartouches and his raised relief decoration across the northern half of the hall.",
      },
      {
        name: "Ramesses II",
        role: "completed-by",
        level: "documented",
        basis: "His cartouches and sunk relief across the southern half, and his recutting of parts of his father's work.",
        figureSlug: "ramesses-ii",
      },
    ],
    originalFunction: [
      "The processional hall of the temple of Amun-Re, standing between the second and third pylons on the temple's main axis. The god's barque was carried through it in procession, and the hall's central aisle is the route.",
      "Only priests entered. The hall is dark by design, with the light concentrated on the processional axis, and the deeper into an Egyptian temple one goes the more restricted the access becomes — the reverse of a Greek temple, which is essentially a box in the open.",
    ],
    materials: [
      { material: "Sandstone", use: "Columns, architraves and roof slabs, quarried at Gebel el-Silsila and brought downstream", level: "documented" },
      { material: "Paint", use: "The entire interior was painted; substantial colour survives high on the columns and under the architraves where weather has not reached", level: "documented" },
    ],
    measurements: [
      {
        label: "Floor area",
        value: "about 102 × 53 m",
        basis: "Modern survey.",
        level: "documented",
      },
      {
        label: "Columns",
        value: "134 in 16 rows; the central 12 about 21 m tall with open papyrus capitals, the rest about 15 m with closed bud capitals",
        basis: "Modern survey and count.",
        level: "documented",
      },
      {
        label: "Central capitals",
        value: "about 5.4 m across the abacus",
        basis: "Modern survey.",
        level: "documented",
      },
    ],
    construction: [
      "The hall works by height difference. Twelve tall columns down the centre carry a roof higher than the roof over the flanking forest of shorter ones, and the gap between the two levels is filled with stone window grilles. Light enters at clerestory level and falls down the central aisle.",
      "That is the same solution a Roman basilica uses and, later, a Gothic cathedral, and it was reached here first and independently. It is the strongest single argument against treating Egyptian architecture as a static tradition.",
      "The columns are built of drums, closely spaced because a stone architrave can only span so far. The result is a room that cannot be seen across — a deliberate effect, and a consequence of the material.",
    ],
    politicalMeaning: [
      "The exterior walls carry battle records: Seti I's campaigns in the Levant on the north wall, and on the south the Karnak version of Ramesses II's account of Kadesh. A processional hall doubles as a public register of royal victory, on the outside where people could see it.",
      "The Kadesh account is the most instructive. Ramesses records a great victory; the Hittite record and the treaty that followed describe a stalemate and a negotiated frontier. Having both is unusual in ancient history, and the wall is where the Egyptian version was published.",
      "The recutting of Seti's raised relief into sunk relief under Ramesses is a small piece of the same politics: sunk relief is harder to alter, and a son revising his father's work on his father's building is making a point about whose hall it is.",
    ],
    religiousMeaning: [
      "The columns are papyrus stalks — open flowers along the lit central aisle, closed buds in the darker aisles — so the hall is a marsh, and the temple as a whole is a model of the world at its creation, with the sanctuary as the first mound to rise from the water.",
      "The temple economy that supported this is documented from the papyri: land, herds, personnel and ships assigned to Amun, whose Theban holdings were by far the largest in Egypt.",
    ],
    laterHistory: [
      "In use and being added to for a thousand years after it was built. Abandoned with the rest of the precinct in late antiquity; a Christian community occupied parts of Karnak.",
      "Cleared from the nineteenth century. The collapse of 1899 forced a systematic engineering response, and groundwater and salt remain the principal threat.",
    ],
    survival: {
      condition: "standing",
      level: "documented",
      note: "The columns and much of the architrave system stand; most of the roof slabs are gone, so the hall is open to the sky except in a few bays where the roofing survives and the original darkness can be experienced.",
    },
    restoration: [
      "Legrain's re-erection of the eleven fallen columns after 1899 was followed by decades of underpinning and by the ongoing work of the Franco-Egyptian centre, including the dismantling and rebuilding of individual columns.",
    ],
    archaeology: [
      "Epigraphic recording of the hall's walls, column by column, has been in progress for decades and is the main scholarly output of the site — the surfaces carry thousands of square metres of relief and text.",
      "Study of the fabric has raised the question of whether the central colonnade predates the hall, which if correct would change the attribution of the building's conception.",
    ],
    fragments: [
      {
        what: "Blocks and column drums removed in the nineteenth century",
        level: "documented",
        museumSlug: "louvre",
      },
    ],
    primarySources: [
      S(
        "The Karnak battle reliefs of Seti I",
        "north exterior wall",
        "Campaign records in relief with accompanying text, covering operations in the Levant. Royal publication on a temple wall.",
      ),
      S(
        "The Kadesh inscriptions of Ramesses II",
        "Karnak, south wall, and other copies",
        "The Poem and the Bulletin, recording the battle of 1274 BCE as a victory won by the king almost alone. The Hittite record and the subsequent treaty describe a very different outcome.",
        "Ramesses II",
      ),
      S(
        "Histories",
        "2.42",
        "Herodotus on the Theban cult of Amun, whom he identifies with Zeus, and on the ram taboo — a Greek visitor's account of the cult a thousand years after the hall was built.",
        "Herodotus",
      ),
    ],
    disputes: [
      {
        question: "Who began the hall?",
        positions:
          "The central colonnade has been assigned to Amenhotep III, to Horemheb and to Seti I, on the evidence of masonry technique, foundation levels and cartouches that have in places been recut. If the colonnade is earlier, Seti built a hall around an existing processional avenue rather than conceiving the room.",
        level: "disputed",
      },
    ],
    museumSlugs: ["louvre", "british-museum"],
    objectSlugs: [],
    institutionRefs: ["pharaonic-administration"],
    religionRefs: ["egyptian-temple-economy", "the-sacred-calendar", "animal-sacrifice"],
    battleRefs: [],
    warfareRefs: ["egyptian-warfare", "egyptian-army"],
    figureRefs: ["ramesses-ii", "hatshepsut", "thutmose-iii", "herodotus"],
    themeRefs: ["sacred-kingship-in-egypt", "state-and-religion", "monumentality", "administrative-state"],
    bookRefs: ["herodotus-histories"],
    relatedMonuments: ["luxor-temple", "abu-simbel", "mortuary-temple-of-hatshepsut"],
    mapSlugs: ["egypt"],
    imageSlug: "karnak-hypostyle",
  },
  {
    slug: "luxor-temple",
    title: "Luxor Temple",
    alternateNames: ["Ipet-resyt"],
    kind: "temple",
    region: "egyptian",
    standfirst:
      "A temple with a working mosque built into its courtyard eight metres above the ancient floor, a Roman legionary chapel painted over its sanctuary, and one of its obelisks in Paris.",
    description:
      "Luxor Temple — Amenhotep III and Ramesses II, the Opet festival, the Roman camp and the imperial cult chamber, the mosque of Abu el-Haggag, and the obelisk in the Place de la Concorde.",
    civilizations: ["egypt", "new-kingdom", "ptolemaic-egypt"],
    unplacedNote:
      "Luxor Temple stands on the east bank at Thebes, about three kilometres south of Karnak. The platform has pages for the Karnak precinct and for the Theban west bank, and none for the ancient city of Thebes itself, so this monument has no parent place here yet.",
    modernLocation: "Luxor, Egypt",
    architectureRefs: ["temple", "columns-and-capitals", "construction-methods"],
    chronology: {
      built: { year: -1350, precision: "approximate", display: "principally c. 1390–1350 BCE" },
      display: "Built under Amenhotep III, extended by Ramesses II, added to for fifteen centuries",
      status: "documented",
      phases: [
        {
          label: "Amenhotep III",
          display: "c. 1390–1350 BCE",
          level: "documented",
          note: "The core of the temple: the sanctuary, the hypostyle, the sun court and the great colonnade, whose decoration was left unfinished.",
        },
        {
          label: "Tutankhamun and Horemheb",
          display: "c. 1330–1290 BCE",
          level: "documented",
          note: "The colonnade decorated with the Opet festival procession — the fullest surviving depiction of an Egyptian festival, completed after the Amarna interlude.",
        },
        {
          label: "Ramesses II",
          display: "c. 1279–1213 BCE",
          level: "documented",
          note: "The pylon, the forecourt, the colossi and the obelisks added at the front, on a slightly different axis from the older building.",
        },
        {
          label: "Alexander and the Romans",
          display: "4th century BCE – 4th century CE",
          level: "documented",
          note: "Alexander rebuilt the barque shrine in granite with his own cartouches; under Diocletian a legionary fortress enclosed the temple and a hall was converted into a chamber of the imperial cult with painted figures of the tetrarchs.",
        },
        {
          label: "The mosque",
          display: "13th century onwards",
          level: "documented",
          note: "The mosque of Abu el-Haggag was built into the forecourt when the temple was buried to that level. When the court was excavated the mosque was left in place, and it is still in use — its door now opens onto a drop.",
        },
      ],
    },
    attributions: [
      {
        name: "Amenhotep III",
        role: "patron",
        level: "documented",
        basis: "His cartouches and building inscriptions throughout the southern part of the temple.",
      },
      {
        name: "Ramesses II",
        role: "patron",
        level: "documented",
        basis: "His cartouches on the pylon, the forecourt and the colossi, and his dedication texts.",
        figureSlug: "ramesses-ii",
      },
      {
        name: "Amenhotep son of Hapu",
        role: "engineer",
        level: "disputed",
        basis:
          "Amenhotep III's overseer of works, attested by his own statues and later deified. His responsibility for this temple specifically is inferred from his titles rather than recorded.",
      },
    ],
    originalFunction: [
      "The southern sanctuary of Amun, and the destination of the Opet festival: once a year the barques of Amun, Mut and Khonsu travelled from Karnak to Luxor, by river or along the sphinx avenue, and the king's own divine nature was renewed inside.",
      "The temple is therefore not primarily a house for a resident god but a stage for a journey, and its plan is a route: pylon, court, colonnade, court, hypostyle, sanctuary, in a straight processional line.",
    ],
    materials: [
      { material: "Sandstone", use: "The temple throughout", level: "documented" },
      { material: "Granite", use: "The obelisks, the colossi and Alexander's barque shrine", level: "documented" },
      { material: "Paint and plaster", use: "The Roman-period imperial cult chamber, painted over the pharaonic relief", level: "documented" },
    ],
    measurements: [
      {
        label: "Overall length",
        value: "about 260 m",
        basis: "Modern survey along the processional axis.",
        level: "documented",
      },
      {
        label: "The great colonnade",
        value: "fourteen columns about 19 m tall",
        basis: "Modern survey.",
        level: "documented",
      },
      {
        label: "The standing obelisk",
        value: "about 25 m",
        basis: "Modern survey. Its twin, about 23 m and the shorter of the pair, has stood in the Place de la Concorde since 1836.",
        level: "documented",
      },
    ],
    construction: [
      "The building's axis bends: Ramesses II's forecourt sits at a slight angle to Amenhotep III's temple, because the new front had to align with the route from Karnak rather than with the older building. The kink is visible on the ground and is a piece of urban planning overriding architectural symmetry.",
      "Ramesses also built his court around three existing barque chapels of Hatshepsut and Thutmose III rather than removing them, so the older structures stand inside the newer court at an angle to it.",
    ],
    politicalMeaning: [
      "The temple's function was the renewal of the king's divinity. The Opet reliefs show the procession, the offerings and the rites; what happened inside the sanctuary is not shown, and the ideology is stated rather than illustrated.",
      "The Roman conversion is the sharpest example anywhere of one imperial cult occupying another's building. A hall on the pharaonic axis was given an apse and painted with the tetrarchs, so that the room where Egyptian kingship was renewed became the room where the Roman emperors were honoured. The paintings survive and have been conserved.",
      "The obelisk in Paris was given to France in 1830 by Muhammad Ali and erected in 1836. The gift and its acceptance are documented; whether such transfers should be revisited is a live question, and Egypt has at times raised the obelisk in that context.",
    ],
    religiousMeaning: [
      "The Opet festival is the best-documented Egyptian festival, because its procession is carved along both walls of the colonnade with the boats, the crowds, the musicians, the offerings and the return. It is the closest thing to a film of an Egyptian religious event.",
      "The mosque of Abu el-Haggag continues a use of the site that has not been interrupted: the saint's annual festival involves boats carried in procession, and the resemblance to the Opet procession has been much discussed. Whether that is continuity or coincidence is not established, and the platform does not assert it.",
    ],
    laterHistory: [
      "Enclosed by a Roman fortress under Diocletian; the modern name Luxor comes from the Arabic for the palaces or fortifications, referring to that camp rather than to the temple.",
      "Buried by settlement debris to a depth of several metres, with a village and the mosque built on top. Cleared by Gaston Maspero from 1881 onwards; the mosque was left standing and the village removed.",
      "The avenue of sphinxes running to Karnak was excavated over decades and reopened along its full length in 2021.",
    ],
    survival: {
      condition: "standing",
      level: "documented",
      note: "Standing to roof level in the sanctuary area and to full height in the colonnade and pylon. One obelisk, two seated colossi and parts of the standing ones survive at the front; the mosque remains in the court.",
    },
    archaeology: [
      "A cache of statues was found under the floor of the sun court in 1989 — over twenty pieces, including a quartzite Amenhotep III, buried in antiquity as the Karnak Cachette material had been. It is the second great statue deposit from Thebes and it was found by chance during floor conservation.",
      "The Roman wall paintings in the imperial cult chamber were conserved and published in a project completed in the 2000s, recovering images that had been covered and then damaged by earlier clearance.",
    ],
    fragments: [
      {
        what: "The western obelisk, in the Place de la Concorde, Paris",
        level: "documented",
        heldAt: "Place de la Concorde, Paris",
      },
      {
        what: "The statue cache from the sun court",
        level: "documented",
        heldAt: "Luxor Museum",
      },
    ],
    primarySources: [
      S(
        "The Opet festival reliefs",
        "the great colonnade, north and south walls",
        "The procession from Karnak to Luxor and back, carved under Tutankhamun and Horemheb: the barques, the escort, the offerings and the crowds. The fullest visual record of an Egyptian festival.",
      ),
      S(
        "Histories",
        "2.42, 2.58–59",
        "Herodotus on Egyptian festivals and processions, and on the Theban cult. A Greek account of practice a thousand years after these reliefs were carved.",
        "Herodotus",
      ),
    ],
    disputes: [
      {
        question: "Is the Abu el-Haggag festival descended from the Opet festival?",
        positions:
          "Both involve boats carried in procession at the same site, and the resemblance has been noted for over a century. Documented continuity across the intervening periods does not exist, and boat processions are not unique to Thebes. It is a striking parallel and it has not been demonstrated as descent.",
        level: "disputed",
      },
    ],
    museumSlugs: ["louvre"],
    objectSlugs: [],
    institutionRefs: ["pharaonic-administration", "imperial-administration"],
    religionRefs: ["egyptian-temple-economy", "the-sacred-calendar", "foreign-cults-at-rome"],
    battleRefs: [],
    warfareRefs: ["egyptian-warfare", "roman-army"],
    figureRefs: ["ramesses-ii", "akhenaten", "diocletian", "alexander"],
    themeRefs: ["sacred-kingship-in-egypt", "state-and-religion", "pharaonic-legitimacy", "monumentality"],
    bookRefs: ["herodotus-histories"],
    relatedMonuments: ["great-hypostyle-hall", "mortuary-temple-of-hatshepsut", "abu-simbel"],
    mapSlugs: ["egypt"],
    imageSlug: "luxor-temple",
  },
  {
    slug: "abu-simbel",
    title: "The Great Temple at Abu Simbel",
    kind: "temple",
    region: "egyptian",
    standfirst:
      "Cut into a cliff in Nubia with four twenty-metre colossi at the door, and cut out of it again in the 1960s, block by block, to escape a lake.",
    description:
      "Abu Simbel — Ramesses II's rock temple, the Kadesh reliefs, the solar alignment, and the UNESCO operation that sawed the whole thing into a thousand pieces and rebuilt it higher up.",
    civilizations: ["egypt", "new-kingdom"],
    unplacedNote:
      "Abu Simbel stands in Lower Nubia, some three hundred kilometres south of Aswan, and now on a site sixty-five metres above and two hundred metres back from where it was carved. The platform covers no city or excavated site in Nubia, so this monument has no parent place here.",
    modernLocation: "Abu Simbel, Aswan Governorate, Egypt",
    architectureRefs: ["temple", "construction-methods", "necropolis"],
    chronology: {
      built: { year: -1244, precision: "range-endpoint", display: "c. 1264–1244 BCE" },
      display: "Cut under Ramesses II, c. 1264–1244 BCE; relocated 1964–1968",
      status: "probable",
      phases: [
        {
          label: "Cutting the temples",
          display: "c. 1264–1244 BCE",
          level: "probable",
          note: "The Great Temple of Ramesses and the smaller temple for Nefertari and Hathor, both cut into the cliff. The twenty-year span is inferred from the reign and from the decoration.",
        },
        {
          label: "Earthquake damage",
          display: "shortly after completion",
          level: "documented",
          note: "One of the four colossi lost its head and torso in antiquity; the fallen pieces lie at its feet, and they were moved with the rest and replaced where they fell.",
        },
        {
          label: "Burial and rediscovery",
          display: "antiquity – 1813",
          level: "documented",
          note: "Buried to the shoulders of the colossi by sand. Reported by Johann Ludwig Burckhardt in 1813 and dug open by Giovanni Belzoni in 1817.",
        },
        {
          label: "Relocation",
          display: "1964–1968",
          level: "documented",
          note: "The whole complex was cut into blocks and rebuilt on higher ground before the reservoir of the Aswan High Dam covered the site.",
        },
      ],
    },
    attributions: [
      {
        name: "Ramesses II",
        role: "patron",
        level: "documented",
        basis: "His cartouches, colossi and dedication texts throughout both temples.",
        figureSlug: "ramesses-ii",
      },
      {
        name: "Unknown",
        role: "architect",
        level: "unknown",
        basis: "No name survives. The viceroy of Kush Iuny and other officials are named in the temple as having overseen work; that is administration rather than design.",
      },
    ],
    originalFunction: [
      "A rock-cut temple of Amun-Re, Re-Horakhty, Ptah and the deified Ramesses himself, on the Nile in Nubia, several hundred kilometres upstream of the Egyptian heartland.",
      "The king is one of the four gods seated in the sanctuary. That is the point of the building: it is where Ramesses II is worshipped as a god in his own lifetime, at the frontier, facing the people the temple is addressed to.",
    ],
    materials: [
      { material: "Nubian sandstone", use: "The living rock the temple is cut into", level: "documented" },
      { material: "Concrete and steel", use: "The two artificial domes built in 1968 to carry the hill above the relocated temples", level: "documented" },
      { material: "Synthetic resin", use: "Injected into the friable sandstone before cutting, to hold the blocks together during the move", level: "documented" },
    ],
    measurements: [
      {
        label: "The colossi",
        value: "about 20 m tall, seated",
        basis: "Modern survey.",
        level: "documented",
      },
      {
        label: "Depth of the temple into the rock",
        value: "about 60 m",
        basis: "Modern survey along the axis from the façade to the sanctuary.",
        level: "documented",
      },
      {
        label: "Blocks cut for the move",
        value: "over a thousand, weighing up to about 30 tonnes",
        basis: "The engineering record of the 1964–68 operation.",
        level: "documented",
      },
      {
        label: "Distance moved",
        value: "about 200 m back and 65 m up",
        basis: "The engineering record of the relocation.",
        level: "documented",
      },
    ],
    construction: [
      "The temple is subtractive: there is no masonry in the ancient building at all. Everything — the façade, the colossi, the pillared halls, the sanctuary — was cut out of the cliff, working inward, which means every error is permanent.",
      "The interior follows the Egyptian pattern of diminishing height and light: a first hall with eight Osiride pillars of the king, a second smaller hall, a vestibule, and a sanctuary with four seated figures.",
      "The relocation reversed the process. The rock was consolidated with resin, sawn into numbered blocks with hand saws to keep the cuts thin, lifted, stored, and reassembled on a concrete frame inside two artificial domes; a hill was then built over them. The joins are visible on close inspection and were deliberately not disguised.",
    ],
    politicalMeaning: [
      "The temple is a frontier statement. Four colossal seated kings face the river on the Nubian side of the border, in a land Egypt controlled and taxed, with the king among the gods inside. Anyone travelling downstream met it before they met Egypt.",
      "The north wall of the great hall carries the fullest of the Kadesh reliefs: the camp, the Hittite chariots, the king alone in his chariot. Ramesses published the same battle at Karnak, Luxor, Abydos, the Ramesseum and here — five monumental versions of an engagement the Hittite record and the surviving treaty describe as a draw.",
      "The relocation is a political event in its own right. It was the founding project of UNESCO's international campaigns, funded by fifty countries, and it established the idea that a monument could be world heritage with a claim on resources beyond the state that holds it.",
    ],
    religiousMeaning: [
      "Twice a year the sun reaches down the sixty-metre axis and lights three of the four seated figures in the sanctuary; Ptah, a god of the underworld, is left in shadow. The alignment is deliberate and it is one of the few Egyptian solar alignments that is beyond argument.",
      "The relocation shifted the dates. The temple now faces the sun on days about one day later than it did on its original site, which is the price of moving it and is documented in the engineering record.",
    ],
    laterHistory: [
      "Buried by sand, which preserved the interior. Belzoni's clearance in 1817 opened it; the temple was a fixture of Nile travel thereafter.",
      "The Aswan High Dam, begun in 1960, would have submerged both temples. The rescue ran from 1964 to 1968 under UNESCO with an international engineering consortium, and a great many other Nubian monuments were moved, given away to foreign museums, or lost.",
    ],
    survival: {
      condition: "relocated",
      level: "documented",
      note: "Complete, and standing sixty-five metres above and two hundred metres behind its original position, inside an artificial hill. Everything a visitor sees is ancient stone in its ancient relative arrangement; the mountain around it is 1960s concrete.",
    },
    restoration: [
      "The 1964–68 operation is the reference case for monument relocation. The saw cuts follow the joints of the decoration where possible, the blocks were numbered and recorded, the reassembly reproduced the original spacing and the original relationship to the sun, and the domes carrying the hill are engineered to be inspectable.",
    ],
    archaeology: [
      "The temples were never excavated in the ordinary sense; they were cleared of sand. The relocation, by contrast, produced a complete record of the fabric, since every block was documented as it was cut.",
      "Other Nubian monuments moved in the same campaign went to Madrid, Turin, Leiden and New York as gifts to contributing states. The dispersal is documented and is part of the campaign's history.",
    ],
    fragments: [
      {
        what: "Nubian temples relocated or given to contributing countries during the campaign, including the Temple of Debod in Madrid and the Temple of Dendur in New York",
        level: "documented",
        heldAt: "Madrid, Turin, Leiden and New York",
        note: "Not fragments of this temple, but the same operation and the same decision.",
      },
    ],
    primarySources: [
      S(
        "The Kadesh inscriptions",
        "Abu Simbel, north wall of the great hall",
        "The Poem and the Bulletin, with the reliefs of the camp and the battle. Ramesses' account of 1274 BCE, published here in its fullest visual form.",
        "Ramesses II",
      ),
      S(
        "The Egyptian–Hittite treaty",
        "Karnak and Boğazköy copies",
        "The peace concluded some sixteen years after Kadesh, surviving in Egyptian and Hittite versions. The two texts differ in whose initiative the peace was, which is the clearest available demonstration of how royal records work.",
      ),
    ],
    disputes: [
      {
        question: "By how much did the move shift the solar alignment?",
        positions:
          "The relocated temple is aligned so that the sun reaches the sanctuary on days close to the original ones; the usual statement is a shift of about a day. Some accounts give no shift and others give more, and the discrepancy comes from how the original dates were themselves calculated. The engineering record of the relocation is the authority, and popular accounts frequently are not.",
        level: "disputed",
      },
    ],
    museumSlugs: ["british-museum"],
    objectSlugs: [],
    institutionRefs: ["pharaonic-administration"],
    religionRefs: ["egyptian-temple-economy", "the-sacred-calendar"],
    battleRefs: [],
    warfareRefs: ["egyptian-warfare", "egyptian-army"],
    figureRefs: ["ramesses-ii"],
    themeRefs: ["sacred-kingship-in-egypt", "pharaonic-legitimacy", "monumentality", "frontiers-and-borderlands"],
    bookRefs: [],
    relatedMonuments: ["great-hypostyle-hall", "luxor-temple", "mortuary-temple-of-hatshepsut"],
    mapSlugs: ["egypt"],
    imageSlug: "abu-simbel",
  },
  {
    slug: "mortuary-temple-of-hatshepsut",
    title: "The Mortuary Temple of Hatshepsut",
    alternateNames: ["Djeser-Djeseru", "Deir el-Bahari"],
    kind: "temple",
    region: "egyptian",
    standfirst:
      "Three colonnaded terraces set against a cliff, built for a king who was a woman and then systematically erased from the walls by her successor — decades later, and probably not out of hatred.",
    description:
      "The Mortuary Temple of Hatshepsut — the terraces and the colonnades, the Punt expedition and divine birth reliefs, Senenmut's hidden portraits, and the erasure of Hatshepsut's name.",
    civilizations: ["egypt", "new-kingdom"],
    unplacedNote:
      "The temple stands at Deir el-Bahari on the Theban west bank, in the bay of cliffs behind which the Valley of the Kings lies. It is a separate site from the valley and from the workmen's village, and the platform has no page for it, so this monument has no parent place here.",
    modernLocation: "Deir el-Bahari, western Thebes, Egypt",
    architectureRefs: ["temple", "columns-and-capitals", "necropolis", "construction-methods"],
    chronology: {
      built: { year: -1458, precision: "range-endpoint", display: "c. 1479–1458 BCE" },
      display: "Built during Hatshepsut's reign, c. 1479–1458 BCE",
      status: "documented",
      phases: [
        {
          label: "Construction",
          display: "c. 1479–1458 BCE",
          level: "documented",
          note: "Built over most of the reign, beside and above the much older terraced temple of Mentuhotep II, which it quotes and outdoes.",
        },
        {
          label: "The erasure",
          display: "from c. 1440s BCE",
          level: "documented",
          note: "Hatshepsut's images and cartouches were cut out and in places replaced by those of Thutmose I, II and III. The campaign began decades into Thutmose III's sole reign, not at its start.",
        },
        {
          label: "Later use",
          display: "Ptolemaic – Christian",
          level: "documented",
          note: "A sanctuary of Imhotep and Amenhotep son of Hapu was installed in the upper terrace, and later a Coptic monastery gave the site its modern name, the northern monastery.",
        },
        {
          label: "Excavation and restoration",
          display: "1890s – present",
          level: "documented",
          note: "Cleared by Édouard Naville for the Egypt Exploration Fund and by Herbert Winlock for the Metropolitan Museum, and reconstructed over decades by the Polish–Egyptian mission working from the fallen blocks.",
        },
      ],
    },
    attributions: [
      {
        name: "Hatshepsut",
        role: "patron",
        level: "documented",
        basis: "Her cartouches and her building texts throughout, including where they were later cut out and the erasure itself records them.",
        figureSlug: "hatshepsut",
      },
      {
        name: "Senenmut",
        role: "architect",
        level: "probable",
        basis:
          "Steward of Amun and overseer of works under Hatshepsut, with over twenty statues and a tomb beneath the temple forecourt. Small images of him were cut into the temple behind doors where they would normally be hidden. His titles and his proximity make the attribution reasonable; no text says he designed it.",
      },
    ],
    originalFunction: [
      "A mortuary temple for the cult of the dead king, with chapels for Amun, Hathor, Anubis and the royal ancestors, aligned on Karnak across the river and connected to it by the annual Beautiful Festival of the Valley.",
      "The king's tomb is elsewhere, in the Valley of the Kings on the other side of the cliff. Separating the tomb from the mortuary temple is the New Kingdom's solution to the pyramid's problem, which was that a monument marking a burial advertises it to robbers.",
    ],
    materials: [
      { material: "Limestone", use: "The terraces, colonnades and reliefs", level: "documented" },
      { material: "Granite", use: "Doorways and the sanctuary elements", level: "documented" },
      { material: "Paint", use: "The reliefs throughout; substantial colour survives in the sheltered chapels", level: "documented" },
    ],
    measurements: [
      {
        label: "Terraces",
        value: "three, rising to about 25 m above the valley floor",
        basis: "Modern survey.",
        level: "documented",
      },
      {
        label: "Width of the terrace fronts",
        value: "about 90 m",
        basis: "Modern survey of the colonnade fronts.",
        level: "documented",
      },
    ],
    construction: [
      "The building's idea is the cliff behind it. Three terraces of colonnades step up against a bay of vertical rock three hundred metres high, and the architecture is proportioned so that the building appears to be a continuation of the geology rather than an object placed in front of it.",
      "The colonnades use square and polygonal piers rather than the plant-form columns of a temple like Karnak. The effect is closer to a Greek stoa than to anything else in Egypt, which is why nineteenth-century visitors reached for the word proto-Doric — an anachronism, since the building precedes any Doric column by nine centuries.",
      "Ramps on the central axis link the terraces, so the whole is one processional route from the valley floor to the sanctuary cut into the rock.",
    ],
    politicalMeaning: [
      "Hatshepsut ruled as king, with the full titulary and, in most representations, the male royal costume and the false beard. The temple's reliefs are the fullest statement of how that was justified: the divine birth sequence shows Amun visiting her mother and fathering her, and another sequence shows her father Thutmose I presenting her as his successor.",
      "Both are claims made after the fact by the reign that needed them. The divine birth motif recurs for later kings, and the coronation sequence describes an event no other source records.",
      "The Punt expedition reliefs are a different register: an account of a trading voyage to a land somewhere on the Red Sea or the Horn of Africa, with the ships, the cargo of incense trees, ebony, ivory and animals, and portraits of the ruler of Punt and his wife. It is the best-documented long-distance expedition from the ancient world.",
    ],
    religiousMeaning: [
      "The temple is aligned on Karnak, and the Beautiful Festival of the Valley brought Amun's barque across the river to it each year — the west bank's answer to the Opet festival.",
      "The upper terrace later held a healing sanctuary of the deified Imhotep and Amenhotep son of Hapu, with incubation practised there in the Ptolemaic and Roman periods. Two Egyptian officials became gods of medicine, and pilgrims slept in a fifteenth-century-BCE temple to consult them.",
    ],
    laterHistory: [
      "Hatshepsut's images were removed in a systematic campaign that also replaced her name with those of her father, husband and stepson. The chronology of the erasure — beginning around the twentieth year of Thutmose III's sole reign rather than immediately — is the strongest argument that it was dynastic tidying rather than personal vengeance.",
      "Damaged by earthquake, quarried, occupied by a Coptic monastery, and buried in debris. Cleared from the 1890s and reconstructed from its own fallen blocks by the Polish–Egyptian mission from 1961 onwards.",
    ],
    survival: {
      condition: "reassembled",
      level: "documented",
      note: "Standing in three terraces, with a very large proportion of the visible fabric re-erected from fallen original blocks over sixty years of anastylosis. The chapels retain their painted relief; the erased figures remain erased.",
    },
    restoration: [
      "The Polish–Egyptian mission's reconstruction, running since 1961, is one of the longest anastylosis programmes anywhere. It uses original blocks recovered from the debris, with new stone where necessary and marked, and has restored the upper terrace and its sanctuary.",
    ],
    archaeology: [
      "Senenmut's small figures, cut into the walls in positions covered when the doors stood open, were found during clearance. Whether they were an unauthorised intrusion, a permitted privilege, or normal practice for a chief official is argued.",
      "Winlock's excavation for the Metropolitan Museum recovered the smashed statues of Hatshepsut from a quarry pit near the causeway, where they had been broken and dumped during the erasure. Many were reassembled in New York.",
      "The Royal Cache of reburied royal mummies, found in 1881, lies in a shaft in the cliff immediately above the temple.",
    ],
    fragments: [
      {
        what: "Statues of Hatshepsut recovered smashed and reassembled",
        level: "documented",
        heldAt: "The Metropolitan Museum of Art, New York, and the Egyptian Museum, Cairo",
      },
      {
        what: "Relief blocks removed in the nineteenth century",
        level: "documented",
        museumSlug: "british-museum",
      },
    ],
    primarySources: [
      S(
        "The Punt reliefs",
        "middle terrace, south colonnade",
        "The expedition to Punt: the ships, the village on stilts, the ruler and his wife, the incense trees carried aboard in baskets, and the inventory of the cargo. An Egyptian record of a voyage, carved as a temple relief.",
      ),
      S(
        "The divine birth and coronation reliefs",
        "middle terrace, north colonnade",
        "Amun visiting Ahmose in the form of Thutmose I, the birth and nursing of Hatshepsut, and her presentation as heir. A theological argument for a reign, carved by that reign.",
      ),
    ],
    disputes: [
      {
        question: "Why was Hatshepsut erased?",
        positions:
          "Personal hatred by Thutmose III was the traditional answer. The timing — beginning roughly twenty years into his sole reign — is difficult to reconcile with it, and the current majority reading is a dynastic correction, removing an anomalous female king from the record to secure the succession of Thutmose III's own heir. The erasure is documented; the motive is inference from its date.",
        level: "disputed",
      },
      {
        question: "Where was Punt?",
        positions:
          "Proposals place it on the Sudanese or Eritrean Red Sea coast, in the Ethiopian highlands, or in Arabia. The reliefs show a coastal settlement of stilt houses, incense trees, giraffes and rhinoceroses, and oxygen-isotope analysis of a mummified baboon from an Egyptian context has been used to argue for the Eritrea–Ethiopia region. It is not settled.",
        level: "disputed",
      },
    ],
    museumSlugs: ["british-museum"],
    objectSlugs: [],
    institutionRefs: ["pharaonic-administration"],
    religionRefs: ["egyptian-temple-economy", "mummification", "healing-cult-and-incubation", "the-sacred-calendar"],
    battleRefs: [],
    warfareRefs: [],
    figureRefs: ["hatshepsut", "thutmose-iii", "imhotep"],
    themeRefs: ["sacred-kingship-in-egypt", "pharaonic-legitimacy", "royal-legitimacy", "historical-memory"],
    bookRefs: [],
    relatedMonuments: ["great-hypostyle-hall", "luxor-temple", "step-pyramid-of-djoser"],
    mapSlugs: ["egypt"],
    imageSlug: "hatshepsut-temple",
  },
  // ─── Mesopotamia ─────────────────────────────────────────────────────
  {
    slug: "ishtar-gate",
    title: "The Ishtar Gate",
    kind: "gateway",
    region: "near-eastern",
    standfirst:
      "A glazed brick gate of Babylon that now stands in Berlin — the smaller of its two arches, reassembled from excavated fragments with modern brick filling the gaps.",
    description:
      "The Ishtar Gate — Nebuchadnezzar's glazed brickwork and its animals, Koldewey's excavation and the shipment to Berlin, what the Pergamon reconstruction actually contains, and Iraq's claim.",
    civilizations: ["babylon"],
    citySlug: "babylon",
    modernLocation: "Pergamon Museum, Berlin; the gate's foundations remain at Babylon, Iraq",
    architectureRefs: ["construction-methods", "building-materials", "necropolis"],
    chronology: {
      built: { year: -575, precision: "approximate", display: "c. 575 BCE" },
      display: "Built under Nebuchadnezzar II, c. 575 BCE",
      status: "documented",
      phases: [
        {
          label: "Construction",
          display: "c. 575 BCE",
          level: "documented",
          note: "Nebuchadnezzar II's building inscription, found at the gate, records its construction in glazed brick with bulls and dragons.",
        },
        {
          label: "Rebuilding in successive levels",
          display: "6th century BCE",
          level: "documented",
          note: "The gate was rebuilt at least three times as the street level rose, so earlier unglazed levels survive below the glazed one, with their moulded animals intact and never meant to be seen.",
        },
        {
          label: "Excavation and removal",
          display: "1899–1917, shipped 1926–1927",
          level: "documented",
          note: "Robert Koldewey excavated the gate and the Processional Way for the German Oriental Society. Fragments were shipped to Berlin under the division-of-finds arrangements of the Ottoman and then the British Mandate period.",
        },
        {
          label: "Reconstruction in Berlin",
          display: "opened 1930",
          level: "documented",
          note: "Reassembled in the Pergamon Museum from the excavated glazed bricks with new brick filling the losses.",
        },
      ],
    },
    attributions: [
      {
        name: "Nebuchadnezzar II",
        role: "patron",
        level: "documented",
        basis:
          "His own building inscription from the gate, which names him, the gate, and the animals of bronze and of glazed brick set on it.",
      },
    ],
    originalFunction: [
      "The eighth gate of the inner city wall of Babylon, on the Processional Way that ran from the north into the city and past the temple precinct to Esagila and Etemenanki.",
      "It was the route of the New Year procession, when the statue of Marduk was carried out and back. A gate on that road is a piece of ritual apparatus as much as a piece of fortification.",
    ],
    materials: [
      { material: "Glazed brick", use: "The visible surfaces, in deep blue with animals in white, yellow and brown — the glaze technology is the monument's technical achievement", level: "documented" },
      { material: "Moulded unglazed brick", use: "The lower, earlier gate levels, whose animals are moulded in relief and were buried as the street rose", level: "documented" },
      { material: "Bitumen and reed matting", use: "Bedding and waterproofing in the foundations, standard Babylonian practice", level: "documented" },
    ],
    measurements: [
      {
        label: "The Berlin reconstruction",
        value: "about 14 m high and 30 m wide",
        basis: "Modern measurement of the reconstructed structure in the museum.",
        level: "documented",
      },
      {
        label: "The original gate",
        value: "substantially larger; the reconstruction shows only the smaller front arch",
        basis:
          "Koldewey's excavation record and the surviving foundations. The larger rear arch was not reconstructed — it would not fit the museum hall — and its material remains in storage.",
        level: "documented",
      },
      {
        label: "Animals on the gate",
        value: "recorded in the building inscription and counted in hundreds across the gate and the Processional Way",
        basis:
          "Excavation record. Published counts vary because the several rebuilding levels are counted differently.",
        level: "probable",
      },
    ],
    construction: [
      "The animals are moulded, not painted: each beast is built from dozens of bricks each carrying part of the relief, cut and numbered before firing so that the courses assemble into a figure. Getting a hundred separately fired bricks to compose one bull, at scale, repeatedly, is the achievement.",
      "The glaze is a soda-lime silicate coloured with copper for the blue and antimony compounds for the yellow, fired at a temperature that had to be controlled closely enough not to slump the relief.",
      "The gate's earlier levels were left in place beneath the glazed one, so the same animals exist in unglazed moulded brick underground. Those were never intended to be seen after the rebuilding, and they are among the best-preserved elements because they were buried.",
    ],
    politicalMeaning: [
      "Nebuchadnezzar's building inscriptions are relentless about his own works, and this gate is their showpiece: the entrance to a rebuilt capital, on the ritual route, in a material nobody else was using at this scale.",
      "The animals divide by god — the dragon of Marduk, the bull of Adad, the lion of Ishtar on the Processional Way — so the walk into the city is a walk past the pantheon in order.",
      "The gate's presence in Berlin is a live question. Iraq has sought its return, and the removal took place under arrangements made with the Ottoman authorities and then in the mandate period. The Pergamon Museum has held that the material was legally acquired and that the reconstruction is itself a scholarly object. The platform records the dispute and does not adjudicate it.",
    ],
    religiousMeaning: [
      "The Processional Way and the gate exist for the akitu, the New Year festival, in which the god's statue left the city and returned and the king's authority was renewed by the god. The route is the ritual.",
    ],
    laterHistory: [
      "Buried as Babylon declined. Koldewey excavated it over eighteen years and shipped the fragments to Berlin, where reassembly took until 1930.",
      "The site at Babylon was reconstructed in part under the Iraqi government in the 1980s, including a smaller replica gate, with new brickwork stamped in the manner of Nebuchadnezzar's own stamped bricks. The site was later used as a military base during the 2003 war and suffered damage recorded by subsequent survey.",
    ],
    survival: {
      condition: "relocated",
      level: "documented",
      note: "The glazed façade of the smaller front gate stands reassembled in Berlin, from original bricks with modern infill. The foundations and the earlier unglazed levels remain at Babylon. Panels are also in Istanbul, Chicago, New York, the Louvre and elsewhere.",
    },
    restoration: [
      "The Berlin reconstruction combines excavated glazed bricks with new brick where fragments were missing. Which is which is documented in the excavation publications and is not marked on the reconstruction, and photographs almost never distinguish them.",
    ],
    archaeology: [
      "Koldewey's excavation of Babylon from 1899 was among the first large stratigraphic excavations in Mesopotamia and established the city's plan, the Processional Way, the palace and the foundations of Etemenanki.",
      "The fragments were shipped in thousands of crates and reassembled over years, which is why the museum display took until 1930.",
    ],
    fragments: [
      {
        what: "The reconstructed gate façade and the Processional Way lions",
        level: "documented",
        objectSlug: "ishtar-gate-berlin",
        museumSlug: "pergamon-museum",
      },
      {
        what: "Individual glazed panels distributed to other museums",
        level: "documented",
        museumSlug: "istanbul-archaeological-museums",
      },
      {
        what: "The foundations and the earlier unglazed gate levels",
        level: "documented",
        heldAt: "In position at Babylon, Iraq",
      },
    ],
    primarySources: [
      S(
        "The building inscription of Nebuchadnezzar II",
        "the Ishtar Gate foundation text",
        "The king's own record of the gate: that he laid its foundation with bitumen and baked brick, and adorned it with bulls and dragons so that mankind might gaze on it in wonder.",
        "Nebuchadnezzar II",
      ),
      S(
        "Histories",
        "1.178–187",
        "Herodotus on the walls, gates and streets of Babylon. His measurements are far too large and his account has been argued to be second-hand, but he describes a hundred bronze gates and a grid of streets running to the river, and the excavated plan is a grid.",
        "Herodotus",
      ),
    ],
    disputes: [
      {
        question: "Should the gate be in Berlin?",
        positions:
          "Iraq has requested its return. Germany has held that the material left under valid arrangements of the period and that the reconstruction is inseparable from the museum built around it. The excavation records and the division agreements are published and are read differently by each side, and the question is unresolved.",
        level: "disputed",
      },
      {
        question: "What is the dragon?",
        positions:
          "The mušḫuššu, a creature with a serpent's head and neck, a scaly body, forelegs of a lion and hind legs of a bird of prey, associated with Marduk. Whether it was understood as a real animal, a composite emblem, or a mythical beast is not recoverable, and attempts to identify it with a known species are not taken seriously.",
        level: "unknown",
      },
    ],
    museumSlugs: ["pergamon-museum", "istanbul-archaeological-museums", "louvre"],
    objectSlugs: ["ishtar-gate-berlin"],
    institutionRefs: [],
    religionRefs: ["mesopotamian-temple-household", "the-sacred-calendar"],
    battleRefs: [],
    warfareRefs: ["fortifications"],
    figureRefs: ["herodotus", "hammurabi"],
    themeRefs: ["monumentality", "state-and-religion", "empire-building"],
    bookRefs: ["herodotus-histories", "code-of-hammurabi"],
    relatedMonuments: ["etemenanki"],
    mapSlugs: ["mediterranean"],
    imageSlug: "ishtar-gate",
    gallerySlugs: ["babylon-processional-lion"],
  },
  {
    slug: "etemenanki",
    title: "Etemenanki",
    alternateNames: ["The ziggurat of Babylon"],
    kind: "temple",
    region: "near-eastern",
    standfirst:
      "A ziggurat known from a square hole in the ground, a late clay tablet giving its dimensions, and a Greek traveller's description — and the building the Tower of Babel story is usually attached to.",
    description:
      "Etemenanki — what survives, what the Esagil tablet says, Herodotus's eight stages, Alexander's abandoned rebuilding, and the difference between an identification and an inference.",
    civilizations: ["babylon"],
    citySlug: "babylon",
    modernLocation: "Babylon, Babil Governorate, Iraq",
    architectureRefs: ["construction-methods", "building-materials", "temple"],
    chronology: {
      built: { year: -600, precision: "approximate", display: "the recorded building c. 600 BCE" },
      display: "An earlier ziggurat rebuilt by Nabopolassar and Nebuchadnezzar II; demolished by the Hellenistic period",
      status: "disputed",
      phases: [
        {
          label: "Earlier structures",
          display: "before the 7th century BCE",
          level: "disputed",
          note: "A ziggurat at Babylon is referred to in earlier texts and was reportedly destroyed by Sennacherib in 689 BCE. What stood before the Neo-Babylonian rebuilding, and how far back, is not established by excavation.",
        },
        {
          label: "Nabopolassar and Nebuchadnezzar II",
          display: "c. 620–580 BCE",
          level: "documented",
          note: "Both kings record rebuilding the ziggurat in their inscriptions. Nabopolassar's cylinder describes the work and the labour drawn from across the empire.",
        },
        {
          label: "Alexander",
          display: "331–323 BCE",
          level: "documented",
          note: "Alexander found it ruinous and set men to clear the rubble with the intention of rebuilding. Strabo says the clearance itself would have taken a very long time; the work stopped at his death.",
        },
        {
          label: "Robbed away",
          display: "Hellenistic period onwards",
          level: "documented",
          note: "The baked brick was taken for building elsewhere, systematically and over centuries. What Koldewey excavated was the foundation trench and the mudbrick core's footprint.",
        },
      ],
    },
    attributions: [
      {
        name: "Nabopolassar",
        role: "patron",
        level: "documented",
        basis: "His own building inscription recording the restoration of the ziggurat and the labour assembled for it.",
      },
      {
        name: "Nebuchadnezzar II",
        role: "completed-by",
        level: "documented",
        basis: "His building inscriptions recording work on the ziggurat and on Esagila beside it.",
      },
    ],
    originalFunction: [
      "The ziggurat of the temple complex of Marduk at Babylon, standing beside Esagila, Marduk's temple proper. The name means the house of the foundation of heaven and earth.",
      "A Mesopotamian ziggurat is a platform, not a building with rooms: a stepped solid mass carrying a shrine at the top, ascended by stairs or a ramp. What happened in the summit shrine is barely documented, and Herodotus's account of it is the fullest one there is.",
    ],
    materials: [
      { material: "Mudbrick", use: "The core, which is what the excavated footprint consists of", level: "documented" },
      { material: "Baked brick set in bitumen", use: "The outer casing, entirely removed in antiquity for reuse", level: "documented" },
    ],
    measurements: [
      {
        label: "Base",
        value: "about 91 m square",
        basis:
          "Koldewey's excavation of the foundation footprint, which agrees closely with the figure in the Esagil tablet. This is the one measurement supported by both the ground and a text.",
        level: "documented",
      },
      {
        label: "Height",
        value: "given as about 91 m in seven stages",
        basis:
          "An ancient figure, from the Esagil tablet — a Seleucid-period copy of a text describing the dimensions of the ziggurat and of Esagila. It is centuries later than the building, its units and its reliability are argued, and the equal height and base are suspiciously neat.",
        level: "disputed",
      },
      {
        label: "Stages",
        value: "seven in the tablet, eight in Herodotus",
        basis:
          "Two ancient figures, and they disagree. Neither can be checked against the ground, because nothing above the foundation survives.",
        level: "disputed",
      },
    ],
    construction: [
      "A solid mass of mudbrick with a baked-brick skin laid in bitumen — the standard Mesopotamian technique, used because good building stone is absent from the alluvial plain and mud is not.",
      "The ascent is described by Herodotus as a stair winding round the outside with a resting place halfway. Excavated ziggurats elsewhere have straight triple stairs; whether Babylon's was different or Herodotus was describing something he had not seen is not resolvable.",
    ],
    politicalMeaning: [
      "Nabopolassar's inscription describes labour brought from the whole kingdom to rebuild the ziggurat, which is a statement about what the Neo-Babylonian state could command as much as about piety.",
      "Alexander's decision to clear and rebuild it was an act of legitimation: taking on the restoration of Marduk's ziggurat placed him in the line of Babylonian kings, in the same way that his treatment of the tomb of Cyrus placed him in the line of Persian ones.",
    ],
    religiousMeaning: [
      "Herodotus reports that the summit shrine held a couch and a golden table and no image, and that a woman chosen by the god slept there; he adds that he does not believe it. That is the only description of the top of any ziggurat, and it is offered by its author with a disclaimer.",
      "The building's name — the foundation of heaven and earth — states the theology: the ziggurat is the point at which the two meet.",
    ],
    laterHistory: [
      "Ruinous by the fourth century BCE, cleared by Alexander's men and then abandoned. Quarried for brick thereafter until nothing above ground was left.",
      "Koldewey excavated the site between 1913 and the end of the German campaign, recovering the foundation footprint. The area is now a rectangular depression, part of it below the water table and flooded.",
    ],
    survival: {
      condition: "vanished",
      level: "documented",
      note: "Nothing stands. The site is a square depression with water in it, defined by the foundation trenches. Everything said about the building's elevation comes from texts.",
    },
    archaeology: [
      "The excavated footprint gives the base dimensions and the outline of the stair emplacements, and confirms the Esagil tablet's figure for the base. It gives no information at all about the height or the number of stages.",
      "The identification of the site as Etemenanki rests on its position beside Esagila, on the inscriptions found in the area, and on the correspondence with the tablet — a convergence of evidence rather than a single proof.",
    ],
    fragments: [
      {
        what: "The Esagil tablet, a Seleucid copy giving dimensions for the ziggurat and the temple",
        level: "documented",
        heldAt: "Louvre, Paris",
      },
      {
        what: "Stamped bricks of Nebuchadnezzar II from the area",
        level: "documented",
        museumSlug: "pergamon-museum",
      },
    ],
    primarySources: [
      S(
        "Histories",
        "1.181–183",
        "Herodotus on the temple of Zeus Belus at Babylon: a tower of eight stages with a stair winding round the outside, a shrine at the top with a couch and a golden table and no image. The fullest description of a ziggurat from antiquity, from a writer who says he does not credit part of what he was told.",
        "Herodotus",
      ),
      S(
        "Geography",
        "16.1.5",
        "Strabo records that the tomb of Belus at Babylon was destroyed by Xerxes, that Alexander intended to rebuild it, and that the clearance of the rubble alone was an enormous labour.",
        "Strabo",
      ),
      S(
        "The Esagil tablet",
        "Seleucid copy",
        "A description of the dimensions of Esagila and of the ziggurat, in Babylonian units. Centuries later than the building it describes, and the source of every figure for its height.",
      ),
    ],
    disputes: [
      {
        question: "Is this the Tower of Babel?",
        positions:
          "Genesis 11 describes a tower built of brick and bitumen at Shinar, which is Babylonia, and the association with Babylon is made within the text by the name. That a specific building is meant, and that it is this one, is a modern inference from the correspondence of material, place and name. It is a reasonable inference. It is not a documented identification, and the biblical narrative is not a source for the ziggurat's history.",
        level: "disputed",
      },
      {
        question: "How tall was it?",
        positions:
          "The Esagil tablet's figure of about ninety-one metres would make it as tall as it is wide, which is unlike every excavated ziggurat and is suspiciously symmetrical. Herodotus gives eight stages without a total. Reconstructions vary by a factor of two, and there is nothing on the ground to test them against.",
        level: "disputed",
      },
    ],
    museumSlugs: ["pergamon-museum", "louvre", "british-museum"],
    objectSlugs: [],
    institutionRefs: [],
    religionRefs: ["mesopotamian-temple-household", "the-sacred-calendar"],
    battleRefs: [],
    warfareRefs: [],
    figureRefs: ["herodotus", "alexander", "hammurabi"],
    themeRefs: ["state-and-religion", "monumentality", "historical-memory"],
    bookRefs: ["herodotus-histories"],
    relatedMonuments: ["ishtar-gate"],
    mapSlugs: ["mediterranean"],
  },
];

// ──────────────────────────────────────────────────────────────────────
// Accessors
// ──────────────────────────────────────────────────────────────────────

export function getMonument(slug: string): Monument | undefined {
  return MONUMENTS.find((m) => m.slug === slug);
}

export function monumentsOfKind(kind: MonumentKind): Monument[] {
  return MONUMENTS.filter((m) => m.kind === kind);
}

export function monumentsInRegion(region: SiteRegion): Monument[] {
  return MONUMENTS.filter((m) => m.region === region);
}

/** Monuments standing on a given archaeological site. */
export function monumentsForSite(siteSlug: string): Monument[] {
  return MONUMENTS.filter((m) => m.siteSlug === siteSlug);
}

/**
 * Monuments in a given city, by `citySlug`.
 *
 * A monument that also sits on an excavated site carries both refs — the
 * Curia Julia is on the Roman Forum and in Rome — so it appears in the
 * Forum site page's list and in the Rome city page's list. That is
 * intended: the two lists answer different questions and are on
 * different pages. What is not permitted, and what
 * `monuments:boundaries` rejects, is a monument naming a city that
 * disagrees with its site's parent city.
 */
export function monumentsForCity(citySlug: string): Monument[] {
  return MONUMENTS.filter((m) => m.citySlug === citySlug);
}

/** Monuments whose form is explained by a given architecture type. */
export function monumentsForArchitecture(typeSlug: string): Monument[] {
  return MONUMENTS.filter((m) => m.architectureRefs.includes(typeSlug));
}

/** Monuments a given institution holds material from. */
export function monumentsForMuseum(museumSlug: string): Monument[] {
  return MONUMENTS.filter(
    (m) =>
      m.museumSlugs.includes(museumSlug) ||
      m.fragments.some((f) => f.museumSlug === museumSlug),
  );
}

/**
 * Hero image slugs claimed by monuments. Used by the gate to enforce
 * that no image serves as the hero of two entities — the failure the
 * brief names as "duplicate reuse of the same hero everywhere".
 */
export function monumentHeroSlugs(): string[] {
  return MONUMENTS.map((m) => m.imageSlug).filter(
    (s): s is string => typeof s === "string",
  );
}

export interface MonumentStats {
  total: number;
  onSites: number;
  inCities: number;
  unplaced: number;
  standing: number;
  measurements: number;
  attributions: number;
  fragments: number;
  disputes: number;
  primarySources: number;
  withoutAncientTestimony: number;
  phases: number;
}

export function monumentStats(): MonumentStats {
  const n = (f: (m: Monument) => number) => MONUMENTS.reduce((t, m) => t + f(m), 0);
  return {
    total: MONUMENTS.length,
    onSites: MONUMENTS.filter((m) => m.siteSlug).length,
    inCities: MONUMENTS.filter((m) => m.citySlug).length,
    unplaced: MONUMENTS.filter((m) => m.unplacedNote).length,
    standing: MONUMENTS.filter(
      (m) => m.survival.condition === "standing" || m.survival.condition === "standing-ruin",
    ).length,
    measurements: n((m) => m.measurements.length),
    attributions: n((m) => m.attributions.length),
    fragments: n((m) => m.fragments.length),
    disputes: n((m) => m.disputes.length),
    primarySources: n((m) => m.primarySources.length),
    withoutAncientTestimony: MONUMENTS.filter((m) => m.noAncientTestimony).length,
    phases: n((m) => m.chronology.phases.length),
  };
}

/** Counts by surviving condition, for the index. */
export function conditionCounts(): Array<{ condition: MonumentCondition; count: number }> {
  const order: MonumentCondition[] = [
    "standing",
    "standing-ruin",
    "reassembled",
    "foundations",
    "relocated",
    "vanished",
  ];
  return order.map((condition) => ({
    condition,
    count: MONUMENTS.filter((m) => m.survival.condition === condition).length,
  }));
}
