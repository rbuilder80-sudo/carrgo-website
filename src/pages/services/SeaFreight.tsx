import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import {
  Ship, Plane, Truck, TrainFront, FileCheck, Package,
  Warehouse, Globe, ArrowRight, CheckCircle, ChevronDown,
  Clock, Shield, MapPin
} from 'lucide-react';

/* ── JSON-LD Structured Data ── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Sea Freight Services UK — FCL & LCL Container Shipping',
  provider: { '@type': 'Organization', name: 'Carrgo Freight Solutions Ltd' },
  areaServed: { '@type': 'Country', name: 'United Kingdom' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Sea Freight Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'FCL — Full Container Load (20ft & 40ft)' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'LCL — Less than Container Load' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'UK Customs Clearance' } },
    ],
  },
};

const faqData = [
  { q: 'How much does a 20ft container from China to the UK cost?', a: 'A 20ft FCL container from Shanghai or Ningbo to Felixstowe typically costs £1,200–£2,800 depending on the carrier, fuel surcharges, and time of year. This includes ocean freight, UK port handling, and customs clearance. Contact us for an all-inclusive quote.' },
  { q: 'How long does sea freight from China to the UK take?', a: 'Sea freight from China to the UK takes approximately 24–35 days port-to-port, depending on the origin port and UK destination. FCL shipments are generally faster than LCL as they don\'t require consolidation.' },
  { q: 'What is the difference between FCL and LCL shipping?', a: 'FCL (Full Container Load) means you rent an entire 20ft or 40ft container for your cargo only. LCL (Less than Container Load) means your cargo shares container space with other shipments. FCL is more cost-effective for shipments over 15 CBM, while LCL is ideal for smaller volumes.' },
  { q: 'Do you handle customs clearance at UK ports?', a: 'Yes — our customs brokers handle all UK customs clearance as part of our sea freight service. We prepare CDS entries, calculate duties and VAT, and ensure compliance. Our 99%+ first-submission success rate minimises delays.' },
  { q: 'Can you deliver to my warehouse after port clearance?', a: 'Absolutely. Our door-to-door sea freight service includes collection from the origin port, UK customs clearance, and final delivery to your UK warehouse or Amazon FBA centre. One quote covers everything.' },
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

export default function SeaFreight() {
  return (
    <>
      <Seo
        title="Sea Freight Services UK | FCL & LCL Container Shipping | Carrgo"
        description="Sea freight services UK — FCL & LCL container shipping worldwide. Competitive container shipping quotes. 25-35 days China to UK. All-inclusive rates."
        keywords="sea freight uk, fcl lcl shipping, container shipping uk, sea freight from china to uk, irish sea freight, belfast port shipping, dublin port freight, shipping to northern ireland, shipping to ireland"
        ogUrl="https://carrgo.co.uk/services/sea-freight"
        canonical="https://carrgo.co.uk/services/sea-freight"
        structuredData={[serviceSchema, faqSchema]}
      />
      <main id="main-content">
        {/* ====== HERO ====== */}
        <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-gradient-to-br from-[#EFF6FF] to-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Sea Freight Services</span>
                <h1 id="hero-heading" className="text-3xl lg:text-5xl font-extrabold text-[#111827] leading-tight mt-3 mb-6">
                  Sea Freight Services UK — FCL & LCL Container Shipping
                </h1>
                <p className="text-lg text-[#4B5563] mb-8 leading-relaxed">
                  Get sea freight quotes for FCL (Full Container Load) and LCL (Less than Container Load) shipments from China, India, USA, and Europe to Felixstowe, Southampton, and London Gateway. All-inclusive ocean freight with UK customs clearance.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    'FCL (20ft & 40ft containers) and LCL groupage options',
                    'Competitive rates from China, India, USA, Europe',
                    'Customs clearance included — professional brokers',
                    'Delivery to Felixstowe, Southampton, London Gateway',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#4B5563]">
                      <CheckCircle className="w-5 h-5 text-[#22C55E] flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-4">
                  <Link to="/get-a-quote" className="inline-flex items-center gap-2 bg-[#1A6DFF] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1557CC] transition-colors min-h-[44px]">
                    Get a Sea Freight Quote <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                  <a href="mailto:info@carrgo.co.uk" className="inline-flex items-center gap-2 bg-white text-[#4B5563] border border-[#E5E7EB] px-6 py-3 rounded-lg font-semibold hover:bg-[#F8FAFC] transition-colors min-h-[44px]">
                    Call Our Team
                  </a>
                </div>
              </div>
              <div className="hidden lg:block">
                <img
                  src="/images/service-sea.jpg"
                  alt="Aerial view of a large container cargo ship sailing on blue ocean"
                  className="rounded-2xl shadow-lg w-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ====== FCL vs LCL COMPARISON ====== */}
        <section aria-labelledby="fcl-lcl-heading" className="py-16 md:py-24 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Container Options</span>
              <h2 id="fcl-lcl-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3">
                FCL vs LCL — Which Container Shipping Option is Right for You?
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow-sm border border-[#E5E7EB] overflow-hidden">
                <thead>
                  <tr className="bg-[#1A6DFF] text-white">
                    <th scope="col" className="text-left px-6 py-4 font-semibold">Feature</th>
                    <th scope="col" className="text-center px-6 py-4 font-semibold">FCL (Full Container Load)</th>
                    <th scope="col" className="text-center px-6 py-4 font-semibold">LCL (Less than Container Load)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Best For', 'Shipments over 15 CBM', 'Shipments under 15 CBM'],
                    ['Container Sizes', '20ft, 40ft, 40ft HC', 'Shared container space'],
                    ['Cost', 'Flat rate per container', 'Per CBM / per tonne'],
                    ['Transit Time', 'Direct, faster routing', 'Consolidation adds 3–7 days'],
                    ['Security', 'Seal intact, minimal handling', 'More handling, palletised'],
                    ['Flexibility', 'Fixed schedule', 'More frequent departures'],
                  ].map(([feat, fcl, lcl], i) => (
                    <tr key={i} className={`border-t border-[#E5E7EB] ${i % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}`}>
                      <td className="px-6 py-4 font-medium text-[#111827]">{feat}</td>
                      <td className="px-6 py-4 text-center text-[#4B5563]">{fcl}</td>
                      <td className="px-6 py-4 text-center text-[#4B5563]">{lcl}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ====== SEA FREIGHT PROCESS ====== */}
        <section aria-labelledby="process-heading" className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">How It Works</span>
              <h2 id="process-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3">
                Our Sea Freight Process
              </h2>
            </div>
            <ol className="grid md:grid-cols-4 gap-8 relative">
              {[
                { step: '1', title: 'Quote Request', desc: 'Submit your cargo details — origin, destination, volume, weight' },
                { step: '2', title: 'Rate Confirmation', desc: 'We negotiate the best FCL/LCL rates with our carrier network' },
                { step: '3', title: 'Booking & Documentation', desc: 'We book your container and prepare all customs documentation' },
                { step: '4', title: 'Shipping & Delivery', desc: 'Cargo loaded, shipped, cleared at UK port, delivered to your door' },
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
        <section aria-labelledby="routes-heading" className="py-16 md:py-24 bg-[#EFF6FF]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Popular Sea Routes</span>
              <h2 id="routes-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3">
                Sea Freight Routes to the UK
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { origin: 'Shanghai', port: 'Felixstowe', time: '24–30 days', freq: 'Weekly' },
                { origin: 'Ningbo', port: 'Southampton', time: '26–32 days', freq: 'Weekly' },
                { origin: 'Mumbai', port: 'Felixstowe', time: '21–26 days', freq: 'Bi-weekly' },
                { origin: 'New York', port: 'Liverpool', time: '10–14 days', freq: 'Weekly' },
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
                  <p className="text-xs text-[#9CA3AF] uppercase tracking-wider font-medium">{route.freq} departures</p>
                </article>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/get-a-quote" className="inline-flex items-center gap-2 text-[#1A6DFF] font-semibold hover:gap-3 transition-all">
                Get a Quote for Your Route <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* ====== IRISH SEA ROUTES ====== */}
        <section aria-labelledby="irish-sea-heading" className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Irish Sea</span>
              <h2 id="irish-sea-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3">
                Irish Sea Freight Routes
              </h2>
              <p className="text-[#4B5563] mt-4 max-w-2xl mx-auto">
                Fast and reliable ferry services connecting the UK with Ireland and Northern Ireland. The Irish Sea is one of the busiest short-sea shipping routes in Europe.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { route: 'Liverpool ↔ Dublin', time: '8 hours', type: 'RoRo Ferry', freq: 'Twice daily' },
                { route: 'Holyhead ↔ Dublin', time: '2 hours', type: 'Fast Ferry', freq: 'Multiple daily' },
                { route: 'Liverpool ↔ Belfast', time: '8–12 hours', type: 'RoRo Ferry', freq: 'Daily' },
                { route: 'Cairnryan ↔ Larne', time: '2 hours', type: 'Fast Ferry', freq: 'Multiple daily' },
              ].map((r, i) => (
                <article key={i} className="bg-[#F8FAFC] rounded-xl p-6 border border-[#E5E7EB] hover:shadow-md transition-shadow">
                  <Ship className="w-8 h-8 text-[#1A6DFF] mb-3" aria-hidden="true" />
                  <h3 className="font-bold text-lg text-[#111827] mb-2">{r.route}</h3>
                  <div className="flex items-center gap-2 text-[#4B5563] text-sm mb-1">
                    <Clock className="w-4 h-4 text-[#1A6DFF]" aria-hidden="true" />
                    <span>{r.time}</span>
                  </div>
                  <p className="text-xs text-[#9CA3AF] uppercase tracking-wider font-medium mb-1">{r.type}</p>
                  <p className="text-xs text-green-600 font-medium">{r.freq}</p>
                </article>
              ))}
            </div>
            <div className="text-center mt-8">
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/routes/dublin-ireland" className="inline-flex items-center gap-2 text-[#1A6DFF] font-semibold hover:gap-3 transition-all">
                  Dublin Route <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link to="/routes/belfast-northern-ireland" className="inline-flex items-center gap-2 text-[#1A6DFF] font-semibold hover:gap-3 transition-all">
                  Belfast Route <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ====== UK PORTS ====== */}
        <section aria-labelledby="ports-heading" className="py-16 md:py-24 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">UK Ports</span>
              <h2 id="ports-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3">
                UK Ports We Serve
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'Felixstowe', desc: "UK's busiest container port with deep-water berths for the largest vessels. Direct rail links to the Midlands." },
                { name: 'Southampton', desc: 'Second largest UK container port with excellent motorway connections and cruise/cargo dual facility.' },
                { name: 'London Gateway', desc: 'Modern deep-water port with on-dock rail terminal and closest proximity to London.' },
              ].map((port, i) => (
                <article key={i} className="bg-white rounded-xl p-6 border border-[#E5E7EB] hover:shadow-md transition-shadow">
                  <MapPin className="w-8 h-8 text-[#1A6DFF] mb-3" aria-hidden="true" />
                  <h3 className="font-bold text-xl text-[#111827] mb-2">{port.name}</h3>
                  <p className="text-[#4B5563] text-sm leading-relaxed">{port.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ====== WHY CHOOSE CARRGO ====== */}
        <section aria-labelledby="why-heading" className="py-16 md:py-24 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Why Carrgo</span>
              <h2 id="why-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3">
                Why Choose Carrgo for Sea Freight
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Shield, title: 'All-Inclusive Pricing', desc: 'No hidden fuel surcharges, terminal handling fees, or customs inspection surprises.' },
                { icon: FileCheck, title: 'Expert Customs Clearance', desc: 'Professional brokers with a 99%+ first-submission success rate.' },
                { icon: Clock, title: '2-Hour Quotes', desc: 'Receive your all-inclusive sea freight quote within 2 hours during UK business hours.' },
                { icon: Globe, title: 'Global Carrier Network', desc: 'Established relationships with leading ocean carriers across 50+ trade routes.' },
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
        <section aria-labelledby="faq-heading" className="py-16 md:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Sea Freight FAQ</span>
              <h2 id="faq-heading" className="text-3xl font-bold text-[#111827] mt-3">
                Sea Freight Frequently Asked Questions
              </h2>
            </div>
            <FaqAccordion />
          </div>
        </section>

        {/* ====== CTA BANNER ====== */}
        <section aria-label="Get a sea freight quote" className="py-16 md:py-24 bg-[#1A6DFF]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Get Your Sea Freight Quote Today
            </h2>
            <p className="text-white/85 text-lg mb-8 max-w-2xl mx-auto">
              Competitive FCL and LCL rates from China, India, USA, and Europe. All-inclusive pricing with customs clearance.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/get-a-quote" className="inline-flex items-center gap-2 bg-white text-[#1A6DFF] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors min-h-[44px]">
                Get a Sea Freight Quote <ArrowRight className="w-5 h-5" aria-hidden="true" />
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
                { icon: Plane, title: 'Air Freight', desc: 'Express & economy air cargo with door-to-door delivery', href: '/services/air-freight' },
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
