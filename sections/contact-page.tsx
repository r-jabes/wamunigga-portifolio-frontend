import {
  ContactChannels,
  ContactMapEmbed,
  ConversionActions,
  SocialFollowLinks,
} from "@/components/contact";
import { CinematicMedia } from "@/components/sections/cinematic-media";
import { LocalVideoPlayer } from "@/components/media/local-video";
import { PageContainer } from "@/components/layout/page-container";
import { FadeIn, Stagger } from "@/components/motion";
import { Text } from "@/components/ui/text";
import { contactContent } from "@/data/content/contact";
import { wamuniggaMedia } from "@/data/content/media";
import { getLocalVideo } from "@/data/content/videos";
import { siteConfig } from "@/data/content/site";

export function ContactPageContent() {
  const { page } = contactContent;
  const shopVideo = getLocalVideo("shop");

  return (
    <>
      <PageContainer width="default" className="section-space-hero pb-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
          <Stagger immediate className="flex flex-col gap-6 lg:col-span-6">
            <FadeIn staggerItem>
              <Text variant="label">{page.kicker}</Text>
            </FadeIn>
            <FadeIn staggerItem>
              <Text
                as="p"
                variant="heading"
                className="tracking-[0.14em] text-ivory"
              >
                {siteConfig.name}
              </Text>
            </FadeIn>
            <FadeIn staggerItem>
              <Text as="h1" variant="display-lg" className="text-balance">
                {page.title}
              </Text>
            </FadeIn>
            <FadeIn staggerItem>
              <Text variant="body" className="max-w-xl text-ivory-muted">
                {page.intro}
              </Text>
            </FadeIn>
            <FadeIn staggerItem>
              <Text variant="label" className="text-ivory-subtle">
                {page.conversionLead}
              </Text>
            </FadeIn>
            <FadeIn staggerItem>
              <ConversionActions />
            </FadeIn>
          </Stagger>

          <FadeIn className="lg:col-span-6">
            <CinematicMedia
              image={wamuniggaMedia.shop.workspace}
              aspect="portrait"
              priority
            />
          </FadeIn>
        </div>
      </PageContainer>

      <PageContainer width="narrow" className="section-space pt-0 pb-16">
        <FadeIn>
          <ContactChannels />
        </FadeIn>
      </PageContainer>

      <PageContainer width="narrow" className="pb-16">
        <FadeIn className="mx-auto max-w-sm">
          <LocalVideoPlayer video={shopVideo} aspect="reel" />
        </FadeIn>
      </PageContainer>

      <PageContainer width="narrow" className="pb-16">
        <FadeIn className="flex flex-col gap-4">
          <Text variant="label" className="text-ivory-subtle">
            Follow
          </Text>
          <SocialFollowLinks />
        </FadeIn>
      </PageContainer>

      <PageContainer width="default" className="pb-24">
        <FadeIn>
          <ContactMapEmbed />
        </FadeIn>
      </PageContainer>
    </>
  );
}
