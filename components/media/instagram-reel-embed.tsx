"use client";

import { useEffect, useRef, useState } from "react";
import type { InstagramEmbed } from "@/data/instagram";
import { TextLink } from "@/components/ui/text-link";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

const SCRIPT_ID = "instagram-embed-script";
const SCRIPT_SRC = "https://www.instagram.com/embed.js";

let scriptLoadPromise: Promise<void> | null = null;

function loadInstagramScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.instgrm?.Embeds) return Promise.resolve();
  if (scriptLoadPromise) return scriptLoadPromise;

  scriptLoadPromise = new Promise((resolve, reject) => {
    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Instagram script failed")), {
        once: true,
      });
      if (window.instgrm?.Embeds) resolve();
      return;
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.async = true;
    script.src = SCRIPT_SRC;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Instagram script failed"));
    document.body.appendChild(script);
  });

  return scriptLoadPromise;
}

type InstagramReelEmbedProps = {
  embed: InstagramEmbed;
  className?: string;
  /** When false, loads immediately (still client-only). Default: lazy on enter viewport. */
  lazy?: boolean;
};

/**
 * Official Instagram Reel embed from the centralized registry.
 * Loads embed.js once; processes embeds when visible.
 */
export function InstagramReelEmbed({
  embed,
  className,
  lazy = true,
}: InstagramReelEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(!lazy);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!lazy) return;
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [lazy]);

  useEffect(() => {
    if (!shouldLoad) return;
    let cancelled = false;

    loadInstagramScript()
      .then(() => {
        if (cancelled) return;
        window.instgrm?.Embeds.process();
        setReady(true);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, [shouldLoad]);

  useEffect(() => {
    if (!ready) return;
    window.instgrm?.Embeds.process();
  }, [ready, embed.url]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden border border-border bg-surface",
        className,
      )}
    >
      <div className="relative min-h-[28rem] w-full sm:min-h-[32rem]">
        {!failed ? (
          <blockquote
            className="instagram-media !m-0 !min-w-0 !max-w-none !w-full !bg-transparent !border-0 !rounded-none !shadow-none"
            data-instgrm-permalink={embed.url}
            data-instgrm-version="14"
            style={{
              background: "transparent",
              border: 0,
              margin: 0,
              maxWidth: "100%",
              minWidth: 0,
              padding: 0,
              width: "100%",
            }}
          >
            <a href={embed.url} className="sr-only">
              {embed.title}
            </a>
          </blockquote>
        ) : (
          <div className="absolute inset-0 flex flex-col items-start justify-center gap-3 p-6">
            <Text variant="label" className="text-ivory-subtle">
              Reel unavailable
            </Text>
            <Text variant="body-sm" className="max-w-sm text-muted">
              {embed.title}
            </Text>
            <TextLink href={embed.url} external variant="cta">
              Open on Instagram
            </TextLink>
          </div>
        )}

        {!ready && !failed ? (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-surface-elevated"
          />
        ) : null}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3">
        <Text variant="caption" className="text-muted">
          {embed.title}
        </Text>
        <Text variant="caption" className="text-ivory-subtle">
          {embed.source}
        </Text>
      </div>
    </div>
  );
}
