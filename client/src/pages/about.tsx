import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import mapImage from "@assets/map.png";
import logoNoText from "@assets/71digital logo - no text.png";
import ahmadImage from "@assets/ahmed_1750428582092.png";
import husseinImage from "@assets/hussein_1750428582094.png";
import mohammadImage from "@assets/moh_1750428582095.png";
import tariqImage from "@assets/tariq_1750428582095.png";

export default function About() {
  const [currentSection, setCurrentSection] = useState("about");

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

  const teamMembers = [
    {
      name: "Ahmad Al Redha",
      position: "Chief Executive Officer",
      image: ahmadImage
    },
    {
      name: "Mohamad Abdulrazak",
      position: "Chief Strategic Officer",
      image: mohammadImage
    },
    {
      name: "Hussein Abdulrazak",
      position: "Chief Operations Officer",
      image: husseinImage
    },
    {
      name: "Tariq Al Marzooqi",
      position: "Chief Financial Officer",
      image: tariqImage
    }
  ];

  const countries = [
    { name: "UAE", code: "AE" },
    { name: "Canada", code: "CA" },
    { name: "USA", code: "US" },
    { name: "Oman", code: "OM" },
    { name: "Ethiopia", code: "ET" }
  ];

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About 71 Digital - Crypto Mining Infrastructure UAE",
    "description": "Learn about 71 Digital, UAE's leading cryptocurrency mining infrastructure provider with operations across Abu Dhabi and Al Ain.",
    "url": "https://71digital.io/about",
    "mainEntity": {
      "@type": "Organization",
      "name": "71 Digital Inc",
      "foundingDate": "2023",
      "description": "Specialized crypto mining infrastructure provider and operator based in UAE"
    }
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title="About 71 Digital - Leading Crypto Mining Infrastructure UAE"
        description="Learn about 71 Digital, UAE's premier cryptocurrency mining infrastructure provider operating 65.5MW across Abu Dhabi and Al Ain. Institutional-grade Bitcoin mining solutions."
        keywords="about 71 digital, crypto mining UAE, mining infrastructure, bitcoin mining company, cryptocurrency mining UAE, Abu Dhabi mining, Al Ain mining"
        canonical="https://71digital.io/about"
        schema={aboutSchema}
      />
      <Header currentSection={currentSection} onNavigate={scrollToSection} />
      <main>
        {/* About Us Section */}
        <section className="py-16 px-4" id="about">
          <div className="container mx-auto max-w-4xl">
            <div className="flex items-center mb-8">
              <img src={logoNoText} alt="71 Digital" className="w-12 h-8 mr-4" style={{filter: 'brightness(0) saturate(100%) invert(65%) sepia(95%) saturate(2076%) hue-rotate(4deg) brightness(104%) contrast(101%)'}} />
              <h1 className="text-4xl font-bold text-orange-500">About us</h1>
            </div>
            
            <div className="space-y-6 text-white text-lg leading-relaxed">
              <p>
                Founded and headquartered in the UAE, 71 Digital is a specialized crypto mining infrastructure provider and operator. Our mission is to simplify and scale the process of mining for institutional clients, sovereign entities, and retail co-mining participants.
              </p>
              
              <p>
                We work closely with energy providers, landlords, and international partners to deliver customized site solutions. From power acquisition to ASIC procurement, and all the way to 24/7 site management, our team handles everything so you can mine profitably and reliably.
              </p>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-16 px-4" id="vision">
          <div className="container mx-auto max-w-4xl">
            <div className="flex items-center mb-8">
              <img src={logoNoText} alt="71 Digital" className="w-12 h-8 mr-4" style={{filter: 'brightness(0) saturate(100%) invert(65%) sepia(95%) saturate(2076%) hue-rotate(4deg) brightness(104%) contrast(101%)'}} />
              <h2 className="text-4xl font-bold text-orange-500">Vision</h2>
            </div>
            
            <p className="text-white text-lg leading-relaxed mb-12">
              To be the leading digital mining infrastructure firm across MENA and emerging markets, shaping the future of decentralized finance and green computing.
            </p>

            {/* Countries */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              {countries.map((country, index) => (
                <div key={index} className="flex items-center space-x-2 px-4 py-2">
                  <img 
                    src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                    alt={`${country.name} flag`}
                    className="w-8 h-5 rounded object-cover"
                  />
                  <span className="text-white font-medium">{country.name}</span>
                </div>
              ))}
            </div>

            {/* World Map */}
            <div className="flex justify-center">
              <img 
                src={mapImage} 
                alt="Global presence map"
                className="w-full max-w-2xl h-auto"
              />
            </div>
          </div>
        </section>

        {/* Leadership Team Section */}
        <section className="py-16 px-4" id="leadership">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-orange-500">Leadership Team</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="mb-4">
                    <img 
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-40 object-cover rounded-lg mx-auto border-2 border-orange-500"
                    />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-1">{member.name}</h3>
                  <p className="text-gray-300 text-sm">{member.position}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}