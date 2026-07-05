import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import {
  ArrowRight, Shield, Lock, Eye, UserCheck, FileText, Cookie, Mail
} from 'lucide-react';

/* ── JSON-LD Structured Data ── */
const legalSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Privacy Policy — Carrgo Freight Solutions Ltd',
  url: 'https://carrgo.co.uk/privacy',
  description: 'Carrgo Freight Solutions Ltd privacy policy. GDPR-compliant data protection policy for UK freight forwarding services.',
  publisher: {
    '@type': 'Organization',
    name: 'Carrgo Freight Solutions Ltd',
    url: 'https://carrgo.co.uk',
  },
};

/* ── Navigation sections ── */
const sections = [
  { id: 'who-we-are', label: 'Who We Are', icon: Shield },
  { id: 'what-we-collect', label: 'What Data We Collect', icon: Eye },
  { id: 'how-we-use', label: 'How We Use Your Data', icon: FileText },
  { id: 'how-we-share', label: 'How We Share Your Data', icon: UserCheck },
  { id: 'how-we-protect', label: 'How We Protect Your Data', icon: Lock },
  { id: 'your-rights', label: 'Your Rights', icon: UserCheck },
  { id: 'cookies', label: 'Cookies', icon: Cookie },
  { id: 'contact-us', label: 'Contact Us', icon: Mail },
];

export default function Privacy() {
  return (
    <>
      <Seo
        title="Privacy Policy | Carrgo Freight Solutions Ltd"
        description="Carrgo Freight Solutions Ltd privacy policy. Learn how we collect, use, and protect your personal data. GDPR-compliant data protection for UK freight forwarding."
        noindex={true}
        structuredData={legalSchema}
      />

      <main>
        {/* ====== HERO ====== */}
        <section aria-labelledby="privacy-hero-heading" className="bg-white border-b border-[#E5E7EB]">
          <div className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <span className="inline-block text-xs font-semibold tracking-widest text-[#1A6DFF] uppercase mb-4">Legal</span>
              <h1 id="privacy-hero-heading" className="text-4xl lg:text-5xl font-extrabold text-[#111827] leading-tight mb-4">
                Privacy Policy
              </h1>
              <p className="text-lg text-[#4B5563]">
                Last updated: January 2026. Carrgo Freight Solutions Ltd is committed to protecting your personal data in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
              </p>
            </div>
          </div>
        </section>

        {/* ====== POLICY CONTENT ====== */}
        <section className="bg-[#F8FAFC] py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Sidebar Navigation */}
              <nav aria-label="Privacy policy sections" className="hidden lg:block">
                <div className="sticky top-24 bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-5">
                  <h2 className="text-sm font-bold text-[#111827] uppercase tracking-wide mb-4">On This Page</h2>
                  <ul className="space-y-1">
                    {sections.map((s) => {
                      const Icon = s.icon;
                      return (
                        <li key={s.id}>
                          <a
                            href={`#${s.id}`}
                            className="flex items-center gap-2 text-sm text-[#4B5563] hover:text-[#1A6DFF] py-1.5 px-2 rounded-md hover:bg-[#EBF2FF] transition-colors"
                          >
                            <Icon className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                            {s.label}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </nav>

              {/* Main Content */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-8 lg:p-10">
                  {/* 1. Who We Are */}
                  <section id="who-we-are" className="mb-12 scroll-mt-24">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-[#EBF2FF] rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 text-[#1A6DFF]" aria-hidden="true" />
                      </div>
                      <h2 className="text-2xl font-bold text-[#111827]">1. Who We Are</h2>
                    </div>
                    <div className="text-[#4B5563] leading-relaxed space-y-4">
                      <p>
                        Carrgo Freight Solutions Ltd (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is a UK freight forwarding company registered in England and Wales. Our registered office is at Suite 12, International Trade Centre, London, EC2A 4BX. We are the data controller responsible for your personal data.
                      </p>
                      <p>
                        This privacy policy explains how we collect, use, store, and protect your personal data when you use our website, request quotes, book our freight forwarding services, or otherwise interact with us. We are committed to ensuring that your privacy is protected and that we comply with all applicable data protection laws, including the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
                      </p>
                      <p>
                        If you have any questions about this privacy policy or how we handle your personal data, please contact us using the details provided in the Contact Us section below.
                      </p>
                    </div>
                  </section>

                  {/* 2. What Data We Collect */}
                  <section id="what-we-collect" className="mb-12 scroll-mt-24">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-[#EBF2FF] rounded-lg flex items-center justify-center">
                        <Eye className="w-5 h-5 text-[#1A6DFF]" aria-hidden="true" />
                      </div>
                      <h2 className="text-2xl font-bold text-[#111827]">2. What Data We Collect</h2>
                    </div>
                    <div className="text-[#4B5563] leading-relaxed space-y-4">
                      <p>We may collect and process the following categories of personal data:</p>
                      <ul className="space-y-3 ml-4">
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span><strong className="text-[#111827]">Contact information:</strong> Your name, email address, phone number, and job title when you request a quote, contact us, or register for our services.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span><strong className="text-[#111827]">Company information:</strong> Your company name, address, VAT number, and EORI number as required for customs and shipping documentation.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span><strong className="text-[#111827]">Shipment details:</strong> Origin, destination, cargo description, weight, dimensions, and related shipping information necessary to provide freight forwarding services.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span><strong className="text-[#111827]">Communication records:</strong> Records of emails, phone calls, and other correspondence with our team for quality assurance and customer service purposes.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span><strong className="text-[#111827]">Website usage data:</strong> Information about how you use our website, collected through cookies and analytics tools, including IP address, browser type, pages visited, and time spent on site.</span>
                        </li>
                      </ul>
                      <p>
                        We do not collect special category data (such as health information, racial or ethnic origin, religious beliefs, or political opinions) unless strictly necessary and with your explicit consent.
                      </p>
                    </div>
                  </section>

                  {/* 3. How We Use Your Data */}
                  <section id="how-we-use" className="mb-12 scroll-mt-24">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-[#EBF2FF] rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-[#1A6DFF]" aria-hidden="true" />
                      </div>
                      <h2 className="text-2xl font-bold text-[#111827]">3. How We Use Your Data</h2>
                    </div>
                    <div className="text-[#4B5563] leading-relaxed space-y-4">
                      <p>We use your personal data for the following lawful purposes:</p>
                      <ul className="space-y-3 ml-4">
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span><strong className="text-[#111827]">To provide freight forwarding services:</strong> Processing your bookings, arranging transportation, handling customs clearance, and managing shipments from origin to destination.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span><strong className="text-[#111827]">To respond to enquiries:</strong> Answering your quote requests, questions about our services, and general customer service enquiries.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span><strong className="text-[#111827]">To process bookings:</strong> Creating shipping documentation, booking cargo space with carriers, and coordinating collections and deliveries.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span><strong className="text-[#111827]">To comply with legal obligations:</strong> Fulfilling customs declarations, tax requirements, and other regulatory obligations as required by HMRC and other authorities.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span><strong className="text-[#111827]">To improve our services:</strong> Analysing website usage and customer feedback to enhance our service offerings and user experience.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span><strong className="text-[#111827]">Marketing communications:</strong> With your consent, we may send you information about our services, industry updates, and promotional offers. You can opt out at any time.</span>
                        </li>
                      </ul>
                      <p>
                        Our legal basis for processing your personal data is typically contractual necessity (to fulfil our agreement with you), legal obligation (to comply with customs and tax regulations), or legitimate interests (to improve our services and communicate with you). Where we rely on consent, we will obtain this clearly and you may withdraw it at any time.
                      </p>
                    </div>
                  </section>

                  {/* 4. How We Share Your Data */}
                  <section id="how-we-share" className="mb-12 scroll-mt-24">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-[#EBF2FF] rounded-lg flex items-center justify-center">
                        <UserCheck className="w-5 h-5 text-[#1A6DFF]" aria-hidden="true" />
                      </div>
                      <h2 className="text-2xl font-bold text-[#111827]">4. How We Share Your Data</h2>
                    </div>
                    <div className="text-[#4B5563] leading-relaxed space-y-4">
                      <p>
                        We take your privacy seriously and do not sell your personal data to third parties. We may share your data with the following categories of recipients only where necessary:
                      </p>
                      <ul className="space-y-3 ml-4">
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span><strong className="text-[#111827]">Carriers and shipping partners:</strong> We share shipment details with shipping lines, airlines, road haulage companies, and rail operators to arrange the transport of your goods.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span><strong className="text-[#111827]">HMRC and customs authorities:</strong> We are legally required to share customs declaration information with HMRC and relevant overseas customs authorities for clearance purposes.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span><strong className="text-[#111827]">Service providers:</strong> We use trusted third-party providers for IT services, website hosting, analytics, and customer relationship management. All providers are bound by data processing agreements.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span><strong className="text-[#111827]">Legal and regulatory bodies:</strong> We may disclose your data where required by law, court order, or regulatory requirement.</span>
                        </li>
                      </ul>
                      <p>
                        When we share your data with third parties, we ensure they provide adequate safeguards for your personal data and process it only for the specified purposes. We do not transfer your personal data outside the UK or European Economic Area unless appropriate safeguards are in place.
                      </p>
                    </div>
                  </section>

                  {/* 5. How We Protect Your Data */}
                  <section id="how-we-protect" className="mb-12 scroll-mt-24">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-[#EBF2FF] rounded-lg flex items-center justify-center">
                        <Lock className="w-5 h-5 text-[#1A6DFF]" aria-hidden="true" />
                      </div>
                      <h2 className="text-2xl font-bold text-[#111827]">5. How We Protect Your Data</h2>
                    </div>
                    <div className="text-[#4B5563] leading-relaxed space-y-4">
                      <p>
                        We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction:
                      </p>
                      <ul className="space-y-3 ml-4">
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span><strong className="text-[#111827]">SSL encryption:</strong> All data transmitted between your browser and our website is protected using industry-standard SSL/TLS encryption.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span><strong className="text-[#111827]">Access controls:</strong> We restrict access to personal data to authorised employees and contractors who need it to perform their duties. All staff receive regular data protection training.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span><strong className="text-[#111827]">Regular security audits:</strong> We conduct regular security assessments and vulnerability testing to identify and address potential risks.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span><strong className="text-[#111827]">GDPR-compliant processing agreements:</strong> All third-party processors we work with are bound by data processing agreements that comply with UK GDPR requirements.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span><strong className="text-[#111827]">Data retention limits:</strong> We retain your personal data only for as long as necessary to fulfil the purposes for which it was collected, or as required by law. After this period, data is securely deleted or anonymised.</span>
                        </li>
                      </ul>
                      <p>
                        In the unlikely event of a data breach that poses a risk to your rights and freedoms, we will notify the Information Commissioner&apos;s Office (ICO) within 72 hours and inform you without undue delay.
                      </p>
                    </div>
                  </section>

                  {/* 6. Your Rights */}
                  <section id="your-rights" className="mb-12 scroll-mt-24">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-[#EBF2FF] rounded-lg flex items-center justify-center">
                        <UserCheck className="w-5 h-5 text-[#1A6DFF]" aria-hidden="true" />
                      </div>
                      <h2 className="text-2xl font-bold text-[#111827]">6. Your Rights</h2>
                    </div>
                    <div className="text-[#4B5563] leading-relaxed space-y-4">
                      <p>
                        Under UK data protection law, you have the following rights regarding your personal data:
                      </p>
                      <ul className="space-y-3 ml-4">
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span><strong className="text-[#111827]">Right to access:</strong> You have the right to request a copy of the personal data we hold about you.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span><strong className="text-[#111827]">Right to rectification:</strong> You have the right to request that we correct any inaccurate or incomplete personal data.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span><strong className="text-[#111827]">Right to erasure (&ldquo;right to be forgotten&rdquo;):</strong> You have the right to request that we delete your personal data in certain circumstances.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span><strong className="text-[#111827]">Right to restrict processing:</strong> You have the right to request that we restrict the processing of your personal data in certain circumstances.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span><strong className="text-[#111827]">Right to data portability:</strong> You have the right to receive your personal data in a structured, commonly used, and machine-readable format.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span><strong className="text-[#111827]">Right to object:</strong> You have the right to object to the processing of your personal data where we rely on legitimate interests as our legal basis.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-[#1A6DFF] font-bold">&bull;</span>
                          <span><strong className="text-[#111827]">Right to withdraw consent:</strong> Where we rely on your consent, you have the right to withdraw it at any time without affecting the lawfulness of processing based on consent before its withdrawal.</span>
                        </li>
                      </ul>
                      <p>
                        To exercise any of these rights, please contact us using the details in the Contact Us section below. We will respond to your request within one month of receipt. You also have the right to lodge a complaint with the Information Commissioner&apos;s Office (ICO) if you believe we have not handled your data correctly.
                      </p>
                    </div>
                  </section>

                  {/* 7. Cookies */}
                  <section id="cookies" className="mb-12 scroll-mt-24">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-[#EBF2FF] rounded-lg flex items-center justify-center">
                        <Cookie className="w-5 h-5 text-[#1A6DFF]" aria-hidden="true" />
                      </div>
                      <h2 className="text-2xl font-bold text-[#111827]">7. Cookies</h2>
                    </div>
                    <div className="text-[#4B5563] leading-relaxed space-y-4">
                      <p>
                        Our website uses cookies to improve your browsing experience and to help us understand how visitors use our site. Cookies are small text files that are placed on your device when you visit a website.
                      </p>
                      <p><strong className="text-[#111827]">Essential cookies:</strong> These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility. You cannot opt out of these cookies.</p>
                      <p><strong className="text-[#111827]">Analytics cookies:</strong> We use Google Analytics to collect anonymous information about how visitors use our website. This helps us understand which pages are most popular, how visitors navigate our site, and where we can make improvements. All data collected is anonymised and cannot be used to identify you personally.</p>
                      <p>
                        You can manage your cookie preferences through our cookie banner when you first visit our site, or by adjusting your browser settings. Please note that disabling certain cookies may affect the functionality of our website.
                      </p>
                      <p>
                        For more information about the specific cookies we use, their purposes, and their retention periods, please contact us.
                      </p>
                    </div>
                  </section>

                  {/* 8. Contact Us */}
                  <section id="contact-us" className="scroll-mt-24">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-[#EBF2FF] rounded-lg flex items-center justify-center">
                        <Mail className="w-5 h-5 text-[#1A6DFF]" aria-hidden="true" />
                      </div>
                      <h2 className="text-2xl font-bold text-[#111827]">8. Contact Us</h2>
                    </div>
                    <div className="text-[#4B5563] leading-relaxed space-y-4">
                      <p>
                        If you have any questions about this privacy policy, how we handle your personal data, or if you wish to exercise any of your data protection rights, please contact us:
                      </p>
                      <div className="bg-[#F8FAFC] rounded-lg p-5 border border-[#E5E7EB]">
                        <p className="font-semibold text-[#111827]">Carrgo Freight Solutions Ltd</p>
                        <p>Suite 12, International Trade Centre</p>
                        <p>London, EC2A 4BX</p>
                        <p className="mt-2">
                          Email:{' '}
                          <a href="mailto:info@carrgo.co.uk" className="text-[#1A6DFF] hover:underline">info@carrgo.co.uk</a>
                        </p>
                        <p>
                          Phone:{' '}
                          <a href="tel:+442039505050" className="text-[#1A6DFF] hover:underline">+44 (0)20 3950 5050</a>
                        </p>
                      </div>
                      <p>
                        You also have the right to lodge a complaint with the Information Commissioner&apos;s Office (ICO), the UK supervisory authority for data protection issues. Their contact details are available on the ICO website at{' '}
                        <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-[#1A6DFF] hover:underline">ico.org.uk</a>.
                      </p>
                      <p className="text-sm text-[#9CA3AF] mt-6">
                        This privacy policy was last updated on 1 January 2026. We may update this policy from time to time and will post any changes on this page. We encourage you to review this policy periodically.
                      </p>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====== CTA BANNER ====== */}
        <section aria-label="Get started" className="py-16 bg-[#1A6DFF] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold mb-4">Questions About Your Data?</h2>
            <p className="text-[#D4E3FF] text-lg mb-8">
              We are committed to protecting your personal data. If you have any questions, our team is here to help.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-[#1A6DFF] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors min-h-[44px]"
              >
                Contact Us <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
              <Link
                to="/terms"
                className="inline-flex items-center gap-2 bg-[#1557CC] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#1149AD] transition-colors min-h-[44px]"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
