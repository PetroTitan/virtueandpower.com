import type { Metadata } from "next";
import Link from "next/link";
import { FilmPageShell } from "@/components/editorial/FilmPageShell";
import { EvidenceBadge, EvidenceKey } from "@/components/editorial/EvidenceBadge";
import { NOLAN_ODYSSEY } from "@/data/films";
import {
  ADAPTATION_CLAIMS,
  CATEGORY_LABEL,
  CLASSIFICATION_LABEL,
  type ClaimCategory,
} from "@/data/adaptation-claims";
import { buildMetadata } from "@/lib/seo";

const PATH = `/films/${NOLAN_ODYSSEY.slug}/what-the-film-changed`;
const TITLE = "What the film changed";
const DESCRIPTION =
  "The verified adaptation-claims ledger for Christopher Nolan's The Odyssey — every departure the platform alleges, with the Homeric passages that establish it, its classification, its confidence level and the competing reading where one exists.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  type: "article",
});

const CONFIDENCE_NOTE: Record<string, string> = {
  high: "Reported consistently across independent accounts of the completed film.",
  medium:
    "Reported, but from fewer accounts or with less specificity. Treated as provisional.",
  low: "Weakly established. Not restated as definitive anywhere on this platform.",
};

const CATEGORY_ORDER: ClaimCategory[] = [
  "plot",
  "character",
  "religion",
  "political-order",
  "dialogue",
  "casting",
  "chronology",
  "geography",
  "costume",
  "material-culture",
];

export default function LedgerPage() {
  const byCategory = CATEGORY_ORDER.map((cat) => ({
    cat,
    claims: ADAPTATION_CLAIMS.filter((c) => c.category === cat),
  })).filter((g) => g.claims.length > 0);

  return (
    <FilmPageShell
      path={PATH}
      eyebrow="Ledger"
      title={TITLE}
      description={DESCRIPTION}
      meta={`${ADAPTATION_CLAIMS.length} entries · every accusation on this platform originates here`}
    >
      <div className="vp-prose">
        <p>
          This is the evidentiary spine of the film cluster, and the rule it
          enforces is absolute: every accusation the platform makes about
          the film departing from its source exists here first, with its
          evidence attached. The review and the comparison table may
          summarise and argue. They may not assert a departure that is not
          in this ledger.
        </p>
        <p>
          Two things are recorded separately because they are separate.{" "}
          <strong>Classification</strong> describes the relation to the
          source — whether the film is accurate to it, extends it, modernises
          it, is unsupported by it, or is contradicted by it.{" "}
          <strong>Confidence</strong> describes how well established the
          claim about the film itself is. A change can be confidently
          established and mild, or poorly established and severe.
        </p>
        <p>
          Nothing here derives from trailers, promotional stills, casting
          announcements or social media. Where a reading is contested, the
          competing reading is stated in the entry and is carried into the
          prose. Where a plausible allegation could not be verified, it is
          not in the ledger at all — one such case, concerning a reported
          use of Modern Greek in a single scene, is noted in the{" "}
          <Link href={`/films/${NOLAN_ODYSSEY.slug}/review`}>review</Link> as
          unverified rather than entered here.
        </p>
      </div>

      {byCategory.map(({ cat, claims }) => (
        <section key={cat} className="mt-14">
          <h2 className="vp-eyebrow border-b border-rule pb-3">
            {CATEGORY_LABEL[cat]}
          </h2>
          {claims.map((c) => (
            <article key={c.id} className="mt-10">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <EvidenceBadge level={c.evidenceLevel} />
                <span className="text-xs uppercase tracking-eyebrow text-stone-400">
                  {CLASSIFICATION_LABEL[c.classification]}
                </span>
                <span className="text-xs uppercase tracking-eyebrow text-stone">
                  Confidence: {c.confidence}
                </span>
              </div>

              <p className="mt-4 font-serif text-xl leading-snug text-charcoal">
                {c.filmClaim}
              </p>

              <div className="mt-6 border-l border-rule pl-5">
                <p className="text-xs uppercase tracking-eyebrow text-stone">
                  What the poem has
                </p>
                <ul className="mt-3 space-y-3 text-sm">
                  {c.homericEvidence.map((e) => (
                    <li key={`${e.work}-${e.locus ?? e.summary.slice(0, 24)}`}>
                      <span className="text-charcoal">
                        {e.work}
                        {e.locus ? ` ${e.locus}` : ""}
                        {e.author ? ` — ${e.author}` : ""}
                      </span>
                      <span className="block text-charcoal-100">
                        {e.summary}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {c.archaeologicalEvidence?.length ? (
                <div className="mt-5 border-l border-rule pl-5">
                  <p className="text-xs uppercase tracking-eyebrow text-stone">
                    Material evidence
                  </p>
                  <ul className="mt-3 space-y-3 text-sm">
                    {c.archaeologicalEvidence.map((e) => (
                      <li key={e.summary.slice(0, 32)}>
                        <span className="text-charcoal">
                          {e.work}
                          {e.locus ? ` — ${e.locus}` : ""}
                        </span>
                        <span className="block text-charcoal-100">
                          {e.summary}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {c.competingReading ? (
                <div className="mt-5 border-l-2 border-bronze-50 bg-parchment-50 py-4 pl-5 pr-4">
                  <p className="text-xs uppercase tracking-eyebrow text-stone">
                    The competing reading
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-100">
                    {c.competingReading}
                  </p>
                </div>
              ) : null}

              {c.probableRationale ? (
                <p className="mt-5 text-sm leading-relaxed text-charcoal-100">
                  <span className="text-xs uppercase tracking-eyebrow text-stone">
                    Probable rationale —{" "}
                  </span>
                  {c.probableRationale}
                </p>
              ) : null}

              <p className="mt-5 text-sm leading-relaxed text-charcoal-100">
                <span className="text-xs uppercase tracking-eyebrow text-stone">
                  Editorial note —{" "}
                </span>
                {c.editorialNote}
              </p>

              <p className="mt-4 text-xs text-stone-400">
                {CONFIDENCE_NOTE[c.confidence]}
              </p>
            </article>
          ))}
        </section>
      ))}

      <div className="vp-prose mt-16">
        <h2>What is deliberately not here</h2>
        <p>
          Rumours and social-media allegations. Claims that would require
          knowing a performer&rsquo;s ancestry. Anything drawn from a
          trailer when the completed film is available. Any assertion that
          a departure is a fault without a stated reason it is a fault.
        </p>
        <p>
          The ledger also declines to enter absences it cannot source. It is
          easy to establish that something is in a film and hard to
          establish that nothing in it corresponds to a given character, so
          the omissions we record are those directly attested by published
          accounts rather than inferred from a cast list.
        </p>
      </div>

      <EvidenceKey className="mt-16" />
    </FilmPageShell>
  );
}
