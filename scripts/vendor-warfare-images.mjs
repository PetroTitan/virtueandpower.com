#!/usr/bin/env node
/**
 * Warfare encyclopedia archive image vendoring.
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
  { slug: "chigi-vase-hoplites", file: "Hoplites Chigi Vase.PNG", out: "public/images/artifacts/chigi-vase-hoplites.webp" },
  { slug: "corinthian-helmet-olympia", file: "Corinthian Helmet Olympia.jpg", out: "public/images/artifacts/corinthian-helmet-olympia.webp" },
  { slug: "athlit-ram", file: "Israeli National Maritime Museum- Naval ram-1.jpg", out: "public/images/artifacts/athlit-ram.webp" },
  { slug: "dura-europos-scutum", file: "Scutum (Shield) - YDEA - 5959.jpg", out: "public/images/artifacts/dura-europos-scutum.webp" },
  { slug: "trajans-column-testudo", file: "Roman turtle formation on trajan column.jpg", out: "public/images/relief/trajans-column-testudo.webp" },
  { slug: "trajans-column-artillery", file: "Roman Balista on trajan column.jpg", out: "public/images/relief/trajans-column-artillery.webp" },
  { slug: "hadrians-wall-housesteads", file: "Hadrian's Wall west of Housesteads 3.jpg", out: "public/images/ruins/hadrians-wall-housesteads.webp" },
  { slug: "housesteads-fort", file: "Housesteads Roman Fort 2014 16.jpg", out: "public/images/ruins/housesteads-fort.webp" },
  { slug: "masada-siege-ramp", file: "Masada 051013 Ramp 01.jpg", out: "public/images/ruins/masada-siege-ramp.webp" },
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
