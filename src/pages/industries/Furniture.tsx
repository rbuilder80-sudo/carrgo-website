import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import {
  Ship, Truck, TrainFront, Sofa, Package, Shield, ArrowRight,
  CheckCircle, ChevronDown, Clock, MapPin, Warehouse
} from 'lucide-react';

/* ── JSON-LD Structured Data ── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Furniture Freight Forwarding UK — Flat-Pack & Upholstered | Carrgo',
  provider: { '@type': 'Organization', name: 'Carrgo Freight Solutions Ltd' },
  areaServed: { '@type': 'Country', name: 'United Kingdom' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Furniture Freight Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Sea Freight FCL/LCL for Furniture' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Road Freight from Europe' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Rail Freight from China' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Showroom & Warehouse Delivery' } },
    ],
  },
};

const faqData = [
  { q: 'How do I ship furniture from China?', a: 'Furniture from China is typically shipped by sea (FCL for full container loads, LCL for smaller volumes) or by rail via the New Silk Road. Sea freight takes 24–35 days, while rail cuts this to 14–20 days. We handle collection from your supplier, export clearance, ocean/rail freight, UK customs, and final delivery to your warehouse or showroom.' },
  { q: 'What is the best shipping mode for flat-pack furniture?', a: 'Flat-pack furniture is ideal for FCL sea freight because it can be efficiently packed into containers with minimal wasted space. For smaller volumes, LCL groupage is cost-effective. Rail freight from China is a good middle-ground option when you need faster transit than sea but want to avoid air freight costs.' },
  { q: 'How do I protect upholstered furniture during shipping?', a: 'Upholstered furniture requires protective wrapping (bubble wrap or foam), corner guards, and sometimes wooden crating for high-value pieces. We recommend using moisture-barrier materials and silica gel packs to prevent mould during long sea voyages. Our team can arrange professional packing at origin if needed.' },
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

export default function Furniture() {
  return (
    <>
      <Seo
        title="Furniture Freight Forwarding UK | Flat-Pack & Upholstered | Carrgo"
        description="Freight forwarding for furniture — flat-pack, upholstered, office, and bespoke. Sea, road, and rail shipping with careful handling. Get a quote."
        keywords="furniture freight forwarding, flat pack shipping, furniture import UK, sofa shipping, China furniture freight"
        ogUrl="https://carrgo.co.uk/industries/furniture"
        canonical="https://carrgo.co.uk/industries/furniture"
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
                  Furniture Freight Forwarding — Flat-Pack, Upholstered & Bespoke
                </h1>
                <p className="text-lg text-[#4B5563] mb-8 leading-relaxed">
                  Careful handling, proper stacking, and showroom or warehouse delivery for furniture of all types. From flat-pack to upholstered and bespoke — we protect your products and your reputation.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    'FCL and LCL sea freight for furniture volumes of any size',
                    'Protective packaging, stacking plans, and damage prevention',
                    'Road freight from Europe and rail freight from China',
                    'Delivery to warehouse, showroom, or directly to customer',
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
                  <Link to="/services/sea-freight" className="inline-flex items-center gap-2 bg-white text-[#4B5563] border border-[#E5E7EB] px-6 py-3 rounded-lg font-semibold hover:bg-[#F8FAFC] transition-colors min-h-[44px]">
                    Sea Freight Services
                  </Link>
                </div>
              </div>
              <div className="hidden lg:block">
                <img
                  src="/images/industry-furniture.jpg"
                  alt="Furniture items carefully packed and loaded for international shipping"
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
                Service Scope for Furniture
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Package, title: 'Flat-Pack Furniture', desc: 'IKEA-style flat-pack items stacked efficiently in containers to maximise space and minimise freight cost per unit.' },
                { icon: Sofa, title: 'Upholstered Goods', desc: 'Sofas, armchairs, and mattresses with protective wrapping, corner guards, and moisture barriers.' },
                { icon: Warehouse, title: 'Office Furniture', desc: 'Desks, chairs, shelving, and partitions delivered to commercial premises or storage facilities.' },
                { icon: Shield, title: 'Damage Prevention', desc: 'Custom crating, stacking plans, and container loading supervision to reduce in-transit damage.' },
                { icon: Ship, title: 'FCL & LCL Options', desc: 'Full container loads for large orders; less-than-container loads for smaller, mixed SKU shipments.' },
                { icon: MapPin, title: 'Showroom Delivery', desc: 'White-glove delivery options to retail showrooms with unpacking and placement services.' },
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
                Furniture Cargo We Ship
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {[
                'Flat-pack furniture',
                'Sofas & armchairs',
                'Mattresses & bed frames',
                'Office chairs & desks',
                'Dining tables & sets',
                'Outdoor furniture',
                'Wardrobes & storage units',
                'Bespoke & custom pieces',
                'Mirrors & glass furniture',
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
                Our Furniture Shipping Process
              </h2>
            </div>
            <ol className="grid md:grid-cols-4 gap-8 relative">
              {[
                { step: '1', title: 'Quote Request', desc: 'Share product types, dimensions, quantities, and origin for an all-inclusive quote' },
                { step: '2', title: 'Packing Plan', desc: 'We advise on protective wrapping, stacking configuration, and container loading' },
                { step: '3', title: 'Book & Ship', desc: 'Cargo space booked, goods collected, and shipped by sea, rail, or road' },
                { step: '4', title: 'Deliver & Inspect', desc: 'UK customs cleared and delivered to your warehouse, showroom, or customer' },
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
                Furniture Routes to the UK
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { origin: 'Dongguan, China', port: 'Felixstowe', mode: 'Sea FCL', time: '24–30 days' },
                { origin: 'Dongguan, China', port: 'London', mode: 'Rail', time: '14–20 days' },
                { origin: 'Bursa, Turkey', port: 'Southampton', mode: 'Sea + Road', time: '18–24 days' },
                { origin: 'Gdansk, Poland', port: 'Dover', mode: 'Road', time: '3–5 days' },
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
                Damage Rate Slashed from 8% to 1.5%
              </h2>
              <p className="text-[#4B5563] text-lg leading-relaxed mb-8">
                A furniture retailer importing from China was experiencing an <strong>8% damage rate</strong> due to poor packaging and loose loading. We introduced <strong>improved corner protection, strapping protocols, and supplier consolidation</strong> at origin. Within six months, the damage rate dropped to <strong>1.5%</strong>, saving thousands in replacements and improving customer satisfaction scores.
              </p>
              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-white rounded-xl p-5 border border-[#E5E7EB]">
                  <p className="text-2xl font-bold text-[#1A6DFF]">1.5%</p>
                  <p className="text-sm text-[#4B5563]">New damage rate</p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-[#E5E7EB]">
                  <p className="text-2xl font-bold text-[#1A6DFF]">8% → 1.5%</p>
                  <p className="text-sm text-[#4B5563]">Damage reduction</p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-[#E5E7EB]">
                  <p className="text-2xl font-bold text-[#1A6DFF]">Consolidation</p>
                  <p className="text-sm text-[#4B5563]">Key improvement</p>
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
                Furniture Freight FAQ
              </h2>
            </div>
            <FaqAccordion />
          </div>
        </section>

        {/* ====== CTA BANNER ====== */}
        <section aria-label="Get a furniture freight quote" className="py-16 md:py-24 bg-[#1A6DFF]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ship Your Furniture with Carrgo
            </h2>
            <p className="text-white/85 text-lg mb-8 max-w-2xl mx-auto">
              From flat-pack to bespoke — careful handling, proper packaging, and reliable delivery for the furniture trade.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/get-a-quote" className="inline-flex items-center gap-2 bg-white text-[#1A6DFF] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors min-h-[44px]">
                Get a Quote <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
              <Link to="/services/sea-freight" className="inline-flex items-center gap-2 bg-[#1557CC] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#124DB8] transition-colors min-h-[44px]">
                Explore Sea Freight
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
