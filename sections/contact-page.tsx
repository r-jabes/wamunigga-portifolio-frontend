import {
  ContactChannels,
  ContactMapEmbed,
  ConversionActions,
  SocialFollowLinks,
} from "@/components/contact";
import { PageContainer } from "@/components/layout/page-container";
import { FadeIn, Stagger } from "@/components/motion";
import { Text } from "@/components/ui/text";
import { contactContent } from "@/data/content/contact";
import { siteConfig } from "@/data/content/site";

export function ContactPageContent() {
  const { page } = contactContent;

  return (
    <>
      <PageContainer width="narrow" className="section-space-hero pb-10">
        <Stagger immediate className="flex max-w-2xl flex-col gap-6">
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
      </PageContainer>

      <PageContainer width="narrow" className="section-space pt-0 pb-16">
        <FadeIn>
          <ContactChannels />
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
