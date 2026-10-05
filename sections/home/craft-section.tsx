import { CinematicMedia } from "@/components/sections/cinematic-media";
import { InstagramReelEmbed } from "@/components/media/instagram-reel-embed";
import { SectionHeading } from "@/components/sections/section-heading";
import { Section } from "@/components/layout/section";
import { FadeIn, Stagger } from "@/components/motion";
import { Text } from "@/components/ui/text";
import { homeContent } from "@/data/content/home";
import { getInstagramEmbed } from "@/data/instagram";

const content = homeContent.craft;

export function HomeCraftSection() {
  const reels = content.reels.map(getInstagramEmbed);

  return (
    <Section id="craft" width="wide" className="border-t border-border">
      <div className="flex flex-col gap-10 lg:gap-14">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <SectionHeading
              index={content.index}
              title={content.title}
              eyebrow={content.eyebrow}
            />
            <FadeIn className="mt-6">
              <Text variant="body" className="max-w-md">
                {content.lead}
              </Text>
            </FadeIn>
          </div>
          <Stagger className="flex flex-col gap-2 lg:col-span-6 lg:pb-1">
            {content.lines.map((line) => (
              <FadeIn key={line} staggerItem>
                <Text variant="display-md" className="text-ivory">
                  {line}
                </Text>
              </FadeIn>
            ))}
          </Stagger>
        </div>

        <div className="grid gap-4 lg:grid-cols-12">
          <FadeIn className="lg:col-span-7">
            <CinematicMedia
              image={content.images[0]}
              aspect="cinematic"
              revealFrom="left"
            />
          </FadeIn>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            <FadeIn>
              <CinematicMedia image={content.images[1]} aspect="portrait" />
            </FadeIn>
            <FadeIn>
              <CinematicMedia image={content.images[2]} aspect="portrait" />
            </FadeIn>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {reels.map((reel) => (
            <FadeIn key={reel.id}>
              <InstagramReelEmbed embed={reel} />
            </FadeIn>
          ))}
        </div>
      </div>
    </Section>
  );
}
