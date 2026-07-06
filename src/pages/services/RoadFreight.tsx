import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import {
  Ship, Plane, Truck, TrainFront, FileCheck, Package,
  Warehouse, Globe, ArrowRight, CheckCircle, ChevronDown,
  Clock, Shield, MapPin, AlertCircle
} from 'lucide-react';

/* ── JSON-LD Structured Data ── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Road Freight UK — European Haulage & Transport Company',
  provider: { '@type': 'Organization', name: 'Carrgo Freight Solutions Ltd' },
  areaServed: [
    { '@type': 'Country', name: 'United Kingdom' },
    { '@type': 'Continent', name: 'Europe' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Road Freight Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'FTL — Full Truck Load' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'LTL — Less than Truck Load (Groupage)' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Post-Brexit EU-UK Customs' } },
    ],
  },
};

const faqData = [
  { q: 'How long does road freight from Germany to the UK take?', a: 'Road freight from Germany to the UK typically takes 2–4 days door-to-door, including the channel crossing. Full truck load (FTL) shipments are generally faster as they travel direct, while LTL groupage may add 1–2 days for consolidation.' },
  { q: 'What Brexit customs documentation is required?', a: 'Since Brexit, all EU-to-UK road freight requires an export declaration from the origin EU country, a UK import declaration via HMRC CDS, a commercial invoice, packing list, and EORI numbers. Our team handles all of this as part of our road freight service.' },
  { q: 'Do you offer GPS tracking on all vehicles?', a: 'Yes — every vehicle in our European road freight network is equipped with GPS tracking. You will receive real-time location updates, estimated arrival times, and alerts for any delays or issues en route.' },
  { q: 'What are the standard pallet dimensions for road freight?', a: 'Standard UK/Euro pallet dimensions are 1200mm × 800mm (Euro pallet) or 1200mm × 1000mm (UK pallet). Maximum pallet height is typically 2.2m. A standard 13.6m trailer can carry 26 Euro pallets or 33 UK pallets.' },
  { q: 'Can you handle customs clearance for EU imports?', a: 'Absolutely. We handle both export declarations in the origin EU country and UK import declarations via HMRC CDS. Our customs brokers ensure full compliance with post-Brexit regulations, minimising delays at the border.' },
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

export default function RoadFreight() {
  return (
    <>
      <Seo
        title="Road Freight UK | European Haulage & Transport | Carrgo"
        description="UK road freight & European haulage. FTL & LTL transport company. Germany, Netherlands, France, Spain, Italy. Same-day collection available."
        keywords="road freight uk, european haulage, ftl ltl transport, road freight to ireland, haulage northern ireland, uk trucking, pallet delivery europe"
        ogUrl="https://carrgo.co.uk/services/road-freight"
        canonical="https://carrgo.co.uk/services/road-freight"
        structuredData={[serviceSchema, faqSchema]}
      />
      <main id="main-content">
        {/* ====== HERO ====== */}
        <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-gradient-to-br from-[#EFF6FF] to-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Road Freight Services</span>
                <h1 id="hero-heading" className="text-3xl lg:text-5xl font-extrabold text-[#111827] leading-tight mt-3 mb-6">
                  Road Freight UK — European Haulage & Transport Company
                </h1>
                <p className="text-lg text-[#4B5563] mb-8 leading-relaxed">
                  FTL (Full Truck Load) and LTL groupage road freight from Germany, Netherlands, Spain, France, and all EU countries to the UK. Daily departures with full post-Brexit customs clearance and GPS tracking.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    'FTL and LTL groupage services',
                    'Daily departures from major EU hubs',
                    'Full post-Brexit customs documentation',
                    'GPS tracking on all vehicles',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#4B5563]">
                      <CheckCircle className="w-5 h-5 text-[#22C55E] flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-4">
                  <Link to="/get-a-quote" className="inline-flex items-center gap-2 bg-[#1A6DFF] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1557CC] transition-colors min-h-[44px]">
                    Get a Road Freight Quote <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                  <a href="mailto:info@carrgo.co.uk" className="inline-flex items-center gap-2 bg-white text-[#4B5563] border border-[#E5E7EB] px-6 py-3 rounded-lg font-semibold hover:bg-[#F8FAFC] transition-colors min-h-[44px]">
                    Call Our Team
                  </a>
                </div>
              </div>
              <div className="hidden lg:block">
                <img
                  src="/images/service-road.jpg"
                  alt="European trucks on modern motorway, clean white lorry fleet"
                  className="rounded-2xl shadow-lg w-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ====== FTL vs LTL ====== */}
        <section aria-labelledby="options-heading" className="py-16 md:py-24 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Service Options</span>
              <h2 id="options-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3">
                FTL vs LTL — Choose the Right Road Freight Option
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <article className="bg-white rounded-xl p-8 border border-[#E5E7EB] hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-[#EBF2FF] rounded-lg flex items-center justify-center mb-4">
                  <Truck className="w-7 h-7 text-[#1A6DFF]" aria-hidden="true" />
                </div>
                <h3 className="font-bold text-xl text-[#111827] mb-2">FTL — Full Truck Load</h3>
                <p className="text-[#4B5563] text-sm mb-4 leading-relaxed">
                  An entire truck dedicated exclusively to your cargo. The fastest and most secure road freight option for larger shipments.
                </p>
                <ul className="space-y-2 text-sm text-[#4B5563]">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#22C55E]" aria-hidden="true" /><span>Best for 10+ pallets</span></li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#22C55E]" aria-hidden="true" /><span>Direct routing — no stops</span></li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#22C55E]" aria-hidden="true" /><span>Fastest road option</span></li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#22C55E]" aria-hidden="true" /><span>Maximum security</span></li>
                </ul>
              </article>
              <article className="bg-white rounded-xl p-8 border border-[#E5E7EB] hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-[#EBF2FF] rounded-lg flex items-center justify-center mb-4">
                  <Package className="w-7 h-7 text-[#1A6DFF]" aria-hidden="true" />
                </div>
                <h3 className="font-bold text-xl text-[#111827] mb-2">LTL — Less than Truck Load</h3>
                <p className="text-[#4B5563] text-sm mb-4 leading-relaxed">
                  Share truck space with other shipments. Cost-effective for smaller loads with regular departures from all major EU hubs.
                </p>
                <ul className="space-y-2 text-sm text-[#4B5563]">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#22C55E]" aria-hidden="true" /><span>Best for 1–10 pallets</span></li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#22C55E]" aria-hidden="true" /><span>Cost-effective shared space</span></li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#22C55E]" aria-hidden="true" /><span>Regular departures</span></li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#22C55E]" aria-hidden="true" /><span>Flexible scheduling</span></li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* ====== EU COVERAGE ====== */}
        <section aria-labelledby="coverage-heading" className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">EU Coverage</span>
              <h2 id="coverage-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3">
                European Countries We Cover
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { country: 'Germany', time: '2–4 days', freq: 'Daily' },
                { country: 'Netherlands', time: '1–3 days', freq: 'Daily' },
                { country: 'France', time: '2–5 days', freq: 'Daily' },
                { country: 'Spain', time: '4–9 days', freq: '3x/week' },
                { country: 'Italy', time: '4–7 days', freq: '3x/week' },
                { country: 'Belgium', time: '1–2 days', freq: 'Daily' },
                { country: 'Poland', time: '3–5 days', freq: 'Daily' },
                { country: 'Ireland', time: '1–3 days', freq: 'Daily' },
              ].map((c, i) => (
                <article key={i} className="bg-white rounded-xl p-6 border border-[#E5E7EB] hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-lg text-[#111827] mb-1">{c.country}</h3>
                  <div className="flex items-center gap-2 text-[#4B5563] text-sm mb-1">
                    <Clock className="w-4 h-4 text-[#1A6DFF]" aria-hidden="true" />
                    <span>{c.time}</span>
                  </div>
                  <p className="text-xs text-[#9CA3AF] uppercase tracking-wider font-medium">{c.freq} departures</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ====== IRELAND ROAD FREIGHT ====== */}
        <section aria-labelledby="ireland-heading" className="py-16 md:py-24 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Ireland</span>
              <h2 id="ireland-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3">
                Road Freight to Ireland & Northern Ireland
              </h2>
              <p className="text-[#4B5563] mt-4 max-w-2xl mx-auto">
                Daily road freight services connecting the UK with Ireland and Northern Ireland via the Irish Sea. Full T1 and T2 transit document handling included.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <article className="bg-white rounded-xl p-8 border border-[#E5E7EB] hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-[#EBF2FF] rounded-lg flex items-center justify-center mb-4">
                  <Truck className="w-7 h-7 text-[#1A6DFF]" aria-hidden="true" />
                </div>
                <h3 className="font-bold text-xl text-[#111827] mb-2">UK to Ireland Road Freight</h3>
                <p className="text-[#4B5563] text-sm mb-4 leading-relaxed">
                  Road freight from all UK locations to Dublin, Cork, Limerick, Galway and across the Republic of Ireland. Includes Irish Sea ferry crossing, T1 transit documents for ROI customs entry, and Irish customs clearance.
                </p>
                <ul className="space-y-2 text-sm text-[#4B5563]">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#22C55E]" aria-hidden="true" /><span>Dublin in 1–2 days from UK mainland</span></li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#22C55E]" aria-hidden="true" /><span>T1 transit documents handled</span></li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#22C55E]" aria-hidden="true" /><span>Irish customs clearance included</span></li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#22C55E]" aria-hidden="true" /><span>FTL and LTL options available</span></li>
                </ul>
              </article>
              <article className="bg-white rounded-xl p-8 border border-[#E5E7EB] hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-[#EBF2FF] rounded-lg flex items-center justify-center mb-4">
                  <Truck className="w-7 h-7 text-[#1A6DFF]" aria-hidden="true" />
                </div>
                <h3 className="font-bold text-xl text-[#111827] mb-2">UK to Northern Ireland Road Freight</h3>
                <p className="text-[#4B5563] text-sm mb-4 leading-relaxed">
                  Road freight from GB mainland to Belfast, Derry, and all Northern Ireland locations. Full Northern Ireland Protocol compliance with T2 transit documents, UKIMS checks, and Windsor Framework documentation.
                </p>
                <ul className="space-y-2 text-sm text-[#4B5563]">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#22C55E]" aria-hidden="true" /><span>Belfast in 1–2 days from UK mainland</span></li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#22C55E]" aria-hidden="true" /><span>T2 transit documents handled</span></li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#22C55E]" aria-hidden="true" /><span>NI Protocol compliance included</span></li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#22C55E]" aria-hidden="true" /><span>Green lane / red lane guidance</span></li>
                </ul>
              </article>
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

        {/* ====== POST-BREXIT CUSTOMS ====== */}
        <section aria-labelledby="brexit-heading" className="py-16 md:py-24 bg-[#EFF6FF]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Post-Brexit</span>
              <h2 id="brexit-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3">
                EU to UK Customs After Brexit
              </h2>
              <p className="text-[#4B5563] mt-4 max-w-2xl mx-auto">
                Since the UK left the EU customs union, all goods moving between the EU and UK require customs declarations. We handle everything.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: FileCheck, title: 'Export Declarations', desc: 'We prepare and submit export declarations in the origin EU country, ensuring compliance with local customs regulations before your goods leave.' },
                { icon: Shield, title: 'UK Import Declarations', desc: 'Our customs brokers submit CDS (Customs Declaration Service) entries for all UK imports, ensuring fast clearance and compliance.' },
                { icon: AlertCircle, title: 'EORI & Commodity Codes', desc: 'We help you obtain GB and EU EORI numbers and correctly classify your goods with the right HS commodity codes for accurate duty assessment.' },
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

        {/* ====== PROCESS ====== */}
        <section aria-labelledby="process-heading" className="py-16 md:py-24 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">How It Works</span>
              <h2 id="process-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3">
                Our Road Freight Process
              </h2>
            </div>
            <ol className="grid md:grid-cols-4 gap-8">
              {[
                { step: '1', title: 'Quote', desc: 'Submit your collection and delivery details for FTL or LTL pricing' },
                { step: '2', title: 'Collection', desc: 'Goods collected from your EU supplier by our trusted haulage network' },
                { step: '3', title: 'Customs', desc: 'Export and import declarations prepared and submitted en route' },
                { step: '4', title: 'Delivery', desc: 'Cleared through UK customs and delivered to your warehouse' },
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

        {/* ====== WHY CHOOSE ====== */}
        <section aria-labelledby="why-heading" className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Why Carrgo</span>
              <h2 id="why-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3">
                Why Choose Carrgo for Road Freight
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Truck, title: 'Daily Departures', desc: 'Regular FTL and LTL departures from all major EU hubs to the UK.' },
                { icon: FileCheck, title: 'Brexit Customs Expertise', desc: 'Full post-Brexit customs handling — export and import declarations.' },
                { icon: Globe, title: 'EU-wide Coverage', desc: 'Road freight from Germany, Netherlands, France, Spain, Italy, and beyond.' },
                { icon: Clock, title: 'GPS Tracking', desc: 'Real-time vehicle tracking with proactive delay notifications.' },
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
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Road Freight FAQ</span>
              <h2 id="faq-heading" className="text-3xl font-bold text-[#111827] mt-3">
                Road Freight Frequently Asked Questions
              </h2>
            </div>
            <FaqAccordion />
          </div>
        </section>

        {/* ====== CTA BANNER ====== */}
        <section aria-label="Get a road freight quote" className="py-16 md:py-24 bg-[#1A6DFF]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Get Your Road Freight Quote
            </h2>
            <p className="text-white/85 text-lg mb-8 max-w-2xl mx-auto">
              Daily departures from all EU countries. FTL and LTL with full post-Brexit customs clearance included.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/get-a-quote" className="inline-flex items-center gap-2 bg-white text-[#1A6DFF] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors min-h-[44px]">
                Get a Road Freight Quote <ArrowRight className="w-5 h-5" aria-hidden="true" />
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
