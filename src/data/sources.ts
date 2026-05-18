/**
 * Source governance catalog.
 *
 * This module is the single, typed registry of the texts, editions and
 * reference works that the editorial team relies on. It exists so that:
 *
 *   1. Every claim that needs sourcing can point at a specific entry.
 *   2. The /sources page is a faithful, current view of the catalog.
 *   3. We can audit at type-check time which sources cross-reference which
 *      thinkers, books and themes.
 *
 * Editorial rules for adding sources:
 *   - Only list well-known, widely-cited works and editions.
 *   - Public-domain status is asserted only where it is well established
 *     (e.g. nineteenth-century critical editions); otherwise leave it
 *     unspecified rather than guess.
 *   - Translator and copyright information for *modern* translations is
 *     often non-trivial; prefer pointing readers to a reference work or a
 *     publicly accessible host (Perseus, Internet Classics Archive,
 *     Project Gutenberg) rather than asserting copyright facts we have
 *     not verified.
 *   - Do not invent ISBN or publication dates. Omit fields that cannot be
 *     stated with confidence.
 */

export type SourceType =
  | "primary"           // an original work by a thinker (e.g. Plato's Republic)
  | "secondary"         // commentary, scholarly monograph, encyclopedia article
  | "reference"         // dictionaries, lexica, general reference works
  | "scripture"         // religious / sacred texts in their tradition
  | "classical-text"    // critical editions of classical-era works
  | "historical-source"; // primary historical narrative (e.g. Tacitus, Polybius)

export type PublicDomainStatus =
  | "public-domain"     // the work or specific edition is in the public domain
  | "mixed"             // text public-domain; specific modern translations are not
  | "unverified";       // we have not confirmed the status; treat with care

export interface Source {
  id: string;
  title: string;
  /** Original author of the work, where there is one. */
  author?: string;
  /** Editor of the cited edition. */
  editor?: string;
  /** Translator of the cited edition. */
  translator?: string;
  type: SourceType;
  /** Period the work was originally composed. */
  originalPeriod?: string;
  /** Language of original composition (or "Multiple"). */
  language?: string;
  /** Public-domain status of the work or the cited edition. */
  publicDomainStatus?: PublicDomainStatus;
  /** Canonical URL for the cited edition (publisher, archive, or reference site). */
  url?: string;
  /** Free-form editorial note: why this source is in the catalog, what to
   *  use it for, what to be cautious about. Keep concise and factual. */
  notes?: string;
  /** Cross-references into the MDX content graph. */
  relatedBooks?: string[];
  relatedThinkers?: string[];
  relatedThemes?: string[];
}

export const sources: Source[] = [
  // ─── Primary works of the classical tradition ─────────────────────────
  {
    id: "platonis-opera-burnet",
    title: "Platonis Opera",
    author: "Plato",
    editor: "John Burnet",
    type: "classical-text",
    originalPeriod: "4th century BCE; edition 1900–1907",
    language: "Ancient Greek",
    publicDomainStatus: "public-domain",
    notes:
      "The standard critical edition of Plato in Greek (Oxford Classical Texts, 5 vols.). Cited via Stephanus pagination, the page-and-letter scheme established by Henri Estienne's 1578 Geneva edition that all serious citations of Plato still use.",
    relatedThinkers: ["plato"],
    relatedBooks: ["republic"],
  },
  {
    id: "aristotelis-opera-bekker",
    title: "Aristotelis Opera",
    author: "Aristotle",
    editor: "Immanuel Bekker",
    type: "classical-text",
    originalPeriod: "4th century BCE; edition 1831",
    language: "Ancient Greek",
    publicDomainStatus: "public-domain",
    notes:
      "The Berlin Academy edition that supplied the Bekker numbers (e.g. NE 1103a) by which every serious citation of Aristotle is still made.",
    relatedThinkers: ["aristotle"],
    relatedBooks: ["nicomachean-ethics"],
  },
  {
    id: "xenophontis-opera-marchant",
    title: "Xenophontis Opera Omnia",
    author: "Xenophon",
    editor: "E. C. Marchant",
    type: "classical-text",
    originalPeriod: "4th century BCE; OCT edition published in five volumes, early 20th century",
    language: "Ancient Greek",
    publicDomainStatus: "public-domain",
    notes:
      "The standard Oxford Classical Texts edition of Xenophon's complete works in Greek. Includes the historical works (Hellenica, Anabasis), the Socratic works (Memorabilia, Symposium, Apology, Oeconomicus), the Cyropaedia, and the shorter treatises. Cited by work, book and chapter.",
    relatedThinkers: ["xenophon", "socrates"],
    relatedBooks: ["cyropaedia", "memorabilia"],
  },
  {
    id: "homeri-opera-oct",
    title: "Homeri Opera",
    author: "Homer (attrib.)",
    editor: "David B. Monro and Thomas W. Allen",
    type: "classical-text",
    originalPeriod: "Composition conventionally placed in the 8th century BCE; OCT edition early 20th century",
    language: "Ancient Greek",
    publicDomainStatus: "public-domain",
    notes:
      "The standard Oxford Classical Texts edition of the Iliad and Odyssey in Greek, in five volumes. The standard citation is by book and line (e.g. Iliad 1.1).",
    relatedThinkers: ["homer"],
    relatedBooks: ["iliad"],
  },
  {
    id: "plutarchi-vitae-teubner",
    title: "Plutarchi Vitae Parallelae (Teubner)",
    author: "Plutarch",
    editor: "Konrat Ziegler (general editor of the standard 20th-century Teubner)",
    type: "classical-text",
    originalPeriod: "Late 1st / early 2nd century CE; standard Teubner edition mid-20th century",
    language: "Ancient Greek",
    publicDomainStatus: "unverified",
    notes:
      "The standard scholarly edition of the Parallel Lives in Greek (Bibliotheca Teubneriana). Cited by the name of the Life followed by chapter and section (e.g. Alexander 1.1). Copyright status of individual Teubner volumes varies and has not been verified here.",
    relatedThinkers: ["plutarch"],
    relatedBooks: ["plutarchs-lives"],
  },
  {
    id: "liddell-scott-jones",
    title: "A Greek-English Lexicon (Liddell–Scott–Jones)",
    author: "Henry George Liddell and Robert Scott",
    editor: "Revised by Henry Stuart Jones with Roderick McKenzie",
    type: "reference",
    originalPeriod: "First edition 1843; revised ninth edition 1940; supplements thereafter",
    language: "Ancient Greek / English",
    publicDomainStatus: "public-domain",
    notes:
      "The standard Greek lexicon, known by the abbreviation LSJ. Older editions are out of copyright and are mirrored on Perseus, which is the most convenient way to look up Greek terms used in our entries (aretē, dikaiosynē, sōphrosynē, phronēsis, andreia, eudaimonia and the rest).",
    url: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.04.0057",
  },

  // ─── Open-access digital archives of classical texts ─────────────────
  {
    id: "perseus-digital-library",
    title: "Perseus Digital Library",
    editor: "Gregory Crane (general editor)",
    type: "reference",
    language: "Multiple",
    publicDomainStatus: "mixed",
    url: "https://www.perseus.tufts.edu/hopper/",
    notes:
      "Open-access digital collection of Greek and Latin texts hosted by Tufts University. Useful for locating passages and for working between original and a (typically older, public-domain) translation. Individual translations have their own rights status; check before quoting.",
    relatedThinkers: ["plato", "aristotle", "xenophon", "plutarch", "homer", "socrates"],
  },
  {
    id: "internet-classics-archive",
    title: "Internet Classics Archive",
    editor: "Daniel C. Stevenson (web editor)",
    type: "reference",
    language: "English",
    publicDomainStatus: "mixed",
    url: "https://classics.mit.edu/",
    notes:
      "An MIT-hosted archive of older English translations of classical works. Translations are largely nineteenth- and early-twentieth-century and out of copyright in many jurisdictions; check each work individually.",
    relatedThinkers: ["plato", "aristotle", "xenophon", "plutarch", "homer"],
  },
  {
    id: "project-gutenberg",
    title: "Project Gutenberg",
    type: "reference",
    language: "Multiple",
    publicDomainStatus: "public-domain",
    url: "https://www.gutenberg.org/",
    notes:
      "An archive of works in the public domain in the United States. Useful for early modern editions and historical translations of classical works (Jowett's Plato, Ross's Aristotle in older Oxford translations, etc.).",
  },

  // ─── Scholarly reference ─────────────────────────────────────────────
  {
    id: "stanford-encyclopedia-philosophy",
    title: "Stanford Encyclopedia of Philosophy",
    editor: "Edward N. Zalta (principal editor)",
    type: "reference",
    language: "English",
    url: "https://plato.stanford.edu/",
    notes:
      "Peer-reviewed scholarly encyclopedia, freely accessible. Each entry is signed and dated. Useful for orienting on the current state of scholarship on a thinker, work or theme; not a substitute for the primary texts themselves.",
    relatedThinkers: ["plato", "aristotle", "socrates", "xenophon", "plutarch"],
    relatedThemes: ["virtue", "justice", "leadership", "courage", "self-control"],
  },
  {
    id: "internet-encyclopedia-philosophy",
    title: "Internet Encyclopedia of Philosophy",
    type: "reference",
    language: "English",
    url: "https://iep.utm.edu/",
    notes:
      "Peer-reviewed open-access philosophy encyclopedia. Complementary to the Stanford Encyclopedia; sometimes more accessible as a first orientation.",
  },

  // ─── Series and editions readers will encounter ──────────────────────
  {
    id: "loeb-classical-library",
    title: "Loeb Classical Library",
    editor: "Harvard University Press (general editors)",
    type: "reference",
    originalPeriod: "Series founded 1911",
    language: "Greek/Latin with facing English",
    publicDomainStatus: "mixed",
    url: "https://www.loebclassics.com/",
    notes:
      "The familiar small green (Greek) and red (Latin) volumes with facing-page translations. Many texts in the Loeb are themselves in the public domain in their original language; the *translations* in modern Loeb volumes are typically still under copyright. Cite the Greek or Latin by line / Bekker / Stephanus number rather than by Loeb page.",
    relatedThinkers: ["plato", "aristotle", "xenophon", "plutarch", "homer"],
  },
  {
    id: "oxford-classical-texts",
    title: "Oxford Classical Texts (Scriptorum Classicorum Bibliotheca Oxoniensis)",
    editor: "Oxford University Press (series)",
    type: "classical-text",
    originalPeriod: "Series founded 1898",
    language: "Greek/Latin",
    notes:
      "The standard scholarly critical editions of Greek and Latin texts in their original language. The reference set most commonly cited in academic work.",
    relatedThinkers: ["plato", "aristotle", "xenophon", "homer"],
  },
];

/**
 * Group the catalog by SourceType in a stable, editorially-meaningful
 * order. Used to render the /sources page.
 */
export function sourcesByType(): Array<{ type: SourceType; entries: Source[] }> {
  const order: SourceType[] = [
    "classical-text",
    "primary",
    "historical-source",
    "scripture",
    "secondary",
    "reference",
  ];
  return order
    .map((type) => ({
      type,
      entries: sources.filter((s) => s.type === type),
    }))
    .filter((group) => group.entries.length > 0);
}

/**
 * Display label for each source type, used on the /sources page.
 */
export const sourceTypeLabel: Record<SourceType, string> = {
  primary: "Primary texts",
  "classical-text": "Critical editions",
  "historical-source": "Historical sources",
  scripture: "Scripture",
  secondary: "Scholarship & commentary",
  reference: "Reference & archives",
};

/**
 * Public-domain status display label.
 */
export const publicDomainLabel: Record<PublicDomainStatus, string> = {
  "public-domain": "Public domain",
  mixed: "Mixed (text public-domain; modern translations may not be)",
  unverified: "Status unverified",
};

export function findSourcesForThinker(slug: string): Source[] {
  return sources.filter((s) => s.relatedThinkers?.includes(slug));
}

export function findSourcesForBook(slug: string): Source[] {
  return sources.filter((s) => s.relatedBooks?.includes(slug));
}

export function findSourcesForTheme(slug: string): Source[] {
  return sources.filter((s) => s.relatedThemes?.includes(slug));
}
