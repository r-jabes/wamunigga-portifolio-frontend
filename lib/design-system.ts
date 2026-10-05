/**
 * Design-system tokens (JS mirror of CSS custom properties in globals.css).
 * Prefer Tailwind token utilities in components; use these for JS/runtime needs.
 */

export const colors = {
  background: "#0A0A0A",
  foreground: "#F2F0EB",
  ivory: "#F2F0EB",
  ivoryMuted: "rgba(242, 240, 235, 0.72)",
  ivorySubtle: "rgba(242, 240, 235, 0.45)",
  ivoryFaint: "rgba(242, 240, 235, 0.12)",
  accent: "#651B2E",
  champagne: "#B69A62",
  muted: "#8A8780",
  surface: "#121212",
  surfaceElevated: "#1A1A1A",
  surfaceInset: "#0E0E0E",
  border: "rgba(242, 240, 235, 0.12)",
  borderStrong: "rgba(242, 240, 235, 0.28)",
  focus: "rgba(242, 240, 235, 0.8)",
} as const;

/** Editorial type ramp — display is condensed Oswald; body is DM Sans. */
export const typeScale = {
  displayXl: {
    font: "display",
    size: "clamp(3.5rem, 10vw, 7.5rem)",
    weight: 500,
    tracking: "0.04em",
    leading: 0.92,
  },
  displayLg: {
    font: "display",
    size: "clamp(2.75rem, 7vw, 5rem)",
    weight: 500,
    tracking: "0.06em",
    leading: 0.95,
  },
  displayMd: {
    font: "display",
    size: "clamp(2rem, 4.5vw, 3.25rem)",
    weight: 500,
    tracking: "0.08em",
    leading: 1,
  },
  heading: {
    font: "display",
    size: "clamp(1.5rem, 2.5vw, 2rem)",
    weight: 500,
    tracking: "0.12em",
    leading: 1.15,
  },
  subhead: {
    font: "sans",
    size: "1.125rem",
    weight: 500,
    tracking: "0.02em",
    leading: 1.45,
  },
  body: {
    font: "sans",
    size: "1rem",
    weight: 400,
    tracking: "0.01em",
    leading: 1.65,
  },
  bodySm: {
    font: "sans",
    size: "0.875rem",
    weight: 400,
    tracking: "0.01em",
    leading: 1.6,
  },
  label: {
    font: "sans",
    size: "0.75rem",
    weight: 500,
    tracking: "0.16em",
    leading: 1.3,
  },
  caption: {
    font: "sans",
    size: "0.75rem",
    weight: 400,
    tracking: "0.04em",
    leading: 1.5,
  },
} as const;

export const fontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

/** 4px base grid with editorial breathing room at larger steps. */
export const spacing = {
  0: "0",
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  32: "8rem",
  sectionMobile: "5rem",
  sectionDesktop: "8rem",
  sectionHero: "clamp(5rem, 12vh, 9rem)",
} as const;

/**
 * Radius strategy: sharp editorial geometry.
 * Soft “pill” radii are intentionally absent.
 */
export const radii = {
  none: "0",
  hairline: "1px",
  sm: "2px",
  md: "4px",
} as const;

export const shadows = {
  none: "none",
  soft: "0 12px 40px rgba(0, 0, 0, 0.35)",
  lift: "0 18px 50px rgba(0, 0, 0, 0.45)",
  inset: "inset 0 0 0 1px rgba(242, 240, 235, 0.08)",
} as const;

export const containerWidths = {
  narrow: "48rem",
  default: "72rem",
  wide: "80rem",
  full: "100%",
} as const;

export const motionPrinciples = {
  purpose: "Motion communicates craftsmanship and confidence — never decoration for its own sake.",
  allowed: [
    "subtle opacity/translate reveals",
    "image clip reveals",
    "smooth hover scale/opacity on media",
    "understated page/section entrances",
    "editorial stagger (short, deliberate)",
    "desktop cursor state changes",
  ],
  avoided: [
    "excessive parallax",
    "bounce/springy UI",
    "constant floating loops",
    "gratuitous 3D",
    "animating every element",
  ],
} as const;
