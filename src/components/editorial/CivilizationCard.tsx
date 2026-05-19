import Image from "next/image";
import Link from "next/link";
import { getArchiveImage } from "@/data/archive-images";

type CivilizationCardProps = {
  slug: string;
  title: string;
  subtitle?: string;
  period?: string;
  description: string;
  heroImage?: string;
};

/**
 * Card used by the /civilizations index. The composition is the same
 * as the museum-catalogue plates on /philosophers — a landscape crop
 * of the civilization's hero image at the top, then title + period
 * eyebrow + subtitle + description, with the whole card linking to
 * the civilization's hub page.
 */
export function CivilizationCard({
  slug,
  title,
  subtitle,
  period,
  description,
  heroImage,
}: CivilizationCardProps) {
  const href = `/civilizations/${slug}`;
  const hero = heroImage ? getArchiveImage(heroImage) : undefined;
  return (
    <article className="group flex h-full flex-col">
      {hero ? (
        <Link
          href={href}
          aria-label={`${title} — read the civilization hub`}
          className="vp-marble relative mb-6 block aspect-[4/3] w-full overflow-hidden"
        >
          <Image
            src={hero.imagePath}
            alt={hero.alt}
            fill
            sizes="(min-width: 1024px) 42vw, (min-width: 768px) 50vw, 100vw"
            className="h-full w-full object-cover [filter:saturate(0.85)_contrast(1.02)] transition-transform duration-500 group-hover:scale-[1.015]"
          />
        </Link>
      ) : null}
      {period ? (
        <p className="vp-eyebrow border-b border-rule pb-3">{period}</p>
      ) : null}
      <h3 className="mt-5 font-serif text-heading-1 text-charcoal">
        <Link href={href}>{title}</Link>
      </h3>
      {subtitle ? (
        <p className="mt-2 font-serif italic text-stone">{subtitle}</p>
      ) : null}
      <p className="mt-5 text-charcoal-100">{description}</p>
      <p className="mt-auto pt-7">
        <Link
          href={href}
          className="inline-flex items-center text-sm uppercase tracking-eyebrow text-bronze"
        >
          Enter {title}
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
