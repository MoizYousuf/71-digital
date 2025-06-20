import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';

export default function PrivacyPolicy() {
  const privacyPolicySchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy - 71 Digital UAE",
    "description": "71 Digital privacy policy outlining data collection, usage, and protection practices for Bitcoin mining services in UAE.",
    "url": "https://71digital.io/privacy-policy"
  };

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: '#1A0F08' }}>
      <SEOHead
        title="Privacy Policy - 71 Digital UAE | Data Protection & Mining Services"
        description="71 Digital privacy policy outlining our data collection, usage, and protection practices for Bitcoin mining services in UAE. Learn how we protect your information."
        keywords="71 digital privacy policy, data protection UAE, mining services privacy, cryptocurrency privacy policy, Bitcoin mining data protection"
        canonical="https://71digital.io/privacy-policy"
        schema={privacyPolicySchema}
      />
      <Header currentSection="privacy" onNavigate={() => {}} />
      
      <main className="pt-20">
        <section className="py-16">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-orange-500 mb-4">
                Privacy Policy
              </h1>
              <p className="text-xl text-gray-300">
                Effective Date: January 1, 2025
              </p>
            </div>

            <div className="space-y-8 text-gray-300 leading-relaxed">
              <section>
                <h2 className="text-2xl font-bold text-orange-500 mb-4">1. Information We Collect</h2>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white">1.1 Personal Information</h3>
                  <p>We may collect the following personal information:</p>
                  <ul className="list-disc ml-6 mt-3 space-y-2">
                    <li>Name and contact information (email, phone number, address)</li>
                    <li>Company information and business details</li>
                    <li>Financial information for service agreements</li>
                    <li>Communication records and correspondence</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold text-white">1.2 Technical Information</h3>
                  <p>We automatically collect certain technical information when you use our services:</p>
                  <ul className="list-disc ml-6 mt-3 space-y-2">
                    <li>IP address and device information</li>
                    <li>Browser type and operating system</li>
                    <li>Usage data and website analytics</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-orange-500 mb-4">2. How We Use Your Information</h2>
                <p>We use the collected information for the following purposes:</p>
                <ul className="list-disc ml-6 mt-3 space-y-2">
                  <li>Providing and maintaining our mining services</li>
                  <li>Processing transactions and managing accounts</li>
                  <li>Communicating with you about services and updates</li>
                  <li>Improving our services and customer experience</li>
                  <li>Complying with legal obligations and regulations</li>
                  <li>Protecting against fraud and security threats</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-orange-500 mb-4">3. Information Sharing</h2>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white">3.1 Third-Party Service Providers</h3>
                  <p>
                    We may share your information with trusted third-party service providers who assist us in 
                    operating our business, such as payment processors, hosting providers, and technical support services.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-white">3.2 Legal Requirements</h3>
                  <p>
                    We may disclose your information when required by law, court order, or government regulation, 
                    or when we believe disclosure is necessary to protect our rights or comply with legal processes.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-white">3.3 Business Transfers</h3>
                  <p>
                    In the event of a merger, acquisition, or sale of assets, your information may be transferred 
                    to the acquiring entity as part of the business transaction.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-orange-500 mb-4">4. Data Security</h2>
                <p>
                  We implement appropriate technical and organizational security measures to protect your personal 
                  information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                </p>
                <ul className="list-disc ml-6 mt-3 space-y-2">
                  <li>Encryption of sensitive data in transit and at rest</li>
                  <li>Regular security assessments and updates</li>
                  <li>Access controls and authentication protocols</li>
                  <li>Employee training on data protection practices</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-orange-500 mb-4">5. Data Retention</h2>
                <p>
                  We retain your personal information only for as long as necessary to fulfill the purposes outlined 
                  in this Privacy Policy, comply with legal obligations, resolve disputes, and enforce our agreements. 
                  The retention period may vary depending on the type of information and applicable legal requirements.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-orange-500 mb-4">6. Your Rights</h2>
                <p>Depending on your jurisdiction, you may have the following rights regarding your personal information:</p>
                <ul className="list-disc ml-6 mt-3 space-y-2">
                  <li><strong>Access:</strong> Request access to your personal information we hold</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                  <li><strong>Portability:</strong> Request transfer of your data to another service provider</li>
                  <li><strong>Objection:</strong> Object to certain processing activities</li>
                  <li><strong>Restriction:</strong> Request restriction of processing in certain circumstances</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-orange-500 mb-4">7. Cookies and Tracking</h2>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white">7.1 Cookie Usage</h3>
                  <p>
                    Our website uses cookies and similar technologies to enhance user experience, analyze website 
                    traffic, and provide personalized content. You can control cookie settings through your browser preferences.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-white">7.2 Analytics</h3>
                  <p>
                    We use web analytics services to understand how visitors interact with our website. 
                    This helps us improve our services and user experience.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-orange-500 mb-4">8. International Data Transfers</h2>
                <p>
                  Your information may be transferred to and processed in countries other than your country of residence. 
                  We ensure appropriate safeguards are in place to protect your information during international transfers, 
                  in accordance with applicable data protection laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-orange-500 mb-4">9. Children's Privacy</h2>
                <p>
                  Our services are not intended for individuals under the age of 18. We do not knowingly collect 
                  personal information from children. If we become aware that we have collected information from a 
                  child, we will take steps to delete such information promptly.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-orange-500 mb-4">10. Updates to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time to reflect changes in our practices or 
                  applicable laws. We will notify you of significant changes by posting the updated policy on 
                  our website and updating the effective date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-orange-500 mb-4">11. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy or wish to exercise your rights, 
                  please contact us:
                </p>
                <div className="bg-white/5 rounded-lg p-6 border border-orange-500/20 mt-4">
                  <p><strong>71 Digital Inc.</strong></p>
                  <p>Data Protection Officer</p>
                  <p>RAK Digital Assets Oasis</p>
                  <p>Post Box #30099, RAKBank Headquarters</p>
                  <p>United Arab Emirates</p>
                  <p className="mt-3">
                    <strong>Email:</strong> privacy@71digital.io<br />
                    <strong>General Contact:</strong> info@71digital.io<br />
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