"use client";

import Link from "next/link";
import { enabledNavigation } from "@/data/content/navigation";
import { siteConfig } from "@/data/content/site";
import { Container } from "@/components/layout/container";
import { MobileNav } from "@/components/layout/mobile-nav";
import { focusRingClass } from "@/lib/a11y";
import { cn } from "@/lib/utils";

/**
 * Structural header chrome.
 * Desktop: inline enabled routes. Mobile: full-screen MobileNav.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-6 md:h-20">
        <Link
          href="/"
          data-cursor="interactive"
          className={cn(
            "font-display text-lg uppercase tracking-[0.18em] text-ivory md:text-xl",
            focusRingClass,
          )}
        >
          {siteConfig.name}
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          {enabledNavigation.length > 0 ? (
            <ul className="flex items-center gap-7">
              {enabledNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    data-cursor="interactive"
                    className={cn(
                      "type-label text-ivory-subtle transition-colors duration-200 hover:text-ivory",
                      focusRingClass,
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </nav>

        <MobileNav />
      </Container>
    </header>
  );
}
