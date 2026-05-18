import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import { QuoteBlock } from "@/components/editorial/QuoteBlock";
import { ReadingList } from "@/components/editorial/ReadingList";
import { TimelineBlock } from "@/components/editorial/TimelineBlock";
import { RelatedReading } from "@/components/editorial/RelatedReading";

const baseComponents: MDXRemoteProps["components"] = {
  QuoteBlock,
  ReadingList,
  TimelineBlock,
  RelatedReading,
  h1: (props) => (
    <h1
      {...props}
      className="mt-12 font-serif text-display-2 text-charcoal first:mt-0"
    />
  ),
  h2: (props) => (
    <h2
      {...props}
      className="mt-12 font-serif text-heading-1 text-charcoal"
    />
  ),
  h3: (props) => (
    <h3
      {...props}
      className="mt-10 font-serif text-heading-2 text-charcoal"
    />
  ),
  p: (props) => (
    <p {...props} className="mt-5 text-charcoal-100 leading-relaxed" />
  ),
  ul: (props) => (
    <ul {...props} className="mt-5 list-disc space-y-2 pl-6 text-charcoal-100" />
  ),
  ol: (props) => (
    <ol {...props} className="mt-5 list-decimal space-y-2 pl-6 text-charcoal-100" />
  ),
  a: (props) => (
    <a {...props} className="vp-link text-charcoal hover:text-bronze" />
  ),
  blockquote: (props) => (
    <blockquote
      {...props}
      className="mt-6 border-l border-bronze pl-6 font-serif italic text-charcoal"
    />
  ),
  hr: () => <hr className="my-12 border-rule" />,
  strong: (props) => <strong {...props} className="font-semibold text-charcoal" />,
  em: (props) => <em {...props} className="italic" />,
};

export function MdxContent({ source }: { source: string }) {
  return (
    <div className="prose max-w-prose">
      <MDXRemote source={source} components={baseComponents} />
    </div>
  );
}
