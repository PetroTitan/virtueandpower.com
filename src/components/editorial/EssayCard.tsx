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
    <article className="group flex h-full flex-col border-t border-rule pt-6">
      {eyebrow ? <p className="vp-eyebrow">{eyebrow}</p> : null}
      <h3 className="mt-3 font-serif text-heading-2 text-charcoal">
        <Link
          href={href}
          className="rounded-sm transition-colors group-hover:text-bronze focus-visible:outline-none focus-visible:text-bronze"
        >
          {title}
        </Link>
      </h3>
      {dek ? (
        <p className="mt-3 text-charcoal-100">{dek}</p>
      ) : null}
      <div className="mt-auto pt-6 text-xs uppercase tracking-eyebrow text-stone">
        {meta ? <span>{meta}</span> : null}
        {meta ? <span aria-hidden> · </span> : null}
        <Link href={href} className="text-bronze hover:text-bronze-300">
          Read essay →
        </Link>
      </div>
    </article>
  );
}
