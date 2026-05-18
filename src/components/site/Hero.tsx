import { Container } from "@/components/layout/Container";

export function Hero() {
  return (
    <section className="border-b border-rule bg-parchment-50">
      <Container width="editorial" className="py-20 sm:py-28 lg:py-36">
        <p className="vp-eyebrow">An intellectual platform · Est. MMXXVI</p>
        <h1 className="mt-6 max-w-4xl font-serif text-display-1 text-charcoal">
          Virtue <span className="text-bronze">&amp;</span> Power
        </h1>
        <p className="mt-8 max-w-2xl font-serif text-lede text-charcoal-100">
          Classical wisdom for leadership, civilization and the modern world.
        </p>
        <p className="mt-6 max-w-2xl text-charcoal-100">
          A long-term study of philosophy, virtue, statecraft and the ancient
          world — drawn from primary texts and the history of thought, written
          for serious readers.
        </p>
      </Container>
    </section>
  );
}
