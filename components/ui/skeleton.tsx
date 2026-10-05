import { cn } from "@/lib/utils";

export type SkeletonProps = {
  className?: string;
  /** Accessible label announced while content loads */
  label?: string;
};

/** Quiet loading placeholder — no bounce, no shimmer excess. */
export function Skeleton({
  className,
  label = "Loading",
}: SkeletonProps) {
  return (
    <span
      role="status"
      aria-live="polite"
      aria-label={label}
      className={cn(
        "relative block overflow-hidden bg-surface-elevated",
        "after:absolute after:inset-0 after:-translate-x-full after:animate-[skeleton-shimmer_1.6s_ease_infinite]",
        "after:bg-gradient-to-r after:from-transparent after:via-ivory/[0.04] after:to-transparent",
        className,
      )}
    >
      <span className="sr-only">{label}</span>
    </span>
  );
}
