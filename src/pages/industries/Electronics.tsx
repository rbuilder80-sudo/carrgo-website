import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import {
  Ship, Plane, TrainFront, Cpu, Battery, Zap, ArrowRight, CheckCircle,
  ChevronDown, Shield, Clock, MapPin, Package
} from 'lucide-react';

/* ── JSON-LD Structured Data ── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Electronics Freight Forwarding UK — Tech Products & Components | Carrgo',
  provider: { '@type': 'Organization', name: 'Carrgo Freight Solutions Ltd' },
  areaServed: { '@type': 'Country', name: 'United Kingdom' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Electronics Freight Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Air Freight for High-Value Electronics' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Sea Freight for Volume Electronics' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Rail Freight China-Europe' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'UN 38.3 Battery Shipping Compliance' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Anti-Static Packaging & Handling' } },
    ],
  },
};

const faqData = [
  { q: 'How do I ship lithium batteries internationally?', a: 'Lithium batteries must be shipped in compliance with UN 38.3 testing requirements and air and sea dangerous goods regulations. We provide proper packaging, labelling, and documentation for lithium-ion and lithium-metal batteries by air, sea, and road. Our team ensures your shipment meets all carrier and customs requirements.' },
  { q: 'What is UN 38.3 testing?', a: 'UN 38.3 is a United Nations testing standard that lithium batteries must pass before they can be transported. It covers eight tests including altitude simulation, thermal cycling, vibration, shock, and short circuit. We guide you through compliance and work with certified labs when testing is required.' },
  { q: 'Is air freight better for electronics?', a: 'Air freight is ideal for high-value, time-sensitive electronics such as smartphones, laptops, and PCBs. It offers faster transit (3–7 days), lower inventory holding costs, and reduced theft risk. For volume shipments or less urgent stock, sea freight or rail can cut costs significantly.' },
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

export default function Electronics() {
  return (
    <>
      <Seo
        title="Electronics Freight Forwarding UK | Tech & Components | Carrgo"
        description="Freight forwarding for electronics — consumer tech, PCBs, LEDs, batteries (UN 38.3). Air, sea, and rail shipping with anti-static packaging. Get a quote."
        keywords="electronics freight forwarding, PCB shipping, lithium battery shipping, UN 38.3, tech cargo UK"
        ogUrl="https://carrgo.co.uk/industries/electronics"
        canonical="https://carrgo.co.uk/industries/electronics"
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
                  Electronics Freight Forwarding — Tech Products & Components
                </h1>
                <p className="text-lg text-[#4B5563] mb-8 leading-relaxed">
                  Anti-static packaging, battery compliance, and fast turnaround for sensitive electronics. From consumer gadgets to industrial PCBs — we protect your cargo and your margins.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    'UN 38.3 compliant lithium battery shipping by air, sea, and rail',
                    'Anti-static and shock-resistant packaging for fragile components',
                    'Air freight for high-value, time-sensitive electronics',
                    'Sea and rail options for volume shipments from China and Asia',
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
                  src="/images/industry-electronics.jpg"
                  alt="Electronics components and devices packaged for international shipping"
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
                Service Scope for Electronics
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Cpu, title: 'PCBs & Components', desc: 'Anti-static packaging and careful handling for printed circuit boards, semiconductors, and delicate electronic parts.' },
                { icon: Zap, title: 'LED Lighting', desc: 'Bulk LED shipments with custom crating to prevent damage to fragile lenses and housings.' },
                { icon: Battery, title: 'Batteries (UN 38.3)', desc: 'Full compliance with UN 38.3 and international dangerous goods codes for lithium-ion and lithium-metal batteries.' },
                { icon: Package, title: 'Consumer Electronics', desc: 'Phones, laptops, tablets, and accessories shipped with shock protection and tracking.' },
                { icon: Shield, title: 'Secure Handling', desc: 'Tamper-evident seals, GPS tracking, and restricted access handling for high-value tech cargo.' },
                { icon: Clock, title: 'Fast Turnaround', desc: 'Express air freight options with 3–7 day transit for urgent product launches and restocks.' },
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
                Electronics Cargo We Ship
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {[
                'Smartphones & tablets',
                'Laptops & computers',
                'PCBs & semiconductors',
                'LED lighting systems',
                'Lithium batteries (UN 38.3)',
                'Power banks & chargers',
                'Cables & connectors',
                'Smart home devices',
                'Industrial sensors',
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
                Our Electronics Shipping Process
              </h2>
            </div>
            <ol className="grid md:grid-cols-4 gap-8 relative">
              {[
                { step: '1', title: 'Quote Request', desc: 'Share product specs, battery type (if any), origin, and volume for an accurate quote' },
                { step: '2', title: 'Compliance Check', desc: 'We verify UN 38.3, CE marking, and battery shipping requirements' },
                { step: '3', title: 'Pack & Book', desc: 'Anti-static packaging applied, cargo booked on optimal route' },
                { step: '4', title: 'Track & Deliver', desc: 'Real-time tracking through customs to your UK warehouse or fulfilment centre' },
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
                Electronics Routes to the UK
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { origin: 'Shenzhen, China', port: 'Heathrow', mode: 'Air', time: '3–5 days' },
                { origin: 'Shanghai, China', port: 'Felixstowe', mode: 'Sea', time: '24–30 days' },
                { origin: 'Shenzhen, China', port: 'London', mode: 'Rail', time: '14–20 days' },
                { origin: 'Seoul, South Korea', port: 'Heathrow', mode: 'Air', time: '2–4 days' },
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
                Electronics Importer Cuts Transit Time in Half
              </h2>
              <p className="text-[#4B5563] text-lg leading-relaxed mb-8">
                An electronics importer sourcing PCBs and components from Shenzhen was reliant on sea freight with 35-day transit times. We introduced a <strong>rail freight solution via the New Silk Road</strong>, cutting transit to 18 days while reducing costs versus air freight by 40%. The faster replenishment cycle enabled a 25% reduction in safety stock.
              </p>
              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-white rounded-xl p-5 border border-[#E5E7EB]">
                  <p className="text-2xl font-bold text-[#1A6DFF]">18 days</p>
                  <p className="text-sm text-[#4B5563]">New transit time</p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-[#E5E7EB]">
                  <p className="text-2xl font-bold text-[#1A6DFF]">40%</p>
                  <p className="text-sm text-[#4B5563]">Cost saving vs air freight</p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-[#E5E7EB]">
                  <p className="text-2xl font-bold text-[#1A6DFF]">25%</p>
                  <p className="text-sm text-[#4B5563]">Reduction in safety stock</p>
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
                Electronics Freight FAQ
              </h2>
            </div>
            <FaqAccordion />
          </div>
        </section>

        {/* ====== CTA BANNER ====== */}
        <section aria-label="Get an electronics freight quote" className="py-16 md:py-24 bg-[#1A6DFF]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ship Your Electronics with Confidence
            </h2>
            <p className="text-white/85 text-lg mb-8 max-w-2xl mx-auto">
              From PCBs to consumer gadgets — compliant, secure, and fast freight forwarding for the tech industry.
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
