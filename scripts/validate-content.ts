#!/usr/bin/env tsx
/**
 * Virtue & Power · content-health validator.
 *
 * Runs every check in src/lib/content-health/checks.ts against the live
 * MDX corpus and the typed source catalog and reports the result.
 *
 * Exit codes:
 *   0  — clean, or warnings only.
 *   1  — at least one error.
 *
 * Flags:
 *   --write   Additionally write reports/content-health.md.
 *   --quiet   Suppress the per-check console output (still prints a summary).
 */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  getBooks,
  getCivilizations,
  getComparisons,
  getEssays,
  getGuides,
  getPhilosophers,
  getQuotes,
  getThemes,
} from "@/content/loader";
import type { AnyFrontmatter, ContentEntry } from "@/content/types";
import { sources } from "@/data/sources";
import { runAllChecks } from "@/lib/content-health/checks";
import {
  aggregate,
  formatConsole,
  formatMarkdown,
} from "@/lib/content-health/report";

async function main(): Promise<number> {
  const args = new Set(process.argv.slice(2));
  const write = args.has("--write");
  const quiet = args.has("--quiet");

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
  const entries: ContentEntry<AnyFrontmatter>[] = [
    ...philosophers,
    ...books,
    ...themes,
    ...quotes,
    ...comparisons,
    ...essays,
    ...guides,
    ...civilizations,
  ];

  const results = runAllChecks(entries);
  const stats = {
    totalEntries: entries.length,
    publishedEntries: entries.filter((e) => e.frontmatter.status === "published")
      .length,
    stubEntries: entries.filter((e) => e.frontmatter.status === "stub").length,
    totalSources: sources.length,
    checks: results.length,
  };

  if (!quiet) {
    process.stdout.write(formatConsole(results, stats));
  }

  const report = aggregate(results, stats);
  const errors = report.issues.filter((i) => i.severity === "error");

  if (write) {
    const reportsDir = path.join(process.cwd(), "reports");
    await mkdir(reportsDir, { recursive: true });
    const md = formatMarkdown(results, stats, report.generatedAt);
    const reportPath = path.join(reportsDir, "content-health.md");
    await writeFile(reportPath, md, "utf8");
    process.stdout.write(
      `\nWrote ${path.relative(process.cwd(), reportPath)}\n`,
    );
  }

  if (quiet) {
    const warnings = report.issues.filter((i) => i.severity === "warning")
      .length;
    process.stdout.write(
      `content-health: ${errors.length} error(s), ${warnings} warning(s)\n`,
    );
  }

  return errors.length > 0 ? 1 : 0;
}

main()
  .then((code) => process.exit(code))
  .catch((err) => {
    console.error("content-health: validator crashed");
    console.error(err);
    process.exit(2);
  });
