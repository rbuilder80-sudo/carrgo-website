import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import {
  Ship, Plane, Truck, TrainFront, FileCheck, Package,
  Warehouse, Globe, ArrowRight, CheckCircle, ChevronDown,
  Clock, Shield, Thermometer, Camera, PackageCheck, TruckIcon, Flame, Lock, Barcode
} from 'lucide-react';

/* ── JSON-LD Structured Data ── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Warehousing UK — Midlands Storage & Fulfilment',
  provider: { '@type': 'Organization', name: 'Carrgo Freight Solutions Ltd' },
  areaServed: { '@type': 'Country', name: 'United Kingdom' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Warehousing Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Short & Long-Term Storage' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pick & Pack Fulfilment' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Container Devanning' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bonded Warehouse Storage' } },
    ],
  },
};

const faqData = [
  { q: 'How much does warehousing in the Midlands cost?', a: 'Our warehousing costs depend on storage duration, pallet volume, and services required. Standard pallet storage starts from £4.50 per pallet per week. Pick and pack fulfilment is priced per order. Contact us for a tailored warehousing quote based on your specific requirements.' },
  { q: 'Is there a minimum storage commitment?', a: 'We have no minimum storage commitment for standard warehousing. You can store as little as one pallet. For fulfilment services, we recommend a minimum of 50 orders per month for cost efficiency. Bonded warehouse storage has a 3-month minimum commitment.' },
  { q: 'Where is your Midlands warehouse located?', a: 'Our 200,000 sq ft facility is strategically located in the West Midlands with excellent motorway links (M6, M42, M1) providing access to 90% of the UK population within 4 hours. The location is ideal for nationwide distribution.' },
  { q: 'What is bonded warehouse storage?', a: 'Bonded warehousing allows you to store imported goods without paying UK customs duty and VAT until the goods are released into free circulation. This improves cash flow and is ideal for importers who re-export or distribute over time.' },
  { q: 'Do you offer fulfilment and pick and pack services?', a: 'Yes, we offer full pick and pack fulfilment including order processing, picking, packing, labelling, and dispatch. We integrate with major e-commerce platforms and can handle everything from single-item orders to bulk B2B shipments.' },
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

export default function Warehousing() {
  return (
    <>
      <Seo
        title="Warehousing UK | Midlands Storage, Pick & Pack & Fulfilment | Carrgo"
        description="UK warehousing in the Midlands with pick & pack fulfilment, container devanning, bonded storage & UK-wide distribution. Secure facility with real-time inventory management."
        keywords="warehousing uk, uk warehouse storage, pick and pack uk, fulfilment warehouse, bonded warehouse uk, midlands warehouse"
        ogUrl="https://carrgo.co.uk/services/warehousing"
        canonical="https://carrgo.co.uk/services/warehousing"
        structuredData={[serviceSchema, faqSchema]}
      />
      <main id="main-content">
        {/* ====== HERO ====== */}
        <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-gradient-to-br from-[#EFF6FF] to-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Warehousing Services</span>
                <h1 id="hero-heading" className="text-3xl lg:text-5xl font-extrabold text-[#111827] leading-tight mt-3 mb-6">
                  Warehousing UK — Midlands Storage Facility
                </h1>
                <p className="text-lg text-[#4B5563] mb-8 leading-relaxed">
                  UK warehousing and storage in the Midlands with pick and pack fulfilment, container devanning, bonded warehouse, and UK-wide distribution. 200,000 sq ft of secure, CCTV-monitored space.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    '200,000 sq ft Midlands facility',
                    'Pick and pack fulfilment',
                    'Container devanning and cross-docking',
                    'Bonded warehouse available',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#4B5563]">
                      <CheckCircle className="w-5 h-5 text-[#22C55E] flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-4">
                  <Link to="/get-a-quote" className="inline-flex items-center gap-2 bg-[#1A6DFF] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1557CC] transition-colors min-h-[44px]">
                    Get a Warehousing Quote <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                  <a href="tel:+442039505050" className="inline-flex items-center gap-2 bg-white text-[#4B5563] border border-[#E5E7EB] px-6 py-3 rounded-lg font-semibold hover:bg-[#F8FAFC] transition-colors min-h-[44px]">
                    Call Our Team
                  </a>
                </div>
              </div>
              <div className="hidden lg:block">
                <img
                  src="/images/service-warehouse.jpg"
                  alt="Interior of modern warehouse with high ceilings, racking systems and forklift"
                  className="rounded-2xl shadow-lg w-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ====== WAREHOUSE SERVICES ====== */}
        <section aria-labelledby="services-heading" className="py-16 md:py-24 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Warehouse Services</span>
              <h2 id="services-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3">
                What We Offer
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Warehouse, title: 'Storage', desc: 'Short and long-term pallet storage in our secure Midlands facility. Flexible terms with no minimum commitment for standard storage.' },
                { icon: PackageCheck, title: 'Pick & Pack', desc: 'Complete order fulfilment including picking, packing, labelling, and dispatch. Integrates with Shopify, Amazon, eBay, and more.' },
                { icon: Package, title: 'Container Devanning', desc: 'Professional unloading and sorting of container shipments. We handle 20ft and 40ft containers with care and efficiency.' },
                { icon: TruckIcon, title: 'Cross-Docking', desc: 'Direct transfer of goods from inbound to outbound vehicles with minimal or no storage. Ideal for time-sensitive distribution.' },
                { icon: Shield, title: 'Bonded Storage', desc: 'Duty-suspended warehousing — store imported goods without paying customs duty and VAT until release. Improves cash flow.' },
                { icon: Globe, title: 'UK Distribution', desc: 'Nationwide delivery network covering England, Scotland, Wales, and Northern Ireland. Next-day and economy options available.' },
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

        {/* ====== FACILITY FEATURES ====== */}
        <section aria-labelledby="facility-heading" className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Our Facility</span>
              <h2 id="facility-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3">
                Our Midlands Facility
              </h2>
              <p className="text-[#4B5563] mt-4 max-w-2xl mx-auto">
                200,000 sq ft of modern warehousing with state-of-the-art security and inventory management systems.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Camera, title: '24/7 CCTV', desc: 'Comprehensive CCTV coverage monitored around the clock by professional security staff.' },
                { icon: Thermometer, title: 'Climate Controlled', desc: 'Temperature-controlled zones available for sensitive goods and pharmaceuticals.' },
                { icon: Warehouse, title: 'Racking Systems', desc: 'Modern adjustable racking systems maximising storage efficiency and accessibility.' },
                { icon: Truck, title: 'Loading Bays', desc: 'Multiple loading bays with dock levellers for efficient loading and unloading.' },
                { icon: Barcode, title: 'FIFO Management', desc: 'First-in-first-out inventory management ensuring stock rotation and freshness.' },
                { icon: Globe, title: 'Inventory System', desc: 'Real-time inventory tracking with online portal access for full stock visibility.' },
                { icon: Flame, title: 'Fire Protection', desc: 'Full sprinkler system, fire alarms, and regular safety inspections throughout.' },
                { icon: Lock, title: 'Secure Perimeter', desc: 'Fenced perimeter with controlled access gates and 24-hour security presence.' },
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

        {/* ====== INTEGRATION ====== */}
        <section aria-labelledby="integration-heading" className="py-16 md:py-24 bg-[#EFF6FF]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Integration</span>
              <h2 id="integration-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3">
                Warehouse + Freight = Seamless Supply Chain
              </h2>
              <p className="text-[#4B5563] mt-4 max-w-2xl mx-auto">
                Combine our warehousing with our freight services for a fully integrated supply chain solution.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-[#E5E7EB] max-w-4xl mx-auto">
              <div className="flex flex-wrap items-center justify-center gap-3">
                {[
                  { label: 'Goods Arrive', icon: Ship },
                  { label: 'Stored', icon: Warehouse },
                  { label: 'Picked & Packed', icon: PackageCheck },
                  { label: 'Distributed', icon: Truck },
                ].map((step, i, arr) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="bg-[#EBF2FF] text-[#1A6DFF] px-4 py-3 rounded-lg font-semibold text-sm flex items-center gap-2">
                      <step.icon className="w-4 h-4" aria-hidden="true" />
                      {step.label}
                    </div>
                    {i < arr.length - 1 && <ArrowRight className="w-5 h-5 text-[#9CA3AF]" aria-hidden="true" />}
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t border-[#E5E7EB]">
                <p className="text-[#4B5563] text-center leading-relaxed">
                  Your goods arrive by sea, air, road, or rail directly into our Midlands warehouse. 
                  We store them securely, pick and pack orders as they come in, and distribute 
                  nationwide via our trusted carrier network. One provider, one invoice, complete visibility.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ====== PROCESS ====== */}
        <section aria-labelledby="process-heading" className="py-16 md:py-24 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">How It Works</span>
              <h2 id="process-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3">
                Our Warehousing Process
              </h2>
            </div>
            <ol className="grid md:grid-cols-4 gap-8">
              {[
                { step: '1', title: 'Receiving', desc: 'Goods arrive by container, pallet, or carton and are checked against documentation.' },
                { step: '2', title: 'Storage', desc: 'Items are put away in designated locations with barcode scanning for accuracy.' },
                { step: '3', title: 'Processing', desc: 'Orders are picked, packed, and labelled according to your specifications.' },
                { step: '4', title: 'Dispatch', desc: 'Shipments are dispatched via our carrier network with full tracking.' },
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

        {/* ====== FAQ ====== */}
        <section aria-labelledby="faq-heading" className="py-16 md:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Warehousing FAQ</span>
              <h2 id="faq-heading" className="text-3xl font-bold text-[#111827] mt-3">
                Warehousing Frequently Asked Questions
              </h2>
            </div>
            <FaqAccordion />
          </div>
        </section>

        {/* ====== CTA BANNER ====== */}
        <section aria-label="Get a warehousing quote" className="py-16 md:py-24 bg-[#1A6DFF]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Get Your Warehousing Quote
            </h2>
            <p className="text-white/85 text-lg mb-8 max-w-2xl mx-auto">
              200,000 sq ft Midlands facility with pick and pack, bonded storage, and UK-wide distribution.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/get-a-quote" className="inline-flex items-center gap-2 bg-white text-[#1A6DFF] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors min-h-[44px]">
                Get a Warehousing Quote <ArrowRight className="w-5 h-5" aria-hidden="true" />
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
                { icon: Globe, title: 'Amazon FBA', desc: 'FBA prep & delivery to UK fulfilment centres', href: '/services/amazon-fba-freight' },
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
