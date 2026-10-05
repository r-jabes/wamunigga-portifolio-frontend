import { PageContainer } from "@/components/layout/page-container";
import { ButtonLink } from "@/components/ui/button-link";
import { Text } from "@/components/ui/text";

export default function NotFoundPage() {
  return (
    <PageContainer width="narrow" className="section-space">
      <div className="flex max-w-lg flex-col gap-6">
        <Text variant="label" className="text-ivory-subtle">
          404
        </Text>
        <Text as="h1" variant="display-md">
          Page not found.
        </Text>
        <Text variant="body" className="text-ivory-muted">
          That route doesn’t exist. Book a cut, browse the work, or head home.
        </Text>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/booking">Book your cut</ButtonLink>
          <ButtonLink href="/" variant="secondary">
            Home
          </ButtonLink>
        </div>
      </div>
    </PageContainer>
  );
}
