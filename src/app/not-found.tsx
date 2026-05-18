import Link from "next/link";
import { Container } from "@/components/layout/Container";

export default function NotFound() {
  return (
    <Container width="editorial" className="py-32 text-center">
      <p className="vp-eyebrow">404</p>
      <h1 className="mt-4 font-serif text-display-2 text-charcoal">
        That page is not in the library.
      </h1>
      <p className="mx-auto mt-4 max-w-prose text-charcoal-100">
        The URL does not correspond to any entry, essay or section we
        currently publish. The library is small and grows slowly; you may
        have followed a link to something not yet written.
      </p>
      <p className="mt-8">
        <Link href="/" className="vp-link text-sm uppercase tracking-eyebrow">
          Return to the home page
        </Link>
      </p>
    </Container>
  );
}
