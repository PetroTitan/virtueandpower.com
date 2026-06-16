#!/usr/bin/env node
/**
 * Plato / Aristotle / maps vendoring. Verify licence/author/dimensions via
 * the Commons API, download, re-encode to WebP (q80, e6, 1600 px longest
 * edge). Only verified CC0 / public-domain / CC BY / CC BY-SA files with
 * unambiguous identification are committed. One JSON line per target.
 */
import sharp from "sharp";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const UA = "VirtueAndPowerBot/1.0 (editorial archive; titan95431@gmail.com)";
const API = "https://commons.wikimedia.org/w/api.php";
const OK = new Set(["cc0","pd","cc-by-2.0","cc-by-2.5","cc-by-3.0","cc-by-4.0","cc-by-sa-2.0","cc-by-sa-2.5","cc-by-sa-3.0","cc-by-sa-4.0"]);

const targets = [
  { slug: "school-of-athens", file: "Raphael School of Athens.jpg", out: "public/images/artifacts/school-of-athens.webp" },
  { slug: "platos-academy-mosaic", file: "Plato's Academy mosaic from Pompeii.jpg", out: "public/images/artifacts/platos-academy-mosaic.webp" },
  { slug: "plato-academy-site", file: "Athens Plato Academy Archaeological Site 1.jpg", out: "public/images/ruins/plato-academy-site.webp" },
  { slug: "aristotle-lyceum-site", file: "The ruins of the Lyceum of Aristotle on February 3, 2021.jpg", out: "public/images/ruins/aristotle-lyceum-site.webp" },
  { slug: "clarke-plato-manuscript", file: "Apologia beginning. Clarke Plato.jpg", out: "public/images/manuscripts/clarke-plato-manuscript.webp" },
  { slug: "map-ancient-greece", file: "Ancient greece so 1926.jpg", out: "public/images/maps/map-ancient-greece.webp" },
  { slug: "map-athens-attica", file: "Attica shepherd p16.jpg", out: "public/images/maps/map-athens-attica.webp" },
  { slug: "map-sparta", file: "Spartan Territory Before 371 BC.png", out: "public/images/maps/map-sparta.webp" },
  { slug: "map-persian-empire", file: "Persian empire.jpg", out: "public/images/maps/map-persian-empire.webp" },
  { slug: "map-alexander-empire", file: "Macedonian empire 336 323.jpg", out: "public/images/maps/map-alexander-empire.webp" },
  { slug: "map-roman-republic", file: "Map of Ancient Italy, Southern Part.jpg", out: "public/images/maps/map-roman-republic.webp" },
  { slug: "map-roman-empire", file: "Map of the Roman Empire during Trajan.png", out: "public/images/maps/map-roman-empire.webp" },
  { slug: "map-egypt", file: "Map of the new kingdom of egypt in 1453 bc under pharaoh thutmose iii.png", out: "public/images/maps/map-egypt.webp" },
  { slug: "map-mediterranean", file: "Greek phoenician 550.jpg", out: "public/images/maps/map-mediterranean.webp" },
];

const stripHtml = (s) => String(s ?? "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
async function info(file) {
  const u = new URL(API);
  u.search = new URLSearchParams({ action:"query", format:"json", prop:"imageinfo",
    iiprop:"extmetadata|url|size", titles:"File:"+file }).toString();
  const r = await fetch(u, { headers: { "User-Agent": UA } }); const d = await r.json();
  const p = Object.values(d.query.pages)[0];
  if (p.missing !== undefined) throw new Error("MISSING on Commons");
  const ii = p.imageinfo[0]; const em = ii.extmetadata || {}; const v = (k) => em[k]?.value ?? "";
  return { url:ii.url, width:ii.width, height:ii.height, license:v("LicenseShortName"),
    licenseId:String(v("License")).toLowerCase(), artist:stripHtml(v("Artist")), descUrl:ii.descriptionurl };
}
for (const t of targets) {
  try {
    const m = await info(t.file);
    if (!OK.has(m.licenseId)) throw new Error("LICENCE NOT ALLOWED: " + m.licenseId);
    const resp = await fetch(m.url, { headers: { "User-Agent": UA } });
    if (!resp.ok) throw new Error("download HTTP " + resp.status);
    const buf = Buffer.from(await resp.arrayBuffer());
    const outBuf = await sharp(buf).resize(1600, 1600, { fit: "inside", withoutEnlargement: true }).webp({ quality: 80, effort: 6 }).toBuffer();
    const fm = await sharp(outBuf).metadata();
    await mkdir(path.dirname(t.out), { recursive: true });
    await writeFile(t.out, outBuf);
    console.log(JSON.stringify({ slug:t.slug, ok:true, license:m.license, licenseId:m.licenseId,
      artist:m.artist, srcW:m.width, srcH:m.height, outW:fm.width, outH:fm.height,
      kb:Math.round(outBuf.length/1024), source:m.descUrl }));
  } catch (e) { console.log(JSON.stringify({ slug:t.slug, ok:false, error:String(e.message||e) })); }
}
