import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerWidth = "prose" | "editorial" | "wide";

const widthClass: Record<ContainerWidth, string> = {
  prose: "max-w-prose",
  editorial: "max-w-editorial",
  wide: "max-w-[88rem]",
};

type ContainerProps = {
  as?: ElementType;
  width?: ContainerWidth;
  className?: string;
  children: ReactNode;
};

export function Container({
  as: Tag = "div",
  width = "editorial",
  className,
  children,
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full px-5 sm:px-8 lg:px-12", widthClass[width], className)}>
      {children}
    </Tag>
  );
}
