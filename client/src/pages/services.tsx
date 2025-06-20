import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { CheckCircle, Building2, Zap, HardDrive, Settings, MapPin, Phone, MessageCircle, FileText } from "lucide-react";
import centerImage from "@assets/center.png";
import unoImage from "@assets/uno.png";
import lastImage from "@assets/last.png";
import logo71NoText from "@assets/71digital logo - no text.png";

export default function Services() {
  const [currentSection, setCurrentSection] = useState("services");

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

  const services = [
    {
      icon: <Building2 className="w-8 h-8 text-orange-500" />,
      title: "Hosting Solutions",
      items: [
        "Air Cooling | Hydro | Immersion",
        "Facilities in the UAE, Canada, USA, Oman, and Ethiopia.",
        "99% uptime SLA",
        "Remote monitoring & smart alerts",
        "Flexible contract terms"
      ],
      action: "Request Hosting Quote"
    },
    {
      icon: <MapPin className="w-8 h-8 text-orange-500" />,
      title: "Site Acquisition & Power Deals",
      items: [
        "Lease terms and CAPEX structuring",
        "Energy rates as low as $0.012$/kWh",
        "Land sourcing, legal, and permits handled",
        "Grid or off-grid site options",
        "Fast-track timelines for deployment"
      ],
      action: "Secure a Site"
    },
    {
      icon: <HardDrive className="w-8 h-8 text-orange-500" />,
      title: "Hardware Procurement",
      items: [
        "ASIC machines at competitive rates with DDP delivery.",
        "Bitmain, Whatsminer, and hydro-ready rigs",
        "Bulk purchase agreements",
        "Optional setup & configuration",
        "Verified warranties and vendor partners"
      ],
      action: "View Inventory"
    },
    {
      icon: <Settings className="w-8 h-8 text-orange-500" />,
      title: "Mining Operations & Site Management",
      items: [
        "Let 71 Digital manage from setup to ongoing operations.",
        "24/7 monitoring and maintenance",
        "On-site technical support",
        "Firmware upgrades and optimization",
        "Energy efficiency tracking"
      ],
      action: "Talk to a Site Manager"
    }
  ];

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Bitcoin Mining Services UAE - 71 Digital",
    "description": "Comprehensive cryptocurrency mining services including hosting solutions, site acquisition, hardware procurement, and mining operations management.",
    "url": "https://71digital.io/services",
    "provider": {
      "@type": "Organization",
      "name": "71 Digital Inc"
    },
    "serviceType": ["Bitcoin Mining", "ASIC Hosting", "Mining Infrastructure", "Site Management"]
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Bitcoin Mining Services UAE - Hosting & Infrastructure | 71 Digital"
        description="Comprehensive Bitcoin mining services in UAE including ASIC hosting, site acquisition, hardware procurement, and mining operations management. 65.5MW capacity across Abu Dhabi and Al Ain."
        keywords="bitcoin mining services, ASIC hosting UAE, mining infrastructure, cryptocurrency hosting, mining farm services, Bitcoin mining UAE, Abu Dhabi mining services"
        canonical="https://71digital.io/services"
        schema={servicesSchema}
      />
      <Header currentSection={currentSection} onNavigate={scrollToSection} />
      <main>
        {/* Hero Section */}
        <section className="py-16 px-4" id="services">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center mb-8">
              <img 
                src={logo71NoText} 
                alt="71 Digital Logo" 
                className="w-12 h-12 mr-4"
              />
              <h1 className="text-4xl font-bold text-orange-500">Services</h1>
            </div>
            
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-white mb-6">End-to-End Mining Infrastructure Delivered</h2>
              <p className="text-white text-lg leading-relaxed max-w-4xl">
                Whether you're an institutional investor, a mining fund, or a large-scale operator, 71 
                Digital provides everything needed to deploy, scale, and manage a profitable crypto 
                mining operation. Every service is modular and customizable to fit your growth goals.
              </p>
            </div>

            {/* Services Layout */}
            <div className="relative">
              {/* Top Section with Hosting Solutions and Mining Racks Image */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {/* Hosting Solutions */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6 border border-orange-500/30 w-full max-w-full md:max-w-sm mx-auto lg:mx-0">
                  <div className="flex items-center mb-4">
                    <Building2 className="w-6 h-6 text-orange-500" />
                    <h3 className="text-base md:text-lg font-bold text-white ml-2">Hosting Solutions</h3>
                  </div>
                  
                  {/* Mobile: Show image inside card */}
                  <div className="block lg:hidden mb-4">
                    <img 
                      src={unoImage}
                      alt="Mining facility racks"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-white text-xs">Air Cooling | Hydro | Immersion</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-white text-xs">Facilities in the UAE, Canada, USA, Oman, and Ethiopia.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-white text-xs">99% uptime SLA</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-white text-xs">Remote monitoring & smart alerts</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-white text-xs">Flexible contract terms</span>
                    </li>
                  </ul>
                  
                  <button 
                    className="flex items-center text-orange-500 font-medium hover:text-orange-400 transition-colors text-sm cursor-pointer"
                    onClick={() => window.open('/mining-farms', '_self')}
                  >
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                    Request Hosting Quote
                  </button>
                </div>

                {/* Mining Racks Image - Desktop only */}
                <div className="lg:col-span-2 hidden lg:block">
                  <img 
                    src={unoImage}
                    alt="Mining facility racks"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>

              {/* Middle Section with Service Cards and Right-positioned ASIC Image */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 items-start">
                {/* Left Column - Service Cards */}
                <div className="space-y-6 md:space-y-8">
                  {/* Site Acquisition */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6 border border-orange-500/30 w-full max-w-full md:max-w-sm mx-auto lg:mx-0">
                    <div className="flex items-center mb-4">
                      <MapPin className="w-6 h-6 text-orange-500" />
                      <h3 className="text-base md:text-lg font-bold text-white ml-2">Site Acquisition & Power Deals</h3>
                    </div>
                    
                    {/* Mobile: Show image inside card */}
                    <div className="block lg:hidden mb-4">
                      <img 
                        src={centerImage}
                        alt="Mining hardware with cryptocurrency connections"
                        className="w-full h-48 object-contain rounded-lg"
                      />
                    </div>
                    
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-white text-xs">Lease terms and CAPEX structuring</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-white text-xs">Energy rates as low as $0.012$/kWh</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-white text-xs">Land sourcing, legal, and permits handled</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-white text-xs">Grid or off-grid site options</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-white text-xs">Fast-track timelines for deployment</span>
                      </li>
                    </ul>
                    
                    <button 
                      className="flex items-center text-orange-500 font-medium hover:text-orange-400 transition-colors text-sm cursor-pointer"
                      onClick={() => window.open('/deployment-sites', '_self')}
                    >
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                      Secure a Site
                    </button>
                  </div>

                  {/* Hardware Procurement */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6 border border-orange-500/30 w-full max-w-full md:max-w-sm mx-auto lg:mx-0">
                    <div className="flex items-center mb-4">
                      <HardDrive className="w-6 h-6 text-orange-500" />
                      <h3 className="text-base md:text-lg font-bold text-white ml-2">Hardware Procurement</h3>
                    </div>
                    
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-white text-xs">ASIC machines at competitive rates with DDP delivery.</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-white text-xs">Bitmain, Whatsminer, and hydro-ready rigs</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-white text-xs">Bulk purchase agreements</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-white text-xs">Optional setup & configuration</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-white text-xs">Verified warranties and vendor partners</span>
                      </li>
                    </ul>
                    
                    <button 
                      className="flex items-center text-orange-500 font-medium hover:text-orange-400 transition-colors text-sm cursor-pointer"
                      onClick={() => window.open('/mining-store', '_self')}
                    >
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                      View Inventory
                    </button>
                  </div>
                </div>

                {/* Right Column - Mining Hardware with Crypto Icons - Desktop only */}
                <div className="hidden lg:flex justify-center items-center h-full">
                  <div className="relative">
                    <img 
                      src={centerImage}
                      alt="Mining hardware with cryptocurrency connections"
                      className="w-[32rem] h-[32rem] object-contain rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Section with Mining Operations and Cables Image */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                {/* Mining Operations */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6 border border-orange-500/30 w-full max-w-full md:max-w-sm mx-auto lg:mx-0">
                  <div className="flex items-center mb-4">
                    <Settings className="w-6 h-6 text-orange-500" />
                    <h3 className="text-base md:text-lg font-bold text-white ml-2">Mining Operations & Site Management</h3>
                  </div>
                  
                  {/* Mobile: Show image inside card */}
                  <div className="block lg:hidden mb-4">
                    <img 
                      src={lastImage}
                      alt="Data center cables and infrastructure"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-white text-xs">Let 71 Digital manage from setup to ongoing operations.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-white text-xs">24/7 monitoring and maintenance</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-white text-xs">On-site technical support</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-white text-xs">Firmware upgrades and optimization</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-white text-xs">Energy efficiency tracking</span>
                    </li>
                  </ul>
                  
                  <button 
                    className="flex items-center text-orange-500 font-medium hover:text-orange-400 transition-colors text-sm cursor-pointer"
                    onClick={() => window.open('/book-appointment', '_self')}
                  >
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                    Talk to a Site Manager
                  </button>
                </div>

                {/* Cables Image - Desktop only */}
                <div className="lg:col-span-2 hidden lg:block">
                  <img 
                    src={lastImage}
                    alt="Data center cables and infrastructure"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>



            {/* Call to Action */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-orange-500 mr-2" />
                <h3 className="text-xl font-bold text-orange-500">Ready to build or scale your mining infrastructure?</h3>
              </div>
              
              <p className="text-white text-lg mb-8">Let's start with a free consultation.</p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-orange-500 hover:bg-orange-600 text-white transition-colors"
                  onClick={() => window.open('/book-appointment', '_self')}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Book a Call
                </Button>
                <Button 
                  variant="outline" 
                  className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors"
                  onClick={() => window.open('/book-appointment', '_self')}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Get Hosting Quote
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}