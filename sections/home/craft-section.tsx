import { CinematicMedia } from "@/components/sections/cinematic-media";
import { SectionHeading } from "@/components/sections/section-heading";
import { Section } from "@/components/layout/section";
import { FadeIn, Stagger } from "@/components/motion";
import { Text } from "@/components/ui/text";
import { homeContent } from "@/data/content/home";

const content = homeContent.craft;

export function HomeCraftSection() {
  return (
    <Section id="craft" width="wide" className="border-t border-border">
      <div className="flex flex-col gap-10 lg:gap-14">
        <SectionHeading
          index={content.index}
          title={content.title}
          eyebrow={content.eyebrow}
        />

        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <CinematicMedia
              image={content.image}
              aspect="cinematic"
              revealFrom="left"
            />
          </div>

          <Stagger className="flex flex-col gap-4 lg:col-span-5 lg:pb-4">
            {content.lines.map((line) => (
              <FadeIn key={line} staggerItem>
                <Text variant="display-md" className="text-ivory">
                  {line}
                </Text>
              </FadeIn>
            ))}
          </Stagger>
        </div>
      </div>
    </Section>
  );
}
