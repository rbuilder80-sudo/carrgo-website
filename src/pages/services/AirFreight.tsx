import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import {
  Ship, Plane, Truck, TrainFront, FileCheck, Package,
  Warehouse, Globe, ArrowRight, CheckCircle, ChevronDown,
  Clock, Shield, MapPin, TrendingUp
} from 'lucide-react';

/* ── JSON-LD Structured Data ── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Air Freight UK — Air Cargo Shipping Services',
  provider: { '@type': 'Organization', name: 'Carrgo Freight Solutions Ltd' },
  areaServed: { '@type': 'Country', name: 'United Kingdom' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Air Freight Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Express Air Freight (1–3 days)' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Economy Air Freight (3–5 days)' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Door-to-Door Air Cargo' } },
    ],
  },
};

const faqData = [
  { q: 'How much does air freight to the UK cost?', a: 'Air freight costs depend on chargeable weight (actual or volumetric, whichever is higher). Typical rates from China to the UK range from £3.50–£7.00 per kg for economy and £6.00–£12.00 per kg for express. We provide all-inclusive quotes with no hidden fees.' },
  { q: 'How long does air freight take to reach the UK?', a: 'Express air freight takes 1–3 days door-to-door, while economy air freight typically takes 3–5 days. Transit times vary by origin — European origins are faster (1–2 days) compared to Asia (3–5 days).' },
  { q: 'Are there any cargo restrictions on air freight?', a: 'Yes — hazardous materials, lithium batteries, liquids, and perishables require special handling and documentation. Some items are restricted by aviation industry regulations. Contact our team to confirm if your cargo is suitable for air freight.' },
  { q: 'Do you offer real-time tracking for air cargo?', a: 'Absolutely. All air freight shipments include real-time tracking from collection through to final delivery. You will receive updates at every milestone including departure, transit, customs clearance, and delivery.' },
  { q: 'Is customs clearance included in your air freight service?', a: 'Yes, we handle full UK customs clearance as part of our air freight service. Our customs brokers prepare and submit CDS entries, calculate duties and VAT, and ensure compliance with all UK import regulations.' },
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

export default function AirFreight() {
  return (
    <>
      <Seo
        title="Air Freight UK | Air Cargo Shipping & Quotes | Carrgo"
        description="Air freight & air cargo UK — express & economy options. Heathrow, East Midlands, Manchester. Get air freight quotes in 2 hours. 3-5 days worldwide."
        keywords="air freight uk, air cargo uk, express air freight, air freight to ireland, air cargo to northern ireland, airport freight heathrow, air freight quotes uk"
        ogUrl="https://carrgo.co.uk/services/air-freight"
        canonical="https://carrgo.co.uk/services/air-freight"
        structuredData={[serviceSchema, faqSchema]}
      />
      <main id="main-content">
        {/* ====== HERO ====== */}
        <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-gradient-to-br from-[#EFF6FF] to-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Air Freight Services</span>
                <h1 id="hero-heading" className="text-3xl lg:text-5xl font-extrabold text-[#111827] leading-tight mt-3 mb-6">
                  Air Freight UK — Air Cargo Shipping Services
                </h1>
                <p className="text-lg text-[#4B5563] mb-8 leading-relaxed">
                  Book express and economy air freight from China, USA, UAE, and Europe to Heathrow, Manchester, and Birmingham airports. Door-to-door air cargo with tracking. Time-critical delivery in 1–5 days.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    'Express (1–3 days) and Economy (3–5 days) options',
                    'All major UK airports: Heathrow, Manchester, Birmingham',
                    'Experienced air freight agent',
                    'Real-time cargo tracking included',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#4B5563]">
                      <CheckCircle className="w-5 h-5 text-[#22C55E] flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-4">
                  <Link to="/get-a-quote" className="inline-flex items-center gap-2 bg-[#1A6DFF] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1557CC] transition-colors min-h-[44px]">
                    Get an Air Freight Quote <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                  <a href="mailto:info@carrgo.co.uk" className="inline-flex items-center gap-2 bg-white text-[#4B5563] border border-[#E5E7EB] px-6 py-3 rounded-lg font-semibold hover:bg-[#F8FAFC] transition-colors min-h-[44px]">
                    Call Our Team
                  </a>
                </div>
              </div>
              <div className="hidden lg:block">
                <img
                  src="/images/service-air.jpg"
                  alt="Large cargo aircraft on tarmac at sunset with loading equipment"
                  className="rounded-2xl shadow-lg w-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ====== AIR FREIGHT OPTIONS ====== */}
        <section aria-labelledby="options-heading" className="py-16 md:py-24 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Service Options</span>
              <h2 id="options-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3">
                Express vs Economy Air Freight
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <article className="bg-white rounded-xl p-8 border border-[#E5E7EB] hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-[#EBF2FF] rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-7 h-7 text-[#1A6DFF]" aria-hidden="true" />
                </div>
                <h3 className="font-bold text-xl text-[#111827] mb-2">Express Air Freight</h3>
                <p className="text-[#4B5563] text-sm mb-4 leading-relaxed">
                  The fastest way to move cargo by air. Ideal for time-critical shipments, perishable goods, and high-value items that need immediate delivery.
                </p>
                <ul className="space-y-2 text-sm text-[#4B5563]">
                  <li className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#1A6DFF]" aria-hidden="true" /><span><strong>Transit:</strong> 1–3 days</span></li>
                  <li className="flex items-center gap-2"><Shield className="w-4 h-4 text-[#1A6DFF]" aria-hidden="true" /><span><strong>Best for:</strong> Urgent, perishables, high-value</span></li>
                  <li className="flex items-center gap-2"><Globe className="w-4 h-4 text-[#1A6DFF]" aria-hidden="true" /><span><strong>Tracking:</strong> Real-time GPS</span></li>
                </ul>
              </article>
              <article className="bg-white rounded-xl p-8 border border-[#E5E7EB] hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-[#EBF2FF] rounded-lg flex items-center justify-center mb-4">
                  <Plane className="w-7 h-7 text-[#1A6DFF]" aria-hidden="true" />
                </div>
                <h3 className="font-bold text-xl text-[#111827] mb-2">Economy Air Freight</h3>
                <p className="text-[#4B5563] text-sm mb-4 leading-relaxed">
                  A cost-effective air cargo option for regular shipments that do not require immediate delivery. Still significantly faster than sea or rail freight.
                </p>
                <ul className="space-y-2 text-sm text-[#4B5563]">
                  <li className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#1A6DFF]" aria-hidden="true" /><span><strong>Transit:</strong> 3–5 days</span></li>
                  <li className="flex items-center gap-2"><Shield className="w-4 h-4 text-[#1A6DFF]" aria-hidden="true" /><span><strong>Best for:</strong> Regular, non-urgent cargo</span></li>
                  <li className="flex items-center gap-2"><Globe className="w-4 h-4 text-[#1A6DFF]" aria-hidden="true" /><span><strong>Tracking:</strong> Real-time GPS</span></li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* ====== UK AIRPORTS ====== */}
        <section aria-labelledby="airports-heading" className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">UK Airports</span>
              <h2 id="airports-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3">
                Air Freight to UK Airports
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { code: 'LHR', name: 'Heathrow Airport', desc: "The UK's largest cargo airport handling over 1.5 million tonnes of freight annually. Direct connections to every major global hub." },
                { code: 'MAN', name: 'Manchester Airport', desc: 'Northern England hub with growing cargo operations. Excellent motorway links to the North West, Yorkshire, and Scotland.' },
                { code: 'BHX', name: 'Birmingham Airport', desc: 'Midlands distribution point with strong road and rail connections. Ideal for deliveries to the West Midlands and central UK.' },
              ].map((airport, i) => (
                <article key={i} className="bg-white rounded-xl p-6 border border-[#E5E7EB] hover:shadow-md transition-shadow">
                  <MapPin className="w-8 h-8 text-[#1A6DFF] mb-3" aria-hidden="true" />
                  <h3 className="font-bold text-xl text-[#111827] mb-1">{airport.name}</h3>
                  <span className="text-xs font-semibold text-[#1A6DFF] bg-[#EBF2FF] px-2 py-1 rounded-full">{airport.code}</span>
                  <p className="text-[#4B5563] text-sm leading-relaxed mt-3">{airport.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ====== PROCESS ====== */}
        <section aria-labelledby="process-heading" className="py-16 md:py-24 bg-[#EFF6FF]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">How It Works</span>
              <h2 id="process-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3">
                Our Air Freight Process
              </h2>
            </div>
            <ol className="grid md:grid-cols-4 gap-8">
              {[
                { step: '1', title: 'Quote Request', desc: 'Submit your cargo details for express or economy air freight pricing' },
                { step: '2', title: 'Booking', desc: 'We book space with our airline partners and confirm flight details' },
                { step: '3', title: 'Documentation', desc: 'Airway bill, customs docs, and export/import declarations prepared' },
                { step: '4', title: 'Delivery', desc: 'Flown to UK airport, cleared through customs, delivered to your door' },
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

        {/* ====== KEY ROUTES ====== */}
        <section aria-labelledby="routes-heading" className="py-16 md:py-24 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Popular Air Routes</span>
              <h2 id="routes-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3">
                Air Freight Routes to the UK
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { origin: 'Shanghai', airport: 'Heathrow', time: '1–3 days' },
                { origin: 'New York', airport: 'Heathrow', time: '1–2 days' },
                { origin: 'Dubai', airport: 'Manchester', time: '2–3 days' },
                { origin: 'Frankfurt', airport: 'Birmingham', time: '1 day' },
              ].map((route, i) => (
                <article key={i} className="bg-white rounded-xl p-6 border border-[#E5E7EB] hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <p className="font-semibold text-[#111827]">{route.origin}</p>
                    <ArrowRight className="w-4 h-4 text-[#9CA3AF]" aria-hidden="true" />
                    <p className="font-semibold text-[#111827]">{route.airport}</p>
                  </div>
                  <div className="flex items-center gap-2 text-[#4B5563] text-sm">
                    <Clock className="w-4 h-4 text-[#1A6DFF]" aria-hidden="true" />
                    <span>{route.time}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ====== WHY CHOOSE ====== */}
        <section aria-labelledby="why-heading" className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Why Carrgo</span>
              <h2 id="why-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3">
                Why Choose Carrgo for Air Freight
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Plane, title: 'Air Freight Expertise', desc: 'Experienced air freight agent with direct airline partnerships.' },
                { icon: Clock, title: '1–5 Day Delivery', desc: 'Express and economy options to match your timeline and budget.' },
                { icon: Globe, title: 'Global Coverage', desc: 'Air freight from China, USA, UAE, India, and all European countries.' },
                { icon: FileCheck, title: 'Customs Included', desc: 'Full UK customs clearance handled by our customs brokers.' },
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
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Air Freight FAQ</span>
              <h2 id="faq-heading" className="text-3xl font-bold text-[#111827] mt-3">
                Air Freight Frequently Asked Questions
              </h2>
            </div>
            <FaqAccordion />
          </div>
        </section>

        {/* ====== CTA BANNER ====== */}
        <section aria-label="Get an air freight quote" className="py-16 md:py-24 bg-[#1A6DFF]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Get Your Air Freight Quote
            </h2>
            <p className="text-white/85 text-lg mb-8 max-w-2xl mx-auto">
              Express and economy air cargo from China, USA, UAE, and Europe. All-inclusive pricing with 2-hour response.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/get-a-quote" className="inline-flex items-center gap-2 bg-white text-[#1A6DFF] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors min-h-[44px]">
                Get an Air Freight Quote <ArrowRight className="w-5 h-5" aria-hidden="true" />
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
                { icon: Truck, title: 'Road Freight', desc: 'FTL & LTL European haulage to and from the UK', href: '/services/road-freight' },
                { icon: TrainFront, title: 'Rail Freight', desc: 'China to UK via New Silk Road — 14-20 days', href: '/services/rail-freight-china-uk' },
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
