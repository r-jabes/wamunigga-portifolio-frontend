/**
 * Contact & social — set real URLs and location when available.
 * Do not invent phone numbers, handles, or street addresses.
 */
export const contactContent = {
  instagram: {
    label: "Instagram",
    href: null as string | null,
  },
  whatsapp: {
    label: "WhatsApp",
    href: null as string | null,
  },
  location: {
    label: "Location",
    /** e.g. "Kigali, Rwanda" or full address when confirmed */
    text: null as string | null,
  },
  booking: {
    label: "Book your cut",
    href: "/booking",
  },
} as const;

export type ContactContent = typeof contactContent;
