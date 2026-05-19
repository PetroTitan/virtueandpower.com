import Image from "next/image";
import { cn } from "@/lib/cn";
import {
  archiveImages,
  getArchiveImage,
  type ArchiveImage as ArchiveImageEntry,
} from "@/data/archive-images";

/**
 * Museum/archive imagery component — architecture, ruins, maps,
 * manuscripts, reliefs, inscriptions. The portrait-of-a-figure
 * equivalent is BustImage.tsx; this is everything else.
 *
 * The catalog lives in src/data/archive-images.ts. This component
 * reads from it via `slug` (or a directly-passed entry) and renders
 * the image with attribution. Sources are vendored under
 * /public/images/<kind>/ with README provenance.
 */

export type { ArchiveImage as ArchiveImageEntry } from "@/data/archive-images";
export { archiveImages, getArchiveImage };

type ArchiveImageProps = {
  /** Archive entry to render. Pass either an entry or its slug. */
  entry?: ArchiveImageEntry;
  slug?: string;
  /** Preload (use only above-the-fold). */
  priority?: boolean;
  /** Tailwind classes for the wrapping figure. */
  className?: string;
  /** Tailwind classes for the rendered <img>. */
  imageClassName?: string;
  /** Render the small caption under the image. */
  showCaption?: boolean;
  /** Responsive sizes hint for Next/Image. */
  sizes?: string;
  /** Aspect-ratio override applied via inline style on the
   *  containing frame. Falls back to the image's intrinsic ratio. */
  aspect?: string;
};

/**
 * Renders an archive image inside the marble frame the platform uses
 * everywhere for vendored visual material. The frame carries the
 * vp-marble background so the surface still reads as an intentional
 * stone plinth even if the image fails to decode; the slight
 * saturation pullback keeps the photograph reading as marble rather
 * than as postcard imagery.
 */
export function ArchiveImage({
  entry,
  slug,
  priority = false,
  className,
  imageClassName,
  showCaption = true,
  sizes = "(min-width: 1024px) 60vw, 100vw",
  aspect,
}: ArchiveImageProps) {
  const resolved = entry ?? (slug ? getArchiveImage(slug) : undefined);
  if (!resolved) return null;

  return (
    <figure className={cn("flex flex-col", className)}>
      <div
        className="vp-marble relative w-full overflow-hidden"
        style={
          aspect
            ? { aspectRatio: aspect }
            : { aspectRatio: `${resolved.width} / ${resolved.height}` }
        }
      >
        <Image
          src={resolved.imagePath}
          alt={resolved.alt}
          fill
          priority={priority}
          sizes={sizes}
          className={cn(
            "h-full w-full object-cover",
            "[filter:saturate(0.85)_contrast(1.02)]",
            imageClassName,
          )}
        />
      </div>
      {showCaption ? (
        <figcaption className="mt-4 text-xs uppercase tracking-eyebrow text-stone">
          <span className="text-charcoal-100">{resolved.caption}</span>
          <span aria-hidden> · </span>
          <span className="text-stone">{resolved.attribution}</span>
        </figcaption>
      ) : null}
    </figure>
  );
}
