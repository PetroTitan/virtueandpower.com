export type TimelineEntry = {
  date: string;
  title: string;
  description?: string;
};

type TimelineBlockProps = {
  title?: string;
  entries: TimelineEntry[];
};

export function TimelineBlock({ title = "Timeline", entries }: TimelineBlockProps) {
  if (!entries.length) return null;
  return (
    <section className="mt-12">
      <h2 className="vp-eyebrow">{title}</h2>
      <ol className="mt-6 border-l border-rule">
        {entries.map((entry) => (
          <li key={`${entry.date}-${entry.title}`} className="relative pl-6 pb-8 last:pb-0">
            <span
              aria-hidden
              className="absolute -left-[5px] top-2 inline-block h-2 w-2 rounded-full bg-bronze"
            />
            <p className="text-xs uppercase tracking-eyebrow text-stone">{entry.date}</p>
            <h3 className="mt-1 font-serif text-lg text-charcoal">{entry.title}</h3>
            {entry.description ? (
              <p className="mt-1 text-sm text-charcoal-100">{entry.description}</p>
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
}
