# Phase 31 — Archaeological Sites

Branch: `feat/archaeological-sites`
Base: `main` @ `b989db5` (after PR #29, ancient religion)
Date: 2026-08-19

---

## 0. Why this phase, and not the one that was asked for

The brief proposed six phases: Cities, Archaeology, Architecture,
Institutions, Religion, Museums. Five of the six are already merged into
`main`, under this repository's own numbering — Phase 27 Cities, 27.5
Archaeology & Museums, 28 Architecture, 29 Institutions, 30 Religion.
There was no stale-base dependency to report; the whole stack is in.

The audit is in [`roadmap-phases-31-33.md`](./roadmap-phases-31-33.md).
What it found is that the brief's core demand — a graph running
Civilization → City → **Site** → **Building** → Artifact → Museum — has
two rungs missing, and they are the two carrying the material evidence.
There was no page for Mycenae, Knossos, the Roman Forum, Herculaneum,
Giza, Karnak, Behistun or Ur; and the seventy buildings the architecture
registry names exist only as inline data with no URL.

This phase builds the Site rung. Phase 32 builds the Building rung and
Phase 33 deepens the museum layer.

---

## 1. What was built

| | Before | After |
|---|---:|---:|
| Static pages | 784 | **811** |
| Sitemap URLs | 774 | **801** |
| Content-health checks | 43 | **48** |
| Archive images | 99 | **113** |
| Errors / warnings | 0 / 1 | **0 / 1** |

**26 archaeological sites**, in four regional groups, at `/archaeology`
and `/archaeology/[slug]`.

| Region | Sites |
|---|---|
| The Aegean and the Greek world (10) | Mycenae, Knossos, Akrotiri, Pylos, the Acropolis of Athens, the Athenian Agora, Delos, Eleusis, Epidaurus, Vergina |
| The Roman world (5) | The Roman Forum, the Palatine Hill, Herculaneum, Hadrian's Villa, Dura-Europos |
| Egypt (6) | Giza, Saqqara, Karnak, the Valley of the Kings, Amarna, Deir el-Medina |
| Mesopotamia and Iran (5) | Pasargadae, Naqsh-e Rustam, Behistun, Ur, Nineveh |

Inside those pages: **111 recorded excavations** with named excavators and
dates, **120 structures**, **103 finds** traced to a holder, **105
occupation phases**, **54 unresolved questions** with both positions
stated, and **61 ancient sources** cited by book and chapter.

---

## 2. The boundary problem, and how it is enforced

Four of these sites sit inside cities the platform already covers. That
is exactly the failure the cities layer was built to avoid — two pages
competing for one query — so the mitigation is mechanical rather than
editorial.

- **A site slug may not be a city slug.** `/archaeology/pompeii` cannot
  be created beside `/cities/pompeii`. Nor may a site *title* duplicate a
  city title. Enforced by `sites:no-duplication`.
- **The section headings are declared in the registry**, not in the
  template, and checked against `CITY_SECTION_HEADINGS`. The city layer's
  "The site and its setting" and this layer's "Where the site is" are
  disjoint by check, not by intention.
- **The reciprocal links are rendered by code.** A site with a
  `parentCitySlug` renders a disambiguation line to its city; the city
  page derives its "Excavated sites" list from the site records. Neither
  direction can be forgotten because neither is written by hand.
- **The architecture boundary** is the same shape: a site names its
  structures and links each to the *type* that explains it. It does not
  try to be the page for any single building. That is Phase 32.

A real defect here was caught in review rather than in design. The city
page originally derived its list from an accessor that matched either the
parent city *or* any city in `cityRefs`, so the Athens page claimed
Delos, Eleusis and Epidaurus as excavations in Athens. The loose accessor
is now deleted rather than left available to be misused again.

---

## 3. Two models introduced here

The brief asked for map readiness and timeline readiness. A site is the
right entity to introduce both on, because a site is a place with a
defined feature to point at and a stratigraphy to date.

### Geography

`latitude` and `longitude` in decimal degrees, and four rules the gate
enforces:

1. given as a **pair** or not at all;
2. in range, and not at 0/0;
3. **no more than four decimal places**, because these are locators and
   not survey positions — they render at three, about a hundred metres;
4. **`coordinateSubject` is required**, naming what the pair points at:
   the Lion Gate, the Great Hypostyle Hall, the tomb of Cyrus. "The site"
   is not a point, and a site's extent is usually the thing under
   discussion.

All 26 carry a pair. Each page renders the position with its subject and
a line stating the precision.

### Chronology

Ancient chronology is not a job for `Date`: it cannot represent 1450 BCE,
it invents a year zero, and it drags a proleptic Gregorian calendar
somewhere it does not belong. So a date here is:

```ts
{ year: -1600, precision: "approximate", display: "c. 1600 BCE" }
```

A **signed integer year**, negative for BCE, with **no zero** — 1 BCE is
followed by 1 CE and the validator rejects a zero. `formatYear` is the
only conversion and it is pure.

`precision` is the point of the model: `exact`, `approximate`, `century`,
`range-endpoint`, `traditional`, `disputed`, `unknown`. The eruption that
buried Herculaneum and the shaft graves at Mycenae are both dates and
they are not the same kind of thing.

`sites:chronology` checks that the **display string agrees with its own
year** — that it contains the number, that BCE matches a negative and CE
a positive, and that a display carrying no number is only allowed on an
imprecise date. The rendered string is what a reader sees, and it is the
field most likely to drift away from the data.

---

## 4. Editorial positions

**The excavators' errors are the subject, not an aside.** The colossal
statue in the Forum was called Commodus for four centuries. Woolley
published a silt layer at Ur as the flood of Genesis and named a pair of
goat figures for the ram in the thicket. Evans rebuilt Knossos in
reinforced concrete and fixed a set of hypotheses in permanent material.
Balanos repaired the Parthenon with iron clamps that rusted and split the
marble, and the current restoration exists to undo him. Marinatos dug
Akrotiri to prove a hypothesis the chronology has not sustained. These
are not anecdotes about incompetence; they are how the discipline learned
what it now does, and they are the single most useful thing a site page
can tell a reader about how confident to be.

**Where a page has no ancient testimony, it says so.** Three sites —
Akrotiri, Dura-Europos, Deir el-Medina — declare `noAncientTestimony`
with the reason, and the gate rejects an empty source list that does not.
An empty list reads as an oversight. A statement that antiquity never
described the place is a finding, and at Dura and Deir el-Medina it is
the most interesting thing about the evidence: neither site has ever been
distorted by a text.

**Royal self-justification is labelled as such.** Behistun is Darius's
account of his own accession, published across the empire in Aramaic, and
the page says both that it unlocked cuneiform and that many historians
read it as a usurper's cover story. The Karnak annals of Thutmose III are
royal record published inside a temple. The Naqsh-e Rustam tomb reliefs
show the peoples of the empire holding the king up rather than being held
down, and the page says that is the official self-image, to be read
against the Greek accounts rather than in place of them.

**Modern politics is kept off the ancient page.** The sixteen-rayed star
on the Vergina larnax became a national symbol in the 1990s. That is a
fact about the twentieth century, and the page says so precisely so that
anything written about the site since 1991 can be read with it in mind.

**Pseudo-archaeology is answered once, briefly, and not amplified.** The
Sphinx water-erosion redating and the ergot hypothesis for the Eleusinian
kykeon are each stated, attributed and refused with the reason. The
Atlantis association with Akrotiri is described as a twentieth-century
proposal, which is what it is.

**No page is all certainty.** `sites:evidence` requires at least one
unresolved question per site with both positions set out, and warns if
every claim on a page is marked `documented`. Attribution, dating and
identification at an excavated site are rarely all secure at once.

---

## 5. The unresolved questions this layer carries

Not a complete list — there are 54 — but the ones the pages are built
around:

- **Who is in Tomb II at Vergina.** Philip II or Philip III Arrhidaeus,
  argued since 1977 on the barrel vault's date, the greaves of unequal
  length and the osteology, with a 2015 proposal putting Philip II in
  Tomb I instead. There is no consensus, and pages that state one answer
  flatly are not reporting the evidence.
- **Whether Gaumata existed.** Behistun says the man Darius killed was a
  Magus impersonating a dead prince. The alternative is that Darius
  murdered the real Bardiya and invented the impostor. No independent
  contemporary source exists.
- **How the attendants at Ur died.** Woolley proposed voluntary poison;
  CT work found perimortem cranial fractures and evidence of bodies
  heated and treated before burial.
- **When Thera erupted.** Radiocarbon says the late seventeenth century
  BCE, Egyptian synchronisms say around 1500. One of the two dating
  systems is wrong somewhere.
- **What the Lapis Niger says.** The oldest Latin inscription from Rome
  is broken and cannot be securely translated.
- **What the Ka'ba-ye Zartosht was for.** A complete Achaemenid building
  in good condition on the most important royal site in Persis, with no
  agreed function.
- **How the blocks were raised at Giza, and the obelisks at Karnak.**
  Marked `unknown`, because they are.

---

## 6. Knowledge-graph report

**781 typed edges** from the site records into fourteen existing
registries and content kinds — civilizations, figures, themes, books,
cities, museums, objects, architecture types, institutions, cult
practices, warfare topics, battles, maps, and other sites — plus the
structure→architecture and find→museum/object links rendered inline.

Reciprocal directions, all rendered by code from the same records:

| From | To | Where |
|---|---|---|
| Site | City | Disambiguation line on the site page |
| City | Site | "Excavated sites" on the city page |
| Site | Museum | "Finds and where they went", and the sidebar |
| Museum | Site | "Excavations it holds material from" |
| Site | Object | Find entries linking to `/objects/[slug]` |
| Site | Architecture type | Each structure links to the type that explains it |

Worked chains now runnable end to end:

```
Pericles → Athens → the Acropolis → the Perserschutt → the Acropolis
Museum, and the other half of the Parthenon programme → the British
Museum

Julius Caesar → Rome → the Roman Forum → the Basilica of Maxentius →
the colossal Constantine → the Capitoline Museums

Darius I → Achaemenid Persia → Behistun → the satrapies → Naqsh-e
Rustam → Pasargadae → the National Museum of Iran

Akhenaten → Egypt → Amarna → the Amarna Letters → Karnak's talatat →
the temple economy
```

---

## 7. Source-governance report

No sources were added to `src/data/sources.ts`; this layer cites ancient
works inline through the existing `SourceReference` shape, as the
warfare, cities, architecture, institutions and religion layers do.

61 ancient citations, by author and locus. Prominent: Pausanias (the
Acropolis, the Agora, Mycenae, Eleusis, Epidaurus), Thucydides (Mycenae,
Knossos, Delos, the Acropolis), Herodotus (nine sites), Strabo (Pylos,
Delos, Saqqara, Giza, the Valley of the Kings), Livy, Suetonius, Tacitus,
Plutarch, Pliny the Younger, Cassius Dio, Arrian, Xenophon, Diodorus.

Non-literary documents cited as sources in their own right: the Behistun
inscription, the tomb inscriptions of Darius I, the boundary stelae of
Akhetaten, the Great Hymn to the Aten, the Amarna Letters, Papyrus Harris
I, the annals of Thutmose III, the tomb-robbery papyri, the annals of
Sennacherib, the Sumerian King List and the Nabonidus cylinders. This is
the first phase in which epigraphic and documentary material is cited
alongside literary authors rather than described in prose.

Three sites carry `noAncientTestimony` instead.

---

## 8. Visual archive report

Fourteen images vendored; every one of the 26 sites now carries a hero
image, the rest reusing archive material that genuinely depicts the site.

| Slug | Subject | Licence | Photographer | Local file |
|---|---|---|---|---|
| `knossos-north-entrance` | North entrance, Knossos — **Evans's 1920s concrete reconstruction** | CC BY-SA 3.0 | Moonik | `/images/ruins/` 1600×1063 |
| `akrotiri-excavation` | Akrotiri under its modern shelter | CC0 | Gary Todd | `/images/ruins/` 1067×1600 |
| `delos-terrace-of-the-lions` | Terrace of the Lions — **figures in place are replicas** | CC BY-SA 4.0 | Zde | `/images/ruins/` 1600×1065 |
| `eleusis-telesterion` | The Telesterion, rock-cut tiers and column bases | CC BY 2.0 | TimeTravelRome | `/images/ruins/` 1600×1067 |
| `epidaurus-theatre` | Theatre of Epidaurus | CC BY-SA 4.0 | Zde | `/images/ruins/` 1600×1065 |
| `vergina-tomb-facade` | **Tomb II** façade and hunting frieze | Public domain | Sarah Murray | `/images/architecture/` 1600×1071 |
| `palatine-domus-augustana` | The Domus Augustana | CC BY-SA 4.0 | Livioandronico2013 | `/images/ruins/` 1600×1064 |
| `hadrians-villa-canopus` | The Canopus — **colonnade re-erected, statues are casts** | CC BY-SA 2.0 | Carole Raddato | `/images/architecture/` 1600×1060 |
| `amarna-boundary-stela` | A boundary stela of Akhetaten | CC BY-SA 3.0 | Einsamer Schütze | `/images/inscription/` 1600×1067 |
| `deir-el-medina-excavation` | The Italian mission excavating, 1905–1909 | CC0 | Museo Egizio archive, photographer unnamed | `/images/ruins/` 1600×1140 |
| `ur-ziggurat` | Ziggurat of Ur — **upper stages are 1980s reconstruction** | CC BY-SA 4.0 | Alli Khalil | `/images/architecture/` 1600×1067 |
| `nineveh-mashki-gate` | Mashki Gate — **a modern reconstruction, bulldozed in 2016** | CC BY-SA 4.0 | Omar Siddeeq Yousif | `/images/architecture/` 1600×1094 |
| `herculaneum-excavations-19c` | The excavations, engraving published 1894 | Public domain | Richard Brend'amour, engraver | `/images/ruins/` 1400×1185 |
| `herculaneum-maiuri-excavation` | Maiuri's excavation, c. 1929 | CC BY 4.0 | published in Maiuri, *Ercolano* (1932) | `/images/ruins/` 1064×1600 |

Every file was verified through the Wikimedia Commons API for licence,
author and source dimensions before download. Provenance is recorded in
the directory READMEs, including a **new
`public/images/inscription/README.md`**, since that directory had no
catalogue.

**Two rules governed the batch**, both aimed at the failure this material
invites — one heap of column drums looks much like another, which is how
Phase 26 ended up illustrating battle pages with unrelated archaeology:

1. **Where the photograph shows a reconstruction, the caption says so.**
   Four of the fourteen do, and a reader cannot tell reinforced concrete
   from gypsum in a photograph.
2. **Where the Commons file name asserts a disputed identification, the
   caption does not repeat it.** The Vergina file is titled "Facade of
   Philip II tomb"; the caption says Tomb II.

Two are **excavation photographs** rather than photographs of results —
Deir el-Medina in 1905–1909 and Herculaneum in about 1929 — which is the
more useful image for a page about how evidence was recovered.

One departure from the batch standard, recorded in the README: the
Herculaneum engraving is at 1400 px and quality 62 rather than 1600 and
80, because engraved line work does not compress and it was too heavy to
ship as a hero.

---

## 9. SEO report

- **Sitemap:** 774 → **801** URLs. `/archaeology` and all 26 site pages
  present and verified in the served XML.
- **Canonicals:** verified on the index and on site pages.
- **Structured data:** `BreadcrumbList` + `Article` +
  `LandmarksOrHistoricalBuildings` per site page. The landmark type
  emits `geo` only where the registry carries a coordinate pair, which is
  only where it can name the feature the pair points at. `placeJsonLd`,
  used by the cities layer, remains coordinate-free by design.
- **No accidental noindex.** Checked on served pages.
- **SSR:** every page is statically generated at build time. No client
  component was added and no client-side JavaScript ships for this layer.
  All 26 sites are discoverable from `/archaeology` without JavaScript.
- **`dynamicParams = false`:** `/archaeology/nope` returns 404.
- **Query surfaces** the layer legitimately opens: excavation history and
  discovery-of queries ("who excavated Knossos", "when was Tutankhamun's
  tomb found"), site-versus-city queries that the cities layer was not
  answering, and the identification disputes, which are high-intent and
  poorly served — "is the Mask of Agamemnon really Agamemnon", "whose
  tomb is Vergina Tomb II", "was Gaumata real".

---

## 10. QA

```
npm run typecheck              clean
npm run lint                   clean
npm run validate:content:report 48 checks, 0 errors, 1 warning
npm run build                  811 static pages
```

The one warning is Phase 27.5's deliberate incomplete-provenance count,
unchanged.

Dev/production server smoke tests, against `next start`:

| Check | Result |
|---|---|
| `/archaeology`, 26 site pages, `/cities/athens`, `/museums/british-museum` | 200 |
| `/archaeology/nope` | 404 |
| `<h1>` count per page | 1 |
| Images without `alt` | 0 |
| Canonical present | yes |
| `noindex` present | no |
| Sitemap contains `/archaeology` ×27 | yes |
| `geo` emitted where coordinates exist | yes |
| Athens → excavated sites | Acropolis, Agora only (after the fix in §2) |
| Rome → excavated sites | Forum, Palatine |
| Corinth → excavated sites block | absent, correctly |
| British Museum → excavations | 10 sites |

Not done: browser-based visual QA and contrast measurement. The layer
adds no new colours, components or layout primitives — it composes
`PageHeader`, `Container`, `EvidenceBadge`, `ArchiveImage` and
`RelatedReading` exactly as the cities and architecture layers do — so
the risk is low, but it is untested and stated as such.

---

## 11. Adversarial review

Every load-bearing claim was rechecked against the sources rather than
against memory. Nine corrections were applied and are in commit
`d3366f5`:

**Wrong, and fixed:**

- the Treasury of Atreus is some fourteen metres across, not thirteen;
- the Behistun page gave the figured relief the dimensions of the whole
  worked surface;
- the Karnak Amun precinct is around twenty-five hectares, not thirty;
- the Athenian Constitution papyrus was first published in 1891; a
  separate 1879 find had been attached to it;
- Naqsh-e Rustam cited Arrian, who does not describe the rock tombs.
  Replaced with Diodorus 17.71.7, who does.

**Overstated, and softened:**

- Evans's role in Wace losing his Mycenae permit is argued, not
  documented;
- the excavated fraction of Akrotiri is not established at a third;
- the century in which a Delos lion reached the Venetian Arsenal is not
  secure;
- the Thera Spring Fresco claim now states the precise version — the
  only Aegean painting recovered complete on all the walls of its room.

**Checked and not changed**, because the framing was already right: the
Mask of Agamemnon's date and the forgery argument; the Minotaur and the
labrys etymology; Atlantis; the Romulus hut and Carandini's wall; the
pyramid workforce and Herodotus's hundred thousand men; the Hatshepsut
erasure motive; the curse of the pharaohs; Strabo's ten thousand slaves a
day; the Nefertiti bust division.

**Image review**, against the nine questions in the brief: identification
verified for all fourteen from the Commons record; licences verified
through the API rather than from the file page; attribution carried on
every in-page caption for CC BY and CC BY-SA; every image is on the page
of the site it depicts; and reconstructions are labelled. No image was
used decoratively.

---

## 12. Risks and limitations

- **Coordinates are locators, not survey data.** They are rendered to
  three decimal places with the feature named and the precision stated.
  A reader who takes one as the position of a site rather than of a gate
  will be misled, which is why the subject is required and rendered.
- **26 sites is a selection.** Tiryns, Olynthus, Masada, Palmyra, Petra,
  Hattusa, Ephesus's excavated quarter, Aphrodisias, Vindolanda and much
  of the Roman west are absent. The selection favours sites where the
  excavation history is itself instructive.
- **Regional imbalance.** Ten Aegean sites against five in Mesopotamia
  and Iran. That partly reflects the platform's existing centre of
  gravity and partly the accessibility of published excavation histories,
  and it is a gap rather than a judgement.
- **No monument pages yet.** Structures link to the building *type*, not
  to themselves. `/monuments/parthenon` does not exist. That is Phase 32,
  and until it lands the structure sections are the weakest links in the
  layer.
- **The museum layer is still thin** relative to what the finds sections
  now point at. Several finds resolve to `heldAt` prose rather than a
  museum page because the institution is not in the registry — the
  Egyptian Museum in Cairo, the Grand Egyptian Museum, the Neues Museum,
  the Penn Museum, the site museums. Phase 33.
- **No browser-based visual QA**, as above.
- **No new sources in the governed catalogue.** Ancient works are cited
  inline. If claim-level citation is ever built, this layer's
  `SourceReference` entries are the natural material for it, but nothing
  here anticipates that beyond keeping author and locus separate.

---

## 13. Commits

| Hash | Purpose |
|---|---|
| `097d03f` | `docs(roadmap)` — audit of phases 26–30 and the three that remain |
| `9d6896b` | `feat(sites)` — registry of twenty-six archaeological sites |
| `d93092f` | `feat(sites)` — content-health gate, five checks |
| `18673cf` | `feat(sites)` — index and site routes, `landmarkJsonLd` |
| `25b408f` | `feat(sites)` — sitemap, navigation, reciprocal links, homepage band |
| `08cd5b6` | `feat(visual)` — fourteen archaeological-site photographs |
| `d3366f5` | `fix(sites)` — adversarial review round |

---

## 14. Ready for Phase 32

The Building rung is the next gap and its dependency is now satisfied:
a monument's strongest single relationship is to the site it stands on,
and the sites exist. `/monuments/parthenon` can link to
`/archaeology/acropolis-of-athens` for the excavation, to
`/architecture/temple` for the form, to `/cities/athens` for the city, to
`/museums/acropolis-museum` and `/museums/british-museum` for the
sculpture, and to `/institutions/ecclesia` for the body that voted the
money.
