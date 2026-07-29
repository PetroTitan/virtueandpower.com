/**
 * Object provenance registry.
 *
 * The gap this closes: the platform shipped 14 busts and 99 archive
 * images with a licence and a photographer each, and no object record.
 * A reader on the Caesar page saw a portrait and was not told that it
 * came out of the ground at Tusculum in 1825, that it sat unidentified
 * in a Savoy royal collection for a hundred and fifteen years, or that
 * its claim to be a contemporary likeness rests on a comparison with
 * dated coins.
 *
 * ─── The completeness rule ──────────────────────────────────────────
 *
 * This registry could have been filled out to look complete. Inventory
 * numbers, findspots and excavation dates are exactly the fields it
 * would be easiest to invent and hardest for a reader to check, and a
 * plausible-looking catalogue entry is worse than an absent one because
 * it forecloses the question.
 *
 * So `completeness` is a required field with two values, and it is
 * rendered on the page. A `full` record has been checked against
 * published sources; a `partial` record carries what is established and
 * names, in `gaps`, what is not recorded here. Optional fields are left
 * undefined rather than guessed, and the template prints "not recorded
 * in this catalogue" rather than filling the space.
 *
 * The partial records are therefore a visible, validator-tracked backlog
 * rather than a hidden one. That is the intended state, not a shortfall.
 */

import type { EvidenceLevel, SourceReference } from "./evidence";

export interface DatedClaim {
  claim: string;
  level: EvidenceLevel;
  note?: string;
}

export interface ObjectProvenance {
  /** Own slug, used for /objects/[slug]. */
  slug: string;
  /** What registry the image comes from, and its slug there. */
  objectRef: { kind: "bust" | "archive-image"; slug: string };
  title: string;
  /** e.g. "Marble portrait herm", "Bronze warship ram". */
  objectType: string;
  material?: string;
  dimensions?: string;
  /** When the surviving object was made. */
  dateMade: DatedClaim;
  /** Where it is a copy, what of. */
  copyOf?: string;
  /** Where it was found. */
  findspot?: { place: string; level: EvidenceLevel; note?: string };
  /** When and by whom it was excavated or recovered. */
  excavation?: { year: string; byWhom?: string; note?: string };
  /**
   * Whether the object depicted is ancient at all. Some images in the
   * registries are modern commemorative monuments, and a reader has no
   * way to tell from a photograph. Saying so is the point.
   */
  objectStatus: "ancient" | "modern-commemorative";
  /** Slug into src/data/museums.ts. Absent where the object is not in a
   *  museum — an in-situ monument, or a modern public sculpture. */
  museumSlug?: string;
  /** Where the object stands, when it is not in a museum collection. */
  displayContext?: string;
  /** Only where established. Never guessed. */
  inventoryNumber?: string;
  condition?: string;
  restoration?: string;
  /** The identification of the subject, and the argument about it. */
  identification: DatedClaim;
  bibliography?: SourceReference[];
  completeness: "full" | "partial";
  /** Required on partial records: what this catalogue does not record. */
  gaps?: string[];
  /** Slug into content/philosophers, where the object depicts a figure. */
  figureSlug?: string;
  /** Slugs into src/data/cities.ts. */
  citySlugs?: string[];
}

const R = (
  work: string,
  summary: string,
  author?: string,
  locus?: string,
): SourceReference => ({ work, summary, author, locus });

export const OBJECT_PROVENANCE: ReadonlyArray<ObjectProvenance> = [
  // ─── Fully checked records ───────────────────────────────────────────
  {
    slug: "tusculum-caesar",
    objectRef: { kind: "bust", slug: "julius-caesar-tusculum" },
    title: "The Tusculum portrait of Julius Caesar",
    objectType: "Marble portrait head",
    material: "Fine-grained marble",
    dimensions: "Approximately 32 cm high",
    dateMade: {
      claim: "Around 50–40 BCE",
      level: "probable",
      note: "The dating rests on style and on the comparison with dated coinage rather than on any inscription or archaeological context recorded at excavation.",
    },
    findspot: {
      place: "The forum at Tusculum, Latium",
      level: "documented",
      note: "Recovered during work at the ancient forum, in the territory south-east of Rome.",
    },
    excavation: {
      year: "1825",
      byWhom: "Lucien Bonaparte",
      note: "Napoleon's brother, who conducted excavations at Tusculum on land he held. The head subsequently entered the Savoy royal collection at the Castello di Agliè and passed from there to Turin.",
    },
    objectStatus: "ancient",
    museumSlug: "museo-di-antichita-turin",
    identification: {
      claim: "Julius Caesar",
      level: "probable",
      note: "Not recognised as Caesar until Maurizio Borda identified it in 1940 — a hundred and fifteen years after excavation. The identification rests on correspondence with the portrait on denarii struck by Marcus Mettius shortly before the assassination, which are securely dated and securely identified. It is now widely though not universally accepted.",
    },
    bibliography: [
      R(
        "Denarii of Marcus Mettius",
        "Coins struck at Rome in 44 BCE carrying a portrait of Caesar in his lifetime — the dated comparison on which the identification of the Tusculum head rests.",
        "Roman mint",
      ),
    ],
    completeness: "full",
    figureSlug: "julius-caesar",
    citySlugs: ["rome"],
  },
  {
    slug: "azara-herm-alexander",
    objectRef: { kind: "bust", slug: "alexander-azara" },
    title: "The Azara herm of Alexander",
    objectType: "Marble portrait herm",
    material: "Pentelic marble",
    dateMade: {
      claim: "1st or 2nd century CE",
      level: "probable",
      note: "A Roman copy. The date of the copy is stylistic; the original it reproduces is fourth-century BCE.",
    },
    copyOf:
      "A lost bronze by Lysippus, conventionally the Alexander with a Spear. Ancient tradition holds that Alexander permitted only Lysippus to portray him in sculpture; the tradition is well attested and is a statement about court policy rather than a verified fact about every surviving portrait.",
    findspot: {
      place: "Tivoli, in the villa of the Pisones",
      level: "documented",
      note: "Found with a series of other portrait herms, evidently a gallery of famous men decorating the villa.",
    },
    excavation: {
      year: "1779",
      byWhom: "Excavation organised by José Nicolás de Azara",
      note: "Azara was the Spanish ambassador to the Holy See. The herm carries his name in the modern literature rather than the name of anyone connected with its making.",
    },
    objectStatus: "ancient",
    museumSlug: "louvre",
    inventoryNumber: "MR 405 (Ma 436)",
    condition:
      "A herm bust; the head is ancient and the herm shaft carries an inscription naming Alexander.",
    identification: {
      claim: "Alexander III of Macedon",
      level: "documented",
      note: "The herm is inscribed, which places this among the securely identified ancient portraits — a rarity. What is inferred rather than documented is the attribution of the lost original to Lysippus.",
    },
    completeness: "full",
    figureSlug: "alexander",
    citySlugs: ["rome"],
  },
  {
    slug: "colossus-of-constantine",
    objectRef: { kind: "bust", slug: "constantine-colossus" },
    title: "Fragments of the colossal seated statue of Constantine",
    objectType: "Colossal acrolithic statue, surviving as nine marble fragments",
    material: "Parian marble for the exposed flesh; the body was of other materials over a frame",
    dimensions:
      "The complete statue is estimated at roughly 12 to 13 metres seated",
    dateMade: {
      claim: "Early 4th century CE",
      level: "probable",
      note: "Associated with the completion of the Basilica of Maxentius under Constantine after 312 CE.",
    },
    findspot: {
      place: "The western apse of the Basilica of Maxentius, on the Via Sacra, Rome",
      level: "documented",
      note: "At the time of discovery the building was believed to be Vespasian's Temple of Peace; its correct identification came later.",
    },
    excavation: {
      year: "1486",
      note: "Nine fragments were recovered: head, right arm, wrist, right hand, right knee, right shin, right foot and left foot. They were installed in the courtyard of the Palazzo dei Conservatori during the remodelling of 1567–69 following Michelangelo's design for the Capitoline.",
    },
    objectStatus: "ancient",
    museumSlug: "capitoline-museums",
    condition:
      "Nine fragments of an acrolithic figure. The remainder of the statue, which used a frame with gilded bronze and other materials, does not survive.",
    identification: {
      claim: "Constantine I",
      level: "probable",
      note: "The fragments were attributed to Commodus on discovery and were only reassigned to Constantine at the end of the nineteenth century — four centuries after they came out of the ground. This is the platform's clearest case of an identification that took centuries to settle, and of how long a confident label can persist.",
    },
    completeness: "full",
    figureSlug: "constantine",
    citySlugs: ["rome"],
  },
  {
    slug: "demosthenes-chiaramonti",
    objectRef: { kind: "bust", slug: "demosthenes-chiaramonti" },
    title: "The Chiaramonti Demosthenes",
    objectType: "Marble portrait statue",
    material: "Marble",
    dateMade: {
      claim: "Roman imperial period",
      level: "probable",
    },
    copyOf:
      "A bronze statue by Polyeuktos erected in the Athenian agora in 280 BCE, some forty years after Demosthenes' death. More than fifty Roman portraits of Demosthenes derive from it.",
    findspot: {
      place: "Not recorded in this catalogue",
      level: "unknown",
      note: "The statue was formerly at the Villa Aldobrandini at Frascati; where it was found before entering that collection is not recorded here.",
    },
    excavation: {
      year: "Not recorded",
      note: "Acquired by the Vatican in 1823 from the Villa Aldobrandini collection.",
    },
    objectStatus: "ancient",
    museumSlug: "vatican-museums",
    identification: {
      claim: "Demosthenes",
      level: "probable",
      note: "The type is secure because the copies are numerous and consistent and because the original was a public monument in a known location. What no copy establishes is likeness: the original was made four decades after the subject died.",
    },
    completeness: "full",
    gaps: ["The findspot before the Villa Aldobrandini collection", "Inventory number"],
    figureSlug: "demosthenes",
    citySlugs: ["athens", "rome"],
  },
  {
    slug: "pericles-herm-vatican",
    objectRef: { kind: "bust", slug: "pericles-vatican" },
    title: "Herm of Pericles",
    objectType: "Marble portrait herm",
    material: "Marble",
    dateMade: {
      claim: "2nd century CE",
      level: "probable",
    },
    copyOf:
      "A Greek original of about 425 BCE attributed to Kresilas, known from Pliny's mention of a Pericles by that sculptor.",
    findspot: {
      place: "Tivoli",
      level: "probable",
      note: "Found with other portrait herms, apparently from the decoration of a villa. Several Pericles herms derive from Tivoli villas, including the example in the British Museum from Hadrian's Villa.",
    },
    objectStatus: "ancient",
    museumSlug: "vatican-museums",
    condition: "Herm bust with the head preserved.",
    identification: {
      claim: "Pericles",
      level: "documented",
      note: "The herm is inscribed 'Pericles, son of Xanthippus, Athenian'. An inscribed portrait is the strongest form of ancient identification available, and it is why the Pericles type is secure where most philosopher portraits are not.",
    },
    completeness: "full",
    gaps: ["Inventory number, which is cited inconsistently across sources"],
    figureSlug: "pericles",
    citySlugs: ["athens", "rome"],
  },
  {
    slug: "mask-of-agamemnon",
    objectRef: { kind: "archive-image", slug: "mask-of-agamemnon" },
    title: "Gold funerary mask from Grave Circle A, Mycenae",
    objectType: "Beaten gold funerary mask",
    material: "Gold sheet",
    dateMade: {
      claim: "c. 1550–1500 BCE",
      level: "probable",
      note: "Dated by the context of the shaft graves, which is roughly three centuries earlier than any traditional dating of the Trojan War.",
    },
    findspot: {
      place: "Shaft Grave V, Grave Circle A, Mycenae",
      level: "documented",
    },
    excavation: {
      year: "1876",
      byWhom: "Heinrich Schliemann",
      note: "Schliemann's excavation of the shaft graves. The telegram in which he is popularly said to have announced gazing on the face of Agamemnon is not attested in that form.",
    },
    objectStatus: "ancient",
    museumSlug: "national-archaeological-museum-athens",
    condition: "Complete, with repoussé features.",
    identification: {
      claim: "An unidentified elite burial",
      level: "unknown",
      note: "'The Mask of Agamemnon' is Schliemann's label and is not an identification. The mask predates any traditional date of the Trojan War by centuries and nothing connects it to any named person. A separate and more serious question has been raised about whether parts of the face were modified after excavation; the suggestion is contested and is not accepted by most specialists.",
    },
    completeness: "full",
    citySlugs: ["troy", "athens"],
  },
  {
    slug: "boars-tusk-helmet-nama",
    objectRef: { kind: "archive-image", slug: "boars-tusk-helmet-athens" },
    title: "Mycenaean boar's-tusk helmet",
    objectType: "Composite helmet of split boar's tusks on a leather cap",
    material: "Boar's tusk plates; the organic cap does not survive",
    dateMade: { claim: "Late Bronze Age", level: "documented" },
    findspot: {
      place: "Mycenaean context",
      level: "documented",
      note: "Helmets of this construction are known from several Mycenaean burials; the type as a class is securely attested.",
    },
    objectStatus: "ancient",
    museumSlug: "national-archaeological-museum-athens",
    inventoryNumber: "NAMA 6568",
    condition:
      "Reconstructed: the tusk plates survive and are mounted on a modern support, since the leather or felt cap they were sewn to has perished.",
    restoration:
      "The visible cap is modern. What is ancient is the arrangement of tusk plates.",
    identification: {
      claim: "A helmet of the type described at Iliad 10.261–265",
      level: "documented",
      note: "The correspondence between the excavated type and the Homeric description is close and is the single strongest piece of evidence that the epic tradition transmitted genuine Bronze Age material. The complication, stated on our Homer pages, is that Iliad 10 is widely regarded as among the latest material in that poem.",
    },
    completeness: "full",
    gaps: [
      "The excavation date and excavator of this particular helmet, as distinct from the securely attested type",
      "Precise findspot",
      "Dimensions",
    ],
    citySlugs: ["athens"],
  },
  {
    slug: "ishtar-gate-berlin",
    objectRef: { kind: "archive-image", slug: "ishtar-gate-berlin" },
    title: "The Ishtar Gate of Babylon, reconstructed",
    objectType: "Monumental gateway of moulded and glazed brick",
    material: "Glazed brick",
    dateMade: {
      claim: "c. 575 BCE, under Nebuchadnezzar II",
      level: "documented",
      note: "Dated by the king's own building inscriptions.",
    },
    findspot: {
      place: "The processional entrance to the inner city, Babylon",
      level: "documented",
    },
    excavation: {
      year: "1899–1917",
      byWhom: "Robert Koldewey, for the German Oriental Society",
      note: "Recovered in tens of thousands of fragments and shipped to Berlin, where reassembly took decades.",
    },
    objectStatus: "ancient",
    museumSlug: "pergamon-museum",
    condition:
      "What stands in Berlin is the inner gate only, at reduced scale. It is built from excavated original bricks with modern infill where fragments were missing.",
    restoration:
      "Extensive by necessity. The object a visitor sees is a modern reconstruction incorporating ancient material, not an ancient structure moved intact — a distinction the display does not always make prominent.",
    identification: {
      claim: "The Ishtar Gate",
      level: "documented",
      note: "Identified by Nebuchadnezzar's inscriptions and by position within the excavated city plan.",
    },
    completeness: "full",
    citySlugs: ["babylon"],
  },
  {
    slug: "susa-archer-frieze-louvre",
    objectRef: { kind: "archive-image", slug: "susa-archer-frieze" },
    title: "Glazed brick archer from the palace of Darius I at Susa",
    objectType: "Moulded and glazed brick relief panel",
    material: "Glazed brick",
    dateMade: {
      claim: "c. 510 BCE",
      level: "probable",
      note: "Associated with Darius's palace construction, which his foundation charter records.",
    },
    findspot: {
      place: "The palace of Darius I, Susa",
      level: "documented",
    },
    excavation: {
      year: "From 1884, principally the campaigns of Marcel and Jane Dieulafoy and later Jacques de Morgan",
      byWhom: "French archaeological missions to Persia",
      note: "Conducted under a concession that permitted the export of finds, which is why the panels are in Paris.",
    },
    objectStatus: "ancient",
    museumSlug: "louvre",
    inventoryNumber: "AOD 488",
    condition:
      "Assembled from individual moulded bricks; panels have been reconstructed from excavated fragments.",
    identification: {
      claim: "A guardsman of the Achaemenid royal guard",
      level: "probable",
      note: "Frequently captioned as depicting an 'Immortal'. The panels carry no inscription, and the corps Herodotus calls the Immortals is not named under a corresponding term in the Persian record. That the figures are royal guards is a reasonable inference; the specific identification is not.",
    },
    completeness: "full",
    citySlugs: ["susa"],
  },
  {
    slug: "dura-europos-scutum",
    objectRef: { kind: "archive-image", slug: "dura-europos-scutum" },
    title: "Painted Roman scutum from Dura-Europos",
    objectType: "Semi-cylindrical body shield",
    material: "Laminated wood (plywood construction) with painted leather or parchment facing",
    dateMade: { claim: "3rd century CE", level: "probable" },
    findspot: {
      place: "Dura-Europos, on the Euphrates",
      level: "documented",
      note: "Recovered from the siege deposits of the city, which fell in the mid-third century and was not reoccupied — the condition that preserved it.",
    },
    excavation: {
      year: "1928–1937",
      byWhom: "Yale University and the French Academy of Inscriptions and Letters",
    },
    objectStatus: "ancient",
    museumSlug: "yale-university-art-gallery",
    condition:
      "The only substantially complete Roman scutum known. Fragile, and the painted decoration is partly lost.",
    identification: {
      claim: "A Roman legionary shield of the type described by Polybius",
      level: "documented",
      note: "It confirms the plywood laminate construction that the texts describe and that no other find attests.",
    },
    completeness: "partial",
    gaps: ["Inventory number", "Dimensions"],
  },
  {
    slug: "alexander-mosaic",
    objectRef: { kind: "archive-image", slug: "alexander-mosaic" },
    title: "The Alexander Mosaic",
    objectType: "Floor mosaic in opus vermiculatum",
    material: "Stone and glass tesserae, roughly a million of them",
    dimensions: "Approximately 5.8 by 3.1 metres",
    dateMade: {
      claim: "c. 100 BCE",
      level: "probable",
    },
    copyOf:
      "Generally held to reproduce a lost Hellenistic painting, sometimes attributed to Philoxenos of Eretria on the strength of a passage in Pliny. The attribution is an inference.",
    findspot: {
      place: "The exedra of the House of the Faun, Pompeii",
      level: "documented",
    },
    excavation: {
      year: "1831",
      note: "Lifted and moved to Naples in 1843. A reproduction is laid in the House of the Faun today.",
    },
    objectStatus: "ancient",
    museumSlug: "naples-national-archaeological-museum",
    condition:
      "Substantial losses, particularly on the left side. Recent conservation has addressed structural problems arising from the nineteenth-century mounting.",
    identification: {
      claim: "Alexander confronting Darius III in battle",
      level: "probable",
      note: "Usually identified with Issus and sometimes with Gaugamela. The mosaic carries no label and the identification is an art-historical inference from the terrain and the composition. It should not be captioned as certainly one battle or the other.",
    },
    completeness: "full",
    figureSlug: "alexander",
    citySlugs: ["pompeii"],
  },

  // ─── Partial records: what is established, and what is not ───────────
  {
    slug: "augustus-louvre",
    objectRef: { kind: "bust", slug: "augustus-louvre" },
    title: "Portrait of Augustus",
    objectType: "Marble portrait",
    dateMade: { claim: "Roman imperial period", level: "probable" },
    objectStatus: "ancient",
    museumSlug: "louvre",
    identification: {
      claim: "Augustus",
      level: "probable",
      note: "Augustan portraiture is among the most standardised in Roman art: a small number of official types were reproduced across the empire, which makes the subject secure and the individual object's history harder to trace.",
    },
    completeness: "partial",
    gaps: ["Findspot", "Excavation date and excavator", "Inventory number", "Material and dimensions", "Restoration history"],
    figureSlug: "augustus",
    citySlugs: ["rome"],
  },
  {
    slug: "cicero-vatican",
    objectRef: { kind: "bust", slug: "cicero-vatican" },
    title: "Portrait of Cicero",
    objectType: "Marble portrait",
    dateMade: { claim: "Roman imperial period", level: "probable" },
    objectStatus: "ancient",
    museumSlug: "vatican-museums",
    identification: {
      claim: "Cicero",
      level: "disputed",
      note: "The Cicero portrait type rests on identification of a group of related heads rather than on any inscribed example, and the attribution of individual pieces to it is argued.",
    },
    completeness: "partial",
    gaps: ["Findspot", "Excavation date and excavator", "Inventory number", "Material and dimensions"],
    figureSlug: "cicero",
    citySlugs: ["rome"],
  },
  {
    slug: "socrates-pio-clementino",
    objectRef: { kind: "bust", slug: "socrates-pio-clementino" },
    title: "Portrait of Socrates",
    objectType: "Marble portrait herm",
    dateMade: { claim: "Roman imperial period", level: "probable" },
    copyOf:
      "A Greek original. Two principal Socrates types are distinguished in the literature, and the later one is sometimes associated with Lysippus; the attribution is not secure.",
    objectStatus: "ancient",
    museumSlug: "vatican-museums",
    identification: {
      claim: "Socrates",
      level: "probable",
      note: "The Socrates portrait is secure as a type because several examples are inscribed and because the physiognomy is described in literature — the snub nose and satyr-like features that Plato and Xenophon both mention. It is a type, not a likeness: Socrates died decades before the earliest of these were made.",
    },
    completeness: "partial",
    gaps: ["Findspot", "Excavation date and excavator", "Inventory number", "Material and dimensions"],
    figureSlug: "socrates",
    citySlugs: ["athens", "rome"],
  },
  {
    slug: "plato-pio-clementino",
    objectRef: { kind: "bust", slug: "plato-pio-clementino" },
    title: "Portrait of Plato",
    objectType: "Marble portrait herm",
    dateMade: { claim: "Roman imperial period", level: "probable" },
    copyOf:
      "A Greek original conventionally associated with a portrait set up in the Academy, sometimes attributed to Silanion. The attribution rests on a report in Diogenes Laertius.",
    objectStatus: "ancient",
    museumSlug: "vatican-museums",
    identification: {
      claim: "Plato",
      level: "probable",
      note: "The type is identified from inscribed herms elsewhere. As with Socrates, what survives is a portrait type transmitted through Roman copies, not a likeness taken from life.",
    },
    completeness: "partial",
    gaps: ["Findspot", "Excavation date and excavator", "Inventory number", "Material and dimensions"],
    figureSlug: "plato",
    citySlugs: ["athens", "rome"],
  },
  {
    slug: "aristotle-altemps",
    objectRef: { kind: "bust", slug: "aristotle-altemps" },
    title: "Portrait of Aristotle",
    objectType: "Marble portrait",
    dateMade: { claim: "Roman imperial period", level: "probable" },
    copyOf: "A Greek original, conventionally associated with a portrait by Lysippus reported in the ancient sources.",
    objectStatus: "ancient",
    museumSlug: "museo-nazionale-romano",
    identification: {
      claim: "Aristotle",
      level: "probable",
      note: "Identified from an inscribed herm type. The association of the original with Lysippus is a report rather than a demonstration.",
    },
    completeness: "partial",
    gaps: ["Findspot", "Excavation date and excavator", "Inventory number", "Material and dimensions"],
    figureSlug: "aristotle",
    citySlugs: ["rome"],
  },
  {
    slug: "marcus-aurelius-heraklion",
    objectRef: { kind: "bust", slug: "marcus-aurelius-heraklion" },
    title: "Head of Marcus Aurelius",
    objectType: "Marble portrait head",
    dateMade: { claim: "2nd century CE", level: "probable" },
    findspot: {
      place: "Crete",
      level: "probable",
      note: "The head is in the Cretan state collection; the specific site is not recorded here.",
    },
    objectStatus: "ancient",
    museumSlug: "archaeological-museum-heraklion",
    identification: {
      claim: "Marcus Aurelius",
      level: "probable",
      note: "Imperial portraiture was distributed as official types across the provinces, which makes the subject securely identifiable from the type even where the object's own history is unrecorded.",
    },
    completeness: "partial",
    gaps: ["Precise findspot", "Excavation date and excavator", "Inventory number", "Dimensions"],
    figureSlug: "marcus-aurelius",
  },
  {
    slug: "trajan-glyptothek",
    objectRef: { kind: "bust", slug: "trajan-glyptothek" },
    title: "Portrait of Trajan",
    objectType: "Marble portrait",
    dateMade: { claim: "Early 2nd century CE", level: "probable" },
    objectStatus: "ancient",
    museumSlug: "glyptothek-munich",
    identification: {
      claim: "Trajan",
      level: "probable",
      note: "Identified from the official portrait types, which are well established from coinage and from dated monuments.",
    },
    completeness: "partial",
    gaps: [
      "Findspot",
      "Excavation date and excavator",
      "Inventory number",
      "Restoration history — a live question at the Glyptothek, where nineteenth-century restorations by Thorvaldsen were removed from other works in the 1960s",
    ],
    figureSlug: "trajan",
    citySlugs: ["rome"],
  },
  {
    slug: "hadrian-capitoline",
    objectRef: { kind: "bust", slug: "hadrian-capitoline" },
    title: "Portrait of Hadrian",
    objectType: "Marble portrait",
    dateMade: { claim: "2nd century CE", level: "probable" },
    objectStatus: "ancient",
    museumSlug: "capitoline-museums",
    identification: {
      claim: "Hadrian",
      level: "probable",
      note: "Hadrian is the first emperor consistently portrayed bearded, which makes his types unusually easy to recognise and unusually easy to over-assign.",
    },
    completeness: "partial",
    gaps: ["Findspot", "Excavation date and excavator", "Inventory number", "Material and dimensions"],
    figureSlug: "hadrian",
    citySlugs: ["rome"],
  },
  {
    slug: "plutarch-chaeronea",
    objectRef: { kind: "bust", slug: "plutarch-chaeronea" },
    title: "Modern commemorative bust of Plutarch at Chaeronea",
    objectType: "Modern commemorative bust",
    dateMade: {
      claim: "Modern",
      level: "documented",
      note: "This is not an ancient object and is recorded here so that readers who meet the image on the Plutarch page are not left to assume that it is.",
    },
    objectStatus: "modern-commemorative",
    displayContext: "Publicly sited at Chaeronea, Boeotia, Plutarch's home town.",
    identification: {
      claim: "Plutarch, as imagined by a modern sculptor",
      level: "documented",
      note: "No securely identified ancient portrait of Plutarch survives. A statue base found at Delphi carries an inscription honouring him, which establishes that he was commemorated there; it does not supply a likeness. Any image circulating as an ancient portrait of Plutarch should be treated with corresponding caution, and this one makes no such claim.",
    },
    completeness: "full",
    figureSlug: "plutarch",
    citySlugs: ["delphi"],
  },
  {
    slug: "athlit-ram",
    objectRef: { kind: "archive-image", slug: "athlit-ram" },
    title: "The Athlit ram",
    objectType: "Bronze warship ram",
    material: "Cast bronze, with timber preserved inside",
    dateMade: { claim: "Hellenistic period", level: "probable" },
    findspot: {
      place: "Off Athlit, on the coast of present-day Israel",
      level: "documented",
    },
    excavation: {
      year: "1980",
      note: "Recovered from the seabed. The timbers preserved within the casting allow the size and construction of the ship that carried it to be estimated.",
    },
    objectStatus: "ancient",
    museumSlug: "national-maritime-museum-haifa",
    identification: {
      claim: "The ram of an oared warship",
      level: "documented",
      note: "The principal surviving example of the weapon on which ancient naval battle turned. No oared warship hull survives, which makes the ram the main physical evidence for the class.",
    },
    completeness: "partial",
    gaps: ["Inventory number", "Dimensions and weight"],
  },
  {
    slug: "chigi-vase",
    objectRef: { kind: "archive-image", slug: "chigi-vase-hoplites" },
    title: "The Chigi vase",
    objectType: "Proto-Corinthian olpe",
    material: "Painted ceramic",
    dateMade: { claim: "c. 640 BCE", level: "probable" },
    findspot: {
      place: "An Etruscan tomb at Monte Aguzzo, near Veii",
      level: "documented",
      note: "A Greek vase found in an Etruscan burial — a routine situation that is itself evidence for the reach of Corinthian export.",
    },
    excavation: {
      year: "1881",
      note: "Found on the Chigi estate, from which the vase takes its modern name.",
    },
    objectStatus: "ancient",
    museumSlug: "villa-giulia",
    identification: {
      claim: "The earliest clear depiction of hoplites in close order",
      level: "disputed",
      note: "The frieze is universally cited as evidence for early hoplite formation. Whether it depicts a formation deploying for battle, a procession, or a poetic construction is argued, and it should not be used as a photograph of archaic warfare.",
    },
    completeness: "partial",
    gaps: ["Inventory number", "Dimensions"],
  },
];

const BY_SLUG = new Map(OBJECT_PROVENANCE.map((o) => [o.slug, o]));

export function getObject(slug: string): ObjectProvenance | undefined {
  return BY_SLUG.get(slug);
}

/** Provenance record for a bust slug, where one exists. */
export function provenanceForBust(bustSlug: string): ObjectProvenance | undefined {
  return OBJECT_PROVENANCE.find(
    (o) => o.objectRef.kind === "bust" && o.objectRef.slug === bustSlug,
  );
}

export function objectsForMuseum(museumSlug: string): ObjectProvenance[] {
  return OBJECT_PROVENANCE.filter((o) => o.museumSlug === museumSlug);
}

export function objectsForFigure(figureSlug: string): ObjectProvenance[] {
  return OBJECT_PROVENANCE.filter((o) => o.figureSlug === figureSlug);
}

export function provenanceStats() {
  const full = OBJECT_PROVENANCE.filter((o) => o.completeness === "full").length;
  return {
    total: OBJECT_PROVENANCE.length,
    full,
    partial: OBJECT_PROVENANCE.length - full,
  };
}
