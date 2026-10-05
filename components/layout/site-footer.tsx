import { siteConfig } from "@/data/content/site";
import { Container } from "@/components/layout/container";

/** Structural footer shell — contact/social content lands in later phases. */
export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-ivory/10">
      <Container className="flex flex-col gap-2 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-display text-sm uppercase tracking-[0.18em] text-ivory/80">
          {siteConfig.name}
        </p>
        <p className="font-sans text-xs uppercase tracking-[0.14em] text-ivory/45">
          {siteConfig.tagline}
        </p>
      </Container>
    </footer>
  );
}
