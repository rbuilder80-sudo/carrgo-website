import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import {
  Ship, Plane, Truck, Clock, MapPin, ArrowRight,
  CheckCircle, ChevronDown, FileCheck, Shield, TrendingUp,
  Users, Globe, Anchor, Package
} from 'lucide-react';

const faqData = [
  { q: 'How long does road freight from Netherlands to UK take?', a: 'Road freight from the Netherlands to the UK takes just 1–3 days door-to-door, making it one of the fastest European routes. Daily departures are available from Rotterdam, Amsterdam, and other Dutch cities.' },
  { q: 'What makes Rotterdam a key hub for Netherlands-UK shipping?', a: 'Rotterdam is Europe\'s largest seaport and a major logistics hub. Its proximity to the UK, excellent road and rail connections, and massive container throughput make it an ideal origin point for sea, road, and even rail freight to the UK.' },
  { q: 'Do I need special documentation for post-Brexit Netherlands to UK shipping?', a: 'Yes — since Brexit, all goods require a UK customs import declaration. You need a UK EORI number, commercial invoice, packing list, and potentially a proof of origin for UK-EU TCA tariff preferences. Our team handles all documentation for you.' },
  { q: 'How much does it cost to ship from Netherlands to UK?', a: 'Road freight starts from £120 per pallet. Sea freight from Rotterdam to UK ports ranges from £400–£1,000 per container. Air freight is £2–£5 per kilogram. Contact us for a tailored all-inclusive quote.' },
  { q: 'Can you handle hazardous goods from Netherlands to UK?', a: 'Yes, we are fully licensed to handle ADR-classified hazardous goods by road from the Netherlands to the UK, including chemicals, batteries, and flammable materials. All shipments comply with EU and UK dangerous goods regulations.' },
];

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

export default function NetherlandsToUk() {
  return (
    <>
      <Seo
        title="Netherlands to UK Freight | Road, Sea & Air Shipping | Carrgo"
        description="Netherlands to UK freight forwarding — road freight 1-3 days, sea 3-5 days, air 1 day. Daily departures from Rotterdam & Amsterdam. Full post-Brexit customs clearance."
        keywords="netherlands to uk freight, rotterdam to uk shipping, dutch road freight uk, shipping from holland to uk, freight forwarder netherlands uk"
        ogUrl="https://carrgo.co.uk/routes/netherlands-to-uk"
        canonical="https://carrgo.co.uk/routes/netherlands-to-uk"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Netherlands to UK Freight Shipping",
          "provider": { "@type": "Organization", "name": "Carrgo Freight Solutions Ltd" },
          "areaServed": [{"@type": "Country", "name": "Netherlands"}, {"@type": "Country", "name": "United Kingdom"}],
          "description": "Road, sea and air freight forwarding from the Netherlands to the UK with post-Brexit customs clearance."
        }}
      />

      <main id="main-content">
        {/* ====== HERO ====== */}
        <section aria-labelledby="hero-heading" className="bg-gradient-to-br from-brand-900 to-brand-800 text-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block text-xs font-semibold tracking-wider uppercase text-brand-200 mb-3">SHIPPING ROUTE</span>
                <h1 id="hero-heading" className="text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
                  Netherlands to UK Freight — Road, Sea & Air Shipping
                </h1>
                <p className="text-lg text-brand-100 mb-8 leading-relaxed">
                  Road freight from the Netherlands to the UK takes 1–3 days with daily departures via Rotterdam and Amsterdam. Full post-Brexit customs clearance included.
                </p>
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center border border-white/20">
                    <Truck className="w-6 h-6 mx-auto mb-1 text-brand-200" aria-hidden="true" />
                    <div className="text-2xl font-extrabold">1-3</div>
                    <div className="text-xs text-brand-200">Days Road</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center border border-white/20">
                    <Ship className="w-6 h-6 mx-auto mb-1 text-brand-200" aria-hidden="true" />
                    <div className="text-2xl font-extrabold">3-5</div>
                    <div className="text-xs text-brand-200">Days Sea</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center border border-white/20">
                    <Plane className="w-6 h-6 mx-auto mb-1 text-brand-200" aria-hidden="true" />
                    <div className="text-2xl font-extrabold">1</div>
                    <div className="text-xs text-brand-200">Day Air</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Link to="/get-a-quote" className="inline-flex items-center gap-2 bg-white text-brand-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors min-h-[44px]">
                    Get a Quote <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                  <Link to="/contact" className="inline-flex items-center gap-2 bg-brand-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-600 transition-colors min-h-[44px]">
                    Contact Us
                  </Link>
                </div>
              </div>
              <div className="hidden lg:flex items-center justify-center">
                <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20 text-center">
                  <div className="flex items-center justify-center gap-4 text-4xl font-extrabold mb-2">
                    <span role="img" aria-label="Netherlands">🇳🇱</span>
                    <ArrowRight className="w-8 h-8 text-brand-200" aria-hidden="true" />
                    <span role="img" aria-label="United Kingdom">🇬🇧</span>
                  </div>
                  <p className="text-brand-200 text-sm">Netherlands to United Kingdom</p>
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <div className="text-3xl font-extrabold">1–3 Days</div>
                    <p className="text-brand-200 text-xs">By road freight</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====== ROUTE OVERVIEW ====== */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">The Netherlands–UK Trade Lane</h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              The Netherlands is one of the UK&apos;s closest European trading partners and a major logistics gateway to Europe. With Rotterdam — Europe&apos;s largest seaport — and Amsterdam&apos;s Schiphol airport, the Netherlands offers exceptional connectivity. Over £35 billion in goods flow between the two countries annually.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-extrabold text-[#1A6DFF] mb-1">£35B+</div>
                <p className="text-gray-600">Annual UK-Netherlands trade</p>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-[#1A6DFF] mb-1">1-3 Days</div>
                <p className="text-gray-600">Fastest road freight route</p>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-[#1A6DFF] mb-1">Rotterdam</div>
                <p className="text-gray-600">Europe&apos;s largest seaport</p>
              </div>
            </div>
          </div>
        </section>

        {/* ====== TRANSIT TIMES TABLE ====== */}
        <section aria-labelledby="transit-heading" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="transit-heading" className="text-3xl font-bold text-center text-gray-900 mb-4">Transit Times from Netherlands to UK</h2>
            <p className="text-center text-gray-600 mb-8">Estimated transit times by transport mode</p>
            <div className="overflow-x-auto">
              <table className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-sm border">
                <thead>
                  <tr className="bg-gray-100">
                    <th scope="col" className="text-left px-6 py-4 font-semibold text-gray-700">Transport Mode</th>
                    <th scope="col" className="text-center px-6 py-4 font-semibold text-gray-700">Transit Time</th>
                    <th scope="col" className="text-center px-6 py-4 font-semibold text-gray-700">Frequency</th>
                    <th scope="col" className="text-center px-6 py-4 font-semibold text-gray-700">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Road Freight (FTL)', '1–3 days', 'Daily departures', 'Fast delivery, perishable goods'],
                    ['Road Freight (LTL)', '2–4 days', 'Daily departures', 'Smaller loads, groupage'],
                    ['Sea Freight (FCL)', '3–5 days', '3-4x per week', 'Large volumes from Rotterdam'],
                    ['Sea Freight (LCL)', '5–7 days', 'Weekly consolidations', 'Shared container shipments'],
                    ['Air Freight', '1 day', 'Daily flights', 'Same-day/next-day delivery'],
                  ].map(([mode, port, door, best], i) => (
                    <tr key={i} className="border-t">
                      <td className="px-6 py-4 font-medium text-gray-900">{mode}</td>
                      <td className="px-6 py-4 text-center text-gray-600">{port}</td>
                      <td className="px-6 py-4 text-center text-gray-600">{door}</td>
                      <td className="px-6 py-4 text-center text-gray-600">{best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ====== KEY PORTS ====== */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Key Connections</h2>
            <p className="text-center text-gray-600 mb-10">Major Dutch origin points and UK destinations</p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span role="img" aria-label="Netherlands">🇳🇱</span> Netherlands Origin Locations
                </h3>
                <ul className="space-y-3">
                  {[
                    { name: 'Rotterdam', desc: 'Europe&apos;s largest seaport — unmatched container handling capacity' },
                    { name: 'Amsterdam', desc: 'Schiphol Airport — major European air cargo hub' },
                    { name: 'The Hague', desc: 'Government and commercial centre — growing logistics sector' },
                    { name: 'Eindhoven', desc: 'Technology manufacturing hub in southern Netherlands' },
                    { name: 'Utrecht', desc: 'Central Netherlands logistics hub with excellent road links' },
                    { name: 'Moerdijk', desc: 'Inland port and industrial area — alternative to Rotterdam' },
                    { name: 'Venlo', desc: 'Major logistics hotspot near German border — distribution centre' },
                  ].map((port, i) => (
                    <li key={i} className="flex gap-3">
                      <MapPin className="w-5 h-5 text-[#1A6DFF] flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <div className="font-medium text-gray-900">{port.name}</div>
                        <p className="text-gray-600 text-sm">{port.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span role="img" aria-label="United Kingdom">🇬🇧</span> UK Destination Ports & Hubs
                </h3>
                <ul className="space-y-3">
                  {[
                    { name: 'Felixstowe', desc: 'UK&apos;s largest container port — direct Rotterdam services' },
                    { name: 'London Gateway', desc: 'Modern deep-sea port with excellent Dutch connections' },
                    { name: 'Tilbury', desc: 'Fast-growing port on the Thames — frequent Dutch sailings' },
                    { name: 'Manchester', desc: 'Northern distribution centre with strong Dutch freight links' },
                    { name: 'Heathrow Airport', desc: 'Primary air cargo gateway from Amsterdam Schiphol' },
                    { name: 'Midlands', desc: 'Central UK distribution hub — Birmingham, Coventry' },
                    { name: 'Immingham', desc: 'Eastern port for North Sea freight from Dutch ports' },
                  ].map((port, i) => (
                    <li key={i} className="flex gap-3">
                      <Anchor className="w-5 h-5 text-[#1A6DFF] flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <div className="font-medium text-gray-900">{port.name}</div>
                        <p className="text-gray-600 text-sm">{port.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ====== SHIPPING OPTIONS ====== */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Shipping Options from Netherlands to UK</h2>
            <p className="text-center text-gray-600 mb-10">Three modes with the fastest European transit times</p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Truck, title: 'Road Freight', price: '£120–£350/pallet', time: '1–3 days', best: 'Daily departures, fastest option', desc: 'Road freight from the Netherlands is the fastest way to get goods to the UK. Daily FTL and LTL departures from Rotterdam, Amsterdam, and all major Dutch cities. Short Channel crossing via Calais-Dover or Dunkirk-Dover. Full post-Brexit customs transit documentation included.' },
                { icon: Ship, title: 'Sea Freight', price: '£400–£1,000/container', time: '3–5 days', best: 'Large volumes, frequent sailings', desc: 'Short sea shipping from Rotterdam to Felixstowe, London Gateway, or Tilbury. With sailings 3-4 times per week, this is an excellent option for larger shipments that don&apos;t require road speed. FCL and LCL services available.' },
                { icon: Plane, title: 'Air Freight', price: '£2–£5/kg', time: '1 day', best: 'Same-day delivery available', desc: 'Air freight from Amsterdam Schiphol to Heathrow, Manchester, or East Midlands. Multiple daily flights mean your cargo can be delivered same-day or next-day. Ideal for urgent shipments, high-value goods, and time-critical deliveries.' },
              ].map((mode, i) => {
                const Icon = mode.icon;
                return (
                  <article key={i} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                    <Icon className="w-12 h-12 text-[#1A6DFF] mb-4" aria-hidden="true" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{mode.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-700 bg-blue-50 px-2 py-1 rounded">{mode.price}</span>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-green-700 bg-green-50 px-2 py-1 rounded">{mode.time}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3 font-medium">{mode.best}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{mode.desc}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ====== POPULAR GOODS ====== */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Popular Goods Shipped from Netherlands to UK</h2>
            <p className="text-center text-gray-600 mb-10">Commodities we regularly handle on this route</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'Flowers & Plants', desc: 'Fresh-cut flowers, bulbs, and plants — time-critical road freight specialists.' },
                { name: 'Food & Beverage', desc: 'Dutch cheeses, confectionery, speciality foods, and premium beverages.' },
                { name: 'Chemicals & Oils', desc: 'Petrochemical products, speciality chemicals, and lubricants from Rotterdam.' },
                { name: 'Electronics', desc: 'Consumer electronics, semiconductors, and tech components via Schiphol.' },
                { name: 'Plastics & Polymers', desc: 'Raw plastics, packaging materials, and manufactured plastic goods.' },
                { name: 'Machinery', desc: 'Agricultural machinery, industrial equipment, and precision instruments.' },
                { name: 'Furniture & Design', desc: 'Dutch design furniture, lighting, and interior products.' },
                { name: 'Petroleum Products', desc: 'Refined fuels, lubricants, and energy products from Rotterdam refineries.' },
              ].map((item, i) => (
                <article key={i} className="bg-gray-50 rounded-lg p-5 border border-gray-100 hover:shadow-md transition-shadow">
                  <Package className="w-8 h-8 text-[#1A6DFF] mb-2" aria-hidden="true" />
                  <h3 className="font-bold text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ====== CUSTOMS & DOCUMENTATION ====== */}
        <section className="py-16 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Customs Clearance & Documentation</h2>
            <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
              Our experienced team manages all post-Brexit customs requirements for Netherlands to UK shipments.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-[#1A6DFF]" aria-hidden="true" /> Required Documents
                </h3>
                <ul className="space-y-2">
                  {[
                    'Commercial Invoice with accurate goods description and value',
                    'Packing List with weights, dimensions, and commodity codes',
                    'UK EORI Number (essential for all UK-bound imports)',
                    'Proof of Origin statement (for TCA zero-tariff goods)',
                    'T1 Transit Document (for road freight movements)',
                    'Import Safety & Security declaration (ENS)',
                  ].map((doc, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#1A6DFF]" aria-hidden="true" /> Customs Information
                </h3>
                <ul className="space-y-3 text-gray-600 text-sm">
                  <li className="flex justify-between pb-2 border-b border-gray-100">
                    <span>Import Duty</span>
                    <span className="font-medium">0% with valid UK-EU TCA proof of origin</span>
                  </li>
                  <li className="flex justify-between pb-2 border-b border-gray-100">
                    <span>VAT</span>
                    <span className="font-medium">20% (UK standard rate)</span>
                  </li>
                  <li className="flex justify-between pb-2 border-b border-gray-100">
                    <span>Sanitary Checks (SPS)</span>
                    <span className="font-medium">Required for food, plants, and animal products</span>
                  </li>
                  <li className="flex justify-between pb-2 border-b border-gray-100">
                    <span>Customs Clearance</span>
                    <span className="font-medium">Included in Carrgo service</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Transit Time Impact</span>
                    <span className="font-medium">Minimal with pre-clearance</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ====== WHY CHOOSE CARRGO ====== */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Why Choose Carrgo for Netherlands–UK Shipping</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Clock, title: 'Fastest Route', desc: '1–3 day road freight — one of the fastest European routes to the UK with daily departures.' },
                { icon: FileCheck, title: 'Brexit Specialists', desc: 'Our customs team handles all post-Brexit declarations ensuring zero delays at the border.' },
                { icon: Truck, title: 'Full Fleet Access', desc: 'FTL, LTL, groupage, and express vans — whatever your volume, we have the right vehicle.' },
                { icon: TrendingUp, title: 'Live Tracking', desc: 'Real-time shipment visibility from Dutch collection through Channel crossing to UK delivery.' },
                { icon: Users, title: 'Local Expertise', desc: 'Strong partnerships with Dutch logistics providers and hauliers for seamless collection.' },
                { icon: Shield, title: 'All-Inclusive Pricing', desc: 'One quote covers Dutch collection, Channel crossing, UK customs, and final delivery.' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <article key={i} className="flex gap-4 p-5 bg-gray-50 rounded-xl">
                    <div className="flex-shrink-0 w-10 h-10 bg-[#EBF2FF] rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#1A6DFF]" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{item.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ====== FAQ ====== */}
        <section aria-labelledby="faq-heading" className="py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="faq-heading" className="text-3xl font-bold text-center text-gray-900 mb-8">Frequently Asked Questions</h2>
            <FaqAccordion />
          </div>
        </section>

        {/* ====== CTA ====== */}
        <section className="py-16 bg-brand-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Get Your Netherlands–UK Freight Quote</h2>
            <p className="text-brand-100 mb-8 text-lg">Road freight from £120 per pallet. Daily departures. All-inclusive quote within 2 hours.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/get-a-quote" className="inline-flex items-center gap-2 bg-white text-brand-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors min-h-[44px]">
                Get a Free Quote <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 bg-brand-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-brand-600 transition-colors min-h-[44px]">
                Contact Us
              </Link>
            </div>
          </div>
        </section>

        {/* ====== ROTTERDAM–DUBLIN DIRECT CONNECTIONS ====== */}
        <section className="py-16 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Netherlands to Ireland Direct Connections</h2>
            <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
              Rotterdam serves as Europe's largest port and offers direct ferry and short-sea connections to Dublin, making it an ideal gateway for Netherlands to Ireland freight. We offer seamless routing from Rotterdam to Dublin and onward to all Irish destinations.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Ship, title: 'Rotterdam to Dublin Ferry', time: '24–36 hours', desc: 'Direct short-sea and feeder services from Rotterdam to Dublin Port. Ideal for containers and RoRo cargo avoiding UK land bridge transit. Weekly sailings with reliable schedules.' },
                { icon: Truck, title: 'Road Freight NL to Ireland', time: '2–4 days', desc: 'Road freight from Rotterdam, Amsterdam, or any Dutch city to Dublin, Cork, and all Irish destinations. Includes ferry crossing and Irish customs clearance with T1 transit documents.' },
                { icon: Ship, title: 'Netherlands to Northern Ireland', time: '2–4 days', desc: 'Sea freight from Rotterdam to Belfast via Liverpool or direct feeder services. Full Northern Ireland Protocol documentation and Windsor Framework compliance included.' },
              ].map((mode, i) => {
                const Icon = mode.icon;
                return (
                  <article key={i} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                    <Icon className="w-10 h-10 text-[#1A6DFF] mb-3" aria-hidden="true" />
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{mode.title}</h3>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-green-700 bg-green-50 px-2 py-1 rounded mb-3">{mode.time}</span>
                    <p className="text-gray-600 text-sm leading-relaxed">{mode.desc}</p>
                  </article>
                );
              })}
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

        {/* ====== OTHER ROUTES ====== */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Other Popular Shipping Routes</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'China', flag: '🇨🇳', route: '/routes/china-to-uk' },
                { name: 'Germany', flag: '🇩🇪', route: '/routes/germany-to-uk' },
                { name: 'Ireland (Dublin)', flag: '🇮🇪', route: '/routes/dublin-ireland' },
                { name: 'India', flag: '🇮🇳', route: '/routes/india-to-uk' },
                { name: 'USA', flag: '🇺🇸', route: '/routes/usa-to-uk' },
                { name: 'Turkey', flag: '🇹🇷', route: '/routes/turkey-to-uk' },
                { name: 'UAE', flag: '🇦🇪', route: '/routes/uae-to-uk' },
                { name: 'Spain', flag: '🇪🇸', route: '/routes/spain-to-uk' },
              ].map((r, i) => (
                <Link key={i} to={r.route} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md hover:border-blue-200 transition-all text-center">
                  <span className="text-2xl mb-1 block" role="img" aria-label={r.name}>{r.flag}</span>
                  <span className="font-medium text-gray-900 text-sm">{r.name} to UK</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
