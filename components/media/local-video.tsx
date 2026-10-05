"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import type { LocalVideo } from "@/data/content/videos";

type LocalVideoPlayerProps = {
  video: LocalVideo;
  className?: string;
  aspect?: "portrait" | "landscape" | "cinematic" | "reel";
  showCaption?: boolean;
  autoPlayOnView?: boolean;
};

/**
 * Local MP4 — width-first, viewport-capped so full frame stays visible.
 */
export function LocalVideoPlayer({
  video,
  className,
  aspect = "reel",
  showCaption = true,
  autoPlayOnView = true,
}: LocalVideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [inView, setInView] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setInView(
          entries.some(
            (entry) => entry.isIntersecting && entry.intersectionRatio >= 0.25,
          ),
        );
      },
      { threshold: [0, 0.25, 0.5], rootMargin: "80px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || prefersReducedMotion || !autoPlayOnView) return;

    if (inView) {
      void el.play().catch(() => undefined);
    } else {
      el.pause();
    }
  }, [inView, prefersReducedMotion, autoPlayOnView]);

  const frameClass =
    aspect === "reel"
      ? "aspect-[9/16] w-full max-w-[min(100%,16rem,calc(58vh*9/16))]"
      : aspect === "portrait"
        ? "aspect-[3/4] w-full max-w-[min(100%,22rem,calc(62vh*3/4))]"
        : aspect === "landscape"
          ? "aspect-[4/3] w-full max-w-[min(100%,40rem,calc(50vh*4/3))]"
          : "aspect-[16/9] w-full max-w-[min(100%,56rem,calc(42vh*16/9))]";

  return (
    <figure
      ref={containerRef}
      className={cn("flex w-full flex-col items-center gap-2", className)}
    >
      <div
        className={cn(
          "relative overflow-hidden border border-border bg-surface surface-film",
          frameClass,
        )}
      >
        {failed ? (
          <div className="absolute inset-0 flex items-center justify-center bg-surface-elevated p-6">
            <Text variant="body-sm" className="text-muted">
              Video unavailable
            </Text>
          </div>
        ) : (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover object-center"
            src={video.src}
            poster={video.poster}
            muted
            loop
            playsInline
            preload="metadata"
            controls={prefersReducedMotion || !autoPlayOnView}
            onError={() => setFailed(true)}
            aria-label={video.title}
          />
        )}
      </div>
      {showCaption ? (
        <figcaption className="w-full text-center">
          <Text variant="caption" className="text-muted">
            {video.title}
          </Text>
        </figcaption>
      ) : null}
    </figure>
  );
}
