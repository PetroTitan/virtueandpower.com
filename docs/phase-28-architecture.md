# Phase 28 — Ancient Architecture

Branch: `feat/ancient-architecture` (stacked on `feat/archaeology-museums`)
Date: 2026-07-28

---

## 1. What was built

| | |
|---|---|
| New routes | **27** (26 subjects + index) |
| New MDX entries | 9 architect and author biographies |
| New validator checks | 3 (**35 total**, from 32) |
| Corpus | 477 → **486** entries |
| Build | 687 → **723** static pages |
| Sitemap | 677 → **713** URLs |

26 subjects across eight tiers: sacred, civic, entertainment, water,
domestic, funerary, commemorative, and technique.

Nine biographies, because the platform had **no architects at all**:
Vitruvius, Imhotep, Iktinos, Apollodorus of Damascus, Archimedes, Heron
of Alexandria, Seneca, Pliny the Younger, Zeno of Citium.

**Branch note.** Fourth in the stack: warfare → cities →
archaeology-museums → architecture. None merged.

---

## 2. The boundary with Warfare, enforced

The brief listed Roads, Walls and Fortresses under architecture. Phase 26
already covers all three as military infrastructure, in detail —
surveying, construction layers, milestones, the Hellenistic response to
artillery, Roman frontier works.

Building them again here would produce exactly the failure the cities
layer was designed to avoid: two pages competing for one query. So this
layer **defers** rather than duplicates. `ARCHITECTURE_DEFERS_TO_WARFARE`
records five subjects with the reason for each, the index renders them as
links, and `architecture:no-duplication` fails the build if a slug
appears in both registries or if a deferral points at a warfare topic
that does not exist.

Verified: `/architecture/roman-roads` returns 404, and the index links to
`/warfare/roman-roads`.

---

## 3. The evidence question, restated for buildings

Every earlier phase attached evidence levels to *whether* something is
established. For architecture the useful question is different, and the
registry header states it: **how do we know what this looked like?**

The Parthenon stands. The Temple of Zeus at Olympia is column drums lying
where an earthquake dropped them. The Pharos is known only from
descriptions written centuries after it fell. And the tidy cutaway of a
Greek house in a textbook is a drawing with no single excavated original
behind it.

So every named building carries a level, and `architecture:evidence`
requires a `documented` example to say *how* its form is known —
standing, excavated, converted to a church, recovered underwater.

---

## 4. Adversarial review — 38 warnings, and why I fixed the content

The gate opened with 38 warnings, and the honest reading was that they
were right:

- **33 examples marked `documented` without saying how the form is
  known.** The registry header promises exactly that disclosure and the
  notes did not deliver it. I could have loosened the check; instead I
  added a specific clause to 60 example notes — *standing on the Via
  Sacra*, *three coffered vaults survive*, *the fallen drums survive in
  sequence*, *excavated underwater with concrete cores drilled*. That is
  the actual editorial value the check was asking for.
- **Five topics marked every claim and example `documented`** — agora,
  harbour, villa, construction-methods, building-materials. A page on
  ancient architecture with no uncertainty on it is overstating. Each
  gained a genuinely open question: how much of the agora was open at any
  one time; ancient harbour throughput; the productive-versus-residential
  villa proportion; how the largest architraves were actually lifted, which
  exceeds the calculated capacity of a reconstructed treadwheel crane; and
  the unmeasurable survival bias in perishable materials.

A second pass caught a **duplicated clause** introduced by the first fix,
on the Caesarea entry. Checked and cleared across all notes.

---

## 5. Editorial positions

**The survival bias is stated, not assumed.** Most ancient building was
mudbrick and timber and almost none survives; what survives is stone and
fired brick used for the exceptional. Every impression formed from ruins
is skewed, and the materials page says so directly.

**The pyramids were not built by enslaved foreigners.** The Giza workers'
settlement has been excavated — bakeries, breweries, accommodation, and
burials of workers with healed injuries treated well enough to survive.
The older story descends from Herodotus and later religious narrative and
has no material support. How the blocks were raised is marked `unknown`,
because it is.

**Vitruvius is treated as a hinge, not an oracle.** His origin stories
for the orders are aetiology, his proportions are more regular than the
buildings, and his disproportionate authority is an accident of survival:
he is the only substantial ancient architectural treatise we have.

**Ancient architectural authorship is mostly literary attribution.**
Imhotep is the outlier — named on a contemporary statue base of Djoser.
Iktinos is the norm: named by later writers, absent from the building
accounts that do survive.

**Heron's aeolipile is not a missed steam engine.** It sits in a book of
temple effects and self-opening doors, has no way to take work off it,
and the interesting question is why a culture with that much mechanical
skill aimed it at wonder rather than power.

---

## 6. Known limits

- **No new images vendored.** The archive already held 16 usable
  architectural photographs and they were wired to topics; several
  subjects still have no hero image.
- **Greek and Egyptian domestic architecture is thin** relative to Roman,
  which reflects the excavated record rather than a choice.
- **No browser-based visual QA.**

---

## 7. Verification

- `typecheck`, `lint`, `build` — clean, **723 static pages**
- `validate:content:report` — **35 checks, 0 errors, 1 warning** (the
  warning is Phase 27.5's deliberate incomplete-records count)
- Sitemap 713 URLs; all 26 subjects present
- `/architecture/roman-roads` → **404**, and the index links to the
  warfare page instead
- Single `h1` per page; 0 images without alt text
- No client-side JavaScript added

---

## 8. Ready for Phase 29 — Institutions & Government

The dependency the roadmap identified is now satisfied: several
institutions are inseparable from their buildings, and those buildings
exist. The Senate has the Curia and the forum; the Ecclesia has the Pnyx
and the agora; the Areopagus has its hill. Phase 29 can link to all of
them.
