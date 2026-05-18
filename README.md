# Virtue & Power

An intellectual platform exploring classical philosophy, virtue, power,
leadership, statecraft, religion and the ancient world — grounded in primary
sources and the long arc of historical thought.

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
│   └── comparisons/
├── src/
│   ├── app/                          # Next.js App Router (RSC)
│   │   ├── layout.tsx                # Root layout, fonts, header/footer
│   │   ├── page.tsx                  # Homepage
│   │   ├── about/
│   │   ├── editorial-policy/         # The standards behind every entry
│   │   ├── sources/                  # The catalog (rendered from src/data/sources.ts)
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
│   │   └── seo/                      # JsonLd
│   ├── content/                      # Typed loader + MDX renderer
│   │   ├── types.ts                  # Frontmatter schemas
│   │   ├── loader.ts                 # File-system loader + ref resolver
│   │   ├── mdx.tsx                   # MDX renderer with built-in components
│   │   └── README.md                 # Authoring guide
│   ├── data/                         # Source governance
│   │   └── sources.ts                # Typed catalog of editions & references
│   ├── lib/
│   │   ├── site.ts                   # Site config, navigation
│   │   ├── seo.ts                    # buildMetadata, JSON-LD helpers
│   │   ├── cn.ts
│   │   └── content-health/           # Editorial QA module
│   │       ├── types.ts              # Issue · Severity · IssueCode · ValidationReport
│   │       ├── checks.ts             # 10 typed validators
│   │       └── report.ts             # Console + markdown formatters
│   └── styles/
│       └── globals.css
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

All long-form content lives under `/content` as MDX. Each kind has a typed
frontmatter schema (see [`src/content/types.ts`](src/content/types.ts)):

- `philosopher` — era, lifespan, tradition, primary works, related entries
- `book` — author, period, original language, composition date, themes
- `theme` — domain, key thinkers, key texts
- `quote` — attribution, work title, **precise citation**, translator
- `comparison` — subjects (typed `{ kind, slug }` refs), domain

Cross-references are typed `{ kind, slug }` tuples that the loader resolves
into the cards rendered by `RelatedReading`, `ThinkerCard`, etc. This is the
mechanism behind the internal-linking architecture: Plato → Republic →
Justice → Virtue → Aristotle → Leadership.

**Backlinks.** The loader walks every entry's typed cross-reference fields
(`related`, `primaryWorks`, `primaryThemes`, `keyThinkers`, `keyTexts`,
`subjects`) to compute the in-edges of any given entry. Each detail page
merges forward refs with de-duplicated backlinks, so the corpus reads
correctly in either direction — if the Virtue theme points at Aristotle,
the Aristotle entry surfaces the Virtue theme even before Aristotle's own
frontmatter has been updated.

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

---

## Development

```bash
npm install
npm run dev                          # http://localhost:3000
npm run typecheck
npm run lint
npm run validate:content             # editorial QA (10 checks)
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

**Philosophers** (`/philosophers`, grouped by era)

- *Archaic Greece:* Homer
- *Classical Greece:* Socrates, Plato, Aristotle, Xenophon
- *Roman Empire (Greek under Rome):* Plutarch

**Books** (`/books`)

- Homer — *Iliad*
- Plato — *Republic*
- Xenophon — *Cyropaedia*, *Memorabilia*
- Aristotle — *Nicomachean Ethics*
- Plutarch — *Parallel Lives*

**Themes** (`/themes`)

- *Character virtues:* Virtue, Courage, Self-Control, Ambition
- *Political:* Justice, Leadership, Statecraft, Power
- *Historical:* War and Peace

**Comparisons** (`/comparisons`)

- Plato and Aristotle
- Plato and Xenophon
- Socrates and the Sophists
- Iliad and Odyssey

The catalog grows slowly. A figure or work is added only after a human
editor has read the primary text and the surrounding scholarship.

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
graph: philosophers → books, books → themes, themes → philosophers,
comparisons → multiple subjects. The loader's backlink computation
surfaces in-edges automatically, so an entry that another entry points
at will see the inbound link in its Related Reading without having to
duplicate the reference in its own frontmatter.

In practice this means we can add forward references opportunistically
(when an entry's body actually mentions another) without losing the
relationship — Aristotle's entry doesn't need to list every theme that
references him; those themes still surface via backlinks.

The denser the corpus, the richer the graph; the richer the graph, the
more useful the platform becomes as a reading aid.

---

## Roadmap

The architecture is in place; the long work is the content. The next
phases, in order:

1. **Extend the philosopher / book layer.** The Hellenistic schools
   (the Stoics, the Epicureans, the Skeptics), Cicero and the Roman
   moralists, the historians (Thucydides, Polybius, Tacitus), the
   patristic and medieval inheritance (Augustine, Aquinas), and the
   primary texts that go with them.
2. **Verified quote library.** Open the `/quotes` library with a small
   number of verified, cited passages from the published entries —
   each passing the four requirements set out on the page.
3. **Source catalog growth.** Add to `src/data/sources.ts` as the
   editorial workload requires new editions; never add a source there
   that has not actually been consulted for a live entry.
4. **Era kinds.** Once the entry density justifies it, give
   `/ancient-world`, `/war-and-peace` and `/religion-and-wisdom` their
   own typed content kinds for eras, conflicts and traditions, so
   those study landings list the kind-specific entries the way the
   philosopher / book / theme landings already do.
5. **Editorial workflow.** Lightweight tooling for slug uniqueness,
   broken cross-reference detection, source-id integrity, and a
   content-status report (stubs vs. published) surfaced in CI.
6. **OG image generation.** Per-entry editorial OG images using the
   same serif/parchment palette, generated at build time.
7. **i18n foundation.** Originally Greek and Latin terms (and their
   precise transliteration) get a small typed glossary that the prose
   renderer can link.

The shape of the platform is meant to stay small; the depth is meant to
grow.

---

## License

See [LICENSE](LICENSE).
