import { CinematicMedia } from "@/components/sections/cinematic-media";
import { SectionHeading } from "@/components/sections/section-heading";
import { Section } from "@/components/layout/section";
import { FadeIn, Stagger } from "@/components/motion";
import { TextLink } from "@/components/ui/text-link";
import { Text } from "@/components/ui/text";
import { homeContent } from "@/data/content/home";

const content = homeContent.wamunigga;

export function HomeWamuniggaSection() {
  return (
    <Section id="wamunigga" width="default" className="border-t border-border">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col gap-6 lg:col-span-5">
          <SectionHeading
            index={content.index}
            title={content.title}
            eyebrow={content.eyebrow}
          />
          <FadeIn>
            <Text variant="subhead" className="text-ivory">
              {content.lead}
            </Text>
          </FadeIn>
          <Stagger className="flex flex-col gap-4">
            {content.paragraphs.map((paragraph) => (
              <FadeIn key={paragraph} staggerItem>
                <Text variant="body" className="max-w-md">
                  {paragraph}
                </Text>
              </FadeIn>
            ))}
          </Stagger>
          <FadeIn>
            <TextLink href={content.cta.href} variant="cta">
              {content.cta.label}
            </TextLink>
          </FadeIn>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          <FadeIn>
            <CinematicMedia image={content.images[0]} aspect="portrait" />
          </FadeIn>
          <FadeIn className="sm:pt-12">
            <CinematicMedia image={content.images[1]} aspect="portrait" />
          </FadeIn>
        </div>
      </div>
    </Section>
  );
}
