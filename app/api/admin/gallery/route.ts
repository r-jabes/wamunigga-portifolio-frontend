import { isAdminAuthorized, unauthorizedResponse } from "@/lib/admin/auth";
import { archiveItems } from "@/data/content/archive";
import type { GalleryOverrides } from "@/lib/booking/types";
import {
  getGalleryOverrides,
  saveGalleryOverrides,
} from "@/lib/booking/storage";

export async function GET(request: Request) {
  if (!isAdminAuthorized(request)) return unauthorizedResponse();

  const overrides = await getGalleryOverrides();
  const items = archiveItems.map((item) => ({
    id: item.id,
    title: item.title,
    categoryId: item.categoryId,
    src: overrides.items[item.id]?.src ?? item.image.src,
    alt: overrides.items[item.id]?.alt ?? item.image.alt,
  }));

  return Response.json({ items, overrides });
}

export async function PUT(request: Request) {
  if (!isAdminAuthorized(request)) return unauthorizedResponse();

  let body: GalleryOverrides;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON." }, { status: 400 });
  }

  await saveGalleryOverrides(body);
  return Response.json({ ok: true });
}
