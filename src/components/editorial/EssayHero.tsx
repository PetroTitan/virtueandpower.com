import Link from "next/link";

type EssayHeroProps = {
  eyebrow?: string;
  title: string;
  dek?: string;
  href: string;
  meta?: string;
};

export function EssayHero({ eyebrow, title, dek, href, meta }: EssayHeroProps) {
  return (
    <article className="group border-y border-rule py-12 md:py-16">
      {eyebrow ? <p className="vp-eyebrow">{eyebrow}</p> : null}
      <h2 className="mt-4 max-w-4xl font-serif text-display-2 text-charcoal">
        <Link
          href={href}
          className="transition-colors group-hover:text-bronze"
        >
          {title}
        </Link>
      </h2>
      {dek ? (
        <p className="mt-5 max-w-2xl font-serif text-lede text-charcoal-100">{dek}</p>
      ) : null}
      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs uppercase tracking-eyebrow text-stone">
        {meta ? <span>{meta}</span> : null}
        {meta ? <span aria-hidden>·</span> : null}
        <Link
          href={href}
          className="inline-flex items-center text-bronze hover:text-bronze-300"
        >
          Read essay
          <span aria-hidden className="ml-2 transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
