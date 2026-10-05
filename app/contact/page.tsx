import type { Metadata } from "next";
import { ContactPageContent } from "@/sections/contact-page";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description:
    "Book, WhatsApp, Instagram, location, and hours — find Wamunigga Cuts from the feed to the chair.",
  path: "/contact",
});

export default function ContactPage() {
  return <ContactPageContent />;
}
