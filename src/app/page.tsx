import { Container } from "@/components/layout/Container";

export default function HomePage() {
  return (
    <Container width="editorial" className="py-24">
      <p className="vp-eyebrow">Founded MMXXVI</p>
      <h1 className="mt-4 font-serif text-display-1">
        Virtue <span className="text-bronze">&amp;</span> Power
      </h1>
      <p className="mt-6 max-w-2xl font-serif text-lede text-charcoal-100">
        Classical wisdom for leadership, civilization and the modern world.
      </p>
    </Container>
  );
}
