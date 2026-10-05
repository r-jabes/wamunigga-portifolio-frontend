import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { focusRingClass } from "@/lib/a11y";

const variants = {
  primary:
    "bg-ivory text-background hover:bg-ivory/90 active:bg-ivory/80",
  secondary:
    "bg-transparent text-ivory border border-ivory/40 hover:border-ivory hover:bg-ivory/5",
  ghost: "bg-transparent text-ivory/80 hover:text-ivory hover:bg-ivory/5",
  accent:
    "bg-accent text-ivory hover:bg-accent/90 active:bg-accent/80",
} as const;

const sizes = {
  sm: "h-10 px-4 text-xs tracking-[0.14em]",
  md: "h-12 px-6 text-sm tracking-[0.16em]",
  lg: "h-14 px-8 text-sm tracking-[0.18em]",
} as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      type = "button",
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center justify-center font-sans font-medium uppercase transition-colors duration-200 disabled:pointer-events-none disabled:opacity-40",
          focusRingClass,
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
