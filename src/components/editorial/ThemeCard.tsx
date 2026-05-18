import Link from "next/link";

type ThemeCardProps = {
  slug: string;
  title: string;
  description?: string;
  domain?: string;
};

export function ThemeCard({ slug, title, description, domain }: ThemeCardProps) {
  const href = `/themes/${slug}`;
  return (
    <article className="group flex h-full flex-col border border-rule bg-ivory p-6 transition-colors duration-200 hover:border-bronze sm:p-7">
      {domain ? <p className="vp-eyebrow">{domain}</p> : null}
      <h3 className="mt-3 font-serif text-heading-1 text-charcoal">
        <Link href={href} className="transition-colors group-hover:text-bronze">
          {title}
        </Link>
      </h3>
      {description ? (
        <p className="mt-3 text-charcoal-100">{description}</p>
      ) : null}
      <p className="mt-auto pt-6">
        <Link
          href={href}
          className="inline-flex items-center text-sm uppercase tracking-eyebrow text-bronze hover:text-bronze-300"
        >
          Explore theme
          <span aria-hidden className="ml-2 transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </p>
    </article>
  );
}
