import { forwardRef, type ElementType, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const variants = {
  "display-xl": "type-display-xl text-ivory",
  "display-lg": "type-display-lg text-ivory",
  "display-md": "type-display-md text-ivory",
  heading: "type-heading text-ivory",
  subhead: "type-subhead text-ivory",
  body: "type-body text-ivory-muted",
  "body-sm": "type-body-sm text-ivory-muted",
  label: "type-label text-ivory-subtle",
  caption: "type-caption text-muted",
} as const;

const defaultTags = {
  "display-xl": "h1",
  "display-lg": "h1",
  "display-md": "h2",
  heading: "h2",
  subhead: "h3",
  body: "p",
  "body-sm": "p",
  label: "span",
  caption: "span",
} as const satisfies Record<keyof typeof variants, ElementType>;

export type TextVariant = keyof typeof variants;

export type TextProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  variant?: TextVariant;
  children: ReactNode;
};

/** Typography primitive — maps brand type ramp to semantic HTML. */
export const Text = forwardRef<HTMLElement, TextProps>(function Text(
  { as, variant = "body", className, children, ...props },
  ref,
) {
  const Component = (as ?? defaultTags[variant]) as ElementType;

  return (
    <Component
      ref={ref}
      className={cn(variants[variant], className)}
      {...props}
    >
      {children}
    </Component>
  );
});
