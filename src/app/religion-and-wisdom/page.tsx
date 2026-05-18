import type { Metadata } from "next";
import { StudyLanding } from "@/components/site/StudyLanding";
import { buildMetadata } from "@/lib/seo";

const PATH = "/religion-and-wisdom";
const TITLE = "Religion & Wisdom";
const DESCRIPTION =
  "The wisdom traditions — Hebrew, Greek, Christian, and the long encounters between philosophy and revelation.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default function ReligionAndWisdomPage() {
  return (
    <StudyLanding
      path={PATH}
      eyebrow="Studies"
      title={TITLE}
      description={DESCRIPTION}
      body={
        <>
          <p>
            The Religion &amp; Wisdom section reads the wisdom traditions
            seriously — the Hebrew scriptures and the wisdom books, the
            Greek and Hellenistic philosophical schools, the New Testament
            and the patristic and medieval Christian inheritance — and the
            long, real conversation between philosophy and revelation that
            shaped both.
          </p>
          <p>
            We do not flatten religious texts into philosophical lessons,
            and we do not flatten philosophical texts into pre-religious
            ones. The traditions are read on their own terms first.
          </p>
        </>
      }
      related={[
        { href: "/themes/virtue", label: "Theme · Virtue" },
        { href: "/ancient-world", label: "Section · Ancient World" },
        { href: "/philosophers", label: "All philosophers" },
      ]}
    />
  );
}
