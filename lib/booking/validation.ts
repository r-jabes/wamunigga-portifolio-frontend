import type { CreateBookingInput } from "@/lib/booking/types";
import { getServiceById } from "@/data/content/services";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^\d{2}:\d{2}$/;

export function validateCreateBooking(
  body: unknown,
): { ok: true; data: CreateBookingInput } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body." };
  }

  const input = body as Record<string, unknown>;
  const serviceId = String(input.serviceId ?? "").trim();
  const barberIdRaw = input.barberId;
  const barberId =
    barberIdRaw === null || barberIdRaw === undefined || barberIdRaw === ""
      ? null
      : String(barberIdRaw).trim();
  const date = String(input.date ?? "").trim();
  const time = String(input.time ?? "").trim();
  const customerName = String(input.customerName ?? "").trim();
  const customerPhone = String(input.customerPhone ?? "").trim();

  if (!getServiceById(serviceId)) {
    return { ok: false, error: "Unknown service." };
  }
  if (!DATE_RE.test(date)) {
    return { ok: false, error: "Invalid date." };
  }
  if (!TIME_RE.test(time)) {
    return { ok: false, error: "Invalid time." };
  }
  if (customerName.length < 2) {
    return { ok: false, error: "Name is required." };
  }
  if (customerPhone.length < 8) {
    return { ok: false, error: "Valid phone number is required." };
  }

  return {
    ok: true,
    data: {
      serviceId,
      barberId,
      date,
      time,
      customerName,
      customerPhone,
    },
  };
}
