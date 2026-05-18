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
  return (
    <article className="group flex h-full flex-col border-t border-rule pt-6">
      <p className="vp-eyebrow">{era ?? "Philosopher"}</p>
      <h3 className="mt-3 font-serif text-heading-1 text-charcoal">
        <Link href={`/philosophers/${slug}`} className="hover:text-bronze">
          {name}
        </Link>
      </h3>
      {epithet ? (
        <p className="mt-1 font-serif italic text-stone">{epithet}</p>
      ) : null}
      {lifespan ? (
        <p className="mt-2 text-xs uppercase tracking-eyebrow text-stone">{lifespan}</p>
      ) : null}
      {summary ? (
        <p className="mt-4 text-charcoal-100">{summary}</p>
      ) : null}
      <p className="mt-6">
        <Link
          href={`/philosophers/${slug}`}
          className="text-sm uppercase tracking-eyebrow text-bronze hover:text-bronze-300"
        >
          Read on {name.split(" ")[0]}
        </Link>
      </p>
    </article>
  );
}
