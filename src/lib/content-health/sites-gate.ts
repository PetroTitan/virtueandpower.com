import type { AnyFrontmatter, ContentEntry } from "@/content/types";
import {
  ARCHAEOLOGICAL_SITES,
  SITE_SECTION_HEADINGS,
  type ArchaeologicalSite,
  type HistoricalDate,
} from "@/data/archaeological-sites";
import { CITIES, CITY_SECTION_HEADINGS } from "@/data/cities";
import { MUSEUMS } from "@/data/museums";
import { OBJECT_PROVENANCE } from "@/data/object-provenance";
import { ARCHITECTURE_TOPICS } from "@/data/architecture";
import { INSTITUTIONS } from "@/data/institutions";
import { CULT_PRACTICES } from "@/data/religion";
import { WARFARE_TOPICS } from "@/data/warfare";
import { BATTLES } from "@/data/battles";
import { maps } from "@/data/maps";
import { archiveImages } from "@/data/archive-images";
import type { Issue } from "./types";

/**
 * Archaeological sites gate.
 *
 * Five checks, each of which exists to stop a specific editorial failure
 * that this layer makes easy:
 *
 *   1. `sites:refs` — the layer's whole purpose is to connect the city,
 *      building, object and museum layers to each other. Every one of
 *      those connections is a bare string that TypeScript cannot check.
 *
 *   2. `sites:geography` — a coordinate pair is a precision claim about a
 *      place whose extent is usually unknown. Pairs must be complete, in
 *      range, no more precise than they are honest, and must name what
 *      they point at.
 *
 *   3. `sites:chronology` — signed years with no year zero, start before
 *      end, and a rendered string that agrees with its own number. The
 *      last is the one that matters: a display string is what the reader
 *      sees, and it is the field most likely to drift from the data.
 *
 *   4. `sites:evidence` — an excavation page with no excavation history,
 *      no open question, and no statement about ancient testimony is not
 *      an evidence page. Silence about sources has to be deliberate and
 *      declared, not accidental.
 *
 *   5. `sites:no-duplication` — the Acropolis sits inside Athens, the
 *      Forum inside Rome. Slugs may not collide with the cities layer and
 *      section headings may not collide with the city template's, or the
 *      two pages compete for one query.
 */

const loc = (s: ArchaeologicalSite) => `src/data/archaeological-sites.ts#${s.slug}`;

// ──────────────────────────────────────────────────────────────────────
// 1. Referential integrity
// ──────────────────────────────────────────────────────────────────────

export function checkSiteRefs(
  entries: ContentEntry<AnyFrontmatter>[],
): Issue[] {
  const issues: Issue[] = [];
  const setOf = (kind: string) =>
    new Set(entries.filter((e) => e.kind === kind).map((e) => e.slug));

  const valid = {
    civilization: setOf("civilization"),
    philosopher: setOf("philosopher"),
    theme: setOf("theme"),
    book: setOf("book"),
    city: new Set(CITIES.map((c) => c.slug)),
    museum: new Set(MUSEUMS.map((m) => m.slug)),
    object: new Set(OBJECT_PROVENANCE.map((o) => o.slug)),
    architecture: new Set(ARCHITECTURE_TOPICS.map((t) => t.slug)),
    institution: new Set(INSTITUTIONS.map((i) => i.slug)),
    religion: new Set(CULT_PRACTICES.map((c) => c.slug)),
    warfare: new Set(WARFARE_TOPICS.map((t) => t.slug)),
    battle: new Set(BATTLES.map((b) => b.slug)),
    map: new Set(maps.map((m) => m.slug)),
    image: new Set(archiveImages.map((i) => i.slug)),
    site: new Set(ARCHAEOLOGICAL_SITES.map((s) => s.slug)),
  };

  const check = (
    where: string,
    field: string,
    values: readonly string[],
    kind: keyof typeof valid,
  ) => {
    for (const v of values) {
      if (!valid[kind].has(v)) {
        issues.push({
          severity: "error",
          code: "BROKEN_REF",
          message: `${field} "${v}" does not resolve to a ${kind}`,
          location: where,
        });
      }
    }
  };

  const seen = new Set<string>();
  for (const s of ARCHAEOLOGICAL_SITES) {
    const at = loc(s);
    if (seen.has(s.slug)) {
      issues.push({
        severity: "error",
        code: "DUPLICATE_SLUG",
        message: `Duplicate site slug "${s.slug}"`,
        location: at,
      });
    }
    seen.add(s.slug);

    check(at, "civilizations", s.civilizations, "civilization");
    check(at, "figureRefs", s.figureRefs, "philosopher");
    check(at, "themeRefs", s.themeRefs, "theme");
    check(at, "bookRefs", s.bookRefs, "book");
    check(at, "cityRefs", s.cityRefs, "city");
    check(at, "museumSlugs", s.museumSlugs, "museum");
    check(at, "objectSlugs", s.objectSlugs, "object");
    check(at, "architectureRefs", s.architectureRefs, "architecture");
    check(at, "institutionRefs", s.institutionRefs, "institution");
    check(at, "religionRefs", s.religionRefs, "religion");
    check(at, "warfareRefs", s.warfareRefs, "warfare");
    check(at, "battleRefs", s.battleRefs, "battle");
    check(at, "mapSlugs", s.mapSlugs, "map");
    check(at, "relatedSites", s.relatedSites, "site");
    if (s.parentCitySlug) check(at, "parentCitySlug", [s.parentCitySlug], "city");
    if (s.imageSlug) check(at, "imageSlug", [s.imageSlug], "image");
    check(at, "gallerySlugs", s.gallerySlugs ?? [], "image");

    for (const st of s.structures) {
      if (st.architectureSlug) {
        check(at, `structure "${st.name}" architectureSlug`, [st.architectureSlug], "architecture");
      }
      if (st.imageSlug) {
        check(at, `structure "${st.name}" imageSlug`, [st.imageSlug], "image");
      }
    }
    for (const f of s.finds) {
      if (f.museumSlug) check(at, `find "${f.name}" museumSlug`, [f.museumSlug], "museum");
      if (f.objectSlug) check(at, `find "${f.name}" objectSlug`, [f.objectSlug], "object");
      if (!f.museumSlug && !f.heldAt) {
        issues.push({
          severity: "error",
          code: "MISSING_SOURCE_REF",
          message: `Site "${s.slug}": find "${f.name}" says nothing about where it is now`,
          location: at,
          hint: "Give a museumSlug where the institution is in the registry, or heldAt where it is not. An object with no stated location reads as an object nobody has seen.",
        });
      }
    }

    if (s.relatedSites.includes(s.slug)) {
      issues.push({
        severity: "warning",
        code: "BROKEN_REF",
        message: `Site "${s.slug}" lists itself in relatedSites`,
        location: at,
      });
    }
  }

  return issues;
}

// ──────────────────────────────────────────────────────────────────────
// 2. Geography
// ──────────────────────────────────────────────────────────────────────

/** Decimal places beyond this imply a survey accuracy we do not have. */
const MAX_COORDINATE_PRECISION = 4;

function decimals(n: number): number {
  const s = String(n);
  const dot = s.indexOf(".");
  return dot === -1 ? 0 : s.length - dot - 1;
}

export function checkSiteGeography(): Issue[] {
  const issues: Issue[] = [];

  for (const s of ARCHAEOLOGICAL_SITES) {
    const at = loc(s);
    const g = s.geography;

    if (!g.modernCountry.trim()) {
      issues.push({
        severity: "error",
        code: "MISSING_SOURCE_REF",
        message: `Site "${s.slug}" states no modern country`,
        location: at,
      });
    }
    if (!g.ancientRegion.trim()) {
      issues.push({
        severity: "error",
        code: "MISSING_SOURCE_REF",
        message: `Site "${s.slug}" states no ancient region`,
        location: at,
      });
    }
    if (g.setting.trim().length < 80) {
      issues.push({
        severity: "error",
        code: "PUBLISHED_TOO_THIN",
        message: `Site "${s.slug}" has no substantive setting description`,
        location: at,
        hint: "Why is the site where it is? Terrain, water, routes. A place with no geography is a name.",
      });
    }

    const hasLat = typeof g.latitude === "number";
    const hasLon = typeof g.longitude === "number";

    if (hasLat !== hasLon) {
      issues.push({
        severity: "error",
        code: "MISSING_UNCERTAINTY_LABEL",
        message: `Site "${s.slug}" gives only one of latitude and longitude`,
        location: at,
        hint: "Coordinates are given as a pair or not at all.",
      });
      continue;
    }
    if (!hasLat) continue;

    const lat = g.latitude as number;
    const lon = g.longitude as number;

    if (!Number.isFinite(lat) || lat < -90 || lat > 90) {
      issues.push({
        severity: "error",
        code: "BROKEN_REF",
        message: `Site "${s.slug}" has latitude ${lat}, which is out of range`,
        location: at,
      });
    }
    if (!Number.isFinite(lon) || lon < -180 || lon > 180) {
      issues.push({
        severity: "error",
        code: "BROKEN_REF",
        message: `Site "${s.slug}" has longitude ${lon}, which is out of range`,
        location: at,
      });
    }
    if (lat === 0 && lon === 0) {
      issues.push({
        severity: "error",
        code: "BROKEN_REF",
        message: `Site "${s.slug}" is at 0, 0 — a null island, not a place`,
        location: at,
      });
    }
    if (
      decimals(lat) > MAX_COORDINATE_PRECISION ||
      decimals(lon) > MAX_COORDINATE_PRECISION
    ) {
      issues.push({
        severity: "error",
        code: "MISSING_UNCERTAINTY_LABEL",
        message: `Site "${s.slug}" gives coordinates to more than ${MAX_COORDINATE_PRECISION} decimal places`,
        location: at,
        hint: "These are locators for a named feature, not survey positions. Round them.",
      });
    }
    if (!g.coordinateSubject || g.coordinateSubject.trim().length < 3) {
      issues.push({
        severity: "error",
        code: "MISSING_UNCERTAINTY_LABEL",
        message: `Site "${s.slug}" gives coordinates without naming what they point at`,
        location: at,
        hint: 'Name the feature — "The Lion Gate", "The ziggurat". A site is not a point.',
      });
    }
  }

  return issues;
}

// ──────────────────────────────────────────────────────────────────────
// 3. Chronology
// ──────────────────────────────────────────────────────────────────────

function checkDate(
  s: ArchaeologicalSite,
  label: string,
  d: HistoricalDate,
  issues: Issue[],
): void {
  const at = loc(s);

  if (!Number.isInteger(d.year)) {
    issues.push({
      severity: "error",
      code: "BROKEN_REF",
      message: `Site "${s.slug}" ${label}: year ${d.year} is not an integer`,
      location: at,
    });
    return;
  }
  if (d.year === 0) {
    issues.push({
      severity: "error",
      code: "BROKEN_REF",
      message: `Site "${s.slug}" ${label}: year 0 does not exist — 1 BCE is followed by 1 CE`,
      location: at,
    });
  }
  if (!d.display.trim()) {
    issues.push({
      severity: "error",
      code: "MISSING_UNCERTAINTY_LABEL",
      message: `Site "${s.slug}" ${label} has no display string`,
      location: at,
    });
    return;
  }

  // The display string is what the reader sees. If it carries a number,
  // that number and its era must agree with the stored year.
  const numbers = d.display.match(/\d{1,4}/g);
  if (!numbers) {
    const vague: ReadonlyArray<HistoricalDate["precision"]> = [
      "approximate",
      "century",
      "traditional",
      "disputed",
      "unknown",
    ];
    if (!vague.includes(d.precision)) {
      issues.push({
        severity: "error",
        code: "MISSING_UNCERTAINTY_LABEL",
        message: `Site "${s.slug}" ${label}: the display "${d.display}" states no year but the precision is "${d.precision}"`,
        location: at,
        hint: "A display without a number may only carry an imprecise precision.",
      });
    }
    return;
  }

  const abs = String(Math.abs(d.year));
  if (!numbers.includes(abs)) {
    issues.push({
      severity: "error",
      code: "MISSING_UNCERTAINTY_LABEL",
      message: `Site "${s.slug}" ${label}: the display "${d.display}" does not contain the year ${abs}`,
      location: at,
      hint: "The rendered string and the stored year must not drift apart.",
    });
  }

  const isBce = /\bBCE\b/.test(d.display);
  const isCe = !isBce && /\bCE\b/.test(d.display);
  if (isBce && d.year > 0) {
    issues.push({
      severity: "error",
      code: "BROKEN_REF",
      message: `Site "${s.slug}" ${label}: the display says BCE but the year ${d.year} is positive`,
      location: at,
    });
  }
  if (isCe && d.year < 0) {
    issues.push({
      severity: "error",
      code: "BROKEN_REF",
      message: `Site "${s.slug}" ${label}: the display says CE but the year ${d.year} is negative`,
      location: at,
    });
  }
  if (!isBce && !isCe) {
    issues.push({
      severity: "warning",
      code: "MISSING_UNCERTAINTY_LABEL",
      message: `Site "${s.slug}" ${label}: the display "${d.display}" names no era`,
      location: at,
    });
  }
}

export function checkSiteChronology(): Issue[] {
  const issues: Issue[] = [];

  for (const s of ARCHAEOLOGICAL_SITES) {
    const at = loc(s);
    const c = s.chronology;

    checkDate(s, "chronology.start", c.start, issues);
    if (c.end) checkDate(s, "chronology.end", c.end, issues);

    if (c.end && c.end.year < c.start.year) {
      issues.push({
        severity: "error",
        code: "BROKEN_REF",
        message: `Site "${s.slug}": chronology ends (${c.end.year}) before it starts (${c.start.year})`,
        location: at,
      });
    }
    if (!c.display.trim()) {
      issues.push({
        severity: "error",
        code: "MISSING_UNCERTAINTY_LABEL",
        message: `Site "${s.slug}" has no rendered chronology line`,
        location: at,
      });
    }
    if (!c.phases.length) {
      issues.push({
        severity: "error",
        code: "PUBLISHED_TOO_THIN",
        message: `Site "${s.slug}" states no occupation phases`,
        location: at,
        hint: "A site with one undifferentiated date is a site nobody has looked at twice.",
      });
    }
    for (const p of c.phases) {
      if (!p.display.trim() || !p.label.trim()) {
        issues.push({
          severity: "error",
          code: "MISSING_UNCERTAINTY_LABEL",
          message: `Site "${s.slug}": a phase is missing its label or display span`,
          location: at,
        });
      }
      if (p.note.trim().length < 40) {
        issues.push({
          severity: "error",
          code: "PUBLISHED_TOO_THIN",
          message: `Site "${s.slug}": phase "${p.label}" has no substantive note`,
          location: at,
        });
      }
    }
  }

  return issues;
}

// ──────────────────────────────────────────────────────────────────────
// 4. Evidence discipline
// ──────────────────────────────────────────────────────────────────────

export function checkSiteEvidence(): Issue[] {
  const issues: Issue[] = [];

  for (const s of ARCHAEOLOGICAL_SITES) {
    const at = loc(s);

    if (!s.excavations.length) {
      issues.push({
        severity: "error",
        code: "MISSING_SOURCE_REF",
        message: `Site "${s.slug}" records no excavation history`,
        location: at,
        hint: "This layer exists to say who recovered the evidence and when. Without that it is a gazetteer entry.",
      });
    }
    for (const e of s.excavations) {
      if (!e.by.trim() || !e.period.trim()) {
        issues.push({
          severity: "error",
          code: "MISSING_SOURCE_REF",
          message: `Site "${s.slug}": an excavation entry names no excavator or no period`,
          location: at,
        });
      }
    }

    if (!s.structures.length) {
      issues.push({
        severity: "error",
        code: "PUBLISHED_TOO_THIN",
        message: `Site "${s.slug}" names no structures`,
        location: at,
      });
    }
    if (!s.finds.length) {
      issues.push({
        severity: "error",
        code: "PUBLISHED_TOO_THIN",
        message: `Site "${s.slug}" names no finds`,
        location: at,
      });
    }

    // Ancient testimony must be present or its absence declared.
    if (!s.primarySources.length && !s.noAncientTestimony) {
      issues.push({
        severity: "error",
        code: "MISSING_SOURCE_REF",
        message: `Site "${s.slug}" cites no ancient source and does not say why`,
        location: at,
        hint: "Where antiquity says nothing about a site, set noAncientTestimony and explain. An empty list reads as an oversight.",
      });
    }
    if (s.primarySources.length && s.noAncientTestimony) {
      issues.push({
        severity: "error",
        code: "BROKEN_REF",
        message: `Site "${s.slug}" both cites ancient sources and declares that none exist`,
        location: at,
      });
    }
    for (const src of s.primarySources) {
      if (!src.summary.trim()) {
        issues.push({
          severity: "error",
          code: "MISSING_SOURCE_REF",
          message: `Site "${s.slug}": the source "${src.work}" is listed without saying what it contains`,
          location: at,
        });
      }
    }

    // No page of pure certainty. An excavated site always has an
    // unresolved question, and a page without one is overstating.
    if (!s.disputes.length) {
      issues.push({
        severity: "error",
        code: "MISSING_UNCERTAINTY_LABEL",
        message: `Site "${s.slug}" states no unresolved question`,
        location: at,
        hint: "Every excavated site has one. A page with none is claiming a completeness the evidence does not have.",
      });
    }
    for (const d of s.disputes) {
      if (d.positions.trim().length < 120) {
        issues.push({
          severity: "error",
          code: "MISSING_UNCERTAINTY_LABEL",
          message: `Site "${s.slug}": the question "${d.question}" is raised without setting out the competing positions`,
          location: at,
          hint: "A disputed claim must state what is argued on each side, or it is an insinuation.",
        });
      }
    }

    const allLevels = [
      ...s.chronology.phases.map((p) => p.level),
      ...s.structures.map((x) => x.level),
      ...s.finds.map((x) => x.level),
      ...s.disputes.map((x) => x.level),
      s.chronology.status,
    ];
    if (allLevels.every((l) => l === "documented")) {
      issues.push({
        severity: "warning",
        code: "MISSING_UNCERTAINTY_LABEL",
        message: `Site "${s.slug}" marks every claim documented`,
        location: at,
        hint: "Attribution, dating and identification at an archaeological site are rarely all secure at once.",
      });
    }

    if (s.interpretation.length < 2) {
      issues.push({
        severity: "error",
        code: "PUBLISHED_TOO_THIN",
        message: `Site "${s.slug}" offers no account of how the site has been interpreted`,
        location: at,
      });
    }
    if (s.whatSurvives.length < 2) {
      issues.push({
        severity: "error",
        code: "PUBLISHED_TOO_THIN",
        message: `Site "${s.slug}" does not describe what actually survives`,
        location: at,
      });
    }
  }

  return issues;
}

// ──────────────────────────────────────────────────────────────────────
// 5. The boundary with the cities layer
// ──────────────────────────────────────────────────────────────────────

export function checkSiteNoDuplication(): Issue[] {
  const issues: Issue[] = [];
  const norm = (s: string) => s.toLowerCase().replace(/[^a-z ]/g, "").trim();

  const citySlugs = new Set(CITIES.map((c) => c.slug));
  const cityNames = new Set(CITIES.map((c) => norm(c.name)));
  const cityHeadings = new Set(CITY_SECTION_HEADINGS.map(norm));

  for (const h of SITE_SECTION_HEADINGS) {
    if (cityHeadings.has(norm(h))) {
      issues.push({
        severity: "error",
        code: "DUPLICATE_SLUG",
        message: `Heading collision: the site template's "${h}" is also a city-page section heading`,
        location: "src/data/archaeological-sites.ts#SITE_SECTION_HEADINGS",
        hint: "The city layer covers the settlement; the site layer covers the excavation. Rename one.",
      });
    }
  }

  for (const s of ARCHAEOLOGICAL_SITES) {
    const at = loc(s);

    if (citySlugs.has(s.slug)) {
      issues.push({
        severity: "error",
        code: "DUPLICATE_SLUG",
        message: `Site slug "${s.slug}" is also a city slug — /archaeology/${s.slug} would compete with /cities/${s.slug}`,
        location: at,
        hint: "Where the platform already covers a place as a city, the excavation belongs on that page.",
      });
    }
    if (cityNames.has(norm(s.name))) {
      issues.push({
        severity: "error",
        code: "DUPLICATE_SLUG",
        message: `Site "${s.slug}" is titled "${s.name}", which is also the title of a city page`,
        location: at,
      });
    }
    if (s.parentCitySlug === s.slug) {
      issues.push({
        severity: "error",
        code: "BROKEN_REF",
        message: `Site "${s.slug}" names itself as its parent city`,
        location: at,
      });
    }
    if (s.cityRefs.includes(s.parentCitySlug ?? "")) {
      issues.push({
        severity: "warning",
        code: "BROKEN_REF",
        message: `Site "${s.slug}" lists its parent city "${s.parentCitySlug}" again in cityRefs`,
        location: at,
        hint: "The parent is rendered separately; repeating it duplicates the link.",
      });
    }
  }

  return issues;
}

export function runSitesGate(
  entries: ContentEntry<AnyFrontmatter>[],
): Array<{ name: string; issues: Issue[] }> {
  return [
    { name: "sites:refs", issues: checkSiteRefs(entries) },
    { name: "sites:geography", issues: checkSiteGeography() },
    { name: "sites:chronology", issues: checkSiteChronology() },
    { name: "sites:evidence", issues: checkSiteEvidence() },
    { name: "sites:no-duplication", issues: checkSiteNoDuplication() },
  ];
}
