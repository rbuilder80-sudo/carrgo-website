import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import {
  Ship, Plane, TrainFront, Truck, Clock, MapPin, ArrowRight,
  CheckCircle, ChevronDown, FileCheck, Shield, TrendingUp,
  Users, Globe, Anchor, Package
} from 'lucide-react';

const faqData = [
  { q: 'How long does sea freight from China to UK take?', a: 'Sea freight from China to the UK typically takes 25–35 days port-to-port depending on the origin port. Shanghai to Felixstowe is approximately 25–28 days, while Shenzhen to Southampton averages 28–32 days. Door-to-door service adds approximately 7–10 days for inland collection and UK delivery.' },
  { q: 'What documents are required for shipping from China to the UK?', a: 'You will need a commercial invoice, packing list, bill of lading (for sea freight) or airway bill (for air freight), and a valid EORI number. Depending on your goods, you may also need certificates of origin, import licences, or conformity certificates (UKCA/CE marking).' },
  { q: 'Is rail freight from China to UK reliable?', a: 'Yes. Rail freight via the New Silk Road has become highly reliable, with transit times of 14–20 days. It offers an excellent middle ground between the speed of air freight and the cost-effectiveness of sea freight. Services run regularly from Xi\'an, Yiwu, and Chengdu to the UK via Duisburg.' },
  { q: 'What are the main China origin ports for UK-bound cargo?', a: 'The busiest departure ports are Shanghai (world\'s largest container port), Shenzhen (including Shekou and Yantian), Ningbo-Zhoushan, Qingdao, Tianjin, Xiamen, and Dalian. Your choice of port depends on your supplier\'s location and carrier availability.' },
  { q: 'How much does shipping a container from China to UK cost?', a: 'Sea freight costs vary by season and demand. FCL (Full Container Load) typically ranges from £800 to £3,500 per container. LCL (Less than Container Load) is charged per cubic metre. Air freight ranges from £4 to £8 per kilogram. Contact us for an all-inclusive quote with no hidden fees.' },
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

export default function ChinaToUk() {
  return (
    <>
      <Seo
        title="Shipping from China to UK | Sea, Air & Rail Freight | Carrgo"
        description="Shipping from China to UK — sea (25-35 days), air (3-5 days), rail (14-20 days). Shanghai, Shenzhen, Ningbo to Felixstowe, Southampton. Get quotes."
        keywords="shipping from china to uk, china to uk freight, sea freight china to uk, fcl shipping from china, lcl china to uk, rail freight china to uk, new silk road shipping, yiwu to london, china to ireland shipping, china to northern ireland freight, china to dublin, china to belfast"
        ogUrl="https://carrgo.co.uk/routes/china-to-uk"
        canonical="https://carrgo.co.uk/routes/china-to-uk"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "China to UK Freight Shipping",
          "provider": { "@type": "Organization", "name": "Carrgo Freight Solutions Ltd" },
          "areaServed": [{"@type": "Country", "name": "China"}, {"@type": "Country", "name": "United Kingdom"}],
          "description": "Sea, air and rail freight forwarding from China to the UK with customs clearance."
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
                  Shipping from China to UK — Sea, Air & Rail Freight
                </h1>
                <p className="text-lg text-brand-100 mb-8 leading-relaxed">
                  Ship goods from China to the UK with Carrgo. Choose from sea freight (25–35 days), air freight (3–5 days), or rail freight (14–20 days). All-inclusive pricing with HMRC customs clearance included.
                </p>
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center border border-white/20">
                    <Ship className="w-6 h-6 mx-auto mb-1 text-brand-200" aria-hidden="true" />
                    <div className="text-2xl font-extrabold">25-35</div>
                    <div className="text-xs text-brand-200">Days Sea</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center border border-white/20">
                    <Plane className="w-6 h-6 mx-auto mb-1 text-brand-200" aria-hidden="true" />
                    <div className="text-2xl font-extrabold">3-5</div>
                    <div className="text-xs text-brand-200">Days Air</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center border border-white/20">
                    <TrainFront className="w-6 h-6 mx-auto mb-1 text-brand-200" aria-hidden="true" />
                    <div className="text-2xl font-extrabold">14-20</div>
                    <div className="text-xs text-brand-200">Days Rail</div>
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
                    <span role="img" aria-label="China">🇨🇳</span>
                    <ArrowRight className="w-8 h-8 text-brand-200" aria-hidden="true" />
                    <span role="img" aria-label="United Kingdom">🇬🇧</span>
                  </div>
                  <p className="text-brand-200 text-sm">China to United Kingdom</p>
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <div className="text-3xl font-extrabold">14–35 Days</div>
                    <p className="text-brand-200 text-xs">Depending on transport mode</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====== ROUTE OVERVIEW ====== */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">What is the China to UK trade lane?</h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              The China to UK shipping route is one of the world&apos;s busiest trade corridors. Over £45 billion worth of goods are imported from China to the UK annually, spanning electronics, machinery, textiles, furniture, and consumer products. Carrgo provides comprehensive freight forwarding services across all major transport modes including sea, air, and rail freight.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-extrabold text-[#1A6DFF] mb-1">£45B+</div>
                <p className="text-gray-600">Annual UK imports from China</p>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-[#1A6DFF] mb-1">8+</div>
                <p className="text-gray-600">Major Chinese ports served</p>
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
            <h2 id="transit-heading" className="text-3xl font-bold text-center text-gray-900 mb-4">How long does shipping from China to UK take?</h2>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">Sea freight from China to UK takes 25-35 days port-to-port or 35-45 days door-to-door. Air freight takes 3-5 days door-to-door. Rail freight via the New Silk Road takes 14-20 days. Here are the full estimated durations by transport mode.</p>
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
                    ['Sea Freight (FCL)', '25–35 days', '35–45 days', 'Large volumes, cost efficiency'],
                    ['Sea Freight (LCL)', '28–38 days', '38–48 days', 'Smaller shipments sharing container'],
                    ['Air Freight', '3–5 days', '5–8 days', 'Urgent cargo, high-value goods'],
                    ['Rail Freight', '14–20 days', '18–25 days', 'Middle-ground speed and cost'],
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
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Which ports and airports are used for China to UK shipping?</h2>
            <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">Major Chinese origin ports include Shanghai, Shenzhen, Ningbo, Guangzhou, Qingdao, Tianjin, and Xiamen. UK arrival ports include Felixstowe, Southampton, and London Gateway. Air freight routes use London Heathrow, East Midlands, and Manchester airports.</p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span role="img" aria-label="China">🇨🇳</span> China Origin Ports
                </h3>
                <ul className="space-y-3">
                  {[
                    { name: 'Shanghai (Port of Shanghai)', desc: 'World\'s busiest container port — primary hub for UK-bound cargo' },
                    { name: 'Shenzhen (Shekou/Yantian)', desc: 'Major southern hub serving Pearl River Delta manufacturers' },
                    { name: 'Ningbo-Zhoushan', desc: 'Second-busiest Chinese port — excellent for Zhejiang province goods' },
                    { name: 'Qingdao', desc: 'Key northern port serving Shandong and northern China' },
                    { name: 'Tianjin', desc: 'Primary port for Beijing and northeastern China cargo' },
                    { name: 'Xiamen', desc: 'Major port in Fujian province — strong UK connections' },
                    { name: 'Dalian', desc: 'Northernmost major Chinese port — gateway to Northeast Asia' },
                    { name: 'Guangzhou', desc: 'Historic trade port in the heart of manufacturing country' },
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
                    { name: 'Felixstowe', desc: 'UK\'s largest container port — handles 40% of UK container traffic' },
                    { name: 'Southampton', desc: 'Second-largest UK container port — deep-water capability' },
                    { name: 'London Gateway', desc: 'Modern deep-sea port with integrated logistics park' },
                    { name: 'Liverpool', desc: 'Key northwest port with Irish Sea connections' },
                    { name: 'Heathrow Airport', desc: 'UK\'s largest air cargo hub — express freight gateway' },
                    { name: 'Manchester Airport', desc: 'Northern air freight hub with growing cargo capacity' },
                    { name: 'East Midlands Airport', desc: 'Central UK air cargo hub — strong e-commerce links' },
                    { name: 'Tilbury', desc: 'Fastest-growing UK port — RoRo and container services' },
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
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">How do I ship goods from China to the UK?</h2>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">Shipping from China to the UK involves 5 key steps: choose your transport mode (sea, air, or rail), prepare documentation including commercial invoice and packing list, book freight with a forwarder like Carrgo, clear UK customs with your EORI number, and arrange final delivery to your warehouse.</p>
            <p className="text-center text-gray-600 mb-10">Three transport modes to suit your timeline and budget</p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Ship, title: 'Sea Freight', price: '£800–£3,500/container', time: '25–35 days', best: 'Large shipments, FCL & LCL', desc: 'The most cost-effective option for shipping from China to the UK. FCL (Full Container Load) is ideal for volumes over 15 CBM. LCL (Less than Container Load) lets you share container space for smaller shipments. Weekly sailings from all major Chinese ports to Felixstowe and Southampton.' },
                { icon: Plane, title: 'Air Freight', price: '£4–£8/kg', time: '3–5 days', best: 'Urgent cargo, high-value goods', desc: 'When speed matters, air freight from China to the UK delivers in just 3–5 days. Ideal for electronics, samples, spare parts, and time-sensitive cargo. We offer both express and economy air freight options with collection from any Chinese city to any UK address.' },
                { icon: TrainFront, title: 'Rail Freight', price: '£2,500–£4,000/container', time: '14–20 days', best: 'Best balance of speed and cost', desc: 'Rail freight via the New Silk Road offers a compelling middle ground. Faster than sea at approximately half the cost of air freight. Services depart regularly from Xi\'an, Yiwu, Chengdu and other Chinese cities, arriving in the UK via the Duisburg gateway.' },
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
                    <p className="text-sm text-gray-500 mb-3 font-medium">Best for: {mode.best}</p>
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
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">What goods are commonly shipped from China to the UK?</h2>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">The UK imports over £45 billion annually from China including electronics, machinery, furniture, textiles, toys, automotive parts, and consumer goods. Carrgo handles all categories with specialised packaging and compliance support.</p>
            <p className="text-center text-gray-600 mb-10">Commodities we regularly handle on this trade lane</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'Electronics & Tech', desc: 'Consumer electronics, components, smartphones, laptops, chargers and accessories.' },
                { name: 'Machinery & Parts', desc: 'Industrial machinery, automotive parts, tools, and manufacturing equipment.' },
                { name: 'Textiles & Clothing', desc: 'Garments, fabrics, footwear, and fashion accessories for retail and wholesale.' },
                { name: 'Furniture & Home', desc: 'Flat-pack furniture, home decor, lighting, and garden products.' },
                { name: 'Toys & Games', desc: 'Children\'s toys, board games, sporting goods, and recreational items.' },
                { name: 'Plastics & Materials', desc: 'Raw plastic materials, packaging, and manufactured plastic goods.' },
                { name: 'Medical Supplies', desc: 'PPE, medical devices, pharmaceuticals, and healthcare equipment.' },
                { name: 'Automotive', desc: 'Car parts, EV components, tyres, and aftermarket accessories.' },
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
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">What customs clearance and documentation is needed for China to UK imports?</h2>
            <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
              UK importers need a valid EORI number, commercial invoice, packing list, bill of lading or airway bill, and sometimes a certificate of origin. Carrgo's experienced customs brokers handle all UK import declarations to ensure smooth clearance at the port of entry.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-[#1A6DFF]" aria-hidden="true" /> Required Documents
                </h3>
                <ul className="space-y-2">
                  {[
                    'Commercial Invoice (detailing goods value and description)',
                    'Packing List (with weights, dimensions, and HS codes)',
                    'Bill of Lading (sea) or Airway Bill (air freight)',
                    'Certificate of Origin (for preferential tariff claims)',
                    'Import Licence (for restricted goods only)',
                    'UK EORI Number (required for all UK importers)',
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
                    <span className="font-medium">Varies by HS code (0%–25%+)</span>
                  </li>
                  <li className="flex justify-between pb-2 border-b border-gray-100">
                    <span>VAT</span>
                    <span className="font-medium">20% (standard rate)</span>
                  </li>
                  <li className="flex justify-between pb-2 border-b border-gray-100">
                    <span>Customs Clearance Fee</span>
                    <span className="font-medium">Included in Carrgo quote</span>
                  </li>
                  <li className="flex justify-between pb-2 border-b border-gray-100">
                    <span>Port Handling</span>
                    <span className="font-medium">Included in Carrgo quote</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Commodity Codes</span>
                    <span className="font-medium">We help you classify</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ====== WHY CHOOSE CARRGO ====== */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Why should I choose Carrgo for China to UK shipping?</h2>
            <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">Carrgo offers established China expertise, dedicated customs specialists, 2-hour quotes, live shipment tracking, a dedicated account manager, and all-inclusive pricing with no hidden fees — making us the preferred freight forwarder for UK importers sourcing from China.</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Globe, title: 'China Expertise', desc: 'Established relationships with Chinese freight agents and carriers across all major ports and cities.' },
                { icon: FileCheck, title: 'Customs Specialists', desc: 'Our experienced brokers ensure first-time clearance with accurate declarations every time.' },
                { icon: Clock, title: '2-Hour Quotes', desc: 'Receive your all-inclusive China–UK freight quote within 2 hours during UK business hours.' },
                { icon: TrendingUp, title: 'Live Tracking', desc: 'Track your shipment from Chinese factory to UK warehouse with real-time milestone updates.' },
                { icon: Users, title: 'Dedicated Manager', desc: 'A single point of contact who understands your China supply chain and keeps you informed.' },
                { icon: Shield, title: 'All-Inclusive Pricing', desc: 'One price covers freight, fuel, documentation, UK customs clearance, and port handling — no surprises.' },
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
            <h2 id="faq-heading" className="text-3xl font-bold text-center text-gray-900 mb-8">What do importers ask about China to UK shipping?</h2>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">Here are the most common questions we receive about shipping from China to the UK, covering transit times, costs, customs, documentation, and freight modes.</p>
            <FaqAccordion />
          </div>
        </section>

        {/* ====== CTA ====== */}
        <section className="py-16 bg-brand-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">How do I get a China to UK freight quote?</h2>
            <p className="text-gray-600 mb-6 max-w-xl">Request your all-inclusive China to UK freight quote by filling in our online form with your origin city, cargo details, and preferred transport mode. Carrgo responds within 2 hours with a competitive, no-obligation quote.</p>
            <p className="text-brand-100 mb-8 text-lg">Sea, air, or rail — we&apos;ll find the best shipping solution for your China imports. All-inclusive quote within 2 hours.</p>
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
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Can Carrgo ship China goods onward to Ireland and Northern Ireland?</h2>
            <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
              Yes. Goods arriving at UK ports from China can be forwarded onward to Ireland and Northern Ireland via our Irish Sea services. We offer seamless China-to-Ireland shipping with full customs handling at both UK and Irish entry points, including Northern Ireland Protocol compliance.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Ship, title: 'China to Ireland Sea Freight', time: '30–40 days total', desc: 'FCL and LCL sea freight from Shanghai, Shenzhen, or Ningbo to Dublin Port via UK transit. Full customs clearance at Dublin Port with T1 transit documentation handled by our Irish customs team.' },
                { icon: Truck, title: 'China to Northern Ireland', time: '30–40 days total', desc: 'Sea freight to Liverpool or Heysham, then onward RoRo ferry to Belfast Harbour or Larne. Full Northern Ireland Protocol compliance and Windsor Framework documentation included.' },
                { icon: Plane, title: 'China to Ireland Air Freight', time: '5–8 days total', desc: 'Air freight from any Chinese airport to Dublin Airport via Heathrow or Manchester. Express customs clearance and same-day delivery within Ireland for urgent shipments.' },
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
                  Dublin to UK Route <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link to="/routes/belfast-northern-ireland" className="inline-flex items-center gap-2 text-[#1A6DFF] font-semibold hover:gap-3 transition-all">
                  Belfast & Northern Ireland Route <ArrowRight className="w-4 h-4" aria-hidden="true" />
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
                { name: 'Germany', flag: '🇩🇪', route: '/routes/germany-to-uk' },
                { name: 'Netherlands', flag: '🇳🇱', route: '/routes/netherlands-to-uk' },
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
