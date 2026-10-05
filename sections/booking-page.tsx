import { Suspense } from "react";
import { BookingFlow } from "@/components/booking/booking-flow";
import { PageContainer } from "@/components/layout/page-container";
import { Text } from "@/components/ui/text";
import { bookingConfig } from "@/data/content/booking-config";

function BookingFlowFallback() {
  return (
    <Text variant="body-sm" className="text-muted">
      Loading booking…
    </Text>
  );
}

export function BookingPageContent() {
  return (
    <>
      <PageContainer width="narrow" className="section-space-hero pb-8">
        <div className="flex max-w-xl flex-col gap-4">
          <Text variant="label">Booking</Text>
          <Text as="h1" variant="display-md" className="text-balance">
            {bookingConfig.title}
          </Text>
          <Text variant="body" className="text-ivory-muted">
            {bookingConfig.intro}
          </Text>
        </div>
      </PageContainer>

      <PageContainer width="narrow" className="section-space pt-0 pb-24">
        <Suspense fallback={<BookingFlowFallback />}>
          <BookingFlow />
        </Suspense>
      </PageContainer>
    </>
  );
}
