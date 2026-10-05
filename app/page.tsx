import { PageContainer } from "@/components/layout/page-container";
import { FadeIn, Stagger } from "@/components/motion";
import { Text } from "@/components/ui/text";
import { siteConfig } from "@/data/content/site";

/**
 * Phase 2 shell landing — brand presence only.
 * Not the production homepage (that arrives in a later phase).
 */
export default function Home() {
  return (
    <PageContainer
      width="narrow"
      className="section-space-hero justify-center gap-8"
    >
      <Stagger immediate className="flex flex-col gap-6">
        <FadeIn staggerItem>
          <Text variant="label">Wamunigga Cuts</Text>
        </FadeIn>
        <FadeIn staggerItem>
          <Text as="h1" variant="display-lg" className="text-balance">
            {siteConfig.name}
          </Text>
        </FadeIn>
        <FadeIn staggerItem>
          <Text variant="subhead" className="text-ivory-muted">
            {siteConfig.tagline}
          </Text>
        </FadeIn>
        <FadeIn staggerItem>
          <Text variant="body" className="max-w-md">
            The site shell is live. Homepage composition comes next.
          </Text>
        </FadeIn>
      </Stagger>
    </PageContainer>
  );
}
