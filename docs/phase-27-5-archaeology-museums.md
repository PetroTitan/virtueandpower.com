# Phase 27.5 — Archaeology & Museums

Branch: `feat/archaeology-museums` (stacked on `feat/ancient-cities`)
Date: 2026-07-28

---

## 1. What was built

| | |
|---|---|
| New routes | **42** (19 museums + index, 22 objects) |
| New registry entries | 19 museums, 22 objects |
| New validator checks | 3 (**32 total**, from 29) |
| Build | 645 → **687** static pages |
| Sitemap | 635 → **677** URLs |

Routes: `/museums`, `/museums/[slug]`, `/objects/[slug]`, plus a
provenance panel now rendered on every figure page whose bust has a
record.

**Branch note.** Third in the stack: `feat/warfare-encyclopedia` →
`feat/ancient-cities` → `feat/archaeology-museums`. None merged. Merge in
order, or set each PR's base to its predecessor.

---

## 2. The worked example, verified

Your brief specified the chain. It now runs end to end:

`/philosophers/julius-caesar` → shows the portrait, and beneath it:
**Tusculum** (findspot) → **1825, Lucien Bonaparte** (excavation) →
**Museo di Antichità, Turin** (linked institution) → **identified as
Caesar by Maurizio Borda in 1940**, a hundred and fifteen years after
excavation → identification resting on the denarii of Marcus Mettius →
`/objects/tusculum-caesar` for the full record.

Before this phase the same page said only who took the photograph.

---

## 3. The completeness rule — the core design decision

This registry could have been filled out to look complete. Inventory
numbers, findspots and excavation dates are exactly the fields easiest to
invent and hardest for a reader to check, and **a plausible catalogue
entry is worse than a blank one, because it forecloses the question.**

So `completeness` is a required field, rendered on the page as *Record
checked* or *Record incomplete*, and partial records must name what is
missing in `gaps`. Optional fields are left undefined rather than
guessed, and the template prints "Not recorded in this catalogue".

**11 of 22 records are checked; 11 are incomplete.** That split is
reported on `/museums`, disclosed on each object page, and counted by
`provenance:coverage` so it cannot drift upward unnoticed. It is the
intended state, not a shortfall.

Fully verified against published sources: the Tusculum Caesar, the Azara
herm (Louvre MR 405 / Ma 436, Tivoli 1779), the Constantine colossus
(1486, Basilica of Maxentius), the Chiaramonti Demosthenes (Villa
Aldobrandini, Vatican 1823), the Pericles herm, the Mycenae mask, the
boar's-tusk helmet, the Ishtar Gate, the Susa archer frieze and the
Alexander Mosaic.

---

## 4. What the identification field turned up

Provenance made the platform's own images say things it had not been
saying:

- **The Constantine colossus was called Commodus for four centuries.**
  Found 1486, reassigned only at the end of the nineteenth century.
- **The Caesar sat unidentified for 115 years** in a Savoy royal
  collection.
- **The bust captioned "Plutarch" is a modern commemorative sculpture.**
  No ancient portrait of Plutarch survives. A reader looking at the
  photograph had no way to know; the record now says so, an
  `objectStatus` field marks it, and the gate fails the build if a modern
  object carries a findspot or fails to state its modernity in prose.
- **The Susa archers are routinely captioned "Immortals."** The panels
  carry no label and the corps is not named in Persian sources.
- **The Alexander Mosaic carries no label either** — Issus or Gaugamela
  is an art-historical inference.

---

## 5. Adversarial review — a real error I introduced and caught

Building the registry, I wrote three object records with a **knowingly
wrong holding institution** and documented the error in the `gaps` field:
the Dura-Europos scutum filed under the Vatican, the Athlit ram under
Athens, the Chigi vase under the Museo Nazionale Romano — each annotated
"the institution recorded here is provisional".

That is worse than an omission. It stores a false fact and relies on
prose to undo it. The fix was to add the three real institutions — Yale
University Art Gallery, the National Maritime Museum in Haifa, and the
Villa Giulia — so the field is simply correct. `provenance:refs` now
rejects an unresolvable museum with the hint *"Add the institution rather
than recording a known-wrong holder and annotating it."*

The gate also caught the boar's-tusk helmet marked `full` while carrying
no excavation record; it now names that gap.

---

## 6. Contested holdings

Recorded on the institution, because a collection description that omits
a live claim is not describing the collection. The Parthenon sculptures
(British Museum / Greece), the Ishtar Gate (Pergamon / Iraq), the Susa
material (Louvre, concession archaeology), Priam's Treasure (Pushkin),
the Persepolis tablets (Chicago, returning in stages).

Each states the object, the claimant and the state of the dispute. The
gate requires all three. **The platform does not adjudicate any of them**
— the fact that matters editorially is that a sculptural programme is now
divided between two cities.

---

## 7. Known limits

- **11 incomplete records** await verification against published museum
  catalogues. Named individually on `/museums`.
- **Inventory numbers are recorded for two objects only** (Azara herm,
  Susa frieze) plus the NAMA helmet. Everywhere else the field is blank
  rather than guessed.
- **77 archive images have no provenance record** — this phase covered
  all 14 busts and 8 high-value archive objects.
- **No browser-based visual QA.**

---

## 8. Verification

- `typecheck`, `lint`, `build` — clean, **687 static pages**
- `validate:content:report` — **32 checks, 0 errors, 1 warning** (the
  warning is the deliberate incomplete-records count)
- Sitemap 677 URLs; 19 museums and 22 objects present
- `/objects/nope` → 404
- Single `h1` per page; 0 images without alt text
- Worked example verified live on the Caesar page
- No client-side JavaScript added

---

## 9. Ready for Phase 28

Architecture now has both halves of what it needs: cities to stand
buildings in, and an object layer to attach finds to. `ObjectProvenance`
extends to architectural fragments without schema change.
