"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useCanUseCustomCursor } from "@/hooks/use-can-use-custom-cursor";

type CursorState = "default" | "interactive" | "hidden";

/**
 * Subtle desktop-only cursor.
 * Disabled on touch, coarse pointers, and reduced-motion preferences.
 */
export function CustomCursor() {
  const canUse = useCanUseCustomCursor();
  const prefersReducedMotion = usePrefersReducedMotion();
  const enabled = canUse && !prefersReducedMotion;

  const [state, setState] = useState<CursorState>("default");
  const [visible, setVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const position = useRef({ x: 0, y: 0 });
  const rendered = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) {
      document.body.removeAttribute("data-custom-cursor");
      return;
    }

    document.body.setAttribute("data-custom-cursor", "true");

    const tick = () => {
      const el = cursorRef.current;
      if (el) {
        const lerp = 0.18;
        rendered.current.x += (position.current.x - rendered.current.x) * lerp;
        rendered.current.y += (position.current.y - rendered.current.y) * lerp;
        el.style.transform = `translate3d(${rendered.current.x}px, ${rendered.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf.current = window.requestAnimationFrame(tick);
    };

    raf.current = window.requestAnimationFrame(tick);

    const onMove = (event: MouseEvent) => {
      position.current = { x: event.clientX, y: event.clientY };
      setVisible(true);

      const target = event.target as HTMLElement | null;
      const interactive = Boolean(
        target?.closest(
          'a, button, [data-cursor="interactive"], [role="button"], input, textarea, select, label',
        ),
      );
      setState(interactive ? "interactive" : "default");
    };

    const onLeave = () => {
      setVisible(false);
      setState("hidden");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      document.body.removeAttribute("data-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      if (raf.current) window.cancelAnimationFrame(raf.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  const size =
    state === "interactive"
      ? "var(--cursor-size-active)"
      : "var(--cursor-size)";

  const style = {
    width: size,
    height: size,
  } satisfies CSSProperties;

  return (
    <div
      ref={cursorRef}
      aria-hidden
      className={cn(
        "pointer-events-none fixed top-0 left-0 z-[200] mix-blend-difference",
        "rounded-full border border-ivory/80 bg-ivory/10 transition-[width,height,opacity,background-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        visible && state !== "hidden" ? "opacity-100" : "opacity-0",
      )}
      style={style}
    />
  );
}
