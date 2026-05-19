# Bust photographs

Public-domain museum-grade marble bust photographs used as
sculptural anchors in the editorial composition (hero, and any
future inline references in essays / guides). Vendored locally
rather than hot-linked so the site has no third-party dependency
on Wikimedia's CDN and so the provenance is file-system-traceable.

## Catalog

### `marcus-aurelius-heraklion.webp`

- **Subject.** Marble head of the Emperor Marcus Aurelius (reigned
  161–180 CE). Roman portraiture, 2nd century.
- **Location.** Archaeological Museum of Heraklion, Crete.
- **Source.** Wikimedia Commons,
  [`File:Head Marcus Aurelius archmus Heraklion.jpg`](https://commons.wikimedia.org/wiki/File:Head_Marcus_Aurelius_archmus_Heraklion.jpg).
- **Photographer.** Jebulon.
- **Licence.** **CC-Zero (public domain dedication).** No attribution
  is required by the licence; we attribute it anyway in the in-page
  caption and here, because it's the right thing to do and because
  it lets future editors trace the work without leaving the
  repository.
- **Source dimensions.** 2809 × 4317.
- **Local processing.** Resized to 1600 px wide with `sharp` (the
  same image processor Next.js uses internally), encoded as WebP at
  quality 80, effort 6. Resulting file is ~183 KB at 1600 × 2459;
  Next/Image emits further variants at request time.
- **Used by.** `src/components/site/BustImage.tsx` (default bust
  for the homepage hero via `MARCUS_AURELIUS`).

### `julius-caesar-tusculum.webp`

- **Subject.** Marble head of Julius Caesar — the *Tusculum
  portrait*, the only surviving likeness of Caesar widely
  accepted by scholarship as carved from life. Late Republican,
  c. 50–40 BCE.
- **Location.** Museo di Antichità, Turin.
- **Source.** Wikimedia Commons,
  [`File:Retrato de Julio César (26724093101).jpg`](https://commons.wikimedia.org/wiki/File:Retrato_de_Julio_C%C3%A9sar_(26724093101).jpg).
- **Photographer.** Ángel M. Felicísimo (Flickr).
- **Licence.** **Public domain** (faithful photographic
  reproduction of a public-domain ancient work).
- **Source dimensions.** 1984 × 3500.
- **Local processing.** Same pipeline as above; resulting file
  is ~58 KB at 907 × 1600.

### `augustus-louvre.webp`

- **Subject.** Marble portrait of Augustus as a young man,
  Greek marble found on Kos, dated c. 27–20 BCE — among the
  earliest extant portraits of Augustus after the settlement
  of 27.
- **Location.** Louvre, Paris (inv. Ma 2577).
- **Source.** Wikimedia Commons,
  [`File:Young August Louvre Ma2577.jpg`](https://commons.wikimedia.org/wiki/File:Young_August_Louvre_Ma2577.jpg).
- **Photographer.** Marie-Lan Nguyen (Wikimedia user
  *Jastrow*).
- **Licence.** **Public domain** (Wikimedia's standard release
  for Jastrow's faithful reproductions of ancient works).
- **Source dimensions.** 2550 × 3500.
- **Local processing.** Same pipeline; resulting file is ~128
  KB at 1166 × 1600.

### `pericles-vatican.webp`

- **Subject.** Marble herm of Pericles wearing the
  *strategos* helmet — Roman copy after the lost bronze
  original by Kresilas of c. 430 BCE. The canonical likeness
  of Pericles in the European tradition.
- **Location.** Museo Pio-Clementino, Vatican (inv. 269).
- **Source.** Wikimedia Commons,
  [`File:Pericles Pio-Clementino Inv269.jpg`](https://commons.wikimedia.org/wiki/File:Pericles_Pio-Clementino_Inv269.jpg).
- **Photographer.** Marie-Lan Nguyen (Wikimedia user
  *Jastrow*).
- **Licence.** **Public domain.**
- **Source dimensions.** 1275 × 2560.
- **Local processing.** Same pipeline; resulting file is ~102
  KB at 797 × 1600.

## Adding new busts

1. Find a public-domain (CC0 / PD-old) or attribution-friendly
   (CC-BY / CC-BY-SA) photograph on Wikimedia Commons or a museum
   open-access program (Met, Smithsonian, Cleveland, Getty Open
   Content).
2. Download the largest available source.
3. Resize to 1600 px on the longest edge and encode as WebP at
   quality 80, effort 6.
4. Commit the file to this directory.
5. Add a new entry to this README with subject, location, source
   URL, photographer, licence, and source dimensions.
6. Register it in `src/components/site/BustImage.tsx` (extend the
   `Bust` registry).

The platform's editorial policy applies here as much as it applies
to text: no fabricated provenance, no uncertain attributions, no
images whose rights status we have not verified.
