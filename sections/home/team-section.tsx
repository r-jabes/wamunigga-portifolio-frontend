import { CinematicMedia } from "@/components/sections/cinematic-media";
import { InstagramReelEmbed } from "@/components/media/instagram-reel-embed";
import { SectionHeading } from "@/components/sections/section-heading";
import { Section } from "@/components/layout/section";
import { FadeIn } from "@/components/motion";
import { Text } from "@/components/ui/text";
import { homeContent } from "@/data/content/home";
import { getInstagramEmbed } from "@/data/instagram";

const content = homeContent.team;

export function HomeTeamSection() {
  const reel = getInstagramEmbed(content.reel);

  return (
    <Section id="team" width="default" className="border-t border-border">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 lg:items-start">
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
        <FadeIn className="lg:col-span-7 lg:pt-16">
          <InstagramReelEmbed embed={reel} />
        </FadeIn>
      </div>
    </Section>
  );
}
