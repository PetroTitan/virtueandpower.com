#!/usr/bin/env node
/**
 * Homer / Odyssey archive image vendoring.
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
  {
    slug: "homer-bust-british-museum",
    file: "Portrait Bust of Homer - British Museum - Joy of Museums.jpg",
    out: "public/images/busts/homer-bust-british-museum.webp",
  },
  {
    slug: "polyphemus-amphora-eleusis",
    file: "Polyphemus amphora (detail).jpg",
    out: "public/images/artifacts/polyphemus-amphora-eleusis.webp",
  },
  {
    slug: "odysseus-sirens-stamnos",
    file: "Odysseus Sirens BM E440 n2.jpg",
    out: "public/images/artifacts/odysseus-sirens-stamnos.webp",
  },
  {
    slug: "odysseus-under-the-ram",
    file: "Attic black-figure pelike - ABV extra - Odysseus under the ram - Athens KM T HW 195 - 01.jpg",
    out: "public/images/artifacts/odysseus-under-the-ram.webp",
  },
  {
    slug: "circe-antidote-kylix",
    file: "Odysseus men turned into animals by Circe receive antidote photo by Lucas ancientartpodcast flickr cca2.0 8706785112 f6a311cafa o.jpg",
    out: "public/images/artifacts/circe-antidote-kylix.webp",
  },
  {
    slug: "boars-tusk-helmet-athens",
    file: "Boars's tusk helmet NAMA6568 Athens Greece1.jpg",
    out: "public/images/artifacts/boars-tusk-helmet-athens.webp",
  },
  {
    slug: "linear-b-tablet-pylos",
    file: "Linear B tablet Clay from Pylos end of 13th century BCE NAM Athens 01.jpg",
    out: "public/images/artifacts/linear-b-tablet-pylos.webp",
  },
  {
    slug: "mask-of-agamemnon",
    file: "Agamemnon mask NAMA Athens Greece.jpg",
    out: "public/images/artifacts/mask-of-agamemnon.webp",
  },
  {
    slug: "lion-gate-mycenae",
    file: "Lion Gate, Mycenae, 201510.jpg",
    out: "public/images/ruins/lion-gate-mycenae.webp",
  },
  {
    slug: "mycenae-citadel",
    file: "Mykene BW 2017-10-10 13-23-40.jpg",
    out: "public/images/ruins/mycenae-citadel.webp",
  },
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
