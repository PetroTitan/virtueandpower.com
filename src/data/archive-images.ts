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
  | "mosaic"
  | "inscription"
  | "artifact"
  | "painting"
  | "coin";

export type ArchiveImageCulture =
  | "greek"
  | "roman"
  | "persian"
  | "mesopotamian"
  | "chinese"
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
  {
    slug: "erechtheum-acropolis",
    kind: "architecture",
    subject: "The Erechtheum on the Athenian Acropolis",
    culture: "greek",
    era: "Classical Greece, c. 421–406 BCE",
    location: "Acropolis, Athens, Greece",
    source:
      "https://commons.wikimedia.org/wiki/File:Erechtheum_Acropolis_Athens.jpg",
    license: "cc-zero",
    photographer: "Jebulon",
    imagePath: "/images/architecture/erechtheum-acropolis.webp",
    width: 1600,
    height: 1065,
    alt: "The Erechtheum on the Athenian Acropolis, with the Porch of the Caryatids visible on the south side, Pentelic marble Ionic temple of the late 5th century BCE.",
    caption: "The Erechtheum · 421–406 BCE · Pentelic marble",
    attribution: "Acropolis, Athens · photo Jebulon · Wikimedia Commons (CC0)",
    notes:
      "Vendored as a civilizational anchor for the Athens hub. The Erechtheum housed the most ancient cults of the Athenian polis (Athena Polias, Erechtheus, Poseidon), and its irregular plan accommodates the cult sites the Periclean rebuilding had to preserve.",
  },
  {
    slug: "hephaestus-agora",
    kind: "architecture",
    subject: "The Temple of Hephaestus seen from the Ancient Agora of Athens",
    culture: "greek",
    era: "Classical Greece, begun c. 449 BCE",
    location: "Ancient Agora, Athens, Greece",
    source:
      "https://commons.wikimedia.org/wiki/File:Temple_of_Hephaestus_from_ancient_agora_Athens.jpg",
    license: "cc-zero",
    photographer: "Jebulon",
    imagePath: "/images/architecture/hephaestus-agora.webp",
    width: 1600,
    height: 1065,
    alt: "The Temple of Hephaestus on Agoraios Kolonos, seen from the Ancient Agora of Athens — Pentelic marble Doric temple, mid 5th century BCE, the best-preserved temple of the Periclean building programme.",
    caption: "Temple of Hephaestus · 5th century BCE · Pentelic marble",
    attribution: "Ancient Agora, Athens · photo Jebulon · Wikimedia Commons (CC0)",
    notes:
      "Vendored as the Agora anchor for the Athens hub. The Temple of Hephaestus stands on the western edge of the working civic space — the Agora — where the assembly, the law-courts and the marketplace conducted the day-to-day political life of the polis.",
  },
  {
    slug: "dionysus-theatre",
    kind: "ruins",
    subject: "The Theatre of Dionysus on the south slope of the Acropolis",
    culture: "greek",
    era: "Classical Greece (original c. 5th century BCE; surviving stone form 4th century BCE)",
    location: "Acropolis, Athens, Greece",
    source:
      "https://commons.wikimedia.org/wiki/File:Theatre_of_Dionysus_Acropolis_Athens_Greece.jpg",
    license: "cc-zero",
    photographer: "Jebulon",
    imagePath: "/images/architecture/dionysus-theatre.webp",
    width: 1600,
    height: 1065,
    alt: "The Theatre of Dionysus, on the southern slope of the Athenian Acropolis — the working theatre of the Athenian dramatic festivals of the 5th and 4th centuries BCE.",
    caption: "Theatre of Dionysus · 4th-century BCE form · Marble seating",
    attribution: "South slope of the Acropolis · photo Jebulon · Wikimedia Commons (CC0)",
    notes:
      "Vendored for the Athens hub. The Theatre of Dionysus was the working theatre of the Athenian dramatic festivals — the tragedies of Aeschylus, Sophocles and Euripides, and the comedies of Aristophanes, were performed here before the assembled citizen body. The surviving stone form is the 4th-century reconstruction; the 5th-century original was wooden.",
  },
  {
    slug: "corinthian-helmet",
    kind: "artifact",
    subject: "Bronze Corinthian helmet, c. 600 BCE",
    culture: "greek",
    era: "Archaic Greece, c. 600 BCE",
    location: "National Archaeological Museum, Athens (Inv. 15153)",
    source:
      "https://commons.wikimedia.org/wiki/File:Corinthian_helmet_15153_NAMAthens.jpg",
    license: "cc-zero",
    photographer: "Jebulon",
    imagePath: "/images/architecture/corinthian-helmet.webp",
    width: 1558,
    height: 1600,
    alt: "Bronze Corinthian-type helmet of the Archaic Greek period, with full face and nasal, ca. 600 BCE, National Archaeological Museum of Athens.",
    caption: "Corinthian helmet · c. 600 BCE · Bronze",
    attribution: "National Archaeological Museum, Athens · photo Jebulon · Wikimedia Commons (CC0)",
    notes:
      "Vendored as the hoplite anchor — the Greek world's most recognizable item of warrior equipment. The Corinthian helmet, with its full-face form and nasal, was the standing Archaic and early-Classical infantry helmet of the citizen-soldier across the Greek city-states.",
  },
  {
    slug: "alexander-mosaic",
    kind: "mosaic",
    subject: "The Alexander Mosaic — Alexander and Bucephalus at the Battle of Issus",
    culture: "greek",
    era: "Roman-era copy after a late-4th-century BCE Greek original; mosaic c. 100 BCE",
    location: "Museo Archeologico Nazionale, Naples (from the House of the Faun, Pompeii)",
    source:
      "https://commons.wikimedia.org/wiki/File:Alexander_and_Bucephalus_-_Battle_of_Issus_mosaic_-_Museo_Archeologico_Nazionale_-_Naples_BW.jpg",
    license: "public-domain",
    photographer: "Berthold Werner",
    imagePath: "/images/architecture/alexander-mosaic.webp",
    width: 1600,
    height: 1133,
    alt: "Detail of the Alexander Mosaic — Alexander the Great on Bucephalus at the Battle of Issus — Roman copy after a Hellenistic Greek original, c. 100 BCE, House of the Faun, Pompeii.",
    caption: "Alexander Mosaic · House of the Faun, Pompeii · c. 100 BCE",
    attribution: "Museo Archeologico Nazionale, Naples · photo Berthold Werner · Wikimedia Commons (Public Domain)",
    notes:
      "The Roman-era floor mosaic from the House of the Faun in Pompeii, almost certainly copying a Greek panel painting of the late 4th century BCE. The most considered ancient visual statement of Alexander's encounter with the Achaemenid Persian world that the Hellenistic age was the consequence of.",
  },
  {
    slug: "arch-titus-relief",
    kind: "relief",
    subject: "Reliefs at the Arch of Titus, Forum Romanum",
    culture: "roman",
    era: "Flavian, c. 81 CE (built shortly after the death of Titus)",
    location: "Forum Romanum, Rome, Italy",
    source:
      "https://commons.wikimedia.org/wiki/File:Arc_Titus_Forum_romanum_Rome_Italy.jpg",
    license: "cc-zero",
    photographer: "Jebulon",
    imagePath: "/images/architecture/arch-titus-relief.webp",
    width: 1600,
    height: 1230,
    alt: "Reliefs in the bay of the Arch of Titus on the Via Sacra in the Forum Romanum, c. 81 CE — the triumphal panels commemorating the Jewish War of 70 CE.",
    caption: "Arch of Titus · Reliefs · 1st century CE",
    attribution: "Forum Romanum, Rome · photo Jebulon · Wikimedia Commons (CC0)",
    notes:
      "The Arch of Titus stands at the eastern end of the Forum Romanum on the Via Sacra. The Jerusalem-treasure relief inside the bay is the canonical Roman triumphal-relief composition. Vendored as a Roman atmosphere anchor.",
  },
  {
    slug: "lion-darius-susa",
    kind: "relief",
    subject: "Glazed-brick lion panel, Apadana of Darius at Susa",
    culture: "persian",
    era: "Achaemenid, c. 510 BCE under Darius I",
    location: "Louvre, Paris (Sb 3298), from the palace of Darius at Susa",
    source:
      "https://commons.wikimedia.org/wiki/File:Lion_Darius_Palace_Louvre_Sb3298.jpg",
    license: "public-domain",
    photographer: "Marie-Lan Nguyen (Jastrow)",
    imagePath: "/images/architecture/lion-darius-susa.webp",
    width: 1262,
    height: 980,
    alt: "Glazed-brick relief of a lion in profile, from the palace of Darius I at Susa, Achaemenid c. 510 BCE, Louvre Sb 3298.",
    caption: "Lion · Palace of Darius, Susa · c. 510 BCE · Glazed brick",
    attribution: "Louvre · Wikimedia Commons (Public Domain)",
    notes:
      "Achaemenid glazed-brick lion from the palace of Darius at Susa — one of the canonical Achaemenid decorative-architectural reliefs. Vendored as a Persian atmosphere anchor.",
  },
  {
    slug: "caesar-elephant-denarius",
    kind: "coin",
    subject: "Caesar elephant denarius — Julius Caesar's military mint coinage, 49–48 BCE",
    culture: "roman",
    era: "Late Roman Republic, 49–48 BCE",
    location: "Portable Antiquities Scheme record (FindID 603459); type widely held in major numismatic collections.",
    source:
      "https://commons.wikimedia.org/wiki/File:Roman_silver_denarius_elephant_(FindID_603459).jpg",
    license: "cc-by-sa",
    photographer: "Fæ (PAS / Wikimedia)",
    imagePath: "/images/architecture/caesar-elephant-denarius.webp",
    width: 1600,
    height: 887,
    alt: "Silver denarius of Julius Caesar, 49–48 BCE — obverse showing an elephant trampling a serpent above the legend CAESAR, reverse with priestly emblems (apex, simpulum, axe, culullus).",
    caption: "Caesar elephant denarius · 49–48 BCE · Silver",
    attribution: "PAS record FindID 603459 · photo Fæ · Wikimedia Commons (CC BY-SA 4.0)",
    notes:
      "Caesar's mobile-mint coinage struck early in the civil war. The elephant-trampling-serpent obverse is one of the most-reproduced ancient coin images, and the denarius is the canonical late-Republican coin type. Licensed CC BY-SA 4.0; attribution carried on the in-page caption.",
  },
  {
    slug: "athenian-owl-tetradrachm",
    kind: "coin",
    subject: "Athenian silver tetradrachm — head of Athena and the owl",
    culture: "greek",
    era: "Classical Athens, 454–404 BCE",
    location: "Staatliche Münzsammlung, Munich",
    source:
      "https://commons.wikimedia.org/wiki/File:Athens_-_454-404_BC_-_silver_tetradrachm_-_head_of_Athena_-_owl_-_M%C3%BCnchen_SMS.jpg",
    license: "cc-by-sa",
    photographer: "ArchaiOptix",
    imagePath: "/images/architecture/athenian-owl-tetradrachm.webp",
    width: 1600,
    height: 1600,
    alt: "Athenian silver tetradrachm of the classical period, 454–404 BCE — obverse: helmeted head of Athena; reverse: owl of Athena with olive sprig and the inscription ΑΘΕ (Athens).",
    caption: "Athenian tetradrachm · 5th century BCE · Silver",
    attribution: "Staatliche Münzsammlung, Munich · photo ArchaiOptix · Wikimedia Commons (CC BY-SA 4.0)",
    notes:
      "The Athenian owl tetradrachm was the working international currency of the eastern Mediterranean during the Athenian fifth-century *archē* and after. Iconographically: Athena obverse, owl reverse with olive sprig and ethnic abbreviation ΑΘΕ. Licensed CC BY-SA 4.0; attribution carried on the in-page caption.",
  },
  {
    slug: "arch-of-constantine",
    kind: "architecture",
    subject: "The Arch of Constantine, lateral view, Rome",
    culture: "roman",
    era: "Late Roman, dedicated 315 CE",
    location: "Rome, Italy (beside the Colosseum)",
    source:
      "https://commons.wikimedia.org/wiki/File:Arch_of_Constantine_(Rome)_,lateral_view.jpg",
    license: "cc-by-sa",
    photographer: "Livioandronico2013",
    imagePath: "/images/architecture/arch-of-constantine.webp",
    width: 1064,
    height: 1600,
    alt: "The Arch of Constantine in Rome, seen from the side — a triple triumphal arch dedicated in 315 CE, much of its sculptural decoration reused (spolia) from earlier monuments of Trajan, Hadrian and Marcus Aurelius.",
    caption: "Arch of Constantine · 315 CE · Marble with reused reliefs",
    attribution: "Rome · photo Livioandronico2013 · Wikimedia Commons (CC BY-SA 4.0)",
    notes:
      "Vendored as the hero anchor for the Late Empire hub and the Constantine figure entry. The arch's reuse of Trajanic, Hadrianic and Antonine reliefs is itself the visual argument of the Constantinian regime — the new order claiming the prestige of the high-empire 'good emperors'. Licensed CC BY-SA 4.0; attribution carried on the in-page caption.",
  },
  {
    slug: "pont-du-gard",
    kind: "architecture",
    subject: "The Pont du Gard aqueduct bridge over the Gardon",
    culture: "roman",
    era: "1st century CE",
    location: "near Vers-Pont-du-Gard, southern France",
    source: "https://commons.wikimedia.org/wiki/File:Pont_du_Gard_BLS.jpg",
    license: "cc-by-sa",
    photographer: "Benh Lieu Song",
    imagePath: "/images/architecture/pont-du-gard.webp",
    width: 1600,
    height: 617,
    alt: "The Pont du Gard, a three-tiered Roman aqueduct bridge spanning the river Gardon in southern France, built in the first century CE as part of the aqueduct carrying water some fifty kilometres to the city of Nîmes.",
    caption: "Pont du Gard · 1st century CE · Limestone",
    attribution: "Gardon, France · photo Benh Lieu Song · Wikimedia Commons (CC BY-SA 3.0)",
    notes:
      "Vendored as the engineering anchor for the High Empire hub and the army-and-state / provincial-government reading. The most famous surviving Roman aqueduct, and the most legible single statement of the imperial state in physical form — infrastructure as governance. Licensed CC BY-SA 3.0; attribution carried on the in-page caption.",
  },
  {
    slug: "maison-carree",
    kind: "architecture",
    subject: "The Maison Carrée at Nîmes, an Augustan-era temple",
    culture: "roman",
    era: "early 1st century CE (Augustan)",
    location: "Nîmes (Nemausus), France",
    source: "https://commons.wikimedia.org/wiki/File:Maison_Carree_in_Nimes_(1).jpg",
    license: "cc-by-sa",
    photographer: "Krzysztof Golik",
    imagePath: "/images/architecture/maison-carree.webp",
    width: 1600,
    height: 1151,
    alt: "The Maison Carrée at Nîmes, an exceptionally well-preserved Roman temple of the Augustan period — a hexastyle Corinthian temple originally dedicated to Gaius and Lucius Caesar, the grandsons and intended heirs of Augustus.",
    caption: "Maison Carrée · early 1st century CE · Limestone",
    attribution: "Nîmes, France · photo Krzysztof Golik · Wikimedia Commons (CC BY-SA 4.0)",
    notes:
      "Vendored as a Principate anchor. One of the best-preserved temples of the Roman world, dedicated to Augustus's heirs — the imperial cult in provincial architectural form. Its proportions later furnished the model for Jefferson's Virginia State Capitol. Licensed CC BY-SA 4.0; attribution carried on the in-page caption.",
  },
  {
    slug: "tetrarchs-venice",
    kind: "artifact",
    subject: "The Portrait of the Four Tetrarchs, porphyry sculpture group",
    culture: "roman",
    era: "c. 300 CE",
    location: "façade of St Mark's Basilica, Venice (taken from Constantinople in 1204)",
    source:
      "https://commons.wikimedia.org/wiki/File:Portrait_of_the_Four_Tetrarchs_(Monumento_ai_Tetrarchi),_San_Marco,_Venice_(36992141183).jpg",
    license: "cc-by",
    photographer: "Dimitris Kamaras",
    imagePath: "/images/architecture/tetrarchs-venice.webp",
    width: 1600,
    height: 1200,
    alt: "The porphyry Portrait of the Four Tetrarchs, c. 300 CE, set into the corner of St Mark's Basilica in Venice — the two Augusti and two Caesares of Diocletian's tetrarchy shown as identical, embracing, abstract figures of imperial office rather than individuals.",
    caption: "The Four Tetrarchs · c. 300 CE · Porphyry",
    attribution: "St Mark's, Venice · photo Dimitris Kamaras · Wikimedia Commons (CC BY 2.0)",
    notes:
      "Vendored for the Late Empire hub and the Diocletian figure entry. The Dominate's image of itself: the four co-emperors rendered identical and interchangeable, individuality dissolved into the institution of office. Carved in imperial porphyry; looted from Constantinople during the Fourth Crusade in 1204. Licensed CC BY 2.0; attribution carried on the in-page caption.",
  },
  {
    slug: "aurelian-walls",
    kind: "ruins",
    subject: "A standing section of the Aurelian Walls of Rome",
    culture: "roman",
    era: "begun 271–275 CE under Aurelian",
    location: "Rome, Italy",
    source: "https://commons.wikimedia.org/wiki/File:Aurelian_Walls_Rome_2011_1.jpg",
    license: "public-domain",
    photographer: "Karelj",
    imagePath: "/images/ruins/aurelian-walls.webp",
    width: 1600,
    height: 926,
    alt: "A standing brick-faced section of the Aurelian Walls of Rome, the defensive circuit begun under the emperor Aurelian in the 270s CE to enclose and protect the imperial capital.",
    caption: "Aurelian Walls · 270s CE · Brick-faced concrete",
    attribution: "Rome · photo Karelj · Wikimedia Commons (Public Domain)",
    notes:
      "Vendored for the Late Empire hub and the Aurelian figure entry. For three centuries the city of Rome had needed no walls; that Aurelian built them in the 270s is the plainest possible statement that the interior peace of the Principate was over and the frontier was no longer reliably distant.",
  },
  {
    slug: "gate-of-all-nations",
    kind: "architecture",
    subject: "The Gate of All Nations at Persepolis",
    culture: "persian",
    era: "Achaemenid, built under Xerxes I, early 5th century BCE",
    location: "Persepolis (Takht-e Jamshid), Iran",
    source:
      "https://commons.wikimedia.org/wiki/File:Persepolis_%E2%80%93_Gate_of_All_Nations_02.jpg",
    license: "cc-by-sa",
    photographer: "Skot",
    imagePath: "/images/architecture/gate-of-all-nations.webp",
    width: 1600,
    height: 1067,
    alt: "The Gate of All Nations at Persepolis, built under Xerxes I — the monumental gateway through which delegations of the empire's subject peoples entered the ceremonial capital, flanked by colossal lamassu (human-headed winged bulls).",
    caption: "Gate of All Nations · Persepolis · early 5th century BCE",
    attribution: "Persepolis, Iran · photo Skot · Wikimedia Commons (CC BY-SA 4.0)",
    notes:
      "Vendored as the hero anchor for the Persian Imperial System hub and the Xerxes figure entry. Xerxes's gateway received the delegations of the empire's peoples — the architectural statement of the Achaemenid order receiving its subjects. Licensed CC BY-SA 4.0; attribution carried on the in-page caption.",
  },
  {
    slug: "tomb-of-cyrus",
    kind: "architecture",
    subject: "The Tomb of Cyrus the Great at Pasargadae",
    culture: "persian",
    era: "Achaemenid, c. 530 BCE",
    location: "Pasargadae, Iran",
    source:
      "https://commons.wikimedia.org/wiki/File:Tomb_of_Cyrus_the_Great.jpg",
    license: "cc-by-sa",
    photographer: "Mohammad Reza Domiri Ganji",
    imagePath: "/images/architecture/tomb-of-cyrus.webp",
    width: 783,
    height: 1175,
    alt: "The free-standing stepped limestone tomb of Cyrus the Great at Pasargadae, c. 530 BCE — a gabled chamber on a six-tiered plinth, the burial place of the founder of the Achaemenid empire.",
    caption: "Tomb of Cyrus the Great · Pasargadae · c. 530 BCE",
    attribution: "Pasargadae, Iran · photo Mohammad Reza Domiri Ganji · Wikimedia Commons (CC BY-SA 4.0)",
    notes:
      "Vendored for the Cyrus the Great figure entry and the Achaemenid Empire hub. The still-standing tomb of the founder; Alexander is recorded as visiting and restoring it, a measure of Cyrus's standing even with his conquerors. Licensed CC BY-SA 4.0; attribution carried on the in-page caption.",
  },
  {
    slug: "persepolis-columns",
    kind: "architecture",
    subject: "The standing columns of the Apadana, Persepolis",
    culture: "persian",
    era: "Achaemenid, begun under Darius I, completed under Xerxes I",
    location: "Persepolis (Takht-e Jamshid), Iran",
    source:
      "https://commons.wikimedia.org/wiki/File:Ruins_of_the_Apadana_Palace_(4691185332).jpg",
    license: "cc-by",
    photographer: "A. Davey",
    imagePath: "/images/architecture/persepolis-columns.webp",
    width: 1121,
    height: 1600,
    alt: "Surviving columns of the Apadana audience hall at Persepolis, the great ceremonial palace begun by Darius I and completed by Xerxes I — once thirty-six columns some twenty metres high.",
    caption: "Apadana columns · Persepolis · 5th century BCE",
    attribution: "Persepolis, Iran · photo A. Davey · Wikimedia Commons (CC BY 2.0)",
    notes:
      "Vendored for the Achaemenid Empire hub and the Darius figure entry. The Apadana was the largest single building of the ancient world before the Roman imperial period; its surviving columns are the canonical image of Persepolis. Licensed CC BY 2.0; attribution carried on the in-page caption.",
  },
  {
    slug: "naqsh-e-rustam",
    kind: "ruins",
    subject: "The Achaemenid royal tombs at Naqsh-e Rustam",
    culture: "persian",
    era: "Achaemenid, 5th century BCE",
    location: "Naqsh-e Rustam, near Persepolis, Iran",
    source:
      "https://commons.wikimedia.org/wiki/File:Hillside_Tombs,_Naqsh-E_Rostam_(14288601687).jpg",
    license: "cc-by",
    photographer: "Julia Maudlin",
    imagePath: "/images/ruins/naqsh-e-rustam.webp",
    width: 1600,
    height: 1200,
    alt: "The cliff face at Naqsh-e Rustam with the cross-shaped rock-cut façades of the Achaemenid royal tombs, traditionally those of Darius I and his successors, above later Sasanian reliefs.",
    caption: "Royal tombs · Naqsh-e Rustam · 5th century BCE and later",
    attribution: "Naqsh-e Rustam, Iran · photo Julia Maudlin · Wikimedia Commons (CC BY 2.0)",
    notes:
      "Vendored for the Achaemenid Empire and Persia-and-the-Mediterranean hubs. The rock-cut tombs of the Achaemenid kings, carved high in the cliff; the site was reused by the Sasanians for their own reliefs, a visible instance of the Iranian imperial continuity the platform reads. Licensed CC BY 2.0; attribution carried on the in-page caption.",
  },
  {
    slug: "behistun-relief",
    kind: "relief",
    subject: "The Behistun relief of Darius I",
    culture: "persian",
    era: "Achaemenid, c. 520 BCE",
    location: "Mount Behistun (Bisotun), Kermanshah Province, Iran",
    source:
      "https://commons.wikimedia.org/wiki/File:Behistun_relief_Darius_and_Gaumata.jpg",
    license: "cc-by-sa",
    photographer: "Patrick C",
    imagePath: "/images/architecture/behistun-relief.webp",
    width: 1238,
    height: 1600,
    alt: "The relief of the Behistun Inscription — Darius I, bow in hand, treading on the prostrate usurper Gaumata, facing a line of bound rebel kings, beneath the winged symbol of Ahuramazda.",
    caption: "Behistun relief · Darius I · c. 520 BCE",
    attribution: "Mount Behistun, Iran · photo Patrick C · Wikimedia Commons (CC BY-SA 2.0)",
    notes:
      "Vendored for the Darius figure entry and the Behistun Inscription text page. The relief accompanying the empire's longest royal inscription; the scene of the king triumphing over the Lie is the canonical Achaemenid statement of legitimacy. Licensed CC BY-SA 2.0; attribution carried on the in-page caption.",
  },
  {
    slug: "daric-coin",
    kind: "coin",
    subject: "Achaemenid gold daric — the running archer type",
    culture: "persian",
    era: "Achaemenid, 5th–4th century BCE",
    location: "The Metropolitan Museum of Art, New York (52.127.1)",
    source:
      "https://commons.wikimedia.org/wiki/File:Daric_with_king_MET_me_52_127_1.jpg",
    license: "cc-zero",
    photographer: "The Metropolitan Museum of Art (Open Access)",
    imagePath: "/images/architecture/daric-coin.webp",
    width: 800,
    height: 742,
    alt: "An Achaemenid gold daric showing the Great King in the running-kneeling 'archer' posture, holding a bow and spear — the standard imperial gold coinage introduced under Darius I.",
    caption: "Gold daric · Achaemenid · 5th–4th century BCE",
    attribution: "The Metropolitan Museum of Art · Wikimedia Commons (CC0)",
    notes:
      "Vendored for the Persian Imperial System and Achaemenid hubs. The daric was the empire's standard high-value gold coin, introduced under Darius I; the royal-archer type made the coinage a portable image of the king. Metropolitan Museum Open Access (CC0).",
  },
  {
    slug: "persepolis-bull-capital",
    kind: "artifact",
    subject: "Double-bull column capital from the Apadana, Persepolis",
    culture: "persian",
    era: "Achaemenid, 5th century BCE",
    location: "National Museum of Iran, Tehran (from Persepolis)",
    source:
      "https://commons.wikimedia.org/wiki/File:Double_Bull_Column_Capital_from_the_Apadana_in_Persepolis_%E2%80%93_National_Museum_of_Iran.jpg",
    license: "cc-by-sa",
    photographer: "Skot",
    imagePath: "/images/architecture/persepolis-bull-capital.webp",
    width: 1067,
    height: 1600,
    alt: "A double-bull (addorsed bull-protome) column capital from the Apadana at Persepolis, now in the National Museum of Iran — two kneeling bulls back to back, the saddle between them carrying the roof beams.",
    caption: "Double-bull capital · Apadana, Persepolis · 5th century BCE",
    attribution: "National Museum of Iran · photo Skot · Wikimedia Commons (CC BY-SA 4.0)",
    notes:
      "Vendored for the Persian Imperial System hub. The addorsed-bull capital is the signature Achaemenid architectural element, fusing Mesopotamian and Iranian motifs into the imperial style; the Apadana's columns were crowned with them. Licensed CC BY-SA 4.0; attribution carried on the in-page caption.",
  },

  // ─── Phase 17 · Founders, lawgivers & constitutions ──────────────────
  {
    slug: "hammurabi-stele",
    kind: "relief",
    subject: "The upper relief of the Code of Hammurabi stele",
    culture: "mesopotamian",
    era: "Old Babylonian, c. 1754 BCE",
    location: "Musée du Louvre, Paris (Sb 8)",
    source:
      "https://commons.wikimedia.org/wiki/File:P1050763_Louvre_code_Hammurabi_face_rwk.JPG",
    license: "cc-by",
    photographer: "Mbzt",
    imagePath: "/images/artifacts/hammurabi-stele.webp",
    width: 972,
    height: 1600,
    alt: "The carved upper register of the basalt stele of Hammurabi: the king standing in worship before the enthroned sun-god Shamash, who hands him the rod and ring of just rule, above the dense columns of cuneiform law.",
    caption: "Code of Hammurabi stele, upper relief · c. 1754 BCE · Basalt",
    attribution: "Louvre · photo Mbzt · Wikimedia Commons (CC BY 3.0)",
    notes:
      "Vendored for the Hammurabi figure entry, the Code of Hammurabi text page, and the Babylon hub. The relief makes the code's central claim visible — the king's law is the god's justice, received and published. Licensed CC BY 3.0; attribution carried on the in-page caption.",
  },
  {
    slug: "ishtar-gate",
    kind: "architecture",
    subject: "The reconstructed Ishtar Gate of Babylon",
    culture: "mesopotamian",
    era: "Neo-Babylonian, c. 575 BCE (reign of Nebuchadnezzar II)",
    location: "Pergamon Museum, Berlin",
    source:
      "https://commons.wikimedia.org/wiki/File:Pergamonmuseum_Ishtartor_03.jpg",
    license: "cc-by-sa",
    photographer: "Hahaha",
    imagePath: "/images/architecture/ishtar-gate.webp",
    width: 1600,
    height: 1200,
    alt: "The reconstructed Ishtar Gate of Babylon in the Pergamon Museum — a monumental arched gateway faced in lapis-blue glazed brick, ranked with reliefs of bulls and dragons.",
    caption: "Ishtar Gate, reconstruction · Neo-Babylonian, c. 575 BCE · Glazed brick",
    attribution: "Pergamon Museum, Berlin · photo Hahaha · Wikimedia Commons (CC BY-SA 2.5)",
    notes:
      "Vendored for the Babylon hub as the civilization's signature monument. Built under Nebuchadnezzar II, two centuries after Hammurabi, but the canonical visual image of Babylonian royal architecture. Licensed CC BY-SA 2.5; attribution carried on the in-page caption.",
  },
  {
    slug: "babylon-processional-lion",
    kind: "relief",
    subject: "Striding lion of the Processional Way, Babylon",
    culture: "mesopotamian",
    era: "Neo-Babylonian, c. 575 BCE",
    location: "Pergamon Museum, Berlin",
    source:
      "https://commons.wikimedia.org/wiki/File:Reconstructed_Processional_Street_of_Babylon_showing_striding_and_roaring_lions._From_Babylon,_Iraq._Pergamon_Museum_in_Berlin.jpg",
    license: "cc-by-sa",
    photographer: "Osama Shukir Muhammed Amin FRCP(Glasg)",
    imagePath: "/images/artifacts/babylon-processional-lion.webp",
    width: 1600,
    height: 1068,
    alt: "Reconstructed wall of the Processional Way of Babylon, ranked with striding lions in moulded relief on a field of lapis-blue glazed brick — the lion of Ishtar, emblem of the city.",
    caption: "Processional Way lions, Babylon · Neo-Babylonian, c. 575 BCE · Glazed brick",
    attribution: "Pergamon Museum, Berlin · photo Osama S. M. Amin · Wikimedia Commons (CC BY-SA 4.0)",
    notes:
      "Vendored for the Babylon hub. The striding lion of Ishtar is the most reproduced single image of Babylonian monumental art; the Processional Way ran from the Ishtar Gate into the city. Licensed CC BY-SA 4.0; attribution carried on the in-page caption.",
  },
  {
    slug: "gortyn-law-code",
    kind: "inscription",
    subject: "The Great Code of Gortyn, boustrophedon legal inscription",
    culture: "greek",
    era: "Archaic-to-Classical Crete, c. 450 BCE",
    location: "Gortyn, Crete",
    source:
      "https://commons.wikimedia.org/wiki/File:Boustrophedon_inscriptions_Gortys.jpg",
    license: "cc-zero",
    photographer: "Jebulon",
    imagePath: "/images/artifacts/gortyn-law-code.webp",
    width: 1600,
    height: 1320,
    alt: "A stretch of the Great Code of Gortyn carved into a curved stone wall — long lines of archaic Greek letters running in boustrophedon, alternately left-to-right and right-to-left.",
    caption: "The Great Code of Gortyn · Crete, c. 450 BCE · Limestone inscription",
    attribution: "Gortyn, Crete · photo Jebulon · Wikimedia Commons (CC0)",
    notes:
      "Vendored for the codification theme and the Athenian-reforms and law essays. The longest surviving Greek law inscription, written boustrophedon; the physical case for codification as a public, consultable standard. CC0 (public-domain dedication).",
  },
  {
    slug: "terracotta-army",
    kind: "ruins",
    subject: "Pit 1 of the Terracotta Army, mausoleum of the First Emperor",
    culture: "chinese",
    era: "Qin dynasty, c. 210 BCE",
    location: "Mausoleum of Qin Shi Huang, Lintong, Xi'an",
    source:
      "https://commons.wikimedia.org/wiki/File:Terracotta_Army,_View_of_Pit_1.jpg",
    license: "cc-by",
    photographer: "Jmhullot",
    imagePath: "/images/ruins/terracotta-army.webp",
    width: 1600,
    height: 1067,
    alt: "Ranks of life-size terracotta soldiers standing in the excavated earthen corridors of Pit 1 at the mausoleum of the First Emperor of China, the army drawn up in formation underground.",
    caption: "Terracotta Army, Pit 1 · Qin dynasty, c. 210 BCE · Fired earthenware",
    attribution: "Mausoleum of Qin Shi Huang, Xi'an · photo Jmhullot · Wikimedia Commons (CC BY 3.0)",
    notes:
      "Vendored for the Qin Shi Huang figure entry and the early-imperial-China hub. The buried army is the visible measure of the scale the First Emperor's centralised state could command. Licensed CC BY 3.0; attribution carried on the in-page caption.",
  },
  {
    slug: "terracotta-warrior",
    kind: "artifact",
    subject: "Terracotta Army infantryman, close view",
    culture: "chinese",
    era: "Qin dynasty, c. 210 BCE",
    location: "Mausoleum of Qin Shi Huang, Lintong, Xi'an",
    source:
      "https://commons.wikimedia.org/wiki/File:Terracota_warrior_close-up.jpg",
    license: "cc-by-sa",
    photographer: "J. Arpon",
    imagePath: "/images/artifacts/terracotta-warrior.webp",
    width: 1148,
    height: 1600,
    alt: "Close view of a single terracotta soldier from the army of the First Emperor — an individually modelled face, topknot and armoured torso, each figure made distinct.",
    caption: "Terracotta infantryman · Qin dynasty, c. 210 BCE · Fired earthenware",
    attribution: "Mausoleum of Qin Shi Huang, Xi'an · photo J. Arpon · Wikimedia Commons (CC BY-SA 3.0)",
    notes:
      "Vendored for the Qin Shi Huang figure entry and the early-imperial-China hub. The individuation of the figures is itself an administrative fact — a standardised production system that still produced distinct faces at scale. Licensed CC BY-SA 3.0.",
  },
  {
    slug: "great-wall-jinshanling",
    kind: "architecture",
    subject: "The Great Wall of China at Jinshanling",
    culture: "chinese",
    era: "the visible masonry is Ming (14th–16th c. CE), on the line of far older northern walls",
    location: "Jinshanling, Hebei, China",
    source:
      "https://commons.wikimedia.org/wiki/File:The_Great_Wall_of_China_at_Jinshanling-edit.jpg",
    license: "cc-by-sa",
    photographer: "Severin.stalder",
    imagePath: "/images/architecture/great-wall-jinshanling.webp",
    width: 1600,
    height: 1063,
    alt: "The Great Wall of China running along a ridgeline at Jinshanling, watchtowers stepping away over the hills into haze.",
    caption: "The Great Wall at Jinshanling · Ming-era masonry on a far older line",
    attribution: "Jinshanling, China · photo Severin.stalder · Wikimedia Commons (CC BY-SA 3.0)",
    notes:
      "Vendored for the early-imperial-China hub as the emblem of the northern frontier. The visible brick wall is Ming, not Qin; the caption and the hub text are explicit that Qin Shi Huang's contribution was the first integration of earlier earthen walls, not this masonry. Licensed CC BY-SA 3.0.",
  },
  {
    slug: "confucius-portrait",
    kind: "painting",
    subject: "Confucius, after the Tang-dynasty painter Wu Daozi",
    culture: "chinese",
    era: "traditional portrait type attributed to Wu Daozi (8th c. CE), of the sage who lived 551–479 BCE",
    location: "after Wu Daozi (685–758 CE)",
    source:
      "https://commons.wikimedia.org/wiki/File:Confucius_Tang_Dynasty.jpg",
    license: "public-domain",
    photographer: "after Wu Daozi (Tang dynasty)",
    imagePath: "/images/artifacts/confucius-portrait.webp",
    width: 350,
    height: 640,
    alt: "The traditional standing portrait of Confucius after Wu Daozi — the sage in robes, hands clasped, a sword at his side, in the canonical Chinese image of the Master.",
    caption: "Confucius · traditional portrait type after Wu Daozi · Tang dynasty",
    attribution: "after Wu Daozi · Wikimedia Commons (public domain)",
    notes:
      "Vendored for the Confucius figure entry and the early-imperial-China hub. A traditional portrait type, not a contemporary likeness — no such likeness exists; the image is the canonical Chinese representation of the sage. Public domain by age.",
  },
  {
    slug: "leonidas-hoplite",
    kind: "artifact",
    subject: "Marble statue of a hoplite, known as 'Leonidas'",
    culture: "greek",
    era: "early Classical Sparta, c. 480–470 BCE",
    location: "Archaeological Museum of Sparta",
    source:
      "https://commons.wikimedia.org/wiki/File:Statue_of_a_hoplite,_known_as_%E2%80%9CLeonidas.%E2%80%9D_5th_cent._B.C.jpg",
    license: "cc-by-sa",
    photographer: "George E. Koronaios",
    imagePath: "/images/artifacts/leonidas-hoplite.webp",
    width: 1162,
    height: 1600,
    alt: "The marble torso of an early-Classical Spartan warrior, helmeted with a crested Corinthian helmet, found on the Spartan acropolis and traditionally called 'Leonidas.'",
    caption: "Hoplite known as 'Leonidas' · Sparta, c. 480–470 BCE · Marble",
    attribution: "Archaeological Museum of Sparta · photo G. E. Koronaios · Wikimedia Commons (CC BY-SA 4.0)",
    notes:
      "Vendored for the Sparta hub, the Lycurgus figure and the Athens-vs-Sparta and Rome-vs-Sparta comparisons. The identification with Leonidas is traditional, not certain; the figure is the finest surviving Spartan representation of the citizen-soldier. Licensed CC BY-SA 4.0.",
  },
  {
    slug: "pnyx-athens",
    kind: "ruins",
    subject: "The Pnyx, meeting place of the Athenian assembly",
    culture: "greek",
    era: "Classical Athens, the hill in use as the assembly ground from the late 6th century BCE",
    location: "Athens, Greece",
    source:
      "https://commons.wikimedia.org/wiki/File:View_of_the_Acropolis_of_Athens_and_Mount_Lycabettus_from_the_Orator%E2%80%99s_Bema_on_the_Pnyx_on_23_September_2018.jpg",
    license: "cc-zero",
    photographer: "George E. Koronaios",
    imagePath: "/images/ruins/pnyx-athens.webp",
    width: 1600,
    height: 1067,
    alt: "The view from the speaker's platform on the Pnyx hill toward the Acropolis of Athens and Mount Lycabettus — the ground on which the Athenian citizen assembly met and voted.",
    caption: "The Pnyx, looking to the Acropolis · Athens · assembly ground from c. 500 BCE",
    attribution: "Athens · photo G. E. Koronaios · Wikimedia Commons (CC0)",
    notes:
      "Vendored for the Athenian-reforms hub and the invention-of-citizenship essay. The Pnyx is where the reforms of Solon and Cleisthenes were finally exercised — the physical site of Athenian self-government. CC0 (public-domain dedication).",
  },

  // ─── Plutarch deepening ──────────────────────────────────────────────
  {
    slug: "lion-of-chaeronea",
    kind: "artifact",
    subject: "The Lion of Chaeronea, funerary monument of the Theban Sacred Band",
    culture: "greek",
    era: "erected after the battle of Chaeronea, 338 BCE; restored 20th century",
    location: "Chaeronea, Boeotia, Greece",
    source:
      "https://commons.wikimedia.org/wiki/File:The_restored_Lion_of_Chaeronea_in_Boeotia_on_10_April_2019.jpg",
    license: "cc-by-sa",
    photographer: "George E. Koronaios",
    imagePath: "/images/artifacts/lion-of-chaeronea.webp",
    width: 1600,
    height: 1076,
    alt: "The restored marble Lion of Chaeronea seated on a high plinth in the Boeotian countryside, the funerary monument marking the grave of the Theban Sacred Band who fell at the battle of 338 BCE.",
    caption: "Lion of Chaeronea · after 338 BCE · Marble (restored)",
    attribution: "Chaeronea, Boeotia · photo G. E. Koronaios · Wikimedia Commons (CC BY-SA 4.0)",
    notes:
      "Vendored for the Plutarch and Parallel Lives hubs. The monument stands at Chaeronea, Plutarch's home town; it marks the grave of the Theban Sacred Band killed at the battle where Philip of Macedon broke Greek liberty — the cause Demosthenes had defended. Licensed CC BY-SA 4.0.",
  },
  {
    slug: "delphi-tholos",
    kind: "architecture",
    subject: "The Tholos of the sanctuary of Athena Pronaia, Delphi",
    culture: "greek",
    era: "c. 380 BCE",
    location: "Delphi, Greece",
    source:
      "https://commons.wikimedia.org/wiki/File:Tholos_of_Delphi_02.jpg",
    license: "cc-by-sa",
    photographer: "Bernard Gagnon",
    imagePath: "/images/architecture/delphi-tholos.webp",
    width: 1600,
    height: 1143,
    alt: "The partly-reconstructed circular Tholos in the sanctuary of Athena Pronaia at Delphi, three Doric columns and a section of entablature standing against the mountains.",
    caption: "Tholos of Athena Pronaia, Delphi · c. 380 BCE · Marble and limestone",
    attribution: "Delphi · photo Bernard Gagnon · Wikimedia Commons (CC BY-SA 4.0)",
    notes:
      "Vendored for the Plutarch hub and the Delphi material. Plutarch served for many years as one of the two priests of Apollo at Delphi; the sanctuary is central to his biography and to several Moralia dialogues. Licensed CC BY-SA 4.0.",
  },
  {
    slug: "delphi-sanctuary",
    kind: "ruins",
    subject: "The sanctuary of Apollo at Delphi, hillside view",
    culture: "greek",
    era: "the sanctuary in use from the 8th century BCE; visible remains classical and later",
    location: "Delphi, Greece",
    source:
      "https://commons.wikimedia.org/wiki/File:Delphi_BW_2017-10-08_11-44-50.jpg",
    license: "cc-by-sa",
    photographer: "Berthold Werner",
    imagePath: "/images/ruins/delphi-sanctuary.webp",
    width: 1600,
    height: 1064,
    alt: "The archaeological site of the sanctuary of Apollo at Delphi stepping up the slope of Mount Parnassus, the foundations and standing columns of the temple terrace among the rocks.",
    caption: "Sanctuary of Apollo, Delphi · on the slope of Parnassus",
    attribution: "Delphi · photo Berthold Werner · Wikimedia Commons (CC BY-SA 3.0)",
    notes:
      "Vendored for the Plutarch hub. The oracle of Apollo at Delphi, where Plutarch was a priest, was the religious centre of the Greek world; the setting anchors the platform's reading of Plutarch as a Greek of the Roman imperial period rooted in the old sanctuaries. Licensed CC BY-SA 3.0.",
  },
  {
    slug: "plutarch-lives-manuscript",
    kind: "manuscripts",
    subject: "A Byzantine Greek manuscript of Plutarch's Parallel Lives",
    culture: "byzantine",
    era: "Byzantine manuscript of a text composed c. 100 CE",
    location: "Bodleian Library, Oxford (MS. Canonici Greek 93)",
    source:
      "https://commons.wikimedia.org/wiki/File:Plutarch,_Parallel_Lives,_Oxford,_MS._Canonici_Greek_93_(cropped).jpg",
    license: "public-domain",
    photographer: "Bodleian Library",
    imagePath: "/images/manuscripts/plutarch-lives-manuscript.webp",
    width: 1600,
    height: 1244,
    alt: "A two-column page of a Byzantine Greek manuscript of Plutarch's Parallel Lives, written in a neat minuscule hand on parchment.",
    caption: "Plutarch, Parallel Lives · Byzantine Greek manuscript · Bodleian MS. Canonici Gr. 93",
    attribution: "Bodleian Library, Oxford · Wikimedia Commons (public domain)",
    notes:
      "Vendored for the Parallel Lives hub. A medieval Greek manuscript through which the text was transmitted; the survival of the Lives depended on exactly such Byzantine copying. Public domain (faithful reproduction of a manuscript out of copyright by age).",
  },

  // ─── Xenophon deepening ──────────────────────────────────────────────
  {
    slug: "anabasis-route-map",
    kind: "maps",
    subject: "The route of the Retreat of the Ten Thousand",
    culture: "modern",
    era: "18th-century map of the events of 401–399 BCE",
    location: "engraved for Rollin's Ancient History",
    source:
      "https://commons.wikimedia.org/wiki/File:Jean_Baptiste_Bourguignon_d%27Anville,_Retreat_of_the_ten_thousand.Drawn_for_Rollin%27s_Antient_History_(FL37124102_3899300).jpg",
    license: "public-domain",
    photographer: "Jean Baptiste Bourguignon d'Anville",
    imagePath: "/images/maps/anabasis-route-map.webp",
    width: 1600,
    height: 1439,
    alt: "An eighteenth-century map by the cartographer d'Anville tracing the route of the Ten Thousand from Cunaxa near Babylon north through the Persian interior to the Black Sea.",
    caption: "Route of the Ten Thousand · map by d'Anville · 18th century",
    attribution: "J. B. B. d'Anville · Wikimedia Commons (public domain)",
    notes:
      "Vendored for the Anabasis and the Xenophon hub. A classic map by the great eighteenth-century cartographer d'Anville charting the march and retreat; a modern scholarly reconstruction, not an ancient artefact, and captioned as such. Public domain by age.",
  },
  {
    slug: "xenophon-anabasis-manuscript",
    kind: "manuscripts",
    subject: "A Greek manuscript of Xenophon's Anabasis",
    culture: "byzantine",
    era: "Byzantine manuscript of a text composed c. 370 BCE",
    location: "Biblioteca Ambrosiana, Milan (A 78 inf.)",
    source:
      "https://commons.wikimedia.org/wiki/File:Xenophon,_Anabasis,_Milan,_A_78_inf.jpg",
    license: "public-domain",
    photographer: "Biblioteca Ambrosiana",
    imagePath: "/images/manuscripts/xenophon-anabasis-manuscript.webp",
    width: 1153,
    height: 1600,
    alt: "A page of a Byzantine Greek manuscript of Xenophon's Anabasis, written in minuscule on parchment with marginal annotation.",
    caption: "Xenophon, Anabasis · Byzantine Greek manuscript · Ambrosiana A 78 inf.",
    attribution: "Biblioteca Ambrosiana, Milan · Wikimedia Commons (public domain)",
    notes:
      "Vendored for the Xenophon Works hub and the Anabasis. One of the medieval Greek manuscripts through which Xenophon's text survived; the transmission depended on exactly such copying. Public domain by age.",
  },
  {
    slug: "dexileos-stele",
    kind: "relief",
    subject: "The grave stele of Dexileos, an Athenian cavalryman",
    culture: "greek",
    era: "Classical Athens, c. 394 BCE",
    location: "Archaeological Museum of Kerameikos, Athens",
    source:
      "https://commons.wikimedia.org/wiki/File:The_Grave_Stele_of_Dexileos_(4th_cent._B.C.)_at_the_Archaeological_Museum_of_Kerameikos_on_27_June_2018.jpg",
    license: "cc-by-sa",
    photographer: "George E. Koronaios",
    imagePath: "/images/artifacts/dexileos-stele.webp",
    width: 1067,
    height: 1600,
    alt: "The carved marble grave stele of Dexileos, a young Athenian cavalryman, shown rearing on horseback and spearing a fallen naked enemy beneath him.",
    caption: "Grave stele of Dexileos · Athens, c. 394 BCE · Marble",
    attribution: "Kerameikos Museum, Athens · photo G. E. Koronaios · Wikimedia Commons (CC BY-SA 4.0)",
    notes:
      "Vendored for the Xenophon hub, the Hipparchicus and the military-command theme. Dexileos was a young Athenian horseman killed in 394 BCE, of exactly the cavalry class Xenophon's Cavalry Commander addresses; the securely identified (inscribed) stele is the finest image of the classical Athenian cavalryman. Licensed CC BY-SA 4.0.",
  },
  {
    slug: "retreat-of-the-ten-thousand",
    kind: "painting",
    subject: "The Retreat of the Ten Thousand reaching the sea",
    culture: "modern",
    era: "19th-century history painting of an event of 400 BCE",
    location: "after Adrien Guignet (1816–1854)",
    source:
      "https://commons.wikimedia.org/wiki/File:Adrien_Guignet_-_Retreat_of_the_ten_thousand.jpg",
    license: "public-domain",
    photographer: "Adrien Guignet",
    imagePath: "/images/artifacts/retreat-of-the-ten-thousand.webp",
    width: 1600,
    height: 873,
    alt: "A nineteenth-century history painting by Adrien Guignet depicting Xenophon's Ten Thousand on the march through a rugged landscape during their retreat.",
    caption: "The Retreat of the Ten Thousand · Adrien Guignet · 19th century",
    attribution: "Adrien Guignet · Wikimedia Commons (public domain)",
    notes:
      "Vendored for the Anabasis and the Xenophon hub. A nineteenth-century French history painting, not an ancient image — used and captioned explicitly as a later imagining of the retreat, to give the narrative an editorial anchor. Public domain by age.",
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
