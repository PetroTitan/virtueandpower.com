import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/editorial/PageHeader";
import { Prose } from "@/components/editorial/Typography";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const PATH = "/terms";
const TITLE = "Terms";
const DESCRIPTION =
  "The basic terms of use for Virtue & Power — what we publish, how we'd like it cited, and the customary disclaimers.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

const LAST_UPDATED = "2026-05-19";

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Terms", href: PATH },
        ])}
      />
      <PageHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Terms" },
        ]}
        eyebrow="Trust"
        title="Terms"
        description={DESCRIPTION}
        meta={`Last updated · ${LAST_UPDATED}`}
      />

      <Container width="editorial" className="py-16 sm:py-20">
        <Prose as="article">
          <p>
            Virtue &amp; Power is a public, free-to-read editorial site.
            These terms set out the basic understanding between the site
            and the people who read it.
          </p>

          <h2>Use of the site</h2>
          <p>
            You are welcome to read, link to, and discuss anything
            published here. You do not need an account; there is no
            login. Standard web etiquette applies: please do not attempt
            to disrupt the platform or to scrape it in ways that would
            burden the host.
          </p>

          <h2>Quotation and reuse</h2>
          <p>
            Short quotations from our entries are welcome under ordinary
            fair-use / fair-dealing principles. When you quote or
            paraphrase substantively, please link to the specific entry
            and attribute it to <em>Virtue &amp; Power</em>. Where the
            entry itself cites a primary text, citing the primary text
            is preferable to citing this site as the source of the
            claim.
          </p>
          <p>
            Substantial republication of an entry — copying the body of
            an essay onto another site — is not permitted without
            permission. Reach out through the project&rsquo;s public
            repository if you have a use in mind.
          </p>

          <h2>Editorial standards</h2>
          <p>
            We work to the standards described on the{" "}
            <Link href="/editorial-policy" className="vp-link">
              editorial policy
            </Link>{" "}
            page. We try hard to get things right; we will not always
            succeed. If you find a mistake, please tell us — see the
            corrections section of the editorial policy.
          </p>

          <h2>Sources and translations</h2>
          <p>
            The primary classical texts referenced on this site are
            ancient and not under copyright. Specific modern
            translations referenced or linked from the{" "}
            <Link href="/sources" className="vp-link">
              sources
            </Link>{" "}
            catalog have their own rights status; we attempt to mark
            this honestly and conservatively, but the rights status of
            any particular translation is ultimately a question for
            the translator&rsquo;s rights holder.
          </p>

          <h2>No warranty</h2>
          <p>
            This site is provided as-is. Although we work carefully and
            cite our sources, the editorial content is interpretive in
            places and may be wrong in details. Nothing on this site is
            legal, medical, financial, or other professional advice. Do
            not rely on it as such.
          </p>

          <h2>Changes to these terms</h2>
          <p>
            If we change these terms, the date at the top of this page
            will change with it, and the change history is visible in
            the project&rsquo;s public commit log.
          </p>

          <h2>Contact</h2>
          <p>
            Inquiries can be sent through the public repository at{" "}
            <a
              href="https://github.com/PetroTitan/virtueandpower.com"
              className="vp-link"
              rel="noopener noreferrer"
              target="_blank"
            >
              github.com/PetroTitan/virtueandpower.com
            </a>
            .
          </p>
        </Prose>
      </Container>
    </>
  );
}
