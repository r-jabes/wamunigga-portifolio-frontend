import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { focusRingClass } from "@/lib/a11y";

type LinkProps = ComponentProps<typeof Link>;

const variants = {
  primary:
    "bg-ivory text-background hover:bg-ivory/90 active:bg-ivory/80",
  secondary:
    "bg-transparent text-ivory border border-border-strong hover:border-ivory hover:bg-ivory/[0.04] active:bg-ivory/[0.07]",
  ghost:
    "bg-transparent text-ivory-muted hover:text-ivory hover:bg-ivory/[0.04]",
} as const;

const sizes = {
  sm: "h-10 px-4 text-xs tracking-[0.14em]",
  md: "h-12 px-6 text-sm tracking-[0.16em]",
  lg: "h-14 px-8 text-sm tracking-[0.18em]",
} as const;

export type ButtonLinkProps = LinkProps & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

/** Link styled as a system button — for CTAs that navigate. */
export function ButtonLink({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      data-cursor="interactive"
      className={cn(
        "inline-flex items-center justify-center font-sans font-medium uppercase transition-[color,background-color,border-color,transform,opacity] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "hover:-translate-y-px active:translate-y-0",
        focusRingClass,
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
