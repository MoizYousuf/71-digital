import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import logo71NoText from "@assets/71digital logo - no text.png";

export default function Contact() {
  const [currentSection, setCurrentSection] = useState("contact");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    message: ""
  });

  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const submissionData = {
        fullName: data.name,
        email: data.email,
        companyName: data.company,
        phoneNumber: data.phone,
        service: data.service,
        message: data.message
      };
      
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
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
        name: "",
        email: "",
        company: "",
        phone: "",
        service: "",
        message: ""
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

  const handleNavigate = (section: string) => {
    setCurrentSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      contactMutation.mutate(formData);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['contact'];
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

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact 71 Digital - Bitcoin Mining Services UAE",
    "description": "Contact 71 Digital for Bitcoin mining services in UAE. Get quotes for ASIC hosting, site acquisition, and mining infrastructure solutions.",
    "url": "https://71digital.io/contact",
    "mainEntity": {
      "@type": "Organization",
      "name": "71 Digital Inc",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+971-XX-XXX-XXXX",
        "contactType": "customer service",
        "areaServed": "AE"
      }
    }
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Contact 71 Digital - Bitcoin Mining Services UAE | Get Quote"
        description="Contact 71 Digital for professional Bitcoin mining services in UAE. Get quotes for ASIC hosting, mining infrastructure, site acquisition, and turnkey solutions. Abu Dhabi and Al Ain operations."
        keywords="contact 71 digital, bitcoin mining quote UAE, ASIC hosting contact, mining services inquiry, cryptocurrency mining UAE contact, Abu Dhabi mining contact"
        canonical="https://71digital.io/contact"
        schema={contactSchema}
      />
      <Header currentSection={currentSection} onNavigate={handleNavigate} />
      <main>
        {/* Hero Section */}
        <section className="py-16 px-4" id="contact">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center mb-8">
              <img 
                src={logo71NoText} 
                alt="71 Digital Logo" 
                className="w-12 h-12 mr-4"
              />
              <h1 className="text-4xl font-bold text-orange-500">Contact Us</h1>
            </div>
            
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-white mb-6">Get in Touch with Our Mining Experts</h2>
              <p className="text-white text-lg leading-relaxed max-w-4xl">
                Ready to scale your mining operation? Our team of specialists is here to help you 
                choose the right solutions, from site acquisition to hardware deployment. 
                Let's discuss your mining infrastructure needs.
              </p>
            </div>

            {/* Contact Information and Form */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-orange-500 mb-6">Contact Information</h3>
                  
                  <div className="space-y-6">
                    {/* Office Locations */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-orange-500/30">
                      <div className="flex items-center mb-4">
                        <MapPin className="w-6 h-6 text-orange-500 mr-3" />
                        <h4 className="text-lg font-bold text-white">Headquarters</h4>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-white font-medium">71 Digital Inc.</p>
                          <p className="text-gray-300 text-sm">Opus Tower, 6th floor, Business Bay</p>
                          <p className="text-gray-300 text-sm">Dubai, United Arab Emirates</p>
                        </div>
                      </div>
                    </div>

                    {/* Phone Numbers */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-orange-500/30">
                      <div className="flex items-center mb-4">
                        <Phone className="w-6 h-6 text-orange-500 mr-3" />
                        <h4 className="text-lg font-bold text-white">Phone Number</h4>
                      </div>
                      <div className="space-y-2">
                        <p className="text-white"><span className="font-medium">Direct Line:</span> +971 50 357 8552</p>
                      </div>
                    </div>

                    {/* Email Addresses */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-orange-500/30">
                      <div className="flex items-center mb-4">
                        <Mail className="w-6 h-6 text-orange-500 mr-3" />
                        <h4 className="text-lg font-bold text-white">Email Address</h4>
                      </div>
                      <div className="space-y-2">
                        <p className="text-white"><span className="font-medium">General Inquiries:</span> info@71digital.io</p>
                      </div>
                    </div>

                    {/* Business Hours */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-orange-500/30">
                      <div className="flex items-center mb-4">
                        <Clock className="w-6 h-6 text-orange-500 mr-3" />
                        <h4 className="text-lg font-bold text-white">Business Hours</h4>
                      </div>
                      <div className="space-y-2">
                        <p className="text-white"><span className="font-medium">Monday - Friday:</span> 9:00 AM - 6:00 PM GST</p>
                        <p className="text-white"><span className="font-medium">Saturday:</span> 10:00 AM - 4:00 PM GST</p>
                        <p className="text-white"><span className="font-medium">Sunday:</span> Closed</p>
                        <p className="text-gray-300 text-sm mt-3">24/7 support available for hosting clients</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h3 className="text-xl font-bold text-orange-500 mb-6">Send us a Message</h3>
                
                <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-orange-500/30">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="name" className="block text-white text-sm font-medium mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-orange-500"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-orange-500"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="company" className="block text-white text-sm font-medium mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-orange-500"
                        placeholder="Your company"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-white text-sm font-medium mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-orange-500"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="service" className="block text-white text-sm font-medium mb-2">
                      Service Interest
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:border-orange-500"
                    >
                      <option value="" className="bg-gray-800">Select a service</option>
                      <option value="hosting" className="bg-gray-800">Hosting Solutions</option>
                      <option value="site-acquisition" className="bg-gray-800">Site Acquisition & Power Deals</option>
                      <option value="hardware" className="bg-gray-800">Hardware Procurement</option>
                      <option value="operations" className="bg-gray-800">Mining Operations & Site Management</option>
                      <option value="consultation" className="bg-gray-800">General Consultation</option>
                      <option value="other" className="bg-gray-800">Other</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="message" className="block text-white text-sm font-medium mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-orange-500 resize-vertical"
                      placeholder="Tell us about your mining infrastructure needs..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={contactMutation.isPending}
                    className="w-full flex items-center justify-center bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    {contactMutation.isPending ? "Sending..." : "Send Message"}
                  </button>

                  <p className="text-gray-300 text-xs mt-3 text-center">
                    We typically respond within 24 hours during business days.
                  </p>
                </form>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              <div className="text-center bg-white/5 rounded-lg p-6 border border-orange-500/20">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Schedule a Call</h4>
                <p className="text-gray-300 text-sm mb-4">Book a consultation with our mining specialists</p>
                <button 
                  className="text-orange-500 font-medium hover:text-orange-400 transition-colors"
                  onClick={() => window.open('/book-appointment', '_self')}
                >
                  Book Now
                </button>
              </div>



              <div className="text-center bg-white/5 rounded-lg p-6 border border-orange-500/20">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Email Support</h4>
                <p className="text-gray-300 text-sm mb-4">Send detailed inquiries to our team</p>
                <button 
                  className="text-orange-500 font-medium hover:text-orange-400 transition-colors"
                  onClick={() => window.open('mailto:info@71digital.io?subject=Mining Services Inquiry&body=Hello 71 Digital team,%0D%0A%0D%0AI am interested in learning more about your mining services.%0D%0A%0D%0APlease contact me to discuss my requirements.%0D%0A%0D%0AThank you.')}
                >
                  Send Email
                </button>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-lg p-8 border border-orange-500/30">
              <div className="flex items-center justify-center mb-4">
                <img 
                  src={logo71NoText} 
                  alt="71 Digital Logo" 
                  className="w-8 h-8 mr-3"
                />
                <h3 className="text-xl font-bold text-orange-500">Ready to Start Your Mining Journey?</h3>
              </div>
              
              <p className="text-white text-lg mb-6">
                Join hundreds of successful mining operations powered by 71 Digital infrastructure.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  className="flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  onClick={() => window.open('tel:+1-800-71-DIGITAL')}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Sales Team
                </button>
                <button 
                  className="flex items-center justify-center border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  onClick={() => window.open('/book-appointment', '_self')}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Request Quote
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}