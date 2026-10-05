import { MediaImage } from "@/components/media";
import type { HomeImageSlot } from "@/data/content/home";
import { imageQuality } from "@/lib/images";
import { cn } from "@/lib/utils";

type CinematicMediaProps = {
  image: HomeImageSlot;
  aspect?: "portrait" | "landscape" | "cinematic";
  className?: string;
  priority?: boolean;
  /** Kept for API compat — clip reveal removed (hid media / zeroed heights). */
  revealFrom?: "bottom" | "left" | "right";
  /**
   * Cap frame so full edges stay on screen.
   * Default true for editorial frames.
   */
  fitViewport?: boolean;
  objectPosition?: string;
};

/**
 * Fill parent width up to a max, but never so wide that height exceeds ~70vh.
 */
const frameClass = {
  portrait:
    "aspect-[3/4] w-full max-w-[min(100%,22rem,calc(62vh*3/4))]",
  landscape:
    "aspect-[4/3] w-full max-w-[min(100%,40rem,calc(50vh*4/3))]",
  cinematic:
    "aspect-[16/9] w-full max-w-[min(100%,56rem,calc(42vh*16/9))]",
} as const;

const sizesFor = {
  portrait: "(min-width: 1024px) 420px, 80vw",
  landscape: "(min-width: 1024px) 720px, 100vw",
  cinematic: "(min-width: 1024px) 960px, 100vw",
} as const;

/**
 * Editorial still — always has explicit box size (no clip-path wrappers).
 */
export function CinematicMedia({
  image,
  aspect = "portrait",
  className,
  priority = false,
  fitViewport = true,
  objectPosition = "object-center",
}: CinematicMediaProps) {
  return (
    <div
      className={cn(
        "relative mx-auto overflow-hidden bg-surface surface-film image-grain",
        fitViewport
          ? frameClass[aspect]
          : cn(
              aspect === "portrait" && "aspect-[3/4] w-full",
              aspect === "landscape" && "aspect-[4/3] w-full",
              aspect === "cinematic" && "aspect-[16/9] w-full",
            ),
        className,
      )}
    >
      {image.src ? (
        <MediaImage
          src={image.src}
          alt={image.alt}
          fill
          priority={priority}
          sizes={sizesFor[aspect]}
          quality={imageQuality.standard}
          className="absolute inset-0 h-full w-full"
          imageClassName={cn("object-cover", objectPosition)}
        />
      ) : (
        <div
          role="img"
          aria-label={image.alt}
          className="absolute inset-0 h-full w-full bg-[radial-gradient(ellipse_80%_70%_at_50%_40%,#1a1a1a_0%,#0a0a0a_75%)]"
        />
      )}
    </div>
  );
}
