import Image, { type ImageProps } from "next/image";
import {
  aspectRatioClass,
  imageQuality,
  imageSizes,
  type ImageAspect,
} from "@/lib/images";
import { cn } from "@/lib/utils";

type SharedProps = {
  alt: string;
  className?: string;
  imageClassName?: string;
  aspect?: ImageAspect;
  quality?: number;
  sizes?: string;
};

type FillMediaImageProps = SharedProps &
  Omit<ImageProps, "alt" | "fill" | "width" | "height" | "src"> & {
    src: ImageProps["src"];
    fill: true;
    width?: never;
    height?: never;
  };

type SizedMediaImageProps = SharedProps &
  Omit<ImageProps, "alt" | "fill" | "src"> & {
    src: ImageProps["src"];
    fill?: false;
    width: number;
    height: number;
  };

export type MediaImageProps = FillMediaImageProps | SizedMediaImageProps;

/**
 * Project image primitive — wraps `next/image` with brand defaults.
 * Decorative images must pass `alt=""` explicitly.
 */
export function MediaImage(props: MediaImageProps) {
  const {
    alt,
    className,
    imageClassName,
    aspect,
    quality = imageQuality.standard,
    sizes = imageSizes.content,
    ...imageProps
  } = props;

  if (props.fill) {
    return (
      <div
        className={cn(
          "relative overflow-hidden",
          aspect ? aspectRatioClass[aspect] : "h-full w-full",
          className,
        )}
      >
        <Image
          {...imageProps}
          alt={alt}
          fill
          sizes={sizes}
          quality={quality}
          className={cn("object-cover", imageClassName)}
        />
      </div>
    );
  }

  return (
    <div className={cn(aspect && aspectRatioClass[aspect], className)}>
      <Image
        {...imageProps}
        alt={alt}
        sizes={sizes}
        quality={quality}
        className={cn(aspect && "h-full w-full object-cover", imageClassName)}
      />
    </div>
  );
}
