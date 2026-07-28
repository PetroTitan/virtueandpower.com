import type { AnyFrontmatter, ContentEntry } from "@/content/types";
import { BATTLES } from "@/data/battles";
import { WARFARE_TOPICS } from "@/data/warfare";
import { archiveImages } from "@/data/archive-images";
import type { Issue } from "./types";

/**
 * Warfare encyclopedia integrity gate.
 *
 * Two jobs.
 *
 * First, referential integrity across the registries. The warfare and
 * battle registries reference the MDX corpus by slug — civilizations,
 * philosophers, themes — and reference each other. Those references are
 * plain strings and TypeScript cannot check them, so a renamed theme or
 * a typo produces a silently missing link in the sidebar rather than a
 * build error. This gate resolves every one of them. It exists because
 * exactly that happened during construction: two themeRefs pointed at an
 * essay slug and at a warfare topic slug rather than at themes.
 *
 * Second, the numbers discipline. The single greatest integrity risk in
 * writing about ancient warfare is repeating ancient troop figures as
 * though they were counts. The schema makes a bare number impossible in
 * the registry; this gate makes sure the accompanying apparatus is
 * actually filled in, and looks for large bare numbers that have leaked
 * into narrative prose where the apparatus does not apply.
 */

// ──────────────────────────────────────────────────────────────────────
// 1. Referential integrity
// ──────────────────────────────────────────────────────────────────────

export function checkWarfareRefs(
  entries: ContentEntry<AnyFrontmatter>[],
): Issue[] {
  const issues: Issue[] = [];
  const civs = new Set(
    entries.filter((e) => e.kind === "civilization").map((e) => e.slug),
  );
  const philosophers = new Set(
    entries.filter((e) => e.kind === "philosopher").map((e) => e.slug),
  );
  const themes = new Set(
    entries.filter((e) => e.kind === "theme").map((e) => e.slug),
  );
  const topics = new Set(WARFARE_TOPICS.map((t) => t.slug));
  const battles = new Set(BATTLES.map((b) => b.slug));
  const images = new Set(archiveImages.map((i) => i.slug));

  const check = (
    location: string,
    field: string,
    values: readonly string[],
    valid: Set<string>,
    kind: string,
  ) => {
    for (const v of values) {
      if (!valid.has(v)) {
        issues.push({
          severity: "error",
          code: "BROKEN_REF",
          message: `${field} "${v}" does not resolve to a ${kind}`,
          location,
          hint: `Registry cross-references are plain strings and are not type-checked. Correct the slug or create the ${kind}.`,
        });
      }
    }
  };

  for (const t of WARFARE_TOPICS) {
    const loc = `src/data/warfare.ts#${t.slug}`;
    check(loc, "civilizations", t.civilizations, civs, "civilization");
    check(loc, "figureRefs", t.figureRefs, philosophers, "philosopher");
    check(loc, "themeRefs", t.themeRefs, themes, "theme");
    check(loc, "relatedTopics", t.relatedTopics, topics, "warfare topic");
    check(loc, "relatedBattles", t.relatedBattles, battles, "battle");
    if (t.imageSlug) {
      check(loc, "imageSlug", [t.imageSlug], images, "archive image");
    }
    // A topic may not reference itself as a related topic.
    if (t.relatedTopics.includes(t.slug)) {
      issues.push({
        severity: "warning",
        code: "BROKEN_REF",
        message: `Warfare topic "${t.slug}" lists itself in relatedTopics`,
        location: loc,
      });
    }
  }

  for (const b of BATTLES) {
    const loc = `src/data/battles.ts#${b.slug}`;
    check(loc, "civilizations", b.civilizations, civs, "civilization");
    check(loc, "figureRefs", b.figureRefs, philosophers, "philosopher");
    check(loc, "topicRefs", b.topicRefs, topics, "warfare topic");
    check(loc, "relatedBattles", b.relatedBattles, battles, "battle");
    if (b.imageSlug) {
      check(loc, "imageSlug", [b.imageSlug], images, "archive image");
    }
    for (const side of b.sides) {
      for (const c of side.commanders) {
        if (c.slug) {
          check(loc, "commander slug", [c.slug], philosophers, "philosopher");
        }
      }
    }
    if (b.relatedBattles.includes(b.slug)) {
      issues.push({
        severity: "warning",
        code: "BROKEN_REF",
        message: `Battle "${b.slug}" lists itself in relatedBattles`,
        location: loc,
      });
    }
  }

  // The static /warfare/battles segment shadows the dynamic topic route,
  // so a topic with that slug would be unreachable.
  if (topics.has("battles")) {
    issues.push({
      severity: "error",
      code: "DUPLICATE_SLUG",
      message: `A warfare topic may not use the slug "battles": the static /warfare/battles route shadows it and the page would be unreachable.`,
      location: "src/data/warfare.ts",
    });
  }

  return issues;
}

// ──────────────────────────────────────────────────────────────────────
// 2. Numbers discipline
// ──────────────────────────────────────────────────────────────────────

/**
 * A large bare number in narrative prose: four or more digits, or a
 * comma-grouped figure, or a spelled-out large quantity. Troop and
 * casualty figures belong in the ForceEstimate apparatus where they
 * carry a source and an assessment; in narrative they appear without
 * either.
 */
const BARE_LARGE_NUMBER =
  /\b(?:\d{1,3}(?:,\d{3})+|\d{4,})\b|\b(?:half a |a )?(?:million|thousand)\b/i;

/** Prose that is allowed to contain figures because it is discussing them. */
const DISCUSSING_FIGURES =
  /\b(?:reject|rejected|estimate|estimated|figure|figures|number|numbers|source|sources|claim|claimed|report|reported|inflat|logistic|modern|scholarship|says|gives|BCE|CE|line|lines|book)\b/i;

export function checkBattleNumbers(): Issue[] {
  const issues: Issue[] = [];

  for (const b of BATTLES) {
    const loc = `src/data/battles.ts#${b.slug}`;

    // Every side must state its forces, and every estimate must carry a
    // source and an assessment.
    for (const side of b.sides) {
      if (!side.forces.length) {
        issues.push({
          severity: "error",
          code: "MISSING_SOURCE_REF",
          message: `Battle "${b.slug}": side "${side.name}" states no forces`,
          location: loc,
        });
      }
      for (const f of [...side.forces, ...(side.casualties ?? [])]) {
        if (!f.source.trim()) {
          issues.push({
            severity: "error",
            code: "MISSING_SOURCE_REF",
            message: `Battle "${b.slug}": the figure "${f.figure}" for ${f.label} carries no source`,
            location: loc,
            hint: "No troop or casualty figure may appear without the source that gives it.",
          });
        }
        if (f.assessment.trim().length < 40) {
          issues.push({
            severity: "error",
            code: "MISSING_UNCERTAINTY_LABEL",
            message: `Battle "${b.slug}": the figure "${f.figure}" for ${f.label} has no substantive assessment`,
            location: loc,
            hint: "State what modern scholarship makes of the figure. A number without an assessment reads as a count.",
          });
        }
        // A figure attributed to an ancient author and marked documented
        // is a strong claim; require it to be a proportion, an itemised
        // list, or otherwise justified in the assessment.
        if (
          f.level === "documented" &&
          !/itemis|itemiz|contingent|proportion|negative|never used again|list|epigraph|inscri|consistent|precise/i.test(
            f.assessment,
          )
        ) {
          issues.push({
            severity: "warning",
            code: "MISSING_UNCERTAINTY_LABEL",
            message: `Battle "${b.slug}": the figure "${f.figure}" is marked documented without explaining why it is unusually reliable`,
            location: loc,
          });
        }
      }
    }

    // Battle pages must rest on more than one source wherever possible.
    if (b.primarySources.length < 2 && b.slug !== "adrianople") {
      issues.push({
        severity: "warning",
        code: "MISSING_SOURCE_REF",
        message: `Battle "${b.slug}" cites only ${b.primarySources.length} primary source(s)`,
        location: loc,
        hint: "Where only one ancient account survives, say so explicitly on the page.",
      });
    }

    // Uncertain dates must explain themselves.
    if (
      (b.dateLevel === "disputed" || b.dateLevel === "unknown") &&
      !b.dateNote
    ) {
      issues.push({
        severity: "error",
        code: "MISSING_UNCERTAINTY_LABEL",
        message: `Battle "${b.slug}" has an uncertain date with no explanatory note`,
        location: loc,
      });
    }

    // Large bare numbers in narrative prose, outside the apparatus.
    const prose = [...b.summary, b.tactics, b.consequence];
    for (const para of prose) {
      const m = para.match(BARE_LARGE_NUMBER);
      if (m && !DISCUSSING_FIGURES.test(para)) {
        issues.push({
          severity: "warning",
          code: "MISSING_UNCERTAINTY_LABEL",
          message: `Battle "${b.slug}": narrative prose contains a large bare figure ("${m[0]}") outside the sourced apparatus`,
          location: loc,
          hint: "Troop and casualty figures belong in a ForceEstimate, where they carry a source and an assessment.",
        });
      }
    }
  }

  return issues;
}

// ──────────────────────────────────────────────────────────────────────
// 3. Topic quality
// ──────────────────────────────────────────────────────────────────────

export function checkWarfareTopics(): Issue[] {
  const issues: Issue[] = [];
  const seen = new Set<string>();

  for (const t of WARFARE_TOPICS) {
    const loc = `src/data/warfare.ts#${t.slug}`;
    if (seen.has(t.slug)) {
      issues.push({
        severity: "error",
        code: "DUPLICATE_SLUG",
        message: `Duplicate warfare topic slug "${t.slug}"`,
        location: loc,
      });
    }
    seen.add(t.slug);

    if (!t.primarySources.length) {
      issues.push({
        severity: "error",
        code: "MISSING_SOURCE_REF",
        message: `Warfare topic "${t.slug}" cites no primary sources`,
        location: loc,
      });
    }
    if (t.keyPoints.length < 2) {
      issues.push({
        severity: "error",
        code: "PUBLISHED_TOO_THIN",
        message: `Warfare topic "${t.slug}" has fewer than two evidence-levelled key points`,
        location: loc,
      });
    }
    for (const k of t.keyPoints) {
      if (k.detail.trim().length < 40) {
        issues.push({
          severity: "warning",
          code: "PUBLISHED_TOO_THIN",
          message: `Warfare topic "${t.slug}": key point "${k.claim.slice(0, 50)}" has no substantive detail`,
          location: loc,
        });
      }
    }
    for (const d of t.disputes ?? []) {
      if (d.positions.trim().length < 60) {
        issues.push({
          severity: "error",
          code: "MISSING_UNCERTAINTY_LABEL",
          message: `Warfare topic "${t.slug}": dispute "${d.question.slice(0, 50)}" does not state the competing positions`,
          location: loc,
          hint: "A dispute must present the competing interpretations, not merely name the question.",
        });
      }
    }
    // Every topic should have at least one claim that is not "documented",
    // because a page on ancient warfare with no uncertainty on it is
    // almost certainly overstating what is known.
    if (t.keyPoints.every((k) => k.level === "documented")) {
      issues.push({
        severity: "warning",
        code: "MISSING_UNCERTAINTY_LABEL",
        message: `Warfare topic "${t.slug}" marks every key point documented`,
        location: loc,
        hint: "Check that nothing inferred has been promoted to documented.",
      });
    }
  }

  return issues;
}

export function runWarfareGate(
  entries: ContentEntry<AnyFrontmatter>[],
): Array<{ name: string; issues: Issue[] }> {
  return [
    { name: "warfare:refs", issues: checkWarfareRefs(entries) },
    { name: "warfare:numbers", issues: checkBattleNumbers() },
    { name: "warfare:topics", issues: checkWarfareTopics() },
  ];
}
