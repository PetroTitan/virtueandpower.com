import type { AnyFrontmatter, ContentEntry } from "@/content/types";
import {
  CULT_PRACTICES,
  RELIGION_DEFERS_TO,
  RELIGION_SECTION_HEADINGS,
} from "@/data/religion";
import { CITIES, CITY_SECTION_HEADINGS } from "@/data/cities";
import {
  ARCHITECTURE_TOPICS,
} from "@/data/architecture";
import { INSTITUTIONS, INSTITUTION_SECTION_HEADINGS } from "@/data/institutions";
import { WARFARE_TOPICS } from "@/data/warfare";
import { archiveImages } from "@/data/archive-images";
import type { Issue } from "./types";

/**
 * Ancient religion gate.
 *
 * Two jobs, and the second one matters beyond this phase.
 *
 * ── 1. The structural checks ────────────────────────────────────────────
 *
 * The religion layer sits underneath four existing ones — themes,
 * civilizations, cities and architecture — all of which already say
 * something about ancient religion. Thirty-three subjects are recorded as
 * belonging to those layers rather than this one, which is an unusually
 * large deferral list and an honest measure of how much was already
 * published. The checks resolve every deferral against its registry,
 * enforce heading disjointness against every other layer at once, and
 * require each record to state what its evidence cannot show.
 *
 * ── 2. The cult-myth prose patterns ─────────────────────────────────────
 *
 * The platform already has a `gate:myth-as-history` check, and before this
 * phase it consisted of five patterns, every one of them specific to Troy
 * and Odysseus. Nothing anywhere in `src/lib/content-health` matched the
 * words god, cult, oracle, sacrifice, priest, ritual, initiation or
 * divination. "The oracle told him to attack, and he won" would have
 * passed the build on any page on the site.
 *
 * That was defensible while the corpus was a Homer cluster. It is not
 * defensible now. The patterns below are therefore added at the level of
 * the whole corpus rather than to this registry alone: they scan every
 * loaded MDX entry and the religion records together, so a sentence of
 * this shape fails wherever anyone writes it.
 *
 * They are deliberately narrow. Each targets a construction that is wrong
 * regardless of context — narrating a revelation nobody recorded, dating a
 * mythological event, or reporting an oracle as fulfilled prophecy —
 * rather than any sentence that happens to mention a god. A gate that
 * fires on ordinary religious vocabulary would be turned off within a
 * week.
 */

// ──────────────────────────────────────────────────────────────────────
// Prose surface
// ──────────────────────────────────────────────────────────────────────

interface Scanned {
  location: string;
  prose: string;
}

/** The registry's own prose, flattened so the same patterns apply to it. */
function religionProse(): Scanned[] {
  return CULT_PRACTICES.map((c) => ({
    location: `src/data/religion.ts#${c.slug}`,
    prose: [
      c.standfirst,
      ...c.whatIsAttested,
      ...c.howItWorked,
      ...c.silences,
      ...c.evidenceBase.flatMap((e) => [e.note, e.limits]),
      ...(c.aitia ?? []).flatMap((a) => [a.whatItExplains, a.note]),
      ...c.keyPoints.flatMap((k) => [k.claim, k.detail]),
      ...(c.disputes ?? []).flatMap((d) => [d.question, d.positions]),
    ].join("\n"),
  }));
}

function mdxProse(entries: ContentEntry<AnyFrontmatter>[]): Scanned[] {
  return entries.map((e) => ({
    location: e.filePath.replace(`${process.cwd()}/`, ""),
    prose: e.body.replace(/<[^>]+>/g, " "),
  }));
}

// ──────────────────────────────────────────────────────────────────────
// Cult-myth patterns
// ──────────────────────────────────────────────────────────────────────

const CULT_MYTH: ReadonlyArray<{
  regex: RegExp;
  note: string;
  severity: "error" | "warning";
  /**
   * Whether naming the source rescues the sentence.
   *
   * For most of these it should. "Livy tells the story that Numa received
   * his laws from Egeria" is exactly the sentence we want people to write,
   * and a gate that blocked it would be teaching the wrong lesson. Two
   * patterns are unconditional, because no attribution repairs them: a
   * claim to know what the mystery ban successfully concealed, and a claim
   * that cult evidence bears on whether a god acted.
   */
  allowAttributed: boolean;
}> = [
  // Describing a revelation the ban successfully protected.
  {
    regex:
      /\b(?:the mysteries revealed|what was revealed (?:at|in) (?:eleusis|the mysteries)|initiates (?:saw|were shown|learned) that)\b/i,
    note: "Nobody recorded what was shown or said inside a mystery initiation. Say who alleges it and how long after.",
    severity: "error",
    allowAttributed: true,
  },
  {
    regex: /\b(?:we|scholars) know what (?:happened|was said|was shown) inside\b/i,
    note: "The initiation ban worked. That silence is the finding, and no source repairs it.",
    severity: "error",
    allowAttributed: false,
  },
  // Mythological events given dates or biographies as fact.
  {
    regex: /\bromulus (?:founded|established) rome in\b/i,
    note: "The foundation is mythological. A date attached to it states a tradition as an event.",
    severity: "error",
    allowAttributed: true,
  },
  {
    regex:
      /\b(?:numa|lycurgus) (?:received|was given|got) (?:the |his )?laws? (?:from|by) (?:egeria|apollo|the (?:delphic )?oracle)\b/i,
    note: "Divine sanction of a lawgiver is a legitimacy claim the tradition makes, not a recorded transaction.",
    severity: "error",
    allowAttributed: true,
  },
  {
    regex: /\b(?:zarathustra|zoroaster) (?:lived|was born|died) in (?:the )?\d/i,
    note: "Scholarly estimates for Zarathustra span roughly a millennium. A single date states one position as settled.",
    severity: "error",
    allowAttributed: true,
  },
  // The god as an actor in the documentary record.
  {
    regex:
      /\b(?:proves|confirms|establishes|shows) that the (?:god|goddess|gods)\b[^.]{0,40}\b(?:existed|answered|intervened|was present)\b/i,
    note: "Cult evidence documents what people did and claimed. It bears on practice, never on the god.",
    severity: "error",
    allowAttributed: false,
  },
  // Oracle reported as fulfilled prophecy.
  {
    regex:
      /\bthe (?:oracle|pythia|god|priestess) (?:predicted|foretold|prophesied|warned)\b[^.]{0,120}?\band (?:it|this|that|he|she|they|so it) (?:did|happened|came true|proved|was)\b/i,
    note: "Oracle responses survive in narratives written after the outcome, in a form the outcome shaped. Name the source and when it wrote.",
    severity: "warning",
    allowAttributed: true,
  },
  // An aition presented as an origin.
  {
    regex:
      /\bthe (?:rite|ritual|ceremony|festival|practice|custom) (?:originated|began|started|arose) (?:when|because|after) \w/i,
    note: "Ancient explanations of why a rite exists are stories the tradition told about it, not its recoverable origin.",
    severity: "warning",
    allowAttributed: true,
  },
  // Generalising one documented site into a whole culture.
  {
    regex:
      /\bevery (?:greek|roman|egyptian|athenian) (?:household|family|city|citizen|home)\b[^.]{0,60}\b(?:did|performed|observed|kept|sacrificed|prayed)\b/i,
    note: "One well-excavated site is a sample. State the sample rather than the system.",
    severity: "warning",
    allowAttributed: true,
  },
];

/**
 * Vocabulary that shows a sentence is already naming its source, its
 * distance or the state of the argument. Where a pattern permits it, this
 * defuses the finding — the sentence is doing the thing the gate exists to
 * require.
 */
const ATTRIBUTION =
  /\b(?:reports?|reported|according to|writing|wrote|tells|told|attributed|tradition|aition|the story|claims?|alleged|allege|says|said|later sources?|centuries? (?:later|after))\b|\b(?:some|most|many) (?:scholars|specialists|historians)\b|\bestimates? (?:range|vary)\b|\bis (?:disputed|contested|not settled)\b/i;

export function checkCultMythDiscipline(
  entries: ContentEntry<AnyFrontmatter>[],
): Issue[] {
  const issues: Issue[] = [];
  const files = [...mdxProse(entries), ...religionProse()];

  for (const f of files) {
    for (const { regex, note, severity, allowAttributed } of CULT_MYTH) {
      const m = f.prose.match(regex);
      if (!m) continue;
      if (allowAttributed) {
        const at = f.prose.indexOf(m[0]);
        const around = f.prose.slice(
          Math.max(0, at - 200),
          at + m[0].length + 200,
        );
        if (ATTRIBUTION.test(around)) continue;
      }
      issues.push({
        severity,
        code: "MYTH_AS_HISTORY",
        message: `Cult tradition presented as record: "${m[0].trim().slice(0, 90)}" — ${note}`,
        location: f.location,
        hint: "Say who reports it and how long after. A story about a rite is evidence for the tradition, not for the rite.",
      });
    }
  }

  return issues;
}

// ──────────────────────────────────────────────────────────────────────
// Evidence discipline
// ──────────────────────────────────────────────────────────────────────

export function checkReligionEvidence(): Issue[] {
  const issues: Issue[] = [];

  for (const c of CULT_PRACTICES) {
    const loc = `src/data/religion.ts#${c.slug}`;

    if (c.evidenceBase.length < 2) {
      issues.push({
        severity: "error",
        code: "MISSING_SOURCE_REF",
        message: `Practice "${c.slug}" rests on fewer than two classes of evidence`,
        location: loc,
        hint: "A cult practice known from one kind of source is a page about that source.",
      });
    }
    for (const e of c.evidenceBase) {
      if (e.limits.trim().length < 40) {
        issues.push({
          severity: "error",
          code: "MISSING_UNCERTAINTY_LABEL",
          message: `Practice "${c.slug}": the ${e.kind} evidence does not state what it cannot show`,
          location: loc,
          hint: "An inventory inscription is superb evidence for what stood in a treasury and no evidence at all for what anyone believed.",
        });
      }
    }

    // The silences field is the point of this layer.
    if (c.silences.length < 2) {
      issues.push({
        severity: "error",
        code: "MISSING_UNCERTAINTY_LABEL",
        message: `Practice "${c.slug}" records fewer than two things the sources do not preserve`,
        location: loc,
        hint: "A page that never says what it cannot say has implicitly claimed to say everything.",
      });
    }
    for (const s of c.silences) {
      if (s.trim().length < 50) {
        issues.push({
          severity: "warning",
          code: "MISSING_UNCERTAINTY_LABEL",
          message: `Practice "${c.slug}": a recorded silence is too short to tell the reader anything`,
          location: loc,
        });
      }
    }

    if (c.primarySources.length < 2) {
      issues.push({
        severity: "error",
        code: "MISSING_SOURCE_REF",
        message: `Practice "${c.slug}" cites fewer than two primary sources`,
        location: loc,
      });
    }
    if (c.keyPoints.length < 2) {
      issues.push({
        severity: "error",
        code: "PUBLISHED_TOO_THIN",
        message: `Practice "${c.slug}" has fewer than two evidence-levelled key points`,
        location: loc,
      });
    }
    if (!c.whatIsAttested.length || !c.howItWorked.length) {
      issues.push({
        severity: "error",
        code: "PUBLISHED_TOO_THIN",
        message: `Practice "${c.slug}" has an empty attestation or procedure section`,
        location: loc,
      });
    }

    for (const k of c.keyPoints) {
      if (k.detail.trim().length < 40) {
        issues.push({
          severity: "error",
          code: "MISSING_UNCERTAINTY_LABEL",
          message: `Practice "${c.slug}": the claim "${k.claim}" has no substantive supporting detail`,
          location: loc,
        });
      }
      if (
        k.level === "documented" &&
        !/attest|inscri|papyr|surviv|preserv|record|document|excavat|tablet|ostrac|deposit|iconograph|vase|relief|calendar|archive|find/i.test(
          k.detail,
        )
      ) {
        issues.push({
          severity: "warning",
          code: "MISSING_UNCERTAINTY_LABEL",
          message: `Practice "${c.slug}": the claim "${k.claim}" is marked documented without naming the evidence`,
          location: loc,
          hint: "On a cult page, documented means an inscription, an excavated deposit, a papyrus or an image. Say which.",
        });
      }
    }

    // Every page must carry something unsettled.
    const anyOpen =
      c.keyPoints.some((k) => k.level !== "documented") ||
      (c.disputes?.length ?? 0) > 0;
    if (!anyOpen) {
      issues.push({
        severity: "warning",
        code: "MISSING_UNCERTAINTY_LABEL",
        message: `Practice "${c.slug}" records nothing disputed or unknown`,
        location: loc,
      });
    }

    for (const d of c.disputes ?? []) {
      if (d.positions.trim().length < 80) {
        issues.push({
          severity: "error",
          code: "MISSING_UNCERTAINTY_LABEL",
          message: `Practice "${c.slug}": the contested point "${d.question}" does not state the competing positions`,
          location: loc,
        });
      }
    }

    // An aition must name its source and say why it is not a cause.
    for (const a of c.aitia ?? []) {
      if (!a.source.trim()) {
        issues.push({
          severity: "error",
          code: "MISSING_SOURCE_REF",
          message: `Practice "${c.slug}": an aition is recorded with no source`,
          location: loc,
          hint: "Who tells the story, and how long after the practice, is the whole point of recording it.",
        });
      }
      if (a.note.trim().length < 40) {
        issues.push({
          severity: "error",
          code: "MYTH_AS_HISTORY",
          message: `Practice "${c.slug}": the aition "${a.whatItExplains}" does not say why it is an explanation offered rather than a cause`,
          location: loc,
        });
      }
    }
  }

  return issues;
}

// ──────────────────────────────────────────────────────────────────────
// Boundaries
// ──────────────────────────────────────────────────────────────────────

const norm = (s: string) => s.toLowerCase().replace(/[^a-z ]/g, "").trim();

function h2sOf(body: string): string[] {
  return (body.match(/^##\s+(.+)$/gm) ?? []).map((h) =>
    h.replace(/^##\s+/, "").trim(),
  );
}

export function checkReligionBoundaries(
  entries: ContentEntry<AnyFrontmatter>[],
): Issue[] {
  const issues: Issue[] = [];
  const mine = new Set(RELIGION_SECTION_HEADINGS.map(norm));

  // 1. Heading disjointness against every other declared heading set.
  const declared: Array<[string, ReadonlyArray<string>]> = [
    ["CITY_SECTION_HEADINGS", CITY_SECTION_HEADINGS],
    ["INSTITUTION_SECTION_HEADINGS", INSTITUTION_SECTION_HEADINGS],
  ];
  for (const [name, set] of declared) {
    for (const h of set) {
      if (mine.has(norm(h))) {
        issues.push({
          severity: "error",
          code: "DUPLICATE_SLUG",
          message: `Heading collision: "${h}" is used by ${name} and by the religion template`,
          location: "src/data/religion.ts",
          hint: "The cities layer owns the sanctuaries of named places; this layer owns the rite as a category. The headings must not overlap.",
        });
      }
    }
  }

  // 2. Heading disjointness against the MDX corpus.
  for (const e of entries) {
    if (!["civilization", "theme", "figure", "guide"].includes(e.kind)) continue;
    for (const h of h2sOf(e.body)) {
      if (mine.has(norm(h))) {
        issues.push({
          severity: "error",
          code: "DUPLICATE_SLUG",
          message: `Heading collision: ${e.kind} "${e.slug}" uses the H2 "${h}", which is a religion-page section heading`,
          location: e.filePath.replace(`${process.cwd()}/`, ""),
        });
      }
    }
  }

  // 3. Slug collisions with the layers nearest this one.
  const others: Array<[string, Set<string>]> = [
    ["city", new Set(CITIES.map((c) => c.slug))],
    ["architecture topic", new Set(ARCHITECTURE_TOPICS.map((t) => t.slug))],
    ["institution", new Set(INSTITUTIONS.map((i) => i.slug))],
    ["warfare topic", new Set(WARFARE_TOPICS.map((t) => t.slug))],
    [
      "theme",
      new Set(entries.filter((e) => e.kind === "theme").map((e) => e.slug)),
    ],
  ];
  for (const c of CULT_PRACTICES) {
    for (const [kind, set] of others) {
      if (set.has(c.slug)) {
        issues.push({
          severity: "error",
          code: "DUPLICATE_SLUG",
          message: `Practice "${c.slug}" duplicates a ${kind} of the same slug`,
          location: `src/data/religion.ts#${c.slug}`,
        });
      }
    }
  }

  // 4. Every deferral must resolve to something that exists.
  const bySlug = (kind: string) =>
    new Set(entries.filter((e) => e.kind === kind).map((e) => e.slug));
  const resolvers: Record<string, Set<string>> = {
    city: new Set(CITIES.map((c) => c.slug)),
    architecture: new Set(ARCHITECTURE_TOPICS.map((t) => t.slug)),
    institution: new Set(INSTITUTIONS.map((i) => i.slug)),
    theme: bySlug("theme"),
    essay: bySlug("essay"),
    guide: bySlug("guide"),
    book: bySlug("book"),
    figure: bySlug("figure"),
    philosopher: bySlug("philosopher"),
    civilization: bySlug("civilization"),
  };
  for (const d of RELIGION_DEFERS_TO) {
    if (d.ownedBy === "section") {
      if (!d.route.startsWith("/")) {
        issues.push({
          severity: "error",
          code: "BROKEN_REF",
          message: `Deferral of "${d.subject}" names a section with no route`,
          location: "src/data/religion.ts",
        });
      }
    } else {
      const set = resolvers[d.ownedBy];
      if (!d.ownerSlug || !set?.has(d.ownerSlug)) {
        issues.push({
          severity: "error",
          code: "BROKEN_REF",
          message: `Deferral of "${d.subject}" points at ${d.ownedBy} "${d.ownerSlug ?? "(none)"}", which does not exist`,
          location: "src/data/religion.ts",
          hint: "A deferral that points nowhere leaves the subject uncovered by either layer.",
        });
      }
    }
    if (d.reason.trim().length < 40) {
      issues.push({
        severity: "warning",
        code: "MISSING_UNCERTAINTY_LABEL",
        message: `The deferral of "${d.subject}" states no substantive reason`,
        location: "src/data/religion.ts",
      });
    }
  }

  // 5. A deferred subject may not become a practice title.
  const deferredTitles = RELIGION_DEFERS_TO.map((d) => norm(d.subject));
  for (const c of CULT_PRACTICES) {
    if (deferredTitles.includes(norm(c.title))) {
      issues.push({
        severity: "error",
        code: "DUPLICATE_SLUG",
        message: `Practice "${c.slug}" covers "${c.title}", which is recorded as deferred to another layer`,
        location: `src/data/religion.ts#${c.slug}`,
      });
    }
  }

  return issues;
}

// ──────────────────────────────────────────────────────────────────────
// Referential integrity
// ──────────────────────────────────────────────────────────────────────

export function checkReligionRefs(
  entries: ContentEntry<AnyFrontmatter>[],
): Issue[] {
  const issues: Issue[] = [];
  const setOf = (kind: string) =>
    new Set(entries.filter((e) => e.kind === kind).map((e) => e.slug));
  const civs = setOf("civilization");
  const philosophers = setOf("philosopher");
  const themes = setOf("theme");
  const books = setOf("book");
  const practices = new Set(CULT_PRACTICES.map((c) => c.slug));
  const citySlugs = new Set(CITIES.map((c) => c.slug));
  const archSlugs = new Set(ARCHITECTURE_TOPICS.map((t) => t.slug));
  const instSlugs = new Set(INSTITUTIONS.map((i) => i.slug));
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
  for (const c of CULT_PRACTICES) {
    const loc = `src/data/religion.ts#${c.slug}`;
    if (seen.has(c.slug)) {
      issues.push({
        severity: "error",
        code: "DUPLICATE_SLUG",
        message: `Duplicate practice slug "${c.slug}"`,
        location: loc,
      });
    }
    seen.add(c.slug);

    check(loc, "civilizations", c.civilizations, civs, "civilization");
    check(loc, "figureRefs", c.figureRefs, philosophers, "philosopher");
    check(loc, "themeRefs", c.themeRefs, themes, "theme");
    check(loc, "bookRefs", c.bookRefs, books, "book");
    check(loc, "citySlugs", c.citySlugs, citySlugs, "city");
    check(loc, "architectureRefs", c.architectureRefs, archSlugs, "architecture topic");
    check(loc, "institutionRefs", c.institutionRefs, instSlugs, "institution");
    check(loc, "relatedPractices", c.relatedPractices, practices, "cult practice");
    if (c.imageSlug)
      check(loc, "imageSlug", [c.imageSlug], images, "archive image");

    if (c.relatedPractices.includes(c.slug)) {
      issues.push({
        severity: "warning",
        code: "BROKEN_REF",
        message: `Practice "${c.slug}" lists itself in relatedPractices`,
        location: loc,
      });
    }
    if (!c.civilizations.length) {
      issues.push({
        severity: "error",
        code: "BROKEN_REF",
        message: `Practice "${c.slug}" names no civilization it belonged to`,
        location: loc,
      });
    }
  }

  return issues;
}

export function runReligionGate(
  entries: ContentEntry<AnyFrontmatter>[],
): Array<{ name: string; issues: Issue[] }> {
  return [
    { name: "religion:refs", issues: checkReligionRefs(entries) },
    { name: "religion:evidence", issues: checkReligionEvidence() },
    { name: "religion:boundaries", issues: checkReligionBoundaries(entries) },
    {
      name: "religion:myth-discipline",
      issues: checkCultMythDiscipline(entries),
    },
  ];
}
