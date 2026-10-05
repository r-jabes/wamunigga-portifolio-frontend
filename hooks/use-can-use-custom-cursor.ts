"use client";

import { useMediaQuery } from "@/hooks/use-media-query";

/**
 * Custom cursor is only for fine-pointer hover devices (desktop trackpads/mice).
 * Touch / coarse pointers keep the native cursor.
 */
export function useCanUseCustomCursor(): boolean {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}
