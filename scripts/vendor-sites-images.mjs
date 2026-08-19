#!/usr/bin/env node
/**
 * Archaeological-sites archive image vendoring.
 *
 * Same pipeline as the cities, warfare, Roman and Persian tools: verify
 * licence, author and dimensions through the Wikimedia Commons API,
 * download, re-encode to WebP (q80, e6, 1600 px longest edge), and print
 * one JSON line per target for the registry entry in
 * src/data/archive-images.ts.
 *
 * Editorial rules specific to this batch:
 *
 *   - Every image must show the site the page is about, not a generic
 *     ruin. The Phase 26 mistake of illustrating battle pages with
 *     unrelated archaeological photographs is the thing this batch is
 *     most exposed to, because one heap of column drums looks much like
 *     another.
 *
 *   - Where the photograph shows a reconstruction rather than an ancient
 *     surface — Knossos's north entrance, the Mashki Gate at Nineveh,
 *     the re-erected façades at Vergina — the caption must say so. A
 *     reader cannot tell concrete from gypsum in a photograph.
 *
 *   - Where a Commons file name asserts an identification the platform
 *     treats as disputed, the caption does not repeat it. The Vergina
 *     file is titled "Facade of Philip II tomb"; the page calls it Tomb
 *     II, because whose tomb it is has been argued for forty years.
 *
 *   - Excavation photographs are preferred where they exist. A page
 *     about how evidence was recovered is better illustrated by the
 *     recovery than by the result.
 */
import sharp from "sharp";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const UA = "VirtueAndPowerBot/1.0 (editorial archive; titan95431@gmail.com)";
const API = "https://commons.wikimedia.org/w/api.php";
const OK = new Set([
  "cc0", "pd", "cc-by-2.0", "cc-by-2.5", "cc-by-3.0", "cc-by-4.0",
  "cc-by-sa-2.0", "cc-by-sa-2.5", "cc-by-sa-3.0", "cc-by-sa-4.0",
]);

const targets = [
  { slug: "knossos-north-entrance", file: "Knossos north entrance, Crete 001.JPG", out: "public/images/ruins/knossos-north-entrance.webp" },
  { slug: "akrotiri-excavation", file: "The Excavation at Akrotiri on Thera (27846244934).jpg", out: "public/images/ruins/akrotiri-excavation.webp" },
  { slug: "delos-terrace-of-the-lions", file: "Terrace of the Lions Delos, 224775.jpg", out: "public/images/ruins/delos-terrace-of-the-lions.webp" },
  { slug: "eleusis-telesterion", file: "Archaeological Site of Eleusis - Telesterion 03.jpg", out: "public/images/ruins/eleusis-telesterion.webp" },
  { slug: "epidaurus-theatre", file: "Theatre of Epidaurus, 202508.jpg", out: "public/images/ruins/epidaurus-theatre.webp" },
  { slug: "vergina-tomb-facade", file: "Facade of Philip II tomb Vergina Greece.jpg", out: "public/images/architecture/vergina-tomb-facade.webp" },
  { slug: "palatine-domus-augustana", file: "Ruins of the Domus Augustana on Palatine Hill and museum.jpg", out: "public/images/ruins/palatine-domus-augustana.webp" },
  { slug: "hadrians-villa-canopus", file: "The Canopus, Hadrian's Villa, Tivoli (14759138548).jpg", out: "public/images/architecture/hadrians-villa-canopus.webp" },
  { slug: "amarna-boundary-stela", file: "Amarna boundary stela U 02.JPG", out: "public/images/inscription/amarna-boundary-stela.webp" },
  { slug: "deir-el-medina-excavation", file: "Schiaparelli's excavations - Theban region, Deir el-Medina, Excavations at the village, temple and chapels, 1905-1909, photo 25 of 38 - Archivio fotografico Museo Egizio, Turin C00081.jpg", out: "public/images/ruins/deir-el-medina-excavation.webp" },
  { slug: "ur-ziggurat", file: "Ziggurat of Ur Site in Nasiriyah 03.jpg", out: "public/images/architecture/ur-ziggurat.webp" },
  { slug: "nineveh-mashki-gate", file: "Nineveh - Mashki Gate.jpg", out: "public/images/architecture/nineveh-mashki-gate.webp" },
  { slug: "herculaneum-excavations-19c", file: "Ercolano veduta generale degli scavi.jpg", out: "public/images/ruins/herculaneum-excavations-19c.webp" },
  { slug: "herculaneum-maiuri-excavation", file: "The excavation of Herulaneum, ca. 1929 (published by A. Maiuri; Ercolano. Rome-Novara-Paris. Istituto Geografico de Agostini, 1932, p. 16).jpg", out: "public/images/ruins/herculaneum-maiuri-excavation.webp" },
];

const stripHtml = (s) =>
  String(s ?? "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

async function info(file) {
  const u = new URL(API);
  u.search = new URLSearchParams({
    action: "query",
    format: "json",
    prop: "imageinfo",
    iiprop: "extmetadata|url|size",
    titles: "File:" + file,
  }).toString();
  const r = await fetch(u, { headers: { "User-Agent": UA } });
  const d = await r.json();
  const p = Object.values(d.query.pages)[0];
  if (p.missing !== undefined) throw new Error("MISSING on Commons");
  const ii = p.imageinfo[0];
  const em = ii.extmetadata || {};
  const v = (k) => em[k]?.value ?? "";
  return {
    url: ii.url,
    width: ii.width,
    height: ii.height,
    license: v("LicenseShortName"),
    licenseId: String(v("License")).toLowerCase(),
    artist: stripHtml(v("Artist")),
    credit: stripHtml(v("Credit")),
    descUrl: ii.descriptionurl,
  };
}

let ok = 0;
let failed = 0;

for (const t of targets) {
  try {
    const m = await info(t.file);
    if (!OK.has(m.licenseId)) {
      throw new Error("LICENCE NOT ALLOWED: " + (m.licenseId || "unknown"));
    }
    const resp = await fetch(m.url, { headers: { "User-Agent": UA } });
    if (!resp.ok) throw new Error("download HTTP " + resp.status);
    const buf = Buffer.from(await resp.arrayBuffer());
    const outBuf = await sharp(buf)
      .resize(1600, 1600, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toBuffer();
    const meta = await sharp(outBuf).metadata();
    await mkdir(path.dirname(t.out), { recursive: true });
    await writeFile(t.out, outBuf);
    ok += 1;
    console.log(
      JSON.stringify({
        slug: t.slug,
        imagePath: "/" + t.out.replace(/^public\//, ""),
        width: meta.width,
        height: meta.height,
        source: m.descUrl,
        license: m.licenseId,
        licenseName: m.license,
        photographer: m.artist,
        credit: m.credit,
      }),
    );
  } catch (err) {
    failed += 1;
    console.error(`SKIP ${t.slug}: ${err.message}`);
  }
}

console.error(`\nvendored ${ok}, skipped ${failed}`);
