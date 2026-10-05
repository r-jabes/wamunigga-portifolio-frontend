import { siteConfig } from "@/data/content/site";
import { Container } from "@/components/layout/container";
import { FooterContact } from "@/components/layout/footer-contact";
import { NavLinks } from "@/components/layout/nav-links";
import { Text } from "@/components/ui/text";

/** Global footer — brand, IA, connect (07), legal. */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer id="footer" className="mt-auto border-t border-border">
      <Container className="flex flex-col gap-12 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="flex max-w-md flex-col gap-3 lg:col-span-4">
            <Text
              as="p"
              variant="heading"
              className="tracking-[0.16em] text-ivory"
            >
              {siteConfig.name}
            </Text>
            <Text variant="label" className="text-ivory-subtle">
              {siteConfig.tagline}
            </Text>
          </div>

          <div className="lg:col-span-4">
            <Text variant="label" className="mb-6 text-ivory-subtle">
              Explore
            </Text>
            <nav aria-label="Footer">
              <NavLinks variant="footer" />
            </nav>
          </div>

          <div className="lg:col-span-4">
            <FooterContact />
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Text variant="caption">
            © {year} {siteConfig.shortName}
          </Text>
          <Text variant="caption" className="text-ivory-subtle/80">
            {siteConfig.tagline}
          </Text>
        </div>
      </Container>
    </footer>
  );
}
