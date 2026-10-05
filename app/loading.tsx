import { PageContainer } from "@/components/layout/page-container";
import { Skeleton } from "@/components/ui/skeleton";
import { Text } from "@/components/ui/text";

export default function RootLoading() {
  return (
    <PageContainer width="narrow" className="section-space-hero">
      <div className="flex max-w-xl flex-col gap-4" aria-busy="true">
        <Text variant="label" className="text-ivory-subtle">
          Loading
        </Text>
        <Skeleton className="h-10 w-48" label="Loading page" />
        <Skeleton className="h-16 w-full max-w-md" label="Loading content" />
        <Skeleton className="h-4 w-3/4" label="Loading details" />
      </div>
    </PageContainer>
  );
}
