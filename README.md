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

**Philosophers and historical figures** (`/philosophers`, grouped by era)

- *Archaic Greece:* Homer
- *Founders and lawgivers:* Lycurgus, Solon, Numa Pompilius, Cyrus
  the Great
- *Classical Greece:* Socrates, Plato, Aristotle, Xenophon,
  Themistocles, Pericles
- *Roman Republic:* Scipio Africanus, Gaius Marius, Lucius Cornelius
  Sulla, Pompey, Julius Caesar, Cato the Younger, Cicero
- *Roman Empire (Greek under Rome / Latin imperial):* Plutarch,
  Augustus

**Books** (`/books`)

- Homer — *Iliad*
- Plato — *Republic*
- Xenophon — *Cyropaedia*, *Memorabilia*
- Aristotle — *Nicomachean Ethics*
- Plutarch — *Parallel Lives*

**Themes** (`/themes`)

- *Character virtues:* Virtue, Courage, Self-Control, Ambition,
  Discipline, Honor, Duty
- *Political:* Justice, Leadership, Statecraft, Power, Republic,
  Empire, Law, Civic virtue, Founding
- *Historical:* War and Peace, Corruption, Decline, Military virtue,
  Education

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
(Vatican Pio-Clementino Inv. 269).

---

## Roadmap

The architecture is in place; the long work is the content. The next
phases, in order:

1. **Primary works for the Republic-era figures.** The Roman figure
   layer (Cicero, Caesar, Sallust, Tacitus, Livy, Polybius) now
   exists; the next move is to pair them with the primary works the
   tradition keeps reading — *De Officiis*, *De Re Publica*, the
   *Commentarii*, the *Catiline* and the *Annales* — as typed `book`
   entries with editorial reading guides.
2. **Second wave of essays.** Argument pieces on the questions the
   civilization layer opens — *Polybius on the mixed constitution*,
   *Tacitus and the form of an autocracy*, *Sparta and the limits of
   discipline*, *What survives a republic*. Each is a real argument
   from the primary text, not an op-ed.
3. **Grow the guide layer.** Guides to the next layer of thinkers
   and works — *How to read Aristotle*, *How to read Plutarch*, *How
   to read Cicero*, *Understanding the Nicomachean Ethics*,
   *Understanding De Officiis*.
4. **Extend the philosopher / book layer.** The Hellenistic schools
   (the Stoics, the Epicureans, the Skeptics), the historians
   (Thucydides, Herodotus, Polybius, Tacitus, Livy) as their own
   entries, the patristic and medieval inheritance (Augustine,
   Aquinas), and the primary texts that go with them.
5. **Verified quote library.** Open the `/quotes` library with a small
   number of verified, cited passages from the published entries —
   each passing the four requirements set out on the page.
6. **Expand the bust catalog.** Continue the same provenance-strict
   approach: Cicero, Cato the Younger, Scipio Africanus, Pompey,
   Lycurgus, Solon. Each entry follows the verification pipeline
   described above; no image is added whose rights and identification
   we have not checked.
7. **Era kinds.** Now that `/roman-republic` joins `/ancient-world`,
   `/war-and-peace` and `/religion-and-wisdom`, give the study
   landings their own typed content kinds for eras, conflicts and
   traditions so they list kind-specific entries the way the
   philosopher / book / theme / essay / guide landings already do.
8. **Editorial workflow.** Lightweight additional tooling for
   reading-time drift detection, translator-rights snapshots, and a
   content-status report (stubs vs. published) surfaced in CI.
9. **OG image generation.** Per-entry editorial OG images using the
   same marble palette, generated at build time — including a variant
   that incorporates the figure's registered bust where one exists.
10. **i18n foundation.** Originally Greek and Latin terms (and their
    precise transliteration) get a small typed glossary that the
    prose renderer can link.

The shape of the platform is meant to stay small; the depth is meant to
grow.

---

## License

See [LICENSE](LICENSE).
