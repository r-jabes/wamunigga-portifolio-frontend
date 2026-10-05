export const bookingStatuses = [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
] as const;

export type BookingStatus = (typeof bookingStatuses)[number];

export type BookingRecord = {
  id: string;
  createdAt: string;
  status: BookingStatus;
  serviceId: string;
  barberId: string | null;
  date: string;
  time: string;
  customerName: string;
  customerPhone: string;
};

export type DayKey =
  | "mon"
  | "tue"
  | "wed"
  | "thu"
  | "fri"
  | "sat"
  | "sun";

export type DaySchedule = {
  open: boolean;
  start: string;
  end: string;
  slotMinutes: number;
};

export type AvailabilityConfig = {
  timezone: string;
  days: Record<DayKey, DaySchedule>;
  blockedDates: string[];
};

export type GalleryOverrides = {
  items: Record<
    string,
    {
      src: string | null;
      alt?: string;
    }
  >;
};

export type CreateBookingInput = {
  serviceId: string;
  barberId: string | null;
  date: string;
  time: string;
  customerName: string;
  customerPhone: string;
};
