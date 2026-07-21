/**
 * ProductMonogram — the product icon used in the directory panel.
 *
 * A hairline-ruled square holding the product's hand-set wordmark initials in
 * the site serif. Deterministic, dependency-free and asset-free: no remote
 * logo files, no raster store badges, nothing to load or lay out late. It is
 * purely decorative — the product name is always rendered next to it — so it
 * is hidden from assistive technology.
 */
import { cn } from "@/lib/cn";
import type { EcosystemProduct } from "@/lib/ecosystem/products";

export function ProductMonogram({
  product,
  isCurrent = false,
  className,
}: {
  product: EcosystemProduct;
  isCurrent?: boolean;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex h-9 w-9 shrink-0 select-none items-center justify-center border font-serif leading-none",
        // Three-letter monograms ("V&P") need a smaller optical size than two.
        product.monogram.length > 2 ? "text-[11px]" : "text-[13px]",
        isCurrent
          ? "border-bronze/40 bg-bronze/[0.06] text-bronze"
          : "border-rule bg-parchment-50 text-charcoal-50",
        className,
      )}
    >
      {product.monogram}
    </span>
  );
}
