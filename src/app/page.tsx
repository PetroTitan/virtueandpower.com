import Link from "next/link";
import { SectionIntro } from "@/components/editorial/SectionIntro";
import { EditorialGrid } from "@/components/editorial/EditorialGrid";
import { ThinkerCard } from "@/components/editorial/ThinkerCard";
import { ThemeCard } from "@/components/editorial/ThemeCard";
import { BookCard } from "@/components/editorial/BookCard";
import { EssayHero } from "@/components/editorial/EssayHero";
import { EssayCard } from "@/components/editorial/EssayCard";
import { Eyebrow, Lede } from "@/components/editorial/Typography";
import { PageSection } from "@/components/layout/PageSection";
import { Hero } from "@/components/site/Hero";
import { NewsletterCta } from "@/components/site/NewsletterCta";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getBooks,
  getComparisons,
  getEssays,
  getPhilosophers,
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
  const [philosophers, books, themes, comparisons, essays] = await Promise.all([
    getPhilosophers(),
    getBooks(),
    getThemes(),
    getComparisons(),
    getEssays(),
  ]);

  const featuredThinkers = philosophers.slice(0, 3);
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

      {/* Thinkers */}
      <PageSection label="Philosophers">
        <SectionIntro
          eyebrow="Philosophers"
          title="Read the thinkers themselves"
          description="A growing library of editorial entries on the philosophers, statesmen, theologians and historians who shaped the inheritance."
          href="/philosophers"
          hrefLabel="All philosophers"
        />
        <div className="mt-12">
          <EditorialGrid columns={3}>
            {featuredThinkers.map((p) => (
              <ThinkerCard
                key={p.slug}
                slug={p.slug}
                name={p.frontmatter.title}
                epithet={p.frontmatter.epithet}
                era={p.frontmatter.era}
                lifespan={p.frontmatter.lifespan}
                summary={p.frontmatter.description}
              />
            ))}
          </EditorialGrid>
        </div>
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

      {/* Ancient World */}
      <PageSection label="The Ancient World" variant="ruled" spacing="tight">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Eyebrow>The Ancient World</Eyebrow>
            <h2 className="mt-3 font-serif text-display-2 text-charcoal">
              Athens, Rome, Jerusalem.
            </h2>
          </div>
          <div className="md:col-span-7">
            <p className="text-charcoal-100">
              The historical world that produced the classical tradition is
              not background — it is the soil in which the texts grew. The
              Ancient World section places the philosophers and their works
              inside the polities, religions and wars that shaped them.
            </p>
            <p className="mt-6">
              <Link
                href="/ancient-world"
                className="vp-link text-sm uppercase tracking-eyebrow"
              >
                Enter the Ancient World
              </Link>
            </p>
          </div>
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
