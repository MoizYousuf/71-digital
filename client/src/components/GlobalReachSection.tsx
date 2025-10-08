import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { FaInstagram, FaLinkedin, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaChevronLeft, FaChevronRight, FaQuoteLeft } from "react-icons/fa";
import { MapPin, Send, Calendar, ChevronDown, MessageCircle } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import mapImage from "@assets/map.png";

export default function GlobalReachSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyName: "",
    phoneNumber: "",
    service: "",
    message: "",
  });

  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error("Failed to submit contact form");
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/contact'] });
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({
        fullName: "",
        email: "",
        companyName: "",
        phoneNumber: "",
        service: "",
        message: "",
      });
    },
    onError: (error) => {
      console.error('Contact form error:', error);
      toast({
        title: "Failed to send message",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.email && formData.message) {
      contactMutation.mutate(formData);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const testimonials = [
    {
      quote: "71 Digital helped us secure land, power, and set up 2.5MW in under 60 days — unheard of in this industry.",
      author: "Ahmed Al-Rashid",
      title: "Asset Manager",
      location: "Dubai",
      company: "Regional Investment Fund",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      companyLogo: "data:image/svg+xml,%3Csvg width='80' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='80' height='40' fill='%23f97316'/%3E%3Ctext x='40' y='25' font-family='Arial' font-size='12' fill='white' text-anchor='middle'%3ERIF%3C/text%3E%3C/svg%3E"
    },
    {
      quote: "Their expertise in ASIC deployment and cooling solutions reduced our operational costs by 30% while maintaining 95% uptime.",
      author: "Sarah Mitchell",
      title: "Operations Director",
      location: "Alberta",
      company: "Northern Mining Corp",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      companyLogo: "data:image/svg+xml,%3Csvg width='80' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='80' height='40' fill='%230066cc'/%3E%3Ctext x='40' y='25' font-family='Arial' font-size='12' fill='white' text-anchor='middle'%3ENMC%3C/text%3E%3C/svg%3E"
    },
    {
      quote: "From site acquisition to full-scale operations, 71 Digital delivered everything on time and under budget. Exceptional service.",
      author: "Marcus Rodriguez",
      title: "Chief Technology Officer",
      location: "Texas",
      company: "Bitcoin Mining Solutions",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      companyLogo: "data:image/svg+xml,%3Csvg width='80' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='80' height='40' fill='%2328a745'/%3E%3Ctext x='40' y='25' font-family='Arial' font-size='12' fill='white' text-anchor='middle'%3EBMS%3C/text%3E%3C/svg%3E"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 px-4" id="global-reach">
      <div className="container mx-auto max-w-6xl">
        {/* Global Reach */}
        <div className="mb-12 md:mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Map Image */}
            <div className="order-2 md:order-1">
              <img 
                src={mapImage} 
                alt="Global mining locations map"
                className="w-full h-auto rounded-lg"
              />
            </div>
            
            {/* Content */}
            <div className="order-1 md:order-2">
              <h2 className="text-2xl md:text-3xl font-bold text-orange-500 mb-4">
                Global Reach
              </h2>
              <p className="text-base md:text-lg text-white mb-6">
                Operating in Power-Rich Locations
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div className="flex items-center space-x-3">
                  <FaMapMarkerAlt className="text-red-500 text-sm" />
                  <span className="text-white text-sm md:text-base">UAE</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaMapMarkerAlt className="text-red-500 text-sm" />
                  <span className="text-white text-sm md:text-base">Canada (Alberta)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaMapMarkerAlt className="text-red-500 text-sm" />
                  <span className="text-white text-sm md:text-base">USA</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaMapMarkerAlt className="text-red-500 text-sm" />
                  <span className="text-white text-sm md:text-base">Oman</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaMapMarkerAlt className="text-red-500 text-sm" />
                  <span className="text-white text-sm md:text-base">Ethiopia</span>
                </div>
              </div>
              
              <p className="text-white mb-6 text-sm md:text-base">
                50MW live. 200MW in expansion.
              </p>
              
              <Button 
                className="text-sm md:text-base bg-orange-500 hover:bg-orange-600 text-white transition-colors flex items-center"
                onClick={() => window.open('/deployment-sites', '_self')}
              >
                <MapPin className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                View Deployment Sites
              </Button>
            </div>
          </div>
        </div>
        
        {/* Case Studies Carousel */}
        <div className="mb-12 md:mb-16">
          <h3 className="text-xl md:text-2xl font-bold text-orange-500 mb-6 md:mb-8 text-center">
            Client Success Stories
          </h3>
          
          <div className="relative max-w-4xl mx-auto px-4">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-4 md:p-8 rounded-lg border border-gray-700">
              <div className="flex flex-col md:flex-row md:items-start mb-4 md:mb-6">
                <FaQuoteLeft className="text-orange-500 text-xl md:text-2xl mb-3 md:mr-4 md:mt-2 md:mb-0" />
                <p className="text-white text-sm md:text-lg leading-relaxed">
                  {testimonials[currentTestimonial].quote}
                </p>
              </div>
              
              <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <img 
                    src={testimonials[currentTestimonial].avatar}
                    alt={testimonials[currentTestimonial].author}
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-orange-500"
                  />
                  <div className="flex-1">
                    <p className="text-orange-500 font-semibold text-sm md:text-base">
                      {testimonials[currentTestimonial].author}
                    </p>
                    <p className="text-white text-xs md:text-sm">
                      {testimonials[currentTestimonial].title}
                    </p>
                    <p className="text-gray-300 text-xs md:text-sm">
                      {testimonials[currentTestimonial].location}
                    </p>
                  </div>
                  <img 
                    src={testimonials[currentTestimonial].companyLogo}
                    alt={testimonials[currentTestimonial].company}
                    className="w-16 h-8 md:w-20 md:h-10 object-contain rounded"
                  />
                </div>
                
                <div className="flex justify-center md:justify-end space-x-2">
                  <button
                    onClick={prevTestimonial}
                    className="bg-gray-700 hover:bg-orange-500 p-2 rounded-full transition-colors"
                  >
                    <FaChevronLeft className="text-white text-sm" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="bg-gray-700 hover:bg-orange-500 p-2 rounded-full transition-colors"
                  >
                    <FaChevronRight className="text-white text-sm" />
                  </button>
                </div>
              </div>
              
              {/* Dots indicator */}
              <div className="flex justify-center mt-4 md:mt-6 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors ${
                      index === currentTestimonial ? 'bg-orange-500' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Seen on WAYOND */}
        <div className="text-center mb-16">
          <h3 className="text-2xl font-bold text-orange-500 mb-8">
            Seen on
          </h3>
          <div className="text-6xl font-bold text-white mb-8">
            WAYOND
          </div>
          
          {/* YouTube Video Embed */}
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
              <iframe
                src="https://www.youtube.com/embed/hQQvYatDakU"
                title="71 Digital on WAYOND"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="text-center mb-16">
          <h3 className="text-2xl font-bold text-orange-500 mb-6">Ready to Scale Your Mining Operation?</h3>
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
            Speak with our team to secure capacity, design your site, or co-mine with the most reliable hosting provider in the region.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-orange-500 hover:bg-orange-600 text-white transition-colors flex items-center"
              onClick={() => window.open('/book-appointment', '_self')}
            >
              <FaEnvelope className="w-4 h-4 mr-2" />
              Book a Consultation
            </Button>
            <Button 
              variant="outline" 
              className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors flex items-center"
              onClick={() => window.open('https://wa.me/971503578552', '_blank')}
            >
              <FaWhatsapp className="w-4 h-4 mr-2" />
              WhatsApp Business
            </Button>
          </div>
        </div>
        
        {/* Contact Section */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Contact Info */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 md:p-8 rounded-lg border border-gray-700">
            <h3 className="text-2xl md:text-3xl font-bold text-orange-500 mb-4">
              Contact Us
            </h3>
            <p className="text-white text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
              Let's Build the Future of Mining — Together
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="bg-orange-500 p-2 rounded-full">
                  <FaMapMarkerAlt className="text-white text-sm" />
                </div>
                <div>
                  <p className="text-white font-medium">Office Location</p>
                  <p className="text-gray-300 text-sm">Opus Tower, 6th floor, Business Bay</p>
                  <p className="text-gray-300 text-sm">Dubai, United Arab Emirates</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="bg-orange-500 p-2 rounded-full">
                  <FaEnvelope className="text-white text-sm" />
                </div>
                <div>
                  <p className="text-white font-medium">Email</p>
                  <span className="text-gray-300">info@71digital.io</span>
                </div>
              </div>
            </div>
            
            <div>
              <p className="text-white font-medium mb-4">Follow Us</p>
              <div className="flex space-x-4">
                <div 
                  className="bg-gray-700 hover:bg-orange-500 p-3 rounded-full transition-colors cursor-pointer"
                  onClick={() => window.open('https://www.instagram.com/71digital_inc/', '_blank')}
                >
                  <FaInstagram className="text-white text-lg" />
                </div>
                <div 
                  className="bg-gray-700 hover:bg-orange-500 p-3 rounded-full transition-colors cursor-pointer"
                  onClick={() => window.open('https://www.linkedin.com/company/71-digital-inc/', '_blank')}
                >
                  <FaLinkedin className="text-white text-lg" />
                </div>
                <div 
                  className="bg-gray-700 hover:bg-orange-500 p-3 rounded-full transition-colors cursor-pointer"
                  onClick={() => window.open('https://wa.me/971503578552', '_blank')}
                >
                  <FaWhatsapp className="text-white text-lg" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div>
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-2xl">
              <h4 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
                Send us a message
              </h4>
              
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Full Name" 
                    className="w-full h-10 md:h-12 border-2 border-gray-200 focus:border-orange-500 rounded-lg text-sm md:text-base text-gray-900 bg-white placeholder:text-gray-500"
                    required
                  />
                  <Input 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address" 
                    type="email"
                    className="w-full h-10 md:h-12 border-2 border-gray-200 focus:border-orange-500 rounded-lg text-sm md:text-base text-gray-900 bg-white placeholder:text-gray-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input 
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Company Name" 
                    className="w-full h-10 md:h-12 border-2 border-gray-200 focus:border-orange-500 rounded-lg text-sm md:text-base text-gray-900 bg-white placeholder:text-gray-500"
                  />
                  <Input 
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Phone Number" 
                    className="w-full h-10 md:h-12 border-2 border-gray-200 focus:border-orange-500 rounded-lg text-sm md:text-base text-gray-900 bg-white placeholder:text-gray-500"
                  />
                </div>
                <div>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full h-10 md:h-12 border-2 border-gray-200 focus:border-orange-500 rounded-lg px-3 bg-white text-gray-900 text-sm md:text-base"
                  >
                    <option value="">Select a service</option>
                    <option value="hosting">Hosting Solutions</option>
                    <option value="site-acquisition">Site Acquisition & Power Deals</option>
                    <option value="hardware">Hardware Procurement</option>
                    <option value="operations">Mining Operations & Site Management</option>
                    <option value="consultation">General Consultation</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <Textarea 
                    name="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLTextAreaElement>)}
                    placeholder="Tell us about your mining infrastructure needs..."
                    className="w-full h-24 md:h-32 border-2 border-gray-200 focus:border-orange-500 rounded-lg resize-none text-sm md:text-base text-gray-900 bg-white placeholder:text-gray-500"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-10 md:h-12 font-semibold text-sm md:text-base bg-orange-500 hover:bg-orange-600 text-white transition-colors flex items-center justify-center"
                  disabled={contactMutation.isPending}
                >
                  {contactMutation.isPending ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}