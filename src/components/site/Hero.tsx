import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/editorial/Typography";
import { ClassicalProfile } from "./ClassicalProfile";

/**
 * Homepage hero.
 *
 * Composition reads as a museum-catalogue opener: a monumental serif
 * title sits in roughly two-thirds of the column, a sculptural profile
 * silhouette anchors the right third. Pure white surround, deep
 * vertical breathing room, one restrained imperial-blue accent on the
 * ampersand.
 *
 * No background panel, no shaded box — the surrounding white is the
 * design. A single hairline silver rule closes the section.
 */
export function Hero() {
  return (
    <section className="border-b border-rule bg-white">
      <Container
        width="editorial"
        className="pt-20 pb-16 sm:pt-28 sm:pb-20 lg:pt-36 lg:pb-28"
      >
        <div className="grid items-end gap-12 md:grid-cols-12 md:gap-16">
          {/* Type column — monumental serif, asymmetric weight to the left. */}
          <div className="md:col-span-8">
            <Eyebrow>An intellectual platform · Est. MMXXVI</Eyebrow>
            <h1 className="mt-8 font-serif text-display-1 text-charcoal">
              Virtue
              <span className="text-bronze"> &amp; </span>
              Power
            </h1>

            <p className="mt-10 max-w-2xl font-serif text-lede italic text-charcoal-100">
              Classical wisdom for leadership, civilization and the modern
              world.
            </p>

            <p className="mt-6 max-w-2xl text-charcoal-100">
              A long-term study of philosophy, virtue, statecraft and the
              ancient world — drawn from primary texts and the history of
              thought, written for serious readers.
            </p>

            {/* Editorial principle / scope, rendered as a thin two-column
                meta block under the lede on desktop only. Replaces the
                old right-rail dl — keeps the meta visible without
                breaking the monumental rhythm of the headline. */}
            <dl className="mt-12 hidden grid-cols-2 gap-x-12 border-t border-rule pt-8 text-sm md:grid">
              <div>
                <dt className="vp-eyebrow">Editorial principle</dt>
                <dd className="mt-2 font-serif italic text-charcoal-100">
                  Primary sources, precise citations, the long view.
                </dd>
              </div>
              <div>
                <dt className="vp-eyebrow">Scope</dt>
                <dd className="mt-2 text-charcoal-100">
                  Philosophy, virtue, power, statecraft, religion, the ancient
                  world.
                </dd>
              </div>
            </dl>
          </div>

          {/* Sculptural anchor. Hidden on small viewports — at mobile size
              the type alone is the composition. */}
          <div className="hidden md:col-span-4 md:block">
            <ClassicalProfile ariaLabel="Stylised classical profile, used as the platform's editorial mark." />
          </div>
        </div>
      </Container>
    </section>
  );
}
