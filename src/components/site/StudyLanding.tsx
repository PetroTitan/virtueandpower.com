import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/editorial/PageHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

type StudyLandingProps = {
  path: string;
  eyebrow: string;
  title: string;
  description: string;
  body: ReactNode;
  related: Array<{ href: string; label: string }>;
  /** Optional civilizational anchor — typically an ArchiveImage or
   *  BustImage — rendered between the header and the body grid as a
   *  full-width composition. Use sparingly: study landings work
   *  without it. */
  hero?: ReactNode;
  /** Optional full-width composition rendered after the body /
   *  related grid — typically a FiguresStrip with the era's
   *  principal figures. */
  afterBody?: ReactNode;
};

export function StudyLanding({
  path,
  eyebrow,
  title,
  description,
  body,
  related,
  hero,
  afterBody,
}: StudyLandingProps) {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: title, href: path },
        ])}
      />
      <PageHeader
        breadcrumbs={[{ label: "Home", href: "/" }, { label: title }]}
        eyebrow={eyebrow}
        title={title}
        description={description}
      />
      {hero ? (
        <Container width="editorial" className="pt-4 pb-12">
          {hero}
        </Container>
      ) : null}
      <Container width="editorial" className="py-16">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-8">
            <div className="vp-prose">{body}</div>
          </div>
          <aside className="md:col-span-4 md:border-l md:border-rule md:pl-10">
            <p className="vp-eyebrow">Read across the library</p>
            <ul className="mt-3 space-y-2 text-sm">
              {related.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="vp-link text-charcoal-100">
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Container>
      {afterBody ? (
        <Container width="editorial" className="border-t border-rule py-20">
          {afterBody}
        </Container>
      ) : null}
    </>
  );
}
