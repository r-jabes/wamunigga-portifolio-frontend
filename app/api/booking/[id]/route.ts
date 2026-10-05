import { getBookingById } from "@/lib/booking/storage";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const booking = await getBookingById(id);

  if (!booking) {
    return Response.json({ error: "Booking not found." }, { status: 404 });
  }

  return Response.json({ booking });
}
