import type { Metadata } from "next";
import { StoryPageContent } from "@/sections/story-page";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Story",
  description:
    "The man behind the chair — Wamunigga Cuts story, journey, and craft.",
  path: "/story",
});

export default function StoryPage() {
  return <StoryPageContent />;
}
