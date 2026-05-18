import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import {
  getBooks,
  getComparisons,
  getPhilosophers,
  getQuotes,
  getThemes,
  hrefFor,
} from "@/content/loader";

const staticPaths = [
  "/",
  "/about",
  "/philosophers",
  "/books",
  "/themes",
  "/quotes",
  "/comparisons",
  "/leadership",
  "/power",
  "/virtue",
  "/statecraft",
  "/war-and-peace",
  "/religion-and-wisdom",
  "/ancient-world",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [philosophers, books, themes, quotes, comparisons] = await Promise.all([
    getPhilosophers(),
    getBooks(),
    getThemes(),
    getQuotes(),
    getComparisons(),
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
  ].filter((e) => e.frontmatter.status === "published");

  const contentEntries: MetadataRoute.Sitemap = publishedEntries.map((e) => ({
    url: `${siteConfig.url}${hrefFor(e.kind, e.slug)}`,
    lastModified: new Date(e.frontmatter.updated),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...contentEntries];
}
