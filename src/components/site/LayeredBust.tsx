import Image from "next/image";
import { cn } from "@/lib/cn";
import {
  busts,
  DEFAULT_BUST_SLUG,
  getBust,
  type Bust,
} from "@/data/busts";
import {
  getArchiveImage,
  type ArchiveImage as ArchiveImageEntry,
} from "@/data/archive-images";

/**
 * Layered editorial bust. The composition is the same museum-plinth
 * portrait the BustImage carries, with a deliberately faint
 * architecture or ruins photograph behind the bust to give the
 * frame a sense of place without competing with the foreground.
 *
 * The background image is rendered at ~12% opacity, desaturated and
 * very slightly blurred, with a radial vignette that fades the edges
 * out toward the marble surround. The bust sits over the top at
 * normal saturation. The intent is that the eye reads the bust as
 * the figure and the background as atmosphere — not a postcard, not
 * a movie poster.
 *
 * SSR-only: no client JS, no parallax, no animation, no hydration.
 * The wrapper sets an explicit aspect ratio so the composition is
 * CLS-stable from first paint.
 */

type LayeredBustProps = {
  /** Bust to render in the foreground. Pass a Bust object directly
   *  or a slug to resolve from the registry. Falls back to
   *  DEFAULT_BUST_SLUG. */
  bust?: Bust;
  slug?: string;
  /** Archive image slug to use as the faded background. When omitted
   *  the bust renders without the background layer (this component
   *  then degrades to the same composition BustImage produces). */
  architectureSlug?: string;
  /** Pre-resolved archive entry, if the caller already has it. */
  architecture?: ArchiveImageEntry;
  /** Preload (use only above-the-fold). */
  priority?: boolean;
  /** Tailwind classes for the wrapping figure. */
  className?: string;
  /** Aspect ratio for the framed composition. Defaults to portrait
   *  (3/4) to match the existing hero crop. */
  aspect?: string;
  /** Render the small caption under the image. */
  showCaption?: boolean;
  /** Responsive sizes hint for Next/Image. */
  sizes?: string;
};

const DEFAULT_BUST = getBust(DEFAULT_BUST_SLUG)!;

export function LayeredBust({
  bust,
  slug,
  architectureSlug,
  architecture,
  priority = false,
  className,
  aspect = "3 / 4",
  showCaption = true,
  sizes = "(min-width: 1280px) 30vw, (min-width: 768px) 40vw, 100vw",
}: LayeredBustProps) {
  const resolvedBust =
    bust ?? (slug ? getBust(slug) : undefined) ?? DEFAULT_BUST;
  const resolvedArch =
    architecture ?? (architectureSlug ? getArchiveImage(architectureSlug) : undefined);

  return (
    <figure className={cn("flex flex-col", className)}>
      <div
        className="vp-marble relative w-full overflow-hidden"
        style={{ aspectRatio: aspect }}
      >
        {/* Background atmosphere layer — desaturated, low-opacity,
            with a radial mask that fades the edges into the marble
            surround. aria-hidden because it is decorative; the
            figure's accessible name comes from the foreground bust's
            alt text. */}
        {resolvedArch ? (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              maskImage:
                "radial-gradient(ellipse at center, rgba(0,0,0,0.95) 35%, rgba(0,0,0,0.55) 65%, transparent 90%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, rgba(0,0,0,0.95) 35%, rgba(0,0,0,0.55) 65%, transparent 90%)",
            }}
          >
            <Image
              src={resolvedArch.imagePath}
              alt=""
              fill
              sizes={sizes}
              priority={priority}
              className="h-full w-full object-cover opacity-[0.13] [filter:saturate(0.25)_contrast(1.05)_blur(0.5px)]"
            />
          </div>
        ) : null}

        {/* Foreground bust — full saturation, sits on top of the
            atmosphere layer. Slight bottom-right alignment so the
            background reads as space around the figure rather than
            as something cropped behind it. */}
        <Image
          src={resolvedBust.imagePath}
          alt={resolvedBust.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="relative h-full w-full object-cover [filter:saturate(0.88)_contrast(1.03)]"
        />
      </div>
      {showCaption ? (
        <figcaption className="mt-4 text-xs uppercase tracking-eyebrow text-stone">
          <span className="text-charcoal-100">{resolvedBust.caption}</span>
          <span aria-hidden> · </span>
          <span className="text-stone">{resolvedBust.attribution}</span>
        </figcaption>
      ) : null}
    </figure>
  );
}

/** Convenience export for callers that want to iterate buses or
 *  pre-resolve the bust at the call site. */
export { busts, getBust };
