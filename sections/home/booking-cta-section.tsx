import { Section } from "@/components/layout/section";
import { FadeIn, Stagger } from "@/components/motion";
import { ButtonLink } from "@/components/ui/button-link";
import { Text } from "@/components/ui/text";
import { homeContent } from "@/data/content/home";

const content = homeContent.bookingCta;

export function HomeBookingCtaSection() {
  return (
    <Section
      id="book"
      width="default"
      className="border-t border-border bg-surface/40"
    >
      <Stagger
        immediate
        className="flex flex-col items-start gap-8 md:items-center md:text-center"
      >
        <FadeIn staggerItem>
          <Text variant="label" className="text-ivory-subtle">
            {content.index} — Book
          </Text>
        </FadeIn>
        <FadeIn staggerItem>
          <Text
            as="h2"
            variant="display-lg"
            className="max-w-4xl text-balance text-ivory"
          >
            {content.headline}
          </Text>
        </FadeIn>
        <FadeIn staggerItem>
          <Text variant="body" className="max-w-md text-ivory-muted">
            {content.subline}
          </Text>
        </FadeIn>
        <FadeIn staggerItem>
          <ButtonLink href={content.primary.href} size="lg">
            {content.primary.label}
          </ButtonLink>
        </FadeIn>
      </Stagger>
    </Section>
  );
}
