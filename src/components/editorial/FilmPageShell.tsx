import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/editorial/PageHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { FILM_PAGES, NOLAN_ODYSSEY } from "@/data/films";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";

const FILM_ROOT = `/films/${NOLAN_ODYSSEY.slug}`;

/**
 * Shared shell for the eight pages of the film cluster.
 *
 * Every page in the cluster carries the same three things, which is why
 * they live here rather than being repeated eight times: the breadcrumb
 * and Article JSON-LD, the sibling navigation drawn from the film-pages
 * registry, and the standing note on how the platform sources claims
 * about the film. That note is not decoration — it is the reason a
 * reader should trust any of the criticism, so it appears on every page
 * that makes a criticism.
 */
export function FilmPageShell({
  path,
  eyebrow,
  title,
  description,
  meta,
  children,
  aside,
}: {
  path: string;
  eyebrow: string;
  title: string;
  description: string;
  meta?: string;
  children: ReactNode;
  aside?: ReactNode;
}) {
  const siblings = FILM_PAGES.filter((p) => p.path !== path);
  const isHub = path === FILM_ROOT;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(
            isHub
              ? [
                  { name: "Home", href: "/" },
                  { name: "Films", href: "/films" },
                  { name: "Christopher Nolan's The Odyssey", href: FILM_ROOT },
                ]
              : [
                  { name: "Home", href: "/" },
                  { name: "Films", href: "/films" },
                  { name: "Christopher Nolan's The Odyssey", href: FILM_ROOT },
                  { name: title, href: path },
                ],
          ),
          articleJsonLd({
            headline: title,
            description,
            url: path,
            dateModified: "2026-07-28",
            section: "Films",
          }),
        ]}
      />
      <PageHeader
        breadcrumbs={
          isHub
            ? [
                { label: "Home", href: "/" },
                { label: "Films", href: "/films" },
                { label: "The Odyssey (2026)" },
              ]
            : [
                { label: "Home", href: "/" },
                { label: "Films", href: "/films" },
                { label: "The Odyssey (2026)", href: FILM_ROOT },
                { label: title },
              ]
        }
        eyebrow={eyebrow}
        title={title}
        description={description}
        meta={meta}
      />
      <Container width="editorial" className="py-16">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-8">{children}</div>
          <aside className="md:col-span-4 md:border-l md:border-rule md:pl-10">
            <div className="border-l-2 border-rule bg-parchment-50 py-5 pl-5 pr-4">
              <p className="text-xs uppercase tracking-eyebrow text-stone">
                How these pages are sourced
              </p>
              <p className="mt-3 text-sm leading-relaxed text-charcoal-100">
                Claims about the film are drawn from published accounts of
                the completed release, never from trailers, promotional
                stills, casting announcements or social media. Claims about
                the poem are cited by book and line. Every departure the
                platform alleges exists first in the{" "}
                <Link
                  href={`${FILM_ROOT}/what-the-film-changed`}
                  className="vp-link"
                >
                  adaptation-claims ledger
                </Link>{" "}
                with its evidence attached, and low-confidence entries are
                never restated here as definitive.
              </p>
            </div>
            {aside}
            <p className="vp-eyebrow mt-8">Elsewhere in this analysis</p>
            <ul className="mt-3 space-y-2 text-sm">
              {siblings.map((p) => (
                <li key={p.path}>
                  <Link href={p.path} className="vp-link text-charcoal-100">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="vp-eyebrow mt-8">The poem itself</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/books/odyssey" className="vp-link text-charcoal-100">
                  The Odyssey
                </Link>
              </li>
              <li>
                <Link
                  href="/books/odyssey/book-1"
                  className="vp-link text-charcoal-100"
                >
                  Book by book
                </Link>
              </li>
              <li>
                <Link href="/figures" className="vp-link text-charcoal-100">
                  Figures of the tradition
                </Link>
              </li>
              <li>
                <Link href="/homer" className="vp-link text-charcoal-100">
                  Homer
                </Link>
              </li>
              <li>
                <Link
                  href="/homer-and-history"
                  className="vp-link text-charcoal-100"
                >
                  Homer and history
                </Link>
              </li>
              <li>
                <Link
                  href="/essays/hollywood-historical-casting-and-european-antiquity"
                  className="vp-link text-charcoal-100"
                >
                  When adaptation becomes replacement
                </Link>
              </li>
            </ul>
          </aside>
        </div>
      </Container>
    </>
  );
}
