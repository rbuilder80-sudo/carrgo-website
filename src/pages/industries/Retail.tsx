import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import {
  Shirt, Package, Box, Ship, Plane, Truck,
  ArrowRight, CheckCircle, ChevronDown,
  Clock, Shield, Globe, Sofa, Hammer, Pill
} from 'lucide-react';

/* ── JSON-LD Structured Data ── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Retail Freight Forwarding — Seasonal Stock & Wholesale Imports',
  provider: { '@type': 'Organization', name: 'Carrgo Freight Solutions Ltd' },
  areaServed: { '@type': 'Country', name: 'United Kingdom' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Retail Freight Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Seasonal Collections Shipping' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Wholesale Imports' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Store Replenishment' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Promotional Stock Logistics' } },
    ],
  },
};

const faqData = [
  { q: 'How early should I book sea freight for Christmas stock?', a: 'For Christmas and Q4 seasonal stock, we recommend booking sea freight by July–August to allow 25–35 days transit plus UK customs clearance and inland delivery. This ensures your stock is in the warehouse by October, ready for the sales rush.' },
  { q: 'Can you handle split shipments?', a: 'Absolutely — split shipments are a core part of our retail logistics service. We can send bulk inventory by sea while air-shipping top-selling lines, ensuring you have fast-selling SKUs in stock while the main shipment is en route.' },
  { q: 'What is the best shipping mode for fashion?', a: 'Sea freight is best for bulk seasonal collections. Air freight is ideal for fast fashion restocks and last-minute trend pieces. Road freight works well for European suppliers. We recommend a blended strategy to balance speed and cost.' },
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

export default function Retail() {
  return (
    <>
      <Seo
        title="Retail Freight Forwarding UK | Seasonal Stock & Wholesale Imports | Carrgo"
        description="Retail freight forwarding UK — seasonal stock, wholesale imports, and store replenishment. Sea, air & road freight for fashion, homeware, and toys. Split shipments available."
        keywords="retail freight forwarding, seasonal stock shipping, wholesale imports uk, fashion logistics, store replenishment, christmas stock freight"
        ogUrl="https://carrgo.co.uk/industries/retail"
        canonical="https://carrgo.co.uk/industries/retail"
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
                  Retail Freight Forwarding — Seasonal Stock & Wholesale Imports
                </h1>
                <p className="text-lg text-[#4B5563] mb-8 leading-relaxed">
                  Seasonal timing, bulk imports, and distribution centre delivery. Carrgo helps retailers meet demand with flexible shipping strategies, split shipments, and reliable fulfilment.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    'Seasonal collections shipped on time, every time',
                    'Split shipments — sea for volume, air for speed',
                    'Wholesale imports & store replenishment',
                    'Delivery to UK distribution centres and 3PLs',
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
                  src="/images/industry-retail.jpg"
                  alt="Retail warehouse with racks of clothing and seasonal stock ready for distribution"
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
                Retail Freight Services
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Shirt, title: 'Seasonal Collections', desc: 'Timely shipping for spring/summer and autumn/winter launches with deadline-driven scheduling.' },
                { icon: Package, title: 'Wholesale Imports', desc: 'Bulk freight for retail buyers and distributors with carton-level tracking and compliance.' },
                { icon: Box, title: 'Store Replenishment', desc: 'Regular restocking of fast-moving lines to keep shelves full and avoid lost sales.' },
                { icon: Globe, title: 'Promotional Stock', desc: 'Event and sale-specific shipments with rapid turnaround for flash sales and Black Friday.' },
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
                { icon: Shirt, label: 'Clothing' },
                { icon: Package, label: 'Footwear' },
                { icon: Sofa, label: 'Homeware' },
                { icon: Box, label: 'Toys' },
                { icon: Hammer, label: 'Seasonal Decorations' },
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
                Shipping Modes for Retail
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { icon: Ship, title: 'Sea Freight', time: '25–35 days', desc: 'The most economical choice for bulk seasonal stock and wholesale orders. FCL and LCL available.', best: 'Volume & seasonal stock' },
                { icon: Plane, title: 'Air Freight', time: '3–5 days', desc: 'Fast fashion restocks, trend-responsive lines, and last-minute top-up shipments.', best: 'Fast fashion & urgency' },
                { icon: Truck, title: 'Road Freight', time: '2–7 days', desc: 'Reliable European supplier collections and UK domestic distribution.', best: 'Europe & UK routes' },
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
                Retail Shipping Routes to the UK
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { origin: 'Istanbul', dest: 'London Gateway', mode: 'Road', time: '5–7 days' },
                { origin: 'Shanghai', dest: 'Felixstowe', mode: 'Sea', time: '25–35 days' },
                { origin: 'Milan', dest: 'Birmingham', mode: 'Road', time: '3–4 days' },
                { origin: 'Dhaka', dest: 'Southampton', mode: 'Sea', time: '28–35 days' },
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
                Real Results for Retail Clients
              </h2>
            </div>
            <div className="bg-[#F8FAFC] rounded-xl p-8 border border-[#E5E7EB]">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-[#EBF2FF] rounded-full flex items-center justify-center flex-shrink-0">
                  <Shirt className="w-6 h-6 text-[#1A6DFF]" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#111827] mb-1">Fashion Retailer — Q4 Demand Met with Split Shipments</h3>
                  <p className="text-[#4B5563] text-sm">UK fashion brand importing autumn/winter collection from China and Italy</p>
                </div>
              </div>
              <blockquote className="text-[#4B5563] leading-relaxed italic border-l-4 border-[#1A6DFF] pl-4 mb-6">
                &ldquo;Carrgo recommended a split strategy — sea for our bulk winter collection and air for our predicted top sellers. We met Q4 demand without overpaying on freight and avoided stockouts on our best lines.&rdquo;
              </blockquote>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 border border-[#E5E7EB] text-center">
                  <p className="text-2xl font-bold text-[#1A6DFF]">Split</p>
                  <p className="text-sm text-[#4B5563]">Shipment strategy</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-[#E5E7EB] text-center">
                  <p className="text-2xl font-bold text-[#1A6DFF]">100%</p>
                  <p className="text-sm text-[#4B5563]">Q4 stock readiness</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-[#E5E7EB] text-center">
                  <p className="text-2xl font-bold text-[#1A6DFF]">Zero</p>
                  <p className="text-sm text-[#4B5563]">Stockouts on top SKUs</p>
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
                Retail Freight FAQ
              </h2>
            </div>
            <FaqAccordion />
          </div>
        </section>

        {/* ====== CTA BANNER ====== */}
        <section aria-label="Get a retail freight quote" className="py-16 md:py-24 bg-[#1A6DFF]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Get Your Seasonal Stock Moving
            </h2>
            <p className="text-white/85 text-lg mb-8 max-w-2xl mx-auto">
              Book sea, air, or road freight for your retail imports. Split shipments, flexible scheduling, and distribution centre delivery.
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
