import { CinematicMedia } from "@/components/sections/cinematic-media";
import { SectionHeading } from "@/components/sections/section-heading";
import { StoryPendingCopy } from "@/components/story/story-pending-copy";
import { FadeIn } from "@/components/motion";
import { Text } from "@/components/ui/text";
import type { StorySection } from "@/data/content/story";

type StorySectionBlockProps = {
  section: StorySection;
};

export function StorySectionBlock({ section }: StorySectionBlockProps) {
  const hasCopy = section.paragraphs.length > 0;

  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-headline`}
      className="scroll-mt-28 border-t border-border pt-12 md:pt-16"
    >
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 lg:items-start">
        <div className="lg:col-span-5">
          <SectionHeading
            index={section.index}
            title={section.title}
            eyebrow={section.headline}
          />
          {section.image ? (
            <FadeIn className="mt-8 max-w-sm">
              <CinematicMedia image={section.image} aspect="portrait" />
            </FadeIn>
          ) : null}
        </div>

        <div className="flex flex-col gap-6 lg:col-span-7">
          {hasCopy ? (
            section.paragraphs.map((paragraph) => (
              <FadeIn key={paragraph}>
                <Text variant="body" className="max-w-xl">
                  {paragraph}
                </Text>
              </FadeIn>
            ))
          ) : (
            <StoryPendingCopy />
          )}
        </div>
      </div>
    </section>
  );
}
