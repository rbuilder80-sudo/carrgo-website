import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import {
  Car, Wrench, Shield, Zap, Battery, Package, Box,
  Ship, Plane, Truck, ArrowRight, CheckCircle, ChevronDown,
  Clock, Globe, FileCheck
} from 'lucide-react';

/* ── JSON-LD Structured Data ── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Automotive Freight Forwarding — Parts, Components & Just-in-Time',
  provider: { '@type': 'Organization', name: 'Carrgo Freight Solutions Ltd' },
  areaServed: { '@type': 'Country', name: 'United Kingdom' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Automotive Freight Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'OEM Parts Shipping' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Aftermarket Components' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Tyres & Batteries Logistics' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Accessories Freight' } },
    ],
  },
};

const faqData = [
  { q: 'How do you ship car batteries internationally?', a: 'Car batteries are classified as dangerous goods (UN 2794 / Class 8). We handle all required dangerous goods documentation, proper packaging to UN standards, and carrier approval. Our team ensures air and sea dangerous goods compliance for all shipments.' },
  { q: 'Can you handle urgent parts shipments?', a: 'Yes — our air freight and express road services are designed for urgent automotive parts. We offer same-day collection, next-flight-out options, and dedicated van deliveries for critical production or repair deadlines.' },
  { q: 'What documentation is needed for automotive parts?', a: 'Standard documentation includes commercial invoice, packing list, and EUR.1 or origin certificate where applicable. For OEM parts, we may need manufacturer certificates and conformity documentation. We prepare everything for you.' },
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

export default function Automotive() {
  return (
    <>
      <Seo
        title="Automotive Freight Forwarding UK | Parts & Components | Carrgo"
        description="Automotive freight forwarding UK — OEM parts, aftermarket components, tyres, and batteries. Just-in-time delivery, urgent air freight, and European road haulage."
        keywords="automotive freight forwarding, car parts shipping uk, oem logistics, aftermarket parts freight, just in time automotive, tyre shipping, battery transport"
        ogUrl="https://carrgo.co.uk/industries/automotive"
        canonical="https://carrgo.co.uk/industries/automotive"
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
                  Automotive Freight Forwarding — Parts, Components & Just-in-Time
                </h1>
                <p className="text-lg text-[#4B5563] mb-8 leading-relaxed">
                  Precision timing, component logistics, and aftermarket parts. Carrgo supports UK automotive businesses with reliable, trackable freight for OEM and aftermarket supply chains.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    'Just-in-time parts delivery to assembly lines',
                    'OEM and aftermarket component logistics',
                    'Dangerous goods handling for batteries & fluids',
                    'Air, road & sea freight from global suppliers',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#4B5563]">
                      <CheckCircle className="w-5 h-5 text-[#22C55E] flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-4">
                  <Link to="/services/air-freight" className="inline-flex items-center gap-2 bg-[#1A6DFF] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1557CC] transition-colors min-h-[44px]">
                    Air Freight <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                  <Link to="/get-a-quote" className="inline-flex items-center gap-2 bg-white text-[#4B5563] border border-[#E5E7EB] px-6 py-3 rounded-lg font-semibold hover:bg-[#F8FAFC] transition-colors min-h-[44px]">
                    Get a Quote
                  </Link>
                </div>
              </div>
              <div className="hidden lg:block">
                <img
                  src="/images/industry-automotive.jpg"
                  alt="Automotive parts warehouse with organised shelving of engine components and brake systems"
                  className="rounded-2xl shadow-lg w-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ====== SERVICE SCOPE ====== */}
        <section aria-labelledby="services-heading" className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">What We Offer</span>
              <h2 id="services-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3">
                Automotive Freight Services
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Wrench, title: 'OEM Parts', desc: 'Precision delivery of original equipment manufacturer parts to assembly plants and tier-1 suppliers.' },
                { icon: Car, title: 'Aftermarket Components', desc: 'Distribution of replacement parts, upgrades, and performance components to wholesalers and garages.' },
                { icon: Package, title: 'Tyres & Batteries', desc: 'Specialist handling for bulk tyre shipments and dangerous goods transport for lead-acid and lithium batteries.' },
                { icon: Box, title: 'Accessories', desc: 'Freight for car care, interior accessories, and electronics with flexible volume options.' },
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
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Cargo Expertise</span>
              <h2 id="cargo-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3">
                Cargo Types We Handle
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
              {[
                { icon: Wrench, label: 'Engine Parts' },
                { icon: Shield, label: 'Brake Systems' },
                { icon: Zap, label: 'Electrical' },
                { icon: Package, label: 'Body Panels' },
                { icon: Box, label: 'Tyres' },
                { icon: Battery, label: 'Batteries' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="bg-white rounded-xl p-5 border border-[#E5E7EB] text-center hover:shadow-sm transition-shadow">
                    <div className="w-10 h-10 bg-[#EBF2FF] rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-5 h-5 text-[#1A6DFF]" aria-hidden="true" />
                    </div>
                    <p className="font-semibold text-[#111827] text-sm">{item.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ====== SHIPPING MODES ====== */}
        <section aria-labelledby="modes-heading" className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Shipping Options</span>
              <h2 id="modes-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3">
                Shipping Modes for Automotive
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { icon: Plane, title: 'Air Freight', time: '3–5 days', desc: 'Urgent parts, prototype components, and critical JIT deliveries to prevent line stoppages.', best: 'Urgent & JIT parts' },
                { icon: Truck, title: 'Road Freight', time: '2–7 days', desc: 'European supplier collections and UK domestic distribution with dedicated and groupage options.', best: 'Europe & UK domestic' },
                { icon: Ship, title: 'Sea Freight', time: '25–35 days', desc: 'Bulk shipments of tyres, batteries, and containerised parts from Asia and the Americas.', best: 'Bulk & non-urgent' },
              ].map((mode, i) => {
                const Icon = mode.icon;
                return (
                  <article key={i} className="bg-[#F8FAFC] rounded-xl p-6 border border-[#E5E7EB] hover:shadow-md transition-shadow">
                    <Icon className="w-8 h-8 text-[#1A6DFF] mb-3" aria-hidden="true" />
                    <h3 className="font-bold text-lg text-[#111827] mb-1">{mode.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-green-600 font-medium mb-3">
                      <Clock className="w-4 h-4" aria-hidden="true" />
                      <span>{mode.time}</span>
                    </div>
                    <p className="text-[#4B5563] text-sm leading-relaxed mb-3">{mode.desc}</p>
                    <p className="text-xs text-[#9CA3AF] uppercase tracking-wider font-medium">Best for: {mode.best}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ====== RELEVANT ROUTES ====== */}
        <section aria-labelledby="routes-heading" className="py-16 md:py-24 bg-[#EFF6FF]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Popular Routes</span>
              <h2 id="routes-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3">
                Automotive Supply Routes to the UK
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { origin: 'Stuttgart', dest: 'Birmingham', mode: 'Road', time: '3–5 days' },
                { origin: 'Istanbul', dest: 'London Gateway', mode: 'Road', time: '5–7 days' },
                { origin: 'Shanghai', dest: 'Felixstowe', mode: 'Sea', time: '25–35 days' },
                { origin: 'Detroit', dest: 'Southampton', mode: 'Air', time: '3–5 days' },
              ].map((route, i) => (
                <article key={i} className="bg-white rounded-xl p-6 border border-[#E5E7EB] hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-semibold text-[#111827]">{route.origin}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#9CA3AF]" aria-hidden="true" />
                    <div className="text-right">
                      <p className="font-semibold text-[#111827]">{route.dest}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-[#4B5563]">
                    <span className="inline-flex items-center gap-1.5 bg-brand-50 text-brand-700 px-2.5 py-1 rounded-full text-xs font-medium">
                      {route.mode}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#1A6DFF]" aria-hidden="true" />
                      {route.time}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ====== CASE STUDY ====== */}
        <section aria-labelledby="case-study-heading" className="py-16 md:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Case Study</span>
              <h2 id="case-study-heading" className="text-3xl font-bold text-[#111827] mt-3">
                Real Results for Automotive Clients
              </h2>
            </div>
            <div className="bg-[#F8FAFC] rounded-xl p-8 border border-[#E5E7EB]">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-[#EBF2FF] rounded-full flex items-center justify-center flex-shrink-0">
                  <Car className="w-6 h-6 text-[#1A6DFF]" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#111827] mb-1">Aftermarket Distributor — 18% Cost Cut on Turkey-UK Lane</h3>
                  <p className="text-[#4B5563] text-sm">UK aftermarket parts distributor importing brake pads, filters, and electrical components from Turkey</p>
                </div>
              </div>
              <blockquote className="text-[#4B5563] leading-relaxed italic border-l-4 border-[#1A6DFF] pl-4 mb-6">
                &ldquo;Carrgo consolidated our weekly Turkey shipments into a single FTL service. We cut transport costs by 18%, reduced handling damage, and gained full visibility on every load from Istanbul to our Midlands warehouse.&rdquo;
              </blockquote>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 border border-[#E5E7EB] text-center">
                  <p className="text-2xl font-bold text-[#1A6DFF]">18%</p>
                  <p className="text-sm text-[#4B5563]">Cost reduction</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-[#E5E7EB] text-center">
                  <p className="text-2xl font-bold text-[#1A6DFF]">FTL</p>
                  <p className="text-sm text-[#4B5563]">Consolidation model</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-[#E5E7EB] text-center">
                  <p className="text-2xl font-bold text-[#1A6DFF]">Full</p>
                  <p className="text-sm text-[#4B5563]">Shipment visibility</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====== FAQ ====== */}
        <section aria-labelledby="faq-heading" className="py-16 md:py-24 bg-[#F8FAFC]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">FAQ</span>
              <h2 id="faq-heading" className="text-3xl font-bold text-[#111827] mt-3">
                Automotive Freight FAQ
              </h2>
            </div>
            <FaqAccordion />
          </div>
        </section>

        {/* ====== CTA BANNER ====== */}
        <section aria-label="Get an automotive freight quote" className="py-16 md:py-24 bg-[#1A6DFF]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Precision Logistics for Automotive Parts
            </h2>
            <p className="text-white/85 text-lg mb-8 max-w-2xl mx-auto">
              Get a quote for OEM parts, aftermarket components, and urgent shipments. JIT scheduling, dangerous goods handling, and UK customs clearance.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/services/air-freight" className="inline-flex items-center gap-2 bg-white text-[#1A6DFF] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors min-h-[44px]">
                Air Freight <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
              <Link to="/get-a-quote" className="inline-flex items-center gap-2 bg-[#1557CC] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#124DB8] transition-colors min-h-[44px]">
                Get a Quote
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
