import { isAdminAuthorized, unauthorizedResponse } from "@/lib/admin/auth";
import { bookingStatuses } from "@/lib/booking/types";
import { updateBooking } from "@/lib/booking/storage";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  if (!isAdminAuthorized(request)) return unauthorizedResponse();

  const { id } = await context.params;
  let body: { status?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON." }, { status: 400 });
  }

  if (!body.status || !bookingStatuses.includes(body.status as never)) {
    return Response.json({ error: "Invalid status." }, { status: 400 });
  }

  const booking = await updateBooking(id, { status: body.status as never });
  if (!booking) {
    return Response.json({ error: "Booking not found." }, { status: 404 });
  }

  return Response.json({ booking });
}
