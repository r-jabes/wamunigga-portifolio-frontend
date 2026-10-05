"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { staggerChildren, revealViewport } from "@/lib/animation";
import { cn } from "@/lib/utils";

type StaggerProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  stagger?: number;
  delayChildren?: number;
  immediate?: boolean;
};

/** Editorial staggered entrance wrapper for child FadeIn / motion items. */
export function Stagger({
  className,
  children,
  stagger = 0.08,
  delayChildren = 0.05,
  immediate = false,
  ...props
}: StaggerProps) {
  return (
    <motion.div
      className={cn(className)}
      variants={staggerChildren(stagger, delayChildren)}
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
