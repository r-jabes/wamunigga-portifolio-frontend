/**
 * Service catalogue — single source of truth for names, copy, prices, and duration.
 * Update this file when Wamunigga changes the menu; no prices in JSX.
 */

export type ServicePrice = {
  /** Set when confirmed; `null` shows `displayFallback` */
  amount: number | null;
  currency: "RWF";
  displayFallback: string;
};

export type ServiceDuration = {
  /** Minutes for booking systems later; `null` until confirmed */
  minutes: number | null;
  displayFallback: string;
};

export type ServiceBooking = {
  label: string;
  href: "/booking";
};

export type Service = {
  id: string;
  name: string;
  description: string;
  price: ServicePrice;
  duration: ServiceDuration;
  booking: ServiceBooking;
};

export const servicesPage = {
  kicker: "Services",
  title: "THE MENU",
  intro:
    "Cuts, beard work, and detail sessions. Prices and durations stay open until confirmed in this catalogue.",
} as const;

/** Full catalogue */
export const services: Service[] = [
  {
    id: "cut",
    name: "The Cut",
    description:
      "Haircut shaped to your face, hair, and how you want to look when you leave.",
    price: {
      amount: null,
      currency: "RWF",
      displayFallback: "Confirm at booking",
    },
    duration: {
      minutes: null,
      displayFallback: "Duration on request",
    },
    booking: { label: "Book this service", href: "/booking" },
  },
  {
    id: "beard",
    name: "Beard & Line",
    description:
      "Beard shaping, line-up, and clean finishing.",
    price: {
      amount: null,
      currency: "RWF",
      displayFallback: "Confirm at booking",
    },
    duration: {
      minutes: null,
      displayFallback: "Duration on request",
    },
    booking: { label: "Book this service", href: "/booking" },
  },
  {
    id: "groom",
    name: "Full Groom",
    description:
      "Cut, beard, and finishing in one session.",
    price: {
      amount: null,
      currency: "RWF",
      displayFallback: "Confirm at booking",
    },
    duration: {
      minutes: null,
      displayFallback: "Duration on request",
    },
    booking: { label: "Book this service", href: "/booking" },
  },
  {
    id: "detail",
    name: "Detail Session",
    description:
      "Shape, line, and finish between full visits.",
    price: {
      amount: null,
      currency: "RWF",
      displayFallback: "Confirm at booking",
    },
    duration: {
      minutes: null,
      displayFallback: "Duration on request",
    },
    booking: { label: "Book this service", href: "/booking" },
  },
  {
    id: "design",
    name: "Design Work",
    description: "Pattern and graphic work in the hair.",
    price: {
      amount: null,
      currency: "RWF",
      displayFallback: "Confirm at booking",
    },
    duration: {
      minutes: null,
      displayFallback: "Duration on request",
    },
    booking: { label: "Book this service", href: "/booking" },
  },
  {
    id: "signature",
    name: "Signature Session",
    description: "Longer session for detailed work and a proper consult.",
    price: {
      amount: null,
      currency: "RWF",
      displayFallback: "Confirm at booking",
    },
    duration: {
      minutes: null,
      displayFallback: "Duration on request",
    },
    booking: { label: "Book this service", href: "/booking" },
  },
];

/** Homepage preview — subset of catalogue IDs */
export const featuredServiceIds = ["cut", "beard", "groom", "detail"] as const;

export function getServiceById(id: string): Service | undefined {
  return services.find((service) => service.id === id);
}

export function getFeaturedServices(): Service[] {
  return featuredServiceIds
    .map((id) => getServiceById(id))
    .filter((service): service is Service => service !== undefined);
}

export function formatServicePrice(price: ServicePrice): string {
  if (price.amount === null) return price.displayFallback;
  return new Intl.NumberFormat("en-RW", {
    style: "currency",
    currency: price.currency,
    maximumFractionDigits: 0,
  }).format(price.amount);
}

export function formatServiceDuration(duration: ServiceDuration): string {
  if (duration.minutes === null) return duration.displayFallback;
  if (duration.minutes < 60) return `${duration.minutes} min`;
  const hours = Math.floor(duration.minutes / 60);
  const mins = duration.minutes % 60;
  return mins > 0 ? `${hours} hr ${mins} min` : `${hours} hr`;
}

/** Booking URL — optional service pre-selection for a future booking flow */
export function serviceBookingHref(service: Service): string {
  return `${service.booking.href}?service=${service.id}`;
}
