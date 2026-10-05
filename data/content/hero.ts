/**
 * Homepage hero content.
 * Drop real photography at `public/images/hero.jpg` and set `image.src`.
 * Do not invent stock barber photography.
 */
export const heroContent = {
  brand: "Wamunigga",
  /** Editorial line breaks — rendered as stacked display lines */
  headline: ["THE ART", "OF THE CUT."] as const,
  positioning:
    "A premium barbering experience built on craftsmanship, reputation, and modern African identity.",
  primaryCta: {
    label: "BOOK YOUR CUT",
    href: "/booking",
  },
  secondaryCta: {
    label: "EXPLORE THE WORK",
    href: "/work",
  },
  /**
   * When real assets land, set `src` to "/images/hero.jpg" (or similar).
   * `null` keeps a cinematic atmospheric plane — never fake portraits.
   */
  image: {
    src: null as string | null,
    alt: "Wamunigga Cuts — the craft of the cut",
  },
};

export type HeroContent = typeof heroContent;
