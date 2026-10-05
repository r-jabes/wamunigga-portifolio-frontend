"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { fadeIn, fadeUp, revealViewport } from "@/lib/animation";
import { cn } from "@/lib/utils";

const presets = {
  fade: fadeIn,
  "fade-up": fadeUp,
} as const;

type FadeInProps = HTMLMotionProps<"div"> & {
  preset?: keyof typeof presets;
  /** When true, animates on enter; when false, uses scroll viewport trigger */
  immediate?: boolean;
};

/** Subtle reveal primitive for premium section/content entrances. */
export function FadeIn({
  className,
  children,
  preset = "fade-up",
  immediate = false,
  ...props
}: FadeInProps) {
  return (
    <motion.div
      className={cn(className)}
      variants={presets[preset]}
      initial="hidden"
      {...(immediate
        ? { animate: "visible" }
        : { whileInView: "visible", viewport: revealViewport })}
      {...props}
    >
      {children}
    </motion.div>
  );
}
