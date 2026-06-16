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

### `erechtheum-acropolis.webp`

- **Subject.** The Erechtheum on the Athenian Acropolis,
  Classical Greek, 421–406 BCE, Pentelic marble Ionic temple.
- **Source.** Wikimedia Commons,
  [`File:Erechtheum Acropolis Athens.jpg`](https://commons.wikimedia.org/wiki/File:Erechtheum_Acropolis_Athens.jpg).
- **Photographer.** Jebulon.
- **Licence.** **CC-Zero.**
- **Source dimensions.** 4592 × 3056.
- **Local processing.** Same pipeline; ~236 KB at 1600 × 1065.

### `hephaestus-agora.webp`

- **Subject.** The Temple of Hephaestus seen from the Ancient
  Agora of Athens, Classical Greek, begun c. 449 BCE — the
  best-preserved temple of the Periclean building programme.
- **Source.** Wikimedia Commons,
  [`File:Temple of Hephaestus from ancient agora Athens.jpg`](https://commons.wikimedia.org/wiki/File:Temple_of_Hephaestus_from_ancient_agora_Athens.jpg).
- **Photographer.** Jebulon.
- **Licence.** **CC-Zero.**
- **Source dimensions.** 4536 × 3019.
- **Local processing.** Same pipeline; ~449 KB at 1600 × 1065.

### `dionysus-theatre.webp`

- **Subject.** The Theatre of Dionysus on the southern slope
  of the Athenian Acropolis — the working theatre of the
  Athenian dramatic festivals of the 5th and 4th centuries
  BCE. Surviving form 4th century BCE.
- **Source.** Wikimedia Commons,
  [`File:Theatre of Dionysus Acropolis Athens Greece.jpg`](https://commons.wikimedia.org/wiki/File:Theatre_of_Dionysus_Acropolis_Athens_Greece.jpg).
- **Photographer.** Jebulon.
- **Licence.** **CC-Zero.**
- **Source dimensions.** 4592 × 3056.
- **Local processing.** Same pipeline; ~451 KB at 1600 × 1065.

### `corinthian-helmet.webp`

- **Subject.** Bronze Corinthian-type helmet with full face and
  nasal, Archaic Greek, c. 600 BCE.
- **Location.** National Archaeological Museum, Athens
  (Inv. 15153).
- **Source.** Wikimedia Commons,
  [`File:Corinthian helmet 15153 NAMAthens.jpg`](https://commons.wikimedia.org/wiki/File:Corinthian_helmet_15153_NAMAthens.jpg).
- **Photographer.** Jebulon.
- **Licence.** **CC-Zero.**
- **Source dimensions.** 2741 × 2815.
- **Local processing.** Same pipeline; ~171 KB at 1558 × 1600.

### `alexander-mosaic.webp`

- **Subject.** The Alexander Mosaic — Alexander on Bucephalus
  at the Battle of Issus. Roman-era floor mosaic c. 100 BCE,
  almost certainly copying a Greek panel painting of the late
  4th century BCE.
- **Location.** Museo Archeologico Nazionale, Naples (from the
  House of the Faun, Pompeii).
- **Source.** Wikimedia Commons,
  [`File:Alexander and Bucephalus - Battle of Issus mosaic - Museo Archeologico Nazionale - Naples BW.jpg`](https://commons.wikimedia.org/wiki/File:Alexander_and_Bucephalus_-_Battle_of_Issus_mosaic_-_Museo_Archeologico_Nazionale_-_Naples_BW.jpg).
- **Photographer.** Berthold Werner.
- **Licence.** **Public domain.**
- **Source dimensions.** 3905 × 2766.
- **Local processing.** Same pipeline; ~312 KB at 1600 × 1133.

### `arch-titus-relief.webp`

- **Subject.** Reliefs in the bay of the Arch of Titus on the
  Via Sacra in the Forum Romanum, c. 81 CE.
- **Source.** Wikimedia Commons,
  [`File:Arc Titus Forum romanum Rome Italy.jpg`](https://commons.wikimedia.org/wiki/File:Arc_Titus_Forum_romanum_Rome_Italy.jpg).
- **Photographer.** Jebulon.
- **Licence.** **CC-Zero.**
- **Source dimensions.** 3840 × 2952.
- **Local processing.** Same pipeline; ~356 KB at 1600 × 1230.

### `lion-darius-susa.webp`

- **Subject.** Glazed-brick lion relief from the palace of
  Darius I at Susa, Achaemenid c. 510 BCE.
- **Location.** Louvre, Paris (Sb 3298).
- **Source.** Wikimedia Commons,
  [`File:Lion Darius Palace Louvre Sb3298.jpg`](https://commons.wikimedia.org/wiki/File:Lion_Darius_Palace_Louvre_Sb3298.jpg).
- **Photographer.** Marie-Lan Nguyen (Wikimedia user
  *Jastrow*).
- **Licence.** **Public domain.**
- **Source dimensions.** 1262 × 980.
- **Local processing.** Same pipeline; ~89 KB at 1262 × 980
  (no upscale; source was below 1600 px).

### `caesar-elephant-denarius.webp`

- **Subject.** Silver denarius of Julius Caesar, 49–48 BCE —
  elephant-trampling-serpent obverse with the legend CAESAR;
  priestly emblems reverse.
- **Location.** Portable Antiquities Scheme record (FindID
  603459); the coin type is widely held in major numismatic
  collections.
- **Source.** Wikimedia Commons,
  [`File:Roman silver denarius elephant (FindID 603459).jpg`](https://commons.wikimedia.org/wiki/File:Roman_silver_denarius_elephant_(FindID_603459).jpg).
- **Photographer.** Wikimedia user *Fæ* (PAS upload).
- **Licence.** **CC BY-SA 4.0.** Attribution required;
  carried in the rendered caption and in the typed registry.
- **Source dimensions.** 2748 × 1524.
- **Local processing.** Same pipeline; ~49 KB at 1600 × 887.

### `athenian-owl-tetradrachm.webp`

- **Subject.** Athenian silver tetradrachm of the classical
  period, 454–404 BCE — Athena obverse, owl reverse with
  olive sprig and inscription ΑΘΕ.
- **Location.** Staatliche Münzsammlung, Munich.
- **Source.** Wikimedia Commons,
  [`File:Athens - 454-404 BC - silver tetradrachm - head of Athena - owl - München SMS.jpg`](https://commons.wikimedia.org/wiki/File:Athens_-_454-404_BC_-_silver_tetradrachm_-_head_of_Athena_-_owl_-_M%C3%BCnchen_SMS.jpg).
- **Photographer.** ArchaiOptix (Wikimedia).
- **Licence.** **CC BY-SA 4.0.** Attribution required;
  carried in the rendered caption and in the typed registry.
- **Source dimensions.** 3648 × 3648.
- **Local processing.** Same pipeline; ~380 KB at 1600 × 1600.

### `arch-of-constantine.webp`

- **Subject.** The Arch of Constantine, lateral view, Rome —
  triple triumphal arch dedicated in 315 CE, much of its
  sculptural decoration reused (spolia) from monuments of Trajan,
  Hadrian and Marcus Aurelius.
- **Source.** Wikimedia Commons,
  [`File:Arch of Constantine (Rome) ,lateral view.jpg`](https://commons.wikimedia.org/wiki/File:Arch_of_Constantine_(Rome)_,lateral_view.jpg).
- **Photographer.** Livioandronico2013.
- **Licence.** **CC BY-SA 4.0.** Attribution required; carried in the
  registry and on the in-page caption.
- **Source dimensions.** 4000 × 6016.
- **Local processing.** Same pipeline; ~273 KB at 1064 × 1600.
  Vendored Phase 15 as the Late Empire hub hero and Constantine anchor.

### `pont-du-gard.webp`

- **Subject.** The Pont du Gard, a three-tiered Roman aqueduct bridge
  over the river Gardon, 1st century CE, part of the aqueduct to
  Nîmes (Nemausus).
- **Source.** Wikimedia Commons,
  [`File:Pont du Gard BLS.jpg`](https://commons.wikimedia.org/wiki/File:Pont_du_Gard_BLS.jpg).
- **Photographer.** Benh Lieu Song.
- **Licence.** **CC BY-SA 3.0.** Attribution required.
- **Source dimensions.** 12648 × 4882 (panoramic).
- **Local processing.** Same pipeline; ~258 KB at 1600 × 617.
  Vendored Phase 15 for the High Empire hub and the army-and-state
  reading.

### `maison-carree.webp`

- **Subject.** The Maison Carrée at Nîmes, an exceptionally
  well-preserved Augustan-period temple, originally dedicated to
  Gaius and Lucius Caesar, the heirs of Augustus.
- **Source.** Wikimedia Commons,
  [`File:Maison Carree in Nimes (1).jpg`](https://commons.wikimedia.org/wiki/File:Maison_Carree_in_Nimes_(1).jpg).
- **Photographer.** Krzysztof Golik.
- **Licence.** **CC BY-SA 4.0.** Attribution required.
- **Source dimensions.** 4784 × 3442.
- **Local processing.** Same pipeline; ~197 KB at 1600 × 1151.
  Vendored Phase 15 as a Principate anchor.

### `tetrarchs-venice.webp`

- **Subject.** The porphyry Portrait of the Four Tetrarchs, c. 300
  CE, set into the corner of St Mark's Basilica, Venice — the two
  Augusti and two Caesares of Diocletian's tetrarchy as identical,
  abstract figures of office. Taken from Constantinople in 1204.
- **Source.** Wikimedia Commons,
  [`File:Portrait of the Four Tetrarchs (Monumento ai Tetrarchi), San Marco, Venice (36992141183).jpg`](https://commons.wikimedia.org/wiki/File:Portrait_of_the_Four_Tetrarchs_(Monumento_ai_Tetrarchi),_San_Marco,_Venice_(36992141183).jpg).
- **Photographer.** Dimitris Kamaras.
- **Licence.** **CC BY 2.0.** Attribution required.
- **Source dimensions.** 3024 × 4032.
- **Local processing.** Same pipeline; ~404 KB at 1600 × 1200.
  Vendored Phase 15 for the Late Empire hub and the Diocletian entry.

### `gate-of-all-nations.webp`

- **Subject.** The Gate of All Nations at Persepolis, built under
  Xerxes I (early 5th century BCE), with its colossal lamassu.
- **Source.** Wikimedia Commons,
  [`File:Persepolis – Gate of All Nations 02.jpg`](https://commons.wikimedia.org/wiki/File:Persepolis_%E2%80%93_Gate_of_All_Nations_02.jpg).
- **Photographer.** Skot.
- **Licence.** **CC BY-SA 4.0.** Attribution required.
- **Source dimensions.** larger original; resized.
- **Local processing.** Same pipeline; ~177 KB at 1600 × 1067.
  Vendored Phase 16 as the Persian Imperial System hub hero.

### `tomb-of-cyrus.webp`

- **Subject.** The free-standing stepped tomb of Cyrus the Great at
  Pasargadae, c. 530 BCE.
- **Source.** Wikimedia Commons,
  [`File:Tomb of Cyrus the Great.jpg`](https://commons.wikimedia.org/wiki/File:Tomb_of_Cyrus_the_Great.jpg).
- **Photographer.** Mohammad Reza Domiri Ganji.
- **Licence.** **CC BY-SA 4.0.** Attribution required.
- **Local processing.** Same pipeline; ~142 KB at 783 × 1175.
  Vendored Phase 16 for the Cyrus the Great figure entry.

### `persepolis-columns.webp`

- **Subject.** Surviving columns of the Apadana audience hall at
  Persepolis, begun by Darius I and completed by Xerxes I.
- **Source.** Wikimedia Commons,
  [`File:Ruins of the Apadana Palace (4691185332).jpg`](https://commons.wikimedia.org/wiki/File:Ruins_of_the_Apadana_Palace_(4691185332).jpg).
- **Photographer.** A. Davey.
- **Licence.** **CC BY 2.0.** Attribution required.
- **Local processing.** Same pipeline; ~64 KB at 1121 × 1600.
  Vendored Phase 16 for the Achaemenid Empire hub.

### `behistun-relief.webp`

- **Subject.** The relief of the Behistun Inscription — Darius I
  treading on the usurper Gaumata before a line of bound rebel kings.
- **Source.** Wikimedia Commons,
  [`File:Behistun relief Darius and Gaumata.jpg`](https://commons.wikimedia.org/wiki/File:Behistun_relief_Darius_and_Gaumata.jpg).
- **Photographer.** Patrick C.
- **Licence.** **CC BY-SA 2.0.** Attribution required.
- **Local processing.** Same pipeline; ~305 KB at 1238 × 1600.
  Vendored Phase 16 for the Darius figure entry and the Behistun text.

### `daric-coin.webp`

- **Subject.** Achaemenid gold daric, the royal-archer type, the
  empire's standard high-value gold coin introduced under Darius I.
- **Location.** The Metropolitan Museum of Art (52.127.1).
- **Source.** Wikimedia Commons,
  [`File:Daric with king MET me 52 127 1.jpg`](https://commons.wikimedia.org/wiki/File:Daric_with_king_MET_me_52_127_1.jpg).
- **Licence.** **CC0** (Metropolitan Museum Open Access).
- **Local processing.** Same pipeline; ~22 KB at 800 × 742.
  Vendored Phase 16 for the Persian Imperial System hub.

### `persepolis-bull-capital.webp`

- **Subject.** A double-bull (addorsed bull-protome) column capital
  from the Apadana at Persepolis, the signature Achaemenid
  architectural element.
- **Location.** National Museum of Iran, Tehran.
- **Source.** Wikimedia Commons,
  [`File:Double Bull Column Capital from the Apadana in Persepolis – National Museum of Iran.jpg`](https://commons.wikimedia.org/wiki/File:Double_Bull_Column_Capital_from_the_Apadana_in_Persepolis_%E2%80%93_National_Museum_of_Iran.jpg).
- **Photographer.** Skot.
- **Licence.** **CC BY-SA 4.0.** Attribution required.
- **Local processing.** Same pipeline; ~255 KB at 1067 × 1600.
  Vendored Phase 16 for the Persian Imperial System hub.

### `ishtar-gate.webp`

- **Subject.** The reconstructed Ishtar Gate of Babylon, built under
  Nebuchadnezzar II (c. 575 BCE), faced in lapis-blue glazed brick.
- **Location.** Pergamon Museum, Berlin.
- **Source.** Wikimedia Commons,
  [`File:Pergamonmuseum Ishtartor 03.jpg`](https://commons.wikimedia.org/wiki/File:Pergamonmuseum_Ishtartor_03.jpg).
- **Photographer.** Hahaha.
- **Licence.** **CC BY-SA 2.5.** Attribution required.
- **Source dimensions.** 2592 × 1944.
- **Local processing.** Resized to 1600 px on the longest edge,
  WebP quality 80 effort 6; ~245 KB at 1600 × 1200. Vendored Phase 17
  for the Babylon hub.

### `great-wall-jinshanling.webp`

- **Subject.** The Great Wall of China at Jinshanling. The visible
  masonry is Ming (14th–16th c. CE); it stands on the line of far
  older northern walls, the first integration of which is attributed
  to Qin Shi Huang. The caption and hub text are explicit about this.
- **Location.** Jinshanling, Hebei, China.
- **Source.** Wikimedia Commons,
  [`File:The Great Wall of China at Jinshanling-edit.jpg`](https://commons.wikimedia.org/wiki/File:The_Great_Wall_of_China_at_Jinshanling-edit.jpg).
- **Photographer.** Severin.stalder.
- **Licence.** **CC BY-SA 3.0.** Attribution required.
- **Source dimensions.** 4288 × 2848.
- **Local processing.** Same pipeline; ~266 KB at 1600 × 1063.
  Vendored Phase 17 for the early-imperial-China hub.

### `delphi-tholos.webp`

- **Subject.** The Tholos in the sanctuary of Athena Pronaia at Delphi
  (c. 380 BCE), three Doric columns and entablature restored. Delphi is
  where Plutarch served for years as a priest of Apollo.
- **Location.** Delphi, Greece.
- **Source.** Wikimedia Commons,
  [`File:Tholos of Delphi 02.jpg`](https://commons.wikimedia.org/wiki/File:Tholos_of_Delphi_02.jpg).
- **Photographer.** Bernard Gagnon.
- **Licence.** **CC BY-SA 4.0.** Attribution required.
- **Source dimensions.** 3133 × 2238.
- **Local processing.** WebP q80 e6; ~312 KB at 1600 × 1143. Vendored
  for the Plutarch hub.

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
