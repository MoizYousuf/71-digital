import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { CheckCircle, Phone, Download, MessageCircle } from "lucide-react";
import productsImage from "@assets/4.png";
import logo71NoText from "@assets/71digital logo - no text.png";
import s21AirImage from "@assets/Antminer s21 air cooling.png";
import s21HydroImage from "@assets/S21 hydro.png";
import l9Image from "@assets/l9.png";

export default function MiningStore() {
  const [currentSection, setCurrentSection] = useState("store");

  const handleNavigate = (section: string) => {
    setCurrentSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['store'];
      const scrollY = window.scrollY;
      
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollY >= offsetTop - 100 && scrollY < offsetTop + offsetHeight - 100) {
            setCurrentSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const storeSchema = {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": "Bitcoin Mining Hardware Store - 71 Digital UAE",
    "description": "Professional Bitcoin mining hardware including Antminer S21 Pro, S21 Hyd, and Goldshell KD Max. ASIC miners with competitive pricing and UAE delivery.",
    "url": "https://71digital.io/mining-store",
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Antminer S21 Pro 234TH",
          "category": "Bitcoin Mining Hardware"
        }
      }
    ]
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Bitcoin Mining Hardware Store UAE - ASIC Miners | 71 Digital"
        description="Professional Bitcoin mining hardware store in UAE. Antminer S21 Pro 234TH, S21 Hyd 335TH, Goldshell KD Max miners. Competitive pricing with local delivery and support."
        keywords="bitcoin mining hardware UAE, ASIC miners UAE, Antminer S21 Pro, mining equipment store, cryptocurrency hardware UAE, mining hardware Dubai, Abu Dhabi mining equipment"
        canonical="https://71digital.io/mining-store"
        schema={storeSchema}
      />
      <Header currentSection={currentSection} onNavigate={handleNavigate} />
      <main>
        {/* Hero Section */}
        <section className="py-12 md:py-16 px-4" id="store">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center mb-6 md:mb-8">
              <img 
                src={logo71NoText} 
                alt="71 Digital Logo" 
                className="w-8 h-8 md:w-12 md:h-12 mr-3 md:mr-4"
              />
              <h1 className="text-2xl md:text-4xl font-bold text-orange-500">Mining Store</h1>
            </div>
            
            <div className="mb-12 md:mb-16">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Performance-Grade ASIC Miners for Every Operation</h2>
              <p className="text-white text-base md:text-lg leading-relaxed max-w-4xl">
                Choose from a curated selection of top-performing machines optimized for air 
                cooling, hydro immersion, and scrypt mining. Each unit comes with verified 
                warranties and our comprehensive support package.
              </p>
            </div>

            {/* Products Layout */}
            <div className="space-y-12 md:space-y-16 mb-12 md:mb-16">
              {/* Bitmain Antminer S21 (Air Cooling) */}
              <div className="bg-white/5 rounded-xl border border-orange-500/20 overflow-hidden hover:border-orange-500/40 transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                  {/* Product Image */}
                  <div className="lg:col-span-1 bg-white/10 p-6 md:p-8 flex items-center justify-center">
                    <img 
                      src={s21AirImage}
                      alt="Bitmain Antminer S21 Air Cooling"
                      className="w-full max-w-xs h-auto object-contain"
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div className="lg:col-span-2 p-6 md:p-8">
                    <div className="mb-4 md:mb-6">
                      <h3 className="text-xl md:text-2xl font-bold text-orange-500 mb-2">
                        Bitmain Antminer S21 (Air Cooling)
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-xs md:text-sm">Bitcoin Mining</span>
                        <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs md:text-sm">Air Cooled</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
                      <div className="space-y-2 md:space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-300 text-sm md:text-base">Hashrate:</span>
                          <span className="text-white font-semibold text-sm md:text-base">234 TH/s</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300 text-sm md:text-base">Power:</span>
                          <span className="text-white font-semibold text-sm md:text-base">~3500W</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300 text-sm md:text-base">Efficiency:</span>
                          <span className="text-white font-semibold text-sm md:text-base">17.5 J/TH</span>
                        </div>
                      </div>
                      <div className="space-y-2 md:space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-300 text-sm md:text-base">Cooling:</span>
                          <span className="text-white font-semibold text-sm md:text-base">Air Cooling</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300 text-sm md:text-base">Best For:</span>
                          <span className="text-white font-semibold text-sm md:text-base">Standard Deployment</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300 text-sm md:text-base">Warranty:</span>
                          <span className="text-white font-semibold text-sm md:text-base">12 months</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                      <Button 
                        className="w-full text-sm md:text-base bg-orange-500 hover:bg-orange-600 text-white transition-colors"
                        onClick={() => window.open('/book-appointment', '_self')}
                      >
                        <MessageCircle className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                        Inquire Now
                      </Button>
                      <Button variant="outline" className="w-full text-sm md:text-base border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors">
                        <Download className="w-4 h-4 mr-2" />
                        Download Spec
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bitmain Antminer S21 Hydro */}
              <div className="bg-white/5 rounded-xl border border-orange-500/20 overflow-hidden hover:border-orange-500/40 transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                  {/* Product Details */}
                  <div className="lg:col-span-2 p-8 order-2 lg:order-1">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-orange-500 mb-2">
                        Bitmain Antminer S21 Hydro
                      </h3>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-sm">Bitcoin Mining</span>
                        <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm">Hydro Cooled</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Hashrate:</span>
                          <span className="text-white font-semibold">335 TH/s</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Power:</span>
                          <span className="text-white font-semibold">~5300W</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Efficiency:</span>
                          <span className="text-white font-semibold">21.2 J/TH</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Cooling:</span>
                          <span className="text-white font-semibold">Hydro-Cooling</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Best For:</span>
                          <span className="text-white font-semibold">High-density Sites</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Requirements:</span>
                          <span className="text-white font-semibold">Water Loop</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Button 
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white transition-colors"
                        onClick={() => window.open('/book-appointment', '_self')}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Inquire Now
                      </Button>
                      <Button variant="outline" className="w-full border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors">
                        <Download className="w-4 h-4 mr-2" />
                        Download Spec
                      </Button>
                    </div>
                  </div>
                  
                  {/* Product Image */}
                  <div className="lg:col-span-1 bg-white/10 p-8 flex items-center justify-center order-1 lg:order-2">
                    <img 
                      src={s21HydroImage}
                      alt="Bitmain Antminer S21 Hydro"
                      className="w-full max-w-xs h-auto object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Bitmain Antminer L9 */}
              <div className="bg-white/5 rounded-xl border border-orange-500/20 overflow-hidden hover:border-orange-500/40 transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                  {/* Product Image */}
                  <div className="lg:col-span-1 bg-white/10 p-8 flex items-center justify-center">
                    <img 
                      src={l9Image}
                      alt="Bitmain Antminer L9 Scrypt Miner"
                      className="w-full max-w-xs h-auto object-contain"
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div className="lg:col-span-2 p-8">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-orange-500 mb-2">
                        Bitmain Antminer L9 (Scrypt Miner)
                      </h3>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">Scrypt Mining</span>
                        <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">Air Cooled</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Hashrate:</span>
                          <span className="text-white font-semibold">17-18 GH/s</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Power:</span>
                          <span className="text-white font-semibold">~3300W</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Algorithm:</span>
                          <span className="text-white font-semibold">Scrypt</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Cooling:</span>
                          <span className="text-white font-semibold">Air Cooling</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Best For:</span>
                          <span className="text-white font-semibold">LTC/DOGE Mining</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Use Case:</span>
                          <span className="text-white font-semibold">Diversification</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Button 
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white transition-colors"
                        onClick={() => window.open('/book-appointment', '_self')}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Inquire Now
                      </Button>
                      <Button variant="outline" className="w-full border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors">
                        <Download className="w-4 h-4 mr-2" />
                        Download Spec
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Help Section */}
            <div className="text-center bg-white/5 rounded-lg p-8 border border-orange-500/20 mb-16">
              <h3 className="text-xl font-bold text-orange-500 mb-4">Need help choosing the right machine?</h3>
              <p className="text-white text-lg mb-6">Let our team recommend the best model for your site setup.</p>
              <div className="flex justify-center">
                <Button 
                  className="w-full max-w-md bg-orange-500 hover:bg-orange-600 text-white transition-colors"
                  onClick={() => window.open('/book-appointment', '_self')}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Talk to a Hardware Specialist
                </Button>
              </div>
            </div>

            {/* Features Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Verified Warranties</h4>
                <p className="text-white text-sm">All machines come with manufacturer warranties and our support guarantee.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">DDP Delivery</h4>
                <p className="text-white text-sm">Delivered duty paid to your facility with full logistics support.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Setup Support</h4>
                <p className="text-white text-sm">Optional configuration and deployment assistance available.</p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <img 
                  src={logo71NoText} 
                  alt="71 Digital Logo" 
                  className="w-8 h-8 mr-3"
                />
                <h3 className="text-xl font-bold text-orange-500">Ready to scale your mining operation?</h3>
              </div>
              
              <p className="text-white text-lg mb-8">Get competitive pricing and bulk purchase agreements.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
                <Button 
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white transition-colors"
                  onClick={() => window.open('/book-appointment', '_self')}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Request Quote
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors"
                  onClick={() => window.open('https://wa.me/971503578552', '_blank')}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp Business
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