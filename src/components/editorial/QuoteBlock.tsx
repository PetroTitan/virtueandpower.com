import { cn } from "@/lib/cn";

type QuoteBlockProps = {
  quote: string;
  attribution?: string;
  source?: string;
  workTitle?: string;
  workCitation?: string;
  className?: string;
  size?: "default" | "feature";
};

export function QuoteBlock({
  quote,
  attribution,
  source,
  workTitle,
  workCitation,
  className,
  size = "default",
}: QuoteBlockProps) {
  return (
    <figure
      className={cn(
        "border-l border-bronze pl-6 sm:pl-8",
        size === "feature" ? "py-2" : "",
        className,
      )}
    >
      <blockquote>
        <p
          className={cn(
            "font-serif italic text-charcoal",
            size === "feature" ? "text-3xl leading-snug sm:text-4xl" : "text-xl leading-relaxed sm:text-2xl",
          )}
        >
          &ldquo;{quote}&rdquo;
        </p>
      </blockquote>
      {(attribution || source || workTitle) && (
        <figcaption className="mt-4 text-sm text-stone">
          {attribution ? <span className="text-charcoal-100">{attribution}</span> : null}
          {workTitle ? (
            <>
              {attribution ? ", " : null}
              <cite className="not-italic text-charcoal-100">{workTitle}</cite>
            </>
          ) : null}
          {workCitation ? <span className="text-stone"> · {workCitation}</span> : null}
          {source ? <span className="text-stone"> · {source}</span> : null}
        </figcaption>
      )}
    </figure>
  );
}
