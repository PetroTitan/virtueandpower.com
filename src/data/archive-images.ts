/**
 * Archive image registry.
 *
 * The bust registry at src/data/busts.ts handles portrait photography
 * of figures the corpus carries; this file handles everything else —
 * architecture, ruins, maps, manuscripts, reliefs, inscriptions, and
 * any other museum-grade visual material the editorial system uses.
 *
 * The same editorial discipline applies as for the bust catalog and
 * the text source catalog: full provenance, verified licensing, no
 * uncertain attributions, no fabricated history. Adding a file to
 * /public/images/<kind>/ is not enough; an entry must be registered
 * here, and the human-readable provenance recorded in the
 * subdirectory README.
 */

/** Re-export the BustLicense enum from the bust registry. Identical
 *  semantics; we share the type rather than duplicate it. */
export type { BustLicense as ArchiveLicense } from "./busts";

/**
 * Visual category for the archive entry. Determines which
 * subdirectory under /public/images/ the file is vendored to, and
 * which README.md carries its provenance.
 *
 *   architecture  — buildings, columns, forums, temples, civic spaces
 *   ruins         — partial structures, archaeological-site
 *                   photography
 *   maps          — historical maps, modern reconstructions of
 *                   ancient geography
 *   manuscripts   — manuscript fragments, scribal pages, papyri
 *   relief        — narrative reliefs, frieze fragments
 *   inscription   — epigraphic material (cippi, milestones, votive
 *                   stones)
 */
export type ArchiveImageKind =
  | "architecture"
  | "ruins"
  | "maps"
  | "manuscripts"
  | "relief"
  | "inscription";

export type ArchiveImageCulture =
  | "greek"
  | "roman"
  | "persian"
  | "egyptian"
  | "byzantine"
  | "modern";

export interface ArchiveImage {
  /** Stable kebab-case identifier. */
  slug: string;
  /** Visual category — also determines the subdirectory under
   *  /public/images/. */
  kind: ArchiveImageKind;
  /** Human-readable subject (e.g. "The Roman Forum, looking east"). */
  subject: string;
  /** Cultural / civilizational origin of what the image depicts. */
  culture: ArchiveImageCulture;
  /** Period the work or site dates from (free-form text). */
  era: string;
  /** Where the original is held or the photograph was taken. */
  location: string;
  /** URL to the source file (Wikimedia Commons file page, museum
   *  open-access archive, etc.). */
  source: string;
  /** Licence under which we redistribute the local file. */
  license: import("./busts").BustLicense;
  /** Photographer credit where given. */
  photographer?: string;
  /** Local path under /public/ for use with next/image. */
  imagePath: string;
  /** Width of the locally-vendored file (the resized version). */
  width: number;
  /** Height of the locally-vendored file. */
  height: number;
  /** Editorial alt text. Sentence form, ends with a period. */
  alt: string;
  /** Caption rendered under the image. Conventionally subject · period · medium/site. */
  caption: string;
  /** Short attribution tail rendered alongside the caption. */
  attribution: string;
  /** Editorial note: why this image is in the catalog. */
  notes?: string;
}

export const archiveImages: ReadonlyArray<ArchiveImage> = [
  {
    slug: "roman-forum-view",
    kind: "ruins",
    subject: "The Roman Forum, overview from the western end",
    culture: "roman",
    era: "structures spanning the Republican and imperial periods",
    location: "Rome, Italy",
    source:
      "https://commons.wikimedia.org/wiki/File:Forum_Romanum_Rome_5.jpg",
    license: "cc-zero",
    photographer: "Jebulon",
    imagePath: "/images/ruins/roman-forum-view.webp",
    width: 1600,
    height: 1175,
    alt: "Overview of the Roman Forum looking east, with the Arch of Septimius Severus, the Curia Julia, the Temple of Antoninus and Faustina, and the Palatine Hill visible.",
    caption: "The Roman Forum, overview · Republican and imperial structures",
    attribution: "Rome · photo Jebulon · Wikimedia Commons (CC0)",
    notes:
      "Vendored for the /roman-republic study landing and for the imperial-era essays that need a civilizational anchor. The overview composition holds the working political space of the Republic, the Augustan additions, and the imperial monuments together in a single frame.",
  },
  {
    slug: "trajans-column",
    kind: "architecture",
    subject: "Trajan's Column, completed 113 CE",
    culture: "roman",
    era: "early 2nd century CE",
    location: "Forum of Trajan, Rome",
    source:
      "https://commons.wikimedia.org/wiki/File:Colonna_Traiana_Santissimo_Nome_di_Maria_dome_Rome.jpg",
    license: "cc-zero",
    photographer: "Jebulon",
    imagePath: "/images/architecture/trajans-column.webp",
    width: 1236,
    height: 1600,
    alt: "Trajan's Column standing in the Forum of Trajan, Rome — the spiral narrative relief of the Dacian Wars rising the full height of the shaft, with the dome of Santissimo Nome di Maria behind.",
    caption: "Trajan's Column · 113 CE · Marble",
    attribution: "Forum of Trajan, Rome · photo Jebulon · Wikimedia Commons (CC0)",
    notes:
      "Vendored for the Trajan figure entry. The single most influential narrative monument of antiquity; the spiral relief survives the loss of the bronze statue of Trajan that originally crowned it (a statue of Saint Peter has stood in its place since 1587).",
  },
  {
    slug: "pantheon-ceiling",
    kind: "architecture",
    subject: "The Pantheon ceiling, view of the dome and oculus",
    culture: "roman",
    era: "rebuilt c. 113–125 CE under Trajan and Hadrian",
    location: "Rome, Italy",
    source:
      "https://commons.wikimedia.org/wiki/File:Pantheon,_Rome,_ceiling,_2013-03-07.jpg",
    license: "cc-zero",
    photographer: "Szilas",
    imagePath: "/images/architecture/pantheon-ceiling.webp",
    width: 1067,
    height: 1600,
    alt: "Interior of the Pantheon in Rome — view from below the coffered dome looking up at the central oculus.",
    caption: "The Pantheon · 2nd century CE · Concrete and marble",
    attribution: "Rome · photo Szilas · Wikimedia Commons (CC0)",
    notes:
      "Vendored as a civilizational anchor. The most intact major imperial-era building, and the architectural type that European architects from Brunelleschi to Jefferson worked through. The coffered dome and oculus are the surviving record of Roman concrete engineering at its full reach.",
  },
  {
    slug: "colosseum-curves",
    kind: "architecture",
    subject: "The Colosseum, exterior curve in vertical perspective",
    culture: "roman",
    era: "Flavian, 70–80 CE",
    location: "Rome, Italy",
    source:
      "https://commons.wikimedia.org/wiki/File:Curves_perspective,_Colosseum,_Rome,_Italy.jpg",
    license: "cc-zero",
    photographer: "Jebulon",
    imagePath: "/images/architecture/colosseum-curves.webp",
    width: 1065,
    height: 1600,
    alt: "The Colosseum in Rome — exterior curve seen in vertical perspective from below.",
    caption: "The Colosseum · 70–80 CE · Travertine, tuff, brick-faced concrete",
    attribution: "Rome · photo Jebulon · Wikimedia Commons (CC0)",
    notes:
      "Vendored as a civilizational anchor for the Rome hub. The Flavian amphitheatre as the largest civic-spectacle architecture of antiquity and the architectural type that defined imperial-era leisure infrastructure across the empire.",
  },
  {
    slug: "parthenon-east",
    kind: "architecture",
    subject: "The Parthenon, east end on the Athenian Acropolis",
    culture: "greek",
    era: "Classical Greece, 447–432 BCE",
    location: "Acropolis, Athens, Greece",
    source:
      "https://commons.wikimedia.org/wiki/File:Parthenon_east_Acropolis,_Athens,_Greece.jpg",
    license: "cc-zero",
    photographer: "Jebulon",
    imagePath: "/images/architecture/parthenon-east.webp",
    width: 1055,
    height: 1600,
    alt: "The Parthenon, east front, on the Athenian Acropolis — Pentelic marble Doric temple to Athena Polias, built 447–432 BCE under Pericles.",
    caption: "The Parthenon · 5th century BCE · Pentelic marble",
    attribution: "Acropolis, Athens · photo Jebulon · Wikimedia Commons (CC0)",
    notes:
      "Vendored as the civilizational anchor for the Greece hub. Built under Pericles by Iktinos and Kallikrates with the sculptural programme overseen by Phidias; the central architectural statement of the high classical city.",
  },
  {
    slug: "delphi-apollo",
    kind: "architecture",
    subject: "The Temple of Apollo at Delphi, six columns standing",
    culture: "greek",
    era: "4th-century BCE temple on a much older sanctuary site",
    location: "Delphi, Greece",
    source:
      "https://commons.wikimedia.org/wiki/File:Delphes,_Gr%C3%A8ce._Temple_d%27Apollon._Six_colonnes.jpg",
    license: "cc-zero",
    photographer: "Jebulon",
    imagePath: "/images/architecture/delphi-apollo.webp",
    width: 1600,
    height: 1067,
    alt: "Six columns standing of the Temple of Apollo at Delphi, with the Phaedriades cliffs behind.",
    caption: "Temple of Apollo · Delphi · 4th century BCE",
    attribution: "Delphi · photo Jebulon · Wikimedia Commons (CC0)",
    notes:
      "Vendored for the Greece hub's gallery composition. Delphi was the panhellenic sanctuary the Greek city-states ranked themselves against and consulted before war and constitutional change; the temple of Apollo was its centre.",
  },
  {
    slug: "persepolis-apadana",
    kind: "relief",
    subject: "Eastern stairway of the Apadana, Persepolis — tribute procession",
    culture: "persian",
    era: "Achaemenid, c. 515–490 BCE under Darius I and Xerxes I",
    location: "Persepolis (Takht-e Jamshid), Iran",
    source:
      "https://commons.wikimedia.org/wiki/File:Persepolis_Apadana_Eastern_Stairway_Triangle.jpg",
    license: "public-domain",
    photographer: "JMCC1",
    imagePath: "/images/architecture/persepolis-apadana.webp",
    width: 1600,
    height: 1067,
    alt: "Bas-relief on the eastern stairway of the Apadana at Persepolis, depicting the Achaemenid tribute procession of subject peoples.",
    caption: "Apadana stairway · Persepolis · c. 500 BCE",
    attribution: "Persepolis · photo JMCC1 · Wikimedia Commons (Public Domain)",
    notes:
      "Vendored as the civilizational anchor for the Persia hub. The Apadana relief is the single most legible Achaemenid statement on the imperial order — tribute peoples (Medes, Elamites, Babylonians, Lydians, Egyptians, Scythians, Indians and others) arrayed in registers ascending toward the Great King.",
  },
  {
    slug: "giza-pyramids",
    kind: "architecture",
    subject: "The Pyramids of Giza, the three principal pyramids",
    culture: "egyptian",
    era: "Old Kingdom, c. 2600–2500 BCE",
    location: "Giza Plateau, near Cairo, Egypt",
    source:
      "https://commons.wikimedia.org/wiki/File:Pyramids_of_Giza,_Giza,_GG,_EGY_(47113315194).jpg",
    license: "cc-zero",
    photographer: "Tm",
    imagePath: "/images/architecture/giza-pyramids.webp",
    width: 1600,
    height: 1199,
    alt: "The three principal pyramids of Giza — Khufu, Khafre and Menkaure — on the Giza Plateau outside Cairo.",
    caption: "The Pyramids of Giza · Old Kingdom · Limestone and granite",
    attribution: "Giza · photo Tm · Wikimedia Commons (CC0)",
    notes:
      "Vendored as the civilizational anchor for the Egypt hub. The Old Kingdom pyramid complex at Giza is the architectural form most associated with pharaonic sacred-monarchical continuity in the long European imagination, although the Old Kingdom itself ended more than two thousand years before the periods most of the platform's primary classical material concerns.",
  },
  {
    slug: "karnak-hypostyle",
    kind: "architecture",
    subject: "The Great Hypostyle Hall of the Temple of Amun at Karnak",
    culture: "egyptian",
    era: "New Kingdom, c. 1290–1224 BCE under Seti I and Ramesses II",
    location: "Karnak, Luxor, Egypt",
    source:
      "https://commons.wikimedia.org/wiki/File:Karnak_Temple_Great_Hypostyle_Hall_2014.jpg",
    license: "cc-zero",
    photographer: "Tsyganov Sergey",
    imagePath: "/images/architecture/karnak-hypostyle.webp",
    width: 1600,
    height: 1315,
    alt: "Sandstone columns of the Great Hypostyle Hall of the Temple of Amun at Karnak, New Kingdom Egypt.",
    caption: "Karnak · Hypostyle Hall · New Kingdom",
    attribution: "Karnak, Luxor · photo Tsyganov Sergey · Wikimedia Commons (CC0)",
    notes:
      "Vendored for the Egypt hub's gallery composition. The Great Hypostyle Hall at Karnak is the largest surviving column hall of antiquity and the architectural statement of the New Kingdom theocratic state.",
  },
];


/** Look up an archive image by slug. */
export function getArchiveImage(slug: string): ArchiveImage | undefined {
  return archiveImages.find((i) => i.slug === slug);
}

/** Filter the archive by category. */
export function archiveImagesOfKind(
  kind: ArchiveImageKind,
): ReadonlyArray<ArchiveImage> {
  return archiveImages.filter((i) => i.kind === kind);
}
