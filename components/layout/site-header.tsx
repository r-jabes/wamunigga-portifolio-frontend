import Link from "next/link";
import { enabledNavigation } from "@/data/content/navigation";
import { siteConfig } from "@/data/content/site";
import { Container } from "@/components/layout/container";
import { focusRingClass } from "@/lib/a11y";
import { cn } from "@/lib/utils";

/**
 * Structural header chrome only — not a finished navigation experience.
 * Additional IA links unlock when their routes are enabled in content data.
 */
export function SiteHeader() {
  return (
    <header className="border-b border-ivory/10">
      <Container className="flex h-16 items-center justify-between gap-6 md:h-20">
        <Link
          href="/"
          className={cn(
            "font-display text-lg uppercase tracking-[0.18em] text-ivory md:text-xl",
            focusRingClass,
          )}
        >
          {siteConfig.name}
        </Link>

        {enabledNavigation.length > 1 ? (
          <nav aria-label="Primary">
            <ul className="flex items-center gap-5">
              {enabledNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "font-sans text-xs uppercase tracking-[0.16em] text-ivory/70 transition-colors hover:text-ivory",
                      focusRingClass,
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </Container>
    </header>
  );
}
