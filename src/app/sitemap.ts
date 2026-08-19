import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import {
  getBooks,
  getCivilizations,
  getComparisons,
  getEssays,
  getFigures,
  getGuides,
  getPhilosophers,
  getQuotes,
  getThemes,
  hrefFor,
} from "@/content/loader";
import { maps } from "@/data/maps";
import { timelines } from "@/data/timelines";
import { ODYSSEY_BOOKS } from "@/data/odyssey-books";
import { HOMER_CLUSTER } from "@/data/homer-cluster";
import { FILM_PAGES } from "@/data/films";
import { WARFARE_TOPICS } from "@/data/warfare";
import { BATTLES } from "@/data/battles";
import { CITIES } from "@/data/cities";
import { MUSEUMS } from "@/data/museums";
import { OBJECT_PROVENANCE } from "@/data/object-provenance";
import { ARCHITECTURE_TOPICS } from "@/data/architecture";
import { INSTITUTIONS } from "@/data/institutions";
import { CULT_PRACTICES } from "@/data/religion";
import { ARCHAEOLOGICAL_SITES } from "@/data/archaeological-sites";
import { MONUMENTS } from "@/data/monuments";

const staticPaths = [
  "/",
  "/about",
  "/editorial-policy",
  "/sources",
  "/essays",
  "/guides",
  "/philosophers",
  "/books",
  "/themes",
  "/quotes",
  "/comparisons",
  "/civilizations",
  "/leadership",
  "/power",
  "/virtue",
  "/statecraft",
  "/war-and-peace",
  "/religion-and-wisdom",
  "/ancient-world",
  "/roman-republic",
  "/plutarch",
  "/plutarch/parallel-lives",
  "/xenophon",
  "/xenophon/works",
  "/maps",
  "/timelines",
  "/figures",
  "/films",
  // The Homer authority cluster and the Odyssey's twenty-four book
  // divisions are registry-driven rather than MDX entries, so they are
  // advertised from the same registries the routes are generated from.
  ...HOMER_CLUSTER.map((p) => p.path),
  ...ODYSSEY_BOOKS.map((b) => `/books/odyssey/${b.slug}`),
  ...FILM_PAGES.map((p) => p.path),
  "/warfare",
  "/warfare/battles",
  ...WARFARE_TOPICS.map((t) => `/warfare/${t.slug}`),
  ...BATTLES.map((b) => `/warfare/battles/${b.slug}`),
  "/cities",
  ...CITIES.map((c) => `/cities/${c.slug}`),
  "/museums",
  ...MUSEUMS.map((m) => `/museums/${m.slug}`),
  ...OBJECT_PROVENANCE.map((o) => `/objects/${o.slug}`),
  "/architecture",
  ...ARCHITECTURE_TOPICS.map((t) => `/architecture/${t.slug}`),
  "/institutions",
  ...INSTITUTIONS.map((i) => `/institutions/${i.slug}`),
  "/ancient-religion",
  ...CULT_PRACTICES.map((c) => `/ancient-religion/${c.slug}`),
  "/archaeology",
  ...ARCHAEOLOGICAL_SITES.map((s) => `/archaeology/${s.slug}`),
  "/monuments",
  ...MONUMENTS.map((m) => `/monuments/${m.slug}`),
  ...maps.map((m) => `/maps/${m.slug}`),
  ...timelines.map((t) => `/timelines/${t.slug}`),
  "/privacy-policy",
  "/terms",
  "/cookie-policy",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [
    philosophers,
    books,
    themes,
    quotes,
    comparisons,
    essays,
    guides,
    civilizations,
    figures,
  ] = await Promise.all([
    getPhilosophers(),
    getBooks(),
    getThemes(),
    getQuotes(),
    getComparisons(),
    getEssays(),
    getGuides(),
    getCivilizations(),
    getFigures(),
  ]);

  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: `${siteConfig.url}${p}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: p === "/" ? 1 : 0.7,
  }));

  // Only authoritative (status: "published") entries appear in the sitemap.
  // Stub entries are noindex on the page itself and would be reported as a
  // configuration mismatch if listed here.
  const publishedEntries = [
    ...philosophers,
    ...books,
    ...themes,
    ...quotes,
    ...comparisons,
    ...essays,
    ...guides,
    ...civilizations,
    ...figures,
  ].filter((e) => e.frontmatter.status === "published");

  const contentEntries: MetadataRoute.Sitemap = publishedEntries.map((e) => ({
    url: `${siteConfig.url}${hrefFor(e.kind, e.slug)}`,
    lastModified: new Date(e.frontmatter.updated),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...contentEntries];
}
