import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import {
  Ship, Plane, Truck, TrainFront, FileCheck, Package,
  Warehouse, Globe, ArrowRight, CheckCircle, ChevronDown,
  Clock, Shield, Leaf, BarChart3
} from 'lucide-react';

/* ── JSON-LD Structured Data ── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Rail Freight China to UK — New Silk Road',
  provider: { '@type': 'Organization', name: 'Carrgo Freight Solutions Ltd' },
  areaServed: [
    { '@type': 'Country', name: 'United Kingdom' },
    { '@type': 'Country', name: 'China' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Rail Freight Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'FCL Rail Freight China to UK' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'LCL Rail Freight Groupage' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'New Silk Road Transit' } },
    ],
  },
};

const faqData = [
  { q: 'How long does rail freight from China to the UK take?', a: 'Rail freight from China to the UK takes approximately 14–20 days, depending on the origin city (Shanghai, Yiwu, Shenzhen) and final UK destination. This makes it significantly faster than sea freight (25–35 days) while remaining more economical than air freight.' },
  { q: 'How much does rail freight from China cost compared to sea and air?', a: 'Rail freight typically costs 30–50% less than air freight and approximately 1.5–2x more than sea freight. For many medium-urgency shipments, it offers the optimal balance of speed and cost. Contact us for a detailed all-inclusive quote.' },
  { q: 'Are there cargo restrictions on the China-UK rail route?', a: 'Most general cargo can be shipped by rail including electronics, auto parts, machinery, textiles, and consumer goods. Restricted items include hazardous materials, liquids, and certain perishables. Our team can advise on your specific cargo type.' },
  { q: 'How is cargo tracked during rail transit?', a: 'All rail freight shipments include GPS container tracking with real-time location updates at key transit points including border crossings, transshipment hubs, and arrival at EU/UK terminals.' },
  { q: 'What customs arrangements are needed for rail freight?', a: 'We handle customs clearance at both ends: export customs in China, transit documentation through Kazakhstan, Russia, Belarus and the EU, and UK import declarations via HMRC CDS. All included in our service.' },
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

export default function RailFreight() {
  return (
    <>
      <Seo
        title="Rail Freight China to UK | New Silk Road Shipping | Carrgo"
        description="China-UK rail freight via the New Silk Road. 14-20 days transit, 40% cheaper than air. FCL & LCL from Shanghai, Yiwu & Shenzhen. Get a quote in 2 hours."
        structuredData={[serviceSchema, faqSchema]}
      />
      <main id="main-content">
        {/* ====== HERO ====== */}
        <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-gradient-to-br from-[#EFF6FF] to-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Rail Freight Services</span>
                <h1 id="hero-heading" className="text-3xl lg:text-5xl font-extrabold text-[#111827] leading-tight mt-3 mb-6">
                  Rail Freight China to UK — New Silk Road
                </h1>
                <p className="text-lg text-[#4B5563] mb-8 leading-relaxed">
                  China–UK rail freight via the New Silk Road. Faster than sea freight (14–20 days), 40% cheaper than air cargo. Ideal for medium-urgency shipments from Shanghai, Yiwu, and Shenzhen.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    '14–20 days transit — faster than sea',
                    '40% cheaper than air freight',
                    'Route: China → Kazakhstan → Russia → Belarus → EU → UK',
                    'Ideal for medium-urgency, medium-value cargo',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#4B5563]">
                      <CheckCircle className="w-5 h-5 text-[#22C55E] flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-4">
                  <Link to="/get-a-quote" className="inline-flex items-center gap-2 bg-[#1A6DFF] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1557CC] transition-colors min-h-[44px]">
                    Get a Rail Freight Quote <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                  <a href="tel:+442039505050" className="inline-flex items-center gap-2 bg-white text-[#4B5563] border border-[#E5E7EB] px-6 py-3 rounded-lg font-semibold hover:bg-[#F8FAFC] transition-colors min-h-[44px]">
                    Call Our Team
                  </a>
                </div>
              </div>
              <div className="hidden lg:block">
                <img
                  src="/images/service-rail.jpg"
                  alt="Long China-Europe freight train crossing Asian landscape with mountains"
                  className="rounded-2xl shadow-lg w-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ====== RAIL vs SEA vs AIR ====== */}
        <section aria-labelledby="compare-heading" className="py-16 md:py-24 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Mode Comparison</span>
              <h2 id="compare-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3">
                Rail Freight vs Sea vs Air
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow-sm border border-[#E5E7EB] overflow-hidden">
                <thead>
                  <tr className="bg-[#1A6DFF] text-white">
                    <th scope="col" className="text-left px-6 py-4 font-semibold">Feature</th>
                    <th scope="col" className="text-center px-6 py-4 font-semibold">Rail Freight</th>
                    <th scope="col" className="text-center px-6 py-4 font-semibold">Sea Freight</th>
                    <th scope="col" className="text-center px-6 py-4 font-semibold">Air Freight</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Transit Time', '14–20 days', '25–35 days', '1–5 days'],
                    ['Cost', 'Medium', 'Lowest', 'Highest'],
                    ['Best For', 'Medium urgency', 'Cost-sensitive', 'Time-critical'],
                    ['Capacity', 'High', 'Highest', 'Limited'],
                    ['Environmental Impact', 'Lower CO₂ than air', 'Lowest CO₂', 'Highest CO₂'],
                  ].map(([feat, rail, sea, air], i) => (
                    <tr key={i} className={`border-t border-[#E5E7EB] ${i % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}`}>
                      <td className="px-6 py-4 font-medium text-[#111827]">{feat}</td>
                      <td className="px-6 py-4 text-center text-[#1A6DFF] font-medium">{rail}</td>
                      <td className="px-6 py-4 text-center text-[#4B5563]">{sea}</td>
                      <td className="px-6 py-4 text-center text-[#4B5563]">{air}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ====== ROUTE MAP ====== */}
        <section aria-labelledby="route-heading" className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">The New Silk Road</span>
              <h2 id="route-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3">
                China-UK Rail Freight Route
              </h2>
              <p className="text-[#4B5563] mt-4 max-w-2xl mx-auto">
                The New Silk Road railway connects major Chinese cities to the UK via Central Asia, Russia, Belarus, and the EU.
              </p>
            </div>
            <div className="bg-[#F8FAFC] rounded-2xl p-8 border border-[#E5E7EB]">
              <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
                {[
                  'Shanghai', 'Alashankou', 'Dostyk', 'Moscow', 'Minsk', 'Warsaw', 'Duisburg', 'London',
                ].map((city, i) => (
                  <div key={i} className="flex items-center gap-2 md:gap-4">
                    <div className="text-center">
                      <div className="w-10 h-10 bg-[#1A6DFF] text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto">
                        {i + 1}
                      </div>
                      <p className="text-sm font-semibold text-[#111827] mt-2">{city}</p>
                    </div>
                    {i < 7 && <ArrowRight className="w-5 h-5 text-[#9CA3AF] flex-shrink-0" aria-hidden="true" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ====== PROCESS ====== */}
        <section aria-labelledby="process-heading" className="py-16 md:py-24 bg-[#EFF6FF]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">How It Works</span>
              <h2 id="process-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3">
                Our Rail Freight Process
              </h2>
            </div>
            <ol className="grid md:grid-cols-4 gap-8">
              {[
                { step: '1', title: 'Quote', desc: 'Submit your cargo details for a rail freight rate from China' },
                { step: '2', title: 'Consolidation', desc: 'Goods collected and consolidated at the departure rail terminal' },
                { step: '3', title: 'Rail Transit', desc: '14–20 day journey across Asia and Europe to the UK' },
                { step: '4', title: 'UK Delivery', desc: 'Cleared at UK terminal and delivered to your warehouse' },
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

        {/* ====== SUITABLE CARGO ====== */}
        <section aria-labelledby="cargo-heading" className="py-16 md:py-24 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Cargo Types</span>
              <h2 id="cargo-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3">
                What Can You Ship by Rail?
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Globe, title: 'Electronics', desc: 'Consumer electronics, laptops, phones, and accessories.' },
                { icon: Truck, title: 'Auto Parts', desc: 'Vehicle components, tyres, accessories, and spare parts.' },
                { icon: BarChart3, title: 'Machinery', desc: 'Industrial machinery, tools, and equipment.' },
                { icon: Package, title: 'Textiles', desc: 'Garments, fabrics, and fashion accessories.' },
                { icon: Warehouse, title: 'Consumer Goods', desc: 'Home goods, toys, sporting equipment, and general merchandise.' },
                { icon: Shield, title: 'Industrial Equipment', desc: 'Factory equipment, pumps, generators, and hardware.' },
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

        {/* ====== WHY CHOOSE ====== */}
        <section aria-labelledby="why-heading" className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Why Carrgo</span>
              <h2 id="why-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3">
                Why Choose Carrgo for Rail Freight
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Clock, title: '14–20 Day Transit', desc: 'Faster than sea freight by 10–15 days for China-UK shipments.' },
                { icon: Leaf, title: 'Lower Carbon', desc: 'Significantly lower CO₂ emissions compared to air freight.' },
                { icon: BarChart3, title: 'Cost Effective', desc: '40% cheaper than air freight with competitive all-inclusive pricing.' },
                { icon: FileCheck, title: 'Full Customs Handling', desc: 'Multi-country transit documentation and UK customs clearance.' },
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

        {/* ====== FAQ ====== */}
        <section aria-labelledby="faq-heading" className="py-16 md:py-24 bg-[#F8FAFC]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Rail Freight FAQ</span>
              <h2 id="faq-heading" className="text-3xl font-bold text-[#111827] mt-3">
                Rail Freight Frequently Asked Questions
              </h2>
            </div>
            <FaqAccordion />
          </div>
        </section>

        {/* ====== CTA BANNER ====== */}
        <section aria-label="Get a rail freight quote" className="py-16 md:py-24 bg-[#1A6DFF]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Get Your Rail Freight Quote
            </h2>
            <p className="text-white/85 text-lg mb-8 max-w-2xl mx-auto">
              New Silk Road rail freight from China to the UK. 14–20 days transit, all-inclusive pricing.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/get-a-quote" className="inline-flex items-center gap-2 bg-white text-[#1A6DFF] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors min-h-[44px]">
                Get a Rail Freight Quote <ArrowRight className="w-5 h-5" aria-hidden="true" />
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
