import { Container } from "@/components/layout/Container";

export function NewsletterCta() {
  return (
    <section className="border-y border-rule bg-parchment-50">
      <Container width="editorial" className="py-16 sm:py-20">
        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <div>
            <p className="vp-eyebrow">The journal</p>
            <h2 className="mt-3 font-serif text-display-2 text-charcoal">
              A correspondence on virtue, power and the long view.
            </h2>
            <p className="mt-4 max-w-prose text-charcoal-100">
              Occasional essays and reading notes. No spam, no churn,
              no AI-generated filler. We write when there is something
              worth saying.
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
              className="w-full rounded-none border border-rule bg-ivory px-4 py-3 text-charcoal placeholder:text-stone focus:border-bronze focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-none border border-charcoal bg-charcoal px-5 py-3 text-sm uppercase tracking-eyebrow text-ivory transition-colors hover:bg-charcoal-200"
            >
              Subscribe
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}
