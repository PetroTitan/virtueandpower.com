import type { Metadata } from "next";
import { StudyLanding } from "@/components/site/StudyLanding";
import { buildMetadata } from "@/lib/seo";

const PATH = "/statecraft";
const TITLE = "Statecraft";
const DESCRIPTION =
  "Constitutions, factions, the cycle of regimes, and the architecture of political life across the classical and historical tradition.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default function StatecraftPage() {
  return (
    <StudyLanding
      path={PATH}
      eyebrow="Studies"
      title={TITLE}
      description={DESCRIPTION}
      body={
        <>
          <p>
            Statecraft is not policy. It is the older inquiry into how
            political life can be ordered well — what kinds of regime there
            are, how they decay and succeed each other, what holds factions
            inside a single common life, and what the relation is between
            the character of a people and the constitution that fits them.
          </p>
          <p>
            The section reads across Plato and Aristotle, Polybius and
            Cicero, Tacitus and Augustine, the medieval and Renaissance
            commentators on Aristotle&rsquo;s <cite className="not-italic">
              Politics
            </cite>, and the early-modern theorists of the state.
          </p>
        </>
      }
      related={[
        { href: "/themes/statecraft", label: "Theme · Statecraft" },
        { href: "/themes/justice", label: "Theme · Justice" },
        { href: "/themes/power", label: "Theme · Power" },
        { href: "/leadership", label: "Section · Leadership" },
        { href: "/power", label: "Section · Power" },
        { href: "/books/republic", label: "Book · Republic" },
        { href: "/books/cyropaedia", label: "Book · Cyropaedia" },
      ]}
    />
  );
}
