"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNavigation, type NavItem } from "@/data/content/navigation";
import { focusRingClass } from "@/lib/a11y";
import { cn } from "@/lib/utils";

type NavLinksProps = {
  items?: readonly NavItem[];
  variant?: "desktop" | "footer";
  onNavigate?: () => void;
  className?: string;
};

/**
 * Shared IA links — enabled routes navigate; planned routes stay visible but inert.
 */
export function NavLinks({
  items = primaryNavigation,
  variant = "desktop",
  onNavigate,
  className,
}: NavLinksProps) {
  const pathname = usePathname();

  return (
    <ul
      className={cn(
        variant === "desktop" && "flex items-center gap-7",
        variant === "footer" &&
          "flex flex-wrap items-center gap-x-5 gap-y-2",
        className,
      )}
    >
      {items.map((item) => {
        const isActive = item.enabled && pathname === item.href;

        if (!item.enabled) {
          return (
            <li key={item.href}>
              <span
                className={cn(
                  "type-label text-ivory/25",
                  variant === "footer" && "text-[0.6875rem]",
                )}
                aria-disabled="true"
              >
                {item.label}
              </span>
            </li>
          );
        }

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              data-cursor="interactive"
              onClick={onNavigate}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "type-label transition-colors duration-200",
                focusRingClass,
                variant === "footer" && "text-[0.6875rem]",
                isActive
                  ? "text-ivory"
                  : "text-ivory-subtle hover:text-ivory",
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
