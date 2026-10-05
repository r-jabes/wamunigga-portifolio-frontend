import { Text } from "@/components/ui/text";
import { storyPendingMessage } from "@/data/content/story";

/** Shown when a story section has no verified paragraphs yet. */
export function StoryPendingCopy() {
  return (
    <div className="border border-dashed border-border bg-surface/50 px-5 py-6 md:px-6">
      <Text variant="body-sm" className="max-w-xl text-muted">
        {storyPendingMessage}
      </Text>
    </div>
  );
}
