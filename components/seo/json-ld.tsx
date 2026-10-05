import {
  buildLocalBusinessJsonLd,
  buildWebsiteJsonLd,
  serializeJsonLd,
} from "@/lib/structured-data";

function withoutContext(node: Record<string, unknown>) {
  const { ["@context"]: _removed, ...rest } = node;
  void _removed;
  return rest;
}

/** Sitewide LocalBusiness + WebSite structured data. */
export function SiteJsonLd() {
  const payload = {
    "@context": "https://schema.org",
    "@graph": [
      withoutContext(buildWebsiteJsonLd()),
      withoutContext(buildLocalBusinessJsonLd()),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(payload) }}
    />
  );
}
