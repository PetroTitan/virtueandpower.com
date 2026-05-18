import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type SectionIntroProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "start" | "center";
  href?: string;
  hrefLabel?: string;
  className?: string;
};

export function SectionIntro({
  eyebrow,
  title,
  description,
  align = "start",
  href,
  hrefLabel = "Read more",
  className,
}: SectionIntroProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? <p className="vp-eyebrow">{eyebrow}</p> : null}
      <h2 className="mt-3 font-serif text-display-2 text-charcoal">{title}</h2>
      {description ? (
        <p className="mt-4 font-serif text-lede text-charcoal-100">{description}</p>
      ) : null}
      {href ? (
        <p className="mt-6">
          <Link href={href} className="vp-link text-sm uppercase tracking-eyebrow">
            {hrefLabel}
          </Link>
        </p>
      ) : null}
    </div>
  );
}
