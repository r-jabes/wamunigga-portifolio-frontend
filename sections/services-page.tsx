import { ServiceCard } from "@/components/services/service-card";
import { PageContainer } from "@/components/layout/page-container";
import { FadeIn, Stagger } from "@/components/motion";
import { ButtonLink } from "@/components/ui/button-link";
import { Text } from "@/components/ui/text";
import { services, servicesPage } from "@/data/content/services";

export function ServicesPageContent() {
  return (
    <>
      <PageContainer width="narrow" className="section-space-hero pb-10">
        <Stagger immediate className="flex max-w-3xl flex-col gap-6">
          <FadeIn staggerItem>
            <Text variant="label">{servicesPage.kicker}</Text>
          </FadeIn>
          <FadeIn staggerItem>
            <Text as="h1" variant="display-lg" className="text-balance">
              {servicesPage.title}
            </Text>
          </FadeIn>
          <FadeIn staggerItem>
            <Text variant="body" className="max-w-xl text-ivory-muted">
              {servicesPage.intro}
            </Text>
          </FadeIn>
        </Stagger>
      </PageContainer>

      <PageContainer width="default" className="section-space flex flex-col gap-4 pt-0">
        <Stagger stagger={0.06} className="flex flex-col gap-4">
          {services.map((service, index) => (
            <FadeIn key={service.id} staggerItem>
              <ServiceCard
                service={service}
                index={String(index + 1).padStart(2, "0")}
              />
            </FadeIn>
          ))}
        </Stagger>

        <FadeIn className="border-t border-border pt-12">
          <Text variant="body-sm" className="max-w-lg text-muted">
            Update prices and durations in{" "}
            <code className="text-ivory-subtle">data/content/services.ts</code>
            .
          </Text>
          <ButtonLink href="/booking" size="lg" className="mt-6">
            Book your cut
          </ButtonLink>
        </FadeIn>
      </PageContainer>
    </>
  );
}
