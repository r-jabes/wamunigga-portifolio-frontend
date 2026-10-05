import type { ReactNode } from "react";
import { SiteAtmosphere } from "@/components/layout/site-atmosphere";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SkipToContent } from "@/components/layout/skip-to-content";
import { CustomCursor } from "@/components/motion/custom-cursor";
import { PageTransition } from "@/components/motion/page-transition";
import { MAIN_CONTENT_ID } from "@/lib/a11y";

type SiteShellProps = {
  children: ReactNode;
};

/**
 * Global application chrome.
 * Atmosphere + header + transitioned main + footer + desktop cursor.
 */
export function SiteShell({ children }: SiteShellProps) {
  return (
    <>
      <SkipToContent />
      <SiteAtmosphere />
      <CustomCursor />
      <div className="relative z-0 flex min-h-full flex-1 flex-col">
        <SiteHeader />
        <main id={MAIN_CONTENT_ID} className="flex flex-1 flex-col">
          <PageTransition>{children}</PageTransition>
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
