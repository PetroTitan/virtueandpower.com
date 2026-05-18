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
};

export function StudyLanding({
  path,
  eyebrow,
  title,
  description,
  body,
  related,
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
    </>
  );
}
