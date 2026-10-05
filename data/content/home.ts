/**
 * Homepage storytelling — specific, restrained copy.
 * Media paths point at real assets under /public/images/wamunigga.
 */

import { wamuniggaMedia } from "@/data/content/media";
import type { InstagramEmbedKey } from "@/data/instagram";

export type HomeImageSlot = {
  src: string | null;
  alt: string;
  /** Optional object-position for art direction */
  objectPosition?: string;
};

export const homeContent = {
  reputation: {
    index: "01",
    title: "Reputation",
    eyebrow: "A name built behind the chair",
    lead: "The work travels. The chair stays in Kigali.",
    paragraphs: [
      "Wamunigga Cuts is known for detailed fades, distinctive finishes, and cuts that hold up outside the shop.",
      "The reputation comes from the chair — not from slogans.",
    ],
    frames: [
      {
        id: "davido",
        label: "Davido",
        caption: "In the chair",
        image: wamuniggaMedia.clients.davido,
      },
      {
        id: "juma",
        label: "Juma Jux",
        caption: "Finished cut",
        image: wamuniggaMedia.clients.jumaJux,
      },
      {
        id: "chris",
        label: "Chris Easy",
        caption: "After the cut",
        image: wamuniggaMedia.clients.chrisEasy,
      },
    ],
    reel: "davido" as InstagramEmbedKey,
    reelNote: "Footage from the chair — not an endorsement statement.",
  },
  craft: {
    index: "02",
    title: "The Craft",
    eyebrow: "Visible work",
    lead: "Fades, colour, shape, and finishing you can see.",
    lines: [
      "Clean fades.",
      "Tight finishing.",
      "Cuts that fit the person.",
    ],
    images: [
      wamuniggaMedia.work.fade01,
      wamuniggaMedia.work.fade02,
      wamuniggaMedia.work.color01,
    ],
    reels: ["generalBenda", "bushali", "ezraUmujistoma"] as InstagramEmbedKey[],
  },
  signatureWork: {
    index: "03",
    title: "The Work",
    eyebrow: "From the archive",
    intro: "Selected frames — fades, colour, and clients from the chair.",
    items: [
      {
        id: "fade-01",
        label: "01",
        title: "Fade",
        layout: "cinematic" as const,
        image: wamuniggaMedia.work.fade01,
      },
      {
        id: "yve",
        label: "02",
        title: "Yve Kimenyi",
        layout: "portrait" as const,
        image: wamuniggaMedia.clients.yveKimenyi,
      },
      {
        id: "color",
        label: "03",
        title: "Colour",
        layout: "portrait" as const,
        image: wamuniggaMedia.work.color01,
      },
      {
        id: "juma",
        label: "04",
        title: "Juma Jux",
        layout: "cinematic" as const,
        image: wamuniggaMedia.clients.jumaJuxAlt,
      },
    ],
    clientReels: ["kevinKade", "bruceTheFirst"] as InstagramEmbedKey[],
    cta: { label: "View full archive", href: "/work" },
  },
  chair: {
    index: "04",
    title: "The Chair",
    eyebrow: "Kigali Clipper Zone",
    lead: "This is where the work happens.",
    image: wamuniggaMedia.shop.workspace,
    reel: "workplace" as InstagramEmbedKey,
  },
  team: {
    index: "05",
    title: "The Team",
    eyebrow: "More than one chair",
    lead: "Good work does not stop with one barber.",
    image: wamuniggaMedia.team.fade01,
    reel: "employeeFade" as InstagramEmbedKey,
  },
  wamunigga: {
    index: "06",
    title: "Wamunigga",
    eyebrow: "Behind the brand",
    lead: "The person behind the chair.",
    paragraphs: [
      "Wamunigga Didier — barber and the name on the brand.",
      "The story page stays short until he supplies the full narrative himself.",
    ],
    images: [
      wamuniggaMedia.portraits.fashion,
      wamuniggaMedia.portraits.portrait02,
    ],
    cta: { label: "Read the story", href: "/story" },
  },
  services: {
    index: "07",
    title: "Services",
    eyebrow: "The menu",
    intro:
      "Cuts, beard work, and detail sessions. Prices stay open until confirmed in the catalogue.",
  },
  bookingCta: {
    index: "08",
    headline: "BOOK YOUR CUT.",
    subline: "Pick a service and time. Confirmation happens after you book.",
    primary: { label: "BOOK YOUR CUT", href: "/booking" },
    secondary: { label: "Contact", href: "/contact" },
  },
} as const;

export type HomeContent = typeof homeContent;
