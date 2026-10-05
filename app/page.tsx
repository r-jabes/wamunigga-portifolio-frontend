import { HomeHero } from "@/sections/home-hero";
import {
  HomeBookingCtaSection,
  HomeChairSection,
  HomeCraftSection,
  HomeReputationSection,
  HomeServicesSection,
  HomeSignatureWorkSection,
  HomeTeamSection,
  HomeWamuniggaSection,
} from "@/sections/home";

/**
 * Homepage — real photography + selective Instagram Reels inside editorial storytelling.
 */
export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeReputationSection />
      <HomeCraftSection />
      <HomeSignatureWorkSection />
      <HomeChairSection />
      <HomeTeamSection />
      <HomeWamuniggaSection />
      <HomeServicesSection />
      <HomeBookingCtaSection />
    </>
  );
}
