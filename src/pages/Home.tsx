import { useState } from 'react';
import { submitToFormspree, trackLead } from '../lib/formConfig';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import {
  Ship, Plane, Truck, TrainFront, FileCheck, Package,
  Warehouse, Globe, ArrowRight, CheckCircle, ChevronDown,
  Clock, Shield, TrendingUp, Users
} from 'lucide-react';

const faqData = [
  { q: 'How long does sea freight from China to UK take?', a: 'Sea freight from China to UK typically takes 25-35 days port-to-port, or 35-45 days door-to-door depending on the origin city and UK destination port.' },
  { q: 'What is the difference between FCL and LCL shipping?', a: 'FCL (Full Container Load) means you rent an entire container for your goods only. LCL (Less than Container Load) means your goods share a container with other shipments. FCL is typically more cost-effective for larger volumes.' },
  { q: 'Do you handle customs clearance?', a: 'Carrgo can coordinate UK import and export declarations, document checks and port release as part of a freight movement. Requirements depend on the goods, route and importer or exporter responsibilities.' },
  { q: 'How quickly can I get a freight quote?', a: 'We provide all-inclusive freight quotes within 2 hours during UK business hours. Simply fill out our quote form or email us at support@carrgo.co.uk.' },
  { q: 'What are Incoterms and which should I use?', a: 'Incoterms define who is responsible for costs and risks at each stage of shipping. EXW, FOB, and DDP are the most common. Our team can advise on the best option for your shipment.' },
  { q: 'Can you ship to Amazon FBA warehouses?', a: 'Yes, we specialise in Amazon FBA freight including FBA prep, labelling, palletisation, and delivery to all UK fulfilment centres including BHX4, EMA1, and LBA1.' },
  { q: 'What is rail freight from China to UK?', a: 'Rail freight via the New Silk Road is a middle-ground option: faster than sea (14-20 days) and cheaper than air (approximately 40% savings). It runs from major Chinese cities to the UK.' },
  { q: 'Do you offer cargo insurance?', a: 'Yes, we offer comprehensive cargo insurance covering all risks including theft, damage, and loss during transit. We recommend insurance for all shipments.' },
  { q: 'What documents do I need for importing?', a: 'Required documents typically include: commercial invoice, packing list, bill of lading or airway bill, EORI number, and sometimes certificates of origin or import licences depending on the goods.' },
  { q: 'What are your payment terms?', a: 'We typically require payment before shipping for new clients. For established clients, we offer 30-day credit terms subject to credit checks.' },
];

/* ── Data ── */
const services = [
  { icon: Ship, title: 'Sea Freight', desc: 'FCL & LCL container shipping worldwide to UK ports', href: '/services/sea-freight' },
  { icon: Plane, title: 'Door-to-Door Air Freight', desc: 'Express & economy air cargo with customs and final delivery', href: '/services/air-freight' },
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
  { origin: 'Ireland', sea: '8-14 hrs', road: '1-2 days', air: '1 day' },
  { origin: 'Northern Ireland', sea: '8-14 hrs', road: '1-2 days' },
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
  const [heroSubmitted, setHeroSubmitted] = useState(false);
  const [heroLoading, setHeroLoading] = useState(false);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [quoteError, setQuoteError] = useState<string | null>(null);

  const handleHeroSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHeroLoading(true);
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const fields: Record<string, string> = {};
    formData.forEach((value, key) => {
      fields[key] = String(value);
    });
    fields.source_page = '/';
    const result = await submitToFormspree('Quote Request', fields);
    if (result.success) {
      setHeroSubmitted(true);
      trackLead('homepage_hero_quote_form', result.deliveryMethod);
    }
    setHeroLoading(false);
  };

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteLoading(true);
    setQuoteError(null);
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const fields: Record<string, string> = {};
    formData.forEach((value, key) => {
      fields[key] = String(value);
    });
    fields.source_page = '/';
    const result = await submitToFormspree('Quote Request', fields);
    if (result.success) {
      setQuoteSubmitted(true);
      trackLead('homepage_quote_form', result.deliveryMethod);
    } else {
      setQuoteError(result.error || 'Something went wrong. Please try again.');
    }
    setQuoteLoading(false);
  };

  return (
    <main role="main" itemScope itemType="https://schema.org/WebPage" data-page="home">
      <meta itemProp="name" content="Freight Forwarder UK &amp; Ireland | Sea, Air, Road &amp; Rail Shipping | Carrgo" />
      <meta itemProp="description" content="Carrgo coordinates UK and Ireland sea freight, air cargo, road haulage, rail freight and customs support." />
      <Seo
        title="Cargo Services UK | Shipping & Freight Quotes | Carrgo"
        description="UK cargo services for importers: sea freight, door-to-door air freight, road, rail, customs clearance and final delivery. Get a quote in 2 hours."
        keywords="cargo services uk, freight forwarder uk, freight forwarding company uk, shipping and cargo services, cargo transportation, cargo logistics, cargo freight forwarding, cargo forwarder, shipping company uk, logistics company, freight company, freight forwarding services, sea freight services uk, air freight quotes, customs clearance agents uk, container shipping uk, shipping from china to uk, freight quote uk, freight forwarder northern ireland, belfast port freight, dublin port customs clearance, amazon fba freight uk, door to door freight"
        ogUrl="https://www.carrgo.co.uk/"
        canonical="https://www.carrgo.co.uk/"
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": ["Organization", "LocalBusiness"],
            "name": "Carrgo Freight Solutions",
            "legalName": "Carrgo Freight Solutions Ltd",
            "url": "https://www.carrgo.co.uk",
            "logo": "https://www.carrgo.co.uk/logo.png",
            "description": "UK & Ireland freight forwarder specialising in sea freight, air freight, customs clearance, and door-to-door logistics.",
            "email": "support@carrgo.co.uk",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "GB",
              "addressRegion": "England"
            },
            "areaServed": ["GB", "IE", "Northern Ireland"],
            "serviceType": ["Freight Forwarding", "Sea Freight", "Air Freight", "Road Freight", "Rail Freight", "Customs Clearance", "Door-to-Door Logistics", "Amazon FBA Shipping", "UK Warehousing"],
            // memberOf removed pending verification
            "sameAs": ["https://www.linkedin.com/company/carrgo", "https://www.reddit.com/user/CarrgoFreight", "https://www.quora.com/profile/Carrgo-Freight", "https://medium.com/@carrgo-freight", "https://www.carrgo.co.uk"]
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {"@type": "Question", "name": "How much does sea freight from China to the UK cost?", "acceptedAnswer": {"@type": "Answer", "text": "Sea-freight pricing depends on origin, destination, cargo volume, container type, current carrier availability and the collection, customs and delivery scope. Carrgo requests those details before preparing a shipment-specific quote."}},
              {"@type": "Question", "name": "How long does sea freight from China to the UK take?", "acceptedAnswer": {"@type": "Answer", "text": "Sea freight from Shanghai or Shenzhen to Felixstowe takes 25-35 days. China-UK rail via the New Silk Road takes 14-20 days. Air freight takes 3-5 days door-to-door."}},
              {"@type": "Question", "name": "Does Carrgo handle UK and Ireland customs clearance?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. Carrgo handles UK and Ireland import customs declarations, duty calculations and port release at all major UK and Irish ports including Belfast and Dublin."}},
              {"@type": "Question", "name": "What is the difference between FCL and LCL shipping?", "acceptedAnswer": {"@type": "Answer", "text": "FCL (Full Container Load) means your cargo uses a full 20ft or 40ft container. LCL (Less than Container Load) means your cargo shares container space with other shipments. LCL is better for smaller consignments under 15 CBM."}},
              {"@type": "Question", "name": "Can Carrgo ship to Amazon FBA warehouses in the UK?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. Carrgo supports FBA-compliant shipping, customs clearance, carton prep and final-mile delivery to Amazon fulfilment centres across the UK."}},
              {"@type": "Question", "name": "How do I get a freight quote from Carrgo?", "acceptedAnswer": {"@type": "Answer", "text": "Submit your origin, destination, cargo type, dimensions, weight and ready date through our online quote form or email support@carrgo.co.uk for a fast all-inclusive freight quote."}},
              {"@type": "Question", "name": "Does Carrgo ship to Northern Ireland and Ireland?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. Carrgo provides full freight forwarding services to Northern Ireland via Belfast, Larne and Londonderry ports, and to Ireland via Dublin, Cork, Rosslare and Shannon Foynes ports."}},
              {"@type": "Question", "name": "Do I need an EORI number to import into the UK?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. You need a UK EORI number starting with GB to import goods into Great Britain, and an XI EORI number for Northern Ireland. Carrgo can guide you through the registration process."}}
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Carrgo Freight Solutions",
            "url": "https://www.carrgo.co.uk",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://www.carrgo.co.uk/?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }
        ]}
      />

      {/* ====== HERO ====== */}
      <section aria-labelledby="hero-heading" data-section="hero" itemScope itemType="https://schema.org/Organization" className="hero-reserved bg-gradient-to-br from-brand-900 to-brand-800 text-white py-16 lg:py-24">
        <div className="container-carrgo">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 id="hero-heading" itemProp="name" className="text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
                UK Freight Forwarder for Cargo Services and Fast Quotes
              </h1>
              {/* Direct answer block for AI search readiness */}
              <div className="bg-white/10 backdrop-blur rounded-lg p-4 mb-6 border border-white/20" itemScope itemType="https://schema.org/Answer">
                <p className="text-lg text-white leading-relaxed" itemProp="text">
                  <strong className="text-green-300">Carrgo provides UK cargo services and freight coordination</strong>, covering sea freight (FCL/LCL), door-to-door air freight, road haulage, rail freight, customs support and final delivery. Quote scope is matched to the shipment details supplied.
                </p>
              </div>
              <p className="text-xl text-brand-100 mb-8 leading-relaxed">
                <span itemProp="description">Cargo services for sea freight, air cargo, road haulage, rail freight, and customs clearance.</span> Get an all-inclusive door-to-door shipping quote in 2 hours.
              </p>

            </div>
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold mb-2">Get Your Quote</h2>
                <p className="text-brand-100 mb-6 text-sm">Fill in your details and we will respond within 2 hours.</p>
                {heroSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Quote Request Sent!</h3>
                    <p className="text-brand-100 text-sm">We will respond within 2 hours.</p>
                  </div>
                ) : (
                  <form className="space-y-4" onSubmit={handleHeroSubmit}>
                    <div>
                      <label htmlFor="hero-name" className="block text-sm font-medium mb-1">Full Name</label>
                      <input id="hero-name" name="name" type="text" required className="w-full px-4 py-2.5 rounded-lg text-gray-900 bg-white" aria-required="true" />
                    </div>
                    <div>
                      <label htmlFor="hero-email" className="block text-sm font-medium mb-1">Email</label>
                      <input id="hero-email" name="email" type="email" required className="w-full px-4 py-2.5 rounded-lg text-gray-900 bg-white" aria-required="true" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="hero-origin" className="block text-sm font-medium mb-1">Origin</label>
                        <input id="hero-origin" name="origin" type="text" placeholder="e.g. Shanghai" className="w-full px-4 py-2.5 rounded-lg text-gray-900 bg-white" />
                      </div>
                      <div>
                        <label htmlFor="hero-mode" className="block text-sm font-medium mb-1">Mode</label>
                        <select id="hero-mode" name="mode" className="w-full px-4 py-2.5 rounded-lg text-gray-900 bg-white">
                          <option value="">Select...</option>
                          <option value="sea">Sea</option>
                          <option value="air">Air</option>
                          <option value="road">Road</option>
                          <option value="rail">Rail</option>
                        </select>
                      </div>
                    </div>
                    <button type="submit" disabled={heroLoading} className="w-full bg-white text-brand-900 font-bold py-3 rounded-lg hover:bg-gray-100 transition-colors min-h-[44px] disabled:opacity-60 disabled:cursor-not-allowed">
                      {heroLoading ? (
                        <span className="inline-flex items-center justify-center gap-2">
                          <svg className="animate-spin h-5 w-5 text-brand-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        'Get My Quote'
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== SEARCH DEMAND ROUTES ====== */}
      <section aria-labelledby="search-demand-heading" data-section="search-demand" className="py-12 bg-brand-50 border-b">
        <div className="container-carrgo">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <span className="text-brand-700 font-semibold text-sm uppercase tracking-wider">Popular Freight Searches</span>
            <h2 id="search-demand-heading" className="text-2xl lg:text-3xl font-bold text-gray-900 mt-3">
              Find the cargo service you searched for
            </h2>
            <p className="text-gray-600 mt-3">
              Compare UK cargo services, door-to-door air freight, sea freight quotes and customs-backed shipping routes before you request a price.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Cargo Services UK', desc: 'Sea, air, road, rail and customs in one managed freight service.', href: '/services' },
              { title: 'Door-to-Door Air Freight', desc: 'Urgent cargo with collection, airport handling, customs and delivery.', href: '/services/air-freight' },
              { title: 'Door-to-Door Sea Freight Quote', desc: 'FCL and LCL shipping with UK customs clearance and final delivery.', href: '/services/sea-freight' },
              { title: 'Cargo Shipping Company', desc: 'International cargo forwarding for UK importers and exporters.', href: '/cargo-shipping-company' },
            ].map(item => (
              <Link key={item.title} to={item.href} className="block bg-white rounded-lg border border-brand-100 p-5 hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{item.desc}</p>
                <span className="text-brand-700 font-medium text-sm inline-flex items-center gap-1 mt-4">
                  View option <ArrowRight className="w-3 h-3" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ====== WHO WE HELP (buyer personas) ====== */}
      <section aria-labelledby="who-we-help-heading" data-section="who-we-help" className="py-12 bg-white border-b">
        <div className="container-carrgo">
          <h2 id="who-we-help-heading" className="text-2xl font-bold text-center text-gray-900 mb-3">Who does Carrgo help?</h2>
          <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">We provide freight forwarding and customs clearance for UK businesses importing and exporting goods worldwide.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'UK Importers', href: '/services/sea-freight', desc: 'Sea, air, road & rail freight' },
              { label: 'UK Exporters', href: '/services/sea-freight', desc: 'Global shipping solutions' },
              { label: 'Procurement Managers', href: '/services/door-to-door', desc: 'End-to-end supply chain' },
              { label: 'Logistics Managers', href: '/services/logistics', desc: 'Multi-modal coordination' },
              { label: 'Manufacturers', href: '/industries/manufacturing', desc: 'Raw materials & finished goods' },
              { label: 'E-commerce Businesses', href: '/industries/ecommerce', desc: 'B2C fulfilment & FBA' },
              { label: 'Amazon FBA Sellers', href: '/services/amazon-fba-freight', desc: 'FBA prep & UK delivery' },
              { label: 'Wholesalers & Retailers', href: '/industries/retail', desc: 'Bulk imports & distribution' },
            ].map(p => (
              <Link key={p.label} to={p.href} className="block bg-gray-50 rounded-lg p-4 border hover:shadow-md transition-shadow hover:bg-brand-50">
                <h3 className="font-semibold text-gray-900">{p.label}</h3>
                <p className="text-sm text-gray-600 mt-1">{p.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ====== VERIFIED SERVICE SCOPE ====== */}
      <section aria-labelledby="service-scope-heading" data-section="service-scope" className="border-b bg-gray-50 py-10">
        <div className="container-carrgo">
          <h2 id="service-scope-heading" className="mb-6 text-center text-2xl font-bold text-gray-900">Freight support matched to the shipment</h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              ['Freight modes', 'Sea, air, road and rail options'],
              ['Coverage', 'Great Britain, Northern Ireland and Ireland'],
              ['Customs support', 'Document and clearance coordination'],
              ['Quote inputs', 'Route, goods, weight or volume and ready date'],
            ].map(([title, text]) => (
              <article key={title} className="rounded-lg border border-gray-200 bg-white p-5">
                <h3 className="font-bold text-gray-900">{title}</h3>
                <p className="mt-1 text-sm text-gray-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ====== IRELAND & NORTHERN IRELAND ====== */}
      <section aria-labelledby="ireland-heading" data-section="ireland-coverage" itemScope itemType="https://schema.org/Place" itemProp="areaServed" className="py-16 bg-gradient-to-br from-emerald-900 to-emerald-800 text-white">
        <div className="container-carrgo">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-semibold tracking-wider uppercase text-emerald-200 mb-3">All-Ireland Coverage</span>
              <h2 id="ireland-heading" className="text-3xl lg:text-4xl font-extrabold leading-tight mb-4">
                Do you ship freight to Ireland and Northern Ireland?
              </h2>
              <p className="text-lg text-emerald-100 mb-6 leading-relaxed">
                Yes. Carrgo provides full freight forwarding services to both Northern Ireland and the Republic of Ireland. Whether you are shipping to Belfast, Dublin, or any port on the island, we handle customs clearance, transit documentation, and final-mile delivery.
              </p>
              <ul className="space-y-3 mb-8 text-emerald-100">
                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" aria-hidden="true" /><span>Northern Ireland: Belfast, Larne, Londonderry ports</span></li>
                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" aria-hidden="true" /><span>Republic of Ireland: Dublin, Cork, Rosslare, Shannon Foynes</span></li>
                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" aria-hidden="true" /><span>Full customs clearance — GB-NI &amp; GB-IE movements</span></li>
                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" aria-hidden="true" /><span>Sea, road, and air freight options available</span></li>
              </ul>
              <div className="flex flex-wrap gap-4">
                <Link to="/get-a-quote" className="inline-flex items-center gap-2 bg-white text-emerald-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors min-h-[44px]">
                  Get a Quote <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link to="/contact" className="inline-flex items-center gap-2 bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-600 transition-colors min-h-[44px]">
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="hidden lg:flex items-center justify-center">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20 text-center">
                <Globe className="w-16 h-16 text-emerald-200 mx-auto mb-4" aria-hidden="true" />
                <h3 className="text-2xl font-bold mb-2">All-Ireland Service</h3>
                <p className="text-emerald-200 text-sm mb-4">UK, Northern Ireland &amp; Republic of Ireland</p>
                <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-white/20">
                  <div>
                    <div className="text-2xl font-extrabold">NI</div>
                    <p className="text-xs text-emerald-200">Belfast, Larne</p>
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold">IE</div>
                    <p className="text-xs text-emerald-200">Dublin, Cork</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== SERVICES ====== */}
      <section id="services" aria-labelledby="services-heading" data-section="services" itemScope itemType="https://schema.org/ItemList" className="py-16 bg-gray-50">
        <div className="container-carrgo">
          <h2 id="services-heading" className="text-3xl font-bold text-center text-gray-900 mb-3">What freight forwarding services does Carrgo offer?</h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">Carrgo coordinates sea freight, air cargo, road haulage, rail freight, customs support and door-to-door delivery. The available scope and shipment updates depend on the selected carrier and route.</p>
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
          <div className="mt-10 text-center">
            <p className="text-gray-600 mb-4">Need help choosing the right service? Compare our <Link to="/tools/port-comparison" className="text-brand-700 font-medium hover:underline">port comparison tool</Link> or read our <Link to="/resources/shipping-guides" className="text-brand-700 font-medium hover:underline">shipping guides</Link>.</p>
            <Link to="/get-a-quote" className="inline-flex items-center gap-2 bg-brand-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-700 transition-colors min-h-[44px]">
              Get a Free Quote <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ====== WHY CHOOSE ====== */}
      <section aria-labelledby="why-heading" data-section="why-choose" className="py-16 bg-white">
        <div className="container-carrgo">
          <h2 id="why-heading" className="text-3xl font-bold text-center text-gray-900 mb-10">What can Carrgo include in a freight movement?</h2>
          <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">The quotation is built around the actual route and cargo details, with the included collection, freight, customs and delivery scope stated clearly.</p>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: Shield, title: 'Itemised Scope', desc: 'The quote states which collection, freight, customs and delivery elements are included.' },
              { icon: FileCheck, title: 'Customs Coordination', desc: 'Document requirements and declaration responsibilities are checked for the specific shipment.' },
              { icon: Clock, title: 'Fast Quote Response', desc: 'Receive your all-inclusive freight quote within 2 hours during UK business hours.' },
              { icon: TrendingUp, title: 'Shipment Updates', desc: 'Milestone updates and available carrier information are shared during the movement.' },
              { icon: Users, title: 'Clear Contact', desc: 'A Carrgo contact coordinates the enquiry and confirms what information is still needed.' },
              { icon: Globe, title: 'Route Checks', desc: 'Carrier or agent availability and cut-offs are checked for the requested trade lane.' },
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

      {/* ====== QUOTE SCOPE TABLE ====== */}
      <section aria-labelledby="compare-heading" data-section="comparison" className="py-16 bg-brand-50">
        <div className="container-carrgo">
          <h2 id="compare-heading" className="text-3xl font-bold text-center text-gray-900 mb-3">What should a freight quote confirm?</h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">A useful quote separates confirmed scope from costs or requirements that depend on the carrier, terminal, customs authority or final shipment details.</p>
          <div className="overflow-x-auto">
            <table className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-sm border">
              <thead>
                <tr className="bg-gray-100">
                  <th scope="col" className="text-left px-6 py-4 font-semibold text-gray-700">Quote item</th>
                  <th scope="col" className="text-center px-6 py-4 font-semibold text-gray-500">What to provide</th>
                  <th scope="col" className="text-center px-6 py-4 font-semibold text-brand-800">What Carrgo checks</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Route', 'Origin and destination', 'Available freight mode and routing'],
                  ['Cargo', 'Goods, weight or volume, dimensions', 'Handling and equipment requirements'],
                  ['Timing', 'Ready date and deadline', 'Current cut-offs and availability'],
                  ['Customs', 'Importer/exporter details and documents', 'Declaration scope and missing information'],
                  ['Delivery', 'Final address and access needs', 'Collection and final-mile scope'],
                  ['Validity', 'Any expected shipment changes', 'Rate validity and stated exclusions'],
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
      <section aria-labelledby="how-heading" data-section="how-it-works" itemScope itemType="https://schema.org/HowTo" className="py-16 bg-white">
        <div className="container-carrgo">
          <h2 id="how-heading" className="text-3xl font-bold text-center text-gray-900 mb-10">How does Carrgo's freight forwarding process work?</h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">Getting your goods from factory to warehouse takes 5 simple steps with Carrgo: request a quote, receive your all-inclusive price within 2 hours, we collect from your supplier, handle all transport and customs, then deliver to your UK warehouse.</p>
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
      <section id="routes" aria-labelledby="routes-heading" data-section="trade-routes" itemScope itemType="https://schema.org/ItemList" className="py-16 bg-gray-50">
        <div className="container-carrgo">
          <h2 id="routes-heading" className="text-3xl font-bold text-center text-gray-900 mb-3">What are the most popular shipping routes to the UK?</h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">Carrgo manages freight from 10 major origins to the UK. Sea freight from China takes 25-35 days, air freight 3-5 days, and rail 14-20 days. European routes via road are fastest at 1-3 days from Germany or the Netherlands.</p>
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
                <div className="mt-3 pt-3 border-t">
                  <Link to={`/routes/${r.origin.toLowerCase().replace(/\s+/g, '-')}-to-uk`} className="text-brand-700 text-sm font-medium inline-flex items-center gap-1 hover:underline">
                    Route details <ArrowRight className="w-3 h-3" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-gray-600">Not sure which route is best for your shipment? Use our <Link to="/tools/cost-calculator" className="text-brand-700 font-medium hover:underline">cost calculator</Link> or <Link to="/get-a-quote" className="text-brand-700 font-medium hover:underline">request a quote</Link> and we will recommend the optimal mode.</p>
          </div>
        </div>
      </section>

      {/* ====== INDUSTRIES ====== */}
      <section id="industries" aria-labelledby="industries-heading" data-section="industries" className="py-16 bg-white">
        <div className="container-carrgo">
          <h2 id="industries-heading" className="text-3xl font-bold text-center text-gray-900 mb-8">Which industries does Carrgo provide freight services for?</h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">Carrgo supports UK importers across 6 key sectors including furniture, e-commerce, automotive, construction, electronics, and fashion textiles — with specialised handling for each industry's unique shipping requirements.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map(ind => (
              <article key={ind.name} className="border rounded-xl p-6 hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg text-gray-900">{ind.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{ind.desc}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">See how Carrgo handles <Link to="/industries/ecommerce" className="text-brand-700 font-medium hover:underline">e-commerce logistics</Link>, <Link to="/industries/automotive" className="text-brand-700 font-medium hover:underline">automotive parts shipping</Link>, and <Link to="/industries/construction" className="text-brand-700 font-medium hover:underline">construction materials</Link>.</p>
            <Link to="/resources/industries" className="inline-flex items-center gap-2 text-brand-700 font-medium hover:underline">
              View all industries <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ====== REQUEST A QUOTE ====== */}
      <section aria-labelledby="quote-heading" data-section="quote-form" className="py-16 bg-brand-900 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="quote-heading" className="text-3xl font-bold text-center mb-3">How do I get a free freight quote from Carrgo?</h2>
          <p className="text-center text-brand-100 mb-8 max-w-2xl mx-auto">Simply fill in our online form with your shipment details — origin, destination, cargo type, and weight. Carrgo responds with an all-inclusive freight quote within 2 hours during UK business hours, with no obligation.</p>
          {quoteSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Quote Request Sent!</h3>
              <p className="text-brand-100">We will respond within 2 hours with your all-inclusive quote.</p>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleQuoteSubmit}>
              <fieldset className="grid md:grid-cols-2 gap-4">
                <legend className="sr-only">Contact Information</legend>
                <div>
                  <label htmlFor="qt-name" className="block text-sm font-medium mb-1">Full Name</label>
                  <input id="qt-name" name="name" type="text" required className="w-full px-4 py-2.5 rounded-lg text-gray-900" aria-required="true" />
                </div>
                <div>
                  <label htmlFor="qt-email" className="block text-sm font-medium mb-1">Email</label>
                  <input id="qt-email" name="email" type="email" required className="w-full px-4 py-2.5 rounded-lg text-gray-900" aria-required="true" />
                </div>
              </fieldset>
              <div>
                <label htmlFor="qt-company" className="block text-sm font-medium mb-1">Company Name</label>
                <input id="qt-company" name="company" type="text" className="w-full px-4 py-2.5 rounded-lg text-gray-900" />
              </div>
              <fieldset>
                <legend className="block text-sm font-medium mb-2">Shipment Details</legend>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="qt-origin" className="block text-sm font-medium mb-1">Origin Country/City</label>
                    <input id="qt-origin" name="origin" type="text" required className="w-full px-4 py-2.5 rounded-lg text-gray-900" aria-required="true" />
                  </div>
                  <div>
                    <label htmlFor="qt-dest" className="block text-sm font-medium mb-1">UK Destination</label>
                    <input id="qt-dest" name="dest" type="text" required className="w-full px-4 py-2.5 rounded-lg text-gray-900" aria-required="true" />
                  </div>
                </div>
              </fieldset>
              <div>
                <label htmlFor="qt-mode" className="block text-sm font-medium mb-1">Transport Mode</label>
                <select id="qt-mode" name="mode" className="w-full px-4 py-2.5 rounded-lg text-gray-900">
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
                <textarea id="qt-details" name="details" rows={3} className="w-full px-4 py-2.5 rounded-lg text-gray-900" aria-describedby="qt-help" />
                <p id="qt-help" className="text-xs text-brand-200 mt-1">Include cargo type, weight, dimensions, and Incoterm if known.</p>
              </div>
              {quoteError && (
                <div className="bg-red-500/20 border border-red-400/30 text-white rounded-lg p-3 text-sm">
                  {quoteError}
                </div>
              )}
              <button type="submit" disabled={quoteLoading} className="w-full bg-white text-brand-900 font-bold py-3 rounded-lg hover:bg-gray-100 transition-colors min-h-[44px] disabled:opacity-60 disabled:cursor-not-allowed">
                {quoteLoading ? (
                  <span className="inline-flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-brand-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Get My Free Quote'
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ====== FAQ ====== */}
      <section aria-labelledby="faq-heading" data-section="faq" itemScope itemType="https://schema.org/FAQPage" className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="faq-heading" className="text-3xl font-bold text-center text-gray-900 mb-8">What do UK importers ask about freight forwarding?</h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">Here are the most common questions we receive about shipping to the UK, including customs clearance, transit times, documentation, and freight costs. Each answer is written by Carrgo's experienced logistics team.</p>
          <FaqAccordion />
        </div>
      </section>

      {/* ====== CTA BANNER ====== */}
      <section aria-label="Get started" data-section="cta-banner" className="py-16 bg-brand-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to ship your goods to the UK with Carrgo?</h2>
          <p className="text-brand-100 mb-8 text-lg max-w-2xl mx-auto">Get your all-inclusive freight quote in 2 hours. No hidden fees, no obligation. Our logistics team is ready to handle your shipment from factory to warehouse.</p>
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

      {/* ====== LAST UPDATED ====== */}
      <section className="py-6 bg-gray-100 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600">
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
                <strong>Page verified and updated:</strong> <time dateTime="2026-07-15">15 July 2026</time>
              </span>
            </p>
            <p className="text-sm text-gray-500">
              Rates, transit times and customs information are reviewed weekly. <Link to="/resources/freight-faqs" className="text-brand-700 hover:underline">View all FAQs</Link> · <Link to="/resources/shipping-guides" className="text-brand-700 hover:underline">Shipping guides</Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
