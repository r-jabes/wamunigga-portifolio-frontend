import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";
import { Text } from "@/components/ui/text";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Work",
  description: "Archive of cuts and craft from Wamunigga Cuts.",
  path: "/work",
});

/** Minimal route destination for hero CTA — full archive arrives later. */
export default function WorkPage() {
  return (
    <PageContainer width="narrow" className="section-space">
      <Text variant="label">Work</Text>
      <Text as="h1" variant="display-md" className="mt-4">
        The work
      </Text>
      <Text variant="body" className="mt-4 max-w-md">
        Archive and craft stories arrive in a later phase.
      </Text>
    </PageContainer>
  );
}
