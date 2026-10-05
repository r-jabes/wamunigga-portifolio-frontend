"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

type MotionProviderProps = {
  children: ReactNode;
};

/**
 * Global motion configuration.
 * `reducedMotion="user"` honors OS/browser prefers-reduced-motion.
 */
export function MotionProvider({ children }: MotionProviderProps) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
