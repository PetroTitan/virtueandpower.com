import { cn } from "@/lib/cn";
import {
  EVIDENCE_LEVELS,
  getEvidenceLevel,
  type EvidenceLevel,
} from "@/data/evidence";

/**
 * The visible form of the evidence taxonomy.
 *
 * Every claim the Homer / Odyssey cluster makes about myth, history or
 * material culture carries one of these. They are deliberately quiet —
 * a hairline rule, small caps, the existing palette — because the point
 * is to make the epistemic status legible, not to decorate the page.
 *
 * The colour distinction is carried by the left rule and the label, and
 * is never the only signal: the label text always states the level, so
 * the badge remains readable without colour perception.
 */

const LEVEL_RULE: Record<EvidenceLevel, string> = {
  documented: "border-l-bronze-200 text-bronze-200",
  probable: "border-l-bronze-50 text-bronze-100",
  disputed: "border-l-stone-300 text-stone-400",
  literary: "border-l-charcoal-50 text-charcoal-100",
  unknown: "border-l-stone-50 text-stone-300",
};

export function EvidenceBadge({
  level,
  className,
}: {
  level: EvidenceLevel;
  className?: string;
}) {
  const def = getEvidenceLevel(level);
  return (
    <span
      className={cn(
        "inline-flex items-center border-l-2 bg-parchment-50 py-0.5 pl-2 pr-2.5 text-[0.62rem] uppercase tracking-eyebrow",
        LEVEL_RULE[level],
        className,
      )}
    >
      <span className="sr-only">Evidence level: </span>
      {def.label}
    </span>
  );
}

/**
 * The key that must accompany any page using the badges. A reader who
 * meets "DISPUTED" halfway down a page needs somewhere on that page
 * that says what we mean by it.
 */
export function EvidenceKey({
  heading = "How to read the evidence labels",
  className,
}: {
  heading?: string;
  className?: string;
}) {
  return (
    <section className={cn("border-t border-rule pt-8", className)}>
      <h2 className="vp-eyebrow">{heading}</h2>
      <dl className="mt-6 space-y-4">
        {EVIDENCE_LEVELS.map((def) => (
          <div
            key={def.level}
            className="grid gap-2 sm:grid-cols-[9rem_1fr] sm:gap-6"
          >
            <dt>
              <EvidenceBadge level={def.level} />
            </dt>
            <dd className="text-sm text-charcoal-100">{def.definition}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 text-sm text-stone-400">
        These labels describe the status of the evidence, not our confidence
        in a conclusion. A claim marked{" "}
        <span className="uppercase tracking-eyebrow">Literary</span> is not a
        claim we doubt; it is a claim about what kind of thing a poem is.
      </p>
    </section>
  );
}

/**
 * A claim rendered with its evidence level attached. Used wherever the
 * cluster asserts something about the historical record — the guides,
 * the film ledger, the figure pages.
 */
export function EvidenceClaim({
  level,
  claim,
  detail,
  sources,
}: {
  level: EvidenceLevel;
  claim: string;
  detail?: string;
  sources?: string;
}) {
  return (
    <div className="border-t border-rule py-5 first:border-t-0 first:pt-0">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <EvidenceBadge level={level} />
        <p className="flex-1 font-serif text-lg text-charcoal">{claim}</p>
      </div>
      {detail ? (
        <p className="mt-3 text-sm leading-relaxed text-charcoal-100">
          {detail}
        </p>
      ) : null}
      {sources ? (
        <p className="mt-2 text-xs uppercase tracking-eyebrow text-stone">
          {sources}
        </p>
      ) : null}
    </div>
  );
}
