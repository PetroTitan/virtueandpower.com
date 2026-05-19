import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Museum-grade marble bust photography for the editorial surfaces.
 *
 * Images are public-domain (CC0) photographs vendored into
 * /public/images/busts. Each entry below names the work, the
 * photographer (where given), and the licence so the editor can verify
 * provenance without leaving the file. The hero uses MARCUS_AURELIUS
 * by default; the registry exists so essays / guides can later
 * reference specific busts inline.
 *
 * Sources are committed locally (rather than hot-linked) so the page
 * has no third-party dependency on Wikimedia's CDN and so the
 * file-system-traceable provenance lives in
 * /public/images/busts/README.md.
 */

export type Bust = {
  /** Local path under /public/. */
  src: string;
  /** Editorial alt text (sentence form, ends with a period). */
  alt: string;
  /** Caption used under the image; conventionally subject · period · medium. */
  caption: string;
  /** Source attribution rendered as a small tail on the caption. */
  attribution: string;
  /** Intrinsic dimensions of the file at /public/{src}. */
  width: number;
  height: number;
};

/**
 * Bust of Marcus Aurelius. 2nd century, marble. Archaeological Museum
 * of Heraklion, Crete.
 *
 * Vendored from Wikimedia Commons; CC-Zero (public-domain dedication).
 * See /public/images/busts/README.md for full provenance.
 */
export const MARCUS_AURELIUS: Bust = {
  src: "/images/busts/marcus-aurelius-heraklion.webp",
  alt: "Marble head of the Emperor Marcus Aurelius, 2nd century, Archaeological Museum of Heraklion.",
  caption: "Marcus Aurelius · 2nd century · Marble",
  attribution: "Archaeological Museum of Heraklion · Wikimedia Commons (CC0)",
  width: 1600,
  height: 2459,
};

type BustImageProps = {
  bust?: Bust;
  /** Set to true on above-the-fold images so Next preloads them. */
  priority?: boolean;
  /** Tailwind classes for the wrapping figure. */
  className?: string;
  /** Tailwind classes for the rendered <img>. */
  imageClassName?: string;
  /** Whether to render the small italic caption under the image. */
  showCaption?: boolean;
  /** Responsive sizes hint for Next/Image. */
  sizes?: string;
};

/**
 * Renders a bust as a sculptural focal point. Uses a portrait frame
 * with the image filling it via object-cover, so the composition holds
 * regardless of the source crop.
 *
 * The frame carries a subtle marble background (two faint radial
 * washes via .vp-marble) so that if the image fails to load — old
 * browser without WebP, decoded asset corruption, build mistake — the
 * hero still reads as an intentional stone plinth rather than an
 * obvious broken-image box. A tiny saturation pullback on the image
 * keeps the photograph reading as marble rather than as a postcard.
 */
export function BustImage({
  bust = MARCUS_AURELIUS,
  priority = false,
  className,
  imageClassName,
  showCaption = true,
  sizes = "(min-width: 1024px) 40vw, (min-width: 768px) 45vw, 100vw",
}: BustImageProps) {
  return (
    <figure className={cn("flex flex-col", className)}>
      <div className="vp-marble relative w-full overflow-hidden">
        <Image
          src={bust.src}
          alt={bust.alt}
          width={bust.width}
          height={bust.height}
          priority={priority}
          sizes={sizes}
          className={cn(
            "h-full w-full object-cover",
            // Very slight saturation pullback + a touch of contrast so
            // the marble reads as stone rather than as a colour photo.
            "[filter:saturate(0.85)_contrast(1.02)]",
            imageClassName,
          )}
        />
      </div>
      {showCaption ? (
        <figcaption className="mt-4 text-xs uppercase tracking-eyebrow text-stone">
          <span className="text-charcoal-100">{bust.caption}</span>
          <span aria-hidden> · </span>
          <span className="text-stone">{bust.attribution}</span>
        </figcaption>
      ) : null}
    </figure>
  );
}
