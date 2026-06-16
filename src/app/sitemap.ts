import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import {
  getBooks,
  getCivilizations,
  getComparisons,
  getEssays,
  getGuides,
  getPhilosophers,
  getQuotes,
  getThemes,
  hrefFor,
} from "@/content/loader";

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
  ] = await Promise.all([
    getPhilosophers(),
    getBooks(),
    getThemes(),
    getQuotes(),
    getComparisons(),
    getEssays(),
    getGuides(),
    getCivilizations(),
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
  ].filter((e) => e.frontmatter.status === "published");

  const contentEntries: MetadataRoute.Sitemap = publishedEntries.map((e) => ({
    url: `${siteConfig.url}${hrefFor(e.kind, e.slug)}`,
    lastModified: new Date(e.frontmatter.updated),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...contentEntries];
}
