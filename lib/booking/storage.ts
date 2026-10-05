import { access, copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type {
  AvailabilityConfig,
  BookingRecord,
  GalleryOverrides,
} from "@/lib/booking/types";

const STORE_DIR = path.join(process.cwd(), "data", "store");
const BOOKINGS_FILE = path.join(STORE_DIR, "bookings.json");
const AVAILABILITY_FILE = path.join(STORE_DIR, "availability.json");
const GALLERY_FILE = path.join(STORE_DIR, "gallery.json");
const DEFAULT_AVAILABILITY = path.join(
  process.cwd(),
  "data",
  "booking",
  "default-availability.json",
);

async function ensureStore() {
  await mkdir(STORE_DIR, { recursive: true });
}

async function readJson<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const raw = await readFile(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJson<T>(filePath: string, data: T): Promise<void> {
  await ensureStore();
  await writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function getBookings(): Promise<BookingRecord[]> {
  await ensureStore();
  return readJson<BookingRecord[]>(BOOKINGS_FILE, []);
}

export async function saveBookings(bookings: BookingRecord[]): Promise<void> {
  await writeJson(BOOKINGS_FILE, bookings);
}

export async function addBooking(booking: BookingRecord): Promise<void> {
  const bookings = await getBookings();
  bookings.push(booking);
  await saveBookings(bookings);
}

export async function getBookingById(id: string): Promise<BookingRecord | null> {
  const bookings = await getBookings();
  return bookings.find((item) => item.id === id) ?? null;
}

export async function updateBooking(
  id: string,
  patch: Partial<Pick<BookingRecord, "status">>,
): Promise<BookingRecord | null> {
  const bookings = await getBookings();
  const index = bookings.findIndex((item) => item.id === id);
  if (index === -1) return null;
  bookings[index] = { ...bookings[index], ...patch };
  await saveBookings(bookings);
  return bookings[index];
}

async function loadDefaultAvailability(): Promise<AvailabilityConfig> {
  const raw = await readFile(DEFAULT_AVAILABILITY, "utf8");
  return JSON.parse(raw) as AvailabilityConfig;
}

export async function getAvailabilityConfig(): Promise<AvailabilityConfig> {
  await ensureStore();
  if (!(await fileExists(AVAILABILITY_FILE))) {
    await copyFile(DEFAULT_AVAILABILITY, AVAILABILITY_FILE);
  }
  return readJson<AvailabilityConfig>(
    AVAILABILITY_FILE,
    await loadDefaultAvailability(),
  );
}

export async function saveAvailabilityConfig(
  config: AvailabilityConfig,
): Promise<void> {
  await writeJson(AVAILABILITY_FILE, config);
}

export async function getGalleryOverrides(): Promise<GalleryOverrides> {
  await ensureStore();
  return readJson<GalleryOverrides>(GALLERY_FILE, { items: {} });
}

export async function saveGalleryOverrides(
  overrides: GalleryOverrides,
): Promise<void> {
  await writeJson(GALLERY_FILE, overrides);
}
