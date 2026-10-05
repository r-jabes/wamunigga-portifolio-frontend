import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { focusRingClass } from "@/lib/a11y";

const variants = {
  primary:
    "bg-ivory text-background hover:bg-ivory/90 active:bg-ivory/80",
  secondary:
    "bg-transparent text-ivory border border-border-strong hover:border-ivory hover:bg-ivory/[0.04] active:bg-ivory/[0.07]",
  ghost:
    "bg-transparent text-ivory-muted hover:text-ivory hover:bg-ivory/[0.04] active:bg-ivory/[0.07]",
  accent:
    "bg-accent text-ivory hover:bg-accent/90 active:bg-accent/80",
  champagne:
    "bg-transparent text-champagne border border-champagne/50 hover:border-champagne hover:bg-champagne/10",
} as const;

const sizes = {
  sm: "h-10 min-w-10 px-4 text-xs tracking-[0.14em]",
  md: "h-12 min-w-12 px-6 text-sm tracking-[0.16em]",
  lg: "h-14 min-w-14 px-8 text-sm tracking-[0.18em]",
} as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      type = "button",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={isLoading || undefined}
        data-cursor="interactive"
        data-loading={isLoading || undefined}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 overflow-hidden font-sans font-medium uppercase transition-[color,background-color,border-color,transform,opacity] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
          "hover:-translate-y-px active:translate-y-0",
          "disabled:pointer-events-none disabled:opacity-40 disabled:hover:translate-y-0",
          focusRingClass,
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      >
        <span
          className={cn(
            "inline-flex items-center justify-center gap-2 transition-opacity duration-200",
            isLoading && "opacity-0",
          )}
        >
          {children}
        </span>
        {isLoading ? (
          <span
            className="absolute inset-0 flex items-center justify-center"
            aria-hidden
          >
            <span className="h-3.5 w-3.5 animate-spin rounded-full border border-current border-t-transparent opacity-80" />
          </span>
        ) : null}
      </button>
    );
  },
);

Button.displayName = "Button";
