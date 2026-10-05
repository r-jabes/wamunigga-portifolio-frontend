/**
 * Homepage storytelling — local photos + selective local videos.
 */

import { wamuniggaMedia } from "@/data/content/media";
import type { LocalVideoKey } from "@/data/content/videos";

export type HomeImageSlot = {
  src: string | null;
  alt: string;
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
    video: "davido" as LocalVideoKey,
  },
  craft: {
    index: "02",
    title: "The Craft",
    eyebrow: "Visible work",
    lead: "Fades, colour, shape, and finishing you can see.",
    lines: ["Clean fades.", "Tight finishing.", "Cuts that fit the person."],
    images: [wamuniggaMedia.work.fade01, wamuniggaMedia.work.fade02],
    /** Colour is a local reel, not a still */
    colorVideo: "workColor" as LocalVideoKey,
    craftVideos: ["generalBenda", "bushali", "ezra"] as LocalVideoKey[],
  },
  signatureWork: {
    index: "03",
    title: "The Work",
    eyebrow: "From the archive",
    intro: "Selected frames and cuts from the chair.",
    items: [
      {
        id: "fade-01",
        label: "01",
        title: "Fade",
        layout: "portrait" as const,
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
        id: "juma",
        label: "03",
        title: "Juma Jux",
        layout: "portrait" as const,
        image: wamuniggaMedia.clients.jumaJux02,
      },
      {
        id: "luckyman",
        label: "04",
        title: "Luckyman Nzeyimana",
        layout: "portrait" as const,
        image: wamuniggaMedia.clients.luckyman,
      },
    ],
    videos: ["kevinKade", "bruceTheFirst"] as LocalVideoKey[],
    cta: { label: "View full archive", href: "/work" },
  },
  chair: {
    index: "04",
    title: "The Chair",
    eyebrow: "Kigali Clipper Zone",
    lead: "This is where the work happens.",
    image: wamuniggaMedia.shop.workspace,
    video: "shop" as LocalVideoKey,
  },
  team: {
    index: "05",
    title: "The Team",
    eyebrow: "More than one chair",
    lead: "Good work does not stop with one barber.",
    image: wamuniggaMedia.team.fade01,
    video: "employeeFade" as LocalVideoKey,
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
    image: wamuniggaMedia.work.fade02,
  },
  bookingCta: {
    index: "08",
    headline: "BOOK YOUR CUT.",
    subline: "Pick a service and time. Confirmation happens after you book.",
    primary: { label: "BOOK YOUR CUT", href: "/booking" },
    secondary: { label: "Contact", href: "/contact" },
    image: wamuniggaMedia.shop.workspace,
  },
} as const;

export type HomeContent = typeof homeContent;
