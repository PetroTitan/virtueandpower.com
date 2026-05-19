import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type EditorialGridProps = {
  children: ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
};

const columnClass: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export function EditorialGrid({
  children,
  columns = 3,
  className,
}: EditorialGridProps) {
  return (
    <div
      className={cn(
        // Generous gutters so cards can drop their own borders and let
        // the grid air do the separation work.
        "grid grid-cols-1 gap-x-12 gap-y-16 lg:gap-x-16",
        columnClass[columns],
        className,
      )}
    >
      {children}
    </div>
  );
}
