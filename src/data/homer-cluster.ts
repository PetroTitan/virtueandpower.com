/**
 * The Homer authority cluster.
 *
 * Five prose pages sit above the MDX library and hold the material that
 * is about Homer rather than about any one poem: what is known and
 * unknown of the poet, the works attributed to him, how oral composition
 * and performance worked, what the poems can and cannot tell us about
 * history, and the two centuries of argument known as the Homeric
 * Question.
 *
 * The registry exists so those five pages, the Odyssey pillar, the
 * guides and the homepage band all draw their cross-navigation from one
 * place rather than each repeating the same array of links.
 */

export interface HomerClusterPage {
  path: string;
  label: string;
  /** One line describing what the page holds, used in hub listings. */
  summary: string;
}

export const HOMER_CLUSTER: ReadonlyArray<HomerClusterPage> = [
  {
    path: "/homer",
    label: "Homer",
    summary:
      "The authority hub — what is known, what is inferred and what is simply unknown about the poet the Greeks placed at the head of their literature.",
  },
  {
    path: "/homer/works",
    label: "The works attributed to Homer",
    summary:
      "The two epics, the Homeric Hymns, the poems of the Epic Cycle and the comic Batrachomyomachia — and which of these antiquity actually credited to him.",
  },
  {
    path: "/homer/oral-tradition",
    label: "Oral tradition and the making of the poems",
    summary:
      "Oral-formulaic composition, the noun-epithet system, rhapsodic performance, the artificial dialect, and how a sung tradition became a fixed text.",
  },
  {
    path: "/homer-and-history",
    label: "Homer and history",
    summary:
      "What the epics can and cannot be used as evidence for — Bronze Age memory, Dark Age practice, Archaic institution and poetic convention, layered in a single poem.",
  },
  {
    path: "/homeric-question",
    label: "The Homeric Question",
    summary:
      "Two centuries of argument about authorship, unity and transmission, from Wolf's Prolegomena to Parry's fieldwork and the state of the question now.",
  },
];

/**
 * Standard cross-navigation from any Homer cluster page into the rest of
 * the library. Kept here so the five pages do not each carry their own
 * copy of the same list.
 */
export const HOMER_LIBRARY_LINKS: ReadonlyArray<{
  href: string;
  label: string;
}> = [
  { href: "/books/odyssey", label: "The Odyssey — the poem in full" },
  { href: "/books/iliad", label: "The Iliad" },
  { href: "/philosophers/homer", label: "Homer — figure entry" },
  { href: "/figures", label: "Figures of the tradition" },
  { href: "/guides/odyssey-myth-and-history", label: "Odyssey: myth and history" },
  {
    href: "/guides/odyssey-and-mycenaean-greece",
    label: "The Odyssey and Mycenaean Greece",
  },
  { href: "/comparisons/iliad-and-odyssey", label: "Iliad and Odyssey" },
  {
    href: "/films/christopher-nolan-the-odyssey",
    label: "Christopher Nolan's The Odyssey (2026)",
  },
];

export function otherHomerPages(currentPath: string) {
  return HOMER_CLUSTER.filter((p) => p.path !== currentPath);
}
