import Image from "next/image";
import Link from "next/link";
import type { Bust } from "@/data/busts";

type ThinkerCardProps = {
  slug: string;
  name: string;
  epithet?: string;
  era?: string;
  lifespan?: string;
  summary?: string;
  /** When provided, the card renders a portrait crop of the bust
   *  above the era rule. Resolved by the page from src/data/busts.ts
   *  via getBustByFigure(slug); cards without a registered bust
   *  render unchanged. */
  bust?: Bust;
};

export function ThinkerCard({
  slug,
  name,
  epithet,
  era,
  lifespan,
  summary,
  bust,
}: ThinkerCardProps) {
  const href = `/philosophers/${slug}`;
  const familiar = name.split(" ")[0];
  return (
    <article className="group flex h-full flex-col">
      {bust ? (
        <Link
          href={href}
          aria-label={`${name} — read the entry`}
          className="vp-marble relative mb-6 block aspect-[4/5] w-full overflow-hidden"
        >
          <Image
            src={bust.imagePath}
            alt={bust.alt}
            fill
            sizes="(min-width: 1024px) 28vw, (min-width: 768px) 40vw, 100vw"
            className="h-full w-full object-cover [filter:saturate(0.85)_contrast(1.02)] transition-transform duration-500 group-hover:scale-[1.015]"
          />
        </Link>
      ) : null}
      <div className="border-b border-rule pb-3">
        <p className="vp-eyebrow">{era ?? "Philosopher"}</p>
      </div>
      <h3 className="mt-5 font-serif text-heading-1 text-charcoal">
        <Link href={href}>{name}</Link>
      </h3>
      {epithet ? (
        <p className="mt-2 font-serif italic text-stone">{epithet}</p>
      ) : null}
      {lifespan ? (
        <p className="mt-3 text-xs uppercase tracking-eyebrow text-stone">
          {lifespan}
        </p>
      ) : null}
      {summary ? (
        <p className="mt-5 text-charcoal-100">{summary}</p>
      ) : null}
      <p className="mt-auto pt-7">
        <Link
          href={href}
          className="inline-flex items-center text-sm uppercase tracking-eyebrow text-bronze"
        >
          Read on {familiar}
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
