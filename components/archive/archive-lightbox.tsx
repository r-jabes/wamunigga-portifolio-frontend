"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";
import { MediaImage } from "@/components/media";
import type { ArchiveItem } from "@/data/content/archive";
import { focusRingClass } from "@/lib/a11y";
import { transition } from "@/lib/animation";
import { imageQuality, imageSizes } from "@/lib/images";
import { cn } from "@/lib/utils";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { Text } from "@/components/ui/text";

type ArchiveLightboxProps = {
  items: ArchiveItem[];
  index: number | null;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
};

export function ArchiveLightbox({
  items,
  index,
  onClose,
  onChangeIndex,
}: ArchiveLightboxProps) {
  const open = index !== null && items[index] !== undefined;
  const item = open ? items[index] : null;
  const closeRef = useRef<HTMLButtonElement>(null);

  useScrollLock(open);

  const goPrev = useCallback(() => {
    if (index === null || items.length === 0) return;
    onChangeIndex(index === 0 ? items.length - 1 : index - 1);
  }, [index, items.length, onChangeIndex]);

  const goNext = useCallback(() => {
    if (index === null || items.length === 0) return;
    onChangeIndex(index === items.length - 1 ? 0 : index + 1);
  }, [index, items.length, onChangeIndex]);

  useEffect(() => {
    if (!open) return;

    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose, goPrev, goNext]);

  return (
    <AnimatePresence>
      {open && item ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Viewing ${item.title}`}
          className="fixed inset-0 z-[120] flex flex-col bg-background/95 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition.base}
        >
          <div className="flex h-16 items-center justify-between px-5 sm:px-8">
            <Text variant="label" className="text-ivory-subtle">
              {item.title}
            </Text>
            <button
              ref={closeRef}
              type="button"
              data-cursor="interactive"
              onClick={onClose}
              className={cn("type-label text-ivory", focusRingClass)}
            >
              Close
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-5 pb-8 pt-2 sm:px-8">
            <button
              type="button"
              aria-label="Previous image"
              data-cursor="interactive"
              onClick={goPrev}
              className={cn(
                "absolute left-3 z-10 hidden h-12 w-12 items-center justify-center border border-border text-ivory sm:flex",
                focusRingClass,
              )}
            >
              ←
            </button>

            <motion.div
              key={item.id}
              className="relative h-full max-h-[75vh] w-full max-w-6xl overflow-hidden surface-film image-grain"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={transition.slow}
            >
              {item.image.src ? (
                <MediaImage
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes={imageSizes.hero}
                  quality={imageQuality.hero}
                  className="h-full min-h-[50vh] w-full"
                  imageClassName="object-contain object-center bg-surface"
                />
              ) : (
                <div
                  role="img"
                  aria-label={item.image.alt}
                  className="min-h-[50vh] w-full bg-[radial-gradient(ellipse_80%_70%_at_50%_45%,#1a1a1a_0%,#0a0a0a_78%)]"
                />
              )}
            </motion.div>

            <button
              type="button"
              aria-label="Next image"
              data-cursor="interactive"
              onClick={goNext}
              className={cn(
                "absolute right-3 z-10 hidden h-12 w-12 items-center justify-center border border-border text-ivory sm:flex",
                focusRingClass,
              )}
            >
              →
            </button>
          </div>

          <div className="flex items-center justify-center gap-4 pb-6 sm:hidden">
            <button
              type="button"
              onClick={goPrev}
              className={cn("type-label text-ivory", focusRingClass)}
            >
              Prev
            </button>
            <Text variant="caption" className="text-muted">
              {(index ?? 0) + 1} / {items.length}
            </Text>
            <button
              type="button"
              onClick={goNext}
              className={cn("type-label text-ivory", focusRingClass)}
            >
              Next
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
