import { CinematicMedia } from "@/components/sections/cinematic-media";
import { LocalVideoPlayer } from "@/components/media/local-video";
import { SectionHeading } from "@/components/sections/section-heading";
import { Section } from "@/components/layout/section";
import { FadeIn, Stagger } from "@/components/motion";
import { Text } from "@/components/ui/text";
import { homeContent } from "@/data/content/home";
import { getLocalVideo } from "@/data/content/videos";

const content = homeContent.craft;

export function HomeCraftSection() {
  const colorVideo = getLocalVideo(content.colorVideo);
  const craftVideos = content.craftVideos.map(getLocalVideo);

  return (
    <Section id="craft" width="wide" className="border-t border-border">
      <div className="flex flex-col gap-8">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <SectionHeading
              index={content.index}
              title={content.title}
              eyebrow={content.eyebrow}
            />
            <FadeIn className="mt-4">
              <Text variant="body" className="max-w-md">
                {content.lead}
              </Text>
            </FadeIn>
          </div>
          <Stagger className="flex flex-col gap-1 lg:col-span-6">
            {content.lines.map((line) => (
              <FadeIn key={line} staggerItem>
                <Text variant="display-md" className="text-ivory">
                  {line}
                </Text>
              </FadeIn>
            ))}
          </Stagger>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:items-start">
          <FadeIn className="lg:col-span-5">
            <CinematicMedia image={content.images[0]} aspect="portrait" />
          </FadeIn>
          <FadeIn className="lg:col-span-4">
            <CinematicMedia image={content.images[1]} aspect="portrait" />
          </FadeIn>
          <FadeIn className="lg:col-span-3">
            <LocalVideoPlayer video={colorVideo} aspect="reel" />
          </FadeIn>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {craftVideos.map((video) => (
            <FadeIn key={video.id}>
              <LocalVideoPlayer video={video} aspect="reel" />
            </FadeIn>
          ))}
        </div>
      </div>
    </Section>
  );
}
