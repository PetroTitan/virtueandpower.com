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

### Maps & Timelines layer (Phase 21)

Nine reference maps, vendored for the `/maps` section. Most are from
**William R. Shepherd's Historical Atlas (1911)**, public domain by age;
the Roman Empire, Egypt and Sparta maps are clean modern cartography
(CC0 / CC BY-SA). All are modern maps, not ancient artefacts, and are
captioned as such.

- **`map-ancient-greece.webp`** — Ancient Greece. Shepherd. **PD.**
  [`File:Ancient greece so 1926.jpg`](https://commons.wikimedia.org/wiki/File:Ancient_greece_so_1926.jpg). 1600×1208.
- **`map-athens-attica.webp`** — Attica and Athens. Shepherd. **PD.**
  [`File:Attica shepherd p16.jpg`](https://commons.wikimedia.org/wiki/File:Attica_shepherd_p16.jpg). 987×1600.
- **`map-sparta.webp`** — Spartan territory before 371 BCE. T8612.
  **CC BY-SA 4.0.** [`File:Spartan Territory Before 371 BC.png`](https://commons.wikimedia.org/wiki/File:Spartan_Territory_Before_371_BC.png). 1361×1433.
- **`map-persian-empire.webp`** — The Achaemenid Empire. Shepherd. **PD.**
  [`File:Persian empire.jpg`](https://commons.wikimedia.org/wiki/File:Persian_empire.jpg). 1314×635.
- **`map-alexander-empire.webp`** — Empire of Alexander. Shepherd. **PD.**
  [`File:Macedonian empire 336 323.jpg`](https://commons.wikimedia.org/wiki/File:Macedonian_empire_336_323.jpg). 1600×842.
- **`map-roman-republic.webp`** — Ancient Italy. Shepherd. **PD.**
  [`File:Map of Ancient Italy, Southern Part.jpg`](https://commons.wikimedia.org/wiki/File:Map_of_Ancient_Italy,_Southern_Part.jpg). 1600×1328.
- **`map-roman-empire.webp`** — Roman Empire under Trajan (117 CE).
  Joyfulmapper. **CC0.** [`File:Map of the Roman Empire during Trajan.png`](https://commons.wikimedia.org/wiki/File:Map_of_the_Roman_Empire_during_Trajan.png). 1600×1231.
- **`map-egypt.webp`** — New Kingdom Egypt under Thutmose III. **CC0.**
  [`File:Map of the new kingdom of egypt in 1453 bc under pharaoh thutmose iii.png`](https://commons.wikimedia.org/wiki/File:Map_of_the_new_kingdom_of_egypt_in_1453_bc_under_pharaoh_thutmose_iii.png). 1392×1600.
- **`map-mediterranean.webp`** — Greek & Phoenician colonies, c. 550 BCE.
  Shepherd. **PD.** [`File:Greek phoenician 550.jpg`](https://commons.wikimedia.org/wiki/File:Greek_phoenician_550.jpg). 1600×962.

## Adding new maps

Same pipeline as the architecture directory. Verify rights status, resize
to 1600 px longest edge, encode WebP q80 e6, register in
`src/data/archive-images.ts`, and add an entry here. No AI imagery.
