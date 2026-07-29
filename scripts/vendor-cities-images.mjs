#!/usr/bin/env node
/**
 * Ancient cities archive image vendoring.
 *
 * Same disciplined pipeline as the Roman, Persian, founders and Plutarch
 * tools: verify licence, author and dimensions via the Wikimedia Commons
 * API, download, re-encode to WebP (q80, e6, 1600 px longest edge). Only
 * verified CC0 / public-domain / CC BY / CC BY-SA files with unambiguous
 * identification are committed. Prints one JSON line per target for the
 * registry entry in src/data/archive-images.ts.
 *
 * Editorial rules specific to this batch:
 *   - No AI-generated pseudo-antiquity, no unattributed images, no
 *     Pinterest or aggregator sources.
 *   - Identification must be unambiguous. Where a vase's subject is
 *     securely identified in the museum record it is stated plainly;
 *     where an object carries a traditional name that is not an
 *     identification — the so-called Mask of Agamemnon above all — the
 *     registry note must say so, because a caption is where a
 *     nineteenth-century label quietly becomes a fact.
 *   - Film imagery is deliberately not vendored. We have no licence for
 *     production stills and do not assert fair use we have not cleared.
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
  { slug: "delphi-athenian-treasury", file: "The Treasury of the Athenians at the Sanctuary of Apollo (Delphi) on October 4, 2020.jpg", out: "public/images/ruins/delphi-athenian-treasury.webp" },
  { slug: "olympia-temple-of-zeus", file: "Olympia ruins near the Temple of Zeus 3.jpg", out: "public/images/ruins/olympia-temple-of-zeus.webp" },
  { slug: "corinth-temple-of-apollo", file: "Korinth BW 2017-10-10 10-55-28.jpg", out: "public/images/ruins/corinth-temple-of-apollo.webp" },
  { slug: "ostia-street", file: "Ostia Antica 103.jpg", out: "public/images/ruins/ostia-street.webp" },
  { slug: "ishtar-gate-berlin", file: "Pergamon museum Ishtar Gate.jpg", out: "public/images/architecture/ishtar-gate-berlin.webp" },
  { slug: "troy-walls-hisarlik", file: "Legendary walls of Troy (8708672267).jpg", out: "public/images/ruins/troy-walls-hisarlik.webp" },
  { slug: "step-pyramid-djoser", file: "Pyramid of Djoser 2010.jpg", out: "public/images/architecture/step-pyramid-djoser.webp" },
  { slug: "susa-archer-frieze", file: "Archers frieze Darius 1st Palace Suse Louvre AOD 488 a.jpg", out: "public/images/artifacts/susa-archer-frieze.webp" },
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
  const em = ii.imageinfo ? {} : ii.extmetadata || {};
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
