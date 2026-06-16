#!/usr/bin/env node
/**
 * Plutarch deepening image vendoring. Same disciplined pipeline as the
 * Roman / Persian / founders tools: verify licence, author and dimensions
 * via the Wikimedia Commons API, download, re-encode to WebP (q80, e6,
 * 1600 px longest edge). Only verified CC0 / public-domain / CC BY /
 * CC BY-SA files with unambiguous identification are committed. Prints one
 * JSON line per target for the registry entry.
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
  { slug: "demosthenes-chiaramonti", file: "Demosthenes Chiaramonti Inv1555.jpg", out: "public/images/busts/demosthenes-chiaramonti.webp" },
  { slug: "plutarch-chaeronea", file: "Plutarch of Chaeronea-03.jpg", out: "public/images/busts/plutarch-chaeronea.webp" },
  { slug: "lion-of-chaeronea", file: "The restored Lion of Chaeronea in Boeotia on 10 April 2019.jpg", out: "public/images/artifacts/lion-of-chaeronea.webp" },
  { slug: "delphi-tholos", file: "Tholos of Delphi 02.jpg", out: "public/images/architecture/delphi-tholos.webp" },
  { slug: "delphi-sanctuary", file: "Delphi BW 2017-10-08 11-44-50.jpg", out: "public/images/ruins/delphi-sanctuary.webp" },
  { slug: "plutarch-lives-manuscript", file: "Plutarch, Parallel Lives, Oxford, MS. Canonici Greek 93 (cropped).jpg", out: "public/images/manuscripts/plutarch-lives-manuscript.webp" },
];

const stripHtml = (s) => String(s ?? "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

async function info(file) {
  const u = new URL(API);
  u.search = new URLSearchParams({
    action: "query", format: "json", prop: "imageinfo",
    iiprop: "extmetadata|url|size", titles: "File:" + file,
  }).toString();
  const r = await fetch(u, { headers: { "User-Agent": UA } });
  const d = await r.json();
  const p = Object.values(d.query.pages)[0];
  if (p.missing !== undefined) throw new Error("MISSING on Commons");
  const ii = p.imageinfo[0];
  const em = ii.extmetadata || {};
  const v = (k) => em[k]?.value ?? "";
  return {
    url: ii.url, width: ii.width, height: ii.height,
    license: v("LicenseShortName"), licenseId: String(v("License")).toLowerCase(),
    artist: stripHtml(v("Artist")), descUrl: ii.descriptionurl,
  };
}

for (const t of targets) {
  try {
    const m = await info(t.file);
    if (!OK.has(m.licenseId)) throw new Error("LICENCE NOT ALLOWED: " + m.licenseId);
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
      artist: m.artist, srcW: m.width, srcH: m.height,
      outW: fm.width, outH: fm.height,
      kb: Math.round(outBuf.length / 1024), source: m.descUrl,
    }));
  } catch (e) {
    console.log(JSON.stringify({ slug: t.slug, ok: false, error: String(e.message || e) }));
  }
}
