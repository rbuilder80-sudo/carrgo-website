import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import {
  Ship, Plane, Truck, Clock, MapPin, ArrowRight,
  CheckCircle, ChevronDown, FileCheck, Shield, TrendingUp,
  Users, Globe, Anchor, Package
} from 'lucide-react';

const faqData = [
  { q: 'How long does road freight from Germany to UK take?', a: 'Road freight from Germany to the UK typically takes 2–4 days door-to-door, depending on the exact origin and destination. Daily departures are available from major German cities including Hamburg, Frankfurt, Munich, and Berlin to all UK destinations.' },
  { q: 'What post-Brexit documents do I need for Germany to UK shipping?', a: 'Since Brexit, goods moving from Germany to the UK require a UK EORI number, commercial invoice, packing list, and a UK customs import declaration. For goods qualifying under the UK-EU Trade and Cooperation Agreement (TCA), a statement on origin may be required for zero tariff eligibility.' },
  { q: 'Is sea freight from Germany to UK faster than road?', a: 'No — road freight is faster at 2–4 days, while sea freight from Hamburg or Bremerhaven to UK ports takes 5–8 days. However, sea freight can be more economical for very large shipments or non-urgent bulk cargo. Many businesses choose road for its speed and flexibility.' },
  { q: 'How much does shipping a pallet from Germany to UK cost?', a: 'Road freight from Germany to the UK typically costs £150–£400 per pallet depending on size, weight, and urgency. Sea freight ranges from £500–£1,200 per container. Air freight is £2–£5/kg for express shipments. Contact us for an all-inclusive quote.' },
  { q: 'Do you offer express air freight from Germany to UK?', a: 'Yes, we offer both same-day and next-day air freight services from all major German airports including Frankfurt, Munich, Dusseldorf, and Hamburg to Heathrow, Manchester, and East Midlands airports in the UK.' },
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

export default function GermanyToUk() {
  return (
    <>
      <Seo
        title="Germany to UK Freight | Road, Sea & Air Shipping | Carrgo"
        description="Germany to UK freight forwarding with daily road departures. FTL & LTL road freight 2-4 days, sea 5-8 days, air 1-2 days. Full post-Brexit customs clearance."
        keywords="germany to uk freight, german road freight uk, shipping from germany to uk, european haulage germany, freight forwarder germany uk"
        ogUrl="https://carrgo.co.uk/routes/germany-to-uk"
        canonical="https://carrgo.co.uk/routes/germany-to-uk"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Germany to UK Freight Shipping",
          "provider": { "@type": "Organization", "name": "Carrgo Freight Solutions Ltd" },
          "areaServed": [{"@type": "Country", "name": "Germany"}, {"@type": "Country", "name": "United Kingdom"}],
          "description": "Road, sea and air freight forwarding from Germany to the UK with post-Brexit customs clearance."
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
                  Germany to UK Freight — Road, Sea & Air Shipping
                </h1>
                <p className="text-lg text-brand-100 mb-8 leading-relaxed">
                  Road freight from Germany to the UK takes 2–4 days with daily departures. Sea and air options also available for larger or urgent shipments. Full post-Brexit customs clearance included.
                </p>
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center border border-white/20">
                    <Truck className="w-6 h-6 mx-auto mb-1 text-brand-200" aria-hidden="true" />
                    <div className="text-2xl font-extrabold">2-4</div>
                    <div className="text-xs text-brand-200">Days Road</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center border border-white/20">
                    <Ship className="w-6 h-6 mx-auto mb-1 text-brand-200" aria-hidden="true" />
                    <div className="text-2xl font-extrabold">5-8</div>
                    <div className="text-xs text-brand-200">Days Sea</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center border border-white/20">
                    <Plane className="w-6 h-6 mx-auto mb-1 text-brand-200" aria-hidden="true" />
                    <div className="text-2xl font-extrabold">1-2</div>
                    <div className="text-xs text-brand-200">Days Air</div>
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
                    <span role="img" aria-label="Germany">🇩🇪</span>
                    <ArrowRight className="w-8 h-8 text-brand-200" aria-hidden="true" />
                    <span role="img" aria-label="United Kingdom">🇬🇧</span>
                  </div>
                  <p className="text-brand-200 text-sm">Germany to United Kingdom</p>
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <div className="text-3xl font-extrabold">2–4 Days</div>
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
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">The Germany–UK Trade Lane</h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Germany is one of the UK&apos;s largest trading partners, with over £40 billion in annual trade. The close geographic proximity and excellent transport infrastructure make Germany to UK shipping fast and efficient. Carrgo offers daily road freight departures, regular sea sailings, and express air cargo services.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-extrabold text-[#1A6DFF] mb-1">£40B+</div>
                <p className="text-gray-600">Annual UK-Germany trade</p>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-[#1A6DFF] mb-1">2-4 Days</div>
                <p className="text-gray-600">Road freight transit time</p>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-[#1A6DFF] mb-1">Daily</div>
                <p className="text-gray-600">Road departures available</p>
              </div>
            </div>
          </div>
        </section>

        {/* ====== TRANSIT TIMES TABLE ====== */}
        <section aria-labelledby="transit-heading" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="transit-heading" className="text-3xl font-bold text-center text-gray-900 mb-4">Transit Times from Germany to UK</h2>
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
                    ['Road Freight (FTL)', '2–4 days', 'Daily departures', 'Fast delivery, palletised goods'],
                    ['Road Freight (LTL)', '3–5 days', 'Daily departures', 'Smaller loads sharing trailer space'],
                    ['Sea Freight (FCL)', '5–8 days', 'Weekly sailings', 'Large volumes, cost efficiency'],
                    ['Sea Freight (LCL)', '7–10 days', 'Weekly consolidations', 'Smaller shipments'],
                    ['Air Freight', '1–2 days', 'Daily flights', 'Urgent cargo, express delivery'],
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
            <p className="text-center text-gray-600 mb-10">Major origin cities and UK destination facilities</p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span role="img" aria-label="Germany">🇩🇪</span> Germany Origin Locations
                </h3>
                <ul className="space-y-3">
                  {[
                    { name: 'Hamburg', desc: 'Major seaport and logistics hub — northern Germany gateway' },
                    { name: 'Dusseldorf', desc: 'Key western hub for road freight to the UK via Benelux' },
                    { name: 'Frankfurt', desc: 'Central logistics centre with major air cargo airport' },
                    { name: 'Munich', desc: 'Southern Germany manufacturing and distribution centre' },
                    { name: 'Berlin', desc: 'Capital region with growing logistics infrastructure' },
                    { name: 'Stuttgart', desc: 'Automotive industry heartland — Porsche, Mercedes, Bosch' },
                    { name: 'Cologne', desc: 'Rhine-Ruhr logistics hub with excellent road links' },
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
                    { name: 'Felixstowe', desc: 'UK&apos;s largest container port — primary sea freight entry point' },
                    { name: 'Southampton', desc: 'Deep-water port with excellent European connections' },
                    { name: 'London Gateway', desc: 'Modern port with direct continental road links' },
                    { name: 'Midlands Warehouses', desc: 'Central UK distribution — Birmingham, Coventry, Leicester' },
                    { name: 'Heathrow Airport', desc: 'Primary UK air cargo hub for express freight' },
                    { name: 'Manchester', desc: 'Northern distribution hub with strong German links' },
                    { name: 'Immingham', desc: 'Eastern port for North Sea and European cargo' },
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
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Shipping Options from Germany to UK</h2>
            <p className="text-center text-gray-600 mb-10">Three modes to match your delivery requirements</p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Truck, title: 'Road Freight', price: '£150–£400/pallet', time: '2–4 days', best: 'Daily departures, door-to-door', desc: 'The fastest and most flexible option for Germany–UK shipping. Daily departures from all major German cities with full truckload (FTL) and less-than-truckload (LTL) options. All hauliers are fully licensed for post-Brexit customs transit with T1 documentation.' },
                { icon: Ship, title: 'Sea Freight', price: '£500–£1,200/container', time: '5–8 days', best: 'Large volumes, economy shipping', desc: 'Sea freight from Hamburg and Bremerhaven to Felixstowe and Immingham. Ideal for bulk cargo, oversized items, and non-urgent shipments. Weekly FCL and LCL sailings with reliable schedules.' },
                { icon: Plane, title: 'Air Freight', price: '£2–£5/kg', time: '1–2 days', best: 'Urgent cargo, express delivery', desc: 'Express air freight from Frankfurt, Munich, Dusseldorf, and Hamburg airports to Heathrow and Manchester. Same-day and next-day options available for critical shipments. Ideal for high-value and time-sensitive goods.' },
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
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Popular Goods Shipped from Germany to UK</h2>
            <p className="text-center text-gray-600 mb-10">Commodities we regularly handle on this route</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'Automotive Parts', desc: 'OEM components, aftermarket parts, tyres, and accessories from German manufacturers.' },
                { name: 'Machinery & Equipment', desc: 'Industrial machinery, precision tools, engineering equipment, and CNC machines.' },
                { name: 'Chemicals & Pharma', desc: 'Pharmaceutical products, speciality chemicals, and laboratory supplies.' },
                { name: 'Electronics', desc: 'Consumer electronics, semiconductors, sensors, and industrial control systems.' },
                { name: 'Food & Beverage', desc: 'German wines, beers, speciality foods, and premium food products.' },
                { name: 'Plastics & Materials', desc: 'Engineering plastics, raw materials, and manufactured plastic components.' },
                { name: 'Furniture & Fixtures', desc: 'Office furniture, kitchen units, bathroom fixtures, and home furnishings.' },
                { name: 'Renewable Energy', desc: 'Solar panels, wind turbine components, and battery technology.' },
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
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Post-Brexit Customs Clearance</h2>
            <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
              Since Brexit, all goods moving from Germany to the UK require customs declarations. Our experienced brokers handle the entire process.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-[#1A6DFF]" aria-hidden="true" /> Required Documents
                </h3>
                <ul className="space-y-2">
                  {[
                    'Commercial Invoice with full goods description and value',
                    'Packing List with weights, dimensions, and HS commodity codes',
                    'UK EORI Number (mandatory for all UK importers)',
                    'Proof of origin for TCA tariff preference (if applicable)',
                    'T1 Transit Document (for road freight via EU)',
                    'Import declaration (submitted by Carrgo customs team)',
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
                  <Shield className="w-5 h-5 text-[#1A6DFF]" aria-hidden="true" /> UK-EU Trade & Customs
                </h3>
                <ul className="space-y-3 text-gray-600 text-sm">
                  <li className="flex justify-between pb-2 border-b border-gray-100">
                    <span>Import Duty</span>
                    <span className="font-medium">0% if UK-EU TCA origin rules met</span>
                  </li>
                  <li className="flex justify-between pb-2 border-b border-gray-100">
                    <span>VAT</span>
                    <span className="font-medium">20% (UK standard rate)</span>
                  </li>
                  <li className="flex justify-between pb-2 border-b border-gray-100">
                    <span>Customs Declaration</span>
                    <span className="font-medium">Included in Carrgo quote</span>
                  </li>
                  <li className="flex justify-between pb-2 border-b border-gray-100">
                    <span>Rules of Origin</span>
                    <span className="font-medium">We help you check eligibility</span>
                  </li>
                  <li className="flex justify-between">
                    <span>EORI Number</span>
                    <span className="font-medium">We can assist with application</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ====== WHY CHOOSE CARRGO ====== */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Why Choose Carrgo for Germany–UK Shipping</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Truck, title: 'Daily Departures', desc: 'Daily road freight departures from Hamburg, Frankfurt, Munich and all major German cities to the UK.' },
                { icon: FileCheck, title: 'Brexit Expertise', desc: 'Our team navigates post-Brexit customs requirements ensuring smooth clearance every time.' },
                { icon: Clock, title: '2-Hour Quotes', desc: 'Receive your all-inclusive Germany–UK freight quote within 2 hours during UK business hours.' },
                { icon: TrendingUp, title: 'Live Tracking', desc: 'Full visibility of your shipment from German collection to UK delivery with milestone updates.' },
                { icon: Users, title: 'Dedicated Manager', desc: 'Your personal account manager understands your route and keeps your supply chain moving.' },
                { icon: Shield, title: 'All-Inclusive Pricing', desc: 'Freight, fuel, customs clearance, and documentation — one price with no hidden extras.' },
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
            <h2 className="text-3xl font-bold mb-4">Get Your Germany–UK Freight Quote</h2>
            <p className="text-brand-100 mb-8 text-lg">Road freight from £150 per pallet. Daily departures with full customs clearance. Quote in 2 hours.</p>
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

        {/* ====== ONWARD TO IRELAND & NORTHERN IRELAND ====== */}
        <section className="py-16 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Germany to Ireland & Northern Ireland</h2>
            <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
              Our European road freight network extends beyond the UK to offer seamless Germany to Ireland shipping and Germany to Northern Ireland freight services via the UK land bridge or direct ferry connections.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Truck, title: 'Germany to Ireland Road Freight', time: '3–5 days', desc: 'FTL and LTL road freight from Hamburg, Frankfurt, Munich and all German cities to Dublin and Cork via the UK. T1 transit documents for ROI entry, with Irish customs clearance handled at Dublin Port.' },
                { icon: Truck, title: 'Germany to Northern Ireland', time: '3–5 days', desc: 'Road freight from Germany to Belfast and all Northern Ireland destinations via Heysham or Liverpool ferries. Full Northern Ireland Protocol compliance with T2 transit documents where required.' },
                { icon: Ship, title: 'Direct Europe to Ireland Sea Freight', time: '5–8 days', desc: 'Alternative sea freight from Hamburg or Bremerhaven to Dublin Port via Rotterdam or direct feeder services. Ideal for larger shipments not requiring road transit via the UK.' },
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
                { name: 'Netherlands', flag: '🇳🇱', route: '/routes/netherlands-to-uk' },
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
