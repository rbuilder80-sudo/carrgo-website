import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import {
  Ship, Plane, Clock, MapPin, ArrowRight,
  CheckCircle, ChevronDown, FileCheck, Shield, TrendingUp,
  Users, Globe, Anchor, Package
} from 'lucide-react';

const faqData = [
  { q: 'How long does sea freight from UAE to UK take?', a: 'Sea freight from the UAE to the UK typically takes 18–24 days port-to-port. Jebel Ali (Dubai) to Felixstowe averages 18–21 days, while Khalifa Port (Abu Dhabi) to Southampton takes approximately 20–24 days depending on the shipping line and route.' },
  { q: 'What is Jebel Ali Port and why is it important for UAE-UK trade?', a: 'Jebel Ali Port in Dubai is the largest container port in the Middle East and one of the world&apos;s busiest. It serves as the primary gateway for cargo leaving the UAE for the UK, with weekly direct and transshipment services to Felixstowe and Southampton. Its free zone status also offers advantages for cargo consolidation.' },
  { q: 'How much does air freight from Dubai to UK cost?', a: 'Air freight from Dubai to the UK typically ranges from £3 to £6 per kilogram depending on cargo weight, dimensions, and service level. Express services from Dubai International Airport to Heathrow take 2–3 days. Economy options are available for less time-sensitive shipments.' },
  { q: 'Do I need any special documentation for UAE to UK shipping?', a: 'Standard documents include a commercial invoice, packing list, bill of lading or airway bill, and a UK EORI number. For certain goods, a GCC Certificate of Origin may be required. Our customs team ensures all documentation is in order before shipment departs.' },
  { q: 'Can Carrgo collect goods from anywhere in the UAE?', a: 'Yes, we offer collection services from all Emirates including Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, and Umm Al Quwain. Whether your goods are in a free zone, warehouse, or factory, we can arrange pickup and transport to Jebel Ali or the airport.' },
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

export default function UaeToUk() {
  return (
    <>
      <Seo
        title="UAE to UK Shipping | Sea & Air Freight from Dubai"
        description="Ship goods from UAE (Dubai, Abu Dhabi) to the UK with Carrgo. Sea freight 18-24 days, air freight 2-3 days. Full customs clearance to Felixstowe and Southampton."
      />

      <main id="main-content">
        {/* ====== HERO ====== */}
        <section aria-labelledby="hero-heading" className="bg-gradient-to-br from-brand-900 to-brand-800 text-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block text-xs font-semibold tracking-wider uppercase text-brand-200 mb-3">SHIPPING ROUTE</span>
                <h1 id="hero-heading" className="text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
                  UAE to UK Freight — Sea & Air Shipping
                </h1>
                <p className="text-lg text-brand-100 mb-8 leading-relaxed">
                  Ship goods from the UAE (Dubai, Abu Dhabi) to the UK with Carrgo. Sea freight 18–24 days, air freight 2–3 days. Key route for electronics, textiles, and consumer goods.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8 max-w-sm">
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center border border-white/20">
                    <Ship className="w-6 h-6 mx-auto mb-1 text-brand-200" aria-hidden="true" />
                    <div className="text-2xl font-extrabold">18-24</div>
                    <div className="text-xs text-brand-200">Days Sea</div>
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
                    <span role="img" aria-label="UAE">🇦🇪</span>
                    <ArrowRight className="w-8 h-8 text-brand-200" aria-hidden="true" />
                    <span role="img" aria-label="United Kingdom">🇬🇧</span>
                  </div>
                  <p className="text-brand-200 text-sm">UAE to United Kingdom</p>
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <div className="text-3xl font-extrabold">18–24 Days</div>
                    <p className="text-brand-200 text-xs">Sea freight from Jebel Ali</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====== ROUTE OVERVIEW ====== */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">The UAE–UK Trade Lane</h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              The UAE is the UK&apos;s largest trading partner in the Gulf region, with bilateral trade exceeding £18 billion annually. Dubai and Abu Dhabi serve as major logistics hubs for the entire Middle East, with goods often consolidated in Jebel Ali before shipping to the UK. Carrgo provides reliable sea and air freight services from all Emirates to UK ports and airports.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-extrabold text-[#1A6DFF] mb-1">£18B+</div>
                <p className="text-gray-600">Annual UK-UAE trade</p>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-[#1A6DFF] mb-1">Jebel Ali</div>
                <p className="text-gray-600">Middle East&apos;s largest port</p>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-[#1A6DFF] mb-1">2</div>
                <p className="text-gray-600">Transport modes available</p>
              </div>
            </div>
          </div>
        </section>

        {/* ====== TRANSIT TIMES TABLE ====== */}
        <section aria-labelledby="transit-heading" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="transit-heading" className="text-3xl font-bold text-center text-gray-900 mb-4">Transit Times from UAE to UK</h2>
            <p className="text-center text-gray-600 mb-8">Estimated transit times by transport mode and origin</p>
            <div className="overflow-x-auto">
              <table className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-sm border">
                <thead>
                  <tr className="bg-gray-100">
                    <th scope="col" className="text-left px-6 py-4 font-semibold text-gray-700">Transport Mode</th>
                    <th scope="col" className="text-center px-6 py-4 font-semibold text-gray-700">Port-to-Port</th>
                    <th scope="col" className="text-center px-6 py-4 font-semibold text-gray-700">Door-to-Door</th>
                    <th scope="col" className="text-center px-6 py-4 font-semibold text-gray-700">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Sea Freight — Jebel Ali', '18–21 days', '25–30 days', 'Dubai-origin container cargo'],
                    ['Sea Freight — Khalifa Port', '20–24 days', '27–32 days', 'Abu Dhabi-origin shipments'],
                    ['Sea Freight (LCL)', '22–28 days', '28–35 days', 'Smaller consolidated shipments'],
                    ['Air Freight — Express', '2–3 days', '4–6 days', 'Urgent cargo, high-value goods'],
                    ['Air Freight — Economy', '3–5 days', '5–8 days', 'Standard air cargo'],
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
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Key Ports & Airports</h2>
            <p className="text-center text-gray-600 mb-10">Major UAE origin facilities and UK destinations</p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span role="img" aria-label="UAE">🇦🇪</span> UAE Origin Ports & Airports
                </h3>
                <ul className="space-y-3">
                  {[
                    { name: 'Jebel Ali (Dubai)', desc: 'Middle East&apos;s largest container port — primary UK gateway' },
                    { name: 'Khalifa Port (Abu Dhabi)', desc: 'Modern deep-water port — rapidly growing UK connections' },
                    { name: 'Sharjah Hamriyah', desc: 'Free zone port serving northern Emirates trade' },
                    { name: 'Dubai International Airport (DXB)', desc: 'Major global air cargo hub — daily UK flights' },
                    { name: 'Abu Dhabi International (AUH)', desc: 'Growing cargo operations — UK connections expanding' },
                    { name: 'Al Maktoum (DWC)', desc: 'Dubai&apos;s dedicated cargo airport — long-term growth hub' },
                    { name: 'Sharjah International (SHJ)', desc: 'Budget air freight hub with regional connections' },
                    { name: 'Jebel Ali Free Zone (JAFZA)', desc: 'World-class free zone — cargo consolidation and warehousing' },
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
                    { name: 'Southampton', desc: 'Primary UK port for UAE-origin sea freight' },
                    { name: 'Felixstowe', desc: 'UK&apos;s largest container port — direct UAE services' },
                    { name: 'London Gateway', desc: 'Modern port with growing Middle East connections' },
                    { name: 'Heathrow Airport', desc: 'Primary air cargo gateway for UAE freight' },
                    { name: 'East Midlands Airport', desc: 'Central UK air hub — fast onward distribution' },
                    { name: 'Manchester Airport', desc: 'Northern air gateway for Dubai cargo' },
                    { name: 'Tilbury', desc: 'Alternative London port for UAE container services' },
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
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Shipping Options from UAE to UK</h2>
            <p className="text-center text-gray-600 mb-10">Sea and air freight to match your cargo requirements</p>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                { icon: Ship, title: 'Sea Freight', price: '£1,000–£2,500/container', time: '18–24 days', best: 'FCL & LCL from Jebel Ali and Khalifa', desc: 'Sea freight from the UAE to the UK is the most economical option for large shipments. Weekly services from Jebel Ali (Dubai) and Khalifa Port (Abu Dhabi) to Southampton and Felixstowe. FCL suits volumes over 15 CBM. LCL consolidations are available for smaller loads with regular departures.' },
                { icon: Plane, title: 'Air Freight', price: '£3–£6/kg', time: '2–3 days', best: 'Express and economy from all UAE airports', desc: 'Air freight from the UAE delivers to the UK in just 2–3 days. Services available from Dubai International (DXB), Abu Dhabi (AUH), and Sharjah (SHJ) to Heathrow, Manchester, and East Midlands. Daily flights with Emirates SkyCargo and Etihad Cargo. Ideal for electronics, fashion, and time-sensitive goods.' },
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
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Popular Goods Shipped from UAE to UK</h2>
            <p className="text-center text-gray-600 mb-10">Commodities we regularly handle on this route</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'Electronics', desc: 'Consumer electronics, mobile phones, computers, and tech accessories.' },
                { name: 'Textiles & Fashion', desc: 'Garments, fabrics, luxury fashion items, and footwear.' },
                { name: 'Petroleum Products', desc: 'Refined fuels, lubricants, and petrochemical derivatives.' },
                { name: 'Aluminium & Metals', desc: 'Aluminium products, steel items, and metal manufactures.' },
                { name: 'Plastics & Chemicals', desc: 'Plastic products, chemicals, and cleaning preparations.' },
                { name: 'Jewellery & Gold', desc: 'Gold jewellery, precious metals, watches, and luxury accessories.' },
                { name: 'Food Products', desc: 'Dates, spices, halal foods, and Middle Eastern speciality items.' },
                { name: 'Building Materials', desc: 'Tiles, sanitaryware, aluminium profiles, and construction items.' },
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
              Our HMRC-authorised customs brokers manage all UK import declarations for UAE-origin cargo, ensuring efficient clearance and compliance.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-[#1A6DFF]" aria-hidden="true" /> Required Documents
                </h3>
                <ul className="space-y-2">
                  {[
                    'Commercial Invoice (with detailed goods description and value)',
                    'Packing List (weights, dimensions, carton count)',
                    'Bill of Lading (sea) or Airway Bill (air freight)',
                    'GCC Certificate of Origin (where applicable for preferential rates)',
                    'Export Licence (for restricted goods or dual-use items)',
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
                  <Shield className="w-5 h-5 text-[#1A6DFF]" aria-hidden="true" /> UAE-UK Customs Information
                </h3>
                <ul className="space-y-3 text-gray-600 text-sm">
                  <li className="flex justify-between pb-2 border-b border-gray-100">
                    <span>Import Duty</span>
                    <span className="font-medium">UK Global Tariff applies (varies by HS code)</span>
                  </li>
                  <li className="flex justify-between pb-2 border-b border-gray-100">
                    <span>VAT</span>
                    <span className="font-medium">20% (UK standard rate)</span>
                  </li>
                  <li className="flex justify-between pb-2 border-b border-gray-100">
                    <span>Customs Clearance</span>
                    <span className="font-medium">Included in Carrgo service</span>
                  </li>
                  <li className="flex justify-between pb-2 border-b border-gray-100">
                    <span>Port/Airport Handling</span>
                    <span className="font-medium">Included in Carrgo quote</span>
                  </li>
                  <li className="flex justify-between">
                    <span>GCC Origin</span>
                    <span className="font-medium">May offer duty advantages — we advise</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ====== WHY CHOOSE CARRGO ====== */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Why Choose Carrgo for UAE–UK Shipping</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Globe, title: 'UAE Network', desc: 'Strong partnerships with UAE freight agents across all Emirates and free zones.' },
                { icon: FileCheck, title: 'Customs Experts', desc: 'HMRC-authorised brokers experienced in UAE-origin commodity classifications.' },
                { icon: Clock, title: '2-Hour Quotes', desc: 'Receive your all-inclusive UAE–UK freight quote within 2 hours.' },
                { icon: TrendingUp, title: 'Live Tracking', desc: 'Full visibility from UAE collection or port to UK delivery.' },
                { icon: Users, title: 'Dedicated Manager', desc: 'Your personal account manager understands Middle East logistics and your needs.' },
                { icon: Shield, title: 'All-Inclusive Pricing', desc: 'UAE collection, freight, UK customs clearance, and delivery — one transparent price.' },
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
            <h2 className="text-3xl font-bold mb-4">Get Your UAE–UK Freight Quote</h2>
            <p className="text-brand-100 mb-8 text-lg">Sea or air from Dubai, Abu Dhabi, or any Emirates. All-inclusive quote within 2 hours.</p>
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
