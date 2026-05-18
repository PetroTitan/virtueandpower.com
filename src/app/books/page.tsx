import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/editorial/PageHeader";
import { EditorialGrid } from "@/components/editorial/EditorialGrid";
import { BookCard } from "@/components/editorial/BookCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBooks } from "@/content/loader";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const PATH = "/books";
const TITLE = "Books";
const DESCRIPTION =
  "Editorial guides to the foundational works of classical philosophy, statecraft, history and religion.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default async function BooksIndex() {
  const books = await getBooks();
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Books", href: PATH },
        ])}
      />
      <PageHeader
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Books" }]}
        eyebrow="Library"
        title="Books"
        description={DESCRIPTION}
      />
      <Container width="editorial" className="py-16">
        {books.length ? (
          <EditorialGrid columns={3}>
            {books.map((b) => (
              <BookCard
                key={b.slug}
                slug={b.slug}
                title={b.frontmatter.title}
                author={b.frontmatter.author}
                period={b.frontmatter.period}
                summary={b.frontmatter.description}
              />
            ))}
          </EditorialGrid>
        ) : (
          <p className="text-charcoal-100">No entries yet.</p>
        )}
      </Container>
    </>
  );
}
