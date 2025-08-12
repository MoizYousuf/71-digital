import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export default function PricingSection() {
  const plans = [
    {
      name: "Cloud Hosting",
      hashratePrice: "One-time cost equal to physical miner hardware",
      setupFee: "$500 Setup Fee",
      rate: "$0.067 per kWh",
      cooling: "Air Cooling & Hydro",
      location: "UAE",
      model: "Bitmain & Whatsminer",
      terms: "Monthly hosting based on actual electricity use",
      maintenance: "Included",
      repairOnSite: "Available",
      deposit: "One Month Advance",
      moq: "Individual miners accepted",
      bgColor: "bg-orange-500",
      textColor: "text-black",
      buttonColor: "bg-orange-600"
    },
    {
      name: "Turnkey Solutions",
      rate: "$0.03 per kW",
      cooling: "Air Cooling & Hydro",
      location: "UAE, Canada, USA, Oman",
      model: "Bitmain & Whatsminer",
      terms: "2 year and renewable",
      maintenance: "Included",
      repairOnSite: "Available",
      deposit: "2 months",
      moq: "$3000",
      bgColor: "bg-amber-700",
      textColor: "text-white",
      buttonColor: "bg-amber-800"
    }
  ];

  return (
    <section className="py-16 px-4" id="pricing">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`${plan.bgColor} ${plan.textColor} border-none rounded-2xl shadow-xl`}>
              <CardContent className="p-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-center">{plan.name}</h3>
                  
                  <div className="space-y-3 text-sm">
                    {plan.hashratePrice && (
                      <div className="flex justify-between">
                        <span className="font-medium">Hashrate Purchase:</span>
                        <span className="text-right">{plan.hashratePrice}</span>
                      </div>
                    )}
                    {plan.setupFee && (
                      <div className="flex justify-between">
                        <span className="font-medium">Setup Fee:</span>
                        <span>{plan.setupFee}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="font-medium">Rate:</span>
                      <span>{plan.rate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Cooling:</span>
                      <span>{plan.cooling}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Location:</span>
                      <span>{plan.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Model:</span>
                      <span>{plan.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Terms:</span>
                      <span className="text-right">{plan.terms}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Maintenance:</span>
                      <span>{plan.maintenance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Repair On-Site:</span>
                      <span>{plan.repairOnSite}</span>
                    </div>
                    {plan.deposit && (
                      <div className="flex justify-between">
                        <span className="font-medium">Deposit:</span>
                        <span>{plan.deposit}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="font-medium">MOQ:</span>
                      <span>{plan.moq}</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-white hover:bg-gray-100 text-gray-900 font-bold py-3 rounded-full mt-6 transition-colors flex items-center justify-center border-2 border-white shadow-lg"
                    onClick={() => window.open('/book-appointment', '_self')}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    BOOK NOW
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}