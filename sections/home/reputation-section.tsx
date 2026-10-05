import { SectionHeading } from "@/components/sections/section-heading";
import { Section } from "@/components/layout/section";
import { FadeIn, Stagger } from "@/components/motion";
import { Divider } from "@/components/ui/divider";
import { Text } from "@/components/ui/text";
import { homeContent } from "@/data/content/home";

const content = homeContent.reputation;

export function HomeReputationSection() {
  return (
    <Section id="reputation" width="default">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            index={content.index}
            title={content.title}
            eyebrow={content.eyebrow}
          />
        </div>

        <Stagger className="flex flex-col gap-8 lg:col-span-7">
          <FadeIn staggerItem>
            <Text variant="subhead" className="text-ivory">
              {content.lead}
            </Text>
          </FadeIn>
          {content.paragraphs.map((paragraph) => (
            <FadeIn key={paragraph} staggerItem>
              <Text variant="body" className="max-w-xl">
                {paragraph}
              </Text>
            </FadeIn>
          ))}
          <FadeIn staggerItem>
            <Divider className="max-w-md" />
            <blockquote className="mt-6 max-w-lg">
              <Text variant="heading" className="text-balance text-ivory/90">
                {content.pullQuote}
              </Text>
            </blockquote>
          </FadeIn>
        </Stagger>
      </div>
    </Section>
  );
}
