#!/usr/bin/env node
/**
 * Phase 17 founders/lawgivers/constitutions image vendoring.
 *
 * Same disciplined pipeline as the Roman and Persian vendoring tools:
 * verify licence / author / dimensions via the Wikimedia Commons API,
 * download the original, re-encode to WebP (quality 80, effort 6, 1600 px
 * longest edge). Only files whose licence resolves to CC0 / public-domain /
 * CC BY / CC BY-SA and whose identification is unambiguous are committed.
 *
 * Prints one JSON line per target so the registry entry can be filled in
 * from verified metadata rather than guessed.
 */
import sharp from "sharp";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const UA = "VirtueAndPowerBot/1.0 (editorial archive; titan95431@gmail.com)";
const API = "https://commons.wikimedia.org/w/api.php";
const OK = new Set([
  "cc0", "pd", "cc-by-2.0", "cc-by-2.5", "cc-by-3.0", "cc-by-4.0",
  "cc-by-sa-2.0", "cc-by-sa-2.5", "cc-by-sa-3.0", "cc-by-sa-3.0-fr", "cc-by-sa-4.0",
]);

const targets = [
  { slug: "hammurabi-stele", file: "P1050763 Louvre code Hammurabi face rwk.JPG", out: "public/images/artifacts/hammurabi-stele.webp" },
  { slug: "ishtar-gate", file: "Pergamonmuseum Ishtartor 03.jpg", out: "public/images/architecture/ishtar-gate.webp" },
  { slug: "babylon-processional-lion", file: "Reconstructed Processional Street of Babylon showing striding and roaring lions. From Babylon, Iraq. Pergamon Museum in Berlin.jpg", out: "public/images/artifacts/babylon-processional-lion.webp" },
  { slug: "gortyn-law-code", file: "Boustrophedon inscriptions Gortys.jpg", out: "public/images/artifacts/gortyn-law-code.webp" },
  { slug: "terracotta-army", file: "Terracotta Army, View of Pit 1.jpg", out: "public/images/ruins/terracotta-army.webp" },
  { slug: "terracotta-warrior", file: "Terracota warrior close-up.jpg", out: "public/images/artifacts/terracotta-warrior.webp" },
  { slug: "great-wall-jinshanling", file: "The Great Wall of China at Jinshanling-edit.jpg", out: "public/images/architecture/great-wall-jinshanling.webp" },
  { slug: "confucius-portrait", file: "Confucius Tang Dynasty.jpg", out: "public/images/artifacts/confucius-portrait.webp" },
  { slug: "leonidas-hoplite", file: "Statue of a hoplite, known as “Leonidas.” 5th cent. B.C.jpg", out: "public/images/artifacts/leonidas-hoplite.webp" },
  { slug: "pnyx-athens", file: "View of the Acropolis of Athens and Mount Lycabettus from the Orator’s Bema on the Pnyx on 23 September 2018.jpg", out: "public/images/ruins/pnyx-athens.webp" },
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
    artist: stripHtml(v("Artist")), credit: stripHtml(v("Credit")),
    descUrl: ii.descriptionurl,
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
