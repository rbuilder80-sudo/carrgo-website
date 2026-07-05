import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import {
  Ship, Plane, Clock, MapPin, ArrowRight,
  CheckCircle, ChevronDown, FileCheck, Shield, TrendingUp,
  Users, Globe, Anchor, Package
} from 'lucide-react';

const faqData = [
  { q: 'How long does sea freight from India to UK take?', a: 'Sea freight from India to the UK typically takes 20–28 days port-to-port. Mumbai (Nhava Sheva) to Felixstowe averages 22–25 days, while Chennai to Southampton takes approximately 24–28 days depending on the shipping line and route taken via the Suez Canal.' },
  { q: 'What are the main India ports for UK-bound shipments?', a: 'Nhava Sheva (Mumbai) is India&apos;s largest container port and the primary departure point for UK cargo. Other major ports include Chennai, Mundra, Cochin, Kolkata (Haldia), Visakhapatnam, and Hazira. Your choice depends on your supplier&apos;s location and cargo type.' },
  { q: 'Is there a Free Trade Agreement between India and the UK?', a: 'A UK-India Free Trade Agreement (FTA) is under negotiation. Currently, standard UK import duties and tariffs apply. Our customs team stays updated on any developments and can advise on the most cost-effective shipping strategy for your goods.' },
  { q: 'How much does air freight from India to UK cost?', a: 'Air freight from India to the UK typically ranges from £3.50 to £7 per kilogram depending on cargo weight, dimensions, and urgency. Express services from Mumbai and Delhi to Heathrow are available with 3–5 day transit times.' },
  { q: 'What documents do I need for importing from India to the UK?', a: 'You will need a commercial invoice, packing list, bill of lading or airway bill, and a UK EORI number. Depending on your goods, certificates of origin, GSP Form A, import licences, or product conformity certificates may also be required.' },
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

export default function IndiaToUk() {
  return (
    <>
      <Seo
        title="Shipping from India to UK | Sea & Air Freight Forwarder | Carrgo"
        description="Ship goods from India to UK — sea freight 20-28 days via Nhava Sheva & Mundra, air freight 3-5 days. All-inclusive pricing with customs clearance to Felixstowe & Southampton."
        keywords="shipping from india to uk, india to uk freight, sea freight india to uk, nhava sheva to felixstowe, mundra to southampton, air cargo india uk"
        ogUrl="https://carrgo.co.uk/routes/india-to-uk"
        canonical="https://carrgo.co.uk/routes/india-to-uk"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "India to UK Freight Shipping",
          "provider": { "@type": "Organization", "name": "Carrgo Freight Solutions Ltd" },
          "areaServed": [{"@type": "Country", "name": "India"}, {"@type": "Country", "name": "United Kingdom"}],
          "description": "Sea and air freight forwarding from India to the UK with customs clearance."
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
                  India to UK Freight — Sea & Air Shipping
                </h1>
                <p className="text-lg text-brand-100 mb-8 leading-relaxed">
                  Ship goods from India to the UK with Carrgo. Sea freight takes 20–28 days, air freight 3–5 days. All-inclusive pricing with customs clearance to Felixstowe and Southampton.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8 max-w-sm">
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center border border-white/20">
                    <Ship className="w-6 h-6 mx-auto mb-1 text-brand-200" aria-hidden="true" />
                    <div className="text-2xl font-extrabold">20-28</div>
                    <div className="text-xs text-brand-200">Days Sea</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center border border-white/20">
                    <Plane className="w-6 h-6 mx-auto mb-1 text-brand-200" aria-hidden="true" />
                    <div className="text-2xl font-extrabold">3-5</div>
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
                    <span role="img" aria-label="India">🇮🇳</span>
                    <ArrowRight className="w-8 h-8 text-brand-200" aria-hidden="true" />
                    <span role="img" aria-label="United Kingdom">🇬🇧</span>
                  </div>
                  <p className="text-brand-200 text-sm">India to United Kingdom</p>
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <div className="text-3xl font-extrabold">20–28 Days</div>
                    <p className="text-brand-200 text-xs">Sea freight via Suez Canal</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====== ROUTE OVERVIEW ====== */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">The India–UK Trade Lane</h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              India is one of the UK&apos;s most important trading partners, with bilateral trade exceeding £30 billion annually. The route connects India&apos;s booming manufacturing sector — from textiles and pharmaceuticals to automotive parts and IT equipment — with UK markets. Carrgo provides reliable sea and air freight services from all major Indian ports and airports.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-extrabold text-[#1A6DFF] mb-1">£30B+</div>
                <p className="text-gray-600">Annual UK-India trade</p>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-[#1A6DFF] mb-1">7+</div>
                <p className="text-gray-600">Major Indian ports served</p>
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
            <h2 id="transit-heading" className="text-3xl font-bold text-center text-gray-900 mb-4">Transit Times from India to UK</h2>
            <p className="text-center text-gray-600 mb-8">Estimated port-to-port and door-to-door shipping durations</p>
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
                    ['Sea Freight (FCL)', '20–28 days', '28–38 days', 'Large volumes, textiles, machinery'],
                    ['Sea Freight (LCL)', '24–32 days', '32–42 days', 'Smaller shipments sharing container'],
                    ['Air Freight (Express)', '3–5 days', '5–8 days', 'Urgent cargo, pharma, samples'],
                    ['Air Freight (Economy)', '5–7 days', '7–10 days', 'Cost-sensitive air cargo'],
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
            <p className="text-center text-gray-600 mb-10">Major Indian origin facilities and UK destinations</p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span role="img" aria-label="India">🇮🇳</span> India Origin Ports & Airports
                </h3>
                <ul className="space-y-3">
                  {[
                    { name: 'Nhava Sheva (Mumbai/JNPT)', desc: 'India&apos;s largest container port — primary UK gateway' },
                    { name: 'Chennai', desc: 'Major east coast port — strong UK shipping line connections' },
                    { name: 'Mundra', desc: 'Privately operated Gujarat port — efficient modern facilities' },
                    { name: 'Cochin', desc: 'Southwest port serving Kerala and southern India' },
                    { name: 'Kolkata (Haldia)', desc: 'Eastern port for West Bengal and northeastern India' },
                    { name: 'Visakhapatnam', desc: 'Central east coast port — growing container volumes' },
                    { name: 'Hazira', desc: 'Gujarat industrial port near Surat manufacturing belt' },
                    { name: 'Delhi (Air Cargo)', desc: 'Indira Gandhi International — major north Indian air hub' },
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
                  <span role="img" aria-label="United Kingdom">🇬🇧</span> UK Destination Ports
                </h3>
                <ul className="space-y-3">
                  {[
                    { name: 'Felixstowe', desc: 'UK&apos;s largest container port — handles most India-UK cargo' },
                    { name: 'Southampton', desc: 'Deep-water port with direct India shipping line services' },
                    { name: 'London Gateway', desc: 'Modern port with excellent India trade connections' },
                    { name: 'Liverpool', desc: 'Northwest port serving northern England and Scotland' },
                    { name: 'Heathrow Airport', desc: 'Primary air cargo gateway for Indian air freight' },
                    { name: 'East Midlands Airport', desc: 'Central UK air cargo hub — growing India connections' },
                    { name: 'Manchester Airport', desc: 'Northern air freight hub for Indian cargo' },
                    { name: 'Tilbury', desc: 'Alternative London port with Indian subcontinent services' },
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
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Shipping Options from India to UK</h2>
            <p className="text-center text-gray-600 mb-10">Sea and air freight to match your timeline and budget</p>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                { icon: Ship, title: 'Sea Freight', price: '£900–£2,800/container', time: '20–28 days', best: 'FCL & LCL for all cargo types', desc: 'Sea freight from India to the UK is the most economical option for large shipments. FCL is ideal for volumes over 15 CBM. LCL lets you share container space for smaller loads. Weekly sailings from Nhava Sheva, Chennai, and Mundra to Felixstowe and Southampton via the Suez Canal.' },
                { icon: Plane, title: 'Air Freight', price: '£3.50–£7/kg', time: '3–5 days', best: 'Urgent cargo, pharmaceuticals, samples', desc: 'Air freight from India delivers your cargo to the UK in just 3–5 days. Services available from Mumbai, Delhi, Chennai, and Bangalore to Heathrow, Manchester, and East Midlands. Express and economy options available with door-to-door delivery across the UK.' },
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
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Popular Goods Shipped from India to UK</h2>
            <p className="text-center text-gray-600 mb-10">Commodities we regularly handle on this trade lane</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'Textiles & Clothing', desc: 'Cotton fabrics, garments, home textiles, and fashion accessories.' },
                { name: 'Pharmaceuticals', desc: 'Generic medicines, API ingredients, vaccines, and medical supplies.' },
                { name: 'Machinery & Parts', desc: 'Engineering goods, pumps, valves, auto parts, and industrial equipment.' },
                { name: 'Leather Goods', desc: 'Footwear, handbags, wallets, and leather accessories.' },
                { name: 'Jewellery & Gems', desc: 'Polished diamonds, gold jewellery, silverware, and precious stones.' },
                { name: 'IT & Electronics', desc: 'Software services exports, consumer electronics, and IT hardware.' },
                { name: 'Chemicals', desc: 'Organic and inorganic chemicals, dyes, pigments, and fertilisers.' },
                { name: 'Food & Spices', desc: 'Rice, tea, coffee, spices, processed foods, and basmati rice.' },
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
              Our HMRC-authorised customs brokers handle all UK import declarations for Indian cargo, ensuring efficient clearance.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-[#1A6DFF]" aria-hidden="true" /> Required Documents
                </h3>
                <ul className="space-y-2">
                  {[
                    'Commercial Invoice (with detailed goods description and FOB value)',
                    'Packing List (weights, dimensions, number of packages)',
                    'Bill of Lading (sea) or Airway Bill (air freight) — original or telex release',
                    'Certificate of Origin (for preferential tariff consideration)',
                    'GSP Form A (if applicable for duty concessions)',
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
                  <Shield className="w-5 h-5 text-[#1A6DFF]" aria-hidden="true" /> UK Import Charges
                </h3>
                <ul className="space-y-3 text-gray-600 text-sm">
                  <li className="flex justify-between pb-2 border-b border-gray-100">
                    <span>Import Duty</span>
                    <span className="font-medium">Varies by HS code (0%–15%+ typical)</span>
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
                    <span>UK-India FTA Status</span>
                    <span className="font-medium">Under negotiation — duty rates apply</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ====== WHY CHOOSE CARRGO ====== */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Why Choose Carrgo for India–UK Shipping</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Globe, title: 'India Network', desc: 'Strong partnerships with Indian freight agents across all major ports and airports.' },
                { icon: FileCheck, title: 'Customs Experts', desc: 'HMRC-authorised brokers experienced in Indian commodity classifications and documentation.' },
                { icon: Clock, title: '2-Hour Quotes', desc: 'Receive your all-inclusive India–UK freight quote within 2 hours during UK business hours.' },
                { icon: TrendingUp, title: 'Live Tracking', desc: 'Track your shipment from Indian port to UK delivery with milestone updates.' },
                { icon: Users, title: 'Dedicated Manager', desc: 'A single point of contact who understands the India-UK trade lane and your business.' },
                { icon: Shield, title: 'All-Inclusive Pricing', desc: 'Freight, documentation, UK customs clearance, and delivery — one price, no surprises.' },
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
            <h2 className="text-3xl font-bold mb-4">Get Your India–UK Freight Quote</h2>
            <p className="text-brand-100 mb-8 text-lg">Sea or air — we&apos;ll find the best shipping solution for your India imports. All-inclusive quote within 2 hours.</p>
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
