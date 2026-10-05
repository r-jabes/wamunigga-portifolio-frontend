"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { primaryNavigation } from "@/data/content/navigation";
import { siteConfig } from "@/data/content/site";
import { focusRingClass } from "@/lib/a11y";
import { fadeUp, staggerChildren, transition } from "@/lib/animation";
import { cn } from "@/lib/utils";
import { useScrollLock } from "@/hooks/use-scroll-lock";

type MobileNavProps = {
  className?: string;
};

/**
 * Full-screen mobile navigation — cinematic, editorial, brand-led.
 * Planned routes render as muted non-interactive labels until pages ship.
 */
export function MobileNav({ className }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  useScrollLock(open);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className={cn("lg:hidden", className)}>
      <button
        type="button"
        data-cursor="interactive"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "relative z-[60] flex min-h-11 min-w-11 items-center gap-3 type-label text-ivory",
          focusRingClass,
        )}
      >
        <span aria-hidden className="relative block h-3 w-6">
          <span
            className={cn(
              "absolute left-0 block h-px w-full bg-ivory transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
              open ? "top-1.5 rotate-45" : "top-0.5",
            )}
          />
          <span
            className={cn(
              "absolute left-0 top-1.5 block h-px w-full bg-ivory transition-opacity duration-200",
              open ? "opacity-0" : "opacity-100",
            )}
          />
          <span
            className={cn(
              "absolute left-0 block h-px w-full bg-ivory transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
              open ? "top-1.5 -rotate-45" : "top-2.5",
            )}
          />
        </span>
        <span>{open ? "Close" : "Menu"}</span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-label={`${siteConfig.name} menu`}
            className="site-atmosphere fixed inset-0 z-50 flex flex-col bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition.base}
          >
            <div className="relative z-[1] flex h-16 items-center justify-between px-5 sm:px-6">
              <p className="font-display text-sm uppercase tracking-[0.2em] text-ivory">
                {siteConfig.shortName}
              </p>
              {/* Close control stays on the toggle (z-60) above the overlay. */}
              <span className="w-16" aria-hidden />
            </div>

            <motion.nav
              aria-label="Mobile"
              className="relative z-[1] flex flex-1 flex-col justify-center px-5 pb-20 sm:px-6"
              variants={staggerChildren(0.07, 0.1)}
              initial="hidden"
              animate="visible"
            >
              <ul className="flex flex-col gap-1 border-t border-border pt-8">
                {primaryNavigation.map((item) => (
                  <motion.li
                    key={item.href}
                    variants={fadeUp}
                    className="border-b border-border"
                  >
                    {item.enabled ? (
                      <Link
                        href={item.href}
                        data-cursor="interactive"
                        onClick={() => setOpen(false)}
                        className={cn(
                          "block py-4 type-display-md text-ivory transition-colors duration-200 hover:text-ivory-muted",
                          focusRingClass,
                        )}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span className="block py-4 type-display-md text-ivory/20">
                        {item.label}
                      </span>
                    )}
                  </motion.li>
                ))}
              </ul>

              <motion.div variants={fadeUp} className="mt-12">
                <p className="type-label text-ivory-subtle">
                  {siteConfig.tagline}
                </p>
              </motion.div>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
