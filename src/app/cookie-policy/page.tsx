import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/editorial/PageHeader";
import { Prose } from "@/components/editorial/Typography";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const PATH = "/cookie-policy";
const TITLE = "Cookie policy";
const DESCRIPTION =
  "A short, honest description of the cookies and similar storage that the platform uses (very little) and what they do.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

const LAST_UPDATED = "2026-05-19";

export default function CookiePolicyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Cookie policy", href: PATH },
        ])}
      />
      <PageHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Cookie policy" },
        ]}
        eyebrow="Trust"
        title="Cookie policy"
        description={DESCRIPTION}
        meta={`Last updated · ${LAST_UPDATED}`}
      />

      <Container width="editorial" className="py-16 sm:py-20">
        <Prose as="article">
          <p>
            The site does not use cookies for advertising, retargeting
            or social-media tracking. The only client-side storage on
            the platform is what the analytics tracker uses to identify
            a returning visit within a short window. There is no
            account, no login, and no personalisation that depends on
            stored state.
          </p>

          <h2>What is on the page</h2>
          <ul>
            <li>
              <strong>WebmasterID tracker.</strong> The analytics script
              described in the{" "}
              <Link href="/privacy-policy" className="vp-link">
                privacy policy
              </Link>{" "}
              may set a small first-party identifier (via a cookie or
              local storage) so that requesting the same page twice in
              quick succession is not counted as two unique reads. It
              does not link visits to a personal identity.
            </li>
            <li>
              <strong>Nothing else.</strong> There are no third-party
              cookies, no advertising cookies, no fingerprinting
              scripts, and no consent banner because there is nothing
              meaningful to consent to. (We treat the absence of a
              banner as a goal, not a gap.)
            </li>
          </ul>

          <h2>Opting out</h2>
          <p>
            If you would prefer not to be counted in the analytics:
          </p>
          <ul>
            <li>
              Use a browser extension (uBlock Origin, Privacy Badger,
              etc.) that blocks the tracker script at the network
              level.
            </li>
            <li>
              Use a browser that allows site-level JavaScript control,
              and disable JavaScript for this domain. The site is
              fully readable without JavaScript — the editorial
              content is server-rendered.
            </li>
            <li>
              Clear cookies and local storage for this domain. The
              tracker does not attempt to restore the previous
              identifier.
            </li>
          </ul>
          <p>
            None of these affect what you can read on the site.
          </p>

          <h2>Future changes</h2>
          <p>
            If the platform ever introduces something that meaningfully
            changes the cookie picture — a logged-in mailing-list
            preference, for example — this page will be updated and
            the date at the top will change. We will not quietly add
            advertising cookies; the public commit log makes that
            visible by default.
          </p>

          <h2>Contact</h2>
          <p>
            Questions can be sent through the public repository at{" "}
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
