/**
 * EcosystemBar — the globally mounted HELPERG ecosystem strip.
 *
 * Mounted once at the very top of the root layout, above the site header, as
 * the top layer of a coordinated sticky stack. It is a server component: the
 * identity, the full company timeline and the trigger markup are all present
 * in the initial HTML. Only the "Explore all products" panel behaviour is a
 * client island, and the panel's contents are a lazily-loaded chunk.
 *
 * Height is driven by `--ecosystem-bar-height` (see globals.css) and the site
 * header offsets itself by exactly the same value, so the two never overlap
 * and the bar contributes no layout shift.
 */
import { Container } from "@/components/layout/Container";
import { CURRENT_PRODUCT_ID, ECOSYSTEM_COPY } from "@/lib/ecosystem/config";
import { EcosystemTimeline } from "./EcosystemTimeline";
import { EcosystemPanel } from "./EcosystemPanel";
import { EcosystemMarkIcon } from "./icons";

export function EcosystemBar() {
  return (
    <nav
      aria-label={ECOSYSTEM_COPY.navLabel}
      className="sticky top-0 z-[60] h-[var(--ecosystem-bar-height)] border-b border-rule bg-white pt-[env(safe-area-inset-top)] print:hidden"
    >
      <Container
        width="wide"
        className="flex h-full items-center gap-3 md:gap-5"
      >
        {/* ── Left: ecosystem identity ─────────────────────────────────── */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
          <EcosystemMarkIcon size={13} className="shrink-0 text-bronze" />
          <span className="flex flex-col justify-center leading-none">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-charcoal">
              HELPERG
              <span className="hidden sm:inline"> Ecosystem</span>
            </span>
            <span className="mt-[4px] hidden text-[9px] uppercase tracking-[0.14em] text-stone md:inline">
              {ECOSYSTEM_COPY.tagline}
            </span>
          </span>
        </div>

        <span
          aria-hidden="true"
          className="hidden h-4 w-px shrink-0 bg-rule md:block"
        />

        {/* ── Centre: the company timeline ─────────────────────────────── */}
        {/* Horizontally scrollable at every width; the current product is the
            first node, so it is always in view without any scripting.

            `relative` is load-bearing: the timeline links carry `sr-only`
            spans, and `.sr-only` is `position:absolute`. Without a positioned
            ancestor here their containing block would be the sticky <nav>,
            which puts them outside this scroller's clip — their static
            positions then extend the page's scrollable width by ~700px.

            `self-stretch` + centring is also load-bearing: `overflow-x: auto`
            computes `overflow-y` to `auto`, making this a clip box on both
            axes. Sized to its content it would clip the timeline links' 2px
            offset focus rings; stretched to the full 48px bar it has room to
            paint them. */}
        <div className="eco-scroll relative flex min-w-0 flex-1 items-center self-stretch overflow-x-auto">
          <EcosystemTimeline currentProductId={CURRENT_PRODUCT_ID} />
        </div>

        {/* ── Right: directory trigger ─────────────────────────────────── */}
        {/* Hairline closing the scroll region, mirroring the one after the
            identity block. It gives the timeline's right-hand cut-off a
            deliberate boundary instead of letting names run into the CTA. */}
        <span
          aria-hidden="true"
          className="hidden h-4 w-px shrink-0 bg-rule md:block"
        />
        <EcosystemPanel />
      </Container>
    </nav>
  );
}
