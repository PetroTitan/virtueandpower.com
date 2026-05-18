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
│   │   │   └── StubNotice
│   │   ├── site/                     # Hero, NewsletterCta, StudyLanding
│   │   └── seo/                      # JsonLd
│   ├── content/                      # Typed loader + MDX renderer
│   │   ├── types.ts                  # Frontmatter schemas
│   │   ├── loader.ts                 # File-system loader + ref resolver
│   │   ├── mdx.tsx                   # MDX renderer with built-in components
│   │   └── README.md                 # Authoring guide
│   ├── lib/
│   │   ├── site.ts                   # Site config, navigation
│   │   ├── seo.ts                    # buildMetadata, JSON-LD helpers
│   │   └── cn.ts
│   └── styles/
│       └── globals.css
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
npm run dev        # http://localhost:3000
npm run typecheck
npm run lint
npm run build
```

### Adding content

1. Create `/content/<kind>s/<slug>.mdx` (one of `philosophers`, `books`,
   `themes`, `quotes`, `comparisons`).
2. Fill the frontmatter — see [`src/content/types.ts`](src/content/types.ts)
   for required fields and [`src/content/README.md`](src/content/README.md)
   for the authoring guide.
3. Write the body as MDX. `QuoteBlock`, `ReadingList`, `TimelineBlock` and
   `RelatedReading` are available without imports.
4. Cross-link with `related: [{ kind: "philosopher", slug: "..." }]`.

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

## Roadmap

The architecture is in place; the long work is the content. The next
phases, in order:

1. **First published entries.** Replace the placeholder stubs with full,
   sourced entries — starting with the philosophers and primary texts
   already present (Plato, Aristotle, *Republic*, *Nicomachean Ethics*),
   then the Virtue and Justice themes.
2. **Verified quote library.** Open the `/quotes` library with a small
   number of verified, cited passages from those first entries.
3. **Era pages.** Flesh out `/ancient-world`, `/war-and-peace` and
   `/religion-and-wisdom` with their own typed content kinds (eras,
   conflicts, traditions) once the entry density justifies it.
4. **Editorial workflow.** Lightweight tooling for slug uniqueness, broken
   cross-reference detection, and a content-status report (stubs vs.
   published) surfaced in CI.
5. **OG image generation.** Per-entry editorial OG images using the same
   serif/parchment palette, generated at build time.
6. **i18n foundation.** Originally Greek and Latin terms (and their
   precise transliteration) get a small typed glossary that the prose
   renderer can link.

The shape of the platform is meant to stay small; the depth is meant to
grow.

---

## License

See [LICENSE](LICENSE).
