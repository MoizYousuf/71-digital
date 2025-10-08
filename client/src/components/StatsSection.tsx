import { FaBitcoin } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  targetValue: string;
  duration?: number;
}

function AnimatedCounter({ targetValue, duration = 2000 }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState("0");
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateValue();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateValue = () => {
    // Handle different types of values
    if (targetValue === "Track") {
      // Animate "Track" by showing it after a delay
      setTimeout(() => setDisplayValue("Track"), duration / 2);
      return;
    }

    if (targetValue === "UAE" || targetValue === "Institutional") {
      // For text values, show them after animation delay
      setTimeout(() => setDisplayValue(targetValue), duration / 2);
      return;
    }

    // For percentage values like "95%"
    if (targetValue.includes("%")) {
      const numericValue = parseInt(targetValue.replace("%", ""));
      let current = 0;
      const increment = numericValue / (duration / 16);
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setDisplayValue(`${numericValue}%`);
          clearInterval(timer);
        } else {
          setDisplayValue(`${Math.floor(current)}%`);
        }
      }, 16);
      return;
    }

    // For MW values like "25 MW"
    if (targetValue.includes("MW")) {
      const numericValue = parseInt(targetValue.replace(" MW", ""));
      let current = 0;
      const increment = numericValue / (duration / 16);
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setDisplayValue(`${numericValue} MW`);
          clearInterval(timer);
        } else {
          setDisplayValue(`${Math.floor(current)} MW`);
        }
      }, 16);
      return;
    }

    // Default case
    setDisplayValue(targetValue);
  };

  return (
    <div ref={elementRef} className="text-xl font-bold text-white">
      {displayValue}
    </div>
  );
}

export default function StatsSection() {
  const stats = [
    { value: "97%", label: "Uptime" },
    { value: "Track", label: "Record" },
    { value: "50 MW", label: "Operating" },
    { value: "UAE", label: "Licensed" },
    { value: "Institutional", label: "Clients" },
  ];

  return (
    <section className="py-6 md:py-8 px-4" id="stats">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 lg:gap-16 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center space-y-2 md:space-y-3">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center">
                  <FaBitcoin className="text-black text-sm md:text-lg" />
                </div>
                <div className="space-y-1">
                  <div className="text-lg md:text-xl font-bold text-white">
                    <AnimatedCounter targetValue={stat.value} />
                  </div>
                  <div className="text-gray-300 text-xs md:text-sm">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
