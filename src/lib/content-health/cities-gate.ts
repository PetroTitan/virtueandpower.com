import type { AnyFrontmatter, ContentEntry } from "@/content/types";
import { CITIES, CITY_SECTION_HEADINGS } from "@/data/cities";
import { WARFARE_TOPICS } from "@/data/warfare";
import { BATTLES } from "@/data/battles";
import { maps } from "@/data/maps";
import { archiveImages } from "@/data/archive-images";
import type { Issue } from "./types";

/**
 * Ancient cities gate.
 *
 * The cities layer was built on a decision that carries real risk:
 * `/cities/athens` and `/civilizations/athens` both exist, and four such
 * pairs could cannibalise each other if the division between place and
 * polity is allowed to blur. The mitigation was never meant to be good
 * intentions. It is these checks.
 *
 *   1. Heading disjointness. The city template's section headings are
 *      declared in the registry, and none may match an H2 on the paired
 *      civilization page. If someone adds "Political structure" to a
 *      city page, or "Urban plan" to a civilization page, the build
 *      fails.
 *
 *   2. Reciprocal linking. The city template renders its disambiguation
 *      line automatically, so that direction is guaranteed by code. The
 *      civilization side is hand-written MDX, so it is checked: the
 *      counterpart page must link to the city page, and near the top.
 *
 *   3. The numbers discipline, carried over from the battle registry.
 *      Ancient city populations are as unreliable as ancient troop
 *      figures and are quoted with more confidence. No estimate may
 *      exist without a stated basis and a substantive assessment.
 *
 *   4. Referential integrity across registries, since slugs are plain
 *      strings that TypeScript cannot check.
 */

// ──────────────────────────────────────────────────────────────────────
// 1 & 2. The place/polity division
// ──────────────────────────────────────────────────────────────────────

/** How far into the civilization body the reciprocal link must appear. */
const RECIPROCAL_LINK_WINDOW = 1200;

function h2sOf(body: string): string[] {
  return (body.match(/^##\s+(.+)$/gm) ?? []).map((h) =>
    h.replace(/^##\s+/, "").trim(),
  );
}

export function checkCityCivilizationDivision(
  entries: ContentEntry<AnyFrontmatter>[],
): Issue[] {
  const issues: Issue[] = [];
  const norm = (s: string) => s.toLowerCase().replace(/[^a-z ]/g, "").trim();
  const cityHeadings = new Set(CITY_SECTION_HEADINGS.map(norm));

  for (const c of CITIES) {
    if (!c.civilizationCounterpart) continue;
    const loc = `src/data/cities.ts#${c.slug}`;
    const civ = entries.find(
      (e) => e.kind === "civilization" && e.slug === c.civilizationCounterpart,
    );

    if (!civ) {
      issues.push({
        severity: "error",
        code: "BROKEN_REF",
        message: `City "${c.slug}" names civilizationCounterpart "${c.civilizationCounterpart}", which is not a civilization entry`,
        location: loc,
      });
      continue;
    }

    const civLoc = civ.filePath.replace(`${process.cwd()}/`, "");

    // 1. Heading collision in either direction.
    for (const h of h2sOf(civ.body)) {
      if (cityHeadings.has(norm(h))) {
        issues.push({
          severity: "error",
          code: "DUPLICATE_SLUG",
          message: `Heading collision: civilization "${civ.slug}" uses the H2 "${h}", which is also a city-page section heading. The two pages must not cover the same ground.`,
          location: civLoc,
          hint: "The city layer covers the place; the civilization layer covers the polity. Rename one of the headings.",
        });
      }
    }

    // 2. The civilization page must link back to the city page, near the
    //    top. The city side is rendered by the template and cannot fail.
    const linkPattern = new RegExp(`/cities/${c.slug}\\b`);
    if (!linkPattern.test(civ.body)) {
      issues.push({
        severity: "error",
        code: "BROKEN_REF",
        message: `Civilization "${civ.slug}" does not link to its city counterpart /cities/${c.slug}`,
        location: civLoc,
        hint: "Both halves of a place/polity pair must point at each other, or readers and search engines will treat them as competing pages.",
      });
    } else if (!linkPattern.test(civ.body.slice(0, RECIPROCAL_LINK_WINDOW))) {
      issues.push({
        severity: "warning",
        code: "BROKEN_REF",
        message: `Civilization "${civ.slug}" links to /cities/${c.slug} only late in the page`,
        location: civLoc,
        hint: `The disambiguation should appear within roughly the first ${RECIPROCAL_LINK_WINDOW} characters, as it does on the city side.`,
      });
    }
  }

  return issues;
}

// ──────────────────────────────────────────────────────────────────────
// 3. Population figures
// ──────────────────────────────────────────────────────────────────────

export function checkCityPopulations(): Issue[] {
  const issues: Issue[] = [];

  for (const c of CITIES) {
    const loc = `src/data/cities.ts#${c.slug}`;

    if (!c.population.length) {
      issues.push({
        severity: "error",
        code: "MISSING_SOURCE_REF",
        message: `City "${c.slug}" states no population estimate, not even to record that none is recoverable`,
        location: loc,
        hint: 'Where nothing can be said, say so with level "unknown". Silence reads as an oversight.',
      });
    }

    for (const p of c.population) {
      if (!p.basis.trim()) {
        issues.push({
          severity: "error",
          code: "MISSING_SOURCE_REF",
          message: `City "${c.slug}": the figure "${p.figure}" states no basis`,
          location: loc,
        });
      }
      if (p.assessment.trim().length < 40) {
        issues.push({
          severity: "error",
          code: "MISSING_UNCERTAINTY_LABEL",
          message: `City "${c.slug}": the figure "${p.figure}" has no substantive assessment`,
          location: loc,
          hint: "A population figure without an assessment reads as a count. There are no ancient censuses of these cities.",
        });
      }
      // A population marked documented is a very strong claim for an
      // ancient city; require the assessment to explain itself.
      if (
        p.level === "documented" &&
        !/register|administrative|record|inscri|dole|count of what|excavation record/i.test(
          p.assessment,
        )
      ) {
        issues.push({
          severity: "warning",
          code: "MISSING_UNCERTAINTY_LABEL",
          message: `City "${c.slug}": the figure "${p.figure}" is marked documented without explaining what document supports it`,
          location: loc,
        });
      }
    }

    // Every city must say where the finds are.
    if (!c.museums.length) {
      issues.push({
        severity: "error",
        code: "MISSING_SOURCE_REF",
        message: `City "${c.slug}" lists no museum holdings`,
        location: loc,
        hint: "The museums field is the hook Phase 27.5 attaches object provenance to. It should not be empty.",
      });
    }

    if (c.primarySources.length < 2) {
      issues.push({
        severity: "warning",
        code: "MISSING_SOURCE_REF",
        message: `City "${c.slug}" cites fewer than two primary sources`,
        location: loc,
      });
    }
  }

  return issues;
}

// ──────────────────────────────────────────────────────────────────────
// 4. Referential integrity
// ──────────────────────────────────────────────────────────────────────

export function checkCityRefs(
  entries: ContentEntry<AnyFrontmatter>[],
): Issue[] {
  const issues: Issue[] = [];
  const setOf = (kind: string) =>
    new Set(entries.filter((e) => e.kind === kind).map((e) => e.slug));
  const civs = setOf("civilization");
  const philosophers = setOf("philosopher");
  const themes = setOf("theme");
  const books = setOf("book");
  const topics = new Set(WARFARE_TOPICS.map((t) => t.slug));
  const battles = new Set(BATTLES.map((b) => b.slug));
  const mapSlugs = new Set(maps.map((m) => m.slug));
  const images = new Set(archiveImages.map((i) => i.slug));
  const citySlugs = new Set(CITIES.map((c) => c.slug));

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
  for (const c of CITIES) {
    const loc = `src/data/cities.ts#${c.slug}`;
    if (seen.has(c.slug)) {
      issues.push({
        severity: "error",
        code: "DUPLICATE_SLUG",
        message: `Duplicate city slug "${c.slug}"`,
        location: loc,
      });
    }
    seen.add(c.slug);

    check(loc, "civilizations", c.civilizations, civs, "civilization");
    check(loc, "figureRefs", c.figureRefs, philosophers, "philosopher");
    check(loc, "themeRefs", c.themeRefs, themes, "theme");
    check(loc, "bookRefs", c.bookRefs, books, "book");
    check(loc, "warfareRefs", c.warfareRefs, topics, "warfare topic");
    check(loc, "battleRefs", c.battleRefs, battles, "battle");
    check(loc, "mapSlugs", c.mapSlugs, mapSlugs, "map");
    check(loc, "relatedCities", c.relatedCities, citySlugs, "city");
    if (c.imageSlug) check(loc, "imageSlug", [c.imageSlug], images, "archive image");
    for (const m of c.monuments) {
      if (m.imageSlug) {
        check(loc, `monument "${m.name}" imageSlug`, [m.imageSlug], images, "archive image");
      }
    }
    if (c.relatedCities.includes(c.slug)) {
      issues.push({
        severity: "warning",
        code: "BROKEN_REF",
        message: `City "${c.slug}" lists itself in relatedCities`,
        location: loc,
      });
    }
  }

  return issues;
}

export function runCitiesGate(
  entries: ContentEntry<AnyFrontmatter>[],
): Array<{ name: string; issues: Issue[] }> {
  return [
    { name: "cities:refs", issues: checkCityRefs(entries) },
    { name: "cities:populations", issues: checkCityPopulations() },
    {
      name: "cities:place-vs-polity",
      issues: checkCityCivilizationDivision(entries),
    },
  ];
}
