import { MediaImage } from "@/components/media";
import { RevealImage } from "@/components/motion";
import type { HomeImageSlot } from "@/data/content/home";
import { imageQuality, imageSizes } from "@/lib/images";
import { cn } from "@/lib/utils";

type CinematicMediaProps = {
  image: HomeImageSlot;
  aspect?: "portrait" | "landscape" | "cinematic";
  className?: string;
  priority?: boolean;
  revealFrom?: "bottom" | "left" | "right";
};

/**
 * Real image when `src` is set; otherwise atmospheric plane (never stock portraits).
 */
export function CinematicMedia({
  image,
  aspect = "portrait",
  className,
  priority = false,
  revealFrom = "bottom",
}: CinematicMediaProps) {
  const aspectClass =
    aspect === "cinematic"
      ? "aspect-[21/9]"
      : aspect === "landscape"
        ? "aspect-[4/3]"
        : "aspect-[3/4]";

  return (
    <RevealImage from={revealFrom} className={cn("w-full", className)}>
      <div
        className={cn(
          "relative w-full overflow-hidden bg-surface surface-film image-grain",
          aspectClass,
        )}
      >
        {image.src ? (
          <MediaImage
            src={image.src}
            alt={image.alt}
            fill
            priority={priority}
            sizes={imageSizes.content}
            quality={imageQuality.standard}
            className="h-full w-full"
            imageClassName="object-cover object-center"
          />
        ) : (
          <div
            role="img"
            aria-label={image.alt}
            className="h-full w-full bg-[radial-gradient(ellipse_80%_70%_at_50%_40%,#1a1a1a_0%,#0a0a0a_75%)]"
          />
        )}
      </div>
    </RevealImage>
  );
}
