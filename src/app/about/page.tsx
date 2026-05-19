import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/editorial/PageHeader";
import { Prose } from "@/components/editorial/Typography";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const PATH = "/about";
const TITLE = "About Virtue & Power";
const DESCRIPTION =
  "An editorial archive on virtue, power, civilization and statecraft — drawn from primary texts and the long arc of historical thought, written for serious readers.";

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
        title="A long-term editorial archive on civilization, virtue and political order."
        description="Virtue & Power exists to read classical philosophy, virtue, statecraft and the history of thought seriously — to study the institutions, memory, religion, law, power and continuity of the civilizations the European tradition has not stopped reading."
      />

      <Container width="editorial" className="py-16 sm:py-20">
        <Prose as="article" dropCap>
          <p>
            Virtue &amp; Power is an editorial project on virtue, power,
            civilization, statecraft, leadership, religion and the ancient
            world. It is not a personal blog and it is not a content site. It
            is a long-term effort to build a thoughtful, well-organised
            library — entries on philosophers, statesmen and historians,
            interpretive readings of the primary texts, civilization hubs
            that frame the polities themselves, and a curated visual archive
            of museum-grade imagery — written for readers who take the
            material seriously.
          </p>

          <h2>What the platform studies</h2>
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
          <p>
            The civilization layer reads the polities themselves — Rome,
            Greece, Persia, Egypt and the others the corpus will grow into —
            as working answers to a small set of questions: what authority
            was, what law was for, what the citizen owed, how memory was
            kept, what the architecture and the army were the visible form
            of, how the order ended or transmitted itself. The figures,
            books, themes and essays sit inside that frame.
          </p>

          <h2>Source discipline</h2>
          <p>
            We work from primary texts and reputable critical editions and
            scholarship. When a quotation appears on this site, it carries
            its precise citation — a Stephanus page for Plato, a Bekker
            number for Aristotle, a book and chapter for the historians and
            theologians — so readers can verify it. We do not invent
            quotations, paraphrase a passage and present the paraphrase as a
            quote, or attribute lines to figures who did not write them. The
            full statement of these standards is on the{" "}
            <Link href="/editorial-policy" className="vp-link">
              editorial policy
            </Link>{" "}
            page; the texts and reference works we read from are catalogued
            on{" "}
            <Link href="/sources" className="vp-link">
              Sources
            </Link>
            .
          </p>

          <h2>Interpretive discipline</h2>
          <p>
            The library entries describe a thinker, a work or a theme on its
            own terms. The essays are willing to commit to a reading. The
            civilization hubs read the polity not as chronology but as a
            working answer to specific institutional, moral and
            architectural questions. In every register we prefer the patient
            interpretive paragraph to the slogan; we prefer the named
            scholar to the anonymous summary; we prefer the open question to
            the closed conclusion where the evidence does not justify the
            conclusion. The reading is the point.
          </p>

          <h2>Visual-archive discipline</h2>
          <p>
            The platform leans on museum-grade marble portrait photography,
            architecture and ruins as part of its editorial composition.
            Every image is locally vendored, with full provenance recorded
            in the typed registry (
            <Link href="https://github.com/PetroTitan/virtueandpower.com/blob/main/src/data/busts.ts" className="vp-link">
              src/data/busts.ts
            </Link>{" "}
            for portraits;{" "}
            <Link href="https://github.com/PetroTitan/virtueandpower.com/blob/main/src/data/archive-images.ts" className="vp-link">
              src/data/archive-images.ts
            </Link>{" "}
            for architecture and ruins). Inclusion criteria are deliberately
            strict: identification must be securely established by current
            scholarship; provenance must be documented; the licence must be
            verified (CC0 or public-domain preferred; CC-BY / CC-BY-SA only
            with the attribution carried in the rendered caption). No
            AI-generated imagery, no overprocessed material, no images whose
            rights status we have not verified.
          </p>

          <h2>What we will not do</h2>
          <p>
            We are not a motivational platform and not an algorithmic
            content site. We will not publish auto-generated material; we
            will not launder slogans through ancient names; we will not turn
            this archive into ideological propaganda, anti-religious
            polemic, or contemporary culture-war content. We will not flatten
            difficult thinkers into easy lessons.
          </p>

          <h2>The long view</h2>
          <p>
            Virtue &amp; Power is built as a multi-decade project. The
            architecture is designed to grow slowly and to last — clear
            sections, durable URLs, semantic HTML, server-rendered content,
            a typed content graph with backlinks, and entries that improve
            over years rather than weeks. We would rather publish one
            well-sourced essay than ten thin ones, and we will keep that
            ratio.
          </p>
        </Prose>
      </Container>
    </>
  );
}
