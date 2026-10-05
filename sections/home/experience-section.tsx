import { SectionHeading } from "@/components/sections/section-heading";
import { Section } from "@/components/layout/section";
import { FadeIn, Stagger } from "@/components/motion";
import { Text } from "@/components/ui/text";
import { homeContent } from "@/data/content/home";

const content = homeContent.experience;

export function HomeExperienceSection() {
  return (
    <Section id="experience" width="default" className="border-t border-border">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeading
            index={content.index}
            title={content.title}
            eyebrow={content.eyebrow}
          />
          <FadeIn className="mt-6">
            <Text variant="body" className="max-w-sm">
              {content.intro}
            </Text>
          </FadeIn>
        </div>

        <Stagger className="flex flex-col gap-0 lg:col-span-8">
          {content.steps.map((step, index) => (
            <FadeIn key={step.id} staggerItem>
              <div className="grid gap-4 border-t border-border py-8 sm:grid-cols-12 sm:gap-6">
                <Text
                  variant="label"
                  className="text-ivory-subtle sm:col-span-2"
                >
                  {String(index + 1).padStart(2, "0")}
                </Text>
                <Text
                  variant="heading"
                  className="sm:col-span-4 sm:text-lg"
                >
                  {step.title}
                </Text>
                <Text variant="body-sm" className="sm:col-span-6">
                  {step.description}
                </Text>
              </div>
            </FadeIn>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
