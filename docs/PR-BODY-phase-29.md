# Phase 29: Institutions & Government

Fifth phase of the Classical Civilization roadmap, and the fifth branch in
the stack (`warfare → cities → archaeology-museums → architecture →
institutions`). Full report in `docs/phase-29-institutions.md`; roadmap in
`docs/roadmap-phases-26-30.md` §10.

**30 new routes** — 29 institution pages and one index. Sitemap 713 → 743
URLs. Validator 35 → 39 checks.

Phase 29 was originally *Biographies* and was changed on request: the
platform already carries several hundred biographical pages, so a
biographies phase would have been the first in this sequence to compete
with existing content instead of extending it.

## The problem this phase is built around

Almost nobody who described these constitutions had seen one working.
Livy wrote about fifth-century Rome from the first century BCE. Plutarch
described Lycurgus without being able to say when — or whether — he
lived. Aristotle described Sparta while arguing its constitution was
defective. The standard failure of popular constitutional history is a
tidy diagram of powers presented as a record.

So on this layer a claim marked `documented` has to name what documents
it — an inscription, a papyrus, an excavated object, a coin, the fasti, a
named text. **"The sources" is rejected by the validator.** Six details
were rewritten to satisfy that rather than the check being weakened.

Every page must also carry at least one thing that is not settled, cite
at least two primary sources, and — where it names a dispute — write out
the competing positions rather than noting that experts disagree.

## The collision this phase carried

This layer sits closer to an existing one than any phase before it. The
civilization pages already carry H2s like "Constitutional structure" and
"Political structure". A page on the consulship is one careless heading
away from being a second, thinner `/civilizations/roman-republic`.

The division: **civilizations cover the political order; institutions
cover a single organ of it.** Enforced the same way as the Phase 27
place/polity split — mechanically. `INSTITUTION_SECTION_HEADINGS` is
checked against the H2s of *every* civilization page, and a collision in
either direction fails the build.

## The warfare boundary

The requested scope included *phalanx command*. It is deliberately not
covered here: `command-structure`, `recruitment`, `military-discipline`
and `battle-tactics` are already warfare topics from Phase 26, and writing
them again would produce two pages competing for one query.

`INSTITUTIONS_DEFER_TO_WARFARE` records the four deferrals with reasons.
The validator checks each resolves, and catches an institution whose title
has quietly taken a deferred subject back. Pages whose `warfareRefs` touch
a deferred subject render a **"Covered elsewhere"** block, so the boundary
is visible to a reader and not only to the build.

## What is in it

| Tier | Entries |
|---|---|
| Constitutional principles | collegiality-and-annuality, imperium |
| Greek assemblies and courts | ecclesia, boule, dikasteria, areopagus |
| Greek offices | ostracism, archon, strategos |
| Spartan institutions | gerousia, ephors |
| Roman magistracies | consul, praetor, tribune-of-the-plebs, censor, aedile, quaestor, dictator |
| Roman deliberative bodies | roman-senate, roman-assemblies, cursus-honorum |
| The Roman state | roman-law, roman-citizenship, roman-provinces, roman-taxation, census-and-assessment, imperial-administration |
| Near Eastern and Egyptian administration | satrap, pharaonic-administration |

## Validation

```
typecheck                        clean
build                            exit 0 — 29 institution pages prerendered
institutions:refs                no issues
institutions:evidence            no issues
institutions:no-duplication      no issues
institutions:organ-vs-order      no issues
                                 0 errors, 1 warning
```

The warning is the pre-existing Phase 27.5 backlog counter (11 object
provenance records awaiting verification), reported by design.

`institutions:refs` caught fourteen broken cross-registry references
before any of this shipped — `constantinople` and `ephesus` are not
cities in the registry, `roman-roads` is a warfare topic rather than an
architecture one, `frontier-defence` does not exist.

## Known limits

- **No images.** The template supports one; no institution carries one.
  There is no licence-verified photograph in the archive that depicts an
  institution rather than a building, and putting the Curia on "the
  Senate" would repeat the Phase 26 error of illustrating a subject with
  a picture of something adjacent to it.
- **No browser-based visual QA** — the environment is headless. Rendering
  was verified from the prerendered HTML.
- **Four missing biographies** — Cleisthenes, Sulla, the Gracchi, Cato the
  Elder. Nothing was invented; the links are simply absent.

## Review notes

No existing content was edited. Same typed registry + one template +
`dynamicParams = false` pattern as warfare, cities, museums and
architecture. No new system introduced.

Five commits, in dependency order: registry → routes → gate → wiring →
docs.
