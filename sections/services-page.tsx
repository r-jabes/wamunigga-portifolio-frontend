import { ServiceCard } from "@/components/services/service-card";
import { CinematicMedia } from "@/components/sections/cinematic-media";
import { PageContainer } from "@/components/layout/page-container";
import { FadeIn, Stagger } from "@/components/motion";
import { ButtonLink } from "@/components/ui/button-link";
import { Text } from "@/components/ui/text";
import { wamuniggaMedia } from "@/data/content/media";
import { services, servicesPage } from "@/data/content/services";

export function ServicesPageContent() {
  return (
    <>
      <PageContainer width="default" className="section-space-hero pb-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
          <Stagger immediate className="flex max-w-3xl flex-col gap-6 lg:col-span-7">
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
          <FadeIn className="lg:col-span-5">
            <CinematicMedia
              image={wamuniggaMedia.work.fade01}
              aspect="portrait"
              priority
            />
          </FadeIn>
        </div>
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
          <ButtonLink href="/booking" size="lg" className="mt-2">
            Book your cut
          </ButtonLink>
        </FadeIn>
      </PageContainer>
    </>
  );
}
