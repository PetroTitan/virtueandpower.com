/**
 * Evidence taxonomy.
 *
 * The Homer / Odyssey cluster makes claims that sit at very different
 * distances from the evidence: some are statements about what a text
 * says (checkable by opening the text), some are statements about what
 * archaeology has recovered, some are scholarly inference, some are
 * contested, and some are simply unknown. Running all of those together
 * in undifferentiated prose is how a literary tradition gets quietly
 * converted into a history.
 *
 * This module is the single typed vocabulary for that distinction. Every
 * claim the cluster makes about myth, history or material culture is
 * tagged with one of these levels, and the level is rendered visibly next
 * to the claim rather than buried in a footnote.
 *
 * Editorial rules:
 *   - DOCUMENTED is for claims a reader can check against a named primary
 *     text or a named excavated object. It is not a synonym for "true";
 *     it means "the source says this".
 *   - PROBABLE requires that the inference be one a substantial body of
 *     specialists actually holds, not one we find persuasive.
 *   - DISPUTED requires that we state the competing interpretation.
 *   - LITERARY is the correct level for most of the Odyssey's content.
 *     It is not a demotion; it is an accurate description of what an
 *     epic poem is.
 *   - UNKNOWN must be used rather than reaching for the nearest
 *     plausible-sounding inference.
 */

export type EvidenceLevel =
  | "documented"
  | "probable"
  | "disputed"
  | "literary"
  | "unknown";

export interface EvidenceLevelDefinition {
  level: EvidenceLevel;
  /** Short uppercase label rendered in the badge. */
  label: string;
  /** One-line definition rendered in the taxonomy key. */
  definition: string;
  /** Longer editorial gloss for the taxonomy reference page. */
  gloss: string;
}

export const EVIDENCE_LEVELS: ReadonlyArray<EvidenceLevelDefinition> = [
  {
    level: "documented",
    label: "Documented",
    definition:
      "Supported by a named primary text or by excavated material evidence.",
    gloss:
      "The claim can be checked against something that exists: a passage in the Odyssey, an entry in a Linear B tablet, an object in a museum. Documented describes the status of the evidence, not the truth of what the evidence asserts. That Homer describes a boar's-tusk helmet is documented; that anyone wore one at Troy is a separate question.",
  },
  {
    level: "probable",
    label: "Probable",
    definition: "Supported by strong inference that most specialists accept.",
    gloss:
      "A reconstruction that goes beyond what any single source states but that the balance of specialist opinion supports. Probable claims are the working consensus of a field, and working consensus changes.",
  },
  {
    level: "disputed",
    label: "Disputed",
    definition:
      "Substantial specialist disagreement exists; competing readings are stated.",
    gloss:
      "Where we mark a claim disputed we are obliged to say what the competing position is and who holds it. A disputed claim may not be presented in our own prose as though it were settled.",
  },
  {
    level: "literary",
    label: "Literary",
    definition:
      "Belongs to poetic or mythological construction rather than to history.",
    gloss:
      "The correct level for most of the Odyssey's content: Circe, the bag of winds, the descent to the dead, the bow that only Odysseus can string. These are things the poem does, and describing them as literary is a statement about genre, not a complaint about the poem.",
  },
  {
    level: "unknown",
    label: "Unknown",
    definition: "The available evidence is insufficient to decide.",
    gloss:
      "Reserved for questions that are genuinely open — not questions that are merely hard, and not questions where we have simply not looked. Where the honest answer is that nobody knows, the honest label is unknown.",
  },
];

const BY_LEVEL = new Map<EvidenceLevel, EvidenceLevelDefinition>(
  EVIDENCE_LEVELS.map((d) => [d.level, d]),
);

export function getEvidenceLevel(
  level: EvidenceLevel,
): EvidenceLevelDefinition {
  const found = BY_LEVEL.get(level);
  if (!found) {
    // Unreachable given the union type; kept so a widened string can't
    // silently render an empty badge.
    throw new Error(`Unknown evidence level: ${level as string}`);
  }
  return found;
}

/**
 * A pointer into the primary-source record. Used by the adaptation-claims
 * ledger and by the figure pages, both of which are required to say which
 * source preserves which tradition rather than merging traditions into a
 * single narrative.
 */
export interface SourceReference {
  /** Work as conventionally cited, e.g. "Odyssey", "Strabo, Geography". */
  work: string;
  /** Canonical locus, e.g. "9.105-566", "8.3.8". Omitted where the
   *  reference is to a work as a whole. */
  locus?: string;
  /** Author where the work is not anonymous. */
  author?: string;
  /** What the passage actually says, in our own words. Never a
   *  fabricated quotation. */
  summary: string;
  /** Link to a public-domain text or a catalogue record, where one
   *  exists. Left absent rather than guessed. */
  url?: string;
}
