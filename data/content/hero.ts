/**
 * Homepage hero content — brand-first, concise, Kigali-rooted.
 */
export const heroContent = {
  brand: "WAMUNIGGA CUTS",
  location: "Kigali, Rwanda",
  /** Editorial line breaks — rendered as stacked display lines */
  headline: ["THE ART", "OF THE CUT."] as const,
  positioning: "Barbering from the chair in Kigali.",
  primaryCta: {
    label: "BOOK YOUR CUT",
    href: "/booking",
  },
  secondaryCta: {
    label: "VIEW THE WORK",
    href: "/work",
  },
  image: {
    src: "/images/wamunigga/portraits/wamunigga-hero-portrait.png",
    alt: "Wamunigga standing for an editorial portrait",
  },
};

export type HeroContent = typeof heroContent;
