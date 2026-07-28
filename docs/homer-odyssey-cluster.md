# Homer and the Odyssey — implementation report

Branch: `feat/homer-odyssey-and-nolan-criticism`
Base: `origin/main` @ `dad0a64`
Date: 2026-07-28

---

## 0. The gate condition, resolved

The brief instructed: *if the implementation environment cannot reliably
verify the completed film, stop and report the limitation instead of
inventing a review.*

The film was verified before any film page was written. Christopher
Nolan's *The Odyssey* was released 17 July 2026 (world premiere 6 July,
Odeon Luxe Leicester Square). Its plot, full cast, credits, production
record, reception and principal departures from Homer were corroborated
across independent published accounts of the **completed release** —
including a detailed differences analysis in Den of Geek, a second in
The Tab, the Hollywood Reporter reviews round-up, Rotten Tomatoes (94%
from 447 critic reviews), Emily Wilson's criticism reported in the
Guardian, Myke Cole in Slate, Peter Gainsford at Kiwi Hellenist, and an
ancient historian's breakdown at Tales of Times Forgotten.

No page in this branch derives a claim from a trailer, a promotional
still, a casting announcement or social media. Section 19 below lists
the specific things that could **not** be verified and were therefore
left out or explicitly marked unverified.

---

## 1. Implementation report

**Scale.** 91 files changed, +13,592 lines. Corpus 435 → 471 entries.
Build 462 → 567 static pages. Sitemap 557 URLs. Content-health checks
11 → 23. Source catalogue 36 → 50.

**Architectural decisions.** The brief specified `/figures/...` and
`/texts/...` URLs; Part 21 forbade creating a competing architecture.
Both were honoured as follows.

- A new **`figure` content kind** was added to the existing typed content
  system — same loader, same graph, same validator, same sitemap and RSS
  pipeline. It is an extension of the architecture, not a parallel one.
  It exists because Odysseus should not be filed alongside Aristotle: the
  `/philosophers` layer holds people the historical record attests, and
  `/figures` holds characters a tradition preserves. **The schema
  enforces the editorial rule rather than leaving it to prose** — every
  figure must declare `historicity` on the shared evidence taxonomy and
  `attestedIn`, naming which ancient source preserves which tradition.
- Primary texts stayed in the existing `/books` namespace, so the Odyssey
  sits beside the Iliad. `/texts/the-odyssey`, `/texts/the-odyssey/:book`,
  `/texts/the-iliad`, `/odyssey` and `/figures/homer` are **308
  redirects** to the single canonical page. The requested URLs resolve;
  no page has two addresses.
- Homer himself remains at `/philosophers/homer`. Whatever is uncertain
  about him, the tradition treats him as a poet rather than a character.

**Registry-driven, not hardcoded.** Six new typed registries carry the
material: `evidence.ts` (the taxonomy), `homer-cluster.ts`,
`odyssey-books.ts` (24 books), `films.ts`, `adaptation-claims.ts`,
`homer-nolan-comparison.ts`. No component carries its own copy of a cast
list, a link list or a book list.

---

## 2. Commit-by-commit report

| Commit | Subject |
|---|---|
| `c71237d` | `feat(content)` figure content kind + shared evidence taxonomy |
| `f51c423` | `content(homer)` Homer authority hub |
| `c9c84b6` | `content(odyssey)` the Odyssey pillar and the twenty-four book guide |
| `d6ea694` | `content(figures)` the Odyssey character cluster |
| `838c43d` | `content(themes)` twelve Odyssey themes |
| `be4304c` | `content(guides)` myth, history and the material record |
| `20fa5ed` | `feat(films)` Christopher Nolan's The Odyssey — analysis cluster |
| `e4bb609` | `content(essays)` when adaptation becomes replacement |
| `d50565c` | `feat(sources)` fourteen Homeric editions, translations and studies |
| `c2087d4` | `feat(visual)` vendor ten Homeric and Mycenaean archive images |
| `8b3fdb2` | `feat(homepage)` Homer and the Odyssey band, navigation and graph |
| `1b7236e` | `feat(health)` editorial safety and quality gate |

---

## 3. Route inventory

**Homer authority hub (5).** `/homer`, `/homer/works`,
`/homer/oral-tradition`, `/homer-and-history`, `/homeric-question`.

**Primary text (1 + 24).** `/books/odyssey`; `/books/odyssey/book-1`
through `/books/odyssey/book-24`.

**Figures (1 + 16).** `/figures`; odysseus, penelope, telemachus,
laertes, anticleia, circe, calypso, nausicaa, eumaeus, polyphemus,
athena, poseidon, menelaus, helen-of-sparta, agamemnon, clytemnestra.
(The brief's `/figures/agamenon` was a typo; the correct spelling
`agamemnon` is used.)

**Themes (12).** homecoming-and-nostos, hospitality-and-xenia,
cunning-and-metis, identity-and-recognition, memory-and-storytelling,
household-and-political-order, loyalty-in-the-odyssey,
divine-agency-in-homer, violence-and-restoration, women-in-the-odyssey,
kingship-in-the-odyssey, exile-and-return.

**Guides (6).** odyssey-myth-and-history, odyssey-and-mycenaean-greece,
was-odysseus-real, was-ithaca-homers-ithaca, trojan-war-memory-and-myth,
weapons-ships-and-palaces-in-the-odyssey.

**Film cluster (1 + 8).** `/films`; the hub, `/review`, `/homer-vs-film`,
`/what-the-film-changed`, `/characters`, `/historical-accuracy`,
`/costumes-and-material-culture`, `/casting-and-authenticity`.

**Essay (1).** `/essays/hollywood-historical-casting-and-european-antiquity`.

**Redirects (5).** As listed in §1, all verified returning 308.

**Total new routes: 75.**

---

## 4. Homer authority report

Five pages, organised around one discipline: keep the registers apart and
label them.

- **Ancient tradition** is named as such. The competing city claims are
  described as inconsistent; the *Lives* as late compilations; the
  blindness as a tradition reinforced by a character in a poem
  (Demodocus, *Od.* 8) rather than a self-portrait.
- **Modern hypothesis** is attributed. Wolf 1795, Parry, Lord 1960, the
  evolutionary model, neoanalysis, the *chorizontes* position — set out
  as live positions, none adopted.
- **Probable inference** is marked: the eighth-century dating is
  described as inferred from language, material culture and datable
  reference, not transmitted.
- **Unknown** is used where it is the answer, including on whether a poet
  named Homer existed at all.

`/homer/works` does specific corrective work: the judgement of Paris, the
death of Achilles, the extended wooden horse, Sinon and the *Telegony*
are identified as belonging to the Epic Cycle and to Virgil, not to
Homer — the distinction the film analysis later depends on.

---

## 5. Odyssey book-by-book report

24 pages from one typed registry and one template. Each carries summary,
principal characters, places, narrative function, the Greek concepts in
play, connections to other books (with working links), source notes, and
a separately-labelled interpretation section.

`summary` and `interpretation` are distinct fields by design: one reports
what the transmitted text contains, the other argues. The template never
mixes them.

Source notes carry the textual problems honestly — the three tellings of
the shroud, the suspicion over *Iliad* 10 and over the end of the
*Odyssey*, the Alexandrian note marking 23.296 as the *telos*, the
inconsistency between the framing of Book 11 and its closing procession,
and the long-standing dispute over Book 24.

---

## 6. Character cluster report

16 pages, each separating Homeric characterisation, other ancient
literary traditions, later reception, and modern adaptation.

Contradictory traditions are **set out, not merged**:

- Penelope's Homeric portrait is not blended with the later strand making
  her the mother of Pan.
- Homer's Clytemnestra — who does not strike the blow, has no Iphigenia
  motive, and never speaks — is kept apart from Aeschylus's.
- Helen's page records the Stesichorus/Herodotus/Euripides tradition in
  which she never went to Troy, as an alternative account of the central
  event rather than a variant detail.
- The pastoral Polyphemus of Theocritus and Ovid is noted as sharing a
  name with the Odyssey's Cyclops and nothing else.
- The Sisyphus-paternity tradition on Anticleia's page is recorded and
  not harmonised.

Athena and Poseidon are the only figures marked `documented`, and both
pages state exactly why: the **cult** is a historical fact attested by
temples, dedications and Linear B offering records; the **stories** are
literature. The gate enforces that only divine figures may claim
documented historicity.

---

## 7. Myth-versus-history report

The methodological rule, stated on `/homer-and-history` and inherited by
every page: **never treat Homer as a transparent description of one
historical era.**

The evidence taxonomy — DOCUMENTED / PROBABLE / DISPUTED / LITERARY /
UNKNOWN — is a typed module rendered as visible badges, with a key on
every page that uses them. Colour is never the only signal; the label
always states the level.

Representative assignments:

| Claim | Level |
|---|---|
| A Greek-speaking palace civilisation existed in the Late Bronze Age | DOCUMENTED |
| Homeric names occur in Linear B as ordinary people's names | DOCUMENTED |
| The Iliad describes an obsolete boar's-tusk helmet matching excavated examples | DOCUMENTED |
| Hisarlik is the site the Greeks knew as Ilios | PROBABLE |
| Ahhiyawa / Wilusa = Achaeans / Ilios | DISPUTED |
| A destruction level corresponds to the remembered war | DISPUTED |
| Which society the poem's social world reflects | DISPUTED |
| The Paliki relocation hypothesis for Ithaca | DISPUTED |
| Circe, the bag of winds, Scylla, the descent to the dead | LITERARY |
| Whether any individual behind Odysseus existed | UNKNOWN |

`was-odysseus-real` is deliberately built by specifying what would count
as evidence — a contemporary document, an inscription, a burial — showing
none exists, and distinguishing that from the Troy question where
evidence exists and is contested.

---

## 8. Nolan film review report

Title used: *The Odyssey on screen: what Christopher Nolan preserved,
changed and erased* — the brief's alternative, chosen because the
analysis supports it. The first suggested title ("the Loss of Homer")
prejudges a verdict the evidence does not support.

All twenty required sections present. Verdict: **the best screen Odyssey
there has been, and not the Odyssey.**

Credited as achievements: the retrospective narration preserved
(relocated to Calypso); the *nekyia* staged as a summoning with the dead
rising to the trench rather than as a descent, which nearly every
adaptation gets wrong; *xenia* rendered as the law of Zeus, keeping the
poem's actual moral architecture.

Criticised with evidence: the removal of the bed test; the lotus-drugged
Calypso, which removes the refusal of immortality that is how the poem
prices a homecoming; the loss of the *Outis* trick; the removal of the
sexual relationships; and the exile ending.

The review does not treat every deviation as a fault. Changes are
classified as necessary compression, reasonable interpretation,
defensible modernisation, unsupported invention, thematic distortion or
source contradiction, and §17 is a list of changes that work.

---

## 9. Homer-versus-film comparison report

22 elements, all required ones covered, with columns: Homeric source,
adaptation, type of change, probable reason, editorial assessment,
evidence level. Rendered as a real `<table>` with caption and scope
attributes above the large breakpoint inside its own `overflow-x-auto`
container, and as a labelled stacked layout below it — the page body
never scrolls horizontally.

Distribution: 1 preserved (the underworld), 2 necessary compression,
5 reasonable interpretation, 4 defensible modernisation, 3 unsupported
invention, 4 thematic distortion, 3 source contradiction.

---

## 10. Verified inaccuracies ledger

15 entries in `src/data/adaptation-claims.ts`. **The rule is absolute:
every accusation on the platform exists here first with its evidence
attached; prose may summarise and argue but may not assert a departure
that is not in the ledger.** The gate enforces the registry side of this.

Classification (relation to source) and confidence (how well established
the film claim is) are independent fields. 9 entries are high confidence,
6 medium, 0 low. Six carry a `competingReading`, which is then carried
into the prose.

Deliberately excluded: rumours, social-media allegations, anything
requiring knowledge of a performer's ancestry, and one plausible
allegation — a reported single scene in Modern Greek, raised by a
qualified source — which could not be independently verified and is
noted in the review as unverified rather than entered.

---

## 11. Casting and cultural-authenticity report

The page assesses each decision individually on six grounds: source
correspondence, character identity, genealogy, cultural location,
production intent, adaptation coherence.

**Findings.**

- For Helen and for Athena the question as usually posed does not arise:
  Homer supplies no physical description to contradict. Helen's beauty in
  the *Iliad* is an effect on old men, not a description.
- The Odysseus descriptions that do exist (*Od.* 16.172–176, 6.230–231,
  23.157–158) use contested colour vocabulary, describe hair texture by
  comparison to a hyacinth, and occur at moments of divine
  transformation. They do not settle a modern casting argument in either
  direction, and the page says so.
- The Eumaeus change (blind, and a tutor rather than a bought slave) is a
  real source contradiction concerning social status, not appearance.
- Sinon is a provenance problem: a Virgilian character presented within
  a Homeric adaptation.
- The **absence of Greek performers from the principal cast** of a Greek
  work filmed in Greece is the objection with an actual argument behind
  it. It was raised in Greece, implies nothing about anyone's ancestry or
  capability, and is answerable by the production.

The page states its limits at the top and observes them: no argument that
any performer is incapable of a role; no claims about anyone's ancestry;
no generalisations about groups of performers; no vocabulary of
replacement, invasion or contamination. It also records explicitly that a
performer may give a strong performance in a role whose casting logic is
textually disputable.

---

## 12. Visual archive and provenance report

10 images vendored through the existing pipeline: licence, author and
dimensions verified via the Wikimedia Commons API before download,
re-encoded to WebP (q80, ≤1600px), registered in `archive-images.ts` and
mirrored into per-directory provenance READMEs.

Licences: 2 CC0, 2 CC BY, 5 CC BY-SA, 1 public domain — verified per
file, none assumed. Every entry carries creator, title, approximate date,
holding institution, source URL, licence, local filename, alt text,
caption and a contextual note. All 10 are wired into pages.

No AI-generated pseudo-antiquity, no aggregator sources, no unattributed
images. **No film imagery** — we hold no licence for production stills
and do not assert uncleared fair use.

Three notes do real editorial work: the Homer bust is captioned as an
imagined portrait; the Siren Vase note records that the bird bodies are
the painters' addition and that Homer makes the Sirens two and describes
them not at all; and the Mycenae mask is captioned by what it is, with
the note stating that "Mask of Agamemnon" is Schliemann's label, not an
identification, and that the object predates any traditional dating of
the war by roughly three centuries.

---

## 13. Internal graph report

Content-health `broken-refs`: **0**. `orphans`: **0**.

All the bidirectional relationships the brief specified are present via
the typed graph (forward refs plus computed backlinks): Homer ↔ Odyssey ↔
Iliad, Odysseus ↔ Athena / Penelope / Telemachus, Odyssey ↔ Ithaca /
Mycenaean Greece / Greek religion / kingship / hospitality, Odyssey ↔ the
Nolan film, and the film ↔ adaptation ethics / historical accuracy / the
ancient world on screen.

The film cluster is not isolated: every film page links to the poem, the
book-by-book guide, the figures, the Homer hub and the essay through the
shared shell, and the Odyssey pillar and homepage band link into the film
analysis.

---

## 14. SEO and indexation report

SSR/SSG throughout — 567 static pages, no dynamic rendering. Canonical
URLs verified on all new route families. Metadata, OpenGraph and Twitter
cards via the existing `buildMetadata`. Sitemap 557 URLs including all 24
book divisions, 16 figures, 8 film pages and 5 Homer pages. RSS includes
the 16 figures.

JSON-LD: BreadcrumbList and Article on every new page; Book on the
Odyssey; Movie on the film hub. **No `aggregateRating` anywhere** — we
operate no rating scale, and republishing an aggregator's score as our
own structured data would be an unsupported claim. Reception figures are
attributed in prose to the aggregator that published them.

**Figure pages deliberately emit no Person JSON-LD** (verified: 0
occurrences). `schema.org/Person` describes people; asserting it for
characters would encode the myth-as-history conflation in
machine-readable form.

Keyword families are addressed through page structure rather than
clickbait: no inflammatory titles, none targeting racial hostility.

---

## 15. Accessibility report

- Single `<h1>` per page, verified across route families.
- All images carry descriptive alt text; 0 images without `alt`.
- The comparison table uses `<caption>`, `scope="col"` and `scope="row"`;
  the only fixed-width element is inside `overflow-x-auto`.
- Evidence badges never rely on colour alone — the label always states
  the level, with an `sr-only` "Evidence level:" prefix.
- Book navigation grid uses `aria-current="page"`; the mobile nav retains
  its existing 44/48px touch targets.

**Not done:** no screen-reader or contrast audit with real assistive
technology, and no visual regression testing (see §19).

---

## 16. Performance report

Build succeeds; 567 pages prerendered. First Load JS unchanged at ~102 kB
shared — the cluster adds **no client-side JavaScript**. All new pages are
server components; page-specific payloads are 235–261 B. Images are
locally vendored WebP served through `next/image` with explicit
dimensions (CLS-stable).

---

## 17. Content-health report

23 checks, **0 errors, 0 warnings**. 471 entries (470 published, 1 stub),
50 sources. Full output in `reports/content-health.md`.

`npm run typecheck` — clean. `npm run lint` — clean. `npm run build` —
clean. `npm run validate:content:report` — clean.

The gate was probed with deliberately bad content and fired on
group generalisation, racial retrojection, three myth-as-history
patterns, unsourced accuracy language and Homer conflation. It caught two
real defects in this branch: five guides using evidence labels without
the key that explains them, and a figure claiming documented historicity.

---

## 18. Risks and unresolved scholarly disputes

Recorded on-page as disputed rather than resolved:

1. The Homeric Question — authorship, unity, and the route to a fixed
   text. Four live positions set out; none adopted.
2. The historicity of a "Peisistratean recension".
3. Whether Book 24, and the material after 23.296, is original.
4. Whether Penelope recognises Odysseus before Book 23 — flagged as an
   unresolved question that adaptations are forced to decide.
5. Which society, if any, the poems' social world reflects (Finley and
   after).
6. The Ahhiyawa / Wilusa equations and the Troy destruction levels.
7. The location of Homer's Ithaca, including the unproven Paliki
   hypothesis.
8. What the bow-and-axes feat physically involves.
9. The causes of the Late Bronze Age collapse and the identity of the
   Sea Peoples — which is also where we judge the film to make its one
   genuine historical claim.

**Editorial risk accepted:** the casting page will disappoint readers who
want the appearance-based argument endorsed. It is not endorsed because
it does not survive contact with a poem that barely describes anyone. The
criticisms that do survive are stated plainly and are more specific.

---

## 19. Exact source limitations

Stated so a reviewer can weigh the analysis correctly.

1. **The film was assessed from published accounts of the completed
   release, not from a viewing.** Every film claim is second-hand and the
   ledger's `confidence` field records how well corroborated each is.
2. **Six supporting-cast entries rest on a single published account** and
   are marked "(single source)" on the page.
3. **Runtime figures conflict** (173 minutes vs. 2 h 52 m). Recorded as a
   discrepancy rather than resolved.
4. **Budget and box-office figures are trade-press reports**, not
   disclosures, and are labelled as reported.
5. **Absence claims are weaker than presence claims.** Only omissions
   directly attested by published accounts are recorded; the Greek-cast
   claim was downgraded to medium confidence for this reason.
6. **One allegation was excluded for lack of verification**: a reported
   single scene in Modern Greek, raised by a qualified source, noted in
   the review as unverified and kept out of the ledger.
7. **Two Variety pieces and one ArtNews piece were paywalled or
   truncated** and could not be read in full; their content is used only
   where corroborated elsewhere.
8. **Scholar quotations reached us through secondary reporting**, and are
   attributed as such ("was quoted as saying") rather than as direct
   interviews.
9. **No screenshot or browser-based QA** was performed; layout
   verification was done against built HTML (heading structure, alt
   attributes, table semantics, overflow containers), not visually.
10. **No production statement on casting was located**, so the casting
    page records the objection as unanswered rather than as refused.

---

## 20. PR title and body

**Title:**
`Homer and the Odyssey: authority cluster, book-by-book guide, and a sourced analysis of Nolan's 2026 film`

**Body:** see `docs/PR-BODY.md`.

---

## Standing invitation to challenge

Every claim in this cluster is anchored to something checkable — a book
and line, an excavated object, a named publication. If a claim cannot
survive that check it should be removed, and the ledger is structured to
make removal easy: delete the entry and the prose that depends on it
fails review, because prose is not permitted to assert a departure the
ledger does not hold.
