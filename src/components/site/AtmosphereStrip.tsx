import Image from "next/image";
import { Eyebrow } from "@/components/editorial/Typography";
import { cn } from "@/lib/cn";
import { getArchiveImage } from "@/data/archive-images";
import { busts, getBust } from "@/data/busts";

/**
 * Atmosphere strip.
 *
 * A horizontal composition of two-to-four museum-grade visual
 * fragments — architecture, reliefs, coins, ruins, a bust where it
 * fits the editorial frame — placed at the bottom of a civilization
 * hub or a figure page to give the page a sense of *visual context*
 * without crowding the main editorial body.
 *
 * Each plate is a small framed image with a short caption beneath.
 * No links — the strip is contextual atmosphere rather than a
 * navigation surface. The plates are the same marble plinth
 * treatment as the bust and archive components elsewhere.
 *
 * SSR-only, CLS-stable through explicit aspect ratios, no client JS,
 * no animation. The whole strip degrades gracefully on mobile to a
 * single column.
 */

export type AtmosphereItem = {
  /** Slug into either the archive-image or bust registry. */
  slug: string;
  /** Optional caption override; otherwise the registry's caption is
   *  used. */
  caption?: string;
};

type AtmosphereStripProps = {
  /** Short section title rendered above the strip. */
  heading: string;
  /** Optional smaller eyebrow above the heading. */
  eyebrow?: string;
  /** The items in display order. Items with unknown slugs are
   *  silently dropped (consistent with the rest of the visual
   *  system). */
  items: ReadonlyArray<AtmosphereItem>;
};

type Resolved = {
  imagePath: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  attribution: string;
};

function resolve(slug: string): Resolved | null {
  const archive = getArchiveImage(slug);
  if (archive) {
    return {
      imagePath: archive.imagePath,
      alt: archive.alt,
      width: archive.width,
      height: archive.height,
      caption: archive.caption,
      attribution: archive.attribution,
    };
  }
  const bust = getBust(slug);
  if (bust) {
    return {
      imagePath: bust.imagePath,
      alt: bust.alt,
      width: bust.width,
      height: bust.height,
      caption: bust.caption,
      attribution: bust.attribution,
    };
  }
  const byFigure = busts.find((b) => b.figureSlug === slug);
  if (byFigure) {
    return {
      imagePath: byFigure.imagePath,
      alt: byFigure.alt,
      width: byFigure.width,
      height: byFigure.height,
      caption: byFigure.caption,
      attribution: byFigure.attribution,
    };
  }
  return null;
}

export function AtmosphereStrip({
  heading,
  eyebrow,
  items,
}: AtmosphereStripProps) {
  const resolved = items
    .map((it) => {
      const r = resolve(it.slug);
      return r ? { ...r, caption: it.caption ?? r.caption } : null;
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  if (resolved.length === 0) return null;

  const gridCols =
    resolved.length === 2
      ? "sm:grid-cols-2"
      : resolved.length === 4
        ? "sm:grid-cols-2 md:grid-cols-4"
        : "sm:grid-cols-2 md:grid-cols-3";

  return (
    <section aria-labelledby="atmosphere-strip-heading">
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2
        id="atmosphere-strip-heading"
        className="mt-3 font-serif text-display-2 text-charcoal"
      >
        {heading}
      </h2>
      <ul className={cn("mt-10 grid gap-x-6 gap-y-10", gridCols)} role="list">
        {resolved.map((r, i) => (
          <li key={`${r.imagePath}-${i}`}>
            <figure>
              <div className="vp-marble relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={r.imagePath}
                  alt={r.alt}
                  fill
                  sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 50vw"
                  className="h-full w-full object-cover [filter:saturate(0.85)_contrast(1.02)]"
                />
              </div>
              <figcaption className="mt-3 text-xs uppercase tracking-eyebrow text-stone">
                <span className="text-charcoal-100">{r.caption}</span>
                <span aria-hidden> · </span>
                <span className="text-stone">{r.attribution}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
