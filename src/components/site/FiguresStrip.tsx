import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/editorial/Typography";
import { busts, getBustByFigure, type Bust } from "@/data/busts";

/**
 * A horizontal composition of figure portraits — used on the homepage
 * and on era / civilization study landings to surface the figures the
 * page concerns as a museum-catalogue strip rather than as a list of
 * text links.
 *
 * Each plate is a portrait crop framed in the marble plinth treatment
 * and labelled below with the figure's name and a one-line role tag
 * (e.g. "Statesman · Late Republic"). The whole plate is the link to
 * the figure entry.
 *
 * Figures whose slug is not in the bust registry are silently
 * dropped — the same discipline as the rest of the visual layer: we
 * surface museum-grade imagery where it exists, and we do not invent
 * stand-ins where it does not.
 */

export type FiguresStripItem = {
  /** Slug of the philosopher / figure entry to link to. */
  slug: string;
  /** Short role / context tag rendered beneath the figure name. */
  role: string;
};

type FiguresStripProps = {
  /** Section heading (e.g. "Figures of the late Republic"). */
  heading: string;
  /** Optional short eyebrow above the heading. */
  eyebrow?: string;
  /** Figures to surface, in display order. */
  items: ReadonlyArray<FiguresStripItem>;
};

type Resolved = {
  slug: string;
  role: string;
  bust: Bust;
};

function resolveItems(items: ReadonlyArray<FiguresStripItem>): Resolved[] {
  return items
    .map((item) => {
      const bust = getBustByFigure(item.slug);
      return bust ? { slug: item.slug, role: item.role, bust } : null;
    })
    .filter((x): x is Resolved => x !== null);
}

export function FiguresStrip({ heading, eyebrow, items }: FiguresStripProps) {
  const resolved = resolveItems(items);
  if (resolved.length === 0) return null;

  return (
    <section aria-labelledby="figures-strip-heading">
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2
        id="figures-strip-heading"
        className="mt-3 font-serif text-display-2 text-charcoal"
      >
        {heading}
      </h2>
      <ul
        className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        role="list"
      >
        {resolved.map(({ slug, role, bust }) => (
          <li key={slug} className="group">
            <Link
              href={`/philosophers/${slug}`}
              className="block"
              aria-label={`${bust.figure} — read the entry`}
            >
              <div className="vp-marble relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={bust.imagePath}
                  alt={bust.alt}
                  fill
                  sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 50vw"
                  className="h-full w-full object-cover [filter:saturate(0.85)_contrast(1.02)] transition-transform duration-500 group-hover:scale-[1.015]"
                />
              </div>
              <p className="mt-4 font-serif text-heading-2 text-charcoal">
                {bust.figure}
              </p>
              <p className="mt-1 text-xs uppercase tracking-eyebrow text-stone">
                {role}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Convenience: surface every figure currently in the bust catalog
 *  with a sensible default role. Used in places (e.g. the homepage)
 *  where the editorial intent is "show the figures we have". */
export function defaultFigureItems(): FiguresStripItem[] {
  return busts
    .filter((b) => b.figureSlug)
    .map((b) => ({ slug: b.figureSlug as string, role: b.caption }));
}
