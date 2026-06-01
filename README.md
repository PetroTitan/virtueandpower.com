# Virtue & Power

An intellectual platform exploring classical philosophy, virtue, power,
leadership, statecraft, civilization and the ancient world — grounded in
primary sources and the long arc of historical thought.

This repository hosts [virtueandpower.com](https://virtueandpower.com).

---

## What this project is

Virtue & Power is a long-term editorial platform, not a blog and not a content
site. It is an attempt to build a thoughtful, well-organised library of essays,
entries on philosophers, guides to primary texts and traceable quotations —
written for serious readers.

The site is designed to grow slowly and to last:

- one well-sourced essay is worth more than ten thin ones
- every quotation carries its precise citation (Stephanus page, Bekker number,
  book and chapter), and no quotation is published until it has been verified
  against a primary text or established critical edition
- nothing on this site is auto-generated and nothing is paraphrased and
  presented as a verbatim quote

## What this project is not

- not a startup landing page
- not a motivational platform
- not an algorithmic content farm
- not a vehicle for laundering modern slogans through ancient names

---

## Architecture

```
.
├── content/                          # MDX content, one file per entry
│   ├── philosophers/
│   ├── books/
│   ├── themes/
│   ├── quotes/
│   ├── comparisons/
│   ├── essays/                       # Interpretive long-form
│   └── guides/                       # Reading orientations
├── src/
│   ├── app/                          # Next.js App Router (RSC)
│   │   ├── layout.tsx                # Root layout, fonts, header/footer
│   │   ├── page.tsx                  # Homepage
│   │   ├── about/
│   │   ├── editorial-policy/         # The standards behind every entry
│   │   ├── sources/                  # The catalog (rendered from src/data/sources.ts)
│   │   ├── essays/                   # index + [slug] — editorial long-form
│   │   ├── guides/                   # index + [slug] — reading orientations
│   │   ├── philosophers/             # index + [slug]
│   │   ├── books/                    # index + [slug]
│   │   ├── themes/                   # index + [slug]
│   │   ├── quotes/                   # index + [slug]
│   │   ├── comparisons/              # index + [slug]
│   │   ├── leadership/               # study landing
│   │   ├── power/                    # study landing
│   │   ├── virtue/                   # study landing
│   │   ├── statecraft/               # study landing
│   │   ├── war-and-peace/            # study landing
│   │   ├── religion-and-wisdom/      # study landing
│   │   ├── ancient-world/            # study landing
│   │   ├── privacy-policy/           # Trust pages
│   │   ├── terms/
│   │   ├── cookie-policy/
│   │   ├── icon.tsx                  # Favicon (32x32 V&P monogram)
│   │   ├── apple-icon.tsx            # iOS home-screen icon
│   │   ├── opengraph-image.tsx       # Default OG card (1200x630)
│   │   ├── twitter-image.tsx         # Same image, twitter:card slot
│   │   ├── llms.txt/route.ts         # Machine-readable description for AI crawlers
│   │   ├── humans.txt/route.ts       # humanstxt.org-style colophon
│   │   ├── rss.xml/route.ts          # RSS 2.0 feed
│   │   ├── robots.ts                 # robots.txt
│   │   ├── sitemap.ts                # sitemap.xml
│   │   └── not-found.tsx             # 404
│   ├── components/
│   │   ├── layout/                   # Container, PageSection, PrimaryNav, SiteHeader, SiteFooter
│   │   ├── editorial/                # The editorial component library
│   │   │   ├── Typography            # Eyebrow · Lede · Prose · RuleTitle
│   │   │   ├── QuoteBlock
│   │   │   ├── ThinkerCard
│   │   │   ├── ThemeCard
│   │   │   ├── BookCard
│   │   │   ├── EssayCard
│   │   │   ├── EssayHero
│   │   │   ├── SectionIntro
│   │   │   ├── RelatedReading
│   │   │   ├── ReadingList
│   │   │   ├── TimelineBlock
│   │   │   ├── EditorialGrid
│   │   │   ├── Breadcrumbs
│   │   │   ├── PageHeader
│   │   │   ├── SourceCard
│   │   │   └── StubNotice
│   │   ├── site/                     # Hero, NewsletterCta, StudyLanding
│   │   ├── seo/                      # JsonLd
│   │   └── analytics/                # WebmasterID (inlined SDK)
│   ├── content/                      # Typed loader + MDX renderer
│   │   ├── types.ts                  # Frontmatter schemas (7 kinds)
│   │   ├── loader.ts                 # File-system loader + ref resolver
│   │   ├── mdx.tsx                   # MDX renderer with built-in components
│   │   ├── reading-time.ts           # Node-side wpm estimator for essays/guides
│   │   └── README.md                 # Authoring guide
│   ├── data/                         # Source governance
│   │   └── sources.ts                # Typed catalog of editions & references
│   ├── lib/
│   │   ├── site.ts                   # Site config, navigation
│   │   ├── seo.ts                    # buildMetadata, JSON-LD helpers
│   │   ├── cn.ts
│   │   └── content-health/           # Editorial QA module
│   │       ├── types.ts              # Issue · Severity · IssueCode · ValidationReport
│   │       ├── checks.ts             # 11 typed validators
│   │       └── report.ts             # Console + markdown formatters
│   └── styles/
│       └── globals.css
├── public/
│   ├── 9e157e…ffd.txt                # IndexNow key (see public/README-indexnow.md)
│   └── README-indexnow.md            # IndexNow submission protocol notes
├── scripts/
│   └── validate-content.ts           # CLI entry; runs all checks, exits 1 on errors
├── .github/workflows/
│   └── ci.yml                        # typecheck · lint · validate · build
├── reports/                          # Generated; gitignored
├── next.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

### Tech

- **Next.js 15** App Router with React Server Components
- **TypeScript** in strict mode
- **Tailwind CSS** with a small, restrained editorial palette and typography
  scale (`ivory`, `parchment`, `charcoal`, `bronze`, `stone`)
- **MDX** for all long-form content, via `next-mdx-remote` and `gray-matter`
- Server-rendered throughout — the only client components are the primary
  navigation wrappers (`PrimaryNav`, `MobileNav`) which need `usePathname`
  for active-link state and Escape/outside-click behaviour on the mobile
  disclosure. Every piece of editorial content stays in the SSR HTML.
- Designed for Vercel; works on any Node host that runs Next.js

### Content model

All long-form content lives under `/content` as MDX. The platform now
supports seven typed content kinds (see
[`src/content/types.ts`](src/content/types.ts)):

- `philosopher` — era, lifespan, tradition, primary works, related entries
- `book` — author, period, original language, composition date, themes
- `theme` — domain, key thinkers, key texts
- `quote` — attribution, work title, **precise citation**, translator
- `comparison` — subjects (typed `{ kind, slug }` refs), domain
- `essay` — subtitle, domain, primary thinkers / books / themes, reading
  time
- `guide` — subtitle, domain, `guideType` (`introduction` · `thinker` ·
  `book`), single typed `mainSubject`, reading time

Cross-references are typed `{ kind, slug }` tuples that the loader resolves
into the cards rendered by `RelatedReading`, `ThinkerCard`, etc. This is the
mechanism behind the internal-linking architecture: Plato → Republic →
Justice → Virtue → Aristotle → Leadership — and now also Homer → Iliad →
Courage → *Courage in the Iliad* (essay) → *Understanding the Iliad*
(guide).

**Backlinks.** The loader walks every entry's typed cross-reference fields
(`related`, `primaryWorks`, `primaryThemes`, `keyThinkers`, `keyTexts`,
`subjects`, `primaryThinkers`, `primaryBooks`, `mainSubject`) to compute
the in-edges of any given entry. Each detail page merges forward refs with
de-duplicated backlinks, so the corpus reads correctly in either direction
— if the Virtue theme points at Aristotle, the Aristotle entry surfaces
the Virtue theme even before Aristotle's own frontmatter has been
updated.

Every entry declares `status: "stub" | "published"`. Stubs render with a
visible editorial notice on the page and are emitted as `robots:
noindex,follow` so they don't enter the search index; they are also
filtered out of `sitemap.xml` and `rss.xml`. Only `published` entries are
presented as authoritative and discoverable.

### Content lifecycle

```
draft (local)  →  stub (in repo, status:"stub")  →  published (status:"published")
```

- **Draft.** Work-in-progress sitting on a working branch.
- **Stub.** Frontmatter committed, status `stub`, body limited to a brief
  scope note. Renders on the site behind a visible "Editorial status"
  notice, emits `robots:noindex`, and is excluded from sitemap and RSS.
  The structure is legible but the entry makes no specific claims.
- **Published.** Body written, sources checked, status flipped to
  `published`, `updated` date refreshed. The entry now appears in the
  sitemap and the feed, and is indexable. The transition is a deliberate
  editorial act, not an automated one.

There is intentionally no automation that promotes a stub to published.

### Editorial governance

Two pieces of the project make the editorial standards visible and
auditable rather than just stated:

- **[`/editorial-policy`](src/app/editorial-policy/page.tsx)** — the live
  policy page. Covers editorial review, historical accuracy, the use of
  primary sources, the distinction between factual summary,
  interpretation and commentary, citation discipline, the no-invented-
  quotations rule, the stub-content lifecycle, corrections, and
  conflicts of interest.
- **[`/sources`](src/app/sources/page.tsx)** — rendered from
  [`src/data/sources.ts`](src/data/sources.ts), the typed registry of
  the texts, critical editions and reference works the editorial team
  reads from. Each entry carries author, editor, translator (where
  applicable), original period, language, public-domain status and a
  short editorial note. Public-domain status is asserted only where it
  is well established; otherwise marked `unverified` rather than
  guessed at. Sources cross-reference into the content graph via
  `relatedThinkers`, `relatedBooks` and `relatedThemes`.

### SEO

- Per-page `Metadata` via `buildMetadata()` (canonical, OG, Twitter card,
  Article `modifiedTime`, opt-in `noindex`)
- Site-wide `WebSite` and `Organization` JSON-LD on the homepage
- Per-entry `BreadcrumbList` + `Article` JSON-LD on every detail page; plus
  `Person` JSON-LD on philosopher detail pages and `Book` JSON-LD on book
  detail pages, with best-effort BCE/CE lifespan parsing for the `Person`
  schema (omits the dates rather than guessing when input is ambiguous)
- `robots.txt`, `sitemap.xml` and `rss.xml` are all generated server-side.
  Stubs are filtered out of the sitemap and feed to avoid the
  "noindex URL listed in sitemap" configuration mismatch.
- All important content is in the server-rendered HTML; no editorial copy
  depends on client hydration to appear in the document.

### SEO philosophy

We optimise for search by writing things worth indexing, not by gaming the
index. Three working rules:

1. **Don't publish what we wouldn't want crawled.** Stubs are noindex and
   absent from the sitemap. The bar for the live web index is the same as
   the bar for a reader.
2. **Cite first, then write.** Quotations carry their workTitle and
   workCitation as required schema fields — verifiability is structural,
   not a footnote.
3. **One canonical URL per idea.** Sections live at clean, durable paths;
   internal links use the typed graph rather than ad-hoc hrefs, so the
   structure doesn't drift as the corpus grows.

### Analytics

The platform uses [WebmasterID](https://webmasterid.com) for traffic
and AI-referral analytics. The integration is intentionally minimal:

- One inline server component at
  [`src/components/analytics/WebmasterID.tsx`](src/components/analytics/WebmasterID.tsx)
  that mirrors the public `@webmasterid/sdk-next` API. (The SDK is a
  private workspace package at the moment; once it ships to npm the
  import path can be swapped with a one-line change.)
- Mounted once at the bottom of `<body>` in
  [`src/app/layout.tsx`](src/app/layout.tsx) so every App-Router
  route picks it up automatically.
- Loaded via `next/script` with `strategy="afterInteractive"` and
  `defer` — no render blocking, no first-paint penalty.
- Stable `id="webmasterid-tracker"` so even an accidental double
  render injects the script only once.

Configuration:

| Var | Default |
|---|---|
| `NEXT_PUBLIC_WEBMASTERID_SITE_ID` | `wm_5flk74cqef8jjxar` |
| `NEXT_PUBLIC_WEBMASTERID_ENDPOINT` | `https://webmasterid-ingest-api.vercel.app/api/events` |
| `NEXT_PUBLIC_WEBMASTERID_DISABLED` | _(unset)_; set to `1` to skip the tracker entirely |

To **change the site id** (e.g. for a staging deploy), set
`NEXT_PUBLIC_WEBMASTERID_SITE_ID` in the deployment environment. To
**point at a private ingest endpoint**, set
`NEXT_PUBLIC_WEBMASTERID_ENDPOINT`. To **disable analytics
completely** (local dev, preview builds, environments with stricter
privacy posture), set `NEXT_PUBLIC_WEBMASTERID_DISABLED=1` — the
check is hoisted to the layout, so when disabled the component isn't
even invoked and the site id is absent from the RSC payload.

### Analytics philosophy

Three working rules, deliberately matching the rest of the site's
restraint:

1. **No reader-visible analytics surface.** No banner, no widget, no
   "we use cookies" overlay, no opt-in popup. The editorial reading
   experience is the entire reading experience.
2. **Public, public-keyed data only.** The `data-wmid` attribute is a
   public identifier (visible to anyone who views the page source) and
   carries no personal information. There is no separate consent flow
   because there is nothing being collected that would require one.
3. **Reversible by environment variable.** Any deployment can switch
   the tracker off with one env var without touching the code.

### Launch readiness

The platform is built to be discoverable on its own terms — by search
engines, by AI systems that summarise classical material, and by
human readers who arrive via a link in a citation.

**Production domain.** Everything canonicalises on
`https://virtueandpower.com`. `siteConfig.url` (overridable via
`NEXT_PUBLIC_SITE_URL`) flows through `buildMetadata` to OG, Twitter,
Article and Breadcrumb JSON-LD, `sitemap.xml`, `rss.xml`, `robots.txt`,
`/llms.txt` and `/humans.txt`. The `production-urls` content-health
check verifies no MDX body ever contains a localhost, preview or
tunnel URL that would survive into production.

**Branding.** Four Next.js file-convention assets render at request
time via `ImageResponse`:

| File | Surface |
|---|---|
| [`app/icon.tsx`](src/app/icon.tsx) | 32x32 favicon (V&P serif monogram) |
| [`app/apple-icon.tsx`](src/app/apple-icon.tsx) | 180x180 iOS home-screen icon |
| [`app/opengraph-image.tsx`](src/app/opengraph-image.tsx) | 1200x630 default OG card |
| [`app/twitter-image.tsx`](src/app/twitter-image.tsx) | Same image at the Twitter slot |

Per-page Metadata sets `images` only when an explicit override is
given; otherwise the file-convention images flow through Next's
metadata merging. There is no static PNG to maintain.

**AI discoverability.**

- [`/llms.txt`](src/app/llms.txt/route.ts) — plain text in the loose
  [llmstxt.org](https://llmstxt.org) tradition; names the editorial
  commitments, the stub/published lifecycle, and points at the seven
  main sections plus the sitemap and RSS. Cached for 1 hour.
- The editorial-policy and source catalog are public surfaces (`/editorial-policy`,
  `/sources`); LLMs that read those pages get the same source-discipline
  framing readers get.
- `robots.txt` permits all user agents by default. We do not block AI
  crawlers; the platform is built to be the kind of thing they should
  read.

**Search-engine readiness.**

- `sitemap.xml` enumerates every static section + every `status:
  "published"` MDX entry; stubs are filtered out so a noindex URL is
  never advertised.
- `rss.xml` lists every published entry sorted by `updated` for
  Google Search Console / Bing Webmaster discovery and for standard
  feed readers.
- Per-entry Article + Breadcrumb JSON-LD on every detail page; Person
  on philosopher pages, Book on book pages.

**IndexNow.** The static key file at
[`public/9e157ec92314db2f0278703fe2b90ffd.txt`](public/README-indexnow.md)
verifies ownership for the [IndexNow](https://www.indexnow.org/)
protocol (Bing, Yandex, Seznam.cz). Manual submission is the current
process; see `public/README-indexnow.md` for the curl recipe.
Automated pinging on publish is a deliberate non-goal until the
publish cadence justifies it.

**Trust pages.** Three short, honest pages match how the platform
actually behaves:

- `/privacy-policy` — WebmasterID is the only analytics; no
  third-party ads, retargeting or social trackers; standard Vercel
  operational logs.
- `/terms` — free to read, link and quote; substantial republication
  needs permission; standard no-warranty disclaimers.
- `/cookie-policy` — first-party analytics identifier only; no
  third-party cookies; three plain ways to opt out; the absence of a
  consent banner is stated as a goal rather than treated as a gap.

The footer carries the seven editorial nav groups plus a new **Trust**
group (Privacy / Terms / Cookies) and a **Discovery** group (RSS /
Sitemap / llms.txt / humans.txt).

---

## Development

```bash
npm install
npm run dev                          # http://localhost:3000
npm run typecheck
npm run lint
npm run validate:content             # editorial QA (11 checks)
npm run validate:content:report      # additionally writes reports/content-health.md
npm run build                        # validate:content runs again via prebuild
```

`npm run build` runs `validate:content` first via the `prebuild` hook, so
an unhealthy corpus cannot ship a broken site even if a developer skips
the validator locally.

## Content health

A typed editorial-QA module lives at
[`src/lib/content-health/`](src/lib/content-health/) and is exercised by
[`scripts/validate-content.ts`](scripts/validate-content.ts). It runs ten
focused checks against the live MDX corpus and the typed source catalog
and reports each issue with a stable code, a human message, the file
location and (where useful) a one-line hint about how to fix it.

### What the checks cover

| Check | Severity | What it catches |
|---|---|---|
| `frontmatter` | error | Unknown content kinds, missing required fields, invalid `status`, malformed `updated` dates (incl. silent YAML date-overflow like `2026-13-99 → April 8, 2027`) |
| `duplicate-slugs` | error | Two entries claiming the same `{kind, slug}` |
| `broken-refs` | error | Any typed cross-reference (`related`, `primaryWorks`, `primaryThemes`, `keyThinkers`, `keyTexts`, `subjects`) pointing at an entry that doesn't exist |
| `source-integrity` | error | Duplicate source ids; `relatedThinkers / relatedBooks / relatedThemes` in `sources.ts` pointing at entries that don't exist |
| `metadata` | error / warning | Missing title or description; description over the 320-char cap; short-description warning under 50 chars |
| `published-quality` | error | A published entry that still contains a stub-notice block, a placeholder marker (`TODO` / `TKTK` / `FIXME` / `lorem ipsum`), or lacks the structural minimum (one H2 + two substantive paragraphs) |
| `sitemap-consistency` | error | The `/quotes/_placeholder` marker being accidentally promoted to `status: published` (would leak into the sitemap) |
| `rss-consistency` | error | Same predicate, against the RSS feed |
| `quote-safety` | error | A published quote missing `attribution`, `workTitle` or `workCitation`; placeholder markers in a quote body |
| `production-urls` | error | A URL in an MDX body that points at `localhost`, `127.0.0.1`, `*.vercel.app` (preview hostnames) or `*.ngrok.app` — anything that wouldn't survive a production deploy. |
| `orphans` | warning | A published entry with zero inbound cross-references from any other entry |

The validator deliberately does *not* enforce word counts. The
published-quality check is structural — about whether an entry has
actually been written, not about hitting an arbitrary length target.

### CI validation philosophy

Three working rules guide what the checks do (and don't):

1. **Catch silent failures, not stylistic ones.** A broken cross-reference
   or a YAML date-overflow is the kind of bug that breaks the platform's
   credibility without ever throwing an error at build time. The checks
   focus there. They do not try to be a style guide.
2. **Fail loudly, fail clearly.** Every issue carries a stable code
   (`BROKEN_REF`, `STUB_NOTICE_IN_PUBLISHED`, `PUBLISHED_TOO_THIN`, etc.),
   a human-readable message that names the affected file, and where
   useful a hint about the right fix. Greppable on a CI page; obvious in
   a terminal.
3. **Warnings don't fail builds.** Orphan detection and the short-
   description nudge are warnings — they surface for an editor to read
   and act on, but they don't block a deploy. Errors do.

### Editorial QA workflow

```
edit / add MDX  →  npm run validate:content  →  fix any errors
                                            ↓
                                   warnings? consider them, deploy if not blocking
                                            ↓
                              git push  →  CI re-runs the same checks
                                            ↓
                                npm run build  →  ships
```

The flow is the same locally and in CI because the validator is the same
module on both sides. The GitHub Actions workflow runs typecheck, lint,
`validate:content:report` (uploaded as a 14-day artefact) and the
build, on every push to main and every PR against main.

### Resolving validation failures

| Code | What to do |
|---|---|
| `BROKEN_REF` | Either create the missing entry at `/content/<kind>s/<slug>.mdx` or remove the stale reference from the entry's frontmatter. |
| `DUPLICATE_SLUG` | One of the two entries was almost certainly meant to have a different slug; pick which is canonical and rename the other. |
| `INVALID_FRONTMATTER` | Add the missing required field, or correct the kind. See `KIND_REQUIRED_FIELDS` in `checks.ts` for the per-kind list. |
| `INVALID_STATUS` | `status` must be exactly `"stub"` or `"published"`. |
| `INVALID_DATE` | `updated` must be a strict `YYYY-MM-DD` with sensible month and day. Often this means a typo (`2026-13-09`); fix the literal. |
| `MISSING_SOURCE_REF` | A source in `sources.ts` references a thinker/book/theme slug that doesn't exist. Either correct the slug in the catalog or add the missing entry. |
| `STUB_NOTICE_IN_PUBLISHED` | Remove the "this entry is a placeholder stub" block before promoting to `status: published`. |
| `PUBLISHED_TOO_THIN` | Add at least one H2 heading and a second substantive paragraph, or move the entry back to `status: stub`. |
| `PLACEHOLDER_MARKER` | Resolve the TODO / FIXME / lorem ipsum in the body. |
| `MISSING_METADATA` / `INVALID_METADATA` | Tighten the title or description; the OG and search-snippet limit is ~300 chars. |
| `QUOTE_INCOMPLETE` | A published quote needs `attribution`, `workTitle` and `workCitation`. If any of those can't be supplied, downgrade to `status: stub`. |
| `NON_PROD_URL` | Replace the non-production URL with its production https://virtueandpower.com equivalent, or remove the link entirely if it was a development reference. |
| `ORPHANED_ENTRY` (warning) | Add the entry to a `related: [{kind, slug}]` list on at least one other entry so it surfaces in Related Reading. |
| `WEAK_DESCRIPTION` (warning) | Write a slightly longer description (>= 50 chars); improves OG cards and search snippets. |

### Adding content safely

The workflow below is what we run for every new entry. Following it is
how the no-invented-quotations and no-invented-citations rules stay
true in practice.

1. **Open as a stub first.** Create `/content/<kind>s/<slug>.mdx`, fill
   the required frontmatter, set `status: "stub"`, and write a short
   scope note in the body. This gets the URL into the graph and the
   editorial team can plan cross-references without committing claims.
2. **Identify the sources before writing the body.** If there is no
   primary text and no reputable secondary work to ground the entry,
   the entry is not ready to leave stub. Sources go in
   [`src/data/sources.ts`](src/data/sources.ts) so they are visible on
   the `/sources` page; do not list a source there until you have
   actually consulted it.
3. **Write the body to those sources.** Stick to what the texts and the
   scholarship support. Where a claim is contested or a date is
   approximate, mark it. Do not introduce specific quotations,
   Stephanus / Bekker page numbers, or precise dates that you have not
   verified to a primary text or critical edition.
4. **Cross-link.** Add `related: [{ kind, slug }]` entries and the
   kind-specific fields (`primaryWorks`, `primaryThemes`, `keyThinkers`,
   `keyTexts`, `subjects`) so the page connects into the graph in both
   directions. The backlink computation will surface the entry from
   pages it references, even before those pages link back.
5. **Promote and refresh the date.** Flip `status` to `"published"` and
   set `updated` to the publication or last-revision date. This is the
   editorial sign-off; do it deliberately.

For the surrounding standards — what counts as a primary source, how
quotations are handled, how stubs are treated, how corrections work —
see the live [`/editorial-policy`](src/app/editorial-policy/page.tsx)
page and the source catalog at
[`/sources`](src/app/sources/page.tsx) (backed by
[`src/data/sources.ts`](src/data/sources.ts)).

### Quote policy in one paragraph

A quote page on this site is not published until the editorial team can
state the exact wording, the work it comes from, the chapter / section
or Stephanus / Bekker citation, and the translator and edition (where
the wording is a translation) — and can write enough surrounding
context that the line is not prised out of its argument. The library
opens largely empty by design.

### Editorial commitments

These are non-negotiable and they govern every entry:

- **No invented quotations.** If a passage cannot be verified to a primary
  text or reputable scholarly edition, it does not appear on this site.
- **No fabricated citations.** Every quote carries `workTitle` and
  `workCitation`.
- **No AI-generated filler.** Tools may assist with structure and editing;
  the substantive claims must be human, sourced and traceable.
- **No flattening.** Difficult thinkers are not reduced to easy lessons.

---

## The classical library

The current published corpus, organised by section.

**Civilizations** (`/civilizations`) — the editorial frame the
rest of the corpus sits inside

- *Rome* — Republic and Empire, c. 509 BCE – c. 235 CE
- *Greece* — City-state federation, c. 800 – c. 30 BCE
  - *Athens* — Democratic polis (sub-hub)
  - *Sparta* — Mixed constitutional polity with citizen-soldier
    order (sub-hub)
  - *Hellenistic World* — Greek-Macedonian imperial monarchies
    (sub-hub)
- *Persia* — Achaemenid imperial monarchy, c. 550 – 330 BCE
- *Egypt* — Sacred monarchy, c. 3100 – 30 BCE

**Philosophers and historical figures** (`/philosophers`, grouped by era)

- *Archaic Greece:* Homer
- *Founders and lawgivers:* Lycurgus, Solon, Numa Pompilius, Cyrus
  the Great
- *Classical Greece:* Socrates, Plato, Aristotle, Xenophon,
  Themistocles, Pericles
- *Macedonian transition:* Alexander the Great
- *Roman Republic:* Scipio Africanus, Gaius Marius, Lucius Cornelius
  Sulla, Pompey, Julius Caesar, Cato the Younger, Cicero
- *Roman historians:* Sallust, Livy, Polybius, Tacitus, Suetonius
- *Roman Empire (Greek under Rome / Latin imperial):* Plutarch,
  Augustus, Trajan

**Books** (`/books`)

- Homer — *Iliad*
- Plato — *Republic*
- Xenophon — *Cyropaedia*, *Memorabilia*
- Aristotle — *Nicomachean Ethics*
- Plutarch — *Parallel Lives*
- Cicero — *De Officiis*, *De Re Publica*
- Caesar — *Commentarii de Bello Gallico*
- Sallust — *The Conspiracy of Catiline*, *The Jugurthine War*
- Livy — *Ab Urbe Condita*
- Polybius — *Histories*

**Themes** (`/themes`)

- *Character virtues:* Virtue, Courage, Self-Control, Ambition,
  Discipline, Honor, Duty
- *Political:* Justice, Leadership, Statecraft, Power, Republic,
  Empire, Law, Civic virtue, Civic order, Founding, Mixed
  constitution, Tyranny, Sacred kingship, Imperial
  administration, Democracy, Oligarchy, Citizenship, Political
  argument, Naval power
- *Historical:* War and Peace, Corruption, Decline, Military
  virtue, Discipline and order, Education, Historical memory,
  Historical method, Empire and memory

**Comparisons** (`/comparisons`)

- Plato and Aristotle
- Plato and Xenophon
- Socrates and the Sophists
- Iliad and Odyssey

**Essays** (`/essays`) — interpretive long-form

- *Virtue without power* — virtue separated from political power
- *Power without virtue* — the deformation of the ruler by unbounded power
- *Courage in the Iliad* — heroism, mortality and honour in Homer
- *The Socratic method* — what the elenchus is doing
- *Plutarch on character* — biography as moral and political inquiry
- *Why Rome mattered* — what the European tradition kept from Rome
- *Lycurgus and Spartan discipline* — civic education as constitution
- *Cyrus and the education of rulers* — Xenophon's *Cyropaedia* and
  the formation of character
- *Marius, Sulla and Roman norms* — the cumulative drift of
  exceptional measures
- *Pompey versus Caesar* — the war whose senatorial side was less of
  a defence of the Republic than it pretended to be
- *Caesar and the collapse of the Republic* — what the crossing of
  the Rubicon foreclosed
- *Augustus and the transformation of Rome* — the settlement that
  preserved the forms while concentrating the substance
- *The Roman idea of civic virtue* — Cicero's *De Officiis* and what
  the long tradition kept from it
- *Why the Roman Republic collapsed* — the structural argument
- *Polybius and the mixed constitution* — what Book VI did
- *Cicero and the defence of civic order* — *De Re Publica* and
  *De Officiis* read together as a working argument
- *Sallust on corruption and ambition* — the diagnosis the European
  moral tradition kept returning to
- *Caesar as general and as statesman* — why the assessments run in
  opposite directions and how to hold them together
- *Why Roman history became moral instruction* — Livy, Sallust,
  Plutarch and the *exempla* tradition
- *Tacitus and the psychology of empire* — the structural-
  psychological argument the *Annales* and *Historiae* make about
  unbounded power
- *Suetonius and the personalisation of imperial power* — the
  topical-biographical method and its analytical content
- *Republic memory under empire* — how the high-imperial
  historiography kept the older constitutional vocabulary alive
- *Why Rome became obsessed with decline* — the consistent
  intellectual habit and the European tradition that inherited it
- *Athens and the invention of politics* — what Athens specifically
  invented across the sixth, fifth and fourth centuries BCE
- *Sparta and the discipline of order* — the working Spartan
  proposition for civic-discipline-based political order, with
  the costs placed at the centre rather than at the margin
- *Athens versus Sparta* — the two constitutional experiments
  held together with five working axes of contrast
- *Why Greek political argument still matters* — what the
  modern adaptations of the Greek invention continue to require
- *The Hellenistic transformation of the ancient world* — the
  three centuries between Alexander and the Roman annexation
  of Egypt as the working hinge between the polis and Rome
- *Thucydides and political realism* — what the
  *Peloponnesian War* actually argues and what the modern
  realist tradition has and has not preserved
- *Why civilizations remember* — the four ancient practices of
  cultural memory and their European inheritances
- *Rome as institutional memory* — the working Roman inheritance
  the European tradition built on, distinct from the Roman
  political form
- *Greece and the invention of political argument* — the specific
  working practice the Greek city-states invented
- *Persia and imperial administration* — the Achaemenid answer
  to the continental-scale administrative problem
- *Egypt and sacred continuity* — the Pharaonic case and what the
  Mediterranean civic tradition's vocabulary cannot fully read

**Guides** (`/guides`) — reading orientations

- *Introduction to classical philosophy* (where to begin)
- *How to read Plato* (thinker)
- *How to read Xenophon* (thinker)
- *Understanding the Republic* (book)
- *Understanding the Iliad* (book)

The catalog grows slowly. A figure or work is added only after a human
editor has read the primary text and the surrounding scholarship.

### The essay & guide layer

Essays and guides are the platform's long-form layer. They are written
to the same source-discipline standards as the library entries (no
invented quotations, no fabricated citations) but they do different
work:

- **Essays argue.** Where the library entries describe a thinker, work
  or theme on its own terms, an essay is willing to commit to a
  reading. Each essay carries `primaryThinkers`, `primaryBooks` and
  `primaryThemes` typed cross-references so it joins the graph from
  both sides: the entries it interprets surface it via backlinks, and
  it surfaces them in its sidebar.
- **Guides instruct.** Each guide is editorial scaffolding for a
  reader approaching a particular thinker, work or area for the first
  time — where to start, what to expect, what to set aside, how to
  choose translations. Guides carry a single typed `mainSubject` and a
  `guideType` (`introduction` · `thinker` · `book`) which the
  `/guides` index uses to group them editorially rather than
  alphabetically.

Both kinds carry a node-side **reading-time** estimate (220 wpm,
1-minute floor, code fences and HTML stripped — see
[`src/content/reading-time.ts`](src/content/reading-time.ts)). Detail
pages show it as page meta and in the sidebar; the essay landing and
the homepage Featured Essays strip surface it as card meta.

### Long-form editorial philosophy

The essay and guide layer exists to give serious readers something
worth reading — not to scale word count. Three working rules:

1. **Argument, not opinion column.** An essay should advance a reading
   the editor can defend from the primary text and is willing to be
   refuted on. We do not write personal-reflection pieces, and we do
   not write contemporary-politics op-eds with classical names
   attached.
2. **Send the reader back to the text.** A good guide leaves the
   reader better prepared to read the primary work; a good essay
   leaves the reader wanting to. Neither should be a substitute for
   the texts they treat.
3. **No invented authority.** The longer the piece, the easier it is
   to slip in a paraphrase that hardens into a "quotation." Every
   essay and guide on this site goes through the same source-discipline
   review as a library entry; the content-health validator
   (`PLACEHOLDER_MARKER`, `STUB_NOTICE_IN_PUBLISHED`,
   `PUBLISHED_TOO_THIN`) applies to them in the same way.

### Expansion philosophy

A few working rules govern how the library is grown:

1. **Depth before breadth.** A new entry is worth more than a third
   philosopher entry at the same depth as the existing two. We extend
   in the direction where the platform's claims get sharper.
2. **Pair entries with their texts.** Adding a philosopher entry without
   the principal work it depends on (or vice versa) leaves a hole in the
   graph. Where possible, philosophers and their primary works land
   together — Xenophon with the *Cyropaedia* and the *Memorabilia*,
   Plutarch with the *Lives*, Homer with the *Iliad*.
3. **Sources before claims.** A new entry is preceded by the addition
   (or confirmation) of the source records it depends on in
   `src/data/sources.ts`, which appears on the public `/sources` page.
   No source is added to the catalog that the editorial team has not
   actually consulted.
4. **Conservative on contested ground.** Where the Homeric Question,
   the Socratic problem, or the historicity of an ancient detail is
   genuinely disputed, the entry says so rather than picking a side.

### The semantic graph

Cross-references are typed `{ kind, slug }` tuples and form a directed
graph across seven kinds: philosophers → books, books → themes, themes
→ philosophers, comparisons → multiple subjects, essays → primary
thinkers / books / themes, guides → a single main subject. The
loader's backlink computation surfaces in-edges automatically across
all seven, so an entry that another entry points at will see the
inbound link in its Related Reading without having to duplicate the
reference in its own frontmatter.

In practice this means we can add forward references opportunistically
(when an entry's body actually mentions another) without losing the
relationship — Aristotle's entry doesn't need to list every essay or
theme that references him; those still surface via backlinks. The
`ORPHANED_ENTRY` warning in the content-health validator (see above)
is the safety net for the small number of cases where neither side
declares the relationship.

The denser the corpus, the richer the graph; the richer the graph, the
more useful the platform becomes as a reading aid.

### The primary-text layer

The platform takes primary classical works seriously as first-class
editorial entities. A *book* entry is not a plot summary or a school
report. It is an editorial reading of *why the work was written*,
*what political or civilizational question it asks*, *how the
European tradition has read it*, and *what about that reading we
think should still hold up*.

Book entries carry three typed cross-reference fields:
`primaryThemes` (the platform themes the work most centrally
concerns), `primaryThinkers` (the figures the work most closely
concerns or is in dialogue with) and the general `related` graph.
The book detail page surfaces resolved `primaryThemes` and
`primaryThinkers` in the sidebar; the rest flow through the standard
Related Reading. The point is that a primary work like Polybius'
*Histories* sits in the corpus as a node connected on every relevant
side — to the authors who read it (Cicero, Machiavelli, Adams), to
the figures it makes intelligible (Scipio Africanus), to the themes
it shaped (mixed constitution, republic, decline), and to the essays
that develop its argument.

#### Translation and edition discipline

Every primary text entry includes a `recommendedTranslation` field
written for the working reader. We distinguish three kinds of
recommendation:

- **Public-domain translations** (out of copyright in the United
  States; safe to host on Project Gutenberg, Internet Classics
  Archive, LacusCurtius). These are the translations we link to
  when the question is *accessibility*. Examples: Jowett's Plato,
  Dakyns' Xenophon, Roberts' Livy, the older Loeb volumes by
  Rolfe (Sallust), Perrin (Plutarch), Paton (Polybius).
- **Standard scholarly translations** in print. Named where they
  exist as the working translations the editorial team itself
  consults. Examples: Margaret Atkins' *De Officiis*, Niall Rudd's
  *Republic and Laws*, Robin Waterfield's Polybius.
- **Critical editions of the original-language text.** Named as
  the standard reference (the Oxford Classical Texts; the Bibliotheca
  Teubneriana). Cited so that scholarly readers know what we are
  working from; not the form most readers will encounter.

We do not assert copyright status we have not verified. Where a
modern translation's status is genuinely complicated we point the
reader at the older public-domain translation and at the published
modern edition, without pretending we know what is or is not still
under copyright in every jurisdiction.

#### Sources and the historiographical layer

The source catalog (`src/data/sources.ts`) carries the editions and
archives the editorial team works from. For the primary-text layer
it includes Cicero (Oxford Classical Texts), Caesar's
*Commentarii*, Sallust's *Opera*, Livy's *Ab Urbe Condita*,
Polybius (Teubner), Plutarch (Teubner), Tacitus, Suetonius, the
two great open-access archives (Perseus, LacusCurtius), Project
Gutenberg, and the Loeb and OCT series themselves. A source is in
the catalog only if the team has actually consulted it for a live
entry.

### The historians layer

The Roman historians — Sallust, Livy, Polybius, Tacitus, Suetonius —
are first-class figure entries in their own right, not just authors-
of-the-books. The platform treats them as the principal
*interpretive* voices of the Roman tradition rather than as
chroniclers, because that is how the European reading tradition
has used them for two thousand years.

Each historian entry is written editorially around five questions:
*why did this historian matter*, *what kind of civilization did they
describe*, *what political anxieties shaped the work*, *what
historical method did they develop*, and *how did later civilizations
read them*. No date-dumping, no "born/died/wrote" structure, no
shallow biography. The pages are interpretive editorial readings of
600–800 words each.

#### Why this layer is editorially distinct

A primary text — Polybius' *Histories*, Livy's *Ab Urbe Condita* —
asks one question of the editor: *what does this work argue about
the political world it describes?* The corresponding historian's
figure entry asks a different question: *what kind of working
intellectual does this body of work imply, and what civic situation
produced the work in that form?* The two readings reinforce each
other and the graph carries both. Polybius VI is not a complete
reading without an account of Polybius the Achaean hostage; the
*Annales* are not a complete reading without an account of Tacitus
the senatorial operator of the regime he describes.

#### Civilizational memory

The historians layer is also the platform's working answer to a
question the brief made central: how a polity's memory of itself
is part of its constitutional life. Livy, Sallust and Tacitus are
the three principal ancient writers who took this question
seriously enough to organise their work around it; the platform's
themes `historical-memory` and `historical-method` carry the
inquiry through to the modern reader. The Roman conviction that
*history is a practice with civic work to do* is not the only
possible answer to the question — but it is one of the most fully
elaborated answers the European tradition received, and the
platform reads it as such.

### The civilizations & visual-hubs layer

Civilizations are the editorial frame the rest of the corpus
sits inside. Each civilization hub at `/civilizations/<slug>`
reads a polity not as chronology but as a working answer to a
small set of questions: what authority was, what law was for,
what the citizen owed, how memory was kept, what the
architecture and the army were the visible form of, how the
order ended or transmitted itself.

Civilizations are a first-class content kind alongside
philosophers, books, themes, essays etc. — `CivilizationFrontmatter`
in `src/content/types.ts`, the `/content/civilizations/` MDX
directory, the loader's `getCivilizations()`, the validator's
broken-refs walking of the four `relatedFigures` /
`relatedThemes` / `relatedBooks` / `relatedEssays` fields, and
the route templates at `/civilizations` (index) and
`/civilizations/[slug]` (hub page). Backlinks are computed
across the civilization layer too: a figure or essay that
points at a civilization surfaces as inbound on the civilization
page, and the civilization's own typed references surface as
backlinks on the figures and essays.

#### What a civilization hub does

A hub page renders:

- the typed metadata (period, civilization type) in the page
  header and the hub-overview sidebar
- a full-width hero image (an architecture or ruins photograph
  from the archive registry) directly under the header
- the editorial body MDX, structured as `## How the
  civilization read itself` / `## Political structure` /
  `## Military structure` / `## Architectural identity` /
  `## Decline and continuity` / `## Why the platform reads it`
- the four typed reference groups (figures, themes, primary
  texts, essays) in the right sidebar
- an optional gallery composition (two-column architecture
  images) when the frontmatter declares `galleryImages`
- the standard related-reading band at the bottom, computed
  from forward refs + backlinks

The page is text-first and SSR-rendered; the visual layer
supports the editorial layer without overpowering it. No
client-only interactivity is added — the hub is a reading
surface, not a dashboard.

#### Visual-archive expansion for this layer

The bust catalog and the archive-image catalog both grew in
this phase to support the civilization hubs:

- Architecture & ruins (six new entries): the Roman Forum
  (existing), Trajan's Column (existing), Pantheon ceiling
  (existing), the Colosseum, the Parthenon east front, the
  Temple of Apollo at Delphi, the Apadana relief at Persepolis,
  the Pyramids of Giza, the Karnak Hypostyle Hall. All CC0 /
  public-domain. The `ArchiveImageCulture` enum was extended
  with `egyptian` for the new Egyptian entries.
- Philosopher busts (three new entries): Aristotle (Palazzo
  Altemps), Socrates (Vatican Pio-Clementino), Plato (Vatican
  Pio-Clementino). All public-domain photographs by Marie-Lan
  Nguyen (Jastrow). Aristotle, Socrates and Plato figure pages
  now automatically render their portraits next to the text.

Full provenance for every file is recorded in the typed
registries (`src/data/busts.ts`, `src/data/archive-images.ts`)
and in the directory READMEs under `public/images/`.

#### Why civilizations are content, not data

The brief proposed a typed registry at `src/data/civilizations.ts`.
The implementation chose the MDX content-kind path instead:
civilizations live as `.mdx` files under `/content/civilizations`
with rich frontmatter, identical in pattern to the other content
kinds. The reasons:

- the body of a civilization hub is editorial prose with the
  same MDX rendering pipeline (italics, inline links, citations)
  the rest of the corpus uses
- the typed cross-reference fields participate in the existing
  graph (forward refs, backlinks, broken-refs validation) without
  custom plumbing
- the validator's published-quality, metadata, frontmatter and
  orphans checks all apply automatically
- the route templates can reuse `MdxContent`, `getRelatedAndBacklinks`,
  `resolveRefs` and the existing JSON-LD / sitemap / RSS scaffolding

The civilization layer is therefore not a parallel data system
but a first-class member of the existing content architecture.

### The Greek-world deepening layer

The umbrella `/civilizations/greece` hub is now read through
three sub-hubs that the platform treats as the working
political-intellectual differentiation of the Greek
civilization:

- `/civilizations/athens` — the polis in which the practice
  of political argument as public business reached its working
  extent. Densest single graph node in the corpus by inbound
  ref count.
- `/civilizations/sparta` — the most fully integrated ancient
  military-civic discipline. Read without romanticising and
  with the structural costs (the helot system; the demographic
  rigidity; the inability to adapt past a certain working
  scale) placed at the centre rather than at the margin.
- `/civilizations/hellenistic-world` — the three centuries
  between Alexander's death in 323 BCE and the Roman
  annexation of Egypt in 30 BCE, read as the working hinge
  between the classical polis and the Roman imperial order
  that absorbed it.

The schema does not formally distinguish *parent* civilizations
from *sub-hub* civilizations — both use the same
`CivilizationFrontmatter` — but the homepage filters the two
bands by an inline allowlist of slugs (the four parent slugs
in one band, the three Greek sub-hub slugs in another). The
inline filter is a pragmatic choice for the current scale; a
future schema extension (e.g. a `parent` field) is the natural
move when the sub-hub count grows.

#### What the Greek-world layer adds

The Greek sub-hubs carry the working political differentiation
the classical Greek world experienced: civic-argument democracy
at Athens, integrated military-civic discipline at Sparta,
imperial cosmopolitanism in the Hellenistic kingdoms. The
distinction is editorial rather than schematic — each
sub-hub is a separate civilization MDX entry, with its own
hero image, its own gallery composition, its own typed graph
into figures, books, themes and essays, and its own working
voice.

The six new themes (democracy, oligarchy, citizenship,
political-argument, naval-power, discipline-and-order) and
six new essays (Athens / Sparta / Athens-versus-Sparta /
why Greek political argument still matters / Hellenistic
transformation / Thucydides and political realism) extend
the corpus's working coverage of the Greek political and
intellectual experience. The Alexander figure entry is the
prerequisite for the Hellenistic World hub; the Azara Herm
(Louvre Ma 436) is the bust the figure renders.

#### Visual additions for this layer

The architecture and bust registries grew with the Greek
layer:

- Architecture & artifacts: Erechtheum on the Acropolis,
  Temple of Hephaestus from the Agora, Theatre of Dionysus
  (all Jebulon, CC0), bronze Corinthian helmet from NAM
  Athens (Jebulon, CC0), Alexander Mosaic from the House of
  the Faun in Pompeii (Berthold Werner, Public Domain). The
  `ArchiveImageKind` enum extended with `mosaic` and
  `artifact` to fit the helmet and the Alexander Mosaic
  cleanly.
- Bust: Azara Herm of Alexander the Great, Louvre Ma 436
  (Jastrow, Public Domain). The Aristotle, Socrates and Plato
  busts from phase 12 already cover the principal Athenian
  philosophical figures.

### Visual density and editorial atmosphere (phase 14A)

The platform's visual layer was extended in phase 14A from a
collection of standalone museum-grade images into a layered,
composable atmosphere system. Three SSR-only components hold
the system together:

- [`LayeredBust`](src/components/site/LayeredBust.tsx) — the
  hero composition. Renders a faint architecture / ruins
  photograph behind the foreground bust in the same marble
  plinth frame. The atmosphere layer is desaturated (~25%
  saturation), low-opacity (~13%), slightly blurred, with a
  radial vignette that fades the edges out into the marble
  surround. The bust sits over the top at normal
  saturation. No client JS, no parallax, no animation. The
  homepage hero now uses this — the Tusculum Caesar with
  the Roman Forum behind it.
- [`InlineArchiveFragment`](src/components/editorial/InlineArchiveFragment.tsx)
  — a single museum-grade image inserted inside an essay or
  civilization MDX body. Resolves against either the
  archive-image registry or the bust registry by slug.
  Three sizes: `small` (floats right at md+, wraps on
  narrow), `medium` (prose-column-width pull image), `wide`
  (breaks slightly out of the prose column). The component
  is registered in the MDX components map at
  [`src/content/mdx.tsx`](src/content/mdx.tsx) so any essay
  body can use `<InlineArchiveFragment slug="..." size="..."
  note="..." />`.
- [`AtmosphereStrip`](src/components/site/AtmosphereStrip.tsx)
  — a small horizontal composition of 2–4 visual fragments
  rendered at the bottom of a figure page or civilization
  hub to give the page a *sense of visual context* without
  crowding the editorial body. Each plate is a 4/3-aspect
  framed image with a short caption beneath; no links, no
  navigation overlay. Six figure pages (Caesar, Trajan,
  Pericles, Alexander, Cicero, Augustus) carry curated
  three-image strips per a small mapping at the top of the
  philosopher slug page.

#### What the system avoids

The brief was explicit about what *not* to add, and the
system honours each constraint:

- No client-side galleries, carousels or modal lightboxes.
- No parallax, no scroll-linked animation, no cinematic
  transitions.
- No AI-generated imagery under any circumstances.
- No movie-poster aesthetic; the layered hero is
  deliberately barely-perceptible at first glance.
- No reduction of whitespace; the marble surround remains
  the dominant surface.

### The Roman deepening layer (phase 15)

Phase 15 extends the Roman layer from the late Republic across the
full arc of Roman political development — **Republic → Principate →
High Empire → Late Empire** — to make civilization and statecraft the
deepest section of the platform. It is a content-and-graph phase: no
new routes or components beyond the homepage band and the per-figure
atmosphere map; everything else is MDX, typed registries and graph
wiring on the existing infrastructure.

It adds, all at `status: published` and passing every content-health
check:

- **Four phase hubs** — [`roman-republic`](content/civilizations/roman-republic.mdx),
  [`principate`](content/civilizations/principate.mdx),
  [`high-empire`](content/civilizations/high-empire.mdx) and
  [`late-empire`](content/civilizations/late-empire.mdx) — each reading
  the phase through its constitutional, political, military and
  administrative structure, its civic ideals, its central tension, and
  its relationship to the phases on either side. They are chained to
  each other and to the existing `rome` umbrella hub.
- **Eight imperial figures** — Marcus Agrippa, Tiberius, Hadrian,
  Antoninus Pius, Marcus Aurelius, Aurelian, Diocletian and
  Constantine — written as interpretive statecraft entries, not
  biographies. (Marcus Aurelius is added beyond the original brief as
  the author of the *Meditations* and the platform's central
  virtue-and-power case; Caracalla appears as context inside the
  citizenship theme rather than as a node.)
- **Seven statecraft themes** — `imperial-law`, `roman-citizenship`,
  `provincial-government`, `army-and-state`, `imperial-succession`,
  `crisis-of-the-third-century` and `state-and-religion` — each
  connecting multiple phases, figures and texts. The phase-13
  `imperial-administration` theme is reused and cross-linked rather
  than duplicated.
- **Eight primary texts** — the *Res Gestae*, *Agricola*, *Germania*,
  *Annals*, *Histories*, *The Twelve Caesars*, *Meditations* and the
  *Strategikon* — to the phase-10 standard (what it is / historical
  context / argument / reception / citation discipline), each with a
  source-catalog entry.
- **Nine interpretive essays**, mechanism-first rather than
  chronological, on how Augustus rebuilt Rome, why the Principate
  worked, the second-century apogee, imperial consolidation, the army
  as a political institution, why empires become bureaucracies, the
  third-century crisis, and the Diocletianic and Constantinian
  reinventions.

The contested-scholarship and citation rules are honoured throughout:
the *Strategikon*'s attribution to Maurice is flagged as convention;
the *Germania*'s and *Histories*' dangerous reception histories are
named; Caracalla's motive for the universal citizenship grant is given
as contested; the third-century sources (the *Historia Augusta*) are
flagged as unreliable; and the Constantine colossus image is the
securely-identified marble head, not the contested bronze.

The phase also vendors **seven new archive images** (Arch of
Constantine, Pont du Gard, Maison Carrée, the Venice Tetrarchs, the
Aurelian Walls, and Hadrian and Constantine portraits), each
licence-verified through the Wikimedia API and WebP-encoded by the
pipeline recorded in
[`scripts/vendor-roman-images.mjs`](scripts/vendor-roman-images.mjs).

### The Persian world deepening layer (phase 16)

Phase 16 raises the Persian civilization to a first-class pillar beside
the Greek and Roman worlds, read through the lens of *empire,
administration, kingship, logistics and communication*. It is a
content-and-graph phase on the existing infrastructure (the only code
changes are a homepage band and the per-figure atmosphere map), and
everything is `status: published` and passes every content-health
check.

It adds:

- **Three deepening hubs** — the [Achaemenid
  Empire](content/civilizations/achaemenid-empire.mdx) (the empire as a
  historical entity), the [Persian Imperial
  System](content/civilizations/persian-imperial-system.mdx) (the
  administrative machinery), and [Persia and the
  Mediterranean](content/civilizations/persia-and-the-mediterranean.mdx)
  (the western frontier and the Greek-source problem) — each with the
  ten required sections, sitting under the existing `persia` umbrella.
- **Four kings as interpretive statecraft entries** — Cyrus the Great
  (substantially expanded), Darius I (the architect of the system),
  Xerxes I (read from the Persian side against the Greek caricature),
  and Artaxerxes I (empire managed by diplomacy).
- **Eight Persian statecraft themes** — `satrapies`, `royal-road`,
  `imperial-logistics`, `kingship-and-legitimacy`, `empire-and-diversity`,
  `imperial-communication`, `frontiers-and-borderlands` and
  `governance-at-scale` — reaching across to the Roman and Hellenistic
  layers (`empire-and-diversity` ↔ Persia / Rome / Hellenistic World).
- **A Persian primary-text layer** — the [Cyrus
  Cylinder](content/books/cyrus-cylinder.mdx), the [Behistun
  Inscription](content/books/behistun-inscription.mdx), Herodotus's
  [Histories](content/books/herodotus-histories.mdx), the
  [Anabasis](content/books/anabasis.mdx) and Ctesias's
  [Persica](content/books/persica.mdx), with the
  [Cyropaedia](content/books/cyropaedia.mdx) expanded — each with full
  source-criticism (the Cyrus Cylinder's "human-rights charter" myth
  corrected; Behistun flagged as royal apologetic; the Persica as a
  fragmentary, unreliable tradition).
- **Nine interpretive essays**, mechanism-first, including *Persia
  through Greek eyes* — the explicit discipline for using the Greek
  sources while seeing through their frame.

It also vendors **seven verified Persian archive images** (the Gate of
All Nations, the Tomb of Cyrus, the Apadana columns, Naqsh-e Rustam,
the Behistun relief, a gold daric, and an Apadana bull-capital),
licence-verified through the Wikimedia API by
[`scripts/vendor-persian-images.mjs`](scripts/vendor-persian-images.mjs),
taking the Persian archive from 2 images to 9 and the platform total to
42. After this phase the homepage carries three civilizational bands —
Greek, Roman and Persian — as equal pillars.

### The visual archive

The bust catalog at [`src/data/busts.ts`](src/data/busts.ts) handles
portrait photography of figures the corpus carries. Everything
else — architecture, ruins, maps, manuscripts, reliefs,
inscriptions, mosaics, artefacts, coins — lives in a parallel
typed registry at
[`src/data/archive-images.ts`](src/data/archive-images.ts). The
same editorial discipline applies: full provenance, verified
licensing, no uncertain attributions, no fabricated history.

The image library is organised by visual category. Each kind has
its own subdirectory under `public/images/` and its own README
carrying human-readable provenance:

- [`public/images/busts/`](public/images/busts/) — portrait
  photography of figures
- [`public/images/architecture/`](public/images/architecture/) —
  buildings, columns, civic spaces, plus (in the typed
  registry) reliefs, mosaics, coins and artefacts. The
  `ArchiveImageKind` enum now carries the full set —
  `architecture | ruins | maps | manuscripts | relief |
  mosaic | inscription | artifact | coin` — so different
  categories can be filtered or counted without losing the
  shared marble-plinth render.
- [`public/images/ruins/`](public/images/ruins/) — partial
  structures, archaeological-site photography
- [`public/images/maps/`](public/images/maps/) — historical maps,
  reconstructions of ancient geography
- [`public/images/manuscripts/`](public/images/manuscripts/) —
  manuscript fragments, scribal pages, papyri

The render component [`src/components/site/ArchiveImage.tsx`](src/components/site/ArchiveImage.tsx)
mirrors `BustImage.tsx` and uses the same marble framing, the
same caption convention, and the same restrained
desaturation-and-contrast treatment so the photograph reads as
marble rather than as a postcard.

#### Where the visuals appear

The visual layer is deliberately sparse. The aesthetic is museum
catalogue, not blog feed.

- **Homepage** anchors on the Tusculum portrait of Julius Caesar
  (the only surviving likeness widely accepted as carved from
  life), now rendered through `LayeredBust` with a faint Roman
  Forum overview behind it as an atmosphere layer. Below the
  hero, a `FiguresStrip` surfaces a curated set of four
  portraits — Cicero, Augustus, Pericles, Trajan — as a
  museum-strip composition.
- **Figure pages** that have a registered bust in the bust
  catalog render the bust at the top of the sidebar
  automatically. Caesar, Augustus, Pericles, Cicero, Marcus
  Aurelius, Trajan, Aristotle, Socrates, Plato and Alexander
  all currently surface this way; figures without a registered
  bust render with no visual stub. Six of these figure pages
  (Caesar, Trajan, Pericles, Alexander, Cicero, Augustus) also
  carry a curated `AtmosphereStrip` below the body — a
  3-image composition that contextualises the figure's working
  world (the architecture they operated in, the coin types of
  their era, the visual record they sit inside).
- **Figure index** (`/philosophers`) — `ThinkerCard` now
  renders a portrait crop of the figure's bust above the era
  rule when a bust is registered. The catalog grid is
  intentionally uneven: figures with securely identified
  surviving portraits get the portrait; figures without do
  not. That asymmetry is the museum-catalogue choice.
- **Study landings** (the era pages) accept an optional `hero`
  slot and an optional `afterBody` slot. `/roman-republic`
  uses the hero for the Forum overview and the afterBody for
  a `FiguresStrip` carrying Caesar, Cicero, Augustus and
  Trajan as the era's principal portraits.

We do not add visuals to dense editorial pages (essays, guides,
themes) unless an image is doing real interpretive work in the
argument. The brief's caution against blog-feed crowding governs
this: the visual layer supports the editorial layer; it does not
overpower it.

#### Resolving the default bust

[`src/data/busts.ts`](src/data/busts.ts) exports `DEFAULT_BUST_SLUG`
— the slug used by `BustImage` when no specific bust is requested
— and a `getBustByFigure(figureSlug)` helper that resolves a bust
by the figure it depicts (used by the philosopher detail template,
the figure cards, and the `FiguresStrip`).

The default flipped from Marcus Aurelius to the Tusculum Caesar in
phase 12. The platform's hierarchy for picking a bust when one is
not explicitly named:

- *power / republic / statecraft contexts* — Julius Caesar
  (Tusculum)
- *imperial order contexts* — Trajan (Glyptothek)
- *Greek civic contexts* — Pericles (Vatican Pio-Clementino)
- *civic rhetoric / law contexts* — Cicero (Vatican Museums)

Marcus Aurelius remains in the catalog and on imperial-era pages
where he is contextually relevant, but he is no longer the
platform's default brand image.

#### What the image catalog will and will not contain

Inclusion criteria are deliberately strict:

- **Identification must be securely established.** No "traditionally
  identified as" portraits where modern scholarship is divided. The
  Polybius and Scipio busts considered in earlier phases were
  rejected for this reason and remain rejected.
- **Provenance must be documented.** Source URL on Wikimedia
  Commons (or an equivalent museum open-access programme),
  photographer credited where given, dimensions of the source,
  licence verified.
- **Licence must be verified.** Preferred: CC-Zero or
  public-domain. Acceptable with attribution: CC-BY, CC-BY-SA.
  Rejected: anything we cannot trace to a confirmed licence.
- **Photography must be museum-grade.** Restrained framing,
  honest lighting, no HDR-overprocessed material, no AI-generated
  imagery under any circumstances.

### Sculptural anchors: the bust catalog

The visual identity of the platform leans on museum-grade marble
portrait photography rather than on illustration or generated
imagery. The typed registry lives at
[`src/data/busts.ts`](src/data/busts.ts) and is the single point at
which a bust enters the corpus — dropping a file into
[`public/images/busts/`](public/images/busts/) is not enough.

Every entry carries: the subject (figure), the cultural origin, the
era of the work, the museum that holds the original, the source URL
to the photograph, the photographer where given, the licence, the
local image path and intrinsic dimensions, editorial alt text, a
caption, and an attribution tail. Where the bust depicts a figure
with a content entry, the entry's slug is linked via `figureSlug`,
so essays and figure pages can reference busts by identifier rather
than by file path.

The licence model is conservative. Photographs are vendored locally
under licences we have verified — CC-Zero, public-domain (typically
faithful photographic reproductions of long-out-of-copyright
sculpture), or, where unavoidable, CC-BY / CC-BY-SA with the
attribution carried both in the registry and in the in-page caption.
Full provenance for each file is also recorded in human-readable
form at
[`public/images/busts/README.md`](public/images/busts/README.md).
The same editorial discipline that governs the text applies to the
images: no fabricated provenance, no uncertain attributions, no
images whose rights status we have not verified.

The current catalog: Marcus Aurelius (Heraklion), Julius Caesar
(Tusculum portrait, Turin), Augustus (Louvre Ma 2577), Pericles
(Vatican Pio-Clementino Inv. 269), Cicero (Vatican Museums),
Trajan (Glyptothek Munich Inv. 72), Aristotle (Palazzo Altemps),
Socrates (Vatican Pio-Clementino), Plato (Vatican Pio-Clementino),
Alexander the Great (Azara Herm, Louvre Ma 436).

---

## Roadmap

The architecture is in place; the long work is the content. The next
phases, in order:

1. **Tacitus pairings.** The *Annales* and the *Historiae* deserve
   their own typed book entries with an interpretive essay
   specifically on what Tacitus's analysis adds to the question of
   how constitutional forms can outlive the substance they were
   written for. Phase 11 gave Tacitus a figure entry and the
   psychology-of-empire essay; the primary-text layer for him is
   the obvious next move.
2. **Stretch historians: Appian, Cassius Dio, Pliny the Younger,
   Josephus.** Each was a candidate during phase 11 and was deferred
   to keep the depth high on the five core entries. Appian and
   Cassius Dio carry the late-imperial reception of the Republic;
   Pliny the Younger gives the working voice of the Trajanic
   senatorial class; Josephus opens the eastern-imperial layer.
3. **Grow the guide layer.** Guides to the next layer of thinkers
   and works — *How to read Cicero*, *How to read Plutarch*, *How
   to read Tacitus*, *Understanding De Officiis*, *Understanding
   Polybius VI*. The reading-guide layer is currently thin and
   would do real work for new readers.
4. **Deepen the remaining civilization hubs.** Phase 13 broke
   the Greek hub into Athens / Sparta / Hellenistic World as
   sub-hubs; the same deepening is still needed for Persia
   (the Sasanian and post-Achaemenid continuity laid out
   properly) and Egypt (which deserves much more careful
   treatment than the platform's current Mediterranean-
   classical-trained editorial voice can give it). The Rome
   hub could similarly grow sub-hub readings (Republican Rome,
   the Principate, the high empire under the Antonines, the
   third-century crisis). The hub schema also stands ready
   for further civilizations the corpus grows into (Byzantine,
   medieval Christendom, the Islamic Caliphates, China).
5. **Extend the philosopher / book layer beyond Rome.** The
   Hellenistic schools (the Stoics, the Epicureans, the Skeptics),
   Augustine, Aquinas, and the medieval reception of the ancient
   political vocabulary. The Roman republican tradition the
   platform now carries is a starting point, not the whole story.
6. **Verified quote library.** Open the `/quotes` library with a
   small number of verified, cited passages from the published
   entries — each passing the four requirements set out on the page.
7. **Expand the bust and archive image catalogs where provenance
   allows.** Bust candidates: Cato the Younger, Pompey, Solon,
   Lycurgus. Archive image candidates: a serious historical map of
   the Mediterranean under Augustus or under Trajan; the Curia
   Julia or Maison Carrée for Republican-era architecture; a
   manuscript fragment of one of the major primary texts if a
   verifiable PD image of a securely identified manuscript can be
   sourced. The image-archive verification pipeline stays the same:
   no uncertain attributions, no fabricated provenance.
8. **Era kinds.** Now that `/roman-republic` joins `/ancient-world`,
   `/war-and-peace` and `/religion-and-wisdom`, give the study
   landings their own typed content kinds for eras, conflicts and
   traditions so they list kind-specific entries the way the
   philosopher / book / theme / essay / guide landings already do.
9. **Timeline infrastructure.** The phase 11 brief named timeline
   pages (Roman Republic, late Republic, rise of Augustus) as a
   candidate. Deferred because the SSR-first / editorial-first
   priority makes the interactive timeline harder to do well than to
   skip. The slower path is to add timeline data as typed content
   first, then render it as a deliberately static editorial timeline
   on the era pages.
10. **Editorial workflow.** Lightweight additional tooling for
    reading-time drift detection, translator-rights snapshots, and
    a content-status report (stubs vs. published) surfaced in CI.
11. **OG image generation.** Per-entry editorial OG images using
    the same marble palette, generated at build time — including a
    variant that incorporates the figure's registered bust where
    one exists.
12. **i18n foundation.** Originally Greek and Latin terms (and
    their precise transliteration) get a small typed glossary that
    the prose renderer can link.

The shape of the platform is meant to stay small; the depth is meant to
grow.

---

## License

See [LICENSE](LICENSE).
