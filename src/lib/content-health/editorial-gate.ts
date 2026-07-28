import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import type { AnyFrontmatter, ContentEntry } from "@/content/types";
import { ADAPTATION_CLAIMS } from "@/data/adaptation-claims";
import { COMPARISON_ROWS } from "@/data/homer-nolan-comparison";
import { NOLAN_ODYSSEY } from "@/data/films";
import type { Issue } from "./types";

/**
 * Editorial safety and quality gate for the Homer / Odyssey cluster.
 *
 * The purpose of this gate is NOT to suppress criticism. Every rule here
 * is designed to make criticism harder to write badly, not harder to
 * write. A page may say that the film contradicts its source, that a
 * production's casting logic is disputable, or that a studio treats
 * European antiquity as generic intellectual property. What it may not
 * do is say any of that without evidence, without specificity, or in the
 * vocabulary of racial grievance.
 *
 * The gate scans two surfaces:
 *   - the MDX corpus, via the loaded content entries;
 *   - the editorial prose that lives in route files, because the film
 *     cluster and the Homer hub are written in TSX rather than MDX and
 *     would otherwise be unchecked.
 *
 * It also validates the typed registries, where the discipline is
 * structural rather than textual: every alleged departure must carry
 * evidence, low-confidence claims must carry hedging, disputed
 * classifications must state the competing reading, and the cast list
 * must not contradict itself.
 */

// ──────────────────────────────────────────────────────────────────────
// Prose surfaces
// ──────────────────────────────────────────────────────────────────────

/** Route directories whose prose is editorial and must be gated. */
const PROSE_ROUTE_DIRS = [
  "src/app/films",
  "src/app/homer",
  "src/app/homer-and-history",
  "src/app/homeric-question",
  "src/app/figures",
];

interface ProseFile {
  location: string;
  text: string;
}

function walkTsx(dir: string, out: string[]): void {
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return;
  }
  for (const name of entries) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) walkTsx(full, out);
    else if (full.endsWith(".tsx")) out.push(full);
  }
}

function collectProseFiles(
  entries: ContentEntry<AnyFrontmatter>[],
): ProseFile[] {
  const files: ProseFile[] = entries.map((e) => ({
    location: e.filePath.replace(`${process.cwd()}/`, ""),
    text: e.body,
  }));
  const tsx: string[] = [];
  for (const dir of PROSE_ROUTE_DIRS) {
    walkTsx(path.join(process.cwd(), dir), tsx);
  }
  for (const full of tsx) {
    try {
      files.push({
        location: full.replace(`${process.cwd()}/`, ""),
        text: readFileSync(full, "utf8"),
      });
    } catch {
      // Unreadable file: the build will fail on it anyway.
    }
  }
  return files;
}

/**
 * Reduce a file to the prose a reader actually sees.
 *
 * For MDX this means stripping inline HTML. For TSX it means extracting
 * the JSX text nodes only: scanning the whole source would read import
 * paths, prop names and string literals as editorial prose, which
 * produced false positives on every page in the cluster.
 */
function proseOf(text: string, location: string): string {
  if (location.endsWith(".tsx")) {
    const nodes = text.match(/>[^<>{}]{12,}</g) ?? [];
    return nodes
      .map((n) => n.slice(1, -1))
      .join(" ")
      .replace(/\s+/g, " ");
  }
  return text
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ");
}

// ──────────────────────────────────────────────────────────────────────
// 1. Inflammatory racial terminology — hard prohibition
// ──────────────────────────────────────────────────────────────────────

/**
 * These are phrases with no legitimate analytic use in this cluster.
 * They are matched as *uses*, and the patterns are deliberately narrow:
 * "replacement" alone is a normal English word and is not matched, while
 * "racial replacement" is.
 */
const PROHIBITED_TERMS: ReadonlyArray<{ regex: RegExp; label: string }> = [
  { regex: /\bblackening\b/i, label: "blackening" },
  { regex: /\bracial replacement\b/i, label: "racial replacement" },
  { regex: /\bgreat replacement\b/i, label: "great replacement" },
  { regex: /\brace[- ]mixing\b/i, label: "race-mixing" },
  { regex: /\brace corruption\b/i, label: "race corruption" },
  { regex: /\bracial (?:invasion|purity|corruption)\b/i, label: "racial invasion/purity/corruption" },
  {
    regex: /\b(?:they|studios|hollywood) are destroying (?:european|western) culture\b/i,
    label: "destroying European culture",
  },
  { regex: /\bwhite genocide\b/i, label: "white genocide" },
  { regex: /\bethnic replacement\b/i, label: "ethnic replacement" },
];

export function checkProhibitedTerminology(files: ProseFile[]): Issue[] {
  const issues: Issue[] = [];
  for (const f of files) {
    const prose = proseOf(f.text, f.location);
    for (const { regex, label } of PROHIBITED_TERMS) {
      const m = prose.match(regex);
      if (m) {
        issues.push({
          severity: "error",
          code: "INFLAMMATORY_TERMINOLOGY",
          message: `Prohibited racial terminology in editorial prose: "${m[0]}" (${label})`,
          location: f.location,
          hint: "This vocabulary is not a stronger form of the cultural argument; it is a substitute for it. State the specific, evidenced claim instead.",
        });
      }
    }
  }
  return issues;
}

// ──────────────────────────────────────────────────────────────────────
// 2. Group-based generalisation and ancestry claims
// ──────────────────────────────────────────────────────────────────────

const GROUP_GENERALISATION: ReadonlyArray<RegExp> = [
  /\b(?:all|every|no)\s+(?:black|white|african|european|asian|mediterranean)\s+(?:actor|actors|performer|performers)\b/i,
  /\b(?:black|white|african|european|asian)\s+(?:actors|performers)\s+(?:always|never|cannot|can't|are all)\b/i,
  /\b(?:cannot|can't|could not|is unable to)\s+play\s+\w+\s+because (?:he|she|they) (?:is|are)\b/i,
];

/**
 * Claims about a named performer's descent. The cluster's rule is that
 * it never asserts anything about anyone's ancestry, so any such
 * construction is flagged for review rather than parsed for correctness.
 */
const ANCESTRY_CLAIM: ReadonlyArray<RegExp> = [
  /\bis (?:of )?(?:african|european|greek|asian|african-american)\s+(?:descent|ancestry|heritage|extraction)\b/i,
  /\b(?:actor|actress|performer)['’]s\s+(?:ancestry|bloodline|racial background)\b/i,
  /\bnot (?:racially|ethnically) (?:greek|european|white|black)\b/i,
];

export function checkGroupClaims(files: ProseFile[]): Issue[] {
  const issues: Issue[] = [];
  for (const f of files) {
    const prose = proseOf(f.text, f.location);
    for (const regex of GROUP_GENERALISATION) {
      const m = prose.match(regex);
      if (m) {
        issues.push({
          severity: "error",
          code: "GROUP_GENERALISATION",
          message: `Group-based generalisation about performers: "${m[0].trim()}"`,
          location: f.location,
          hint: "Assess each casting decision individually on source correspondence, character identity, genealogy, cultural location, production intent and adaptation coherence.",
        });
      }
    }
    for (const regex of ANCESTRY_CLAIM) {
      const m = prose.match(regex);
      if (m) {
        issues.push({
          severity: "error",
          code: "ANCESTRY_CLAIM",
          message: `Claim about a performer's ancestry: "${m[0].trim()}"`,
          location: f.location,
          hint: "This cluster makes no claims about anyone's ancestry. Criticise the adaptation decision, not the performer.",
        });
      }
    }
  }
  return issues;
}

// ──────────────────────────────────────────────────────────────────────
// 3. Modern racial categories projected onto antiquity
// ──────────────────────────────────────────────────────────────────────

const RETROJECTION: ReadonlyArray<RegExp> = [
  /\b(?:the )?(?:ancient )?greeks were (?:white|black|caucasian)\b/i,
  /\bhomer(?:'s|’s)? (?:characters|heroes) were (?:white|black)\b/i,
  /\bodysseus was (?:white|black)\b/i,
];

export function checkRacialRetrojection(files: ProseFile[]): Issue[] {
  const issues: Issue[] = [];
  for (const f of files) {
    const prose = proseOf(f.text, f.location);
    for (const regex of RETROJECTION) {
      const m = prose.match(regex);
      if (m) {
        issues.push({
          severity: "error",
          code: "RACIAL_RETROJECTION",
          message: `Modern racial category projected onto antiquity: "${m[0].trim()}"`,
          location: f.location,
          hint: "Greek identity was organised around language, cult, custom and political form. Modern racial taxonomy does not map onto it in either direction.",
        });
      }
    }
  }
  return issues;
}

// ──────────────────────────────────────────────────────────────────────
// 4. Myth presented as verified history
// ──────────────────────────────────────────────────────────────────────

const MYTH_AS_HISTORY: ReadonlyArray<{ regex: RegExp; note: string }> = [
  {
    regex: /\b(?:proves|confirms|establishes) that the trojan war (?:happened|took place|was real)\b/i,
    note: "The archaeology of Hisarlik does not establish the war of the poems.",
  },
  {
    regex: /\bthe trojan war (?:definitely|certainly) happened\b/i,
    note: "This is disputed, not settled.",
  },
  {
    regex: /\bodysseus (?:was born|died) in\b/i,
    note: "Biographical framing of a literary figure.",
  },
  {
    regex: /\bthe historical odysseus\b/i,
    note: "There is no evidence of any kind bearing on an individual behind the figure.",
  },
  {
    regex: /\bmask of agamemnon (?:proves|shows|confirms)\b/i,
    note: "The mask is centuries earlier than any traditional dating of the war and is a nineteenth-century label.",
  },
];

export function checkMythAsHistory(files: ProseFile[]): Issue[] {
  const issues: Issue[] = [];
  for (const f of files) {
    const prose = proseOf(f.text, f.location);
    for (const { regex, note } of MYTH_AS_HISTORY) {
      const m = prose.match(regex);
      if (m) {
        issues.push({
          severity: "error",
          code: "MYTH_AS_HISTORY",
          message: `Mythology presented as verified history: "${m[0].trim()}" — ${note}`,
          location: f.location,
          hint: "Attach an evidence level and state what the evidence actually supports.",
        });
      }
    }
  }
  return issues;
}

// ──────────────────────────────────────────────────────────────────────
// 5. Unsourced accuracy / falsification language
// ──────────────────────────────────────────────────────────────────────

const EVIDENCE_MARKERS =
  /EvidenceClaim|EvidenceBadge|EvidenceKey|documented|probable|disputed|literary|mythological|unknown|Odyssey \d|Iliad \d|Linear B/i;

const ACCURACY_LANGUAGE: ReadonlyArray<{ regex: RegExp; label: string }> = [
  { regex: /\bhistorically accurate\b/i, label: "historically accurate" },
  { regex: /\bhistorical falsification\b/i, label: "historical falsification" },
  { regex: /\bfalsifies history\b/i, label: "falsifies history" },
];

export function checkUnsourcedAccuracyLanguage(files: ProseFile[]): Issue[] {
  const issues: Issue[] = [];
  for (const f of files) {
    const prose = proseOf(f.text, f.location);
    const hasEvidence = EVIDENCE_MARKERS.test(prose);
    for (const { regex, label } of ACCURACY_LANGUAGE) {
      if (regex.test(prose) && !hasEvidence) {
        issues.push({
          severity: "error",
          code: "UNSOURCED_ACCURACY_CLAIM",
          message: `Uses "${label}" with no evidence marker, citation or evidence level anywhere on the page`,
          location: f.location,
          hint: "Accuracy claims must specify what the subject is accurate or inaccurate TO — a text, or a period — and carry the evidence.",
        });
      }
    }
  }
  return issues;
}

// ──────────────────────────────────────────────────────────────────────
// 6. Film claims sourced from trailers rather than the completed film
// ──────────────────────────────────────────────────────────────────────

const TRAILER_SOURCING: RegExp =
  /\b(?:the |a )?(?:trailer|teaser|promotional still|first-look image|casting announcement)\b[^.]{0,80}\b(?:shows|proves|confirms|reveals|establishes)\b/i;

export function checkTrailerSourcing(files: ProseFile[]): Issue[] {
  const issues: Issue[] = [];
  for (const f of files) {
    if (!f.location.includes("films")) continue;
    const prose = proseOf(f.text, f.location);
    const m = prose.match(TRAILER_SOURCING);
    if (m) {
      issues.push({
        severity: "error",
        code: "TRAILER_SOURCED_CLAIM",
        message: `Film claim appears to rest on pre-release material: "${m[0].trim()}"`,
        location: f.location,
        hint: "The film has been released. Claims about it must come from accounts of the completed film.",
      });
    }
  }
  return issues;
}

// ──────────────────────────────────────────────────────────────────────
// 7. Conflation of Homer with later tradition
// ──────────────────────────────────────────────────────────────────────

/** Material that is emphatically not in the Homeric poems. */
const NON_HOMERIC_MATERIAL =
  /\b(?:Sinon|the judgement of Paris|Iphigenia|the Palladion|Telegonus|the wooden horse is narrated)\b/i;

const HOMERIC_ATTRIBUTION =
  /\b(?:in Homer|Homer (?:tells|describes|narrates|says)|the Odyssey (?:tells|narrates))\b/i;

export function checkHomerConflation(files: ProseFile[]): Issue[] {
  const issues: Issue[] = [];
  for (const f of files) {
    const prose = proseOf(f.text, f.location);
    // Look for a Homeric attribution within the same sentence as
    // material that belongs to the Cycle, to Virgil or to tragedy.
    for (const sentence of prose.split(/(?<=[.!?])\s+/)) {
      if (
        HOMERIC_ATTRIBUTION.test(sentence) &&
        NON_HOMERIC_MATERIAL.test(sentence) &&
        !/\bnot\b|\bnever\b|\bno\b|\bwithout\b|\bbelongs? to\b|\brather than\b/i.test(
          sentence,
        )
      ) {
        issues.push({
          severity: "warning",
          code: "HOMER_CONFLATION",
          message: `Possible attribution of non-Homeric material to Homer: "${sentence.slice(0, 140).trim()}"`,
          location: f.location,
          hint: "Name the source that preserves the tradition — the Epic Cycle, Virgil, or the tragedians — rather than attributing it to Homer.",
        });
        break;
      }
    }
  }
  return issues;
}

// ──────────────────────────────────────────────────────────────────────
// 8. Quotation safety in the cluster
// ──────────────────────────────────────────────────────────────────────

const CLUSTER_MARKER =
  /odyssey|homer|iliad|odysseus|penelope|telemachus|ithaca/i;

/** A citation looks like "Odyssey 9.105", "Od. 11.13-50", "Iliad 10.261". */
const CITATION = /\b(?:Odyssey|Od\.|Iliad|Il\.)\s?\d+\.\d+/;

export function checkQuotationSafety(files: ProseFile[]): Issue[] {
  const issues: Issue[] = [];
  for (const f of files) {
    if (!CLUSTER_MARKER.test(f.location) && !CLUSTER_MARKER.test(f.text))
      continue;
    const prose = proseOf(f.text, f.location);
    // Only typographic quotation marks and markdown blockquotes count as
    // an apparent verbatim quotation. Straight double quotes are used
    // throughout the corpus for scare quotes and for naming things, and
    // treating them as quotations flags almost every page.
    const quotes = [
      ...(prose.match(/“[^”]{80,}”/g) ?? []),
      ...(f.text.match(/^>\s+.{80,}$/gm) ?? []),
    ];
    for (const q of quotes) {
      const idx = prose.indexOf(q);
      const window = prose.slice(Math.max(0, idx - 260), idx + q.length + 260);
      if (!CITATION.test(window) && !/\b(?:told|said|wrote|writing in|according to)\b/i.test(window)) {
        issues.push({
          severity: "warning",
          code: "UNCITED_QUOTATION",
          message: `Long quotation with no nearby citation or attribution: ${q.slice(0, 90)}…`,
          location: f.location,
          hint: "Quotations must carry a book-and-line citation, a named translator and edition, or a named speaker and publication.",
        });
        break;
      }
    }
  }
  return issues;
}

// ──────────────────────────────────────────────────────────────────────
// 9. Registry integrity: the adaptation-claims ledger
// ──────────────────────────────────────────────────────────────────────

export function checkAdaptationClaims(): Issue[] {
  const issues: Issue[] = [];
  const loc = "src/data/adaptation-claims.ts";
  const seen = new Set<string>();

  for (const c of ADAPTATION_CLAIMS) {
    if (seen.has(c.id)) {
      issues.push({
        severity: "error",
        code: "DUPLICATE_SLUG",
        message: `Duplicate adaptation-claim id "${c.id}"`,
        location: `${loc}#${c.id}`,
      });
    }
    seen.add(c.id);

    // Every alleged departure must carry evidence.
    if (!c.homericEvidence.length) {
      issues.push({
        severity: "error",
        code: "MISSING_SOURCE_REF",
        message: `Adaptation claim "${c.id}" has no source evidence`,
        location: `${loc}#${c.id}`,
        hint: "Every accusation in the ledger must carry the passages that establish it.",
      });
    }

    // Where the comparison is to a specific passage, it must be cited.
    const citesLocus = c.homericEvidence.some((e) => Boolean(e.locus));
    if (
      !citesLocus &&
      c.classification !== "disputed" &&
      c.category !== "casting"
    ) {
      issues.push({
        severity: "warning",
        code: "MISSING_SOURCE_REF",
        message: `Adaptation claim "${c.id}" cites no specific passage (book and line)`,
        location: `${loc}#${c.id}`,
      });
    }

    // Disputed classifications must state the competing reading.
    if (c.classification === "disputed" && !c.competingReading) {
      issues.push({
        severity: "error",
        code: "MISSING_UNCERTAINTY_LABEL",
        message: `Adaptation claim "${c.id}" is classified disputed but states no competing reading`,
        location: `${loc}#${c.id}`,
        hint: "A disputed claim must present the competing interpretation.",
      });
    }

    // Low-confidence claims must be hedged in their own note.
    if (
      c.confidence === "low" &&
      !/\b(?:report|reported|appears|may|might|unverified|provisional|not established)\b/i.test(
        `${c.filmClaim} ${c.editorialNote}`,
      )
    ) {
      issues.push({
        severity: "error",
        code: "MISSING_UNCERTAINTY_LABEL",
        message: `Low-confidence adaptation claim "${c.id}" is stated without hedging`,
        location: `${loc}#${c.id}`,
        hint: "Low-confidence claims must not appear as definitive statements.",
      });
    }

    if (!c.editorialNote.trim()) {
      issues.push({
        severity: "error",
        code: "INVALID_FRONTMATTER",
        message: `Adaptation claim "${c.id}" has no editorial note`,
        location: `${loc}#${c.id}`,
      });
    }
  }
  return issues;
}

// ──────────────────────────────────────────────────────────────────────
// 10. Registry integrity: the comparison table and the cast list
// ──────────────────────────────────────────────────────────────────────

export function checkComparisonRows(): Issue[] {
  const issues: Issue[] = [];
  const loc = "src/data/homer-nolan-comparison.ts";
  const seen = new Set<string>();
  for (const r of COMPARISON_ROWS) {
    if (seen.has(r.id)) {
      issues.push({
        severity: "error",
        code: "DUPLICATE_SLUG",
        message: `Duplicate comparison row id "${r.id}"`,
        location: `${loc}#${r.id}`,
      });
    }
    seen.add(r.id);

    // A row that claims a change must say what it is changing from.
    if (r.changeType !== "not-established" && !r.homericSource.trim()) {
      issues.push({
        severity: "error",
        code: "MISSING_SOURCE_REF",
        message: `Comparison row "${r.id}" asserts a change with no Homeric source stated`,
        location: `${loc}#${r.id}`,
      });
    }
    // Rows whose film side is not established must be labelled unknown.
    if (r.changeType === "not-established" && r.evidenceLevel !== "unknown") {
      issues.push({
        severity: "error",
        code: "MISSING_UNCERTAINTY_LABEL",
        message: `Comparison row "${r.id}" is not established but does not carry evidence level "unknown"`,
        location: `${loc}#${r.id}`,
      });
    }
  }
  return issues;
}

export function checkCastConsistency(): Issue[] {
  const issues: Issue[] = [];
  const loc = "src/data/films.ts";
  const all = [
    ...NOLAN_ODYSSEY.principalCast,
    ...NOLAN_ODYSSEY.supportingCast,
  ];
  const byPerformer = new Map<string, string[]>();
  const byRole = new Map<string, string[]>();

  for (const c of all) {
    byPerformer.set(c.performer, [
      ...(byPerformer.get(c.performer) ?? []),
      c.role,
    ]);
    // Split doubled roles so "Helen and Clytemnestra" does not read as a
    // single role string that silently collides with nothing.
    for (const role of c.role.split(/\s+and\s+|,\s*/)) {
      const key = role.trim().toLowerCase();
      if (!key) continue;
      byRole.set(key, [...(byRole.get(key) ?? []), c.performer]);
    }
  }

  for (const [performer, roles] of byPerformer) {
    if (roles.length > 1) {
      issues.push({
        severity: "error",
        code: "CONTRADICTORY_CASTING",
        message: `Performer "${performer}" is listed in ${roles.length} separate cast entries: ${roles.join("; ")}`,
        location: loc,
        hint: "A doubled role belongs in one entry with both roles named, so the doubling is visible rather than looking like conflicting reports.",
      });
    }
  }
  for (const [role, performers] of byRole) {
    const unique = [...new Set(performers)];
    if (unique.length > 1) {
      issues.push({
        severity: "error",
        code: "CONTRADICTORY_CASTING",
        message: `Role "${role}" is attributed to more than one performer: ${unique.join(", ")}`,
        location: loc,
      });
    }
  }

  // Roles the film changes materially must carry an explanatory note, so
  // a reader is never left to infer that a departure is Homeric.
  for (const c of all) {
    if (
      /sinon|eumaeus|mentor/i.test(c.role) &&
      !c.note
    ) {
      issues.push({
        severity: "warning",
        code: "MISSING_SOURCE_REF",
        message: `Cast entry "${c.performer} — ${c.role}" alters or imports a character but carries no note`,
        location: loc,
      });
    }
  }
  return issues;
}

// ──────────────────────────────────────────────────────────────────────
// 11. Uncertainty labelling on the historical guides
// ──────────────────────────────────────────────────────────────────────

/** Guides that make historical claims must label them. */
const HISTORICAL_GUIDES = [
  "odyssey-myth-and-history",
  "odyssey-and-mycenaean-greece",
  "was-odysseus-real",
  "was-ithaca-homers-ithaca",
  "trojan-war-memory-and-myth",
  "weapons-ships-and-palaces-in-the-odyssey",
];

export function checkUncertaintyLabels(
  entries: ContentEntry<AnyFrontmatter>[],
): Issue[] {
  const issues: Issue[] = [];
  for (const e of entries) {
    if (e.kind !== "guide" || !HISTORICAL_GUIDES.includes(e.slug)) continue;
    if (!/EvidenceClaim/.test(e.body)) {
      issues.push({
        severity: "error",
        code: "MISSING_UNCERTAINTY_LABEL",
        message: `Historical guide "${e.slug}" makes historical claims without any evidence labels`,
        location: e.filePath.replace(`${process.cwd()}/`, ""),
        hint: "Use EvidenceClaim so each claim carries its level, and include EvidenceKey so the reader can read the labels.",
      });
    }
    if (!/EvidenceKey/.test(e.body)) {
      issues.push({
        severity: "warning",
        code: "MISSING_UNCERTAINTY_LABEL",
        message: `Historical guide "${e.slug}" uses evidence labels without including the key that explains them`,
        location: e.filePath.replace(`${process.cwd()}/`, ""),
      });
    }
  }

  // Figure pages must state historicity — the schema requires the field,
  // and this asserts that the value is one that acknowledges the figure
  // is not a historical person unless the cult is what is documented.
  for (const e of entries) {
    if (e.kind !== "figure") continue;
    const fm = e.frontmatter as unknown as Record<string, unknown>;
    const historicity = fm.historicity as string | undefined;
    const figureType = fm.figureType as string | undefined;
    if (historicity === "documented" && figureType !== "divine") {
      issues.push({
        severity: "error",
        code: "MYTH_AS_HISTORY",
        message: `Figure "${e.slug}" claims documented historicity but is not a divine figure whose cult is attested`,
        location: e.filePath.replace(`${process.cwd()}/`, ""),
        hint: "Only cult practice is documented for these figures. The characters themselves are literary or unknown.",
      });
    }
  }
  return issues;
}

// ──────────────────────────────────────────────────────────────────────
// Composition
// ──────────────────────────────────────────────────────────────────────

export function runEditorialGate(
  entries: ContentEntry<AnyFrontmatter>[],
): Array<{ name: string; issues: Issue[] }> {
  const files = collectProseFiles(entries);
  return [
    { name: "gate:terminology", issues: checkProhibitedTerminology(files) },
    { name: "gate:group-claims", issues: checkGroupClaims(files) },
    { name: "gate:racial-retrojection", issues: checkRacialRetrojection(files) },
    { name: "gate:myth-as-history", issues: checkMythAsHistory(files) },
    {
      name: "gate:accuracy-language",
      issues: checkUnsourcedAccuracyLanguage(files),
    },
    { name: "gate:trailer-sourcing", issues: checkTrailerSourcing(files) },
    { name: "gate:homer-conflation", issues: checkHomerConflation(files) },
    { name: "gate:quotation-safety", issues: checkQuotationSafety(files) },
    { name: "gate:adaptation-claims", issues: checkAdaptationClaims() },
    { name: "gate:comparison-rows", issues: checkComparisonRows() },
    { name: "gate:cast-consistency", issues: checkCastConsistency() },
    { name: "gate:uncertainty-labels", issues: checkUncertaintyLabels(entries) },
  ];
}
