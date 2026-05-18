import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type EyebrowProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
};

/**
 * Small uppercase bronze label used above section titles, on cards, and on
 * page headers. Renders as <p> by default; pass `as="h2"` when it should
 * carry document outline weight.
 */
export function Eyebrow({ as: Tag = "p", children, className }: EyebrowProps) {
  return <Tag className={cn("vp-eyebrow", className)}>{children}</Tag>;
}

type LedeProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
};

/**
 * Serif standfirst paragraph. Sits directly under a Heading or PageHeader.
 */
export function Lede({ as: Tag = "p", children, className }: LedeProps) {
  return (
    <Tag
      className={cn(
        "max-w-2xl font-serif text-lede text-charcoal-100",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

type ProseProps = {
  as?: ElementType;
  children: ReactNode;
  dropCap?: boolean;
  className?: string;
};

/**
 * Long-form reading container with consistent spacing rhythm and the
 * editorial type scale. Opt in to the bronze drop cap with dropCap when the
 * first child is a real opening paragraph.
 */
export function Prose({
  as: Tag = "div",
  children,
  dropCap = false,
  className,
}: ProseProps) {
  return (
    <Tag className={cn("vp-prose", dropCap && "vp-prose--drop", className)}>
      {children}
    </Tag>
  );
}

type RuleTitleProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Eyebrow-style label with a hairline rule beneath it. Used to separate
 * sections inside long article bodies and sidebars.
 */
export function RuleTitle({ children, className }: RuleTitleProps) {
  return (
    <div className={cn("border-b border-rule pb-3", className)}>
      <p className="vp-eyebrow">{children}</p>
    </div>
  );
}
