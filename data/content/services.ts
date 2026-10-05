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
    "Precision grooming, clearly listed. Prices and durations are managed here — update once, reflected across the site.",
} as const;

/** Full catalogue */
export const services: Service[] = [
  {
    id: "cut",
    name: "The Cut",
    description:
      "Precision haircut shaped to your face, hair texture, and the presence you want to project.",
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
      "Sculpted beard work, sharp lines, and a clean finish — intentional from every angle.",
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
      "The complete chair experience — cut, beard, and detail work in one session.",
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
      "Shape, line, and finish between full visits — keep the cut sharp.",
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
    description:
      "Pattern, texture, and graphic intent — for clients who want hair as design.",
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
    description:
      "Extended time in the chair for signature-level work and consultation.",
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
