/**
 * Homepage storytelling copy — editorial tone, replaceable with verified brand voice.
 * Avoid generic salon language; avoid invented biography, prices, or addresses.
 */

export type HomeImageSlot = {
  src: string | null;
  alt: string;
};

export const homeContent = {
  reputation: {
    index: "01",
    title: "Reputation",
    eyebrow: "Why Wamunigga",
    lead: "A name built in the chair — not on a template.",
    paragraphs: [
      "Wamunigga Cuts is a personal brand first: precision, presence, and the confidence that comes from a cut done with intention.",
      "This is barbering with editorial standards — masculine, modern, and rooted in contemporary African urban culture without the clichés.",
    ],
    pullQuote:
      "Craftsmanship you can read in the silhouette. Personality you carry when you leave.",
  },
  craft: {
    index: "02",
    title: "The Craft",
    eyebrow: "Raw craft × luxury digital",
    lines: [
      "Every line is deliberate.",
      "Every fade is architecture.",
      "Every finish is a statement.",
    ],
    image: {
      src: null as string | null,
      alt: "The craft of the cut at Wamunigga Cuts",
    } satisfies HomeImageSlot,
  },
  signatureWork: {
    index: "03",
    title: "Signature Work",
    eyebrow: "Archive preview",
    intro:
      "Selected frames from the chair — a preview of the archive. Full gallery when the work section ships.",
    items: [
      {
        id: "preview-1",
        label: "01",
        title: "Editorial fade",
        image: { src: null, alt: "Signature cut preview 1" } satisfies HomeImageSlot,
      },
      {
        id: "preview-2",
        label: "02",
        title: "Structured line-up",
        image: { src: null, alt: "Signature cut preview 2" } satisfies HomeImageSlot,
      },
      {
        id: "preview-3",
        label: "03",
        title: "Finish & detail",
        image: { src: null, alt: "Signature cut preview 3" } satisfies HomeImageSlot,
      },
    ],
    cta: { label: "View full archive", href: "/work" },
  },
  services: {
    index: "04",
    title: "Services",
    eyebrow: "What we offer",
    intro:
      "Minimal menu, maximum attention. Prices and durations live in the central service catalogue.",
  },
  experience: {
    index: "05",
    title: "The Experience",
    eyebrow: "In the chair",
    intro: "What happens when you sit down — calm, focused, premium.",
    steps: [
      {
        id: "consult",
        title: "Consult",
        description:
          "We read your hair, your style, and what you want to project — no rush.",
      },
      {
        id: "cut",
        title: "The cut",
        description:
          "The work happens with quiet confidence: clipper, scissor, and eye.",
      },
      {
        id: "detail",
        title: "Detail",
        description:
          "Lines, blend, and finish — the details that separate good from signature.",
      },
      {
        id: "leave",
        title: "Leave sharp",
        description:
          "You walk out with a cut that holds its shape and your standard.",
      },
    ],
  },
  bookingCta: {
    index: "06",
    headline: "YOUR NEXT CUT STARTS HERE.",
    subline:
      "Came from Instagram or WhatsApp? Book online, message the chair, or find every channel on Contact.",
    primary: { label: "BOOK YOUR CUT", href: "/booking" },
    secondary: { label: "Contact", href: "/contact" },
  },
} as const;

export type HomeContent = typeof homeContent;
