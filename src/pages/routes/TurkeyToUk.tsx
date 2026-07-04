import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import {
  Ship, Plane, Truck, Clock, MapPin, ArrowRight,
  CheckCircle, ChevronDown, FileCheck, Shield, TrendingUp,
  Users, Globe, Anchor, Package
} from 'lucide-react';

const faqData = [
  { q: 'How long does shipping from Turkey to the UK take?', a: 'Sea freight from Turkey to the UK takes 14–20 days port-to-port, typically sailing from Istanbul (Ambarli), Mersin, or Izmir to Felixstowe or Immingham. Road freight takes 5–7 days door-to-door via the European road network. Air freight from Istanbul to the UK takes 2–3 days.' },
  { q: 'Does the UK-Turkey Free Trade Agreement reduce import duties?', a: 'Yes. The UK-Turkey Free Trade Agreement (FTA) allows for reduced or zero tariffs on many goods originating in Turkey. To qualify, goods must meet the rules of origin requirements and be accompanied by the appropriate origin documentation. Our customs team can advise on eligibility.' },
  { q: 'What is an ATR movement certificate and do I need one?', a: 'An ATR movement certificate is required for road freight from Turkey to the EU/UK to claim preferential tariff treatment under the Pan-Euro-Mediterranean convention. Our team arranges ATR documentation for all road shipments from Turkey to ensure your goods benefit from reduced duty rates.' },
  { q: 'How much does shipping from Turkey to UK cost?', a: 'Road freight from Turkey to the UK typically costs £200–£500 per pallet. Sea freight ranges from £800–£2,200 per container. Air freight is £2.50–£5 per kilogram. Contact us for an all-inclusive quote tailored to your shipment.' },
  { q: 'What are the main Turkish ports for UK-bound cargo?', a: 'Ambarli (Istanbul) is the primary container port for UK-bound cargo. Mersin on the Mediterranean coast is the second-largest port and offers excellent connections. Izmir on the Aegean coast and Gemlik near Bursa are also important hubs for UK trade.' },
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

export default function TurkeyToUk() {
  return (
    <>
      <Seo
        title="Turkey to UK Freight | Sea, Road & Air Shipping"
        description="Ship goods from Turkey to the UK with Carrgo. Sea freight 14-20 days, road 5-7 days, air 2-3 days. UK-Turkey FTA benefits. Full customs clearance."
      />

      <main id="main-content">
        {/* ====== HERO ====== */}
        <section aria-labelledby="hero-heading" className="bg-gradient-to-br from-brand-900 to-brand-800 text-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block text-xs font-semibold tracking-wider uppercase text-brand-200 mb-3">SHIPPING ROUTE</span>
                <h1 id="hero-heading" className="text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
                  Turkey to UK Freight — Sea, Road & Air Shipping
                </h1>
                <p className="text-lg text-brand-100 mb-8 leading-relaxed">
                  Ship goods from Turkey to the UK with Carrgo. Sea freight takes 14–20 days, road freight 5–7 days, air freight 2–3 days. Growing trade route with strong manufacturing links.
                </p>
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center border border-white/20">
                    <Ship className="w-6 h-6 mx-auto mb-1 text-brand-200" aria-hidden="true" />
                    <div className="text-2xl font-extrabold">14-20</div>
                    <div className="text-xs text-brand-200">Days Sea</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center border border-white/20">
                    <Truck className="w-6 h-6 mx-auto mb-1 text-brand-200" aria-hidden="true" />
                    <div className="text-2xl font-extrabold">5-7</div>
                    <div className="text-xs text-brand-200">Days Road</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center border border-white/20">
                    <Plane className="w-6 h-6 mx-auto mb-1 text-brand-200" aria-hidden="true" />
                    <div className="text-2xl font-extrabold">2-3</div>
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
                    <span role="img" aria-label="Turkey">🇹🇷</span>
                    <ArrowRight className="w-8 h-8 text-brand-200" aria-hidden="true" />
                    <span role="img" aria-label="United Kingdom">🇬🇧</span>
                  </div>
                  <p className="text-brand-200 text-sm">Turkey to United Kingdom</p>
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <div className="text-3xl font-extrabold">5–7 Days</div>
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
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">The Turkey–UK Trade Lane</h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Turkey is an increasingly important trade partner for the UK, with bilateral trade valued at over £18 billion annually. Turkish manufacturing spans textiles, automotive parts, steel, machinery, and food products. The UK-Turkey Free Trade Agreement provides tariff advantages on qualifying goods. Carrgo leverages all three transport modes to keep your Turkey–UK supply chain moving efficiently.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-extrabold text-[#1A6DFF] mb-1">£18B+</div>
                <p className="text-gray-600">Annual UK-Turkey trade</p>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-[#1A6DFF] mb-1">UK-Turkey</div>
                <p className="text-gray-600">Free Trade Agreement active</p>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-[#1A6DFF] mb-1">3</div>
                <p className="text-gray-600">Transport modes available</p>
              </div>
            </div>
          </div>
        </section>

        {/* ====== TRANSIT TIMES TABLE ====== */}
        <section aria-labelledby="transit-heading" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="transit-heading" className="text-3xl font-bold text-center text-gray-900 mb-4">Transit Times from Turkey to UK</h2>
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
                    ['Sea Freight (FCL)', '14–20 days', 'Weekly sailings', 'Large volumes, cost efficiency'],
                    ['Sea Freight (LCL)', '18–24 days', 'Weekly consolidations', 'Smaller shipments'],
                    ['Road Freight', '5–7 days', 'Regular departures', 'Palletised goods, speed needed'],
                    ['Air Freight', '2–3 days', 'Daily flights', 'Urgent cargo, samples'],
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
            <p className="text-center text-gray-600 mb-10">Major Turkish origin points and UK destinations</p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span role="img" aria-label="Turkey">🇹🇷</span> Turkey Origin Ports & Cities
                </h3>
                <ul className="space-y-3">
                  {[
                    { name: 'Ambarli (Istanbul)', desc: 'Turkey&apos;s largest container port — primary UK gateway' },
                    { name: 'Mersin', desc: 'Major Mediterranean port with excellent UK connections' },
                    { name: 'Izmir (Aliaga)', desc: 'Aegean coast port — strong European trade links' },
                    { name: 'Gemlik', desc: 'Bursa industrial zone port — automotive and textile exports' },
                    { name: 'Istanbul Airport', desc: 'World&apos;s largest airport — extensive cargo facilities' },
                    { name: 'Ankara', desc: 'Central Turkey — growing manufacturing and export hub' },
                    { name: 'Bursa', desc: 'Automotive capital of Turkey — major export centre' },
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
                  <span role="img" aria-label="United Kingdom">🇬🇧</span> UK Destination Ports & Airports
                </h3>
                <ul className="space-y-3">
                  {[
                    { name: 'Felixstowe', desc: 'UK&apos;s largest container port — direct Turkey services' },
                    { name: 'Immingham', desc: 'Eastern port — regular Mediterranean and Turkey sailings' },
                    { name: 'Southampton', desc: 'South coast port with Turkey shipping connections' },
                    { name: 'Tilbury', desc: 'London port handling growing Turkey trade volumes' },
                    { name: 'Heathrow Airport', desc: 'Primary air cargo gateway from Istanbul' },
                    { name: 'Manchester Airport', desc: 'Northern air hub for Turkish cargo' },
                    { name: 'Midlands Warehouses', desc: 'Central UK distribution — Birmingham, Leicester' },
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
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Shipping Options from Turkey to UK</h2>
            <p className="text-center text-gray-600 mb-10">Three transport modes with FTA benefits</p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Ship, title: 'Sea Freight', price: '£800–£2,200/container', time: '14–20 days', best: 'FCL & LCL, weekly sailings', desc: 'Sea freight from Turkey to the UK is a cost-effective option with weekly sailings from Ambarli (Istanbul), Mersin, and Izmir. FCL containers suit larger shipments over 15 CBM. LCL consolidations are available for smaller loads. The route typically transits through Mediterranean hubs to Felixstowe or Immingham.' },
                { icon: Truck, title: 'Road Freight', price: '£200–£500/pallet', time: '5–7 days', best: 'Fast overland delivery', desc: 'Road freight from Turkey travels via Bulgaria, Romania, and Hungary through the European road network to the UK. ATR movement certificates are arranged for customs transit. Ideal for palletised goods, automotive parts, textiles, and food products that need faster delivery than sea freight.' },
                { icon: Plane, title: 'Air Freight', price: '£2.50–£5/kg', time: '2–3 days', best: 'Express from Istanbul Airport', desc: 'Air freight from Istanbul Airport — one of the world&apos;s busiest — delivers to Heathrow, Manchester, or East Midlands in 2–3 days. Multiple daily flights with Turkish Airlines and British Airways cargo services. Ideal for urgent shipments, samples, and high-value goods.' },
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
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Popular Goods Shipped from Turkey to UK</h2>
            <p className="text-center text-gray-600 mb-10">Commodities we regularly handle on this route</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'Textiles & Clothing', desc: 'Cotton garments, knitwear, home textiles, towels, and fashion items.' },
                { name: 'Automotive Parts', desc: 'OEM components, tyres, automotive textiles, and aftermarket parts.' },
                { name: 'Steel & Metals', desc: 'Flat steel, long steel products, aluminium, and metal manufactures.' },
                { name: 'Machinery', desc: 'Industrial machinery, white goods, and electrical equipment.' },
                { name: 'Food & Beverage', desc: 'Dried fruits, nuts, olive oil, Turkish delight, and specialty foods.' },
                { name: 'Ceramics & Sanitaryware', desc: 'Tiles, bathroom fixtures, ceramic tableware, and building materials.' },
                { name: 'Furniture', desc: 'Upholstered furniture, wooden furniture, and home furnishings.' },
                { name: 'Chemicals & Plastics', desc: 'Plastic products, chemical preparations, and cleaning products.' },
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
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Customs Clearance & FTA Documentation</h2>
            <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
              The UK-Turkey Free Trade Agreement can significantly reduce your import costs. Our team ensures all documentation is correct to maximise your FTA benefits.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-[#1A6DFF]" aria-hidden="true" /> Required Documents
                </h3>
                <ul className="space-y-2">
                  {[
                    'Commercial Invoice (detailed goods description and value)',
                    'Packing List (weights, dimensions, package count)',
                    'Bill of Lading (sea) or Airway Bill (air) or CMR (road)',
                    'EUR.1 Movement Certificate or origin invoice declaration',
                    'ATR Movement Certificate (for road freight via EU)',
                    'UK EORI Number (mandatory for all UK importers)',
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
                  <Shield className="w-5 h-5 text-[#1A6DFF]" aria-hidden="true" /> UK-Turkey FTA Benefits
                </h3>
                <ul className="space-y-3 text-gray-600 text-sm">
                  <li className="flex justify-between pb-2 border-b border-gray-100">
                    <span>Import Duty</span>
                    <span className="font-medium">Reduced or 0% with valid origin proof</span>
                  </li>
                  <li className="flex justify-between pb-2 border-b border-gray-100">
                    <span>VAT</span>
                    <span className="font-medium">20% (UK standard rate)</span>
                  </li>
                  <li className="flex justify-between pb-2 border-b border-gray-100">
                    <span>Rules of Origin</span>
                    <span className="font-medium">We verify and advise on compliance</span>
                  </li>
                  <li className="flex justify-between pb-2 border-b border-gray-100">
                    <span>Customs Clearance</span>
                    <span className="font-medium">Included in Carrgo service</span>
                  </li>
                  <li className="flex justify-between">
                    <span>ATR Certificate</span>
                    <span className="font-medium">Arranged for all road shipments</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ====== WHY CHOOSE CARRGO ====== */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Why Choose Carrgo for Turkey–UK Shipping</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Globe, title: 'Turkey Expertise', desc: 'Established carrier relationships across Turkish ports, airports, and road networks.' },
                { icon: FileCheck, title: 'FTA Specialists', desc: 'We maximise your UK-Turkey FTA benefits with correct origin documentation.' },
                { icon: Clock, title: '2-Hour Quotes', desc: 'Receive your all-inclusive Turkey–UK freight quote within 2 hours.' },
                { icon: TrendingUp, title: 'Live Tracking', desc: 'Full shipment visibility from Turkish collection to UK delivery.' },
                { icon: Users, title: 'Bilingual Support', desc: 'Our team can communicate effectively with Turkish suppliers and agents.' },
                { icon: Shield, title: 'All-Inclusive Pricing', desc: 'Freight, FTA documentation, UK customs clearance, and delivery in one price.' },
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
            <h2 className="text-3xl font-bold mb-4">Get Your Turkey–UK Freight Quote</h2>
            <p className="text-brand-100 mb-8 text-lg">Sea, road, or air — with full UK-Turkey FTA support. All-inclusive quote within 2 hours.</p>
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

        {/* ====== OTHER ROUTES ====== */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Other Popular Shipping Routes</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'China', flag: '🇨🇳', route: '/routes/china-to-uk' },
                { name: 'Germany', flag: '🇩🇪', route: '/routes/germany-to-uk' },
                { name: 'Netherlands', flag: '🇳🇱', route: '/routes/netherlands-to-uk' },
                { name: 'India', flag: '🇮🇳', route: '/routes/india-to-uk' },
                { name: 'USA', flag: '🇺🇸', route: '/routes/usa-to-uk' },
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
