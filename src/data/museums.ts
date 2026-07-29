/**
 * Museum registry.
 *
 * Phase 27.5 exists to close a specific gap: the platform ships 14 busts
 * and 99 archive images, every one with a licence and a photographer, and
 * almost none with an object provenance. A reader looking at the Caesar
 * portrait on the Caesar page was told who photographed it and nothing
 * about where it came from, when it was dug up, who dug it, which museum
 * holds it, or that its identification as Caesar was not made until 1940.
 *
 * This registry is the institutional half of the answer. It attaches to
 * the existing registries by slug and replaces nothing.
 *
 * Editorial rules:
 *   - Contested holdings are recorded on the institution, not buried. A
 *     museum page that lists the Parthenon sculptures without saying they
 *     are claimed is not describing the collection accurately.
 *   - Foundation dates and collection histories are stated where they are
 *     established and omitted where they are not.
 *   - No visitor information, opening hours or ticket prices: this is a
 *     scholarly reference layer, not a travel guide, and that material
 *     goes stale.
 */

export interface ContestedHolding {
  /** What is claimed. */
  object: string;
  /** Who claims it. */
  claimant: string;
  /** The state of the dispute, described without taking a side. */
  note: string;
}

export interface Museum {
  slug: string;
  name: string;
  city: string;
  country: string;
  /** Year or period of foundation, where established. */
  founded?: string;
  standfirst: string;
  description: string;
  /** What the institution collects and why it matters here. */
  scope: string;
  history: string[];
  collectionNotes: string[];
  contested?: ContestedHolding[];
  /** Slugs into src/data/cities.ts — sites whose finds it holds. */
  citySlugs: string[];
  /** Official collection URL, where the institution publishes one. */
  url?: string;
}

export const MUSEUMS: ReadonlyArray<Museum> = [
  {
    slug: "yale-university-art-gallery",
    name: "Yale University Art Gallery",
    city: "New Haven, Connecticut",
    country: "United States",
    founded: "1832",
    standfirst:
      "Holder of the Dura-Europos material, including the only substantially complete Roman shield known.",
    description:
      "The Yale University Art Gallery and the Dura-Europos excavations — the scutum, the synagogue and church paintings, and the military equipment preserved by a siege.",
    scope:
      "Encyclopedic university collection; for this platform, the Dura-Europos finds.",
    history: [
      "Yale excavated Dura-Europos on the Euphrates jointly with the French Academy of Inscriptions and Letters between 1928 and 1937, under the division-of-finds arrangements then standard. The city fell in the mid-third century CE and was not reoccupied, which is why organic material survived.",
    ],
    collectionNotes: [
      "The painted scutum is the only substantially complete Roman body shield known, and confirms the plywood laminate construction that Polybius describes and that no other find attests.",
      "Dura also produced the earliest known Christian house church and an extensively painted synagogue, both of which complicate assumptions about religious imagery in the period.",
    ],
    citySlugs: [],
  },
  {
    slug: "national-maritime-museum-haifa",
    name: "National Maritime Museum",
    city: "Haifa",
    country: "Israel",
    standfirst:
      "Holder of the Athlit ram, the principal surviving example of the weapon on which ancient naval battle turned.",
    description:
      "The National Maritime Museum in Haifa and the Athlit ram — recovered from the seabed in 1980 with its timbers preserved inside the casting.",
    scope: "Maritime archaeology of the eastern Mediterranean.",
    history: [
      "The ram was recovered off Athlit in 1980. Because no oared warship hull survives anywhere, the timbers preserved inside the bronze are among the best evidence for how such ships were built.",
    ],
    collectionNotes: [
      "The ram allows the displacement and construction of the vessel that carried it to be estimated, which is why a single object can constrain reconstructions of an entire ship class.",
    ],
    citySlugs: [],
  },
  {
    slug: "villa-giulia",
    name: "Museo Nazionale Etrusco di Villa Giulia",
    city: "Rome",
    country: "Italy",
    founded: "1889",
    standfirst:
      "The national Etruscan collection, and holder of the Chigi vase — the earliest clear depiction of hoplites in formation.",
    description:
      "The Villa Giulia — Etruscan material, the Sarcophagus of the Spouses, and the Greek imports found in Etruscan tombs.",
    scope: "Etruscan and Faliscan antiquities, and the Greek vases found in Italy.",
    history: [
      "Established in 1889 in a sixteenth-century papal villa, to hold the material coming out of Etruscan sites in Lazio and southern Etruria.",
    ],
    collectionNotes: [
      "A great many of the finest Greek vases known were found in Etruscan tombs rather than in Greece. That is a fact about ancient trade and Etruscan burial practice, and it is why an Italian Etruscan museum holds a key document of Greek warfare.",
    ],
    citySlugs: ["rome"],
  },
  {
    slug: "vatican-museums",
    name: "Vatican Museums",
    city: "Vatican City",
    country: "Vatican City",
    founded: "1506, from the acquisition of the Laocoön",
    standfirst:
      "The oldest continuously assembled collection of classical sculpture, and the source of the portrait types through which Europe has pictured the ancient philosophers.",
    description:
      "The Vatican Museums — the Pio-Clementino and Chiaramonti collections, the portrait herms of Socrates, Plato, Pericles and Demosthenes, and the papal collecting history that assembled them.",
    scope:
      "Classical sculpture above all, including the largest concentration of Roman portrait copies of Greek intellectual and political figures.",
    history: [
      "The collection is conventionally dated from 1506, when Julius II acquired the Laocoön group within weeks of its discovery on the Esquiline and placed it in the Belvedere courtyard.",
      "The Museo Pio-Clementino was formed in the later eighteenth century under Clement XIV and Pius VI, and the Braccio Nuovo and Chiaramonti under Pius VII in the early nineteenth — the period in which a large part of the portrait material was acquired.",
      "A substantial portion of the collection was removed to Paris under the Treaty of Tolentino in 1797 and returned after 1815, an episode that shaped nineteenth-century thinking about where antiquities belong.",
    ],
    collectionNotes: [
      "The portrait herms are the platform's principal visual source for the philosophers. Nearly all are Roman marble copies of lost Greek bronzes, which means what is on display is a copy of a copy of a likeness made, in several cases, long after the subject's death.",
      "Several carry inscriptions naming the subject, which is what makes them usable as identifications rather than guesses. The Pericles herm is inscribed 'Pericles, son of Xanthippus, Athenian'.",
    ],
    citySlugs: ["rome"],
    url: "https://www.museivaticani.va/",
  },
  {
    slug: "capitoline-museums",
    name: "Capitoline Museums",
    city: "Rome",
    country: "Italy",
    founded: "1471",
    standfirst:
      "Generally described as the oldest public museum collection in the world, begun with a papal donation of bronzes to the people of Rome.",
    description:
      "The Capitoline Museums — the 1471 donation, the colossal Constantine fragments in the Palazzo dei Conservatori courtyard, and the equestrian Marcus Aurelius.",
    scope:
      "Roman sculpture, bronzes and inscriptions, with a strong holding of imperial portraiture.",
    history: [
      "Sixtus IV gave a group of bronzes — including the she-wolf and the Spinario — to the people of Rome in 1471, and that donation is the reason the Capitoline is called the oldest public collection.",
      "The courtyard arrangement of the Palazzo dei Conservatori, where the Constantine fragments stand, dates from a remodelling of 1567–69 following Michelangelo's design for the piazza.",
      "The equestrian Marcus Aurelius stood on the piazza from 1538 until 1981, when it was moved indoors for conservation and replaced outside by a copy. It survived the melting-down of nearly every other Roman equestrian bronze because it was long believed to represent Constantine.",
    ],
    collectionNotes: [
      "The Constantine fragments are the platform's clearest case of an identification that took four centuries to settle: found in 1486, attributed to Commodus, and only reassigned to Constantine at the end of the nineteenth century.",
    ],
    citySlugs: ["rome"],
    url: "https://www.museicapitolini.org/",
  },
  {
    slug: "louvre",
    name: "Louvre",
    city: "Paris",
    country: "France",
    founded: "1793",
    standfirst:
      "Holder of the Code of Hammurabi, the glazed brick friezes of Darius's palace at Susa, and the Azara herm of Alexander — much of it a product of nineteenth-century excavation concessions.",
    description:
      "The Louvre's ancient collections — the Susa material and how it came to Paris, the Azara Alexander, and the Hammurabi stele that was already loot when it was buried.",
    scope:
      "Near Eastern, Egyptian, Greek, Etruscan and Roman antiquities, with the most important Achaemenid holdings outside Iran.",
    history: [
      "Opened as a public museum in 1793. Its ancient holdings grew through purchase, through the Napoleonic seizures — largely returned after 1815 — and above all through nineteenth-century excavation concessions.",
      "The French missions at Susa from 1884 operated under a concession permitting the export of finds, which is why the palace of Darius is substantially in Paris.",
    ],
    collectionNotes: [
      "The Code of Hammurabi stele was excavated at Susa in 1901, not at Babylon where it was made: it had been carried off as booty by the Elamite king Shutruk-Nahhunte in the twelfth century BCE. An ancient act of plunder determined where a Babylonian law code would be found three thousand years later.",
      "The Susa archer friezes are routinely captioned as depicting the Immortals. The panels carry no such label and the corps is not named in Persian sources; the identification is an inference.",
    ],
    contested: [
      {
        object: "The Susa material, including the palace friezes of Darius I",
        claimant: "Discussed in Iran",
        note: "Acquired under a nineteenth-century concession that permitted export. The terms were legal at the time and are the subject of continuing debate about the ethics of concession archaeology. No formal restitution claim of the kind attaching to the Parthenon sculptures is currently before the museum.",
      },
    ],
    citySlugs: ["susa", "babylon", "athens"],
    url: "https://collections.louvre.fr/",
  },
  {
    slug: "british-museum",
    name: "British Museum",
    city: "London",
    country: "United Kingdom",
    founded: "1753",
    standfirst:
      "Holder of roughly half the surviving Parthenon sculptures, the Cyrus Cylinder and the Babylonian astronomical diaries — and of the most prominent restitution dispute in the museum world.",
    description:
      "The British Museum's ancient collections — the Parthenon sculptures and the dispute over them, the Cyrus Cylinder, and the cuneiform holdings that underpin Mesopotamian chronology.",
    scope:
      "Encyclopedic, with major Greek, Egyptian, Assyrian and Babylonian holdings.",
    history: [
      "Founded in 1753 on the collection of Sir Hans Sloane and opened in 1759. Its classical holdings expanded through the acquisitions of the Townley collection, the Elgin marbles and nineteenth-century excavation in Mesopotamia and Anatolia.",
    ],
    collectionNotes: [
      "The Babylonian astronomical diaries held here are the longest continuous observational record from antiquity, and one of them independently corroborates the date and outcome of Gaugamela.",
      "The Cyrus Cylinder is a Babylonian foundation text produced for Cyrus after 539 BCE. It is regularly described as the first charter of human rights; it is a legitimating document written by a conqueror, and the platform says so.",
    ],
    contested: [
      {
        object: "The Parthenon sculptures",
        claimant: "Greece",
        note: "Removed by agents of Lord Elgin between 1801 and 1812 under a disputed Ottoman authorisation, and acquired by Parliament in 1816. Greece has sought their return since the 1980s. The sculptural programme is now divided between London and Athens, which is the fact that matters for a reader whatever position they take on ownership.",
      },
    ],
    citySlugs: ["athens", "babylon", "persepolis"],
    url: "https://www.britishmuseum.org/collection",
  },
  {
    slug: "museo-nazionale-romano",
    name: "Museo Nazionale Romano",
    city: "Rome",
    country: "Italy",
    founded: "1889",
    standfirst:
      "Four sites holding the sculpture, painting and coinage recovered as modern Rome was built over the ancient one.",
    description:
      "The Museo Nazionale Romano across Palazzo Massimo, the Baths of Diocletian, Palazzo Altemps and the Crypta Balbi — including the frescoes from the Villa of Livia.",
    scope:
      "Roman sculpture, wall painting, mosaics, epigraphy and numismatics, largely from Rome and Latium.",
    history: [
      "Established in 1889, in the period when the construction of the new national capital was turning up antiquities at a rate no existing institution could absorb.",
      "The Crypta Balbi site, opened later, presents the excavation of a single city block from antiquity through the medieval period, and is unusual among classical museums in treating the post-antique phases as evidence rather than as overburden.",
    ],
    collectionNotes: [
      "The garden frescoes from the Villa of Livia at Prima Porta are among the best-preserved Roman wall paintings anywhere, removed to the museum for conservation.",
      "The Aristotle herm in the Palazzo Altemps collection is one of the portrait types through which the philosopher has been visualised since the Renaissance.",
    ],
    citySlugs: ["rome"],
    url: "https://museonazionaleromano.beniculturali.it/",
  },
  {
    slug: "museo-di-antichita-turin",
    name: "Museo di Antichità",
    city: "Turin",
    country: "Italy",
    standfirst:
      "Holder of the Tusculum portrait — the only surviving likeness of Julius Caesar that may have been carved in his lifetime, and which nobody recognised as Caesar for over a century.",
    description:
      "The Museo di Antichità in Turin and the Tusculum Caesar: excavated in 1825, unrecognised until 1940, and one of only two Caesar portraits accepted as pre-imperial.",
    scope:
      "Archaeological collections of the Savoy state, including material from Piedmont and the royal collections at Agliè.",
    history: [
      "The Tusculum head reached Turin through the collection of the Castello di Agliè, a Savoy royal residence, having been excavated at Tusculum by Lucien Bonaparte in 1825.",
    ],
    collectionNotes: [
      "The Tusculum portrait was identified as Caesar by Maurizio Borda in 1940 — one hundred and fifteen years after it came out of the ground. Before that it sat in a royal collection as an unidentified Roman head.",
      "Its claim to be contemporary rests on comparison with the denarii struck by Marcus Mettius shortly before the assassination, which are securely dated and securely identified.",
    ],
    citySlugs: ["rome"],
  },
  {
    slug: "national-archaeological-museum-athens",
    name: "National Archaeological Museum",
    city: "Athens",
    country: "Greece",
    founded: "1829, in its earliest form",
    standfirst:
      "The principal collection of Greek antiquities, from the Mycenaean shaft-grave gold to the great bronzes recovered from the sea.",
    description:
      "The National Archaeological Museum of Athens — the Mycenae shaft-grave material including the gold mask, the boar's-tusk helmet, the Antikythera mechanism and the bronzes.",
    scope: "Greek antiquities of all periods from across Greece.",
    history: [
      "The collection began with the founding of the modern Greek state and moved into its present building in the 1880s. It absorbed the finds of the state's own excavations, including Schliemann's at Mycenae.",
    ],
    collectionNotes: [
      "The gold funerary mask from Grave Circle A is displayed under the name Schliemann gave it. It is some three centuries earlier than any traditional dating of the Trojan War and nothing connects it to any named person; the platform captions it by what it is.",
      "The boar's-tusk helmet is the single most important object for the question of what the Homeric poems preserve: a type described in Iliad 10 and out of use for centuries before the poem.",
    ],
    citySlugs: ["athens", "sparta", "troy"],
    url: "https://www.namuseum.gr/en/",
  },
  {
    slug: "acropolis-museum",
    name: "Acropolis Museum",
    city: "Athens",
    country: "Greece",
    founded: "2009 in its present building",
    standfirst:
      "Built at the foot of the rock to hold what came off it, and designed with a gallery whose empty spaces are an argument.",
    description:
      "The Acropolis Museum — the archaic korai from the Persian destruction deposit, the Parthenon frieze blocks held in Greece, and the gallery built around what is missing.",
    scope: "Material from the Acropolis and its slopes.",
    history: [
      "Opened in 2009, replacing a small museum on the rock itself. It is built over an excavated urban area of ancient Athens, visible through the floor.",
      "The top-floor Parthenon gallery is oriented to the building itself and displays the surviving frieze at its original spacing, with plaster casts marking the blocks in London.",
    ],
    collectionNotes: [
      "The archaic sculpture from the Persian destruction deposit is the most important body of pre-classical Greek sculpture anywhere. It survives because the Athenians buried the damaged dedications when they rebuilt after 480 BCE, which seals everything above as later.",
    ],
    contested: [
      {
        object: "The Parthenon sculptures held in London",
        claimant: "Greece seeks their return from the British Museum",
        note: "The museum's Parthenon gallery is designed to display the whole programme, with casts standing in for the blocks in London. The building is itself a statement in the dispute, which the platform records without adjudicating.",
      },
    ],
    citySlugs: ["athens"],
    url: "https://www.theacropolismuseum.gr/en",
  },
  {
    slug: "naples-national-archaeological-museum",
    name: "Museo Archeologico Nazionale di Napoli",
    city: "Naples",
    country: "Italy",
    standfirst:
      "Holder of nearly everything portable that came out of Pompeii and Herculaneum, which is why the sites and the museum have to be read together.",
    description:
      "The Naples National Archaeological Museum — the Alexander Mosaic, the Villa of the Papyri bronzes, the Pompeian wall paintings, and the Farnese collection.",
    scope:
      "Vesuvian material, the Farnese antiquities, and Egyptian and epigraphic collections.",
    history: [
      "Formed around the Farnese collection inherited by the Bourbon kings of Naples, and expanded enormously by the excavations at Herculaneum from 1738 and Pompeii from 1748, which were royal undertakings.",
    ],
    collectionNotes: [
      "Most of the paintings and mosaics a visitor sees at Pompeii today are reproductions; the originals are here. A reader who studies the site without the museum is looking at copies.",
      "The Alexander Mosaic, from the House of the Faun, is the principal image of Alexander in battle to survive from antiquity. It is usually identified with Issus and sometimes with Gaugamela; it carries no label and the identification is an inference.",
    ],
    citySlugs: ["pompeii", "rome"],
    url: "https://mann-napoli.it/",
  },
  {
    slug: "pergamon-museum",
    name: "Pergamon Museum",
    city: "Berlin",
    country: "Germany",
    founded: "1930 in its present building",
    standfirst:
      "Holder of the reconstructed Ishtar Gate, built from bricks excavated at Babylon and shipped to Berlin between 1899 and 1917.",
    description:
      "The Pergamon Museum — the Ishtar Gate and Processional Way, the Koldewey excavations at Babylon, and the questions a reconstruction raises.",
    scope: "Near Eastern, Islamic and classical architecture and sculpture.",
    history: [
      "Robert Koldewey excavated Babylon for the German Oriental Society from 1899 to 1917, recovering the glazed brick of the Ishtar Gate and Processional Way in tens of thousands of fragments, which were shipped to Berlin and reassembled over decades.",
    ],
    collectionNotes: [
      "What stands in Berlin is the inner gate only, at reduced scale, built from original bricks with modern infill. It is a reconstruction, and the platform captions it as one.",
    ],
    contested: [
      {
        object: "The Ishtar Gate material",
        claimant: "Iraq",
        note: "Acquired under an Ottoman-era permit before the modern Iraqi state existed. Iraqi officials have periodically raised the question of return. No settled legal claim is before the museum, and the platform records the situation without adjudicating.",
      },
    ],
    citySlugs: ["babylon"],
    url: "https://www.smb.museum/en/museums-institutions/pergamonmuseum/",
  },
  {
    slug: "glyptothek-munich",
    name: "Glyptothek",
    city: "Munich",
    country: "Germany",
    founded: "1830",
    standfirst:
      "A museum built for a single collection of ancient sculpture, and an early case of restoration being undone rather than added.",
    description:
      "The Glyptothek — Ludwig I's sculpture collection, the Aegina pediments, and the removal of Thorvaldsen's restorations in the twentieth century.",
    scope: "Greek and Roman sculpture.",
    history: [
      "Built for Crown Prince Ludwig of Bavaria to house his collection and opened in 1830 — one of the first buildings anywhere designed as a public museum for a specific holding.",
      "The Aegina pediment sculptures, acquired in 1813, were restored by Bertel Thorvaldsen in the early nineteenth century. Those restorations were removed in the 1960s, so the figures now stand as fragments.",
    ],
    collectionNotes: [
      "The Thorvaldsen episode is the standard teaching case for changing restoration ethics: nineteenth-century practice completed a damaged statue, twentieth-century practice removed the completion. Both were confident, and both altered the object.",
    ],
    citySlugs: ["rome", "athens"],
    url: "https://www.antike-am-koenigsplatz.mwn.de/en/glyptothek",
  },
  {
    slug: "archaeological-museum-heraklion",
    name: "Archaeological Museum of Heraklion",
    city: "Heraklion, Crete",
    country: "Greece",
    standfirst:
      "The principal Minoan collection, and the institution at the centre of the argument about how much of Knossos is Arthur Evans's.",
    description:
      "The Heraklion Archaeological Museum — the Minoan holdings, the Phaistos Disc, and Roman-period material from Crete.",
    scope: "Cretan antiquities from the Neolithic to the Roman period.",
    history: [
      "Formed from the finds of excavation on Crete from the late nineteenth century, above all Evans's at Knossos from 1900.",
    ],
    collectionNotes: [
      "The Minoan frescoes were heavily restored by Émile Gilliéron and his son under Evans's direction, and the extent of modern painting in what is displayed is substantial. This is one of the clearest cases in Aegean archaeology where a reconstruction has shaped how a civilisation is imagined.",
      "The Phaistos Disc remains undeciphered, and the numerous published decipherments are not accepted.",
    ],
    citySlugs: [],
    url: "https://heraklionmuseum.gr/en/",
  },
  {
    slug: "delphi-archaeological-museum",
    name: "Delphi Archaeological Museum",
    city: "Delphi",
    country: "Greece",
    standfirst:
      "Holder of the Charioteer, the Siphnian Treasury frieze, and the Delphic hymns — the only substantial ancient Greek music that survives with its notation.",
    description:
      "The Delphi Archaeological Museum — the bronze Charioteer, the archaic treasury sculpture, and the inscribed hymns to Apollo.",
    scope: "Finds from the sanctuary of Apollo and its surroundings.",
    history: [
      "Built to receive the finds of the French School's Grande Fouille from 1892, an excavation that required the relocation of the village of Kastri from on top of the sanctuary.",
    ],
    collectionNotes: [
      "The Charioteer of about 470 BCE is one of very few large Greek bronzes to survive, because it was buried by a rockfall. It is a fragment of a larger group including a chariot and horses.",
      "The Delphic hymns, inscribed on stone with musical notation above the text, are the principal surviving evidence for ancient Greek music as sound rather than theory.",
    ],
    citySlugs: ["delphi"],
  },
  {
    slug: "archaeological-museum-olympia",
    name: "Archaeological Museum of Olympia",
    city: "Archaia Olympia",
    country: "Greece",
    standfirst:
      "Holder of the Temple of Zeus pediments and the largest collection of Greek arms and armour anywhere, most of it dedicated as spoils.",
    description:
      "The Archaeological Museum of Olympia — the temple sculpture, the Hermes attributed to Praxiteles, the inscribed helmets, and the cup of Phidias.",
    scope: "Finds from the sanctuary of Zeus at Olympia.",
    history: [
      "Built to hold the finds of the German excavations begun in 1875, which were conducted under an agreement leaving the material in Greece — a precedent in the history of the discipline.",
    ],
    collectionNotes: [
      "The arms and armour are dedications of spoils, and many are inscribed with the names of the dedicating state and the defeated. That makes them historical documents as well as objects, including a helmet inscribed as dedicated by Miltiades.",
      "The black-glaze cup inscribed 'I belong to Phidias', found in the workshop, is among the most direct links between a named ancient artist and a surviving building.",
      "The attribution of the Hermes to Praxiteles rests on a passage in Pausanias and is argued; the statue may be a later copy.",
    ],
    citySlugs: ["olympia"],
  },
  {
    slug: "national-museum-of-iran",
    name: "National Museum of Iran",
    city: "Tehran",
    country: "Iran",
    founded: "1937",
    standfirst:
      "The principal collection of Iranian antiquity, and the destination of the Persepolis tablets as they return from Chicago.",
    description:
      "The National Museum of Iran — Achaemenid, Elamite and Sasanian holdings, and the Persepolis Fortification Archive.",
    scope: "Iranian antiquities from prehistory to the Islamic period.",
    history: [
      "Founded in 1937. Its Achaemenid holdings come substantially from the Persepolis and Susa excavations.",
    ],
    collectionNotes: [
      "The Persepolis Fortification Archive, excavated in 1933, was loaned to the Oriental Institute in Chicago for study and became the subject of protracted litigation in the United States before tablets began returning to Iran in stages. The loan's history is part of the archive's record.",
    ],
    citySlugs: ["persepolis", "susa"],
  },
  {
    slug: "istanbul-archaeological-museums",
    name: "Istanbul Archaeological Museums",
    city: "Istanbul",
    country: "Türkiye",
    founded: "1891",
    standfirst:
      "Founded to stop antiquities leaving the Ottoman empire, and holder of the Alexander Sarcophagus and the Treaty of Kadesh tablet.",
    description:
      "The Istanbul Archaeological Museums — the Sidon sarcophagi, the Kadesh treaty, and the Ottoman antiquities legislation that produced the institution.",
    scope: "Antiquities from across the former Ottoman territories.",
    history: [
      "Founded under Osman Hamdi Bey, who also drafted the antiquities legislation intended to end the export of finds. The museum exists because of a policy decision about where excavated material belongs.",
    ],
    collectionNotes: [
      "The so-called Alexander Sarcophagus from the royal necropolis at Sidon is not Alexander's; it is named from its relief scenes, and its occupant is usually identified as a local ruler.",
      "The cuneiform tablet of the treaty between Ramesses II and Hattusili III is the earliest surviving peace treaty text of which both sides' versions are known — the Egyptian version being carved at Karnak.",
    ],
    citySlugs: ["troy"],
  },
];

const BY_SLUG = new Map(MUSEUMS.map((m) => [m.slug, m]));

export function getMuseum(slug: string): Museum | undefined {
  return BY_SLUG.get(slug);
}

export function museumsForCity(citySlug: string): Museum[] {
  return MUSEUMS.filter((m) => m.citySlugs.includes(citySlug));
}
