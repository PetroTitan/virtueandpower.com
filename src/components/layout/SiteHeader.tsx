import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { Container } from "./Container";

export function SiteHeader() {
  return (
    <header className="border-b border-rule bg-ivory/90 backdrop-blur supports-[backdrop-filter]:bg-ivory/70">
      <Container width="wide" className="flex items-center justify-between gap-8 py-5">
        <Link
          href="/"
          aria-label={`${siteConfig.name} — home`}
          className="group inline-flex items-baseline gap-3"
        >
          <span className="font-serif text-2xl tracking-tight text-charcoal">
            Virtue <span className="text-bronze">&amp;</span> Power
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-7 text-sm">
            {siteConfig.primaryNav.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/${item.slug}`}
                  className="text-charcoal-100 transition-colors hover:text-bronze"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:hidden">
          <details className="relative">
            <summary
              aria-label="Open menu"
              className="cursor-pointer list-none rounded border border-rule px-3 py-1.5 text-sm text-charcoal-100"
            >
              Menu
            </summary>
            <ul className="absolute right-0 top-full mt-2 w-56 rounded border border-rule bg-ivory p-3 shadow-sm">
              {siteConfig.primaryNav.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/${item.slug}`}
                    className="block rounded px-2 py-2 text-sm text-charcoal-100 hover:bg-parchment-50"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </Container>
    </header>
  );
}
