import { cn } from "@/lib/utils";

export type DividerProps = {
  className?: string;
  label?: string;
};

/** Hairline editorial rule — optional label for section breaks. */
export function Divider({ className, label }: DividerProps) {
  if (!label) {
    return (
      <hr
        className={cn("border-0 border-t border-border", className)}
        aria-hidden
      />
    );
  }

  return (
    <div
      className={cn("flex items-center gap-4", className)}
      role="separator"
      aria-label={label}
    >
      <span className="h-px flex-1 bg-border" aria-hidden />
      <span className="type-label text-ivory-subtle">{label}</span>
      <span className="h-px flex-1 bg-border" aria-hidden />
    </div>
  );
}
