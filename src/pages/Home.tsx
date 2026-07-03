import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import {
  Ship, Plane, Truck, TrainFront, FileCheck, Package,
  Warehouse, Globe, ArrowRight, CheckCircle, ChevronDown,
  Clock, Shield, TrendingUp, Users
} from 'lucide-react';

/* ── JSON-LD Structured Data ── */
const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Carrgo Freight Solutions Ltd',
  url: 'https://carrgo.netlify.app',
  logo: 'https://carrgo.netlify.app/favicon.ico',
  description: 'Trusted UK freight forwarding company handling sea freight, air cargo, road haulage, rail freight, and customs clearance.',
  email: 'info@carrgo.co.uk',
  address: { '@type': 'PostalAddress', addressLocality: 'London', addressCountry: 'GB' },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'UK Freight Forwarding Services',
  provider: { '@type': 'Organization', name: 'Carrgo Freight Solutions Ltd' },
  areaServed: { '@type': 'Country', name: 'United Kingdom' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Freight Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Sea Freight (FCL & LCL)' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Air Freight' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Road Freight' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Rail Freight China to UK' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Customs Clearance' } },
    ],
  },
};

const faqData = [
  { q: 'How long does sea freight from China to UK take?', a: 'Sea freight from China to UK typically takes 25-35 days port-to-port, or 35-45 days door-to-door depending on the origin city and UK destination port.' },
  { q: 'What is the difference between FCL and LCL shipping?', a: 'FCL (Full Container Load) means you rent an entire container for your goods only. LCL (Less than Container Load) means your goods share a container with other shipments. FCL is typically more cost-effective for larger volumes.' },
  { q: 'Do you handle customs clearance?', a: 'Yes, our experienced customs brokers handle all UK import and export declarations with a high first-submission success rate, ensuring smooth clearance at all UK ports.' },
  { q: 'How quickly can I get a freight quote?', a: 'We provide all-inclusive freight quotes within 2 hours during UK business hours. Simply fill out our quote form or email us at info@carrgo.co.uk.' },
  { q: 'What are Incoterms and which should I use?', a: 'Incoterms define who is responsible for costs and risks at each stage of shipping. EXW, FOB, and DDP are the most common. Our team can advise on the best option for your shipment.' },
  { q: 'Can you ship to Amazon FBA warehouses?', a: 'Yes, we specialise in Amazon FBA freight including FBA prep, labelling, palletisation, and delivery to all UK fulfilment centres including BHX4, EMA1, and LBA1.' },
  { q: 'What is rail freight from China to UK?', a: 'Rail freight via the New Silk Road is a middle-ground option: faster than sea (14-20 days) and cheaper than air (approximately 40% savings). It runs from major Chinese cities to the UK.' },
  { q: 'Do you offer cargo insurance?', a: 'Yes, we offer comprehensive cargo insurance covering all risks including theft, damage, and loss during transit. We recommend insurance for all shipments.' },
  { q: 'What documents do I need for importing?', a: 'Required documents typically include: commercial invoice, packing list, bill of lading or airway bill, EORI number, and sometimes certificates of origin or import licences depending on the goods.' },
  { q: 'What are your payment terms?', a: 'We typically require payment before shipping for new clients. For established clients, we offer 30-day credit terms subject to credit checks.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqData.map(faq => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
};

const allSchemas = [orgSchema, serviceSchema, faqSchema];

/* ── Data ── */
const services = [
  { icon: Ship, title: 'Sea Freight', desc: 'FCL & LCL container shipping worldwide to UK ports', href: '/services/sea-freight' },
  { icon: Plane, title: 'Air Freight', desc: 'Express & economy air cargo with door-to-door delivery', href: '/services/air-freight' },
  { icon: Truck, title: 'Road Freight', desc: 'FTL & LTL European haulage to and from the UK', href: '/services/road-freight' },
  { icon: TrainFront, title: 'Rail Freight', desc: 'China to UK via New Silk Road — 14-20 days', href: '/services/rail-freight-china-uk' },
  { icon: FileCheck, title: 'Customs Clearance', desc: 'Expert customs brokers for smooth UK clearance', href: '/services/customs-clearance' },
  { icon: Package, title: 'Door-to-Door', desc: 'Complete factory-to-warehouse forwarding', href: '/services/door-to-door' },
  { icon: Globe, title: 'Amazon FBA', desc: 'FBA prep & delivery to UK fulfilment centres', href: '/services/amazon-fba-freight' },
  { icon: Warehouse, title: 'Warehousing', desc: 'Midlands storage with pick and pack services', href: '/services/warehousing' },
];

const routes = [
  { origin: 'China', sea: '25-35 days', air: '3-5 days', rail: '14-20 days' },
  { origin: 'Germany', road: '2-4 days', sea: '5-8 days', air: '1-2 days' },
  { origin: 'Netherlands', road: '1-3 days', sea: '3-5 days', air: '1 day' },
  { origin: 'India', sea: '20-28 days', air: '3-5 days' },
  { origin: 'USA', sea: '10-15 days', air: '1-3 days' },
  { origin: 'Turkey', sea: '14-20 days', road: '5-7 days' },
  { origin: 'UAE', sea: '18-24 days', air: '2-4 days' },
  { origin: 'Spain', road: '4-9 days', sea: '7-12 days' },
];

const industries = [
  { name: 'Furniture', desc: 'Flat-pack and assembled furniture shipping from manufacturers to retailers.' },
  { name: 'E-commerce', desc: 'B2C fulfilment and Amazon FBA logistics for online sellers.' },
  { name: 'Automotive', desc: 'Parts, accessories, and vehicle component logistics.' },
  { name: 'Construction', desc: 'Building materials, fixtures, and equipment forwarding.' },
  { name: 'Electronics', desc: 'Consumer electronics and tech product shipping.' },
  { name: 'Fashion & Textiles', desc: 'Garment and fabric imports from Asia and Europe.' },
];

/* ── FAQ Accordion ── */
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

/* ── Main Home Page ── */
export default function Home() {
  return (
    <>
      <Seo
        title="Carrgo Freight Solutions | UK Freight Forwarder | Sea, Air, Road, Rail"
        description="Carrgo is a trusted UK freight forwarding company handling sea freight, air cargo, road haulage, rail freight, and customs clearance. Get all-inclusive door-to-door shipping quotes in 2 hours."
        structuredData={allSchemas}
      />

      {/* ====== HERO ====== */}
      <section aria-labelledby="hero-heading" className="bg-gradient-to-br from-brand-900 to-brand-800 text-white py-16 lg:py-24">
        <div className="container-carrgo">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 id="hero-heading" className="text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
                UK Freight Forwarder You Can Trust
              </h1>
              <p className="text-xl text-brand-100 mb-8 leading-relaxed">
                Sea freight, air cargo, road haulage, rail freight, and customs clearance. All-inclusive door-to-door shipping quotes in 2 hours.
              </p>
              <ul className="space-y-2 mb-8 text-brand-100">
                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" aria-hidden="true" /><span>All-inclusive pricing — no hidden fees</span></li>
                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" aria-hidden="true" /><span>Dedicated account manager</span></li>
                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" aria-hidden="true" /><span>Real-time shipment tracking</span></li>
                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" aria-hidden="true" /><span>Expert customs clearance team</span></li>
              </ul>
              <div className="flex flex-wrap gap-4">
                <Link to="/get-a-quote" className="inline-flex items-center gap-2 bg-white text-brand-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors min-h-[44px]">
                  Get a Free Quote <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link to="/contact" className="inline-flex items-center gap-2 bg-brand-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-600 transition-colors min-h-[44px]">
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold mb-2">Get Your Quote</h2>
                <p className="text-brand-100 mb-6 text-sm">Fill in your details and we will respond within 2 hours.</p>
                <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                  <div>
                    <label htmlFor="hero-name" className="block text-sm font-medium mb-1">Full Name</label>
                    <input id="hero-name" type="text" required className="w-full px-4 py-2.5 rounded-lg text-gray-900 bg-white" aria-required="true" />
                  </div>
                  <div>
                    <label htmlFor="hero-email" className="block text-sm font-medium mb-1">Email</label>
                    <input id="hero-email" type="email" required className="w-full px-4 py-2.5 rounded-lg text-gray-900 bg-white" aria-required="true" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="hero-origin" className="block text-sm font-medium mb-1">Origin</label>
                      <input id="hero-origin" type="text" placeholder="e.g. Shanghai" className="w-full px-4 py-2.5 rounded-lg text-gray-900 bg-white" />
                    </div>
                    <div>
                      <label htmlFor="hero-mode" className="block text-sm font-medium mb-1">Mode</label>
                      <select id="hero-mode" className="w-full px-4 py-2.5 rounded-lg text-gray-900 bg-white">
                        <option value="">Select...</option>
                        <option value="sea">Sea</option>
                        <option value="air">Air</option>
                        <option value="road">Road</option>
                        <option value="rail">Rail</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-white text-brand-900 font-bold py-3 rounded-lg hover:bg-gray-100 transition-colors min-h-[44px]">
                    Get My Quote
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== ACCREDITATIONS ====== */}
      <section aria-label="Accreditations" className="bg-gray-50 py-6 border-b">
        <div className="container-carrgo">
          <p className="text-center text-sm text-gray-500 mb-3">Trusted by UK importers. Members of leading industry bodies.</p>
          <div className="flex flex-wrap justify-center items-center gap-6 text-gray-500 font-semibold text-sm">
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" aria-hidden="true" /> BIFA Member</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" aria-hidden="true" /> IATA Accredited</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" aria-hidden="true" /> AEO Certified</span>
          </div>
        </div>
      </section>

      {/* ====== STATS (static, not animated) ====== */}
      <section aria-label="Company statistics" className="py-16 bg-white">
        <div className="container-carrgo">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <article>
              <div className="text-4xl font-extrabold text-brand-800">500+</div>
              <p className="text-gray-600 mt-1">UK Importers Served</p>
            </article>
            <article>
              <div className="text-4xl font-extrabold text-brand-800">30+</div>
              <p className="text-gray-600 mt-1">Years Experience</p>
            </article>
            <article>
              <div className="text-4xl font-extrabold text-brand-800">99%+</div>
              <p className="text-gray-600 mt-1">Customs Clearance Success</p>
            </article>
            <article>
              <div className="text-4xl font-extrabold text-brand-800">2hr</div>
              <p className="text-gray-600 mt-1">Average Quote Response</p>
            </article>
          </div>
        </div>
      </section>

      {/* ====== SERVICES ====== */}
      <section id="services" aria-labelledby="services-heading" className="py-16 bg-gray-50">
        <div className="container-carrgo">
          <h2 id="services-heading" className="text-3xl font-bold text-center text-gray-900 mb-3">Our Services</h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">Complete freight forwarding solutions for UK importers, from factory floor to your warehouse door.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map(s => {
              const Icon = s.icon;
              return (
                <article key={s.title} className="bg-white rounded-xl p-6 border hover:shadow-lg transition-shadow">
                  <Icon className="w-10 h-10 text-brand-700 mb-3" aria-hidden="true" />
                  <h3 className="font-bold text-lg text-gray-900 mb-1">{s.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{s.desc}</p>
                  <Link to={s.href} className="text-brand-700 font-medium text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                    Learn more <ArrowRight className="w-3 h-3" aria-hidden="true" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====== WHY CHOOSE ====== */}
      <section aria-labelledby="why-heading" className="py-16 bg-white">
        <div className="container-carrgo">
          <h2 id="why-heading" className="text-3xl font-bold text-center text-gray-900 mb-10">Why UK Importers Choose Carrgo</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: Shield, title: 'All-Inclusive Pricing', desc: 'One quote covers everything. No hidden fuel surcharges, no terminal handling fees, no customs inspection surprises.' },
              { icon: FileCheck, title: 'Expert Customs Clearance', desc: 'Our experienced brokers handle all documentation with a high first-submission success rate, minimising delays at UK ports.' },
              { icon: Clock, title: 'Fast Quote Response', desc: 'Receive your all-inclusive freight quote within 2 hours during UK business hours.' },
              { icon: TrendingUp, title: 'Real-Time Tracking', desc: 'Track your shipment at every stage with our live updates and proactive notifications.' },
              { icon: Users, title: 'Dedicated Account Manager', desc: 'Every client gets a single point of contact who knows your business and your shipments.' },
              { icon: Globe, title: 'Global Network', desc: 'Established relationships with carriers and agents across 50+ trade routes worldwide.' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <article key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-brand-800" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{item.title}</h3>
                    <p className="text-gray-600 mt-1">{item.desc}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====== COMPARISON TABLE ====== */}
      <section aria-labelledby="compare-heading" className="py-16 bg-brand-50">
        <div className="container-carrgo">
          <h2 id="compare-heading" className="text-3xl font-bold text-center text-gray-900 mb-3">Carrgo vs Traditional Forwarders</h2>
          <p className="text-center text-gray-600 mb-8">See why UK importers are switching to Carrgo.</p>
          <div className="overflow-x-auto">
            <table className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-sm border">
              <thead>
                <tr className="bg-gray-100">
                  <th scope="col" className="text-left px-6 py-4 font-semibold text-gray-700">Feature</th>
                  <th scope="col" className="text-center px-6 py-4 font-semibold text-gray-500">Traditional Forwarder</th>
                  <th scope="col" className="text-center px-6 py-4 font-semibold text-brand-800">Carrgo</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Hidden Fees', 'Common', 'None — all-inclusive'],
                  ['Customs Broker', 'Separate provider', 'In-house experts'],
                  ['Tracking', 'Portal only', 'Real-time updates'],
                  ['Account Manager', 'Shared team', 'Dedicated'],
                  ['Quote Speed', '24-48 hours', '2 hours'],
                  ['Communication', 'Email only', 'Email, chat, updates'],
                ].map(([feat, trad, carr], i) => (
                  <tr key={i} className="border-t">
                    <td className="px-6 py-3 font-medium text-gray-900">{feat}</td>
                    <td className="px-6 py-3 text-center text-gray-500">{trad}</td>
                    <td className="px-6 py-3 text-center text-brand-800 font-medium">{carr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ====== HOW IT WORKS ====== */}
      <section aria-labelledby="how-heading" className="py-16 bg-white">
        <div className="container-carrgo">
          <h2 id="how-heading" className="text-3xl font-bold text-center text-gray-900 mb-10">How It Works</h2>
          <ol className="grid md:grid-cols-5 gap-6">
            {[
              { step: '1', title: 'Request a Quote', desc: 'Fill in our form with your shipment details' },
              { step: '2', title: 'Receive Your Price', desc: 'All-inclusive quote within 2 hours' },
              { step: '3', title: 'We Collect', desc: 'Goods picked up from your supplier' },
              { step: '4', title: 'We Handle Everything', desc: 'Transport, customs, documentation' },
              { step: '5', title: 'Delivered', desc: 'Goods arrive at your UK warehouse' },
            ].map(item => (
              <li key={item.step} className="text-center">
                <div className="w-12 h-12 bg-brand-800 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                  {item.step}
                </div>
                <h3 className="font-bold text-gray-900">{item.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ====== TRADE ROUTES ====== */}
      <section id="routes" aria-labelledby="routes-heading" className="py-16 bg-gray-50">
        <div className="container-carrgo">
          <h2 id="routes-heading" className="text-3xl font-bold text-center text-gray-900 mb-3">Popular Trade Routes</h2>
          <p className="text-center text-gray-600 mb-8">Estimated shipping durations to the UK</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {routes.map(r => (
              <article key={r.origin} className="bg-white rounded-lg p-5 border hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg mb-3">{r.origin} to UK</h3>
                <dl className="space-y-1 text-sm">
                  {r.sea && <div className="flex justify-between"><dt className="text-gray-500">Sea:</dt><dd className="font-medium">{r.sea}</dd></div>}
                  {r.air && <div className="flex justify-between"><dt className="text-gray-500">Air:</dt><dd className="font-medium">{r.air}</dd></div>}
                  {r.rail && <div className="flex justify-between"><dt className="text-gray-500">Rail:</dt><dd className="font-medium">{r.rail}</dd></div>}
                  {r.road && <div className="flex justify-between"><dt className="text-gray-500">Road:</dt><dd className="font-medium">{r.road}</dd></div>}
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ====== INDUSTRIES ====== */}
      <section id="industries" aria-labelledby="industries-heading" className="py-16 bg-white">
        <div className="container-carrgo">
          <h2 id="industries-heading" className="text-3xl font-bold text-center text-gray-900 mb-8">Industries We Serve</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map(ind => (
              <article key={ind.name} className="border rounded-xl p-6 hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg text-gray-900">{ind.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{ind.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ====== REQUEST A QUOTE ====== */}
      <section aria-labelledby="quote-heading" className="py-16 bg-brand-900 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="quote-heading" className="text-3xl font-bold text-center mb-3">Get Your Free Quote</h2>
          <p className="text-center text-brand-100 mb-8">All-inclusive freight quote within 2 hours. No obligation.</p>
          <form className="space-y-4" onSubmit={e => e.preventDefault()}>
            <fieldset className="grid md:grid-cols-2 gap-4">
              <legend className="sr-only">Contact Information</legend>
              <div>
                <label htmlFor="qt-name" className="block text-sm font-medium mb-1">Full Name</label>
                <input id="qt-name" type="text" required className="w-full px-4 py-2.5 rounded-lg text-gray-900" aria-required="true" />
              </div>
              <div>
                <label htmlFor="qt-email" className="block text-sm font-medium mb-1">Email</label>
                <input id="qt-email" type="email" required className="w-full px-4 py-2.5 rounded-lg text-gray-900" aria-required="true" />
              </div>
            </fieldset>
            <div>
              <label htmlFor="qt-company" className="block text-sm font-medium mb-1">Company Name</label>
              <input id="qt-company" type="text" className="w-full px-4 py-2.5 rounded-lg text-gray-900" />
            </div>
            <fieldset>
              <legend className="block text-sm font-medium mb-2">Shipment Details</legend>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="qt-origin" className="block text-sm font-medium mb-1">Origin Country/City</label>
                  <input id="qt-origin" type="text" required className="w-full px-4 py-2.5 rounded-lg text-gray-900" aria-required="true" />
                </div>
                <div>
                  <label htmlFor="qt-dest" className="block text-sm font-medium mb-1">UK Destination</label>
                  <input id="qt-dest" type="text" required className="w-full px-4 py-2.5 rounded-lg text-gray-900" aria-required="true" />
                </div>
              </div>
            </fieldset>
            <div>
              <label htmlFor="qt-mode" className="block text-sm font-medium mb-1">Transport Mode</label>
              <select id="qt-mode" className="w-full px-4 py-2.5 rounded-lg text-gray-900">
                <option value="">Select mode...</option>
                <option value="sea">Sea Freight</option>
                <option value="air">Air Freight</option>
                <option value="road">Road Freight</option>
                <option value="rail">Rail Freight</option>
                <option value="not-sure">Not Sure — Advise Me</option>
              </select>
            </div>
            <div>
              <label htmlFor="qt-details" className="block text-sm font-medium mb-1">Additional Details</label>
              <textarea id="qt-details" rows={3} className="w-full px-4 py-2.5 rounded-lg text-gray-900" aria-describedby="qt-help" />
              <p id="qt-help" className="text-xs text-brand-200 mt-1">Include cargo type, weight, dimensions, and Incoterm if known.</p>
            </div>
            <button type="submit" className="w-full bg-white text-brand-900 font-bold py-3 rounded-lg hover:bg-gray-100 transition-colors min-h-[44px]">
              Get My Free Quote
            </button>
          </form>
        </div>
      </section>

      {/* ====== FAQ ====== */}
      <section aria-labelledby="faq-heading" className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="faq-heading" className="text-3xl font-bold text-center text-gray-900 mb-8">Frequently Asked Questions</h2>
          <FaqAccordion />
        </div>
      </section>

      {/* ====== CTA BANNER ====== */}
      <section aria-label="Get started" className="py-16 bg-brand-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Ship?</h2>
          <p className="text-brand-100 mb-8 text-lg">Get your all-inclusive freight quote in 2 hours. No hidden fees, no obligation.</p>
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
    </>
  );
}
