import { CinematicMedia } from "@/components/sections/cinematic-media";
import { LocalVideoPlayer } from "@/components/media/local-video";
import { SectionHeading } from "@/components/sections/section-heading";
import { Section } from "@/components/layout/section";
import { FadeIn, Stagger } from "@/components/motion";
import { Text } from "@/components/ui/text";
import { homeContent } from "@/data/content/home";
import { getLocalVideo } from "@/data/content/videos";

const content = homeContent.reputation;

export function HomeReputationSection() {
  const video = getLocalVideo(content.video);

  return (
    <Section id="reputation" width="default">
      <div className="flex flex-col gap-8">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionHeading
              index={content.index}
              title={content.title}
              eyebrow={content.eyebrow}
            />
          </div>
          <Stagger className="flex flex-col gap-4 lg:col-span-7">
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
          </Stagger>
        </div>

        <div className="grid gap-4 lg:grid-cols-12 lg:items-start">
          <Stagger
            stagger={0.08}
            className="grid grid-cols-3 gap-2 sm:gap-4 lg:col-span-8"
          >
            {content.frames.map((frame) => (
              <FadeIn key={frame.id} staggerItem>
                <article className="flex flex-col gap-3">
                  <CinematicMedia image={frame.image} aspect="portrait" />
                  <div className="flex flex-col gap-1 border-t border-border pt-3">
                    <Text variant="label" className="text-ivory-subtle">
                      {frame.caption}
                    </Text>
                    <Text variant="subhead" className="text-ivory">
                      {frame.label}
                    </Text>
                  </div>
                </article>
              </FadeIn>
            ))}
          </Stagger>
          <FadeIn className="lg:col-span-4 lg:justify-self-end">
            <LocalVideoPlayer video={video} aspect="reel" />
          </FadeIn>
        </div>
      </div>
    </Section>
  );
}
