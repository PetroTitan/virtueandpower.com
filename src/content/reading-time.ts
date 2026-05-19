/**
 * Reading-time estimator for MDX bodies.
 *
 * Strips frontmatter, code fences, raw HTML / MDX tags and common
 * non-prose markup, then counts the remaining words. Result is rounded to
 * the nearest minute with a floor of 1.
 *
 * 220 wpm is the median for considered, non-skim reading — long-form
 * editorial work, not news scanning. We deliberately err on the side of
 * "this is going to take longer than you think."
 */

const WORDS_PER_MINUTE = 220;

export function estimateReadingMinutes(
  body: string,
  override?: number,
): number {
  if (typeof override === "number" && override > 0) return Math.round(override);
  const words = countProseWords(body);
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export function countProseWords(body: string): number {
  const stripped = body
    // Drop fenced code blocks entirely (they aren't read at prose speed).
    .replace(/```[\s\S]*?```/g, " ")
    // Drop inline code spans.
    .replace(/`[^`]*`/g, " ")
    // Drop raw HTML / MDX tags but keep their text content.
    .replace(/<[^>]+>/g, " ")
    // Markdown link syntax: keep the link text, drop the URL.
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    // Markdown emphasis markers shouldn't affect word counting.
    .replace(/[*_~`>#]/g, " ");
  const tokens = stripped.split(/\s+/).filter((t) => /\S/.test(t));
  return tokens.length;
}

/**
 * Display string for the per-entry reading time. The unit is spelt out
 * because the badge sits in editorial typography next to publication
 * metadata; "5 min read" reads better in context than "5m".
 */
export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`;
}
