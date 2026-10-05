import { CinematicMedia } from "@/components/sections/cinematic-media";
import { InstagramReelEmbed } from "@/components/media/instagram-reel-embed";
import { SectionHeading } from "@/components/sections/section-heading";
import { Section } from "@/components/layout/section";
import { FadeIn, Stagger } from "@/components/motion";
import { Text } from "@/components/ui/text";
import { homeContent } from "@/data/content/home";
import { getInstagramEmbed } from "@/data/instagram";

const content = homeContent.reputation;

export function HomeReputationSection() {
  const reel = getInstagramEmbed(content.reel);

  return (
    <Section id="reputation" width="default">
      <div className="flex flex-col gap-12 lg:gap-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              index={content.index}
              title={content.title}
              eyebrow={content.eyebrow}
            />
          </div>

          <Stagger className="flex flex-col gap-6 lg:col-span-7">
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

        <Stagger
          stagger={0.08}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {content.frames.map((frame, index) => (
            <FadeIn
              key={frame.id}
              staggerItem
              className={index === 0 ? "sm:col-span-2 lg:col-span-1" : undefined}
            >
              <article className="flex flex-col gap-3">
                <CinematicMedia
                  image={frame.image}
                  aspect={index === 0 ? "cinematic" : "portrait"}
                />
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

        <FadeIn className="max-w-md lg:ml-auto">
          <Text variant="caption" className="mb-3 text-muted">
            {content.reelNote}
          </Text>
          <InstagramReelEmbed embed={reel} />
        </FadeIn>
      </div>
    </Section>
  );
}
