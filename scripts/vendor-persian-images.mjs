#!/usr/bin/env node
/**
 * Phase 16 Persian image vendoring tool. Same pipeline as
 * scripts/vendor-roman-images.mjs: verify licence/author/dimensions via the
 * Wikimedia API, download the original, re-encode to WebP (quality 80,
 * effort 6, 1600 px longest edge). Only files with a verified CC0 /
 * public-domain / CC BY / CC BY-SA licence and an unambiguous identification
 * are committed to the registry.
 */
import sharp from "sharp";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const UA = "VirtueAndPowerBot/1.0 (editorial archive; titan95431@gmail.com)";
const API = "https://commons.wikimedia.org/w/api.php";

const targets = [
  { slug: "gate-of-all-nations", file: "Persepolis – Gate of All Nations 02.jpg", out: "public/images/architecture/gate-of-all-nations.webp" },
  { slug: "tomb-of-cyrus", file: "Tomb of Cyrus the Great.jpg", out: "public/images/architecture/tomb-of-cyrus.webp" },
  { slug: "persepolis-columns", file: "Ruins of the Apadana Palace (4691185332).jpg", out: "public/images/architecture/persepolis-columns.webp" },
  { slug: "naqsh-e-rustam", file: "Hillside Tombs, Naqsh-E Rostam (14288601687).jpg", out: "public/images/ruins/naqsh-e-rustam.webp" },
  { slug: "behistun-relief", file: "Behistun relief Darius and Gaumata.jpg", out: "public/images/architecture/behistun-relief.webp" },
  { slug: "daric-coin", file: "Daric with king MET me 52 127 1.jpg", out: "public/images/architecture/daric-coin.webp" },
  { slug: "persepolis-bull-capital", file: "Double Bull Column Capital from the Apadana in Persepolis – National Museum of Iran.jpg", out: "public/images/architecture/persepolis-bull-capital.webp" },
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
    license: v("LicenseShortName"), licenseId: v("License"),
    artist: stripHtml(v("Artist")), objectName: stripHtml(v("ObjectName")),
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
      slug: t.slug, ok: true, license: m.license, artist: m.artist,
      srcW: m.width, srcH: m.height, outW: fm.width, outH: fm.height,
      kb: Math.round(outBuf.length / 1024), source: m.descUrl,
    }));
  } catch (e) {
    console.log(JSON.stringify({ slug: t.slug, ok: false, error: String(e.message || e) }));
  }
}
