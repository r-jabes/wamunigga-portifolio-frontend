import { siteConfig } from "@/data/content/site";
import { Container } from "@/components/layout/container";
import { Text } from "@/components/ui/text";

/** Structural footer shell — contact/social content lands in later phases. */
export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border">
      <Container className="flex flex-col gap-2 py-8 sm:flex-row sm:items-center sm:justify-between">
        <Text variant="label" className="text-ivory-muted">
          {siteConfig.name}
        </Text>
        <Text variant="caption">{siteConfig.tagline}</Text>
      </Container>
    </footer>
  );
}
