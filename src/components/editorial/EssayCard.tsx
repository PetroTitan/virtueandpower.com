import Link from "next/link";

type EssayCardProps = {
  href: string;
  title: string;
  eyebrow?: string;
  dek?: string;
  meta?: string;
};

/**
 * Compact essay card for grids and lists. Pairs with EssayHero, which is the
 * featured pattern used for a single hero essay on a section page.
 */
export function EssayCard({ href, title, eyebrow, dek, meta }: EssayCardProps) {
  return (
    <article className="group flex h-full flex-col">
      {eyebrow ? (
        <div className="border-b border-rule pb-3">
          <p className="vp-eyebrow">{eyebrow}</p>
        </div>
      ) : null}
      <h3 className="mt-5 font-serif text-heading-2 text-charcoal">
        <Link href={href}>{title}</Link>
      </h3>
      {dek ? (
        <p className="mt-4 text-charcoal-100">{dek}</p>
      ) : null}
      <div className="mt-auto flex flex-wrap items-center gap-x-2 pt-7 text-xs uppercase tracking-eyebrow text-stone">
        {meta ? <span>{meta}</span> : null}
        {meta ? <span aria-hidden>·</span> : null}
        <Link
          href={href}
          className="inline-flex items-center text-bronze"
        >
          Read essay
          <span
            aria-hidden
            className="ml-1 transition-transform group-hover:translate-x-0.5"
          >
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
