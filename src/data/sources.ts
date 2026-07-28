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
  // ─── Homer, the Odyssey, and the Homeric Question ────────────────────
  {
    id: "homeri-opera-ocv",
    title: "Homeri Opera (Oxford Classical Texts)",
    author: "Homer (attrib.)",
    editor: "Thomas W. Allen and David B. Monro",
    type: "classical-text",
    originalPeriod: "8th or early 7th century BCE; edition from 1902",
    language: "Ancient Greek",
    publicDomainStatus: "public-domain",
    notes:
      "The standard critical edition of the Greek text. Citation of both epics is by book and line — Odyssey 9.105 means book 9, line 105 — and line numbers refer to the Greek. Most verse translations do not match the Greek line count, which is worth knowing before checking a reference.",
    relatedThinkers: ["homer"],
    relatedBooks: ["odyssey", "iliad"],
  },
  {
    id: "odyssey-butler-1900",
    title: "The Odyssey, rendered into English prose",
    author: "Homer (attrib.)",
    translator: "Samuel Butler",
    type: "primary",
    originalPeriod: "translation published 1900",
    language: "English",
    publicDomainStatus: "public-domain",
    url: "https://www.gutenberg.org/ebooks/1727",
    notes:
      "Plain prose with no verse ambitions, and securely in the public domain, which is why this platform uses it for any extended excerpt. Butler's introduction argues that the poem was composed by a woman — a thesis with essentially no scholarly support that should not be taken as part of the translation's authority.",
    relatedBooks: ["odyssey"],
    relatedThinkers: ["homer"],
  },
  {
    id: "odyssey-butcher-lang-1879",
    title: "The Odyssey of Homer, done into English prose",
    author: "Homer (attrib.)",
    translator: "S. H. Butcher and Andrew Lang",
    type: "primary",
    originalPeriod: "translation published 1879",
    language: "English",
    publicDomainStatus: "public-domain",
    notes:
      "Deliberately archaising Victorian prose. Public domain and widely mirrored, but its biblical register imposes a solemnity the Greek does not have; use with awareness of what it adds.",
    relatedBooks: ["odyssey"],
  },
  {
    id: "odyssey-loeb-murray",
    title: "Homer: The Odyssey (Loeb Classical Library)",
    author: "Homer (attrib.)",
    translator: "A. T. Murray",
    type: "primary",
    originalPeriod: "first published 1919",
    language: "Ancient Greek with facing English",
    publicDomainStatus: "mixed",
    notes:
      "Facing-page Greek and English. The most convenient way to check a reference against the original without reading continuous Greek. Later revised editions are in copyright.",
    relatedBooks: ["odyssey"],
  },
  {
    id: "modern-odyssey-translations",
    title: "Modern verse translations of the Odyssey",
    author: "Homer (attrib.)",
    type: "reference",
    originalPeriod: "20th and 21st centuries",
    language: "English",
    publicDomainStatus: "unverified",
    notes:
      "Lattimore, Fitzgerald, Fagles and Emily Wilson are all in copyright and none is reproduced on this platform. Lattimore is the most literal in line and word order; Fitzgerald and Fagles read most fluently as English poetry; Wilson's, published in 2018 and the first published English translation of the poem by a woman, uses iambic pentameter and matches the Greek line for line, producing a markedly faster and plainer poem. The choice of translation changes the work more than most readers expect.",
    relatedBooks: ["odyssey"],
  },
  {
    id: "lord-singer-of-tales",
    title: "The Singer of Tales",
    author: "Albert B. Lord",
    type: "secondary",
    originalPeriod: "first published 1960",
    language: "English",
    publicDomainStatus: "unverified",
    notes:
      "The standard statement of oral-formulaic theory, setting out the results of the fieldwork Lord conducted with Milman Parry among South Slavic epic singers. It established that oral composition-in-performance of long narrative verse is possible and produces formulaic diction. It did not establish how a poem of the Homeric epics' scale emerged from such a tradition, and that question remains open.",
    relatedThinkers: ["homer"],
    relatedBooks: ["odyssey", "iliad"],
  },
  {
    id: "parry-collected-papers",
    title: "The Making of Homeric Verse: The Collected Papers of Milman Parry",
    author: "Milman Parry",
    editor: "Adam Parry",
    type: "secondary",
    originalPeriod: "papers from the 1920s and 1930s; collected 1971",
    language: "English",
    publicDomainStatus: "unverified",
    notes:
      "The demonstration that Homeric diction is an economical traditional system — that the noun-epithet formulae are distributed by metrical need with a thrift no individual writer would impose on himself. The single most consequential intervention in the modern study of Homer.",
    relatedThinkers: ["homer"],
    relatedBooks: ["odyssey", "iliad"],
  },
  {
    id: "wolf-prolegomena",
    title: "Prolegomena ad Homerum",
    author: "Friedrich August Wolf",
    type: "secondary",
    originalPeriod: "1795",
    language: "Latin",
    publicDomainStatus: "public-domain",
    notes:
      "The founding document of the modern Homeric Question. Wolf argued the poems were assembled from shorter oral songs and that writing was not available in a form permitting composition on this scale. The Analyst programme of the nineteenth century followed from it.",
    relatedThinkers: ["homer"],
  },
  {
    id: "finley-world-of-odysseus",
    title: "The World of Odysseus",
    author: "M. I. Finley",
    type: "secondary",
    originalPeriod: "first published 1954",
    language: "English",
    publicDomainStatus: "unverified",
    notes:
      "The argument that the society of the poems — household-based, organised around gift exchange and personal followings, without bureaucracy — belongs to the Early Iron Age rather than to the Mycenaean Bronze Age. The dating remains disputed; the structural description has been enormously influential and is why this platform does not use the poems as evidence for Mycenaean society.",
    relatedBooks: ["odyssey"],
    relatedThemes: ["household-and-political-order", "kingship-in-the-odyssey"],
  },
  {
    id: "ventris-chadwick-documents",
    title: "Documents in Mycenaean Greek",
    author: "Michael Ventris and John Chadwick",
    type: "reference",
    originalPeriod: "first published 1956",
    language: "English, with Linear B texts",
    publicDomainStatus: "unverified",
    notes:
      "The foundational presentation of the Linear B material following Ventris's 1952 decipherment. The tablets are administrative records in an early form of Greek and are the primary documentary evidence for the Late Bronze Age Aegean. They establish the language and the palace bureaucracy; they do not mention any Homeric character.",
    relatedBooks: ["odyssey"],
  },
  {
    id: "auerbach-mimesis",
    title: "Mimesis: The Representation of Reality in Western Literature",
    author: "Erich Auerbach",
    type: "secondary",
    originalPeriod: "first published 1946",
    language: "German; widely translated",
    publicDomainStatus: "unverified",
    notes:
      "Opens with the scar of Odysseus at Odyssey 19.393-466 and uses it to characterise Homeric style as a fully illuminated foreground with no depths and no perspective. Contested, and still the standard entry point for discussion of how the poem narrates.",
    relatedBooks: ["odyssey"],
    relatedThemes: ["identity-and-recognition"],
  },
  {
    id: "detienne-vernant-metis",
    title: "Les ruses de l'intelligence: la mètis des Grecs",
    author: "Marcel Detienne and Jean-Pierre Vernant",
    type: "secondary",
    originalPeriod: "1974",
    language: "French; translated as Cunning Intelligence in Greek Culture and Society",
    publicDomainStatus: "unverified",
    notes:
      "The study that made metis a category in its own right, tracing cunning intelligence across Greek thought from Homer to the sophists. The standard starting point for the concept.",
    relatedThemes: ["cunning-and-metis"],
    relatedBooks: ["odyssey"],
  },
  {
    id: "strabo-geography",
    title: "Geography",
    author: "Strabo",
    type: "historical-source",
    originalPeriod: "late 1st century BCE to early 1st century CE",
    language: "Ancient Greek",
    publicDomainStatus: "mixed",
    notes:
      "Book 1 discusses whether the Odyssey's wanderings can be located on a real map, and Book 10 the identification of the Ionian islands. Strabo is sceptical of literal-minded mapping while granting that the poet worked from real knowledge of the sea — the earliest sustained critical treatment of the question this platform's guides take up.",
    relatedBooks: ["odyssey"],
  },
  {
    id: "pausanias-description",
    title: "Description of Greece",
    author: "Pausanias",
    type: "historical-source",
    originalPeriod: "2nd century CE",
    language: "Ancient Greek",
    publicDomainStatus: "mixed",
    notes:
      "A traveller's account of Greek sites, cults and monuments, and a principal source for what Greeks of the Roman period believed about their own heroic past and where they located it. Evidence for reception rather than for the Bronze Age.",
    relatedBooks: ["odyssey"],
  },
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
    relatedThinkers: ["xenophon", "socrates", "cyrus-the-great"],
    relatedBooks: ["cyropaedia", "memorabilia", "anabasis"],
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
    id: "ciceronis-opera-oct",
    title: "M. Tulli Ciceronis Opera",
    author: "Marcus Tullius Cicero",
    editor: "Various (Oxford Classical Texts)",
    type: "classical-text",
    originalPeriod: "1st century BCE; OCT volumes from the early 20th century onward",
    language: "Latin",
    publicDomainStatus: "public-domain",
    notes:
      "The Oxford Classical Texts of Cicero — the speeches, philosophical works (De Officiis, De Re Publica, De Legibus, De Finibus, Tusculan Disputations), letters, and rhetorical works. Cited by the conventional short titles + book / section (e.g. De Officiis 1.20; Phil. 2.110; Att. 1.16).",
    relatedThinkers: ["cicero"],
    relatedBooks: ["de-officiis", "de-re-publica"],
  },
  {
    id: "caesar-commentarii-oct",
    title: "C. Iulii Caesaris Commentarii",
    author: "Gaius Julius Caesar",
    editor: "Renatus du Pontet and others (Oxford Classical Texts)",
    type: "classical-text",
    originalPeriod: "1st century BCE; OCT vols. early 20th century",
    language: "Latin",
    publicDomainStatus: "public-domain",
    notes:
      "Caesar's own narrative — De Bello Gallico (the Gallic Wars) and De Bello Civili (the Civil War) — cited by book and chapter (e.g. BG 6.13). The single most important first-person source for a Roman statesman of the late Republic.",
    relatedThinkers: ["julius-caesar"],
    relatedBooks: ["bello-gallico"],
  },
  {
    id: "sallust-opera",
    title: "Sallust: Bellum Catilinae and Bellum Iugurthinum",
    author: "Gaius Sallustius Crispus",
    editor: "Various critical editions; the Loeb J. C. Rolfe edition is widely used.",
    type: "historical-source",
    originalPeriod: "1st century BCE",
    language: "Latin",
    publicDomainStatus: "public-domain",
    notes:
      "Sallust's two surviving monographs are the principal narrative source for the conspiracy of Catiline and for the Jugurthine War — the latter giving us our most extended portrait of Gaius Marius. His moralising frame (Roman virtue declining under the corrosion of imperial wealth) shaped how the late Republic was read for centuries after.",
    relatedThinkers: ["sallust", "gaius-marius", "cicero"],
    relatedBooks: ["conspiracy-of-catiline", "jugurthine-war"],
  },
  {
    id: "suetonius-de-vita-caesarum",
    title: "De Vita Caesarum (Lives of the Twelve Caesars)",
    author: "Gaius Suetonius Tranquillus",
    editor: "Maximilian Ihm (Teubner) and others",
    type: "historical-source",
    originalPeriod: "early 2nd century CE",
    language: "Latin",
    publicDomainStatus: "public-domain",
    notes:
      "Twelve biographies running from Caesar through Domitian. Read alongside Plutarch and Tacitus; Suetonius is more anecdotal and less analytical but preserves material the others omit. Cited by emperor + chapter (e.g. Aug. 28; Iul. 76).",
    relatedThinkers: ["suetonius", "julius-caesar", "augustus"],
    relatedBooks: ["twelve-caesars"],
  },
  {
    id: "tacitus-opera",
    title: "Tacitus: Annales and Historiae",
    author: "Publius (or Gaius) Cornelius Tacitus",
    editor: "Various critical editions; standard OCT.",
    type: "historical-source",
    originalPeriod: "Late 1st / early 2nd century CE",
    language: "Latin",
    publicDomainStatus: "public-domain",
    notes:
      "The two great surviving works of the Roman imperial historian — the Annales (Tiberius through Nero) and the Historiae (69–96 CE, partly lost). The sharpest ancient analysis of what unbounded power did to political character. Cited by book + chapter (e.g. Ann. 4.32).",
    relatedThinkers: ["tacitus", "augustus"],
    relatedBooks: ["annals", "histories"],
    relatedThemes: ["empire", "tyranny", "imperial-succession"],
  },
  {
    id: "tacitus-minor-works",
    title: "Tacitus: Agricola and Germania",
    author: "Publius (or Gaius) Cornelius Tacitus",
    editor: "J. B. Rives (Germania, Oxford 1999); A. R. Birley (Agricola, Oxford)",
    type: "historical-source",
    originalPeriod: "98 CE",
    language: "Latin",
    publicDomainStatus: "mixed",
    notes:
      "Tacitus's two short monographs: the Agricola, a biography of his father-in-law and a study of public service under a bad emperor, and the Germania, an ethnography of the peoples beyond the Rhine whose modern reception history is itself a cautionary tale. Cited by chapter (e.g. Agr. 30; Germ. 7).",
    relatedThinkers: ["tacitus"],
    relatedBooks: ["agricola", "germania"],
    relatedThemes: ["provincial-government", "army-and-state"],
  },
  {
    id: "res-gestae-divi-augusti",
    title: "Res Gestae Divi Augusti",
    author: "Imperator Caesar Augustus",
    editor: "Alison E. Cooley (Cambridge, 2009)",
    type: "primary",
    originalPeriod: "completed c. 13–14 CE",
    language: "Latin (with an official Greek version)",
    publicDomainStatus: "mixed",
    notes:
      "Augustus's first-person record of his reign, inscribed across the empire; the fullest surviving copy is the Monumentum Ancyranum at Ankara. Cooley's edition gives Latin and Greek with full commentary. Cited by chapter (e.g. RG 34 for the auctoritas/potestas formulation). The regime's own memory, to be read against Tacitus.",
    relatedThinkers: ["augustus"],
    relatedBooks: ["res-gestae"],
    relatedThemes: ["empire", "founding", "state-and-religion"],
  },
  {
    id: "marcus-aurelius-meditations",
    title: "Marcus Aurelius: Meditations",
    author: "Marcus Aurelius Antoninus",
    editor: "Robin Hard and Christopher Gill (Oxford, 2011)",
    type: "primary",
    originalPeriod: "c. 170–180 CE",
    language: "Koine Greek",
    publicDomainStatus: "mixed",
    notes:
      "The private Stoic notebook of the philosopher-emperor, written partly on the Danube campaign. Cited by book + section (e.g. Med. 2.1). Pierre Hadot's The Inner Citadel is the indispensable philosophical commentary; Gregory Hays's Modern Library translation is the most fluent reading version.",
    relatedThinkers: ["marcus-aurelius"],
    relatedBooks: ["meditations"],
    relatedThemes: ["self-control", "virtue", "duty"],
  },
  {
    id: "maurice-strategikon",
    title: "Maurice's Strategikon",
    author: "Attributed to the Emperor Maurice (authorship debated)",
    editor: "George T. Dennis, trans. (University of Pennsylvania Press, 1984)",
    type: "primary",
    originalPeriod: "c. 590–600 CE",
    language: "Greek",
    publicDomainStatus: "unverified",
    notes:
      "The most detailed surviving handbook of the late-Roman / early-Byzantine army. The traditional attribution to the emperor Maurice is convention rather than established fact. Dennis's translation is the standard and only general English reference. Cited by book + chapter (e.g. Strat. 11 for the survey of Rome's adversaries).",
    relatedThinkers: ["diocletian"],
    relatedBooks: ["strategikon"],
    relatedThemes: ["army-and-state", "imperial-administration"],
  },
  {
    id: "livy-ab-urbe-condita",
    title: "Ab Urbe Condita",
    author: "Titus Livius (Livy)",
    editor: "Robert Maxwell Ogilvie and others (OCT)",
    type: "historical-source",
    originalPeriod: "Late 1st century BCE / early 1st century CE",
    language: "Latin",
    publicDomainStatus: "public-domain",
    notes:
      "Livy's monumental history of Rome from its founding. Books 1–10 and 21–45 survive (with periochae summaries of the rest). The principal source for the early Republic, Numa, the regal period, and the Roman idealisation of civic virtue in the years before Marius. Cited by book + chapter (e.g. Liv. 1.18 for Numa).",
    relatedThinkers: ["livy", "numa-pompilius", "scipio-africanus"],
    relatedBooks: ["ab-urbe-condita"],
  },
  {
    id: "polybius-histories",
    title: "Polybius: Histories",
    author: "Polybius of Megalopolis",
    editor: "Theodorus Büttner-Wobst (Teubner) and others",
    type: "historical-source",
    originalPeriod: "2nd century BCE",
    language: "Ancient Greek",
    publicDomainStatus: "public-domain",
    notes:
      "The Greek historian who explained the rise of Rome to a Greek audience. Book VI is the locus classicus for the anakuklōsis (cycle of regimes) and for the analysis of the Roman mixed constitution that shaped subsequent constitutional thought. Cited by book + chapter (e.g. Plb. 6.11).",
    relatedThinkers: ["polybius", "scipio-africanus"],
    relatedBooks: ["polybius-histories"],
    relatedThemes: ["statecraft", "republic", "mixed-constitution"],
  },
  {
    id: "herodotus-histories",
    title: "Herodotus: Histories",
    author: "Herodotus of Halicarnassus",
    editor: "Various critical editions; standard OCT.",
    type: "historical-source",
    originalPeriod: "5th century BCE",
    language: "Ancient Greek",
    publicDomainStatus: "public-domain",
    notes:
      "The earliest extended Greek history, in nine books. The principal ancient source for the Persian kings (Cyrus, Cambyses, Darius, Xerxes), for the world they conquered, and for the Greek wars that followed. Cited by book + chapter (e.g. Hdt. 1.108 for Cyrus).",
    relatedThinkers: ["cyrus-the-great", "themistocles", "darius-i", "xerxes-i", "artaxerxes-i"],
    relatedBooks: ["herodotus-histories"],
  },
  {
    id: "cyrus-cylinder",
    title: "The Cyrus Cylinder",
    author: "Commissioned by Cyrus the Great",
    editor: "Irving Finkel (British Museum)",
    type: "primary",
    originalPeriod: "c. 539 BCE",
    language: "Akkadian (Babylonian cuneiform)",
    publicDomainStatus: "public-domain",
    notes:
      "Clay foundation cylinder from Babylon, now in the British Museum, recording Cyrus's capture of the city and his restoration of cults and deported peoples. A conventional Mesopotamian royal inscription, not the 'first charter of human rights' of modern myth; read against the Babylonian Chronicle.",
    relatedThinkers: ["cyrus-the-great"],
    relatedBooks: ["cyrus-cylinder"],
    relatedThemes: ["kingship-and-legitimacy", "empire-and-diversity"],
  },
  {
    id: "behistun-inscription",
    title: "The Behistun Inscription",
    author: "Commissioned by Darius I",
    editor: "Rüdiger Schmitt (Corpus Inscriptionum Iranicarum)",
    type: "primary",
    originalPeriod: "c. 520 BCE",
    language: "Old Persian, Elamite and Babylonian (trilingual)",
    publicDomainStatus: "mixed",
    notes:
      "Darius I's trilingual cliff relief and inscription narrating his accession and the suppression of the revolts of 522-521 BCE. Royal apologetic, to be read with caution; also the text Henry Rawlinson used to decipher cuneiform. Cited by column and paragraph.",
    relatedThinkers: ["darius-i"],
    relatedBooks: ["behistun-inscription"],
    relatedThemes: ["kingship-and-legitimacy", "imperial-communication"],
  },

  // ─── Founders, lawgivers & constitutions (Phase 17) ───────────────────
  {
    id: "code-of-hammurabi",
    title: "The Code of Hammurabi",
    author: "Commissioned by Hammurabi",
    translator: "Martha T. Roth",
    type: "primary",
    originalPeriod: "c. 1754 BCE",
    language: "Akkadian (Old Babylonian cuneiform)",
    publicDomainStatus: "mixed",
    notes:
      "The fullest law-code of the ancient Near East, carved on a basalt stele now in the Louvre. Roth's 'Law Collections from Mesopotamia and Asia Minor' (Scholars Press, 2nd ed. 1997) is the standard scholarly translation, setting it among the earlier Sumerian codes. Cited by provision number; the prologue and epilogue carry the legitimating frame.",
    relatedThinkers: ["hammurabi"],
    relatedBooks: ["code-of-hammurabi"],
    relatedThemes: ["codification", "law-and-order", "rule-of-law"],
  },
  {
    id: "the-analects",
    title: "The Analects (Lunyu)",
    author: "Confucius and his disciples",
    translator: "D. C. Lau; Edward Slingerland",
    type: "primary",
    originalPeriod: "sayings 6th-5th c. BCE; compiled over the following centuries",
    language: "Classical Chinese",
    publicDomainStatus: "mixed",
    notes:
      "The foundational Confucian text, a layered compilation of sayings and dialogues. Lau (Penguin) and Slingerland (Hackett, 2003, with traditional commentary) are the standard accessible English translations. Cited by book and passage (e.g. Analects 2.3).",
    relatedThinkers: ["confucius"],
    relatedBooks: ["the-analects"],
    relatedThemes: ["custom-and-law", "civic-virtue"],
  },
  {
    id: "book-of-lord-shang",
    title: "The Book of Lord Shang (Shangjunshu)",
    author: "Attributed to Shang Yang and the Legalist school",
    translator: "Yuri Pines; J. J. L. Duyvendak",
    type: "primary",
    originalPeriod: "4th-3rd century BCE",
    language: "Classical Chinese",
    publicDomainStatus: "mixed",
    notes:
      "Foundational Legalist treatise drawing on the Qin reforms of Shang Yang (d. 338 BCE). Pines's 'The Book of Lord Shang' (Columbia, 2017) is the current scholarly translation and study. Read as the practical program behind the Qin centralisation and as a frontal rejection of custom and the authority of antiquity.",
    relatedThinkers: ["han-fei", "qin-shi-huang"],
    relatedBooks: ["book-of-lord-shang"],
    relatedThemes: ["administrative-state", "codification"],
  },
  {
    id: "han-feizi",
    title: "Han Feizi",
    author: "Han Fei",
    translator: "Burton Watson; W. K. Liao",
    type: "primary",
    originalPeriod: "3rd century BCE",
    language: "Classical Chinese",
    publicDomainStatus: "mixed",
    notes:
      "The synthesising masterwork of Chinese Legalism, fusing law (fa), method (shu) and positional power (shi). Watson's 'Han Feizi: Basic Writings' (Columbia) is the standard accessible selection; Liao's older translation covers the full text. The most explicit ancient theory of the impersonal state.",
    relatedThinkers: ["han-fei"],
    relatedBooks: ["han-feizi"],
    relatedThemes: ["administrative-state", "law-and-order"],
  },
  {
    id: "plato-laws",
    title: "Plato: Laws",
    author: "Plato",
    translator: "Trevor J. Saunders; Tom Griffith",
    type: "classical-text",
    originalPeriod: "4th century BCE",
    language: "Ancient Greek",
    publicDomainStatus: "mixed",
    notes:
      "Plato's last and longest dialogue, the design of a workable second-best city governed by law. Saunders (Penguin) and Griffith (Cambridge Texts in the History of Political Thought) are the standard English versions; the Greek is cited by Stephanus pagination from Burnet's Oxford text.",
    relatedThinkers: ["plato"],
    relatedBooks: ["the-laws"],
    relatedThemes: ["constitution", "rule-of-law"],
  },
  {
    id: "aristotle-politics",
    title: "Aristotle: Politics",
    author: "Aristotle",
    translator: "Ernest Barker (rev. R. F. Stalley); C. D. C. Reeve",
    type: "classical-text",
    originalPeriod: "4th century BCE",
    language: "Ancient Greek",
    publicDomainStatus: "mixed",
    notes:
      "The founding work of constitutional analysis, generalising from the comparative material of scores of Greek city constitutions. Barker (rev. Stalley, Oxford World's Classics) and Reeve (Hackett) are the standard English translations; cited by Bekker number. The companion to the Nicomachean Ethics.",
    relatedThinkers: ["aristotle"],
    relatedBooks: ["politics"],
    relatedThemes: ["constitution", "citizenship-and-duty"],
  },
  {
    id: "ctesias-persica",
    title: "Ctesias: Persica (fragments)",
    author: "Ctesias of Cnidus",
    editor: "Lloyd Llewellyn-Jones and James Robson (Routledge, 2010); FGrHist 688",
    type: "historical-source",
    originalPeriod: "late 5th / early 4th century BCE",
    language: "Ancient Greek",
    publicDomainStatus: "mixed",
    notes:
      "The lost Persian history of a Greek physician at the Achaemenid court, surviving only in Photius's epitome and scattered quotations. Sensational and frequently unreliable, doubted already in antiquity; used with great caution as a counterpoint to Herodotus. Cited by Jacoby fragment number (FGrHist 688).",
    relatedThinkers: ["artaxerxes-i", "xerxes-i"],
    relatedBooks: ["persica"],
    relatedThemes: ["historical-method"],
  },
  {
    id: "thucydides-history",
    title: "Thucydides: History of the Peloponnesian War",
    author: "Thucydides of Athens",
    editor: "Henry Stuart Jones (OCT) and others",
    type: "historical-source",
    originalPeriod: "Late 5th century BCE",
    language: "Ancient Greek",
    publicDomainStatus: "public-domain",
    notes:
      "The classical historical analysis of power and political dynamics. Pericles' Funeral Oration (Book II) is the locus classicus for the Athenian self-conception under his leadership. Cited by book + chapter + section (e.g. Thuc. 2.65 on Pericles).",
    relatedThinkers: ["pericles", "themistocles"],
    relatedThemes: ["statecraft", "war-and-peace"],
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
  {
    id: "lacuscurtius",
    title: "LacusCurtius — Bill Thayer's classical archive",
    editor: "Bill Thayer (editor)",
    type: "reference",
    language: "English / Latin / Greek",
    publicDomainStatus: "mixed",
    url: "https://penelope.uchicago.edu/Thayer/E/Roman/home.html",
    notes:
      "A long-running, scholarly digital archive of Latin and Greek texts in the Roman world — full texts of Polybius, Plutarch's Roman Lives, the Augustan History, Cassius Dio, Suetonius, Livy and many others, in English translation (largely the Loeb editions out of copyright in the United States) with hyperlinked references. Particularly valuable for the historiographical layer.",
    relatedThinkers: ["polybius", "livy", "tacitus", "suetonius", "plutarch", "julius-caesar", "augustus", "trajan", "scipio-africanus"],
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
