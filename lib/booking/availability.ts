import { bookingConfig } from "@/data/content/booking-config";
import type { AvailabilityConfig, BookingRecord, DayKey } from "@/lib/booking/types";

const dayKeys: DayKey[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

function parseTime(value: string): number {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

function formatTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function getDayKey(date: string): DayKey {
  const day = new Date(`${date}T12:00:00`).getDay();
  return dayKeys[day];
}

export function generateSlotsForDate(
  date: string,
  config: AvailabilityConfig,
): string[] {
  if (config.blockedDates.includes(date)) return [];

  const schedule = config.days[getDayKey(date)];
  if (!schedule.open) return [];

  const start = parseTime(schedule.start);
  const end = parseTime(schedule.end);
  const step = schedule.slotMinutes || bookingConfig.defaultSlotMinutes;
  const slots: string[] = [];

  for (let minute = start; minute + step <= end; minute += step) {
    slots.push(formatTime(minute));
  }

  return slots;
}

export function getAvailableSlots(
  date: string,
  bookings: BookingRecord[],
  config: AvailabilityConfig,
  barberId: string | null,
): string[] {
  const slots = generateSlotsForDate(date, config);
  const taken = new Set(
    bookings
      .filter(
        (booking) =>
          booking.date === date &&
          booking.status !== "cancelled" &&
          (barberId === null ||
            barberId === "team" ||
            booking.barberId === null ||
            booking.barberId === "team" ||
            booking.barberId === barberId),
      )
      .map((booking) => booking.time),
  );

  return slots.filter((slot) => !taken.has(slot));
}

export function listBookableDates(config: AvailabilityConfig): string[] {
  const dates: string[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < bookingConfig.bookingHorizonDays; i += 1) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const iso = date.toISOString().slice(0, 10);
    if (generateSlotsForDate(iso, config).length > 0) {
      dates.push(iso);
    }
  }

  return dates;
}
