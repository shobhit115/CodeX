import React from "react";
import HeroSection from "../features/landing/components/HeroSection";
import MissionSection from "../features/landing/components/MissionSection";
import CommitSection from "../features/landing/components/CommitSection";
import PartnerSection from "../features/landing/components/PartnerSection";
import ContactSection from "../features/landing/components/ContactSection";
import Domains from "../features/landing/components/Domains";

const Home = () => {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <MissionSection />
      <Domains />
      <CommitSection />
      <PartnerSection />
      <ContactSection />
    </div>
  );
};

export default Home;
