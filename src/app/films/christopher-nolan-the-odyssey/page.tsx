import type { Metadata } from "next";
import Link from "next/link";
import { FilmPageShell } from "@/components/editorial/FilmPageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { FILM_PAGES, NOLAN_ODYSSEY, OMITTED_FROM_FILM } from "@/data/films";
import { buildMetadata, movieJsonLd } from "@/lib/seo";

const f = NOLAN_ODYSSEY;
const PATH = `/films/${f.slug}`;
const TITLE = "Christopher Nolan's The Odyssey";
const DESCRIPTION =
  "The 2026 film as cinema and as an adaptation of Homer — verified production facts, credits and cast, the platform's editorial position, and the entry point to a claim-by-claim analysis of what it preserved, changed and removed.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  type: "article",
});

const SOURCING_LABEL: Record<string, string> = {
  corroborated: "",
  "single-source": " (single source)",
  conflicting: " (reports conflict)",
};

export default function FilmHubPage() {
  return (
    <>
      <JsonLd
        data={movieJsonLd({
          name: f.title,
          url: PATH,
          description:
            "Christopher Nolan's 2026 adaptation of Homer's Odyssey, shot entirely on IMAX 70mm film.",
          directorName: f.director,
          datePublished: f.releaseDate,
          productionCompany: [...f.productionCompanies],
        })}
      />
      <FilmPageShell
        path={PATH}
        eyebrow="Film analysis"
        title={TITLE}
        description={DESCRIPTION}
        meta={`Released ${f.releaseDateDisplay} · directed and written by ${f.director}`}
        aside={
          <>
            <p className="vp-eyebrow mt-8">Production facts</p>
            <dl className="mt-4 space-y-3 text-sm">
              {f.credits.map((c) => (
                <div key={c.role}>
                  <dt className="text-xs uppercase tracking-eyebrow text-stone">
                    {c.role}
                  </dt>
                  <dd className="text-charcoal-100">{c.name}</dd>
                </div>
              ))}
            </dl>
          </>
        }
      >
        <div className="vp-prose">
          <p>
            Christopher Nolan&rsquo;s <em>The Odyssey</em> was released on{" "}
            {f.releaseDateDisplay} and is, by any measure available, a
            major film: shot entirely on IMAX 70mm, made for a reported
            $250 million, and received with something close to acclaim.
            It is also an adaptation of a poem this platform treats as one
            of the foundations of the tradition it exists to study.
          </p>
          <p>
            Those are two different objects of criticism and this cluster
            keeps them apart. A film may be excellent and a poor
            adaptation, or faithful and inert. The eight pages here assess
            it as both, and the assessments do not always point the same
            way.
          </p>

          <h2>The platform&rsquo;s position, stated up front</h2>
          <p>
            We think this is a serious film made by people who read the
            poem. It preserves the retrospective narration that
            adaptations almost always discard; it stages the summoning of
            the dead the way Homer stages it, with the shades rising to
            the trench rather than the hero descending into hell; it keeps{" "}
            <em>xenia</em> as the law of Zeus and makes the breach of
            hospitality the moral centre, which is what the poem does.
          </p>
          <p>
            We also think it makes its hero more honourable, its Penelope
            less decisive at the one moment she is most decisive, and its
            ending an argument the poem does not make. Those are
            criticisms of specific choices with specific evidence, and
            each of them lives in the{" "}
            <Link href={`${PATH}/what-the-film-changed`}>
              adaptation-claims ledger
            </Link>{" "}
            before it appears in any prose here.
          </p>

          <h2>What this cluster will not do</h2>
          <p>
            It will not treat every departure as a fault. Adaptation is
            transformation, and the tradition that produced the{" "}
            <em>Odyssey</em> transformed its material continuously — the
            poem itself reworks older material, and the wooden horse most
            readers picture comes from Virgil rather than Homer.
          </p>
          <p>
            It will not present the poem as history, or the film&rsquo;s
            departures from Bronze Age archaeology as departures from
            Homer. Those are different charges with different force, and
            conflating them is the most common error in popular writing on
            this subject. See{" "}
            <Link href={`${PATH}/historical-accuracy`}>historical accuracy</Link>.
          </p>
          <p>
            And it will not make arguments about performers&rsquo;
            ancestry. The casting page examines each decision on grounds
            of source correspondence, character identity, genealogy,
            cultural location, production intent and adaptation coherence,
            and states plainly where those grounds run out. See{" "}
            <Link href={`${PATH}/casting-and-authenticity`}>
              casting and authenticity
            </Link>
            .
          </p>

          <h2>Verified production record</h2>
          <p>{f.premiere}</p>
          <p>
            <strong>Format.</strong> {f.format}
          </p>
          <p>
            <strong>Running time.</strong> {f.runtimeNote}
          </p>
          <p>
            <strong>Photography.</strong> {f.filmingNote}
          </p>
          <p>
            <strong>Budget.</strong> {f.budgetNote}
          </p>
          <p>
            <strong>Box office.</strong> {f.boxOfficeNote}
          </p>
          <p>
            <strong>Critical reception.</strong> {f.receptionNote}
          </p>
        </div>

        <section className="mt-12">
          <h2 className="vp-eyebrow border-b border-rule pb-3">
            Filming locations
          </h2>
          <ul className="mt-6 space-y-3 text-sm text-charcoal-100">
            {f.locations.map((l) => (
              <li key={l} className="border-l border-rule pl-5">
                {l}
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-prose text-sm text-stone-400">
            The Dakhla filming attracted public objection. Western Sahara
            has been under Moroccan control since 1975 and its status is
            disputed at the United Nations; the Polisario Front and the
            organisers of the Sahara International Film Festival criticised
            the production&rsquo;s presence there, in a statement signed by
            a number of Spanish film figures. The Moroccan Cinematographic
            Center defended the production. We record the dispute as a
            production controversy; it bears on the film&rsquo;s conduct,
            not on its fidelity to Homer, and it is not part of our
            adaptation assessment.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="vp-eyebrow border-b border-rule pb-3">
            Principal cast
          </h2>
          <ul className="mt-6 space-y-5">
            {f.principalCast.map((c) => (
              <li key={c.performer} className="border-l border-rule pl-5">
                <p className="font-serif text-lg text-charcoal">
                  {c.performer} — {c.role}
                  <span className="text-sm text-stone">
                    {SOURCING_LABEL[c.sourcing]}
                  </span>
                </p>
                {c.note ? (
                  <p className="mt-1 text-sm leading-relaxed text-charcoal-100">
                    {c.note}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>

          <h3 className="vp-eyebrow mt-10 border-b border-rule pb-3">
            Further cast
          </h3>
          <ul className="mt-6 space-y-4">
            {f.supportingCast.map((c) => (
              <li key={c.performer} className="border-l border-rule pl-5">
                <p className="text-sm text-charcoal">
                  {c.performer} — {c.role}
                  <span className="text-stone">
                    {SOURCING_LABEL[c.sourcing]}
                  </span>
                </p>
                {c.note ? (
                  <p className="mt-1 text-sm leading-relaxed text-charcoal-100">
                    {c.note}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-prose text-sm text-stone-400">
            Entries marked single source were traced to one published
            account at the time of writing. They are recorded because
            omitting them would misrepresent the film&rsquo;s scale, and
            marked because a single account is a weaker basis than several.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="vp-eyebrow border-b border-rule pb-3">
            Homeric characters the film does without
          </h2>
          <ul className="mt-6 space-y-5">
            {OMITTED_FROM_FILM.map((o) => (
              <li key={o.name} className="border-l border-rule pl-5">
                <p className="font-serif text-lg text-charcoal">{o.name}</p>
                <p className="mt-1 text-sm leading-relaxed text-charcoal-100">
                  {o.homericRole}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-stone-400">
                  {o.consequence}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 border-t border-rule pt-10">
          <h2 className="vp-eyebrow">The analysis</h2>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2">
            {FILM_PAGES.filter((p) => p.path !== PATH).map((p) => (
              <li key={p.path} className="border-l border-rule pl-5">
                <h3 className="font-serif text-xl text-charcoal">
                  <Link href={p.path} className="hover:text-bronze">
                    {p.label}
                  </Link>
                </h3>
                <p className="mt-2 text-sm text-charcoal-100">{p.summary}</p>
              </li>
            ))}
          </ul>
        </section>
      </FilmPageShell>
    </>
  );
}
