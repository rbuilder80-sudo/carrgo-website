import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import {
  Ship, Truck, TrainFront, Hammer, ArrowRight, CheckCircle,
  ChevronDown, Shield, Clock, MapPin, Warehouse
} from 'lucide-react';

/* ── JSON-LD Structured Data ── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Construction Materials Freight Forwarding UK — Building Supplies | Carrgo',
  provider: { '@type': 'Organization', name: 'Carrgo Freight Solutions Ltd' },
  areaServed: { '@type': 'Country', name: 'United Kingdom' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Construction Materials Freight Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Sea Freight (FCL) for Bulk Materials' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Road Freight from Europe' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Rail Freight from China' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'UK Customs Clearance for Steel & Ceramics' } },
    ],
  },
};

const faqData = [
  { q: 'Can you ship heavy construction materials?', a: 'Yes — we handle heavy, bulky construction materials including structural steel, concrete products, tiles, and timber. FCL sea freight is typically the most cost-effective option for large volumes, while road freight works well for European suppliers.' },
  { q: 'What is the cheapest way to import tiles from Turkey?', a: 'Sea freight (FCL or LCL depending on volume) from Turkish ports such as Mersin or Izmir, combined with road delivery to your UK site or depot, is the most economical option. Switching from air to sea + road can save up to 60% on shipping costs.' },
  { q: 'Do I need special documentation for steel imports?', a: 'Steel imports may require UKCA marking compliance, mill test certificates, and origin certificates for anti-dumping duty assessment. Our customs brokers handle all documentation and ensure compliance with UK regulations.' },
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

export default function Construction() {
  return (
    <>
      <Seo
        title="Construction Materials Freight Forwarding UK | Building Supplies | Carrgo"
        description="Freight forwarding for construction materials — steel, tiles, ceramics, fixtures, tools. FCL, road and rail shipping to UK sites. Get a quote."
        keywords="construction freight forwarding, building materials shipping, steel import UK, tile freight Turkey, construction cargo"
        ogUrl="https://carrgo.co.uk/industries/construction"
        canonical="https://carrgo.co.uk/industries/construction"
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
                  Construction Materials Freight Forwarding
                </h1>
                <p className="text-lg text-[#4B5563] mb-8 leading-relaxed">
                  Heavy, bulky construction materials shipped to site or depot. From structural steel and tiles to fixtures and tools — we manage the entire supply chain with cost-effective sea, road, and rail solutions.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    'FCL sea freight for bulk tiles, steel, and concrete products',
                    'Road freight from Turkey and Europe for just-in-time delivery',
                    'Rail freight from China for cost-effective heavy cargo',
                    'UK customs clearance and site delivery included',
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
                  src="/images/industry-construction.jpg"
                  alt="Construction materials including steel beams and tiles being loaded for shipping"
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
                Service Scope for Construction Materials
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Hammer, title: 'Structural Steel', desc: 'Beams, rebar, and fabricated steel with proper lashing and load securing for safe transit.' },
                { icon: Warehouse, title: 'Tiles & Ceramics', desc: 'Palletised and crated tile shipments from Turkey, Spain, Italy, and China with damage prevention.' },
                { icon: Shield, title: 'Sanitary Ware & Fixtures', desc: 'Sinks, toilets, baths, and plumbing fixtures handled with care to prevent chipping and cracking.' },
                { icon: Truck, title: 'Tools & Equipment', desc: 'Power tools, scaffolding, and site equipment shipped via sea or road depending on urgency.' },
                { icon: Ship, title: 'Bulk FCL Shipments', desc: 'Full container loads for large construction projects with dedicated container space.' },
                { icon: Clock, title: 'Just-in-Time Delivery', desc: 'Scheduled deliveries aligned with your construction programme to reduce on-site storage.' },
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
                Construction Cargo We Ship
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {[
                'Tiles & ceramics',
                'Structural steel',
                'Concrete products',
                'Sanitary ware & fixtures',
                'Timber & plywood',
                'Power tools & hand tools',
                'Scaffolding & formwork',
                'Roofing materials',
                'Insulation & drywall',
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
                Our Construction Shipping Process
              </h2>
            </div>
            <ol className="grid md:grid-cols-4 gap-8 relative">
              {[
                { step: '1', title: 'Quote Request', desc: 'Share your cargo list, origin, and destination — we assess volume and weight' },
                { step: '2', title: 'Mode Selection', desc: 'We recommend sea, road, or rail based on cost, speed, and cargo type' },
                { step: '3', title: 'Booking & Docs', desc: 'We book cargo space and prepare customs documentation' },
                { step: '4', title: 'Delivery to Site', desc: 'Cleared cargo delivered to your depot or directly to the construction site' },
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
                Construction Material Routes to the UK
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { origin: 'Mersin, Turkey', port: 'Felixstowe', mode: 'Sea + Road', time: '18–24 days' },
                { origin: 'Izmir, Turkey', port: 'Southampton', mode: 'Sea', time: '20–26 days' },
                { origin: 'Shanghai, China', port: 'London Gateway', mode: 'Sea / Rail', time: '24–35 days' },
                { origin: 'Alicante, Spain', port: 'Dover', mode: 'Road', time: '3–5 days' },
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
                Builder Merchant Saves £12,000/Year
              </h2>
              <p className="text-[#4B5563] text-lg leading-relaxed mb-8">
                A UK builder merchant importing tiles and ceramics from Turkey was using air freight for urgent restocks, paying premium rates. We switched their regular shipments to a combined sea + road model with strategic buffer stock. The result: a <strong>£12,000 annual saving</strong> on freight costs, more predictable lead times, and zero stockouts during peak season.
              </p>
              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-white rounded-xl p-5 border border-[#E5E7EB]">
                  <p className="text-2xl font-bold text-[#1A6DFF]">£12K</p>
                  <p className="text-sm text-[#4B5563]">Annual freight savings</p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-[#E5E7EB]">
                  <p className="text-2xl font-bold text-[#1A6DFF]">0%</p>
                  <p className="text-sm text-[#4B5563]">Stockout rate in peak season</p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-[#E5E7EB]">
                  <p className="text-2xl font-bold text-[#1A6DFF]">Sea + Road</p>
                  <p className="text-sm text-[#4B5563]">Optimal mode combination</p>
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
                Construction Freight FAQ
              </h2>
            </div>
            <FaqAccordion />
          </div>
        </section>

        {/* ====== CTA BANNER ====== */}
        <section aria-label="Get a construction freight quote" className="py-16 md:py-24 bg-[#1A6DFF]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ship Your Construction Materials with Carrgo
            </h2>
            <p className="text-white/85 text-lg mb-8 max-w-2xl mx-auto">
              From tiles and steel to fixtures and tools — get a tailored freight quote for your construction supply chain.
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
