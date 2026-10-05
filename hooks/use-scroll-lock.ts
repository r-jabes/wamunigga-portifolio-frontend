"use client";

import { useEffect } from "react";

/** Lock/unlock document scroll — used by mobile navigation overlay. */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = overflow;
    };
  }, [locked]);
}
