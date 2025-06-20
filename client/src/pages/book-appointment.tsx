import { useState, useCallback, memo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, User, Building2, Phone, Mail, MessageCircle, CheckCircle } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import logo71NoText from "@assets/71digital logo - no text.png";

// Move arrays outside component to prevent re-creation on each render
const SERVICE_OPTIONS = [
  {
    value: "hosting-consultation",
    label: "Hosting Solutions Consultation",
    description: "Discuss your mining hosting requirements and available capacity",
    duration: "45-60 minutes"
  },
  {
    value: "site-acquisition",
    label: "Site Acquisition & Power Deals",
    description: "Explore opportunities for new mining site development",
    duration: "60-90 minutes"
  },
  {
    value: "hardware-procurement",
    label: "Hardware Procurement",
    description: "Get pricing and availability for ASIC miners and equipment",
    duration: "30-45 minutes"
  },
  {
    value: "operations-management",
    label: "Mining Operations & Site Management",
    description: "Discuss 24/7 operations, maintenance, and monitoring services",
    duration: "45-60 minutes"
  },
  {
    value: "technical-consultation",
    label: "Technical Consultation",
    description: "Get expert advice on mining infrastructure and optimization",
    duration: "30-45 minutes"
  },
  {
    value: "partnership-discussion",
    label: "Partnership & Joint Venture Discussion",
    description: "Explore strategic partnerships and investment opportunities",
    duration: "60-90 minutes"
  }
] as const;

const TIME_SLOTS = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM"
] as const;

// Memoized Service Option Component
const ServiceOption = memo(({ 
  service, 
  isSelected, 
  onSelect 
}: { 
  service: typeof SERVICE_OPTIONS[0], 
  isSelected: boolean, 
  onSelect: (value: string) => void 
}) => (
  <div
    className={`p-4 md:p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
      isSelected
        ? 'border-orange-500 bg-orange-500/10'
        : 'border-white/20 bg-white/5 hover:border-orange-500/50'
    }`}
    onClick={() => onSelect(service.value)}
  >
    <div className="flex items-start space-x-3">
      <div className="text-orange-500 mt-1">
        <Building2 className="w-6 h-6" />
      </div>
      <div className="flex-1">
        <h3 className="text-white font-semibold text-sm md:text-base mb-2">
          {service.label}
        </h3>
        <p className="text-gray-300 text-xs md:text-sm mb-2">
          {service.description}
        </p>
        <div className="flex items-center text-orange-400 text-xs">
          <Clock className="w-3 h-3 mr-1" />
          {service.duration}
        </div>
      </div>
      {isSelected && (
        <CheckCircle className="w-5 h-5 text-orange-500" />
      )}
    </div>
  </div>
));

interface AppointmentFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  serviceType: string;
  preferredDate: string;
  preferredTime: string;
  timezone: string;
  message: string;
}

export default function BookAppointment() {
  const [currentSection, setCurrentSection] = useState("appointment");
  const [formData, setFormData] = useState<AppointmentFormData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    serviceType: "",
    preferredDate: "",
    preferredTime: "",
    timezone: "UTC+4 (UAE Time)",
    message: ""
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const appointmentMutation = useMutation({
    mutationFn: async (data: AppointmentFormData) => {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: data.fullName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          companyName: data.companyName,
          serviceType: data.serviceType,
          preferredDate: data.preferredDate,
          preferredTime: data.preferredTime,
          timezone: data.timezone,
          message: data.message
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit appointment request');
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Appointment Request Submitted",
        description: "We'll contact you within 24 hours to confirm your appointment.",
      });
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        companyName: "",
        serviceType: "",
        preferredDate: "",
        preferredTime: "",
        timezone: "UTC+4 (UAE Time)",
        message: ""
      });
      queryClient.invalidateQueries({ queryKey: ["/api/appointments"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit appointment request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleNavigate = useCallback((section: string) => {
    setCurrentSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.serviceType || !formData.preferredDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    appointmentMutation.mutate(formData);
  }, [formData, toast, appointmentMutation]);

  const handleServiceSelect = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, serviceType: value }));
  }, []);

  // Removed scroll listener for better performance

  const appointmentSchema = {
    "@context": "https://schema.org",
    "@type": "ReservationService",
    "name": "Book Mining Consultation - 71 Digital UAE",
    "description": "Book a consultation appointment with 71 Digital Bitcoin mining experts. Get personalized advice on hosting solutions, site acquisition, and mining operations.",
    "url": "https://71digital.io/book-appointment",
    "provider": {
      "@type": "Organization",
      "name": "71 Digital Inc"
    },
    "serviceType": "Bitcoin Mining Consultation"
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1A0F08' }}>
      <SEOHead
        title="Book Mining Consultation - Bitcoin Mining Experts | 71 Digital UAE"
        description="Book a consultation with 71 Digital Bitcoin mining experts in UAE. Get personalized advice on ASIC hosting, site acquisition, mining operations, and turnkey solutions. Free consultation available."
        keywords="book mining consultation UAE, bitcoin mining advice, mining expert consultation, cryptocurrency mining consultation, mining consultation UAE, bitcoin mining appointment"
        canonical="https://71digital.io/book-appointment"
        schema={appointmentSchema}
      />
      <Header currentSection={currentSection} onNavigate={handleNavigate} />
      <main>
        {/* Hero Section */}
        <section className="py-12 md:py-16 px-4" id="appointment">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-8 md:mb-12">
              <div className="flex items-center justify-center mb-6">
                <img 
                  src={logo71NoText} 
                  alt="71 Digital Logo" 
                  className="w-12 h-12 mr-4"
                />
                <h1 className="text-3xl md:text-4xl font-bold text-orange-500">Book an Appointment</h1>
              </div>
              <p className="text-white text-lg md:text-xl max-w-2xl mx-auto">
                Schedule a consultation with our mining experts to discuss your specific requirements and explore our solutions.
              </p>
            </div>

            {/* Service Selection */}
            <div className="mb-8 md:mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">Choose Your Service</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {SERVICE_OPTIONS.map((service) => (
                  <ServiceOption
                    key={service.value}
                    service={service}
                    isSelected={formData.serviceType === service.value}
                    onSelect={handleServiceSelect}
                  />
                ))}
              </div>
            </div>

            {/* Appointment Form */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 md:p-8 border border-orange-500/30">
              <h3 className="text-xl md:text-2xl font-bold text-orange-500 mb-6">Appointment Details</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <Input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full h-12 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-orange-500"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full h-12 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-orange-500"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    <Input
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full h-12 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-orange-500"
                      placeholder="+971 XX XXX XXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Company Name
                    </label>
                    <Input
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="w-full h-12 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-orange-500"
                      placeholder="Your company"
                    />
                  </div>
                </div>

                {/* Date and Time Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Preferred Date *
                    </label>
                    <Input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full h-12 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Preferred Time
                    </label>
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleInputChange}
                      className="w-full h-12 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:border-orange-500"
                    >
                      <option value="">Select time</option>
                      {TIME_SLOTS.map((time) => (
                        <option key={time} value={time} className="bg-gray-800">
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Timezone
                  </label>
                  <select
                    name="timezone"
                    value={formData.timezone}
                    onChange={handleInputChange}
                    className="w-full h-12 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:border-orange-500"
                  >
                    <option value="UTC+4 (UAE Time)" className="bg-gray-800">UTC+4 (UAE Time)</option>
                    <option value="UTC+0 (GMT)" className="bg-gray-800">UTC+0 (GMT)</option>
                    <option value="UTC+1 (CET)" className="bg-gray-800">UTC+1 (CET)</option>
                    <option value="UTC+8 (CST)" className="bg-gray-800">UTC+8 (CST)</option>
                    <option value="UTC-5 (EST)" className="bg-gray-800">UTC-5 (EST)</option>
                    <option value="UTC-8 (PST)" className="bg-gray-800">UTC-8 (PST)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Additional Information
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your specific requirements, current operations, or any questions you'd like to discuss..."
                    className="w-full h-24 bg-white/20 border border-white/30 rounded-lg resize-none text-white placeholder-gray-300 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors flex items-center justify-center"
                  disabled={appointmentMutation.isPending}
                >
                  {appointmentMutation.isPending ? (
                    "Submitting Request..."
                  ) : (
                    <>
                      <Calendar className="w-5 h-5 mr-2" />
                      Schedule Appointment
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="mt-8 md:mt-12 text-center">
              <h3 className="text-xl font-bold text-white mb-4">Need immediate assistance?</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  className="bg-orange-500 hover:bg-orange-600 text-white transition-colors"
                  onClick={() => window.open('tel:+971503578552', '_self')}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now: +971 50 357 8552
                </Button>
                <Button
                  variant="outline"
                  className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors"
                  onClick={() => window.open('https://wa.me/971503578552', '_blank')}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp Business
                </Button>
              </div>
              <p className="text-gray-300 text-sm mt-4">
                Or email us directly at{" "}
                <a href="mailto:info@71digital.io" className="text-orange-500 hover:underline">
                  info@71digital.io
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}