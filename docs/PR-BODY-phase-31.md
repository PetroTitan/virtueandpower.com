# Phase 31 — Archaeological Sites

Adds the missing **Site** rung of the evidence ladder: twenty-six
excavated places at `/archaeology`, with the excavation history, the
structures, the finds and where they went, and what is still argued
about.

Base `main` @ `b989db5`. Build **784 → 811** static pages, sitemap
**774 → 801**, content-health checks **43 → 48**, archive images
**99 → 113**. Zero errors; the one warning is Phase 27.5's deliberate
incomplete-provenance count.

---

## Why this rather than the phase that was asked for

The brief proposed Cities → Archaeology → Architecture → Institutions →
Religion → Museums. **Five of the six are already merged** as this
repository's Phases 27, 27.5, 28, 29 and 30, and there was no stale-base
dependency to report.

The audit — [`docs/roadmap-phases-31-33.md`](docs/roadmap-phases-31-33.md)
— found that the graph the brief actually asks for,

```
Civilization → City → Site → Building → Artifact → Museum
```

is missing its two middle rungs. There was no page for Mycenae, Knossos,
the Roman Forum, Herculaneum, Giza, Karnak, Behistun or Ur, and the
seventy buildings the architecture registry names exist only as inline
data with no URL. This PR builds the Site rung. Phase 32 builds the
Building rung; Phase 33 deepens the museum layer.

---

## What is in it

| Region | Sites |
|---|---|
| Aegean and Greek (10) | Mycenae, Knossos, Akrotiri, Pylos, the Acropolis, the Athenian Agora, Delos, Eleusis, Epidaurus, Vergina |
| Roman (5) | The Roman Forum, the Palatine, Herculaneum, Hadrian's Villa, Dura-Europos |
| Egypt (6) | Giza, Saqqara, Karnak, the Valley of the Kings, Amarna, Deir el-Medina |
| Mesopotamia and Iran (5) | Pasargadae, Naqsh-e Rustam, Behistun, Ur, Nineveh |

111 recorded excavations with named excavators, 120 structures, 103 finds
traced to a holder, 105 occupation phases, 54 unresolved questions, 61
ancient sources cited by locus, **781 typed graph edges**.

---

## The boundary with `/cities`, enforced rather than intended

Four of these sites sit inside cities the platform already covers. The
mitigation is mechanical:

- a site slug may not be a city slug, and a site title may not be a city
  title;
- the section headings are declared in the registry and checked against
  `CITY_SECTION_HEADINGS`;
- the reciprocal links are rendered by code from the same records —
  the site page's disambiguation line and the city page's "Excavated
  sites" list — so neither direction can be forgotten.

**A real defect this caught:** the city page originally derived its list
from an accessor matching the parent city *or* any `cityRefs` entry, so
Athens claimed Delos, Eleusis and Epidaurus as excavations in Athens. The
loose accessor is deleted rather than left available to be misused again.

---

## Two models introduced

**Geography.** Decimal-degree coordinates, given as a pair or not at all,
range-checked, capped at four decimal places, and **required to name the
feature they point at** — the Lion Gate, the Great Hypostyle Hall, the
tomb of Cyrus. A site is not a point and its extent is usually the thing
under discussion. All 26 carry a pair; pages render three decimals with
the subject and the precision stated.

**Chronology.** A signed integer year, negative for BCE, **no year zero**
(1 BCE is followed by 1 CE, and the validator rejects a zero), carried
with the precision it actually has — `exact`, `approximate`, `century`,
`traditional`, `disputed`, `unknown` — and the string that is rendered.
No `Date` anywhere. `sites:chronology` checks that the display string
agrees with its own year and era, because the rendered string is what a
reader sees and it is the field most likely to drift.

---

## Five new checks (43 → 48)

| Check | What it prevents |
|---|---|
| `sites:refs` | A slug into any of fourteen registries that does not resolve; a find that says nothing about where it is now |
| `sites:geography` | Half a coordinate pair, an out-of-range value, null island, false precision, a pair with no named subject |
| `sites:chronology` | Year zero, an end before a start, a display string that disagrees with its own year or era |
| `sites:evidence` | A site with no excavation history, no finds, no unresolved question, or an empty source list that does not declare why |
| `sites:no-duplication` | A site slug or title colliding with a city, and a section heading colliding with the city template's |

---

## Editorial position

The excavators' errors are the subject rather than an aside — the
Commodus that was Constantine, Woolley's flood, Evans's concrete,
Balanos's iron clamps, Marinatos digging to prove a hypothesis the
chronology has not sustained. Three sites declare that antiquity never
described them, which the gate requires rather than permitting a silently
empty list. Royal self-justification is labelled: Behistun both unlocked
cuneiform and is a usurper's likely cover story, and the page says both.
Modern national symbolism is kept off the ancient page. Pseudo-archaeology
is answered once, briefly, with the reason, and not amplified.

`sites:evidence` requires an unresolved question on every page and warns
when everything on one is marked `documented`.

---

## Visual archive

Fourteen images vendored, all licence-verified through the Commons API
before download, all with provenance in the directory READMEs — including
a new `public/images/inscription/README.md`. Every one of the 26 sites
now has a hero image.

Two rules, aimed at the failure this material invites:

1. **Where the photograph shows a reconstruction, the caption says so** —
   Knossos's north entrance, the Delos lions, the Ur ziggurat's upper
   stages, the Mashki Gate at Nineveh. A reader cannot tell reinforced
   concrete from gypsum in a photograph.
2. **Where a Commons file name asserts a disputed identification, the
   caption does not repeat it.** The Vergina file is titled "Facade of
   Philip II tomb"; the caption says Tomb II.

Two are excavation photographs rather than photographs of results — Deir
el-Medina in 1905–1909, Herculaneum in about 1929 — which is the better
image for a page about how evidence was recovered.

---

## Homepage

**One band, not three.** The brief's own warning about six new full-width
bands applies, and the object and museum layers had no homepage presence
at all, so **Material evidence** is a single gateway for archaeology,
objects and museums together, placed after the city, building,
institution and cult bands because it answers the question those four
raise.

---

## Adversarial review

Nine corrections applied in `d3366f5` after rechecking every load-bearing
claim against the sources:

- five factual (the Treasury of Atreus diameter, the Behistun panel
  dimensions, the Karnak precinct area, the Athenian Constitution papyrus
  date, and a citation of Arrian for rock tombs he does not describe —
  replaced with Diodorus 17.71.7);
- four overstatements softened (Evans's role in Wace's lost permit, the
  excavated fraction of Akrotiri, the century a Delos lion reached
  Venice, the Thera Spring Fresco claim).

Checked and deliberately not changed, because the framing was already
right: the Mask of Agamemnon forgery argument, the labrys etymology,
Atlantis, Carandini's wall, Herodotus's hundred thousand pyramid workers,
the Hatshepsut erasure motive, the pharaoh's curse, Strabo's ten thousand
slaves a day, the Nefertiti bust division.

---

## QA

```
npm run typecheck               clean
npm run lint                    clean
npm run validate:content:report 48 checks · 0 errors · 1 warning
npm run build                   811 static pages
```

Server smoke tests: all new routes 200, `/archaeology/nope` 404, one
`<h1>` per page, zero images without `alt`, canonicals present, no
accidental `noindex`, `geo` emitted only where coordinates exist,
reciprocal links correct in both directions on Athens, Rome, Corinth and
the British Museum.

No client-side JavaScript added. No design change. WebmasterID and the
HELPERG ecosystem banner are inherited from the root layout and untouched.

---

## Known limitations

- Coordinates are locators, not survey data — rendered with the feature
  named and the precision stated.
- 26 sites is a selection; Tiryns, Masada, Palmyra, Petra, Hattusa and
  much of the Roman west are absent.
- Regional imbalance: ten Aegean sites against five in Mesopotamia and
  Iran.
- No monument pages yet. Structures link to the building *type*, not to
  themselves, which makes those sections the weakest part of the layer
  until Phase 32.
- Several finds resolve to `heldAt` prose because the institution is not
  in the museum registry — Cairo, the Grand Egyptian Museum, the Neues
  Museum, the Penn Museum. Phase 33.
- No browser-based visual QA.

Full report: [`docs/phase-31-archaeological-sites.md`](docs/phase-31-archaeological-sites.md)
