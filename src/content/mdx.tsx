import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import { QuoteBlock } from "@/components/editorial/QuoteBlock";
import { ReadingList } from "@/components/editorial/ReadingList";
import { TimelineBlock } from "@/components/editorial/TimelineBlock";
import { RelatedReading } from "@/components/editorial/RelatedReading";
import { InlineArchiveFragment } from "@/components/editorial/InlineArchiveFragment";
import { Prose } from "@/components/editorial/Typography";

const baseComponents: MDXRemoteProps["components"] = {
  QuoteBlock,
  ReadingList,
  TimelineBlock,
  RelatedReading,
  InlineArchiveFragment,
};

type MdxContentProps = {
  source: string;
  /** Render the bronze drop cap on the first paragraph. Off by default; safe
   *  for content that opens with a notice or stub marker. */
  dropCap?: boolean;
};

/**
 * Server-rendered MDX content. The Prose container provides all element
 * styling (h2-h4, lists, blockquotes, code, links, hr) via .vp-prose, so
 * MDX bodies don't need to know about any of it.
 */
export function MdxContent({ source, dropCap = false }: MdxContentProps) {
  return (
    <Prose as="div" dropCap={dropCap}>
      <MDXRemote source={source} components={baseComponents} />
    </Prose>
  );
}
