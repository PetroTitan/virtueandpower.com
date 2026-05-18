import Link from "next/link";

export type RelatedItem = {
  href: string;
  title: string;
  kind?: string;
  excerpt?: string;
};

type RelatedReadingProps = {
  title?: string;
  items: RelatedItem[];
};

export function RelatedReading({
  title = "Related reading",
  items,
}: RelatedReadingProps) {
  if (!items.length) return null;
  return (
    <aside className="mt-16 border-t border-rule pt-10">
      <h2 className="vp-eyebrow">{title}</h2>
      <ul className="mt-6 grid gap-6 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.href} className="border-l border-rule pl-5">
            {item.kind ? (
              <p className="text-xs uppercase tracking-eyebrow text-stone">{item.kind}</p>
            ) : null}
            <h3 className="mt-2 font-serif text-xl text-charcoal">
              <Link href={item.href} className="hover:text-bronze">
                {item.title}
              </Link>
            </h3>
            {item.excerpt ? (
              <p className="mt-2 text-sm text-charcoal-100">{item.excerpt}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </aside>
  );
}
