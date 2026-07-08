import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import {
  Ship, Plane, Truck, TrainFront, FileCheck, Package,
  Warehouse, Globe, ArrowRight, CheckCircle, ChevronDown,
  Clock, Shield, Barcode, RotateCcw, Search, Boxes
} from 'lucide-react';

/* ── JSON-LD Structured Data ── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Amazon FBA Freight UK — FBA Prep & Shipping',
  provider: { '@type': 'Organization', name: 'Carrgo Freight Solutions Ltd' },
  areaServed: { '@type': 'Country', name: 'United Kingdom' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Amazon FBA Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'FBA Prep & Labelling' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Quality Inspection' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Carton Forwarding to Amazon FCs' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Palletised Delivery (BHX4, EMA1, LBA1, MAN2)' } },
    ],
  },
};

const faqData = [
  { q: 'What FBA prep services do you offer?', a: 'Our FBA prep services include product labelling (FNSKU), polybagging, bundling, carton forwarding, palletisation, and quality inspection. We ensure all shipments are 100% compliant with Amazon\'s requirements before delivery to any UK fulfilment centre.' },
  { q: 'How much does shipping from China to Amazon FBA UK cost?', a: 'Costs depend on product type, quantity, weight, and shipping mode. Sea freight from China to Amazon FBA UK typically ranges from £250–£450 per CBM all-inclusive. Air freight is £4.50–£8.00 per kg. Contact us for a precise all-inclusive quote.' },
  { q: 'How long does it take to ship from China to Amazon FBA UK?', a: 'Total transit times from China to Amazon FBA UK vary by mode: sea freight takes 35–45 days door-to-FC, air freight 7–12 days, and rail freight 20–28 days. These times include collection, transit, customs clearance, FBA prep, and delivery to the fulfilment centre.' },
  { q: 'Do you handle Amazon FNSKU labelling?', a: 'Yes, we provide full FNSKU labelling services. Simply send us your FNSKU barcode files and we\'ll print and apply labels to each unit, carton, or pallet according to Amazon\'s specifications. We also handle suffocation warning labels for polybagged items.' },
  { q: 'Can you process Amazon FBA returns?', a: 'Yes, we offer FBA returns management. We can receive returns at our Midlands facility, inspect products, repackage if resellable, and either return them to Amazon inventory or dispose of them according to your instructions.' },
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

export default function AmazonFba() {
  return (
    <>
      <Seo
        title="Amazon FBA Freight UK | FBA Prep & Shipping to Amazon | Carrgo"
        description="FBA freight forwarding for UK Amazon sellers — FBA prep, labelling, inspection & delivery to BHX4, EMA1, LBA1. Ship from China to Amazon FBA UK with customs clearance."
        keywords="amazon fba freight, fba shipping uk, amazon freight forwarder, fba prep uk, ship to amazon uk, fba customs clearance"
        ogUrl="https://carrgo.co.uk/services/amazon-fba-freight"
        canonical="https://carrgo.co.uk/services/amazon-fba-freight"
        structuredData={[serviceSchema, faqSchema]}
      />
      <main id="main-content">
        {/* ====== HERO ====== */}
        <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-gradient-to-br from-[#EFF6FF] to-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Amazon FBA Freight</span>
                <h1 id="hero-heading" className="text-3xl lg:text-5xl font-extrabold text-[#111827] leading-tight mt-3 mb-6">
                  Amazon FBA Freight UK — FBA Prep & Shipping
                </h1>
                <p className="text-lg text-[#4B5563] mb-8 leading-relaxed">
                  FBA freight forwarding for UK and EU Amazon sellers. FBA prep, labelling, inspection, and direct delivery to Amazon fulfilment centres including BHX4, EMA1, LBA1. Shipping from China to Amazon FBA.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    'FBA-compliant prep and labelling',
                    'Direct delivery to Amazon FCs (BHX4, EMA1, LBA1)',
                    'Shipping from China, USA, EU to Amazon UK',
                    'Quality inspection before delivery',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#4B5563]">
                      <CheckCircle className="w-5 h-5 text-[#22C55E] flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-4">
                  <Link to="/get-a-quote" className="inline-flex items-center gap-2 bg-[#1A6DFF] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1557CC] transition-colors min-h-[44px]">
                    Get an FBA Quote <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                  <a href="mailto:info@carrgo.co.uk" className="inline-flex items-center gap-2 bg-white text-[#4B5563] border border-[#E5E7EB] px-6 py-3 rounded-lg font-semibold hover:bg-[#F8FAFC] transition-colors min-h-[44px]">
                    Call Our Team
                  </a>
                </div>
              </div>
              <div className="hidden lg:block">
                <img
                  src="/images/service-fba.jpg"
                  alt="Amazon fulfilment centre with organised warehouse shelves and conveyor belts"
                  className="rounded-2xl shadow-lg w-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ====== FBA SERVICES ====== */}
        <section aria-labelledby="services-heading" className="py-16 md:py-24 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">FBA Services</span>
              <h2 id="services-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3">
                Our Amazon FBA Services
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Package, title: 'FBA Prep', desc: 'Professional product preparation including polybagging, bundling, and packaging to meet Amazon\'s strict FBA requirements.' },
                { icon: Search, title: 'Quality Inspection', desc: 'Pre-shipment quality checks to ensure your products meet Amazon\'s standards and avoid negative customer feedback.' },
                { icon: Boxes, title: 'Carton Forwarding', desc: 'Direct carton forwarding to any UK Amazon fulfilment centre with proper carton labelling and shipment plan compliance.' },
                { icon: Warehouse, title: 'Palletised Delivery', desc: 'Full pallet delivery to BHX4, EMA1, LBA1, MAN2, and all other UK Amazon FCs with Amazon-compliant pallet specifications.' },
                { icon: Barcode, title: 'FNSKU Labelling', desc: 'Barcode printing and application service. We print and apply FNSKU labels, suffocation warnings, and any custom labels you need.' },
                { icon: RotateCcw, title: 'Returns Management', desc: 'FBA returns processing at our Midlands facility. Inspect, repackage, or dispose of returned items according to your instructions.' },
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

        {/* ====== AMAZON FCS ====== */}
        <section aria-labelledby="fcs-heading" className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Fulfilment Centres</span>
              <h2 id="fcs-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3">
                UK Amazon Fulfilment Centres We Deliver To
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { code: 'BHX4', location: 'Coventry', region: 'West Midlands' },
                { code: 'EMA1', location: 'Derby', region: 'East Midlands' },
                { code: 'LBA1', location: 'Doncaster', region: 'Yorkshire' },
                { code: 'MAN2', location: 'Manchester', region: 'North West' },
                { code: 'GLA1', location: 'Gourock', region: 'Scotland' },
              ].map((fc, i) => (
                <article key={i} className="bg-white rounded-xl p-6 border border-[#E5E7EB] hover:shadow-md transition-shadow text-center">
                  <div className="w-12 h-12 bg-[#EBF2FF] rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Warehouse className="w-6 h-6 text-[#1A6DFF]" aria-hidden="true" />
                  </div>
                  <h3 className="font-bold text-xl text-[#111827] mb-1">{fc.code}</h3>
                  <p className="text-[#4B5563] text-sm font-medium">{fc.location}</p>
                  <p className="text-[#9CA3AF] text-xs mt-1">{fc.region}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ====== CHINA TO AMAZON FBA ====== */}
        <section aria-labelledby="china-heading" className="py-16 md:py-24 bg-[#EFF6FF]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">China to Amazon FBA</span>
              <h2 id="china-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3">
                Shipping from China to Amazon FBA UK
              </h2>
              <p className="text-[#4B5563] mt-4 max-w-2xl mx-auto">
                Our specialised China-to-Amazon-FBA service handles everything from supplier collection to delivery at your chosen fulfilment centre.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-[#E5E7EB] max-w-4xl mx-auto">
              <div className="flex flex-wrap items-center justify-center gap-3">
                {['Supplier in China', 'Our Warehouse', 'FBA Prep', 'UK Customs', 'Amazon FC'].map((step, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="bg-[#EBF2FF] text-[#1A6DFF] px-4 py-2 rounded-lg font-semibold text-sm">
                      {step}
                    </div>
                    {i < 4 && <ArrowRight className="w-4 h-4 text-[#9CA3AF]" aria-hidden="true" />}
                  </div>
                ))}
              </div>
              <div className="grid md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-[#E5E7EB]">
                <div className="text-center">
                  <Ship className="w-8 h-8 text-[#1A6DFF] mx-auto mb-2" aria-hidden="true" />
                  <p className="font-semibold text-[#111827]">Sea Freight</p>
                  <p className="text-[#4B5563] text-sm">35–45 days total</p>
                </div>
                <div className="text-center">
                  <Plane className="w-8 h-8 text-[#1A6DFF] mx-auto mb-2" aria-hidden="true" />
                  <p className="font-semibold text-[#111827]">Air Freight</p>
                  <p className="text-[#4B5563] text-sm">7–12 days total</p>
                </div>
                <div className="text-center">
                  <TrainFront className="w-8 h-8 text-[#1A6DFF] mx-auto mb-2" aria-hidden="true" />
                  <p className="font-semibold text-[#111827]">Rail Freight</p>
                  <p className="text-[#4B5563] text-sm">20–28 days total</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====== FBA REQUIREMENTS ====== */}
        <section aria-labelledby="requirements-heading" className="py-16 md:py-24 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Compliance</span>
              <h2 id="requirements-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3">
                Amazon FBA Requirements Checklist
              </h2>
              <p className="text-[#4B5563] mt-4 max-w-2xl mx-auto">
                Amazon has strict requirements for shipments entering their fulfilment centres. We ensure full compliance on every delivery.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {[
                'Pallets: 1200mm × 1000mm UK standard',
                'Max pallet height: 1.8m including pallet',
                'Carton weight: Max 23kg per box',
                'FNSKU labels on every unit',
                'Carton labels on every box',
                'Shipment plan created in Seller Central',
                'Polybags with suffocation warning',
                'No unauthorised marketing materials',
                ' expiry dates labelled if applicable',
              ].map((req, i) => (
                <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-lg border border-[#E5E7EB]">
                  <CheckCircle className="w-5 h-5 text-[#22C55E] flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-[#4B5563] text-sm">{req}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== AMAZON FBA VS STANDARD COMPARISON ====== */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Delivery Options</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3">
                Amazon FBA vs Standard Delivery: Which is right for your business?
              </h2>
              <p className="text-[#4B5563] mt-4 max-w-2xl mx-auto">
                Amazon FBA delivery requires compliance with Amazon's packaging, labelling, and pallet specifications. Standard delivery goes to your warehouse with fewer restrictions. Compare both options to find the best fit for your business model.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow-sm border">
                <thead>
                  <tr className="bg-gray-100">
                    <th scope="col" className="text-left px-6 py-4 font-semibold text-gray-700">Feature</th>
                    <th scope="col" className="text-center px-6 py-4 font-semibold text-gray-600">Standard Delivery</th>
                    <th scope="col" className="text-center px-6 py-4 font-semibold text-[#1A6DFF]">Amazon FBA Delivery</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Destination', 'Your warehouse', 'Amazon fulfilment centre'],
                    ['Packaging requirements', 'Standard', 'Amazon-compliant (carton labels, pallet specs)'],
                    ['Labelling', 'Standard', 'FNSKU labels required'],
                    ['Palletisation', 'Optional', 'Required (unless small parcel)'],
                    ['Customs clearance', 'Standard', 'FBA-specific documentation'],
                    ['Delivery appointment', 'Not required', 'Required (Amazon Appointment System)'],
                    ['Inspection risk', 'Standard', 'Higher (Amazon rejects non-compliant)'],
                    ['Shipping cost', 'Lower', 'Slightly higher (prep + compliance)'],
                    ['Carrgo service', '✅ Yes', '✅ Specialised FBA service'],
                    ['UK centres served', 'Any address', 'BHX4, EMA1, LBA1, MAN2, etc.'],
                  ].map(([feat, standard, fba], i) => (
                    <tr key={i} className="border-t">
                      <td className="px-6 py-3 font-medium text-gray-900">{feat}</td>
                      <td className="px-6 py-3 text-center text-gray-600">{standard}</td>
                      <td className="px-6 py-3 text-center text-gray-600">{fba}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-center text-gray-500 text-sm mt-6 max-w-2xl mx-auto">Not sure which delivery option suits your business? <Link to="/contact" className="text-[#1A6DFF] font-medium hover:underline">Speak to Carrgo</Link> and our FBA team will recommend the best approach.</p>
          </div>
        </section>

        {/* ====== FAQ ====== */}
        <section aria-labelledby="faq-heading" className="py-16 md:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">FBA FAQ</span>
              <h2 id="faq-heading" className="text-3xl font-bold text-[#111827] mt-3">
                Amazon FBA Freight FAQs
              </h2>
            </div>
            <FaqAccordion />
          </div>
        </section>

        {/* ====== CTA BANNER ====== */}
        <section aria-label="Get an Amazon FBA quote" className="py-16 md:py-24 bg-[#1A6DFF]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Get Your Amazon FBA Quote
            </h2>
            <p className="text-white/85 text-lg mb-8 max-w-2xl mx-auto">
              FBA prep, shipping, and delivery included. From China, USA, or EU directly to Amazon UK fulfilment centres.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/get-a-quote" className="inline-flex items-center gap-2 bg-white text-[#1A6DFF] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors min-h-[44px]">
                Get Your FBA Quote <ArrowRight className="w-5 h-5" aria-hidden="true" />
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
                { icon: Warehouse, title: 'Warehousing', desc: 'Midlands storage with pick and pack services', href: '/services/warehousing' },
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

        {/* ====== LAST UPDATED ====== */}
        <section className="py-4 bg-gray-100 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm text-gray-500">
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
                Last Updated: <time dateTime="2026-07-08">July 2026</time> — Amazon FBA requirements and UK fulfilment centre details verified
              </span>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
