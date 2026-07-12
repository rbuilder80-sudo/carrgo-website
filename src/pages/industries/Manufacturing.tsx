import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import {
  Factory, Wrench, Ship, Plane, Truck, TrainFront,
  Package, Box, ArrowRight, CheckCircle, ChevronDown,
  Clock, Shield, Globe, Hammer, Cpu, Car, Shirt, FileCheck
} from 'lucide-react';

/* ── JSON-LD Structured Data ── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Manufacturing Freight Forwarding — Raw Materials to Finished Goods',
  provider: { '@type': 'Organization', name: 'Carrgo Freight Solutions Ltd' },
  areaServed: { '@type': 'Country', name: 'United Kingdom' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Manufacturing Freight Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Component Shipping' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Raw Materials Freight' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Machinery Transport' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Spare Parts & MRO Logistics' } },
    ],
  },
};

const faqData = [
  { q: 'How do I ship raw materials from China?', a: 'Sea freight is the most economical option for bulk raw materials from China, with transit times of 25–35 days. For urgent production needs, air freight delivers in 3–5 days. We handle all documentation, customs clearance, and inland delivery to your factory.' },
  { q: 'Can you handle just-in-time delivery?', a: 'Yes — we specialise in JIT logistics for UK manufacturers. Our team coordinates precise delivery windows, scheduled shipments, and real-time tracking to ensure production line continuity without excess inventory.' },
  { q: 'What Incoterm is best for manufacturing imports?', a: 'FOB (Free On Board) is popular for manufacturing imports as it gives you control over the ocean freight and insurance. DDP (Delivered Duty Paid) is ideal if you want us to handle everything from factory to your door. We advise based on your supply chain setup.' },
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

export default function Manufacturing() {
  return (
    <>
      <Seo
        title="Manufacturing Freight Forwarding UK | Raw Materials & Components | Carrgo"
        description="Manufacturing freight forwarding UK — raw materials, components, machinery, and spare parts. Just-in-time delivery, sea, air, road & rail. Keep your production line moving."
        keywords="manufacturing freight forwarding, raw materials shipping uk, component logistics, just in time delivery, factory supply chain, machinery transport uk"
        ogUrl="https://carrgo.co.uk/industries/manufacturing"
        canonical="https://carrgo.co.uk/industries/manufacturing"
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
                  Manufacturing Freight Forwarding — Raw Materials to Finished Goods
                </h1>
                <p className="text-lg text-[#4B5563] mb-8 leading-relaxed">
                  Just-in-time parts delivery, raw materials, and production line continuity. Carrgo keeps UK manufacturers moving with reliable freight for components, machinery, and MRO supplies.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    'Just-in-time component delivery to factory floor',
                    'Raw materials, steel, plastics & electronics shipping',
                    'Machinery & spare parts logistics',
                    'Sea, air, road & rail options from global suppliers',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#4B5563]">
                      <CheckCircle className="w-5 h-5 text-[#22C55E] flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-4">
                  <Link to="/services/sea-freight" className="inline-flex items-center gap-2 bg-[#1A6DFF] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1557CC] transition-colors min-h-[44px]">
                    Sea Freight <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                  <Link to="/get-a-quote" className="inline-flex items-center gap-2 bg-white text-[#4B5563] border border-[#E5E7EB] px-6 py-3 rounded-lg font-semibold hover:bg-[#F8FAFC] transition-colors min-h-[44px]">
                    Get a Quote
                  </Link>
                </div>
              </div>
              <div className="hidden lg:block">
                <img
                  src="/images/industry-manufacturing.jpg"
                  alt="Manufacturing factory floor with production line and robotic assembly"
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
                Manufacturing Freight Services
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Wrench, title: 'Component Shipping', desc: 'Precision delivery of production parts and sub-assemblies to keep your line running without interruption.' },
                { icon: Package, title: 'Raw Materials', desc: 'Bulk shipping of steel, plastics, chemicals, and textiles with full documentation and compliance.' },
                { icon: Factory, title: 'Machinery Transport', desc: 'Heavy machinery, production equipment, and line relocations with specialist handling and rigging.' },
                { icon: FileCheck, title: 'Spare Parts & MRO', desc: 'Maintenance, repair, and operations logistics with urgent delivery options for critical parts.' },
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
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
              {[
                { icon: Hammer, label: 'Steel' },
                { icon: Package, label: 'Plastics' },
                { icon: Cpu, label: 'Electronics' },
                { icon: Car, label: 'Automotive Parts' },
                { icon: Shirt, label: 'Textiles' },
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
                Shipping Modes for Manufacturing
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Ship, title: 'Sea Freight', time: '25–35 days', desc: 'Bulk raw materials and heavy machinery. FCL for volume, LCL for smaller batches.', best: 'Bulk raw materials' },
                { icon: Plane, title: 'Air Freight', time: '3–5 days', desc: 'Urgent components, prototypes, and critical spare parts to prevent line stoppage.', best: 'Urgent parts & prototypes' },
                { icon: Truck, title: 'Road Freight', time: '2–7 days', desc: 'European supplier collections and JIT deliveries to UK factories.', best: 'Europe & UK domestic' },
                { icon: TrainFront, title: 'Rail Freight', time: '14–20 days', desc: 'Reliable mid-speed option for regular component shipments from China.', best: 'Regular China imports' },
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
                Manufacturing Supply Routes to the UK
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { origin: 'Shanghai', dest: 'Felixstowe', mode: 'Sea', time: '25–35 days' },
                { origin: 'Stuttgart', dest: 'Birmingham', mode: 'Road', time: '3–5 days' },
                { origin: 'Shenzhen', dest: 'London Gateway', mode: 'Air', time: '3–5 days' },
                { origin: 'Warsaw', dest: 'Manchester', mode: 'Road', time: '4–6 days' },
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
                Real Results for Manufacturing Clients
              </h2>
            </div>
            <div className="bg-[#F8FAFC] rounded-xl p-8 border border-[#E5E7EB]">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-[#EBF2FF] rounded-full flex items-center justify-center flex-shrink-0">
                  <Factory className="w-6 h-6 text-[#1A6DFF]" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#111827] mb-1">Automotive Supplier — 40% Lead Time Reduction</h3>
                  <p className="text-[#4B5563] text-sm">Tier-2 automotive parts supplier importing weekly from Germany</p>
                </div>
              </div>
              <blockquote className="text-[#4B5563] leading-relaxed italic border-l-4 border-[#1A6DFF] pl-4 mb-6">
                &ldquo;Carrgo set up a weekly consolidation service from our German suppliers. Lead times dropped by 40% and we eliminated the stock shortages that were halting our production line twice a month.&rdquo;
              </blockquote>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 border border-[#E5E7EB] text-center">
                  <p className="text-2xl font-bold text-[#1A6DFF]">40%</p>
                  <p className="text-sm text-[#4B5563]">Lead time reduction</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-[#E5E7EB] text-center">
                  <p className="text-2xl font-bold text-[#1A6DFF]">Weekly</p>
                  <p className="text-sm text-[#4B5563]">Consolidation</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-[#E5E7EB] text-center">
                  <p className="text-2xl font-bold text-[#1A6DFF]">Zero</p>
                  <p className="text-sm text-[#4B5563]">Production stoppages</p>
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
                Manufacturing Freight FAQ
              </h2>
            </div>
            <FaqAccordion />
          </div>
        </section>

        {/* ====== CTA BANNER ====== */}
        <section aria-label="Get a manufacturing freight quote" className="py-16 md:py-24 bg-[#1A6DFF]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Keep Your Production Line Moving
            </h2>
            <p className="text-white/85 text-lg mb-8 max-w-2xl mx-auto">
              Get a tailored freight quote for raw materials, components, and spare parts. JIT delivery, global coverage, UK customs clearance included.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/services/sea-freight" className="inline-flex items-center gap-2 bg-white text-[#1A6DFF] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors min-h-[44px]">
                Sea Freight <ArrowRight className="w-5 h-5" aria-hidden="true" />
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
