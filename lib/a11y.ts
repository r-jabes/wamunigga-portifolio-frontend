/**
 * Accessibility conventions for the Wamunigga Cuts frontend.
 *
 * - Every interactive control must be keyboard reachable and have a visible
 *   `:focus-visible` ring (see globals.css).
 * - Decorative images use `alt=""`; informative images require meaningful alt.
 * - Prefer semantic landmarks: header, main, footer, nav with aria-label.
 * - Motion must respect `prefers-reduced-motion` (MotionProvider + CSS).
 * - Use `srOnly` / Tailwind `sr-only` for visually hidden labels.
 * - External links that open a new tab should disclose that to assistive tech.
 */

export const MAIN_CONTENT_ID = "main-content";

export const srOnly =
  "absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0 [clip:rect(0,0,0,0)]";

export function externalLinkAriaLabel(label: string): string {
  return `${label} (opens in a new tab)`;
}

export const focusRingClass =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ivory/80 focus-visible:ring-offset-2 focus-visible:ring-offset-background";
