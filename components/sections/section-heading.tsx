import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

export type SectionHeadingProps = {
  index: string;
  title: string;
  eyebrow?: string;
  className?: string;
};

/** Numbered editorial section opener — "01 — Reputation" */
export function SectionHeading({
  index,
  title,
  eyebrow,
  className,
}: SectionHeadingProps) {
  return (
    <header className={cn("flex flex-col gap-3", className)}>
      <Text variant="label" className="text-ivory-subtle">
        {index} — {title}
      </Text>
      {eyebrow ? (
        <Text as="h2" variant="display-md" className="text-balance text-ivory">
          {eyebrow}
        </Text>
      ) : null}
    </header>
  );
}
