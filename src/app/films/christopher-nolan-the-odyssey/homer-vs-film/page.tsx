import type { Metadata } from "next";
import Link from "next/link";
import { FilmPageShell } from "@/components/editorial/FilmPageShell";
import { EvidenceBadge, EvidenceKey } from "@/components/editorial/EvidenceBadge";
import { NOLAN_ODYSSEY } from "@/data/films";
import {
  CHANGE_TYPE_LABEL,
  COMPARISON_ROWS,
} from "@/data/homer-nolan-comparison";
import { buildMetadata } from "@/lib/seo";

const PATH = `/films/${NOLAN_ODYSSEY.slug}/homer-vs-film`;
const TITLE = "Homer versus the film";
const DESCRIPTION =
  "A structured comparison of Homer's Odyssey and Christopher Nolan's 2026 adaptation across twenty-two elements — source, adaptation, type of change, probable reason, editorial assessment and evidence level.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  type: "article",
});

const COLUMNS = [
  "Element",
  "Homeric source",
  "The adaptation",
  "Type of change",
  "Probable reason",
  "Editorial assessment",
  "Evidence",
];

export default function HomerVsFilmPage() {
  return (
    <FilmPageShell
      path={PATH}
      eyebrow="Comparison"
      title={TITLE}
      description={DESCRIPTION}
      meta={`${COMPARISON_ROWS.length} elements compared`}
    >
      <div className="vp-prose">
        <p>
          One row per element the poem and the film can be compared on. The
          rule governing the table is that no row asserts a claim unless it
          can be checked on both sides — the poem by book and line, the film
          from published accounts of the completed release.
        </p>
        <p>
          Where the film side is not adequately established the row says so
          rather than being dropped or guessed. An honest gap tells a reader
          more than a confident sentence, and removing the row would hide
          that we looked.
        </p>
      </div>

      {/* Wide table for large screens, inside its own scroll container so
          the page body never scrolls horizontally. */}
      <div className="mt-10 hidden overflow-x-auto lg:block">
        <table className="w-full min-w-[64rem] border-collapse text-sm">
          <caption className="sr-only">
            Comparison of Homer&rsquo;s Odyssey and the 2026 film across{" "}
            {COMPARISON_ROWS.length} elements.
          </caption>
          <thead>
            <tr className="border-b border-charcoal-50 text-left align-bottom">
              {COLUMNS.map((c) => (
                <th
                  key={c}
                  scope="col"
                  className="px-3 pb-3 text-xs uppercase tracking-eyebrow text-stone"
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARISON_ROWS.map((r) => (
              <tr key={r.id} className="border-b border-rule align-top">
                <th
                  scope="row"
                  className="px-3 py-5 text-left font-serif text-base font-normal text-charcoal"
                >
                  {r.element}
                </th>
                <td className="px-3 py-5 text-charcoal-100">{r.homericSource}</td>
                <td className="px-3 py-5 text-charcoal-100">{r.adaptation}</td>
                <td className="px-3 py-5">
                  <span className="text-xs uppercase tracking-eyebrow text-stone-400">
                    {CHANGE_TYPE_LABEL[r.changeType]}
                  </span>
                </td>
                <td className="px-3 py-5 text-charcoal-100">
                  {r.probableReason}
                </td>
                <td className="px-3 py-5 text-charcoal-100">
                  {r.editorialAssessment}
                </td>
                <td className="px-3 py-5">
                  <EvidenceBadge level={r.evidenceLevel} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Stacked equivalent for narrow screens. Same data, same order,
          labelled rather than columnar. */}
      <div className="mt-10 lg:hidden">
        {COMPARISON_ROWS.map((r) => (
          <article
            key={r.id}
            className="border-t border-rule py-7 first:border-t-0 first:pt-0"
          >
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
              <h2 className="font-serif text-xl text-charcoal">{r.element}</h2>
              <EvidenceBadge level={r.evidenceLevel} />
            </div>
            <p className="mt-2 text-xs uppercase tracking-eyebrow text-stone-400">
              {CHANGE_TYPE_LABEL[r.changeType]}
            </p>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-eyebrow text-stone">
                  Homeric source
                </dt>
                <dd className="mt-1 text-charcoal-100">{r.homericSource}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-eyebrow text-stone">
                  The adaptation
                </dt>
                <dd className="mt-1 text-charcoal-100">{r.adaptation}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-eyebrow text-stone">
                  Probable reason
                </dt>
                <dd className="mt-1 text-charcoal-100">{r.probableReason}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-eyebrow text-stone">
                  Editorial assessment
                </dt>
                <dd className="mt-1 text-charcoal-100">
                  {r.editorialAssessment}
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </div>

      <div className="vp-prose mt-16">
        <h2>How the change types are used</h2>
        <p>
          A departure is not automatically a fault, and the categories are
          there to stop the table reading as a charge sheet.{" "}
          <em>Necessary compression</em> and{" "}
          <em>reasonable interpretation</em> describe good adaptation.{" "}
          <em>Defensible modernisation</em> describes a change made for a
          modern audience that the material can bear.{" "}
          <em>Unsupported invention</em> means the source does not contain
          it; <em>source contradiction</em> means the source says otherwise;
          and <em>thematic distortion</em> is reserved for changes that
          alter what the poem is about rather than what happens in it.
        </p>
        <p>
          Three rows carry <em>thematic distortion</em>: the treatment of
          Odysseus, the lotus at Ogygia, and the removal of the sexual
          relationships. Those are the film&rsquo;s substantive
          reinterpretations, and the case for each is set out in the{" "}
          <Link href={`/films/${NOLAN_ODYSSEY.slug}/what-the-film-changed`}>
            ledger
          </Link>{" "}
          with the competing reading attached.
        </p>
      </div>

      <EvidenceKey className="mt-16" />
    </FilmPageShell>
  );
}
