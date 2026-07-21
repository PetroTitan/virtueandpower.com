/**
 * EcosystemTimeline — the company timeline rendered in the banner.
 *
 * Server component. Every node is a real, crawlable `<a href>` in the initial
 * HTML except the current site, which is a non-link marked `aria-current`
 * (linking a page to itself from every page would be a site-wide self-
 * referential external link). No JavaScript is required for any of it.
 *
 * The current product is `timelineOrder: 1`, so it is the first node and stays
 * visible at scroll-left 0 on every viewport — the horizontal scroller never
 * needs to be programmatically positioned.
 */
import { cn } from "@/lib/cn";
import {
  getTimelineProducts,
  primaryWebPlatform,
  type EcosystemProduct,
} from "@/lib/ecosystem/products";

function TimelineNode({
  product,
  isCurrent,
  showConnector,
}: {
  product: EcosystemProduct;
  isCurrent: boolean;
  showConnector: boolean;
}) {
  const label = product.shortName ?? product.name;
  const href = primaryWebPlatform(product)?.url;

  return (
    <li className="flex shrink-0 items-center">
      {showConnector && (
        <span
          aria-hidden="true"
          className="mx-2 h-px w-3 shrink-0 bg-rule lg:w-5"
        />
      )}

      {isCurrent ? (
        <span
          aria-current="page"
          className="inline-flex items-center gap-1.5 whitespace-nowrap py-1 text-[12px] font-medium text-charcoal"
        >
          <span
            aria-hidden="true"
            className="h-[5px] w-[5px] shrink-0 rounded-full bg-bronze"
          />
          {label}
          <span className="sr-only"> — the site you are on</span>
        </span>
      ) : (
        <a
          href={href}
          target="_blank"
          rel="noopener"
          // The "opens in a new tab" hint is carried on aria-label rather than
          // in a visually-hidden span: `.sr-only` is `position:absolute`, and
          // 15 of them inside this horizontal scroller measurably enlarge the
          // page's scrollable width (see the note in EcosystemBar). The label
          // begins with the visible text, so WCAG 2.5.3 Label in Name holds.
          aria-label={`${product.name} — opens in a new tab`}
          className={cn(
            "inline-flex items-center whitespace-nowrap border-b border-transparent py-1 text-[12px] text-stone",
            "transition-colors duration-150 motion-reduce:transition-none hover:border-stone-50 hover:text-charcoal",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze",
          )}
        >
          {label}
        </a>
      )}
    </li>
  );
}

export function EcosystemTimeline({
  currentProductId,
}: {
  currentProductId: string;
}) {
  const products = getTimelineProducts();

  return (
    <ol className="flex items-center">
      {products.map((product, index) => (
        <TimelineNode
          key={product.id}
          product={product}
          isCurrent={product.id === currentProductId}
          showConnector={index > 0}
        />
      ))}
    </ol>
  );
}
