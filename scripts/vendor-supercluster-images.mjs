#!/usr/bin/env node
/**
 * Persia/Egypt/Alexander supercluster image vendoring. Same disciplined
 * pipeline: verify licence/author/dimensions via the Commons API, download,
 * re-encode to WebP (q80, e6, 1600 px longest edge). Only verified CC0 /
 * public-domain / CC BY / CC BY-SA files with unambiguous identification
 * are committed. One JSON line per target.
 */
import sharp from "sharp";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const UA = "VirtueAndPowerBot/1.0 (editorial archive; titan95431@gmail.com)";
const API = "https://commons.wikimedia.org/w/api.php";
const OK = new Set(["cc0","pd","cc-by-2.0","cc-by-2.5","cc-by-3.0","cc-by-4.0","cc-by-sa-2.0","cc-by-sa-2.5","cc-by-sa-3.0","cc-by-sa-4.0"]);

const targets = [
  { slug: "senusret-iii-statue", file: "Statues of Senusret III, British Museum 01.jpg", out: "public/images/artifacts/senusret-iii-statue.webp" },
  { slug: "saqqara-step-pyramid", file: "Saqqara, Pyramid of Djoser, Ancient Egypt.jpg", out: "public/images/architecture/saqqara-step-pyramid.webp" },
  { slug: "abu-simbel", file: "The great temple of Abu simbel..JPG", out: "public/images/architecture/abu-simbel.webp" },
  { slug: "hatshepsut-temple", file: "Thebes, Luxor, Egypt, Temple of Hatshepsut, Deir el-Bahari.jpg", out: "public/images/architecture/hatshepsut-temple.webp" },
  { slug: "luxor-temple", file: "Luxor Temple R04.jpg", out: "public/images/architecture/luxor-temple.webp" },
  { slug: "valley-of-the-kings", file: "Thebes, Luxor, Egypt, Panoramic view of the Valley of the Kings.jpg", out: "public/images/ruins/valley-of-the-kings.webp" },
  { slug: "great-sphinx-giza", file: "Great Sphinx of Giza (2).jpg", out: "public/images/architecture/great-sphinx-giza.webp" },
  { slug: "narmer-palette", file: "Narmer Palette.jpg", out: "public/images/artifacts/narmer-palette.webp" },
  { slug: "karnak-obelisk-hatshepsut", file: "Karnak Temple Obelisk (9794685624).jpg", out: "public/images/architecture/karnak-obelisk-hatshepsut.webp" },
  { slug: "trireme-olympias", file: "The trireme Olympias on 23 February 2019.jpg", out: "public/images/artifacts/trireme-olympias.webp" },
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
