# Phase 32 — Named Monuments

**Stacked PR.** Base `feat/archaeological-sites`, compare
`feat/ancient-monuments`. Phase 31 is unmerged; this branch is stacked on
it rather than on stale `main`, and the diff shown against that base is
the monument layer alone. If Phase 31 merges first, retarget this PR to
`main` and the diff stays the same.

Adds the missing **Building** rung: thirty-five named monuments at
`/monuments`, each with a patron, a date, sourced measurements, a
political argument, a later history and a stated condition.

Build **811 → 847** static pages, sitemap **801 → 837**, checks
**48 → 53**, archive images **113 → 131**. Zero errors; the one warning
is Phase 27.5's deliberate incomplete-provenance count.

---

## The rung is now complete

```
Civilization → City → Site → Monument → Artifact → Museum
```

```
Athens → the Acropolis → the Parthenon → the Acropolis Museum
                                       → the British Museum
Rome   → the Roman Forum → the Basilica of Maxentius → the colossal
         Constantine → the Capitoline Museums
Persia → Persepolis → the Apadana → Naqsh-e Rustam → the tomb of
         Darius I → the National Museum of Iran
```

| Region | Count |
|---|---:|
| The Roman world | 13 |
| The Aegean and Greek world | 9 |
| Mesopotamia and Iran | 7 |
| Egypt | 6 |

100 sourced measurements · 73 attributions with their basis · 130
building phases · 57 fragments traced · 57 unresolved questions · 80
ancient citations · **957 typed graph edges**.

---

## Four entities, kept apart by the validator

```
Athens            city              /cities/athens
The Acropolis     excavated site    /archaeology/acropolis-of-athens
The Parthenon     monument          /monuments/parthenon
The Greek temple  building type     /architecture/temple
```

`monuments:boundaries` rejects a shared slug, a shared title, a shared
section heading, a monument that names no place and does not say why, and
a monument whose city contradicts its site's parent city. Every monument
page opens with the four-way disambiguation.

**Three monuments are deliberately unplaced** — Luxor Temple, Abu Simbel
and Hatshepsut's temple stand in places the platform has no page for, and
each says so rather than floating free.

**`MONUMENT_DEFERS_TO` refuses five subjects** that look like monuments
and already have a page, with the reason, rendered as links and
validated. Behistun is the clear case: `/archaeology/behistun` already
covers the relief, the trilingual text, the decipherment and the
succession dispute.

---

## Every number and every name says where it comes from

There is no field in which a bare dimension can be stored.

| Figure | What it rests on | Level |
|---|---|---|
| Pantheon dome 43.3 m | Modern survey | documented |
| Colosseum ~50,000 | Estimate from measured seating; the one ancient figure is 87,000 loca | disputed |
| Great Pyramid 146.6 m | Petrie's survey; 280 royal cubits | documented |
| Baths of Caracalla fuel | Modelled from heated volume | unknown |

The same for people. An attribution is `documented` only where an
inscription, an account, a stamp or a named source with a chapter
supports it:

- **Philokles**, Erechtheion — named in the Athenian inspection
  inscription of 409/8 BCE. `documented`
- **Iktinos**, Parthenon — named by Plutarch four centuries later, by no
  building account. `probable`
- **Apollodorus**, Pantheon — named by nobody in antiquity; modern
  inference. `disputed`

And `MonumentCondition` states what is actually there: 14 standing, 12
standing ruins, 3 re-erected, 3 foundations, 2 moved from their sites, 1
vanished.

---

## Five new checks — and what they caught

| Check | Prevents |
|---|---|
| `monuments:refs` | Unresolvable slugs across sixteen registries; a fragment with no stated location; a deferral pointing nowhere |
| `monuments:chronology` | Year zero; a display string disagreeing with its own year; fewer than two phases, so a rebuilt monument cannot become one fake date |
| `monuments:evidence` | A figure that does not say what kind of figure it is; a `documented` attribution with no checkable basis; a re-erected monument with no restoration account |
| `monuments:boundaries` | The four-entity collisions above |
| `monuments:images` | One image serving as the hero of more than one entity |

**The gate failed the build 42 times before the phase passed**, and the
work it forced is the most valuable part of this PR:

- **7 chronology mismatches** — a midpoint year stored against a range
  display. Now range endpoints with the precision that says so.
- **9 attributions and 18 measurements** marked documented on a basis
  that named nothing checkable. Fixed in the content; the check itself
  refined once, because the original length threshold was the wrong
  instrument ("Modern survey." is a good basis and is fourteen characters
  long). It now tests what the basis *says*.
- **10 hero-image collisions**, two of them predating this phase. The
  Parthenon photograph was serving the Athens city page, the Acropolis
  site page and the Parthenon monument at once. Resolved by giving each
  monument the photograph of itself and vendoring five general views for
  the pages that gave theirs up — including Memphis, whose page had been
  illustrated with a photograph of the Step Pyramid at Saqqara, which is
  a different place.

---

## Visual archive

Eighteen images, all licence-verified through the Commons API before
download, all with provenance in the directory READMEs.

Two rules, both of which caught something:

1. **Reconstructions are labelled.** The Curia Julia's roof is Bartoli's
   1930s work; the Arch of Titus's paler stone is Valadier's travertine;
   the Ara Pacis is original blocks with casts on a new site; the Stoa of
   Attalos is a complete 1950s rebuild.
2. **A near-identical wrong subject was avoided.** There is a Baths of
   Caracalla at Ankara as well as at Rome and Commons has good pictures
   of both. The file taken is the Roman one and the registry says so —
   which is precisely the Phase 26 failure mode this platform now checks
   for.

---

## Wiring

Reciprocal links are rendered by code from the same records:

- site pages → monuments standing on them
- city pages → monuments in them
- architecture type pages → monuments of that type
- museum pages → monuments they hold fragments of

Sitemap, section registry and the footer's Eras column all gain
Monuments. Homepage: **one band**, placed after architecture, because the
type page explains the form and the monument page is one building and
they read together.

---

## Adversarial review

Seven corrections in `e1c1a0c`. One factual: the Luxor obelisk in Paris
was described as the taller of the pair and is the shorter. Two
overstated rules softened (pomerium burial, the Colosseum lift count),
three aesthetic judgements hedged, one misleading code comment fixed.

Checked and deliberately unchanged because the framing was already right:
the Alföldy inscription reconstruction is labelled as one, the Pantheon's
function is left open, *instinctu divinitatis* is not resolved, the
Kadesh and Vergina records are set against their counter-sources, the
pyramid construction method is marked unknown, and the Tower of Babel
connection to Etemenanki is stated as modern inference.

---

## QA

```
npm run typecheck               clean
npm run lint                    clean
npm run validate:content:report 53 checks · 0 errors · 1 warning
npm run build                   847 static pages
```

Server smoke tests: all 35 monument routes 200, `/monuments/nope` 404,
one `<h1>` per page, zero images without `alt`, canonicals present, no
accidental `noindex`, sitemap carries `/monuments` 36 times, reciprocal
links correct in all four directions, HELPERG banner present and
WebmasterID inherited.

No client-side JavaScript added. No design change.

---

## Known limitations

- Thirty-five is a selection: the Propylaia, the Theatre of Marcellus,
  Palmyra, Petra, Baalbek and the Roman west are absent.
- Three monuments are unplaced because the platform has no page for
  ancient Thebes, Nubia or Deir el-Bahari.
- No coordinates on monuments — a building's position is its site's, and
  duplicating it would create two sources of truth.
- Measurement bases say what kind of figure it is, not which published
  survey it came from.
- Vespasian, Titus and Domitian have no figure pages, so the Colosseum's
  patrons cannot be linked. A gap in the biography layer that this one
  surfaces.
- **Flagged, not changed:** the WebmasterID tracker uses `next/script`
  with `strategy="afterInteractive"`. It is inherited correctly by every
  new route, which is what this phase was asked to verify. Whether events
  actually arrive deserves an independent check, because that strategy
  has been observed elsewhere to preload the script without executing the
  tracker. Out of scope here.
- No browser-based visual QA.

Full report: [`docs/phase-32-monuments.md`](docs/phase-32-monuments.md)
