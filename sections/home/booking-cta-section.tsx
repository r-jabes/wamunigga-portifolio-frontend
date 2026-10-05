import { CinematicMedia } from "@/components/sections/cinematic-media";
import { ConversionActions } from "@/components/contact";
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
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
        <Stagger
          immediate
          className="flex flex-col items-start gap-8 lg:col-span-6"
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
              className="max-w-xl text-balance text-ivory"
            >
              {content.headline}
            </Text>
          </FadeIn>
          <FadeIn staggerItem>
            <Text variant="body" className="max-w-md text-ivory-muted">
              {content.subline}
            </Text>
          </FadeIn>
          <FadeIn staggerItem className="flex w-full flex-col items-start gap-4">
            <ConversionActions layout="row" />
            <ButtonLink href={content.secondary.href} variant="ghost" size="sm">
              {content.secondary.label}
            </ButtonLink>
          </FadeIn>
        </Stagger>

        <FadeIn className="lg:col-span-6">
          <CinematicMedia image={content.image} aspect="cinematic" />
        </FadeIn>
      </div>
    </Section>
  );
}
