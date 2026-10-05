import { ButtonLink } from "@/components/ui/button-link";
import { Text } from "@/components/ui/text";
import type { Service } from "@/data/content/services";
import {
  formatServiceDuration,
  formatServicePrice,
  serviceBookingHref,
} from "@/data/content/services";

type ServiceCardProps = {
  service: Service;
  index: string;
};

export function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <article className="border border-border bg-background">
      <div className="grid gap-6 p-5 md:grid-cols-12 md:items-start md:gap-8 md:p-6 lg:p-8">
        <Text variant="label" className="text-ivory-subtle md:col-span-1">
          {index}
        </Text>

        <div className="flex flex-col gap-3 md:col-span-5">
          <Text as="h2" variant="heading" className="text-lg tracking-[0.14em]">
            {service.name}
          </Text>
          <Text variant="body-sm" className="max-w-md">
            {service.description}
          </Text>
        </div>

        <dl className="flex flex-col gap-4 md:col-span-3">
          <div>
            <Text as="dt" variant="label" className="text-ivory-subtle">
              Price
            </Text>
            <Text as="dd" variant="subhead" className="mt-1 text-ivory">
              {formatServicePrice(service.price)}
            </Text>
          </div>
          <div>
            <Text as="dt" variant="label" className="text-ivory-subtle">
              Duration
            </Text>
            <Text as="dd" variant="body-sm" className="mt-1 text-ivory-muted">
              {formatServiceDuration(service.duration)}
            </Text>
          </div>
        </dl>

        <div className="md:col-span-3 md:flex md:justify-end md:self-center">
          <ButtonLink
            href={serviceBookingHref(service)}
            variant="secondary"
            size="md"
            className="w-full sm:w-auto"
          >
            {service.booking.label}
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
