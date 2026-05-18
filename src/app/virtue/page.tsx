import type { Metadata } from "next";
import { StudyLanding } from "@/components/site/StudyLanding";
import { buildMetadata } from "@/lib/seo";

const PATH = "/virtue";
const TITLE = "Virtue";
const DESCRIPTION =
  "The long inquiry into excellence of character, the human good and the well-ordered soul.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default function VirtuePage() {
  return (
    <StudyLanding
      path={PATH}
      eyebrow="Studies"
      title={TITLE}
      description={DESCRIPTION}
      body={
        <>
          <p>
            The Virtue section reads <em>aretē</em> as it was actually
            understood — excellence of character realised in action — and
            traces its long development from Homeric excellence through the
            Socratic dialogues, the Aristotelian doctrine of the mean, Stoic
            and Roman developments, and the Christian transformation of the
            virtues.
          </p>
          <p>
            We are interested in the texts on their own terms before we are
            interested in their contemporary application. The reading is
            the work.
          </p>
        </>
      }
      related={[
        { href: "/themes/virtue", label: "Theme · Virtue" },
        { href: "/books/nicomachean-ethics", label: "Book · Nicomachean Ethics" },
        { href: "/philosophers/aristotle", label: "Philosopher · Aristotle" },
        { href: "/philosophers/plato", label: "Philosopher · Plato" },
      ]}
    />
  );
}
