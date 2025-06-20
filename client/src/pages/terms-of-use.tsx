import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';

export default function TermsOfUse() {
  const termsOfUseSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Terms of Use - 71 Digital UAE",
    "description": "71 Digital terms of use for website and Bitcoin mining services in UAE. Usage guidelines and legal requirements for accessing our services.",
    "url": "https://71digital.io/terms-of-use"
  };

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: '#1A0F08' }}>
      <SEOHead
        title="Terms of Use - 71 Digital UAE | Website Usage Guidelines"
        description="71 Digital terms of use for website and Bitcoin mining services in UAE. Usage guidelines, legal requirements, and terms for accessing our mining infrastructure services."
        keywords="71 digital terms of use, website terms UAE, mining services usage, Bitcoin mining terms, cryptocurrency terms of use"
        canonical="https://71digital.io/terms-of-use"
        schema={termsOfUseSchema}
      />
      <Header currentSection="terms" onNavigate={() => {}} />
      
      <main className="pt-20">
        <section className="py-16">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-orange-500 mb-4">
                Terms of Use
              </h1>
              <p className="text-xl text-gray-300">
                Effective Date: January 1, 2025
              </p>
            </div>

            <div className="space-y-8 text-gray-300 leading-relaxed">
              <section>
                <h2 className="text-2xl font-bold text-orange-500 mb-4">1. Acceptance of Terms</h2>
                <p>
                  Welcome to 71 Digital Inc. ("71 Digital," "we," "us," or "our"). These Terms of Use ("Terms") 
                  govern your access to and use of our website, services, and any related applications 
                  (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-orange-500 mb-4">2. Use of Services</h2>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white">2.1 Permitted Use</h3>
                  <p>
                    You may use our Services for lawful business purposes in accordance with these Terms. 
                    Our Services are designed for institutional and professional use in the cryptocurrency mining industry.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-white">2.2 Prohibited Use</h3>
                  <p>You agree not to:</p>
                  <ul className="list-disc ml-6 mt-3 space-y-2">
                    <li>Use the Services for any illegal or unauthorized purpose</li>
                    <li>Violate any applicable laws or regulations</li>
                    <li>Infringe upon the rights of others</li>
                    <li>Transmit any harmful or malicious code</li>
                    <li>Attempt to gain unauthorized access to our systems</li>
                    <li>Interfere with the proper functioning of the Services</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-orange-500 mb-4">3. User Accounts</h2>
                <p>
                  Some features of our Services may require you to create an account. You are responsible for:
                </p>
                <ul className="list-disc ml-6 mt-3 space-y-2">
                  <li>Maintaining the confidentiality of your account credentials</li>
                  <li>All activities that occur under your account</li>
                  <li>Providing accurate and complete information</li>
                  <li>Promptly updating your account information when necessary</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-orange-500 mb-4">4. Intellectual Property</h2>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white">4.1 Our Content</h3>
                  <p>
                    All content, features, and functionality of the Services, including but not limited to text, 
                    graphics, logos, icons, images, and software, are owned by 71 Digital or its licensors and 
                    are protected by copyright, trademark, and other intellectual property laws.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-white">4.2 Limited License</h3>
                  <p>
                    We grant you a limited, non-exclusive, non-transferable license to access and use the Services 
                    for your personal or business use, subject to these Terms.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-orange-500 mb-4">5. Privacy</h2>
                <p>
                  Your privacy is important to us. Please review our Privacy Policy, which explains how we 
                  collect, use, and protect your information when you use our Services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-orange-500 mb-4">6. Disclaimers</h2>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white">6.1 Service Availability</h3>
                  <p>
                    We strive to maintain continuous service availability but cannot guarantee uninterrupted access. 
                    Services may be temporarily unavailable due to maintenance, updates, or technical issues.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-white">6.2 Investment Risks</h3>
                  <p>
                    Cryptocurrency mining involves inherent risks including market volatility, regulatory changes, 
                    and technical challenges. Past performance does not guarantee future results.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-orange-500 mb-4">7. Limitation of Liability</h2>
                <p>
                  In no event shall 71 Digital be liable for any indirect, incidental, special, consequential, 
                  or punitive damages, including without limitation, loss of profits, data, use, goodwill, 
                  or other intangible losses.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-orange-500 mb-4">8. Indemnification</h2>
                <p>
                  You agree to defend, indemnify, and hold harmless 71 Digital and its officers, directors, 
                  employees, and agents from any claims, damages, obligations, losses, liabilities, costs, 
                  or debt arising from your use of the Services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-orange-500 mb-4">9. Modifications</h2>
                <p>
                  We reserve the right to modify these Terms at any time. We will notify users of significant 
                  changes by posting the updated Terms on our website. Your continued use of the Services 
                  constitutes acceptance of the modified Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-orange-500 mb-4">10. Contact Information</h2>
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