import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import {
  ShoppingCart, Package, Box, Ship, Plane, TrainFront,
  Warehouse, ArrowRight, CheckCircle, ChevronDown,
  Clock, Shield, Globe, Sofa, Shirt, Pill
} from 'lucide-react';

/* ── JSON-LD Structured Data ── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Ecommerce & Amazon FBA Freight Forwarding',
  provider: { '@type': 'Organization', name: 'Carrgo Freight Solutions Ltd' },
  areaServed: { '@type': 'Country', name: 'United Kingdom' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Ecommerce Freight Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Amazon FBA Prep & Delivery' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Multi-Channel Fulfilment' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Reverse Logistics' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Inventory Management' } },
    ],
  },
};

const faqData = [
  { q: 'Do you handle Amazon FBA prep?', a: 'Yes — we offer full Amazon FBA prep services including labelling, poly-bagging, carton labelling, palletisation, and compliance checks. We deliver directly to Amazon fulfilment centres including BHX4, EMA1, and LBA1.' },
  { q: 'What is the cheapest way to ship from China to Amazon UK?', a: 'Sea freight is the most cost-effective for high-volume FBA shipments, taking 25–35 days. For a balance of speed and cost, rail freight takes 14–20 days. We help you choose the best mode based on your inventory velocity and budget.' },
  { q: 'How do I avoid Amazon FBA rejection?', a: 'We ensure carton compliance, correct labelling (FNSKU, Made in China, weight labels), proper pallet dimensions, and adherence to Amazon’s inbound requirements. Our prep team follows Amazon’s latest guidelines to minimise rejection risk.' },
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

export default function Ecommerce() {
  return (
    <>
      <Seo
        title="Ecommerce Freight Forwarding UK | Amazon FBA & Online Retail | Carrgo"
        description="Ecommerce freight forwarding UK — Amazon FBA prep, multi-channel fulfilment, and online retail shipping. FBA delivery to BHX4, EMA1, LBA1. Sea, air & rail from China."
        keywords="ecommerce freight forwarding, amazon fba freight, fba prep uk, ship to amazon uk, china to amazon fba, ecommerce shipping uk, online retail logistics"
        ogUrl="https://carrgo.co.uk/industries/ecommerce"
        canonical="https://carrgo.co.uk/industries/ecommerce"
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
                  Ecommerce & Amazon FBA Freight Forwarding
                </h1>
                <p className="text-lg text-[#4B5563] mb-8 leading-relaxed">
                  Ecommerce businesses need fast, reliable freight. Carrgo handles FBA prep, labelling, carton compliance, and delivery to Amazon BHX4, EMA1, LBA1 — so you can focus on growing your online store.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    'Full Amazon FBA prep, labelling & carton compliance',
                    'Delivery to all major UK Amazon fulfilment centres',
                    'Multi-channel fulfilment & reverse logistics',
                    'Sea, air & rail shipping from China, India & Europe',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#4B5563]">
                      <CheckCircle className="w-5 h-5 text-[#22C55E] flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-4">
                  <Link to="/services/amazon-fba-freight" className="inline-flex items-center gap-2 bg-[#1A6DFF] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1557CC] transition-colors min-h-[44px]">
                    Amazon FBA Service <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                  <Link to="/get-a-quote" className="inline-flex items-center gap-2 bg-white text-[#4B5563] border border-[#E5E7EB] px-6 py-3 rounded-lg font-semibold hover:bg-[#F8FAFC] transition-colors min-h-[44px]">
                    Get a Quote
                  </Link>
                </div>
              </div>
              <div className="hidden lg:block">
                <img
                  src="/images/industry-ecommerce.jpg"
                  alt="Warehouse worker packing ecommerce orders for Amazon FBA shipment"
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
                Ecommerce Freight Services
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Package, title: 'FBA Shipping', desc: 'End-to-end Amazon FBA forwarding from supplier to fulfilment centre with full prep and compliance.' },
                { icon: Globe, title: 'Multi-Channel Fulfilment', desc: 'Ship to Amazon, Shopify, eBay, and your own warehouse from a single consolidated supply chain.' },
                { icon: Box, title: 'Reverse Logistics', desc: 'Returns management, refurbishment coordination, and redistribution to minimise losses.' },
                { icon: Warehouse, title: 'Inventory Management', desc: 'Stock tracking, replenishment planning, and split shipment strategies to avoid stockouts.' },
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
                { icon: Package, label: 'Electronics' },
                { icon: Sofa, label: 'Homeware' },
                { icon: Box, label: 'Toys' },
                { icon: Shirt, label: 'Apparel' },
                { icon: Pill, label: 'Health & Beauty' },
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
                Shipping Modes for Ecommerce
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { icon: Ship, title: 'Sea Freight', time: '25–35 days', desc: 'Most cost-effective for bulk FBA inventory and seasonal stock. FCL and LCL options available.', best: 'High volume, non-urgent' },
                { icon: Plane, title: 'Air Freight', time: '3–5 days', desc: 'Express delivery for fast-selling SKUs, product launches, and urgent replenishment.', best: 'Urgent or high-value items' },
                { icon: TrainFront, title: 'Rail Freight', time: '14–20 days', desc: 'The middle ground — faster than sea, cheaper than air. Ideal for regular restocking.', best: 'Regular restocking' },
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
                Ecommerce Shipping Routes to the UK
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { origin: 'Shanghai', dest: 'Felixstowe / BHX4', mode: 'Sea', time: '25–35 days' },
                { origin: 'Shenzhen', dest: 'London Gateway', mode: 'Air', time: '3–5 days' },
                { origin: 'Yiwu', dest: 'Birmingham / EMA1', mode: 'Rail', time: '14–20 days' },
                { origin: 'Mumbai', dest: 'Southampton', mode: 'Sea', time: '21–28 days' },
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
                Real Results for Ecommerce Clients
              </h2>
            </div>
            <div className="bg-[#F8FAFC] rounded-xl p-8 border border-[#E5E7EB]">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-[#EBF2FF] rounded-full flex items-center justify-center flex-shrink-0">
                  <ShoppingCart className="w-6 h-6 text-[#1A6DFF]" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#111827] mb-1">UK Ecommerce Brand — 23% Cost Reduction</h3>
                  <p className="text-[#4B5563] text-sm">Amazon FBA seller importing electronics and homeware from China</p>
                </div>
              </div>
              <blockquote className="text-[#4B5563] leading-relaxed italic border-l-4 border-[#1A6DFF] pl-4 mb-6">
                &ldquo;Carrgo helped us switch from air freight to rail for our regular China imports. We cut shipping costs by 23% while maintaining consistent stock levels at Amazon. Their FBA prep service saved us hours every week.&rdquo;
              </blockquote>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 border border-[#E5E7EB] text-center">
                  <p className="text-2xl font-bold text-[#1A6DFF]">23%</p>
                  <p className="text-sm text-[#4B5563]">Cost reduction</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-[#E5E7EB] text-center">
                  <p className="text-2xl font-bold text-[#1A6DFF]">14–20</p>
                  <p className="text-sm text-[#4B5563]">Days via rail</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-[#E5E7EB] text-center">
                  <p className="text-2xl font-bold text-[#1A6DFF]">Zero</p>
                  <p className="text-sm text-[#4B5563]">FBA rejections</p>
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
                Ecommerce Freight FAQ
              </h2>
            </div>
            <FaqAccordion />
          </div>
        </section>

        {/* ====== CTA BANNER ====== */}
        <section aria-label="Get an ecommerce freight quote" className="py-16 md:py-24 bg-[#1A6DFF]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Streamline Your Ecommerce Supply Chain?
            </h2>
            <p className="text-white/85 text-lg mb-8 max-w-2xl mx-auto">
              Get a tailored freight quote for Amazon FBA and multi-channel fulfilment. We handle prep, compliance, and delivery.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/services/amazon-fba-freight" className="inline-flex items-center gap-2 bg-white text-[#1A6DFF] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors min-h-[44px]">
                Amazon FBA Service <ArrowRight className="w-5 h-5" aria-hidden="true" />
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
