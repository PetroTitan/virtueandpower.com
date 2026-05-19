import type { Metadata } from "next";
import { StudyLanding } from "@/components/site/StudyLanding";
import { ArchiveImage } from "@/components/site/ArchiveImage";
import { buildMetadata } from "@/lib/seo";

const PATH = "/roman-republic";
const TITLE = "Roman Republic";
const DESCRIPTION =
  "The careers, institutions and arguments through which Rome built its republic — and lost it. Read as the longest sustained case study of civic virtue, military command and constitutional decline in the European tradition.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

export default function RomanRepublicPage() {
  return (
    <StudyLanding
      path={PATH}
      eyebrow="Eras"
      title={TITLE}
      description={DESCRIPTION}
      hero={
        <ArchiveImage
          slug="roman-forum-view"
          priority
          sizes="(min-width: 1280px) 1100px, (min-width: 768px) 90vw, 100vw"
        />
      }
      body={
        <>
          <p>
            The Roman Republic stood for nearly five centuries. The European
            tradition has not stopped reading it because the questions it
            posed — what civic virtue is, what a magistrate owes the city,
            what holds a constitution together, what causes a constitution
            to dissolve — are the questions every later republic has had to
            answer in some form.
          </p>
          <p>
            We read the Republic in two registers. The first is the
            interpretive register: how the figures and their decisions look
            in light of the moral vocabulary the tradition itself
            constructed — <em>gravitas</em>, <em>constantia</em>,{" "}
            <em>officium</em>, the <em>mos maiorum</em>. The second is the
            structural register: what happens to a republic when the army
            comes to depend on its generals, when extraordinary commands
            become normal, when civil violence enters political life and is
            not pushed back out.
          </p>
          <p>
            The figures range from the legendary founder Numa Pompilius
            through Scipio Africanus, Marius and Sulla, Pompey and Caesar,
            Cato the Younger and Cicero, to Augustus, whose settlement
            preserved the forms of the Republic while concentrating its
            substance in one person.
          </p>
        </>
      }
      related={[
        { href: "/essays/why-rome-mattered", label: "Essay · Why Rome mattered" },
        {
          href: "/essays/why-the-roman-republic-collapsed",
          label: "Essay · Why the Roman Republic collapsed",
        },
        {
          href: "/essays/marius-sulla-and-roman-norms",
          label: "Essay · Marius, Sulla and Roman norms",
        },
        {
          href: "/essays/pompey-versus-caesar",
          label: "Essay · Pompey versus Caesar",
        },
        {
          href: "/essays/caesar-and-the-collapse-of-the-republic",
          label: "Essay · Caesar and the collapse of the Republic",
        },
        {
          href: "/essays/augustus-and-the-transformation-of-rome",
          label: "Essay · Augustus and the transformation of Rome",
        },
        {
          href: "/essays/the-roman-idea-of-civic-virtue",
          label: "Essay · The Roman idea of civic virtue",
        },
        {
          href: "/essays/republic-memory-under-empire",
          label: "Essay · Republic memory under empire",
        },
        {
          href: "/essays/why-rome-became-obsessed-with-decline",
          label: "Essay · Why Rome became obsessed with decline",
        },
        { href: "/philosophers/cicero", label: "Figure · Cicero" },
        { href: "/philosophers/cato-the-younger", label: "Figure · Cato the Younger" },
        { href: "/philosophers/julius-caesar", label: "Figure · Julius Caesar" },
        { href: "/philosophers/augustus", label: "Figure · Augustus" },
        { href: "/philosophers/trajan", label: "Figure · Trajan" },
        { href: "/philosophers/sallust", label: "Historian · Sallust" },
        { href: "/philosophers/livy", label: "Historian · Livy" },
        { href: "/philosophers/polybius", label: "Historian · Polybius" },
        { href: "/philosophers/tacitus", label: "Historian · Tacitus" },
        { href: "/philosophers/suetonius", label: "Historian · Suetonius" },
        { href: "/themes/republic", label: "Theme · Republic" },
        { href: "/themes/civic-virtue", label: "Theme · Civic virtue" },
        { href: "/themes/decline", label: "Theme · Decline" },
        { href: "/themes/mixed-constitution", label: "Theme · Mixed constitution" },
        { href: "/themes/tyranny", label: "Theme · Tyranny" },
        { href: "/themes/historical-memory", label: "Theme · Historical memory" },
        { href: "/themes/historical-method", label: "Theme · Historical method" },
      ]}
    />
  );
}
