import { CinematicMedia } from "@/components/sections/cinematic-media";
import { InstagramReelEmbed } from "@/components/media/instagram-reel-embed";
import { SectionHeading } from "@/components/sections/section-heading";
import { Section } from "@/components/layout/section";
import { FadeIn, Stagger } from "@/components/motion";
import { TextLink } from "@/components/ui/text-link";
import { Text } from "@/components/ui/text";
import { homeContent } from "@/data/content/home";
import { getInstagramEmbed } from "@/data/instagram";
import { cn } from "@/lib/utils";

const content = homeContent.signatureWork;

export function HomeSignatureWorkSection() {
  const clientReels = content.clientReels.map(getInstagramEmbed);

  return (
    <Section id="work-preview" width="default" className="border-t border-border">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            index={content.index}
            title={content.title}
            eyebrow={content.eyebrow}
          />
          <Text variant="body-sm" className="max-w-sm md:text-right">
            {content.intro}
          </Text>
        </div>

        <Stagger stagger={0.08} className="grid gap-4 sm:grid-cols-2">
          {content.items.map((item, index) => (
            <FadeIn
              key={item.id}
              staggerItem
              className={cn(
                index === 0 && "sm:col-span-2",
                index === 3 && "sm:col-span-2 lg:col-span-1",
              )}
            >
              <article className="group flex flex-col gap-4">
                <CinematicMedia
                  image={item.image}
                  aspect={item.layout === "cinematic" ? "cinematic" : "portrait"}
                  className="transition-opacity duration-300 group-hover:opacity-95"
                />
                <div className="flex flex-col gap-1 border-t border-border pt-4">
                  <Text variant="label" className="text-ivory-subtle">
                    {item.label}
                  </Text>
                  <Text variant="subhead" className="text-ivory">
                    {item.title}
                  </Text>
                </div>
              </article>
            </FadeIn>
          ))}
        </Stagger>

        <div className="grid gap-6 md:grid-cols-2">
          {clientReels.map((reel) => (
            <FadeIn key={reel.id}>
              <InstagramReelEmbed embed={reel} />
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <TextLink href={content.cta.href} variant="cta" className="inline-flex">
            {content.cta.label}
          </TextLink>
        </FadeIn>
      </div>
    </Section>
  );
}
