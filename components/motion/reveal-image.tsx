"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { revealViewport, transition } from "@/lib/animation";
import { cn } from "@/lib/utils";

type RevealImageProps = {
  className?: string;
  children: ReactNode;
  /** Clip direction for the editorial reveal */
  from?: "bottom" | "left" | "right";
};

/**
 * Image clipping reveal — communicates craft without theatrical excess.
 */
export function RevealImage({
  className,
  children,
  from = "bottom",
}: RevealImageProps) {
  const clip =
    from === "left"
      ? "inset(0 100% 0 0)"
      : from === "right"
        ? "inset(0 0 0 100%)"
        : "inset(100% 0 0 0)";

  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      initial={{ clipPath: clip }}
      whileInView={{ clipPath: "inset(0 0 0 0)" }}
      viewport={revealViewport}
      transition={transition.cinematic}
    >
      {children}
    </motion.div>
  );
}
