import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import {
  Ship, Plane, TrainFront, Truck, Clock, MapPin, ArrowRight, ArrowUpRight,
  CheckCircle, ChevronDown, FileCheck, Shield, TrendingUp,
  Users, Globe, Anchor, Package
} from 'lucide-react';

const faqData = [
  { q: 'How long does sea freight from China to UK take?', a: 'Sea freight from China to the UK typically takes 25–35 days port-to-port depending on the origin port. Shanghai to Felixstowe is approximately 25–28 days, while Shenzhen to Southampton averages 28–32 days. Door-to-door service adds approximately 7–10 days for inland collection and UK delivery.' },
  { q: 'What documents are required for shipping from China to the UK?', a: 'You will need a commercial invoice, packing list, bill of lading (for sea freight) or airway bill (for air freight), and a valid EORI number. Depending on your goods, you may also need certificates of origin, import licences, or conformity certificates (UKCA/CE marking).' },
  { q: 'Is rail freight from China to UK suitable for every shipment?', a: 'Not always. Rail routing, departure availability, cargo acceptance and transit-country requirements must be confirmed for each shipment. Ask for a current route check before relying on rail for a deadline.' },
  { q: 'What are the main China origin ports for UK-bound cargo?', a: 'Common origin options include Shanghai, Shenzhen (including Shekou and Yantian), Ningbo-Zhoushan, Qingdao, Tianjin, Xiamen and Dalian. The practical departure point depends on the supplier location, cargo and current carrier service.' },
  { q: 'How much does shipping from China to the UK cost?', a: 'The price depends on the collection point, destination, transport mode, cargo dimensions, weight, commodity, Incoterm and current carrier charges. Send those details for a shipment-specific FCL, LCL, air or rail freight quote.' },
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
        description="Compare sea, air and rail freight from China to the UK, including supplier collection, customs clearance and final delivery. Request a shipment-specific quote."
        keywords="shipping from china to uk, china to uk freight, sea freight china to uk, fcl shipping from china, lcl china to uk, rail freight china to uk, new silk road shipping, yiwu to london, china to ireland shipping, china to northern ireland freight, china to dublin, china to belfast"
        ogUrl="https://www.carrgo.co.uk/routes/china-to-uk"
        canonical="https://www.carrgo.co.uk/routes/china-to-uk"
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "China to UK Freight Shipping",
            "provider": { "@type": "Organization", "name": "CARRGO FREIGHT LTD" },
            "areaServed": [{"@type": "Country", "name": "China"}, {"@type": "Country", "name": "United Kingdom"}],
            "description": "Sea, air and rail freight forwarding from China to the UK with customs clearance."
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.map((f) => ({
              "@type": "Question",
              "name": f.q,
              "acceptedAnswer": { "@type": "Answer", "text": f.a }
            }))
          },
          {
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Ship Goods from China to the UK",
            "description": "A step-by-step guide for UK importers shipping goods from China by sea, air, or rail freight.",
            "step": [
              {
                "@type": "HowToStep",
                "name": "Choose Your Transport Mode",
                "text": "Compare sea freight (25–35 days), air freight (3–5 days) and rail freight (14–20 days) against the cargo, available service, budget and delivery deadline.",
                "url": "https://www.carrgo.co.uk/routes/china-to-uk"
              },
              {
                "@type": "HowToStep",
                "name": "Prepare Export Documentation",
                "text": "Confirm the commercial invoice, packing list and transport-document requirements. Extra certificates, licences or controls depend on the commodity and routing.",
              },
              {
                "@type": "HowToStep",
                "name": "Book Freight with a Forwarder",
                "text": "Contact Carrgo with the origin, destination, cargo description, weight, dimensions, Incoterm and ready date. The quotation will identify the services and charges included for that shipment.",
              },
              {
                "@type": "HowToStep",
                "name": "Obtain a UK EORI Number",
                "text": "Check whether the importer needs a GB or XI EORI number for the planned movement and obtain the appropriate registration before the declaration is submitted.",
              },
              {
                "@type": "HowToStep",
                "name": "Customs Clearance at UK Port",
                "text": "Confirm the customs-declaration scope, commodity code, duty and VAT treatment before booking. Requirements and charges depend on the goods and shipment structure.",
              },
              {
                "@type": "HowToStep",
                "name": "Arrange UK Inland Delivery",
                "text": "Once cleared, we arrange haulage from the port (Felixstowe, Southampton, etc.) to your UK warehouse or onward to Ireland or Northern Ireland via Irish Sea ferry.",
              }
            ]
          }
        ]}
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
                  Ship goods from China to the UK with Carrgo. Choose from sea freight (25–35 days), air freight (3–5 days), or rail freight (14–20 days). Pricing and customs scope are confirmed against your cargo, Incoterm and delivery requirements.
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
              China–UK freight can move by sea, air or rail, with the practical route determined by the supplier location, cargo, required delivery date and UK destination. Carrgo can coordinate collection, international freight, customs scope and final delivery under one shipment plan.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-extrabold text-[#1A6DFF] mb-1">China–UK</div>
                <p className="text-gray-600">Established commercial trade lane</p>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-[#1A6DFF] mb-1">Multiple</div>
                <p className="text-gray-600">Origin ports and airports</p>
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
                    { name: 'Shanghai (Port of Shanghai)', desc: 'Origin option for suppliers in and around eastern China' },
                    { name: 'Shenzhen (Shekou/Yantian)', desc: 'Major southern hub serving Pearl River Delta manufacturers' },
                    { name: 'Ningbo-Zhoushan', desc: 'Origin option for suppliers in Zhejiang province' },
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
                    { name: 'Felixstowe', desc: 'Potential UK arrival port for container services' },
                    { name: 'Southampton', desc: 'Potential UK arrival port for container services' },
                    { name: 'London Gateway', desc: 'Modern deep-sea port with integrated logistics park' },
                    { name: 'Liverpool', desc: 'Key northwest port with Irish Sea connections' },
                    { name: 'Heathrow Airport', desc: 'Potential arrival airport for air-freight services' },
                    { name: 'Manchester Airport', desc: 'Potential northern arrival airport for air freight' },
                    { name: 'East Midlands Airport', desc: 'Potential central UK arrival airport for air freight' },
                    { name: 'Tilbury', desc: 'Potential UK arrival port where the carrier service is suitable' },
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
                { icon: Ship, title: 'Sea Freight', price: 'Shipment-specific price', time: '25–35 days', best: 'Large shipments, FCL & LCL', desc: 'FCL gives one importer use of a full container, while LCL consolidates smaller consignments. The quote depends on origin collection, container or cargo details, current carrier charges, customs scope and final UK delivery.' },
                { icon: Plane, title: 'Air Freight', price: 'Shipment-specific price', time: '3–5 days', best: 'Urgent cargo, high-value goods', desc: 'Air freight is suited to urgent stock, samples, spare parts and higher-value commercial cargo. The quote uses chargeable weight, dimensions, origin airport or collection point, handling requirements and final delivery.' },
                { icon: TrainFront, title: 'Rail Freight', price: 'Shipment-specific price', time: '14–20 days', best: 'Middle-ground timing option', desc: 'Rail freight can provide an alternative between sea and air for suitable cargo. Routing, departure availability, transit countries and current pricing must be confirmed before booking.' },
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

        {/* ====== TRANSPORT MODE COMPARISON TABLE ====== */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Sea freight vs air freight vs rail freight: which is best for China to UK?</h2>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">Compare all three transport modes side by side to find the best option for your China to UK shipment based on cost, speed, and cargo type.</p>
            <div className="overflow-x-auto">
              <table className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow-sm border">
                <thead>
                  <tr className="bg-gray-100">
                    <th scope="col" className="text-left px-6 py-4 font-semibold text-gray-700">Feature</th>
                    <th scope="col" className="text-center px-6 py-4 font-semibold text-gray-700">Sea Freight</th>
                    <th scope="col" className="text-center px-6 py-4 font-semibold text-gray-700">Air Freight</th>
                    <th scope="col" className="text-center px-6 py-4 font-semibold text-gray-700">Rail Freight</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Transit time', '25–35 days', '3–5 days', '14–20 days'],
                    ['Typical charging basis', 'FCL container or LCL volume/weight', 'Chargeable weight', 'Container, pallet or chargeable weight'],
                    ['Best for', 'Large volumes, non-urgent', 'Urgent, high-value', 'Mid-range budget, regular'],
                    ['Booking checks', 'Container size, cut-off and free time', 'Chargeable weight and airline acceptance', 'Route and departure availability'],
                    ['Cargo restrictions', 'Confirm dangerous, oversized or controlled goods', 'Confirm airline and security acceptance', 'Confirm operator and transit-country acceptance'],
                    ['Quote needs', 'Origin, destination, goods, weight and volume', 'Origin, destination, goods, weight and dimensions', 'Origin, destination, goods, weight and dimensions'],
                    ['UK arrival examples', 'Felixstowe, Southampton', 'Heathrow, Manchester', 'Terminal depends on the confirmed service'],
                  ].map(([feat, sea, air, rail], i) => (
                    <tr key={i} className="border-t">
                      <td className="px-6 py-3 font-medium text-gray-900">{feat}</td>
                      <td className="px-6 py-3 text-center text-gray-600">{sea}</td>
                      <td className="px-6 py-3 text-center text-gray-600">{air}</td>
                      <td className="px-6 py-3 text-center text-gray-600">{rail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-center text-gray-500 text-sm mt-6 max-w-2xl mx-auto">Not sure which mode suits your shipment? <Link to="/get-a-quote" className="text-[#1A6DFF] font-medium hover:underline">Request a shipment-specific quote</Link> so the available routes can be compared against your cargo and deadline.</p>
          </div>
        </section>

        {/* ====== POPULAR GOODS ====== */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">What goods are commonly shipped from China to the UK?</h2>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">Common commercial imports include electronics, machinery, furniture, textiles, toys, automotive parts and consumer goods. Packaging, documentation and product-control requirements must be checked against the specific commodity.</p>
            <p className="text-center text-gray-600 mb-10">Common commodity examples; acceptance and documentation must be confirmed</p>
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
              UK importers generally need an EORI number and core commercial and transport documents. Extra licences, certificates or controls depend on the commodity and origin. Confirm the declaration and representation scope before booking.
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
                    'The appropriate GB or XI EORI number where required',
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
                    <span className="font-medium">Check the current UK Trade Tariff for the commodity</span>
                  </li>
                  <li className="flex justify-between pb-2 border-b border-gray-100">
                    <span>VAT</span>
                    <span className="font-medium">Confirm the applicable VAT treatment for the import</span>
                  </li>
                  <li className="flex justify-between pb-2 border-b border-gray-100">
                    <span>Customs Clearance Fee</span>
                    <span className="font-medium">Scope and fee shown on the shipment quote</span>
                  </li>
                  <li className="flex justify-between pb-2 border-b border-gray-100">
                    <span>Port Handling</span>
                    <span className="font-medium">Carrier and terminal charges shown where applicable</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Commodity Codes</span>
                    <span className="font-medium">Importer must confirm the correct commodity code</span>
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
            <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">A useful China–UK quote should define the route, charging basis, customs scope and final-delivery requirements for the shipment details supplied.</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Globe, title: 'Origin and route', desc: 'Provide the supplier collection point so the practical port, airport or rail terminal can be checked.' },
                { icon: FileCheck, title: 'Customs scope', desc: 'Confirm the importer, Incoterm, commodity code and declaration responsibilities before booking.' },
                { icon: Clock, title: 'Shipment-specific quote', desc: 'The quotation should identify the current route, charging basis, included services and validity period.' },
                { icon: TrendingUp, title: 'Milestone expectations', desc: 'Confirm which collection, departure, arrival, customs and delivery updates are available on the selected service.' },
                { icon: Users, title: 'Shipment contact', desc: 'Confirm who will handle booking questions and operational updates for the movement.' },
                { icon: Shield, title: 'Charge checks', desc: 'Review origin, freight, destination, customs and final-delivery charges before accepting the quote.' },
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
            <p className="text-gray-600 mb-6 max-w-xl">Request a China to UK freight quote by filling in the online form with the origin, destination, cargo details and preferred transport mode. The quotation can then be prepared against the shipment details supplied.</p>
            <p className="text-brand-100 mb-8 text-lg">Sea, air or rail options can be checked against your cargo, origin, destination and required delivery date. The quotation will state its scope and exclusions.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/get-a-quote" className="inline-flex items-center gap-2 bg-white text-brand-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors min-h-[44px]">
                Request a Quote <ArrowRight className="w-5 h-5" aria-hidden="true" />
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
              Onward movement to Ireland or Northern Ireland may be possible, but the route, customs procedure, carrier service and final-delivery scope must be confirmed for the shipment.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Ship, title: 'China to Ireland Sea Freight', time: '30–40 days total', desc: 'Ask for a current FCL or LCL route check to Dublin, including whether the service is direct or transhipped and which customs procedure applies.' },
                { icon: Truck, title: 'China to Northern Ireland', time: '30–40 days total', desc: 'Confirm the booked UK or Irish Sea gateway, onward ferry service, customs status and final-delivery scope.' },
                { icon: Plane, title: 'China to Ireland Air Freight', time: '5–8 days total', desc: 'Confirm the origin airport, routing, destination airport, customs scope and final delivery before booking.' },
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

        {/* ====== SOURCES, DISCLAIMER & CROSS-LINKS ====== */}
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left: Disclaimer + What this does not include */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Cost &amp; Timing Disclaimer</h2>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
                  <p className="text-sm text-amber-800 font-medium mb-2">
                    The transit-time ranges shown are planning guidance only; this page does not publish current freight rates.
                  </p>
                  <p className="text-sm text-amber-700 leading-relaxed">
                    Actual routing, timing and charges depend on the cargo, origin, destination, service availability and quotation date. Request a current shipment-specific quote before committing to a deadline or budget.
                  </p>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">What these estimates do not include</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span><strong>Import Duty</strong> — check the current rate for the commodity in the <a href="https://www.trade-tariff.service.gov.uk/" target="_blank" rel="noopener noreferrer" className="text-[#1A6DFF] hover:underline">UK Trade Tariff</a>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span><strong>VAT</strong> — confirm the applicable import-VAT treatment for the goods and importer.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span><strong>Port conditions</strong> — our <Link to="/resources/port-congestion-tracker" className="text-[#1A6DFF] hover:underline">Port Congestion Tracker</Link> records official operational notices and marks unavailable queue or waiting-time measurements as unknown.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span><strong>Demurrage &amp; detention</strong> — charges apply if containers are not collected within free time.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span><strong>Inland haulage</strong> beyond standard port-to-warehouse delivery quoted.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span><strong>Insurance</strong> — cargo insurance is recommended but quoted separately.</span>
                  </li>
                </ul>
              </div>

              {/* Right: Sources & References */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Sources &amp; References</h2>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 text-[#1A6DFF] text-xs font-bold flex-shrink-0">1</span>
                    <div>
                      <span className="font-medium text-gray-900">Drewry World Container Index</span>
                      <p className="text-gray-500">Global container freight rate benchmarking.</p>
                      <a href="https://www.drewry.co.uk/supply-chain-advisors/supply-chain-expertise/world-container-index" target="_blank" rel="noopener noreferrer" className="text-[#1A6DFF] hover:underline inline-flex items-center gap-1 mt-0.5">
                        drewry.co.uk <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 text-[#1A6DFF] text-xs font-bold flex-shrink-0">2</span>
                    <div>
                      <span className="font-medium text-gray-900">Freightos Baltic Index (FBX)</span>
                      <p className="text-gray-500">Daily container freight rate index.</p>
                      <a href="https://fbx.freightos.com/" target="_blank" rel="noopener noreferrer" className="text-[#1A6DFF] hover:underline inline-flex items-center gap-1 mt-0.5">
                        fbx.freightos.com <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 text-[#1A6DFF] text-xs font-bold flex-shrink-0">3</span>
                    <div>
                      <span className="font-medium text-gray-900">HMRC UK Trade Statistics</span>
                      <p className="text-gray-500">Official UK import volumes by country and commodity.</p>
                      <a href="https://www.gov.uk/government/collections/uk-trade-statistics" target="_blank" rel="noopener noreferrer" className="text-[#1A6DFF] hover:underline inline-flex items-center gap-1 mt-0.5">
                        gov.uk/trade-statistics <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 text-[#1A6DFF] text-xs font-bold flex-shrink-0">4</span>
                    <div>
                      <span className="font-medium text-gray-900">GOV.UK — UK Trade Tariff</span>
                      <p className="text-gray-500">Look up duty rates and commodity codes for China-origin goods.</p>
                      <a href="https://www.trade-tariff.service.gov.uk/" target="_blank" rel="noopener noreferrer" className="text-[#1A6DFF] hover:underline inline-flex items-center gap-1 mt-0.5">
                        trade-tariff.service.gov.uk <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 text-[#1A6DFF] text-xs font-bold flex-shrink-0">5</span>
                    <div>
                      <span className="font-medium text-gray-900">MarineTraffic — AIS Tracking</span>
                      <p className="text-gray-500">Real-time vessel positions and port arrival data.</p>
                      <a href="https://www.marinetraffic.com/" target="_blank" rel="noopener noreferrer" className="text-[#1A6DFF] hover:underline inline-flex items-center gap-1 mt-0.5">
                          marinetraffic.com <ArrowUpRight className="w-3 h-3" />
                        </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Methodology note */}
            <div className="mt-10 pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                <span className="font-medium text-gray-700">Methodology:</span> route examples and transit ranges are planning guidance, not live carrier schedules or quotations. Current service availability, charges and shipment acceptance must be confirmed before booking. For evidence-led port notices, see the <Link to="/resources/port-congestion-tracker" className="text-[#1A6DFF] hover:underline">Port Congestion Tracker</Link>.
              </p>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
