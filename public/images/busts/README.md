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
