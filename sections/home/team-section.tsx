import { CinematicMedia } from "@/components/sections/cinematic-media";
import { LocalVideoPlayer } from "@/components/media/local-video";
import { SectionHeading } from "@/components/sections/section-heading";
import { Section } from "@/components/layout/section";
import { FadeIn } from "@/components/motion";
import { Text } from "@/components/ui/text";
import { homeContent } from "@/data/content/home";
import { getLocalVideo } from "@/data/content/videos";

const content = homeContent.team;

export function HomeTeamSection() {
  const video = getLocalVideo(content.video);

  return (
    <Section id="team" width="default" className="border-t border-border">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
        <div className="flex flex-col gap-6 lg:col-span-5">
          <SectionHeading
            index={content.index}
            title={content.title}
            eyebrow={content.eyebrow}
          />
          <FadeIn>
            <Text variant="body" className="max-w-md">
              {content.lead}
            </Text>
          </FadeIn>
          <FadeIn>
            <CinematicMedia image={content.image} aspect="portrait" />
          </FadeIn>
        </div>
        <FadeIn className="mx-auto w-full max-w-sm lg:col-span-7 lg:mx-0 lg:justify-self-end lg:pt-8">
          <LocalVideoPlayer video={video} aspect="reel" />
        </FadeIn>
      </div>
    </Section>
  );
}
