# Homer and the Odyssey: authority cluster, book-by-book guide, and a sourced analysis of Nolan's 2026 film

Adds 75 routes across five layers: a Homer authority hub, the Odyssey as
a full pillar text with a twenty-four book guide, a character cluster
kept structurally separate from the historical figures, twelve themes,
six methodological guides, and an evidence-led analysis of Christopher
Nolan's *The Odyssey* (released 17 July 2026).

## The gate condition

The brief required stopping and reporting if the completed film could not
be verified. It was verified first. Plot, cast, credits, production
record, reception and principal departures were corroborated across
independent published accounts of the completed release — Den of Geek,
The Tab, the Hollywood Reporter round-up, Rotten Tomatoes (94% from 447
reviews), Emily Wilson in the Guardian, Myke Cole in Slate, Peter
Gainsford at Kiwi Hellenist, and an ancient historian's breakdown at
Tales of Times Forgotten.

Nothing here comes from a trailer, a promotional still, a casting
announcement or social media. The exact limits of what could be verified
are listed in `docs/homer-odyssey-cluster.md` §19.

## How the discipline is enforced, not merely promised

**A new `figure` content kind** extends the existing typed content system
rather than competing with it. It exists so Odysseus is not filed
alongside Aristotle, and it makes the editorial rule structural: every
figure must declare `historicity` on a shared evidence taxonomy and
`attestedIn`, naming which ancient source preserves which tradition. A
page cannot silently merge contradictory traditions into one invented
biography — so Homer's Clytemnestra is not blended with Aeschylus's, and
Helen's page records the tradition in which she never went to Troy as a
separate account.

**An evidence taxonomy** — DOCUMENTED / PROBABLE / DISPUTED / LITERARY /
UNKNOWN — is a typed module rendered as visible badges with a key on
every page that uses them. Linear B is documented; Hisarlik is probable;
Ahhiyawa and the Troy destruction levels are disputed with the competing
readings stated; Circe is literary; the existence of Odysseus is unknown.

**An adaptation-claims ledger** is the evidentiary spine of the film
cluster, and the rule is absolute: every departure the platform alleges
exists there first with its Homeric citations attached, and prose may not
assert one the ledger does not hold. Classification (relation to source)
and confidence (how well established the film claim is) are separate
fields. Disputed entries carry the competing reading into the prose.

**An editorial safety gate** adds twelve content-health checks over both
the MDX corpus and the prose in route files. Its purpose is not to
suppress criticism but to make criticism harder to write badly. It was
probed with deliberately bad content and fires on all of it; it caught
two real defects in this branch.

## The criticism

Firm and bounded. The review's verdict is that this is the best screen
*Odyssey* there has been and is not the *Odyssey*.

Credited: the retrospective narration preserved; the *nekyia* staged as a
summoning rather than a descent, which nearly every adaptation gets
wrong; *xenia* kept as the law of Zeus.

Criticised with citations: the removal of the test of the bed, which is
the only moment in the poem when anyone outmanoeuvres Odysseus and his
wife does it; the lotus-drugged Calypso, which removes the refusal of
immortality that is how the poem prices a homecoming; the loss of the
*Outis* trick; and the exile ending.

On casting, each decision is assessed individually on source
correspondence, character identity, genealogy, cultural location,
production intent and adaptation coherence. The appearance-based
objections do not survive contact with a poem that barely describes
anyone — Helen's beauty in the *Iliad* is an effect on old men, not a
description. What does survive is more specific: the Eumaeus change from
bought slave to blind tutor, the Virgilian Sinon presented inside a
Homeric adaptation, and the absence of Greek performers from the
principal cast of a Greek work filmed in Greece — an objection raised in
Greece that implies nothing about anyone's ancestry and is answerable by
the production.

No argument anywhere in this branch turns on a performer's ancestry, and
the gate fails the build if one is introduced.

## Verification

- `npm run typecheck` — clean
- `npm run lint` — clean
- `npm run validate:content:report` — 23 checks, 0 errors, 0 warnings
- `npm run build` — clean, 567 static pages
- Sitemap 557 URLs; all new route families present
- 5 alias redirects verified returning 308
- Canonicals verified; Movie JSON-LD carries no `aggregateRating`;
  figure pages emit no Person JSON-LD (verified 0)
- Accessibility: single h1 per page, 0 images without alt, table with
  caption and scope attributes inside its own scroll container
- No client-side JavaScript added; shared First Load JS unchanged

## Adversarial review

Applied to our own claims, and it produced three corrections: *Odyssey*
22 runs to 501 lines rather than 477; *Odyssey* 11.298–304 names Leda and
the Dioscuri and does not pair Helen with Clytemnestra; and the
Greek-performers claim was downgraded to medium confidence, because an
absence across a large cast is harder to establish than a presence.

## Reports

Full deliverables in `docs/homer-odyssey-cluster.md` — implementation,
commits, route inventory, and the Homer, book-by-book, character,
myth-versus-history, review, comparison, ledger, casting, visual archive,
graph, SEO, accessibility, performance and content-health reports, plus
unresolved scholarly disputes and exact source limitations.

## Not merged

Pushed for review as instructed. No merge.
