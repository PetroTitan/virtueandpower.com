# Phase 30: Ancient Religion — cult, rite and sanctuary

Sixth and last phase of the Classical Civilization roadmap, and the sixth
branch in the stack (`warfare → cities → archaeology-museums →
architecture → institutions → religion`). Full report in
`docs/phase-30-ancient-religion.md`.

**31 new routes** — 30 cult practices and one index. Build **745 → 776**
pages; sitemap **743 → 774** URLs. Validator **39 → 43 checks**.

## The problem this phase had that the others did not

Every earlier phase extended the platform into ground it did not already
cover. This one could not. Religion was already published here at length:
`/themes/state-and-religion` argues Roman religion end to end,
`/themes/sacred-kingship-in-egypt` argues ma'at, `/architecture/temple`
owns the building, `/cities/delphi` owns the Pythia, **all fourteen city
pages carry a "Cult and sanctuaries" section**, and `/religion-and-wisdom`
already existed as a nav-registered top-level section.

So it began with a survey of the whole corpus rather than a plan. That
found **33 subjects already owned**, **80 heading strings already in use**,
and **30 genuinely uncovered**. `RELIGION_DEFERS_TO` records all 33 with
the route that owns each and why; the validator resolves every `ownerSlug`
against its registry.

The namespace is `/ancient-religion`, not `/religion`, because
`/religion-and-wisdom` already claims that ground for scripture and
doctrine. This layer is scoped visibly to pre-Christian **practice**:

> The civilizations and themes layers cover religion as political order
> and as thought. The architecture layer covers the buildings. The cities
> layer covers the sanctuaries of named places. This layer covers the
> rite.

## The schema, and the failure it prevents

The characteristic failure of writing about ancient religion is that a
story explaining a rite quietly becomes the reason the rite existed.
Hesiod's Prometheus at Mekone explains why the gods get the bones; it does
not date or cause Greek sacrifice, and burnt bone had been accumulating on
the Lykaion altar for centuries before the poem.

Three fields keep it apart: **`whatIsAttested`**, **`aitia`** (typed with
no date, no place and no evidence level it could set to `documented`), and
**`silences`** — required, minimum two, because the mystery ban worked and
household liturgy was never written down. Every class of evidence must
also state what it cannot show.

## A platform-wide gap this closes

`gate:myth-as-history` had five patterns, every one specific to Troy and
Odysseus. Nothing in `src/lib/content-health` matched *god*, *cult*,
*oracle*, *sacrifice*, *priest*, *ritual* or *initiation* — **"the oracle
told him to attack, and he won" passed the build on any page on the
site.**

Nine cult patterns now run over the **whole corpus**. Seven are defused by
naming the source, because *"Livy tells the story that Numa received his
laws from Egeria"* is the sentence we want written. Two are unconditional.
They are unit-tested against the real gate file: nine sentences that must
fire, seven that must not, two that must not be bypassable.

## How the content was written, and what that caught

No prose was written from recall. Four passes: a grounded evidence brief
per subject with explicit per-citation confidence and a required
`uncertainClaims` field; an adversarial fact-check that returned **91
must-fix findings** and failed **four briefs against their own hazard**; a
correction pass; and a fourth pass reading the **rendered HTML**.

Errors caught and fixed include: Jerome's Mithraic grade list, the
Piacenza liver's inscribed face, the Isia dates, the Claudia Quinta
miracle attributed to Livy rather than Ovid, the Menelaion aryballos
naming Helen rather than Menelaos, Cicero's Tages story at *De div.*
2.50–51 rather than book 1, the *spectio/nuntiatio* distinction at
*Philippics* 2.81 rather than *De legibus*, an impossible IG II²
concordance for the Erchia calendar, and Diodorus placing the Isis
self-declaration at Nysa rather than Memphis.

**The worst defect was mine.** A regex meant to turn brief-phrased claims
into sentences already captured the text after "That " and then stripped
five more characters, so 69 of 140 key points shipped as "Edicant recorded
the discharge of a vow." No gate asserts that a claim is well-formed
English. The published-page pass caught it on the first page it opened.

Where two adversarial passes disagreed on Jerome's second Mithraic grade,
the page states the crux rather than picking a side.

## Also corrected outside this phase

The Phase 28 `/architecture/triumphal-arch` record called Josephus an
eyewitness to the triumph of 71 CE. He was in Rome for it and does not say
he watched it. Corrected there as well as here — a known-wrong claim
standing is worse than a scope boundary, the same call made on the museum
attributions in Phase 27.5.

## Validation

```
typecheck   clean
build       exit 0 — 31 new routes, 30 practice pages prerendered
validate:content
  ✓ religion:refs              no issues
  ✓ religion:evidence          no issues
  ✓ religion:boundaries        no issues
  ✓ religion:myth-discipline   no issues
  0 errors, 1 warning
```

The warning is the pre-existing Phase 27.5 backlog counter, reported by
design.

## Known limits

- **Six pages have not had the published-page verification pass** —
  `animal-sacrifice`, `votive-dedication`, `asylum-and-supplication`,
  `curse-tablets-and-binding`, `healing-cult-and-incubation`,
  `womens-religious-office`. Agents failed on API errors and a spend
  limit. They had the first three passes. This is the most significant
  open item and should be closed before merge.
- **No images.** The template supports one; none carries one. No
  licence-verified photograph in the archive depicts religious practice as
  opposed to a building.
- **No browser-based visual QA** — headless throughout this stack.
- **Attic bias**, stated on the pages in `silences` rather than
  generalised away.
- **Missing figure pages** — Varro, Ovid, Lucretius, Hesiod, Pausanias,
  Apuleius. Nothing was invented to fill them.

## Review notes

No existing content was edited apart from the Josephus correction noted
above. Same typed-registry + one-template + `dynamicParams = false`
pattern as every prior phase. Three commits: scaffolding and boundary,
content, verification round.
