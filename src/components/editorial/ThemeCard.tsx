import Link from "next/link";

type ThemeCardProps = {
  slug: string;
  title: string;
  description?: string;
  domain?: string;
};

export function ThemeCard({ slug, title, description, domain }: ThemeCardProps) {
  return (
    <article className="group flex h-full flex-col border border-rule bg-ivory p-6 transition-colors hover:border-bronze">
      {domain ? <p className="vp-eyebrow">{domain}</p> : null}
      <h3 className="mt-3 font-serif text-heading-1 text-charcoal">
        <Link href={`/themes/${slug}`} className="group-hover:text-bronze">
          {title}
        </Link>
      </h3>
      {description ? (
        <p className="mt-3 text-charcoal-100">{description}</p>
      ) : null}
      <p className="mt-auto pt-6">
        <Link
          href={`/themes/${slug}`}
          className="text-sm uppercase tracking-eyebrow text-bronze"
        >
          Explore theme
        </Link>
      </p>
    </article>
  );
}
