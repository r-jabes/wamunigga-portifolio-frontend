import { isAdminAuthorized, unauthorizedResponse } from "@/lib/admin/auth";
import { getBookings } from "@/lib/booking/storage";

export async function GET(request: Request) {
  if (!isAdminAuthorized(request)) return unauthorizedResponse();
  const bookings = await getBookings();
  return Response.json({ bookings });
}
