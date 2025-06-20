import { useEffect, useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import StatsSection from "@/components/StatsSection";
import PricingSection from "@/components/PricingSection";
import PartnersSection from "@/components/PartnersSection";
import AdvantageSection from "@/components/AdvantageSection";
import TailoredSection from "@/components/TailoredSection";
import GlobalReachSection from "@/components/GlobalReachSection";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

export default function Home() {
  const [currentSection, setCurrentSection] = useState("hero");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Bitcoin Mining Solutions UAE - 71 Digital",
    "description": "Professional cryptocurrency mining and hosting services in UAE with 65.5MW capacity across Abu Dhabi and Al Ain facilities.",
    "url": "https://71digital.io/",
    "mainEntity": {
      "@type": "Service",
      "name": "Bitcoin Mining & Hosting",
      "description": "Institutional-grade Bitcoin mining infrastructure and ASIC hosting services",
      "provider": {
        "@type": "Organization",
        "name": "71 Digital Inc"
      }
    }
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title="71 Digital - Institutional Bitcoin Mining & Hosting Solutions UAE"
        description="Leading cryptocurrency mining company in UAE offering institutional-grade Bitcoin mining, hosting solutions, ASIC deployment, and mining farm management across 65.5MW capacity."
        keywords="bitcoin mining, cryptocurrency mining, ASIC hosting, mining farm, UAE bitcoin mining, institutional mining, mining infrastructure, Bitmain, Whatsminer, Abu Dhabi mining, Al Ain mining"
        canonical="https://71digital.io/"
        schema={homeSchema}
      />
      <Header currentSection={currentSection} onNavigate={scrollToSection} />
      <main>
        <HeroSection />
        <AboutSection />
        <StatsSection />
        <PricingSection />
        <PartnersSection />
        <AdvantageSection />
        <TailoredSection />
        <GlobalReachSection />
      </main>
      <Footer />
    </div>
  );
}
