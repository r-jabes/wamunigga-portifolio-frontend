"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MediaImage } from "@/components/media";
import { FadeIn, RevealImage, Stagger } from "@/components/motion";
import { ButtonLink } from "@/components/ui/button-link";
import { Text } from "@/components/ui/text";
import { Container } from "@/components/layout/container";
import { heroContent } from "@/data/content/hero";
import { imageQuality, imageSizes } from "@/lib/images";
import { cn } from "@/lib/utils";

/**
 * Editorial homepage hero — brand-first, cinematic, full-bleed.
 */
export function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0.4]);

  const hasImage = Boolean(heroContent.image.src);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-heading"
      className="relative isolate min-h-[100svh] overflow-hidden"
    >
      <RevealImage immediate className="absolute inset-0">
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{ y: mediaY, scale: mediaScale }}
        >
          {hasImage && heroContent.image.src ? (
            <div className="relative h-full w-full surface-film image-grain">
              <MediaImage
                src={heroContent.image.src}
                alt={heroContent.image.alt}
                fill
                priority
                sizes={imageSizes.hero}
                quality={imageQuality.hero}
                className="h-full w-full"
                imageClassName="object-cover object-[center_20%] sm:object-[center_15%]"
              />
            </div>
          ) : (
            <div
              className={cn(
                "relative h-full w-full surface-film image-grain",
                "bg-[radial-gradient(ellipse_70%_60%_at_60%_40%,#1a1a1a_0%,#0a0a0a_70%)]",
              )}
              role="img"
              aria-label="Hero photography pending"
            >
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"
              />
            </div>
          )}
        </motion.div>
      </RevealImage>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/15"
      />

      <motion.div
        className="relative z-10 flex min-h-[100svh] flex-col"
        style={{ opacity: contentOpacity }}
      >
        <Container className="flex flex-1 flex-col justify-end pb-16 pt-28 md:pb-20 lg:pb-24">
          <Stagger
            immediate
            stagger={0.09}
            delayChildren={0.15}
            className="flex max-w-3xl flex-col gap-5 md:gap-7"
          >
            <FadeIn staggerItem>
              <div className="flex flex-col gap-2">
                <Text variant="label" className="text-ivory">
                  {heroContent.brand}
                </Text>
                <Text variant="label" className="text-ivory-subtle">
                  {heroContent.location}
                </Text>
              </div>
            </FadeIn>

            <FadeIn staggerItem>
              <h1
                id="hero-heading"
                className="type-display-xl text-balance text-ivory"
              >
                {heroContent.headline.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h1>
            </FadeIn>

            <FadeIn staggerItem>
              <Text
                variant="body"
                className="max-w-sm text-ivory-muted md:text-base"
              >
                {heroContent.positioning}
              </Text>
            </FadeIn>

            <FadeIn staggerItem>
              <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:gap-4">
                <ButtonLink
                  href={heroContent.primaryCta.href}
                  variant="primary"
                  size="lg"
                >
                  {heroContent.primaryCta.label}
                </ButtonLink>
                <ButtonLink
                  href={heroContent.secondaryCta.href}
                  variant="secondary"
                  size="lg"
                >
                  {heroContent.secondaryCta.label}
                </ButtonLink>
              </div>
            </FadeIn>
          </Stagger>
        </Container>
      </motion.div>
    </section>
  );
}
