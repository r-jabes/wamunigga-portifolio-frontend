/**
 * Work / archive — local photography. Gaps filled with available frames.
 */

import { wamuniggaMedia } from "@/data/content/media";

export type ArchiveImage = {
  src: string | null;
  alt: string;
};

export type ArchiveCategoryId = "fades" | "colour" | "clients" | "shop" | "signature-cuts";

export type ArchiveCategory = {
  id: ArchiveCategoryId;
  index: string;
  title: string;
  description: string;
};

export type ArchiveItemLayout = "portrait" | "cinematic";

export type ArchiveItem = {
  id: string;
  categoryId: ArchiveCategoryId;
  title: string;
  image: ArchiveImage;
  layout: ArchiveItemLayout;
};

export const archivePage = {
  title: "THE WORK",
  intro: "Fades, colour, clients, and the chair — selected frames from Kigali.",
} as const;

export const archiveCategories: ArchiveCategory[] = [
  {
    id: "fades",
    index: "01",
    title: "FADES",
    description: "Blend, line, and structure.",
  },
  {
    id: "colour",
    index: "02",
    title: "COLOUR",
    description: "Colour work from the shop.",
  },
  {
    id: "clients",
    index: "03",
    title: "CLIENTS",
    description: "People who sat in the chair.",
  },
  {
    id: "shop",
    index: "04",
    title: "THE CHAIR",
    description: "The room behind the work.",
  },
  {
    id: "signature-cuts",
    index: "05",
    title: "SIGNATURE",
    description: "Frames that carry the name.",
  },
];

export const archiveItems: ArchiveItem[] = [
  {
    id: "fade-01",
    categoryId: "fades",
    title: "Fade — structure",
    layout: "portrait",
    image: wamuniggaMedia.work.fade01,
  },
  {
    id: "fade-02",
    categoryId: "fades",
    title: "Fade — detail",
    layout: "portrait",
    image: wamuniggaMedia.work.fade02,
  },
  {
    id: "team-fade",
    categoryId: "fades",
    title: "Team taper",
    layout: "portrait",
    image: wamuniggaMedia.team.fade01,
  },
  {
    id: "colour-01",
    categoryId: "colour",
    title: "Colour — frame",
    layout: "portrait",
    image: wamuniggaMedia.work.color01,
  },
  {
    id: "client-davido",
    categoryId: "clients",
    title: "Davido",
    layout: "portrait",
    image: wamuniggaMedia.clients.davido,
  },
  {
    id: "client-juma",
    categoryId: "clients",
    title: "Juma Jux",
    layout: "portrait",
    image: wamuniggaMedia.clients.jumaJux,
  },
  {
    id: "client-juma-02",
    categoryId: "clients",
    title: "Juma Jux",
    layout: "portrait",
    image: wamuniggaMedia.clients.jumaJux02,
  },
  {
    id: "client-yve",
    categoryId: "clients",
    title: "Yve Kimenyi",
    layout: "portrait",
    image: wamuniggaMedia.clients.yveKimenyi,
  },
  {
    id: "client-chris",
    categoryId: "clients",
    title: "Chris Easy",
    layout: "portrait",
    image: wamuniggaMedia.clients.chrisEasy,
  },
  {
    id: "client-luckyman",
    categoryId: "clients",
    title: "Luckyman Nzeyimana",
    layout: "portrait",
    image: wamuniggaMedia.clients.luckyman,
  },
  {
    id: "client-rugaju",
    categoryId: "clients",
    title: "Rugaju Reagan",
    layout: "portrait",
    image: wamuniggaMedia.clients.rugajuReagan,
  },
  {
    id: "shop-01",
    categoryId: "shop",
    title: "Workspace",
    layout: "cinematic",
    image: wamuniggaMedia.shop.workspace,
  },
  {
    id: "signature-fashion",
    categoryId: "signature-cuts",
    title: "Wamunigga",
    layout: "portrait",
    image: wamuniggaMedia.portraits.fashion,
  },
  {
    id: "signature-portrait",
    categoryId: "signature-cuts",
    title: "Portrait",
    layout: "portrait",
    image: wamuniggaMedia.portraits.portrait02,
  },
  {
    id: "signature-hero",
    categoryId: "signature-cuts",
    title: "Editorial",
    layout: "portrait",
    image: wamuniggaMedia.portraits.hero,
  },
];

export type ArchiveFilterId = "all" | ArchiveCategoryId;

export const archiveFilters: { id: ArchiveFilterId; label: string }[] = [
  { id: "all", label: "All" },
  ...archiveCategories.map((c) => ({ id: c.id, label: c.title })),
];

export function getCategoryById(id: ArchiveCategoryId): ArchiveCategory {
  const category = archiveCategories.find((c) => c.id === id);
  if (!category) throw new Error(`Unknown category: ${id}`);
  return category;
}

export function filterArchiveItems(filter: ArchiveFilterId): ArchiveItem[] {
  if (filter === "all") return archiveItems;
  return archiveItems.filter((item) => item.categoryId === filter);
}
