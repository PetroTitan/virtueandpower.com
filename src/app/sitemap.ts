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

  const contentEntries: MetadataRoute.Sitemap = [
    ...philosophers,
    ...books,
    ...themes,
    ...quotes,
    ...comparisons,
  ].map((e) => ({
    url: `${siteConfig.url}${hrefFor(e.kind, e.slug)}`,
    lastModified: new Date(e.frontmatter.updated),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...contentEntries];
}
