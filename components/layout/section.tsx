import type { ElementType, ReactNode } from "react";
import { Container, type ContainerProps } from "@/components/layout/container";
import { cn } from "@/lib/utils";

export type SectionProps = {
  as?: ElementType;
  id?: string;
  className?: string;
  containerClassName?: string;
  width?: ContainerProps["width"];
  spacing?: "default" | "hero" | "none";
  children: ReactNode;
};

/** Page section with system spacing + container gutters. */
export function Section({
  as: Component = "section",
  id,
  className,
  containerClassName,
  width = "default",
  spacing = "default",
  children,
}: SectionProps) {
  return (
    <Component
      id={id}
      className={cn(
        spacing === "default" && "section-space",
        spacing === "hero" && "section-space-hero",
        className,
      )}
    >
      <Container width={width} className={containerClassName}>
        {children}
      </Container>
    </Component>
  );
}
