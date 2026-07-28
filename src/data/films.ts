/**
 * Film registry.
 *
 * Currently holds one film. The structure is general because the
 * platform will treat other screen adaptations of classical material the
 * same way, and because a registry keeps the eight pages of the film
 * cluster drawing their facts from one place rather than each repeating
 * a cast list.
 *
 * Sourcing discipline for this file:
 *   - Every factual field is drawn from published reporting or from the
 *     production's own credits, and `sourcing` records how well
 *     corroborated it is.
 *   - Where reported figures disagree, the disagreement is recorded in
 *     the field rather than resolved silently. The runtime is the live
 *     example.
 *   - No aggregate rating of our own is asserted anywhere, and the
 *     critical-reception figures are attributed to the aggregator that
 *     published them rather than presented as a verdict.
 *   - Nothing here comes from trailers, casting rumours or social media.
 */

export type Sourcing =
  /** Reported consistently by multiple independent outlets. */
  | "corroborated"
  /** Reported, but traced to a single source at the time of writing. */
  | "single-source"
  /** Reported figures disagree; the disagreement is stated. */
  | "conflicting";

export interface CastEntry {
  performer: string;
  /** The role as credited or as consistently reported. */
  role: string;
  /** Editorial note where the role's relation to Homer needs stating —
   *  a character not in the poem, a doubled role, an altered attribute. */
  note?: string;
  sourcing: Sourcing;
}

export interface CreditEntry {
  role: string;
  name: string;
}

export interface FilmRecord {
  slug: string;
  title: string;
  director: string;
  writer: string;
  releaseDate: string;
  releaseDateDisplay: string;
  premiere: string;
  runtimeNote: string;
  distributor: string;
  productionCompanies: string[];
  format: string;
  budgetNote: string;
  boxOfficeNote: string;
  receptionNote: string;
  filmingNote: string;
  locations: string[];
  credits: CreditEntry[];
  principalCast: CastEntry[];
  supportingCast: CastEntry[];
}

export const NOLAN_ODYSSEY: FilmRecord = {
  slug: "christopher-nolan-the-odyssey",
  title: "The Odyssey",
  director: "Christopher Nolan",
  writer: "Christopher Nolan",
  releaseDate: "2026-07-17",
  releaseDateDisplay: "17 July 2026",
  premiere:
    "World premiere 6 July 2026 at the Odeon Luxe Leicester Square, London.",
  runtimeNote:
    "Reported at 173 minutes; Rotten Tomatoes lists 2 hours 52 minutes. We record the discrepancy rather than choosing between them — the difference is one minute and may reflect rounding or differing certification cuts.",
  distributor: "Universal Pictures",
  productionCompanies: ["Universal Pictures", "Syncopy"],
  format:
    "Shot entirely with IMAX 70mm film cameras — reported as the first feature photographed wholly in the format. Released in IMAX 70mm and other premium large formats.",
  budgetNote:
    "Reported production budget of approximately $250 million. Studio budgets are reported rather than disclosed and should be treated as approximate.",
  boxOfficeNote:
    "Reported global opening weekend above $264 million, and a worldwide gross of approximately $652 million, placing it among the highest-grossing releases of 2026. Box-office figures are reported by trade press and are revised over a release's run.",
  receptionNote:
    "Rotten Tomatoes recorded a Tomatometer score of 94% from 447 critic reviews and an audience score of 97%. Reception was strongly positive with dissent: The Hollywood Reporter's David Rooney called the film uneven and no match for Oppenheimer's intellectual complexity while praising the ensemble.",
  filmingNote:
    "Principal photography ran 25 February to 5 August 2025, reported at 91 days across six countries.",
  locations: [
    "Morocco — Aït Benhaddou, Ouarzazate, Essaouira and Marrakesh, standing in for Troy",
    "Greece — Messenia, including Pylos, Methoni and Voidokilia beach; Acrocorinth",
    "Italy — Favignana in the Aegadian Islands; the Aeolian Islands",
    "Scotland — Findlater Castle, Culbin Forest and the Moray coast",
    "Iceland — the Snæfellsnes peninsula and the south coast",
    "Malta — the site traditionally called Calypso's Cave",
    "Western Sahara — Dakhla; the filming there drew public objection (see below)",
    "United States — the Falls Lake tank at Universal Studios, the production's only sound-stage work",
  ],
  credits: [
    { role: "Director and screenwriter", name: "Christopher Nolan" },
    { role: "Producers", name: "Emma Thomas and Christopher Nolan" },
    { role: "Cinematography", name: "Hoyte van Hoytema" },
    { role: "Editing", name: "Jennifer Lame" },
    { role: "Music", name: "Ludwig Göransson" },
    { role: "Production design", name: "Ruth De Jong" },
    { role: "Costume design", name: "Ellen Mirojnick" },
    { role: "Visual effects supervisor", name: "Andrew Jackson" },
    { role: "Visual effects", name: "DNEG" },
    { role: "Special effects and creature work", name: "Wētā Workshop" },
  ],
  principalCast: [
    {
      performer: "Matt Damon",
      role: "Odysseus",
      sourcing: "corroborated",
    },
    {
      performer: "Anne Hathaway",
      role: "Penelope",
      sourcing: "corroborated",
    },
    {
      performer: "Tom Holland",
      role: "Telemachus",
      sourcing: "corroborated",
    },
    {
      performer: "Robert Pattinson",
      role: "Antinous",
      note: "The film gives Antinous a back-story that is not in Homer, in which he avoided military service by having a servant's son go in his place.",
      sourcing: "corroborated",
    },
    {
      performer: "Lupita Nyong'o",
      role: "Helen and Clytemnestra",
      note: "A doubled role. The two are sisters in the standard tradition, both daughters of Leda; the film's framing of them as twins is a simplification the ancient genealogies do not straightforwardly support.",
      sourcing: "corroborated",
    },
    {
      performer: "Charlize Theron",
      role: "Calypso",
      sourcing: "corroborated",
    },
    {
      performer: "Zendaya",
      role: "Athena, and a young Trojan priestess of Athena",
      note: "The film connects the two: the goddess is presented in a form associated with a Trojan woman killed during the sack, which the production uses to keep divine agency ambiguous.",
      sourcing: "corroborated",
    },
    {
      performer: "Samantha Morton",
      role: "Circe",
      sourcing: "corroborated",
    },
    {
      performer: "John Leguizamo",
      role: "Eumaeus",
      note: "The film presents Eumaeus as blind and as Odysseus's former tutor. In Homer he is a working swineherd, is not blind, and is not a tutor.",
      sourcing: "corroborated",
    },
    {
      performer: "Jon Bernthal",
      role: "Menelaus",
      sourcing: "corroborated",
    },
    {
      performer: "Elliot Page",
      role: "Sinon",
      note: "Sinon is not a character in either Homeric poem. He belongs to the Epic Cycle and above all to Aeneid 2, roughly seven centuries later than Homer.",
      sourcing: "corroborated",
    },
    {
      performer: "Benny Safdie",
      role: "Agamemnon",
      sourcing: "corroborated",
    },
  ],
  supportingCast: [
    {
      performer: "Himesh Patel",
      role: "Eurylochus",
      sourcing: "single-source",
    },
    { performer: "Mia Goth", role: "Melantho", sourcing: "single-source" },
    {
      performer: "Bill Irwin",
      role: "Polyphemus — on-set performance",
      sourcing: "single-source",
    },
    { performer: "Jovan Adepo", role: "Elpenor", sourcing: "single-source" },
    {
      performer: "Ryan Hurst",
      role: "Mentor",
      note: "In Homer, Mentor is a real Ithacan whose form Athena repeatedly borrows. A film that gives Mentor an independent role is separating the man from the disguise.",
      sourcing: "single-source",
    },
    { performer: "James Remar", role: "Tiresias", sourcing: "single-source" },
    {
      performer: "Logan Marshall-Green",
      role: "Melanthius",
      sourcing: "single-source",
    },
    {
      performer: "Kate Fuglei",
      role: "Eurycleia",
      sourcing: "single-source",
    },
    { performer: "Corey Hawkins", role: "Polybus", sourcing: "single-source" },
    { performer: "Brian Vernel", role: "Irus", sourcing: "single-source" },
  ],
};

const FILM_ROOT = `/films/${NOLAN_ODYSSEY.slug}`;

/**
 * The pages of the film cluster. Held here so the hub, the sub-page
 * navigation and the sitemap all draw on one list.
 */
export const FILM_PAGES: ReadonlyArray<{
  path: string;
  label: string;
  summary: string;
}> = [
  {
    path: FILM_ROOT,
    label: "Christopher Nolan's The Odyssey",
    summary:
      "The film hub — verified production facts, credits, cast, and the platform's editorial position on adaptation.",
  },
  {
    path: `${FILM_ROOT}/review`,
    label: "The review",
    summary:
      "The principal review, judging the film as cinema and as an adaptation of Homer, with every departure classified.",
  },
  {
    path: `${FILM_ROOT}/homer-vs-film`,
    label: "Homer versus the film",
    summary:
      "The structured comparison: source, adaptation, type of change, probable reason, editorial assessment and evidence level.",
  },
  {
    path: `${FILM_ROOT}/what-the-film-changed`,
    label: "What the film changed",
    summary:
      "The verified ledger of adaptation claims, each with its evidence, classification and confidence.",
  },
  {
    path: `${FILM_ROOT}/characters`,
    label: "Characters",
    summary:
      "How each principal character is handled against the Homeric original, character by character.",
  },
  {
    path: `${FILM_ROOT}/historical-accuracy`,
    label: "Historical accuracy",
    summary:
      "Why the usual accuracy charge is framed wrongly, and what a properly framed version of it does and does not establish.",
  },
  {
    path: `${FILM_ROOT}/costumes-and-material-culture`,
    label: "Costumes and material culture",
    summary:
      "Helmets, ships, armour and halls — what was criticised, what the record supports, and what standard applies.",
  },
  {
    path: `${FILM_ROOT}/casting-and-authenticity`,
    label: "Casting and authenticity",
    summary:
      "Source fidelity, artistic freedom and cultural context — each casting decision assessed individually.",
  },
];

/**
 * Homeric characters with no counterpart in the film's reported cast.
 * Absence is harder to source than presence, so this list is limited to
 * characters whose omission is directly attested by published accounts
 * of the film rather than merely inferred from a cast list.
 */
export const OMITTED_FROM_FILM: ReadonlyArray<{
  name: string;
  homericRole: string;
  consequence: string;
}> = [
  {
    name: "Nausicaa",
    homericRole:
      "The Phaeacian princess of Odyssey 6, whose judgement on the shore saves Odysseus's life.",
    consequence:
      "The whole Phaeacian sequence goes with her, and with it the poem's model of hospitality performed perfectly and its frame for the wanderings.",
  },
  {
    name: "Alcinous and Arete",
    homericRole:
      "The Phaeacian king and queen, hosts of Books 7 and 8 and the audience for the hero's own account of his travels.",
    consequence:
      "The retrospective narration is relocated to Calypso, which keeps the non-linear structure but changes who is being persuaded and why.",
  },
  {
    name: "Laertes",
    homericRole:
      "Odysseus's father, reunited with him in the orchard in Book 24.",
    consequence:
      "The poem's three-generation frame is lost, along with its final recognition scene.",
  },
  {
    name: "Nestor",
    homericRole:
      "The old king of Pylos who receives Telemachus in Book 3 and tells him the story of Agamemnon's murder.",
    consequence:
      "Telemachus's journey is compressed to Sparta alone, removing one of the two functioning households the poem shows him.",
  },
];
