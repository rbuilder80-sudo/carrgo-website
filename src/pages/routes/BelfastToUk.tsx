import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import {
  Ship, Truck, Clock, MapPin, ArrowRight,
  CheckCircle, ChevronDown, FileCheck, Shield, TrendingUp,
  Users, Globe, Anchor, Package, AlertCircle
} from 'lucide-react';

const faqData = [
  { q: 'How long does freight from Belfast to GB mainland take?', a: 'Sea freight from Belfast to Liverpool or Heysham takes 8–12 hours, with several daily sailings. Road freight from Belfast to GB mainland via the Irish Sea typically takes 1–2 days door-to-door, depending on the final destination. Same-day road services are available between Belfast and Dublin for onward European connections.' },
  { q: 'What is the Northern Ireland Protocol and how does it affect shipping?', a: 'The Northern Ireland Protocol, now refined by the Windsor Framework, creates a special customs status for Northern Ireland. Goods moving from GB to NI may require customs declarations, while goods from NI to GB generally move freely. Our team handles all NI Protocol documentation including T2 transit documents, safety and security declarations, and supplementary declarations.' },
  { q: 'What ports serve Northern Ireland freight?', a: 'Northern Ireland has three major ports: Belfast Harbour (the largest, handling containers, RoRo, and bulk cargo), Larne (major ferry hub for Cairnryan and Heysham routes), and Londonderry/Foyle Port (northwest gateway for regional trade). Each offers different sailing routes and transit options to GB and beyond.' },
  { q: 'How much does shipping from Belfast to UK mainland cost?', a: 'Road freight from Belfast to GB mainland typically costs £200–£500 per pallet depending on volume and urgency. Sea freight rates range from £400–£800 per container for Belfast–Liverpool routes. Full truckload (FTL) services offer the best value for larger shipments. Contact us for an all-inclusive quote.' },
  { q: 'Do I need T2 transit documents for Northern Ireland shipping?', a: 'T2 transit documents are required for goods moving from Great Britain to Northern Ireland that are considered "at risk" of entering the EU single market. Goods remaining in the UK customs territory do not require T2 transit. Our customs team assesses each shipment and prepares all necessary transit documentation including T2 forms, TAD (Transit Accompanying Documents), and NCTS declarations.' },
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

export default function BelfastToUk() {
  return (
    <>
      <Seo
        title="Belfast Freight Forwarding | Northern Ireland's Gateway | Carrgo"
        description="Belfast freight forwarding services for Northern Ireland trade. Sea, road & customs clearance. Belfast Harbour, Larne & Foyle Port. NI Protocol & Windsor Framework specialists."
        keywords="belfast freight forwarder, northern ireland customs clearance, freight belfast to uk, northern ireland shipping, belfast port freight, ni protocol freight, irish sea trade, windsor framework, t2 transit documents"
      />

      <main id="main-content">
        {/* ====== HERO ====== */}
        <section aria-labelledby="hero-heading" className="bg-gradient-to-br from-brand-900 to-brand-800 text-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block text-xs font-semibold tracking-wider uppercase text-brand-200 mb-3">NORTHERN IRELAND SHIPPING</span>
                <h1 id="hero-heading" className="text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
                  Belfast Freight Forwarding — Northern Ireland's Gateway
                </h1>
                <p className="text-lg text-brand-100 mb-8 leading-relaxed">
                  Freight forwarding services for Northern Ireland via Belfast Harbour, Larne, and Foyle Port. Sea freight to GB mainland in 8–12 hours, road freight 1–2 days. Full Northern Ireland Protocol and Windsor Framework customs clearance.
                </p>
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center border border-white/20">
                    <Ship className="w-6 h-6 mx-auto mb-1 text-brand-200" aria-hidden="true" />
                    <div className="text-2xl font-extrabold">8-12</div>
                    <div className="text-xs text-brand-200">Hrs Sea to GB</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center border border-white/20">
                    <Truck className="w-6 h-6 mx-auto mb-1 text-brand-200" aria-hidden="true" />
                    <div className="text-2xl font-extrabold">1-2</div>
                    <div className="text-xs text-brand-200">Days Road</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center border border-white/20">
                    <FileCheck className="w-6 h-6 mx-auto mb-1 text-brand-200" aria-hidden="true" />
                    <div className="text-2xl font-extrabold">NI</div>
                    <div className="text-xs text-brand-200">Protocol Ready</div>
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
                    <span role="img" aria-label="Northern Ireland">🇬🇧</span>
                    <ArrowRight className="w-8 h-8 text-brand-200" aria-hidden="true" />
                    <span role="img" aria-label="United Kingdom">🇬🇧</span>
                  </div>
                  <p className="text-brand-200 text-sm">Northern Ireland to GB Mainland</p>
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <div className="text-3xl font-extrabold">1–2 Days</div>
                    <p className="text-brand-200 text-xs">By road or sea freight</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====== ROUTE OVERVIEW ====== */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Northern Ireland — A Unique Trade Position</h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Northern Ireland occupies a unique position in UK and EU trade. Under the Windsor Framework, NI remains part of the UK customs territory while maintaining access to the EU single market for goods. This creates both opportunities and complexities that require expert freight forwarding knowledge.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-extrabold text-[#1A6DFF] mb-1">3</div>
                <p className="text-gray-600">Major NI ports served</p>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-[#1A6DFF] mb-1">Daily</div>
                <p className="text-gray-600">Sailings to GB mainland</p>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-[#1A6DFF] mb-1">Dual</div>
                <p className="text-gray-600">UK & EU market access</p>
              </div>
            </div>
          </div>
        </section>

        {/* ====== TRANSIT TIMES TABLE ====== */}
        <section aria-labelledby="transit-heading" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="transit-heading" className="text-3xl font-bold text-center text-gray-900 mb-4">Transit Times from Northern Ireland</h2>
            <p className="text-center text-gray-600 mb-8">Estimated transit times by route and transport mode</p>
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
                    ['Belfast to Liverpool', 'Sea (RoRo)', '8–12 hours', '2–3x daily'],
                    ['Belfast to Heysham', 'Sea (RoRo)', '10–14 hours', '2x daily'],
                    ['Larne to Cairnryan', 'Sea (Ferry)', '2 hours', 'Multiple daily'],
                    ['Larne to Heysham', 'Sea (RoRo)', '10–14 hours', 'Daily'],
                    ['Belfast to Dublin', 'Road', '2–3 hours', 'Daily'],
                    ['Belfast to GB Mainland', 'Road', '1–2 days', 'Daily'],
                    ['Derry/Foyle to GB', 'Sea/Road', '1–2 days', 'Daily'],
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
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Northern Ireland Ports & Connections</h2>
            <p className="text-center text-gray-600 mb-10">The key ports and routes serving Northern Ireland freight</p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span role="img" aria-label="Northern Ireland">🇬🇧</span> Northern Ireland Ports
                </h3>
                <ul className="space-y-3">
                  {[
                    { name: 'Belfast Harbour', desc: 'Northern Ireland\'s largest port — container, RoRo, and bulk cargo. Direct sailings to Liverpool and Heysham' },
                    { name: 'Larne', desc: 'Major ferry port with the shortest crossing to Scotland (Cairnryan, 2 hours) and sailings to Heysham' },
                    { name: 'Londonderry (Foyle Port)', desc: 'Northwest gateway serving Donegal and the northwest with RoRo and bulk cargo facilities' },
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
                  <span role="img" aria-label="United Kingdom">🇬🇧</span> GB Mainland Connections
                </h3>
                <ul className="space-y-3">
                  {[
                    { name: 'Liverpool', desc: 'Primary Irish Sea route from Belfast — 8–12 hours, multiple daily sailings' },
                    { name: 'Heysham', desc: 'Key Lancashire port with RoRo services from both Belfast and Larne' },
                    { name: 'Cairnryan (Scotland)', desc: 'Shortest NI–Scotland crossing from Larne — just 2 hours' },
                    { name: 'Dublin', desc: 'All-Ireland road corridor — Belfast to Dublin in 2–3 hours via M1/A1' },
                    { name: 'Troon', desc: 'Seasonal ferry service from Larne — alternative Scotland route' },
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
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Freight Services for Northern Ireland</h2>
            <p className="text-center text-gray-600 mb-10">Sea, road, and customs services tailored for NI trade</p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Ship, title: 'Sea Freight', price: '£400–£800/container', time: '8–14 hours', best: 'Regular sailings to Liverpool & Heysham', desc: 'Roll-on/roll-off (RoRo) and container sea freight from Belfast Harbour and Larne to Liverpool, Heysham, and Cairnryan. Multiple daily sailings with reliable schedules make sea freight a fast and cost-effective option for NI–GB trade. Full trailer and container options available.' },
                { icon: Truck, title: 'Road Freight', price: '£200–£500/pallet', time: '1–2 days', best: 'Door-to-door NI to mainland UK', desc: 'Full truckload (FTL) and less-than-truckload (LTL) road freight from Belfast and all Northern Ireland locations to GB mainland. Includes Irish Sea ferry crossing, customs transit documentation, and final mile delivery. Daily collections and deliveries available.' },
                { icon: FileCheck, title: 'NI Customs Clearance', price: 'Custom quote', time: 'Same day', best: 'NI Protocol & Windsor Framework experts', desc: 'Expert customs clearance for Northern Ireland\'s unique trading position. We handle T2 transit documents, safety and security declarations, supplementary declarations, and all Windsor Framework requirements. Whether shipping GB–NI or NI–EU, we ensure full compliance.' },
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

        {/* ====== NI PROTOCOL SECTION ====== */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Northern Ireland Protocol & Windsor Framework</h2>
            <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
              Navigating the complexities of the Northern Ireland Protocol requires specialist knowledge. Our customs team are experts in the Windsor Framework and can guide you through every requirement.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'T2 Transit Documents', desc: 'Required for goods moving from GB to NI that are "at risk" of entering the EU. We prepare T2 declarations and Transit Accompanying Documents (TAD).' },
                { name: 'Safety & Security Declarations', desc: 'ENS (Entry Summary) declarations for goods arriving in NI from GB. We submit these in advance to ensure smooth border processing.' },
                { name: 'Supplementary Declarations', desc: 'Post-movement declarations required within specific timeframes. Our team manages deadlines and ensures compliance.' },
                { name: 'Windsor Framework', desc: 'The revised protocol creates a green lane for NI-remaining goods and a red lane for EU-bound goods. We help classify your shipments correctly.' },
                { name: 'UKIMS Registration', desc: 'UK Internal Market Scheme registration allows businesses to move "not at risk" goods from GB to NI without duties. We assist with applications.' },
                { name: 'EU EORI Requirements', desc: 'NI traders may need an XI EORI number for EU trade. We guide you through EORI registration and requirements.' },
                { name: 'Rules of Origin', desc: 'Understanding origin rules is essential for NI trade. We help determine origin status and prepare supporting documentation.' },
                { name: 'Irish Sea Border', desc: 'Expert guidance on Irish Sea border processes, including what checks apply and how to minimise delays at ports.' },
              ].map((item, i) => (
                <article key={i} className="bg-gray-50 rounded-lg p-5 border border-gray-100 hover:shadow-md transition-shadow">
                  <AlertCircle className="w-8 h-8 text-[#1A6DFF] mb-2" aria-hidden="true" />
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
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Customs Clearance for Northern Ireland</h2>
            <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
              Our experienced customs brokers specialise in Northern Ireland's unique customs arrangements. We handle all NI Protocol documentation to ensure smooth movement across the Irish Sea.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-[#1A6DFF]" aria-hidden="true" /> Required Documents
                </h3>
                <ul className="space-y-2">
                  {[
                    'Commercial Invoice (with full goods description and value)',
                    'Packing List (weights, dimensions, and HS commodity codes)',
                    'T2 Transit Document (for "at risk" GB–NI goods)',
                    'Safety & Security Declaration (ENS for NI arrivals)',
                    'UK EORI Number (GB or XI prefix as applicable)',
                    'UKIMS Authorisation (for "not at risk" goods)',
                    'Proof of Origin (for TCA tariff preference claims)',
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
                  <Shield className="w-5 h-5 text-[#1A6DFF]" aria-hidden="true" /> Windsor Framework Benefits
                </h3>
                <ul className="space-y-3 text-gray-600 text-sm">
                  <li className="flex justify-between pb-2 border-b border-gray-100">
                    <span>Green Lane (NI Internal)</span>
                    <span className="font-medium">Minimal checks, no customs duties</span>
                  </li>
                  <li className="flex justify-between pb-2 border-b border-gray-100">
                    <span>Red Lane (EU-bound goods)</span>
                    <span className="font-medium">Full EU customs procedures apply</span>
                  </li>
                  <li className="flex justify-between pb-2 border-b border-gray-100">
                    <span>UKIMS Registration</span>
                    <span className="font-medium">We assist with your application</span>
                  </li>
                  <li className="flex justify-between pb-2 border-b border-gray-100">
                    <span>Duty Reimbursement Scheme</span>
                    <span className="font-medium">Available for eligible goods</span>
                  </li>
                  <li className="flex justify-between pb-2 border-b border-gray-100">
                    <span>Northern Ireland Retail Movement Scheme</span>
                    <span className="font-medium">Simplified for retail goods</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Customs Clearance</span>
                    <span className="font-medium">Included in Carrgo service</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ====== POPULAR GOODS ====== */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Popular Goods Shipped from Northern Ireland</h2>
            <p className="text-center text-gray-600 mb-10">Commodities we regularly handle on NI trade routes</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'Agricultural Products', desc: 'Dairy, meat, and produce moving between NI, GB, and ROI markets.' },
                { name: 'Pharmaceuticals', desc: 'Northern Ireland has a significant pharma sector requiring temperature-controlled freight.' },
                { name: 'Manufactured Goods', desc: 'Engineering products, textiles, and consumer goods from NI manufacturers.' },
                { name: 'Construction Materials', desc: 'Building supplies, timber, and structural materials for NI and GB projects.' },
                { name: 'Food & Beverage', desc: 'Whisky, craft beverages, speciality foods, and FMCG products.' },
                { name: 'Renewable Energy', desc: 'Wind turbine components and solar equipment for green energy projects.' },
                { name: 'Retail & E-commerce', desc: 'Store supplies, Amazon FBA shipments, and e-commerce fulfilment.' },
                { name: 'Automotive Parts', desc: 'Components and accessories for the automotive aftermarket.' },
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

        {/* ====== WHY CHOOSE CARRGO ====== */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Why Choose Carrgo for Northern Ireland Freight</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Globe, title: 'NI Protocol Experts', desc: 'Deep expertise in the Windsor Framework, green/red lane procedures, and all NI customs requirements.' },
                { icon: FileCheck, title: 'T2 Transit Specialists', desc: 'We prepare and manage T2 transit documents, TADs, and NCTS declarations for seamless GB–NI movements.' },
                { icon: Ship, title: 'All NI Ports Covered', desc: 'Services from Belfast Harbour, Larne, and Foyle Port with connections to all GB destinations.' },
                { icon: TrendingUp, title: 'Live Tracking', desc: 'Track your shipment across the Irish Sea with real-time updates and proactive notifications.' },
                { icon: Users, title: 'Dedicated NI Support', desc: 'A dedicated account manager who understands Northern Ireland trade and keeps your goods moving.' },
                { icon: Shield, title: 'All-Inclusive Pricing', desc: 'One quote covers ferry crossing, customs documentation, transit docs, and delivery — no surprises.' },
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
            <h2 className="text-3xl font-bold mb-4">Get Your Northern Ireland Freight Quote</h2>
            <p className="text-brand-100 mb-8 text-lg">Belfast freight forwarding with full NI Protocol compliance. Sea, road, and customs — all-inclusive quote within 2 hours.</p>
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
                { name: 'Ireland (Dublin)', flag: '🇮🇪', route: '/routes/dublin-ireland' },
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
