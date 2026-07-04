import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import {
  Ship, Plane, Truck, TrainFront, FileCheck, Package,
  Warehouse, Globe, ArrowRight, CheckCircle, ChevronDown,
  Clock, Shield, AlertTriangle, ClipboardCheck, BookOpen, Calculator, CreditCard, Users
} from 'lucide-react';

/* ── JSON-LD Structured Data ── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Customs Clearance UK — HMRC-Authorised Brokers',
  provider: { '@type': 'Organization', name: 'Carrgo Freight Solutions Ltd' },
  areaServed: { '@type': 'Country', name: 'United Kingdom' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Customs Clearance Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Import Declarations (CDS)' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Export Declarations' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Commodity Code Classification' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Duty Deferment' } },
    ],
  },
};

const faqData = [
  { q: 'What is the Customs Declaration Service (CDS)?', a: 'The Customs Declaration Service (CDS) is the UK\'s electronic system for handling customs declarations, replacing the older CHIEF system. All UK import and export declarations must now be submitted through CDS. Our HMRC-authorised brokers are fully trained and registered to submit declarations on CDS on your behalf.' },
  { q: 'How do I find the right commodity code for my goods?', a: 'Commodity codes (also called HS codes) are 8-10 digit numbers that classify your goods for customs purposes. The code determines the duty rate and any restrictions. Our team can accurately classify your goods using the UK Trade Tariff, ensuring you pay the correct duty and VAT.' },
  { q: 'What duties and VAT will I need to pay on imports?', a: 'UK import duties vary by product type and origin country. Most goods attract VAT at 20% on the total value including duty and shipping. Some goods benefit from preferential duty rates under trade agreements. We calculate all costs upfront so there are no surprises.' },
  { q: 'How has Brexit changed UK customs requirements?', a: 'Since leaving the EU customs union, all goods moving between the UK and EU require customs declarations. UK importers need a GB EORI number, commodity codes, and may face customs checks. We guide you through every step and handle all documentation.' },
  { q: 'What is duty deferment and how does it work?', a: 'Duty deferment allows you to defer payment of customs duties and VAT to a single monthly payment rather than paying at the point of import. This improves cash flow. We can help you set up a deferment account with HMRC or use our own facility.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqData.map(faq => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
};

/* ── FAQ Accordion ── */
function FaqAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {faqData.map((faq, i) => (
        <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            type="button"
            className="w-full flex items-center justify-between p-4 text-left font-medium text-gray-900 hover:bg-gray-50 transition-colors"
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            aria-expanded={openIdx === i}
            aria-controls={`faq-ans-${i}`}>
            <span>{faq.q}</span>
            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ${openIdx === i ? 'rotate-180' : ''}`} aria-hidden="true" />
          </button>
          {openIdx === i && (
            <div id={`faq-ans-${i}`} className="px-4 pb-4 text-gray-600 leading-relaxed">{faq.a}</div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function CustomsClearance() {
  return (
    <>
      <Seo
        title="Customs Clearance UK | HMRC-Authorised Brokers | Carrgo"
        description="HMRC-authorised customs brokers handling UK import & export declarations. CDS entries, duty deferment, commodity codes. 99%+ success rate."
        structuredData={[serviceSchema, faqSchema]}
      />
      <main id="main-content">
        {/* ====== HERO ====== */}
        <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-gradient-to-br from-[#EFF6FF] to-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Customs Clearance</span>
                <h1 id="hero-heading" className="text-3xl lg:text-5xl font-extrabold text-[#111827] leading-tight mt-3 mb-6">
                  Customs Clearance UK — HMRC-Authorised Brokers
                </h1>
                <p className="text-lg text-[#4B5563] mb-8 leading-relaxed">
                  HMRC-authorised customs brokers handling all UK import and export declarations. CDS entries, duty deferment, commodity code classification, and full compliance. 99%+ first-submission success rate.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    'HMRC-authorised customs brokers',
                    'CDS (Customs Declaration Service) entries',
                    'Duty deferment accounts',
                    'Commodity code classification',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#4B5563]">
                      <CheckCircle className="w-5 h-5 text-[#22C55E] flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-4">
                  <Link to="/get-a-quote" className="inline-flex items-center gap-2 bg-[#1A6DFF] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1557CC] transition-colors min-h-[44px]">
                    Get a Customs Quote <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                  <a href="tel:+442039505050" className="inline-flex items-center gap-2 bg-white text-[#4B5563] border border-[#E5E7EB] px-6 py-3 rounded-lg font-semibold hover:bg-[#F8FAFC] transition-colors min-h-[44px]">
                    Call Our Team
                  </a>
                </div>
              </div>
              <div className="hidden lg:block">
                <img
                  src="/images/service-customs.jpg"
                  alt="Customs documentation on clipboard with container port in background"
                  className="rounded-2xl shadow-lg w-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ====== SERVICES BREAKDOWN ====== */}
        <section aria-labelledby="services-heading" className="py-16 md:py-24 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">What We Handle</span>
              <h2 id="services-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3">
                Our Customs Clearance Services
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: ClipboardCheck, title: 'Import Declarations', desc: 'Full CDS entry preparation and submission for all UK imports. We ensure accurate declarations with correct commodity codes, valuations, and origin declarations.' },
                { icon: FileCheck, title: 'Export Declarations', desc: 'Complete export customs documentation for goods leaving the UK. Required for all post-Brexit EU shipments and worldwide exports.' },
                { icon: BookOpen, title: 'Commodity Code Classification', desc: 'Expert HS code determination using the UK Trade Tariff. Correct classification ensures accurate duty rates and regulatory compliance.' },
                { icon: Calculator, title: 'Duty & VAT Calculation', desc: 'Accurate assessment of all import duties, VAT, and excise duties payable. We provide transparent cost breakdowns before your goods arrive.' },
                { icon: CreditCard, title: 'Duty Deferment', desc: 'Deferred payment arrangements allowing you to pay customs duties monthly rather than at the point of import. Improves cash flow significantly.' },
                { icon: Shield, title: 'Customs Compliance', desc: 'Audit support, record keeping, and ongoing compliance advice. We help you maintain HMRC-compliant systems and processes.' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <article key={i} className="bg-white rounded-xl p-6 border border-[#E5E7EB] hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-[#EBF2FF] rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-[#1A6DFF]" aria-hidden="true" />
                    </div>
                    <h3 className="font-bold text-lg text-[#111827] mb-2">{item.title}</h3>
                    <p className="text-[#4B5563] text-sm leading-relaxed">{item.desc}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ====== PROCESS ====== */}
        <section aria-labelledby="process-heading" className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">How It Works</span>
              <h2 id="process-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3">
                Our Customs Clearance Process
              </h2>
            </div>
            <ol className="grid md:grid-cols-4 gap-8">
              {[
                { step: '1', title: 'Document Review', desc: 'We review your commercial invoice, packing list, and shipping documents' },
                { step: '2', title: 'Classification', desc: 'Correct commodity codes assigned and duty/VAT calculated' },
                { step: '3', title: 'Submission', desc: 'CDS entry submitted to HMRC with all required declarations' },
                { step: '4', title: 'Clearance', desc: 'Goods cleared and released for delivery to your premises' },
              ].map(item => (
                <li key={item.step} className="text-center relative">
                  <div className="w-14 h-14 bg-[#1A6DFF] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-lg text-[#111827] mb-2">{item.title}</h3>
                  <p className="text-[#4B5563] text-sm leading-relaxed">{item.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ====== POST-BREXIT COMPLIANCE ====== */}
        <section aria-labelledby="brexit-heading" className="py-16 md:py-24 bg-[#EFF6FF]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Brexit Guidance</span>
              <h2 id="brexit-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3">
                UK Customs After Brexit
              </h2>
              <p className="text-[#4B5563] mt-4 max-w-2xl mx-auto">
                Navigating post-Brexit customs can be complex. Our expert brokers ensure your imports and exports remain compliant and efficient.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Globe, title: 'EU to UK Requirements', desc: 'Since Brexit, all goods entering the UK from the EU require a customs declaration, commodity codes, and may be subject to customs checks. We handle every aspect of EU-to-UK customs clearance, ensuring compliance with the new rules.' },
                { icon: AlertTriangle, title: 'Northern Ireland Protocol', desc: 'Goods moving between Great Britain and Northern Ireland have special arrangements under the Windsor Framework. We understand the complexities and can advise on the correct procedures for NI movements.' },
                { icon: Users, title: 'EORI & Registration', desc: 'All UK importers and exporters need a valid EORI number starting with GB. We can guide you through the EORI registration process and ensure you have all necessary documentation in place.' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <article key={i} className="bg-white rounded-xl p-6 border border-[#E5E7EB]">
                    <div className="w-12 h-12 bg-[#EBF2FF] rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-[#1A6DFF]" aria-hidden="true" />
                    </div>
                    <h3 className="font-bold text-lg text-[#111827] mb-2">{item.title}</h3>
                    <p className="text-[#4B5563] text-sm leading-relaxed">{item.desc}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ====== WHY HMRC-AUTHORISED ====== */}
        <section aria-labelledby="why-heading" className="py-16 md:py-24 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Trust</span>
              <h2 id="why-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3">
                Why Choose an HMRC-Authorised Customs Broker?
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { stat: '99%+', label: 'First-Submission Success Rate', desc: 'Our experienced brokers get declarations right the first time.' },
                { stat: '2hr', label: 'Average Clearance Time', desc: 'Fast clearance means less time waiting at the port.' },
                { stat: '50%', label: 'Fewer Inspections', desc: 'HMRC trusts authorised brokers with lower inspection rates.' },
                { stat: '100%', label: 'Compliance Guarantee', desc: 'Full regulatory compliance on every declaration.' },
                { stat: 'Zero', label: 'Client Penalties', desc: 'No HMRC penalties for any Carrgo client declarations.' },
              ].map((item, i) => (
                <article key={i} className="bg-white rounded-xl p-6 border border-[#E5E7EB] text-center">
                  <div className="text-3xl font-extrabold text-[#1A6DFF] mb-2">{item.stat}</div>
                  <h3 className="font-bold text-sm text-[#111827] mb-1">{item.label}</h3>
                  <p className="text-[#4B5563] text-xs leading-relaxed">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ====== FAQ ====== */}
        <section aria-labelledby="faq-heading" className="py-16 md:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Customs FAQ</span>
              <h2 id="faq-heading" className="text-3xl font-bold text-[#111827] mt-3">
                Customs Clearance Frequently Asked Questions
              </h2>
            </div>
            <FaqAccordion />
          </div>
        </section>

        {/* ====== CTA BANNER ====== */}
        <section aria-label="Get a customs clearance quote" className="py-16 md:py-24 bg-[#1A6DFF]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Get Your Customs Clearance Quote
            </h2>
            <p className="text-white/85 text-lg mb-8 max-w-2xl mx-auto">
              HMRC-authorised customs brokers with a 99%+ first-submission success rate. Fast, compliant, hassle-free clearance.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/get-a-quote" className="inline-flex items-center gap-2 bg-white text-[#1A6DFF] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors min-h-[44px]">
                Get a Customs Quote <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 bg-[#1557CC] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#124DB8] transition-colors min-h-[44px]">
                Contact Us
              </Link>
            </div>
          </div>
        </section>

        {/* ====== RELATED SERVICES ====== */}
        <section aria-labelledby="related-heading" className="py-16 md:py-24 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="related-heading" className="text-2xl font-bold text-[#111827] mb-8 text-center">
              Explore Our Other Services
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Ship, title: 'Sea Freight', desc: 'FCL & LCL container shipping worldwide to UK ports', href: '/services/sea-freight' },
                { icon: Plane, title: 'Air Freight', desc: 'Express & economy air cargo with door-to-door delivery', href: '/services/air-freight' },
                { icon: Truck, title: 'Road Freight', desc: 'FTL & LTL European haulage to and from the UK', href: '/services/road-freight' },
                { icon: Package, title: 'Door-to-Door', desc: 'Complete factory-to-warehouse forwarding', href: '/services/door-to-door' },
              ].map(s => {
                const Icon = s.icon;
                return (
                  <Link key={s.title} to={s.href} className="bg-white rounded-xl p-6 border border-[#E5E7EB] hover:shadow-lg transition-shadow group">
                    <Icon className="w-10 h-10 text-[#1A6DFF] mb-3" aria-hidden="true" />
                    <h3 className="font-bold text-lg text-[#111827] mb-1">{s.title}</h3>
                    <p className="text-[#4B5563] text-sm mb-3">{s.desc}</p>
                    <span className="text-[#1A6DFF] font-medium text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      Learn more <ArrowRight className="w-3 h-3" aria-hidden="true" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
