# Phase 29 — Institutions & Government

Branch: `feat/institutions-government`
Stack position: fifth (warfare → cities → archaeology-museums → architecture → **institutions**)
Status: built, validated, pushed. **Not merged.**

---

## 1. What was asked, and what changed from the original roadmap

The master roadmap for Phases 26–30 listed Phase 29 as *Biographies*. That
was revised on the user's instruction:

> "Не 'Biographies'. Зараз у вас вже сотні біографій. Краще Institutions &
> Government."

The point was correct. The platform already carries several hundred
biographical pages across `philosophers`, `figures` and the essay layer,
and a biographies phase would have been the first phase in this sequence
to compete with existing content rather than extend it. Institutions was
substituted, with the user's suggested list as the starting scope.

The user's list was: Roman Senate, Ecclesia, Gerousia, Areopagus, Consul,
Praetor, Tribune, Censor, Dictator, Satrap, Strategos, phalanx command,
Roman taxation, Roman citizenship, Roman provinces, Roman law, Assembly,
Council, imperial administration.

Everything on it is covered except **phalanx command**, which is
deliberately *not* covered here — see §4.

---

## 2. What was built

**29 institution pages** under `/institutions/[slug]`, plus the index at
`/institutions`. 30 new routes; 743 URLs in the sitemap.

Organised in eight tiers, in this display order:

| Tier | Count | Entries |
|---|---|---|
| Constitutional principles | 2 | collegiality-and-annuality, imperium |
| Greek assemblies and courts | 4 | ecclesia, boule, dikasteria, areopagus |
| Greek offices | 3 | ostracism, archon, strategos |
| Spartan institutions | 2 | gerousia, ephors |
| Roman magistracies | 7 | consul, praetor, tribune-of-the-plebs, censor, aedile, quaestor, dictator |
| Roman deliberative bodies | 3 | roman-senate, roman-assemblies, cursus-honorum |
| The Roman state | 6 | roman-law, roman-citizenship, roman-provinces, roman-taxation, census-and-assessment, imperial-administration |
| Near Eastern and Egyptian administration | 2 | satrap, pharaonic-administration |

Each page carries four prose sections (*What it was* / *How it worked* /
*Powers and limits* / *How it changed*), evidence-levelled key points,
glossed technical terms, primary sources, and — where there is one — a
stated open question with the competing positions written out.

Files added:

- `src/data/institutions.ts` — the registry (~2,000 lines)
- `src/app/institutions/page.tsx` — index
- `src/app/institutions/[slug]/page.tsx` — template
- `src/lib/content-health/institutions-gate.ts` — four checks

Files modified: `src/app/sitemap.ts`, `src/lib/site.ts` (nav, two places),
`src/app/page.tsx` (homepage band), `src/lib/content-health/checks.ts`
(gate wiring).

**No existing content was edited.** The architecture is the same typed
registry + one template + `dynamicParams = false` pattern used by warfare,
cities, museums and architecture. No new system was introduced.

---

## 3. The collision risk this phase carried, and how it was handled

This layer sits closer to an existing one than any phase before it. The
civilization pages already describe political order — they carry H2s like
"Constitutional structure", "Political structure", "Administrative
structure". A page on the consulship is one careless heading away from
being a second, thinner `/civilizations/roman-republic`.

The division adopted:

> **The civilization layer covers the political *order*. The institutions
> layer covers a single *organ* of it.**

This is the same solution as the Phase 27 place/polity split, and it is
enforced the same way — mechanically, not by intention.

`INSTITUTION_SECTION_HEADINGS` is declared in the registry and checked
against the H2s of **every** civilization page (not just a named
counterpart, because an institution belongs to several polities at once).
A collision in either direction fails the build. It currently passes,
and the two heading sets are disjoint by construction:

- civilizations: "Political structure", "Constitutional structure",
  "Administrative structure", "Constitutional and political structure",
  "Military and administrative structure"
- institutions: "What it was", "How it worked", "Powers and limits",
  "How it changed", "What the evidence supports", "Terms", "Open
  questions", "Primary sources"

Every institution page links up to the civilizations it belonged to, and
the check fails if an institution names no civilization at all.

---

## 4. The warfare boundary — why phalanx command is not here

The user's list included *phalanx command*. It is not covered on this
layer, and that is deliberate.

`command-structure`, `recruitment`, `military-discipline` and
`battle-tactics` are already warfare topics from Phase 26. Writing them
again as institutions would produce two pages competing for one query and
two accounts that could drift apart — the exact failure the architecture
phase established the deferral pattern to prevent.

So `INSTITUTIONS_DEFER_TO_WARFARE` records four deferrals with reasons.
The validator checks each `warfareSlug` resolves, that the reason is
substantive, and that no institution's title has quietly taken a deferred
subject back. Every institution page whose `warfareRefs` touch a deferred
subject renders a **"Covered elsewhere"** block naming the warfare page
and stating why the boundary falls where it does. The index carries the
same statement in its sidebar.

Shared-slug collision with warfare *and* with architecture is a hard
build failure.

---

## 5. Evidence discipline

The specific hazard of constitutional history is that almost nobody who
described these systems had seen one working. Livy wrote about
fifth-century Rome from the first century BCE. Plutarch described
Lycurgus without being able to say when — or whether — he lived.
Aristotle described Sparta while arguing its constitution was defective.
The temptation is a tidy diagram of powers presented as a record.

Four rules, all enforced:

1. **Two primary sources minimum.** A constitutional page resting on one
   author is that author's reconstruction, not the institution.
2. **At least one open or non-documented point per page.** A page with
   nothing unsettled on it is almost certainly overstating what is known.
3. **`documented` must name its evidence.** The check rejects "the
   sources" as an answer — it requires an inscription, a papyrus, an
   excavated object, a coin, the fasti, a named text. Six details were
   rewritten to satisfy this rather than the check being loosened; the
   check's vocabulary was widened only to admit *physical* evidence
   (coins, reliefs, ballots, allotment tokens, sherds), which it had been
   wrongly rejecting.
4. **A named dispute must state the sides.** Fewer than 80 characters of
   positions fails. Saying experts disagree without saying about what
   tells the reader nothing.

Worked examples of what this produced:

- **ostracism** — the pre-inscribed sherd deposit is presented as evidence
  of organised political management of the vote, which is what it is,
  rather than as evidence of popular feeling.
- **census-and-assessment** — the surviving figures are described as
  *registration totals*, not counts of inhabitants, and the unresolved
  question of what the Augustan figures count is stated as unresolved.
- **roman-law** — the extent of Justinian's editing of the Digest is
  written as an open question with both positions, because "that editing
  occurred" and "how much" have very different evidential standing.
- **satrap** — Herodotus's tribute list is explicitly *not* treated as an
  imperial budget.
- **ephors** — Aristotle's account is flagged as a critique being argued,
  not a description being reported.

---

## 6. Validation

```
npm run typecheck   clean
npm run build       exit 0 — 30 new routes, 29 institution pages prerendered
npm run validate:content

  ✓ institutions:refs             no issues
  ✓ institutions:evidence         no issues
  ✓ institutions:no-duplication   no issues
  ✓ institutions:organ-vs-order   no issues

  0 errors, 1 warning
```

The single warning is the pre-existing Phase 27.5 backlog counter (11
object provenance records awaiting verification against published
catalogues). It is reported by design so the number cannot drift upward
unnoticed.

The gate count is now **39 checks**.

Fourteen broken cross-registry references were caught by
`institutions:refs` before any of it shipped — `constantinople` and
`ephesus` are not cities in the registry, `roman-roads` is a warfare topic
and not an architecture one, `frontier-defence` does not exist. This is
exactly what the check is for: registry slugs are plain strings and
TypeScript cannot check them.

Rendered-page spot check (`/institutions/roman-senate`): 3,579 words, all
eight section headings present, 57 unique resolving outbound links including the
warfare deferral block, the civilization links, and both directions of the
sibling institution graph.

---

## 7. Known limits

- **No images.** The registry has an `imageSlug` field and the template
  renders it, but no institution currently carries one. There is no
  licence-verified photograph in the archive that depicts an institution
  rather than a building, and using a photograph of the Curia to
  illustrate "the Senate" would repeat the Phase 26 error of illustrating
  a subject with a picture of something adjacent to it.
- **No browser-based visual QA.** As in every phase in this stack, the
  environment is headless. Rendering was verified from the prerendered
  HTML, not visually.
- **`figureRefs` gaps.** Cleisthenes, Sulla, the Gracchi and Cato the
  Elder have no biography page, so institutions that would naturally link
  to them do not. Nothing was invented to fill this; the links are simply
  absent.
- **No PR opened.** `gh` is not available in this environment. The branch
  is pushed and ready.

---

## 8. Next

Phase 30 — Ancient Religion, the last of the roadmap. Its collision
surface is with the existing `state-and-religion`,
`sacred-kingship-in-egypt`, `afterlife-and-order` and
`divine-agency-in-homer` themes, and with the temple page in the
architecture layer. The same boundary discipline will apply.
