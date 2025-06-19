import { Button } from "@/components/ui/button";
import { FaBitcoin, FaEthereum, FaBars, FaTimes } from "react-icons/fa";
import { SiDogecoin, SiLitecoin } from "react-icons/si";
import { useLocation } from "wouter";
import { useState } from "react";
import logo71Digital from "@assets/71digital logo.png";

interface HeaderProps {
  currentSection: string;
  onNavigate: (section: string) => void;
}

export default function Header({ currentSection, onNavigate }: HeaderProps) {
  const [location, setLocation] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navItems = [
    { id: "home", label: "Home", path: "/" },
    { id: "about", label: "About us", path: "/about" },
    { id: "services", label: "Services", path: "/services" },
    { id: "store", label: "Mining Store", path: "/mining-store" },
    { id: "contact", label: "Contact", path: "/contact" },
  ];

  const handleNavigation = (item: any) => {
    setIsMobileMenuOpen(false); // Close mobile menu on navigation
    if (item.path) {
      setLocation(item.path);
      if (item.scrollTo) {
        setTimeout(() => {
          const element = document.getElementById(item.scrollTo);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    } else {
      onNavigate(item.id);
    }
  };

  return (
    <header className="w-full">
      {/* Crypto Icons Row */}
      <div className="py-2 md:py-3" style={{ backgroundColor: '#2D1810' }}>
        <div className="container mx-auto px-4 flex justify-center">
          <div className="flex justify-between items-center w-full max-w-xl">
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F7931A' }}>
              <FaBitcoin className="text-white text-xs md:text-sm" />
            </div>
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#BFBBBB' }}>
              <SiLitecoin className="text-white text-xs md:text-sm" />
            </div>
            <div className="w-6 h-6 md:w-8 md:h-8 bg-yellow-500 rounded-full flex items-center justify-center">
              <SiDogecoin className="text-white text-xs" />
            </div>
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#627EEA' }}>
              <FaEthereum className="text-white text-xs md:text-sm" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-orange-500 py-3 md:py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src={logo71Digital} 
                alt="71 Digital" 
                className="h-10 md:h-12 cursor-pointer"
                onClick={() => handleNavigation({ id: "home", label: "Home", path: "/" })}
              />
            </div>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex justify-center flex-1 space-x-12 text-black font-semibold text-lg ml-8">
              {navItems.map((item) => (
                <li key={item.id}>
                  <span
                    className={`cursor-pointer hover:text-white transition-colors font-semibold text-lg ${
                      currentSection === item.id ? "text-white" : "text-black"
                    }`}
                    onClick={() => handleNavigation(item)}
                  >
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              className="md:hidden text-black hover:text-white p-2 focus:outline-none focus:ring-0 focus:bg-transparent active:bg-transparent"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </Button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-2">
              <ul className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <span
                      className={`cursor-pointer hover:text-white transition-colors p-2 font-semibold text-lg block ${
                        currentSection === item.id ? "text-white" : "text-black"
                      }`}
                      onClick={() => handleNavigation(item)}
                    >
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
