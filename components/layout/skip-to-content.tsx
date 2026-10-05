import { MAIN_CONTENT_ID, focusRingClass } from "@/lib/a11y";
import { cn } from "@/lib/utils";

export function SkipToContent() {
  return (
    <a
      href={`#${MAIN_CONTENT_ID}`}
      className={cn(
        "fixed left-4 top-4 z-[100] -translate-y-[200%] bg-ivory px-4 py-3 font-sans text-sm font-medium uppercase tracking-[0.14em] text-background transition-transform",
        "focus-visible:translate-y-0",
        focusRingClass,
      )}
    >
      Skip to content
    </a>
  );
}
