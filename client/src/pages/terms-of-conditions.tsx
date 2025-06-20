import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';

export default function TermsOfConditions() {
  const termsSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Terms and Conditions - 71 Digital UAE",
    "description": "71 Digital terms and conditions for Bitcoin mining services in UAE. Legal terms governing hosting solutions, site acquisition, and mining operations.",
    "url": "https://71digital.io/terms-of-conditions"
  };

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: '#1A0F08' }}>
      <SEOHead
        title="Terms and Conditions - 71 Digital UAE | Mining Services Legal Terms"
        description="71 Digital terms and conditions for Bitcoin mining services in UAE. Legal terms governing ASIC hosting, site acquisition, mining operations, and service agreements."
        keywords="71 digital terms conditions, mining services terms, Bitcoin mining legal terms, cryptocurrency hosting terms, UAE mining terms"
        canonical="https://71digital.io/terms-of-conditions"
        schema={termsSchema}
      />
      <Header currentSection="terms" onNavigate={() => {}} />
      
      <main className="pt-20">
        <section className="py-16">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-orange-500 mb-4">
                Terms of Conditions
              </h1>
              <p className="text-xl text-gray-300">
                Effective Date: January 1, 2025
              </p>
            </div>

            <div className="space-y-8 text-gray-300 leading-relaxed">
              <section>
                <h2 className="text-2xl font-bold text-orange-500 mb-4">1. Agreement to Terms</h2>
                <p>
                  By accessing and using the services provided by 71 Digital Inc. ("Company," "we," "us," or "our"), 
                  you agree to be bound by these Terms of Conditions. If you do not agree to these terms, 
                  please do not use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-orange-500 mb-4">2. Description of Services</h2>
                <p>
                  71 Digital provides institutional-grade Bitcoin mining services, including but not limited to:
                </p>
                <ul className="list-disc ml-6 mt-3 space-y-2">
                  <li>Mining hardware procurement and deployment</li>
                  <li>Mining facility management and operations</li>
                  <li>Technical support and maintenance services</li>
                  <li>Mining equipment sales and consultation</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-orange-500 mb-4">3. Eligibility</h2>
                <p>
                  Our services are intended for institutional clients, businesses, and qualified individuals. 
                  You must be at least 18 years old and have the legal capacity to enter into contracts. 
                  By using our services, you represent and warrant that you meet these eligibility requirements.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-orange-500 mb-4">4. Service Terms</h2>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white">4.1 Mining Services</h3>
                  <p>
                    Mining services are provided subject to separate service agreements. Performance may vary 
                    based on network difficulty, market conditions, and equipment performance.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-white">4.2 Equipment Sales</h3>
                  <p>
                    All equipment sales are final unless otherwise specified. Warranties are provided by 
                    manufacturers and are subject to their terms and conditions.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-orange-500 mb-4">5. Payment Terms</h2>
                <p>
                  Payment terms are specified in individual service agreements. All fees are non-refundable 
                  unless otherwise stated. Late payments may incur additional charges and service suspension.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-orange-500 mb-4">6. Limitation of Liability</h2>
                <p>
                  To the maximum extent permitted by law, 71 Digital shall not be liable for any indirect, 
                  incidental, special, consequential, or punitive damages, including but not limited to loss 
                  of profits, data, or business opportunities.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-orange-500 mb-4">7. Governing Law</h2>
                <p>
                  These terms are governed by the laws of the United Arab Emirates. Any disputes shall be 
                  resolved through arbitration in accordance with UAE arbitration rules.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-orange-500 mb-4">8. Contact Information</h2>
                <div className="bg-white/5 rounded-lg p-6 border border-orange-500/20">
                  <p><strong>71 Digital Inc.</strong></p>
                  <p>RAK Digital Assets Oasis</p>
                  <p>Post Box #30099, RAKBank Headquarters</p>
                  <p>United Arab Emirates</p>
                  <p className="mt-3">
                    <strong>Email:</strong> info@71digital.io<br />
                    <strong>Phone:</strong> +971503578552
                  </p>
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}