import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

const widths = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
  full: "max-w-none",
} as const;

export type ContainerProps = {
  as?: ElementType;
  width?: keyof typeof widths;
  className?: string;
  children: ReactNode;
};

/** Horizontal page gutters + max-width shell for section content. */
export function Container({
  as: Component = "div",
  width = "default",
  className,
  children,
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full px-5 sm:px-6 md:px-8 lg:px-10",
        widths[width],
        className,
      )}
    >
      {children}
    </Component>
  );
}
