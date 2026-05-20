import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/editorial/Typography";
import { LayeredBust } from "./LayeredBust";

/**
 * Homepage hero.
 *
 * Composition reads as a museum-publication opener. A monumental
 * serif headline + lede holds the left two-thirds of the editorial
 * width; a tall portrait photograph of the Tusculum bust of Julius
 * Caesar anchors the right third, reaching from very near the top of
 * the section to the bottom rule. The bust is the focal point — the
 * type leans on it visually, and the type and the bust together carry
 * the page.
 *
 * Caesar (rather than Marcus Aurelius, which served through phases
 * 7–11) was chosen as the hero because the platform's centre of
 * gravity is the late Roman Republic and the cluster of questions
 * around virtue, civic order, military power, and the loss of the
 * constitutional substance that the European tradition has not
 * stopped reading. The Tusculum portrait is the only securely
 * carved-from-life surviving likeness of Caesar; it does the
 * iconographic work this hero needs better than the more familiar
 * imperial-era idealisations.
 *
 * No background panel, no shaded box: the surrounding white is the
 * composition. Imperial-blue accent appears only on the ampersand.
 * A small italic caption under the bust attributes the photograph
 * and museum (Public Domain, Wikimedia Commons via BustImage).
 *
 * On viewports below md, the bust drops out and the type alone is
 * the hero — keeps mobile light and reading-first.
 */
export function Hero() {
  return (
    <section className="border-b border-rule bg-white">
      <Container
        width="editorial"
        className="pt-16 pb-12 sm:pt-20 sm:pb-16 lg:pt-24 lg:pb-20"
      >
        <div className="grid items-start gap-12 md:grid-cols-12 md:gap-16 lg:gap-20">
          {/* Type column — monumental serif, asymmetric weight to the left. */}
          <div className="md:col-span-7 lg:col-span-7 md:pt-6 lg:pt-12">
            <Eyebrow>An intellectual platform · Est. MMXXVI</Eyebrow>
            <h1 className="mt-8 font-serif text-display-1 text-charcoal">
              Virtue
              <span className="text-bronze"> &amp; </span>
              Power
            </h1>

            <p className="mt-10 max-w-2xl font-serif text-lede italic text-charcoal-100">
              Classical wisdom for civilization, statecraft and the long
              question of political order.
            </p>

            <p className="mt-6 max-w-2xl text-charcoal-100">
              A long-term study of virtue, power, republics and empires,
              leadership and the ancient world — drawn from primary texts and
              the history of thought, written for serious readers.
            </p>

            {/* Editorial principle / scope under the lede on desktop only. */}
            <dl className="mt-14 hidden grid-cols-2 gap-x-12 border-t border-rule pt-8 text-sm md:grid">
              <div>
                <dt className="vp-eyebrow">Editorial principle</dt>
                <dd className="mt-3 font-serif italic text-charcoal-100">
                  Primary sources, precise citations, the long view.
                </dd>
              </div>
              <div>
                <dt className="vp-eyebrow">Scope</dt>
                <dd className="mt-3 text-charcoal-100">
                  Virtue, power, statecraft, civilization, religion, the
                  ancient world.
                </dd>
              </div>
            </dl>
          </div>

          {/* Sculptural anchor. Tall portrait crop; the marble bust
              carries the visual gravity for the entire section, with
              a deliberately faint Roman Forum behind it as an
              atmosphere layer (desaturated, ~13% opacity, edges
              fading into the marble surround). Hidden at mobile size
              — at that scale the headline alone holds. The bust
              resolves via LayeredBust's default (Tusculum Caesar);
              the architecture layer is the Roman Forum overview. */}
          <div className="hidden md:col-span-5 lg:col-span-5 md:block">
            <LayeredBust
              priority
              architectureSlug="roman-forum-view"
              className="w-full"
              sizes="(min-width: 1280px) 30vw, (min-width: 768px) 40vw, 100vw"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
