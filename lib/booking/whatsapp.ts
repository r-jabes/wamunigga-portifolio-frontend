import { contactContent } from "@/data/content/contact";
import { formatServiceDuration, formatServicePrice, getServiceById } from "@/data/content/services";
import { getBarberById } from "@/data/content/barbers";
import type { BookingRecord } from "@/lib/booking/types";

export function buildBookingWhatsAppMessage(booking: BookingRecord): string {
  const service = getServiceById(booking.serviceId);
  const barber = booking.barberId ? getBarberById(booking.barberId) : null;

  const lines = [
    "Hello Wamunigga Cuts — I'd like to confirm my booking:",
    "",
    `Service: ${service?.name ?? booking.serviceId}`,
    `Date: ${booking.date}`,
    `Time: ${booking.time}`,
    barber ? `Barber: ${barber.name}` : "",
    `Name: ${booking.customerName}`,
    `Phone: ${booking.customerPhone}`,
    service
      ? `Price: ${formatServicePrice(service.price)} · ${formatServiceDuration(service.duration)}`
      : "",
    "",
    `Reference: ${booking.id}`,
  ].filter(Boolean);

  return lines.join("\n");
}

/** Returns external WhatsApp URL when configured in contact content. */
export function buildBookingWhatsAppUrl(booking: BookingRecord): string | null {
  const base = contactContent.whatsapp.href;
  if (!base) return null;

  const message = encodeURIComponent(buildBookingWhatsAppMessage(booking));
  if (base.includes("wa.me") || base.includes("whatsapp.com")) {
    const separator = base.includes("?") ? "&" : "?";
    return `${base}${separator}text=${message}`;
  }

  return `${base}${base.includes("?") ? "&" : "?"}text=${message}`;
}
