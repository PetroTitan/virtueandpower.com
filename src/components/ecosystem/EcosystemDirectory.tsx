/**
 * EcosystemDirectory — the body of the "Explore all products" panel.
 *
 * Loaded lazily (see EcosystemPanel), so none of this markup is in the initial
 * bundle or the initial HTML. Two sections, both derived entirely from the
 * registry: every ecosystem website, then every mobile application.
 *
 * Default export because it is the target of a `next/dynamic` import.
 */
import {
  getAppProducts,
  getWebProducts,
  totalProductCount,
} from "@/lib/ecosystem/products";
import {
  CURRENT_PRODUCT_ID,
  ECOSYSTEM_COPY,
  HELPERG_HOME_URL,
  trackEcosystemEvent,
} from "@/lib/ecosystem/config";
import { AppProductCard, WebProductCard } from "./EcosystemProductCard";
import { ArrowRightIcon } from "./icons";

function SectionHeading({ id, children }: { id: string; children: string }) {
  return (
    <h3
      id={id}
      className="mb-3 text-[10px] uppercase tracking-[0.2em] text-stone"
    >
      {children}
    </h3>
  );
}

export default function EcosystemDirectory() {
  const webProducts = getWebProducts();
  const appProducts = getAppProducts();

  return (
    <div>
      <p className="mb-5 max-w-prose text-[12.5px] leading-relaxed text-stone">
        {ECOSYSTEM_COPY.panelIntro}
      </p>

      <section aria-labelledby="eco-sec-web">
        <SectionHeading id="eco-sec-web">Web Products</SectionHeading>
        <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {webProducts.map((product) => (
            <WebProductCard key={product.id} product={product} />
          ))}
        </ul>
      </section>

      <section aria-labelledby="eco-sec-apps" className="mt-7">
        <SectionHeading id="eco-sec-apps">Mobile Apps</SectionHeading>
        <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {appProducts.map((product) => (
            <AppProductCard key={product.id} product={product} />
          ))}
        </ul>
      </section>

      <div className="mt-7 flex flex-col items-start gap-3 border-t border-rule pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[11px] text-stone">
          {webProducts.length} web products and {appProducts.length} mobile apps
          — {totalProductCount()} in the HELPERG ecosystem.
        </p>
        <a
          href={HELPERG_HOME_URL}
          target="_blank"
          rel="noopener"
          onClick={() =>
            trackEcosystemEvent("ecosystem_product_click", {
              sourceProduct: CURRENT_PRODUCT_ID,
              targetProduct: "helperg",
              platform: "website",
              placement: "directory-footer",
              currentPath:
                typeof window !== "undefined"
                  ? window.location.pathname
                  : undefined,
            })
          }
          className="inline-flex items-center gap-1.5 border-b border-transparent pb-0.5 text-[10px] uppercase tracking-[0.16em] text-charcoal-100 transition-colors duration-150 hover:border-bronze hover:text-bronze motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze"
        >
          Visit HELPERG.com
          <ArrowRightIcon size={11} />
          <span className="sr-only"> — opens in a new tab</span>
        </a>
      </div>
    </div>
  );
}
