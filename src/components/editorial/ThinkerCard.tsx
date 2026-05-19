import Link from "next/link";

type ThinkerCardProps = {
  slug: string;
  name: string;
  epithet?: string;
  era?: string;
  lifespan?: string;
  summary?: string;
};

export function ThinkerCard({
  slug,
  name,
  epithet,
  era,
  lifespan,
  summary,
}: ThinkerCardProps) {
  const href = `/philosophers/${slug}`;
  const familiar = name.split(" ")[0];
  return (
    <article className="group flex h-full flex-col border-t border-rule pt-7">
      <p className="vp-eyebrow">{era ?? "Philosopher"}</p>
      <h3 className="mt-3 font-serif text-heading-1 text-charcoal">
        <Link href={href}>{name}</Link>
      </h3>
      {epithet ? (
        <p className="mt-1 font-serif italic text-stone">{epithet}</p>
      ) : null}
      {lifespan ? (
        <p className="mt-2 text-xs uppercase tracking-eyebrow text-stone">
          {lifespan}
        </p>
      ) : null}
      {summary ? (
        <p className="mt-4 text-charcoal-100">{summary}</p>
      ) : null}
      <p className="mt-auto pt-7">
        <Link
          href={href}
          className="inline-flex items-center text-sm uppercase tracking-eyebrow text-bronze"
        >
          Read on {familiar}
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
