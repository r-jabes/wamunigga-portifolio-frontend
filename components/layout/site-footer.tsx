import { siteConfig } from "@/data/content/site";
import { Container } from "@/components/layout/container";
import { NavLinks } from "@/components/layout/nav-links";
import { Text } from "@/components/ui/text";

/** Global footer — brand close, IA mirror, no invented contact details. */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border">
      <Container className="flex flex-col gap-10 py-12 md:py-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex max-w-md flex-col gap-3">
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

          <nav aria-label="Footer">
            <NavLinks variant="footer" />
          </nav>
        </div>

        <div className="flex flex-col gap-2 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Text variant="caption">
            © {year} {siteConfig.shortName}
          </Text>
          <Text variant="caption" className="text-ivory-subtle/80">
            Crafted for the cut.
          </Text>
        </div>
      </Container>
    </footer>
  );
}
