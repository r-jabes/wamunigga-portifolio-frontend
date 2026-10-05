/**
 * Work / archive — real photography only.
 * Amasunzu omitted until strong visual assets exist.
 */

import { wamuniggaMedia } from "@/data/content/media";

export type ArchiveImage = {
  src: string | null;
  alt: string;
};

export type ArchiveCategoryId = "fades" | "colour" | "clients" | "signature-cuts";

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
  intro:
    "Fades, colour, and clients from the chair — selected frames, not a feed dump.",
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
    description: "Colour work finished in the shop.",
  },
  {
    id: "clients",
    index: "03",
    title: "CLIENTS",
    description: "People who sat in the chair.",
  },
  {
    id: "signature-cuts",
    index: "04",
    title: "SIGNATURE",
    description: "Frames that carry the name.",
  },
];

export const archiveItems: ArchiveItem[] = [
  {
    id: "fade-01",
    categoryId: "fades",
    title: "Fade — structure",
    layout: "cinematic",
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
    id: "colour-01",
    categoryId: "colour",
    title: "Colour — finish",
    layout: "portrait",
    image: wamuniggaMedia.work.color01,
  },
  {
    id: "client-yve",
    categoryId: "clients",
    title: "Yve Kimenyi",
    layout: "portrait",
    image: wamuniggaMedia.clients.yveKimenyi,
  },
  {
    id: "client-juma",
    categoryId: "clients",
    title: "Juma Jux",
    layout: "cinematic",
    image: wamuniggaMedia.clients.jumaJux,
  },
  {
    id: "client-chris",
    categoryId: "clients",
    title: "Chris Easy",
    layout: "portrait",
    image: wamuniggaMedia.clients.chrisEasy,
  },
  {
    id: "client-davido",
    categoryId: "clients",
    title: "Davido",
    layout: "cinematic",
    image: wamuniggaMedia.clients.davido,
  },
  {
    id: "client-rugaju",
    categoryId: "clients",
    title: "Rugaju Reagan",
    layout: "portrait",
    image: wamuniggaMedia.clients.rugajuReagan,
  },
  {
    id: "signature-team",
    categoryId: "signature-cuts",
    title: "Team taper",
    layout: "portrait",
    image: wamuniggaMedia.team.fade01,
  },
  {
    id: "signature-shop",
    categoryId: "signature-cuts",
    title: "The workspace",
    layout: "cinematic",
    image: wamuniggaMedia.shop.workspace,
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
