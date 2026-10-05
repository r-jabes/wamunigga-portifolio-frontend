"use client";

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
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
 * Overlay is portaled to `document.body` so it is never trapped by the
 * header's backdrop-filter stacking context (which made links paint over
 * the page with no opaque shield — white-on-white on the hero).
 */
export function MobileNav({ className }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelId = useId();
  useScrollLock(open);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const overlay =
    mounted &&
    createPortal(
      <AnimatePresence>
        {open ? (
          <motion.div
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-label={`${siteConfig.name} menu`}
            className="fixed inset-0 z-[100] flex flex-col bg-[#0A0A0A]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition.base}
          >
            {/* Atmosphere as decoration only — never the sole backdrop */}
            <div
              aria-hidden
              className="site-atmosphere pointer-events-none absolute inset-0"
            />

            <div className="relative z-[1] flex h-16 shrink-0 items-center justify-between border-b border-border px-5 sm:px-6">
              <p className="font-display text-sm uppercase tracking-[0.2em] text-ivory">
                {siteConfig.shortName}
              </p>
              <button
                type="button"
                data-cursor="interactive"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className={cn(
                  "flex min-h-11 min-w-11 items-center gap-3 type-label text-ivory",
                  focusRingClass,
                )}
              >
                <span aria-hidden className="relative block h-3 w-6">
                  <span className="absolute left-0 top-1.5 block h-px w-full rotate-45 bg-ivory" />
                  <span className="absolute left-0 top-1.5 block h-px w-full -rotate-45 bg-ivory" />
                </span>
                <span>Close</span>
              </button>
            </div>

            <motion.nav
              aria-label="Mobile"
              className="relative z-[1] flex flex-1 flex-col justify-center overflow-y-auto px-5 pb-10 sm:px-6"
              variants={staggerChildren(0.07, 0.1)}
              initial="hidden"
              animate="visible"
            >
              <ul className="flex flex-col gap-1 border-t border-border pt-6">
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

              <motion.div variants={fadeUp} className="mt-10">
                <Link
                  href="/booking"
                  data-cursor="interactive"
                  onClick={() => setOpen(false)}
                  className={cn(
                    "inline-flex min-h-12 items-center justify-center border border-ivory bg-ivory px-6 type-label text-background transition-opacity hover:opacity-90",
                    focusRingClass,
                  )}
                >
                  Book your cut
                </Link>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-8">
                <p className="type-label text-ivory-subtle">
                  {siteConfig.tagline}
                </p>
              </motion.div>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>,
      document.body,
    );

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
          open && "pointer-events-none opacity-0",
          focusRingClass,
        )}
      >
        <span aria-hidden className="relative block h-3 w-6">
          <span className="absolute left-0 top-0.5 block h-px w-full bg-ivory" />
          <span className="absolute left-0 top-1.5 block h-px w-full bg-ivory" />
          <span className="absolute left-0 top-2.5 block h-px w-full bg-ivory" />
        </span>
        <span>Menu</span>
      </button>
      {overlay}
    </div>
  );
}
