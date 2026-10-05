/**
 * Information architecture for upcoming phases.
 * Only `enabled` items should render in navigation chrome.
 * Keep `href` as string literals so Next typed links stay accurate when routes ship.
 */
export const primaryNavigation = [
  { label: "Home", href: "/", enabled: true },
  { label: "Story", href: "/story", enabled: true },
  { label: "Work", href: "/work", enabled: true },
  { label: "Services", href: "/services", enabled: true },
  { label: "Booking", href: "/booking", enabled: true },
  { label: "Contact", href: "/contact", enabled: true },
] as const;

export type NavItem = (typeof primaryNavigation)[number];
export type EnabledNavItem = Extract<NavItem, { enabled: true }>;

export const enabledNavigation: EnabledNavItem[] = primaryNavigation.filter(
  (item): item is EnabledNavItem => item.enabled,
);
