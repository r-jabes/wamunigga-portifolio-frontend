import type { ElementType, ReactNode } from "react";
import { Container, type ContainerProps } from "@/components/layout/container";
import { cn } from "@/lib/utils";

export type PageContainerProps = {
  as?: ElementType;
  width?: ContainerProps["width"];
  className?: string;
  children: ReactNode;
};

/**
 * Standard page content shell — gutters + max-width for route bodies.
 * Prefer this (or Section) over ad-hoc page wrappers.
 */
export function PageContainer({
  as: Component = "div",
  width = "default",
  className,
  children,
}: PageContainerProps) {
  return (
    <Container
      as={Component}
      width={width}
      className={cn("flex w-full flex-1 flex-col", className)}
    >
      {children}
    </Container>
  );
}
