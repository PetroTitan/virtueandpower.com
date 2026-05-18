/**
 * Content-health validation types.
 *
 * The validator emits Issues. An Issue is either an error (fails CI) or a
 * warning (surfaces but does not fail). Each issue carries a stable code so
 * editors can grep for the rule that fired and a human-readable message
 * that should be enough on its own to act on.
 */

export type Severity = "error" | "warning";

export type IssueCode =
  // hard failures
  | "BROKEN_REF"
  | "DUPLICATE_SLUG"
  | "INVALID_FRONTMATTER"
  | "INVALID_STATUS"
  | "INVALID_DATE"
  | "MISSING_SOURCE_REF"
  | "STUB_NOTICE_IN_PUBLISHED"
  | "PUBLISHED_TOO_THIN"
  | "MISSING_METADATA"
  | "INVALID_METADATA"
  | "QUOTE_INCOMPLETE"
  | "PLACEHOLDER_MARKER"
  // warnings
  | "ORPHANED_ENTRY"
  | "STALE_UPDATED"
  | "WEAK_DESCRIPTION";

export interface Issue {
  severity: Severity;
  code: IssueCode;
  message: string;
  /** Path or symbol the issue is anchored to (e.g. `content/themes/virtue.mdx`
   *  or `src/data/sources.ts#perseus-digital-library`). */
  location?: string;
  /** Optional one-line hint about how to fix it. */
  hint?: string;
}

export interface ValidationStats {
  totalEntries: number;
  publishedEntries: number;
  stubEntries: number;
  totalSources: number;
  checks: number;
}

export interface ValidationReport {
  issues: Issue[];
  stats: ValidationStats;
  generatedAt: string;
}

export function errorsOf(report: ValidationReport): Issue[] {
  return report.issues.filter((i) => i.severity === "error");
}

export function warningsOf(report: ValidationReport): Issue[] {
  return report.issues.filter((i) => i.severity === "warning");
}
