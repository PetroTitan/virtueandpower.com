import Image from "next/image";
import { cn } from "@/lib/cn";
import {
  busts,
  DEFAULT_BUST_SLUG,
  getBust,
  type Bust,
} from "@/data/busts";

/**
 * Museum-grade marble bust photography for the editorial surfaces.
 *
 * The catalog itself lives in src/data/busts.ts. This component reads
 * from it via `slug` (or a directly-passed Bust object) and renders
 * the image with attribution. Sources are vendored under
 * /public/images/busts (see /public/images/busts/README.md for
 * provenance).
 */

export type { Bust } from "@/data/busts";

/** Default bust used by the hero when no slug is given. */
export const MARCUS_AURELIUS = getBust(DEFAULT_BUST_SLUG)!;
/** Re-export for callers that want to iterate. */
export { busts, getBust };

type BustImageProps = {
  /** Bust to render. Either pass a Bust object directly, or pass a
   *  slug to resolve from the registry. */
  bust?: Bust;
  slug?: string;
  /** Preload the image (use on above-the-fold hero). */
  priority?: boolean;
  /** Tailwind classes for the wrapping figure. */
  className?: string;
  /** Tailwind classes for the rendered <img>. */
  imageClassName?: string;
  /** Render the small caption under the image. */
  showCaption?: boolean;
  /** Responsive sizes hint for Next/Image. */
  sizes?: string;
};

/**
 * Renders a bust as a sculptural focal point. Portrait crop with
 * object-cover so the composition holds regardless of source crop.
 *
 * The frame carries a subtle marble background (.vp-marble) so the
 * surface still reads as an intentional stone plinth if the image
 * ever fails to decode. A slight saturation pullback + contrast bump
 * keeps the photograph reading as marble rather than as a postcard.
 */
export function BustImage({
  bust,
  slug,
  priority = false,
  className,
  imageClassName,
  showCaption = true,
  sizes = "(min-width: 1024px) 40vw, (min-width: 768px) 45vw, 100vw",
}: BustImageProps) {
  const resolved =
    bust ?? (slug ? getBust(slug) : undefined) ?? MARCUS_AURELIUS;

  return (
    <figure className={cn("flex flex-col", className)}>
      <div className="vp-marble relative w-full overflow-hidden">
        <Image
          src={resolved.imagePath}
          alt={resolved.alt}
          width={resolved.width}
          height={resolved.height}
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
