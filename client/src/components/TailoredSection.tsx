import { Button } from "@/components/ui/button";
import { Users, Building2, Factory, Globe, Brain } from "lucide-react";

export default function TailoredSection() {
  const minerTypes = [
    {
      icon: <Building2 className="w-5 h-5 text-orange-500" />,
      title: "Family Office: Looking for stable BTC exposure",
      color: "text-white"
    },
    {
      icon: <Factory className="w-5 h-5 text-orange-500" />,
      title: "Large-Scale Miner: Scaling capacity across regions",
      color: "text-white"
    },
    {
      icon: <Globe className="w-5 h-5 text-orange-500" />,
      title: "Sovereign Fund or Gov Entity: Seeking CAPEX infrastructure",
      color: "text-white"
    },
    {
      icon: <Brain className="w-5 h-5 text-orange-500" />,
      title: "Tech Founder or HNWI: Exploring retail-friendly co-mining",
      color: "text-white"
    }
  ];

  return (
    <section className="py-16 px-4" id="tailored">
      <div className="container mx-auto max-w-4xl">
        {/* Title */}
        <h2 className="text-3xl font-bold text-orange-500 mb-8">
          Tailored for Every Miner
        </h2>
        
        {/* Description */}
        <p className="text-lg text-white mb-4">
          Whether you're a...
        </p>

        {/* Miner Types */}
        <div className="space-y-3 mb-12">
          {minerTypes.map((miner, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="mt-1">{miner.icon}</div>
              <span className={`text-lg ${miner.color} leading-relaxed`}>{miner.title}</span>
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <div className="space-y-6">
          <p className="text-lg text-white">
            We build and manage your mining operation — like it's our own.
          </p>
          
          {/* CTA Button */}
          <Button 
            className="w-full bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 font-semibold rounded-full transition-colors flex items-center justify-center"
            onClick={() => window.open('/book-appointment', '_self')}
          >
            <Users className="w-4 h-4 mr-3" />
            Talk to Our Team
          </Button>
        </div>
      </div>
    </section>
  );
}