import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { Container } from "./Container";
import { MobileNav, PrimaryNav } from "./PrimaryNav";

/**
 * Sticky site chrome.
 *
 * Translucent white over the page, hairline silver divider, and a
 * one-line layout: wordmark on the left, nav on the right, equal
 * vertical air on both sides. Nav typography is uppercase 13px with
 * 0.18em tracking — reads like a museum-publication index rather than
 * a SaaS top bar.
 *
 * The wordmark sits at text-2xl with a small uppercase classification
 * line beneath ("An intellectual platform") on desktop so the brand
 * presence holds even without the body content scrolled in.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75">
      <div className="relative">
        <Container
          width="wide"
          className="flex items-center justify-between gap-8 py-6 md:py-7"
        >
          <Link
            href="/"
            aria-label={`${siteConfig.name} — home`}
            className="group inline-flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            <span className="font-serif text-2xl tracking-tight text-charcoal sm:text-[1.6rem]">
              Virtue <span className="text-bronze">&amp;</span> Power
            </span>
            <span className="mt-0.5 hidden text-[10px] uppercase tracking-[0.28em] text-stone md:inline-block">
              An intellectual platform
            </span>
          </Link>

          <PrimaryNav items={siteConfig.primaryNav} />
          <MobileNav items={siteConfig.primaryNav} />
        </Container>
      </div>
    </header>
  );
}
