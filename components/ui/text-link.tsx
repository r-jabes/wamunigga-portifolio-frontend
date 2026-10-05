import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { externalLinkAriaLabel, focusRingClass } from "@/lib/a11y";

type NextLinkProps = ComponentProps<typeof Link>;

const variants = {
  inline:
    "font-sans text-ivory-muted underline-offset-4 transition-colors duration-200 hover:text-ivory hover:underline",
  nav: "type-label text-ivory-subtle transition-colors duration-200 hover:text-ivory",
  cta: "type-label text-ivory transition-colors duration-200 hover:text-ivory/80",
  quiet:
    "font-sans text-sm text-muted transition-colors duration-200 hover:text-ivory-muted",
} as const;

export type TextLinkVariant = keyof typeof variants;

export type TextLinkProps = NextLinkProps & {
  external?: boolean;
  variant?: TextLinkVariant;
  underline?: boolean;
};

/**
 * Accessible link primitive with editorial variants.
 * Use for in-app routes; set `external` for third-party destinations.
 */
export function TextLink({
  className,
  external = false,
  variant = "inline",
  underline,
  children,
  "aria-label": ariaLabel,
  ...props
}: TextLinkProps) {
  const shouldUnderline =
    underline ?? (variant === "inline" || variant === "quiet");

  const externalProps = external
    ? {
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label":
          ariaLabel ??
          (typeof children === "string"
            ? externalLinkAriaLabel(children)
            : undefined),
      }
    : { "aria-label": ariaLabel };

  return (
    <Link
      data-cursor="interactive"
      className={cn(
        variants[variant],
        shouldUnderline && variant !== "inline" && "underline-offset-4 hover:underline",
        !shouldUnderline && "no-underline",
        focusRingClass,
        className,
      )}
      {...externalProps}
      {...props}
    >
      {children}
    </Link>
  );
}
