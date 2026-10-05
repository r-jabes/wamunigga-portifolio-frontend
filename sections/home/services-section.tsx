import { CinematicMedia } from "@/components/sections/cinematic-media";
import { SectionHeading } from "@/components/sections/section-heading";
import { Section } from "@/components/layout/section";
import { FadeIn, Stagger } from "@/components/motion";
import { ServiceCard } from "@/components/services/service-card";
import { TextLink } from "@/components/ui/text-link";
import { Text } from "@/components/ui/text";
import { getFeaturedServices } from "@/data/content/services";
import { homeContent } from "@/data/content/home";

const content = homeContent.services;
const featuredServices = getFeaturedServices();

export function HomeServicesSection() {
  return (
    <Section id="services" width="default" className="border-t border-border">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 lg:items-start">
        <div className="flex flex-col gap-10 lg:col-span-7">
          <div className="flex flex-col gap-4">
            <SectionHeading
              index={content.index}
              title={content.title}
              eyebrow={content.eyebrow}
            />
            <Text variant="body" className="max-w-lg">
              {content.intro}
            </Text>
          </div>

          <Stagger className="flex flex-col gap-4">
            {featuredServices.map((service, index) => (
              <FadeIn key={service.id} staggerItem>
                <ServiceCard
                  service={service}
                  index={String(index + 1).padStart(2, "0")}
                />
              </FadeIn>
            ))}
          </Stagger>

          <TextLink href="/services" variant="cta" className="inline-flex">
            View full menu
          </TextLink>
        </div>

        <FadeIn className="lg:col-span-5 lg:sticky lg:top-28">
          <CinematicMedia image={content.image} aspect="portrait" />
        </FadeIn>
      </div>
    </Section>
  );
}
