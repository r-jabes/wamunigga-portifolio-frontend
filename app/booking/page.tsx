import type { Metadata } from "next";
import { BookingPageContent } from "@/sections/booking-page";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Booking",
  description: "Book your cut with Wamunigga Cuts — service, time, and confirmation.",
  path: "/booking",
});

export default function BookingPage() {
  return <BookingPageContent />;
}
