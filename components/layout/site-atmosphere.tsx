import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SiteAtmosphereProps = {
  className?: string;
  children?: ReactNode;
};

/**
 * Global atmospheric layer — quiet depth behind all routes.
 * Fixed, non-interactive; does not replace content photography later.
 */
export function SiteAtmosphere({ className, children }: SiteAtmosphereProps) {
  return (
    <div
      aria-hidden
      className={cn("site-atmosphere pointer-events-none fixed inset-0 -z-10", className)}
    >
      {children}
    </div>
  );
}
