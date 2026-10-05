import { SectionHeading } from "@/components/sections/section-heading";
import { Section } from "@/components/layout/section";
import { FadeIn, Stagger } from "@/components/motion";
import { Surface } from "@/components/ui/surface";
import { Text } from "@/components/ui/text";
import { homeContent } from "@/data/content/home";

const content = homeContent.services;

export function HomeServicesSection() {
  return (
    <Section id="services" width="narrow" className="border-t border-border">
      <div className="flex flex-col gap-10">
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

        <Stagger className="flex flex-col gap-px bg-border">
          {content.items.map((service) => (
            <FadeIn key={service.id} staggerItem>
              <Surface
                tone="base"
                hairline={false}
                padded
                className="border border-border bg-background"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                  <Text variant="heading" className="text-lg tracking-[0.14em]">
                    {service.name}
                  </Text>
                  <Text variant="body-sm" className="max-w-md sm:text-right">
                    {service.description}
                  </Text>
                </div>
              </Surface>
            </FadeIn>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
