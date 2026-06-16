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

      {/* Comparisons */}
      {featuredComparison ? (
        <PageSection label="Comparisons">
          <SectionIntro
            eyebrow="Comparisons"
            title="Thinkers and traditions, read against each other"
            description="Side-by-side studies that resist the slogan and follow the argument."
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
        </PageSection>
      ) : null}

      <NewsletterCta />
    </>
  );
}
