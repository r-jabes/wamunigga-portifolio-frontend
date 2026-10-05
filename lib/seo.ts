import type { Metadata } from "next";
import { contactContent } from "@/data/content/contact";
import { siteConfig } from "@/data/content/site";

type CreateMetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  /** Absolute or site-relative image. Omit to use app/opengraph-image.tsx */
  image?: string;
  noIndex?: boolean;
};

function socialSameAs(): string[] {
  return [
    contactContent.instagram.href,
    contactContent.tiktok.href,
    contactContent.whatsapp.href,
  ].filter((href): href is string => Boolean(href));
}

/**
 * Build page-level metadata for SEO + social previews
 * (Instagram / WhatsApp / TikTok link shares).
 */
export function createMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  image,
  noIndex = false,
}: CreateMetadataInput = {}): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  const resolvedTitle = title
    ? `${title} | ${siteConfig.name}`
    : siteConfig.name;

  const openGraphImages = image
    ? [
        {
          url: image.startsWith("http")
            ? image
            : new URL(image, siteConfig.url).toString(),
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ]
    : undefined;

  return {
    title,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title: resolvedTitle,
      description,
      ...(openGraphImages ? { images: openGraphImages } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      ...(image
        ? {
            images: [
              image.startsWith("http")
                ? image
                : new URL(image, siteConfig.url).toString(),
            ],
          }
        : {}),
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    category: "barbershop",
  };
}

export const rootMetadata: Metadata = {
  ...createMetadata(),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  applicationName: siteConfig.name,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  appleWebApp: {
    capable: true,
    title: siteConfig.shortName,
    statusBarStyle: "black-translucent",
  },
  other: {
    "og:site_name": siteConfig.name,
    ...(socialSameAs().length > 0
      ? { "social:same_as": socialSameAs().join(",") }
      : {}),
  },
};
