import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import {
  Ship, Plane, Clock, MapPin, ArrowRight,
  CheckCircle, ChevronDown, FileCheck, Shield, TrendingUp,
  Users, Globe, Anchor, Package
} from 'lucide-react';

const faqData = [
  { q: 'How long does sea freight from the USA to UK take?', a: 'Sea freight from the US East Coast (New York, Savannah) to the UK takes 10–15 days port-to-port. From the US West Coast (Los Angeles, Long Beach) via the Panama Canal, expect 25–30 days. Air freight from any major US airport to the UK takes 1–3 days.' },
  { q: 'What are the main US ports for shipping to the UK?', a: 'From the East Coast: New York/New Jersey, Savannah, Charleston, Norfolk, and Miami are the primary ports. From the West Coast: Los Angeles, Long Beach, Oakland, and Seattle. We also offer services from Gulf Coast ports including Houston and New Orleans.' },
  { q: 'How much does shipping a container from USA to UK cost?', a: 'East Coast to UK FCL containers typically cost £1,200–£3,000 depending on the season. West Coast to UK ranges from £1,800–£4,000. Air freight costs £3–£6 per kilogram. LCL is charged per cubic metre. Contact us for an all-inclusive quote.' },
  { q: 'Do I need an EORI number to import from the USA to UK?', a: 'Yes, a UK EORI number is mandatory for all commercial imports into the UK from the USA. If you don\'t have one, we can guide you through the application process with HMRC. It typically takes 3–5 working days to receive your EORI number.' },
  { q: 'Are there any trade agreements between the USA and UK?', a: 'Currently there is no comprehensive free trade agreement between the USA and UK. Standard UK import tariffs (known as the UK Global Tariff) apply to US goods. Our customs team can help you determine the exact duty rates for your specific HS commodity codes.' },
  { q: 'What is the cheapest way to ship from USA to UK?', a: 'Sea freight from the US East Coast is the cheapest option for large volumes, with FCL containers costing £1,200–£3,000. For smaller shipments, LCL sea freight at £150–£300 per CBM is cost-effective. Air freight is fastest but costs £3–£6 per kg. Rail is not available on the transatlantic route.' },
  { q: 'Can I ship Amazon FBA goods from USA to UK?', a: 'Yes, Carrgo handles Amazon FBA shipments from the USA to UK fulfilment centres including BHX4, EMA1, and LBA1. We manage FBA prep, labelling, palletisation, and appointment booking through Amazon Carrier Central. Full customs clearance included.' },
  { q: 'Do you ship from USA to Northern Ireland and Ireland?', a: 'Yes. USA goods can be shipped to Northern Ireland via Belfast or Larne, and to the Republic of Ireland via Dublin or Cork. We handle all customs requirements including the NI Protocol and Irish customs declarations.' },
  { q: 'What is the best Incoterm for USA to UK shipping?', a: 'DDP (Delivered Duty Paid) is best for most UK importers as the seller handles all costs and customs. FOB (Free on Board) is common for sea freight — the seller delivers to the US port, and you handle freight and UK customs. Carrgo can advise based on your supplier agreement.' },
  { q: 'How do I get a freight quote from USA to UK?', a: 'Fill out our online quote form with your US origin city, cargo details, weight, dimensions, and preferred transport mode. We provide an all-inclusive quote within 2 hours covering collection, freight, customs, and UK delivery.' },
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

export default function UsaToUk() {
  return (
    <>
      <Seo
        title="USA to UK Shipping | Sea & Air Freight Forwarder | Carrgo"
        description="Ship goods from USA to UK — East Coast sea 10-15 days, West Coast 25-30 days, air freight 1-3 days. Customs clearance to all UK ports & airports."
        keywords="usa to uk shipping, shipping from usa to uk, us freight forwarder uk, new york to felixstowe, los angeles to southampton, transatlantic freight"
        ogUrl="https://carrgo.co.uk/routes/usa-to-uk/"
        canonical="https://carrgo.co.uk/routes/usa-to-uk/"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "USA to UK Freight Shipping",
          "provider": { "@type": "Organization", "name": "Carrgo Freight Solutions Ltd" },
          "areaServed": [{"@type": "Country", "name": "United States"}, {"@type": "Country", "name": "United Kingdom"}],
          "description": "Sea and air freight forwarding from the USA to the UK with customs clearance."
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
                  USA to UK Freight — Sea & Air Shipping
                </h1>
                <p className="text-lg text-brand-100 mb-8 leading-relaxed">
                  Ship goods from the USA to the UK with Carrgo. Sea freight takes 10–15 days from the East Coast or 25–30 days from the West Coast. Air freight 1–3 days. Customs clearance to all UK ports.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8 max-w-sm">
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center border border-white/20">
                    <Ship className="w-6 h-6 mx-auto mb-1 text-brand-200" aria-hidden="true" />
                    <div className="text-2xl font-extrabold">10-15</div>
                    <div className="text-xs text-brand-200">Days (East Coast)</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center border border-white/20">
                    <Plane className="w-6 h-6 mx-auto mb-1 text-brand-200" aria-hidden="true" />
                    <div className="text-2xl font-extrabold">1-3</div>
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
                    <span role="img" aria-label="USA">🇺🇸</span>
                    <ArrowRight className="w-8 h-8 text-brand-200" aria-hidden="true" />
                    <span role="img" aria-label="United Kingdom">🇬🇧</span>
                  </div>
                  <p className="text-brand-200 text-sm">USA to United Kingdom</p>
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <div className="text-3xl font-extrabold">10–15 Days</div>
                    <p className="text-brand-200 text-xs">East Coast sea freight</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====== ROUTE OVERVIEW ====== */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">What is the USA to UK trade lane?</h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              The United States is the UK&apos;s largest single trading partner, with bilateral trade exceeding £260 billion annually. This well-established route benefits from frequent sailings, extensive flight networks, and streamlined customs procedures. Carrgo offers comprehensive sea and air freight services from both US coasts to all major UK ports and airports.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-extrabold text-[#1A6DFF] mb-1">£260B+</div>
                <p className="text-gray-600">Annual UK-USA trade</p>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-[#1A6DFF] mb-1">10+</div>
                <p className="text-gray-600">US ports with UK services</p>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-[#1A6DFF] mb-1">Daily</div>
                <p className="text-gray-600">Air freight departures</p>
              </div>
            </div>
          </div>
        </section>

        {/* ====== TRANSIT TIMES TABLE ====== */}
        <section aria-labelledby="transit-heading" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="transit-heading" className="text-3xl font-bold text-center text-gray-900 mb-4">How long does shipping from USA to UK take?</h2>
            <p className="text-center text-gray-600 mb-8">Estimated transit times by transport mode and coast</p>
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
                    ['Sea Freight — East Coast', '10–15 days', 'Weekly sailings', 'Fastest ocean option from US'],
                    ['Sea Freight — West Coast', '25–30 days', 'Weekly via Panama', 'Pacific-origin shipments'],
                    ['Sea Freight — Gulf Coast', '18–22 days', 'Weekly sailings', 'Southern US exports'],
                    ['Air Freight — Express', '1–2 days', 'Daily flights', 'Urgent cargo, documents'],
                    ['Air Freight — Economy', '2–3 days', 'Daily flights', 'Standard air cargo'],
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
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Which ports and airports are used for USA to UK shipping?</h2>
            <p className="text-center text-gray-600 mb-10">Major US origin facilities and UK destinations</p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span role="img" aria-label="USA">🇺🇸</span> USA Origin Ports & Airports
                </h3>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm uppercase tracking-wide">East Coast</h4>
                  <ul className="space-y-2 mb-4">
                    {[
                      { name: 'New York / New Jersey', desc: 'Busiest US East Coast port — direct UK sailings' },
                      { name: 'Savannah, GA', desc: 'Fastest-growing US port — excellent UK connections' },
                      { name: 'Charleston, SC', desc: 'Major Southeast container port' },
                      { name: 'Norfolk, VA', desc: 'Deep-water port with UK direct services' },
                      { name: 'Miami, FL', desc: 'Gateway for Latin American transshipment' },
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
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm uppercase tracking-wide">West Coast</h4>
                  <ul className="space-y-2">
                    {[
                      { name: 'Los Angeles, CA', desc: 'Busiest US container port — Panama Canal route to UK' },
                      { name: 'Long Beach, CA', desc: 'Adjacent to LA — major transpacific hub' },
                      { name: 'Oakland, CA', desc: 'Northern California port with UK connections' },
                      { name: 'Seattle, WA', desc: 'Pacific Northwest gateway — UK sailings available' },
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
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span role="img" aria-label="United Kingdom">🇬🇧</span> UK Destination Ports & Airports
                </h3>
                <ul className="space-y-3">
                  {[
                    { name: 'Felixstowe', desc: 'UK&apos;s largest container port — primary US cargo entry' },
                    { name: 'Southampton', desc: 'Deep-water port with direct US East Coast services' },
                    { name: 'London Gateway', desc: 'Modern port with excellent transatlantic connections' },
                    { name: 'Liverpool', desc: 'Key northwest port for US trade — Irish Sea access' },
                    { name: 'Heathrow Airport', desc: 'Primary UK air cargo hub for US freight' },
                    { name: 'Manchester Airport', desc: 'Northern air gateway — growing US cargo flights' },
                    { name: 'East Midlands Airport', desc: 'Central UK air cargo hub — US express services' },
                    { name: 'Glasgow Prestwick', desc: 'Scottish air freight hub for North American cargo' },
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
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">What are the shipping options from USA to UK?</h2>
            <p className="text-center text-gray-600 mb-10">Sea and air freight covering both US coasts</p>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                { icon: Ship, title: 'Sea Freight', price: '£1,200–£4,000/container', time: '10–30 days', best: 'East & West Coast, FCL & LCL', desc: 'Sea freight from the USA to the UK offers excellent value for large shipments. East Coast sailings to Felixstowe take just 10–15 days. West Coast cargo routes via the Panama Canal in 25–30 days. Weekly FCL and LCL services from New York, Savannah, Los Angeles, and other major ports. RoRo available for vehicles and oversized cargo.' },
                { icon: Plane, title: 'Air Freight', price: '£3–£6/kg', time: '1–3 days', best: 'Express and economy options', desc: 'Air freight from the USA to the UK is available from all major airports including JFK, LAX, ORD, and MIA. Daily flights to Heathrow, Manchester, and East Midlands mean your cargo arrives quickly. Express services for urgent shipments, economy for cost-sensitive air cargo. Door-to-door delivery available across the UK.' },
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

        {/* ====== COSTS & PRICING ====== */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Pricing</span>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-3 mb-6">
                  How much does shipping from the USA to the UK cost?
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  USA to UK shipping costs depend on your origin coast, cargo type, weight, and chosen transport mode. East Coast sea freight is generally the most cost-effective option, while West Coast shipments cost more due to the longer Panama Canal route. Air freight offers speed at a premium.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Carrgo provides all-inclusive quotes that cover US collection, international freight, UK customs clearance, port handling, and final delivery. No hidden fuel surcharges or terminal fees.
                </p>
                <div className="space-y-4">
                  {[
                    { label: 'Sea Freight — East Coast to UK', price: '£1,200–£3,000 per FCL container', note: 'Best for large volumes — weekly sailings' },
                    { label: 'Sea Freight — West Coast to UK', price: '£1,800–£4,000 per FCL container', note: 'Via Panama Canal — longer transit' },
                    { label: 'Air Freight — Express', price: '£4.50–£7.50 per kg', note: '1–2 days — urgent shipments' },
                    { label: 'Air Freight — Economy', price: '£3.00–£5.00 per kg', note: '2–3 days — standard air cargo' },
                    { label: 'LCL Sea Freight', price: '£150–£300 per CBM', note: 'Share container space — ideal for smaller loads' },
                  ].map((item, i) => (
                    <div key={i} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-semibold text-gray-900">{item.label}</span>
                        <span className="text-[#1A6DFF] font-bold">{item.price}</span>
                      </div>
                      <p className="text-gray-500 text-sm">{item.note}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hidden lg:block">
                <img
                  src="/images/usa-uk-shipping.jpg"
                  alt="Container ship crossing the Atlantic Ocean from USA to UK, loaded with cargo containers"
                  className="rounded-2xl shadow-lg w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ====== DOCUMENTS & COMPLIANCE ====== */}
        <section className="py-16 md:py-24 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Documentation</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-3">
                What documents do I need to import from the USA to the UK?
              </h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                Importing from the USA requires specific documentation for UK customs. Missing or incorrect paperwork causes delays, storage fees, and potential fines. Carrgo ensures every document is correct before your shipment arrives.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                { doc: 'Commercial Invoice', desc: 'Shows goods value, description, quantity, and Incoterms. Must match the packing list exactly. UK customs uses this to calculate duty and VAT.' },
                { doc: 'Packing List', desc: 'Detailed breakdown of weights, dimensions, and carton contents per box. Helps customs with physical inspections and risk assessments.' },
                { doc: 'Bill of Lading / Airway Bill', desc: 'The contract of carriage between shipper and carrier. Original BOL or express release required for cargo release at UK port.' },
                { doc: 'UK EORI Number', desc: 'Mandatory for all UK commercial imports. Starts with GB. Apply through HMRC — takes 3–5 working days. Carrgo can guide you.' },
                { doc: 'Certificate of Origin', desc: 'Required for preferential duty claims. USA-UK currently has no FTA, so standard UK Global Tariff applies. Useful for certain product categories.' },
                { doc: 'Import Licence', desc: 'Required for restricted goods: firearms, chemicals, pharmaceuticals, and certain agricultural products. Check with HMRC before shipping.' },
              ].map((item, i) => (
                <article key={i} className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-start gap-3 mb-3">
                    <FileCheck className="w-5 h-5 text-[#1A6DFF] flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <h3 className="font-bold text-gray-900">{item.doc}</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ====== POPULAR GOODS ====== */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">What goods are commonly shipped from USA to UK?</h2>
            <p className="text-center text-gray-600 mb-10">Commodities we regularly handle on this trade lane</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'Machinery & Equipment', desc: 'Industrial machinery, construction equipment, and agricultural machinery.' },
                { name: 'Pharmaceuticals', desc: 'Branded medicines, biotech products, medical devices, and healthcare equipment.' },
                { name: 'Aerospace Parts', desc: 'Aircraft components, engine parts, and aviation maintenance equipment.' },
                { name: 'Automotive', desc: 'Vehicle parts, tyres, aftermarket accessories, and classic car exports.' },
                { name: 'Food & Beverage', desc: 'American wines, craft spirits, specialty foods, and health supplements.' },
                { name: 'Electronics', desc: 'Consumer electronics, semiconductors, computer hardware, and tech products.' },
                { name: 'Oil & Energy Products', desc: 'Petroleum products, renewable energy components, and drilling equipment.' },
                { name: 'E-commerce Goods', desc: 'Online retail products, Amazon FBA shipments, and direct-to-consumer goods.' },
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
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">What customs clearance and documentation is needed for USA to UK imports?</h2>
            <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
              Our experienced customs brokers handle all UK import declarations for US cargo, ensuring efficient clearance at the port of entry.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-[#1A6DFF]" aria-hidden="true" /> Required Documents
                </h3>
                <ul className="space-y-2">
                  {[
                    'Commercial Invoice (with Incoterm and payment terms)',
                    'Packing List (detailed weights, dimensions, carton count)',
                    'Bill of Lading (sea) or Airway Bill (air) — original or express release',
                    'Certificate of Origin (for preferential claims where applicable)',
                    'Import Licence (for restricted goods: firearms, chemicals, etc.)',
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
                  <Shield className="w-5 h-5 text-[#1A6DFF]" aria-hidden="true" /> USA-UK Customs Information
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
                    <span>USA-UK Trade Deal</span>
                    <span className="font-medium">Under negotiation — standard rates apply</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ====== WHY CHOOSE CARRGO ====== */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Why should I choose Carrgo for USA to UK shipping?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Globe, title: 'Transatlantic Expertise', desc: 'Deep experience managing USA–UK freight from both East and West Coasts with reliable carrier partnerships.' },
                { icon: FileCheck, title: 'Customs Specialists', desc: 'Experienced brokers specialising in US commodity classifications and import requirements.' },
                { icon: Clock, title: '2-Hour Quotes', desc: 'Receive your all-inclusive USA–UK freight quote within 2 hours during UK business hours.' },
                { icon: TrendingUp, title: 'Live Tracking', desc: 'Full visibility from US collection or port through transatlantic transit to UK delivery.' },
                { icon: Users, title: 'Dedicated Manager', desc: 'Your personal account manager understands the transatlantic route and your business needs.' },
                { icon: Shield, title: 'All-Inclusive Pricing', desc: 'US collection, ocean/air freight, UK customs clearance, and delivery — one transparent price.' },
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
            <h2 id="faq-heading" className="text-3xl font-bold text-center text-gray-900 mb-8">What do importers ask about shipping from USA to UK?</h2>
            <FaqAccordion />
          </div>
        </section>

        {/* ====== CTA ====== */}
        <section className="py-16 bg-brand-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Get Your USA–UK Freight Quote</h2>
            <p className="text-brand-100 mb-8 text-lg">Sea or air from any US coast. All-inclusive pricing with UK customs clearance. Quote in 2 hours.</p>
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
