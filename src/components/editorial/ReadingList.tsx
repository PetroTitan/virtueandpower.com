import Link from "next/link";

export type ReadingListEntry = {
  href: string;
  title: string;
  author?: string;
  note?: string;
};

type ReadingListProps = {
  title?: string;
  entries: ReadingListEntry[];
};

export function ReadingList({ title = "Reading list", entries }: ReadingListProps) {
  if (!entries.length) return null;
  return (
    <section className="mt-12 border-t border-rule pt-8">
      <h2 className="vp-eyebrow">{title}</h2>
      <ol className="mt-6 divide-y divide-rule">
        {entries.map((entry, idx) => (
          <li key={entry.href} className="flex gap-6 py-5">
            <span className="font-serif text-xl text-bronze">
              {String(idx + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="font-serif text-lg text-charcoal">
                <Link href={entry.href} className="hover:text-bronze">
                  <cite className="not-italic">{entry.title}</cite>
                </Link>
              </h3>
              {entry.author ? (
                <p className="mt-1 text-sm text-stone">{entry.author}</p>
              ) : null}
              {entry.note ? (
                <p className="mt-2 text-sm text-charcoal-100">{entry.note}</p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
