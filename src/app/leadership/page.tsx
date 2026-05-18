import type { Metadata } from "next";
import { StudyLanding } from "@/components/site/StudyLanding";
import { buildMetadata } from "@/lib/seo";

const PATH = "/leadership";
const TITLE = "Leadership";
const DESCRIPTION =
  "Classical and historical inquiry into rule, command, judgement and the stewardship of institutions.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default function LeadershipPage() {
  return (
    <StudyLanding
      path={PATH}
      eyebrow="Studies"
      title={TITLE}
      description={DESCRIPTION}
      body={
        <>
          <p>
            Leadership in the classical tradition is not a list of habits or a
            psychological type. It is a question about what kind of person
            should hold authority, what habits of mind that role demands, and
            what the relationship is between virtue, judgement and command.
          </p>
          <p>
            The Leadership section reads across Plato&rsquo;s philosopher-king
            and Aristotle&rsquo;s <em>phronēsis</em>, Cicero&rsquo;s{" "}
            <cite className="not-italic">De Officiis</cite>, Tacitus&rsquo;
            portraits of imperial rule, the long Christian and humanist
            mirrors-for-princes tradition, and the realist tradition of
            Machiavelli, Guicciardini and their inheritors.
          </p>
        </>
      }
      related={[
        { href: "/themes/leadership", label: "Theme · Leadership" },
        { href: "/themes/virtue", label: "Theme · Virtue" },
        { href: "/statecraft", label: "Section · Statecraft" },
        { href: "/philosophers", label: "All philosophers" },
      ]}
    />
  );
}
