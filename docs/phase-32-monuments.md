# Phase 32 — Named Monuments

Branch: `feat/ancient-monuments`
Base: `feat/archaeological-sites` @ `fcea270` (Phase 31, unmerged)
Stacked PR: base `feat/archaeological-sites`, compare `feat/ancient-monuments`
Date: 2026-08-19

---

## 1. What was built

| | Before | After |
|---|---:|---:|
| Static pages | 811 | **847** |
| Sitemap URLs | 801 | **837** |
| Content-health checks | 48 | **53** |
| Archive images | 113 | **131** |
| Errors / warnings | 0 / 1 | **0 / 1** |

**35 named monuments** at `/monuments` and `/monuments/[slug]`.

| Region | Monuments |
|---|---|
| The Roman world (13) | Colosseum, Pantheon, Curia Julia, Basilica Julia, Temple of Saturn, Temple of Castor and Pollux, Arch of Titus, Arch of Constantine, Trajan's Column, Forum of Trajan, Forum of Augustus, Ara Pacis, Baths of Caracalla |
| The Aegean and Greek world (9) | Parthenon, Erechtheion, Temple of Hephaestus, Theatre of Dionysus, Temple of Apollo at Delphi, Temple of Zeus at Olympia, Treasury of the Athenians, Lion Gate, Treasury of Atreus |
| Mesopotamia and Iran (7) | Apadana, Gate of All Nations, Palace of Darius, Tomb of Cyrus, Tomb of Darius I, Ishtar Gate, Etemenanki |
| Egypt (6) | Great Pyramid, Step Pyramid of Djoser, Great Hypostyle Hall, Luxor Temple, Abu Simbel, Mortuary Temple of Hatshepsut |

Inside them: **100 sourced measurements**, **73 attributions** each with the
basis that supports it, **130 building phases**, **57 fragments traced to
where they are now**, **57 unresolved questions**, **80 ancient citations**,
**93 material entries**, and **957 typed graph edges**.

---

## 2. The entity boundary, enforced

The brief's central instruction for this phase was not to conflate city,
site, monument and building type. That is now mechanical:

```
Athens            city              /cities/athens
The Acropolis     excavated site    /archaeology/acropolis-of-athens
The Parthenon     monument          /monuments/parthenon
The Greek temple  building type     /architecture/temple
```

`monuments:boundaries` rejects a monument slug that equals a city, site
or architecture-type slug; a monument title that equals a city or site
title; a section heading that collides with the city or site heading
sets; a monument that names neither a site nor a city nor an explicit
reason it can name neither; and a monument whose city disagrees with its
site's parent city.

Every monument page opens with the four-way disambiguation, naming the
other three and linking to whichever exist.

**Three monuments are deliberately unplaced.** Luxor Temple, Abu Simbel
and Hatshepsut's mortuary temple stand in places the platform has no page
for — the ancient city of Thebes, Lower Nubia, and Deir el-Bahari — and
each carries an `unplacedNote` naming the place and saying so. The gate
requires the declaration rather than permitting silence, which is the
same discipline the sites layer uses for `noAncientTestimony`.

### What this layer refuses

`MONUMENT_DEFERS_TO` records five subjects that look like monuments and
already have a page, with the reason, rendered on the index as links and
validated so a deferral cannot point at something that does not exist:

- **Behistun** — `/archaeology/behistun` already treats it as a rock
  monument and covers the relief, the trilingual text, the decipherment
  and the succession dispute. A monument page would say the same things
  for the same query.
- **The Roman Forum as a whole** — a square with buildings in it. Its
  individually meaningful structures have monument pages; the square is a
  site.
- **The Acropolis as a whole** — a fortified rock carrying several
  buildings.
- **Hadrian's Villa** — a hundred and twenty hectares of structures whose
  ancient names are a sixteenth-century guess.
- **The Roman aqueducts** — covered as a building type; no single
  aqueduct here yet carries the patron, dating and political argument a
  monument page needs.

---

## 3. The evidence model

Monument pages are a magnet for borrowed numbers and late attributions.
Two field types exist to stop that.

### SourcedMeasurement

There is no field in which a bare dimension can be stored. Every figure
carries a `basis`, and `monuments:evidence` rejects one that does not say
what kind of figure it is:

| Figure | Basis | Level |
|---|---|---|
| Pantheon dome, 43.3 m | Modern survey | documented |
| Colosseum, ~50,000 | Modern estimate from measured seating and assumed space per person; the only ancient figure is 87,000 loca in a fourth-century list | disputed |
| Great Pyramid, 146.6 m | Petrie's survey, reconstructing the apex; corresponds to 280 royal cubits | documented |
| Parthenon Athena, 40 talents of gold | Thucydides 2.13; the conversion to modern weight depends on the talent standard | documented |
| Baths of Caracalla fuel, thousands of tonnes | Modelled from heated volume and assumed furnace efficiency | unknown |

### AttributedPerson

`monuments:evidence` refuses to accept an attribution marked
`documented` unless its basis names something checkable — an inscription,
a building account, a brick stamp, a named source with a chapter. The
check accepts either an evidence-word or a citation pattern
(`Pausanias 5.10.3`, `Suetonius, Titus 7`), so the rule does not depend
on an enumeration of authors that would go stale.

The result distinguishes three claims that are normally run together:

- **Philokles**, architect of the Erechtheion — named in the Athenian
  inspection inscription of 409/8 BCE, a contemporary public document.
  `documented`.
- **Iktinos**, architect of the Parthenon — named by Plutarch and
  Vitruvius, four and five centuries later, and by no building account
  that survives. `probable`.
- **Apollodorus of Damascus**, architect of the Pantheon — attributed by
  no ancient source at all; the attribution is modern inference from his
  work for Trajan. `disputed`.

### MonumentCondition

The field a reader wants first and rarely gets. Fourteen standing, twelve
standing ruins, three re-erected, three foundations, two moved from their
sites, one vanished. The Pantheon is roofed and entire; the Temple of
Castor and Pollux is three columns; Etemenanki is a flooded hole in the
ground defined by its foundation trenches. Anything marked `reassembled`
or `relocated` must carry a restoration account, or the photograph
implies an antiquity the fabric does not have.

---

## 4. Five new checks (48 → 53)

| Check | What it prevents |
|---|---|
| `monuments:refs` | A slug into any of sixteen registries or content kinds that does not resolve; a fragment that says nothing about where it is; a deferral pointing at a non-existent target, or at something that is also a monument |
| `monuments:chronology` | Year zero; a display string that disagrees with its own stored year or era; fewer than two phases, so a rebuilt monument cannot be collapsed into one fabricated date |
| `monuments:evidence` | A measurement that does not say what kind of figure it is; a `documented` attribution without a checkable basis; a monument with no unresolved question, no ancient testimony and no statement of why; a re-erected or moved monument without a restoration account |
| `monuments:boundaries` | Slug, title and heading collisions across the four entity kinds; an unplaced monument; a monument whose city contradicts its site's parent city; a monument linked to no building type |
| `monuments:images` | An image serving as the hero of more than one entity, across cities, sites and monuments alike |

---

## 5. What the gate actually caught

This is the part worth reading. The five checks were written before the
records were validated against them, and they failed the build 42 times.

**Seven chronology mismatches.** I had stored a midpoint year against a
range display — `year: -1250` with `display: "c. 1290–1220 BCE"`. The
display is what a reader sees, and the check refused to let the two drift
apart. Each is now the range's end with `precision: "range-endpoint"`,
which is what the field is for.

**Nine attributions marked documented on a basis that named nothing
checkable**, and eighteen measurements that stated a figure without
saying what kind of figure it was. Both classes were fixed in the
content, and in two places the check itself was refined — the original
length threshold was the wrong instrument, because "Modern survey." is a
perfectly good basis and is fourteen characters long. The rule now tests
what the basis *says* rather than how long it is.

**Ten hero-image collisions**, including two that predated this phase.
The Parthenon photograph was serving the Athens city page, the Acropolis
site page and the Parthenon monument at once, and `roman-forum-view` was
the hero of both the Rome city page and the Roman Forum site page. The
rule's principle is that the most specific entity keeps the specific
image, so:

- the monuments took the photographs of themselves;
- five general views were vendored for the pages that gave them up —
  the Acropolis from Philopappos, the Stoa of Attalos for the Agora,
  the palace ruins for Pasargadae, the sanctuary for Olympia, and a
  colossal Ramesses for Memphis, whose page had been illustrated with a
  photograph of the Step Pyramid at Saqqara, which is a different place;
- Rome, Athens, Delphi and Persepolis took images the archive already
  held.

That is eighteen images and five re-heroed pages, and none of it would
have happened without the check.

---

## 6. Knowledge-graph report

**957 typed edges** into sixteen registries and content kinds, with the
reciprocal direction rendered by code from the same records:

| From | To | Where |
|---|---|---|
| Monument | Site | Disambiguation line and sidebar |
| Site | Monument | "Monuments on this site" |
| Monument | City | Disambiguation line and sidebar |
| City | Monument | "Monuments" |
| Monument | Architecture type | Disambiguation line and sidebar |
| Architecture type | Monument | "Monuments of this type" |
| Monument | Museum | "Scattered fragments", and the sidebar |
| Museum | Monument | "Monuments it holds fragments of" |
| Monument | Object | Fragment entries linking to `/objects/[slug]` |
| Monument | Figure | Attributions link to the figure where one exists |

The rung the brief asked for now runs end to end:

```
Rome → the Roman Forum → the Basilica of Maxentius' colossal
Constantine → the Capitoline Museums

Athens → the Acropolis → the Parthenon → the Greek temple → the
Acropolis Museum and the British Museum

Achaemenid Persia → Persepolis → the Apadana → the palace type →
Naqsh-e Rustam → the tomb of Darius I → the National Museum of Iran

Egypt → Giza → the Great Pyramid → the pyramid type → the Grand
Egyptian Museum
```

---

## 7. Source-governance report

No sources added to `src/data/sources.ts`; ancient works are cited inline
through the existing `SourceReference` shape, as every layer since Phase
26 does.

80 ancient citations by author and locus. New to the platform's citation
set in this phase: Martial (*On the Spectacles*), Josephus (*The Jewish
War*), Ammianus Marcellinus, Ovid (*Fasti*), Macrobius (*Saturnalia*),
Eusebius, the *Panegyrici Latini*, and Pliny the Elder.

Non-literary documents cited as sources in their own right: the Athenian
inspection inscription IG I³ 474, the Hephaisteion cult-statue accounts
IG I³ 472, the Trajan's Column dedication CIL VI 960, the Apadana
foundation plaques, the Gate of All Nations inscription XPa, the tomb
inscriptions DNa and DNb, the Karnak battle reliefs, the Kadesh
inscriptions, the Egyptian–Hittite treaty, the Delphic hymns with their
musical notation, the Merer papyri, the Esagil tablet, and
Nebuchadnezzar's Ishtar Gate foundation text.

One monument declares that antiquity does not describe it — the Step
Pyramid — and says why, noting that the Ptolemaic Famine Stela is a much
later composition claiming ancient authority rather than a Third Dynasty
record.

---

## 8. Visual and provenance report

Eighteen images vendored, all verified through the Commons API for
licence, author and source dimensions before download, all recorded in
the directory READMEs. Thirty-four of the thirty-five monuments carry a
hero; Etemenanki has none, because nothing stands.

**Thirteen monument heroes:** the Curia Julia, the Basilica Julia, the
Temple of Saturn, the Temple of Castor and Pollux, the Arch of Titus, the
Forum of Trajan, the Forum of Augustus, the Ara Pacis, the Baths of
Caracalla, the Treasury of Atreus, the Tachara at Persepolis, the tomb of
Darius I, and the Great Pyramid.

**Five general views**, vendored to free specific images for the
monuments that are their subject.

Two identification rules governed the batch, and both caught something:

1. **Where the photograph shows a reconstruction, the caption says so.**
   The Curia Julia's roof and upper façade are Bartoli's 1930s work; the
   Arch of Titus's paler stone is Valadier's travertine; the Ara Pacis is
   original blocks with plaster casts on a new site; the Stoa of Attalos
   is a complete 1950s rebuild.

2. **A near-identical wrong subject exists and was avoided.** There is a
   Baths of Caracalla at Ankara as well as at Rome, and Commons has good
   photographs of both. The file taken here is the Roman one and the
   registry entry says so explicitly, which is the Phase 26 failure mode
   this platform is now specifically checking for.

Full identification-confidence records, source dimensions and processing
notes are in `public/images/{architecture,ruins,artifacts}/README.md`.

---

## 9. SEO and indexation report

- **Sitemap:** 801 → **837** URLs; `/monuments` and all 35 monument
  pages verified present in the served XML.
- **Canonicals:** verified on the index and on monument pages.
- **Structured data:** `BreadcrumbList` + `Article` +
  `LandmarksOrHistoricalBuildings` per page. No `geo` on monuments — the
  registry holds no coordinates for buildings, because a monument's
  position is its site's, and duplicating it would create two sources of
  truth for one fact.
- **No accidental noindex.** Checked on served pages.
- **SSR:** every page statically generated. No client component added and
  no client-side JavaScript ships for this layer; all 35 are discoverable
  from `/monuments` without JavaScript.
- **`dynamicParams = false`:** `/monuments/nope` returns 404.
- **Query surfaces opened**, all of which the layer answers directly
  rather than through an FAQ block: who built X, dimensions of X, X
  history, X construction, what happened to X, where the fragments of X
  are. No sub-URLs were created to capture permutations.

---

## 10. QA

```
npm run typecheck               clean
npm run lint                    clean
npm run validate:content:report 53 checks · 0 errors · 1 warning
npm run build                   847 static pages
```

The one warning is Phase 27.5's deliberate incomplete-provenance count,
unchanged since before this phase.

Server smoke tests against `next start`:

| Check | Result |
|---|---|
| All 35 monument routes | 200 (0 failures) |
| `/monuments/nope` | 404 |
| `<h1>` per page | 1 |
| Images without `alt` | 0 |
| Canonical present, no `noindex` | yes / none |
| Sitemap contains `/monuments` ×36 | yes |
| Roman Forum site → 5 monuments | yes |
| Rome city → 12 monuments | yes |
| `/architecture/temple` → its monuments | yes |
| British Museum → 10 monuments | yes |
| HELPERG ecosystem banner present | yes |
| WebmasterID tracker inherited | yes |

Not done: browser-based visual QA, contrast measurement, and hydration
profiling. The layer adds no new colours, components or layout
primitives — it composes the same shells the cities, sites and
architecture layers use — so the risk is low, and it is untested.

---

## 11. Adversarial review

Every load-bearing claim was rechecked against the sources. Seven
corrections, in commit `e1c1a0c`:

**Wrong, and fixed:**

- The Luxor obelisk in the Place de la Concorde was described as the
  taller of the pair. It is the shorter, and the page contradicted its
  own figures.

**Overstated, and corrected:**

- Burial inside the pomerium was forbidden with exceptions that had to be
  voted; calling Trajan's the only one permitted turned a rule into an
  absolute.
- The Colosseum hypogeum's lift count is a matter of competing
  reconstructions, and the page gave one number.
- Three aesthetic judgements — the finest carving on the Forum, the
  finest Ionic work, the first children on a Roman state relief — are now
  hedged to what is claimable.
- `monumentsForCity`'s docblock described a duplication risk that does
  not exist.

**Checked and deliberately not changed**, because the framing was already
right: the Alföldy reconstruction of the Colosseum inscription is
labelled as a reconstruction from nail holes; the Pantheon's function is
left open as Cassius Dio left it; the Constantine arch's *instinctu
divinitatis* is presented without resolving it; the Vergina and Kadesh
records are set against their counter-sources; the Great Pyramid's
construction method is marked unknown and the Vyse forgery claim is
answered with the Wadi al-Jarf evidence; the Tower of Babel connection to
Etemenanki is stated as a modern inference rather than a documented
identification.

**Image review**, against the nine questions in the brief: identification
verified from the Commons record for all eighteen; licences verified
through the API rather than from the file page; attribution carried on
every in-page caption for CC BY and CC BY-SA; every image is on the page
of the building it depicts; reconstructions labelled; and the Ankara
near-miss avoided and documented.

---

## 12. Risks and limitations

- **Thirty-five is a selection.** The Erechtheion is here and the
  Propylaia is not; the Colosseum is here and the Theatre of Marcellus is
  not; Palmyra, Petra, Baalbek, the Maison Carrée, the Pont du Gard, the
  Mausoleum at Halicarnassus and the whole of Roman Britain are absent.
  The choices favour buildings that carry a political argument and a
  documented state of survival.
- **Three monuments are unplaced** because the platform has no page for
  ancient Thebes, for Nubia or for Deir el-Bahari. That is a content gap
  the declaration makes visible rather than hides.
- **No coordinates on monuments.** Deliberate, to avoid two sources of
  truth for one position, but it means a future map cannot place a
  building more precisely than its site.
- **The measurement bases are honest about kind, not about citation.**
  "Modern survey" says what sort of figure it is; it does not name the
  survey. Naming published surveys per measurement would be the next
  level of rigour and is not done here.
- **Vespasian, Titus and Domitian have no figure pages**, so the
  Colosseum's patrons cannot be linked. Several other patrons are in the
  same position. That is a gap in the biography layer, surfaced by this
  one.
- **The WebmasterID tracker uses `next/script` with
  `strategy="afterInteractive"`.** It is inherited correctly by every new
  route, which is what this phase was asked to verify, and it is
  unchanged. It is worth an independent check that events are actually
  arriving, because that strategy has been observed elsewhere to preload
  the script without executing the tracker. Out of scope here and
  flagged rather than silently altered.
- **No browser-based visual QA**, as above.

---

## 13. Commits

| Hash | Purpose |
|---|---|
| `61dfdaa` | `feat(monuments)` — registry of thirty-five named monuments, and the five-check gate |
| `f6d22c8` | `feat(monuments)` — index and monument routes, wired into four layers, plus the eighteen images and the hero re-pointing |
| `fb1383c` | `docs(images)` — provenance for the eighteen photographs |
| `e1c1a0c` | `fix(monuments)` — adversarial review round |

---

## 14. Ready for Phase 33

The museum layer is now the weakest link in a chain that is otherwise
complete. Fifty-seven monument fragments and a hundred and three site
finds point at institutions, and a substantial number of them resolve to
`heldAt` prose rather than a museum page because the institution is not
in the registry: the Egyptian Museum in Cairo, the Grand Egyptian Museum,
the Neues Museum, the Penn Museum, the Museo dell'Ara Pacis, the Museo
Egizio in Turin, the site museums at Vergina, Chora, Eleusis and
Epidaurus, and the Fitzwilliam.

Phase 33 adds those institutions and deepens the nineteen that exist from
a provenance-support layer into the encyclopedia the brief asked for.
