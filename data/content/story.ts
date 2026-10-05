/**
 * Story page — portraits + restrained facts.
 */

import { wamuniggaMedia } from "@/data/content/media";

export type StoryImage = {
  src: string | null;
  alt: string;
};

export type StorySection = {
  id: string;
  index: string;
  title: string;
  headline: string;
  paragraphs: readonly string[];
  image?: StoryImage;
};

export const storyPage = {
  kicker: "Story",
  title: "WAMUNIGGA",
  intro:
    "The barber behind Wamunigga Cuts. Full biography stays off this page until he provides it.",
  portrait: {
    src: wamuniggaMedia.portraits.fashion.src,
    alt: wamuniggaMedia.portraits.fashion.alt,
  } satisfies StoryImage,
  secondaryPortrait: {
    src: wamuniggaMedia.portraits.portrait02.src,
    alt: wamuniggaMedia.portraits.portrait02.alt,
  } satisfies StoryImage,
} as const;

export const storySections: StorySection[] = [
  {
    id: "chair",
    index: "01",
    title: "Chair",
    headline: "Behind the chair",
    paragraphs: [
      "Wamunigga Didier cuts in Kigali.",
      "The brand is built from the work — fades, finishing, and clients who leave looking sharper than they arrived.",
    ],
    image: wamuniggaMedia.shop.workspace,
  },
  {
    id: "work",
    index: "02",
    title: "Work",
    headline: "The work speaks first",
    paragraphs: [
      "See the archive for fades, colour, and clients from the chair.",
      "Local video from the shop sits alongside the stills — no Instagram embeds.",
    ],
    image: wamuniggaMedia.work.fade01,
  },
  {
    id: "shop",
    index: "03",
    title: "Shop",
    headline: "Kigali Clipper Zone",
    paragraphs: [
      "The shop is where the cuts happen.",
      "Address and hours will appear on Contact once confirmed.",
    ],
    image: wamuniggaMedia.team.fade01,
  },
];

export const storyPendingMessage =
  "Verified story details will be added here when Wamunigga supplies them.";

export type StoryPageContent = typeof storyPage;
