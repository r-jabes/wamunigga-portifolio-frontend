import { isAdminAuthorized, unauthorizedResponse } from "@/lib/admin/auth";
import type { AvailabilityConfig } from "@/lib/booking/types";
import {
  getAvailabilityConfig,
  saveAvailabilityConfig,
} from "@/lib/booking/storage";

export async function GET(request: Request) {
  if (!isAdminAuthorized(request)) return unauthorizedResponse();
  const config = await getAvailabilityConfig();
  return Response.json({ config });
}

export async function PUT(request: Request) {
  if (!isAdminAuthorized(request)) return unauthorizedResponse();

  let body: AvailabilityConfig;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON." }, { status: 400 });
  }

  await saveAvailabilityConfig(body);
  return Response.json({ config: body });
}
