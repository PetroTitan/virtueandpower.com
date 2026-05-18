import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/editorial/PageHeader";
import { Prose } from "@/components/editorial/Typography";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const PATH = "/about";
const TITLE = "About Virtue & Power";
const DESCRIPTION =
  "Why this platform exists, what we publish, and the editorial commitments that govern every entry.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "About", href: PATH },
        ])}
      />
      <PageHeader
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        eyebrow="About"
        title="A long-term intellectual platform."
        description="Virtue & Power exists to read classical philosophy, virtue, statecraft and the history of thought seriously — without flattening them into self-help or ideology."
      />

      <Container width="editorial" className="py-16 sm:py-20">
        <Prose as="article" dropCap>
          <p>
            Virtue &amp; Power is an editorial project on classical philosophy,
            virtue, power, leadership, statecraft, religion and the ancient
            world. It is not a personal blog and it is not a content site. It
            is a long-term effort to build a thoughtful, well-organised
            library of essays, entries on philosophers, guides to primary
            texts and traceable quotations — written for readers who take the
            material seriously.
          </p>

          <h2>Our intellectual focus</h2>
          <p>
            The work is anchored in the classical inheritance — Greek and
            Roman philosophy, the Hebrew and Christian scriptures, the long
            tradition of historical writing — and reads forward from there
            into the Christian, humanist and modern transformations of those
            ideas. We are interested in the questions classical thought kept
            returning to: the well-ordered life, the well-ordered city, the
            relation of virtue to power, the meaning of justice, the
            stewardship of civilization.
          </p>

          <h2>Commitment to primary sources</h2>
          <p>
            We work from primary texts and reputable critical editions and
            scholarship. When a quotation appears on this site, it carries
            its precise citation — a Stephanus page for Plato, a Bekker
            number for Aristotle, a book and chapter for the historians and
            theologians — so readers can verify it. We do not invent
            quotations, paraphrase and present the paraphrase as a quote, or
            attribute lines to figures who did not write them.
          </p>

          <h2>What we will not do</h2>
          <p>
            We are not a motivational platform and not an algorithmic content
            site. We will not publish auto-generated material, we will not
            launder slogans through ancient names, and we will not flatten
            difficult thinkers into easy lessons. The reading is the point.
          </p>

          <h2>The long view</h2>
          <p>
            Virtue &amp; Power is built as a multi-decade project. The
            architecture is designed to grow slowly and to last — clear
            sections, durable URLs, semantic HTML, server-rendered content,
            and entries that improve over years rather than weeks. We would
            rather publish one well-sourced essay than ten thin ones, and we
            will keep that ratio.
          </p>
        </Prose>
      </Container>
    </>
  );
}
