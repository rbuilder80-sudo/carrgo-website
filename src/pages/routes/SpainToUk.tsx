import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import {
  Ship, Plane, Truck, Clock, MapPin, ArrowRight,
  CheckCircle, ChevronDown, FileCheck, Shield, TrendingUp,
  Users, Globe, Anchor, Package
} from 'lucide-react';

const faqData = [
  { q: 'How long does road freight from Spain to the UK take?', a: 'Road freight from Spain to the UK typically takes 4–6 days door-to-door via the European road network. The route passes through France with the Channel crossing at Calais-Dover or Dunkirk-Dover. Regular departures are available from Barcelona, Valencia, Madrid, and other Spanish cities.' },
  { q: 'What are the main Spanish ports for shipping to the UK?', a: 'Barcelona and Valencia are the two primary container ports for Spain-UK trade. Barcelona serves the industrial northeast including Catalonia, while Valencia is the Mediterranean&apos;s largest port. Other important ports include Bilbao (north), Algeciras (south), and Vigo (northwest).' },
  { q: 'How do post-Brexit rules affect Spain to UK shipping?', a: 'Since Brexit, goods moving from Spain to the UK require customs declarations, a UK EORI number, and commodity codes. However, the UK-EU Trade and Cooperation Agreement (TCA) allows for zero tariffs on goods meeting rules of origin requirements. Our customs team handles all post-Brexit documentation.' },
  { q: 'How much does shipping from Spain to UK cost?', a: 'Road freight from Spain to the UK typically costs £180–£450 per pallet. Sea freight from Barcelona or Valencia ranges from £600–£1,500 per container. Air freight is £2–£5 per kilogram. Contact us for an all-inclusive quote with no hidden fees.' },
  { q: 'Can you handle temperature-controlled shipments from Spain?', a: 'Yes, we offer refrigerated (reefer) road freight and sea freight services from Spain to the UK. This is particularly popular for Spanish food and beverage exports including fresh produce, wines, cheeses, and seafood that require temperature-controlled transport.' },
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

export default function SpainToUk() {
  return (
    <>
      <Seo
        title="Spain to UK Freight | Road, Sea & Air Shipping"
        description="Ship goods from Spain to the UK with Carrgo. Road freight 4-6 days, sea 4-9 days, air 1-2 days. Popular for food & beverage, automotive parts, and textiles."
      />

      <main id="main-content">
        {/* ====== HERO ====== */}
        <section aria-labelledby="hero-heading" className="bg-gradient-to-br from-brand-900 to-brand-800 text-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block text-xs font-semibold tracking-wider uppercase text-brand-200 mb-3">SHIPPING ROUTE</span>
                <h1 id="hero-heading" className="text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
                  Spain to UK Freight — Road, Sea & Air Shipping
                </h1>
                <p className="text-lg text-brand-100 mb-8 leading-relaxed">
                  Ship goods from Spain to the UK with Carrgo. Road freight 4–6 days, sea freight 4–9 days, air freight 1–2 days. Popular for food &amp; beverage, automotive parts, and textiles.
                </p>
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center border border-white/20">
                    <Truck className="w-6 h-6 mx-auto mb-1 text-brand-200" aria-hidden="true" />
                    <div className="text-2xl font-extrabold">4-6</div>
                    <div className="text-xs text-brand-200">Days Road</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center border border-white/20">
                    <Ship className="w-6 h-6 mx-auto mb-1 text-brand-200" aria-hidden="true" />
                    <div className="text-2xl font-extrabold">4-9</div>
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
                    <span role="img" aria-label="Spain">🇪🇸</span>
                    <ArrowRight className="w-8 h-8 text-brand-200" aria-hidden="true" />
                    <span role="img" aria-label="United Kingdom">🇬🇧</span>
                  </div>
                  <p className="text-brand-200 text-sm">Spain to United Kingdom</p>
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <div className="text-3xl font-extrabold">4–6 Days</div>
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
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">The Spain–UK Trade Lane</h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Spain is one of the UK&apos;s top European trading partners, with bilateral trade exceeding £55 billion annually. Spain&apos;s diverse manufacturing base produces everything from automotive parts and machinery to world-renowned food and beverage products. The well-established transport links between Spain and the UK ensure reliable, efficient shipping across all modes.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-extrabold text-[#1A6DFF] mb-1">£55B+</div>
                <p className="text-gray-600">Annual UK-Spain trade</p>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-[#1A6DFF] mb-1">4-6 Days</div>
                <p className="text-gray-600">Road freight transit time</p>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-[#1A6DFF] mb-1">6+</div>
                <p className="text-gray-600">Spanish ports with UK services</p>
              </div>
            </div>
          </div>
        </section>

        {/* ====== TRANSIT TIMES TABLE ====== */}
        <section aria-labelledby="transit-heading" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="transit-heading" className="text-3xl font-bold text-center text-gray-900 mb-4">Transit Times from Spain to UK</h2>
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
                    ['Road Freight (FTL)', '4–6 days', 'Regular departures', 'Palletised goods, perishables'],
                    ['Road Freight (LTL)', '5–7 days', 'Regular groupage', 'Smaller loads'],
                    ['Sea Freight (FCL)', '4–9 days', '3-4x per week', 'Large volumes, Barcelona/Valencia'],
                    ['Sea Freight (LCL)', '7–12 days', 'Weekly consolidations', 'Shared container shipments'],
                    ['Air Freight', '1–2 days', 'Daily flights', 'Urgent cargo, high-value goods'],
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
            <p className="text-center text-gray-600 mb-10">Major Spanish origin points and UK destinations</p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span role="img" aria-label="Spain">🇪🇸</span> Spain Origin Ports & Cities
                </h3>
                <ul className="space-y-3">
                  {[
                    { name: 'Barcelona', desc: 'Catalonia&apos;s main port — automotive and manufacturing hub' },
                    { name: 'Valencia', desc: 'Mediterranean&apos;s largest port — extensive UK connections' },
                    { name: 'Madrid', desc: 'Central logistics hub — air freight and road distribution' },
                    { name: 'Bilbao', desc: 'Northern port — Basque Country industrial exports' },
                    { name: 'Algeciras', desc: 'Strategic southern port — transshipment hub' },
                    { name: 'Vigo', desc: 'Northwestern port — seafood and automotive exports' },
                    { name: 'Zaragoza', desc: 'Inland logistics hub — PLAZA freight platform' },
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
                    { name: 'Southampton', desc: 'Primary UK port for Spain-originating sea freight' },
                    { name: 'Felixstowe', desc: 'UK&apos;s largest container port — Spanish services available' },
                    { name: 'London Gateway', desc: 'Modern port with Mediterranean connections' },
                    { name: 'Bristol', desc: 'Southwest port — convenient for western UK distribution' },
                    { name: 'Heathrow Airport', desc: 'Primary air cargo gateway from Madrid and Barcelona' },
                    { name: 'Manchester Airport', desc: 'Northern air hub for Spanish cargo' },
                    { name: 'Midlands', desc: 'Central UK distribution — Birmingham, Coventry' },
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
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Shipping Options from Spain to UK</h2>
            <p className="text-center text-gray-600 mb-10">Three modes with regular departures</p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Truck, title: 'Road Freight', price: '£180–£450/pallet', time: '4–6 days', best: 'Regular departures, door-to-door', desc: 'Road freight from Spain to the UK via France and the Channel Tunnel or ferry crossings. Regular FTL and LTL departures from Barcelona, Valencia, Madrid, and all major Spanish cities. Temperature-controlled trailers available for food and beverage shipments. Full post-Brexit customs transit documentation included.' },
                { icon: Ship, title: 'Sea Freight', price: '£600–£1,500/container', time: '4–9 days', best: 'Short sea crossings, frequent sailings', desc: 'Short sea shipping from Barcelona and Valencia to Southampton, Bristol, and London Gateway. With frequent sailings 3-4 times per week, this is a cost-effective option for larger shipments. FCL and LCL services available. Refrigerated containers for temperature-sensitive cargo.' },
                { icon: Plane, title: 'Air Freight', price: '£2–£5/kg', time: '1–2 days', best: 'Express from Madrid and Barcelona', desc: 'Air freight from Madrid-Barajas and Barcelona-El Prat airports to Heathrow, Manchester, and East Midlands. Daily flights with Iberia, British Airways, and low-cost carriers. Same-day and next-day options available for urgent shipments. Ideal for high-value goods and time-critical deliveries.' },
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
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Popular Goods Shipped from Spain to UK</h2>
            <p className="text-center text-gray-600 mb-10">Commodities we regularly handle on this route</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'Food & Beverage', desc: 'Spanish wines, olive oil, cheeses, hams, fresh produce, and seafood.' },
                { name: 'Automotive Parts', desc: 'Components for SEAT, Renault, Ford, and other Spanish-made vehicles.' },
                { name: 'Textiles & Fashion', desc: 'Zara and other Spanish fashion brands, fabrics, and footwear.' },
                { name: 'Machinery', desc: 'Industrial machinery, agricultural equipment, and engineering goods.' },
                { name: 'Ceramics & Tiles', desc: 'Floor and wall tiles, bathroom ceramics, and decorative pottery.' },
                { name: 'Fruits & Vegetables', desc: 'Citrus fruits, tomatoes, peppers, and seasonal fresh produce.' },
                { name: 'Chemicals & Pharma', desc: 'Pharmaceutical products, chemicals, and cleaning preparations.' },
                { name: 'Furniture', desc: 'Flat-pack furniture, outdoor furniture, and home furnishings.' },
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
              Our HMRC-authorised team manages all post-Brexit customs requirements for Spain to UK shipments, ensuring compliance and zero-tariff eligibility where applicable.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-[#1A6DFF]" aria-hidden="true" /> Required Documents
                </h3>
                <ul className="space-y-2">
                  {[
                    'Commercial Invoice (with goods description and value)',
                    'Packing List (weights, dimensions, package count)',
                    'Bill of Lading (sea), CMR (road), or Airway Bill (air)',
                    'Proof of origin for UK-EU TCA tariff preference',
                    'Health certificates (for food, plants, animal products)',
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
                    <span>SPS Checks</span>
                    <span className="font-medium">Required for food, plants, animals</span>
                  </li>
                  <li className="flex justify-between pb-2 border-b border-gray-100">
                    <span>Customs Clearance</span>
                    <span className="font-medium">Included in Carrgo service</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Transit Documentation</span>
                    <span className="font-medium">T1 for road, standard for sea/air</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ====== WHY CHOOSE CARRGO ====== */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Why Choose Carrgo for Spain–UK Shipping</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Truck, title: 'Regular Departures', desc: 'Road freight departures from Barcelona, Valencia, Madrid and all major Spanish cities.' },
                { icon: FileCheck, title: 'Brexit Specialists', desc: 'Our team navigates post-Brexit customs with expertise in UK-EU TCA origin requirements.' },
                { icon: Clock, title: '2-Hour Quotes', desc: 'Receive your all-inclusive Spain–UK freight quote within 2 hours.' },
                { icon: TrendingUp, title: 'Live Tracking', desc: 'Full shipment visibility from Spanish collection through France to UK delivery.' },
                { icon: Users, title: 'Spanish Network', desc: 'Established partnerships with Spanish hauliers and freight agents across all regions.' },
                { icon: Shield, title: 'All-Inclusive Pricing', desc: 'Spanish collection, transport, Channel crossing, UK customs, and delivery in one price.' },
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
            <h2 className="text-3xl font-bold mb-4">Get Your Spain–UK Freight Quote</h2>
            <p className="text-brand-100 mb-8 text-lg">Road, sea, or air — regular departures with full customs clearance. Quote in 2 hours.</p>
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
                { name: 'Turkey', flag: '🇹🇷', route: '/routes/turkey-to-uk' },
                { name: 'UAE', flag: '🇦🇪', route: '/routes/uae-to-uk' },
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
