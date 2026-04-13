import { useState } from "react";
import { SplashLoader } from "@/components/shared/SplashLoader";
import { HeroSection } from "@/components/marketing/HeroSection";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { AppShowcase } from "@/components/marketing/AppShowcase";
import { PartnerSection } from "@/components/marketing/PartnerSection";
import { BytePowered } from "@/components/marketing/BytePowered";
import { FinalCTA } from "@/components/marketing/FinalCTA";
import { SmoothScroll } from "@/components/shared/SmoothScroll";
import { ScrollToHash } from "@/components/shared/ScrollToHash";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function LandingApp() {
  const [loading, setLoading] = useState(true);
  const ready = !loading;

  return (
    <main className="bg-black min-h-screen selection:bg-tuga-brand/35 selection:text-white">
      {loading && <SplashLoader onComplete={() => setLoading(false)} />}

      <SmoothScroll>
        <ScrollToHash whenReady={ready} />
        {ready && <Navbar />}
        <div
          className={`transition-opacity duration-1000 ${loading ? "opacity-0" : "opacity-100"}`}
        >
          <div id="inicio" className="scroll-target">
            <HeroSection show={ready} />
          </div>

          <div id="how-it-works" className="scroll-target">
            <HowItWorks />
          </div>

          <div id="features" className="scroll-target">
            <AppShowcase />
          </div>

          <div id="partners" className="scroll-target">
            <PartnerSection />
          </div>

          <div id="byte" className="scroll-target">
            <BytePowered />
          </div>

          <div id="support" className="scroll-target">
            <FinalCTA />
          </div>

          <Footer />
        </div>
      </SmoothScroll>
    </main>
  );
}
