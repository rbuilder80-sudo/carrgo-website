import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import {
  Ship, Plane, Truck, Clock, MapPin, ArrowRight,
  CheckCircle, ChevronDown, FileCheck, Shield, TrendingUp,
  Users, Globe, Anchor, Package
} from 'lucide-react';

const faqData = [
  { q: 'How long does shipping from Dublin to UK take?', a: 'The Dublin to Liverpool ferry takes just 8 hours, with departures twice daily. Dublin to Holyhead is even faster at approximately 2 hours by fast ferry. For door-to-door road freight, transit from Dublin to most UK destinations is 1–2 days. Air freight from Dublin to UK airports takes just 1 day with same-day clearance available.' },
  { q: 'What documents are needed for shipping from Ireland to the UK post-Brexit?', a: 'Since Brexit, goods moving from Ireland to the UK require a commercial invoice, packing list, UK import declaration, and a valid UK EORI number. T1 transit documents may be required for goods moving through the UK to other destinations. Our customs team prepares all documentation including ENS safety and security declarations and CDS entries.' },
  { q: 'What is the Common Travel Area and how does it affect freight?', a: 'The Common Travel Area (CTA) between the UK and Ireland allows for free movement of people, but goods still require customs declarations post-Brexit. However, the Ireland–UK trade relationship benefits from the Short Straits routes (Dublin–Holyhead/Liverpool) which offer some of the fastest and most reliable ferry crossings in Europe.' },
  { q: 'How much does freight from Dublin to UK cost?', a: 'Road freight from Dublin to the UK typically costs £150–£400 per pallet depending on volume and urgency. Sea freight rates range from £350–£700 per container for Dublin–Liverpool routes. Air freight starts from £2–£4 per kilogram. Full truckload (FTL) services offer the best rates for regular shippers. Contact us for an all-inclusive quote.' },
  { q: 'Which Irish ports offer services to the UK?', a: 'Dublin Port is the largest and busiest, with direct ferry services to Liverpool (8 hours), Holyhead (2 hours), and Heysham. Rosslare Europort offers routes to Fishguard, Pembroke, and Cherbourg. Cork Port serves southern Ireland with connections to continental Europe and the UK. Shannon Foynes Port on the west coast handles bulk and project cargo.' },
  { q: 'What is the fastest way to ship from Dublin to London?', a: 'The Dublin to Holyhead fast ferry takes 2 hours, followed by road transit to London in 4–6 hours. Door-to-door, you are looking at 1–2 days total. For same-day needs, air freight from Dublin Airport is available.' },
  { q: 'Do I need an Irish EORI number to export from Ireland?', a: 'Yes, Irish exporters need an IE EORI number for all exports to the UK. We can guide you through the Revenue application process. It is free and usually issued within a few working days.' },
  { q: 'How do T1 transit documents work for Ireland–UK–EU movements?', a: 'T1 transit documents are required when Irish goods move through the UK to the EU. We prepare the T1 declaration, submit it to Irish customs, and manage the transit process so your goods reach their EU destination without delay.' },
  { q: 'Can Carrgo handle pharmaceutical shipments from Dublin?', a: 'Yes. Ireland is a global pharma hub, and we regularly move temperature-controlled API, medicines, and medical devices from Dublin to UK destinations. We provide GDP-compliant handling and full chain-of-custody documentation.' },
  { q: 'What happens if my goods arrive at Holyhead without proper documentation?', a: 'The shipment will be held until customs clearance is completed. Our team submits ENS declarations and CDS entries before arrival to avoid this. If issues arise, we resolve them directly with Irish and UK customs authorities.' },
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

export default function DublinToUk() {
  return (
    <>
      <Seo
        title="Dublin to UK Freight Forwarding | Ireland's Trade Route | Carrgo"
        description="Dublin to UK freight forwarding via Irish Sea. Dublin-Liverpool 8hrs, Dublin-Holyhead 2hrs. Full Irish customs clearance. Sea, road & air shipping options."
        keywords="freight forwarder dublin, dublin to uk shipping, ireland freight forwarding, dublin port customs clearance, shipping from ireland to uk, irish customs broker, road freight ireland to uk, dublin port freight, t1 transit documents"
        ogUrl="https://carrgo.co.uk/routes/dublin-ireland/"
        canonical="https://carrgo.co.uk/routes/dublin-ireland/"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Dublin to UK Freight Forwarding",
          "provider": { "@type": "Organization", "name": "Carrgo Freight Solutions Ltd" },
          "areaServed": [{"@type": "Country", "name": "Ireland"}, {"@type": "Country", "name": "United Kingdom"}],
          "description": "Freight forwarding from Dublin and Ireland to the UK via Irish Sea. Sea, road and air shipping with full Irish and UK customs clearance."
        }}
      />

      <main id="main-content">
        {/* ====== HERO ====== */}
        <section aria-labelledby="hero-heading" className="bg-gradient-to-br from-brand-900 to-brand-800 text-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block text-xs font-semibold tracking-wider uppercase text-brand-200 mb-3">IRELAND–UK TRADE ROUTE</span>
                <h1 id="hero-heading" className="text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
                  Dublin to UK Freight — Ireland's Premier Trade Route
                </h1>
                <p className="text-lg text-brand-100 mb-8 leading-relaxed">
                  Ship goods from Dublin and across Ireland to the UK via the Irish Sea. Fast ferry crossings — Dublin to Liverpool in 8 hours, Dublin to Holyhead in just 2 hours. Full customs clearance with T1 transit documents and Irish customs expertise.
                </p>
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center border border-white/20">
                    <Ship className="w-6 h-6 mx-auto mb-1 text-brand-200" aria-hidden="true" />
                    <div className="text-2xl font-extrabold">8hrs</div>
                    <div className="text-xs text-brand-200">Dublin–Liverpool</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center border border-white/20">
                    <Truck className="w-6 h-6 mx-auto mb-1 text-brand-200" aria-hidden="true" />
                    <div className="text-2xl font-extrabold">1-2</div>
                    <div className="text-xs text-brand-200">Days Road</div>
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
                    <span role="img" aria-label="Ireland">🇮🇪</span>
                    <ArrowRight className="w-8 h-8 text-brand-200" aria-hidden="true" />
                    <span role="img" aria-label="United Kingdom">🇬🇧</span>
                  </div>
                  <p className="text-brand-200 text-sm">Ireland to United Kingdom</p>
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <div className="text-3xl font-extrabold">2–8 Hours</div>
                    <p className="text-brand-200 text-xs">By Irish Sea ferry</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====== ROUTE OVERVIEW ====== */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">What is the Ireland to UK trade lane?</h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Ireland and the UK share one of the closest trading relationships in Europe, with over £50 billion in annual trade. The geographic proximity, multiple ferry routes, and Common Travel Area make Ireland–UK shipping fast and efficient. Carrgo offers comprehensive freight services from all major Irish ports to every UK destination.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-extrabold text-[#1A6DFF] mb-1">£50B+</div>
                <p className="text-gray-600">Annual Ireland–UK trade</p>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-[#1A6DFF] mb-1">4</div>
                <p className="text-gray-600">Major Irish ports served</p>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-[#1A6DFF] mb-1">2hrs</div>
                <p className="text-gray-600">Fastest ferry crossing</p>
              </div>
            </div>
          </div>
        </section>

        {/* ====== IMAGE & CONTEXT ====== */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <img src="/images/dublin-to-uk.jpg" alt="Irish Sea ferry departing Dublin Port for Holyhead Wales UK route" className="rounded-2xl shadow-lg w-full object-cover" loading="lazy" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Why is the Dublin–UK route so popular?</h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  The Irish Sea offers some of the fastest short-sea ferry crossings in Europe. Dublin Port&apos;s direct links to Holyhead, Liverpool, and Heysham mean Irish goods can reach UK warehouses faster than many continental European origins. This speed, combined with competitive rates, makes Ireland–UK freight highly attractive.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Carrgo manages daily collections from Dublin, Cork, Galway, and all Irish locations. We handle the ferry booking, UK customs clearance, and final delivery — so you don't need to coordinate multiple providers. Whether you are shipping pharmaceuticals, dairy, or machinery, we have a solution.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ====== TRANSIT TIMES TABLE ====== */}
        <section aria-labelledby="transit-heading" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="transit-heading" className="text-3xl font-bold text-center text-gray-900 mb-4">How long does shipping from Ireland to UK take?</h2>
            <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
              Ireland–UK transit times are among the shortest in Europe. The Dublin to Holyhead fast ferry takes just 2 hours, while Liverpool is 8 hours. Door-to-door road freight reaches most UK destinations in 1–2 days, and air freight is available for same-day needs.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-sm border">
                <thead>
                  <tr className="bg-gray-100">
                    <th scope="col" className="text-left px-6 py-4 font-semibold text-gray-700">Route</th>
                    <th scope="col" className="text-center px-6 py-4 font-semibold text-gray-700">Mode</th>
                    <th scope="col" className="text-center px-6 py-4 font-semibold text-gray-700">Transit Time</th>
                    <th scope="col" className="text-center px-6 py-4 font-semibold text-gray-700">Frequency</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Dublin to Holyhead', 'Sea (Fast Ferry)', '2 hours', 'Multiple daily'],
                    ['Dublin to Liverpool', 'Sea (Ferry)', '8 hours', '2x daily'],
                    ['Dublin to Heysham', 'Sea (RoRo)', '12–16 hours', 'Daily'],
                    ['Rosslare to Fishguard', 'Sea (Ferry)', '3.5 hours', '2x daily'],
                    ['Rosslare to Pembroke', 'Sea (Ferry)', '4 hours', 'Daily'],
                    ['Cork to UK (via road)', 'Road + Ferry', '2–3 days', 'Daily'],
                    ['Ireland to UK (air)', 'Air Freight', '1 day', 'Daily flights'],
                  ].map(([route, mode, time, freq], i) => (
                    <tr key={i} className="border-t">
                      <td className="px-6 py-4 font-medium text-gray-900">{route}</td>
                      <td className="px-6 py-4 text-center text-gray-600">{mode}</td>
                      <td className="px-6 py-4 text-center text-gray-600">{time}</td>
                      <td className="px-6 py-4 text-center text-gray-600">{freq}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ====== KEY PORTS ====== */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">What ports connect Ireland to the UK?</h2>
            <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
              Four major Irish ports connect to the UK. Dublin Port is the largest and busiest, with direct services to Holyhead, Liverpool, and Heysham. Rosslare serves Wales and France, while Cork and Shannon Foynes handle southern and western trade.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span role="img" aria-label="Ireland">🇮🇪</span> Republic of Ireland Ports
                </h3>
                <ul className="space-y-3">
                  {[
                    { name: 'Dublin Port', desc: 'Ireland\'s largest port — direct ferry services to Holyhead (2hrs), Liverpool (8hrs), and Heysham' },
                    { name: 'Cork Port', desc: 'Major southern port handling containers, bulk, and RoRo cargo with UK and European connections' },
                    { name: 'Rosslare Europort', desc: 'Key southeast gateway with routes to Fishguard, Pembroke, and continental Europe' },
                    { name: 'Shannon Foynes Port', desc: 'Ireland\'s largest bulk port on the west coast — handles project cargo and bulk commodities' },
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
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span role="img" aria-label="United Kingdom">🇬🇧</span> UK Destination Ports
                </h3>
                <ul className="space-y-3">
                  {[
                    { name: 'Holyhead', desc: 'Fastest Ireland connection — Dublin to Holyhead in 2 hours. Major Welsh port for Irish freight.' },
                    { name: 'Liverpool', desc: 'Primary Irish Sea hub — twice daily Dublin sailings and major onward distribution network' },
                    { name: 'Heysham', desc: 'Lancashire RoRo port with services from Dublin and Larne — gateway to northern England' },
                    { name: 'Fishguard', desc: 'Welsh port with Rosslare ferry connection — 3.5 hour crossing to southwest Wales' },
                    { name: 'Pembroke', desc: 'South Wales port with Rosslare services — good access to South Wales and the Midlands' },
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
          </div>
        </section>

        {/* ====== SHIPPING OPTIONS ====== */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">How do I ship from Ireland to the UK?</h2>
            <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
              Carrgo provides sea, road, and air freight from Dublin and all Irish ports to every UK destination. RoRo sea freight offers the fastest crossings, road freight provides door-to-door convenience, and air freight handles urgent cargo.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Ship, title: 'Sea Freight', price: '£350–£700/container', time: '2–16 hours ferry', best: 'Ferry routes from Dublin, Rosslare & Cork', desc: 'Roll-on/roll-off (RoRo) and container sea freight from Dublin Port and Rosslare to Holyhead, Liverpool, Fishguard, and Pembroke. With the Dublin–Holyhead crossing at just 2 hours, Irish Sea freight is among the fastest short-sea routes in Europe. Ideal for accompanied and unaccompanied trailers, containers, and bulk cargo.' },
                { icon: Truck, title: 'Road Freight', price: '£150–£400/pallet', time: '1–2 days', best: 'Door-to-door Ireland to UK', desc: 'Full truckload (FTL) and less-than-truckload (LTL) road freight from Dublin, Cork, Galway, Limerick, and all Irish locations to the UK. Includes Irish Sea ferry crossing, T1 transit documentation where required, UK customs clearance, and final delivery. Daily collections available nationwide.' },
                { icon: Plane, title: 'Air Freight', price: '£2–£4/kg', time: '1 day', best: 'Urgent cargo, perishables, high-value goods', desc: 'Air freight from Dublin Airport (DUB) and Cork Airport to Heathrow, Manchester, Birmingham, and all UK airports. Same-day and next-day options available. Ideal for urgent shipments, perishable goods, pharmaceuticals, and time-critical deliveries requiring the fastest possible transit.' },
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
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">What does shipping from Ireland to UK cost?</h2>
            <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
              Carrgo offers transparent, all-inclusive pricing for Ireland–UK freight. Rates vary by mode, volume, and route. The ranges below are typical market rates — contact us for a tailored quote covering ferry, fuel, customs clearance, and delivery.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Sea Freight (RoRo)', price: '£350–£700', unit: 'per container/trailer', note: 'Dublin–Liverpool/Holyhead' },
                { title: 'Road Freight', price: '£150–£400', unit: 'per pallet', note: 'Door-to-door Ireland to UK' },
                { title: 'Air Freight', price: '£2–£4', unit: 'per kg', note: 'Express from Dublin Airport' },
                { title: 'LCL Consolidation', price: '£50–£95', unit: 'per CBM', note: 'Shared loads to UK' },
              ].map((tier, i) => (
                <article key={i} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{tier.title}</h3>
                  <div className="text-2xl font-extrabold text-[#1A6DFF] mb-1">{tier.price}</div>
                  <p className="text-sm text-gray-500 mb-3">{tier.unit}</p>
                  <p className="text-sm text-gray-600">{tier.note}</p>
                </article>
              ))}
            </div>
            <p className="text-center text-gray-500 text-sm mt-8 max-w-2xl mx-auto">
              All quotes include ferry, fuel, Irish and UK customs clearance, and delivery. No hidden fees. Carrgo Freight Solutions Ltd.
            </p>
          </div>
        </section>

        {/* ====== POPULAR GOODS ====== */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">What goods are shipped from Ireland to UK?</h2>
            <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
              Ireland&apos;s exports to the UK include dairy, meat, seafood, whiskey, pharmaceuticals, chemicals, and machinery. We handle all these with expertise in temperature-controlled transport, GDP compliance for medicines, and the specific requirements of Irish food exports.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'Food & Beverage', desc: 'Irish dairy, meat, seafood, and beverages including whiskey and craft beer.' },
                { name: 'Pharmaceuticals', desc: 'Ireland is a global pharma hub — we handle temperature-controlled API and medicines shipments.' },
                { name: 'Agricultural Products', desc: 'Livestock feed, grains, fertilisers, and farm equipment between Irish and UK markets.' },
                { name: 'Chemicals & Plastics', desc: 'Speciality chemicals, medical gases, and plastic products from Irish manufacturers.' },
                { name: 'Machinery & Equipment', desc: 'Industrial machinery, agricultural equipment, and construction tools.' },
                { name: 'Electronics & Tech', desc: 'Medical devices, consumer electronics, and IT hardware from Irish tech sector.' },
                { name: 'Retail & Fashion', desc: 'Clothing, textiles, and consumer goods for UK retail and e-commerce channels.' },
                { name: 'Renewable Energy', desc: 'Wind and solar components supporting Ireland and UK green energy targets.' },
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

        {/* ====== DOCUMENTS & COMPLIANCE ====== */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">What documents and compliance are needed for Ireland to UK imports?</h2>
            <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
              Shipping from Ireland to the UK requires accurate documentation for smooth customs clearance and TCA tariff claims. Our team prepares and verifies all paperwork, including T1 transit documents for goods continuing to the EU, ensuring no delays at Holyhead or Liverpool.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Commercial Invoice', desc: 'A detailed invoice showing the seller, buyer, goods description, HS codes, quantities, values, and currency. Essential for UK customs valuation and must be provided for all Ireland–UK shipments post-Brexit.' },
                { title: 'Packing List', desc: 'Lists the contents of each package with weights, dimensions, and package count. Required for customs verification and warehouse receiving. Must match the commercial invoice exactly to avoid delays.' },
                { title: 'Bill of Lading / CMR / Airway Bill', desc: 'The transport contract and cargo receipt. Sea freight uses a Bill of Lading, road freight uses a CMR note, and air freight uses an Airway Bill. These are needed for cargo release at UK ports and airports.' },
                { title: 'UK EORI Number', desc: 'A UK Economic Operator Registration and Identification number is mandatory for all UK imports from Ireland. Without it, HMRC cannot process your customs entry. We can advise on the application process.' },
                { title: 'Irish EORI Number', desc: 'Irish exporters need an IE EORI number for all exports to the UK. We guide you through the Revenue application process. It is free and usually issued within a few working days of application.' },
                { title: 'T1 Transit Document', desc: 'Required when Irish goods move through the UK to the EU. The T1 transit document allows goods to travel under customs control without paying UK duties. We prepare and manage the entire T1 process.' },
              ].map((doc, i) => (
                <article key={i} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
                  <FileCheck className="w-8 h-8 text-[#1A6DFF] mb-3" aria-hidden="true" />
                  <h3 className="font-bold text-gray-900 mb-2">{doc.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{doc.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ====== CUSTOMS & COMMON TRAVEL AREA ====== */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">What are the Irish customs and Common Travel Area rules?</h2>
            <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
              Post-Brexit customs requirements for Ireland–UK trade include commercial invoices, packing lists, UK and Irish EORI numbers, and T1 transit documents for EU-bound goods. Our team handles all Irish and UK customs declarations, ENS entries, and compliance checks.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-[#1A6DFF]" aria-hidden="true" /> Key Customs Documents
                </h3>
                <ul className="space-y-2">
                  {[
                    'Commercial Invoice (goods description, value, and currency)',
                    'Packing List (weights, dimensions, HS commodity codes)',
                    'T1 Transit Document (for goods moving through UK to EU)',
                    'UK Import Declaration (CDS entry for all UK-bound goods)',
                    'ENS Safety & Security Declaration (pre-arrival notification)',
                    'UK EORI Number (required for all UK imports)',
                    'Irish EORI Number (for Irish exporters)',
                    'Certificate of Origin (for TCA preferential tariff claims)',
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
                  <Shield className="w-5 h-5 text-[#1A6DFF]" aria-hidden="true" /> Ireland–UK Trade & Customs
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
                    <span>Common Travel Area</span>
                    <span className="font-medium">Free movement of people; goods require declarations</span>
                  </li>
                  <li className="flex justify-between pb-2 border-b border-gray-100">
                    <span>T1 Transit</span>
                    <span className="font-medium">Required for ROI goods transiting UK to EU</span>
                  </li>
                  <li className="flex justify-between pb-2 border-b border-gray-100">
                    <span>Customs Clearance</span>
                    <span className="font-medium">Included in Carrgo service</span>
                  </li>
                  <li className="flex justify-between">
                    <span>EORI Registration</span>
                    <span className="font-medium">We assist with applications</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ====== WHY CHOOSE CARRGO ====== */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Why choose Carrgo for Ireland to UK shipping?</h2>
            <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
              Carrgo Freight Solutions Ltd, based in Bolton, has served UK and Irish shippers since 2026. Our team brings over two decades of combined experience, with particular expertise in Irish Sea routes, post-Brexit customs, and cross-border logistics.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Ship, title: 'Short Sea Specialists', desc: 'Expert knowledge of all Irish Sea routes including Dublin–Holyhead, Dublin–Liverpool, and Rosslare services.' },
                { icon: FileCheck, title: 'Irish Customs Experts', desc: 'Our team understands both Irish and UK customs requirements post-Brexit, handling T1 transits and CDS entries.' },
                { icon: Clock, title: '2-Hour Quotes', desc: 'Receive your all-inclusive Ireland–UK freight quote within 2 hours during business hours.' },
                { icon: TrendingUp, title: 'Live Ferry Tracking', desc: 'Track your cargo across the Irish Sea with real-time ferry schedules and arrival notifications.' },
                { icon: Users, title: 'Dedicated Account Manager', desc: 'Your personal contact understands the Ireland–UK trade lane and keeps your shipments on schedule.' },
                { icon: Shield, title: 'All-Inclusive Pricing', desc: 'One quote covers ferry, fuel, Irish and UK customs clearance, and delivery — no hidden fees.' },
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
            <h2 id="faq-heading" className="text-3xl font-bold text-center text-gray-900 mb-4">What do shippers ask about Ireland to UK freight?</h2>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
              Our team answers Ireland–UK shipping questions every day. Here are the most common ones — from the fastest routes and EORI requirements to T1 transit documents, pharmaceutical shipments, and what happens when documentation is missing.
            </p>
            <FaqAccordion />
          </div>
        </section>

        {/* ====== CTA ====== */}
        <section className="py-16 bg-brand-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">How do I get an Ireland to UK freight quote?</h2>
            <p className="text-brand-100 mb-8 text-lg">Dublin to UK shipping from just 2 hours by ferry. All-inclusive quotes with full Irish customs clearance within 2 hours.</p>
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
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">What other shipping routes does Carrgo offer?</h2>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
              Carrgo manages freight from over 20 countries to the UK. Explore our most popular routes below, or contact us for a custom quote from any origin. We also handle NI–ROI cross-border movements and complex Irish supply chains.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'China', flag: '🇨🇳', route: '/routes/china-to-uk' },
                { name: 'Germany', flag: '🇩🇪', route: '/routes/germany-to-uk' },
                { name: 'Netherlands', flag: '🇳🇱', route: '/routes/netherlands-to-uk' },
                { name: 'Northern Ireland', flag: '🇬🇧', route: '/routes/belfast-northern-ireland' },
                { name: 'India', flag: '🇮🇳', route: '/routes/india-to-uk' },
                { name: 'USA', flag: '🇺🇸', route: '/routes/usa-to-uk' },
                { name: 'Turkey', flag: '🇹🇷', route: '/routes/turkey-to-uk' },
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
