"use client";

import Link from "next/link";
import { siteConfig } from "@/data/content/site";
import { Container } from "@/components/layout/container";
import { MobileNav } from "@/components/layout/mobile-nav";
import { NavLinks } from "@/components/layout/nav-links";
import { focusRingClass } from "@/lib/a11y";
import { cn } from "@/lib/utils";

/**
 * Global top bar — brand-first, editorial, confident.
 * Full IA is visible; unbuilt routes remain muted until enabled.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-6 md:h-[4.75rem]">
        <Link
          href="/"
          data-cursor="interactive"
          className={cn(
            "group flex flex-col justify-center gap-0.5",
            focusRingClass,
          )}
        >
          <span className="font-display text-[0.95rem] uppercase tracking-[0.2em] text-ivory transition-colors duration-200 group-hover:text-ivory/90 md:text-lg md:tracking-[0.22em]">
            {siteConfig.name}
          </span>
          <span className="hidden type-label text-[0.625rem] tracking-[0.22em] text-ivory-subtle sm:block">
            {siteConfig.tagline}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <NavLinks />
        </nav>

        <MobileNav />
      </Container>
    </header>
  );
}
