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
