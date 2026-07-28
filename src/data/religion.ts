import type { EvidenceLevel, SourceReference } from "./evidence";

/**
 * Ancient religion — cult, rite and sanctuary.
 *
 * ── What this layer is, and what it is not ──────────────────────────────
 *
 * The platform already carries a great deal about ancient religion, and
 * almost none of it is about religious *practice*. `/themes/state-and-
 * religion` argues Roman religion as an instrument of political order.
 * `/themes/sacred-kingship-in-egypt` argues the pharaoh as cosmic
 * keystone. `/themes/afterlife-and-order` argues the weighing of the
 * heart. `/themes/divine-agency-in-homer` argues double motivation.
 * `/architecture/temple` owns the building. `/cities/delphi` owns the
 * Pythia and the consultation procedure. Every one of the fourteen city
 * pages carries a "Cult and sanctuaries" section naming its own
 * sanctuaries and festivals.
 *
 * What none of them covers is what people actually did. Nothing on the
 * platform describes how an animal was killed at an altar and what
 * happened to the meat; who held a Greek priesthood and how they got it;
 * what a curse tablet is; what happened at an Asclepieion overnight; how
 * Rome decided which foreign gods to admit; or what a lararium was for.
 * `/architecture/temple` states in its first paragraph that "the
 * sacrifice — the central act of Greek religion — happened at an altar in
 * the open air" and then, correctly, says nothing further about the
 * sacrifice, because it is a page about buildings.
 *
 * This layer starts exactly there.
 *
 *     The civilizations and themes layers cover religion as political
 *     order and as thought. The architecture layer covers the buildings.
 *     The cities layer covers the sanctuaries of named places. This layer
 *     covers the rite: what was done, by whom, with what, and how we know.
 *
 * It is also deliberately distinct from `/religion-and-wisdom`, which is a
 * standing section of the site about the wisdom traditions — Hebrew
 * scripture, the philosophical schools, the New Testament and the
 * patristic inheritance. That section is about texts and doctrine. This
 * one is about pre-Christian cult and rite, and the two link to each other
 * rather than competing.
 *
 * ── The hazard this layer is built around ───────────────────────────────
 *
 * Every previous phase had one characteristic failure mode and a schema
 * shaped to prevent it. Phase 26 made a bare troop number impossible to
 * store. Phase 27 did the same for city populations. Phase 27.5 made a
 * provenance record admit what it was missing.
 *
 * The failure mode here is subtler and more common in popular writing: a
 * ritual is described, an ancient story explaining it is told alongside,
 * and the story silently becomes the reason the ritual existed. Hesiod's
 * account of Prometheus dividing the ox at Mekone explains why the gods
 * receive the bones. It does not date, cause, or evidence Greek
 * sacrificial practice, and no reader should come away thinking it does.
 *
 * So the schema separates three things that popular accounts run
 * together, and the validator will not let a record blur them:
 *
 *   `whatIsAttested`  — what the material and documentary evidence shows.
 *   `aitia`           — stories the tradition told about the rite. These
 *                       are typed as explanations offered, never as
 *                       origins, and every one carries the source that
 *                       tells it and how long after the practice.
 *   `silences`        — what the evidence does not record. Required, with
 *                       a minimum of two, because ancient religion is full
 *                       of deliberate silence: the mystery ban worked,
 *                       household liturgy was never written down, the
 *                       Etruscan discipline survives only in Roman
 *                       summary. A page that does not say what it cannot
 *                       say has implicitly claimed to say everything.
 *
 * `evidenceBase` carries the same discipline at the level of the sources
 * themselves: every class of evidence a page rests on must state what it
 * cannot show. An inventory inscription is superb evidence for what was in
 * a treasury on one day and no evidence at all for what anyone believed.
 */

// ──────────────────────────────────────────────────────────────────────
// Section headings
// ──────────────────────────────────────────────────────────────────────

/**
 * The H2s the religion template renders. Declared here so the validator
 * can check them against the headings of every other layer.
 *
 * These are chosen to be disjoint from CITY_SECTION_HEADINGS (which
 * includes "Cult and sanctuaries" — the single most collidable string on
 * the platform for this phase), from INSTITUTION_SECTION_HEADINGS, from
 * the architecture template's headings, and from the H2s in use on the
 * civilization, theme and figure pages.
 */
export const RELIGION_SECTION_HEADINGS: ReadonlyArray<string> = [
  "What is attested",
  "How the rite worked",
  "The evidence and its limits",
  "What the sources do not record",
  "Stories told about the rite",
  "Vocabulary",
  "Contested points",
  "Where this comes from",
];

// ──────────────────────────────────────────────────────────────────────
// Tiers
// ──────────────────────────────────────────────────────────────────────

export type CultTier =
  | "concept"
  | "rite"
  | "greek"
  | "divination"
  | "roman"
  | "egyptian"
  | "near-eastern";

export const CULT_TIER_LABEL: Record<CultTier, string> = {
  concept: "Reading ancient religion",
  rite: "Rite and practice",
  greek: "Greek cult",
  divination: "Divination",
  roman: "Roman religion",
  egyptian: "Egyptian cult",
  "near-eastern": "Near Eastern cult",
};

export const CULT_TIER_ORDER: ReadonlyArray<CultTier> = [
  "concept",
  "rite",
  "greek",
  "divination",
  "roman",
  "egyptian",
  "near-eastern",
];

// ──────────────────────────────────────────────────────────────────────
// Deferrals
// ──────────────────────────────────────────────────────────────────────

/**
 * Which layer owns a subject this one does not cover. The validator
 * resolves `ownerSlug` against the named registry, so a deferral cannot
 * quietly point at a page that has been renamed or removed.
 */
export type DeferralOwner =
  | "city"
  | "architecture"
  | "institution"
  | "theme"
  | "essay"
  | "guide"
  | "book"
  | "figure"
  | "philosopher"
  | "civilization"
  | "section";

export interface ReligionDeferral {
  /** The subject this layer does not cover. */
  subject: string;
  /** The live route that does cover it. */
  route: string;
  ownedBy: DeferralOwner;
  /** Slug within that layer. Absent only for `section`, which is a
   *  standing route with no registry behind it. */
  ownerSlug?: string;
  /** Why the boundary falls here. Checked for substance. */
  reason: string;
}

// ──────────────────────────────────────────────────────────────────────
// Record types
// ──────────────────────────────────────────────────────────────────────

/**
 * A class of evidence a page rests on. `limits` is required and is the
 * point of the type: it is the field that stops a well-evidenced subject
 * from reading as a fully known one.
 */
export interface EvidenceBasis {
  kind:
    | "inscription"
    | "archaeology"
    | "iconography"
    | "literary"
    | "papyrus"
    | "documentary";
  /** What this class of evidence gives us here. */
  note: string;
  /** What it cannot show. Required. */
  limits: string;
}

/**
 * A story the tradition told about a rite.
 *
 * Note what this type does not have: a date, a place, or an evidence
 * level that could be set to `documented`. An aition is structurally
 * incapable of being stored as the origin of anything. It carries the
 * source that tells it and a note on the distance between the two, and
 * the template renders it under a heading that says these are stories.
 */
export interface Aition {
  /** The story, told as a story. */
  story: string;
  /** What the tradition offered it as explaining. */
  whatItExplains: string;
  /** Who tells it, and roughly when — the distance is the point. */
  source: string;
  /** Why this is an explanation offered rather than a cause. */
  note: string;
}


/**
 * What this layer does not cover, and where it is covered instead.
 *
 * Thirty-three entries, which is unusual — and is the honest measure of
 * how much of ancient religion the platform had already published before
 * this phase began. Every one was found by reading the existing corpus
 * rather than by guessing, and the validator resolves each `ownerSlug`
 * against its registry so a deferral cannot come to point at nothing.
 */
export const RELIGION_DEFERS_TO: ReadonlyArray<ReligionDeferral> = [
  {
    subject: "The Roman imperial cult",
    route: "/themes/state-and-religion",
    ownedBy: "theme",
    ownerSlug: "state-and-religion",
    reason:
      "The theme argues the imperial cult end to end — worship of the living emperor in the provinces, formal deification after death, and the Christian refusal read as disloyalty. /civilizations/principate repeats it. A fourth account would split one query.",
  },
  {
    subject:
      "Roman state religion as a political system — priestly colleges as public magistracies, pax deorum",
    route: "/themes/state-and-religion",
    ownedBy: "theme",
    ownerSlug: "state-and-religion",
    reason:
      "The theme argues the whole Roman arc from Republican augurs to Christian emperors as one continuous project. This layer takes the procedures, never the political argument about them.",
  },
  {
    subject: "The Augustan religious restoration",
    route: "/essays/how-augustus-rebuilt-rome",
    ownedBy: "essay",
    ownerSlug: "how-augustus-rebuilt-rome",
    reason:
      "The essay has a dedicated religion section on the civil wars read as divine anger, the temple rebuilding from the Res Gestae, and the revived priesthoods. Two further pages restate it already.",
  },
  {
    subject:
      "Constantine, the Edict of Milan and the Christianisation of the empire",
    route: "/essays/constantine-and-the-transformation-of-rome",
    ownedBy: "essay",
    ownerSlug: "constantine-and-the-transformation-of-rome",
    reason:
      "A whole essay argues the structural-continuity thesis and deliberately leaves the conversion question open. Reopening it on a cult page would contradict a published editorial position.",
  },
  {
    subject:
      "The Great Persecution and the Christian refusal of sacrifice",
    route: "/essays/diocletian-and-the-reinvention-of-empire",
    ownedBy: "essay",
    ownerSlug: "diocletian-and-the-reinvention-of-empire",
    reason:
      "The sacralised-autocracy explanation is already stated in the Diocletian essay, the Diocletian biography and the Late Empire civilization page. A fourth account of one causal chain is cannibalisation.",
  },
  {
    subject: "Akhenaten, the Aten and the Amarna revolution",
    route: "/essays/akhenaten-and-religious-revolution",
    ownedBy: "essay",
    ownerSlug: "akhenaten-and-religious-revolution",
    reason:
      "The essay and the biography both argue the elevation of the Aten, the suppression of Amun and the contested monotheism claim. /civilizations/new-kingdom carries it under a religion-titled heading.",
  },
  {
    subject: "Ma'at and the pharaoh as living Horus",
    route: "/themes/sacred-kingship-in-egypt",
    ownedBy: "theme",
    ownerSlug: "sacred-kingship-in-egypt",
    reason:
      "The theme argues the pharaoh as cosmic keystone and the doctrine of ma'at in full, and /essays/egypt-and-sacred-continuity defines ma'at as goddess, theology and politics at once. The concept is triple-covered.",
  },
  {
    subject: "The Egyptian afterlife and the weighing of the heart",
    route: "/themes/afterlife-and-order",
    ownedBy: "theme",
    ownerSlug: "afterlife-and-order",
    reason:
      "The theme narrates death as a navigated passage, the judgement scene and the heart weighed against the feather. This layer covers the treatment of the body, never the doctrine of judgement.",
  },
  {
    subject: "Divine and sacred kingship as a comparative category",
    route: "/themes/sacred-kingship",
    ownedBy: "theme",
    ownerSlug: "sacred-kingship",
    reason:
      "The canonical comparative treatment across pharaonic Egypt, Achaemenid Persia and the Principate, including the Genius Augusti and the divinisation of dead emperors.",
  },
  {
    subject:
      "Ahuramazda, arta against the Lie, and Achaemenid royal theology",
    route: "/themes/kingship-and-legitimacy",
    ownedBy: "theme",
    ownerSlug: "kingship-and-legitimacy",
    reason:
      "Four pages already argue that the king rules by Ahuramazda's favour upholding arta, with Behistun read as royal apologetic. The Persian entry here is cult practice only.",
  },
  {
    subject:
      "The Behistun inscription as a religious claim to legitimacy",
    route: "/books/behistun-inscription",
    ownedBy: "book",
    ownerSlug: "behistun-inscription",
    reason:
      "The primary-source page owns the inscription's rhetoric of divine mandate and the Lie. A cult page may cite it as evidence of practice, never re-argue its legitimacy claim.",
  },
  {
    subject: "Cyrus, the Marduk cult and the Judaean return",
    route: "/books/cyrus-cylinder",
    ownedBy: "book",
    ownerSlug: "cyrus-cylinder",
    reason:
      "The source page carries the foundation-deposit genre, Nabonidus alienating the priesthood, the returned gods and peoples, and an explicit source-discipline section. It is repeated in four further places already.",
  },
  {
    subject: "Religious toleration as Achaemenid imperial policy",
    route: "/themes/empire-and-diversity",
    ownedBy: "theme",
    ownerSlug: "empire-and-diversity",
    reason:
      "The tolerance principle — local law, local cult, local language preserved — is stated there and in three further places. This layer treats cults, never the imperial policy toward them.",
  },
  {
    subject: "Marduk, Esagila and the akitu New Year festival",
    route: "/cities/babylon",
    ownedBy: "city",
    ownerSlug: "babylon",
    reason:
      "The city record states that Marduk was the city god, that Esagila and Etemenanki were the religious centre, and that the akitu in which the king took the hand of the god was the central ritual of legitimacy.",
  },
  {
    subject:
      "Delphi — the Pythia, the consultation procedure, Apollo and Dionysus",
    route: "/cities/delphi",
    ownedBy: "city",
    ownerSlug: "delphi",
    reason:
      "The city record already documents the Pythia with the mechanics flagged as not clearly attested, the regulated consultation, Apollo's winter absence and the ethylene hypothesis as unestablished. A second page would be thinner.",
  },
  {
    subject:
      "Olympia — the ash altar, the chryselephantine Zeus, the sacred truce",
    route: "/cities/olympia",
    ownedBy: "city",
    ownerSlug: "olympia",
    reason:
      "The city record covers the altar built from sacrificial ash, the lost Phidian Zeus and the truce protecting travel to the festival. Votive practice at Olympia is claimed there and in the museum record.",
  },
  {
    subject: "The named sanctuaries and festivals of individual cities",
    route: "/cities",
    ownedBy: "section",
    reason:
      "Every one of the fourteen city pages carries a 'Cult and sanctuaries' section naming its own sanctuaries, festivals, cult images and foreign cults with their caveats. This layer owns practice as a cross-site category and never re-describes a named site.",
  },
  {
    subject:
      "Temple architecture — plan, cella, peristyle, entasis, polychromy",
    route: "/architecture/temple",
    ownedBy: "architecture",
    ownerSlug: "temple",
    reason:
      "The record owns the fabric and its four building examples, and stops deliberately at the altar. This layer takes the rite at that altar and leaves the building where it is.",
  },
  {
    subject:
      "The temple-to-basilica transition and Christian congregational architecture",
    route: "/architecture/basilica",
    ownedBy: "architecture",
    ownerSlug: "basilica",
    reason:
      "The record already argues that Christianity needed buildings for congregations, that the temple was useless because it housed a statue, and that the European church begins in a Roman law court.",
  },
  {
    subject: "Burial siting law, tomb-lined roads and funerary epigraphy",
    route: "/architecture/necropolis",
    ownedBy: "architecture",
    ownerSlug: "necropolis",
    reason:
      "The record owns the Twelve Tables prohibition on burial inside the city, the roadside-tomb argument and the epigraphic-skew caution. This layer may own belief and rite, never the fabric.",
  },
  {
    subject: "Tomb monuments as dynastic statements",
    route: "/architecture/mausoleum",
    ownedBy: "architecture",
    ownerSlug: "mausoleum",
    reason:
      "The record owns the Halicarnassus, Augustus and Hadrian survival narrative and the monument as a claim about a family rather than about an afterlife.",
  },
  {
    subject: "Pyramid engineering and the Giza workers' settlement",
    route: "/architecture/pyramid",
    ownedBy: "architecture",
    ownerSlug: "pyramid",
    reason:
      "The record owns the mastaba-to-true-pyramid sequence and the excavated workers' settlement showing men fed, housed and buried honourably. Funerary belief is covered by the afterlife theme.",
  },
  {
    subject:
      "The Arch of Titus menorah panel and the spoils of the Jerusalem Temple",
    route: "/architecture/triumphal-arch",
    ownedBy: "architecture",
    ownerSlug: "triumphal-arch",
    reason:
      "The record states that the inner panels show the menorah and sacred vessels carried in 71 CE, cites Josephus as an eyewitness on the defeated side, and calls the panel the principal visual evidence for their appearance.",
  },
  {
    subject: "Homeric theology — double motivation, moira, time, themis",
    route: "/themes/divine-agency-in-homer",
    ownedBy: "theme",
    ownerSlug: "divine-agency-in-homer",
    reason:
      "The only theme carrying the domain 'Religion and wisdom'. It argues Zeus's first-book speech, double motivation, the time account of divine interest and the limits on the gods, with a Greek glossary.",
  },
  {
    subject: "Individual Greek deities as page subjects",
    route: "/figures",
    ownedBy: "section",
    reason:
      "The figures layer is the validated home for divine persons, schema-enforced so that a divine figure's historicity records cult attestation rather than the character. A parallel deity registry would fork the evidence apparatus.",
  },
  {
    subject:
      "Linear B theonyms and Bronze Age to Archaic continuity of worship",
    route: "/guides/odyssey-and-mycenaean-greece",
    ownedBy: "guide",
    ownerSlug: "odyssey-and-mycenaean-greece",
    reason:
      "The guide states as a labelled evidence claim that theonyms corresponding to Poseidon, Zeus, Hera, Hermes, Athena and Dionysus appear as recipients of offerings, with Poseidon prominent at Pylos.",
  },
  {
    subject: "Hero cult of Odysseus at the Polis cave",
    route: "/guides/was-odysseus-real",
    ownedBy: "guide",
    ownerSlug: "was-odysseus-real",
    reason:
      "The guide documents the bronze tripod-cauldrons and the inscribed vow under evidence labels, with the guardrail that a hero cult at an epic place-name is evidence about the epic's reception rather than its accuracy.",
  },
  {
    subject:
      "Xenia as a divinely sanctioned institution and Zeus Xeinios as its guarantor",
    route: "/themes/hospitality-and-xenia",
    ownedBy: "theme",
    ownerSlug: "hospitality-and-xenia",
    reason:
      "The theme argues xenia as a reciprocal institution with divine sanction, heritable between families, and carried entirely by custom and religion rather than by law.",
  },
  {
    subject: "Plato on the immortal soul and post-mortem judgement",
    route: "/themes/immortality-of-the-soul",
    ownedBy: "theme",
    ownerSlug: "immortality-of-the-soul",
    reason:
      "The theme and /books/phaedo both argue soul-immortality, the eschatological myths of judgement and the Christian reception. Greek philosophical theology of the soul is fully occupied.",
  },
  {
    subject: "The trial of Socrates and the Delphic mission",
    route: "/books/apology",
    ownedBy: "book",
    ownerSlug: "apology",
    reason:
      "The book page owns the charge of impiety and corrupting the young, the god at Delphi calling him wisest, and the obey-the-god framing. Only the unanalysed legal content of asebeia is genuinely open.",
  },
  {
    subject:
      "Divine sanction of lawgivers — Numa and Egeria, Lycurgus and Delphi",
    route: "/themes/founding-myths",
    ownedBy: "theme",
    ownerSlug: "founding-myths",
    reason:
      "Three pages enumerate the same set of divine-sanction cases, and /comparisons/lycurgus-vs-numa supplies the attribution grammar. This layer describes the procedures, never the legitimacy argument.",
  },
  {
    subject: "Hellenistic ruler cult and Ptolemaic double legitimacy",
    route: "/themes/royal-legitimacy",
    ownedBy: "theme",
    ownerSlug: "royal-legitimacy",
    reason:
      "The only theme using the phrase 'ruler cult', arguing kings accepting worship as gods, Ptolemy seizing Alexander's body, and the Ptolemies crowned in the ancient rites and shown in pharaonic dress.",
  },
  {
    subject: "The Amun priesthood as a rival to the throne",
    route: "/civilizations/new-kingdom",
    ownedBy: "civilization",
    ownerSlug: "new-kingdom",
    reason:
      "The page argues that empire wealth flowed to the temples of Amun at Thebes and that the priesthood grew into a power rivalling the throne. A temple-economy page here is about mechanism, not that argument.",
  },
];

export interface CultKeyPoint {
  claim: string;
  detail: string;
  level: EvidenceLevel;
}

export interface CultPractice {
  slug: string;
  title: string;
  standfirst: string;
  description: string;
  tier: CultTier;
  /** Slugs into content/civilizations. */
  civilizations: string[];
  period: string;

  /** What the evidence supports about the practice. */
  whatIsAttested: string[];
  /** Procedure, personnel, timing, cost — only what is grounded. */
  howItWorked: string[];
  /** Every class of evidence, each stating its limits. */
  evidenceBase: EvidenceBasis[];
  /** What the sources do not record. Minimum two, enforced. */
  silences: string[];
  /** Stories told about the rite. Never its documented origin. */
  aitia?: Aition[];

  keyPoints: CultKeyPoint[];
  terms?: Array<{ term: string; gloss: string }>;
  primarySources: SourceReference[];
  disputes?: Array<{
    question: string;
    positions: string;
    level: EvidenceLevel;
  }>;

  relatedPractices: string[];
  /** Slugs into src/data/cities.ts. */
  citySlugs: string[];
  /** Slugs into src/data/architecture.ts — the buildings, not the rite. */
  architectureRefs: string[];
  /** Slugs into src/data/institutions.ts. */
  institutionRefs: string[];
  /** Slugs into content/philosophers. */
  figureRefs: string[];
  /** Slugs into content/themes. */
  themeRefs: string[];
  /** Slugs into content/books. */
  bookRefs: string[];
  imageSlug?: string;
}

const S = (
  work: string,
  locus: string,
  summary: string,
  author?: string,
): SourceReference => ({ work, locus, summary, author });

export const CULT_PRACTICES: CultPractice[] = [];

const CULT_BY_SLUG = new Map(CULT_PRACTICES.map((c) => [c.slug, c]));

export function getCultPractice(slug: string): CultPractice | undefined {
  return CULT_BY_SLUG.get(slug);
}

export function cultPracticesByTier(tier: CultTier): CultPractice[] {
  return CULT_PRACTICES.filter((c) => c.tier === tier);
}

export function cultPracticesForCity(citySlug: string): CultPractice[] {
  return CULT_PRACTICES.filter((c) => c.citySlugs.includes(citySlug));
}

export { S as sourceRef };
