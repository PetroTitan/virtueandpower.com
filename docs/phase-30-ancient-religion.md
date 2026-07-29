# Phase 30 — Ancient Religion

Branch: `feat/ancient-religion`
Stack position: sixth and last (warfare → cities → archaeology-museums → architecture → institutions → **religion**)
Status: built, validated. **Not merged.**

---

## 1. The problem this phase actually had

Every earlier phase in this sequence extended the platform into ground it
did not already cover. This one did not have that luxury. Religion was
already published here, at length, in four different layers:

- `/themes/state-and-religion` argues Roman religion end to end, from
  Republican augurs to Constantine.
- `/themes/sacred-kingship-in-egypt` argues the pharaoh as cosmic keystone
  and the doctrine of ma'at.
- `/themes/afterlife-and-order` argues the weighing of the heart.
- `/themes/divine-agency-in-homer` argues double motivation.
- `/architecture/temple` owns the building.
- `/cities/delphi` owns the Pythia and the consultation procedure.
- **All fourteen city pages carry a "Cult and sanctuaries" section.**
- And `/religion-and-wisdom` already existed as a standing top-level
  section, nav-registered and sitemapped.

So the phase began with a survey rather than a plan: six parallel readers
over the whole corpus, then a synthesis, then verification of every
load-bearing claim by hand. It found **33 subjects already owned**, **80
heading strings already in use**, and **30 subjects genuinely uncovered**.

The uncovered ones were verified individually — *Eleusinian*, *incubation*,
*miasma*, *haruspicy*, *Mithraism*, *Cybele*, *asebeia*, *lararium*,
*Avesta*, *defixio* all returned zero hits across `content/` and
`src/data/`.

---

## 2. What was decided, and why

**Namespace.** Not `/religion`. `/religion-and-wisdom` already claims that
ground for the wisdom traditions — Hebrew scripture, the philosophical
schools, the New Testament, the patristic inheritance. Shipping `/religion`
beside it would have put two hubs in the primary nav competing for one
query. This layer is `/ancient-religion`, scoped visibly to pre-Christian
cult and rite, and the two sections link to each other.

**Scope.** Practice, not doctrine and not politics:

> The civilizations and themes layers cover religion as political order
> and as thought. The architecture layer covers the buildings. The cities
> layer covers the sanctuaries of named places. This layer covers the
> rite: what was done, by whom, with what, and how we know.

Nothing on the platform previously described how an animal was killed at
an altar and what happened to the meat, who held a Greek priesthood and
how they got it, what a curse tablet is, or what a lararium was for.
`/architecture/temple` says in its first paragraph that "the sacrifice —
the central act of Greek religion — happened at an altar in the open air"
and then correctly says nothing more, because it is a page about
buildings. This layer starts exactly there.

---

## 3. What was built

**30 practices** at `/ancient-religion/[slug]`, plus the index. 31 new
routes. Build **745 → 776** pages; sitemap **743 → 774** URLs.

| Tier | Entries |
|---|---|
| Reading ancient religion | what-ancient-religion-was-not, purification-and-pollution, impiety-and-asebeia |
| Rite and practice | animal-sacrifice, votive-dedication, asylum-and-supplication, curse-tablets-and-binding, healing-cult-and-incubation, womens-religious-office |
| Greek cult | greek-priesthood, the-sacred-calendar, mystery-initiation, hero-cult, sanctuary-treasuries |
| Divination | divination-and-seers, roman-augury, haruspicy |
| Roman religion | the-vow-and-the-contract, the-triumph-as-rite, roman-domestic-cult, roman-death-ritual, foreign-cults-at-rome, mithraism, the-isis-cult |
| Egyptian cult | egyptian-temple-economy, mummification, animal-cults-and-votive-mummies |
| Near Eastern cult | zoroastrian-practice, mesopotamian-temple-household, serapis |

---

## 4. The schema, and the failure mode it prevents

Each earlier phase had one characteristic failure and a type shaped to
stop it: Phase 26 made a bare troop number impossible to store, Phase 27
did the same for city populations, Phase 27.5 made a provenance record
admit what it was missing.

The failure here is subtler and far commoner in popular writing: a ritual
is described, an ancient story explaining it is told alongside, and the
story silently becomes the reason the ritual existed. Hesiod's account of
Prometheus dividing the ox at Mekone explains why the gods get the bones.
It does not date, cause, or evidence Greek sacrificial practice — burnt
bone had been accumulating on the Lykaion altar for centuries before the
poem was composed.

Three fields keep it apart, and the validator will not let them blur:

- **`whatIsAttested`** — what the material and documentary record shows.
- **`aitia`** — stories the tradition told. The type has no date, no
  place, and no evidence level it could set to `documented`. Each carries
  the author who tells it, roughly when, and why it is an explanation
  offered rather than a cause. The template renders them under a heading
  that says they are stories.
- **`silences`** — what the sources do not record. Required, minimum two.
  Ancient religion is full of deliberate silence: the mystery ban worked,
  household liturgy was never written down, the Etruscan discipline
  survives only in Roman summary. A page that never says what it cannot
  say has implicitly claimed to say everything.

`evidenceBase` carries the same discipline one level down: every class of
evidence must state what it cannot show. An inventory inscription is
superb evidence for what stood in a treasury on one day and no evidence
at all for what anyone believed.

---

## 5. A gap in the platform that this phase closed

`gate:myth-as-history` existed before this phase and consisted of five
patterns — every one specific to Troy and Odysseus. Nothing anywhere in
`src/lib/content-health` matched the words *god*, *cult*, *oracle*,
*sacrifice*, *priest*, *ritual*, *initiation* or *divination*.

**"The oracle told him to attack, and he won" passed the build on any page
on the site.**

That was defensible while the corpus was a Homer cluster. It is not
defensible now, so the nine cult patterns added here run over the **whole
corpus**, not this registry alone. They are narrow by design — each
targets a construction wrong regardless of context, not any sentence
mentioning a god.

Seven are defused by naming the source, because *"Livy tells the story
that Numa received his laws from Egeria"* is exactly the sentence we want
written; a gate that blocked it would teach the wrong lesson. Two are
unconditional, because no attribution repairs them: a claim to know what
the mystery ban concealed, and a claim that cult evidence bears on whether
a god acted.

The patterns are unit-tested against the real gate file: nine sentences
that must fire, seven that must not, and two that must not be bypassable
by attribution. They fire on nothing in the existing corpus, which is also
the evidence that they are not over-broad.

Also fixed: `EVIDENCE_MARKERS` in `gate:accuracy-language` omitted
`mythological` — the one evidence level this phase uses most, whose
absence would have errored spuriously on correctly-labelled pages.

Validator **39 → 43 checks**.

---

## 6. How the content was written

This is the part worth recording, because it determines what the pages are
worth.

No prose was written from recall. Each subject went through three passes:

1. **Evidence brief.** A grounded research pass per subject, with every
   citation carrying an explicit confidence, an instruction to write the
   literal string `unconfirmed` rather than guess a locus, and a required
   `uncertainClaims` field for anything the researcher wanted to say but
   could not ground.
2. **Adversarial fact-check.** An independent pass instructed to refute,
   not approve. It returned **91 must-fix findings** and failed **four
   briefs against their own stated hazard** — in three of those the brief's
   self-audit claimed a mitigation that was not actually in the prose,
   which is the more dangerous failure because it is the field a
   downstream editor trusts.
3. **Correction.** Every finding applied, with cross-field propagation
   checked.

Errors the audit caught, all verified:

| Claim | Correction |
|---|---|
| Jerome's second Mithraic grade is *nymphus* | It is *cryphius*; *nymphus* is from Santa Prisca, not Jerome |
| The Piacenza liver's ~40 inscribed cells are on the convex face | They are on the flat visceral face; the convex carries two names |
| The Isia ran 28–31 October | 28 October – 1 November |
| Livy narrates the Claudia Quinta miracle | Ovid does; Livy names her and alludes to her reputation |
| The Menelaion aryballos names Menelaos | It names Helen, in a partly restored text |
| The Sacred Way to Eleusis is ~30 km | ~21–22 km |
| Herodotus 2.53: Homer and Hesiod lived "not long before" | "not more than four hundred years before" |
| The Epidaurian *iamata* are first- and third-person | Third-person only, composed by the sanctuary |
| Ibis mitogenomes from five burial sites | 14 mitogenomes from three catacombs |
| Cato assigns hearth ritual to the *vilica* | Only under the master's or mistress's authority — the clause inverts the inference |

---

## 6a. A fourth pass, on the published pages

The three passes above operated on the briefs. A fourth read the **rendered
HTML**, because a brief being right does not make a page right — the
records were built by transforming briefs into a typed registry, and the
transform could damage them.

It could, and it did. **The worst defect in this phase was mine, not the
researchers'.** A regex I wrote to turn brief-phrased claims ("That the
dedicant recorded…") into sentences already captured the text *after*
"That " and then stripped five more characters from it, so 69 of 140 key
points were published as "Edicant recorded the discharge of a vow." The
gate did not catch it — no check asserts that a claim is well-formed
English — and neither did I. The adversarial read of the published HTML
did, on the first page it opened. The registry was regenerated from the
corrected briefs with the strip done properly at generation time, and all
claims verify intact.

Beyond that, the pass found and fixed:

**Fabricated or misattributed loci** — Cicero's Tages story is *De
divinatione* 2.50–51, inside the sceptical refutation, not book 1; the
*spectio/nuntiatio* distinction is *Philippics* 2.81, not *De legibus*;
Petronius's Trimalchio passage does not have three silver Lares; the
Zoroastrian manuscript K7a has no 1258 reading; the Erchia calendar cannot
have an IG II² number, because IG II² was published decades before the
stone was inventoried; Diodorus places the Isis self-declaration at Nysa,
not Memphis; the Turranius edict orders registration, it does not cap
numbers.

**Boundary violations** — three pages had drifted into deferred ground.
`divination-and-seers` had two Contested points about the Pythia's
mechanics and a paragraph of Delphic consultation procedure, all of which
`/cities/delphi` owns; `zoroastrian-practice` had re-argued Achaemenid
royal theology, which `/books/behistun-inscription` owns; `impiety-and-
asebeia` had a sentence on the imperial cult. All removed, not softened.

**Myth narrated as record** — `hero-cult` told the Orestes-bones story in
"What is attested" as though Delphi directed and Sparta obeyed. The page
already carried it correctly as an aition; the narration was removed from
the attested section.

**Self-contradiction between sections** — several pages asserted in "What
is attested" what they denied in "What the sources do not record". These
were fixed on the overstating side, since the hedge was generally right.

**An evidence-level error of mine.** I had mapped the briefs' `confidence`
field straight onto the evidence taxonomy, which conflates two different
things: `confidence` is how sure a researcher was of their own report,
whereas `documented` on this platform means "supported by a named primary
text or by excavated material evidence" — a statement about the class of
evidence. Named, published inscriptions were consequently labelled
*Probable*. The generator now promotes a medium-confidence item that cites
a specific document by siglum, and never promotes a low-confidence one,
where the doubt is about the reading itself.

**One correction outside this phase.** Both my deferral text and the
Phase 28 `/architecture/triumphal-arch` record called Josephus an
eyewitness to the triumph of 71 CE. He was in Rome for it and does not say
he watched it. I corrected the architecture record too: a known-wrong
claim standing is worse than a scope boundary, which is the same call made
on the museum attributions in Phase 27.5.

### What this pass did not cover

Six of the thirty pages were never read, because agents in this pass
failed — two on API errors and two on a monthly spend limit.
**`animal-sacrifice`, `votive-dedication`, `asylum-and-supplication`,
`curse-tablets-and-binding`, `healing-cult-and-incubation` and
`womens-religious-office` have had the first three passes but not the
fourth.** They are not known to be wrong; they are less checked than the
other twenty-four, and that should be closed before merge.

---

## 7. Validation

```
typecheck            clean
build                exit 0 — 31 new routes, 30 practice pages prerendered
validate:content

  ✓ religion:refs              no issues
  ✓ religion:evidence          no issues
  ✓ religion:boundaries        no issues
  ✓ religion:myth-discipline   no issues

  0 errors, 1 warning
```

The single warning is the pre-existing Phase 27.5 backlog counter (11
object provenance records awaiting catalogue verification), reported by
design.

`religion:boundaries` checks heading disjointness against
`CITY_SECTION_HEADINGS`, `INSTITUTION_SECTION_HEADINGS` and the H2s of
every civilization, theme, figure and guide page at once; resolves all 33
deferrals against their registries; and fails a slug shared with the city,
architecture, institution, warfare or theme layers.

Rendered spot check (`/ancient-religion/mystery-initiation`): 10,596
words, all nine section headings present, 51 unique resolving outbound
links.

---

## 8. Known limits

- **No images.** The template supports one; none carries one. No
  licence-verified photograph in the archive depicts religious practice as
  opposed to a building, and illustrating "animal sacrifice" with a
  photograph of a temple would repeat the Phase 26 error of illustrating a
  subject with a picture of something adjacent to it.
- **No browser-based visual QA** — the environment is headless throughout
  this stack. Rendering was verified from the prerendered HTML.
- **Attic bias, stated on the pages.** The inscribed evidence for Greek
  cult is overwhelmingly Athenian, and the pages say so in `silences`
  rather than generalising.
- **Missing figure pages.** Varro, Ovid, Lucretius, Hesiod, Pausanias,
  Apuleius, Julian and Augustine have no biographies, so practices that
  would naturally link to them do not. Nothing was invented to fill this.
- **Six pages have not had the published-page verification pass** (see
  §6a). This is the most significant open item in the phase.
- **No PR opened.** `gh` is unavailable in this environment.

---

## 9. Where the roadmap stands

Phases 26–30 are complete: warfare, cities, archaeology and museums,
architecture, institutions and government, ancient religion. Six feature
branches, stacked, none merged.

The platform gained, across the six: the battle and warfare encyclopedia,
the cities layer with its place/polity split, the object-provenance and
museums layer, the architecture layer, 29 institutions, and 30 cult
practices — together with **20 new validator checks** (23 → 43) and, in
this last phase, corpus-wide protection against cult myth-as-history that
the platform did not previously have.
