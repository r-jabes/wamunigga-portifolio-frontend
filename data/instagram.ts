/**
 * WAMUNIGGA CUTS — Instagram Reel URL registry
 *
 * Reference only. The site does NOT embed or load Instagram Reels.
 * Use these URLs when downloading videos locally, then map files under
 * public/videos/ (or similar) when local playback is added.
 */

export const instagramEmbeds = {
  workplace: {
    id: "DdEZ2B5gY9O",
    url: "https://www.instagram.com/reel/DdEZ2B5gY9O/",
    category: "shop",
    title: "Wamunigga Cuts — The Chair",
    source: "@wamunigga_cuts",
  },
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
  employeeFade: {
    id: "DcjB7OzoeD9",
    url: "https://www.instagram.com/reel/DcjB7OzoeD9/",
    category: "team",
    title: "Clean Taper Fade",
    source: "@jones_cuts_",
  },
  davido: {
    id: "DR4x7rDDH6d",
    url: "https://www.instagram.com/reel/DR4x7rDDH6d/",
    category: "credibility",
    title: "Davido — Wamunigga Cuts",
    source: "@wamunigga_original",
  },
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

export type InstagramEmbed =
  (typeof instagramEmbeds)[keyof typeof instagramEmbeds];

export type InstagramEmbedKey = keyof typeof instagramEmbeds;

export const allInstagramEmbeds = Object.values(instagramEmbeds);
