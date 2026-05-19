import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { Container } from "./Container";

const currentYear = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer className="mt-28 border-t border-rule bg-white">
      <Container width="wide" className="py-20">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl tracking-tight text-charcoal">
                Virtue <span className="text-bronze">&amp;</span> Power
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-charcoal-100">
              An intellectual platform on classical philosophy, virtue, power
              and the long arc of civilization. Grounded in primary sources
              and the history of thought.
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-8">
            <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
              {Object.entries(siteConfig.footerNav).map(([group, items]) => (
                <div key={group}>
                  <h2 className="vp-eyebrow mb-4">{group}</h2>
                  <ul className="space-y-1 text-sm">
                    {items.map((item) => (
                      <li key={item.slug}>
                        <Link
                          href={`/${item.slug}`}
                          className="-mx-1 inline-block min-h-[36px] px-1 py-1 leading-snug text-charcoal-100 transition-colors hover:text-charcoal"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-rule pt-10 text-xs text-stone md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <p className="max-w-md text-stone">
            Virtue &amp; Power cites primary texts and historical
            scholarship. We do not fabricate quotations or sources.
          </p>
        </div>
      </Container>
    </footer>
  );
}
