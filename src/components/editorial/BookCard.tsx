import Link from "next/link";

type BookCardProps = {
  slug: string;
  title: string;
  author?: string;
  period?: string;
  summary?: string;
};

export function BookCard({ slug, title, author, period, summary }: BookCardProps) {
  const href = `/books/${slug}`;
  return (
    <article className="group flex h-full flex-col">
      <div className="border-b border-rule pb-3">
        <p className="vp-eyebrow">{period ?? "Primary Text"}</p>
      </div>
      <h3 className="mt-5 font-serif text-heading-1 text-charcoal">
        <Link href={href}>
          <cite className="not-italic">{title}</cite>
        </Link>
      </h3>
      {author ? (
        <p className="mt-2 text-sm italic text-stone">by {author}</p>
      ) : null}
      {summary ? (
        <p className="mt-5 text-charcoal-100">{summary}</p>
      ) : null}
      <p className="mt-auto pt-7">
        <Link
          href={href}
          className="inline-flex items-center text-sm uppercase tracking-eyebrow text-bronze"
        >
          Read the entry
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
