import type { ReactNode } from "react";
import { Container } from "./Container";
import { cn } from "@/lib/cn";

type PageSectionProps = {
  children: ReactNode;
  /** Optional ARIA label for screen readers. */
  label?: string;
  /** Visual emphasis. "ruled" wraps the section in parchment with rules. */
  variant?: "default" | "ruled";
  /** Tighter rhythm for the first section under a hero. */
  spacing?: "default" | "tight" | "loose";
  className?: string;
};

const spacingClass: Record<NonNullable<PageSectionProps["spacing"]>, string> = {
  tight: "py-12 sm:py-16",
  default: "py-16 sm:py-20 lg:py-24",
  loose: "py-20 sm:py-28 lg:py-32",
};

/**
 * Vertical-rhythm wrapper used between major homepage and section blocks.
 * Standardises the spacing scale so individual sections don't manage their
 * own padding ad hoc.
 */
export function PageSection({
  children,
  label,
  variant = "default",
  spacing = "default",
  className,
}: PageSectionProps) {
  const isRuled = variant === "ruled";
  return (
    <section
      aria-label={label}
      className={cn(
        isRuled ? "border-y border-rule bg-parchment-50" : undefined,
        className,
      )}
    >
      <Container width="editorial" className={spacingClass[spacing]}>
        {children}
      </Container>
    </section>
  );
}
