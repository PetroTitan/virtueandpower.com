# Phase 26 — Ancient Warfare Encyclopedia

Branch: `feat/warfare-encyclopedia`
Base: `main` @ `84b2745`
Date: 2026-07-28

---

## 1. What was built

| | |
|---|---|
| New routes | **59** (37 topics, 18 battles, 2 indexes, 6 figure pages within existing routes) |
| New registry entries | 55 (37 warfare topics, 18 battles) |
| New MDX entries | 6 commander biographies |
| New images | 9, licence-verified, with provenance |
| New validator checks | 3 (26 total, from 23) |
| Corpus | 471 → 477 entries |
| Build | 567 → 630 static pages |
| Sitemap | 557 → 620 URLs |

Routes: `/warfare`, `/warfare/[topic]` (37, `dynamicParams = false`),
`/warfare/battles`, `/warfare/battles/[slug]` (18, `dynamicParams = false`).

---

## 2. Decisions taken

**Execution order.** Phase 26 first, as approved. Phase 27's
cities/civilizations collision is recorded in
`docs/roadmap-phases-26-30.md` as resolved in favour of **Option A** —
`/cities/*` as the settlement layer, `/civilizations/*` as the polity
layer, enforced by a future check requiring no shared H2 titles and a
mutual link in the first 200 words.

**`mythological` added to the evidence taxonomy, `literary` kept.** The
brief specified MYTHOLOGICAL where the shipped taxonomy had LITERARY.
Renaming would have silently altered the meaning of roughly forty
published Homer claims, and the two are genuinely different: Circe is
*literary* — a character in a particular poem, checkable by opening it —
while Romulus founding Rome is *mythological*, owned by no single text
and doing religious and civic work. Phase 30 needs the distinction.

**Phase 29 dissolved into the other phases.** Six commanders that battle
pages reference did not exist — Leonidas, Miltiades, Hannibal, Mark
Antony, Vercingetorix, Arminius — and were written here. A monolithic
biography phase would have shipped fifteen figures with nothing to link
to; interleaving means each figure arrives with a graph waiting for it.

**Three brief topics merged.** "Operational logistics" and "Engineering"
were folded into `logistics`/`military-supply` and
`roman-engineering`/`siege-warfare` respectively, because separate pages
would have duplicated rather than added. 34 topic pages plus 4
civilization hubs cover the brief's list, less those merges.

**`armor` is filed as `armour`.** The site is consistently British
English. The American spelling appears in the page description so the
term is searchable.

---

## 3. The integrity problem this phase existed to solve

Ancient troop figures are the least reliable numbers in classical
historiography, and repeating them without comment is the standard
failure of popular military history. Herodotus gives Xerxes 1,700,000
fighting men; Arrian gives Darius a million at Gaugamela; Caesar counts a
Gallic relief army of a quarter of a million.

**The schema makes a bare number impossible.** Every figure in the
registry is a `ForceEstimate` carrying four fields: the figure, the
source that gives it, an evidence level, and an assessment of what
modern scholarship makes of it. There is no field in which a naked
number can be stored.

**The template puts the numbers panel first**, above the narrative,
because a reader who meets the figures after the story has already
absorbed them.

**The validator enforces the apparatus.** `warfare:numbers` rejects any
estimate without a source, any assessment shorter than a substantive
sentence, any uncertain date without an explanatory note, and any
`documented` figure that does not explain why it is unusually reliable.
It also flags large bare figures that have leaked into narrative prose
outside the apparatus.

Result: Thermopylae's page shows Herodotus's 1,700,000 and the modern
70,000–150,000 side by side, each labelled, without either being
presented as the answer.

---

## 4. Editorial positions taken

**Sparta is described, not admired.** The Spartan army page states that
the system rested on the permanent subjection of the helots, a
population held by force and against whom war was formally declared each
year, and the registry header records the rule: describing how an army
worked is not endorsing what it was for.

**Reception is separated from evidence.** Thermopylae, Actium and the
Teutoburg Forest all carry `reception` fields describing modern
political appropriation as a fact about modern politics rather than
about antiquity. Arminius's page notes his adoption as a German national
symbol and states that nothing in the ancient evidence supports reading
him as a national founder.

**Reconstruction is labelled as reconstruction.** The manipular line
relief is universally described in modern writing and attested nowhere;
the page says so. *Othismos* is presented as an unresolved dispute
rather than resolved in favour of the orthodox reading. Vegetius is
flagged repeatedly as a late compiler whose material cannot be dated.

**Periodisation is enforced.** "The Roman army" is treated as four
institutions, and the page says that statements which do not specify a
period are usually wrong about at least one of them.

**Sources written by the enemy are marked as such.** Hannibal,
Vercingetorix and Arminius are each known almost entirely through Roman
accounts, and each page opens by saying so.

---

## 5. Adversarial review — what the gate caught

The `warfare:*` checks were written before the content was finished and
immediately caught real defects, including one introduced during
construction:

1. **Three broken registry references.** A blanket find-and-replace
   correcting two `themeRefs` that pointed at an essay slug and a topic
   slug had also rewritten the `military-discipline` topic's own slug,
   breaking three `relatedTopics`/`topicRefs`. TypeScript cannot check
   slug strings; `warfare:refs` resolves every one of them against the
   live corpus and found all three.
2. **A figure with no substantive assessment** — Mantinea's allied
   troops carried "Same caution as for the Theban figure", 38
   characters, below the threshold. Expanded.
3. **A `documented` figure without justification** — Leuctra's 400 of
   700 Spartiate dead. Reworded to state why it is unusually reliable: a
   proportion of a stated total, from a contemporary with Spartan
   sympathies.
4. **A bare figure in narrative prose** — "a thousand were taken
   prisoner" at Chaeronea. Moved into the apparatus as a sourced
   `ForceEstimate` with Diodorus cited and its roundness noted.
5. **Five topics marking every key point `documented`.** Reviewed
   individually; four gained a genuinely disputed or unknown point that
   had been missing (phalanx intervals, Egyptian army strengths, how
   closely real camps followed the textbook plan, whether the testudo
   was used in open battle), and one superlative claim about Kadesh was
   downgraded from documented to probable.
6. **A thin key point** on the Republican levy, expanded.

Two further corrections came from manual review rather than the gate:

7. **Two battle pages had been given photographs of unrelated sites** —
   Masada on Alesia, Housesteads on the Teutoburg Forest. Both removed.
   A battle page must not illustrate itself with a different
   battlefield, however apt the analogy.
8. **A Corinthian helmet had been assigned to the body-armour page.**
   Moved to the Greek warfare hub.

---

## 6. Content notes and known limits

**Mantinea.** Three major battles were fought on that plain, in 418, 362
and 207 BCE. This phase covers 362; the page states the ambiguity
explicitly and flags 418 as a separate subject.

**Zama** is the one battle here whose location is marked `unknown`. The
ancient sources disagree and no site has been confirmed — an unusual
situation for a decisive battle of a major war, and recorded rather than
smoothed.

**Adrianople** cites a single primary source, Ammianus. The validator
warns on fewer than two sources; Adrianople is explicitly exempted in
the check, and the page says that only one contemporary account
survives.

**Egyptian warfare has no battle pages.** Kadesh and Megiddo belong in
the registry and were not written in this phase; the Egyptian hub and
army pages stand without them, which the `relatedBattles: []` records
honestly rather than padding.

**No screenshot or browser-based visual QA.** Verification was against
built HTML: single `h1` per page, zero images without `alt`, 404 on
unknown topics, canonical URLs, sitemap coverage.

---

## 7. Verification

- `npm run typecheck` — clean
- `npm run lint` — clean
- `npm run validate:content:report` — **26 checks, 0 errors, 0 warnings**
- `npm run build` — clean, 630 static pages
- Sitemap 620 URLs; 37 topics and 18 battles all present
- `/warfare/not-a-topic` returns 404 (`dynamicParams = false` working)
- Canonicals verified on all new route families
- Accessibility: single `h1` per page, 0 images without alt text
- 9 images licence-verified via the Commons API before download: 1 CC0,
  2 public domain, 6 CC BY-SA — recorded per file with full provenance
  in the registry and the per-directory READMEs
- No client-side JavaScript added

---

## 8. Architecture left ready for Phases 27, 28 and 30

The pattern proven here transfers directly:

- **Registry + one template + `dynamicParams = false`** is now used by
  the Odyssey book divisions, the film cluster and the warfare
  encyclopedia. Cities, architecture and religion use it unchanged.
- **`ForceEstimate`'s shape** — claim, source, evidence level,
  assessment — generalises to any contested quantity. Phase 27 needs it
  for ancient city populations, which are as unreliable as troop numbers
  and are quoted with equal confidence.
- **`warfare:refs`** is a template for the referential-integrity check
  each later registry needs.
- **The evidence taxonomy** now carries `mythological`, which Phase 30
  requires for deities whose cult is documented and whose stories are
  not.

---

## 9. PR title and body

**Title:**
`Phase 26: Ancient Warfare Encyclopedia — 37 topics, 18 battles, and an evidence apparatus for ancient troop figures`

**Body:** see `docs/PR-BODY-phase-26.md`.
