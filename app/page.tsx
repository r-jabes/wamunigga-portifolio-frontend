import { Container } from "@/components/layout";
import { siteConfig } from "@/data/content/site";

/**
 * Phase 0 scaffold only — not the production homepage.
 * Full homepage composition begins in Phase 1.
 */
export default function Home() {
  return (
    <Container className="section-space flex flex-col gap-4">
      <p className="font-display text-3xl uppercase tracking-[0.14em] text-ivory sm:text-4xl">
        {siteConfig.name}
      </p>
      <p className="max-w-md font-sans text-sm leading-relaxed text-muted sm:text-base">
        Foundation ready. Homepage and content arrive in later phases.
      </p>
    </Container>
  );
}
