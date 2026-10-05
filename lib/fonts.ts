import { DM_Sans, Oswald } from "next/font/google";

/**
 * Typography infrastructure:
 * - Display: Oswald — condensed, editorial presence for brand statements
 * - Body: DM Sans — modern, highly legible sans for UI and long-form
 *
 * CSS variables here are source tokens; mapped to Tailwind theme in globals.css.
 */
export const fontDisplay = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
  /** Trim unused weights to keep the critical font payload lean. */
  weight: ["400", "500", "600"],
  preload: true,
});

export const fontSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "600"],
  preload: true,
});
