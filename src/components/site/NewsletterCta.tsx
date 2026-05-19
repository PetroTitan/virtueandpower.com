import { Container } from "@/components/layout/Container";

/**
 * Newsletter CTA.
 *
 * Sits on a soft marble panel (vp-marble) to give the homepage a single
 * tonal change near the bottom — restful contrast against the otherwise
 * white surface. Form chrome stays minimal: hairline inputs, ink button,
 * no rounded corners. The button is the only solid ink element on the
 * homepage; reads as a deliberate end punctuation rather than a CTA.
 */
export function NewsletterCta() {
  return (
    <section className="vp-marble border-y border-rule">
      <Container width="editorial" className="py-20 sm:py-24">
        <div className="grid gap-10 md:grid-cols-2 md:items-end">
          <div>
            <p className="vp-eyebrow">The journal</p>
            <h2 className="mt-4 font-serif text-display-2 text-charcoal">
              A correspondence on virtue, power and the long view.
            </h2>
            <p className="mt-5 max-w-prose text-charcoal-100">
              Occasional essays and reading notes. No spam, no churn, no
              AI-generated filler. We write when there is something worth
              saying.
            </p>
          </div>
          <form
            className="flex flex-col gap-3 sm:flex-row"
            action="/api/subscribe"
            method="post"
            aria-label="Subscribe to the Virtue & Power journal"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="w-full rounded-none border border-rule bg-white px-4 py-3 text-charcoal placeholder:text-stone focus:border-charcoal focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-none border border-charcoal bg-charcoal px-6 py-3 text-sm uppercase tracking-eyebrow text-white transition-colors hover:bg-charcoal-200"
            >
              Subscribe
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}
