/**
 * Story page content structure.
 *
 * IMPORTANT: Do not invent biography, dates, clientele names, or team details.
 * Add text to `paragraphs` only after Wamunigga or reliable sources verify it.
 */

export type StoryImage = {
  src: string | null;
  alt: string;
};

export type StorySection = {
  id: string;
  index: string;
  title: string;
  headline: string;
  /** Verified copy only — leave empty until supplied */
  paragraphs: readonly string[];
};

export const storyPage = {
  kicker: "Story",
  title: "THE MAN BEHIND THE CHAIR",
  intro:
    "The personal brand behind Wamunigga Cuts. Narrative on this page is reserved for verified facts — not generated filler.",
  portrait: {
    src: null as string | null,
    alt: "Wamunigga — portrait",
  } satisfies StoryImage,
} as const;

export const storySections: StorySection[] = [
  {
    id: "wamunigga-story",
    index: "01",
    title: "Story",
    headline: "Wamunigga's story",
    paragraphs: [],
  },
  {
    id: "journey",
    index: "02",
    title: "Journey",
    headline: "Barbering journey",
    paragraphs: [],
  },
  {
    id: "philosophy",
    index: "03",
    title: "Philosophy",
    headline: "Philosophy",
    paragraphs: [],
  },
  {
    id: "craftsmanship",
    index: "04",
    title: "Craft",
    headline: "Craftsmanship",
    paragraphs: [],
  },
  {
    id: "clientele",
    index: "05",
    title: "Clientele",
    headline: "Celebrity & high-profile clientele",
    paragraphs: [],
  },
  {
    id: "brand",
    index: "06",
    title: "Brand",
    headline: "Wamunigga Cuts",
    paragraphs: [],
  },
  {
    id: "team",
    index: "07",
    title: "Team",
    headline: "Team",
    paragraphs: [],
  },
];

export const storyPendingMessage =
  "Verified story copy will be added here. Share approved biography, timeline, and names with the project team.";

export type StoryPageContent = typeof storyPage;
