/**
 * Canonical breakpoints (px). Mirrored in `app/globals.css` `@theme`.
 * Prefer Tailwind classes in components; use these values for JS media queries.
 */
export const breakpoints = {
  xs: 375,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export type Breakpoint = keyof typeof breakpoints;

export function minWidthQuery(breakpoint: Breakpoint): string {
  return `(min-width: ${breakpoints[breakpoint]}px)`;
}
