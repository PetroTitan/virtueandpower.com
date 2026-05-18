import type { Metadata } from "next";
import { StudyLanding } from "@/components/site/StudyLanding";
import { buildMetadata } from "@/lib/seo";

const PATH = "/war-and-peace";
const TITLE = "War & Peace";
const DESCRIPTION =
  "The historical and philosophical inquiry into war, peace, just cause and the conduct of conflict.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default function WarAndPeacePage() {
  return (
    <StudyLanding
      path={PATH}
      eyebrow="Studies"
      title={TITLE}
      description={DESCRIPTION}
      body={
        <>
          <p>
            The War &amp; Peace section reads classical and historical
            thought on conflict — the historians (Thucydides, Polybius,
            Tacitus, Livy) alongside the long tradition of reflection on
            just cause and just conduct, from Augustine and Aquinas through
            Grotius and the modern theorists of international order.
          </p>
          <p>
            We treat war as the historians treated it: as a recurring,
            specific human reality with causes that can be examined, not as
            a metaphor for argument.
          </p>
        </>
      }
      related={[
        { href: "/themes/war-and-peace", label: "Theme · War & Peace" },
        { href: "/themes/courage", label: "Theme · Courage" },
        { href: "/books/iliad", label: "Book · Iliad" },
        { href: "/philosophers/homer", label: "Philosopher · Homer" },
        { href: "/statecraft", label: "Section · Statecraft" },
        { href: "/power", label: "Section · Power" },
        { href: "/ancient-world", label: "Section · Ancient World" },
      ]}
    />
  );
}
