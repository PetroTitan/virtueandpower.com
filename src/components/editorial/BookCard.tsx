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
    <article className="group flex h-full flex-col border-t border-rule pt-7">
      <p className="vp-eyebrow">{period ?? "Primary Text"}</p>
      <h3 className="mt-3 font-serif text-heading-1 text-charcoal">
        <Link href={href}>
          <cite className="not-italic">{title}</cite>
        </Link>
      </h3>
      {author ? <p className="mt-1 text-sm text-stone">by {author}</p> : null}
      {summary ? (
        <p className="mt-4 text-charcoal-100">{summary}</p>
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
