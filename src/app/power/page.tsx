import type { Metadata } from "next";
import { StudyLanding } from "@/components/site/StudyLanding";
import { buildMetadata } from "@/lib/seo";

const PATH = "/power";
const TITLE = "Power";
const DESCRIPTION =
  "The classical and historical inquiry into authority, force, legitimacy and the conditions under which power becomes rule.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default function PowerPage() {
  return (
    <StudyLanding
      path={PATH}
      eyebrow="Studies"
      title={TITLE}
      description={DESCRIPTION}
      body={
        <>
          <p>
            Power is the older question and the harder one. The Power section
            takes up the recurring problems the classical tradition kept
            returning to: the distinction between force and authority, the
            grounds of legitimacy, the conditions under which power becomes
            rule, and the conditions under which rule degenerates back into
            mere force.
          </p>
          <p>
            We resist the temptation to treat power as if it were the same
            object across every era. The Athenian{" "}
            <em>dunamis</em>, the Roman <em>imperium</em>, the medieval
            distinction between <em>potestas</em> and <em>auctoritas</em>,
            and the modern concept of sovereignty are not interchangeable —
            and the differences matter.
          </p>
        </>
      }
      related={[
        { href: "/themes/power", label: "Theme · Power" },
        { href: "/themes/justice", label: "Theme · Justice" },
        { href: "/themes/leadership", label: "Theme · Leadership" },
        { href: "/themes/ambition", label: "Theme · Ambition" },
        { href: "/statecraft", label: "Section · Statecraft" },
        { href: "/leadership", label: "Section · Leadership" },
      ]}
    />
  );
}
