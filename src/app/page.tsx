import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SectionIntro } from "@/components/editorial/SectionIntro";
import { EditorialGrid } from "@/components/editorial/EditorialGrid";
import { ThinkerCard } from "@/components/editorial/ThinkerCard";
import { ThemeCard } from "@/components/editorial/ThemeCard";
import { BookCard } from "@/components/editorial/BookCard";
import { EssayHero } from "@/components/editorial/EssayHero";
import { Hero } from "@/components/site/Hero";
import { NewsletterCta } from "@/components/site/NewsletterCta";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getBooks,
  getComparisons,
  getPhilosophers,
  getThemes,
  hrefFor,
} from "@/content/loader";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

export const revalidate = 3600;

export default async function HomePage() {
  const [philosophers, books, themes, comparisons] = await Promise.all([
    getPhilosophers(),
    getBooks(),
    getThemes(),
    getComparisons(),
  ]);

  const featuredThinkers = philosophers.slice(0, 3);
  const featuredThemes = themes.slice(0, 3);
  const featuredBooks = books.slice(0, 3);
  const featuredComparison = comparisons[0];

  return (
    <>
      <JsonLd data={[websiteJsonLd(), organizationJsonLd()]} />
      <Hero />

      {/* Featured essay */}
      <Container width="editorial" className="pt-20">
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
      </Container>

      {/* Thinkers */}
      <Container width="editorial" className="pt-24">
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
      </Container>

      {/* Themes */}
      <Container width="editorial" className="pt-24">
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
      </Container>

      {/* Leadership + Statecraft (cross-link block) */}
      <Container width="editorial" className="pt-24">
        <div className="grid gap-10 border-y border-rule py-16 md:grid-cols-2">
          <div>
            <p className="vp-eyebrow">Leadership</p>
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
              <Link href="/leadership" className="vp-link text-sm uppercase tracking-eyebrow">
                Explore Leadership
              </Link>
            </p>
          </div>
          <div>
            <p className="vp-eyebrow">Statecraft</p>
            <h2 className="mt-3 font-serif text-display-2 text-charcoal">
              The architecture of political life.
            </h2>
            <p className="mt-4 max-w-prose text-charcoal-100">
              Constitutions, factions, the cycle of regimes, the relation
              between virtue and institutions — read across Plato,
              Aristotle, Polybius, Cicero, Tacitus, and the long Roman and
              Christian afterlives of these questions.
            </p>
            <p className="mt-6">
              <Link href="/statecraft" className="vp-link text-sm uppercase tracking-eyebrow">
                Explore Statecraft
              </Link>
            </p>
          </div>
        </div>
      </Container>

      {/* Quotes */}
      <Container width="editorial" className="pt-24">
        <SectionIntro
          eyebrow="Quotes"
          title="Verified, sourced, traceable"
          description="A working library of quotations from the classical tradition. Every entry carries its precise citation — Stephanus page, Bekker number, book and chapter — and no quotation is published before it is verified to a primary text."
          href="/quotes"
          hrefLabel="The quote library"
        />
      </Container>

      {/* Books */}
      <Container width="editorial" className="pt-24">
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
      </Container>

      {/* Ancient World */}
      <Container width="editorial" className="pt-24">
        <div className="grid gap-10 border-y border-rule py-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="vp-eyebrow">The Ancient World</p>
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
      </Container>

      {/* Comparisons */}
      {featuredComparison ? (
        <Container width="editorial" className="pt-24">
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
        </Container>
      ) : null}

      <div className="pt-24" />
      <NewsletterCta />
    </>
  );
}
