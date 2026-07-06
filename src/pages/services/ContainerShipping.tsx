import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../../components/Seo';
import {
  Ship, ArrowRight, CheckCircle, ChevronRight, ChevronDown,
  Clock, Shield, Package, Anchor, Globe, TrendingUp
} from 'lucide-react';

/* ── JSON-LD Structured Data ── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Container Shipping UK — FCL & LCL Sea Freight',
  provider: {
    '@type': 'Organization',
    name: 'Carrgo Freight Solutions Ltd',
    url: 'https://carrgo.co.uk',
  },
  areaServed: { '@type': 'Country', name: 'United Kingdom' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Container Shipping Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '20ft FCL Container Shipping' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '40ft FCL Container Shipping' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: '40ft High Cube Container Shipping' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'LCL Less than Container Load' } },
    ],
  },
};

/* ── FAQ Data ── */
const faqData = [
  {
    q: 'What is the difference between FCL and LCL container shipping?',
    a: 'FCL (Full Container Load) means you rent an entire container exclusively for your cargo. It is the most cost-effective option for shipments over 15 cubic metres. LCL (Less than Container Load) means your goods share container space with other shipments. LCL is ideal for smaller volumes between 1–15 CBM, as you only pay for the space you use.',
  },
  {
    q: 'How much does a 20ft container from China to the UK cost?',
    a: 'A 20ft FCL container from Shanghai or Ningbo to Felixstowe typically costs £1,200–£2,800 depending on the carrier, fuel surcharges, and season. This includes ocean freight, UK port handling, and customs clearance. Contact us for an all-inclusive quote tailored to your shipment.',
  },
  {
    q: 'How long does sea freight from China to the UK take?',
    a: 'Sea freight from China to the UK takes approximately 24–35 days port-to-port, depending on the origin port and UK destination. Shanghai to Felixstowe averages 25–28 days, while Shenzhen to Southampton takes 28–32 days. FCL shipments are generally faster than LCL as they do not require consolidation.',
  },
  {
    q: 'What size container do I need for my shipment?',
    a: 'A 20ft container holds approximately 33 CBM and is suitable for the contents of a 3-bedroom house. A 40ft container holds approximately 67 CBM — ideal for larger commercial shipments. A 40ft High Cube adds an extra foot of height (2.69m internal) for bulky, lightweight cargo. For shipments under 15 CBM, LCL is usually more economical.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqData.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
};

/* ── Container Types Data ── */
const containerTypes = [
  {
    type: '20ft FCL',
    intDimensions: '5.90m x 2.35m x 2.39m',
    extDimensions: '6.06m x 2.44m x 2.59m',
    capacity: '33 CBM / 21,770 kg',
    bestFor: 'Small to medium shipments, machinery, palletised goods, 3-bedroom house contents',
  },
  {
    type: '40ft FCL',
    intDimensions: '12.03m x 2.35m x 2.39m',
    extDimensions: '12.19m x 2.44m x 2.59m',
    capacity: '67 CBM / 26,730 kg',
    bestFor: 'Large commercial shipments, full inventory restocking, bulky manufactured goods',
  },
  {
    type: '40ft HC',
    intDimensions: '12.03m x 2.35m x 2.69m',
    extDimensions: '12.19m x 2.44m x 2.89m',
    capacity: '76 CBM / 26,230 kg',
    bestFor: 'Bulky lightweight cargo, furniture, textiles, goods that need extra height clearance',
  },
  {
    type: 'LCL',
    intDimensions: 'Shared container space',
    extDimensions: 'Per cubic metre / per tonne',
    capacity: '1–15 CBM ideal range',
    bestFor: 'Small shipments, sample orders, e-commerce stock, businesses testing new suppliers',
  },
];

/* ── FCL vs LCL Comparison ── */
const comparisonRows = [
  ['Best For', 'Shipments over 15 CBM', 'Shipments under 15 CBM'],
  ['Container Sizes', '20ft, 40ft, 40ft HC', 'Shared container space'],
  ['Pricing', 'Flat rate per container', 'Per CBM / per tonne'],
  ['Transit Time', 'Direct routing, faster', 'Adds 3–7 days for consolidation'],
  ['Security', 'Seal intact, minimal handling', 'More handling, professionally palletised'],
  ['Flexibility', 'Fixed sailing schedules', 'More frequent departures'],
  ['Cost per CBM', 'Lower for large volumes', 'Higher per unit, no wasted space'],
];

/* ── How It Works Steps ── */
const howSteps = [
  {
    step: '1',
    title: 'Get Your Quote',
    description: 'Tell us your cargo details, origin, destination and timeline. We will send an all-inclusive FCL or LCL quote within 2 hours.',
    icon: Globe,
  },
  {
    step: '2',
    title: 'Book & Prepare',
    description: 'Accept your quote and we book container space with a trusted carrier. We handle all documentation including bills of lading and export paperwork.',
    icon: Package,
  },
  {
    step: '3',
    title: 'Collection & Loading',
    description: 'We arrange collection from your supplier or you deliver to our warehouse. FCL containers can be loaded at your premises or ours.',
    icon: Anchor,
  },
  {
    step: '4',
    title: 'Ocean Transit',
    description: 'Your container ships on a scheduled service with full marine insurance. We track your cargo and provide regular status updates.',
    icon: Ship,
  },
  {
    step: '5',
    title: 'Clearance & Delivery',
    description: 'We clear UK customs and arrange final delivery to your warehouse, business address, or Amazon FBA centre. Proof of delivery provided.',
    icon: Shield,
  },
];

/* ── Popular Routes ── */
const popularRoutes = [
  { country: 'China', flag: '🇨🇳', seaTime: '25–35 days', fclPrice: '£1,200–£2,800', ports: 'Shanghai, Shenzhen, Ningbo, Qingdao' },
  { country: 'India', flag: '🇮🇳', seaTime: '18–28 days', fclPrice: '£1,500–£3,200', ports: 'Mumbai, Chennai, Mundra, Kolkata' },
  { country: 'USA', flag: '🇺🇸', seaTime: '10–18 days', fclPrice: '£1,800–£3,500', ports: 'New York, Savannah, Los Angeles, Miami' },
  { country: 'Germany', flag: '🇩🇪', seaTime: '3–7 days', fclPrice: '£800–£1,500', ports: 'Hamburg, Bremerhaven, Rotterdam (transship)' },
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
            aria-controls={`faq-ans-${i}`}
          >
            <span>{faq.q}</span>
            <ChevronDown
              className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ${openIdx === i ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
          </button>
          {openIdx === i && (
            <div id={`faq-ans-${i}`} className="px-4 pb-4 text-gray-600 leading-relaxed">
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function ContainerShipping() {
  return (
    <>
      <Seo
        title="Container Shipping UK | FCL, LCL & Sea Freight Containers | Carrgo"
        description="UK container shipping — 20ft, 40ft, FCL & LCL. Get container shipping quotes in 2 hours. Full load and part load sea freight to 150+ countries."
        keywords="container shipping uk, fcl shipping, lcl shipping, container shipping quote, sea freight containers, 20ft container, 40ft container, container freight uk, full container load, less than container load"
        ogUrl="https://carrgo.co.uk/services/container-shipping"
        canonical="https://carrgo.co.uk/services/container-shipping"
        structuredData={[serviceSchema, faqSchema]}
      />

      <main id="main-content">
        {/* ====== HERO ====== */}
        <section aria-labelledby="hero-heading" className="bg-gradient-to-br from-[#0f4db5] to-[#1A6DFF] text-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block text-xs font-semibold tracking-wider uppercase text-blue-200 mb-3">Container Shipping</span>
                <h1 id="hero-heading" className="text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
                  Container Shipping UK — FCL & LCL Sea Freight
                </h1>
                <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                  Container shipping is the backbone of international trade. Carrgo offers comprehensive FCL (Full Container Load) and LCL (Less than Container Load) sea freight services from 150+ countries to the UK. Whether you need a 20ft container from China, a 40ft HC from India, or LCL groupage from Europe, we provide competitive rates with customs clearance included.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    '20ft, 40ft and 40ft High Cube containers available',
                    'FCL direct routing and LCL consolidation services',
                    'Door-to-door delivery including customs clearance',
                    'Marine insurance and cargo tracking included',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-blue-100">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/get-a-quote"
                    className="inline-flex items-center gap-2 bg-white text-[#1A6DFF] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors min-h-[44px]"
                  >
                    Get Container Quote <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                  <Link
                    to="/services/sea-freight"
                    className="inline-flex items-center gap-2 bg-[#1A6DFF] text-white border border-white/30 px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors min-h-[44px]"
                  >
                    Sea Freight Overview
                  </Link>
                </div>
              </div>
              <div className="hidden lg:grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center border border-white/20">
                  <Ship className="w-8 h-8 mx-auto mb-2 text-blue-200" aria-hidden="true" />
                  <div className="text-3xl font-extrabold">20ft</div>
                  <div className="text-xs text-blue-200">Standard Container</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center border border-white/20">
                  <Ship className="w-8 h-8 mx-auto mb-2 text-blue-200" aria-hidden="true" />
                  <div className="text-3xl font-extrabold">40ft</div>
                  <div className="text-xs text-blue-200">Large Container</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center border border-white/20">
                  <TrendingUp className="w-8 h-8 mx-auto mb-2 text-blue-200" aria-hidden="true" />
                  <div className="text-3xl font-extrabold">40ft HC</div>
                  <div className="text-xs text-blue-200">High Cube</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center border border-white/20">
                  <Package className="w-8 h-8 mx-auto mb-2 text-blue-200" aria-hidden="true" />
                  <div className="text-3xl font-extrabold">LCL</div>
                  <div className="text-xs text-blue-200">Part Load</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====== CONTAINER TYPES TABLE ====== */}
        <section aria-labelledby="types-heading" className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Container Options</span>
              <h2 id="types-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3 mb-4">
                Container Types & Specifications
              </h2>
              <p className="text-[#4B5563] max-w-2xl mx-auto">
                Choose the right container for your cargo. From standard 20ft units to High Cube options, we provide the full range of ISO container shipping solutions.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-sm border border-[#E5E7EB] overflow-hidden">
                <thead>
                  <tr className="bg-[#1A6DFF] text-white">
                    <th scope="col" className="text-left px-6 py-4 font-semibold">Container Type</th>
                    <th scope="col" className="text-left px-6 py-4 font-semibold">Internal Dimensions</th>
                    <th scope="col" className="text-left px-6 py-4 font-semibold">External Dimensions</th>
                    <th scope="col" className="text-left px-6 py-4 font-semibold">Capacity</th>
                    <th scope="col" className="text-left px-6 py-4 font-semibold">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  {containerTypes.map((ct, i) => (
                    <tr key={i} className={`border-t border-[#E5E7EB] ${i % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}`}>
                      <td className="px-6 py-4 font-semibold text-[#111827]">{ct.type}</td>
                      <td className="px-6 py-4 text-[#4B5563]">{ct.intDimensions}</td>
                      <td className="px-6 py-4 text-[#4B5563]">{ct.extDimensions}</td>
                      <td className="px-6 py-4 text-[#4B5563] font-medium">{ct.capacity}</td>
                      <td className="px-6 py-4 text-[#4B5563]">{ct.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ====== FCL vs LCL COMPARISON ====== */}
        <section aria-labelledby="compare-heading" className="py-16 md:py-24 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Compare Options</span>
              <h2 id="compare-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3 mb-4">
                FCL vs LCL — Which is Right for You?
              </h2>
              <p className="text-[#4B5563] max-w-2xl mx-auto">
                Understanding the differences between full container load and less than container load shipping helps you choose the most cost-effective option for your cargo.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow-sm border border-[#E5E7EB] overflow-hidden">
                <thead>
                  <tr className="bg-[#1A6DFF] text-white">
                    <th scope="col" className="text-left px-6 py-4 font-semibold">Feature</th>
                    <th scope="col" className="text-center px-6 py-4 font-semibold">FCL (Full Container Load)</th>
                    <th scope="col" className="text-center px-6 py-4 font-semibold">LCL (Less than Container Load)</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map(([feat, fcl, lcl], i) => (
                    <tr key={i} className={`border-t border-[#E5E7EB] ${i % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}`}>
                      <td className="px-6 py-4 font-medium text-[#111827]">{feat}</td>
                      <td className="px-6 py-4 text-center text-[#4B5563]">{fcl}</td>
                      <td className="px-6 py-4 text-center text-[#4B5563]">{lcl}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ====== HOW CONTAINER SHIPPING WORKS ====== */}
        <section aria-labelledby="process-heading" className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">The Process</span>
              <h2 id="process-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3 mb-4">
                How Container Shipping Works
              </h2>
              <p className="text-[#4B5563] max-w-2xl mx-auto">
                Our streamlined five-step process takes your cargo from supplier collection to final delivery, with full visibility at every stage.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              {howSteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={i} className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-6 text-center">
                    <div className="w-12 h-12 bg-[#EFF6FF] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-[#1A6DFF]" aria-hidden="true" />
                    </div>
                    <div className="text-2xl font-extrabold text-[#EFF6FF] mb-2">{step.step}</div>
                    <h3 className="text-lg font-bold text-[#111827] mb-2">{step.title}</h3>
                    <p className="text-[#4B5563] text-sm leading-relaxed">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ====== POPULAR ROUTES ====== */}
        <section aria-labelledby="routes-heading" className="py-16 md:py-24 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">Popular Routes</span>
              <h2 id="routes-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3 mb-4">
                Container Shipping Routes to the UK
              </h2>
              <p className="text-[#4B5563] max-w-2xl mx-auto">
                We operate regular container shipping services on the world&apos;s busiest trade lanes. Here are our most popular routes with indicative transit times and pricing.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularRoutes.map((route, i) => (
                <div key={i} className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-6">
                  <div className="text-4xl mb-3">{route.flag}</div>
                  <h3 className="text-xl font-bold text-[#111827] mb-2">{route.country} to UK</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-[#4B5563]">
                      <Clock className="w-4 h-4 text-[#1A6DFF]" aria-hidden="true" />
                      <span>Sea: {route.seaTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#4B5563]">
                      <TrendingUp className="w-4 h-4 text-[#1A6DFF]" aria-hidden="true" />
                      <span>FCL from {route.fclPrice}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#4B5563]">
                      <Anchor className="w-4 h-4 text-[#1A6DFF]" aria-hidden="true" />
                      <span>Ports: {route.ports}</span>
                    </div>
                  </div>
                  <Link
                    to={`/routes/${route.country.toLowerCase()}-to-uk`}
                    className="inline-flex items-center gap-1 text-[#1A6DFF] font-semibold hover:underline mt-4 text-sm"
                  >
                    View Route <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== FAQ ====== */}
        <section aria-labelledby="faq-heading" className="py-16 md:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#1A6DFF] font-semibold text-sm uppercase tracking-wider">FAQ</span>
              <h2 id="faq-heading" className="text-3xl lg:text-4xl font-bold text-[#111827] mt-3 mb-4">
                Container Shipping Questions
              </h2>
              <p className="text-[#4B5563]">
                Common questions about FCL and LCL container shipping answered by our freight experts.
              </p>
            </div>
            <FaqAccordion />
          </div>
        </section>

        {/* ====== CTA ====== */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-[#0f4db5] to-[#1A6DFF] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-4">
              Get Your Container Shipping Quote
            </h2>
            <p className="text-lg text-blue-100 mb-8 leading-relaxed">
              Whether you need a 20ft container from China, a 40ft HC from India, or LCL groupage from Europe, our team will provide a competitive, all-inclusive quote within 2 hours.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/get-a-quote"
                className="inline-flex items-center gap-2 bg-white text-[#1A6DFF] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors min-h-[44px]"
              >
                Get a Quote <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <a
                href="tel:+442045827588"
                className="inline-flex items-center gap-2 bg-transparent text-white border border-white/30 px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors min-h-[44px]"
              >
                Call 020 4582 7588
              </a>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-blue-200">
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4" aria-hidden="true" /> All container sizes</span>
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4" aria-hidden="true" /> Customs included</span>
              <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4" aria-hidden="true" /> Marine insurance</span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
