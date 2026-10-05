/**
 * Brand + site constants.
 * Replace placeholders (url, ogImage, contact) with real values when available.
 * Do not invent services, prices, location, or biography here.
 */
export const siteConfig = {
  name: "WAMUNIGGA CUTS",
  shortName: "Wamunigga",
  tagline: "THE ART OF THE CUT.",
  description:
    "Wamunigga Cuts — barbering in Kigali. Book online, or find the chair from Instagram.",
  /** Update before production deploy */
  url: "https://www.wamuniggacuts.com",
  locale: "en_RW",
  /**
   * Fallback for JSON-LD / explicit overrides.
   * Default social previews use `app/opengraph-image.tsx`.
   */
  ogImage: "/opengraph-image",
  keywords: [
    "Wamunigga Cuts",
    "barber",
    "Rwanda",
    "Kigali barber",
    "premium cuts",
    "book a cut",
    "the art of the cut",
    "Instagram barber",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
