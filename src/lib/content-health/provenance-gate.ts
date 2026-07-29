import type { AnyFrontmatter, ContentEntry } from "@/content/types";
import { MUSEUMS } from "@/data/museums";
import { OBJECT_PROVENANCE } from "@/data/object-provenance";
import { busts } from "@/data/busts";
import { archiveImages } from "@/data/archive-images";
import { CITIES } from "@/data/cities";
import type { Issue } from "./types";

/**
 * Object provenance gate.
 *
 * The risk this phase carries is the opposite of the one in Phase 26.
 * There the danger was repeating an ancient number as though it were a
 * count. Here it is a catalogue that *looks* complete: inventory
 * numbers, findspots and excavation dates are the fields easiest to
 * invent and hardest for a reader to check, and a plausible entry closes
 * off a question a blank one leaves open.
 *
 * So the gate enforces honesty about completeness rather than
 * completeness itself:
 *
 *   - a `partial` record must name what it is missing;
 *   - a `full` record must actually carry the fields that justify the
 *     label, and must explain its identification;
 *   - an object marked modern may not carry an excavation;
 *   - every claim of provenance must resolve to a real image, museum,
 *     figure and city.
 *
 * It also reports the backlog: busts that have no provenance record at
 * all are surfaced as warnings, so the gap stays visible instead of
 * quietly persisting.
 */

export function checkProvenanceRefs(
  entries: ContentEntry<AnyFrontmatter>[],
): Issue[] {
  const issues: Issue[] = [];
  const bustSlugs = new Set(busts.map((b) => b.slug));
  const imageSlugs = new Set(archiveImages.map((i) => i.slug));
  const museumSlugs = new Set(MUSEUMS.map((m) => m.slug));
  const citySlugs = new Set(CITIES.map((c) => c.slug));
  const philosophers = new Set(
    entries.filter((e) => e.kind === "philosopher").map((e) => e.slug),
  );

  const seenSlug = new Set<string>();
  const seenRef = new Map<string, string>();

  for (const o of OBJECT_PROVENANCE) {
    const loc = `src/data/object-provenance.ts#${o.slug}`;

    if (seenSlug.has(o.slug)) {
      issues.push({
        severity: "error",
        code: "DUPLICATE_SLUG",
        message: `Duplicate object slug "${o.slug}"`,
        location: loc,
      });
    }
    seenSlug.add(o.slug);

    // The image the record describes must exist.
    const refKey = `${o.objectRef.kind}:${o.objectRef.slug}`;
    const valid =
      o.objectRef.kind === "bust"
        ? bustSlugs.has(o.objectRef.slug)
        : imageSlugs.has(o.objectRef.slug);
    if (!valid) {
      issues.push({
        severity: "error",
        code: "BROKEN_REF",
        message: `Object "${o.slug}" references ${o.objectRef.kind} "${o.objectRef.slug}", which does not exist`,
        location: loc,
      });
    }
    const prior = seenRef.get(refKey);
    if (prior) {
      issues.push({
        severity: "error",
        code: "DUPLICATE_SLUG",
        message: `Objects "${prior}" and "${o.slug}" both claim to describe ${refKey}`,
        location: loc,
      });
    }
    seenRef.set(refKey, o.slug);

    if (o.museumSlug && !museumSlugs.has(o.museumSlug)) {
      issues.push({
        severity: "error",
        code: "BROKEN_REF",
        message: `Object "${o.slug}" names museum "${o.museumSlug}", which is not in the museum registry`,
        location: loc,
        hint: "Add the institution rather than recording a known-wrong holder and annotating it.",
      });
    }
    if (o.figureSlug && !philosophers.has(o.figureSlug)) {
      issues.push({
        severity: "error",
        code: "BROKEN_REF",
        message: `Object "${o.slug}" names figure "${o.figureSlug}", which is not a philosopher entry`,
        location: loc,
      });
    }
    for (const c of o.citySlugs ?? []) {
      if (!citySlugs.has(c)) {
        issues.push({
          severity: "error",
          code: "BROKEN_REF",
          message: `Object "${o.slug}" names city "${c}", which is not a city entry`,
          location: loc,
        });
      }
    }
  }

  for (const m of MUSEUMS) {
    const loc = `src/data/museums.ts#${m.slug}`;
    for (const c of m.citySlugs) {
      if (!citySlugs.has(c)) {
        issues.push({
          severity: "error",
          code: "BROKEN_REF",
          message: `Museum "${m.slug}" names city "${c}", which is not a city entry`,
          location: loc,
        });
      }
    }
    for (const c of m.contested ?? []) {
      if (!c.object.trim() || !c.claimant.trim() || c.note.trim().length < 40) {
        issues.push({
          severity: "error",
          code: "MISSING_UNCERTAINTY_LABEL",
          message: `Museum "${m.slug}" records a contested holding without stating the object, the claimant and the state of the dispute`,
          location: loc,
        });
      }
    }
  }

  return issues;
}

export function checkProvenanceHonesty(): Issue[] {
  const issues: Issue[] = [];

  for (const o of OBJECT_PROVENANCE) {
    const loc = `src/data/object-provenance.ts#${o.slug}`;

    // A partial record must say what is missing. Otherwise the marker is
    // decorative and the reader learns nothing from it.
    if (o.completeness === "partial" && !o.gaps?.length) {
      issues.push({
        severity: "error",
        code: "MISSING_UNCERTAINTY_LABEL",
        message: `Object "${o.slug}" is marked partial but does not name what is missing`,
        location: loc,
        hint: "List the unrecorded fields in `gaps`. An unexplained 'incomplete' badge is not a disclosure.",
      });
    }

    // A full record must earn the label.
    if (o.completeness === "full") {
      const missing: string[] = [];
      if (!o.findspot && o.objectStatus === "ancient") missing.push("findspot");
      if (!o.excavation && o.objectStatus === "ancient")
        missing.push("excavation");
      if (!o.identification.note) missing.push("identification note");
      if (missing.length && !o.gaps?.length) {
        issues.push({
          severity: "error",
          code: "MISSING_UNCERTAINTY_LABEL",
          message: `Object "${o.slug}" is marked full but lacks ${missing.join(", ")} and names no gaps`,
          location: loc,
          hint: "Either downgrade to partial, or record in `gaps` what a full record is nonetheless missing.",
        });
      }
    }

    // Modern objects have no findspot and no excavator.
    if (o.objectStatus === "modern-commemorative") {
      if (o.findspot || o.excavation) {
        issues.push({
          severity: "error",
          code: "MYTH_AS_HISTORY",
          message: `Object "${o.slug}" is marked modern but carries a findspot or excavation record`,
          location: loc,
        });
      }
      if (!/modern|not an ancient|no securely identified ancient/i.test(
        `${o.identification.note ?? ""} ${o.dateMade.note ?? ""}`,
      )) {
        issues.push({
          severity: "error",
          code: "MYTH_AS_HISTORY",
          message: `Object "${o.slug}" is a modern commemorative object but the record does not say so in prose`,
          location: loc,
          hint: "A reader looking at the photograph cannot tell. The record has to say it, not only tag it.",
        });
      }
    }

    // An object must be somewhere.
    if (!o.museumSlug && !o.displayContext) {
      issues.push({
        severity: "error",
        code: "MISSING_SOURCE_REF",
        message: `Object "${o.slug}" records neither a holding institution nor a display context`,
        location: loc,
      });
    }

    // Identification is the field most worth arguing about; require it
    // to be explained wherever it is anything less than documented.
    if (o.identification.level !== "documented" && !o.identification.note) {
      issues.push({
        severity: "error",
        code: "MISSING_UNCERTAINTY_LABEL",
        message: `Object "${o.slug}" has a non-documented identification with no explanation`,
        location: loc,
      });
    }
  }

  return issues;
}

/**
 * The backlog. Busts and provenance-worthy archive images without a
 * record are reported so the gap stays visible rather than settling into
 * the background.
 */
export function checkProvenanceCoverage(): Issue[] {
  const issues: Issue[] = [];
  const covered = new Set(
    OBJECT_PROVENANCE.filter((o) => o.objectRef.kind === "bust").map(
      (o) => o.objectRef.slug,
    ),
  );
  for (const b of busts) {
    if (!covered.has(b.slug)) {
      issues.push({
        severity: "warning",
        code: "ORPHANED_ENTRY",
        message: `Bust "${b.slug}" has no object provenance record`,
        location: "src/data/object-provenance.ts",
        hint: "Every portrait shown beside a figure should be able to say where it came from.",
      });
    }
  }
  const partial = OBJECT_PROVENANCE.filter(
    (o) => o.completeness === "partial",
  ).length;
  if (partial > 0) {
    issues.push({
      severity: "warning",
      code: "ORPHANED_ENTRY",
      message: `${partial} object record(s) are incomplete and awaiting verification against published catalogues`,
      location: "src/data/object-provenance.ts",
      hint: "This is the intended state, not a defect. The count is reported so it does not drift upward unnoticed.",
    });
  }
  return issues;
}

export function runProvenanceGate(
  entries: ContentEntry<AnyFrontmatter>[],
): Array<{ name: string; issues: Issue[] }> {
  return [
    { name: "provenance:refs", issues: checkProvenanceRefs(entries) },
    { name: "provenance:honesty", issues: checkProvenanceHonesty() },
    { name: "provenance:coverage", issues: checkProvenanceCoverage() },
  ];
}
