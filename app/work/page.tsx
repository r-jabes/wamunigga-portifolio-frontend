import type { Metadata } from "next";
import { WorkArchive } from "@/sections/work-archive";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Work",
  description: "Editorial archive of cuts and craft from Wamunigga Cuts.",
  path: "/work",
});

export default function WorkPage() {
  return <WorkArchive />;
}
