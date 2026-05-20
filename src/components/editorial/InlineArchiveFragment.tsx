import Image from "next/image";
import { cn } from "@/lib/cn";
import { archiveImages, getArchiveImage } from "@/data/archive-images";
import { busts, getBust } from "@/data/busts";

/**
 * Inline archive fragment.
 *
 * Used inside essay and civilization MDX bodies to break up long
 * stretches of prose with a single museum-grade visual — a bust, a
 * relief, a coin, a mosaic, an architectural detail. The component
 * accepts either an archive-image slug or a bust slug and resolves
 * against the typed registries; if the slug matches neither, it
 * renders nothing (no broken-image stub).
 *
 * Three working sizes:
 *
 * - `small` — floats to the right at md+ and reads as a small
 *   museum-catalogue plate; wraps under prose at narrow viewports.
 *   Use for coins, inscriptions, single artefacts.
 * - `medium` — full prose-column-width, sits as its own paragraph,
 *   like a pull image. Use for reliefs, mosaics, single-building
 *   exteriors. The default.
 * - `wide` — breaks slightly out of the prose column on wider
 *   viewports and runs the full text-width. Use for wide
 *   architectural compositions; restraint applies.
 *
 * No client JS, SSR-only, CLS-stable through explicit width / height
 * on next/image.
 */

export type InlineArchiveFragmentSize = "small" | "medium" | "wide";

type InlineArchiveFragmentProps = {
  /** Slug to look up. The component checks the archive-image
   *  registry first and falls back to the bust registry. */
  slug: string;
  /** Composition size. Defaults to medium. */
  size?: InlineArchiveFragmentSize;
  /** Override caption (e.g. to point to the figure entry that
   *  the bust depicts). When omitted, the registry's caption is
   *  used. */
  caption?: string;
  /** Override the attribution tail. */
  attribution?: string;
  /** Editorial framing note rendered above the image — short,
   *  italic, in the prose voice. Optional. */
  note?: string;
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
  // Also accept a "figure" slug — resolve to the bust depicting it.
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

const SIZE_CLASSES: Record<InlineArchiveFragmentSize, string> = {
  small:
    "my-6 md:my-0 md:float-right md:ml-8 md:mb-4 md:w-1/3 lg:w-[34%] max-w-sm",
  medium: "my-8",
  wide: "my-10 md:-mx-8 lg:-mx-16 xl:-mx-24",
};

export function InlineArchiveFragment({
  slug,
  size = "medium",
  caption,
  attribution,
  note,
}: InlineArchiveFragmentProps) {
  const r = resolve(slug);
  if (!r) return null;

  const finalCaption = caption ?? r.caption;
  const finalAttribution = attribution ?? r.attribution;
  const sizes =
    size === "small"
      ? "(min-width: 1024px) 18vw, (min-width: 768px) 25vw, 100vw"
      : size === "wide"
        ? "(min-width: 1280px) 920px, 100vw"
        : "(min-width: 768px) 60vw, 100vw";

  return (
    <figure className={cn(SIZE_CLASSES[size], "clear-both")}>
      {note ? (
        <p className="mb-3 font-serif text-sm italic text-stone">{note}</p>
      ) : null}
      <div className="vp-marble relative w-full overflow-hidden">
        <Image
          src={r.imagePath}
          alt={r.alt}
          width={r.width}
          height={r.height}
          sizes={sizes}
          className="h-auto w-full [filter:saturate(0.85)_contrast(1.02)]"
        />
      </div>
      <figcaption className="mt-3 text-xs uppercase tracking-eyebrow text-stone">
        <span className="text-charcoal-100">{finalCaption}</span>
        <span aria-hidden> · </span>
        <span className="text-stone">{finalAttribution}</span>
      </figcaption>
    </figure>
  );
}

export { archiveImages };
