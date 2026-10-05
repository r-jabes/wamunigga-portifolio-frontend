import {
  contactContent,
  hasConfiguredHours,
} from "@/data/content/contact";
import { siteConfig } from "@/data/content/site";
import { services } from "@/data/content/services";

type JsonLd = Record<string, unknown>;

function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return new URL(path, siteConfig.url).toString();
}

/** Schema.org openingHoursSpecification from contact hours when configured. */
function buildOpeningHours(): JsonLd[] {
  if (!hasConfiguredHours()) return [];

  return contactContent.hours.days
    .filter((day) => !day.closed && day.open && day.close)
    .map((day) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${day.day}`,
      opens: day.open,
      closes: day.close,
    }));
}

function buildAddress(): JsonLd | undefined {
  const { streetAddress, addressLocality, addressRegion, postalCode, addressCountry, text } =
    contactContent.location;

  if (!streetAddress && !addressLocality && !text) return undefined;

  return {
    "@type": "PostalAddress",
    streetAddress: streetAddress ?? undefined,
    addressLocality: addressLocality ?? text ?? undefined,
    addressRegion: addressRegion ?? undefined,
    postalCode: postalCode ?? undefined,
    addressCountry: addressCountry,
  };
}

function buildGeo(): JsonLd | undefined {
  const { latitude, longitude } = contactContent.location;
  if (latitude == null || longitude == null) return undefined;
  return {
    "@type": "GeoCoordinates",
    latitude,
    longitude,
  };
}

/**
 * Local business / barber shop JSON-LD for Google + rich results.
 * Omits fields that are still null so we never invent contact details.
 */
export function buildLocalBusinessJsonLd(): JsonLd {
  const phone = contactContent.phone.e164 ?? contactContent.phone.display;
  const sameAs = [
    contactContent.instagram.href,
    contactContent.tiktok.href,
    contactContent.whatsapp.href,
  ].filter((href): href is string => Boolean(href));

  const offerCatalog = {
    "@type": "OfferCatalog",
    name: "Grooming services",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.name,
        description: service.description,
      },
    })),
  };

  const openingHoursSpecification = buildOpeningHours();
  const address = buildAddress();
  const geo = buildGeo();

  return {
    "@context": "https://schema.org",
    "@type": ["BarberShop", "LocalBusiness"],
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    description: siteConfig.description,
    url: siteConfig.url,
    image: absoluteUrl(siteConfig.ogImage),
    slogan: siteConfig.tagline,
    priceRange: "$$",
    telephone: phone ?? undefined,
    address,
    geo,
    hasMap: contactContent.maps.href ?? undefined,
    openingHoursSpecification:
      openingHoursSpecification.length > 0
        ? openingHoursSpecification
        : undefined,
    sameAs: sameAs.length > 0 ? sameAs : undefined,
    hasOfferCatalog: offerCatalog,
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: absoluteUrl("/booking"),
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
      result: {
        "@type": "Reservation",
        name: "Barber appointment",
      },
    },
  };
}

/** Website + Organization graph for sitewide crawl clarity. */
export function buildWebsiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: siteConfig.locale.replace("_", "-"),
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: absoluteUrl(siteConfig.ogImage),
    },
  };
}

export function serializeJsonLd(data: JsonLd): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
