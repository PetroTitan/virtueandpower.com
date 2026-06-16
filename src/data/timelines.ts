/**
 * Editorial timeline data. Each timeline is a static, SEO-first reference
 * page rendered by /timelines/[slug]; no client JS, no timeline framework.
 *
 * Dates follow conventional ancient chronology (many archaic and Egyptian
 * dates are approximate and so marked). No invented events. Related links
 * are stored as explicit href/label pairs to keep the route synchronous
 * and fast.
 */

export interface TimelineEvent {
  /** Date label as displayed, e.g. "431 BCE" or "c. 2686 BCE". */
  date: string;
  /** The event. */
  label: string;
}

export interface RelatedLink {
  href: string;
  label: string;
}

export interface Timeline {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  /** One or two intro paragraphs (plain text). */
  intro: string[];
  events: TimelineEvent[];
  /** Closing paragraph (plain text). */
  closing: string;
  related: RelatedLink[];
  updated: string;
}

export const timelines: ReadonlyArray<Timeline> = [
  {
    slug: "ancient-egypt",
    title: "Ancient Egypt Timeline",
    eyebrow: "Timeline",
    description:
      "A chronology of ancient Egypt across three thousand years — from the unification of the Two Lands through the Old, Middle and New Kingdoms to Cleopatra and the Roman conquest.",
    intro: [
      "Egyptian civilization endured, with a recognizable identity, for some three thousand years — longer than any other ancient civilization. Its history is conventionally divided into the great Kingdoms of centralized rule, separated by Intermediate Periods of division. Many early dates are approximate.",
    ],
    events: [
      { date: "c. 3100 BCE", label: "Unification of Upper and Lower Egypt (the Narmer Palette tradition); beginning of the Early Dynastic Period." },
      { date: "c. 2686–2181 BCE", label: "The Old Kingdom — the Age of the Pyramids. Djoser's Step Pyramid at Saqqara; the Great Pyramid of Khufu at Giza." },
      { date: "c. 2181–2055 BCE", label: "First Intermediate Period — collapse of central authority and competing local rulers." },
      { date: "c. 2055–1650 BCE", label: "The Middle Kingdom — reunification under Mentuhotep II and the Twelfth Dynasty; the classical age of Egyptian literature." },
      { date: "c. 1650–1550 BCE", label: "Second Intermediate Period — the Hyksos dominate the Delta." },
      { date: "c. 1550–1069 BCE", label: "The New Kingdom — Egypt at its imperial height." },
      { date: "c. 1479–1458 BCE", label: "Hatshepsut rules as pharaoh; her temple at Deir el-Bahari." },
      { date: "c. 1457 BCE", label: "Thutmose III's victory at Megiddo; the empire extended to the Euphrates." },
      { date: "c. 1353–1336 BCE", label: "Akhenaten's religious revolution and the worship of the Aten; the capital moved to Amarna." },
      { date: "c. 1279–1213 BCE", label: "Reign of Ramesses II; the battle of Kadesh and the first surviving peace treaty; Abu Simbel." },
      { date: "c. 1069–664 BCE", label: "Third Intermediate Period — fragmentation, then Kushite and Assyrian intervention." },
      { date: "525 BCE", label: "Persian conquest of Egypt under Cambyses; Egypt a satrapy of the Achaemenid Empire." },
      { date: "332 BCE", label: "Alexander the Great takes Egypt; foundation of Alexandria." },
      { date: "305–30 BCE", label: "The Ptolemaic dynasty — Greek pharaohs; the Library of Alexandria." },
      { date: "30 BCE", label: "Death of Cleopatra VII; Egypt annexed by Rome, ending three millennia of independent monarchy." },
    ],
    closing:
      "Egypt's defining quality was endurance: an order that could collapse and be reborn again and again. Its absorption by Rome closed the longest-lived political tradition of the ancient world.",
    related: [
      { href: "/civilizations/egypt", label: "Egypt — the civilization hub" },
      { href: "/civilizations/old-kingdom", label: "The Old Kingdom" },
      { href: "/civilizations/new-kingdom", label: "The New Kingdom" },
      { href: "/maps/egypt", label: "Map: Ancient Egypt" },
      { href: "/essays/why-egypt-lasted", label: "Essay: Why Egypt lasted" },
    ],
    updated: "2026-06-16",
  },
  {
    slug: "ancient-greece",
    title: "Ancient Greece Timeline",
    eyebrow: "Timeline",
    description:
      "A chronology of ancient Greece from the Bronze Age and Homer through the Archaic and Classical ages to the conquests of Alexander and the Hellenistic world.",
    intro: [
      "Greek civilization runs from the Bronze Age palaces through the rise of the city-state, the Classical age of Athens and Sparta, and the Macedonian conquest that opened the Hellenistic world.",
    ],
    events: [
      { date: "c. 1600–1100 BCE", label: "Mycenaean (Bronze Age) Greece; the world remembered in Homer." },
      { date: "c. 1100–800 BCE", label: "The Greek Dark Age following the Bronze Age collapse." },
      { date: "c. 776 BCE", label: "Traditional date of the first Olympic Games." },
      { date: "c. 750–550 BCE", label: "The Archaic age — the rise of the polis, colonization, and the lawgivers (Lycurgus, Solon)." },
      { date: "594 BCE", label: "Solon's reforms at Athens." },
      { date: "508 BCE", label: "Cleisthenes' reforms establish Athenian democracy." },
      { date: "490 & 480–479 BCE", label: "The Persian Wars — Marathon, Thermopylae, Salamis, Plataea." },
      { date: "461–429 BCE", label: "The age of Pericles; the building of the Parthenon." },
      { date: "431–404 BCE", label: "The Peloponnesian War; Athens defeated by Sparta." },
      { date: "399 BCE", label: "Trial and death of Socrates." },
      { date: "371 BCE", label: "Thebes under Epaminondas breaks Spartan power at Leuctra." },
      { date: "338 BCE", label: "Philip II of Macedon defeats the Greeks at Chaeronea." },
      { date: "336–323 BCE", label: "The conquests of Alexander the Great." },
      { date: "323–30 BCE", label: "The Hellenistic age — the Successor kingdoms; Greek culture across the Near East." },
      { date: "146 BCE", label: "Rome's sack of Corinth; Greece under Roman control." },
    ],
    closing:
      "The Greek genius for thought, art and political experiment, born in the small free city, outlived the political independence of the cities themselves, carried by Macedon and Rome to the future of the West.",
    related: [
      { href: "/civilizations/greece", label: "Greece — the civilization hub" },
      { href: "/maps/ancient-greece", label: "Map: Ancient Greece" },
      { href: "/timelines/classical-athens", label: "Timeline: Classical Athens" },
      { href: "/comparisons/greece-vs-persia", label: "Greece vs Persia" },
    ],
    updated: "2026-06-16",
  },
  {
    slug: "classical-athens",
    title: "Classical Athens Timeline",
    eyebrow: "Timeline",
    description:
      "A chronology of the Athenian golden age — from the reforms that built the democracy through the age of Pericles and the disaster of the Peloponnesian War to the trial of Socrates.",
    intro: [
      "In the two centuries between Solon and Aristotle, Athens invented democracy, built the Parthenon, fought the Persian and Peloponnesian Wars, and produced the philosophy and drama that shaped the West.",
    ],
    events: [
      { date: "594 BCE", label: "Solon's reforms lay the legal ground of the democracy." },
      { date: "561–510 BCE", label: "The tyranny of Peisistratus and his sons." },
      { date: "508 BCE", label: "Cleisthenes' reforms establish the democracy." },
      { date: "490 BCE", label: "Athenian victory over Persia at Marathon." },
      { date: "480–479 BCE", label: "Salamis and Plataea; the Persian invasion repelled." },
      { date: "478 BCE", label: "Foundation of the Delian League — the basis of the Athenian empire." },
      { date: "461–429 BCE", label: "The ascendancy of Pericles." },
      { date: "447–432 BCE", label: "The Parthenon built on the Acropolis." },
      { date: "431 BCE", label: "Outbreak of the Peloponnesian War; Pericles' Funeral Oration." },
      { date: "430–426 BCE", label: "The plague at Athens; death of Pericles (429)." },
      { date: "415–413 BCE", label: "The Sicilian Expedition ends in catastrophe." },
      { date: "404 BCE", label: "Athens surrenders to Sparta; the Long Walls demolished." },
      { date: "403 BCE", label: "Democracy restored after the Thirty Tyrants." },
      { date: "399 BCE", label: "Trial and execution of Socrates." },
      { date: "387 BCE", label: "Plato founds the Academy." },
      { date: "335 BCE", label: "Aristotle founds the Lyceum." },
    ],
    closing:
      "Athens lost its empire and its independence, but the democracy, drama and philosophy of its golden age became the permanent inheritance of the West.",
    related: [
      { href: "/civilizations/athens", label: "Athens — the civilization hub" },
      { href: "/civilizations/athens-reforms", label: "The Athenian Reforms" },
      { href: "/maps/athens", label: "Map: Athens and Attica" },
      { href: "/timelines/peloponnesian-war", label: "Timeline: Peloponnesian War" },
      { href: "/philosophers/pericles", label: "Pericles" },
    ],
    updated: "2026-06-16",
  },
  {
    slug: "sparta",
    title: "Sparta Timeline",
    eyebrow: "Timeline",
    description:
      "A chronology of Sparta — from the Lycurgan order and the conquest of Messenia through its leadership against Persia and victory over Athens to its fall at Leuctra.",
    intro: [
      "Sparta's history is the rise and fall of a unique military society — built on the Lycurgan discipline and the subjection of Messenia, dominant for a time, and broken when that foundation was lost.",
    ],
    events: [
      { date: "9th–7th c. BCE", label: "The Lycurgan constitution and the agoge (traditional dating; historicity debated)." },
      { date: "c. 735–650 BCE", label: "The Messenian Wars; the conquest and enslavement of Messenia (the helots)." },
      { date: "480 BCE", label: "Leonidas and the 300 at Thermopylae." },
      { date: "479 BCE", label: "Spartan-led victory over Persia at Plataea." },
      { date: "464 BCE", label: "Great earthquake and helot revolt." },
      { date: "431–404 BCE", label: "The Peloponnesian War against Athens." },
      { date: "425 BCE", label: "Spartan defeat and surrender at Pylos." },
      { date: "422 BCE", label: "Brasidas killed in victory at Amphipolis." },
      { date: "405 BCE", label: "Lysander destroys the Athenian fleet at Aegospotami." },
      { date: "404 BCE", label: "Sparta defeats Athens; the brief Spartan hegemony begins." },
      { date: "396–394 BCE", label: "Agesilaus campaigns in Asia against Persia." },
      { date: "371 BCE", label: "Epaminondas of Thebes shatters the Spartan army at Leuctra." },
      { date: "369 BCE", label: "Liberation of Messenia destroys the economic base of Spartan power." },
      { date: "195 BCE onward", label: "Sparta declines to a minor state; later a Roman tourist curiosity." },
    ],
    closing:
      "Sparta's discipline made it the most formidable infantry power of Greece, but its closed citizen body and its dependence on the helots left it unable to recover once Messenia was lost.",
    related: [
      { href: "/civilizations/sparta", label: "Sparta — the civilization hub" },
      { href: "/maps/sparta", label: "Map: Spartan territory" },
      { href: "/philosophers/lycurgus", label: "Lycurgus" },
      { href: "/comparisons/athens-vs-sparta", label: "Athens vs Sparta" },
    ],
    updated: "2026-06-16",
  },
  {
    slug: "achaemenid-persia",
    title: "Achaemenid Persia Timeline",
    eyebrow: "Timeline",
    description:
      "A chronology of the first world-empire — from Cyrus the Great's founding through Darius's organization and the Greek wars to the conquest by Alexander.",
    intro: [
      "The Achaemenid Empire was the first great multi-ethnic world-empire, founded by Cyrus and organized by Darius, governing a continent for two centuries until Alexander.",
    ],
    events: [
      { date: "559 BCE", label: "Cyrus the Great becomes king of Persia." },
      { date: "550 BCE", label: "Cyrus overthrows the Median empire." },
      { date: "539 BCE", label: "Cyrus takes Babylon; the Cyrus Cylinder." },
      { date: "530 BCE", label: "Death of Cyrus; accession of Cambyses." },
      { date: "525 BCE", label: "Cambyses conquers Egypt." },
      { date: "522–486 BCE", label: "Reign of Darius I; the satrapal system, the royal roads, the daric coinage; the Behistun Inscription." },
      { date: "499–494 BCE", label: "The Ionian Revolt." },
      { date: "490 BCE", label: "Darius's invasion of Greece halted at Marathon." },
      { date: "480–479 BCE", label: "Xerxes's invasion; Thermopylae and Salamis (480), Plataea (479)." },
      { date: "401 BCE", label: "Cyrus the Younger's revolt; the march of Xenophon's Ten Thousand." },
      { date: "5th–4th c. BCE", label: "Persia plays the Greek states against one another with gold and diplomacy." },
      { date: "334–330 BCE", label: "Alexander conquers the empire — Granicus, Issus, Gaugamela." },
      { date: "330 BCE", label: "Death of Darius III; end of the Achaemenid Empire." },
    ],
    closing:
      "The Achaemenid model of tolerant, accommodating rule over many peoples was the first durable solution to the problem of empire, inherited by Alexander and elaborated for a thousand years.",
    related: [
      { href: "/civilizations/achaemenid-empire", label: "The Achaemenid Empire" },
      { href: "/maps/persian-empire", label: "Map: The Persian Empire" },
      { href: "/philosophers/cyrus-the-great", label: "Cyrus the Great" },
      { href: "/philosophers/darius-i", label: "Darius I" },
    ],
    updated: "2026-06-16",
  },
  {
    slug: "alexander",
    title: "Alexander Timeline",
    eyebrow: "Timeline",
    description:
      "A chronology of Alexander the Great — from his accession through the conquest of the Persian Empire to his death at Babylon and the wars of his Successors.",
    intro: [
      "In a single decade Alexander conquered the largest empire the world had seen, and his early death opened the forty-year struggle of the Successors that created the Hellenistic kingdoms.",
    ],
    events: [
      { date: "356 BCE", label: "Birth of Alexander at Pella; tutored by Aristotle from 343." },
      { date: "338 BCE", label: "Philip and Alexander defeat the Greeks at Chaeronea." },
      { date: "336 BCE", label: "Assassination of Philip II; Alexander becomes king." },
      { date: "334 BCE", label: "Alexander crosses into Asia; victory at the Granicus." },
      { date: "333 BCE", label: "Victory over Darius III at Issus." },
      { date: "332 BCE", label: "Siege of Tyre; conquest of Egypt; foundation of Alexandria." },
      { date: "331 BCE", label: "Decisive victory at Gaugamela; fall of Babylon and Persepolis." },
      { date: "330 BCE", label: "Death of Darius III; Alexander master of the Persian Empire." },
      { date: "329–327 BCE", label: "Campaigns in Bactria and Sogdiana; growing autocracy and Persianization." },
      { date: "326 BCE", label: "Victory at the Hydaspes in India; the army refuses to go further." },
      { date: "323 BCE", label: "Death of Alexander at Babylon, aged 32." },
      { date: "323–281 BCE", label: "The Wars of the Successors (Diadochi); the empire divided." },
      { date: "301 BCE", label: "Battle of Ipsus; reunification of the empire becomes impossible." },
    ],
    closing:
      "Alexander proved that almost anything can be conquered and almost nothing thereby held: he built no lasting institutions and left no settled succession, and his empire shattered the moment he died.",
    related: [
      { href: "/philosophers/alexander", label: "Alexander the Great" },
      { href: "/civilizations/macedon", label: "Macedon" },
      { href: "/maps/alexander-empire", label: "Map: Empire of Alexander" },
      { href: "/essays/why-alexander-succeeded", label: "Essay: Why Alexander succeeded" },
    ],
    updated: "2026-06-16",
  },
  {
    slug: "roman-republic",
    title: "Roman Republic Timeline",
    eyebrow: "Timeline",
    description:
      "A chronology of the Roman Republic — from the expulsion of the kings through the conquest of the Mediterranean to the civil wars that destroyed it and brought Augustus to power.",
    intro: [
      "For nearly five centuries the Roman Republic governed by a mixed constitution of consuls, Senate and people, until the ambitions of its great generals and the loyalty of its armies to them brought it down.",
    ],
    events: [
      { date: "509 BCE", label: "Expulsion of the kings; foundation of the Republic." },
      { date: "494–287 BCE", label: "The Conflict of the Orders — the plebeians win political rights." },
      { date: "451–450 BCE", label: "The Twelve Tables, Rome's first written law." },
      { date: "264–146 BCE", label: "The Punic Wars against Carthage; Rome masters the western Mediterranean." },
      { date: "216 BCE", label: "Hannibal's victory at Cannae; Fabius's strategy of delay." },
      { date: "146 BCE", label: "Destruction of Carthage and Corinth." },
      { date: "133–121 BCE", label: "The Gracchi and the beginning of the Republic's crisis." },
      { date: "107–86 BCE", label: "Marius's reforms; the army becomes loyal to its general." },
      { date: "88–82 BCE", label: "Sulla marches on Rome; civil war and proscriptions." },
      { date: "60 BCE", label: "The First Triumvirate — Caesar, Pompey, Crassus." },
      { date: "58–50 BCE", label: "Caesar's conquest of Gaul." },
      { date: "49–45 BCE", label: "Civil war between Caesar and Pompey; Caesar victorious." },
      { date: "44 BCE", label: "Assassination of Julius Caesar." },
      { date: "31 BCE", label: "Octavian defeats Antony and Cleopatra at Actium." },
      { date: "27 BCE", label: "Octavian becomes Augustus; the Republic gives way to the Principate." },
    ],
    closing:
      "The Republic fell not from a single blow but from the long erosion of the civic discipline its constitution assumed, as its great men outgrew the order that had made them.",
    related: [
      { href: "/civilizations/roman-republic", label: "The Roman Republic" },
      { href: "/maps/roman-republic", label: "Map: The Roman Republic" },
      { href: "/comparisons/caesar-vs-pompey", label: "Caesar vs Pompey" },
      { href: "/essays/why-the-roman-republic-collapsed", label: "Essay: Why the Roman Republic collapsed" },
    ],
    updated: "2026-06-16",
  },
  {
    slug: "roman-empire",
    title: "Roman Empire Timeline",
    eyebrow: "Timeline",
    description:
      "A chronology of the Roman Empire — from Augustus and the Principate through the high empire and the third-century crisis to Constantine and the late empire.",
    intro: [
      "The empire founded by Augustus gave the Mediterranean world two centuries of peace, reached its height under the Antonines, survived a near-fatal crisis, and was refounded by Diocletian and Constantine.",
    ],
    events: [
      { date: "27 BCE", label: "Augustus founds the Principate." },
      { date: "14 CE", label: "Death of Augustus; the succession of Tiberius." },
      { date: "69 CE", label: "The Year of the Four Emperors; the Flavian dynasty follows." },
      { date: "96–180 CE", label: "The Five Good Emperors — Nerva, Trajan, Hadrian, Antoninus Pius, Marcus Aurelius." },
      { date: "117 CE", label: "The empire reaches its greatest extent under Trajan." },
      { date: "122 CE", label: "Hadrian fixes the frontiers; Hadrian's Wall begun." },
      { date: "161–180 CE", label: "Marcus Aurelius; the Meditations." },
      { date: "235–284 CE", label: "The Crisis of the Third Century — civil war, invasion, near-collapse." },
      { date: "284–305 CE", label: "Diocletian reorganizes the empire; the Tetrarchy." },
      { date: "312 CE", label: "Constantine's victory at the Milvian Bridge." },
      { date: "313 CE", label: "The Edict of Milan tolerates Christianity." },
      { date: "330 CE", label: "Constantine founds Constantinople." },
      { date: "395 CE", label: "Permanent division into Eastern and Western empires." },
      { date: "476 CE", label: "Deposition of the last western emperor; the western empire ends." },
    ],
    closing:
      "The empire transformed itself repeatedly — from Principate to militarized late empire, from pagan to Christian — and the eastern half, centred on Constantinople, endured for another thousand years.",
    related: [
      { href: "/civilizations/principate", label: "The Principate" },
      { href: "/civilizations/high-empire", label: "The High Empire" },
      { href: "/maps/roman-empire", label: "Map: The Roman Empire" },
      { href: "/comparisons/trajan-vs-hadrian", label: "Trajan vs Hadrian" },
    ],
    updated: "2026-06-16",
  },
  {
    slug: "peloponnesian-war",
    title: "Peloponnesian War Timeline",
    eyebrow: "Timeline",
    description:
      "A chronology of the twenty-seven-year war between Athens and Sparta that broke the classical Greek world, as recorded by Thucydides and continued by Xenophon.",
    intro: [
      "The Peloponnesian War (431–404 BCE) was the long contest between the sea power of Athens and the land power of Sparta that exhausted the Greek world and ended the Athenian golden age.",
    ],
    events: [
      { date: "431 BCE", label: "War begins; Sparta invades Attica; Pericles' Funeral Oration." },
      { date: "430–426 BCE", label: "The plague at Athens; death of Pericles (429)." },
      { date: "428–427 BCE", label: "Revolt of Mytilene; the Mytilenean Debate." },
      { date: "425 BCE", label: "Athenian success at Pylos; Spartans captured." },
      { date: "422 BCE", label: "Battle of Amphipolis; deaths of Brasidas and Cleon." },
      { date: "421 BCE", label: "The Peace of Nicias — an unstable truce." },
      { date: "416 BCE", label: "The Melian Dialogue; Athens destroys Melos." },
      { date: "415–413 BCE", label: "The Sicilian Expedition ends in total catastrophe at Syracuse." },
      { date: "411 BCE", label: "Oligarchic coup at Athens (the Four Hundred); Thucydides' narrative breaks off." },
      { date: "406 BCE", label: "Athenian naval victory at Arginusae; the generals executed." },
      { date: "405 BCE", label: "Lysander destroys the Athenian fleet at Aegospotami." },
      { date: "404 BCE", label: "Athens surrenders; the Long Walls demolished; the Thirty Tyrants installed." },
    ],
    closing:
      "Athens defeated itself as much as Sparta defeated it — abandoning Pericles' strategy for the Sicilian gamble — and Sparta won only with Persian gold. The war left no Greek city strong enough to lead.",
    related: [
      { href: "/books/history-of-the-peloponnesian-war", label: "Thucydides' History" },
      { href: "/essays/why-athens-lost", label: "Essay: Why Athens lost" },
      { href: "/essays/the-sicilian-expedition", label: "Essay: The Sicilian Expedition" },
      { href: "/comparisons/athens-vs-sparta", label: "Athens vs Sparta" },
    ],
    updated: "2026-06-16",
  },
  {
    slug: "civilization",
    title: "Civilization Timeline",
    eyebrow: "Timeline",
    description:
      "A grand chronology of the ancient civilizations the platform reads — Egypt, Mesopotamia, Persia, Greece, Macedon and Rome — across three thousand years from the first states to the fall of the western empire.",
    intro: [
      "This overview places the platform's civilizations on a single timeline, from the first states of Egypt and Mesopotamia through Persia, Greece and Rome, so the great currents of ancient history can be seen together.",
    ],
    events: [
      { date: "c. 3100 BCE", label: "Unification of Egypt; the pharaonic state begins." },
      { date: "c. 1754 BCE", label: "The Code of Hammurabi in Babylon." },
      { date: "c. 1550–1069 BCE", label: "The Egyptian New Kingdom at its imperial height." },
      { date: "c. 800–500 BCE", label: "The rise of the Greek polis; Rome traditionally founded (753) and the Republic begins (509)." },
      { date: "559–530 BCE", label: "Cyrus founds the Persian Empire." },
      { date: "490–479 BCE", label: "The Persian Wars; the Greek world repels the empire." },
      { date: "431–404 BCE", label: "The Peloponnesian War." },
      { date: "399 BCE", label: "Death of Socrates; the age of Plato and Aristotle." },
      { date: "336–323 BCE", label: "Alexander conquers the Persian Empire; the Hellenistic age begins." },
      { date: "264–146 BCE", label: "The Punic Wars; Rome masters the Mediterranean." },
      { date: "44–27 BCE", label: "The fall of the Roman Republic; Augustus founds the empire." },
      { date: "30 BCE", label: "Death of Cleopatra; the last Hellenistic kingdom absorbed by Rome." },
      { date: "96–180 CE", label: "The Roman Empire at its height under the Five Good Emperors." },
      { date: "330 CE", label: "Constantine founds Constantinople; the Christian empire." },
      { date: "476 CE", label: "The western Roman Empire ends." },
    ],
    closing:
      "Across three thousand years the centre of gravity moved from the river valleys of Egypt and Mesopotamia to Persia, to the Greek cities, and finally to Rome — each civilization inheriting and transforming what came before.",
    related: [
      { href: "/civilizations", label: "All civilization hubs" },
      { href: "/timelines/ancient-egypt", label: "Timeline: Ancient Egypt" },
      { href: "/timelines/ancient-greece", label: "Timeline: Ancient Greece" },
      { href: "/timelines/roman-empire", label: "Timeline: Roman Empire" },
    ],
    updated: "2026-06-16",
  },
];

export function getTimeline(slug: string): Timeline | undefined {
  return timelines.find((t) => t.slug === slug);
}
