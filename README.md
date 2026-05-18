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
│   │   ├── layout/                   # Container, SiteHeader, SiteFooter
│   │   ├── editorial/                # The editorial component library
│   │   │   ├── QuoteBlock
│   │   │   ├── ThinkerCard
│   │   │   ├── ThemeCard
│   │   │   ├── BookCard
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
- Server-rendered throughout — no client JS for content; the only interactive
  element is the menu disclosure on mobile, which uses a native `<details>`
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

Every entry declares `status: "stub" | "published"`. Stubs render with a
visible editorial notice; only `published` entries should be presented as
authoritative.

### SEO

- Per-page `Metadata` via `buildMetadata()` (canonical, OG, Twitter card,
  Article `modifiedTime`)
- Site-wide `WebSite` and `Organization` JSON-LD on the homepage
- Per-entry `BreadcrumbList` and `Article` JSON-LD on every detail and
  section page
- `robots.txt` and `sitemap.xml` via Next.js `MetadataRoute` — the sitemap
  enumerates every static section plus every MDX entry
- `rss.xml` 2.0 feed of all entries, sorted by `updated`
- All important content is in the server-rendered HTML

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

## License

See [LICENSE](LICENSE).
