/**
 * Work / archive content — editorial categories and frames.
 * Set `image.src` when real photography is available. No stock imagery.
 */

export type ArchiveImage = {
  src: string | null;
  alt: string;
};

export type ArchiveCategoryId =
  | "fades"
  | "amasunzu"
  | "designs"
  | "beard"
  | "signature-cuts";

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
    "An editorial archive of craft — fades, culture, design, and signature finishes from the chair.",
} as const;

export const archiveCategories: ArchiveCategory[] = [
  {
    id: "fades",
    index: "01",
    title: "FADES",
    description: "Gradients with architecture — clean, sharp, intentional.",
  },
  {
    id: "amasunzu",
    index: "02",
    title: "AMASUNZU",
    description: "Cultural precision — shape, line, and heritage reimagined.",
  },
  {
    id: "designs",
    index: "03",
    title: "DESIGNS",
    description: "Pattern, texture, and graphic intent in the hair.",
  },
  {
    id: "beard",
    index: "04",
    title: "BEARD",
    description: "Sculpted beard work — line, weight, and finish.",
  },
  {
    id: "signature-cuts",
    index: "05",
    title: "SIGNATURE CUTS",
    description: "Defining frames — the cuts that carry the name.",
  },
];

export const archiveItems: ArchiveItem[] = [
  {
    id: "fade-01",
    categoryId: "fades",
    title: "Low fade — structure",
    layout: "cinematic",
    image: { src: null, alt: "Fade — structure" },
  },
  {
    id: "fade-02",
    categoryId: "fades",
    title: "Mid fade — blend",
    layout: "portrait",
    image: { src: null, alt: "Fade — blend" },
  },
  {
    id: "amasunzu-01",
    categoryId: "amasunzu",
    title: "Amasunzu — line",
    layout: "cinematic",
    image: { src: null, alt: "Amasunzu — line" },
  },
  {
    id: "amasunzu-02",
    categoryId: "amasunzu",
    title: "Amasunzu — profile",
    layout: "portrait",
    image: { src: null, alt: "Amasunzu — profile" },
  },
  {
    id: "design-01",
    categoryId: "designs",
    title: "Design — graphic",
    layout: "portrait",
    image: { src: null, alt: "Hair design — graphic" },
  },
  {
    id: "design-02",
    categoryId: "designs",
    title: "Design — texture",
    layout: "cinematic",
    image: { src: null, alt: "Hair design — texture" },
  },
  {
    id: "beard-01",
    categoryId: "beard",
    title: "Beard — line-up",
    layout: "cinematic",
    image: { src: null, alt: "Beard — line-up" },
  },
  {
    id: "beard-02",
    categoryId: "beard",
    title: "Beard — sculpt",
    layout: "portrait",
    image: { src: null, alt: "Beard — sculpt" },
  },
  {
    id: "signature-01",
    categoryId: "signature-cuts",
    title: "Signature — finish",
    layout: "cinematic",
    image: { src: null, alt: "Signature cut — finish" },
  },
  {
    id: "signature-02",
    categoryId: "signature-cuts",
    title: "Signature — silhouette",
    layout: "portrait",
    image: { src: null, alt: "Signature cut — silhouette" },
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
