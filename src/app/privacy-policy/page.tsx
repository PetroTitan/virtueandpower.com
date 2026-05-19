import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/editorial/PageHeader";
import { Prose } from "@/components/editorial/Typography";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const PATH = "/privacy-policy";
const TITLE = "Privacy policy";
const DESCRIPTION =
  "What Virtue & Power collects, what we don't, and how the small amount of analytics on the platform actually works.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

const LAST_UPDATED = "2026-05-19";

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Privacy policy", href: PATH },
        ])}
      />
      <PageHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Privacy policy" },
        ]}
        eyebrow="Trust"
        title="Privacy policy"
        description={DESCRIPTION}
        meta={`Last updated · ${LAST_UPDATED}`}
      />

      <Container width="editorial" className="py-16 sm:py-20">
        <Prose as="article">
          <p>
            Virtue &amp; Power is a small editorial site. It is not an
            advertising business, not a marketplace, and not a social
            platform. What follows is a plain description of the limited
            data the site handles, written to match how the platform
            actually behaves.
          </p>

          <h2>What we collect</h2>
          <p>
            The site uses <strong>WebmasterID</strong> for traffic
            analytics — the same product made by the people who run this
            site. The tracker records aggregate information about which
            pages are visited and how readers navigate between them. It
            does not ask for or store any personal information about
            individual readers.
          </p>
          <p>
            Specifically, the analytics integration does not collect:
          </p>
          <ul>
            <li>your name, email address, account or any identifier you have not given us;</li>
            <li>your precise location;</li>
            <li>any information you type into the site (because there
              are no forms that send data to us — the newsletter form
              on the homepage is non-functional and is provided as a
              placeholder for a future opt-in mailing list).</li>
          </ul>
          <p>
            We do not use third-party advertising networks, retargeting
            pixels, or social-media trackers.
          </p>

          <h2>Cookies and similar storage</h2>
          <p>
            The WebmasterID tracker may set a small number of
            first-party cookies or use the browser&rsquo;s local storage
            to deduplicate visits across pages within a session. These
            are not used for advertising or cross-site tracking. See
            the{" "}
            <Link href="/cookie-policy" className="vp-link">
              cookie policy
            </Link>{" "}
            for details and the simplest way to opt out (disable
            JavaScript or use a browser extension to block the tracker
            script).
          </p>

          <h2>What we do not do</h2>
          <p>
            We do not sell, rent or trade data about readers. We do not
            run advertising. We do not maintain a profile on any
            individual reader. We do not share analytics data with
            third parties beyond what is needed to operate the WebmasterID
            ingest endpoint described on the{" "}
            <Link href="/about" className="vp-link">
              about
            </Link>{" "}
            page.
          </p>

          <h2>Logs</h2>
          <p>
            The platform is hosted on Vercel. Vercel may retain standard
            web-server logs (IP address, request path, response code,
            user-agent) for operational purposes — the same logs every
            website on the open internet generates. We do not augment
            those logs and we do not export them.
          </p>

          <h2>Contact</h2>
          <p>
            Editorial and privacy inquiries can be sent via an issue on
            the project&rsquo;s public repository at{" "}
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

          <h2>Changes to this policy</h2>
          <p>
            If we change this policy, the date at the top of this page
            will change with it, and the change history is visible in the
            project&rsquo;s public commit log. We will not silently
            modify the description of what we collect.
          </p>
        </Prose>
      </Container>
    </>
  );
}
