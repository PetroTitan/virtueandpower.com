import Link from "next/link";

type ThemeCardProps = {
  slug: string;
  title: string;
  description?: string;
  domain?: string;
};

/**
 * Theme card. Pared back to the same top-hairline composition the
 * other cards use — no box, no panel fill. The card is built from
 * typography and a single hairline; the imperial-blue accent appears
 * only on the small action label, in keeping with restraint.
 */
export function ThemeCard({ slug, title, description, domain }: ThemeCardProps) {
  const href = `/themes/${slug}`;
  return (
    <article className="group flex h-full flex-col border-t border-rule pt-7">
      {domain ? <p className="vp-eyebrow">{domain}</p> : null}
      <h3 className="mt-3 font-serif text-heading-1 text-charcoal">
        <Link href={href}>{title}</Link>
      </h3>
      {description ? (
        <p className="mt-3 text-charcoal-100">{description}</p>
      ) : null}
      <p className="mt-auto pt-7">
        <Link
          href={href}
          className="inline-flex items-center text-sm uppercase tracking-eyebrow text-bronze"
        >
          Explore theme
          <span
            aria-hidden
            className="ml-2 transition-transform group-hover:translate-x-0.5"
          >
            →
          </span>
        </Link>
      </p>
    </article>
  );
}
