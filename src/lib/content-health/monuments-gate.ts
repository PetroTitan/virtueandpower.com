import type { AnyFrontmatter, ContentEntry } from "@/content/types";
import {
  MONUMENTS,
  MONUMENT_DEFERS_TO,
  MONUMENT_SECTION_HEADINGS,
  type Monument,
} from "@/data/monuments";
import {
  ARCHAEOLOGICAL_SITES,
  SITE_SECTION_HEADINGS,
  type HistoricalDate,
} from "@/data/archaeological-sites";
import { CITIES, CITY_SECTION_HEADINGS } from "@/data/cities";
import { ARCHITECTURE_TOPICS } from "@/data/architecture";
import { MUSEUMS } from "@/data/museums";
import { OBJECT_PROVENANCE } from "@/data/object-provenance";
import { INSTITUTIONS } from "@/data/institutions";
import { CULT_PRACTICES } from "@/data/religion";
import { WARFARE_TOPICS } from "@/data/warfare";
import { BATTLES } from "@/data/battles";
import { maps } from "@/data/maps";
import { archiveImages } from "@/data/archive-images";
import type { Issue } from "./types";

/**
 * Named monuments gate.
 *
 * The monument layer is the one most exposed to two specific failures,
 * and three of these five checks exist for them.
 *
 * The first is **entity collapse**. Athens is a city, the Acropolis is a
 * site, the Parthenon is a monument and the Greek temple is a building
 * type; the moment two of those share a slug, a title or a section
 * heading, the platform has two pages competing for one query. That is
 * checked mechanically rather than trusted.
 *
 * The second is **borrowed precision**. A monument page is a magnet for
 * numbers and names — heights, capacities, architects, patrons — and
 * most of them in general circulation are modern estimates or late
 * attributions repeated as fact. Every measurement must carry what it
 * rests on, and an attribution may not be marked documented unless its
 * basis names something a reader could check.
 *
 * The third, smaller, is **decorative imagery**: an image may be the
 * hero of one entity, not of several.
 */

const loc = (m: Monument) => `src/data/monuments.ts#${m.slug}`;

// ──────────────────────────────────────────────────────────────────────
// 1. Referential integrity
// ──────────────────────────────────────────────────────────────────────

export function checkMonumentRefs(
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
    site: new Set(ARCHAEOLOGICAL_SITES.map((s) => s.slug)),
    city: new Set(CITIES.map((c) => c.slug)),
    architecture: new Set(ARCHITECTURE_TOPICS.map((t) => t.slug)),
    museum: new Set(MUSEUMS.map((x) => x.slug)),
    object: new Set(OBJECT_PROVENANCE.map((o) => o.slug)),
    institution: new Set(INSTITUTIONS.map((i) => i.slug)),
    religion: new Set(CULT_PRACTICES.map((c) => c.slug)),
    warfare: new Set(WARFARE_TOPICS.map((t) => t.slug)),
    battle: new Set(BATTLES.map((b) => b.slug)),
    map: new Set(maps.map((x) => x.slug)),
    image: new Set(archiveImages.map((i) => i.slug)),
    monument: new Set(MONUMENTS.map((m) => m.slug)),
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
  for (const m of MONUMENTS) {
    const at = loc(m);
    if (seen.has(m.slug)) {
      issues.push({
        severity: "error",
        code: "DUPLICATE_SLUG",
        message: `Duplicate monument slug "${m.slug}"`,
        location: at,
      });
    }
    seen.add(m.slug);

    check(at, "civilizations", m.civilizations, "civilization");
    check(at, "figureRefs", m.figureRefs, "philosopher");
    check(at, "themeRefs", m.themeRefs, "theme");
    check(at, "bookRefs", m.bookRefs, "book");
    check(at, "architectureRefs", m.architectureRefs, "architecture");
    check(at, "museumSlugs", m.museumSlugs, "museum");
    check(at, "objectSlugs", m.objectSlugs, "object");
    check(at, "institutionRefs", m.institutionRefs, "institution");
    check(at, "religionRefs", m.religionRefs, "religion");
    check(at, "warfareRefs", m.warfareRefs, "warfare");
    check(at, "battleRefs", m.battleRefs, "battle");
    check(at, "mapSlugs", m.mapSlugs, "map");
    check(at, "relatedMonuments", m.relatedMonuments, "monument");
    if (m.siteSlug) check(at, "siteSlug", [m.siteSlug], "site");
    if (m.citySlug) check(at, "citySlug", [m.citySlug], "city");
    if (m.imageSlug) check(at, "imageSlug", [m.imageSlug], "image");
    check(at, "gallerySlugs", m.gallerySlugs ?? [], "image");

    for (const p of m.attributions) {
      if (p.figureSlug) {
        check(at, `attribution "${p.name}" figureSlug`, [p.figureSlug], "philosopher");
      }
    }
    for (const f of m.fragments) {
      if (f.museumSlug) check(at, `fragment "${f.what}" museumSlug`, [f.museumSlug], "museum");
      if (f.objectSlug) check(at, `fragment "${f.what}" objectSlug`, [f.objectSlug], "object");
      if (!f.museumSlug && !f.heldAt) {
        issues.push({
          severity: "error",
          code: "MISSING_SOURCE_REF",
          message: `Monument "${m.slug}": fragment "${f.what}" says nothing about where it is`,
          location: at,
          hint: "Give a museumSlug where the institution is in the registry, or heldAt where it is not.",
        });
      }
    }

    if (m.relatedMonuments.includes(m.slug)) {
      issues.push({
        severity: "warning",
        code: "BROKEN_REF",
        message: `Monument "${m.slug}" lists itself in relatedMonuments`,
        location: at,
      });
    }
  }

  // Deferrals must point at something that exists.
  for (const d of MONUMENT_DEFERS_TO) {
    const pool =
      d.targetKind === "site"
        ? valid.site
        : d.targetKind === "city"
          ? valid.city
          : valid.architecture;
    if (!pool.has(d.target)) {
      issues.push({
        severity: "error",
        code: "BROKEN_REF",
        message: `MONUMENT_DEFERS_TO: "${d.subject}" defers to "${d.target}", which is not a ${d.targetKind}`,
        location: "src/data/monuments.ts#MONUMENT_DEFERS_TO",
      });
    }
    if (valid.monument.has(d.target)) {
      issues.push({
        severity: "error",
        code: "DUPLICATE_SLUG",
        message: `MONUMENT_DEFERS_TO: "${d.subject}" defers to "${d.target}", which is also a monument`,
        location: "src/data/monuments.ts#MONUMENT_DEFERS_TO",
        hint: "A subject is either deferred or covered here, not both.",
      });
    }
  }

  return issues;
}

// ──────────────────────────────────────────────────────────────────────
// 2. Chronology
// ──────────────────────────────────────────────────────────────────────

function checkDate(m: Monument, label: string, d: HistoricalDate, issues: Issue[]): void {
  const at = loc(m);

  if (!Number.isInteger(d.year)) {
    issues.push({
      severity: "error",
      code: "BROKEN_REF",
      message: `Monument "${m.slug}" ${label}: year ${d.year} is not an integer`,
      location: at,
    });
    return;
  }
  if (d.year === 0) {
    issues.push({
      severity: "error",
      code: "BROKEN_REF",
      message: `Monument "${m.slug}" ${label}: year 0 does not exist`,
      location: at,
    });
  }
  const numbers = d.display.match(/\d{1,4}/g);
  if (!numbers) {
    issues.push({
      severity: "error",
      code: "MISSING_UNCERTAINTY_LABEL",
      message: `Monument "${m.slug}" ${label}: the display "${d.display}" states no year`,
      location: at,
    });
    return;
  }
  if (!numbers.includes(String(Math.abs(d.year)))) {
    issues.push({
      severity: "error",
      code: "MISSING_UNCERTAINTY_LABEL",
      message: `Monument "${m.slug}" ${label}: the display "${d.display}" does not contain the year ${Math.abs(d.year)}`,
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
      message: `Monument "${m.slug}" ${label}: the display says BCE but the year is positive`,
      location: at,
    });
  }
  if (isCe && d.year < 0) {
    issues.push({
      severity: "error",
      code: "BROKEN_REF",
      message: `Monument "${m.slug}" ${label}: the display says CE but the year is negative`,
      location: at,
    });
  }
}

export function checkMonumentChronology(): Issue[] {
  const issues: Issue[] = [];

  for (const m of MONUMENTS) {
    const at = loc(m);
    checkDate(m, "chronology.built", m.chronology.built, issues);

    if (!m.chronology.display.trim()) {
      issues.push({
        severity: "error",
        code: "MISSING_UNCERTAINTY_LABEL",
        message: `Monument "${m.slug}" has no rendered chronology line`,
        location: at,
      });
    }
    // A monument rebuilt is not one date. Anything with a later history
    // must show its phases rather than collapsing them.
    if (m.chronology.phases.length < 2) {
      issues.push({
        severity: "error",
        code: "MISSING_UNCERTAINTY_LABEL",
        message: `Monument "${m.slug}" records fewer than two building or use phases`,
        location: at,
        hint: "Successive phases must not be collapsed into a single fabricated date.",
      });
    }
    for (const p of m.chronology.phases) {
      if (!p.label.trim() || !p.display.trim()) {
        issues.push({
          severity: "error",
          code: "MISSING_UNCERTAINTY_LABEL",
          message: `Monument "${m.slug}": a phase is missing its label or span`,
          location: at,
        });
      }
      if (p.note.trim().length < 40) {
        issues.push({
          severity: "error",
          code: "PUBLISHED_TOO_THIN",
          message: `Monument "${m.slug}": phase "${p.label}" has no substantive note`,
          location: at,
        });
      }
    }
  }

  return issues;
}

// ──────────────────────────────────────────────────────────────────────
// 3. Evidence discipline: measurements and attributions
// ──────────────────────────────────────────────────────────────────────

/**
 * What kind of figure this is. Every measurement must say — a survey, an
 * ancient text, a conversion, an estimate — because the difference
 * between "43.3 m, surveyed" and "50,000 seats, estimated" is the whole
 * point of the field.
 */
const BASIS_KIND =
  /\b(survey|surveyed|measured|measurement|estimate|estimated|calculat|comput|reconstruct|inferred|modern|ancient|count|observation|record|excavation|engineering)/i;

/**
 * Words that make a basis checkable. A claim marked `documented` has to
 * point at a survey, an inscription, an archive or a named text with a
 * locus — not simply assert that the thing is known.
 */
const CHECKABLE =
  /\b(survey|measurement|measured|inscription|inscribed|accounts?|cartouche|papyr|brick ?stamps?|stamps?|brickwork|masonry|fabric|tablet|plaque|archive|excavation|record|coin|coinage|calendar|treaty|decree|titulary|king list|Fasti|Chronographer|Res Gestae|building text)/i;

/**
 * A named source with a locus — "Pausanias 5.10.3", "Suetonius, Titus 7",
 * "Cassius Dio 66.25", "Res Gestae 21". Citing a text at a chapter is as
 * checkable as citing an inscription, and the enumeration of authors this
 * would otherwise require would go stale.
 */
const CITATION = /\b[A-Z][A-Za-z'\u2019-]+(?:\s+(?:of\s+)?[A-Z][A-Za-z'\u2019-]+)*,?\s+\d/;

const isCheckable = (basis: string) =>
  CHECKABLE.test(basis) || CITATION.test(basis);

export function checkMonumentEvidence(): Issue[] {
  const issues: Issue[] = [];

  for (const m of MONUMENTS) {
    const at = loc(m);

    if (!m.measurements.length) {
      issues.push({
        severity: "error",
        code: "PUBLISHED_TOO_THIN",
        message: `Monument "${m.slug}" gives no measurements`,
        location: at,
        hint: "Readers come to a monument page for its size. Give at least one figure, with what it rests on.",
      });
    }
    for (const d of m.measurements) {
      if (d.basis.trim().length < 12 || !BASIS_KIND.test(d.basis)) {
        issues.push({
          severity: "error",
          code: "MISSING_SOURCE_REF",
          message: `Monument "${m.slug}": the figure "${d.value}" for ${d.label} does not say what kind of figure it is`,
          location: at,
          hint: "A dimension without a basis is a borrowed number. Say whether it is a survey, an ancient figure, or a modern estimate.",
        });
      }
      if (d.level === "documented" && !isCheckable(d.basis)) {
        issues.push({
          severity: "warning",
          code: "MISSING_UNCERTAINTY_LABEL",
          message: `Monument "${m.slug}": the figure "${d.value}" is marked documented without naming a survey, text or record`,
          location: at,
        });
      }
    }

    if (!m.attributions.length) {
      issues.push({
        severity: "error",
        code: "MISSING_SOURCE_REF",
        message: `Monument "${m.slug}" names nobody, not even to record that no name survives`,
        location: at,
        hint: 'Where the architect or patron is unknown, say so with level "unknown" and explain why.',
      });
    }
    for (const p of m.attributions) {
      if (p.basis.trim().length < 20) {
        issues.push({
          severity: "error",
          code: "MISSING_SOURCE_REF",
          message: `Monument "${m.slug}": the attribution of ${p.role} to "${p.name}" states no basis`,
          location: at,
        });
      }
      if (p.level === "documented" && !isCheckable(p.basis)) {
        issues.push({
          severity: "error",
          code: "MISSING_UNCERTAINTY_LABEL",
          message: `Monument "${m.slug}": "${p.name}" as ${p.role} is marked documented without a checkable basis`,
          location: at,
          hint: "An attribution is documented when an inscription, an account, a stamp or a named source with a locus supports it — not when it is widely repeated.",
        });
      }
      if (p.level === "unknown" && p.basis.trim().length < 20) {
        issues.push({
          severity: "error",
          code: "MISSING_UNCERTAINTY_LABEL",
          message: `Monument "${m.slug}": an unknown attribution must say why nothing is known`,
          location: at,
        });
      }
    }

    if (!m.primarySources.length && !m.noAncientTestimony) {
      issues.push({
        severity: "error",
        code: "MISSING_SOURCE_REF",
        message: `Monument "${m.slug}" cites no ancient source and does not say why`,
        location: at,
      });
    }
    if (m.primarySources.length && m.noAncientTestimony) {
      issues.push({
        severity: "error",
        code: "BROKEN_REF",
        message: `Monument "${m.slug}" both cites ancient sources and declares that none exist`,
        location: at,
      });
    }

    if (!m.disputes.length) {
      issues.push({
        severity: "error",
        code: "MISSING_UNCERTAINTY_LABEL",
        message: `Monument "${m.slug}" states no unresolved question`,
        location: at,
      });
    }
    for (const d of m.disputes) {
      if (d.positions.trim().length < 120) {
        issues.push({
          severity: "error",
          code: "MISSING_UNCERTAINTY_LABEL",
          message: `Monument "${m.slug}": the question "${d.question}" does not set out the competing positions`,
          location: at,
        });
      }
    }

    if (m.survival.note.trim().length < 40) {
      issues.push({
        severity: "error",
        code: "PUBLISHED_TOO_THIN",
        message: `Monument "${m.slug}" does not say what actually survives`,
        location: at,
      });
    }
    if (
      (m.survival.condition === "reassembled" ||
        m.survival.condition === "relocated") &&
      !m.restoration?.length
    ) {
      issues.push({
        severity: "error",
        code: "MISSING_UNCERTAINTY_LABEL",
        message: `Monument "${m.slug}" is marked ${m.survival.condition} without a restoration account`,
        location: at,
        hint: "A reassembled or moved monument must say what was done to it, or the photograph implies an antiquity the fabric does not have.",
      });
    }
    if (!m.construction.length || !m.originalFunction.length || !m.politicalMeaning.length) {
      issues.push({
        severity: "error",
        code: "PUBLISHED_TOO_THIN",
        message: `Monument "${m.slug}" is missing construction, function or meaning`,
        location: at,
      });
    }
  }

  return issues;
}

// ──────────────────────────────────────────────────────────────────────
// 4. Entity boundaries
// ──────────────────────────────────────────────────────────────────────

export function checkMonumentBoundaries(): Issue[] {
  const issues: Issue[] = [];
  const norm = (s: string) => s.toLowerCase().replace(/[^a-z ]/g, "").trim();

  const citySlugs = new Set(CITIES.map((c) => c.slug));
  const siteSlugs = new Set(ARCHAEOLOGICAL_SITES.map((s) => s.slug));
  const typeSlugs = new Set(ARCHITECTURE_TOPICS.map((t) => t.slug));
  const cityNames = new Set(CITIES.map((c) => norm(c.name)));
  const siteNames = new Set(ARCHAEOLOGICAL_SITES.map((s) => norm(s.name)));
  const otherHeadings = new Set(
    [...CITY_SECTION_HEADINGS, ...SITE_SECTION_HEADINGS].map(norm),
  );

  for (const h of MONUMENT_SECTION_HEADINGS) {
    if (otherHeadings.has(norm(h))) {
      issues.push({
        severity: "error",
        code: "DUPLICATE_SLUG",
        message: `Heading collision: the monument template's "${h}" is also a city or site section heading`,
        location: "src/data/monuments.ts#MONUMENT_SECTION_HEADINGS",
      });
    }
  }

  for (const m of MONUMENTS) {
    const at = loc(m);

    if (citySlugs.has(m.slug) || siteSlugs.has(m.slug) || typeSlugs.has(m.slug)) {
      issues.push({
        severity: "error",
        code: "DUPLICATE_SLUG",
        message: `Monument slug "${m.slug}" is also a city, site or architecture-type slug`,
        location: at,
        hint: "A city, an excavated site, a monument and a building type are four different entities and may not share a slug.",
      });
    }
    if (cityNames.has(norm(m.title)) || siteNames.has(norm(m.title))) {
      issues.push({
        severity: "error",
        code: "DUPLICATE_SLUG",
        message: `Monument "${m.slug}" is titled "${m.title}", which is also the title of a city or site page`,
        location: at,
      });
    }

    // Every monument must be placed, or say why it cannot be.
    const placed = Boolean(m.siteSlug) || Boolean(m.citySlug);
    if (!placed && !m.unplacedNote) {
      issues.push({
        severity: "error",
        code: "BROKEN_REF",
        message: `Monument "${m.slug}" names neither a site nor a city, and does not say why`,
        location: at,
        hint: "A monument with no place cannot be reached through the graph. Set unplacedNote and name the place the platform does not yet cover.",
      });
    }
    if (placed && m.unplacedNote) {
      issues.push({
        severity: "error",
        code: "BROKEN_REF",
        message: `Monument "${m.slug}" has a place and also declares itself unplaced`,
        location: at,
      });
    }

    // A monument on a site inside a city must not name a different city.
    if (m.siteSlug && m.citySlug) {
      const site = ARCHAEOLOGICAL_SITES.find((s) => s.slug === m.siteSlug);
      if (site?.parentCitySlug && site.parentCitySlug !== m.citySlug) {
        issues.push({
          severity: "error",
          code: "BROKEN_REF",
          message: `Monument "${m.slug}" is on site "${m.siteSlug}", which sits in "${site.parentCitySlug}", but names city "${m.citySlug}"`,
          location: at,
        });
      }
    }

    if (!m.architectureRefs.length) {
      issues.push({
        severity: "error",
        code: "BROKEN_REF",
        message: `Monument "${m.slug}" links to no architecture type`,
        location: at,
        hint: "The type page explains the form; the monument page is one building. Every monument belongs to at least one type.",
      });
    }
  }

  return issues;
}

// ──────────────────────────────────────────────────────────────────────
// 5. Imagery
// ──────────────────────────────────────────────────────────────────────

export function checkMonumentImages(): Issue[] {
  const issues: Issue[] = [];

  const heroOwner = new Map<string, string>();
  const claim = (img: string | undefined, who: string, where: string) => {
    if (!img) return;
    const existing = heroOwner.get(img);
    if (existing) {
      issues.push({
        severity: "error",
        code: "DUPLICATE_SLUG",
        message: `${who} uses "${img}" as its hero, which is already the hero of ${existing}`,
        location: where,
        hint: "An image may be the hero of one entity. Reusing one across pages is how a platform ends up illustrating everything with the same ruin.",
      });
      return;
    }
    heroOwner.set(img, who);
  };

  // Cities and sites are claimed first so that a clash between them is
  // reported too, rather than one silently overwriting the other.
  for (const c of CITIES) {
    claim(c.imageSlug, `city "${c.slug}"`, `src/data/cities.ts#${c.slug}`);
  }
  for (const s of ARCHAEOLOGICAL_SITES) {
    claim(
      s.imageSlug,
      `site "${s.slug}"`,
      `src/data/archaeological-sites.ts#${s.slug}`,
    );
  }

  for (const m of MONUMENTS) {
    const at = loc(m);
    if (!m.imageSlug) continue;

    claim(m.imageSlug, `monument "${m.slug}"`, at);

    if ((m.gallerySlugs ?? []).includes(m.imageSlug)) {
      issues.push({
        severity: "warning",
        code: "ORPHANED_ENTRY",
        message: `Monument "${m.slug}" repeats its hero image in its own gallery`,
        location: at,
      });
    }
  }

  return issues;
}

export function runMonumentsGate(
  entries: ContentEntry<AnyFrontmatter>[],
): Array<{ name: string; issues: Issue[] }> {
  return [
    { name: "monuments:refs", issues: checkMonumentRefs(entries) },
    { name: "monuments:chronology", issues: checkMonumentChronology() },
    { name: "monuments:evidence", issues: checkMonumentEvidence() },
    { name: "monuments:boundaries", issues: checkMonumentBoundaries() },
    { name: "monuments:images", issues: checkMonumentImages() },
  ];
}
