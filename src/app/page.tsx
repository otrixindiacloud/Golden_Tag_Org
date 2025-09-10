"use client";

import StoreBanner from "../components/StoreBanner";
import HeroSection from "../components/HeroSection";
import IndustriesSection from "../components/IndustriesSection";
import GratitudeSection from "../components/GratitudeSection";


export default function Home() {
  return (
    <main className="min-h-screen">
      <StoreBanner />

      <HeroSection />
      <IndustriesSection />
      <GratitudeSection />
    </main>
  );
}
