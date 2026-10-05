import { getAvailableSlots, listBookableDates } from "@/lib/booking/availability";
import { getAvailabilityConfig, getBookings } from "@/lib/booking/storage";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");
  const barberId = searchParams.get("barberId");

  const config = await getAvailabilityConfig();
  const bookings = await getBookings();

  if (!date) {
    return Response.json({
      dates: listBookableDates(config),
    });
  }

  const slots = getAvailableSlots(
    date,
    bookings,
    config,
    barberId && barberId !== "any" ? barberId : null,
  );

  return Response.json({ date, slots });
}
