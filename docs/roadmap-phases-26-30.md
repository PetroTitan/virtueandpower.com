# Roadmap: Phases 26–30

> **Revised 2026-07-28 on the owner's direction.** Two changes, both adopted:
> a new **Phase 27.5 — Archaeology & Museums** inserted between Cities and
> Architecture, and **Phase 29 changed from Biographies to Institutions &
> Government**. Reasoning recorded in §10 below.

Classical Civilization expansion — warfare, cities, architecture,
biographies, religion.

Base: `main` @ `84b2745` (after PR #27, the Homer / Odyssey cluster).
Prepared: 2026-07-28.

---

## 1. What already exists

An accurate picture of the current platform, because several proposed
phases collide with content that is already published.

**Corpus: 471 entries across 9 content kinds.**

| Kind | Count | Route |
|---|---|---|
| philosopher | 68 | `/philosophers/[slug]` |
| theme | 124 | `/themes/[slug]` |
| essay | 120 | `/essays/[slug]` |
| book | 66 | `/books/[slug]` |
| comparison | 42 | `/comparisons/[slug]` |
| civilization | 23 | `/civilizations/[slug]` |
| figure | 16 | `/figures/[slug]` |
| guide | 11 | `/guides/[slug]` |
| quote | 1 | `/quotes/[slug]` |

**Typed registries:** 82 archive images, 14 busts, 9 maps, 10 timelines,
50 sources, plus the Homer-cluster registries (evidence taxonomy,
Odyssey books, film/claims/comparison).

**Validation:** 23 content-health checks, currently 0 errors 0 warnings,
including the 12-check editorial safety gate.

### Coverage against the proposed phases

| Phase | Existing coverage | Verdict |
|---|---|---|
| 26 Warfare | Thematic only — `war-and-peace`, `military-command`, `military-virtue`, `military-innovation`, `army-and-state`, `the-roman-army-as-a-political-institution`. **Zero battle pages. Zero warfare-topic pages.** | Greenfield |
| 27 Cities | **Athens, Sparta, Rome and Babylon already exist as `civilization` entries.** Corinth, Delphi, Olympia, Ostia, Pompeii, Alexandria, Memphis, Persepolis, Susa, Troy do not. | **Collision — needs a decision** |
| 28 Architecture | Essentially nothing. | Greenfield |
| 29 Biographies | 68 philosophers, but almost no scientists, engineers, physicians, architects or playwrights. `ptolemy-i` exists — the Successor **king**, not Claudius Ptolemy the astronomer. | Greenfield + name collision |
| 30 Religion | `state-and-religion`, `divine-agency-in-homer`, `akhenaten-and-religious-revolution`. | Near-greenfield |

**Commanders already present** (12 of 18 the battle list needs):
alexander, julius-caesar, pericles, themistocles, epaminondas,
scipio-africanus, pompey, augustus, cyrus-the-great, darius-i, xerxes-i,
philip-ii.
**Missing:** leonidas, miltiades, hannibal, mark-antony, vercingetorix,
arminius.

---

## 2. Three architectural decisions to take before building

### 2.1 The cities / civilizations collision — **blocking for Phase 27**

`/civilizations/athens`, `/sparta`, `/rome` and `/babylon` are published,
indexed pages. Creating `/cities/athens` alongside them produces two
pages competing for the same query on the same site. Three options:

**Option A — Cities as the settlement layer, civilizations as the
polity layer.** `/cities/athens` covers the physical city: urban plan,
monuments, archaeology, museum holdings, excavation history.
`/civilizations/athens` keeps the political and cultural order. Each
carries a one-line disambiguation pointing at the other.
*Pro:* both are genuinely distinct subjects; strongest total coverage;
matches how museums and universities split the material.
*Con:* four pairs of pages need careful, explicit differentiation or
they cannibalise each other.

**Option B — No city pages for the four that exist.** Deepen the four
civilization entries with the city material (archaeology, monuments,
urban planning) and create `/cities/*` only for the ten that have no
civilization entry.
*Pro:* zero duplication risk; honours "do not replace existing systems"
most literally; least work.
*Con:* asymmetric — Delphi gets a city page, Athens does not; the city
layer is incomplete as a browsable set.

**Option C — Cities become canonical for all fourteen**, and the four
civilization entries are narrowed to the polity with redirects for
city-intent queries.
*Pro:* one clean settlement layer.
*Con:* rewrites four published, indexed pages. Highest risk, and closest
to "replacing an existing system".

**Recommendation: Option A**, with a hard rule enforced by a new
content-health check — a city page and its civilization counterpart may
not share an H2 section title, and each must link to the other in its
first 200 words. That converts the risk into a validated constraint.

### 2.2 The evidence taxonomy — `MYTHOLOGICAL`

The brief specifies DOCUMENTED / PROBABLE / DISPUTED / UNKNOWN /
**MYTHOLOGICAL**. The shipped taxonomy in `src/data/evidence.ts` is
DOCUMENTED / PROBABLE / DISPUTED / **LITERARY** / UNKNOWN.

**Recommendation: add `mythological` as a sixth level rather than
renaming `literary`.** They are genuinely different and Phase 30 needs
the distinction:

- `literary` — belongs to a specific poetic construction. Circe is a
  character in the *Odyssey*.
- `mythological` — belongs to shared religious or mythic tradition not
  owned by any one text. Romulus founding Rome; the Twelve Olympians.

Renaming would also silently alter the meaning of ~40 published Homer
claims. Additive is cheaper and more accurate.

### 2.3 Name collisions

`ptolemy-i` is the Successor king. Claudius Ptolemy the astronomer needs
a distinct slug — recommend `claudius-ptolemy`. A validator rule should
reject any new slug within Levenshtein distance 2 of an existing one
across kinds, to catch the next one automatically.

---

## 3. Recommended execution order

The brief's numbering is 26 → 30. The dependency graph suggests a
different order for three of the five.

```
                    ┌─────────────────┐
                    │  27  CITIES     │ ← spine: battles happen near them,
                    └────────┬────────┘   buildings stand in them,
                             │            cults are practised in them
        ┌────────────────────┼────────────────────┐
        ▼                    ▼                    ▼
┌───────────────┐   ┌────────────────┐   ┌────────────────┐
│ 26  WARFARE   │   │ 28 ARCHITECTURE│   │ 30  RELIGION   │
└───────┬───────┘   └────────┬───────┘   └────────┬───────┘
        │                    │                    │
        └────────────────────┼────────────────────┘
                             ▼
                    ┌─────────────────┐
                    │ 29 BIOGRAPHIES  │ ← feeds all four; best interleaved
                    └─────────────────┘   rather than built as one block
```

**Recommended order: 26 → 27 → 28 → 30, with 29 dissolved and
interleaved.**

Reasoning, stated honestly including where it cuts against the
dependency diagram:

1. **Phase 26 first, despite Cities being the spine.** Battle pages can
   already link to a strong graph — 23 civilizations, 12 of the 18
   commanders, and six military themes exist today. The dependency on
   cities is weak (a battle links to a region and a polity, rarely to an
   urban plan). Against that, Warfare is the largest greenfield, carries
   by far the highest search demand, and requires the **scalable
   registry-plus-template architecture that all four later phases
   reuse**. Proving that pattern on the hardest case first de-risks
   everything after it.
2. **Phase 27 second**, once the pattern is proven, because the cities
   decision in §2.1 is the most delicate piece of editorial surgery in
   the roadmap and should not be attempted while the underlying
   architecture is still moving.
3. **Phase 28 third.** Architecture needs cities badly — a temple that
   cannot say which city it stands in is a stub. It also needs
   Vitruvius, who arrives with the interleaved biographies.
4. **Phase 30 fourth.** Religion needs Delphi, Olympia and Eleusis
   (Phase 27) and temple architecture (Phase 28) to be more than a
   glossary.
5. **Phase 29 dissolved.** A monolithic biography phase would front-load
   fifteen figures whose pages have nothing to link to yet. Instead each
   phase adds the figures it needs: Phase 26 brings the six missing
   commanders; Phase 28 brings Vitruvius, Archimedes, Heron; Phase 30
   brings the religious figures; a final consolidation pass adds the
   remainder (Euclid, Hippocrates, Galen, the tragedians, Phidias,
   Praxiteles) with a full graph waiting for them.

**If you prefer to follow 26 → 30 literally**, the only change I would
insist on is still interleaving the commanders into Phase 26, because
eighteen battle pages linking to six non-existent figures would ship
with broken references and the validator would block the build.

---

## 4. Content volume estimate

| Phase | Pages | New MDX | Registry entries | Images |
|---|---:|---:|---:|---:|
| 26 Warfare | 58 + 6 figures | 6 | ~54 | 12–16 |
| 27 Cities | 14 (or 10 under Option B) | 14 | ~14 | 20–28 |
| 28 Architecture | 27 | 3 | ~26 | 18–24 |
| 30 Religion | 23 | 8 | ~19 | 12–16 |
| 29 Consolidation | 12–15 | 12–15 | — | 10–14 |
| **Total** | **~140** | **~45** | **~113** | **~75–95** |

Phase 26 detail: 4 civilization warfare hubs + 36 topic pages + 18
battle pages (architecture sized for 100+) + 6 commander biographies.

Corpus projection: 471 → ~610 entries. Build: 567 → ~710 static pages.

---

## 5. Reusable templates — nothing new needs inventing

Everything below already exists in production and was proven by the
Homer cluster.

**The scalable-registry route pattern.** `/books/[slug]/[division]` with
`dynamicParams = false` generates the 24 Odyssey book pages from one
typed registry and one template, 404ing anything not in the registry.
**This is exactly the pattern for 100+ battle pages** — one
`battles.ts`, one template, one route.

**The evidence taxonomy.** `EvidenceBadge`, `EvidenceKey`,
`EvidenceClaim` — typed, registered for MDX, colour never the only
signal. Directly reusable by all five phases.

**The `figure` content kind.** Built for mythological characters with
required `historicity` and `attestedIn`. Phase 30 needs exactly this for
deities, and Phase 27 for city foundation figures.

**Page shells.** `StudyLanding` (hub pages), `PageHeader`, `Container`,
`RelatedReading`, `EditorialGrid`, `SectionIntro`, `FilmPageShell` (the
pattern for any multi-page cluster with shared sourcing notes).

**Visual pipeline.** `scripts/vendor-*.mjs` verifies licence, author and
dimensions via the Commons API before download, re-encodes to WebP, and
prints registry lines. `ArchiveImage`, `BustImage`,
`InlineArchiveFragment`, `AtmosphereStrip` render them.

**SEO.** `buildMetadata`, `breadcrumbJsonLd`, `articleJsonLd`,
`personJsonLd`, `bookJsonLd`, `movieJsonLd`. Phases 26–28 need one
addition: `placeJsonLd` for cities and `landmarkJsonLd` for buildings.

**Validation.** 23 checks including the editorial gate. Each phase adds
its own rules to `runAllChecks`.

**New components required across the whole roadmap: three.** A
`BattleCard`, a `CityCard`, and a `StatBlock` for the structured
military/urban data. Everything else is composition.

---

## 6. Per-phase specification

### Phase 26 — Ancient Warfare Encyclopedia

**Branch:** `feat/warfare-encyclopedia`

**Architecture.** `src/data/warfare.ts` (topics), `src/data/battles.ts`
(battles, sized for 100+). Routes: `/warfare` index, `/warfare/[topic]`,
`/warfare/battles` index, `/warfare/battles/[slug]`, and four hubs at
`/warfare/greek`, `/warfare/roman`, `/warfare/persian`,
`/warfare/egyptian`.

**Battle schema.** Name, date with evidence level, belligerents,
commanders (refs into `philosopher`), location with modern
identification and its own evidence level, forces engaged (**every
troop number carries an evidence level and a source — ancient casualty
and army figures are notoriously inflated and the platform must say so
rather than repeat Herodotus's millions**), outcome, tactical analysis,
strategic consequence, primary sources by book and line, archaeology,
disputes, and related battles.

**Editorial hazards.** Ancient army sizes are the single biggest
integrity risk in this phase — Herodotus's 1.7 million Persians at
Doriscus and Thermopylae's numbers are literary, not documentary.
Thermopylae and Marathon also carry heavy modern political
appropriation, which the pages must describe as reception rather than
adopt. Every battle page states what is DOCUMENTED, what is PROBABLE,
what is DISPUTED and what is UNKNOWN about the engagement.

**New validator rules.** No troop figure without an evidence level and
a source; no battle without at least two primary-source citations; no
battle date asserted as certain where the ancient sources disagree.

### Phase 27 — Ancient Cities

**Branch:** `feat/ancient-cities`
Depends on the §2.1 decision. New `city` content kind or registry, with
`placeJsonLd`, historical maps from the existing `maps.ts`, and the
disambiguation check described above.

### Phase 28 — Ancient Architecture

**Branch:** `feat/ancient-architecture`
`src/data/architecture.ts`. Every building links to a city, a
civilization, a construction technique, and where known an architect.
Adds `landmarkJsonLd`.

### Phase 30 — Ancient Religion

**Branch:** `feat/ancient-religion`
The most sensitive phase. Hard rule: describe, never advocate, ridicule
or promote. Four registers kept separate on every page — religious
tradition, historical evidence, archaeology, literary tradition — which
is what the `figure` kind's `attestedIn` field already does for Homeric
deities and what the gate already enforces for Athena and Poseidon
(cult documented, stories literary).

### Phase 29 — Biographies

Interleaved as described, with a final consolidation branch.

---

## 7. Per-phase definition of done

Identical to the Homer cluster's standard:

- `npm run typecheck`, `npm run lint`, `npm run validate:content:report`,
  `npm run build` all clean
- 0 broken refs, 0 orphans
- Every new route in the sitemap, canonical verified
- JSON-LD present and correct; no unsupported claims in structured data
- Every image licence-verified with full provenance and alt text
- Single `h1` per page; wide content in its own scroll container
- Adversarial review of the phase's own claims, with corrections applied
- Full report in `docs/`, separate branch, separate PR, no merge without
  approval

---

## 10. Revised roadmap (owner direction, 2026-07-28)

**Approved order:**

`26 Warfare` ✅ → `27 Cities` → `27.5 Archaeology & Museums` →
`28 Architecture` → `29 Institutions & Government` → `30 Religion`

### 10.1 Phase 27.5 — Archaeology & Museums (new)

The gap this closes is real and is the largest remaining E-E-A-T deficit
on the platform. There are 14 busts and 91 archive images in the
registries, each with a licence and a photographer, and almost none with
an object provenance: findspot, excavation date, excavator, holding
institution, inventory number, material, condition, restoration history,
attribution debate, bibliography.

The worked example is exact. The Julius Caesar figure page shows a
portrait; what it does not say is that the Tusculum portrait was found at
Tusculum in 1825 by Lucien Bonaparte, is in the Museo di Antichità in
Turin, is one of only two portrait types with a serious claim to be
made in Caesar's lifetime, and that its identification is argued.

**Architecture.** A new `ObjectProvenance` registry keyed to the existing
bust and archive-image slugs, so nothing is replaced — the provenance
layer attaches to what already ships. New routes at `/museums` and
`/museums/[slug]`, and an object detail view. Estimated 40–60 provenanced
objects, 12–20 museum pages.

**Dependency.** It runs after Cities because a museum page is
substantially improved by being able to say which city its holdings came
out of, and city pages are written in Phase 27 with a `museums` field
already in the schema for 27.5 to consume.

### 10.2 Phase 29 — Institutions & Government (replaces Biographies)

Correct call: the corpus already holds 74 figures, so a biography phase
would have been marginal, whereas the institutional layer is absent
almost entirely.

Scope: Roman Senate, Ecclesia, Gerousia, Areopagus, Boule, consul,
praetor, tribune, censor, dictator, aedile, quaestor, satrap, strategos,
archon, ephor, Roman citizenship, Roman provinces, Roman taxation, Roman
law, imperial administration, the assemblies and councils. Roughly 24–30
pages.

**Dependency.** It runs after Architecture because several institutions
are inseparable from their buildings — the Senate from the Curia, the
Ecclesia from the Pnyx, the Areopagus from its hill — and those are
Phase 28 pages.
