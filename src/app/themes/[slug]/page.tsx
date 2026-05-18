import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/editorial/PageHeader";
import { RelatedReading } from "@/components/editorial/RelatedReading";
import { StubNotice } from "@/components/editorial/StubNotice";
import { JsonLd } from "@/components/seo/JsonLd";
import { MdxContent } from "@/content/mdx";
import {
  getEntryBySlug,
  getThemes,
  hrefFor,
  resolveRefs,
} from "@/content/loader";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  buildMetadata,
} from "@/lib/seo";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const all = await getThemes();
  return all.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getEntryBySlug("theme", slug);
  if (!entry) return {};
  return buildMetadata({
    title: entry.frontmatter.title,
    description: entry.frontmatter.description,
    path: hrefFor("theme", slug),
    type: "article",
    modifiedTime: entry.frontmatter.updated,
  });
}

export default async function ThemePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const entry = await getEntryBySlug("theme", slug);
  if (!entry) notFound();

  const fm = entry.frontmatter;
  const path = hrefFor("theme", slug);
  const related = await resolveRefs(fm.related);
  const keyThinkers = await resolveRefs(fm.keyThinkers);
  const keyTexts = await resolveRefs(fm.keyTexts);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", href: "/" },
            { name: "Themes", href: "/themes" },
            { name: fm.title, href: path },
          ]),
          articleJsonLd({
            headline: fm.title,
            description: fm.description,
            url: path,
            dateModified: fm.updated,
            section: "Themes",
          }),
        ]}
      />
      <PageHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Themes", href: "/themes" },
          { label: fm.title },
        ]}
        eyebrow={fm.domain}
        title={fm.title}
        description={fm.description}
      />
      <Container width="editorial" className="py-16">
        <div className="grid gap-16 md:grid-cols-12">
          <article className="md:col-span-8">
            {fm.status === "stub" ? <StubNotice /> : null}
            <MdxContent source={entry.body} />
          </article>
          <aside className="md:col-span-4 md:border-l md:border-rule md:pl-10 space-y-8">
            {keyThinkers.length ? (
              <div>
                <p className="vp-eyebrow">Key thinkers</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {keyThinkers.map(({ ref, entry: e }) => (
                    <li key={`${ref.kind}-${ref.slug}`}>
                      <a
                        href={hrefFor(ref.kind, ref.slug)}
                        className="vp-link text-charcoal-100"
                      >
                        {e.frontmatter.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {keyTexts.length ? (
              <div>
                <p className="vp-eyebrow">Key texts</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {keyTexts.map(({ ref, entry: e }) => (
                    <li key={`${ref.kind}-${ref.slug}`}>
                      <a
                        href={hrefFor(ref.kind, ref.slug)}
                        className="vp-link text-charcoal-100"
                      >
                        <cite className="not-italic">{e.frontmatter.title}</cite>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>
        </div>
        <RelatedReading
          items={related.map(({ ref, entry: e }) => ({
            href: hrefFor(ref.kind, ref.slug),
            title: e.frontmatter.title,
            kind: ref.kind,
            excerpt: e.frontmatter.description,
          }))}
        />
      </Container>
    </>
  );
}
