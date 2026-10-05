import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { ImageAspect } from "@/lib/images";
import { aspectRatioClass } from "@/lib/images";

const treatments = {
  plain: "",
  film: "surface-film",
  grain: "image-grain",
  "film-grain": "surface-film image-grain",
} as const;

export type ImageTreatment = keyof typeof treatments;

export type ImageFrameProps = {
  aspect?: ImageAspect;
  treatment?: ImageTreatment;
  hoverZoom?: boolean;
  className?: string;
  children: ReactNode;
};

/**
 * Editorial image frame — clipping, film, grain, and restrained hover zoom.
 * Pass MediaImage (fill) or other media as children.
 */
export function ImageFrame({
  aspect = "portrait",
  treatment = "plain",
  hoverZoom = true,
  className,
  children,
}: ImageFrameProps) {
  return (
    <div
      data-cursor="interactive"
      className={cn(
        "group relative overflow-hidden bg-surface",
        aspectRatioClass[aspect],
        treatments[treatment],
        className,
      )}
    >
      <div
        className={cn(
          "h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          hoverZoom && "group-hover:scale-[1.03]",
        )}
      >
        {children}
      </div>
    </div>
  );
}
