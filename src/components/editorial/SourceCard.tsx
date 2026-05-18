import type { Source } from "@/data/sources";
import { publicDomainLabel } from "@/data/sources";

type SourceCardProps = {
  source: Source;
};

export function SourceCard({ source }: SourceCardProps) {
  const meta: string[] = [];
  if (source.originalPeriod) meta.push(source.originalPeriod);
  if (source.language) meta.push(source.language);

  return (
    <article
      id={source.id}
      className="scroll-mt-24 border-t border-rule pt-6"
    >
      <h3 className="font-serif text-heading-2 text-charcoal">
        {source.url ? (
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="vp-link text-charcoal hover:text-bronze"
          >
            <cite className="not-italic">{source.title}</cite>
          </a>
        ) : (
          <cite className="not-italic">{source.title}</cite>
        )}
      </h3>
      <dl className="mt-3 grid gap-x-6 gap-y-1 text-sm text-charcoal-100 sm:grid-cols-2">
        {source.author ? (
          <>
            <dt className="text-xs uppercase tracking-eyebrow text-stone">Author</dt>
            <dd>{source.author}</dd>
          </>
        ) : null}
        {source.editor ? (
          <>
            <dt className="text-xs uppercase tracking-eyebrow text-stone">Editor</dt>
            <dd>{source.editor}</dd>
          </>
        ) : null}
        {source.translator ? (
          <>
            <dt className="text-xs uppercase tracking-eyebrow text-stone">Translator</dt>
            <dd>{source.translator}</dd>
          </>
        ) : null}
        {meta.length ? (
          <>
            <dt className="text-xs uppercase tracking-eyebrow text-stone">Origin</dt>
            <dd>{meta.join(" · ")}</dd>
          </>
        ) : null}
        {source.publicDomainStatus ? (
          <>
            <dt className="text-xs uppercase tracking-eyebrow text-stone">Rights</dt>
            <dd>{publicDomainLabel[source.publicDomainStatus]}</dd>
          </>
        ) : null}
      </dl>
      {source.notes ? (
        <p className="mt-4 max-w-prose text-charcoal-100">{source.notes}</p>
      ) : null}
    </article>
  );
}
