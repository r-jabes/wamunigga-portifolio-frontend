import { CinematicMedia } from "@/components/sections/cinematic-media";
import { LocalVideoPlayer } from "@/components/media/local-video";
import { SectionHeading } from "@/components/sections/section-heading";
import { Section } from "@/components/layout/section";
import { FadeIn } from "@/components/motion";
import { Text } from "@/components/ui/text";
import { homeContent } from "@/data/content/home";
import { getLocalVideo } from "@/data/content/videos";

const content = homeContent.chair;

export function HomeChairSection() {
  const video = getLocalVideo(content.video);

  return (
    <Section id="chair" width="wide" className="border-t border-border">
      <div className="flex flex-col gap-10 lg:gap-14">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeading
              index={content.index}
              title={content.title}
              eyebrow={content.eyebrow}
            />
            <FadeIn className="mt-6">
              <Text variant="heading" className="max-w-sm text-ivory">
                {content.lead}
              </Text>
            </FadeIn>
          </div>
          <FadeIn className="lg:col-span-7">
            <CinematicMedia
              image={content.image}
              aspect="cinematic"
              revealFrom="right"
            />
          </FadeIn>
        </div>

        <FadeIn className="mx-auto w-full max-w-md">
          <LocalVideoPlayer video={video} aspect="reel" />
        </FadeIn>
      </div>
    </Section>
  );
}
