/**
 * WAMUNIGGA CUTS
 * Instagram Reel Embed Registry
 *
 * All Instagram Reels used throughout the Wamunigga Cuts website prototype.
 *
 * These URLs are intended to be consumed by the Instagram embed component.
 * Keep the URLs centralized here so individual pages/components do not
 * contain hard-coded Instagram links.
 */

export const instagramEmbeds = {
  // ============================================================
  // SHOP / THE CHAIR
  // ============================================================

  workplace: {
    id: "DdEZ2B5gY9O",
    url: "https://www.instagram.com/reel/DdEZ2B5gY9O/",
    category: "shop",
    title: "Wamunigga Cuts — The Chair",
    source: "@wamunigga_cuts",
  },

  // ============================================================
  // CRAFT / WORK
  // ============================================================

  generalBenda: {
    id: "Dd8kxZiALHB",
    url: "https://www.instagram.com/reel/Dd8kxZiALHB/",
    category: "craft",
    title: "General Benda — Haircut",
    source: "@wamunigga_original",
  },

  bushali: {
    id: "DZucfW-gRD0",
    url: "https://www.instagram.com/reel/DZucfW-gRD0/",
    category: "craft",
    title: "Bushali — Haircut",
    source: "@wamunigga_original",
  },

  ezraUmujistoma: {
    id: "DV9WFLYAKQl",
    url: "https://www.instagram.com/reel/DV9WFLYAKQl/",
    category: "craft",
    title: "Ezra Umujistoma — Haircut",
    source: "@wamunigga_original",
  },

  // ============================================================
  // TEAM
  // ============================================================

  employeeFade: {
    id: "DcjB7OzoeD9",
    url: "https://www.instagram.com/reel/DcjB7OzoeD9/",
    category: "team",
    title: "Clean Taper Fade",
    source: "@jones_cuts_",
  },

  // ============================================================
  // CREDIBILITY / SOCIAL PROOF
  // ============================================================

  davido: {
    id: "DR4x7rDDH6d",
    url: "https://www.instagram.com/reel/DR4x7rDDH6d/",
    category: "credibility",
    title: "Davido — Wamunigga Cuts",
    source: "@wamunigga_original",
  },

  // ============================================================
  // CLIENTS
  // ============================================================

  kevinKade: {
    id: "DbnpTYpoJX_",
    url: "https://www.instagram.com/reel/DbnpTYpoJX_/",
    category: "client",
    title: "Kevin Kade — Haircut",
    source: "@kigali_clipperzone_salon",
  },

  bruceTheFirst: {
    id: "DbnpIjLI1nC",
    url: "https://www.instagram.com/reel/DbnpIjLI1nC/",
    category: "client",
    title: "Bruce the First — Haircut",
    source: "@kigali_clipperzone_salon",
  },
} as const;


// ============================================================
// TYPE
// ============================================================

export type InstagramEmbed =
  (typeof instagramEmbeds)[keyof typeof instagramEmbeds];

export type InstagramEmbedKey = keyof typeof instagramEmbeds;


// ============================================================
// ARRAYS / HELPERS
// ============================================================

export const allInstagramEmbeds = Object.values(instagramEmbeds);

export const craftEmbeds = allInstagramEmbeds.filter(
  (embed) => embed.category === "craft"
);

export const clientEmbeds = allInstagramEmbeds.filter(
  (embed) => embed.category === "client"
);

export const teamEmbeds = allInstagramEmbeds.filter(
  (embed) => embed.category === "team"
);

export const shopEmbeds = allInstagramEmbeds.filter(
  (embed) => embed.category === "shop"
);

export const credibilityEmbeds = allInstagramEmbeds.filter(
  (embed) => embed.category === "credibility"
);


// ============================================================
// LOOKUP
// ============================================================

export function getInstagramEmbed(
  key: keyof typeof instagramEmbeds
) {
  return instagramEmbeds[key];
}

