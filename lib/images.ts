/**
 * Image performance conventions.
 *
 * - Prefer `MediaImage` over raw `next/image` for consistent sizing & quality.
 * - Place brand photography under `/public/images/`.
 * - Always provide width/height or `fill` + sized parent to avoid CLS.
 * - Use `priority` only for LCP candidates (typically one hero image).
 * - Prefer modern formats (AVIF/WebP); Next.js optimizes on the fly.
 */

export const imageSizes = {
  /** Full-bleed hero / cinematic frames */
  hero: "100vw",
  /** Content column media */
  content: "(min-width: 1024px) 720px, 100vw",
  /** Archive / grid tiles */
  tile: "(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw",
  /** Avatar / small brand marks */
  avatar: "96px",
} as const;

export const imageQuality = {
  hero: 82,
  standard: 75,
  thumbnail: 70,
} as const;

export type ImageAspect = "portrait" | "landscape" | "square" | "cinematic";

export const aspectRatioClass: Record<ImageAspect, string> = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
  cinematic: "aspect-[21/9]",
};
