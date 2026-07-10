import React from "react";
import HeroSection from "../features/landing/components/HeroSection";
import WhyJoin from "../features/landing/components/WhyJoin";
import CommitSection from "../features/landing/components/CommitSection";
import GradientPulse from "../features/landing/components/GradientPulse";
import Domains from "../features/landing/components/Domains";

const Home = () => {
  return (
    <div className="home-page">
      <HeroSection />
      <WhyJoin />
      <Domains />
      <CommitSection />
      <GradientPulse />
      
    </div>
  );
};

export default Home;
