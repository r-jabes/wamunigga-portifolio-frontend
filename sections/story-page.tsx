"use client";

import { CinematicMedia } from "@/components/sections/cinematic-media";
import { StorySectionBlock } from "@/components/story/story-section-block";
import { PageContainer } from "@/components/layout/page-container";
import { FadeIn, Stagger } from "@/components/motion";
import { TextLink } from "@/components/ui/text-link";
import { Text } from "@/components/ui/text";
import { storyPage, storySections } from "@/data/content/story";
import { focusRingClass } from "@/lib/a11y";
import { cn } from "@/lib/utils";

export function StoryPageContent() {
  return (
    <>
      <PageContainer width="default" className="section-space-hero pb-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-16">
          <Stagger immediate className="flex flex-col gap-6 lg:col-span-7">
            <FadeIn staggerItem>
              <Text variant="label">{storyPage.kicker}</Text>
            </FadeIn>
            <FadeIn staggerItem>
              <Text as="h1" variant="display-lg" className="text-balance">
                {storyPage.title}
              </Text>
            </FadeIn>
            <FadeIn staggerItem>
              <Text variant="body" className="max-w-xl text-ivory-muted">
                {storyPage.intro}
              </Text>
            </FadeIn>
          </Stagger>

          <FadeIn className="lg:col-span-5">
            <CinematicMedia
              image={{
                src: storyPage.portrait.src,
                alt: storyPage.portrait.alt,
              }}
              aspect="portrait"
              priority
              revealFrom="right"
            />
          </FadeIn>
        </div>
      </PageContainer>

      <div className="sticky top-16 z-30 border-y border-border bg-background/90 backdrop-blur-md md:top-[4.75rem]">
        <PageContainer width="wide" className="py-4">
          <nav aria-label="Story sections">
            <ul className="flex gap-4 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {storySections.map((section) => (
                <li key={section.id} className="shrink-0">
                  <a
                    href={`#${section.id}`}
                    data-cursor="interactive"
                    className={cn(
                      "type-label whitespace-nowrap text-ivory-subtle transition-colors hover:text-ivory",
                      focusRingClass,
                    )}
                  >
                    {section.index} {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </PageContainer>
      </div>

      <PageContainer width="wide" className="section-space flex flex-col gap-4 pb-24">
        {storySections.map((section) => (
          <StorySectionBlock key={section.id} section={section} />
        ))}

        <div className="border-t border-border pt-12">
          <Text variant="body-sm" className="max-w-lg text-muted">
            To publish this page, add verified paragraphs in{" "}
            <code className="text-ivory-subtle">data/content/story.ts</code>{" "}
            — one section at a time, with source approval.
          </Text>
          <TextLink href="/work" variant="cta" className="mt-6 inline-flex">
            Explore the work
          </TextLink>
        </div>
      </PageContainer>
    </>
  );
}
