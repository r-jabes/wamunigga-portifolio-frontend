"use client";

import { useState } from "react";
import {
  Button,
  Divider,
  Skeleton,
  Surface,
  Text,
  TextLink,
} from "@/components/ui";
import { Section } from "@/components/layout";
import { ImageFrame } from "@/components/media";
import { FadeIn, RevealImage, Stagger } from "@/components/motion";
import { siteConfig } from "@/data/content/site";
import { colors } from "@/lib/design-system";

const swatches = [
  { name: "Background", value: colors.background, className: "bg-background" },
  { name: "Ivory", value: colors.ivory, className: "bg-ivory" },
  { name: "Surface", value: colors.surface, className: "bg-surface" },
  {
    name: "Surface Elevated",
    value: colors.surfaceElevated,
    className: "bg-surface-elevated",
  },
  { name: "Muted", value: colors.muted, className: "bg-muted" },
  { name: "Accent", value: colors.accent, className: "bg-accent" },
  { name: "Champagne", value: colors.champagne, className: "bg-champagne" },
] as const;

/**
 * Temporary Phase 1 showcase — proves the system, not a homepage.
 * Remove/replace when Phase 2 homepage composition begins.
 */
export function DesignSystemShowcase() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Section spacing="hero" width="narrow">
        <Stagger immediate className="flex flex-col gap-6">
          <FadeIn staggerItem>
            <Text variant="label">Design system · Phase 1</Text>
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
            <Text variant="body" className="max-w-xl">
              Raw craft × luxury digital. These primitives define color, type,
              surfaces, motion, and interaction — ready for homepage composition
              in Phase 2.
            </Text>
          </FadeIn>
        </Stagger>
      </Section>

      <Divider className="mx-5 sm:mx-6 md:mx-8 lg:mx-10" />

      <Section>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <Text variant="label">Color</Text>
            <Text variant="heading">Palette</Text>
            <Text variant="body-sm" className="max-w-2xl">
              Monochrome first. Accent and champagne appear sparingly — never as
              a theme wash.
            </Text>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {swatches.map((swatch) => (
              <Surface
                key={swatch.name}
                hairline
                className="overflow-hidden"
              >
                <div className={`h-20 ${swatch.className}`} />
                <div className="flex flex-col gap-1 p-3">
                  <Text variant="label" className="text-ivory">
                    {swatch.name}
                  </Text>
                  <Text variant="caption">{swatch.value}</Text>
                </div>
              </Surface>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <Text variant="label">Typography</Text>
            <Text variant="heading">Type ramp</Text>
          </div>
          <div className="flex flex-col gap-6">
            <Text variant="display-md">Display</Text>
            <Text variant="heading">Section heading</Text>
            <Text variant="subhead">Subhead — confident supporting line</Text>
            <Text variant="body">
              Body copy stays highly legible. Craftsmanship, reputation, and
              modern Rwandan identity — without cliché.
            </Text>
            <Text variant="label">Label / UI meta</Text>
            <Text variant="caption">Caption for quiet metadata</Text>
          </div>
        </div>
      </Section>

      <Section>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <Text variant="label">Actions</Text>
            <Text variant="heading">Buttons & links</Text>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="champagne">Champagne</Button>
            <Button
              isLoading={loading}
              onClick={() => {
                setLoading(true);
                window.setTimeout(() => setLoading(false), 1600);
              }}
            >
              Loading
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <TextLink href="/" variant="inline">
              Inline link
            </TextLink>
            <TextLink href="/" variant="nav">
              Nav link
            </TextLink>
            <TextLink href="/" variant="cta">
              CTA link
            </TextLink>
            <TextLink href="/" variant="quiet">
              Quiet link
            </TextLink>
          </div>
        </div>
      </Section>

      <Section>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <Text variant="label">Surfaces & media</Text>
            <Text variant="heading">Treatments</Text>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Surface tone="base" hairline padded>
              <Text variant="label" className="text-ivory">
                Base + hairline
              </Text>
            </Surface>
            <Surface tone="elevated" padded>
              <Text variant="label" className="text-ivory">
                Elevated
              </Text>
            </Surface>
            <Surface tone="inset" hairline padded>
              <Text variant="label" className="text-ivory">
                Inset
              </Text>
            </Surface>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <RevealImage>
              <ImageFrame aspect="cinematic" treatment="film-grain">
                <div className="h-full w-full bg-gradient-to-br from-surface-elevated via-surface to-background" />
              </ImageFrame>
            </RevealImage>
            <div className="flex flex-col gap-4">
              <Skeleton className="h-24 w-full" label="Media loading" />
              <Skeleton className="h-4 w-2/3" label="Text loading" />
              <Skeleton className="h-4 w-1/2" label="Text loading" />
              <Text variant="caption">
                Placeholder frames only — real photography arrives later.
              </Text>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
