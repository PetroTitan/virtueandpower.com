# Phase 27 — Ancient Cities

Branch: `feat/ancient-cities` (stacked on `feat/warfare-encyclopedia`)
Date: 2026-07-28

---

## 1. What was built

| | |
|---|---|
| New routes | **15** (14 cities + index) |
| New registry entries | 14 cities |
| New images | 8, licence-verified, with provenance |
| New validator checks | 3 (**29 total**, from 26) |
| Build | 630 → **645** static pages |
| Sitemap | 620 → **635** URLs |

Cities: Athens, Sparta, Corinth, Delphi, Olympia, Rome, Ostia, Pompeii,
Alexandria, Memphis, Persepolis, Susa, Babylon, Troy.

**Branch note.** This branch is stacked on `feat/warfare-encyclopedia`,
which is not yet merged. City pages link to `/warfare/*` and
`/warfare/battles/*` routes that exist only on that branch, and the
`cities:refs` check resolves those links. Either merge Phase 26 first and
rebase, or set this PR's base to the warfare branch.

---

## 2. Option A, enforced rather than trusted

The approved decision was to split the settlement layer from the polity
layer for the four names that collide. That carried a real risk of two
pages competing for the same query, so the mitigation is mechanical.

**Three enforcement mechanisms:**

1. **Heading disjointness.** `CITY_SECTION_HEADINGS` is declared in the
   registry, and `cities:place-vs-polity` fails the build if any of those
   headings appears as an H2 on a paired civilization page. The city
   headings — *The site and its setting*, *Urban plan*, *Cult and
   sanctuaries*, *Archaeology and excavation* — were chosen to be
   disjoint from the existing civilization headings (*Political
   structure*, *Military structure*, *Architectural identity*).
2. **Reciprocal linking.** The city template renders its disambiguation
   line automatically, so that direction cannot fail. The civilization
   side is hand-written MDX and is therefore checked: the counterpart
   must link to the city page, and within roughly the first 1,200
   characters. All four civilization pages were edited to carry it.
3. **Referential integrity.** `cities:refs` resolves every cross-registry
   slug — civilizations, philosophers, themes, books, warfare topics,
   battles, maps, archive images, other cities.

The gate immediately demanded all four reciprocal links and caught a
`figureRefs` entry pointing at `pliny-the-elder`, which does not exist as
a figure page.

---

## 3. Population figures — the Phase 26 apparatus, carried over

The Phase 26 report predicted this: *"`ForceEstimate`'s shape generalises
to any contested quantity. Phase 27 needs it for ancient city
populations, which are as unreliable as troop numbers and are quoted with
equal confidence."*

`PopulationEstimate` carries the figure, the basis it rests on, an
evidence level and an assessment. There is no field for a bare number,
and `cities:populations` rejects any estimate without a basis or with an
assessment under a substantive sentence. It also requires every city to
state *something* — where nothing is recoverable, the page says so at
level `unknown` rather than staying silent.

Worked results:

- **Rome** — "about one million" is marked `disputed` and identified as
  an inference from the grain dole and assumed density, with the range
  500,000–1,000,000+ stated. The **200,000 grain-dole recipients** from
  *Res Gestae* 15 is marked `documented` separately, because that one is
  an administrative register — and the page says explicitly that
  converting it into a population is where the disagreement lives.
- **Alexandria** — Diodorus's 300,000 free inhabitants is marked
  `disputed` and identified as the single ancient figure behind two
  thousand years of repetition.
- **Memphis** — `unknown`. One of the most important cities of the
  ancient world, and its size is not known.
- **Athens** — the citizen figure is firmest because armies and juries
  were counted; the enslaved population is flagged as ranging from
  ~20,000 to over 100,000 in serious estimates.

---

## 4. Editorial positions taken

**Archaeological bias is named, not hidden.** Memphis's page states the
systematic bias in Egyptian archaeology: tombs were stone on the desert
edge and survive, cities were mudbrick on the floodplain and did not —
so what we know about Egypt is disproportionately what Egyptians built
for the dead.

**Excavation history includes its own damage.** The Acropolis clearances
removed the medieval and Ottoman phases. Ostia's 1938–42 campaign cleared
two-thirds of the town at speed for a planned exposition. Rome's
1920s–30s clearances drove a road through the imperial fora. Schliemann
dug through the level he was looking for. Koldewey shipped Babylon's
glazed brick to Berlin. Each is stated on the relevant page.

**Contested holdings are marked.** The Parthenon sculptures, the Ishtar
Gate, the Susa material in the Louvre, Priam's Treasure in Moscow, the
Persepolis tablets in Chicago. Each museum entry that is disputed carries
a `note` saying so, without the platform taking a side.

**Famous things that may not have existed are labelled.** The Hanging
Gardens are marked `disputed` at monument level, with the absence from
Babylonian sources stated and Dalley's Nineveh relocation described as
taken seriously and not established.

**Foundation myths are marked `mythological`** — the level added in Phase
26 for exactly this. Romulus, Menes, Cecrops, Ilus. Rome's page also
notes that the traditional 753 BCE date is a late Republican calculation.

---

## 5. Adversarial review

Beyond the gate findings:

- **Sparta was left without a hero image** rather than borrowed one from
  another site. The same rule applied in Phase 26 when Masada was removed
  from the Alesia page.
- **`placeJsonLd` deliberately emits no geo coordinates.** Several of
  these sites are not securely located and the extent of Memphis is not
  established; a coordinate pair is a precision claim. Country only.
- **The Susa archer frieze note** states that its common identification
  as an "Immortal" is an inference — the panels carry no label, and the
  corps is not named in Persian sources.
- **Delphi's treasury caption** records that the building was re-erected
  in the twentieth century, so what stands is a reconstruction rather
  than a standing ancient building.

---

## 6. Known limits

- **No battle pages for Egypt or Mesopotamia** yet, so Memphis, Babylon
  and Susa carry thinner `battleRefs` than the Greek cities.
- **Sparta has no vendored image.**
- **Pompeii's eruption date** is presented as disputed, with the 2018
  charcoal inscription and the autumn evidence against the transmitted
  24 August. Not resolved, because it is not resolved.
- **No browser-based visual QA**; verification was against built HTML.

---

## 7. Verification

- `typecheck`, `lint`, `build` — clean, **645 static pages**
- `validate:content:report` — **29 checks, 0 errors, 0 warnings**
- Sitemap 635 URLs; all 14 cities present
- `/cities/atlantis` → 404 (`dynamicParams = false`)
- Disambiguation verified in **both** directions on all four pairs
- Place JSON-LD present; **no geo coordinates**; no aggregate claims
- Single `h1` per page; 0 images without alt text
- 8 images licence-verified via the Commons API: 1 CC0, 1 CC BY, 1 public
  domain, 5 CC BY-SA, with provenance in the registry and READMEs
- No client-side JavaScript added

---

## 8. Ready for Phase 27.5

The `museums` field on every city is the hook the Archaeology & Museums
phase attaches to. Fourteen cities now carry 40 museum holdings with
institution, location, what they hold and — where relevant — the dispute
over how they got it. `ObjectProvenance` records in 27.5 will key to
those institutions and to the existing bust and archive-image slugs.
