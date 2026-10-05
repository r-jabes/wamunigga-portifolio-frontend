import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

const tones = {
  base: "surface-base",
  elevated: "surface-elevated",
  inset: "surface-inset",
  transparent: "bg-transparent",
} as const;

export type SurfaceTone = keyof typeof tones;

export type SurfaceProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  tone?: SurfaceTone;
  hairline?: boolean;
  padded?: boolean;
  children: ReactNode;
};

/** Quiet surface container — prefer hairline over heavy cards. */
export function Surface({
  as: Component = "div",
  tone = "base",
  hairline = false,
  padded = false,
  className,
  children,
  ...props
}: SurfaceProps) {
  return (
    <Component
      className={cn(
        tones[tone],
        hairline && "surface-hairline",
        padded && "p-5 md:p-6",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
