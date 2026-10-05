"use client";

import { MediaImage } from "@/components/media";
import type { ArchiveItem } from "@/data/content/archive";
import { focusRingClass } from "@/lib/a11y";
import { imageQuality, imageSizes } from "@/lib/images";
import { cn } from "@/lib/utils";
import { Text } from "@/components/ui/text";

type ArchiveTileProps = {
  item: ArchiveItem;
  onOpen: () => void;
};

/** Large archive frame with hover reveal — opens lightbox on activate. */
export function ArchiveTile({ item, onOpen }: ArchiveTileProps) {
  const aspectClass =
    item.layout === "cinematic" ? "aspect-[21/9]" : "aspect-[3/4] max-h-[85vh]";

  return (
    <button
      type="button"
      data-cursor="interactive"
      onClick={onOpen}
      className={cn(
        "group relative w-full overflow-hidden text-left",
        "border border-border bg-surface transition-colors duration-300 hover:border-border-strong",
        focusRingClass,
      )}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden surface-film image-grain",
          aspectClass,
        )}
      >
        {item.image.src ? (
          <MediaImage
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes={imageSizes.hero}
            quality={imageQuality.hero}
            className="h-full w-full"
            imageClassName="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
          />
        ) : (
          <div
            role="presentation"
            className="h-full w-full bg-[radial-gradient(ellipse_80%_70%_at_50%_40%,#1a1a1a_0%,#0a0a0a_75%)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
          />
        )}

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100"
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5 sm:p-6">
          <Text variant="label" className="text-ivory-subtle">
            View
          </Text>
          <Text variant="subhead" className="text-ivory">
            {item.title}
          </Text>
        </div>
      </div>
    </button>
  );
}
