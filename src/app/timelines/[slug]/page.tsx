import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/editorial/PageHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { getTimeline, timelines } from "@/data/timelines";
import { articleJsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return timelines.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = getTimeline(slug);
  if (!t) return {};
  return buildMetadata({
    title: t.title,
    description: t.description,
    path: `/timelines/${slug}`,
    type: "article",
    modifiedTime: t.updated,
  });
}

export default async function TimelinePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const t = getTimeline(slug);
  if (!t) notFound();

  const path = `/timelines/${slug}`;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Timelines", href: "/timelines" },
            { name: t.title, href: path },
          ]),
          articleJsonLd({
            headline: t.title,
            description: t.description,
            url: path,
            dateModified: t.updated,
            section: "Timelines",
          }),
        ]}
      />
      <PageHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Timelines", href: "/timelines" },
          { label: t.title },
        ]}
        eyebrow={t.eyebrow}
        title={t.title}
        description={t.description}
      />
      <Container width="editorial" className="py-12">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-8">
            <div className="vp-prose mb-10">
              {t.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <ol className="space-y-6 border-l border-rule pl-6">
              {t.events.map((e, i) => (
                <li key={i} className="relative">
                  <span
                    aria-hidden
                    className="absolute -left-[1.6rem] top-1.5 h-2 w-2 rounded-full bg-bronze"
                  />
                  <p className="vp-eyebrow text-bronze">{e.date}</p>
                  <p className="mt-1 text-charcoal-100">{e.label}</p>
                </li>
              ))}
            </ol>
            <div className="vp-prose mt-10">
              <p>{t.closing}</p>
            </div>
          </div>
          <aside className="md:col-span-4 md:border-l md:border-rule md:pl-10">
            <p className="vp-eyebrow">Related</p>
            <ul className="mt-4 space-y-2 text-sm">
              {t.related.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="vp-link text-charcoal-100">
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="vp-eyebrow mt-8">More</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/timelines" className="vp-link text-charcoal-100">
                  All timelines
                </Link>
              </li>
              <li>
                <Link href="/maps" className="vp-link text-charcoal-100">
                  All maps
                </Link>
              </li>
            </ul>
          </aside>
        </div>
      </Container>
    </>
  );
}
