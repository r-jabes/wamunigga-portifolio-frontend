export function getAdminSecret(): string | undefined {
  return process.env.BOOKING_ADMIN_SECRET;
}

export function isAdminAuthorized(request: Request): boolean {
  const secret = getAdminSecret();
  if (!secret) return false;
  const header = request.headers.get("authorization");
  if (!header?.startsWith("Bearer ")) return false;
  return header.slice("Bearer ".length) === secret;
}

export function unauthorizedResponse() {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}
