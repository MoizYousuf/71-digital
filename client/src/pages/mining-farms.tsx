import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Zap, 
  Shield, 
  TrendingUp, 
  MapPin, 
  Users, 
  Clock, 
  CheckCircle,
  ArrowRight,
  Phone,
  MessageCircle,
  Thermometer,
  Cpu,
  Globe,
  BarChart3
} from "lucide-react";
import logo71NoText from "@assets/71digital logo - no text.png";

export default function MiningFarms() {
  const [currentSection, setCurrentSection] = useState("mining-farms");

  const handleNavigate = (section: string) => {
    if (section === "home") {
      window.location.href = "/";
    } else if (section === "about") {
      window.location.href = "/about";
    } else if (section === "services") {
      window.location.href = "/services";
    } else if (section === "contact") {
      window.location.href = "/contact";
    } else if (section === "mining-store") {
      window.location.href = "/mining-store";
    }
  };

  const miningFarmsSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "71 Digital Mining Farms UAE",
    "description": "Enterprise Bitcoin mining farms in UAE with 65.5MW capacity across Abu Dhabi and Al Ain. Professional cryptocurrency mining infrastructure and operations.",
    "url": "https://71digital.io/mining-farms",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "AE",
      "addressRegion": "Abu Dhabi"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Mining Farm Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Bitcoin Mining Hosting"
          }
        }
      ]
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1A0F08' }}>
      <SEOHead
        title="Bitcoin Mining Farms UAE - 65.5MW Capacity | 71 Digital"
        description="Professional Bitcoin mining farms in UAE with 65.5MW total capacity across Abu Dhabi and Al Ain. Enterprise mining infrastructure, hydro-cooling technology, and 99% uptime SLA."
        keywords="bitcoin mining farms UAE, cryptocurrency mining facilities, mining farm Abu Dhabi, mining infrastructure UAE, Bitcoin mining operations, crypto mining facilities UAE"
        canonical="https://71digital.io/mining-farms"
        schema={miningFarmsSchema}
      />
      <Header currentSection={currentSection} onNavigate={handleNavigate} />
      <main>
        {/* Hero Section */}
        <section className="py-12 md:py-16 px-4" id="mining-farms">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-8 md:mb-12">
              <div className="flex items-center justify-center mb-6">
                <img 
                  src={logo71NoText} 
                  alt="71 Digital Logo" 
                  className="w-12 h-12 mr-4"
                />
                <h1 className="text-3xl md:text-5xl font-bold text-orange-500">Mining Farm Solutions</h1>
              </div>
              <p className="text-white text-lg md:text-xl max-w-3xl mx-auto">
                Licensed cryptocurrency mining company specializing in mid to large-scale Bitcoin mining operations across the GCC region. 
                Currently operating 25 megawatts of mining capacity with plans to expand to 50MW.
              </p>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="py-12 md:py-16 px-4" style={{ backgroundColor: '#2D1810' }}>
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Enterprise Mining Infrastructure
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Our mining farms combine cutting-edge technology with strategic locations 
                to deliver superior mining performance and returns.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-orange-500/30">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Low Hosting Costs</h3>
                <p className="text-gray-300">
                  Competitive hosting costs in the GCC region without compromising uptime or quality, 
                  backed by stable power infrastructure and reliable logistics.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-orange-500/30">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
                  <Thermometer className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Hybrid Cooling Solutions</h3>
                <p className="text-gray-300">
                  Combination of air-cooled, hydro-cooled and immersion cooling systems 
                  to maximize performance and equipment longevity.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-orange-500/30">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Proven Uptime</h3>
                <p className="text-gray-300">
                  Proven 95-98% uptime performance, powered by real-time monitoring, 
                  redundancy systems, and expert on-site teams.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-orange-500/30">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Real-Time Analytics</h3>
                <p className="text-gray-300">
                  Advanced monitoring systems providing real-time data on power consumption, 
                  hash rates, and profitability metrics.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-orange-500/30">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
                  <Cpu className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Turnkey Solutions</h3>
                <p className="text-gray-300">
                  Complete end-to-end services from miner sourcing and deployment 
                  to maintenance and performance optimization.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-orange-500/30">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Fully Licensed & Compliant</h3>
                <p className="text-gray-300">
                  Licensed operations with full regulatory compliance across the GCC region, 
                  offering stable power, reliable logistics, and regulatory clarity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Farm Specifications Section */}
        <section className="py-12 md:py-16 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Mining Farm Specifications
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Purpose-built facilities designed for maximum mining efficiency and scalability.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Technical Specs */}
              <div className="bg-gray-800/30 rounded-lg p-8 border border-orange-500/20">
                <h3 className="text-2xl font-bold text-orange-500 mb-6">Technical Specifications</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Current Capacity:</span>
                    <span className="text-white font-semibold">25 MW</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Planned Expansion:</span>
                    <span className="text-white font-semibold">50 MW</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Current Hash Rate:</span>
                    <span className="text-white font-semibold">635.25 PH/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Proven Uptime:</span>
                    <span className="text-white font-semibold">95-98%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Regional Focus:</span>
                    <span className="text-white font-semibold">GCC Region</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Cooling Method:</span>
                    <span className="text-white font-semibold">Air-cooled, Hydro & Immersion</span>
                  </div>
                </div>
              </div>

              {/* Infrastructure Features */}
              <div className="bg-gray-800/30 rounded-lg p-8 border border-orange-500/20">
                <h3 className="text-2xl font-bold text-orange-500 mb-6">Infrastructure Features</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-white">Industrial-grade infrastructure optimized for efficiency and scale</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-white">Real-time monitoring and expert on-site teams</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-white">Strategically deployed sites across the GCC</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-white">Stable power and reliable logistics</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-white">Built by team with deep technical and regional expertise</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-white">Scalable deployment capabilities</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Performance Metrics Section */}
        <section className="py-12 md:py-16 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Performance Track Record
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Proven results with consistent growth in hash rate and profitability across multiple quarters.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Current Quarter Performance */}
              <div className="bg-gray-800/30 rounded-lg p-6 border border-orange-500/20 text-center">
                <h3 className="text-xl font-bold text-orange-500 mb-4">Current Performance (2025)</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-2xl font-bold text-white">635.25 PH/s</div>
                    <div className="text-gray-300 text-sm">Average Hash Rate</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">$5.57M</div>
                    <div className="text-gray-300 text-sm">Quarterly Revenue</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">29.68 BTC</div>
                    <div className="text-gray-300 text-sm">BTC Earned (Est.)</div>
                  </div>
                </div>
              </div>

              {/* Growth Metrics */}
              <div className="bg-gray-800/30 rounded-lg p-6 border border-orange-500/20 text-center">
                <h3 className="text-xl font-bold text-orange-500 mb-4">Growth Trajectory</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-2xl font-bold text-white">+217%</div>
                    <div className="text-gray-300 text-sm">Hash Rate Growth (2023-2025)</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">+217%</div>
                    <div className="text-gray-300 text-sm">Revenue Growth (2023-2025)</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">50 MW</div>
                    <div className="text-gray-300 text-sm">Target Capacity</div>
                  </div>
                </div>
              </div>

              {/* Quarterly Highlights */}
              <div className="bg-gray-800/30 rounded-lg p-6 border border-orange-500/20 text-center">
                <h3 className="text-xl font-bold text-orange-500 mb-4">Recent Quarter (Q4 2024)</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-2xl font-bold text-white">605 PH/s</div>
                    <div className="text-gray-300 text-sm">Average Hash Rate</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">$3.79M</div>
                    <div className="text-gray-300 text-sm">Net Income</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">27.81 BTC</div>
                    <div className="text-gray-300 text-sm">BTC Earned</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Note */}
            <div className="bg-gray-800/20 rounded-lg p-6 border border-orange-500/10">
              <p className="text-gray-400 text-sm text-center">
                All figures presented are based on internal estimates and publicly available assumptions. 
                Revenue, cost, and BTC earned are approximate and subject to change due to market volatility, 
                network difficulty adjustments, miner efficiency, and operational variables.
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-12 md:py-16 px-4 bg-black/30">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Complete Mining Solutions
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                From site development to ongoing operations, we provide end-to-end mining farm services.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Service 1 */}
              <div className="bg-gray-800/50 rounded-lg p-6 border border-orange-500/20">
                <Building2 className="w-12 h-12 text-orange-500 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Site Development</h3>
                <p className="text-gray-300 mb-4">
                  Complete turnkey mining facility development from site selection to construction completion.
                </p>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Site acquisition and permitting</li>
                  <li>• Engineering and construction</li>
                  <li>• Power infrastructure development</li>
                  <li>• Cooling system installation</li>
                </ul>
              </div>

              {/* Service 2 */}
              <div className="bg-gray-800/50 rounded-lg p-6 border border-orange-500/20">
                <Users className="w-12 h-12 text-orange-500 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Operations Management</h3>
                <p className="text-gray-300 mb-4">
                  24/7 mining operations management with dedicated technical teams and support staff.
                </p>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• 24/7 monitoring and maintenance</li>
                  <li>• Performance optimization</li>
                  <li>• Hardware replacement and repairs</li>
                  <li>• Security and access control</li>
                </ul>
              </div>

              {/* Service 3 */}
              <div className="bg-gray-800/50 rounded-lg p-6 border border-orange-500/20">
                <TrendingUp className="w-12 h-12 text-orange-500 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Performance Analytics</h3>
                <p className="text-gray-300 mb-4">
                  Advanced analytics and reporting to maximize mining profitability and efficiency.
                </p>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Real-time performance dashboards</li>
                  <li>• Profitability analysis and reporting</li>
                  <li>• Predictive maintenance alerts</li>
                  <li>• Energy consumption optimization</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Scale Your Mining Operations?
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Partner with 71 Digital to access institutional-grade mining infrastructure 
              and maximize your Bitcoin mining returns.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
              <Button 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white transition-colors"
                onClick={() => window.open('/book-appointment', '_self')}
              >
                <Phone className="w-5 h-5 mr-2" />
                Schedule Consultation
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors"
                onClick={() => window.open('/contact', '_self')}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Contact Our Team
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}