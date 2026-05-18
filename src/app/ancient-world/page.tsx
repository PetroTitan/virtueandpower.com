import type { Metadata } from "next";
import { StudyLanding } from "@/components/site/StudyLanding";
import { buildMetadata } from "@/lib/seo";

const PATH = "/ancient-world";
const TITLE = "Ancient World";
const DESCRIPTION =
  "Athens, Rome, Jerusalem — the historical world that produced the classical tradition, read as the soil in which the texts grew.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default function AncientWorldPage() {
  return (
    <StudyLanding
      path={PATH}
      eyebrow="Eras"
      title={TITLE}
      description={DESCRIPTION}
      body={
        <>
          <p>
            The Ancient World section sets the philosophers and their works
            inside the polities, religions and wars that shaped them. The
            <em> Republic</em> is unintelligible without the Peloponnesian
            War; the <em>Politics</em> is unintelligible without the
            Macedonian conquest; the Stoic and Epicurean schools are
            unintelligible without the world the conquest produced.
          </p>
          <p>
            We do not treat history as decoration around the texts. The
            history is part of the argument.
          </p>
        </>
      }
      related={[
        { href: "/philosophers", label: "All philosophers" },
        { href: "/books", label: "All books" },
        { href: "/religion-and-wisdom", label: "Section · Religion & Wisdom" },
        { href: "/war-and-peace", label: "Section · War & Peace" },
      ]}
    />
  );
}
