"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { pageEnter } from "@/lib/animation";

type PageTransitionProps = {
  children: ReactNode;
};

/**
 * Understated route entrance — opacity only, no theatrical page wipes.
 * Remounts on pathname change via keyed motion node.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial="hidden"
      animate="visible"
      variants={pageEnter}
      className="flex min-h-0 flex-1 flex-col"
    >
      {children}
    </motion.div>
  );
}
