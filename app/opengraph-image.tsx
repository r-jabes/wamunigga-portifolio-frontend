import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/content/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Brand OG image for Instagram / WhatsApp / TikTok link previews. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(160deg, #0A0A0A 0%, #141414 55%, #1A1510 100%)",
          color: "#F5F0E8",
          padding: 72,
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(245, 240, 232, 0.55)",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          {siteConfig.tagline}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 72,
              letterSpacing: "0.08em",
              lineHeight: 1.05,
              fontWeight: 500,
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              fontSize: 28,
              letterSpacing: "0.04em",
              color: "rgba(245, 240, 232, 0.7)",
              fontFamily: "system-ui, sans-serif",
              maxWidth: 720,
            }}
          >
            Book your cut · From the feed to the chair
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 18,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(245, 240, 232, 0.4)",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          wamuniggacuts.com
        </div>
      </div>
    ),
    { ...size },
  );
}
