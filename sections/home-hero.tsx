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
 * Real photography mounts via `heroContent.image.src` when available.
 */
export function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  /** Restrained scroll drift — quality, not parallax theater */
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0.35]);

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
                imageClassName="object-cover object-center"
              />
            </div>
          ) : (
            <div
              className={cn(
                "relative h-full w-full surface-film image-grain",
                "bg-[radial-gradient(ellipse_70%_60%_at_60%_40%,#1a1a1a_0%,#0a0a0a_70%)]",
              )}
              role="img"
              aria-label="Cinematic placeholder — add hero photography at public/images/hero.jpg"
            >
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"
              />
            </div>
          )}
        </motion.div>
      </RevealImage>

      {/* Readability veil — edge gradient only, not a floating overlay card */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/20"
      />

      <motion.div
        className="relative z-10 flex min-h-[100svh] flex-col"
        style={{ opacity: contentOpacity }}
      >
        <Container className="flex flex-1 flex-col justify-end pb-16 pt-28 md:pb-20 lg:pb-24">
          <Stagger
            immediate
            stagger={0.09}
            delayChildren={0.2}
            className="flex max-w-4xl flex-col gap-6 md:gap-8"
          >
            <FadeIn staggerItem>
              <Text variant="label" className="text-ivory-subtle">
                {heroContent.brand}
              </Text>
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
                className="max-w-md text-ivory-muted md:max-w-lg md:text-base"
              >
                {heroContent.positioning}
              </Text>
            </FadeIn>

            <FadeIn staggerItem>
              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:gap-4">
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

        <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 md:bottom-8">
          <motion.div
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            aria-hidden
          >
            <span className="type-label text-[0.625rem] text-ivory-subtle">
              Scroll
            </span>
            <motion.span
              className="block h-8 w-px bg-ivory/40"
              animate={{ scaleY: [0.55, 1, 0.55], opacity: [0.35, 0.8, 0.35] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ originY: 0 }}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
