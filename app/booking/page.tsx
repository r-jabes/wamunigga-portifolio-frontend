import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";
import { Text } from "@/components/ui/text";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Booking",
  description: "Book your cut with Wamunigga Cuts.",
  path: "/booking",
});

/** Minimal route destination for hero CTA — full booking flow comes later. */
export default function BookingPage() {
  return (
    <PageContainer width="narrow" className="section-space">
      <Text variant="label">Booking</Text>
      <Text as="h1" variant="display-md" className="mt-4">
        Book your cut
      </Text>
      <Text variant="body" className="mt-4 max-w-md">
        Booking experience arrives in a later phase.
      </Text>
    </PageContainer>
  );
}
