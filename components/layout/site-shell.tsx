import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SkipToContent } from "@/components/layout/skip-to-content";
import { CustomCursor } from "@/components/motion/custom-cursor";
import { MAIN_CONTENT_ID } from "@/lib/a11y";

type SiteShellProps = {
  children: ReactNode;
};

/** App chrome: skip link, header, main landmark, footer, desktop cursor. */
export function SiteShell({ children }: SiteShellProps) {
  return (
    <>
      <SkipToContent />
      <CustomCursor />
      <SiteHeader />
      <main id={MAIN_CONTENT_ID} className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
