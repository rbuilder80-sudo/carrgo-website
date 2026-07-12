import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import {
  Plane, ArrowRight, CheckCircle, ChevronRight, ChevronDown,
  Clock, Shield, Package, Globe, Zap, Box, FileCheck, Fuel, Cpu, Shirt, Pill
} from 'lucide-react';

/* ── JSON-LD Structured Data ── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Air Cargo UK — International Air Freight Shipping',
  provider: {
    '@type': 'Organization',
    name: 'Carrgo Freight Solutions Ltd',
    url: 'https://carrgo.co.uk',
  },
  areaServed: { '@type': 'Country', name: 'United Kingdom' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Air Cargo Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Express Air Cargo — 1 to 3 Days' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Economy Air Freight — 3 to 5 Days' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Air Charter Services' } },
    ],
  },
};

/* ── FAQ Data ── */
const faqData = [
  {
    q: 'How much does air cargo from the UK cost?',
    a: 'Air cargo rates from the UK typically range from £3.50 to £8.50 per kilogram depending on the destination, service level (express vs economy), and fuel surcharges. Express services to the USA start from around £4.50/kg, while economy to China can be as low as £3.50/kg. Contact us for a precise quote based on your cargo.',
  },
  {
    q: 'How long does international air freight take from the UK?',
    a: 'Express air cargo takes 1–3 days to major destinations including the USA, China, UAE and Germany. Economy air freight typically takes 3–5 days. Transit times depend on the departure airport, destination, airline service, and customs clearance speed at both ends.',
  },
  {
    q: 'What airports do you use for air cargo departures?',
    a: 'We operate from all major UK airports including Heathrow (LHR), the UK\'s largest cargo hub, East Midlands (EMA) with excellent European connections, and Manchester (MAN) for northern UK collections. We also use Birmingham and Glasgow for regional convenience.',
  },
  {
    q: 'What cargo types can you ship by air?',
    a: 'We handle general cargo, e-commerce goods, electronics, textiles, pharmaceuticals, automotive parts, perishables, and dangerous goods (subject to aviation industry regulations). Restricted items include hazardous materials without proper documentation, lithium batteries (subject to limits), and items prohibited by destination countries.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqData.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
};

/* ── Air Cargo Services ── */
const airServices = [
  {
    icon: Zap,
    title: 'Express Air Cargo',
    time: '1–3 Days',
    description: 'Our fastest international air cargo service for urgent shipments. Direct flights from Heathrow to major global hubs with priority handling and expedited customs clearance. Ideal for time-critical cargo, spare parts, and just-in-time manufacturing deliveries.',
    features: ['Priority booking & handling', 'Direct flight routing', 'Express customs clearance', 'Door-to-door in 1–3 days'],
  },
  {
    icon: Plane,
    title: 'Economy Air Freight',
    time: '3–5 Days',
    description: 'Cost-effective air freight with reliable transit times. Consolidated cargo services via scheduled airlines offer an excellent balance between speed and price. Perfect for regular stock replenishment, e-commerce inventory, and non-urgent commercial shipments.',
    features: ['Competitive per-kg rates', 'Consolidated cargo handling', 'Scheduled airline departures', 'Full tracking & updates'],
  },
  {
    icon: Globe,
    title: 'Air Charter',
    time: 'On Demand',
    description: 'Dedicated aircraft charter for oversized, heavy, or time-critical cargo that cannot wait for scheduled services. Full aircraft charter gives you complete control over departure times, routing, and handling requirements. Available 24/7.',
    features: ['Full aircraft control', 'Any UK airport departure', 'Oversized & heavy cargo', '24/7 availability'],
  },
];

/* ── UK Departure Airports ── */
const airports = [
  {
    code: 'LHR',
    name: 'Heathrow Airport',
    location: 'London',
    description: 'The UK\'s largest and busiest cargo airport handling over 1.7 million tonnes of freight annually. Direct connections to 200+ destinations worldwide with multiple daily departures to USA, China, UAE, India and Europe.',
    strengths: 'Global reach, multiple daily departures, all cargo types',
  },
  {
    code: 'EMA',
    name: 'East Midlands Airport',
    location: 'Derby/Leicester',
    description: 'The UK\'s leading pure cargo airport and a major hub for express parcel operators. Excellent for European road feeder services and late-night departures to the USA and Asia. Ideal for Midlands and northern England collections.',
    strengths: 'Express operations, European connections, late cut-off times',
  },
  {
    code: 'MAN',
    name: 'Manchester Airport',
    location: 'Manchester',
    description: 'A major international gateway with growing cargo operations. Strong links to North America, Middle East and Asia. Convenient for businesses located in the north of England, Scotland and Northern Ireland.',
    strengths: 'Northern UK access, growing cargo capacity, competitive rates',
  },
];

/* ── Popular Destinations ── */
const destinations = [
  { country: 'United States', flag: '🇺🇸', express: '1–2 days', economy: '2–4 days', airports: 'JFK, LAX, ORD, MIA', route: 'usa-to-uk' },
  { country: 'China', flag: '🇨🇳', express: '2–3 days', economy: '3–5 days', airports: 'PVG, PEK, CAN, SZX', route: 'china-to-uk' },
  { country: 'UAE', flag: '🇦🇪', express: '1–2 days', economy: '2–3 days', airports: 'DXB, AUH, SHJ', route: 'uae-to-uk' },
  { country: 'Germany', flag: '🇩🇪', express: '1 day', economy: '1–2 days', airports: 'FRA, MUC, DUS, HAM', route: 'germany-to-uk' },
  { country: 'India', flag: '🇮🇳', express: '2–3 days', economy: '3–5 days', airports: 'BOM, DEL, MAA, BLR', route: 'india-to-uk' },
];

/* ── Cargo Types ── */
const cargoTypes = [
  { icon: Box, name: 'General Cargo', desc: 'Non-specialised goods, manufactured products, consumer items' },
  { icon: Cpu, name: 'Electronics', desc: 'Smartphones, laptops, circuit boards, components' },
  { icon: Shirt, name: 'Textiles & Fashion', desc: 'Clothing, fabrics, footwear, accessories' },
  { icon: Pill, name: 'Pharmaceuticals', desc: 'Temperature-controlled medicines, medical supplies' },
  { icon: Fuel, name: 'Automotive Parts', desc: 'Spare parts, engines, tyres, accessories' },
  { icon: Package, name: 'E-commerce Goods', desc: 'Online retail stock, small parcels, fulfilment inventory' },
  { icon: FileCheck, name: 'Documents & Samples', desc: 'Business documents, product samples, prototypes' },
  { icon: Shield, name: 'High-Value Goods', desc: 'Jewellery, precious metals, luxury items with full insurance' },
];

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
            aria-controls={`faq-ans-${i}`}
          >
            <span>{faq.q}</span>
            <ChevronDown
              className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ${openIdx === i ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
          </button>
          {openIdx === i && (
            <div id={`faq-ans-${i}`} className="px-4 pb-4 text-gray-600 leading-relaxed">
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function AirCargo() {
  return (
    <>
      <Seo
        title="Air Cargo UK | International Air Freight Shipping | Carrgo"
        description="International air cargo from the UK. Express & economy air freight to 200+ destinations. Heathrow, East Midlands, Manchester airports."
        keywords="air cargo uk, air cargo shipping, international air cargo, air freight cargo, cargo shipping uk, air freight uk, express air cargo, economy air freight, heathrow cargo"
        ogUrl="https://carrgo.co.uk/services/air-cargo"
        canonical="https://carrgo.co.uk/services/air-cargo"
        structuredData={[serviceSchema, faqSchema]}
      />

      <main id="main-content">
        {/* ====== HERO ====== */}
        <section aria-labelledby="hero-heading" className="bg-gradient-to-br from-[#0f4db5] to-[#1A6DFF] text-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block text-xs font-semibold tracking-wider uppercase text-blue-200 mb-3">Air Freight Services</span>
                <h1 id="hero-heading" className="text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
                  Air Cargo UK — International Air Freight Shipping
                </h1>
                <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                  When speed matters, air cargo is the answer. Carrgo provides express and economy air freight services from Heathrow, East Midlands and Manchester airports to over 200 destinations worldwide. From urgent spare parts to regular stock replenishment, our air cargo solutions keep your supply chain moving at the speed of business.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    'Express 1–3 day and economy 3–5 day options',
                    'Departure from Heathrow, East Midlands & Manchester',
                    'All-inclusive rates with customs clearance',
                    'Real-time cargo tracking and status updates',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-blue-100">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/get-a-quote"
                    className="inline-flex items-center gap-2 bg-white text-[#1A6DFF] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors min-h-[44px]"
                  >
                    Get Air Cargo Quote <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                  <Link
                    to="/services/air-freight"
                    className="inline-flex items-center gap-2 bg-[#1A6DFF] text-white border border-white/30 px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors min-h-[44px]"
                  >
                    Air Freight Overview
                  </Link>
                </div>
              </div>
              <div className="hidden lg:grid grid-cols-1 gap-4">
                <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center border border-white/20">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <Zap className="w-8 h-8 mx-auto mb-1 text-blue-200" aria-hidden="true" />
                      <div className="text-2xl font-extrabold">1–3</div>
                      <div className="text-xs text-blue-200">Days Express</div>
                    </div>
                    <div className="text-center">
                      <Plane className="w-8 h-8 mx-auto mb-1 text-blue-200" aria-hidden="true" />
                      <div className="text-2xl font-extrabold">3–5</div>
                      <div className="text-xs text-blue-200">Days Economy</div>
                    </div>
                    <div className="text-center">
                      <Globe className="w-8 h-8 mx-auto mb-1 text-blue-200" aria-hidden="true" />
                      <div className="text-2xl font-extrabold">200+</div>
                      <div className="text-xs text-blue-200">Destinations</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center border border-white/20">
                  <div className="text-sm text-blue-200 mb-2">UK Departure Airports</div>
                  <div className="flex justify-center gap-6 font-semibold">
                    <span>Heathrow (LHR)</span>
                    <span>East Midlands (EMA)</span>
                    <span>Manchester (MAN)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====== AIR CARGO SERVICES ====== */}
        <section aria-labelledby="services-heading" className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Service Levels</span>
              <h2 id="services-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3 mb-4">
                Air Cargo Services
              </h2>
              <p className="text-[#4B5563] max-w-2xl mx-auto">
                Choose the service level that matches your timeline and budget. From express next-day delivery to economical freight consolidation, we have the right air cargo solution for your shipment.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {airServices.map((service, i) => {
                const Icon = service.icon;
                return (
                  <div key={i} className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-6 flex flex-col">
                    <div className="w-12 h-12 bg-[#EFF6FF] rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-[#1A6DFF]" aria-hidden="true" />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-[#111827]">{service.title}</h3>
                    </div>
                    <div className="inline-block bg-[#EFF6FF] text-[#1A6DFF] text-xs font-semibold px-2 py-1 rounded mb-3 self-start">
                      {service.time}
                    </div>
                    <p className="text-[#4B5563] leading-relaxed mb-4 flex-grow">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feat, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-[#4B5563]">
                          <CheckCircle className="w-4 h-4 text-[#22C55E] flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ====== UK DEPARTURE AIRPORTS ====== */}
        <section aria-labelledby="airports-heading" className="py-16 md:py-24 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">UK Departure Points</span>
              <h2 id="airports-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3 mb-4">
                Air Cargo Departure Airports
              </h2>
              <p className="text-[#4B5563] max-w-2xl mx-auto">
                We operate from the UK&apos;s major cargo airports, giving you flexibility in departure location and access to the best flight connections for your destination.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {airports.map((airport, i) => (
                <div key={i} className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-[#EFF6FF] rounded-lg flex items-center justify-center">
                      <Plane className="w-6 h-6 text-[#1A6DFF]" aria-hidden="true" />
                    </div>
                    <span className="text-2xl font-extrabold text-[#EFF6FF]">{airport.code}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#111827] mb-1">{airport.name}</h3>
                  <p className="text-sm text-[#1A6DFF] font-medium mb-3">{airport.location}</p>
                  <p className="text-[#4B5563] text-sm leading-relaxed mb-3">{airport.description}</p>
                  <div className="pt-3 border-t border-[#E5E7EB]">
                    <span className="text-xs font-semibold text-[#111827]">Key Strengths: </span>
                    <span className="text-xs text-[#4B5563]">{airport.strengths}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== POPULAR DESTINATIONS ====== */}
        <section aria-labelledby="destinations-heading" className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Global Reach</span>
              <h2 id="destinations-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3 mb-4">
                Popular Air Cargo Destinations
              </h2>
              <p className="text-[#4B5563] max-w-2xl mx-auto">
                We ship air cargo to over 200 destinations worldwide. Here are our most popular routes from the UK with indicative transit times.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              {destinations.map((dest, i) => (
                <div key={i} className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-5 text-center">
                  <div className="text-4xl mb-2">{dest.flag}</div>
                  <h3 className="font-bold text-[#111827] mb-3">{dest.country}</h3>
                  <div className="space-y-2 text-sm text-left">
                    <div className="flex items-center justify-between text-[#4B5563]">
                      <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-[#1A6DFF]" /> Express</span>
                      <span className="font-semibold">{dest.express}</span>
                    </div>
                    <div className="flex items-center justify-between text-[#4B5563]">
                      <span className="flex items-center gap-1"><Plane className="w-3 h-3 text-[#1A6DFF]" /> Economy</span>
                      <span className="font-semibold">{dest.economy}</span>
                    </div>
                    <div className="text-xs text-[#4B5563] pt-2 border-t border-[#E5E7EB]">
                      Airports: {dest.airports}
                    </div>
                  </div>
                  <Link
                    to={`/routes/${dest.route}`}
                    className="inline-flex items-center gap-1 text-[#1A6DFF] font-semibold hover:underline mt-3 text-sm"
                  >
                    View Route <ChevronRight className="w-3 h-3" aria-hidden="true" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== CARGO TYPES ACCEPTED ====== */}
        <section aria-labelledby="cargo-heading" className="py-16 md:py-24 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">What We Ship</span>
              <h2 id="cargo-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3 mb-4">
                Cargo Types Accepted
              </h2>
              <p className="text-[#4B5563] max-w-2xl mx-auto">
                Our air cargo services handle a wide range of goods. From everyday commercial products to specialised shipments, we have the expertise to ship your cargo safely and compliantly.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {cargoTypes.map((cargo, i) => {
                const Icon = cargo.icon;
                return (
                  <div key={i} className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-5 flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#EFF6FF] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[#1A6DFF]" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#111827] text-sm mb-1">{cargo.name}</h3>
                      <p className="text-[#4B5563] text-xs leading-relaxed">{cargo.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ====== FAQ ====== */}
        <section aria-labelledby="faq-heading" className="py-16 md:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">FAQ</span>
              <h2 id="faq-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3 mb-4">
                Air Cargo Frequently Asked Questions
              </h2>
              <p className="text-[#4B5563]">
                Get answers to the most common questions about international air cargo shipping from the UK.
              </p>
            </div>
            <FaqAccordion />
          </div>
        </section>

        {/* ====== CTA ====== */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-[#0f4db5] to-[#1A6DFF] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-4">
              Get Your Air Cargo Quote Today
            </h2>
            <p className="text-lg text-blue-100 mb-8 leading-relaxed">
              Need express air cargo or economy air freight? Our team will provide a competitive, all-inclusive quote within 2 hours. Tell us your cargo details and destination, and we will handle the rest.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/get-a-quote"
                className="inline-flex items-center gap-2 bg-white text-[#1A6DFF] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors min-h-[44px]"
              >
                Get Air Cargo Quote <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <a
                href="tel:+442045827588"
                className="inline-flex items-center gap-2 bg-transparent text-white border border-white/30 px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors min-h-[44px]"
              >
                Call 020 4582 7588
              </a>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-blue-200">
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4" aria-hidden="true" /> Express & economy options</span>
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4" aria-hidden="true" /> All UK airports</span>
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4" aria-hidden="true" /> 200+ destinations</span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
