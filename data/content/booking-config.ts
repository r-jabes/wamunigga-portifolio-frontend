/**
 * Booking flow configuration — toggle business rules without UI changes.
 */
export const bookingConfig = {
  title: "BOOK YOUR CUT",
  intro:
    "From Instagram to the chair — pick a service and time. Confirmation comes after you book.",
  /** When false, barber step shows but defaults to any barber */
  requireBarberSelection: false,
  defaultSlotMinutes: 30,
  /** How many days ahead clients can book */
  bookingHorizonDays: 30,
  adminNote:
    "Set BOOKING_ADMIN_SECRET in .env.local to enable /admin. Store files live in data/store/.",
} as const;
