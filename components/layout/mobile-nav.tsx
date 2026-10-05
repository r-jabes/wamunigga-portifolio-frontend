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
 * Full-screen mobile navigation.
 * Planned (disabled) routes render as non-interactive labels until pages ship.
 */
export function MobileNav({ className }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
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
        aria-controls={titleId}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "relative z-[60] flex h-11 items-center gap-3 type-label text-ivory",
          focusRingClass,
        )}
      >
        <span aria-hidden className="relative block h-3 w-6">
          <span
            className={cn(
              "absolute left-0 block h-px w-full bg-ivory transition-transform duration-300",
              open ? "top-1.5 rotate-45" : "top-0.5",
            )}
          />
          <span
            className={cn(
              "absolute left-0 block h-px w-full bg-ivory transition-transform duration-300",
              open ? "top-1.5 -rotate-45" : "top-2.5",
            )}
          />
        </span>
        <span>{open ? "Close" : "Menu"}</span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            id={titleId}
            role="dialog"
            aria-modal="true"
            aria-label={`${siteConfig.name} menu`}
            className="fixed inset-0 z-50 flex flex-col bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition.base}
          >
            <div className="flex h-16 items-center justify-end px-5 sm:px-6">
              {/* Close control lives in the toggle above (z-60). */}
            </div>

            <motion.nav
              aria-label="Mobile"
              className="flex flex-1 flex-col justify-center px-5 pb-16 sm:px-6"
              variants={staggerChildren(0.07, 0.08)}
              initial="hidden"
              animate="visible"
            >
              <ul className="flex flex-col gap-2">
                {primaryNavigation.map((item) => (
                  <motion.li key={item.href} variants={fadeUp}>
                    {item.enabled ? (
                      <Link
                        href={item.href}
                        data-cursor="interactive"
                        onClick={() => setOpen(false)}
                        className={cn(
                          "block type-display-md py-2 text-ivory transition-colors hover:text-ivory-muted",
                          focusRingClass,
                        )}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span className="block type-display-md py-2 text-ivory/25">
                        {item.label}
                      </span>
                    )}
                  </motion.li>
                ))}
              </ul>

              <motion.p
                variants={fadeUp}
                className="mt-12 type-label text-ivory-subtle"
              >
                {siteConfig.tagline}
              </motion.p>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
