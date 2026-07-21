/**
 * Product cards for the ecosystem directory panel.
 *
 * Two shapes, because web platforms and mobile applications carry different
 * information:
 *   - `WebProductCard`  — icon, name, one-line description, "Open →".
 *   - `AppProductCard`  — icon, name, description, and one availability link
 *                         per store that genuinely exists.
 *
 * A platform is only ever rendered when a real url is present in the registry;
 * there are no disabled-looking controls and no placeholder store badges.
 *
 * These render inside the lazily-loaded client panel, so their click handlers
 * can emit the consent-safe ecosystem analytics events.
 */
import { cn } from "@/lib/cn";
import {
  CURRENT_PRODUCT_ID,
  trackEcosystemEvent,
} from "@/lib/ecosystem/config";
import {
  platformOfType,
  primaryWebPlatform,
  type EcosystemProduct,
  type ProductPlatform,
} from "@/lib/ecosystem/products";
import { ProductMonogram } from "./ProductMonogram";
import { AppleIcon, ArrowRightIcon, GooglePlayIcon } from "./icons";

function track(product: EcosystemProduct, platform: ProductPlatform) {
  trackEcosystemEvent("ecosystem_product_click", {
    sourceProduct: CURRENT_PRODUCT_ID,
    targetProduct: product.id,
    platform: platform.type,
    placement: "directory",
    currentPath:
      typeof window !== "undefined" ? window.location.pathname : undefined,
  });
}

// Layout only — deliberately carries no border/background colour. `cn` is a
// plain join with no tailwind-merge (src/lib/cn.ts), so a variant appending
// `border-bronze/30` on top of a `border-rule` in the shell would not win:
// the outcome would be decided by compiled-CSS order, not by intent. Each
// variant therefore supplies its own surface colours exactly once.
const cardShell =
  "flex h-full items-start gap-3 border p-3.5 transition-colors duration-150 motion-reduce:transition-none";

/** One ecosystem website. The current site is shown, but never linked. */
export function WebProductCard({ product }: { product: EcosystemProduct }) {
  const isCurrent = product.id === CURRENT_PRODUCT_ID;
  const platform = primaryWebPlatform(product);

  const body = (
    <>
      <ProductMonogram product={product} isCurrent={isCurrent} />
      <span className="min-w-0 flex-1">
        <span className="flex items-baseline justify-between gap-2">
          <span
            className={cn(
              "font-serif text-[15px] leading-snug",
              isCurrent ? "text-bronze" : "text-charcoal",
            )}
          >
            {product.name}
          </span>
          {isCurrent ? (
            <span className="shrink-0 text-[9px] uppercase tracking-[0.16em] text-bronze">
              You are here
            </span>
          ) : (
            <span className="inline-flex shrink-0 items-center gap-1 text-[9px] uppercase tracking-[0.16em] text-stone transition-colors duration-150 motion-reduce:transition-none group-hover:text-bronze">
              Open
              <ArrowRightIcon size={11} />
            </span>
          )}
        </span>
        <span className="mt-1 block text-[12.5px] leading-relaxed text-stone">
          {product.description}
        </span>
      </span>
    </>
  );

  if (isCurrent || !platform) {
    return (
      <li>
        <div
          aria-current={isCurrent ? "page" : undefined}
          className={cn(
            cardShell,
            // The registry validator guarantees every web product has a url,
            // so the `!platform` branch is defensive only — it must not
            // borrow the current-site highlight.
            isCurrent
              ? "border-bronze/30 bg-bronze/[0.03]"
              : "border-rule bg-white",
          )}
        >
          {body}
        </div>
      </li>
    );
  }

  return (
    <li>
      <a
        href={platform.url}
        target="_blank"
        rel="noopener"
        onClick={() => track(product, platform)}
        className={cn(
          cardShell,
          "group border-rule bg-white hover:border-charcoal-50",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze",
        )}
      >
        {body}
        <span className="sr-only"> — opens in a new tab</span>
      </a>
    </li>
  );
}

function AvailabilityLink({
  product,
  platform,
  label,
  icon,
}: {
  product: EcosystemProduct;
  platform: ProductPlatform;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={platform.url}
      target="_blank"
      rel="noopener"
      onClick={() => track(product, platform)}
      className={cn(
        "inline-flex min-h-[30px] items-center gap-1.5 border border-rule px-2.5 py-1",
        "text-[10px] uppercase tracking-[0.12em] text-charcoal-100",
        "transition-colors duration-150 motion-reduce:transition-none",
        "hover:border-bronze hover:text-bronze",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze",
      )}
    >
      <span className="shrink-0 text-stone">{icon}</span>
      {label}
      <span className="sr-only">
        {" "}
        — {product.name} on {platform.label}, opens in a new tab
      </span>
    </a>
  );
}

/** One mobile application. Only stores with a real url are rendered. */
export function AppProductCard({ product }: { product: EcosystemProduct }) {
  const ios = platformOfType(product, "ios");
  const android = platformOfType(product, "android");

  return (
    <li className={cn(cardShell, "border-rule bg-white")}>
      <ProductMonogram product={product} />
      <div className="min-w-0 flex-1">
        <h4 className="font-serif text-[15px] leading-snug text-charcoal">
          {product.name}
        </h4>
        <p className="mt-1 text-[12.5px] leading-relaxed text-stone">
          {product.description}
        </p>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {ios && (
            <AvailabilityLink
              product={product}
              platform={ios}
              label="Available on iOS"
              icon={<AppleIcon size={12} />}
            />
          )}
          {android && (
            <AvailabilityLink
              product={product}
              platform={android}
              label="Available on Android"
              icon={<GooglePlayIcon size={12} />}
            />
          )}
        </div>
      </div>
    </li>
  );
}
