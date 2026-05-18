# Content architecture

All long-form content lives under `/content` as MDX. The folder structure
maps 1:1 to the content kinds in `src/content/types.ts`:

```
/content
  /philosophers   → kind: "philosopher"
  /books          → kind: "book"
  /themes         → kind: "theme"
  /quotes         → kind: "quote"
  /comparisons    → kind: "comparison"
```

## Conventions

- Each entry is a single `.mdx` file; the filename (without extension) becomes
  the URL slug and must also be declared in frontmatter.
- Every entry declares `status: "stub" | "published"`. Only `published`
  entries should be presented as authoritative; `stub` entries render with a
  visible notice that research is in progress.
- Quotations must include `workTitle` and `workCitation` (Stephanus page,
  Bekker number, book/chapter/section, etc.) so the source can be verified.
- Never fabricate quotations or sources. If a passage cannot be verified to
  a primary text or reputable scholarly edition, do not publish it.
- Use the `related` array to link entries by `{ kind, slug }` — the loader
  resolves these into typed cross-references, which power the
  internal-linking architecture (philosophers ↔ books ↔ themes ↔ quotes).

## Adding an entry

1. Create `/content/<kind>s/<slug>.mdx`.
2. Fill the frontmatter — see the type definitions for required fields.
3. Write the body as MDX. The following components are available without
   import: `QuoteBlock`, `ReadingList`, `TimelineBlock`, `RelatedReading`.
4. Cross-link via `related: [{ kind: "philosopher", slug: "..." }]`.
