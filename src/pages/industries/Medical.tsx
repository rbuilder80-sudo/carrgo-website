import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import {
  Ship, Plane, Truck, Thermometer, Pill, Stethoscope, Shield,
  ArrowRight, CheckCircle, ChevronDown, Clock, MapPin, Package
} from 'lucide-react';

/* ── JSON-LD Structured Data ── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Medical & Pharmaceutical Freight Forwarding UK — GDP Compliant | Carrgo',
  provider: { '@type': 'Organization', name: 'Carrgo Freight Solutions Ltd' },
  areaServed: { '@type': 'Country', name: 'United Kingdom' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Medical & Pharmaceutical Freight Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'GDP-Compliant Air Freight (Cold Chain)' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Temperature-Controlled Road Freight (Europe)' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Ambient Sea Freight for Medical Devices' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Regulatory Documentation & Batch Traceability' } },
    ],
  },
};

const faqData = [
  { q: 'What is GDP compliance in pharmaceutical shipping?', a: 'Good Distribution Practice (GDP) is a quality standard for the proper distribution of medicinal products. It covers temperature control, batch traceability, documentation, and qualified personnel. Our GDP-compliant processes ensure your pharmaceutical shipments meet MHRA and EU regulatory requirements throughout the supply chain.' },
  { q: 'Can you handle temperature-controlled shipments?', a: 'Yes — we provide active and passive temperature-controlled shipping solutions ranging from +2°C to +8°C (refrigerated), -20°C (frozen), and ambient (+15°C to +25°C). Temperature data loggers and real-time monitoring ensure cold chain integrity from origin to destination.' },
  { q: 'What documentation is needed for medical devices?', a: 'Medical device imports typically require UKCA/CE marking, a Declaration of Conformity, manufacturer registration, and correct HS codes for customs. For pharmaceuticals, batch records, certificates of analysis, and import licences may be required. Our compliance team handles all documentation end-to-end.' },
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

export default function Medical() {
  return (
    <>
      <Seo
        title="Medical & Pharmaceutical Freight Forwarding UK | GDP Compliant | Carrgo"
        description="GDP-compliant freight forwarding for medical devices, pharmaceuticals, and cold chain products. Air, road, and sea shipping with full regulatory documentation."
        keywords="medical freight forwarding, pharmaceutical shipping, GDP compliant, cold chain logistics, medical device import UK"
        ogUrl="https://carrgo.co.uk/industries/medical"
        canonical="https://carrgo.co.uk/industries/medical"
        structuredData={[serviceSchema, faqSchema]}
      />
      <main id="main-content" role="main">
        {/* ====== HERO ====== */}
        <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-gradient-to-br from-[#EFF6FF] to-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Industry Solutions</span>
                <h1 id="hero-heading" className="text-3xl lg:text-5xl font-extrabold text-[#111827] leading-tight mt-3 mb-6">
                  Medical & Pharmaceutical Freight Forwarding
                </h1>
                <p className="text-lg text-[#4B5563] mb-8 leading-relaxed">
                  GDP-compliant logistics with cold chain integrity, regulatory documentation, and full batch traceability. From medical devices to vaccines — we deliver with absolute precision.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    'GDP-compliant processes with qualified personnel and documented SOPs',
                    'Active and passive cold chain: +2°C to +8°C, -20°C, and ambient',
                    'Full batch traceability and temperature data logging',
                    'Regulatory documentation for MHRA compliance',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#4B5563]">
                      <CheckCircle className="w-5 h-5 text-[#22C55E] flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-4">
                  <Link to="/get-a-quote" className="inline-flex items-center gap-2 bg-[#1A6DFF] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1557CC] transition-colors min-h-[44px]">
                    Get a Quote <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                  <Link to="/services/air-freight" className="inline-flex items-center gap-2 bg-white text-[#4B5563] border border-[#E5E7EB] px-6 py-3 rounded-lg font-semibold hover:bg-[#F8FAFC] transition-colors min-h-[44px]">
                    Air Freight Services
                  </Link>
                </div>
              </div>
              <div className="hidden lg:block">
                <img
                  src="/images/industry-medical.jpg"
                  alt="Medical supplies and pharmaceuticals in temperature-controlled packaging for shipping"
                  className="rounded-2xl shadow-lg w-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ====== SERVICE SCOPE ====== */}
        <section aria-labelledby="scope-heading" className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">What We Handle</span>
              <h2 id="scope-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3">
                Service Scope for Medical & Pharma
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Stethoscope, title: 'Medical Devices', desc: 'Diagnostic equipment, implants, and surgical instruments with full regulatory documentation and UKCA/CE compliance.' },
                { icon: Pill, title: 'Pharmaceuticals', desc: 'APIs, finished formulations, and generics shipped under GDP with batch records and certificates of analysis.' },
                { icon: Thermometer, title: 'Cold Chain', desc: 'Vaccines, biologics, and temperature-sensitive products with validated packaging and real-time monitoring.' },
                { icon: Package, title: 'Diagnostic Kits', desc: 'PCR kits, rapid tests, and laboratory reagents handled with care and proper classification.' },
                { icon: Shield, title: 'Supplements & PPE', desc: 'Nutraceuticals, vitamins, and personal protective equipment with correct HS coding and labelling.' },
                { icon: Clock, title: 'Time-Critical Delivery', desc: 'Urgent clinical trial supplies and emergency medical shipments with express air freight options.' },
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

        {/* ====== CARGO TYPES ====== */}
        <section aria-labelledby="cargo-heading" className="py-16 md:py-24 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Cargo Types</span>
              <h2 id="cargo-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3">
                Medical & Pharma Cargo We Ship
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {[
                'Medical devices & equipment',
                'Active pharmaceutical ingredients (APIs)',
                'Vaccines & biologics (cold chain)',
                'Diagnostic test kits',
                'Nutraceuticals & supplements',
                'Personal protective equipment (PPE)',
                'Clinical trial supplies',
                'Surgical instruments',
                'Laboratory reagents',
              ].map((cargo, i) => (
                <div key={i} className="flex items-center gap-3 bg-white rounded-lg px-5 py-3 border border-[#E5E7EB]">
                  <CheckCircle className="w-5 h-5 text-[#22C55E] flex-shrink-0" aria-hidden="true" />
                  <span className="text-[#111827] font-medium text-sm">{cargo}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== SHIPPING PROCESS ====== */}
        <section aria-labelledby="process-heading" className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">How It Works</span>
              <h2 id="process-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3">
                Our Medical Shipping Process
              </h2>
            </div>
            <ol className="grid md:grid-cols-4 gap-8 relative">
              {[
                { step: '1', title: 'Quote & Classification', desc: 'We classify your products, verify regulatory requirements, and confirm temperature needs' },
                { step: '2', title: 'Documentation', desc: 'Batch records, CoAs, import licences, and customs paperwork prepared by our compliance team' },
                { step: '3', title: 'Pack & Monitor', desc: 'GDP-compliant packaging with temperature data loggers and real-time tracking activated' },
                { step: '4', title: 'Deliver & Verify', desc: 'Cargo delivered with temperature records, batch traceability, and delivery confirmation' },
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

        {/* ====== RELEVANT ROUTES ====== */}
        <section aria-labelledby="routes-heading" className="py-16 md:py-24 bg-[#EFF6FF]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Popular Routes</span>
              <h2 id="routes-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3">
                Medical & Pharma Routes to the UK
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { origin: 'Mumbai, India', port: 'Heathrow', mode: 'Air (Cold)', time: '1–2 days' },
                { origin: 'Frankfurt, Germany', port: 'London', mode: 'Road (Temp)', time: '1–2 days' },
                { origin: 'Shanghai, China', port: 'Heathrow', mode: 'Air (Cold)', time: '2–3 days' },
                { origin: 'Boston, USA', port: 'Heathrow', mode: 'Air', time: '1–2 days' },
              ].map((route, i) => (
                <article key={i} className="bg-white rounded-xl p-6 border border-[#E5E7EB] hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-semibold text-[#111827]">{route.origin}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#9CA3AF]" aria-hidden="true" />
                    <div className="text-right">
                      <p className="font-semibold text-[#111827]">{route.port}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[#4B5563] text-sm mb-2">
                    <Clock className="w-4 h-4 text-[#1A6DFF]" aria-hidden="true" />
                    <span>{route.time}</span>
                  </div>
                  <p className="text-xs text-[#1A6DFF] uppercase tracking-wider font-medium">{route.mode}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ====== CASE STUDY ====== */}
        <section aria-labelledby="case-study-heading" className="py-16 md:py-24 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Case Study</span>
              <h2 id="case-study-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3 mb-6">
                100% Cold Chain Integrity on India-UK Shipments
              </h2>
              <p className="text-[#4B5563] text-lg leading-relaxed mb-8">
                A medical device distributor importing temperature-sensitive diagnostic kits from India faced cold chain breaks during transit. We implemented <strong>validated thermal packaging with live data loggers</strong> and switched to a dedicated cold-chain air freight lane. Over 12 months and 150+ shipments, cold chain integrity was maintained at <strong>100%</strong>, with zero product loss and full GDP audit compliance.
              </p>
              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-white rounded-xl p-5 border border-[#E5E7EB]">
                  <p className="text-2xl font-bold text-[#1A6DFF]">100%</p>
                  <p className="text-sm text-[#4B5563]">Cold chain integrity</p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-[#E5E7EB]">
                  <p className="text-2xl font-bold text-[#1A6DFF]">150+</p>
                  <p className="text-sm text-[#4B5563]">Shipments completed</p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-[#E5E7EB]">
                  <p className="text-2xl font-bold text-[#1A6DFF]">0%</p>
                  <p className="text-sm text-[#4B5563]">Product loss rate</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====== FAQ ====== */}
        <section aria-labelledby="faq-heading" className="py-16 md:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">FAQ</span>
              <h2 id="faq-heading" className="text-3xl font-bold text-[#111827] mt-3">
                Medical & Pharma Freight FAQ
              </h2>
            </div>
            <FaqAccordion />
          </div>
        </section>

        {/* ====== CTA BANNER ====== */}
        <section aria-label="Get a medical freight quote" className="py-16 md:py-24 bg-[#1A6DFF]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Trust Carrgo with Your Medical Shipments
            </h2>
            <p className="text-white/85 text-lg mb-8 max-w-2xl mx-auto">
              GDP-compliant, temperature-controlled, and fully documented freight forwarding for the medical and pharmaceutical sector.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/get-a-quote" className="inline-flex items-center gap-2 bg-white text-[#1A6DFF] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors min-h-[44px]">
                Get a Quote <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
              <Link to="/services/air-freight" className="inline-flex items-center gap-2 bg-[#1557CC] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#124DB8] transition-colors min-h-[44px]">
                Explore Air Freight
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
