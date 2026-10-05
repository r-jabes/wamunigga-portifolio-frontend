import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { externalLinkAriaLabel, focusRingClass } from "@/lib/a11y";

type NextLinkProps = ComponentProps<typeof Link>;

export type TextLinkProps = NextLinkProps & {
  external?: boolean;
  underline?: boolean;
};

/**
 * Accessible navigation / inline link primitive.
 * Use for in-app routes; set `external` for third-party destinations.
 */
export function TextLink({
  className,
  external = false,
  underline = true,
  children,
  "aria-label": ariaLabel,
  ...props
}: TextLinkProps) {
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
      className={cn(
        "font-sans text-ivory/80 transition-colors duration-200 hover:text-ivory",
        underline && "underline-offset-4 hover:underline",
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
