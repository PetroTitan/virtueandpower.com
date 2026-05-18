import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/editorial/PageHeader";
import { Prose } from "@/components/editorial/Typography";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const PATH = "/editorial-policy";
const TITLE = "Editorial policy";
const DESCRIPTION =
  "The editorial standards that govern Virtue & Power — primary sources, citation discipline, the no-invented-quotations rule, and how stub material is treated.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default function EditorialPolicyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Editorial policy", href: PATH },
        ])}
      />
      <PageHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Editorial policy" },
        ]}
        eyebrow="Editorial"
        title="The standards that govern this platform."
        description="Virtue & Power exists to read classical thought seriously. These are the rules we keep so that the reading stays trustworthy."
      />

      <Container width="editorial" className="py-16 sm:py-20">
        <Prose as="article">
          <p>
            Virtue &amp; Power is a long-term editorial project. It is not a
            personal blog, an algorithmic content site, or a vehicle for
            modern slogans dressed in ancient names. The policy below is what
            makes that claim verifiable; everything else on the platform is
            written against it.
          </p>

          <h2>1. Editorial standards</h2>
          <p>
            Every entry on this site is written and reviewed by a human
            editor. We use software for layout, typography, navigation and
            search — never for the substantive claims of the text. An entry
            is treated as authoritative only after a named editor has read
            the relevant primary text and the surrounding scholarship and
            judged the entry accurate, fair and appropriately cautious.
          </p>

          <h2>2. Historical accuracy</h2>
          <p>
            We work from the historical record and from the primary texts as
            they have come down to us, with attention to the conditions of
            their transmission. Where a fact is contested, we say so. Where
            a date or attribution is uncertain (which, for the ancient
            world, is often), we mark it as approximate or attributed
            rather than presenting it as settled.
          </p>
          <p>
            We do not modernise the texts to fit current preoccupations,
            and we do not flatten them to make them more palatable. The
            point of the project is to read what is there.
          </p>

          <h2>3. Primary sources</h2>
          <p>
            Editorial entries on a thinker, work or theme are grounded in
            the primary text itself: the dialogue, the treatise, the
            historical narrative, the scripture. Standard critical editions
            and the open-access archives that mirror them are listed on the{" "}
            <Link href="/sources" className="vp-link">Sources</Link> page,
            which is the canonical place to look up which editions we work
            from.
          </p>
          <p>
            Secondary scholarship is consulted, cited where it changes the
            reading, and never substituted for the text. We do not treat a
            recent monograph as if it were the work it discusses.
          </p>

          <h2>4. Summary, interpretation and commentary</h2>
          <p>
            We try to make the difference between three modes explicit:
          </p>
          <ul>
            <li>
              <strong>Factual summary</strong> — what the text says, the
              structure of an argument, the historical setting, the
              transmission of the work. These claims should be uncontested
              or marked as approximate.
            </li>
            <li>
              <strong>Interpretation</strong> — what the argument means and
              how it hangs together. These claims should be defensible from
              the text; where serious scholars disagree, we note it.
            </li>
            <li>
              <strong>Editorial commentary</strong> — what we think the
              text is doing or how it bears on later thought. These claims
              are clearly the editor speaking, not the source.
            </li>
          </ul>

          <h2>5. Citation discipline</h2>
          <p>
            Every quotation carries the citation conventions appropriate
            to the work. For Plato we cite by Stephanus pages (e.g.{" "}
            <em>Republic</em> 514a). For Aristotle we cite by Bekker
            numbers (e.g. <em>Nicomachean Ethics</em> 1103a). For
            historians, scriptures and other classical works we cite by
            book, chapter and section as their tradition uses them. The
            translator and the edition cited are named where it matters.
          </p>
          <p>
            We do not paraphrase a passage and then present the paraphrase
            in quotation marks. We do not attribute lines to figures who
            did not write them. If a passage is widely quoted but its
            actual source is uncertain or apocryphal, we either omit it
            or say plainly that the attribution is uncertain.
          </p>

          <h2>6. No invented quotations</h2>
          <p>
            This is the rule the whole site is built around: no
            fabricated quotations, no fabricated citations, no smooth
            modern restatement passed off as an ancient line. If a passage
            cannot be located in a primary text or established critical
            edition, it does not appear on this site as a quotation.
          </p>
          <p>
            Many of the most widely shared "classical" quotations on the
            modern web fail this test. We will publish a smaller library
            for that reason.
          </p>

          <h2>7. How stub content is treated</h2>
          <p>
            Entries are published in two states: <em>stub</em> and{" "}
            <em>published</em>. A stub is a clearly-marked placeholder for
            an entry that has been scoped but not yet written or reviewed
            in full. Stub pages are visible inside the site so the
            structure is legible, but they are excluded from the search
            index, the sitemap and the RSS feed; they also carry a
            standing notice that no specific claims have been added yet.
          </p>
          <p>
            A stub becomes a published entry only after a human editor has
            written the substantive content, checked the sources, and
            signed off. There is no automated path from stub to published.
          </p>

          <h2>8. Review and corrections</h2>
          <p>
            Editorial mistakes happen. When they do, we correct the entry
            and note that it has been corrected. We do not silently rewrite
            a published entry to obscure the earlier version's errors. If
            you find a mistake on this site — a misattribution, a
            misleading paraphrase, an inaccurate date — we want to hear
            about it.
          </p>

          <h2>9. Conflicts of interest</h2>
          <p>
            Virtue &amp; Power is not affiliated with any political party,
            religious institution, school of contemporary philosophy, or
            commercial publisher. We will disclose any future
            relationships that could reasonably be thought to affect the
            editorial line.
          </p>

          <p className="mt-12 border-t border-rule pt-8 text-sm text-stone">
            This policy is itself a living document. It will be amended as
            the project matures. Material changes will be noted with the
            date of revision.
          </p>
        </Prose>
      </Container>
    </>
  );
}
