# Artifacts

Museum objects, steles, inscriptions, sculpture and traditional
portraits — the portable and freestanding material the editorial
system uses, as distinct from standing architecture (`../architecture`)
and the figure-portrait busts (`../busts`). Vendored locally so the
provenance is file-system-traceable; the typed registry lives at
[`src/data/archive-images.ts`](../../../src/data/archive-images.ts).
Dropping a file here is not enough — it must also be registered there.

## Catalog

### `hammurabi-stele.webp`

- **Subject.** The upper relief of the Code of Hammurabi stele: the
  king before the enthroned sun-god Shamash, who hands him the rod and
  ring of just rule, above the columns of cuneiform law.
- **Location.** Musée du Louvre, Paris (Sb 8).
- **Source.** Wikimedia Commons,
  [`File:P1050763 Louvre code Hammurabi face rwk.JPG`](https://commons.wikimedia.org/wiki/File:P1050763_Louvre_code_Hammurabi_face_rwk.JPG).
- **Photographer.** Mbzt.
- **Licence.** **CC BY 3.0.** Attribution required.
- **Source dimensions.** 1215 × 2000.
- **Local processing.** Resized to 1600 px longest edge, WebP q80 e6;
  ~180 KB at 972 × 1600. Vendored Phase 17 for the Hammurabi figure,
  the Code of Hammurabi text page, and the Babylon hub.

### `babylon-processional-lion.webp`

- **Subject.** A striding lion of Ishtar from the reconstructed
  Processional Way of Babylon, moulded relief on lapis-blue glazed
  brick (Neo-Babylonian, c. 575 BCE).
- **Location.** Pergamon Museum, Berlin.
- **Source.** Wikimedia Commons,
  [`File:Reconstructed Processional Street of Babylon showing striding and roaring lions. From Babylon, Iraq. Pergamon Museum in Berlin.jpg`](https://commons.wikimedia.org/wiki/File:Reconstructed_Processional_Street_of_Babylon_showing_striding_and_roaring_lions._From_Babylon,_Iraq._Pergamon_Museum_in_Berlin.jpg).
- **Photographer.** Osama Shukir Muhammed Amin FRCP(Glasg).
- **Licence.** **CC BY-SA 4.0.** Attribution required.
- **Source dimensions.** 6016 × 4016.
- **Local processing.** Same pipeline; ~373 KB at 1600 × 1068.
  Vendored Phase 17 for the Babylon hub.

### `gortyn-law-code.webp`

- **Subject.** A stretch of the Great Code of Gortyn, the longest
  surviving Greek law inscription, carved boustrophedon (alternating
  line direction) on a curved stone wall (c. 450 BCE).
- **Location.** Gortyn, Crete.
- **Source.** Wikimedia Commons,
  [`File:Boustrophedon inscriptions Gortys.jpg`](https://commons.wikimedia.org/wiki/File:Boustrophedon_inscriptions_Gortys.jpg).
- **Photographer.** Jebulon.
- **Licence.** **CC0** (public-domain dedication).
- **Source dimensions.** 3820 × 3152.
- **Local processing.** Same pipeline; ~624 KB at 1600 × 1320.
  Vendored Phase 17 for the codification theme and the law essays.

### `terracotta-warrior.webp`

- **Subject.** Close view of a single infantryman of the Terracotta
  Army — an individually modelled face and armoured torso.
- **Location.** Mausoleum of Qin Shi Huang, Lintong, Xi'an, China.
- **Source.** Wikimedia Commons,
  [`File:Terracota warrior close-up.jpg`](https://commons.wikimedia.org/wiki/File:Terracota_warrior_close-up.jpg).
- **Photographer.** J. Arpon.
- **Licence.** **CC BY-SA 3.0.** Attribution required.
- **Source dimensions.** 1291 × 1800.
- **Local processing.** Same pipeline; ~200 KB at 1148 × 1600.
  Vendored Phase 17 for the Qin Shi Huang figure and the
  early-imperial-China hub.

### `leonidas-hoplite.webp`

- **Subject.** Marble statue of an early-Classical Spartan warrior in a
  crested Corinthian helmet, found on the Spartan acropolis and
  traditionally (not certainly) identified as Leonidas (c. 480–470 BCE).
- **Location.** Archaeological Museum of Sparta.
- **Source.** Wikimedia Commons,
  [`File:Statue of a hoplite, known as "Leonidas." 5th cent. B.C.jpg`](https://commons.wikimedia.org/wiki/File:Statue_of_a_hoplite,_known_as_%E2%80%9CLeonidas.%E2%80%9D_5th_cent._B.C.jpg).
- **Photographer.** George E. Koronaios.
- **Licence.** **CC BY-SA 4.0.** Attribution required.
- **Source dimensions.** 2142 × 2949.
- **Local processing.** Same pipeline; ~83 KB at 1162 × 1600.
  Vendored Phase 17 for the Sparta hub, the Lycurgus figure and the
  Sparta comparisons.

### `confucius-portrait.webp`

- **Subject.** The traditional standing portrait of Confucius after
  the Tang-dynasty painter Wu Daozi — a representational type, not a
  contemporary likeness (no contemporary likeness of the 6th–5th c. BCE
  sage exists).
- **Source.** Wikimedia Commons,
  [`File:Confucius Tang Dynasty.jpg`](https://commons.wikimedia.org/wiki/File:Confucius_Tang_Dynasty.jpg).
- **Artist.** After Wu Daozi (685–758 CE).
- **Licence.** **Public domain** (by age).
- **Source dimensions.** 350 × 640 (small original; not enlarged).
- **Local processing.** Re-encoded to WebP q80 e6; ~63 KB at 350 × 640.
  Vendored Phase 17 for the Confucius figure and the
  early-imperial-China hub. Used at small / portrait sizes only.

## Adding new artifacts

Same pipeline as the architecture directory. Verify a CC0 /
public-domain / CC BY / CC BY-SA licence and an unambiguous
identification via the Commons API, resize to 1600 px longest edge,
encode WebP q80 e6, register in `src/data/archive-images.ts`, and add
an entry here. No AI-generated imagery, ever.
