# Phase 26: Ancient Warfare Encyclopedia

First phase of the Classical Civilization roadmap, built on the approved
order (26 → 27 → 28 → 30, with biographies interleaved). Full plan in
`docs/roadmap-phases-26-30.md`; full report in `docs/phase-26-warfare.md`.

**59 new routes** — 37 warfare topics, 18 battles, 2 indexes, and 6
commander biographies the battle pages needed. Corpus 471 → 477. Build
567 → 630 static pages. Validator 23 → 26 checks.

## The problem this phase is built around

Ancient troop figures are the least reliable numbers in classical
historiography. Herodotus gives Xerxes 1,700,000 men; Arrian gives Darius
a million; Caesar counts a quarter-million Gauls. Repeating them without
comment is the standard failure of popular military history.

**The schema makes a bare number impossible to store.** Every figure is a
`ForceEstimate` carrying the figure, the source that gives it, an
evidence level, and an assessment of what modern scholarship makes of it.
The template puts that panel *above* the narrative, because a reader who
meets the numbers afterwards has already absorbed them. The validator
rejects any estimate without a source, any assessment shorter than a
substantive sentence, any `documented` figure that does not explain why
it is unusually reliable, and any large bare figure that has leaked into
narrative prose.

Thermopylae's page therefore shows 1,700,000 and 70,000–150,000 side by
side, each labelled, with neither presented as the answer.

## Architecture

Registry + one template + `dynamicParams = false` — the same pattern the
Odyssey book divisions and the film cluster already use. Adding a battle
is adding an object; the route, index, sitemap and validator pick it up.
Sized for well over 100 battles.

`mythological` was **added** to the evidence taxonomy rather than
replacing `literary`. Renaming would have silently altered ~40 published
Homer claims, and the two differ: Circe is literary (a character in a
particular poem), Romulus founding Rome is mythological (owned by no
single text). Phase 30 needs the distinction.

## Editorial positions

Sparta is described, not admired — the page states that its military
capacity rested on the permanent subjection of the helots. Reception is
separated from evidence: Thermopylae, Actium and Arminius all carry
fields describing modern political appropriation as a fact about modern
politics. Reconstruction is labelled as reconstruction — the manipular
line relief is attested nowhere and the page says so. "The Roman army" is
treated as four institutions. Hannibal, Vercingetorix and Arminius are
each known through their enemies' accounts, and each page opens by
saying so.

## Adversarial review

The `warfare:*` checks were written before the content was finished and
caught eight real defects, including one introduced during construction:
three broken registry references from a blanket find-and-replace that had
rewritten a topic's own slug; a figure with no substantive assessment; a
`documented` figure without justification; a bare figure in narrative
prose; five topics marking every key point `documented`, four of which
gained a genuinely disputed point that had been missing.

Two further corrections came from manual review: two battle pages had
been given photographs of *unrelated* sites (Masada on Alesia,
Housesteads on Teutoburg). Both removed — a battle page must not
illustrate itself with a different battlefield.

## Verification

- `typecheck`, `lint`, `build` — clean, 630 static pages
- `validate:content:report` — **26 checks, 0 errors, 0 warnings**
- Sitemap 620 URLs; all 37 topics and 18 battles present
- `/warfare/not-a-topic` → 404
- Single `h1` per page; 0 images without alt text
- 9 images licence-verified via the Commons API before download, full
  provenance in registry and per-directory READMEs
- No client-side JavaScript added

## Known limits

Zama's location is marked `unknown` — the sources disagree and no site is
confirmed. Adrianople rests on a single primary source and says so.
Egyptian warfare has no battle pages yet; `relatedBattles: []` records
that rather than padding. No browser-based visual QA.

## Not merged

Pushed for review. Phase 27 (Cities) is specified and waiting.
