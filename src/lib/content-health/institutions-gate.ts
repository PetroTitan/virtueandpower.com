import type { AnyFrontmatter, ContentEntry } from "@/content/types";
import {
  INSTITUTIONS,
  INSTITUTIONS_DEFER_TO_WARFARE,
  INSTITUTION_SECTION_HEADINGS,
} from "@/data/institutions";
import { WARFARE_TOPICS } from "@/data/warfare";
import { ARCHITECTURE_TOPICS } from "@/data/architecture";
import { CITIES } from "@/data/cities";
import { archiveImages } from "@/data/archive-images";
import type { Issue } from "./types";

/**
 * Institutions and government gate.
 *
 * This layer sits closer to an existing one than any before it. The
 * civilization pages already describe political order — "Constitutional
 * structure", "Political structure" — and an institutions page on the
 * consulship is one careless heading away from being a second, thinner
 * version of `/civilizations/roman-republic`. The division adopted is
 * that the civilization layer covers the *order* and the institutions
 * layer covers a single *organ*, and the checks below are what stop that
 * from being merely an intention.
 *
 *   1. Heading disjointness, as for cities. No institution section
 *      heading may appear as an H2 on any civilization page. This runs
 *      against every civilization, not just a named counterpart, because
 *      an institution belongs to several polities at once.
 *
 *   2. No duplication with warfare. Command, recruitment and military
 *      discipline are institutions of the Roman state, and they are
 *      already covered. A shared slug fails; the deferral list must
 *      resolve; and an institution page may not grow a section on a
 *      deferred subject.
 *
 *   3. Evidence discipline. Constitutional history is written mostly by
 *      men reconstructing their own past — Livy on the fifth century,
 *      Plutarch on Lycurgus — and the temptation is to state a tidy
 *      constitution as fact. Every page must carry levelled key points,
 *      cite primary sources, and admit at least one thing that is not
 *      settled.
 *
 *   4. Referential integrity, since registry slugs are plain strings.
 */

// ──────────────────────────────────────────────────────────────────────
// 1. The organ/order division
// ──────────────────────────────────────────────────────────────────────

function h2sOf(body: string): string[] {
  return (body.match(/^##\s+(.+)$/gm) ?? []).map((h) =>
    h.replace(/^##\s+/, "").trim(),
  );
}

const norm = (s: string) => s.toLowerCase().replace(/[^a-z ]/g, "").trim();

export function checkInstitutionCivilizationDivision(
  entries: ContentEntry<AnyFrontmatter>[],
): Issue[] {
  const issues: Issue[] = [];
  const headings = new Set(INSTITUTION_SECTION_HEADINGS.map(norm));

  for (const civ of entries.filter((e) => e.kind === "civilization")) {
    const civLoc = civ.filePath.replace(`${process.cwd()}/`, "");
    for (const h of h2sOf(civ.body)) {
      if (headings.has(norm(h))) {
        issues.push({
          severity: "error",
          code: "DUPLICATE_SLUG",
          message: `Heading collision: civilization "${civ.slug}" uses the H2 "${h}", which is also an institution-page section heading`,
          location: civLoc,
          hint: "The civilization layer covers the political order as a whole; the institutions layer covers one organ of it. Rename one of the headings.",
        });
      }
    }
  }

  // The institution layer must actually point at the polity it belongs
  // to, or the two layers stand apart and compete.
  const civs = new Set(
    entries.filter((e) => e.kind === "civilization").map((e) => e.slug),
  );
  for (const i of INSTITUTIONS) {
    if (!i.civilizations.length) {
      issues.push({
        severity: "error",
        code: "BROKEN_REF",
        message: `Institution "${i.slug}" names no civilization it belonged to`,
        location: `src/data/institutions.ts#${i.slug}`,
        hint: "An office with no polity is a definition, not a page. Name the civilizations so the two layers link.",
      });
    }
    for (const c of i.civilizations) {
      if (!civs.has(c)) {
        issues.push({
          severity: "error",
          code: "BROKEN_REF",
          message: `Institution "${i.slug}" names civilization "${c}", which is not a civilization entry`,
          location: `src/data/institutions.ts#${i.slug}`,
        });
      }
    }
  }

  return issues;
}

// ──────────────────────────────────────────────────────────────────────
// 2. The warfare boundary
// ──────────────────────────────────────────────────────────────────────

export function checkInstitutionsNoDuplication(): Issue[] {
  const issues: Issue[] = [];
  const warfareSlugs = new Set(WARFARE_TOPICS.map((t) => t.slug));
  const architectureSlugs = new Set(ARCHITECTURE_TOPICS.map((t) => t.slug));

  for (const i of INSTITUTIONS) {
    const loc = `src/data/institutions.ts#${i.slug}`;
    if (warfareSlugs.has(i.slug)) {
      issues.push({
        severity: "error",
        code: "DUPLICATE_SLUG",
        message: `Institution "${i.slug}" duplicates a warfare topic of the same slug`,
        location: loc,
        hint: "Link to the warfare page and record the boundary in INSTITUTIONS_DEFER_TO_WARFARE.",
      });
    }
    if (architectureSlugs.has(i.slug)) {
      issues.push({
        severity: "error",
        code: "DUPLICATE_SLUG",
        message: `Institution "${i.slug}" duplicates an architecture topic of the same slug`,
        location: loc,
        hint: "The building where a body met belongs to the architecture layer; the body belongs here.",
      });
    }
  }

  const deferred = INSTITUTIONS_DEFER_TO_WARFARE;
  for (const d of deferred) {
    if (!warfareSlugs.has(d.warfareSlug)) {
      issues.push({
        severity: "error",
        code: "BROKEN_REF",
        message: `Institutions defer "${d.subject}" to warfare topic "${d.warfareSlug}", which does not exist`,
        location: "src/data/institutions.ts",
        hint: "A deferral that points nowhere leaves the subject uncovered by either layer.",
      });
    }
    if (d.reason.trim().length < 40) {
      issues.push({
        severity: "warning",
        code: "MISSING_UNCERTAINTY_LABEL",
        message: `The deferral of "${d.subject}" to warfare states no substantive reason`,
        location: "src/data/institutions.ts",
      });
    }
  }

  // A deferred subject must not reappear as an institution's own
  // heading-level material. Any institution whose title matches a
  // deferred subject has quietly taken the ground back.
  const deferredTitles = deferred.map((d) => norm(d.subject));
  for (const i of INSTITUTIONS) {
    if (deferredTitles.some((t) => t === norm(i.title))) {
      issues.push({
        severity: "error",
        code: "DUPLICATE_SLUG",
        message: `Institution "${i.slug}" covers "${i.title}", which is recorded as deferred to the warfare layer`,
        location: `src/data/institutions.ts#${i.slug}`,
      });
    }
  }

  return issues;
}

// ──────────────────────────────────────────────────────────────────────
// 3. Evidence discipline
// ──────────────────────────────────────────────────────────────────────

export function checkInstitutionsEvidence(): Issue[] {
  const issues: Issue[] = [];

  for (const i of INSTITUTIONS) {
    const loc = `src/data/institutions.ts#${i.slug}`;

    if (i.keyPoints.length < 2) {
      issues.push({
        severity: "error",
        code: "PUBLISHED_TOO_THIN",
        message: `Institution "${i.slug}" has fewer than two evidence-levelled key points`,
        location: loc,
      });
    }
    if (i.primarySources.length < 2) {
      issues.push({
        severity: "error",
        code: "MISSING_SOURCE_REF",
        message: `Institution "${i.slug}" cites fewer than two primary sources`,
        location: loc,
        hint: "A constitutional page resting on one author is that author's reconstruction, not the institution.",
      });
    }
    for (const section of [
      ["whatItWas", i.whatItWas],
      ["howItWorked", i.howItWorked],
      ["powersAndLimits", i.powersAndLimits],
      ["change", i.change],
    ] as const) {
      if (!section[1].length) {
        issues.push({
          severity: "error",
          code: "PUBLISHED_TOO_THIN",
          message: `Institution "${i.slug}" has an empty "${section[0]}" section`,
          location: loc,
        });
      }
    }

    for (const k of i.keyPoints) {
      if (k.detail.trim().length < 40) {
        issues.push({
          severity: "error",
          code: "MISSING_UNCERTAINTY_LABEL",
          message: `Institution "${i.slug}": the claim "${k.claim}" has no substantive supporting detail`,
          location: loc,
        });
      }
      // "Documented" on a constitution is a strong claim. Most of what we
      // know comes through later reconstruction, so require the detail to
      // say what the claim rests on.
      if (
        k.level === "documented" &&
        !/attest|inscri|papyr|surviv|preserv|record|document|contemporar|excavat|tablet|diploma|archive|coin|relief|fasti|sherd|ostrac|finds|deposit|ballot|token|quoted|cited/i.test(
          k.detail,
        )
      ) {
        issues.push({
          severity: "warning",
          code: "MISSING_UNCERTAINTY_LABEL",
          message: `Institution "${i.slug}": the claim "${k.claim}" is marked documented without saying what documents it`,
          location: loc,
          hint: "Constitutional detail is mostly transmitted by later writers. Name the document, object or author, or lower the level. \"The sources\" is not an answer.",
        });
      }
    }

    // No institution page should present a settled constitution.
    const anyUncertainty =
      i.keyPoints.some((k) => k.level !== "documented") ||
      (i.disputes?.length ?? 0) > 0;
    if (!anyUncertainty) {
      issues.push({
        severity: "warning",
        code: "MISSING_UNCERTAINTY_LABEL",
        message: `Institution "${i.slug}" records no disputed or unknown point`,
        location: loc,
        hint: "Ancient constitutions are reconstructions. A page with nothing open on it is probably overstating what is known.",
      });
    }

    for (const d of i.disputes ?? []) {
      if (d.positions.trim().length < 80) {
        issues.push({
          severity: "error",
          code: "MISSING_UNCERTAINTY_LABEL",
          message: `Institution "${i.slug}": the open question "${d.question}" does not state the competing positions`,
          location: loc,
          hint: "Naming a dispute without stating the sides tells the reader only that experts disagree.",
        });
      }
    }

    for (const t of i.terms ?? []) {
      if (!t.gloss.trim()) {
        issues.push({
          severity: "error",
          code: "PUBLISHED_TOO_THIN",
          message: `Institution "${i.slug}": the term "${t.term}" has no gloss`,
          location: loc,
        });
      }
    }
  }

  return issues;
}

// ──────────────────────────────────────────────────────────────────────
// 4. Referential integrity
// ──────────────────────────────────────────────────────────────────────

export function checkInstitutionRefs(
  entries: ContentEntry<AnyFrontmatter>[],
): Issue[] {
  const issues: Issue[] = [];
  const philosophers = new Set(
    entries.filter((e) => e.kind === "philosopher").map((e) => e.slug),
  );
  const themes = new Set(
    entries.filter((e) => e.kind === "theme").map((e) => e.slug),
  );
  const instSlugs = new Set(INSTITUTIONS.map((i) => i.slug));
  const warfareSlugs = new Set(WARFARE_TOPICS.map((t) => t.slug));
  const architectureSlugs = new Set(ARCHITECTURE_TOPICS.map((t) => t.slug));
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
  for (const i of INSTITUTIONS) {
    const loc = `src/data/institutions.ts#${i.slug}`;
    if (seen.has(i.slug)) {
      issues.push({
        severity: "error",
        code: "DUPLICATE_SLUG",
        message: `Duplicate institution slug "${i.slug}"`,
        location: loc,
      });
    }
    seen.add(i.slug);

    check(loc, "figureRefs", i.figureRefs, philosophers, "philosopher");
    check(loc, "themeRefs", i.themeRefs, themes, "theme");
    check(loc, "relatedInstitutions", i.relatedInstitutions, instSlugs, "institution");
    check(loc, "warfareRefs", i.warfareRefs, warfareSlugs, "warfare topic");
    check(loc, "architectureRefs", i.architectureRefs, architectureSlugs, "architecture topic");
    check(loc, "citySlugs", i.citySlugs, citySlugs, "city");
    if (i.imageSlug) check(loc, "imageSlug", [i.imageSlug], images, "archive image");

    if (i.relatedInstitutions.includes(i.slug)) {
      issues.push({
        severity: "warning",
        code: "BROKEN_REF",
        message: `Institution "${i.slug}" lists itself in relatedInstitutions`,
        location: loc,
      });
    }
  }

  return issues;
}

export function runInstitutionsGate(
  entries: ContentEntry<AnyFrontmatter>[],
): Array<{ name: string; issues: Issue[] }> {
  return [
    { name: "institutions:refs", issues: checkInstitutionRefs(entries) },
    { name: "institutions:evidence", issues: checkInstitutionsEvidence() },
    {
      name: "institutions:no-duplication",
      issues: checkInstitutionsNoDuplication(),
    },
    {
      name: "institutions:organ-vs-order",
      issues: checkInstitutionCivilizationDivision(entries),
    },
  ];
}
