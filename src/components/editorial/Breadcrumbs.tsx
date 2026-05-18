import Link from "next/link";

export type Crumb = { label: string; href?: string };

type BreadcrumbsProps = {
  items: Crumb[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (!items.length) return null;
  return (
    <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-eyebrow text-stone">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={`${item.label}-${idx}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-bronze">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className="text-charcoal-100">
                  {item.label}
                </span>
              )}
              {!isLast ? <span aria-hidden>·</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
