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
 * Homepage — local photography + selective local videos.
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
