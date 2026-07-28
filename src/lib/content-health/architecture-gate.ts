import type { AnyFrontmatter, ContentEntry } from "@/content/types";
import {
  ARCHITECTURE_DEFERS_TO_WARFARE,
  ARCHITECTURE_TOPICS,
} from "@/data/architecture";
import { WARFARE_TOPICS } from "@/data/warfare";
import { CITIES } from "@/data/cities";
import { archiveImages } from "@/data/archive-images";
import type { Issue } from "./types";

/**
 * Ancient architecture gate.
 *
 * The platform now has four layers that could describe the same wall:
 * warfare (military infrastructure), cities (the settlement), museums
 * (the object) and architecture (the building type). The established
 * principle since the cities layer is that no two pages compete for one
 * query, and this gate enforces it for the newest of them.
 *
 *   1. No duplication with warfare. Roads, walls, fortresses, siege works
 *      and camps belong to the warfare encyclopedia. A slug appearing in
 *      both registries fails the build, and the deferral list must
 *      actually resolve to warfare topics.
 *
 *   2. Building examples carry an evidence level that answers "how do we
 *      know what this looked like". A `documented` example must say
 *      something about survival or excavation to earn the label — the
 *      Pharos and the Parthenon are not known in the same way.
 *
 *   3. Referential integrity, since registry slugs are plain strings.
 */

export function checkArchitectureNoDuplication(): Issue[] {
  const issues: Issue[] = [];
  const warfareSlugs = new Set(WARFARE_TOPICS.map((t) => t.slug));

  for (const t of ARCHITECTURE_TOPICS) {
    if (warfareSlugs.has(t.slug)) {
      issues.push({
        severity: "error",
        code: "DUPLICATE_SLUG",
        message: `Architecture topic "${t.slug}" duplicates a warfare topic of the same slug`,
        location: `src/data/architecture.ts#${t.slug}`,
        hint: "Two pages on one subject compete for the same query. Link to the warfare page instead and record the boundary in ARCHITECTURE_DEFERS_TO_WARFARE.",
      });
    }
  }

  for (const d of ARCHITECTURE_DEFERS_TO_WARFARE) {
    if (!warfareSlugs.has(d.warfareSlug)) {
      issues.push({
        severity: "error",
        code: "BROKEN_REF",
        message: `Architecture defers "${d.subject}" to warfare topic "${d.warfareSlug}", which does not exist`,
        location: "src/data/architecture.ts",
        hint: "A deferral that points nowhere leaves the subject uncovered by either layer.",
      });
    }
    if (d.reason.trim().length < 40) {
      issues.push({
        severity: "warning",
        code: "MISSING_UNCERTAINTY_LABEL",
        message: `The deferral of "${d.subject}" to warfare states no substantive reason`,
        location: "src/data/architecture.ts",
      });
    }
  }

  return issues;
}

export function checkArchitectureEvidence(): Issue[] {
  const issues: Issue[] = [];

  for (const t of ARCHITECTURE_TOPICS) {
    const loc = `src/data/architecture.ts#${t.slug}`;

    if (!t.examples.length) {
      issues.push({
        severity: "error",
        code: "PUBLISHED_TOO_THIN",
        message: `Architecture topic "${t.slug}" names no examples`,
        location: loc,
      });
    }
    if (!t.primarySources.length) {
      issues.push({
        severity: "error",
        code: "MISSING_SOURCE_REF",
        message: `Architecture topic "${t.slug}" cites no primary sources`,
        location: loc,
      });
    }
    if (t.keyPoints.length < 2) {
      issues.push({
        severity: "error",
        code: "PUBLISHED_TOO_THIN",
        message: `Architecture topic "${t.slug}" has fewer than two evidence-levelled key points`,
        location: loc,
      });
    }

    for (const e of t.examples) {
      if (e.note.trim().length < 30) {
        issues.push({
          severity: "warning",
          code: "PUBLISHED_TOO_THIN",
          message: `Architecture topic "${t.slug}": example "${e.name}" has no substantive note`,
          location: loc,
        });
      }
      // "Documented" on a building means we know its form from the fabric.
      // Require the note to say how.
      if (
        e.level === "documented" &&
        !/standing|surviv|excavat|preserv|still|recovered|in situ|found|visible|attested|inscri|converted|rebuilt|reconstruct/i.test(
          e.note,
        )
      ) {
        issues.push({
          severity: "warning",
          code: "MISSING_UNCERTAINTY_LABEL",
          message: `Architecture topic "${t.slug}": example "${e.name}" is marked documented without saying how its form is known`,
          location: loc,
          hint: "On a building, documented means the fabric survives or was excavated. Say which.",
        });
      }
    }

    // A page with no uncertainty on it is almost certainly overstating.
    const allDocumented =
      t.keyPoints.every((k) => k.level === "documented") &&
      t.examples.every((e) => e.level === "documented");
    if (allDocumented) {
      issues.push({
        severity: "warning",
        code: "MISSING_UNCERTAINTY_LABEL",
        message: `Architecture topic "${t.slug}" marks every claim and example documented`,
        location: loc,
        hint: "Check that nothing reconstructed has been promoted to documented.",
      });
    }
  }

  return issues;
}

export function checkArchitectureRefs(
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
  const topics = new Set(ARCHITECTURE_TOPICS.map((t) => t.slug));
  const warfareSlugs = new Set(WARFARE_TOPICS.map((t) => t.slug));
  const citySlugs = new Set(CITIES.map((c) => c.slug));
  const images = new Set(archiveImages.map((i) => i.slug));

  const check = (
    loc: string,
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
          location: loc,
        });
      }
    }
  };

  const seen = new Set<string>();
  for (const t of ARCHITECTURE_TOPICS) {
    const loc = `src/data/architecture.ts#${t.slug}`;
    if (seen.has(t.slug)) {
      issues.push({
        severity: "error",
        code: "DUPLICATE_SLUG",
        message: `Duplicate architecture topic slug "${t.slug}"`,
        location: loc,
      });
    }
    seen.add(t.slug);

    check(loc, "civilizations", t.civilizations, civs, "civilization");
    check(loc, "figureRefs", t.figureRefs, philosophers, "philosopher");
    check(loc, "themeRefs", t.themeRefs, themes, "theme");
    check(loc, "relatedTopics", t.relatedTopics, topics, "architecture topic");
    check(loc, "warfareRefs", t.warfareRefs, warfareSlugs, "warfare topic");
    check(loc, "citySlugs", t.citySlugs, citySlugs, "city");
    if (t.imageSlug) check(loc, "imageSlug", [t.imageSlug], images, "archive image");
    for (const e of t.examples) {
      if (e.citySlug) check(loc, `example "${e.name}" citySlug`, [e.citySlug], citySlugs, "city");
      if (e.imageSlug) check(loc, `example "${e.name}" imageSlug`, [e.imageSlug], images, "archive image");
    }
    if (t.relatedTopics.includes(t.slug)) {
      issues.push({
        severity: "warning",
        code: "BROKEN_REF",
        message: `Architecture topic "${t.slug}" lists itself in relatedTopics`,
        location: loc,
      });
    }
  }

  return issues;
}

export function runArchitectureGate(
  entries: ContentEntry<AnyFrontmatter>[],
): Array<{ name: string; issues: Issue[] }> {
  return [
    { name: "architecture:refs", issues: checkArchitectureRefs(entries) },
    { name: "architecture:evidence", issues: checkArchitectureEvidence() },
    {
      name: "architecture:no-duplication",
      issues: checkArchitectureNoDuplication(),
    },
  ];
}
