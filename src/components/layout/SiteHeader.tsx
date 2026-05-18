import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { Container } from "./Container";
import { MobileNav, PrimaryNav } from "./PrimaryNav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-ivory/85 backdrop-blur supports-[backdrop-filter]:bg-ivory/70">
      <div className="relative">
        <Container width="wide" className="flex items-center justify-between gap-8 py-4 md:py-5">
          <Link
            href="/"
            aria-label={`${siteConfig.name} — home`}
            className="group inline-flex items-baseline gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
          >
            <span className="font-serif text-xl tracking-tight text-charcoal sm:text-2xl">
              Virtue <span className="text-bronze">&amp;</span> Power
            </span>
          </Link>

          <PrimaryNav items={siteConfig.primaryNav} />
          <MobileNav items={siteConfig.primaryNav} />
        </Container>
      </div>
    </header>
  );
}
