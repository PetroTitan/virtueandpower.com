#!/usr/bin/env node
/**
 * Named-monument archive image vendoring.
 *
 * Same pipeline as the sites, cities and warfare tools: verify licence,
 * author and dimensions through the Wikimedia Commons API, download,
 * re-encode to WebP (q80, e6, 1600 px longest edge), print one JSON line
 * per target for src/data/archive-images.ts.
 *
 * This batch exists because of a validator rule rather than a wish list.
 * `monuments:images` refuses to let one image be the hero of two
 * entities, and it found ten collisions: the Parthenon photograph was
 * the hero of the Athens city page, the Acropolis site page and the
 * Parthenon monument at once. The rule's principle is that the most
 * specific entity keeps the specific image, so the monuments take the
 * photographs of themselves and the cities and sites get general views —
 * which is why five of these targets are for pages that already had a
 * hero.
 *
 * Identification hazard specific to this batch: there is a Baths of
 * Caracalla in Ankara as well as in Rome, and Commons has good
 * photographs of both. The file taken here is the Roman one, and the
 * registry entry says so.
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
  // ── monument heroes ───────────────────────────────────────────────
  { slug: "curia-julia", file: "Curia Julia, Roman Forum (31458139307).jpg", out: "public/images/architecture/curia-julia.webp" },
  { slug: "basilica-julia", file: "L06 667 Forum Romanum, Basilica Iulia.jpg", out: "public/images/ruins/basilica-julia.webp" },
  { slug: "temple-of-saturn", file: "Roman Forum Temple of Saturn.jpg", out: "public/images/ruins/temple-of-saturn.webp" },
  { slug: "temple-of-castor-and-pollux", file: "Roman Forum Temple of Castor and Pollux.jpg", out: "public/images/ruins/temple-of-castor-and-pollux.webp" },
  { slug: "arch-of-titus", file: "Arc Titus Forum romanum Rome Italy.jpg", out: "public/images/architecture/arch-of-titus.webp" },
  { slug: "forum-of-trajan", file: "Roma - Foro di Traiano 5823.JPG", out: "public/images/ruins/forum-of-trajan.webp" },
  { slug: "forum-of-augustus", file: "Forum of Augustus, Temple of Mars Ultor 2013.jpg", out: "public/images/ruins/forum-of-augustus.webp" },
  { slug: "ara-pacis", file: "Ara Pacis, general.jpg", out: "public/images/architecture/ara-pacis.webp" },
  { slug: "baths-of-caracalla", file: "Part of the Baths of Caracalla November 2013.jpg", out: "public/images/ruins/baths-of-caracalla.webp" },
  { slug: "treasury-of-atreus", file: "Micenas, Tesoro de Atreo.jpg", out: "public/images/architecture/treasury-of-atreus.webp" },
  { slug: "tachara-persepolis", file: "Persepolis - Tachara 01.jpg", out: "public/images/architecture/tachara-persepolis.webp" },
  { slug: "tomb-of-darius-naqsh-e-rustam", file: "Tomb of Darius the Great and relief of Shapur I at Naqsh-e Rostam, Iran (16279256871).jpg", out: "public/images/architecture/tomb-of-darius-naqsh-e-rustam.webp" },
  { slug: "great-pyramid-khufu", file: "The Great Pyramid of Giza (Pyramid of Cheops or Khufu) (14793442184).jpg", out: "public/images/architecture/great-pyramid-khufu.webp" },
  // ── general views, freeing specific images for their monuments ─────
  { slug: "acropolis-from-philopappos", file: "View of the Acropolis from Philopappos Hill, Athens, 20240601 1137 0117.jpg", out: "public/images/ruins/acropolis-from-philopappos.webp" },
  { slug: "stoa-of-attalos", file: "Stoa of Attalos, Athenian Agora (5041933471).jpg", out: "public/images/architecture/stoa-of-attalos.webp" },
  { slug: "pasargadae-palace-ruins", file: "Pasargadae ruins.jpg", out: "public/images/ruins/pasargadae-palace-ruins.webp" },
  { slug: "olympia-sanctuary", file: "Archaeological Site of Ancient Olympia - 3.jpg", out: "public/images/ruins/olympia-sanctuary.webp" },
  { slug: "memphis-ramesses-colossus", file: "Égypte, Memphis (Mit Rahina), Musée en plein air, Statue de Ramsès II, c.1279-1213 (XIXe dynastie) (49639403488).jpg", out: "public/images/artifacts/memphis-ramesses-colossus.webp" },
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
        sourceW: m.width,
        sourceH: m.height,
        source: m.descUrl,
        license: m.licenseId,
        licenseName: m.license,
        photographer: m.artist,
      }),
    );
  } catch (err) {
    failed += 1;
    console.error(`SKIP ${t.slug}: ${err.message}`);
  }
}

console.error(`\nvendored ${ok}, skipped ${failed}`);
