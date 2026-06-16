# Maps

Historical maps and modern scholarly reconstructions of ancient geography.
Vendored locally; provenance recorded here and in the typed registry at
[`src/data/archive-images.ts`](../../../src/data/archive-images.ts).
Dropping a file here is not enough — it must also be registered there.
Maps are, by their nature, later reconstructions rather than ancient
artefacts, and are captioned as such.

## Catalog

### `anabasis-route-map.webp`

- **Subject.** The route of the Retreat of the Ten Thousand (401–399 BCE),
  from Cunaxa near Babylon north through the Persian interior to the Black
  Sea — the march Xenophon recorded in the Anabasis.
- **Author.** Jean Baptiste Bourguignon d'Anville (1697–1782), engraved
  for Rollin's *Ancient History*.
- **Source.** Wikimedia Commons,
  [`File:Jean Baptiste Bourguignon d'Anville, Retreat of the ten thousand...`](https://commons.wikimedia.org/wiki/File:Jean_Baptiste_Bourguignon_d%27Anville,_Retreat_of_the_ten_thousand.Drawn_for_Rollin%27s_Antient_History_(FL37124102_3899300).jpg).
- **Licence.** **Public domain** (by age).
- **Source dimensions.** 3494 × 3143.
- **Local processing.** Resized to 1600 px longest edge, WebP q80 e6;
  ~313 KB at 1600 × 1439. Vendored for the Anabasis and the Xenophon hub.

## Adding new maps

Same pipeline as the architecture directory. Verify rights status, resize
to 1600 px longest edge, encode WebP q80 e6, register in
`src/data/archive-images.ts`, and add an entry here. No AI imagery.
