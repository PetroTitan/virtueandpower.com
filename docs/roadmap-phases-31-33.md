# Roadmap: Phases 31–33 — completing the evidence ladder

Prepared 2026-08-19, against `main` @ `b989db5` (after PR #29, ancient
religion).

This document exists because a six-phase brief arrived proposing Cities →
Archaeology → Architecture → Institutions → Religion → Museums, and five
of those six are already built, merged and in the sitemap. What follows
is the audit that established that, and the three phases that are
genuinely left.

---

## 1. Audit — what the brief proposed against what exists

| Brief phase | Repository status | Evidence |
|---|---|---|
| 27 Ancient cities | **Shipped** as Phase 27 | `/cities` + 14 cities, `src/data/cities.ts`, 3 gate checks |
| 28 Archaeology & museum objects | **Half shipped** as Phase 27.5 | `/museums` (19), `/objects` (22) exist. **No archaeological-site layer.** |
| 29 Ancient architecture | **Half shipped** as Phase 28 | `/architecture` + 26 *types*. **No named-monument pages** — 70 monuments exist only as inline `BuildingExample` data with no URL. |
| 30 Institutions & government | **Shipped** as Phase 29 | `/institutions` + 29 offices and bodies |
| 31 Ancient religion | **Shipped** as Phase 30 | `/ancient-religion` + 30 cult practices (namespaced away from the existing `/religion-and-wisdom`) |
| 32 Museum encyclopedia | **Thin** | 19 institutions exist as a provenance-support layer, not as an encyclopedia. Five priority institutions absent. |

Baseline measured on `b989db5`:

| | |
|---|---|
| MDX corpus | 486 entries (485 published, 1 stub) |
| Typed registries | 14 cities · 26 architecture types · 29 institutions · 30 cult practices · 37 warfare topics · 18 battles · 19 museums · 22 objects · 99 archive images · 14 busts · 9 maps · 10 timelines |
| Sources | 50 |
| Content-health checks | 43 — 0 errors, 1 warning (the deliberate incomplete-provenance count) |
| Build | 784 static pages |
| Broken refs / orphans | 0 / 0 |

All six feature branches in the stack (`warfare` → `cities` →
`archaeology-museums` → `architecture` → `institutions` → `religion`) are
merged into `main`. There is no stale-base dependency to report.

---

## 2. The gap, stated precisely

The brief's core demand is a graph that runs

```
Civilization → City → Site → Building → Artifact → Museum
```

The platform can currently do:

```
Civilization → City → ??? → ??? → Artifact → Museum
```

Two rungs are missing, and they are the two that carry the material
evidence:

**The Site rung.** There is no page for Mycenae, Knossos, the Athenian
Agora, the Roman Forum, Herculaneum, Giza, Karnak, the Valley of the
Kings, Pasargadae, Behistun, Ur or Nineveh. Fourteen cities exist, and
four of them (Delphi, Olympia, Persepolis, Pompeii) are sanctuaries or
buried towns doing double duty as cities — but an archaeological site is
not a city, and the sites above are not cities at all. Three of them sit
*inside* cities the platform already covers.

**The Building rung.** `/architecture/temple` explains what a Greek
temple is and names the Parthenon as an example. There is no
`/monuments/parthenon`. The 70 buildings the architecture registry names
are data without URLs, and none of them can be linked to from a battle,
an institution, a cult practice or an object.

A third, softer gap: the museum layer answers "who holds this object"
well and "what is this institution" barely.

---

## 3. Three remaining phases

### Phase 31 — Archaeological sites (`feat/archaeological-sites`)

Routes `/archaeology` and `/archaeology/[slug]`. Roughly 26 sites that
are **not** already cities, in four regional groups.

Namespace reasoning: not `/sites` (generic, and a poor query surface),
not `/archaeology/sites/[slug]` (three levels for one entity kind, which
the brief itself warns against). `/archaeology` becomes the evidence
gateway and links out to `/objects` and `/museums`, which keep their
URLs.

Collision control, following the discipline the cities layer established:

- a site slug may not equal a city slug — enforced by the gate, so
  `/archaeology/pompeii` cannot be created alongside `/cities/pompeii`;
- the site template's section headings are declared in the registry and
  checked for collision against the city headings, because the Acropolis,
  the Agora, the Roman Forum and the Palatine sit inside cities that
  already have pages;
- a site with a parent city renders a disambiguation line, and the
  reciprocal direction is validated.

This phase also introduces the **map and timeline readiness** the brief
asks for, because a site is the right entity to introduce it on:

- `latitude` / `longitude` in decimal degrees, paired, range-checked, and
  required to name exactly what the pair points at (`coordinateSubject`)
  — a citadel gate, a temple platform, a tomb entrance. Coordinates that
  cannot be pinned to a defined object are omitted rather than
  approximated.
- a signed-year chronology model (`year` negative for BCE) with
  `precision`, `display` and `status`, deterministic and free of
  `Date`. Year 0 is rejected by the validator, because there isn't one.

New gate: five checks — `sites:refs`, `sites:geography`,
`sites:chronology`, `sites:evidence`, `sites:no-duplication`.

### Phase 32 — Named monuments (`feat/ancient-monuments`)

Routes `/monuments` and `/monuments/[slug]`. Individual buildings, kept
semantically separate from `/architecture/[type]` exactly as the brief
requires: the type page explains the form, the monument page is one
building with a patron, a date, a political meaning, a later history and
a state of survival.

Depends on Phase 31, because a monument's strongest single relationship
is to the site it stands on.

### Phase 33 — Museum encyclopedia (`feat/museum-encyclopedia`)

Deepens the 19 existing institutions to the fuller model — collection
strengths, civilizations represented, sites represented, provenance
context, official collection URL — and adds the priority institutions
still missing: Museo dell'Ara Pacis, Neues Museum, the Egyptian Museum
in Cairo, the Grand Egyptian Museum, and the site museum at Persepolis.
No opening hours, no ticket prices, no temporary exhibitions: the
existing registry header already states that rule and it stands.

---

## 4. Standing constraints, unchanged

- No fabrication of excavation dates, inventory numbers, findspots,
  identifications, licences or measurements. A blank field beats a
  plausible one.
- Uncertainty is encoded, not smoothed: the evidence taxonomy in
  `src/data/evidence.ts` is the vocabulary, and it is not extended
  without a stated reason.
- No page exists to hold a keyword. A subject that cannot support its own
  canonical URL stays a section of another page or structured data.
- Design system untouched — marble, white, imperial blue. No redesign.
- No new client-side JavaScript, no search framework, no map framework,
  no CMS, no database.
- WebmasterID and the HELPERG ecosystem banner are inherited from the
  root layout and are not touched.
