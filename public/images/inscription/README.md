# Inscriptions

Epigraphic material — stelae, cippi, milestones, votive stones, rock-cut
royal texts — where the carved text is the record rather than an
illustration of one. Vendored locally; provenance recorded here and in
the typed registry at
[`src/data/archive-images.ts`](../../../src/data/archive-images.ts).

Inscriptions carry a specific hazard: a photograph of a stone shows that
a text exists and says nothing about what it says. Captions in this
directory state what the inscription is and, where the reading or the
attribution is argued, that it is argued. They do not paraphrase a text
the photograph does not make legible.

## Adding new inscription images

1. Verify licence, author and source dimensions through the Wikimedia
   Commons API, or use a museum open-access record with equivalent
   metadata.
2. Download the largest available source.
3. Resize to 1600 px on the longest edge and encode as WebP at quality
   80, effort 6.
4. Commit the file to this directory.
5. Add an entry here with subject, location, source URL, photographer,
   licence and source dimensions.
6. Register it in `src/data/archive-images.ts`, with `kind:
   "inscription"`.

## Catalog

### `amarna-boundary-stela.webp`

- **Subject.** A boundary stela of Akhetaten, cut into the cliffs at
  Tell el-Amarna: the royal family beneath the rayed Aten disc above
  columns of weathered hieroglyphic text.
- **Date.** 18th Dynasty, c. 1345 BCE — Akhenaten's fifth regnal year
  and after.
- **Location.** Tell el-Amarna, Middle Egypt.
- **Source.** Wikimedia Commons,
  [`File:Amarna boundary stela U 02.JPG`](https://commons.wikimedia.org/wiki/File:Amarna_boundary_stela_U_02.JPG).
- **Photographer.** Einsamer Schütze.
- **Licence.** **CC BY-SA 3.0.** Attribution required and carried on the
  in-page caption.
- **Source dimensions.** 3456 × 2304.
- **Local processing.** Resized to 1600 px on the longest edge with
  `sharp`, encoded as WebP at quality 80, effort 6. Resulting file is
  ~178 KB at 1600 × 1067.
- **Editorial note.** Fourteen or more of these stelae define the limits
  of the city on both banks and carry the foundation decree and the
  king's oath not to extend them. The surface is heavily weathered and
  the photograph does not make the text readable; the caption says what
  the monument is and does not paraphrase what it says.

## Archaeological sites batch (2026-08-19)

- `amarna-boundary-stela.webp` — see catalog entry above. First file in
  this directory; the directory itself and this README were created with
  the Phase 31 archaeological-sites layer.
