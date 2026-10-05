/**
 * Contact, social, hours, and location — single source of truth.
 * Set real values when confirmed. Do not invent phone, handles, or street addresses.
 */

export type Weekday =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type OpeningHourDay = {
  day: Weekday;
  /** 24h "HH:MM" — null until confirmed */
  open: string | null;
  close: string | null;
  closed?: boolean;
};

export const contactContent = {
  page: {
    kicker: "Contact",
    title: "GET IN TOUCH.",
    intro:
      "Most people land here from Instagram, TikTok, or WhatsApp. Pick the path that fits — book online, message the chair, or find us.",
    conversionLead: "From the feed to the chair.",
    pendingNote:
      "Phone, Instagram, WhatsApp, and address slots stay empty until Wamunigga confirms them in this file.",
  },

  booking: {
    label: "Book your cut",
    href: "/booking",
    description: "Pick service, time, and details — no payment online yet.",
  },

  whatsapp: {
    label: "WhatsApp",
    href: null as string | null,
    description: "Message to confirm or ask about availability.",
  },

  phone: {
    label: "Phone",
    /** Human-readable, e.g. "+250 …" */
    display: null as string | null,
    /** E.164 for tel: links and schema, e.g. "+2507…" */
    e164: null as string | null,
    description: "Call when you need a direct line.",
  },

  instagram: {
    label: "Instagram",
    href: null as string | null,
    handle: null as string | null,
    description: "Cuts, atmosphere, and booking prompts from the feed.",
  },

  tiktok: {
    label: "TikTok",
    href: null as string | null,
    handle: null as string | null,
    description: "Short-form work — same brand, same chair.",
  },

  location: {
    label: "Location",
    /** Short line for UI, e.g. "Kigali, Rwanda" */
    text: null as string | null,
    streetAddress: null as string | null,
    addressLocality: null as string | null,
    addressRegion: null as string | null,
    postalCode: null as string | null,
    addressCountry: "RW",
    latitude: null as number | null,
    longitude: null as number | null,
  },

  maps: {
    label: "Google Maps",
    /** Share / open-in-maps URL */
    href: null as string | null,
    /** iframe embed src when available */
    embedSrc: null as string | null,
  },

  hours: {
    label: "Opening hours",
    timezone: "Africa/Kigali",
    note: null as string | null,
    /** Fill open/close when confirmed — leave open/close null to hide that day */
    days: [
      { day: "Monday", open: null, close: null },
      { day: "Tuesday", open: null, close: null },
      { day: "Wednesday", open: null, close: null },
      { day: "Thursday", open: null, close: null },
      { day: "Friday", open: null, close: null },
      { day: "Saturday", open: null, close: null },
      { day: "Sunday", open: null, close: null, closed: true },
    ] satisfies OpeningHourDay[],
  },
} as const;

export type ContactContent = typeof contactContent;

export function getPhoneHref(): string | null {
  const { e164, display } = contactContent.phone;
  const value = e164 ?? display;
  if (!value) return null;
  const digits = value.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : null;
}

export function hasConfiguredHours(): boolean {
  return contactContent.hours.days.some(
    (day) => day.closed === true || (day.open && day.close),
  );
}

export function formatHourRange(day: OpeningHourDay): string {
  if (day.closed) return "Closed";
  if (day.open && day.close) return `${day.open} – ${day.close}`;
  return "—";
}

/** Channels ready for conversion CTAs (configured href/phone only). */
export function getActiveConversionChannels() {
  const phoneHref = getPhoneHref();
  return {
    booking: contactContent.booking,
    whatsapp: contactContent.whatsapp.href
      ? contactContent.whatsapp
      : null,
    phone:
      phoneHref && contactContent.phone.display
        ? { ...contactContent.phone, href: phoneHref }
        : null,
    instagram: contactContent.instagram.href
      ? contactContent.instagram
      : null,
    tiktok: contactContent.tiktok.href ? contactContent.tiktok : null,
    maps: contactContent.maps.href ? contactContent.maps : null,
    locationText: contactContent.location.text,
  };
}
