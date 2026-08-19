import Link from "next/link";
import { SectionIntro } from "@/components/editorial/SectionIntro";
import { EditorialGrid } from "@/components/editorial/EditorialGrid";
import { CivilizationCard } from "@/components/editorial/CivilizationCard";
import { ThemeCard } from "@/components/editorial/ThemeCard";
import { BookCard } from "@/components/editorial/BookCard";
import { EssayHero } from "@/components/editorial/EssayHero";
import { EssayCard } from "@/components/editorial/EssayCard";
import { Eyebrow, Lede } from "@/components/editorial/Typography";
import { PageSection } from "@/components/layout/PageSection";
import { FiguresStrip } from "@/components/site/FiguresStrip";
import { Hero } from "@/components/site/Hero";
import { NewsletterCta } from "@/components/site/NewsletterCta";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getBooks,
  getCivilizations,
  getComparisons,
  getEssays,
  getThemes,
  hrefFor,
} from "@/content/loader";
import {
  estimateReadingMinutes,
  formatReadingTime,
} from "@/content/reading-time";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

/**
 * The homepage's Homer band. Six entries, deliberately weighted toward
 * the poem: Homer, the Odyssey, two figures, the myth-and-history guide,
 * and the film comparison last. The film analysis is a single entry
 * rather than the band's subject, so a current release does not come to
 * dominate a platform whose authority layer is the poem.
 */
const HOMER_BAND: ReadonlyArray<{
  href: string;
  kind: string;
  title: string;
  blurb: string;
}> = [
  {
    href: "/homer",
    kind: "Authority hub",
    title: "Homer",
    blurb:
      "What ancient tradition claimed, what modern scholarship has argued for two centuries, and what remains genuinely unknown.",
  },
  {
    href: "/books/odyssey",
    kind: "Primary text",
    title: "The Odyssey",
    blurb:
      "The poem in full — structure, the four movements, the politics of Ithaca, and a guide to all twenty-four books.",
  },
  {
    href: "/figures/odysseus",
    kind: "Figure of the tradition",
    title: "Odysseus",
    blurb:
      "The man of many turns, in Homer and in the tragedians and Latin poets who disliked him — traditions kept separate.",
  },
  {
    href: "/figures/penelope",
    kind: "Figure of the tradition",
    title: "Penelope",
    blurb:
      "The shroud, the contest of the bow, and the test of the bed — the one occasion anyone outmanoeuvres her husband.",
  },
  {
    href: "/guides/odyssey-myth-and-history",
    kind: "Guide",
    title: "Odyssey: myth and history",
    blurb:
      "What in the poem can be treated as evidence, at what level of confidence, and why the question is usually asked badly.",
  },
  {
    href: "/films/christopher-nolan-the-odyssey/homer-vs-film",
    kind: "Film analysis",
    title: "Homer versus Nolan",
    blurb:
      "The 2026 film compared with the poem across twenty-two elements, each with its evidence level and editorial assessment.",
  },
];

/**
 * The homepage's warfare band. Weighted toward the conceptual pages
 * rather than the battle list, so the section reads as an encyclopedia
 * of how armies worked rather than as a catalogue of engagements.
 */
const WARFARE_BAND: ReadonlyArray<{
  href: string;
  kind: string;
  title: string;
  blurb: string;
}> = [
  {
    href: "/warfare/greek-warfare",
    kind: "Civilization",
    title: "Greek warfare",
    blurb:
      "Citizen infantry and the phalanx, and a way of fighting bound to the political community that produced it.",
  },
  {
    href: "/warfare/roman-warfare",
    kind: "Civilization",
    title: "Roman warfare",
    blurb:
      "Four distinct institutions under one name, winning by organisation and engineering rather than by tactics.",
  },
  {
    href: "/warfare/persian-warfare",
    kind: "Civilization",
    title: "Persian warfare",
    blurb:
      "An imperial system known almost entirely through the writings of the people it was fighting.",
  },
  {
    href: "/warfare/logistics",
    kind: "Operations",
    title: "Logistics",
    blurb:
      "Food, water and fodder — the constraint that set how large an ancient army could be and how far it could go.",
  },
  {
    href: "/warfare/battles/cannae",
    kind: "Battle · 216 BCE",
    title: "Cannae",
    blurb:
      "The double envelopment, and two of the best ancient sources disagreeing by twenty thousand dead.",
  },
  {
    href: "/warfare/battles",
    kind: "Index",
    title: "Battles of the ancient world",
    blurb:
      "Eighteen engagements from Marathon to Adrianople, each with its forces, sources, archaeology and open questions.",
  },
];

/**
 * The homepage's cities band. Weighted toward the sites whose
 * archaeology says something the texts do not — Ostia for ordinary
 * Roman housing, Alexandria for a city that cannot be dug, Troy for the
 * limits of what excavation can settle.
 */
const MONUMENTS_BAND: ReadonlyArray<{
  href: string;
  kind: string;
  title: string;
  blurb: string;
}> = [
  {
    href: "/monuments/parthenon",
    kind: "Standing ruin",
    title: "The Parthenon",
    blurb:
      "A temple with almost no straight lines in it, paid for out of an alliance's treasury, and blown apart in 1687 by a shell finding a powder store.",
  },
  {
    href: "/monuments/pantheon",
    kind: "Standing",
    title: "The Pantheon",
    blurb:
      "The largest unreinforced concrete dome ever built, carrying an inscription that names the wrong man, intact because it became a church.",
  },
  {
    href: "/monuments/curia-julia",
    kind: "Standing",
    title: "The Curia Julia",
    blurb:
      "The Senate's hall, seating about half the Senate — which is a fact about how the body actually worked, recovered from the building rather than the sources.",
  },
  {
    href: "/monuments/great-pyramid",
    kind: "Standing",
    title: "The Great Pyramid",
    blurb:
      "A base levelled to a couple of centimetres across thirteen acres, and a construction method that is still genuinely unknown.",
  },
  {
    href: "/monuments/tomb-of-darius-i",
    kind: "Standing",
    title: "The Tomb of Darius I",
    blurb:
      "Thirty labelled peoples holding the king's platform up, and the nearest thing to a Persian statement of what a ruler should be.",
  },
  {
    href: "/monuments/ara-pacis",
    kind: "Re-erected",
    title: "The Ara Pacis",
    blurb:
      "Dug out of waterlogged ground in pieces over four centuries, reassembled for a Fascist anniversary, and standing several hundred metres from where it was built.",
  },
];

const MATERIAL_EVIDENCE_BAND: ReadonlyArray<{
  href: string;
  kind: string;
  title: string;
  blurb: string;
}> = [
  {
    href: "/archaeology/mycenae",
    kind: "Citadel",
    title: "Mycenae",
    blurb:
      "Schliemann's shaft graves, and a gold mask dated three centuries before any traditional date for the war it was named after.",
  },
  {
    href: "/archaeology/athenian-agora",
    kind: "Civic centre",
    title: "The Athenian Agora",
    blurb:
      "The allotment machine, the water clock, the jurors' tickets and thousands of ostraka — Athenian democracy recovered as hardware.",
  },
  {
    href: "/archaeology/herculaneum",
    kind: "Buried town",
    title: "Herculaneum",
    blurb:
      "Carbonised doors, food and a library of Epicurean scrolls, and three hundred people in the boat sheds who did not get out.",
  },
  {
    href: "/archaeology/giza",
    kind: "Necropolis",
    title: "Giza",
    blurb:
      "The bakeries, barracks and workers' cemetery excavated since the 1980s, and the boat-crew logbook that records the stone arriving.",
  },
  {
    href: "/archaeology/behistun",
    kind: "Rock monument",
    title: "Behistun",
    blurb:
      "The trilingual cliff that unlocked cuneiform, and the winner's account of a succession many historians think was a usurpation.",
  },
  {
    href: "/museums",
    kind: "Provenance",
    title: "Museums and objects",
    blurb:
      "Where the finds went — findspot, excavation, inventory and the arguments over identification, with our own gaps stated rather than filled.",
  },
];

const CITIES_BAND: ReadonlyArray<{
  href: string;
  kind: string;
  title: string;
  blurb: string;
}> = [
  {
    href: "/cities/athens",
    kind: "City-state",
    title: "Athens",
    blurb:
      "The Acropolis, the Agora and the Long Walls — the best-excavated classical city, readable against its own inscriptions.",
  },
  {
    href: "/cities/rome",
    kind: "Imperial capital",
    title: "Rome",
    blurb:
      "A city whose archaeology is hardest to read because it never stopped being lived in, and whose population is still argued over.",
  },
  {
    href: "/cities/ostia",
    kind: "Port",
    title: "Ostia",
    blurb:
      "Abandoned rather than destroyed, and therefore the best evidence anywhere for how ordinary Romans actually lived.",
  },
  {
    href: "/cities/alexandria",
    kind: "Imperial capital",
    title: "Alexandria",
    blurb:
      "The clearest case of a city whose importance is inversely proportional to what can be excavated — most of it lies under a living city and under water.",
  },
  {
    href: "/cities/persepolis",
    kind: "Royal centre",
    title: "Persepolis",
    blurb:
      "Burned by Alexander in 330 BCE, and preserved by the fire: the blaze baked the administrative archive that survives.",
  },
  {
    href: "/cities/troy",
    kind: "City-state",
    title: "Troy",
    blurb:
      "Nine cities in one mound, and the site where the limits of what archaeology can settle are clearest.",
  },
];

/**
 * The homepage's architecture band. Weighted toward the pages that
 * correct a common assumption rather than toward the famous buildings.
 */
const ARCHITECTURE_BAND: ReadonlyArray<{
  href: string;
  kind: string;
  title: string;
  blurb: string;
}> = [
  {
    href: "/architecture/temple",
    kind: "Sacred building",
    title: "The temple",
    blurb:
      "A house for a god, not a hall for worshippers — which is why the important architecture is on the outside.",
  },
  {
    href: "/architecture/roman-concrete",
    kind: "Technique",
    title: "Roman concrete",
    blurb:
      "Not modern concrete: lime and volcanic ash packed around rubble, and it sets underwater.",
  },
  {
    href: "/architecture/house-and-insula",
    kind: "Domestic building",
    title: "House and apartment block",
    blurb:
      "The atrium house everyone pictures was a minority dwelling. Most urban Romans lived in flats above shops.",
  },
  {
    href: "/architecture/building-materials",
    kind: "Technique",
    title: "Building materials",
    blurb:
      "Most ancient building was mudbrick and timber, and almost none of it survives. What you see in ruins is the exception.",
  },
  {
    href: "/architecture/pyramid",
    kind: "Funerary",
    title: "The pyramid",
    blurb:
      "The workers' settlement at Giza has been excavated. They were fed, housed and buried honourably — not enslaved foreigners.",
  },
  {
    href: "/architecture/basilica",
    kind: "Civic building",
    title: "The basilica",
    blurb:
      "A Roman law court, and the plan Christianity took over wholesale — the European church begins in a secular hall.",
  },
];

/**
 * The homepage's institutions band. Weighted toward the pages that
 * correct an assumption about how ancient government worked rather than
 * toward the famous offices.
 */
const INSTITUTIONS_BAND: ReadonlyArray<{
  href: string;
  kind: string;
  title: string;
  blurb: string;
}> = [
  {
    href: "/institutions/roman-senate",
    kind: "Roman body",
    title: "The Senate",
    blurb:
      "It could not legislate and could not command an army. Its resolutions were advice. It governed Rome for four centuries anyway.",
  },
  {
    href: "/institutions/dikasteria",
    kind: "Athenian court",
    title: "The people's courts",
    blurb:
      "Juries of hundreds, chosen by lot on the morning of the trial, deciding without a judge. The allotment machines have been excavated.",
  },
  {
    href: "/institutions/roman-assemblies",
    kind: "Roman body",
    title: "The assemblies",
    blurb:
      "Voting was by block, weighted by property, and counted from the top down — so the poorest centuries were often never reached.",
  },
  {
    href: "/institutions/tribune-of-the-plebs",
    kind: "Roman magistracy",
    title: "Tribune of the plebs",
    blurb:
      "An office whose central power was to stop things, protected by an oath rather than by law.",
  },
  {
    href: "/institutions/ostracism",
    kind: "Athenian procedure",
    title: "Ostracism",
    blurb:
      "Ten years' exile with no charge, no trial and no defence. A deposit of pre-inscribed sherds shows the vote being organised.",
  },
  {
    href: "/institutions/satrap",
    kind: "Persian office",
    title: "The satrap",
    blurb:
      "A governor with his own court, army and treasury — what made an empire that size governable, and what made revolt possible.",
  },
];

/**
 * The homepage's ancient-religion band. Weighted toward the pages that
 * correct an assumption about what ancient religion was, rather than
 * toward the famous gods — who are covered on the figures pages.
 */
const RELIGION_BAND: ReadonlyArray<{
  href: string;
  kind: string;
  title: string;
  blurb: string;
}> = [
  {
    href: "/ancient-religion/animal-sacrifice",
    kind: "Rite",
    title: "Animal sacrifice",
    blurb:
      "The central act of Greek religion, and the best-documented thing about it is what it cost. The calendars are budgets.",
  },
  {
    href: "/ancient-religion/mystery-initiation",
    kind: "Greek cult",
    title: "Mystery initiation",
    blurb:
      "The procession and the penalty for divulging are documented. What was shown inside is not, because the ban worked.",
  },
  {
    href: "/ancient-religion/roman-augury",
    kind: "Divination",
    title: "Augury and the auspices",
    blurb:
      "It asked whether the gods permitted an act today. It was not prediction, and calling it prediction is a factual error.",
  },
  {
    href: "/ancient-religion/curse-tablets-and-binding",
    kind: "Rite",
    title: "Curse tablets",
    blurb:
      "Folded lead sheets pushed into graves, naming a target. They record what somebody wanted, and nothing about what followed.",
  },
  {
    href: "/ancient-religion/mithraism",
    kind: "Roman religion",
    title: "Mithraism",
    blurb:
      "Hundreds of rooms, one image repeated everywhere, and not a line of its own scripture. A religion known from its architecture.",
  },
  {
    href: "/ancient-religion/what-ancient-religion-was-not",
    kind: "Reading it",
    title: "What ancient religion was not",
    blurb:
      "No word for religion, no scripture, no congregation, no conversion — and all the same, people who plainly believed things.",
  },
];

export const revalidate = 3600;

export default async function HomePage() {
  const [books, themes, comparisons, essays, civilizations] = await Promise.all(
    [
      getBooks(),
      getThemes(),
      getComparisons(),
      getEssays(),
      getCivilizations(),
    ],
  );

  const featuredThemes = themes.slice(0, 3);
  const featuredBooks = books.slice(0, 3);
  const featuredComparison = comparisons[0];
  // Three most recent published essays.
  const featuredEssays = essays
    .filter((e) => e.frontmatter.status === "published")
    .sort(
      (a, b) =>
        new Date(b.frontmatter.updated).getTime() -
        new Date(a.frontmatter.updated).getTime(),
    )
    .slice(0, 3);

  return (
    <>
      <JsonLd data={[websiteJsonLd(), organizationJsonLd()]} />
      <Hero />

      {/* Founding note */}
      <PageSection label="Founding note" spacing="tight">
        <SectionIntro
          eyebrow="From the Journal"
          title="A founding note on what this platform is for"
          description="Virtue & Power exists to read the classical inheritance seriously — without flattening it into self-help or ideology."
          href="/about"
          hrefLabel="Read the founding note"
        />
        <div className="mt-12">
          <EssayHero
            eyebrow="Editor's note"
            title="The long view: why classical philosophy still has work to do"
            dek="We begin here because the questions of virtue, power and the well-ordered life are not behind us — they have only been forgotten in places where they once stood at the centre."
            href="/about"
            meta="By the Editors · Founding note"
          />
        </div>
      </PageSection>

      {/* Featured essays */}
      <PageSection label="Featured essays">
        <SectionIntro
          eyebrow="Essays"
          title="Studies on the questions classical thought returned to"
          description="Editorial long-form on the platform's central themes — written to the same source discipline as the library entries, but willing to commit to a reading where the entries hold back."
          href="/essays"
          hrefLabel="All essays"
        />
        {featuredEssays.length ? (
          <div className="mt-12">
            <EditorialGrid columns={3}>
              {featuredEssays.map((essay) => {
                const minutes = estimateReadingMinutes(
                  essay.body,
                  essay.frontmatter.readingTime,
                );
                return (
                  <EssayCard
                    key={essay.slug}
                    href={hrefFor("essay", essay.slug)}
                    eyebrow={essay.frontmatter.domain ?? "Essay"}
                    title={essay.frontmatter.title}
                    dek={
                      essay.frontmatter.subtitle ?? essay.frontmatter.description
                    }
                    meta={formatReadingTime(minutes)}
                  />
                );
              })}
            </EditorialGrid>
          </div>
        ) : null}
      </PageSection>

      {/* Figures — the visual centre of gravity. The strip surfaces
          four marble portraits from across the corpus so the
          homepage carries the museum-catalogue weight the platform
          is for. */}
      <PageSection label="Figures">
        <FiguresStrip
          eyebrow="Figures"
          heading="Read the people through whom the tradition speaks"
          items={[
            { slug: "cicero", role: "Senator · Orator · Republic" },
            { slug: "augustus", role: "Princeps · Empire" },
            { slug: "pericles", role: "Strategos · Athens" },
            { slug: "trajan", role: "Optimus Princeps · High Empire" },
          ]}
        />
        <p className="mt-12">
          <Link
            href="/philosophers"
            className="vp-link text-sm uppercase tracking-eyebrow"
          >
            All philosophers and figures
          </Link>
        </p>
      </PageSection>

      {/* Themes */}
      <PageSection label="Themes">
        <SectionIntro
          eyebrow="Themes"
          title="Virtue, justice, power, leadership"
          description="Long-form studies of the recurring questions that classical thought returned to again and again."
          href="/themes"
          hrefLabel="All themes"
        />
        <div className="mt-12">
          <EditorialGrid columns={3}>
            {featuredThemes.map((t) => (
              <ThemeCard
                key={t.slug}
                slug={t.slug}
                title={t.frontmatter.title}
                description={t.frontmatter.description}
                domain={t.frontmatter.domain}
              />
            ))}
          </EditorialGrid>
        </div>
      </PageSection>

      {/* Leadership + Statecraft */}
      <PageSection label="Leadership and Statecraft" variant="ruled" spacing="tight">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <Eyebrow>Leadership</Eyebrow>
            <h2 className="mt-3 font-serif text-display-2 text-charcoal">
              On rule, command and stewardship.
            </h2>
            <p className="mt-4 max-w-prose text-charcoal-100">
              From the philosopher-king and Aristotelian <em>phronēsis</em> to
              the long tradition of mirrors-for-princes — a study of how
              classical and historical thought treated the question of who
              should rule, and how.
            </p>
            <p className="mt-6">
              <Link
                href="/leadership"
                className="vp-link text-sm uppercase tracking-eyebrow"
              >
                Explore Leadership
              </Link>
            </p>
          </div>
          <div>
            <Eyebrow>Statecraft</Eyebrow>
            <h2 className="mt-3 font-serif text-display-2 text-charcoal">
              The architecture of political life.
            </h2>
            <p className="mt-4 max-w-prose text-charcoal-100">
              Constitutions, factions, the cycle of regimes, the relation
              between virtue and institutions — read across Plato, Aristotle,
              Polybius, Cicero, Tacitus, and the long Roman and Christian
              afterlives of these questions.
            </p>
            <p className="mt-6">
              <Link
                href="/statecraft"
                className="vp-link text-sm uppercase tracking-eyebrow"
              >
                Explore Statecraft
              </Link>
            </p>
          </div>
        </div>
      </PageSection>

      {/* Quotes — the editorial commitment, given visual weight */}
      <PageSection label="The Quote Library">
        <div className="grid gap-12 md:grid-cols-12 md:items-start">
          <div className="md:col-span-5">
            <Eyebrow>The Quote Library</Eyebrow>
            <h2 className="mt-3 font-serif text-display-2 text-charcoal">
              Verified. Sourced. Traceable.
            </h2>
            <p className="mt-6 max-w-prose text-charcoal-100">
              Every quotation we publish carries its precise citation — a
              Stephanus page for Plato, a Bekker number for Aristotle, a book
              and chapter for the historians and theologians. No quotation
              appears here until it has been verified to a primary text.
            </p>
            <p className="mt-6">
              <Link
                href="/quotes"
                className="vp-link text-sm uppercase tracking-eyebrow"
              >
                Visit the quote library
              </Link>
            </p>
          </div>
          <figure className="md:col-span-7 border-l border-bronze pl-6 sm:pl-8">
            <Lede as="p" className="max-w-none font-serif text-2xl italic text-charcoal sm:text-3xl">
              We do not invent quotations, we do not paraphrase a passage and
              present it as a verbatim quote, and we do not attribute lines to
              figures who did not write them.
            </Lede>
            <figcaption className="mt-6 text-sm text-stone">
              <span className="text-charcoal-100">Editorial policy</span>
              <span aria-hidden> · </span>
              Virtue &amp; Power
            </figcaption>
          </figure>
        </div>
      </PageSection>

      {/* Books */}
      <PageSection label="Books">
        <SectionIntro
          eyebrow="Books"
          title="The primary texts"
          description="Editorial guides to the foundational works of the Western tradition — what they argue, how they are structured, and how to read them."
          href="/books"
          hrefLabel="All books"
        />
        <div className="mt-12">
          <EditorialGrid columns={3}>
            {featuredBooks.map((b) => (
              <BookCard
                key={b.slug}
                slug={b.slug}
                title={b.frontmatter.title}
                author={b.frontmatter.author}
                period={b.frontmatter.period}
                summary={b.frontmatter.description}
              />
            ))}
          </EditorialGrid>
        </div>
      </PageSection>

      {/* Civilizations — gateway into the four parent hubs */}
      <PageSection label="Civilizations" variant="ruled">
        <SectionIntro
          eyebrow="Civilizations"
          title="The editorial frame the corpus sits inside"
          description="Each civilization hub reads a polity not as chronology but as a working answer to a small set of questions — what authority was, what law was for, how memory was kept, what the architecture and the army were the visible form of."
          href="/civilizations"
          hrefLabel="All civilization hubs"
        />
        <div className="mt-12">
          <EditorialGrid columns={2}>
            {civilizations
              .filter((c) =>
                ["rome", "greece", "persia", "egypt"].includes(c.slug),
              )
              .map((c) => (
                <CivilizationCard
                  key={c.slug}
                  slug={c.slug}
                  title={c.frontmatter.title}
                  subtitle={c.frontmatter.subtitle}
                  period={c.frontmatter.period}
                  description={c.frontmatter.description}
                  heroImage={c.frontmatter.heroImage}
                />
              ))}
          </EditorialGrid>
        </div>
        <p className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
          <Link
            href="/ancient-world"
            className="vp-link text-sm uppercase tracking-eyebrow"
          >
            Enter the Ancient World
          </Link>
          <Link
            href="/roman-republic"
            className="vp-link text-sm uppercase tracking-eyebrow"
          >
            Enter the Roman Republic
          </Link>
        </p>
      </PageSection>

      {/* Roman World — the four Roman phase sub-hubs, read as a
          Republic -> Principate -> High Empire -> Late Empire pathway. */}
      <PageSection label="Roman World" variant="ruled">
        <SectionIntro
          eyebrow="Roman World"
          title="Republic, Principate, High Empire, Late Empire"
          description="The Roman civilization is read across four working phases — the self-governing Republic, the veiled monarchy of the Principate, the second-century apogee of the High Empire, and the militarised, Christianising Late Empire. Together they trace why Rome lasted, why the Republic fell, and what the empire became."
          href="/civilizations/rome"
          hrefLabel="Read the umbrella hub"
        />
        <div className="mt-12">
          <EditorialGrid columns={2}>
            {(["roman-republic", "principate", "high-empire", "late-empire"] as const)
              .map((slug) => civilizations.find((c) => c.slug === slug))
              .filter((c): c is NonNullable<typeof c> => c !== undefined)
              .map((c) => (
                <CivilizationCard
                  key={c.slug}
                  slug={c.slug}
                  title={c.frontmatter.title}
                  subtitle={c.frontmatter.subtitle}
                  period={c.frontmatter.period}
                  description={c.frontmatter.description}
                  heroImage={c.frontmatter.heroImage}
                />
              ))}
          </EditorialGrid>
        </div>
      </PageSection>

      {/* Ancient cities — the settlement layer beneath warfare,
          architecture and religion. Deliberately placed before the
          warfare band, because the cities are the spine everything else
          attaches to. */}
      <PageSection label="Ancient cities" variant="ruled">
        <SectionIntro
          eyebrow="Ancient cities"
          title="The places, not only the polities"
          description="Where these cities stood and why, how they were laid out, what was built in them, what has been excavated and where the finds are now. Population figures carry what they rest on: there is no ancient census of any of them."
          href="/cities"
          hrefLabel="Enter the cities layer"
        />
        <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {CITIES_BAND.map((item) => (
            <article key={item.href} className="border-l border-rule pl-5">
              <p className="text-xs uppercase tracking-eyebrow text-stone">
                {item.kind}
              </p>
              <h3 className="mt-2 font-serif text-xl text-charcoal">
                <Link href={item.href} className="hover:text-bronze">
                  {item.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-100">
                {item.blurb}
              </p>
            </article>
          ))}
        </div>
      </PageSection>

      {/* Ancient architecture — the building layer, placed after cities
          because a building needs a place to stand in. */}
      <PageSection label="Ancient architecture">
        <SectionIntro
          eyebrow="Ancient architecture"
          title="How it was built, and how we know"
          description="Temples, forums, baths, aqueducts, vaults and tombs — with an evidence level on every named building that answers a specific question: how do we know what this looked like? The Parthenon stands. The Pharos is known only from descriptions written centuries later."
          href="/architecture"
          hrefLabel="Enter the architecture layer"
        />
        <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {ARCHITECTURE_BAND.map((item) => (
            <article key={item.href} className="border-l border-rule pl-5">
              <p className="text-xs uppercase tracking-eyebrow text-stone">
                {item.kind}
              </p>
              <h3 className="mt-2 font-serif text-xl text-charcoal">
                <Link href={item.href} className="hover:text-bronze">
                  {item.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-100">
                {item.blurb}
              </p>
            </article>
          ))}
        </div>
      </PageSection>

      {/* Named monuments — the building layer, placed immediately after
          architecture because the type page explains the form and the
          monument page is one building, and the two are read together. */}
      <PageSection label="Ancient monuments" variant="ruled">
        <SectionIntro
          eyebrow="Ancient monuments"
          title="One building at a time, with every number sourced"
          description="Thirty-five named buildings — patron, architect, materials, measurements, political meaning, later history, and how much of each is actually still standing. No figure is stored without saying whether it is a survey, an ancient text, a conversion or a modern estimate."
          href="/monuments"
          hrefLabel="Enter the monuments layer"
        />
        <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {MONUMENTS_BAND.map((item) => (
            <article key={item.href} className="border-l border-rule pl-5">
              <p className="text-xs uppercase tracking-eyebrow text-stone">
                {item.kind}
              </p>
              <h3 className="mt-2 font-serif text-xl text-charcoal">
                <Link href={item.href} className="hover:text-bronze">
                  {item.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-100">
                {item.blurb}
              </p>
            </article>
          ))}
        </div>
      </PageSection>

      {/* Institutions and government — the offices layer. Placed after
          architecture because a body needs a building to meet in, and
          before warfare because command is treated there. */}
      <PageSection label="Institutions and government">
        <SectionIntro
          eyebrow="Institutions and government"
          title="Who actually decided, and how far the power reached"
          description="Assemblies, councils, magistracies and the machinery of empire — each page separating what an office was from how it worked and what it could not do, and marking where the constitution we describe is a later reconstruction rather than a record."
          href="/institutions"
          hrefLabel="Enter the institutions layer"
        />
        <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {INSTITUTIONS_BAND.map((item) => (
            <article key={item.href} className="border-l border-rule pl-5">
              <p className="text-xs uppercase tracking-eyebrow text-stone">
                {item.kind}
              </p>
              <h3 className="mt-2 font-serif text-xl text-charcoal">
                <Link href={item.href} className="hover:text-bronze">
                  {item.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-100">
                {item.blurb}
              </p>
            </article>
          ))}
        </div>
      </PageSection>

      {/* Ancient religion — the cult layer. Placed after institutions
          because both are about what people actually did, and kept
          visibly distinct from the Religion & Wisdom section, which is
          about scripture and doctrine. */}
      <PageSection label="Ancient religion">
        <SectionIntro
          eyebrow="Ancient religion"
          title="Cult, rite and sanctuary"
          description="What people actually did — sacrifice, dedication, purification, initiation, divination and the care of the dead. Every page separates what the evidence attests from what the sources do not record, and gives the stories the tradition told about a rite with the author who tells them and the distance between the two."
          href="/ancient-religion"
          hrefLabel="Enter the cult layer"
        />
        <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {RELIGION_BAND.map((item) => (
            <article key={item.href} className="border-l border-rule pl-5">
              <p className="text-xs uppercase tracking-eyebrow text-stone">
                {item.kind}
              </p>
              <h3 className="mt-2 font-serif text-xl text-charcoal">
                <Link href={item.href} className="hover:text-bronze">
                  {item.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-100">
                {item.blurb}
              </p>
            </article>
          ))}
        </div>
      </PageSection>

      {/* Material evidence — the archaeology, object and museum layers,
          given one gateway band rather than three. It is placed after the
          city, building, institution and cult layers because it is the
          answer to the question those four raise: how do we know? */}
      <PageSection label="Material evidence" variant="ruled">
        <SectionIntro
          eyebrow="Material evidence"
          title="How we know: excavation, object, museum"
          description="Twenty-six excavated sites with their excavation histories, the objects that came out of them, and the institutions that hold those objects now — including what the excavators got wrong, and what is still argued about."
          href="/archaeology"
          hrefLabel="Enter the evidence layer"
        />
        <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {MATERIAL_EVIDENCE_BAND.map((item) => (
            <article key={item.href} className="border-l border-rule pl-5">
              <p className="text-xs uppercase tracking-eyebrow text-stone">
                {item.kind}
              </p>
              <h3 className="mt-2 font-serif text-xl text-charcoal">
                <Link href={item.href} className="hover:text-bronze">
                  {item.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-100">
                {item.blurb}
              </p>
            </article>
          ))}
        </div>
      </PageSection>

      {/* Ancient warfare — the encyclopedia layer. Six entries weighted
          toward the conceptual pages rather than the battles, so the
          section reads as an encyclopedia rather than a battle list. */}
      <PageSection label="Ancient warfare">
        <SectionIntro
          eyebrow="Ancient warfare"
          title="How the ancient world actually fought"
          description="Formations, armies, ships, siege engineering, logistics and command across the Greek, Roman, Persian and Egyptian worlds — with an evidence level attached to every substantive claim, and no troop figure given without the source that supplies it and an assessment of what it is worth."
          href="/warfare"
          hrefLabel="Enter the encyclopedia"
        />
        <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {WARFARE_BAND.map((item) => (
            <article key={item.href} className="border-l border-rule pl-5">
              <p className="text-xs uppercase tracking-eyebrow text-stone">
                {item.kind}
              </p>
              <h3 className="mt-2 font-serif text-xl text-charcoal">
                <Link href={item.href} className="hover:text-bronze">
                  {item.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-100">
                {item.blurb}
              </p>
            </article>
          ))}
        </div>
      </PageSection>

      {/* Homer and the Odyssey — the epic layer beneath the philosophical
          tradition. Restrained by design: the poem is the authority here,
          and the film analysis is one entry among six rather than the
          band's subject. */}
      <PageSection label="Homer and the Odyssey" variant="ruled">
        <SectionIntro
          eyebrow="Homer and the Odyssey"
          title="The poem the philosophers were arguing with"
          description="The classical inquiry into courage, hospitality, kingship and the shape of a good life begins with Homer and proceeds by arguing with him. The Odyssey is read here as a political, domestic and religious work — with the mythological tradition kept carefully apart from the historical record."
          href="/homer"
          hrefLabel="Enter the Homer hub"
        />
        <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {HOMER_BAND.map((item) => (
            <article key={item.href} className="border-l border-rule pl-5">
              <p className="text-xs uppercase tracking-eyebrow text-stone">
                {item.kind}
              </p>
              <h3 className="mt-2 font-serif text-xl text-charcoal">
                <Link href={item.href} className="hover:text-bronze">
                  {item.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-100">
                {item.blurb}
              </p>
            </article>
          ))}
        </div>
      </PageSection>

      {/* Greek World — the three Greek sub-hubs */}
      <PageSection label="Greek World">
        <SectionIntro
          eyebrow="Greek World"
          title="Civic argument, military discipline, imperial cosmopolitanism"
          description="The Greek civilization is read inside three working sub-hubs — Athens the polis of public political argument, Sparta the polity of integrated civic discipline, and the Hellenistic World the imperial transformation that prepared the Roman absorption."
          href="/civilizations/greece"
          hrefLabel="Read the umbrella hub"
        />
        <div className="mt-12">
          <EditorialGrid columns={3}>
            {civilizations
              .filter((c) =>
                ["athens", "sparta", "hellenistic-world"].includes(c.slug),
              )
              .map((c) => (
                <CivilizationCard
                  key={c.slug}
                  slug={c.slug}
                  title={c.frontmatter.title}
                  subtitle={c.frontmatter.subtitle}
                  period={c.frontmatter.period}
                  description={c.frontmatter.description}
                  heroImage={c.frontmatter.heroImage}
                />
              ))}
          </EditorialGrid>
        </div>
      </PageSection>

      {/* Persian World — the three Achaemenid sub-hubs, the third
          civilizational pillar beside the Greek and Roman worlds. */}
      <PageSection label="Persian World">
        <SectionIntro
          eyebrow="Persian World"
          title="The first world-empire, read as a civilizational pillar"
          description="The Persian civilization is read inside three working sub-hubs — the Achaemenid Empire as a historical entity, the Persian Imperial System as the administrative machinery that governed a continent, and Persia and the Mediterranean as the frontier where it met, and was recorded by, the Greek world."
          href="/civilizations/persia"
          hrefLabel="Read the umbrella hub"
        />
        <div className="mt-12">
          <EditorialGrid columns={3}>
            {(["achaemenid-empire", "persian-imperial-system", "persia-and-the-mediterranean"] as const)
              .map((slug) => civilizations.find((c) => c.slug === slug))
              .filter((c): c is NonNullable<typeof c> => c !== undefined)
              .map((c) => (
                <CivilizationCard
                  key={c.slug}
                  slug={c.slug}
                  title={c.frontmatter.title}
                  subtitle={c.frontmatter.subtitle}
                  period={c.frontmatter.period}
                  description={c.frontmatter.description}
                  heroImage={c.frontmatter.heroImage}
                />
              ))}
          </EditorialGrid>
        </div>
      </PageSection>

      {/* Founders & Constitutions — the founders/lawgivers/constitutions
          cluster, read through three civilizational entry points that
          span Mesopotamia, Greece and China beside the Roman, Greek and
          Persian worlds above. */}
      <PageSection label="Founders & Constitutions" variant="ruled">
        <SectionIntro
          eyebrow="Founders & Constitutions"
          title="How civilizations are founded and how constitutions survive"
          description="How institutions emerge, how laws become durable, how legitimacy is created and order maintained — read through the founders, lawgivers and codes of Babylon, the Athenian reforms, and the bureaucratic empire of early China, beside the lawgivers of Sparta, Rome and Persia."
          href="/themes/constitution"
          hrefLabel="Begin with the constitution"
        />
        <div className="mt-12">
          <EditorialGrid columns={3}>
            {(["babylon", "athens-reforms", "early-imperial-china"] as const)
              .map((slug) => civilizations.find((c) => c.slug === slug))
              .filter((c): c is NonNullable<typeof c> => c !== undefined)
              .map((c) => (
                <CivilizationCard
                  key={c.slug}
                  slug={c.slug}
                  title={c.frontmatter.title}
                  subtitle={c.frontmatter.subtitle}
                  period={c.frontmatter.period}
                  description={c.frontmatter.description}
                  heroImage={c.frontmatter.heroImage}
                />
              ))}
          </EditorialGrid>
        </div>
        <p className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
          <Link
            href="/philosophers/hammurabi"
            className="vp-link text-sm uppercase tracking-eyebrow"
          >
            The lawgivers
          </Link>
          <Link
            href="/comparisons/law-vs-personal-rule"
            className="vp-link text-sm uppercase tracking-eyebrow"
          >
            Law versus personal rule
          </Link>
        </p>
      </PageSection>

      {/* Plutarch & the Parallel Lives — the biographer who bridges
          Greece, Rome and Persia through the study of character. */}
      <PageSection label="Plutarch" variant="ruled">
        <SectionIntro
          eyebrow="Plutarch & the Parallel Lives"
          title="Reading character, leadership and the fate of states"
          description="Plutarch of Chaeronea taught Europe to read the past through the shape of a life. The Parallel Lives pair a Greek with a Roman — Alexander with Caesar, Demosthenes with Cicero, Lycurgus with Numa — to study how character governs the use of power and decides the fate of republics and empires."
          href="/plutarch"
          hrefLabel="Enter the Plutarch hub"
        />
        <div className="mt-12">
          <EssayHero
            eyebrow="Featured destination"
            title="The Parallel Lives"
            dek="The pairings as a comparative system, the individual Lives, and the long European afterlife of the most influential biographies ever written — from Shakespeare's Roman plays to the founders' idea of greatness."
            href="/plutarch/parallel-lives"
            meta="Authority hub · Plutarch"
          />
        </div>
        <div className="mt-16">
          <FiguresStrip
            eyebrow="Read through the Lives"
            heading="The men Plutarch chose, and what their lives were meant to teach"
            items={[
              { slug: "alexander", role: "King of Macedon · 356–323 BCE" },
              { slug: "julius-caesar", role: "Dictator of Rome · 100–44 BCE" },
              { slug: "pericles", role: "Statesman of Athens · c. 495–429 BCE" },
              { slug: "demosthenes", role: "Orator of Athens · 384–322 BCE" },
            ]}
          />
        </div>
      </PageSection>

      {/* Xenophon — the soldier-philosopher who bridges Greece, Persia
          and Sparta through leadership and character. */}
      <PageSection label="Xenophon">
        <SectionIntro
          eyebrow="Xenophon & his works"
          title="The soldier-philosopher of leadership and character"
          description="Xenophon knew Socrates, led an army out of the Persian interior, and wrote the first sustained study of how a ruler is formed. He bridges Greece, Persia and Sparta — and his Cyropaedia, Anabasis and Socratic works were read as practical wisdom for two thousand years."
          href="/xenophon"
          hrefLabel="Enter the Xenophon hub"
        />
        <div className="mt-12">
          <EssayHero
            eyebrow="Featured destination"
            title="The Works of Xenophon"
            dek="The historical Anabasis and Hellenica, the Socratic Memorabilia and Oeconomicus, the political Cyropaedia and Agesilaus — a whole corpus unified by one conviction, that good order flows from the character of the one who governs."
            href="/xenophon/works"
            meta="Authority hub · Xenophon"
          />
        </div>
        <p className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
          <Link
            href="/books/cyropaedia"
            className="vp-link text-sm uppercase tracking-eyebrow"
          >
            Cyropaedia
          </Link>
          <Link
            href="/books/anabasis"
            className="vp-link text-sm uppercase tracking-eyebrow"
          >
            Anabasis
          </Link>
          <Link
            href="/books/memorabilia"
            className="vp-link text-sm uppercase tracking-eyebrow"
          >
            Memorabilia
          </Link>
          <Link
            href="/books/xenophon-agesilaus"
            className="vp-link text-sm uppercase tracking-eyebrow"
          >
            Agesilaus
          </Link>
        </p>
      </PageSection>

      {/* Peloponnesian War — the contest of Athens and Sparta, read
          through Thucydides. */}
      <PageSection label="Peloponnesian War" variant="ruled">
        <SectionIntro
          eyebrow="The Peloponnesian War"
          title="Athens, Sparta, and the anatomy of a great war"
          description="The twenty-seven-year war that broke the classical Greek world — a sea power against a land power, a democracy against an oligarchy — read through Thucydides, the founder of political realism, and the figures who won and lost it."
          href="/books/history-of-the-peloponnesian-war"
          hrefLabel="Read Thucydides' History"
        />
        <div className="mt-12">
          <EssayHero
            eyebrow="Featured essay"
            title="Why Athens lost"
            dek="The richer, more dynamic power defeated itself — abandoning a winning strategy for ambition and faction, from the Sicilian catastrophe to the Persian gold that finally gave Sparta the sea."
            href="/essays/why-athens-lost"
            meta="Peloponnesian War"
          />
        </div>
        <p className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
          <Link href="/essays/the-sicilian-expedition" className="vp-link text-sm uppercase tracking-eyebrow">
            The Sicilian Expedition
          </Link>
          <Link href="/essays/the-melian-dialogue" className="vp-link text-sm uppercase tracking-eyebrow">
            The Melian Dialogue
          </Link>
          <Link href="/essays/sparta-versus-athens" className="vp-link text-sm uppercase tracking-eyebrow">
            Sparta versus Athens
          </Link>
        </p>
      </PageSection>

      {/* Alexander & the Hellenistic World — the three Successor hubs. */}
      <PageSection label="Alexander & the Hellenistic World">
        <SectionIntro
          eyebrow="Alexander & the Hellenistic World"
          title="Conquest, succession, and the kingdoms that followed"
          description="Philip forged the army, Alexander conquered the Persian world, and his generals tore the empire into the kingdoms that carried Greek culture from Egypt to the Hindu Kush — Macedon, Ptolemaic Egypt and the Seleucid Empire."
          href="/civilizations/hellenistic-world"
          hrefLabel="Read the umbrella hub"
        />
        <div className="mt-12">
          <EditorialGrid columns={3}>
            {(["macedon", "ptolemaic-egypt", "seleucid-empire"] as const)
              .map((slug) => civilizations.find((c) => c.slug === slug))
              .filter((c): c is NonNullable<typeof c> => c !== undefined)
              .map((c) => (
                <CivilizationCard
                  key={c.slug}
                  slug={c.slug}
                  title={c.frontmatter.title}
                  subtitle={c.frontmatter.subtitle}
                  period={c.frontmatter.period}
                  description={c.frontmatter.description}
                  heroImage={c.frontmatter.heroImage}
                />
              ))}
          </EditorialGrid>
        </div>
      </PageSection>

      {/* Egypt Through the Ages — the three kingdom hubs. */}
      <PageSection label="Egypt Through the Ages" variant="ruled">
        <SectionIntro
          eyebrow="Egypt Through the Ages"
          title="Three thousand years of sacred kingship"
          description="The longest-lived civilization of the ancient world, read across its three great ages — the Old Kingdom of the pyramids, the Middle Kingdom of reunification and classical letters, and the imperial New Kingdom of Hatshepsut, Akhenaten and Ramesses the Great."
          href="/civilizations/egypt"
          hrefLabel="Read the umbrella hub"
        />
        <div className="mt-12">
          <EditorialGrid columns={3}>
            {(["old-kingdom", "middle-kingdom", "new-kingdom"] as const)
              .map((slug) => civilizations.find((c) => c.slug === slug))
              .filter((c): c is NonNullable<typeof c> => c !== undefined)
              .map((c) => (
                <CivilizationCard
                  key={c.slug}
                  slug={c.slug}
                  title={c.frontmatter.title}
                  subtitle={c.frontmatter.subtitle}
                  period={c.frontmatter.period}
                  description={c.frontmatter.description}
                  heroImage={c.frontmatter.heroImage}
                />
              ))}
          </EditorialGrid>
        </div>
      </PageSection>

      {/* Plato & Aristotle — the two minds that organised Western
          philosophy, given their own destination beside the historians
          and biographers. */}
      <PageSection label="Plato & Aristotle">
        <SectionIntro
          eyebrow="Plato & Aristotle"
          title="The two minds that organised Western thought"
          description="The pupil of Socrates and the pupil of Plato set the terms philosophy still argues in — the ideal and the practical, the philosopher-king and the citizen, the Forms and the world. Read their dialogues and treatises, the themes they opened, and the long quarrel between them."
          href="/philosophers/plato"
          hrefLabel="Begin with Plato"
        />
        <div className="mt-12">
          <FiguresStrip
            eyebrow="The Academy and the Lyceum"
            heading="Socrates, his greatest pupil, and the pupil who broke with him"
            items={[
              { slug: "socrates", role: "Athens · c. 470–399 BCE" },
              { slug: "plato", role: "The Academy · c. 428–348 BCE" },
              { slug: "aristotle", role: "The Lyceum · 384–322 BCE" },
              { slug: "marcus-aurelius", role: "The philosophic afterlife" },
            ]}
          />
        </div>
        <p className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
          <Link href="/philosophers/aristotle" className="vp-link text-sm uppercase tracking-eyebrow">
            Aristotle
          </Link>
          <Link href="/books/republic" className="vp-link text-sm uppercase tracking-eyebrow">
            The Republic
          </Link>
          <Link href="/books/nicomachean-ethics" className="vp-link text-sm uppercase tracking-eyebrow">
            Nicomachean Ethics
          </Link>
          <Link href="/comparisons/plato-and-aristotle" className="vp-link text-sm uppercase tracking-eyebrow">
            Plato versus Aristotle
          </Link>
        </p>
      </PageSection>

      {/* Comparisons — figures, civilizations and political forms read
          against each other without declaring a winner. */}
      {featuredComparison ? (
        <PageSection label="Comparisons" variant="ruled">
          <SectionIntro
            eyebrow="Comparisons"
            title="Thinkers and traditions, read against each other"
            description="Side-by-side studies that resist the slogan and follow the argument — figures, civilizations and forms of government weighed for what each did well and where each failed, never reduced to a winner."
            href="/comparisons"
            hrefLabel="All comparisons"
          />
          <div className="mt-12">
            <EssayHero
              eyebrow="Comparison"
              title={featuredComparison.frontmatter.title}
              dek={featuredComparison.frontmatter.description}
              href={hrefFor("comparison", featuredComparison.slug)}
              meta={featuredComparison.frontmatter.domain ?? undefined}
            />
          </div>
          <p className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
            <Link href="/comparisons/greece-vs-persia" className="vp-link text-sm uppercase tracking-eyebrow">
              Greece versus Persia
            </Link>
            <Link href="/comparisons/greece-vs-rome" className="vp-link text-sm uppercase tracking-eyebrow">
              Greece versus Rome
            </Link>
            <Link href="/comparisons/democracy-vs-oligarchy" className="vp-link text-sm uppercase tracking-eyebrow">
              Democracy versus oligarchy
            </Link>
            <Link href="/comparisons/republic-vs-monarchy" className="vp-link text-sm uppercase tracking-eyebrow">
              Republic versus monarchy
            </Link>
          </p>
        </PageSection>
      ) : null}

      {/* Maps & Timelines — the static reference layer that orients the
          whole corpus in space and time. */}
      <PageSection label="Maps & Timelines">
        <SectionIntro
          eyebrow="Maps & Timelines"
          title="The ancient world in space and time"
          description="A reference layer for the whole library — static maps of Greece, Persia, Alexander's conquests, Rome and Egypt, and chronological timelines from the Old Kingdom to the fall of the Republic, each cross-linked to the figures and texts behind every place and date."
          href="/maps"
          hrefLabel="Browse the maps"
        />
        <p className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
          <Link href="/maps/alexander-empire" className="vp-link text-sm uppercase tracking-eyebrow">
            Alexander&rsquo;s empire
          </Link>
          <Link href="/maps/roman-empire" className="vp-link text-sm uppercase tracking-eyebrow">
            The Roman Empire
          </Link>
          <Link href="/timelines" className="vp-link text-sm uppercase tracking-eyebrow">
            All timelines
          </Link>
          <Link href="/timelines/peloponnesian-war" className="vp-link text-sm uppercase tracking-eyebrow">
            The Peloponnesian War
          </Link>
        </p>
      </PageSection>

      <NewsletterCta />
    </>
  );
}
