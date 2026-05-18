import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

type PageHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  breadcrumbs?: Crumb[];
  meta?: ReactNode;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
  meta,
}: PageHeaderProps) {
  return (
    <header className="border-b border-rule bg-parchment-50">
      <Container width="editorial" className="py-16 sm:py-20">
        {breadcrumbs?.length ? <Breadcrumbs items={breadcrumbs} /> : null}
        {eyebrow ? (
          <p className={breadcrumbs?.length ? "vp-eyebrow mt-6" : "vp-eyebrow"}>
            {eyebrow}
          </p>
        ) : null}
        <h1
          className={
            eyebrow || breadcrumbs?.length
              ? "mt-3 max-w-4xl font-serif text-display-1 text-charcoal"
              : "max-w-4xl font-serif text-display-1 text-charcoal"
          }
        >
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-2xl font-serif text-lede text-charcoal-100">
            {description}
          </p>
        ) : null}
        {meta ? (
          <p className="mt-6 text-xs uppercase tracking-eyebrow text-stone">{meta}</p>
        ) : null}
      </Container>
    </header>
  );
}
