/**
 * Bust registry.
 *
 * Typed metadata for every museum-grade marble bust photograph vendored
 * under /public/images/busts. Read by src/components/site/BustImage.tsx
 * and exposed to the editorial system so essays / guides can later
 * reference a bust inline by slug.
 *
 * The registry is the single point at which a bust enters the corpus —
 * adding a new file to /public/images/busts is not enough. Each entry
 * carries the figure named, the historical era, the museum that holds
 * the original, the source link to the photograph, the photographer
 * where given, the licence, the image path under /public, the
 * intrinsic dimensions of the committed file, and a short editorial
 * note explaining why this image is in the catalog.
 *
 * The full provenance for each file is also recorded in
 * /public/images/busts/README.md.
 */

export type BustLicense =
  /** CC-Zero / public-domain dedication. No attribution required by the
   *  licence, but the editorial team attributes anyway. */
  | "cc-zero"
  /** Wikimedia / museum claim that the work is in the public domain by
   *  age (typically a faithful photograph of a long-out-of-copyright
   *  sculpture). */
  | "public-domain"
  /** Creative Commons Attribution. Attribution required per CC-BY. */
  | "cc-by"
  /** Creative Commons Attribution-ShareAlike. */
  | "cc-by-sa";

export type BustCulture = "greek" | "roman" | "persian";

export interface Bust {
  /** Stable kebab-case identifier. */
  slug: string;
  /** Human-readable subject (e.g. "Marcus Aurelius"). */
  figure: string;
  /** Cultural origin of the work portrayed. */
  culture: BustCulture;
  /** Period the work was originally made or copied (free-form text). */
  era: string;
  /** Museum or archive currently holding the original. */
  museum: string;
  /** URL to the Wikimedia Commons file page (or other source). */
  source: string;
  /** Licence under which we redistribute the local file. */
  license: BustLicense;
  /** Photographer credit where given. */
  photographer?: string;
  /** Local path under /public/ for use with next/image. */
  imagePath: string;
  /** Width of the locally-vendored file (the resized version we ship). */
  width: number;
  /** Height of the locally-vendored file. */
  height: number;
  /** Editorial alt text. Sentence form, ends with a period. */
  alt: string;
  /** Caption rendered under the image. Conventionally subject · period · medium. */
  caption: string;
  /** Short attribution tail rendered alongside the caption. */
  attribution: string;
  /** Slug of the philosopher/figure entry this bust depicts, when
   *  there is one. Lets essays cross-reference into the content graph. */
  figureSlug?: string;
  /** Editorial note: why this image is in the catalog, what to use it
   *  for, anything notable about the work or the photograph. */
  notes?: string;
}

export const busts: ReadonlyArray<Bust> = [
  {
    slug: "marcus-aurelius-heraklion",
    figure: "Marcus Aurelius",
    culture: "roman",
    era: "2nd century CE",
    museum: "Archaeological Museum of Heraklion, Crete",
    source:
      "https://commons.wikimedia.org/wiki/File:Head_Marcus_Aurelius_archmus_Heraklion.jpg",
    license: "cc-zero",
    photographer: "Jebulon",
    imagePath: "/images/busts/marcus-aurelius-heraklion.webp",
    width: 1600,
    height: 2459,
    alt: "Marble head of the Emperor Marcus Aurelius, 2nd century, Archaeological Museum of Heraklion.",
    caption: "Marcus Aurelius · 2nd century · Marble",
    attribution: "Archaeological Museum of Heraklion · Wikimedia Commons (CC0)",
    figureSlug: "marcus-aurelius",
    notes:
      "Vendored for the imperial-era essays and now wired to the Marcus Aurelius figure entry (Phase 15). Was the homepage hero anchor through phases 7–11; superseded as the default bust in phase 12 by the Tusculum portrait of Caesar.",
  },
  {
    slug: "julius-caesar-tusculum",
    figure: "Julius Caesar",
    culture: "roman",
    era: "Late Republic, c. 50–40 BCE",
    museum: "Museo di Antichità, Turin",
    source:
      "https://commons.wikimedia.org/wiki/File:Retrato_de_Julio_C%C3%A9sar_(26724093101).jpg",
    license: "public-domain",
    photographer: "Ángel M. Felicísimo",
    imagePath: "/images/busts/julius-caesar-tusculum.webp",
    width: 907,
    height: 1600,
    alt: "The Tusculum portrait of Julius Caesar, a marble bust dated to the late Republic and identified as the only likeness made of him in his lifetime.",
    caption: "Julius Caesar · Tusculum portrait · Marble",
    attribution: "Museo di Antichità, Turin · Wikimedia Commons (Public Domain)",
    figureSlug: "julius-caesar",
    notes:
      "The Tusculum head is the only surviving portrait of Caesar widely accepted as carved from life. Vendored for the Caesar essay and figure entry.",
  },
  {
    slug: "augustus-louvre",
    figure: "Augustus",
    culture: "roman",
    era: "Augustan period, c. 27–20 BCE",
    museum: "Louvre, Paris (Ma 2577)",
    source:
      "https://commons.wikimedia.org/wiki/File:Young_August_Louvre_Ma2577.jpg",
    license: "public-domain",
    photographer: "Marie-Lan Nguyen (Jastrow)",
    imagePath: "/images/busts/augustus-louvre.webp",
    width: 1166,
    height: 1600,
    alt: "Marble portrait of Augustus as a young man, from Kos, Augustan period, now in the Louvre.",
    caption: "Augustus · Augustan period · Greek marble",
    attribution: "Louvre · Wikimedia Commons (Public Domain)",
    figureSlug: "augustus",
    notes:
      "Greek marble, found on Kos, c. 27–20 BCE — among the earliest portraits of Augustus after the settlement of 27. Vendored for the Augustus essay and figure entry.",
  },
  {
    slug: "pericles-vatican",
    figure: "Pericles",
    culture: "greek",
    era: "Roman copy after Greek original c. 430 BCE",
    museum: "Museo Pio-Clementino, Vatican (Inv. 269)",
    source:
      "https://commons.wikimedia.org/wiki/File:Pericles_Pio-Clementino_Inv269.jpg",
    license: "public-domain",
    photographer: "Marie-Lan Nguyen (Jastrow)",
    imagePath: "/images/busts/pericles-vatican.webp",
    width: 797,
    height: 1600,
    alt: "Marble herm of Pericles wearing the strategos helmet, Roman copy after a Greek original by Kresilas, c. 430 BCE.",
    caption: "Pericles · Roman copy after Kresilas · Marble",
    attribution: "Museo Pio-Clementino, Vatican · Wikimedia Commons (Public Domain)",
    figureSlug: "pericles",
    notes:
      "Roman copy of the lost bronze by Kresilas, the canonical likeness of Pericles in the European tradition. Vendored for the Pericles figure entry.",
  },
  {
    slug: "cicero-vatican",
    figure: "Marcus Tullius Cicero",
    culture: "roman",
    era: "Late Republic, 1st century BCE",
    museum: "Vatican Museums",
    source:
      "https://commons.wikimedia.org/wiki/File:Marcus_Tullius_Cicero-Vatican_Museums.jpg",
    license: "cc-by-sa",
    photographer: "Yair Haklai",
    imagePath: "/images/busts/cicero-vatican.webp",
    width: 1200,
    height: 1600,
    alt: "Marble bust of Marcus Tullius Cicero, late Republican Roman portraiture, Vatican Museums.",
    caption: "Cicero · Late Republic · Marble",
    attribution: "Vatican Museums · photo Yair Haklai · Wikimedia Commons (CC BY-SA 3.0)",
    figureSlug: "cicero",
    notes:
      "Vatican Museums Cicero. Licensed CC BY-SA 3.0; attribution carried in the registry, on the page caption, and in the bust README. Vendored for the Cicero figure entry and the De Officiis / De Re Publica book pages.",
  },
  {
    slug: "trajan-glyptothek",
    figure: "Trajan",
    culture: "roman",
    era: "Early 2nd century CE",
    museum: "Glyptothek, Munich (Inv. 72)",
    source:
      "https://commons.wikimedia.org/wiki/File:Traianus_Glyptothek_Munich_72.jpg",
    license: "public-domain",
    imagePath: "/images/busts/trajan-glyptothek.webp",
    width: 1228,
    height: 1600,
    alt: "Marble bust of the Emperor Trajan wearing the civic crown, aegis and sword-belt, Glyptothek Munich, early 2nd century CE.",
    caption: "Trajan · Early 2nd century CE · Marble",
    attribution: "Glyptothek, Munich · Wikimedia Commons (Public Domain)",
    figureSlug: "trajan",
    notes:
      "Glyptothek Inv. 72: Trajan in the civic-crown / aegis / sword-belt iconography of the imperial portrait type. Public-domain photograph of a long-out-of-copyright sculpture. Vendored for the Trajan figure entry.",
  },
  {
    slug: "aristotle-altemps",
    figure: "Aristotle",
    culture: "greek",
    era: "Roman copy after Greek bronze original c. 330 BCE",
    museum: "Palazzo Altemps, Rome (Inv. 8575)",
    source:
      "https://commons.wikimedia.org/wiki/File:Aristotle_Altemps_Inv8575.jpg",
    license: "public-domain",
    photographer: "Marie-Lan Nguyen (Jastrow)",
    imagePath: "/images/busts/aristotle-altemps.webp",
    width: 1196,
    height: 1600,
    alt: "Marble bust of Aristotle, Roman copy after a lost Greek bronze original by Lysippos c. 330 BCE, Palazzo Altemps.",
    caption: "Aristotle · Roman copy after Lysippos · Marble",
    attribution: "Palazzo Altemps, Rome · Wikimedia Commons (Public Domain)",
    figureSlug: "aristotle",
    notes:
      "The Altemps Aristotle is the standard Roman-copy type for Lysippos's lost bronze, the canonical likeness of Aristotle in the European tradition.",
  },
  {
    slug: "socrates-pio-clementino",
    figure: "Socrates",
    culture: "greek",
    era: "Roman copy after Greek original, 1st century CE",
    museum: "Museo Pio-Clementino, Vatican (Inv. 314)",
    source:
      "https://commons.wikimedia.org/wiki/File:Socrates_Pio-Clementino_Inv314.jpg",
    license: "public-domain",
    photographer: "Marie-Lan Nguyen (Jastrow)",
    imagePath: "/images/busts/socrates-pio-clementino.webp",
    width: 1195,
    height: 1600,
    alt: "Marble bust of Socrates, Roman copy after a Greek original, Vatican Pio-Clementino.",
    caption: "Socrates · Roman copy · Marble",
    attribution: "Museo Pio-Clementino, Vatican · Wikimedia Commons (Public Domain)",
    figureSlug: "socrates",
    notes:
      "The Vatican Pio-Clementino Socrates carries the unmistakable iconographic features — flat nose, broad face, prominent forehead — that the ancient sources record and the European tradition has read as Socratic. Vendored for the Socrates figure entry.",
  },
  {
    slug: "plato-pio-clementino",
    figure: "Plato",
    culture: "greek",
    era: "Roman copy after Greek original, last quarter of 4th century BCE",
    museum: "Museo Pio-Clementino, Vatican (Inv. 305)",
    source:
      "https://commons.wikimedia.org/wiki/File:Plato_Pio-Clemetino_Inv305.jpg",
    license: "public-domain",
    photographer: "Marie-Lan Nguyen (Jastrow)",
    imagePath: "/images/busts/plato-pio-clementino.webp",
    width: 1055,
    height: 1600,
    alt: "Marble herm of Plato, Roman copy after a Greek original from the last quarter of the 4th century BCE, Vatican Pio-Clementino.",
    caption: "Plato · Roman copy · Marble herm",
    attribution: "Museo Pio-Clementino, Vatican · Wikimedia Commons (Public Domain)",
    figureSlug: "plato",
    notes:
      "Roman herm copy of the standard fourth-century Plato type, identified by inscribed Plato-portrait copies of the same model. Vendored for the Plato figure entry.",
  },
  {
    slug: "alexander-azara",
    figure: "Alexander the Great",
    culture: "greek",
    era: "Roman / Attic copy of late-4th-century BCE original (Lysippan type)",
    museum: "Louvre, Paris (Ma 436)",
    source:
      "https://commons.wikimedia.org/wiki/File:Azara_herm_Louvre_Ma436.jpg",
    license: "public-domain",
    photographer: "Marie-Lan Nguyen (Jastrow)",
    imagePath: "/images/busts/alexander-azara.webp",
    width: 960,
    height: 1600,
    alt: "The Azara Herm — marble portrait of Alexander the Great, Roman-Attic copy after a Greek original of the late 4th century BCE in the Lysippan tradition, Louvre Ma 436.",
    caption: "Alexander · Roman copy after Lysippan original · Marble",
    attribution: "Louvre · Wikimedia Commons (Public Domain)",
    figureSlug: "alexander",
    notes:
      "The Azara Herm, named for the Spanish diplomat José Nicolás de Azara who recovered it from Tivoli in 1779, is the most securely identified Alexander portrait — the inscription confirms the identification, and the form is the standard Lysippan type. Vendored for the Alexander figure entry and for the Hellenistic World hub.",
  },
];

/** Look up a bust by slug. */
export function getBust(slug: string): Bust | undefined {
  return busts.find((b) => b.slug === slug);
}

/** The bust to use when none is requested explicitly. The Tusculum
 *  portrait of Caesar is the platform's default hero anchor: the only
 *  surviving likeness of Caesar widely accepted by scholarship as
 *  carved from life, and the figure the platform reads as the working
 *  centre of the late Republic — the convergence point of virtue,
 *  power, civic order, and the collapse the European tradition has
 *  not stopped reading. */
export const DEFAULT_BUST_SLUG = "julius-caesar-tusculum";

/**
 * Resolve a bust by the figure slug it depicts (e.g. "cicero",
 * "trajan"). Returns undefined if no bust in the registry has that
 * figureSlug. Used by figure pages, related-figure sidebars, and the
 * homepage featured-figures composition.
 */
export function getBustByFigure(figureSlug: string): Bust | undefined {
  return busts.find((b) => b.figureSlug === figureSlug);
}
