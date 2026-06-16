/**
 * Editorial map data. Each map is a static, SEO-first reference page
 * rendered by /maps/[slug]: the map image (from the archive registry),
 * an explanation, political context, key locations, and related content.
 * No client JS, no map framework. Related links are explicit href/label
 * pairs to keep the route synchronous.
 */

import type { RelatedLink } from "./timelines";

export interface KeyLocation {
  name: string;
  note: string;
}

export interface AncientMap {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  /** Slug of the registered archive image (src/data/archive-images.ts). */
  imageSlug: string;
  /** Explanation and political-context paragraphs (plain text). */
  body: string[];
  keyLocations: KeyLocation[];
  related: RelatedLink[];
  updated: string;
}

export const maps: ReadonlyArray<AncientMap> = [
  {
    slug: "ancient-greece",
    title: "Ancient Greece Map",
    eyebrow: "Map",
    description:
      "A reference map of ancient Greece — the mountainous, sea-girt world of the city-states, from the Peloponnese to the Aegean, in which the classical civilization grew.",
    imageSlug: "map-ancient-greece",
    body: [
      "Ancient Greece was not a unified country but a world of hundreds of independent city-states (poleis), separated by mountains and the sea. This geography shaped its politics: the rugged terrain favoured small, self-governing communities and frustrated unification, producing both the creativity and the fragmentation of the Greek world.",
      "The sea was the great connector. Greek civilization extended far beyond the mainland — to the Aegean islands, the coast of Asia Minor (Ionia), and colonies across the Mediterranean and Black Sea. The two leading powers, maritime Athens and land-based Sparta, embodied the contrast that the Peloponnesian War would test to destruction.",
    ],
    keyLocations: [
      { name: "Athens", note: "The leading democracy and naval power, in Attica." },
      { name: "Sparta", note: "The militarized polity of Laconia, in the Peloponnese." },
      { name: "Thebes", note: "The chief city of Boeotia; briefly dominant after Leuctra." },
      { name: "Delphi", note: "The sanctuary of Apollo and the oracle, the religious centre of Greece." },
      { name: "Ionia", note: "The Greek cities of the Asia Minor coast, often under Persian pressure." },
    ],
    related: [
      { href: "/civilizations/greece", label: "Greece — the civilization hub" },
      { href: "/timelines/ancient-greece", label: "Timeline: Ancient Greece" },
      { href: "/maps/athens", label: "Map: Athens and Attica" },
      { href: "/comparisons/athens-vs-sparta", label: "Athens vs Sparta" },
    ],
    updated: "2026-06-16",
  },
  {
    slug: "athens",
    title: "Athens Map",
    eyebrow: "Map",
    description:
      "A reference map of Athens and Attica — the city, its port at the Piraeus, the Long Walls that joined them, and the territory of the Athenian democracy.",
    imageSlug: "map-athens-attica",
    body: [
      "Attica, the territory of Athens, was a large peninsula whose unification under a single city was the foundation of Athenian power. The city itself, crowned by the Acropolis, lay a few miles inland; its lifeline was the Piraeus, the great harbour from which the fleet and the grain trade operated.",
      "The Long Walls, built under Pericles, joined the city to the Piraeus in a single fortified system, making Athens effectively an island that could be supplied by sea even while its land was ravaged — the basis of Periclean grand strategy in the Peloponnesian War. Their demolition in 404 BCE marked the symbolic end of Athenian power.",
    ],
    keyLocations: [
      { name: "The Acropolis", note: "The sacred citadel, crowned by the Parthenon." },
      { name: "The Agora", note: "The civic and commercial heart of the city." },
      { name: "The Pnyx", note: "The hill where the citizen assembly met and voted." },
      { name: "The Piraeus", note: "The port of Athens and base of its fleet." },
      { name: "The Long Walls", note: "The fortifications joining the city to its port." },
    ],
    related: [
      { href: "/civilizations/athens", label: "Athens — the civilization hub" },
      { href: "/timelines/classical-athens", label: "Timeline: Classical Athens" },
      { href: "/philosophers/pericles", label: "Pericles" },
      { href: "/themes/naval-empire", label: "Theme: Naval Empire" },
    ],
    updated: "2026-06-16",
  },
  {
    slug: "sparta",
    title: "Sparta Map",
    eyebrow: "Map",
    description:
      "A reference map of Spartan territory — Laconia and the subject land of Messenia, the agricultural base whose enslaved population sustained the Spartan citizen-soldier.",
    imageSlug: "map-sparta",
    body: [
      "Sparta lay in Laconia, in the southern Peloponnese, in a fertile valley walled by mountains. Uniquely among Greek cities, it was unwalled — its citizen army was its defence — and it controlled an unusually large territory by conquest rather than colonization.",
      "The key to Spartan power was Messenia, the rich region to the west conquered in the archaic period and held as a subject population of helots, whose agricultural labour freed the Spartiate citizens to be full-time soldiers. When Epaminondas liberated Messenia in 369 BCE, the economic foundation of the whole Spartan system collapsed, and Sparta never recovered.",
    ],
    keyLocations: [
      { name: "Sparta", note: "The unwalled city in the Eurotas valley of Laconia." },
      { name: "Laconia", note: "The Spartan home territory in the south-east Peloponnese." },
      { name: "Messenia", note: "The conquered region whose helots sustained the Spartan economy." },
      { name: "Leuctra", note: "In Boeotia, site of the 371 BCE defeat that broke Spartan power." },
    ],
    related: [
      { href: "/civilizations/sparta", label: "Sparta — the civilization hub" },
      { href: "/timelines/sparta", label: "Timeline: Sparta" },
      { href: "/philosophers/lycurgus", label: "Lycurgus" },
      { href: "/themes/spartan-order", label: "Theme: Spartan Order" },
    ],
    updated: "2026-06-16",
  },
  {
    slug: "persian-empire",
    title: "Persian Empire Map",
    eyebrow: "Map",
    description:
      "A reference map of the Achaemenid Persian Empire at its height — from the Aegean to the Indus, the first great multi-ethnic world-empire, governed through its satrapies.",
    imageSlug: "map-persian-empire",
    body: [
      "The Achaemenid Empire, founded by Cyrus and organized by Darius, was the largest the world had yet seen — stretching from the Aegean coast and Egypt in the west to the Indus valley in the east, embracing dozens of peoples, languages and traditions.",
      "It was governed through satrapies — provinces under royal governors — bound to the centre by the royal roads, a standardized coinage, and a policy of tolerant accommodation that left subject peoples their own laws, gods and elites. This was the first durable solution to the problem of governing a multi-ethnic world, and the model Alexander and his successors inherited.",
    ],
    keyLocations: [
      { name: "Persepolis", note: "The ceremonial capital, with the great Apadana." },
      { name: "Susa", note: "The administrative capital and terminus of the Royal Road." },
      { name: "Babylon", note: "The greatest city of the empire, taken by Cyrus in 539 BCE." },
      { name: "Sardis", note: "The western satrapal capital, near the Greek world." },
      { name: "The Royal Road", note: "The relay road linking Susa to Sardis across the empire." },
    ],
    related: [
      { href: "/civilizations/achaemenid-empire", label: "The Achaemenid Empire" },
      { href: "/timelines/achaemenid-persia", label: "Timeline: Achaemenid Persia" },
      { href: "/philosophers/darius-i", label: "Darius I" },
      { href: "/comparisons/greece-vs-persia", label: "Greece vs Persia" },
    ],
    updated: "2026-06-16",
  },
  {
    slug: "alexander-empire",
    title: "Alexander Empire Map",
    eyebrow: "Map",
    description:
      "A reference map of the empire of Alexander the Great — the route of his conquests from Macedon to the Indus, and the largest dominion the ancient world had seen.",
    imageSlug: "map-alexander-empire",
    body: [
      "In a single decade (334–323 BCE) Alexander led the Macedonian army from the Aegean across Asia Minor, through Syria and Egypt, into the heart of the Persian Empire, and on to the Indus — winning the great battles of Granicus, Issus and Gaugamela and founding cities (above all Alexandria) along the way.",
      "The empire he conquered was essentially the Achaemenid realm, taken over largely intact. He built no governing institutions of his own and arranged no succession, and at his death at Babylon in 323 BCE the empire fractured among his generals into the Hellenistic kingdoms — Ptolemaic Egypt, the Seleucid Empire, and Antigonid Macedon.",
    ],
    keyLocations: [
      { name: "Pella", note: "The Macedonian capital, Alexander's starting point." },
      { name: "Issus", note: "Site of the 333 BCE victory over Darius III in Cilicia." },
      { name: "Gaugamela", note: "Site of the decisive 331 BCE victory in Mesopotamia." },
      { name: "Alexandria", note: "The greatest of Alexander's foundations, in Egypt." },
      { name: "Babylon", note: "Where Alexander died in 323 BCE." },
    ],
    related: [
      { href: "/philosophers/alexander", label: "Alexander the Great" },
      { href: "/timelines/alexander", label: "Timeline: Alexander" },
      { href: "/civilizations/macedon", label: "Macedon" },
      { href: "/comparisons/cyrus-vs-alexander", label: "Cyrus vs Alexander" },
    ],
    updated: "2026-06-16",
  },
  {
    slug: "roman-republic",
    title: "Roman Republic Map",
    eyebrow: "Map",
    description:
      "A reference map of ancient Italy, the heartland from which the Roman Republic grew to master the Mediterranean — its peoples, roads and colonies.",
    imageSlug: "map-roman-republic",
    body: [
      "The Roman Republic began as a single city-state in central Italy and, over centuries, brought the whole Italian peninsula under its control — first the neighbouring Latins and Etruscans, then the Samnites and the Greek cities of the south — binding them through a flexible system of alliances and colonies.",
      "This Italian base, with its reserves of manpower and its network of military roads, was the foundation of Roman power. From it the Republic went on, in the Punic Wars, to defeat Carthage and master the western Mediterranean, and then the Hellenistic East — an expansion that brought the wealth and the armies that would eventually destroy the Republic itself.",
    ],
    keyLocations: [
      { name: "Rome", note: "The city on the Tiber from which the Republic grew." },
      { name: "Latium", note: "The home region of the Latins, Rome's first sphere." },
      { name: "Capua & Campania", note: "The rich region of the south, contested in the Punic Wars." },
      { name: "The Greek cities", note: "Tarentum and others in the south (Magna Graecia)." },
      { name: "Cannae", note: "In Apulia, site of Hannibal's great victory of 216 BCE." },
    ],
    related: [
      { href: "/civilizations/roman-republic", label: "The Roman Republic" },
      { href: "/timelines/roman-republic", label: "Timeline: Roman Republic" },
      { href: "/comparisons/republic-vs-empire", label: "Republic vs Empire" },
      { href: "/philosophers/scipio-africanus", label: "Scipio Africanus" },
    ],
    updated: "2026-06-16",
  },
  {
    slug: "roman-empire",
    title: "Roman Empire Map",
    eyebrow: "Map",
    description:
      "A reference map of the Roman Empire at its greatest extent under Trajan in 117 CE — from Britain to Mesopotamia, the Mediterranean an inland Roman sea.",
    imageSlug: "map-roman-empire",
    body: [
      "By the second century CE the Roman Empire encircled the entire Mediterranean — mare nostrum, 'our sea' — and reached from the Atlantic coast and Britain in the north-west to the Euphrates and, briefly, Mesopotamia in the east. It was the largest and most enduring empire of the ancient West.",
      "Its frontiers (the limes) ran along great rivers and fortified lines — the Rhine, the Danube, Hadrian's Wall in Britain — marking where the policy of expansion gave way, under Hadrian, to one of consolidation. Within them, a common law, a network of roads, and (increasingly) a common citizenship bound a vast diversity of peoples into a single order.",
    ],
    keyLocations: [
      { name: "Rome", note: "The capital and heart of the empire." },
      { name: "Hadrian's Wall", note: "The fortified frontier across northern Britain." },
      { name: "The Rhine–Danube frontier", note: "The great river frontier in Europe." },
      { name: "Alexandria", note: "The second city of the empire and Egypt's capital." },
      { name: "Constantinople", note: "Founded 330 CE; later capital of the eastern empire." },
    ],
    related: [
      { href: "/civilizations/high-empire", label: "The High Empire" },
      { href: "/timelines/roman-empire", label: "Timeline: Roman Empire" },
      { href: "/comparisons/achaemenid-vs-roman-empire", label: "Achaemenid vs Roman Empire" },
      { href: "/philosophers/trajan", label: "Trajan" },
    ],
    updated: "2026-06-16",
  },
  {
    slug: "egypt",
    title: "Egypt Map",
    eyebrow: "Map",
    description:
      "A reference map of ancient Egypt — the narrow ribbon of the Nile valley and Delta, with the empire of the New Kingdom reaching into Nubia and the Levant.",
    imageSlug: "map-egypt",
    body: [
      "Ancient Egypt was the gift of the Nile — a narrow ribbon of fertile land along the river, walled by desert, running from the Delta in the north to the cataracts in the south. This geography gave Egypt both its wealth (the reliable annual flood) and its security (the surrounding deserts), the foundations of its extraordinary endurance.",
      "At the height of the New Kingdom, shown here, Egypt was also an empire, its power reaching south into Nubia and north into the Levant as far as the Euphrates, where it met the Hittites at Kadesh. The great religious and royal centres clustered along the river — Memphis in the north, Thebes and the temples of Karnak and Luxor in the south.",
    ],
    keyLocations: [
      { name: "Memphis", note: "The Old Kingdom capital, near the apex of the Delta." },
      { name: "Thebes (Luxor)", note: "The New Kingdom religious capital; Karnak and the Valley of the Kings." },
      { name: "Giza", note: "Site of the Great Pyramid and the Sphinx." },
      { name: "Amarna", note: "Akhenaten's short-lived capital of the Aten." },
      { name: "Nubia", note: "The land to the south, conquered and exploited for gold." },
    ],
    related: [
      { href: "/civilizations/egypt", label: "Egypt — the civilization hub" },
      { href: "/timelines/ancient-egypt", label: "Timeline: Ancient Egypt" },
      { href: "/themes/nile-and-civilization", label: "Theme: The Nile and Civilization" },
      { href: "/essays/why-egypt-lasted", label: "Essay: Why Egypt lasted" },
    ],
    updated: "2026-06-16",
  },
  {
    slug: "mediterranean",
    title: "Mediterranean World Map",
    eyebrow: "Map",
    description:
      "A reference map of the ancient Mediterranean — the sea around which the classical civilizations grew, here showing the spread of Greek and Phoenician colonies.",
    imageSlug: "map-mediterranean",
    body: [
      "The Mediterranean was the highway of the ancient world — the sea around which Egypt, Phoenicia, Greece, Carthage and Rome all grew, and across which goods, peoples and ideas moved. To control its waters and its coasts was to command the wealth and the connections of the classical world.",
      "This map shows the great age of colonization (c. 550 BCE), when the Greeks and the Phoenicians planted settlements along the Mediterranean and Black Sea coasts — the Greeks in Sicily, southern Italy (Magna Graecia), Gaul and the Black Sea; the Phoenicians, from Tyre, founding Carthage and the trading posts of the west. The rivalry of these colonial worlds would shape the wars of the centuries that followed.",
    ],
    keyLocations: [
      { name: "Carthage", note: "The great Phoenician colony in North Africa, later Rome's rival." },
      { name: "Magna Graecia", note: "The Greek cities of Sicily and southern Italy." },
      { name: "Massalia", note: "The Greek colony at modern Marseille." },
      { name: "The Aegean", note: "The Greek heartland of islands and coasts." },
      { name: "Tyre", note: "The Phoenician mother-city of the western colonies." },
    ],
    related: [
      { href: "/civilizations", label: "All civilization hubs" },
      { href: "/timelines/civilization", label: "Timeline: Civilization" },
      { href: "/comparisons/greece-vs-rome", label: "Greece vs Rome" },
      { href: "/maps/roman-empire", label: "Map: The Roman Empire" },
    ],
    updated: "2026-06-16",
  },
];

export function getMap(slug: string): AncientMap | undefined {
  return maps.find((m) => m.slug === slug);
}
