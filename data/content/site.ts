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
    "WAMUNIGGA CUTS — premium barbering and personal brand presence.",
  /** Update before production deploy */
  url: "https://www.wamuniggacuts.com",
  locale: "en_RW",
  ogImage: "/images/og-default.jpg",
  keywords: [
    "Wamunigga Cuts",
    "barber",
    "Rwanda",
    "premium cuts",
    "the art of the cut",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
