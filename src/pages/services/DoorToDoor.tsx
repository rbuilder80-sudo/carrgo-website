import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import {
  Ship, Plane, Truck, TrainFront, FileCheck, Package,
  Warehouse, Globe, ArrowRight, CheckCircle, ChevronDown,
  Clock, Shield, Phone, Headphones, TrendingUp, MapPin
} from 'lucide-react';

/* ── JSON-LD Structured Data ── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Door-to-Door Freight UK — Factory to Warehouse',
  provider: { '@type': 'Organization', name: 'Carrgo Freight Solutions Ltd' },
  areaServed: { '@type': 'Country', name: 'United Kingdom' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Door-to-Door Freight Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Factory Collection' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'International Transit (Sea, Air, Road, Rail)' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'UK Customs Clearance' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Warehouse Delivery' } },
    ],
  },
};

const faqData = [
  { q: 'Which Incoterms work best with door-to-door freight?', a: 'For true door-to-door service, DDP (Delivered Duty Paid) or DAP (Delivered at Place) work best. With DDP, we handle everything including duties and VAT. With EXW, we collect from your supplier\'s factory. Our team can advise on the best Incoterm for your shipment.' },
  { q: 'How do I track my shipment from factory to warehouse?', a: 'All door-to-door shipments include full tracking at every stage. You will receive updates at collection, departure, transit milestones, customs clearance, and final delivery. Your dedicated account manager is also available by phone and email.' },
  { q: 'Is cargo insurance included in door-to-door quotes?', a: 'Cargo insurance is available as an add-on to all door-to-door quotes. We recommend comprehensive all-risk insurance for all shipments, covering theft, damage, and loss during transit. Ask your account manager to include insurance in your quote.' },
  { q: 'Who handles customs at both ends?', a: 'We handle customs clearance at both origin and destination. This includes export declarations in the origin country and UK import declarations via HMRC CDS. All customs documentation and duty calculations are included in our door-to-door service.' },
  { q: 'How long does door-to-door shipping from China take?', a: 'Door-to-door transit times from China to the UK vary by mode: sea freight takes 35–45 days total, air freight 7–12 days, and rail freight 18–25 days including collection and delivery. We provide accurate timelines with every quote.' },
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

export default function DoorToDoor() {
  return (
    <>
      <Seo
        title="Door-to-Door Freight UK | Factory to Warehouse Shipping | Carrgo"
        description="Complete door-to-door freight forwarding from factory floor to UK warehouse. Sea, air, road, or rail — we manage every leg, customs, and delivery. One all-inclusive quote, one invoice."
        keywords="door to door freight, door to door shipping uk, factory to warehouse, end to end logistics, door to door delivery"
        ogUrl="https://carrgo.co.uk/services/door-to-door"
        canonical="https://carrgo.co.uk/services/door-to-door"
        structuredData={[serviceSchema, faqSchema]}
      />
      <main id="main-content">
        {/* ====== HERO ====== */}
        <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-gradient-to-br from-[#EFF6FF] to-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Door-to-Door Freight</span>
                <h1 id="hero-heading" className="text-3xl lg:text-5xl font-extrabold text-[#111827] leading-tight mt-3 mb-6">
                  Door-to-Door Freight UK — Factory to Warehouse
                </h1>
                <p className="text-lg text-[#4B5563] mb-8 leading-relaxed">
                  Complete door-to-door freight forwarding from your supplier's factory to your UK warehouse. Sea, air, road, or rail — we manage every leg, customs, and delivery. One quote, one invoice, zero hassle.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    'Collection from supplier\'s factory',
                    'All freight modes: sea, air, road, rail',
                    'Customs clearance at origin and destination',
                    'Final delivery to your UK warehouse',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#4B5563]">
                      <CheckCircle className="w-5 h-5 text-[#22C55E] flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-4">
                  <Link to="/get-a-quote" className="inline-flex items-center gap-2 bg-[#1A6DFF] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1557CC] transition-colors min-h-[44px]">
                    Get a Door-to-Door Quote <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                  <a href="tel:+442039505050" className="inline-flex items-center gap-2 bg-white text-[#4B5563] border border-[#E5E7EB] px-6 py-3 rounded-lg font-semibold hover:bg-[#F8FAFC] transition-colors min-h-[44px]">
                    Call Our Team
                  </a>
                </div>
              </div>
              <div className="hidden lg:block">
                <img
                  src="/images/service-door-to-door.jpg"
                  alt="Forklift loading pallet into truck at modern distribution centre"
                  className="rounded-2xl shadow-lg w-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ====== HOW IT WORKS ====== */}
        <section aria-labelledby="process-heading" className="py-16 md:py-24 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">End-to-End</span>
              <h2 id="process-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3">
                Our Door-to-Door Process
              </h2>
            </div>
            <ol className="grid md:grid-cols-5 gap-6">
              {[
                { step: '1', title: 'Factory Collection', desc: 'We pick up goods directly from your supplier\'s premises anywhere in the world.' },
                { step: '2', title: 'Export Customs', desc: 'Origin country customs clearance prepared and submitted by our local agents.' },
                { step: '3', title: 'International Transit', desc: 'Sea, air, road, or rail — the best mode for your timeline and budget.' },
                { step: '4', title: 'UK Customs Clearance', desc: 'HMRC-compliant import processing by our in-house customs brokers.' },
                { step: '5', title: 'UK Delivery', desc: 'Final mile delivery to your warehouse, office, or Amazon FBA centre.' },
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

        {/* ====== BENEFITS ====== */}
        <section aria-labelledby="benefits-heading" className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Benefits</span>
              <h2 id="benefits-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3">
                Why Choose Door-to-Door Freight?
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Headphones, title: 'Single Point of Contact', desc: 'One dedicated account manager handles your entire shipment from start to finish.' },
                { icon: Shield, title: 'Reduced Risk', desc: 'We handle every leg of the journey, minimising handoffs and reducing the risk of damage or loss.' },
                { icon: TrendingUp, title: 'Cost Optimisation', desc: 'We select the best mode for each shipment based on your timeline, budget, and cargo type.' },
                { icon: Globe, title: 'Full Visibility', desc: 'Track your shipment from factory floor to warehouse door with real-time updates at every stage.' },
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

        {/* ====== MODES AVAILABLE ====== */}
        <section aria-labelledby="modes-heading" className="py-16 md:py-24 bg-[#EFF6FF]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Transport Modes</span>
              <h2 id="modes-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3">
                Choose the Right Mode for Your Shipment
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Ship, title: 'Sea Freight', desc: 'Most economical for large volumes. Full container and groupage options available.', time: '35–45 days' },
                { icon: Plane, title: 'Air Freight', desc: 'Fastest option for time-critical shipments. Express and economy services.', time: '7–12 days' },
                { icon: Truck, title: 'Road Freight', desc: 'Best for EU-UK shipments. Daily departures with full customs handling.', time: '2–9 days' },
                { icon: TrainFront, title: 'Rail Freight', desc: 'The perfect balance of speed and cost for China-UK shipments.', time: '18–25 days' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <article key={i} className="bg-white rounded-xl p-6 border border-[#E5E7EB] hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-[#EBF2FF] rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-[#1A6DFF]" aria-hidden="true" />
                    </div>
                    <h3 className="font-bold text-lg text-[#111827] mb-2">{item.title}</h3>
                    <p className="text-[#4B5563] text-sm mb-3 leading-relaxed">{item.desc}</p>
                    <div className="flex items-center gap-2 text-sm font-medium text-[#1A6DFF]">
                      <Clock className="w-4 h-4" aria-hidden="true" />
                      <span>{item.time}</span>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ====== WHY CARRGO ====== */}
        <section aria-labelledby="why-heading" className="py-16 md:py-24 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Why Carrgo</span>
              <h2 id="why-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3">
                Why Choose Carrgo for Door-to-Door Freight
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Phone, title: 'One Point of Contact', desc: 'A single dedicated account manager for your entire shipment.' },
                { icon: FileCheck, title: 'All-Inclusive Quotes', desc: 'One quote covers everything — no hidden fees or surprise charges.' },
                { icon: MapPin, title: 'Global Collection', desc: 'We collect from factories and warehouses in over 100 countries.' },
                { icon: Clock, title: '2-Hour Quotes', desc: 'Receive your all-inclusive door-to-door quote within 2 hours.' },
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
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">FAQ</span>
              <h2 id="faq-heading" className="text-3xl font-bold text-[#111827] mt-3">
                Door-to-Door Freight FAQs
              </h2>
            </div>
            <FaqAccordion />
          </div>
        </section>

        {/* ====== CTA BANNER ====== */}
        <section aria-label="Get a door-to-door quote" className="py-16 md:py-24 bg-[#1A6DFF]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Get Your Door-to-Door Quote
            </h2>
            <p className="text-white/85 text-lg mb-8 max-w-2xl mx-auto">
              One quote, one invoice, zero hassle. Complete factory-to-warehouse forwarding with all customs handled.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/get-a-quote" className="inline-flex items-center gap-2 bg-white text-[#1A6DFF] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors min-h-[44px]">
                Get a Door-to-Door Quote <ArrowRight className="w-5 h-5" aria-hidden="true" />
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
                { icon: TrainFront, title: 'Rail Freight', desc: 'China to UK via New Silk Road — 14-20 days', href: '/services/rail-freight-china-uk' },
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
