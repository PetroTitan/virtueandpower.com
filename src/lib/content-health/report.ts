import type { CheckResult } from "./checks";
import type { Issue, ValidationReport, ValidationStats } from "./types";

const ANSI = {
  reset: "\x1b[0m",
  dim: "\x1b[2m",
  bold: "\x1b[1m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  green: "\x1b[32m",
  cyan: "\x1b[36m",
};

function color(use: boolean, code: string, text: string): string {
  return use ? `${code}${text}${ANSI.reset}` : text;
}

export function aggregate(
  results: CheckResult[],
  stats: ValidationStats,
): ValidationReport {
  return {
    issues: results.flatMap((r) => r.issues),
    stats,
    generatedAt: new Date().toISOString(),
  };
}

/**
 * Compact, scannable console report. Errors first, then warnings, grouped by
 * check. Returns the formatted string so the caller controls where it goes.
 */
export function formatConsole(
  results: CheckResult[],
  stats: ValidationStats,
  options: { color?: boolean } = {},
): string {
  const useColor = options.color ?? process.stdout.isTTY ?? false;
  const lines: string[] = [];

  lines.push(color(useColor, ANSI.bold, "Virtue & Power · Content Health"));
  lines.push(
    color(
      useColor,
      ANSI.dim,
      `${stats.totalEntries} entries (${stats.publishedEntries} published, ${stats.stubEntries} stub) · ` +
        `${stats.totalSources} sources · ${stats.checks} checks`,
    ),
  );
  lines.push("");

  let totalErrors = 0;
  let totalWarnings = 0;
  for (const result of results) {
    const errs = result.issues.filter((i) => i.severity === "error");
    const warns = result.issues.filter((i) => i.severity === "warning");
    totalErrors += errs.length;
    totalWarnings += warns.length;

    if (errs.length === 0 && warns.length === 0) {
      lines.push(
        `  ${color(useColor, ANSI.green, "✓")} ${result.name.padEnd(22)} ${color(useColor, ANSI.dim, "no issues")}`,
      );
      continue;
    }

    const status =
      errs.length > 0
        ? color(useColor, ANSI.red, "✗")
        : color(useColor, ANSI.yellow, "!");
    const tally = [
      errs.length > 0 ? color(useColor, ANSI.red, `${errs.length} error${errs.length === 1 ? "" : "s"}`) : "",
      warns.length > 0
        ? color(useColor, ANSI.yellow, `${warns.length} warning${warns.length === 1 ? "" : "s"}`)
        : "",
    ]
      .filter(Boolean)
      .join(", ");
    lines.push(`  ${status} ${result.name.padEnd(22)} ${tally}`);

    for (const issue of [...errs, ...warns]) {
      lines.push(formatIssueLine(issue, useColor));
    }
    lines.push("");
  }

  lines.push("");
  if (totalErrors === 0 && totalWarnings === 0) {
    lines.push(color(useColor, ANSI.green, "All checks passed."));
  } else {
    const summary = `${totalErrors} error${totalErrors === 1 ? "" : "s"}, ${totalWarnings} warning${totalWarnings === 1 ? "" : "s"}.`;
    lines.push(
      totalErrors > 0
        ? color(useColor, ANSI.red, summary)
        : color(useColor, ANSI.yellow, summary),
    );
  }

  return lines.join("\n") + "\n";
}

function formatIssueLine(issue: Issue, useColor: boolean): string {
  const tag =
    issue.severity === "error"
      ? color(useColor, ANSI.red, "[error]")
      : color(useColor, ANSI.yellow, "[warn] ");
  const loc = issue.location
    ? color(useColor, ANSI.cyan, ` ${issue.location}`)
    : "";
  const main = `      ${tag} ${issue.code}: ${issue.message}${loc}`;
  if (issue.hint) {
    return `${main}\n        ${color(useColor, ANSI.dim, "↳ " + issue.hint)}`;
  }
  return main;
}

/**
 * Stable markdown report written by `npm run validate:content:report`. Lists
 * stats, then issues grouped by check, then a no-op note when clean.
 */
export function formatMarkdown(
  results: CheckResult[],
  stats: ValidationStats,
  generatedAt: string,
): string {
  const lines: string[] = [];
  lines.push("# Content health report");
  lines.push("");
  lines.push(`_Generated ${generatedAt}_`);
  lines.push("");
  lines.push("## Summary");
  lines.push("");
  lines.push(`- **Entries:** ${stats.totalEntries} (${stats.publishedEntries} published, ${stats.stubEntries} stub)`);
  lines.push(`- **Sources:** ${stats.totalSources}`);
  lines.push(`- **Checks run:** ${stats.checks}`);
  const allIssues = results.flatMap((r) => r.issues);
  const errors = allIssues.filter((i) => i.severity === "error").length;
  const warnings = allIssues.filter((i) => i.severity === "warning").length;
  lines.push(`- **Errors:** ${errors}`);
  lines.push(`- **Warnings:** ${warnings}`);
  lines.push("");

  for (const result of results) {
    if (result.issues.length === 0) continue;
    lines.push(`## ${result.name}`);
    lines.push("");
    for (const issue of result.issues) {
      const sev = issue.severity === "error" ? "**error**" : "_warning_";
      const loc = issue.location ? ` — \`${issue.location}\`` : "";
      lines.push(`- ${sev} (${issue.code}): ${issue.message}${loc}`);
      if (issue.hint) lines.push(`  - ↳ ${issue.hint}`);
    }
    lines.push("");
  }

  if (allIssues.length === 0) {
    lines.push("All checks passed — no issues to report.");
    lines.push("");
  }

  return lines.join("\n");
}
