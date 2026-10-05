"use client";

import { useEffect } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Text } from "@/components/ui/text";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <PageContainer width="narrow" className="section-space">
      <div className="flex max-w-lg flex-col gap-6" role="alert">
        <Text variant="label" className="text-ivory-subtle">
          Something went wrong
        </Text>
        <Text as="h1" variant="display-md">
          We hit a snag.
        </Text>
        <Text variant="body" className="text-ivory-muted">
          The page failed to load. Try again, or return home and continue from
          there.
        </Text>
        <div className="flex flex-wrap gap-3">
          <Button type="button" onClick={reset}>
            Try again
          </Button>
          <ButtonLink href="/" variant="secondary">
            Back to home
          </ButtonLink>
        </div>
      </div>
    </PageContainer>
  );
}
