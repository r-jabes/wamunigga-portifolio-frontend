/**
 * Booking flow configuration — toggle business rules without UI changes.
 */
export const bookingConfig = {
  title: "BOOK YOUR CUT",
  intro:
    "From Instagram to the chair — pick your service, time, and details. No payment online yet; we confirm your appointment directly.",
  /** When false, barber step shows but defaults to any barber */
  requireBarberSelection: false,
  defaultSlotMinutes: 30,
  /** How many days ahead clients can book */
  bookingHorizonDays: 30,
  adminNote:
    "Set BOOKING_ADMIN_SECRET in .env.local to enable /admin. Store files live in data/store/.",
} as const;
