import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/content/site";

const routes = [
  "/",
  "/story",
  "/work",
  "/services",
  "/booking",
  "/contact",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((path) => ({
    url: new URL(path, siteConfig.url).toString(),
    lastModified,
    changeFrequency: path === "/" || path === "/booking" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/booking" || path === "/contact" ? 0.9 : 0.7,
  }));
}
