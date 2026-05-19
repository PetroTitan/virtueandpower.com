# Architecture

Museum-grade photographs of standing or partially-standing buildings,
columns, forums, temples, and civic spaces used by the editorial
system. Vendored locally so the site has no third-party dependency
on the hosting CDN and so the provenance is file-system-traceable.

The typed registry lives at
[`src/data/archive-images.ts`](../../../src/data/archive-images.ts);
dropping a file into this directory is not enough — it must also be
registered there.

## Catalog

### `trajans-column.webp`

- **Subject.** Trajan's Column, completed 113 CE. Forum of Trajan,
  Rome. The single most influential narrative monument of antiquity;
  the spiral relief survives the loss of the bronze statue of Trajan
  that originally crowned it.
- **Source.** Wikimedia Commons,
  [`File:Colonna Traiana Santissimo Nome di Maria dome Rome.jpg`](https://commons.wikimedia.org/wiki/File:Colonna_Traiana_Santissimo_Nome_di_Maria_dome_Rome.jpg).
- **Photographer.** Jebulon.
- **Licence.** **CC-Zero (public-domain dedication).**
- **Source dimensions.** 2944 × 3810.
- **Local processing.** Resized to 1600 px on the longest edge with
  `sharp`, encoded as WebP at quality 80, effort 6. Resulting file is
  ~239 KB at 1236 × 1600.

### `pantheon-ceiling.webp`

- **Subject.** Interior of the Pantheon, Rome — view from below the
  coffered dome looking up at the central oculus. Rebuilt c.
  113–125 CE under Trajan and Hadrian.
- **Source.** Wikimedia Commons,
  [`File:Pantheon, Rome, ceiling, 2013-03-07.jpg`](https://commons.wikimedia.org/wiki/File:Pantheon,_Rome,_ceiling,_2013-03-07.jpg).
- **Photographer.** Szilas (Wikimedia user).
- **Licence.** **CC-Zero (public-domain dedication).**
- **Source dimensions.** 3168 × 4752.
- **Local processing.** Same pipeline; resulting file is ~260 KB at
  1067 × 1600.

### `colosseum-curves.webp`

- **Subject.** The Colosseum, exterior curve seen in vertical
  perspective from below. Flavian amphitheatre, 70–80 CE.
- **Source.** Wikimedia Commons,
  [`File:Curves perspective, Colosseum, Rome, Italy.jpg`](https://commons.wikimedia.org/wiki/File:Curves_perspective,_Colosseum,_Rome,_Italy.jpg).
- **Photographer.** Jebulon.
- **Licence.** **CC-Zero.**
- **Source dimensions.** 3056 × 4592.
- **Local processing.** Same pipeline; ~463 KB at 1065 × 1600.

### `parthenon-east.webp`

- **Subject.** The Parthenon, east end on the Athenian Acropolis,
  447–432 BCE.
- **Source.** Wikimedia Commons,
  [`File:Parthenon east Acropolis, Athens, Greece.jpg`](https://commons.wikimedia.org/wiki/File:Parthenon_east_Acropolis,_Athens,_Greece.jpg).
- **Photographer.** Jebulon.
- **Licence.** **CC-Zero.**
- **Source dimensions.** 3048 × 4624.
- **Local processing.** Same pipeline; ~104 KB at 1055 × 1600.

### `delphi-apollo.webp`

- **Subject.** Six surviving columns of the Temple of Apollo at
  Delphi, with the Phaedriades cliffs behind.
- **Source.** Wikimedia Commons,
  [`File:Delphes, Grèce. Temple d'Apollon. Six colonnes.jpg`](https://commons.wikimedia.org/wiki/File:Delphes,_Gr%C3%A8ce._Temple_d%27Apollon._Six_colonnes.jpg).
- **Photographer.** Jebulon.
- **Licence.** **CC-Zero.**
- **Source dimensions.** 6000 × 4000.
- **Local processing.** Same pipeline; ~469 KB at 1600 × 1067.

### `persepolis-apadana.webp`

- **Subject.** Bas-relief on the eastern stairway of the Apadana
  at Persepolis — Achaemenid tribute procession of subject peoples,
  c. 515–490 BCE under Darius I and Xerxes I.
- **Source.** Wikimedia Commons,
  [`File:Persepolis Apadana Eastern Stairway Triangle.jpg`](https://commons.wikimedia.org/wiki/File:Persepolis_Apadana_Eastern_Stairway_Triangle.jpg).
- **Photographer.** JMCC1 (Wikimedia user).
- **Licence.** **Public domain.**
- **Source dimensions.** 1897 × 1265.
- **Local processing.** Same pipeline; ~358 KB at 1600 × 1067.

### `giza-pyramids.webp`

- **Subject.** The three principal pyramids of Giza — Khufu,
  Khafre and Menkaure — Old Kingdom Egypt, c. 2600–2500 BCE.
- **Source.** Wikimedia Commons,
  [`File:Pyramids of Giza, Giza, GG, EGY (47113315194).jpg`](https://commons.wikimedia.org/wiki/File:Pyramids_of_Giza,_Giza,_GG,_EGY_(47113315194).jpg).
- **Photographer.** Tm (Wikimedia user).
- **Licence.** **CC-Zero.**
- **Source dimensions.** 3358 × 2517.
- **Local processing.** Same pipeline; ~58 KB at 1600 × 1199.

### `karnak-hypostyle.webp`

- **Subject.** Sandstone columns of the Great Hypostyle Hall of
  the Temple of Amun at Karnak, New Kingdom Egypt, c. 1290–1224 BCE
  under Seti I and Ramesses II.
- **Source.** Wikimedia Commons,
  [`File:Karnak Temple Great Hypostyle Hall 2014.jpg`](https://commons.wikimedia.org/wiki/File:Karnak_Temple_Great_Hypostyle_Hall_2014.jpg).
- **Photographer.** Tsyganov Sergey.
- **Licence.** **CC-Zero.**
- **Source dimensions.** 2826 × 2322.
- **Local processing.** Same pipeline; ~340 KB at 1600 × 1315.

## Adding new architecture images

1. Find a CC0 / public-domain (or attribution-friendly) photograph
   of a building or civic space whose identification is solid.
2. Download the largest available source.
3. Resize to 1600 px on the longest edge and encode as WebP at
   quality 80, effort 6.
4. Commit the file to this directory.
5. Add an entry to this README with subject, location, source URL,
   photographer, licence, and source dimensions.
6. Register it in `src/data/archive-images.ts`.
