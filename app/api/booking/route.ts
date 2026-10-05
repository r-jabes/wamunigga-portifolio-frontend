import { randomUUID } from "node:crypto";
import { getAvailableSlots } from "@/lib/booking/availability";
import {
  addBooking,
  getAvailabilityConfig,
  getBookings,
} from "@/lib/booking/storage";
import { validateCreateBooking } from "@/lib/booking/validation";
import type { BookingRecord } from "@/lib/booking/types";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const parsed = validateCreateBooking(body);
  if (!parsed.ok) {
    return Response.json({ error: parsed.error }, { status: 400 });
  }

  const { data } = parsed;
  const config = await getAvailabilityConfig();
  const bookings = await getBookings();
  const slots = getAvailableSlots(
    data.date,
    bookings,
    config,
    data.barberId,
  );

  if (!slots.includes(data.time)) {
    return Response.json(
      { error: "That time is no longer available." },
      { status: 409 },
    );
  }

  const booking: BookingRecord = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    status: "pending",
    ...data,
  };

  await addBooking(booking);

  return Response.json({ booking }, { status: 201 });
}
