#!/usr/bin/env node
/**
 * Phase 15 image vendoring tool.
 *
 * For each target Wikimedia Commons file: query the MediaWiki API for its
 * licence, author and dimensions (the reliable, machine-checkable source of
 * provenance), download the original, and re-encode to WebP at quality 80,
 * effort 6, resized to fit 1600 px on the longest edge — the same pipeline the
 * existing archive (src/data/archive-images.ts) and bust catalog were built
 * with. Emits a JSON manifest line per file so the registry entries can be
 * written with verified facts rather than guesses.
 *
 *   node scripts/vendor-roman-images.mjs
 *
 * Only files whose reported licence is CC0 / public-domain / CC BY / CC BY-SA
 * and whose identification is unambiguous should be committed to the registry.
 */
import sharp from "sharp";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const UA = "VirtueAndPowerBot/1.0 (editorial archive; titan95431@gmail.com)";
const API = "https://commons.wikimedia.org/w/api.php";

const targets = [
  { slug: "arch-of-constantine", file: "Arch of Constantine (Rome) ,lateral view.jpg", out: "public/images/architecture/arch-of-constantine.webp" },
  { slug: "pont-du-gard", file: "Pont du Gard BLS.jpg", out: "public/images/architecture/pont-du-gard.webp" },
  { slug: "maison-carree", file: "Maison Carree in Nimes (1).jpg", out: "public/images/architecture/maison-carree.webp" },
  { slug: "aurelian-walls", file: "Aurelian Walls Rome 2011 1.jpg", out: "public/images/ruins/aurelian-walls.webp" },
  { slug: "tetrarchs-venice", file: "Portrait of the Four Tetrarchs (Monumento ai Tetrarchi), San Marco, Venice (36992141183).jpg", out: "public/images/architecture/tetrarchs-venice.webp" },
  { slug: "hadrian-capitoline", file: "Bust Hadrian Musei Capitolini MC817.jpg", out: "public/images/busts/hadrian-capitoline.webp" },
  { slug: "constantine-colossus", file: "Rome-Capitole-StatueConstantin.jpg", out: "public/images/busts/constantine-colossus.webp" },
];

const stripHtml = (s) => String(s ?? "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

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
    licenseId: v("License"),
    artist: stripHtml(v("Artist")),
    objectName: stripHtml(v("ObjectName")),
    descUrl: ii.descriptionurl,
  };
}

for (const t of targets) {
  try {
    const m = await info(t.file);
    const resp = await fetch(m.url, { headers: { "User-Agent": UA } });
    if (!resp.ok) throw new Error("download HTTP " + resp.status);
    const buf = Buffer.from(await resp.arrayBuffer());
    const outBuf = await sharp(buf)
      .resize(1600, 1600, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toBuffer();
    const fm = await sharp(outBuf).metadata();
    await mkdir(path.dirname(t.out), { recursive: true });
    await writeFile(t.out, outBuf);
    console.log(JSON.stringify({
      slug: t.slug, ok: true, license: m.license, licenseId: m.licenseId,
      artist: m.artist, objectName: m.objectName, srcW: m.width, srcH: m.height,
      outW: fm.width, outH: fm.height, kb: Math.round(outBuf.length / 1024),
      source: m.descUrl,
    }));
  } catch (e) {
    console.log(JSON.stringify({ slug: t.slug, ok: false, error: String(e.message || e) }));
  }
}
