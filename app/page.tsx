import { HomeHero } from "@/sections/home-hero";
import {
  HomeBookingCtaSection,
  HomeCraftSection,
  HomeExperienceSection,
  HomeReputationSection,
  HomeServicesSection,
  HomeSignatureWorkSection,
} from "@/sections/home";

/**
 * Homepage — hero (Phase 3) + storytelling sections (Phase 4).
 */
export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeReputationSection />
      <HomeCraftSection />
      <HomeSignatureWorkSection />
      <HomeServicesSection />
      <HomeExperienceSection />
      <HomeBookingCtaSection />
    </>
  );
}
