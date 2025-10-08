import { Button } from "@/components/ui/button";
import { Headphones } from "lucide-react";
import miningImagePath from "@assets/miner pic.png";
import logoImagePath from "@assets/71digital logo.png";

export default function HeroSection() {
  const handleContactSales = () => {
    window.open('/book-appointment', '_self');
  };

  return (
    <section className="relative py-8 md:py-12 px-4" id="hero">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-4 md:space-y-6 text-center lg:text-left">
            {/* Logo and Company Name */}
            <div className="space-y-4">
              {/* 71 Digital Logo */}
              <div className="relative flex justify-center">
                <img
                  src={logoImagePath}
                  alt="71 Digital Logo"
                  className="h-20 md:h-24 lg:h-32 w-auto object-contain opacity-60"
                />
              </div>
            </div>

            {/* Tagline */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-orange-500">
              The Pathway to Financial Freedom
            </h2>

            {/* Description */}
            <p className="text-base md:text-lg text-gray-300 leading-relaxed mx-auto lg:mx-0">
              Institutional-Grade Bitcoin Mining. Built in the UAE. Scaled Globally.
            </p>

            {/* CTA Button */}
            <div className="pt-2 md:pt-4">
              <Button
                className="bg-orange-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors flex items-center text-sm md:text-base mx-auto lg:mx-0"
                onClick={handleContactSales}
              >
                <Headphones className="w-3 h-3 md:w-4 md:h-4 mr-2 md:mr-3" />
                Speak to Sales
              </Button>
            </div>
          </div>

          {/* Right Content - Mining Equipment Image */}
          <div className="relative flex justify-center lg:justify-end items-center mt-8 lg:mt-0">
            <div className="relative">
              <img
                src={miningImagePath}
                alt="71 Digital mining facility with ASIC miners and server racks"
                className="w-full max-w-md lg:max-w-lg h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
