import type { Metadata } from "next";
import { ServicesPageContent } from "@/sections/services-page";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Services",
  description: "Premium grooming menu — cuts, beard, and signature sessions.",
  path: "/services",
});

export default function ServicesPage() {
  return <ServicesPageContent />;
}
