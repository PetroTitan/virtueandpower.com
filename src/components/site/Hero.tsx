import { Container } from "@/components/layout/Container";
import { Eyebrow, Lede } from "@/components/editorial/Typography";

export function Hero() {
  return (
    <section className="border-b border-rule bg-parchment-50">
      <Container width="editorial" className="py-20 sm:py-28 lg:py-36">
        <div className="grid items-end gap-12 md:grid-cols-12">
          <div className="md:col-span-8">
            <Eyebrow>An intellectual platform · Est. MMXXVI</Eyebrow>
            <h1 className="mt-6 font-serif text-display-1 text-charcoal">
              Virtue <span className="text-bronze">&amp;</span> Power
            </h1>
            <Lede className="mt-8 max-w-2xl">
              Classical wisdom for leadership, civilization and the modern world.
            </Lede>
            <p className="mt-6 max-w-2xl text-charcoal-100">
              A long-term study of philosophy, virtue, statecraft and the
              ancient world — drawn from primary texts and the history of
              thought, written for serious readers.
            </p>
          </div>
          <div className="hidden md:col-span-4 md:block">
            <dl className="space-y-5 border-l border-rule pl-6 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-eyebrow text-stone">
                  Editorial principle
                </dt>
                <dd className="mt-1 font-serif italic text-charcoal-100">
                  Primary sources, precise citations, the long view.
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-eyebrow text-stone">
                  Scope
                </dt>
                <dd className="mt-1 text-charcoal-100">
                  Philosophy, virtue, power, statecraft, religion, the ancient
                  world.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}
