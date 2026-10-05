"use client";

import { MediaImage } from "@/components/media";
import type { ArchiveItem } from "@/data/content/archive";
import { focusRingClass } from "@/lib/a11y";
import { imageQuality } from "@/lib/images";
import { cn } from "@/lib/utils";
import { Text } from "@/components/ui/text";

type ArchiveTileProps = {
  item: ArchiveItem;
  onOpen: () => void;
};

/**
 * Archive frame — fills grid cell, capped so height stays within the viewport.
 */
export function ArchiveTile({ item, onOpen }: ArchiveTileProps) {
  const isWide = item.layout === "cinematic";

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
          "relative mx-auto overflow-hidden surface-film image-grain",
          isWide
            ? "aspect-[16/9] w-full max-w-[min(100%,calc(48vh*16/9))]"
            : "aspect-[3/4] w-full max-w-[min(100%,calc(70vh*3/4))]",
        )}
      >
        {item.image.src ? (
          <MediaImage
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes={
              isWide
                ? "(min-width: 1024px) 960px, 100vw"
                : "(min-width: 1024px) 360px, 80vw"
            }
            quality={imageQuality.standard}
            className="absolute inset-0 h-full w-full"
            imageClassName="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
          />
        ) : (
          <div
            role="presentation"
            className="absolute inset-0 h-full w-full bg-[radial-gradient(ellipse_80%_70%_at_50%_40%,#1a1a1a_0%,#0a0a0a_75%)]"
          />
        )}

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/75 via-transparent to-transparent opacity-80"
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-1 p-4 sm:p-5">
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
